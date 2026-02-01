from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional, List
import uuid
import datetime

# Mock Imports (In prod, these would be Stripe/OpenPay SDKs)
# from stripe import PaymentIntent, Transfer

router = APIRouter()

class ServiceOrder(BaseModel):
    client_id: str
    lawyer_id: str
    service_type: str # "DIVORCIO_EXPRESS", "CONSULTA_MERCANTIL"
    agreed_price: float
    description: str

class PaymentStatus(BaseModel):
    transaction_id: str
    status: str # "ESCROW_HELD", "RELEASED", "DISPUTED", "REFUNDED"
    escrow_amount: float
    platform_commission: float
    net_payout: float

# Transaction Ledger (Mock DB)
LEDGER = {}

@router.post("/marketplace/transaction/create-escrow")
def create_escrow_transaction(order: ServiceOrder):
    """
    Initiates payment. Funds are captured but NOT released to Lawyer.
    Requirement: '4. Ingeniería Financiera - Escrow'.
    """
    tx_id = str(uuid.uuid4())
    
    # 1. Validate Lawyer Eligibility (Check if active/verified)
    # verify_provider(order.lawyer_id)

    # 2. Calculate Commission (Dynamic or Fixed?)
    commission_rate = 0.15 # 15% Take Rate (Report Section 8.1)
    commission = order.agreed_price * commission_rate
    
    # 3. Create Record
    tx_record = {
        "id": tx_id,
        "client": order.client_id,
        "lawyer": order.lawyer_id,
        "total": order.agreed_price,
        "commission": commission,
        "status": "ESCROW_HELD",
        "created_at": datetime.datetime.now().isoformat()
    }
    LEDGER[tx_id] = tx_record

    return {"status": "SUCCESS", "tx_id": tx_id, "message": "Funds secured in Escrow."}

@router.post("/marketplace/transaction/release-funds")
def release_funds(tx_id: str, evidence_token: str):
    """
    Releases funds to lawyer after service confirmation (e.g. uploaded 'Acuse de Demanda').
    """
    tx = LEDGER.get(tx_id)
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")

    if tx["status"] != "ESCROW_HELD":
        raise HTTPException(status_code=400, detail="Funds not in Escrow state")

    # 1. Log Evidence
    print(f"Evidence {evidence_token} accepted for TX {tx_id}")

    # 2. Trigger Payout (Mock Stripe Transfer)
    payout_amount = tx["total"] - tx["commission"]
    
    # 3. Update Status
    tx["status"] = "RELEASED"
    tx["payout_timestamp"] = datetime.datetime.now().isoformat()
    
    # 4. Trigger Fiscal Invoice Generation (Facturapi)
    # background_tasks.add_task(generate_invoices, tx)

    return {"status": "RELEASED", "payout_amount": payout_amount}

@router.post("/marketplace/transaction/dispute")
def raise_dispute(tx_id: str, reason: str):
    """
    Freezes funds if client is unhappy. Triggers Mediation Agent.
    """
    tx = LEDGER.get(tx_id)
    if tx:
        tx["status"] = "DISPUTED"
        return {"status": "FROZEN", "ticket_id": str(uuid.uuid4())}
    return {"status": "ERROR"}
