import datetime

class ContractEngine:
    """
    Laboratorio de Contratos (Classic Legal Lab).
    
    Function: Automated generation and review of legal documents.
    Templates: 
    - Prestación de Servicios Profesionales Médicos
    - NDA (Non-Disclosure Agreement)
    - Consentimiento Informado
    """

    def __init__(self):
        self.templates = {
            "NDA": "CONVENIO DE CONFIDENCIALIDAD QUE CELEBRAN POR UNA PARTE {parte_a} Y POR LA OTRA {parte_b}...",
            "MED_SERVICE": "CONTRATO DE PRESTACIÓN DE SERVICIOS MÉDICOS QUE CELEBRAN EL DR. {medico} Y EL PACIENTE {paciente}..."
        }

    def generate_contract(self, contract_type, data):
        """
        Generates a contract based on a template and input data.
        """
        if contract_type not in self.templates:
            return {"error": "Template not found"}
            
        template = self.templates[contract_type]
        try:
            draft = template.format(**data)
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            return {
                "status": "DRAFT_GENERATED",
                "type": contract_type,
                "content_preview": draft[:100] + "...",
                "generated_at": timestamp
            }
        except KeyError as e:
            return {"error": f"Missing data field: {str(e)}"}

    def review_clause(self, clause_text):
        """
        Basic NLP simulation to detect risky clauses.
        """
        risks = []
        if "renuncia a demandar" in clause_text.lower():
            risks.append("CRITICAL: Waiver of rights detected (Null & Void risk).")
        
        if "jurisdicción exclusiva en singapur" in clause_text.lower():
            risks.append("WARNING: Foreign jurisdiction detected.")

        return {
            "risk_level": "HIGH" if risks else "LOW",
            "flags": risks
        }

if __name__ == "__main__":
    engine = ContractEngine()
    data = {"parte_a": "HOSPITAL GENERAL", "parte_b": "PROVEEDOR S.A."}
    print(engine.generate_contract("NDA", data))
