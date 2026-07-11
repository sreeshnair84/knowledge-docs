# Workshop / Advisory Transcript

**Example to match:** `ea-masterclass/transcripts/bank-discovery-workshop.md`
and `cybersec-architect/usecase-transcript.md`

## When to use
A simulated realistic conversation (workshop, advisory session, negotiation,
executive presentation) demonstrating how concepts from a guide or framework
page apply in a live setting. Shorter and more focused than a narrative case
study — one session, not a multi-month build.

## Additional frontmatter
```yaml
session_type: ""          # e.g. "Discovery Workshop", "Executive Advisory", "Negotiation"
related_pages: []          # explicit list of the guide/framework pages this transcript demonstrates — required, this format only works as a companion to other content
```

## Required section skeleton
1. H1 title naming the session and its purpose.
2. "Audience" line — who should read this and why (match
   usecase-transcript.md's pattern: state who benefits from reading it).
3. "Related" line — links to the pages this transcript demonstrates, using
   real markdown links, placed near the top.
4. "Scenario" blockquote — company (fictional), size, context, and exactly
   why this session is happening, in one paragraph.
5. "Participants" table — Name, Role, Background columns.
6. The dialogue itself, with speaker names bolded, following the scenario
   through to a real resolution or explicit next step — not trailing off.

## Depth-of-research rubric
- Company and participants are fictional — same rule as the case study
  types.
- The dialogue must include at least one genuine pushback or objection from
  a non-protagonist participant that gets substantively addressed, not just
  agreement — a transcript where everyone nods along teaches nothing about
  handling real advisory dynamics.
- `related_pages` must actually exist and actually be relevant — this type
  exists specifically to demonstrate other content, an orphaned transcript
  with no related pages should probably be a narrative case study instead.
- Target 1,500-3,000 words — long enough for a real exchange, short enough
  to stay focused on one session.

## Formatting notes
- Bold speaker names at the start of each line/paragraph of dialogue for
  scannability.
