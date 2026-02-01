# Helper script to launch the Neo-Iuris UI
Write-Host "Starting Neo-Iuris Frontend..." -ForegroundColor Cyan

# Navigate to UI directory
$uiPath = "interface\neo-iuris-ui"

if (!(Test-Path $uiPath)) {
    Write-Error "Error: UI Directory not found at $uiPath"
    exit 1
}

cd $uiPath

# Check/Install Dependencies
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies (first run)..." -ForegroundColor Yellow
    npm install
}

# Start Dev Server
Write-Host "Launching Next.js Server..." -ForegroundColor Green
npm run dev
