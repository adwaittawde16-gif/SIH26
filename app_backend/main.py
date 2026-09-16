"""
app_backend/main.py
-------------------
FastAPI Application Entrypoint & Server Config.
Exposes modular REST API routers for all 8 Police Intelligence modules.
For: Brihanmumbai Police Department — SIH 26
"""

import sys
import os
from pathlib import Path

# Ensure root directory is always on python path
_ROOT_DIR = Path(__file__).resolve().parent.parent
if str(_ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(_ROOT_DIR))

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time
import asyncio
from contextlib import asynccontextmanager
from typing import Optional

from app_backend.dependencies import get_engine
from app_backend.schemas.common import HealthResponse, ErrorResponse

# Import 9 Modular Routers (including Intelligence Insights)
from app_backend.routers import (
    threat,
    cdr,
    cctv,
    crime_rings,
    financial,
    nocturnal,
    surveillance,
    dossiers,
    gangs,
    social_media,
    nlp,
    geo,
    graph_analytics,
    core_ai,
    stream,
    audit,
    enhanced_cdr,
    intelligence,
    criminal_history
)
from app_backend.middleware.audit_middleware import AuditLogMiddleware

# Import ingestion coordinator
from app_backend.ingestion.IngestionCoordinator import IngestionCoordinator

# Global ingestion coordinator
ingestion_coordinator: Optional[IngestionCoordinator] = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global ingestion_coordinator
    print("[*] Initializing Intelligence Engine...")

    # Initialize ingestion coordinator
    ingestion_config = {
        "max_concurrent_jobs": 3,
        "job_timeout": 300,
        "retry_failed_jobs": True,
        "max_retries": 3,
        "ingestors": [
            # FIR System Ingestor
            {
                "source_type": "fir_system",
                "source": {
                    "type": "csv",
                    "file_path": "fir_and_police_reports.csv"
                },
                "schedule_interval": 300,  # 5 minutes
                "batch_size": 100
            },
            # CDR Feed Ingestor
            {
                "source_type": "cdr_feed",
                "source": {
                    "type": "csv",
                    "file_path": "call_detail_records.csv"
                },
                "schedule_interval": 60,  # 1 minute
                "batch_size": 1000
            },
            # Financial Transaction Ingestor
            {
                "source_type": "financial_transaction",
                "source": {
                    "type": "csv",
                    "file_path": "financial_transaction_records.csv"
                },
                "schedule_interval": 60,  # 1 minute
                "batch_size": 1000,
                "amount_threshold": 1.0
            },
            # Surveillance System Ingestor
            {
                "source_type": "surveillance_system",
                "source": {
                    "type": "csv",
                    "file_path": "surveillance_reports.csv"
                },
                "schedule_interval": 30,  # 30 seconds
                "batch_size": 50
            },
            # Social Media Ingestor (Twitter example)
            {
                "source_type": "social_media",
                "platform": "twitter",
                "api_credentials": {
                    "bearer_token": "your_twitter_bearer_token_here"  # In production, use environment variables
                },
                "keywords": ["terror", "bomb", "attack", "drug", "money laundering"],
                "hashtags": ["#terror", "#attack", "#drugs"],
                "schedule_interval": 300,  # 5 minutes
                "batch_size": 100
            },
            # Intelligence Report Ingestor
            {
                "source_type": "intelligence_report",
                "source": {
                    "type": "file_watch",
                    "directory_path": "intelligence_reports",
                    "file_types": [".pdf", ".docx", ".txt", ".json"]
                },
                "schedule_interval": 600,  # 10 minutes
                "batch_size": 20,
                "keywords": ["terror", "explosive", "weapon", "drug", "fraud"]
            }
        ]
    }

    ingestion_coordinator = IngestionCoordinator(ingestion_config)
    await ingestion_coordinator.start()
    print("[OK] Ingestion Coordinator started!")

    # Pre-warm Intelligence Engine
    print("[*] Pre-warming Intelligence Engine in RAM...")
    from threat_classifier import ThreatClassifier
    engine = get_engine()
    engine.get_cdr_summary()
    engine.get_cctv_meetings()
    engine.calculate_threat_scores()
    ThreatClassifier(engine).classify_suspect_risks()
    # Pre-warm enhanced CDR service
    from app_backend.services import enhanced_cdr_service
    enhanced_cdr_service.get_enhanced_cdr_summary(engine)
    enhanced_cdr_service.detect_suspicious_patterns(engine)
    print("[OK] Intelligence Engine warm-up complete! Responses will be served instantly.")

    yield

    # Shutdown
    print("[*] Shutting down Ingestion Coordinator...")
    if ingestion_coordinator:
        await ingestion_coordinator.stop()
    print("[OK] Ingestion Coordinator stopped!")


app = FastAPI(
    title="Brihanmumbai Police Tactical Intelligence REST API",
    description="Unified API server for CDR, CCTV, Crime Rings, Financial Money Trails & Suspect Risk Analytics.",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure CORS Middleware for Local Dev & Vercel Production Frontend
_frontend_url = os.environ.get("FRONTEND_URL", "")
_allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
if _frontend_url:
    _allowed_origins.append(_frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Custom Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": str(exc), "status": 500}
    )

# Ingestion Status Endpoint
@app.get("/api/ingestion/status", tags=["System Health"])
async def get_ingestion_status():
    """Get status of all ingestion jobs."""
    global ingestion_coordinator
    if ingestion_coordinator is None:
        return {"status": "not_initialized", "message": "Ingestion coordinator not initialized"}

    return ingestion_coordinator.get_all_jobs_status()

# Health Check Route
@app.get("/api/health", response_model=HealthResponse, tags=["System Health"])
def health_check():
    engine = get_engine()
    scores = engine.calculate_threat_scores()
    return HealthResponse(
        status="HEALTHY",
        system="Brihanmumbai Police Tactical Intelligence REST API",
        version="2.0.0",
        total_suspects=len(scores)
    )

# Add SHA-256 Tamper-Evident Audit Logging Middleware
app.add_middleware(AuditLogMiddleware)

# Register Intelligence Module APIRouters
app.include_router(threat.router)
app.include_router(cdr.router)
app.include_router(cctv.router)
app.include_router(crime_rings.router)
app.include_router(financial.router)
app.include_router(nocturnal.router)
app.include_router(surveillance.router)
app.include_router(dossiers.router)
app.include_router(gangs.router)
app.include_router(social_media.router)
app.include_router(nlp.router)
app.include_router(geo.router)
app.include_router(graph_analytics.router)
app.include_router(core_ai.router)
app.include_router(stream.router)
app.include_router(audit.router)
app.include_router(enhanced_cdr.router)
app.include_router(intelligence.router)
app.include_router(criminal_history.router)




if __name__ == '__main__':
    import uvicorn
    port = int(os.environ.get("PORT", 8002))
    uvicorn.run("app_backend.main:app", host="0.0.0.0", port=port, reload=False)

