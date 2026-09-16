"""
app_backend/ingestion/BaseIngestor.py
---------------------------------------
Base connector interface for all data ingestion sources.
Defines the contract that all source-specific ingestors must follow.
"""

import abc
import logging
from typing import Dict, Any, List, Optional
from datetime import datetime
from enum import Enum

logger = logging.getLogger(__name__)

class DataSourceType(Enum):
    """Enumeration of supported data source types."""
    FIR_SYSTEM = "fir_system"
    CDR_FEED = "cdr_feed"
    FINANCIAL_TRANSACTION = "financial_transaction"
    SURVEILLANCE_SYSTEM = "surveillance_system"
    SOCIAL_MEDIA = "social_media"
    INTELLIGENCE_REPORT = "intelligence_report"

class IngestionStatus(Enum):
    """Status of ingestion operations."""
    SUCCESS = "success"
    FAILED = "failed"
    PARTIAL = "partial"
    RETRY = "retry"

class BaseIngestor(abc.ABC):
    """
    Abstract base class for all data ingestors.
    Defines the interface that all source-specific ingestors must implement.
    """

    def __init__(self, source_type: DataSourceType, config: Dict[str, Any]):
        """
        Initialize the base ingestor.

        Args:
            source_type: Type of data source this ingestor handles
            config: Configuration dictionary for the ingestor
        """
        self.source_type = source_type
        self.config = config
        self.logger = logging.getLogger(f"{__name__}.{self.source_type.value}")
        self.last_ingestion_time: Optional[datetime] = None
        self.ingestion_count = 0
        self.failure_count = 0

    @abc.abstractmethod
    def connect(self) -> bool:
        """
        Establish connection to the data source.

        Returns:
            bool: True if connection successful, False otherwise
        """
        pass

    @abc.abstractmethod
    def disconnect(self) -> bool:
        """
        Close connection to the data source.

        Returns:
            bool: True if disconnection successful, False otherwise
        """
        pass

    @abc.abstractmethod
    def extract(self) -> List[Dict[str, Any]]:
        """
        Extract raw data from the source.

        Returns:
            List of raw data records extracted from the source
        """
        pass

    @abc.abstractmethod
    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Transform raw data into standardized format.

        Args:
            raw_data: List of raw data records from extract()

        Returns:
            List of transformed data records in standardized format
        """
        pass

    @abc.abstractmethod
    def load(self, transformed_data: List[Dict[str, Any]]) -> IngestionStatus:
        """
        Load transformed data into the target system.

        Args:
            List of transformed data records to load

        Returns:
            IngestionStatus indicating success/failure of load operation
        """
        pass

    def ingest(self) -> IngestionStatus:
        """
        Execute the full ETL pipeline: extract, transform, load.

        Returns:
            IngestionStatus indicating overall success/failure
        """
        try:
            self.logger.info(f"Starting ingestion for {self.source_type.value}")

            # Connect to source
            if not self.connect():
                self.logger.error(f"Failed to connect to {self.source_type.value}")
                self.failure_count += 1
                return IngestionStatus.FAILED

            # Extract data
            raw_data = self.extract()
            self.logger.info(f"Extracted {len(raw_data)} raw records from {self.source_type.value}")

            # Transform data
            transformed_data = self.transform(raw_data)
            self.logger.info(f"Transformed {len(transformed_data)} records from {self.source_type.value}")

            # Load data
            load_status = self.load(transformed_data)

            # Update metrics
            self.last_ingestion_time = datetime.utcnow()
            self.ingestion_count += 1

            if load_status == IngestionStatus.SUCCESS:
                self.logger.info(f"Ingestion completed successfully for {self.source_type.value}")
            else:
                self.logger.warning(f"Ingestion completed with status {load_status.value} for {self.source_type.value}")
                self.failure_count += 1

            # Disconnect
            self.disconnect()

            return load_status

        except Exception as e:
            self.logger.error(f"Error during ingestion for {self.source_type.value}: {str(e)}", exc_info=True)
            self.failure_count += 1
            try:
                self.disconnect()
            except:
                pass
            return IngestionStatus.FAILED

    def get_health_status(self) -> Dict[str, Any]:
        """
        Get health status of the ingestor.

        Returns:
            Dictionary containing health status information
        """
        return {
            "source_type": self.source_type.value,
            "last_ingestion_time": self.last_ingestion_time.isoformat() if self.last_ingestion_time else None,
            "ingestion_count": self.ingestion_count,
            "failure_count": self.failure_count,
            "success_rate": (
                (self.ingestion_count - self.failure_count) / self.ingestion_count
                if self.ingestion_count > 0 else 0.0
            ),
            "config": self.config
        }

    def validate_data(self, data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Validate data records and filter out invalid ones.
        Can be overridden by subclasses for source-specific validation.

        Args:
            data: List of data records to validate

        Returns:
            List of valid data records
        """
        # Default implementation: return all data (no validation)
        # Subclasses should override for actual validation logic
        return data