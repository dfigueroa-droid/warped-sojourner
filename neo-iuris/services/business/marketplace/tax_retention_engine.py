from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ProviderTaxProfile(BaseModel):
    rfc: str
    is_resico: bool = False
    monthly_income: float = 0.0

class RetentionScenario(BaseModel):
    transaction_amount: float
    retention_isr: float
    retention_iva: float
    net_deposit: float
    rule_applied: str

SAT_RULES_2025 = {
    "PUNITIVE": {"isr": 0.20, "iva": 0.16}, # No RFC
    "STANDARD": {"isr": 0.01, "iva": 0.08}, # 50% IVA retention
    "RESICO": {"isr": 0.01, "iva": 0.0} # RESICO sometimes exempts retention if proper constancia provided (simplified)
}

@router.post("/marketplace/tax/calculate-retention", response_model=RetentionScenario)
def calculate_sat_retention(amount: float, profile: ProviderTaxProfile):
    """
    Calculates ISR/IVA Retentions for Digital Platforms (Art. 113-A LISR).
    """
    
    # 1. Validation: Is RFC Valid? (Length check used as mock)
    if len(profile.rfc) < 12:
        rule = "PUNITIVE"
        rates = SAT_RULES_2025["PUNITIVE"]
    elif profile.is_resico:
         # RESICO logic is complex, often platform still retains unless strict exemption proved.
         # For safety, defaulting to Standard Platform Rule usually safer.
         rule = "STANDARD_RESICO_SAFEGUARD"
         rates = SAT_RULES_2025["STANDARD"]
    else:
        rule = "STANDARD"
        rates = SAT_RULES_2025["STANDARD"]

    # 2. Calculate
    ret_isr = amount * rates["isr"]
    ret_iva = amount * rates["iva"]
    
    net = amount - ret_isr - ret_iva
    
    return RetentionScenario(
        transaction_amount=amount,
        retention_isr=round(ret_isr, 2),
        retention_iva=round(ret_iva, 2),
        net_deposit=round(net, 2),
        rule_applied=rule
    )

@router.get("/marketplace/tax/generate-constancia")
def generate_monthly_constancia(lawyer_id: str, month: str):
    """
    Mock generation of XML 'Constancia de Retenciones' required by SAT.
    """
    return {"status": "GENERATED", "xml_url": f"https://s3.neoiuris/constancias/{lawyer_id}_{month}.xml"}
