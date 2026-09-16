"""
app_backend/services/threat_service.py
"""

from intelligence_engine import IntelligenceEngine
from threat_classifier import ThreatClassifier
from score_simulator import CustomScoreSimulator
from app_backend.schemas.threat import (
    ThreatLeaderboardResponse,
    SuspectThreatScore,
    SimulationWeightsRequest,
    SimulationResponse
)

def get_threat_leaderboard(engine: IntelligenceEngine) -> ThreatLeaderboardResponse:
    classifier = ThreatClassifier(engine)
    tier_df = classifier.classify_suspect_risks()
    scores_df = engine.calculate_threat_scores()
    
    merged = scores_df.to_dict(orient='records')
    
    crit = len(tier_df[tier_df['risk_tier'] == 'CRITICAL'])
    high = len(tier_df[tier_df['risk_tier'] == 'HIGH'])
    mod = len(tier_df[tier_df['risk_tier'] == 'MODERATE'])
    low = len(tier_df[tier_df['risk_tier'] == 'LOW'])
    
    leaderboard = [SuspectThreatScore(**item) for item in merged]
    
    return ThreatLeaderboardResponse(
        total_suspects=len(leaderboard),
        critical_count=crit,
        high_count=high,
        moderate_count=mod,
        low_count=low,
        leaderboard=leaderboard
    )

def simulate_threat_weights(engine: IntelligenceEngine, req: SimulationWeightsRequest) -> SimulationResponse:
    sim = CustomScoreSimulator(engine)
    weights = {
        'cctv_max': req.cctv_weight,
        'cdr_max': req.cdr_weight,
        'fir_max': req.fir_weight,
        'crim_max': req.criminal_weight,
        'fin_max': req.financial_weight,
        'surv_max': req.surveillance_weight
    }
    sim_df = sim.simulate_scores(weights=weights)
    records = sim_df.to_dict(orient='records')
    leaderboard = []
    for r in records:
        total = float(r.get('simulated_threat_score', 0.0))
        cctv = float(r.get('cctv_pts', 0.0))
        cdr = float(r.get('cdr_pts', 0.0))
        fir = float(r.get('fir_pts', 0.0))
        crim = float(r.get('crim_pts', 0.0))
        fin = float(r.get('fin_pts', 0.0))
        surv = float(r.get('surv_pts', 0.0))
        
        breakdown = {
            "CCTV Sightings": cctv,
            "CDR Network": cdr,
            "FIR Severity": fir,
            "Criminal Record": crim,
            "Financial Risk": fin,
            "Surveillance": surv
        }
        primary_driver = max(breakdown, key=breakdown.get) if total > 0 else "None"
        primary_pct = round((breakdown[primary_driver] / total * 100), 1) if total > 0 else 0.0

        leaderboard.append(SuspectThreatScore(
            suspect_name=r['suspect_name'],
            phone_number=r['phone_number'],
            total_threat_score=total,
            cctv_meeting_score=cctv,
            cdr_network_score=cdr,
            fir_severity_score=fir,
            criminal_history_score=crim,
            financial_risk_score=fin,
            surveillance_score=surv,
            primary_driver=primary_driver,
            primary_driver_pct=primary_pct,
            driver_breakdown=breakdown
        ))
        
    total_w = req.cctv_weight + req.cdr_weight + req.fir_weight + req.criminal_weight + req.financial_weight + req.surveillance_weight
    return SimulationResponse(total_weight=total_w, simulated_leaderboard=leaderboard)
