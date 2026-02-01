
from .librarian_core import LibrarianCore

class UniversalLibrarianAPI:
    """
    Gateway for other subsystems (Core-Intelligence, Prompt Maestro) 
    to access the Universal Librarian.
    """
    def __init__(self):
        self.librarian = LibrarianCore()

    def query(self, request_type, content):
        """
        Router for library requests.
        """
        if request_type == "RESEARCH":
            return self.librarian.research_topic(content)
        elif request_type == "INGEST":
            # Simulate parsing params
            title, author = content.split("|")
            return self.librarian.shelf.ingest_volume(title, author)
        else:
            return "UNKNOWN_REQUEST"

if __name__ == "__main__":
    api = UniversalLibrarianAPI()
    print(api.query("RESEARCH", "Regulations on Mental Health"))
