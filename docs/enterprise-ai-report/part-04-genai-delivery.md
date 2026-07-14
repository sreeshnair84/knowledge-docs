---
title: "Part 4 — GenAI Delivery Lifecycle"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
tags: ["genai", "llm", "rag", "prompt-engineering", "evaluation", "guardrails", "llmops"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 4 — GenAI Delivery Lifecycle

> **Report Context:** Part 4 of the [Enterprise AI Research Report](./index). Deep-dive guides are in the **AI Development / AIDLC** and **Knowledge Engineering** sections — this page orients you and highlights what is unique to GenAI delivery.

---

## GenAI Delivery Lifecycle

```
Problem Identification
    ↓ LLM Selection
    ↓ Prompt Engineering
    ↓ Context Engineering
    ↓ RAG (if knowledge-grounded)
    ↓ Knowledge Base
    ↓ Evaluation
    ↓ Guardrails
    ↓ Deployment
    ↓ Observability
    ↓ Optimisation
    ↓ Business Value Measurement
```

---

## How GenAI Delivery Differs from Traditional ML

| Dimension | Traditional ML | GenAI |
|-----------|---------------|-------|
| **Primary skill required** | Feature engineering, model training | Prompt engineering, context design |
| **Training data** | Labelled dataset (task-specific) | Pre-trained on internet scale; fine-tune only if needed |
| **Time-to-first-output** | Weeks–months (data → train → deploy) | Hours–days (prompt → API → evaluate) |
| **Failure mode** | Overfitting, underfitting, drift | Hallucination, prompt injection, context overflow |
| **Quality gate** | Accuracy / F1 / AUC benchmarks | Evaluation against golden dataset; human preference |
| **Versioning** | Model version | Model version × prompt version × retrieval index version |
| **Explainability** | Feature importance (SHAP, LIME) | Chain-of-thought reasoning, citation attribution |
| **Monitoring** | Model performance drift | Quality drift, prompt drift, knowledge drift, cost drift |
| **Regulatory artifact** | Model card, bias assessment | Prompt log, RAG source attribution, hallucination rate |

---

## Stage-by-Stage Guidance

### Problem Identification
Determine whether the problem is a good fit for GenAI. GenAI excels at: natural language understanding and generation, document summarisation and extraction, conversational interaction, code generation, and flexible reasoning. It is **not** the right tool for: precise numerical computation, strict deterministic logic, or problems where hallucination is completely intolerable.

### LLM Selection
Evaluate models against: capability for the task, context window size, latency requirements, cost per token, data residency constraints, safety and content policy, and available fine-tuning options. Use the [AI Service Catalog — Inference Service](./part-10-service-catalog#01--inference-service) for approved enterprise models.

### Prompt Engineering
Iterative design of the system prompt: role assignment, task specification, output format, constraints, examples (few-shot). See [Prompt Engineering — Claude 4](../coding-tools/claude/prompt-engineering-claude-4) for the current best-practice guide.

### Context Engineering
Design the information context the model receives: which sources to draw from, how to chunk and retrieve, how to order context, how to fit within the token budget. See [Part 5](./part-05-agentic-lifecycle) for agentic context and [Enterprise Knowledge Architectures](../knowledge-engineering/knowledge/Enterprise_Knowledge_Architectures_Report) for knowledge design.

### RAG
Retrieval-Augmented Generation grounds model responses in enterprise knowledge. Architecture decision: naive RAG vs. advanced RAG (re-ranking, hybrid retrieval, query decomposition). See [Complex RAG Deep Dive](../knowledge-engineering/knowledge/Complex_RAG_Deep_Dive) for the full pattern library.

### Evaluation
Define what "good" looks like before building. Key metrics: faithfulness (is the answer grounded in sources?), relevance (does it answer the question?), coherence (is it well-structured?), safety (no harmful content), and business metric (does it improve the outcome it was designed for?). See [AI Agent Evaluation Framework](../ai-development/testing/AI_Agent_Evaluation_Framework_Guide).

### Guardrails
Implement safety and compliance controls at both input and output. Use the [Guardrail Service](./part-10-service-catalog#13--guardrail-service) for enterprise-standard guardrail implementation.

### Deployment, Observability & Optimisation
Deploy via the [Inference Service](./part-10-service-catalog#01--inference-service). Monitor via the [AI Observability Service](./part-10-service-catalog#21--ai-observability-service). Optimise cost via the [AI FinOps Service](./part-10-service-catalog#22--ai-finops-service).

---

## Authoritative Guides

| Guide | What It Covers |
|-------|---------------|
| [EA AIDLC Deep Research 2026](../ai-development/aidlc/EA_AIDLC_Deep_Research_2026) | GenAI lifecycle phases in depth |
| [Complex RAG Deep Dive](../knowledge-engineering/knowledge/Complex_RAG_Deep_Dive) | RAG architecture patterns |
| [Prompt Engineering — Claude 4](../coding-tools/claude/prompt-engineering-claude-4) | Prompt engineering methodology |
| [AI Agent Evaluation Framework](../ai-development/testing/AI_Agent_Evaluation_Framework_Guide) | Evaluation methodology |
| [Agentic AI Governance Framework](../ai-security-governance/Agentic_AI_Governance_Framework) | Guardrails and governance |
| [Enterprise Knowledge Architectures](../knowledge-engineering/knowledge/Enterprise_Knowledge_Architectures_Report) | Knowledge base design |

---

## Related Parts

- [Part 3](./part-03-ai-delivery-lifecycle) — Full AI delivery lifecycle (GenAI is a subset)
- [Part 5](./part-05-agentic-lifecycle) — Agentic extension of GenAI delivery
- [Part 10](./part-10-service-catalog) — Services that support each lifecycle stage
