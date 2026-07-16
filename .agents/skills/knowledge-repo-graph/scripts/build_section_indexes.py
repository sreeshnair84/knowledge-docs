#!/usr/bin/env python3
"""
Generate one lightweight index file per top-level docs/ section:
    docs/<section>/_index.json

Each index lists every page in that section with just enough metadata to
decide "do I need to open this file" without opening it: title, doc_type,
tags, word count, last_reviewed, and its 3 nearest neighbors by content
similarity (pulled from _meta/graph.json if present).

This is the concrete version of the "per-section index" idea: instead of
an agent walking all 465 files (or grepping the whole tree) to answer
"what already exists about X", it reads one ~5-10KB file for the relevant
section. Combined with knowledge-repo-graph's --domain scoping and
knowledge-repo-consistency-audit's --domain flag, a maintenance task on
one section never needs to touch the other 18.

Usage:
    python3 build_section_indexes.py [--docs-dir docs] [--graph _meta/graph.json]

Regenerate whenever pages are added/removed/retitled in a section — cheap
enough (one section's worth of file reads) to do on every commit that
touches that section, not just on a schedule.
"""
import os
import re
import sys
import json
import argparse

FM_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)

try:
    import yaml
except ImportError:
    yaml = None


def parse_frontmatter(text):
    m = FM_RE.match(text)
    if not m:
        return {}
    if yaml:
        try:
            return yaml.safe_load(m.group(1)) or {}
        except Exception:
            return {}
    return {}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--docs-dir", default="docs")
    ap.add_argument("--graph", default="_meta/graph.json",
                     help="If present, used to attach each page's top-3 similar "
                          "pages by content — skipped (with a warning) if missing "
                          "or stale relative to the docs tree.")
    args = ap.parse_args()

    neighbors = {}
    if os.path.exists(args.graph):
        graph_mtime = os.path.getmtime(args.graph)
        newest_doc_mtime = max(
            (os.path.getmtime(os.path.join(r, f))
             for r, _d, files in os.walk(args.docs_dir) for f in files if f.endswith(".md")),
            default=0)
        if newest_doc_mtime > graph_mtime:
            print(f"WARNING: {args.graph} is older than the newest page in {args.docs_dir}/ — "
                  f"neighbor data in the generated indexes will be stale. Re-run "
                  f"knowledge-repo-graph's build_graph.py first for accurate neighbors.",
                  file=sys.stderr)
        graph = json.load(open(args.graph, encoding="utf-8"))
        sim_by_page = {}
        for e in graph["edges"]:
            if e["type"] != "similar_to":
                continue
            sim_by_page.setdefault(e["source"], []).append((e["target"], e["weight"]))
            sim_by_page.setdefault(e["target"], []).append((e["source"], e["weight"]))
        for page, sims in sim_by_page.items():
            sims.sort(key=lambda x: -x[1])
            neighbors[page] = sims[:3]
    else:
        print(f"No {args.graph} found — indexes will omit neighbor data. Run "
              f"knowledge-repo-graph's build_graph.py first for the full index.",
              file=sys.stderr)

    sections = [d for d in os.listdir(args.docs_dir)
                if os.path.isdir(os.path.join(args.docs_dir, d))]

    total_written = 0
    for section in sorted(sections):
        section_dir = os.path.join(args.docs_dir, section)
        entries = []
        for r, _d, files in os.walk(section_dir):
            for f in files:
                if not f.endswith(".md"):
                    continue
                full = os.path.join(r, f)
                doc_id = os.path.relpath(full, args.docs_dir)[:-3].replace(os.sep, "/")
                text = open(full, encoding="utf-8", errors="replace").read()
                fm = parse_frontmatter(text)
                body = FM_RE.sub("", text, count=1)
                entries.append({
                    "id": doc_id,
                    "title": fm.get("title", doc_id),
                    "doc_type": fm.get("doc_type", "unknown"),
                    "tags": fm.get("tags") or [],
                    "word_count": len(body.split()),
                    "last_reviewed": str(fm.get("last_reviewed", "")),
                    "status": fm.get("status", ""),
                    "top_similar": [{"id": n, "score": round(s, 2)} for n, s in neighbors.get(doc_id, [])],
                })

        if not entries:
            continue

        index = {
            "section": section,
            "page_count": len(entries),
            "pages": sorted(entries, key=lambda e: e["id"]),
        }
        out_path = os.path.join(section_dir, "_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(index, f, indent=1)
        total_written += 1

    print(f"Wrote {total_written} section index file(s) under {args.docs_dir}/*/_index.json")


if __name__ == "__main__":
    main()
