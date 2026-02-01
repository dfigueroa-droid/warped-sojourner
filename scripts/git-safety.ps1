# git-safety.ps1
# Checks for large files before allowing a push (manual check script)

$maxSizeMB = 95
$files = Get-ChildItem -Recurse | Where-Object { $_.Length -gt ($maxSizeMB * 1MB) }

if ($files) {
    Write-Host "WARNING: The following files are larger than $maxSizeMB MB:" -ForegroundColor Red
    foreach ($file in $files) {
        $sizeMB = [math]::Round($file.Length / 1MB, 2)
        Write-Host "  $($file.FullName) - $sizeMB MB"
    }
    Write-Host "Please remove these files from git tracking or use Git LFS."
    exit 1
} else {
    Write-Host "Safety Check Passed: No files larger than $maxSizeMB MB found." -ForegroundColor Green
    exit 0
}
