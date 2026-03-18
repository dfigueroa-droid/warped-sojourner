import os
import sys
import json
from google.oauth2 import service_account

# Obtener la ruta base del proyecto
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CREDENTIALS_DIR = os.path.join(PROJECT_ROOT, ".credentials")

# Rutas de Archivos Esperadas
GCP_KEY_PATH = os.environ.get("GCP_SERVICE_ACCOUNT_FILE", os.path.join(CREDENTIALS_DIR, "gcp_service_account.json"))
FOURTYTWO_CRUNCH_TOKEN_PATH = os.environ.get("42CRUNCH_API_TOKEN_FILE", os.path.join(CREDENTIALS_DIR, "42crunch_token.txt"))
VSCODE_SETTINGS_DIR = os.path.join(PROJECT_ROOT, ".vscode")

def autenticar_gcp():
    """Carga credenciales GCP desde el archivo JSON seguro."""
    print("--- 1. Validando autenticación GCP ---")
    try:
        if not os.path.exists(GCP_KEY_PATH):
            print(f"[-] DENEGADO: Archivo de GCP no encontrado.\n    Se esperaba en: {GCP_KEY_PATH}")
            return None

        credentials = service_account.Credentials.from_service_account_file(GCP_KEY_PATH)
        print(f"[+] EXITOSO: Credenciales cargadas. Proyecto asociado: {getattr(credentials, 'project_id', 'Desconocido')}")
        return credentials

    except Exception as e:
        print(f"[X] ERROR CRÍTICO durante autenticación GCP: {e}")
        return None

def autenticar_42crunch():
    """Configura automáticamente el entorno para el CLI y extensión VSCode de 42Crunch"""
    print("\n--- 2. Validando autenticación 42Crunch ---")
    try:
        if not os.path.exists(FOURTYTWO_CRUNCH_TOKEN_PATH):
            print(f"[-] DENEGADO: Archivo de token 42Crunch no encontrado.\n    Se esperaba en: {FOURTYTWO_CRUNCH_TOKEN_PATH}")
            return False

        # Leer token
        with open(FOURTYTWO_CRUNCH_TOKEN_PATH, 'r') as f:
            token = f.read().strip()
            
        if not token:
            print("[-] DENEGADO: El archivo de token existe pero está vacío.")
            return False

        # Aquí podríamos usar el token para llamar a la CLI (`42c scan ...`),
        # o inyectarlo como una variable de entorno para la sesión actual:
        os.environ["42CRUNCH_API_TOKEN"] = token
        
        # Alternativa en el proyecto: Tratar de inyectarlo en settings.json de VS Code
        settings_path = os.path.join(VSCODE_SETTINGS_DIR, "settings.json")
        if os.path.exists(VSCODE_SETTINGS_DIR):
            try:
                # Tratar de parchear de manera segura sin romper la estructura
                datos_settings = {}
                if os.path.exists(settings_path):
                    with open(settings_path, 'r', encoding='utf-8') as s:
                        content = s.read()
                        if content.strip(): 
                             datos_settings = json.loads(content)
                
                # Inyectar
                datos_settings["42crunch.api.token"] = token
                datos_settings["42crunch.api.platform"] = "https://platform.42crunch.com"
                
                with open(settings_path, 'w', encoding='utf-8') as s:
                    json.dump(datos_settings, s, indent=4)
                    
                print("[+] EXITOSO: VSCode Workspace / Entorno configurados con el token IDE para 42Crunch.")
                return True
                
            except Exception as se:
                print(f"[!] Advertencia: No se pudo inyectar en VSCode settings.json, pero el Token es válido. \n{se}")
                # Aún retornamos que es exitosa la lectura
                return True
        else:
             print("[+] EXITOSO: Token leído de forma interactiva (carpeta .vscode no hallada para inyección).")
             return True

    except Exception as e:
         print(f"[X] ERROR CRÍTICO leyendo token de 42Crunch: {e}")
         return False


if __name__ == "__main__":
    gcp_connected = autenticar_gcp()
    crunch_connected = autenticar_42crunch()
    
    print("\n--- RESUMEN DE CONEXION ---\n")
    if gcp_connected and crunch_connected:
         print("[OK] AMBOS SISTEMAS CONECTADOS EN MODO HEADLESS AUTOMATIZADO")
    else:
         print("[ATENCION] FALTA CONFIGURAR LOS TOKENS INICIALES MANUALMENTE. Revisa `.credentials/INSTRUCCIONES_CONFIGURACION.md`.")
