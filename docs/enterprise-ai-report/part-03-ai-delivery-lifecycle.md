---
title: "Part 3 — AI Delivery Lifecycle"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
source_file: ""
tags: ["ai-delivery", "aidlc", "lifecycle", "mlops", "delivery-model"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 3 — AI Delivery Lifecycle

> **Report Context:** Part 3 of the [Enterprise AI Research Report](./index). Full lifecycle coverage is in the **AI Development / AIDLC** section — this page orients you and links to the authoritative guides.

---

## Lifecycle at a Glance

```
Strategy
    ↓ Opportunity Identification
    ↓ AI Portfolio Management
    ↓ Business Case
    ↓ Prioritisation
    ↓ Discovery
    ↓ Data Assessment
    ↓ Architecture
    ↓ Responsible AI Review
    ↓ Security Review
    ↓ Model Selection
    ↓ Prompt Design
    ↓ Context Engineering
    ↓ Knowledge Engineering
    ↓ Agent Design
    ↓ Tool Design
    ↓ Memory Design
    ↓ Evaluation
    ↓ Pilot
    ↓ Production
    ↓ Continuous Learning
    ↓ Retirement
```

---

## What Differentiates AI Delivery from Traditional SDLC

| Dimension | Traditional SDLC | AI Delivery Lifecycle |
|-----------|-----------------|----------------------|
| Definition of "done" | All requirements implemented | Evaluation thresholds met |
| Primary quality gate | Unit/integration tests pass | Eval scores meet acceptance criteria |
| Data phase | Data modelling for the system | Data quality, lineage, and bias assessment |
| Change management | Code review + CI/CD | Model version + prompt version + eval regression |
| Risk profile | Defects and vulnerabilities | Hallucination, bias, drift, safety |
| Retirement trigger | End of business need | Model deprecation, performance degradation, regulatory change |

---

## Authoritative Guides

| Guide | Covers | Phase Focus |
|-------|--------|-------------|
| [AIDLC Enterprise Framework 2025](../ai-development/aidlc/AIDLC_Enterprise_Framework_2025) | End-to-end AI delivery lifecycle | All phases |
| [EA AIDLC Deep Research 2026](../ai-development/aidlc/EA_AIDLC_Deep_Research_2026) | Phase-by-phase: objectives, inputs, outputs, artifacts, risks | All phases |
| [AIDLC Agile CI/CD Transformation](../ai-development/aidlc/AIDLC_Agile_CICD_AI_Transformation_2026) | Agile integration, sprint cadence, CI/CD for AI | Build → Deploy phases |
| [Agile in the Age of Agentic AI](../ai-development/aidlc/Agile_in_the_Age_of_Agentic_AI_2026) | How Agile evolves for agent delivery | All phases |
| [AIDLC Artifact Reference Library](../ai-development/aidlc/AIDLC_Artifact_Reference_Library) | Templates, checklists, decision gates per phase | All phases |

---

## Key Decision Gates

Each phase has an exit criteria gate before the next phase begins:

| Gate | What Is Reviewed | Who Approves |
|------|-----------------|-------------|
| Business Case Gate | Feasibility, ROI, priority ranking | Portfolio Board |
| Architecture Gate | Solution design, data assessment, feasibility | Architecture Review Board |
| Responsible AI Gate | Fairness, bias, transparency, safety assessment | RAI Officer |
| Security Gate | Threat model, data protection, access control | CISO / Security Arch |
| Evaluation Gate | Quality scores meet acceptance thresholds | AI Product Manager + QA |
| Production Gate | All gates passed; runbook ready; monitoring live | Delivery Lead |

---

## Related Parts

- [Part 4](./part-04-genai-delivery) — GenAI-specific delivery (how this lifecycle differs for LLMs)
- [Part 5](./part-05-agentic-lifecycle) — Agentic AI delivery (the ADLC extension for agents)
- [Part 9](./part-09-operating-processes) — Operational processes after production deployment
