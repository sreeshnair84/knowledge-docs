#!/usr/bin/env python3
"""
PostToolUse hook: lints a docs/**/*.md page immediately after Write/Edit
touches it, instead of leaving structural/frontmatter problems (missing
doc_type, missing required sections, etc.) to be discovered later at
`git commit` time by the pre-commit hook.

Registered in .claude/settings.json under hooks.PostToolUse (matcher
"Write|Edit"). Reads the standard hook JSON on stdin; if the touched file
is under docs/ and ends in .md, runs lint_page.py against it and, on
failure, emits {"decision": "block", "reason": <lint output>} so the
issues are fed back to the model in the same turn it wrote the file.

Never blocks the tool call itself (PostToolUse can't undo a write) and
never raises on unexpected input — a hook that crashes the harness is
worse than a hook that silently no-ops.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parents[3]  # scripts/ -> knowledge-page-authoring/ -> skills/ -> .agents/ -> repo root
LINT = SCRIPT_DIR / "lint_page.py"

DOCS_MD = re.compile(r"^docs/.+\.md$")


def main():
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0

    tool_input = payload.get("tool_input") or {}
    tool_response = payload.get("tool_response") or {}
    file_path = tool_input.get("file_path") or tool_response.get("filePath")
    if not file_path:
        return 0

    try:
        rel = Path(file_path).resolve().relative_to(REPO_ROOT).as_posix()
    except (ValueError, OSError):
        return 0

    if not DOCS_MD.match(rel):
        return 0

    if not LINT.exists():
        return 0

    result = subprocess.run(
        [sys.executable, str(LINT), str(REPO_ROOT / rel)],
        capture_output=True, text=True,
    )

    if result.returncode != 0:
        reason = (
            f"knowledge-page-authoring lint failed for {rel} "
            f"(caught at write time, not commit time — fix now, then re-run "
            f"lint_page.py with --type before finishing):\n\n"
            f"{result.stdout.strip()}"
        )
        print(json.dumps({"decision": "block", "reason": reason}))

    return 0


if __name__ == "__main__":
    sys.exit(main())
