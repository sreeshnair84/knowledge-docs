---
title: "Hard Scenarios Interview Prep"
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
source_type: converted-pdf
source_file: ""
doc_type: guide
covers_version: "N/A"
tags: ["interview-prep", "enterprise-architecture", "agentic-ai", "scenarios"]
---

# Advanced Scenario Interview Prep

*Enterprise Architect — Generative & Agentic AI | AD / Director Level*

10 complex, real-world scenarios across: Agentic System Failures, Multi-Cloud Architecture, AI Governance & Regulation, Cost Optimization, Security & Adversarial AI, Org Transformation, Data Architecture, LLMOps at Scale, Ethical AI Crisis, and Enterprise Agent Mesh Design. Each includes the scenario setup, what the interviewer is really testing, a model answer with architecture, and the trade-offs a senior architect must own.
| S1 | Production Agentic System Causing Real Financial Damage | EXTREME | Agentic AI |
| --- | --- | --- | --- |
| Your company deployed an autonomous procurement agent 6 weeks ago. It negotiates and places purchase orders with suppliers up to $50K without human approval. On Friday evening, a prompt injection attack via a malicious invoice PDF caused the agent to place 47 duplicate orders totaling $2.1M across 12 suppliers. The CFO calls you at 7pm. Contracts are legally binding. Some orders have already shipped. You are the Enterprise Architect who designed this system. What do you do — right now and over the next 30 days? |
| --- |
**▌ WHAT THE INTERVIEWER IS REALLY TESTING**
Can you operate under extreme pressure without losing architectural clarity?
Do you understand prompt injection and adversarial AI attack surfaces?
Do you know how to do a post-mortem at the architecture level, not just the ops level?
Do you own the failure — or deflect?
Can you re-architect the system live under questioning?
**▌ MODEL ANSWER — IMMEDIATE RESPONSE (HOURS 0–4)**
| 1 | Kill the agent — immediately revoke API credentials and disable the procurement agent's tool access. Financial damage stops first. |
| --- | --- |
| 2 | Activate incident response — loop in Legal, Finance, and Security within the first 30 minutes. This is now a financial and legal incident, not just a technical one. |
| 3 | Pull full trace logs — every agent action from the past 72 hours with input/output captured. Identify the exact injection vector from the malicious PDF. |
| 4 | Supplier communication — Legal leads outreach to the 12 affected suppliers within hours. Some orders can be cancelled; for shipped items, determine return or credit options. Every interaction documented. |
| 5 | Scope the blast radius — audit all agent-initiated transactions for the past 6 weeks, not just Friday. Determine if this was a one-time attack or a pattern. |

**▌ ROOT CAUSE — THE ARCHITECTURAL FAILURES**

| Own this completely. Do not blame the attacker. The architecture created the vulnerability. |
| --- |

**Failure 1:**No input sanitization on document ingestion. The PDF was passed directly into the agent's context without stripping executable-like content or verifying document provenance.
**Failure 2:**No human-in-the-loop for order volumes above a threshold. $50K per order with no approval gate is architecturally reckless for an autonomous agent.
**Failure 3:**No idempotency check on the procurement tool. The API allowed duplicate PO creation without a de-duplication guard.
**Failure 4:**No rate limiting or velocity control on the agent's tool calls. 47 orders in a short window should have auto-triggered an anomaly alert.
**Failure 5:**No canary / shadow mode before full autonomy. The agent was deployed directly to full autonomous operation without a graduated rollout.

**▌ RE-ARCHITECTURE — 30-DAY REMEDIATION PLAN**

| BEFORE (Vulnerable Architecture): PDF Invoice → [Document Loader] → Agent Context → [Procurement Tool] → Supplier API ↑ No sanitization, no gate AFTER (Hardened Architecture): PDF Invoice → [Malicious Content Scanner] → [Document Provenance Validator] → [Structured Data Extractor — fields only, no raw text to agent] → [Agent Context — sanitized, structured input] → [Confidence Gate: <0.95 → Human Review Queue] → [Idempotency Layer: PO hash deduplication] → [Velocity Guard: >3 orders/hour → auto-pause + alert] → [Amount Threshold: >$10K → async human approval step] → [Procurement Tool] → Supplier API |
| --- |

**▌ GOVERNANCE CHANGES**
Introduce a mandatory 'Agentic Risk Assessment' for any agent with real-world financial or legal action capability
Tiered autonomy model: all new agents start in shadow mode (log only), then supervised mode (human confirms), then autonomous with velocity guards
Red-team requirement before production: dedicated adversarial testing for prompt injection, tool misuse, and loop exploitation
AI incident response runbook — this should have existed before deployment

| KILLER FOLLOW-UP: 'Would you have approved this architecture if you reviewed it before launch?' The only right answer: 'No — and I'd identify exactly which review gate failed to catch these gaps. That gate gets redesigned.' |
| --- |

| S2 | Multi-Cloud AI Platform with Cascading Data Sovereignty Violations | EXTREME | Multi-Cloud + Compliance |
| --- | --- | --- | --- |

| A global bank has AI workloads spread across AWS (US), Azure (EU), and a private data center (Singapore). Your RAG-based customer advisory system was found to have routed EU customer PII through US-region AWS Bedrock for embedding generation — a GDPR Article 46 violation. The EU DPA has opened an investigation. Simultaneously, the Singapore MAS FEAT guidelines require explainability on all AI-assisted credit decisions, and your current LLM cannot produce that. You have 30 days to present a remediation architecture to the board. Design it. |
| --- |

**▌ WHAT THE INTERVIEWER IS REALLY TESTING**
Deep knowledge of data residency vs. data sovereignty vs. data localization distinctions
Ability to architect for regulatory compliance across multiple jurisdictions simultaneously
Whether you understand GDPR SCCs, MAS FEAT, and their architectural implications
Can you design explainability into an LLM-based system — a genuinely hard problem

**▌ ARCHITECTURE DIAGNOSIS**

| GDPR Violation Root Cause EU customer PII flowed to US embedding model No data residency enforcement in the RAG pipeline Embedding API calls not governed by data classification No consent or SCCs for cross-border AI processing | MAS FEAT Violation Root Cause LLM outputs are opaque — no reasoning trace Credit decisions lack factor attribution No audit trail linking input features to output recommendation Model cannot be interrogated by regulators |
| --- | --- |

**▌ REMEDIATION ARCHITECTURE**
| JURISDICTION-AWARE DATA PLANE: [Data Classification Layer] → Tags every record: EU_PII | SG_REGULATED | US_STANDARD ↓ [Residency Enforcement Router] EU_PII  → Azure OpenAI EU (Sweden/Netherlands region only) SG_REG  → Private DC Singapore / Azure SG (when available) US_STD  → AWS Bedrock us-east-1 (unrestricted) ↓ [Embedding Generation — Jurisdiction-local] EU vector store: Azure AI Search (EU region) SG vector store: Qdrant self-hosted (Singapore DC) US vector store: AWS OpenSearch (us-east-1) ↓ [Explainability Layer — MAS FEAT compliance] → Structured output: {recommendation, top_3_factors, confidence, sources} → Factor attribution via prompt-enforced CoT + SHAP-style feature weights → Audit log: immutable record of input features + model output + version ↓ [Human Review Gate — all credit decisions above threshold] → Reviewer sees: recommendation + attribution + sources → Final decision: human (AI is advisory only for MAS compliance) |
| --- |

**▌ EXPLAINABILITY STRATEGY — THE HARD PART**

| Genuine LLM explainability is unsolved at the model level. Enterprise architects must design it at the system level. |
| --- |

**Layer 1 — Structured Output Forcing:**Require the model to output: {decision, primary_factors: [{factor, weight, direction}], confidence, uncertainty_flags}. This is prompt-engineered, not model-native — but regulators accept system-level explainability.
**Layer 2 — Source Attribution:**Every RAG response includes the retrieved documents that influenced the answer. Regulators can trace what information the model had access to.
**Layer 3 — Chain-of-Thought Logging:**For high-stakes decisions, force step-by-step reasoning in the prompt and log the full reasoning chain — not just the conclusion.
**Layer 4 — Separate Explainability Model:**Use a secondary model (or rule-based system) to generate a human-readable explanation of the primary model's output. This is the 'explanation wrapper' pattern.
**Layer 5 — Audit Trail:**Every decision logged with: timestamp, model version, prompt version, input features, retrieved context, output, human reviewer decision. Immutable, queryable.

**▌ 30-DAY BOARD PRESENTATION STRUCTURE**

| Day 1–3 | Emergency fix: re-route EU embedding pipeline to Azure EU region. Stop the active GDPR violation immediately. Notify DPA of remediation steps taken. |
| --- | --- |
| Day 4–10 | Implement Data Classification Layer and Residency Enforcement Router. All new requests governed; no EU PII leaves EU region. |
| Day 11–20 | Build and deploy Explainability Layer. Parallel-run old and new system; validate explainability output quality with compliance team. |
| Day 21–28 | Full audit of historical transactions for residency violations. Scope report for DPA. Legal review of breach notification requirements. |
| Day 29–30 | Board presentation: incident timeline, root cause, remediation architecture, ongoing monitoring, regulatory engagement status. |

| S3 | LLMOps at Scale: 200 Models, Drift, and a Regulatory Audit | HARD | LLMOps + Governance |
| --- | --- | --- | --- |

| Your firm has grown from 3 to 200+ AI models in production over 18 months — a combination of fine-tuned models, RAG systems, and agentic workflows across 14 business units. The CRO just told you: 'We have a regulatory audit in 90 days and we cannot tell the auditor what version of which model made which decision 6 months ago.' Meanwhile, your ML team reports 23 models showing performance drift, and 6 are suspected to be using training data that may violate new copyright regulations. You have no central model registry. Design a 90-day LLMOps transformation. |
| --- |

LLMOps maturity model knowledge — can you articulate what 'good' looks like?
Model governance at enterprise scale — not just tooling, but process and org design
How to prioritize a complex transformation under a hard deadline
Copyright and training data provenance — an emerging and genuinely hard problem

**▌ PHASE 1: STOP THE BLEEDING (DAYS 1–14)**
**Priority 1:**Freeze all new model deployments until a minimum viable governance process is in place. Yes, this will cause friction. It's necessary.
**Priority 2:**Emergency model inventory — every BU must submit a model manifest: model ID, version, deployment date, use case, data sources, current status. This is manual and imperfect but gives you a baseline in 5 days.
**Priority 3:**Enable deployment logging on all inference endpoints immediately — capture model version, prompt hash, input metadata, output, and timestamp. This closes the audit trail gap going forward.
**Priority 4:**Quarantine the 6 suspected copyright-risk models — suspend them from production, route to fallback, and initiate legal review of training data provenance.

**▌ PHASE 2: CENTRAL MODEL REGISTRY (DAYS 15–45)**

| ENTERPRISE MODEL REGISTRY ARCHITECTURE: [Model Card Store]          — capabilities, limitations, intended use, bias eval [Version Control]           — every model artifact versioned, immutable snapshots [Training Data Lineage]     — what data, what license, what time range [Deployment History]        — when deployed, where, by whom, what config [Performance Baseline]      — eval metrics at deployment time (ground truth) [Drift Monitor]             — continuous comparison vs. baseline [Audit Log API]             — queryable: 'what model answered this request at T?' [Retirement Tracker]        — deprecation schedule, migration path Tooling: MLflow Model Registry + custom metadata layer + governance API Enforcement: All inference endpoints must register; unregistered = blocked at gateway |
| --- |

**▌ PHASE 3: DRIFT REMEDIATION (DAYS 30–70)**
**Classify the 23 drifting models:**Category A (critical, user-facing): immediate retraining or replacement. Category B (internal, lower stakes): scheduled refresh within 60 days. Category C (monitored, acceptable drift range): no action, document rationale.
**Root cause analysis:**Is drift from data distribution shift, prompt decay, or upstream data pipeline change? Each has a different fix. Don't retrain if the issue is the data pipeline.
**Automated drift detection:**Deploy statistical drift monitoring (PSI for input distribution, BLEU/ROUGE delta for generation quality, business metric correlation). Alert thresholds before drift becomes a failure.

**▌ TRAINING DATA COPYRIGHT — THE HARD ANSWER**

| There is no perfect solution to training data copyright risk for models already deployed. Here is the honest architecture answer: |
| --- |

For the 6 quarantined models: engage Legal to assess risk level (what data, what jurisdiction, what use case). High-risk = retire. Medium-risk = indemnified commercial model replacement. Low-risk = document and monitor.
Going forward: institute Training Data Provenance Policy — all training data must have documented license, source, and date. Use tools like Weights & Biases Data versioning or DVC.
Prefer commercially licensed or internally generated training data for enterprise fine-tuning. Commercial model providers (Anthropic, OpenAI, Google) indemnify enterprise customers — this is an architectural argument for using API-based models over self-trained for high-risk use cases.

**▌ AUDIT READINESS — 90-DAY DELIVERABLE**

| Evidence 1 | Complete model inventory with model cards for all 200+ models |
| --- | --- |
| Evidence 2 | Deployment audit trail: answer 'what model version answered request X at time T?' for any request in the past 12 months |
| Evidence 3 | Drift monitoring dashboard: current status of all models vs. baseline |
| Evidence 4 | Training data provenance records for all active models |
| Evidence 5 | Governance process documentation: how models are approved, deployed, monitored, and retired |
| Evidence 6 | Remediation evidence for the 6 copyright-risk models and 23 drifting models |

| S4 | Enterprise Agent Mesh: Designing for 50 Agents That Must Collaborate | EXTREME | Agentic Architecture |
| --- | --- | --- | --- |

| The CTO wants to deploy an 'Enterprise Agent Mesh' — 50 specialized AI agents (Finance Agent, HR Agent, Legal Agent, IT Agent, Supply Chain Agent, etc.) that can collaborate to resolve complex cross-functional requests. Example: 'Onboard a new executive' requires HR (create record), IT (provision access), Finance (set up cost center), Legal (prepare NDA), and Facilities (assign desk) — all coordinated. Design the architecture. Specifically: how do agents discover each other, communicate, share context, maintain security boundaries, and avoid deadlocks? |
| --- |

Whether you know multi-agent architectural patterns beyond basic tutorials
Agent discovery, trust, and authorization — a genuinely unsolved enterprise problem
Deadlock prevention and failure isolation in multi-agent workflows
How to handle sensitive data (HR salary data, Legal docs) flowing between agents

**▌ CORE ARCHITECTURE — THE AGENT MESH**

| ENTERPRISE AGENT MESH ARCHITECTURE: ┌─────────────────────────────────────────┐ │         ORCHESTRATION LAYER              │ │  [Master Orchestrator Agent]             │ │   - Decomposes complex requests          │ │   - Creates execution DAG                │ │   - Manages agent lifecycle per task     │ └──────────────┬──────────────────────────┘ │ ┌──────────────▼──────────────┐ │    AGENT REGISTRY (MCP)     │ │  - Agent capabilities       │ │  - Input/output schemas     │ │  - Authorization scopes     │ │  - Health / availability    │ └──────────────┬──────────────┘ │  (discovery) ┌─────────────┼─────────────┐ ▼             ▼             ▼ [HR Agent]  [Finance Agent]  [Legal Agent] ... │  each agent has: │  - Own LLM instance │  - Scoped tool access only │  - Data boundary enforcer │  - Outbound message schema ▼ [Shared Context Bus — structured, schema-validated messages only] [Audit Log — every inter-agent message logged with sender/receiver/payload] |
| --- |

**▌ THE FIVE HARD PROBLEMS — AND HOW TO SOLVE THEM**

**Problem 1: Agent Discovery**
Use an Agent Registry built on MCP (Model Context Protocol). Every agent registers its: capability description, required input schema, output schema, authorization scope, and SLA. The Orchestrator queries the registry at runtime — it does not hardcode agent addresses. This means agents can be added, upgraded, or retired without changing the orchestrator.

**Problem 2: Inter-Agent Trust & Authorization**
Never let agents call each other directly. All inter-agent communication flows through the Orchestration Layer which enforces an authorization matrix: which agent is allowed to request what from which other agent. HR Agent cannot directly query Legal Agent's document store. Finance Agent cannot read salary data unless the task explicitly requires it and is authorized. Use OAuth 2.0 scopes per agent, enforced at the message bus level.

**Problem 3: Sensitive Data Crossing Agent Boundaries**
Implement Data Minimization at the message boundary — agents receive only the fields they need, not the full context object. Use a Field-Level Encryption + Tokenization pattern: HR Agent returns employee_token (not the actual name) which Finance Agent uses to create the cost center entry. PII never crosses agent boundaries in cleartext. Audit log captures what data was shared, not the data itself.

**Problem 4: Deadlocks and Circular Dependencies**
The Orchestrator builds a DAG (Directed Acyclic Graph) before execution begins. If the dependency graph contains a cycle, the task is rejected before any agent is invoked. For runtime deadlocks (Agent A waiting for Agent B which is waiting for Agent A), implement a timeout-with-escalation: any agent wait >30 seconds triggers a deadlock check and human escalation. Use optimistic execution where possible — parallelize independent tasks, only serialize true dependencies.

**Problem 5: Failure Isolation — One Agent Failing Shouldn't Kill the Workflow**
Implement the Bulkhead pattern: each agent runs in its own isolated execution context. Agent failures are caught at the message bus and trigger a fallback strategy: retry (transient failure), escalate to human (ambiguous failure), or partial completion with notification (non-critical agent). The Orchestrator tracks a completion DAG — partial results are committed, not rolled back globally, unless the failed agent was on the critical path.

**▌ THE 'EXECUTIVE ONBOARDING' WORKFLOW — LIVE EXAMPLE**

| REQUEST: 'Onboard John Smith as VP Finance, start date March 31' Orchestrator decomposes → builds DAG: [HR Agent]          → creates employee record → returns {emp_id, emp_token} ↓ (emp_id available) [IT Agent]          → provisions O365, Okta, laptop → returns {access_ticket} [Finance Agent]     → creates cost center entry → returns {cost_center_id} [Legal Agent]       → generates NDA from template → returns {doc_id, signature_request} ↓ (all above complete) [Facilities Agent]  → assigns desk, parking, badge → returns {badge_number} ↓ (all complete) [Notification Agent]→ sends welcome package with all artifacts to John Smith Parallel where possible: IT, Finance, Legal run in parallel after HR completes. Sequential only where required: Facilities needs badge number, needs emp_id from HR. Failure handling: If Legal Agent fails (lawyer unavailable), partial complete: → Everything else proceeds, Legal flagged for manual follow-up with SLA timer. |
| --- |

| S5 | AI Cost Explosion: $4M Monthly Inference Bill — Cut It by 60% | HARD | Cost Optimization |
| --- | --- | --- | --- |

| Your enterprise AI platform has grown to $4M/month in LLM inference costs. The CFO has mandated a 60% reduction ($2.4M savings) within 90 days without degrading user-facing quality by more than 5% on any KPI. You have 47 AI products using GPT-4-class models for everything from chatbots to document classification to internal search. Where do you start and what is your architecture? |
| --- |

Whether you understand LLM cost drivers at a technical level — not just 'use a cheaper model'
Systematic approach to cost optimization without quality regression
Knowledge of caching, routing, fine-tuning, and distillation as cost strategies
Trade-off reasoning under real business constraints

**▌ COST DRIVER ANALYSIS — DO THIS FIRST**

| NEVER start cutting costs without understanding the cost breakdown. 20% of use cases almost certainly drive 80% of spend. |
| --- |

**Token Analysis:**Input tokens vs. output tokens (output is typically 2–4x more expensive). Long system prompts repeated every call = massive waste.
**Model Distribution:**Which of your 47 products are using GPT-4-class when GPT-3.5-class or smaller models would suffice?
**Cache Hit Rate:**What % of requests are semantically identical? Low cache hit rate = massive redundant spend.
**Request Patterns:**Are there high-volume, low-complexity tasks (classification, extraction) being sent to frontier models?
**Context Window Waste:**Are retrieval systems stuffing unnecessary context? Average context utilization < 40% is common.

**▌ THE 5-LAYER COST OPTIMIZATION ARCHITECTURE**

| LAYER 1: SEMANTIC CACHE  [Target: 25–35% cost reduction] → Every request hashed semantically (embedding similarity) → Cache TTL tuned per use case (search: 1hr, policy Q&A: 7 days) → Cache hit = zero LLM cost. Most conversational apps: 30-40% cache rate. LAYER 2: INTELLIGENT MODEL ROUTER  [Target: 20–30% cost reduction] → Complexity classifier scores each request (fast, cheap classifier) → Simple (classification, extraction, FAQ) → Small model (Haiku, GPT-3.5-turbo) → Medium (summarization, drafting) → Mid model (Sonnet, GPT-4o-mini) → Complex (multi-step reasoning, code) → Frontier model (Opus, GPT-4) → Rule: never use a $15/MTok model for a task a $0.25/MTok model handles at 95% quality LAYER 3: CONTEXT COMPRESSION  [Target: 10–15% cost reduction] → Audit retrieval: is all retrieved context actually used by the model? → Implement relevance filtering: only top-K chunks above similarity threshold → Compress conversation history: rolling summary instead of full history → System prompt optimization: remove redundant instructions LAYER 4: TASK-SPECIFIC FINE-TUNING  [Target: 15–20% cost reduction, 90-day horizon] → Identify top-5 highest-volume, stable use cases (document classification, intent detection, structured extraction) → Fine-tune small models on these tasks → match frontier quality at 10x lower cost → Example: GPT-4 for invoice extraction → fine-tuned Llama-3-8B = 95% quality, 20x cheaper LAYER 5: PROMPT OPTIMIZATION  [Target: 5–10% cost reduction] → Audit top-20 products for prompt verbosity → Remove redundant context, tighten instructions → Use prompt caching (Anthropic, OpenAI) for static system prompt components |
| --- |

**▌ QUALITY SAFEGUARDS — HOW TO ENSURE <5% DEGRADATION**
**Baseline first:**Before any change, capture current KPIs per product: task completion rate, user satisfaction, accuracy on eval set. You cannot prove <5% degradation without a baseline.
**Shadow mode routing:**Run the cheaper model in parallel for 2 weeks. Compare outputs before switching production traffic.
**Canary deployment:**Route 5% of traffic to cheaper model, measure KPIs, then scale if within threshold.
**Human eval for subjective quality:**For creative/advisory tasks, automated metrics aren't enough — sample review by domain experts.

**▌ 90-DAY SAVINGS PROJECTION**

| Initiative | Timeline | Savings Est. | Risk Level |
| --- | --- | --- | --- |
| Semantic Caching | Days 1–14 | $800K–$1M/mo | Low |
| Model Router (easy tasks to small models) | Days 15–30 | $700K–$900K/mo | Medium |
| Context Compression | Days 15–30 | $300K–$400K/mo | Low |
| Prompt Optimization | Days 1–30 | $150K–$250K/mo | Low |
| Fine-tuning top 5 use cases | Days 30–90 | $400K–$600K/mo | Medium |

| S6 | Shadow AI: 300 Employees Using Unauthorized LLMs with Company Data | HARD | Governance + Security |
| --- | --- | --- | --- |

| Your security team's DLP monitoring reveals that 300+ employees across the firm are using personal ChatGPT, Claude.ai, and Gemini accounts to process confidential company documents — financial models, client contracts, M&A data — because your internal AI tools are 'too slow and limited.' A client just emailed asking if their data is in OpenAI's training corpus. The CISO wants it stopped immediately. The business says if you shut it down, productivity collapses. You're in the meeting. What is your architectural and organizational response? |
| --- |

Whether you understand that governance-first approaches backfire — you must solve the underlying need
Technical controls vs. organizational change management — when to use each
DLP architecture for AI-era threats (different from traditional DLP)
How to balance security enforcement with employee experience

**▌ THE DIAGNOSIS — WHY THIS IS HAPPENING**

| Employees are not malicious. They are optimizing. Your internal tools are not meeting their needs. Shutting down shadow AI without addressing the underlying capability gap will fail — employees will find workarounds. |
| --- |

**Root cause 1:**Internal AI tools have inferior UX / capability compared to consumer tools. The productivity gap is real.
**Root cause 2:**No sanctioned, secure channel for AI-assisted document work. Employees had no compliant option.
**Root cause 3:**AI policy was not enforced at the network/endpoint level — easy to circumvent.
**Root cause 4:**No education on data classification and AI risk — employees may not understand the exposure.

**▌ THE RESPONSE ARCHITECTURE — THREE TRACKS IN PARALLEL**

| TRACK 1: IMMEDIATE RISK REDUCTION (Week 1) → DLP policy update: block upload of Confidential/Restricted-classified docs to consumer AI endpoints (ChatGPT, claude.ai, Gemini) at proxy/firewall → NOT a blanket block — block data exfiltration, not AI use → Employee notification: explain what was found and why it's being addressed → Client response: prepare legal-approved statement on data handling TRACK 2: SANCTIONED AI CAPABILITY DEPLOYMENT (Weeks 2–8) → Deploy enterprise-grade AI workspace: Microsoft Copilot or Claude Enterprise or internal tool with equivalent capability — with data controls enforced → Zero-retention API agreements: data not used for model training → Private endpoints: data stays within tenant boundary → Connect to internal document stores: employees can use AI on company docs safely → SLA: new tools must be at least as fast and capable as what employees were using TRACK 3: GOVERNANCE ENABLEMENT (Weeks 4–12) → Data classification training: what is Confidential, what is OK to use with AI → AI Acceptable Use Policy: clear, short, practical — not a 40-page legal doc → Self-service AI request process: employees can request AI tools for use cases without going through a 6-month procurement cycle → DLP telemetry dashboard for CISO: ongoing visibility, not a one-time fix |
| --- |

**▌ THE CLIENT QUESTION — HONEST ANSWER ARCHITECTURE**
**Immediate:**Engage Legal to draft a client-specific response. The truthful answer is: we identified unauthorized use, we have taken immediate steps to prevent it, and we have no evidence your specific data was retained or used for training by any third-party provider.
**Technical evidence:**Pull the DLP logs to determine which employee, when, and what document type was uploaded. You may or may not know if the specific client contract was involved.
**Long-term:**Include AI data handling in your client data processing agreements (DPA) going forward. This is now standard in enterprise contracts.

| KEY INSIGHT: The architectural response to shadow AI is not better controls — it is better sanctioned tools. If your internal AI is good enough, employees won't risk their jobs to use consumer alternatives. |
| --- |

| S7 | AI System Producing Racially Biased Outputs in Hiring Pipeline | EXTREME | Ethics + Governance |
| --- | --- | --- | --- |

| Your company's AI-assisted resume screening system has been in production for 8 months and processed 140,000 applications. An investigative journalist contacts your PR team with data suggesting the system systematically scored candidates with historically Black university names 23% lower than equivalent candidates with Ivy League affiliations — even controlling for GPA and experience. The story publishes in 48 hours. You have an emergency call with the CEO, General Counsel, and CHRO. You are the Enterprise Architect. What is your position, what do you do in 48 hours, and how do you re-architect the system? |
| --- |

This is a leadership, ethics, and architecture question — and you cannot pass it by being purely technical
Bias detection and fairness-aware AI design — do you know the technical mechanisms?
Whether you prioritize legal protection or doing the right thing (they will notice)
Crisis response at the executive level — can you be calm and clear under pressure?

**▌ YOUR POSITION IN THE EXECUTIVE MEETING**

| The right answer has three parts: acknowledge, halt, remediate. In that order. Any attempt to minimize, deflect, or wait for more data before halting the system is the wrong answer — legally and ethically. |
| --- |

**Acknowledge:**The data in the journalist's analysis is directionally consistent with known risks of training ML systems on historical hiring data. We should assume the bias is real until proven otherwise — not the reverse.
**Halt:**Suspend the AI scoring system effective immediately. All pending screenings revert to human-only review. The reputational, legal, and human cost of continuing while investigating is unacceptable.
**Remediate:**Commission an independent bias audit of the full 140,000-application history. Identify affected candidates. Prepare a re-review process. This will be expensive and that is appropriate.

**▌ TECHNICAL ROOT CAUSE ANALYSIS**
**Likely cause 1 — Proxy discrimination:**The model learned university prestige as a proxy for candidate quality. Prestige correlates with race in the US due to historical access disparities. The model encoded historical bias from training data.
**Likely cause 2 — Training data bias:**If the model was trained on historical hiring decisions, and historical decisions were biased, the model learns and amplifies that bias.
**Likely cause 3 — Feature selection:**Including university name as a feature without fairness constraints allows the model to use it as a discriminatory proxy.
**Likely cause 4 — No fairness evaluation at deployment:**The system was evaluated on accuracy (did it rank similarly to human screeners?) not fairness (are outcomes equitable across demographic groups?). Optimizing for accuracy on biased historical data amplifies bias.

**▌ RE-ARCHITECTURE FOR FAIRNESS**

| FAIRNESS-AWARE HIRING AI ARCHITECTURE: [Resume Ingestion] → PII Anonymization Layer: remove name, address, graduation year, photo → Proxy Feature Detector: flag and remove university prestige rankings, zip code (redlined areas), graduation year (age proxy) ↓ [Skills & Experience Extractor] → Extract: demonstrated skills, years of relevant experience, specific achievements, technical certifications → Do NOT extract: institution name rankings, address, name-based features ↓ [Fairness-Constrained Scoring Model] → Trained on de-biased data with fairness constraints → Equalized odds: similar false positive/negative rates across demographic groups → Regular fairness audits: compare outcomes by race, gender, age (inferred) ↓ [Human Review — ALL candidates above threshold] → AI provides: skill match score + evidence (not a hire/no-hire recommendation) → Human makes final screening decision → AI is advisory, not decisional — required for high-risk AI under EU AI Act ↓ [Fairness Monitoring Dashboard] → Real-time disparate impact analysis → Automated alert: if pass rate gap > 20% between demographic groups → pause |
| --- |

**▌ THE 140,000 APPLICATIONS — REMEDIATION**
Commission an independent audit firm (not your own team) to analyze the full dataset for disparate impact
Identify candidates who applied in the past 8 months who were rejected at the AI screening stage and would have passed under a fair system — offer re-review
Set aside a dedicated re-review team with standardized rubrics — human only
For candidates where the role was filled: consider a dedicated pipeline for affected candidates for future openings
Engage an employment law firm — there may be obligations to notify affected candidates depending on jurisdiction

| WHAT SEPARATES A GOOD ANSWER: You don't frame this as a 'PR problem to manage.' You frame it as a harm that was caused to real people that must be corrected. The architecture is the easy part. The integrity to call it what it is — that's what this question is really testing. |
| --- |

| S8 | Designing a Zero-Trust AI Architecture for a Defense Contractor | HARD | Security Architecture |
| --- | --- | --- | --- |

| A defense contractor wants to deploy internal LLM-based document Q&A over 2 million classified and sensitive documents across 4 classification levels: UNCLASSIFIED, CUI (Controlled Unclassified Info), SECRET, and TOP SECRET. Different employees have different clearance levels. The system must ensure that a user cleared for CUI cannot access SECRET-level answers even indirectly — through a question like 'summarize the differences between Project X and Project Y' where X is CUI and Y is SECRET. Cloud is not an option. All compute is air-gapped. Design it. |
| --- |

Bell-LaPadula model and mandatory access control (MAC) — can you apply them to AI?
The 'inference attack' problem — a user can learn classified information from unclassified answers
Air-gapped LLM deployment architecture — not cloud-native solutions
Whether you understand that standard RAG is fundamentally incompatible with multi-level security

**▌ WHY STANDARD RAG FAILS HERE**

| Standard RAG retrieves documents across the entire corpus and injects them into context. In a multi-classification environment, this creates cross-classification contamination: a CUI-cleared user asks a question, the retriever finds relevant chunks from both CUI and SECRET documents, the LLM synthesizes them — the user gets SECRET-derived information embedded in a CUI answer. This is a critical security violation. |
| --- |

**▌ MULTI-LEVEL SECURE (MLS) AI ARCHITECTURE**

| ARCHITECTURE: 4 PHYSICALLY SEPARATE AI STACKS Principle: No single system touches documents at multiple classification levels. Cross-level synthesis is architecturally impossible, not just policy-restricted. ┌──────────────────────────────────────────────────────┐ │  UNCLASSIFIED STACK    │  Air-gapped compute node A  │ │  LLM: Llama-3-70B      │  Vector DB: Qdrant          │ │  Documents: UNCLAS only │  No network to other stacks │ └──────────────────────────────────────────────────────┘ ┌──────────────────────────────────────────────────────┐ │  CUI STACK             │  Air-gapped compute node B  │ │  LLM: Llama-3-70B      │  Vector DB: Qdrant          │ │  Documents: CUI + UNCLAS│  One-way read from UNCLAS  │ └──────────────────────────────────────────────────────┘ ┌──────────────────────────────────────────────────────┐ │  SECRET STACK          │  Air-gapped compute node C  │ │  LLM: Fine-tuned Llama │  Vector DB: Qdrant          │ │  Documents: S + CUI    │  SCIF-equivalent controls   │ └──────────────────────────────────────────────────────┘ ┌──────────────────────────────────────────────────────┐ │  TS STACK              │  Highest security enclave   │ │  LLM: Fine-tuned Llama │  Vector DB: Qdrant          │ │  Documents: TS + below │  Biometric access only      │ └──────────────────────────────────────────────────────┘ USER ROUTING: → Clearance verified at SSO → User routed to their MAX clearance stack ONLY → CUI user → CUI stack (cannot query SECRET stack at all) → No cross-stack API calls of any kind |
| --- |

**▌ THE INFERENCE ATTACK PROBLEM — ADDITIONAL CONTROLS**
**Query logging and anomaly detection:**Flag query patterns that suggest a user is attempting to reconstruct classified information through aggregated unclassified queries.
**Output classification review:**For SECRET and TS stacks: every LLM output passes through an automated classification scanner before being shown. If output contains content that pattern-matches classified categories, it is flagged for review.
**Prompt injection guards:**Defense systems are high-value targets for prompt injection. Every user query sanitized before injection into the LLM context.
**Fine-tuning for refusal:**Models fine-tuned to refuse questions that attempt to cross-reference documents at different classification levels within their scope.

| S9 | AI Transformation Hits Organizational Resistance — The Architecture is Fine, Adoption is Zero | HARD | Org Transformation |
| --- | --- | --- | --- |

| You have spent 9 months building a best-in-class enterprise AI platform. The architecture is sound, the security is approved, the models perform well. Adoption is 4%. An internal survey reveals: 'I don't trust it.' 'It's not relevant to my actual work.' 'My manager told me not to use it because it might replace my job.' The CEO asks you in a board meeting: 'We have spent $12M on this platform. Why is no one using it?' What do you say — and more importantly, what do you do? |
| --- |

Whether you understand that technology transformation is 80% organizational change management
Whether you can take accountability for a failure without deflecting to 'the users don't understand'
Enterprise architect maturity: can you see past the technical layer to the human system?
Practical change management approaches — not just theory

**▌ YOUR ANSWER TO THE CEO — HONEST AND DIRECT**

| 'We built the right architecture and the wrong adoption strategy. The platform is technically sound, but we designed it for use cases we believed were valuable, not use cases employees actually need help with. We also underestimated the trust and change management work required. I own that. Here is what we are changing.' |
| --- |

**▌ THE ADOPTION ARCHITECTURE — NOT A TECHNOLOGY PROBLEM**

| 1 — Embed, don't broadcast | Stop sending company-wide announcements. Go to the 3 highest-influence teams who have a real pain point. Solve one specific problem brilliantly. Let word of mouth do the rest. Adoption is social. |
| --- | --- |
| 2 — Use case discovery (bottom-up) | Run structured interviews with 50 frontline employees: 'What do you spend time on that feels like it should be automatable?' Build the AI roadmap from these answers, not from what architects thought was valuable. |
| 3 — Visible wins fast | Identify one workflow that AI can improve measurably in under 2 weeks. Deploy it. Measure it. Publicize the result internally with real numbers and real quotes from the team that used it. |
| 4 — Address the job fear directly | Don't dismiss it or paper over it with corporate messaging. Have real conversations. Show how AI is being used to eliminate tedious work, not jobs. Where there are honest retraining risks, address those at the HR level — not the AI level. |
| 5 — Manager enablement | Managers are blocking adoption. Run a 2-hour AI Foundations session for every manager. The goal is not AI literacy — it is permission: managers need to feel safe letting their teams experiment. |
| 6 — Measure adoption differently | Stop measuring 'users registered.' Measure: 'workflows improved,' 'hours saved,' 'decisions supported.' Tie AI adoption metrics to business outcomes, not usage metrics. |

**▌ THE ARCHITECTURE CHANGES THAT ENABLE ADOPTION**
**Reduce friction to zero:**If onboarding takes more than 5 minutes, adoption fails. SSO, no separate login, available in tools people already use (Teams, Slack, email).
**In-context availability:**AI should appear where work happens — inside the document editor, inside the CRM, inside the ticket system. Not as a separate portal people must navigate to.
**Explainability for trust:**Every AI output should show why: what sources it used, what it's uncertain about, what a human should verify. Black-box outputs destroy trust.
**Quick feedback loop:**One-click 'this was wrong' or 'this was helpful' on every AI output. Show users that feedback improves the system. This builds trust over time.

| S10 | Design the Next-Generation Enterprise AI Architecture — 3-Year Horizon | EXTREME | Strategic Architecture |
| --- | --- | --- | --- |

| The board has asked you to present a 3-year enterprise AI architecture roadmap. The organization currently has: 200 AI models in production, a multi-cloud footprint (AWS/Azure/GCP), a patchwork governance framework, no agent mesh, and an AI cost base of $4M/month growing at 15% monthly. The CEO wants to know: where are we going, what does the architecture look like at the end, and what is the path to get there? You have 20 minutes to present to the board. What is your architecture vision? |
| --- |

Can you synthesize everything — technical depth, governance, cost, org — into a coherent vision?
Is your vision forward-looking and specific, or generic and buzzword-heavy?
Can you communicate architecture to a board-level audience?
Do you understand that architecture is a means to business outcomes, not an end in itself?

**▌ THE VISION — 'THE COMPOSABLE AI ENTERPRISE'**

| In 3 years, AI is not a set of products we deploy. It is the operating system of the enterprise. Every business process has an AI layer. Every decision is augmented. The infrastructure is invisible to employees — AI is embedded in every tool they already use. And we govern it as rigorously as we govern our financial systems. |
| --- |

**▌ THREE-HORIZON ARCHITECTURE ROADMAP**

| HORIZON 1 (MONTHS 0–12): FOUNDATION — 'Govern & Consolidate' Target state: 200 models → governed, observable, cost-optimized Key deliverables: → Central Model Registry (all models catalogued, versioned, monitored) → AI Cost Optimization Platform (caching, routing, compression) — target: $4M → $2M/mo → Enterprise Data Classification Layer (governs what data can go where) → AI Governance Council + Tiered Risk Framework → Shadow AI remediated: 300+ employees on sanctioned tools HORIZON 2 (MONTHS 12–24): INTEGRATION — 'Connect & Orchestrate' Target state: Agents collaborating across business functions Key deliverables: → Enterprise Agent Mesh (20 specialized agents, orchestrated via MCP) → Jurisdiction-Aware Data Plane (GDPR, MAS FEAT, EU AI Act compliant) → AI Embedded in Core Platforms: CRM, ITSM, ERP, HR, Finance → Developer AI Platform: internal teams can build and deploy AI products in days, not months, on top of governed infrastructure → LLMOps Maturity Level 3: automated drift detection, eval pipelines, shadow deployments, cost attribution per product HORIZON 3 (MONTHS 24–36): TRANSFORMATION — 'Autonomous Enterprise' Target state: AI-native business processes Key deliverables: → Full Agent Mesh (50+ agents), handling end-to-end business workflows → Predictive AI: proactive recommendations, not just reactive Q&A → AI-augmented decision intelligence: every major business decision has an AI layer providing data synthesis, scenario modeling, risk flags → Continuous learning loop: production data feeds model improvement with human oversight and governance controls → AI cost base: $4M/mo → $2M/mo (by Horizon 1) → stabilized at $3M/mo supporting 10x the AI capability through efficiency and scale |
| --- |

**▌ THE BOARD-LEVEL BUSINESS CASE**

| Horizon | Investment | Expected Return | Key Risk |
| --- | --- | --- | --- |
| H1 — Foundation | $3M (year 1) | $2M/yr cost savings + risk reduction | Change management resistance |
| H2 — Integration | $5M (year 2) | $15M/yr productivity & revenue | Governance gaps in agent mesh |
| H3 — Transformation | $4M (year 3) | $40M+ competitive differentiation | Regulatory environment shift |

**▌ THE CLOSING STATEMENT — YOUR VISION IN ONE PARAGRAPH**

| 'The organizations that win the next decade will not be the ones with the most AI models. They will be the ones with the best AI infrastructure — governed, composable, and embedded into how every employee works. Our 3-year roadmap is not an AI strategy. It is a business transformation strategy that uses AI as its primary lever. The architecture I've described is designed to make that transformation durable, not fragile — so that when the models change, the regulations change, and the market changes, our foundation holds.' |
| --- |

*Enterprise Architect – Gen & Agentic AI  |  Hard Scenario Interview Prep  |  Confidential  |  March 2026*
