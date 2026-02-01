class IsoAuditor:
    """
    Sanitary Engineering & Environmental Auditor.
    
    Category: 6. INGENIERÍA SANITARIA
    Objective: Verify compliance with ISO 14001 (Environment) and ISO 46001 (Water).
    """

    def __init__(self):
        self.standards = {
            "ISO14001": ["environmental_policy", "risk_register", "legal_requirements", "operational_control"],
            "ISO46001": ["water_balance", "efficiency_indicators", "leak_detection"]
        }

    def audit_facility(self, facility_data, standard="ISO14001"):
        """
        Conducts a digital gap analysis against the specified standard.
        """
        if standard not in self.standards:
            return {"error": "Unknown Standard"}
            
        required_docs = self.standards[standard]
        missing_docs = [doc for doc in required_docs if doc not in facility_data.get('documents', [])]
        
        metrics = facility_data.get('metrics', {})
        score = 100
        
        # Logic for deduction
        if missing_docs:
            score -= (20 * len(missing_docs))
            
        # Specific ISO 46001 logic
        if standard == "ISO46001":
            if metrics.get('water_loss_percentage', 0) > 10:
                score -= 15 # Penalty for high water loss
                
        # Specific ISO 14001 logic
        if standard == "ISO14001":
            if metrics.get('hazardous_waste_compliance') == False:
                score = 0 # Critical Failure
                
        status = "CERTIFIABLE" if score >= 85 else "NON_CONFORMANT"
        
        return {
            "standard": standard,
            "score": max(score, 0),
            "status": status,
            "missing_documentation": missing_docs
        }

if __name__ == "__main__":
    auditor = IsoAuditor()
    
    # Simulation Data: A Water Treatment Plant
    facility = {
        "name": "Planta Tratadora Norte",
        "documents": ["water_balance", "leak_detection"], # Missing 'efficiency_indicators'
        "metrics": {
            "water_loss_percentage": 5
        }
    }
    
    result = auditor.audit_facility(facility, "ISO46001")
    print(f"Audit Result: {result}")
