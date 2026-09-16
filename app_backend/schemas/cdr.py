from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class CDRPairRecord(BaseModel):
    suspect_1: str
    suspect_2: str
    total_calls: int
    total_duration_min: float
    nocturnal_calls: int
    sms_count: int
    incoming_count: int
    outgoing_count: int

class CDRSummaryResponse(BaseModel):
    total_cdr_logs: int
    total_interaction_pairs: int
    frequent_pairs_count: int
    pairs: List[CDRPairRecord]

class NetworkNode(BaseModel):
    id: str
    label: str
    phone: Optional[str] = ""
    threat_score: float
    degree_centrality: float
    betweenness_centrality: float
    total_calls_count: int
    connected_entities_count: int
    nocturnal_calls_count: int
    risk_tier: str
    gang_id: Optional[str] = "GANG-01"
    gang_name: Optional[str] = "Gang 1"

class NetworkEdge(BaseModel):
    source: str
    target: str
    total_calls: int
    weight: int

class NetworkGraphResponse(BaseModel):
    total_nodes: int
    total_edges: int
    top_key_influencers: List[NetworkNode]
    nodes: List[NetworkNode]
    edges: List[NetworkEdge]

class IntermediaryContact(BaseModel):
    id: str
    label: str
    name: str
    type: str  # "PERSON" | "PHONE" | "DEVICE" | "TOWER" | "SYNDICATE"
    icon: str  # "user" | "phone" | "device" | "tower"
    threat: float
    callsA: int
    callsB: int
    duration: float
    role: Optional[str] = "Intermediary"
    details: Optional[str] = ""

class ExclusiveContact(BaseModel):
    id: str
    label: str
    name: str
    type: str  # "PERSON" | "PHONE" | "DEVICE"
    icon: str  # "user" | "phone" | "device"
    threat: float
    callsA: Optional[int] = None
    callsB: Optional[int] = None
    calls: int
    duration: float
    role: Optional[str] = "Contact"

class DirectConnectionInfo(BaseModel):
    has_direct_calls: bool
    total_calls: int
    total_duration_min: float
    nocturnal_calls: int
    sms_count: int
    incoming_a_to_b: int
    outgoing_a_to_b: int

class SharedCellTowerInfo(BaseModel):
    tower_id: str
    location: str
    calls_a: int
    calls_b: int
    last_detected: str

class CDRComparisonResponse(BaseModel):
    suspect_a: str
    suspect_b: str
    node_a: Optional[NetworkNode] = None
    node_b: Optional[NetworkNode] = None
    direct_connection: DirectConnectionInfo
    shared_contacts: List[IntermediaryContact]
    left_contacts: List[ExclusiveContact]
    right_contacts: List[ExclusiveContact]
    shared_cell_towers: List[SharedCellTowerInfo]

