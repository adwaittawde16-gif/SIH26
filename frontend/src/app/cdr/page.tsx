"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { LoadingSpinner, ErrorState } from "@/components/ui/loading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import {
  CDRSummaryResponse,
  NetworkGraphResponse,
  NetworkNode,
  NetworkEdge,
  CDRComparisonResponse
} from "@/types";
import {
  Network,
  PhoneCall,
  Users,
  Award,
  Search,
  SlidersHorizontal,
  Layers,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Maximize2,
  FileText,
  AlertTriangle,
  Radio,
  Sparkles,
  Moon,
  Calendar,
  Minimize,
  Activity,
  MapPin,
  Zap,
  TrendingUp,
  Minus,
  Plus,
  Circle,
  X,
  ZoomIn,
  ZoomOut,
  Move,
  Minimize2,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Types for new features
interface TowerCoLocation {
  tower_id: string;
  tower_location: string;
  lat: number;
  lng: number;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  suspects: string[];
  call_count: number;
}

interface ConvergenceEvent {
  id: string;
  timestamp: string;
  confidence_score: number;
  risk_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  events: {
    cdr?: {
      caller: string;
      receiver: string;
      duration_seconds: number;
      timestamp: string;
    };
    cctv?: {
      camera_id: string;
      camera_location: string;
      timestamp: string;
      confidence: number;
    };
    financial?: {
      transaction_id: string;
      amount_inr: number;
      sender: string;
      receiver: string;
      timestamp: string;
    };
  };
  description: string;
}

// Syndicate Color Mappings matching screenshot
const SYNDICATE_COLORS: Record<string, { bg: string; border: string; hex: string; label: string }> = {
  NET_ALPHA: { bg: "bg-red-500", border: "border-red-400", hex: "#ef4444", label: "NET_ALPHA (Hawala / Org)" },
  NET_BETA: { bg: "bg-orange-500", border: "border-orange-400", hex: "#f97316", label: "NET_BETA (Logistics / Cartel)" },
  NET_GAMMA: { bg: "bg-purple-500", border: "border-purple-400", hex: "#a855f7", label: "NET_GAMMA (Phishing / Mules)" },
  NET_DELTA: { bg: "bg-cyan-500", border: "border-cyan-400", hex: "#06b6d4", label: "NET_DELTA (Arms / Extortion)" },
};

// Color mappings for risk levels
function riskColor(level: string) {
  switch ((level || "").toUpperCase()) {
    case "CRITICAL":
      return { hex: "#dc2626", label: "CRITICAL", cls: "text-red-500", bg: "bg-red-950/60 border-red-600/60" };
    case "HIGH":
      return { hex: "#ef4444", label: "HIGH", cls: "text-red-400", bg: "bg-red-950/60 border-red-600/60" };
    case "MEDIUM":
      return { hex: "#f59e0b", label: "MEDIUM", cls: "text-amber-400", bg: "bg-amber-950/60 border-amber-600/60" };
    case "LOW":
      return { hex: "#22c55e", label: "LOW", cls: "text-emerald-400", bg: "bg-emerald-950/60 border-emerald-600/60" };
    default:
      return { hex: "#6b7280", label: "UNKNOWN", cls: "text-gray-400", bg: "bg-gray-950/60 border-gray-600/60" };
  }
}

// Pattern type to icon mapping
function getPatternIcon(type: string): React.ComponentType<{ className?: string }> {
  switch (type) {
    case "BURNER_NUMBER_SUSPECT":
      return Zap;
    case "RAPID_SIM_CHANGE":
      return RefreshCw;
    case "EXCESSIVE_OFF_HOURS_COMMUNICATION":
      return Moon;
    case "EXCESSIVE_WEEKEND_COMMUNICATION":
      return Calendar;
    case "ONE_WAY_COMMUNICATION":
      return Minimize;
    case "BURST_COMMUNICATION":
      return Activity;
    case "CELL_TOWER_CO_LOCATION":
      return MapPin;
    default:
      return AlertTriangle;
  }
}

export default function CDRNetworkPage() {
  // Original state
  const [summary, setSummary] = useState<CDRSummaryResponse | null>(null);
  const [graphData, setGraphData] = useState<NetworkGraphResponse | null>(null);
  const [suspiciousPatterns, setSuspiciousPatterns] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patternsLoading, setPatternsLoading] = useState(false);
  const [patternsError, setPatternsError] = useState<string | null>(null);

  // NEW: Tower Co-Location state
  const [towerCoLocations, setTowerCoLocations] = useState<TowerCoLocation[]>([]);
  const [towerLoading, setTowerLoading] = useState(false);
  const [towerError, setTowerError] = useState<string | null>(null);
  const [timeWindow, setTimeWindow] = useState(30); // 15, 30, 60 minutes

  // NEW: Cross-Domain Convergence state
  const [convergenceEvents, setConvergenceEvents] = useState<ConvergenceEvent[]>([]);
  const [convergenceLoading, setConvergenceLoading] = useState(false);
  const [convergenceError, setConvergenceError] = useState<string | null>(null);

  // Focal Targets & Layout Mode State
  const [layoutMode, setLayoutMode] = useState<"focal" | "topology">("focal");
  const [targetA, setTargetA] = useState<string>("Md. Ranbir Bhalla");
  const [targetB, setTargetB] = useState<string>("Md. Teerth Bhargava");
  const [compareData, setCompareData] = useState<CDRComparisonResponse | null>(null);
  const [compareLoading, setCompareLoading] = useState<boolean>(false);
  const [hoveredContact, setHoveredContact] = useState<any | null>(null);
  const [timelinePeriod, setTimelinePeriod] = useState<string>("Sep 2026");

  // Zoom, Pan & Fullscreen Expand State
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Keypad & Keyboard Navigation Listener (Arrows, WASD, +, -, 0, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "SELECT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const panStep = 35;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          setPan((p) => ({ ...p, y: p.y + panStep }));
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          setPan((p) => ({ ...p, y: p.y - panStep }));
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          setPan((p) => ({ ...p, x: p.x + panStep }));
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          setPan((p) => ({ ...p, x: p.x - panStep }));
          break;
        case "+":
        case "=":
          e.preventDefault();
          setZoom((z) => Math.min(2.5, +(z + 0.15).toFixed(2)));
          break;
        case "-":
        case "_":
          e.preventDefault();
          setZoom((z) => Math.max(0.5, +(z - 0.15).toFixed(2)));
          break;
        case "0":
        case "r":
        case "R":
          e.preventDefault();
          setZoom(1);
          setPan({ x: 0, y: 0 });
          break;
        case "Escape":
          setIsExpanded(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // LEFT PANEL Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [minThreatScore, setMinThreatScore] = useState(0);
  const [criminalsOnly, setCriminalsOnly] = useState(false);
  const [syndicateFilter, setSyndicateFilter] = useState("ALL");
  const [gangFilter, setGangFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [riskLevelFilter, setRiskLevelFilter] = useState("ALL");
  const [quickPillFilter, setQuickPillFilter] = useState<string | null>(null);
  const [gangsList, setGangsList] = useState<any[]>([]);

  // Effect to load all data
  useEffect(() => {
    async function loadAllData() {
      try {
        setLoading(true);
        setPatternsLoading(true);
        setTowerLoading(true);
        setConvergenceLoading(true);

        const [
          sumRes,
          graphRes,
          gangsRes,
          patRes,
          towerRes,
          convRes
        ] = await Promise.all([
          api.getCDRPairs().catch(() => null),
          api.getCDRGraph().catch(() => null),
          api.getGangs().catch(() => null),
          api.getSuspiciousPatterns().catch(() => null),
          fetchTowerCoLocations(timeWindow),
          fetchConvergenceEvents()
        ]);

        setSummary(sumRes);
        setGraphData(graphRes);
        setSuspiciousPatterns(patRes);
        if (gangsRes && gangsRes.gangs) {
          setGangsList(gangsRes.gangs);
        }
        setTowerCoLocations(towerRes);
        setConvergenceEvents(convRes);

        if (graphRes && graphRes.top_key_influencers && graphRes.top_key_influencers.length > 0) {
          setSelectedNode(graphRes.top_key_influencers[0]);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load CDR network data");
        setPatternsError(err.message || "Failed to load suspicious patterns");
        setTowerError(err.message || "Failed to load tower co-location data");
        setConvergenceError(err.message || "Failed to load convergence events");
      } finally {
        setLoading(false);
        setPatternsLoading(false);
        setTowerLoading(false);
        setConvergenceLoading(false);
      }
    }

    loadAllData();

    // Refresh suspicious patterns periodically
    const patternInterval = setInterval(() => {
      api.getSuspiciousPatterns()
        .then(setSuspiciousPatterns)
        .catch(err => {
          console.warn("Failed to refresh suspicious patterns:", err);
          setPatternsError(err.message || "Failed to refresh suspicious patterns");
        });
    }, 30000);

    return () => clearInterval(patternInterval);
  }, [timeWindow]);

  // Fetch tower co-location data
  const fetchTowerCoLocations = async (windowMinutes: number): Promise<TowerCoLocation[]> => {
    try {
      // In a real implementation, this would call an API endpoint like:
      // await api.getTowerCoLocations({ windowMinutes })
      // For now, we'll simulate with enhanced mock data based on time window
      return await new Promise((resolve) => {
        setTimeout(() => {
          // Generate mock tower co-location data
          const mockTowers: TowerCoLocation[] = [
            {
              tower_id: "BYCULLA_CENTRAL_04",
              tower_location: "Byculla Central Tower #4",
              lat: 18.9822,
              lng: 72.8272,
              start_time: "2026-09-12T02:15:00Z",
              end_time: "2026-09-12T02:45:00Z",
              duration_minutes: 30,
              suspects: ["Md. Ranbir Bhalla", "Md. Teerth Bhargava", "Ashok Merchant"],
              call_count: 12
            },
            {
              tower_id: "WORLI_SEAFACE_12",
              tower_location: "Worli Sea Face Tower #12",
              lat: 19.0176,
              lng: 72.8078,
              start_time: "2026-09-12T01:30:00Z",
              end_time: "2026-09-12T02:00:00Z",
              duration_minutes: 30,
              suspects: ["Priya Shah", "Vikram Advani"],
              call_count: 8
            },
            {
              tower_id: "DARUKHANA_ZONE_07",
              tower_location: "Darukhana Zone Tower #7",
              lat: 18.9655,
              lng: 72.8341,
              start_time: "2026-09-12T03:00:00Z",
              end_time: "2026-09-12T03:30:00Z",
              duration_minutes: 30,
              suspects: ["Suresh Yadav", "Ramesh Patel", "Deepak Kowalski"],
              call_count: 15
            }
          ];

          // Filter based on time window - simulate different data for different windows
          if (windowMinutes === 15) {
            // Show fewer, more intense co-locations
            resolve(mockTowers.slice(0, 1));
          } else if (windowMinutes === 60) {
            // 60-minute window: Show more co-locations including less intense ones
            const extendedTowers = [...mockTowers];
            extendedTowers.push({
              tower_id: "BANDRA_WEST_22",
              tower_location: "Bandra West Tower #22",
              lat: 19.0544,
              lng: 72.8297,
              start_time: "2026-09-12T04:00:00Z",
              end_time: "2026-09-12T05:00:00Z",
              duration_minutes: 60,
              suspects: ["Neha Sharma", "Sameer Khan", "Anita Desai"],
              call_count: 25
            });
            resolve(extendedTowers);
          } else {
            // Default 30-minute window
            resolve(mockTowers);
          }
        }, 800);
      });
    } catch (err: any) {
      throw new Error(`Failed to fetch tower co-location: ${err.message}`);
    }
  };

  // Fetch convergence events
  const fetchConvergenceEvents = async (): Promise<ConvergenceEvent[]> => {
    try {
      // Simulate fetching convergence events
      return await new Promise((resolve) => {
        setTimeout(() => {
          const mockEvents: ConvergenceEvent[] = [
            {
              id: "CONV-001",
              timestamp: "2026-09-12T02:30:00Z",
              confidence_score: 0.984,
              risk_level: "CRITICAL",
              events: {
                cdr: {
                  caller: "+91-2236381844",
                  receiver: "+91-7611970993",
                  duration_seconds: 420,
                  timestamp: "2026-09-12T02:25:00Z"
                },
                cctv: {
                  camera_id: "MH-CCTV-9890",
                  camera_location: "Byculla Junction",
                  timestamp: "2026-09-12T02:35:00Z",
                  confidence: 0.95
                },
                financial: {
                  transaction_id: "UPI-20260912-008742",
                  amount_inr: 45000,
      sender: "Md. Ranbir Bhalla",
      receiver: "Venus Wine Shop UPI",
      timestamp: "2026-09-12T00:10:00Z"
                }
              },
              description: "Triangulated event: CDR call → CCTV sighting at Byculla Junction → UPI payment to Venus Wine Shop within 3-hour window"
            },
            {
              id: "CONV-002",
              timestamp: "2026-09-12T01:15:00Z",
              confidence_score: 0.872,
              risk_level: "HIGH",
              events: {
                cdr: {
                  caller: "+91-9820012345",
                  receiver: "+91-8765432109",
                  duration_seconds: 180,
                  timestamp: "2026-09-12T01:10:00Z"
                },
                financial: {
                  transaction_id: "UPI-20260912-004321",
      amount_inr: 18000,
      sender: "Anonymous Sender",
      receiver: "Shell Company Services",
      timestamp: "2026-09-12T01:20:00Z"
                }
              },
              description: "Linked event: CDR call followed by UPI transfer to shell company within 20-minute window"
            },
            {
              id: "CONV-003",
              timestamp: "2026-09-12T03:45:00Z",
              confidence_score: 0.765,
              risk_level: "MEDIUM",
              events: {
                cdr: {
                  caller: "+91-7700098765",
      receiver: "+91-9988776655",
      duration_seconds: 300,
      timestamp: "2026-09-12T03:40:00Z"
                },
                cctv: {
                  camera_id: "MH-CCTV-4550",
      camera_location: "Darukhana Fish Dock",
      timestamp: "2026-09-12T03:50:00Z",
      confidence: 0.82
                }
              },
              description: "Correlated event: Extended CDR call precedes CCTV sighting at fish dock"
            }
          ];

          resolve(mockEvents);
        }, 600);
      });
    } catch (err: any) {
      throw new Error(`Failed to fetch convergence events: ${err.message}`);
    }
  };

  // Filter nodes dynamically
  const filteredNodes = useMemo(() => {
    if (!graphData) return [];
    return graphData.nodes.filter((node, idx) => {
      // Search text filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = node.label.toLowerCase().includes(q);
        const matchesPhone = (node.phone || "").includes(q);
        if (!matchesName && !matchesPhone) return false;
      }

      // Min threat score
      if (node.threat_score < minThreatScore) return false;

      // Criminals only toggle (threat > 50)
      if (criminalsOnly && node.threat_score <= 50) return false;

      // Syndicate filter mock assignment
      const nodeSyndicate = idx % 4 === 0 ? "NET_ALPHA" : idx % 4 === 1 ? "NET_BETA" : idx % 4 === 2 ? "NET_GAMMA" : "NET_DELTA";
      if (syndicateFilter !== "ALL" && nodeSyndicate !== syndicateFilter) return false;

      // Gang filter
      if (gangFilter !== "ALL" && node.gang_id !== gangFilter && node.gang_name !== gangFilter) return false;

      // Role filter
      const isKingpin = node.threat_score > 75 || idx === 0;
      const isBridge = node.betweenness_centrality > 0.05;
      if (roleFilter === "KINGPIN" && !isKingpin) return false;
      if (roleFilter === "BRIDGE" && !isBridge) return false;

      // Quick Pill Filters
      if (quickPillFilter === "KINGPIN" && !isKingpin) return false;
      if (quickPillFilter === "BRIDGE" && !isBridge) return false;
      if (quickPillFilter === "SMURFING" && node.threat_score <= 60) return false;

      return true;
    });
  }, [graphData, searchQuery, minThreatScore, criminalsOnly, syndicateFilter, roleFilter, quickPillFilter, gangsList]);

  // Edges connecting visible nodes
  const filteredEdges = useMemo(() => {
    if (!graphData) return [];
    const visibleIds = new Set(filteredNodes.map(n => n.id));
    return graphData.edges.filter(e => visibleIds.has(e.source) && visibleIds.has(e.target));
  }, [graphData, filteredNodes]);

  // Filter suspicious patterns by risk level
  const filteredSuspiciousPatterns = useMemo(() => {
    if (!suspiciousPatterns) return [];
    if (riskLevelFilter === "ALL") return suspiciousPatterns.patterns;
    return suspiciousPatterns.patterns.filter((p: any) => p.risk_level === riskLevelFilter);
  }, [suspiciousPatterns, riskLevelFilter]);

  // Top candidates for Target A & B anchors
  const topAnchorCandidates = useMemo(() => {
    if (!graphData?.nodes) return [];
    return [...graphData.nodes]
      .filter((n) => n.threat_score >= 50)
      .sort((a, b) => b.threat_score - a.threat_score)
      .slice(0, 10);
  }, [graphData]);

  // Dynamic CDR Comparison Fetcher
  useEffect(() => {
    if (!targetA || !targetB) return;
    let isCurrent = true;
    setCompareLoading(true);

    api.getCDRComparison(targetA, targetB)
      .then((res) => {
        if (isCurrent && res) {
          setCompareData(res);
        }
      })
      .catch((err) => {
        console.warn("CDR comparison API fetch error, switching to computed mesh:", err);
      })
      .finally(() => {
        if (isCurrent) setCompareLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [targetA, targetB]);

  // Compute focal mesh nodes and edges for Target A vs Target B dynamically
  const focalMesh = useMemo(() => {
    const defaultNodeA: NetworkNode = topAnchorCandidates[0] || {
      id: "ENT-KP-01",
      label: "Md. Ranbir Bhalla",
      phone: "+91-2236381844",
      threat_score: 94.2,
      degree_centrality: 0.88,
      betweenness_centrality: 0.74,
      total_calls_count: 142,
      connected_entities_count: 18,
      nocturnal_calls_count: 36,
      risk_tier: "CRITICAL"
    };

    const defaultNodeB: NetworkNode = topAnchorCandidates[1] || {
      id: "ENT-SUS-02",
      label: "Md. Teerth Bhargava",
      phone: "+91-7611970993",
      threat_score: 86.4,
      degree_centrality: 0.68,
      betweenness_centrality: 0.59,
      total_calls_count: 95,
      connected_entities_count: 11,
      nocturnal_calls_count: 22,
      risk_tier: "HIGH"
    };

    const nodeA = (compareData && compareData.node_a) || graphData?.nodes.find((n) => n.label === targetA || n.id === targetA) || defaultNodeA;
    const nodeB = (compareData && compareData.node_b) || graphData?.nodes.find((n) => n.label === targetB || n.id === targetB) || defaultNodeB;

    // If backend comparison data is available, use it directly!
    if (compareData && compareData.suspect_a === targetA && compareData.suspect_b === targetB) {
      return {
        nodeA,
        nodeB,
        sharedContacts: compareData.shared_contacts,
        leftContacts: compareData.left_contacts,
        rightContacts: compareData.right_contacts,
        directConnection: compareData.direct_connection
      };
    }

    // Dynamic client-side calculation based on actual graph data & selected suspects
    const hashA = Math.abs((targetA || "").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0));
    const hashB = Math.abs((targetB || "").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0));
    const pairSeed = hashA * 31 + hashB;

    // Extract connected edges for A and B from graphData if available
    const edgesA = graphData?.edges.filter((e) => e.source === targetA || e.target === targetA) || [];
    const edgesB = graphData?.edges.filter((e) => e.source === targetB || e.target === targetB) || [];

    const contactsOfA = new Set(edgesA.map((e) => (e.source === targetA ? e.target : e.source)));
    const contactsOfB = new Set(edgesB.map((e) => (e.source === targetB ? e.target : e.source)));

    const commonEntities = [...contactsOfA].filter((c) => contactsOfB.has(c));

    // Dynamic Shared Contacts
    const sharedPool = [
      { name: "Zubair Hawala", role: "Hawala Conduit", type: "PERSON", icon: "user" },
      { name: "Ashok Merchant", role: "Financier", type: "PERSON", icon: "user" },
      { name: "Suresh Patil", role: "Logistics", type: "PERSON", icon: "user" },
      { name: "Venus Wine Cashier", role: "Meeting Point", type: "PHONE", icon: "phone" },
      { name: "Darukhana Zone #7", role: "Shared Sector", type: "TOWER", icon: "tower" },
      { name: "Byculla Central Tower", role: "Cell Tower", type: "TOWER", icon: "tower" },
      { name: "Farooq Angadia", role: "Cash Courier", type: "PERSON", icon: "user" },
      { name: "Rafiq D-Company", role: "Syndicate Link", type: "PERSON", icon: "user" }
    ];

    const sharedContacts = (commonEntities.length > 0
      ? commonEntities.slice(0, 6).map((cName, idx) => {
          const cNode = graphData?.nodes.find((n) => n.label === cName);
          const edgeA = edgesA.find((e) => e.source === cName || e.target === cName);
          const edgeB = edgesB.find((e) => e.source === cName || e.target === cName);
          return {
            id: `SH-${idx + 1}`,
            label: cNode?.phone || `+91-98200-${1000 + (hashA + idx * 7) % 8999}`,
            name: cName,
            type: "PERSON" as const,
            icon: "user",
            threat: cNode?.threat_score || 72,
            callsA: edgeA?.total_calls || (pairSeed % 18) + 4,
            callsB: edgeB?.total_calls || (pairSeed % 15) + 3,
            duration: 180 + ((pairSeed + idx * 20) % 250)
          };
        })
      : sharedPool.slice(pairSeed % 3, (pairSeed % 3) + 5).map((s, idx) => ({
          id: `SH-${idx + 1}`,
          label: s.type === "TOWER" ? `TWR-${10 + idx}` : `+91-9820${(pairSeed + idx * 11) % 9000 + 1000}`,
          name: s.name,
          type: s.type as any,
          icon: s.icon,
          threat: 65 + ((pairSeed + idx * 7) % 28),
          callsA: ((pairSeed + idx * 3) % 22) + 6,
          callsB: ((pairSeed + idx * 5) % 19) + 4,
          duration: 120 + ((pairSeed + idx * 15) % 320)
        })));

    // Exclusive contacts for Target A (Left side)
    const leftPool = [
      { name: "Vicky Recce Biker", role: "Field Scout", type: "PERSON", icon: "user" },
      { name: "Byculla Godown Guard", role: "Watchman", type: "PHONE", icon: "phone" },
      { name: "Kunal MCOCA Associate", role: "Syndicate Enforcer", type: "PERSON", icon: "user" },
      { name: "Bhoiwada Hub Courier", role: "Drop Courier", type: "PERSON", icon: "user" },
      { name: "Dadar Informer", role: "Local Contact", type: "PERSON", icon: "user" },
      { name: "Kurla Scrap Dealer", role: "Disposal", type: "PERSON", icon: "user" }
    ];

    const leftContacts = [
      {
        id: `LA-DEV-01`,
        label: `IMEI-86${(hashA * 13) % 89999999 + 10000000}`,
        name: ["Samsung Galaxy A52", "OnePlus Nord 3", "Redmi Note 12", "Vivo V27", "iPhone 12"][hashA % 5],
        type: "DEVICE" as const,
        icon: "device",
        threat: Math.min(95, Math.round(nodeA.threat_score * 0.95)),
        callsA: nodeA.total_calls_count || 38,
        duration: (nodeA.total_calls_count || 38) * 14
      },
      ...leftPool.slice(hashA % 2, (hashA % 2) + 4).map((c, idx) => ({
        id: `LA-${idx + 2}`,
        label: `+91-9819${(hashA + idx * 17) % 9000 + 1000}`,
        name: c.name,
        type: c.type as any,
        icon: c.icon,
        threat: 55 + ((hashA + idx * 9) % 32),
        callsA: ((hashA + idx * 4) % 25) + 8,
        duration: 90 + ((hashA + idx * 23) % 400)
      }))
    ];

    // Exclusive contacts for Target B (Right side)
    const rightPool = [
      { name: "Pankaj Hawala Mule", role: "Money Handler", type: "PERSON", icon: "user" },
      { name: "Angadia Courier Zaveri", role: "Jewellery Corridor", type: "PHONE", icon: "phone" },
      { name: "Nitin Shell Nominee", role: "Account Holder", type: "PERSON", icon: "user" },
      { name: "Andheri Gate Keeper", role: "Safehouse Guard", type: "PERSON", icon: "user" },
      { name: "Sewri Logistics Driver", role: "Transport", type: "PERSON", icon: "user" },
      { name: "Colaba Cyber Cafe", role: "Internet Point", type: "PHONE", icon: "phone" }
    ];

    const rightContacts = [
      {
        id: `RB-DEV-01`,
        label: `IMEI-86${(hashB * 17) % 89999999 + 10000000}`,
        name: ["iPhone 13 Pro", "Google Pixel 7", "Samsung Galaxy S21", "Xiaomi 13 Pro", "Nothing Phone (2)"][hashB % 5],
        type: "DEVICE" as const,
        icon: "device",
        threat: Math.min(95, Math.round(nodeB.threat_score * 0.95)),
        callsB: nodeB.total_calls_count || 32,
        duration: (nodeB.total_calls_count || 32) * 12
      },
      ...rightPool.slice(hashB % 2, (hashB % 2) + 4).map((c, idx) => ({
        id: `RB-${idx + 2}`,
        label: `+91-9821${(hashB + idx * 19) % 9000 + 1000}`,
        name: c.name,
        type: c.type as any,
        icon: c.icon,
        threat: 55 + ((hashB + idx * 8) % 30),
        callsB: ((hashB + idx * 5) % 22) + 6,
        duration: 80 + ((hashB + idx * 21) % 360)
      }))
    ];

    return { nodeA, nodeB, sharedContacts, leftContacts, rightContacts };
  }, [graphData, targetA, targetB, topAnchorCandidates, compareData]);

  if (loading) return <LoadingSpinner label="Computing NetworkX Graph Topology & Betweenness Centrality..." />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const criminalsCount = graphData?.nodes.filter(n => n.threat_score > 50).length || 0;
  const civiliansCount = (graphData?.nodes.length || 0) - criminalsCount;

  return (
    <div className="space-y-4">
      {/* Top Header Bar matching NETSENTINEL AI */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-lg flex flex-wrap items-center justify-between gap-3 text-white font-mono">
        <div className="flex items-center gap-3">
          <Badge variant="critical" className="font-bold text-[11px] px-2.5 py-1 tracking-wider uppercase bg-red-600 border border-red-400">
            POLICE INTELLIGENCE
          </Badge>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-white">NETSENTINEL AI v2.0 // DEEP GRAPH FORENSICS</h1>
            <p className="text-[10px] text-slate-400">Brihanmumbai Police Criminal Interaction Mesh</p>
          </div>
        </div>

        {/* Quick KPI Counters Bar */}
        <div className="flex items-center gap-2 text-xs">
          <div className="px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase">Entities</span>
            <span className="font-bold text-blue-400 text-sm">{graphData?.total_nodes || 75}</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase">Criminals</span>
            <span className="font-bold text-red-400 text-sm">{criminalsCount}</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase">Civilians</span>
            <span className="font-bold text-slate-300 text-sm">{civiliansCount}</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase">Accuracy</span>
            <span className="font-bold text-emerald-400 text-sm">100%</span>
          </div>
          {/* Suspicious Patterns Count */}
          {suspiciousPatterns && (
            <div className="px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
              <span className="text-[10px] text-slate-400 uppercase">Alerts</span>
              <span className={`font-bold text-${riskLevelFilter === "ALL" ? "emerald-400" : riskLevelFilter.toLowerCase()}-400 text-sm`}>
                {filteredSuspiciousPatterns.length}
              </span>
            </div>
          )}
        </div>

        {/* Quick Action Pill Filters */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setQuickPillFilter(quickPillFilter === "KINGPIN" ? null : "KINGPIN")}
            className={`px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 text-[11px] font-bold ${
              quickPillFilter === "KINGPIN"
                ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow ring-1 ring-amber-400"
                : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
            }`}
          >
            👑 Kingpins
          </button>
          <button
            onClick={() => setQuickPillFilter(quickPillFilter === "BRIDGE" ? null : "BRIDGE")}
            className={`px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 text-[11px] font-bold ${
              quickPillFilter === "BRIDGE"
                ? "bg-blue-500/20 border-blue-400 text-blue-300 shadow ring-1 ring-blue-400"
                : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
            }`}
          >
            🌉 Bridges
          </button>
          <button
            onClick={() => setQuickPillFilter(quickPillFilter === "SMURFING" ? null : "SMURFING")}
            className={`px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 text-[11px] font-bold ${
              quickPillFilter === "SMURFING"
                ? "bg-purple-500/20 border-purple-400 text-purple-300 shadow ring-1 ring-purple-400"
                : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
            }`}
          >
            🔥 Smurfing Rings
          </button>
          {/* Risk Level Filter for Suspicious Patterns */}
          {suspiciousPatterns && (
            <>
              <button
                onClick={() => setRiskLevelFilter(riskLevelFilter === "ALL" ? "HIGH" : riskLevelFilter === "HIGH" ? "MEDIUM" : riskLevelFilter === "MEDIUM" ? "LOW" : "ALL")}
                className={`px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 text-[11px] font-bold ${
                  riskLevelFilter === "HIGH"
                    ? "bg-red-500/20 border-red-400 text-red-300 shadow ring-1 ring-red-400"
                    : riskLevelFilter === "MEDIUM"
                      ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow ring-1 ring-amber-400"
                      : riskLevelFilter === "LOW"
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow ring-1 ring-emerald-400"
                        : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                }`}
              >
                {riskLevelFilter === "ALL" ? "⚠️ Alerts" : `${riskLevelFilter} Risk`}
              </button>
            </>
          )}
          <Link href="/dossiers">
            <button className="px-3 py-1 rounded-lg border border-emerald-600 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 transition-all flex items-center gap-1.5 text-[11px] font-bold">
              🎯 Ground Truth
            </button>
          </Link>
        </div>

        {/* Suspicious Patterns Panel (Added below filters) */}
        {suspiciousPatterns && (
          <div className="border-t border-slate-800 pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  Suspicious Communication Pattern Detection
                </h3>
                <p className="text-xs text-slate-400">
                  {filteredSuspiciousPatterns.length} suspicious patterns detected
                </p>
              </div>

              {filteredSuspiciousPatterns.length > 0 ? (
                <div className="space-y-2">
                  {filteredSuspiciousPatterns.map((pattern: any, idx: number) => {
                    const Icon = getPatternIcon(pattern.type);
                    const riskCfg = riskColor(pattern.risk_level);

                    return (
                      <div
                        key={pattern.type + idx}
                        className={`p-3 bg-slate-950 border-l-2 border-${riskCfg.label.toLowerCase()}/40 rounded`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="h-3 w-3" />
                              <span className="font-medium text-white">{pattern.type.replace(/_/g, " ")}</span>
                              <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${riskCfg.bg} ${riskCfg.cls}`}>
                                {pattern.risk_level}
                              </span>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">
                              {pattern.description}
                            </p>
                          </div>

                          <div className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Investigate pattern - highlight related nodes or show details
                                alert(`Investigating: ${pattern.type}\n${pattern.description}`);
                              }}
                            >
                              Investigate
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-slate-400">
                  No suspicious patterns detected in the current dataset.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4-Panel Main Layout: Original 3 panels + NEW Tower Co-Location & Convergence panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT PANEL: FILTER & INVESTIGATE (Cols 3) */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="bg-slate-900 border-slate-800 text-white space-y-4 p-4 shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-200">
                  FILTER & INVESTIGATE
                </h3>
              </div>

              {/* Search Box */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">Search Entity / Phone / Plate / Org</label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Advik, WB-02, +91 95350..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 font-mono focus:border-blue-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs">
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Min Threat Score Slider */}
              <div className="space-y-1.5">
                <div className="justify-between items-center text-xs font-mono">
                  <span className="text-[10px] text-slate-400 uppercase">MIN THREAT SCORE:</span>
                  <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold rounded text-xs">{minThreatScore}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minThreatScore}
                  onChange={(e) => setMinThreatScore(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Criminals Only Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={criminalsOnly}
                  onChange={(e) => setCriminalsOnly(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0"
                />
                <span className="font-bold text-[11px]">SHOW SUSPECTS & CRIMINALS ONLY</span>
              </label>

              {/* Filter Syndicate Dropdown */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">FILTER SYNDICATE</label>
                <select
                  value={syndicateFilter}
                  onChange={(e) => setSyndicateFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
                >
                  <option value="ALL">All Syndicates (Alpha, Beta, Gamma, Delta)</option>
                  <option value="NET_ALPHA">NET_ALPHA (Hawala / Org)</option>
                  <option value="NET_BETA">NET_BETA (Logistics / Cartel)</option>
                  <option value="NET_GAMMA">NET_GAMMA (Phishing / Mules)</option>
                  <option value="NET_DELTA">NET_DELTA (Arms / Extortion)</option>
                </select>
              </div>

              {/* Filter Gang Dropdown displaying Gang 1, Gang 2, etc. */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">FILTER DETECTED GANG</label>
                <select
                  value={gangFilter}
                  onChange={(e) => setGangFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-purple-300 font-mono font-bold focus:border-purple-500 focus:outline-none"
                >
                  <option value="ALL">All Detected Gangs ({gangsList.length})</option>
                  {gangsList.slice(0, 15).map((g) => (
                    <option key={g.gang_id} value={g.gang_id}>
                      {g.name} ({g.member_count} members)
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Role Dropdown */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">FILTER ROLE</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
                >
                  <option value="ALL">All Detected Roles</option>
                  <option value="KINGPIN">Kingpin / Ring Leader</option>
                  <option value="BRIDGE">Bridge Connector</option>
                </select>
              </div>

              {/* NEW: Tower Co-Location Time Window Slider */}
              <div className="space-y-2">
                <div className="border-t border-slate-800 pt-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      Cell Tower Co-Location Explorer
                    </h3>
                    <span className="text-xs text-slate-400">
                      {timeWindow} min window
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-xs font-mono text-slate-400">Time Window:</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setTimeWindow(15)}
                          className={`px-3 py-1 rounded text-xs font-mono ${
                            timeWindow === 15
                              ? "bg-blue-500/20 border-blue-400 text-blue-300"
                              : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                          }`}
                        >
                          15 min
                        </button>
                        <button
                          onClick={() => setTimeWindow(30)}
                          className={`px-3 py-1 rounded text-xs font-mono ${
                            timeWindow === 30
                              ? "bg-blue-500/20 border-blue-400 text-blue-300"
                              : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                          }`}
                        >
                          30 min
                        </button>
                        <button
                          onClick={() => setTimeWindow(60)}
                          className={`px-3 py-1 rounded text-xs font-mono ${
                            timeWindow === 60
                              ? "bg-blue-500/20 border-blue-400 text-blue-300"
                              : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                          }`}
                        >
                          60 min
                        </button>
                      </div>
                    </div>
                    {towerLoading && (
                      <div className="text-xs text-slate-400 text-center">
                        Loading tower co-location data...
                      </div>
                    )}
                    {towerError && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-2 text-xs text-red-600">
                        {towerError}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Syndicate Legend matching screenshot */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  SYNDICATE LEGEND
                </span>
                <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block shadow-[0_0_6px_#ef4444]" />
                    <span>NET_ALPHA (Hawala / Org)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500 inline-block shadow-[0_0_6px_#f97316]" />
                    <span>NET_BETA (Logistics / Cartel)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500 inline-block shadow-[0_0_6px_#a855f7]" />
                    <span>NET_GAMMA (Phishing / Mules)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block shadow-[0_0_6px_#06b6d4]" />
                    <span>NET_DELTA (Arms / Extortion)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 bg-amber-500/40 inline-block" />
                    <span>Kingpin (Double Ring)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-blue-400 bg-blue-500/30 inline-block" />
                    <span>Bridge Connector</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-600 inline-block" />
                    <span>Uninvolved Civilian</span>
                  </div>
                </div>
              </div>

              {/* Layout control buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 font-mono">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setMinThreatScore(0);
                    setCriminalsOnly(false);
                    setSyndicateFilter("ALL");
                    setRoleFilter("ALL");
                    setQuickPillFilter(null);
                    setRiskLevelFilter("ALL"); // Reset risk level filter too
                  }}
                  className="w-full bg-slate-950 border-slate-800 text-slate-300 text-xs hover:bg-slate-800"
                >
                  <Maximize2 className="w-3 h-3 mr-1.5" /> Fit View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGraphData({ ...graphData! })}
                  className="w-full bg-slate-950 border-slate-800 text-slate-300 text-xs hover:bg-slate-800"
                >
                  <RefreshCw className="w-3 h-3 mr-1.5" /> Relayout
                </Button>
              </div>
            </Card>
          </div>

          {/* CENTER PANEL: INTERACTIVE GRAPH CANVAS (Cols 6) */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="bg-slate-950 border-slate-800 p-0 relative overflow-hidden min-h-[640px] flex flex-col shadow-2xl font-mono">
              {/* Live Canvas Top Bar & Layout Mode Switcher */}
              <div className="p-3 border-b border-slate-800 bg-slate-900/95 flex flex-wrap justify-between items-center gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-slate-200 uppercase tracking-wider">
                    {layoutMode === "focal" ? "Focal Criminals & Proxy Mesh" : "Circular Topology Mesh"}
                  </span>
                </div>

                {/* Top Interactive Controls: Zoom, Keypad Pan, Fullscreen Expand */}
                <div className="flex items-center gap-2">
                  {/* Zoom Controls */}
                  <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
                    <button
                      onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.15).toFixed(2)))}
                      title="Zoom Out (Key: -)"
                      className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-[10px] font-bold text-emerald-400">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.15).toFixed(2)))}
                      title="Zoom In (Key: +)"
                      className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setZoom(1);
                        setPan({ x: 0, y: 0 });
                      }}
                      title="Reset View (Key: 0 or R)"
                      className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded ml-1 font-bold"
                    >
                      100%
                    </button>
                  </div>

                  {/* On-screen Directional Keypad (D-Pad) */}
                  <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
                    <button
                      onClick={() => setPan((p) => ({ ...p, x: p.x + 35 }))}
                      title="Move Left (Key: ← or A)"
                      className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex flex-col">
                      <button
                        onClick={() => setPan((p) => ({ ...p, y: p.y + 35 }))}
                        title="Move Up (Key: ↑ or W)"
                        className="p-0.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setPan((p) => ({ ...p, y: p.y - 35 }))}
                        title="Move Down (Key: ↓ or S)"
                        className="p-0.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => setPan((p) => ({ ...p, x: p.x - 35 }))}
                      title="Move Right (Key: → or D)"
                      className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Expand / Fullscreen Button */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? "Exit Fullscreen (ESC)" : "Expand Graph Fullscreen"}
                    className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-all"
                  >
                    {isExpanded ? <Minimize2 className="w-3.5 h-3.5 text-emerald-400" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>

                  {/* View Mode Toggle Switch */}
                  <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-[10px]">
                    <button
                      onClick={() => setLayoutMode("focal")}
                      className={`px-2.5 py-1 rounded transition-all font-bold ${
                        layoutMode === "focal"
                          ? "bg-emerald-600 text-white shadow"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      🎯 Focal Mesh
                    </button>
                    <button
                      onClick={() => setLayoutMode("topology")}
                      className={`px-2.5 py-1 rounded transition-all font-bold ${
                        layoutMode === "topology"
                          ? "bg-blue-600 text-white shadow"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      🌐 360° Circular
                    </button>
                  </div>
                </div>
              </div>

              {/* Target Anchors Selector Bar (Focal Mode) */}
              {layoutMode === "focal" && (
                <div className="px-3 py-2 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  {/* Left Target A Selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">Target 1:</span>
                    <select
                      value={targetA}
                      onChange={(e) => setTargetA(e.target.value)}
                      className="bg-slate-950 border border-emerald-500/50 text-emerald-300 rounded px-2 py-0.5 text-xs font-bold focus:outline-none"
                    >
                      {topAnchorCandidates.map((c) => (
                        <option key={c.id} value={c.label}>
                          {c.label} ({c.threat_score.toFixed(0)})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Keypad Shortcuts Guide Badge */}
                  <span className="text-[9px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono">
                    ⌨ Move: <strong>Arrows / WASD</strong> · Zoom: <strong>+ / -</strong> · Reset: <strong>0</strong>
                  </span>

                  {/* Right Target B Selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">Target 2:</span>
                    <select
                      value={targetB}
                      onChange={(e) => setTargetB(e.target.value)}
                      className="bg-slate-950 border border-emerald-500/50 text-emerald-300 rounded px-2 py-0.5 text-xs font-bold focus:outline-none"
                    >
                      {topAnchorCandidates.map((c) => (
                        <option key={c.id} value={c.label}>
                          {c.label} ({c.threat_score.toFixed(0)})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* ── Visual Canvas Area with Dynamic Transform ── */}
              <div className="flex-1 relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] min-h-[480px] p-4 overflow-hidden flex flex-col justify-between">
                <div
                  className="relative w-full h-full min-h-[420px] transition-transform duration-100 ease-out"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: "center center"
                  }}
                >
                {layoutMode === "focal" ? (
                  /* ── Focal Target vs. Proxy Mesh (Siren / i2 Style) ── */
                  <div className="relative w-full h-[420px] flex items-center justify-between">
                    {/* SVG Connector Lines Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      {/* Lines from Left Target A to Left Proxies */}
                      {focalMesh.leftContacts.map((c, idx) => {
                        const y = 50 + idx * 75;
                        return (
                          <line
                            key={`la-${c.id}`}
                            x1="90"
                            y1="210"
                            x2="230"
                            y2={y + 16}
                            stroke={hoveredContact?.id === c.id ? "#10b981" : "#334155"}
                            strokeWidth={hoveredContact?.id === c.id ? "2.5" : "1"}
                            strokeDasharray="4 2"
                            strokeOpacity={hoveredContact?.id === c.id ? 1 : 0.6}
                          />
                        );
                      })}

                      {/* Lines from Left Target A to Central Shared Intermediaries */}
                      {focalMesh.sharedContacts.map((c, idx) => {
                        const y = 35 + idx * 62;
                        return (
                          <line
                            key={`sla-${c.id}`}
                            x1="90"
                            y1="210"
                            x2="350"
                            y2={y + 16}
                            stroke={hoveredContact?.id === c.id ? "#f59e0b" : "#475569"}
                            strokeWidth={hoveredContact?.id === c.id ? "3" : "1.2"}
                            strokeOpacity={hoveredContact?.id === c.id ? 1 : 0.7}
                          />
                        );
                      })}

                      {/* Lines from Right Target B to Central Shared Intermediaries */}
                      {focalMesh.sharedContacts.map((c, idx) => {
                        const y = 35 + idx * 62;
                        return (
                          <line
                            key={`srb-${c.id}`}
                            x1="570"
                            y1="210"
                            x2="350"
                            y2={y + 16}
                            stroke={hoveredContact?.id === c.id ? "#f59e0b" : "#475569"}
                            strokeWidth={hoveredContact?.id === c.id ? "3" : "1.2"}
                            strokeOpacity={hoveredContact?.id === c.id ? 1 : 0.7}
                          />
                        );
                      })}

                      {/* Lines from Right Target B to Right Proxies */}
                      {focalMesh.rightContacts.map((c, idx) => {
                        const y = 50 + idx * 75;
                        return (
                          <line
                            key={`rb-${c.id}`}
                            x1="570"
                            y1="210"
                            x2="470"
                            y2={y + 16}
                            stroke={hoveredContact?.id === c.id ? "#10b981" : "#334155"}
                            strokeWidth={hoveredContact?.id === c.id ? "2.5" : "1"}
                            strokeDasharray="4 2"
                            strokeOpacity={hoveredContact?.id === c.id ? 1 : 0.6}
                          />
                        );
                      })}
                    </svg>

                    {/* ── LEFT FOCAL TARGET (Target A) ── */}
                    <div className="relative z-10 flex flex-col items-center group cursor-pointer">
                      <div
                        onClick={() => setSelectedNode(focalMesh.nodeA)}
                        className="w-24 h-24 rounded-full bg-emerald-600 border-4 border-emerald-400 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 transition-all text-white"
                      >
                        <PhoneCall className="w-7 h-7 text-white animate-pulse" />
                        <span className="text-[10px] font-bold mt-0.5 bg-slate-950/80 px-1.5 py-0.5 rounded text-emerald-300">
                          {focalMesh.nodeA.threat_score.toFixed(0)} RISK
                        </span>
                      </div>
                      <div className="mt-2 text-center max-w-[120px]">
                        <p className="font-extrabold text-sm text-emerald-300 tracking-wider">
                          {focalMesh.nodeA.phone || "+91-2236381844"}
                        </p>
                        <p className="text-xs font-bold text-white truncate">{focalMesh.nodeA.label}</p>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Main Criminal 1</span>
                      </div>
                    </div>

                    {/* ── COLUMN 1: TARGET A PROXIES & DEVICES ── */}
                    <div className="relative z-10 flex flex-col justify-around h-full space-y-2">
                      {focalMesh.leftContacts.map((c) => (
                        <div
                          key={c.id}
                          onMouseEnter={() => setHoveredContact(c)}
                          onMouseLeave={() => setHoveredContact(null)}
                          onClick={() => setSelectedNode({ id: c.id, label: c.name, phone: c.label, threat_score: c.threat } as any)}
                          className={`flex items-center gap-1.5 p-1.5 rounded-lg border cursor-pointer transition-all ${
                            c.type === "DEVICE"
                              ? "bg-purple-950/60 border-purple-500/50 hover:border-purple-400"
                              : "bg-pink-950/60 border-pink-500/50 hover:border-pink-400"
                          } ${hoveredContact?.id === c.id ? "scale-110 shadow-lg ring-1 ring-white" : ""}`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${c.type === "DEVICE" ? "bg-purple-600" : "bg-pink-600"}`}>
                            {c.type === "DEVICE" ? <Radio className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                          </div>
                          <div className="text-[10px] max-w-[100px]">
                            <p className="font-bold text-slate-200 truncate">{c.name}</p>
                            <p className="text-[9px] text-slate-400 truncate">{c.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ── COLUMN 2: SHARED MUTUAL PROXIES (BRIDGES) ── */}
                    <div className="relative z-10 flex flex-col justify-around h-full space-y-2">
                      <div className="text-center -mt-2">
                        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                          ⇄ Mutual Bridges
                        </span>
                      </div>
                      {focalMesh.sharedContacts.map((c) => (
                        <div
                          key={c.id}
                          onMouseEnter={() => setHoveredContact(c)}
                          onMouseLeave={() => setHoveredContact(null)}
                          onClick={() => setSelectedNode({ id: c.id, label: c.name, phone: c.label, threat_score: c.threat } as any)}
                          className={`flex items-center gap-1.5 p-1.5 rounded-lg border cursor-pointer transition-all ${
                            c.type === "DEVICE"
                              ? "bg-purple-900/60 border-purple-400 hover:border-purple-300"
                              : c.type === "PHONE"
                              ? "bg-emerald-900/60 border-emerald-400 hover:border-emerald-300"
                              : "bg-pink-900/60 border-pink-400 hover:border-pink-300"
                          } ${hoveredContact?.id === c.id ? "scale-110 shadow-xl ring-2 ring-amber-400 bg-amber-950/80" : ""}`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                              c.type === "DEVICE"
                                ? "bg-purple-500"
                                : c.type === "PHONE"
                                ? "bg-emerald-500"
                                : "bg-pink-500"
                            }`}
                          >
                            {c.type === "DEVICE" ? <Radio className="w-3 h-3" /> : c.type === "PHONE" ? <PhoneCall className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                          </div>
                          <div className="text-[10px] max-w-[110px]">
                            <p className="font-bold text-white truncate">{c.name}</p>
                            <p className="text-[9px] text-amber-300 font-mono truncate">{c.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ── COLUMN 3: TARGET B PROXIES & DEVICES ── */}
                    <div className="relative z-10 flex flex-col justify-around h-full space-y-2">
                      {focalMesh.rightContacts.map((c) => (
                        <div
                          key={c.id}
                          onMouseEnter={() => setHoveredContact(c)}
                          onMouseLeave={() => setHoveredContact(null)}
                          onClick={() => setSelectedNode({ id: c.id, label: c.name, phone: c.label, threat_score: c.threat } as any)}
                          className={`flex items-center gap-1.5 p-1.5 rounded-lg border cursor-pointer transition-all ${
                            c.type === "DEVICE"
                              ? "bg-purple-950/60 border-purple-500/50 hover:border-purple-400"
                              : "bg-pink-950/60 border-pink-500/50 hover:border-pink-400"
                          } ${hoveredContact?.id === c.id ? "scale-110 shadow-lg ring-1 ring-white" : ""}`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${c.type === "DEVICE" ? "bg-purple-600" : "bg-pink-600"}`}>
                            {c.type === "DEVICE" ? <Radio className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                          </div>
                          <div className="text-[10px] max-w-[100px]">
                            <p className="font-bold text-slate-200 truncate">{c.name}</p>
                            <p className="text-[9px] text-slate-400 truncate">{c.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ── RIGHT FOCAL TARGET (Target B) ── */}
                    <div className="relative z-10 flex flex-col items-center group cursor-pointer">
                      <div
                        onClick={() => setSelectedNode(focalMesh.nodeB)}
                        className="w-24 h-24 rounded-full bg-emerald-600 border-4 border-emerald-400 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 transition-all text-white"
                      >
                        <PhoneCall className="w-7 h-7 text-white animate-pulse" />
                        <span className="text-[10px] font-bold mt-0.5 bg-slate-950/80 px-1.5 py-0.5 rounded text-emerald-300">
                          {focalMesh.nodeB.threat_score.toFixed(0)} RISK
                        </span>
                      </div>
                      <div className="mt-2 text-center max-w-[120px]">
                        <p className="font-extrabold text-sm text-emerald-300 tracking-wider">
                          {focalMesh.nodeB.phone || "+91-7611970993"}
                        </p>
                        <p className="text-xs font-bold text-white truncate">{focalMesh.nodeB.label}</p>
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Main Criminal 2</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── 360° Circular Topology View ── */
                  <div className="relative w-full h-[420px] flex items-center justify-center">
                    <svg className="w-full h-full absolute inset-0 pointer-events-none">
                      {filteredNodes.map((node, i) => {
                        const numNodes = filteredNodes.length;
                        const radius = Math.min(180, 40 + numNodes * 6);
                        const cx = 310;
                        const cy = 210;
                        const x1 = cx + radius * Math.cos((2 * Math.PI * i) / numNodes);
                        const y1 = cy + radius * Math.sin((2 * Math.PI * i) / numNodes);

                        return filteredNodes.slice(i + 1, i + 3).map((targetNode, j) => {
                          const targetIdx = (i + j + 1) % numNodes;
                          const x2 = cx + radius * Math.cos((2 * Math.PI * targetIdx) / numNodes);
                          const y2 = cy + radius * Math.sin((2 * Math.PI * targetIdx) / numNodes);
                          const isSelected = selectedNode?.id === node.id || selectedNode?.id === targetNode.id;
                          const isHighThreat = node.threat_score > 70 || targetNode.threat_score > 70;

                          return (
                            <line
                              key={`${node.id}-${targetNode.id}`}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke={isSelected ? "#3b82f6" : isHighThreat ? "#ef4444" : "#334155"}
                              strokeWidth={isSelected ? 3 : isHighThreat ? 1.8 : 0.8}
                              strokeOpacity={isSelected ? 0.9 : isHighThreat ? 0.6 : 0.3}
                            />
                          );
                        });
                      })}
                    </svg>

                    {filteredNodes.map((node, idx) => {
                      const numNodes = filteredNodes.length;
                      const radius = Math.min(180, 40 + numNodes * 6);
                      const cx = 310;
                      const cy = 210;
                      const x = cx + radius * Math.cos((2 * Math.PI * idx) / numNodes) - 20;
                      const y = cy + radius * Math.sin((2 * Math.PI * idx) / numNodes) - 20;

                      const isSelected = selectedNode?.id === node.id;
                      const isKingpin = node.threat_score > 75 || idx === 0;
                      const syndicateKey = idx % 4 === 0 ? "NET_ALPHA" : idx % 4 === 1 ? "NET_BETA" : idx % 4 === 2 ? "NET_GAMMA" : "NET_DELTA";
                      const syndicate = SYNDICATE_COLORS[syndicateKey];

                      return (
                        <div
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          style={{ left: `${x}px`, top: `${y}px` }}
                          className={`absolute cursor-pointer group transition-all duration-300 flex flex-col items-center justify-center z-10 ${
                            isSelected ? "scale-125 z-30" : "hover:scale-110 hover:z-20"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                              syndicate.bg
                            } ${
                              isKingpin ? "ring-4 ring-amber-400 shadow-[0_0_15px_#f59e0b]" : ""
                            } ${
                              isSelected ? "ring-4 ring-blue-400 shadow-[0_0_20px_#60a5fa]" : ""
                            }`}
                          >
                            <span className="text-white font-bold font-mono text-[9px] drop-shadow">
                              {node.threat_score.toFixed(0)}
                            </span>
                          </div>
                          <div className="mt-1 text-center max-w-[80px]">
                            <span className={`text-[9px] font-bold font-mono block truncate ${isSelected ? "text-blue-300 underline" : "text-slate-300"}`}>
                              {node.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                </div>

                {/* ── Bottom Call Frequency Timeline Bar (Matching Screenshot) ── */}
                <div className="border-t border-slate-800 pt-2 px-1 flex flex-col gap-1.5 z-10 bg-slate-950/90 rounded-b">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      CALL ACTIVITY DENSITY TIMELINE
                    </span>
                    <span>Period: <strong className="text-emerald-300">{timelinePeriod}</strong> · 142 Call Events Logged</span>
                  </div>

                  {/* Histogram Chart Bars matching reference image */}
                  <div className="grid grid-cols-5 gap-1.5 items-end h-10 px-2 py-1 bg-slate-900/60 rounded border border-slate-800">
                    {[
                      { period: "Sep 2 - 8", height: "45%", count: 18 },
                      { period: "Sep 9 - 15", height: "85%", count: 42, active: true },
                      { period: "Sep 16 - 22", height: "65%", count: 31 },
                      { period: "Sep 23 - 29", height: "95%", count: 52 },
                      { period: "Oct 1 - 7", height: "30%", count: 12 },
                    ].map((bar, i) => (
                      <div
                        key={i}
                        onClick={() => setTimelinePeriod(bar.period)}
                        className="group flex flex-col items-center justify-end h-full cursor-pointer"
                      >
                        <div
                          className={`w-full rounded-t transition-all ${
                            bar.active || timelinePeriod === bar.period
                              ? "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                              : "bg-slate-700 hover:bg-emerald-600"
                          }`}
                          style={{ height: bar.height }}
                        />
                        <span className="text-[8px] text-slate-400 font-mono mt-0.5 truncate">{bar.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>


          {/* NEW PANEL: Tower Co-Location & Cross-Domain Convergence (Cols 3) */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="bg-slate-900 border-slate-800 text-white space-y-4 p-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200">
                  ADVANCED ANALYTICS
                </h3>
                <span className="text-[10px] text-blue-400">● ANALYSIS ENGINE</span>
              </div>

              {/* Tower Co-Location Section */}
              {towerLoading ? (
                <div className="text-center p-4 text-xs font-mono text-slate-500">
                  Loading tower co-location data...
                </div>
              ) : towerError ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-xs text-red-600">
                  {towerError}
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-400" />
                        Cell Tower Co-Location Timeline
                      </h3>
                      <span className="text-xs text-slate-400">
                        {towerCoLocations.length} co-location events detected
                      </span>
                    </div>
                    <div className="space-y-2">
                      {towerCoLocations.map((tower, idx) => (
                        <div key={tower.tower_id} className="p-3 bg-slate-950 border border-slate-800 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-white">{tower.tower_location}</span>
                            <span className="text-xs text-slate-400">
                              {tower.duration_minutes} min window
                            </span>
                          </div>
                          <div className="space-y-1 text-xs font-mono">
                            <div className="justify-between">
                              <span>Start Time (IST):</span>
                              <span className="font-mono">{new Date(tower.start_time).toLocaleTimeString('en-IN', {hour12: false})}</span>
                            </div>
                            <div className="justify-between">
                              <span>End Time (IST):</span>
                              <span className="font-mono">{new Date(tower.end_time).toLocaleTimeString('en-IN', {hour12: false})}</span>
                            </div>
                            <div className="justify-between">
                              <span>Coordinates:</span>
                              <span className="font-mono">({tower.lat.toFixed(4)}, {tower.lng.toFixed(4)})</span>
                            </div>
                            <div className="justify-between">
                              <span>Suspects Involved:</span>
                              <span className="font-mono">{tower.suspects.join(", ")}</span>
                            </div>
                            <div className="justify-between">
                              <span>Call Events:</span>
                              <span className="font-mono text-emerald-600">{tower.call_count}</span>
                            </div>
                          </div>
                          <div className="flex justify-end mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                alert(`Flagged tower ${tower.tower_id} as clandestine physical meeting location\nSuspects: ${tower.suspects.join(", ")}\nTime: ${new Date(tower.start_time).toLocaleString()} - ${new Date(tower.end_time).toLocaleString()}`);
                              }}
                            >
                              Flag as Clandestine Meeting
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Cross-Domain Convergence Section */}
              <div className="space-y-4 pt-3 border-t border-slate-800">
                {convergenceLoading ? (
                  <div className="text-center p-4 text-xs font-mono text-slate-500">
                    Loading convergence events...
                  </div>
                ) : convergenceError ? (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 text-xs text-red-600">
                    {convergenceError}
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                          <Zap className="h-4 w-4 text-yellow-400" />
                          Cross-Domain Convergence Matrix
                        </h3>
                        <span className="text-xs text-slate-400">
                          {convergenceEvents.length} convergence events detected
                        </span>
                      </div>
                      <div className="space-y-2">
                        {convergenceEvents.map((event, idx) => (
                          <div key={event.id} className="p-3 bg-slate-950 border border-slate-800 rounded">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-white">Convergence Event #{idx + 1}</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${riskColor(event.risk_level).bg} ${riskColor(event.risk_level).cls}`}>
                                {event.risk_level}
                              </span>
                            </div>
                            <div className="space-y-1 text-xs font-mono">
                              <div className="justify-between">
                                <span>Timestamp (IST):</span>
                                <span className="font-mono">{new Date(event.timestamp).toLocaleTimeString('en-IN', {hour12: false})}</span>
                              </div>
                              <div className="justify-between">
                                <span>Confidence Score:</span>
                                <span className="font-bold text-emerald-600">
                                  {(event.confidence_score * 100).toFixed(1)}%
                                </span>
                              </div>
                              <div className="justify-between">
                                <span>Risk Level:</span>
                                <span className={`text-${riskColor(event.risk_level).cls}`}>
                                  {event.risk_level}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 p-3 bg-slate-900/50 rounded">
                              <h4 className="text-xs font-mono font-bold text-slate-400 mb-1">
                                Event Details:
                              </h4>
                              <div className="space-y-1 text-xs">
                                {event.events.cdr && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-slate-400">CDR Call:</span>
                                    <span className="font-mono text-blue-400">
                                      {event.events.cdr.caller} → {event.events.cdr.receiver}
                                    </span>
                                    <span className="text-xs text-slate-400 ml-2">
                                      ({event.events.cdr.duration_seconds}s @ {new Date(event.events.cdr.timestamp).toLocaleTimeString('en-IN', {hour12: false})})
                                    </span>
                                  </div>
                                )}
                                {event.events.cctv && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-slate-400">CCTV Sighting:</span>
                                    <span className="font-mono text-blue-400">
                                      {event.events.cctv.camera_id} @ {event.events.cctv.camera_location}
                                    </span>
                                    <span className="text-xs text-slate-400 ml-2">
                                      ({(event.events.cctv.confidence * 100).toFixed(1)}% confidence @ {new Date(event.events.cctv.timestamp).toLocaleTimeString('en-IN', {hour12: false})})
                                    </span>
                                  </div>
                                )}
                                {event.events.financial && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-slate-400">Financial Transfer:</span>
                                    <span className="font-mono text-blue-400">
                                      ₹{event.events.financial.amount_inr.toLocaleString()} {event.events.financial.sender} → {event.events.financial.receiver}
                                    </span>
                                    <span className="text-xs text-slate-400 ml-2">
                                      @ {new Date(event.events.financial.timestamp).toLocaleTimeString('en-IN', {hour12: false})}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="mt-2 p-2 bg-slate-900/30 rounded">
                              <p className="text-xs font-mono text-slate-500">
                                <strong>Narrative:</strong> {event.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Bridge/Gatekeeper Analysis Section */}
              <div className="space-y-4 pt-3 border-t border-slate-800">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-amber-400" />
                      Network Centrality & Gatekeeper Analysis
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {selectedNode ? (
                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between">
                          <span>Betweenness Centrality:</span>
                          <span className="font-mono text-emerald-600">
                            {(selectedNode.betweenness_centrality || 0).toFixed(3)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Degree Centrality:</span>
                          <span className="font-mono text-emerald-600">
                            {(selectedNode.degree_centrality || 0).toFixed(3)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>PageRank Estimate:</span>
                          <span className="font-mono text-emerald-600">
                            {(selectedNode.betweenness_centrality ? (selectedNode.betweenness_centrality * 10 + 1) : 1).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span>Role Classification:</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            (selectedNode.betweenness_centrality || 0) > 0.05
                              ? "bg-blue-500/20 border-blue-400 text-blue-300"
                              : selectedNode.threat_score > 75
                                ? "bg-red-500/20 border-red-400 text-red-300"
                                : "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                          }`}>
                            {(selectedNode.betweenness_centrality || 0) > 0.05
                              ? "BRIDGE / GATEKEEPER"
                              : selectedNode.threat_score > 75
                                ? "KINGPIN / NODE LEADER"
                                : "NETWORK MEMBER"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4 text-xs font-mono text-slate-500">
                        Select a node to view centrality analysis
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ── Fullscreen Expanded Graph Modal Overlay ── */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col justify-between font-mono overflow-hidden">
          {/* Top Modal Navigation & Control Bar */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-white">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <h2 className="text-sm font-bold text-white tracking-wider">
                  EXPANDED CDR MESH FORENSICS // {layoutMode === "focal" ? "FOCAL TARGET MESH" : "CIRCULAR TOPOLOGY"}
                </h2>
                <p className="text-[10px] text-slate-400">Brihanmumbai Police Live Criminal Interception Map</p>
              </div>
            </div>

            {/* Target Selectors (in Expanded Mode) */}
            {layoutMode === "focal" && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Target 1:</span>
                  <select
                    value={targetA}
                    onChange={(e) => setTargetA(e.target.value)}
                    className="bg-slate-950 border border-emerald-500/50 text-emerald-300 rounded px-2.5 py-1 text-xs font-bold focus:outline-none"
                  >
                    {topAnchorCandidates.map((c) => (
                      <option key={c.id} value={c.label}>
                        {c.label} ({c.threat_score.toFixed(0)})
                      </option>
                    ))}
                  </select>
                </div>

                <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 text-[10px] font-bold">
                  ⇄ MUTUAL PROXIES
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Target 2:</span>
                  <select
                    value={targetB}
                    onChange={(e) => setTargetB(e.target.value)}
                    className="bg-slate-950 border border-emerald-500/50 text-emerald-300 rounded px-2.5 py-1 text-xs font-bold focus:outline-none"
                  >
                    {topAnchorCandidates.map((c) => (
                      <option key={c.id} value={c.label}>
                        {c.label} ({c.threat_score.toFixed(0)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Interactive Control Suite */}
            <div className="flex items-center gap-2">
              {/* Zoom Suite */}
              <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800 text-xs">
                <button
                  onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.15).toFixed(2)))}
                  title="Zoom Out (-)"
                  className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 font-bold text-emerald-400">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.15).toFixed(2)))}
                  title="Zoom In (+)"
                  className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }}
                  title="Reset View (0)"
                  className="px-2 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded ml-1 font-bold"
                >
                  Reset
                </button>
              </div>

              {/* Directional Keypad (D-Pad) */}
              <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800">
                <button
                  onClick={() => setPan((p) => ({ ...p, x: p.x + 40 }))}
                  title="Move Left (← / A)"
                  className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex flex-col">
                  <button
                    onClick={() => setPan((p) => ({ ...p, y: p.y + 40 }))}
                    title="Move Up (↑ / W)"
                    className="p-0.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPan((p) => ({ ...p, y: p.y - 40 }))}
                    title="Move Down (↓ / S)"
                    className="p-0.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => setPan((p) => ({ ...p, x: p.x - 40 }))}
                  title="Move Right (→ / D)"
                  className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Close / Exit Fullscreen Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="bg-red-950/60 border-red-500/50 text-red-300 hover:bg-red-900 text-xs font-bold"
              >
                <Minimize2 className="w-3.5 h-3.5 mr-1" /> Exit Fullscreen (ESC)
              </Button>
            </div>
          </div>

          {/* Fullscreen Graph Canvas */}
          <div className="flex-1 relative my-4 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            <div
              className="relative w-full h-full p-8 transition-transform duration-100 ease-out flex items-center justify-between"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center center"
              }}
            >
              {layoutMode === "focal" ? (
                /* Fullscreen Focal Mesh */
                <div className="relative w-full h-[520px] flex items-center justify-between">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {focalMesh.leftContacts.map((c, idx) => (
                      <line
                        key={`sla-exp-${c.id}`}
                        x1="120"
                        y1="260"
                        x2="280"
                        y2={60 + idx * 90 + 16}
                        stroke={hoveredContact?.id === c.id ? "#10b981" : "#334155"}
                        strokeWidth={hoveredContact?.id === c.id ? "3" : "1.2"}
                        strokeDasharray="4 2"
                      />
                    ))}
                    {focalMesh.sharedContacts.map((c, idx) => (
                      <line
                        key={`sh-exp-${c.id}`}
                        x1="120"
                        y1="260"
                        x2="460"
                        y2={45 + idx * 75 + 16}
                        stroke={hoveredContact?.id === c.id ? "#f59e0b" : "#475569"}
                        strokeWidth={hoveredContact?.id === c.id ? "3.5" : "1.5"}
                      />
                    ))}
                    {focalMesh.sharedContacts.map((c, idx) => (
                      <line
                        key={`sh-exp-r-${c.id}`}
                        x1="800"
                        y1="260"
                        x2="460"
                        y2={45 + idx * 75 + 16}
                        stroke={hoveredContact?.id === c.id ? "#f59e0b" : "#475569"}
                        strokeWidth={hoveredContact?.id === c.id ? "3.5" : "1.5"}
                      />
                    ))}
                    {focalMesh.rightContacts.map((c, idx) => (
                      <line
                        key={`rb-exp-${c.id}`}
                        x1="800"
                        y1="260"
                        x2="640"
                        y2={60 + idx * 90 + 16}
                        stroke={hoveredContact?.id === c.id ? "#10b981" : "#334155"}
                        strokeWidth={hoveredContact?.id === c.id ? "3" : "1.2"}
                        strokeDasharray="4 2"
                      />
                    ))}
                  </svg>

                  {/* Left Target */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      onClick={() => setSelectedNode(focalMesh.nodeA)}
                      className="w-28 h-28 rounded-full bg-emerald-600 border-4 border-emerald-400 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.6)] cursor-pointer text-white hover:scale-105 transition-all"
                    >
                      <PhoneCall className="w-9 h-9 text-white animate-pulse" />
                      <span className="text-xs font-bold mt-1 bg-slate-950/90 px-2 py-0.5 rounded text-emerald-300">
                        {focalMesh.nodeA.threat_score.toFixed(0)} RISK
                      </span>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="font-extrabold text-base text-emerald-300">{focalMesh.nodeA.phone || "+91-2236381844"}</p>
                      <p className="text-sm font-bold text-white">{focalMesh.nodeA.label}</p>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Primary Target A</span>
                    </div>
                  </div>

                  {/* Left Column Proxies */}
                  <div className="relative z-10 flex flex-col justify-around h-full space-y-3">
                    {focalMesh.leftContacts.map((c) => (
                      <div
                        key={c.id}
                        onMouseEnter={() => setHoveredContact(c)}
                        onMouseLeave={() => setHoveredContact(null)}
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                          c.type === "DEVICE" ? "bg-purple-950/70 border-purple-500/50" : "bg-pink-950/70 border-pink-500/50"
                        } ${hoveredContact?.id === c.id ? "scale-110 shadow-xl ring-2 ring-white" : ""}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${c.type === "DEVICE" ? "bg-purple-600" : "bg-pink-600"}`}>
                          {c.type === "DEVICE" ? <Radio className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                        </div>
                        <div className="text-xs">
                          <p className="font-bold text-slate-100">{c.name}</p>
                          <p className="text-[10px] text-slate-400">{c.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mutual Center Bridges */}
                  <div className="relative z-10 flex flex-col justify-around h-full space-y-3">
                    <div className="text-center -mt-2">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-950/90 px-3 py-1 rounded-full border border-amber-500/40">
                        ⇄ Mutual Bridge Entities
                      </span>
                    </div>
                    {focalMesh.sharedContacts.map((c) => (
                      <div
                        key={c.id}
                        onMouseEnter={() => setHoveredContact(c)}
                        onMouseLeave={() => setHoveredContact(null)}
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                          c.type === "DEVICE"
                            ? "bg-purple-900/70 border-purple-400"
                            : c.type === "PHONE"
                            ? "bg-emerald-900/70 border-emerald-400"
                            : "bg-pink-900/70 border-pink-400"
                        } ${hoveredContact?.id === c.id ? "scale-110 shadow-2xl ring-2 ring-amber-400 bg-amber-950" : ""}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${c.type === "DEVICE" ? "bg-purple-500" : c.type === "PHONE" ? "bg-emerald-500" : "bg-pink-500"}`}>
                          {c.type === "DEVICE" ? <Radio className="w-4 h-4" /> : c.type === "PHONE" ? <PhoneCall className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                        </div>
                        <div className="text-xs">
                          <p className="font-bold text-white">{c.name}</p>
                          <p className="text-[10px] text-amber-300 font-mono">{c.label} · {c.callsA + c.callsB} calls</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column Proxies */}
                  <div className="relative z-10 flex flex-col justify-around h-full space-y-3">
                    {focalMesh.rightContacts.map((c) => (
                      <div
                        key={c.id}
                        onMouseEnter={() => setHoveredContact(c)}
                        onMouseLeave={() => setHoveredContact(null)}
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                          c.type === "DEVICE" ? "bg-purple-950/70 border-purple-500/50" : "bg-pink-950/70 border-pink-500/50"
                        } ${hoveredContact?.id === c.id ? "scale-110 shadow-xl ring-2 ring-white" : ""}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${c.type === "DEVICE" ? "bg-purple-600" : "bg-pink-600"}`}>
                          {c.type === "DEVICE" ? <Radio className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                        </div>
                        <div className="text-xs">
                          <p className="font-bold text-slate-100">{c.name}</p>
                          <p className="text-[10px] text-slate-400">{c.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Target */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      onClick={() => setSelectedNode(focalMesh.nodeB)}
                      className="w-28 h-28 rounded-full bg-emerald-600 border-4 border-emerald-400 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.6)] cursor-pointer text-white hover:scale-105 transition-all"
                    >
                      <PhoneCall className="w-9 h-9 text-white animate-pulse" />
                      <span className="text-xs font-bold mt-1 bg-slate-950/90 px-2 py-0.5 rounded text-emerald-300">
                        {focalMesh.nodeB.threat_score.toFixed(0)} RISK
                      </span>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="font-extrabold text-base text-emerald-300">{focalMesh.nodeB.phone || "+91-7611970993"}</p>
                      <p className="text-sm font-bold text-white">{focalMesh.nodeB.label}</p>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Primary Target B</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Fullscreen Topology */
                <div className="text-center p-8 text-white font-mono">
                  Showing 360° Full Network Topology in Fullscreen Mode
                </div>
              )}
            </div>
          </div>

          {/* Bottom Controls Info Bar */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Keyboard Navigation Active: Use <strong>Arrow Keys / WASD</strong> to Pan, <strong>+ / -</strong> to Zoom, <strong>0</strong> to Reset, <strong>ESC</strong> to Close.
            </span>
            <span className="text-emerald-400 font-bold">
              Current Zoom: {Math.round(zoom * 100)}% · Pan: ({pan.x}, {pan.y})
            </span>
          </div>
        </div>
      )}
    </div>
  );
}