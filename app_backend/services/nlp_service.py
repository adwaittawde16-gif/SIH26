"""
app_backend/services/nlp_service.py
----------------------------------
NLP & Co-Accused Entity Extraction Service using AdvancedNLPEngine.
"""

from typing import Optional
from intelligence_engine import IntelligenceEngine
from app_backend.services.nlp_engine import AdvancedNLPEngine
from app_backend.schemas.nlp import (
    FIRNLPRequest,
    ExtractedEntity,
    ExtractedRelationship,
    SuspectDetail,
    LegalStatuteDetail,
    SuggestedStatuteDetail,
    ModusOperandiDetail,
    FIRNLPResponse
)
from pmla_financial_graph_engine import PMLAFinancialGraphEngine

# Global singleton for PMLA graph engine (same pattern as financial_service)
_pmla_engine: Optional[PMLAFinancialGraphEngine] = None

def get_pmla_engine() -> PMLAFinancialGraphEngine:
    global _pmla_engine
    if _pmla_engine is None:
        _pmla_engine = PMLAFinancialGraphEngine()
    return _pmla_engine

def parse_fir_narrative(engine: IntelligenceEngine, req: FIRNLPRequest, update_graph: bool = True) -> FIRNLPResponse:
    text = req.fir_text or ""
    fir_num = req.fir_number or "FIR-DRAFT-2026"

    # Initialize advanced NLP engine with master intelligence suspect registry
    nlp_engine = AdvancedNLPEngine(
        master_suspects=engine.all_suspects,
        master_phones=engine.name_to_phone
    )

    extraction = nlp_engine.extract_entities(text)

    # Optionally update the PMLA graph engine with NLP-extracted entities and relationships
    if update_graph:
        try:
            pmla_engine = get_pmla_engine()
            graph_update_result = pmla_engine.add_nlp_entities(extraction)
            # Log the update (in production, use proper logging)
            print(f"NLP Graph Update: Added {graph_update_result['added_nodes']} nodes, {graph_update_result['added_edges']} edges")
        except Exception as e:
            # Don't fail the NLP processing if graph update fails
            print(f"Warning: Failed to update graph with NLP entities: {e}")

    # Format into Pydantic models
    entities = [
        ExtractedEntity(text=e["text"], category=e["category"], confidence=e["confidence"])
        for e in extraction["entities"]
    ]

    suspect_details = [
        SuspectDetail(
            name=s["name"],
            raw_mention=s["raw_mention"],
            matched_in_database=s["matched_in_database"],
            confidence=s["confidence"],
            phone_number=s["phone_number"],
            inferred_role=s["inferred_role"]
        )
        for s in extraction["suspects"]
    ]

    suspect_names = [s["name"] for s in extraction["suspects"]]
    co_accused_list = suspect_names[1:] if len(suspect_names) > 1 else []

    statutes = [
        LegalStatuteDetail(
            raw_section=st["raw_section"],
            code=st["code"],
            title=st["title"],
            bns_equivalent=st["bns_equivalent"],
            severity_score=st["severity_score"],
            category=st["category"],
            bailable=st["bailable"],
            confidence=st["confidence"]
        )
        for st in extraction["statutes"]
    ]

    modus_operandi = [
        ModusOperandiDetail(
            crime_category=mo["crime_category"],
            confidence=mo["confidence"],
            matched_indicators=mo["matched_indicators"],
            count=mo["count"]
        )
        for mo in extraction["modus_operandi"]
    ]

    relationships = [
        ExtractedRelationship(
            source=rel["source"],
            target=rel["target"],
            relation_type=rel["relation_type"],
            evidence=rel.get("evidence", ""),
            confidence=rel.get("confidence", 0.9)
        )
        for rel in extraction["relationships"]
    ]

    crime_types = [mo.crime_category for mo in modus_operandi]

    suggested_statutes = [
        SuggestedStatuteDetail(
            raw_section=st["raw_section"],
            code=st["code"],
            title=st["title"],
            bns_equivalent=st["bns_equivalent"],
            severity_score=st["severity_score"],
            category=st["category"],
            bailable=st["bailable"],
            confidence=st["confidence"],
            suggested=True,
            suggestion_reason=st.get("suggestion_reason", "")
        )
        for st in extraction.get("suggested_statutes", [])
    ]

    return FIRNLPResponse(
        fir_id=f"NLP-EXT-{len(text)}-{hash(text) & 0xffff}",
        fir_number=fir_num,
        raw_text=text,
        entities=entities,
        suspects=suspect_names,
        suspect_details=suspect_details,
        co_accused=co_accused_list,
        locations=extraction["locations"],
        weapons=extraction["weapons"],
        vehicles=extraction["vehicles"],
        aliases=extraction["aliases"],
        statutes=statutes,
        suggested_statutes=suggested_statutes,
        modus_operandi=modus_operandi,
        financial_amounts=extraction["financial_amounts"],
        crime_types=crime_types,
        relationships=relationships,
        case_severity_score=extraction["case_severity_score"],
        severity_tier=extraction.get("severity_tier", "LOW"),
        summary_verdict=extraction["summary_verdict"]
    )
