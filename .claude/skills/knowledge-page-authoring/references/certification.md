# Certification / Exam Prep

**Example to match:** `coding-tools/claude/ccaf-exam-prep-complete.md`

## When to use
Content preparing a reader for a specific, named certification or exam.

## Additional frontmatter
```yaml
exam_code: ""           # e.g. "CCAF"
exam_validity: ""        # e.g. "2 years" — so staleness is checkable
last_verified_against_vendor: YYYY-MM-DD  # separate from last_reviewed — exam facts (cost, passing score, domain weights) change independently of content
```

## Required section skeleton
1. H1 title.
2. "Exam Facts" table — questions, duration, passing score, cost, format,
   validity, prerequisite. Match the table shape in ccaf-exam-prep-complete.md
   exactly; this is the first thing a reader checks and it must be scannable.
3. "Domain Weightings" table — domain name, weight %, approximate question
   count. Weights must sum to 100%.
4. One H2 per domain, in the same order as the weightings table.
5. Practice questions embedded within each domain's section (not a separate
   dumped question bank at the end) — scenario-based, with full answer
   rationale, matching the "75+ original scenario-based practice questions
   with full answer rationale" standard already set.

## Depth-of-research rubric
- Exam Facts and Domain Weightings must be verified against the vendor's
  current published exam guide, not carried over from a previous version —
  set `last_verified_against_vendor` when you do this and treat it as stale
  after ~90 days regardless of `last_reviewed`.
- Practice questions must be original (scenario-based, testing judgment) not
  copied/paraphrased from the vendor's own sample questions — that's a
  copyright and accuracy risk, and it's also just less useful for exam prep.
- Every practice question needs a full rationale, not just the correct
  answer — the rationale is what makes it study material rather than a quiz.

## Formatting notes
- Domain sections should be independently readable — a candidate studying
  one weak domain shouldn't need to read the others first.
