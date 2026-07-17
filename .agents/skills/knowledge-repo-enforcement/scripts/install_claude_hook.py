#!/usr/bin/env python3
"""
Merge the write-time lint PostToolUse hook into .claude/settings.json.

This is the third enforcement layer alongside the pre-commit hook and CI
workflow: it runs knowledge-page-authoring's lint_page.py right after
Claude writes or edits a docs/**/*.md page, so structural/frontmatter
problems (missing doc_type, missing required sections, etc.) are fed back
to the model in the same turn it created the file — instead of surfacing
for the first time at `git commit`.

Idempotent: safe to re-run. Merges into any existing hooks/settings rather
than overwriting the file, and skips if an equivalent hook is already
registered.
"""
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[4]  # scripts/ -> knowledge-repo-enforcement/ -> skills/ -> .agents/ -> repo root
SETTINGS_PATH = REPO_ROOT / ".claude" / "settings.json"
HOOK_COMMAND = "python3 .agents/skills/knowledge-page-authoring/scripts/post_write_lint_hook.py"


def main():
    if SETTINGS_PATH.exists():
        settings = json.loads(SETTINGS_PATH.read_text(encoding="utf-8"))
    else:
        settings = {}
        SETTINGS_PATH.parent.mkdir(parents=True, exist_ok=True)

    hooks = settings.setdefault("hooks", {})
    post_tool_use = hooks.setdefault("PostToolUse", [])

    for entry in post_tool_use:
        for h in entry.get("hooks", []):
            if h.get("type") == "command" and h.get("command") == HOOK_COMMAND:
                print(f"Already installed in {SETTINGS_PATH} — nothing to do.")
                return 0

    post_tool_use.append({
        "matcher": "Write|Edit",
        "hooks": [
            {
                "type": "command",
                "command": HOOK_COMMAND,
                "statusMessage": "Linting docs page...",
            }
        ],
    })

    SETTINGS_PATH.write_text(json.dumps(settings, indent=2) + "\n", encoding="utf-8")
    print(f"Installed write-time lint hook into {SETTINGS_PATH}.")
    print("Reload it in this session via the /hooks menu (or restart) for it to take effect immediately.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
