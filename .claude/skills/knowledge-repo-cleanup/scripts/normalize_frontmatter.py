"""
Phase 4: Normalize frontmatter on all live Markdown files.
Adds missing required fields without overwriting existing ones.
Writes a changes log to stdout and to _meta/taxonomy-changes.md.
"""

import re
import subprocess
from pathlib import Path

REPO_ROOT = Path(__file__).parents[4]
DOCS_DIR = REPO_ROOT / "docs"
TAXONOMY_LOG = REPO_ROOT / "_meta" / "taxonomy-changes.md"

TODAY = "2026-07-10"
LAST_REVIEWED = "2026-07-10"

REQUIRED_FIELDS = [
    "title",
    "date_created",
    "last_reviewed",
    "status",
    "supersedes",
    "source_type",
    "source_file",
    "tags",
]

DEFAULTS = {
    "last_reviewed": LAST_REVIEWED,
    "status": "current",
    "supersedes": '""',
    "source_type": "native-md",
    "source_file": '""',
    "tags": "[]",
}


def git_file_date(fpath: Path) -> str:
    """Return oldest git commit date for file as YYYY-MM-DD, or TODAY."""
    try:
        result = subprocess.run(
            ["git", "log", "--follow", "--format=%as", "--", str(fpath)], capture_output=True, text=True, cwd=REPO_ROOT
        )
        lines = [line.strip() for line in result.stdout.strip().splitlines() if line.strip()]
        if lines:
            return lines[-1]  # oldest commit
    except Exception:
        pass
    return TODAY


def extract_title_from_body(body: str) -> str:
    """Extract first H1 from markdown body."""
    for line in body.splitlines():
        m = re.match(r"^#\s+(.+)", line)
        if m:
            return m.group(1).strip()
    return ""


def parse_frontmatter(text: str):
    """Return (fm_dict, fm_raw, body) or (None, None, text) if no frontmatter."""
    if not text.startswith("---"):
        return None, None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, None, text
    fm_raw = text[3:end].strip()
    body = text[end + 4 :].lstrip("\r\n")
    # Parse fm_raw into a simple dict (preserve order, raw values)
    fm_dict = {}
    for line in fm_raw.splitlines():
        m = re.match(r"^(\w[\w_-]*):\s*(.*)", line)
        if m:
            fm_dict[m.group(1)] = m.group(2).strip()
    return fm_dict, fm_raw, body


def reconstruct_frontmatter(fm_dict: dict) -> str:
    lines = []
    for k, v in fm_dict.items():
        lines.append(f"{k}: {v}")
    return "---\n" + "\n".join(lines) + "\n---\n\n"


def normalize_file(fpath: Path) -> list[str]:
    """Normalize frontmatter. Returns list of changes made."""
    text = fpath.read_text(encoding="utf-8", errors="replace")
    fm_dict, fm_raw, body = parse_frontmatter(text)

    changes = []

    if fm_dict is None:
        # No frontmatter at all — build from scratch
        fm_dict = {}
        changes.append("added frontmatter block")

    added_fields = []

    # title
    if not fm_dict.get("title"):
        t = extract_title_from_body(body)
        if not t:
            t = fpath.stem.replace("-", " ").replace("_", " ").title()
        fm_dict["title"] = f'"{t}"'
        added_fields.append("title")

    # date_created
    if not fm_dict.get("date_created"):
        fm_dict["date_created"] = git_file_date(fpath)
        added_fields.append("date_created")

    # last_reviewed — always update to today
    if fm_dict.get("last_reviewed") != LAST_REVIEWED:
        changes.append(f"last_reviewed -> {LAST_REVIEWED}")
        fm_dict["last_reviewed"] = LAST_REVIEWED

    # remaining required fields
    for field in ["status", "supersedes", "source_type", "source_file", "tags"]:
        if not fm_dict.get(field):
            fm_dict[field] = DEFAULTS[field]
            added_fields.append(field)

    if added_fields:
        changes.append(f"added: {', '.join(added_fields)}")

    if not changes:
        return []  # nothing changed

    new_text = reconstruct_frontmatter(fm_dict) + body
    fpath.write_text(new_text, encoding="utf-8")
    return changes


def main():
    changed_files = []
    skipped = 0

    md_files = sorted(DOCS_DIR.rglob("*.md"))
    # Exclude archive directory
    md_files = [f for f in md_files if "archive" not in f.parts]

    total = len(md_files)
    print(f"Scanning {total} markdown files...", flush=True)

    for i, fpath in enumerate(md_files, 1):
        rel = fpath.relative_to(REPO_ROOT)
        changes = normalize_file(fpath)
        if changes:
            changed_files.append((str(rel), changes))
            print(f"  [{i:3d}/{total}] UPDATED {rel}: {'; '.join(changes)}", flush=True)
        else:
            skipped += 1
            if i % 50 == 0:
                print(f"  [{i:3d}/{total}] ... (no changes needed so far for batch)", flush=True)

    print(f"\nDone. Updated {len(changed_files)} files, {skipped} already complete.", flush=True)

    # Write taxonomy-changes.md
    log_lines = [
        "---",
        'title: "Taxonomy Changes — Phase 4"',
        f"date_created: {TODAY}",
        f"last_reviewed: {TODAY}",
        "status: current",
        'supersedes: ""',
        "source_type: native-md",
        'source_file: ""',
        "tags: []",
        "---",
        "",
        "# Taxonomy Changes — Phase 4",
        "",
        f"Generated: {TODAY}",
        "",
        f"Total files scanned: {total}",
        f"Files updated: {len(changed_files)}",
        f"Files already complete: {skipped}",
        "",
        "## Changed Files",
        "",
    ]
    for rel, changes in changed_files:
        log_lines.append(f"- `{rel}`: {'; '.join(changes)}")

    TAXONOMY_LOG.write_text("\n".join(log_lines) + "\n", encoding="utf-8")
    print(f"Wrote {TAXONOMY_LOG}", flush=True)


if __name__ == "__main__":
    main()
