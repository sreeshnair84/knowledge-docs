"""
Replace broken DOCX iframe embeds in index pages with a simple notice.
The DOCX binary files in this repo are corrupted and cannot be converted,
so we replace the Google Docs Viewer iframes (which never work) with
a styled notice block and a download link.
"""

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent

# Pattern: <iframe src="https://docs.google.com/viewer?url=...docx..."></iframe>
DOCX_IFRAME_PATTERN = re.compile(
    r'<iframe\s+src="https://docs\.google\.com/viewer\?url=[^"]*\.docx[^"]*"[^>]*></iframe>',
    re.IGNORECASE,
)

NOTICE_TEMPLATE = (
    ":::note\n"
    "This document is not yet available as a web page. "
    "Please use the download link below to access the original file.\n"
    ":::"
)


def fix_file(md_path: Path) -> bool:
    content = md_path.read_text(encoding="utf-8")
    if not DOCX_IFRAME_PATTERN.search(content):
        return False

    new_content = DOCX_IFRAME_PATTERN.sub(NOTICE_TEMPLATE, content)
    if new_content != content:
        md_path.write_text(new_content, encoding="utf-8")
        count = len(DOCX_IFRAME_PATTERN.findall(content))
        print(f"  Fixed {count} DOCX iframe(s) in {md_path.relative_to(ROOT)}")
        return True
    return False


def main():
    fixed = 0
    for md_file in sorted(ROOT.rglob("*.md")):
        if fix_file(md_file):
            fixed += 1
    print(f"\nFixed {fixed} file(s)")


if __name__ == "__main__":
    main()
