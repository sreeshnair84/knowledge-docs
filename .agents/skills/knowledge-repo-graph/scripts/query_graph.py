#!/usr/bin/env python3
"""
Query the graph built by build_graph.py. Four modes:

  --related <doc_id>     Every page connected to this one, by edge type,
                          strongest first. Answers "what else touches this
                          topic" and "is this a duplicate of something."

  --concept <tag>         Every page tagged with this concept (frontmatter).

  --tool <name>           Every page that mentions this technology or framework
                          in its body text. Fuzzy-matches on tool name/id.
                          Also supports --tool list to show all tool nodes
                          and page counts sorted by coverage.

  --duplicates [--min 0.6]
                          All duplicate-candidate clusters at or above the
                          given similarity, most severe first.

Usage:
    python3 query_graph.py --related ai-protocols/mcp/some-page
    python3 query_graph.py --concept kubernetes
    python3 query_graph.py --tool langgraph
    python3 query_graph.py --tool list
    python3 query_graph.py --duplicates --min 0.6
"""
import json
import argparse
from collections import defaultdict


def load(path):
    return json.load(open(path, encoding="utf-8"))


def cmd_related(graph, doc_id, top):
    titles = {n["id"]: n.get("title", n["id"]) for n in graph["nodes"]}
    if doc_id not in titles:
        print(f"'{doc_id}' not found in graph. Use the doc_id form: 'folder/subfolder/filename' (no .md).")
        return
    hits = []
    for e in graph["edges"]:
        if e["source"] == doc_id:
            hits.append((e["target"], e["type"], e.get("tier", ""), e["weight"]))
        elif e["target"] == doc_id and e["type"] != "tagged":
            hits.append((e["source"], e["type"], e.get("tier", ""), e["weight"]))
    hits.sort(key=lambda h: -h[3])
    print(f"'{doc_id}' — {titles[doc_id]}\n")
    for target, etype, tier, weight in hits[:top]:
        label = titles.get(target, target)
        tag = f" [{tier}]" if tier else ""
        print(f"  {weight:.0%}  {etype:10s}{tag}  {target}  — {label}")
    if not hits:
        print("  No connections found above the graph's similarity threshold.")


def cmd_concept(graph, concept):
    concept_id = f"concept:{concept}"
    titles = {n["id"]: n.get("title", n["id"]) for n in graph["nodes"]}
    pages = [e["source"] for e in graph["edges"]
             if e["type"] == "tagged" and e["target"] == concept_id]
    if not pages:
        # fuzzy fallback: substring match on concept node ids
        matches = [n["id"] for n in graph["nodes"]
                   if n["type"] == "concept" and concept.lower() in n["id"].lower()]
        if matches:
            print(f"No exact tag '{concept}'. Did you mean: "
                  f"{', '.join(m.replace('concept:', '') for m in matches[:10])}?")
        else:
            print(f"No pages or concepts matching '{concept}'.")
        return
    print(f"Pages tagged '{concept}' ({len(pages)}):\n")
    for p in pages:
        print(f"  {p}  — {titles.get(p, p)}")


def cmd_tool(graph, tool_query):
    """Find pages that mention a tool. 'list' shows all tools by coverage."""
    tool_nodes = {n["id"]: n for n in graph["nodes"] if n["type"] == "tool"}
    titles = {n["id"]: n.get("title", n["id"]) for n in graph["nodes"]}

    if tool_query.lower() == "list":
        counts = defaultdict(int)
        for e in graph["edges"]:
            if e["type"] == "mentions":
                counts[e["target"]] += 1
        ranked = sorted(tool_nodes.items(), key=lambda kv: -counts.get(kv[0], 0))
        print(f"Tools in graph ({len(tool_nodes)} total), by page coverage:\n")
        for tid, tnode in ranked:
            cat = tnode.get("category", "")
            name = tnode.get("name", tid)
            print(f"  {counts.get(tid, 0):4d} pages  [{cat:18s}]  {name}")
        return

    # find matching tool nodes (exact id match or substring on name)
    query_norm = tool_query.lower().replace("-", "").replace(" ", "")
    matches = [
        (tid, tnode) for tid, tnode in tool_nodes.items()
        if query_norm in tid.lower().replace("-", "").replace(":", "")
        or query_norm in tnode.get("name", "").lower().replace("-", "").replace(" ", "")
    ]
    if not matches:
        all_names = [n.get("name", n["id"]) for n in tool_nodes.values()]
        print(f"No tool matching '{tool_query}'. Available: {', '.join(sorted(all_names))}")
        return

    for tid, tnode in matches:
        pages = [e["source"] for e in graph["edges"]
                 if e["type"] == "mentions" and e["target"] == tid]
        cat = tnode.get("category", "")
        desc = tnode.get("description", "")
        print(f"Tool: {tnode.get('name', tid)}  [{cat}]")
        if desc:
            print(f"      {desc}")
        print(f"      {len(pages)} page(s) mention this tool:\n")
        # group by domain for readability
        by_domain = defaultdict(list)
        for p in sorted(pages):
            domain = p.split("/")[0]
            by_domain[domain].append(p)
        for domain in sorted(by_domain):
            print(f"  {domain}/")
            for p in by_domain[domain]:
                print(f"    {p}  — {titles.get(p, p)}")
        print()


def cmd_duplicates(graph, min_sim):
    edges = [e for e in graph["edges"] if e["type"] == "similar_to" and e["weight"] >= min_sim]
    parent = {}

    def find(x):
        parent.setdefault(x, x)
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb

    for e in edges:
        union(e["source"], e["target"])

    clusters = defaultdict(set)
    for e in edges:
        clusters[find(e["source"])].add(e["source"])
        clusters[find(e["target"])].add(e["target"])

    titles = {n["id"]: n.get("title", n["id"]) for n in graph["nodes"]}
    ranked = sorted(clusters.values(), key=lambda members: -max(
        (e["weight"] for e in edges if e["source"] in members and e["target"] in members),
        default=0))

    print(f"{len(ranked)} duplicate-candidate cluster(s) at >= {min_sim:.0%} similarity:\n")
    for members in ranked:
        print(f"Cluster ({len(members)} pages):")
        for m in sorted(members):
            print(f"  {m}  — {titles.get(m, m)}")
        print()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--graph", default="_meta/graph.json")
    ap.add_argument("--related", metavar="DOC_ID")
    ap.add_argument("--concept", metavar="TAG")
    ap.add_argument("--tool", metavar="NAME_OR_list",
                     help="Find pages mentioning this tool, or 'list' to show all tools")
    ap.add_argument("--duplicates", action="store_true")
    ap.add_argument("--min", type=float, default=0.6, help="Min similarity for --duplicates")
    ap.add_argument("--top", type=int, default=15, help="Max results for --related")
    args = ap.parse_args()

    graph = load(args.graph)

    if args.related:
        cmd_related(graph, args.related, args.top)
    elif args.concept:
        cmd_concept(graph, args.concept)
    elif args.tool:
        cmd_tool(graph, args.tool)
    elif args.duplicates:
        cmd_duplicates(graph, args.min)
    else:
        print("Specify one of --related <doc_id>, --concept <tag>, --tool <name>, or --duplicates.")


if __name__ == "__main__":
    main()
