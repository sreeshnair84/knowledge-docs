---
title: "FDE Role Skills & Study Map"
date_created: 2026-07-13
last_reviewed: 2026-07-13
status: current
source_type: native-md
source_file: ""
tags: ["interview-prep", "fde", "skills", "study-guide"]
doc_type: study-guide
target_role: "Forward Deployed Engineer"
---

# FDE Role: Complete Skills & Study Map

This guide breaks the Forward Deployed Engineer role into six skill clusters, maps each to its engagement phase, and links directly to the study guides in this knowledge base that build the skill.

Ratings are on a 1–5 depth scale:
- **★★★★★** — Core competency; FDE interviews test this heavily
- **★★★★☆** — Important differentiator; frequently tested
- **★★★☆☆** — Baseline required; seldom deep-dived in interviews
- **★★☆☆☆** — Helpful but not gate-keeping

---

## Skill Cluster 1 — LLM Engineering in Production

> **Engagement phase this applies to:** All phases. FDEs write LLM code from Day 1.

This is the hardest to fake: FDE interviewers ask you to debug a broken prompt live, design an evaluation harness on a whiteboard, or explain why your context window strategy failed. Surface-level LLM knowledge does not pass.

| Skill | Depth | Study Guide |
|-------|-------|------------|
| Prompt engineering: structured outputs, few-shot, chain-of-thought | ★★★★★ | [Prompt Engineering for Claude 4](../../coding-tools/claude/prompt-engineering-claude-4) |
| Context window management and token budgeting | ★★★★★ | [Claude API Mastery](../../coding-tools/claude/claude-api-mastery) |
| Model selection — Claude Haiku vs Sonnet vs Opus, cost/latency trade-offs | ★★★★☆ | [Claude Models 2026](../../coding-tools/claude/claude-models-2026) |
| Streaming, batching, and async LLM calls | ★★★★☆ | [Claude API Mastery](../../coding-tools/claude/claude-api-mastery) |
| System prompt architecture for enterprise constraints | ★★★★★ | [Prompt Engineering for Claude 4](../../coding-tools/claude/prompt-engineering-claude-4) |
| Hallucination mitigation: grounding, citations, verification loops | ★★★★★ | [Grounding Strategies](../../knowledge-engineering/industry-practices/grounding) |
| Extended thinking / long-context reasoning patterns | ★★★☆☆ | [Claude Models 2026](../../coding-tools/claude/claude-models-2026) |

**Key interview questions in this cluster:**
- "Walk me through a production prompt that failed — what did you change and how did you measure the improvement?"
- "How would you handle a case where the model consistently hallucinates specific field names from a legacy schema?"
- "Design a context management strategy for a 50-document due diligence workflow."

---

## Skill Cluster 2 — Agent Architecture & Development

> **Engagement phase this applies to:** Prototype (Weeks 3–5), Production Hardening (Weeks 8–10)

FDEs at Anthropic build MCP servers, sub-agents, and agent skills as deliverables. You need to understand both the design patterns *and* the code.

| Skill | Depth | Study Guide |
|-------|-------|------------|
| Agentic workflow design: orchestrator + subagent patterns | ★★★★★ | [Agent Skills — Enterprise Platform Research](../../agentic-systems/skill/enterprise/foundations-what-is-an-agent-skill) |
| Tool definition and tool-calling best practices | ★★★★★ | [Tool Definition Best Practices](../../agentic-systems/skill/enterprise/tool-definition-best-practices) |
| Multi-agent orchestration (A2A patterns) | ★★★★☆ | [A2A Orchestration Patterns](../../workflow-orchestration/a2a-orchestration-patterns) |
| Agent memory: in-context, external, episodic | ★★★★☆ | [Agent Memory & Planning Architecture](../../enterprise-architecture/ai-architecture/agent-memory-planning-architecture) |
| Human-in-the-loop (HITL / HOTL) patterns | ★★★★☆ | [Human-in-the-Loop Architectures](../../workflow-orchestration/human-in-the-loop-architectures) |
| Agent failure modes: infinite loops, tool abuse, scope drift | ★★★★★ | [Architecture Patterns, Anti-Patterns & Case Studies](../../agentic-systems/skill/enterprise/architecture-patterns-antipatterns-and-case-studies) |
| Claude Agent SDK — production patterns | ★★★★★ | [Claude Agent SDK — Production](../../coding-tools/claude/claude-agent-sdk-production) |
| Skill composition and instructions engineering | ★★★★☆ | [Composition & Instructions Engineering](../../agentic-systems/skill/enterprise/composition-and-instructions-engineering) |

**Key interview questions in this cluster:**
- "A customer's approval workflow has 12 steps. Which ones do you automate, and which do you keep human? How do you decide?"
- "Your agent is calling a search tool 30 times per user request. How do you diagnose and fix this?"
- "Design a multi-agent system for contract analysis at a law firm — what are your orchestration choices?"

---

## Skill Cluster 3 — MCP, Protocols & Enterprise Integration

> **Engagement phase this applies to:** Technical Assessment (Weeks 3–4), Prototype (Weeks 4–6)

At Anthropic, FDEs build MCP servers as customer deliverables. You need to know the protocol deeply, not just at the "what is MCP" level.

| Skill | Depth | Study Guide |
|-------|-------|------------|
| MCP architecture: server/client/transport model | ★★★★★ | [MCP Deep Research 2026](../../ai-protocols/mcp/MCP_Deep_Research_2026) |
| Building production MCP servers (tools, resources, prompts) | ★★★★★ | [MCP Deep Research 2026](../../ai-protocols/mcp/MCP_Deep_Research_2026) |
| MCP security: OAuth 2.1, mTLS, enterprise auth | ★★★★★ | [MCP Enterprise Security & Governance](../../ai-protocols/mcp/MCP_Enterprise_Security_Governance_Operations_2026) |
| Tool authentication connectors (Entra ID, AWS AgentCore, OIDC) | ★★★★★ | [Tool Authentication & Connectors](../../ai-protocols/auth/tool-authentication-connectors) |
| A2A protocol for agent-to-agent communication | ★★★★☆ | [MCP / A2A Protocol Deep Dive](../../enterprise-architecture/ai-architecture/mcp-a2a-protocol-deep-dive) |
| API gateway integration (Kong, APIM) | ★★★☆☆ | [Kong AI Gateway Guide](../../cloud-platforms/ai-gateway/kong-ai-gateway-guide) |
| Enterprise data connector patterns (SharePoint, Salesforce, SAP) | ★★★★☆ | [Marketplace Connector Auth Patterns](../../ai-protocols/auth/marketplace-connector-auth-patterns) |
| Agent identity and delegation flows | ★★★★☆ | [Agent Identity — Entra vs AWS AgentCore](../../ai-protocols/auth/agent-identity-entra-vs-awsagentcore) |

**Key interview questions in this cluster:**
- "A customer wants Claude to query their Salesforce CRM and their internal data warehouse. Design the MCP server architecture."
- "How do you handle user-level data isolation when multiple employees share one Claude deployment?"
- "What breaks first in an MCP server under high concurrent load, and how do you prevent it?"

---

## Skill Cluster 4 — RAG Pipelines & Knowledge Systems

> **Engagement phase this applies to:** Technical Assessment, Prototype, Production

Most enterprise deployments require retrieval-augmented generation. FDEs often inherit poorly designed RAG systems from previous POCs and must fix them fast.

| Skill | Depth | Study Guide |
|-------|-------|------------|
| RAG fundamentals: chunking, embedding, retrieval, reranking | ★★★★★ | [Complex RAG Deep Dive](../../knowledge-engineering/knowledge/Complex_RAG_Deep_Dive) |
| Grounding strategies: citations, source attribution, verification | ★★★★★ | [Grounding](../../knowledge-engineering/industry-practices/grounding) |
| Hybrid retrieval: dense + sparse (BM25 + vector) | ★★★★☆ | [Complex RAG Deep Dive](../../knowledge-engineering/knowledge/Complex_RAG_Deep_Dive) |
| Knowledge graph integration with RAG | ★★★☆☆ | [Enterprise Knowledge Architectures](../../knowledge-engineering/knowledge/Enterprise_Knowledge_Architectures_Report) |
| Document preprocessing: OCR, PDF/DOCX parsing, table extraction | ★★★★☆ | [Data Architecture for AI](../../knowledge-engineering/data/Data_Architecture_for_AI_Report) |
| RAG evaluation: faithfulness, relevance, answer completeness | ★★★★★ | [Evaluation Strategies](../../knowledge-engineering/industry-practices/evaluation) |
| Autonomous knowledge engineering and self-updating knowledge bases | ★★★☆☆ | [Autonomous Knowledge Engineering](../../knowledge-engineering/knowledge/Autonomous_Knowledge_Engineering_System) |

**Key interview questions in this cluster:**
- "Your RAG system retrieves the right document but the model still gives a wrong answer. What are the three most likely causes?"
- "Design a RAG pipeline for a legal firm where every answer must cite the exact clause number and document section."
- "A customer's vector store has 10M documents. Their retrieval latency is 4 seconds. What do you change?"

---

## Skill Cluster 5 — Evaluation, Observability & Production Reliability

> **Engagement phase this applies to:** Evaluate (Weeks 6–7), Production (Weeks 8–10), Scale (Weeks 11–12)

This is often the weakest cluster for engineers who come from research or startup backgrounds. Enterprise FDEs must prove value scientifically — not just demo well.

| Skill | Depth | Study Guide |
|-------|-------|------------|
| Evaluation framework design: metrics, test sets, baselines | ★★★★★ | [AI Agent Evaluation Framework](../../ai-development/testing/AI_Agent_Evaluation_Framework_Guide) |
| LLM-as-judge patterns | ★★★★★ | [AI Agent Evaluation Framework — Complete](../../ai-development/testing/AI_Agent_Evaluation_Framework_Complete) |
| Agent observability: tracing, span logging, prompt logging | ★★★★★ | [Observability & Evaluation](../../agentic-systems/skill/enterprise/observability-and-evaluation) |
| Production monitoring: latency, cost, error rates, hallucination rate | ★★★★☆ | [Agentic AI Reliability, Observability & Governance](../../enterprise-architecture/ai-architecture/agentic-ai-reliability-observability-governance) |
| Reliability patterns: retries, circuit breakers, fallback models | ★★★★☆ | [Agent Reliability Engineering](../../enterprise-architecture/ai-architecture/agent-reliability-engineering) |
| A/B testing LLM configurations in production | ★★★☆☆ | [Agent Testing, Monitoring & Evaluation](../../ai-development/testing/Agent_Testing_Monitoring_Evaluation) |
| ROI measurement and business KPI tracking | ★★★★★ | [AI Value Creators Synthesis](../../ai-economics/ai-value-creators-synthesis) |

**Key interview questions in this cluster:**
- "How do you know when your agent is 'ready' for production? What's your go/no-go checklist?"
- "A customer asks: 'Is our AI actually saving us time?' How do you design the measurement framework?"
- "Your production agent's accuracy drops from 94% to 78% after a knowledge base update. How do you diagnose and roll back safely?"

---

## Skill Cluster 6 — Customer Engagement, EA & Transformation

> **Engagement phase this applies to:** Discovery (Weeks 1–2), all stakeholder touchpoints

FDEs are not just engineers — they run discovery, translate between business and tech, manage stakeholder conflict, and align executives on value. This is often the deciding differentiator in FDE interviews at senior levels.

| Skill | Depth | Study Guide |
|-------|-------|------------|
| Structured discovery: process mapping, pain point elicitation | ★★★★★ | [Enterprise AI Architect Deep Dive Guide](../../enterprise-architecture/process/Enterprise_AI_Architect_Deep_Dive_Guide) |
| AI use case prioritisation: impact vs. feasibility vs. risk | ★★★★★ | [Enterprise AI Transformation Blueprint](../../enterprise-architecture/strategy/Enterprise_AI_Transformation_Blueprint_CTO_Guide_2026) |
| Executive communication: translating technical results to business outcomes | ★★★★★ | [Executive Communication Framework](../../enterprise-architecture/framework/Executive_Communication_Framework_Guide) |
| AI maturity assessment | ★★★★☆ | [Current State Assessment & AI Maturity](../../enterprise-architecture/transformation/Current_State_Assessment_and_AI_Maturity) |
| Change management and adoption | ★★★★☆ | [Target Operating Model & Change](../../enterprise-architecture/transformation/Target_Operating_Model_and_Change) |
| Security and compliance in regulated industries | ★★★★★ | [Agentic AI Security Guardrails](../../enterprise-architecture/ai-architecture/agentic-ai-security-guardrails) |
| Enterprise governance and AI lifecycle | ★★★★☆ | [Governance & Lifecycle](../../agentic-systems/skill/enterprise/governance-and-lifecycle) |
| ROI framing and business case construction | ★★★★☆ | [AI Economics — Cost & Implementation](../../ai-economics/AI_Cost_Implementation_Guide_2026) |

**Key interview questions in this cluster:**
- "You've identified six use cases in discovery. The customer wants to do all six at once. What do you say?"
- "The CISO has just blocked your production deployment 48 hours before the demo. Walk me through your response."
- "A VP of Operations says 'AI can't do what my analysts do.' How do you move them?"

---

## Self-Assessment Matrix

Rate yourself honestly before your interview. The scoring guide:

```
1 = Heard of it but never built it
2 = Built it in a toy project or tutorial
3 = Shipped it in a non-critical production system
4 = Shipped it in enterprise production; debugged production failures
5 = Can design, teach, and defend architecture choices under pressure
```

| Skill | Your Score (1–5) | Priority to Study |
|-------|-----------------|------------------|
| Advanced prompt engineering | | |
| Production agent with tool use | | |
| MCP server construction | | |
| RAG pipeline (chunking → retrieval → eval) | | |
| Evaluation harness design | | |
| Structured discovery facilitation | | |
| Executive communication of AI value | | |
| Security review for enterprise AI | | |

**Target for senior FDE (Anthropic/OpenAI level):** All rows at ≥ 4. Any row at ≤ 2 is a hiring risk at top-tier companies.

---

## FDE vs. EA Skills Overlap

If you are an Enterprise Architect moving to FDE, these are your existing strengths — and the gaps to fill:

| Skill | EA brings | FDE additionally needs |
|-------|-----------|----------------------|
| Architecture patterns | ✅ Strong | Production code to validate the pattern |
| Stakeholder management | ✅ Strong | Speed: FDE discovery is 2 weeks, not 6 months |
| Governance & compliance | ✅ Strong | — |
| LLM engineering | ⚠️ Usually shallow | Production prompt/agent code, eval harness |
| MCP / tool construction | ❌ Typically none | Full protocol and security implementation |
| RAG pipeline | ⚠️ Conceptual only | End-to-end build including preprocessing |
| Evaluation science | ❌ Typically none | Automated test suites, LLM-as-judge, baselines |

---

## Recommended Study Order (12-Week Interview Prep Plan)

| Weeks | Focus | Pages to Read |
|-------|-------|--------------|
| 1–2 | LLM fundamentals + Claude API | Prompt Engineering · Claude API Mastery · Claude Models |
| 3–4 | Agent architecture + tools | Agent Skills Enterprise series (all 11 chapters) |
| 5–6 | MCP + auth + protocols | MCP Deep Research · MCP Security · Tool Auth Connectors |
| 7–8 | RAG + knowledge systems | Complex RAG Deep Dive · Grounding · Evaluation |
| 9–10 | Evaluation + observability | AI Agent Evaluation series · Reliability & Observability |
| 11–12 | EA + transformation + communication | Transformation series · Executive Communication · AI Maturity |

---

---

## Complex Interview Scenarios — FDE & Architect Level

Senior FDE and Principal Architect interviews use open-ended system design + judgment scenarios. There is no single correct answer — you are evaluated on reasoning, trade-off awareness, and production instinct.

---

### Scenario Set 1 — System Design Under Constraints

**Scenario 1A: The Compliance Minefield**

> A $30B insurer wants Claude to auto-generate first drafts of claims adjusters' decision letters. The letters cite specific policy clauses, are legally binding, and in some jurisdictions are subject to IFRS 17 disclosure requirements. The CIO wants a demo in 3 weeks. How do you structure the engagement?

Strong answer elements:
- Push back on 3-week demo: discovery must come first; shadow adjusters for at least 1 week before proposing architecture
- HITL is non-negotiable for legally binding documents: the model drafts, the adjuster approves, the letter comes from the adjuster — model is never the author
- Evaluate before demo: semantic faithfulness to policy text, citation accuracy, regulatory clause check
- IFRS 17 requires the *adjuster* to be the accountable party — name this explicitly
- Prompt injection risk: claimant-submitted free-text enters the context and must be sanitised

Weak answer: jumping to architecture before regulatory framing; proposing a fully automated workflow; accepting the 3-week timeline as fixed.

---

**Scenario 1B: The Scale Problem**

> Your production agent processes 200 requests/hour. The customer wants to scale to 2,000/hour. Your MCP server wraps a third-party API rate-limited to 100 req/min. What breaks and how do you fix it?

Strong answer elements:
- 100 req/min = 6,000/hr. At 2,000 concurrent requests each triggering multiple tool calls, the real cap is much lower
- Fixes: request queuing + backpressure in MCP server; result caching for repeated queries; batching where the API supports it; async processing with webhook response
- Cost analysis: at 10× volume, API cost and token cost both scale — recalculate unit economics before committing
- Advantage of MCP architecture: the underlying API connector is swappable without touching agent code
- Load test with the customer's actual request distribution before committing to a timeline

Weak answer: "just add more servers" without addressing the rate limit; ignoring cost; no load testing plan.

---

**Scenario 1C: The Inherited POC**

> You inherit a customer's existing Claude deployment — 8 months of work. It has: no evaluation harness, no audit logs, prompt in a .py file with "DO NOT CHANGE THIS EVER", Salesforce credentials hardcoded as strings, "about 80% accurate but we're not sure how we measure that." Customer wants production in 6 weeks. What do you do in Week 1?

Strong answer — Week 1 is entirely diagnosis:
- Do not touch the prompt. Do not touch the architecture. Diagnose only.
- Immediate security fix: rotate hardcoded credentials to Key Vault. This is non-negotiable and doesn't affect functionality.
- Build the evaluation dataset first: what does "80% accurate" actually mean? Get ground truth labels from end users.
- Read the prompt in full: map every line to a known behaviour, or document that its purpose is unknown.
- Talk to the users: what does the 20% failure look like? Minor formatting or wrong decisions?
- Be honest with the customer: 6 weeks to production is possible only if diagnosis is clean. If the foundation is broken, 6 weeks to *safe* production is not achievable.

Weak answer: starting to "improve the prompt" before diagnosing; accepting the 6-week timeline without investigation.

---

### Scenario Set 2 — Stakeholder Conflict

**Scenario 2A: The CISO vs. The Champion (Friday 17:00 Email)**

> Two weeks from production. CISO sends email at 17:00 Friday: "I'm not comfortable with the model receiving any data from our ERP. Production is blocked." Champion calls you at 17:30, furious. What do you do in the next 2 hours? What do you do Monday?

Next 2 hours:
- Do not take either side. Acknowledge both parties. Do not over-promise to either.
- Contact the CISO directly — not via email. Ask for the specific concern: data residency? PII? A specific field? "Not comfortable" is not an actionable finding.
- Assess: is this concern addressable in 2 days or 2 weeks?

Monday:
- One meeting with both CISO and champion — not separate calls. Present the specific concern and the specific remediation.
- If the concern is legitimate and unresolvable in the current timeline: parallel path. Go live with non-ERP components; prove value; reintroduce ERP post-remediation.

Weak answer: promising the champion you'll "sort it out"; sending a long technical email to the CISO at 17:30; treating a technical risk as a political dispute.

---

**Scenario 2B: The Scope Creep Bomb**

> Three weeks into a 14-week engagement, your champion presents six new requirements from a weekend board presentation: real-time processing (you designed batch), multi-language support, mobile UI, three new data source integrations, GDPR delete-on-request for AI outputs, and a board demo in 10 days. How do you respond?

Strong answer:
- Do not say yes to anything in this conversation. Take notes. Ask which of the six are contract requirements vs. requests.
- Real-time vs. batch is an architectural change — not a configuration. Requires formal impact assessment.
- Each language needs its own evaluation dataset. That work does not exist yet. This is a multi-week item per language.
- GDPR delete-on-request for AI outputs requires logging what was generated, by whom, and a deletion mechanism. Name the engineering effort.
- Board demo in 10 days: achievable with current scope only. Scope changes go after the demo.
- Write a scope change request for each new requirement. Each either adds time or removes something else.

Weak answer: agreeing to all six requirements; "we'll figure it out as we go."

---

### Scenario Set 3 — Architecture Trade-offs (Architect Level)

**Scenario 3A: Multi-Agent vs. Single-Agent for Invoice Processing**

> A logistics company wants an AI system that: (1) reads incoming carrier invoices (PDF), (2) matches to POs in ERP, (3) flags discrepancies, (4) drafts approval/dispute letters, (5) routes to correct approver by invoice value. Single orchestrator or multi-agent?

Strong answer — multi-agent:
- Each sub-task has different latency, failure modes, and retry requirements. Bundling all five creates an all-or-nothing failure mode.
- **Invoice Parser Agent**: vision model for PDFs → structured data
- **Matching Agent**: ERP via MCP server; deterministic, not model-heavy
- **Discrepancy Analyzer**: LLM reasoning on structured mismatch
- **Letter Drafter**: structured input → formatted output
- **Routing Agent**: rule-based (not LLM) — invoice value → approver lookup table
- Each agent gets its own evaluation harness; failures are isolated
- HITL at two points: discrepancy review before draft; letter approval before send
- Counter-argument for single agent: when all tasks share expensive-to-reconstruct context; when the team can't maintain multiple agents; when the workflow is short. This case doesn't meet that bar.

---

**Scenario 3B: RAG vs. Fine-tuning for a 40,000-Document Pharma Corpus**

> A pharmaceutical company has 40,000 SOPs and regulatory submissions. They want an AI assistant that answers researcher questions with citations. The Chief Scientist wants fine-tuning. The legal team flags IP concerns. You are the architect. What is your recommendation?

Strong answer — RAG:
- RAG provides citations; fine-tuning cannot cite source documents — and citation is the core requirement here
- RAG corpus is updatable without retraining; SOPs change frequently in pharma
- Fine-tuning embeds knowledge into model weights — the IP concern is legitimate and non-trivial
- Fine-tuning improves *style*, not *knowledge recall*; RAG is the right tool when factual accuracy with attribution is the goal
- Evaluation: RAGAS framework — faithfulness, answer relevance, context recall
- What would change the recommendation: primary need is tone/style adherence (fine-tuning helps); corpus is small and fully static; latency requirements can't accommodate retrieval

Hybrid path: RAG with a fine-tuned domain-specific reranker on pharma terminology.

---

**Scenario 3C: The 90-Day Contract vs. Right Delivery**

> Four weeks in, you determine the correct architecture needs 16 weeks. The contract says 90-day delivery. The AE says "just show something working." What do you do?

Strong answer:
- "Something working" and "production-ready" are not the same thing. Conflating them is how POCs die in production and accounts churn.
- Present the trade-off to the champion: 10-week narrow-scope MVP in production with eval framework vs. 16-week full-scope solution. Both are valid; the client chooses with clear expectations.
- Write down the scope of each phase. Get confirmation in email.
- What you do NOT do: ship an unevaluated system that breaks in production.
- If the AE is actively pressuring you to bypass the evaluation: escalate to your FDE manager. This is not a situation to resolve alone.

---

### Scenario Set 4 — Production Incidents

**Scenario 4A: Accuracy Drops from 94% to 76% with No Code Changes**

Diagnostic protocol — name these in order:
1. **Data pipeline first**: has the settlement feed format changed? New column in Salesforce? Mandate schema update?
2. **Freshness check**: has the mandate vector index been refreshed since the last mandate update?
3. **Audit log analysis**: pull the failing cases — patterns by account? instrument class? rule type?
4. **Reproduce in harness**: is this reproducible (systematic) or stochastic (non-deterministic)?
5. **Prompt injection audit**: any new content types in the input?
6. **Model version check**: has the API model been silently updated?
7. **Only after steps 1–6**: consider whether the prompt needs revision.

Weak answer: "let's update the prompt" as step 1.

---

**Scenario 4B: LLM-as-Judge vs. Human Reviewer Disagree on 15% of Cases**

Strong answer:
- Neither is ground truth. A 15% disagreement zone indicates specification ambiguity, not a wrong party.
- Diagnose the 15%: is it systematically the same rule type, account, or instrument class? If yes, the ambiguity is localised and can be resolved with a precise rule update.
- If evenly spread: the mandate language itself may be genuinely ambiguous — long-term fix is mandate clause precision, not model tuning.
- For now: flag the disagreement cases as requiring *senior human review* — not resolved by either the judge or the standard reviewer.
- The judge was calibrated on the original dataset; if the business has changed (new instruments, mandate amendments), the judge's calibration is stale and must be updated.

---

### Architect-Level Scenarios

**Scenario 5A: Central Platform vs. 12 Separate Deployments (50,000-Person Institution)**

Strong answer — shared platform with BU-specific layers:
- **Shared platform layer** (don't rebuild ×12): model routing, authentication, audit logging, cost governance, rate limiting, credential management, security review templates
- **BU-specific layer**: MCP servers (each BU has different source systems), system prompts (different workflows), evaluation harnesses (different ground truth)
- **Governance layer**: central registry of agent skills; data classification to enforce cross-BU data access rules
- What fails if you build 12 separate deployments: security reviews ×12; a prompt injection fix goes into 11 of 12 deployments; cost governance is invisible; credential rotation is unmanaged
- What fails if you centralise too aggressively: different BUs have different regulatory requirements; a platform outage affects all 12 simultaneously; BU teams can't move at their own pace

---

**Scenario 5B: Build vs. Buy vs. Managed Service — Give an Honest Answer**

Strong answer with explicit conflict-of-interest disclosure:
- **Build**: correct when AI capability is core competitive differentiation and they have 10+ engineers dedicated. Timeline: 12–18 months to stability. Most teams underestimate evaluation, observability, and security engineering.
- **Buy**: correct when they want speed and accept vendor's opinionated stack. Risk: vendor lock-in; pricing scales poorly with usage; patterns may not fit their workflows.
- **Managed service (TechAxis)**: correct when they want outcomes without platform engineering overhead. Risk: TechAxis dependency; harder to in-source later.
- Disclosure: as TechAxis FDE, you have a conflict of interest recommending Option C. Name it. Then give your actual recommendation based on what you've observed about their engineering capability.

A strong FDE names the conflict. A weak one ignores it.

---

*Last reviewed: 2026-07-13 | Sources: Anthropic job listings, Palantir FDE specs, fde.academy, tryexponent.com*
