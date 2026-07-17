#Requires -Version 5.1
<#
.SYNOPSIS
    Installs the pre-commit hook and GitHub Actions workflow into the current repo.
    PowerShell equivalent of install.sh — run this on Windows from the repo root.

.NOTES
    Run this once from the repo root after the knowledge-page-authoring skill is
    installed at .claude/skills/knowledge-page-authoring/. Then commit the generated
    .githooks/ and .github/workflows/ files so CI protects every PR regardless of
    local git config.
#>
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Resolve repo root (git rev-parse equivalent)
$repoRoot = git rev-parse --show-toplevel 2>$null
if (-not $repoRoot) { throw "Not inside a git repository." }
$repoRoot = $repoRoot.Trim()
Set-Location $repoRoot

# Warn if knowledge-page-authoring skill is missing (hook will no-op without it)
$skillPath = Join-Path $repoRoot '.claude\skills\knowledge-page-authoring'
if (-not (Test-Path $skillPath)) {
    Write-Warning ".claude\skills\knowledge-page-authoring not found."
    Write-Warning "The hook will no-op (not block commits) until that skill is installed."
    Write-Warning "Continuing with installation anyway — install the skill when ready."
    Write-Host ""
}

# $PSScriptRoot is the directory containing this script
$scriptDir = $PSScriptRoot

# 1. Install pre-commit hook
$hooksDir = Join-Path $repoRoot '.githooks'
New-Item -ItemType Directory -Force -Path $hooksDir | Out-Null
Copy-Item -Path (Join-Path $scriptDir 'pre-commit') -Destination (Join-Path $hooksDir 'pre-commit') -Force
git config core.hooksPath .githooks
Write-Host "Installed pre-commit hook to .githooks\pre-commit and set core.hooksPath."

# 2. Install GitHub Actions workflow
$workflowsDir = Join-Path $repoRoot '.github\workflows'
New-Item -ItemType Directory -Force -Path $workflowsDir | Out-Null
Copy-Item -Path (Join-Path $scriptDir 'knowledge-repo-checks.yml') `
          -Destination (Join-Path $workflowsDir 'knowledge-repo-checks.yml') -Force
Write-Host "Installed CI workflow to .github\workflows\knowledge-repo-checks.yml."

Write-Host ""
Write-Host "Done. Commit these new files:"
Write-Host "  git add .githooks .github/workflows/knowledge-repo-checks.yml"
Write-Host "  git commit -m 'Add knowledge-repo enforcement: pre-commit hook + CI check'"
Write-Host ""
Write-Host "Note: .githooks\pre-commit and core.hooksPath only take effect on this"
Write-Host "machine's local git config — anyone else who clones the repo needs to"
Write-Host "run 'git config core.hooksPath .githooks' themselves (or re-run this"
Write-Host "installer). The CI workflow, once committed, applies to every PR"
Write-Host "regardless of local setup — that's the real backstop."
