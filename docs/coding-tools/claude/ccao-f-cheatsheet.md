---
title: "CCAO-F Cheatsheet — Quick Reference"
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: native-md
source_file: ""
tags: ["coding-tools", "claude", "certification"]
doc_type: certification
exam_code: "CCAO-F"
exam_validity: "2 years"
last_verified_against_vendor: 2026-07-17
---

# CCAO-F Cheatsheet — Quick Reference

Condensed companion to `ccao-f-exam-prep-complete.md` — high-value recall material only. For scenario practice and full rationale, use the complete guide.

*Domain weightings and exam facts are compiled from Pearson VUE's Anthropic certification listing and multiple independent community sources; Anthropic's official candidate handbook (gated behind Partner Academy login) is the authoritative source — verify against it before your exam date. Community sources report exam validity as 12 months rather than the 2 years used here — unconfirmed, check the handbook.*

---

## Exam Facts

| Item | Detail |
| ------ | -------- |
| Questions | 60 (multiple-choice and multiple-response) |
| Duration | 120 minutes |
| Passing score | 720 / 1000 (scaled) |
| Cost | $99 (free for first 5,000 Partner Network employees) |
| Format | Online proctored or Pearson VUE test center |
| Validity | 2 years |
| Prerequisite | None |
| Audience | Non-developer business users — NOT the Developer or Architect tracks; no coding/API tested |

---

## Domain Weightings

| Domain | Weight | ~Questions |
| -------- | -------- | ----------- |
| 1 — Prompting and Task Execution | 14% | 8 |
| 2 — Output Evaluation and Validation | 21% | 13 |
| 3 — Product and Model Selection | 12% | 7 |
| 4 — Workflow Integration and Solution Design | 16% | 10 |
| 5 — Configuration and Knowledge Management | 12% | 7 |
| 6 — Governance, Risk, and Responsible Use | 15% | 9 |
| 7 — Troubleshooting and Optimization | 10% | 6 |

**Memorize the order:** Output Evaluation (21%) > Workflow Integration (16%) > Governance (15%) > Prompting (14%) > Product Selection = Configuration (12% each) > Troubleshooting (10%). Judgment/evaluation domains (2+4+6) = 52% of the exam — more than half.

---

## Domain 1 — Prompting and Task Execution (14%)

**Key terms**

- **Task / Context / Format / Audience** — the four things every good prompt supplies
- **Task-type framing** — analysis, research, drafting, brainstorming each need a different prompting approach
- **Iteration over restart** — refine in the same conversation; don't re-explain everything in a new chat
- **Success criteria** — state what "done" looks like up front
- **Sequencing** — break dependent multi-step requests into turns, not one giant prompt

**Decision table**

| Task type | Must include | Trap |
| ----------- | -------------- | ------ |
| Analysis | The actual source data | Asking Claude to analyze data it wasn't given |
| Research | Scope + request for current/multi-source lookup | Accepting an unsourced answer as verified |
| Drafting | Audience, tone, length, style example | Vague "write something good" |
| Brainstorming | Quantity target, freedom to diverge | Over-constraining too early |

**Gotchas:** a "smarter model" doesn't fix a vague prompt. A long compound prompt commonly drops one of its sub-asks — sequence instead.

---

## Domain 2 — Output Evaluation and Validation (21% — largest domain)

**Key terms**

- **Hallucination** — confident, fluent, but fabricated (fake citations, invented stats, wrong-but-plausible specifics)
- **Discernment** (AI Fluency 4D framework) — critical thinking can't be outsourced to the model
- **Self-evaluation limit** — Claude can reliably check its own *format/completeness*, not *factual accuracy about the world*
- **Fluency ≠ accuracy** — the central trap of this domain; confident tone is not a correctness signal

**Validation technique → what it catches**

| Technique | Catches |
| ----------- | --------- |
| Cross-check against the actual source doc | Facts not present in the source |
| Ask Claude to quote the source directly | Fabricated external citations |
| Independent spot-check of dates/names/numbers | Plausible-but-wrong details |
| Deliberately read for missing viewpoints | One-sided/biased framing |
| Check every sub-part of the original ask | Silently dropped sub-questions |

**Mandatory human review:** legal/regulatory, financial figures used externally, HR/employment, medical/safety-adjacent, anything external-facing and irreversible.

**Gotcha:** asking Claude "are you sure?" about its own fact is not verification — it can restate a wrong answer just as confidently as a right one.

---

## Domain 3 — Product and Model Selection (12%)

**Surface decision table**

| Surface | Use for |
| --------- | --------- |
| Chat | One-off questions |
| Projects | Recurring work, saved instructions + reference files |
| Artifacts | A shareable/iterable deliverable (doc, chart, mini-app) |
| Research mode | Multi-source investigation needing current info |
| Claude in Chrome | Work embedded in a specific web app/CRM |
| Claude in Slack | Quick help without leaving team chat |

**Model tier logic (concept, not version numbers):** fast/economical tier → high-volume, well-defined tasks (classification, extraction). Balanced tier → everyday business writing/analysis. Top-capability tier → nuanced, multi-factor reasoning. **Exam tests the tradeoff logic, not specific model names/prices — those change too often to be reliably tested.**

**Gotchas:** don't default to the priciest tier for simple work. Long, cluttered, weeks-old conversations degrade — start fresh with a condensed summary rather than piling on. Admin controls / audit logs / SSO require **Enterprise**, not just a bigger individual plan.

---

## Domain 4 — Workflow Integration and Solution Design (16%)

**Key terms**

- **AI-suited task** = repeatable + judgment-based + well-defined "good output" — not purely mechanical data transfer
- **Redesign, don't bolt on** — fix the actual bottleneck (handoffs, ownership), not just speed up one step of a broken process
- **Pilot before scale** — small group first, gather feedback, then expand
- **Escalation boundary** — Associate builds with platform features (Projects, connectors, Custom Styles); anything needing custom code, API automation, or external-system triggers goes to Developer/Architect

**Signal → response**

| Signal | Response |
| --------- | ---------- |
| Repeats weekly with same shape | Build a Project |
| Must auto-trigger from another system | Escalate to Developer (API/automation) |
| Stakeholders unsure of capabilities | State capabilities, limitations, and review points explicitly |
| Untested at scale | Pilot first |

**Gotcha:** "we used AI" is not a success metric — measure time saved, error rate, or adoption against the original problem.

---

## Domain 5 — Configuration and Knowledge Management (12%)

**Precedence order:** Profile preferences (baseline, everywhere) → Project custom instructions (that Project only) → in-conversation instruction (that single turn only, doesn't change the Project's saved default).

**Key terms**

- **Project knowledge base** — files scoped to one Project; name descriptively, refresh regularly (stale files silently produce wrong answers)
- **RAG auto-scaling** — paid-plan Projects expand capacity automatically as knowledge grows, but this does not remove the need to curate — irrelevant/outdated files still dilute quality
- **Connectors** (Google Drive, Gmail, Calendar) — grant least-privilege access, only what the workflow actually needs
- **Custom/Output Styles** — set a tone/format default instead of retyping it every conversation

**Gotcha:** duplicate, drifting Projects built independently by different people for "the same" workflow produce inconsistent output — consolidate to one owned source-of-truth Project.

---

## Domain 6 — Governance, Risk, and Responsible Use (15%)

**Data handling table**

| Data class | Where it's safe |
| ------------ | ------------------ |
| Public | Any Claude surface |
| Internal/confidential company data | Org-approved environment only (Team/Enterprise), per policy |
| Regulated/PII (health, financial, legal) | Strict org policy; may need special config or be prohibited |
| Third-party confidential (NDA) | Verify contractual permission first |

**Consumer vs. business data use — heavily tested distinction:**

- **Consumer (Free/Pro/Max, personal account):** training is **opt-out**, not opt-in, by default. Safety-flagged conversations can still be used for training **regardless** of the opt-out setting.
- **Business (Team/Enterprise):** customer content is **not** used for training — a contractual commercial-terms protection, not a per-user toggle.
- Pasting confidential data into a **personal free-tier account** is a governance failure even if the content itself is harmless — wrong account type, not just wrong content.

**Key terms**

- **Escalate when unsure** — a new/sensitive/high-impact use case goes to the org's AI governance contact, not personal judgment
- **Accountability** — a human stays accountable for AI-assisted work product; "the AI wrote it" is not a defense
- **Prohibited categories (business-relevant)** — deceptive manipulation, undermining democratic processes, unauthorized biometric/surveillance profiling for protected characteristics, bypassing safety measures
- **Internal policy can be stricter than the platform** — and it still governs employee behavior

**Gotcha:** internal-only distribution doesn't lower the review bar for high-stakes content (e.g., layoff communications) — accuracy, tone, and legal/HR review still apply; the decision itself stays human.

---

## Domain 7 — Troubleshooting and Optimization (10%)

**Symptom → cause → fix**

| Symptom | Likely cause | Fix |
| --------- | -------------- | ----- |
| Generic/unusable output | Missing context/audience/format | Add the missing specifics |
| Output ignores part of the ask | Too many asks bundled together | Split into sequential turns |
| Was right before, wrong now | Stale Project knowledge | Refresh the source file |
| Inconsistent format across team | No shared template/style | Standardize via Project instructions or Custom Style |
| Same correction needed every time | Feedback never saved anywhere reusable | Bake it into standing Project instructions |
| Confidently outdated answer | Question needed live/current data | Use Research mode or a web-enabled surface |

**Gotcha:** diagnose the prompt before switching to a pricier model tier — most "the output is wrong" problems are clarity/context problems, not capability problems.

---

## Exam Day Quick Checklist

- Fluency is never proof of accuracy — treat every confident answer as unverified until checked.
- When unsure whether something needs escalation (technical or governance), the exam rewards escalating, not deciding unilaterally.
- Think in tradeoffs (speed/cost/depth; individual vs. org-wide governance), not memorized model version numbers.
- ~2 minutes per question (120 min / 60 Q). Flag and move on.
- Spend proportionally more review time on Output Evaluation (21%), Workflow Integration (16%), and Governance (15%) — together over half the exam.
