"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { KPICard } from "@/components/shared/KPICard";
import { LoadingSpinner, ErrorState } from "@/components/ui/loading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { ThreatLeaderboardResponse, AlertsResponse, CrimeRingsResponse, CCTVMeetingsResponse, NocturnalAnomaliesResponse } from "@/types";
import {
  Flame,
  Network,
  Camera,
  Layers,
  Banknote,
  Moon,
  Eye,
  FileText,
  ArrowRight,
  ShieldAlert,
  Radio,
  BookOpen,
  Bell,
  Activity,
  Cpu,
  Fingerprint
} from "lucide-react";

export default function CommandCenterPage() {
  const [data, setData] = useState<ThreatLeaderboardResponse | null>(null);
  const [alerts, setAlerts] = useState<AlertsResponse | null>(null);
  const [rings, setRings] = useState<CrimeRingsResponse | null>(null);
  const [cctv, setCctv] = useState<CCTVMeetingsResponse | null>(null);
  const [nocturnal, setNocturnal] = useState<NocturnalAnomaliesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [boardRes, alertRes, ringsRes, cctvRes, noctRes] = await Promise.all([
          api.getThreatLeaderboard(),
          api.getAlerts(),
          api.getCrimeRings(),
          api.getCCTVMeetings(),
          api.getNocturnalAnomalies(),
        ]);
        setData(boardRes);
        setAlerts(alertRes);
        setRings(ringsRes);
        setCctv(cctvRes);
        setNocturnal(noctRes);
      } catch (err: any) {
        setError(err.message || "Failed to connect to Python FastAPI backend");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <LoadingSpinner label="Connecting to Tactical Intelligence Backend..." />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const topSuspect = data?.leaderboard?.[0];
  const criticalCount = data?.critical_count ?? 0;
  const highCount = data?.high_count ?? 0;
  const totalSuspects = data?.total_suspects ?? data?.leaderboard?.length ?? 0;

  const modules = [
    {
      title: "1. Suspect Threat Index",
      badge: "ALGORITHMIC RISK",
      desc: "Composite 0-100 suspect risk ranking with real-time heuristic weight simulator.",
      href: "/threat",
      icon: Flame,
      color: "text-red-400",
      borderGlow: "hover:border-red-500/50 hover:shadow-[0_0_20px_-3px_rgba(239,68,68,0.2)]"
    },
    {
      title: "2. CDR Network Graph",
      badge: "PAIRWISE MESH",
      desc: "Interactive 3D/2D force-directed physics mesh, dynamic suspect pairs, and tower hops.",
      href: "/cdr",
      icon: Network,
      color: "text-blue-400",
      borderGlow: "hover:border-blue-500/50 hover:shadow-[0_0_20px_-3px_rgba(59,130,246,0.2)]"
    },
    {
      title: "3. CCTV Co-Location",
      badge: "OPTICAL MATCH",
      desc: "Camera sighting timeline, spatial proximity clusters, and multi-cam cross-tracking.",
      href: "/cctv",
      icon: Camera,
      color: "text-amber-400",
      borderGlow: "hover:border-amber-500/50 hover:shadow-[0_0_20px_-3px_rgba(245,158,11,0.2)]"
    },
    {
      title: "4. Crime Syndicates",
      badge: "GRAPH PARTITION",
      desc: "Louvain community clustering, underworld hierarchy, and disconnected syndicate rings.",
      href: "/crime-rings",
      icon: Layers,
      color: "text-purple-400",
      borderGlow: "hover:border-purple-500/50 hover:shadow-[0_0_20px_-3px_rgba(168,85,247,0.2)]"
    },
    {
      title: "5. Financial Intelligence",
      badge: "UPI & HAWALA",
      desc: "UPI money trails, mule network flow graphs, merchant flags, and volume spikes.",
      href: "/financial",
      icon: Banknote,
      color: "text-emerald-400",
      borderGlow: "hover:border-emerald-500/50 hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.2)]"
    },
    {
      title: "6. Nocturnal Anomalies",
      badge: "00:00 - 06:00 IST",
      desc: "Off-hours burner phone spikes, late-night cell tower bursts, and anomalous traffic.",
      href: "/nocturnal",
      icon: Moon,
      color: "text-cyan-400",
      borderGlow: "hover:border-cyan-500/50 hover:shadow-[0_0_20px_-3px_rgba(6,182,212,0.2)]"
    },
    {
      title: "7. Field Surveillance",
      badge: "GROUND INTEL",
      desc: "Officer field reconnaissance logs, geo-tagged spot checks, and live density heatmaps.",
      href: "/surveillance",
      icon: Eye,
      color: "text-indigo-400",
      borderGlow: "hover:border-indigo-500/50 hover:shadow-[0_0_20px_-3px_rgba(99,102,241,0.2)]"
    },
    {
      title: "8. Master Criminal History",
      badge: "STATUTORY RECORD",
      desc: "Authentic MCOCA, NDPS, PMLA, Arms Act statutes, MOB records, and Modus Operandi.",
      href: "/criminal-history",
      icon: BookOpen,
      color: "text-amber-400",
      borderGlow: "hover:border-amber-500/50 hover:shadow-[0_0_20px_-3px_rgba(245,158,11,0.2)]"
    },
    {
      title: "9. 360° Suspect Dossiers",
      badge: "INTEL SYNTHESIS",
      desc: "Full suspect profile aggregation, CDR timeline, financial history, and print-ready export.",
      href: "/dossiers",
      icon: FileText,
      color: "text-pink-400",
      borderGlow: "hover:border-pink-500/50 hover:shadow-[0_0_20px_-3px_rgba(236,72,153,0.2)]"
    },
    {
      title: "10. Live Alerts & Telemetry",
      badge: "EARLY WARNING",
      desc: "Automated trigger engine flagging simultaneous burner calls, border hops, and high-value transfers.",
      href: "/alerts",
      icon: Bell,
      color: "text-rose-400",
      borderGlow: "hover:border-rose-500/50 hover:shadow-[0_0_20px_-3px_rgba(244,63,94,0.2)]"
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Tactical Live Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0c213f]/80 border border-[#1a3b6d] text-xs font-mono text-slate-300 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-100">INTERPOL TACTICAL RADAR ACTIVE</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-300">FEED: ALL 14 ENGINES ONLINE</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 text-red-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{criticalCount} CRITICAL</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <Activity className="w-3.5 h-3.5" />
            <span>{highCount} HIGH RISK</span>
          </div>
          <div className="flex items-center gap-1.5 text-sky-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI HEURISTICS: ACTIVE</span>
          </div>
        </div>
      </div>

      <Header
        title="Tactical Intelligence Command Center"
        subtitle="Unified suspect risk scoring, CDR pairwise graph analysis, optical CCTV tracking, and financial intelligence."
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <KPICard label="Suspects Profiled" value={totalSuspects} accent="blue" icon={Flame} subtext="Active surveillance mesh" />
        <KPICard label="Active Crime Rings" value={rings?.total_rings ?? "—"} accent="purple" icon={Layers} subtext="Syndicate clusters detected" />
        <KPICard label="Critical Risk Tiers" value={criticalCount} accent="red" icon={ShieldAlert} subtext="Requires immediate warrant" />
        <KPICard label="CCTV Encounters" value={cctv?.total_encounters ?? "—"} accent="amber" icon={Camera} subtext={`${cctv?.avg_confidence_pct ?? 0}% avg match confidence`} />
        <KPICard label="Night Hotspots" value={nocturnal?.hotspots_count ?? "—"} accent="cyan" icon={Moon} subtext={`${nocturnal?.total_anomalies ?? 0} nocturnal anomalies`} />
      </div>

      {/* Priority Top Suspect Alert Card */}
      {topSuspect && (
        <div className="p-5 rounded-xl border border-red-500/40 bg-gradient-to-r from-red-950/60 via-[#0c213f] to-[#0c213f] backdrop-blur-md shadow-[0_0_25px_-5px_rgba(227,27,35,0.25)] transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-600/20 text-red-400 border border-red-500/40 tracking-wider animate-pulse">
                  CRITICAL THREAT PRIORITY · RED NOTICE
                </span>
                <span className="text-xs font-mono text-slate-300">SYNDICATE LEAD: RING-01</span>
                <span className="text-xs font-mono text-slate-500">·</span>
                <span className="text-xs font-mono text-slate-300">MOB #MB-101</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-red-400" />
                  {topSuspect.suspect_name}
                </h2>
                <p className="text-xs font-mono text-slate-300 mt-1">
                  MSISDN: <span className="text-slate-100 font-bold">{topSuspect.phone_number || "N/A"}</span> · Composite Threat Score:{" "}
                  <span className="text-red-400 font-bold">{(topSuspect.total_threat_score ?? 0).toFixed(1)}/100</span> (Rank #1)
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/cdr?suspectA=${encodeURIComponent(topSuspect.phone_number)}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#102a52] hover:bg-[#16386d] text-slate-200 text-xs font-mono font-semibold rounded-lg border border-[#1a3b6d] transition-colors"
              >
                <Network className="w-3.5 h-3.5 text-sky-400" />
                Inspect CDR Mesh
              </Link>
              <Link
                href={`/dossiers?suspect=${encodeURIComponent(topSuspect.suspect_name)}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-mono font-semibold text-xs rounded-lg shadow-lg shadow-red-950/50 transition-all hover:scale-[1.02]"
              >
                <FileText className="w-4 h-4" />
                Open 360° Suspect Dossier
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 10 Tactical Intelligence Bento Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-sky-400" />
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest">
              Tactical Intelligence Framework (10 Specialized Engines)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Live backend data · no demo fallback
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link key={m.href} href={m.href} className="group flex">
                <div
                  className={`w-full p-4 rounded-xl border border-[#1a3b6d] bg-[#0c213f]/80 backdrop-blur-md flex flex-col justify-between transition-all duration-200 hover:border-sky-400/50 hover:bg-[#102a52] ${m.borderGlow}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-[#061224] border border-[#1a3b6d]/60">
                        <Icon className={`w-5 h-5 ${m.color}`} />
                      </div>
                      <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-[#061224] text-slate-300 border border-[#1a3b6d]">
                        {m.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#1a3b6d]/60 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-slate-200">
                    <span className="text-[11px]">ACCESS ENGINE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

