import os
import json
import datetime

BRAIN_DIR = r"c:/Users/DANIEL/.gemini/antigravity/brain"

def get_conversation_details(uuid):
    path = os.path.join(BRAIN_DIR, uuid)
    task_file = os.path.join(path, "task.md")
    
    details = {
        "id": uuid,
        "valid": False,
        "title": "Unknown",
        "last_modified": 0,
        "error": None
    }
    
    if not os.path.isdir(path):
        return None

    try:
        # Check for metadata files to confirm it's a valid conversation
        # Usually looking for task.md or just the directory existence
        if os.path.exists(task_file):
            details["valid"] = True
            stat = os.stat(task_file)
            details["last_modified"] = stat.st_mtime
            
            # Simple title extraction (optional, usually title is not in task.md easily)
            # We can check for a 'title' in a metadata file if one exists
            
        else:
            # Check for ANY .md file
            files = os.listdir(path)
            md_files = [f for f in files if f.endswith(".md")]
            if md_files:
                details["valid"] = True
                stat = os.stat(os.path.join(path, md_files[0]))
                details["last_modified"] = stat.st_mtime
            else:
                details["error"] = "No markdown artifacts found"
                
    except Exception as e:
        details["error"] = str(e)
        
    return details

def main():
    if not os.path.exists(BRAIN_DIR):
        print("Brain directory not found.")
        return

    conversations = []
    print(f"Scanning {BRAIN_DIR}...")
    
    for uuid in os.listdir(BRAIN_DIR):
        # formatted UUID check (simple length check)
        if len(uuid) == 36: 
            details = get_conversation_details(uuid)
            if details:
                conversations.append(details)

    # Sort by last modified
    conversations.sort(key=lambda x: x["last_modified"], reverse=True)

    print(f"Found {len(conversations)} conversation folders.")
    
    print(f"{'ID':<38} | {'Valid':<7} | {'Last Modified':<20} | {'Error'}")
    print("-" * 80)
    
    for c in conversations:
        ts = datetime.datetime.fromtimestamp(c["last_modified"]).strftime('%Y-%m-%d %H:%M:%S') if c["last_modified"] > 0 else "N/A"
        print(f"{c['id']} | {str(c['valid']):<7} | {ts:<20} | {c['error'] or ''}")

import sys
if __name__ == "__main__":
    main()
