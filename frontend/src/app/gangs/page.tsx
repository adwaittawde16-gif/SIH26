"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { LoadingSpinner, ErrorState } from "@/components/ui/loading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/shared/KPICard";
import { api } from "@/lib/api";
import { GangListResponse, GangRecord, GangSubGraphResponse } from "@/types";
import {
  Layers,
  ShieldAlert,
  Users,
  CheckCircle2,
  XCircle,
  Edit3,
  GitMerge,
  UserPlus,
  Network,
  ArrowRight,
  Search,
  Radio
} from "lucide-react";

export default function GangsPage() {
  const [gangsData, setGangsData] = useState<GangListResponse | null>(null);
  const [selectedGang, setSelectedGang] = useState<GangRecord | null>(null);
  const [subGraph, setSubGraph] = useState<GangSubGraphResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Action States
  const [statusFilter, setStatusFilter] = useState<"ALL" | "CONFIRMED" | "CANDIDATE" | "DISMISSED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [renameInput, setRenameInput] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [tagEntityName, setTagEntityName] = useState("");
  const [showTagModal, setShowTagModal] = useState(false);

  useEffect(() => {
    loadGangs();
  }, []);

  useEffect(() => {
    if (selectedGang) {
      loadSubGraph(selectedGang.gang_id);
    }
  }, [selectedGang]);

  async function loadGangs() {
    try {
      setLoading(true);
      const res = await api.getGangs();
      setGangsData(res);
      if (res?.gangs && res.gangs.length > 0) {
        setSelectedGang(res.gangs[0]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load gang detection data");
    } finally {
      setLoading(false);
    }
  }

  async function loadSubGraph(gangId: string) {
    try {
      const res = await api.getGangSubGraph(gangId);
      setSubGraph(res);
    } catch (err: any) {
      console.error("Failed to load gang subgraph:", err);
    }
  }

  async function handleConfirm(gangId: string) {
    try {
      await api.confirmGang(gangId);
      loadGangs();
    } catch (err: any) {
      alert("Error confirming gang: " + err.message);
    }
  }

  async function handleRename(gangId: string) {
    if (!renameInput.trim()) return;
    try {
      await api.renameGang(gangId, renameInput.trim());
      setIsRenaming(false);
      setRenameInput("");
      loadGangs();
    } catch (err: any) {
      alert("Error renaming gang: " + err.message);
    }
  }

  async function handleDismiss(gangId: string) {
    try {
      await api.dismissGang(gangId);
      loadGangs();
    } catch (err: any) {
      alert("Error dismissing gang: " + err.message);
    }
  }

  async function handleTagEntity() {
    if (!tagEntityName.trim() || !selectedGang) return;
    try {
      await api.tagEntityGang(tagEntityName.trim(), selectedGang.gang_id);
      setTagEntityName("");
      setShowTagModal(false);
      loadGangs();
    } catch (err: any) {
      alert("Error tagging entity: " + err.message);
    }
  }

  if (loading) return <LoadingSpinner label="Running Modularity Clustering & Gang Detection Algorithms..." />;
  if (error) return <ErrorState message={error} onRetry={loadGangs} />;

  const filteredGangs = (gangsData?.gangs || []).filter((g) => {
    if (statusFilter !== "ALL" && g.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = g.name.toLowerCase().includes(q);
      const matchId = g.gang_id.toLowerCase().includes(q);
      const matchLeader = g.ring_leader.toLowerCase().includes(q);
      const matchMembers = g.members.some((m) => m.toLowerCase().includes(q));
      if (!matchName && !matchId && !matchLeader && !matchMembers) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <Header
        title="Module 4 — Gang & Crime Syndicate Classification"
        subtitle="NetworkX modularity clustering algorithm auto-detecting candidate gangs (Gang 1, Gang 2...), metadata tracking, and investigator overrides."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <KPICard label="Total Gangs Detected" value={gangsData?.total_gangs || 0} accent="purple" icon={Layers} />
        <KPICard label="Confirmed Gangs" value={gangsData?.confirmed_count || 0} accent="green" icon={CheckCircle2} />
        <KPICard label="Candidate Gangs" value={gangsData?.candidate_count || 0} accent="amber" icon={Radio} />
        <KPICard label="Dismissed Clusters" value={gangsData?.dismissed_count || 0} accent="red" icon={XCircle} />
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-white">
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {(["ALL", "CONFIRMED", "CANDIDATE", "DISMISSED"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                statusFilter === st ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              {st === "ALL" ? "All Gangs" : st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter Gang 1, Gang 2, leader name, or suspect..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:border-purple-500 focus:outline-none"
            />
          </div>
          <Button
            size="sm"
            onClick={() => setShowTagModal(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs"
          >
            <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Manual Tag Entity
          </Button>
        </div>
      </div>

      {/* Manual Tag Entity Modal */}
      {showTagModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-mono">
          <Card className="bg-slate-900 border-slate-800 text-white w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-purple-400" /> Ground Truth Gang Override
            </h3>
            <p className="text-xs text-slate-400">
              Manually assign a suspect entity to <strong className="text-purple-300">{selectedGang?.name}</strong> even if not clustered automatically.
            </p>
            <input
              type="text"
              value={tagEntityName}
              onChange={(e) => setTagEntityName(e.target.value)}
              placeholder="Enter suspect name (e.g. Md. Ranbir Bhalla)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowTagModal(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleTagEntity} className="bg-purple-600 hover:bg-purple-500">
                Confirm Tagging
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* 2-Column Main Layout: Gangs Roster Cards vs Sub-Graph Renderer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Gang Cards (Cols 6) */}
        <div className="lg:col-span-6 space-y-4 max-h-[700px] overflow-y-auto pr-1">
          {filteredGangs.map((gang) => {
            const isSelected = selectedGang?.gang_id === gang.gang_id;
            return (
              <Card
                key={gang.gang_id}
                onClick={() => setSelectedGang(gang)}
                className={`space-y-3 cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-slate-900 border-purple-500 shadow-xl ring-2 ring-purple-500/50"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono">
                    <Badge variant={gang.status === "CONFIRMED" ? "critical" : "moderate"}>
                      {gang.gang_id}
                    </Badge>
                    <h4 className="text-base font-bold text-white">{gang.name}</h4>
                  </div>
                  <Badge variant={gang.status === "CONFIRMED" ? "critical" : "default"} className="uppercase font-mono text-[10px]">
                    {gang.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 font-mono text-xs p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Members</span>
                    <strong className="text-white text-sm">{gang.member_count}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Leader</span>
                    <strong className="text-amber-400 truncate block text-xs">{gang.ring_leader}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Agg. Threat</span>
                    <strong className="text-red-400 text-sm">{gang.aggregate_threat_score.toFixed(1)}/100</strong>
                  </div>
                </div>

                {/* Member Roster Tags */}
                <div className="font-mono text-xs space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Roster Entities</span>
                  <div className="flex flex-wrap gap-1">
                    {gang.members.slice(0, 5).map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">
                        {m}
                      </span>
                    ))}
                    {gang.members.length > 5 && (
                      <span className="px-2 py-0.5 bg-slate-800/60 rounded text-[10px] text-slate-500">
                        +{gang.members.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Investigator Action Buttons */}
                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <div className="flex items-center gap-1.5">
                    {gang.status !== "CONFIRMED" && (
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); handleConfirm(gang.gang_id); }} className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] py-1 px-2.5">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Confirm
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGang(gang);
                        setIsRenaming(true);
                      }}
                      className="bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 text-[11px] py-1 px-2.5"
                    >
                      <Edit3 className="w-3 h-3 mr-1" /> Rename
                    </Button>
                    {gang.status !== "DISMISSED" && (
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleDismiss(gang.gang_id); }} className="bg-slate-950 border-red-900/50 text-red-400 hover:bg-red-950 text-[11px] py-1 px-2.5">
                        <XCircle className="w-3 h-3 mr-1" /> Dismiss
                      </Button>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-500">Detected {gang.date_first_detected}</span>
                </div>

                {/* Inline Rename Form */}
                {isRenaming && selectedGang?.gang_id === gang.gang_id && (
                  <div className="pt-2 flex gap-2 font-mono" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={renameInput}
                      onChange={(e) => setRenameInput(e.target.value)}
                      placeholder={`Rename ${gang.name}...`}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
                    />
                    <Button size="sm" onClick={() => handleRename(gang.gang_id)} className="bg-purple-600 text-xs">Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setIsRenaming(false)} className="text-xs">Cancel</Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Right Column: Gang Internal Network Sub-Graph Visualizer (Cols 6) */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="bg-slate-950 border-slate-800 p-0 relative overflow-hidden min-h-[600px] flex flex-col shadow-2xl">
            <div className="p-3 border-b border-slate-800 bg-slate-900/90 flex justify-between items-center text-xs font-mono">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white uppercase tracking-wider">{subGraph?.gang_name || selectedGang?.name} Network Mesh</span>
              </div>
              <Badge variant="critical">{subGraph?.total_nodes || 0} Members</Badge>
            </div>

            {/* Subgraph Canvas */}
            <div className="flex-1 relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] min-h-[540px] flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full absolute inset-0 pointer-events-none">
                {(subGraph?.nodes || []).map((node, i) => {
                  const numNodes = subGraph?.nodes.length || 1;
                  const radius = Math.min(180, 40 + numNodes * 12);
                  const cx = 280;
                  const cy = 250;
                  const x1 = cx + radius * Math.cos((2 * Math.PI * i) / numNodes);
                  const y1 = cy + radius * Math.sin((2 * Math.PI * i) / numNodes);

                  return (subGraph?.nodes || []).slice(i + 1).map((targetNode, j) => {
                    const targetIdx = i + j + 1;
                    const x2 = cx + radius * Math.cos((2 * Math.PI * targetIdx) / numNodes);
                    const y2 = cy + radius * Math.sin((2 * Math.PI * targetIdx) / numNodes);

                    return (
                      <line
                        key={`${node.id}-${targetNode.id}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#a855f7"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                      />
                    );
                  });
                })}
              </svg>

              <div className="relative w-full h-full min-h-[540px]">
                {(subGraph?.nodes || []).map((node, idx) => {
                  const numNodes = subGraph?.nodes.length || 1;
                  const radius = Math.min(180, 40 + numNodes * 12);
                  const cx = 280;
                  const cy = 250;
                  const x = cx + radius * Math.cos((2 * Math.PI * idx) / numNodes) - 20;
                  const y = cy + radius * Math.sin((2 * Math.PI * idx) / numNodes) - 20;

                  const isLeader = node.label === selectedGang?.ring_leader;

                  return (
                    <div
                      key={node.id}
                      style={{ left: `${x}px`, top: `${y}px` }}
                      className="absolute group flex flex-col items-center justify-center z-10"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                          isLeader ? "bg-amber-500 ring-4 ring-amber-400 shadow-[0_0_15px_#f59e0b]" : "bg-purple-600"
                        }`}
                      >
                        <span className="text-white font-bold font-mono text-[9px]">
                          {node.threat_score.toFixed(0)}
                        </span>
                      </div>

                      <div className="mt-1 text-center max-w-[90px]">
                        <span className="text-[9px] font-bold font-mono text-slate-200 block truncate">
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
      </div>
    </div>
  );
}
