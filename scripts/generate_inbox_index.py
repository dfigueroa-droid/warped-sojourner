import os
import datetime
import re

BRAIN_DIR = r"c:/Users/DANIEL/.gemini/antigravity/brain"
OUTPUT_FILE = os.path.join(BRAIN_DIR, "FULL_INBOX_INDEX.md")

def get_title_from_md(path):
    """
    Tries to find a title in a markdown file.
    Looking for first header # Title
    """
    if not os.path.exists(path):
        return None
    
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            for line in f:
                line = line.strip()
                if line.startswith("# ") and not line.startswith("##"):
                    return line[2:].strip()
                if line.startswith("Title:"):
                    return line.split(":", 1)[1].strip()
    except:
        pass
    return None

def get_conversation_data(uuid):
    path = os.path.join(BRAIN_DIR, uuid)
    
    data = {
        "id": uuid,
        "date_epoch": 0,
        "date_str": "N/A",
        "title": "Untitled Conversation",
        "status": "Valid",
        "link": f"[{uuid}](file:///{path.replace(os.sep, '/')})"
    }
    
    if not os.path.isdir(path):
        return None

    # Check for corruption
    files = os.listdir(path)
    md_files = [f for f in files if f.endswith(".md")]
    
    if not md_files:
        data["status"] = "Empty/Corrupt"
        return data

    # Find best file for date and title
    target_file = None
    if "task.md" in files:
        target_file = os.path.join(path, "task.md")
    elif "implementation_plan.md" in files:
        target_file = os.path.join(path, "implementation_plan.md")
    else:
        target_file = os.path.join(path, md_files[0])
    
    # Get Date
    try:
        stat = os.stat(target_file)
        data["date_epoch"] = stat.st_mtime
        data["date_str"] = datetime.datetime.fromtimestamp(stat.st_mtime).strftime('%Y-%m-%d %H:%M')
    except:
        pass
        
    # Get Title
    # 1. Try metadata file first (if exists)
    # 2. Try parsing md file
    title = get_title_from_md(target_file)
    if title:
        data["title"] = title
    else:
        # Fallback to older methods or just use directory name if totally failed
        data["title"] = f"Conversation {uuid[:8]}"

    return data

def generate_index():
    if not os.path.exists(BRAIN_DIR):
        print("Brain directory missing.")
        return

    conversations = []
    print("Scanning conversations...")
    
    for uuid in os.listdir(BRAIN_DIR):
        if len(uuid) == 36: # Simple UUID check
             c_data = get_conversation_data(uuid)
             if c_data:
                 conversations.append(c_data)
                 
    # Sort by date descending
    conversations.sort(key=lambda x: x["date_epoch"], reverse=True)
    
    # Generate Markdown
    md_content = "# 🗂️ Antigravity Master Inbox Index\n\n"
    md_content += f"**Last Updated:** {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
    md_content += f"**Total Conversations:** {len(conversations)}\n\n"
    
    md_content += "> [!TIP]\n"
    md_content += "> This index bypasses the system's 20-item display limit. Click the ID to open the folder.\n\n"
    
    md_content += "| Date | Status | Title / Description | ID (Link) |\n"
    md_content += "|------|--------|---------------------|-----------|\n"
    
    for c in conversations:
        status_icon = "🟢" if c["status"] == "Valid" else "🔴"
        title = c["title"].replace("|", "-") # Escape pipes
        
        md_content += f"| {c['date_str']} | {status_icon} | {title} | {c['link']} |\n"
        
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(md_content)
        
    print(f"Successfully generated index at: {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_index()
