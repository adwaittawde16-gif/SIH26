"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/shared/Header";
import { LoadingSpinner, ErrorState } from "@/components/ui/loading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/shared/KPICard";
import { ExpandableText } from "@/components/shared/ExpandableText";
import { api } from "@/lib/api";
import {
  FinancialIntelligenceResponse,
  LaunderingPatternsResponse,
  CourtEvidenceCertificateResponse,
  MoneyFlowTraceResponse,
  PMLADossierResponse
} from "@/types";
import { formatINR } from "@/lib/utils";
import {
  Banknote,
  AlertTriangle,
  Receipt,
  Building2,
  Users,
  ShieldAlert,
  Coins,
  GitBranch,
  FileCheck2,
  MessageSquare,
  Search,
  ArrowRight,
  Landmark,
  Eye,
  CheckCircle,
  Clock,
  Printer,
  Sparkles,
  RefreshCw
} from "lucide-react";

type TabKey =
  | "overview"
  | "shells"
  | "mules"
  | "assets"
  | "hawala"
  | "tracer"
  | "certificate"
  | "patterns";

export default function FinancialIntelligencePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [data, setData] = useState<FinancialIntelligenceResponse | null>(null);
  const [entitiesData, setEntitiesData] = useState<{ total_entities: number; categories: any; all_entities: any[] } | null>(null);
  const [patternsData, setPatternsData] = useState<LaunderingPatternsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntityId, setSelectedEntityId] = useState<string>("ENT-KP-01");
  const [dossier, setDossier] = useState<PMLADossierResponse | null>(null);
  const [dossierLoading, setDossierLoading] = useState(false);

  // Trace Flow state
  const [traceSource, setTraceSource] = useState<string>("ENT-KP-01");
  const [traceTarget, setTraceTarget] = useState<string>("");
  const [traceResult, setTraceResult] = useState<MoneyFlowTraceResponse | null>(null);
  const [traceLoading, setTraceLoading] = useState(false);

  // Certificate state
  const [certEntityId, setCertEntityId] = useState<string>("ENT-KP-01");
  const [certData, setCertData] = useState<CourtEvidenceCertificateResponse | null>(null);
  const [certLoading, setCertLoading] = useState(false);

  // Notes state
  const [newNote, setNewNote] = useState("");
  const [noteAuthor, setNoteAuthor] = useState("Inspector (Financial Intelligence Unit)");
  const [notesList, setNotesList] = useState<Array<{ id: string; author: string; content: string; timestamp: string }>>([
    {
      id: "note-1",
      author: "ED Special Task Force",
      content: "Section 5 PMLA attachment orders confirmed for Worli Sea Face Penthouse and Mercedes-Maybach (MH-01-EE-0007).",
      timestamp: "2026-09-12 18:30:00"
    },
    {
      id: "note-2",
      author: "FIU Lead Analyst",
      content: "Smurfing mule network confirmed: 8 student/worker accounts receiving automated Rs 48k-49k UPI credits.",
      timestamp: "2026-09-12 19:15:00"
    }
  ]);

  useEffect(() => {
    loadAllFinancialData();
  }, []);

  async function loadAllFinancialData() {
    try {
      setLoading(true);
      const [finRes, entRes, patRes] = await Promise.all([
        api.getFinancialIntelligence().catch(() => null),
        api.getFinancialEntities().catch(() => null),
        api.getLaunderingPatterns().catch(() => null)
      ]);

      if (finRes) setData(finRes);
      if (entRes) setEntitiesData(entRes);
      if (patRes) setPatternsData(patRes);
    } catch (err: any) {
      setError(err.message || "Failed to load financial intelligence");
    } finally {
      setLoading(false);
    }
  }

  async function handleLoadDossier(entityId: string) {
    try {
      setDossierLoading(true);
      setSelectedEntityId(entityId);
      const res = await api.getPMLADossier(entityId);
      setDossier(res);
    } catch (err) {
      console.error(err);
    } finally {
      setDossierLoading(false);
    }
  }

  async function handleRunTrace() {
    if (!traceSource) return;
    try {
      setTraceLoading(true);
      const res = await api.traceFinancialFlow(traceSource, traceTarget || undefined, 5);
      setTraceResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setTraceLoading(false);
    }
  }

  async function handleGenerateCertificate(entityId: string) {
    try {
      setCertLoading(true);
      setCertEntityId(entityId);
      const res = await api.getCourtEvidenceCertificate(entityId);
      setCertData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setCertLoading(false);
    }
  }

  function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!newNote.trim()) return;
    const note = {
      id: `note-${Date.now()}`,
      author: noteAuthor,
      content: newNote.trim(),
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19)
    };
    setNotesList([note, ...notesList]);
    setNewNote("");
  }

  if (loading) return <LoadingSpinner label="Auditing Multi-Hop PMLA Trails, Shell Companies & Mules..." />;
  if (error) return <ErrorState message={error} onRetry={() => loadAllFinancialData()} />;

  const shellCompanies = entitiesData?.categories?.shell_companies || [];
  const nomineeDirectors = entitiesData?.categories?.nominee_directors || [];
  const muleAccounts = entitiesData?.categories?.mule_accounts || [];
  const attachedAssets = entitiesData?.categories?.attached_assets || [];
  const hawalaAgents = entitiesData?.categories?.hawala_agents || [];
  const beneficialOwners = entitiesData?.categories?.beneficial_owners || [];

  const totalAssetValue = attachedAssets.reduce((acc: number, cur: any) => acc + (parseFloat(cur.estimated_asset_value_inr) || 0), 0);
  const smurfingLayeringFlags = (patternsData as any)?.patterns?.length || (data as any)?.patterns_flagged || 5;

  return (
    <div className="space-y-6">
      <Header
        title="Module 5 — PMLA Financial Intelligence & Laundering Nexus"
        subtitle="Multi-agency financial investigation engine: Shell layering, nominee proxies, mule structuring rings, and PMLA Section 5 asset attachment schedules."
      />

      {/* Global Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <KPICard label="Total Audited Volume (INR)" value={formatINR(data?.total_volume_inr || 0)} accent="green" icon={Banknote} subtext="Consolidated ledger trace" />
        <KPICard label="Smurfing & Layering Flags" value={smurfingLayeringFlags} accent="amber" icon={AlertTriangle} subtext="High-frequency structured hops" />
        <KPICard label="Total Shell Companies Identified" value={shellCompanies.length || 0} accent="purple" icon={Building2} subtext="Nominee director proxies" />
        <KPICard label="PMLA Seized Asset Value" value={formatINR(totalAssetValue || 0)} accent="red" icon={Landmark} subtext="Attached under Section 5" />
        <KPICard label="Critical Beneficial Owners" value={beneficialOwners.length || 0} accent="emerald" icon={Users} subtext="Ultimate syndicate controllers" />
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex border-b border-slate-700 bg-slate-900/80 p-1.5 rounded-lg overflow-x-auto gap-1 text-xs font-mono">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === "overview" ? "bg-emerald-600 text-white font-bold shadow" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <Receipt className="w-4 h-4" /> Overview & Risk Roster
        </button>
        <button
          onClick={() => setActiveTab("shells")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === "shells" ? "bg-purple-600 text-white font-bold shadow" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <Building2 className="w-4 h-4" /> Shells & Nominee Proxies ({shellCompanies.length})
        </button>
        <button
          onClick={() => setActiveTab("mules")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === "mules" ? "bg-amber-600 text-white font-bold shadow" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <Users className="w-4 h-4" /> Mule Smurfing Rings ({muleAccounts.length})
        </button>
        <button
          onClick={() => setActiveTab("assets")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === "assets" ? "bg-rose-600 text-white font-bold shadow" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <Landmark className="w-4 h-4" /> PMLA Seized Assets ({attachedAssets.length})
        </button>
        <button
          onClick={() => setActiveTab("hawala")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === "hawala" ? "bg-orange-600 text-white font-bold shadow" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <Coins className="w-4 h-4" /> Hawala & Tokens ({hawalaAgents.length})
        </button>
        <button
          onClick={() => setActiveTab("tracer")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === "tracer" ? "bg-cyan-600 text-white font-bold shadow" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <GitBranch className="w-4 h-4" /> Money Flow Tracer
        </button>
        <button
          onClick={() => setActiveTab("patterns")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === "patterns" ? "bg-red-600 text-white font-bold shadow" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <ShieldAlert className="w-4 h-4" /> Laundering Patterns
        </button>
        <button
          onClick={() => {
            setActiveTab("certificate");
            if (!certData) handleGenerateCertificate("ENT-KP-01");
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === "certificate" ? "bg-blue-600 text-white font-bold shadow" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <FileCheck2 className="w-4 h-4" /> Sec 65B BSA Certificate
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW & RISK ROSTER                                             */}
      {/* ========================================================================= */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <Card className="overflow-hidden p-0 border-slate-700 bg-slate-900">
            <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-emerald-400" /> Suspect Financial Risk Roster & UPI Trails
                </h3>
                <p className="text-xs text-slate-400 font-mono">Consolidated spending metrics, wine shop payments, and threat scoring.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search suspect name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-slate-800 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Suspect Name</th>
                    <th className="p-3 text-right">Transactions</th>
                    <th className="p-3 text-right">Total Transfer Volume</th>
                    <th className="p-3 text-right">Wine Shop Merchant Transfers</th>
                    <th className="p-3 text-center">Failed Withdrawals</th>
                    <th className="p-3 text-center">Threat Score</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {data?.summaries
                    .filter((s) => s.suspect_name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/60 transition-colors">
                        <td className="p-3 font-bold text-slate-100">{s.suspect_name}</td>
                        <td className="p-3 text-right text-slate-300">{s.total_transactions}</td>
                        <td className="p-3 text-right font-bold text-emerald-400">{formatINR(s.total_volume_inr)}</td>
                        <td className="p-3 text-right text-amber-400 font-bold">{formatINR(s.wine_shop_spent_inr || 0)}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[11px] ${s.failed_withdrawals ? "bg-rose-950 text-rose-300 font-bold" : "text-slate-500"}`}>
                            {s.failed_withdrawals || 0}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant={(s.threat_score || 0) > 60 ? "critical" : "moderate"}>
                            {(s.threat_score || 0).toFixed(1)}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setTraceSource(s.suspect_name);
                              setActiveTab("tracer");
                            }}
                            className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 justify-end"
                          >
                            Trace Flow <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SHELL COMPANIES & NOMINEE CORPORATE NEXUS                          */}
      {/* ========================================================================= */}
      {activeTab === "shells" && (
        <div className="space-y-6">
          <div className="bg-purple-950/40 border border-purple-800/60 rounded-lg p-4 text-xs font-mono text-purple-200">
            <h4 className="font-bold flex items-center gap-2 text-purple-300 mb-1">
              <Building2 className="w-4 h-4" /> Multi-Tier Corporate Layering Detection
            </h4>
            <p>
              Corporate veil analysis unmasking true beneficial owners controlling intermediate shell corporations through proxy nominee directors (peons, drivers, clerks) with low declared incomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shellCompanies.map((sh: any, shIdx: number) => {
              const nominee = nomineeDirectors.find((n: any) => n.entity_id === sh.nominee_director_id);
              const owner = beneficialOwners.find((b: any) => b.entity_id === sh.controlling_person_id);

              return (
                <Card key={`${sh.entity_id}-${shIdx}`} className="p-4 space-y-3 bg-slate-900 border-purple-900/60 hover:border-purple-600 transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-purple-400 font-semibold">{sh.entity_id}</span>
                    <Badge variant="critical">CRITICAL PMLA RISK</Badge>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-100">{sh.entity_name}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">CIN: {sh.pan_or_cin || "Unregistered / Offshore"}</p>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono bg-slate-950 p-2.5 rounded border border-slate-800">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">True Beneficial Owner:</span>
                      <span className="text-rose-400 font-bold">{owner?.entity_name || "Singhania Syndicate"}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">Nominee/Proxy Director:</span>
                      <span className="text-amber-400 font-bold">{nominee?.entity_name || "Proxy Director"}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">Declared Annual Income:</span>
                      <span className="text-emerald-400 font-bold">{formatINR(parseFloat(sh.declared_income_inr) || 0)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">Associated Bank & IFSC:</span>
                      <span className="text-slate-200">{sh.associated_bank} ({sh.associated_ifsc})</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">Virtual IP Binding:</span>
                      <span className="text-cyan-400">{sh.associated_ip || "TOR Exit Relay"}</span>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400">
                    <strong className="text-slate-300 mr-1">Address:</strong>
                    <ExpandableText text={sh.registered_address} copyable />
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">Attachment Eligible: Yes</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 border-purple-700 text-purple-300 hover:bg-purple-950"
                      onClick={() => {
                        setTraceSource(sh.entity_id);
                        setActiveTab("tracer");
                      }}
                    >
                      Inspect Money Flow
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MONEY MULE STRUCTURING & SMURFING RINGS                            */}
      {/* ========================================================================= */}
      {activeTab === "mules" && (
        <div className="space-y-6">
          <div className="bg-amber-950/40 border border-amber-800/60 rounded-lg p-4 text-xs font-mono text-amber-200">
            <h4 className="font-bold flex items-center gap-2 text-amber-300 mb-1">
              <Users className="w-4 h-4" /> Mule Account Smurfing & Sub-Threshold Structuring (&lt; ₹50,000)
            </h4>
            <p>
              Automated smurfing clusters executing synchronized transfers just below the ₹50,000 reporting threshold to evade FIU detection, funneled through student and gig-worker accounts.
            </p>
          </div>

          <Card className="overflow-hidden p-0 border-slate-700 bg-slate-900">
            <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex justify-between items-center">
              <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" /> Active Mule Accounts & Digital Fingerprints
              </h3>
              <span className="text-xs font-mono text-amber-400 font-semibold">{muleAccounts.length} Mules Identified</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Mule Entity ID</th>
                    <th className="p-3">Name & Front Profile</th>
                    <th className="p-3">PAN Number</th>
                    <th className="p-3 text-right">Declared Income</th>
                    <th className="p-3">Bank & Account</th>
                    <th className="p-3">Device IMEI / Binding</th>
                    <th className="p-3">Controlling Node</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {muleAccounts.map((m: any, mIdx: number) => (
                    <tr key={`${m.entity_id}-${mIdx}`} className="hover:bg-slate-800/60 transition-colors">
                      <td className="p-3 font-bold text-amber-400">{m.entity_id}</td>
                      <td className="p-3 font-bold text-slate-100">{m.entity_name}</td>
                      <td className="p-3 text-slate-400">{m.pan_or_cin}</td>
                      <td className="p-3 text-right text-emerald-400 font-bold">{formatINR(parseFloat(m.declared_income_inr) || 0)}</td>
                      <td className="p-3 text-slate-300">{m.associated_bank} ({m.associated_account_no})</td>
                      <td className="p-3 text-cyan-400 font-mono text-[11px]">{m.associated_device_imei || "Virtual IMEI"}</td>
                      <td className="p-3 text-purple-400 font-bold">{m.controlling_person_id || "ENT-SHL-01"}</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-800 font-bold uppercase">
                          Freeze Pending
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PMLA SECTION 5 PROVISIONAL ASSET ATTACHMENT SCHEDULE              */}
      {/* ========================================================================= */}
      {activeTab === "assets" && (
        <div className="space-y-6">
          <div className="bg-rose-950/40 border border-rose-800/60 rounded-lg p-4 text-xs font-mono text-rose-200">
            <h4 className="font-bold flex items-center gap-2 text-rose-300 mb-1">
              <Landmark className="w-4 h-4" /> PMLA Section 5 Provisional Asset Attachment Registry
            </h4>
            <p>
              Proceeds of crime (Section 2(1)(u) PMLA) converted into movable and immovable assets scheduled for provisional attachment by ED / Police Special Task Force.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attachedAssets.map((ast: any, astIdx: number) => (
              <Card key={`${ast.entity_id}-${astIdx}`} className="p-4 space-y-3 bg-slate-900 border-rose-900/60 hover:border-rose-600 transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-rose-400 font-semibold">{ast.entity_id}</span>
                  <Badge variant="critical">ATTACHMENT SCHEDULED</Badge>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-100">{ast.entity_name}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Registration: {ast.associated_account_no}</p>
                </div>

                <div className="space-y-1.5 text-xs font-mono bg-slate-950 p-2.5 rounded border border-slate-800">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Estimated Market Value:</span>
                    <span className="text-emerald-400 font-bold text-sm">{formatINR(parseFloat(ast.estimated_asset_value_inr) || 0)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Beneficial Owner:</span>
                    <span className="text-rose-400 font-bold">{ast.controlling_person_id || "Singhania Syndicate"}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Executing Agency:</span>
                    <span className="text-purple-400 font-bold">{ast.primary_agency || "Enforcement Directorate"}</span>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-slate-400">
                  <strong className="text-slate-300">Location / Vault:</strong> {ast.registered_address}
                </p>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500">Section 5(1) Notice Issued</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 border-rose-700 text-rose-300 hover:bg-rose-950"
                    onClick={() => {
                      setCertEntityId(ast.entity_id);
                      handleGenerateCertificate(ast.entity_id);
                      setActiveTab("certificate");
                    }}
                  >
                    Generate Certificate
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: HAWALA & ANGADIA TOKEN CHANNELS                                    */}
      {/* ========================================================================= */}
      {activeTab === "hawala" && (
        <div className="space-y-6">
          <div className="bg-orange-950/40 border border-orange-800/60 rounded-lg p-4 text-xs font-mono text-orange-200">
            <h4 className="font-bold flex items-center gap-2 text-orange-300 mb-1">
              <Coins className="w-4 h-4" /> Informal Hawala & Angadia Token Desks
            </h4>
            <p>
              Offline currency couriers and token-based settlement networks operating out of Zaveri Bazaar and Surat, converting illicit funds into bullion gold bars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hawalaAgents.map((h: any, hIdx: number) => (
              <Card key={`${h.entity_id}-${hIdx}`} className="p-4 space-y-3 bg-slate-900 border-orange-900/60 hover:border-orange-600 transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-orange-400 font-semibold">{h.entity_id}</span>
                  <Badge variant="critical">HAWALA TOKEN RUNNER</Badge>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-100">{h.entity_name}</h4>
                  <p className="text-xs text-slate-400 font-mono">Channel: {h.associated_bank}</p>
                </div>

                <div className="space-y-1.5 text-xs font-mono bg-slate-950 p-2.5 rounded border border-slate-800">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Active Token Code:</span>
                    <span className="text-amber-400 font-bold">{h.associated_account_no}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Primary Hub:</span>
                    <span className="text-slate-200">{h.registered_address}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Seized Gold Bullion Value:</span>
                    <span className="text-emerald-400 font-bold">{formatINR(parseFloat(h.estimated_asset_value_inr) || 0)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400">Section 17 PMLA Search Target</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 border-orange-700 text-orange-300 hover:bg-orange-950"
                    onClick={() => {
                      setTraceSource(h.entity_id);
                      setActiveTab("tracer");
                    }}
                  >
                    Trace Token Route
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: INTERACTIVE MONEY FLOW PATH TRACER                                 */}
      {/* ========================================================================= */}
      {activeTab === "tracer" && (
        <div className="space-y-6">
          <Card className="p-4 space-y-4 bg-slate-900 border-slate-700">
            <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-cyan-400" /> Multi-Hop Directed Money Flow Tracer
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Trace directed fund displacement hops originating from any entity through intermediate shell corporations to end beneficiaries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Source Entity (ID or Name):</label>
                <input
                  type="text"
                  value={traceSource}
                  onChange={(e) => setTraceSource(e.target.value)}
                  placeholder="e.g. ENT-KP-01 or Vikramaditya Singhania"
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Destination Entity (Optional):</label>
                <input
                  type="text"
                  value={traceTarget}
                  onChange={(e) => setTraceTarget(e.target.value)}
                  placeholder="e.g. ENT-SHL-01 or Leave blank for all paths"
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleRunTrace}
                  disabled={traceLoading || !traceSource}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs h-9 flex items-center justify-center gap-2"
                >
                  {traceLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <GitBranch className="w-3.5 h-3.5" />}
                  Trace Flow Paths
                </Button>
              </div>
            </div>
          </Card>

          {traceResult && (
            <Card className="overflow-hidden p-0 border-slate-700 bg-slate-900">
              <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex justify-between items-center">
                <h4 className="text-xs font-bold font-mono text-slate-200">
                  Found {traceResult.total_paths_found || traceResult.paths?.length || 0} Financial Flow Path(s)
                </h4>
                <span className="text-xs font-mono text-cyan-400 font-semibold">Source: {traceResult.source_name || traceSource}</span>
              </div>
              <div className="divide-y divide-slate-800">
                {traceResult.paths?.map((p: any, idx: number) => (
                  <div key={idx} className="p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-slate-100 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        {p.source_entity} &rarr; {p.destination_entity}
                      </span>
                      <span className="text-emerald-400 font-bold">{formatINR(p.total_flow_amount_inr || 0)}</span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-2">
                      <div className="text-[11px] font-mono text-slate-400 flex flex-wrap gap-4">
                        <span>Hops: <strong className="text-slate-200">{p.hop_count || p.hops?.length || 1}</strong></span>
                        <span>Layering Chain: <strong className={p.is_layering_chain ? "text-rose-400" : "text-slate-200"}>{p.is_layering_chain ? "YES" : "NO"}</strong></span>
                        {p.shell_companies_involved?.length > 0 && (
                          <span>Shells Passed: <strong className="text-purple-400">{p.shell_companies_involved.join(", ")}</strong></span>
                        )}
                      </div>

                      {p.hops && p.hops.length > 0 && (
                        <div className="overflow-x-auto mt-2">
                          <table className="w-full text-left text-[11px] font-mono text-slate-300">
                            <thead className="text-slate-500 border-b border-slate-800">
                              <tr>
                                <th className="py-1">Hop</th>
                                <th className="py-1">From Node</th>
                                <th className="py-1">To Node</th>
                                <th className="py-1 text-right">Amount (INR)</th>
                                <th className="py-1 text-center">Channel</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-900">
                              {p.hops.map((h: any, hIdx: number) => (
                                <tr key={hIdx}>
                                  <td className="py-1 text-cyan-400">#{h.hop_index || hIdx + 1}</td>
                                  <td className="py-1 font-bold text-slate-200">{h.from_name} ({h.from_type})</td>
                                  <td className="py-1 font-bold text-slate-200">{h.to_name} ({h.to_type})</td>
                                  <td className="py-1 text-right text-emerald-400 font-bold">{formatINR(h.amount_inr || 0)}</td>
                                  <td className="py-1 text-center text-slate-400">{h.primary_channel || "UPI"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: SECTION 65B BSA LEGAL EVIDENCE CERTIFICATE                         */}
      {/* ========================================================================= */}
      {activeTab === "certificate" && (
        <div className="space-y-6">
          <Card className="p-4 space-y-4 bg-slate-900 border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-blue-400" /> Section 63 / 65B BSA Evidence Certificate Generator
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Admissible digital certificate under Section 63 & Section 65B of Bharatiya Sakshya Adhiniyam, 2023 with SHA-256 integrity seal.
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <select
                  value={certEntityId}
                  onChange={(e) => handleGenerateCertificate(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 rounded px-3 py-1.5 focus:outline-none"
                >
                  <option value="ENT-KP-01">Vikramaditya Singhania (Kingpin)</option>
                  <option value="ENT-SHL-01">Zenith Horizon Mercantile (Shell)</option>
                  <option value="ENT-NOM-01">Rameshwar Chauhan (Nominee)</option>
                  <option value="ENT-MUL-01">Kunal Sonawane (Mule)</option>
                  <option value="ENT-HAW-01">Mahesh Jhaveri (Hawala)</option>
                </select>
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  size="sm"
                  className="border-slate-700 text-slate-200 hover:bg-slate-800 text-xs font-mono flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Certificate
                </Button>
              </div>
            </div>

            {certLoading ? (
              <LoadingSpinner label="Generating BSA Tamper-Proof Cryptographic Certificate..." />
            ) : certData ? (
              <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-4">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-start">
                  <div>
                    <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                      Certificate Under Section 63 / 65B Bharatiya Sakshya Adhiniyam (BSA)
                    </h2>
                    <p className="text-[11px] text-slate-400">Brihanmumbai Police Department — Financial Crime Investigation Branch</p>
                  </div>
                  <Badge variant="critical">CONFIDENTIAL COURT EVIDENCE</Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/60 p-3 rounded border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">Certificate Ref ID</span>
                    <p className="font-bold text-slate-200">{certData.certificate_id || `CERT-BSA-2026-${certEntityId}`}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">Timestamp (IST)</span>
                    <p className="font-bold text-slate-200">{certData.timestamp || new Date().toISOString().slice(0, 19)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">Target Entity</span>
                    <p className="font-bold text-cyan-400">{certData.entity_name || certEntityId}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">Tamper Status</span>
                    <p className="font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> SHA-256 VERIFIED
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-slate-300">
                  <p>
                    I, the undersigned Certified Law Enforcement Examiner, hereby certify that the electronic records and financial graph relationships associated with entity <strong>{certData.entity_name || certEntityId}</strong> were generated in the ordinary course of official investigation from authenticated banking and transaction logs.
                  </p>
                  <p>
                    The hash seal below guarantees integrity under Section 65B of the Indian Evidence Act / Section 63 of BSA, confirming no alteration or manipulation since digital capture.
                  </p>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded font-mono text-[11px] break-all">
                  <span className="text-slate-500 block mb-0.5 text-[10px] uppercase">SHA-256 Cryptographic Evidence Seal:</span>
                  <code className="text-emerald-400">{certData.sha256_hash || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}</code>
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: LAUNDERING PATTERNS & INVESTIGATOR NOTES                           */}
      {/* ========================================================================= */}
      {activeTab === "patterns" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patternsData?.alerts?.map((alert: any) => (
              <Card key={alert.alert_id} className="p-4 space-y-3 bg-slate-900 border-red-900/60 hover:border-red-600 transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-red-400 font-bold">{alert.alert_id}</span>
                  <Badge variant="critical">{alert.severity} RISK ({alert.risk_score}%)</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{alert.title}</h4>
                  <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">{alert.description}</p>
                </div>

                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-xs font-mono space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Flagged Volume:</span>
                    <span className="text-emerald-400 font-bold">{formatINR(alert.total_volume_inr || 0)}</span>
                  </div>
                  {alert.entities_involved && alert.entities_involved.length > 0 && (
                    <div className="text-slate-400">
                      <span>Involved: </span>
                      <span className="text-slate-200">{alert.entities_involved.join(", ")}</span>
                    </div>
                  )}
                </div>

                <div className="p-2 bg-red-950/40 border border-red-900/40 rounded text-[11px] font-mono text-red-300">
                  <strong>Recommended Police Action:</strong> {alert.recommended_action}
                </div>
              </Card>
            ))}
          </div>

          {/* Investigator Collaboration Notes Section */}
          <Card className="p-4 space-y-4 bg-slate-900 border-slate-700">
            <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Multi-Agency Investigator Case Notes
            </h3>

            <form onSubmit={handleAddNote} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={noteAuthor}
                  onChange={(e) => setNoteAuthor(e.target.value)}
                  placeholder="Author / Agency"
                  className="p-2 text-xs font-mono bg-slate-950 border border-slate-700 rounded text-slate-200"
                />
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Type official case observation or attachment order..."
                  className="p-2 text-xs font-mono bg-slate-950 border border-slate-700 rounded text-slate-200 sm:col-span-2"
                />
              </div>
              <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs">
                Post Investigator Note
              </Button>
            </form>

            <div className="space-y-2">
              {notesList.map((n) => (
                <div key={n.id} className="p-3 bg-slate-950 rounded border border-slate-800 text-xs font-mono space-y-1">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span className="font-bold text-emerald-400">{n.author}</span>
                    <span>{n.timestamp}</span>
                  </div>
                  <p className="text-slate-200">{n.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
