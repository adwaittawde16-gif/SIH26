"""
app_backend/routers/nlp.py
--------------------------
APIRouter for NLP FIR Entity & Legal Intelligence Extraction
"""

from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from intelligence_engine import IntelligenceEngine
from app_backend.dependencies import get_engine
from app_backend.schemas.nlp import FIRNLPRequest, FIRNLPResponse
from app_backend.services import nlp_service
from pmla_financial_graph_engine import PMLAFinancialGraphEngine

router = APIRouter(prefix="/api/fir", tags=["NLP FIR Entity Extractor"])

SAMPLE_FIRS = [
    {
        "id": "SAMPLE-FIR-01",
        "title": "Extortion & Supari Threat at Lower Parel",
        "fir_number": "FIR-2026-MUM-4091",
        "incident_type": "Extortion / Underworld Call",
        "text": "On 04-09-2026 at 22:30 hrs, complainant Mr. Rajesh Shah (Builder, Lower Parel) reported receiving repeated threat calls on +91-9820011223 demanding extortion amount of Rs. 50 Lakhs (50 Lakhs vasooli). The caller identified himself as associate of Md. Ranbir Bhalla alias 'Don'. Accused persons Md Hardik Kant and Md. Ranbir Bhalla were seen conducting recce in a black Pulsar motorcycle bearing plate MH-01-BK-4421 near Venus Wine Shop, Dadar. Accused possessed country-made pistol with 6 live cartridges. Case registered u/s 384, 386, 120B, 506 IPC r/w Section 25 Arms Act."
    },
    {
        "id": "SAMPLE-FIR-02",
        "title": "MDMA & Synthetic Narcotics Seizure at Byculla",
        "fir_number": "FIR-2026-MUM-8812",
        "incident_type": "Narcotics Trafficking",
        "text": "Special Crime Unit intercepted a suspicious white Innova MH-02-CD-9012 near Byculla Station Road on 06-09-2026. Suspect Md Aarnav Chaudhry was apprehended in possession of 450 grams of high-grade commercial MDMA contraband and cash worth Rs. 4,80,000 intended for hawala transfer. Interrogation revealed consignment was supplied by handler Md. Ranbir Bhalla via courier network operating out of Agripada and Madanpura. Case booked under NDPS Act Section 8(c), Section 21 and Section 120B IPC."
    },
    {
        "id": "SAMPLE-FIR-03",
        "title": "Armed Dacoity & Firing at Diamond Merchant, Lamington Road",
        "fir_number": "FIR-2026-MUM-7120",
        "incident_type": "Armed Dacoity / Syndicate Hit",
        "text": "At around 19:45 hours at Lamington Road, four armed assailants intercepted cash van of angadia trader. Accused fired two rounds using a 9mm pistol and chopper, looting jewellery worth 1.5 Crores. Primary shooter identified on CCTV as Md Hardik Kant accompanied by co-accused Md Aarnav Chaudhry on getaway bike MH-03-XY-8877 heading towards Worli. Recovered empty shell casing and magazine. Registered under IPC 395, 397, 307, 34 IPC and Arms Act Sec 27."
    }
]

@router.get("/samples", response_model=List[Dict[str, Any]], summary="Get curated real-world FIR case studies for live judging testing")
def get_fir_samples():
    return SAMPLE_FIRS

@router.post("/extract", response_model=FIRNLPResponse, summary="Extract entities, co-accused, locations, weapons, vehicles & legal statutes from FIR narrative")
def extract_fir_nlp(
    req: FIRNLPRequest,
    engine: IntelligenceEngine = Depends(get_engine),
    update_graph: bool = Depends(lambda: True)  # Default to updating graph with NLP entities
):
    return nlp_service.parse_fir_narrative(engine, req, update_graph=update_graph)
