import json
import os
import glob
from datetime import datetime

class UniversalJSONExporter:
    """
    Portability Engine: Strategy 6 (Data Independence).
    Exports all repository files, profiles, and logs into a single standardized JSON schema.
    """
    
    def __init__(self, base_dir):
        self.base_dir = base_dir
        self.export_dir = os.path.join(base_dir, "data", "exports")
        os.makedirs(self.export_dir, exist_ok=True)

    def generate_full_dump(self):
        """
        Crawls the data directory and builds a massive JSON object representing the entire system state.
        """
        system_state = {
            "metadata": {
                "system_version": "8.0",
                "export_date": datetime.now().isoformat(),
                "node_type": "MASTER_REPLICA"
            },
            "repository_files": [],
            "consultation_logs": [],
            "user_profiles": []
        }

        # 1. Index Repository Files
        repo_path = os.path.join(self.base_dir, "data", "repository", "**", "*.*")
        for filepath in glob.glob(repo_path, recursive=True):
            if os.path.isfile(filepath):
                 system_state["repository_files"].append({
                     "path": os.path.relpath(filepath, self.base_dir),
                     "size": os.path.getsize(filepath),
                     "type": os.path.splitext(filepath)[1]
                 })

        # 2. Serialize Logs (Mock implementation)
        # In a real DB scenario, this would SELECT * FROM logs
        
        # Save Dump
        filename = f"neo_iuris_dump_{int(datetime.now().timestamp())}.json"
        dump_path = os.path.join(self.export_dir, filename)
        
        with open(dump_path, 'w', encoding='utf-8') as f:
            json.dump(system_state, f, indent=2)
            
        return {
            "status": "success", 
            "file": filename, 
            "size_kb": os.path.getsize(dump_path) / 1024
        }
