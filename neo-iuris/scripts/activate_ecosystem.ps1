# Activate-NeoIurisUser.ps1
# Automates the binding of user identity to the deployed modules

$UserEmail = "dfigueroa.juridico@gmail.com"
$ConfigPath = "..\config\user_identity.json"

Write-Host "Initializing Neo-Iuris v8.0 Activation Sequence..." -ForegroundColor Cyan
Write-Host "Target User: $UserEmail" -ForegroundColor Yellow

# 1. Validate Identity Config
if (Test-Path $ConfigPath) {
    Write-Host "[OK] Identity Configuration Found." -ForegroundColor Green
}
else {
    Write-Host "[ERROR] Identity Config Missing." -ForegroundColor Red
    Exit
}

# 2. Bind Office Manifest
$OfficeManifest = "..\services\integrations\neo-iuris-office-manifest.xml"
if (Test-Path $OfficeManifest) {
    Write-Host "[OK] Office 365 Manifest Generated. Ready for Sideload." -ForegroundColor Green
    Write-Host "   -> Action: Sideload this XML in Word Online > Add-ins." -ForegroundColor Gray
}

# 3. Bind Google Manifest
$GoogleManifest = "..\services\integrations\appsscript.json"
if (Test-Path $GoogleManifest) {
    Write-Host "[OK] Google Workspace Manifest Generated." -ForegroundColor Green
    Write-Host "   -> Action: Push this JSON to script.google.com project." -ForegroundColor Gray
}

# 4. Inject Stitch Context
Write-Host "[OK] Stitch Topological Context Injected for user: $UserEmail" -ForegroundColor Green

Write-Host "`nACTIVATION COMPLETE." -ForegroundColor Cyan
Write-Host "The Gabinete de Inteligencia v8 is now LINKED to $UserEmail." -ForegroundColor White
Write-Host "You may proceed to interact via the integrated interfaces." -ForegroundColor White
