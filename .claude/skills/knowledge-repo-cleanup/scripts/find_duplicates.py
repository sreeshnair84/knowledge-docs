#!/usr/bin/env python3
"""
Compute pairwise content similarity across every file in _meta/corpus.json
(produced by extract_corpus.py) and write _meta/duplicate-pairs.csv.

Strips HTML tags and markdown link/image syntax before comparing, so
repeated <iframe>/<details> wrapper boilerplate doesn't inflate similarity
between otherwise-unrelated index pages.

Usage:
    python3 find_duplicates.py [--threshold 0.4] [--corpus _meta/corpus.json]

Requires: scikit-learn (pip install --break-system-packages scikit-learn)
"""

import argparse
import csv
import json
import re

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def clean(t):
    t = re.sub(r"<[^>]+>", " ", t)
    t = re.sub(r"!\[.*?\]\(.*?\)", " ", t)
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", t)
    t = re.sub(r"Open in new tab.*", "", t)
    t = re.sub(r"---+", " ", t)
    t = re.sub(r"\s+", " ", t)
    return t.strip()


def tier(score):
    if score >= 0.85:
        return "near-duplicate (merge/delete one)"
    if score >= 0.6:
        return "heavy overlap (consolidate)"
    return "moderate overlap (review)"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default="_meta/corpus.json")
    ap.add_argument("--out", default="_meta/duplicate-pairs.csv")
    ap.add_argument("--threshold", type=float, default=0.4)
    ap.add_argument("--min-chars", type=int, default=300)
    args = ap.parse_args()

    with open(args.corpus, encoding="utf-8") as f:
        corpus = json.load(f)

    paths, texts = [], []
    for p, t in corpus.items():
        if not t or t.startswith("[ERROR"):
            continue
        c = clean(t)
        if len(c) > args.min_chars:
            paths.append(p)
            texts.append(c)

    print(f"Usable docs after cleaning: {len(paths)} / {len(corpus)}")

    vec = TfidfVectorizer(max_features=30000, stop_words="english", ngram_range=(1, 2), min_df=2)
    X = vec.fit_transform(texts)
    sim = cosine_similarity(X)

    n = len(paths)
    rows = []
    for i in range(n):
        for j in range(i + 1, n):
            s = sim[i][j]
            if s > args.threshold:
                rows.append((round(float(s), 3), paths[i], paths[j], tier(s)))

    rows.sort(reverse=True)
    with open(args.out, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["similarity", "file_a", "file_b", "tier"])
        w.writerows(rows)

    print(f"Total pairs written to {args.out}: {len(rows)}")
    print(f"  >=0.85 (near-duplicate): {sum(1 for r in rows if r[0] >= 0.85)}")
    print(f"  0.6-0.85 (heavy overlap): {sum(1 for r in rows if 0.6 <= r[0] < 0.85)}")
    print(f"  {args.threshold}-0.6 (moderate): {sum(1 for r in rows if args.threshold <= r[0] < 0.6)}")


if __name__ == "__main__":
    main()
