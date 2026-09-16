from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class SuspectThreatScore(BaseModel):
    suspect_name: str
    phone_number: str
    total_threat_score: float
    cctv_meeting_score: float
    cdr_network_score: float
    fir_severity_score: float
    criminal_history_score: float
    financial_risk_score: float
    surveillance_score: float
    primary_driver: Optional[str] = None
    primary_driver_pct: Optional[float] = None
    driver_breakdown: Optional[Dict[str, float]] = None

class SuspectRiskTier(BaseModel):
    suspect_name: str
    phone_number: str
    total_threat_score: float
    risk_tier: str
    recommended_action: str

class ThreatLeaderboardResponse(BaseModel):
    total_suspects: int
    critical_count: int
    high_count: int
    moderate_count: int
    low_count: int
    leaderboard: List[SuspectThreatScore]

class SimulationWeightsRequest(BaseModel):
    cctv_weight: float = Field(30.0, ge=0, le=50)
    cdr_weight: float = Field(20.0, ge=0, le=50)
    fir_weight: float = Field(15.0, ge=0, le=50)
    criminal_weight: float = Field(15.0, ge=0, le=50)
    financial_weight: float = Field(10.0, ge=0, le=50)
    surveillance_weight: float = Field(10.0, ge=0, le=50)

class SimulationResponse(BaseModel):
    total_weight: float
    simulated_leaderboard: List[SuspectThreatScore]
