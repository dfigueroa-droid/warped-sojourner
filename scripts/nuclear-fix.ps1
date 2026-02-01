# nuclear-fix.ps1
# WARNING: This script rewrites git history to remove large files.

$ErrorActionPreference = "Stop"

# Dynamically determine the repository root (parent of 'scripts' folder)
$repoPath = Resolve-Path "$PSScriptRoot\.."
Write-Host "Detected Repository Path: $repoPath" -ForegroundColor Gray

if (!(Test-Path "$repoPath\.git")) {
    Write-Error "Not a git repository root. Please run this script from inside the 'scripts' folder of your repo."
    exit 1
}

Set-Location $repoPath

Write-Host "1. Resetting history to the first commit (keeping files)..." -ForegroundColor Cyan
# Get the first commit hash
$firstCommit = git rev-list --max-parents=0 HEAD | Select-Object -Last 1

if (-not $firstCommit) {
    Write-Warning "Could not determine first commit. Attempting to proceed with current state..."
}
else {
    # Soft reset to it
    git reset --soft $firstCommit
}

Write-Host "2. Unstaging node_modules..." -ForegroundColor Cyan
try {
    git rm -r --cached node_modules 2>$null
}
catch {
    Write-Host "node_modules already untracked."
}

Write-Host "3. Amending the initial commit to exclude large files..." -ForegroundColor Cyan
git commit --amend -m "Initial commit (Cleaned)"

Write-Host "4. Force pushing to remote..." -ForegroundColor Cyan
git push --force origin main

Write-Host "`nSUCCESS! Repository cleaned and pushed." -ForegroundColor Green
