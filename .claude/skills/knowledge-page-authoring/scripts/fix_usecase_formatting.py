"""
Fix formatting issues in remaining ai-usecases files:
  - 01_aviation through 04_manufacturing: strip <u> HTML tags
  - 05-10 industry files: check for and strip any HTML tags
  - CEO agent files: merge broken multi-column PDF paragraph fragments
"""

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
DOCS = ROOT / "docs/ai-usecases"

# ──────────────────────────────────────────────────────────────────────────────
# 1. Strip HTML inline tags from the industry files (01–10)
# ──────────────────────────────────────────────────────────────────────────────

INDUSTRY_FILES = [
    "01_aviation.md",
    "02_banking.md",
    "03_healthcare.md",
    "04_manufacturing.md",
    "05_telecom.md",
    "06_government.md",
    "07_pharma.md",
    "08_energy.md",
    "09_logistics.md",
    "10_media.md",
]

HTML_TAG_RE = re.compile(r"</?(?:u|b|i|strong|em|span[^>]*)>", re.IGNORECASE)


def fix_html_tags(content: str) -> str:
    """Strip inline HTML tags, converting <b>/<strong> to ** and <i>/<em> to *."""
    # Convert bold tags to markdown bold
    content = re.sub(r"<(?:b|strong)>(.+?)</(?:b|strong)>", r"**\1**", content, flags=re.DOTALL)
    # Convert italic tags to markdown italic
    content = re.sub(r"<(?:i|em)>(.+?)</(?:i|em)>", r"*\1*", content, flags=re.DOTALL)
    # Strip remaining HTML tags (u, span, etc.)
    content = HTML_TAG_RE.sub("", content)
    return content


def clean_toc_section(content: str) -> str:
    """Remove the <u>-tagged table of contents block at the top of the file body.

    The ToC is a list of underlined section references that add no value once the
    HTML underline markup is stripped — they just become repeated plain-text headings.
    Replace the ToC block with a brief intro note instead.
    """
    # After stripping <u> tags, the ToC lines look like:
    # 1. Executive Summary
    # 2. Client Background
    # etc.
    # They appear before the actual # 1. Executive Summary heading.
    # Strategy: find the first real H1 heading (# **) and remove everything
    # from the frontmatter end to that heading if it's just a list of ToC entries.
    return content


# ──────────────────────────────────────────────────────────────────────────────
# 2. Fix CEO Agent files — merge broken paragraph fragments
# ──────────────────────────────────────────────────────────────────────────────

CEO_FILES = [
    "CEO_Agent_Solution_Blueprint.md",
    "CEO_Agent_Failure_Modes_Governance_Harness.md",
    "ceo_agent_pitch.md",
]


def merge_broken_paragraphs(content: str) -> str:
    """Join lines that were broken mid-sentence due to multi-column PDF layout."""
    lines = content.split("\n")
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Don't merge: blank lines, headings, list items, frontmatter, admonitions, code fences
        if (
            not line.strip()
            or line.startswith("#")
            or line.startswith(">")
            or line.startswith("-")
            or line.startswith("*")
            or line.startswith("|")
            or line.startswith("---")
            or line.startswith("```")
            or line.startswith(":::")
        ):
            out.append(line)
            i += 1
            continue

        # Check if this line should merge with the next:
        # Merge if: current line doesn't end with sentence-ending punctuation
        # AND next line exists, is non-blank, and doesn't start a new structure
        while (
            i + 1 < len(lines)
            and line.strip()
            and not re.search(r"[.?!:]\s*$", line.rstrip())
            and lines[i + 1].strip()
            and not lines[i + 1].startswith("#")
            and not lines[i + 1].startswith(">")
            and not lines[i + 1].startswith("-")
            and not lines[i + 1].startswith("*")
            and not lines[i + 1].startswith("|")
            and not lines[i + 1].startswith("```")
            and not lines[i + 1].startswith(":::")
            # Don't merge if next line looks like a standalone metric (number + unit)
            and not re.match(r"^[\d$€£%↑↓]+[–\-]?[\d]* ?(?:hrs?|days?|weeks?|months?|M|B|%|x)\b", lines[i + 1].strip())
        ):
            line = line.rstrip() + " " + lines[i + 1].lstrip()
            i += 1

        out.append(line)
        i += 1
    return "\n".join(out)


def fix_metric_callouts(content: str) -> str:
    """Convert standalone metric lines (numbers/percentages) into bold inline text.

    PDF multi-column metric boxes linearize as:
      30–75 hrs
      reclaimed per week across a firm's top 10–15
      executives (3–5 hrs each)

    These become: **30–75 hrs** reclaimed per week...
    """
    lines = content.split("\n")
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Detect a standalone metric line: starts with a number/symbol, short (< 20 chars)
        stripped = line.strip()
        if (
            len(stripped) < 25
            and re.match(r"^[\d$€£↑↓~≈]{1}[\d$€£%,.–\-/x ]*(?:hrs?|days?|%|M|B|x|times?|hrs?)?$", stripped)
            and stripped  # not blank
            and i + 1 < len(lines)
            and lines[i + 1].strip()
        ):
            # Merge metric with next descriptor line as bold
            descriptor = lines[i + 1].strip()
            out.append(f"**{stripped}** {descriptor}")
            i += 2
            continue
        out.append(line)
        i += 1
    return "\n".join(out)


def fix_numbered_section_headers(content: str) -> str:
    """Convert bare numbered lines like '1.' or '1.\nTitle' to ## headers."""
    # Pattern: a line that is just a number followed by period (e.g., "1.")
    content = re.sub(
        r"^(\d+)\.\n([A-Z][^\n]+)$",
        r"## \1. \2",
        content,
        flags=re.MULTILINE,
    )
    return content


# ──────────────────────────────────────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────────────────────────────────────


def main():
    changed = []

    # Industry files
    for fname in INDUSTRY_FILES:
        path = DOCS / fname
        if not path.exists():
            print(f"  SKIP (missing): {fname}")
            continue
        original = path.read_text(encoding="utf-8", errors="replace")
        content = fix_html_tags(original)
        content = re.sub(r"\n{4,}", "\n\n\n", content)
        if content != original:
            path.write_text(content, encoding="utf-8")
            print(f"  fixed HTML tags: {fname}")
            changed.append(fname)
        else:
            print(f"  no change: {fname}")

    # CEO agent files
    for fname in CEO_FILES:
        path = DOCS / fname
        if not path.exists():
            print(f"  SKIP (missing): {fname}")
            continue
        original = path.read_text(encoding="utf-8", errors="replace")
        # Split off frontmatter
        if original.startswith("---"):
            parts = original.split("---", 2)
            if len(parts) == 3:
                fm, body = parts[1], parts[2]
                body = fix_html_tags(body)
                body = merge_broken_paragraphs(body)
                body = fix_metric_callouts(body)
                body = fix_numbered_section_headers(body)
                body = re.sub(r"\n{4,}", "\n\n\n", body)
                content = f"---{fm}---{body}"
            else:
                content = original
        else:
            content = original
        if content != original:
            path.write_text(content, encoding="utf-8")
            print(f"  fixed formatting: {fname}")
            changed.append(fname)
        else:
            print(f"  no change: {fname}")

    print(f"\nTotal changed: {len(changed)}")


if __name__ == "__main__":
    main()
