---
title: "Claude Models 2026 — Complete Reference"
---

# Claude Models 2026 — Complete Reference

> **Single source of truth.** All other pages in this docs site link here for model IDs, pricing, context limits, and platform availability. Do not duplicate this information elsewhere.
>
> **Sources:** [Anthropic Models Overview](https://docs.anthropic.com/en/docs/about-claude/models/overview) · [Claude Sonnet 5 announcement](https://www.anthropic.com/news/claude-sonnet-5) · [Claude Fable 5 launch](https://www.anthropic.com/news/claude-fable-5) · Last verified July 2026.

---

## 1. Model Family Overview

### Current Models

| Model | API Alias | Tier | GA Date | Context | Max Output | Input $/1M | Output $/1M | Best For |
|---|---|---|---|---|---|---|---|---|
| Claude Fable 5 | `claude-fable-5` | Frontier | Jun 9, 2026 | 1M tokens | 128K tokens | $10.00 | $50.00 | Long-horizon agents, frontier reasoning, multi-domain synthesis |
| Claude Mythos 5 | `claude-mythos-5` | Frontier (Glasswing) | Jun 9, 2026 | 1M tokens | 128K tokens | $10.00 | $50.00 | Same as Fable 5; Project Glasswing access only |
| Claude Opus 4.8 | `claude-opus-4-8` | High-Capability | 2025 | 1M tokens | 128K tokens | $5.00 | $25.00 | Complex agentic coding, enterprise work, deep reasoning |
| Claude Sonnet 5 | `claude-sonnet-5` | Advanced | Jun 30, 2026 | 1M tokens | 128K tokens | $3.00† | $15.00† | Best speed/intelligence balance; agentic and production workloads |
| Claude Haiku 4.5 | `claude-haiku-4-5` | Speed | 2025 | 200K tokens | 64K tokens | $1.00 | $5.00 | Classification, extraction, real-time apps |

† Introductory pricing through **August 31, 2026**: $2.00 input / $10.00 output. Standard pricing from September 1, 2026: $3.00 / $15.00.

### Legacy Models (Still Available)

| Model | API Alias | Context | Max Output | Input $/1M | Thinking |
|---|---|---|---|---|---|
| Claude Opus 4.7 | `claude-opus-4-7` | 1M tokens | 128K tokens | $5.00/$25.00 | Adaptive |
| Claude Opus 4.6 | `claude-opus-4-6` | 1M tokens | 128K tokens | $5.00/$25.00 | Both (adaptive + extended) |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` | 1M tokens | 128K tokens | $3.00/$15.00 | Both (adaptive + extended) |

:::note Model ID aliases
    Use the bare alias shown above (e.g., `claude-haiku-4-5`, `claude-sonnet-5`). Never append date suffixes in code — aliases always resolve to the correct pinned version. The full pinned ID for Haiku 4.5 is `claude-haiku-4-5-20251001`; everywhere else use the alias.

:::note 300K output beta
    Claude Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 5, and Sonnet 4.6 support up to **300K output tokens** on the Batch API using the `output-300k-2026-03-24` beta header.

---

## 2. Claude Fable 5 Deep-Dive

### Overview

Claude Fable 5 (`claude-fable-5`) is Anthropic's most capable widely released model, reaching general availability on **June 9, 2026**. It is designed for long-running autonomous agents, complex multi-domain synthesis, and tasks requiring the highest possible intelligence ceiling.

**Specs:** 1M context · 128K output · $10.00/$50.00 per MTok · Adaptive thinking (always on)

### Key Capabilities

- **Adaptive Thinking always on** — Fable 5 reasons on every request. You do not enable or disable thinking explicitly; thinking depth is controlled via `output_config.effort`.
- **1M token context** — fits entire large codebases, book-length documents, long conversation histories.
- **128K token output** — long-form documents, full code files, detailed reports in a single completion.
- **New tokenizer** — same tokenizer as Opus 4.7/4.8 and Sonnet 5. Migrating from Opus 4.6, Sonnet 4.6, or Haiku 4.5 requires re-baselining token counts (~30% increase for the same text).
- **`refusal` stop reason** — safety classifiers may decline a request (HTTP 200, `stop_reason: "refusal"`, empty or partial content). Pre-output refusals are not billed.
- **30-day data retention required** — Fable 5 is not available under zero-retention configurations.

### Adaptive Thinking API — Effort Control

:::danger Do NOT pass `budget_tokens` to Fable 5
    Passing `\{"type": "disabled"}` or `\{"type": "enabled", "budget_tokens": N}` to Fable 5 returns **HTTP 400**. Use `output_config.effort` to control thinking depth instead.

```python
import anthropic

client = anthropic.Anthropic()

# Correct: omit thinking param (or use {"type": "adaptive"}); use effort for depth control
response = client.messages.create(
    model="claude-fable-5",
    max_tokens=8192,
    output_config={"effort": "high"},  # "low" | "medium" | "high" | "xhigh" | "max"
    # Recommended: enable server-side fallback to handle refusal stop reason
    betas=["server-side-fallback-2026-06-01"],
    fallbacks=[{"model": "claude-opus-4-8"}],
    messages=[{"role": "user", "content": "Analyze this architecture and propose improvements..."}]
)

# Always check stop_reason before reading content
if response.stop_reason == "refusal":
    print(f"Request declined. Served by: {response.model}")
else:
    for block in response.content:
        if block.type == "thinking":
            # Raw chain-of-thought is never returned. thinking.thinking is empty by default.
            # Pass output_config={"thinking": {"display": "summarized"}} to get a readable summary.
            print(f"[Thinking summary]: {block.thinking}")
        else:
            print(f"[Answer]: {block.text}")
```

### Refusal Handling and Fallbacks

Fable 5 can return `stop_reason: "refusal"`. Anthropic recommends enabling server-side fallbacks:

```python
response = client.messages.create(
    model="claude-fable-5",
    max_tokens=4096,
    output_config={"effort": "medium"},
    betas=["server-side-fallback-2026-06-01"],
    fallbacks=[{"model": "claude-opus-4-8"}],
    messages=[{"role": "user", "content": user_message}]
)
# On refusal, the request is transparently re-served by Opus 4.8.
# Check response.model to see which model actually served the response.
```

### When to Use Fable 5

- Tasks requiring **multi-domain synthesis** (legal + technical + financial in one pass)
- Documents exceeding the range where Opus 4.8 quality is sufficient
- Output quality directly drives business value (customer-facing reports, critical code)
- Long-horizon agentic tasks spanning many minutes
- Accuracy is more important than cost

:::warning Cost guardrail
    At $10/$50/M, Fable 5 costs 2× Opus 4.8 on input and output. Route only tasks that genuinely require frontier capability. See [Section 14](#14-cost-optimization-strategies) for routing patterns.

---

## 3. Claude Sonnet 5 Deep-Dive

### Overview

Claude Sonnet 5 (`claude-sonnet-5`) reached general availability on **June 30, 2026** as Anthropic's flagship **balanced model** — the best combination of speed and intelligence at this tier. It is designed for agentic workflows, coding, tool use, and production workloads where Opus-tier cost is not justified.

**Specs:** 1M context · 128K output · Adaptive thinking · $3/$15 standard ($2/$10 intro through Aug 31 2026)

### Key Capabilities

- **Most agentic Sonnet yet** — multi-step planning, browser/terminal operations, tool orchestration, autonomous execution without explicit prompting
- **Adaptive thinking on by default** — Sonnet 5 reasons adaptively; effort defaults to `high` on the API and Claude Code
- **1M context / 128K output** — same ceiling as Fable 5
- **New tokenizer** — same tokenizer as Opus 4.7/4.8 and Fable 5; re-baseline token counts when migrating from Sonnet 4.6 or older

### Pricing Window

:::info Introductory pricing
    Through **August 31, 2026**: $2.00 input / $10.00 output per million tokens.
    From **September 1, 2026**: $3.00 input / $15.00 output per million tokens (same as Sonnet 4.6).

### Thinking API for Sonnet 5

Sonnet 5 uses the same adaptive thinking model as Opus 4.8. Control depth via `effort`:

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=4096,
    output_config={"effort": "high"},  # defaults to "high" on Claude API; set explicitly to change
    messages=[{"role": "user", "content": "Build a multi-step plan for this architecture migration..."}]
)
print(response.content[0].text)
```

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

- **Primary model for new agentic pipelines** — Claude Code CLI, Agent SDK orchestrators, browser automation
- Production workloads where Fable 5 quality is not required
- High-throughput pipelines with cost sensitivity (especially during introductory pricing)
- Tasks requiring adaptive reasoning with 1M context and 128K output
- Cases where Haiku quality is insufficient but Opus cost is not justified

---

## 4. Claude Opus 4.8

### Overview

Claude Opus 4.8 (`claude-opus-4-8`) is Anthropic's recommended model for **complex agentic coding and enterprise work**. It provides high-capability reasoning with 1M context, 128K output, and adaptive thinking at the $5/$25 per MTok tier.

**Specs:** 1M context · 128K output · $5.00/$25.00 per MTok · Adaptive thinking · Effort defaults to `high`

### Key Use Cases

| Domain | Example Task |
|---|---|
| Complex coding | Refactoring large codebases, architecture analysis, multi-file generation |
| Agentic engineering | Orchestrating sub-agents, long-horizon code tasks |
| Deep reasoning | Multi-hop inference over long technical documents |
| Long documents | 100K–1M token contract or research paper analysis |
| Enterprise work | Structured data extraction, report generation at scale |

### Thinking API for Opus 4.8

Opus 4.8 uses adaptive thinking. The `effort` parameter defaults to `high`:

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=8192,
    output_config={"effort": "high"},  # "low" | "medium" | "high" | "xhigh" | "max"
    messages=[{"role": "user", "content": "Review this 50-file Python codebase for security vulnerabilities..."}]
)

for block in response.content:
    if block.type == "thinking":
        print(f"[Reasoning]: {block.thinking}")
    else:
        print(f"[Answer]: {block.text}")
```

:::note `budget_tokens` on Opus 4.8
    Like Fable 5, Opus 4.8 does NOT support `budget_tokens`. Use `output_config.effort` instead. Extended thinking (`\{"type": "enabled", "budget_tokens": N}`) is supported only on Opus 4.6, Sonnet 4.6, Haiku 4.5, and older models.

### When to Use Opus 4.8 vs. Fable 5

| Factor | Use Opus 4.8 | Use Fable 5 |
|---|---|---|
| Cost sensitivity | Moderate ($5/$25/M) | Higher cost justified by quality ($10/$50/M) |
| Refusal risk | Standard stop reasons | Add fallback logic for `refusal` stop reason |
| Retention policy | Standard or zero-retention | 30-day retention required |
| Task complexity | Complex coding, enterprise work | Frontier reasoning, multi-domain synthesis |
| Both support | 1M context, 128K output, adaptive thinking |  |

### Legacy Opus Models

**Opus 4.7** (`claude-opus-4-7`) — same specs as Opus 4.8; introduced the new tokenizer and `xhigh` effort level. Adaptive thinking only; `budget_tokens` removed. Still available as a legacy model.

**Opus 4.6** (`claude-opus-4-6`) — 1M context, 128K output, $5/$25. Supports **both** extended thinking (old `budget_tokens` style) and adaptive thinking. Uses the pre-Opus-4.7 tokenizer.

---

## 5. Claude Sonnet 4.6

### Overview

Claude Sonnet 4.6 (`claude-sonnet-4-6`) is a **legacy model** that remains widely used in production. With the release of Sonnet 5, new agentic and production workloads should prefer Sonnet 5. Sonnet 4.6 remains fully supported with no announced deprecation.

**Specs:** 1M context · 128K output · $3.00/$15.00 per MTok · Both adaptive and extended thinking

### When to Keep Sonnet 4.6

- Existing pipelines with proven stability and no business need to upgrade
- Systems requiring extended thinking (`budget_tokens`) style rather than adaptive `effort`
- Cost parity with Sonnet 5 standard pricing (same $3/$15/M from Sep 1 2026)
- Applications validated on Sonnet 4.6 with no tokenizer-migration budget

### Migration Path to Sonnet 5

When planning migration from Sonnet 4.6 to Sonnet 5:

1. **Tokenizer change** — Sonnet 5 uses the new tokenizer; expect ~30% more tokens for the same text
2. **Thinking API shift** — Sonnet 5 uses adaptive thinking via `effort`; extended thinking (`budget_tokens`) is not available
3. **Output format** — Sonnet 5 may structure responses differently; validate with regression tests
4. **Context and output headroom** — both support 1M context and 128K output; no capacity change needed
5. **Pricing** — Sonnet 5 is cheaper through August 31, 2026; standard pricing is identical from Sep 1

```python
import anthropic

client = anthropic.Anthropic()

production_prompt = "Your actual production prompt here..."

# Check tokenizer impact when migrating from Sonnet 4.6 to Sonnet 5
for model in ["claude-sonnet-4-6", "claude-sonnet-5"]:
    count = client.messages.count_tokens(
        model=model,
        messages=[{"role": "user", "content": production_prompt}]
    )
    print(f"{model}: {count.input_tokens:,} tokens")
# Sonnet 5 will report roughly 30% more tokens for the same text
```

---

## 6. Claude Haiku 4.5

### Overview

Claude Haiku 4.5 (`claude-haiku-4-5`) is the **speed-optimized tier** — the fastest response times at the lowest cost per token. Purpose-built for tasks where latency and throughput are the primary constraints.

**Specs:** 200K context · 64K output · $1.00/$5.00 per MTok · Extended thinking (not adaptive)

:::note Model ID
    Use the alias `claude-haiku-4-5`. The full pinned ID is `claude-haiku-4-5-20251001`, but always use the bare alias in code and configuration.

:::note Thinking API for Haiku 4.5
    Haiku 4.5 supports **extended thinking** (`\{"type": "enabled", "budget_tokens": N}`) but does **not** support adaptive thinking. This is the opposite of Fable 5 and Opus 4.8, which only support adaptive thinking.

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

### Extended Thinking with Haiku 4.5

```python
import anthropic

client = anthropic.Anthropic()

# Haiku 4.5 uses the OLD extended thinking API (budget_tokens)
response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=4096,
    thinking={"type": "enabled", "budget_tokens": 2000},
    messages=[{"role": "user", "content": "Classify this text and explain your reasoning..."}]
)

for block in response.content:
    if block.type == "thinking":
        print(f"[Thinking]: {block.thinking}")
    else:
        print(f"[Answer]: {block.text}")
```

### Haiku Cost at Scale

At 10M daily classifications (500 input + 100 output tokens per request):

| Model | Cost/Request | Daily Cost | Monthly Cost |
|---|---|---|---|
| `claude-haiku-4-5` | ~$0.0010 | ~$10,000 | ~$300,000 |
| `claude-sonnet-4-6` | ~$0.0030 | ~$30,000 | ~$900,000 |
| `claude-sonnet-5` (intro) | ~$0.0020 | ~$20,000 | ~$600,000 |
| `claude-sonnet-5` (standard) | ~$0.0030 | ~$30,000 | ~$900,000 |
| `claude-opus-4-8` | ~$0.0075 | ~$75,000 | ~$2,250,000 |
| `claude-fable-5` | ~$0.0100 | ~$100,000 | ~$3,000,000 |

*(Input: 500 tokens; Output: 100 tokens. Haiku remains 3–10× cheaper than higher tiers.)*

**Always benchmark Haiku first.** For many classification and extraction tasks, Haiku quality is indistinguishable from Sonnet.

---

## 7. Model Selection Decision Tree

```
START: What does your task require?

├── Frontier reasoning / multi-domain synthesis / max quality?
│   ├── Project Glasswing member → claude-mythos-5
│   └── All others → claude-fable-5
│
├── Context > 200K tokens?
│   └── YES → claude-fable-5, claude-opus-4-8, or claude-sonnet-5
│             (all three support 1M; Haiku caps at 200K)
│
├── Output > 64K tokens?
│   └── YES → claude-fable-5, claude-opus-4-8, or claude-sonnet-5
│             (128K max; Haiku caps at 64K)
│
├── Complex agentic coding / enterprise engineering?
│   └── YES → claude-opus-4-8 (recommended for complex engineering work)
│
├── Agentic production workloads with cost/speed balance?
│   └── YES → claude-sonnet-5 (best speed+intelligence; intro pricing through Aug 31 2026)
│
├── Classification / extraction / routing at high volume?
│   └── YES → claude-haiku-4-5
│
├── Stable legacy production, extended thinking required?
│   └── YES → claude-sonnet-4-6 or claude-opus-4-6
│
└── Real-time autocomplete / sub-second latency required?
    └── YES → claude-haiku-4-5
```

### Quick Reference Card

| Task | Primary Choice | Fallback |
|---|---|---|
| Novel research synthesis | `claude-fable-5` | `claude-opus-4-8` |
| Complex agentic coding | `claude-opus-4-8` | `claude-sonnet-5` |
| Agentic automation (production) | `claude-sonnet-5` | `claude-opus-4-8` |
| Code review (large PR) | `claude-opus-4-8` | `claude-sonnet-5` |
| Code review (small PR) | `claude-sonnet-5` | `claude-haiku-4-5` |
| Text classification | `claude-haiku-4-5` | `claude-sonnet-5` |
| Customer-facing chat | `claude-sonnet-5` | `claude-sonnet-4-6` |
| Long document Q&A (> 200K) | `claude-fable-5` | `claude-opus-4-8` |
| Real-time autocomplete | `claude-haiku-4-5` | — |
| Bulk batch processing | `claude-haiku-4-5` (batch API) | `claude-sonnet-5` (batch API) |
| Safety / guardrail filter | `claude-haiku-4-5` | `claude-sonnet-5` |
| Project Glasswing workloads | `claude-mythos-5` | `claude-fable-5` |

---

## 8. Pricing Reference

### Standard API Pricing

| Model | Input $/1M | Output $/1M | Cache Write $/1M | Cache Read $/1M |
|---|---|---|---|---|
| `claude-fable-5` | $10.00 | $50.00 | $12.50 | $1.00 |
| `claude-mythos-5` | $10.00 | $50.00 | $12.50 | $1.00 |
| `claude-opus-4-8` | $5.00 | $25.00 | $6.25 | $0.50 |
| `claude-opus-4-7` | $5.00 | $25.00 | $6.25 | $0.50 |
| `claude-opus-4-6` | $5.00 | $25.00 | $6.25 | $0.50 |
| `claude-sonnet-5` (intro, through Aug 31, 2026) | $2.00 | $10.00 | $2.50 | $0.20 |
| `claude-sonnet-5` (standard, from Sep 1, 2026) | $3.00 | $15.00 | $3.75 | $0.30 |
| `claude-sonnet-4-6` | $3.00 | $15.00 | $3.75 | $0.30 |
| `claude-haiku-4-5` | $1.00 | $5.00 | $1.25 | $0.10 |

### Batch API Pricing (50% Discount)

| Model | Batch Input $/1M | Batch Output $/1M |
|---|---|---|
| `claude-fable-5` | $5.00 | $25.00 |
| `claude-mythos-5` | $5.00 | $25.00 |
| `claude-opus-4-8` | $2.50 | $12.50 |
| `claude-sonnet-5` (intro) | $1.00 | $5.00 |
| `claude-sonnet-5` (standard) | $1.50 | $7.50 |
| `claude-sonnet-4-6` | $1.50 | $7.50 |
| `claude-haiku-4-5` | $0.50 | $2.50 |

### Prompt Caching Pricing Rules

- **Cache write price** = standard input price × 1.25 (writing to cache costs slightly more)
- **Cache read price** = approximately 10% of standard input price
- **Minimum cacheable block** = 1,024 tokens
- **Cache TTL** = 5 minutes (ephemeral cache type)
- **Maximum cache breakpoints** = 4 per request

### Additional Billing Rules

- **Fable 5 / Mythos 5 refusals** with `stop_reason: "refusal"` and zero output tokens are **not billed**
- **Thinking tokens** (content in `thinking` blocks) **are billed** as output tokens on all models
- **Cache misses** after TTL expiry are billed at full standard input price

---

## 9. Context Window Guide

### Context and Output Limits by Model

| Model | Context Window | Max Output | Tokenizer |
|---|---|---|---|
| `claude-fable-5` | 1M tokens (~555K words) | 128K tokens | New (Opus 4.7+) |
| `claude-mythos-5` | 1M tokens | 128K tokens | New (Opus 4.7+) |
| `claude-opus-4-8` | 1M tokens | 128K tokens | New (Opus 4.7+) |
| `claude-opus-4-7` | 1M tokens | 128K tokens | New (Opus 4.7+) |
| `claude-opus-4-6` | 1M tokens (~750K words) | 128K tokens | Old |
| `claude-sonnet-5` | 1M tokens (~555K words) | 128K tokens | New (Opus 4.7+) |
| `claude-sonnet-4-6` | 1M tokens (~750K words) | 128K tokens | Old |
| `claude-haiku-4-5` | 200K tokens | 64K tokens | Old |

:::note Tokenizer difference
    Models using the **new tokenizer** (Fable 5, Mythos 5, Opus 4.7/4.8, Sonnet 5) produce roughly **30% more tokens** for the same text compared to models using the old tokenizer (Opus 4.6, Sonnet 4.6, Haiku 4.5). This means the effective word capacity in the 1M context window is lower (~555K words vs ~750K words). Always re-count tokens when migrating across the tokenizer boundary.

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
| < 10K tokens | Send full document in a single request to any model |
| 10K–200K tokens | Single request; Haiku 4.5 sufficient for simple tasks |
| 200K–1M tokens | Single request; use Opus 4.8, Sonnet 5, Fable 5, or Mythos 5 |
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

        with ThreadPoolExecutor(max_workers=5) as executor:
            summaries = list(executor.map(summarize_chunk, chunks))

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
| `claude-fable-5` | Yes | Yes | Yes | Yes | Yes |
| `claude-mythos-5` | Glasswing only | Glasswing only | Glasswing only | Glasswing only | Glasswing only |
| `claude-opus-4-8` | Yes | Yes | Yes | Yes | Yes |
| `claude-opus-4-7` | Yes | Yes | Yes | Yes | Yes |
| `claude-opus-4-6` | Yes | Yes | Yes | Yes | Yes |
| `claude-sonnet-5` | Yes | Yes | Yes | Yes | Yes |
| `claude-sonnet-4-6` | Yes | Yes | Yes | Yes | Yes |
| `claude-haiku-4-5` | Yes | Yes | Yes | Yes | Limited |

### Platform Detail

**Anthropic API (direct)**

- Endpoint: `https://api.anthropic.com`
- Auth: `x-api-key` header or `ANTHROPIC_API_KEY` environment variable
- First to receive new models and features; all beta capabilities available here first
- Python SDK: `pip install anthropic`; TypeScript SDK: `npm install @anthropic-ai/sdk`

**Claude Platform on AWS**

- Anthropic-managed infrastructure through AWS; same-day feature parity with the direct API
- Billing via AWS account; auth via AWS IAM (SigV4) with VPC private endpoint support
- Full Managed Agents support; self-hosted sandboxes not available
- Model lifecycle follows Anthropic's deprecation schedule, not Bedrock's

**Amazon Bedrock**

- Model IDs differ from the Claude API IDs (check Bedrock console for current IDs)
- Bedrock endpoint (`Claude in Amazon Bedrock`): supports Claude Fable 5, Opus 4.8, Opus 4.7, Sonnet 5
- Integrations: Bedrock Guardrails, Bedrock Agents, Knowledge Bases, Model Evaluation
- Managed Agents not available; use Claude API + tool use for agent workloads

**Google Cloud Vertex AI**

- Available via Vertex AI Model Garden; auth via GCP IAM / Workload Identity Federation
- Three endpoint types: global, multi-region, regional
- Managed Agents not available

**Microsoft Azure AI Foundry**

- Available as models-as-a-service; auth via Azure AD / Managed Identity
- Managed Agents not available

---

## 11. Migration Guide

### Claude 3.x → Claude 4.x

| Change | Impact | Required Action |
|---|---|---|
| New model IDs | API calls fail with old IDs | Update all hardcoded model strings |
| System prompt behavior | 4.x follows instructions more precisely | Review permissive system prompts |
| Refusal behavior | 4.x more task-focused; fewer spurious refusals | Regression test edge cases |
| Tool use schema | Minor schema changes | Test all tool definitions |
| Context window | Expanded to 1M (all 4.x except Sonnet 4.5, Opus 4.5) | No breaking change; review if you want to benefit |

### Opus 4.6 / Sonnet 4.6 → Opus 4.7 / Opus 4.8 / Sonnet 5

| Change | Impact | Required Action |
|---|---|---|
| **New tokenizer** | ~30% more tokens for same text | Re-count all token budgets with `count_tokens` |
| **`budget_tokens` removed** | Passing extended thinking params returns 400 on Opus 4.7/4.8 | Replace `\{"type": "enabled", "budget_tokens": N}` with `output_config=\{"effort": "..."}` |
| **`xhigh` effort** (Opus 4.7+) | New thinking depth level available | Optionally adopt for maximum thinking depth |
| **Pricing unchanged** | Same $5/$25/M (Opus) or $3/$15/M (Sonnet) | No cost impact at standard pricing |

### Any Model → Claude Fable 5 / Mythos 5

| Change | Impact | Required Action |
|---|---|---|
| **Thinking always on** | Cannot disable; `budget_tokens` rejected with HTTP 400 | Remove `\{"type": "disabled"}` or `budget_tokens`; use `output_config.effort` |
| **`refusal` stop reason** | HTTP 200 with empty content; not billed | Add `stop_reason == "refusal"` check; add server-side fallback |
| **30-day retention required** | Zero-retention orgs receive HTTP 400 | Verify org retention configuration |
| **New tokenizer** (from Opus 4.6 or below) | Token count shift | Re-baseline with `count_tokens` |
| **Long turns** | Hard tasks can run many minutes | Plan timeouts, use streaming, build progress UX |

### Tokenizer Impact Assessment

```python
import anthropic

client = anthropic.Anthropic()

PRODUCTION_PROMPTS = [
    "Your production system prompt here...",
    "Your most common user message here...",
]

# Compare old tokenizer (Sonnet 4.6) vs new tokenizer (Sonnet 5)
for prompt in PRODUCTION_PROMPTS:
    print(f"\nPrompt: {prompt[:80]}...")
    for model in ["claude-sonnet-4-6", "claude-sonnet-5"]:
        count = client.messages.count_tokens(
            model=model,
            messages=[{"role": "user", "content": prompt}]
        )
        print(f"  {model}: {count.input_tokens:,} tokens")
# Sonnet 5 (new tokenizer) will report roughly 30% more tokens
```

### Migration Checklist (moving to new-tokenizer models)

- [ ] Re-count all token budgets with the target model's tokenizer
- [ ] Update `max_tokens` limits if you were near any output ceiling
- [ ] Replace `\{"type": "enabled", "budget_tokens": N}` with `output_config=\{"effort": "..."}` (Opus 4.7+, Sonnet 5, Fable 5)
- [ ] Add `stop_reason == "refusal"` check for all Fable 5 / Mythos 5 calls
- [ ] Add `fallbacks` parameter to Fable 5 / Mythos 5 API calls (recommended)
- [ ] Verify data retention config for Fable 5 / Mythos 5 (30-day required)
- [ ] Update cost projections with new pricing
- [ ] Test prompt caching — cache keys are model-specific
- [ ] Update model IDs in all config files, environment variables, and code
- [ ] Run full regression suite with production-representative inputs

---

## 12. Deprecation Timeline

:::note Known status only
    This table reflects officially announced status as of July 2026. Always check [Anthropic model deprecations](https://docs.anthropic.com/en/about-claude/model-deprecations) for the authoritative schedule.

| Model | Status | Migrate To |
|---|---|---|
| Claude 3 Haiku | **Retired** (Apr 19, 2026) | `claude-haiku-4-5` |
| Claude 3.7 Sonnet | **Retired** (Feb 19, 2026) | `claude-sonnet-5` |
| Claude 3.5 Haiku | **Retired** (Feb 19, 2026) | `claude-haiku-4-5` |
| Claude 3 Opus | **Retired** (Jan 5, 2026) | `claude-opus-4-8` or `claude-fable-5` |
| Claude 3.5 Sonnet (all versions) | **Retired** (Oct 28, 2025) | `claude-sonnet-5` |
| Claude Opus 4.1 | **Deprecated** (retires Aug 5, 2026) | `claude-opus-4-6` or `claude-opus-4-8` |
| Claude Sonnet 4 / Opus 4 | **Deprecated** | `claude-sonnet-5` / `claude-opus-4-8` |
| Claude Opus 4.5 | Active — legacy | `claude-opus-4-6` or `claude-opus-4-8` |
| Claude Sonnet 4.5 | Active — legacy | `claude-sonnet-5` |
| Claude Opus 4.6 | Active — legacy | — |
| Claude Opus 4.7 | Active — legacy | — |
| Claude Sonnet 4.6 | Active — legacy | — |
| Claude Haiku 4.5 | Active — current | — |
| Claude Opus 4.8 | Active — current | — |
| Claude Sonnet 5 | **GA** (Jun 30, 2026) — current flagship | — |
| Claude Fable 5 | **GA** (Jun 9, 2026) — current frontier | — |
| Claude Mythos 5 | **GA** (Jun 9, 2026) — Glasswing frontier | — |

---

## 13. Token Counting and Cost Estimation

### Pre-Request Token Counting

```python
import anthropic
from typing import Any

client = anthropic.Anthropic()

PRICING: dict[str, dict[str, float]] = {
    "claude-fable-5":    {"input": 10.00, "output": 50.00},
    "claude-mythos-5":   {"input": 10.00, "output": 50.00},
    "claude-opus-4-8":   {"input":  5.00, "output": 25.00},
    "claude-opus-4-7":   {"input":  5.00, "output": 25.00},
    "claude-opus-4-6":   {"input":  5.00, "output": 25.00},
    "claude-sonnet-5":   {"input":  2.00, "output": 10.00},  # intro pricing through Aug 31 2026
    "claude-sonnet-4-6": {"input":  3.00, "output": 15.00},
    "claude-haiku-4-5":  {"input":  1.00, "output":  5.00},
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

# Example: 10,000 daily classifications with Haiku 4.5
print(monthly_cost_projection(
    daily_requests=10_000,
    avg_input_tokens=500,
    avg_output_tokens=100,
    model="claude-haiku-4-5",
))
# monthly_total_cost_usd: ~$19.50
# (300K req × (500 × $1/1M + 100 × $5/1M) = 300K × $0.00065)
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
        # Only 1M-context models; Haiku is excluded
        if task_type in ("complex_reasoning", "research", "synthesis"):
            return "claude-fable-5"
        return "claude-sonnet-5"  # cost-efficient for most 1M-context tasks

    routing: dict[str, str] = {
        "classification":    "claude-haiku-4-5",
        "extraction":        "claude-haiku-4-5",
        "short_summary":     "claude-haiku-4-5",
        "guardrail_check":   "claude-haiku-4-5",
        "code_review":       "claude-opus-4-8",
        "agentic":           "claude-sonnet-5",
        "long_summary":      "claude-sonnet-5",
        "complex_reasoning": "claude-fable-5",
        "research":          "claude-fable-5",
    }
    return routing.get(task_type, "claude-sonnet-5")
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
import time

client = anthropic.Anthropic()

batch_requests = [
    {
        "custom_id": f"item-{i}",
        "params": {
            "model": "claude-haiku-4-5",
            "max_tokens": 256,
            "messages": [{"role": "user", "content": f"Classify: {text}"}],
        }
    }
    for i, text in enumerate(texts_to_classify)
]

batch = client.messages.batches.create(requests=batch_requests)
print(f"Batch created: {batch.id}")

while True:
    status = client.messages.batches.retrieve(batch.id)
    if status.processing_status == "ended":
        break
    time.sleep(30)

for result in client.messages.batches.results(batch.id):
    print(f"{result.custom_id}: {result.result.message.content[0].text}")
```

### Strategy 4: Constrain Output Length

Output tokens cost 3–5× more than input tokens. Constrain output aggressively:

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

Before scaling any pipeline on Sonnet 5 or Fable 5, test quality with Haiku first:

```python
QUALITY_THRESHOLD = 0.85

for model in ["claude-haiku-4-5", "claude-sonnet-5", "claude-opus-4-8", "claude-fable-5"]:
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
import random
import anthropic
from anthropic import RateLimitError

def request_with_backoff(
    client: anthropic.Anthropic,
    max_retries: int = 6,
    **kwargs
) -> anthropic.types.Message:
    """Exponential backoff with jitter on rate limit errors."""
    for attempt in range(max_retries):
        try:
            return client.messages.create(**kwargs)
        except RateLimitError:
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

1. **Default to Sonnet 5 for new agentic workloads** — best-balanced model as of mid-2026, with introductory pricing through August 2026; matches Opus performance on most coding and reasoning tasks at lower cost.
2. **Use Opus 4.8 for complex engineering and enterprise work** — Anthropic's recommended starting point for complex agentic coding, architecture analysis, and enterprise tasks.
3. **Always count tokens before production deployment** — run `client.messages.count_tokens()` in your CI pipeline; remember Sonnet 5 / Opus 4.7/4.8 / Fable 5 use the new tokenizer (~30% more tokens than older models).
4. **Maintain a model routing config layer** — never hardcode model IDs in business logic; externalize to a config map so model swaps require no code changes.
5. **Set cost budget alerts before scaling** — API cost grows linearly with request volume; configure billing alerts before load testing.
6. **Use Haiku for all guardrail and routing decisions** — input/output safety filters, content classification, and query routing do not need Sonnet-grade intelligence.
7. **Benchmark on real production prompts** — synthetic benchmarks do not predict domain-specific performance; build an eval harness with anonymized production examples.
8. **Cache stable context aggressively** — system prompts, reference documents, and few-shot examples change rarely; apply `cache_control` to save 90% on repeated input tokens.
9. **Plan for tokenizer differences when migrating** — moving from Opus 4.6, Sonnet 4.6, or Haiku 4.5 to any new-tokenizer model (Sonnet 5, Opus 4.7/4.8, Fable 5) requires re-baselining all token budgets.
10. **Add token count assertions to CI** — prevent silent regressions from prompt edits that push requests over context limits.
11. **Use Batch API for all offline workloads** — any non-real-time task should go through Batch for the 50% price reduction; nightly reports, bulk classification, dataset generation.
12. **Set effort levels explicitly for thinking models** — Sonnet 5 and Opus 4.8 default to `effort: high`; set it explicitly in code so behavior is reproducible and easy to tune.
13. **Always add refusal handling for Fable 5 and Mythos 5** — use `fallbacks` server-side or implement client-side retry; a `refusal` stop reason means no content is returned and no charge is incurred.
14. **Verify data retention policy before adopting Fable 5 or Mythos 5** — 30-day retention required; zero-retention orgs receive HTTP 400.

---

## 17. Antipatterns

:::danger Using Fable 5 as the Default Model
    At $10/$50 per million tokens, Fable 5 costs 5–10× more than Haiku and 3.3× more than Sonnet 5 (standard). Using it as a blanket default wastes significant budget. Always route tasks to the cheapest capable model.

:::danger Hardcoding Model IDs in Application Logic
    Embedding model IDs directly in request code means model upgrades require code changes and redeployments. Externalize model selection to configuration so updates are a config push, not a deployment.

:::danger Using Date-Suffixed Model IDs in Code
    Never use `claude-haiku-4-5-20251001` or any date-suffixed form in your code. Use the alias `claude-haiku-4-5`. Date-suffixed IDs are the underlying pinned snapshots; the alias is the stable public API surface.

:::danger Passing `budget_tokens` to Fable 5, Opus 4.7, or Opus 4.8
    These models do not support extended thinking. Passing `\{"type": "enabled", "budget_tokens": N}` returns HTTP 400. Use `output_config=\{"effort": "..."}` instead. Extended thinking (`budget_tokens`) is only valid on Haiku 4.5, Opus 4.6, Sonnet 4.6, and older models.

:::danger Not Handling the `refusal` Stop Reason on Fable 5 / Mythos 5
    These models can return `stop_reason: "refusal"` with an empty `content` array. Reading `response.content[0].text` without checking `stop_reason` first raises an IndexError. Always check stop reason before reading content.

:::danger Ignoring the Tokenizer Change When Migrating
    Migrating from Opus 4.6, Sonnet 4.6, or Haiku 4.5 to any new-tokenizer model (Sonnet 5, Opus 4.7/4.8, Fable 5) without recounting tokens leads to truncation, context overflow, or cost overruns. Always recount with `count_tokens` using the target model.

:::danger Not Using Prompt Caching for Stable Content
    Sending the same 5,000-token system prompt on every request without `cache_control` pays full input price every time. With caching, subsequent calls within 5 minutes pay ~10% of that cost.

:::danger Missing Rate Limit Retry Logic
    Production code without exponential backoff on `RateLimitError` will crash during traffic spikes. Always implement retry with jitter.

:::danger Using Standard API for Offline Batch Workloads
    Nightly report generation, bulk classification, and dataset creation through the real-time API pay full price. The Batch API offers 50% off for async workloads with no quality difference.

:::danger Assuming Tasks Need Fable 5 Without Testing Cheaper Tiers
    Most classification, extraction, and short-form generation tasks run acceptably on Haiku. Sonnet 5 covers most agentic workloads. Test iteratively from cheapest to most expensive before committing to frontier models.

:::danger Unbounded Output Requests
    Sending prompts without explicit output length constraints results in verbose, expensive completions. Always specify the expected format and approximate length.

:::danger Ignoring Thinking Token Cost
    On Fable 5 ($50/M output), an effort level of `max` can cost several dollars per request in thinking tokens alone. Monitor `usage.output_tokens` and tune effort levels to task complexity.

:::danger Evaluating Models Only on Toy Examples
    Toy benchmark prompts do not predict production performance in your domain. Always build an eval harness with real (anonymized) production inputs before committing to a model.
