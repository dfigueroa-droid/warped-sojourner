from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict

router = APIRouter()

class TransactionRequest(BaseModel):
    amount: float
    provider_type: str # "MEDICO", "ABOGADO"
    provider_rfc_registered: bool # Do we have their RFC?

class FiscalCalculation(BaseModel):
    total_charged: float
    platform_fee: float # Technology Fee (Not Commission)
    provider_payout: float
    sat_retention_isr: float
    sat_retention_iva: float
    notes: str

PLATFORM_TECH_FEE_PERCENT = 0.10 # 10% Service Fee for Technology
IVA_RATE = 0.16

@router.post("/jurimed/fiscal/calculate-split")
def calculate_transaction_split(tx: TransactionRequest):
    """
    Calculates the distribution of funds complying with SAT 'Plataformas Digitales'.
    Ensures NO Fee-Splitting (Dicotomía) primarily by characterizing fee as 'Tech Service'.
    """
    
    # 1. Calculate Platform Revenue (Tech Fee)
    tech_fee = tx.amount * PLATFORM_TECH_FEE_PERCENT
    # Platform must charge IVA on its fee
    tech_fee_iva = tech_fee * IVA_RATE 
    total_platform_deduction = tech_fee + tech_fee_iva

    # 2. SAT Retentions (Plataformas Tecnológicas)
    # If RFC is NOT registered, retention is punitive (20% ISR, 16% IVA)
    # If RFC IS registered, retention is standard (1% ISR, 8% IVA) - Simplified for example
    
    if tx.provider_rfc_registered:
        retention_isr_rate = 0.01
        retention_iva_rate = 0.08 # 50% of IVA
    else:
        retention_isr_rate = 0.20
        retention_iva_rate = 0.16 # 100% of IVA

    subtotal_provider = tx.amount - total_platform_deduction
    
    retention_isr = tx.amount * retention_isr_rate
    retention_iva = tx.amount * retention_iva_rate
    
    payout = tx.amount - total_platform_deduction - retention_isr - retention_iva

    return FiscalCalculation(
        total_charged=tx.amount,
        platform_fee=total_platform_deduction,
        provider_payout=round(payout, 2),
        sat_retention_isr=round(retention_isr, 2),
        sat_retention_iva=round(retention_iva, 2),
        notes="Retentions calculated based on RMF 2024 for Digital Platforms."
    )
