---
title: "TOKEN MANAGEMENT & AI COST ARCHITECTURE"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "AI_Cost_Implementation_Guide_2026.pdf"
doc_type: guide
tags: ["ai-economics", "enterprise-ai", "enterprise-architecture"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

# TOKEN MANAGEMENT & AI COST ARCHITECTURE

|---|---|---|---|---|
## TABLE OF CONTENTS
- **1.** Model Routing — Complexity Classifier & Routing Engine
- **2.** Semantic Cache — Redis Vector Search
- **3.** LLM Gateway — Docker Stack & PII Middleware
- **4.** Token Budget Manager — Hierarchical Enforcement
- **5.** AI FinOps — OpenTelemetry Metrics & Grafana Dashboard
- **6.** ROI Measurement Pipeline — DORA + SPACE Scorecard
- **7.** Agentic Cost Control — Budget Guard & Lazy Tool Loading
- **8.** Anti-Pattern Fixes — History Compression & Prompt Trim
- **9.** Architecture Integration Map
- **10.** Quick-Start Deployment Checklist

Complexity Classifier · Routing Engine · LiteLLM Config

## MODEL ROUTING

## Architecture Overview

The routing layer scores every incoming request with a lightweight Sentence-BERT classifier (~80 MB, <10ms inference) and dispatches to the cheapest model tier capable of handling it. RouteLLM (Stanford) demonstrates 50% cost reduction at 95% quality parity. The classifier runs before any LLM call — its own cost is negligible (~$0.00001 per classification).

### Tier Decision Matrix

|**Tier**|**Models**|**Cost/1K tok**|**Complexity**<br>**Score**|**Use Cases**|
|---|---|---|---|---|
|Nano|claude-haiku-4-5, gemini-flash,<br>gpt-4o-mini|$0.00025–$0.0<br>006|< 0.30|Autocomplete, syntax Q&A;, formatting, classification|
|Mid|claude-sonnet-4-6, gpt-4o|$0.003–$0.005|0.30–0.70|Chat, debugging, code review, multi-file context|
|Frontier|claude-opus-4-6, o3|$0.015–$0.075|> 0.70|Architecture design, complex reasoning, security<br>analysis|

### 1a — Complexity Classifier (classifier.py)

Uses cosine similarity against anchor embeddings for "trivial" vs "complex" reference prompts. Length and code-depth heuristics add to the base score. Runs in-process — no network hop.

### 1b — Routing Engine (FastAPI, main.py)

Single endpoint all consumers call. Pipeline: cache check → classify → budget check → LiteLLM dispatch → record usage → cache store. All steps tagged for observability.

### 1c — LiteLLM Provider Config (litellm_config.yaml)

```yaml
# litellm_config.yaml  (mount as Kubernetes ConfigMap) model_list : - model_name: nano litellm_params : model : anthropic/claude-haiku-4-5 api_key : os.environ/ANTHROPIC_API_KEY - model_name: nano-fallback litellm_params : model : gemini/gemini-flash-2-0 api_key : os.environ/GOOGLE_API_KEY - model_name: mid litellm_params : model : anthropic/claude-sonnet-4-6 api_key : os.environ/ANTHROPIC_API_KEY - model_name: frontier litellm_params : model : anthropic/claude-opus-4-6 api_key : os.environ/ANTHROPIC_API_KEY router_settings : routing_strategy : least-busy retry_policy : num_retries : 3 fallbacks : - [nano, nano-fallback] litellm_settings : success_callback : ["langfuse"] cache : true cache_params : type : redis host : redis-cache.internal port : 6379
```

## SEMANTIC CACHE

Redis Vector Search · TTL Strategy · Cache Warming

Semantic caching embeds the user query, finds similar past queries via cosine similarity (threshold 0.92), and returns the cached response — zero LLM cost. Production impact: 30–60% LLM call reduction. Embedding cost is ~$0.00002 per query — 100x cheaper than the LLM call it avoids. Uses RedisStack (includes RediSearch + Vector module).

### TTL Strategy by Content Type

|**Content Type**|**TTL**|**Threshold**|**Cache?**|**Reason**|
|---|---|---|---|---|
|Syntax Q&A; (stable knowledge)|30 days|0.93|Yes|High repetition, stable answers|
|Framework docs questions|7 days|0.92|Yes|Docs change slowly|
|Architecture patterns|24 hours|0.90|Yes|Moderate reuse|
|Code review (generic style)|4 hours|0.93|Selective|Avoid specific PR context|
|Security guidance|1 hour|0.95|Yes, strict|Must be current; high precision|
|Debugging help|2 hours|0.91|Selective|Context-specific|
|PII-containing prompts|Never|N/A|NO —<br>never|Privacy violation risk|
|Customer data context|Never|N/A|NO —<br>never|Data isolation requirement|

### 2a — Semantic Cache Implementation (cache.py)

### 2b — Cache Warming at Deployment

## LLM GATEWAY

Docker Compose Stack · PII Middleware · Audit Logging

The gateway is the single ingress point for all LLM traffic. Every request is tagged, PII-scrubbed, and written to an immutable audit log (Kafka → S3) before reaching any LLM provider. Required for EU AI Act Article 11 technical documentation compliance.

### 3a — Full Docker Compose Stack (docker-compose.yml)

### 3b — PII + Tagging + Audit Middleware (middleware.py)

## TOKEN BUDGET MANAGER

Hierarchical Enforcement · Circuit Breakers · Slack Alerts

Five-level budget hierarchy: Enterprise → BU → Team → Feature → Session. Redis atomic counters for real-time checks. At 80% consumed: Slack alert. At 95%: auto-downgrade model tier. At 100%: queue or reject with explanation.

### Budget Threshold Actions

|**% Budget**<br>**Remaining**|**Action**|**User Impact**|**Notification**|
|---|---|---|---|
|> 20%|Proceed normally|None|None|
|10–20%|Proceed + soft alert|None visible|Slack to team lead|
|5–10%|Proceed + alert, prepare<br>downgrade|Possible slower responses|Slack escalation|
|0–5%|Auto-downgrade model tier|Lower quality responses|Slack critical alert|
|0%|Queue non-urgent / reject<br>urgent|Blocked until next period|Slack + email to manager|

### 4a — Budget Manager (budget/manager.py)

## AI FINOPS

OpenTelemetry Metrics · Cost Attribution · Grafana Dashboard

Tag every LLM call with team_id, feature_id, use_case, model, and environment. Emit Prometheus metrics via OpenTelemetry. Store cost in micro-dollars (integer) to avoid float drift at scale. Grafana dashboards expose cost by team, model tier distribution, cache hit rate, and anomaly detection (2x rolling average alert).

### 5a — OpenTelemetry Metrics (observability/metrics.py)

### 5b — Key Grafana Prometheus Queries

|**Panel**|**PromQL Expression**|**Purpose**|
|---|---|---|
|Monthly Spend (USD)|sum(increase(llm_cost_usd_total[30d])) / 1000000|Total AI spend this month|

|**Panel**|**PromQL Expression**|**Purpose**|
|---|---|---|
|Cost by Team (7d)|sum by(team_id)(increase(llm_cost_usd_total[7d]))/1000000|Chargeback view per team|
|Cache Hit Rate|rate(llm_cache_hits_total[5m]) / rate(llm_tokens_total[5m]) * 100|Semantic cache effectiveness|
|Model Tier Dist.|sum by(tier)(increase(llm_tokens_total[24h]))|Nano/Mid/Frontier split|
|Cost Anomaly|`rate(llm_cost_usd_total[5m]) > avg_over_time(rate(llm_cost_usd_total[5m])[7d:5m]) * 2`|2x rolling average breach alert|
|P95 Latency by Model|histogram_quantile(0.95, sum<br>by(model,le)(rate(llm_request_latency_ms_bucket[5m])))|Latency per model tier|

## ROI MEASUREMENT

DORA + SPACE + AI FinOps Unified Scorecard

**Key Benchmarks (2026):** Healthy ROI = 2.5–3.5x average, 4–6x top quartile. AI code churn baseline 3.3% (pre-AI) → healthy post-AI <5.7% → critical >7.1%. Year-1 ROI is almost always negative due to integration costs. True signal emerges year 2–3.

### ROI Scorecard — Health Thresholds

|**Metric**|**Collection**|**Green**|**Yellow**|**Red**|
|---|---|---|---|---|
|Lead time commit→prod|Git analytics|< 1 week|1–4 weeks|> 4 weeks|
|Deploy frequency|CI/CD pipeline|Daily+|Weekly|Monthly|
|Change failure rate|Incident tracking|< 5%|5–15%|> 15%|
|MTTR|Incident tracking|< 1 hour|1–24 hours|> 24 hours|
|AI suggestion acceptance|Tool analytics|> 30%|15–30%|< 15%|
|30-day AI code churn|GitClear / git analysis|< 5.7%|5.7–7.1%|> 7.1%|
|Security findings delta|SAST (Semgrep, Snyk)|< baseline|1.5x baseline|> 2x baseline|
|Cost per merged AI PR|LLM gateway + git|< $2.00|$2–$10|> $10|
|Cache hit rate|Gateway metrics|> 30%|20–30%|< 20%|
|Frontier model usage %|Routing logs|< 10%|10–15%|> 15%|

### 6 — ROI Calculator (roi/scorecard.py)

## AGENTIC COST CONTROL

Budget Guard · Lazy Tool Loading · Session Limits

**Critical Risk:** Claude Opus 4.7 at 27x multiplier on Copilot annual plans. A stuck 2-hour agentic loop can consume $500+ of budget in minutes. Hard token limits and step caps are MANDATORY — never optional.

### 7a — Budget-Guarded Agent Wrapper (agents/budget_guard.py)

### 7b — Lazy Tool Loading (agents/lazy_tools.py)

Anti-pattern AP-03 fix. 20 tools x 200 tokens = 4,000 tokens/step wasted. Lazy loading selects 3–5 relevant tools per step. 15-step session savings: (4,000 - 800) × 15 = 48,000 tokens ~ $0.72 per session at Opus rates.

## ANTI-PATTERN FIXES

History Compression · Prompt Trimming · Batch Routing

### 8a — Conversation History Compression (AP-02 Fix)

A 50-turn conversation adds 30K+ tokens to every subsequent call. Compress after N turns using a cheap Haiku summarization call ($0.0002). Saves $0.05+ per subsequent call — a 250:1 ROI on the compression cost.

### 8b — System Prompt Compression (AP-01 Fix)

## ARCHITECTURE INTEGRATION MAP

How All Components Connect

The Enterprise AI Cost Control Platform (EACCP) connects all modules through a single gateway. No consuming application changes are needed — the gateway handles routing, caching, budgeting, and observability transparently.

### Request Flow (Every LLM Call)

|**Step**|**Component**|**File**|**Action**|**Cost Impact**|
|---|---|---|---|---|
|1|Consumer App|Any app/agent|Call POST /v1/chat/completions with headers:<br>X-Team-ID, X-Feature-ID, X-Use-Case|N/A|
|2|Gateway Middleware|middleware.py|PII scrub + tag injection + audit log write|~0ms; $0|
|3|Semantic Cache|semantic_cache.py|Embed query, cosine similarity check vs Redis<br>cache|$0.00002 embed $0 if HIT<br>(30–60% rate)|
|4|Complexity Classifier|classifier.py|Score complexity 0.0–1.0 using SBERT|~10ms; $0.00001|
|5|Budget Check|budget/manager.py|Check team + feature budget remaining pct|<1ms; $0|
|6|Model Router|router/main.py|Select nano/mid/frontier based on score +<br>budget|$0|
|7|LiteLLM Proxy|litellm_config.yaml|Provider-agnostic LLM call with fallback chain|Actual LLM cost|
|8|Metrics Emit|observability/metrics.py|Record tokens, cost (microdollars), latency to<br>Prometheus|<1ms; $0|
|9|Budget Record|budget/manager.py|Atomic increment of team + feature usage<br>counters|<1ms; $0|
|10|Cache Store|semantic_cache.py|Write response + embedding to Redis with<br>TTL|$0.00002 embed|

### Component Dependency Matrix

|**Component**|**Depends On**|**Depended On By**|**Failure Mode**|**Fallback**|
|---|---|---|---|---|
|Semantic Cache<br>(Redis)|Redis Stack|Router, LiteLLM<br>proxy|Cache miss→normal LLM<br>call|Fail open; bypass cache|
|Complexity Classifier|SBERT model file (local)|Router engine|Default to Mid tier|Use Mid model for all|
|Budget Manager|Redis (counters)|Router engine|Allow-with-alert mode|Permit all at base tier|
|LiteLLM Proxy|Provider API keys|Router engine, all<br>consumers|Fallback to alternate<br>provider|Queue + retry x3|
|Langfuse|Postgres|LiteLLM (callback)|Non-blocking; buffer locally|Write to local log file|
|Kafka (audit)|Kafka cluster|Gateway<br>middleware|Buffer in-memory; batch<br>flush|Write to Postgres audit table|

## QUICK-START DEPLOYMENT CHECKLIST

Week-by-Week Implementation Sequence

#### Week 1 — Foundation (Highest ROI)

I Deploy RedisStack (Docker): redis/redis-stack:latest → port 6379 + 8001

I Deploy LiteLLM Proxy with litellm_config.yaml defining nano/mid/frontier tiers

I Add X-Team-ID, X-Feature-ID, X-Use-Case headers to all existing LLM calls

I Enable Langfuse callback in LiteLLM → instant cost visibility dashboard

I Set up basic Prometheus scraping on port 8888 → Grafana dashboard import

I Expected outcome: Full cost visibility. Baseline established for optimization.

#### Week 2 — Caching (30–60% Cost Reduction)

I Implement semantic_cache.py with Redis Vector Search index (HNSW)

I Add cache_get check before every LLM call in router/main.py

I Add cache_set after every LLM response (with PII check)

I Configure TTL map by use_case (30 days for syntax, 1 hour for security)

I Run cache warming script on top-100 FAQ queries from Langfuse analytics

I Target: >30% cache hit rate within 72 hours of deployment.

#### Week 3 — Routing (60–87% Additional Savings)

I Deploy classifier.py with SBERT model (pip install sentence-transformers)

I Integrate classifier into routing engine: score → model selection

I A/B test: route 10% traffic to new router, compare quality vs full-Frontier baseline

I Validate: Nano-tier suggestion acceptance rate > 25% (acceptable quality)

I Gradually increase routing percentage to 100% as quality validates

I Expected outcome: 60–87% cost reduction vs always-Frontier baseline.

#### Week 4 — Budget Governance

I Define monthly token budgets per team and feature in BUDGETS dict

I Deploy budget manager with Redis atomic counters

I Configure Slack webhook for budget alert notifications

I Set budget alert thresholds: 80% (soft) / 95% (downgrade) / 100% (queue)

I Add budget check step to routing engine before LLM dispatch

I Brief all team leads on budget dashboard URL and interpretation.

#### Month 2 — Agentic Controls + ROI Measurement

I Wrap all agent loops with BudgetGuardedAgent (max_steps=20, max_cost=$5)

I Implement lazy tool loading (select_tools) in all agent workflows I Implement history compression (compress after 10 turns, keep last 3) I Run 90-day ROI pilot: measure DORA metrics before vs after I Set up GitClear or equivalent for code churn tracking

I Monthly FinOps review: team cost reports + efficiency ratio ranking

### pip install dependencies

```
# requirements.txt  — complete dependency set
litellm >=1.40.0
sentence-transformers>=2.7.0
redis [hiredis ]>=5.0.0
fastapi >=0.110.0
uvicorn [standard]>=0.29.0
pydantic>=2.0.0
opentelemetry-sdk>=1.24.0
opentelemetry-exporter-otlp -proto -grpc >=1.24.0
opentelemetry-exporter-prometheus>=0.45b0
prometheus-client >=0.20.0
structlog>=24.0.0
aiokafka>=0.10.0
httpx >=0.27.0
numpy >=1.26.0
openai >=1.30.0# for embedding model (text-embedding-3-small)
langfuse>=2.0.0# LLM observability (optional but recommended)
# Run services:
# docker compose up -d                          # full stack
# uvicorn gateway.main:app --port 8080          # router service
# python cache/warming.py                       # seed cache
# python budget/alert_consumer.py               # slack alerts
```

*© 2026 Token Management & AI Cost Architecture — Implementation Guide*