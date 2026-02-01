import json
import os

class JurisdictionManager:
    """
    Pillar 1: Multi-Sovereignty Regulatory Engine.
    Abstracts compliance logic to support global jurisdictions 'On-Click'.
    """
    
    SUPPORTED_REGIONS = {
        "MX": {"name": "Mexico", "framework": "LFPDPPP", "risk_level": "High"},
        "EU": {"name": "European Union", "framework": "GDPR", "risk_level": "Critical"},
        "US_CA": {"name": "California (USA)", "framework": "CCPA", "risk_level": "High"},
        "BR": {"name": "Brazil", "framework": "LGPD", "risk_level": "Medium"}
    }

    def __init__(self):
        self.current_jurisdiction = "MX"
        self.active_rules = self._load_rules("MX")

    def switch_jurisdiction(self, region_code: str):
        """
        Hot-swaps the compliance engine to a new legal framework.
        """
        if region_code not in self.SUPPORTED_REGIONS:
            raise ValueError(f"Jurisdiction {region_code} not supported.")
            
        self.current_jurisdiction = region_code
        self.active_rules = self._load_rules(region_code)
        
        return {
            "status": "Switched",
            "region": self.SUPPORTED_REGIONS[region_code],
            "active_modules": self.active_rules
        }

    def _load_rules(self, region: str):
        # In a real system, this would load heavy YAML/JSON rule sets
        # Simulating rule adaptation
        base_modules = ["DataPrivacy", "ConsumerRights"]
        
        if region == "EU":
            base_modules.extend(["RightToToBeForgotten", "DataPortability", "AI_Act_Compliance"])
        elif region == "US_CA":
            base_modules.extend(["DoNotSellMyData", "OptOut_Mechanisms"])
        elif region == "MX":
            base_modules.extend(["ARCO_Rights", "Financial_Privacy"])
            
        return base_modules

    def validate_action(self, action_type: str, data: dict):
        """
        Checks if an action is valid under the CURRENT jurisdiction.
        """
        # Simulation of "AI Judge" Logic
        compliance_check = True
        violation = None
        
        if self.current_jurisdiction == "EU" and "user_consent" not in data:
             compliance_check = False
             violation = "GDPR Violation: Explicit consent missing."
             
        return {
            "jurisdiction": self.current_jurisdiction,
            "compliant": compliance_check,
            "violation": violation
        }

jurisdiction_bot = JurisdictionManager()
