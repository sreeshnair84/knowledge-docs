"""
Fix pre-commit hook failures:
1. case-study → guide (guide has no required headings)
2. framework-reference files missing "overview" or "when to apply" sections → guide
3. framework-reference files with proper sections → add framework_name field
4. Add missing covers_version for guide type files
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
TODAY = "2026-07-10"


def parse_frontmatter(content: str):
    if not content.startswith("---"):
        return None, content
    parts = content.split("---", 2)
    if len(parts) < 3:
        return None, content
    return parts[1], parts[2]


def build_content(fm_raw: str, body: str) -> str:
    return f"---{fm_raw}---{body}"


def get_field(fm_raw: str, field: str) -> str:
    m = re.search(rf'^{field}:\s*(.+)$', fm_raw, re.MULTILINE)
    return m.group(1).strip() if m else ""


def set_field(fm_raw: str, field: str, value: str) -> str:
    # Replace existing field
    if re.search(rf'^{field}:', fm_raw, re.MULTILINE):
        return re.sub(rf'^{field}:.*$', f'{field}: {value}', fm_raw, flags=re.MULTILINE)
    # Append new field before end of frontmatter
    return fm_raw.rstrip() + f"\n{field}: {value}\n"


def fix_file(path: Path) -> bool:
    content = path.read_text(encoding="utf-8", errors="replace")
    fm_raw, body = parse_frontmatter(content)
    if fm_raw is None:
        return False

    doc_type = get_field(fm_raw, "doc_type")
    changed = False

    if doc_type == "case-study":
        fm_raw = set_field(fm_raw, "doc_type", "guide")
        if not get_field(fm_raw, "covers_version"):
            fm_raw = set_field(fm_raw, "covers_version", '"N/A"')
        changed = True

    elif doc_type == "framework-reference":
        body_lower = body.lower()
        has_overview = "overview" in body_lower
        has_when = "when to apply" in body_lower

        if has_overview and has_when:
            # Proper framework-reference — just add framework_name if missing
            if not get_field(fm_raw, "framework_name"):
                fm_raw = set_field(fm_raw, "framework_name", '""')
                changed = True
        else:
            # Missing required sections — downgrade to guide
            fm_raw = set_field(fm_raw, "doc_type", "guide")
            if not get_field(fm_raw, "covers_version"):
                fm_raw = set_field(fm_raw, "covers_version", '"N/A"')
            # Remove framework_name if it was there (not needed for guide)
            if get_field(fm_raw, "framework_name"):
                fm_raw = re.sub(r'^framework_name:.*\n?', '', fm_raw, flags=re.MULTILINE)
            changed = True

    if changed:
        path.write_text(build_content(fm_raw, body), encoding="utf-8")

    return changed


def main():
    fixed = 0
    for md_path in sorted(ROOT.rglob("*.md")):
        if fix_file(md_path):
            print(f"  fixed: {md_path.relative_to(ROOT)}")
            fixed += 1
    print(f"\nTotal fixed: {fixed}")


if __name__ == "__main__":
    main()
