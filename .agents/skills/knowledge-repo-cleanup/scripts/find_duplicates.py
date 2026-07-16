#!/usr/bin/env python3
"""
SUPERSEDED for day-to-day use by knowledge-repo-graph's build_graph.py,
which reads docs/**/*.md directly and can't go stale independently of the
content the way this script can — it did, in fact, go stale: a run of this
exact script before the 2026-07-10 cleanup produced _meta/duplicate-
pairs.csv, and 381 of that file's 543 rows still reference .pdf files
deleted during that same cleanup. Nothing re-ran this script afterward, so
anything trusting duplicate-pairs.csv today gets mostly wrong answers.

Kept in this skill for the one case it's still right for: a repo that
still has non-Markdown source files (PDF/DOCX/PPTX) in its content tree,
where extract_corpus.py's text extraction is doing real work this script's
sibling (knowledge-repo-graph, Markdown-only) can't do. If docs/ is
already all-Markdown (check with `find docs -type f -not -name "*.md"`),
use knowledge-repo-graph instead and don't run this.

If you do run this, re-run extract_corpus.py fully first — a partial or
old corpus.json is worse than no corpus.json, because its output looks
just as confident either way.

---

Compute pairwise content similarity across every file in _meta/corpus.json
(produced by extract_corpus.py) and write _meta/duplicate-pairs.csv.

Strips HTML tags and markdown link/image syntax before comparing, so
repeated <iframe>/<details> wrapper boilerplate doesn't inflate similarity
between otherwise-unrelated index pages.

Usage:
    python3 find_duplicates.py [--threshold 0.4] [--corpus _meta/corpus.json]

Requires: scikit-learn (pip install --break-system-packages scikit-learn)
"""
import os
import sys
import json
import re
import csv
import argparse

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

    def _exists(p):
        # extract_corpus.py has stored backslash-separated paths in some
        # runs (a portability bug in that script, not in the data itself)
        # — normalize before checking, or every path looks stale on Linux
        # regardless of whether the file genuinely exists.
        return os.path.exists(p) or os.path.exists(p.replace("\\", "/"))

    missing = [p for p in corpus if not _exists(p)]
    if missing:
        pct = 100 * len(missing) / len(corpus)
        print(f"WARNING: {len(missing)}/{len(corpus)} ({pct:.0f}%) of the paths in "
              f"{args.corpus} no longer exist on disk (path-separator differences already "
              f"normalized out). This corpus snapshot is stale — its output will confidently "
              f"report duplicates involving files that have been deleted, renamed, or "
              f"converted since it was extracted.")
        print("Re-run extract_corpus.py before trusting this output, or use "
              "knowledge-repo-graph's build_graph.py instead if docs/ is now all-Markdown.")
        if pct > 20:
            sys.exit("Refusing to proceed: more than 20% of the corpus is stale. "
                     "Pass --force-stale to override.") if "--force-stale" not in sys.argv else None

    paths, texts = [], []
    for p, t in corpus.items():
        if not t or t.startswith("[ERROR"):
            continue
        c = clean(t)
        if len(c) > args.min_chars:
            paths.append(p)
            texts.append(c)

    print(f"Usable docs after cleaning: {len(paths)} / {len(corpus)}")

    vec = TfidfVectorizer(
        max_features=30000, stop_words="english", ngram_range=(1, 2), min_df=2
    )
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
