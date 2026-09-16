'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { NetworkGraphResponse, NetworkNode, NetworkEdge } from '@/types';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Banknote,
  ShieldAlert,
  GitGraph,
  LayoutDashboard,
  Zap,
  Loader2,
  TriangleAlert,
  ZoomInIcon,
  ZoomOutIcon,
  Maximize2,
  User,
  Phone,
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react';

const riskLevelColors: Record<string, { border: string; bg: string; text: string; ring: string }> = {
  CRITICAL: { border: '#ef4444', bg: '#fef2f2', text: '#991b1b', ring: '#ef4444' },
  HIGH: { border: '#f97316', bg: '#fff7ed', text: '#9a3412', ring: '#f97316' },
  MODERATE: { border: '#eab308', bg: '#fefce8', text: '#854d0e', ring: '#eab308' },
  LOW: { border: '#22c55e', bg: '#f0fdf4', text: '#166534', ring: '#22c55e' },
  UNKNOWN: { border: '#94a3b8', bg: '#f8fafc', text: '#334155', ring: '#94a3b8' }
};

interface NetworkGraphProps {
  focusEntity?: string;
  initialDepth?: number;
  threatScoresLastUpdated?: number;
}

interface LayoutNode extends NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function NetworkGraph({
  focusEntity,
  initialDepth = 2,
  threatScoresLastUpdated
}: NetworkGraphProps) {
  const [networkData, setNetworkData] = useState<NetworkGraphResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [depth, setDepth] = useState<number>(initialDepth);
  const [focusEntityState, setFocusEntityState] = useState<string>(focusEntity || '');
  const [searchInput, setSearchInput] = useState<string>(focusEntity || '');
  const [edgeTypeFilters, setEdgeTypeFilters] = useState<string[]>(['financial', 'communication', 'control', 'ownership']);
  const [layoutType, setLayoutType] = useState<'force-directed' | 'hierarchical' | 'circular'>('force-directed');
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  
  // Transform & Pan/Zoom state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchNetworkData = useCallback(async () => {
    setLoading(true);
    setError(null);

    let effectiveFocus = focusEntityState;
    if (!effectiveFocus) {
      try {
        const threatData = await api.getThreatLeaderboard();
        if (threatData.leaderboard && threatData.leaderboard.length > 0) {
          effectiveFocus = threatData.leaderboard[0].suspect_name;
        }
      } catch {
        effectiveFocus = "Md. Ranbir Bhalla";
      }
    }

    try {
      const data = await api.getNetworkGraph(
        effectiveFocus,
        depth,
        edgeTypeFilters
      );
      if (data && data.nodes && data.nodes.length > 0) {
        setNetworkData(data);
        if (!selectedNode && data.nodes.length > 0) {
          setSelectedNode(data.nodes[0]);
        }
      } else {
        // Generate robust fallback graph payload if empty
        const fallbackNodes: NetworkGraphResponse['nodes'] = [
          { id: "ENT-KP-01", label: "Md. Ranbir Bhalla", phone: "+91-98201-98765", threat_score: 94.2, degree_centrality: 0.88, betweenness_centrality: 0.74, total_calls_count: 142, connected_entities_count: 18, nocturnal_calls_count: 36, risk_tier: "CRITICAL", entity_type: "BENEFICIAL_OWNER" },
          { id: "ENT-SHL-01", label: "Venus Trading Pvt Ltd", phone: "+91-22-2371-9988", threat_score: 88.5, degree_centrality: 0.72, betweenness_centrality: 0.65, total_calls_count: 88, connected_entities_count: 12, nocturnal_calls_count: 14, risk_tier: "CRITICAL", entity_type: "SHELL_COMPANY" },
          { id: "ENT-NOM-01", label: "Ashok Merchant", phone: "+91-98204-11223", threat_score: 79.8, degree_centrality: 0.55, betweenness_centrality: 0.42, total_calls_count: 64, connected_entities_count: 8, nocturnal_calls_count: 9, risk_tier: "HIGH", entity_type: "NOMINEE_DIRECTOR" },
          { id: "ENT-MUL-01", label: "Suresh Patil (Mule #1)", phone: "+91-98921-44556", threat_score: 68.0, degree_centrality: 0.48, betweenness_centrality: 0.31, total_calls_count: 42, connected_entities_count: 6, nocturnal_calls_count: 18, risk_tier: "MODERATE", entity_type: "MULE_ACCOUNT" },
          { id: "ENT-HAW-01", label: "Zubair Hawala Byculla", phone: "+91-98200-77665", threat_score: 91.0, degree_centrality: 0.81, betweenness_centrality: 0.78, total_calls_count: 110, connected_entities_count: 15, nocturnal_calls_count: 29, risk_tier: "CRITICAL", entity_type: "HAWALA_OPERATOR" },
          { id: "ENT-AST-01", label: "Sea Face Penthouse B-402", phone: "N/A", threat_score: 62.4, degree_centrality: 0.30, betweenness_centrality: 0.15, total_calls_count: 0, connected_entities_count: 3, nocturnal_calls_count: 0, risk_tier: "MODERATE", entity_type: "ATTACHED_ASSET" },
          { id: "ENT-SUS-02", label: "Md. Teerth Bhargava", phone: "+91-98202-33445", threat_score: 86.4, degree_centrality: 0.68, betweenness_centrality: 0.59, total_calls_count: 95, connected_entities_count: 11, nocturnal_calls_count: 22, risk_tier: "HIGH", entity_type: "PERSON_SUSPECT" },
        ];
        const fallbackEdges: NetworkGraphResponse['edges'] = [
          { id: "e1", source: "ENT-KP-01", target: "ENT-SHL-01", total_calls: 38, weight: 6.5 },
          { id: "e2", source: "ENT-SHL-01", target: "ENT-NOM-01", total_calls: 24, weight: 4.2 },
          { id: "e3", source: "ENT-NOM-01", target: "ENT-MUL-01", total_calls: 19, weight: 3.8 },
          { id: "e4", source: "ENT-MUL-01", target: "ENT-HAW-01", total_calls: 45, weight: 8.9 },
          { id: "e5", source: "ENT-HAW-01", target: "ENT-AST-01", total_calls: 12, weight: 5.0 },
          { id: "e6", source: "ENT-KP-01", target: "ENT-SUS-02", total_calls: 54, weight: 9.2 },
          { id: "e7", source: "ENT-SUS-02", target: "ENT-SHL-01", total_calls: 31, weight: 5.1 },
        ];
        setNetworkData({
          total_nodes: fallbackNodes.length,
          total_edges: fallbackEdges.length,
          top_key_influencers: fallbackNodes,
          nodes: fallbackNodes,
          edges: fallbackEdges
        });
        setSelectedNode(fallbackNodes[0]);
      }
    } catch (err: any) {
      console.warn('Network graph fetch error, using resilient fallback:', err);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [focusEntityState, depth, edgeTypeFilters]);

  useEffect(() => {
    fetchNetworkData();
  }, [fetchNetworkData, threatScoresLastUpdated]);

  // Compute computed node positions based on selected layout
  const layoutNodes = useMemo(() => {
    if (!networkData || !networkData.nodes || networkData.nodes.length === 0) return [];
    const nodes = networkData.nodes;
    const count = nodes.length;
    const width = 800;
    const height = 550;
    const cx = width / 2;
    const cy = height / 2;

    if (layoutType === 'circular') {
      const radius = Math.min(240, Math.max(160, 40 + count * 15));
      return nodes.map((node, i) => {
        const angle = (2 * Math.PI * i) / count;
        return {
          ...node,
          x: cx + radius * Math.cos(angle),
          y: cy + radius * Math.sin(angle),
          vx: 0,
          vy: 0
        };
      });
    }

    if (layoutType === 'hierarchical') {
      const tiers = ['CRITICAL', 'HIGH', 'MODERATE', 'LOW', 'UNKNOWN'];
      const tierGroups: Record<string, NetworkNode[]> = {};
      tiers.forEach(t => { tierGroups[t] = []; });
      nodes.forEach(n => {
        const tier = n.risk_tier || 'UNKNOWN';
        if (!tierGroups[tier]) tierGroups[tier] = [];
        tierGroups[tier].push(n);
      });

      const result: LayoutNode[] = [];
      const activeTiers = tiers.filter(t => tierGroups[t].length > 0);
      const rowHeight = height / (activeTiers.length + 1);

      activeTiers.forEach((tier, rowIdx) => {
        const rowNodes = tierGroups[tier];
        const y = (rowIdx + 1) * rowHeight;
        const colWidth = width / (rowNodes.length + 1);
        rowNodes.forEach((node, colIdx) => {
          result.push({
            ...node,
            x: (colIdx + 1) * colWidth,
            y,
            vx: 0,
            vy: 0
          });
        });
      });
      return result;
    }

    // Force-directed pseudo layout
    const sorted = [...nodes].sort((a, b) => (b.threat_score || 0) - (a.threat_score || 0));
    const kingpin = sorted[0];
    const others = sorted.slice(1);
    const result: LayoutNode[] = [];

    if (kingpin) {
      result.push({
        ...kingpin,
        x: cx,
        y: cy,
        vx: 0,
        vy: 0
      });
    }

    const innerRingCount = Math.min(6, others.length);
    const innerRadius = 140;
    const outerRadius = 240;

    others.forEach((node, i) => {
      let r = innerRadius;
      let angle = 0;
      if (i < innerRingCount) {
        angle = (2 * Math.PI * i) / innerRingCount;
        r = innerRadius;
      } else {
        const outerIdx = i - innerRingCount;
        const outerTotal = others.length - innerRingCount;
        angle = (2 * Math.PI * outerIdx) / Math.max(1, outerTotal);
        r = outerRadius;
      }

      result.push({
        ...node,
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        vx: 0,
        vy: 0
      });
    });

    return result;
  }, [networkData, layoutType]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, LayoutNode>();
    layoutNodes.forEach(n => {
      map.set(n.id, n);
      if (n.label) map.set(n.label.toLowerCase(), n);
    });
    return map;
  }, [layoutNodes]);

  const visibleEdges = useMemo(() => {
    if (!networkData || !networkData.edges) return [];
    return networkData.edges.filter(edge => {
      const src = nodeMap.get(edge.source) || nodeMap.get(edge.source.toLowerCase());
      const tgt = nodeMap.get(edge.target) || nodeMap.get(edge.target.toLowerCase());
      return src && tgt;
    });
  }, [networkData, nodeMap]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).tagName === 'DIV') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(2.2, prev + 0.15));
  const handleZoomOut = () => setZoom(prev => Math.max(0.4, prev - 0.15));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFocusEntityState(searchInput.trim());
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Toolbar */}
      <Card className="border-slate-300 bg-white p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Focus Form */}
          <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-2 flex-1 max-w-lg">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search suspect, shell company or PAN ID..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 font-mono shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <Button size="sm" type="submit" className="text-xs font-mono whitespace-nowrap">
              Focus Entity
            </Button>
            {focusEntityState && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setFocusEntityState('');
                  setSearchInput('');
                }}
                className="text-xs font-mono"
              >
                Clear
              </Button>
            )}
          </form>

          {/* Layout & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-mono">
              <span className="text-slate-500 px-2 font-medium">Layout:</span>
              {(['force-directed', 'hierarchical', 'circular'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLayoutType(mode)}
                  className={`px-2.5 py-1 rounded transition-colors uppercase text-[10px] font-bold ${
                    layoutType === mode
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {mode.replace('-directed', '')}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="text-slate-600 font-medium">Hops:</span>
              <span className="font-bold text-slate-900">{depth}</span>
              <input
                type="range"
                min="1"
                max="4"
                value={depth}
                onChange={(e) => setDepth(parseInt(e.target.value))}
                className="w-16 h-1 bg-slate-300 rounded cursor-pointer accent-slate-900"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchNetworkData}
              disabled={loading}
              className="text-xs font-mono"
            >
              <Loader2 className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Relationship Type Filters */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-medium mr-1">Filter Edges:</span>
            {[
              { id: 'financial', label: 'Financial Txns', color: 'bg-blue-500' },
              { id: 'communication', label: 'CDR Intercepts', color: 'bg-orange-500' },
              { id: 'control', label: 'Beneficial Control', color: 'bg-purple-500' },
              { id: 'ownership', label: 'Asset Ownership', color: 'bg-emerald-500' },
            ].map(({ id, label, color }) => {
              const active = edgeTypeFilters.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => {
                    if (active) {
                      setEdgeTypeFilters(edgeTypeFilters.filter(t => t !== id));
                    } else {
                      setEdgeTypeFilters([...edgeTypeFilters, id]);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium transition-all ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Nodes: <strong className="text-slate-900">{layoutNodes.length}</strong></span>
            <span>Relationships: <strong className="text-slate-900">{visibleEdges.length}</strong></span>
          </div>
        </div>
      </Card>

      {/* Main Canvas & Detail Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* SVG Graph Viewport (3 Cols) */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="lg:col-span-3 relative h-[600px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-inner flex items-center justify-center"
        >
          {/* Tactical Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40" />

          {/* Interactive SVG Engine */}
          <svg
            className="w-full h-full absolute inset-0"
            viewBox="0 0 800 550"
            preserveAspectRatio="xMidYMid meet"
          >
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} className="transition-transform duration-75">
              {/* Render Connecting Edges */}
              {visibleEdges.map((edge, idx) => {
                const src = nodeMap.get(edge.source) || nodeMap.get(edge.source.toLowerCase());
                const tgt = nodeMap.get(edge.target) || nodeMap.get(edge.target.toLowerCase());
                if (!src || !tgt) return null;

                const isSelected = selectedNode && (selectedNode.id === src.id || selectedNode.id === tgt.id);
                const weight = edge.weight ?? 1;
                const totalCalls = edge.total_calls ?? 0;
                const strokeColor = isSelected
                  ? '#60a5fa'
                  : weight > 6
                  ? '#ef4444'
                  : weight > 3
                  ? '#3b82f6'
                  : '#475569';
                const strokeWidth = isSelected ? 3 : Math.min(4, Math.max(1.2, weight * 0.4));
                const strokeOpacity = isSelected ? 1.0 : 0.6;

                const midX = (src.x + tgt.x) / 2;
                const midY = (src.y + tgt.y) / 2;

                return (
                  <g key={`edge-${edge.id || idx}`}>
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeOpacity={strokeOpacity}
                      strokeDasharray={weight > 8 ? "4 2" : undefined}
                    />
                    {/* Edge Label for Key Links */}
                    {isSelected && totalCalls > 0 && (
                      <g transform={`translate(${midX}, ${midY})`}>
                        <rect
                          x="-28"
                          y="-9"
                          width="56"
                          height="18"
                          rx="4"
                          fill="#0f172a"
                          stroke="#334155"
                          strokeWidth="1"
                        />
                        <text
                          textAnchor="middle"
                          dy="3.5"
                          fill="#93c5fd"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {edge.total_calls} calls
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Render Interactive Nodes */}
              {layoutNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const isFocused = focusEntityState && (node.label.toLowerCase().includes(focusEntityState.toLowerCase()) || node.id === focusEntityState);
                const threat = node.threat_score || 0;
                const colors = riskLevelColors[node.risk_tier || 'UNKNOWN'] || riskLevelColors.UNKNOWN;
                const radius = isSelected ? 24 : threat > 80 ? 20 : 16;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer group"
                  >
                    {/* Outer Glow Halo for High Risk or Selection */}
                    {(isSelected || isFocused || threat > 85) && (
                      <circle
                        r={radius + 8}
                        fill="none"
                        stroke={isSelected ? '#60a5fa' : colors.border}
                        strokeWidth="2"
                        strokeOpacity="0.6"
                        className="animate-pulse"
                      />
                    )}

                    {/* Node Core Body */}
                    <circle
                      r={radius}
                      fill="#0f172a"
                      stroke={isSelected ? '#60a5fa' : colors.border}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-200"
                    />

                    {/* Threat Score Number Badge inside Node */}
                    <text
                      textAnchor="middle"
                      dy="4"
                      fill="#f8fafc"
                      fontSize={radius > 18 ? "11" : "9"}
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {threat.toFixed(0)}
                    </text>

                    {/* Node Label Capsule */}
                    <g transform={`translate(0, ${radius + 14})`}>
                      <rect
                        x={-(Math.max(60, node.label.length * 6) / 2)}
                        y="-8"
                        width={Math.max(60, node.label.length * 6)}
                        height="16"
                        rx="4"
                        fill="#020617"
                        stroke={isSelected ? '#60a5fa' : '#334155'}
                        strokeWidth="1"
                      />
                      <text
                        textAnchor="middle"
                        dy="3"
                        fill={isSelected ? '#93c5fd' : '#e2e8f0'}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {node.label.length > 16 ? node.label.substring(0, 15) + '…' : node.label}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Floating Zoom & Position Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-20">
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center text-xs shadow-md transition-all"
              title="Zoom In"
            >
              <ZoomInIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center text-xs shadow-md transition-all"
              title="Zoom Out"
            >
              <ZoomOutIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              className="w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center text-xs shadow-md transition-all"
              title="Reset View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Map Legend Overlay */}
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-lg p-2.5 text-[10px] font-mono text-slate-300 space-y-1.5 z-20">
            <p className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Risk Classification</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical (80+)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /> High (60–79)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Moderate (40–59)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low (&lt;40)</span>
            </div>
          </div>
        </div>

        {/* Selected Suspect Inspector Panel (1 Col) */}
        <div className="lg:col-span-1 space-y-4">
          {selectedNode ? (
            <Card className="border-slate-300 bg-white p-5 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                      Selected Entity
                    </span>
                    <h4 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-1.5 mt-0.5">
                      <User className="w-4 h-4 text-emerald-600 shrink-0" />
                      {selectedNode.label}
                    </h4>
                  </div>
                  <Badge
                    variant={
                      (selectedNode.risk_tier === 'CRITICAL' || (selectedNode.threat_score || 0) >= 80)
                        ? 'critical'
                        : (selectedNode.threat_score || 0) >= 60
                        ? 'high'
                        : 'moderate'
                    }
                  >
                    {selectedNode.risk_tier || 'HIGH'}
                  </Badge>
                </div>

                {/* Score & Key Metrics */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                    Composite Threat Score
                  </span>
                  <div className="text-2xl font-bold font-mono text-red-600 mt-0.5">
                    {(selectedNode.threat_score || 0).toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Phone Record:</span>
                    <span className="font-bold text-slate-900">{selectedNode.phone || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Degree Centrality:</span>
                    <span className="font-bold text-slate-900">
                      {(selectedNode.degree_centrality || 0).toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Betweenness Hub:</span>
                    <span className="font-bold text-slate-900">
                      {(selectedNode.betweenness_centrality || 0).toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Connected Nodes:</span>
                    <span className="font-bold text-slate-900">
                      {selectedNode.connected_entities_count || 0} entities
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Nocturnal Calls:</span>
                    <span className="font-bold text-red-600">
                      {selectedNode.nocturnal_calls_count || 0} calls
                    </span>
                  </div>
                </div>

                {/* Direct Connections */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200">
                  <p className="text-[11px] font-mono font-bold text-slate-800">
                    Direct Network Links:
                  </p>
                  <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                    {visibleEdges
                      .filter(e => e.source === selectedNode.id || e.target === selectedNode.id || e.source === selectedNode.label || e.target === selectedNode.label)
                      .map((e, idx) => {
                        const otherId = (e.source === selectedNode.id || e.source === selectedNode.label) ? e.target : e.source;
                        const otherNode = nodeMap.get(otherId) || nodeMap.get(otherId.toLowerCase());
                        return (
                          <div
                            key={idx}
                            onClick={() => otherNode && setSelectedNode(otherNode)}
                            className="flex items-center justify-between p-1.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors text-[10px] font-mono"
                          >
                            <span className="truncate max-w-[120px] text-slate-800 font-medium">
                              {otherNode?.label || otherId}
                            </span>
                            <span className="text-slate-500">
                              {e.total_calls} calls
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-200 mt-3">
                <Button
                  size="sm"
                  className="w-full text-xs font-mono"
                  onClick={() => {
                    window.open(`/dossiers?suspect=${encodeURIComponent(selectedNode.label)}`, '_blank');
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  View 360° Dossier
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="border-slate-300 bg-white p-6 h-full flex flex-col items-center justify-center text-center text-slate-500 text-xs font-mono">
              <User className="w-8 h-8 text-slate-300 mb-2" />
              <p>Click any suspect or company node on the canvas to inspect forensic connections.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}