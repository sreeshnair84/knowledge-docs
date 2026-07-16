#!/usr/bin/env python3
"""
Applies ONLY the subset of consistency fixes that are purely mechanical —
no judgment calls about content, wording, or placement. Everything else
found by audit_corpus.py (thin tags, raw HTML, collapsed tables) is left as
a reported finding for a human/authoring pass, because fixing those well
requires understanding the content, not just its shape.

What this fixes:
  - Multiple H1s: every H1 after the first is demoted to H2. This is safe
    because a second top-level heading in a single-page document is by
    definition not really "top-level" — demoting it one level is correct
    regardless of what the page is about. (It does NOT try to guess a
    "more correct" level than H2 — if H2 is still wrong for a given
    heading, that's a MEDIUM finding left in the audit report, not
    something this script decides on its own.)

What this deliberately does NOT touch:
  - Heading-skip issues (H1 -> H3 with nothing between) — fixing these
    correctly requires knowing the intended outline, not just the levels.
  - Tags, raw HTML, collapsed tables — all need content judgment.

Usage:
    python3 autofix_structural.py <path-to-page.md> [--dry-run]
    python3 autofix_structural.py --all --docs-dir docs [--dry-run]
"""
import os
import re
import sys
import argparse

HEADING_LINE_RE = re.compile(r"^(#{1,6})([ \t]+)(.*)$")
CODE_FENCE_LINE_RE = re.compile(r"^\s*(```|~~~)")


def demote_extra_h1s(text):
    """Walk line by line (not regex-replace-all) so we correctly skip lines
    inside fenced code blocks, matching consistency_checks.py's definition
    of what counts as a heading."""
    lines = text.split("\n")
    in_fence = False
    seen_h1 = False
    changed = False
    out = []
    for line in lines:
        if CODE_FENCE_LINE_RE.match(line):
            in_fence = not in_fence
            out.append(line)
            continue
        if not in_fence:
            m = HEADING_LINE_RE.match(line)
            if m and len(m.group(1)) == 1:
                if not seen_h1:
                    seen_h1 = True
                else:
                    line = "#" + line  # H1 -> H2, preserving the rest of the line exactly
                    changed = True
        out.append(line)
    return "\n".join(out), changed


def process_file(path, dry_run):
    text = open(path, encoding="utf-8").read()
    # Only touch the body, never the frontmatter block, even though the
    # frontmatter delimiter '---' can't collide with '#'-heading matching —
    # this split just keeps the fix visibly scoped to content.
    m = re.match(r"^(---\n.*?\n---\n)(.*)$", text, re.DOTALL)
    if m:
        fm_block, body = m.group(1), m.group(2)
    else:
        fm_block, body = "", text

    new_body, changed = demote_extra_h1s(body)
    if not changed:
        return False

    print(f"{'[DRY RUN] would fix' if dry_run else 'Fixed'}: {path} (demoted extra H1(s) to H2)")
    if not dry_run:
        with open(path, "w", encoding="utf-8") as f:
            f.write(fm_block + new_body)
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("path", nargs="?", help="Single file to fix")
    ap.add_argument("--all", action="store_true", help="Fix every file under --docs-dir")
    ap.add_argument("--docs-dir", default="docs")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    if not args.path and not args.all:
        sys.exit("Provide a file path, or --all to process the whole docs tree.")

    targets = []
    if args.all:
        for r, _d, files in os.walk(args.docs_dir):
            for f in files:
                if f.endswith(".md"):
                    targets.append(os.path.join(r, f))
    else:
        targets = [args.path]

    fixed = 0
    for t in targets:
        if process_file(t, args.dry_run):
            fixed += 1

    print(f"\n{fixed}/{len(targets)} file(s) {'would be' if args.dry_run else 'were'} changed.")
    if args.dry_run and fixed:
        print("Re-run without --dry-run to apply.")


if __name__ == "__main__":
    main()
