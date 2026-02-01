
import os

class MaestroEngine:
    """
    The Strategic Brain.
    Ingests knowledge from the 'knowledge_base' and answers strategic queries.
    """
    def __init__(self, knowledge_path="knowledge_base"):
        self.knowledge_path = knowledge_path
        self.knowledge_cache = {}
        self._load_knowledge()

    def _load_knowledge(self):
        # Heuristic: Load all MD files as strategic context
        if not os.path.exists(self.knowledge_path):
            print("[Maestro] Knowledge base not found.")
            return

        for filename in os.listdir(self.knowledge_path):
            if filename.endswith(".md"):
                with open(os.path.join(self.knowledge_path, filename), "r", encoding="utf-8") as f:
                    self.knowledge_cache[filename] = f.read()
                print(f"[Maestro] Ingested strategic module: {filename}")

    def query_strategy(self, topic):
        print(f"[Maestro] analyzing strategy for: {topic}")
        results = []
        for source, content in self.knowledge_cache.items():
            if topic.lower() in content.lower():
                results.append(f"Found reference in {source}")
        
        return results if results else ["No strategic directives found."]

if __name__ == "__main__":
    maestro = MaestroEngine()
    print(maestro.query_strategy("FIPS"))
