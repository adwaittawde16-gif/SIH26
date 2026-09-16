"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { KPICard } from "@/components/shared/KPICard";
import { LoadingSpinner, ErrorState } from "@/components/ui/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { AlertsResponse } from "@/types";
import {
  Bell,
  AlertTriangle,
  Flame,
  ShieldAlert,
  Radio,
  Clock,
  CheckCircle2,
  Volume2,
  VolumeX,
  Search,
  ArrowRight
} from "lucide-react";

export default function AlertsPage() {
  const [alertsData, setAlertsData] = useState<AlertsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [acknowledgedIds, setAcknowledgedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function loadAlerts() {
      try {
        setLoading(true);
        const data = await api.getAlerts();
        setAlertsData(data);
      } catch (err: any) {
        setError(err.message || "Failed to load tactical alerts telemetry");
      } finally {
        setLoading(false);
      }
    }
    loadAlerts();
  }, []);

  const toggleAcknowledge = (index: number) => {
    setAcknowledgedIds((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  if (loading) return <LoadingSpinner label="Establishing secure stream with early warning telemetry..." />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const allAlerts = alertsData?.alerts || [];
  
  const filteredAlerts = allAlerts.filter((alert) => {
    const matchesSeverity =
      severityFilter === "ALL" || alert.severity.toUpperCase() === severityFilter;
    const matchesSearch =
      searchQuery === "" ||
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const criticalCount = allAlerts.filter((a) => a.severity.toUpperCase() === "CRITICAL").length;
  const highCount = allAlerts.filter((a) => a.severity.toUpperCase() === "HIGH").length;
  const moderateCount = allAlerts.filter((a) => a.severity.toUpperCase() === "MODERATE" || a.severity.toUpperCase() === "MEDIUM").length;

  return (
    <div className="space-y-6 pb-12 font-sans">
      <Header
        title="10. Early Warning Telemetry & Tactical Alerts"
        subtitle="Real-time autonomous threat trigger engine monitoring burner activations, border crossings, and high-velocity money laundering."
      />

      {/* KPI Header Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total Active Alerts"
          value={allAlerts.length}
          subtext="Flagged by Automated Heuristics"
          icon={Bell}
          accent="blue"
        />
        <KPICard
          label="Critical Red Notices"
          value={criticalCount}
          subtext="Immediate Intervention Required"
          icon={Flame}
          accent="red"
        />
        <KPICard
          label="High Threat Warnings"
          value={highCount}
          subtext="Under Active Interception"
          icon={AlertTriangle}
          accent="amber"
        />
        <KPICard
          label="Monitored Triggers"
          value={moderateCount}
          subtext="Continuous Surveillance Grid"
          icon={Radio}
          accent="cyan"
        />
      </div>

      {/* Control Bar: Filters & Live Audio Mode */}
      <div className="p-4 rounded-xl bg-[#0c213f] border border-[#1a3b6d] flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter title or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#061224] border border-[#1a3b6d] rounded-lg text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#061224] p-1 rounded-lg border border-[#1a3b6d]">
            {["ALL", "CRITICAL", "HIGH", "MODERATE"].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  severityFilter === sev
                    ? sev === "CRITICAL"
                      ? "bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                      : sev === "HIGH"
                      ? "bg-amber-600 text-white shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                      : sev === "MODERATE"
                      ? "bg-sky-600 text-white shadow-[0_0_10px_rgba(2,132,199,0.5)]"
                      : "bg-slate-700 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="border-[#1a3b6d] bg-[#061224] text-slate-200 hover:bg-[#102a52] text-xs font-mono"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                Audio Siren: Active
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                Audio Siren: Muted
              </>
            )}
          </Button>

          <Button
            size="sm"
            onClick={() => setAcknowledgedIds(new Set(allAlerts.map((_, i) => i)))}
            className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono"
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            Acknowledge All
          </Button>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-[#0c213f] border border-[#1a3b6d] rounded-xl">
            <ShieldAlert className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 font-mono text-sm font-bold">No active alerts matching filter</p>
            <p className="text-slate-400 text-xs mt-1">All early warning telemetry criteria are currently within standard baseline parameters.</p>
          </div>
        ) : (
          filteredAlerts.map((alert, idx) => {
            const isAck = acknowledgedIds.has(idx);
            const isCritical = alert.severity.toUpperCase() === "CRITICAL";
            const isHigh = alert.severity.toUpperCase() === "HIGH";

            const badgeVariant = isCritical ? "critical" : isHigh ? "high" : "moderate";

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  isAck
                    ? "bg-[#061224]/70 border-[#1a3b6d]/60 opacity-60"
                    : isCritical
                    ? "bg-[#150a12] border-red-500/50 shadow-[0_0_15px_-3px_rgba(239,68,68,0.2)]"
                    : isHigh
                    ? "bg-[#151208] border-amber-500/50 shadow-[0_0_15px_-3px_rgba(245,158,11,0.15)]"
                    : "bg-[#0c213f] border-[#1a3b6d]"
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${
                        isCritical
                          ? "bg-red-950/80 border border-red-500/40 text-red-400 animate-pulse"
                          : isHigh
                          ? "bg-amber-950/80 border border-amber-500/40 text-amber-400"
                          : "bg-sky-950/80 border border-sky-500/40 text-sky-400"
                      }`}
                    >
                      {isCritical ? (
                        <Flame className="w-5 h-5" />
                      ) : isHigh ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : (
                        <Bell className="w-5 h-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge
                          variant={badgeVariant}
                          className="font-mono font-extrabold text-[10px] tracking-wider uppercase"
                        >
                          {alert.severity} NOTICE
                        </Badge>
                        <span className="font-bold text-white text-sm font-sans truncate">
                          {alert.title}
                        </span>
                        {isAck && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> ACKNOWLEDGED
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {alert.message}
                      </p>

                      <div className="flex items-center gap-4 mt-2 text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {alert.timestamp || "Live Stream Telemetry"}
                        </span>
                        <span>•</span>
                        <span>ID: {alert.id || `ALERT-${idx + 1}`}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0">
                    <button
                      onClick={() => toggleAcknowledge(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        isAck
                          ? "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                          : "bg-[#102a52] text-sky-300 border-sky-500/40 hover:bg-sky-600 hover:text-white"
                      }`}
                    >
                      {isAck ? "Mark Unread" : "Acknowledge"}
                    </button>

                    <Link
                      href={`/dossiers`}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-500 text-white text-xs font-mono font-bold transition-all shadow-[0_0_10px_rgba(227,27,35,0.4)]"
                    >
                      <span>Investigate</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
