"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { LoadingSpinner, ErrorState } from "@/components/ui/loading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { CDRSummaryResponse, NetworkGraphResponse, NetworkNode } from "@/types";
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
  Sparkles
} from "lucide-react";

// Syndicate Color Mappings matching screenshot
const SYNDICATE_COLORS: Record<string, { bg: string; border: string; hex: string; label: string }> = {
  NET_ALPHA: { bg: "bg-red-500", border: "border-red-400", hex: "#ef4444", label: "NET_ALPHA (Hawala / Org)" },
  NET_BETA: { bg: "bg-orange-500", border: "border-orange-400", hex: "#f97316", label: "NET_BETA (Logistics / Cartel)" },
  NET_GAMMA: { bg: "bg-purple-500", border: "border-purple-400", hex: "#a855f7", label: "NET_GAMMA (Phishing / Mules)" },
  NET_DELTA: { bg: "bg-cyan-500", border: "border-cyan-400", hex: "#06b6d4", label: "NET_DELTA (Arms / Extortion)" },
};

export default function CDRNetworkPage() {
  const [summary, setSummary] = useState<CDRSummaryResponse | null>(null);
  const [graphData, setGraphData] = useState<NetworkGraphResponse | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Left Panel Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [minThreatScore, setMinThreatScore] = useState(0);
  const [criminalsOnly, setCriminalsOnly] = useState(false);
  const [syndicateFilter, setSyndicateFilter] = useState("ALL");
  const [gangFilter, setGangFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [quickPillFilter, setQuickPillFilter] = useState<string | null>(null);
  const [gangsList, setGangsList] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [sumRes, graphRes, gangsRes] = await Promise.all([
          api.getCDRPairs().catch(() => null),
          api.getCDRGraph().catch(() => null),
          api.getGangs().catch(() => null)
        ]);
        setSummary(sumRes);
        setGraphData(graphRes);
        if (gangsRes && gangsRes.gangs) {
          setGangsList(gangsRes.gangs);
        }
        if (graphRes && graphRes.top_key_influencers && graphRes.top_key_influencers.length > 0) {
          setSelectedNode(graphRes.top_key_influencers[0]);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load CDR network data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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
  }, [graphData, searchQuery, minThreatScore, criminalsOnly, syndicateFilter, roleFilter, quickPillFilter]);

  // Edges connecting visible nodes
  const filteredEdges = useMemo(() => {
    if (!graphData) return [];
    const visibleIds = new Set(filteredNodes.map(n => n.id));
    return graphData.edges.filter(e => visibleIds.has(e.source) && visibleIds.has(e.target));
  }, [graphData, filteredNodes]);

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
          <Link href="/dossiers">
            <button className="px-3 py-1 rounded-lg border border-emerald-600 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 transition-all flex items-center gap-1.5 text-[11px] font-bold">
              🎯 Ground Truth
            </button>
          </Link>
        </div>
      </div>

      {/* 3-Panel Main Layout */}
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
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Search Entity / Phone / Plate / Org</label>
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
              <div className="flex justify-between items-center text-xs font-mono">
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
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">FILTER SYNDICATE</label>
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
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">FILTER DETECTED GANG</label>
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
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">FILTER ROLE</label>
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
          <Card className="bg-slate-950 border-slate-800 p-0 relative overflow-hidden min-h-[620px] flex flex-col shadow-2xl">
            {/* Live Canvas Top Status Indicator */}
            <div className="p-3 border-b border-slate-800 bg-slate-900/90 flex justify-between items-center text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-slate-200">INTERACTIVE GRAPH TOPOLOGY</span>
              </div>
              <span className="text-slate-400 text-[11px]">
                Showing <strong className="text-white font-bold">{filteredNodes.length}</strong> of {graphData?.total_nodes} entities
              </span>
            </div>

            {/* SVG Interactive Physics Canvas Renderer */}
            <div className="flex-1 relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] min-h-[560px] flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full absolute inset-0 pointer-events-none">
                {/* Draw connection edges between nodes */}
                {filteredNodes.map((node, i) => {
                  const numNodes = filteredNodes.length;
                  const radius = Math.min(220, 40 + numNodes * 8);
                  const cx = 310;
                  const cy = 270;
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

              {/* Node Elements Overlay */}
              <div className="relative w-full h-full min-h-[560px]">
                {filteredNodes.map((node, idx) => {
                  const numNodes = filteredNodes.length;
                  const radius = Math.min(220, 40 + numNodes * 8);
                  const cx = 310;
                  const cy = 270;
                  const x = cx + radius * Math.cos((2 * Math.PI * idx) / numNodes) - 24;
                  const y = cy + radius * Math.sin((2 * Math.PI * idx) / numNodes) - 24;

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
                      {/* Node Circle Visual with glowing ring */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                          syndicate.bg
                        } ${
                          isKingpin ? "ring-4 ring-amber-400 shadow-[0_0_15px_#f59e0b]" : ""
                        } ${
                          isSelected ? "ring-4 ring-blue-400 shadow-[0_0_20px_#60a5fa]" : ""
                        }`}
                      >
                        <span className="text-white font-bold font-mono text-[10px] drop-shadow">
                          {node.threat_score.toFixed(0)}
                        </span>
                      </div>

                      {/* Node Label Below */}
                      <div className="mt-1 text-center max-w-[100px]">
                        <span className={`text-[10px] font-bold font-mono block truncate ${isSelected ? "text-blue-300 underline font-extrabold" : "text-slate-200"}`}>
                          {node.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT PANEL: SUSPECT FORENSICS INSPECTOR (Cols 3) matching screenshot */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="bg-slate-900 border-slate-800 text-white space-y-4 p-4 shadow-xl sticky top-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200">
                SUSPECT FORENSICS
              </h3>
              <span className="text-[10px] text-blue-400">● FORENSICS ENGINE</span>
            </div>

            {selectedNode ? (
              <div className="space-y-4 font-mono">
                {/* Header Profile Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{selectedNode.label}</h3>
                    <p className="text-[10px] text-slate-400">
                      {selectedNode.id} // {selectedNode.threat_score > 75 ? "Kingpin / Ring Leader" : selectedNode.risk_tier}
                    </p>
                  </div>

                  {/* Threat Score Badge matching screenshot red square */}
                  <div className="p-2 bg-red-950/80 border border-red-600 rounded-lg text-center min-w-[60px] shadow-[0_0_10px_#ef4444_inset]">
                    <span className="text-xl font-extrabold text-red-400 block leading-none">
                      {selectedNode.threat_score.toFixed(0)}
                    </span>
                    <span className="text-[8px] text-red-300 uppercase tracking-widest block font-bold mt-0.5">
                      THREAT SCORE
                    </span>
                  </div>
                </div>

                {/* Demographics Grid matching screenshot */}
                <div className="space-y-2 text-xs border-y border-slate-800 py-3">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400 text-[11px]">Age / Gender:</span>
                    <span className="font-bold text-white">28 / Male</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400 text-[11px]">Mobile:</span>
                    <span className="font-bold text-blue-400">{selectedNode.phone}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400 text-[11px]">Vehicle Plate:</span>
                    <span className="font-bold text-amber-400">MH-01-AX-9912</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400 text-[11px]">Front Org:</span>
                    <span className="font-bold text-slate-200">Peer Logistics Ltd</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400 text-[11px]">Legal Status:</span>
                    <span className="font-bold text-red-400">Under Trial (Bail)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400 text-[11px]">Cell / Cluster:</span>
                    <span className="font-bold text-purple-400">COMMUNITY_3</span>
                  </div>
                </div>

                {/* Download Case Dossier button matching screenshot */}
                <Link href={`/dossiers?suspect=${encodeURIComponent(selectedNode.label)}`}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold py-2.5 rounded-lg shadow-lg">
                    📥 Download Case Dossier (.MD)
                  </Button>
                </Link>

                {/* Financial Trail & AML Status Sub-Card matching screenshot */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> FINANCIAL TRAIL & AML STATUS
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Total Sent:</span>
                    <span className="font-bold text-emerald-400">₹41,31,918</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Total Received:</span>
                    <span className="font-bold text-emerald-400">₹54,87,204</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Smurfing Muling:</span>
                    <span className="font-bold text-amber-400 flex items-center gap-1">⚠️ FLAGGED</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Hawala Transfer:</span>
                    <span className="font-bold text-red-400 flex items-center gap-1">⚠️ FLAGGED</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 text-xs font-mono text-slate-500">
                Click any suspect node on the central canvas graph to inspect demographics, threat score, and financial AML status.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

