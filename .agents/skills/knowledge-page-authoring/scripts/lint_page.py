#!/usr/bin/env python3
"""
Lint a knowledge-docs page against the universal rules and its document
type's required structure (see references/<type>.md for the human-readable
version of these rules).

Usage:
    python3 lint_page.py <path-to-page.md> --type <type>

Types: guide, certification, interview-questions, engagement-case-study,
       narrative-case-study, workshop-transcript, research-report,
       framework-reference, multi-part-series

Exits non-zero if any check fails, printing every issue found (not just the
first) so they can all be fixed in one pass.
"""
import re
import sys
import argparse

try:
    import yaml
except ImportError:
    yaml = None

UNIVERSAL_FRONTMATTER = [
    "title", "date_created", "last_reviewed", "status", "source_type",
]

# heading text is matched case-insensitively as a substring, so minor
# phrasing differences don't false-positive
TYPE_REQUIREMENTS = {
    "guide": {
        "required_headings": [],
        "extra_frontmatter": ["covers_version"],
        "word_range": (1500, 4000),
    },
    "certification": {
        "required_headings": ["exam facts", "domain weighting"],
        "extra_frontmatter": ["exam_code", "exam_validity"],
        "word_range": (1500, 8000),
    },
    "interview-questions": {
        "required_headings": ["how to use this guide"],
        "extra_frontmatter": ["target_role"],
        "word_range": (2000, 12000),
    },
    "engagement-case-study": {
        "required_headings": [
            "executive summary", "client background", "business problem",
            "constraints", "discovery transcript", "architecture workshops",
            "technical debates", "executive reviews", "final architecture",
            "delivery roadmap", "risks", "governance model",
            "production rollout", "production incident",
        ],
        "extra_frontmatter": ["industry", "client_type", "engagement_period"],
        "word_range": (2500, 6000),
    },
    "narrative-case-study": {
        "required_headings": ["cast of characters"],
        "extra_frontmatter": ["protagonist_role", "core_tension"],
        "word_range": (1500, 6000),
    },
    "workshop-transcript": {
        "required_headings": ["audience", "related", "scenario", "participants"],
        "extra_frontmatter": ["session_type", "related_pages"],
        "word_range": (1500, 3000),
    },
    "research-report": {
        "required_headings": ["table of contents"],
        "extra_frontmatter": ["covers_through", "research_date"],
        "word_range": (3000, 20000),
    },
    "framework-reference": {
        "required_headings": ["overview", "when to apply"],
        "extra_frontmatter": ["framework_name"],
        "word_range": (1000, 5000),
    },
    "multi-part-series": {
        "required_headings": [],
        "extra_frontmatter": ["series_name", "series_part", "series_total", "series_index"],
        "word_range": (500, 5000),
    },
}


def parse_frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        return None, text
    fm_text = m.group(1)
    body = text[m.end():]
    if yaml:
        try:
            fm = yaml.safe_load(fm_text) or {}
        except Exception:
            fm = {}
    else:
        fm = {}
        for line in fm_text.splitlines():
            if ":" in line:
                k, _, v = line.partition(":")
                fm[k.strip()] = v.strip()
    return fm, body


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("path")
    ap.add_argument("--type", required=False, default=None,
                     choices=list(TYPE_REQUIREMENTS.keys()),
                     help="Override the type instead of reading it from the "
                          "page's 'doc_type' frontmatter field.")
    ap.add_argument("--universal", action="store_true",
                    help="Validate only universal publishing rules; do not apply a page-type template.")
    args = ap.parse_args()

    with open(args.path, encoding="utf-8") as f:
        text = f.read()

    issues = []
    fm, body = parse_frontmatter(text)

    if fm is None:
        issues.append("No frontmatter block found (must start the file with '---').")
        fm = {}

    for key in UNIVERSAL_FRONTMATTER:
        if not fm.get(key):
            issues.append(f"Missing/empty universal frontmatter field: '{key}'")

    doc_type = None if args.universal else (args.type or fm.get("doc_type"))
    if not doc_type and not args.universal:
        issues.append(
            "No --type given and no 'doc_type' frontmatter field found — "
            "cannot check type-specific structure. Add 'doc_type: <type>' "
            "to frontmatter (one of: " + ", ".join(TYPE_REQUIREMENTS.keys()) + ")."
        )
    elif doc_type not in TYPE_REQUIREMENTS:
        issues.append(
            f"'doc_type: {doc_type}' is not a recognized type. Must be one "
            f"of: {', '.join(TYPE_REQUIREMENTS.keys())}."
        )
        doc_type = None

    if fm.get("parent") or fm.get("nav_order"):
        issues.append(
            "Legacy Jekyll-era 'parent'/'nav_order' fields present — replace "
            "with the current frontmatter schema, don't leave both."
        )

    if re.search(r'<iframe[^>]+src=["\'][^"\']*\.pdf', text, re.IGNORECASE):
        issues.append("Contains PDF <iframe> — PDFs must be converted to Markdown, never embedded.")

    word_count = len(re.findall(r"\S+", body))

    if doc_type:
        spec = TYPE_REQUIREMENTS[doc_type]
        for key in spec["extra_frontmatter"]:
            if not fm.get(key):
                issues.append(f"Missing type-specific frontmatter field for '{doc_type}': '{key}'")

        body_lower = body.lower()
        for heading in spec["required_headings"]:
            if heading not in body_lower:
                issues.append(f"Missing required section for type '{doc_type}': '{heading}'")

        lo, hi = spec["word_range"]
        if word_count < lo:
            print(
                f"  [WARN] Body is {word_count} words — below the expected {lo}-{hi} range "
                f"for '{doc_type}'. May be too thin for this type's depth-of-research bar."
            )
        elif word_count > hi * 1.5:
            print(
                f"  [WARN] Body is {word_count} words — above the expected {lo}-{hi} "
                f"range for '{doc_type}'. Consider whether this should be a "
                f"multi-part-series instead of one page."
            )

    if not issues:
        scope = "universal rules" if args.universal else f"type '{doc_type}'"
        print(f"OK — {args.path} passes all checks for {scope} ({word_count} words).")
        return 0
    else:
        print(f"{len(issues)} issue(s) found in {args.path}:\n")
        for i in issues:
            print(f"  - {i}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
