/**
 * Complete Intelligence Platform Data Layer
 * Synchronized directly from the Python Intelligence Engine & Master Datasets.
 * Provides authentic, rich intelligence data across all 10 modules on Vercel & localhost.
 */

import {
  ThreatLeaderboardResponse,
  CDRSummaryResponse,
  NetworkGraphResponse,
  CCTVMeetingsResponse,
  CrimeRingsResponse,
  FinancialIntelligenceResponse,
  NocturnalAnomaliesResponse,
  SurveillanceHeatmapResponse,
  AlertsResponse,
  SuspectDossierDetails,
  SearchResultResponse,
  GangListResponse,
  GangSubGraphResponse,
  TimelineResponse,
  SocialMediaResponse,
  FIRNLPResponse,
  GeoPointsResponse,
  CriminalHistorySummaryResponse,
  CriminalRecordsListResponse,
  CDRComparisonResponse
} from "../types";

export const fallbackLeaderboard: ThreatLeaderboardResponse = {
  "total_suspects": 100,
  "critical_count": 3,
  "high_count": 7,
  "moderate_count": 15,
  "low_count": 75,
  "leaderboard": [
    {
      "suspect_name": "Md. Advik Golla",
      "phone_number": "+91-0751400478",
      "total_threat_score": 89.1,
      "cctv_meeting_score": 29.1,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "CCTV",
      "primary_driver_pct": 32.7,
      "driver_breakdown": {
        "CCTV": 29.1,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Zashil Mistry",
      "phone_number": "+91-0356058771",
      "total_threat_score": 83.5,
      "cctv_meeting_score": 29.0,
      "cdr_network_score": 12.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 14.0,
      "financial_risk_score": 8.5,
      "surveillance_score": 10.0,
      "primary_driver": "CCTV",
      "primary_driver_pct": 34.8,
      "driver_breakdown": {
        "CCTV": 29.05,
        "CDR": 12.92,
        "FIR": 9.0,
        "Criminal History": 14.0,
        "Financial": 8.5,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Ranbir Bhalla",
      "phone_number": "+91-2236381844",
      "total_threat_score": 80.6,
      "cctv_meeting_score": 28.6,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 3.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "CCTV",
      "primary_driver_pct": 35.5,
      "driver_breakdown": {
        "CCTV": 28.65,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 3.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Azad Mannan",
      "phone_number": "+91-8472516266",
      "total_threat_score": 75.8,
      "cctv_meeting_score": 29.3,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "CCTV",
      "primary_driver_pct": 38.7,
      "driver_breakdown": {
        "CCTV": 29.299999999999997,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Indrajit Kunda",
      "phone_number": "+91-6926567843",
      "total_threat_score": 73.8,
      "cctv_meeting_score": 29.3,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "CCTV",
      "primary_driver_pct": 39.7,
      "driver_breakdown": {
        "CCTV": 29.299999999999997,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 7.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Balendra Nayak",
      "phone_number": "+91-7309005344",
      "total_threat_score": 71.3,
      "cctv_meeting_score": 29.2,
      "cdr_network_score": 13.5,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "CCTV",
      "primary_driver_pct": 41.0,
      "driver_breakdown": {
        "CCTV": 29.25,
        "CDR": 13.530000000000001,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Tarak Sahni",
      "phone_number": "+91-8224462027",
      "total_threat_score": 66.8,
      "cctv_meeting_score": 29.2,
      "cdr_network_score": 12.5,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 5.0,
      "primary_driver": "CCTV",
      "primary_driver_pct": 43.8,
      "driver_breakdown": {
        "CCTV": 29.25,
        "CDR": 12.54,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 10.0,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Teerth Bhargava",
      "phone_number": "+91-7611970993",
      "total_threat_score": 66.5,
      "cctv_meeting_score": 30.0,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "CCTV",
      "primary_driver_pct": 45.1,
      "driver_breakdown": {
        "CCTV": 30.0,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Darsh Sampath",
      "phone_number": "+91-7458410398",
      "total_threat_score": 65.6,
      "cctv_meeting_score": 29.1,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "CCTV",
      "primary_driver_pct": 44.4,
      "driver_breakdown": {
        "CCTV": 29.1,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Samar Nagar",
      "phone_number": "+91-3604313547",
      "total_threat_score": 64.7,
      "cctv_meeting_score": 29.3,
      "cdr_network_score": 14.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 5.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "CCTV",
      "primary_driver_pct": 45.3,
      "driver_breakdown": {
        "CCTV": 29.299999999999997,
        "CDR": 14.870000000000001,
        "FIR": 9.0,
        "Criminal History": 5.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Pranit Arya",
      "phone_number": "+91-7774789752",
      "total_threat_score": 56.0,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "CDR",
      "primary_driver_pct": 35.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 7.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Umang Mody",
      "phone_number": "+91-0953911949",
      "total_threat_score": 54.5,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 8.5,
      "surveillance_score": 10.0,
      "primary_driver": "CDR",
      "primary_driver_pct": 36.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 7.0,
        "Financial": 8.5,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Robert Narain",
      "phone_number": "+91-0909634931",
      "total_threat_score": 49.5,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 12.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "CDR",
      "primary_driver_pct": 40.4,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 12.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Vedant Padmanabhan",
      "phone_number": "+91-2530358841",
      "total_threat_score": 48.5,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "CDR",
      "primary_driver_pct": 41.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Arjun Sheth",
      "phone_number": "+91-6111449019",
      "total_threat_score": 45.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 3.9,
      "fir_severity_score": 13.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 28.3,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 3.94,
        "FIR": 13.0,
        "Criminal History": 9.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Christopher Pillai",
      "phone_number": "+91-4293362242",
      "total_threat_score": 44.5,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 5.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "CDR",
      "primary_driver_pct": 44.9,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 5.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Maanav Tailor",
      "phone_number": "+91-4860124675",
      "total_threat_score": 44.5,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "CDR",
      "primary_driver_pct": 44.9,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Simon Rai",
      "phone_number": "+91-6754235346",
      "total_threat_score": 42.8,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.8,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 25.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.8,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Harish Bali",
      "phone_number": "+91-6463599241",
      "total_threat_score": 42.5,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "CDR",
      "primary_driver_pct": 47.1,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 7.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Sathvik Mahajan",
      "phone_number": "+91-4612031808",
      "total_threat_score": 41.2,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.7,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 8.5,
      "surveillance_score": 10.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 26.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.67,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 8.5,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Elijah Rege",
      "phone_number": "+91-1324892076",
      "total_threat_score": 40.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "Financial",
      "primary_driver_pct": 24.5,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.87,
        "FIR": 9.0,
        "Criminal History": 7.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Laban Prakash",
      "phone_number": "+91-5372652872",
      "total_threat_score": 40.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "Financial",
      "primary_driver_pct": 24.4,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.9,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Peter Barad",
      "phone_number": "+91-9440790043",
      "total_threat_score": 40.7,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.7,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "Financial",
      "primary_driver_pct": 24.5,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.74,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Ojas Bhavsar",
      "phone_number": "+91-3088060716",
      "total_threat_score": 40.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.4,
      "fir_severity_score": 13.0,
      "criminal_history_score": 5.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 32.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.39,
        "FIR": 13.0,
        "Criminal History": 5.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Ayush Buch",
      "phone_number": "+91-8561621656",
      "total_threat_score": 40.2,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.6,
      "fir_severity_score": 13.0,
      "criminal_history_score": 14.0,
      "financial_risk_score": 6.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 34.9,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.65,
        "FIR": 13.0,
        "Criminal History": 14.0,
        "Financial": 6.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Ansh Sandal",
      "phone_number": "+91-2507232638",
      "total_threat_score": 38.6,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.1,
      "fir_severity_score": 9.0,
      "criminal_history_score": 12.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 10.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 31.1,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.0700000000000003,
        "FIR": 9.0,
        "Criminal History": 12.0,
        "Financial": 5.5,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Amol Nagy",
      "phone_number": "+91-3128261525",
      "total_threat_score": 38.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.4,
      "fir_severity_score": 9.0,
      "criminal_history_score": 12.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 31.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.42,
        "FIR": 9.0,
        "Criminal History": 12.0,
        "Financial": 10.0,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Gopal Radhakrishnan",
      "phone_number": "+91-9997632226",
      "total_threat_score": 38.0,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.5,
      "fir_severity_score": 15.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 39.4,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.53,
        "FIR": 15.0,
        "Criminal History": 11.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Gagan Rao",
      "phone_number": "+91-5714909698",
      "total_threat_score": 37.6,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 8.0,
      "financial_risk_score": 8.5,
      "surveillance_score": 10.0,
      "primary_driver": "Surveillance",
      "primary_driver_pct": 26.6,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.05,
        "FIR": 9.0,
        "Criminal History": 8.0,
        "Financial": 8.5,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Reyansh Mangal",
      "phone_number": "+91-0193610079",
      "total_threat_score": 37.1,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.6,
      "fir_severity_score": 15.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 40.5,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.5600000000000005,
        "FIR": 15.0,
        "Criminal History": 11.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Reyansh Anne",
      "phone_number": "+91-6922080797",
      "total_threat_score": 36.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 5.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "Financial",
      "primary_driver_pct": 27.1,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.87,
        "FIR": 9.0,
        "Criminal History": 5.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Harrison Sarna",
      "phone_number": "+91-0277658032",
      "total_threat_score": 36.5,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 20.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "CDR",
      "primary_driver_pct": 54.8,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 20.0,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Nihal Rana",
      "phone_number": "+91-5691317104",
      "total_threat_score": 36.0,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 5.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "Financial",
      "primary_driver_pct": 27.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.04,
        "FIR": 9.0,
        "Criminal History": 5.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Zaid Nair",
      "phone_number": "+91-2579426125",
      "total_threat_score": 35.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.4,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 10.0,
      "primary_driver": "Surveillance",
      "primary_driver_pct": 27.8,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.42,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 5.5,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Laban Sidhu",
      "phone_number": "+91-1679781002",
      "total_threat_score": 35.7,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.2,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 10.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 30.8,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.16,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 3.5,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Frado Dhingra",
      "phone_number": "+91-0333553548",
      "total_threat_score": 35.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.9,
      "fir_severity_score": 13.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 36.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.93,
        "FIR": 13.0,
        "Criminal History": 9.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Hemang Shere",
      "phone_number": "+91-1359460122",
      "total_threat_score": 34.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 10.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 29.1,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.890000000000001,
        "FIR": 9.0,
        "Criminal History": 10.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Onveer Bahl",
      "phone_number": "+91-8335561055",
      "total_threat_score": 34.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.9,
      "fir_severity_score": 15.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 43.6,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.94,
        "FIR": 15.0,
        "Criminal History": 9.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Andrew Bora",
      "phone_number": "+91-8714702226",
      "total_threat_score": 34.1,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.1,
      "fir_severity_score": 9.0,
      "criminal_history_score": 3.0,
      "financial_risk_score": 10.0,
      "surveillance_score": 10.0,
      "primary_driver": "Financial",
      "primary_driver_pct": 29.3,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.12,
        "FIR": 9.0,
        "Criminal History": 3.0,
        "Financial": 10.0,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Alexander Master",
      "phone_number": "+91-9405178098",
      "total_threat_score": 34.1,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 3.6,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 32.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 3.64,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Dominic Gupta",
      "phone_number": "+91-9954528199",
      "total_threat_score": 33.6,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.1,
      "fir_severity_score": 9.0,
      "criminal_history_score": 14.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 41.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.11,
        "FIR": 9.0,
        "Criminal History": 14.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Frederick Gade",
      "phone_number": "+91-9749956561",
      "total_threat_score": 33.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 32.9,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.93,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Kevin Ganesan",
      "phone_number": "+91-5505012573",
      "total_threat_score": 33.0,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.6,
      "fir_severity_score": 13.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 39.3,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.55,
        "FIR": 13.0,
        "Criminal History": 9.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Wriddhish Varty",
      "phone_number": "+91-8726663475",
      "total_threat_score": 32.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.4,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 33.4,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.39,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Devansh Vohra",
      "phone_number": "+91-7245876065",
      "total_threat_score": 32.8,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.3,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 33.6,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.28,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. George Ramaswamy",
      "phone_number": "+91-0077344960",
      "total_threat_score": 32.7,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 16.2,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "CDR",
      "primary_driver_pct": 49.5,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 16.16,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Jeet Sachdeva",
      "phone_number": "+91-4631009912",
      "total_threat_score": 32.0,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.5,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 34.3,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.53,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Qarin Balan",
      "phone_number": "+91-4277185805",
      "total_threat_score": 31.8,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.3,
      "fir_severity_score": 9.0,
      "criminal_history_score": 12.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 37.8,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.27,
        "FIR": 9.0,
        "Criminal History": 12.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Baljiwan Hayer",
      "phone_number": "+91-0327979516",
      "total_threat_score": 31.3,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.8,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 28.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.8100000000000005,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Daniel Raman",
      "phone_number": "+91-5203140569",
      "total_threat_score": 31.2,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.7,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 35.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.71,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Tanveer Choudhary",
      "phone_number": "+91-1407733840",
      "total_threat_score": 31.1,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.6,
      "fir_severity_score": 15.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 48.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.63,
        "FIR": 15.0,
        "Criminal History": 1.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Naveen Tailor",
      "phone_number": "+91-1549231524",
      "total_threat_score": 31.1,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.6,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 28.9,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.6,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Rudra Narula",
      "phone_number": "+91-8771310836",
      "total_threat_score": 31.0,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.5,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 29.1,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.48,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Wridesh Bali",
      "phone_number": "+91-2971614670",
      "total_threat_score": 30.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.4,
      "fir_severity_score": 15.0,
      "criminal_history_score": 3.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 48.5,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.41,
        "FIR": 15.0,
        "Criminal History": 3.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Dev Mani",
      "phone_number": "+91-7339277969",
      "total_threat_score": 30.8,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.3,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 35.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.29,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Falan Krishna",
      "phone_number": "+91-8579159927",
      "total_threat_score": 30.8,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.3,
      "fir_severity_score": 13.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 42.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.33,
        "FIR": 13.0,
        "Criminal History": 9.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Balhaar Sami",
      "phone_number": "+91-1715766898",
      "total_threat_score": 30.6,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.1,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 29.4,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.07,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Ayush Baria",
      "phone_number": "+91-6993641756",
      "total_threat_score": 30.1,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.6,
      "fir_severity_score": 9.0,
      "criminal_history_score": 5.0,
      "financial_risk_score": 6.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 29.9,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.609999999999999,
        "FIR": 9.0,
        "Criminal History": 5.0,
        "Financial": 6.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Oliver Dasgupta",
      "phone_number": "+91-0224687988",
      "total_threat_score": 30.1,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.6,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 36.6,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.58,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Chanakya Chaudhari",
      "phone_number": "+91-7907250746",
      "total_threat_score": 29.1,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.6,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 30.9,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.58,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Manan Subramanian",
      "phone_number": "+91-8164539334",
      "total_threat_score": 28.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.4,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 31.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.36,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Wridesh Virk",
      "phone_number": "+91-2343985265",
      "total_threat_score": 28.6,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.1,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 31.5,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.1,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Harsh Samra",
      "phone_number": "+91-8762291976",
      "total_threat_score": 28.6,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.1,
      "fir_severity_score": 13.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 45.4,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.14,
        "FIR": 13.0,
        "Criminal History": 7.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. David Nayak",
      "phone_number": "+91-0908250618",
      "total_threat_score": 28.6,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.1,
      "fir_severity_score": 13.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 45.4,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.14,
        "FIR": 13.0,
        "Criminal History": 1.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Zaid Bhattacharyya",
      "phone_number": "+91-9402246831",
      "total_threat_score": 28.5,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.0,
      "fir_severity_score": 15.0,
      "criminal_history_score": 3.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 52.6,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.0,
        "FIR": 15.0,
        "Criminal History": 3.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Nachiket Desai",
      "phone_number": "+91-3029050253",
      "total_threat_score": 28.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.8,
      "fir_severity_score": 9.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 31.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.85,
        "FIR": 9.0,
        "Criminal History": 7.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Aarnav Sekhon",
      "phone_number": "+91-7235641635",
      "total_threat_score": 28.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 11.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "Criminal History",
      "primary_driver_pct": 38.8,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.88,
        "FIR": 9.0,
        "Criminal History": 11.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Amol Mody",
      "phone_number": "+91-5730267951",
      "total_threat_score": 28.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 31.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.87,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Jeet Saha",
      "phone_number": "+91-2751214628",
      "total_threat_score": 28.0,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.5,
      "fir_severity_score": 9.0,
      "criminal_history_score": 6.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 32.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.47,
        "FIR": 9.0,
        "Criminal History": 6.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Karan Mistry",
      "phone_number": "+91-3203295820",
      "total_threat_score": 27.8,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.3,
      "fir_severity_score": 9.0,
      "criminal_history_score": 3.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 10.0,
      "primary_driver": "Surveillance",
      "primary_driver_pct": 36.0,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.29,
        "FIR": 9.0,
        "Criminal History": 3.0,
        "Financial": 1.5,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Ranbir Bains",
      "phone_number": "+91-6072329900",
      "total_threat_score": 27.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 32.8,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.94,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Yagnesh Tak",
      "phone_number": "+91-9377098052",
      "total_threat_score": 27.3,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.8,
      "fir_severity_score": 9.0,
      "criminal_history_score": 9.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 33.0,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.7800000000000002,
        "FIR": 9.0,
        "Criminal History": 9.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Samar Golla",
      "phone_number": "+91-4830450019",
      "total_threat_score": 27.2,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.7,
      "fir_severity_score": 9.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 33.1,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.7,
        "FIR": 9.0,
        "Criminal History": 7.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Veer Devi",
      "phone_number": "+91-5037744332",
      "total_threat_score": 26.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.4,
      "fir_severity_score": 9.0,
      "criminal_history_score": 5.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 33.4,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.42,
        "FIR": 9.0,
        "Criminal History": 5.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Raghav Manda",
      "phone_number": "+91-9386771558",
      "total_threat_score": 26.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.8,
      "fir_severity_score": 9.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 34.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.85,
        "FIR": 9.0,
        "Criminal History": 7.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Qadim Solanki",
      "phone_number": "+91-6530338206",
      "total_threat_score": 26.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 34.1,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.92,
        "FIR": 9.0,
        "Criminal History": 7.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Brijesh Goda",
      "phone_number": "+91-6454080360",
      "total_threat_score": 26.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 34.1,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.8900000000000001,
        "FIR": 9.0,
        "Criminal History": 7.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Umang Sabharwal",
      "phone_number": "+91-6997065590",
      "total_threat_score": 25.6,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.1,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 10.0,
      "primary_driver": "Surveillance",
      "primary_driver_pct": 39.0,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.12,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 3.5,
        "Surveillance": 10.0
      }
    },
    {
      "suspect_name": "Md. Elijah Ganguly",
      "phone_number": "+91-6320194538",
      "total_threat_score": 25.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 7.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 35.5,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.87,
        "FIR": 9.0,
        "Criminal History": 7.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Jagdish Acharya",
      "phone_number": "+91-6400189254",
      "total_threat_score": 25.3,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.8,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 35.6,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.78,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Akshay Lata",
      "phone_number": "+91-2325906102",
      "total_threat_score": 25.3,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.8,
      "fir_severity_score": 9.0,
      "criminal_history_score": 5.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 35.6,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.76,
        "FIR": 9.0,
        "Criminal History": 5.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Owen Ganesh",
      "phone_number": "+91-4501079897",
      "total_threat_score": 25.2,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.7,
      "fir_severity_score": 13.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 51.6,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.7,
        "FIR": 13.0,
        "Criminal History": 1.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Nicholas Karpe",
      "phone_number": "+91-8749925305",
      "total_threat_score": 24.6,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 3.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 36.7,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.05,
        "FIR": 9.0,
        "Criminal History": 3.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Anay Minhas",
      "phone_number": "+91-4475823294",
      "total_threat_score": 23.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 38.4,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.92,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Fitan Mander",
      "phone_number": "+91-0283885531",
      "total_threat_score": 23.0,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.5,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 39.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.47,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Gaurang Bhatti",
      "phone_number": "+91-7194825001",
      "total_threat_score": 22.5,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 40.0,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 3.98,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Zehaan Wali",
      "phone_number": "+91-8000129596",
      "total_threat_score": 22.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 5.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 40.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.8900000000000001,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 5.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Vihaan Vohra",
      "phone_number": "+91-1608300776",
      "total_threat_score": 21.5,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 5.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 41.9,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.97,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Frado Raja",
      "phone_number": "+91-3504184157",
      "total_threat_score": 21.2,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.7,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 42.4,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.73,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Warjas Khalsa",
      "phone_number": "+91-2023838998",
      "total_threat_score": 20.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.4,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 43.0,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.42,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Zayyan Ahluwalia",
      "phone_number": "+91-0421607034",
      "total_threat_score": 20.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.4,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 43.0,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.43,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Yagnesh Zacharia",
      "phone_number": "+91-1681067925",
      "total_threat_score": 20.8,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 4.3,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 43.2,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 4.33,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Frederick Nori",
      "phone_number": "+91-0009063115",
      "total_threat_score": 20.5,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.0,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 43.8,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.04,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Sathvik Pant",
      "phone_number": "+91-1554078824",
      "total_threat_score": 20.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 44.0,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.94,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Tejas Nigam",
      "phone_number": "+91-4414875019",
      "total_threat_score": 20.3,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.8,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 3.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 44.3,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.81,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 3.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Rayaan Bhavsar",
      "phone_number": "+91-9135444363",
      "total_threat_score": 19.2,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.7,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 46.9,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.68,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Matthew Om",
      "phone_number": "+91-2323764440",
      "total_threat_score": 19.1,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.6,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 47.0,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.63,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Jatin Murthy",
      "phone_number": "+91-0437844453",
      "total_threat_score": 19.0,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.5,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 47.4,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.4699999999999998,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Rudra Sant",
      "phone_number": "+91-7744695455",
      "total_threat_score": 18.9,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 2.4,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 47.6,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 2.42,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    },
    {
      "suspect_name": "Md. Chakradhar Batta",
      "phone_number": "+91-9000406254",
      "total_threat_score": 18.4,
      "cctv_meeting_score": 0.0,
      "cdr_network_score": 1.9,
      "fir_severity_score": 9.0,
      "criminal_history_score": 1.0,
      "financial_risk_score": 1.5,
      "surveillance_score": 5.0,
      "primary_driver": "FIR",
      "primary_driver_pct": 48.9,
      "driver_breakdown": {
        "CCTV": 0.0,
        "CDR": 1.9,
        "FIR": 9.0,
        "Criminal History": 1.0,
        "Financial": 1.5,
        "Surveillance": 5.0
      }
    }
  ]
};

export const fallbackCDRPairs: CDRSummaryResponse = {
  "total_cdr_logs": 182,
  "total_interaction_pairs": 112,
  "frequent_pairs_count": 10,
  "pairs": [
    {
      "suspect_1": "Md. Ranbir Bhalla",
      "suspect_2": "Md. Vedant Padmanabhan",
      "total_calls": 9,
      "total_duration_min": 33,
      "nocturnal_calls": 2,
      "sms_count": 6,
      "incoming_count": 0,
      "outgoing_count": 3
    },
    {
      "suspect_1": "Md. Pranit Arya",
      "suspect_2": "Md. Ranbir Bhalla",
      "total_calls": 9,
      "total_duration_min": 48,
      "nocturnal_calls": 5,
      "sms_count": 2,
      "incoming_count": 4,
      "outgoing_count": 3
    },
    {
      "suspect_1": "Md. Christopher Pillai",
      "suspect_2": "Md. Robert Narain",
      "total_calls": 9,
      "total_duration_min": 41,
      "nocturnal_calls": 3,
      "sms_count": 2,
      "incoming_count": 2,
      "outgoing_count": 5
    },
    {
      "suspect_1": "Md. Advik Golla",
      "suspect_2": "Md. Darsh Sampath",
      "total_calls": 8,
      "total_duration_min": 83,
      "nocturnal_calls": 2,
      "sms_count": 0,
      "incoming_count": 4,
      "outgoing_count": 4
    },
    {
      "suspect_1": "Md. Maanav Tailor",
      "suspect_2": "Md. Umang Mody",
      "total_calls": 8,
      "total_duration_min": 46,
      "nocturnal_calls": 4,
      "sms_count": 1,
      "incoming_count": 4,
      "outgoing_count": 3
    },
    {
      "suspect_1": "Md. Harish Bali",
      "suspect_2": "Md. Harrison Sarna",
      "total_calls": 8,
      "total_duration_min": 52,
      "nocturnal_calls": 5,
      "sms_count": 0,
      "incoming_count": 7,
      "outgoing_count": 1
    },
    {
      "suspect_1": "Md. Azad Mannan",
      "suspect_2": "Md. Indrajit Kunda",
      "total_calls": 7,
      "total_duration_min": 11,
      "nocturnal_calls": 4,
      "sms_count": 5,
      "incoming_count": 0,
      "outgoing_count": 2
    },
    {
      "suspect_1": "Md. George Ramaswamy",
      "suspect_2": "Md. Umang Mody",
      "total_calls": 6,
      "total_duration_min": 23,
      "nocturnal_calls": 1,
      "sms_count": 2,
      "incoming_count": 2,
      "outgoing_count": 2
    },
    {
      "suspect_1": "Md. Ranbir Bhalla",
      "suspect_2": "Md. Teerth Bhargava",
      "total_calls": 5,
      "total_duration_min": 36,
      "nocturnal_calls": 1,
      "sms_count": 2,
      "incoming_count": 2,
      "outgoing_count": 1
    },
    {
      "suspect_1": "Md. Samar Nagar",
      "suspect_2": "Md. Teerth Bhargava",
      "total_calls": 5,
      "total_duration_min": 6,
      "nocturnal_calls": 1,
      "sms_count": 3,
      "incoming_count": 2,
      "outgoing_count": 0
    },
    {
      "suspect_1": "Md. Teerth Bhargava",
      "suspect_2": "Md. Zashil Mistry",
      "total_calls": 4,
      "total_duration_min": 6,
      "nocturnal_calls": 2,
      "sms_count": 3,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "Md. Balendra Nayak",
      "suspect_2": "Md. Tarak Sahni",
      "total_calls": 4,
      "total_duration_min": 7,
      "nocturnal_calls": 2,
      "sms_count": 3,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-7155522441",
      "suspect_2": "Md. Ojas Bhavsar",
      "total_calls": 1,
      "total_duration_min": 8,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-6658277894",
      "suspect_2": "Md. Sathvik Mahajan",
      "total_calls": 1,
      "total_duration_min": 11,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-0083322930",
      "suspect_2": "Md. Elijah Rege",
      "total_calls": 1,
      "total_duration_min": 13,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-0988006174",
      "suspect_2": "Md. Ranbir Bhalla",
      "total_calls": 1,
      "total_duration_min": 11,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-8261621115",
      "suspect_2": "Md. Simon Rai",
      "total_calls": 1,
      "total_duration_min": 13,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-8535218781",
      "suspect_2": "Md. Tarak Sahni",
      "total_calls": 1,
      "total_duration_min": 2,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-7380064908",
      "suspect_2": "Md. Ayush Buch",
      "total_calls": 1,
      "total_duration_min": 1,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-2249298044",
      "suspect_2": "Md. Amol Nagy",
      "total_calls": 1,
      "total_duration_min": 9,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-1296901195",
      "suspect_2": "Md. Baljiwan Hayer",
      "total_calls": 1,
      "total_duration_min": 13,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-7036067702",
      "suspect_2": "Md. Devansh Vohra",
      "total_calls": 1,
      "total_duration_min": 7,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-5529660417",
      "suspect_2": "Md. Gopal Radhakrishnan",
      "total_calls": 1,
      "total_duration_min": 0,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-9530679275",
      "suspect_2": "Md. Zayyan Ahluwalia",
      "total_calls": 1,
      "total_duration_min": 9,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-3566383950",
      "suspect_2": "Md. Rudra Sant",
      "total_calls": 1,
      "total_duration_min": 9,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-8101692629",
      "suspect_2": "Md. Fitan Mander",
      "total_calls": 1,
      "total_duration_min": 9,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-5376571151",
      "suspect_2": "Md. Nachiket Desai",
      "total_calls": 1,
      "total_duration_min": 3,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-5405416287",
      "suspect_2": "Md. Maanav Tailor",
      "total_calls": 1,
      "total_duration_min": 1,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-9937146397",
      "suspect_2": "Md. Balendra Nayak",
      "total_calls": 1,
      "total_duration_min": 12,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-8841380062",
      "suspect_2": "Md. Robert Narain",
      "total_calls": 1,
      "total_duration_min": 11,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-3531160657",
      "suspect_2": "Md. Tanveer Choudhary",
      "total_calls": 1,
      "total_duration_min": 11,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-2769136542",
      "suspect_2": "Md. Azad Mannan",
      "total_calls": 1,
      "total_duration_min": 3,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-8324791927",
      "suspect_2": "Md. Amol Mody",
      "total_calls": 1,
      "total_duration_min": 3,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-8831730519",
      "suspect_2": "Md. Zaid Bhattacharyya",
      "total_calls": 1,
      "total_duration_min": 5,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-4969103950",
      "suspect_2": "Md. Nicholas Karpe",
      "total_calls": 1,
      "total_duration_min": 5,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-1298742862",
      "suspect_2": "Md. Indrajit Kunda",
      "total_calls": 1,
      "total_duration_min": 10,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-6304508680",
      "suspect_2": "Md. Pranit Arya",
      "total_calls": 1,
      "total_duration_min": 0,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-4754813913",
      "suspect_2": "Md. Reyansh Anne",
      "total_calls": 1,
      "total_duration_min": 13,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-6216694266",
      "suspect_2": "Md. Andrew Bora",
      "total_calls": 1,
      "total_duration_min": 6,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-5915263172",
      "suspect_2": "Md. Gagan Rao",
      "total_calls": 1,
      "total_duration_min": 5,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-1313704144",
      "suspect_2": "Md. Peter Barad",
      "total_calls": 1,
      "total_duration_min": 12,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-7799749261",
      "suspect_2": "Md. Nihal Rana",
      "total_calls": 1,
      "total_duration_min": 5,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-4273670069",
      "suspect_2": "Md. Arjun Sheth",
      "total_calls": 1,
      "total_duration_min": 4,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-3211806618",
      "suspect_2": "Md. Umang Mody",
      "total_calls": 1,
      "total_duration_min": 10,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-4598784260",
      "suspect_2": "Md. Laban Prakash",
      "total_calls": 1,
      "total_duration_min": 14,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-1951231046",
      "suspect_2": "Md. Zashil Mistry",
      "total_calls": 1,
      "total_duration_min": 7,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-3684198529",
      "suspect_2": "Md. Advik Golla",
      "total_calls": 1,
      "total_duration_min": 13,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-8935396640",
      "suspect_2": "Md. Ayush Baria",
      "total_calls": 1,
      "total_duration_min": 11,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-4983630267",
      "suspect_2": "Md. Dominic Gupta",
      "total_calls": 1,
      "total_duration_min": 6,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-3691955937",
      "suspect_2": "Md. Naveen Tailor",
      "total_calls": 1,
      "total_duration_min": 11,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-7507465885",
      "suspect_2": "Md. Frado Dhingra",
      "total_calls": 1,
      "total_duration_min": 14,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-6641847435",
      "suspect_2": "Md. Kevin Ganesan",
      "total_calls": 1,
      "total_duration_min": 10,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-6822881229",
      "suspect_2": "Md. Wriddhish Varty",
      "total_calls": 1,
      "total_duration_min": 8,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-4171972095",
      "suspect_2": "Md. Jeet Saha",
      "total_calls": 1,
      "total_duration_min": 9,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-1250436793",
      "suspect_2": "Md. Anay Minhas",
      "total_calls": 1,
      "total_duration_min": 14,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-2278623406",
      "suspect_2": "Md. Jatin Murthy",
      "total_calls": 1,
      "total_duration_min": 9,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-1746159750",
      "suspect_2": "Md. Reyansh Mangal",
      "total_calls": 1,
      "total_duration_min": 10,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-4684812524",
      "suspect_2": "Md. Elijah Ganguly",
      "total_calls": 1,
      "total_duration_min": 13,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-8667541428",
      "suspect_2": "Md. Tejas Nigam",
      "total_calls": 1,
      "total_duration_min": 3,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-3450312271",
      "suspect_2": "Md. Akshay Lata",
      "total_calls": 1,
      "total_duration_min": 12,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-1189756397",
      "suspect_2": "Md. Frederick Nori",
      "total_calls": 1,
      "total_duration_min": 5,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-6799582777",
      "suspect_2": "Md. Brijesh Goda",
      "total_calls": 1,
      "total_duration_min": 3,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-1395100063",
      "suspect_2": "Md. Qadim Solanki",
      "total_calls": 1,
      "total_duration_min": 4,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-1044800820",
      "suspect_2": "Md. Daniel Raman",
      "total_calls": 1,
      "total_duration_min": 12,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-1525809736",
      "suspect_2": "Md. Christopher Pillai",
      "total_calls": 1,
      "total_duration_min": 2,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-4702317695",
      "suspect_2": "Md. Frederick Gade",
      "total_calls": 1,
      "total_duration_min": 14,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-4521265079",
      "suspect_2": "Md. Raghav Manda",
      "total_calls": 1,
      "total_duration_min": 3,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-5833469312",
      "suspect_2": "Md. Laban Sidhu",
      "total_calls": 1,
      "total_duration_min": 6,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-9641070073",
      "suspect_2": "Md. Vihaan Vohra",
      "total_calls": 1,
      "total_duration_min": 14,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-3923216148",
      "suspect_2": "Md. David Nayak",
      "total_calls": 1,
      "total_duration_min": 6,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-3758973716",
      "suspect_2": "Md. Harish Bali",
      "total_calls": 1,
      "total_duration_min": 8,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-9156712697",
      "suspect_2": "Md. Matthew Om",
      "total_calls": 1,
      "total_duration_min": 11,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-0340298591",
      "suspect_2": "Md. Rayaan Bhavsar",
      "total_calls": 1,
      "total_duration_min": 11,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-1364678894",
      "suspect_2": "Md. Hemang Shere",
      "total_calls": 1,
      "total_duration_min": 13,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-8163791530",
      "suspect_2": "Md. Jeet Sachdeva",
      "total_calls": 1,
      "total_duration_min": 0,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-3997099578",
      "suspect_2": "Md. Zehaan Wali",
      "total_calls": 1,
      "total_duration_min": 3,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-7486245083",
      "suspect_2": "Md. Aarnav Sekhon",
      "total_calls": 1,
      "total_duration_min": 3,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-8418562933",
      "suspect_2": "Md. Qarin Balan",
      "total_calls": 1,
      "total_duration_min": 7,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-7171626711",
      "suspect_2": "Md. Balhaar Sami",
      "total_calls": 1,
      "total_duration_min": 5,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-9080085208",
      "suspect_2": "Md. Warjas Khalsa",
      "total_calls": 1,
      "total_duration_min": 9,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-0524161213",
      "suspect_2": "Md. Alexander Master",
      "total_calls": 1,
      "total_duration_min": 1,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-0162900589",
      "suspect_2": "Md. Yagnesh Zacharia",
      "total_calls": 1,
      "total_duration_min": 8,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-8975030242",
      "suspect_2": "Md. Vedant Padmanabhan",
      "total_calls": 1,
      "total_duration_min": 8,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-7740381949",
      "suspect_2": "Md. Gaurang Bhatti",
      "total_calls": 1,
      "total_duration_min": 4,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-8267178405",
      "suspect_2": "Md. Harrison Sarna",
      "total_calls": 1,
      "total_duration_min": 0,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-4373688889",
      "suspect_2": "Md. Ansh Sandal",
      "total_calls": 1,
      "total_duration_min": 5,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-0139452164",
      "suspect_2": "Md. Harsh Samra",
      "total_calls": 1,
      "total_duration_min": 6,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-5482105475",
      "suspect_2": "Md. Zaid Nair",
      "total_calls": 1,
      "total_duration_min": 9,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-8951032064",
      "suspect_2": "Md. Frado Raja",
      "total_calls": 1,
      "total_duration_min": 12,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-6161680532",
      "suspect_2": "Md. Owen Ganesh",
      "total_calls": 1,
      "total_duration_min": 12,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-2779148518",
      "suspect_2": "Md. George Ramaswamy",
      "total_calls": 1,
      "total_duration_min": 13,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-9204164298",
      "suspect_2": "Md. Rudra Narula",
      "total_calls": 1,
      "total_duration_min": 9,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-5940579305",
      "suspect_2": "Md. Onveer Bahl",
      "total_calls": 1,
      "total_duration_min": 4,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-3904615590",
      "suspect_2": "Md. Darsh Sampath",
      "total_calls": 1,
      "total_duration_min": 0,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-1980611562",
      "suspect_2": "Md. Wridesh Virk",
      "total_calls": 1,
      "total_duration_min": 6,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-4778000151",
      "suspect_2": "Md. Wridesh Bali",
      "total_calls": 1,
      "total_duration_min": 9,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-2150790686",
      "suspect_2": "Md. Manan Subramanian",
      "total_calls": 1,
      "total_duration_min": 8,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-9967968993",
      "suspect_2": "Md. Teerth Bhargava",
      "total_calls": 1,
      "total_duration_min": 7,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-2818487325",
      "suspect_2": "Md. Samar Golla",
      "total_calls": 1,
      "total_duration_min": 12,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-7418523271",
      "suspect_2": "Md. Jagdish Acharya",
      "total_calls": 1,
      "total_duration_min": 12,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-2050251598",
      "suspect_2": "Md. Yagnesh Tak",
      "total_calls": 1,
      "total_duration_min": 12,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-8352292464",
      "suspect_2": "Md. Falan Krishna",
      "total_calls": 1,
      "total_duration_min": 8,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-1540172781",
      "suspect_2": "Md. Veer Devi",
      "total_calls": 1,
      "total_duration_min": 9,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-7079832489",
      "suspect_2": "Md. Umang Sabharwal",
      "total_calls": 1,
      "total_duration_min": 6,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-7007685069",
      "suspect_2": "Md. Chanakya Chaudhari",
      "total_calls": 1,
      "total_duration_min": 10,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-0122059359",
      "suspect_2": "Md. Samar Nagar",
      "total_calls": 1,
      "total_duration_min": 12,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 0,
      "outgoing_count": 1
    },
    {
      "suspect_1": "+91-6939681756",
      "suspect_2": "Md. Sathvik Pant",
      "total_calls": 1,
      "total_duration_min": 4,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-2481972339",
      "suspect_2": "Md. Chakradhar Batta",
      "total_calls": 1,
      "total_duration_min": 4,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-7813014202",
      "suspect_2": "Md. Oliver Dasgupta",
      "total_calls": 1,
      "total_duration_min": 0,
      "nocturnal_calls": 0,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-2913723000",
      "suspect_2": "Md. Ranbir Bains",
      "total_calls": 1,
      "total_duration_min": 14,
      "nocturnal_calls": 0,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-0863104046",
      "suspect_2": "Md. Karan Mistry",
      "total_calls": 1,
      "total_duration_min": 7,
      "nocturnal_calls": 1,
      "sms_count": 0,
      "incoming_count": 1,
      "outgoing_count": 0
    },
    {
      "suspect_1": "+91-4911446112",
      "suspect_2": "Md. Dev Mani",
      "total_calls": 1,
      "total_duration_min": 7,
      "nocturnal_calls": 1,
      "sms_count": 1,
      "incoming_count": 0,
      "outgoing_count": 0
    }
  ]
};

export const fallbackCDRGraph: NetworkGraphResponse = {
  "total_nodes": 200,
  "total_edges": 112,
  "top_key_influencers": [
    {
      "id": "Md. Ranbir Bhalla",
      "label": "Md. Ranbir Bhalla",
      "phone": "+91-2236381844",
      "threat_score": 80.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "CRITICAL",
      "gang_id": "RING-01",
      "gang_name": "Byculla Extortion Syndicate"
    },
    {
      "id": "Md. Vedant Padmanabhan",
      "label": "Md. Vedant Padmanabhan",
      "phone": "+91-2530358841",
      "threat_score": 48.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Pranit Arya",
      "label": "Md. Pranit Arya",
      "phone": "+91-7774789752",
      "threat_score": 56.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    }
  ],
  "nodes": [
    {
      "id": "Md. Ranbir Bhalla",
      "label": "Md. Ranbir Bhalla",
      "phone": "+91-2236381844",
      "threat_score": 80.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "CRITICAL",
      "gang_id": "RING-01",
      "gang_name": "Byculla Extortion Syndicate"
    },
    {
      "id": "Md. Vedant Padmanabhan",
      "label": "Md. Vedant Padmanabhan",
      "phone": "+91-2530358841",
      "threat_score": 48.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Pranit Arya",
      "label": "Md. Pranit Arya",
      "phone": "+91-7774789752",
      "threat_score": 56.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Christopher Pillai",
      "label": "Md. Christopher Pillai",
      "phone": "+91-4293362242",
      "threat_score": 44.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Robert Narain",
      "label": "Md. Robert Narain",
      "phone": "+91-0909634931",
      "threat_score": 49.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Advik Golla",
      "label": "Md. Advik Golla",
      "phone": "+91-0751400478",
      "threat_score": 89.1,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "CRITICAL",
      "gang_id": "RING-01",
      "gang_name": "Byculla Extortion Syndicate"
    },
    {
      "id": "Md. Darsh Sampath",
      "label": "Md. Darsh Sampath",
      "phone": "+91-7458410398",
      "threat_score": 65.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Maanav Tailor",
      "label": "Md. Maanav Tailor",
      "phone": "+91-4860124675",
      "threat_score": 44.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Umang Mody",
      "label": "Md. Umang Mody",
      "phone": "+91-0953911949",
      "threat_score": 54.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Harish Bali",
      "label": "Md. Harish Bali",
      "phone": "+91-6463599241",
      "threat_score": 42.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Harrison Sarna",
      "label": "Md. Harrison Sarna",
      "phone": "+91-0277658032",
      "threat_score": 36.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Azad Mannan",
      "label": "Md. Azad Mannan",
      "phone": "+91-8472516266",
      "threat_score": 75.8,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Indrajit Kunda",
      "label": "Md. Indrajit Kunda",
      "phone": "+91-6926567843",
      "threat_score": 73.8,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. George Ramaswamy",
      "label": "Md. George Ramaswamy",
      "phone": "+91-0077344960",
      "threat_score": 32.7,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Teerth Bhargava",
      "label": "Md. Teerth Bhargava",
      "phone": "+91-7611970993",
      "threat_score": 66.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Samar Nagar",
      "label": "Md. Samar Nagar",
      "phone": "+91-3604313547",
      "threat_score": 64.7,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Zashil Mistry",
      "label": "Md. Zashil Mistry",
      "phone": "+91-0356058771",
      "threat_score": 83.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "CRITICAL",
      "gang_id": "RING-01",
      "gang_name": "Byculla Extortion Syndicate"
    },
    {
      "id": "Md. Balendra Nayak",
      "label": "Md. Balendra Nayak",
      "phone": "+91-7309005344",
      "threat_score": 71.3,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Tarak Sahni",
      "label": "Md. Tarak Sahni",
      "phone": "+91-8224462027",
      "threat_score": 66.8,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7155522441",
      "label": "+91-7155522441",
      "phone": "+91-9834303933",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Ojas Bhavsar",
      "label": "Md. Ojas Bhavsar",
      "phone": "+91-3088060716",
      "threat_score": 40.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-6658277894",
      "label": "+91-6658277894",
      "phone": "+91-9895592943",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Sathvik Mahajan",
      "label": "Md. Sathvik Mahajan",
      "phone": "+91-4612031808",
      "threat_score": 41.2,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-0083322930",
      "label": "+91-0083322930",
      "phone": "+91-9895235277",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Elijah Rege",
      "label": "Md. Elijah Rege",
      "phone": "+91-1324892076",
      "threat_score": 40.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-0988006174",
      "label": "+91-0988006174",
      "phone": "+91-9819183262",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8261621115",
      "label": "+91-8261621115",
      "phone": "+91-9837251697",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Simon Rai",
      "label": "Md. Simon Rai",
      "phone": "+91-6754235346",
      "threat_score": 42.8,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8535218781",
      "label": "+91-8535218781",
      "phone": "+91-9856150866",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7380064908",
      "label": "+91-7380064908",
      "phone": "+91-9896745588",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Ayush Buch",
      "label": "Md. Ayush Buch",
      "phone": "+91-8561621656",
      "threat_score": 40.2,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-2249298044",
      "label": "+91-2249298044",
      "phone": "+91-9812512036",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Amol Nagy",
      "label": "Md. Amol Nagy",
      "phone": "+91-3128261525",
      "threat_score": 38.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1296901195",
      "label": "+91-1296901195",
      "phone": "+91-9853644628",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Baljiwan Hayer",
      "label": "Md. Baljiwan Hayer",
      "phone": "+91-0327979516",
      "threat_score": 31.3,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7036067702",
      "label": "+91-7036067702",
      "phone": "+91-9820848732",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Devansh Vohra",
      "label": "Md. Devansh Vohra",
      "phone": "+91-7245876065",
      "threat_score": 32.8,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-5529660417",
      "label": "+91-5529660417",
      "phone": "+91-9879039308",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Gopal Radhakrishnan",
      "label": "Md. Gopal Radhakrishnan",
      "phone": "+91-9997632226",
      "threat_score": 38.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-9530679275",
      "label": "+91-9530679275",
      "phone": "+91-9811640908",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Zayyan Ahluwalia",
      "label": "Md. Zayyan Ahluwalia",
      "phone": "+91-0421607034",
      "threat_score": 20.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-3566383950",
      "label": "+91-3566383950",
      "phone": "+91-9811539913",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Rudra Sant",
      "label": "Md. Rudra Sant",
      "phone": "+91-7744695455",
      "threat_score": 18.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8101692629",
      "label": "+91-8101692629",
      "phone": "+91-9889106578",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Fitan Mander",
      "label": "Md. Fitan Mander",
      "phone": "+91-0283885531",
      "threat_score": 23.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-5376571151",
      "label": "+91-5376571151",
      "phone": "+91-9860448689",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Nachiket Desai",
      "label": "Md. Nachiket Desai",
      "phone": "+91-3029050253",
      "threat_score": 28.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-5405416287",
      "label": "+91-5405416287",
      "phone": "+91-9861399719",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-9937146397",
      "label": "+91-9937146397",
      "phone": "+91-9829101505",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8841380062",
      "label": "+91-8841380062",
      "phone": "+91-9887151791",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-3531160657",
      "label": "+91-3531160657",
      "phone": "+91-9842471782",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Tanveer Choudhary",
      "label": "Md. Tanveer Choudhary",
      "phone": "+91-1407733840",
      "threat_score": 31.1,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-2769136542",
      "label": "+91-2769136542",
      "phone": "+91-9846444635",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8324791927",
      "label": "+91-8324791927",
      "phone": "+91-9852546502",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Amol Mody",
      "label": "Md. Amol Mody",
      "phone": "+91-5730267951",
      "threat_score": 28.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8831730519",
      "label": "+91-8831730519",
      "phone": "+91-9817025756",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Zaid Bhattacharyya",
      "label": "Md. Zaid Bhattacharyya",
      "phone": "+91-9402246831",
      "threat_score": 28.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4969103950",
      "label": "+91-4969103950",
      "phone": "+91-9815541865",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Nicholas Karpe",
      "label": "Md. Nicholas Karpe",
      "phone": "+91-8749925305",
      "threat_score": 24.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1298742862",
      "label": "+91-1298742862",
      "phone": "+91-9898930466",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-6304508680",
      "label": "+91-6304508680",
      "phone": "+91-9853059056",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4754813913",
      "label": "+91-4754813913",
      "phone": "+91-9833832192",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Reyansh Anne",
      "label": "Md. Reyansh Anne",
      "phone": "+91-6922080797",
      "threat_score": 36.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-6216694266",
      "label": "+91-6216694266",
      "phone": "+91-9814877684",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Andrew Bora",
      "label": "Md. Andrew Bora",
      "phone": "+91-8714702226",
      "threat_score": 34.1,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-5915263172",
      "label": "+91-5915263172",
      "phone": "+91-9882961980",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Gagan Rao",
      "label": "Md. Gagan Rao",
      "phone": "+91-5714909698",
      "threat_score": 37.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1313704144",
      "label": "+91-1313704144",
      "phone": "+91-9852998190",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Peter Barad",
      "label": "Md. Peter Barad",
      "phone": "+91-9440790043",
      "threat_score": 40.7,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7799749261",
      "label": "+91-7799749261",
      "phone": "+91-9842056142",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Nihal Rana",
      "label": "Md. Nihal Rana",
      "phone": "+91-5691317104",
      "threat_score": 36.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4273670069",
      "label": "+91-4273670069",
      "phone": "+91-9878173637",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Arjun Sheth",
      "label": "Md. Arjun Sheth",
      "phone": "+91-6111449019",
      "threat_score": 45.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-3211806618",
      "label": "+91-3211806618",
      "phone": "+91-9865710010",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4598784260",
      "label": "+91-4598784260",
      "phone": "+91-9896896168",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Laban Prakash",
      "label": "Md. Laban Prakash",
      "phone": "+91-5372652872",
      "threat_score": 40.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1951231046",
      "label": "+91-1951231046",
      "phone": "+91-9890399309",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-3684198529",
      "label": "+91-3684198529",
      "phone": "+91-9833948961",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8935396640",
      "label": "+91-8935396640",
      "phone": "+91-9892724725",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Ayush Baria",
      "label": "Md. Ayush Baria",
      "phone": "+91-6993641756",
      "threat_score": 30.1,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4983630267",
      "label": "+91-4983630267",
      "phone": "+91-9824999374",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Dominic Gupta",
      "label": "Md. Dominic Gupta",
      "phone": "+91-9954528199",
      "threat_score": 33.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-3691955937",
      "label": "+91-3691955937",
      "phone": "+91-9863752174",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Naveen Tailor",
      "label": "Md. Naveen Tailor",
      "phone": "+91-1549231524",
      "threat_score": 31.1,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7507465885",
      "label": "+91-7507465885",
      "phone": "+91-9815925805",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Frado Dhingra",
      "label": "Md. Frado Dhingra",
      "phone": "+91-0333553548",
      "threat_score": 35.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-6641847435",
      "label": "+91-6641847435",
      "phone": "+91-9858412795",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Kevin Ganesan",
      "label": "Md. Kevin Ganesan",
      "phone": "+91-5505012573",
      "threat_score": 33.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-6822881229",
      "label": "+91-6822881229",
      "phone": "+91-9846731467",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Wriddhish Varty",
      "label": "Md. Wriddhish Varty",
      "phone": "+91-8726663475",
      "threat_score": 32.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4171972095",
      "label": "+91-4171972095",
      "phone": "+91-9844524410",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Jeet Saha",
      "label": "Md. Jeet Saha",
      "phone": "+91-2751214628",
      "threat_score": 28.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1250436793",
      "label": "+91-1250436793",
      "phone": "+91-9856026473",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Anay Minhas",
      "label": "Md. Anay Minhas",
      "phone": "+91-4475823294",
      "threat_score": 23.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-2278623406",
      "label": "+91-2278623406",
      "phone": "+91-9815663194",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Jatin Murthy",
      "label": "Md. Jatin Murthy",
      "phone": "+91-0437844453",
      "threat_score": 19.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1746159750",
      "label": "+91-1746159750",
      "phone": "+91-9831699183",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Reyansh Mangal",
      "label": "Md. Reyansh Mangal",
      "phone": "+91-0193610079",
      "threat_score": 37.1,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4684812524",
      "label": "+91-4684812524",
      "phone": "+91-9878437978",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Elijah Ganguly",
      "label": "Md. Elijah Ganguly",
      "phone": "+91-6320194538",
      "threat_score": 25.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8667541428",
      "label": "+91-8667541428",
      "phone": "+91-9842043610",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Tejas Nigam",
      "label": "Md. Tejas Nigam",
      "phone": "+91-4414875019",
      "threat_score": 20.3,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-3450312271",
      "label": "+91-3450312271",
      "phone": "+91-9827699238",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Akshay Lata",
      "label": "Md. Akshay Lata",
      "phone": "+91-2325906102",
      "threat_score": 25.3,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1189756397",
      "label": "+91-1189756397",
      "phone": "+91-9894623546",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Frederick Nori",
      "label": "Md. Frederick Nori",
      "phone": "+91-0009063115",
      "threat_score": 20.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-6799582777",
      "label": "+91-6799582777",
      "phone": "+91-9816446929",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Brijesh Goda",
      "label": "Md. Brijesh Goda",
      "phone": "+91-6454080360",
      "threat_score": 26.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1395100063",
      "label": "+91-1395100063",
      "phone": "+91-9829269356",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Qadim Solanki",
      "label": "Md. Qadim Solanki",
      "phone": "+91-6530338206",
      "threat_score": 26.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1044800820",
      "label": "+91-1044800820",
      "phone": "+91-9899045846",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Daniel Raman",
      "label": "Md. Daniel Raman",
      "phone": "+91-5203140569",
      "threat_score": 31.2,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1525809736",
      "label": "+91-1525809736",
      "phone": "+91-9811046099",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4702317695",
      "label": "+91-4702317695",
      "phone": "+91-9811734285",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Frederick Gade",
      "label": "Md. Frederick Gade",
      "phone": "+91-9749956561",
      "threat_score": 33.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4521265079",
      "label": "+91-4521265079",
      "phone": "+91-9868547466",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Raghav Manda",
      "label": "Md. Raghav Manda",
      "phone": "+91-9386771558",
      "threat_score": 26.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-5833469312",
      "label": "+91-5833469312",
      "phone": "+91-9869519685",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Laban Sidhu",
      "label": "Md. Laban Sidhu",
      "phone": "+91-1679781002",
      "threat_score": 35.7,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-9641070073",
      "label": "+91-9641070073",
      "phone": "+91-9841053074",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Vihaan Vohra",
      "label": "Md. Vihaan Vohra",
      "phone": "+91-1608300776",
      "threat_score": 21.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-3923216148",
      "label": "+91-3923216148",
      "phone": "+91-9894097802",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. David Nayak",
      "label": "Md. David Nayak",
      "phone": "+91-0908250618",
      "threat_score": 28.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-3758973716",
      "label": "+91-3758973716",
      "phone": "+91-9890626707",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-9156712697",
      "label": "+91-9156712697",
      "phone": "+91-9892394798",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Matthew Om",
      "label": "Md. Matthew Om",
      "phone": "+91-2323764440",
      "threat_score": 19.1,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-0340298591",
      "label": "+91-0340298591",
      "phone": "+91-9845173693",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Rayaan Bhavsar",
      "label": "Md. Rayaan Bhavsar",
      "phone": "+91-9135444363",
      "threat_score": 19.2,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1364678894",
      "label": "+91-1364678894",
      "phone": "+91-9819428601",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Hemang Shere",
      "label": "Md. Hemang Shere",
      "phone": "+91-1359460122",
      "threat_score": 34.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8163791530",
      "label": "+91-8163791530",
      "phone": "+91-9840319157",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Jeet Sachdeva",
      "label": "Md. Jeet Sachdeva",
      "phone": "+91-4631009912",
      "threat_score": 32.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-3997099578",
      "label": "+91-3997099578",
      "phone": "+91-9854698500",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Zehaan Wali",
      "label": "Md. Zehaan Wali",
      "phone": "+91-8000129596",
      "threat_score": 22.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7486245083",
      "label": "+91-7486245083",
      "phone": "+91-9857797384",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Aarnav Sekhon",
      "label": "Md. Aarnav Sekhon",
      "phone": "+91-7235641635",
      "threat_score": 28.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8418562933",
      "label": "+91-8418562933",
      "phone": "+91-9896194492",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Qarin Balan",
      "label": "Md. Qarin Balan",
      "phone": "+91-4277185805",
      "threat_score": 31.8,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7171626711",
      "label": "+91-7171626711",
      "phone": "+91-9867468243",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Balhaar Sami",
      "label": "Md. Balhaar Sami",
      "phone": "+91-1715766898",
      "threat_score": 30.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-9080085208",
      "label": "+91-9080085208",
      "phone": "+91-9861225804",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Warjas Khalsa",
      "label": "Md. Warjas Khalsa",
      "phone": "+91-2023838998",
      "threat_score": 20.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-0524161213",
      "label": "+91-0524161213",
      "phone": "+91-9844760623",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Alexander Master",
      "label": "Md. Alexander Master",
      "phone": "+91-9405178098",
      "threat_score": 34.1,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-0162900589",
      "label": "+91-0162900589",
      "phone": "+91-9844370123",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Yagnesh Zacharia",
      "label": "Md. Yagnesh Zacharia",
      "phone": "+91-1681067925",
      "threat_score": 20.8,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8975030242",
      "label": "+91-8975030242",
      "phone": "+91-9861143086",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7740381949",
      "label": "+91-7740381949",
      "phone": "+91-9845636984",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Gaurang Bhatti",
      "label": "Md. Gaurang Bhatti",
      "phone": "+91-7194825001",
      "threat_score": 22.5,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8267178405",
      "label": "+91-8267178405",
      "phone": "+91-9858095034",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4373688889",
      "label": "+91-4373688889",
      "phone": "+91-9875428676",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Ansh Sandal",
      "label": "Md. Ansh Sandal",
      "phone": "+91-2507232638",
      "threat_score": 38.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-0139452164",
      "label": "+91-0139452164",
      "phone": "+91-9827664148",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Harsh Samra",
      "label": "Md. Harsh Samra",
      "phone": "+91-8762291976",
      "threat_score": 28.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-5482105475",
      "label": "+91-5482105475",
      "phone": "+91-9863631755",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Zaid Nair",
      "label": "Md. Zaid Nair",
      "phone": "+91-2579426125",
      "threat_score": 35.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8951032064",
      "label": "+91-8951032064",
      "phone": "+91-9841161798",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Frado Raja",
      "label": "Md. Frado Raja",
      "phone": "+91-3504184157",
      "threat_score": 21.2,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-6161680532",
      "label": "+91-6161680532",
      "phone": "+91-9869258980",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Owen Ganesh",
      "label": "Md. Owen Ganesh",
      "phone": "+91-4501079897",
      "threat_score": 25.2,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-2779148518",
      "label": "+91-2779148518",
      "phone": "+91-9846979991",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-9204164298",
      "label": "+91-9204164298",
      "phone": "+91-9873607510",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Rudra Narula",
      "label": "Md. Rudra Narula",
      "phone": "+91-8771310836",
      "threat_score": 31.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-5940579305",
      "label": "+91-5940579305",
      "phone": "+91-9857107361",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Onveer Bahl",
      "label": "Md. Onveer Bahl",
      "phone": "+91-8335561055",
      "threat_score": 34.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-3904615590",
      "label": "+91-3904615590",
      "phone": "+91-9825480206",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1980611562",
      "label": "+91-1980611562",
      "phone": "+91-9894488808",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Wridesh Virk",
      "label": "Md. Wridesh Virk",
      "phone": "+91-2343985265",
      "threat_score": 28.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4778000151",
      "label": "+91-4778000151",
      "phone": "+91-9896789251",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Wridesh Bali",
      "label": "Md. Wridesh Bali",
      "phone": "+91-2971614670",
      "threat_score": 30.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-2150790686",
      "label": "+91-2150790686",
      "phone": "+91-9852885952",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Manan Subramanian",
      "label": "Md. Manan Subramanian",
      "phone": "+91-8164539334",
      "threat_score": 28.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-9967968993",
      "label": "+91-9967968993",
      "phone": "+91-9810414421",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-2818487325",
      "label": "+91-2818487325",
      "phone": "+91-9853254293",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Samar Golla",
      "label": "Md. Samar Golla",
      "phone": "+91-4830450019",
      "threat_score": 27.2,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7418523271",
      "label": "+91-7418523271",
      "phone": "+91-9812647582",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Jagdish Acharya",
      "label": "Md. Jagdish Acharya",
      "phone": "+91-6400189254",
      "threat_score": 25.3,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-2050251598",
      "label": "+91-2050251598",
      "phone": "+91-9842570019",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Yagnesh Tak",
      "label": "Md. Yagnesh Tak",
      "phone": "+91-9377098052",
      "threat_score": 27.3,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-8352292464",
      "label": "+91-8352292464",
      "phone": "+91-9896548982",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Falan Krishna",
      "label": "Md. Falan Krishna",
      "phone": "+91-8579159927",
      "threat_score": 30.8,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-1540172781",
      "label": "+91-1540172781",
      "phone": "+91-9847030767",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Veer Devi",
      "label": "Md. Veer Devi",
      "phone": "+91-5037744332",
      "threat_score": 26.9,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7079832489",
      "label": "+91-7079832489",
      "phone": "+91-9866161809",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Umang Sabharwal",
      "label": "Md. Umang Sabharwal",
      "phone": "+91-6997065590",
      "threat_score": 25.6,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7007685069",
      "label": "+91-7007685069",
      "phone": "+91-9822912469",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Chanakya Chaudhari",
      "label": "Md. Chanakya Chaudhari",
      "phone": "+91-7907250746",
      "threat_score": 29.1,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-0122059359",
      "label": "+91-0122059359",
      "phone": "+91-9897991980",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-6939681756",
      "label": "+91-6939681756",
      "phone": "+91-9881810886",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Sathvik Pant",
      "label": "Md. Sathvik Pant",
      "phone": "+91-1554078824",
      "threat_score": 20.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-2481972339",
      "label": "+91-2481972339",
      "phone": "+91-9863652859",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Chakradhar Batta",
      "label": "Md. Chakradhar Batta",
      "phone": "+91-9000406254",
      "threat_score": 18.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-7813014202",
      "label": "+91-7813014202",
      "phone": "+91-9819841627",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Oliver Dasgupta",
      "label": "Md. Oliver Dasgupta",
      "phone": "+91-0224687988",
      "threat_score": 30.1,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-2913723000",
      "label": "+91-2913723000",
      "phone": "+91-9875053335",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Ranbir Bains",
      "label": "Md. Ranbir Bains",
      "phone": "+91-6072329900",
      "threat_score": 27.4,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-0863104046",
      "label": "+91-0863104046",
      "phone": "+91-9839963759",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Karan Mistry",
      "label": "Md. Karan Mistry",
      "phone": "+91-3203295820",
      "threat_score": 27.8,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "+91-4911446112",
      "label": "+91-4911446112",
      "phone": "+91-9891479857",
      "threat_score": 65.0,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "HIGH",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    },
    {
      "id": "Md. Dev Mani",
      "label": "Md. Dev Mani",
      "phone": "+91-7339277969",
      "threat_score": 30.8,
      "degree_centrality": 0.82,
      "betweenness_centrality": 0.74,
      "total_calls_count": 140,
      "connected_entities_count": 6,
      "nocturnal_calls_count": 42,
      "risk_tier": "MODERATE",
      "gang_id": "RING-02",
      "gang_name": "Dongri Smuggling Ring"
    }
  ],
  "edges": [
    {
      "id": "Md. Ranbir Bhalla-Md. Vedant Padmanabhan",
      "source": "Md. Ranbir Bhalla",
      "target": "Md. Vedant Padmanabhan",
      "total_calls": 9,
      "weight": 9
    },
    {
      "id": "Md. Pranit Arya-Md. Ranbir Bhalla",
      "source": "Md. Pranit Arya",
      "target": "Md. Ranbir Bhalla",
      "total_calls": 9,
      "weight": 9
    },
    {
      "id": "Md. Christopher Pillai-Md. Robert Narain",
      "source": "Md. Christopher Pillai",
      "target": "Md. Robert Narain",
      "total_calls": 9,
      "weight": 9
    },
    {
      "id": "Md. Advik Golla-Md. Darsh Sampath",
      "source": "Md. Advik Golla",
      "target": "Md. Darsh Sampath",
      "total_calls": 8,
      "weight": 8
    },
    {
      "id": "Md. Maanav Tailor-Md. Umang Mody",
      "source": "Md. Maanav Tailor",
      "target": "Md. Umang Mody",
      "total_calls": 8,
      "weight": 8
    },
    {
      "id": "Md. Harish Bali-Md. Harrison Sarna",
      "source": "Md. Harish Bali",
      "target": "Md. Harrison Sarna",
      "total_calls": 8,
      "weight": 8
    },
    {
      "id": "Md. Azad Mannan-Md. Indrajit Kunda",
      "source": "Md. Azad Mannan",
      "target": "Md. Indrajit Kunda",
      "total_calls": 7,
      "weight": 7
    },
    {
      "id": "Md. George Ramaswamy-Md. Umang Mody",
      "source": "Md. George Ramaswamy",
      "target": "Md. Umang Mody",
      "total_calls": 6,
      "weight": 6
    },
    {
      "id": "Md. Ranbir Bhalla-Md. Teerth Bhargava",
      "source": "Md. Ranbir Bhalla",
      "target": "Md. Teerth Bhargava",
      "total_calls": 5,
      "weight": 5
    },
    {
      "id": "Md. Samar Nagar-Md. Teerth Bhargava",
      "source": "Md. Samar Nagar",
      "target": "Md. Teerth Bhargava",
      "total_calls": 5,
      "weight": 5
    },
    {
      "id": "Md. Teerth Bhargava-Md. Zashil Mistry",
      "source": "Md. Teerth Bhargava",
      "target": "Md. Zashil Mistry",
      "total_calls": 4,
      "weight": 4
    },
    {
      "id": "Md. Balendra Nayak-Md. Tarak Sahni",
      "source": "Md. Balendra Nayak",
      "target": "Md. Tarak Sahni",
      "total_calls": 4,
      "weight": 4
    },
    {
      "id": "+91-7155522441-Md. Ojas Bhavsar",
      "source": "+91-7155522441",
      "target": "Md. Ojas Bhavsar",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-6658277894-Md. Sathvik Mahajan",
      "source": "+91-6658277894",
      "target": "Md. Sathvik Mahajan",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-0083322930-Md. Elijah Rege",
      "source": "+91-0083322930",
      "target": "Md. Elijah Rege",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-0988006174-Md. Ranbir Bhalla",
      "source": "+91-0988006174",
      "target": "Md. Ranbir Bhalla",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8261621115-Md. Simon Rai",
      "source": "+91-8261621115",
      "target": "Md. Simon Rai",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8535218781-Md. Tarak Sahni",
      "source": "+91-8535218781",
      "target": "Md. Tarak Sahni",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-7380064908-Md. Ayush Buch",
      "source": "+91-7380064908",
      "target": "Md. Ayush Buch",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-2249298044-Md. Amol Nagy",
      "source": "+91-2249298044",
      "target": "Md. Amol Nagy",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1296901195-Md. Baljiwan Hayer",
      "source": "+91-1296901195",
      "target": "Md. Baljiwan Hayer",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-7036067702-Md. Devansh Vohra",
      "source": "+91-7036067702",
      "target": "Md. Devansh Vohra",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-5529660417-Md. Gopal Radhakrishnan",
      "source": "+91-5529660417",
      "target": "Md. Gopal Radhakrishnan",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-9530679275-Md. Zayyan Ahluwalia",
      "source": "+91-9530679275",
      "target": "Md. Zayyan Ahluwalia",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-3566383950-Md. Rudra Sant",
      "source": "+91-3566383950",
      "target": "Md. Rudra Sant",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8101692629-Md. Fitan Mander",
      "source": "+91-8101692629",
      "target": "Md. Fitan Mander",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-5376571151-Md. Nachiket Desai",
      "source": "+91-5376571151",
      "target": "Md. Nachiket Desai",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-5405416287-Md. Maanav Tailor",
      "source": "+91-5405416287",
      "target": "Md. Maanav Tailor",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-9937146397-Md. Balendra Nayak",
      "source": "+91-9937146397",
      "target": "Md. Balendra Nayak",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8841380062-Md. Robert Narain",
      "source": "+91-8841380062",
      "target": "Md. Robert Narain",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-3531160657-Md. Tanveer Choudhary",
      "source": "+91-3531160657",
      "target": "Md. Tanveer Choudhary",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-2769136542-Md. Azad Mannan",
      "source": "+91-2769136542",
      "target": "Md. Azad Mannan",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8324791927-Md. Amol Mody",
      "source": "+91-8324791927",
      "target": "Md. Amol Mody",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8831730519-Md. Zaid Bhattacharyya",
      "source": "+91-8831730519",
      "target": "Md. Zaid Bhattacharyya",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4969103950-Md. Nicholas Karpe",
      "source": "+91-4969103950",
      "target": "Md. Nicholas Karpe",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1298742862-Md. Indrajit Kunda",
      "source": "+91-1298742862",
      "target": "Md. Indrajit Kunda",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-6304508680-Md. Pranit Arya",
      "source": "+91-6304508680",
      "target": "Md. Pranit Arya",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4754813913-Md. Reyansh Anne",
      "source": "+91-4754813913",
      "target": "Md. Reyansh Anne",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-6216694266-Md. Andrew Bora",
      "source": "+91-6216694266",
      "target": "Md. Andrew Bora",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-5915263172-Md. Gagan Rao",
      "source": "+91-5915263172",
      "target": "Md. Gagan Rao",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1313704144-Md. Peter Barad",
      "source": "+91-1313704144",
      "target": "Md. Peter Barad",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-7799749261-Md. Nihal Rana",
      "source": "+91-7799749261",
      "target": "Md. Nihal Rana",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4273670069-Md. Arjun Sheth",
      "source": "+91-4273670069",
      "target": "Md. Arjun Sheth",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-3211806618-Md. Umang Mody",
      "source": "+91-3211806618",
      "target": "Md. Umang Mody",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4598784260-Md. Laban Prakash",
      "source": "+91-4598784260",
      "target": "Md. Laban Prakash",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1951231046-Md. Zashil Mistry",
      "source": "+91-1951231046",
      "target": "Md. Zashil Mistry",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-3684198529-Md. Advik Golla",
      "source": "+91-3684198529",
      "target": "Md. Advik Golla",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8935396640-Md. Ayush Baria",
      "source": "+91-8935396640",
      "target": "Md. Ayush Baria",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4983630267-Md. Dominic Gupta",
      "source": "+91-4983630267",
      "target": "Md. Dominic Gupta",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-3691955937-Md. Naveen Tailor",
      "source": "+91-3691955937",
      "target": "Md. Naveen Tailor",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-7507465885-Md. Frado Dhingra",
      "source": "+91-7507465885",
      "target": "Md. Frado Dhingra",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-6641847435-Md. Kevin Ganesan",
      "source": "+91-6641847435",
      "target": "Md. Kevin Ganesan",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-6822881229-Md. Wriddhish Varty",
      "source": "+91-6822881229",
      "target": "Md. Wriddhish Varty",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4171972095-Md. Jeet Saha",
      "source": "+91-4171972095",
      "target": "Md. Jeet Saha",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1250436793-Md. Anay Minhas",
      "source": "+91-1250436793",
      "target": "Md. Anay Minhas",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-2278623406-Md. Jatin Murthy",
      "source": "+91-2278623406",
      "target": "Md. Jatin Murthy",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1746159750-Md. Reyansh Mangal",
      "source": "+91-1746159750",
      "target": "Md. Reyansh Mangal",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4684812524-Md. Elijah Ganguly",
      "source": "+91-4684812524",
      "target": "Md. Elijah Ganguly",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8667541428-Md. Tejas Nigam",
      "source": "+91-8667541428",
      "target": "Md. Tejas Nigam",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-3450312271-Md. Akshay Lata",
      "source": "+91-3450312271",
      "target": "Md. Akshay Lata",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1189756397-Md. Frederick Nori",
      "source": "+91-1189756397",
      "target": "Md. Frederick Nori",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-6799582777-Md. Brijesh Goda",
      "source": "+91-6799582777",
      "target": "Md. Brijesh Goda",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1395100063-Md. Qadim Solanki",
      "source": "+91-1395100063",
      "target": "Md. Qadim Solanki",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1044800820-Md. Daniel Raman",
      "source": "+91-1044800820",
      "target": "Md. Daniel Raman",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1525809736-Md. Christopher Pillai",
      "source": "+91-1525809736",
      "target": "Md. Christopher Pillai",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4702317695-Md. Frederick Gade",
      "source": "+91-4702317695",
      "target": "Md. Frederick Gade",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4521265079-Md. Raghav Manda",
      "source": "+91-4521265079",
      "target": "Md. Raghav Manda",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-5833469312-Md. Laban Sidhu",
      "source": "+91-5833469312",
      "target": "Md. Laban Sidhu",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-9641070073-Md. Vihaan Vohra",
      "source": "+91-9641070073",
      "target": "Md. Vihaan Vohra",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-3923216148-Md. David Nayak",
      "source": "+91-3923216148",
      "target": "Md. David Nayak",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-3758973716-Md. Harish Bali",
      "source": "+91-3758973716",
      "target": "Md. Harish Bali",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-9156712697-Md. Matthew Om",
      "source": "+91-9156712697",
      "target": "Md. Matthew Om",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-0340298591-Md. Rayaan Bhavsar",
      "source": "+91-0340298591",
      "target": "Md. Rayaan Bhavsar",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1364678894-Md. Hemang Shere",
      "source": "+91-1364678894",
      "target": "Md. Hemang Shere",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8163791530-Md. Jeet Sachdeva",
      "source": "+91-8163791530",
      "target": "Md. Jeet Sachdeva",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-3997099578-Md. Zehaan Wali",
      "source": "+91-3997099578",
      "target": "Md. Zehaan Wali",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-7486245083-Md. Aarnav Sekhon",
      "source": "+91-7486245083",
      "target": "Md. Aarnav Sekhon",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8418562933-Md. Qarin Balan",
      "source": "+91-8418562933",
      "target": "Md. Qarin Balan",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-7171626711-Md. Balhaar Sami",
      "source": "+91-7171626711",
      "target": "Md. Balhaar Sami",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-9080085208-Md. Warjas Khalsa",
      "source": "+91-9080085208",
      "target": "Md. Warjas Khalsa",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-0524161213-Md. Alexander Master",
      "source": "+91-0524161213",
      "target": "Md. Alexander Master",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-0162900589-Md. Yagnesh Zacharia",
      "source": "+91-0162900589",
      "target": "Md. Yagnesh Zacharia",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8975030242-Md. Vedant Padmanabhan",
      "source": "+91-8975030242",
      "target": "Md. Vedant Padmanabhan",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-7740381949-Md. Gaurang Bhatti",
      "source": "+91-7740381949",
      "target": "Md. Gaurang Bhatti",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8267178405-Md. Harrison Sarna",
      "source": "+91-8267178405",
      "target": "Md. Harrison Sarna",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4373688889-Md. Ansh Sandal",
      "source": "+91-4373688889",
      "target": "Md. Ansh Sandal",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-0139452164-Md. Harsh Samra",
      "source": "+91-0139452164",
      "target": "Md. Harsh Samra",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-5482105475-Md. Zaid Nair",
      "source": "+91-5482105475",
      "target": "Md. Zaid Nair",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8951032064-Md. Frado Raja",
      "source": "+91-8951032064",
      "target": "Md. Frado Raja",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-6161680532-Md. Owen Ganesh",
      "source": "+91-6161680532",
      "target": "Md. Owen Ganesh",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-2779148518-Md. George Ramaswamy",
      "source": "+91-2779148518",
      "target": "Md. George Ramaswamy",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-9204164298-Md. Rudra Narula",
      "source": "+91-9204164298",
      "target": "Md. Rudra Narula",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-5940579305-Md. Onveer Bahl",
      "source": "+91-5940579305",
      "target": "Md. Onveer Bahl",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-3904615590-Md. Darsh Sampath",
      "source": "+91-3904615590",
      "target": "Md. Darsh Sampath",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1980611562-Md. Wridesh Virk",
      "source": "+91-1980611562",
      "target": "Md. Wridesh Virk",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4778000151-Md. Wridesh Bali",
      "source": "+91-4778000151",
      "target": "Md. Wridesh Bali",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-2150790686-Md. Manan Subramanian",
      "source": "+91-2150790686",
      "target": "Md. Manan Subramanian",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-9967968993-Md. Teerth Bhargava",
      "source": "+91-9967968993",
      "target": "Md. Teerth Bhargava",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-2818487325-Md. Samar Golla",
      "source": "+91-2818487325",
      "target": "Md. Samar Golla",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-7418523271-Md. Jagdish Acharya",
      "source": "+91-7418523271",
      "target": "Md. Jagdish Acharya",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-2050251598-Md. Yagnesh Tak",
      "source": "+91-2050251598",
      "target": "Md. Yagnesh Tak",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-8352292464-Md. Falan Krishna",
      "source": "+91-8352292464",
      "target": "Md. Falan Krishna",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-1540172781-Md. Veer Devi",
      "source": "+91-1540172781",
      "target": "Md. Veer Devi",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-7079832489-Md. Umang Sabharwal",
      "source": "+91-7079832489",
      "target": "Md. Umang Sabharwal",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-7007685069-Md. Chanakya Chaudhari",
      "source": "+91-7007685069",
      "target": "Md. Chanakya Chaudhari",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-0122059359-Md. Samar Nagar",
      "source": "+91-0122059359",
      "target": "Md. Samar Nagar",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-6939681756-Md. Sathvik Pant",
      "source": "+91-6939681756",
      "target": "Md. Sathvik Pant",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-2481972339-Md. Chakradhar Batta",
      "source": "+91-2481972339",
      "target": "Md. Chakradhar Batta",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-7813014202-Md. Oliver Dasgupta",
      "source": "+91-7813014202",
      "target": "Md. Oliver Dasgupta",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-2913723000-Md. Ranbir Bains",
      "source": "+91-2913723000",
      "target": "Md. Ranbir Bains",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-0863104046-Md. Karan Mistry",
      "source": "+91-0863104046",
      "target": "Md. Karan Mistry",
      "total_calls": 1,
      "weight": 1
    },
    {
      "id": "+91-4911446112-Md. Dev Mani",
      "source": "+91-4911446112",
      "target": "Md. Dev Mani",
      "total_calls": 1,
      "weight": 1
    }
  ]
};

export const fallbackCCTVMeetings: CCTVMeetingsResponse = {
  "total_encounters": 12,
  "avg_confidence_pct": 91.4,
  "mean_distance_meters": 14.2,
  "meetings": [
    {
      "suspect_1": "Md. Samar Nagar",
      "suspect_2": "Md. Teerth Bhargava",
      "camera_id": "MH-CCTV-2466",
      "camera_location": "Main Road Traffic Signal, Agripada, Mumbai",
      "cdr_call_count": 5,
      "avg_distance_meters": 179.0,
      "avg_match_confidence": 0.97,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    },
    {
      "suspect_1": "Md. Balendra Nayak",
      "suspect_2": "Md. Tarak Sahni",
      "camera_id": "MH-CCTV-1652",
      "camera_location": "Market Entrance, Byculla West, Mumbai",
      "cdr_call_count": 4,
      "avg_distance_meters": 207.0,
      "avg_match_confidence": 0.96,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    },
    {
      "suspect_1": "Md. Azad Mannan",
      "suspect_2": "Md. Indrajit Kunda",
      "camera_id": "MH-CCTV-1652",
      "camera_location": "Market Entrance, Byculla West, Mumbai",
      "cdr_call_count": 7,
      "avg_distance_meters": 152.0,
      "avg_match_confidence": 0.95,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    },
    {
      "suspect_1": "Md. Advik Golla",
      "suspect_2": "Md. Darsh Sampath",
      "camera_id": "MH-CCTV-5719",
      "camera_location": "Flyover Service Road, Lower Parel, Mumbai",
      "cdr_call_count": 8,
      "avg_distance_meters": 104.5,
      "avg_match_confidence": 0.91,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    },
    {
      "suspect_1": "Md. Advik Golla",
      "suspect_2": "Md. Darsh Sampath",
      "camera_id": "MH-CCTV-1652",
      "camera_location": "Market Entrance, Byculla West, Mumbai",
      "cdr_call_count": 8,
      "avg_distance_meters": 193.5,
      "avg_match_confidence": 0.91,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    },
    {
      "suspect_1": "Md. Azad Mannan",
      "suspect_2": "Md. Indrajit Kunda",
      "camera_id": "MH-CCTV-9173",
      "camera_location": "Metro Access Road, Byculla West, Mumbai",
      "cdr_call_count": 7,
      "avg_distance_meters": 173.0,
      "avg_match_confidence": 0.91,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    },
    {
      "suspect_1": "Md. Teerth Bhargava",
      "suspect_2": "Md. Zashil Mistry",
      "camera_id": "MH-CCTV-2466",
      "camera_location": "Main Road Traffic Signal, Agripada, Mumbai",
      "cdr_call_count": 4,
      "avg_distance_meters": 94.5,
      "avg_match_confidence": 0.91,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    },
    {
      "suspect_1": "Md. Teerth Bhargava",
      "suspect_2": "Md. Zashil Mistry",
      "camera_id": "MH-CCTV-5719",
      "camera_location": "Flyover Service Road, Lower Parel, Mumbai",
      "cdr_call_count": 4,
      "avg_distance_meters": 121.5,
      "avg_match_confidence": 0.9,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    },
    {
      "suspect_1": "Md. Ranbir Bhalla",
      "suspect_2": "Md. Teerth Bhargava",
      "camera_id": "MH-CCTV-9173",
      "camera_location": "Metro Access Road, Byculla West, Mumbai",
      "cdr_call_count": 5,
      "avg_distance_meters": 172.0,
      "avg_match_confidence": 0.89,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    },
    {
      "suspect_1": "Md. Samar Nagar",
      "suspect_2": "Md. Teerth Bhargava",
      "camera_id": "MH-CCTV-2466",
      "camera_location": "Main Road Traffic Signal, Agripada, Mumbai",
      "cdr_call_count": 5,
      "avg_distance_meters": 166.5,
      "avg_match_confidence": 0.89,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    },
    {
      "suspect_1": "Md. Balendra Nayak",
      "suspect_2": "Md. Tarak Sahni",
      "camera_id": "MH-CCTV-9890",
      "camera_location": "Public Footpath Corner, Lower Parel, Mumbai",
      "cdr_call_count": 4,
      "avg_distance_meters": 236.0,
      "avg_match_confidence": 0.89,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    },
    {
      "suspect_1": "Md. Ranbir Bhalla",
      "suspect_2": "Md. Teerth Bhargava",
      "camera_id": "MH-CCTV-9890",
      "camera_location": "Public Footpath Corner, Lower Parel, Mumbai",
      "cdr_call_count": 5,
      "avg_distance_meters": 174.0,
      "avg_match_confidence": 0.84,
      "sighting_status": "CONFIRMED_PHYSICAL_MEETING",
      "encounter_time": "2026-03-14 14:30:00"
    }
  ]
};

export const fallbackGangs: GangListResponse = {
  "total_gangs": 88,
  "confirmed_count": 88,
  "candidate_count": 0,
  "dismissed_count": 0,
  "gangs": [
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 12,
      "members": [
        "Md. Zashil Mistry",
        "Md. Ranbir Bhalla",
        "Md. Teerth Bhargava",
        "Md. Samar Nagar",
        "Md. Pranit Arya",
        "Md. Vedant Padmanabhan",
        "+91-6304508680",
        "+91-8975030242",
        "+91-0988006174",
        "+91-9967968993",
        "+91-0122059359",
        "+91-1951231046"
      ],
      "ring_leader": "Md. Zashil Mistry",
      "leader_phone": "+91-0356058771",
      "aggregate_threat_score": 83.5,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 4,
      "members": [
        "Md. Advik Golla",
        "Md. Darsh Sampath",
        "+91-3904615590",
        "+91-3684198529"
      ],
      "ring_leader": "Md. Advik Golla",
      "leader_phone": "+91-0751400478",
      "aggregate_threat_score": 89.1,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 4,
      "members": [
        "Md. Azad Mannan",
        "Md. Indrajit Kunda",
        "+91-1298742862",
        "+91-2769136542"
      ],
      "ring_leader": "Md. Azad Mannan",
      "leader_phone": "+91-8472516266",
      "aggregate_threat_score": 75.8,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 4,
      "members": [
        "Md. Balendra Nayak",
        "Md. Tarak Sahni",
        "+91-9937146397",
        "+91-8535218781"
      ],
      "ring_leader": "Md. Balendra Nayak",
      "leader_phone": "+91-7309005344",
      "aggregate_threat_score": 71.3,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 6,
      "members": [
        "Md. Umang Mody",
        "Md. Maanav Tailor",
        "Md. George Ramaswamy",
        "+91-3211806618",
        "+91-5405416287",
        "+91-2779148518"
      ],
      "ring_leader": "Md. Umang Mody",
      "leader_phone": "+91-0953911949",
      "aggregate_threat_score": 54.5,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 4,
      "members": [
        "Md. Robert Narain",
        "Md. Christopher Pillai",
        "+91-1525809736",
        "+91-8841380062"
      ],
      "ring_leader": "Md. Robert Narain",
      "leader_phone": "+91-0909634931",
      "aggregate_threat_score": 49.5,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 4,
      "members": [
        "Md. Harish Bali",
        "Md. Harrison Sarna",
        "+91-3758973716",
        "+91-8267178405"
      ],
      "ring_leader": "Md. Harish Bali",
      "leader_phone": "+91-6463599241",
      "aggregate_threat_score": 42.5,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Ojas Bhavsar",
        "+91-7155522441"
      ],
      "ring_leader": "Md. Ojas Bhavsar",
      "leader_phone": "+91-3088060716",
      "aggregate_threat_score": 40.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Sathvik Mahajan",
        "+91-6658277894"
      ],
      "ring_leader": "Md. Sathvik Mahajan",
      "leader_phone": "+91-4612031808",
      "aggregate_threat_score": 41.2,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Elijah Rege",
        "+91-0083322930"
      ],
      "ring_leader": "Md. Elijah Rege",
      "leader_phone": "+91-1324892076",
      "aggregate_threat_score": 40.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Simon Rai",
        "+91-8261621115"
      ],
      "ring_leader": "Md. Simon Rai",
      "leader_phone": "+91-6754235346",
      "aggregate_threat_score": 42.8,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Ayush Buch",
        "+91-7380064908"
      ],
      "ring_leader": "Md. Ayush Buch",
      "leader_phone": "+91-8561621656",
      "aggregate_threat_score": 40.2,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Amol Nagy",
        "+91-2249298044"
      ],
      "ring_leader": "Md. Amol Nagy",
      "leader_phone": "+91-3128261525",
      "aggregate_threat_score": 38.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Baljiwan Hayer",
        "+91-1296901195"
      ],
      "ring_leader": "Md. Baljiwan Hayer",
      "leader_phone": "+91-0327979516",
      "aggregate_threat_score": 31.3,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Devansh Vohra",
        "+91-7036067702"
      ],
      "ring_leader": "Md. Devansh Vohra",
      "leader_phone": "+91-7245876065",
      "aggregate_threat_score": 32.8,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Gopal Radhakrishnan",
        "+91-5529660417"
      ],
      "ring_leader": "Md. Gopal Radhakrishnan",
      "leader_phone": "+91-9997632226",
      "aggregate_threat_score": 38.0,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Zayyan Ahluwalia",
        "+91-9530679275"
      ],
      "ring_leader": "Md. Zayyan Ahluwalia",
      "leader_phone": "+91-0421607034",
      "aggregate_threat_score": 20.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Rudra Sant",
        "+91-3566383950"
      ],
      "ring_leader": "Md. Rudra Sant",
      "leader_phone": "+91-7744695455",
      "aggregate_threat_score": 18.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Fitan Mander",
        "+91-8101692629"
      ],
      "ring_leader": "Md. Fitan Mander",
      "leader_phone": "+91-0283885531",
      "aggregate_threat_score": 23.0,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Nachiket Desai",
        "+91-5376571151"
      ],
      "ring_leader": "Md. Nachiket Desai",
      "leader_phone": "+91-3029050253",
      "aggregate_threat_score": 28.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Tanveer Choudhary",
        "+91-3531160657"
      ],
      "ring_leader": "Md. Tanveer Choudhary",
      "leader_phone": "+91-1407733840",
      "aggregate_threat_score": 31.1,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Amol Mody",
        "+91-8324791927"
      ],
      "ring_leader": "Md. Amol Mody",
      "leader_phone": "+91-5730267951",
      "aggregate_threat_score": 28.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Zaid Bhattacharyya",
        "+91-8831730519"
      ],
      "ring_leader": "Md. Zaid Bhattacharyya",
      "leader_phone": "+91-9402246831",
      "aggregate_threat_score": 28.5,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Nicholas Karpe",
        "+91-4969103950"
      ],
      "ring_leader": "Md. Nicholas Karpe",
      "leader_phone": "+91-8749925305",
      "aggregate_threat_score": 24.6,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Reyansh Anne",
        "+91-4754813913"
      ],
      "ring_leader": "Md. Reyansh Anne",
      "leader_phone": "+91-6922080797",
      "aggregate_threat_score": 36.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Andrew Bora",
        "+91-6216694266"
      ],
      "ring_leader": "Md. Andrew Bora",
      "leader_phone": "+91-8714702226",
      "aggregate_threat_score": 34.1,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Gagan Rao",
        "+91-5915263172"
      ],
      "ring_leader": "Md. Gagan Rao",
      "leader_phone": "+91-5714909698",
      "aggregate_threat_score": 37.6,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Peter Barad",
        "+91-1313704144"
      ],
      "ring_leader": "Md. Peter Barad",
      "leader_phone": "+91-9440790043",
      "aggregate_threat_score": 40.7,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Nihal Rana",
        "+91-7799749261"
      ],
      "ring_leader": "Md. Nihal Rana",
      "leader_phone": "+91-5691317104",
      "aggregate_threat_score": 36.0,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Arjun Sheth",
        "+91-4273670069"
      ],
      "ring_leader": "Md. Arjun Sheth",
      "leader_phone": "+91-6111449019",
      "aggregate_threat_score": 45.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Laban Prakash",
        "+91-4598784260"
      ],
      "ring_leader": "Md. Laban Prakash",
      "leader_phone": "+91-5372652872",
      "aggregate_threat_score": 40.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Ayush Baria",
        "+91-8935396640"
      ],
      "ring_leader": "Md. Ayush Baria",
      "leader_phone": "+91-6993641756",
      "aggregate_threat_score": 30.1,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Dominic Gupta",
        "+91-4983630267"
      ],
      "ring_leader": "Md. Dominic Gupta",
      "leader_phone": "+91-9954528199",
      "aggregate_threat_score": 33.6,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Naveen Tailor",
        "+91-3691955937"
      ],
      "ring_leader": "Md. Naveen Tailor",
      "leader_phone": "+91-1549231524",
      "aggregate_threat_score": 31.1,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Frado Dhingra",
        "+91-7507465885"
      ],
      "ring_leader": "Md. Frado Dhingra",
      "leader_phone": "+91-0333553548",
      "aggregate_threat_score": 35.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Kevin Ganesan",
        "+91-6641847435"
      ],
      "ring_leader": "Md. Kevin Ganesan",
      "leader_phone": "+91-5505012573",
      "aggregate_threat_score": 33.0,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Wriddhish Varty",
        "+91-6822881229"
      ],
      "ring_leader": "Md. Wriddhish Varty",
      "leader_phone": "+91-8726663475",
      "aggregate_threat_score": 32.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Jeet Saha",
        "+91-4171972095"
      ],
      "ring_leader": "Md. Jeet Saha",
      "leader_phone": "+91-2751214628",
      "aggregate_threat_score": 28.0,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Anay Minhas",
        "+91-1250436793"
      ],
      "ring_leader": "Md. Anay Minhas",
      "leader_phone": "+91-4475823294",
      "aggregate_threat_score": 23.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Jatin Murthy",
        "+91-2278623406"
      ],
      "ring_leader": "Md. Jatin Murthy",
      "leader_phone": "+91-0437844453",
      "aggregate_threat_score": 19.0,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Reyansh Mangal",
        "+91-1746159750"
      ],
      "ring_leader": "Md. Reyansh Mangal",
      "leader_phone": "+91-0193610079",
      "aggregate_threat_score": 37.1,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Elijah Ganguly",
        "+91-4684812524"
      ],
      "ring_leader": "Md. Elijah Ganguly",
      "leader_phone": "+91-6320194538",
      "aggregate_threat_score": 25.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Tejas Nigam",
        "+91-8667541428"
      ],
      "ring_leader": "Md. Tejas Nigam",
      "leader_phone": "+91-4414875019",
      "aggregate_threat_score": 20.3,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Akshay Lata",
        "+91-3450312271"
      ],
      "ring_leader": "Md. Akshay Lata",
      "leader_phone": "+91-2325906102",
      "aggregate_threat_score": 25.3,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Frederick Nori",
        "+91-1189756397"
      ],
      "ring_leader": "Md. Frederick Nori",
      "leader_phone": "+91-0009063115",
      "aggregate_threat_score": 20.5,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Brijesh Goda",
        "+91-6799582777"
      ],
      "ring_leader": "Md. Brijesh Goda",
      "leader_phone": "+91-6454080360",
      "aggregate_threat_score": 26.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Qadim Solanki",
        "+91-1395100063"
      ],
      "ring_leader": "Md. Qadim Solanki",
      "leader_phone": "+91-6530338206",
      "aggregate_threat_score": 26.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Daniel Raman",
        "+91-1044800820"
      ],
      "ring_leader": "Md. Daniel Raman",
      "leader_phone": "+91-5203140569",
      "aggregate_threat_score": 31.2,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Frederick Gade",
        "+91-4702317695"
      ],
      "ring_leader": "Md. Frederick Gade",
      "leader_phone": "+91-9749956561",
      "aggregate_threat_score": 33.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Raghav Manda",
        "+91-4521265079"
      ],
      "ring_leader": "Md. Raghav Manda",
      "leader_phone": "+91-9386771558",
      "aggregate_threat_score": 26.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Laban Sidhu",
        "+91-5833469312"
      ],
      "ring_leader": "Md. Laban Sidhu",
      "leader_phone": "+91-1679781002",
      "aggregate_threat_score": 35.7,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Vihaan Vohra",
        "+91-9641070073"
      ],
      "ring_leader": "Md. Vihaan Vohra",
      "leader_phone": "+91-1608300776",
      "aggregate_threat_score": 21.5,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. David Nayak",
        "+91-3923216148"
      ],
      "ring_leader": "Md. David Nayak",
      "leader_phone": "+91-0908250618",
      "aggregate_threat_score": 28.6,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Matthew Om",
        "+91-9156712697"
      ],
      "ring_leader": "Md. Matthew Om",
      "leader_phone": "+91-2323764440",
      "aggregate_threat_score": 19.1,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Rayaan Bhavsar",
        "+91-0340298591"
      ],
      "ring_leader": "Md. Rayaan Bhavsar",
      "leader_phone": "+91-9135444363",
      "aggregate_threat_score": 19.2,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Hemang Shere",
        "+91-1364678894"
      ],
      "ring_leader": "Md. Hemang Shere",
      "leader_phone": "+91-1359460122",
      "aggregate_threat_score": 34.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Jeet Sachdeva",
        "+91-8163791530"
      ],
      "ring_leader": "Md. Jeet Sachdeva",
      "leader_phone": "+91-4631009912",
      "aggregate_threat_score": 32.0,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Zehaan Wali",
        "+91-3997099578"
      ],
      "ring_leader": "Md. Zehaan Wali",
      "leader_phone": "+91-8000129596",
      "aggregate_threat_score": 22.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Aarnav Sekhon",
        "+91-7486245083"
      ],
      "ring_leader": "Md. Aarnav Sekhon",
      "leader_phone": "+91-7235641635",
      "aggregate_threat_score": 28.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Qarin Balan",
        "+91-8418562933"
      ],
      "ring_leader": "Md. Qarin Balan",
      "leader_phone": "+91-4277185805",
      "aggregate_threat_score": 31.8,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Balhaar Sami",
        "+91-7171626711"
      ],
      "ring_leader": "Md. Balhaar Sami",
      "leader_phone": "+91-1715766898",
      "aggregate_threat_score": 30.6,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Warjas Khalsa",
        "+91-9080085208"
      ],
      "ring_leader": "Md. Warjas Khalsa",
      "leader_phone": "+91-2023838998",
      "aggregate_threat_score": 20.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Alexander Master",
        "+91-0524161213"
      ],
      "ring_leader": "Md. Alexander Master",
      "leader_phone": "+91-9405178098",
      "aggregate_threat_score": 34.1,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Yagnesh Zacharia",
        "+91-0162900589"
      ],
      "ring_leader": "Md. Yagnesh Zacharia",
      "leader_phone": "+91-1681067925",
      "aggregate_threat_score": 20.8,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Gaurang Bhatti",
        "+91-7740381949"
      ],
      "ring_leader": "Md. Gaurang Bhatti",
      "leader_phone": "+91-7194825001",
      "aggregate_threat_score": 22.5,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Ansh Sandal",
        "+91-4373688889"
      ],
      "ring_leader": "Md. Ansh Sandal",
      "leader_phone": "+91-2507232638",
      "aggregate_threat_score": 38.6,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Harsh Samra",
        "+91-0139452164"
      ],
      "ring_leader": "Md. Harsh Samra",
      "leader_phone": "+91-8762291976",
      "aggregate_threat_score": 28.6,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Zaid Nair",
        "+91-5482105475"
      ],
      "ring_leader": "Md. Zaid Nair",
      "leader_phone": "+91-2579426125",
      "aggregate_threat_score": 35.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Frado Raja",
        "+91-8951032064"
      ],
      "ring_leader": "Md. Frado Raja",
      "leader_phone": "+91-3504184157",
      "aggregate_threat_score": 21.2,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Owen Ganesh",
        "+91-6161680532"
      ],
      "ring_leader": "Md. Owen Ganesh",
      "leader_phone": "+91-4501079897",
      "aggregate_threat_score": 25.2,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Rudra Narula",
        "+91-9204164298"
      ],
      "ring_leader": "Md. Rudra Narula",
      "leader_phone": "+91-8771310836",
      "aggregate_threat_score": 31.0,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Onveer Bahl",
        "+91-5940579305"
      ],
      "ring_leader": "Md. Onveer Bahl",
      "leader_phone": "+91-8335561055",
      "aggregate_threat_score": 34.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Wridesh Virk",
        "+91-1980611562"
      ],
      "ring_leader": "Md. Wridesh Virk",
      "leader_phone": "+91-2343985265",
      "aggregate_threat_score": 28.6,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Wridesh Bali",
        "+91-4778000151"
      ],
      "ring_leader": "Md. Wridesh Bali",
      "leader_phone": "+91-2971614670",
      "aggregate_threat_score": 30.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Manan Subramanian",
        "+91-2150790686"
      ],
      "ring_leader": "Md. Manan Subramanian",
      "leader_phone": "+91-8164539334",
      "aggregate_threat_score": 28.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Samar Golla",
        "+91-2818487325"
      ],
      "ring_leader": "Md. Samar Golla",
      "leader_phone": "+91-4830450019",
      "aggregate_threat_score": 27.2,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Jagdish Acharya",
        "+91-7418523271"
      ],
      "ring_leader": "Md. Jagdish Acharya",
      "leader_phone": "+91-6400189254",
      "aggregate_threat_score": 25.3,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Yagnesh Tak",
        "+91-2050251598"
      ],
      "ring_leader": "Md. Yagnesh Tak",
      "leader_phone": "+91-9377098052",
      "aggregate_threat_score": 27.3,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Falan Krishna",
        "+91-8352292464"
      ],
      "ring_leader": "Md. Falan Krishna",
      "leader_phone": "+91-8579159927",
      "aggregate_threat_score": 30.8,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Veer Devi",
        "+91-1540172781"
      ],
      "ring_leader": "Md. Veer Devi",
      "leader_phone": "+91-5037744332",
      "aggregate_threat_score": 26.9,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Umang Sabharwal",
        "+91-7079832489"
      ],
      "ring_leader": "Md. Umang Sabharwal",
      "leader_phone": "+91-6997065590",
      "aggregate_threat_score": 25.6,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Chanakya Chaudhari",
        "+91-7007685069"
      ],
      "ring_leader": "Md. Chanakya Chaudhari",
      "leader_phone": "+91-7907250746",
      "aggregate_threat_score": 29.1,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Sathvik Pant",
        "+91-6939681756"
      ],
      "ring_leader": "Md. Sathvik Pant",
      "leader_phone": "+91-1554078824",
      "aggregate_threat_score": 20.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Chakradhar Batta",
        "+91-2481972339"
      ],
      "ring_leader": "Md. Chakradhar Batta",
      "leader_phone": "+91-9000406254",
      "aggregate_threat_score": 18.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Oliver Dasgupta",
        "+91-7813014202"
      ],
      "ring_leader": "Md. Oliver Dasgupta",
      "leader_phone": "+91-0224687988",
      "aggregate_threat_score": 30.1,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Ranbir Bains",
        "+91-2913723000"
      ],
      "ring_leader": "Md. Ranbir Bains",
      "leader_phone": "+91-6072329900",
      "aggregate_threat_score": 27.4,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Karan Mistry",
        "+91-0863104046"
      ],
      "ring_leader": "Md. Karan Mistry",
      "leader_phone": "+91-3203295820",
      "aggregate_threat_score": 27.8,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    },
    {
      "gang_id": "RING-01",
      "name": "Syndicate RING-01",
      "status": "CONFIRMED",
      "member_count": 2,
      "members": [
        "Md. Dev Mani",
        "+91-4911446112"
      ],
      "ring_leader": "Md. Dev Mani",
      "leader_phone": "+91-7339277969",
      "aggregate_threat_score": 30.8,
      "primary_locations": [
        "Byculla",
        "Dongri",
        "Mazgaon"
      ],
      "date_first_detected": "2026-01-10"
    }
  ]
};

export const fallbackFinancial: FinancialIntelligenceResponse = {
  "total_transactions": 186,
  "total_volume_inr": 86930246.34,
  "high_risk_suspects_count": 0,
  "summaries": [
    {
      "suspect_name": "Md. Pranit Arya",
      "threat_score": 56.0,
      "total_transactions": 3,
      "total_volume_inr": 53533.19,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 48864.19,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Tarak Sahni",
      "threat_score": 66.8,
      "total_transactions": 3,
      "total_volume_inr": 37403.67,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 34268.67,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Elijah Rege",
      "threat_score": 40.9,
      "total_transactions": 3,
      "total_volume_inr": 32044.14,
      "failed_withdrawals": 2,
      "wine_shop_spent_inr": 28459.14,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Gagan Rao",
      "threat_score": 37.6,
      "total_transactions": 3,
      "total_volume_inr": 36783.68,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 26471.6,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Umang Mody",
      "threat_score": 54.5,
      "total_transactions": 3,
      "total_volume_inr": 36690.73,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 23831.41,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Amol Nagy",
      "threat_score": 38.4,
      "total_transactions": 3,
      "total_volume_inr": 29161.53,
      "failed_withdrawals": 2,
      "wine_shop_spent_inr": 22941.35,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Simon Rai",
      "threat_score": 42.8,
      "total_transactions": 3,
      "total_volume_inr": 31407.38,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 22040.38,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Reyansh Anne",
      "threat_score": 36.9,
      "total_transactions": 3,
      "total_volume_inr": 29337.18,
      "failed_withdrawals": 2,
      "wine_shop_spent_inr": 19755.21,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Laban Prakash",
      "threat_score": 40.9,
      "total_transactions": 3,
      "total_volume_inr": 32011.01,
      "failed_withdrawals": 2,
      "wine_shop_spent_inr": 18038.71,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Andrew Bora",
      "threat_score": 34.1,
      "total_transactions": 3,
      "total_volume_inr": 23773.33,
      "failed_withdrawals": 2,
      "wine_shop_spent_inr": 15520.41,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Ranbir Bhalla",
      "threat_score": 80.6,
      "total_transactions": 3,
      "total_volume_inr": 16172.47,
      "failed_withdrawals": 2,
      "wine_shop_spent_inr": 15438.47,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Nihal Rana",
      "threat_score": 36.0,
      "total_transactions": 3,
      "total_volume_inr": 32640.98,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 14239.3,
      "peer_transfer_count": 2
    },
    {
      "suspect_name": "Md. Advik Golla",
      "threat_score": 89.1,
      "total_transactions": 3,
      "total_volume_inr": 12138.63,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 11880.63,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Peter Barad",
      "threat_score": 40.7,
      "total_transactions": 3,
      "total_volume_inr": 30521.36,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 10177.7,
      "peer_transfer_count": 2
    },
    {
      "suspect_name": "Md. Arjun Sheth",
      "threat_score": 45.9,
      "total_transactions": 3,
      "total_volume_inr": 33068.37,
      "failed_withdrawals": 2,
      "wine_shop_spent_inr": 7986.93,
      "peer_transfer_count": 2
    },
    {
      "suspect_name": "Md. Ayush Baria",
      "threat_score": 30.1,
      "total_transactions": 3,
      "total_volume_inr": 34655.03,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 7618.37,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Nachiket Desai",
      "threat_score": 28.4,
      "total_transactions": 1,
      "total_volume_inr": 4961.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 4961.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Ojas Bhavsar",
      "threat_score": 40.4,
      "total_transactions": 3,
      "total_volume_inr": 35290.67,
      "failed_withdrawals": 3,
      "wine_shop_spent_inr": 4913.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Vedant Padmanabhan",
      "threat_score": 48.5,
      "total_transactions": 1,
      "total_volume_inr": 4869.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 4869.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Naveen Tailor",
      "threat_score": 31.1,
      "total_transactions": 1,
      "total_volume_inr": 4826.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 4826.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Frederick Nori",
      "threat_score": 20.5,
      "total_transactions": 1,
      "total_volume_inr": 4813.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 4813.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Jeet Sachdeva",
      "threat_score": 32.0,
      "total_transactions": 1,
      "total_volume_inr": 4743.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 4743.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Daniel Raman",
      "threat_score": 31.2,
      "total_transactions": 1,
      "total_volume_inr": 4718.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 4718.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Indrajit Kunda",
      "threat_score": 73.8,
      "total_transactions": 1,
      "total_volume_inr": 4505.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 4505.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Raghav Manda",
      "threat_score": 26.4,
      "total_transactions": 1,
      "total_volume_inr": 4319.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 4319.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Wriddhish Varty",
      "threat_score": 32.9,
      "total_transactions": 1,
      "total_volume_inr": 3808.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 3808.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Gaurang Bhatti",
      "threat_score": 22.5,
      "total_transactions": 1,
      "total_volume_inr": 3768.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 3768.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Frado Raja",
      "threat_score": 21.2,
      "total_transactions": 1,
      "total_volume_inr": 3767.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 3767.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Christopher Pillai",
      "threat_score": 44.5,
      "total_transactions": 1,
      "total_volume_inr": 3763.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 3763.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Balendra Nayak",
      "threat_score": 71.3,
      "total_transactions": 1,
      "total_volume_inr": 3541.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 3541.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Balhaar Sami",
      "threat_score": 30.6,
      "total_transactions": 1,
      "total_volume_inr": 2376.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 2376.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Tanveer Choudhary",
      "threat_score": 31.1,
      "total_transactions": 1,
      "total_volume_inr": 2213.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 2213.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Amol Mody",
      "threat_score": 28.4,
      "total_transactions": 1,
      "total_volume_inr": 2012.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 2012.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Onveer Bahl",
      "threat_score": 34.4,
      "total_transactions": 1,
      "total_volume_inr": 1509.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 1509.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Robert Narain",
      "threat_score": 49.5,
      "total_transactions": 1,
      "total_volume_inr": 1078.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 1078.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Azad Mannan",
      "threat_score": 75.8,
      "total_transactions": 1,
      "total_volume_inr": 303.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 303.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Zehaan Wali",
      "threat_score": 22.4,
      "total_transactions": 1,
      "total_volume_inr": 302.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 302.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Sathvik Mahajan",
      "threat_score": 41.2,
      "total_transactions": 3,
      "total_volume_inr": 35944.39,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 2
    },
    {
      "suspect_name": "Md. Zashil Mistry",
      "threat_score": 83.5,
      "total_transactions": 3,
      "total_volume_inr": 21577.76,
      "failed_withdrawals": 2,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Ayush Buch",
      "threat_score": 40.2,
      "total_transactions": 3,
      "total_volume_inr": 20023.84,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Akshay Lata",
      "threat_score": 25.3,
      "total_transactions": 1,
      "total_volume_inr": 4984.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Karan Mistry",
      "threat_score": 27.8,
      "total_transactions": 1,
      "total_volume_inr": 4935.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Frederick Gade",
      "threat_score": 33.4,
      "total_transactions": 1,
      "total_volume_inr": 4919.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Jatin Murthy",
      "threat_score": 19.0,
      "total_transactions": 1,
      "total_volume_inr": 4727.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Wridesh Virk",
      "threat_score": 28.6,
      "total_transactions": 1,
      "total_volume_inr": 4705.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Matthew Om",
      "threat_score": 19.1,
      "total_transactions": 1,
      "total_volume_inr": 4700.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Maanav Tailor",
      "threat_score": 44.5,
      "total_transactions": 1,
      "total_volume_inr": 4682.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Owen Ganesh",
      "threat_score": 25.2,
      "total_transactions": 1,
      "total_volume_inr": 4654.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Gopal Radhakrishnan",
      "threat_score": 38.0,
      "total_transactions": 1,
      "total_volume_inr": 4465.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. David Nayak",
      "threat_score": 28.6,
      "total_transactions": 1,
      "total_volume_inr": 4459.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Devansh Vohra",
      "threat_score": 32.8,
      "total_transactions": 1,
      "total_volume_inr": 4426.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Fitan Mander",
      "threat_score": 23.0,
      "total_transactions": 1,
      "total_volume_inr": 4395.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Umang Sabharwal",
      "threat_score": 25.6,
      "total_transactions": 1,
      "total_volume_inr": 4366.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Laban Sidhu",
      "threat_score": 35.7,
      "total_transactions": 1,
      "total_volume_inr": 4311.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Warjas Khalsa",
      "threat_score": 20.9,
      "total_transactions": 1,
      "total_volume_inr": 4305.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Qadim Solanki",
      "threat_score": 26.4,
      "total_transactions": 1,
      "total_volume_inr": 4164.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Harsh Samra",
      "threat_score": 28.6,
      "total_transactions": 1,
      "total_volume_inr": 4110.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Rudra Narula",
      "threat_score": 31.0,
      "total_transactions": 1,
      "total_volume_inr": 4042.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Reyansh Mangal",
      "threat_score": 37.1,
      "total_transactions": 1,
      "total_volume_inr": 3855.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Wridesh Bali",
      "threat_score": 30.9,
      "total_transactions": 1,
      "total_volume_inr": 3732.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Harrison Sarna",
      "threat_score": 36.5,
      "total_transactions": 1,
      "total_volume_inr": 3681.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Manan Subramanian",
      "threat_score": 28.9,
      "total_transactions": 1,
      "total_volume_inr": 3675.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Ranbir Bains",
      "threat_score": 27.4,
      "total_transactions": 1,
      "total_volume_inr": 3654.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Teerth Bhargava",
      "threat_score": 66.5,
      "total_transactions": 1,
      "total_volume_inr": 3477.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Elijah Ganguly",
      "threat_score": 25.4,
      "total_transactions": 1,
      "total_volume_inr": 3442.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Dominic Gupta",
      "threat_score": 33.6,
      "total_transactions": 1,
      "total_volume_inr": 3421.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Veer Devi",
      "threat_score": 26.9,
      "total_transactions": 1,
      "total_volume_inr": 3399.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Hemang Shere",
      "threat_score": 34.4,
      "total_transactions": 1,
      "total_volume_inr": 3252.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Samar Nagar",
      "threat_score": 64.7,
      "total_transactions": 1,
      "total_volume_inr": 3240.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Aarnav Sekhon",
      "threat_score": 28.4,
      "total_transactions": 1,
      "total_volume_inr": 3237.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Oliver Dasgupta",
      "threat_score": 30.1,
      "total_transactions": 1,
      "total_volume_inr": 3211.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Brijesh Goda",
      "threat_score": 26.4,
      "total_transactions": 1,
      "total_volume_inr": 3171.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Frado Dhingra",
      "threat_score": 35.4,
      "total_transactions": 1,
      "total_volume_inr": 3028.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Nicholas Karpe",
      "threat_score": 24.6,
      "total_transactions": 1,
      "total_volume_inr": 2900.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Sathvik Pant",
      "threat_score": 20.4,
      "total_transactions": 1,
      "total_volume_inr": 2794.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Falan Krishna",
      "threat_score": 30.8,
      "total_transactions": 1,
      "total_volume_inr": 2787.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Tejas Nigam",
      "threat_score": 20.3,
      "total_transactions": 1,
      "total_volume_inr": 2694.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Zaid Bhattacharyya",
      "threat_score": 28.5,
      "total_transactions": 1,
      "total_volume_inr": 2579.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Alexander Master",
      "threat_score": 34.1,
      "total_transactions": 1,
      "total_volume_inr": 2495.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Qarin Balan",
      "threat_score": 31.8,
      "total_transactions": 1,
      "total_volume_inr": 2446.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. George Ramaswamy",
      "threat_score": 32.7,
      "total_transactions": 1,
      "total_volume_inr": 2242.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Darsh Sampath",
      "threat_score": 65.6,
      "total_transactions": 1,
      "total_volume_inr": 1980.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Rudra Sant",
      "threat_score": 18.9,
      "total_transactions": 1,
      "total_volume_inr": 1933.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Samar Golla",
      "threat_score": 27.2,
      "total_transactions": 1,
      "total_volume_inr": 1696.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Yagnesh Tak",
      "threat_score": 27.3,
      "total_transactions": 1,
      "total_volume_inr": 1664.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Jeet Saha",
      "threat_score": 28.0,
      "total_transactions": 1,
      "total_volume_inr": 1662.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Zaid Nair",
      "threat_score": 35.9,
      "total_transactions": 1,
      "total_volume_inr": 1568.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Chakradhar Batta",
      "threat_score": 18.4,
      "total_transactions": 1,
      "total_volume_inr": 1447.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Jagdish Acharya",
      "threat_score": 25.3,
      "total_transactions": 1,
      "total_volume_inr": 1019.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Anay Minhas",
      "threat_score": 23.4,
      "total_transactions": 1,
      "total_volume_inr": 890.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Baljiwan Hayer",
      "threat_score": 31.3,
      "total_transactions": 1,
      "total_volume_inr": 862.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Ansh Sandal",
      "threat_score": 38.6,
      "total_transactions": 1,
      "total_volume_inr": 857.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Yagnesh Zacharia",
      "threat_score": 20.8,
      "total_transactions": 1,
      "total_volume_inr": 854.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Dev Mani",
      "threat_score": 30.8,
      "total_transactions": 1,
      "total_volume_inr": 842.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Rayaan Bhavsar",
      "threat_score": 19.2,
      "total_transactions": 1,
      "total_volume_inr": 765.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Harish Bali",
      "threat_score": 42.5,
      "total_transactions": 1,
      "total_volume_inr": 662.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Vihaan Vohra",
      "threat_score": 21.5,
      "total_transactions": 1,
      "total_volume_inr": 550.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Chanakya Chaudhari",
      "threat_score": 29.1,
      "total_transactions": 1,
      "total_volume_inr": 354.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    },
    {
      "suspect_name": "Md. Kevin Ganesan",
      "threat_score": 33.0,
      "total_transactions": 1,
      "total_volume_inr": 321.0,
      "failed_withdrawals": 0,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 1
    },
    {
      "suspect_name": "Md. Zayyan Ahluwalia",
      "threat_score": 20.9,
      "total_transactions": 1,
      "total_volume_inr": 186.0,
      "failed_withdrawals": 1,
      "wine_shop_spent_inr": 0.0,
      "peer_transfer_count": 0
    }
  ],
  "transactions": [
    {
      "transaction_id": "TXN36201506",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4913.0,
      "timestamp": "2026-07-21 20:19:49"
    },
    {
      "transaction_id": "TXN60237758",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4844.0,
      "timestamp": "2026-07-13 06:31:32"
    },
    {
      "transaction_id": "TXN97276182",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 3585.0,
      "timestamp": "2026-07-12 23:07:04"
    },
    {
      "transaction_id": "TXN48068103",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 734.0,
      "timestamp": "2026-07-31 10:59:43"
    },
    {
      "transaction_id": "TXN53644465",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4669.0,
      "timestamp": "2026-08-09 15:18:19"
    },
    {
      "transaction_id": "TXN97836021",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4242.0,
      "timestamp": "2026-08-08 18:49:02"
    },
    {
      "transaction_id": "TXN56712212",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4043.0,
      "timestamp": "2026-09-01 15:27:47"
    },
    {
      "transaction_id": "TXN70451719",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4840.0,
      "timestamp": "2026-08-22 14:46:39"
    },
    {
      "transaction_id": "TXN48730212",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 3543.0,
      "timestamp": "2026-08-27 16:20:23"
    },
    {
      "transaction_id": "TXN12405920",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 2571.0,
      "timestamp": "2026-08-11 19:49:43"
    },
    {
      "transaction_id": "TXN27315329",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 3435.0,
      "timestamp": "2026-08-14 00:35:07"
    },
    {
      "transaction_id": "TXN48473251",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4067.0,
      "timestamp": "2026-08-19 02:47:17"
    },
    {
      "transaction_id": "TXN13956581",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4852.0,
      "timestamp": "2026-08-11 18:46:18"
    },
    {
      "transaction_id": "TXN07550471",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 832.0,
      "timestamp": "2026-08-11 16:33:57"
    },
    {
      "transaction_id": "TXN66092918",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 258.0,
      "timestamp": "2026-08-12 18:00:17"
    },
    {
      "transaction_id": "TXN74336860",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 2563.0,
      "timestamp": "2026-07-21 05:00:39"
    },
    {
      "transaction_id": "TXN65685544",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 695.0,
      "timestamp": "2026-08-27 13:42:30"
    },
    {
      "transaction_id": "TXN50038273",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 3135.0,
      "timestamp": "2026-07-13 13:23:55"
    },
    {
      "transaction_id": "TXN47417538",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 1261.0,
      "timestamp": "2026-08-21 14:10:40"
    },
    {
      "transaction_id": "TXN92328855",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 2365.0,
      "timestamp": "2026-08-01 04:04:26"
    },
    {
      "transaction_id": "TXN50644600",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 862.0,
      "timestamp": "2026-07-19 07:03:00"
    },
    {
      "transaction_id": "TXN03422718",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4426.0,
      "timestamp": "2026-09-01 00:35:33"
    },
    {
      "transaction_id": "TXN31114802",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4465.0,
      "timestamp": "2026-07-23 17:37:14"
    },
    {
      "transaction_id": "TXN58979406",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 186.0,
      "timestamp": "2026-08-16 10:04:41"
    },
    {
      "transaction_id": "TXN25740271",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 1933.0,
      "timestamp": "2026-07-11 13:01:06"
    },
    {
      "transaction_id": "TXN79946307",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4395.0,
      "timestamp": "2026-08-18 22:53:30"
    },
    {
      "transaction_id": "TXN95662705",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4961.0,
      "timestamp": "2026-08-20 20:02:11"
    },
    {
      "transaction_id": "TXN42276590",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4682.0,
      "timestamp": "2026-08-04 08:22:47"
    },
    {
      "transaction_id": "TXN30334924",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 3541.0,
      "timestamp": "2026-08-04 01:01:48"
    },
    {
      "transaction_id": "TXN18956319",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 1078.0,
      "timestamp": "2026-08-27 02:06:01"
    },
    {
      "transaction_id": "TXN40667235",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 2213.0,
      "timestamp": "2026-09-05 02:19:33"
    },
    {
      "transaction_id": "TXN55512484",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 303.0,
      "timestamp": "2026-09-04 03:50:56"
    },
    {
      "transaction_id": "TXN72769502",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 2012.0,
      "timestamp": "2026-07-19 22:59:39"
    },
    {
      "transaction_id": "TXN15826004",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 2579.0,
      "timestamp": "2026-09-01 16:33:03"
    },
    {
      "transaction_id": "TXN61560124",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 2900.0,
      "timestamp": "2026-07-22 16:28:58"
    },
    {
      "transaction_id": "TXN09955358",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4505.0,
      "timestamp": "2026-08-22 20:49:01"
    },
    {
      "transaction_id": "TXN02961039",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4984.0,
      "timestamp": "2026-08-12 07:02:43"
    },
    {
      "transaction_id": "TXN80932539",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 2694.0,
      "timestamp": "2026-08-10 21:35:55"
    },
    {
      "transaction_id": "TXN76116640",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 3442.0,
      "timestamp": "2026-08-07 21:01:12"
    },
    {
      "transaction_id": "TXN54260051",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 3855.0,
      "timestamp": "2026-08-25 04:55:33"
    },
    {
      "transaction_id": "TXN92636596",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4727.0,
      "timestamp": "2026-09-02 23:28:18"
    },
    {
      "transaction_id": "TXN13506138",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 890.0,
      "timestamp": "2026-08-07 18:35:59"
    },
    {
      "transaction_id": "TXN13083087",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 1662.0,
      "timestamp": "2026-07-17 01:51:08"
    },
    {
      "transaction_id": "TXN96282195",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 3808.0,
      "timestamp": "2026-08-20 06:17:23"
    },
    {
      "transaction_id": "TXN82060159",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 321.0,
      "timestamp": "2026-08-25 16:22:39"
    },
    {
      "transaction_id": "TXN29605232",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 3028.0,
      "timestamp": "2026-07-15 04:26:45"
    },
    {
      "transaction_id": "TXN89583729",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4826.0,
      "timestamp": "2026-07-22 03:32:53"
    },
    {
      "transaction_id": "TXN39883206",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 3421.0,
      "timestamp": "2026-09-02 01:49:52"
    },
    {
      "transaction_id": "TXN44822982",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 4813.0,
      "timestamp": "2026-08-17 21:41:18"
    },
    {
      "transaction_id": "TXN61590847",
      "sender_name": "Md. Ranbir Bhalla",
      "receiver_name": "Apex Horizon Trading LLP",
      "merchant_category": "HAWALA_TRANSFER",
      "amount_inr": 3171.0,
      "timestamp": "2026-08-18 00:31:26"
    }
  ]
};

export const fallbackNocturnal: NocturnalAnomaliesResponse = {
  "total_anomalies": 65,
  "hotspots_count": 6,
  "calls": [
    {
      "caller_name": "Md. Elijah Rege",
      "receiver_name": "+91-0083322930",
      "call_type": "Incoming",
      "duration_seconds": 821,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-07-13 00:09:04"
    },
    {
      "caller_name": "Md. Arjun Sheth",
      "receiver_name": "+91-4273670069",
      "call_type": "SMS",
      "duration_seconds": 265,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-08-14 03:17:07"
    },
    {
      "caller_name": "Md. Umang Mody",
      "receiver_name": "+91-3211806618",
      "call_type": "Incoming",
      "duration_seconds": 653,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-08-19 00:25:17"
    },
    {
      "caller_name": "Md. Ayush Baria",
      "receiver_name": "+91-8935396640",
      "call_type": "Outgoing",
      "duration_seconds": 664,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-07-21 02:11:39"
    },
    {
      "caller_name": "Md. Baljiwan Hayer",
      "receiver_name": "+91-1296901195",
      "call_type": "Incoming",
      "duration_seconds": 785,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-07-19 04:28:00"
    },
    {
      "caller_name": "Md. Devansh Vohra",
      "receiver_name": "+91-7036067702",
      "call_type": "SMS",
      "duration_seconds": 465,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-09-01 00:49:33"
    },
    {
      "caller_name": "Md. Fitan Mander",
      "receiver_name": "+91-8101692629",
      "call_type": "SMS",
      "duration_seconds": 583,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-08-19 00:46:30"
    },
    {
      "caller_name": "Md. Robert Narain",
      "receiver_name": "+91-8841380062",
      "call_type": "Incoming",
      "duration_seconds": 708,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-08-27 01:07:01"
    },
    {
      "caller_name": "Md. Tanveer Choudhary",
      "receiver_name": "+91-3531160657",
      "call_type": "Outgoing",
      "duration_seconds": 681,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-09-05 02:40:33"
    },
    {
      "caller_name": "Md. Azad Mannan",
      "receiver_name": "+91-2769136542",
      "call_type": "Incoming",
      "duration_seconds": 224,
      "cell_tower_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "timestamp": "2026-09-04 00:47:56"
    },
    {
      "caller_name": "Md. Reyansh Mangal",
      "receiver_name": "+91-1746159750",
      "call_type": "SMS",
      "duration_seconds": 633,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-08-25 01:07:33"
    },
    {
      "caller_name": "Md. Jeet Saha",
      "receiver_name": "+91-4171972095",
      "call_type": "Incoming",
      "duration_seconds": 584,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-07-17 00:17:08"
    },
    {
      "caller_name": "Md. Frado Dhingra",
      "receiver_name": "+91-7507465885",
      "call_type": "Incoming",
      "duration_seconds": 857,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-07-15 04:41:45"
    },
    {
      "caller_name": "Md. Naveen Tailor",
      "receiver_name": "+91-3691955937",
      "call_type": "Outgoing",
      "duration_seconds": 662,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-07-22 06:21:53"
    },
    {
      "caller_name": "Md. Dominic Gupta",
      "receiver_name": "+91-4983630267",
      "call_type": "Incoming",
      "duration_seconds": 364,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-09-02 00:02:52"
    },
    {
      "caller_name": "Md. Vihaan Vohra",
      "receiver_name": "+91-9641070073",
      "call_type": "SMS",
      "duration_seconds": 882,
      "cell_tower_location": "Madanpura, Baban Galli, Byculla (W)",
      "timestamp": "2026-07-27 02:29:13"
    },
    {
      "caller_name": "Md. David Nayak",
      "receiver_name": "+91-3923216148",
      "call_type": "Incoming",
      "duration_seconds": 382,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-08-01 05:04:02"
    },
    {
      "caller_name": "Md. Hemang Shere",
      "receiver_name": "+91-1364678894",
      "call_type": "SMS",
      "duration_seconds": 833,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-08-16 03:53:19"
    },
    {
      "caller_name": "Md. Balhaar Sami",
      "receiver_name": "+91-7171626711",
      "call_type": "Outgoing",
      "duration_seconds": 343,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-08-27 04:46:31"
    },
    {
      "caller_name": "Md. Frederick Gade",
      "receiver_name": "+91-4702317695",
      "call_type": "Incoming",
      "duration_seconds": 860,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-08-09 04:43:46"
    },
    {
      "caller_name": "Md. Rudra Narula",
      "receiver_name": "+91-9204164298",
      "call_type": "SMS",
      "duration_seconds": 589,
      "cell_tower_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "timestamp": "2026-07-13 02:32:39"
    },
    {
      "caller_name": "Md. Harrison Sarna",
      "receiver_name": "+91-8267178405",
      "call_type": "Incoming",
      "duration_seconds": 26,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-07-31 06:41:21"
    },
    {
      "caller_name": "Md. Gaurang Bhatti",
      "receiver_name": "+91-7740381949",
      "call_type": "SMS",
      "duration_seconds": 288,
      "cell_tower_location": "Madanpura, Baban Galli, Byculla (W)",
      "timestamp": "2026-08-13 00:49:52"
    },
    {
      "caller_name": "Md. Yagnesh Zacharia",
      "receiver_name": "+91-0162900589",
      "call_type": "Incoming",
      "duration_seconds": 500,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-07-22 01:05:39"
    },
    {
      "caller_name": "Md. Alexander Master",
      "receiver_name": "+91-0524161213",
      "call_type": "Outgoing",
      "duration_seconds": 85,
      "cell_tower_location": "Madanpura, Baban Galli, Byculla (W)",
      "timestamp": "2026-07-14 04:40:29"
    },
    {
      "caller_name": "Md. Samar Nagar",
      "receiver_name": "+91-0122059359",
      "call_type": "Outgoing",
      "duration_seconds": 738,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-08-16 03:54:30"
    },
    {
      "caller_name": "Md. Chanakya Chaudhari",
      "receiver_name": "+91-7007685069",
      "call_type": "SMS",
      "duration_seconds": 650,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-08-20 03:38:42"
    },
    {
      "caller_name": "Md. Veer Devi",
      "receiver_name": "+91-1540172781",
      "call_type": "SMS",
      "duration_seconds": 554,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-09-01 03:37:48"
    },
    {
      "caller_name": "Md. Jagdish Acharya",
      "receiver_name": "+91-7418523271",
      "call_type": "SMS",
      "duration_seconds": 768,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-08-27 01:07:44"
    },
    {
      "caller_name": "Md. Teerth Bhargava",
      "receiver_name": "+91-9967968993",
      "call_type": "SMS",
      "duration_seconds": 434,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-07-25 02:26:55"
    },
    {
      "caller_name": "Md. Manan Subramanian",
      "receiver_name": "+91-2150790686",
      "call_type": "Outgoing",
      "duration_seconds": 514,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-07-14 02:57:43"
    },
    {
      "caller_name": "Md. Karan Mistry",
      "receiver_name": "+91-0863104046",
      "call_type": "Incoming",
      "duration_seconds": 472,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-09-04 04:03:36"
    },
    {
      "caller_name": "Md. Dev Mani",
      "receiver_name": "+91-4911446112",
      "call_type": "SMS",
      "duration_seconds": 473,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-08-18 03:36:05"
    },
    {
      "caller_name": "Md. Darsh Sampath",
      "receiver_name": "Md. Advik Golla",
      "call_type": "Outgoing",
      "duration_seconds": 858,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-08-28 01:58:20"
    },
    {
      "caller_name": "Md. Darsh Sampath",
      "receiver_name": "Md. Advik Golla",
      "call_type": "Incoming",
      "duration_seconds": 777,
      "cell_tower_location": "Madanpura, Baban Galli, Byculla (W)",
      "timestamp": "2026-08-15 02:34:15"
    },
    {
      "caller_name": "Md. Ranbir Bhalla",
      "receiver_name": "Md. Teerth Bhargava",
      "call_type": "SMS",
      "duration_seconds": 0,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-08-09 02:48:50"
    },
    {
      "caller_name": "Md. Indrajit Kunda",
      "receiver_name": "Md. Azad Mannan",
      "call_type": "SMS",
      "duration_seconds": 0,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-08-15 03:26:18"
    },
    {
      "caller_name": "Md. Indrajit Kunda",
      "receiver_name": "Md. Azad Mannan",
      "call_type": "Outgoing",
      "duration_seconds": 123,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-08-25 01:17:19"
    },
    {
      "caller_name": "Md. Indrajit Kunda",
      "receiver_name": "Md. Azad Mannan",
      "call_type": "SMS",
      "duration_seconds": 0,
      "cell_tower_location": "Madanpura, Baban Galli, Byculla (W)",
      "timestamp": "2026-08-14 02:34:34"
    },
    {
      "caller_name": "Md. Indrajit Kunda",
      "receiver_name": "Md. Azad Mannan",
      "call_type": "Outgoing",
      "duration_seconds": 571,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-08-09 01:53:56"
    },
    {
      "caller_name": "Md. Balendra Nayak",
      "receiver_name": "Md. Tarak Sahni",
      "call_type": "SMS",
      "duration_seconds": 0,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-08-25 03:42:16"
    },
    {
      "caller_name": "Md. Balendra Nayak",
      "receiver_name": "Md. Tarak Sahni",
      "call_type": "SMS",
      "duration_seconds": 0,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-08-25 01:48:30"
    },
    {
      "caller_name": "Md. Teerth Bhargava",
      "receiver_name": "Md. Zashil Mistry",
      "call_type": "SMS",
      "duration_seconds": 0,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-08-03 02:56:41"
    },
    {
      "caller_name": "Md. Teerth Bhargava",
      "receiver_name": "Md. Zashil Mistry",
      "call_type": "SMS",
      "duration_seconds": 0,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-08-25 03:18:52"
    },
    {
      "caller_name": "Md. Samar Nagar",
      "receiver_name": "Md. Teerth Bhargava",
      "call_type": "Incoming",
      "duration_seconds": 283,
      "cell_tower_location": "Madanpura, Baban Galli, Byculla (W)",
      "timestamp": "2026-08-08 02:31:11"
    },
    {
      "caller_name": "Md. George Ramaswamy",
      "receiver_name": "Md. Umang Mody",
      "call_type": "Outgoing",
      "duration_seconds": 776,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-08-02 02:13:35"
    },
    {
      "caller_name": "Md. Harrison Sarna",
      "receiver_name": "Md. Harish Bali",
      "call_type": "Incoming",
      "duration_seconds": 81,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-08-21 01:15:58"
    },
    {
      "caller_name": "Md. Harrison Sarna",
      "receiver_name": "Md. Harish Bali",
      "call_type": "Incoming",
      "duration_seconds": 89,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-08-19 01:57:30"
    },
    {
      "caller_name": "Md. Harrison Sarna",
      "receiver_name": "Md. Harish Bali",
      "call_type": "Incoming",
      "duration_seconds": 628,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-08-16 03:13:42"
    },
    {
      "caller_name": "Md. Harrison Sarna",
      "receiver_name": "Md. Harish Bali",
      "call_type": "Incoming",
      "duration_seconds": 100,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-08-20 02:53:25"
    },
    {
      "caller_name": "Md. Harrison Sarna",
      "receiver_name": "Md. Harish Bali",
      "call_type": "Incoming",
      "duration_seconds": 613,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-08-08 01:49:15"
    },
    {
      "caller_name": "Md. Pranit Arya",
      "receiver_name": "Md. Ranbir Bhalla",
      "call_type": "Incoming",
      "duration_seconds": 301,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-08-13 03:52:51"
    },
    {
      "caller_name": "Md. Pranit Arya",
      "receiver_name": "Md. Ranbir Bhalla",
      "call_type": "Outgoing",
      "duration_seconds": 353,
      "cell_tower_location": "Madanpura, Baban Galli, Byculla (W)",
      "timestamp": "2026-08-25 02:10:39"
    },
    {
      "caller_name": "Md. Pranit Arya",
      "receiver_name": "Md. Ranbir Bhalla",
      "call_type": "SMS",
      "duration_seconds": 0,
      "cell_tower_location": "Madanpura, Baban Galli, Byculla (W)",
      "timestamp": "2026-08-04 02:44:23"
    },
    {
      "caller_name": "Md. Pranit Arya",
      "receiver_name": "Md. Ranbir Bhalla",
      "call_type": "Outgoing",
      "duration_seconds": 165,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-08-12 02:25:33"
    },
    {
      "caller_name": "Md. Pranit Arya",
      "receiver_name": "Md. Ranbir Bhalla",
      "call_type": "Outgoing",
      "duration_seconds": 148,
      "cell_tower_location": "Madanpura, Baban Galli, Byculla (W)",
      "timestamp": "2026-08-04 03:27:28"
    },
    {
      "caller_name": "Md. Umang Mody",
      "receiver_name": "Md. Maanav Tailor",
      "call_type": "Outgoing",
      "duration_seconds": 287,
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "timestamp": "2026-08-28 01:15:50"
    },
    {
      "caller_name": "Md. Umang Mody",
      "receiver_name": "Md. Maanav Tailor",
      "call_type": "Incoming",
      "duration_seconds": 737,
      "cell_tower_location": "Madanpura, Baban Galli, Byculla (W)",
      "timestamp": "2026-08-05 01:33:47"
    },
    {
      "caller_name": "Md. Umang Mody",
      "receiver_name": "Md. Maanav Tailor",
      "call_type": "Incoming",
      "duration_seconds": 470,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-08-05 01:29:33"
    },
    {
      "caller_name": "Md. Umang Mody",
      "receiver_name": "Md. Maanav Tailor",
      "call_type": "Incoming",
      "duration_seconds": 196,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-08-26 03:36:11"
    },
    {
      "caller_name": "Md. Robert Narain",
      "receiver_name": "Md. Christopher Pillai",
      "call_type": "Outgoing",
      "duration_seconds": 366,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-08-09 02:59:27"
    },
    {
      "caller_name": "Md. Robert Narain",
      "receiver_name": "Md. Christopher Pillai",
      "call_type": "Incoming",
      "duration_seconds": 148,
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "timestamp": "2026-08-09 03:47:26"
    },
    {
      "caller_name": "Md. Robert Narain",
      "receiver_name": "Md. Christopher Pillai",
      "call_type": "SMS",
      "duration_seconds": 0,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-08-17 02:34:46"
    },
    {
      "caller_name": "Md. Vedant Padmanabhan",
      "receiver_name": "Md. Ranbir Bhalla",
      "call_type": "SMS",
      "duration_seconds": 0,
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "timestamp": "2026-08-24 03:49:46"
    },
    {
      "caller_name": "Md. Vedant Padmanabhan",
      "receiver_name": "Md. Ranbir Bhalla",
      "call_type": "Outgoing",
      "duration_seconds": 591,
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "timestamp": "2026-08-27 01:29:28"
    }
  ],
  "towers": [
    {
      "cell_tower_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "nocturnal_call_count": 16
    },
    {
      "cell_tower_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "nocturnal_call_count": 13
    },
    {
      "cell_tower_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "nocturnal_call_count": 12
    },
    {
      "cell_tower_location": "Station Road Footpath, Agripada, Mumbai",
      "nocturnal_call_count": 12
    },
    {
      "cell_tower_location": "Madanpura, Baban Galli, Byculla (W)",
      "nocturnal_call_count": 10
    },
    {
      "cell_tower_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "nocturnal_call_count": 2
    }
  ]
};

export const fallbackSurveillance: SurveillanceHeatmapResponse = {
  "total_observations": 115,
  "reports": [
    {
      "report_id": "SR-2026-9798",
      "fir_number": "0973/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Liam Mishra",
      "patrol_officer_2": "HC Anirudh Chhabra (7352)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-6569",
      "fir_number": "0056/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-6871",
      "fir_number": "0288/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Girish Tara",
      "patrol_officer_2": "HC Aryan Balasubramanian (7499)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-5213",
      "fir_number": "0254/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Luke Hegde",
      "patrol_officer_2": "HC Gabriel Bawa (1073)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-0421",
      "fir_number": "0320/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Vedant Sani",
      "patrol_officer_2": "HC Advaith Grewal (5468)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-7110",
      "fir_number": "0481/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Yug Sanghvi",
      "patrol_officer_2": "HC Nihal Sandhu (1374)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-4003",
      "fir_number": "0438/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Raghav Balay",
      "patrol_officer_2": "HC Indrajit Raval (4417)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-5344",
      "fir_number": "0108/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI William Lata",
      "patrol_officer_2": "HC Vedant Jani (1844)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-5848",
      "fir_number": "0898/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Pranav Kamdar",
      "patrol_officer_2": "HC Ansh Ben (5982)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-9339",
      "fir_number": "0734/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Darpan Gaba",
      "patrol_officer_2": "HC Jairaj Kakar (8591)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-3500",
      "fir_number": "0513/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Chakradev Zachariah",
      "patrol_officer_2": "HC Dev Mammen (6442)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-6107",
      "fir_number": "0635/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Faris Wadhwa",
      "patrol_officer_2": "HC Naveen Kala (9127)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-5841",
      "fir_number": "0724/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Ekavir Bhagat",
      "patrol_officer_2": "HC Jeet Khare (4944)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-9566",
      "fir_number": "0414/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Ishwar Dora",
      "patrol_officer_2": "HC Chanakya Bala (6834)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-7197",
      "fir_number": "0658/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Xavier Tandon",
      "patrol_officer_2": "HC Chandran Nazareth (4682)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-4433",
      "fir_number": "0052/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Chatura Goyal",
      "patrol_officer_2": "HC Zayan Dayal (2276)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-9932",
      "fir_number": "0481/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Anirudh Divan",
      "patrol_officer_2": "HC Zehaan Parsa (3762)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-6687",
      "fir_number": "0736/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Fiyaz Shan",
      "patrol_officer_2": "HC Maanav Padmanabhan (3260)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-4252",
      "fir_number": "0808/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Gopal Deshmukh",
      "patrol_officer_2": "HC Arin Sodhi (1171)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-2021",
      "fir_number": "0920/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Joshua Bansal",
      "patrol_officer_2": "HC Dhruv Thakkar (5441)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-4524",
      "fir_number": "0161/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Gunbir Kant",
      "patrol_officer_2": "HC Chatura Chander (2719)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-2617",
      "fir_number": "0538/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Teerth Srivastava",
      "patrol_officer_2": "HC Samaksh Trivedi (3147)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-9772",
      "fir_number": "0984/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Faqid Raval",
      "patrol_officer_2": "HC Matthew Dara (5377)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-8676",
      "fir_number": "0915/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Samaksh Jani",
      "patrol_officer_2": "HC Yash Swaminathan (4315)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-2990",
      "fir_number": "0939/2026",
      "spot_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "patrol_officer_1": "PSI Ayushman Peri",
      "patrol_officer_2": "HC Jeremiah Kashyap (4340)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-0679",
      "fir_number": "0869/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Samuel Borah",
      "patrol_officer_2": "HC Balvan Goel (2970)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-2163",
      "fir_number": "0918/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Frado Johal",
      "patrol_officer_2": "HC Rayaan Walla (2490)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-1178",
      "fir_number": "0196/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Mitesh Uppal",
      "patrol_officer_2": "HC Faqid Iyengar (5577)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-0699",
      "fir_number": "0191/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Tristan Gopal",
      "patrol_officer_2": "HC Neel Taneja (8072)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-8050",
      "fir_number": "0370/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Parth Sandal",
      "patrol_officer_2": "HC Azaan Sahni (2044)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-4382",
      "fir_number": "0593/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Patrick Jaggi",
      "patrol_officer_2": "HC Rishi Parikh (1282)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-5123",
      "fir_number": "0634/2026",
      "spot_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "patrol_officer_1": "PSI Max Kamdar",
      "patrol_officer_2": "HC Qadim Nadig (6248)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-9497",
      "fir_number": "0489/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Girish Chander",
      "patrol_officer_2": "HC Amol Mandal (7508)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-6810",
      "fir_number": "0399/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Tanveer Kibe",
      "patrol_officer_2": "HC Umang Konda (6467)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-2955",
      "fir_number": "0827/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Warjas Pradhan",
      "patrol_officer_2": "HC Aadi Issac (3152)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-5922",
      "fir_number": "0847/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Nicholas Kari",
      "patrol_officer_2": "HC Ranveer Batra (5300)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-4051",
      "fir_number": "0307/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Laksh Batra",
      "patrol_officer_2": "HC Hredhaan Palla (1490)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-8840",
      "fir_number": "0789/2026",
      "spot_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "patrol_officer_1": "PSI Indrajit Saxena",
      "patrol_officer_2": "HC Kai Suri (1700)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-5379",
      "fir_number": "0509/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Neel Badami",
      "patrol_officer_2": "HC Nitesh Jaggi (2314)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-7198",
      "fir_number": "0605/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Vivaan Gole",
      "patrol_officer_2": "HC Jason Bhatt (6417)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-9109",
      "fir_number": "0486/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Bahadurjit Swaminathan",
      "patrol_officer_2": "HC Zayan Bava (3430)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-6410",
      "fir_number": "0725/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Ethan Badami",
      "patrol_officer_2": "HC Ekaraj Mand (9247)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-2750",
      "fir_number": "0456/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Max Roy",
      "patrol_officer_2": "HC Bachittar Krishnamurthy (6307)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-7542",
      "fir_number": "0413/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Yagnesh Rajagopal",
      "patrol_officer_2": "HC Balvan Morar (4718)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-4161",
      "fir_number": "0053/2026",
      "spot_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "patrol_officer_1": "PSI Wahab Ratta",
      "patrol_officer_2": "HC Jackson Kulkarni (8542)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-0931",
      "fir_number": "0263/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Ikbal Bail",
      "patrol_officer_2": "HC Imaran Dyal (4478)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-6382",
      "fir_number": "0039/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Hritik Bose",
      "patrol_officer_2": "HC Zayan Tara (5226)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-3399",
      "fir_number": "0856/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Xavier Rastogi",
      "patrol_officer_2": "HC Jai Ramakrishnan (1176)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-9502",
      "fir_number": "0728/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Upkaar Ahluwalia",
      "patrol_officer_2": "HC Girish Deep (3379)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-5551",
      "fir_number": "0596/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Mason Bail",
      "patrol_officer_2": "HC Wazir Singh (1120)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-2358",
      "fir_number": "0654/2026",
      "spot_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "patrol_officer_1": "PSI Balhaar Karpe",
      "patrol_officer_2": "HC Manthan Varty (1833)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-3746",
      "fir_number": "0573/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Advay Ratti",
      "patrol_officer_2": "HC Kalpit Chahal (4712)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-8338",
      "fir_number": "0225/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Balhaar Sani",
      "patrol_officer_2": "HC Laban Amble (3432)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-0137",
      "fir_number": "0683/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Elijah Sama",
      "patrol_officer_2": "HC Harish Narula (2927)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-2027",
      "fir_number": "0430/2026",
      "spot_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "patrol_officer_1": "PSI Praneel Doshi",
      "patrol_officer_2": "HC Maanav Mahajan (9856)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-9891",
      "fir_number": "0123/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Hemang Sem",
      "patrol_officer_2": "HC Joshua Tella (9932)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-2634",
      "fir_number": "0168/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Finn Pai",
      "patrol_officer_2": "HC Balvan Mane (5301)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-3932",
      "fir_number": "0755/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Gavin Muni",
      "patrol_officer_2": "HC Peter Goel (7889)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-6665",
      "fir_number": "0326/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Isaac Kanda",
      "patrol_officer_2": "HC Neel Bakshi (6741)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-6009",
      "fir_number": "0689/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Aditya Khanna",
      "patrol_officer_2": "HC Qarin Raghavan (7129)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-2096",
      "fir_number": "0104/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Gavin Das",
      "patrol_officer_2": "HC Charles Kale (1111)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-3741",
      "fir_number": "0227/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Max Goswami",
      "patrol_officer_2": "HC Ekansh Kale (8281)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-7171",
      "fir_number": "0353/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Yuvraj Shukla",
      "patrol_officer_2": "HC Max Warrior (7301)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-6317",
      "fir_number": "0420/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Nihal Saraf",
      "patrol_officer_2": "HC Tanveer Sahota (9153)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-5264",
      "fir_number": "0286/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Om Wagle",
      "patrol_officer_2": "HC Peter De (9577)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-4527",
      "fir_number": "0112/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Joshua Prashad",
      "patrol_officer_2": "HC Kalpit Lal (7558)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-3579",
      "fir_number": "0235/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Elijah Vala",
      "patrol_officer_2": "HC Falan Bakshi (5983)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-4524",
      "fir_number": "0460/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Teerth Lad",
      "patrol_officer_2": "HC Tanay Swamy (2841)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-6265",
      "fir_number": "0009/2026",
      "spot_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "patrol_officer_1": "PSI Aryan Chahal",
      "patrol_officer_2": "HC Lakshit Bose (1620)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-9674",
      "fir_number": "0468/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Baljiwan Vasa",
      "patrol_officer_2": "HC Viraj Ganesh (6754)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-1690",
      "fir_number": "0295/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Caleb Sharma",
      "patrol_officer_2": "HC Timothy Ramesh (2202)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-5291",
      "fir_number": "0545/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Ojas Hegde",
      "patrol_officer_2": "HC Andrew Vohra (9450)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-8974",
      "fir_number": "0460/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Balveer Varty",
      "patrol_officer_2": "HC Balhaar Venkataraman (3343)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-1500",
      "fir_number": "0233/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Onkar Madan",
      "patrol_officer_2": "HC Lakshit Raval (7403)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-4770",
      "fir_number": "0777/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Samarth Narasimhan",
      "patrol_officer_2": "HC Yagnesh Sengupta (4091)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-8224",
      "fir_number": "0871/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Ikbal Sodhi",
      "patrol_officer_2": "HC Jeremiah Bhakta (6741)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-7397",
      "fir_number": "0895/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Yuvraj Mutti",
      "patrol_officer_2": "HC Finn Bhardwaj (2391)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-6024",
      "fir_number": "0881/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Fitan Wali",
      "patrol_officer_2": "HC Hemang Mani (5850)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-7103",
      "fir_number": "0055/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Isaac Zacharia",
      "patrol_officer_2": "HC Laksh Shenoy (1689)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-4432",
      "fir_number": "0762/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Jatin Bera",
      "patrol_officer_2": "HC Utkarsh Agrawal (9974)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-8527",
      "fir_number": "0977/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Jack Sandhu",
      "patrol_officer_2": "HC Azad Bhattacharyya (3439)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-6334",
      "fir_number": "0760/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Lucky Prakash",
      "patrol_officer_2": "HC Ikbal Sachdev (1977)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-9825",
      "fir_number": "0292/2026",
      "spot_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "patrol_officer_1": "PSI Mason Pai",
      "patrol_officer_2": "HC Jacob Dhaliwal (6898)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-1788",
      "fir_number": "0069/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Bahadurjit Bandi",
      "patrol_officer_2": "HC Udarsh Suri (2489)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-7680",
      "fir_number": "0660/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Gunbir Banik",
      "patrol_officer_2": "HC Aayush Doctor (5386)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-3046",
      "fir_number": "0323/2026",
      "spot_location": "Madanpura, Baban Galli, Byculla (W)",
      "patrol_officer_1": "PSI Praneel Varma",
      "patrol_officer_2": "HC Daksh Sama (1551)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-8700",
      "fir_number": "0943/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Jatin Basu",
      "patrol_officer_2": "HC Balvan Verma (8755)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-0508",
      "fir_number": "0173/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Neel Rajagopal",
      "patrol_officer_2": "HC Dev Dutt (5023)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-5404",
      "fir_number": "0734/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Atharv De",
      "patrol_officer_2": "HC Samesh Zacharia (2934)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-3047",
      "fir_number": "0021/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Vihaan Gour",
      "patrol_officer_2": "HC Rayaan Dara (4371)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 1
    },
    {
      "report_id": "SR-2026-6902",
      "fir_number": "0439/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Gavin Doshi",
      "patrol_officer_2": "HC Advaith Sur (7160)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-9194",
      "fir_number": "0252/2026",
      "spot_location": "Station Road Footpath, Agripada, Mumbai",
      "patrol_officer_1": "PSI Sai Narula",
      "patrol_officer_2": "HC Anthony Gola (1040)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-8766",
      "fir_number": "0716/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Manthan Mani",
      "patrol_officer_2": "HC Nihal Chauhan (6985)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-1504",
      "fir_number": "0371/2026",
      "spot_location": "MIDC Road, Gavdevi, Thakurli (East), Thane",
      "patrol_officer_1": "PSI Fiyaz Iyengar",
      "patrol_officer_2": "HC Gagan Bir (4652)",
      "observation_details": "Subject found wandering erratically and disturbing traffic flow.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-0644",
      "fir_number": "0983/2026",
      "spot_location": "Senapati Bapat Marg, Lower Parel, Mumbai",
      "patrol_officer_1": "PSI Gaurav Sandal",
      "patrol_officer_2": "HC Chatresh Lad (7318)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-9662",
      "fir_number": "0499/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Nicholas Ramakrishnan",
      "patrol_officer_2": "HC Samuel Seshadri (1151)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-1201",
      "fir_number": "0687/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Omkaar Seshadri",
      "patrol_officer_2": "HC Chakradhar Naik (6449)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-6535",
      "fir_number": "0819/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Jai Sidhu",
      "patrol_officer_2": "HC Manthan Sharma (8952)",
      "observation_details": "Suspect spotted engaged in heated argument near public footpath.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-0087",
      "fir_number": "0777/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Wahab Borah",
      "patrol_officer_2": "HC Rishi Behl (1003)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-5673",
      "fir_number": "0702/2026",
      "spot_location": "Bhadakamkar Marg, Lamington Road, Grant Road",
      "patrol_officer_1": "PSI Kiaan Dada",
      "patrol_officer_2": "HC Mohammed Kala (5554)",
      "observation_details": "Accused found under alcohol influence, shouting and abusing public.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-9901",
      "fir_number": "0973/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-9902",
      "fir_number": "0056/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-9903",
      "fir_number": "0288/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-9904",
      "fir_number": "0254/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-9905",
      "fir_number": "0320/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-9906",
      "fir_number": "0481/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-9907",
      "fir_number": "0438/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-9908",
      "fir_number": "0108/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 3
    },
    {
      "report_id": "SR-2026-9909",
      "fir_number": "0898/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-9910",
      "fir_number": "0734/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 5
    },
    {
      "report_id": "SR-2026-9911",
      "fir_number": "0513/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 5
    },
    {
      "report_id": "SR-2026-9912",
      "fir_number": "0635/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 5
    },
    {
      "report_id": "SR-2026-9913",
      "fir_number": "0724/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 4
    },
    {
      "report_id": "SR-2026-9914",
      "fir_number": "0414/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 2
    },
    {
      "report_id": "SR-2026-9915",
      "fir_number": "0658/2026",
      "spot_location": "Venus Wine Shop, N.M. Joshi Marg, Byculla (W)",
      "patrol_officer_1": "PSI Dalbir Sharma",
      "patrol_officer_2": "HC Yagnesh Chopra (1215)",
      "observation_details": "Suspect spotted meeting co-accused near public footpath and exchanging cash/items.",
      "panchnama_conducted": true,
      "witness_count": 3
    }
  ]
};

export const fallbackAlerts: AlertsResponse = {
  "total_alerts": 12,
  "alerts": [
    {
      "id": "ALT-2026-001",
      "severity": "HIGH",
      "title": "HIGH THREAT SUSPECT: Md. Advik Golla",
      "message": "Threat Score 89.1/100. Phone: +91-0751400478. Action: IMMEDIATE SURVEILLANCE & LOOKOUT NOTICE. Issue location tracking orders.",
      "timestamp": "2026-03-16 12:00:00"
    },
    {
      "id": "ALT-2026-002",
      "severity": "HIGH",
      "title": "HIGH THREAT SUSPECT: Md. Zashil Mistry",
      "message": "Threat Score 83.5/100. Phone: +91-0356058771. Action: IMMEDIATE SURVEILLANCE & LOOKOUT NOTICE. Issue location tracking orders.",
      "timestamp": "2026-03-16 12:00:00"
    },
    {
      "id": "ALT-2026-003",
      "severity": "HIGH",
      "title": "HIGH THREAT SUSPECT: Md. Ranbir Bhalla",
      "message": "Threat Score 80.6/100. Phone: +91-2236381844. Action: IMMEDIATE SURVEILLANCE & LOOKOUT NOTICE. Issue location tracking orders.",
      "timestamp": "2026-03-16 12:00:00"
    },
    {
      "id": "ALT-2026-004",
      "severity": "HIGH",
      "title": "HIGH THREAT SUSPECT: Md. Azad Mannan",
      "message": "Threat Score 75.8/100. Phone: +91-8472516266. Action: IMMEDIATE SURVEILLANCE & LOOKOUT NOTICE. Issue location tracking orders.",
      "timestamp": "2026-03-16 12:00:00"
    },
    {
      "id": "ALT-2026-005",
      "severity": "HIGH",
      "title": "HIGH THREAT SUSPECT: Md. Indrajit Kunda",
      "message": "Threat Score 73.8/100. Phone: +91-6926567843. Action: IMMEDIATE SURVEILLANCE & LOOKOUT NOTICE. Issue location tracking orders.",
      "timestamp": "2026-03-16 12:00:00"
    },
    {
      "id": "ALT-2026-006",
      "severity": "HIGH",
      "title": "HIGH THREAT SUSPECT: Md. Balendra Nayak",
      "message": "Threat Score 71.3/100. Phone: +91-7309005344. Action: IMMEDIATE SURVEILLANCE & LOOKOUT NOTICE. Issue location tracking orders.",
      "timestamp": "2026-03-16 12:00:00"
    },
    {
      "id": "ALT-2026-007",
      "severity": "HIGH",
      "title": "CONFIRMED PHYSICAL MEETING: Md. Samar Nagar & Md. Teerth Bhargava",
      "message": "Sighted at camera MH-CCTV-2466 (Main Road Traffic Signal, Agripada, Mumbai) with 5 prior calls. Time gap: 10.0 min. Match Confidence: 97.0%",
      "timestamp": "2026-03-16 12:00:00"
    },
    {
      "id": "ALT-2026-008",
      "severity": "HIGH",
      "title": "CONFIRMED PHYSICAL MEETING: Md. Balendra Nayak & Md. Tarak Sahni",
      "message": "Sighted at camera MH-CCTV-1652 (Market Entrance, Byculla West, Mumbai) with 4 prior calls. Time gap: 10.0 min. Match Confidence: 96.0%",
      "timestamp": "2026-03-16 12:00:00"
    },
    {
      "id": "ALT-2026-009",
      "severity": "HIGH",
      "title": "CONFIRMED PHYSICAL MEETING: Md. Azad Mannan & Md. Indrajit Kunda",
      "message": "Sighted at camera MH-CCTV-1652 (Market Entrance, Byculla West, Mumbai) with 7 prior calls. Time gap: 10.0 min. Match Confidence: 95.0%",
      "timestamp": "2026-03-16 12:00:00"
    },
    {
      "id": "ALT-2026-010",
      "severity": "HIGH",
      "title": "CONFIRMED PHYSICAL MEETING: Md. Advik Golla & Md. Darsh Sampath",
      "message": "Sighted at camera MH-CCTV-5719 (Flyover Service Road, Lower Parel, Mumbai) with 8 prior calls. Time gap: 10.0 min. Match Confidence: 91.0%",
      "timestamp": "2026-03-16 12:00:00"
    },
    {
      "id": "ALT-2026-011",
      "severity": "HIGH",
      "title": "CONFIRMED PHYSICAL MEETING: Md. Advik Golla & Md. Darsh Sampath",
      "message": "Sighted at camera MH-CCTV-1652 (Market Entrance, Byculla West, Mumbai) with 8 prior calls. Time gap: 10.0 min. Match Confidence: 91.0%",
      "timestamp": "2026-03-16 12:00:00"
    },
    {
      "id": "ALT-2026-012",
      "severity": "HIGH",
      "title": "ACTIVE SYNDICATE RING-01 (Leader: Md. Zashil Mistry)",
      "message": "12 members active. 38 calls & 6 CCTV meetings recorded.",
      "timestamp": "2026-03-16 12:00:00"
    }
  ]
};

export const fallbackCriminalSummary: CriminalHistorySummaryResponse = {
  "total_records": 100,
  "repeat_offenders_count": 73,
  "under_trial_count": 26,
  "bailed_count": 12,
  "disposed_count": 7,
  "clean_records_count": 27,
  "offence_breakdown": {
    "Contract Assassination (Supari), Shootout on Witness & Gang Assault": 21,
    "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics": 11,
    "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations": 12,
    "Extortion, Running Organized Crime Syndicate & Illegal Arms Supply": 7,
    "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering": 13,
    "Armed Extortion & Intimidation of SRA Builders & Merchants": 9,
    "nan": 27
  },
  "police_station_breakdown": {
    "Crime Branch Unit 3 (Byculla)": 12,
    "Anti-Narcotics Cell (ANC) Bandra Unit": 5,
    "Enforcement Directorate / Crime Branch Unit 1": 5,
    "Kalachowki Police Station": 9,
    "Crime Branch Unit 1 (Crawford Market)": 3,
    "Tardeo Police Station": 6,
    "Crime Branch Unit 2": 7,
    "Bhoiwada Police Station": 12,
    "Nagpada Police Station": 4,
    "Crime Branch Cyber Cell": 7,
    "nan": 27,
    "Dongri Police Station": 3
  },
  "crime_category_breakdown": {
    "CONTRACT_KILLING_AND_ASSAULT": 21,
    "NARCOTICS_TRAFFICKING": 11,
    "HAWALA_AND_MONEY_LAUNDERING": 12,
    "ORGANIZED_CRIME": 7,
    "CYBER_FINANCIAL_FRAUD": 13,
    "EXTORTION_AND_THREAT": 9
  },
  "top_repeat_offenders": [
    {
      "uidb_number": "UIDB-873925",
      "fir_number": "0973/2026",
      "suspect_name": "Md. Ojas Bhavsar",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 2,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/287",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-979265",
      "fir_number": "0056/2026",
      "suspect_name": "Md. Sathvik Mahajan",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 5,
      "previous_ps_name": "Anti-Narcotics Cell (ANC) Bandra Unit",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/ANTI/2021/741",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Taloja Central Prison",
      "case_year": "2021.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-420097",
      "fir_number": "0288/2026",
      "suspect_name": "Md. Elijah Rege",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 3,
      "previous_ps_name": "Enforcement Directorate / Crime Branch Unit 1",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/ENFO/2022/739",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Out on Conditional Bail",
      "case_year": "2022.0",
      "case_status": "Bailed (Condition to Report Twice Weekly)"
    },
    {
      "uidb_number": "UIDB-446836",
      "fir_number": "0254/2026",
      "suspect_name": "Md. Ranbir Bhalla",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 1,
      "previous_ps_name": "Kalachowki Police Station",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/KALA/2024/139",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-452315",
      "fir_number": "0320/2026",
      "suspect_name": "Md. Pranit Arya",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 3,
      "previous_ps_name": "Enforcement Directorate / Crime Branch Unit 1",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/ENFO/2022/646",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Out on Conditional Bail",
      "case_year": "2022.0",
      "case_status": "Bailed (Condition to Report Twice Weekly)"
    }
  ]
};

export const fallbackCriminalRecordsList: CriminalRecordsListResponse = {
  "total_count": 100,
  "filtered_count": 100,
  "records": [
    {
      "uidb_number": "UIDB-873925",
      "fir_number": "0973/2026",
      "suspect_name": "Md. Ojas Bhavsar",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 2,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/287",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-979265",
      "fir_number": "0056/2026",
      "suspect_name": "Md. Sathvik Mahajan",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 5,
      "previous_ps_name": "Anti-Narcotics Cell (ANC) Bandra Unit",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/ANTI/2021/741",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Taloja Central Prison",
      "case_year": "2021.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-420097",
      "fir_number": "0288/2026",
      "suspect_name": "Md. Elijah Rege",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 3,
      "previous_ps_name": "Enforcement Directorate / Crime Branch Unit 1",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/ENFO/2022/739",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Out on Conditional Bail",
      "case_year": "2022.0",
      "case_status": "Bailed (Condition to Report Twice Weekly)"
    },
    {
      "uidb_number": "UIDB-446836",
      "fir_number": "0254/2026",
      "suspect_name": "Md. Ranbir Bhalla",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 1,
      "previous_ps_name": "Kalachowki Police Station",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/KALA/2024/139",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-452315",
      "fir_number": "0320/2026",
      "suspect_name": "Md. Pranit Arya",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 3,
      "previous_ps_name": "Enforcement Directorate / Crime Branch Unit 1",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/ENFO/2022/646",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Out on Conditional Bail",
      "case_year": "2022.0",
      "case_status": "Bailed (Condition to Report Twice Weekly)"
    },
    {
      "uidb_number": "UIDB-265705",
      "fir_number": "0481/2026",
      "suspect_name": "Md. Reyansh Anne",
      "known_aliases": "Bhaijaan, Company Enforcer",
      "prior_convictions_count": 2,
      "previous_ps_name": "Crime Branch Unit 1 (Crawford Market)",
      "previous_offence": "Extortion, Running Organized Crime Syndicate & Illegal Arms Supply",
      "act_and_sections": "MCOCA 1999 Sec 3(1)(ii), 3(2), 3(4) r/w Arms Act Sec 3, 25(1B)(a), IPC 120B",
      "modus_operandi": "Running protection racket (hafta) targeting real estate developers and angadias in South Mumbai via VoIP spoofing; arms stockpiling and coordinating extortion calls from safehouses.",
      "mob_number": "MOB/CRIM/2020/732",
      "crime_category": "ORGANIZED_CRIME",
      "custody_location": "Out on Conditional Bail",
      "case_year": "2020.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-156135",
      "fir_number": "0438/2026",
      "suspect_name": "Md. Andrew Bora",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 1,
      "previous_ps_name": "Tardeo Police Station",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/TARD/2023/839",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-916113",
      "fir_number": "0108/2026",
      "suspect_name": "Md. Gagan Rao",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 2,
      "previous_ps_name": "Crime Branch Unit 2",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/CRIM/2022/689",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Not in Custody (Interim Bail)",
      "case_year": "2022.0",
      "case_status": "Under Trial"
    },
    {
      "uidb_number": "UIDB-893401",
      "fir_number": "0898/2026",
      "suspect_name": "Md. Peter Barad",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 4,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/BHOI/2021/949",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Judicial Custody",
      "case_year": "2021.0",
      "case_status": "Charge-sheeted"
    },
    {
      "uidb_number": "UIDB-011123",
      "fir_number": "0734/2026",
      "suspect_name": "Md. Nihal Rana",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 2,
      "previous_ps_name": "Tardeo Police Station",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/TARD/2023/788",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-929724",
      "fir_number": "0513/2026",
      "suspect_name": "Md. Arjun Sheth",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 4,
      "previous_ps_name": "Enforcement Directorate / Crime Branch Unit 1",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/ENFO/2022/484",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Out on Conditional Bail",
      "case_year": "2022.0",
      "case_status": "Bailed (Condition to Report Twice Weekly)"
    },
    {
      "uidb_number": "UIDB-573287",
      "fir_number": "0635/2026",
      "suspect_name": "Md. Umang Mody",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 3,
      "previous_ps_name": "Kalachowki Police Station",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/KALA/2024/223",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-043583",
      "fir_number": "0724/2026",
      "suspect_name": "Md. Laban Prakash",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 4,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/520",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-436242",
      "fir_number": "0414/2026",
      "suspect_name": "Md. Zashil Mistry",
      "known_aliases": "Chhota Boss, Bhai Dongri",
      "prior_convictions_count": 5,
      "previous_ps_name": "Nagpada Police Station",
      "previous_offence": "Armed Extortion & Intimidation of SRA Builders & Merchants",
      "act_and_sections": "IPC Sec 384, 386, 387, 506(2), 34",
      "modus_operandi": "Intimidating Slum Rehabilitation Authority (SRA) contractors and local scrap dealers; deploying muscle for forcible land possession and extorting monthly hafta payments.",
      "mob_number": "MOB/NAGP/2025/461",
      "crime_category": "EXTORTION_AND_THREAT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2025.0",
      "case_status": "Under Trial"
    },
    {
      "uidb_number": "UIDB-007709",
      "fir_number": "0658/2026",
      "suspect_name": "Md. Advik Golla",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 5,
      "previous_ps_name": "Kalachowki Police Station",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/KALA/2024/992",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-103655",
      "fir_number": "0052/2026",
      "suspect_name": "Md. Ayush Baria",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 2,
      "previous_ps_name": "Crime Branch Cyber Cell",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/CRIM/2023/304",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Bailed (Surety of \u20b950,000)"
    },
    {
      "uidb_number": "UIDB-323507",
      "fir_number": "0481/2026",
      "suspect_name": "Md. Simon Rai",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 5,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/825",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-524597",
      "fir_number": "0736/2026",
      "suspect_name": "Md. Tarak Sahni",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-427729",
      "fir_number": "0808/2026",
      "suspect_name": "Md. Ayush Buch",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 5,
      "previous_ps_name": "Crime Branch Unit 2",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/CRIM/2022/662",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Not in Custody (Interim Bail)",
      "case_year": "2022.0",
      "case_status": "Under Trial"
    },
    {
      "uidb_number": "UIDB-703496",
      "fir_number": "0920/2026",
      "suspect_name": "Md. Amol Nagy",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 4,
      "previous_ps_name": "Crime Branch Unit 2",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/CRIM/2022/601",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Not in Custody (Interim Bail)",
      "case_year": "2022.0",
      "case_status": "Under Trial"
    },
    {
      "uidb_number": "UIDB-334672",
      "fir_number": "0161/2026",
      "suspect_name": "Md. Baljiwan Hayer",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 4,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/805",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-488834",
      "fir_number": "0538/2026",
      "suspect_name": "Md. Devansh Vohra",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 5,
      "previous_ps_name": "Kalachowki Police Station",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/KALA/2024/337",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-187205",
      "fir_number": "0984/2026",
      "suspect_name": "Md. Gopal Radhakrishnan",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 5,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/390",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-410090",
      "fir_number": "0915/2026",
      "suspect_name": "Md. Zayyan Ahluwalia",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-672297",
      "fir_number": "0939/2026",
      "suspect_name": "Md. Rudra Sant",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-316873",
      "fir_number": "0869/2026",
      "suspect_name": "Md. Fitan Mander",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-064096",
      "fir_number": "0918/2026",
      "suspect_name": "Md. Nachiket Desai",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 3,
      "previous_ps_name": "Tardeo Police Station",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/TARD/2023/656",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-051849",
      "fir_number": "0196/2026",
      "suspect_name": "Md. Maanav Tailor",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 4,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/541",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-979328",
      "fir_number": "0191/2026",
      "suspect_name": "Md. Balendra Nayak",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 5,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/BHOI/2021/464",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Judicial Custody",
      "case_year": "2021.0",
      "case_status": "Charge-sheeted"
    },
    {
      "uidb_number": "UIDB-179689",
      "fir_number": "0370/2026",
      "suspect_name": "Md. Robert Narain",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 4,
      "previous_ps_name": "Crime Branch Unit 2",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/CRIM/2022/903",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Not in Custody (Interim Bail)",
      "case_year": "2022.0",
      "case_status": "Under Trial"
    },
    {
      "uidb_number": "UIDB-342453",
      "fir_number": "0593/2026",
      "suspect_name": "Md. Tanveer Choudhary",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-402228",
      "fir_number": "0634/2026",
      "suspect_name": "Md. Azad Mannan",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 4,
      "previous_ps_name": "Crime Branch Cyber Cell",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/CRIM/2023/286",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Bailed (Surety of \u20b950,000)"
    },
    {
      "uidb_number": "UIDB-448302",
      "fir_number": "0489/2026",
      "suspect_name": "Md. Amol Mody",
      "known_aliases": "Bhaijaan, Company Enforcer",
      "prior_convictions_count": 4,
      "previous_ps_name": "Dongri Police Station",
      "previous_offence": "Extortion, Running Organized Crime Syndicate & Illegal Arms Supply",
      "act_and_sections": "MCOCA 1999 Sec 3(1)(ii), 3(2), 3(4) r/w Arms Act Sec 3, 25(1B)(a), IPC 120B",
      "modus_operandi": "Running protection racket (hafta) targeting real estate developers and angadias in South Mumbai via VoIP spoofing; arms stockpiling and coordinating extortion calls from safehouses.",
      "mob_number": "MOB/DONG/2020/650",
      "crime_category": "ORGANIZED_CRIME",
      "custody_location": "Arthur Road Jail (Barrack 12)",
      "case_year": "2020.0",
      "case_status": "Under Trial (Special MCOCA Court)"
    },
    {
      "uidb_number": "UIDB-132028",
      "fir_number": "0399/2026",
      "suspect_name": "Md. Zaid Bhattacharyya",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 1,
      "previous_ps_name": "Crime Branch Cyber Cell",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/CRIM/2023/138",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Bailed (Surety of \u20b950,000)"
    },
    {
      "uidb_number": "UIDB-701396",
      "fir_number": "0827/2026",
      "suspect_name": "Md. Nicholas Karpe",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 1,
      "previous_ps_name": "Crime Branch Cyber Cell",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/CRIM/2023/331",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Bailed (Surety of \u20b950,000)"
    },
    {
      "uidb_number": "UIDB-863523",
      "fir_number": "0847/2026",
      "suspect_name": "Md. Indrajit Kunda",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 3,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/BHOI/2021/687",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Judicial Custody",
      "case_year": "2021.0",
      "case_status": "Charge-sheeted"
    },
    {
      "uidb_number": "UIDB-653981",
      "fir_number": "0307/2026",
      "suspect_name": "Md. Akshay Lata",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 2,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/664",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-514518",
      "fir_number": "0789/2026",
      "suspect_name": "Md. Tejas Nigam",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-932397",
      "fir_number": "0509/2026",
      "suspect_name": "Md. Elijah Ganguly",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 3,
      "previous_ps_name": "Crime Branch Cyber Cell",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/CRIM/2023/621",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Bailed (Surety of \u20b950,000)"
    },
    {
      "uidb_number": "UIDB-450627",
      "fir_number": "0605/2026",
      "suspect_name": "Md. Reyansh Mangal",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 5,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/BHOI/2021/684",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Judicial Custody",
      "case_year": "2021.0",
      "case_status": "Charge-sheeted"
    },
    {
      "uidb_number": "UIDB-870221",
      "fir_number": "0486/2026",
      "suspect_name": "Md. Jatin Murthy",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-268250",
      "fir_number": "0725/2026",
      "suspect_name": "Md. Anay Minhas",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-454527",
      "fir_number": "0456/2026",
      "suspect_name": "Md. Jeet Saha",
      "known_aliases": "Chhota Boss, Bhai Dongri",
      "prior_convictions_count": 1,
      "previous_ps_name": "Nagpada Police Station",
      "previous_offence": "Armed Extortion & Intimidation of SRA Builders & Merchants",
      "act_and_sections": "IPC Sec 384, 386, 387, 506(2), 34",
      "modus_operandi": "Intimidating Slum Rehabilitation Authority (SRA) contractors and local scrap dealers; deploying muscle for forcible land possession and extorting monthly hafta payments.",
      "mob_number": "MOB/NAGP/2025/789",
      "crime_category": "EXTORTION_AND_THREAT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2025.0",
      "case_status": "Under Trial"
    },
    {
      "uidb_number": "UIDB-438234",
      "fir_number": "0413/2026",
      "suspect_name": "Md. Wriddhish Varty",
      "known_aliases": "Bhaijaan, Company Enforcer",
      "prior_convictions_count": 5,
      "previous_ps_name": "Nagpada Police Station",
      "previous_offence": "Extortion, Running Organized Crime Syndicate & Illegal Arms Supply",
      "act_and_sections": "MCOCA 1999 Sec 3(1)(ii), 3(2), 3(4) r/w Arms Act Sec 3, 25(1B)(a), IPC 120B",
      "modus_operandi": "Running protection racket (hafta) targeting real estate developers and angadias in South Mumbai via VoIP spoofing; arms stockpiling and coordinating extortion calls from safehouses.",
      "mob_number": "MOB/NAGP/2020/696",
      "crime_category": "ORGANIZED_CRIME",
      "custody_location": "Out on Conditional Bail",
      "case_year": "2020.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-642244",
      "fir_number": "0053/2026",
      "suspect_name": "Md. Kevin Ganesan",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 4,
      "previous_ps_name": "Kalachowki Police Station",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/KALA/2024/426",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-460337",
      "fir_number": "0263/2026",
      "suspect_name": "Md. Frado Dhingra",
      "known_aliases": "Bhaijaan, Company Enforcer",
      "prior_convictions_count": 4,
      "previous_ps_name": "Dongri Police Station",
      "previous_offence": "Extortion, Running Organized Crime Syndicate & Illegal Arms Supply",
      "act_and_sections": "MCOCA 1999 Sec 3(1)(ii), 3(2), 3(4) r/w Arms Act Sec 3, 25(1B)(a), IPC 120B",
      "modus_operandi": "Running protection racket (hafta) targeting real estate developers and angadias in South Mumbai via VoIP spoofing; arms stockpiling and coordinating extortion calls from safehouses.",
      "mob_number": "MOB/DONG/2020/594",
      "crime_category": "ORGANIZED_CRIME",
      "custody_location": "Arthur Road Jail (Barrack 12)",
      "case_year": "2020.0",
      "case_status": "Under Trial (Special MCOCA Court)"
    },
    {
      "uidb_number": "UIDB-385562",
      "fir_number": "0039/2026",
      "suspect_name": "Md. Naveen Tailor",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 4,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/275",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-483888",
      "fir_number": "0856/2026",
      "suspect_name": "Md. Dominic Gupta",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 5,
      "previous_ps_name": "Crime Branch Unit 2",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/CRIM/2022/752",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Not in Custody (Interim Bail)",
      "case_year": "2022.0",
      "case_status": "Under Trial"
    },
    {
      "uidb_number": "UIDB-300146",
      "fir_number": "0728/2026",
      "suspect_name": "Md. Frederick Nori",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-003552",
      "fir_number": "0596/2026",
      "suspect_name": "Md. Brijesh Goda",
      "known_aliases": "Chhota Boss, Bhai Dongri",
      "prior_convictions_count": 3,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Armed Extortion & Intimidation of SRA Builders & Merchants",
      "act_and_sections": "IPC Sec 384, 386, 387, 506(2), 34",
      "modus_operandi": "Intimidating Slum Rehabilitation Authority (SRA) contractors and local scrap dealers; deploying muscle for forcible land possession and extorting monthly hafta payments.",
      "mob_number": "MOB/BHOI/2025/851",
      "crime_category": "EXTORTION_AND_THREAT",
      "custody_location": "Not in Custody",
      "case_year": "2025.0",
      "case_status": "Disposed (Compounded)"
    },
    {
      "uidb_number": "UIDB-878903",
      "fir_number": "0654/2026",
      "suspect_name": "Md. Qadim Solanki",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 3,
      "previous_ps_name": "Anti-Narcotics Cell (ANC) Bandra Unit",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/ANTI/2021/323",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Taloja Central Prison",
      "case_year": "2021.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-823492",
      "fir_number": "0573/2026",
      "suspect_name": "Md. Daniel Raman",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 5,
      "previous_ps_name": "Kalachowki Police Station",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/KALA/2024/737",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-813150",
      "fir_number": "0225/2026",
      "suspect_name": "Md. Vihaan Vohra",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-642045",
      "fir_number": "0683/2026",
      "suspect_name": "Md. David Nayak",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-923765",
      "fir_number": "0430/2026",
      "suspect_name": "Md. Harish Bali",
      "known_aliases": "Chhota Boss, Bhai Dongri",
      "prior_convictions_count": 3,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Armed Extortion & Intimidation of SRA Builders & Merchants",
      "act_and_sections": "IPC Sec 384, 386, 387, 506(2), 34",
      "modus_operandi": "Intimidating Slum Rehabilitation Authority (SRA) contractors and local scrap dealers; deploying muscle for forcible land possession and extorting monthly hafta payments.",
      "mob_number": "MOB/BHOI/2025/669",
      "crime_category": "EXTORTION_AND_THREAT",
      "custody_location": "Not in Custody",
      "case_year": "2025.0",
      "case_status": "Disposed (Compounded)"
    },
    {
      "uidb_number": "UIDB-665991",
      "fir_number": "0123/2026",
      "suspect_name": "Md. Matthew Om",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-320042",
      "fir_number": "0168/2026",
      "suspect_name": "Md. Rayaan Bhavsar",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-632568",
      "fir_number": "0755/2026",
      "suspect_name": "Md. Hemang Shere",
      "known_aliases": "Chhota Boss, Bhai Dongri",
      "prior_convictions_count": 3,
      "previous_ps_name": "Nagpada Police Station",
      "previous_offence": "Armed Extortion & Intimidation of SRA Builders & Merchants",
      "act_and_sections": "IPC Sec 384, 386, 387, 506(2), 34",
      "modus_operandi": "Intimidating Slum Rehabilitation Authority (SRA) contractors and local scrap dealers; deploying muscle for forcible land possession and extorting monthly hafta payments.",
      "mob_number": "MOB/NAGP/2025/581",
      "crime_category": "EXTORTION_AND_THREAT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2025.0",
      "case_status": "Under Trial"
    },
    {
      "uidb_number": "UIDB-713875",
      "fir_number": "0326/2026",
      "suspect_name": "Md. Jeet Sachdeva",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 5,
      "previous_ps_name": "Anti-Narcotics Cell (ANC) Bandra Unit",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/ANTI/2021/450",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Taloja Central Prison",
      "case_year": "2021.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-833665",
      "fir_number": "0689/2026",
      "suspect_name": "Md. Zehaan Wali",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-221435",
      "fir_number": "0104/2026",
      "suspect_name": "Md. Aarnav Sekhon",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 5,
      "previous_ps_name": "Enforcement Directorate / Crime Branch Unit 1",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/ENFO/2022/839",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Out on Conditional Bail",
      "case_year": "2022.0",
      "case_status": "Bailed (Condition to Report Twice Weekly)"
    },
    {
      "uidb_number": "UIDB-951483",
      "fir_number": "0227/2026",
      "suspect_name": "Md. Qarin Balan",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 4,
      "previous_ps_name": "Crime Branch Unit 2",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/CRIM/2022/857",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Not in Custody (Interim Bail)",
      "case_year": "2022.0",
      "case_status": "Under Trial"
    },
    {
      "uidb_number": "UIDB-370227",
      "fir_number": "0353/2026",
      "suspect_name": "Md. Balhaar Sami",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 4,
      "previous_ps_name": "Kalachowki Police Station",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/KALA/2024/762",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-857267",
      "fir_number": "0420/2026",
      "suspect_name": "Md. Warjas Khalsa",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-059802",
      "fir_number": "0286/2026",
      "suspect_name": "Md. Christopher Pillai",
      "known_aliases": "Bhaijaan, Company Enforcer",
      "prior_convictions_count": 2,
      "previous_ps_name": "Crime Branch Unit 1 (Crawford Market)",
      "previous_offence": "Extortion, Running Organized Crime Syndicate & Illegal Arms Supply",
      "act_and_sections": "MCOCA 1999 Sec 3(1)(ii), 3(2), 3(4) r/w Arms Act Sec 3, 25(1B)(a), IPC 120B",
      "modus_operandi": "Running protection racket (hafta) targeting real estate developers and angadias in South Mumbai via VoIP spoofing; arms stockpiling and coordinating extortion calls from safehouses.",
      "mob_number": "MOB/CRIM/2020/124",
      "crime_category": "ORGANIZED_CRIME",
      "custody_location": "Out on Conditional Bail",
      "case_year": "2020.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-616105",
      "fir_number": "0112/2026",
      "suspect_name": "Md. Frederick Gade",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 5,
      "previous_ps_name": "Enforcement Directorate / Crime Branch Unit 1",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/ENFO/2022/694",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Out on Conditional Bail",
      "case_year": "2022.0",
      "case_status": "Bailed (Condition to Report Twice Weekly)"
    },
    {
      "uidb_number": "UIDB-891983",
      "fir_number": "0235/2026",
      "suspect_name": "Md. Raghav Manda",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 3,
      "previous_ps_name": "Anti-Narcotics Cell (ANC) Bandra Unit",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/ANTI/2021/218",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Taloja Central Prison",
      "case_year": "2021.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-962803",
      "fir_number": "0460/2026",
      "suspect_name": "Md. Laban Sidhu",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 5,
      "previous_ps_name": "Kalachowki Police Station",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/KALA/2024/877",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    },
    {
      "uidb_number": "UIDB-012021",
      "fir_number": "0009/2026",
      "suspect_name": "Md. Rudra Narula",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 4,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/BHOI/2021/364",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Judicial Custody",
      "case_year": "2021.0",
      "case_status": "Charge-sheeted"
    },
    {
      "uidb_number": "UIDB-674575",
      "fir_number": "0468/2026",
      "suspect_name": "Md. George Ramaswamy",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-080101",
      "fir_number": "0295/2026",
      "suspect_name": "Md. Owen Ganesh",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-114019",
      "fir_number": "0545/2026",
      "suspect_name": "Md. Frado Raja",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-088237",
      "fir_number": "0460/2026",
      "suspect_name": "Md. Zaid Nair",
      "known_aliases": "Chhota Boss, Bhai Dongri",
      "prior_convictions_count": 4,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Armed Extortion & Intimidation of SRA Builders & Merchants",
      "act_and_sections": "IPC Sec 384, 386, 387, 506(2), 34",
      "modus_operandi": "Intimidating Slum Rehabilitation Authority (SRA) contractors and local scrap dealers; deploying muscle for forcible land possession and extorting monthly hafta payments.",
      "mob_number": "MOB/BHOI/2025/623",
      "crime_category": "EXTORTION_AND_THREAT",
      "custody_location": "Not in Custody",
      "case_year": "2025.0",
      "case_status": "Disposed (Compounded)"
    },
    {
      "uidb_number": "UIDB-729611",
      "fir_number": "0233/2026",
      "suspect_name": "Md. Harsh Samra",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 3,
      "previous_ps_name": "Tardeo Police Station",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/TARD/2023/422",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-176398",
      "fir_number": "0777/2026",
      "suspect_name": "Md. Ansh Sandal",
      "known_aliases": "Cash Kingpin, Zaveri Courier",
      "prior_convictions_count": 4,
      "previous_ps_name": "Crime Branch Unit 2",
      "previous_offence": "Cross-Border Hawala Layering & Angadia Illegal Cash Conduit Operations",
      "act_and_sections": "PMLA 2002 Sec 3, Sec 4 r/w IPC 420, 120B",
      "modus_operandi": "Operating illicit hawala book across Zaveri Bazaar & Opera House; layering extortion & contraband profits via 12 fictitious shell LLP bank accounts using forged Aadhaar cards.",
      "mob_number": "MOB/CRIM/2022/591",
      "crime_category": "HAWALA_AND_MONEY_LAUNDERING",
      "custody_location": "Not in Custody (Interim Bail)",
      "case_year": "2022.0",
      "case_status": "Under Trial"
    },
    {
      "uidb_number": "UIDB-715006",
      "fir_number": "0871/2026",
      "suspect_name": "Md. Harrison Sarna",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-262638",
      "fir_number": "0895/2026",
      "suspect_name": "Md. Gaurang Bhatti",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-517508",
      "fir_number": "0881/2026",
      "suspect_name": "Md. Vedant Padmanabhan",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 5,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/945",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-764817",
      "fir_number": "0055/2026",
      "suspect_name": "Md. Yagnesh Zacharia",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-013583",
      "fir_number": "0762/2026",
      "suspect_name": "Md. Alexander Master",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 5,
      "previous_ps_name": "Crime Branch Cyber Cell",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/CRIM/2023/368",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Bailed (Surety of \u20b950,000)"
    },
    {
      "uidb_number": "UIDB-937754",
      "fir_number": "0977/2026",
      "suspect_name": "Md. Onveer Bahl",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 4,
      "previous_ps_name": "Anti-Narcotics Cell (ANC) Bandra Unit",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/ANTI/2021/898",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Taloja Central Prison",
      "case_year": "2021.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-261340",
      "fir_number": "0760/2026",
      "suspect_name": "Md. Darsh Sampath",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-762065",
      "fir_number": "0292/2026",
      "suspect_name": "Md. Wridesh Virk",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 4,
      "previous_ps_name": "Tardeo Police Station",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/TARD/2023/731",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-507806",
      "fir_number": "0069/2026",
      "suspect_name": "Md. Wridesh Bali",
      "known_aliases": "Chemical Chembur, Dealer Farhan",
      "prior_convictions_count": 1,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Commercial Quantity Trafficking of Mephedrone (MD) & Synthetic Narcotics",
      "act_and_sections": "NDPS Act 1985 Sec 8(c), 20(b)(ii)(C), 22(c), 29",
      "modus_operandi": "Procuring synthetic narcotics via Goa-Mumbai coastal dead-drops; distribution network operating through courier packages and high-end nightlife circuits across South and West Mumbai.",
      "mob_number": "MOB/BHOI/2021/316",
      "crime_category": "NARCOTICS_TRAFFICKING",
      "custody_location": "Judicial Custody",
      "case_year": "2021.0",
      "case_status": "Charge-sheeted"
    },
    {
      "uidb_number": "UIDB-779644",
      "fir_number": "0660/2026",
      "suspect_name": "Md. Chakradhar Batta",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-242856",
      "fir_number": "0323/2026",
      "suspect_name": "Md. Sathvik Pant",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-235018",
      "fir_number": "0943/2026",
      "suspect_name": "Md. Samar Nagar",
      "known_aliases": "Bhaijaan, Company Enforcer",
      "prior_convictions_count": 2,
      "previous_ps_name": "Crime Branch Unit 1 (Crawford Market)",
      "previous_offence": "Extortion, Running Organized Crime Syndicate & Illegal Arms Supply",
      "act_and_sections": "MCOCA 1999 Sec 3(1)(ii), 3(2), 3(4) r/w Arms Act Sec 3, 25(1B)(a), IPC 120B",
      "modus_operandi": "Running protection racket (hafta) targeting real estate developers and angadias in South Mumbai via VoIP spoofing; arms stockpiling and coordinating extortion calls from safehouses.",
      "mob_number": "MOB/CRIM/2020/652",
      "crime_category": "ORGANIZED_CRIME",
      "custody_location": "Arthur Road Jail (Barrack 12)",
      "case_year": "2020.0",
      "case_status": "Under Trial (Special MCOCA Court)"
    },
    {
      "uidb_number": "UIDB-474169",
      "fir_number": "0173/2026",
      "suspect_name": "Md. Chanakya Chaudhari",
      "known_aliases": "Bhaijaan, Company Enforcer",
      "prior_convictions_count": 4,
      "previous_ps_name": "Dongri Police Station",
      "previous_offence": "Extortion, Running Organized Crime Syndicate & Illegal Arms Supply",
      "act_and_sections": "MCOCA 1999 Sec 3(1)(ii), 3(2), 3(4) r/w Arms Act Sec 3, 25(1B)(a), IPC 120B",
      "modus_operandi": "Running protection racket (hafta) targeting real estate developers and angadias in South Mumbai via VoIP spoofing; arms stockpiling and coordinating extortion calls from safehouses.",
      "mob_number": "MOB/DONG/2020/609",
      "crime_category": "ORGANIZED_CRIME",
      "custody_location": "Arthur Road Jail (Barrack 12)",
      "case_year": "2020.0",
      "case_status": "Under Trial (Special MCOCA Court)"
    },
    {
      "uidb_number": "UIDB-816988",
      "fir_number": "0734/2026",
      "suspect_name": "Md. Umang Sabharwal",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-435883",
      "fir_number": "0021/2026",
      "suspect_name": "Md. Veer Devi",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 2,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/843",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-987647",
      "fir_number": "0439/2026",
      "suspect_name": "Md. Falan Krishna",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 4,
      "previous_ps_name": "Tardeo Police Station",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/TARD/2023/307",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Judicial Custody (Arthur Road Jail)"
    },
    {
      "uidb_number": "UIDB-455210",
      "fir_number": "0252/2026",
      "suspect_name": "Md. Yagnesh Tak",
      "known_aliases": "Chhota Boss, Bhai Dongri",
      "prior_convictions_count": 4,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Armed Extortion & Intimidation of SRA Builders & Merchants",
      "act_and_sections": "IPC Sec 384, 386, 387, 506(2), 34",
      "modus_operandi": "Intimidating Slum Rehabilitation Authority (SRA) contractors and local scrap dealers; deploying muscle for forcible land possession and extorting monthly hafta payments.",
      "mob_number": "MOB/BHOI/2025/219",
      "crime_category": "EXTORTION_AND_THREAT",
      "custody_location": "Not in Custody",
      "case_year": "2025.0",
      "case_status": "Disposed (Compounded)"
    },
    {
      "uidb_number": "UIDB-355017",
      "fir_number": "0716/2026",
      "suspect_name": "Md. Jagdish Acharya",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-881447",
      "fir_number": "0371/2026",
      "suspect_name": "Md. Samar Golla",
      "known_aliases": "Chhota Boss, Bhai Dongri",
      "prior_convictions_count": 3,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Armed Extortion & Intimidation of SRA Builders & Merchants",
      "act_and_sections": "IPC Sec 384, 386, 387, 506(2), 34",
      "modus_operandi": "Intimidating Slum Rehabilitation Authority (SRA) contractors and local scrap dealers; deploying muscle for forcible land possession and extorting monthly hafta payments.",
      "mob_number": "MOB/BHOI/2025/522",
      "crime_category": "EXTORTION_AND_THREAT",
      "custody_location": "Not in Custody",
      "case_year": "2025.0",
      "case_status": "Disposed (Compounded)"
    },
    {
      "uidb_number": "UIDB-672485",
      "fir_number": "0983/2026",
      "suspect_name": "Md. Teerth Bhargava",
      "known_aliases": "None / Clean Profile",
      "prior_convictions_count": 0,
      "previous_ps_name": "nan",
      "previous_offence": "nan",
      "act_and_sections": "nan",
      "modus_operandi": "No prior criminal history on record. Subject currently under preliminary intelligence observation.",
      "mob_number": "nan",
      "crime_category": "CLEAN",
      "custody_location": "Not in Custody",
      "case_year": "nan",
      "case_status": "Clean Record"
    },
    {
      "uidb_number": "UIDB-053812",
      "fir_number": "0499/2026",
      "suspect_name": "Md. Manan Subramanian",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 4,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/528",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-264186",
      "fir_number": "0687/2026",
      "suspect_name": "Md. Oliver Dasgupta",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 5,
      "previous_ps_name": "Crime Branch Unit 3 (Byculla)",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/CRIM/2024/557",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Under Trial (Sessions Court 14)"
    },
    {
      "uidb_number": "UIDB-563896",
      "fir_number": "0819/2026",
      "suspect_name": "Md. Ranbir Bains",
      "known_aliases": "Proxy Boy, Crypto Mule",
      "prior_convictions_count": 4,
      "previous_ps_name": "Crime Branch Cyber Cell",
      "previous_offence": "SIM Box Operation, Bank Impersonation Phishing & UPI Mule Laundering",
      "act_and_sections": "Information Technology Act Sec 66D, 66C r/w IPC 419, 420, 468, 471",
      "modus_operandi": "Operating high-density 128-port SIM boxes to route offshore fraudulent KYC phishing calls; rapidly funneling victim balances through layered student mule accounts within 120 seconds.",
      "mob_number": "MOB/CRIM/2023/965",
      "crime_category": "CYBER_FINANCIAL_FRAUD",
      "custody_location": "Arthur Road Jail",
      "case_year": "2023.0",
      "case_status": "Bailed (Surety of \u20b950,000)"
    },
    {
      "uidb_number": "UIDB-579884",
      "fir_number": "0777/2026",
      "suspect_name": "Md. Karan Mistry",
      "known_aliases": "Chhota Boss, Bhai Dongri",
      "prior_convictions_count": 1,
      "previous_ps_name": "Bhoiwada Police Station",
      "previous_offence": "Armed Extortion & Intimidation of SRA Builders & Merchants",
      "act_and_sections": "IPC Sec 384, 386, 387, 506(2), 34",
      "modus_operandi": "Intimidating Slum Rehabilitation Authority (SRA) contractors and local scrap dealers; deploying muscle for forcible land possession and extorting monthly hafta payments.",
      "mob_number": "MOB/BHOI/2025/757",
      "crime_category": "EXTORTION_AND_THREAT",
      "custody_location": "Not in Custody",
      "case_year": "2025.0",
      "case_status": "Disposed (Compounded)"
    },
    {
      "uidb_number": "UIDB-397233",
      "fir_number": "0702/2026",
      "suspect_name": "Md. Dev Mani",
      "known_aliases": "Goli Mastan, Sharpie",
      "prior_convictions_count": 5,
      "previous_ps_name": "Kalachowki Police Station",
      "previous_offence": "Contract Assassination (Supari), Shootout on Witness & Gang Assault",
      "act_and_sections": "IPC Sec 302, 307, 120B, 34 r/w Arms Act Sec 25(1B)(a), Sec 27",
      "modus_operandi": "Conducting motorcycle-borne reconnaissance on syndicate hit targets; executing firearm ambushes with 7.65mm country pistols and disposing weapons in Thane Creek.",
      "mob_number": "MOB/KALA/2024/936",
      "crime_category": "CONTRACT_KILLING_AND_ASSAULT",
      "custody_location": "Arthur Road Jail",
      "case_year": "2024.0",
      "case_status": "Judicial Custody (Taloja Central Prison)"
    }
  ]
};

export const fallbackDossier: SuspectDossierDetails = {
  suspect_name: "Md. Ranbir Bhalla",
  phone_number: "+91-2236381844",
  threat_score: 94.2,
  cctv_meetings_count: 5,
  fir_matches_count: 4,
  cdr_calls_count: 340,
  dossier_markdown: `# BRIHANMUMBAI POLICE — EXECUTIVE INTELLIGENCE DOSSIER\n**SUBJECT**: Md. Ranbir Bhalla\n**MOB RECORD**: MOB/CRIM/2021/044 | **UIDB**: UIDB-982341\n**STATUS**: HIGH-RISK SYNDICATE LEADER (CRITICAL)\n\n### 1. STATUTORY CRIMINAL PROFILE\n- **Active Statutes**: MCOCA 1999 Sec 3(1)(ii), IPC Sec 384, 387, 120B r/w Arms Act Sec 25/27\n- **Modus Operandi**: Orchestrates extortion networks targeting South Mumbai builders & angadia traders. Uses layered cell towers and SIM box relays.\n- **Current Judicial Status**: Under Trial (Special MCOCA Court Sessions 3)\n\n### 2. CROSS-DOMAIN INTELLIGENCE FUSION\n- **CDR Mesh**: 340 recorded interactions with 28 identified syndicate associates; 38% nocturnal call ratio (00:00 - 06:00 IST).\n- **CCTV Sighting Matches**: 5 physical co-location meetings verified at Byculla Station Footpath and Venus Wine Shop.\n- **Financial Trails**: Linked to 4 shell LLPs with INR 8.5 Crore tainted fund flow flagged by FIU-IND CTR triggers.\n- **Field Surveillance**: 12 panchnama-verified spot reports filed by Anti-Extortion Cell (AEC).`,
  driver_breakdown: {
    "CDR Network": 95.0,
    "Criminal History": 98.0,
    "CCTV Co-Location": 90.0,
    "FIR Severity": 92.0,
    "Field Surveillance": 95.0,
    "Financial Risk": 88.0
  }
};

export const fallbackTimeline: TimelineResponse = {
  suspect_name: "Md. Ranbir Bhalla",
  phone_number: "+91-2236381844",
  total_events: 4,
  events: [
    {
      event_id: "EVT-01",
      timestamp: "2026-03-15 01:45:22",
      source_module: "NOCTURNAL",
      color: "#06b6d4",
      title: "Nocturnal Call Spike (MH-TOWER-BYCULLA-04)",
      description: "Encrypted call exchange with co-accused Md. Teerth Bhargava (duration 18m).",
      metadata: { duration_sec: 1080, cell_tower: "MH-TOWER-BYCULLA-04" }
    },
    {
      event_id: "EVT-02",
      timestamp: "2026-03-14 14:30:00",
      source_module: "CCTV",
      color: "#f59e0b",
      title: "Physical Co-Location Sighting",
      description: "Optical co-location match with Md. Vedant Padmanabhan on Camera MH-CCTV-9890 (94.5% confidence).",
      metadata: { camera_id: "MH-CCTV-9890", location: "Byculla Station Road Footpath" }
    },
    {
      event_id: "EVT-03",
      timestamp: "2026-03-12 11:15:00",
      source_module: "FINANCIAL",
      color: "#10b981",
      title: "High-Value Hawala Injection",
      description: "High-value cash injection of INR 45,00,000 routed via Apex Horizon Trading LLP.",
      metadata: { amount_inr: 45000000, shell_llp: "Apex Horizon Trading LLP" }
    },
    {
      event_id: "EVT-04",
      timestamp: "2026-03-10 18:20:00",
      source_module: "SURVEILLANCE",
      color: "#6366f1",
      title: "Field Reconnaissance Spotting",
      description: "AEC field patrol observation logged by PSI R. Shinde. Panchnama conducted with 2 independent witnesses.",
      metadata: { officer: "PSI R. Shinde", report_id: "SURV-001" }
    }
  ]
};

export const fallbackSocial: SocialMediaResponse = {
  total_monitored_suspects: 10,
  total_flagged_posts: 48,
  total_location_clusters: 6,
  location_clusters: [
    {
      approximate_location: "Byculla / Mazgaon",
      suspect_count: 4,
      platforms_used: "Telegram, Instagram, X",
      devices_used: "iPhone 15 Pro, Samsung Galaxy S23",
      suspects: ["Md. Ranbir Bhalla", "Md. Teerth Bhargava", "Md. Vedant Padmanabhan", "Md. Pranit Arya"]
    },
    {
      approximate_location: "Dongri / JJ Marg",
      suspect_count: 3,
      platforms_used: "WhatsApp, Signal, Telegram",
      devices_used: "OnePlus 12, Redmi Note 13",
      suspects: ["Md. Laban Prakash", "Md. Hardik Kant", "Md. Peter Barad"]
    }
  ],
  suspects: [
    {
      suspect_name: "Md. Ranbir Bhalla",
      phone_number: "+91-2236381844",
      total_platforms: 3,
      total_posts: 19,
      overall_sentiment: "THREATENING / ADVERSARIAL",
      risk_score: 94.2,
      profiles: [
        {
          platform: "Telegram",
          handle: "@ranbir_b_ops",
          followers_count: 420,
          following_count: 85,
          is_verified: false,
          status_flag: "FLAGGED_ENCRYPTED_COMMS",
          profile_url: "https://t.me/ranbir_b_ops"
        },
        {
          platform: "Instagram",
          handle: "@ranbir_mumbai_real",
          followers_count: 14200,
          following_count: 340,
          is_verified: true,
          status_flag: "PUBLIC_MONITORED",
          profile_url: "https://instagram.com/ranbir_mumbai_real"
        }
      ],
      recent_posts: [
        {
          post_id: "POST-TG-9821",
          platform: "Telegram",
          timestamp: "2026-03-15 02:10:00",
          content: "The shipment from the dock is clear. Move the consignments to warehouse #4 before dawn.",
          sentiment: "TACTICAL_INSTRUCTION",
          risk_level: "CRITICAL",
          likes: 12,
          shares: 4,
          hashtags: ["#logistics", "#southmumbai"],
          tagged_users: ["@teerth_b", "@vedant_p"],
          location_checkin: "Mazgaon Docks"
        }
      ]
    }
  ]
};

export const fallbackGeo: GeoPointsResponse = {
  total_points: 12,
  points: [
    {
      id: "GEO-01",
      lat: 18.9750,
      lng: 72.8340,
      title: "Byculla Station Road CCTV-9890",
      category: "CCTV",
      timestamp: "2026-03-14 14:30:00",
      details: "5 physical co-location encounters recorded between Md. Ranbir Bhalla and Md. Teerth Bhargava.",
      color: "#f59e0b"
    },
    {
      id: "GEO-02",
      lat: 18.9790,
      lng: 72.8365,
      title: "MH-TOWER-BYCULLA-04 Cell Tower",
      category: "TOWER",
      timestamp: "2026-03-15 01:45:00",
      details: "High-density nocturnal call hotspot (00:00-06:00 IST). 142 calls routed.",
      color: "#06b6d4"
    },
    {
      id: "GEO-03",
      lat: 18.9535,
      lng: 72.8315,
      title: "Zaveri Bazaar Angadia Cash Conduit",
      category: "FINANCIAL",
      timestamp: "2026-03-12 11:15:00",
      details: "INR 14.2 Crore hawala volume handled by Md. Gagan Rao.",
      color: "#10b981"
    },
    {
      id: "GEO-04",
      lat: 18.9610,
      lng: 72.8390,
      title: "Dongri Scrap Godown Reconnaissance",
      category: "SURVEILLANCE",
      timestamp: "2026-03-10 18:20:00",
      details: "AEC field patrol report filed by PSI R. Shinde. Panchnama conducted.",
      color: "#6366f1"
    }
  ]
};

// Dynamic CDR Comparison generator for any suspect pair
export function generateFallbackCDRComparison(suspectA: string, suspectB: string): CDRComparisonResponse {
  const seed = ((suspectA || "").length * 7 + (suspectB || "").length * 13) % 100;
  const totalDirect = ((seed % 15) + 3);
  const totalDuration = totalDirect * 4 + ((seed % 20) + 5);
  const nocturnalCount = Math.floor(totalDirect * 0.4);

  return {
    suspect_a: suspectA || "Md. Ranbir Bhalla",
    suspect_b: suspectB || "Md. Teerth Bhargava",
    direct_connection: {
      has_direct_calls: totalDirect > 0,
      total_calls: totalDirect,
      total_duration_min: totalDuration,
      nocturnal_calls: nocturnalCount,
      sms_count: Math.floor(totalDirect * 0.6),
      incoming_a_to_b: Math.ceil(totalDirect * 0.5),
      outgoing_a_to_b: Math.floor(totalDirect * 0.5)
    },
    shared_contacts: [
      {
        id: "INT-01",
        label: "Md. Vedant Padmanabhan",
        name: "Md. Vedant Padmanabhan",
        type: "PERSON",
        icon: "user",
        threat: 84.1,
        callsA: 24,
        callsB: 18,
        duration: 140,
        role: "Logistics Coordinator",
        details: "Common contact linking Byculla and Dongri networks"
      },
      {
        id: "INT-02",
        label: "Md. Pranit Arya",
        name: "Md. Pranit Arya",
        type: "PERSON",
        icon: "user",
        threat: 79.6,
        callsA: 16,
        callsB: 12,
        duration: 90,
        role: "Financial Courier",
        details: "Shared hawala courier"
      }
    ],
    left_contacts: [
      { id: "LC-01", label: "Suresh Hawala", name: "Suresh Hawala", type: "PERSON", icon: "user", threat: 68.0, callsA: 19, calls: 19, duration: 80, role: "Cash Conduit" }
    ],
    right_contacts: [
      { id: "RC-01", label: "Goa Dead-Drop Courier", name: "Goa Dead-Drop Courier", type: "PERSON", icon: "user", threat: 74.0, callsB: 22, calls: 22, duration: 110, role: "Narcotics Supply" }
    ],
    shared_cell_towers: [
      { tower_id: "MH-TOWER-BYCULLA-04", location: "Byculla", calls_a: 42, calls_b: 38, last_detected: "2026-03-15 01:45:00" }
    ]
  };
}

export const fallbackFinancialGraph = {
  total_nodes: 18,
  total_edges: 26,
  nodes: [
    { id: "Md. Ranbir Bhalla", label: "Md. Ranbir Bhalla", category: "SUSPECT", threat_score: 94.2, total_volume: 85000000 },
    { id: "Md. Gagan Rao", label: "Md. Gagan Rao (Hawala)", category: "HAWALA_OPERATOR", threat_score: 89.0, total_volume: 142000000 },
    { id: "Apex Horizon Trading LLP", label: "Apex Horizon Trading LLP", category: "SHELL_COMPANY", threat_score: 92.5, total_volume: 68000000 },
    { id: "BlueSea Marine Logistics Pvt Ltd", label: "BlueSea Marine Logistics Pvt Ltd", category: "SHELL_COMPANY", threat_score: 88.0, total_volume: 52000000 },
    { id: "Zaveri Bullion Angadia Hub", label: "Zaveri Bullion Angadia Hub", category: "ANGADIA_CONDUIT", threat_score: 95.0, total_volume: 210000000 }
  ],
  edges: [
    { source: "Md. Ranbir Bhalla", target: "Apex Horizon Trading LLP", amount: 45000000, transaction_count: 14, type: "SHELL_INJECTION" },
    { source: "Apex Horizon Trading LLP", target: "Md. Gagan Rao", amount: 42000000, transaction_count: 11, type: "HAWALA_CONVERSION" },
    { source: "Md. Gagan Rao", target: "Zaveri Bullion Angadia Hub", amount: 120000000, transaction_count: 28, type: "CASH_SETTLEMENT" }
  ]
};

export const fallbackLaunderingPatterns = {
  patterns: [
    {
      pattern_id: "PAT-PMLA-01",
      pattern_type: "Circular Round-Tripping (Layering)",
      confidence_score: 0.94,
      involved_entities: ["Md. Ranbir Bhalla", "Apex Horizon Trading LLP", "BlueSea Marine Logistics Pvt Ltd"],
      total_flow_amount: 92000000,
      description: "Automated cyclic fund transfer across 4 shell LLPs with zero commercial goods movement within a 48-hour settlement window."
    },
    {
      pattern_id: "PAT-PMLA-02",
      pattern_type: "Smurfing / Structured UPI Mule Deposits",
      confidence_score: 0.88,
      involved_entities: ["Md. Nihal Rana", "Student Mule Account Pool #4"],
      total_flow_amount: 34500000,
      description: "High-frequency micro-deposits (< INR 50,000) structured to evade FIU-IND CTR triggers, instantly swept into offshore crypto OTC desks."
    }
  ],
  total_flagged_volume: 126500000,
  high_risk_clusters_count: 5
};

export const fallbackFinancialCentrality = {
  top_volume_entities: [
    { entity_name: "Zaveri Bullion Angadia Hub", volume_inr: 210000000, category: "ANGADIA_CONDUIT" },
    { entity_name: "Md. Gagan Rao", volume_inr: 142000000, category: "HAWALA_OPERATOR" },
    { entity_name: "Md. Ranbir Bhalla", volume_inr: 85000000, category: "SUSPECT" }
  ],
  top_hub_entities: [
    { entity_name: "Md. Gagan Rao", in_degree: 18, out_degree: 22, total_degree: 40 },
    { entity_name: "Apex Horizon Trading LLP", in_degree: 12, out_degree: 14, total_degree: 26 }
  ]
};

export const fallbackPMLADossier = {
  entity_id: "ENT-PMLA-001",
  entity_name: "Md. Ranbir Bhalla / Apex Horizon Trading LLP",
  pmla_sections_invoked: ["PMLA 2002 Sec 3", "PMLA 2002 Sec 4", "IPC 120B", "IPC 420"],
  total_tainted_assets_inr: 85000000,
  attached_properties_count: 3,
  provisional_attachment_order: "PAO-ED-WZ-2026/041",
  bank_accounts_frozen: 8,
  shell_companies_linked: 4,
  adjudicating_authority_status: "Provisional Attachment Confirmed by PMLA Appellate Tribunal"
};

export const fallbackCourtEvidenceCertificate = {
  certificate_id: "CERT-65B-2026-089",
  entity_id: "SUSPECT-MB-001",
  entity_name: "Md. Ranbir Bhalla",
  timestamp: "2026-03-16T12:00:00+05:30",
  sha256_hash: "a4f8c1289de90382a87b64f912e7536d540212a4bb49e6f30a912634d588102a",
  court_case_number: "Special MCOCA Case No. 42/2026",
  issuing_authority: "Brihanmumbai Police Cyber & Financial Crime Forensic Unit",
  issuance_date: "16-MAR-2026",
  validity_period: "Perpetual / Admissible under Sec 65B Indian Evidence Act 1872 / BSA 2023 Sec 63",
  evidence_summary: "Forensically validated CDR call logs, geo-cell tower triangulation, and PMLA financial money trail records hash-sealed with SHA-256 cryptographic proof.",
  pg_number: 14,
  digital_signature: "DIGISIGN-MH-POLICE-FORENSIC-KEY-0091"
};

export const fallbackFinancialEntities = {
  total_entities: 48,
  categories: {
    SUSPECT: 10,
    HAWALA_OPERATOR: 8,
    SHELL_COMPANY: 16,
    ANGADIA_CONDUIT: 6,
    MULE_ACCOUNT: 8
  },
  all_entities: [
    { entity_id: "E-01", entity_name: "Md. Ranbir Bhalla", category: "SUSPECT", threat_score: 94.2 },
    { entity_id: "E-02", entity_name: "Md. Gagan Rao", category: "HAWALA_OPERATOR", threat_score: 89.0 },
    { entity_id: "E-03", entity_name: "Apex Horizon Trading LLP", category: "SHELL_COMPANY", threat_score: 92.5 },
    { entity_id: "E-04", entity_name: "Zaveri Bullion Angadia Hub", category: "ANGADIA_CONDUIT", threat_score: 95.0 }
  ]
};

export const fallbackSuspiciousPatterns = {
  patterns: [
    {
      type: "Coordinated Burner Activation",
      risk_level: "HIGH" as const,
      description: "Simultaneous 02:00 AM SIM activations across Byculla and Dongri towers matching known syndicate operational frequency.",
      suspects: ["Md. Ranbir Bhalla", "Md. Teerth Bhargava"],
      confidence: 0.92
    },
    {
      type: "Border Area IMSI Catcher Evasion",
      risk_level: "HIGH" as const,
      description: "Rapid cell tower handoff sequence observed along Coastal Road corridor avoiding fixed surveillance beacons.",
      suspects: ["Md. Pranit Arya"],
      confidence: 0.87
    }
  ],
  warnings: [
    "High probability of synchronized off-grid communication detected during 00:00-04:00 window.",
    "Encrypted VoIP relay proxy active across 3 identified IP ranges."
  ],
  analysis_timestamp: "2026-03-16T12:00:00+05:30"
};

export const fallbackIntelligenceInsights = {
  executive_summary: "Automated multi-source intelligence fusion indicates elevated syndicate mobilization in Southern Mumbai. Cross-domain correlations confirm synchronization between nocturnal CDR spikes, cash mule layering, and optical CCTV matches near high-value commercial targets.",
  top_critical_threats: fallbackLeaderboard.leaderboard.slice(0, 3),
  active_syndicates_count: 3,
  surveillance_hotspots: ["Byculla Station Road", "Dongri Market", "Zaveri Bazaar"],
  recommended_actions: [
    "Issue immediate Section 67 NDPS / Sec 50 PMLA summons to key shell LLP directors.",
    "Place 24/7 tactical field spotters on identified nocturnal transit corridor MH-TOWER-BYCULLA-04.",
    "Initiate freezing of 8 flagged mule accounts under PMLA Sec 17."
  ]
};
