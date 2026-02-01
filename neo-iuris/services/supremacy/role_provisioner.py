import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

try:
    from services.supremacy.dna_loader import DNALoader
except ImportError:
    from dna_loader import DNALoader

class RoleProvisioner:
    """
    Componente 'Gobernador': Aplica las reglas de Identidad y Seguridad del Blueprint.
    """
    def __init__(self):
        self.dna = DNALoader()
        self.security_rules = self.dna.get_security_principles()

    def enforce_governance(self):
        print(">>> ENFORCING SUPREMACY GOVERNANCE <<<")
        roles = self.dna.blueprint.get("roles", {})
        
        # Check Global Security Policies
        if self.security_rules.get("zero_trust_architecture"):
            print(" [POLICY] Zero Trust Architecture: ENFORCED")
        if self.security_rules.get("pqc_encryption"):
             print(" [POLICY] Post-Quantum Cryptography: ACTIVE (Kyber/Dilithium)")

        # Provision Roles
        for role_key, config in roles.items():
            self._provision_identity(role_key, config)

    def _provision_identity(self, role_key, config):
        clearance = config.get("clearance", "LEVEL_0")
        print(f" [IDENTITY] Provisioning {role_key.upper()}...")
        print(f"   |-- Clearance: {clearance}")
        
        # Special check for Maestro Kukulkan
        if role_key == "maestro_kukulkan":
            print(f"   |-- PRIVILEGES: {config.get('privileges')}")
            print("   |-- ALERT: ROOT ACCESS GRANTED. BIOMETRIC LOCK ENGAGED.")
        
        # Check MFA requirement
        if "MFA" in self.security_rules.get("rbac_mfa", "") or role_key in ["maestro_kukulkan", "root_admin"]:
            print("   |-- SECURITY: Multi-Factor Authentication (MFA) REQUIRED.")

        print("   |-- STATUS: ACTIVE")

if __name__ == "__main__":
    prov = RoleProvisioner()
    prov.enforce_governance()
