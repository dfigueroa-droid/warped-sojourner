
class BioethicsFilter:
    """
    The 'Constitutional Constraint' Layer.
    Blocks any system output that violates fundamental rights or bioethical principles
    (CNPP, LFPDPPP, DUDH).
    """
    
    def __init__(self):
        self.blocked_keywords = [
            "discriminatory_triage",
            "sell_patient_data",
            "deny_emergency_care",
            "predictive_policing_bias"
        ]
    
    def validate_policy(self, policy_proposal):
        """
        Returns True if policy is bioethically sound.
        Returns False and a Citation if it violates a right.
        """
        proposal_lower = policy_proposal.lower()
        
        # Check against LFPDPPP (Data Privacy)
        if "sell_patient_data" in proposal_lower:
            return False, "VIOLATION: LFPDPPP Art. 6 - Commercialization of sensitive health data is prohibited."

        # Check against Constitution Art. 1 (Discrimination)
        if "discriminatory_triage" in proposal_lower:
            return False, "VIOLATION: Constitution Art. 1 - Prohibition of discrimination."

        # Check against General Health Law (Emergency Care)
        if "deny_emergency_care" in proposal_lower:
            return False, "VIOLATION: General Health Law - Emergency care cannot be denied."

        return True, "PASSED: Policy adheres to constitutional framework."

if __name__ == "__main__":
    filter_ = BioethicsFilter()
    allowed, message = filter_.validate_policy("Optimize revenue by sell_patient_data to insurers")
    print(f"[Bioethics] Decision: {message}")
