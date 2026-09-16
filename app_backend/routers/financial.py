from datetime import datetime
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Body, Query, HTTPException, Depends
from pydantic import BaseModel
from app_backend.dependencies import get_engine
from intelligence_engine import IntelligenceEngine
from app_backend.schemas.financial import FinancialIntelligenceResponse
from app_backend.services import financial_service

router = APIRouter(prefix="/api/financial", tags=["Financial Intelligence & PMLA"])

# ---------------------------------------------------------
# Core Intelligence & PMLA Graph Endpoints
# ---------------------------------------------------------

@router.get("/summary", response_model=FinancialIntelligenceResponse, summary="Get summary of financial transactions and suspect risk roster")
def get_financial_summary(engine: IntelligenceEngine = Depends(get_engine)):
    return financial_service.get_financial_intelligence(engine)

@router.get("/graph", summary="Export multi-entity directed financial graph")
def get_financial_graph(
    focus_entity: Optional[str] = Query(None, description="Center graph on a specific entity ID or name"),
    max_nodes: int = Query(150, description="Max nodes to include")
):
    return financial_service.get_financial_graph(focus_entity=focus_entity, max_nodes=max_nodes)

@router.get("/patterns", summary="Detect advanced money laundering patterns (Layering, Smurfing, Loops, Hawala)")
def get_laundering_patterns():
    return financial_service.get_laundering_patterns()

@router.get("/centrality", summary="Get PageRank and financial influence centrality rankings")
def get_financial_centrality():
    return financial_service.get_financial_centrality()

@router.get("/trace", summary="Trace multi-hop financial flows originating from source entity")
def trace_financial_flow(
    source: str = Query(..., description="Source entity ID or Name"),
    target: Optional[str] = Query(None, description="Optional destination entity ID or Name"),
    max_depth: int = Query(5, description="Maximum traversal hop depth")
):
    return financial_service.trace_financial_flow(source=source, target=target, max_depth=max_depth)

@router.get("/dossier/{entity_id}", summary="Get deep PMLA entity profile, bank accounts, and asset attachments")
def get_pmla_entity_dossier(entity_id: str):
    dossier = financial_service.get_pmla_dossier(entity_id)
    if not dossier or dossier.get("status") == "error":
        raise HTTPException(status_code=404, detail=f"Entity '{entity_id}' not found in registry")
    return dossier

@router.get("/court-certificate/{entity_id}", summary="Generate Section 63/65B BSA Tamper-Evident Evidence Certificate")
def get_court_evidence_certificate(entity_id: str):
    cert = financial_service.get_court_evidence_certificate(entity_id)
    if not cert or cert.get("status") == "error":
        raise HTTPException(status_code=404, detail=f"Entity '{entity_id}' not found in registry")
    return cert

@router.get("/entities", summary="Get all registered financial entities grouped by category")
def get_financial_entities():
    return financial_service.get_all_entities()


# ---------------------------------------------------------
# Investigator Notes Endpoints
# ---------------------------------------------------------

# In-memory store for notes (in production, this would be a database)
_investigator_notes = {
    "transactions": {},  # transaction_id -> list of notes
    "entities": {},      # entity_id -> list of notes
    "cases": {}          # fir_number -> list of notes
}

class Note(BaseModel):
    """A note added by an investigator."""
    id: str
    author: str
    content: str
    timestamp: str = datetime.now().isoformat()
    is_active: bool = True

class NoteCreate(BaseModel):
    """Request to create a new note."""
    author: str
    content: str

@router.post("/notes/transaction/{transaction_id}", response_model=Note,
             summary="Add a note to a financial transaction")
def add_transaction_note(
    transaction_id: str,
    note_request: NoteCreate = Body(...)
):
    """Add an investigator note to a specific transaction."""
    note_id = f"note_{len(_investigator_notes['transactions'].get(transaction_id, [])) + 1}_{int(datetime.now().timestamp())}"
    note = Note(
        id=note_id,
        author=note_request.author,
        content=note_request.content
    )

    if transaction_id not in _investigator_notes["transactions"]:
        _investigator_notes["transactions"][transaction_id] = []

    _investigator_notes["transactions"][transaction_id].append(note.dict())
    return note

@router.get("/notes/transaction/{transaction_id}", response_model=List[Note],
            summary="Get all notes for a financial transaction")
def get_transaction_notes(
    transaction_id: str,
    include_inactive: bool = Query(False, description="Include inactive/deleted notes")
):
    """Get all notes for a specific transaction."""
    notes = _investigator_notes["transactions"].get(transaction_id, [])
    if not include_inactive:
        notes = [note for note in notes if note.get("is_active", True)]
    return [Note(**note) for note in notes]

@router.delete("/notes/transaction/{transaction_id}/{note_id}",
               summary="Delete (deactivate) a note on a financial transaction")
def delete_transaction_note(
    transaction_id: str,
    note_id: str
):
    """Delete (deactivate) a specific note on a transaction."""
    if transaction_id in _investigator_notes["transactions"]:
        for note in _investigator_notes["transactions"][transaction_id]:
            if note["id"] == note_id:
                note["is_active"] = False
                return {"success": True, "message": "Note deactivated"}
    raise HTTPException(status_code=404, detail="Note not found")