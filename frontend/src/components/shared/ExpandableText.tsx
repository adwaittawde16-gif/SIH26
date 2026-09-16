"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface ExpandableTextProps {
  text: string | number;
  className?: string;
  expandedClassName?: string;
  copyable?: boolean;
}

export function ExpandableText({
  text,
  className,
  expandedClassName,
  copyable = false
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const textStr = String(text ?? "");

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(textStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <span
      onClick={() => setIsExpanded(!isExpanded)}
      title={isExpanded ? "Click to collapse" : "Click to view full text"}
      className={cn(
        "cursor-pointer transition-all duration-200 inline-flex items-center gap-1 min-w-0 max-w-full",
        isExpanded
          ? cn(
              "whitespace-normal break-words bg-sky-950/60 text-sky-200 px-1.5 py-0.5 rounded border border-sky-400/60 shadow-[0_0_10px_rgba(2,132,199,0.3)]",
              expandedClassName
            )
          : cn("truncate hover:text-sky-300 hover:underline decoration-sky-500/50", className)
      )}
    >
      <span className={cn(isExpanded ? "break-words" : "truncate")}>{textStr}</span>
      {isExpanded && copyable && (
        <button
          type="button"
          onClick={handleCopy}
          className="p-0.5 ml-1 rounded hover:bg-sky-800/50 text-sky-400 shrink-0 inline-flex"
          title="Copy text"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
        </button>
      )}
    </span>
  );
}
