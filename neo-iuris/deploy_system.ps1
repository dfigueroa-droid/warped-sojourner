Write-Host ">>> ACTIVATING NEO-IURIS v8.0 SUPREMACY <<<" -ForegroundColor Cyan
Write-Host "Initializing Environment for Principal: dfigueroa.juridico@gmail.com" -ForegroundColor Green

# 1. Load Environment Variables
$env:NEO_IURIS_INFURA_URL = "https://mainnet.infura.io/v3/7a03043217b140689366df2e73a02796"
$env:NEO_IURIS_WALLET_PRIVATE_KEY = "0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f5917d2"

# 2. Start Core API (Background)
Write-Host "[1/3] Launching Supremacy API Gateway (Port 8000)..." -ForegroundColor Yellow
# Using python -m uvicorn is safer than "uvicorn" executable on Windows
Start-Process -FilePath "python" -ArgumentList "-m uvicorn services.api_gateway:app --port 8000 --app-dir ." -NoNewWindow
Start-Sleep -Seconds 5

# 3. Provisioning Check
Write-Host "[2/3] Verifying DNA Injection..." -ForegroundColor Yellow
python services/supremacy/role_provisioner.py
Start-Sleep -Seconds 2

# 4. Start UI (Frontend)
Write-Host "[3/3] Launching Stitch XR Interface (Port 3000)..." -ForegroundColor Yellow
Write-Host "Starting Next.js Frontend..." -ForegroundColor Gray
# Use cmd /c for npm to handle the shell wrapper correctly
Start-Process -FilePath "cmd" -ArgumentList "/c npm run dev" -WorkingDirectory "interface/neo-iuris-ui"

Write-Host ">>> SYSTEM DEPLOYED. READY FOR COMMAND. <<<" -ForegroundColor Cyan
Write-Host "Dashboard: http://localhost:3000/stitch-xr"
Write-Host "API: http://localhost:8000/docs"
