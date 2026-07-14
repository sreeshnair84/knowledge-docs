---
title: "Part 2 — Enterprise AI Operating Models"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
source_file: ""
tags: ["operating-model", "ai-coe", "hub-spoke", "federated-ai", "agent-factory", "digital-workforce"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 2 — Enterprise AI Operating Models

> **Report Context:** Part 2 of the [Enterprise AI Research Report](./index). Covers all 12 enterprise AI operating model patterns — when to use each, advantages, disadvantages, org chart, reporting structure, funding model, ownership, KPIs, chargeback approach, and maturity progression.

---

## Why Operating Model Choice Matters

Technology is the easy part. The operating model determines whether AI capabilities scale across the enterprise or stay trapped in proof-of-concept purgatory.

McKinsey research (2025) identifies operating model misalignment as the primary reason only ~6% of enterprises capture disproportionate AI value. Deloitte's AI Readiness Report (2025) echoes: enterprises that design their operating model for AI first — then choose technology — achieve 3× the ROI of those who reverse the sequence.

The right operating model depends on:
- Enterprise size and complexity
- AI maturity level
- Regulatory environment
- Existing data and technology landscape
- Cultural readiness for change
- Speed vs. control trade-off preference

---

## The 12 Operating Model Patterns

### Model 1 — Centralised AI Centre of Excellence (CoE)

**Description:** A single, central AI team owns all AI strategy, delivery, standards, and governance. Business units consume AI services delivered by the CoE.

#### When to Use
- Early AI maturity (Level 1–2)
- Highly regulated industries where centralised oversight is mandatory (banking, pharma, defence)
- Enterprises with limited AI talent wanting to concentrate scarce expertise
- Organisations that need rapid standardisation across divisions

#### Organisation Chart
```
Chief AI Officer
    │
    ├── AI Strategy & Governance
    ├── AI Platform Engineering
    ├── Data Science & ML Engineering
    ├── AI Product Management
    ├── Responsible AI & Ethics
    └── AI Delivery (project teams serving BUs)
```

#### Reporting Structure
CoE reports to CTO, CIO, or CAIO. Business units submit AI requests; CoE prioritises and delivers.

#### Funding Model
- **Corporate funded:** CoE budget held centrally; business units do not pay directly
- Annual budget planning; headcount approval centrally
- Often funded as infrastructure/platform cost

#### Ownership Model
- **CoE owns:** Models, platforms, standards, governance, delivery
- **Business owns:** Requirements, business validation, adoption

#### Advantages
| Advantage | Impact |
|-----------|--------|
| Standards enforced consistently | High reuse, low duplication |
| Scarce AI talent concentrated | Better quality output |
| Governance centralised | Compliance risk reduced |
| Vendor relationships consolidated | Negotiating leverage |
| Clear accountability | Easier to measure CoE ROI |

#### Disadvantages
| Disadvantage | Risk |
|--------------|------|
| Bottleneck as demand scales | Delivery backlog grows |
| Distance from business domain knowledge | Solutions may miss business context |
| Slow to respond to rapidly changing business needs | Business dissatisfaction |
| CoE becomes an empire, not a service | Political friction |
| Single point of failure | Business continuity risk |

#### KPIs
- AI use cases delivered per quarter
- Time-to-production (average days from request to deployment)
- Business satisfaction score (NPS)
- Model reuse rate across BUs
- Governance incidents per quarter

#### Chargeback
Generally **no chargeback** at early maturity. As maturity grows, transition to project-based chargeback by BU.

#### Maturity Fit
Best at **Level 1–2** (Exploring, Experimenting). Must evolve by Level 3 or becomes a bottleneck.

---

### Model 2 — Hub and Spoke

**Description:** A central AI Hub (CoE or platform team) sets standards, builds shared platforms, and provides enablement. Business unit "Spokes" have embedded AI capability that operates within Hub governance.

#### When to Use
- Maturing enterprises at Level 2–3
- Large enterprises with strong business unit autonomy
- Need for both standardisation and business proximity
- Scaling beyond what a pure CoE can handle

#### Organisation Chart
```
Chief AI Officer (Hub Lead)
    │
    ├── Hub: AI Platform Engineering
    ├── Hub: AI Standards & Governance
    ├── Hub: Responsible AI Office
    ├── Hub: AI Talent & Capability
    │
    ├── Spoke: BU Finance — AI Lead + 2-3 AI Engineers
    ├── Spoke: BU Operations — AI Lead + 2-3 AI Engineers
    ├── Spoke: BU Customer — AI Lead + 2-3 AI Engineers
    └── Spoke: BU Risk — AI Lead + 2-3 AI Engineers
```

#### Reporting Structure
- **Hub** reports to CAIO or CTO
- **Spoke AI Leads** have dual reporting: functionally to Hub (AI standards), administratively to BU head
- Governance forums connect Hub and Spokes quarterly

#### Funding Model
- **Hub:** Centrally funded (infrastructure, platform, governance)
- **Spokes:** Business unit funded (headcount, project costs)
- Hybrid: Hub charges Spokes for platform services (consumption-based)

#### Ownership Model
- **Hub owns:** Platform, standards, governance, talent frameworks
- **Spoke owns:** Domain-specific models, prompts, agents, business validation

#### Advantages
| Advantage | Impact |
|-----------|--------|
| Standards consistent across Spokes | Reduced risk |
| Business proximity of Spokes | Better solutions |
| Scales beyond pure CoE | Handles enterprise demand |
| Shared platforms reduce duplication | Cost efficient |
| Talent development pathways | Hub ↔ Spoke rotation |

#### Disadvantages
| Disadvantage | Risk |
|--------------|------|
| Coordination overhead between Hub and Spokes | Governance friction |
| Spoke AI teams may drift from Hub standards | Compliance gaps |
| Power dynamics: Hub vs BU authority | Political conflict |
| Inconsistent Spoke maturity | Quality variance |

#### KPIs
- Hub platform adoption rate by Spokes
- Standards compliance rate (% solutions passing governance gate)
- Time-to-production (Spoke vs. Hub delivered)
- Cross-BU AI asset reuse rate
- Spoke AI capability maturity score

#### Chargeback
**Platform chargeback**: Spokes pay Hub for platform consumption (compute, API calls, storage). Spoke headcount charged to BU budget.

#### Maturity Fit
**Level 2–4** (Experimenting through Optimising). The dominant model for large enterprises scaling AI.

---

### Model 3 — Federated AI

**Description:** Business units operate largely autonomous AI capability with minimal central coordination. A lightweight central function sets high-level guardrails (security, compliance, ethics) but does not control delivery.

#### When to Use
- Highly decentralised enterprises (conglomerates, holding companies)
- Divisions with very different regulatory environments
- Fast-moving competitive environments where speed > standardisation
- Level 3–4 maturity where BUs have genuine AI capability

#### Organisation Chart
```
Enterprise AI Governance Council (Lightweight)
    │ (policy only, no delivery authority)
    │
    ├── Division A: AI Team (self-contained)
    ├── Division B: AI Team (self-contained)
    ├── Division C: AI Team (self-contained)
    └── Division D: AI Team (self-contained)
```

#### Reporting Structure
- Each division's AI team reports to division CTO/CIO
- Enterprise AI Governance Council is a cross-divisional body (no reporting authority)
- Policy compliance is self-attested; audited periodically

#### Funding Model
- **Fully divisional funded** — each division owns its AI investment
- No central AI budget except governance council operating costs
- Division P&L bears full cost and owns full benefit

#### Ownership Model
- **Divisions own everything** — strategy, platform, delivery, governance (within enterprise guardrails)
- Enterprise council owns: enterprise-wide policies, standards, audit

#### Advantages
| Advantage | Impact |
|-----------|--------|
| Maximum agility for each division | Fast time-to-value |
| Deep domain specialisation | Better solutions |
| Divisions accountable for their own AI | Stronger ownership |
| No central bottleneck | Scales naturally |

#### Disadvantages
| Disadvantage | Risk |
|--------------|------|
| Massive duplication of investment | High cost |
| Inconsistent governance | Compliance and ethics risk |
| AI talent fragmentation | Quality gaps |
| Vendor relationships fragmented | Weak negotiating position |
| No enterprise-wide AI visibility | Board/exec blind spots |

#### KPIs
- Per-division AI ROI
- Enterprise-wide policy compliance rate (audit results)
- Duplication index (% similar AI assets across divisions)
- AI incident rate across the enterprise

#### Chargeback
No chargeback mechanism — each division is self-funded.

#### Maturity Fit
**Level 3–5** for established enterprises. High risk if used too early — governance gaps emerge.

---

### Model 4 — Embedded AI Teams

**Description:** Small AI teams (2–4 people) embedded directly within product or operations teams. No central AI function. AI is treated like any other engineering competency, embedded in the team that needs it.

#### When to Use
- Tech-native or digital-first enterprises
- Product-led organisations (software companies, digital platforms)
- Companies where every product team is expected to ship AI features
- Level 3–5 AI maturity with strong engineering culture

#### Organisation Chart
```
Product Team A
    ├── Product Manager
    ├── Engineering Lead
    ├── AI Engineer (embedded)        ← AI capability in-team
    └── Software Engineers

Product Team B
    ├── Product Manager
    ├── Engineering Lead
    ├── AI Engineer (embedded)        ← AI capability in-team
    └── Software Engineers

AI Infrastructure Guild (lightweight, no authority)
    └── Best practice sharing, standards, tooling
```

#### Reporting Structure
Embedded AI engineers report to the product/engineering lead, not to any central AI function. Guild is voluntary and advisory.

#### Funding Model
Product team headcount budget includes AI engineers. No separate AI budget line.

#### Advantages
| Advantage | Impact |
|-----------|--------|
| Maximum integration with product context | Best solutions |
| No handoff friction | Fastest delivery |
| AI treated as first-class engineering | Higher quality |
| Ownership unambiguous | Strong accountability |

#### Disadvantages
| Disadvantage | Risk |
|--------------|------|
| No enterprise AI standardisation | Compliance risk |
| AI talent costs spread across many teams | Expensive at scale |
| Siloed learning — teams don't share | Duplication, reinvention |
| Inconsistent quality across teams | Variable output |

#### Maturity Fit
**Level 3–5** for digital-native companies. Risky in regulated industries without governance overlay.

---

### Model 5 — Business Domain AI Teams

**Description:** Dedicated AI teams organised around business domains (Finance AI, Customer AI, Operations AI, Risk AI) rather than technology functions. Each domain team owns AI for its entire domain.

#### When to Use
- Large enterprises with mature business domains
- Where domain expertise is the primary constraint (not AI expertise)
- Regulated industries where domain specialists must own AI risk
- Level 3–4 maturity

#### Organisation Chart
```
Chief AI Officer
    │
    ├── Finance Domain AI Team
    │     ├── AI Lead (Finance background)
    │     ├── ML Engineers × 3
    │     ├── Prompt/Context Engineer × 2
    │     └── Data Scientist × 2
    │
    ├── Customer Domain AI Team
    ├── Operations Domain AI Team
    ├── Risk & Compliance Domain AI Team
    └── AI Platform Team (cross-domain shared services)
```

#### Advantages
Deep domain expertise in AI teams; strong business alignment; AI risk owned by domain experts (critical in banking/healthcare).

#### Disadvantages
Duplication of platform capabilities; coordination overhead for cross-domain AI use cases.

#### Maturity Fit
**Level 3–4**. Common in banking (separate Credit AI, AML AI, Customer AI teams).

---

### Model 6 — Platform-First AI

**Description:** The primary investment is in a world-class internal AI platform (self-service infrastructure, tooling, APIs, guardrails). Business units and product teams build their own AI solutions on top of this platform.

#### When to Use
- Enterprises with many teams wanting to build AI simultaneously
- Internal developer platform already mature
- Want to govern AI through platform constraints rather than process
- Level 3–5 maturity

#### Key Platform Components
| Platform Layer | What It Provides |
|----------------|-----------------|
| Model Platform | LLM access, model routing, version management |
| Inference Platform | Low-latency serving, autoscaling, cost management |
| Prompt Platform | Prompt registry, versioning, A/B testing |
| Knowledge Platform | RAG infrastructure, vector DBs, document pipelines |
| Memory Platform | Episodic, semantic, working memory services |
| Evaluation Platform | Automated eval pipelines, human feedback loops |
| Observability Platform | Tracing, cost analytics, drift detection |
| Security Platform | Guardrails, PII detection, content moderation |
| Policy Platform | OPA-based policy enforcement, audit logging |

#### Funding Model
Platform team centrally funded (as infrastructure). Individual team AI usage metered and charged back.

#### Maturity Fit
**Level 3–5**. Requires significant platform engineering investment upfront.

---

### Model 7 — Product-Centric AI

**Description:** AI is embedded in product lines. Each product has a dedicated AI product manager and AI engineers. AI strategy is driven by product roadmaps, not central AI strategy.

#### When to Use
- B2C or B2B SaaS products where AI is a feature/differentiator
- Competitive markets where product AI features drive revenue
- Level 3–5 maturity with product-led growth culture

#### Funding Model
Product P&L funds AI development. Revenue from AI features expected to justify investment.

#### Key Metric
AI feature adoption rate, revenue per AI feature, customer NPS lift from AI features.

---

### Model 8 — AI Factory

**Description:** A high-throughput delivery model designed to produce AI use cases at scale and speed. Standardised intake, design, delivery, and deployment pipelines with dedicated teams at each stage. Think manufacturing assembly line applied to AI delivery.

#### When to Use
- Enterprises with large AI backlogs needing rapid throughput
- Programmes with 50+ AI use cases to deliver over 12–18 months
- When use case patterns are known and repeatable (vs. novel research)
- Level 3–4 maturity seeking to scale proven patterns

#### Factory Structure
```
AI Factory Operating Model

[Intake & Prioritisation]
    ↓
[Business Case & Discovery]  ← AI Business Analysts
    ↓
[Data & Architecture Review]  ← AI Architects
    ↓
[Build Track A] [Build Track B] [Build Track C]  ← Parallel delivery pods
    ↓
[Evaluation & Testing]  ← AI QA Engineers
    ↓
[Deployment & Monitoring]  ← MLOps/LLMOps
    ↓
[Live Operations]  ← AI Operations Centre
```

#### Throughput KPIs
- Use cases in pipeline
- Throughput (use cases deployed per month)
- Cycle time (days from intake to production)
- Defect rate (post-deployment incidents per 100 deployments)
- Reuse rate (% using existing components vs. new build)

#### Funding Model
Programme-funded (fixed budget for factory capacity); individual use case costs tracked against programme envelope.

#### Maturity Fit
**Level 3–4**. Highly effective when use case patterns are known. Less suitable for novel research.

---

### Model 9 — Agent Factory

**Description:** A specialised AI Factory focused specifically on designing, building, testing, deploying, and operating AI agents. Includes standardised agent blueprints, tool libraries, evaluation frameworks, and agent operations practices.

#### When to Use
- Enterprise moving to agentic AI at scale (Level 4–5)
- Many autonomous workflow automation opportunities
- MCP and A2A protocols standardised internally
- Need to govern and monitor a fleet of production agents

#### Agent Factory Pipeline
```
[Agent Opportunity Assessment]
    ↓
[Goal & Task Specification]
    ↓
[Agent Blueprint Selection] ← Standard blueprints for common agent types
    ↓
[Tool & MCP Configuration]
    ↓
[Memory & Context Design]
    ↓
[Safety & Red Team Testing]
    ↓
[Human-in-the-Loop Review]
    ↓
[Canary Deployment]
    ↓
[Agent Operations (AgentOps)]
```

#### Key Differentiators from AI Factory
| Dimension | AI Factory | Agent Factory |
|-----------|------------|---------------|
| Primary output | ML models, GenAI features | Autonomous agents |
| Testing focus | Accuracy, bias, drift | Safety, autonomy bounds, tool failure |
| Governance gate | Responsible AI review | Agent governance board |
| Operations model | Model monitoring | Agent fleet management |
| Protocols | REST/gRPC | MCP, A2A |

#### Maturity Fit
**Level 4–5** (Agentic Enterprise). Emerging pattern as of 2026.

---

### Model 10 — Digital Workforce

**Description:** AI agents are treated as a parallel workforce alongside human employees. The digital workforce has managers (AgentOps teams), job descriptions (agent specifications), performance reviews (evaluation pipelines), and HR processes (lifecycle management, retirement).

#### When to Use
- Level 4–5 enterprises with mature agentic AI
- Large-scale process automation targeting headcount reduction or redeployment
- Enterprises with well-defined, high-volume repetitive workflows suitable for automation

#### Digital Workforce Management Framework
| Human Workforce Concept | Digital Workforce Equivalent |
|------------------------|------------------------------|
| Job Description | Agent Specification (goals, tools, constraints) |
| Onboarding | Agent Deployment & Activation |
| Manager | AgentOps Engineer / AI Product Manager |
| Performance Review | Evaluation Pipeline + Business Metrics |
| Disciplinary Action | Agent Rollback / Constraint Tightening |
| Resignation / Retirement | Agent Decommissioning |
| Skills Training | Fine-tuning, Prompt Updates, Tool Additions |
| Workforce Planning | Agent Portfolio Planning |

#### KPIs
- Digital workforce headcount (number of production agents)
- Tasks completed per agent per day
- Human handoff rate (% of tasks requiring human intervention)
- Cost per task (digital vs. human comparison)
- Agent MTTR (Mean Time to Recovery after failure)

---

### Model 11 — AI Shared Services

**Description:** AI capability delivered as internal shared services with defined SLAs, pricing, and service catalogues. Business units subscribe to AI services like they subscribe to cloud, HR, or finance shared services.

#### When to Use
- Large enterprises with established shared service culture
- Mature AI platforms ready for productisation
- Business units want consumption flexibility without owning AI teams
- Level 3–5 maturity

#### Service Catalogue Structure
| Service | Description | SLA |
|---------|-------------|-----|
| Inference-as-a-Service | LLM API access, model routing | 99.9% availability, <500ms p95 latency |
| Embedding-as-a-Service | Text/document embedding | 99.5%, <200ms |
| RAG-as-a-Service | Managed retrieval pipelines | 99.5%, <1s |
| Agent-as-a-Service | Pre-built agents (HR, Finance, etc.) | 99.9%, task SLA varies |
| Evaluation-as-a-Service | AI quality testing | Best effort, 24hr turnaround |
| Compliance Review Service | Responsible AI assessment | 5 business days |

#### Funding Model
**Consumption-based chargeback**: Business units pay per API call, token consumed, or agent task completed.

#### Maturity Fit
**Level 3–5**. Requires platform maturity and financial systems for consumption tracking.

---

### Model 12 — AI-Native (Post-Transformation)

**Description:** AI is so deeply embedded in the enterprise that a separate "AI operating model" no longer exists — AI is the operating model. Every team has AI capability; every process assumes AI augmentation; every product is AI-enhanced. The enterprise operates as a single AI system.

#### Characteristics
- AI literacy is a baseline competency for all employees
- AI engineers are as common as software engineers in every team
- Governance is constitutional (automated, policy-as-code)
- The AI platform is as foundational as the cloud platform
- Competitive advantage is proprietary AI (models, data, agents)

#### Maturity Fit
**Level 5–6** (AI-Native Organisation). Aspirational for most enterprises; reality for a handful in 2026.

---

## Operating Model Comparison Matrix

| Model | Best Maturity Level | Speed | Standardisation | Governance | Cost Efficiency | Business Alignment |
|-------|---------------------|-------|-----------------|------------|-----------------|-------------------|
| Centralised CoE | L1–L2 | Slow | High | High | High | Low |
| Hub and Spoke | L2–L4 | Medium | High | High | Medium-High | Medium-High |
| Federated | L3–L5 | Fast | Low | Low | Low | High |
| Embedded Teams | L3–L5 | Fast | Low | Low | Low | Very High |
| Business Domain | L3–L4 | Medium | Medium | Medium | Medium | High |
| Platform-First | L3–L5 | Medium-Fast | High | High | High | Medium |
| Product-Centric | L3–L5 | Fast | Low | Low | Low | Very High |
| AI Factory | L3–L4 | High Throughput | High | High | High | Medium |
| Agent Factory | L4–L5 | High Throughput | High | High | High | Medium |
| Digital Workforce | L4–L5 | Very Fast | High | Medium | Very High | High |
| AI Shared Services | L3–L5 | Medium | High | High | High | Medium |
| AI-Native | L5–L6 | Maximum | Native | Constitutional | Maximum | Native |

---

## Maturity Progression

```
Level 1 (Exploring)
    └── Centralised CoE (small team, few pilots)

Level 2 (Experimenting)
    └── CoE → begin Hub formation
    └── AI Factory for first production use cases

Level 3 (Scaling)
    └── Hub & Spoke (dominant model)
    └── Platform-First investment begins
    └── AI Shared Services for core capabilities

Level 4 (Optimising)
    └── Agent Factory established
    └── Digital Workforce emerging
    └── Business Domain teams mature
    └── Platform-First fully operational

Level 5 (AI-First)
    └── Digital Workforce at scale
    └── AI-Native operating model transition begins

Level 6 (AI-Native)
    └── AI-Native — AI is the operating model
```

---

## Hybrid Models

Most large enterprises combine models. Common hybrid patterns:

**Hub & Spoke + AI Factory**: Hub sets standards; AI Factory delivers high-volume use cases; Spoke teams own domain-specific solutions.

**Platform-First + Embedded Teams**: Central platform team provides self-service AI; product teams embed AI engineers who consume the platform.

**Business Domain + AI Shared Services**: Domain teams own strategy and business logic; AI Shared Services provides inference, embedding, and evaluation infrastructure.

---

## Industry-Specific Operating Model Preferences

| Industry | Preferred Model | Reason |
|----------|----------------|--------|
| Banking & Insurance | Hub & Spoke + AI Shared Services | Regulatory oversight; model risk management |
| Healthcare | Business Domain + CoE Governance | Clinical domain expertise critical; safety paramount |
| Retail & E-commerce | Embedded + Product-Centric | Speed to market; product AI as differentiator |
| Manufacturing | AI Factory + Digital Workforce | High-volume repeatable processes; process automation |
| Telecom | Hub & Spoke + Agent Factory | Network complexity; customer journey automation |
| Public Sector | Centralised CoE | Procurement constraints; accountability requirements |
| Tech Companies | Embedded + Platform-First | Engineering culture; speed critical |
| Consulting Firms | AI Factory + AI Shared Services | Client delivery efficiency; reusable assets |

---

## Key Consulting Perspectives

**McKinsey (Rewired, 2023):** Advocates for *integrated teams* co-located with business domains, supported by a central AI platform. The "factory" metaphor applies to repeatable use cases; novel use cases need research-style operating models.

**Deloitte AI Operating Model (2024):** Three-speed model: (1) core platform and governance centrally, (2) product/domain AI at medium speed, (3) rapid experimentation at the edge. Governance applied proportionately to risk.

**Gartner AI Operating Model Maturity (2025):** Identifies the "frozen middle" problem — senior executives approve AI strategy; frontline teams want AI tools; middle management resists change. Operating model must address the frozen middle explicitly.

**Accenture AI CoE Research (2025):** 70% of enterprises that fail to evolve their CoE model beyond Level 2 within 24 months report stagnating AI value. Evolution path: CoE → Hub & Spoke → Platform-First is the dominant observed pattern.

**BCG AI at Scale (2025):** Emphasises *AI factory* for scaling proven patterns while maintaining a separate *AI research function* for novel capability development. The two must not be conflated.

---

## Related Resources

- [Target Operating Model & Change](../enterprise-architecture/transformation/Target_Operating_Model_and_Change) — Operating model change management
- [Part 8 — Organizational Roles & RACI](./part-08-organizational-roles) — Roles within each operating model
- [Part 7 — AI Platform Operating Model](./index#part-7) — Platform team structure and services
- [AI Transformation Consultant Toolkit](../enterprise-architecture/specialization/AI_Transformation_Consultant_Toolkit_2026) — Consulting delivery framework
