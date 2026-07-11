"""
The DOCX iframes were earlier replaced with :::note blocks.
Now that the DOCX files have been converted to MD, replace those note blocks
with proper Markdown links to the converted pages.
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent

# Pattern for the details+note block left by fix_docx_iframes.py
DETAILS_NOTE_RE = re.compile(
    r'<details>\s*\n'
    r'<summary>([^<]+)</summary>\s*\n'
    r':::note\n.*?:::\s*\n'
    r'(?:<p><a href="([^"]*)" download>([^<]*)</a></p>\s*\n)?'
    r'</details>',
    re.DOTALL,
)


def fix_file(md_path: Path) -> int:
    content = md_path.read_text(encoding="utf-8")
    count = 0

    def replacer(m: re.Match) -> str:
        nonlocal count
        summary = m.group(1).strip()
        download_href = m.group(2) or ""
        download_label = m.group(3) or "Download"

        # Derive the DOCX filename from the download href or summary
        docx_name = Path(download_href).name if download_href else ""
        if docx_name:
            md_candidate = (md_path.parent / docx_name).with_suffix(".md")
            if md_candidate.exists():
                rel = md_candidate.relative_to(ROOT / "docs")
                doc_id = str(rel.with_suffix("")).replace("\\", "/")
                count += 1
                return f"- [{summary}](/knowledge-docs/{doc_id})"

        # Fallback: keep a simple download link without the broken iframe
        if download_href:
            return f"- [{summary}]({download_href}) *(download)*"
        return f"- {summary} *(document unavailable)*"

    new_content = DETAILS_NOTE_RE.sub(replacer, content)
    if new_content != content:
        md_path.write_text(new_content, encoding="utf-8")
    return count


def main():
    total = 0
    for md_file in sorted(ROOT.rglob("*.md")):
        n = fix_file(md_file)
        if n:
            print(f"  {n} link(s) in {md_file.relative_to(ROOT)}")
            total += n
    print(f"\nTotal: {total} DOCX note blocks replaced with MD links")


if __name__ == "__main__":
    main()
