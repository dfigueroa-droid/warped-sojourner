
import os
import json

class ShelfManager:
    """
    Manages the 'Physical' storage of Knowledge Volumes (PDFs, DOCXs).
    In this simulation, it tracks metadata of 'ingested' books.
    """
    def __init__(self, volume_path="volumes"):
        self.volume_path = volume_path
        self.catalog = {}
        
    def ingest_volume(self, title, author, content_type="pdf", summary=""):
        """
        Registers a new volume in the library catalog.
        """
        volume_id = f"{title.lower().replace(' ', '_')}_{author.lower().replace(' ', '_')}"
        metadata = {
            "title": title,
            "author": author,
            "type": content_type,
            "summary": summary,
            "status": "INDEXED"
        }
        self.catalog[volume_id] = metadata
        print(f"[ShelfManager] Ingested: {title} by {author}")
        return volume_id

    def list_volumes(self):
        return self.catalog

    def get_volume_content(self, volume_id):
        # Simulation: Retrieve simulated content
        if volume_id in self.catalog:
            return f"Content of {self.catalog[volume_id]['title']}... [Simulated Text]"
        return None

if __name__ == "__main__":
    shelf = ShelfManager()
    shelf.ingest_volume("The Art of War", "Sun Tzu", "pdf", "Strategic Treatise")
    print(shelf.list_volumes())
