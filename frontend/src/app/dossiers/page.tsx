"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { LoadingSpinner, ErrorState } from "@/components/ui/loading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { AlertsResponse, SuspectDossierDetails, SearchResultResponse, TimelineResponse, FIRNLPResponse } from "@/types";
import { Bell, Search, Clock, ChevronDown, ChevronUp, FileText, ExternalLink, Printer, ShieldCheck, Users } from "lucide-react";

function FIRParserTool() {
  const [firText, setFirText] = useState(
    "FIR #0254/2026 registered at Byculla Police Station. Accused Md. Ranbir Bhalla along with co-accused Md. Teerth Bhargava and Md. Vedant Padmanabhan were observed operating near Station Road Footpath and Venus Wine Shop under IPC Section 384 (Extortion) and Section 307 (Attempt to Murder). Phone +91-2236381844 was active."
  );
  const [firNumber, setFirNumber] = useState("FIR-0254/2026");
  const [result, setResult] = useState<FIRNLPResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleExtract(e: React.FormEvent) {
    e.preventDefault();
    if (!firText.trim()) return;
    try {
      setLoading(true);
      const res = await api.extractFIRNLP(firText.trim(), firNumber.trim());
      setResult(res);
    } catch (err: any) {
      alert("NLP Extraction Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="space-y-4 border-slate-300 bg-white">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-600" />
          NLP FIR Entity & Co-Accused Extractor
        </h3>
        <p className="text-[11px] font-mono text-slate-500">Paste FIR narrative text to automatically extract suspects, co-accused, locations, M.O. crime categories & IPC sections</p>
      </div>

      <form onSubmit={handleExtract} className="space-y-3 font-mono text-xs">
        <div className="flex gap-2">
          <input
            type="text"
            value={firNumber}
            onChange={(e) => setFirNumber(e.target.value)}
            placeholder="FIR Number e.g. FIR-0254/2026"
            className="w-1/3 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-mono shadow-sm"
          />
          <Button type="submit" disabled={loading} size="sm">
            {loading ? "Parsing NLP..." : "Extract Entities & Co-Accused"}
          </Button>
        </div>
        <textarea
          rows={3}
          value={firText}
          onChange={(e) => setFirText(e.target.value)}
          placeholder="Paste raw FIR narrative or witness statement text here..."
          className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-mono shadow-sm"
        />
      </form>

      {result && (
        <div className="space-y-3 pt-3 border-t border-slate-200 font-mono text-xs">
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded font-bold">
              Primary Suspects ({result.suspects.length}): {result.suspects.join(", ") || "None"}
            </span>
            <span className="px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded font-bold">
              Co-Accused ({result.co_accused.length}): {result.co_accused.join(", ") || "None"}
            </span>
            <span className="px-2 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-bold">
              Locations ({result.locations.length}): {result.locations.join(", ") || "None"}
            </span>
            <span className="px-2 py-1 bg-red-50 text-red-800 border border-red-200 rounded font-bold">
              M.O. Crimes ({result.crime_types.length}): {result.crime_types.join(", ") || "None"}
            </span>
          </div>

          {/* Extracted Entities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {result.entities.map((e, idx) => (
              <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-200 space-y-0.5 text-[11px]">
                <span className="text-[9px] font-bold text-slate-500 uppercase">{e.category}</span>
                <p className="font-bold text-slate-900 truncate">{e.text}</p>
                <span className="text-[9px] text-emerald-600">{(e.confidence * 100).toFixed(0)}% Match</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}


function EnhancedForensicTimeline({ suspectName }: { suspectName: string }) {
  const [timeline, setTimeline] = useState<TimelineResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  useEffect(() => {
    async function loadTimeline() {
      try {
        setLoading(true);
        const data = await api.getSuspectTimeline(suspectName);
        setTimeline(data);
      } catch (err) {
        console.error("Error loading timeline:", err);
      } finally {
        setLoading(false);
      }
    }
    if (suspectName) {
      loadTimeline();
    }
  }, [suspectName]);

  if (loading) {
    return (
      <Card className="p-4 border-slate-300 bg-white text-xs font-mono text-slate-500">
        Loading multi-source forensic timeline for {suspectName}...
      </Card>
    );
  }

  if (!timeline || timeline.events.length === 0) {
    return (
      <Card className="p-4 border-slate-300 bg-white text-xs font-mono text-slate-500">
        No forensic timeline events recorded for {suspectName}.
      </Card>
    );
  }

  // Sort events by timestamp for chronological view
  const sortedEvents = [...timeline.events].sort((a, b) =>
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const filteredEvents = activeFilter === "ALL"
    ? sortedEvents
    : sortedEvents.filter(e => e.source_module === activeFilter);

  return (
    <Card className="space-y-4 border-slate-300 bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Unified Chronological Timeline ({filteredEvents.length} events)
          </h3>
          <p className="text-[11px] font-mono text-slate-500">Chronological multi-source activity sequence: FIR → Nocturnal → CCTV → Financial → Surveillance</p>
        </div>
        {/* Source Filter Buttons */}
        <div className="flex flex-wrap gap-1">
          {["ALL", "FIR", "NOCTURNAL", "CCTV", "FINANCIAL", "SURVEILLANCE", "CDR", "SOCIAL"].map((mod) => (
            <button
              key={mod}
              onClick={() => setActiveFilter(mod)}
              className={`px-2 py-1 rounded text-[10px] font-mono font-semibold transition-colors ${
                activeFilter === mod
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-4 space-y-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-200 max-h-[500px] overflow-y-auto">
        {filteredEvents.map((evt) => {
          const isExpanded = expandedEventId === evt.event_id;
          return (
            <div key={evt.event_id} className="relative group">
              {/* Source indicator dot with color coding */}
              <span
                className={`absolute -left-[4px] top-[6px] w-2 h-2 rounded-full border-2 border-white shadow-sm`}
                style={{ backgroundColor: evt.color || "#64748b" }}
              />
              <div
                onClick={() => setExpandedEventId(isExpanded ? null : evt.event_id)}
                className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200 cursor-pointer transition-colors space-y-1 font-mono text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase"
                      style={{ backgroundColor: evt.color || "#64748b" }}
                    >
                      {evt.source_module}
                    </span>
                    <strong className="text-slate-900 font-semibold">{evt.title}</strong>
                  </div>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 shrink-0">
                    {evt.timestamp}
                    {isExpanded ? <ChevronUp className="w-3 h-3 text-slate-400" /> : <ChevronDown className="w-3 h-3 text-slate-400" />}
                  </span>
                </div>
                <p className="text-[11px] font-sans text-slate-600">{evt.description}</p>

                {/* Expanded metadata with better formatting */}
                {isExpanded && evt.metadata && Object.keys(evt.metadata).length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 bg-slate-50 p-3 rounded text-[10px] space-y-2">
                    <span className="font-bold text-slate-700">Event Forensic Details:</span>
                    <pre className="text-[10px] text-slate-800 bg-slate-400 p-2 rounded overflow-x-auto">
                      {JSON.stringify(evt.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}


function EnhancedDossierCard({ dossier }: { dossier: SuspectDossierDetails }) {
  // Mock additional data for demonstration (in real app, this would come from API)
  const mockIdentifiers = {
    aliases: ["Md. R. Bhalla", "Ranbir Bhai", "Don"],
    imei: ["352099091234567", "352099091234568"],
    pan: "ABCPB1234M",
    bankIfsc: "HDFC0001234",
    shellCompanies: [
      { name: "Venus Enterprises Ltd", registration: "U74999MH2020PTC123456" },
      { name: "Byculla Properties Pvt Ltd", registration: "U70109MH2019PTC098765" }
    ]
  };

  return (
    <Card className="border-slate-300 bg-white">
      {/* Header with threat score badge */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <Badge variant="critical" className="mb-1">CONFIDENTIAL DOSSIER</Badge>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {dossier.suspect_name}
          </h2>
          <p className="text-xs font-mono text-slate-600">
            {dossier.phone_number} · Threat Score: <strong className="text-red-700 font-bold">{dossier.threat_score?.toFixed(1) ?? "N/A"}</strong>/100
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-950/80 border border-red-600 rounded-lg text-center min-w-[60px] shadow-[0_0_10px_#ef4444_inset]">
            <span className="text-xl font-extrabold text-red-400 block leading-none">
              {dossier.threat_score?.toFixed(0) ?? "N/A"}
            </span>
            <span className="text-[8px] text-red-300 uppercase tracking-widest block font-bold mt-0.5">
              THREAT SCORE
            </span>
          </div>
        </div>
      </div>

      {/* Demographics & Digital Identifiers Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            Identity & Digital Fingerprints
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Primary Identifiers */}
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <h4 className="text-xs font-mono font-medium text-slate-700 mb-2">Primary Identifiers</h4>
              <div className="space-y-1 text-xs">
                <div className="justify-between">
                  <span>Name:</span>
                  <span className="font-mono">{dossier.suspect_name}</span>
                </div>
                <div className="justify-between">
                  <span>Phone:</span>
                  <span className="font-mono text-blue-400">{dossier.phone_number}</span>
                </div>
                <div className="justify-between">
                  <span>Aliases (AKA):</span>
                  <span className="font-mono text-slate-400">{mockIdentifiers.aliases.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Financial & Digital Identifiers */}
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <h4 className="text-xs font-mono font-medium text-slate-700 mb-2">Financial & Digital</h4>
              <div className="space-y-1 text-xs">
                <div className="justify-between">
                  <span>PAN:</span>
                  <span className="font-mono">{mockIdentifiers.pan}</span>
                </div>
                <div className="justify-between">
                  <span>Bank IFSC:</span>
                  <span className="font-mono">{mockIdentifiers.bankIfsc}</span>
                </div>
                <div className="justify-between">
                  <span>IMEI Numbers:</span>
                  <span className="font-mono text-slate-400">{mockIdentifiers.imei.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Associated Entities */}
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <h4 className="text-xs font-mono font-medium text-slate-700 mb-2">Associated Entities</h4>
              <div className="space-y-1 text-xs">
                <div className="justify-between">
                  <span>CCTV Matches:</span>
                  <span className="font-mono">{dossier.cctv_meetings_count}</span>
                </div>
                <div className="justify-between">
                  <span>FIR Filings:</span>
                  <span className="font-mono">{dossier.fir_matches_count}</span>
                </div>
                <div className="justify-between">
                  <span>CDR Events:</span>
                  <span className="font-mono">{dossier.cdr_calls_count}</span>
                </div>
                <div className="justify-between mt-2">
                  <span>Shell Companies:</span>
                  <span className="font-mono">{mockIdentifiers.shellCompanies.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Syndicate & Network Tags */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            Syndicate & Network Affiliation
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-red-900/20 border-l-2 border-red-400 text-red-800 px-3 py-1 rounded text-xs font-mono">
              NET_ALPHA (Hawala Node)
            </span>
            <span className="bg-blue-900/20 border-l-2 border-blue-400 text-blue-800 px-3 py-1 rounded text-xs font-mono">
              Money Laundering Circuit
            </span>
            <span className="bg-purple-900/20 border-l-2 border-purple-400 text-purple-800 px-3 py-1 rounded text-xs font-mono">
              Byculla Extortion Ring
            </span>
            <span className="bg-green-900/20 border-l-2 border-green-400 text-green-800 px-3 py-1 rounded text-xs font-mono">
              Hawala Network Node
            </span>
          </div>
        </div>
      </div>

      {/* Dossier Markdown View */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          Comprehensive Intelligence Summary
        </h3>
        <div className="prose max-w-none text-xs font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-y-auto max-h-[300px] whitespace-pre-wrap text-slate-800">
          {dossier.dossier_markdown || "Loading dossier content..."}
        </div>
      </div>

      {/* Export Action Section */}
      <div className="space-y-4 pt-3 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold font-mono text-slate-900">
              Court-Admissible Evidence Package
            </h4>
            <p className="text-xs font-mono text-slate-500">
              Export as certified legal briefing with BMPD header, evidence seal, and signature block
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => exportDossierPrint(dossier)}
            className="font-mono flex items-center gap-2"
          >
            <Printer className="h-4 w-4 mr-1" />
            Export Legal Briefing (.PDF/Print)
          </Button>
        </div>
      </div>
    </Card>
  );
}


function exportDossierPrint(dossier: SuspectDossierDetails) {
  // Create a print-friendly version of the dossier
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>BMPD Intelligence Dossier - ${dossier.suspect_name}</title>
      <style>
        body { font-family: monospace; margin: 40px; line-height: 1.6; color: #000; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #1e293b; margin-bottom: 5px; }
        .header h2 { color: #334155; margin-bottom: 0; }
        .seal { border: 2px solid #1e293b; padding: 20px; margin: 30px 0; text-align: center; }
        .section { margin: 25px 0; }
        .section h3 { color: #1e293b; border-bottom: 1px solid #334155; padding-bottom: 5px; }
        .info { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 15px 0; }
        .info-item { background: #f8fafc; padding: 10px; border-radius: 4px; }
        .label { font-weight: bold; color: #334155; }
        .value { color: #0f172a; margin-top: 5px; }
        .badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; text-transform: uppercase; margin: 2px; }
        .badge-critical { background: #fef2f2; color: #dc2626; }
        .badge-high { background: #fefce8; color: #d97706; }
        .badge-medium { background: #f0f9ff; color: #0284c7; }
        .badge-low { background: #f0fdf4; color: #16a34a; }
        .footer { margin-top: 50px; text-align: center; font-size: 14px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        @media print {
          body { margin: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>BRIHANMUMBAI POLICE DEPARTMENT</h1>
        <h2>INTELLIGENCE & CRIMINAL INVESTIGATION BUREAU</h2>
        <div class="seal">
          <h3>CONFIDENTIAL INTELLIGENCE DOSSIER</h3>
          <p>Evidence Seal: BMPD-${Date.now().toString(16).toUpperCase()}</p>
          <p>Generated: ${new Date().toLocaleString()}</p>
        </div>
      </div>

      <div class="section">
        <h3>SUSPECT IDENTIFICATION</h3>
        <div class="info">
          <div class="info-item">
            <div class="label">Name</div>
            <div class="value">${dossier.suspect_name}</div>
          </div>
          <div class="info-item">
            <div class="label">Phone Number</div>
            <div class="value">${dossier.phone_number}</div>
          </div>
          <div class="info-item">
            <div class="label">Threat Score</div>
            <div class="value">${dossier.threat_score?.toFixed(1) ?? "N/A"}/100</div>
          </div>
          ${dossier.driver_breakdown ? `
            <div class="info-item">
              <div class="label">Threat Score Breakdown</div>
              <div class="value">
                CCTV: ${dossier.driver_breakdown.CCTV?.toFixed(1) || "0"}/30,
                CDR: ${dossier.driver_breakdown.CDR?.toFixed(1) || "0"}/20,
                FIR: ${dossier.driver_breakdown.FIR?.toFixed(1) || "0"}/15,
                Criminal History: ${dossier.driver_breakdown["Criminal History"]?.toFixed(1) || "0"}/15,
                Financial: ${dossier.driver_breakdown.Financial?.toFixed(1) || "0"}/10,
                Surveillance: ${dossier.driver_breakdown.Surveillance?.toFixed(1) || "0"}/10
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="section">
        <h3>DIGITAL & FINANCIAL IDENTIFIERS</h3>
        <div class="info">
          <div class="info-item">
            <div class="label">PAN Number</div>
            <div class="value">ABCPB1234M</div>
          </div>
          <div class="info-item">
            <div class="label">Bank IFSC</div>
            <div class="value">HDFC0001234</div>
          </div>
          <div class="info-item">
            <div class="label">IMEI Numbers</div>
            <div class="value">352099091234567, 352099091234568</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>ASSOCIATED ENTITIES & NETWORKS</h3>
        <div class="info">
          <div class="info-item">
            <div class="label">CCTV Encounters</div>
            <div class="value">${dossier.cctv_meetings_count}</div>
          </div>
          <div class="info-item">
            <div class="label">FIR Filings</div>
            <div class="value">${dossier.fir_matches_count}</div>
          </div>
          <div class="info-item">
            <div class="label">CDR Events</div>
            <div class="value">${dossier.cdr_calls_count}</div>
          </div>
          <div class="info-item">
            <div class="label">Associated Shell Companies</div>
            <div class="value">Venus Enterprises Ltd, Byculla Properties Pvt Ltd</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>SYNDICATE & NETWORK AFFILIATION</h3>
        <div class="info">
          <span class="badge badge-critical">NET_ALPHA (Hawala Node)</span>
          <span class="badge badge-high">Money Laundering Circuit</span>
          <span class="badge badge-medium">Byculla Extortion Ring</span>
          <span class="badge badge-low">Hawala Network Node</span>
        </div>
      </div>

      <div class="section">
        <h3>COMPREHENSIVE INTELLIGENCE SUMMARY</h3>
        <div class="info-item">
          <div class="value">${dossier.dossier_markdown || "Loading dossier content..."}</div>
        </div>
      </div>

      <div class="footer">
        <p>Authorized By: Senior Inspector, Intelligence Bureau</p>
        <p>Brihanmumbai Police Department</p>
        <p>This document is confidential and intended for authorized law enforcement use only.</p>
      </div>
    </body>
    </html>
  `;

  // Open print window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load then trigger print
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}


async function getAllSuspects() {
  try {
    // Try to get all suspects from the threat leaderboard
    const threatData = await api.getThreatLeaderboard();
    return threatData.leaderboard.map(suspect => ({
      name: suspect.suspect_name,
      phone: suspect.phone_number,
      threatScore: suspect.total_threat_score,
      cctvScore: suspect.cctv_meeting_score,
      cdrScore: suspect.cdr_network_score,
      firScore: suspect.fir_severity_score,
      criminalScore: suspect.criminal_history_score,
      financialScore: suspect.financial_risk_score,
      surveillanceScore: suspect.surveillance_score
    }));
  } catch (error) {
    console.error("Failed to get all suspects:", error);
    return [];
  }
}

function DossiersContent() {
  const searchParams = useSearchParams();
  const initialSuspect = searchParams.get("suspect") || "Md. Ranbir Bhalla";
  const initialQuery = searchParams.get("search") || "";

  const [selectedSuspect, setSelectedSuspect] = useState(initialSuspect);
  const [dossier, setDossier] = useState<SuspectDossierDetails | null>(null);
  const [alerts, setAlerts] = useState<AlertsResponse | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResultResponse | null>(null);
  const [suspectSearchResults, setSuspectSearchResults] = useState<Array<{
    name: string;
    phone: string;
    threatScore: number;
    cctvScore: number;
    cdrScore: number;
    firScore: number;
    criminalScore: number;
    financialScore: number;
    surveillanceScore: number;
  }> | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [suspectSearchQuery, setSuspectSearchQuery] = useState("");
  const [suspectSearchLoading, setSuspectSearchLoading] = useState(false);
  const [allSuspects, setAllSuspects] = useState<Array<{
    name: string;
    phone: string;
    threatScore: number;
    cctvScore: number;
    cdrScore: number;
    firScore: number;
    criminalScore: number;
    financialScore: number;
    surveillanceScore: number;
  }>>([]);
  const [allSuspectsLoading, setAllSuspectsLoading] = useState(false);

  useEffect(() => {
    loadDossierAndAlerts(selectedSuspect);
    loadAllSuspects();
  }, [selectedSuspect]);

  async function loadDossierAndAlerts(name: string) {
    try {
      setLoading(true);
      const [dossierRes, alertRes] = await Promise.all([
        api.getSuspectDossier(name).catch(() => null),
        api.getAlerts().catch(() => null)
      ]);
      setDossier(dossierRes);
      setAlerts(alertRes);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadAllSuspects() {
    try {
      setAllSuspectsLoading(true);
      const suspects = await getAllSuspects();
      setAllSuspects(suspects);
    } catch (error) {
      console.error("Failed to load all suspects:", error);
    } finally {
      setAllSuspectsLoading(false);
    }
  }

  async function handleSuspectSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!suspectSearchQuery.trim()) return;
    try {
      setSuspectSearchLoading(true);
      // Using searchIntelligence to find suspects - in a real app, this might be a dedicated endpoint
      const res = await api.searchIntelligence(suspectSearchQuery.trim());

      // Extract unique suspects from search results with their threat scores from allSuspects
      const suspectsMap = new Map<string, {
        name: string;
        phone: string;
        threatScore: number;
        cctvScore: number;
        cdrScore: number;
        firScore: number;
        criminalScore: number;
        financialScore: number;
        surveillanceScore: number;
      }>();

      // Add suspects from FIR matches
      res.fir_matches.forEach(match => {
        const suspectName = match.accused_name;
        if (!suspectsMap.has(suspectName)) {
          // Find full suspect data from allSuspects
          const fullData = allSuspects.find(s => s.name === suspectName);
          if (fullData) {
            suspectsMap.set(suspectName, {
              name: fullData.name,
              phone: fullData.phone,
              threatScore: fullData.threatScore,
              cctvScore: fullData.cctvScore,
              cdrScore: fullData.cdrScore,
              firScore: fullData.firScore,
              criminalScore: fullData.criminalScore,
              financialScore: fullData.financialScore,
              surveillanceScore: fullData.surveillanceScore
            });
          } else {
            // Fallback to basic info if not in allSuspects
            suspectsMap.set(suspectName, {
              name: suspectName,
              phone: "Unknown",
              threatScore: 0,
              cctvScore: 0,
              cdrScore: 0,
              firScore: 0,
              criminalScore: 0,
              financialScore: 0,
              surveillanceScore: 0
            });
          }
        }
      });

      // Add suspects from CDR matches
      res.cdr_matches.forEach(match => {
        [match.caller, match.receiver].forEach(name => {
          if (!suspectsMap.has(name)) {
            // Find full suspect data from allSuspects
            const fullData = allSuspects.find(s => s.name === name);
            if (fullData) {
              suspectsMap.set(name, {
                name: fullData.name,
                phone: fullData.phone,
                threatScore: fullData.threatScore,
                cctvScore: fullData.cctvScore,
                cdrScore: fullData.cdrScore,
                firScore: fullData.firScore,
                criminalScore: fullData.criminalScore,
                financialScore: fullData.financialScore,
                surveillanceScore: fullData.surveillanceScore
              });
            } else {
              // Fallback to basic info if not in allSuspects
              suspectsMap.set(name, {
                name: name,
                phone: "Unknown",
                threatScore: 0,
                cctvScore: 0,
                cdrScore: 0,
                firScore: 0,
                criminalScore: 0,
                financialScore: 0,
                surveillanceScore: 0
              });
            }
          }
        });
      });

      // Convert map to array and limit results
      const suspectsArray = Array.from(suspectsMap.values()).slice(0, 20);
      setSuspectSearchResults(suspectsArray);
    } catch (err: any) {
      alert("Search error: " + err.message);
    } finally {
      setSuspectSearchLoading(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      setLoading(true);
      const res = await api.searchIntelligence(searchQuery.trim());
      setSearchResults(res);
    } catch (err: any) {
      alert("Search error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Header
        title="Module 8 — Court-Admissible Dossier Management"
        subtitle="360° suspect dossiers with exportable legal intelligence briefings"
      />

      {/* Multi-Search Bar */}
      <Card className="border-slate-300 bg-white">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Suspect Search */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
              <Search className="w-4 h-4 text-purple-600" />
              Search Suspects
            </h3>
            <form onSubmit={handleSuspectSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={suspectSearchQuery}
                  onChange={(e) => setSuspectSearchQuery(e.target.value)}
                  placeholder="Enter suspect name or phone number..."
                  className="w-full bg-white border border-slate-300 rounded-lg pl-3 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 font-mono shadow-sm"
                />
                <Button type="submit" disabled={suspectSearchLoading} size="sm">
                  {suspectSearchLoading ? "Searching..." : "Search"}
                </Button>
              </div>
            </form>

            {/* Suspect Search Results */}
            {suspectSearchLoading && (
              <p className="text-xs font-mono text-slate-500">Searching suspects...</p>
            )}
            {!suspectSearchLoading && suspectSearchResults !== null && suspectSearchResults.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-mono text-slate-600 font-medium">
                  {suspectSearchResults.length} suspect(s) found:
                </p>
                <div className="mt-2 space-y-1 max-h-[400px] overflow-y-auto">
                  {suspectSearchResults.map((suspect, idx) => (
                    <div
                      key={suspect.name}
                      onClick={() => {
                        setSelectedSuspect(suspect.name);
                        setSuspectSearchResults(null); // Clear results after selection
                      }}
                      className="p-3 bg-slate-50 rounded border border-slate-200 cursor-hover hover:bg-slate-100 transition-colors font-mono text-xs"
                    >
                      <div className="flex justify-between">
                        <span className="font-mono">{suspect.name}</span>
                        <span className="font-mono text-slate-600">{suspect.phone}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[9px] font-mono text-slate-500">Threat Score:</span>
                        <span className="font-mono text-red-600">{suspect.threatScore.toFixed(1)}</span>
                      </div>
                      {/* Threat score breakdown bars */}
                      <div className="mt-2 space-y-1">
                        {[
                          { label: "CCTV", value: suspect.cctvScore, max: 30, color: "emerald" },
                          { label: "CDR", value: suspect.cdrScore, max: 20, color: "blue" },
                          { label: "FIR", value: suspect.firScore, max: 15, color: "red" },
                          { label: "Criminal History", value: suspect.criminalScore, max: 15, color: "purple" },
                          { label: "Financial", value: suspect.financialScore, max: 10, color: "orange" },
                          { label: "Surveillance", value: suspect.surveillanceScore, max: 10, color: "teal" }
                        ].map((factor, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="w-20 text-[9px] font-mono">{factor.label}:</span>
                            <div className="flex-1 bg-slate-200 rounded h-1.5">
                              <div
                                className={`h-full bg-${factor.color}-500`}
                                style={{ width: `${Math.min(100, (factor.value / factor.max) * 100)}%` }}
                              ></div>
                            </div>
                            <span className="w-20 text-[9px] font-mono">
                              {factor.value.toFixed(1)}/{factor.max}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!suspectSearchLoading && suspectSearchResults !== null && suspectSearchResults.length === 0 && (
              <p className="text-xs font-mono text-slate-500 mt-3">No suspects found. Try a different search term.</p>
            )}
          </div>

          {/* Intelligence Search */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Search Intelligence
            </h3>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search across FIRs, CDR call logs, and CCTV sightings (e.g. Byculla, Bhalla)..."
                  className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 font-mono shadow-sm"
                />
                <Button type="submit">Execute Query</Button>
              </div>
            </form>

            {/* Search Results Display */}
            {searchResults && (
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-slate-600">
                  <span>Query: <strong className="text-slate-900">"{searchResults.query}"</strong></span>
                  <span>Total Matches: <strong className="text-emerald-700 font-bold">{searchResults.total_matches}</strong></span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">FIR Matches: {searchResults.fir_matches.length}</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">CDR Matches: {searchResults.cdr_matches.length}</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">CCTV Matches: {searchResults.cctv_matches.length}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* All Suspects Overview */}
      {!allSuspectsLoading && allSuspects.length > 0 && (
        <Card className="border-slate-300 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold font-mono text-slate-900">
              All Suspects Overview ({allSuspects.length} total)
            </h3>
            <Button
              size="sm"
              onClick={() => {
                // Sort by threat score descending
                const sorted = [...allSuspects].sort((a, b) => b.threatScore - a.threatScore);
                setSuspectSearchResults(sorted.slice(0, 20));
                setSuspectSearchQuery("");
              }}
            >
              Show Top 20 by Threat Score
            </Button>
          </div>
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Suspect Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3 text-right">Threat Score</th>
                    <th className="p-3 text-center">CCTV</th>
                    <th className="p-3 text-center">CDR</th>
                    <th className="p-3 text-center">FIR</th>
                    <th className="p-3 text-center">Criminal</th>
                    <th className="p-3 text-center">Financial</th>
                    <th className="p-3 text-center">Surveillance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {allSuspects.slice(0, 50).map((suspect, idx) => (
                    <tr
                      key={suspect.name}
                      onClick={() => {
                        setSelectedSuspect(suspect.name);
                      }}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3 font-mono">{suspect.name}</td>
                      <td className="p-3 text-slate-600">{suspect.phone}</td>
                      <td className="p-3 text-right font-bold text-red-700">{suspect.threatScore.toFixed(1)}</td>
                      <td className="p-3 text-center">
                        <div className="w-10 h-2 bg-slate-200 rounded">
                          <div
                            className="h-full bg-emerald-500"
                            style={{ width: `${Math.min(100, (suspect.cctvScore / 30) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-[9px] font-mono">{suspect.cctvScore.toFixed(1)}</span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="w-10 h-2 bg-slate-200 rounded">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${Math.min(100, (suspect.cdrScore / 20) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-[9px] font-mono">{suspect.cdrScore.toFixed(1)}</span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="w-10 h-2 bg-slate-200 rounded">
                          <div
                            className="h-full bg-red-500"
                            style={{ width: `${Math.min(100, (suspect.firScore / 15) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-[9px] font-mono">{suspect.firScore.toFixed(1)}</span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="w-10 h-2 bg-slate-200 rounded">
                          <div
                            className="h-full bg-purple-500"
                            style={{ width: `${Math.min(100, (suspect.criminalScore / 15) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-[9px] font-mono">{suspect.criminalScore.toFixed(1)}</span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="w-10 h-2 bg-slate-200 rounded">
                          <div
                            className="h-full bg-orange-500"
                            style={{ width: `${Math.min(100, (suspect.financialScore / 10) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-[9px] font-mono">{suspect.financialScore.toFixed(1)}</span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="w-10 h-2 bg-slate-200 rounded">
                          <div
                            className="h-full bg-teal-500"
                            style={{ width: `${Math.min(100, (suspect.surveillanceScore / 10) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-[9px] font-mono">{suspect.surveillanceScore.toFixed(1)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Enhanced Dossier Viewer & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {dossier && (
            <>
              <EnhancedDossierCard dossier={dossier} />
              <EnhancedForensicTimeline suspectName={dossier.suspect_name} />
            </>
          )}
        </div>

        {/* FIR Parser Tool (condensed version) */}
        {!dossier && (
          <Card className="border-slate-300 bg-white">
            <h3 className="text-sm font-bold font-mono text-slate-900">
              <FileText className="w-4 h-4 text-purple-600" />
              Quick FIR Parser
            </h3>
            <FIRParserTool />
          </Card>
        )}

        {/* Right Column: Real-Time Police Alert Feed */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="space-y-4 border-amber-300 bg-white">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Bell className="w-4 h-4 text-amber-700 animate-bounce" />
              <h3 className="text-sm font-bold font-mono text-slate-900">Police Alert Feed</h3>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {alerts?.alerts.map((a) => (
                <div key={a.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <Badge variant={a.severity === "CRITICAL" ? "critical" : "high"}>{a.severity}</Badge>
                    <span className="text-[10px] text-slate-500">{a.timestamp}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mt-1">{a.title}</h4>
                  <p className="text-[11px] text-slate-600 font-sans leading-relaxed">{a.message}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DossiersPage() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading Court-Admissible Dossier..." />}>
      <DossiersContent />
    </Suspense>
  );
}