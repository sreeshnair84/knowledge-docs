---
title: "Enterprise Multi-Model AI Strategy — Vendor-Agnostic Guide"
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["enterprise-architecture", "ai-architecture", "multi-model", "vendor-agnostic", "llm-strategy"]
doc_type: guide
covers_version: "as of 2026-07-10"
---

# Enterprise Multi-Model AI Strategy — Vendor-Agnostic Guide

**Audience:** Enterprise AI architects, platform engineering leads, AI governance teams, CTO/CIO advisors, and security architects designing vendor-agnostic AI platforms.

**Purpose:** Definitive internal reference for selecting, routing, governing, evaluating, and operating foundation models across an enterprise while minimising vendor lock-in and maximising flexibility, resilience, security, and business value.

**What this guide covers:** Model landscape, capability matrices, decision frameworks, routing architectures, open-source strategy, evaluation, cost optimisation, governance, security, vendor lock-in prevention, model registry design, and 2026–2030 trends.

**What it does NOT duplicate:** Claude-specific pricing → [Claude Models 2026](../../coding-tools/claude/claude-models-2026.md) | AI gateway implementation → [Kong AI Gateway Guide](../../cloud-platforms/ai-gateway/kong-ai-gateway-guide.md) | Architecture patterns → [Enterprise AI Architecture Patterns](enterprise-ai-architecture-patterns.md) | Governance rules → [Enterprise AI Governance & Compliance](enterprise-ai-governance-compliance.md) | Role fundamentals → [Enterprise AI Architect Foundations](enterprise-ai-architect-foundations.md)

---

## Table of Contents

**Part I — The Case for Multi-Model**

1. [Why Multi-Model Matters](#1-why-multi-model-matters)
2. [Strategy Comparison](#2-strategy-comparison-single-vs-multi-vs-hybrid)

**Part II — The 2026 Model Landscape**
3. [Commercial Model Families](#3-commercial-model-families-2026)
4. [Open-Source Model Families](#4-open-source-model-families-2026)
5. [Cross-Vendor Capability Matrix](#5-cross-vendor-capability-matrix)

**Part III — Technical Comparison**
6. [Claude vs GPT vs Gemini vs Open Source](#6-claude-vs-gpt-vs-gemini-vs-open-source--technical-comparison)

**Part IV — Decision Frameworks**
7. [Enterprise Decision Tree](#7-enterprise-model-decision-tree)
8. [Dynamic Model Selection](#8-dynamic-model-selection)

**Part V — Architecture**
9. [Model Routing Architecture](#9-model-routing-architecture)
10. [Multi-Model Agent Architecture](#10-multi-model-agent-architecture)
11. [Context Window Strategy](#11-context-window-strategy)
12. [Enterprise Reference Architectures](#12-enterprise-reference-architectures)

**Part VI — Operations**
13. [Model Evaluation Framework](#13-model-evaluation-framework)
14. [Cost Optimisation](#14-cost-optimisation)
15. [Enterprise Model Registry](#15-enterprise-model-registry)

**Part VII — Governance and Security**
16. [Enterprise Governance](#16-enterprise-governance)
17. [Security](#17-security)
18. [Vendor Lock-in Prevention](#18-vendor-lock-in-prevention)
19. [Prompt Portability](#19-prompt-portability)

**Part VIII — Looking Ahead**
20. [Future Trends 2026–2030](#20-future-trends-20262030)

**Appendices**

- [Best Practices & Anti-Patterns](#best-practices--anti-patterns)
- [Migration Roadmap](#migration-roadmap)
- [Governance Checklist](#governance-checklist)
- [Glossary](#glossary)
- [Further Reading](#further-reading)

---

## Part I — The Case for Multi-Model

## 1. Why Multi-Model Matters

### 1.1 The Core Problem with Single-Model Strategies

Standardising on one foundation model is superficially appealing — simpler operations, fewer integration points, one vendor relationship. But it introduces structural fragility that materialises in predictable ways:

| Risk Category | Manifestation | Example |
| --- | --- | --- |
| **Pricing volatility** | Costs double overnight with no notice period | OpenAI raised GPT-4 API prices 3× in 18 months (2023–2024) |
| **Availability shock** | Provider outage takes down all AI-dependent workloads | Single-provider outages caused cascading failures in AI-dependent SaaS products |
| **Geopolitical exposure** | Export controls restrict access to specific models | DeepSeek access blocked in South Korea and several EU regulatory reviews (2025) |
| **Feature regression** | Model update silently degrades performance on your task | GPT-4 "capability drift" reports surfaced in mid-2023 across coding benchmarks |
| **Capability ceiling** | No single model excels at every task category | Claude excels at long documents; GPT-4o leads in multimodal; Llama 3 70B enables air-gap |
| **Regulatory non-compliance** | Data residency requirements force local deployment | GDPR, HIPAA, SOC 2 Type II restrict data crossing to US-only providers |
| **Innovation speed mismatch** | Your locked provider's roadmap doesn't match your needs | Multimodal capabilities arrived 6–12 months earlier at some providers than others |
| **Sovereignty requirements** | Government contracts require models hosted on national infrastructure | EU Digital Sovereignty requirements, US Federal AI Executive Order mandates |

### 1.2 Business Case for Multi-Model

```
SINGLE-MODEL RISK SURFACE

                    Competitive         Model-specific
Price shock         disadvantage         limitations
    │                   │                    │
    ▼                   ▼                    ▼
┌───────────────────────────────────────────────────┐
│             YOUR ENTIRE AI PLATFORM               │
│                 (one provider)                    │
└───────────────────────────────────────────────────┘
    ▲                   ▲                    ▲
    │                   │                    │
Outage risk       Regulatory risk       Lock-in cost


MULTI-MODEL RISK DISTRIBUTION

  Task A          Task B              Task C
(reasoning)    (code gen)          (vision)
    │               │                   │
    ▼               ▼                   ▼
[Claude]        [Codex/GPT]         [Gemini]   [Local Llama]
    │               │                   │            │
    └───────────────┴───────────────────┴────────────┘
                  AI GATEWAY
                (abstraction layer)
                       │
              YOUR APPLICATIONS
```

### 1.3 Multi-Model Enables Specialisation

Different models have genuinely different capability profiles — not just marketing positioning. A vendor-agnostic strategy captures these differences:

- **Instruction following / safety:** Claude family leads on nuanced instruction adherence
- **Coding:** GPT-4o, DeepSeek-Coder, and Qwen-Coder perform differently across language ecosystems
- **Mathematical reasoning:** DeepSeek-R1 and Qwen-72B show strong math benchmarks for their cost tier
- **Long context:** Gemini 1.5 Pro and Claude Fable 5 each handle 1M+ tokens natively
- **Multilingual:** Qwen2.5-72B leads on Asian language tasks; GPT-4o for Romance languages
- **Vision:** Gemini 2.0 Flash and GPT-4o lead on visual reasoning; Claude Fable 5 on OCR and document understanding
- **Air-gapped deployment:** Only open-source models (Llama 3.3, Mistral, DeepSeek-R1) are deployable fully offline

---

## 2. Strategy Comparison: Single vs Multi vs Hybrid

| Dimension | Single-Model | Multi-Model | Hybrid |
| --- | --- | --- | --- |
| **Operational complexity** | Low | High | Medium |
| **Cost optimisation ceiling** | Limited (one price point) | High (route to cheapest viable model) | Medium-high |
| **Vendor risk** | Maximum | Minimum | Medium |
| **Task specialisation** | Constrained | Maximum | Medium |
| **Prompt engineering effort** | Low (one system) | High (per-model tuning) | Medium |
| **Governance surface** | Small | Large | Medium |
| **Innovation access** | Slow (one roadmap) | Fast (adopt best-of-breed) | Medium |
| **Regulatory flexibility** | Low | High | High |
| **Team skill breadth required** | Low | High | Medium |
| **Recommended for** | Proof of concepts, small teams | Large enterprises, regulated industries | Mid-market, growing orgs |

### 2.1 Decision Guide

```
Start here: What is your primary AI risk?

    ├── Cost / budget?
    │       └── Multi-model with routing → 40–70% cost savings
    │
    ├── Vendor reliability / outage?
    │       └── Multi-model with failover → 99.9%+ AI availability
    │
    ├── Regulatory / data sovereignty?
    │       └── Hybrid (commercial + on-premise open-source)
    │
    ├── Best task performance?
    │       └── Multi-model with task-routing
    │
    └── Low operational overhead above all?
            └── Single-model (accept the trade-offs)
```

### 2.2 The Hybrid Strategy (Recommended Default)

Most enterprises land on a hybrid: **one or two commercial providers plus one self-hosted open-source tier**, connected through an AI gateway abstraction layer.

```
┌─────────────────────────────────────────────────────────┐
│                    AI GATEWAY LAYER                     │
│           (LiteLLM / Kong AI / Custom SDK)              │
└───────┬───────────────┬─────────────────┬───────────────┘
        │               │                 │
        ▼               ▼                 ▼
   TIER 1:         TIER 2:          TIER 3:
   Premium         Mid-tier         Self-hosted
   (Claude Fable,  (Haiku 4.5,      (Llama 3.3 70B,
    GPT-4o)         Gemini Flash)    Mistral 7B)
   Complex tasks   Standard tasks   High-volume / air-gap
   ~$5–50/MTok     ~$0.10–1/MTok    ~$0.003/MTok (GPU cost)
```

---

## Part II — The 2026 Model Landscape

## 3. Commercial Model Families (2026)

### 3.1 Anthropic Claude

| Model | Input $/MTok | Output $/MTok | Context | Key Strengths |
| --- | --- | --- | --- | --- |
| Claude Fable 5 | $10 | $50 | 1M | Safety, complex agents, adversarial robustness |
| Claude Sonnet 5 | $2 | $10 | 1M | Best enterprise balance: cost vs capability |
| Claude Opus 4.8 | $5 | $25 | 1M | Extended thinking, research, mathematical reasoning |
| Claude Haiku 4.5 | $1 | $5 | 200K | High-volume triage, classification, routing |

**Strengths:** Instruction following, safety, long document analysis, structured output (XML/JSON), tool use reliability, extended thinking for complex reasoning.

**Weaknesses:** Higher cost at premium tier; less multimodal capability vs GPT-4o for image generation; smaller community ecosystem than OpenAI.

**Licensing:** Proprietary API; Bedrock and Vertex AI deployment available; no self-hosting.

**Enterprise maturity:** High. SOC 2 Type II, HIPAA, ISO 27001. Available via AWS Bedrock, Google Vertex AI, Azure (Bedrock via Transit Gateway).

**Ecosystem:** Claude Agent SDK, MCP (Model Context Protocol), extensive tool-use support.

### 3.2 OpenAI GPT

| Model | Input $/MTok | Output $/MTok | Context | Key Strengths |
| --- | --- | --- | --- | --- |
| GPT-4o | $2.50 | $10 | 128K | Multimodal (text, image, audio), broad ecosystem |
| GPT-4o mini | $0.15 | $0.60 | 128K | Low-cost multimodal, high throughput |
| o3 | $10 | $40 | 200K | Advanced reasoning, competitive math/coding |
| o4-mini | $1.10 | $4.40 | 200K | Efficient reasoning, coding |

**Strengths:** Broadest third-party ecosystem (LangChain, AutoGen, etc.), multimodal (audio/vision/text), function calling compatibility standard, DALL-E integration, Codex coding.

**Weaknesses:** Less predictable pricing trajectory; safety characteristics differ from Anthropic; context window smaller than Claude/Gemini at high end; fewer data sovereignty options.

**Licensing:** Proprietary; available via Azure OpenAI Service (data residency options).

**Enterprise maturity:** Highest ecosystem maturity. Most LLM frameworks default to OpenAI API schema.

**Ecosystem:** De-facto industry standard API schema (widely compatible). OpenAI Evals, Assistants API, Realtime API.

### 3.3 Google Gemini

| Model | Input $/MTok | Output $/MTok | Context | Key Strengths |
| --- | --- | --- | --- | --- |
| Gemini 2.5 Pro | $1.25 | $10 | 1M | Multimodal, long-context, reasoning |
| Gemini 2.0 Flash | $0.10 | $0.40 | 1M | Extremely fast, low-cost, tool calling |
| Gemini 2.0 Flash-Lite | $0.075 | $0.30 | 1M | Ultra-low-cost, classification, triage |

**Strengths:** Best-in-class long context (native 1M), multimodal (text/image/video/audio), Google Search grounding, tight integration with GCP, competitive pricing.

**Weaknesses:** More variable quality on instruction following; Google's roadmap volatility; some regulated industries restrict GCP data residency.

**Licensing:** Proprietary; Vertex AI deployment with VPC data controls.

**Enterprise maturity:** High and growing rapidly. PCI, HIPAA, ISO certifications on Vertex AI.

**Ecosystem:** Vertex AI, Google AI Studio, LangChain integration, Gemma open-source family.

### 3.4 Amazon Nova (Bedrock)

| Model | Input $/MTok | Output $/MTok | Context | Key Strengths |
| --- | --- | --- | --- | --- |
| Nova Pro | $0.80 | $3.20 | 300K | Multimodal, AWS-native, balanced |
| Nova Lite | $0.06 | $0.24 | 300K | Low-cost document and image analysis |
| Nova Micro | $0.035 | $0.14 | 128K | Ultra-low-cost text-only |

**Strengths:** Best-priced multimodal option at this tier; AWS-native (IAM, VPC, no data egress to third-party); agentic features built into Bedrock. Cost leadership for AWS-heavy shops.

**Weaknesses:** Newer family; less community benchmark coverage; reasoning capabilities trail Claude/OpenAI frontier models.

**Licensing:** AWS proprietary; runs within customer AWS account (no data shared with Amazon AI teams by default with standard Bedrock).

**Enterprise maturity:** Very high for AWS organisations. AWS compliance certifications (FedRAMP, HIPAA, PCI-DSS, ISO 27001).

### 3.5 Cohere Command R+

| Model | Input $/MTok | Output $/MTok | Context | Key Strengths |
| --- | --- | --- | --- | --- |
| Command R+ | $2.50 | $10 | 128K | RAG, enterprise search, tool calling |
| Command R | $0.15 | $0.60 | 128K | Cost-effective RAG workloads |
| Embed 3 | $0.10 | — | — | Embedding, multilingual retrieval |

**Strengths:** Purpose-built for enterprise RAG. Best-in-class at grounded retrieval tasks. Strong multilingual embedding. Dedicated enterprise SLAs.

**Weaknesses:** Narrower general capability than frontier models; smaller ecosystem.

**Licensing:** Proprietary; on-premise deployment available for Command R.

**Enterprise maturity:** High for RAG-specialised use cases. GDPR-compliant EU deployment available.

### 3.6 xAI Grok

| Model | Context | Key Strengths |
| --- | --- | --- |
| Grok 3 | 131K | Real-time X/Twitter data, news reasoning |
| Grok 3 Mini | 131K | Cost-effective with reasoning trace |

**Strengths:** Real-time internet access; strong reasoning capability; Aurora image generation.

**Weaknesses:** Smaller enterprise ecosystem; safety certification maturity lower than Anthropic/Google; unclear long-term enterprise pricing trajectory.

**Enterprise maturity:** Early-stage. Use with caution in regulated environments.

---

## 4. Open-Source Model Families (2026)

### 4.1 Meta Llama

| Model | Parameters | Context | Strengths |
| --- | --- | --- | --- |
| Llama 3.3 70B | 70B | 128K | Best open-source generalist; near-GPT-4-class reasoning |
| Llama 3.1 405B | 405B | 128K | Frontier-competitive; requires A100/H100 cluster |
| Llama 3.2 11B / 90B | 11B / 90B | 128K | Multimodal; efficient on single A100 |
| Llama 3.2 1B / 3B | 1B / 3B | 128K | Edge deployment; mobile; embedded |

**License:** Meta Llama Community License (commercial use allowed for companies <700M MAU; check current terms).

**Hosting options:** vLLM, Ollama, TGI (Text Generation Inference), AWS SageMaker, Azure ML, NVIDIA NIM.

**Why enterprises use it:** Full data control, air-gap capability, no per-token cost (GPU cost only), fine-tuning ownership, regulatory compliance for sensitive data.

### 4.2 Mistral AI

| Model | Parameters | Context | Strengths |
| --- | --- | --- | --- |
| Mistral Large 2 | ~123B | 128K | Strong reasoning, multilingual, function calling |
| Mistral Small 3.1 | 24B | 128K | Efficient; competitive with GPT-4o mini |
| Codestral | 22B | 32K | Code generation; 80+ programming languages |
| Mixtral 8x22B | ~140B MoE | 65K | Mixture-of-experts; high throughput |

**License:** Apache 2.0 for Mistral 7B; proprietary for larger models; La Plateforme API for hosted.

**Hosting options:** Ollama, vLLM, Mistral AI API, Azure AI Foundry, AWS Bedrock.

**Why enterprises use it:** EU-headquartered (GDPR-native); strong EU data sovereignty story; excellent cost/quality for European languages.

### 4.3 DeepSeek

| Model | Parameters | Context | Strengths |
| --- | --- | --- | --- |
| DeepSeek-V3 | 671B MoE | 128K | Frontier-class; exceptional value ($0.27/MTok) |
| DeepSeek-R1 | 671B MoE | 128K | Chain-of-thought reasoning; math/coding |
| DeepSeek-Coder-V2 | 236B MoE | 128K | Top coding benchmark performance |
| DeepSeek-R1-Distill-Qwen-32B | 32B | 128K | Deployable reasoning model |

**License:** DeepSeek Model License (commercial use allowed; check residency and export control requirements — restrictions apply in some jurisdictions).

**⚠ Enterprise Warning:** Data privacy and geopolitical considerations apply. Many regulated industries and government contracts prohibit routing data to DeepSeek API (Chinese company). Self-hosted deployment of weights avoids this — but verify export control compliance.

**Why enterprises use it (self-hosted):** Among the best reasoning performance per GPU-hour for on-premise deployments; R1 distills enable efficient reasoning on smaller hardware.

### 4.4 Alibaba Qwen

| Model | Parameters | Context | Strengths |
| --- | --- | --- | --- |
| Qwen2.5 72B | 72B | 128K | Multilingual (Chinese/English/50+ languages), coding |
| Qwen2.5-Coder 32B | 32B | 128K | Strong coding benchmark; HumanEval competitive |
| Qwen2-VL 72B | 72B | ~32K | Multimodal vision-language |
| Qwen-Audio | 8B | — | Speech/audio understanding |

**License:** Qwen Community License (commercial use permitted for smaller models; check model-specific terms).

**⚠ Enterprise Warning:** Same geopolitical considerations as DeepSeek apply. Prefer self-hosted weights over Qwen API for regulated workloads.

**Why enterprises use it (self-hosted):** Best-in-class Asian language capability; strong multilingual benchmark performance; competitive coding models.

### 4.5 Google Gemma

| Model | Parameters | Context | Strengths |
| --- | --- | --- | --- |
| Gemma 3 27B | 27B | 128K | Strong reasoning; vision; multimodal |
| Gemma 3 12B / 4B | 12B / 4B | 128K | Efficient deployment; edge/mobile |
| Gemma 3 1B | 1B | 32K | On-device inference; mobile |
| PaliGemma 3B | 3B | — | Vision-language; image captioning |

**License:** Gemma Terms of Use (commercial use allowed; no sub-licensing restrictions).

**Hosting options:** Google Vertex AI, Ollama, Hugging Face, NVIDIA NIM.

**Why enterprises use it:** Google-backed quality + Apache-2.0-adjacent licensing; strong performance in the 12B–27B efficient range; good vision capabilities.

### 4.6 Microsoft Phi

| Model | Parameters | Context | Strengths |
| --- | --- | --- | --- |
| Phi-4 | 14B | 16K | Strong reasoning relative to size; math |
| Phi-3 Mini | 3.8B | 128K | On-device; mobile; edge inference |
| Phi-3 Small | 7B | 128K | Efficient; instruction following |

**License:** MIT License — most permissive in the space.

**Why enterprises use it:** MIT license enables unrestricted commercial use; excellent performance on edge and embedded devices; low memory footprint; strong math for the parameter count.

### 4.7 IBM Granite

| Model | Parameters | Context | Strengths |
| --- | --- | --- | --- |
| Granite 3.1 8B | 8B | 128K | Enterprise coding, RAG, function calling |
| Granite 3.1 2B | 2B | 128K | Edge and embedded enterprise workloads |
| Granite Code 34B | 34B | 128K | Enterprise coding, repository understanding |

**License:** Apache 2.0.

**Why enterprises use it:** IBM enterprise support and SLAs; indemnification coverage available via IBM; designed for enterprise compliance (data lineage, audit); strong for internal tooling and code tasks.

### 4.8 Allen AI OLMo

| Model | Parameters | Context | Strengths |
| --- | --- | --- | --- |
| OLMo 2 13B | 13B | 4K | Fully open research model (weights + data + training code) |
| OLMo 2 32B | 32B | 4K | Research-grade open transparency |

**License:** Apache 2.0; training data and process fully documented.

**Why enterprises use it:** Maximum transparency for regulated industries requiring model provenance; research applications needing full reproducibility.

### 4.9 Open-Source Deployment Infrastructure

| Tool | Use Case | Notes |
| --- | --- | --- |
| **vLLM** | High-throughput inference server | PagedAttention; OpenAI-compatible API; GPU required |
| **Ollama** | Local and development inference | CPU/GPU; easiest setup; supports most models |
| **TGI (HF)** | Production inference (HuggingFace) | Good for Kubernetes; supports quantisation |
| **TensorRT-LLM** | NVIDIA-optimised high-performance inference | Maximum throughput on H100/A100; complex setup |
| **SGLang** | Structured generation; JSON/grammar-constrained | Optimised for agents and tool use |
| **LM Studio** | Developer desktop inference | GUI; privacy; rapid prototyping |
| **KServe** | Kubernetes model serving | MLOps integration; model versioning |
| **Ray Serve** | Distributed serving | Scale-out; multi-model serving on Ray cluster |
| **NVIDIA NIM** | Optimised NVIDIA-hosted containers | Production-ready; NVIDIA enterprise support |

---

## 5. Cross-Vendor Capability Matrix

Scale: ✦✦✦✦✦ = industry-leading | ✦✦✦ = competitive | ✦ = limited

| Capability | Claude Fable 5 | GPT-4o | Gemini 2.5 Pro | Llama 3.3 70B | Mistral Large 2 | DeepSeek-R1 | Qwen2.5 72B |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Instruction following** | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦ | ✦✦✦ | ✦✦✦ | ✦✦✦ |
| **Reasoning (general)** | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦ |
| **Mathematical reasoning** | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦ | ✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦ |
| **Coding (general)** | ✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦ |
| **Long context (1M+)** | ✦✦✦✦✦ | ✦✦ | ✦✦✦✦✦ | ✦✦ | ✦✦ | ✦✦ | ✦✦ |
| **Vision** | ✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦ | ✦ | ✦ | ✦✦✦ |
| **Audio / Speech** | ✦ | ✦✦✦✦✦ | ✦✦✦✦ | ✦ | ✦ | ✦ | ✦✦ |
| **Tool use / Function calling** | ✦✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦ | ✦✦✦✦ | ✦✦✦ | ✦✦✦ |
| **Structured output (JSON)** | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦ | ✦✦✦✦ | ✦✦✦ | ✦✦✦ |
| **Multilingual** | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦✦ |
| **Agent / planning** | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦ | ✦✦✦ | ✦✦✦✦ | ✦✦✦ |
| **MCP support** | ✦✦✦✦✦ | ✦✦✦ | ✦✦✦ | ✦✦ | ✦✦ | ✦✦ | ✦✦ |
| **A2A compatibility** | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦ | ✦✦ | ✦✦ | ✦✦ | ✦✦ |
| **Batch inference** | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦✦ |
| **Fine-tuning support** | ✦ (no) | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦✦ |
| **Private deployment** | ✦ (no) | ✦✦ (Azure only) | ✦✦ (Vertex only) | ✦✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦✦ |
| **Cost (lower = ✦✦✦✦✦)** | ✦✦ | ✦✦✦ | ✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦✦ |
| **P50 latency (TTFT)** | Medium | Low | Very Low | Variable | Low | Medium | Variable |
| **Enterprise API maturity** | ✦✦✦✦✦ | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦ | ✦✦✦✦ | ✦✦ | ✦✦ |
| **Safety / harm avoidance** | ✦✦✦✦✦ | ✦✦✦✦ | ✦✦✦✦ | ✦✦✦ | ✦✦✦ | ✦✦ | ✦✦ |

> **Important note on matrices:** These ratings reflect the general consensus of independent benchmarks and practitioner community as of Q3 2026. Individual task performance can vary significantly from these generalised scores. Always run task-specific evaluations (see [Section 13](#13-model-evaluation-framework)) before committing a model to a production use case.

---

## Part III — Technical Comparison

## 6. Claude vs GPT vs Gemini vs Open Source — Technical Comparison

### 6.1 Instruction Following

**Claude (Anthropic)** is designed from the ground up around detailed instruction following. Constitutional AI training means Claude rarely ignores explicit constraints in system prompts. Particularly reliable for: multi-constraint tasks, persona adherence, structured format compliance.

**GPT-4o (OpenAI)** shows strong instruction following but with higher variance on complex multi-constraint prompts. Some practitioners report more "creative interpretation" of instructions than Anthropic models.

**Gemini 2.5 Pro** has improved substantially in 2026 but historically showed more hallucinations on specific constraint adherence. Strongest at factual task following; weaker on nuanced persona or style constraints.

**Llama 3.3 70B (self-hosted)** performance on instruction following depends heavily on the RLHF tuning variant used. Meta's base Instruct models are competitive; community fine-tunes vary widely.

**Verdict:** Claude > GPT-4o > Gemini > Open-source (varies) for strict instruction adherence.

### 6.2 Reasoning Depth and Chain-of-Thought

| Model | Reasoning mode | GPQA Diamond | MATH-500 | ARC-Challenge |
| --- | --- | --- | --- | --- |
| Claude Fable 5 (extended thinking) | Extended thinking | ~83% | ~96% | ~98% |
| GPT-4o (with o3) | System 2 reasoning | ~87% | ~97% | ~98% |
| Gemini 2.5 Pro | Thinking mode | ~84% | ~97% | ~98% |
| DeepSeek-R1 | Chain-of-thought | ~79% | ~97% | ~96% |
| Llama 3.1 405B | Standard CoT | ~50% | ~73% | ~88% |
| Llama 3.3 70B | Standard CoT | ~46% | ~68% | ~84% |

*Source: public benchmark leaderboards (MMLU Pro, LiveBench, GPQA); verify against current evaluations at publication date.*

**Extended thinking / reasoning mode:** All frontier commercial models now have a "reasoning" or "thinking" mode that uses explicit chain-of-thought before generating. DeepSeek-R1 is the leading open-source reasoning model. These modes increase latency (5–30s) and cost (2–5× token usage) substantially — use only for tasks that demonstrably benefit.

### 6.3 Hallucination and Factual Accuracy

Hallucination rates are task-dependent. General patterns from practitioner research:

- **Grounded (RAG) tasks:** All frontier models perform similarly when grounding context is provided. The differentiator is *faithfulness* — how well the model stays within provided context vs. adding ungrounded facts.
- **Open-domain factual:** Gemini with Search grounding leads (real-time knowledge); Claude and GPT-4o are strong but have knowledge cutoffs.
- **Long-context faithfulness:** Claude Fable 5 and Gemini 2.5 Pro maintain higher faithfulness over 500K+ token contexts than GPT-4o (128K limit creates truncation risk).
- **Open-source:** Generally higher hallucination rates without careful prompt engineering; quantised models show further degradation.

### 6.4 Tool Use and Function Calling

**Claude** uses XML-tagged tool call format and has the most reliable structured tool use in multi-step agent tasks. Claude Agent SDK enables complex tool orchestration patterns.

**GPT-4o** established the de-facto JSON schema function-calling API that most frameworks (LangChain, AutoGen) use as their interface contract. Most ecosystem tooling works natively with OpenAI schema.

**Gemini** supports function calling with JSON schema; supports Google Search grounding as a native tool.

**Open-source models:** Tool calling quality varies significantly. Mistral Large 2 and Llama 3.1+ have explicit fine-tuning for function calling. Smaller models (<13B) struggle with complex nested tool schemas.

**Recommendation:** For multi-step agents, prefer Claude or GPT-4o. For tool-calling in constrained pipelines, test any open-source model specifically on your tool schema before committing.

### 6.5 Coding Capabilities

| Benchmark | GPT-4o | Claude Fable 5 | Gemini 2.5 Pro | DeepSeek-V3 | Qwen2.5-Coder 32B |
| --- | --- | --- | --- | --- | --- |
| HumanEval | ~90% | ~88% | ~91% | ~90% | ~92% |
| SWE-Bench Verified | ~49% | ~49% | ~63% | ~47% | ~37% |
| BigCodeBench | ~63% | ~64% | ~68% | ~66% | ~65% |

*Note: SWE-Bench Verified reflects real-world repository issue resolution. These figures change rapidly; check [SWE-bench.com](https://www.swebench.com) for current standings.*

**Key insight:** Gemini 2.5 Pro leads on SWE-Bench (full repository context + multi-file changes). GPT-4o and Claude are competitive across benchmarks. Open-source models like DeepSeek-Coder and Qwen-Coder approach commercial quality for specific coding tasks at a fraction of the cost.

### 6.6 Cost Profile Comparison

```
COST PER 1,000 REQUESTS (typical enterprise workload: 500 input / 500 output tokens)

Ultra premium tier:
  Claude Fable 5:     ~$30.00
  GPT-4o:             ~$6.25

Standard production tier:
  Claude Sonnet 5:    ~$6.00
  Gemini 2.5 Pro:     ~$5.63
  GPT-4o mini:        ~$0.38

Efficient tier:
  Claude Haiku 4.5:   ~$3.00
  Gemini 2.0 Flash:   ~$0.25
  Amazon Nova Lite:   ~$0.15

Self-hosted (GPU cost):
  Llama 3.3 70B:      ~$0.003 (H100 rental, no idle cost)
  Mistral 7B:         ~$0.001 (A10G rental)
```

### 6.7 Context Window Strategy by Provider

| Provider / Model | Max Context | Practical Limit | Notes |
| --- | --- | --- | --- |
| Claude Fable 5 | 1M tokens | ~900K reliable | Best-in-class faithfulness at long context |
| Gemini 2.5 Pro | 1M tokens | ~800K reliable | Strong; some loss-in-the-middle reported |
| GPT-4o | 128K tokens | ~100K reliable | Hard limit forces chunking for long docs |
| Amazon Nova Pro | 300K tokens | ~250K reliable | AWS-native; good for document batches |
| Llama 3.1 405B | 128K tokens | ~100K reliable | Self-hosted; context management critical |

### 6.8 Determinism and Consistency

No frontier model is fully deterministic. Temperature=0 reduces but does not eliminate output variation across providers:

- Claude: temperature=0 is more consistent than most; recommended for structured extraction
- GPT-4o: seed parameter available for reproducibility (best-effort)
- Gemini: temperature=0 available; less consistent than Claude in practitioner testing
- Open-source: temperature=0 is effective; same weights = more reproducible

**Design implication:** Never assume AI outputs are idempotent. Build evaluation harnesses that can tolerate non-deterministic responses.

---

## Part IV — Decision Frameworks

## 7. Enterprise Model Decision Tree

### 7.1 Primary Routing Decision Tree

```
START: New AI workload or model selection decision
           │
           ▼
    ┌──────────────────────────────┐
    │ Can data leave the org or    │
    │ cross national boundaries?   │
    └──────────────┬───────────────┘
                   │
          ┌────────┴────────┐
         YES               NO
          │                 │
          ▼                 ▼
   ┌─────────────┐   ┌──────────────────────────┐
   │ Commercial  │   │ SELF-HOSTED OPEN-SOURCE   │
   │ API allowed │   │ (Llama / Mistral / Phi)   │
   └──────┬──────┘   │ on-premise or private VPC │
          │          └──────────────────────────┘
          ▼
    ┌──────────────────────────────┐
    │ Required context > 128K?     │
    └──────────────┬───────────────┘
                   │
          ┌────────┴────────┐
         YES               NO
          │                 │
          ▼                 ▼
   ┌─────────────┐   ┌──────────────────────────┐
   │ Claude or   │   │ Consider: GPT-4o, Nova,  │
   │ Gemini      │   │ Mistral, Haiku also fit  │
   │ (1M context)│   └──────────────────────────┘
   └─────────────┘
          │
          ▼
    ┌──────────────────────────────┐
    │ Required capability?         │
    └──────────────┬───────────────┘
                   │
    ┌──────────────┼──────────────────────────────┐
    │              │              │                │
    ▼              ▼              ▼                ▼
 Reasoning     Coding         Vision           Audio/
  & Math      (≥HumanEval    (image /         Speech
    │          90%)           video)              │
    ▼              │              │                ▼
DeepSeek-R1    GPT-4o /       GPT-4o /       GPT-4o
Claude Fable   DeepSeek       Gemini 2.5     Gemini 2.5
Gemini 2.5     Coder          Claude Fable   (Whisper
(reasoning     Qwen-Coder     (OCR, docs)     for OSS)
 mode)
          │
          ▼
    ┌──────────────────────────────┐
    │ Cost constraint?             │
    │ < $0.01 per 1K tokens?       │
    └──────────────┬───────────────┘
                   │
          ┌────────┴────────┐
         YES               NO
          │                 │
          ▼                 ▼
  Gemini Flash,     Task-appropriate
  Nova Micro,       frontier model
  Haiku 4.5,        (see above)
  Self-hosted OSS
```

### 7.2 Task-to-Model Mapping

| Task Category | Primary Model | Fallback | Rationale |
| --- | --- | --- | --- |
| Complex reasoning / research | Claude Fable 5, o3, Gemini 2.5 Pro | Claude Sonnet 5 | Extended thinking; long context |
| Code generation (general) | GPT-4o, Claude Sonnet 5 | DeepSeek-Coder | Broad language support |
| Code review / refactoring | Claude Fable 5, Gemini 2.5 Pro | GPT-4o | Long context + reasoning |
| Classification / triage | Claude Haiku 4.5, Gemini Flash | Nova Micro | Cost; speed |
| RAG / document Q&A | Claude Sonnet 5, Cohere Command R+ | Gemini Flash | Faithfulness; long context |
| Customer support chat | Claude Haiku 4.5, GPT-4o mini | Gemini Flash | Speed; cost; safety |
| Vision / image analysis | GPT-4o, Gemini 2.5 Pro | Llama 3.2 11B | Multimodal quality |
| Audio transcription | GPT-4o Realtime, Gemini Flash | Whisper (OSS) | Native audio capability |
| Translation | GPT-4o, Qwen2.5 | Mistral Large 2 | Multilingual quality |
| SQL / structured data | GPT-4o, Claude Haiku | DeepSeek-V3 | Structured output reliability |
| Agent planning | Claude Fable 5, GPT-4o | Claude Sonnet 5 | Tool use; instruction following |
| Embedding | Cohere Embed 3, OpenAI text-3 | Jina / BGE-M3 (OSS) | Retrieval quality; multilingual |
| Air-gapped / on-premise | Llama 3.3 70B, Mistral Small | Phi-4 | Full data control |
| Edge / mobile | Phi-3 Mini, Gemma 3 4B | Llama 3.2 3B | Low memory; CPU-friendly |
| Financial analysis | Claude Sonnet 5, GPT-4o | — | Safety; structured output |
| Medical / clinical | Claude Fable 5 (with HITL) | — | Safety; faithfulness |

### 7.3 Approved Model Tiers

Structure your enterprise catalog as three tiers:

| Tier | Criteria | Examples | Approval Required |
| --- | --- | --- | --- |
| **T1: Approved Production** | Security reviewed, SLA backed, DPA signed, benchmarked on enterprise tasks | Claude Sonnet 5, GPT-4o, Gemini 2.5 Pro, Llama 3.3 70B (self-hosted) | Architecture review board |
| **T2: Approved Experimental** | Evaluated but limited production use; monitoring required | DeepSeek-R1 (self-hosted), Qwen2.5, Mistral Large 2 | Team lead + security sign-off |
| **T3: Sandbox Only** | Not approved for production data; dev/test only | New model releases, community models, unreviewed weights | Engineer self-service in sandbox |

---

## 8. Dynamic Model Selection

### 8.1 Classification-Based Routing

A lightweight classifier routes requests before they hit expensive models:

```python
class TaskClassifier:
    """Routes requests to the most cost-effective viable model."""

    ROUTING_RULES = {
        "simple_extraction": {"model": "claude-haiku-4-5", "max_tokens": 256},
        "classification":    {"model": "gemini-flash-2.0", "max_tokens": 128},
        "code_generation":   {"model": "gpt-4o",           "max_tokens": 4096},
        "long_analysis":     {"model": "claude-sonnet-5",  "max_tokens": 8192},
        "complex_reasoning": {"model": "claude-fable-5",   "max_tokens": 16384},
        "vision":            {"model": "gpt-4o",           "max_tokens": 2048},
    }

    def classify(self, request: str, context: dict) -> str:
        # Fast heuristic pass (no LLM call)
        if len(request) < 200 and "classify" in request.lower():
            return "classification"
        if "```" in request or "def " in request or "function " in request:
            return "code_generation"
        if context.get("images"):
            return "vision"
        if context.get("doc_tokens", 0) > 50_000:
            return "long_analysis"

        # Classifier LLM call (cheap model)
        # Returns: simple_extraction | classification | code_generation |
        #          long_analysis | complex_reasoning
        return self._classify_with_llm(request)
```

### 8.2 Confidence-Based Cascade

Generate with a cheap model, escalate only if quality is insufficient:

```
Request
  │
  ▼
[Haiku / Flash] ──→ [Quality Score > 0.85?] ──YES──→ Return response
                              │
                             NO
                              ▼
                    [Sonnet 5 / GPT-4o] ──→ [Quality Score > 0.85?] ──YES──→ Return
                              │
                             NO
                              ▼
                    [Fable 5 / o3] ──→ Return response (best effort)
```

Quality scoring approaches:

- LLM-as-judge (fast model checking output completeness)
- Length-based heuristics (suspiciously short responses flagged)
- Confidence token analysis (models supporting logprobs)
- Task-specific validators (regex check on structured output; unit tests for code)

### 8.3 Intent-Based Routing

For chat or agentic applications, route based on detected user intent:

| Intent Signal | Routing Decision | Example |
| --- | --- | --- |
| "Write code" / "Fix bug" | → Code specialist model | Codestral, GPT-4o |
| "Analyse this document" | → Long-context model | Claude Fable 5, Gemini 2.5 Pro |
| "Translate" | → Multilingual model | GPT-4o, Qwen2.5, Mistral Large 2 |
| "Summarise" | → Efficient model | Haiku, Gemini Flash |
| "Research" / "Reason about" | → Reasoning model | Fable 5 (extended thinking), o3 |
| "Look at this image" | → Multimodal model | GPT-4o, Gemini 2.5 Pro |
| Keywords: legal / medical / financial | → Safety tier + HITL gate | Claude Fable 5 with guardrails |

### 8.4 Latency-Aware Routing

```
Request with SLA tag
       │
       ├── SLA < 500ms  → Gemini Flash / Haiku / Nova Micro
       ├── SLA < 2s     → GPT-4o mini / Sonnet 5 / Mistral Small
       ├── SLA < 10s    → GPT-4o / Sonnet 5 / Gemini 2.5 Pro
       └── SLA < 60s    → Fable 5 (extended thinking) / o3
```

### 8.5 Risk-Aware Routing

Not all tasks are equal in impact of failure:

| Risk Level | Failure Impact | Model Tier | Gate |
| --- | --- | --- | --- |
| **Critical** | Legal, financial, safety consequence | T1 only; highest capability | Mandatory HITL |
| **High** | Customer-facing; reputational | T1; production-stable models | Guardrails enabled |
| **Medium** | Internal; correctable | T1 or T2; most current model | Soft guardrails |
| **Low** | Dev/internal tooling | Any approved tier | Logging only |

---

## Part V — Architecture

## 9. Model Routing Architecture

### 9.1 Architecture Patterns Comparison

See [Enterprise AI Architecture Patterns — Pattern 11: Cost Optimisation Routing](enterprise-ai-architecture-patterns.md#11-cost-optimisation-routing) and [Pattern 5: AI Gateway](enterprise-ai-architecture-patterns.md#5-ai-gateway-pattern) for canonical implementation blueprints.

| Pattern | Description | Best For | Complexity |
| --- | --- | --- | --- |
| **Rule-based** | Static rules map task type to model | Predictable workloads; low ops overhead | Low |
| **Classifier routing** | Lightweight LLM classifies intent → routes | General-purpose enterprise API | Medium |
| **Semantic router** | Embedding similarity routes to specialised handlers | Domain-specific multi-model setup | Medium |
| **Confidence cascade** | Generate cheap → escalate if quality insufficient | Cost minimisation with quality floor | Medium |
| **Latency-aware** | SLA tag determines model tier | Real-time consumer applications | Low-Medium |
| **Cost-aware** | Budget remaining per team determines model | FinOps-governed platforms | Medium |
| **Risk-aware** | Data classification drives model + gate choice | Regulated industries | High |
| **Mixture of Experts** | Ensemble multiple models; aggregate or select best | Research, high-stakes decisions | Very High |
| **Progressive enhancement** | Start simple; add models only where improvement measurable | Cost-conscious iterative build | Medium |

### 9.2 Abstraction Layer Architecture

```
APPLICATION LAYER
┌─────────────────────────────────────────────────────┐
│  App A      App B       App C       App D           │
│  (Python)   (Node.js)   (Java)      (Go)            │
└────────────────────────┬────────────────────────────┘
                         │ Standard API (OpenAI-compatible)
                         ▼
ABSTRACTION LAYER (AI Gateway)
┌─────────────────────────────────────────────────────┐
│  Auth & Rate Limiting                               │
│  Model Router (rule / classifier / cascade)         │
│  Prompt Template Engine                             │
│  Cost Tracker & Budget Enforcer                     │
│  Semantic Cache                                     │
│  Observability (traces, tokens, latency, cost)      │
│  Failover Manager                                   │
└────────────────────────┬────────────────────────────┘
                         │
       ┌─────────────────┼──────────────────┐
       ▼                 ▼                  ▼
PROVIDER LAYER
┌──────────┐     ┌──────────┐     ┌──────────────────┐
│ Anthropic│     │ OpenAI   │     │ Self-Hosted       │
│ Claude   │     │ Azure OAI│     │ (vLLM / Ollama)  │
│ Bedrock  │     │          │     │ Llama / Mistral  │
└──────────┘     └──────────┘     └──────────────────┘
       │                 │                  │
       └─────────────────┴──────────────────┘
                         │
                OBSERVABILITY LAYER
                ┌──────────────────┐
                │ LangSmith        │
                │ Phoenix (Arize)  │
                │ Datadog LLM Obs  │
                │ Grafana / OTel   │
                └──────────────────┘
```

### 9.3 Implementation Tools for the Abstraction Layer

| Tool | Type | Routing | Cost tracking | Self-host | Notes |
| --- | --- | --- | --- | --- | --- |
| **LiteLLM** | Open-source proxy | ✓ | ✓ | ✓ | 100+ providers; OpenAI-compatible; Python |
| **Kong AI Gateway** | Enterprise gateway | ✓ | ✓ | ✓ | Plugin ecosystem; Kubernetes-native |
| **OpenRouter** | Hosted gateway | ✓ | ✓ | ✗ | External service; good for prototyping |
| **Azure AI Foundry** | Managed gateway | ✓ | ✓ | ✗ | Azure-centric; model catalog |
| **Amazon Bedrock** | AWS managed | ✓ | ✓ | ✗ | AWS-native; Bedrock model list only |
| **Google Vertex AI** | GCP managed | ✓ | ✓ | ✗ | GCP-centric; Vertex model catalog |
| **LangChain Router** | Framework layer | ✓ | ✗ | ✓ | Code-level routing; no gateway overhead |

See [Kong AI Gateway Guide](../../cloud-platforms/ai-gateway/kong-ai-gateway-guide.md) for detailed configuration.

---

## 10. Multi-Model Agent Architecture

### 10.1 Specialised Agent Roles

In complex agentic systems, different models serve different roles based on their strengths. Assigning the right model to each role controls cost while maintaining quality.

```
┌─────────────────────────────────────────────────────────────┐
│                    USER REQUEST                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
               ┌─────────────────┐
               │  PLANNER MODEL  │  ← Expensive; runs once
               │  (Fable 5 /     │    Decomposes task, creates plan
               │   o3)           │    Decides which agents to invoke
               └────────┬────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ EXECUTION    │ │ CODE MODEL   │ │ VISION MODEL │
│ MODEL        │ │ (DeepSeek-   │ │ (GPT-4o /   │
│ (Haiku /     │ │  Coder /     │ │  Gemini)    │
│ Flash)       │ │  Codestral)  │ │             │
│ Fast tool    │ │ Writes code, │ │ Analyses    │
│ calls, data  │ │ tests code   │ │ images,     │
│ extraction   │ │              │ │ diagrams    │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
                        ▼
               ┌─────────────────┐
               │  VERIFIER MODEL │  ← Medium tier; runs on outputs
               │  (Sonnet 5 /    │    Checks correctness
               │   GPT-4o mini)  │    Flags issues for retry
               └────────┬────────┘
                        │
                   [Pass / Fail]
                        │
             ┌──────────┴──────────┐
            PASS                  FAIL (→ retry planner)
             │
             ▼
    ┌─────────────────┐
    │ SUMMARISER MODEL│  ← Cheap; final step
    │ (Haiku / Flash) │    Synthesises results
    │                 │    Formats output
    └─────────────────┘
```

### 10.2 Agent Role → Model Assignment Table

| Agent Role | Purpose | Recommended Model Tier | Cost Weight |
| --- | --- | --- | --- |
| **Planner** | Goal decomposition, strategy, agent coordination | T1 Premium (Fable 5, o3) | Low (called once) |
| **Reasoner** | Deep analysis, inference chains | T1 Extended thinking | Low-Medium |
| **Executor** | API calls, data extraction, actions | T3 Efficient (Haiku, Flash) | High (called many times) |
| **Code Generator** | Writing and debugging code | T1-T2 Code specialist | Medium |
| **Code Verifier** | Running and validating code output | T2 mid-tier or sandbox | Medium |
| **Retriever** | Finding relevant information (RAG) | Embedding model (separate) | High (per chunk) |
| **Vision Analyst** | Processing images, charts, PDFs | T1 Multimodal (GPT-4o, Gemini) | Medium |
| **Speech Agent** | Audio transcription / TTS | T1 Audio (GPT-4o Realtime) | Medium |
| **Judge / Critic** | Evaluating output quality | T2 mid-tier | Medium |
| **Summariser** | Final synthesis and formatting | T3 Efficient | Medium |
| **Memory Manager** | Context compression, recall | Embedding + T3 | High (background) |

### 10.3 Model Collaboration Patterns

**Sequential (Pipeline):** Output of one model feeds directly to the next.

```
Planner → Researcher (RAG) → Writer → Critic → Formatter → Output
```

Cost pattern: high model (once) → medium (once) → medium (once) → low (once)

**Parallel Fan-Out:** Planner spawns multiple specialist models simultaneously.

```
                  Planner
           ┌─────────┼─────────┐
           ▼         ▼         ▼
        Coder    Researcher  Analyst
           └─────────┼─────────┘
                  Planner (aggregates)
```

See [Parallel Fan-Out Pattern](enterprise-ai-architecture-patterns.md#4-parallel-fan-out).

**Debate / Ensemble:** Multiple models independently answer; a judge selects or synthesises best answer.

```
Question → [Model A (Claude)] ─┐
         → [Model B (GPT-4o)] ─┼→ [Judge (Sonnet 5)] → Best answer
         → [Model C (Gemini)] ─┘
```

Use for: high-stakes decisions, conflict resolution, reducing single-model hallucination risk. Cost: 3× inference plus judge call.

---

## 11. Context Window Strategy

### 11.1 When to Use Each Context Size

| Context Size | Use Case | Model Options | Trade-off |
| --- | --- | --- | --- |
| **< 32K** | Single document Q&A; short chat; classification | Any model | No constraint |
| **32K – 128K** | Multi-document analysis; codebase context; conversation history | GPT-4o, Llama 3.3, Mistral Large | Cost scales with tokens |
| **128K – 500K** | Full repository analysis; book-length documents; legal contracts | Claude Sonnet 5, Nova Pro | Higher cost; verify model faithfulness |
| **500K – 1M+** | Entire codebases; multi-document legal discovery; research corpus | Claude Fable 5, Gemini 2.5 Pro | Significant cost; loss-in-middle risk |

### 11.2 Context Management Strategies

**Retrieval over stuffing:** For most enterprise use cases, RAG with 10–20 retrieved chunks outperforms naive full-context stuffing at lower cost.

**Hierarchical retrieval:** Chunk → retrieve → expand context around relevant sections. Better precision than full-document context.

**Context compression:** Use a cheap model (Haiku, Flash) to summarise prior conversation history before each long-horizon agent step.

**Memory layers:**

```
Short-term: Current conversation window (tokens)
Working: Task-specific scratchpad (compressed summaries)
Long-term: Vector store (semantic search)
Episodic: Structured key-value (facts, decisions, tool results)
```

For CALM (Context and Memory) patterns, see [CALM Context Management Pattern](enterprise-ai-architecture-patterns.md#15-calm-context-management).

---

## 12. Enterprise Reference Architectures

### 12.1 Small Startup / MVP

**Profile:** 5–20 engineers; <$50K/month AI spend; single cloud.

```
Applications
     │
     ▼
[LiteLLM Proxy] ─── Config-driven model routing
     │
     ├── Claude Sonnet 5 (primary)
     └── Claude Haiku 4.5 (triage / low-cost)

Observability: LangSmith
Auth: API key per team
```

Key decisions: Minimal infrastructure; single commercial provider; simple routing; add complexity only when cost or capability limits appear.

### 12.2 Mid-Size Enterprise

**Profile:** 50–200 engineers; multi-team; $50K–$500K/month AI spend; multi-cloud consideration.

```
Internal Applications
        │
        ▼
┌─────────────────────────────────────────┐
│         ENTERPRISE AI GATEWAY           │
│    (Kong AI / LiteLLM + custom rules)   │
│  ┌──────────────┐ ┌──────────────────┐  │
│  │ Task Router  │ │  Cost Controller │  │
│  │ (classifier) │ │  (budget/team)   │  │
│  └──────────────┘ └──────────────────┘  │
└────────────────────┬────────────────────┘
                     │
     ┌───────────────┼─────────────────┐
     ▼               ▼                 ▼
  Anthropic       OpenAI           Self-hosted
  (Claude Fable,  (GPT-4o /        (Llama 3.3 70B
   Sonnet, Haiku) GPT-4o mini)      on K8s cluster)
                                   Sensitive data only

Observability: Datadog or Phoenix (Arize)
Auth: SSO + per-team API keys; model tier RBAC
Governance: Monthly model review board
```

### 12.3 Large Regulated Enterprise (Bank / Insurance / Healthcare)

**Profile:** 500+ engineers; $1M+/month AI spend; strict data residency; compliance requirements.

```
PUBLIC INTERNET
      │ (no AI data crosses this boundary for T1 data)
      │
[PERIMETER]
      │
┌─────────────────────────────────────────────────────┐
│                  PRIVATE VPC / ON-PREMISE            │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │          AI GOVERNANCE CONTROL PLANE        │    │
│  │  Policy engine | Audit log | PII scanner    │    │
│  └──────────────────────┬──────────────────────┘    │
│                         │                           │
│  ┌──────────────────────┼──────────────────────┐    │
│  │              AI GATEWAY LAYER                │    │
│  │ ┌─────────────────┐ ┌─────────────────────┐ │    │
│  │ │ Regulated tier  │ │  Commercial tier    │ │    │
│  │ │ (T0 data only)  │ │  (T2/T3 data only) │ │    │
│  │ │ Self-hosted OSS │ │  Bedrock / Vertex   │ │    │
│  │ │ Llama / Granite │ │  Claude / Gemini    │ │    │
│  │ └─────────────────┘ └─────────────────────┘ │    │
│  └──────────────────────────────────────────────┘    │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │         DATA CLASSIFICATION LAYER            │   │
│  │  T0: Personal/clinical/regulated → self-host │   │
│  │  T1: Internal sensitive → private endpoints  │   │
│  │  T2: Internal general → commercial (DPA)     │   │
│  │  T3: Public → any approved model             │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### 12.4 Government / Sovereign AI

**Profile:** National security or data sovereignty requirements; no commercial cloud in some deployments.

```
CLASSIFIED NETWORK (no internet)
          │
    ┌─────────────────────────────────┐
    │     AIR-GAPPED AI PLATFORM      │
    │                                 │
    │  Self-hosted models only:       │
    │  - Llama 3.3 70B (vetted)       │
    │  - Mistral Large (vetted)       │
    │  - IBM Granite (enterprise SLA) │
    │                                 │
    │  On-premise GPU: H100 cluster   │
    │  vLLM serving layer             │
    │  Internal model registry        │
    │  Full audit trail               │
    └─────────────────────────────────┘
```

Model weights must be: (a) downloaded and verified offline, (b) scanned for trojans/backdoors, (c) signed with internal keys, (d) stored in isolated registry.

### 12.5 Global SaaS / Edge AI

**Profile:** Globally distributed users; data residency by region; latency-sensitive applications.

```
USER (EU)                    USER (US)                  USER (APAC)
    │                            │                           │
    ▼                            ▼                           ▼
[EU CDN Edge]             [US CDN Edge]              [APAC CDN Edge]
    │                            │                           │
    ▼                            ▼                           ▼
[EU AI Gateway]           [US AI Gateway]            [APAC AI Gateway]
    │                            │                           │
    ├── Vertex AI (EU)          ├── Bedrock (us-east)       ├── Vertex AI (asia)
    ├── Azure OAI (EU)          ├── Azure OAI (us)          ├── Qwen API (APAC)
    └── Self-hosted             └── Self-hosted             └── Self-hosted
        (GDPR, EU data)                                          (regional data)

All gateways report to:
┌──────────────────────────────────┐
│     GLOBAL CONTROL PLANE         │
│  Unified observability           │
│  Cross-region cost tracking      │
│  Governance policy sync          │
└──────────────────────────────────┘
```

---

## Part VI — Operations

## 13. Model Evaluation Framework

### 13.1 Why Benchmark Scores Are Insufficient

Public benchmarks measure narrow, standardised tasks under controlled conditions. Enterprise AI fails for different reasons:

| Benchmark limitation | Enterprise reality |
| --- | --- |
| Clean, formatted inputs | Messy, inconsistent real-world data |
| Single-turn Q&A | Multi-turn conversations with context |
| Public data | Proprietary domain knowledge required |
| Consistent prompts | Varied user phrasing in production |
| Scores averaged across tasks | Your specific task may be an outlier |
| Tested at publication | Models update continuously |

**Rule:** Always benchmark on your own data and tasks before committing a model to production.

### 13.2 Enterprise Evaluation Stack

| Tool | Purpose | OSS? | Notes |
| --- | --- | --- | --- |
| **DeepEval** | Comprehensive LLM eval framework | ✓ | Metrics: hallucination, faithfulness, relevance, toxicity |
| **Phoenix (Arize)** | Tracing + eval + LLM observability | ✓ | Visual UI; OpenTelemetry-native |
| **Ragas** | RAG-specific evaluation | ✓ | Context precision/recall, faithfulness, answer relevance |
| **LangSmith** | Tracing, eval, dataset management | Partial | Best LangChain integration; LangGraph traces |
| **Promptfoo** | Prompt testing, red-teaming, CI eval | ✓ | YAML-configurable; runs in CI pipelines |
| **OpenAI Evals** | Evaluation harness | ✓ | Provider-agnostic despite name; benchmark library |
| **HELM** | Holistic evaluation | ✓ | Stanford; multi-metric; research-grade |
| **PromptBench** | Robustness testing | ✓ | Tests sensitivity to prompt variations |

### 13.3 Enterprise Evaluation Dimensions

**Accuracy dimensions:**

- Factual correctness on domain-specific questions
- Faithfulness to provided context (RAG tasks)
- Format compliance (JSON schema, XML structure)
- Task completion rate (did it do what was asked?)

**Safety dimensions:**

- PII leakage rate
- Harmful content refusal rate
- Prompt injection resistance
- Jailbreak resistance

**Operational dimensions:**

- P50 / P95 / P99 latency
- Cost per successful task
- Retry rate (model errors / refusals)
- Throughput under load

**Regression dimensions:**

- Quality delta vs. previous model version
- Behaviour consistency across temperature=0 runs
- Edge case handling

### 13.4 Key Public Benchmarks with Enterprise Relevance

| Benchmark | What It Measures | Enterprise Relevance |
| --- | --- | --- |
| **MMLU** | Knowledge across 57 subjects | Broad domain coverage assessment |
| **GPQA Diamond** | Graduate-level scientific reasoning | Complex domain expertise |
| **HumanEval** | Python code generation | Coding capability baseline |
| **SWE-Bench Verified** | Real GitHub issue resolution | Full software engineering task quality |
| **BigCodeBench** | Diverse code generation | Multi-language coding assessment |
| **GAIA** | General AI assistant tasks | Practical task completion |
| **AgentBench** | Multi-turn agent performance | Agentic reliability |
| **WebArena** | Web navigation tasks | Browser-based automation |
| **TAU-Bench** | Tool-augmented understanding | Tool use quality |
| **LiveBench** | Monthly-updated current tasks | Avoids training data contamination |

### 13.5 Evaluation Pipeline

```
1. TASK DEFINITION
   Define: input, expected output format, success criteria

2. DATASET CREATION
   Golden set: 100–500 representative examples
   Edge cases: known-hard inputs
   Adversarial: prompt injection, jailbreak attempts

3. BASELINE EVALUATION
   Run all candidate models on dataset
   Collect: accuracy, latency, cost, format compliance

4. PRODUCTION SHADOW TEST
   Route 5% of real traffic to candidate model
   Compare outputs vs. primary model (A/B)
   Monitor for regression on production distribution

5. CONTINUOUS MONITORING
   Eval harness runs on every model update
   Alert if accuracy drops >5% or cost rises >20%
   Quarterly full evaluation review
```

---

## 14. Cost Optimisation

### 14.1 The Multi-Model Cost Reduction Playbook

The primary lever of multi-model strategy is cost: routing to the cheapest model that can adequately handle each task.

**Observed savings from routing:**

- Simple → efficient model: 60–80% cost reduction on classified tasks
- Semantic caching: 20–40% reduction on repeated or similar queries
- Batch inference: 40–50% reduction (available on Claude, GPT-4o, Gemini)
- Prompt compression: 10–30% reduction with no quality loss on concise prompts

### 14.2 Cost Optimisation Techniques

| Technique | Cost Saving | Quality Impact | Complexity |
| --- | --- | --- | --- |
| **Model routing** (complex → cheap model) | 60–80% | None (if classified correctly) | Medium |
| **Semantic caching** | 20–40% | None | Medium |
| **Batch inference** | 40–50% | None | Low |
| **Prompt compression** | 10–30% | Low if done carefully | Medium |
| **Context caching** | 50–90% on cached tokens | None | Low (provider feature) |
| **Speculative decoding** | 20–40% latency; marginal cost | None | High |
| **Quantisation (self-hosted)** | 30–50% GPU memory | Slight quality loss for INT4 | High |
| **KV cache reuse** | 30–50% on repetitive system prompts | None | Low (provider feature) |
| **Output length control** | 10–50% | Depends on task | Low |
| **Model cascade** | 40–70% | None (with quality gate) | Medium |

### 14.3 Cost Attribution Framework

Tag every AI call before it leaves your gateway:

```yaml
headers:
  X-Cost-Project: "project-id"
  X-Cost-Team: "team-id"
  X-Cost-UseCase: "use-case-slug"
  X-Cost-DataClass: "T2"
  X-Cost-Env: "prod"  # prod / staging / dev
```

This enables:

- Per-team showback/chargeback
- Per-use-case cost baselines
- Anomaly detection (>20% drift from baseline triggers alert)
- Model tier governance (detect T1 model used for T3 task)

### 14.4 FinOps Maturity for AI

| Stage | Capability | Typical Saving |
| --- | --- | --- |
| **Crawl** | Total AI spend tracked; per-project breakdown | Baseline |
| **Walk** | Per-team tagging; top-10 cost drivers identified; model routing live | 30–50% |
| **Run** | Real-time dashboards; anomaly alerts; automatic routing; chargeback; model governance reviews | 50–70% |

See [AI FinOps in Foundations](enterprise-ai-architect-foundations.md#85-ai-finops-as-an-enterprise-discipline) for the FinOps Foundation nine-bucket framework.

---

## 15. Enterprise Model Registry

### 15.1 Why a Model Registry Matters

Without a registry, enterprises face:

- Shadow AI — teams using unapproved models with production data
- Audit gaps — no record of which model made which decision
- Ungoverned deprecation — models silently removed; applications break
- No cost visibility — spend scattered across individual accounts

### 15.2 Model Registry Schema

```yaml
# Enterprise Model Registry Entry

model:
  id: "claude-sonnet-5-20250901"
  display_name: "Claude Sonnet 5"
  provider: "Anthropic"
  family: "Claude"
  version: "5.0"
  release_date: "2025-09-01"

capabilities:
  context_window: 1000000
  output_tokens_max: 128000
  vision: false
  audio: false
  function_calling: true
  streaming: true
  batch_inference: true
  structured_output: true
  mcp_support: true

performance:
  # From internal evaluation on enterprise task set
  accuracy_score: 0.91
  hallucination_rate: 0.03
  format_compliance: 0.98
  p50_latency_ms: 1200
  p95_latency_ms: 4500

cost:
  input_per_mtok: 2.00
  output_per_mtok: 10.00
  batch_discount: 0.50
  context_cache_discount: 0.90

governance:
  tier: "T1"              # T1 / T2 / T3
  status: "approved"      # approved / experimental / deprecated / retired
  approval_date: "2026-03-15"
  approved_by: "AI Architecture Review Board"
  security_review: "passed"
  security_review_date: "2026-03-10"
  data_classification_allowed: ["T1", "T2", "T3"]  # NOT T0 (personal/clinical)

compliance:
  soc2_type2: true
  hipaa: true
  gdpr: true
  pci_dss: true
  fedramp: false

regions:
  supported: ["us-east-1", "eu-west-1", "ap-southeast-1"]
  restricted: []

deployment:
  api_endpoint: "https://api.anthropic.com/v1"
  bedrock_model_id: "anthropic.claude-sonnet-5-20250901-v1:0"
  vertex_model_id: "claude-sonnet-5@20250901"
  self_hosting: false

lifecycle:
  expected_deprecation: "2027-09-01"
  successor_model: "claude-sonnet-6"
  migration_guide: "https://docs.anthropic.com/migration/sonnet-5-to-6"

ownership:
  platform_owner: "AI Platform Team"
  business_owner: "AI CoE"
  support_channel: "#ai-platform-support"
```

### 15.3 Registry Governance Workflow

```
NEW MODEL AVAILABLE (provider announcement)
           │
           ▼
   [AI Platform Team: Initial Screening]
   - Does it add capability beyond existing roster?
   - License compatible with enterprise policy?
   - Provider has signed DPA?
           │
          YES
           ▼
   [Security Review (2 weeks)]
   - API endpoint security assessment
   - Data handling agreement review
   - Prompt injection testing
   - PII handling verification
           │
       PASSED
           ▼
   [Architecture Review Board (1 week)]
   - Use case fit assessment
   - Cost/capability comparison vs existing roster
   - Assign tier (T1 / T2 / T3)
   - Define approved data classification levels
           │
        APPROVED
           ▼
   [Registry Entry Created]
   [Teams notified via #ai-platform-updates]
   [Available in gateway routing config]

DEPRECATION TRIGGER (provider announces EOL):
   [Platform team creates migration guide]
   [90-day notice to all consuming teams]
   [Automatic routing failover configured]
   [Registry status → "deprecated" then "retired"]
```

---

## Part VII — Governance and Security

## 16. Enterprise Governance

### 16.1 AI Model Governance Framework

Enterprise model governance answers: Who approves what model for what use, with what controls, and who is accountable?

**Governance bodies:**

| Body | Scope | Cadence | Decisions |
| --- | --- | --- | --- |
| **AI Architecture Review Board** | Model approval, tier assignment | Monthly | Add/remove models from registry |
| **AI CoE (Centre of Excellence)** | Standards, patterns, training | Quarterly | Guidance, tooling selection |
| **Business Unit AI Leads** | Use case approval | Per project | Use case risk assessment |
| **AI Security Team** | Security reviews, incident response | Continuous | Security approval, incident triage |
| **Legal / Compliance** | DPA review, licensing, regulatory | Per vendor | Vendor approval, jurisdiction decisions |

### 16.2 Model Lifecycle Policy

```
RESEARCH → EXPERIMENTAL → APPROVED → DEPRECATED → RETIRED

Research:      Sandbox only; no production data; self-service
Experimental:  T2/T3 data; limited teams; enhanced monitoring
Approved:      All permitted data classes; full production use
Deprecated:    No new integrations; existing use continues (90-day window)
Retired:       All routing blocked; historical audit retained 7 years
```

### 16.3 Use Case Approval Checklist

Before deploying any AI feature to production:

- [ ] Model in T1 or T2 registry with appropriate data classification?
- [ ] Data classification of inputs assessed and documented?
- [ ] PII/sensitive data masked before API call?
- [ ] System prompt reviewed and version-controlled?
- [ ] Guardrail pipeline configured (content safety, PII detection)?
- [ ] HITL gates defined for high-risk actions?
- [ ] Fallback model configured?
- [ ] Observability: traces, latency, cost, accuracy monitoring active?
- [ ] Incident response runbook documented?
- [ ] Legal review of outputs (if customer-facing, regulated domain)?
- [ ] EU AI Act risk classification completed (if EU deployment)?

### 16.4 Regulatory Framework Alignment

| Regulation | Key AI Requirements | Architecture Response |
| --- | --- | --- |
| **EU AI Act** | High-risk AI systems: transparency, human oversight, accuracy | Risk classification; HITL for high-risk; audit logs |
| **NIST AI RMF** | Govern, Map, Measure, Manage | Governance board; risk registry; evals; incident process |
| **ISO 42001** | AI management system | Policy framework; documented processes; audit readiness |
| **GDPR / CCPA** | No personal data to non-compliant processors | DPA with provider; data masking; EU data residency |
| **HIPAA** | BAA required for PHI | Use Bedrock or Vertex AI with BAA; or self-host |
| **SOX** | Financial data controls; audit trails | Immutable audit logs; access controls; approval workflows |
| **FedRAMP** | US government cloud requirements | AWS GovCloud / Azure Government models only |

---

## 17. Security

### 17.1 Threat Model for Multi-Model Environments

Multi-model architectures expand the threat surface:

| Threat | Attack Vector | Mitigation |
| --- | --- | --- |
| **Prompt injection** | Malicious content in user input manipulates model behaviour | Input sanitisation; prompt injection testing; output validation |
| **Tool abuse** | Agent uses tools in unintended ways | Tool permission scoping; least-privilege tool access; action confirmation |
| **Model poisoning** | Malicious fine-tune or weight modification | Model provenance verification; registry integrity checks; SBOM |
| **Supply chain attack** | Compromised model weights or inference library | Signed model artifacts; dependency scanning; isolated download pipeline |
| **Data exfiltration** | Model leaks training or user data in outputs | Output scanning; PII detection; data classification enforcement |
| **Model denial of service** | Cost-flooding attacks via prompt amplification | Rate limiting per user/team; cost caps; anomaly detection |
| **Cross-tenant data leakage** | Context from one tenant surfaces in another | Tenant isolation; context flushing; dedicated inference endpoints |
| **Insecure MCP connections** | MCP server returns malicious tool results | MCP server authentication; output validation; sandboxed tool execution |
| **A2A trust exploitation** | Rogue agent impersonates trusted agent | Agent identity via mTLS/JWT; permission scopes per agent identity |

### 17.2 Security Architecture Controls

**Network isolation:**

```
Applications → AI Gateway (DMZ) → Provider endpoints (TLS 1.3+)
                    │
              Private VPC only (no public internet for self-hosted)
```

**Identity and access:**

- API keys scoped per team, per environment, per model tier
- Short-lived credentials preferred (AWS IAM, Azure Managed Identity)
- API key rotation every 90 days at maximum
- No hardcoded credentials in code; vault-managed secrets

**Data controls:**

- PII scanner at gateway ingress and egress
- Data classification tag enforced before model routing
- All responses logged with retention per data classification
- Encryption at rest and in transit for all AI interactions

**Model integrity (self-hosted):**

```bash
# Verify model weights before loading
sha256sum llama-3.3-70b-instruct.gguf
# Compare against published checksum from Hugging Face / Meta
# Store in internal registry with signature
```

### 17.3 Prompt Security Checklist

- [ ] System prompt stored in version control (not hardcoded)
- [ ] System prompt injection tested before production deployment
- [ ] User input validated and length-limited before model call
- [ ] Indirect prompt injection from tool/API responses tested
- [ ] Output validation before action execution (especially tool calls)
- [ ] Sensitive instructions not in user-visible system prompts
- [ ] Prompt templates reviewed for information disclosure risks

---

## 18. Vendor Lock-in Prevention

### 18.1 The Four Lock-in Vectors

| Vector | Mechanism | Risk Level | Mitigation |
| --- | --- | --- | --- |
| **API schema lock-in** | Provider-specific request format | High | OpenAI-compatible abstraction layer |
| **Feature lock-in** | Proprietary features (extended thinking, Realtime API) | Medium | Track feature dependencies; avoid in shared libraries |
| **Embedding lock-in** | Vectors incompatible across providers | High | Store raw text; rebuild index on switch; use portable formats |
| **Fine-tune lock-in** | Custom model on one provider | Very High | Keep labelled dataset; document training config; use open-source base |

### 18.2 Abstraction Layer Design

The abstraction layer is your primary defence against lock-in. Design principles:

1. **Single API contract:** Applications call your internal API (OpenAI-compatible schema preferred as it has widest adoption).
2. **Provider adapters:** Each provider implemented as a swappable adapter.
3. **Configuration-driven routing:** Model selection in config, never hardcoded.
4. **Feature flags for proprietary capabilities:** Proprietary features (e.g., extended thinking) are opt-in and isolated.

```python
# WRONG — creates lock-in
import anthropic
client = anthropic.Anthropic(api_key=key)
response = client.messages.create(
    model="claude-fable-5",
    messages=[{"role": "user", "content": prompt}]
)

# RIGHT — abstraction layer
from enterprise_ai import AIClient
client = AIClient(use_case="research-agent")  # routing config drives model selection
response = client.complete(messages=[{"role": "user", "content": prompt}])
```

### 18.3 LiteLLM as the Default Gateway

LiteLLM is the most widely adopted open-source solution for multi-model abstraction:

```yaml
# litellm_config.yaml — define all models in one config
model_list:
  - model_name: "primary-reasoning"
    litellm_params:
      model: "anthropic/claude-fable-5-20251101"
      api_key: "os.environ/ANTHROPIC_API_KEY"

  - model_name: "production-standard"
    litellm_params:
      model: "anthropic/claude-sonnet-5-20250901"
      api_key: "os.environ/ANTHROPIC_API_KEY"

  - model_name: "high-volume-triage"
    litellm_params:
      model: "gemini/gemini-2.0-flash"
      api_key: "os.environ/GOOGLE_API_KEY"

  - model_name: "air-gapped-workload"
    litellm_params:
      model: "ollama/llama3.3:70b"
      api_base: "http://internal-gpu-cluster:11434"

router_settings:
  routing_strategy: "usage-based-routing-v2"
  fallbacks: [{"primary-reasoning": ["production-standard"]}]
  context_window_fallbacks: [{"claude-fable-5": ["gemini-2.5-pro"]}]
```

### 18.4 Prompt Portability

Design prompts to be model-agnostic:

**Avoid model-specific syntax in shared templates:**

```xml
<!-- BAD: Claude-specific XML tags in a shared template -->
<claude_instructions>
  You are an analyst...
</claude_instructions>

<!-- GOOD: Model-agnostic instructions -->
<system>
  You are an analyst. Your task is: {task_description}
  Format your response as: {output_format}
</system>
```

**Model-specific tuning in adapters, not prompts:**

```python
class ModelAdapter:
    def format_prompt(self, template: str, model_id: str) -> str:
        if model_id.startswith("claude"):
            return self._apply_claude_formatting(template)
        elif model_id.startswith("gpt"):
            return self._apply_openai_formatting(template)
        return template  # fallback: use as-is
```

---

## 19. Prompt Portability

### 19.1 Universal Prompt Structure

Structure prompts so the core logic is model-agnostic:

```
┌────────────────────────────────────────┐
│  SYSTEM SECTION                        │
│  - Role and identity                   │
│  - Task objective (model-agnostic)     │
│  - Constraints and guardrails          │
│  - Output format specification         │
├────────────────────────────────────────┤
│  CONTEXT SECTION                       │
│  - Background knowledge                │
│  - Retrieved documents (RAG)           │
│  - Conversation history                │
├────────────────────────────────────────┤
│  TASK SECTION                          │
│  - Specific request                    │
│  - Input data                          │
│  - Examples (few-shot)                 │
├────────────────────────────────────────┤
│  CONSTRAINTS SECTION                   │
│  - What NOT to do                      │
│  - Edge case handling                  │
│  - Fallback behaviour                  │
└────────────────────────────────────────┘
```

### 19.2 Structured Output Portability

All frontier models support JSON schema enforcement; use it consistently:

```python
# Portable structured output approach
RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "answer": {"type": "string"},
        "confidence": {"type": "number", "minimum": 0, "maximum": 1},
        "citations": {"type": "array", "items": {"type": "string"}}
    },
    "required": ["answer", "confidence"]
}

# Implemented per-provider but same schema
# Claude: tool_choice={"type": "tool"} with matching tool schema
# OpenAI: response_format={"type": "json_schema", "json_schema": ...}
# Gemini: response_mime_type="application/json" + response_schema
```

### 19.3 Few-Shot Example Portability

Few-shot examples are the most portable prompt component — they work identically across all providers. When moving between models, these require no changes. System prompt framing and output format instructions may need minor adaptation.

**Migration checklist when switching models:**

- [ ] Re-test all system prompts on new model (10-sample golden set)
- [ ] Check structured output compliance (JSON schema may parse differently)
- [ ] Verify tool call format (some models use different function call schemas)
- [ ] Re-benchmark on task-specific evaluation set
- [ ] Check cost impact (token count may differ with same prompt across models)

---

## Part VIII — Looking Ahead

## 20. Future Trends 2026–2030

### 20.1 Model Commoditisation

Foundation model capabilities are converging rapidly at each price tier. GPT-4o-class capability that cost $60/MTok in 2023 costs $2.50/MTok in 2026. This trend continues:

**Implication:** Differentiation will shift from raw capability to:

- Specialisation (domain-tuned models for medicine, law, finance)
- Ecosystem and tooling quality (MCP, A2A, developer experience)
- Reliability and trust (uptime SLAs, safety certifications)
- Data integration and grounding (access to enterprise data)

**Architecture response:** Build abstraction layers that make swapping commodity capability trivial. Invest in evaluation infrastructure to quickly validate new entrants.

### 20.2 Reasoning Models as Standard

Extended thinking / chain-of-thought reasoning modes (Claude thinking, o3, DeepSeek-R1) are moving from premium features to standard capabilities. By 2027, most frontier models will have configurable reasoning depth.

**Implication:** Architecture patterns need to handle variable latency (1s to 60s+ for deep reasoning) and variable cost (2–10× baseline tokens). Design retry and timeout strategies that account for reasoning mode.

### 20.3 Small Language Models (SLMs) for Edge

Phi-4, Gemma 3 4B, Llama 3.2 3B, and similar models are reaching practical utility for many tasks at <5B parameters. On-device inference (phones, IoT, edge servers) becomes viable.

**Implication:** Enterprise architectures will include "edge tier" in the model routing hierarchy — tasks that can run locally with no network round-trip.

### 20.4 Domain-Specific Foundation Models

Purpose-built models for regulated domains are proliferating:

- **Healthcare:** BioMedLM, Med-PaLM 3, clinical fine-tunes of Llama
- **Legal:** Harvey, Thomson Reuters CoCounsel (GPT-4 backbone)
- **Financial:** Bloomberg GPT successors, Morgan Stanley internal
- **Code:** Codestral, Qwen-Coder, StarCoder 2

**Implication:** Domain-specific models may out-perform general models on narrow tasks at lower cost. Add evaluation criteria for domain benchmarks (MedQA, LegalBench, FinBench) alongside general benchmarks.

### 20.5 Mixture-of-Experts (MoE) as Default Architecture

DeepSeek-V3 (671B MoE, ~37B active parameters), Mixtral, and similar architectures show frontier performance at 3–5× lower inference cost than dense models. Most new frontier models are MoE or will be.

**Implication:** Self-hosted open-source MoE models become more attractive — high capability at GPU-efficient inference costs. Plan GPU procurement around MoE memory requirements (larger total model weight, smaller active parameters).

### 20.6 Agent-Native Models

Models designed explicitly for agentic use — planning, tool use, long-horizon task completion, and self-reflection — are replacing general-purpose models in agentic contexts. Claude's Agent SDK, OpenAI's o3 for agentic tasks, Google's Gemini 2.0 for agentic scenarios.

**Implication:** Evaluate models specifically on AgentBench and tool-use benchmarks, not just MMLU. Agentic reliability (does the agent complete the task? does it stay on-task? does it avoid tool misuse?) is the primary enterprise differentiator.

### 20.7 Confidential Inference

Azure Confidential Computing, AWS Nitro Enclaves, and specialised confidential AI clouds enable inference where even the cloud provider cannot access inputs or outputs.

**Implication:** Confidential inference may unlock regulated use cases (healthcare, government) that currently require on-premise deployment, without the operational overhead. Evaluate in 2027–2028 for sensitive workloads.

### 20.8 Model Context Protocol (MCP) and A2A Evolution

MCP (Anthropic-originated, now widely adopted) standardises tool connections to models. A2A (Agent-to-Agent) protocol standardises how agents communicate. Both are converging into infrastructure standards.

**Implication:** By 2028, most enterprise AI platforms will use MCP for tool integration and A2A for agent orchestration. Build abstraction layers that are MCP-compatible. Agents designed today with proprietary orchestration patterns will need migration.

### 20.9 Self-Improving Agents

Agents that evaluate their own outputs, generate synthetic training data, and refine their own prompts and tool use are emerging. Initial production deployments in 2026 at major tech companies.

**Enterprise implication:** Self-improving agents are difficult to audit and may drift from intended behaviour. Governance frameworks need explicit policies for agent self-modification and synthetic data generation.

---

## Best Practices & Anti-Patterns

### Do's

| Practice | Why |
| --- | --- |
| Build an AI gateway abstraction layer from day one | Switching cost is 10× higher if you wire providers directly into applications |
| Maintain a tested integration with at least two providers | Single provider failure should not take down AI-dependent services |
| Benchmark on your own data, not just public benchmarks | Model scores on your tasks can differ by 30%+ from published benchmarks |
| Tag every AI call with project / team / use-case / environment | Without tagging, you cannot govern costs or detect anomalies |
| Run evaluations on every model update (automated in CI) | Provider model updates can silently degrade your specific use cases |
| Store raw text alongside embeddings | Allows re-embedding when switching embedding model without re-ingesting data |
| Keep fine-tune training data in your own storage | Fine-tune lock-in is the hardest to escape if you lose the data |
| Define data classification policy before choosing models | Wrong model for sensitive data is a compliance incident |
| Version-control all system prompts | Prompt changes are equivalent to code changes in their impact |
| Test fallback behaviour under provider outage | Fallbacks that are never tested are not reliable |

### Don'ts

| Anti-pattern | Consequence |
| --- | --- |
| Hardcode model IDs in application code | Every model change requires code deploy across all services |
| Use T1 (premium) models for T3 (triage) tasks | 10–50× unnecessary cost; teams hit budget limits prematurely |
| Trust public benchmark rankings for production decisions | Benchmark ≠ your task; always evaluate on representative samples |
| Deploy a new model to production without shadow testing | Silent regressions discovered in production cause user-facing failures |
| Standardise on one model because it's "easiest" | Creates structural lock-in; no fallback; ceiling on cost optimisation |
| Allow teams to use unapproved models with production data | Compliance incident risk; ungoverned spend; no audit trail |
| Ignore model deprecation notices | Application breaks overnight when provider removes support |
| Build model-specific features directly into shared libraries | Creates hidden dependencies that surface only during migration |
| Fine-tune without preserving training data | Loss of fine-tune training data makes model updates impossible |
| Skip prompt injection testing | Production deployments vulnerable to user-controlled prompt manipulation |

---

## Migration Roadmap

### Phase 1: Foundation (Month 1–3)

- [ ] Audit all existing AI integrations (models, direct API calls, SDKs)
- [ ] Stand up LiteLLM or Kong AI Gateway as abstraction layer
- [ ] Migrate highest-traffic integrations to gateway
- [ ] Implement API key management via secrets vault
- [ ] Add basic tagging for cost attribution
- [ ] Define data classification tiers

### Phase 2: Governance (Month 3–6)

- [ ] Publish first model registry (even if just a spreadsheet initially)
- [ ] Stand up AI Architecture Review Board
- [ ] Implement semantic caching for top 5 use cases
- [ ] Add basic model routing (classify simple vs complex)
- [ ] Baseline evaluation harness for 3 primary use cases
- [ ] Security review of all T1 models in registry

### Phase 3: Optimisation (Month 6–12)

- [ ] Full multi-model routing across all use cases
- [ ] Automated regression eval in CI/CD pipeline
- [ ] Self-hosted open-source model for T0 data / air-gap use cases
- [ ] Cost dashboards with per-team showback
- [ ] Formal model lifecycle process (approval → deprecated → retired)
- [ ] Shadow testing pipeline for new model candidates

### Phase 4: Maturity (Month 12–24)

- [ ] Chargeback to business unit P&Ls
- [ ] Confidential inference evaluation for regulated data
- [ ] Multi-region deployment with data residency enforcement
- [ ] MCP-standardised tool layer (model-agnostic tool calls)
- [ ] Agent evaluation benchmarks integrated into model approval process

---

## Governance Checklist

**Model approval (run for each new model):**

- [ ] Vendor DPA signed with legal
- [ ] Security assessment completed (API endpoint, data handling)
- [ ] License compatible with enterprise use
- [ ] Data classification restrictions documented
- [ ] Benchmarked on at least 3 representative enterprise tasks
- [ ] Tier assigned (T1 / T2 / T3)
- [ ] Approved regions documented
- [ ] Registry entry created
- [ ] Team notification sent

**Use case approval (run for each production deployment):**

- [ ] Model in registry with correct data classification approval
- [ ] System prompt version-controlled and reviewed
- [ ] Guardrails configured
- [ ] HITL gates defined (or explicitly waived with justification)
- [ ] Fallback model configured and tested
- [ ] Observability active (traces, latency, cost, accuracy)
- [ ] Incident response runbook documented
- [ ] Regulatory compliance check (EU AI Act risk class, GDPR, etc.)

---

## Glossary

| Term | Definition |
| --- | --- |
| **A2A** | Agent-to-Agent — protocol for agents to communicate tasks and results to each other |
| **Abstraction layer** | Software layer that hides provider-specific details; applications call the abstraction, not the provider directly |
| **AI gateway** | Central control plane for AI requests: auth, routing, caching, rate limiting, observability |
| **Batch inference** | Processing many requests together at 40–50% cost discount; latency measured in hours not seconds |
| **CoT** | Chain-of-Thought — explicit reasoning step before answer generation |
| **Context caching** | Provider-side caching of repeated prefix (system prompt, documents) at 90% token cost reduction |
| **Data classification** | Tiering of data sensitivity (T0: regulated personal, T1: sensitive internal, T2: internal, T3: public) |
| **DPA** | Data Processing Agreement — legal contract governing how vendor handles your data |
| **Extended thinking** | Claude's mode for deep reasoning; model generates internal thoughts before final answer |
| **Faithfulness** | Degree to which model response stays within provided context vs. generating ungrounded content |
| **Fine-tuning** | Training a model on custom data to specialise it for a task |
| **HITL** | Human-in-the-Loop — requiring human confirmation before high-stakes model-initiated actions |
| **LLM-as-judge** | Using a language model to evaluate another model's output quality |
| **MCP** | Model Context Protocol — Anthropic standard for tool/resource connections to LLMs |
| **Model registry** | Enterprise catalog of approved models with capabilities, governance, and lifecycle metadata |
| **MoE** | Mixture-of-Experts — architecture where only a subset of model parameters activate per token |
| **MTTR** | Mean Time To Recovery — relevant when a primary model goes down and fallback must activate |
| **Prompt injection** | Attack where malicious content in user input manipulates model instructions |
| **Quantisation** | Reducing model weight precision (FP16 → INT8 → INT4) to reduce memory and increase inference speed |
| **RAG** | Retrieval-Augmented Generation — grounding model responses in retrieved documents |
| **Semantic cache** | Cache that matches semantically similar (not just identical) queries to reduce redundant model calls |
| **Shadow testing** | Routing a fraction of real traffic to a candidate model to compare with primary model in production conditions |
| **SLM** | Small Language Model — sub-10B parameter models suitable for edge and on-device inference |
| **T0/T1/T2/T3** | Data classification tiers (T0 = most sensitive, T3 = public) |
| **TTFT** | Time to First Token — latency metric measuring how quickly model begins generating output |
| **vLLM** | Open-source high-throughput inference engine for self-hosted models; uses PagedAttention |
| **Vendor lock-in** | Dependency on a specific provider that makes switching costly or disruptive |

---

## Further Reading

**Vendor Documentation**

- [Anthropic Documentation](https://docs.anthropic.com) — Claude API, Agent SDK, MCP
- [OpenAI API Reference](https://platform.openai.com/docs) — GPT-4o, o3, function calling
- [Google Vertex AI Docs](https://cloud.google.com/vertex-ai/docs) — Gemini on GCP
- [AWS Bedrock Documentation](https://docs.aws.amazon.com/bedrock) — Multi-model managed service

**Standards and Frameworks**

- [NIST AI Risk Management Framework](https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf)
- [EU AI Act Full Text](https://artificialintelligenceact.eu)
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) — AI Management Systems
- [FinOps Foundation AI FinOps Framework](https://www.finops.org/wg/ai-finops/)

**Benchmarks and Evaluation**

- [HELM Benchmark](https://crfm.stanford.edu/helm/) — Stanford holistic evaluation
- [SWE-Bench](https://www.swebench.com) — Real-world software engineering tasks
- [LiveBench](https://livebench.ai) — Contamination-free monthly benchmark
- [LMSYS Chatbot Arena](https://lmarena.ai) — Human preference leaderboard

**Tools and Frameworks**

- [LiteLLM](https://github.com/BerriAI/litellm) — Multi-provider proxy; 100+ models
- [DeepEval](https://github.com/confident-ai/deepeval) — LLM evaluation framework
- [Phoenix (Arize)](https://github.com/Arize-ai/phoenix) — LLM tracing and evaluation
- [Ragas](https://github.com/explodinggradients/ragas) — RAG evaluation
- [Promptfoo](https://github.com/promptfoo/promptfoo) — Prompt testing and red-teaming

**Internal Cross-References**

- [Enterprise AI Architect Foundations](enterprise-ai-architect-foundations.md) — Role, token economics, integration patterns
- [Enterprise AI Architecture Patterns](enterprise-ai-architecture-patterns.md) — 15 canonical patterns including routing, caching, evaluation
- [Enterprise AI Governance & Compliance](enterprise-ai-governance-compliance.md) — Governance framework detail
- [Kong AI Gateway Guide](../../cloud-platforms/ai-gateway/kong-ai-gateway-guide.md) — AI gateway implementation
- [Claude Models 2026](../../coding-tools/claude/claude-models-2026.md) — Claude model reference
