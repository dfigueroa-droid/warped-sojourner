import os
import zipfile
from datetime import datetime

def zip_solution(source_dir, output_filename):
    """
    Zips the entire solution folder, excluding heavy node_modules and git folders.
    """
    print(f"Starting compression of {source_dir}...")
    
    # Exclude list
    EXCLUDE_DIRS = {'node_modules', '.git', '.next', '__pycache__', 'venv', '.gemini'}
    EXCLUDE_EXTS = {'.pyc', '.ds_store'}
    
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Modify dirs in-place to skip excluded directories
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            
            for file in files:
                if any(file.lower().endswith(ext) for ext in EXCLUDE_EXTS):
                    continue
                    
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, source_dir)
                
                print(f"Adding: {arcname}")
                zipf.write(file_path, arcname)
                
    print(f"✓ Compression complete: {output_filename}")

if __name__ == "__main__":
    # Define paths
    ROOT_DIR = r"c:\Users\DANIEL\.gemini\antigravity\playground\warped-sojourner\neo-iuris"
    OUTPUT_DIR = r"c:\Users\DANIEL\.gemini\antigravity\brain\6002679f-5ce1-413e-bbc7-2d41cb8b792e"
    TIMESTAMP = datetime.now().strftime("%Y%m%d_%H%M%S")
    OUTPUT_FILE = os.path.join(OUTPUT_DIR, f"Gabinete_v8_FINAL_HANDOVER_{TIMESTAMP}.zip")
    
    # Execute
    zip_solution(ROOT_DIR, OUTPUT_FILE)
