import json
import os
import sys

class DNALoader:
    """
    Componente 'Ribosoma': Lee el Blueprint Genético (JSON) y lo traduce en configuración activa.
    """
    def __init__(self, blueprint_file="neo_iuris_v8_supremacy_blueprint.json"):
        # Locate the blueprint in the root of the workspace
        # Assuming this script is in services/supremacy/
        self.root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        self.filepath = os.path.join(self.root_dir, blueprint_file)
        self.blueprint = self._load_dna()

    def _load_dna(self):
        if not os.path.exists(self.filepath):
            print(f"CRITICAL: Blueprint not found at {self.filepath}")
            return {}
        try:
            with open(self.filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                print(f"GENETIC SEQUENCE LOADED: {len(data)} root keys.")
                return data
        except Exception as e:
            print(f"CRITICAL: DNA Load Failed: {e}")
            return {}

    def get_role_config(self, role_key):
        return self.blueprint.get("roles", {}).get(role_key)

    def get_modules(self):
        return self.blueprint.get("modules_functionalities", [])

    def get_architecture(self):
        return self.blueprint.get("architecture_core", {})
    
    def get_security_principles(self):
        return self.blueprint.get("security_trust_governance_principles", {})

if __name__ == "__main__":
    loader = DNALoader()
    print(json.dumps(loader.get_architecture(), indent=2))
