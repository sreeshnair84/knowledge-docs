---
title: "Part 14 — AI Observability"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
source_file: ""
tags: ["ai-observability", "tracing", "prompt-tracing", "token-analytics", "cost-analytics", "hallucination-metrics", "drift", "evaluation-dashboard"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 14 — AI Observability

> **Report Context:** Part 14 of the [Enterprise AI Research Report](./index). Authoritative guides are in the **AI Security Governance**, **Enterprise Architecture**, and **Agentic UI** sections — this page maps the full AI observability framework and links to each area.

---

## Why AI Observability Is Different

Traditional observability (metrics, logs, traces) answers: *Is the system up? Is it fast? Are there errors?*

AI observability must additionally answer:
- Is the AI producing **correct, safe, grounded** outputs?
- Is the AI **hallucinating** and at what rate?
- Is the AI's quality **drifting** over time (without any code change)?
- Is the AI **behaving as expected** (agent task completion, tool usage patterns)?
- What is the AI **costing** per user / per use case / per team?
- Are business outcomes **improving** as a result of AI?

---

## AI Observability Pillars

```
┌──────────────────────────────────────────────────────────────┐
│                    AI OBSERVABILITY                           │
├──────────────┬───────────────────────────────────────────────┤
│  TECHNICAL   │  QUALITY          │  BUSINESS                 │
│  SIGNALS     │  SIGNALS          │  SIGNALS                  │
├──────────────┼───────────────────┼───────────────────────────┤
│ Availability │ Evaluation scores │ Task completion rate       │
│ Latency      │ Hallucination rate│ Business KPI movement      │
│ Error rate   │ Retrieval quality │ User satisfaction (NPS)   │
│ Token count  │ Safety violations │ Cost per business outcome  │
│ Cost         │ Bias metrics      │ Adoption metrics           │
├──────────────┴───────────────────┴───────────────────────────┤
│  AGENT-SPECIFIC SIGNALS                                       │
│  Task completion, HITL rate, tool error rate, loop detection  │
│  Agent cost, agent latency, delegation depth                  │
├─────────────────────────────────────────────────────────────┤
│  DRIFT SIGNALS                                               │
│  Model drift · Knowledge drift · Prompt drift                │
│  Memory drift · Agent drift · Data drift                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Tracing

### Distributed Tracing for AI
AI systems are multi-component: user → AI gateway → LLM → retrieval → tool → response. Distributed tracing captures the full request path, latency at each hop, and the decision made at each stage.

**Standard:** OpenTelemetry (OTel) with LLM-specific semantic conventions.

**Key trace attributes for AI:**
```
gen_ai.system: "anthropic"
gen_ai.operation.name: "chat"
gen_ai.model: "claude-sonnet-4-6"
gen_ai.request.model: "claude-sonnet-4-6"
gen_ai.usage.input_tokens: 1234
gen_ai.usage.output_tokens: 456
gen_ai.request.temperature: 0.1
gen_ai.response.finish_reason: "end_turn"
```

### Prompt Tracing
Record the exact prompt sent to the LLM (system prompt + user input + retrieved context) for every request. Essential for debugging and audit.

**Privacy consideration:** Prompt traces may contain PII. Apply masking rules before storing.

### Context Tracing
Track what was retrieved from the knowledge base for each request:
- Which chunks were retrieved
- Retrieval scores
- Whether retrieved content was actually used in the response (faithfulness signal)

### Agent Tracing
For agentic systems, trace the full agent execution graph:
- Every reasoning step
- Every tool call (inputs, outputs, latency)
- Sub-agent delegations
- HITL escalation events
- Final outcome and confidence

---

## Metrics Reference

### Technical Metrics
| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| LLM API availability | % time the inference service is available | <99.5% → alert |
| First token latency (p50/p95/p99) | Time to first token in streaming response | p95 >2s → alert |
| Total generation latency (p95) | End-to-end response time | Use case SLA |
| Error rate | % requests resulting in error | >1% → alert |
| Rate limit hit rate | % requests hitting rate limits | >5% → capacity review |
| Token throughput | Tokens/second processed | Capacity planning |

### Token & Cost Analytics
| Metric | Description | Use |
|--------|-------------|-----|
| Input tokens per request | Context + prompt size | Prompt optimisation |
| Output tokens per request | Response length | Output constraint tuning |
| Cost per request | Input + output tokens × price | Budget tracking |
| Cost per team/use case | Attribution for chargeback | FinOps |
| Token cache hit rate | % requests served from semantic cache | Cache optimisation |
| Model routing efficiency | % requests routed to cheapest adequate model | Cost optimisation |

### Quality Metrics
| Metric | Description | Tool |
|--------|-------------|------|
| Evaluation score | Overall quality score from eval suite | RAGAS, TruLens, DeepEval |
| Faithfulness | % claims in response grounded in retrieved sources | RAGAS faithfulness |
| Relevance | How well the response answers the question | RAGAS answer relevance |
| Context recall | % of relevant information retrieved | RAGAS context recall |
| Hallucination rate | % responses containing factual errors | Human eval, FactCheck |
| Safety violation rate | % responses triggering safety guardrails | Guardrail service metrics |
| User feedback score | Thumbs up/down ratio | In-product feedback |

### Agent-Specific Metrics
| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Task completion rate | % agent tasks completed without human help | <80% → review |
| HITL escalation rate | % tasks escalated to human | >20% → agent redesign |
| Tool error rate | % tool calls resulting in error | >5% → investigate |
| Loop detection rate | % tasks terminated due to loop | >0.1% → review |
| Agent cost per task | Total cost (LLM + tools) per completed task | vs. baseline |
| Agent latency | End-to-end time per task | vs. use case SLA |

---

## Drift Detection

### What Drifts in AI Systems

| Drift Type | What Changes | Detection Method |
|-----------|-------------|-----------------|
| **Model drift** | LLM behaviour changes (vendor updates model silently) | Regression eval suite on schedule |
| **Knowledge drift** | Knowledge base becomes stale / outdated | Freshness monitoring on documents |
| **Prompt drift** | User queries drift from what the prompt was designed for | Query distribution analysis |
| **Data drift** | Input data distribution shifts from training distribution | Statistical tests (KS test, PSI) |
| **Agent drift** | Agent behaviour changes without explicit change | Behaviour baseline monitoring |
| **Memory drift** | Memory store becomes cluttered, outdated, or biased | Memory quality sampling |

### Drift Response Protocol
1. Alert fires (metric exceeds drift threshold)
2. AI Product Manager and AI Engineer notified
3. Root cause investigation: was it a model update? knowledge expiry? query shift?
4. Remediation: update knowledge base / tune prompt / retrain / escalate to vendor
5. Verify fix via evaluation suite

---

## Continuous Evaluation

Evaluation is not just a pre-deployment gate — it runs continuously in production.

```
Production Traffic
      ↓
[Sample 1–5% of requests for evaluation]
      ↓
[Automated eval: faithfulness, relevance, safety]
      ↓
[LLM-as-judge: quality rating]
      ↓
[Human annotation: sample for ground truth calibration]
      ↓
[Quality dashboard: trend vs. baseline]
      ↓
[Alert if quality drops > threshold vs. 7-day baseline]
```

---

## Human Feedback Loop

Human feedback is the highest-quality signal for AI improvement.

**Feedback collection mechanisms:**
- **Thumbs up/down** (quick, high volume, low information density)
- **"What went wrong?" form** (medium volume, high information density)
- **Expert review** (low volume, very high information density)
- **Business outcome tracking** (was the AI-assisted action ultimately correct?)

**Feedback→improvement cycle:**
1. Collect feedback signal
2. Cluster and analyse failure modes
3. Prioritise by frequency × severity × business impact
4. Remediate (prompt update, knowledge addition, model change)
5. Validate fix with eval suite
6. Deploy via standard approval process

---

## Observability Tooling

### Enterprise Tooling Stack

| Layer | Recommended Tools |
|-------|------------------|
| **Tracing (OTel)** | Jaeger, Zipkin, AWS X-Ray, Azure Monitor, Cloud Trace |
| **LLM Observability** | Langfuse, LangSmith, Helicone, Arize Phoenix |
| **Metrics & Dashboards** | Prometheus + Grafana, Datadog, Dynatrace |
| **Log Management** | Elasticsearch (ELK), Splunk, CloudWatch Logs, Azure Monitor |
| **Evaluation** | RAGAS, TruLens, DeepEval, PromptFoo |
| **Cost Analytics** | Internal (FinOps service), CloudCost, Helicone cost analytics |
| **Agent Observability** | LangSmith, Arize Phoenix (agent traces), custom AgentOps dashboards |

---

## Observability Dashboard Hierarchy

**L1 — Executive Dashboard:** AI adoption, business KPI impact, cost trend, incident count.

**L2 — Product Manager Dashboard:** Use case quality scores, user satisfaction, task completion, feature adoption.

**L3 — Engineering Dashboard:** API metrics, latency, error rate, token usage, model routing efficiency.

**L4 — Platform Dashboard:** Infrastructure health, GPU utilisation, quota usage, cost by team.

**L5 — Security Dashboard:** Prompt injection alerts, safety violations, agent anomaly alerts, audit log volume.

---

## Authoritative Guides

| Guide | What It Covers |
|-------|---------------|
| [AI SOC, Observability & Red Team](../ai-security-governance/security/AI-SOC-Observability-RedTeam-Memory) | Tracing, prompt/context tracing, token analytics |
| [DeepMind Part 12: AI Observability](../ai-security-governance/deep-mind/Part12_AI_Observability) | Comprehensive observability framework |
| [Agentic UI Observability](../agentic-ui/observability) | UI-layer observability patterns |
| [Agent Reliability Engineering](../enterprise-architecture/ai-architecture/agent-reliability-engineering) | SRE for agents, drift detection |
| [Enterprise AIOps Guide](../enterprise-architecture/ai-architecture/enterprise-aiops-guide) | AIOps, model drift, knowledge drift |
| [Agentic AI Reliability & Observability](../enterprise-architecture/ai-architecture/agentic-ai-reliability-observability-governance) | Full observability governance |

---

## Related Parts

- [Part 10](./part-10-service-catalog) — AI Observability Service, Logging & Tracing Service
- [Part 11](./part-11-devsecops) — Observability in the DevSecOps pipeline
- [Part 16](./part-16-financial-model) — Cost analytics as part of observability
