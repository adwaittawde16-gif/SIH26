"use client";

import React from "react";
import { Header } from "@/components/shared/Header";
import { LoadingSpinner, ErrorState } from "@/components/ui/loading";
import { UnifiedTacticalMap } from "@/components/shared/UnifiedTacticalMap";

export default function CCTVCoLocationPage() {
  return (
    <div className="space-y-6">
      <Header
        title="Module 3 — Unified Tactical Geospatial Map"
        subtitle="Multi-layer intelligence fusion map focusing on CCTV co-location and encounter data"
      />

      {/* Unified Tactical Map with CCTV-focused defaults */}
      <UnifiedTacticalMap
        title="Unified Tactical Geospatial Map"
        subtitle="CCTV Encounter Layers - Mumbai Metropolitan Region"
        height="600px"
        defaultLayers={["CCTV", "CRIME", "SHELL"]} // Default layers for CCTV view
      />
    </div>
  );
}