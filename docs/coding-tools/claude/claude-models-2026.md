---
title: Claude Models 2026 — Complete Reference
---

# Claude Models 2026 — Complete Reference

> **Single source of truth.** All other pages in this docs site link here for model IDs, pricing, context limits, and platform availability. Do not duplicate this information elsewhere.

---

## 1. Model Family Overview

| Model | API ID | Tier | GA Date | Context | Max Output | Input $/1M | Output $/1M | Best For |
|---|---|---|---|---|---|---|---|---|
| Claude Fable 5 | `claude-fable-5` | Frontier | Jun 9, 2026 | 1M tokens | 128K tokens | $10.00 | $50.00 | Complex synthesis, long-document analysis, frontier reasoning |
| Claude Sonnet 5 | `claude-sonnet-5` | Advanced | 2026 | 1M tokens | 128K tokens | $2.00* | $10.00* | Agentic automation, multi-step plans, cost-balanced production |
| Claude Opus 4.8 | `claude-opus-4-8` | High-Capability | 2025 | 200K tokens | 16K tokens | $15.00 | $75.00 | Complex coding, deep reasoning, long-document analysis |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` | Balanced | 2025 | 200K tokens | 16K tokens | $3.00 | $15.00 | Stable production baseline, general purpose |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` | Speed | 2025 | 200K tokens | 16K tokens | $0.80 | $4.00 | Classification, extraction, real-time interactive apps |

*Sonnet 5 introductory pricing: $2/$10 through August 31, 2026. Standard pricing $3/$15 from September 1, 2026.

---

## 2. Claude Fable 5 Deep-Dive

### Overview

Claude Fable 5 (`claude-fable-5`) is Anthropic's most capable model, reaching general availability on **June 9, 2026**. It represents a step-change in both raw capability and reasoning architecture, combining a 1M-token context window with always-on adaptive thinking.

### Key Capabilities

- **Adaptive Thinking always on** — Fable 5 applies extended reasoning to every request automatically. The model self-allocates thinking compute based on task complexity; you do not need to pass `thinking` parameters explicitly, though you can tune `budget_tokens` to cap thinking spend.
- **1M token context** — fits entire large codebases, book-length documents, or long conversation histories in a single request.
- **128K token output** — supports generation of long-form documents, full code files, and detailed reports in a single completion.
- **Frontier performance** — top-tier results for complex reasoning, mathematics, multilingual tasks, code synthesis, and scientific analysis.
- **New tokenizer** — encodes approximately 30% more tokens for the same text compared to Claude 3.x / 4.x models.

### Adaptive Thinking Control in Fable 5

Even though adaptive thinking is always on, you can still cap the thinking token budget:

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-fable-5",
    max_tokens=8192,
    thinking={"type": "enabled", "budget_tokens": 5000},  # cap thinking spend
    messages=[{"role": "user", "content": "Solve this system of equations step by step..."}]
)

# Response includes thinking blocks before text blocks
for block in response.content:
    if block.type == "thinking":
        print(f"[Thinking]: {block.thinking[:200]}...")
    else:
        print(f"[Answer]: {block.text}")
```

### When to Use Fable 5

- Tasks requiring **multi-domain synthesis** (legal + technical + financial reasoning in one pass)
- Documents exceeding 200K tokens
- Output quality directly drives business value (customer-facing reports, critical code generation)
- Accuracy is more important than cost
- Ambiguous, open-ended, or novel problems with no established pattern
- Any task where Sonnet-tier quality is insufficient after testing

!!! warning "Cost guardrail"
    At $10 input / $50 output per million tokens, Fable 5 costs roughly 5× more than Sonnet 5 (introductory) and 3.3× more than Sonnet 5 (standard). Route only tasks that genuinely require frontier capability here. See [Section 14](#14-cost-optimization-strategies) for routing patterns.

---

## 3. Claude Sonnet 5 Deep-Dive

### Overview

Claude Sonnet 5 (`claude-sonnet-5`) is Anthropic's flagship **agentic model** for 2026, designed from the ground up for multi-step autonomous tasks requiring browser operation, terminal interaction, tool orchestration, and long planning horizons. It is the default model choice for Claude Code and agent SDK workloads.

### Key Capabilities

- **Most agentic Sonnet ever** — executes multi-step plans autonomously, including browser and terminal operations
- **Adaptive thinking on by default** — unlike Sonnet 4.x, Sonnet 5 automatically applies extended reasoning; depth is controlled via `budget_tokens`
- **1M token context / 128K output** — same ceiling as Fable 5
- **New tokenizer** — same 30% token efficiency shift as Fable 5 vs Claude 4.x

### Pricing Window

!!! info "Introductory pricing"
    Through **August 31, 2026**: $2.00 input / $10.00 output per million tokens.
    From **September 1, 2026**: $3.00 input / $15.00 output per million tokens.

Lock in cost baselines for budgeting by testing and validating workloads during the introductory period.

### Validated Agentic Capabilities

| Task Type | Capability |
|---|---|
| Browser automation | Navigate, click, fill forms, extract structured page data |
| Terminal operations | Run shell commands, parse output, iterate on results |
| Multi-step code generation | Plan → implement → test → fix loop autonomously |
| Tool orchestration | Parallel and sequential tool calls within a single session |
| Long document workflows | Ingest → analyze → synthesize → structured output |
| Agent orchestration | Act as orchestrator directing sub-agents |

### When to Use Sonnet 5

- **Primary model for all new agentic pipelines** — Claude Code CLI, Agent SDK orchestrators, browser automation
- Cost-balanced production workloads where Fable 5 quality is not required
- Tasks requiring extended reasoning with token budgets under 1M
- High-volume pipelines during the introductory pricing window

---

## 4. Claude Opus 4.8

### Overview

Claude Opus 4.8 (`claude-opus-4-8`) provides Claude 4-generation Opus-tier capability for applications requiring deep reasoning within a 200K context window. Despite being superseded by Fable 5 and Sonnet 5 at the frontier, Opus 4.8 remains relevant for constrained budgets at the high-capability tier.

### Key Use Cases

| Domain | Example Task |
|---|---|
| Complex coding | Refactoring large codebases, architecture analysis |
| Deep reasoning | Multi-hop inference over long technical documents |
| Long documents | 100K–200K token contract or research paper analysis |
| Agentic work | Orchestrating sub-agents with complex multi-step goals |

### When to Use Opus 4.8 vs Fable 5

| Factor | Use Opus 4.8 | Use Fable 5 |
|---|---|---|
| Context need | ≤ 200K tokens | > 200K tokens |
| Output length | ≤ 16K tokens | > 16K tokens |
| Cost tolerance | Moderate ($15/$75/M) | Justified by quality need ($10/$50/M) |
| Adaptive thinking | Optional (via `thinking` param) | Always on |
| Availability | Broad | All platforms |

!!! note
    Fable 5 is actually cheaper per million input tokens ($10) than Opus 4.8 ($15), making Fable 5 the better choice when you need both high capability and can accept the higher output cost ($50/M vs $75/M).

---

## 5. Claude Sonnet 4.6

### Overview

Claude Sonnet 4.6 (`claude-sonnet-4-6`) is the **stable production baseline** for Claude 4-generation workloads. It is well-understood, broadly tested, and appropriate for general-purpose production use. It is the current model in Claude Code as of this writing and provides a safe migration stepping stone before moving to Sonnet 5.

### Characteristics

- 200K context, 16K output
- Extended thinking supported via `thinking` parameter
- $3.00 / $15.00 per million tokens
- Proven production stability across millions of deployments

### Migration Path to Sonnet 5

When planning migration from Sonnet 4.6 to Sonnet 5:

1. **Tokenizer change** — recount all token budgets; expect ~30% more tokens for same text
2. **Adaptive thinking** — Sonnet 5 thinks by default; audit prompts that previously worked without reasoning chains
3. **Output format** — Sonnet 5 may structure responses differently; validate with regression tests on real production prompts
4. **Context headroom** — Sonnet 5 supports 1M context; no changes needed for ≤200K workloads, but review if you want to take advantage of the expansion
5. **Pricing** — during introductory window Sonnet 5 is cheaper; standard pricing is the same as Sonnet 4.6

```python
import anthropic

client = anthropic.Anthropic()

# Step 1: Compare token counts for your production prompts
production_prompt = "Your actual production prompt here..."

for model in ["claude-sonnet-4-6", "claude-sonnet-5"]:
    count = client.messages.count_tokens(
        model=model,
        messages=[{"role": "user", "content": production_prompt}]
    )
    print(f"{model}: {count.input_tokens:,} tokens")
# Expect Sonnet 5 to report ~30% more tokens for the same text
```

---

## 6. Claude Haiku 4.5

### Overview

Claude Haiku 4.5 (`claude-haiku-4-5-20251001`) is the **speed-optimized tier** — delivering the fastest response times at the lowest cost per token. It is purpose-built for tasks where latency and throughput are the primary constraints, not raw reasoning capability.

### Characteristics

- 200K context, 16K output
- $0.80 input / $4.00 output per million tokens
- Sub-second time-to-first-token on typical requests
- Ideal for real-time interactive applications and high-volume pipelines

### Haiku 4.5 Best Use Cases

| Use Case | Why Haiku Fits |
|---|---|
| Text classification | Binary or multi-class decisions at scale |
| Entity extraction | Named entity recognition from structured text |
| Intent detection | User query routing in chatbots |
| Short summarization | Abstractive summaries of known-small documents |
| Guardrail checks | Pre/post filter on user inputs or model outputs |
| Retrieval re-ranking | Scoring passage relevance at high volume |
| Autocomplete / suggestions | Low-latency code or text suggestion |
| Translation (simple) | Known-domain text translation at scale |
| Sentiment analysis | Opinion mining at large scale |

### Haiku Cost at Scale

At 10M daily classifications:

| Model | Cost/Request | Daily Cost | Monthly Cost |
|---|---|---|---|
| claude-haiku-4-5-20251001 | ~$0.00066 | ~$6.60 | ~$198 |
| claude-sonnet-4-6 | ~$0.00525 | ~$52.50 | ~$1,575 |
| claude-sonnet-5 (intro) | ~$0.00175 | ~$17.50 | ~$525 |
| claude-fable-5 | ~$0.01125 | ~$112.50 | ~$3,375 |

*(Based on 500 input + 100 output tokens per request)*

**Always benchmark Haiku first.** For many classification and extraction tasks, Haiku quality is indistinguishable from Sonnet.

---

## 7. Model Selection Decision Tree

```
START: What does your task require?

├── Context > 200K tokens?
│   └── YES → claude-fable-5  (only model with 1M context)
│
├── Output > 16K tokens?
│   └── YES → claude-fable-5 or claude-sonnet-5
│
├── Multi-step agentic task (browser / terminal / tool chains)?
│   └── YES → claude-sonnet-5  (most agentic, cost-balanced)
│
├── Absolute quality priority, no cost constraint?
│   └── YES → claude-fable-5
│
├── Classification / extraction / routing at high volume?
│   └── YES → claude-haiku-4-5-20251001
│
├── General production task needing proven stability?
│   ├── Stability > novelty → claude-sonnet-4-6
│   └── Best current quality → claude-sonnet-5
│
└── Complex coding / 100–200K doc task, limited budget?
    └── YES → claude-opus-4-8
```

### Quick Reference Card

| Task | Primary Choice | Fallback |
|---|---|---|
| Novel research synthesis | `claude-fable-5` | `claude-opus-4-8` |
| Agentic automation | `claude-sonnet-5` | `claude-fable-5` |
| Code review (large PR) | `claude-sonnet-5` | `claude-opus-4-8` |
| Code review (small PR) | `claude-sonnet-4-6` | `claude-haiku-4-5-20251001` |
| Text classification | `claude-haiku-4-5-20251001` | `claude-sonnet-4-6` |
| Customer-facing chat | `claude-sonnet-4-6` | `claude-sonnet-5` |
| Long document Q&A (>200K) | `claude-fable-5` | — |
| Real-time autocomplete | `claude-haiku-4-5-20251001` | — |
| Bulk batch processing | `claude-haiku-4-5-20251001` (batch API) | `claude-sonnet-5` (batch API) |
| Safety / guardrail filter | `claude-haiku-4-5-20251001` | `claude-sonnet-4-6` |

---

## 8. Pricing Reference

### Standard API Pricing

| Model | Input $/1M | Output $/1M | Cache Write $/1M | Cache Read $/1M |
|---|---|---|---|---|
| claude-fable-5 | $10.00 | $50.00 | $12.50 | $1.00 |
| claude-sonnet-5 (intro, until Aug 31 2026) | $2.00 | $10.00 | $2.50 | $0.20 |
| claude-sonnet-5 (standard, from Sep 1 2026) | $3.00 | $15.00 | $3.75 | $0.30 |
| claude-opus-4-8 | $15.00 | $75.00 | $18.75 | $1.50 |
| claude-sonnet-4-6 | $3.00 | $15.00 | $3.75 | $0.30 |
| claude-haiku-4-5-20251001 | $0.80 | $4.00 | $1.00 | $0.08 |

### Batch API Pricing (50% Discount)

| Model | Batch Input $/1M | Batch Output $/1M |
|---|---|---|
| claude-fable-5 | $5.00 | $25.00 |
| claude-sonnet-5 (intro) | $1.00 | $5.00 |
| claude-sonnet-5 (standard) | $1.50 | $7.50 |
| claude-opus-4-8 | $7.50 | $37.50 |
| claude-sonnet-4-6 | $1.50 | $7.50 |
| claude-haiku-4-5-20251001 | $0.40 | $2.00 |

### Prompt Caching Pricing Rules

- **Cache write price** = standard input price × 1.25 (writing to cache costs slightly more)
- **Cache read price** = approximately 10% of standard input price
- **Minimum cacheable block** = 1,024 tokens
- **Cache TTL** = 5 minutes (ephemeral cache type)
- **Maximum cache breakpoints** = 4 per request

### Additional Billing Rules

- **Refusals** with `stop_reason: "refusal"` and zero output tokens are **not billed**
- **Thinking tokens** (content in `thinking` blocks) **are billed** as output tokens
- **Cache misses** after TTL expiry are billed at full standard input price

---

## 9. Context Window Guide

### What Fits in 1 Million Tokens

| Content Type | Approximate Token Count |
|---|---|
| Novel (400 pages) | ~100K tokens |
| Medium Python codebase (50 files) | ~150K–300K tokens |
| Legal contract bundle (50 contracts) | ~100K–200K tokens |
| Full academic paper + appendices | ~20K–50K tokens |
| One week of Slack export (active team) | ~300K–600K tokens |
| 10,000 customer support emails | ~800K–1.2M tokens |
| Entire Python standard library source | ~500K tokens |

### When to Chunk vs. Send Full Document

| Context Size | Approach |
|---|---|
| < 10K tokens | Send full document in a single request |
| 10K–200K tokens | Single request; use Sonnet 4.6 or Opus 4.8 |
| 200K–1M tokens | Single request; use Fable 5 or Sonnet 5 |
| > 1M tokens | Map-reduce or hierarchical summarization pipeline |

### Chunking Strategies

=== "Sliding Window"

    ```python
    def sliding_window_chunks(
        text: str,
        chunk_size_chars: int = 200_000,
        overlap_chars: int = 8_000
    ) -> list[str]:
        """Overlapping chunks to preserve context at boundaries."""
        chunks = []
        start = 0
        while start < len(text):
            end = start + chunk_size_chars
            chunks.append(text[start:end])
            start += chunk_size_chars - overlap_chars
        return chunks
    ```

=== "Semantic Chunking"

    ```python
    import re

    def semantic_chunks(text: str, max_chars: int = 120_000) -> list[str]:
        """Split on natural section headers, merge small sections up to max_chars."""
        # Split on markdown headers
        sections = re.split(r'\n(?=#{1,3} )', text)
        chunks, current = [], ""
        for section in sections:
            if len(current) + len(section) < max_chars:
                current += "\n" + section
            else:
                if current:
                    chunks.append(current.strip())
                current = section
        if current:
            chunks.append(current.strip())
        return chunks
    ```

=== "Map-Reduce"

    ```python
    import anthropic
    from concurrent.futures import ThreadPoolExecutor

    client = anthropic.Anthropic()

    def parallel_summarize(chunks: list[str], model: str = "claude-sonnet-5") -> str:
        """Summarize each chunk in parallel (map), then synthesize (reduce)."""

        def summarize_chunk(chunk: str) -> str:
            resp = client.messages.create(
                model=model,
                max_tokens=1024,
                messages=[{
                    "role": "user",
                    "content": f"Extract the key points from this section:\n\n{chunk}"
                }]
            )
            return resp.content[0].text

        # Map phase — run in parallel
        with ThreadPoolExecutor(max_workers=5) as executor:
            summaries = list(executor.map(summarize_chunk, chunks))

        # Reduce phase — synthesize all summaries
        combined = "\n\n---\n\n".join(summaries)
        resp = client.messages.create(
            model=model,
            max_tokens=4096,
            messages=[{
                "role": "user",
                "content": (
                    "Synthesize these section summaries into a coherent final analysis. "
                    "Eliminate redundancy and ensure logical flow:\n\n" + combined
                )
            }]
        )
        return resp.content[0].text
    ```

---

## 10. Platform Availability Matrix

| Model | Anthropic API | Claude Platform on AWS | Amazon Bedrock | Google Cloud Vertex AI | Microsoft Azure AI Foundry |
|---|---|---|---|---|---|
| claude-fable-5 | Yes | Yes | Yes | Yes | Yes |
| claude-sonnet-5 | Yes | Yes | Yes | Yes | Yes |
| claude-opus-4-8 | Yes | Limited | Yes | Yes | Yes |
| claude-sonnet-4-6 | Yes | Yes | Yes | Yes | Yes |
| claude-haiku-4-5-20251001 | Yes | Yes | Yes | Yes | Limited |

### Platform Detail

**Anthropic API (direct)**

- Endpoint: `https://api.anthropic.com`
- Auth: `x-api-key` header or `ANTHROPIC_API_KEY` environment variable
- First to receive new models and features
- Python SDK: `pip install anthropic`; TypeScript SDK: `npm install @anthropic-ai/sdk`

**Claude Platform on AWS**

- Anthropic-managed infrastructure delivered through AWS
- Billing via AWS account (consolidates with existing AWS spend)
- Auth: AWS IAM (SigV4 signatures) — integrates with your existing IAM roles and policies
- Supports VPC private endpoints for network isolation
- Best for organizations standardized on AWS identity and billing

**Amazon Bedrock**

- Model IDs use Bedrock-specific naming; check the AWS Bedrock console for exact IDs and region availability
- Supports cross-region inference profiles for latency optimization
- Integrations: Bedrock Guardrails, Bedrock Agents, Knowledge Bases, Model Evaluation
- Best for AWS-native architectures using Bedrock ecosystem features

**Google Cloud Vertex AI**

- Available via Vertex AI Model Garden as managed models
- Auth: Google Cloud IAM / Workload Identity Federation
- Integrates with Vertex AI Pipelines, Evaluation, Feature Store
- Best for GCP-native architectures

**Microsoft Azure AI Foundry**

- Available as models-as-a-service via Azure AI Foundry hubs
- Auth: Azure Active Directory / Managed Identity
- Best for Microsoft-stack enterprises and Azure OpenAI users migrating to Claude

---

## 11. Migration Guide

### Claude 3.x → Claude 4.x

| Change | Impact | Required Action |
|---|---|---|
| New model IDs | API calls fail with old IDs | Update all hardcoded model strings |
| System prompt behavior | 4.x follows instructions more precisely | Review permissive system prompts; tighten constraints |
| Refusal behavior | 4.x more task-focused; fewer spurious refusals | Regression test edge cases that previously required workarounds |
| Tool use schema | Minor schema changes | Test all tool definitions |
| Context window | 200K maintained | No change |

### Claude 4.x → Claude 5.x (Fable 5 / Sonnet 5)

| Change | Impact | Required Action |
|---|---|---|
| **New tokenizer** | ~30% more tokens for same text | Re-benchmark all token budgets and cost projections |
| **Context expansion** | 200K → 1M tokens | Update max_tokens defaults if your use case benefits |
| **Output expansion** | 16K → 128K max output | Validate truncation logic; consider longer output formats |
| **Adaptive thinking** | Sonnet 5 / Fable 5 always thinks | Audit prompts relying on no internal reasoning |
| **New model IDs** | Old IDs do not route to 5.x | Update all model ID references in code and config |
| **Pricing change** | Different per model | Recalculate cost projections with new rates |

### Tokenizer Impact Assessment

```python
import anthropic

client = anthropic.Anthropic()

PRODUCTION_PROMPTS = [
    "Your production system prompt here...",
    "Your most common user message here...",
]

MODELS = ["claude-sonnet-4-6", "claude-sonnet-5"]

for prompt in PRODUCTION_PROMPTS:
    print(f"\nPrompt: {prompt[:80]}...")
    for model in MODELS:
        count = client.messages.count_tokens(
            model=model,
            messages=[{"role": "user", "content": prompt}]
        )
        print(f"  {model}: {count.input_tokens:,} tokens")
# Expect Sonnet 5 to report approximately 30% more tokens for the same content
```

### Migration Checklist (4.x → 5.x)

- [ ] Re-count all token budgets with the 5.x tokenizer
- [ ] Update `max_tokens` limits if you were near the old 16K ceiling
- [ ] Test adaptive thinking impact on structured output prompts
- [ ] Validate JSON schema enforcement (thinking blocks appear before text blocks)
- [ ] Update cost projections with new pricing
- [ ] Verify rate limits are still sufficient (Sonnet/Haiku now match Opus at every tier)
- [ ] Test prompt caching — cache keys are model-specific
- [ ] Update model IDs in all config files, environment variables, and code
- [ ] Run full regression suite with production-representative inputs

---

## 12. Deprecation Timeline

!!! note "Known status only"
    This table reflects officially announced status as of July 2026. No speculative future dates are included. Always check the [Anthropic models overview](https://docs.anthropic.com/en/docs/models-overview) for the authoritative deprecation schedule.

| Model | Status |
|---|---|
| Claude 3 Haiku | Deprecated — migrate to `claude-haiku-4-5-20251001` |
| Claude 3 Sonnet | Deprecated — migrate to `claude-sonnet-4-6` or `claude-sonnet-5` |
| Claude 3 Opus | Deprecated — migrate to `claude-opus-4-8` or `claude-fable-5` |
| Claude 3.5 Sonnet | Maintenance mode — migrate to `claude-sonnet-4-6` |
| Claude 3.5 Haiku | Maintenance mode — migrate to `claude-haiku-4-5-20251001` |
| Claude Sonnet 4.6 | Active — no deprecation announced |
| Claude Haiku 4.5 | Active — no deprecation announced |
| Claude Opus 4.8 | Active — no deprecation announced |
| Claude Sonnet 5 | GA — current generation flagship |
| Claude Fable 5 | GA (Jun 9, 2026) — current frontier |

---

## 13. Token Counting and Cost Estimation

### Pre-Request Token Counting

```python
import anthropic
from typing import Any

client = anthropic.Anthropic()

PRICING: dict[str, dict[str, float]] = {
    "claude-fable-5":            {"input": 10.00, "output": 50.00},
    "claude-sonnet-5":           {"input": 2.00,  "output": 10.00},
    "claude-opus-4-8":           {"input": 15.00, "output": 75.00},
    "claude-sonnet-4-6":         {"input": 3.00,  "output": 15.00},
    "claude-haiku-4-5-20251001": {"input": 0.80,  "output": 4.00},
}

def estimate_cost(
    model: str,
    system: str,
    messages: list[dict],
    expected_output_tokens: int = 1000,
) -> dict[str, Any]:
    """Count input tokens and estimate total cost before sending."""
    count = client.messages.count_tokens(
        model=model,
        system=system,
        messages=messages,
    )
    prices = PRICING.get(model, {"input": 0.0, "output": 0.0})
    input_cost  = (count.input_tokens / 1_000_000) * prices["input"]
    output_cost = (expected_output_tokens / 1_000_000) * prices["output"]
    return {
        "model": model,
        "input_tokens": count.input_tokens,
        "expected_output_tokens": expected_output_tokens,
        "estimated_input_cost_usd":  round(input_cost,  6),
        "estimated_output_cost_usd": round(output_cost, 6),
        "estimated_total_cost_usd":  round(input_cost + output_cost, 6),
    }
```

### Monthly Cost Projection

```python
def monthly_cost_projection(
    daily_requests: int,
    avg_input_tokens: int,
    avg_output_tokens: int,
    model: str,
) -> dict[str, Any]:
    """Project monthly API costs for a given usage pattern."""
    prices = PRICING[model]
    monthly_requests = daily_requests * 30
    input_cost  = (monthly_requests * avg_input_tokens  / 1_000_000) * prices["input"]
    output_cost = (monthly_requests * avg_output_tokens / 1_000_000) * prices["output"]
    return {
        "model": model,
        "monthly_requests": monthly_requests,
        "monthly_input_cost_usd":  round(input_cost,  2),
        "monthly_output_cost_usd": round(output_cost, 2),
        "monthly_total_cost_usd":  round(input_cost + output_cost, 2),
    }

# Example: 10,000 daily classifications with Haiku
print(monthly_cost_projection(
    daily_requests=10_000,
    avg_input_tokens=500,
    avg_output_tokens=100,
    model="claude-haiku-4-5-20251001",
))
# monthly_total_cost_usd: ~5.40
```

### Tracking Actual Token Usage

```python
def tracked_request(client: anthropic.Anthropic, **kwargs) -> anthropic.types.Message:
    """Wrapper that logs actual usage from every API response."""
    response = client.messages.create(**kwargs)
    usage = response.usage
    print(
        f"[USAGE] model={kwargs['model']} "
        f"input={usage.input_tokens} "
        f"output={usage.output_tokens} "
        f"cache_write={getattr(usage, 'cache_creation_input_tokens', 0)} "
        f"cache_read={getattr(usage, 'cache_read_input_tokens', 0)}"
    )
    return response
```

---

## 14. Cost Optimization Strategies

### Strategy 1: Model Routing by Task Type

```python
def select_model(task_type: str, context_token_estimate: int) -> str:
    """Route each request to the cheapest capable model."""
    if context_token_estimate > 200_000:
        return "claude-fable-5"  # Only model with 1M context

    routing: dict[str, str] = {
        "classification":    "claude-haiku-4-5-20251001",
        "extraction":        "claude-haiku-4-5-20251001",
        "short_summary":     "claude-haiku-4-5-20251001",
        "guardrail_check":   "claude-haiku-4-5-20251001",
        "code_review":       "claude-sonnet-5",
        "agentic":           "claude-sonnet-5",
        "long_summary":      "claude-sonnet-5",
        "complex_reasoning": "claude-fable-5",
        "research":          "claude-fable-5",
    }
    return routing.get(task_type, "claude-sonnet-4-6")
```

### Strategy 2: Prompt Caching

Stable content blocks (system prompts, reference documents, examples) should carry `cache_control` to reduce cost on repeated calls:

```python
# System prompt with cache_control — pays full price on first call,
# ~10% on subsequent calls within 5 minutes
system = [
    {
        "type": "text",
        "text": your_long_system_prompt,  # Must exceed 1024 tokens to cache
        "cache_control": {"type": "ephemeral"}
    }
]

response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=2048,
    system=system,
    messages=[{"role": "user", "content": user_message}],
)
# response.usage.cache_read_input_tokens > 0 confirms a cache hit
```

See [Prompt Engineering Guide](prompt-engineering-claude-4.md#13-prompt-caching) for detailed caching patterns.

### Strategy 3: Batch API for Offline Workloads

Any task that does not require real-time response should use the Batch API for 50% off standard pricing:

```python
import anthropic

client = anthropic.Anthropic()

batch_requests = [
    {
        "custom_id": f"item-{i}",
        "params": {
            "model": "claude-haiku-4-5-20251001",
            "max_tokens": 256,
            "messages": [{"role": "user", "content": f"Classify: {text}"}],
        }
    }
    for i, text in enumerate(texts_to_classify)
]

batch = client.messages.batches.create(requests=batch_requests)
print(f"Batch created: {batch.id} — poll for results asynchronously")

# Poll for completion (or use webhook)
import time
while True:
    status = client.messages.batches.retrieve(batch.id)
    if status.processing_status == "ended":
        break
    time.sleep(30)

# Retrieve results
for result in client.messages.batches.results(batch.id):
    print(f"{result.custom_id}: {result.result.message.content[0].text}")
```

### Strategy 4: Constrain Output Length

Output tokens cost 3–5× more than input tokens depending on model. Constrain output aggressively:

```python
# Antipattern — open-ended output, expensive
messages=[{"role": "user", "content": "Explain machine learning."}]

# Best practice — constrained output
messages=[{
    "role": "user",
    "content": (
        "Explain machine learning in exactly 3 bullet points. "
        "Each bullet must be under 20 words. No preamble."
    )
}]
```

### Strategy 5: Haiku-First Testing Pipeline

Before scaling any pipeline on Sonnet or Fable 5, test quality with Haiku first:

```python
QUALITY_THRESHOLD = 0.85

for model in ["claude-haiku-4-5-20251001", "claude-sonnet-5", "claude-fable-5"]:
    results = [run_task(model, inp) for inp in sample_inputs]
    score = evaluate_quality(results, expected_outputs)
    print(f"{model}: quality={score:.2f}")
    if score >= QUALITY_THRESHOLD:
        print(f"Stopping at {model} — quality threshold met.")
        break
```

---

## 15. Rate Limits

As of 2026, **Sonnet and Haiku rate limits match Opus at every usage tier**. Rate limits are no longer differentiated by model tier.

### Usage Tier Structure

| Tier | RPM (all models) | Input TPM | How to Advance |
|---|---|---|---|
| Free | 5 RPM | 25K TPM | Default new account |
| Tier 1 | 50 RPM | 50K TPM | $5 cumulative spend |
| Tier 2 | 1,000 RPM | 160K TPM | $500 cumulative spend |
| Tier 3 | 5,000 RPM | 512K TPM | $5,000 cumulative spend |
| Tier 4 | Negotiated | Negotiated | Enterprise agreement |

### Rate Limit Error Handling

```python
import time
import anthropic
from anthropic import RateLimitError

def request_with_backoff(
    client: anthropic.Anthropic,
    max_retries: int = 6,
    **kwargs
) -> anthropic.types.Message:
    """Exponential backoff with jitter on rate limit errors."""
    import random
    for attempt in range(max_retries):
        try:
            return client.messages.create(**kwargs)
        except RateLimitError as e:
            if attempt == max_retries - 1:
                raise
            base_wait = 2 ** attempt
            jitter = random.uniform(0, base_wait * 0.1)
            wait = base_wait + jitter
            print(f"Rate limited — waiting {wait:.1f}s (attempt {attempt + 1}/{max_retries})")
            time.sleep(wait)
```

---

## 16. Best Practices for Model Selection in Production

1. **Default to Sonnet 5 for new agentic workloads** — best-balanced model as of mid-2026, with introductory pricing through August 2026.
2. **Always count tokens before production deployment** — run `client.messages.count_tokens()` in your CI pipeline to catch context overflow before release.
3. **Maintain a model routing config layer** — never hardcode model IDs in business logic; externalize to a config map so model swaps require no code changes.
4. **Set cost budget alerts before scaling** — API cost grows linearly with request volume; configure billing alerts before load testing.
5. **Use Haiku for all guardrail and routing decisions** — input/output safety filters, content classification, and query routing do not need Sonnet-grade intelligence.
6. **Benchmark on real production prompts** — synthetic benchmarks do not predict domain-specific performance; build an eval harness with anonymized production examples.
7. **Cache stable context aggressively** — system prompts, reference documents, and few-shot examples change rarely; apply `cache_control` to save 90% on repeated input tokens.
8. **Plan for the tokenizer change explicitly** — assume 30% more tokens when migrating from Claude 4.x to 5.x; resize all token budgets and cost projections.
9. **Add token count assertions to CI** — prevent silent regressions from prompt edits that push requests over context limits.
10. **Use Batch API for all offline workloads** — any non-real-time task should go through Batch for the 50% price reduction; this includes nightly reports, bulk classification, and dataset generation.
11. **Size thinking budgets to task complexity** — for Fable 5 and Sonnet 5, start with a small `budget_tokens` value and increase only if quality drops; thinking tokens are billed as output.
12. **Test with the new tokenizer in staging** — run your full test suite against the target model before promoting to production.

---

## 17. Antipatterns

!!! danger "Using Fable 5 as the Default Model"
    At $10/$50 per million tokens, Fable 5 costs 5–13× more than Haiku. Using it as a blanket default for all tasks including classification and routing wastes significant budget. Always route tasks to the cheapest capable model.

!!! danger "Hardcoding Model IDs in Application Logic"
    Embedding model IDs directly in request code means model upgrades require code changes and redeployments. Externalize model selection to configuration so updates are a config push, not a deployment.

!!! danger "Ignoring the Tokenizer Change When Migrating to 5.x"
    Migrating prompts from Claude 4.x to 5.x without recounting tokens leads to unexpected truncation, context overflow errors, or cost overruns. Always recount with the target model's tokenizer.

!!! danger "Not Using Prompt Caching for Stable Content"
    Sending the same 5,000-token system prompt on every request without `cache_control` pays full input price every time. With caching, subsequent calls within 5 minutes pay ~10% of that cost.

!!! danger "Missing Rate Limit Retry Logic"
    Production code without exponential backoff on `RateLimitError` will crash during traffic spikes. Always implement retry with jitter.

!!! danger "Using Standard API for Offline Batch Workloads"
    Nightly report generation, bulk embeddings, and dataset classification through the real-time API pay full price. The Batch API offers 50% off for async workloads with no quality difference.

!!! danger "Assuming Tasks Need Fable 5 Without Testing Cheaper Tiers"
    Most classification, extraction, and short-form generation tasks run acceptably on Haiku. Testing only at the top tier leaves 5–13× cost savings on the table.

!!! danger "Unbounded Output Requests"
    Sending prompts without explicit output length constraints results in verbose, expensive completions. Always specify the expected format and approximate length.

!!! danger "Ignoring Thinking Token Cost"
    In Fable 5 and Sonnet 5, thinking tokens are billed as output tokens. A `budget_tokens: 50000` allocation at Fable 5 output pricing costs $2.50 per request in thinking alone. Size thinking budgets carefully.

!!! danger "Evaluating Models Only on Toy Examples"
    Toy benchmark prompts do not predict production performance in your domain. Always build an eval harness with real (anonymized) production inputs before committing to a model.
