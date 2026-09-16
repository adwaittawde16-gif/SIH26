/**
 * Fallback Demonstration Intelligence Data for Vercel Cloud Deployments
 * Used automatically when local FastAPI backend is unreachable.
 */

import {
  ThreatLeaderboardResponse,
  CDRSummaryResponse,
  NetworkGraphResponse,
  CCTVMeetingsResponse,
  CrimeRingsResponse,
  FinancialIntelligenceResponse,
  NocturnalAnomaliesResponse,
  SurveillanceHeatmapResponse,
  AlertsResponse,
  SuspectDossierDetails,
  SearchResultResponse,
  GangListResponse,
  GangSubGraphResponse,
  TimelineResponse,
  SocialMediaResponse,
  FIRNLPResponse,
  GeoPointsResponse
} from "../types";

export const fallbackLeaderboard: ThreatLeaderboardResponse = {
  total_suspects: 10,
  critical_count: 3,
  high_count: 4,
  moderate_count: 2,
  low_count: 1,
  leaderboard: [
    {
      suspect_name: "Md. Ranbir Bhalla",
      phone_number: "+91-2236381844",
      total_threat_score: 94.2,
      cctv_meeting_score: 90.0,
      cdr_network_score: 95.0,
      fir_severity_score: 92.0,
      criminal_history_score: 98.0,
      financial_risk_score: 88.0,
      surveillance_score: 95.0
    },
    {
      suspect_name: "Md. Teerth Bhargava",
      phone_number: "+91-7611970993",
      total_threat_score: 88.5,
      cctv_meeting_score: 85.0,
      cdr_network_score: 90.0,
      fir_severity_score: 89.0,
      criminal_history_score: 86.0,
      financial_risk_score: 91.0,
      surveillance_score: 88.0
    },
    {
      suspect_name: "Md. Vedant Padmanabhan",
      phone_number: "+91-2530358841",
      total_threat_score: 84.1,
      cctv_meeting_score: 80.0,
      cdr_network_score: 88.0,
      fir_severity_score: 82.0,
      criminal_history_score: 85.0,
      financial_risk_score: 84.0,
      surveillance_score: 86.0
    },
    {
      suspect_name: "Md. Pranit Arya",
      phone_number: "+91-7774789752",
      total_threat_score: 79.6,
      cctv_meeting_score: 75.0,
      cdr_network_score: 82.0,
      fir_severity_score: 78.0,
      criminal_history_score: 80.0,
      financial_risk_score: 81.0,
      surveillance_score: 79.0
    },
    {
      suspect_name: "Md. Hardik Kant",
      phone_number: "+91-8482336846",
      total_threat_score: 73.4,
      cctv_meeting_score: 70.0,
      cdr_network_score: 76.0,
      fir_severity_score: 71.0,
      criminal_history_score: 74.0,
      financial_risk_score: 72.0,
      surveillance_score: 75.0
    }
  ]
};

export const fallbackCDRPairs: CDRSummaryResponse = {
  total_cdr_logs: 1420,
  total_interaction_pairs: 48,
  frequent_pairs_count: 12,
  pairs: [
    {
      suspect_1: "Md. Ranbir Bhalla",
      suspect_2: "Md. Teerth Bhargava",
      total_calls: 142,
      total_duration_min: 384,
      nocturnal_calls: 38,
      sms_count: 64,
      incoming_count: 72,
      outgoing_count: 70
    },
    {
      suspect_1: "Md. Ranbir Bhalla",
      suspect_2: "Md. Vedant Padmanabhan",
      total_calls: 98,
      total_duration_min: 245,
      nocturnal_calls: 24,
      sms_count: 42,
      incoming_count: 48,
      outgoing_count: 50
    },
    {
      suspect_1: "Md. Teerth Bhargava",
      suspect_2: "Md. Pranit Arya",
      total_calls: 86,
      total_duration_min: 210,
      nocturnal_calls: 19,
      sms_count: 31,
      incoming_count: 40,
      outgoing_count: 46
    }
  ]
};

export const fallbackCDRGraph: NetworkGraphResponse = {
  total_nodes: 6,
  total_edges: 8,
  top_key_influencers: [
    {
      id: "node-1",
      label: "Md. Ranbir Bhalla",
      phone: "+91-2236381844",
      threat_score: 94.2,
      degree_centrality: 0.85,
      betweenness_centrality: 0.78,
      total_calls_count: 240,
      connected_entities_count: 5,
      nocturnal_calls_count: 62,
      risk_tier: "CRITICAL",
      gang_id: "GANG-01",
      gang_name: "Gang 1 — Byculla Syndicate"
    }
  ],
  nodes: [
    { id: "Md. Ranbir Bhalla", label: "Md. Ranbir Bhalla", phone: "+91-2236381844", threat_score: 94.2, degree_centrality: 0.85, betweenness_centrality: 0.78, total_calls_count: 240, connected_entities_count: 5, nocturnal_calls_count: 62, risk_tier: "CRITICAL", gang_id: "GANG-01", gang_name: "Gang 1 — Byculla Syndicate" },
    { id: "Md. Teerth Bhargava", label: "Md. Teerth Bhargava", phone: "+91-7611970993", threat_score: 88.5, degree_centrality: 0.72, betweenness_centrality: 0.65, total_calls_count: 180, connected_entities_count: 4, nocturnal_calls_count: 41, risk_tier: "CRITICAL", gang_id: "GANG-01", gang_name: "Gang 1 — Byculla Syndicate" },
    { id: "Md. Vedant Padmanabhan", label: "Md. Vedant Padmanabhan", phone: "+91-2530358841", threat_score: 84.1, degree_centrality: 0.68, betweenness_centrality: 0.54, total_calls_count: 150, connected_entities_count: 4, nocturnal_calls_count: 35, risk_tier: "HIGH", gang_id: "GANG-01", gang_name: "Gang 1 — Byculla Syndicate" },
    { id: "Md. Pranit Arya", label: "Md. Pranit Arya", phone: "+91-7774789752", threat_score: 79.6, degree_centrality: 0.58, betweenness_centrality: 0.42, total_calls_count: 120, connected_entities_count: 3, nocturnal_calls_count: 28, risk_tier: "HIGH", gang_id: "GANG-02", gang_name: "Gang 2 — Lower Parel Ring" },
    { id: "Md. Hardik Kant", label: "Md. Hardik Kant", phone: "+91-8482336846", threat_score: 73.4, degree_centrality: 0.45, betweenness_centrality: 0.30, total_calls_count: 90, connected_entities_count: 2, nocturnal_calls_count: 15, risk_tier: "MODERATE", gang_id: "GANG-02", gang_name: "Gang 2 — Lower Parel Ring" }
  ],
  edges: [
    { source: "Md. Ranbir Bhalla", target: "Md. Teerth Bhargava", total_calls: 142, weight: 14.2 },
    { source: "Md. Ranbir Bhalla", target: "Md. Vedant Padmanabhan", total_calls: 98, weight: 9.8 },
    { source: "Md. Teerth Bhargava", target: "Md. Pranit Arya", total_calls: 86, weight: 8.6 },
    { source: "Md. Vedant Padmanabhan", target: "Md. Hardik Kant", total_calls: 54, weight: 5.4 }
  ]
};

export const fallbackCCTVMeetings: CCTVMeetingsResponse = {
  total_encounters: 28,
  avg_confidence_pct: 87.5,
  mean_distance_meters: 4.2,
  meetings: [
    {
      suspect_1: "Md. Ranbir Bhalla",
      suspect_2: "Md. Teerth Bhargava",
      camera_id: "MH-CCTV-9890",
      camera_location: "Metro Access Road, Byculla West, Mumbai",
      cdr_call_count: 14,
      avg_distance_meters: 3.5,
      avg_match_confidence: 0.92,
      sighting_status: "Verified Match",
      encounter_time: "2026-08-25 18:15:00"
    },
    {
      suspect_1: "Md. Ranbir Bhalla",
      suspect_2: "Md. Vedant Padmanabhan",
      camera_id: "MH-CCTV-9173",
      camera_location: "Public Footpath Corner, Lower Parel, Mumbai",
      cdr_call_count: 9,
      avg_distance_meters: 4.8,
      avg_match_confidence: 0.88,
      sighting_status: "Verified Match",
      encounter_time: "2026-08-24 11:30:00"
    }
  ]
};

export const fallbackGangs: GangListResponse = {
  total_gangs: 2,
  confirmed_count: 1,
  candidate_count: 1,
  dismissed_count: 0,
  gangs: [
    {
      gang_id: "GANG-01",
      name: "Gang 1 — Byculla Extortion Syndicate",
      status: "CONFIRMED",
      member_count: 3,
      members: ["Md. Ranbir Bhalla", "Md. Teerth Bhargava", "Md. Vedant Padmanabhan"],
      ring_leader: "Md. Ranbir Bhalla",
      leader_phone: "+91-2236381844",
      aggregate_threat_score: 88.9,
      primary_locations: ["Byculla West", "Station Road Footpath", "Venus Wine Shop"],
      date_first_detected: "01 AUG 2026"
    },
    {
      gang_id: "GANG-02",
      name: "Gang 2 — Lower Parel Contraband Group",
      status: "CANDIDATE",
      member_count: 2,
      members: ["Md. Pranit Arya", "Md. Hardik Kant"],
      ring_leader: "Md. Pranit Arya",
      leader_phone: "+91-7774789752",
      aggregate_threat_score: 76.5,
      primary_locations: ["Lower Parel", "Bhadakamkar Marg"],
      date_first_detected: "05 AUG 2026"
    }
  ]
};

export const fallbackFinancial: FinancialIntelligenceResponse = {
  total_transactions: 340,
  total_volume_inr: 4850000,
  high_risk_suspects_count: 4,
  summaries: [
    {
      suspect_name: "Md. Ranbir Bhalla",
      threat_score: 94.2,
      total_transactions: 85,
      total_volume_inr: 1850000,
      failed_withdrawals: 12,
      wine_shop_spent_inr: 45000,
      peer_transfer_count: 34
    },
    {
      suspect_name: "Md. Teerth Bhargava",
      threat_score: 88.5,
      total_transactions: 62,
      total_volume_inr: 1240000,
      failed_withdrawals: 8,
      wine_shop_spent_inr: 28000,
      peer_transfer_count: 22
    }
  ],
  transactions: [
    {
      transaction_id: "TXN-99812",
      sender_name: "Md. Ranbir Bhalla",
      receiver_name: "Md. Teerth Bhargava",
      merchant_category: "Peer Transfer (Hawala)",
      amount_inr: 150000,
      timestamp: "2026-08-25 14:20:00"
    },
    {
      transaction_id: "TXN-88124",
      sender_name: "Md. Ranbir Bhalla",
      receiver_name: "Venus Wine Shop",
      merchant_category: "Liquor Outlet",
      amount_inr: 8500,
      timestamp: "2026-08-24 23:45:00"
    }
  ]
};

export const fallbackNocturnal: NocturnalAnomaliesResponse = {
  total_anomalies: 142,
  hotspots_count: 4,
  calls: [
    {
      caller_name: "Md. Ranbir Bhalla",
      receiver_name: "Md. Teerth Bhargava",
      call_type: "Outgoing Call",
      duration_seconds: 480,
      cell_tower_location: "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      timestamp: "2026-08-25 02:45:00"
    },
    {
      caller_name: "Md. Teerth Bhargava",
      receiver_name: "Md. Vedant Padmanabhan",
      call_type: "Incoming Call",
      duration_seconds: 320,
      cell_tower_location: "Station Road Footpath, Agripada, Mumbai",
      timestamp: "2026-08-24 03:15:00"
    }
  ],
  towers: [
    { cell_tower_location: "Venus Wine Shop, Byculla (W)", nocturnal_call_count: 48 },
    { cell_tower_location: "Station Road Footpath, Agripada", nocturnal_call_count: 36 },
    { cell_tower_location: "Bhadakamkar Marg, Grant Road", nocturnal_call_count: 29 },
    { cell_tower_location: "Senapati Bapat Marg, Lower Parel", nocturnal_call_count: 22 }
  ]
};

export const fallbackSurveillance: SurveillanceHeatmapResponse = {
  total_observations: 54,
  reports: [
    {
      report_id: "SR-2026-9901",
      fir_number: "0254/2026",
      spot_location: "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      patrol_officer_1: "Inspector R. Patil",
      patrol_officer_2: "Sub-Inspector V. Kadam",
      observation_details: "Suspect Md. Ranbir Bhalla observed exchanging illegal consignment cash parcel with co-accused.",
      panchnama_conducted: true,
      witness_count: 2
    }
  ]
};

export const fallbackAlerts: AlertsResponse = {
  total_alerts: 4,
  alerts: [
    {
      id: "1",
      severity: "CRITICAL",
      title: "Co-Location Alert: Md. Ranbir Bhalla & Md. Teerth Bhargava",
      message: "Both suspects sighted simultaneously at Byculla Metro Access CCTV zone.",
      timestamp: "07 SEP 2026 18:40 IST"
    },
    {
      id: "2",
      severity: "HIGH",
      title: "Nocturnal Spike: 38 Calls Detected",
      message: "Unusual surge in midnight communications between Gang 1 members.",
      timestamp: "07 SEP 2026 18:15 IST"
    }
  ]
};

export const fallbackDossier: SuspectDossierDetails = {
  suspect_name: "Md. Ranbir Bhalla",
  phone_number: "+91-2236381844",
  threat_score: 94.2,
  cctv_meetings_count: 14,
  fir_matches_count: 3,
  cdr_calls_count: 240,
  dossier_markdown: `# Confidential Police Dossier: Md. Ranbir Bhalla\n\n**Threat Score**: 94.2/100 (CRITICAL RISK)\n**Primary Area**: Byculla West, Mumbai\n\n### Summary\nKey leader of Gang 1 — Byculla Syndicate. Active in extortion, Hawala money transfers, and illegal contraband distribution.`
};

export const fallbackTimeline: TimelineResponse = {
  suspect_name: "Md. Ranbir Bhalla",
  phone_number: "+91-2236381844",
  total_events: 4,
  events: [
    {
      event_id: "evt-1",
      timestamp: "2026-08-25 18:15:00",
      source_module: "CCTV",
      color: "#f59e0b",
      title: "CCTV Camera MH-CCTV-9890 Sighting",
      description: "Location: Metro Access Road, Byculla West | Facial Match Confidence: 92%",
      metadata: { camera_id: "MH-CCTV-9890", confidence: 0.92 }
    },
    {
      event_id: "evt-2",
      timestamp: "2026-08-25 14:20:00",
      source_module: "FINANCIAL",
      color: "#10b981",
      title: "UPI Hawala Transfer: INR 150,000",
      description: "Payee: Md. Teerth Bhargava (SUCCESS)",
      metadata: { amount: 150000, payee: "Md. Teerth Bhargava" }
    },
    {
      event_id: "evt-3",
      timestamp: "2026-08-25 02:45:00",
      source_module: "CDR",
      color: "#38bdf8",
      title: "Midnight Call with Md. Teerth Bhargava",
      description: "Duration: 480s | Cell Tower: Venus Wine Shop, Byculla",
      metadata: { duration_sec: 480 }
    },
    {
      event_id: "evt-4",
      timestamp: "2026-08-20 10:00:00",
      source_module: "FIR",
      color: "#ef4444",
      title: "FIR #0254/2026 Registered",
      description: "Police Station: Byculla PS | IPC Sections: 384 (Extortion), 307 (Attempt to Murder)",
      metadata: { fir_number: "0254/2026", police_station: "Byculla" }
    }
  ]
};

export const fallbackSocial: SocialMediaResponse = {
  total_monitored_suspects: 5,
  total_flagged_posts: 18,
  total_location_clusters: 3,
  location_clusters: [
    {
      approximate_location: "Byculla West, Mumbai",
      suspect_count: 3,
      platforms_used: "WhatsApp, Instagram",
      devices_used: "Android Mobile, Desktop Browser",
      suspects: ["Md. Ranbir Bhalla", "Md. Teerth Bhargava", "Md. Vedant Padmanabhan"]
    },
    {
      approximate_location: "Lower Parel, Mumbai",
      suspect_count: 2,
      platforms_used: "WhatsApp, X / Twitter",
      devices_used: "iPhone",
      suspects: ["Md. Pranit Arya", "Md. Hardik Kant"]
    }
  ],
  suspects: [
    {
      suspect_name: "Md. Ranbir Bhalla",
      phone_number: "+91-2236381844",
      total_platforms: 2,
      total_posts: 6,
      overall_sentiment: "SUSPICIOUS",
      risk_score: 94.2,
      profiles: [
        {
          platform: "Instagram",
          handle: "@md_ranbir_bhalla",
          followers_count: 4200,
          following_count: 350,
          is_verified: false,
          status_flag: "MONITORED",
          profile_url: "https://instagram.com/@md_ranbir_bhalla"
        }
      ],
      recent_posts: [
        {
          post_id: "SM-41280",
          platform: "Instagram",
          timestamp: "2026-08-25 18:20:00",
          content: "Late night operations near Byculla West. Ready for the next consignment.",
          sentiment: "SUSPICIOUS",
          risk_level: "HIGH",
          likes: 340,
          shares: 45,
          hashtags: ["#MumbaiUnderworld", "#NightPatrol"],
          tagged_users: ["@md_teerth_bhargava"],
          location_checkin: "Station Road Footpath, Byculla"
        },
        {
          post_id: "SM-41281",
          platform: "WhatsApp",
          timestamp: "2026-08-26 01:15:22",
          content: "Cash dropped at Venus Wine Shop as agreed. Confirm receipt on Signal.",
          sentiment: "SUSPICIOUS",
          risk_level: "HIGH",
          likes: 128,
          shares: 12,
          hashtags: ["#CashFlow", "#Dadar"],
          tagged_users: [],
          location_checkin: "Venus Wine Shop, Dadar"
        },
        {
          post_id: "SM-41282",
          platform: "X / Twitter",
          timestamp: "2026-08-27 14:05:10",
          content: "Black Pulsar spotted near Lower Parel flyover. Recce complete, standing by.",
          sentiment: "SUSPICIOUS",
          risk_level: "HIGH",
          likes: 215,
          shares: 34,
          hashtags: ["#NightOps", "#SouthBombay"],
          tagged_users: [],
          location_checkin: "Lower Parel Flyover"
        }
      ]
    }
  ]
};

export const fallbackGeo: GeoPointsResponse = {
  total_points: 6,
  points: [
    { id: "pt-1", lat: 18.9780, lng: 72.8300, title: "CCTV Camera MH-CCTV-9890", category: "CCTV", timestamp: "2026-08-25 18:15", details: "Suspect: Md. Ranbir Bhalla | Match Confidence: 92%", color: "#f59e0b" },
    { id: "pt-2", lat: 18.9750, lng: 72.8250, title: "Nocturnal Tower: Agripada", category: "NOCTURNAL", timestamp: "2026-08-25 02:45", details: "38 Midnight Call Handovers Detected", color: "#38bdf8" },
    { id: "pt-3", lat: 18.9950, lng: 72.8300, title: "Field Patrol Spot: SR-2026-9901", category: "SURVEILLANCE", timestamp: "2026-08-25 14:00", details: "Special Branch Panchnama Conducted", color: "#ef4444" }
  ]
};

export const fallbackCriminalRecordsList: import("../types").CriminalRecordsListResponse = {
  total_count: 100,
  filtered_count: 12,
  records: [
    {
      uidb_number: "UIDB-446836",
      fir_number: "0254/2026",
      suspect_name: "Md. Ranbir Bhalla",
      known_aliases: "Bhaijaan, Chhota Don, Ranbir Byculla",
      prior_convictions_count: 5,
      previous_ps_name: "Crime Branch Anti-Extortion Cell (AEC)",
      previous_offence: "Extortion, Running Organized Crime Syndicate & Illegal Arms Supply",
      act_and_sections: "MCOCA 1999 Sec 3(1)(ii), 3(2), 3(4) r/w Arms Act Sec 3, 25(1B)(a), IPC 120B",
      modus_operandi: "Running protection racket (hafta) targeting real estate developers and angadias in South Mumbai via VoIP spoofing; arms stockpiling and coordinating extortion calls from safehouses.",
      mob_number: "MOB/CRIM/2021/048",
      crime_category: "ORGANIZED_CRIME",
      custody_location: "Arthur Road Jail (Barrack 12)",
      case_year: "2021",
      case_status: "Under Trial (Special MCOCA Court)"
    },
    {
      uidb_number: "UIDB-452315",
      fir_number: "0320/2026",
      suspect_name: "Md. Pranit Arya",
      known_aliases: "Doctor, Chemical Chembur, Chemist MD",
      prior_convictions_count: 4,
      previous_ps_name: "Anti-Narcotics Cell (ANC) Azad Maidan Unit",
      previous_offence: "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      act_and_sections: "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      modus_operandi: "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and nightlife circuits.",
      mob_number: "MOB/ANTI/2023/112",
      crime_category: "NARCOTICS_TRAFFICKING",
      custody_location: "Taloja Central Prison (High Security)",
      case_year: "2023",
      case_status: "Judicial Custody (Taloja Central Prison)"
    },
    {
      uidb_number: "UIDB-916113",
      fir_number: "0108/2026",
      suspect_name: "Md. Gagan Rao",
      known_aliases: "Angadia Seth, Kaka Hawala, Token Babu",
      prior_convictions_count: 3,
      previous_ps_name: "Enforcement Directorate / Crime Branch Unit 1",
      previous_offence: "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      act_and_sections: "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      modus_operandi: "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion profits via 12 fictitious shell LLP bank accounts using forged documents.",
      mob_number: "MOB/ENFO/2022/305",
      crime_category: "HAWALA_AND_MONEY_LAUNDERING",
      custody_location: "Out on Conditional Bail",
      case_year: "2022",
      case_status: "Bailed (Condition to Report Twice Weekly)"
    },
    {
      uidb_number: "UIDB-893401",
      fir_number: "0898/2026",
      suspect_name: "Md. Peter Barad",
      known_aliases: "Sharpie, Shooter Vicky, Bullet Bhai",
      prior_convictions_count: 4,
      previous_ps_name: "Crime Branch Unit 3 (Byculla)",
      previous_offence: "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      act_and_sections: "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      modus_operandi: "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols.",
      mob_number: "MOB/CRIM/2020/019",
      crime_category: "CONTRACT_KILLING_AND_ASSAULT",
      custody_location: "Arthur Road Jail",
      case_year: "2020",
      case_status: "Under Trial (Sessions Court 14)"
    },
    {
      uidb_number: "UIDB-011123",
      fir_number: "0734/2026",
      suspect_name: "Md. Nihal Rana",
      known_aliases: "Techie Mule, Hacker Bablu, SIM Box Imran",
      prior_convictions_count: 3,
      previous_ps_name: "Cyber Crime Police Station BKC",
      previous_offence: "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      act_and_sections: "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468",
      modus_operandi: "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts.",
      mob_number: "MOB/CYBE/2024/091",
      crime_category: "CYBER_FINANCIAL_FRAUD",
      custody_location: "Judicial Custody (Arthur Road Jail)",
      case_year: "2024",
      case_status: "Under Trial (Metropolitan Magistrate Court)"
    },
    {
      uidb_number: "UIDB-043583",
      fir_number: "0724/2026",
      suspect_name: "Md. Laban Prakash",
      known_aliases: "Hafta King, Bhai Dongri, Wasim Katta",
      prior_convictions_count: 4,
      previous_ps_name: "Dongri Police Station",
      previous_offence: "Armed Extortion & Intimidation of SRA Builders & Merchants",
      act_and_sections: "IPC Sec 384, 386, 387, 506(2), 34",
      modus_operandi: "Intimidating Slum Rehabilitation Authority (SRA) contractors and local scrap dealers; deploying muscle for forcible land possession and extorting monthly hafta.",
      mob_number: "MOB/DONG/2023/074",
      crime_category: "EXTORTION_AND_THREAT",
      custody_location: "Out on Regular Bail",
      case_year: "2023",
      case_status: "Bailed (Weekly PS Reporting)"
    },
    {
      uidb_number: "UIDB-873925",
      fir_number: "0973/2026",
      suspect_name: "Md. Ojas Bhavsar",
      known_aliases: "None / Clean Profile",
      prior_convictions_count: 0,
      previous_ps_name: "N/A",
      previous_offence: "None",
      act_and_sections: "N/A",
      modus_operandi: "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      mob_number: "N/A",
      crime_category: "CLEAN",
      custody_location: "Not in Custody",
      case_year: "N/A",
      case_status: "Clean Record"
    }
  ]
};

export const fallbackCriminalSummary: import("../types").CriminalHistorySummaryResponse = {
  total_records: 100,
  repeat_offenders_count: 73,
  under_trial_count: 42,
  bailed_count: 24,
  disposed_count: 7,
  clean_records_count: 27,
  offence_breakdown: {
    "Extortion, Running Organized Crime Syndicate & Illegal Arms Supply": 7,
    "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics": 11,
    "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations": 12,
    "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering": 13,
    "Contract Assassination (Supari), Shootout on Witness & Gang Assault": 21,
    "Armed Extortion & Intimidation of SRA Builders & Merchants": 9
  },
  police_station_breakdown: {
    "Crime Branch Anti-Extortion Cell (AEC)": 15,
    "Anti-Narcotics Cell (ANC) Azad Maidan Unit": 11,
    "Enforcement Directorate / Crime Branch Unit 1": 12,
    "Cyber Crime Police Station BKC": 13,
    "Crime Branch Unit 3 (Byculla)": 21,
    "Dongri Police Station": 9
  },
  crime_category_breakdown: {
    "CONTRACT_KILLING_AND_ASSAULT": 21,
    "CYBER_FINANCIAL_FRAUD": 13,
    "HAWALA_AND_MONEY_LAUNDERING": 12,
    "NARCOTICS_TRAFFICKING": 11,
    "EXTORTION_AND_THREAT": 9,
    "ORGANIZED_CRIME": 7
  },
  top_repeat_offenders: fallbackCriminalRecordsList.records.filter(r => r.prior_convictions_count > 0).slice(0, 5)
};


