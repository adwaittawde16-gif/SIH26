"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Maximize2, Minimize2 } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  subtext?: string;
  accent?: "blue" | "red" | "amber" | "green" | "cyan" | "purple" | "indigo" | "emerald";
  icon?: React.ComponentType<{ className?: string }>;
}

export function KPICard({ label, value, subtext, accent = "blue", icon: Icon }: KPICardProps) {
  const [isSelected, setIsSelected] = useState(false);

  const accents = {
    blue: {
      text: "text-sky-400",
      border: "border-sky-500/30 hover:border-sky-400/50",
      bg: "bg-sky-950/20",
      iconBg: "bg-sky-500/10 text-sky-400",
      glow: "shadow-[0_0_15px_-3px_rgba(2,132,199,0.15)]",
    },
    red: {
      text: "text-red-400",
      border: "border-red-500/30 hover:border-red-400/50",
      bg: "bg-red-950/20",
      iconBg: "bg-red-500/10 text-red-400",
      glow: "shadow-[0_0_15px_-3px_rgba(227,27,35,0.15)]",
    },
    amber: {
      text: "text-amber-400",
      border: "border-amber-500/30 hover:border-amber-400/50",
      bg: "bg-amber-950/20",
      iconBg: "bg-amber-500/10 text-amber-400",
      glow: "shadow-[0_0_15px_-3px_rgba(245,158,11,0.15)]",
    },
    green: {
      text: "text-emerald-400",
      border: "border-emerald-500/30 hover:border-emerald-400/50",
      bg: "bg-emerald-950/20",
      iconBg: "bg-emerald-500/10 text-emerald-400",
      glow: "shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]",
    },
    emerald: {
      text: "text-emerald-400",
      border: "border-emerald-500/30 hover:border-emerald-400/50",
      bg: "bg-emerald-950/20",
      iconBg: "bg-emerald-500/10 text-emerald-400",
      glow: "shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]",
    },
    cyan: {
      text: "text-cyan-400",
      border: "border-cyan-500/30 hover:border-cyan-400/50",
      bg: "bg-cyan-950/20",
      iconBg: "bg-cyan-500/10 text-cyan-400",
      glow: "shadow-[0_0_15px_-3px_rgba(6,182,212,0.15)]",
    },
    purple: {
      text: "text-purple-400",
      border: "border-purple-500/30 hover:border-purple-400/50",
      bg: "bg-purple-950/20",
      iconBg: "bg-purple-500/10 text-purple-400",
      glow: "shadow-[0_0_15px_-3px_rgba(168,85,247,0.15)]",
    },
    indigo: {
      text: "text-indigo-400",
      border: "border-indigo-500/30 hover:border-indigo-400/50",
      bg: "bg-indigo-950/20",
      iconBg: "bg-indigo-500/10 text-indigo-400",
      glow: "shadow-[0_0_15px_-3px_rgba(99,102,241,0.15)]",
    },
  };

  const style = accents[accent];
  const valueStr = String(value);

  // Dynamic text size scaling
  const valueSizeClass =
    valueStr.length > 14
      ? "text-base sm:text-lg lg:text-xl"
      : valueStr.length > 9
      ? "text-lg sm:text-xl lg:text-2xl"
      : "text-2xl sm:text-3xl";

  return (
    <div
      onClick={() => setIsSelected(!isSelected)}
      title={isSelected ? "Selected: Full text revealed. Click to collapse." : "Click to select card and view full numbers/text"}
      className={cn(
        "p-4 rounded-xl border backdrop-blur-md transition-all duration-200 min-w-0 max-w-full cursor-pointer select-none",
        isSelected
          ? "bg-[#102a52] ring-2 ring-sky-400 border-sky-400 shadow-[0_0_25px_rgba(2,132,199,0.35)]"
          : "bg-[#0c213f]/80 shadow-sm hover:shadow-md hover:border-sky-500/40",
        style.border,
        style.glow
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold",
            isSelected ? "break-words whitespace-normal text-sky-200" : "truncate"
          )}
        >
          {label}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {Icon && (
            <div className={cn("p-1.5 rounded-lg shrink-0", style.iconBg)}>
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div className="text-slate-500 hover:text-sky-300 transition-colors ml-0.5">
            {isSelected ? (
              <Minimize2 className="w-3 h-3 text-sky-400" />
            ) : (
              <Maximize2 className="w-3 h-3 opacity-60 hover:opacity-100" />
            )}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "font-bold font-mono mt-2 tracking-tight tabular-nums",
          isSelected
            ? "whitespace-normal break-all text-xl sm:text-2xl text-white"
            : cn("truncate max-w-full block", valueSizeClass, style.text)
        )}
      >
        {value}
      </div>

      {subtext && (
        <p
          className={cn(
            "text-[10px] sm:text-[11px] text-slate-400 font-mono mt-1.5 flex items-center gap-1",
            isSelected ? "whitespace-normal break-words text-slate-300" : "truncate"
          )}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
          <span className={isSelected ? "break-words" : "truncate"}>{subtext}</span>
        </p>
      )}

      {isSelected && (
        <div className="mt-2 pt-2 border-t border-sky-500/30 flex items-center justify-between text-[9px] font-mono text-sky-400">
          <span>BOX SELECTED</span>
          <span className="text-slate-400">CLICK TO COLLAPSE</span>
        </div>
      )}
    </div>
  );
}
