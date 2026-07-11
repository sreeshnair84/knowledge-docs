"""
Move source files out of docs/ after PDF/DOCX→MD conversion:
  - HTML files  → static/<same-subpath>   (still served at same URL by Docusaurus)
  - PDF/DOCX/JSX → archive/<same-subpath>  (no longer served; kept for reference)

Also:
  - Converts remaining HTML iframes to plain links
  - Updates any remaining relative .pdf/.docx/.html links in .md files to
    point to the new location or the .md counterpart where one exists
"""

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
DOCS = ROOT / "docs"
ARCHIVE = ROOT / "archive"
STATIC = ROOT / "static"

# HTML stays accessible via Docusaurus (served from static/)
ARCHIVE_EXTS = {".pdf", ".docx", ".jsx"}
STATIC_EXTS = {".html"}


# ---------------------------------------------------------------------------
# Step 1: Convert remaining HTML iframes to links
# ---------------------------------------------------------------------------

HTML_IFRAME_RE = re.compile(
    r"<details>\s*\n"
    r"<summary>([^<]+)</summary>\s*\n"
    r'<iframe src="([^"]+\.html)"[^>]*></iframe>\s*\n'
    r"(?:<p>.*?</p>\s*\n)?"
    r"</details>",
    re.MULTILINE | re.DOTALL,
)

PPTX_VIEWER_RE = re.compile(
    r"<details>\s*\n"
    r"<summary>([^<]+)</summary>\s*\n"
    r'<iframe src="https://docs\.google\.com/viewer\?url=[^"]*?/([^/&"]+\.pptx)[^"]*"[^>]*></iframe>\s*\n'
    r'(?:<p><a href="[^"]*" download>[^<]*</a></p>\s*\n)?'
    r"</details>",
    re.MULTILINE | re.DOTALL | re.IGNORECASE,
)


def replace_html_iframes(md_path: Path) -> int:
    content = md_path.read_text(encoding="utf-8")
    replaced = 0

    def _html_sub(m):
        nonlocal replaced
        summary = m.group(1).strip()
        html_src = m.group(2).strip()
        html_file = (md_path.parent / html_src).resolve()
        if not html_file.exists():
            return m.group(0)
        # Build absolute Docusaurus link (file moves to static/, same subpath)
        rel = html_file.relative_to(DOCS)
        link = "/knowledge-docs/" + "/".join(rel.parts)
        replaced += 1
        return f"- [{summary}]({link})"

    def _pptx_sub(m):
        nonlocal replaced
        summary = m.group(1).strip()
        replaced += 1
        return f"- {summary} *(PPTX presentation — archived)*"

    new_content = HTML_IFRAME_RE.sub(_html_sub, content)
    new_content = PPTX_VIEWER_RE.sub(_pptx_sub, new_content)
    if new_content != content:
        md_path.write_text(new_content, encoding="utf-8")
    return replaced


# ---------------------------------------------------------------------------
# Step 2: Patch remaining .pdf / .docx / .html relative links in MD files
#   - If a .md sibling exists → point to the .md page
#   - Otherwise → point to archived location (won't be served, just reference)
# ---------------------------------------------------------------------------

LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]+\.(pdf|docx|html|jsx))\)", re.IGNORECASE)


def patch_source_links(md_path: Path) -> int:
    content = md_path.read_text(encoding="utf-8")
    changed = 0

    def _sub(m):
        nonlocal changed
        text, href, _ = m.group(1), m.group(2), m.group(3).lower()
        # Skip absolute URLs
        if href.startswith("http://") or href.startswith("https://") or href.startswith("/"):
            return m.group(0)
        # Resolve relative path
        target = (md_path.parent / href).resolve()
        md_sibling = target.with_suffix(".md")
        if md_sibling.exists():
            # Link to the converted MD page
            try:
                rel = md_sibling.relative_to(DOCS)
                doc_id = "/".join(rel.with_suffix("").parts)
                changed += 1
                return f"[{text}](/knowledge-docs/{doc_id})"
            except ValueError:
                return m.group(0)
        # No .md sibling — keep link but warn (file is being archived)
        return m.group(0)

    new_content = LINK_RE.sub(_sub, content)
    if new_content != content:
        md_path.write_text(new_content, encoding="utf-8")
    return changed


# ---------------------------------------------------------------------------
# Step 3: git mv
# ---------------------------------------------------------------------------


def git_mv(src: Path, dst: Path) -> bool:
    dst.parent.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(
        ["git", "mv", str(src), str(dst)],
        capture_output=True,
        text=True,
        cwd=str(ROOT),
    )
    if result.returncode != 0:
        print(f"  ERROR: git mv {src.relative_to(ROOT)} -> {dst.relative_to(ROOT)}: {result.stderr.strip()}")
        return False
    return True


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    dry_run = "--dry-run" in sys.argv

    # Step 1: Convert HTML iframes
    print("Step 1: Converting remaining HTML iframes and PPTX viewer iframes to links...")
    total_iframe = 0
    for md_file in sorted(DOCS.rglob("*.md")):
        n = replace_html_iframes(md_file)
        if n:
            total_iframe += n
            print(f"  {n} iframes -> links: {md_file.relative_to(ROOT)}")
    print(f"  Total iframes replaced: {total_iframe}\n")

    # Step 2: Patch remaining source-file links
    print("Step 2: Patching remaining .pdf/.docx/.html/.jsx links in MD files...")
    total_links = 0
    for md_file in sorted(DOCS.rglob("*.md")):
        n = patch_source_links(md_file)
        if n:
            total_links += n
    print(f"  Total links patched: {total_links}\n")

    # Collect files to move
    archive_files = []
    static_files = []
    for ext in ARCHIVE_EXTS:
        archive_files.extend(DOCS.rglob(f"*{ext}"))
    for ext in STATIC_EXTS:
        static_files.extend(DOCS.rglob(f"*{ext}"))
    archive_files = sorted(archive_files)
    static_files = sorted(static_files)

    print(f"Files to archive ({len(archive_files)}):")
    for ext in ARCHIVE_EXTS:
        print(f"  {ext}: {sum(1 for f in archive_files if f.suffix == ext)}")
    print(f"\nFiles to static ({len(static_files)}):")
    print(f"  .html: {len(static_files)}")
    print()

    if dry_run:
        print("DRY RUN — sample moves:")
        for src in archive_files[:5]:
            dst = ARCHIVE / src.relative_to(DOCS)
            print(f"  archive: {src.relative_to(ROOT)} -> {dst.relative_to(ROOT)}")
        for src in static_files[:5]:
            dst = STATIC / src.relative_to(DOCS)
            print(f"  static:  {src.relative_to(ROOT)} -> {dst.relative_to(ROOT)}")
        return

    # Step 3: git mv
    print("Step 3: Moving files...")
    moved = 0
    for src in archive_files:
        dst = ARCHIVE / src.relative_to(DOCS)
        if git_mv(src, dst):
            moved += 1

    for src in static_files:
        dst = STATIC / src.relative_to(DOCS)
        if git_mv(src, dst):
            moved += 1

    print(f"\nMoved {moved}/{len(archive_files) + len(static_files)} files")
    print("\nNext steps:")
    print("  git add -u && git add static/ archive/")
    print("  git commit -m 'chore(archive): move source PDFs/DOCXs/HTML/JSX out of docs/'")


if __name__ == "__main__":
    main()
