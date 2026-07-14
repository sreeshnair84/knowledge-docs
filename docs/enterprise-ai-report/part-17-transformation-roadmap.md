---
title: "Part 17 — AI Transformation Roadmap & Maturity Model"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
source_file: ""
tags: ["transformation-roadmap", "maturity-model", "ai-first", "ai-native", "implementation-roadmap", "30-60-90-day"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 17 — AI Transformation Roadmap & Maturity Model

> **Report Context:** Part 17 of the [Enterprise AI Research Report](./index). Authoritative guides are in the **Enterprise Architecture / Transformation** section — this page provides the maturity model summary, roadmap framework, and links to the detailed transformation series.

---

## AI Maturity Model

### Five-Level Model

| Level | Name | Characteristics | % Enterprises (2026) |
|-------|------|-----------------|----------------------|
| **1** | Exploring | Ad-hoc pilots; no enterprise AI strategy; shadow AI rife; no governance | ~15% |
| **2** | Experimenting | Structured pilots; AI CoE forming; governance being defined; ROI uncertain | ~35% |
| **3** | Scaling | Production AI systems; established governance; measurable ROI; AI platform forming | ~30% |
| **4** | Optimising | AI embedded in core processes; feedback loops; agentic AI emerging; AI factory | ~15% |
| **5** | AI-First | AI is the operating fabric; autonomous agents at scale; constitutional governance | ~4% |
| **6** | AI-Native | AI IS the organisation's operating model; sovereign infrastructure; proprietary models | <1% |

*Source: Synthesis of Gartner AI Hype Cycle 2025, McKinsey State of AI 2025, Deloitte AI Readiness 2025*

---

### Maturity Assessment Dimensions

| Dimension | L1 | L2 | L3 | L4 | L5 |
|-----------|----|----|----|----|-----|
| **Strategy** | None | Emerging | Defined | Embedded | Competitive differentiator |
| **Capabilities** | PoCs only | 1–5 in production | 10–50 in production | 50–200 in production | 200+ agents/features |
| **Process** | Ad hoc | AI-specific gates | AIDLC adopted | ADLC + factory | Continuous improvement |
| **Organisation** | No AI roles | AI CoE started | Hub & Spoke | Domain teams + platform | AI-native workforce |
| **Technology** | Direct API access | Managed LLM access | AI platform (L3) | AI platform (L4–5) | Sovereign AI infrastructure |
| **Governance** | None | Policy drafted | Governance active | Automated governance | Constitutional governance |
| **Investment** | <$500K | $500K–$5M | $5M–$50M | $50M–$200M | $200M+ |
| **KPIs** | N/A | Activity KPIs | Output KPIs | Outcome KPIs | Enterprise value KPIs |

---

## Transformation Roadmap

### Phase 0: Foundation (Pre-Transformation, Months 0–3)
**Goal:** Establish the prerequisites for sustainable AI transformation.

| Action | Owner | Output |
|--------|-------|--------|
| Appoint CAIO (or interim AI Lead) | CEO | CAIO in post |
| Conduct AI maturity assessment | CAIO + External Advisor | Current state report |
| Define enterprise AI principles (6–8) | CAIO + Legal + Ethics | AI principles document |
| Identify first 3 high-value AI use cases | CAIO + Business Leaders | Use case shortlist |
| Establish AI governance framework basics | CAIO + CRO + Legal | AI governance charter |
| Set up AI budget (initial allocation) | CFO + CAIO | AI budget approved |

---

### Phase 1: Prove It (Months 1–6, L1 → L2)
**Goal:** Demonstrate AI value with 2–3 production use cases; build credibility.

**Operating Model:** Small centralised AI team (5–10 people) + 1–2 business unit champions.

**Technology:** Direct LLM API access; basic prompt engineering; off-the-shelf RAG.

**Key milestones:**
- 2 GenAI features in production, with measurable business metrics
- AI governance policy published and acknowledged by all AI participants
- AI cost dashboard live (basic visibility)
- First AI all-hands: share learnings, invite contribution

**Investment:** $500K–$2M (talent + API costs + tooling)

**Risk:** Shadow AI adoption outpacing governance. *Mitigation:* Publish acceptable use policy early; provide sanctioned tools.

---

### Phase 2: Scale It (Months 6–18, L2 → L3)
**Goal:** Scale AI delivery beyond the CoE into business units; establish the AI platform.

**Operating Model:** Hub & Spoke — central AI platform team + BU-embedded AI engineers.

**Technology:** Internal AI platform (L3): inference service, embedding service, guardrails, basic RAG.

**Key milestones:**
- AI platform live with 3+ consuming teams
- 10+ AI use cases in production across 3+ business units
- AI delivery lifecycle (AIDLC) adopted
- Prompt governance and model registry operational
- First AI governance board meeting
- AI talent programme: 50+ employees trained in AI fundamentals

**Investment:** $5M–$15M (platform build + talent + expanded API usage)

**Risk:** CoE bottleneck — BUs can't get AI fast enough. *Mitigation:* Accelerate Hub & Spoke; invest in self-service platform.

---

### Phase 3: Embed It (Months 12–24, L3 → L4)
**Goal:** Embed AI into core business processes; launch the Agent Factory.

**Operating Model:** Hub & Spoke + Agent Factory. Business domain teams with genuine AI capability.

**Technology:** AI platform (L4–5): full service catalog, agent runtime, self-service developer portal.

**Key milestones:**
- 50+ AI use cases in production
- First autonomous agents in production (low-to-medium risk class)
- Agent Factory operational with first 5 agents delivered
- AI FinOps operational with chargeback to BUs
- AI observability dashboard live (quality, cost, business metrics)
- External AI audit completed (ISO 42001 or equivalent)

**Investment:** $15M–$50M

**Risk:** Agent incidents damaging trust. *Mitigation:* Rigorous agent governance; conservative HITL initially; gradual autonomy expansion.

---

### Phase 4: Optimise It (Months 24–36, L4 → L5)
**Goal:** AI as a competitive differentiator; digital workforce at scale.

**Operating Model:** Digital Workforce + AI Shared Services. AI is embedded in every function.

**Technology:** Full AI platform; agentic AI at scale; exploring sovereign AI infrastructure.

**Key milestones:**
- 200+ AI use cases and agents in production
- Digital workforce managing >30% of high-volume process tasks
- AI-native product features in core customer products
- AI FinOps saving >20% vs. unconstrained spend through optimisation
- Board-level AI KPI reporting dashboard
- Constitutional AI governance framework implemented for highest-risk AI

**Investment:** $50M–$200M

---

### Horizon 3: AI-Native (Year 3+, L5 → L6)
**Goal:** AI IS the operating model. Proprietary AI capability as competitive moat.

**Technology:** Sovereign AI infrastructure; proprietary fine-tuned models; constitutional AI.

**Investment:** $200M+

---

## 30 / 60 / 90 Day Playbook (For New CAIO)

### First 30 Days: Listen, Assess, and Win Quick
- **Week 1–2:** Stakeholder listening tour — CIO, CTO, CDO, CFO, business unit heads, CISO
- **Week 2–3:** AI inventory — what AI is already running? (sanctioned and shadow)
- **Week 3–4:** Quick win identification — one AI feature that can go live in 60 days
- **Deliverable:** 30-day report: current state, quick win, initial risk assessment

### Days 31–60: Build the Foundation
- Appoint the AI governance structure (even if lightweight at first)
- Publish AI acceptable use policy
- Stand up the AI team (CoE nucleus)
- Start the quick win delivery
- Select the first AI platform components (start with managed inference)
- **Deliverable:** AI governance charter; AI team in place; quick win in progress

### Days 61–90: Deliver and Communicate
- Launch the quick win (real production, real users, real metrics)
- Present AI strategy to leadership team for endorsement
- Begin business case for Year 1 AI investment
- Launch AI literacy programme for leadership team
- **Deliverable:** First AI in production; AI strategy deck; Year 1 business case draft

---

## KPI Framework by Maturity Level

| KPI Category | L1–L2 | L3 | L4 | L5 |
|-------------|-------|----|----|----|
| **Delivery** | PoCs completed | Use cases in production | Time-to-production, factory throughput | Agent fleet size, agent task volume |
| **Quality** | User satisfaction | Eval score | Hallucination rate | Quality SLA adherence |
| **Cost** | API spend tracked | Cost per use case | Cost per outcome | AI ROI enterprise-wide |
| **Adoption** | Team count using AI | % employees with AI tool access | AI-assisted process coverage | % processes AI-native |
| **Governance** | Policy published | Governance incident rate | Compliance rate | Constitutional policy coverage |
| **Value** | Qualitative benefits | £ productivity gain | £ cost avoided | £ enterprise AI value |

---

## Authoritative Guides

| Guide | What It Covers |
|-------|---------------|
| [AI-First to AI-Native Journey](../enterprise-architecture/transformation/ai-first-to-ai-native) | Maturity model, assessment instrument |
| [Current State Assessment & AI Maturity](../enterprise-architecture/transformation/Current_State_Assessment_and_AI_Maturity) | Maturity scoring methodology |
| [Roadmap, Financials, KPIs & Risk](../enterprise-architecture/transformation/Roadmap_Financials_KPIs_and_Risk) | 3-year roadmap, financials, KPIs, risk register |
| [Enterprise AI Transformation Blueprint CTO Guide](../enterprise-architecture/strategy/Enterprise_AI_Transformation_Blueprint_CTO_Guide_2026) | CTO-level transformation guide |
| [AI Transformation Consultant Toolkit](../enterprise-architecture/specialization/AI_Transformation_Consultant_Toolkit_2026) | Consulting delivery toolkit |
| [EA AI-First Transformation Transcript](../enterprise-architecture/strategy/EA_AI_First_Transformation_Transcript) | Real-world transformation case narrative |

---

## Related Parts

- [Part 2](./part-02-operating-models) — Operating models at each maturity level
- [Part 8](./part-08-organizational-roles) — Roles to build as maturity increases
- [Part 16](./part-16-financial-model) — Investment and ROI at each level
- [Part 18](./part-18-case-studies) — Real-world examples at different maturity levels
