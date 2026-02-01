import random

class AIGeneralCounsel:
    """
    EJE C.1: AI General Counsel (Consejero Autónomo).
    Toma y ejecuta decisiones de bajo riesgo de forma autónoma.
    """
    def __init__(self, autonomy_level="LOW_RISK_ONLY"):
        self.autonomy = autonomy_level
        self.decision_log = []

    def evaluate_request(self, request):
        """
        Evalúa una solicitud legal y decide si actuar autónomamente.
        """
        print(f"AI GC Evaluating: {request}")
        risk_score = self._calculate_risk(request)
        
        if risk_score < 0.3: # Low Risk
            decision = "APPROVED_AUTO_EXECUTE"
            action = self._execute_action(request)
        else:
            decision = "ESCALATE_TO_HUMAN"
            action = "NOTIFY_PARTNER"
            
        self.decision_log.append({"req": request, "risk": risk_score, "decision": decision})
        return {"decision": decision, "action": action, "risk_score": risk_score}

    def _calculate_risk(self, request):
        # Mock logic: simple contract reviews are low risk
        if "NDA" in request["type"] or "Review" in request["type"]:
            return 0.1
        if "Litigation" in request["type"]:
            return 0.9
        return 0.5

    def _execute_action(self, request):
        return f"EXECUTED: Signed {request['id']} with PQC Key."

if __name__ == "__main__":
    gc = AIGeneralCounsel()
    print(gc.evaluate_request({"id": "DOC-001", "type": "Standard NDA Review"}))
    print(gc.evaluate_request({"id": "DOC-002", "type": "Class Action Litigation"}))
