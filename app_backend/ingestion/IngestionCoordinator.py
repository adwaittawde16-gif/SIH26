"""
app_backend/ingestion/IngestionCoordinator.py
---------------------------------------------
Coordinates and schedules all data ingestion processes.
Manages the lifecycle of all source-specific ingestors.
"""

import asyncio
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
from enum import Enum

from .BaseIngestor import BaseIngestor, DataSourceType, IngestionStatus
from .FIRIngestor import FIRIngestor
from .CDRIngestor import CDRIngestor
from .FinancialTransactionIngestor import FinancialTransactionIngestor
from .SurveillanceIngestor import SurveillanceIngestor
from .SocialMediaIngestor import SocialMediaIngestor
from .IntelligenceReportIngestor import IntelligenceReportIngestor

logger = logging.getLogger(__name__)

class IngestionJobStatus(Enum):
    """Status of ingestion jobs."""
    IDLE = "idle"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    SCHEDULED = "scheduled"

class IngestionJob:
    """Represents a single ingestion job."""

    def __init__(self, ingestor: BaseIngestor, schedule_interval: int = 300):
        """
        Initialize ingestion job.

        Args:
            ingestor: The ingestor to run
            schedule_interval: How often to run the job in seconds (default 5 minutes)
        """
        self.ingestor = ingestor
        self.schedule_interval = schedule_interval
        self.status = IngestionJobStatus.IDLE
        self.last_run: Optional[datetime] = None
        self.next_run: Optional[datetime] = None
        self.run_count = 0
        self.failure_count = 0
        self.last_result: Optional[IngestionStatus] = None
        self.last_error: Optional[str] = None

    def should_run(self) -> bool:
        """Check if the job should run based on schedule."""
        if self.status == IngestionJobStatus.RUNNING:
            return False

        if self.next_run is None:
            return True

        return datetime.utcnow() >= self.next_run

    def schedule_next_run(self):
        """Schedule the next run of this job."""
        self.next_run = datetime.utcnow() + timedelta(seconds=self.schedule_interval)

class IngestionCoordinator:
    """
    Coordinates and schedules all data ingestion processes.
    Manages the lifecycle of all source-specific ingestors.
    """

    def __init__(self, config: Dict[str, Any]):
        """
        Initialize ingestion coordinator.

        Args:
            config: Configuration dictionary containing:
                - ingestors: List of ingestor configurations
                - max_concurrent_jobs: Maximum number of concurrent ingestion jobs
                - job_timeout: Timeout for individual jobs in seconds
                - retry_failed_jobs: Whether to retry failed jobs
                - max_retries: Maximum number of retries for failed jobs
        """
        self.config = config
        self.max_concurrent_jobs = config.get('max_concurrent_jobs', 3)
        self.job_timeout = config.get('job_timeout', 300)  # 5 minutes
        self.retry_failed_jobs = config.get('retry_failed_jobs', True)
        self.max_retries = config.get('max_retries', 3)

        self.jobs: Dict[DataSourceType, IngestionJob] = {}
        self.running_tasks: List[asyncio.Task] = []
        self.shutdown_event = asyncio.Event()
        self.coordinator_task: Optional[asyncio.Task] = None

        self._initialize_ingestors()

    def _initialize_ingestors(self):
        """Initialize all configured ingestors."""
        ingestor_configs = self.config.get('ingestors', [])

        for ingestor_config in ingestor_configs:
            try:
                source_type_str = ingestor_config.get('source_type')
                if not source_type_str:
                    logger.warning("Ingestor configuration missing source_type, skipping")
                    continue

                try:
                    source_type = DataSourceType(source_type_str.lower())
                except ValueError:
                    logger.warning(f"Unknown source type: {source_type_str}, skipping")
                    continue

                # Create ingestor instance based on source type
                ingestor: Optional[BaseIngestor] = None

                if source_type == DataSourceType.FIR_SYSTEM:
                    ingestor = FIRIngestor(ingestor_config)
                elif source_type == DataSourceType.CDR_FEED:
                    ingestor = CDRIngestor(ingestor_config)
                elif source_type == DataSourceType.FINANCIAL_TRANSACTION:
                    ingestor = FinancialTransactionIngestor(ingestor_config)
                elif source_type == DataSourceType.SURVEILLANCE_SYSTEM:
                    ingestor = SurveillanceIngestor(ingestor_config)
                elif source_type == DataSourceType.SOCIAL_MEDIA:
                    ingestor = SocialMediaIngestor(ingestor_config)
                elif source_type == DataSourceType.INTELLIGENCE_REPORT:
                    ingestor = IntelligenceReportIngestor(ingestor_config)
                else:
                    logger.warning(f"No ingestor implementation for source type: {source_type}")
                    continue

                if ingestor:
                    schedule_interval = ingestor_config.get('schedule_interval', 300)  # Default 5 minutes
                    job = IngestionJob(ingestor, schedule_interval)
                    self.jobs[source_type] = job
                    logger.info(f"Initialized ingestor for {source_type.value}")

            except Exception as e:
                logger.error(f"Failed to initialize ingestor for {source_type_str}: {str(e)}")

    async def start(self):
        """Start the ingestion coordinator."""
        if self.coordinator_task and not self.coordinator_task.done():
            logger.warning("Ingestion coordinator is already running")
            return

        logger.info("Starting ingestion coordinator")
        self.shutdown_event.clear()
        self.coordinator_task = asyncio.create_task(self._coordination_loop())

    async def stop(self):
        """Stop the ingestion coordinator."""
        logger.info("Stopping ingestion coordinator")
        self.shutdown_event.set()

        if self.coordinator_task:
            try:
                await asyncio.wait_for(self.coordinator_task, timeout=10.0)
            except asyncio.TimeoutError:
                logger.warning("Coordinator task did not stop gracefully, cancelling")
                self.coordinator_task.cancel()
                try:
                    await self.coordinator_task
                except asyncio.CancelledError:
                    pass

        # Wait for running tasks to complete
        if self.running_tasks:
            logger.info(f"Waiting for {len(self.running_tasks)} running tasks to complete")
            try:
                await asyncio.wait_for(asyncio.gather(*self.running_tasks, return_exceptions=True), timeout=30.0)
            except asyncio.TimeoutError:
                logger.warning("Some tasks did not complete in time, cancelling")
                for task in self.running_tasks:
                    if not task.done():
                        task.cancel()
                # Wait for cancellation
                await asyncio.gather(*self.running_tasks, return_exceptions=True)

        self.running_tasks.clear()
        logger.info("Ingestion coordinator stopped")

    async def _coordination_loop(self):
        """Main coordination loop."""
        logger.info("Ingestion coordination loop started")

        while not self.shutdown_event.is_set():
            try:
                # Clean up completed tasks
                self.running_tasks = [task for task in self.running_tasks if not task.done()]

                # Start new jobs if we have capacity
                if len(self.running_tasks) < self.max_concurrent_jobs:
                    await self._start_scheduled_jobs()

                # Wait before next check
                await asyncio.sleep(10)  # Check every 10 seconds

            except Exception as e:
                logger.error(f"Error in coordination loop: {str(e)}")
                await asyncio.sleep(5)  # Wait before retrying

        logger.info("Ingestion coordination loop ended")

    async def _start_scheduled_jobs(self):
        """Start any jobs that are scheduled to run."""
        for source_type, job in self.jobs.items():
            # Check if we can start more jobs
            if len(self.running_tasks) >= self.max_concurrent_jobs:
                break

            # Check if job should run
            if job.should_run():
                logger.info(f"Starting ingestion job for {source_type.value}")
                job.status = IngestionJobStatus.RUNNING
                task = asyncio.create_task(self._run_ingestion_job(job))
                self.running_tasks.append(task)

    async def _run_ingestion_job(self, job: IngestionJob):
        """
        Run a single ingestion job.

        Args:
            job: The ingestion job to run
        """
        start_time = datetime.utcnow()
        try:
            logger.info(f"Running ingestion job for {job.ingestor.source_type.value}")

            # Run the ingestion with timeout
            result = await asyncio.wait_for(
                self._execute_ingestion(job.ingestor),
                timeout=self.job_timeout
            )

            job.last_run = start_time
            job.run_count += 1
            job.last_result = result

            if result == IngestionStatus.SUCCESS:
                job.status = IngestionJobStatus.COMPLETED
                logger.info(f"Ingestion job completed successfully for {job.ingestor.source_type.value}")
            else:
                job.status = IngestionJobStatus.FAILED
                job.failure_count += 1
                job.last_error = f"Ingestion returned status: {result.value}"
                logger.warning(f"Ingestion job failed for {job.ingestor.source_type.value}: {result.value}")

            # Schedule next run
            job.schedule_next_run()

            # Handle retries for failed jobs
            if result != IngestionStatus.SUCCESS and self.retry_failed_jobs and job.failure_count < self.max_retries:
                logger.info(f"Scheduling retry for {job.ingestor.source_type.value} (attempt {job.failure_count + 1}/{self.max_retries})")
                # Schedule retry sooner (e.g., in 1 minute)
                job.next_run = datetime.utcnow() + timedelta(minutes=1)

        except asyncio.TimeoutError:
            job.status = IngestionJobStatus.FAILED
            job.failure_count += 1
            job.last_error = f"Ingestion job timed out after {self.job_timeout} seconds"
            job.last_run = start_time
            job.run_count += 1
            job.last_result = IngestionStatus.FAILED
            logger.error(f"Ingestion job timed out for {job.ingestor.source_type.value}")

            # Schedule retry if configured
            if self.retry_failed_jobs and job.failure_count < self.max_retries:
                logger.info(f"Scheduling retry for {job.ingestor.source_type.value} after timeout (attempt {job.failure_count + 1}/{self.max_retries})")
                job.next_run = datetime.utcnow() + timedelta(minutes=1)

        except Exception as e:
            job.status = IngestionJobStatus.FAILED
            job.failure_count += 1
            job.last_error = str(e)
            job.last_run = start_time
            job.run_count += 1
            job.last_result = IngestionStatus.FAILED
            logger.error(f"Error running ingestion job for {job.ingestor.source_type.value}: {str(e)}", exc_info=True)

            # Schedule retry if configured
            if self.retry_failed_jobs and job.failure_count < self.max_retries:
                logger.info(f"Scheduling retry for {job.ingestor.source_type.value} after error (attempt {job.failure_count + 1}/{self.max_retries})")
                job.next_run = datetime.utcnow() + timedelta(minutes=1)

    async def _execute_ingestion(self, ingestor: BaseIngestor) -> IngestionStatus:
        """
        Execute ingestion for a single ingestor.

        Args:
            ingestor: The ingestor to execute

        Returns:
            IngestionStatus result
        """
        # Run in thread pool to avoid blocking the event loop
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, ingestor.ingest)

    def get_job_status(self, source_type: DataSourceType) -> Optional[Dict[str, Any]]:
        """
        Get status of a specific ingestion job.

        Args:
            source_type: The source type to get status for

        Returns:
            Dictionary containing job status information or None if not found
        """
        if source_type not in self.jobs:
            return None

        job = self.jobs[source_type]
        return {
            "source_type": job.ingestor.source_type.value,
            "status": job.status.value,
            "last_run": job.last_run.isoformat() if job.last_run else None,
            "next_run": job.next_run.isoformat() if job.next_run else None,
            "run_count": job.run_count,
            "failure_count": job.failure_count,
            "last_result": job.last_result.value if job.last_result else None,
            "last_error": job.last_error,
            "health": job.ingestor.get_health_status()
        }

    def get_all_jobs_status(self) -> Dict[str, Any]:
        """
        Get status of all ingestion jobs.

        Returns:
            Dictionary containing status of all jobs
        """
        status = {}
        for source_type, job in self.jobs.items():
            status[source_type.value] = self.get_job_status(source_type)
        return status

    def trigger_ingestion(self, source_type: DataSourceType) -> bool:
        """
        Manually trigger an ingestion job for a specific source type.

        Args:
            source_type: The source type to trigger

        Returns:
            True if triggered successfully, False otherwise
        """
        if source_type not in self.jobs:
            logger.warning(f"No job configured for source type: {source_type}")
            return False

        job = self.jobs[source_type]
        if job.status == IngestionJobStatus.RUNNING:
            logger.warning(f"Ingestion job for {source_type.value} is already running")
            return False

        # Reset next run to trigger immediately
        job.next_run = datetime.utcnow()
        logger.info(f"Manually triggered ingestion job for {source_type.value}")
        return True