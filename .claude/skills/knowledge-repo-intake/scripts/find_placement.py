#!/usr/bin/env python3
"""
Given a topic summary or extracted document text, determine whether it
belongs on an existing page (update) or needs a new page — and if new,
which folder it most likely belongs in.

Checks TWO signals, in this order of authority:
  1. The canonical taxonomy map (references/taxonomy.json, maintained in the
     knowledge-page-authoring skill) — an explicit, human-curated folder map.
     This wins when it conflicts with signal 2, because similarity just
     reflects however the repo already happens to be organized, mistakes
     included.
  2. Content similarity against the existing corpus — used when the
     taxonomy map doesn't confidently match anything, or to find the
     specific existing page a new page's content is closest to.

Usage:
    python3 find_placement.py --text "summary or extracted text..."
    python3 find_placement.py --file path/to/extracted_or_draft.txt

Requires: scikit-learn (pip install --break-system-packages scikit-learn)
"""

import argparse
import json
import os
import re
import sys
from collections import Counter

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

TAXONOMY_SEARCH_PATHS = [
    # sibling skill install layout: .claude/skills/{this-skill}/../knowledge-page-authoring/...
    os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "..",
        "..",
        "knowledge-page-authoring",
        "references",
        "taxonomy.json",
    ),
    os.path.join("references", "taxonomy.json"),  # if run from within knowledge-page-authoring itself
]


def load_taxonomy():
    for path in TAXONOMY_SEARCH_PATHS:
        if os.path.exists(path):
            with open(path) as f:
                return json.load(f), path
    return None, None


def taxonomy_match(text, taxonomy):
    """Score each canonical folder by keyword hits in the input text.
    Returns a list of (folder, score, matched_keywords), sorted best first."""
    text_lower = text.lower()
    results = []
    for folder, spec in taxonomy.items():
        hits = [kw for kw in spec.get("keywords", []) if kw in text_lower]
        excluded = [kw for kw in spec.get("not_keywords", []) if kw in text_lower]
        if hits and not excluded:
            results.append((folder, len(hits), hits))
    results.sort(key=lambda r: r[1], reverse=True)
    return results


def clean(t):
    t = re.sub(r"<[^>]+>", " ", t)
    t = re.sub(r"!\[.*?\]\(.*?\)", " ", t)
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", t)
    t = re.sub(r"---+", " ", t)
    t = re.sub(r"\s+", " ", t)
    return t.strip()


def build_lightweight_corpus(docs_dir):
    corpus = {}
    for root, _dirs, files in os.walk(docs_dir):
        for fn in files:
            if fn.lower().endswith(".md"):
                path = os.path.join(root, fn)
                try:
                    with open(path, encoding="utf-8", errors="ignore") as f:
                        corpus[path] = f.read()
                except Exception:
                    continue
    return corpus


def normpath(p):
    """Normalize to forward slashes regardless of which OS wrote the path
    into corpus.json — the cleanup skill may have run on Windows while this
    runs on Linux/Mac, or vice versa."""
    return p.replace("\\", "/")


def top_level_folder(path, docs_dir, levels=2):
    path = normpath(path)
    docs_dir = normpath(docs_dir)
    if not path.startswith(docs_dir):
        # fall back to a simple relative split if docs_dir prefix doesn't match
        rel = path
    else:
        rel = path[len(docs_dir) :].lstrip("/")
    parts = [p for p in rel.split("/") if p]
    if len(parts) <= 1:
        return "(docs root)"
    return "/".join(parts[: min(levels, len(parts) - 1)])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--text", default=None)
    ap.add_argument("--file", default=None)
    ap.add_argument("--docs-dir", default="docs")
    ap.add_argument("--corpus", default="_meta/corpus.json")
    ap.add_argument("--top", type=int, default=10)
    args = ap.parse_args()

    if not args.text and not args.file:
        raise SystemExit("Provide --text or --file")

    if args.file:
        with open(args.file, encoding="utf-8", errors="ignore") as f:
            input_text = f.read()
    else:
        input_text = args.text

    taxonomy, taxonomy_path = load_taxonomy()
    if taxonomy:
        print(f"Loaded canonical taxonomy: {taxonomy_path}")
        tax_matches = taxonomy_match(input_text, taxonomy)
    else:
        print(
            "No taxonomy.json found (expected alongside a sibling "
            "knowledge-page-authoring install) — falling back to "
            "similarity-only placement. Install that skill for canonical "
            "taxonomy guidance."
        )
        tax_matches = []

    if tax_matches:
        print("\nCanonical taxonomy match(es):")
        for folder, _score, hits in tax_matches[:3]:
            print(f"  docs/{folder}/  (matched: {', '.join(hits)})")

    if os.path.exists(args.corpus):
        with open(args.corpus) as f:
            corpus = json.load(f)
        print(f"Using existing corpus: {args.corpus} ({len(corpus)} files)")
    else:
        print(f"No {args.corpus} — building a lightweight markdown-only corpus from {args.docs_dir}/.")
        corpus = build_lightweight_corpus(args.docs_dir)
        print(f"Built corpus: {len(corpus)} markdown files")

    paths, texts = [], []
    for p, t in corpus.items():
        if not t or t.startswith("[ERROR"):
            continue
        c = clean(t)
        if len(c) > 200:
            paths.append(p)
            texts.append(c)

    if not paths:
        print(
            "Corpus is empty — cannot determine placement. Defaulting to asking the user which folder this belongs in."
        )
        return 1

    input_clean = clean(input_text)
    all_texts = texts + [input_clean]

    vec = TfidfVectorizer(max_features=30000, stop_words="english", ngram_range=(1, 2), min_df=1)
    X = vec.fit_transform(all_texts)
    sims = cosine_similarity(X[-1], X[:-1])[0]

    ranked = sorted(zip(sims, paths, strict=False), reverse=True)[: args.top]

    print(f"\nTop {len(ranked)} most similar existing files:\n")
    for s, p in ranked:
        print(f"  {s:.0%}  {p}")

    top_match_score, top_match_path = ranked[0]
    folder_counts = Counter(top_level_folder(p, args.docs_dir) for _s, p in ranked)
    top_folder, folder_hits = folder_counts.most_common(1)[0]

    deprecated = (taxonomy or {}).get("_deprecated_folders", {})

    def deprecated_redirect(path):
        path = normpath(path)
        docs_norm = normpath(args.docs_dir)
        rel = path[len(docs_norm) :].lstrip("/") if path.startswith(docs_norm) else path
        for old_prefix, new_prefix in deprecated.items():
            if rel.startswith(normpath(old_prefix)):
                return new_prefix
        return None

    print("\n--- Recommendation ---")

    redirect = deprecated_redirect(top_match_path) if top_match_score >= 0.60 else None
    if redirect:
        print(f"CAUTION: closest match ({top_match_score:.0%}) is {top_match_path},")
        print("which lives in a KNOWN DEPRECATED location per the canonical taxonomy.")
        print("Don't add new content there. Either:")
        print(f"  (a) migrate that existing page to docs/{redirect}/ as part of this change, or")
        print(f"  (b) place new content directly in docs/{redirect}/ and flag the old page for migration.")
    elif top_match_score >= 0.60:
        print(f"UPDATE existing page: {top_match_path} ({top_match_score:.0%} similar)")
        print(
            "This is close enough that new content should likely be merged "
            "into this page rather than creating a new one."
        )
    elif tax_matches:
        best_folder = tax_matches[0][0]
        print(f"NEW page, in folder: docs/{best_folder}/")
        print(f"(canonical taxonomy match on: {', '.join(tax_matches[0][2])})")
        if top_folder != best_folder and folder_hits >= max(3, len(ranked) // 2):
            print(
                f"Note: similarity-based signal pointed at docs/{top_folder}/ instead "
                f"({folder_hits}/{len(ranked)} of closest files) — going with the "
                f"canonical taxonomy match since it's the authoritative signal when "
                f"the two disagree."
            )
    elif folder_hits >= max(3, len(ranked) // 2):
        print(f"NEW page, in folder: {args.docs_dir}/{top_folder}/")
        print(
            f"({folder_hits}/{len(ranked)} of the most similar existing files "
            f"live in this folder — reasonable confidence.)"
        )
    else:
        print(
            "NEW page — no strong existing-file match, no taxonomy keyword match, "
            "and no clear folder consensus among related content."
        )
        print(
            f"Closest folder guess: {args.docs_dir}/{top_folder}/ "
            f"({folder_hits}/{len(ranked)} of top matches), but confirm "
            f"placement with the user rather than assuming."
        )

    return 0


if __name__ == "__main__":
    sys.exit(main())
