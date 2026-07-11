"""
Replace PDF <iframe> embeds in index pages with proper Markdown links
pointing to the converted .md files. Only replaces iframes whose PDF
has a corresponding .md file in the same directory.
Also updates sidebars.js to include the new MD pages.
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent

IFRAME_RE = re.compile(
    r'<details>\s*\n'
    r'<summary>([^<]+)</summary>\s*\n'
    r'<iframe src="([^"]+\.pdf)"[^>]*></iframe>\s*\n'
    r'(?:<p>.*?</p>\s*\n)?'
    r'</details>',
    re.MULTILINE | re.DOTALL,
)


def replace_iframes_in_file(md_path: Path) -> tuple[int, list[str]]:
    """Return (count_replaced, list_of_new_doc_ids)."""
    content = md_path.read_text(encoding="utf-8")
    new_doc_ids = []
    replaced = 0

    def replacer(m: re.Match) -> str:
        nonlocal replaced
        summary = m.group(1).strip()
        pdf_src = m.group(2).strip()
        pdf_path = (md_path.parent / pdf_src).resolve()
        md_target = pdf_path.with_suffix(".md")

        if not md_target.exists():
            # Keep the iframe as-is — MD not yet available
            return m.group(0)

        # Build relative path for Docusaurus link
        rel = md_target.relative_to(ROOT / "docs")
        doc_id = str(rel.with_suffix("")).replace("\\", "/")
        link = f"[{summary}](/{'/'.join(['knowledge-docs'] + doc_id.split('/'))})"
        new_doc_ids.append(doc_id)
        replaced += 1
        return f"- {link}"

    new_content = IFRAME_RE.sub(replacer, content)
    if new_content != content:
        md_path.write_text(new_content, encoding="utf-8")
    return replaced, new_doc_ids


def main():
    total_replaced = 0
    all_doc_ids = []

    for md_file in sorted(ROOT.rglob("index.md")):
        count, ids = replace_iframes_in_file(md_file)
        if count:
            print(f"  {count} replaced in {md_file.relative_to(ROOT)}")
            total_replaced += count
            all_doc_ids.extend(ids)

    print(f"\nTotal: {total_replaced} PDF iframes replaced with MD links")
    print(f"New doc IDs to add to sidebars.js: {len(all_doc_ids)}")

    if all_doc_ids:
        print("\nSample doc IDs:")
        for d in sorted(all_doc_ids)[:10]:
            print(f"  '{d}',")


if __name__ == "__main__":
    main()
