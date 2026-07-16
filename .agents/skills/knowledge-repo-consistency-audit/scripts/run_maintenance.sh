#!/usr/bin/env bash
# Runs the full repo maintenance pass in the right order, so this doesn't
# have to be remembered/re-explained each time. Safe to run repeatedly —
# every step here is idempotent or has its own --dry-run.
#
# Usage:
#   bash run_maintenance.sh                 # detect + fix what's safe, report the rest
#   bash run_maintenance.sh --check-only     # detect only, fix nothing, non-zero exit if issues
#   bash run_maintenance.sh --domain ai-protocols   # scope structural steps to one section
set -uo pipefail
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT" || exit 1

CHECK_ONLY=0
DOMAIN_ARGS=()
for arg in "$@"; do
  case "$arg" in
    --check-only) CHECK_ONLY=1 ;;
    --domain) DOMAIN_NEXT=1 ;;
    *) if [[ "${DOMAIN_NEXT:-0}" == "1" ]]; then DOMAIN_ARGS=(--domain "$arg"); DOMAIN_NEXT=0; fi ;;
  esac
done

CONSISTENCY=".claude/skills/knowledge-repo-consistency-audit/scripts"
GRAPH=".claude/skills/knowledge-repo-graph/scripts"

echo "############################################"
echo "# 1/5  Sidebar integrity"
echo "############################################"
python3 "$CONSISTENCY/check_sidebar_integrity.py"
SIDEBAR_STATUS=$?
if [[ "$SIDEBAR_STATUS" -ne 0 && "$CHECK_ONLY" -eq 0 ]]; then
  echo "--> Auto-fixing unambiguous sidebar references..."
  python3 "$CONSISTENCY/check_sidebar_integrity.py" --fix
fi
echo

echo "############################################"
echo "# 2/5  Safe structural autofix (H1 demotion)"
echo "############################################"
if [[ "$CHECK_ONLY" -eq 1 ]]; then
  python3 "$CONSISTENCY/autofix_structural.py" --all --dry-run
else
  python3 "$CONSISTENCY/autofix_structural.py" --all
fi
echo

echo "############################################"
echo "# 3/5  Corpus consistency audit"
echo "############################################"
python3 "$CONSISTENCY/audit_corpus.py" --min-severity HIGH "${DOMAIN_ARGS[@]}"
AUDIT_STATUS=$?
echo

echo "############################################"
echo "# 4/5  Rebuild the knowledge graph + duplicate clusters"
echo "############################################"
python3 "$GRAPH/build_graph.py" --sim-threshold 0.3
echo

echo "############################################"
echo "# 5/5  Rebuild per-section indexes"
echo "############################################"
python3 "$GRAPH/build_section_indexes.py"
echo

echo "############################################"
echo "# Summary"
echo "############################################"
echo "Sidebar integrity: $([[ $SIDEBAR_STATUS -eq 0 ]] && echo OK || echo 'issues remain — see output above')"
echo "Consistency audit (HIGH+ only): $([[ $AUDIT_STATUS -eq 0 ]] && echo OK || echo 'HIGH/CRITICAL findings — see _meta/audit-report.md')"
echo "Duplicate clusters: see _meta/duplicate-clusters.md"
echo "Full audit detail: _meta/audit-report.md"
echo "Graph: _meta/graph.json  |  Section indexes: docs/*/_index.json"
echo
echo "Review 'git diff' before committing — every fix above is mechanical, but review it anyway."

if [[ "$CHECK_ONLY" -eq 1 ]]; then
  [[ "$SIDEBAR_STATUS" -eq 0 && "$AUDIT_STATUS" -eq 0 ]]
  exit $?
fi
exit 0
