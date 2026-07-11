#!/usr/bin/env python3
"""
Flag sentences in a draft that contain a checkable factual claim — numbers,
percentages, dates, version strings, currency figures, or unattributed
superlatives. This is a triage aid, not a fact-checker: it finds what to
verify, it doesn't verify it. See references/grounding-check.md for the
verification method.

Usage:
    python3 extract_claims.py <draft.md>
"""

import re
import sys

PATTERNS = {
    "percentage": re.compile(r"\b\d+(\.\d+)?\s?%"),
    "currency": re.compile(r"[$€£]\s?\d[\d,]*(\.\d+)?\s?([MBK]|million|billion|thousand)?\b"),
    "version": re.compile(r"\bv?\d+\.\d+(\.\d+)?\b"),
    "date": re.compile(
        r"\b(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|"
        r"Aug(ust)?|Sep(t(ember)?)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\s+\d{4}\b"
        r"|\b\d{4}-\d{2}-\d{2}\b"
    ),
    "large_number": re.compile(r"\b\d{1,3}(,\d{3})+\b|\b\d{4,}\b"),
    "superlative": re.compile(
        r"\b(industry[- ]leading|the first (?:company|to)|the only|"
        r"proven to|best[- ]in[- ]class|world[- ]class|cutting[- ]edge|"
        r"unmatched|unprecedented)\b",
        re.IGNORECASE,
    ),
}


def split_sentences(text):
    # good enough for triage purposes — doesn't need to be perfect
    text = re.sub(r"\n{2,}", "\n", text)
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z(])", text)
    return [p.strip() for p in parts if p.strip()]


def main():
    if len(sys.argv) != 2:
        print("Usage: python3 extract_claims.py <draft.md>")
        return 1

    with open(sys.argv[1], encoding="utf-8", errors="ignore") as f:
        text = f.read()

    # skip the frontmatter block and markdown table syntax rows, they're
    # not prose claims to verify sentence-by-sentence
    text = re.sub(r"^---\n.*?\n---\n", "", text, flags=re.DOTALL)

    lines = text.splitlines()
    flagged = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("|"):
            continue  # table rows reviewed separately, not as prose sentences
        if not stripped or stripped.startswith("#"):
            continue
        for sentence in split_sentences(stripped):
            hits = []
            for label, pattern in PATTERNS.items():
                if pattern.search(sentence):
                    hits.append(label)
            if hits:
                flagged.append((sentence, hits))

    if not flagged:
        print(
            "No claim-like patterns found. Note: this only catches "
            "numbers/dates/versions/currency/superlatives — still read "
            "the draft yourself for claims that don't match those patterns."
        )
        return 0

    print(
        f"{len(flagged)} sentence(s) with checkable claims — verify each "
        f"against your source (search results or source document) before "
        f"publishing:\n"
    )
    for i, (sentence, hits) in enumerate(flagged, 1):
        print(f"{i}. [{', '.join(hits)}]")
        print(f"   {sentence}\n")

    return 0


if __name__ == "__main__":
    sys.exit(main())
