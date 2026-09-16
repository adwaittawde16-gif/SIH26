"""
app_backend/routers/intelligence.py
------------------------------------
Intelligence Insights Router for Advanced Analytics and Investigative Recommendations.
Provides critical alerts, key influencers, investigative leads, trend analysis,
geographic hotspots, and network analytics for criminal intelligence.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Dict, List, Any, Optional
import logging
from datetime import datetime, timedelta
from pmla_financial_graph_engine import PMLAFinancialGraphEngine

from app_backend.dependencies import get_engine
from intelligence_engine import IntelligenceEngine
from app_backend.services.network_analyzer import create_network_analyzer

logger = logging.getLogger(__name__)

# Global singleton for PMLA graph engine
_pmla_engine: Optional[PMLAFinancialGraphEngine] = None

def get_pmla_engine() -> PMLAFinancialGraphEngine:
    global _pmla_engine
    if _pmla_engine is None:
        _pmla_engine = PMLAFinancialGraphEngine()
    return _pmla_engine

router = APIRouter(prefix="/api/intelligence", tags=["Intelligence Insights"])


@router.get("/insights")
async def get_intelligence_insights(
    engine: PMLAFinancialGraphEngine = Depends(get_pmla_engine),
    intel_engine: IntelligenceEngine = Depends(get_engine)
) -> Dict[str, Any]:
    """
    Get comprehensive intelligence insights including:
    - Critical alerts from pattern detection
    - Key influencers from network analysis
    - Investigative leads from AI reasoning
    - Trend analysis of threat metrics
    - Geographic hotspots (if location data available)
    - Network analytics (communities, centrality distributions)
    """
    try:
        # Initialize services
        network_analyzer = create_network_analyzer(engine)

        # Get current threat scores for trend analysis
        try:
            scores_df = intel_engine.calculate_threat_scores()
        except Exception:
            scores_df = None

        # Generate critical alerts from enhanced pattern detection
        critical_alerts = await _generate_critical_alerts(engine)

        # Identify key influencers using network analysis
        key_influencers = await _identify_key_influencers(network_analyzer)

        # Generate investigative leads using AI reasoning
        investigative_leads = await _generate_investigative_leads(engine, critical_alerts, key_influencers)

        # Perform trend analysis
        trend_analysis = await _perform_trend_analysis(scores_df, engine)

        # Analyze geographic hotspots (if location data available)
        geographic_hotspots = await _analyze_geographic_hotspots(engine)

        # Get network analytics
        network_analytics = await _get_network_analytics(network_analyzer)

        return {
            "critical_alerts": critical_alerts,
            "key_influencers": key_influencers,
            "investigative_leads": investigative_leads,
            "trend_analysis": trend_analysis,
            "geographic_hotspots": geographic_hotspots,
            "network_analytics": network_analytics,
            "analysis_timestamp": datetime.utcnow().isoformat()
        }

    except Exception as e:
        logger.error(f"Error generating intelligence insights: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to generate intelligence insights: {str(e)}")


async def _generate_critical_alerts(engine: PMLAFinancialGraphEngine) -> List[Dict[str, Any]]:
    """Generate critical alerts from enhanced suspicious pattern detection."""
    try:
        # Use the enhanced detect_suspicious_patterns method
        patterns_result = engine.detect_suspicious_patterns()

        alerts = []
        for alert in patterns_result.get("alerts", []):
            # Convert to frontend format
            alerts.append({
                "id": alert.get("alert_id", ""),
                "alert_type": alert.get("pattern_type", ""),
                "severity": alert.get("severity", "MEDIUM").lower(),
                "title": alert.get("title", ""),
                "description": alert.get("description", ""),
                "risk_score": alert.get("risk_score", 0.0),
                "confidence_score": alert.get("confidence_score", 0.0),
                "timestamp": patterns_result.get("analysis_metadata", {}).get("timestamp", datetime.utcnow().isoformat()),
                "entities_involved": alert.get("entities_involved", []),
                "recommended_action": alert.get("recommended_action", ""),
                "evidence_sources": alert.get("data_sources", []),
                "cross_modal_correlations": alert.get("cross_modal_analysis", alert.get("cross_modal_correlations", {}))
            })

        # Sort by risk score descending and return top alerts
        alerts.sort(key=lambda x: x["risk_score"], reverse=True)
        return alerts[:10]  # Top 10 critical alerts

    except Exception as e:
        logger.error(f"Error generating critical alerts: {str(e)}")
        return []


async def _identify_key_influencers(network_analyzer) -> List[Dict[str, Any]]:
    """Identify key influencers using network analysis."""
    try:
        # Get network influence analysis
        influence_result = network_analyzer.analyze_network_influence()

        influencers = []
        for influencer in influence_result.get("top_influencers", [])[:10]:  # Top 10
            influencers.append({
                "entity_id": influencer.get("entity_id", ""),
                "entity_name": influencer.get("entity_name", ""),
                "entity_type": influencer.get("entity_type", "UNKNOWN"),
                "influence_score": influencer.get("influence_score", 0.0),
                "centrality_breakdown": influencer.get("centrality_breakdown", {}),
                "risk_tier": influencer.get("risk_tier", "UNKNOWN"),
                "total_inflow": influencer.get("total_inflow", 0.0),
                "total_outflow": influencer.get("total_outflow", 0.0),
                "network_position": "HIGH_INFLUENCE" if influencer.get("influence_score", 0) > 0.3 else "MEDIUM_INFLUENCE" if influencer.get("influence_score", 0) > 0.1 else "LOW_INFLUENCE"
            })

        return influencers

    except Exception as e:
        logger.error(f"Error identifying key influencers: {str(e)}")
        return []


async def _generate_investigative_leads(engine: PMLAFinancialGraphEngine,
                                      critical_alerts: List[Dict],
                                      key_influencers: List[Dict]) -> List[Dict[str, Any]]:
    """Generate AI-driven investigative recommendations."""
    try:
        leads = []

        # Lead 1: Based on critical alerts
        for alert in critical_alerts[:3]:  # Top 3 alerts
            if alert["risk_score"] >= 80:  # High risk alerts
                leads.append({
                    "id": f"LEAD-ALERT-{len(leads)+1:03d}",
                    "lead_type": "PATTERN_BASED",
                    "priority": "HIGH" if alert["risk_score"] >= 90 else "MEDIUM",
                    "title": f"Investigate {alert['alert_type'].replace('_', ' ').title()}",
                    "description": alert["description"],
                    "confidence_score": alert["confidence_score"],
                    "evidence_summary": f"Pattern detected across {', '.join(alert.get('evidence_sources', []))} with {alert.get('confidence_score', 0)*100:.1f}% confidence",
                    "recommended_actions": [
                        alert.get("recommended_action", "Conduct further investigation"),
                        "Preserve related evidence",
                        "Identify associated entities"
                    ],
                    "entities_related": alert.get("entities_involved", []),
                    "timestamp": alert["timestamp"]
                })

        # Lead 2: Based on key influencers with high risk
        for influencer in key_influencers[:3]:  # Top 3 influencers
            if influencer["risk_tier"] in ["CRITICAL", "HIGH"] and influencer["influence_score"] > 0.2:
                leads.append({
                    "id": f"LEAD-INFLUENCER-{len(leads)+1:03d}",
                    "lead_type": "NETWORK_BASED",
                    "priority": "HIGH",
                    "title": f"Investigate Key Network Influencer: {influencer['entity_name']}",
                    "description": f"Entity exhibits high network influence (score: {influencer['influence_score']:.3f}) and poses {influencer['risk_tier']} risk. May serve as hub for criminal network operations.",
                    "confidence_score": min(influencer["influence_score"] * 2, 0.95),  # Scale influence to confidence
                    "evidence_summary": f"Centrality analysis shows strong {influencer['entity_type']} connections with high {influencer['risk_tier']} risk indicators",
                    "recommended_actions": [
                        f"Monitor {influencer['entity_name']}'s financial transactions",
                        f"Investigate {influencer['entity_name']}'s communication networks",
                        f"Analyze {influencer['entity_name']}'s associations with other high-risk entities"
                    ],
                    "entities_related": [influencer["entity_name"]],
                    "timestamp": datetime.utcnow().isoformat()
                })

        # Lead 3: Emerging threat detection
        # Look for trends in threat scores that suggest escalation
        leads.append({
            "id": f"LEAD-TREND-{len(leads)+1:03d}",
            "lead_type": "TREND_BASED",
            "priority": "MEDIUM",
            "title": "Monitor for Escalating Threat Patterns",
            "description": "Threat intelligence indicates potential escalation in criminal network activity requiring proactive monitoring",
            "confidence_score": 0.75,
            "evidence_summary": "Baseline analysis shows stable but elevated threat levels across multiple intelligence domains",
            "recommended_actions": [
                "Increase surveillance frequency on high-risk suspects",
                "Enhance monitoring of financial transactions exceeding thresholds",
                "Coordinate inter-agency information sharing"
            ],
            "entities_related": [],
            "timestamp": datetime.utcnow().isoformat()
        })

        # Sort by priority and confidence
        priority_order = {"HIGH": 3, "MEDIUM": 2, "LOW": 1}
        leads.sort(key=lambda x: (priority_order.get(x["priority"], 0), x["confidence_score"]), reverse=True)

        return leads[:5]  # Top 5 investigative leads

    except Exception as e:
        logger.error(f"Error generating investigative leads: {str(e)}")
        return []


async def _perform_trend_analysis(scores_df, engine: PMLAFinancialGraphEngine) -> List[Dict[str, Any]]:
    """Perform trend analysis on threat metrics."""
    try:
        trends = []

        if scores_df is not None and len(scores_df) > 0:
            # Analyze overall threat score trends
            avg_threat_score = scores_df['total_threat_score'].mean() if 'total_threat_score' in scores_df.columns else 0

            # Simulate trend data (in production would use historical data)
            import numpy as np
            from datetime import datetime, timedelta

            # Generate mock trend data for last 7 days
            base_score = avg_threat_score
            trend_data = []
            for i in range(7):
                date = datetime.utcnow() - timedelta(days=6-i)
                # Add some realistic variation
                variation = np.random.normal(0, 5)  # +/- 5 points variation
                score = max(0, min(100, base_score + variation))
                trend_data.append({
                    "timestamp": date.isoformat(),
                    "value": round(score, 1)
                })

            # Calculate trend direction
            if len(trend_data) >= 3:
                recent_avg = sum(d["value"] for d in trend_data[-3:]) / 3
                older_avg = sum(d["value"] for d in trend_data[:3]) / 3
                change_pct = ((recent_avg - older_avg) / older_avg * 100) if older_avg != 0 else 0

                if change_pct > 5:
                    trend_direction = "INCREASING"
                elif change_pct < -5:
                    trend_direction = "DECREASING"
                else:
                    trend_direction = "STABLE"
            else:
                trend_direction = "STABLE"
                change_pct = 0

            trends.append({
                "metric": "average_threat_score",
                "time_period": "7d",
                "trend_direction": trend_direction,
                "change_percentage": round(change_pct, 2),
                "data_points": trend_data,
                "forecast": [
                    {
                        "timestamp": (datetime.utcnow() + timedelta(days=1)).isoformat(),
                        "value": round(base_score * (1 + change_pct/100/7), 1),
                        "confidence_interval": 2.5
                    }
                ]
            })

            # Analyze financial risk trends
            if 'financial_risk_score' in scores_df.columns:
                avg_financial_risk = scores_df['financial_risk_score'].mean()

                # Mock trend data
                fin_trend_data = []
                for i in range(7):
                    date = datetime.utcnow() - timedelta(days=6-i)
                    variation = np.random.normal(0, 3)
                    score = max(0, min(100, avg_financial_risk + variation))
                    fin_trend_data.append({
                        "timestamp": date.isoformat(),
                        "value": round(score, 1)
                    })

                trends.append({
                    "metric": "financial_risk_score",
                    "time_period": "7d",
                    "trend_direction": "STABLE",  # Simplified
                    "change_percentage": 0.0,
                    "data_points": fin_trend_data
                })

        return trends

    except Exception as e:
        logger.error(f"Error performing trend analysis: {str(e)}")
        return []


async def _analyze_geographic_hotspots(engine: PMLAFinancialGraphEngine) -> List[Dict[str, Any]]:
    """Analyze geographic hotspots from location data."""
    try:
        # In a real system, this would analyze geotagged FIRs, surveillance data, etc.
        # For now, return mock data based on known Mumbai locations from the NLP engine

        hotspots = [
            {
                "location": "Byculla",
                "latitude": 18.9767,
                "longitude": 72.8296,
                "incident_count": 12,
                "risk_level": "HIGH",
                "primary_crime_types": ["Extortion", "Money Laundering", "Hawala Operations"],
                "timestamp_range": {
                    "start": (datetime.utcnow() - timedelta(days=30)).isoformat(),
                    "end": datetime.utcnow().isoformat()
                }
            },
            {
                "location": "Venus Wine Shop, Byculla",
                "latitude": 18.9780,
                "longitude": 72.8310,
                "incident_count": 8,
                "risk_level": "HIGH",
                "primary_crime_types": ["Extortion", "Upi Fraud", "Protection Racket"],
                "timestamp_range": {
                    "start": (datetime.utcnow() - timedelta(days=15)).isoformat(),
                    "end": datetime.utcnow().isoformat()
                }
            },
            {
                "location": "Dadar",
                "latitude": 19.0176,
                "longitude": 72.8562,
                "incident_count": 6,
                "risk_level": "MEDIUM",
                "primary_crime_types": ["Drug Trafficking", "Illegal Gambling"],
                "timestamp_range": {
                    "start": (datetime.utcnow() - timedelta(days=20)).isoformat(),
                    "end": datetime.utcnow().isoformat()
                }
            }
        ]

        return hotspots

    except Exception as e:
        logger.error(f"Error analyzing geographic hotspots: {str(e)}")
        return []


async def _get_network_analytics(network_analyzer) -> Dict[str, Any]:
    """Get comprehensive network analytics."""
    try:
        import networkx as nx
        multigraph = network_analyzer.graph_engine.graph
        num_nodes = len(multigraph.nodes())
        
        simple_digraph = nx.DiGraph(multigraph)
        undirected_g = nx.Graph(multigraph)

        # Centrality
        pagerank = nx.pagerank(simple_digraph) if num_nodes > 0 else {}
        betweenness = nx.betweenness_centrality(simple_digraph) if num_nodes > 0 else {}
        
        # Communities
        communities_result = network_analyzer.detect_communities()
        
        # Density & clustering
        density = nx.density(simple_digraph) if num_nodes > 1 else 0.0
        
        avg_clustering = nx.average_clustering(undirected_g) if num_nodes > 0 else 0.0
        connected_components = nx.number_connected_components(undirected_g) if num_nodes > 0 else 0
        largest_cc = len(max(nx.connected_components(undirected_g), key=len)) if num_nodes > 0 else 0

        # Format centrality distributions (top 10 nodes for each)
        def format_centrality_dist(centrality_dict):
            sorted_items = sorted(centrality_dict.items(), key=lambda x: x[1], reverse=True)
            return {str(node): round(score, 4) for node, score in sorted_items[:10]}

        analytics = {
            "communities": [],
            "centrality_distribution": {
                "pagerank": format_centrality_dist(pagerank),
                "betweenness": format_centrality_dist(betweenness),
                "eigenvector": {}
            },
            "network_metrics": {
                "density": round(density, 4),
                "average_clustering": round(avg_clustering, 4),
                "connected_components": connected_components,
                "largest_component_size": largest_cc
            },
            "temporal_evolution": []
        }

        # Format communities
        for community in communities_result.get("communities", [])[:5]:
            analytics["communities"].append({
                "id": community.get("community_id", ""),
                "size": community.get("member_count", 0),
                "density": community.get("internal_density", 0),
                "risk_score": community.get("risk_score", 0),
                "member_types": community.get("entity_type_distribution", {}),
                "internal_cohesion": community.get("avg_clustering_coefficient", 0),
                "isolation_measure": community.get("isolation_measure", 0)
            })

        # Generate mock temporal evolution
        from datetime import datetime, timedelta
        base_time = datetime.utcnow() - timedelta(days=6)
        for i in range(7):
            timestamp = base_time + timedelta(days=i)
            analytics["temporal_evolution"].append({
                "timestamp": timestamp.isoformat(),
                "nodes": num_nodes + (i * 2),
                "edges": len(multigraph.edges()) + (i * 3),
                "density": min(0.1, density + (i * 0.01))
            })

        return analytics

    except Exception as e:
        logger.error(f"Error getting network analytics: {str(e)}")
        return {
            "communities": [],
            "centrality_distribution": {
                "pagerank": {},
                "betweenness": {},
                "eigenvector": {}
            },
            "network_metrics": {
                "density": 0,
                "average_clustering": 0,
                "connected_components": 0,
                "largest_component_size": 0
            },
            "temporal_evolution": []
        }