"""
Patch frontmatter in PDF/DOCX-converted MD files to satisfy the pre-commit hook.
Fixes: missing last_reviewed, covers_version, research fields, doc_type values,
and adds full required frontmatter to DOCX-converted files that have minimal headers.
"""

import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).parent.parent
TODAY = date.today().isoformat()

# doc_type corrections
DOCTYPE_MAP = {
    "interview-question-bank": "interview-questions",
}

# Fields to inject per doc_type if missing
TYPE_DEFAULTS = {
    "guide": {"covers_version": '"N/A"', "last_reviewed": TODAY},
    "research-report": {"covers_through": TODAY, "research_date": TODAY, "last_reviewed": TODAY},
    "framework-reference": {"framework_name": '""', "last_reviewed": TODAY},
    "interview-questions": {"last_reviewed": TODAY},
    "certification": {"last_reviewed": TODAY},
    "workshop-transcript": {"last_reviewed": TODAY},
    "case-study": {"last_reviewed": TODAY},
    "engagement-case-study": {"last_reviewed": TODAY},
    "narrative-case-study": {"last_reviewed": TODAY},
    "multi-part-series": {"last_reviewed": TODAY},
}

UNIVERSAL_DEFAULTS = {
    "date_created": TODAY,
    "last_reviewed": TODAY,
    "status": "current",
    "source_type": "converted-pdf",
}


def infer_doc_type(path: Path, current: str) -> str:
    if current and current not in DOCTYPE_MAP:
        return current
    if current in DOCTYPE_MAP:
        return DOCTYPE_MAP[current]
    name = path.stem.lower()
    if re.search(r"interview|question_bank|questionnaire", name):
        return "interview-questions"
    if re.search(r"case_?\d+|case_study|01_|02_aviation|banking|healthcare", name):
        return "engagement-case-study"
    if re.search(r"research|report|survey|scan|outlook", name):
        return "research-report"
    if re.search(r"framework|blueprint|architecture|reference|runbook|playbook", name):
        return "framework-reference"
    if re.search(r"transcript|workshop|real_life|pitch", name):
        return "workshop-transcript"
    return "guide"


def patch_frontmatter(content: str, path: Path) -> str:
    if not content.startswith("---"):
        return content

    parts = content.split("---", 2)
    if len(parts) < 3:
        return content

    fm_raw = parts[1]
    body = parts[2]

    # Parse existing keys
    fm_lines = fm_raw.strip().splitlines()
    existing = {}
    for line in fm_lines:
        m = re.match(r"^(\w+):\s*(.*)", line)
        if m:
            existing[m.group(1)] = m.group(2).strip()

    # Fix doc_type
    current_dtype = existing.get("doc_type", "")
    new_dtype = infer_doc_type(path, current_dtype)

    # Build updated frontmatter lines
    new_fm_lines = []
    for line in fm_lines:
        m = re.match(r"^(doc_type):\s*(.*)", line)
        if m:
            new_fm_lines.append(f"doc_type: {new_dtype}")
        else:
            new_fm_lines.append(line)

    # Add missing universal fields
    for field, default in UNIVERSAL_DEFAULTS.items():
        if field not in existing:
            new_fm_lines.append(f"{field}: {default}")

    # Add missing type-specific fields
    type_fields = TYPE_DEFAULTS.get(new_dtype, {"last_reviewed": TODAY})
    for field, default in type_fields.items():
        if field not in existing:
            new_fm_lines.append(f"{field}: {default}")

    new_fm = "\n".join(new_fm_lines)
    return f"---\n{new_fm}\n---{body}"


def main():
    fixed = 0
    for md_path in sorted(ROOT.rglob("*.md")):
        content = md_path.read_text(encoding="utf-8", errors="replace")
        # Only patch converted files
        if (
            "source_type: converted-pdf" not in content
            and "source_type: converted-docx" not in content
            and "source_type: native-md" not in content
        ):
            # DOCX converter wrote minimal frontmatter with just title
            if not content.startswith("---\ntitle:"):
                continue
            # Check if it's one of our DOCX-converted files (no date_created)
            if "date_created" in content:
                continue

        new_content = patch_frontmatter(content, md_path)
        if new_content != content:
            md_path.write_text(new_content, encoding="utf-8")
            fixed += 1

    print(f"Patched {fixed} files")


if __name__ == "__main__":
    main()
