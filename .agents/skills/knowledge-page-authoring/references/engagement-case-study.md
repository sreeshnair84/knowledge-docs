# Engagement Case Study (Industry-Vertical Deep Dive)

**Example to match:** `ai-usecases/01_aviation.pdf` (and siblings `02_banking`
through `10_media`) — this is the strongest, most consistent template
already in the repo. Match it exactly for new industry verticals rather than
inventing a new shape.

## When to use
A comprehensive, documentary-style account of a full AI/agentic engagement
for one industry vertical, covering the whole lifecycle from discovery to
production. This is NOT the same as a narrative case study (see
references/narrative-case-study.md) — this type is clinical/structural, not
told through one character's voice.

## Additional frontmatter
```yaml
industry: ""             # e.g. "Aviation"
client_type: "fictional"  # always fictional — see rubric below
engagement_period: ""     # e.g. "March 2025 – February 2026"
```

## Required section skeleton (match this order exactly)
1. Executive Summary
2. Client Background
3. Business Problem
4. Constraints
5. Discovery Transcript (with dated workshop sub-sections, e.g. "5.1 Kickoff
   Workshop — Week 1")
6. Architecture Workshops (Business & Information / Data / AI-Platform /
   Security & Identity / Integration & API — as sub-sections)
7. Technical Debates (the genuine, unresolved tensions — build vs. buy,
   vendor selection, autonomy level, evaluation strategy)
8. Executive Reviews (ARB, budget review, sign-off — dated)
9. Final Architecture
10. Delivery Roadmap
11. Risks
12. Governance Model
13. Production Rollout
14. Production Incident (a real-feeling operational failure and how it was
    handled — this is what separates a credible engagement account from a
    marketing case study, keep it)

## Depth-of-research rubric
- Client is always a fictional company with a fictional name (this repo's
  existing examples use invented names like "Meridian Global Airlines") —
  never attribute this level of operational/financial detail to a real,
  named company.
- Section 7 (Technical Debates) must present a genuine tension with
  reasonable arguments on both sides, not a strawman that the "chosen"
  option obviously wins — this is what makes the document useful as a
  decision-making reference rather than a sales narrative.
- Section 14 (Production Incident) is required, not optional — an
  engagement account with a clean, incident-free rollout reads as
  unrealistic and teaches nothing about operating the system.
- Target 15,000-20,000 characters (roughly matching the existing nine
  verticals) — enough for all 14 sections to have real substance, not a
  paragraph each.

## Formatting notes
- Dated sub-sections within Discovery Transcript and Executive Reviews
  ("Week 1", "Week 22") — this timeline is part of what makes the account
  concrete.
