"""
app_backend/routers/criminal_history.py
----------------------------------------
Endpoints for Module 10: Master Criminal History & Prior Convictions Database
"""

from fastapi import APIRouter, Depends, Query, HTTPException
from typing import Dict, Any, List, Optional
from pydantic import BaseModel
from intelligence_engine import IntelligenceEngine
from app_backend.dependencies import get_engine

router = APIRouter(prefix="/api/criminal-history", tags=["Criminal History Database"])

class CriminalRecord(BaseModel):
    uidb_number: str
    fir_number: str
    suspect_name: str
    known_aliases: str
    prior_convictions_count: int
    previous_ps_name: str
    previous_offence: str
    act_and_sections: Optional[str] = "N/A"
    modus_operandi: Optional[str] = "N/A"
    mob_number: Optional[str] = "N/A"
    crime_category: Optional[str] = "ORGANIZED_CRIME"
    custody_location: Optional[str] = "N/A"
    case_year: str
    case_status: str

class CriminalHistorySummaryResponse(BaseModel):
    total_records: int
    repeat_offenders_count: int
    under_trial_count: int
    bailed_count: int
    disposed_count: int
    clean_records_count: int
    offence_breakdown: Dict[str, int]
    police_station_breakdown: Dict[str, int]
    crime_category_breakdown: Dict[str, int] = {}
    top_repeat_offenders: List[CriminalRecord]

class CriminalRecordsListResponse(BaseModel):
    total_count: int
    filtered_count: int
    records: List[CriminalRecord]

@router.get("/summary", response_model=CriminalHistorySummaryResponse, summary="Get high-level KPIs and breakdown of criminal history records")
def get_criminal_history_summary(engine: IntelligenceEngine = Depends(get_engine)):
    df = engine.crim_df
    if df is None or df.empty:
        raise HTTPException(status_code=404, detail="Criminal history database not loaded")

    records: List[CriminalRecord] = []
    for _, r in df.iterrows():
        records.append(CriminalRecord(
            uidb_number=str(r.get("uidb_number", "N/A")),
            fir_number=str(r.get("fir_number", "N/A")),
            suspect_name=str(r.get("suspect_name", "Unknown")),
            known_aliases=str(r.get("known_aliases", "N/A")),
            prior_convictions_count=int(r.get("prior_convictions_count", 0)),
            previous_ps_name=str(r.get("previous_ps_name", "N/A")),
            previous_offence=str(r.get("previous_offence", "None")),
            act_and_sections=str(r.get("act_and_sections", "N/A")),
            modus_operandi=str(r.get("modus_operandi", "N/A")),
            mob_number=str(r.get("mob_number", "N/A")),
            crime_category=str(r.get("crime_category", "ORGANIZED_CRIME")),
            custody_location=str(r.get("custody_location", "N/A")),
            case_year=str(r.get("case_year", "N/A")),
            case_status=str(r.get("case_status", "Unknown"))
        ))

    repeat_offenders = [r for r in records if r.prior_convictions_count > 0]
    under_trial = [r for r in records if "trial" in r.case_status.lower() or "custody" in r.case_status.lower()]
    bailed = [r for r in records if "bail" in r.case_status.lower()]
    disposed = [r for r in records if "disposed" in r.case_status.lower() or "convicted" in r.case_status.lower()]
    clean = [r for r in records if "clean" in r.case_status.lower() or r.prior_convictions_count == 0]

    # Offence breakdown
    offence_counts: Dict[str, int] = {}
    for r in records:
        off = r.previous_offence
        if off and off != "None" and off != "N/A":
            offence_counts[off] = offence_counts.get(off, 0) + 1

    # Police station breakdown
    ps_counts: Dict[str, int] = {}
    for r in records:
        ps = r.previous_ps_name
        if ps and ps != "N/A":
            ps_counts[ps] = ps_counts.get(ps, 0) + 1

    # Crime category breakdown
    cat_counts: Dict[str, int] = {}
    for r in records:
        cat = r.crime_category
        if cat and cat != "CLEAN":
            cat_counts[cat] = cat_counts.get(cat, 0) + 1

    # Top repeat offenders sorted by prior convictions
    sorted_repeat = sorted(repeat_offenders, key=lambda x: x.prior_convictions_count, reverse=True)[:10]

    return CriminalHistorySummaryResponse(
        total_records=len(records),
        repeat_offenders_count=len(repeat_offenders),
        under_trial_count=len(under_trial),
        bailed_count=len(bailed),
        disposed_count=len(disposed),
        clean_records_count=len(clean),
        offence_breakdown=offence_counts,
        police_station_breakdown=ps_counts,
        crime_category_breakdown=cat_counts,
        top_repeat_offenders=sorted_repeat
    )

@router.get("/records", response_model=CriminalRecordsListResponse, summary="Query and filter master criminal history records")
def get_criminal_records(
    search: Optional[str] = None,
    case_status: str = "ALL",
    police_station: str = "ALL",
    crime_category: str = "ALL",
    min_convictions: int = 0,
    engine: IntelligenceEngine = Depends(get_engine)
):
    df = engine.crim_df
    if df is None or df.empty:
        raise HTTPException(status_code=404, detail="Criminal history database not loaded")

    all_records: List[CriminalRecord] = []
    for _, r in df.iterrows():
        all_records.append(CriminalRecord(
            uidb_number=str(r.get("uidb_number", "N/A")),
            fir_number=str(r.get("fir_number", "N/A")),
            suspect_name=str(r.get("suspect_name", "Unknown")),
            known_aliases=str(r.get("known_aliases", "N/A")),
            prior_convictions_count=int(r.get("prior_convictions_count", 0)),
            previous_ps_name=str(r.get("previous_ps_name", "N/A")),
            previous_offence=str(r.get("previous_offence", "None")),
            act_and_sections=str(r.get("act_and_sections", "N/A")),
            modus_operandi=str(r.get("modus_operandi", "N/A")),
            mob_number=str(r.get("mob_number", "N/A")),
            crime_category=str(r.get("crime_category", "ORGANIZED_CRIME")),
            custody_location=str(r.get("custody_location", "N/A")),
            case_year=str(r.get("case_year", "N/A")),
            case_status=str(r.get("case_status", "Unknown"))
        ))

    filtered = all_records

    if search and search.strip():
        q = search.strip().lower()
        filtered = [
            r for r in filtered
            if q in r.suspect_name.lower() or
               q in r.known_aliases.lower() or
               q in r.uidb_number.lower() or
               q in r.fir_number.lower() or
               q in r.previous_offence.lower() or
               q in r.previous_ps_name.lower() or
               q in (r.act_and_sections or "").lower() or
               q in (r.modus_operandi or "").lower() or
               q in (r.mob_number or "").lower()
        ]

    if case_status and case_status.upper() != "ALL":
        cs_q = case_status.lower()
        filtered = [r for r in filtered if cs_q in r.case_status.lower()]

    if police_station and police_station.upper() != "ALL":
        filtered = [r for r in filtered if r.previous_ps_name.lower() == police_station.lower()]

    if crime_category and crime_category.upper() != "ALL":
        filtered = [r for r in filtered if (r.crime_category or "").lower() == crime_category.lower()]

    if min_convictions and min_convictions > 0:
        filtered = [r for r in filtered if r.prior_convictions_count >= min_convictions]

    return CriminalRecordsListResponse(
        total_count=len(all_records),
        filtered_count=len(filtered),
        records=filtered
    )
