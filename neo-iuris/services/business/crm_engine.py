import uuid
from datetime import datetime, timedelta

class CRMEngine:
    """
    Motor CRM Especializado en Derecho Sanitario.
    Entidades: Clientes, Registros Sanitarios, Responsables Sanitarios.
    """
    
    def __init__(self):
        # Mock Database
        self.clients = [
            {"id": "C-001", "name": "FarmaGlobal S.A. de C.V.", "tier": "SUPREMACY", "sector": "Pharma"},
            {"id": "C-002", "name": "Importadora MedTech", "tier": "PREMIUM", "sector": "Medical Devices"}
        ]
        self.assets = [
            {
                "id": "RS-2023-001", 
                "client_id": "C-001", 
                "type": "Registro Sanitario", 
                "molecule": "Paracetamol 500mg",
                "authority": "COFEPRIS",
                "issue_date": "2021-05-20",
                "expiry_date": "2026-05-20",
                "status": "ACTIVE"
            },
            {
                "id": "AV-2024-999", 
                "client_id": "C-002", 
                "type": "Aviso de Funcionamiento", 
                "facility_type": "Almacén con Acondicionamiento",
                "authority": "COFEPRIS",
                "issue_date": "2024-01-15",
                "status": "ACTIVE"
            }
        ]

    def get_dashboard_metrics(self):
        """Calcula métricas clave para el tablero de control."""
        total_assets = len(self.assets)
        expiring_soon = sum(1 for a in self.assets if self._is_expiring(a["expiry_date"]))
        active_clients = len(self.clients)
        
        return {
            "total_assets": total_assets,
            "expiring_90_days": expiring_soon,
            "active_clients": active_clients,
            "compliance_health": "98%"
        }

    def _is_expiring(self, date_str, days=365): # High alert for sanitary items
        if not date_str: return False
        exp = datetime.strptime(date_str, "%Y-%m-%d")
        delta = exp - datetime.now()
        return 0 < delta.days < days

    def get_client_portfolio(self, client_id):
        client = next((c for c in self.clients if c["id"] == client_id), None)
        if not client: return None
        
        assets = [a for a in self.assets if a["client_id"] == client_id]
        return {
            "profile": client,
            "regulatory_assets": assets,
            "opportunities": self._analyze_opportunities(assets)
        }

    def _analyze_opportunities(self, assets):
        """Detecta oportunidades de venta cruzada basadas en activos."""
        opps = []
        for a in assets:
            if a["type"] == "Registro Sanitario" and self._is_expiring(a["expiry_date"], days=600):
                opps.append(f"Iniciar Prórroga para {a['molecule']} (Vence en <2 años)")
            if a["type"] == "Aviso de Funcionamiento":
                opps.append(f"Auditoría de Buenas Prácticas (NOM-059) sugerida para almacén.")
        return opps

if __name__ == "__main__":
    crm = CRMEngine()
    print(crm.get_dashboard_metrics())
    print(crm.get_client_portfolio("C-001"))
