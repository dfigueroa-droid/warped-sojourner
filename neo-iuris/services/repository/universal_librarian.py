import os
import glob
import json
import mimetypes
import shutil
from datetime import datetime
from typing import List, Dict, Optional
from fastapi import UploadFile, HTTPException
from fastapi.responses import FileResponse

# Directory to store the repository files
REPO_DIR = os.path.join(os.path.dirname(__file__), "../../data/repository")
os.makedirs(REPO_DIR, exist_ok=True)

class UniversalLibrarian:
    """
    Central Handler for Universal File Management.
    Supports: PDF, Office, Email, Media, Archives.
    """
    
    def __init__(self):
        self.supported_formats = {
            'text': ['.txt', '.md', '.json', '.xml', '.csv'],
            'image': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
            'document': ['.pdf', '.docx', '.doc', '.pages', '.odt'],
            'spreadsheet': ['.xlsx', '.xls', '.xlsm', '.numbers', '.csv'],
            'presentation': ['.pptx', '.ppt', '.key'],
            'audio': ['.mp3', '.wav', '.aac', '.ogg', '.m4a'],
            'video': ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
            'archive': ['.zip', '.rar', '.7z', '.tar', '.gz'],
            'email': ['.eml', '.msg', '.pst', '.ost', '.mbox']
        }

    def _get_category(self, ext: str) -> str:
        for cat, exts in self.supported_formats.items():
            if ext.lower() in exts:
                return cat
        return "unknown"

    async def save_file(self, file: UploadFile) -> Dict:
        """Saves an uploaded file and returns metadata."""
        file_ext = os.path.splitext(file.filename)[1].lower()
        file_cat = self._get_category(file_ext)
        
        # Create category sub-folder
        target_dir = os.path.join(REPO_DIR, file_cat)
        os.makedirs(target_dir, exist_ok=True)
        
        file_path = os.path.join(target_dir, file.filename)
        
        # Save bytes
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return {
            "name": file.filename,
            "category": file_cat,
            "path": f"/repository/{file_cat}/{file.filename}",
            "size_bytes": os.path.getsize(file_path),
            "mime": file.content_type,
            "created_at": datetime.now().isoformat()
        }

    def list_files(self, category: Optional[str] = None) -> List[Dict]:
        """Lists files, optionally filtered by category."""
        files = []
        search_path = os.path.join(REPO_DIR, category if category else "**", "*")
        
        for filepath in glob.glob(search_path, recursive=True):
            if os.path.isfile(filepath):
                filename = os.path.basename(filepath)
                ext = os.path.splitext(filename)[1].lower()
                cat = self._get_category(ext)
                
                files.append({
                    "id": filename, # Simple ID for now
                    "name": filename,
                    "category": cat,
                    "download_url": f"/api/repo/download/{cat}/{filename}",
                    "preview_url": f"/api/repo/preview/{cat}/{filename}",
                    "size_bytes": os.path.getsize(filepath),
                    "modified_at": datetime.fromtimestamp(os.path.getmtime(filepath)).isoformat()
                })
        return files

    def get_file_path(self, category: str, filename: str) -> str:
        path = os.path.join(REPO_DIR, category, filename)
        if not os.path.exists(path):
            raise FileNotFoundError(f"File not found: {path}")
        return path

    def extract_metadata(self, category: str, filename: str) -> Dict:
        """
        Simulates metadata extraction for heavy formats.
        In a real prod env, this would use 'pypdf', 'python-docx', 'pillow', etc.
        """
        path = self.get_file_path(category, filename)
        ext = os.path.splitext(filename)[1].lower()
        
        meta = {
            "filename": filename,
            "category": category,
            "size": os.path.getsize(path),
            "analysis": {}
        }
        
        # Heuristic Metadata Extraction (Simulation)
        if category == 'email':
            meta['analysis'] = {
                "sender": "Simulated Sender <sender@example.com>",
                "subject": "Heuristic Subject Analysis",
                "attachments": 2,
                "risk_score": "LOW"
            }
        elif category == 'document':
             meta['analysis'] = {
                "pages": 12,
                "author": "Neo-Iuris System",
                "contains_signature": True
            }
        elif category == 'image':
             meta['analysis'] = {
                "resolution": "1920x1080",
                "exif_gps": "None"
            }
            
        return meta

# Singleton Instance
librarian = UniversalLibrarian()
