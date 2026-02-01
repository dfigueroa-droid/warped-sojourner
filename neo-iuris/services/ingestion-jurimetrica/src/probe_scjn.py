import requests
import urllib3
from urllib.parse import urljoin

# Disable SSL warnings for exploration purposes (SCJN often has cert issues)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Configuration
BASE_URLS = [
    "https://www.scjn.gob.mx",
    "https://sjf.scjn.gob.mx",
    "https://sjf2.scjn.gob.mx",
    "https://api.scjn.gob.mx",
]

COMMON_PATHS = [
    "",
    "/api",
    "/api/v1",
    "/sjfsist/",
    "/sjf/",
    "/consultas/",
    "/listas/",
    "/ws/",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

def probe_endpoint(base, path):
    url = urljoin(base, path)
    try:
        response = requests.get(url, headers=HEADERS, verify=False, timeout=5)
        print(f"[{response.status_code}] {url} - {response.reason}")
        if response.status_code == 200:
            content_type = response.headers.get("Content-Type", "")
            print(f"    -> Content-Type: {content_type}")
            if "application/json" in content_type:
                print("    -> *** POTENTIAL API ENDPOINT ***")
                # Try to print a snippet
                try:
                    print(f"    -> Preview: {str(response.json())[:100]}")
                except:
                    pass
    except requests.RequestException as e:
        print(f"[ERR] {url} - {e}")

def main():
    print("Starting SCJN/SJF API Probe...")
    print("===============================")
    for base in BASE_URLS:
        for path in COMMON_PATHS:
            probe_endpoint(base, path)
    print("\nProbe complete.")

if __name__ == "__main__":
    main()
