"""
app_backend/dependencies.py
---------------------------
Provides singleton instances of core intelligence engines for FastAPI dependency injection.
"""

from intelligence_engine import IntelligenceEngine
from app_backend.services.ml_threat_scorer import MLThreatScorer

_ENGINE_INSTANCE = None
_ML_THREAT_SCORER_INSTANCE = None

def get_engine() -> IntelligenceEngine:
    global _ENGINE_INSTANCE
    if _ENGINE_INSTANCE is None:
        _ENGINE_INSTANCE = IntelligenceEngine()
    return _ENGINE_INSTANCE

def get_ml_threat_scorer() -> MLThreatScorer:
    global _ML_THREAT_SCORER_INSTANCE
    if _ML_THREAT_SCORER_INSTANCE is None:
        _ML_THREAT_SCORER_INSTANCE = MLThreatScorer()
    return _ML_THREAT_SCORER_INSTANCE
