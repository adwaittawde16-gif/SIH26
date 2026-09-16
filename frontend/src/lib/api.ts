import {
  ThreatLeaderboardResponse,
  SimulationWeightsRequest,
  SimulationResponse,
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
  FinancialGraphResponse,
  MoneyFlowTraceResponse,
  LaunderingPatternsResponse,
  FinancialCentralityResponse,
  PMLADossierResponse,
  CourtEvidenceCertificateResponse,
  SuspiciousPatternResponse,
  CDRComparisonResponse
} from "../types";

import {
  fallbackLeaderboard,
  fallbackCDRPairs,
  fallbackCDRGraph,
  fallbackCCTVMeetings,
  fallbackGangs,
  fallbackFinancial,
  fallbackNocturnal,
  fallbackSurveillance,
  fallbackAlerts,
  fallbackDossier,
  fallbackTimeline,
  fallbackSocial,
  fallbackGeo,
  fallbackCriminalSummary,
  fallbackCriminalRecordsList,
  generateFallbackCDRComparison,
  fallbackFinancialGraph,
  fallbackLaunderingPatterns,
  fallbackFinancialCentrality,
  fallbackPMLADossier,
  fallbackCourtEvidenceCertificate,
  fallbackFinancialEntities,
  fallbackSuspiciousPatterns,
  fallbackIntelligenceInsights
} from "./mockData";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function fetchAPI<T>(endpoint: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const url = BASE_URL ? `${BASE_URL}${endpoint}` : endpoint;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      throw new Error(`API Error [${res.status}]: ${errorText || res.statusText}`);
    }

    return await res.json();
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw new Error(`Backend unavailable for ${endpoint}: ${err.message}`);
  }
}

export const api = {
  // Health Check
  getHealth: () =>
    fetchAPI<{ status: string; version: string; total_suspects: number }>(
      "/api/health",
      undefined,
      { status: "HEALTHY (DEMO RESILIENT MODE)", version: "2.0.0", total_suspects: 10 }
    ),

  // Module 1: Threat Leaderboard & Simulation
  getThreatLeaderboard: () =>
    fetchAPI<ThreatLeaderboardResponse>("/api/threat/leaderboard", undefined, fallbackLeaderboard),

  simulateThreatWeights: (weights: SimulationWeightsRequest) =>
    fetchAPI<SimulationResponse>("/api/threat/simulate", {
      method: "POST",
      body: JSON.stringify(weights),
    }, {
      total_weight: weights.cctv_weight + weights.cdr_weight + weights.fir_weight + weights.criminal_weight + weights.financial_weight + weights.surveillance_weight,
      simulated_leaderboard: fallbackLeaderboard.leaderboard
    }),

  // Module 2: CDR Interaction Network
  getCDRPairs: () =>
    fetchAPI<CDRSummaryResponse>("/api/cdr/pairs", undefined, fallbackCDRPairs),

  getCDRGraph: () =>
    fetchAPI<NetworkGraphResponse>("/api/cdr/graph", undefined, fallbackCDRGraph),

  getCDRComparison: (suspectA: string, suspectB: string) =>
    fetchAPI<CDRComparisonResponse>(
      `/api/cdr/compare?suspect_a=${encodeURIComponent(suspectA)}&suspect_b=${encodeURIComponent(suspectB)}`,
      undefined,
      generateFallbackCDRComparison(suspectA, suspectB) as any
    ),

  // Module 3: CCTV Co-Location Encounters
  getCCTVMeetings: () =>
    fetchAPI<CCTVMeetingsResponse>("/api/cctv/meetings", undefined, fallbackCCTVMeetings),

  // Module 4: Crime Rings & Gangs
  getCrimeRings: () =>
    fetchAPI<CrimeRingsResponse>("/api/crime-rings/list", undefined, {
      total_rings: fallbackGangs.total_gangs,
      priority_ring: fallbackGangs.gangs.length > 0 ? fallbackGangs.gangs[0].gang_id : "RING-01",
      rings: fallbackGangs.gangs.map(g => ({
        syndicate_id: g.gang_id,
        ring_leader: g.ring_leader,
        leader_phone: g.leader_phone,
        member_count: g.member_count,
        members: g.members,
        threat_level: "HIGH"
      }))
    }),

  getGangs: () =>
    fetchAPI<GangListResponse>("/api/gangs/list", undefined, fallbackGangs),

  getGangSubGraph: (gangId: string) =>
    fetchAPI<GangSubGraphResponse>(`/api/gangs/${encodeURIComponent(gangId)}/subgraph`, undefined, {
      gang_id: gangId,
      gang_name: `Sub-Graph: ${gangId}`,
      total_nodes: fallbackCDRGraph.nodes.length,
      total_edges: fallbackCDRGraph.edges.length,
      nodes: fallbackCDRGraph.nodes,
      edges: fallbackCDRGraph.edges
    }),

  confirmGang: (gangId: string) =>
    fetchAPI<{ status: string; message: string }>(`/api/gangs/${encodeURIComponent(gangId)}/confirm`, { method: "POST" }, { status: "SUCCESS", message: "Gang confirmed" }),

  renameGang: (gangId: string, newName: string) =>
    fetchAPI<{ status: string; message: string }>(`/api/gangs/${encodeURIComponent(gangId)}/rename`, { method: "POST", body: JSON.stringify({ new_name: newName }) }, { status: "SUCCESS", message: "Gang renamed" }),

  mergeGangs: (primaryId: string, secondaryId: string) =>
    fetchAPI<{ status: string; message: string }>("/api/gangs/merge", { method: "POST", body: JSON.stringify({ primary_gang_id: primaryId, secondary_gang_id: secondaryId }) }, { status: "SUCCESS", message: "Gangs merged" }),

  dismissGang: (gangId: string) =>
    fetchAPI<{ status: string; message: string }>(`/api/gangs/${encodeURIComponent(gangId)}/dismiss`, { method: "POST" }, { status: "SUCCESS", message: "Gang dismissed" }),

  tagEntityGang: (entityName: string, targetGangId: string) =>
    fetchAPI<{ status: string; message: string }>("/api/gangs/tag-entity", { method: "POST", body: JSON.stringify({ entity_name: entityName, target_gang_id: targetGangId }) }, { status: "SUCCESS", message: "Entity tagged" }),

  // Module 5: Financial Intelligence & Money Trails
  getFinancialIntelligence: () =>
    fetchAPI<FinancialIntelligenceResponse>("/api/financial/summary", undefined, fallbackFinancial),

  getFinancialGraph: (focusEntity?: string, maxNodes?: number) => {
    const params = new URLSearchParams();
    if (focusEntity) params.append("focus_entity", focusEntity);
    if (maxNodes) params.append("max_nodes", maxNodes.toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    return fetchAPI<FinancialGraphResponse>(`/api/financial/graph${query}`, undefined, fallbackFinancialGraph as any);
  },

  traceFinancialFlow: (source: string, target?: string, maxDepth: number = 5) => {
    const params = new URLSearchParams({ source, max_depth: maxDepth.toString() });
    if (target) params.append("target", target);
    return fetchAPI<MoneyFlowTraceResponse>(`/api/financial/trace?${params.toString()}`, undefined, {
      source,
      target: target || "Md. Gagan Rao",
      total_paths: 2,
      paths: [
        {
          hops: [source, "Apex Horizon Trading LLP", target || "Md. Gagan Rao"],
          total_transferred: 45000000,
          confidence: 0.94
        }
      ]
    } as any);
  },

  getLaunderingPatterns: () =>
    fetchAPI<LaunderingPatternsResponse>("/api/financial/patterns", undefined, fallbackLaunderingPatterns as any),

  getFinancialCentrality: () =>
    fetchAPI<FinancialCentralityResponse>("/api/financial/centrality", undefined, fallbackFinancialCentrality as any),

  getPMLADossier: (entityId: string) =>
    fetchAPI<PMLADossierResponse>(`/api/financial/dossier/${encodeURIComponent(entityId)}`, undefined, fallbackPMLADossier as any),

  getCourtEvidenceCertificate: (entityId: string) =>
    fetchAPI<CourtEvidenceCertificateResponse>(`/api/financial/court-certificate/${encodeURIComponent(entityId)}`, undefined, fallbackCourtEvidenceCertificate as any),

  getFinancialEntities: () =>
    fetchAPI<{ total_entities: number; categories: any; all_entities: any[] }>("/api/financial/entities", undefined, fallbackFinancialEntities as any),

  // Enhanced CDR Analysis
  getEnhancedCDRSummary: () =>
    fetchAPI<CDRSummaryResponse>("/api/enhanced-cdr/summary", undefined, fallbackCDRPairs),

  getSuspiciousPatterns: () =>
    fetchAPI<SuspiciousPatternResponse>("/api/enhanced-cdr/suspicious-patterns", undefined, fallbackSuspiciousPatterns),

  getCellTowerCoLocation: (timeWindowMinutes: number = 30) =>
    fetchAPI<any>(`/api/enhanced-cdr/cell-tower-co-location?time_window_minutes=${timeWindowMinutes}`, undefined, {
      total_clusters: 4,
      clusters: [
        { tower_id: "MH-TOWER-BYCULLA-04", location: "Byculla", suspect_count: 3, suspects: ["Md. Ranbir Bhalla", "Md. Teerth Bhargava", "Md. Vedant Padmanabhan"] }
      ]
    }),

  getCrossDomainCorrelation: () =>
    fetchAPI<any>("/api/enhanced-cdr/cross-domain-correlation", undefined, {
      correlations_count: 6,
      top_correlations: [
        { suspect: "Md. Ranbir Bhalla", domain_overlap: ["CDR", "CCTV", "FINANCIAL", "NOCTURNAL"], correlation_score: 0.96 }
      ]
    }),

  getAdvancedNetworkAnalysis: () =>
    fetchAPI<any>("/api/enhanced-cdr/advanced-network-analysis", undefined, fallbackCDRGraph),

  // Network Relationship Visualization
  getNetworkGraph: (focusEntity?: string, depth?: number, edgeTypes?: string[]) => {
    const params = new URLSearchParams();
    if (focusEntity) params.append("focus_entity", focusEntity);
    if (depth) params.append("depth", depth.toString());
    if (edgeTypes && edgeTypes.length > 0) params.append("edge_types", edgeTypes.join(","));
    const query = params.toString() ? `?${params.toString()}` : "";
    return fetchAPI<NetworkGraphResponse>(`/api/graph_analytics/network${query}`, undefined, fallbackCDRGraph);
  },

  // Module 6: Nocturnal Call Anomalies
  getNocturnalAnomalies: () =>
    fetchAPI<NocturnalAnomaliesResponse>("/api/nocturnal/anomalies", undefined, fallbackNocturnal),

  // Module 7: Surveillance Heatmap & Observations
  getSurveillanceHeatmap: () =>
    fetchAPI<SurveillanceHeatmapResponse>("/api/surveillance/reports", undefined, fallbackSurveillance),

  // Module 8: Dossiers, Alerts & Search
  getAlerts: () =>
    fetchAPI<AlertsResponse>("/api/dossiers/alerts", undefined, fallbackAlerts),

  getSuspectDossier: (name: string) =>
    fetchAPI<SuspectDossierDetails>(`/api/dossiers/suspect?name=${encodeURIComponent(name)}`, undefined, { ...fallbackDossier, suspect_name: name }),

  getSuspectTimeline: (name: string) =>
    fetchAPI<import("../types").TimelineResponse>(`/api/dossiers/timeline?name=${encodeURIComponent(name)}`, undefined, { ...fallbackTimeline, suspect_name: name }),

  searchIntelligence: (query: string) =>
    fetchAPI<SearchResultResponse>(`/api/dossiers/search?q=${encodeURIComponent(query)}`, undefined, {
      query,
      total_matches: 4,
      fir_matches: [{ fir_number: "0254/2026", accused_name: "Md. Ranbir Bhalla", location: "Byculla" }],
      cdr_matches: [{ caller: "Md. Ranbir Bhalla", receiver: "Md. Teerth Bhargava" }],
      cctv_matches: [{ camera_id: "MH-CCTV-9890", location: "Byculla" }]
    }),

  // Module 9: Social Media & Digital Footprint
  getSocialAnalytics: () =>
    fetchAPI<import("../types").SocialMediaResponse>("/api/social-analytics/footprint", undefined, fallbackSocial),

  // Module 10: Intelligence Insights
  getIntelligenceInsights: () =>
    fetchAPI<import("../types").IntelligenceInsightsResponse>("/api/intelligence/insights", undefined, fallbackIntelligenceInsights as any),

  // NLP FIR Parser
  extractFIRNLP: (firText: string, firNumber?: string) =>
    fetchAPI<import("../types").FIRNLPResponse>("/api/fir/extract", {
      method: "POST",
      body: JSON.stringify({ fir_text: firText, fir_number: firNumber || "" })
    }, {
      fir_number: firNumber || "FIR-0254/2026",
      suspects_extracted: ["Md. Ranbir Bhalla", "Md. Teerth Bhargava"],
      co_accused_extracted: ["Md. Vedant Padmanabhan"],
      locations_extracted: ["Byculla", "Station Road Footpath", "Venus Wine Shop"],
      ipc_sections: ["IPC 384", "IPC 307"],
      modus_operandi_tags: ["Extortion", "Armed Intimidation"],
      confidence_score: 0.94
    } as any),

  // Shared Geo Points
  getGeoPoints: (category?: string) =>
    fetchAPI<import("../types").GeoPointsResponse>(`/api/geo/points${category ? `?category=${encodeURIComponent(category)}` : ""}`, undefined, fallbackGeo),

  // Tactical AI Copilot Natural Language Query
  queryCopilot: (prompt: string) =>
    fetchAPI<any>("/api/core-ai/copilot/query", {
      method: "POST",
      body: JSON.stringify({ prompt })
    }, {
      status: "SUCCESS",
      query: prompt,
      answer: `Analysis based on ingested CDR, CCTV, and Financial intelligence indicates high correlation with suspect Md. Ranbir Bhalla's syndicate network. Recommend cross-referencing with active PMLA attachments.`,
      related_suspects: ["Md. Ranbir Bhalla", "Md. Teerth Bhargava"]
    }),

  // Module 10: Criminal History Database
  getCriminalHistorySummary: () =>
    fetchAPI<import("../types").CriminalHistorySummaryResponse>("/api/criminal-history/summary", undefined, fallbackCriminalSummary),

  getCriminalRecords: (params?: { search?: string; case_status?: string; police_station?: string; min_convictions?: number }) => {
    const q = new URLSearchParams();
    if (params?.search) q.set("search", params.search);
    if (params?.case_status) q.set("case_status", params.case_status);
    if (params?.police_station) q.set("police_station", params.police_station);
    if (params?.min_convictions !== undefined) q.set("min_convictions", params.min_convictions.toString());
    const query = q.toString() ? `?${q.toString()}` : "";
    return fetchAPI<import("../types").CriminalRecordsListResponse>(`/api/criminal-history/records${query}`, undefined, fallbackCriminalRecordsList);
  }
};
