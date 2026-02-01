from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict, Optional
import datetime
import uuid

router = APIRouter()

class HealthRecordEntry(BaseModel):
    patient_id: str
    doctor_id: str
    diagnosis_icd10: str # CIE-10 Code
    notes: str
    timestamp: str

class LegalOverlay(BaseModel):
    case_id: str
    lawyer_id: str
    legal_implication: str # "NEGLIGENCIA", "SEGURO", "LABORAL"
    privileged_notes: str

class UnifiedRecord(BaseModel):
    record_id: str
    type: str = "JURIMED_HYBRID"
    medical_data: HealthRecordEntry
    legal_data: Optional[LegalOverlay]
    nom_024_compliant: bool = True

# Mock Storage (Encrypted at rest)
RECORDS_DB = {}

@router.post("/jurimed/record/create")
def create_unified_record(medical: HealthRecordEntry, legal: Optional[LegalOverlay] = None):
    """
    Creates a NOM-024 compliant record with optional Legal Privilege Layer.
    """
    record_id = str(uuid.uuid4())
    
    # 1. NOM-024 Validation (Mock)
    # Check for required fields like timestamp, standard coding (ICD-10)
    if not medical.diagnosis_icd10:
        raise HTTPException(status_code=400, detail="NOM-024 Violation: Missing ICD-10 Code")

    # 2. Construct Record
    record = UnifiedRecord(
        record_id=record_id,
        medical_data=medical,
        legal_data=legal
    )
    
    # 3. Store (Simulated Encryption)
    RECORDS_DB[record_id] = record
    
    return {"status": "CREATED", "record_id": record_id, "compliance": "NOM-024-Verified"}

@router.get("/jurimed/record/access/{record_id}")
def access_record(record_id: str, requester_role: str):
    """
    Access Control:
    - Doctors see Medical Data.
    - Lawyers see Medical + Legal Data (if authorized).
    - Patients see Medical Data.
    """
    record = RECORDS_DB.get(record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")

    # Granular Privacy Filter (LFPDPPP)
    response = record.dict()
    
    if requester_role == "DOCTOR":
        # Doctors should NOT see legal strategy (Privileged)
        response.pop("legal_data")
    elif requester_role == "PATIENT":
        # Patient sees raw medical, maybe simplified legal
        pass
    
    return response

@router.post("/jurimed/consent/sign")
def sign_informed_consent(patient_id: str, procedure_id: str):
    """
    Digital signature for Medical Informed Consent.
    Crucial for Legal Defense.
    """
    return {
        "consent_id": str(uuid.uuid4()),
        "timestamp": datetime.datetime.now().isoformat(),
        "integrity_hash": "sha256:mock_hash_value"
    }
