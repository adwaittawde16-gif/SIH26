"""
app_backend/routers/core_ai.py
------------------------------
Unified Router for Core AI/ML Proofs:
- Multi-Source Ingestion (CDR, Financial, FIR)
- Statistical Anomaly Detection (Z-score, IQR, Spatio-Temporal)
- Role-Based Access Control (RBAC) & Forensic Audit Logs
- Explainable AI (XAI) & Evidence Attribution Trail
- Big Data Scalability Benchmark Engine
"""

from fastapi import APIRouter, Depends, Query, Body, HTTPException
from typing import Dict, Any, List, Optional
from pydantic import BaseModel

from intelligence_engine import IntelligenceEngine
from app_backend.dependencies import get_engine
from app_backend.services.ingestion_engine import MultiSourceIngestionEngine
from app_backend.services.anomaly_engine import StatisticalAnomalyEngine
from app_backend.services.auth_service import AuthService
from app_backend.services.explainability_engine import ExplainabilityEngine
from app_backend.services.benchmark_engine import BenchmarkEngine

router = APIRouter(prefix="/api/core-ai", tags=["Core AI/ML & Ingestion Engines"])

class IngestCDRRequest(BaseModel):
    data: str
    format: Optional[str] = "csv" # 'csv' or 'json'

class IngestFinancialRequest(BaseModel):
    data: str
    format: Optional[str] = "csv"

class IngestFIRRequest(BaseModel):
    fir_text: str
    fir_number: Optional[str] = "FIR-LIVE-INGEST-2026"

class LoginRequest(BaseModel):
    username: str

# ----------------- 1. MULTI-SOURCE INGESTION -----------------
@router.post("/ingest/cdr", summary="Ingest live Telecom CDR stream and fuse into intelligence graph")
def ingest_cdr(req: IngestCDRRequest, engine: IntelligenceEngine = Depends(get_engine)):
    ingester = MultiSourceIngestionEngine(engine)
    res = ingester.ingest_cdr_records(req.data, is_csv=(req.format.lower() == "csv"))
    if not res.get("success"):
        raise HTTPException(status_code=400, detail=res.get("error"))
    return res

@router.post("/ingest/financial", summary="Ingest live banking / Hawala transaction stream")
def ingest_financial(req: IngestFinancialRequest, engine: IntelligenceEngine = Depends(get_engine)):
    ingester = MultiSourceIngestionEngine(engine)
    res = ingester.ingest_financial_records(req.data, is_csv=(req.format.lower() == "csv"))
    if not res.get("success"):
        raise HTTPException(status_code=400, detail=res.get("error"))
    return res

@router.post("/ingest/fir", summary="Ingest unstructured FIR narrative, extract entities and cross-correlate")
def ingest_fir(req: IngestFIRRequest, engine: IntelligenceEngine = Depends(get_engine)):
    ingester = MultiSourceIngestionEngine(engine)
    return ingester.ingest_fir_narrative(req.fir_text, fir_number=req.fir_number)

# ----------------- 2. STATISTICAL ANOMALY DETECTION -----------------
@router.get("/anomaly/nocturnal", summary="Compute Gaussian Z-score anomalies on nocturnal call patterns")
def get_nocturnal_anomalies(z_threshold: float = Query(2.0, ge=1.0, le=4.0), engine: IntelligenceEngine = Depends(get_engine)):
    detector = StatisticalAnomalyEngine(engine)
    return detector.detect_nocturnal_telecom_anomalies(z_threshold=z_threshold)

@router.get("/anomaly/financial", summary="Compute IQR outliers & regulatory structuring smurfing alerts")
def get_financial_anomalies(engine: IntelligenceEngine = Depends(get_engine)):
    detector = StatisticalAnomalyEngine(engine)
    return detector.detect_financial_smurfing_anomalies()

@router.get("/anomaly/spatiotemporal", summary="Detect physical clandestine meetings via Haversine spatiotemporal clustering")
def get_spatiotemporal_anomalies(engine: IntelligenceEngine = Depends(get_engine)):
    detector = StatisticalAnomalyEngine(engine)
    return detector.detect_spatiotemporal_cctv_clusters()

# ----------------- 3. RBAC AUTH & AUDIT LOGS -----------------
@router.get("/auth/users", summary="List official department roles & test accounts")
def list_auth_users():
    return AuthService.get_users_list()

@router.post("/auth/login", summary="Authenticate officer and issue session token")
def authenticate_officer(req: LoginRequest):
    user = AuthService.authenticate_officer(req.username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid officer credential or unauthorized access")
    return user

@router.get("/auth/audit-trail", summary="Retrieve forensic audit logs of all queries and evidence access")
def get_audit_trail(limit: int = Query(50, ge=5, le=200)):
    return AuthService.get_audit_trail(limit=limit)

# ----------------- 4. EXPLAINABLE AI (XAI) -----------------
@router.get("/explain/suspect", summary="Produce mathematical feature attribution & evidence trail for any suspect")
def explain_suspect(suspect: str = Query(..., description="Name of criminal suspect"), engine: IntelligenceEngine = Depends(get_engine)):
    xai = ExplainabilityEngine(engine)
    res = xai.explain_suspect_flag(suspect)
    if "error" in res:
        raise HTTPException(status_code=404, detail=res["error"])
    return res

# ----------------- 5. SCALABILITY BENCHMARK -----------------
@router.get("/benchmark/stress-test", summary="Execute high-throughput 10,000 to 100,000+ record pipeline stress test")
def run_benchmark(records: int = Query(50000, ge=5000, le=100000, description="Dataset size for stress test")):
    return BenchmarkEngine.run_stress_test(record_count=records)

# ----------------- 6. TACTICAL AI COPILOT -----------------
class CopilotQueryRequest(BaseModel):
    prompt: str

@router.post("/copilot/query", summary="Query the conversational Tactical Intelligence Copilot")
def query_copilot(req: CopilotQueryRequest, engine: IntelligenceEngine = Depends(get_engine)) -> Dict[str, Any]:
    from app_backend.services.copilot_engine import CopilotEngine
    copilot = CopilotEngine(engine)
    return copilot.query(req.prompt)
