"use client";

import React, { useEffect, useRef, useState } from "react";
import { GeoPoint } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Layers,
  Eye,
  AlertTriangle,
  Building,
  DollarSign,
  ShieldAlert,
  Map,
  Zap,
  Activity
} from "lucide-react";
import { api } from "@/lib/api";

declare global {
  interface Window {
    L: any;
  }
}

interface LayerConfig {
  id: string;
  label: string;
  color: string;
  icon: React.ComponentType<any>;
  defaultChecked: boolean;
}

// Layer configurations matching the requirements
const LAYER_CONFIGS: LayerConfig[] = [
  {
    id: "CCTV",
    label: "CCTV Cameras",
    color: "#22c55e", // emerald-500 (green)
    icon: Eye,
    defaultChecked: true
  },
  {
    id: "CRIME",
    label: "Crime Incident Hotspots",
    color: "#ef4444", // red-500
    icon: AlertTriangle,
    defaultChecked: true
  },
  {
    id: "SHELL",
    label: "Shell Company Addresses",
    color: "#a855f7", // purple-500
    icon: Building,
    defaultChecked: false
  },
  {
    id: "HAWALA",
    label: "Hawala & Token Desks",
    color: "#f59e0b", // amber-500
    icon: DollarSign,
    defaultChecked: false
  },
  {
    id: "PMLA",
    label: "PMLA Seized Properties",
    color: "#3b82f6", // blue-500
    icon: ShieldAlert,
    defaultChecked: false
  }
];

interface TacticalMapProps {
  title?: string;
  subtitle?: string;
  height?: string;
  // Optional: default layers to show (if not provided, uses defaults from LAYER_CONFIGS)
  defaultLayers?: string[];
}

export function UnifiedTacticalMap({
  title = "Unified Tactical Geospatial Map",
  subtitle = "Multi-layer intelligence fusion map of Mumbai",
  height = "500px",
  defaultLayers
}: TacticalMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Layer data state
  const [layerData, setLayerData] = useState<Record<string, GeoPoint[]>>({});
  const [layerLoading, setLayerLoading] = useState<Record<string, boolean>>({});
  const [layerError, setLayerError] = useState<Record<string, string | null>>({});

  // Toggle state - initialize with defaults or from props
  const [activeLayers, setActiveLayers] = useState<Set<string>>(() => {
    if (defaultLayers) {
      return new Set(defaultLayers);
    }
    // Use defaults from layer configs
    return new Set(LAYER_CONFIGS.filter(l => l.defaultChecked).map(l => l.id));
  });

  // Load all layer data
  useEffect(() => {
    async function loadAllLayers() {
      try {
        // Initialize loading states
        const initialLoading: Record<string, boolean> = {};
        const initialErrors: Record<string, string | null> = {};
        LAYER_CONFIGS.forEach(layer => {
          initialLoading[layer.id] = true;
          initialErrors[layer.id] = null;
        });
        setLayerLoading(initialLoading);
        setLayerError(initialErrors);

        // Fetch data for each layer
        const layerPromises = LAYER_CONFIGS.map(async (layer) => {
          try {
            const res = await api.getGeoPoints(layer.id).catch(() => null);
            return { layerId: layer.id, points: res?.points || [] };
          } catch (err: any) {
            console.warn(`Failed to load ${layer.id} layer:`, err);
            return { layerId: layer.id, points: [], error: err?.message || "Unknown error" };
          }
        });

        const results = await Promise.all(layerPromises);

        // Update state with results
        const newLayerData: Record<string, GeoPoint[]> = {};
        const newLayerLoading: Record<string, boolean> = {};
        const newLayerError: Record<string, string | null> = {};

        results.forEach(result => {
          newLayerData[result.layerId] = result.points;
          newLayerLoading[result.layerId] = false;
          newLayerError[result.layerId] = result.error || null;
        });

        setLayerData(newLayerData);
        setLayerLoading(newLayerLoading);
        setLayerError(newLayerError);

        // Re-render markers if map is loaded
        if (mapLoaded && mapInstanceRef.current && window.L) {
          renderMarkers();
        }
      } catch (err: any) {
        console.error("Failed to load tactical map layers:", err);
        // Set error state for all layers
        const errorState: Record<string, string | null> = {};
        LAYER_CONFIGS.forEach(layer => {
          errorState[layer.id] = err?.message || "Unknown error";
        });
        setLayerError(errorState);

        // Set loading to false
        const loadingState: Record<string, boolean> = {};
        LAYER_CONFIGS.forEach(layer => {
          loadingState[layer.id] = false;
        });
        setLayerLoading(loadingState);
      }
    }

    loadAllLayers();
  }, []); // Run once on mount

  // Initialize Leaflet map
  useEffect(() => {
    // Dynamically load Leaflet CSS & JS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    if (!window.L && !document.getElementById("leaflet-js")) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else if (window.L) {
      initMap();
    }
  }, []);

  // Re-render markers when layers change or data updates
  useEffect(() => {
    if (mapLoaded && mapInstanceRef.current && window.L) {
      renderMarkers();
    }
  }, [activeLayers, layerData, mapLoaded]);

  function initMap() {
    if (!mapRef.current || mapInstanceRef.current || !window.L) return;

    // Default center: Mumbai (18.9780, 72.8300)
    const map = window.L.map(mapRef.current).setView([18.9780, 72.8300], 13);
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapLoaded(true);
    renderMarkers();
  }

  function renderMarkers() {
    const map = mapInstanceRef.current;
    if (!map || !window.L) return;

    // Clear existing markers
    map.eachLayer((layer: any) => {
      if (layer instanceof window.L.CircleMarker ||
          layer instanceof window.L.Marker ||
          layer instanceof window.L.Circle) {
        map.removeLayer(layer);
      }
    });

    const allMarkers: any[] = [];
    const bounds: [number, number][] = [];

    // Render each active layer
    LAYER_CONFIGS.forEach(layerConfig => {
      if (!activeLayers.has(layerConfig.id)) return;

      const points = layerData[layerConfig.id] || [];
      if (points.length === 0) return;

      points.forEach((point) => {
        const markerPos: [number, number] = [point.lat, point.lng];
        bounds.push(markerPos);

        let marker: any;
        let popupContent: string;

        // Create different marker types based on layer
        switch (layerConfig.id) {
          case "CCTV":
            // Green circle marker for CCTV cameras
            marker = window.L.circleMarker(markerPos, {
              radius: 8,
              fillColor: layerConfig.color,
              color: "#ffffff",
              weight: 2,
              opacity: 0.9,
              fillOpacity: 0.8
            });

            popupContent = `
              <div style="font-family: monospace; font-size: 11px; padding: 4px;">
                <div style="border-bottom: 1px solid #334155; margin-bottom: 2px; padding-bottom: 2px;">
                  <strong style="color: ${(layerConfig as any).fontColor || 'white'}; font-size: 12px;">${point.title}</strong>
                </div>
                <div className="space-y-1" style="color: #e2e8f0; font-size: 10px;">
                  <div><span style="color: #94a3b8;">Type:</span> <span style="color: white;">CCTV Camera</span></div>
                  <div><span style="color: #94a3b8;">Location:</span> <span style="color: white;">${point.details.split('|')[0] || point.details}</span></div>
                  <div><span style="color: #94a3b8;">Sightings:</span> <span style="color: #22c55e; font-weight: bold;">${point.details.split('|')[1] || 'N/A'}</span></div>
                  <div><span style="color: #94a3b8;">Last Active:</span> <span style="color: white;">${new Date(point.timestamp).toLocaleString()}</span></div>
                </div>
                <div style="margin-top: 4px; text-align: center;">
                  <button onclick="window.alert('Viewing CCTV feed for camera: ${point.title}')"
                          style="background: #3b82f6; color: white; border: none; padding: 2px 6px; border-radius: 3px; font-size: 10px; cursor: pointer;">
                    View Feed
                  </button>
                </div>
              </div>
            `;
            break;

          case "CRIME":
            // Red pulsing circle for crime hotspots
            marker = window.L.circle(markerPos, {
              radius: 100, // 100 meters radius
              color: layerConfig.color,
              weight: 2,
              opacity: 0.7,
              fillColor: layerConfig.color,
              fillOpacity: 0.2
            });

            // Add pulsing animation via CSS class (we'll simulate with tooltip)
            popupContent = `
              <div style="font-family: monospace; font-size: 11px; padding: 4px;">
                <div style="border-bottom: 1px solid #334155; margin-bottom: 2px; padding-bottom: 2px;">
                  <strong style="color: ${layerConfig.color}; font-size: 12px;">🚨 CRIME HOTSPOT</strong>
                </div>
                <div className="space-y-1" style="color: #e2e8f0; font-size: 10px;">
                  <div><span style="color: #94a3b8;">Incident Type:</span> <span style="color: #f87171;">${point.details.split('|')[0] || 'Unknown'}</span></div>
                  <div><span style="color: #94a3b8;">Location:</span> <span style="color: white;">${point.title}</span></div>
                  <div><span style="color: #94a3b8;">FIR Reference:</span> <span style="color: white;">${point.details.split('|')[1] || 'N/A'}</span></div>
                  <div><span style="color: #94a3b8;">Timestamp:</span> <span style="color: white;">${new Date(point.timestamp).toLocaleString()}</span></div>
                </div>
                <div style="margin-top: 4px; text-align: center;">
                  <button onclick="window.alert('Inspecting FIR details for: ${point.title}')"
                          style="background: #dc2626; color: white; border: none; padding: 2px 6px; border-radius: 3px; font-size: 10px; cursor: pointer;">
                    View FIR
                  </button>
                  <button onclick="window.alert('Viewing call logs for area around: ${point.title}')"
                          style="background: #2563eb; color: white; margin-left: 4px; border: none; padding: 2px 6px; border-radius: 3px; font-size: 10px; cursor: pointer;">
                    View Call Logs
                  </button>
                </div>
              </div>
            `;
            break;

          case "SHELL":
            // Building marker for shell companies
            marker = window.L.marker(markerPos, {
              icon: window.L.divIcon({
                className: "",
                html: `<div style="background: ${layerConfig.color}; width: 12px; height: 12px; border-radius: 3px; border: 2px solid white;"></div>`
              })
            });

            popupContent = `
              <div style="font-family: monospace; font-size: 11px; padding: 4px;">
                <div style="border-bottom: 1px solid #334155; margin-bottom: 2px; padding-bottom: 2px;">
                  <strong style="color: ${layerConfig.color}; font-size: 12px;">${point.title}</strong>
                </div>
                <div className="space-y-1" style="color: #e2e8f0; font-size: 10px;">
                  <div><span style="color: #94a3b8;">Registered As:</span> <span style="color: white;">${point.details.split('|')[0] || 'Private Limited'}</span></div>
                  <div><span style="color: #94a3b8;">Address:</span> <span style="color: white;">${point.details.split('|')[1] || point.details}</span></div>
                  <div><span style="color: #94a3b8;">Registration No:</span> <span style="color: white;">${point.details.split('|')[2] || 'N/A'}</span></div>
                  <div><span style="color: #94a3b8;">Linked Kingpin:</span> <span style="color: #f87171;">${point.details.split('|')[3] || 'Under Investigation'}</span></div>
                </div>
                <div style="margin-top: 4px; text-align: center;">
                  <button onclick="window.alert('Inspecting money flow for: ${point.title}')"
                          style="background: #059669; color: white; border: none; padding: 2px 6px; border-radius: 3px; font-size: 10px; cursor: pointer;">
                    Inspect Money Flow
                  </button>
                </div>
              </div>
            `;
            break;

          case "HAWALA":
            // Coin marker for hawala/token desks
            marker = window.L.marker(markerPos, {
              icon: window.L.divIcon({
                className: "",
                html: `<div style="background: ${layerConfig.color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;">₳</div>`
              })
            });

            popupContent = `
              <div style="font-family: monospace; font-size: 11px; padding: 4px;">
                <div style="border-bottom: 1px solid #334155; margin-bottom: 2px; padding-bottom: 2px;">
                  <strong style="color: ${layerConfig.color}; font-size: 12px;">${point.title}</strong>
                </div>
                <div className="space-y-1" style="color: #e2e8f0; font-size: 10px;">
                  <div><span style="color: #94a3b8;">Operation Type:</span> <span style="color: #fbbf24;">${point.details.split('|')[0] || 'Hawala'}</span></div>
                  <div><span style="color: #94a3b8;">Location:</span> <span style="color: white;">${point.details.split('|')[1] || point.details}</span></div>
                  <div><span style="color: #94a3b8;">Daily Volume:</span> <span style="color: #fbbf24; font-weight: bold;">₹${point.details.split('|')[2] || '0'}L</span></div>
                  <div><span style="color: #94a3b8;">Linked Entities:</span> <span style="color: #f87171;">${point.details.split('|')[3] || 'Under Surveillance'}</span></div>
                </div>
                <div style="margin-top: 4px; text-align: center;">
                  <button onclick="window.alert('Tracking transactions for desk: ${point.title}')"
                          style="background: #dc2626; color: white; border: none; padding: 2px 6px; border-radius: 3px; font-size: 10px; cursor: pointer;">
                    Trace Transactions
                  </button>
                </div>
              </div>
            `;
            break;

          case "PMLA":
            // Shield marker for seized properties
            marker = window.L.marker(markerPos, {
              icon: window.L.divIcon({
                className: "",
                html: `<div style="background: ${layerConfig.color}; width: 20px; height: 20px; border-radius: 4px; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;">🛡️</div>`
              })
            });

            popupContent = `
              <div style="font-family: monospace; font-size: 11px; padding: 4px;">
                <div style="border-bottom: 1px solid #334155; margin-bottom: 2px; padding-bottom: 2px;">
                  <strong style="color: ${layerConfig.color}; font-size: 12px;">${point.title}</strong>
                </div>
                <div className="space-y-1" style="color: #e2e8f0; font-size: 10px;">
                  <div><span style="color: #94a3b8;">Property Type:</span> <span style="color: white;">${point.details.split('|')[0] || 'Real Estate'}</span></div>
                  <div><span style="color: #94a3b8;">Location:</span> <span style="color: white;">${point.details.split('|')[1] || point.details}</span></div>
                  <div><span=color: #94a3b8;">Seized On:</span> <span style="color: white;">${new Date(point.timestamp).toLocaleDateString()}</span></div>
                  <div><span style="color: #94a3b8;">Case No:</span> <span style="color: white;">${point.details.split('|')[2] || 'PMLA/XXX/XXXX'}</span></div>
                  <div><span style="color: #94a3b8;">Estimated Value:</span> <span style="color: #10b981; font-weight: bold;">₹${point.details.split('|')[3] || '0'} Cr</span></div>
                </div>
                <div style="margin-top: 4px; text-align: center;">
                  <button onclick="window.alert('Viewing seizure order for: ${point.title}')"
                          style="background: #7c3aed; color: white; border: none; padding: 2px 6px; border-radius: 3px; font-size: 10px; cursor: pointer;">
                    Case Details
                  </button>
                </div>
              </div>
            `;
            break;

          default:
            // Default marker
            marker = window.L.circleMarker(markerPos, {
              radius: 6,
              fillColor: layerConfig.color,
              color: "#ffffff",
              weight: 2,
              opacity: 0.8,
              fillOpacity: 0.7
            });

            popupContent = `
              <div style="font-family: monospace; font-size: 11px; padding: 4px;">
                <strong style="color: ${layerConfig.color};">${point.title}</strong><br/>
                <span style="color: #94a3b8;">${new Date(point.timestamp).toLocaleString()}</span><br/>
                <span style="color: #e2e8f0;">${point.details}</span>
              </div>
            `;
        }

        if (marker) {
          marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: "tactical-map-popup"
          });
          marker.addTo(map);
          allMarkers.push(marker);
        }
      });
    });

    // Fit bounds to show all markers
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }

  return (
    <Card className="space-y-4 border-slate-300 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-600" />
            {title}
          </h3>
          <p className="text-[11px] font-mono text-slate-500">{subtitle}</p>
        </div>

        {/* Layer Controls */}
        <div className="flex flex-wrap gap-2">
          {LAYER_CONFIGS.map((layerConfig) => {
            const isActive = activeLayers.has(layerConfig.id);
            return (
              <label key={layerConfig.id} className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all font-mono text-xs ${
                isActive
                  ? `bg-${layerConfig.color}/20 border-${layerConfig.color}/40 text-${layerConfig.color}`
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/20"
              }`}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setActiveLayers(prev => new Set(prev).add(layerConfig.id));
                    } else {
                      setActiveLayers(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(layerConfig.id);
                        return newSet;
                      });
                    }
                  }}
                  className="w-4 h-4 rounded border-gray-600"
                />
                <span>{layerConfig.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Loading/Error States */}
      {Object.values(layerLoading).some(loading => loading) && (
        <div className="text-center p-4 text-xs font-mono text-slate-500">
          Loading tactical map layers...
        </div>
      )}

      {!Object.values(layerLoading).some(loading => loading) &&
        Object.values(layerError).some(error => error !== null) && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <h3 className="text-sm font-mono font-medium text-red-800 flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
            Layer Loading Error
          </h3>
          <p className="mt-1 text-xs text-red-700 font-mono">
            {Object.values(layerError).find(error => error !== null)}
          </p>
        </div>
      )}

      {/* Map Container */}
      <div
        ref={mapRef}
        style={{ height, width: "100%" }}
        className="rounded-xl border border-slate-200 shadow-inner"
      />
    </Card>
  );
}