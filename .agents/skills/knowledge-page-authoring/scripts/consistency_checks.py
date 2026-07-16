#!/usr/bin/env python3
"""
Shared structural-consistency checks for knowledge-docs pages.

Used by:
  - knowledge-page-authoring/scripts/lint_page.py    (single file, pre-commit gate)
  - knowledge-repo-consistency-audit/scripts/audit_corpus.py  (whole corpus, retroactive)

Keeping these as pure functions in one place means the "what does a
consistent page look like" definition can't drift between the gate that
checks new pages and the auditor that checks existing ones — which is
exactly the kind of split that let the last expansion pass in unchecked.

Every check function takes (fm: dict, body: str, path: str) or a subset,
and returns a list of issue strings (empty list = passes). Severity is
encoded as a prefix: "CRITICAL:", "HIGH:", "MEDIUM:", "LOW:" — callers can
filter/sort on that prefix without a separate severity table to keep in sync.
"""
import re

HEADING_RE = re.compile(r"^(#{1,6})[ \t]+(.*)$", re.MULTILINE)
RAW_HTML_RE = re.compile(r"<(div|span)\b[^>]*>|<table[^>]*\bstyle\s*=", re.IGNORECASE)
TABLE_ROW_RE = re.compile(r"^\s*\|.*\|\s*$", re.MULTILINE)
CODE_FENCE_RE = re.compile(r"```.*?```|~~~.*?~~~", re.DOTALL)


def _strip_code_fences(text):
    """Fenced code blocks routinely contain lines starting with '#' (Python/
    bash/shell comments) which match the same pattern as a Markdown ATX
    heading, and lines with multiple '|' characters (bash pipes, ASCII
    tables in comments) which match the table-row heuristic. Every
    structural check below needs to run against prose only, or a single
    code-heavy page produces dozens of false positives that drown out the
    real findings — replace fenced blocks with blank lines (preserving line
    count so any line-number reporting elsewhere stays accurate)."""
    def _blank(m):
        return "\n" * m.group(0).count("\n")
    return CODE_FENCE_RE.sub(_blank, text)


def _norm_title(s):
    return re.sub(r"[^a-z0-9]+", "", s.lower())


def check_tags(fm):
    """Tags are a required, populated frontmatter field. Two distinct
    problems, two severities:
      - genuinely missing/empty -> HIGH (breaks indexing outright)
      - present but a single generic tag (usually just the folder or
        filename, e.g. tags: ["quantum"]) -> LOW, a richness nudge, not a
        hard failure. Don't conflate the two — most of this corpus already
        has *a* tag, the real gap is that ~55% of tagged pages have only
        one, low-specificity tag rather than the domain+doc_type+topic mix
        useful for real discovery."""
    tags = fm.get("tags")
    if tags is None:
        return ["HIGH: Missing 'tags' frontmatter field entirely."]
    if isinstance(tags, str):
        tags = [t.strip() for t in tags.strip("[]").split(",") if t.strip()]
    if not tags:
        return ["HIGH: 'tags' is present but empty ([]) — page has zero tags, "
                "breaking tag-based indexing/discovery. Add at least a domain "
                "tag and 1-3 topic tags."]
    if len(tags) == 1:
        return ["LOW: Only one tag present — consider adding a doc_type and "
                "1-2 topic tags alongside the existing domain tag for real "
                "discoverability (see references/taxonomy.md)."]
    return []


def check_h1(body, fm):
    """Exactly one H1, and it should match the frontmatter title (fuzzy,
    since capitalization/punctuation legitimately differs) — the H1 is what
    readers and search engines actually see; a mismatched or duplicated H1
    is the single most visible inconsistency on a rendered page."""
    issues = []
    clean_body = _strip_code_fences(body)
    h1s = [h for lvl, h in re.findall(HEADING_RE, clean_body) if lvl == "#"]
    if len(h1s) == 0:
        issues.append("HIGH: No H1 heading found — every page needs exactly one.")
    elif len(h1s) > 1:
        issues.append(
            f"MEDIUM: {len(h1s)} H1 headings found (expected exactly 1): "
            f"{h1s[1:]}. Demote all but the first to H2 (or lower, matching "
            f"its actual position in the outline)."
        )
    title = fm.get("title", "") if fm else ""
    if h1s and title:
        if _norm_title(h1s[0]) != _norm_title(str(title)):
            issues.append(
                f"LOW: H1 ('{h1s[0]}') doesn't match frontmatter title "
                f"('{title}') — keep them in sync so browser tabs, search "
                f"results, and the rendered page agree."
            )
    return issues


def check_heading_hierarchy(body):
    """Heading levels shouldn't skip (H1 -> H3 with no H2 between) — this is
    the #1 artifact of automated PDF-to-Markdown conversion, where a
    document's visual font-size hierarchy doesn't map 1:1 to a clean
    heading tree. Skips break both the sidebar-generated in-page TOC and
    screen-reader navigation."""
    headings = re.findall(HEADING_RE, _strip_code_fences(body))
    issues = []
    prev = 0
    for level_str, text in headings:
        level = len(level_str)
        if prev and level - prev > 1:
            issues.append(
                f"MEDIUM: Heading level jumps from H{prev} to H{level} at "
                f"'{text[:60]}' — add an intermediate heading or fix the level."
            )
        prev = level
    return issues


def check_raw_html(text):
    """Raw <div>/<span>/inline-styled <table> almost always means a PDF or
    DOCX conversion left HTML in place of Markdown — it renders
    inconsistently across the site's theme and doesn't work on mobile."""
    if RAW_HTML_RE.search(_strip_code_fences(text)):
        return ["MEDIUM: Contains raw HTML (<div>/<span>/inline-styled "
                "<table>) instead of Markdown — likely leftover from PDF/DOCX "
                "conversion. Convert to native Markdown/Docusaurus syntax."]
    return []


def check_tables(body):
    """Heuristic: a markdown table row needs at least 2 pipe-delimited
    cells (3 pipe characters minimum: |cell|cell|); a row with only one
    interior cell is usually a table that lost columns in conversion, not
    an intentionally narrow table."""
    issues = []
    for i, line in enumerate(_strip_code_fences(body).splitlines(), 1):
        if TABLE_ROW_RE.match(line) and line.count("|") <= 2:
            issues.append(
                f"LOW: Line {i} looks like a collapsed table row (only "
                f"{line.count('|')} pipe(s)): '{line.strip()[:60]}' — verify "
                f"it isn't a table that lost columns during conversion."
            )
    return issues[:5]  # cap noise; the point is to flag the file, not enumerate every row


def check_legacy_fields(fm):
    if fm.get("parent") or fm.get("nav_order"):
        return ["LOW: Legacy Jekyll-era 'parent'/'nav_order' fields present "
                "— replace with the current frontmatter schema."]
    return []


def check_pdf_iframe(text):
    if re.search(r'<iframe[^>]+src=["\'][^"\']*\.pdf', text, re.IGNORECASE):
        return ["CRITICAL: Contains a PDF <iframe> — PDFs must be converted "
                "to Markdown, never embedded."]
    return []


def check_title_formatting(fm):
    """The frontmatter title is rendered raw in browser tabs, search
    results, and any generated index/graph — a title like 'Foo** **<u>Bar
    </u>' means the H1's bold/underline/strikethrough markup got captured
    into the title field during PDF conversion instead of being stripped."""
    title = str(fm.get("title", ""))
    if re.search(r"[*_#]{2,}|<[a-z]+>", title, re.IGNORECASE):
        return [f"MEDIUM: Frontmatter title contains raw Markdown/HTML syntax "
                f"('{title[:60]}') — strip formatting so it renders correctly "
                f"in tabs, search results, and generated indexes."]
    return []


def run_all_checks(fm, body, full_text):
    """Runs every consistency check and returns a flat list of issue
    strings (each prefixed with severity). fm may be {} if frontmatter
    failed to parse — checks handle that gracefully."""
    issues = []
    issues += check_pdf_iframe(full_text)
    issues += check_tags(fm)
    issues += check_title_formatting(fm)
    issues += check_h1(body, fm)
    issues += check_heading_hierarchy(body)
    issues += check_raw_html(full_text)
    issues += check_tables(body)
    issues += check_legacy_fields(fm)
    return issues


SEVERITY_ORDER = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}


def severity_of(issue):
    return issue.split(":", 1)[0]


def sort_by_severity(issues):
    return sorted(issues, key=lambda i: SEVERITY_ORDER.get(severity_of(i), 9))
