#!/usr/bin/env python3
"""
Given a topic summary or extracted document text, determine whether it
belongs on an existing page (update) or needs a new page — and if new,
which folder it most likely belongs in, based on similarity to existing
content.

Usage:
    python3 find_placement.py --text "summary or extracted text..."
    python3 find_placement.py --file path/to/extracted_or_draft.txt

Requires: scikit-learn (pip install --break-system-packages scikit-learn)
"""
import os
import re
import sys
import json
import argparse
from collections import Counter

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


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


def top_level_folder(path, docs_dir, levels=2):
    rel = os.path.relpath(path, docs_dir)
    parts = rel.split(os.sep)
    if len(parts) <= 1:
        return "(docs root)"
    return os.sep.join(parts[: min(levels, len(parts) - 1)])


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

    if os.path.exists(args.corpus):
        with open(args.corpus) as f:
            corpus = json.load(f)
        print(f"Using existing corpus: {args.corpus} ({len(corpus)} files)")
    else:
        print(f"No {args.corpus} — building a lightweight markdown-only corpus "
              f"from {args.docs_dir}/.")
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
        print("Corpus is empty — cannot determine placement. Defaulting to "
              "asking the user which folder this belongs in.")
        return 1

    input_clean = clean(input_text)
    all_texts = texts + [input_clean]

    vec = TfidfVectorizer(max_features=30000, stop_words="english",
                           ngram_range=(1, 2), min_df=1)
    X = vec.fit_transform(all_texts)
    sims = cosine_similarity(X[-1], X[:-1])[0]

    ranked = sorted(zip(sims, paths), reverse=True)[: args.top]

    print(f"\nTop {len(ranked)} most similar existing files:\n")
    for s, p in ranked:
        print(f"  {s:.0%}  {p}")

    top_match_score, top_match_path = ranked[0]
    folder_counts = Counter(top_level_folder(p, args.docs_dir) for _s, p in ranked)
    top_folder, folder_hits = folder_counts.most_common(1)[0]

    print("\n--- Recommendation ---")
    if top_match_score >= 0.60:
        print(f"UPDATE existing page: {top_match_path} ({top_match_score:.0%} similar)")
        print("This is close enough that new content should likely be merged "
              "into this page rather than creating a new one.")
    elif folder_hits >= max(3, len(ranked) // 2):
        print(f"NEW page, in folder: {args.docs_dir}/{top_folder}/")
        print(f"({folder_hits}/{len(ranked)} of the most similar existing files "
              f"live in this folder — reasonable confidence.)")
    else:
        print("NEW page — no strong existing-file match and no clear folder "
              "consensus among related content.")
        print(f"Closest folder guess: {args.docs_dir}/{top_folder}/ "
              f"({folder_hits}/{len(ranked)} of top matches), but confirm "
              f"placement with the user rather than assuming.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
