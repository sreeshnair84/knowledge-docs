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

*Last reviewed: 2026-07-13 | Sources: Anthropic job listings, Palantir FDE specs, fde.academy, tryexponent.com*
