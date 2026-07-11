#!/usr/bin/env python3
"""
Compare a draft/new page against every existing file under docs/ and report
anything similar enough to be a duplication risk. This is the preventive
counterpart to the knowledge-repo-cleanup skill's find_duplicates.py — run
this BEFORE publishing new content, not after.

Usage:
    python3 check_against_corpus.py <path-to-draft.md> [--threshold 0.35]
                                     [--docs-dir docs] [--corpus _meta/corpus.json]

If _meta/corpus.json doesn't exist, builds a lightweight one from docs/ on
the fly (md files only, for speed — for a full md/pdf/docx/pptx corpus, run
the knowledge-repo-cleanup skill's extract_corpus.py first and this script
will use that instead).

Requires: scikit-learn (pip install --break-system-packages scikit-learn)
"""
import os
import re
import sys
import json
import argparse

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


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("draft")
    ap.add_argument("--threshold", type=float, default=0.35)
    ap.add_argument("--docs-dir", default="docs")
    ap.add_argument("--corpus", default="_meta/corpus.json")
    ap.add_argument("--top", type=int, default=5)
    args = ap.parse_args()

    if os.path.exists(args.corpus):
        with open(args.corpus) as f:
            corpus = json.load(f)
        print(f"Using existing corpus: {args.corpus} ({len(corpus)} files)")
    else:
        print(f"No {args.corpus} found — building a lightweight markdown-only "
              f"corpus from {args.docs_dir}/ (run knowledge-repo-cleanup's "
              f"extract_corpus.py for full PDF/DOCX/PPTX coverage instead).")
        corpus = build_lightweight_corpus(args.docs_dir)
        print(f"Built corpus: {len(corpus)} markdown files")

    with open(args.draft, encoding="utf-8", errors="ignore") as f:
        draft_text = f.read()

    draft_path = os.path.abspath(args.draft)
    paths, texts = [], []
    for p, t in corpus.items():
        if os.path.abspath(p) == draft_path:
            continue  # don't compare the draft against itself if it's already saved in docs/
        if not t or t.startswith("[ERROR"):
            continue
        c = clean(t)
        if len(c) > 200:
            paths.append(p)
            texts.append(c)

    if not paths:
        print("Corpus is empty — nothing to compare against.")
        return 0

    draft_clean = clean(draft_text)
    all_texts = texts + [draft_clean]

    vec = TfidfVectorizer(max_features=30000, stop_words="english",
                           ngram_range=(1, 2), min_df=1)
    X = vec.fit_transform(all_texts)
    sims = cosine_similarity(X[-1], X[:-1])[0]

    ranked = sorted(zip(sims, paths), reverse=True)[: args.top]
    flagged = [(s, p) for s, p in ranked if s >= args.threshold]

    if not flagged:
        print(f"No matches above {args.threshold:.0%} similarity. Looks distinct.")
        return 0

    print(f"\n{len(flagged)} existing file(s) above {args.threshold:.0%} similarity:\n")
    for s, p in flagged:
        if s >= 0.85:
            tier = "NEAR-DUPLICATE — very likely already covers this, don't publish as a new page"
        elif s >= 0.6:
            tier = "HEAVY OVERLAP — same topic covered twice, consider merging instead"
        else:
            tier = "MODERATE OVERLAP — review, may be legitimately distinct"
        print(f"  {s:.0%}  {p}")
        print(f"        {tier}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
