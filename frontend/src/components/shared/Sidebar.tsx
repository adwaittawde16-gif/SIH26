"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "./NavContext";
import {
  ShieldAlert,
  Flame,
  Network,
  Camera,
  Layers,
  Banknote,
  Moon,
  Eye,
  FileText,
  Radio,
  Gavel,
  X,
  Zap,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Mission Command", href: "/", icon: ShieldAlert, short: "HQ", tag: "CORE" },
  { label: "1. Suspect Threat Index", href: "/threat", icon: Flame, short: "M1", tag: "CRIT" },
  { label: "2. CDR Network Graph", href: "/cdr", icon: Network, short: "M2", tag: "MESH" },
  { label: "3. CCTV Co-Location", href: "/cctv", icon: Camera, short: "M3", tag: "GEO" },
  { label: "4. Gangs & Syndicates", href: "/gangs", icon: Layers, short: "M4", tag: "RINGS" },
  { label: "5. Financial & PMLA", href: "/financial", icon: Banknote, short: "M5", tag: "FLOW" },
  { label: "6. Nocturnal Calling", href: "/nocturnal", icon: Moon, short: "M6", tag: "TIME" },
  { label: "7. Field Surveillance", href: "/surveillance", icon: Eye, short: "M7", tag: "TACT" },
  { label: "8. Suspect Dossiers", href: "/dossiers", icon: FileText, short: "M8", tag: "DOC" },
  { label: "9. Social Media Intel", href: "/social-media", icon: Radio, short: "M9", tag: "OSINT" },
  { label: "10. Criminal History", href: "/criminal-history", icon: Gavel, short: "M10", tag: "LAW" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isMobileOpen, setIsMobileOpen, isCollapsed } = useNav();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname, setIsMobileOpen]);

  return (
    <>
      {/* ── Mobile Backdrop Overlay ── */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* ── Sidebar Container (Responsive Desktop Rail + Mobile Slide-over) ── */}
      <aside
        className={cn(
          "bg-[#061224] text-slate-100 border-r border-[#1a3b6d] flex flex-col justify-between shrink-0 shadow-2xl transition-all duration-300 ease-in-out font-mono z-50",
          // Mobile state
          "fixed inset-y-0 left-0 lg:static",
          isMobileOpen ? "translate-x-0 w-72 p-4" : "-translate-x-full lg:translate-x-0",
          // Desktop state
          !isMobileOpen && (isCollapsed ? "lg:w-20 lg:p-3" : "lg:w-64 lg:p-4")
        )}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Brand Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1a3b6d]">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 via-blue-700 to-[#0c213f] border border-sky-400/40 flex items-center justify-center text-white font-mono font-extrabold text-sm shadow-[0_0_15px_rgba(2,132,199,0.5)] group-hover:scale-105 transition-transform">
                  BP
                </div>
                {(!isCollapsed || isMobileOpen) && (
                  <div className="transition-opacity duration-200">
                    <h1 className="font-extrabold text-xs text-white uppercase tracking-wider font-sans flex items-center gap-1.5">
                      Brihanmumbai Police
                    </h1>
                    <p className="text-[10px] font-mono text-sky-400 tracking-tight font-bold">
                      Special Intelligence Division
                    </p>
                  </div>
                )}
              </Link>

              {/* Mobile Close Button */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-1.5 rounded-lg bg-[#0c213f] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Header Label */}
            {(!isCollapsed || isMobileOpen) && (
              <div className="px-2 mb-2 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Intelligence Mesh
                </span>
                <span className="text-[9px] font-mono text-sky-400 bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-800/40">
                  10 ENGINES
                </span>
              </div>
            )}

            {/* Navigation List */}
            <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-260px)] pr-0.5 no-scrollbar">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed && !isMobileOpen ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl text-xs font-mono transition-all group relative",
                      isCollapsed && !isMobileOpen
                        ? "justify-center p-2.5"
                        : "px-3 py-2.5 justify-between",
                      isActive
                        ? "bg-gradient-to-r from-sky-700/80 to-[#0c213f] text-white font-bold shadow-[0_0_15px_rgba(2,132,199,0.3)] border border-sky-400/40"
                        : "text-slate-300 hover:text-white hover:bg-[#0c213f]/80 hover:border-[#1a3b6d] border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-transform group-hover:scale-110",
                          isActive
                            ? "text-sky-300"
                            : "text-slate-400 group-hover:text-sky-400"
                        )}
                      />
                      {(!isCollapsed || isMobileOpen) && (
                        <span className="truncate tracking-tight font-medium">{item.label}</span>
                      )}
                    </div>

                    {/* Compact badge */}
                    {(!isCollapsed || isMobileOpen) && (
                      <span
                        className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 transition-colors",
                          isActive
                            ? "bg-red-600/80 text-white border border-red-400/40"
                            : "bg-[#0c213f] text-slate-400 group-hover:text-slate-200 border border-[#1a3b6d]/60"
                        )}
                      >
                        {item.tag}
                      </span>
                    )}

                    {/* Active Pip Indicator */}
                    {isActive && (
                      <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r bg-red-500 shadow-[0_0_8px_#ef4444]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* System Live Status Card */}
          {(!isCollapsed || isMobileOpen) ? (
            <div className="p-3 bg-[#0c213f]/90 rounded-xl border border-[#1a3b6d] mt-4 shadow-lg">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase">
                    SYSTEM OPERATIONAL
                  </span>
                </div>
                <Zap className="w-3 h-3 text-sky-400" />
              </div>
              <p className="text-[11px] text-slate-200 font-sans leading-tight">
                NETSENTINEL v2.4 Security Mesh Active
              </p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1a3b6d] text-[9px] text-slate-400 font-mono">
                <span>AUTH: LEVEL-4 CIPHER</span>
                <span className="text-emerald-400 font-bold">100% SECURE</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#0c213f] border border-[#1a3b6d] mt-4 text-emerald-400" title="System Live">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
