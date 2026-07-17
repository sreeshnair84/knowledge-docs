# EA Masterclass Audit — Changelog and Maintenance Guide

**Date:** 2026-07-14  
**Scope:** `docs/ea-masterclass/**/*.md`, `sidebars.js`

---

## Changelog

| # | Phase | File | Section / Location | Defect | Fix Applied |
|---|-------|------|--------------------|--------|-------------|
| 1 | Phase 1 | `module-13-case-studies/energy-utilities.md` | NEW FILE | Energy and Utilities predictive maintenance case study referenced in overview text and comparison table but had no corresponding file; unlike the other five case studies, it had no linked page | Created full 12-step case study (Org Background → Key Takeaways) using committed stats: $11M/3yr, 26-month payback, 68% outage reduction, 22% lower maintenance cost |
| 2 | Phase 1 | `module-13-case-studies/index.md` | Case Study Navigation table | Energy Utility row had no link (plain text, unlike the other five linked rows) | Added `[Energy Utility — Predictive Maintenance](energy-utilities.md)` link |
| 3 | Phase 1 | `module-13-case-studies/index.md` | Cross-Module Connections note | Referenced "Module 11's responsible AI governance framework" — Module 11 is Executive Communication; responsible AI governance is Module 10 | Corrected to "Module 10's responsible AI governance framework" and added Energy Utility to the list of cases using explainability controls |
| 4 | Phase 1 | `sidebars.js` | EA Masterclass → Module 13 category | `energy-utilities` missing from sidebar | Added `ea-masterclass/module-13-case-studies/energy-utilities` to Module 13 category items |
| 5 | Phase 2 | `module-02-business-acumen/index.md` | "Next Module" note (final line) | "Module 3 — Enterprise Architecture Frameworks covers TOGAF, Zachman, and SAFe…" — Module 3 is Proposal Lifecycle and Enterprise Procurement | Replaced with accurate description of Module 3's actual content |
| 6 | Phase 2 | `module-03-proposal-lifecycle/index.md` | Final line | "Continues in Module 4 — Architecture Patterns for Modern Enterprise Systems" — Module 4 is Technology Investment Fundamentals | Corrected to "Module 4 — Technology Investment Fundamentals" |
| 7 | Phase 2 | `module-03-proposal-lifecycle/index.md` | "See Module 6" note | "Module 6 — Business Case and Benefits Realisation" — actual title is "Business Case Development" | Corrected title |
| 8 | Phase 2 | `module-03-proposal-lifecycle/index.md` | "See Module 7" note | "Module 7 — Writing Winning Proposals" — actual title is "Proposal Writing for Enterprise AI Programs" | Corrected title |
| 9 | Phase 2 | `module-08-financial-literacy/index.md` | Final line | "Proceed to Module 9 — Risk Management and Architecture Decision Records" — Module 9 is Enterprise AI Architecture | Corrected to "Module 9 — Enterprise AI Architecture" |
| 10 | Phase 2 | `module-09-enterprise-ai-architecture/index.md` | "Next Module" note | "Module 10 covers AI Operating Models and the AI Centre of Excellence" — Module 10 is Enterprise Governance for AI Programs | Corrected with accurate description of Module 10's content |
| 11 | Phase 2 | `module-14-mentoring/index.md` | Reflection Questions — Module 2 heading | "### Module 2 — AI Strategy" — actual title is "Business Acumen for Enterprise Architects" | Corrected heading |
| 12 | Phase 2 | `module-14-mentoring/index.md` | Reflection Questions — Module 5 heading | "### Module 5 — AI Maturity" — actual title is "AI Investment Strategy" | Corrected heading |
| 13 | Phase 2 | `module-14-mentoring/index.md` | Reflection Questions — Module 12 heading | "### Module 12 — AI Use Cases" — actual title is "AI Consulting Engagement Delivery" | Corrected heading |
| 14 | Phase 2 | `module-15-distinguished-architect/index.md` | "Recommended Pre-Reading" | Cited "Module 12: AI Programme Architecture" and "Module 14: Chief Architect Operating Model" — neither matches real titles (Module 12 = AI Consulting Engagement Delivery; Module 14 = Mentoring & Mastery) | Replaced with Modules 10, 11, 12 using correct titles; Module 11 (Executive Communication) is most directly relevant to Module 15's Domain 1 (Executive Presence) |
| 15 | Phase 3 | `index.md` | "The 20 Deliverable Templates" section | Main overview described 6 Business Case, **7 Governance**, **7 Consulting** templates with BC/GV/CT coding and entirely different names from the actual deliverables pages (which have 6/4/10 split, sequential numbering, different names) | Rewrote the section to match the actual deliverables implementation: 6 Business Case (Templates 1–6), 4 Governance (7–10), 10 Consulting (11–20) with real template names and descriptions |
| 16 | Phase 4 | `index.md` | Full Domain Map (ASCII tree) | Module 15 missing entirely; Module 13 case list had incorrect industry descriptions | Added Module 15 as "CAPSTONE EXTENSION"; corrected Module 13 case descriptions; corrected deliverables group count (6/4/10) |
| 17 | Phase 4 | `index.md` | Navigate by Role table | Module 15 not referenced in any role row | Added Module 15 to Chief Architect and CIO Advisor optional depth columns; added new "Distinguished Architect / CTO candidate" role row |
| 18 | Phase 4 | `index.md` | Module Dependency Chain | Module 15 missing from diagram | Added Module 15 as downstream of Module 14 with prerequisite note |
| 19 | Phase 4 | `index.md` | Learning Outcomes by Module | Stopped at Module 14 | Added "Capstone Extension (Module 15)" section with four learning outcomes matching Module 15's four domains |
| 20 | Phase 4 | `index.md` | New section | No explanation of sidebar navigation structure | Added "A Note on Sidebar Navigation" section explaining why Modules 1–12 appear as individual pages and Modules 13–15 appear as expandable sections |
| 21 | Phase 4 | `sidebars.js` | EA Masterclass category items | Module 14 was a flat index doc while Modules 13 and 15 were categories, causing auto-sort to place Module 14 before Module 13; "Deliverables" label (D) sorted before all Module categories (M) | Wrapped Module 14 in a category; renamed "Deliverables" to "Templates & Deliverables" (T sorts after M, before W) so sidebar renders: Modules 1–12 → Module 13 → Module 14 → Module 15 → Templates & Deliverables → Workshop Transcripts |
| 22 | Phase 5 | `module-04-technology-investment/index.md` | GPU/TPU cost reference table | Hard-coded dollar-per-hour figures with no currency caveat | Added "illustrative order-of-magnitude — verify current pricing before use in a business case; GPU/TPU rates change frequently" to the code block header |
| 23 | Phase 5 | `module-04-technology-investment/index.md` | Frontmatter | No `next_review_due` field | Added `next_review_due: 2027-01-14` (6-month cycle for fast-moving AI economics content) |
| 24 | Phase 5 | `module-09-enterprise-ai-architecture/index.md` | Frontmatter | No `next_review_due` field | Added `next_review_due: 2027-01-14` (6-month cycle; MCP, A2A, and OWASP LLM Top 10 references are version-specific) |
| 25 | Phase 5 | `module-15-distinguished-architect/index.md` | Frontmatter | No `next_review_due` field | Added `next_review_due: 2027-01-14` (6-month cycle; AI governance failure patterns and mid-2026 dated sections) |
| 26 | Phase 5 | `module-14-mentoring/index.md` | Acronym glossary header | Said "all 14 modules" after Module 15 addition | Corrected to "all 15 modules" |
| 27 | Phase 5 | `module-14-mentoring/index.md` | Acronym glossary | `LLMOps`, `OWASP`, `SHAP` used across Modules 9, 10, 13 but absent from glossary | Added all three entries in alphabetical position |

---

## Phase Notes

**Phase 1 — Full Inventory and Link Audit**: One missing file confirmed (energy-utilities.md) and created. One additional cross-reference defect found beyond the known suspect: Module 13's "Cross-Module Connections" note cited Module 11 for responsible AI governance (Module 10's domain).

**Phase 2 — Cross-Reference Inconsistencies**: Five known defects fixed. Three additional defects found and fixed: Module 3's internal references to Module 6 and Module 7 used wrong titles; Module 8's forward-pointer named Module 9 as "Risk Management and Architecture Decision Records" (wrong). Total cross-reference fixes: 10.

**Phase 3 — Deliverables Reconciliation**: Main overview's deliverables section completely rewritten to match the actual deliverables implementation (6/4/10 split, sequential numbering, real template names). Module 14 Capstone references verified: "Executive Business Case Template" = Template 4 ✓; "Enterprise Proposal Playbook" = Template 2 ✓.

**Phase 4 — Module 15 Integration**: All five specified sections updated. Sidebar ordering fixed through category restructuring and label rename.

**Phase 5 — Future-Proofing**: Currency caveat added to GPU/TPU cost table. `next_review_due` added to three fast-moving modules (4, 9, 15). Stable-content modules (1, 2, 3, etc.) not given short review cycles. Acronym glossary cross-check surfaced three missing entries (LLMOps, OWASP, SHAP). MCP (Anthropic, 2024) and A2A (Google, 2025) descriptions in Module 9 remain accurate as of July 2026 — no correction needed, but covered by the 6-month review cycle.

---

## How to Keep This Course Consistent

When editing the EA Masterclass, these are the recurring defect patterns to guard against:

### 1. Module title drift in cross-references

Every module has "Next Module" notes, "Continues in" footers, or internal "See Module N" callouts. These were written at a point in time and go stale when modules are renamed or renumbered. **Rule: before merging any change that renames a module or changes its number, run this command and review every match:**

```bash
grep -rn "Module [0-9]" docs/ea-masterclass/
```

Verify that every "Module N — [Title]" pattern matches the module's actual current title. The canonical title list is in the Full Domain Map section of `ea-masterclass/index.md`.

### 2. New modules not propagated to the overview page

Module 15 was added without updating `ea-masterclass/index.md`'s Domain Map, Navigate by Role table, Module Dependency Chain, or Learning Outcomes section. **Rule: when adding any new module, update all five of these sections in `index.md`:**

- Full Domain Map (ASCII tree)
- Navigate by Role table  
- Module Dependency Chain diagram
- Learning Outcomes by Module section
- The 20 Deliverable Templates section (if new templates are added)

### 3. Deliverables section drift

The main overview's "The 20 Deliverable Templates" section and `deliverables/index.md` describe the same set of templates and must stay in sync. Any time a template is added, renamed, or regrouped in the deliverables pages, update the corresponding section in `index.md`. The source of truth is the actual `deliverables/` pages; the overview section is a summary.

### 4. New case studies without sidebar entries

When adding a case study file under `module-13-case-studies/`, it must be added to the sidebar in `sidebars.js` under the "Module 13: Case Studies" category, and linked in the Case Study Navigation table in `module-13-case-studies/index.md`. The comparison table should also be updated with the new case's statistics.

### 5. Acronym glossary freshness

Module 14 contains the definitive acronym glossary for the full course. When a new acronym is introduced in any module, add it to the glossary in alphabetical order. Run this to find acronyms used but not yet defined:

```bash
# Find uppercase abbreviations in course files
grep -oh '\b[A-Z][A-Z0-9]\{2,\}\b' docs/ea-masterclass/**/*.md | sort -u
# Compare against the acronym table in module-14-mentoring/index.md
```

### 6. Review cycle enforcement

Modules with `next_review_due` frontmatter fields (currently Modules 4, 9, 15) contain fast-moving content: GPU/TPU pricing, LLM API rates, MCP/A2A protocol versions, AI governance failure patterns. On the due date, verify:

- Are the specific version numbers (e.g., "MCP (Anthropic, 2024)") still the latest?
- Have OWASP LLM Top 10 or NIST AI RMF been updated?
- Have GPU/TPU cost ranges shifted materially (±50%)?
- Are there new interoperability standards that should be added alongside MCP and A2A?

Modules without `next_review_due` (Modules 1–3, 5–8, 10–14) cover stable frameworks content (TOGAF history, Porter's Five Forces, RACI matrices, etc.) and can be reviewed on an annual cycle.
