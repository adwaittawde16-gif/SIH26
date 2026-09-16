"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { LoadingSpinner, ErrorState } from "@/components/ui/loading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { CriminalRecord, CriminalHistorySummaryResponse } from "@/types";
import { fallbackCriminalSummary, fallbackCriminalRecordsList } from "@/lib/mockData";
import { ExpandableText } from "@/components/shared/ExpandableText";
import {
  ShieldAlert,
  Search,
  SlidersHorizontal,
  FileText,
  User,
  AlertTriangle,
  Building,
  Gavel,
  History,
  TrendingUp,
  Award,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  ArrowUpDown
} from "lucide-react";

export default function CriminalHistoryPage() {
  const [summary, setSummary] = useState<CriminalHistorySummaryResponse | null>(null);
  const [records, setRecords] = useState<CriminalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [psFilter, setPsFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [minConvictions, setMinConvictions] = useState(0);
  const [sortBy, setSortBy] = useState<"convictions" | "name" | "year">("convictions");

  // Selected Record Modal
  const [selectedRecord, setSelectedRecord] = useState<CriminalRecord | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const sumRes = await api.getCriminalHistorySummary().catch(() => fallbackCriminalSummary);
        const recRes = await api.getCriminalRecords().catch(() => fallbackCriminalRecordsList);
        setSummary(sumRes || fallbackCriminalSummary);
        setRecords(recRes?.records?.length ? recRes.records : fallbackCriminalRecordsList.records);
      } catch (err: any) {
        console.warn("Criminal history load error, using resilient fallback:", err);
        setSummary(fallbackCriminalSummary);
        setRecords(fallbackCriminalRecordsList.records);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtered and Sorted Records
  const filteredRecords = useMemo(() => {
    return records
      .filter((r) => {
        if (search.trim()) {
          const q = search.toLowerCase();
          const matches =
            r.suspect_name.toLowerCase().includes(q) ||
            r.known_aliases.toLowerCase().includes(q) ||
            r.uidb_number.toLowerCase().includes(q) ||
            r.fir_number.toLowerCase().includes(q) ||
            r.previous_offence.toLowerCase().includes(q) ||
            r.previous_ps_name.toLowerCase().includes(q) ||
            (r.act_and_sections || "").toLowerCase().includes(q) ||
            (r.modus_operandi || "").toLowerCase().includes(q) ||
            (r.mob_number || "").toLowerCase().includes(q) ||
            (r.custody_location || "").toLowerCase().includes(q);
          if (!matches) return false;
        }

        if (statusFilter !== "ALL" && !r.case_status.toLowerCase().includes(statusFilter.toLowerCase())) {
          return false;
        }

        if (psFilter !== "ALL" && r.previous_ps_name.toLowerCase() !== psFilter.toLowerCase()) {
          return false;
        }

        if (categoryFilter !== "ALL" && (r.crime_category || "").toLowerCase() !== categoryFilter.toLowerCase()) {
          return false;
        }

        if (r.prior_convictions_count < minConvictions) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "convictions") return b.prior_convictions_count - a.prior_convictions_count;
        if (sortBy === "name") return a.suspect_name.localeCompare(b.suspect_name);
        if (sortBy === "year") return (b.case_year || "").localeCompare(a.case_year || "");
        return 0;
      });
  }, [records, search, statusFilter, psFilter, categoryFilter, minConvictions, sortBy]);

  const uniquePoliceStations = useMemo(() => {
    if (!summary) return [];
    return Object.keys(summary.police_station_breakdown || {}).sort();
  }, [summary]);

  if (loading) return <LoadingSpinner label="Querying Master Criminal History & Prior Convictions Database..." />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-6">
      <Header
        title="Module 10 — Master Criminal History & Prior Convictions Database"
        subtitle="Forensic register of prior offences, UIDB identity cross-matching, bail statuses, and repeat offender profiling."
      />

      {/* ── KPI Summary Cards Bar ── */}
      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
          <Card className="p-3 bg-white border-slate-300 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Total Ingested</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold text-slate-900">{summary.total_records}</span>
              <span className="text-[10px] text-slate-400">Records</span>
            </div>
          </Card>

          <Card className="p-3 bg-red-50 border-red-200 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] text-red-700 uppercase font-bold flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-600" /> Repeat Offenders
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold text-red-800">{summary.repeat_offenders_count}</span>
              <span className="text-[10px] text-red-600 font-bold">
                {Math.round((summary.repeat_offenders_count / summary.total_records) * 100)}%
              </span>
            </div>
          </Card>

          <Card className="p-3 bg-amber-50 border-amber-200 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] text-amber-700 uppercase font-bold flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-600" /> Under Trial
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold text-amber-800">{summary.under_trial_count}</span>
              <span className="text-[10px] text-amber-600">Active Cases</span>
            </div>
          </Card>

          <Card className="p-3 bg-purple-50 border-purple-200 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] text-purple-700 uppercase font-bold flex items-center gap-1">
              <Gavel className="w-3 h-3 text-purple-600" /> Bailed Out
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold text-purple-800">{summary.bailed_count}</span>
              <span className="text-[10px] text-purple-600">Monitored</span>
            </div>
          </Card>

          <Card className="p-3 bg-blue-50 border-blue-200 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] text-blue-700 uppercase font-bold flex items-center gap-1">
              <History className="w-3 h-3 text-blue-600" /> Disposed Cases
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold text-blue-800">{summary.disposed_count}</span>
              <span className="text-[10px] text-blue-600">Archived</span>
            </div>
          </Card>

          <Card className="p-3 bg-emerald-50 border-emerald-200 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] text-emerald-700 uppercase font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Clean Records
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold text-emerald-800">{summary.clean_records_count}</span>
              <span className="text-[10px] text-emerald-600">First-time</span>
            </div>
          </Card>
        </div>
      )}

      {/* ── Top Repeat Offenders & Prior Offences Breakdown ── */}
      {summary && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Top Repeat Offenders */}
          <Card className="p-4 bg-white border-slate-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" /> Top Repeat Offenders
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Ranked by Prior Convictions</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {summary.top_repeat_offenders.slice(0, 5).map((off, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedRecord(off)}
                  className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-400 cursor-pointer transition-all flex items-center justify-between text-xs font-mono"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">{off.suspect_name}</p>
                    <p className="text-[10px] text-slate-500">
                      Alias: <span className="text-slate-700">{off.known_aliases}</span> · PS: {off.previous_ps_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[11px]">
                      {off.prior_convictions_count} priors
                    </span>
                    <p className="text-[9px] text-red-600 font-bold mt-0.5">{off.case_status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Offence Distribution */}
          <Card className="p-4 bg-white border-slate-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Gavel className="w-4 h-4 text-slate-700" /> Prior Offence Breakdown
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Offence Types</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {Object.entries(summary.offence_breakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([offence, count], idx) => {
                  const pct = Math.round((count / summary.total_records) * 100);
                  return (
                    <div key={idx} className="space-y-1 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-800 font-semibold">{offence}</span>
                        <span className="text-slate-500 text-[10px]">{count} cases ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${Math.max(5, pct * 2)}%` }} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>

          {/* Police Station Breakdown */}
          <Card className="p-4 bg-white border-slate-300 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-slate-700" /> Police Station Jurisdiction
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Historical Origin</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {Object.entries(summary.police_station_breakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([ps, count], idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => setPsFilter(ps)}
                      className={`p-2 rounded border cursor-pointer transition-all flex items-center justify-between font-mono text-xs ${
                        psFilter === ps
                          ? "bg-blue-100 border-blue-400 text-blue-900 font-bold"
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <span className="truncate">{ps}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px] font-bold shrink-0 ml-2">
                        {count} records
                      </span>
                    </div>
                  );
                })}
            </div>
          </Card>
        </div>
      )}

      {/* ── Search & Filter Controls Bar ── */}
      <Card className="p-4 bg-white border-slate-300 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          {/* Search box */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by suspect name, alias, UIDB-XXXXXX, FIR, or offence..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800"
            />
          </div>

          {/* Case Status Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {["ALL", "Under Trial", "Bailed", "Disposed", "Clean Record"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg border transition-all text-xs font-bold ${
                  statusFilter.toLowerCase() === st.toLowerCase()
                    ? "bg-slate-900 text-white border-slate-900 shadow"
                    : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Second Row: Police Station dropdown, Min Convictions, Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 font-mono text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Crime Category Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px] uppercase font-bold">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none font-bold"
              >
                <option value="ALL">All Crime Categories</option>
                <option value="ORGANIZED_CRIME">Organized Crime & MCOCA</option>
                <option value="NARCOTICS_TRAFFICKING">Narcotics & NDPS</option>
                <option value="HAWALA_AND_MONEY_LAUNDERING">Hawala & PMLA</option>
                <option value="CYBER_FINANCIAL_FRAUD">Cyber Fraud & IT Act</option>
                <option value="CONTRACT_KILLING_AND_ASSAULT">Contract Killing & Arms Act</option>
                <option value="EXTORTION_AND_THREAT">Extortion & Threat</option>
                <option value="CLEAN">Clean Records</option>
              </select>
            </div>

            {/* Police Station Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px] uppercase font-bold">Police Station:</span>
              <select
                value={psFilter}
                onChange={(e) => setPsFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none"
              >
                <option value="ALL">All Police Stations</option>
                {uniquePoliceStations.map((ps) => (
                  <option key={ps} value={ps}>{ps}</option>
                ))}
              </select>
            </div>

            {/* Min Convictions Slider */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px] uppercase font-bold">Min Priors:</span>
              <input
                type="range"
                min="0"
                max="5"
                value={minConvictions}
                onChange={(e) => setMinConvictions(parseInt(e.target.value))}
                className="w-20 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-900 font-bold text-[10px]">
                {minConvictions}+
              </span>
            </div>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500 text-[11px] uppercase font-bold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none font-bold"
            >
              <option value="convictions">Prior Convictions (High to Low)</option>
              <option value="name">Suspect Name (A-Z)</option>
              <option value="year">Case Year (Recent)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* ── Records Table ── */}
      <Card className="bg-white border-slate-300 shadow-sm overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-slate-800 uppercase tracking-wider">
            Criminal History Registry ({filteredRecords.length} records matching)
          </span>
          <span className="text-slate-500 text-[11px]">Click any row for full judicial & MO profile</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">UIDB / MOB No.</th>
                <th className="py-3 px-4">Suspect Name & Underworld Aliases</th>
                <th className="py-3 px-4 text-center">Priors</th>
                <th className="py-3 px-4">Legal Offence & Statutes</th>
                <th className="py-3 px-4">Police Jurisdiction</th>
                <th className="py-3 px-4 text-center">Year</th>
                <th className="py-3 px-4 text-center">Judicial Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((r, idx) => {
                  const statusLow = r.case_status.toLowerCase();
                  let statusCls = "bg-slate-100 text-slate-800 border-slate-300";
                  if (statusLow.includes("trial") || statusLow.includes("custody")) {
                    statusCls = "bg-amber-100 text-amber-800 border-amber-300";
                  } else if (statusLow.includes("bail")) {
                    statusCls = "bg-purple-100 text-purple-800 border-purple-300";
                  } else if (statusLow.includes("disposed") || statusLow.includes("convicted")) {
                    statusCls = "bg-blue-100 text-blue-800 border-blue-300";
                  } else if (statusLow.includes("clean")) {
                    statusCls = "bg-emerald-100 text-emerald-800 border-emerald-300";
                  }

                  const categoryColors: Record<string, string> = {
                    ORGANIZED_CRIME: "bg-red-100 text-red-700 border-red-300",
                    NARCOTICS_TRAFFICKING: "bg-orange-100 text-orange-700 border-orange-300",
                    HAWALA_AND_MONEY_LAUNDERING: "bg-emerald-100 text-emerald-700 border-emerald-300",
                    CYBER_FINANCIAL_FRAUD: "bg-cyan-100 text-cyan-700 border-cyan-300",
                    CONTRACT_KILLING_AND_ASSAULT: "bg-rose-100 text-rose-700 border-rose-300",
                    EXTORTION_AND_THREAT: "bg-amber-100 text-amber-700 border-amber-300",
                    CLEAN: "bg-slate-100 text-slate-600 border-slate-300"
                  };
                  const catBadge = categoryColors[r.crime_category || "ORGANIZED_CRIME"] || "bg-slate-100 text-slate-700";

                  return (
                    <tr
                      key={r.uidb_number + idx}
                      onClick={() => setSelectedRecord(r)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-slate-800">
                        <div>{r.uidb_number}</div>
                        {r.mob_number && r.mob_number !== "N/A" && (
                          <div className="text-[9px] text-slate-400 font-normal">{r.mob_number}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{r.suspect_name}</div>
                        {r.known_aliases && r.known_aliases !== "N/A" && (
                          <div className="text-[10px] text-red-600 font-medium italic">a.k.a. {r.known_aliases}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded font-bold text-xs ${
                            r.prior_convictions_count > 2
                              ? "bg-red-600 text-white"
                              : r.prior_convictions_count > 0
                              ? "bg-amber-500 text-white"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {r.prior_convictions_count}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {r.crime_category && r.crime_category !== "CLEAN" && (
                            <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded border uppercase ${catBadge}`}>
                              {r.crime_category.replace(/_/g, " ")}
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-slate-800">
                          <ExpandableText text={r.previous_offence} />
                        </div>
                        {r.act_and_sections && r.act_and_sections !== "N/A" && (
                          <div className="text-[10px] text-indigo-700 font-bold mt-0.5">
                            <span className="mr-1">§</span>
                            <ExpandableText text={r.act_and_sections} />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        <div className="font-medium">{r.previous_ps_name}</div>
                        {r.fir_number && r.fir_number !== "N/A" && (
                          <div className="text-[10px] text-slate-400">FIR #{r.fir_number}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-slate-600">{r.case_year}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${statusCls}`}>
                          {r.case_status}
                        </span>
                        {r.custody_location && r.custody_location !== "N/A" && (
                          <div className="text-[9px] text-slate-500 mt-0.5">{r.custody_location}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/dossiers?suspect=${encodeURIComponent(r.suspect_name)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-bold text-[11px]"
                        >
                          Dossier <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 font-mono">
                    No criminal records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Record Detail Modal ── */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 font-mono max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-100 px-2 py-0.5 rounded">
                    {selectedRecord.uidb_number}
                  </span>
                  {selectedRecord.mob_number && selectedRecord.mob_number !== "N/A" && (
                    <span className="text-[10px] font-bold text-slate-700 uppercase bg-slate-100 px-2 py-0.5 rounded">
                      {selectedRecord.mob_number}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-1">{selectedRecord.suspect_name}</h2>
                {selectedRecord.known_aliases && selectedRecord.known_aliases !== "N/A" && (
                  <p className="text-xs text-red-600 font-semibold mt-0.5">
                    Underworld Aliases: {selectedRecord.known_aliases}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Prior Convictions</span>
                <p className="text-base font-bold text-slate-900">{selectedRecord.prior_convictions_count} Recorded Charges</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Judicial & Custody Status</span>
                <p className="text-sm font-bold text-slate-900">{selectedRecord.case_status}</p>
                {selectedRecord.custody_location && (
                  <p className="text-[10px] text-slate-500 font-medium">Location: {selectedRecord.custody_location}</p>
                )}
              </div>

              <div className="col-span-2 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Previous Offence</span>
                <p className="font-bold text-slate-900">{selectedRecord.previous_offence}</p>
                {selectedRecord.act_and_sections && selectedRecord.act_and_sections !== "N/A" && (
                  <p className="text-[11px] text-indigo-800 font-bold bg-indigo-50 p-1.5 rounded border border-indigo-200 mt-1">
                    Statutes Charged: {selectedRecord.act_and_sections}
                  </p>
                )}
              </div>

              {selectedRecord.modus_operandi && selectedRecord.modus_operandi !== "N/A" && (
                <div className="col-span-2 p-3 bg-amber-50 rounded-lg border border-amber-200 space-y-1">
                  <span className="text-[10px] text-amber-800 uppercase font-bold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Modus Operandi (MO Synopsis)
                  </span>
                  <p className="text-xs text-amber-950 font-sans leading-relaxed">{selectedRecord.modus_operandi}</p>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Police Station Jurisdiction</span>
                <p className="font-semibold text-slate-900">{selectedRecord.previous_ps_name}</p>
                <p className="text-[10px] text-slate-500">Case Incident Year: {selectedRecord.case_year}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Crime Syndicate Classification</span>
                <p className="font-bold text-slate-900 uppercase">
                  {(selectedRecord.crime_category || "ORGANIZED_CRIME").replace(/_/g, " ")}
                </p>
                <p className="text-[10px] text-slate-500">Linked FIR: #{selectedRecord.fir_number}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <Link href={`/threat`}>
                <Button variant="outline" size="sm" className="text-xs font-mono">
                  Threat Index
                </Button>
              </Link>
              <Link href={`/dossiers?suspect=${encodeURIComponent(selectedRecord.suspect_name)}`}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono">
                  Open Suspect Dossier <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
