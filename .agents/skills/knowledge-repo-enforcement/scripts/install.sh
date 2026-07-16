#!/usr/bin/env bash
# Installs the pre-commit hook and GitHub Actions workflow into the current
# repo. Run this once from the repo root after the knowledge-page-authoring
# skill is already installed at .claude/skills/knowledge-page-authoring/.
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

if [[ ! -d ".claude/skills/knowledge-page-authoring" ]]; then
  echo "Warning: .claude/skills/knowledge-page-authoring not found."
  echo "The hook will no-op (not block commits) until that skill is installed."
  echo "Continuing with installation anyway — install the skill when ready."
  echo ""
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

mkdir -p .githooks
cp "$SCRIPT_DIR/pre-commit" .githooks/pre-commit
chmod +x .githooks/pre-commit
git config core.hooksPath .githooks
echo "Installed pre-commit hook to .githooks/pre-commit and set core.hooksPath."

mkdir -p .github/workflows
cp "$SCRIPT_DIR/knowledge-repo-checks.yml" .github/workflows/knowledge-repo-checks.yml
echo "Installed CI workflow to .github/workflows/knowledge-repo-checks.yml."

echo ""
echo "Done. Commit these new files:"
echo "  git add .githooks .github/workflows/knowledge-repo-checks.yml"
echo "  git commit -m 'Add knowledge-repo enforcement: pre-commit hook + CI check'"
echo ""
echo "Note: .githooks/pre-commit and core.hooksPath only take effect on this"
echo "machine's local git config — anyone else who clones the repo needs to"
echo "run 'git config core.hooksPath .githooks' themselves (or re-run this"
echo "installer). The CI workflow, once committed, applies to every PR"
echo "regardless of local setup — that's the real backstop."
