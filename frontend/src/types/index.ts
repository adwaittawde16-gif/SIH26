export interface SuspiciousPattern {
  type: string;
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  [key: string]: any; // Allow for additional fields specific to each pattern type
}

export interface SuspiciousPatternResponse {
  patterns: SuspiciousPattern[];
  warnings: string[];
  analysis_timestamp: string;
}

// CDR Module Types
export interface CDRSummaryResponse {
  total_cdr_logs: number;
  total_interaction_pairs: number;
  frequent_pairs_count: number;
  pairs: {
    suspect_1: string;
    suspect_2: string;
    total_calls: number;
    total_duration_min: number;
    nocturnal_calls: number;
    sms_count: number;
    incoming_count: number;
    outgoing_count: number;
  }[];
}

export interface NetworkGraphResponse {
  total_nodes: number;
  total_edges: number;
  top_key_influencers: Array<{
    id: string;
    label: string;
    phone: string;
    threat_score: number;
    degree_centrality: number;
    betweenness_centrality: number;
    total_calls_count: number;
    connected_entities_count: number;
    nocturnal_calls_count: number;
    risk_tier: string;
    gang_id?: string;
    gang_name?: string;
    entity_type?: string;
  }>;
  nodes: Array<{
    id: string;
    label: string;
    phone: string;
    threat_score: number;
    degree_centrality: number;
    betweenness_centrality: number;
    total_calls_count: number;
    connected_entities_count: number;
    nocturnal_calls_count: number;
    risk_tier: string;
    gang_id?: string;
    gang_name?: string;
    entity_type?: string;
  }>;
  edges: NetworkEdge[];
}

export interface NetworkNode {
  id: string;
  label: string;
  phone?: string;
  threat_score: number;
  degree_centrality?: number;
  betweenness_centrality?: number;
  total_calls_count?: number;
  connected_entities_count?: number;
  nocturnal_calls_count?: number;
  risk_tier?: string;
  gang_id?: string;
  gang_name?: string;
  entity_type?: string;
}

export interface NetworkEdge {
  id?: string;
  source: string;
  target: string;
  total_calls?: number;
  weight?: number;
}

// CCTV Module Types
export interface CCTVMeetingsResponse {
  total_encounters: number;
  avg_confidence_pct: number;
  mean_distance_meters: number;
  meetings: {
    suspect_1: string;
    suspect_2: string;
    camera_id: string;
    camera_location: string;
    cdr_call_count: number;
    avg_distance_meters: number;
    avg_match_confidence: number;
    sighting_status: string;
    encounter_time: string;
  }[];
}

// Crime Rings & Gangs Module Types
export interface CrimeRingsResponse {
  total_rings: number;
  priority_ring: string;
  rings: Array<{
    syndicate_id: string;
    ring_leader: string;
    leader_phone: string;
    member_count: number;
    members: string[];
    threat_level: string;
  }>;
}

export interface GangListResponse {
  total_gangs: number;
  confirmed_count: number;
  candidate_count: number;
  dismissed_count: number;
  gangs: GangRecord[];
}

export interface GangRecord {
  gang_id: string;
  name: string;
  status: 'CONFIRMED' | 'CANDIDATE' | 'DISMISSED';
  member_count: number;
  members: string[];
  ring_leader: string;
  leader_phone: string;
  aggregate_threat_score: number;
  primary_locations: string[];
  date_first_detected: string;
}

export interface GangSubGraphResponse {
  gang_id: string;
  gang_name: string;
  total_nodes: number;
  total_edges: number;
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

// Dossiers Module Types
export interface AlertsResponse {
  total_alerts: number;
  alerts: Array<{
    id: string;
    severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
    title: string;
    message: string;
    timestamp: string;
  }>;
}

export interface SuspectDossierDetails {
  suspect_name: string;
  phone_number: string;
  threat_score: number;
  cctv_meetings_count: number;
  fir_matches_count: number;
  cdr_calls_count: number;
  dossier_markdown: string;
  driver_breakdown?: Record<string, number>;
}

export interface SearchResultResponse {
  query: string;
  total_matches: number;
  fir_matches: Array<{
    fir_number: string;
    accused_name: string;
    location: string;
  }>;
  cdr_matches: Array<{
    caller: string;
    receiver: string;
  }>;
  cctv_matches: Array<{
    camera_id: string;
    location: string;
  }>;
}

export interface TimelineResponse {
  suspect_name: string;
  phone_number: string;
  total_events: number;
  events: Array<{
    event_id: string;
    timestamp: string;
    source_module: 'CCTV' | 'FINANCIAL' | 'CDR' | 'FIR' | 'SOCIAL' | 'NOCTURNAL' | 'SURVEILLANCE';
    color: string;
    title: string;
    description: string;
    metadata: Record<string, any>;
  }>;
}

export interface FIRNLPResponse {
  fir_id: string;
  fir_number: string;
  raw_text: string;
  entities: Array<{
    text: string;
    category: string;
    confidence: number;
  }>;
  suspects: string[];
  suspect_details: Array<{
    name: string;
    raw_mention: string;
    matched_in_database: boolean;
    confidence: number;
    phone_number: string;
    inferred_role: string;
  }>;
  co_accused: string[];
  locations: string[];
  weapons: string[];
  vehicles: string[];
  aliases: string[];
  statutes: Array<{
    raw_section: string;
    code: string;
    title: string;
    bns_equivalent: string;
    severity_score: number;
    category: string;
    bailable: boolean;
    confidence: number;
  }>;
  suggested_statutes: Array<{
    raw_section: string;
    code: string;
    title: string;
    bns_equivalent: string;
    severity_score: number;
    category: string;
    bailable: boolean;
    confidence: number;
    suggested: boolean;
    suggestion_reason: string;
  }>;
  modus_operandi: Array<{
    crime_category: string;
    confidence: number;
    matched_indicators: string[];
    count: number;
  }>;
  financial_amounts: string[];
  crime_types: string[];
  relationships: Array<{
    source: string;
    target: string;
    relation_type: string;
    evidence?: string;
    confidence?: number;
  }>;
  case_severity_score: number;
  severity_tier: string;
  summary_verdict: string;
}

// Financial Module Types
export interface FinancialIntelligenceResponse {
  total_transactions: number;
  total_volume_inr: number;
  high_risk_suspects_count: number;
  summaries: Array<{
    suspect_name: string;
    threat_score: number;
    total_transactions: number;
    total_volume_inr: number;
    failed_withdrawals: number;
    wine_shop_spent_inr: number;
    peer_transfer_count: number;
  }>;
  transactions: Array<{
    transaction_id: string;
    sender_name: string;
    receiver_name: string;
    merchant_category: string;
    amount_inr: number;
    timestamp: string;
  }>;
}

export interface FinancialGraphResponse {
  total_nodes: number;
  total_edges: number;
  nodes: Array<{
    id: string;
    label: string;
    threat_score: number;
    total_volume_inr: number;
    transaction_count: number;
    risk_tier: string;
  }>;
  edges: FinancialGraphEdge[];
}

export interface FinancialGraphEdge {
  source: string;
  target: string;
  amount_inr: number;
  transaction_count: number;
}

export interface MoneyFlowTraceResponse {
  source?: string;
  source_id?: string;
  source_name?: string;
  target?: string | null;
  target_id?: string | null;
  total_volume_inr?: number;
  total_paths_found?: number;
  paths?: Array<{
    path_nodes?: string[];
    hop_count?: number;
    source_entity?: string;
    destination_entity?: string;
    destination_type?: string;
    total_flow_amount_inr?: number;
    channels_used?: string[];
    shell_companies_involved?: string[];
    is_layering_chain?: boolean;
    hops?: Array<{
      hop_index?: number;
      from_id?: string;
      from_name?: string;
      from_type?: string;
      to_id?: string;
      to_name?: string;
      to_type?: string;
      amount_inr?: number;
      transaction_count?: number;
      primary_channel?: string;
      latest_timestamp?: string;
    }>;
  }>;
  hops?: Array<{
    from: string;
    to: string;
    amount_inr: number;
    transaction_id: string;
    timestamp: string;
  }>;
}

export interface LaunderingPatternsResponse {
  total_alerts?: number;
  critical_alerts_count?: number;
  total_patterns?: number;
  alerts?: Array<{
    alert_id: string;
    pattern_type: string;
    severity: string;
    risk_score: number;
    title: string;
    description: string;
    total_volume_inr: number;
    entity_count: number;
    entities_involved: string[];
    recommended_action: string;
  }>;
  patterns?: Array<{
    pattern_id: string;
    pattern_type: string;
    suspicion_score: number;
    involved_entities: string[];
    transaction_volume_inr: number;
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  }>;
}

export interface FinancialCentralityResponse {
  entities: Array<{
    entity_id: string;
    entity_name: string;
    threat_score: number;
    centrality_score: number;
    risk_tier: string;
    incoming_volume_inr: number;
    outgoing_volume_inr: number;
  }>;
}

export interface PMLADossierResponse {
  entity_id: string;
  entity_name: string;
  threat_score: number;
  total_transactions: number;
  total_volume_inr: number;
  suspicious_activity_flag: boolean;
  ml_risk_indicators: string[];
  violation_severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommended_action: string;
  legal_notice: string;
}

export interface CourtEvidenceCertificateResponse {
  certificate_id: string;
  entity_id: string;
  entity_name?: string;
  timestamp?: string;
  sha256_hash?: string;
  court_case_number?: string;
  issuing_authority?: string;
  issuance_date?: string;
  validity_period?: string;
  evidence_summary?: string;
  pg_number?: number;
  digitised_copy_url?: string;
  digital_signature?: string;
  verification_hash?: string;
}

// Threat Leaderboard Module Types
export interface ThreatLeaderboardResponse {
  total_suspects: number;
  critical_count: number;
  high_count: number;
  moderate_count: number;
  low_count: number;
  leaderboard: Array<{
    suspect_name: string;
    phone_number: string;
    total_threat_score: number;
    cctv_meeting_score: number;
    cdr_network_score: number;
    fir_severity_score: number;
    criminal_history_score: number;
    financial_risk_score: number;
    surveillance_score: number;
    primary_driver?: string;
    primary_driver_pct?: number;
    driver_breakdown?: Record<string, number>;
  }>;
}

export interface SimulationWeightsRequest {
  cctv_weight: number;
  cdr_weight: number;
  fir_weight: number;
  criminal_weight: number;
  financial_weight: number;
  surveillance_weight: number;
}

export interface SimulationResponse {
  total_weight: number;
  simulated_leaderboard: Array<{
    suspect_name: string;
    phone_number: string;
    total_threat_score: number;
    cctv_meeting_score: number;
    cdr_network_score: number;
    fir_severity_score: number;
    criminal_history_score: number;
    financial_risk_score: number;
    surveillance_score: number;
  }>;
}

// Social Media Module Types
export interface SocialMediaResponse {
  total_monitored_suspects: number;
  total_flagged_posts: number;
  total_location_clusters: number;
  location_clusters: Array<{
    approximate_location: string;
    suspect_count: number;
    platforms_used: string;
    devices_used: string;
    suspects: string[];
  }>;
  suspects: Array<{
    suspect_name: string;
    phone_number: string;
    total_platforms: number;
    total_posts: number;
    overall_sentiment: string;
    risk_score: number;
    profiles: Array<{
      platform: string;
      handle: string;
      followers_count: number;
      following_count: number;
      is_verified: boolean;
      status_flag: string;
      profile_url: string;
    }>;
    recent_posts: Array<{
      post_id: string;
      platform: string;
      timestamp: string;
      content: string;
      sentiment: string;
      risk_level: string;
      likes: number;
      shares: number;
      hashtags: string[];
      tagged_users: string[];
      location_checkin: string;
    }>;
  }>;
}

export interface SuspectSocialFootprint {
  suspect_name: string;
  phone_number: string;
  total_platforms: number;
  total_posts: number;
  overall_sentiment: string;
  risk_score: number;
  profiles: Array<{
    platform: string;
    handle: string;
    followers_count: number;
    following_count: number;
    is_verified: boolean;
    status_flag: string;
    profile_url: string;
  }>;
  recent_posts: Array<{
    post_id: string;
    platform: string;
    timestamp: string;
    content: string;
    sentiment: string;
    risk_level: string;
    likes: number;
    shares: number;
    hashtags: string[];
    tagged_users: string[];
    location_checkin: string;
  }>;
}

// Nocturnal Module Types
export interface NocturnalAnomaliesResponse {
  total_anomalies: number;
  hotspots_count: number;
  calls: Array<{
    caller_name: string;
    receiver_name: string;
    call_type: string;
    duration_seconds: number;
    cell_tower_location: string;
    timestamp: string;
  }>;
  towers: Array<{
    cell_tower_location: string;
    nocturnal_call_count: number;
  }>;
}

// Surveillance Module Types
export interface SurveillanceHeatmapResponse {
  total_observations: number;
  reports: Array<{
    report_id: string;
    fir_number: string;
    spot_location: string;
    patrol_officer_1: string;
    patrol_officer_2: string;
    observation_details: string;
    panchnama_conducted: boolean;
    witness_count: number;
  }>;
}

// Shared Geo Types
export interface GeoPoint {
  id: string;
  lat: number;
  lng: number;
  title: string;
  category: string;
  timestamp: string;
  details: string;
  color: string;
}

export interface GeoPointsResponse {
  total_points: number;
  points: GeoPoint[];
}

// Intelligence Insights Module Types
export interface CriticalAlert {
  id: string;
  alert_type: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  risk_score: number;
  confidence_score: number;
  timestamp: string;
  entities_involved: string[];
  recommended_action: string;
  evidence_sources: string[];
  cross_modal_correlations?: Record<string, any>;
}

export interface KeyInfluencer {
  entity_id: string;
  entity_name: string;
  entity_type: string;
  influence_score: number;
  centrality_breakdown: {
    pagerank: number;
    betweenness: number;
    eigenvector: number;
    closeness: number;
    degree_centrality: number;
  };
  risk_tier: string;
  total_inflow: number;
  total_outflow: number;
  network_position: string;
}

export interface InvestigativeLead {
  id: string;
  lead_type: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  confidence_score: number;
  evidence_summary: string;
  recommended_actions: string[];
  entities_related: string[];
  timestamp: string;
}

export interface TrendAnalysis {
  metric: string;
  time_period: string;
  trend_direction: 'INCREASING' | 'DECREASING' | 'STABLE';
  change_percentage: number;
  data_points: Array<{
    timestamp: string;
    value: number;
  }>;
  forecast?: Array<{
    timestamp: string;
    value: number;
    confidence_interval: number;
  }>;
}

export interface GeographicHotspot {
  location: string;
  latitude: number;
  longitude: number;
  incident_count: number;
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW';
  primary_crime_types: string[];
  timestamp_range: {
    start: string;
    end: string;
  };
}

export interface NetworkAnalytics {
  communities: Array<{
    id: string;
    size: number;
    density: number;
    risk_score: number;
    member_types: Record<string, number>;
    internal_cohesion: number;
    isolation_measure: number;
  }>;
  centrality_distribution: {
    pagerank: Record<string, number>;
    betweenness: Record<string, number>;
    eigenvector: Record<string, number>;
  };
  network_metrics: {
    density: number;
    average_clustering: number;
    connected_components: number;
    largest_component_size: number;
  };
  temporal_evolution: Array<{
    timestamp: string;
    nodes: number;
    edges: number;
    density: number;
  }>;
}

export interface IntelligenceInsightsResponse {
  critical_alerts: CriticalAlert[];
  key_influencers: KeyInfluencer[];
  investigative_leads: InvestigativeLead[];
  trend_analysis: TrendAnalysis[];
  geographic_hotspots: GeographicHotspot[];
  network_analytics: NetworkAnalytics;
  analysis_timestamp: string;
}

// Module 10: Criminal History Database Types
export interface CriminalRecord {
  uidb_number: string;
  fir_number: string;
  suspect_name: string;
  known_aliases: string;
  prior_convictions_count: number;
  previous_ps_name: string;
  previous_offence: string;
  act_and_sections?: string;
  modus_operandi?: string;
  mob_number?: string;
  crime_category?: string;
  custody_location?: string;
  case_year: string;
  case_status: string;
}

export interface CriminalHistorySummaryResponse {
  total_records: number;
  repeat_offenders_count: number;
  under_trial_count: number;
  bailed_count: number;
  disposed_count: number;
  clean_records_count: number;
  offence_breakdown: Record<string, number>;
  police_station_breakdown: Record<string, number>;
  crime_category_breakdown?: Record<string, number>;
  top_repeat_offenders: CriminalRecord[];
}

export interface CriminalRecordsListResponse {
  total_count: number;
  filtered_count: number;
  records: CriminalRecord[];
}

// CDR Suspect Pair Comparison Types
export interface IntermediaryContact {
  id: string;
  label: string;
  name: string;
  type: "PERSON" | "PHONE" | "DEVICE" | "TOWER" | "SYNDICATE";
  icon: string;
  threat: number;
  callsA: number;
  callsB: number;
  duration: number;
  role?: string;
  details?: string;
}

export interface ExclusiveContact {
  id: string;
  label: string;
  name: string;
  type: "PERSON" | "PHONE" | "DEVICE";
  icon: string;
  threat: number;
  callsA?: number;
  callsB?: number;
  calls: number;
  duration: number;
  role?: string;
}

export interface DirectConnectionInfo {
  has_direct_calls: boolean;
  total_calls: number;
  total_duration_min: number;
  nocturnal_calls: number;
  sms_count: number;
  incoming_a_to_b: number;
  outgoing_a_to_b: number;
}

export interface SharedCellTowerInfo {
  tower_id: string;
  location: string;
  calls_a: number;
  calls_b: number;
  last_detected: string;
}

export interface CDRComparisonResponse {
  suspect_a: string;
  suspect_b: string;
  node_a?: NetworkNode;
  node_b?: NetworkNode;
  direct_connection: DirectConnectionInfo;
  shared_contacts: IntermediaryContact[];
  left_contacts: ExclusiveContact[];
  right_contacts: ExclusiveContact[];
  shared_cell_towers: SharedCellTowerInfo[];
}