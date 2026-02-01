import re
from typing import List, Dict

class RuleGenEngine:
    """
    EJE A.1: Metamodelado Legal y Generación de Lógica.
    Convierte texto legislativo en reglas computables.
    """
    def __init__(self):
        self.rules_db = []

    def ingest_legislation(self, text: str, jurisdiction: str) -> List[Dict]:
        """
        Parsea texto legal crudo y extrae reglas lógicas.
        """
        print(f"[{jurisdiction}] Ingesting Legislation...")
        
        # Simulación de un LLM parseando entidades y condiciones
        new_rules = []
        
        # Patrón simple de ejemplo: "SI [Condicion] ENTONCES [Obligacion]"
        if "SI" in text and "ENTONCES" in text:
            conditions = self._extract_conditions(text)
            obligations = self._extract_obligations(text)
            
            rule = {
                "id": f"RULE-{jurisdiction}-{len(self.rules_db)+1}",
                "jurisdiction": jurisdiction,
                "conditions": conditions,
                "obligation": obligations,
                "status": "PROPOSED_BY_AI"
            }
            new_rules.append(rule)
            self.rules_db.append(rule)
            
        return new_rules

    def _extract_conditions(self, text):
        # Mock NLP logic
        return ["Entidad es Farmacia", "Tiene Licencia tipo A"]

    def _extract_obligations(self, text):
        # Mock NLP logic
        return "Renovar aviso en 30 dias"

    def approve_rule(self, rule_id):
        """HITL Validation step."""
        for r in self.rules_db:
            if r["id"] == rule_id:
                r["status"] = "ACTIVE"
                return True
        return False

if __name__ == "__main__":
    engine = RuleGenEngine()
    ley_texto = "ARTICULO 1: SI una entidad es Farmacia y Tiene Licencia tipo A, ENTONCES Renovar aviso en 30 dias."
    generated = engine.ingest_legislation(ley_texto, "MX_COFEPRIS")
    print(f"Reglas Generadas: {generated}")
