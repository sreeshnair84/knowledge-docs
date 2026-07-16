#!/usr/bin/env python3
"""
Run the same structural-consistency checks lint_page.py uses on a single new
page, across every existing page in docs/ — retroactively, in one pass.

This is the piece the per-commit hook structurally cannot provide: the hook
only ever sees staged/changed files, so a bulk import or expansion pass that
adds hundreds of files outside the normal author -> lint -> commit flow (as
happened in this repo on 2026-07-10/11) ships with zero of these checks
applied. Run this any time:
  - after any bulk import/expansion pass, before calling it done
  - periodically (e.g. monthly) as a drift check
  - when asked "how consistent is the repo right now"

Usage:
    python3 audit_corpus.py [--docs-dir docs] [--out report.md] [--json out.json]
                             [--min-severity MEDIUM]

Exit code is non-zero if any CRITICAL or HIGH issue was found (useful for a
CI gate that runs this on a schedule rather than per-PR).
"""
import os
import re
import sys
import json
import argparse
import subprocess
import importlib.util
from collections import Counter, defaultdict

# consistency_checks.py lives in the sibling knowledge-page-authoring skill,
# not duplicated here — see that module's docstring for why the checks are
# shared between the per-file gate and this batch auditor.
_HERE = os.path.dirname(os.path.abspath(__file__))
_SIBLING = os.path.normpath(os.path.join(
    _HERE, "..", "..", "knowledge-page-authoring", "scripts", "consistency_checks.py"))

if not os.path.exists(_SIBLING):
    sys.exit(
        f"Cannot find consistency_checks.py at {_SIBLING}\n"
        "This skill depends on knowledge-page-authoring being installed "
        "alongside it at .claude/skills/knowledge-page-authoring/."
    )

_spec = importlib.util.spec_from_file_location("consistency_checks", _SIBLING)
consistency_checks = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(consistency_checks)
run_all_checks = consistency_checks.run_all_checks
severity_of = consistency_checks.severity_of
SEVERITY_ORDER = consistency_checks.SEVERITY_ORDER

try:
    import yaml
except ImportError:
    yaml = None

FM_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)


def parse_frontmatter(text):
    m = FM_RE.match(text)
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
    return fm, body


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--docs-dir", default="docs")
    ap.add_argument("--out", default="_meta/audit-report.md",
                     help="Full per-file findings always go to a file, never to stdout by "
                          "default — a 465-file report is ~1500 lines, and an AI agent reading "
                          "that every time it wants a headline number is pure token waste. "
                          "Use --stdout to force printing the full report anyway.")
    ap.add_argument("--json", default=None, help="Also write machine-readable JSON to this path")
    ap.add_argument("--min-severity", default="LOW",
                     choices=["CRITICAL", "HIGH", "MEDIUM", "LOW"],
                     help="Only report issues at or above this severity")
    ap.add_argument("--domain", default=None,
                     help="Scope the whole run to one top-level section (e.g. 'ai-protocols') "
                          "instead of all 465+ pages — use this whenever you only care about "
                          "one part of the repo, which is most of the time. Combine with a "
                          "per-section index (build_section_indexes.py) for even less to read.")
    ap.add_argument("--since", default=None, metavar="GIT_REF",
                     help="Only scan files changed since this git ref (e.g. 'HEAD~5' or a "
                          "branch name) instead of the whole corpus — the right default for "
                          "'did my last batch of edits introduce anything' instead of a full "
                          "465-file pass. Severity totals in the printed summary are then "
                          "'changed files only', not repo-wide — said explicitly so it's not "
                          "mistaken for a full health check.")
    ap.add_argument("--stdout", action="store_true",
                     help="Print the full per-file report to stdout instead of only a summary")
    args = ap.parse_args()

    min_rank = SEVERITY_ORDER[args.min_severity]

    results = {}  # path -> [issues]
    severity_totals = Counter()
    check_totals = Counter()

    md_files = []
    if args.since:
        changed = subprocess.run(
            ["git", "diff", "--name-only", "--diff-filter=ACM", args.since, "--", f"{args.docs_dir}/**/*.md"],
            capture_output=True, text=True)
        if changed.returncode != 0:
            sys.exit(f"git diff against '{args.since}' failed: {changed.stderr.strip()}")
        md_files = [f for f in changed.stdout.splitlines() if f.strip() and os.path.isfile(f)]
        if args.domain:
            md_files = [f for f in md_files if f.startswith(os.path.join(args.docs_dir, args.domain))]
    else:
        scan_dir = os.path.join(args.docs_dir, args.domain) if args.domain else args.docs_dir
        if not os.path.isdir(scan_dir):
            sys.exit(f"'{scan_dir}' doesn't exist — check --domain against the top-level "
                     f"folder names under {args.docs_dir}/.")
        for r, _d, files in os.walk(scan_dir):
            for f in files:
                if f.endswith(".md"):
                    md_files.append(os.path.join(r, f))

    for path in sorted(md_files):
        text = open(path, encoding="utf-8", errors="replace").read()
        fm, body = parse_frontmatter(text)
        if fm is None:
            fm = {}
        issues = run_all_checks(fm, body, text)
        issues = [i for i in issues if SEVERITY_ORDER.get(severity_of(i), 9) <= min_rank]
        if issues:
            results[path] = issues
            for i in issues:
                severity_totals[severity_of(i)] += 1
                # bucket by the check's first few words after severity, for
                # a "what kind of issue is most common" summary
                key = i.split(":", 1)[1].strip().split(" — ")[0][:50]
                check_totals[key] += 1

    total_files = len(md_files)
    clean_files = total_files - len(results)

    lines = []
    lines.append("# Repo-wide Consistency Audit\n")
    lines.append(f"Files scanned: **{total_files}**  |  Clean: **{clean_files}**  |  "
                  f"With findings: **{len(results)}**\n")
    lines.append("## Findings by severity\n")
    lines.append("| Severity | Count |")
    lines.append("|---|---|")
    for sev in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]:
        lines.append(f"| {sev} | {severity_totals.get(sev, 0)} |")
    lines.append("")
    lines.append("## Most common issue types\n")
    lines.append("| Issue | Files affected |")
    lines.append("|---|---|")
    for issue, count in check_totals.most_common(15):
        lines.append(f"| {issue} | {count} |")
    lines.append("")
    lines.append("## Per-file findings\n")
    for path, issues in sorted(results.items(), key=lambda kv: (
            min(SEVERITY_ORDER.get(severity_of(i), 9) for i in kv[1]), kv[0])):
        lines.append(f"### `{path}`\n")
        for i in issues:
            lines.append(f"- {i}")
        lines.append("")

    report = "\n".join(lines)

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        f.write(report)

    if args.json:
        with open(args.json, "w", encoding="utf-8") as f:
            json.dump({"total_files": total_files, "clean_files": clean_files,
                       "severity_totals": dict(severity_totals),
                       "results": results}, f, indent=2)

    scope = []
    if args.domain:
        scope.append(f"domain={args.domain}")
    if args.since:
        scope.append(f"changed since {args.since}")
    scope_note = f" ({', '.join(scope)})" if scope else " (full corpus)"

    print(f"Consistency audit{scope_note}: {total_files} scanned, {clean_files} clean, "
          f"{len(results)} with findings.")
    print(f"CRITICAL: {severity_totals.get('CRITICAL', 0)}  "
          f"HIGH: {severity_totals.get('HIGH', 0)}  "
          f"MEDIUM: {severity_totals.get('MEDIUM', 0)}  "
          f"LOW: {severity_totals.get('LOW', 0)}")
    if check_totals:
        print("Top issue types:")
        for issue, count in check_totals.most_common(5):
            print(f"  {count:>4}  {issue}")
    print(f"\nFull per-file findings written to {args.out} — read that file directly (or "
          f"grep it for a specific path) rather than re-running with --stdout, unless you "
          f"specifically need everything in this context.")

    if args.stdout:
        print("\n" + report)

    return 1 if (severity_totals.get("CRITICAL", 0) or severity_totals.get("HIGH", 0)) else 0


if __name__ == "__main__":
    sys.exit(main())
