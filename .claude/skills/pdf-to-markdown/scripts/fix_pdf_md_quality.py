"""
Post-process PDF-converted Markdown files to fix common quality issues:
1. Remove repeated running headers/footers (appears on every page)
2. Collapse excessive blank lines
3. Fix page-number-only lines
4. Fix title extraction in frontmatter when the actual title wasn't found
"""

import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).parent.parent

# Lines that are definitely structural and should never be removed
KEEP_PATTERNS = [
    re.compile(r"^\|[\s\-|]+\|$"),  # table separator rows
    re.compile(r"^#{1,6}\s"),  # headings
    re.compile(r"^-\s"),  # list items
    re.compile(r"^\d+\.\s"),  # numbered list items
    re.compile(r"^\|"),  # table rows
]

PAGE_NUM_RE = re.compile(r"^\s*(?:Page\s*)?\d+\s*$", re.IGNORECASE)  # bare page numbers: "1", "Page 1"


def is_structural(line: str) -> bool:
    stripped = line.strip()
    return any(p.match(stripped) for p in KEEP_PATTERNS)


def find_repeats(lines: list[str], threshold: int) -> set[str]:
    """Find non-structural lines that repeat more than threshold times."""
    counts = Counter(line.strip() for line in lines if line.strip() and not is_structural(line))
    return {text for text, count in counts.items() if count >= threshold and len(text) > 5}


def clean_body(body: str) -> str:
    lines = body.split("\n")

    # Any non-structural line appearing more than 4 times is likely a running header/footer
    threshold = 4
    repeats = find_repeats(lines, threshold)

    cleaned = []
    for line in lines:
        stripped = line.strip()
        # Remove page-number-only lines
        if PAGE_NUM_RE.match(stripped):
            continue
        # Remove running header/footer lines
        if stripped in repeats:
            continue
        cleaned.append(line)

    # Collapse 3+ blank lines to 2
    result = re.sub(r"\n{3,}", "\n\n", "\n".join(cleaned))
    return result.strip()


def fix_frontmatter_title(frontmatter: str, body: str, filename: str) -> str:
    """If title is just the filename stem (poorly derived), try to get it from first heading."""
    m_title = re.search(r'^title:\s*"([^"]+)"', frontmatter, re.MULTILINE)
    if not m_title:
        return frontmatter

    current_title = m_title.group(1)
    # Detect a stem-derived title (all caps or title-case with underscores)
    stem_title = filename.replace("_", " ").replace("-", " ").title()
    if current_title.lower() not in [stem_title.lower(), filename.lower()]:
        return frontmatter  # already has a real title

    # Try to get first meaningful heading from body
    for match in re.finditer(r"^#{1,3}\s+\*{0,2}(.+?)\*{0,2}\s*$", body, re.MULTILINE):
        candidate = match.group(1).strip()
        # Skip if it looks like a page number or very short
        if len(candidate) > 5 and not re.match(r"^\d+$", candidate):
            new_title = candidate[:120]  # cap length
            return frontmatter.replace(
                f'title: "{current_title}"',
                f'title: "{new_title}"',
            )
    return frontmatter


def process_file(md_path: Path) -> bool:
    content = md_path.read_text(encoding="utf-8", errors="replace")

    # Split frontmatter from body
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            frontmatter = "---" + parts[1] + "---"
            body = parts[2]
        else:
            frontmatter, body = "", content
    else:
        frontmatter, body = "", content

    original_body = body
    body = clean_body(body)
    if frontmatter:
        frontmatter = fix_frontmatter_title(frontmatter, body, md_path.stem)

    new_content = (frontmatter + "\n\n" + body + "\n") if frontmatter else (body + "\n")

    if new_content == content:
        return False

    md_path.write_text(new_content, encoding="utf-8")
    removed = len(original_body.split("\n")) - len(body.split("\n"))
    print(f"  Fixed {md_path.name} (removed {removed} lines)")
    return True


def main():
    # Only process files that are PDF-converted (check frontmatter)
    fixed = 0
    for md_path in sorted(ROOT.rglob("*.md")):
        content = md_path.read_text(encoding="utf-8", errors="replace")
        if "source_type: converted-pdf" not in content and "source_type: converted-docx" not in content:
            continue
        if process_file(md_path):
            fixed += 1
    print(f"\nFixed {fixed} files")


if __name__ == "__main__":
    main()
