
from .shelf_manager import ShelfManager

class LibrarianCore:
    """
     The AI Librarian Agent.
     Synthesizes answers based on the volumes in the Shelf.
    """
    def __init__(self):
        self.shelf = ShelfManager()
        # Seed with some knowledge
        self.shelf.ingest_volume("Code of Criminal Procedure", "Congress", "pdf", "Legal Framework")
        self.shelf.ingest_volume("General Health Law", "Congress", "pdf", "Sanitary Framework")

    def research_topic(self, query):
        """
        Synthesizes a response to a query using the available volumes.
        """
        print(f"[Librarian] Researching: {query}")
        
        # Heuristic: Check if query relates to known volumes
        relevant_docs = []
        for vid, meta in self.shelf.list_volumes().items():
            if meta['title'] in query or meta['summary'] in query or "Law" in query:
                relevant_docs.append(meta['title'])
        
        if relevant_docs:
            return f"Based on {', '.join(relevant_docs)}: The query '{query}' is addressed by current regulations. [Simulated Synthesis]"
        else:
            return "No relevant volumes found in the current library."

if __name__ == "__main__":
    lib = LibrarianCore()
    print(lib.research_topic("What does the General Health Law say about emergency care?"))
