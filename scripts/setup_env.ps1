param (
    [switch]$Help
)

if ($Help) {
    Write-Host "Uso: setup_env.ps1"
    Write-Host "Ejecuta los scripts automatizados de Python para leer y configurar las credenciales seguras (GCP y 42Crunch) en el entorno."
    exit
}

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
# Subir un nivel más ya que el script actual está en /scripts
$projectRoot = Split-Path -Parent $projectRoot 

$credentialsDir = Join-Path $projectRoot ".credentials"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Inicializando Entorno de Trabajo Automatizado" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# 1. Verificar estructura base
if (-Not (Test-Path $credentialsDir)) {
    Write-Host "[!] La carpeta .credentials no existe. Por favor creála siguiendo las INSTRUCCIONES_CONFIGURACION." -ForegroundColor Yellow
}

# 2. Ejecutar el configurador de Python
$pythonScript = Join-Path $projectRoot "scripts\gcp_auth.py"

if (Test-Path $pythonScript) {
    $virtualEnvPython = Join-Path $projectRoot ".venv\Scripts\python.exe"
    
    if (Test-Path $virtualEnvPython) {
        Write-Host "-> Ejecutando script de validacion de credenciales y APIs..." -ForegroundColor Green
        & $virtualEnvPython $pythonScript
    } else {
        Write-Host "-> Ejecutando script con Python global (no se encontro .venv)..." -ForegroundColor Yellow
        python $pythonScript
    }
} else {
    Write-Host "[X] No se encontro el script principal de Python: $pythonScript" -ForegroundColor Red
}

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Configuracion finalizada. Entorno listo." -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
