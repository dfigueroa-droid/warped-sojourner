# fix-git-repo.ps1
$ErrorActionPreference = "Stop"

$repoPath = "c:\Users\DANIEL\OneDrive - UNIVERSIDAD NACIONAL AUTÓNOMA DE MÉXICO\Desktop.0\Jurídico Nacional\Jurídico Nacional\Neo-IURIS"

if (!(Test-Path $repoPath)) {
    Write-Error "Repository path not found: $repoPath"
    exit 1
}

Set-Location $repoPath

Write-Host "1. Checking git status..." -ForegroundColor Cyan
git status

Write-Host "`n2. Removing node_modules from git index (this may take a while)..." -ForegroundColor Cyan
try {
    git rm -r --cached node_modules
}
catch {
    Write-Warning "git rm failed or node_modules was not tracked. Continuing..."
}

Write-Host "`n3. Committing changes..." -ForegroundColor Cyan
git commit -m "Fix: Remove node_modules from git tracking"

Write-Host "`n4. Pushing to remote..." -ForegroundColor Cyan
git push -u origin main

Write-Host "`nDONE!" -ForegroundColor Green
