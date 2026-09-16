"""
app_backend/services/financial_service.py
-----------------------------------------
Enhanced Financial Intelligence Service integrating PMLAFinancialGraphEngine.
"""

from typing import Dict, Any, List, Optional
from intelligence_engine import IntelligenceEngine
from financial_analyzer import FinancialAnalyzer
from pmla_financial_graph_engine import PMLAFinancialGraphEngine
from app_backend.schemas.financial import (
    FinancialIntelligenceResponse,
    FinancialSuspectSummary,
    FinancialRawRecord
)

# Global singleton for PMLA graph engine
_pmla_engine: Optional[PMLAFinancialGraphEngine] = None

def get_pmla_engine() -> PMLAFinancialGraphEngine:
    global _pmla_engine
    if _pmla_engine is None:
        _pmla_engine = PMLAFinancialGraphEngine()
    return _pmla_engine

def get_financial_intelligence(engine: IntelligenceEngine) -> FinancialIntelligenceResponse:
    analyzer = FinancialAnalyzer(engine)
    summary_df, raw_df = analyzer.analyze_financial_trails()
    
    summary_records = summary_df.to_dict(orient='records')
    summaries = [FinancialSuspectSummary(**r) for r in summary_records]
    
    raw_records = raw_df.to_dict(orient='records')
    transactions = [FinancialRawRecord(**r) for r in raw_records]
    
    total_vol = float(raw_df['amount_inr'].sum()) if 'amount_inr' in raw_df else 0.0
    high_risk_count = len([s for s in summaries if (s.wine_shop_spent_inr or 0) > 10000])
    
    return FinancialIntelligenceResponse(
        total_transactions=len(transactions),
        total_volume_inr=round(total_vol, 2),
        high_risk_suspects_count=high_risk_count,
        summaries=summaries,
        transactions=transactions
    )

def get_financial_graph(focus_entity: Optional[str] = None, max_nodes: int = 150) -> Dict[str, Any]:
    pmla = get_pmla_engine()
    return pmla.get_graph_payload(focus_entity=focus_entity, max_nodes=max_nodes)

def get_laundering_patterns() -> Dict[str, Any]:
    pmla = get_pmla_engine()
    return pmla.detect_suspicious_patterns()

def get_financial_centrality() -> Dict[str, Any]:
    pmla = get_pmla_engine()
    rankings = pmla.calculate_centrality_and_influence()
    return {"total_ranked": len(rankings), "rankings": rankings}

def trace_financial_flow(source: str, target: Optional[str] = None, max_depth: int = 5) -> Dict[str, Any]:
    pmla = get_pmla_engine()
    return pmla.trace_money_flow(source=source, target=target, max_depth=max_depth)

def get_pmla_dossier(entity_id: str) -> Dict[str, Any]:
    pmla = get_pmla_engine()
    return pmla.generate_pmla_dossier(entity_id=entity_id)

def get_court_evidence_certificate(entity_id: str) -> Dict[str, Any]:
    pmla = get_pmla_engine()
    return pmla.generate_court_evidence_certificate(entity_id=entity_id)

def get_all_entities() -> Dict[str, Any]:
    pmla = get_pmla_engine()
    df = pmla.entities_df.copy()
    records = df.to_dict(orient='records')
    
    categories = {
        "beneficial_owners": [r for r in records if "BENEFICIAL" in str(r.get("entity_type", ""))],
        "shell_companies": [r for r in records if "SHELL" in str(r.get("entity_type", "")) or "TRADE" in str(r.get("entity_type", ""))],
        "nominee_directors": [r for r in records if "NOMINEE" in str(r.get("entity_type", ""))],
        "mule_accounts": [r for r in records if "MULE" in str(r.get("entity_type", ""))],
        "hawala_agents": [r for r in records if "HAWALA" in str(r.get("entity_type", ""))],
        "attached_assets": [r for r in records if "ASSET" in str(r.get("entity_type", ""))],
        "clean_third_parties": [r for r in records if "CLEAN" in str(r.get("entity_type", ""))],
        "suspects": [r for r in records if "SUSPECT" in str(r.get("entity_type", "")) or not r.get("entity_type")]
    }
    
    return {
        "total_entities": len(records),
        "categories": categories,
        "all_entities": records
    }
