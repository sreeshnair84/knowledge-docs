---
title: "Industry Knowledge Systems"
date_created: 2026-07-05
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["knowledge-engineering", "industry-practices"]
---

# Industry Knowledge Systems: How the Best Build Them

Deep research (as of July 2026) into how leading tech companies and consulting firms build knowledge systems that **serve data with governance, Responsible AI, grounding, and evaluation** built in — not bolted on.

---

## Why this matters now

The question enterprises asked in 2023–2024 was *"does RAG work?"* The question in 2026 is *"how do we make knowledge systems safe, verifiable, and governable at enterprise scale?"* Three forces drove that shift:

1. **Production failures traced to data, not models.** Every retrieval platform serves what it's given. The consistent finding across enterprise deployments is that the missing layer is *data governance* — deciding which sources are authoritative, who may access them, and whether they're still accurate — and that this layer must sit **upstream** of the retrieval stack.
2. **Regulation with teeth.** The EU AI Act's GPAI obligations took effect August 2025, with Commission enforcement from August 2026, and the June 2026 high-risk technical guidelines explicitly call out retrieval-based generative architectures. ISO/IEC 42001 made AI governance certifiable; NIST's AI RMF and its Generative AI Profile became the de facto risk vocabulary.
3. **Evaluation became an engineering discipline.** Systematic evaluation frameworks (RAGAS, DeepEval, TruLens) moved from research papers into CI/CD pipelines, with groundedness thresholds acting as deployment gates.

## The convergent architecture

Tech companies and consultancies arrived at the same shape from opposite directions — Big Tech built governance/metadata platforms first and added LLM serving later; consulting firms built LLM assistants first and discovered they needed the governance layer to make them trustworthy. The result is a common four-layer pattern:

```
┌─────────────────────────────────────────────────────────┐
│ 4. EVALUATION & MONITORING                              │
│    golden datasets · LLM-as-judge · CI gates · tracing  │
├─────────────────────────────────────────────────────────┤
│ 3. GROUNDED SERVING                                     │
│    hybrid retrieval · reranking · citations · guardrails│
├─────────────────────────────────────────────────────────┤
│ 2. GOVERNANCE / CONTEXT LAYER                           │
│    catalogs · lineage · access policy · authoritative-  │
│    source curation · permissions-aware indexing         │
├─────────────────────────────────────────────────────────┤
│ 1. KNOWLEDGE & DATA FOUNDATION                          │
│    documents · knowledge graphs · feature stores ·      │
│    metadata hubs · expert graphs                        │
└─────────────────────────────────────────────────────────┘
```

## In this section

| Page | What it covers |
|---|---|
| [How Tech Companies Serve Knowledge](tech-companies.md) | Uber Michelangelo, LinkedIn DataHub & Economic Graph, Netflix Metacat, Airbnb Dataportal, Microsoft Graph/semantic index, Meta, Amazon — the internal platforms and the patterns they pioneered |
| [Consulting Firm AI Platforms](consulting-firms.md) | McKinsey Lilli, BCG GENE & Deckster, Deloitte PairD, EY.ai/EYQ, KPMG KymChat, Accenture — what they built and the published lessons |
| [Governance & Responsible AI](governance-rai.md) | The governance layer upstream of retrieval, runtime RAI enforcement, and the NIST AI RMF / ISO 42001 / EU AI Act standards stack |
| [Grounding Architectures](grounding.md) | Hybrid retrieval, GraphRAG, permissions-aware grounding, citation & verification patterns, agentic and adaptive RAG |
| [Evaluation & Quality Gates](evaluation.md) | RAGAS, DeepEval, TruLens compared; LLM-as-judge; golden datasets; CI eval gates; production groundedness monitoring |

## Related sections

- [Data Architecture for AI](../data/index.md) — research reports on data systems, lineage, and AI-native platform evolution
- [Knowledge & RAG](../knowledge/index.md) — autonomous knowledge engineering and complex RAG deep dives
