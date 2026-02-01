from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional
import time
import requests

router = APIRouter()

class ProfessionalLicense(BaseModel):
    license_number: str # Cédula Profesional
    full_name: str
    profession: str # "MEDICO_CIRUJANO", "LICENCIADO_EN_DERECHO"
    institution: str

class VerificationResult(BaseModel):
    is_valid: bool
    status: str # "ACTIVE", "REVOKED", "NOT_FOUND"
    details: Optional[dict]
    verification_source: str = "SEP_RNP_API"

# Mock Database of Blacklisted Providers (SAT 69-B / Negligence)
BLACKLIST = ["12345678", "87654321"]

def audit_verification(license_data: ProfessionalLicense, result: VerificationResult):
    """
    Logs the verification attempt for audit trails (Compliance).
    """
    # In prod: write to immutable ledger
    print(f"AUDIT: Verified {license_data.license_number} - Result: {result.status}")

@router.post("/jurimed/verify-provider", response_model=VerificationResult)
async def verify_provider(license_data: ProfessionalLicense, background_tasks: BackgroundTasks):
    """
    Verifies a professional's credentials against the SEP Registry.
    Implements the '5.2 Procesos Críticos' requirement.
    """
    # 1. Internal Blacklist Check
    if license_data.license_number in BLACKLIST:
        return VerificationResult(is_valid=False, status="BLACKLISTED_RISK", details={"reason": "Safety Alert"})

    # 2. Mock External API Call to SEP (Registro Nacional de Profesionistas)
    # In production, this would scrape or use the official SEP API if available.
    # Simulating API latency
    # time.sleep(0.5) 
    
    # Simulation Logic
    if len(license_data.license_number) < 7:
         return VerificationResult(is_valid=False, status="INVALID_FORMAT", details=None)
    
    # Simulate Success
    result = VerificationResult(
        is_valid=True,
        status="ACTIVE",
        details={
            "year_issued": "2015",
            "type": "C1",
            "institution_validated": True
        }
    )
    
    # 3. Queue Background Audit Log
    background_tasks.add_task(audit_verification, license_data, result)
    
    return result

@router.post("/jurimed/cofepris-check")
def verify_cofepris_notice(notice_id: str):
    """
    Verifies the existence of a COFEPRIS Advertising Notice.
    Requirement 3.1: Regulación Sanitaria y Publicidad.
    """
    # Mock Validation
    if notice_id.startswith("COF-"):
        return {"valid": True, "status": "REGISTERED_AD"}
    return {"valid": False, "status": "MISSING_NOTICE"}
