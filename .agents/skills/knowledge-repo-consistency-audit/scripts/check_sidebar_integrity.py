#!/usr/bin/env python3
"""
Verify every doc ID referenced in sidebars.js resolves to a real file in
docs/, and every file in docs/ is reachable from sidebars.js. Docusaurus
does NOT hard-fail the build on a mismatch here (it silently drops the bad
sidebar entry), which is exactly how the current repo ended up with 86
pages in the published sidebar pointing nowhere, and ~87 real pages
unreachable from navigation — a filename/sidebar-id drift that a single
diff-based check makes structurally impossible to miss going forward.

Usage:
    python3 check_sidebar_integrity.py [--sidebars sidebars.js] [--docs-dir docs]
    python3 check_sidebar_integrity.py --fix     # rewrite sidebars.js entries
                                                   # to match real filenames

--fix only ever edits sidebars.js (a single, reviewable file — `git diff` it
before committing). It never renames files on disk, and it never adds or
removes categories/structure — it only repairs a broken string-to-file
reference when exactly one on-disk file's normalized name matches a broken
reference. Anything ambiguous is reported, not guessed at.
"""
import os
import re
import sys
import argparse


def _norm(s):
    """Normalize a doc id/filename for fuzzy matching: strip numeric
    ordering prefixes ('01-', '02_'), lowercase, collapse separators."""
    s = re.split("/", s)[-1]
    s = re.sub(r"^\d+[-_]", "", s)
    s = re.sub(r"[-_]", "", s.lower())
    return s


def collect_disk_ids(docs_dir):
    ids = {}
    for r, _d, files in os.walk(docs_dir):
        for f in files:
            if f.endswith(".md"):
                full = os.path.join(r, f)
                rel = os.path.relpath(full, docs_dir)[:-3].replace(os.sep, "/")
                ids[rel] = full
    return ids


def collect_sidebar_refs(sidebars_path):
    text = open(sidebars_path, encoding="utf-8").read()
    # id-like quoted strings: path-like (contain a slash), not starting with /
    # Strings like '/' and '/index' are JS method arguments (.split('/'),
    # .endsWith('/index')), not doc references — exclude them via the
    # not-starting-with-slash filter.
    refs = re.findall(r"""['"]([a-zA-Z0-9_\-./]+)['"]""", text)
    return [r for r in refs if "/" in r and not r.startswith("/")], text


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sidebars", default="sidebars.js")
    ap.add_argument("--docs-dir", default="docs")
    ap.add_argument("--fix", action="store_true",
                     help="Rewrite unambiguous broken sidebar refs to match on-disk filenames")
    args = ap.parse_args()

    disk_ids = collect_disk_ids(args.docs_dir)
    sidebar_refs, sidebar_text = collect_sidebar_refs(args.sidebars)
    sidebar_ref_set = set(sidebar_refs)

    broken = sorted(r for r in sidebar_ref_set if r not in disk_ids)
    orphaned = sorted(i for i in disk_ids if i not in sidebar_ref_set)

    # Build a normalized-name index of on-disk files for fuzzy resolution
    norm_index = {}
    for disk_id in disk_ids:
        norm_index.setdefault(_norm(disk_id), []).append(disk_id)

    resolvable = {}   # broken ref -> single matching disk id
    unresolvable = []
    for ref in broken:
        candidates = norm_index.get(_norm(ref), [])
        if len(candidates) == 1:
            resolvable[ref] = candidates[0]
        else:
            unresolvable.append((ref, candidates))

    print(f"On-disk doc files: {len(disk_ids)}")
    print(f"Doc-id-like references in {args.sidebars}: {len(sidebar_ref_set)}")
    print(f"\nBroken sidebar references (point to no file): {len(broken)}")
    print(f"  - auto-resolvable (exactly one on-disk match by normalized name): {len(resolvable)}")
    print(f"  - ambiguous/unresolvable (need a human decision): {len(unresolvable)}")
    print(f"Orphaned files (exist on disk, never referenced): {len(orphaned)}")

    if unresolvable:
        print("\nUnresolvable — decide manually:")
        for ref, candidates in unresolvable:
            note = "no on-disk match at all" if not candidates else f"multiple matches: {candidates}"
            print(f"  '{ref}' — {note}")

    if not args.fix:
        if resolvable:
            print(f"\n{len(resolvable)} of these can be auto-fixed. Re-run with --fix to rewrite "
                  f"{args.sidebars} (edits that file only; nothing else is touched).")
        return 1 if broken else 0

    if not resolvable:
        print("\nNothing auto-fixable.")
        return 1 if broken else 0

    new_text = sidebar_text
    applied = 0
    for ref, disk_id in resolvable.items():
        # Replace the exact quoted occurrence(s) of the broken ref with the
        # real on-disk id, preserving whichever quote style was used.
        pattern = re.compile(r"(['\"])" + re.escape(ref) + r"\1")
        if pattern.search(new_text):
            new_text = pattern.sub(lambda m: f"{m.group(1)}{disk_id}{m.group(1)}", new_text)
            applied += 1

    with open(args.sidebars, "w", encoding="utf-8") as f:
        f.write(new_text)

    print(f"\nRewrote {applied} sidebar reference(s) in {args.sidebars} to match on-disk filenames.")
    print("Review with `git diff sidebars.js`, then run your build to confirm before committing.")
    remaining = len(broken) - applied
    return 1 if remaining else 0


if __name__ == "__main__":
    sys.exit(main())
