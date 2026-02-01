import re

path = r"c:/Users/DANIEL/.gemini/antigravity/playground/warped-sojourner/scripts/workbench_dump.js"

print("Reading file...")
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

print(f"File size: {len(content)} characters")

# Pattern: .slice(0, 20) or .slice(0,20) or limit: 20 or maxItems: 20
patterns = [
    r"\.slice\(0,\s*20\)",
    r"limit:\s*20",
    r"maxItems:\s*20",
    r"pageSize:\s*20"
]

for p in patterns:
    matches = list(re.finditer(p, content))
    print(f"Pattern '{p}': {len(matches)} matches")
    for m in matches[:5]:
        start = max(0, m.start() - 50)
        end = min(len(content), m.end() + 50)
        snippet = content[start:end].replace('\n', ' ')
        print(f"   Context: ...{snippet}...")

# Heuristic: Find 'conversations' keyword and look nearby
print("\nScanning near 'conversations'...")
conv_matches = list(re.finditer(r"conversations", content))
for m in conv_matches:
    # Check 100 chars around for "20"
    start = max(0, m.start() - 100)
    end = min(len(content), m.end() + 100)
    snippet = content[start:end]
    if "20" in snippet:
        sanitized = snippet.replace('\n', ' ')
        print(f"   Potential match near 'conversations': ...{sanitized}...")
