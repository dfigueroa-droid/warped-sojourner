import os
import hashlib
import datetime
import json
from pathlib import Path

# Project Root
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class CopyrightManager:
    """
    Automated IP Protection Engine.
    Generates cryptographic proofs (SHA-256) of the codebase for WIPO/Indautor registration.
    """
    
    def __init__(self, owner="Daniel Figueroa", entity="Neo-Iuris System"):
        self.owner = owner
        self.entity = entity
        self.manifest_path = os.path.join(BASE_DIR, "data", "ip_manifest.json")
        os.makedirs(os.path.dirname(self.manifest_path), exist_ok=True)

    def _calculate_file_hash(self, filepath: str) -> str:
        sha256_hash = hashlib.sha256()
        try:
            with open(filepath, "rb") as f:
                for byte_block in iter(lambda: f.read(4096), b""):
                    sha256_hash.update(byte_block)
            return sha256_hash.hexdigest()
        except Exception:
            return None

    def generate_proof_of_existence(self) -> dict:
        """
        Scans all critical source code files (.py, .ts, .tsx, .js) and generates a Merkle-like summary.
        This summary acts as a 'Digital Fingerprint' at a specific point in time.
        """
        total_hash = hashlib.sha256()
        file_registry = []
        
        # Scan critical extensions
        extensions = ['*.py', '*.ts', '*.tsx', '*.js', '*.md']
        params = []
        for ext in extensions:
             params.extend(Path(BASE_DIR).rglob(ext))

        for filepath in sorted(params):
            str_path = str(filepath)
            # Ignore node_modules, venv, git
            if "node_modules" in str_path or "venv" in str_path or ".git" in str_path:
                continue
                
            f_hash = self._calculate_file_hash(str_path)
            if f_hash:
                rel_path = os.path.relpath(str_path, BASE_DIR)
                file_registry.append({
                    "path": rel_path,
                    "hash": f_hash,
                    "size": os.path.getsize(str_path)
                })
                total_hash.update(f_hash.encode('utf-8'))

        master_hash = total_hash.hexdigest()
        timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()
        
        manifest = {
            "project": "Neo-Iuris v8.0",
            "owner": self.owner,
            "entity": self.entity,
            "timestamp_utc": timestamp,
            "master_hash": master_hash,
            "file_count": len(file_registry),
            "legal_notice": "This cryptographic manifest serves as proof of existence for copyright registration purposes.",
            "files": file_registry
        }
        
        # Save to disk
        with open(self.manifest_path, "w") as f:
            json.dump(manifest, f, indent=2)
            
        return manifest

    def generate_legal_headers(self) -> dict:
        return {
            "X-Copyright": f"© {datetime.datetime.now().year} {self.owner}. All Rights Reserved.",
            "X-IP-Protection": "Active (WIPO Proof Standard)",
            "X-Software-ID": "NEO-IURIS-V8-REG-PENDING"
        }

# Singleton
ip_guardian = CopyrightManager()
