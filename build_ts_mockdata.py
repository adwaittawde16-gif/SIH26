import json
from pathlib import Path

bundle = json.load(open('intelligence_export_full.json', encoding='utf-8'))
ts_path = Path('frontend/src/lib/mockData.ts')

# Clean PMLA Graph
pmla_graph_raw = bundle.get('pmla_graph', {})
pmla_nodes = []
for n in pmla_graph_raw.get('nodes', []):
    pmla_nodes.append({
        'id': str(n.get('id', '')),
        'label': str(n.get('label', n.get('id', ''))),
        'threat_score': float(n.get('threat_score', 65.0)),
        'total_volume_inr': float(n.get('total_volume_inr', 1000000.0)),
        'transaction_count': int(n.get('transaction_count', 5)),
        'risk_tier': str(n.get('risk_tier', 'CRITICAL'))
    })

pmla_edges = []
for l in pmla_graph_raw.get('links', []):
    pmla_edges.append({
        'source': str(l.get('source', '')),
        'target': str(l.get('target', '')),
        'amount_inr': float(l.get('amount_inr', l.get('total_amount_inr', 100000.0))),
        'transaction_count': int(l.get('transaction_count', 1))
    })

cleaned_pmla_graph = {
    'total_nodes': len(pmla_nodes),
    'total_edges': len(pmla_edges),
    'nodes': pmla_nodes,
    'edges': pmla_edges
}

# Clean PMLA Patterns
pmla_patterns_raw = bundle.get('pmla_patterns', {})
pmla_alerts = []
for i, a in enumerate(pmla_patterns_raw.get('alerts', [])):
    pmla_alerts.append({
        'alert_id': str(a.get('alert_id', f'ALT-{i+1}')),
        'pattern_type': str(a.get('pattern_type', 'HAWALA')),
        'severity': str(a.get('severity', 'CRITICAL')),
        'risk_score': float(a.get('risk_score', 85.0)),
        'title': str(a.get('title', 'Laundering Alert')),
        'description': str(a.get('description', '')),
        'total_volume_inr': float(a.get('total_volume_inr', 5000000.0)),
        'entity_count': int(a.get('entity_count', 2)),
        'entities_involved': [str(e) for e in a.get('entities_involved', [])],
        'recommended_action': str(a.get('recommended_action', 'Review CTR logs'))
    })

pmla_pat_items = []
for i, p in enumerate(pmla_patterns_raw.get('patterns', [])):
    lvl = p.get('risk_level', 'CRITICAL')
    if lvl not in ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']:
        lvl = 'HIGH'
    pmla_pat_items.append({
        'pattern_id': str(p.get('pattern_id', f'PAT-{i+1}')),
        'pattern_type': str(p.get('pattern_type', 'STRUCTURING')),
        'suspicion_score': float(p.get('suspicion_score', 0.9)),
        'involved_entities': [str(e) for e in p.get('involved_entities', [])],
        'transaction_volume_inr': float(p.get('transaction_volume_inr', 2500000.0)),
        'risk_level': lvl
    })

cleaned_pmla_patterns = {
    'total_alerts': len(pmla_alerts),
    'critical_alerts_count': len([a for a in pmla_alerts if a['severity'] == 'CRITICAL']),
    'total_patterns': len(pmla_pat_items),
    'alerts': pmla_alerts,
    'patterns': pmla_pat_items
}

# Clean PMLA Centrality
pmla_cent_raw = bundle.get('pmla_centrality', [])
cleaned_centrality_entities = []
for c in pmla_cent_raw:
    cleaned_centrality_entities.append({
        'entity_id': str(c.get('entity_id', '')),
        'entity_name': str(c.get('entity_name', '')),
        'threat_score': float(c.get('pagerank_score', 0.75) * 100),
        'centrality_score': float(c.get('betweenness_score', 0.85)),
        'risk_tier': str(c.get('pmla_risk_tier', 'CRITICAL')),
        'incoming_volume_inr': float(c.get('total_incoming_volume', 4500000.0)),
        'outgoing_volume_inr': float(c.get('total_outgoing_volume', 3800000.0))
    })

cleaned_centrality = {
    'entities': cleaned_centrality_entities
}

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write('''/**
 * Complete Authentic Intelligence Platform Master Data Layer
 * Generated directly from the 9 master CSV databases and Python Intelligence Engines.
 * Full coverage for all 100 suspects, 186 financial transactions, 182 CDR calls,
 * 177 CCTV sightings, 115 surveillance logs, 100 social media footprints,
 * 171 PMLA financial entities, 88 crime rings, and 100 complete Dossiers and Timelines.
 */

import {
  ThreatLeaderboardResponse,
  CDRSummaryResponse,
  NetworkGraphResponse,
  CCTVMeetingsResponse,
  FinancialIntelligenceResponse,
  NocturnalAnomaliesResponse,
  SurveillanceHeatmapResponse,
  AlertsResponse,
  SuspectDossierDetails,
  SearchResultResponse,
  GangListResponse,
  TimelineResponse,
  SocialMediaResponse,
  GeoPointsResponse,
  CriminalHistorySummaryResponse,
  CriminalRecordsListResponse,
  FinancialGraphResponse,
  LaunderingPatternsResponse,
  FinancialCentralityResponse,
  PMLADossierResponse,
  CourtEvidenceCertificateResponse,
  SuspiciousPatternResponse,
  CDRComparisonResponse
} from '../types';

''')

    # 1. Leaderboard
    f.write(f'export const fallbackLeaderboard: ThreatLeaderboardResponse = {json.dumps(bundle["leaderboard"], indent=2)};\n\n')

    # 2. CDR Pairs
    f.write(f'export const fallbackCDRPairs: CDRSummaryResponse = {json.dumps(bundle["cdr_summary"], indent=2)};\n\n')

    # 3. CDR Graph
    f.write(f'export const fallbackCDRGraph: NetworkGraphResponse = {json.dumps(bundle["cdr_graph"], indent=2)};\n\n')

    # 4. CCTV Meetings
    f.write(f'export const fallbackCCTVMeetings: CCTVMeetingsResponse = {json.dumps(bundle["cctv_meetings"], indent=2)};\n\n')

    # 5. Gangs
    f.write(f'export const fallbackGangs: GangListResponse = {json.dumps(bundle["gangs"], indent=2)};\n\n')

    # 6. Financial
    f.write(f'export const fallbackFinancial: FinancialIntelligenceResponse = {json.dumps(bundle["financial"], indent=2)};\n\n')

    # 7. Nocturnal
    f.write(f'export const fallbackNocturnal: NocturnalAnomaliesResponse = {json.dumps(bundle["nocturnal"], indent=2)};\n\n')

    # 8. Surveillance
    f.write(f'export const fallbackSurveillance: SurveillanceHeatmapResponse = {json.dumps(bundle["surveillance"], indent=2)};\n\n')

    # 9. Alerts
    f.write(f'export const fallbackAlerts: AlertsResponse = {json.dumps(bundle["alerts"], indent=2)};\n\n')

    # 10. Criminal Summary & List
    f.write(f'export const fallbackCriminalSummary: CriminalHistorySummaryResponse = {json.dumps(bundle["criminal_summary"], indent=2)};\n\n')
    f.write(f'export const fallbackCriminalRecordsList: CriminalRecordsListResponse = {json.dumps(bundle["criminal_records"], indent=2)};\n\n')

    # 11. Social
    f.write(f'export const fallbackSocial: SocialMediaResponse = {json.dumps(bundle["social"], indent=2)};\n\n')

    # 12. Geo
    f.write(f'export const fallbackGeo: GeoPointsResponse = {json.dumps(bundle["geo"], indent=2)};\n\n')

    # 13. PMLA Financial Graph & Patterns
    f.write(f'export const fallbackFinancialGraph: FinancialGraphResponse = {json.dumps(cleaned_pmla_graph, indent=2)};\n\n')
    f.write(f'export const fallbackLaunderingPatterns: LaunderingPatternsResponse = {json.dumps(cleaned_pmla_patterns, indent=2)};\n\n')
    f.write(f'export const fallbackFinancialCentrality: FinancialCentralityResponse = {json.dumps(cleaned_centrality, indent=2)};\n\n')
    f.write(f'export const fallbackFinancialEntities = {json.dumps(bundle["pmla_entities"], indent=2)};\n\n')

    # 14. Master Dossier Map (all 100 suspects)
    f.write(f'export const fallbackDossierMap: Record<string, SuspectDossierDetails> = {json.dumps(bundle["dossier_map"], indent=2)};\n\n')

    # 15. Master Timeline Map (all 100 suspects)
    f.write(f'export const fallbackTimelineMap: Record<string, TimelineResponse> = {json.dumps(bundle["timeline_map"], indent=2)};\n\n')

    # 16. PMLA Dossiers & Court Certs Map
    f.write(f'export const fallbackPMLADossierMap: Record<string, any> = {json.dumps(bundle["pmla_dossier_map"], indent=2)};\n\n')
    f.write(f'export const fallbackCourtCertMap: Record<string, any> = {json.dumps(bundle["court_cert_map"], indent=2)};\n\n')

    # 17. Default single fallbacks for backwards compatibility
    top_suspect_name = bundle['leaderboard']['leaderboard'][0]['suspect_name']
    f.write(f'export const fallbackDossier: SuspectDossierDetails = fallbackDossierMap["{top_suspect_name}"] || Object.values(fallbackDossierMap)[0];\n\n')
    f.write(f'export const fallbackTimeline: TimelineResponse = fallbackTimelineMap["{top_suspect_name}"] || Object.values(fallbackTimelineMap)[0];\n\n')
    f.write(f'export const fallbackPMLADossier: any = Object.values(fallbackPMLADossierMap)[0] || {{}};\n\n')
    f.write(f'export const fallbackCourtEvidenceCertificate: any = Object.values(fallbackCourtCertMap)[0] || {{}};\n\n')

    # 18. Suspicious patterns & insights
    f.write('''export const fallbackSuspiciousPatterns: SuspiciousPatternResponse = {
  patterns: [
    {
      type: "NOCTURNAL_BURST_COORDINATION",
      risk_level: "HIGH",
      description: "65 off-hours burner phone exchanges detected between 00:00 - 06:00 IST preceding high-value financial movements.",
      title: "Synchronized Nocturnal Call Burst (Byculla and Mazgaon)",
      confidence: 0.96,
      involved_entities: ["Md. Advik Golla", "Md. Zashil Mistry", "Md. Ranbir Bhalla", "Md. Azad Mannan"],
      detected_at: "2026-09-14 03:22:15 IST",
      recommended_action: "Execute technical interception warrant under Section 5(2) Indian Telegraph Act."
    },
    {
      type: "CROSS_TOWER_CO_LOCATION",
      risk_level: "HIGH",
      description: "12 optical co-location matches verified across Byculla Station and Venus Wine Shop within 15-minute time windows.",
      title: "Multi-Camera Physical Rendezvous Convergence",
      confidence: 0.91,
      involved_entities: ["Md. Advik Golla", "Md. Zashil Mistry", "Md. Teerth Bhargava"],
      detected_at: "2026-09-12 19:45:00 IST",
      recommended_action: "Deploy AEC static surveillance team at identified transit choke points."
    },
    {
      type: "STRUCTURING_LAYERED_HAWALA",
      risk_level: "HIGH",
      description: "186 transactions totaling INR 8.69 Crore routed through Hawala brokers and peer transfer nodes to evade CTR thresholds.",
      title: "Layered Cash Structuring via Shell LLPs",
      confidence: 0.94,
      involved_entities: ["Apex Horizon Trading LLP", "Global Matrix Logistics", "Md. Advik Golla"],
      detected_at: "2026-09-10 14:10:00 IST",
      recommended_action: "Issue provisional attachment orders under PMLA Section 5."
    }
  ],
  warnings: [
    "High-frequency burner SIM rotation active on Byculla tower node",
    "Suspicious cross-border remittance flagged on Hawala shell account"
  ],
  analysis_timestamp: "2026-09-16T18:00:00Z"
};

export const fallbackIntelligenceInsights = {
  timestamp: "2026-09-16T18:00:00Z",
  status: "ACTIVE",
  total_insights: 6,
  threat_posture: "ELEVATED",
  active_syndicates: fallbackGangs.total_gangs,
  high_risk_suspects: fallbackLeaderboard.critical_count + fallbackLeaderboard.high_count,
  total_financial_exposure_inr: fallbackFinancial.total_volume_inr,
  top_critical_threats: fallbackLeaderboard.leaderboard.slice(0, 5),
  insights: [
    {
      id: "INS-01",
      category: "CDR_COMMUNICATION",
      title: "Burner SIM Rotation Anomaly",
      summary: "Identified high-frequency SIM swaps occurring at South Mumbai cell towers during night windows.",
      severity: "CRITICAL",
      confidence: 0.92
    },
    {
      id: "INS-02",
      category: "OPTICAL_SURVEILLANCE",
      title: "Syndicate Co-Location at Transit Nodes",
      summary: "Multiple high-ranking syndicate members sighted in close proximity to Byculla and Agripada junctions.",
      severity: "HIGH",
      confidence: 0.89
    },
    {
      id: "INS-03",
      category: "FINANCIAL_INTELLIGENCE",
      title: "Suspicious PMLA Hawala Injections",
      summary: "Over INR 8.69 Cr in fragmented transfers identified across registered corporate trading entities.",
      severity: "CRITICAL",
      confidence: 0.95
    }
  ]
};

export function generateFallbackCDRComparison(num1: string, num2: string): CDRComparisonResponse {
  const allPairs = fallbackCDRPairs.pairs;
  const match = allPairs.find(
    p => (p.suspect_1 === num1 && p.suspect_2 === num2) ||
         (p.suspect_1 === num2 && p.suspect_2 === num1)
  );

  return {
    suspect_a: num1,
    suspect_b: num2,
    direct_connection: {
      has_direct_calls: Boolean(match && match.total_calls > 0),
      total_calls: match ? match.total_calls : 0,
      total_duration_min: match ? match.total_duration_min : 0,
      nocturnal_calls: match ? match.nocturnal_calls : 0,
      sms_count: match ? match.sms_count : 0,
      incoming_a_to_b: match ? match.incoming_count : 0,
      outgoing_a_to_b: match ? match.outgoing_count : 0
    },
    shared_contacts: [],
    left_contacts: [],
    right_contacts: [],
    shared_cell_towers: [
      {
        tower_id: "MH-TOWER-BYCULLA-04",
        location: "Byculla Station Road Footpath",
        calls_a: match ? Math.ceil(match.total_calls / 2) : 2,
        calls_b: match ? Math.floor(match.total_calls / 2) : 2,
        last_detected: "2026-07-21 01:15:22"
      }
    ]
  };
}

export function getFallbackDossier(name: string): SuspectDossierDetails {
  if (!name) return fallbackDossier;
  const clean = name.trim().toLowerCase();
  for (const [k, v] of Object.entries(fallbackDossierMap)) {
    if (k.toLowerCase() === clean || k.toLowerCase().includes(clean) || clean.includes(k.toLowerCase())) {
      return v;
    }
  }
  const sInfo = fallbackLeaderboard.leaderboard.find(
    s => s.suspect_name.toLowerCase().includes(clean) || clean.includes(s.suspect_name.toLowerCase())
  );
  return {
    suspect_name: sInfo ? sInfo.suspect_name : name,
    phone_number: sInfo ? sInfo.phone_number : "+91-9800000000",
    threat_score: sInfo ? sInfo.total_threat_score : 50.0,
    cctv_meetings_count: 1,
    fir_matches_count: 1,
    cdr_calls_count: 12,
    dossier_markdown: `# BRIHANMUMBAI POLICE — INTELLIGENCE DOSSIER\\n**SUBJECT**: ${name}\\n**STATUS**: ACTIVE SURVEILLANCE\\n\\n### STATUTORY CRIMINAL PROFILE\\nSubject profiled under tactical surveillance mesh. Cross-domain telemetry active.`,
    driver_breakdown: sInfo ? sInfo.driver_breakdown : { CCTV: 10, CDR: 10, FIR: 10, "Criminal History": 10, Financial: 5, Surveillance: 5 }
  };
}

export function getFallbackTimeline(name: string): TimelineResponse {
  if (!name) return fallbackTimeline;
  const clean = name.trim().toLowerCase();
  for (const [k, v] of Object.entries(fallbackTimelineMap)) {
    if (k.toLowerCase() === clean || k.toLowerCase().includes(clean) || clean.includes(k.toLowerCase())) {
      return v;
    }
  }
  return {
    suspect_name: name,
    phone_number: "+91-9800000000",
    total_events: 2,
    events: [
      {
        event_id: "EVT-01",
        timestamp: "2026-07-21 20:19:49",
        source_module: "SURVEILLANCE",
        color: "#6366f1",
        title: "Field Reconnaissance Observation",
        description: `Field observation logged for ${name}. Panchnama conducted.`,
        metadata: { suspect: name }
      },
      {
        event_id: "EVT-02",
        timestamp: "2026-07-20 02:45:00",
        source_module: "NOCTURNAL",
        color: "#06b6d4",
        title: "Nocturnal Interaction Spike",
        description: `Late-night CDR call activity recorded on primary MSISDN.`,
        metadata: { suspect: name }
      }
    ]
  };
}

export function searchFallbackIntelligence(query: string): SearchResultResponse {
  const q = (query || "").trim().toLowerCase();
  if (!q) {
    return {
      query: "",
      total_matches: 0,
      fir_matches: [],
      cdr_matches: [],
      cctv_matches: []
    };
  }

  const firMatches = fallbackCriminalRecordsList.records
    .filter(r => r.suspect_name.toLowerCase().includes(q) || r.fir_number.toLowerCase().includes(q) || r.uidb_number.toLowerCase().includes(q) || r.previous_offence.toLowerCase().includes(q) || r.previous_ps_name.toLowerCase().includes(q))
    .slice(0, 10)
    .map(r => ({
      fir_number: r.fir_number,
      accused_name: r.suspect_name,
      location: r.previous_ps_name,
      offence: r.previous_offence,
      uidb: r.uidb_number
    }));

  const cdrMatches = fallbackCDRPairs.pairs
    .filter(p => p.suspect_1.toLowerCase().includes(q) || p.suspect_2.toLowerCase().includes(q))
    .slice(0, 10)
    .map(p => ({
      caller: p.suspect_1,
      receiver: p.suspect_2,
      total_calls: p.total_calls
    }));

  const cctvMatches = fallbackCCTVMeetings.meetings
    .filter(m => m.suspect_1.toLowerCase().includes(q) || m.suspect_2.toLowerCase().includes(q) || m.camera_location.toLowerCase().includes(q) || m.camera_id.toLowerCase().includes(q))
    .slice(0, 10)
    .map(m => ({
      camera_id: m.camera_id,
      location: m.camera_location,
      suspect_1: m.suspect_1,
      suspect_2: m.suspect_2
    }));

  return {
    query,
    total_matches: firMatches.length + cdrMatches.length + cctvMatches.length,
    fir_matches: firMatches,
    cdr_matches: cdrMatches,
    cctv_matches: cctvMatches
  };
}
''')

print(f'[OK] Generated {ts_path} ({ts_path.stat().st_size} bytes)!')
