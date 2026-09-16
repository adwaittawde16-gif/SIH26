"""
app_backend/routers/threat.py
-----------------------------
APIRouter for Module 1: Threat Leaderboard & Composite Risk Simulator
"""

from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List, Optional
from intelligence_engine import IntelligenceEngine
from app_backend.dependencies import get_engine, get_ml_threat_scorer
from app_backend.services.ml_threat_scorer import MLThreatScorer
from app_backend.schemas.threat import (
    ThreatLeaderboardResponse,
    SimulationWeightsRequest,
    SimulationResponse
)
from app_backend.services import threat_service

router = APIRouter(prefix="/api/threat", tags=["Module 1 — Threat Leaderboard & Simulator"])

@router.get("/leaderboard", response_model=ThreatLeaderboardResponse, summary="Get suspect composite threat score leaderboard")
def get_leaderboard(engine: IntelligenceEngine = Depends(get_engine)):
    return threat_service.get_threat_leaderboard(engine)

@router.post("/simulate", response_model=SimulationResponse, summary="Simulate custom threat scores with dynamic parameter weights")
def simulate_weights(req: SimulationWeightsRequest, engine: IntelligenceEngine = Depends(get_engine)):
    return threat_service.simulate_threat_weights(engine, req)

# Machine Learning Threat Scoring Endpoints
@router.get("/ml-score/{suspect_name}", summary="Get ML-based threat score for a suspect")
def get_ml_threat_score(suspect_name: str, ml_scorer: MLThreatScorer = Depends(get_ml_threat_scorer), engine: IntelligenceEngine = Depends(get_engine)):
    """
    Get machine learning-based threat score for a specific suspect.
    Returns ML score (0-100) based on engineered features and trained model.
    Falls back to rule-based score if model not trained.
    """
    try:
        ml_score = ml_scorer.predict_threat_score(suspect_name)

        # Also get rule-based score for comparison
        threat_scores = engine.calculate_threat_scores()
        suspect_row = threat_scores[threat_scores['suspect_name'] == suspect_name]
        rule_based_score = float(suspect_row.iloc[0]['total_threat_score']) if not suspect_row.empty else 0.0

        return {
            "suspect_name": suspect_name,
            "ml_threat_score": round(ml_score, 1),
            "rule_based_score": round(rule_based_score, 1),
            "model_trained": ml_scorer.is_trained
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating ML threat score: {str(e)}")

@router.get("/hybrid-score/{suspect_name}", summary="Get hybrid threat score (rule-based + ML) for a suspect")
def get_hybrid_threat_score(
    suspect_name: str,
    ml_weight: float = 0.3,
    rule_weight: float = 0.7,
    ml_scorer: MLThreatScorer = Depends(get_ml_threat_scorer),
    engine: IntelligenceEngine = Depends(get_engine)
):
    """
    Get hybrid threat score combining rule-based and ML approaches.
    Formula: final_score = (rule_weight × rule_based_score) + (ml_weight × ml_score)
    """
    try:
        if ml_weight < 0 or rule_weight < 0 or ml_weight > 1 or rule_weight > 1:
            raise HTTPException(status_code=400, detail="Weights must be between 0 and 1")

        result = ml_scorer.get_hybrid_threat_score(suspect_name, ml_weight, rule_weight)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating hybrid threat score: {str(e)}")

@router.post("/train-model", summary="Train the ML threat scoring model")
def train_ml_model(ml_scorer: MLThreatScorer = Depends(get_ml_threat_scorer), engine: IntelligenceEngine = Depends(get_engine)):
    """
    Train the machine learning threat scoring model using current data.
    Returns training metrics and feature importance.
    """
    try:
        result = ml_scorer.train_model()

        if not result['success']:
            raise HTTPException(status_code=500, detail=result.get('error', 'Training failed'))

        return {
            "message": "ML threat scoring model trained successfully",
            "training_accuracy": result['train_accuracy'],
            "test_accuracy": result['test_accuracy'],
            "auc_score": result['auc_score'],
            "samples_used": result['samples'],
            "features_used": result['features'],
            "top_features": dict(list(result['feature_importance'].items())[:5])  # Top 5 features
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error training ML model: {str(e)}")

@router.get("/model-info", summary="Get information about the ML threat scoring model")
def get_model_info(ml_scorer: MLThreatScorer = Depends(get_ml_threat_scorer), engine: IntelligenceEngine = Depends(get_engine)):
    """
    Get information about the current ML threat scoring model.
    Includes training status, feature count, and model type.
    """
    try:
        return {
            "model_trained": ml_scorer.is_trained,
            "feature_count": len(ml_scorer.feature_names),
            "feature_names": ml_scorer.feature_names[:10] if ml_scorer.feature_names else [],  # First 10 features
            "model_type": type(ml_scorer.model).__name__ if ml_scorer.model else None,
            "model_path": ml_scorer.model_path,
            "scaler_path": ml_scorer.scaler_path
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting model info: {str(e)}")

@router.get("/top-ml-suspects", summary="Get top suspects ranked by ML threat score")
def get_top_ml_suspects(limit: int = 10, ml_scorer: MLThreatScorer = Depends(get_ml_threat_scorer), engine: IntelligenceEngine = Depends(get_engine)):
    """
    Get top suspects ranked by ML threat score.
    """
    try:
        threat_scores = engine.calculate_threat_scores()

        # Get ML scores for all suspects
        scored_suspects = []
        for _, row in threat_scores.iterrows():
            suspect_name = row['suspect_name']
            ml_score = ml_scorer.predict_threat_score(suspect_name)
            rule_score = row['total_threat_score']

            scored_suspects.append({
                "suspect_name": suspect_name,
                "phone_number": row['phone_number'],
                "ml_threat_score": round(ml_score, 1),
                "rule_based_score": round(rule_score, 1),
                "score_difference": round(ml_score - rule_score, 1)
            })

        # Sort by ML score descending
        scored_suspects.sort(key=lambda x: x['ml_threat_score'], reverse=True)

        return {
            "top_suspects": scored_suspects[:limit],
            "total_suspects": len(scored_suspects),
            "model_trained": ml_scorer.is_trained
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting top ML suspects: {str(e)}")
