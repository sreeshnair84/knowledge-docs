#!/usr/bin/env python3
"""
Build a knowledge graph of the docs/ corpus: every page is a node, every
tag/topic is a concept node, and edges capture four independent kinds of
relationship that each answer a different question:

  similar_to   (page <-> page, weighted 0-1)
      TF-IDF cosine similarity over cleaned page text. This is the
      duplication signal: a high-weight similar_to edge between two pages
      in DIFFERENT directories is exactly what a "should this be one page,
      not two" review needs to see. Same-directory high similarity is
      usually a legitimate multi-part series, not duplication — the graph
      keeps both but a human/tool reading it can tell them apart by path.

  links_to     (page -> page)
      Actual markdown [text](path.md) links already in the content — the
      only edge type that's an explicit authorial signal, not inferred.

  part_of      (page -> category)
      Sidebar hierarchy from sidebars.js — the navigational structure as
      it's actually presented to a reader, independent of folder layout.

  tagged       (page -> concept)
      From frontmatter tags — the facet-based taxonomy (domain/doc_type/
      topic) from knowledge-page-authoring/references/taxonomy.md.

Why this matters for duplication specifically: title-matching (what the
original repo audit used) only catches duplicates that happen to share a
title. Content-hash matching only catches byte-identical copies. Pairwise
TF-IDF similarity catches near-duplicates regardless of title or exact
wording — which is exactly the category that slipped through the repo's
existing pre-commit duplicate check (that check only compares a NEW page
against the existing corpus one at a time; it has never been run as a full
NxN pass against everything that exists today).

Usage:
    python3 build_graph.py [--docs-dir docs] [--sidebars sidebars.js]
                           [--sim-threshold 0.3] [--out graph.json]

Requires: scikit-learn, pyyaml
"""
import os
import re
import sys
import json
import argparse
import subprocess
from collections import defaultdict

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

try:
    import yaml
except ImportError:
    yaml = None

FM_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)
LINK_RE = re.compile(r"\]\(((?!http|#|mailto)[^)]+\.md[^)]*)\)")


def clean_text(t):
    t = re.sub(r"```.*?```", " ", t, flags=re.DOTALL)  # code blocks skew topic similarity
    t = re.sub(r"<[^>]+>", " ", t)
    t = re.sub(r"!\[.*?\]\(.*?\)", " ", t)
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", t)
    t = re.sub(r"---+", " ", t)
    t = re.sub(r"\s+", " ", t)
    return t.strip()


def parse_frontmatter(text):
    m = FM_RE.match(text)
    if not m:
        return {}, text
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


def get_sidebar_hierarchy(sidebars_path, docs_dir):
    """Returns {doc_id: category_path} by running sidebars.js through node,
    same approach as the earlier ad-hoc nesting-depth analysis, generalized
    into a reusable JSON dump."""
    script = f"""
    const sidebars = require('{os.path.abspath(sidebars_path)}');
    const items = sidebars.tutorialSidebar;
    const out = [];
    function walk(items, path) {{
      for (const item of items) {{
        if (typeof item === 'string') {{ out.push([item, path]); continue; }}
        if (item.type === 'doc') {{ out.push([item.id, path]); continue; }}
        if (item.type === 'category') {{
          walk(item.items || [], path.concat([item.label]));
        }}
      }}
    }}
    walk(items, []);
    console.log(JSON.stringify(out));
    """
    result = subprocess.run(["node", "-e", script], capture_output=True, text=True,
                             cwd=os.path.dirname(os.path.abspath(sidebars_path)) or ".")
    if result.returncode != 0:
        print(f"WARNING: could not parse {sidebars_path} for hierarchy: {result.stderr[:300]}",
              file=sys.stderr)
        return {}
    pairs = json.loads(result.stdout)
    return {doc_id: " > ".join(path) for doc_id, path in pairs}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--docs-dir", default="docs")
    ap.add_argument("--sidebars", default="sidebars.js")
    ap.add_argument("--sim-threshold", type=float, default=0.3,
                     help="Minimum cosine similarity to create a similar_to edge")
    ap.add_argument("--out", default="_meta/graph.json")
    ap.add_argument("--clusters-out", default="_meta/duplicate-clusters.md")
    args = ap.parse_args()

    # --- collect pages ---
    doc_ids, raw_texts, metas = [], [], []
    for r, _d, files in os.walk(args.docs_dir):
        for f in files:
            if not f.endswith(".md"):
                continue
            full = os.path.join(r, f)
            doc_id = os.path.relpath(full, args.docs_dir)[:-3].replace(os.sep, "/")
            text = open(full, encoding="utf-8", errors="replace").read()
            fm, body = parse_frontmatter(text)
            doc_ids.append(doc_id)
            raw_texts.append((clean_text(body), body, text))
            metas.append({
                "id": doc_id,
                "title": fm.get("title", doc_id),
                "domain": doc_id.split("/")[0],
                "doc_type": fm.get("doc_type", "unknown"),
                "tags": fm.get("tags") or [],
                "word_count": len(body.split()),
                "path": full,
            })

    print(f"Collected {len(doc_ids)} pages.")

    # --- similarity edges ---
    cleaned = [t[0] for t in raw_texts]
    vec = TfidfVectorizer(max_features=40000, stop_words="english", ngram_range=(1, 2), min_df=2)
    X = vec.fit_transform(cleaned)
    sim = cosine_similarity(X)

    sim_edges = []
    n = len(doc_ids)
    for i in range(n):
        for j in range(i + 1, n):
            s = float(sim[i][j])
            if s >= args.sim_threshold:
                sim_edges.append((doc_ids[i], doc_ids[j], round(s, 4)))
    sim_edges.sort(key=lambda e: -e[2])
    print(f"similar_to edges (>= {args.sim_threshold}): {len(sim_edges)}")

    # --- duplicate-candidate clusters: connected components at >=0.6 ---
    NEAR_DUP, HEAVY_OVERLAP = 0.85, 0.6
    parent = {d: d for d in doc_ids}

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb

    for a, b, s in sim_edges:
        if s >= HEAVY_OVERLAP:
            union(a, b)

    clusters = defaultdict(list)
    for d in doc_ids:
        clusters[find(d)].append(d)
    dup_clusters = {k: v for k, v in clusters.items() if len(v) > 1}

    # --- links_to edges (actual markdown links) ---
    link_edges = []
    for doc_id, (_c, _b, full_text) in zip(doc_ids, raw_texts):
        src_dir = os.path.dirname(os.path.join(args.docs_dir, doc_id + ".md"))
        for m in LINK_RE.finditer(full_text):
            target = m.group(1).split("#")[0]
            target_path = os.path.normpath(os.path.join(src_dir, target))
            target_id = os.path.relpath(target_path, args.docs_dir)[:-3].replace(os.sep, "/")
            if target_id in doc_ids:
                link_edges.append((doc_id, target_id))
    print(f"links_to edges: {len(link_edges)}")

    # --- part_of edges (sidebar hierarchy) ---
    hierarchy = get_sidebar_hierarchy(args.sidebars, args.docs_dir)
    print(f"Sidebar hierarchy resolved for {len(hierarchy)} pages.")

    # --- tagged edges (concept nodes from frontmatter tags) ---
    concept_nodes = set()
    tag_edges = []
    for meta in metas:
        for t in meta["tags"]:
            concept_nodes.add(t)
            tag_edges.append((meta["id"], t))

    # --- assemble graph ---
    nodes = []
    for meta in metas:
        nodes.append({
            "id": meta["id"], "type": "page", "title": meta["title"],
            "domain": meta["domain"], "doc_type": meta["doc_type"],
            "tags": meta["tags"], "word_count": meta["word_count"],
            "category_path": hierarchy.get(meta["id"], ""),
        })
    for c in sorted(concept_nodes):
        nodes.append({"id": f"concept:{c}", "type": "concept", "title": c})

    edges = []
    for a, b, s in sim_edges:
        tier = "near_duplicate" if s >= NEAR_DUP else "heavy_overlap" if s >= HEAVY_OVERLAP else "related"
        edges.append({"source": a, "target": b, "type": "similar_to", "weight": s, "tier": tier})
    for a, b in link_edges:
        edges.append({"source": a, "target": b, "type": "links_to", "weight": 1.0})
    for a, t in tag_edges:
        edges.append({"source": a, "target": f"concept:{t}", "type": "tagged", "weight": 1.0})

    graph = {
        "generated_from": args.docs_dir,
        "page_count": len(doc_ids),
        "concept_count": len(concept_nodes),
        "edge_counts": {
            "similar_to": len(sim_edges),
            "links_to": len(link_edges),
            "tagged": len(tag_edges),
        },
        "nodes": nodes,
        "edges": edges,
    }

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(graph, f, indent=1)
    print(f"\nGraph written to {args.out} "
          f"({len(nodes)} nodes, {len(edges)} edges).")

    # --- duplicate-clusters report ---
    lines = ["# Duplicate-Candidate Clusters (>=0.6 similarity, connected components)\n"]
    lines.append(f"{len(dup_clusters)} cluster(s) found across {len(doc_ids)} pages.\n")
    for root, members in sorted(dup_clusters.items(), key=lambda kv: -len(kv[1])):
        lines.append(f"## Cluster ({len(members)} pages)\n")
        for m in members:
            lines.append(f"- `{m}`")
        # show the pairwise scores within this cluster
        lines.append("\nPairwise similarity within this cluster:\n")
        for a, b, s in sim_edges:
            if a in members and b in members:
                lines.append(f"- {s:.0%}  `{a}` <-> `{b}`")
        lines.append("")
    with open(args.clusters_out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"Duplicate-cluster report written to {args.clusters_out} ({len(dup_clusters)} clusters).")

    return 0


if __name__ == "__main__":
    sys.exit(main())
