---
title: "Architect Expectations in an FDE Context"
date_created: 2026-07-13
last_reviewed: 2026-07-13
status: current
source_type: native-md
tags: ["interview-prep", "fde", "enterprise-architect", "solution-architect", "transformation"]
doc_type: study-guide
target_role: "Enterprise Architect / Solution Architect (FDE-deployed)"
---

# Architect Expectations When Deployed in an FDE Context

An Enterprise Architect or Solution Architect who is **forward-deployed** to a client engagement operates under a different set of constraints and success metrics than a traditional EA role. The title may be the same; the accountability is different.

This guide covers:
1. What changes when an EA is embedded (vs. advisory)
2. The specific skill expectations by deployment phase
3. Where EA strengths translate directly — and where gaps appear
4. Study guide map for each expectation

---

## The Fundamental Shift: Advisory → Accountable Delivery

In a traditional EA engagement, you own the blueprint and hand it to delivery teams. In a forward-deployed architect context you own the blueprint **and** the outcome — including whether the thing ships, whether it performs, and whether the client's team can sustain it.

```
Traditional EA                     Forward-Deployed Architect
──────────────────────────────────  ──────────────────────────────────────
Deliverable: Architecture document  Deliverable: Running production system
Success: Document accepted          Success: Client KPI improved
Engagement: Months of advisory      Engagement: 8–14 weeks embedded
Code ownership: None                Code ownership: Shared or full
Client interaction: Weekly review   Client interaction: Daily co-location
Governance: Your RACI               Governance: Client RACI (you enable it)
Exit: Recommendations handed over   Exit: Working system + runbook left behind
```

---

## Phase-by-Phase Expectations for the Deployed Architect

### Phase 1 — Discovery (Weeks 1–2)

**What changes vs. standard EA discovery:**
Standard EA discovery produces a current-state architecture diagram. FDE-context discovery must produce a **deployable use case brief** — a document specific enough that someone could start building from it the next day.

**Architect expectations:**

| Expectation | What "good" looks like | Study Guide |
|------------|------------------------|-------------|
| AI maturity assessment in < 5 business days | Scored assessment across data, governance, culture, tech; presented to sponsor with a readout by end of Week 1 | [AI Maturity Assessment](../../enterprise-architecture/transformation/01_Current_State_Assessment_and_AI_Maturity) |
| Use case prioritisation across stated + unstated needs | Map of all stated use cases against impact / feasibility / risk; one recommended start with explicit reasoning | [Enterprise AI Opportunity Portfolio](../../enterprise-architecture/transformation/02_AI_Opportunity_Portfolio) |
| Stakeholder risk map | Identify champion, skeptic, regulator, budget authority within first 3 days; know their primary concern | [EA Soft Skills Interview Master Guide](../../enterprise-architecture/framework/EA_Soft_Skills_Interview_Master_Guide) |
| Data landscape audit | Inventory of every system that the target use case touches; ownership, API availability, freshness cadence | [Enterprise Data Systems & AI Governance](../../knowledge-engineering/data/Enterprise_Data_Systems_AI_Governance_Report) |
| Security posture read | Initial CISO/security conversation within first week; understand what needs sign-off | [Agentic AI Security & Identity](../../enterprise-architecture/ai-architecture/agentic-ai-security-identity) |

**The critical difference from standard EA:**
An EA doing a 6-month current-state assessment is doing the right thing for long programmes. A forward-deployed architect doing the same 6-month assessment is failing the client. Time-box discovery hard. Two weeks maximum for a single use case.

---

### Phase 2 — Architecture Design (Weeks 2–3)

In a standard EA role, architecture design produces TOGAF-aligned artefacts reviewed over weeks. In FDE context, you design *and build* concurrently, and the architecture is validated by running code, not by ARB sign-off.

**Architect expectations:**

| Expectation | What "good" looks like | Study Guide |
|------------|------------------------|-------------|
| Reference architecture selection | Choose from established agentic patterns (RAG, MCP + agent, multi-agent orchestration) with written rationale — not invented from scratch | [Enterprise AI Architecture Patterns](../../enterprise-architecture/ai-architecture/enterprise-ai-architecture-patterns) |
| MCP server design | Specify which data sources need MCP servers, what tools each exposes, auth model, PII handling | [MCP Deep Research 2026](../../ai-protocols/mcp/MCP_Deep_Research_2026) |
| HITL boundary definition | Write down exactly which decisions the model makes and which require human review — documented, not assumed | [Human-in-the-Loop Architectures](../../workflow-orchestration/12-human-in-the-loop-architectures) |
| Integration architecture | Document every API call: system, endpoint, credentials source, error handling | [Agent Communication & Identity Gateway](../../enterprise-architecture/ai-architecture/agent-communication-identity-gateway) |
| Security architecture | Prompt injection mitigation, credential storage, audit trail, data residency controls | [Agentic AI Security Guardrails](../../enterprise-architecture/ai-architecture/agentic-ai-security-guardrails) |
| One-page architecture for non-technical stakeholders | The Priya Sharma version — no acronyms, outcomes not components | [Executive Communication Framework](../../enterprise-architecture/framework/Executive_Communication_Framework_Guide) |

**Key pattern: Start simple, document why**
Enterprise architects sometimes over-architect in the first pass. In FDE context, start with the minimum viable architecture that could work, document explicitly why you made each simplification, and note what you would add for scale. The client team inherits this — they need to understand the reasoning, not just the diagram.

---

### Phase 3 — Prototype & Build Oversight (Weeks 3–6)

The forward-deployed architect in a non-coding role (Principal Architect, Solutions Architect) shifts from writing code to:
- Ensuring the build matches the architecture
- Unblocking the FDE/engineering team on design decisions
- Running daily architecture reviews (15 minutes, standing)
- Translating stakeholder feedback into architectural decisions

**Architect expectations:**

| Expectation | What "good" looks like | Study Guide |
|------------|------------------------|-------------|
| Rapid design decision log | Every material design change captured with context and rationale — this becomes handoff documentation | [EA Lifecycle Artefact Templates](../../enterprise-architecture/process/EA_Lifecycle_Artifact_Templates_2026) |
| Evaluation framework design | Define metrics, test set, passing thresholds before the prototype is demo-ready — not after | [AI Agent Evaluation Framework](../../ai-development/testing/AI_Agent_Evaluation_Framework_Guide) |
| Security review facilitation | Own the relationship with CISO; translate security findings into engineering backlog items | [Enterprise AI Governance & Compliance](../../enterprise-architecture/ai-architecture/enterprise-ai-governance-compliance) |
| Stakeholder demos | Present prototype outcomes in business language; translate technical limitations into business risk statements | [Enterprise AI Architect Communication Guide](../../enterprise-architecture/framework/Enterprise_AI_Architect_Communication_Guide) |
| Failure mode documentation | Maintain a live "known failure modes" log — used for evaluation and for handoff | [Architecture Patterns & Anti-Patterns](../../agentic-systems/skill/enterprise/architecture-patterns-antipatterns-and-case-studies) |

---

### Phase 4 — Evaluation & Production Gate (Weeks 6–8)

This is where an EA's governance instincts become most valuable — and where the absence of evaluation discipline is most visible. An architect in FDE context owns the go/no-go decision.

**Architect expectations:**

| Expectation | What "good" looks like | Study Guide |
|------------|------------------------|-------------|
| Production readiness checklist | Written go/no-go criteria agreed with client before evaluation starts — not improvised at demo time | [AI Solution Lifecycle Deliverables](../../enterprise-architecture/process/ai-solution-lifecycle-deliverables) |
| Evaluation results presentation | Numbers-first presentation: metrics, ground truth methodology, failure analysis — before you show a demo | [AI Agent Evaluation Framework — Complete](../../ai-development/testing/AI_Agent_Evaluation_Framework_Complete) |
| Compliance sign-off facilitation | Compliance team reviews evaluation results and HITL architecture; written approval on record | [EA Governance & Responsible AI](../../enterprise-architecture/ai-architecture/enterprise-ai-governance-compliance) |
| Rollback design | Documented procedure to revert to the pre-AI process if production fails | [Agent Reliability Engineering](../../enterprise-architecture/ai-architecture/agent-reliability-engineering) |
| Risk register update | Formal risk register entry for AI system in production, with mitigations and owners | [Governance, Risk & Lifecycle](../../agentic-systems/skill/enterprise/governance-and-lifecycle) |

**The question every compliance and security stakeholder will ask:**
*"What happens when it gets something wrong?"*

A good EA answer names: the specific failure mode, the detection mechanism, the human action triggered, and the blast radius. If you cannot answer this in 60 seconds for the primary failure case, you are not ready for production sign-off.

---

### Phase 5 — Production & Observability (Weeks 8–10)

**Architect expectations:**

| Expectation | What "good" looks like | Study Guide |
|------------|------------------------|-------------|
| Observability architecture | Tracing, prompt logging, cost tracking, latency monitoring — all live before go-live | [Observability & Evaluation](../../agentic-systems/skill/enterprise/observability-and-evaluation) |
| Incident response playbook | Written escalation matrix; what triggers a rollback; who calls whom | [Agentic AI Reliability, Observability & Governance](../../enterprise-architecture/ai-architecture/agentic-ai-reliability-observability-governance) |
| SLA definition | Explicit latency, availability, and accuracy SLAs agreed with client | [Agentic UI Reliability Engineering](../../agentic-ui/reliability-engineering) |
| Cost governance | Daily/weekly cost dashboard; alert thresholds; budget cap | [AI Cost & Implementation Guide 2026](../../ai-economics/AI_Cost_Implementation_Guide_2026) |

---

### Phase 6 — Scale, Knowledge Transfer & Handoff (Weeks 11–14)

This is the exit ramp the architect owns entirely. A good FDE-context architect makes themselves unnecessary.

**Architect expectations:**

| Expectation | What "good" looks like | Study Guide |
|------------|------------------------|-------------|
| Architecture decision record (ADR) | Every non-obvious decision documented with context, alternatives considered, rationale | [EA Lifecycle Artefact Templates](../../enterprise-architecture/process/EA_Lifecycle_Artifact_Templates_2026) |
| Expansion roadmap | Prioritised list of the next 3 use cases with effort estimates, sequenced against the existing infrastructure | [Enterprise AI Opportunity Portfolio](../../enterprise-architecture/transformation/02_AI_Opportunity_Portfolio) |
| Operating model design | Who owns AI in the client org after the FDE leaves; how is the system governed; what skills does the client team need | [Target Operating Model & Change](../../enterprise-architecture/transformation/05_Target_Operating_Model_and_Change) |
| Executive summary for leadership | One-page ROI summary: what was built, what it cost, what it saved, what's next | [Executive Communication Framework](../../enterprise-architecture/framework/Executive_Communication_Framework_Guide) |
| Technical handoff package | Architecture docs, runbooks, evaluation harness, prompt tuning playbook, escalation matrix | [EA Lifecycle Checklist](../../enterprise-architecture/process/EA_Lifecycle_Checklist) |

---

## Where EA Strengths Translate Directly

| EA Strength | How It Maps in FDE Context |
|-------------|---------------------------|
| Stakeholder management | Identifying and managing the champion, skeptic, regulator, and budget authority is identical — just compressed |
| Governance instinct | Compliance, security, and risk conversations benefit from an EA who knows how to structure them |
| Architecture patterns | Enterprise integration, security, and data patterns translate directly — you choose faster because you've seen the options |
| Executive communication | The CFO/CDO conversation is the same; ROI framing and executive summary are core EA skills |
| Risk management | Failure mode thinking, rollback design, risk registers are native to EA |

---

## Where EA Gaps Appear Most Often

| Gap | Why It Matters in FDE Context | How to Close It |
|-----|------------------------------|-----------------|
| No LLM production experience | You can design the architecture but can't validate it | Build: ship a toy agent to production, debug a real prompt failure |
| MCP server is unfamiliar | You'll design it but can't review the implementation or unblock engineering | Study: [MCP Deep Research 2026](../../ai-protocols/mcp/MCP_Deep_Research_2026) + write one small MCP server |
| Evaluation is conceptual | "Test the AI" is insufficient — clients need numeric evidence | Study: [AI Agent Evaluation Framework](../../ai-development/testing/AI_Agent_Evaluation_Framework_Guide) + run an eval harness on any LLM task |
| Discovery is too slow | EA discovery practices are designed for 6-month programmes | Practice: time-boxed discovery exercises; use the [EA Deep Dive Guide](../../enterprise-architecture/process/Enterprise_AI_Architect_Deep_Dive_Guide) as a sprint checklist |
| Cost/token economics unfamiliar | Architects often don't manage API cost | Learn: model tiers, token pricing, batching strategies — [Claude API Mastery](../../coding-tools/claude/claude-api-mastery) |

---

## The Architect's FDE Mindset Shift — In One Sentence

> An EA who is forward-deployed does not hand their output to a delivery team. They are the delivery team, and the handoff is to the client.

---

## Recommended Reading for Architect Moving into FDE Context

| Priority | Guide | Why |
|----------|-------|-----|
| 1 | [FDE Role Skills & Study Map](./fde-role-skills-map) | Understand the full FDE skill set first |
| 2 | [FDE Life Transcript](./fde-life-transcript) | See the engagement lifecycle in detail |
| 3 | [Claude Agent SDK — Production](../../coding-tools/claude/claude-agent-sdk-production) | The code layer you need to understand |
| 4 | [MCP Deep Research 2026](../../ai-protocols/mcp/MCP_Deep_Research_2026) | The integration protocol you'll design and review |
| 5 | [AI Agent Evaluation Framework](../../ai-development/testing/AI_Agent_Evaluation_Framework_Guide) | The evidence standard you'll own |
| 6 | [Agentic AI Security Guardrails](../../enterprise-architecture/ai-architecture/agentic-ai-security-guardrails) | The security conversation you'll lead |
| 7 | [Executive Communication Framework](../../enterprise-architecture/framework/Executive_Communication_Framework_Guide) | The CFO/CDO conversation you've done before — now with AI metrics |

---

*Last reviewed: 2026-07-13*
