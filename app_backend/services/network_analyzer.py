"""
app_backend/services/network_analyzer.py
----------------------------------------
Network Analyzer Service for advanced graph analysis and insight generation.
Provides key influencer identification, community detection, temporal analysis,
and anomaly detection for criminal network intelligence.
"""

import logging
import numpy as np
import networkx as nx
from typing import Dict, List, Any, Optional, Tuple
from collections import defaultdict, Counter
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class NetworkAnalyzer:
    """
    Advanced network analyzer for criminal intelligence networks.
    Provides insights beyond basic threat scores including:
    - Key influencer identification (centrality-based)
    - Community detection (criminal cells/cliques)
    - Temporal pattern analysis
    - Anomaly detection
    """

    def __init__(self, graph_engine):
        """
        Initialize network analyzer with a graph engine.

        Args:
            graph_engine: Instance of PMLAFinancialGraphEngine or similar
        """
        self.graph_engine = graph_engine
        self.logger = logging.getLogger(f"{__name__}.{self.__class__.__name__}")

    def analyze_network_influence(self) -> Dict[str, Any]:
        """
        Perform comprehensive network influence analysis using multiple centrality measures.

        Returns:
            Dictionary containing influence rankings and key insights
        """
        try:
            # Get the base graph
            graph = self.graph_engine.graph
            if len(graph.nodes()) == 0:
                return {"error": "Graph is empty", "influencers": []}

            # Calculate multiple centrality measures
            pagerank = nx.pagerank(graph, weight='weight') if nx.is_weighted(graph) else nx.pagerank(graph)
            betweenness = nx.betweenness_centrality(graph, weight='weight') if nx.is_weighted(graph) else nx.betweenness_centrality(graph)

            # Degree centrality (weighted and unweighted)
            degree_centrality = nx.degree_centrality(graph)
            weighted_degree = dict(graph.degree(weight='weight')) if nx.is_weighted(graph) else degree_centrality

            # Closeness centrality (for connected components)
            try:
                closeness = nx.closeness_centrality(graph, distance='weight') if nx.is_weighted(graph) else nx.closeness_centrality(graph)
            except:
                closeness = {n: 0.0 for n in graph.nodes()}

            # Eigenvector centrality
            try:
                eigenvector = nx.eigenvector_centrality(graph, weight='weight', max_iter=1000) if nx.is_weighted(graph) else nx.eigenvector_centrality(graph, max_iter=1000)
            except Exception:
                eigenvector = {n: 0.0 for n in graph.nodes()}

            # Combine scores into influence metric
            influencers = []
            for node in graph.nodes():
                node_data = graph.nodes[node]

                # Normalize each centrality measure to 0-1 scale
                pr_score = pagerank.get(node, 0)
                bet_score = betweenness.get(node, 0)
                deg_score = degree_centrality.get(node, 0)
                wdeg_score = weighted_degree.get(node, 0) / max(weighted_degree.values()) if max(weighted_degree.values()) > 0 else 0
                close_score = closeness.get(node, 0)
                eig_score = eigenvector.get(node, 0)

                # Weighted influence score (can be adjusted based on domain knowledge)
                influence_score = (
                    0.30 * pr_score +      # PageRank - global influence
                    0.25 * bet_score +     # Betweenness - brokerage power
                    0.20 * deg_score +     # Degree - connectivity
                    0.10 * wdeg_score +    # Weighted degree - financial flow
                    0.10 * close_score +   # Closeness - information spread
                    0.05 * eig_score       # Eigenvector - connection to influential nodes
                )

                influencers.append({
                    "entity_id": node,
                    "entity_name": node_data.get('name', 'Unknown'),
                    "entity_type": node_data.get('entity_type', 'UNKNOWN'),
                    "influence_score": round(influence_score, 4),
                    "centrality_breakdown": {
                        "pagerank": round(pr_score, 4),
                        "betweenness": round(bet_score, 4),
                        "degree_centrality": round(deg_score, 4),
                        "weighted_degree": round(wdeg_score, 4),
                        "closeness": round(close_score, 4),
                        "eigenvector": round(eig_score, 4)
                    },
                    "risk_tier": node_data.get('pmla_risk_tier', 'UNKNOWN'),
                    "total_inflow": sum(ed.get('amount_inr', 0) for _, _, ed in graph.in_edges(node, data=True)
                                      if ed.get('edge_type') == "TRANSFERRED_TO" and ed.get('status') == "SUCCESS"),
                    "total_outflow": sum(ed.get('amount_inr', 0) for _, _, ed in graph.out_edges(node, data=True)
                                       if ed.get('edge_type') == "TRANSFERRED_TO" and ed.get('status') == "SUCCESS")
                })

            # Sort by influence score descending
            influencers.sort(key=lambda x: x['influence_score'], reverse=True)

            # Calculate network statistics
            network_stats = self._calculate_network_statistics(graph)

            return {
                "analysis_timestamp": datetime.utcnow().isoformat(),
                "total_entities_analyzed": len(influencers),
                "top_influencers": influencers[:20],  # Top 20 influencers
                "network_statistics": network_stats,
                "key_insights": self._generate_network_insights(influencers[:10], network_stats)
            }

        except Exception as e:
            self.logger.error(f"Error in network influence analysis: {str(e)}", exc_info=True)
            return {"error": str(e), "influencers": []}

    def detect_communities(self) -> Dict[str, Any]:
        """
        Detect communities/criminal clusters in the network using multiple algorithms.

        Returns:
            Dictionary containing detected communities and their characteristics
        """
        try:
            graph = self.graph_engine.graph
            if len(graph.nodes()) == 0:
                return {"error": "Graph is empty", "communities": []}

            communities = []

            # Convert to undirected for community detection algorithms
            undirected_graph = graph.to_undirected()

            # Algorithm 1: Greedy Modularity Maximization (Louvain method)
            try:
                import community as community_louvain  # python-louvain
                louvain_partition = community_louvain.best_partition(undirected_graph, weight='weight' if nx.is_weighted(undirected_graph) else None)

                # Group nodes by community
                louvain_groups = defaultdict(list)
                for node, community_id in louvain_partition.items():
                    louvain_groups[community_id].append(node)

                for community_id, nodes in louvain_groups.items():
                    if len(nodes) >= 2:  # Only include communities with 2+ members
                        community_data = self._analyze_community(nodes, "Louvain")
                        if community_data:
                            communities.append(community_data)
            except ImportError:
                self.logger.warning("python-louvain not available, skipping Louvain community detection")
            except Exception as e:
                self.logger.warning(f"Louvain community detection failed: {str(e)}")

            # Algorithm 2: Label Propagation
            try:
                label_prop_communities = list(nx.community.label_propagation_communities(undirected_graph))
                for i, nodes in enumerate(label_prop_communities):
                    if len(nodes) >= 2:
                        community_data = self._analyze_community(list(nodes), "Label Propagation")
                        if community_data:
                            communities.append(community_data)
            except Exception as e:
                self.logger.warning(f"Label propagation community detection failed: {str(e)}")

            # Algorithm 3: Greedy Modularity Communities
            try:
                greedy_communities = list(nx.community.greedy_modularity_communities(undirected_graph, weight='weight' if nx.is_weighted(undirected_graph) else None))
                for i, nodes in enumerate(greedy_communities):
                    if len(nodes) >= 2:
                        community_data = self._analyze_community(list(nodes), "Greedy Modularity")
                        if community_data:
                            communities.append(community_data)
            except Exception as e:
                self.logger.warning(f"Greedy modularity community detection failed: {str(e)}")

            # Deduplicate communities (simple approach based on node overlap)
            unique_communities = self._deduplicate_communities(communities)

            return {
                "analysis_timestamp": datetime.utcnow().isoformat(),
                "total_communities_detected": len(unique_communities),
                "communities": sorted(unique_communities, key=lambda x: x['risk_score'], reverse=True),
                "community_statistics": self._calculate_community_statistics(unique_communities)
            }

        except Exception as e:
            self.logger.error(f"Error in community detection: {str(e)}", exc_info=True)
            return {"error": str(e), "communities": []}

    def analyze_temporal_patterns(self, time_window_days: int = 30) -> Dict[str, Any]:
        """
        Analyze temporal patterns in criminal activities.

        Args:
            time_window_days: Number of days to look back for analysis

        Returns:
            Dictionary containing temporal analysis results
        """
        try:
            graph = self.graph_engine.graph
            cutoff_date = datetime.utcnow() - timedelta(days=time_window_days)

            # Extract timestamped transactions
            temporal_edges = []
            for u, v, k, data in graph.edges(keys=True, data=True):
                if data.get('edge_type') == "TRANSFERRED_TO" and data.get('status') == "SUCCESS":
                    timestamp_str = data.get('timestamp', '')
                    if timestamp_str:
                        try:
                            # Try various timestamp formats
                            for fmt in ['%Y-%m-%d %H:%M:%S', '%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S', '%Y-%m-%d']:
                                try:
                                    edge_time = datetime.strptime(timestamp_str, fmt)
                                    if edge_time >= cutoff_date:
                                        temporal_edges.append((u, v, edge_time, data))
                                    break
                                except ValueError:
                                    continue
                        except:
                            pass  # Skip edges with unparseable timestamps

            if not temporal_edges:
                return {"error": "No temporal data available for analysis", "patterns": []}

            # Analyze patterns by time buckets
            patterns = []

            # Hourly patterns (circadian rhythm)
            hourly_activity = defaultdict(float)
            for u, v, timestamp, data in temporal_edges:
                hour = timestamp.hour
                amount = data.get('amount_inr', 0)
                hourly_activity[hour] += amount

            peak_hour = max(hourly_activity.items(), key=lambda x: x[1]) if hourly_activity else (0, 0)

            # Daily patterns
            daily_activity = defaultdict(float)
            for u, v, timestamp, data in temporal_edges:
                day_key = timestamp.strftime('%Y-%m-%d')
                amount = data.get('amount_inr', 0)
                daily_activity[day_key] += amount

            # Weekly patterns
            weekly_activity = defaultdict(float)
            for u, v, timestamp, data in temporal_edges:
                week_key = timestamp.strftime('%Y-W%U')
                amount = data.get('amount_inr', 0)
                weekly_activity[week_key] += amount

            # Calculate burstiness (coefficient of variation of inter-event times)
            if len(temporal_edges) >= 2:
                timestamps_sorted = sorted([edge[2] for edge in temporal_edges])
                intervals = [(timestamps_sorted[i+1] - timestamps_sorted[i]).total_seconds()
                           for i in range(len(timestamps_sorted)-1)]

                if intervals:
                    mean_interval = np.mean(intervals)
                    std_interval = np.std(intervals)
                    burstiness = std_interval / mean_interval if mean_interval > 0 else 0
                else:
                    burstiness = 0
            else:
                burstiness = 0

            # Detect anomalous time periods (significant deviations from average)
            if len(daily_activity) >= 7:  # Need at least a week of data
                daily_values = list(daily_activity.values())
                mean_daily = np.mean(daily_values)
                std_daily = np.std(daily_values)

                anomalous_days = []
                for day, amount in daily_activity.items():
                    z_score = abs(amount - mean_daily) / std_daily if std_daily > 0 else 0
                    if z_score > 2.0:  # More than 2 standard deviations from mean
                        anomalous_days.append({
                            "date": day,
                            "amount": round(amount, 2),
                            "z_score": round(z_score, 2),
                            "deviation_type": "high" if amount > mean_daily else "low"
                        })
            else:
                anomalous_days = []

            patterns.append({
                "pattern_type": "circadian_rhythm",
                "description": "Daily activity pattern showing peak criminal transaction hours",
                "peak_hour": int(peak_hour[0]),
                "peak_hour_amount": round(peak_hour[1], 2),
                "hourly_distribution": {str(h): round(amount, 2) for h, amount in sorted(hourly_activity.items())}
            })

            patterns.append({
                "pattern_type": "burstiness_analysis",
                "description": "Measure of temporal clustering in criminal activities",
                "burstiness_score": round(burstiness, 3),
                "interpretation": "Burstiness > 1 indicates clustered/temporal criminal activity"
            })

            if anomalous_days:
                patterns.append({
                    "pattern_type": "anomalous_temporal_activity",
                    "description": "Days with significantly unusual transaction volumes",
                    "anomalous_days": anomalous_days[:10]  # Top 10 anomalous days
                })

            return {
                "analysis_timestamp": datetime.utcnow().isoformat(),
                "time_window_days": time_window_days,
                "total_transactions_analyzed": len(temporal_edges),
                "date_range": {
                    "start": cutoff_date.isoformat(),
                    "end": datetime.utcnow().isoformat()
                },
                "temporal_patterns": patterns,
                "summary_statistics": {
                    "total_volume_analyzed": round(sum(data.get('amount_inr', 0) for _, _, _, data in temporal_edges), 2),
                    "avg_transaction_amount": round(np.mean([data.get('amount_inr', 0) for _, _, _, data in temporal_edges]), 2) if temporal_edges else 0,
                    "transaction_frequency_per_day": round(len(temporal_edges) / time_window_days, 2) if time_window_days > 0 else 0
                }
            }

        except Exception as e:
            self.logger.error(f"Error in temporal pattern analysis: {str(e)}", exc_info=True)
            return {"error": str(e), "patterns": []}

    def detect_anomalies(self) -> Dict[str, Any]:
        """
        Detect anomalous behaviors and patterns in the network.

        Returns:
            Dictionary containing detected anomalies
        """
        try:
            graph = self.graph_engine.graph
            if len(graph.nodes()) == 0:
                return {"error": "Graph is empty", "anomalies": []}

            anomalies = []

            # Anomaly 1: Sudden wealth increase (disproportionate inflow vs historical baseline)
            wealth_anomalies = self._detect_wealth_anomalies(graph)
            anomalies.extend(wealth_anomalies)

            # Anomaly 2: Unusual communication patterns
            comm_anomalies = self._detect_communication_anomalies(graph)
            anomalies.extend(comm_anomalies)

            # Anomaly 3: Structural holes and unexpected brokerage
            brokerage_anomalies = self._detect_brokerage_anomalies(graph)
            anomalies.extend(brokerage_anomalies)

            # Anomaly 4: Isolated high-value nodes
            isolation_anomalies = self._detect_isolation_anomalies(graph)
            anomalies.extend(isolation_anomalies)

            # Sort anomalies by severity/score
            anomalies.sort(key=lambda x: x.get('anomaly_score', 0), reverse=True)

            return {
                "analysis_timestamp": datetime.utcnow().isoformat(),
                "total_anomalies_detected": len(anomalies),
                "anomalies": anomalies[:20],  # Top 20 anomalies
                "anomaly_summary": self._summarize_anomalies(anomalies)
            }

        except Exception as e:
            self.logger.error(f"Error in anomaly detection: {str(e)}", exc_info=True)
            return {"error": str(e), "anomalies": []}

    def _calculate_network_statistics(self, graph) -> Dict[str, Any]:
        """Calculate basic network statistics."""
        try:
            return {
                "node_count": graph.number_of_nodes(),
                "edge_count": graph.number_of_edges(),
                "density": nx.density(graph),
                "average_clustering": nx.average_clustering(graph.to_undirected()) if graph.number_of_nodes() > 2 else 0,
                "number_of_connected_components": nx.number_connected_components(graph.to_undirected()),
                "has_weakly_connected_components": nx.number_weakly_connected_components(graph) if nx.is_directed(graph) else 0
            }
        except:
            return {"error": "Could not calculate network statistics"}

    def _analyze_community(self, nodes: List[Any], algorithm: str) -> Optional[Dict[str, Any]]:
        """Analyze a single community/subgraph."""
        try:
            if len(nodes) < 2:
                return None

            subgraph = self.graph_engine.graph.subgraph(nodes)

            # Calculate community characteristics
            total_value = 0
            entity_types = Counter()
            risk_levels = Counter()
            member_details = []

            for node in nodes:
                node_data = self.graph_engine.graph.nodes[node]
                entity_types[node_data.get('entity_type', 'UNKNOWN')] += 1
                risk_levels[node_data.get('pmla_risk_tier', 'UNKNOWN')] += 1

                # Calculate financial flow through this node
                inflow = sum(ed.get('amount_inr', 0) for _, _, ed in self.graph_engine.graph.in_edges(node, data=True)
                          if ed.get('edge_type') == "TRANSFERRED_TO" and ed.get('status') == "SUCCESS")
                outflow = sum(ed.get('amount_inr', 0) for _, _, ed in self.graph_engine.graph.out_edges(node, data=True)
                           if ed.get('edge_type') == "TRANSFERRED_TO" and ed.get('status') == "SUCCESS")
                total_value += inflow + outflow

                member_details.append({
                    "entity_id": node,
                    "entity_name": node_data.get('name', 'Unknown'),
                    "entity_type": node_data.get('entity_type', 'UNKNOWN'),
                    "risk_tier": node_data.get('pmla_risk_tier', 'UNKNOWN'),
                    "financial_flow": round(inflow + outflow, 2)
                })

            # Calculate internal density
            internal_edges = subgraph.number_of_edges()
            max_possible_edges = len(nodes) * (len(nodes) - 1) / 2 if not nx.is_directed(subgraph) else len(nodes) * (len(nodes) - 1)
            internal_density = internal_edges / max_possible_edges if max_possible_edges > 0 else 0

            # Risk score based on member risk levels and financial activity
            risk_weights = {"CRITICAL": 4, "HIGH": 3, "MODERATE": 2, "LOW": 1, "UNKNOWN": 0}
            weighted_risk_sum = sum(risk_weights.get(risk, 0) * count for risk, count in risk_levels.items())
            avg_risk = weighted_risk_sum / len(nodes) if len(nodes) > 0 else 0

            # Financial activity score
            financial_score = min(total_value / 1000000, 10)  # Normalize to 0-10 scale (10M+ = max score)

            # Combine for overall community risk score
            risk_score = min((avg_risk * 2.5) + (financial_score * 0.5), 10)  # Scale to 0-10

            return {
                "community_id": f"{algorithm}_{len(nodes)}_{datetime.now().strftime('%H%M%S')}",
                "detection_algorithm": algorithm,
                "member_count": len(nodes),
                "total_financial_flow": round(total_value, 2),
                "internal_density": round(internal_density, 3),
                "average_risk_level": round(avg_risk, 1),
                "risk_score": round(risk_score, 1),
                "entity_type_distribution": dict(entity_types),
                "risk_level_distribution": dict(risk_levels),
                "members": member_details[:10],  # Limit to top 10 members for brevity
                "isolation_measure": self._calculate_community_isolation(nodes)
            }
        except Exception as e:
            self.logger.warning(f"Error analyzing community: {str(e)}")
            return None

    def _calculate_community_isolation(self, nodes: List[Any]) -> float:
        """Calculate how isolated a community is from the rest of the network."""
        try:
            graph = self.graph_engine.graph
            node_set = set(nodes)

            # Count edges going out of the community
            external_edges = 0
            total_edges = 0

            for node in nodes:
                for _, neighbor, data in graph.out_edges(node, data=True):
                    total_edges += 1
                    if neighbor not in node_set:
                        external_edges += 1
                for _, neighbor, data in graph.in_edges(node, data=True):
                    total_edges += 1
                    if neighbor not in node_set:
                        external_edges += 1

            # Isolation ratio: 0 = fully integrated, 1 = completely isolated
            isolation_ratio = external_edges / total_edges if total_edges > 0 else 0
            return round(isolation_ratio, 3)
        except:
            return 0.0

    def _deduplicate_communities(self, communities: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Remove duplicate communities based on significant member overlap."""
        if len(communities) <= 1:
            return communities

        unique_communities = []
        for community in communities:
            is_duplicate = False
            community_members = set(member['entity_id'] for member in community.get('members', []))

            for existing in unique_communities:
                existing_members = set(member['entity_id'] for member in existing.get('members', []))

                # Calculate Jaccard similarity
                intersection = len(community_members & existing_members)
                union = len(community_members | existing_members)
                similarity = intersection / union if union > 0 else 0

                if similarity > 0.7:  # 70% overlap threshold
                    is_duplicate = True
                    break

            if not is_duplicate:
                unique_communities.append(community)

        return unique_communities

    def _calculate_community_statistics(self, communities: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate statistics across all detected communities."""
        if not communities:
            return {"total_communities": 0}

        total_members = sum(c['member_count'] for c in communities)
        avg_size = total_members / len(communities) if len(communities) > 0 else 0

        risk_distribution = Counter()
        for community in communities:
            risk_level = community.get('average_risk_level', 'UNKNOWN')
            risk_distribution[risk_level] += 1

        return {
            "total_communities": len(communities),
            "average_community_size": round(avg_size, 1),
            "largest_community": max((c['member_count'] for c in communities), default=0),
            "risk_level_distribution": dict(risk_distribution),
            "communities_with_high_risk": len([c for c in communities if c.get('risk_score', 0) >= 7.0])
        }

    def _generate_network_insights(self, top_influencers: List[Dict], network_stats: Dict) -> List[Dict[str, Any]]:
        """Generate actionable insights from network analysis."""
        insights = []

        if not top_influencers:
            return insights

        # Insight 1: Single point of failure
        top_influencer = top_influencers[0]
        if top_influencer['influence_score'] > 0.3:  # Significant influence
            insights.append({
                "insight_type": "single_point_of_failure",
                "priority": "HIGH",
                "title": "Centralized Network Control Detected",
                "description": f"Entity '{top_influencer['entity_name']}' exerts disproportionate influence over the network (influence score: {top_influencer['influence_score']:.3f}). Targeting this entity could significantly disrupt network operations.",
                "entity": top_influencer['entity_name'],
                "recommended_action": f"Prioritize investigation of {top_influencer['entity_name']} for network disruption potential"
            })

        # Insight 2: Network fragmentation
        num_components = network_stats.get('number_of_connected_components', 0)
        if num_components > 1:
            insights.append({
                "insight_type": "network_fragmentation",
                "priority": "MEDIUM",
                "title": "Fragmented Network Structure",
                "description": f"Network consists of {num_components} disconnected components, suggesting possible operational specialization or compartmentalization.",
                "component_count": num_components,
                "recommended_action": "Investigate each component separately to understand specialized functions"
            })

        # Insight 3: High clustering coefficient (clique formation)
        clustering = network_stats.get('average_clustering', 0)
        if clustering > 0.3:
            insights.append({
                "insight_type": "clique_formation",
                "priority": "MEDIUM",
                "title": "Tight-Knit Criminal Cliques Detected",
                "description": f"High clustering coefficient ({clustering:.3f}) indicates tightly interconnected groups that may represent specialized criminal cells.",
                "clustering_coefficient": round(clustering, 3),
                "recommended_action": "Focus on breaking internal trust relationships within identified cliques"
            })

        return insights

    # Anomaly detection helper methods
    def _detect_wealth_anomalies(self, graph) -> List[Dict[str, Any]]:
        """Detect sudden wealth increases or unexplained affluence."""
        anomalies = []
        try:
            for node in graph.nodes():
                node_data = graph.nodes[node]
                inflow = sum(ed.get('amount_inr', 0) for _, _, ed in graph.in_edges(node, data=True)
                          if ed.get('edge_type') == "TRANSFERRED_TO" and ed.get('status') == "SUCCESS")
                declared_income = float(node_data.get('declared_income_inr', 0) or 0)

                # Avoid division by zero
                if declared_income > 0:
                    wealth_ratio = inflow / declared_income if declared_income > 0 else float('inf')
                    if wealth_ratio > 100:  # Wealth is 100x declared income
                        anomalies.append({
                            "anomaly_type": "UNEXPLAINED_WEALTH",
                            "entity_id": node,
                            "entity_name": node_data.get('name', 'Unknown'),
                            "anomaly_score": min(wealth_ratio / 10, 10),  # Cap at 10
                            "description": f"Financial inflow ({round(inflow,2)}) vastly exceeds declared income ({round(declared_income,2)})",
                            "financial_inflow": round(inflow, 2),
                            "declared_income": round(declared_income, 2),
                            "wealth_ratio": round(wealth_ratio, 1)
                        })
        except Exception as e:
            self.logger.warning(f"Wealth anomaly detection failed: {str(e)}")
        return anomalies

    def _detect_communication_anomalies(self, graph) -> List[Dict[str, Any]]:
        """Detect unusual communication patterns."""
        anomalies = []
        try:
            # Calculate communication degrees for all nodes
            comm_degrees = {}
            for node in graph.nodes():
                comm_degree = sum(1 for _, _, ed in graph.out_edges(node, data=True)
                                if ed.get('edge_type') in ['COMMUNICATES_WITH', 'CONTACTS'])
                comm_degrees[node] = comm_degree

            if comm_degrees:
                mean_comm = np.mean(list(comm_degrees.values()))
                std_comm = np.std(list(comm_degrees.values()))

                for node, degree in comm_degrees.items():
                    if std_comm > 0 and degree > mean_comm + (2 * std_comm):  # 2 sigma outlier
                        node_data = graph.nodes[node]
                        anomalies.append({
                            "anomaly_type": "UNUSUAL_COMMUNICATION_PATTERN",
                            "entity_id": node,
                            "entity_name": node_data.get('name', 'Unknown'),
                            "anomaly_score": min((degree - mean_comm) / std_comm, 10),
                            "description": f"Communication degree ({degree}) significantly above average ({mean_comm:.1f})",
                            "communication_degree": degree,
                            "average_communication": round(mean_comm, 1),
                            "deviation_sigma": round((degree - mean_comm) / std_comm, 1)
                        })
        except Exception as e:
            self.logger.warning(f"Communication anomaly detection failed: {str(e)}")
        return anomalies

    def _detect_brokerage_anomalies(self, graph) -> List[Dict[str, Any]]:
        """Detect nodes with unusual brokerage potential."""
        anomalies = []
        try:
            # Calculate brokerage scores
            betweenness = nx.betweenness_centrality(graph, weight='weight' if nx.is_weighted(graph) else None)
            degree = dict(graph.degree())

            for node in graph.nodes():
                bet_score = betweenness.get(node, 0)
                deg_score = degree.get(node, 0)

                # High brokerage with low degree = unusual connector
                if deg_score > 0:
                    brokerage_ratio = bet_score / deg_score
                    if brokerage_ratio > 0.5:  # High brokerage relative to connections
                        node_data = graph.nodes[node]
                        anomalies.append({
                            "anomaly_type": "UNUSUAL_BROKERAGE_ROLE",
                            "entity_id": node,
                            "entity_name": node_data.get('name', 'Unknown'),
                            "anomaly_score": min(brokerage_ratio * 2, 10),
                            "description": f"Entity acts as unexpected broker ({brokerage_ratio:.2f}) with limited connections ({deg_score})",
                            "betweenness_centrality": round(bet_score, 4),
                            "degree_centrality": deg_score,
                            "brokerage_ratio": round(brokerage_ratio, 3)
                        })
        except Exception as e:
            self.logger.warning(f"Brokerage anomaly detection failed: {str(e)}")
        return anomalies

    def _detect_isolation_anomalies(self, graph) -> List[Dict[str, Any]]:
        """Detect isolated high-value nodes."""
        anomalies = []
        try:
            for node in graph.nodes():
                node_data = graph.nodes[node]
                # Calculate financial significance
                inflow = sum(ed.get('amount_inr', 0) for _, _, ed in graph.in_edges(node, data=True)
                          if ed.get('edge_type') == "TRANSFERRED_TO" and ed.get('status') == "SUCCESS")
                outflow = sum(ed.get('amount_inr', 0) for _, _, ed in graph.out_edges(node, data=True)
                           if ed.get('edge_type') == "TRANSFERRED_TO" and ed.get('status') == "SUCCESS")
                total_flow = inflow + outflow

                # Calculate connectivity
                connections = graph.degree(node)

                # High value but low connectivity = suspicious
                if total_flow > 1000000 and connections <= 1:  # High flow but isolated
                    node_data = graph.nodes[node]
                    anomalies.append({
                        "anomaly_type": "ISOLATED_HIGH_VALUE_NODE",
                        "entity_id": node,
                        "entity_name": node_data.get('name', 'Unknown'),
                        "anomaly_score": min(total_flow / 100000, 10),  # Scale flow to score
                        "description": f"High financial value ({round(total_flow,2)}) with minimal connections ({connections})",
                        "total_financial_flow": round(total_flow, 2),
                        "connection_count": connections,
                        "isolation_level": "HIGH" if connections == 0 else "MEDIUM"
                    })
        except Exception as e:
            self.logger.warning(f"Isolation anomaly detection failed: {str(e)}")
        return anomalies

    def _summarize_anomalies(self, anomalies: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Summarize detected anomalies by type and severity."""
        if not anomalies:
            return {"total_anomalies": 0}

        anomaly_types = Counter()
        severity_levels = {"HIGH": 0, "MEDIUM": 0, "LOW": 0}

        for anomaly in anomalies:
            anomaly_type = anomaly.get('anomaly_type', 'UNKNOWN')
            anomaly_types[anomaly_type] += 1

            score = anomaly.get('anomaly_score', 0)
            if score >= 7:
                severity_levels["HIGH"] += 1
            elif score >= 4:
                severity_levels["MEDIUM"] += 1
            else:
                severity_levels["LOW"] += 1

        return {
            "total_anomalies": len(anomalies),
            "anomaly_type_distribution": dict(anomaly_types),
            "severity_distribution": dict(severity_levels),
            "highest_risk_anomaly": max(anomalies, key=lambda x: x.get('anomaly_score', 0)) if anomalies else None
        }

# Convenience function for easy instantiation
def create_network_analyzer(graph_engine) -> NetworkAnalyzer:
    """
    Factory function to create a NetworkAnalyzer instance.

    Args:
        graph_engine: Instance of PMLAFinancialGraphEngine or similar

    Returns:
        NetworkAnalyzer instance
    """
    return NetworkAnalyzer(graph_engine)