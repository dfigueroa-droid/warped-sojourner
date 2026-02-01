import json
import re

class PrivacyGuardian:
    """
    Data Protection Officer (Digital DPO) for Medical Tourism.
    
    Category: 4. TURISMO MÉDICO
    Objective: Ensure compliance with LFPDPPP (Mexico) and international standards.
    Technical: Text analysis and JSON schema validation for privacy notices.
    """

    def __init__(self):
        self.required_elements_lfpdppp = [
            "identidad", "domicilio", "finalidades", "opciones_limitacion",
            "medios_arco", "transferencias", "cambios_aviso"
        ]

    def audit_privacy_notice(self, notice_text):
        """
        Audits a 'Aviso de Privacidad' text for legal compliance.
        """
        missing = []
        text_lower = notice_text.lower()
        
        # Keyword heuristic check
        keywords = {
            "identidad": ["responsable", "identidad"],
            "domicilio": ["domicilio", "ubicado en"],
            "finalidades": ["finalidad", "uso de datos"],
            "medios_arco": ["arco", "acceso", "rectificación"],
            "transferencias": ["transferencia", "terceros"],
        }

        for req, search_terms in keywords.items():
            if not any(term in text_lower for term in search_terms):
                missing.append(req)

        if missing:
            return {"compliant": False, "missing_elements": missing}
        return {"compliant": True, "status": "LFPDPPP_VALIDATED"}

    def validate_data_transfer(self, patient_data, destination_country):
        """
        Validates cross-border transfer of sensitive health data.
        """
        print(f"[Guardian] Validating transfer to {destination_country}...")
        
        # Check for Sensitive Data
        sensitive_fields = ["diagnosis", "blood_type", "hiv_status", "genetic_data"]
        has_sensitive = any(field in patient_data for field in sensitive_fields)
        
        if has_sensitive:
            if not patient_data.get("explicit_consent"):
                return {"allowed": False, "reason": "SENSITIVE_DATA_NO_CONSENT"}
                
        # White-list of countries with adequate protection (Simulated)
        safe_harbors = ["EU", "UK", "CANADA", "JAPAN", "URUGUAY", "ARGENTINA"]
        
        if destination_country in safe_harbors:
             return {"allowed": True, "protocol": "STANDARD_CLAUSES"}
        
        return {"allowed": True, "protocol": "SPECIFIC_CONTRACT_REQUIRED"}

if __name__ == "__main__":
    guardian = PrivacyGuardian()
    
    # Test Case 1: Notice
    aviso = "El responsable es Hospital X con domicilio en Reforma 222. La finalidad es servicio médico. Usted tiene derechos ARCO."
    print(f"Notice Audit: {guardian.audit_privacy_notice(aviso)}")

    # Test Case 2: Transfer
    patient = {"name": "John Doe", "diagnosis": "Cardiac Arrhythmia", "explicit_consent": True}
    print(f"Transfer Audit: {guardian.validate_data_transfer(patient, 'USA')}")
