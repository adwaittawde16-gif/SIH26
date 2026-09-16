"use client";

import React from "react";
import { Header } from "@/components/shared/Header";
import { LoadingSpinner, ErrorState } from "@/components/ui/loading";
import { UnifiedTacticalMap } from "@/components/shared/UnifiedTacticalMap";

export default function FieldSurveillancePage() {
  return (
    <div className="space-y-6">
      <Header
        title="Module 7 — Unified Tactical Geospatial Map"
        subtitle="Multi-layer intelligence fusion map combining surveillance, CCTV, financial, and hawala data layers"
      />

      {/* Unified Tactical Map with surveillance-focused defaults */}
      <UnifiedTacticalMap
        title="Unified Tactical Geospatial Map"
        subtitle="Surveillance & Intelligence Layers - Mumbai Metropolitan Region"
        height="600px"
        defaultLayers={["SURVEILLANCE", "CCTV", "CRIME"]} // Default layers for surveillance view
      />
    </div>
  );
}