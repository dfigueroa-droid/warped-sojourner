from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import datetime
import uuid

router = APIRouter()

class CaseEvent(BaseModel):
    case_id: str
    event_type: str # UPLOAD, VIEW, EDIT, AI_ANALYSIS
    actor: str
    details: str
    timestamp: str = None

EVENT_LOG = []

@router.post("/tracking/log")
def log_event(event: CaseEvent):
    event.timestamp = datetime.datetime.now().isoformat()
    # In production, this would go to Kafka / Immutable Ledger
    EVENT_LOG.append(event.dict())
    return {"status": "LOGGED", "id": str(uuid.uuid4())}

@router.get("/tracking/history/{case_id}")
def get_history(case_id: str):
    return [e for e in EVENT_LOG if e["case_id"] == case_id]

@router.get("/tracking/audit/full")
def full_audit():
    """Returns a full dump for forensic audit."""
    return {"total_events": len(EVENT_LOG), "log": EVENT_LOG}
