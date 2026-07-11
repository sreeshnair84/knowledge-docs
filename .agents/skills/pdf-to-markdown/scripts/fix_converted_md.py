#!/usr/bin/env python3
"""
Fix formatting artifacts in converted-PDF markdown files.

Operations:
  1. Remove running page headers/footers (lines appearing verbatim 3+ times)
  2. Fix frontmatter spill (YAML keys that leaked into body, ending with ---)
  3. Remove pre-H1 junk artifacts (HTML comments, spaced caps, bold series banners, H4-H6 page fragments)
  4. Collapse 3+ consecutive blank lines to 2
"""
import re
import sys
from pathlib import Path
from collections import Counter

DOCS_DIR = Path("docs")

# ── helpers ──────────────────────────────────────────────────────────────────

def parse_frontmatter(content: str) -> tuple[str, str]:
    """Return (frontmatter, body). Frontmatter includes both --- delimiters."""
    if not content.startswith("---\n"):
        return "", content
    end = content.find("\n---\n", 4)
    if end == -1:
        return "", content
    split = end + 5  # after '\n---\n'
    return content[:split], content[split:]


def is_table_row(line: str) -> bool:
    s = line.strip()
    return s.startswith("|") or re.match(r"^[\-|=]{3,}$", s) is not None


def inside_code_fence(lines: list[str], idx: int) -> bool:
    """True if line at idx is inside a ``` fence."""
    fence_count = sum(1 for l in lines[:idx] if l.strip().startswith("```"))
    return fence_count % 2 == 1


# ── operations ───────────────────────────────────────────────────────────────

def strip_ctrl(s: str) -> str:
    """Strip leading/trailing ASCII control characters (PDF OCR artifacts like \x01)."""
    return re.sub(r'^[\x00-\x1f]+|[\x00-\x1f]+$', '', s)


def fix_frontmatter_spill(body: str) -> tuple[str, int]:
    """
    Remove a second 'orphan' frontmatter block at the very start of the body.
    Pattern: one or more   key: "value"  lines  followed by a standalone ---.
    Also strips leading control-character artifacts (\x01 etc.) from lines.
    Returns (fixed_body, lines_removed).
    """
    lines = body.split("\n")
    yaml_key = re.compile(r'^[a-z_]+:\s*')
    i = 0
    # Skip leading blank/whitespace-only lines
    while i < len(lines) and not lines[i].strip():
        i += 1

    if i >= len(lines):
        return body, 0

    # Collect a run of yaml-looking lines (allow leading ctrl chars on each)
    spill_lines = []
    while i < len(lines) and strip_ctrl(lines[i].strip()) != "---":
        s = strip_ctrl(lines[i].strip())
        if s == "" or yaml_key.match(s):
            spill_lines.append(i)
            i += 1
        else:
            break  # non-yaml content → not a spill

    # Must end with ---
    if i < len(lines) and strip_ctrl(lines[i].strip()) == "---" and len(spill_lines) >= 1:
        removed = spill_lines + [i]
        keep = set(range(len(lines))) - set(removed)
        return "\n".join(lines[j] for j in sorted(keep)), len(removed)

    return body, 0


def remove_running_headers(body: str, min_count: int = 5) -> tuple[str, list[str]]:
    """
    Detect lines that appear verbatim ≥ min_count times; remove them.
    Skips table rows, code-fence lines, and markdown headings (# …).
    """
    lines = body.split("\n")
    counter: Counter = Counter()

    for idx, line in enumerate(lines):
        s = line.strip()
        if not s:
            continue
        if len(s) < 8 or len(s) > 200:
            continue
        if is_table_row(line):
            continue
        if s.startswith("#"):      # markdown headings
            continue
        if s.startswith(">"):      # blockquotes / transcript attributions
            continue
        if s.startswith(":::"):    # Docusaurus admonitions
            continue
        if s.startswith("```"):    # code fence delimiters
            continue
        if re.match(r"^[-*+]\s", s):     # list items (may repeat across sections)
            continue
        if re.match(r"^\d+\.\s", s):     # numbered list items
            continue
        if re.match(r"^\*\*Answer:", s, re.I):   # quiz/exam answer labels
            continue
        if inside_code_fence(lines, idx):
            continue
        counter[s] += 1

    to_remove = {k for k, v in counter.items() if v >= min_count}

    cleaned = [
        line for line in lines
        if line.strip() not in to_remove
    ]
    return "\n".join(cleaned), sorted(to_remove)


# Patterns that identify artifact lines before the first H1 heading
# Only match artifacts in the first N body lines (page-1 header area).
# Keeping this narrow avoids false positives in TOC sections.
_PREAMBLE_SCAN_LINES = 20

_PRE_H1_ARTIFACTS = [
    re.compile(r"^<!--.*-->$"),                       # HTML conversion comments
    re.compile(r"^_[^_\n]+_\s*$"),                    # _italic standalone line_
    re.compile(r"^[A-Z]( [A-Z]){5,}\s*$"),           # P R I N C I P A L … (spaced caps)
    re.compile(r"^\*\*PA\s*R\s*T\s+\d+", re.I),      # **PA R T 4 O F 4**
    re.compile(r"^VOLUME\s+\d+\s+OF\s+\d+", re.I),   # VOLUME N OF N
    re.compile(r"^PART\s+\d+\s+OF\s+\d+", re.I),     # PART N OF N
    re.compile(r"^#{5,6}\s+\*\*"),                    # H5–H6 bold (page-level sub-banners only)
]


def remove_pre_h1_artifacts(body: str) -> tuple[str, int]:
    """
    Remove junk artifact lines that appear in the first PREAMBLE_SCAN_LINES
    of the body (the PDF page-1 header zone), before the first H1 or H2 heading.
    Deliberately does NOT scan the whole document to avoid false positives
    inside TOC sections.
    """
    lines = body.split("\n")
    # Find first real heading (H1 or H2)
    heading_idx = next(
        (i for i, l in enumerate(lines) if re.match(r"^#{1,2}\s", l)), None
    )
    scan_limit = min(
        _PREAMBLE_SCAN_LINES,
        heading_idx if heading_idx is not None else _PREAMBLE_SCAN_LINES,
    )

    removed_count = 0
    result = []
    for i, line in enumerate(lines):
        if i < scan_limit:
            s = line.strip()
            if not s:
                continue  # drop blank lines in preamble
            if any(p.match(s) for p in _PRE_H1_ARTIFACTS):
                removed_count += 1
                continue
        result.append(line)

    return "\n".join(result), removed_count


def clean_blank_lines(body: str) -> str:
    """Collapse 3+ consecutive blank lines to exactly 2."""
    return re.sub(r"\n{3,}", "\n\n", body)


# ── main per-file fix ─────────────────────────────────────────────────────────

def fix_file(filepath: Path, dry_run: bool = False) -> dict:
    content = filepath.read_text(encoding="utf-8", errors="replace")
    fm, body = parse_frontmatter(content)

    # Strip ASCII control chars (PDF OCR artifacts: \x01, \x02, etc.) from every line
    body = "\n".join(
        re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", line)
        for line in body.split("\n")
    )

    body, spill_removed = fix_frontmatter_spill(body)
    body, running_headers = remove_running_headers(body)
    body, pre_h1_removed = remove_pre_h1_artifacts(body)
    body = clean_blank_lines(body)

    new_content = fm + body
    changed = new_content != content

    if changed and not dry_run:
        filepath.write_text(new_content, encoding="utf-8")

    return {
        "path": str(filepath.relative_to(DOCS_DIR)),
        "changed": changed,
        "spill_removed": spill_removed,
        "running_headers": running_headers,
        "pre_h1_removed": pre_h1_removed,
    }


# ── entry point ───────────────────────────────────────────────────────────────

def main():
    dry_run = "--dry-run" in sys.argv
    verbose = "--verbose" in sys.argv or "-v" in sys.argv

    if dry_run:
        print("DRY RUN — no files will be written\n")

    targets = []
    for f in sorted(DOCS_DIR.rglob("*.md")):
        try:
            text = f.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        # Process converted files; frontmatter-spill fix also runs on native-md
        # files that have the telltale orphan-YAML pattern
        is_converted = (
            "source_type: converted-pdf" in text
            or "source_type: converted-docx" in text
        )
        has_spill = bool(
            re.search(r"\n---\n[\n\x00-\x1f]*[a-z_]+:\s", text)  # orphan YAML block (allows ctrl chars)
        )
        if is_converted or has_spill:
            targets.append(f)

    print(f"Scanning {len(targets)} files...\n")

    total_changed = 0
    total_headers_removed = 0

    for f in targets:
        result = fix_file(f, dry_run=dry_run)

        if result["changed"]:
            total_changed += 1
            rh_count = len(result["running_headers"])
            total_headers_removed += rh_count
            print(
                f"  FIXED  {result['path']}"
                f"  [headers={rh_count}"
                f"  spill={result['spill_removed']}"
                f"  pre_h1={result['pre_h1_removed']}]"
            )
            if verbose and result["running_headers"]:
                for h in result["running_headers"][:3]:
                    print(f"         stripped: {h[:100]}")
        elif verbose:
            print(f"  OK     {result['path']}")

    print(f"\n{'DRY RUN — ' if dry_run else ''}Done.")
    print(f"  Files modified  : {total_changed}/{len(targets)}")
    print(f"  Running headers removed (total distinct): {total_headers_removed}")


if __name__ == "__main__":
    main()
