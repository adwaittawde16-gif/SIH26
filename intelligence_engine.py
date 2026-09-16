import pandas as pd
import numpy as np
import os
from collections import defaultdict

class IntelligenceEngine:
    def __init__(self, data_folder=None):
        if data_folder is None:
            data_folder = os.path.dirname(os.path.abspath(__file__))
        self.data_folder = data_folder
        self._cdr_summary_cache = None
        self._cctv_meetings_cache = None
        self._threat_scores_cache = None
        self.load_data()
        self.build_lookups()

    def load_data(self):
        """Load all 8 intelligence CSV datasets."""
        self.firs_df = pd.read_csv(os.path.join(self.data_folder, "fir_and_police_reports.csv"))
        self.cdrs_df = pd.read_csv(os.path.join(self.data_folder, "call_detail_records.csv"))
        self.cctv_df = pd.read_csv(os.path.join(self.data_folder, "nearest_cctv_sightings.csv"))
        self.crim_df = pd.read_csv(os.path.join(self.data_folder, "criminal_history_databases.csv"))
        self.fin_df = pd.read_csv(os.path.join(self.data_folder, "financial_transaction_records.csv"))
        self.surv_df = pd.read_csv(os.path.join(self.data_folder, "surveillance_reports.csv"))
        
        soc_intel_path = os.path.join(self.data_folder, "social_media_intelligence.csv")
        soc_login_path = os.path.join(self.data_folder, "social_media_login_tracking.csv")
        
        self.soc_intel_df = pd.read_csv(soc_intel_path) if os.path.exists(soc_intel_path) else pd.DataFrame()
        self.soc_login_df = pd.read_csv(soc_login_path) if os.path.exists(soc_login_path) else pd.DataFrame()

    def build_lookups(self):
        """Construct lookup dictionaries connecting phone numbers, names, and FIRs."""
        self.phone_to_name = dict(zip(self.firs_df['accused_phone'], self.firs_df['accused_name']))
        self.name_to_phone = dict(zip(self.firs_df['accused_name'], self.firs_df['accused_phone']))
        
        # Build list of all unique suspects
        self.all_suspects = sorted(list(self.firs_df['accused_name'].unique()))

    def get_cdr_summary(self, force_reload=False):
        """Part 1: Analyze CDR records and construct call interaction pairs."""
        if self._cdr_summary_cache is not None and not force_reload:
            return self._cdr_summary_cache

        df = self.cdrs_df.copy()
        df['caller_name'] = df['caller_number'].map(lambda p: self.phone_to_name.get(p, p))
        df['receiver_name'] = df['receiver_number'].map(lambda p: self.phone_to_name.get(p, p))
        
        pair_groups = defaultdict(lambda: {
            'total_calls': 0,
            'sms_count': 0,
            'incoming_count': 0,
            'outgoing_count': 0,
            'total_duration_sec': 0,
            'nocturnal_calls': 0,
            'timestamps': []
        })

        for _, row in df.iterrows():
            u1, u2 = row['caller_name'], row['receiver_name']
            pair_key = tuple(sorted([str(u1), str(u2)]))
            stats = pair_groups[pair_key]
            stats['total_calls'] += 1
            if row['call_type'] == 'SMS':
                stats['sms_count'] += 1
            elif row['call_type'] == 'Incoming':
                stats['incoming_count'] += 1
            else:
                stats['outgoing_count'] += 1
            
            stats['total_duration_sec'] += row['duration_seconds']
            
            try:
                ts_hour = int(str(row['timestamp']).split()[1].split(':')[0])
                if 0 <= ts_hour <= 6:
                    stats['nocturnal_calls'] += 1
            except:
                pass
            
            stats['timestamps'].append(str(row['timestamp']))

        pair_records = []
        for (p1, p2), stats in pair_groups.items():
            pair_records.append({
                'suspect_1': p1,
                'suspect_2': p2,
                'total_calls': stats['total_calls'],
                'total_duration_min': round(stats['total_duration_sec'] / 60.0, 1),
                'nocturnal_calls': stats['nocturnal_calls'],
                'sms_count': stats['sms_count'],
                'incoming_count': stats['incoming_count'],
                'outgoing_count': stats['outgoing_count'],
            })

        pair_df = pd.DataFrame(pair_records).sort_values(by='total_calls', ascending=False)
        self._cdr_summary_cache = (pair_df, df)
        return self._cdr_summary_cache

    def get_cctv_meetings(self, force_reload=False):
        """Part 2: Cross-reference frequent callers with CCTV sightings to detect physical meetings."""
        if self._cctv_meetings_cache is not None and not force_reload:
            return self._cctv_meetings_cache

        pair_df, _ = self.get_cdr_summary()
        
        cctv = self.cctv_df.copy()
        cctv['timestamp_dt'] = pd.to_datetime(cctv['sighting_timestamp'], errors='coerce')
        
        meetings = []
        seen_meeting_keys = set()
        
        for _, pair in pair_df.iterrows():
            s1, s2 = pair['suspect_1'], pair['suspect_2']
            s1_sightings = cctv[cctv['suspect_name'] == s1]
            s2_sightings = cctv[cctv['suspect_name'] == s2]
            
            for _, r1 in s1_sightings.iterrows():
                for _, r2 in s2_sightings.iterrows():
                    same_cam = (r1['camera_id'] == r2['camera_id'])
                    same_loc = (r1['nearest_known_location'] == r2['nearest_known_location'])
                    
                    if same_cam or same_loc:
                        time_delta_sec = abs((r1['timestamp_dt'] - r2['timestamp_dt']).total_seconds())
                        if time_delta_sec <= 3600:
                            m_key = tuple(sorted([r1['sighting_id'], r2['sighting_id']]))
                            if m_key not in seen_meeting_keys:
                                seen_meeting_keys.add(m_key)
                                avg_dist = round((r1['distance_from_incident_meters'] + r2['distance_from_incident_meters']) / 2.0, 1)
                                avg_conf = round((r1['match_confidence'] + r2['match_confidence']) / 2.0, 2)
                                
                                meetings.append({
                                    'suspect_1': s1,
                                    'suspect_2': s2,
                                    'cdr_call_count': pair['total_calls'],
                                    'camera_id': r1['camera_id'],
                                    'camera_location': r1['camera_location'],
                                    'sighting_time_s1': r1['sighting_timestamp'],
                                    'sighting_time_s2': r2['sighting_timestamp'],
                                    'time_delta_minutes': round(time_delta_sec / 60.0, 1),
                                    'avg_distance_meters': avg_dist,
                                    'avg_match_confidence': avg_conf,
                                    'sighting_status': r1['sighting_status']
                                })
        
        meeting_df = pd.DataFrame(meetings)
        if not meeting_df.empty:
            meeting_df = meeting_df.sort_values(by=['avg_match_confidence', 'cdr_call_count'], ascending=[False, False])
        self._cctv_meetings_cache = meeting_df
        return self._cctv_meetings_cache

    def calculate_threat_scores(self, force_reload=False):
        """Part 3: Compute comprehensive 100-point Threat Score using 6 weighted parameters."""
        if self._threat_scores_cache is not None and not force_reload:
            return self._threat_scores_cache

        pair_df, cdr_raw = self.get_cdr_summary()
        cctv_meetings = self.get_cctv_meetings()
        
        suspect_scores = []
        
        for name in self.all_suspects:
            # 1. CCTV Co-location Meetings Score (MAX PRIORITY: 30 pts)
            cctv_score = 0.0
            if not cctv_meetings.empty:
                s_meetings = cctv_meetings[(cctv_meetings['suspect_1'] == name) | (cctv_meetings['suspect_2'] == name)]
                m_count = len(s_meetings)
                if m_count > 0:
                    avg_conf = s_meetings['avg_match_confidence'].mean()
                    cctv_score = min(30.0, (m_count * 10.0) + (avg_conf * 10.0))
            
            # 2. CDR Interaction Network Score (20 pts)
            cdr_score = 0.0
            s_pairs = pair_df[(pair_df['suspect_1'] == name) | (pair_df['suspect_2'] == name)]
            if not s_pairs.empty:
                total_calls = s_pairs['total_calls'].sum()
                nocturnal = s_pairs['nocturnal_calls'].sum()
                total_dur = s_pairs['total_duration_min'].sum()
                
                cdr_score = min(20.0, (total_calls * 1.5) + (nocturnal * 2.0) + min(5.0, total_dur / 10.0))

            # 3. FIR & Police Reports Severity Score (15 pts)
            fir_score = 0.0
            s_firs = self.firs_df[self.firs_df['accused_name'] == name]
            fir_count = len(s_firs)
            if fir_count > 0:
                has_prohibition = any("Prohibition" in str(sec) for sec in s_firs['act_and_sections'])
                fir_score = min(15.0, (fir_count * 4.0) + (5.0 if has_prohibition else 2.0))

            # 4. Criminal History Score (15 pts)
            crim_score = 0.0
            s_crim = self.crim_df[self.crim_df['suspect_name'] == name]
            if not s_crim.empty:
                convictions = s_crim['prior_convictions_count'].values[0]
                status = s_crim['case_status'].values[0]
                status_weight = 5.0 if status == 'Bailed' else (4.0 if status == 'Under Trial' else 1.0)
                crim_score = min(15.0, (convictions * 2.0) + status_weight)

            # 5. Financial Risk Score (10 pts)
            fin_score = 0.0
            s_fin = self.fin_df[self.fin_df['account_holder'] == name]
            if not s_fin.empty:
                txn_count = len(s_fin)
                failed_count = len(s_fin[s_fin['status'] == 'FAILED'])
                wine_shop_count = len(s_fin[s_fin['merchant_or_payee'].str.contains('Wine|Liquor|Peer', case=False, na=False)])
                fin_score = min(10.0, (txn_count * 1.5) + (failed_count * 2.0) + (wine_shop_count * 2.0))

            # 6. Surveillance Field Observation Score (10 pts)
            surv_score = 0.0
            user_firs = s_firs['fir_number'].tolist() if not s_firs.empty else []
            s_surv = self.surv_df[self.surv_df['fir_number'].isin(user_firs)]
            if not s_surv.empty:
                surv_count = len(s_surv)
                panchnama_count = len(s_surv[s_surv['panchnama_conducted'] == True])
                surv_score = min(10.0, (surv_count * 3.0) + (panchnama_count * 2.0))

            total_threat_score = round(cctv_score + cdr_score + fir_score + crim_score + fin_score + surv_score, 1)
            total_threat_score = min(100.0, max(0.0, total_threat_score))

            # Compute driver breakdown and primary driver
            driver_breakdown = {
                "CCTV": cctv_score,
                "CDR": cdr_score,
                "FIR": fir_score,
                "Criminal History": crim_score,
                "Financial": fin_score,
                "Surveillance": surv_score
            }
            primary_driver = max(driver_breakdown, key=driver_breakdown.get)
            primary_driver_pct = (driver_breakdown[primary_driver] / (cctv_score + cdr_score + fir_score + crim_score + fin_score + surv_score) * 100) if (cctv_score + cdr_score + fir_score + crim_score + fin_score + surv_score) > 0 else 0.0

            suspect_scores.append({
                'suspect_name': name,
                'phone_number': self.name_to_phone.get(name, 'N/A'),
                'total_threat_score': total_threat_score,
                'cctv_meeting_score': round(cctv_score, 1),
                'cdr_network_score': round(cdr_score, 1),
                'fir_severity_score': round(fir_score, 1),
                'criminal_history_score': round(crim_score, 1),
                'financial_risk_score': round(fin_score, 1),
                'surveillance_score': round(surv_score, 1),
                'primary_driver': primary_driver,
                'primary_driver_pct': round(primary_driver_pct, 1),
                'driver_breakdown': driver_breakdown
            })

        score_df = pd.DataFrame(suspect_scores).sort_values(by='total_threat_score', ascending=False)
        self._threat_scores_cache = score_df
        return self._threat_scores_cache

if __name__ == "__main__":
    engine = IntelligenceEngine()
    print("Testing Engine Data Loading & Processing...")
    pairs, _ = engine.get_cdr_summary()
    print("CDR Top Pairs Count:", len(pairs))
    meetings = engine.get_cctv_meetings()
    print("CCTV Physical Meetings Found:", len(meetings))
    scores = engine.calculate_threat_scores()
    print("Threat Scores Calculated for", len(scores), "suspects.")
    print("\nTop 5 Highest Threat Suspects:")
    print(scores[['suspect_name', 'total_threat_score', 'cctv_meeting_score', 'cdr_network_score', 'fir_severity_score']].head(5))
