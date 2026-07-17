<#
.SYNOPSIS
    Runs the full repo maintenance pass in the right order.

.DESCRIPTION
    Safe to run repeatedly — every step here is idempotent or has its own -DryRun.

.PARAMETER CheckOnly
    Detect only, fix nothing; exits with code 1 if issues are found.

.PARAMETER Domain
    Scope structural steps to one section (e.g. ai-protocols).

.EXAMPLE
    .\run_maintenance.ps1
    .\run_maintenance.ps1 -CheckOnly
    .\run_maintenance.ps1 -Domain ai-protocols
    .\run_maintenance.ps1 -CheckOnly -Domain ai-protocols
#>
param(
    [switch]$CheckOnly,
    [string]$Domain = ''
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$RepoRoot = git rev-parse --show-toplevel
if ($LASTEXITCODE -ne 0) { exit 1 }
Set-Location $RepoRoot

$DomainArgs = if ($Domain) { @('--domain', $Domain) } else { @() }

$Consistency = '.agents/skills/knowledge-repo-consistency-audit/scripts'
$Graph       = '.agents/skills/knowledge-repo-graph/scripts'

# ── 1/5  Sidebar integrity ────────────────────────────────────────────────────
Write-Host '############################################'
Write-Host '# 1/5  Sidebar integrity'
Write-Host '############################################'
python "$Consistency/check_sidebar_integrity.py"
$SidebarStatus = $LASTEXITCODE
if ($SidebarStatus -ne 0 -and -not $CheckOnly) {
    Write-Host '--> Auto-fixing unambiguous sidebar references...'
    python "$Consistency/check_sidebar_integrity.py" --fix
}
Write-Host ''

# ── 2/5  Safe structural autofix (H1 demotion) ───────────────────────────────
Write-Host '############################################'
Write-Host '# 2/5  Safe structural autofix (H1 demotion)'
Write-Host '############################################'
if ($CheckOnly) {
    python "$Consistency/autofix_structural.py" --all --dry-run
} else {
    python "$Consistency/autofix_structural.py" --all
}
Write-Host ''

# ── 3/5  Corpus consistency audit ────────────────────────────────────────────
Write-Host '############################################'
Write-Host '# 3/5  Corpus consistency audit'
Write-Host '############################################'
python "$Consistency/audit_corpus.py" --min-severity HIGH @DomainArgs
$AuditStatus = $LASTEXITCODE
Write-Host ''

# ── 4/5  Rebuild the knowledge graph + duplicate clusters ────────────────────
Write-Host '############################################'
Write-Host '# 4/5  Rebuild the knowledge graph + duplicate clusters'
Write-Host '############################################'
python "$Graph/build_graph.py" --sim-threshold 0.3
Write-Host ''

# ── 5/5  Rebuild per-section indexes ─────────────────────────────────────────
Write-Host '############################################'
Write-Host '# 5/5  Rebuild per-section indexes'
Write-Host '############################################'
python "$Graph/build_section_indexes.py"
Write-Host ''

# ── Summary ───────────────────────────────────────────────────────────────────
Write-Host '############################################'
Write-Host '# Summary'
Write-Host '############################################'
Write-Host "Sidebar integrity:              $($SidebarStatus -eq 0 ? 'OK' : 'issues remain — see output above')"
Write-Host "Consistency audit (HIGH+ only): $($AuditStatus -eq 0 ? 'OK' : 'HIGH/CRITICAL findings — see _meta/audit-report.md')"
Write-Host 'Duplicate clusters:  see _meta/duplicate-clusters.md'
Write-Host 'Full audit detail:   _meta/audit-report.md'
Write-Host 'Graph: _meta/graph.json  |  Section indexes: docs/*/_index.json'
Write-Host ''
Write-Host "Review 'git diff' before committing — every fix above is mechanical, but review it anyway."

if ($CheckOnly) {
    exit ($SidebarStatus -eq 0 -and $AuditStatus -eq 0 ? 0 : 1)
}
exit 0
