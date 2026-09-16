"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useNav } from "./NavContext";
import {
  Menu,
  ChevronRight,
  Search,
  Activity,
  Clock,
  Sparkles,
  Shield,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";

const ROUTE_NAMES: Record<string, string> = {
  "/": "Mission Command Center",
  "/threat": "Module 1 — Suspect Threat Index",
  "/cdr": "Module 2 — CDR Network Graph & Forensics",
  "/cctv": "Module 3 — CCTV Co-Location Encounters",
  "/gangs": "Module 4 — Gangs & Crime Syndicates",
  "/crime-rings": "Module 4 & 5 — Crime Rings Detection",
  "/financial": "Module 5 — Financial & PMLA Forensics",
  "/nocturnal": "Module 6 — Nocturnal Calling Anomalies",
  "/surveillance": "Module 7 — Field Surveillance & Heatmaps",
  "/dossiers": "Module 8 — Suspect Dossier Generator",
  "/social-media": "Module 9 — Social Media Intelligence",
  "/criminal-history": "Module 10 — Master Criminal History Register",
};

export function TacticalCommandBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleMobile, isCollapsed, toggleCollapse } = useNav();

  const [timeStr, setTimeStr] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeStr(`${now.toLocaleTimeString("en-GB", options)} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dossiers?suspect=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const currentTitle = ROUTE_NAMES[pathname] || "Brihanmumbai Police Intelligence";

  return (
    <header className="sticky top-0 z-40 w-full bg-[#061224]/90 backdrop-blur-md border-b border-[#1a3b6d] px-4 py-2.5 flex items-center justify-between gap-4 font-mono">
      {/* Left section: Mobile Hamburger + Desktop Collapse + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 rounded-lg bg-[#0c213f] border border-[#1a3b6d] text-slate-300 hover:text-white hover:bg-[#102a52] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg bg-[#0c213f] border border-[#1a3b6d] text-slate-400 hover:text-white hover:bg-[#102a52] transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-sky-400" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Breadcrumb Path */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold hidden sm:flex">
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            <span className="tracking-wider">TACTICAL POLICE INTEL</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
          </div>
          <span className="text-white font-bold tracking-wide truncate max-w-[200px] sm:max-w-none">
            {currentTitle}
          </span>
        </div>
      </div>

      {/* Center & Right section: Search bar + Status + Clock + AI Copilot */}
      <div className="flex items-center gap-3">
        {/* Quick Global Suspect Search Bar */}
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Quick Search Suspect / FIR..."
            className="w-56 lg:w-72 bg-[#0c213f] border border-[#1a3b6d] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-mono shadow-inner"
          />
        </form>

        {/* Live IST Digital Clock */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0c213f] border border-[#1a3b6d] text-slate-200 text-[11px] font-mono shadow-sm">
          <Clock className="w-3 h-3 text-sky-400" />
          <span>{timeStr || "18:30:00 IST"}</span>
        </div>

        {/* Telemetry Live Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold tracking-wider uppercase shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">LIVE GRID</span>
        </div>
      </div>
    </header>
  );
}
