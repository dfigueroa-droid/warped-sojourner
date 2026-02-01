# auto-sync.ps1
# ESTE SCRIPT AUTOMATIZA LA SUBIDA DE CAMBIOS PARA EVITAR ERRORES DE EDITOR

$ErrorActionPreference = "Stop"

Write-Host "--- INICIANDO AUTO-SYNC ---" -ForegroundColor Cyan

# 1. Verificar estado
$status = git status --porcelain
if (-not $status) {
    Write-Host "No hay cambios pendientes. Todo esta actualizado." -ForegroundColor Green
    exit
}

Write-Host "Cambios detectados:"
git status -s

# 2. Agregar cambios
Write-Host "`nAgregando archivos..." -ForegroundColor Yellow
git add .

# 3. Commit (con fecha y hora automatica si no se provee mensaje)
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$message = "Auto-sync: Update $timestamp"

Write-Host "Guardando cambios (Commit) con mensaje: '$message'..." -ForegroundColor Yellow
git commit -m "$message"

# 4. Push
Write-Host "Subiendo a GitHub (Push)..." -ForegroundColor Yellow
try {
    git push origin main
    Write-Host "`nEXITO TOTAL" -ForegroundColor Green
}
catch {
    Write-Error "Error al subir. Intenta 'git pull' primero."
}
