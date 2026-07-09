---
title: "Enterprise AI Architect — Skills Assessment"
---

# Enterprise AI Architect — Skills Assessment

**Audience:** Architects assessing their AI readiness, teams hiring or developing EA-AI capability, practitioners preparing for the CCA-F certification.

**Purpose:** A structured competency model, self-assessment tool, and learning path for Enterprise AI Architects — paired with 20 scenario-based interview/review questions that test real EA judgment.

**What this does NOT duplicate:**
- Governance policy details → [Governance & Compliance](enterprise-ai-governance-compliance.md)
- Architecture pattern implementations → [Architecture Patterns](enterprise-ai-architecture-patterns.md)
- Claude model pricing and selection → [Models 2026](../claude/claude-models-2026.md)
- CCA-F exam question practice → [CCA-F Exam Prep](../claude/ccaf-exam-prep-complete.md)

---

## 1. Overview

This assessment serves three purposes:

1. **Individual self-assessment** — benchmark your current AI architecture capability against the competency model, identify gaps, and select your learning path.
2. **Team capability planning** — map collective skills, spot coverage gaps, and plan targeted skill investments.
3. **CCA-F alignment** — every domain in the competency model maps to one or more CCA-F exam domains, so preparation for this assessment is preparation for the exam.

### Who Should Use This

| Role | How to use this assessment |
|------|---------------------------|
| **Aspiring EA-AI** | Complete self-assessment, identify gaps, follow beginner or intermediate path |
| **Practicing EA-AI** | Use scenario questions as mock architecture review or interview prep |
| **Engineering manager** | Use competency table to define hiring criteria and growth plans |
| **Architect reviewing AI adoption** | Use the 30-point architecture review checklist for project evaluations |
| **Certification candidate** | Use CCA-F mapping to prioritise study effort |

---

## 2. Enterprise AI Architect Certifications (2026)

### 2026 Certification Landscape

The EA-AI certification landscape expanded significantly in 2026. Three credentials now cover the core of the role; a fourth (Google) is emerging. Choose based on your primary platform and role focus:

| Certification | Issuer | Cost | Focus | Status |
|---|---|---|---|---|
| **CCA-F** — Claude Certified Architect, Foundations | Anthropic (via Pearson VUE) | $99 | Agentic architecture, MCP/tool design, prompt engineering, context management; Claude-centric | GA since Mar 12, 2026 |
| **AB-100** — Agentic AI Business Solutions Architect | Microsoft (via Microsoft Learn) | $165 | Multi-agent orchestration, Copilot Studio, Microsoft Foundry, MCP, A2A, enterprise deployment; Microsoft-centric | GA; updated July 22, 2026 |
| **AWS Certified AI Practitioner** | AWS | $150 | Foundational AI/ML on AWS, Bedrock, responsible AI; broad coverage, less architect-depth | GA; updated 2025 |
| **Professional Cloud Architect + GenAI** | Google Cloud | $200 | GCP infrastructure + Vertex AI; no agentic-specific cert as of July 2026 | Track: Professional Cloud Architect |

**For enterprise AI architects: CCA-F + AB-100 is the recommended combination.** CCA-F validates agentic design judgment independent of platform; AB-100 validates the Microsoft-specific stack that dominates enterprise deployments (Copilot Studio, Foundry, Entra Agent ID). Together they cover ~80% of what enterprise clients will ask for in RFPs and vendor assessments.

### AB-100 — Agentic AI Business Solutions Architect

The **AB-100** ([Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/)) is Microsoft's flagship architect credential for the agentic era, updated July 22, 2026:

| Item | Detail |
|------|--------|
| Full name | Microsoft Certified: Agentic AI Business Solutions Architect |
| Exam code | AB-100 |
| Cost | $165 USD |
| Format | Online proctored; scenario-based |
| Prerequisite | None (but assumes familiarity with Azure and M365) |
| Study guide | [Microsoft Learn study guide — AB-100](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-100) |

**AB-100 domains** (July 2026 update):

| Domain | Coverage |
|---|---|
| Agent design principles | Bounded autonomy, decision-rights, HITL gates |
| Copilot Studio & Foundry | Agent creation, MCP server integration, publishing |
| Multi-agent orchestration | A2A v1.0, agent-to-agent delegation, registry patterns |
| Enterprise governance | Entra Agent ID, audit logging, compliance controls |
| Responsible AI | Microsoft RAI framework, content filters, transparency |

### CCA-F Certification for Enterprise Architects

### Why CCA-F Matters for EA Practitioners

The **Claude Certified Architect, Foundations (CCA-F)** exam — launched 12 March 2026 via Pearson VUE — is the first vendor-neutral certification specifically targeting practitioners who design and operate AI systems using Claude. For Enterprise AI Architects, it validates a precise set of skills that sit at the intersection of agentic design, tool orchestration, prompt engineering, and context reliability.

Unlike generic cloud certifications, CCA-F tests architecture judgment: the ability to select the right orchestration pattern, design safe tool interfaces, manage context windows under real production constraints, and evaluate model outputs systematically. These are exactly the decisions EA-AIs make daily.

For EA practitioners already working with Claude, CCA-F provides external credibility with clients, procurement stakeholders, and regulators who increasingly expect evidence of structured AI competency — not just engineering experience.

### Exam Facts at a Glance

| Item | Detail |
|------|--------|
| Full name | Claude Certified Architect, Foundations |
| Launched | 12 March 2026 |
| Platform | Pearson VUE (online proctored) |
| Questions | 60 scenario-based multiple choice |
| Duration | 120 minutes |
| Passing score | 720 / 1000 |
| Cost | $99 USD |
| Cost (Partner Network) | Free for first 5,000 qualifying partner employees |
| Validity | 2 years |
| Prerequisite | None |

### CCA-F Domain Mapping to EA Responsibilities

| CCA-F Domain | Weight | Questions | EA Responsibility It Validates |
|-------------|--------|-----------|-------------------------------|
| D1: Agentic Architecture & Orchestration | 27% | ~16 | Multi-agent topology design, orchestrator vs. subagent patterns, delegation and error handling |
| D2: Tool Design & MCP Integration | 18% | ~11 | MCP server design, tool interface contracts, security boundaries, 10,000+ public MCP server ecosystem (~110M monthly SDK downloads; governed by the Linux Foundation's Agentic AI Foundation since Dec 2025) |
| D3: Claude Code Configuration & Workflows | 20% | ~12 | Developer toolchain governance, CI/CD integration, hooks and automations |
| D4: Prompt Engineering & Structured Output | 20% | ~12 | Prompt standards, output schemas, evaluation harness design, regression testing |
| D5: Context Management & Reliability | 15% | ~9 | Token budget governance, context window design, reliability patterns, cost optimisation |

:::tip EA exam strategy
    EA-AIs typically find D1 and D5 most challenging because they require architectural synthesis, not just feature recall. D2 and D4 reward practitioners who have shipped production systems. Prioritise D1 depth first — it carries the highest weight and tests the most complex judgment calls.

### Registration

1. Register via [Pearson VUE](https://home.pearsonvue.com/) — search for "Anthropic" or "Claude Certified Architect"
2. If your organisation is a Claude Partner Network member, check eligibility for the free first-5,000 voucher before paying
3. Full preparation: [CCA-F Exam Prep — Complete Guide](../claude/ccaf-exam-prep-complete.md)

---

## 3. Enterprise AI Architect Competency Model

Each competency area has three levels:

- **Awareness** — Understands the concept; can have an informed conversation; cannot design or build without assistance
- **Practitioner** — Can design and implement independently; has done it in real projects; can review others' work
- **Expert** — Leads architectural decisions; defines standards; mentors others; handles edge cases and failure modes

### 3.1 Technical Competencies

| Competency Area | Awareness | Practitioner | Expert |
|----------------|-----------|--------------|--------|
| **LLM APIs & SDKs** | Understands request/response model; knows what a system prompt is | Builds production integrations; handles streaming, errors, retries | Designs multi-provider abstraction layers; owns token/cost strategy; tunes retry policies |
| **Agent Patterns** | Knows what an agent is; understands tool use conceptually | Implements sequential, fan-out, and DAG patterns; handles tool errors | Designs multi-agent topologies; makes orchestration vs. chaining vs. routing decisions at system level |
| **MCP** | Knows MCP exists; understands the tool/resource/prompt distinction | Builds and registers MCP servers; configures auth; uses public registry | Designs MCP server architecture for enterprise; governs a catalogue of 10+ internal servers; designs stateless vs. stateful MCP strategy |
| **RAG & Vector Databases** | Understands retrieval-augmented generation; knows what a vector store is | Builds production RAG pipelines; selects chunking and embedding strategies; evaluates faithfulness | Designs multi-stage retrieval; handles corpus scale, staleness, and citation accuracy; architects hybrid search |
| **Prompt Engineering** | Writes basic prompts; understands role of system prompts | Applies chain-of-thought, few-shot, structured output, and constitutional techniques | Runs prompt regression suites; designs prompt templates at enterprise scale; optimises for cost and accuracy simultaneously |
| **Token Economics** | Knows tokens = cost; understands context windows | Estimates token budgets; implements caching; manages context stuffing | Designs cost allocation frameworks; implements per-feature token budgets; builds cost dashboards; governs batch vs. real-time trade-offs |
| **Evaluation Harness** | Knows evals exist; has heard of LLM-as-a-judge | Builds offline eval datasets; implements basic LLM-as-a-judge pipelines; tracks metric baselines | Designs 3-layer eval frameworks (output, trajectory, business); integrates evals into CI/CD; defines acceptance thresholds with governance teams |
| **Observability** | Understands the need for logging; knows what OTel is | Instruments agents with OTel traces; ships to a backend; reads traces | Designs AI observability architecture; owns eval-to-trace integration; builds governance dashboards on top of trace data |

### 3.2 Architecture Competencies

| Competency Area | Awareness | Practitioner | Expert |
|----------------|-----------|--------------|--------|
| **System Design** | Understands component diagrams; can read an architecture document | Designs AI-augmented systems end-to-end; makes make-vs-buy decisions; documents ADRs | Designs for scale, resilience, and cost simultaneously; leads architecture review boards; defines reference architectures |
| **Integration Patterns** | Knows REST and event-driven patterns exist | Integrates AI APIs into enterprise systems; handles async flows; manages API versioning | Designs AI gateway layer; governs API contract changes; handles backward compatibility at org scale |
| **Security Architecture** | Knows AI has security risks; understands prompt injection conceptually | Implements input/output filtering; designs secret management; applies least-privilege to tool access | Designs enterprise AI security model; conducts threat modelling; governs tool permission matrices; responds to prompt injection incidents |
| **Data Architecture** | Understands that AI needs data; knows what RAG is | Designs data pipelines for RAG; handles PII masking; implements data classification | Designs AI data governance at enterprise scale; owns data lineage for AI inputs; architects multi-tenant data isolation |
| **Cloud Platforms** | Has used one cloud provider; knows Claude is on Bedrock/Vertex/Azure | Deploys Claude on at least one cloud platform; configures VPC endpoints and IAM; estimates cloud costs | Designs multi-cloud AI strategy; makes platform selection decisions; governs cross-cloud cost and compliance |

### 3.3 Governance Competencies

| Competency Area | Awareness | Practitioner | Expert |
|----------------|-----------|--------------|--------|
| **AI Policy** | Knows AI governance policies exist; has read their company's AI policy | Implements policy controls in AI systems; documents policy compliance; participates in policy reviews | Drafts and owns AI governance policies; leads policy review cycle; bridges technical and legal language |
| **Compliance** | Knows EU AI Act, GDPR, HIPAA names; understands high-risk classification exists | Maps specific AI systems to applicable regulations; identifies gaps; prepares compliance artefacts | Leads regulatory compliance programmes for AI; interprets new regulations for technical teams; manages regulatory relationship |
| **Risk Management** | Understands risk registers exist; can name AI risk categories | Maintains AI risk register; rates and tracks risks; escalates appropriately | Designs enterprise AI risk framework; owns risk appetite decisions; governs risk across portfolio of AI systems |
| **Vendor Management** | Knows the org uses AI vendors; understands DPA concept | Completes vendor assessments; reviews SLAs; monitors vendor compliance commitments | Owns AI vendor strategy; negotiates contracts; manages multi-vendor risk; governs vendor substitution plans |

### 3.4 Leadership Competencies

| Competency Area | Awareness | Practitioner | Expert |
|----------------|-----------|--------------|--------|
| **Stakeholder Management** | Can present to technical peers; understands different stakeholders exist | Presents AI proposals to non-technical executives; manages competing stakeholder interests; builds consensus | Drives board-level AI investment decisions; manages C-suite relationships; translates AI risk into business language |
| **Change Management** | Understands change management exists; has participated in change programmes | Leads AI adoption initiatives; designs developer enablement programmes; manages resistance | Leads enterprise AI transformation; redesigns operating models; manages cultural change at scale |
| **AI Strategy** | Has read about AI strategy; understands the concept of an AI roadmap | Develops team-level AI roadmaps; prioritises AI investments within a domain | Develops enterprise AI strategy; aligns AI capability to business objectives; presents to board; governs strategy execution |

---

## 4. Self-Assessment Checklist

Answer Yes (1) or No (0) for each item. Score yourself at the end.

### Domain A: Technical Foundations (Questions 1–5)

| # | Question | Y/N |
|---|----------|-----|
| 1 | I can explain token pricing for at least two current Claude models and calculate a monthly cost estimate for a given workload | |
| 2 | I have built at least one production or near-production AI integration using a real LLM API (not just a UI wrapper) | |
| 3 | I can explain what an MCP server is, what resources/tools/prompts it exposes, and when you would build one vs. use an existing one | |
| 4 | I have designed or reviewed a RAG pipeline and can explain chunking, embedding, retrieval, and faithfulness evaluation | |
| 5 | I can implement prompt caching and explain when it saves money vs. increases cost | |

### Domain B: Agent Architecture (Questions 6–10)

| # | Question | Y/N |
|---|----------|-----|
| 6 | I can draw a multi-agent architecture diagram for a real use case and explain why I chose that topology over alternatives | |
| 7 | I understand the difference between an orchestrator agent and a subagent and can explain how error handling differs between them | |
| 8 | I can explain what HITL is, give three examples of action categories that should require human approval, and describe how to implement a HITL gate in an agent workflow | |
| 9 | I have designed or reviewed an evaluation harness for an AI agent (not just tested it manually) | |
| 10 | I know what "context window pressure" is and can describe at least two techniques to manage it in a long-running agent | |

### Domain C: Governance & Compliance (Questions 11–15)

| # | Question | Y/N |
|---|----------|-----|
| 11 | I can classify an AI system under the EU AI Act high-risk categories and explain what compliance obligations follow | |
| 12 | I have contributed to or reviewed an AI governance policy document (not just read one) | |
| 13 | I can explain the NIST AI RMF's four core functions (Govern, Map, Measure, Manage) and give one concrete action under each | |
| 14 | I can describe what ISO 42001 requires for an AI management system and how it relates to ISO 27001 | |
| 15 | I know what a Data Processing Agreement (DPA) is, why AI vendors require one, and what to check before signing | |

### Domain D: Enterprise Architecture Skills (Questions 16–20)

| # | Question | Y/N |
|---|----------|-----|
| 16 | I can make a build-vs-buy-vs-configure decision for an AI capability with a structured decision framework | |
| 17 | I have presented an AI architecture proposal to senior stakeholders and addressed questions about cost, risk, and business value | |
| 18 | I can design an AI observability stack (what to instrument, where to ship data, what dashboards to build) for a production agent system | |
| 19 | I know what prompt injection is, can explain how it differs from traditional injection attacks, and can describe three mitigation strategies | |
| 20 | I have conducted or participated in an AI architecture review using a structured checklist or framework | |

### Scoring

| Score | Level | Interpretation |
|-------|-------|---------------|
| 0–8 | Beginner | Strong foundation in adjacent skills; focus first on the technical competency areas (Domains A and B) |
| 9–14 | Practitioner | Working knowledge across most areas; deepen governance competencies and target scenario-based practice |
| 15–20 | Expert | Broad EA-AI mastery; focus on leadership competencies and edge-case scenario depth |

---

## 5. Learning Path

### Beginner Path (0–6 Months)

Goal: Build the technical foundation and design first working AI systems.

**Months 1–2: Foundations**

- Read [Enterprise AI Architect — Foundations](enterprise-ai-architect-foundations.md) in full — this is your landscape map
- Complete [Models 2026](../claude/claude-models-2026.md) — understand model selection, pricing tiers, and capability differences
- Build a simple LLM integration from scratch using the Anthropic API: no framework, just direct API calls with retry logic
- Read the [Prompt Engineering guide](../claude/prompt-engineering-claude-4.md) and implement three different prompting techniques on a real problem

**Months 3–4: Agents and Tools**

- Read [MCP Deep Guide](../claude/mcp-deep-guide.md) — understand the protocol, build a simple MCP server
- Read [Agent SDK Production](../claude/claude-agent-sdk-production.md) — implement a two-agent workflow
- Study D1 and D2 of the [CCA-F Exam Prep guide](../claude/ccaf-exam-prep-complete.md)
- Build a small RAG pipeline: ingest a document corpus, embed, store in a vector DB, retrieve, and evaluate faithfulness

**Months 5–6: First Systems**

- Read [Architecture Patterns](enterprise-ai-architecture-patterns.md) — sections 1–8 cover the patterns you'll encounter most
- Design (on paper) an end-to-end AI system for a real problem in your organisation
- Study D4 and D5 of [CCA-F Exam Prep](../claude/ccaf-exam-prep-complete.md) and sit a mock exam
- Register for CCA-F if you score 70%+ on mock questions

### Intermediate Path (6–12 Months)

Goal: Ship production-grade AI systems with proper observability and governance.

**Months 7–8: Production Engineering**

- Study [Claude Enterprise 2026](../claude/claude-enterprise-2026.md) — multi-cloud deployment, Bedrock/Vertex/Azure
- Implement a 3-layer evaluation harness (see Section 6: Evaluation Harness Design below)
- Add OTel instrumentation to an existing agent and ship traces to an observability backend
- Run your first load test on an AI endpoint and document the latency/cost profile

**Months 9–10: Governance**

- Read [Enterprise AI Governance & Compliance](enterprise-ai-governance-compliance.md) in full
- Map a real AI system you own to EU AI Act risk categories and identify compliance gaps
- Draft an AI governance policy for your team using the NIST AI RMF structure
- Review [Constitutional AI & Safety](../claude/constitutional-ai-safety-2026.md) for harm taxonomy and four-tier priority model

**Months 11–12: Multi-Agent at Scale**

- Read [Multi-Agent Orchestration](../claude/ruflo-agentic-ai-guide.md) — study framework comparison, evaluation framework, and guardrail patterns
- Design and implement a multi-agent workflow with HITL gates
- Present your AI system design to a senior stakeholder and incorporate their feedback
- Build your first cost governance dashboard with per-feature token attribution

### Expert Path (12+ Months)

Goal: Lead AI architecture at organisational scale; define standards; govern a portfolio.

- Define a reference architecture for your organisation's primary AI pattern (agent, RAG, hybrid)
- Build and run an Architecture Review Board process for AI systems — use the 30-point checklist below
- Draft your organisation's AI vendor assessment framework and evaluate two vendors against it
- Contribute to or lead an EU AI Act compliance programme for a high-risk system
- Develop an enterprise AI strategy document and present it to C-suite
- Mentor two junior practitioners through the Beginner or Intermediate path above
- Sit CCA-F and pursue any available advanced certifications

---

## 6. Key Concepts an Enterprise AI Architect Must Master

### 6.1 Token Economics and Cost Modelling

Token economics is the discipline of translating AI API usage into predictable, controllable cost. Unlike compute instances with fixed hourly prices, LLM costs are proportional to both input and output token volumes — and both are driven by architectural decisions. A RAG pipeline that stuffs 40,000 tokens of context per query costs 20x more per call than one that retrieves 2,000 tokens of relevant context. Architects must own a token budget at the feature level, track actuals vs. budget in production, and make deliberate trade-offs between context richness and cost. Prompt caching, batching, model routing (use Haiku for simple classification, Sonnet for reasoning, Fable for complex multi-step), and output length controls are the primary levers. For pricing details by model, see [Models 2026](../claude/claude-models-2026.md).

### 6.2 Evaluation Harness Design

An evaluation harness is the automated system that continuously measures whether an AI system performs as intended. A well-designed harness operates across three layers: output quality (is this response correct, relevant, and safe?), trajectory quality (did the agent use the right tools in the right order?), and business alignment (did the system achieve the goal at acceptable cost and latency?). The harness must run on every code change that touches agents, prompts, or tools — integrated into CI/CD as a deployment gate. LLM-as-a-judge scales quality assessment beyond what human reviewers can handle. Maintaining a baseline dataset that accumulates production failures prevents regression from going undetected. See [Architecture Patterns](enterprise-ai-architecture-patterns.md) for the LLM-as-judge harness pattern.

### 6.3 Guardrail Architecture

Guardrails are the technical controls that prevent AI systems from producing harmful, unsafe, or policy-violating outputs. They operate at two boundaries: input (what enters the model's context) and output (what leaves the system and reaches users or downstream tools). Input guardrails filter prompt injection attempts, PII, and adversarial content. Output guardrails detect hallucinations, safety violations, confidential data leakage, and format non-compliance. The design question is where guardrails run: as a pre/post-call wrapper in application code, as a dedicated guardrail service on the API path, or as a cloud-native service (e.g., Amazon Bedrock Guardrails). Each has different latency, cost, and coverage trade-offs. See [Governance & Compliance](enterprise-ai-governance-compliance.md) for policy-as-code patterns.

### 6.4 Governance Framework Selection

Three frameworks dominate enterprise AI governance: EU AI Act (legally binding in the EU, risk-tiered, extraterritorial reach), NIST AI RMF (voluntary, process-oriented, widely adopted in the US), and ISO 42001 (certifiable management system standard, global). These are complementary, not competing: NIST AI RMF maps well to ISO 42001 clauses; EU AI Act compliance generates the artefacts that ISO 42001 audits expect. Most enterprise architects end up implementing all three in parallel. The key EA decision is which framework drives the primary governance operating model — typically the one with the highest regulatory exposure for the organisation — with the others layered on top. See [Governance & Compliance](enterprise-ai-governance-compliance.md) for detailed framework breakdowns.

### 6.5 RAG System Design

Retrieval-Augmented Generation solves the knowledge currency problem for LLMs: foundation models have training cutoffs, but enterprise knowledge is always-changing. A production RAG system has five design dimensions: ingestion (how data enters the corpus and stays current), chunking (how documents are split for retrieval — fixed-size, semantic, hierarchical), embedding (which model, updated when models change), retrieval (dense vector, sparse keyword, or hybrid), and faithfulness evaluation (did the model actually use the retrieved context, or hallucinate over it?). The most common EA failure is underestimating corpus maintenance cost — embeddings must be re-indexed when source documents change, the embedding model is upgraded, or the chunking strategy changes. See [Architecture Patterns](enterprise-ai-architecture-patterns.md) for the RAG and Agentic RAG patterns.

### 6.6 Multi-Agent Orchestration at Scale

Multi-agent systems decompose complex tasks across specialised agents running in parallel or sequence. The EA-level decision is topology: hierarchical (orchestrator delegates to workers — predictable, auditable, good for complex coding and research), peer-to-peer (agents share a memory pool — higher coordination complexity, better for consensus tasks), or pipeline (sequential stages — simplest to reason about, lowest overhead). At enterprise scale, the additional concerns are agent failure isolation (one agent failing should not cascade), shared memory contention (agents writing to the same state simultaneously), token budget management per agent, and governance visibility (can you trace which agent made which decision?). See [Multi-Agent Orchestration](../claude/ruflo-agentic-ai-guide.md) for framework options and patterns.

### 6.7 HITL Integration Patterns

Human-in-the-Loop is not a single pattern — it is a spectrum from full human oversight to near-full automation, with specific decision points for when humans must be consulted. The EA decision is which action categories require human approval before proceeding, which require human review after the fact, and which can run fully autonomously. Irreversible actions (production deployments, financial transactions, data deletion), high-impact decisions (contract approvals, customer-facing communications), and edge cases that fall outside the model's confidence should trigger human gates. Technical implementation options include async approval queues, synchronous blocking gates with timeout handling, and supervisor loops that monitor agent outputs and escalate anomalies. The HITL design must specify what happens when a human does not respond within the timeout window.

### 6.8 AI Vendor Management

AI vendor relationships carry specific risks that traditional software vendor management frameworks do not fully address: model behaviour changes between versions, training data opacity, subprocessor chains for data sent to model APIs, and the speed at which vendor capabilities change relative to contract cycles. The EA must establish a vendor assessment process that covers model cards and safety evaluations, DPA terms for data sent to model APIs, subprocessors and data residency, SLA and uptime commitments, version change notification and backward compatibility guarantees, and viable substitution options if the vendor relationship ends. Single-vendor dependency on a foundation model provider is a key enterprise risk — design for model portability from the beginning, even if you start with a single provider. See [Governance & Compliance](enterprise-ai-governance-compliance.md) for the vendor assessment checklist.

---

## 7. EA-Level Scenario Questions

These 20 scenarios reflect real architecture review, consulting, and incident situations. Each has a model answer (3–5 sentences). Use them for interview prep, architecture review practice, or CCA-F scenario practice.

---

**Scenario 1: Data Exfiltration via LLM**

*The CISO raises a concern: "If our customer data is in the LLM context window, what prevents it from being exfiltrated — either by a malicious prompt or by the API provider?" How do you respond architecturally?*

**Model answer:** You address three distinct attack surfaces. First, for prompt injection, implement strict input sanitisation at the API gateway layer and use a dedicated guardrail service to detect and block attempts to override system instructions. Second, for internal threats, apply data minimisation by ensuring only necessary data enters the context window — use field-level masking for sensitive identifiers before they hit the prompt. Third, for provider-side risk, reference the DPA and data processing terms with your provider (Anthropic, AWS, Google, Microsoft) which contractually govern how prompt content is handled; ensure you are on an enterprise agreement with no-training commitments on your data. Supplement with output scanning to detect if sensitive data appears in responses bound for external destinations, and implement OTel-based audit logging so every prompt/completion pair is traceable.

---

**Scenario 2: EU Financial Institution Compliance**

*A tier-1 bank in Germany wants to deploy Claude for internal credit memo summarisation and external customer query responses. Walk through the compliance architecture.*

**Model answer:** Start by risk-classifying each use case under the EU AI Act: credit memo summarisation that influences lending decisions is likely high-risk under Annex III (creditworthiness assessment); customer query responses may be lower-risk but require transparency obligations if the customer may not know they are interacting with AI. High-risk requirements include conformity assessment, technical documentation, human oversight, accuracy and robustness testing, and registration in the EU database before deployment. Data residency must be confirmed — EU data must remain in EU-hosted infrastructure; use AWS Frankfurt or Azure Germany North via Microsoft Foundry (formerly Azure AI Foundry) with EU Data Boundary enabled. Apply DORA (Digital Operational Resilience Act) requirements: the AI system is an ICT third-party dependency, so the bank must have exit plans, concentration risk assessment, and contractual DORA provisions with Anthropic or the cloud intermediary. Implement HITL gates for any credit decision that is materially influenced by the AI output.

---

**Scenario 3: Business Unit Wants Copilot Enterprise**

*A business unit head wants to roll out GitHub Copilot Enterprise to 200 developers immediately. What governance policies must you have in place before approving?*

**Model answer:** Before approval, establish four governance controls. First, a code-in-context policy: define what repositories and data Copilot indexes for the knowledge base — confirm no confidential IP, client data, or regulated data is included in the indexed corpus. Second, a data residency and DPA review: GitHub Copilot Enterprise processes code in Microsoft Azure; confirm the enterprise agreement excludes prompt data from model training and aligns with your jurisdiction's data protection requirements. Third, a licence compliance policy: Copilot can suggest code that matches training data, including potentially licenced code — implement the optional filter for public code suggestions and define your organisation's acceptable use policy for AI-suggested code. Fourth, a measurement baseline: define what success looks like before rollout (developer productivity metrics, code review cycle time, test coverage) so you can evaluate ROI. Require pilot governance with a defined cohort before the full 200-seat rollout.

---

**Scenario 4: Board AI ROI Framework**

*The board asks: "We've invested $2M in AI tooling this year. What's the return?" How do you build the measurement framework?*

**Model answer:** ROI for AI investment requires a three-layer measurement model. Layer 1 (efficiency) captures direct productivity gains: developer cycle time reduction, ticket resolution time, document processing throughput — measure before-and-after with control groups. Layer 2 (quality) captures defect reduction, error rates in AI-assisted tasks, and rework rates — AI-assisted code reviews or document drafts should produce measurably fewer post-delivery corrections. Layer 3 (strategic value) captures outcomes that were not previously possible at all: new product features enabled by AI, faster market entry, risks avoided through AI-assisted compliance checking. Attribution is the hardest problem — use a combination of telemetry (token spend correlated to task completion rates) and periodic surveys. Present the board with a simple unit economics view: cost per AI-assisted task, business outcome per cohort, and forward trajectory as adoption scales.

---

**Scenario 5: Production Agent Hallucination Incident**

*A production agent that summarises financial reports starts producing summaries with invented figures. Users have already received 50 incorrect summaries before it was caught. What is your incident response process?*

**Model answer:** Execute in four phases. Containment (immediate): disable the agent or route traffic to a fallback; notify all users who received affected summaries; preserve logs of all affected completions for investigation. Investigation: retrieve OTel traces for the affected period; identify what changed — model version, prompt, retrieval corpus, or input data format; determine whether the hallucinations are consistent (same incorrect pattern) or random. Root cause: a likely cause is retrieval failure — the RAG corpus returned no relevant context, and the model hallucinated plausible-sounding figures rather than refusing to answer. Fix: add explicit instructions to cite sources and refuse when no relevant context is retrieved; add a faithfulness guardrail that blocks responses with factual claims not grounded in retrieved context. Post-incident: run the fix through your offline eval harness against the cases that failed, add them to the regression dataset, and implement a faithfulness metric in your production monitoring before reactivating.

---

**Scenario 6: EU AI Act High-Risk Classification**

*Legal has reviewed your AI system that helps HR rank job applicants and flagged it as likely high-risk under the EU AI Act. What are the next steps?*

**Model answer:** A recruitment ranking system falls squarely in Annex III, category 4 (employment and workers management), making it high-risk by definition. Required actions before continuing operation: conduct a full conformity assessment covering technical documentation, data governance for training and inference data, human oversight mechanism (no hiring decision can be made solely on the AI's ranking), accuracy and bias testing across protected characteristics, and logging of every AI output for the legal minimum retention period. Register the system in the EU AI Act database. Appoint a responsible person accountable for compliance. Implement a mandatory human review gate — the ranking is advisory only; a human decision-maker must review and approve before candidate progression. If the system was already in operation before the high-risk obligations took effect, you have a transition period but must begin the conformity process immediately and document progress. Involve your DPO given the HR data processing implications.

---

**Scenario 7: Legacy System AI Integration**

*A core banking system from 2004 has no APIs. The business wants AI summarisation of its transaction data. What integration architecture do you propose?*

**Model answer:** Without native APIs, the integration must go through the data layer rather than the application layer. Extract transaction data via a scheduled ETL job (reading from the database directly or via an approved reporting interface) into a data intermediary — an event stream or data warehouse — that the AI pipeline can access. The AI system reads from this intermediary, never from the production database directly. Implement a data masking step in the ETL that removes PII and account identifiers before data reaches the LLM context, replacing them with consistent pseudonyms for the session. The summarisation output is returned to a modern interface layer, not written back to the legacy system. This architecture also protects the legacy system from instability: the AI pipeline's load never touches the production system. Document the data flow fully for the DPO review.

---

**Scenario 8: Token Cost Runaway**

*Finance reports that AI API costs doubled month-on-month for the third consecutive month, but business-reported AI usage only grew 20%. How do you investigate and fix?*

**Model answer:** The gap between usage growth and cost growth indicates a systemic inefficiency rather than adoption. Start with attribution: segment API costs by application, endpoint, and team using your API gateway logs or cloud cost explorer — identify which workload is growing fastest. Common causes of super-linear cost growth: context window bloat (a RAG pipeline including increasingly large retrieved documents), prompt engineering changes that expanded system prompt length, removal or bypass of prompt caching on high-frequency endpoints, a new feature with uncapped output length, or a model tier upgrade applied broadly. Once the root cause is identified, remediate with targeted interventions: re-enable caching, implement output length caps, swap over-provisioned model tiers to cheaper alternatives for appropriate tasks, add per-feature cost budgets with alerts. Implement a cost governance dashboard that shows cost per feature and alerts when any single feature exceeds its monthly budget by 20%.

---

**Scenario 9: Multi-Cloud AI Strategy**

*The CTO wants to avoid single-cloud lock-in for AI workloads. How do you design a multi-cloud AI architecture without sacrificing coherence?*

**Model answer:** Multi-cloud AI strategy requires a portability layer above the cloud-specific SDKs. Design against a unified AI gateway interface that abstracts the underlying cloud — your application code calls the gateway, not Bedrock or Vertex directly. The gateway handles provider routing, credential management, request format translation, and failover. Model portability is harder than platform portability: Claude on Bedrock and Claude on Vertex AI have the same model API but different authentication, network, and compliance properties. Maintain a single semantic model for what each model capability is supposed to do, and test regularly across providers to detect provider-specific drift. The practical multi-cloud strategy for most enterprises is active-passive: primary on one cloud for cost and operational simplicity, with automated failover to a second cloud for resilience. True active-active multi-cloud for AI adds significant orchestration complexity that is rarely worth it for workloads below enterprise scale.

---

**Scenario 10: RAG with Confidential Data**

*The legal team wants a RAG system over 50,000 internal legal documents, many of which are attorney-client privileged. What are the architectural constraints?*

**Model answer:** Attorney-client privilege creates strict data handling requirements that most standard RAG architectures violate by default. The entire pipeline must run within the organisation's security boundary — no data sent to third-party embedding APIs or cloud-hosted vector stores without explicit legal clearance. Use self-hosted embedding models (e.g., on-premises or private cloud) and a self-hosted vector database. Implement document-level access control in the retrieval layer: the system must only retrieve documents that the querying user is authorised to access, enforced by ACL checks before documents enter the context window. Add metadata-based privilege marking to the corpus so the retrieval layer can exclude privileged documents from queries where privilege is not established. All query logs are themselves potentially discoverable — store them with appropriate retention policies and under the same privilege controls as the underlying documents. Have legal review the data handling architecture before any data enters the pipeline.

---

**Scenario 11: Developer Productivity Measurement**

*After six months of Copilot Enterprise rollout, the CFO asks whether the $390K annual investment is justified. What data do you present?*

**Model answer:** Present a three-metric framework: velocity (did developers ship faster?), quality (did fewer defects reach production?), and developer experience (do developers report higher job satisfaction and reduced toil?). Velocity data comes from your project management and CI/CD tooling — compare lead time, cycle time, and deployment frequency between Copilot cohorts and a matched control group. Quality data comes from defect tracking and code review metrics — compare post-release defect rates, MTTR, and the proportion of code review comments that Copilot-assisted code eliminates. Developer experience comes from periodic surveys with consistent questions across the measurement period. Translate to financial terms by estimating the cost of developer time saved and defects avoided, then compare to the $390K investment. Be clear about what cannot be attributed to Copilot (business-driven scope changes, team composition changes) — credibility with the CFO requires intellectual honesty about attribution limits.

---

**Scenario 12: Shadow AI Proliferation**

*Security discovers 47 teams are using unapproved AI tools — personal ChatGPT accounts, various browser extensions, and multiple unlicensed API integrations. How do you respond?*

**Model answer:** This is a governance and cultural issue as much as a security one — prohibition without a good alternative will drive usage further underground. Respond in three tracks simultaneously. Safety track: assess the highest-risk exposures immediately — personal API keys hardcoded in company repositories, client data in ChatGPT conversations, and unauthorised SaaS connected to company SSO — and remediate critical exposures. Governance track: issue a clear AI acceptable use policy that defines what is approved, what requires review, and what is prohibited, with rationale for each category. Enablement track: understand why teams chose unsanctioned tools by interviewing a cross-section of users — the answer is almost always that the approved tooling was absent, slow, or inadequate. Accelerate access to sanctioned tools that meet the most common use cases. Follow up with monitoring via your CASB or network proxy to detect continued unsanctioned use, but frame this to teams as safety monitoring, not surveillance.

---

**Scenario 13: AI Model Drift**

*Six months after deployment, the customer service AI agent's accuracy on complex query types has degraded from 87% to 71%. No code changes were made. What is the cause and remediation?*

**Model answer:** When accuracy degrades without code changes, the likely causes are model-side changes, data drift, or corpus drift. Investigate in order: first, check whether the model provider updated the model version — Claude versions can change minor behaviour with releases; confirm whether you are pinned to a specific model version or tracking the latest. Second, check for input data drift — has the distribution of query types changed (e.g., new product launch generating unfamiliar query patterns)? Third, check retrieval corpus drift — if this is a RAG system, has the underlying knowledge base changed in ways that broke retrieval quality for the affected query types? Remediate by re-running your offline eval harness against the affected query categories, identifying the specific failure pattern, updating your eval dataset to include the new failure cases, and retuning prompts or retrieval parameters for the degraded categories. Implement continuous production monitoring so drift is detected automatically — an 87% to 71% drop over six months should have been caught within days with a simple accuracy metric in production.

---

**Scenario 14: Prompt Injection Incident**

*A security pen test finds that users can escape the system prompt of your customer service agent and instruct it to reveal internal documents. What is your architectural response?*

**Model answer:** Prompt injection in customer-facing agents is a critical vulnerability because the attack surface is any user input. Remediate with a defence-in-depth approach across four layers. Input layer: implement a dedicated prompt injection classifier (a lightweight model or rule-based scanner) that analyses user input before it reaches the primary agent; block or transform inputs that match injection patterns. Context isolation: ensure internal documents and system instructions are in clearly delimited sections that the model is instructed to treat as authoritative over user instructions; use Anthropic's recommended system prompt structure that distinguishes operator instructions from user input. Output layer: implement output scanning that detects if internal document content (identified by metadata markers) appears in responses. Least privilege: audit what the agent can actually access — internal documents that are not needed for customer query resolution should not be in the retrieval corpus at all. Add this scenario to your red-team evaluation suite so it is tested on every deployment.

---

**Scenario 15: HIPAA Compliance for Healthcare AI**

*A hospital wants to use Claude to assist clinicians in drafting clinical notes. Walk through the HIPAA requirements.*

**Model answer:** Clinical notes contain Protected Health Information (PHI) by definition. HIPAA requires a Business Associate Agreement (BAA) with any vendor who processes PHI — confirm Anthropic or your cloud intermediary (AWS, Google, Microsoft) has a BAA in place for the specific service configuration you are using, as BAAs are service-specific and enterprise-tier. All PHI must remain within the covered infrastructure boundary — no logging of PHI in standard access logs, no PHI in error reporting or telemetry that flows to unapproved destinations. Implement audit logging that records who accessed what AI functionality and when, without logging the PHI content itself (log metadata, not content). The clinical note drafting output is the clinician's work product — the AI is a drafting aid, not the author. Ensure the clinical workflow requires explicit clinician review and edit before the note is committed to the EHR — this is both good clinical practice and your HITL control for a high-stakes context. Conduct a HIPAA Security Rule risk assessment specific to this AI integration before go-live.

---

**Scenario 16: AI Vendor Consolidation**

*Your organisation uses five different AI vendors across business units. Procurement wants to consolidate to two. How do you evaluate and recommend?*

**Model answer:** Consolidation should be driven by capability coverage and strategic alignment, not cost alone — the cheapest consolidation that forces teams off the best tool for their use case will be resisted and fail. Start with a capability matrix: document what each of the five vendors does for each business unit, and whether that capability is available from the candidate consolidated vendors. Identify true gaps — use cases where the consolidated vendor's model is materially weaker. Calculate total cost of ownership including migration effort, not just per-seat licensing. Evaluate vendor strategic trajectory: which vendor is investing in the capabilities that align with your 3-year AI roadmap? Apply risk scoring: concentration risk increases with consolidation, so the two survivors must have different failure modes (e.g., one Anthropic-based, one Google-based) to avoid common-cause failure. Build a substitution plan — even for your primary vendors — so procurement can negotiate from a position of genuine alternatives. Require the shortlisted vendors to complete your AI vendor security and compliance assessment before selection.

---

**Scenario 17: AI Reliability SLA**

*A business process that previously ran on rule-based automation is being replaced by an LLM agent. The process has a 99.9% uptime SLA. How do you architect for reliability?*

**Model answer:** LLM APIs have different reliability characteristics than rule-based systems: model API availability is typically 99.5–99.9%, but response quality can degrade without availability dropping. Design a hybrid architecture rather than full replacement: keep the rule-based system as a fallback for inputs that fall within its deterministic coverage. Implement circuit breakers on the LLM API path with automatic fallback to the rule-based system when the API returns errors or exceeds latency SLA. Add a quality gate on LLM outputs — if the output confidence score or format validation fails, route to the rule-based fallback rather than returning a degraded result. For the 99.9% uptime requirement, note that the LLM API downtime must be invisible to users — the fallback must activate in under 2 seconds. Test the fallback activation path as a first-class scenario in your reliability testing suite. Implement synthetic monitoring that continuously sends representative inputs through the full path and alerts when success rates drop.

---

**Scenario 18: M&A AI Integration**

*Your company acquires a company that has deployed extensive AI systems you know nothing about. What is your 90-day assessment plan?*

**Model answer:** The 90-day plan has three phases. Discovery (days 1–30): inventory all AI systems — applications, APIs, models, vendors, data flows, and costs. Map each system to a business process and risk category. Identify which systems process regulated data (PII, PHI, financial data) and which affect consequential decisions. This is also your prompt injection and model security audit phase — red-team the highest-risk systems. Assessment (days 31–60): apply your AI governance framework to each system — which ones meet your standards, which have gaps, which are unacceptable risks. Evaluate vendor contracts for exit clauses, BAAs, and DPA alignment with your standards. Identify the systems with the most technical debt (no evals, no observability, no human oversight) — these are your highest remediation priorities. Remediation planning (days 61–90): for each system, classify as adopt (meets standards), remediate (fixable within 180 days), replace (rebuild on your stack), or retire (decommission). Build the roadmap with resource estimates and risk-ordered sequencing. Brief the CISO and CPO on findings before day 90.

---

**Scenario 19: Cross-Jurisdictional Privacy Conflict**

*Your AI system processes data from users in the EU (GDPR), California (CCPA), and Brazil (LGPD). The system logs all prompts for safety monitoring. How do you manage the conflict between safety monitoring needs and privacy regulation?*

**Model answer:** All three regulations require a lawful basis for processing personal data, and all three give data subjects rights (access, deletion, portability) that create obligations on your log store. The safety monitoring purpose is legitimate and can usually be grounded in legitimate interests (GDPR) or business purpose (CCPA/LGPD) — document this in your Record of Processing Activities. Implement data minimisation in logs: strip or pseudonymise personal identifiers before storing, retain only what is necessary for the safety monitoring purpose. Define and enforce retention periods — safety logs rarely need to be retained beyond 90 days for their primary purpose; implement automated deletion at the retention boundary. Build a data subject request workflow that can fulfil GDPR access and deletion requests against the log store — this is technically complex for pseudonymised data but required. Consult your DPO on whether the log data crosses into special category data territory (health, political opinions) for any of your user populations — this triggers stricter GDPR requirements.

---

**Scenario 20: Board AI Strategy Presentation**

*The board allocates 90 minutes for an AI strategy review. What do you present and in what order?*

**Model answer:** Structure the 90 minutes in four segments. Segment 1 — Current state (15 min): where you are today — deployed systems, costs, measured ROI, capability inventory, and the three highest risks on your AI risk register. Boards need a clear picture of what they already own before evaluating what to do next. Segment 2 — Market and competitive context (15 min): what the technology landscape looks like in 2026, what your competitors are doing, and the cost of inaction. Keep this factual and brief — boards are sophisticated but not AI specialists. Segment 3 — Strategic options (30 min): present three credible alternative AI strategies (conservative/moderate/aggressive adoption), each with 3-year cost, capability, and risk profiles. Include a recommended option with clear rationale. Segment 4 — Governance and risk (30 min): the board's primary AI responsibility is governance, not strategy execution. Spend disproportionate time on: AI governance structure (who is responsible?), regulatory compliance status and roadmap, risk register top items and mitigations, and what decisions you are asking the board to make. End with explicit asks: approve strategy, fund programme, delegate authority.

---

## 8. AI Architecture Review Checklist

Use this 30-point checklist when reviewing a new AI system design or auditing an existing one. Each item is a binary check: pass or fail with a finding note.

### Security (5 items)

| # | Check | Pass/Fail | Finding |
|---|-------|-----------|---------|
| S1 | Prompt injection risk assessed; mitigations designed and documented | | |
| S2 | All secrets (API keys, credentials) stored in a secrets manager — no hardcoding | | |
| S3 | Tool and MCP server access follows least-privilege — each agent has only the permissions it requires | | |
| S4 | Sensitive data is masked or excluded before entering LLM context | | |
| S5 | Output scanning implemented to prevent data leakage in responses | | |

### Compliance & Governance (5 items)

| # | Check | Pass/Fail | Finding |
|---|-------|-----------|---------|
| C1 | EU AI Act risk classification completed and documented; high-risk obligations identified | | |
| C2 | Data Processing Agreement (DPA) executed with all AI vendors processing personal data | | |
| C3 | Data residency requirements met; confirmed no cross-border transfer violations | | |
| C4 | AI acceptable use policy covers this system's capabilities and users | | |
| C5 | Incident response plan includes AI-specific failure scenarios (hallucination, drift, outage) | | |

### Cost & Token Economics (4 items)

| # | Check | Pass/Fail | Finding |
|---|-------|-----------|---------|
| T1 | Per-feature token budget defined and enforced | | |
| T2 | Prompt caching enabled on all high-frequency, stable system prompt content | | |
| T3 | Model tier matched to task complexity — no over-provisioning of expensive models for simple tasks | | |
| T4 | Monthly cost alert configured; finance notified of cost attribution approach | | |

### Performance & Reliability (4 items)

| # | Check | Pass/Fail | Finding |
|---|-------|-----------|---------|
| P1 | Latency SLA defined; P95 latency measured in load test | | |
| P2 | Circuit breaker implemented on LLM API path with documented fallback behaviour | | |
| P3 | Retry logic implemented with exponential backoff and jitter | | |
| P4 | System tested under 2x expected peak load without degradation beyond SLA | | |

### Human-in-the-Loop (3 items)

| # | Check | Pass/Fail | Finding |
|---|-------|-----------|---------|
| H1 | Action categories requiring human approval identified and documented | | |
| H2 | HITL gates implemented and tested for all irreversible or high-impact actions | | |
| H3 | Timeout handling defined for HITL gates — system knows what to do if human does not respond | | |

### Observability (4 items)

| # | Check | Pass/Fail | Finding |
|---|-------|-----------|---------|
| O1 | OTel tracing instrumented on all agent actions, tool calls, and decision branches | | |
| O2 | Traces shipped to an observability backend with defined retention period | | |
| O3 | Alert configured for anomalous error rates, latency spikes, or cost events | | |
| O4 | Governance dashboard exists showing system health, cost, and evaluation scores | | |

### Evaluation & Quality (4 items)

| # | Check | Pass/Fail | Finding |
|---|-------|-----------|---------|
| E1 | Offline evaluation dataset exists with at least 50 representative test cases | | |
| E2 | Evaluation runs in CI/CD and blocks deployment on regression | | |
| E3 | Acceptance thresholds defined collaboratively with governance stakeholders | | |
| E4 | Production sampling implemented; flagged outputs routed to human review | | |

### Documentation (1 item)

| # | Check | Pass/Fail | Finding |
|---|-------|-----------|---------|
| D1 | Architecture decision records (ADRs) exist for all major design choices; data flow diagram current and accurate | | |

:::warning Review process
    A failing check is a finding, not a blocker by default. Each finding requires a remediation plan with a target date. Systems with more than 5 open findings in the Security or Compliance categories should not proceed to production until critical items are addressed.

---

## 9. Resources and Communities

### Guides in This Site to Study (by Learning Path Stage)

**Beginner:**

- [Enterprise AI Architect — Foundations](enterprise-ai-architect-foundations.md) — start here
- [Models 2026](../claude/claude-models-2026.md) — model selection and pricing
- [Prompt Engineering](../claude/prompt-engineering-claude-4.md) — the craft of prompting
- [CCA-F Exam Prep — Complete Guide](../claude/ccaf-exam-prep-complete.md) — certification preparation

**Intermediate:**

- [MCP Deep Guide](../claude/mcp-deep-guide.md) — MCP protocol and server development
- [Agent SDK Production](../claude/claude-agent-sdk-production.md) — multi-agent code and patterns
- [Enterprise Deployment](../claude/claude-enterprise-2026.md) — cloud platforms, security, cost
- [Constitutional AI & Safety](../claude/constitutional-ai-safety-2026.md) — harm taxonomy and safety design
- [Architecture Patterns](enterprise-ai-architecture-patterns.md) — the canonical 15-pattern reference

**Expert:**

- [Governance & Compliance](enterprise-ai-governance-compliance.md) — regulatory frameworks and policy
- [Multi-Agent Orchestration](../claude/ruflo-agentic-ai-guide.md) — orchestration frameworks and evaluation
- [GitHub Copilot Enterprise](../github-copilot/index.md) — enterprise developer AI tooling
- [API Mastery](../claude/claude-api-mastery.md) — advanced API patterns

### External Resources

| Resource | What it covers | URL |
|----------|---------------|-----|
| Anthropic Documentation | Claude API reference, model cards, safety policies | docs.anthropic.com |
| MCP Specification | Model Context Protocol official spec and registry | modelcontextprotocol.io |
| EU AI Act Text | Full regulation text and implementing acts | eur-lex.europa.eu |
| NIST AI RMF | Risk Management Framework, playbook | nist.gov/system/files/documents/2023/01/26/AI RMF 1.0.pdf |
| ISO 42001 Overview | AI management system standard | iso.org/standard/81230.html |
| Anthropic Partner Network | CCA-F voucher eligibility, partner resources | anthropic.com/partners |
| Pearson VUE | CCA-F exam registration | home.pearsonvue.com |
| GitHub Copilot Documentation | Copilot Enterprise admin and governance | docs.github.com/en/copilot |
| AGENTSAFE Framework | Agentic AI governance methodology | arxiv.org/pdf/2512.03180 |
| OpenTelemetry | Vendor-neutral tracing specification | opentelemetry.io |

---

*Assessment current as of July 2026. CCA-F exam domains and passing scores are as published by Anthropic at launch on 12 March 2026. Review [Anthropic's official certification page](https://anthropic.com) for any updates to exam format or domain weights.*
