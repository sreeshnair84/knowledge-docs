"""
Batch convert PDF files to Markdown using pymupdf4llm.
Skips files that already have .md counterparts.
Adds Docusaurus-compatible frontmatter to each output.
"""

import re
from datetime import date
from pathlib import Path

import pymupdf4llm

# ── Tag + doc-type inference from path/filename ───────────────────────────────
DIR_TAGS = {
    "agentic-systems": ["agentic-ai", "agents"],
    "ai-development": ["ai-development", "software-engineering"],
    "ai-economics": ["ai-economics", "enterprise-ai"],
    "ai-foundations": ["ai-foundations"],
    "ai-protocols": ["ai-protocols", "mcp", "a2a"],
    "ai-security-governance": ["ai-security", "governance"],
    "ai-usecases": ["ai-usecases"],
    "cloud-platforms": ["cloud-platforms"],
    "coding-tools": ["coding-tools"],
    "enterprise-architecture": ["enterprise-architecture"],
    "interview-prep": ["interview-prep"],
    "knowledge-engineering": ["knowledge-engineering"],
    "quantum": ["quantum-computing"],
    "soft-skills": ["soft-skills"],
}


def infer_tags(pdf_path: Path) -> list:
    for part in pdf_path.parts:
        if part in DIR_TAGS:
            return DIR_TAGS[part]
    return []


def infer_doc_type(pdf_path: Path) -> str:
    name = pdf_path.stem.lower()
    if any(k in name for k in ["interview", "question_bank", "questionnaire"]):
        return "interview-question-bank"
    if re.search(r"case_?\d+|01_|02_|03_|case_study", name):
        return "case-study"
    if any(k in name for k in ["handbook", "guide", "playbook", "mastery", "curriculum"]):
        return "guide"
    if any(k in name for k in ["research", "report", "survey", "scan"]):
        return "research-report"
    if any(k in name for k in ["framework", "blueprint", "architecture", "reference"]):
        return "framework-reference"
    if any(k in name for k in ["transcript", "workshop", "real_life"]):
        return "workshop-transcript"
    return "guide"


# ── Conversion ────────────────────────────────────────────────────────────────
def convert_pdf(pdf_path: Path, out_path: Path) -> bool:
    try:
        md_body = pymupdf4llm.to_markdown(str(pdf_path))
    except Exception as e:
        print(f"  ERR {pdf_path.name}: {e}")
        return False

    if not md_body.strip():
        print(f"  SKIP {pdf_path.name}: no text extracted")
        return False

    # Clean up image-text comment blocks that clutter the output
    md_body = re.sub(r"<!-- Start of picture text -->.*?<!-- End of picture text -->", "", md_body, flags=re.DOTALL)
    # Collapse excessive blank lines
    md_body = re.sub(r"\n{3,}", "\n\n", md_body).strip()

    # Extract title from first heading or derive from filename
    first_h = re.search(r"^#{1,3}\s+\*{0,2}(.+?)\*{0,2}\s*$", md_body, re.MULTILINE)
    title = first_h.group(1).strip() if first_h else pdf_path.stem.replace("_", " ").replace("-", " ").title()

    tags = infer_tags(pdf_path)
    doc_type = infer_doc_type(pdf_path)
    tag_str = '["' + '", "'.join(tags) + '"]' if tags else "[]"

    frontmatter = (
        f"---\n"
        f'title: "{title}"\n'
        f"date_created: {date.today().isoformat()}\n"
        f"status: current\n"
        f"source_type: converted-pdf\n"
        f'source_file: "{pdf_path.name}"\n'
        f"doc_type: {doc_type}\n"
        f"tags: {tag_str}\n"
        f"---\n"
    )

    out_path.write_text(frontmatter + "\n" + md_body + "\n", encoding="utf-8")
    line_count = md_body.count("\n")
    print(f"  OK  {pdf_path.name} -> {out_path.name} ({line_count} lines)")
    return True


# ── Collect PDFs embedded in index pages that have no .md yet ─────────────────
def collect_pdfs(root: Path) -> list:
    seen = set()
    pdfs = []
    for md_file in sorted(root.rglob("*.md")):
        content = md_file.read_text(encoding="utf-8", errors="replace")
        for src in re.findall(r'<iframe src="([^"]+\.pdf)"', content):
            pdf_path = (md_file.parent / src).resolve()
            if pdf_path in seen:
                continue
            seen.add(pdf_path)
            if not pdf_path.exists():
                continue
            if pdf_path.with_suffix(".md").exists():
                continue
            pdfs.append(pdf_path)
    return pdfs


def main():
    root = Path(__file__).parent.parent
    pdfs = collect_pdfs(root)
    print(f"Found {len(pdfs)} PDFs needing conversion\n")
    ok = err = 0
    for pdf_path in pdfs:
        out_path = pdf_path.with_suffix(".md")
        if convert_pdf(pdf_path, out_path):
            ok += 1
        else:
            err += 1
    print(f"\nDone: {ok} converted, {err} errors")


if __name__ == "__main__":
    main()
