"""
app_backend/services/ml_threat_scorer.py
----------------------------------------
Machine Learning Threat Scoring Service for hybrid threat intelligence.
Implements ML-enhanced threat scoring with feature engineering, model training,
and hybrid scoring combining rule-based and ML approaches.
"""

import os
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any, Optional, Tuple, List
from datetime import datetime, timedelta
import logging
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
import warnings
warnings.filterwarnings('ignore')

from intelligence_engine import IntelligenceEngine
from pmla_financial_graph_engine import PMLAFinancialGraphEngine
from app_backend.services.nlp_service import parse_fir_narrative, FIRNLPRequest
from app_backend.schemas.nlp import FIRNLPResponse

logger = logging.getLogger(__name__)

class MLThreatScorer:
    """Machine Learning enhanced threat scorer with hybrid scoring capabilities."""

    def __init__(self, model_path: str = None):
        """
        Initialize ML Threat Scorer.

        Args:
            model_path: Path to saved model file. If None, uses default location.
        """
        self.engine = IntelligenceEngine()
        self.pmla_engine = PMLAFinancialGraphEngine()
        self.model_path = model_path or os.path.join(
            os.path.dirname(__file__),
            '..',
            'models',
            'threat_scorer_model.pkl'
        )
        self.scaler_path = model_path.replace('model.pkl', 'scaler.pkl') if model_path else \
                          os.path.join(
                              os.path.dirname(__file__),
                              '..',
                              'models',
                              'feature_scaler.pkl'
                          )

        # Create models directory if it doesn't exist
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)

        # Initialize ML components
        self.model = None
        self.scaler = StandardScaler()
        self.feature_names = []
        self.is_trained = False

        # Try to load existing model
        self._load_model()

    def _load_model(self):
        """Load pre-trained model and scaler if they exist."""
        try:
            if os.path.exists(self.model_path) and os.path.exists(self.scaler_path):
                self.model = joblib.load(self.model_path)
                self.scaler = joblib.load(self.scaler_path)
                self.is_trained = True
                logger.info(f"Loaded ML threat scoring model from {self.model_path}")
            else:
                logger.info("No pre-trained model found. Will train on first use.")
        except Exception as e:
            logger.warning(f"Failed to load ML model: {e}. Will train new model.")
            self.model = None
            self.is_trained = False

    def _save_model(self):
        """Save model and scaler to disk."""
        try:
            joblib.dump(self.model, self.model_path)
            joblib.dump(self.scaler, self.scaler_path)
            logger.info(f"Saved ML threat scoring model to {self.model_path}")
        except Exception as e:
            logger.error(f"Failed to save ML model: {e}")

    def engineer_features(self, suspect_name: str) -> Dict[str, Any]:
        """
        Engineer features for ML threat scoring from multiple data sources.

        Features include:
        1. Temporal patterns (time-of-day, burstiness, frequency)
        2. Network features (from PMLA graph engine)
        3. Text features (from NLP analysis of FIRs/social media)
        4. Behavioral anomalies (deviation from historical baselines)
        5. Cross-modal correlations

        Args:
            suspect_name: Name of the suspect to engineer features for

        Returns:
            Dictionary of engineered features
        """
        features = {}

        try:
            # Get basic threat scores from rule-based engine
            threat_scores = self.engine.calculate_threat_scores()
            suspect_row = threat_scores[threat_scores['suspect_name'] == suspect_name]

            if suspect_row.empty:
                # Return default features if suspect not found
                return self._get_default_features()

            suspect_row = suspect_row.iloc[0]

            # 1. Rule-based threat score components (normalized)
            features['cctv_norm'] = suspect_row['cctv_meeting_score'] / 30.0
            features['cdr_norm'] = suspect_row['cdr_network_score'] / 20.0
            features['fir_norm'] = suspect_row['fir_severity_score'] / 15.0
            features['crim_norm'] = suspect_row['criminal_history_score'] / 15.0
            features['fin_norm'] = suspect_row['financial_risk_score'] / 10.0
            features['surv_norm'] = suspect_row['surveillance_score'] / 10.0

            # 2. Temporal features
            features.update(self._engineer_temporal_features(suspect_name))

            # 3. Network features from PMLA graph engine
            features.update(self._engineer_network_features(suspect_name))

            # 4. Text/NLP features from FIRs and social media
            features.update(self._engineer_text_features(suspect_name))

            # 5. Behavioral anomaly features
            features.update(self._engineer_behavioral_features(suspect_name))

            # 6. Cross-modal correlation features
            features.update(self._engineer_cross_modal_features(suspect_name))

        except Exception as e:
            logger.error(f"Error engineering features for {suspect_name}: {e}")
            features = self._get_default_features()

        return features

    def _engineer_temporal_features(self, suspect_name: str) -> Dict[str, float]:
        """Engineer temporal pattern features."""
        features = {}

        try:
            # CDR temporal patterns
            pair_df, cdr_raw = self.engine.get_cdr_summary()
            suspect_cdr = cdr_raw[
                (cdr_raw['caller_number'].map(lambda p: self.engine.phone_to_name.get(p, p)) == suspect_name) |
                (cdr_raw['receiver_number'].map(lambda p: self.engine.phone_to_name.get(p, p)) == suspect_name)
            ]

            if not suspect_cdr.empty:
                # Extract hours from timestamps
                hours = []
                for ts in suspect_cdr['timestamp']:
                    try:
                        hour = int(str(ts).split()[1].split(':')[0])
                        hours.append(hour)
                    except:
                        pass

                if hours:
                    # Time of day features (normalized 0-1)
                    night_hours = sum(1 for h in hours if 0 <= h <= 6)  # Night: 12AM-6AM
                    business_hours = sum(1 for h in hours if 9 <= h <= 18)  # Business: 9AM-6PM
                    features['temporal_night_ratio'] = night_hours / len(hours)
                    features['temporal_business_ratio'] = business_hours / len(hours)

                    # Burstiness: variance in inter-call times
                    timestamps = []
                    for ts in suspect_cdr['timestamp']:
                        try:
                            dt = pd.to_datetime(ts)
                            timestamps.append(dt)
                        except:
                            pass

                    if len(timestamps) > 1:
                        timestamps.sort()
                        inter_times = [(timestamps[i+1] - timestamps[i]).total_seconds()
                                     for i in range(len(timestamps)-1)]
                        if inter_times:
                            features['temporal_burstiness'] = np.std(inter_times) / (np.mean(inter_times) + 1e-6)
                        else:
                            features['temporal_burstiness'] = 0.0
                    else:
                        features['temporal_burstiness'] = 0.0
                else:
                    features['temporal_night_ratio'] = 0.0
                    features['temporal_business_ratio'] = 0.5
                    features['temporal_burstiness'] = 0.0
            else:
                features['temporal_night_ratio'] = 0.0
                features['temporal_business_ratio'] = 0.5
                features['temporal_burstiness'] = 0.0

        except Exception as e:
            logger.warning(f"Error engineering temporal features for {suspect_name}: {e}")
            features['temporal_night_ratio'] = 0.0
            features['temporal_business_ratio'] = 0.5
            features['temporal_burstiness'] = 0.0

        return features

    def _engineer_network_features(self, suspect_name: str) -> Dict[str, float]:
        """Engineer network-based features from PMLA graph engine."""
        features = {}

        try:
            # Get suspect node in graph
            suspect_node_id = self.pmla_engine._find_or_create_nlp_entity_id(suspect_name, 'NLP_SUSPECT')

            if suspect_node_id in self.pmla_engine.graph.nodes():
                # Centrality measures
                try:
                    import networkx as nx

                    # Degree centrality
                    features['network_degree_centrality'] = nx.degree_centrality(
                        self.pmla_engine.graph
                    ).get(suspect_node_id, 0.0)

                    # Betweenness centrality (sample for performance)
                    if self.pmla_engine.graph.number_of_nodes() < 1000:
                        features['network_betweenness_centrality'] = nx.betweenness_centrality(
                            self.pmla_engine.graph
                        ).get(suspect_node_id, 0.0)
                    else:
                        # Approximate for large graphs
                        features['network_betweenness_centrality'] = 0.0

                    # Clustering coefficient
                    features['network_clustering_coefficient'] = nx.clustering(
                        self.pmla_engine.graph
                    ).get(suspect_node_id, 0.0)

                    # PageRank
                    try:
                        pagerank = nx.pagerank(self.pmla_engine.graph, alpha=0.85)
                        features['network_pagerank'] = pagerank.get(suspect_node_id, 0.0)
                    except:
                        features['network_pagerank'] = 0.0

                    # Neighborhood features
                    neighbors = list(self.pmla_engine.graph.neighbors(suspect_node_id))
                    features['network_neighbor_count'] = len(neighbors)

                    # Diversity of neighbor types
                    neighbor_types = []
                    for neighbor in neighbors:
                        node_data = self.pmla_engine.graph.nodes[neighbor]
                        neighbor_types.append(node_data.get('node_type', 'UNKNOWN'))
                    features['network_neighbor_type_entropy'] = self._calculate_entropy(neighbor_types)

                except ImportError:
                    # NetworkX not available, use basic graph metrics
                    features['network_degree_centrality'] = 0.0
                    features['network_betweenness_centrality'] = 0.0
                    features['network_clustering_coefficient'] = 0.0
                    features['network_pagerank'] = 0.0
                    features['network_neighbor_count'] = 0
                    features['network_neighbor_type_entropy'] = 0.0
            else:
                # Suspect not in graph
                features['network_degree_centrality'] = 0.0
                features['network_betweenness_centrality'] = 0.0
                features['network_clustering_coefficient'] = 0.0
                features['network_pagerank'] = 0.0
                features['network_neighbor_count'] = 0
                features['network_neighbor_type_entropy'] = 0.0

        except Exception as e:
            logger.warning(f"Error engineering network features for {suspect_name}: {e}")
            features['network_degree_centrality'] = 0.0
            features['network_betweenness_centrality'] = 0.0
            features['network_clustering_coefficient'] = 0.0
            features['network_pagerank'] = 0.0
            features['network_neighbor_count'] = 0
            features['network_neighbor_type_entropy'] = 0.0

        return features

    def _engineer_text_features(self, suspect_name: str) -> Dict[str, float]:
        """Engineer text/NLP features from FIRs and social media."""
        features = {}

        try:
            # Get FIRs associated with suspect
            suspect_firs = self.engine.firs_df[
                self.engine.firs_df['accused_name'] == suspect_name
            ]

            if not suspect_firs.empty:
                # Aggregate NLP features from FIR narratives
                total_entities = 0
                total_relationships = 0
                threat_keywords = 0
                financial_mentions = 0
                violence_mentions = 0

                threat_indicators = [
                    'extortion', 'threat', 'kidnap', 'murder', 'attack', 'assault',
                    'weapon', 'gun', 'knife', 'explosive', 'bomb', 'terror'
                ]

                financial_indicators = [
                    'money', 'cash', 'payment', 'transfer', 'laundering', 'hawala',
                    'counterfeit', 'fraud', 'embezzlement'
                ]

                violence_indicators = [
                    'shot', 'fired', 'stab', 'hit', 'beat', 'injured', 'wounded',
                    'killed', 'death', 'body'
                ]

                for _, fir in suspect_firs.iterrows():
                    fir_text = str(fir.get('act_and_sections', '')) + ' ' + \
                              str(fir.get('fir_number', ''))

                    # Simple keyword counting (in production, use proper NLP)
                    text_lower = fir_text.lower()

                    threat_keywords += sum(1 for word in threat_indicators if word in text_lower)
                    financial_mentions += sum(1 for word in financial_indicators if word in text_lower)
                    violence_mentions += sum(1 for word in violence_indicators if word in text_lower)

                # Normalize features
                features['text_threat_keyword_score'] = min(1.0, threat_keywords / 10.0)
                features['text_financial_mention_score'] = min(1.0, financial_mentions / 10.0)
                features['text_violence_mention_score'] = min(1.0, violence_mentions / 10.0)

                # Entity density (would come from NLP service in production)
                features['text_entity_density'] = min(1.0, len(suspect_firs) / 5.0)

            else:
                features['text_threat_keyword_score'] = 0.0
                features['text_financial_mention_score'] = 0.0
                features['text_violence_mention_score'] = 0.0
                features['text_entity_density'] = 0.0

        except Exception as e:
            logger.warning(f"Error engineering text features for {suspect_name}: {e}")
            features['text_threat_keyword_score'] = 0.0
            features['text_financial_mention_score'] = 0.0
            features['text_violence_mention_score'] = 0.0
            features['text_entity_density'] = 0.0

        return features

    def _engineer_behavioral_features(self, suspect_name: str) -> Dict[str, float]:
        """Engineer behavioral anomaly features."""
        features = {}

        try:
            # Compare current activity to historical baseline
            threat_scores = self.engine.calculate_threat_scores()
            suspect_row = threat_scores[threat_scores['suspect_name'] == suspect_name]

            if not suspect_row.empty:
                suspect_row = suspect_row.iloc[0]

                # Calculate deviation from population averages
                avg_scores = threat_scores[
                    ['cctv_meeting_score', 'cdr_network_score', 'fir_severity_score',
                     'criminal_history_score', 'financial_risk_score', 'surveillance_score']
                ].mean()

                std_scores = threat_scores[
                    ['cctv_meeting_score', 'cdr_network_score', 'fir_severity_score',
                     'criminal_history_score', 'financial_risk_score', 'surveillance_score']
                ].std()

                # Avoid division by zero
                std_scores = std_scores.replace(0, 1)

                # Z-scores for each component
                features['behav_cctv_zscore'] = max(-3, min(3,
                    (suspect_row['cctv_meeting_score'] - avg_scores['cctv_meeting_score']) /
                    (std_scores['cctv_meeting_score'] + 1e-6)))

                features['behav_cdr_zscore'] = max(-3, min(3,
                    (suspect_row['cdr_network_score'] - avg_scores['cdr_network_score']) /
                    (std_scores['cdr_network_score'] + 1e-6)))

                features['behav_fir_zscore'] = max(-3, min(3,
                    (suspect_row['fir_severity_score'] - avg_scores['fir_severity_score']) /
                    (std_scores['fir_severity_score'] + 1e-6)))

                features['behav_crim_zscore'] = max(-3, min(3,
                    (suspect_row['criminal_history_score'] - avg_scores['criminal_history_score']) /
                    (std_scores['criminal_history_score'] + 1e-6)))

                features['behav_fin_zscore'] = max(-3, min(3,
                    (suspect_row['financial_risk_score'] - avg_scores['financial_risk_score']) /
                    (std_scores['financial_risk_score'] + 1e-6)))

                features['behav_surv_zscore'] = max(-3, min(3,
                    (suspect_row['surveillance_score'] - avg_scores['surveillance_score']) /
                    (std_scores['surveillance_score'] + 1e-6)))

                # Overall behavioral anomaly score
                z_scores = [
                    abs(features['behav_cctv_zscore']),
                    abs(features['behav_cdr_zscore']),
                    abs(features['behav_fir_zscore']),
                    abs(features['behav_crim_zscore']),
                    abs(features['behav_fin_zscore']),
                    abs(features['behav_surv_zscore'])
                ]
                features['behav_overall_anomaly'] = np.mean(z_scores) / 3.0  # Normalize to 0-1

            else:
                # Default values if suspect not found
                for comp in ['cctv', 'cdr', 'fir', 'crim', 'fin', 'surv']:
                    features[f'behav_{comp}_zscore'] = 0.0
                features['behav_overall_anomaly'] = 0.0

        except Exception as e:
            logger.warning(f"Error engineering behavioral features for {suspect_name}: {e}")
            for comp in ['cctv', 'cdr', 'fir', 'crim', 'fin', 'surv']:
                features[f'behav_{comp}_zscore'] = 0.0
            features['behav_overall_anomaly'] = 0.0

        return features

    def _engineer_cross_modal_features(self, suspect_name: str) -> Dict[str, float]:
        """Engineer cross-modal correlation features."""
        features = {}

        try:
            threat_scores = self.engine.calculate_threat_scores()
            suspect_row = threat_scores[threat_scores['suspect_name'] == suspect_name]

            if not suspect_row.empty:
                suspect_row = suspect_row.iloc[0]

                # Correlation between financial activity and communication
                fin_comm_correlation = min(
                    suspect_row['financial_risk_score'] / 10.0,
                    suspect_row['cdr_network_score'] / 20.0
                )
                features['crossmod_fin_comm_corr'] = fin_comm_correlation

                # Correlation between FIR severity and surveillance
                fir_surv_correlation = min(
                    suspect_row['fir_severity_score'] / 15.0,
                    suspect_row['surveillance_score'] / 10.0
                )
                features['crossmod_fir_surv_corr'] = fir_surv_correlation

                # Correlation between criminal history and current activity
                crim_activity_correlation = min(
                    suspect_row['criminal_history_score'] / 15.0,
                    (suspect_row['cctv_meeting_score'] / 30.0 +
                     suspect_row['cdr_network_score'] / 20.0) / 2.0
                )
                features['crossmod_crim_activity_corr'] = crim_activity_correlation

                # Multi-modal threat indicator (when multiple modalities are elevated)
                elevated_count = sum([
                    1 if suspect_row['cctv_meeting_score'] >= 15 else 0,  # Half of max
                    1 if suspect_row['cdr_network_score'] >= 10 else 0,
                    1 if suspect_row['fir_severity_score'] >= 8 else 0,
                    1 if suspect_row['criminal_history_score'] >= 8 else 0,
                    1 if suspect_row['financial_risk_score'] >= 5 else 0,
                    1 if suspect_row['surveillance_score'] >= 5 else 0
                ])
                features['crossmod_multi_modal_threat'] = elevated_count / 6.0

            else:
                features['crossmod_fin_comm_corr'] = 0.0
                features['crossmod_fir_surv_corr'] = 0.0
                features['crossmod_crim_activity_corr'] = 0.0
                features['crossmod_multi_modal_threat'] = 0.0

        except Exception as e:
            logger.warning(f"Error engineering cross-modal features for {suspect_name}: {e}")
            features['crossmod_fin_comm_corr'] = 0.0
            features['crossmod_fir_surv_corr'] = 0.0
            features['crossmod_crim_activity_corr'] = 0.0
            features['crossmod_multi_modal_threat'] = 0.0

        return features

    def _calculate_entropy(self, items: List[str]) -> float:
        """Calculate Shannon entropy of a list of items."""
        if not items:
            return 0.0

        from collections import Counter
        import math

        counter = Counter(items)
        entropy = 0.0
        total = len(items)

        for count in counter.values():
            probability = count / total
            if probability > 0:
                entropy -= probability * math.log2(probability)

        return entropy

    def _get_default_features(self) -> Dict[str, float]:
        """Return default feature values when engineering fails."""
        return {
            # Rule-based components
            'cctv_norm': 0.0, 'cdr_norm': 0.0, 'fir_norm': 0.0,
            'crim_norm': 0.0, 'fin_norm': 0.0, 'surv_norm': 0.0,

            # Temporal features
            'temporal_night_ratio': 0.0, 'temporal_business_ratio': 0.5,
            'temporal_burstiness': 0.0,

            # Network features
            'network_degree_centrality': 0.0, 'network_betweenness_centrality': 0.0,
            'network_clustering_coefficient': 0.0, 'network_pagerank': 0.0,
            'network_neighbor_count': 0, 'network_neighbor_type_entropy': 0.0,

            # Text features
            'text_threat_keyword_score': 0.0, 'text_financial_mention_score': 0.0,
            'text_violence_mention_score': 0.0, 'text_entity_density': 0.0,

            # Behavioral features
            'behav_cctv_zscore': 0.0, 'behav_cdr_zscore': 0.0, 'behav_fir_zscore': 0.0,
            'behav_crim_zscore': 0.0, 'behav_fin_zscore': 0.0, 'behav_surv_zscore': 0.0,
            'behav_overall_anomaly': 0.0,

            # Cross-modal features
            'crossmod_fin_comm_corr': 0.0, 'crossmod_fir_surv_corr': 0.0,
            'crossmod_crim_activity_corr': 0.0, 'crossmod_multi_modal_threat': 0.0
        }

    def get_feature_vector(self, suspect_name: str) -> Tuple[np.ndarray, List[str]]:
        """
        Get feature vector for a suspect.

        Args:
            suspect_name: Name of the suspect

        Returns:
            Tuple of (feature_vector, feature_names)
        """
        features_dict = self.engineer_features(suspect_name)

        # Ensure consistent feature ordering
        if not self.feature_names:
            self.feature_names = sorted(features_dict.keys())

        # Create feature vector in consistent order
        feature_vector = np.array([
            features_dict.get(feature_name, 0.0)
            for feature_name in self.feature_names
        ]).reshape(1, -1)

        return feature_vector, self.feature_names

    def predict_threat_score(self, suspect_name: str) -> float:
        """
        Predict ML-based threat score for a suspect.

        Args:
            suspect_name: Name of the suspect

        Returns:
            ML threat score (0-100 scale)
        """
        if not self.is_trained or self.model is None:
            # If model not trained, return rule-based score as fallback
            threat_scores = self.engine.calculate_threat_scores()
            suspect_row = threat_scores[threat_scores['suspect_name'] == suspect_name]
            if not suspect_row.empty:
                return float(suspect_row.iloc[0]['total_threat_score'])
            return 0.0

        try:
            # Get feature vector
            feature_vector, _ = self.get_feature_vector(suspect_name)

            # Scale features
            feature_vector_scaled = self.scaler.transform(feature_vector)

            # Get prediction probability (for classification) or direct prediction
            if hasattr(self.model, 'predict_proba'):
                # For classifiers, get probability of high threat class
                proba = self.model.predict_proba(feature_vector_scaled)
                # Assuming binary classification: [low_threat_prob, high_threat_prob]
                if proba.shape[1] >= 2:
                    threat_probability = proba[0][1]  # Probability of high threat class
                else:
                    threat_probability = proba[0][0]
            else:
                # For regressors or other models
                prediction = self.model.predict(feature_vector_scaled)
                threat_probability = float(prediction[0])
                # Ensure it's in 0-1 range
                threat_probability = max(0.0, min(1.0, threat_probability))

            # Convert to 0-100 scale
            ml_threat_score = threat_probability * 100.0

            return ml_threat_score

        except Exception as e:
            logger.error(f"Error predicting ML threat score for {suspect_name}: {e}")
            # Fallback to rule-based score
            threat_scores = self.engine.calculate_threat_scores()
            suspect_row = threat_scores[threat_scores['suspect_name'] == suspect_name]
            if not suspect_row.empty:
                return float(suspect_row.iloc[0]['total_threat_score'])
            return 0.0

    def get_hybrid_threat_score(self, suspect_name: str,
                               ml_weight: float = 0.3,
                               rule_weight: float = 0.7) -> Dict[str, Any]:
        """
        Calculate hybrid threat score combining rule-based and ML approaches.

        Args:
            suspect_name: Name of the suspect
            ml_weight: Weight for ML component (0-1)
            rule_weight: Weight for rule-based component (0-1)

        Returns:
            Dictionary with hybrid score and component breakdown
        """
        # Normalize weights
        total_weight = ml_weight + rule_weight
        if total_weight > 0:
            ml_weight_norm = ml_weight / total_weight
            rule_weight_norm = rule_weight / total_weight
        else:
            ml_weight_norm = 0.0
            rule_weight_norm = 1.0

        # Get rule-based score
        threat_scores = self.engine.calculate_threat_scores()
        suspect_row = threat_scores[threat_scores['suspect_name'] == suspect_name]

        if suspect_row.empty:
            rule_based_score = 0.0
        else:
            rule_based_score = float(suspect_row.iloc[0]['total_threat_score'])

        # Get ML-based score
        ml_based_score = self.predict_threat_score(suspect_name)

        # Calculate hybrid score
        hybrid_score = (rule_weight_norm * rule_based_score) + (ml_weight_norm * ml_based_score)
        hybrid_score = max(0.0, min(100.0, hybrid_score))  # Clamp to 0-100

        return {
            'suspect_name': suspect_name,
            'rule_based_score': round(rule_based_score, 1),
            'ml_based_score': round(ml_based_score, 1),
            'hybrid_score': round(hybrid_score, 1),
            'ml_weight': round(ml_weight_norm, 2),
            'rule_weight': round(rule_weight_norm, 2),
            'score_improvement': round(hybrid_score - rule_based_score, 1)
        }

    def train_model(self, training_data: Optional[pd.DataFrame] = None,
                   labels: Optional[pd.Series] = None) -> Dict[str, Any]:
        """
        Train the ML threat scoring model.

        Args:
            training_data: DataFrame containing engineered features. If None, generates from engine data.
            labels: Series containing target labels (0=low threat, 1=high threat). If None, generates from scores.

        Returns:
            Dictionary with training results and metrics
        """
        try:
            # Generate training data if not provided
            if training_data is None or labels is None:
                training_data, labels = self._generate_training_data()

            if training_data.empty or len(labels) == 0:
                return {
                    'success': False,
                    'error': 'No training data available',
                    'samples': 0
                }

            # Ensure feature names are set
            if not self.feature_names:
                self.feature_names = sorted(training_data.columns.tolist())

            # Select features in consistent order
            training_data = training_data[self.feature_names]

            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                training_data, labels, test_size=0.2, random_state=42, stratify=labels
            )

            # Scale features
            X_train_scaled = self.scaler.fit_transform(X_train)
            X_test_scaled = self.scaler.transform(X_test)

            # Train model (using Gradient Boosting for good performance with interpretability)
            self.model = GradientBoostingClassifier(
                n_estimators=100,
                learning_rate=0.1,
                max_depth=3,
                random_state=42
            )

            self.model.fit(X_train_scaled, y_train)

            # Evaluate model
            train_score = self.model.score(X_train_scaled, y_train)
            test_score = self.model.score(X_test_scaled, y_test)

            # Get predictions for metrics
            y_pred = self.model.predict(X_test_scaled)
            y_pred_proba = self.model.predict_proba(X_test_scaled)[:, 1] if hasattr(self.model, 'predict_proba') else None

            # Calculate AUC if probabilities available
            auc_score = None
            if y_pred_proba is not None:
                try:
                    auc_score = roc_auc_score(y_test, y_pred_proba)
                except:
                    pass

            # Save model
            self._save_model()
            self.is_trained = True

            # Feature importance
            feature_importance = dict(zip(
                self.feature_names,
                self.model.feature_importances_
            )) if hasattr(self.model, 'feature_importances_') else {}

            return {
                'success': True,
                'train_accuracy': round(train_score, 3),
                'test_accuracy': round(test_score, 3),
                'auc_score': round(auc_score, 3) if auc_score else None,
                'samples': len(training_data),
                'features': len(self.feature_names),
                'feature_importance': feature_importance
            }

        except Exception as e:
            logger.error(f"Error training ML model: {e}")
            return {
                'success': False,
                'error': str(e),
                'samples': 0
            }

    def _generate_training_data(self) -> Tuple[pd.DataFrame, pd.Series]:
        """
        Generate training data from existing engine data.
        Uses heuristic labeling based on threat score thresholds.

        Returns:
            Tuple of (features_dataframe, labels_series)
        """
        try:
            # Get all suspects and their rule-based scores
            threat_scores = self.engine.calculate_threat_scores()

            features_list = []
            labels_list = []

            for _, row in threat_scores.iterrows():
                suspect_name = row['suspect_name']

                # Engineer features
                features_dict = self.engineer_features(suspect_name)

                # Only add if we have valid features
                if any(v != 0.0 for v in features_dict.values() if isinstance(v, (int, float))):
                    features_list.append(features_dict)

                    # Label based on threat score threshold
                    # Using 60 as threshold for "high threat" (top 40% approximately)
                    label = 1 if row['total_threat_score'] >= 60.0 else 0
                    labels_list.append(label)

            if not features_list:
                return pd.DataFrame(), pd.Series(dtype='int')

            # Convert to DataFrame
            features_df = pd.DataFrame(features_list)
            labels_series = pd.Series(labels_list, dtype='int')

            return features_df, labels_series

        except Exception as e:
            logger.error(f"Error generating training data: {e}")
            return pd.DataFrame(), pd.Series(dtype='int')

# Global singleton instance
_ml_threat_scorer: Optional[MLThreatScorer] = None

def get_ml_threat_scorer() -> MLThreatScorer:
    """Get or create the global ML threat scorer instance."""
    global _ml_threat_scorer
    if _ml_threat_scorer is None:
        _ml_threat_scorer = MLThreatScorer()
    return _ml_threat_scorer