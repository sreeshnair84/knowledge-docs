#!/usr/bin/env python3
"""
Full-corpus pairwise duplicate check for the knowledge-docs repo.
Builds a TF-IDF matrix once over all docs/*.md files and reports every
pair above the similarity threshold in a single pass.

Tiers:
  >= 0.85  NEAR-DUPLICATE  — almost certainly redundant
  >= 0.60  HEAVY OVERLAP   — same topic twice, consider merging
  >= 0.35  MODERATE        — related but may be legitimately distinct

Usage:
    python _meta/run_duplicate_check.py [--threshold 0.35] [--docs-dir docs]
"""
import os
import re
import argparse
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


def clean(t):
    t = re.sub(r"<[^>]+>", " ", t)
    t = re.sub(r"!\[.*?\]\(.*?\)", " ", t)
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", t)
    t = re.sub(r"---+", " ", t)
    t = re.sub(r"\s+", " ", t)
    return t.strip()


def tier(s):
    if s >= 0.85:
        return "NEAR-DUPLICATE"
    if s >= 0.60:
        return "HEAVY OVERLAP "
    return "MODERATE      "


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--threshold", type=float, default=0.35)
    ap.add_argument("--docs-dir", default="docs")
    args = ap.parse_args()

    paths, texts = [], []
    for root, _dirs, files in os.walk(args.docs_dir):
        for fn in sorted(files):
            if fn.lower().endswith(".md"):
                p = os.path.join(root, fn)
                try:
                    with open(p, encoding="utf-8", errors="ignore") as f:
                        raw = f.read()
                    c = clean(raw)
                    if len(c) > 200:
                        paths.append(p)
                        texts.append(c)
                except Exception:
                    continue

    print(f"Loaded {len(paths)} markdown files from {args.docs_dir}/")

    vec = TfidfVectorizer(max_features=30000, stop_words="english",
                          ngram_range=(1, 2), min_df=1)
    X = vec.fit_transform(texts)
    print("TF-IDF matrix built. Computing pairwise similarities...")

    sim = cosine_similarity(X)
    n = len(paths)

    # collect upper triangle only (avoid reporting each pair twice)
    pairs = []
    for i in range(n):
        for j in range(i + 1, n):
            s = float(sim[i, j])
            if s >= args.threshold:
                pairs.append((s, paths[i], paths[j]))

    pairs.sort(reverse=True)

    near = [p for p in pairs if p[0] >= 0.85]
    heavy = [p for p in pairs if 0.60 <= p[0] < 0.85]
    moderate = [p for p in pairs if args.threshold <= p[0] < 0.60]

    print(f"\n{'='*70}")
    print(f"DUPLICATE CHECK RESULTS  (threshold={args.threshold:.0%})")
    print(f"{'='*70}")
    print(f"  Near-duplicate  (>=85%): {len(near)}")
    print(f"  Heavy overlap   (>=60%): {len(heavy)}")
    print(f"  Moderate        (>={args.threshold:.0%}): {len(moderate)}")
    print(f"  Total pairs flagged    : {len(pairs)}")
    print(f"{'='*70}\n")

    for s, a, b in pairs:
        print(f"[{tier(s)}  {s:.0%}]")
        print(f"  A: {a}")
        print(f"  B: {b}")
        print()

    if near:
        print(f"\nACTION NEEDED: {len(near)} near-duplicate pair(s) should be reviewed for consolidation.")
    elif heavy:
        print(f"\nREVIEW RECOMMENDED: {len(heavy)} heavy-overlap pair(s) may benefit from merging.")
    else:
        print("\nNo near-duplicates or heavy overlap found.")


if __name__ == "__main__":
    main()
