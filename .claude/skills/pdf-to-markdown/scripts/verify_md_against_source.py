"""
Verify converted .md files against their original PDF/DOCX source files in archive/.

For each converted MD file, compares:
  - Word count ratio (MD body / original)
  - Table count
  - Heading count
  - Encoding issues (replacement char)
  - Remaining page number lines

Usage:
    python3 scripts/verify_md_against_source.py                    # all files
    python3 scripts/verify_md_against_source.py docs/path/file.md  # single file
    python3 scripts/verify_md_against_source.py --fail-only        # show only FAIL/WARN
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
DOCS = ROOT / "docs"
ARCHIVE = ROOT / "archive"

PAGE_NUM_RE = re.compile(r"^\s*(?:Page\s*)?\d+\s*$", re.IGNORECASE)
REPL_CHAR_RE = re.compile(r"�")


def word_count(text: str) -> int:
    return len(re.findall(r"\S+", text))


def table_count(text: str) -> int:
    return len(re.findall(r"^\|[-|: ]+\|", text, re.MULTILINE))


def heading_count(text: str) -> int:
    return len(re.findall(r"^#{1,4} ", text, re.MULTILINE))


def page_num_lines(text: str) -> int:
    return sum(1 for line in text.splitlines() if PAGE_NUM_RE.match(line))


def encoding_issues(text: str) -> int:
    return len(REPL_CHAR_RE.findall(text))


def extract_md_body(md_path: Path) -> str:
    content = md_path.read_text(encoding="utf-8", errors="replace")
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) == 3:
            return parts[2]
    return content


def pdf_word_count(pdf_path: Path) -> int | None:
    try:
        import pymupdf4llm  # type: ignore
        md = pymupdf4llm.to_markdown(str(pdf_path))
        return word_count(md)
    except ImportError:
        pass
    try:
        import fitz  # type: ignore
        doc = fitz.open(str(pdf_path))
        text = "\n".join(page.get_text() for page in doc)
        return word_count(text)
    except ImportError:
        return None


def docx_word_count(docx_path: Path) -> int | None:
    try:
        import docx as python_docx  # type: ignore
        doc = python_docx.Document(str(docx_path))
        text = "\n".join(p.text for p in doc.paragraphs)
        return word_count(text)
    except (ImportError, Exception):
        return None


def verify_file(md_path: Path) -> dict:
    body = extract_md_body(md_path)
    md_words = word_count(body)
    md_tables = table_count(body)
    md_headings = heading_count(body)
    pn_lines = page_num_lines(body)
    enc_issues = encoding_issues(body)

    # Find corresponding archive source file
    rel = md_path.relative_to(DOCS)
    src_pdf = (ARCHIVE / rel).with_suffix(".pdf")
    src_docx = (ARCHIVE / rel).with_suffix(".docx")

    src_words = None
    src_type = None
    if src_pdf.exists():
        src_words = pdf_word_count(src_pdf)
        src_type = "pdf"
    elif src_docx.exists():
        src_words = docx_word_count(src_docx)
        src_type = "docx"

    ratio = round(md_words / src_words, 2) if src_words else None

    # Determine status
    issues = []
    if ratio is not None and ratio < 0.55:
        issues.append(f"LOW word ratio {ratio:.0%}")
    if pn_lines > 2:
        issues.append(f"{pn_lines} page-num lines remain")
    if enc_issues > 5:
        issues.append(f"{enc_issues} encoding issues")

    if not issues:
        status = "PASS"
    elif any("LOW" in i for i in issues):
        status = "FAIL"
    else:
        status = "WARN"

    return {
        "file": str(md_path.relative_to(ROOT)),
        "status": status,
        "issues": issues,
        "md_words": md_words,
        "src_words": src_words,
        "ratio": ratio,
        "md_tables": md_tables,
        "md_headings": md_headings,
        "page_num_lines": pn_lines,
        "encoding_issues": enc_issues,
        "src_type": src_type,
    }


def fmt_ratio(r):
    return f"{r:.0%}" if r is not None else "n/a"


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    fail_only = "--fail-only" in sys.argv

    if args:
        targets = [Path(a) for a in args]
    else:
        # All converted MD files (those with a source_type: converted-* or that have an archive counterpart)
        targets = []
        for md in sorted(DOCS.rglob("*.md")):
            rel = md.relative_to(DOCS)
            if (ARCHIVE / rel).with_suffix(".pdf").exists() or (ARCHIVE / rel).with_suffix(".docx").exists():
                targets.append(md)

    print(f"Verifying {len(targets)} converted MD files...\n")
    print(f"{'Status':<6} {'Ratio':<7} {'MD-W':<6} {'Src-W':<6} {'Tbls':<5} {'Hdgs':<5} {'PgN':<4} {'Enc':<4}  File")
    print("-" * 120)

    results = {"PASS": 0, "WARN": 0, "FAIL": 0}
    for md_path in targets:
        r = verify_file(md_path)
        if fail_only and r["status"] == "PASS":
            continue
        results[r["status"]] += 1
        issues_str = "; ".join(r["issues"]) if r["issues"] else ""
        print(
            f"{r['status']:<6} {fmt_ratio(r['ratio']):<7} {r['md_words']:<6} "
            f"{str(r['src_words'] or 'n/a'):<6} {r['md_tables']:<5} {r['md_headings']:<5} "
            f"{r['page_num_lines']:<4} {r['encoding_issues']:<4}  {r['file']}"
            + (f"  [{issues_str}]" if issues_str else "")
        )

    print("\n" + "=" * 120)
    print(f"Summary: PASS={results['PASS']}  WARN={results['WARN']}  FAIL={results['FAIL']}")
    print("\nColumns: Ratio=MD/src words  Tbls=tables  Hdgs=headings  PgN=page-num lines  Enc=encoding issues")
    print("\nNotes:")
    print("  - Ratio < 55% = FAIL (significant content loss)")
    print("  - Ratio 55-65% = WARN (possible content loss — check manually)")
    print("  - Images/diagrams cannot be automatically verified — use checklist in _meta/md-verification-checklist.md")


if __name__ == "__main__":
    main()
