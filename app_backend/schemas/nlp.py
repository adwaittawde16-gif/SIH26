from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class FIRNLPRequest(BaseModel):
    fir_text: str
    fir_number: Optional[str] = "FIR-LIVE-2026"
    incident_date: Optional[str] = None
    police_station: Optional[str] = None

class ExtractedEntity(BaseModel):
    text: str
    category: str  # SUSPECT_PERSON, LOCATION, WEAPON_ORDNANCE, VEHICLE_LOGISTICS, LEGAL_STATUTE, PHONE_NUMBER, ALIAS_MONIKER, FINANCIAL_AMOUNT
    confidence: float

class ExtractedRelationship(BaseModel):
    source: str
    target: str
    relation_type: str  # CO_CONSPIRATOR, OPERATED_AT, POSSESSED_WEAPON, COMMUNICATED_WITH
    evidence: Optional[str] = ""
    confidence: Optional[float] = 0.9

class SuspectDetail(BaseModel):
    name: str
    raw_mention: str
    matched_in_database: bool
    confidence: float
    phone_number: str
    inferred_role: str

class LegalStatuteDetail(BaseModel):
    raw_section: str
    code: str
    title: str
    bns_equivalent: str
    severity_score: int
    category: str
    bailable: bool
    confidence: float

class SuggestedStatuteDetail(BaseModel):
    raw_section: str
    code: str
    title: str
    bns_equivalent: str
    severity_score: int
    category: str
    bailable: bool
    confidence: float
    suggested: bool = True
    suggestion_reason: str = ""

class ModusOperandiDetail(BaseModel):
    crime_category: str
    confidence: float
    matched_indicators: List[str]
    count: int

class FIRNLPResponse(BaseModel):
    fir_id: str
    fir_number: str
    raw_text: str
    entities: List[ExtractedEntity]
    suspects: List[str]
    suspect_details: List[SuspectDetail] = Field(default_factory=list)
    co_accused: List[str]
    locations: List[str]
    weapons: List[str] = Field(default_factory=list)
    vehicles: List[str] = Field(default_factory=list)
    aliases: List[str] = Field(default_factory=list)
    statutes: List[LegalStatuteDetail] = Field(default_factory=list)
    suggested_statutes: List[SuggestedStatuteDetail] = Field(default_factory=list)
    modus_operandi: List[ModusOperandiDetail] = Field(default_factory=list)
    financial_amounts: List[str] = Field(default_factory=list)
    crime_types: List[str]
    relationships: List[ExtractedRelationship]
    case_severity_score: float = 0.0
    severity_tier: str = "LOW"
    summary_verdict: str = ""
