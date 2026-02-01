# Git Auto-Repair Script
# Checks and fixes common Git repository issues

$ErrorActionPreference = "Stop"

function Write-Log {
    param([string]$Message)
    $TimeStamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$TimeStamp] $Message" -ForegroundColor Cyan
}

Write-Log "Starting Git Auto-Repair..."

# 1. Configure Git Identity
Write-Log "Checking Git identity configuration..."
try {
    $email = git config user.email
    if ([string]::IsNullOrWhiteSpace($email)) {
        Write-Log "Setting user.email to dfigueroa.juridico@gmail.com"
        git config --global user.email "dfigueroa.juridico@gmail.com"
    } else {
        Write-Log "user.email is already set to: $email"
    }

    $name = git config user.name
    if ([string]::IsNullOrWhiteSpace($name)) {
         Write-Log "Setting user.name to 'Daniel Figueroa'"
         git config --global user.name "Daniel Figueroa"
    } else {
        Write-Log "user.name is already set to: $name"
    }
} catch {
    Write-Error "Failed to configure Git identity: $_"
}

# 2. Check/Create .gitignore
if (-not (Test-Path ".gitignore")) {
    Write-Log "Creating .gitignore file..."
    $ignoreContent = @"
node_modules/
.pnp
.pnp.js
coverage
.nyc_output
build/
dist/
.DS_Store
.env
.env.local
npm-debug.log*
yarn-debug.log*
__pycache__/
*.py[cod]
venv/
.vscode/
.idea/
"@
    Set-Content -Path ".gitignore" -Value $ignoreContent
    Write-Log ".gitignore created."
} else {
    Write-Log ".gitignore already exists."
}

# 3. Check Repository State (Bad Head / No Branch)
try {
    $currentBranch = git symbolic-ref --short HEAD 2>&1
    if ($LASTEXITCODE -ne 0) {
        # Likely detached head or empty repo, check if invalid head
         Write-Log "HEAD reference check failed. Checking for empty repository state..."
    }
    
    # Try logging to see if repo has history
    git log -n 1 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Log "Repository appears to have no commits (Bad Revision / Empty). Initializing..."
        
        Write-Log "Adding files..."
        git add .
        
        Write-Log "Creating initial commit..."
        git commit -m "Auto-Repair: Initial commit to stabilize repository"
        
        Write-Log "Repository initialized."
    } else {
        Write-Log "Repository has valid history."
    }
} catch {
    Write-Log "Error checking repository state: $_"
}

Write-Log "Git Auto-Repair completed."
git status
