---
title: "Module 5 — AI Investment Strategy"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-05-ai-investment-strategy"]
---

# Module 5 — AI Investment Strategy

This module equips enterprise architects with the frameworks, vocabulary, and analytical tools to position, justify, and govern AI investments at scale. AI is not another technology wave — it changes the economics of every investment decision your organization makes. Your job is to ensure executives understand that distinction before they approve the wrong thing.

---

## Why AI Is Different From Previous Technology Investments

Every generation of enterprise technology has been accompanied by claims that "this time is different." In most cases, it wasn't. ERP systems, cloud migration, and mobile-first strategies all followed recognizable patterns: clear use cases, established vendors, mature ROI models, and a body of implementation playbooks. AI breaks each of these assumptions.

### The Prior Technology Waves

| Technology Wave | ROI Model | Implementation Risk | Talent Model | Obsolescence Risk |
|---|---|---|---|---|
| ERP (1990s–2000s) | Cost reduction via process standardization | High, but well-understood | Hire integrators | Low (upgrade cycles) |
| Cloud (2005–2015) | CapEx → OpEx shift, elasticity | Medium | Train existing ops | Medium (multi-year) |
| Mobile (2010–2020) | New channel revenue, productivity | Low–Medium | New dev discipline | Medium (OS upgrades) |
| AI (2020–present) | Probabilistic, use-case dependent | High, novel failure modes | Scarce, expensive | Very High (monthly) |

### What Makes AI Structurally Different

**1. Probabilistic Outputs**

Traditional software is deterministic: the same input produces the same output every time. AI systems are probabilistic. A language model may answer the same question differently on successive calls. This breaks the classical testing paradigm. Architects must design for graceful degradation, not perfection.

!!! warning "The Determinism Assumption"
    Most enterprise architects default to deterministic thinking. A system that "usually works" is not acceptable for ERP payroll. It may be perfectly acceptable for AI-assisted document summarization. The key is matching the investment to the acceptable failure rate — not assuming AI must be deterministic before it can be deployed.

**2. Data Dependency**

AI performance is a direct function of data quality, volume, and recency. An AI model trained on stale or biased data will produce stale or biased outputs regardless of the model's underlying capability. This means every AI investment implicitly requires a data investment. You cannot decouple them.

**3. Talent Scarcity**

The supply of ML engineers, AI architects, and AI product managers is structurally limited and will remain so for years. Enterprises competing for this talent face bidding wars with technology companies that offer higher compensation, more interesting work, and faster career progression. The talent constraint is often the binding constraint on AI scaling — not capital.

**4. Rapid Model Obsolescence**

In 2021, GPT-3 was state-of-the-art. In 2022, GPT-3.5 superseded it. By 2023, GPT-4 changed the landscape again. Models that anchor enterprise AI products become outdated within 12–24 months. This creates a unique FinOps challenge: AI assets depreciate faster than any previous technology category.

**5. AI Is an Ecosystem Investment**

Buying a single AI model or API does not give you a production AI capability. You need: data pipelines, evaluation frameworks, monitoring, guardrails, retraining pipelines, prompt management, cost controls, and human-in-the-loop processes. The model is the smallest part of the investment. Enterprises that treat AI as a point solution consistently fail to reach production.

---

## The Pilot Purgatory Problem

Industry research consistently shows that 70–85% of enterprise AI pilots never reach production. This is not because the pilots fail technically. They usually succeed technically. They fail to reach production for structural reasons.

```
Pilot Stage
    │
    ├── Technical success (model works in sandbox)
    │
    ├── Business case gap (no one calculated ROI for production)
    │
    ├── Data readiness gap (prod data ≠ pilot data)
    │
    ├── Platform gap (no infrastructure to host model at scale)
    │
    ├── Governance gap (no approval process for AI deployment)
    │
    └── STUCK ──── "Pilot Purgatory" ──── Never Reaches Production
```

**Root Causes of Pilot Purgatory**

1. **Pilots are funded from innovation budgets, not delivery budgets.** When the pilot ends, there is no budget to productionize.
2. **Pilots use curated data.** Production data is messier, less labeled, and requires ETL investment the pilot never budgeted.
3. **Pilots are led by data science teams.** Productionization requires engineering, security, compliance, and operations — none of whom were involved in the pilot.
4. **Success criteria are technical, not business.** "The model achieves 92% accuracy" does not tell the CFO anything about return on investment.
5. **There is no platform to deploy to.** Each pilot team builds a bespoke deployment stack, which cannot be maintained or replicated.

!!! tip "The Architect's Role in Escaping Pilot Purgatory"
    As an enterprise architect, your job is to insert production-readiness criteria at the pilot stage. Before any pilot launches, define: (1) the production infrastructure it will deploy to, (2) the business owner who will fund productionization, (3) the data pipeline that will serve production-grade data, and (4) the evaluation framework that will govern go/no-go decisions.

---

## What Enterprise Leaders Misunderstand About AI Economics

**Misunderstanding 1: "AI is just another SaaS subscription"**

AI API costs are variable and can scale non-linearly with usage. A team that processes 10,000 documents per month in a pilot may need to process 10,000,000 documents in production. Token-based pricing means costs grow with usage in ways that traditional SaaS does not.

**Misunderstanding 2: "We can swap models later"**

Model portability is lower than expected. Prompts, evaluation datasets, and integration patterns are all model-specific. Migrating from one model provider to another is a significant engineering effort, not a configuration change.

**Misunderstanding 3: "The model is the asset"**

The model is a commodity. The data, the prompts, the evaluation harness, the feedback loops, and the organizational capability to iterate — these are the actual assets. Organizations that treat model selection as their primary investment decision consistently underinvest in the surrounding system.

**Misunderstanding 4: "AI reduces headcount immediately"**

AI augments human capability before it replaces human roles. The near-term ROI of AI is productivity gain (fewer hours per task), not headcount reduction. Organizations that promise headcount reduction as the primary AI benefit set themselves up for disappointment and resistance.

**Misunderstanding 5: "We can govern AI after we deploy it"**

Retrofitting governance onto deployed AI systems is exponentially more expensive than designing governance in from the start. Every AI use case that ships without an audit trail, bias evaluation, or explainability mechanism creates technical and regulatory debt.

---

## AI Maturity Model

The AI Maturity Model gives organizations a structured way to assess their current capability and define the roadmap to the next level.

### The Six-Level Framework

```
Level 5: Autonomous
    AI makes decisions with human oversight;
    continuous learning loops; near-real-time adaptation

Level 4: AI-First
    AI embedded in core business processes;
    AI CoE operating at scale; AI FinOps mature

Level 3: Scaling
    Platform investments underway; shared infrastructure;
    multiple teams consuming AI services; governance maturing

Level 2: Proof of Value
    Some pilots in production; business cases approved;
    basic governance; 2–5 use cases live

Level 1: Experimentation
    Ad hoc pilots; no governance; innovation lab driven;
    no shared infrastructure; no clear success criteria

Level 0: No AI
    No meaningful AI in production or near-term roadmap
```

### Level-by-Level Assessment Criteria

| Level | Governance | Infrastructure | Talent | Use Cases | Data |
|---|---|---|---|---|---|
| 0 | None | None | None | 0 | Unmanaged |
| 1 | Ad hoc | None | 1–2 data scientists | < 3 pilots | Basic data warehouse |
| 2 | Project-level | Shared notebooks | 3–10 ML staff | 2–5 in prod | Data lake emerging |
| 3 | Program-level | ML platform | AI platform team | 5–20 in prod | Feature store available |
| 4 | Enterprise-level | Full AI platform | AI CoE, embedded staff | 20+ in prod | Data mesh operating |
| 5 | Autonomous | Self-optimizing | Federated AI staff | Hundreds | Real-time, governed |

### How to Assess Your Organization Today

Run a maturity assessment workshop with the following stakeholders: CTO or CIO, Head of Data, business unit leaders, and AI delivery leads. Use the criteria above to score each dimension independently, then average.

!!! note "Assessment Pitfall"
    Organizations consistently over-rate themselves by 1–2 levels. This happens because executives conflate experimentation with capability. "We have a chatbot pilot" is Level 1, not Level 3. Use the production use case count and governance maturity as the most reliable calibrators.

### Building the Roadmap to the Next Level

The transition from each level to the next has a predictable set of investment requirements:

**Level 0 → Level 1**: Fund an AI innovation team; identify 3 pilot use cases; procure API access to foundation models; run proof-of-concept sprints.

**Level 1 → Level 2**: Establish a basic AI governance framework; define production-readiness criteria; invest in MLOps tooling for at least one use case; create a business case template for AI investments.

**Level 2 → Level 3**: Invest in a shared AI platform; create an AI CoE; establish data contracts for AI; implement cost monitoring for AI spend; build an internal AI community of practice.

**Level 3 → Level 4**: Embed AI specialists in every major business unit; build an internal AI marketplace; implement enterprise-wide responsible AI policy; establish AI FinOps practice; move AI strategy into the corporate strategy cycle.

**Level 4 → Level 5**: Implement continuous learning pipelines; establish AI ethics board; build autonomous decision frameworks with human escalation paths; invest in real-time data infrastructure.

---

## Enterprise AI Platforms

### What They Are

An enterprise AI platform is not a single product. It is a collection of capabilities that together allow multiple teams to build, deploy, monitor, and govern AI systems reliably and at scale. Think of it as the "cloud infrastructure" equivalent for AI.

### Core Platform Components

**1. Model Serving Infrastructure**

Manages the deployment and operation of AI models in production. Responsibilities include: load balancing, auto-scaling, versioning, A/B testing, and canary deployments.

```
Request ──► API Gateway ──► Model Router
                                │
                    ┌───────────┴───────────┐
                    │                       │
             Model v1 (70%)         Model v2 (30%)
             [Production]           [Canary]
```

**2. Prompt Management and Versioning**

Prompts are code. They must be version-controlled, tested, and deployed with the same rigor as application code. A prompt management system provides: prompt registry, version history, A/B testing framework, and environment promotion (dev → staging → prod).

**3. Evaluation and Testing Frameworks**

AI systems cannot be tested with traditional unit tests alone. Evaluation frameworks provide: benchmark datasets, automated scoring (accuracy, relevance, safety), regression testing across model versions, and human-in-the-loop review queues.

**4. Observability and Monitoring**

| Monitoring Layer | What to Track | Why It Matters |
|---|---|---|
| Infrastructure | Latency, throughput, error rates | Operational reliability |
| Model | Accuracy drift, output distribution | Model degradation detection |
| Business | Task completion rate, user satisfaction | Business outcome tracking |
| Cost | Token usage, cost per interaction | FinOps |
| Safety | Policy violations, guardrail triggers | Risk management |

**5. Guardrails and Safety Controls**

Guardrails are runtime checks that validate AI inputs and outputs against safety and policy requirements. They operate at four layers:

```
User Input
    │
    ▼
Input Guardrails (PII detection, prompt injection, scope limits)
    │
    ▼
Model (LLM or other AI system)
    │
    ▼
Output Guardrails (content policy, factual grounding, format validation)
    │
    ▼
Application Response
```

**6. Cost Management (FinOps for AI)**

AI cost management requires tracking at the token level, the model level, and the business-unit level. A mature FinOps capability for AI includes: real-time spend dashboards, budget alerts, cost attribution by team and use case, and optimization recommendations.

**7. Developer Experience**

The platform must make it easy for application teams to consume AI capabilities. This requires: SDKs in all supported languages, self-service provisioning, sandbox environments, documentation, and example applications.

### Buy vs. Build Decision Matrix

| Criterion | Buy (Managed Platform) | Build (Custom Platform) |
|---|---|---|
| Time to value | Fast (weeks) | Slow (months–years) |
| Total cost | Higher license cost, lower build cost | Lower license cost, very high build cost |
| Flexibility | Limited to vendor roadmap | Full control |
| Maintenance burden | Vendor-managed | Internal team |
| Best for | Levels 1–3 | Levels 4–5 with significant scale |

!!! info "The Build Trap"
    Many enterprises decide to build their own AI platform because commercial platforms "don't meet all our requirements." This almost always results in an expensive, under-resourced internal platform that becomes a bottleneck. Build only when your scale justifies a dedicated platform engineering team of 10+ engineers and when a commercial platform genuinely cannot serve your needs.

---

## Generative AI vs. Agentic AI: Investment Implications

This distinction is critical. Most executives do not understand it, and conflating the two leads to misallocated investment and governance failures.

### The Core Distinction

**Generative AI (GenAI)**

- Single-turn or few-turn interactions
- Human initiates, human reviews output
- AI generates content, human decides what to do with it
- Examples: document summarization, code generation, draft email, image creation
- Failure mode: bad output that a human catches before it causes harm

**Agentic AI**

- Multi-step, tool-using, goal-directed behavior
- AI takes actions in the world (calls APIs, writes files, sends messages, browses web)
- Human may not review each action
- Examples: autonomous research assistant, AI that manages calendar and sends emails, AI that executes code and interprets results
- Failure mode: bad action that causes harm before a human can intervene

```
Generative AI Interaction Model:
Human ──► Prompt ──► Model ──► Output ──► Human Reviews ──► Action

Agentic AI Interaction Model:
Human ──► Goal ──► Agent ──► Plan ──► Tool Call 1 ──► Tool Call 2 ──► ... ──► Result
                                          │               │
                                     (No human        (No human
                                      review)          review)
```

### Investment Profile Comparison

| Dimension | Generative AI | Agentic AI |
|---|---|---|
| Starting cost | Low (API access) | Medium–High (platform + tools) |
| Time to first value | Days–weeks | Weeks–months |
| Platform investment required | Low | High |
| Governance complexity | Medium | High |
| Risk profile | Lower | Higher |
| ROI potential | Medium | Very High |
| Monitoring requirements | Basic | Sophisticated (action logging) |
| Human oversight requirement | Per output | Per session or exception-based |

### Presenting the Distinction to Executives

Use this framing in executive conversations:

!!! tip "Executive Communication Script"
    "Generative AI is like giving your team a very capable assistant that drafts things for them to review. Agentic AI is like giving that assistant the ability to also send emails, book meetings, and execute code on your behalf — without asking permission for each step. The value is higher, but so is the governance requirement. We need to be clear about which one we're investing in."

### Governance Requirements Difference

GenAI governance focuses on: output quality, content policy, PII handling, and audit logging.

Agentic AI governance additionally requires: action authorization frameworks, tool scope limits, escalation paths, session recording, rollback capabilities, and blast radius controls (limiting how much damage a runaway agent can cause).

---

## AI Products vs. AI Features vs. Shared AI Capabilities

One of the most important architectural decisions in AI investment is choosing the right investment type. Each type has different economics, governance requirements, and strategic value.

### The Three Investment Types

**AI Feature**

An AI capability embedded in a specific product or application. The AI is not visible as a standalone entity — it enhances an existing user experience.

Examples: Smart search in an HR portal, predictive text in a CRM, anomaly detection alerts in a monitoring dashboard.

Investment characteristics: Low upfront, contained scope, single product team owns it, limited reuse potential.

**AI Product**

A standalone product whose primary value proposition is AI-powered. Users interact with the AI directly.

Examples: AI writing assistant, AI code reviewer, AI-powered customer service bot.

Investment characteristics: Higher upfront, dedicated product team, requires marketing and positioning, higher ROI potential.

**Shared AI Capability**

A reusable AI service consumed by multiple products and teams across the enterprise. Delivered as an internal API or platform service.

Examples: Entity extraction API used by 12 applications, document classification service used by 6 business units, translation service consumed enterprise-wide.

Investment characteristics: Highest upfront, but lowest marginal cost per consumer. ROI improves with every additional consumer team.

### Investment Model Implications

```
                AI Feature    AI Product    Shared Capability
                    │              │               │
Upfront Cost:      Low           Medium          High
Marginal Cost:    High           Medium          Very Low
Reuse Value:       None           Low             Very High
Governance:       Simple         Medium          Complex
Strategic Value:   Low           Medium          Very High
```

### Why Shared Capabilities Have the Best ROI for Enterprises

Consider a large bank with 40 product teams, each of which needs document classification. If each team builds their own:
- 40 separate investments
- 40 separate maintenance burdens
- 40 different quality levels
- No enterprise-wide improvement when a better model becomes available

If the enterprise builds a shared document classification service:
- 1 investment, amortized across 40 consumers
- 1 maintenance burden
- Consistent quality across the enterprise
- One upgrade benefits all 40 teams simultaneously

The shared capability model is almost always the right investment for cross-cutting AI functions in large enterprises.

!!! note "The Ownership Challenge"
    Shared capabilities require a clear owner with a budget, a roadmap, and an SLA commitment to consumers. The most common failure mode is building a shared capability with no funded owner, leaving consumers unsupported and eventually building their own again.

---

## Platform vs. Project Investment in AI

### The Core Trade-off

**Project Investment**

Funds one team to solve one problem with a bespoke solution. Fast to start, fast to deliver value for that one use case. Does not scale.

**Platform Investment**

Funds shared infrastructure, tooling, and services that multiple teams consume. Slow to start (requires designing for reuse), but marginal cost per additional use case approaches zero.

### The Break-Even Analysis

The platform investment pays off when the cumulative savings from shared infrastructure exceed the additional cost of building the platform rather than a point solution.

Let's model this:

| Parameter | Value |
|---|---|
| Cost of bespoke AI solution per use case | $200,000 |
| Annual maintenance per bespoke solution | $50,000 |
| Cost of AI platform (one-time build) | $800,000 |
| Annual platform maintenance | $150,000 |
| Marginal cost of adding a use case on platform | $30,000 |

**Break-even calculation over 3 years (10 use cases):**

Bespoke approach:
- Year 1: 10 × $200,000 = $2,000,000
- Year 2–3: 10 × $50,000 × 2 = $1,000,000
- Total: $3,000,000

Platform approach:
- Platform build: $800,000
- 10 use cases on platform: 10 × $30,000 = $300,000
- Platform maintenance: $150,000 × 2 = $300,000
- Total: $1,400,000

**Savings: $1,600,000 over 3 years.** Break-even occurs between use cases 4 and 5.

!!! tip "Rule of Thumb"
    Platform investment makes sense when you have more than 5 use cases planned within 2 years and more than 3 teams consuming AI services. Below that threshold, a well-designed bespoke solution with clear upgrade paths is often more pragmatic.

---

## AI Operating Models

How your organization structures the people and teams that build and govern AI is as important as the technology choices. Three primary operating models exist.

### Model 1: Centralized AI

All AI development happens in a single central team. Business units request AI capabilities; the central team builds and delivers them.

```
CEO
 │
 └─► Central AI Team
         │
         ├── BU 1 requests ──► Backlog ──► Central builds ──► Deploys
         ├── BU 2 requests ──► Backlog ──► Central builds ──► Deploys
         └── BU 3 requests ──► Backlog ──► Central builds ──► Deploys
```

**Advantages:** Consistent quality, strong governance, no duplication.

**Disadvantages:** Bottleneck, business units feel disempowered, slow delivery, central team cannot understand all business contexts deeply.

**Best for:** Organizations at Maturity Level 1–2, or highly regulated industries where governance concentration is required.

### Model 2: Federated AI

Each business unit has its own AI team. They build their own solutions independently.

```
CEO
 │
 ├─► BU 1 AI Team ──► BU 1 solutions
 ├─► BU 2 AI Team ──► BU 2 solutions
 └─► BU 3 AI Team ──► BU 3 solutions
         │
    (No coordination, no shared infrastructure, no standards)
```

**Advantages:** Fast delivery, deep business context, teams feel ownership.

**Disadvantages:** Massive duplication, inconsistent quality, governance nightmare, no enterprise-wide improvement.

**Best for:** Rarely recommended. May be appropriate for a brief experimentation phase.

### Model 3: Hub-and-Spoke (Recommended)

A central AI CoE (Hub) provides the platform, standards, shared capabilities, and governance. Embedded AI specialists in each business unit (Spokes) build unit-specific solutions using the Hub's platform.

```
CEO
 │
 └─► AI CoE (Hub)
         │
         ├── AI Platform ──────────────────────────────┐
         ├── Standards & Governance ────────────────────┤
         ├── Shared Capabilities ──────────────────────►│
         └── Training & Enablement ───────────────────►│
                                                        │
                                    ┌───────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
             BU 1 AI Team    BU 2 AI Team    BU 3 AI Team
             (Spoke)         (Spoke)         (Spoke)
             [Builds on       [Builds on      [Builds on
              Hub platform]    Hub platform]   Hub platform]
```

**Advantages:** Speed of federated + governance of centralized + economies of scale.

**Disadvantages:** Requires strong coordination, clear Hub/Spoke responsibilities, and executive sponsorship.

**Best for:** Organizations at Maturity Level 3+.

---

## AI Centers of Excellence (CoE)

### What an AI CoE Is

An AI Center of Excellence is a dedicated organizational unit that establishes and maintains the standards, tools, capabilities, and governance required for AI at scale. It is not a delivery team — it is an enabling capability.

!!! info "CoE vs. Center of Enablement"
    A traditional CoE is often seen as an elite team that does the "real" work while others watch. This model fails at scale. The better model is a **Center of Enablement**: the CoE builds the platform, writes the standards, trains the teams, and then gets out of the way so business units can move fast. The measure of an AI CoE's success is how many teams it has enabled, not how many use cases it has built itself.

### CoE Team Structure

| Role | Responsibility | Typical Headcount |
|---|---|---|
| CoE Director / Head of AI | Strategy, executive engagement, budget | 1 |
| AI Architects | Platform design, standards, use case reviews | 2–4 |
| ML Platform Engineers | Platform build and operations | 3–6 |
| MLOps Engineers | CI/CD for AI, model deployment pipelines | 2–4 |
| Data Engineers | Data pipelines, feature stores, data contracts | 2–4 |
| AI Product Managers | Use case intake, roadmap, stakeholder management | 2–3 |
| Responsible AI Lead | Governance, bias evaluation, red-teaming | 1–2 |
| AI Trainers / Enablement | Training curriculum, documentation, workshops | 1–2 |

**Minimum viable CoE (for Level 2–3 organizations):** 6–8 people. Larger organizations at Level 3–4 may need 20–40.

### CoE Services

1. **Standards and Guidelines**: AI architecture standards, model selection criteria, prompt engineering guidelines, evaluation standards.
2. **Tooling**: Managed access to AI APIs, internal prompt registry, evaluation tooling, observability dashboards.
3. **Reusable Components**: Pre-built integrations, shared embeddings, common guardrail configurations.
4. **Training**: Onboarding programs for AI development teams, executive AI literacy programs, responsible AI training.
5. **Governance**: Use case intake process, responsible AI review, model approval gates.
6. **Community of Practice**: Internal AI community, knowledge sharing, show-and-tell forums.

### Proposing and Standing Up an AI CoE

**Phase 1 — Proposal (Month 1–2)**

- Secure executive sponsor (ideally CTO or CIO)
- Define the CoE charter: mission, scope, services, funding model
- Estimate budget (see below)
- Present to leadership for approval

**Phase 2 — Foundation (Month 3–6)**

- Hire CoE Director and core team
- Select and deploy AI platform (buy or configure)
- Establish first version of standards and governance
- Run first 2–3 enablement programs

**Phase 3 — Scale (Month 7–18)**

- Onboard first wave of business unit teams
- Launch internal AI marketplace
- Publish AI use case catalog
- Establish AI FinOps reporting

**Indicative Budget for a Minimum Viable AI CoE (Year 1)**

| Category | Annual Cost |
|---|---|
| Staff (8 FTEs, blended rate $150K) | $1,200,000 |
| AI platform licenses / tooling | $300,000 |
| Training and enablement materials | $50,000 |
| External expertise (advisory) | $100,000 |
| Infrastructure (compute, storage) | $150,000 |
| **Total** | **$1,800,000** |

### Common CoE Failure Modes

1. **No executive sponsor**: The CoE becomes an orphan and gets defunded in the first budget cycle.
2. **Too delivery-focused**: CoE tries to build everything itself and becomes a bottleneck.
3. **Too standards-focused**: CoE publishes guidelines but builds nothing, leaving teams with no practical help.
4. **Underfunded**: A two-person "CoE" cannot serve an enterprise. It creates the illusion of governance without the substance.
5. **Misaligned incentives**: CoE is measured on publications and training sessions, not on production AI deployments across the enterprise.

---

## Internal AI Marketplace

### What It Is

An internal AI marketplace is a governed catalog of reusable AI services, models, prompts, and components that teams across the enterprise can discover and consume. Think of it as an App Store for internal AI capabilities.

### Why Large Enterprises Need One

Without a marketplace, the following happens repeatedly:
- Team A builds a document classifier. Team B, unaware, builds a different document classifier. Team C is building a third one.
- Each team builds from scratch: models, prompts, evaluation datasets, API wrappers.
- There is no quality signal: a team cannot know whether a given AI service is reliable enough to use.
- No economies of scale: each team pays for its own model calls when they could share.

### How to Design One

**Core Catalog Entities**

| Entity Type | Description | Examples |
|---|---|---|
| AI Services | Internal APIs wrapping AI capabilities | Document classifier, entity extractor, translation |
| Foundation Models | Approved model providers and versions | GPT-4o, Claude 3.5, Llama 3 (on-prem) |
| Prompt Templates | Versioned prompts for common tasks | Summarization prompt v3, classification prompt v2 |
| Evaluation Datasets | Benchmark datasets for common tasks | Legal doc accuracy dataset, customer intent dataset |
| RAG Corpora | Pre-built knowledge bases | HR policy corpus, product documentation corpus |

**Key Platform Features**

- Search and discovery (find AI services by capability, domain, owner)
- Quality ratings and SLA commitments per service
- Usage metrics (so teams can trust popular services)
- Self-service provisioning with API key management
- Documentation and example code per service
- Deprecation notices and migration paths

### Governance Model

Every listing in the internal marketplace must pass a **Service Readiness Review** covering:
- Responsible AI assessment (bias, fairness, safety)
- Security review (data handling, access controls)
- SLA definition (availability, latency, error rate)
- Cost model (how consumers are charged)
- Support commitment (who maintains it, what the SLA is)

---

## AI FinOps

### Unique Cost Drivers in AI

AI introduces cost drivers that do not exist in traditional software:

| Cost Driver | Description | Optimization Lever |
|---|---|---|
| Input tokens | Characters/words sent to the model | Prompt compression, context management |
| Output tokens | Characters/words generated by the model | Output length controls |
| Embedding costs | Vector generation for RAG systems | Caching, batching |
| GPU compute | Fine-tuning and self-hosted model costs | Spot instances, scheduled batching |
| Vector storage | Storage for embedding databases | Dimension reduction, pruning stale vectors |
| Evaluation costs | Human review, automated scoring | Sampling strategies, automation |
| Retraining costs | Periodic model fine-tuning | Scheduled training, transfer learning |

### Cost Allocation

In a multi-team AI environment, costs must be attributed to the correct business unit. This requires:

1. **Tagging**: Every API call tagged with team ID, use case ID, and environment (dev/staging/prod).
2. **Metering**: Real-time usage tracking per consumer, aggregated by billing period.
3. **Chargeback or Showback**: Either charge teams for their AI usage (chargeback) or show them their costs without billing (showback). Both drive cost-conscious behavior.

### Optimization Levers

**Model Selection**: Using a smaller, faster, cheaper model for simple tasks and reserving large models for complex tasks. A classification task that costs $0.015 per 1,000 tokens on GPT-4 may cost $0.001 per 1,000 tokens on a fine-tuned smaller model with equal accuracy.

**Caching**: Many AI applications make identical or near-identical requests repeatedly. Semantic caching stores recent model responses and returns cached responses for similar queries, reducing model calls by 20–60% in typical enterprise applications.

**Batching**: Sending multiple inputs to the model in a single API call. Reduces per-unit overhead and often qualifies for batch pricing discounts (some providers offer 50% discounts for asynchronous batch calls).

**Context Window Management**: The context window is the most expensive input to a language model. RAG architectures that retrieve only the most relevant context chunks rather than sending entire documents can reduce token costs by 70–90%.

### Unit Economics for AI

Establish these unit economics for each AI use case:

| Metric | Description | Example |
|---|---|---|
| Cost per AI interaction | Total AI cost ÷ number of interactions | $0.08 per customer chat turn |
| Cost per AI decision | Total AI cost ÷ number of automated decisions | $0.002 per fraud screening |
| Cost per document processed | Total AI cost ÷ number of documents | $0.45 per contract analyzed |
| AI cost as % of transaction value | AI cost ÷ value of underlying transaction | 0.3% of loan value screened |

These metrics allow the business to evaluate AI economics in terms they understand and to make rational scaling decisions.

---

## Responsible AI as an Investment Requirement

### Why Responsible AI Is Not Optional

Responsible AI (RAI) is not a nice-to-have or a PR exercise. It is a hard requirement driven by three forces:

**Regulatory pressure**: The EU AI Act, US Executive Order on AI, and sector-specific regulations (FINRA, HIPAA, GDPR) impose obligations on organizations deploying AI. Non-compliance carries financial penalties and operating restrictions.

**Reputational risk**: AI systems that exhibit bias, generate harmful content, or make unexplainable decisions create reputational damage that can far exceed the value the AI system delivered. Several high-profile cases of biased AI in hiring, lending, and healthcare have caused lasting brand damage.

**Operational risk**: AI systems that hallucinate, fail silently, or make errors at scale create operational risk that traditional software does not. A model that gives incorrect medical dosage information at scale is a catastrophic operational failure.

### Investment Required for RAI

| RAI Investment Area | What It Includes | Indicative Cost |
|---|---|---|
| Tooling | Bias detection tools, explainability frameworks, audit logging | $50K–$200K per year |
| Governance | RAI policy development, risk classification framework, review process | $100K–$300K per year (people cost) |
| Training | RAI training for all AI practitioners and executives | $20K–$100K per year |
| Red-teaming | Adversarial testing of AI systems before deployment | $30K–$100K per use case |
| Monitoring | Ongoing bias and safety monitoring in production | Included in observability platform |

### Including RAI Costs in AI Investment Proposals

Every AI investment proposal must include a Responsible AI cost line. A credible rule of thumb: budget 10–15% of total AI development cost for RAI activities. Omitting this cost creates two problems: the organization is unprepared to govern the AI it deploys, and the investment appears cheaper than it actually is.

!!! warning "The RAI Cost Credibility Signal"
    An AI investment proposal that includes explicit RAI costs signals to reviewers that the team has thought seriously about deployment risk. Proposals that omit RAI costs are a warning sign of an under-prepared team.

---

## Templates

### Template 1: AI Investment Proposal Scorecard

Use this scorecard to evaluate and compare AI investment proposals.

| Criterion | Weight | Score (1–5) | Weighted Score |
|---|---|---|---|
| Strategic alignment | 20% | | |
| Business impact (quantified) | 20% | | |
| Technical feasibility | 15% | | |
| Data readiness | 15% | | |
| Risk level | 10% | | |
| Time to value | 10% | | |
| Responsible AI readiness | 10% | | |
| **Total** | **100%** | | |

**Scoring guide**: 5 = Excellent, 4 = Good, 3 = Adequate, 2 = Weak, 1 = Inadequate.

Proposals scoring below 3.0 weighted average should be deferred or restructured before approval.

---

### Template 2: AI Maturity Assessment

Rate each dimension 0–5 using the level descriptions above. Capture evidence for each rating.

| Dimension | Current Level (0–5) | Evidence | Target Level (12-month) | Gap Actions |
|---|---|---|---|---|
| Governance | | | | |
| Infrastructure / Platform | | | | |
| Talent and Skills | | | | |
| Use Case Portfolio | | | | |
| Data Readiness | | | | |
| Responsible AI | | | | |
| FinOps | | | | |
| Operating Model | | | | |
| **Average** | | | | |

---

### Template 3: AI CoE Charter

```
AI CENTER OF EXCELLENCE — CHARTER

Organization:         [Company Name]
Effective Date:       [Date]
Executive Sponsor:    [Name, Title]
CoE Director:         [Name]

MISSION
[One sentence: what the CoE exists to do]

SCOPE
In scope:  [List]
Out scope: [List]

SERVICES OFFERED
1. [Service name] — [Brief description]
2. [Service name] — [Brief description]
[...]

FUNDING MODEL
[How is the CoE funded? Central budget? Chargeback? Hybrid?]

GOVERNANCE
Reporting line:       [To whom does the CoE Director report?]
Intake process:       [How do teams request CoE support?]
Decision authority:   [What decisions does the CoE make vs. recommend?]

SUCCESS METRICS
1. [Metric] — [Target]
2. [Metric] — [Target]
[...]

REVIEW CYCLE
[How often is the charter reviewed and updated?]
```

---

### Template 4: AI Platform vs. Project Decision Matrix

Answer each question Yes or No. Count Yes answers.

| Question | Yes / No |
|---|---|
| Will more than 5 teams need AI capabilities in the next 18 months? | |
| Are there cross-cutting AI needs (e.g., entity extraction, translation) shared by multiple teams? | |
| Does the organization have (or plan to hire) a dedicated platform engineering team? | |
| Is there executive appetite for a multi-year platform investment? | |
| Does the organization have a governance need that benefits from centralization? | |
| Will there be 10+ AI use cases in the next 3 years? | |

**Decision guide**:
- 5–6 Yes: Platform investment strongly recommended.
- 3–4 Yes: Platform investment likely worthwhile; run break-even analysis.
- 1–2 Yes: Start with project investment; design for future platform evolution.
- 0 Yes: Project investment appropriate for now.

---

## Five Teaching Lenses for AI Investment Strategy

These five lenses give you different vantage points on any AI investment decision. Use them when preparing for executive presentations or architecture reviews.

**Lens 1: The Economist's Lens**

View every AI investment as an economic decision with trade-offs. Ask: what is the opportunity cost of this investment? What else could we do with this capital? At what number of use cases does platform investment become more efficient than project investment?

**Lens 2: The Risk Manager's Lens**

View every AI investment through the lens of risk. Ask: what is the risk of deploying this AI? What is the risk of not deploying it? What is the risk that this investment creates new liabilities (regulatory, reputational, operational)?

**Lens 3: The Organizational Designer's Lens**

View every AI investment as an organizational design decision. Ask: which operating model enables this AI capability sustainably? Who owns it? Who maintains it? How does it interact with the existing organizational structure?

**Lens 4: The Portfolio Manager's Lens**

View all AI investments as a portfolio. Ask: does our AI investment portfolio have the right balance of short-term wins and long-term platform bets? Are we over-indexed on pilots that never reach production? Are we under-investing in shared capabilities?

**Lens 5: The Customer's Lens**

View every AI investment from the perspective of the end user (customer or employee). Ask: does this AI investment make life materially better for the person using it? Is the improvement large enough to change behavior? Would they notice if we removed the AI?

---

## Common Mistakes in AI Investment Strategy

1. **Funding pilots without a path to production.** Every pilot budget should include a production budget envelope, or the pilot should not be funded.

2. **Ignoring the data layer.** "We'll use GPT" is not an AI strategy. Data readiness is the most common reason AI projects fail to deliver value.

3. **Underestimating change management.** AI changes how people work. Change management cost should be 20–30% of AI project budgets, not an afterthought.

4. **Evaluating AI on technical metrics only.** A model that achieves 95% accuracy on a test set but does not change a business outcome has delivered zero value.

5. **Building when you should buy.** Most organizations should buy AI platform capabilities and focus their engineering energy on AI applications, not AI infrastructure.

6. **Skipping Responsible AI investment.** Organizations that ship AI without RAI controls create liabilities that far exceed the cost of implementing governance upfront.

7. **Centralizing too much, too long.** A centralized AI team that doesn't actively push capability to business units becomes a permanent bottleneck.

8. **Confusing AI activity with AI value.** Tracking the number of AI pilots, the number of models deployed, or the number of AI engineers hired is not a measure of AI business value.

---

## Mastery Checklist

You have mastered this module when you can:

- [ ] Explain in 60 seconds why AI is structurally different from previous technology waves
- [ ] Describe the six levels of the AI maturity model and assess an organization's current level
- [ ] Articulate the root causes of pilot purgatory and recommend interventions
- [ ] Compare GenAI and Agentic AI investment profiles for an executive audience
- [ ] Distinguish AI Features, AI Products, and Shared AI Capabilities with clear investment model implications for each
- [ ] Run a break-even analysis on platform vs. project investment for AI
- [ ] Recommend an AI operating model for a given organization's context and justify the recommendation
- [ ] Draft a two-page AI CoE charter with mission, scope, services, and funding model
- [ ] Describe the components of an enterprise AI platform and identify which to buy vs. build
- [ ] Calculate unit economics for an AI use case (cost per interaction, cost per decision)
- [ ] Include Responsible AI costs in an AI investment proposal and justify their inclusion
- [ ] Apply all five teaching lenses to a real AI investment decision

---

!!! info "Next Module"
    Module 6 covers Business Case Development — how to translate AI investment strategy into a structured, boardroom-ready business case that gets approved.
