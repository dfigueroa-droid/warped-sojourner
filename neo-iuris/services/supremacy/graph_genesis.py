import sys
import os

# Add parent directory to path to allow importing sibling modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

try:
    from services.supremacy.dna_loader import DNALoader
except ImportError:
    # Fallback if running directly
    from dna_loader import DNALoader

class GraphGenesis:
    """
    Componente 'Topólogo': Traduce la lista plana de módulos en un Grafo de Conocimiento interconectado.
    """
    def __init__(self):
        self.dna = DNALoader()
        self.nodes = []
        self.edges = []

    def initialize_topological_core(self):
        print(">>> INITIALIZING TOPOLOGICAL CORE (GRAPH GENESIS) <<<")
        modules = self.dna.get_modules()
        
        # 1. Create Nodes (Modules)
        for mod in modules:
            node = {
                "id": mod["id"],
                "label": "Module",
                "type": mod["type"],
                "properties": {
                    "name": mod["name"],
                    "path": mod["path"]
                }
            }
            self.nodes.append(node)
            print(f" [NODE] {mod['name']} ({mod['type']}) instantiated.")

        # 2. Simulate User Nodes based on Roles
        roles = self.dna.blueprint.get("roles", {})
        for role_key in roles:
            node = {
                "id": role_key,
                "label": "Identity",
                "properties": {"clearance": roles[role_key].get("clearance")}
            }
            self.nodes.append(node)
            print(f" [NODE] Identity: {role_key.upper()} instantiate.")

        # 3. Create Edges (Access Control Relationships)
        # Identity -[HAS_ACCESS]-> Module
        for mod in modules:
            allowed_roles = mod.get("access", [])
            for role in allowed_roles:
                edge = {
                    "source": role,
                    "target": mod["id"],
                    "relationship": "HAS_ACCESS_TO"
                }
                self.edges.append(edge)
                # print(f"   + [EDGE] {role} -> {mod['id']}")
        
        print(f"Topological Initialization Complete: {len(self.nodes)} Nodes, {len(self.edges)} Edges active.")
        return {"nodes": self.nodes, "edges": self.edges}

if __name__ == "__main__":
    genesis = GraphGenesis()
    genesis.initialize_topological_core()
