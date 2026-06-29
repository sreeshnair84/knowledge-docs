---
title: Claude Models 2026
---

# Claude Models 2026

Complete reference for the Anthropic Claude model family as of June 2026 — capabilities, pricing, selection guidance, and deprecation timeline.

---

## Model Family Overview

| Model | Tier | Input ($/MTok) | Output ($/MTok) | Context | Best For |
|-------|------|----------------|-----------------|---------|----------|
| Claude Opus 4.6 / 4.8 | Flagship | $5 | $25 | 1M tokens | Complex reasoning, long-horizon agentic tasks |
| Claude Sonnet 4.6 | Balanced | $3 | $15 | 1M tokens | Production workloads, best value |
| Claude Haiku 4.5 | Efficient | $1 | $5 | 200K+ tokens | High-volume, latency-sensitive, cost-critical |

---

## Claude Opus 4.x

The most capable Claude tier — optimised for tasks requiring deep reasoning, sustained autonomy, and frontier-level performance.

**Capabilities:**
- 1M token context window — process entire codebases or research corpora
- State-of-the-art on FrontierCode and CursorBench benchmarks
- Extended thinking and Adaptive Reasoning support
- Computer use (desktop automation)
- Vision: image, document, and chart understanding
- Tool use with fine-grained streaming

**When to use Opus:**
- Complex multi-step reasoning problems
- Long-horizon agentic coding tasks (>1 hour of autonomous work)
- High-stakes decisions requiring maximum reliability
- Research synthesis across large document sets
- Tasks where quality > cost

**Deprecation note:** Claude Opus 4.5 retires no earlier than November 24, 2026.

---

## Claude Sonnet 4.6

The production workhorse — 79.6% SWE-bench score, within 1.2 points of Opus, at 40% lower cost.

**Capabilities:**
- 1M token context window
- Extended thinking and Adaptive Reasoning
- Vision and multimodal input
- Tool use with streaming
- Fastest time-to-first-token among large models

**When to use Sonnet:**
- Most production API workloads
- Agentic applications with moderate complexity
- Interactive applications where response time matters
- Development and staging environments
- Default choice when uncertain

**Performance highlights:**
- 79.6% on SWE-bench Verified
- Excellent coding, analysis, and structured output
- Strong multilingual performance

---

## Claude Haiku 4.5

Maximum throughput and minimum cost — near-frontier capability at a fraction of the price.

**Capabilities:**
- Fast inference, lowest latency
- Vision support
- Tool use
- Expanded context window (200K+, with 1M in beta)

**When to use Haiku:**
- High-volume classification, extraction, or routing tasks
- Real-time applications with strict latency SLA (<1 second)
- Pre-processing or filtering before calling a larger model
- Cost-sensitive production at scale (>10M tokens/day)
- Streaming chat applications

---

## Adaptive Reasoning (Extended Thinking)

All Claude 4.x models support **Adaptive Reasoning** — replacing fixed token budgets with effort levels that Claude internally selects based on task complexity.

### Effort Levels

| Level | Use When |
|-------|----------|
| `standard` | Routine tasks: extraction, classification, simple Q&A |
| `high` | Moderate complexity: code review, analysis, multi-step logic |
| `xhigh` | Complex reasoning: architecture design, hard math, research |
| `max` | Frontier difficulty: novel problems, maximum accuracy needed |

### API Usage

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    thinking={
        "type": "enabled",
        "effort": "high",       # standard | high | xhigh | max
        "display": "omitted"    # omit internal reasoning from output
    },
    messages=[{"role": "user", "content": "..."}]
)
```

### `display: "omitted"` Mode

- Suppresses `thinking_delta` streaming events
- Internal reasoning still happens but is not transmitted
- Use when you want reasoning benefits without exposing chain-of-thought to end users
- Reduces output payload size and streaming latency

---

## Model Selection Decision Matrix

```
Task requires >10 min of autonomous work?
  YES → Opus
  NO ↓

Cost per request matters a lot?
  YES → Check volume
    >1M tokens/day → Haiku
    <1M tokens/day → Sonnet
  NO → Sonnet

Latency critical (<500ms)?
  YES → Haiku
  NO → Sonnet

Requires frontier reasoning (novel math, hard coding)?
  YES → Opus
  NO → Sonnet
```

---

## Context Window Guide

| Use Case | Tokens Needed | Recommended Model |
|----------|---------------|-------------------|
| Single document Q&A | 10–50K | Haiku or Sonnet |
| Code review (large codebase) | 100–500K | Sonnet |
| Full repository analysis | 500K–1M | Sonnet or Opus |
| Multi-document research | 500K–1M | Opus |

**1M token context tips:**
- Performance degrades slightly in the middle of very long contexts ("lost in the middle" effect)
- Place the most important content at the start or end of the context
- Use prompt caching for stable long prefixes to reduce cost

---

## Vision & Multimodal Capabilities

All Claude 4.x models support:

| Input Type | Supported |
|-----------|-----------|
| JPEG, PNG, GIF, WebP images | ✓ |
| PDF documents | ✓ |
| Multi-image messages | ✓ |
| Video (via frames) | Limited |

**Best practices for vision:**
- Describe what you need from the image explicitly in your prompt
- For documents with mixed text/image, Claude can process both natively
- Image tokens count toward context limit (~1600 tokens for a 1080p image)
- Use base64 encoding or URL references in the API

---

## Pricing & Cost Optimisation

### Prompt Caching

Reduce costs dramatically when reusing large stable prefixes:

```python
messages=[
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": "<your_large_document>...</your_large_document>",
                "cache_control": {"type": "ephemeral"}
            },
            {"type": "text", "text": "Summarise the key risks."}
        ]
    }
]
```

- Cache read: **90% cheaper** than standard input tokens
- Cache write: standard input price
- TTL: 5 minutes (refreshed on each cache hit)
- Minimum cacheable prefix: 1,024 tokens

### Batch API (50% Discount)

For non-time-sensitive workloads:
- 50% off standard per-token pricing
- Process up to 100,000 requests per batch
- Most batches complete in under 1 hour
- Compatible with prompt caching (stacked discounts)

### Model Routing Pattern

```python
def select_model(task_complexity: str, daily_volume: int) -> str:
    if task_complexity == "frontier":
        return "claude-opus-4-6"
    elif daily_volume > 1_000_000 or task_complexity == "simple":
        return "claude-haiku-4-5-20251001"
    else:
        return "claude-sonnet-4-6"
```

---

## Deprecation & Version Timeline

| Model | Status | Retirement |
|-------|--------|-----------|
| Claude 3 Opus | Deprecated | Already retired |
| Claude 3.5 Sonnet | Deprecated | Being phased out |
| Claude Opus 4.5 | Active | No earlier than Nov 24, 2026 |
| Claude Sonnet 4.6 | Current | Active |
| Claude Haiku 4.5 | Current | Active |

**Best practice:** Always pin to a specific model version (e.g. `claude-sonnet-4-6`) in production. Never use alias endpoints that can change without warning.
