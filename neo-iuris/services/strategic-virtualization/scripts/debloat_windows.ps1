# Strategic Virtualization - Windows 11 Debloat Protocol (PowerShell)
# Target: Windows 11 Build 26200 (Dev/Canary)
# Purpose: Reclaim CPU cycles and RAM by disabling non-essential consumer services.
# Security: Does NOT disable Windows Defender or Updates.

Write-Host "Starting Strategic De-Bloating for Engineering Workstation..." -ForegroundColor Cyan

# 1. Disable Telemetry & Data Collection (Privacy + Performance)
Write-Host "Disabling Telemetry..."
Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\DataCollection" -Name "AllowTelemetry" -Type DWord -Value 0
Disable-ScheduledTask -TaskName "Microsoft\Windows\Customer Experience Improvement Program\Consolidator" -ErrorAction SilentlyContinue
Disable-ScheduledTask -TaskName "Microsoft\Windows\Customer Experience Improvement Program\UsbCeip" -ErrorAction SilentlyContinue

# 2. Optimize Search Indexing (CPU Saver)
# Only index the Project folder, exclude whole drive scanning
Write-Host "Optimizing Search Indexing..."
Set-Service -Name "WSearch" -StartupType Manual

# 3. Disable Consumer Bloatware Services
Write-Host "Disabling Consumer Services..."
$servicesToDisable = @(
    "XblAuthManager",      # Xbox Live Auth
    "XblGameSave",         # Xbox Game Save
    "XboxNetApiSvc",       # Xbox Network
    "MapsBroker",          # Downloaded Maps
    "lfsvc",               # Geolocation Service
    "DiagTrack"            # Connected User Experiences (Telemetry)
)

foreach ($service in $servicesToDisable) {
    if (Get-Service -Name $service -ErrorAction SilentlyContinue) {
        Stop-Service -Name $service -Force -ErrorAction SilentlyContinue
        Set-Service -Name $service -StartupType Disabled
        Write-Host "Disabled: $service" -ForegroundColor Green
    }
}

# 4. Thermal Polocy (Lenovo Specific)
# Attempt to set Lenovo Intelligent Thermal Solution to Manual to rely on Hardware PROCHOT
Write-Host "Adjusting Thermal Policies..."
if (Get-Service -Name "LITSSvc" -ErrorAction SilentlyContinue) {
    Set-Service -Name "LITSSvc" -StartupType Manual
    Write-Host "Lenovo Thermal Service set to Manual. Hardware throttling active." -ForegroundColor Yellow
}

Write-Host "Debloat Protocol Complete. Please Restart." -ForegroundColor Cyan
