# Grounding Check

The `extract_claims.py` script is a triage aid, not a fact-checker — it
finds sentences *likely* to contain a checkable claim; it can't verify
truth itself. The verification is a manual/model read against whatever the
source of truth is for this draft (search results for the research path,
source document text for the document path).

## Running it

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/extract_claims.py <draft.md>
```

Output is a numbered list of flagged sentences with the specific
claim-like fragment highlighted (a percentage, date, version string,
dollar figure, or unattributed superlative).

## For each flagged claim

1. **Find its source.** For the research path, which search result actually
   said this? For the document path, does the source document actually say
   this, or close to it?
2. **If supported**: leave it, and consider whether it needs an inline
   citation/link per the research-path copyright rules.
3. **If not supported but plausible**: soften it — remove the specific
   figure, use qualified language ("reportedly," "according to X"), or cut
   the sentence. Don't leave a specific-sounding number in place just
   because it reads well.
4. **If contradicted by what you actually found**: fix it, don't just
   remove it — a wrong number left un-corrected because the flag only
   catches presence, not accuracy, defeats the purpose of this step.

## Claims the script won't catch

The regex patterns catch numbers, dates, versions, currency, and a short
list of superlative phrases — it will not catch:
- Claims of causation or attribution to a specific named person/org that
  don't include a number ("the CTO decided..." in a narrative case study is
  fine, it's fictional by design — but a claim like "Company X was the
  first to deploy this" in a research report is a claim worth checking even
  without a number in it).
- Technical claims about how something works that are wrong but don't
  contain a flagged pattern (e.g. a mischaracterized architecture).

Read the draft yourself with the same scrutiny after running the script —
it narrows what to check, it doesn't replace reading the page.

## Case studies, narrative case studies, and workshop transcripts are exempt
## from source-attribution, NOT from internal consistency

Per the `knowledge-page-authoring` templates, these types use fictional
companies/people on purpose — that's fine, don't flag "Meridian Global
Airlines" as an unsupported claim. What still needs checking in these
types: technical claims (architecture details, tool capabilities, real
product names/versions referenced) should be accurate even inside a
fictional scenario — the fiction is the company and characters, not the
technology.
