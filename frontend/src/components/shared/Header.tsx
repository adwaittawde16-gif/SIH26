"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Activity, ShieldAlert, Sparkles } from "lucide-react";

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/dossiers?suspect=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-4 font-mono">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-cyan-400" />
            MUMBAI POLICE // NETSENTINEL v2.4
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white font-sans">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5 font-sans font-normal">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <form onSubmit={handleSearch} className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search suspect, FIR, location..."
            className="w-full md:w-72 bg-slate-900/90 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/40 font-mono transition-colors shadow-inner"
          />
        </form>

        <div className="hidden sm:flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold">
          <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          <span>API LIVE</span>
        </div>
      </div>
    </header>
  );
}

