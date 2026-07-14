---
title: "Token Management & AI Cost Architecture"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "AI_Cost_Implementation_Guide_2026.pdf"
doc_type: guide
tags: ["ai-economics", "enterprise-ai", "enterprise-architecture"]
last_reviewed: 2026-07-14
covers_version: "N/A"
---

# Token Management & AI Cost Architecture

## Table of Contents

1. [Model Routing](#model-routing) — Complexity Classifier & Routing Engine
2. [Semantic Cache](#semantic-cache) — Redis Vector Search
3. [LLM Gateway](#llm-gateway) — Docker Stack & PII Middleware
4. [Token Budget Manager](#token-budget-manager) — Hierarchical Enforcement
5. [AI FinOps](#ai-finops) — OpenTelemetry Metrics & Grafana Dashboard
6. [ROI Measurement](#roi-measurement) — DORA + SPACE Scorecard
7. [Agentic Cost Control](#agentic-cost-control) — Budget Guard & Lazy Tool Loading
8. [Anti-Pattern Fixes](#anti-pattern-fixes) — History Compression & Prompt Trim
9. [Architecture Integration Map](#architecture-integration-map)
10. [Quick-Start Deployment Checklist](#quick-start-deployment-checklist)

---

## Model Routing

*Complexity Classifier · Routing Engine · LiteLLM Config*

The routing layer scores every incoming request with a lightweight Sentence-BERT classifier (~80 MB, <10 ms inference) and dispatches to the cheapest model tier capable of handling it. RouteLLM (Stanford) demonstrates 50% cost reduction at 95% quality parity. The classifier runs before any LLM call — its own cost is negligible (~$0.00001 per classification).

### Tier Decision Matrix

| **Tier** | **Models** | **Cost/1K tok** | **Complexity Score** | **Use Cases** |
|---|---|---|---|---|
| Nano | claude-haiku-4-5, gemini-flash, gpt-4o-mini | $0.00025–$0.0006 | < 0.30 | Autocomplete, syntax Q&A, formatting, classification |
| Mid | claude-sonnet-4-6, gpt-4o | $0.003–$0.005 | 0.30–0.70 | Chat, debugging, code review, multi-file context |
| Frontier | claude-opus-4-8, o3 | $0.015–$0.075 | > 0.70 | Architecture design, complex reasoning, security analysis |

### 1a — Complexity Classifier (`classifier.py`)

Uses cosine similarity against anchor embeddings for "trivial" vs "complex" reference prompts. Length and code-depth heuristics add to the base score. Runs in-process — no network hop.

```python
# classifier.py
from sentence_transformers import SentenceTransformer
import numpy as np

_model = SentenceTransformer("all-MiniLM-L6-v2")  # ~80 MB, loads once at startup

_TRIVIAL_ANCHORS = [
    "What is the syntax for a for loop in Python?",
    "Format this JSON: {key: value}",
    "What does this error message mean?",
    "Convert this string to uppercase",
]
_COMPLEX_ANCHORS = [
    "Design a microservices architecture for a payment system with CQRS and event sourcing",
    "Analyze the security vulnerabilities in this authentication flow and suggest mitigations",
    "Refactor this 500-line class to follow SOLID principles across multiple files",
    "Debug this distributed race condition involving three services and a message queue",
]

_trivial_embs = _model.encode(_TRIVIAL_ANCHORS, normalize_embeddings=True)
_complex_embs = _model.encode(_COMPLEX_ANCHORS, normalize_embeddings=True)

def classify(prompt: str) -> float:
    """Returns complexity score 0.0 (trivial) → 1.0 (complex)."""
    emb = _model.encode([prompt], normalize_embeddings=True)[0]

    trivial_sim = float(np.max(emb @ _trivial_embs.T))
    complex_sim = float(np.max(emb @ _complex_embs.T))
    base_score  = (complex_sim - trivial_sim + 1) / 2  # normalize to [0, 1]

    # Heuristic boosts
    length_boost = min(len(prompt) / 2000, 0.15)       # long prompts → more complex
    code_boost   = 0.10 if "```" in prompt else 0.0    # code blocks signal complexity

    return min(base_score + length_boost + code_boost, 1.0)
```

### 1b — Routing Engine (`router/main.py`)

Single endpoint all consumers call. Pipeline: cache check → classify → budget check → LiteLLM dispatch → record usage → cache store. All steps tagged for observability.

```python
# router/main.py
import time
import structlog
from fastapi import FastAPI, Request, HTTPException
from litellm import acompletion
from classifier import classify
from cache.semantic_cache import cache_get, cache_set
from budget.manager import check_budget, record_usage

log = structlog.get_logger()
app = FastAPI()

TIER_THRESHOLDS = {"nano": 0.30, "mid": 0.70}

def select_model(score: float, budget_pct_remaining: float) -> str:
    if budget_pct_remaining < 0.05:            # <5% budget → force nano
        return "nano"
    if score < TIER_THRESHOLDS["nano"]:
        return "nano"
    if score < TIER_THRESHOLDS["mid"]:
        return "mid"
    return "frontier"

@app.post("/v1/chat/completions")
async def route(request: Request):
    body     = await request.json()
    team_id  = request.headers.get("X-Team-ID",    "unknown")
    feat_id  = request.headers.get("X-Feature-ID", "unknown")
    use_case = request.headers.get("X-Use-Case",   "general")
    messages = body.get("messages", [])
    prompt   = " ".join(m.get("content", "") for m in messages)

    # 1. Semantic cache check
    cached = await cache_get(prompt, use_case)
    if cached:
        log.info("cache_hit", team=team_id, feature=feat_id)
        return cached

    # 2. Classify complexity
    score = classify(prompt)

    # 3. Budget check
    budget_ok, pct_remaining = await check_budget(team_id, feat_id)
    if not budget_ok:
        raise HTTPException(status_code=429, detail="Team token budget exhausted")

    # 4. Select model tier & dispatch
    model      = select_model(score, pct_remaining)
    t0         = time.perf_counter()
    result     = await acompletion(model=model, messages=messages)
    latency_ms = (time.perf_counter() - t0) * 1000

    # 5. Record usage + store in cache
    tokens = result.usage.total_tokens
    await record_usage(team_id, feat_id, model, tokens, latency_ms)
    await cache_set(prompt, use_case, result)

    log.info("routed", team=team_id, model=model, score=round(score, 2), tokens=tokens)
    return result
```

### 1c — LiteLLM Provider Config (`litellm_config.yaml`)

```yaml
# litellm_config.yaml — mount as Kubernetes ConfigMap
model_list:
  - model_name: nano
    litellm_params:
      model: anthropic/claude-haiku-4-5
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: nano-fallback
    litellm_params:
      model: gemini/gemini-flash-2-0
      api_key: os.environ/GOOGLE_API_KEY

  - model_name: mid
    litellm_params:
      model: anthropic/claude-sonnet-4-6
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: frontier
    litellm_params:
      model: anthropic/claude-opus-4-8
      api_key: os.environ/ANTHROPIC_API_KEY

router_settings:
  routing_strategy: least-busy
  retry_policy:
    num_retries: 3
  fallbacks:
    - [nano, nano-fallback]

litellm_settings:
  success_callback: ["langfuse"]
  cache: true
  cache_params:
    type: redis
    host: redis-cache.internal
    port: 6379
```

---

## Semantic Cache

*Redis Vector Search · TTL Strategy · Cache Warming*

Semantic caching embeds the user query, finds similar past queries via cosine similarity (threshold 0.92), and returns the cached response — zero LLM cost. Production impact: 30–60% LLM call reduction. Embedding cost is ~$0.00002 per query — 100× cheaper than the LLM call it avoids. Uses RedisStack (includes RediSearch + Vector module).

### TTL Strategy by Content Type

| **Content Type** | **TTL** | **Threshold** | **Cache?** | **Reason** |
|---|---|---|---|---|
| Syntax Q&A (stable knowledge) | 30 days | 0.93 | Yes | High repetition, stable answers |
| Framework docs questions | 7 days | 0.92 | Yes | Docs change slowly |
| Architecture patterns | 24 hours | 0.90 | Yes | Moderate reuse |
| Code review (generic style) | 4 hours | 0.93 | Selective | Avoid specific PR context |
| Security guidance | 1 hour | 0.95 | Yes, strict | Must be current; high precision |
| Debugging help | 2 hours | 0.91 | Selective | Context-specific |
| PII-containing prompts | Never | N/A | **No — never** | Privacy violation risk |
| Customer data context | Never | N/A | **No — never** | Data isolation requirement |

### 2a — Semantic Cache Implementation (`cache/semantic_cache.py`)

```python
# cache/semantic_cache.py
import hashlib, json
import numpy as np
from openai import AsyncOpenAI
from redis.asyncio import Redis

redis  = Redis.from_url("redis://redis-cache.internal:6379", decode_responses=False)
openai = AsyncOpenAI()

TTL_BY_USE_CASE = {
    "syntax":       30 * 86400,   # 30 days
    "docs":          7 * 86400,   # 7 days
    "architecture":      86400,   # 24 hours
    "code_review":    4 * 3600,   # 4 hours
    "security":          3600,    # 1 hour
    "debugging":      2 * 3600,   # 2 hours
    "general":        6 * 3600,   # 6 hours (safe default)
}
SIM_THRESHOLD = {
    "syntax": 0.93, "docs": 0.92, "architecture": 0.90,
    "code_review": 0.93, "security": 0.95, "debugging": 0.91, "general": 0.92,
}
PII_USE_CASES = {"customer_data", "pii"}

async def _embed(text: str) -> np.ndarray:
    resp = await openai.embeddings.create(model="text-embedding-3-small", input=text[:8000])
    return np.array(resp.data[0].embedding, dtype=np.float32)

async def cache_get(prompt: str, use_case: str):
    if use_case in PII_USE_CASES:
        return None
    query_emb = await _embed(prompt)
    results = await redis.execute_command(
        "FT.SEARCH", "idx:llm_cache",
        "*=>[KNN 5 @embedding $vec AS score]",
        "PARAMS", "2", "vec", query_emb.tobytes(),
        "SORTBY", "score", "RETURN", "2", "response", "score",
        "DIALECT", "2",
    )
    if results and results[0] > 0:
        for i in range(1, len(results), 2):
            doc   = dict(zip(results[i + 1][::2], results[i + 1][1::2]))
            sim   = 1 - float(doc.get(b"score", 1))
            thresh = SIM_THRESHOLD.get(use_case, 0.92)
            if sim >= thresh:
                return json.loads(doc[b"response"])
    return None

async def cache_set(prompt: str, use_case: str, response):
    if use_case in PII_USE_CASES:
        return
    emb     = await _embed(prompt)
    key     = f"llm:{hashlib.sha256(prompt.encode()).hexdigest()[:16]}"
    ttl     = TTL_BY_USE_CASE.get(use_case, 6 * 3600)
    payload = {"embedding": emb.tobytes(), "response": json.dumps(response), "use_case": use_case}
    pipe = redis.pipeline()
    pipe.hset(key, mapping=payload)
    pipe.expire(key, ttl)
    await pipe.execute()
```

### 2b — Cache Warming at Deployment (`cache/warming.py`)

```python
# cache/warming.py — seed semantic cache with high-frequency queries from Langfuse
import asyncio
from langfuse import Langfuse
from litellm import acompletion
from cache.semantic_cache import cache_set

lf = Langfuse()

async def warm_cache(top_n: int = 100):
    """Pull the top-N most frequent prompts from Langfuse and pre-populate cache."""
    traces = lf.get_generations(limit=500)
    freq: dict[str, int] = {}
    for g in traces:
        freq[g.input] = freq.get(g.input, 0) + 1

    sorted_prompts = sorted(freq.items(), key=lambda x: x[1], reverse=True)[:top_n]
    print(f"Warming cache with {len(sorted_prompts)} high-frequency prompts...")

    for prompt, count in sorted_prompts:
        use_case = "general"   # adjust per your tagging schema
        response = await acompletion(
            model="mid", messages=[{"role": "user", "content": prompt}]
        )
        await cache_set(prompt, use_case, response)
        print(f"  cached (freq={count}): {prompt[:60]}...")

if __name__ == "__main__":
    asyncio.run(warm_cache(top_n=100))
```

---

## LLM Gateway

*Docker Compose Stack · PII Middleware · Audit Logging*

The gateway is the single ingress point for all LLM traffic. Every request is tagged, PII-scrubbed, and written to an immutable audit log (Kafka → S3) before reaching any LLM provider. Required for EU AI Act Article 11 technical documentation compliance.

### 3a — Full Docker Compose Stack (`docker-compose.yml`)

```yaml
# docker-compose.yml — Enterprise AI Cost Control Platform (EACCP)
version: "3.9"

services:
  gateway:
    build: ./gateway
    ports: ["8080:8080"]
    environment:
      ANTHROPIC_API_KEY:    ${ANTHROPIC_API_KEY}
      GOOGLE_API_KEY:       ${GOOGLE_API_KEY}
      OPENAI_API_KEY:       ${OPENAI_API_KEY}
      REDIS_URL:            redis://redis:6379
      KAFKA_BROKERS:        kafka:9092
      LANGFUSE_PUBLIC_KEY:  ${LANGFUSE_PUBLIC_KEY}
      LANGFUSE_SECRET_KEY:  ${LANGFUSE_SECRET_KEY}
    depends_on: [redis, kafka]

  redis:
    image: redis/redis-stack:latest
    ports: ["6379:6379", "8001:8001"]   # 8001 = RedisInsight UI
    volumes:
      - redis-data:/data

  litellm-proxy:
    image: ghcr.io/berriai/litellm:main-latest
    ports: ["4000:4000"]
    volumes:
      - ./litellm_config.yaml:/app/config.yaml
    command: ["--config", "/app/config.yaml", "--port", "4000"]

  langfuse:
    image: langfuse/langfuse:latest
    ports: ["3000:3000"]
    environment:
      DATABASE_URL:    postgresql://langfuse:secret@postgres:5432/langfuse
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      SALT:            ${LANGFUSE_SALT}
    depends_on: [postgres]

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB:       langfuse
      POSTGRES_USER:     langfuse
      POSTGRES_PASSWORD: secret
    volumes:
      - pg-data:/var/lib/postgresql/data

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    environment:
      KAFKA_BROKER_ID:                        1
      KAFKA_ZOOKEEPER_CONNECT:                zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS:             PLAINTEXT://kafka:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    depends_on: [zookeeper]

  zookeeper:
    image: confluentinc/cp-zookeeper:7.6.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  prometheus:
    image: prom/prometheus:latest
    ports: ["9090:9090"]
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:latest
    ports: ["3001:3000"]
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    depends_on: [prometheus]

volumes:
  redis-data:
  pg-data:
```

### 3b — PII + Tagging + Audit Middleware (`gateway/middleware.py`)

```python
# gateway/middleware.py
import re, json, time, uuid
from aiokafka import AIOKafkaProducer
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

PII_PATTERNS = [
    re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I),  # email
    re.compile(r"\b(?:\d[ -]?){13,16}\b"),                               # credit card
    re.compile(r"\b\d{3}-\d{2}-\d{4}\b"),                               # SSN
    re.compile(r"\b\+?1?\s*\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b"),      # phone
    re.compile(r"\b(?:\d{1,3}\.){3}\d{1,3}\b"),                         # IPv4
]

def scrub_pii(text: str) -> tuple[str, bool]:
    found_pii = False
    for pattern in PII_PATTERNS:
        if pattern.search(text):
            found_pii = True
            text = pattern.sub("[REDACTED]", text)
    return text, found_pii

class GatewayMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, kafka_producer: AIOKafkaProducer):
        super().__init__(app)
        self.producer = kafka_producer

    async def dispatch(self, request: Request, call_next):
        if not request.url.path.startswith("/v1/"):
            return await call_next(request)

        body_bytes = await request.body()
        body       = json.loads(body_bytes)
        messages   = body.get("messages", [])

        # Scrub PII from all message content
        has_pii, scrubbed = False, []
        for msg in messages:
            content, found = scrub_pii(msg.get("content", ""))
            has_pii = has_pii or found
            scrubbed.append({**msg, "content": content})
        body["messages"] = scrubbed

        # Inject tracing tags
        request_id     = str(uuid.uuid4())
        body["metadata"] = {
            "team_id":    request.headers.get("X-Team-ID",    "unknown"),
            "feature_id": request.headers.get("X-Feature-ID", "unknown"),
            "use_case":   request.headers.get("X-Use-Case",   "general"),
            "request_id": request_id,
            "had_pii":    has_pii,
        }

        # Audit log to Kafka — fire-and-forget, non-blocking
        audit = {"ts": time.time(), "request_id": request_id, "had_pii": has_pii,
                 "path": request.url.path, "team": request.headers.get("X-Team-ID", "unknown")}
        await self.producer.send("llm-audit", json.dumps(audit).encode())

        async def receive():
            return {"type": "http.request", "body": json.dumps(body).encode()}
        request._receive = receive
        return await call_next(request)
```

---

## Token Budget Manager

*Hierarchical Enforcement · Circuit Breakers · Slack Alerts*

Five-level budget hierarchy: Enterprise → BU → Team → Feature → Session. Redis atomic counters for real-time checks. At 80% consumed: Slack alert. At 95%: auto-downgrade model tier. At 100%: queue or reject with explanation.

### Budget Threshold Actions

| **% Budget Remaining** | **Action** | **User Impact** | **Notification** |
|---|---|---|---|
| > 20% | Proceed normally | None | None |
| 10–20% | Proceed + soft alert | None visible | Slack to team lead |
| 5–10% | Proceed + alert, prepare downgrade | Possible slower responses | Slack escalation |
| 0–5% | Auto-downgrade model tier | Lower quality responses | Slack critical alert |
| 0% | Queue non-urgent / reject urgent | Blocked until next period | Slack + email to manager |

### 4a — Budget Manager (`budget/manager.py`)

```python
# budget/manager.py
import time, httpx, structlog
from redis.asyncio import Redis

log   = structlog.get_logger()
redis = Redis.from_url("redis://redis-cache.internal:6379")

# Monthly token budgets — override via env/config in production
BUDGETS = {
    "team:platform":  10_000_000,
    "team:data-sci":   5_000_000,
    "team:default":    2_000_000,
    "feat:copilot":    3_000_000,
    "feat:search":     1_000_000,
}
SLACK_WEBHOOK = "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"

def _budget_key(entity: str) -> str:
    month = time.strftime("%Y-%m")
    return f"budget:{entity}:{month}"

async def check_budget(team_id: str, feature_id: str) -> tuple[bool, float]:
    """Returns (ok, pct_remaining). ok=False means hard cap reached."""
    team_key   = _budget_key(f"team:{team_id}")
    feat_key   = _budget_key(f"feat:{feature_id}")
    team_used  = int(await redis.get(team_key) or 0)
    feat_used  = int(await redis.get(feat_key) or 0)
    team_limit = BUDGETS.get(f"team:{team_id}", BUDGETS["team:default"])
    feat_limit = BUDGETS.get(f"feat:{feature_id}", team_limit)

    pct_used      = max(team_used / team_limit, feat_used / feat_limit)
    pct_remaining = 1.0 - pct_used

    if pct_remaining <= 0:
        return False, 0.0
    if pct_remaining <= 0.05:
        await _alert(team_id, pct_remaining, level="critical")
    elif pct_remaining <= 0.10:
        await _alert(team_id, pct_remaining, level="warning")
    elif pct_remaining <= 0.20:
        await _alert(team_id, pct_remaining, level="info")
    return True, pct_remaining

async def record_usage(team_id: str, feature_id: str, model: str, tokens: int, latency_ms: float):
    pipe = redis.pipeline()
    for key in (_budget_key(f"team:{team_id}"), _budget_key(f"feat:{feature_id}")):
        pipe.incrby(key, tokens)
        pipe.expire(key, 32 * 86400)   # keep counters 32 days (overlap month boundary)
    await pipe.execute()
    log.info("usage_recorded", team=team_id, feature=feature_id,
             model=model, tokens=tokens, latency_ms=round(latency_ms, 1))

async def _alert(team_id: str, pct_remaining: float, level: str):
    pct_used = round((1 - pct_remaining) * 100, 1)
    msg = f":warning: *AI Budget Alert* | Team: `{team_id}` | {pct_used}% consumed | Level: {level}"
    async with httpx.AsyncClient() as client:
        await client.post(SLACK_WEBHOOK, json={"text": msg}, timeout=5)
```

---

## AI FinOps

*OpenTelemetry Metrics · Cost Attribution · Grafana Dashboard*

Tag every LLM call with `team_id`, `feature_id`, `use_case`, `model`, and `environment`. Emit Prometheus metrics via OpenTelemetry. Store cost in micro-dollars (integer) to avoid float drift at scale. Grafana dashboards expose cost by team, model tier distribution, cache hit rate, and anomaly detection (2× rolling average alert).

### 5a — OpenTelemetry Metrics (`observability/metrics.py`)

```python
# observability/metrics.py
from opentelemetry import metrics
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.exporter.prometheus import PrometheusMetricReader
from prometheus_client import start_http_server

start_http_server(port=8888)

reader   = PrometheusMetricReader()
provider = MeterProvider(metric_readers=[reader])
metrics.set_meter_provider(provider)
meter    = metrics.get_meter("llm.gateway")

_tokens_counter = meter.create_counter("llm_tokens_total",     description="Total tokens consumed")
_cost_counter   = meter.create_counter("llm_cost_usd_total",   description="Cost in micro-dollars (÷1e6 = USD)")
_cache_hits     = meter.create_counter("llm_cache_hits_total", description="Semantic cache hits")
_latency_hist   = meter.create_histogram("llm_request_latency_ms", description="LLM latency", unit="ms")

def record_llm_call(team_id: str, feature_id: str, model: str,
                    use_case: str, tokens: int, cost_usd: float, latency_ms: float):
    labels = {"team_id": team_id, "feature_id": feature_id,
              "model": model, "use_case": use_case, "tier": _tier(model)}
    _tokens_counter.add(tokens, labels)
    _cost_counter.add(int(cost_usd * 1_000_000), labels)   # micro-dollars avoids float drift
    _latency_hist.record(latency_ms, labels)

def record_cache_hit(team_id: str, use_case: str):
    _cache_hits.add(1, {"team_id": team_id, "use_case": use_case})

def _tier(model: str) -> str:
    if any(x in model for x in ("haiku", "flash", "mini")): return "nano"
    if any(x in model for x in ("opus", "o3")):             return "frontier"
    return "mid"
```

### 5b — Key Grafana Prometheus Queries

| **Panel** | **PromQL Expression** | **Purpose** |
|---|---|---|
| Monthly Spend (USD) | `sum(increase(llm_cost_usd_total[30d])) / 1000000` | Total AI spend this month |
| Cost by Team (7d) | `sum by(team_id)(increase(llm_cost_usd_total[7d])) / 1000000` | Chargeback view per team |
| Cache Hit Rate | `rate(llm_cache_hits_total[5m]) / rate(llm_tokens_total[5m]) * 100` | Semantic cache effectiveness |
| Model Tier Distribution | `sum by(tier)(increase(llm_tokens_total[24h]))` | Nano/Mid/Frontier split |
| Cost Anomaly | `rate(llm_cost_usd_total[5m]) > avg_over_time(rate(llm_cost_usd_total[5m])[7d:5m]) * 2` | 2× rolling average breach alert |
| P95 Latency by Model | `histogram_quantile(0.95, sum by(model,le)(rate(llm_request_latency_ms_bucket[5m])))` | Latency per model tier |

---

## ROI Measurement

*DORA + SPACE + AI FinOps Unified Scorecard*

**Key Benchmarks (2026):** Healthy ROI = 2.5–3.5× average, 4–6× top quartile. AI code churn baseline 3.3% (pre-AI) → healthy post-AI <5.7% → critical >7.1%. Year-1 ROI is almost always negative due to integration costs. True signal emerges year 2–3.

### ROI Scorecard — Health Thresholds

| **Metric** | **Collection** | **Green** | **Yellow** | **Red** |
|---|---|---|---|---|
| Lead time commit→prod | Git analytics | < 1 week | 1–4 weeks | > 4 weeks |
| Deploy frequency | CI/CD pipeline | Daily+ | Weekly | Monthly |
| Change failure rate | Incident tracking | < 5% | 5–15% | > 15% |
| MTTR | Incident tracking | < 1 hour | 1–24 hours | > 24 hours |
| AI suggestion acceptance | Tool analytics | > 30% | 15–30% | < 15% |
| 30-day AI code churn | GitClear / git analysis | < 5.7% | 5.7–7.1% | > 7.1% |
| Security findings delta | SAST (Semgrep, Snyk) | < baseline | 1.5× baseline | > 2× baseline |
| Cost per merged AI PR | LLM gateway + git | < $2.00 | $2–$10 | > $10 |
| Cache hit rate | Gateway metrics | > 30% | 20–30% | < 20% |
| Frontier model usage % | Routing logs | < 10% | 10–15% | > 15% |

### 6 — ROI Calculator (`roi/scorecard.py`)

```python
# roi/scorecard.py
from dataclasses import dataclass
from typing import Literal

Status = Literal["green", "yellow", "red"]

@dataclass
class ScorecardRow:
    metric: str
    value: float
    unit: str
    green_threshold: float
    yellow_threshold: float
    higher_is_better: bool = True

    @property
    def status(self) -> Status:
        v, g, y = self.value, self.green_threshold, self.yellow_threshold
        if self.higher_is_better:
            return "green" if v >= g else ("yellow" if v >= y else "red")
        return "green" if v <= g else ("yellow" if v <= y else "red")

def build_scorecard(metrics: dict) -> list[ScorecardRow]:
    return [
        ScorecardRow("Lead time (days)",          metrics["lead_time_days"],    "days", 7,    28,  higher_is_better=False),
        ScorecardRow("Deploy frequency (/wk)",    metrics["deploys_per_week"],  "/wk",  7,    1,   higher_is_better=True),
        ScorecardRow("Change failure rate (%)",   metrics["change_failure_pct"],"%",    5,    15,  higher_is_better=False),
        ScorecardRow("MTTR (hours)",              metrics["mttr_hours"],        "hrs",  1,    24,  higher_is_better=False),
        ScorecardRow("AI acceptance rate (%)",    metrics["ai_acceptance_pct"], "%",    30,   15,  higher_is_better=True),
        ScorecardRow("AI code churn (%)",         metrics["ai_churn_pct"],      "%",    5.7,  7.1, higher_is_better=False),
        ScorecardRow("Cache hit rate (%)",        metrics["cache_hit_pct"],     "%",    30,   20,  higher_is_better=True),
        ScorecardRow("Frontier usage (%)",        metrics["frontier_pct"],      "%",    10,   15,  higher_is_better=False),
        ScorecardRow("Cost per AI PR ($)",        metrics["cost_per_pr_usd"],   "USD",  2.0,  10.0,higher_is_better=False),
    ]

def compute_roi(monthly_llm_spend_usd: float, engineer_count: int,
                ai_time_saved_hrs_per_eng: float, hourly_rate_usd: float = 150) -> dict:
    monthly_value = engineer_count * ai_time_saved_hrs_per_eng * 4.33 * hourly_rate_usd
    roi_ratio     = monthly_value / monthly_llm_spend_usd if monthly_llm_spend_usd else 0
    return {
        "monthly_llm_cost":  monthly_llm_spend_usd,
        "monthly_value_usd": round(monthly_value, 2),
        "roi_ratio":         round(roi_ratio, 2),
        "status":            "green" if roi_ratio >= 2.5 else ("yellow" if roi_ratio >= 1.0 else "red"),
    }
```

---

## Agentic Cost Control

*Budget Guard · Lazy Tool Loading · Session Limits*

> **Critical Risk:** Claude Opus 4.8 at 27× multiplier on Copilot annual plans. A stuck 2-hour agentic loop can consume $500+ of budget in minutes. Hard token limits and step caps are **MANDATORY** — never optional.

### 7a — Budget-Guarded Agent Wrapper (`agents/budget_guard.py`)

```python
# agents/budget_guard.py
import time, structlog
from anthropic import Anthropic

log    = structlog.get_logger()
client = Anthropic()

class BudgetGuardedAgent:
    # Cost per 1K tokens — update when provider pricing changes
    COST_PER_1K = {
        "claude-haiku-4-5":  0.00025,
        "claude-sonnet-4-6": 0.003,
        "claude-opus-4-8":   0.015,
    }

    def __init__(self, model: str, max_steps: int = 20,
                 max_cost_usd: float = 5.0, max_wall_sec: int = 300):
        self.model        = model
        self.max_steps    = max_steps
        self.max_cost     = max_cost_usd
        self.max_wall_sec = max_wall_sec
        self._steps       = 0
        self._cost        = 0.0
        self._start       = time.time()

    def _guard(self):
        if self._steps >= self.max_steps:
            raise RuntimeError(f"Agent hard-stopped: max steps ({self.max_steps}) reached")
        if self._cost >= self.max_cost:
            raise RuntimeError(f"Agent hard-stopped: max cost (${self.max_cost:.2f}) reached")
        if time.time() - self._start > self.max_wall_sec:
            raise RuntimeError(f"Agent hard-stopped: wall-time ({self.max_wall_sec}s) exceeded")

    def _account(self, response):
        tokens      = response.usage.input_tokens + response.usage.output_tokens
        step_cost   = (tokens / 1000) * self.COST_PER_1K.get(self.model, 0.003)
        self._steps += 1
        self._cost  += step_cost
        log.info("agent_step", step=self._steps, tokens=tokens,
                 step_cost=round(step_cost, 4), total_cost=round(self._cost, 4))

    def run(self, system: str, messages: list, tools: list) -> str:
        while True:
            self._guard()
            response = client.messages.create(
                model=self.model, max_tokens=4096,
                system=system, messages=messages, tools=tools,
            )
            self._account(response)

            if response.stop_reason == "end_turn":
                return next(b.text for b in response.content if hasattr(b, "text"))

            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = self._call_tool(block.name, block.input)
                    tool_results.append(
                        {"type": "tool_result", "tool_use_id": block.id, "content": str(result)}
                    )
            messages += [
                {"role": "assistant", "content": response.content},
                {"role": "user",      "content": tool_results},
            ]

    def _call_tool(self, name: str, inputs: dict) -> str:
        raise NotImplementedError("Subclass must implement _call_tool")
```

### 7b — Lazy Tool Loading (`agents/lazy_tools.py`)

Anti-pattern AP-03 fix. 20 tools × 200 tokens = 4,000 tokens/step wasted. Lazy loading selects 3–5 relevant tools per step. 15-step session savings: (4,000 − 800) × 15 = 48,000 tokens ≈ $0.72 per session at Opus rates.

```python
# agents/lazy_tools.py
from sentence_transformers import SentenceTransformer
import numpy as np

_model = SentenceTransformer("all-MiniLM-L6-v2")

ALL_TOOLS: list[dict] = [
    {"name": "read_file",    "description": "Read contents of a file from disk"},
    {"name": "write_file",   "description": "Write or overwrite a file on disk"},
    {"name": "run_tests",    "description": "Execute test suite and return results"},
    {"name": "search_code",  "description": "Search codebase with regex or keyword"},
    {"name": "run_shell",    "description": "Execute an arbitrary shell command"},
    {"name": "fetch_url",    "description": "Make an HTTP GET request to a URL"},
    {"name": "query_db",     "description": "Execute a SQL query against the database"},
    {"name": "list_files",   "description": "List files in a directory"},
    {"name": "git_commit",   "description": "Commit staged changes with a message"},
    {"name": "deploy",       "description": "Deploy the application to an environment"},
    # extend to your full tool catalog
]

_tool_embs = _model.encode([t["description"] for t in ALL_TOOLS], normalize_embeddings=True)

def select_tools(step_context: str, top_k: int = 4) -> list[dict]:
    """Select the top-k most relevant tools for the current agent step."""
    step_emb = _model.encode([step_context], normalize_embeddings=True)[0]
    scores   = step_emb @ _tool_embs.T
    indices  = np.argsort(scores)[::-1][:top_k]
    return [ALL_TOOLS[i] for i in indices]
```

---

## Anti-Pattern Fixes

*History Compression · Prompt Trimming · Batch Routing*

### 8a — Conversation History Compression (`agents/history.py` — AP-02 Fix)

A 50-turn conversation adds 30K+ tokens to every subsequent call. Compress after N turns using a cheap Haiku summarization call ($0.0002). Saves $0.05+ per subsequent call — a 250:1 ROI on the compression cost.

```python
# agents/history.py
from anthropic import Anthropic

client = Anthropic()

def maybe_compress(messages: list, compress_after: int = 10, keep_recent: int = 3) -> list:
    """Compress old turns into a summary, keeping the most recent turns verbatim."""
    if len(messages) <= compress_after:
        return messages

    to_compress = messages[:-keep_recent]
    recent      = messages[-keep_recent:]

    # Haiku costs ~$0.0002 per compression; saves $0.05+ on every subsequent call
    summary = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=512,
        system="Summarize the conversation concisely. Preserve all decisions, code, and open questions.",
        messages=to_compress,
    ).content[0].text

    return [
        {"role": "user",      "content": f"[Conversation summary]: {summary}"},
        {"role": "assistant", "content": "Understood. Continuing from the summary."},
        *recent,
    ]
```

### 8b — System Prompt Compression (`agents/prompt_trim.py` — AP-01 Fix)

```python
# agents/prompt_trim.py
import re

def trim_system_prompt(prompt: str, max_tokens_est: int = 800) -> str:
    """
    Remove redundant whitespace and boilerplate that bloats every call.
    Rough rule: 1 token ≈ 4 chars.
    """
    max_chars = max_tokens_est * 4

    prompt = re.sub(r"\n{3,}", "\n\n", prompt)           # collapse blank lines
    prompt = re.sub(r" {2,}", " ", prompt)                # collapse spaces
    prompt = re.sub(r"^#{1,6}\s*$", "", prompt, flags=re.M)  # empty headings

    if len(prompt) <= max_chars:
        return prompt.strip()

    # Hard truncate with marker so the model knows context was cut
    return prompt[:max_chars].rsplit("\n", 1)[0] + "\n\n[SYSTEM PROMPT TRUNCATED]"
```

---

## Architecture Integration Map

*How All Components Connect*

The Enterprise AI Cost Control Platform (EACCP) connects all modules through a single gateway. No consuming application changes are needed — the gateway handles routing, caching, budgeting, and observability transparently.

### Request Flow (Every LLM Call)

| **Step** | **Component** | **File** | **Action** | **Cost Impact** |
|---|---|---|---|---|
| 1 | Consumer App | Any app/agent | Call `POST /v1/chat/completions` with headers: `X-Team-ID`, `X-Feature-ID`, `X-Use-Case` | N/A |
| 2 | Gateway Middleware | `middleware.py` | PII scrub + tag injection + audit log write | ~0 ms; $0 |
| 3 | Semantic Cache | `cache/semantic_cache.py` | Embed query, cosine similarity check vs Redis cache | $0.00002 embed; $0 if HIT (30–60% rate) |
| 4 | Complexity Classifier | `classifier.py` | Score complexity 0.0–1.0 using SBERT | ~10 ms; $0.00001 |
| 5 | Budget Check | `budget/manager.py` | Check team + feature budget remaining % | < 1 ms; $0 |
| 6 | Model Router | `router/main.py` | Select nano/mid/frontier based on score + budget | $0 |
| 7 | LiteLLM Proxy | `litellm_config.yaml` | Provider-agnostic LLM call with fallback chain | Actual LLM cost |
| 8 | Metrics Emit | `observability/metrics.py` | Record tokens, cost (micro-dollars), latency to Prometheus | < 1 ms; $0 |
| 9 | Budget Record | `budget/manager.py` | Atomic increment of team + feature usage counters | < 1 ms; $0 |
| 10 | Cache Store | `cache/semantic_cache.py` | Write response + embedding to Redis with TTL | $0.00002 embed |

### Component Dependency Matrix

| **Component** | **Depends On** | **Depended On By** | **Failure Mode** | **Fallback** |
|---|---|---|---|---|
| Semantic Cache (Redis) | Redis Stack | Router, LiteLLM proxy | Cache miss → normal LLM call | Fail open; bypass cache |
| Complexity Classifier | SBERT model file (local) | Router engine | Default to Mid tier | Use Mid model for all |
| Budget Manager | Redis (counters) | Router engine | Allow-with-alert mode | Permit all at base tier |
| LiteLLM Proxy | Provider API keys | Router engine, all consumers | Fallback to alternate provider | Queue + retry ×3 |
| Langfuse | Postgres | LiteLLM (callback) | Non-blocking; buffer locally | Write to local log file |
| Kafka (audit) | Kafka cluster | Gateway middleware | Buffer in-memory; batch flush | Write to Postgres audit table |

---

## Quick-Start Deployment Checklist

*Week-by-Week Implementation Sequence*

#### Week 1 — Foundation (Highest ROI)

- [ ] Deploy RedisStack (Docker): `redis/redis-stack:latest` → port 6379 + 8001
- [ ] Deploy LiteLLM Proxy with `litellm_config.yaml` defining nano/mid/frontier tiers
- [ ] Add `X-Team-ID`, `X-Feature-ID`, `X-Use-Case` headers to all existing LLM calls
- [ ] Enable Langfuse callback in LiteLLM → instant cost visibility dashboard
- [ ] Set up basic Prometheus scraping on port 8888 → Grafana dashboard import
- [ ] **Expected outcome:** Full cost visibility. Baseline established for optimization.

#### Week 2 — Caching (30–60% Cost Reduction)

- [ ] Implement `semantic_cache.py` with Redis Vector Search index (HNSW)
- [ ] Add `cache_get` check before every LLM call in `router/main.py`
- [ ] Add `cache_set` after every LLM response (with PII check)
- [ ] Configure TTL map by `use_case` (30 days for syntax, 1 hour for security)
- [ ] Run cache warming script on top-100 FAQ queries from Langfuse analytics
- [ ] **Target:** >30% cache hit rate within 72 hours of deployment.

#### Week 3 — Routing (60–87% Additional Savings)

- [ ] Deploy `classifier.py` with SBERT model (`pip install sentence-transformers`)
- [ ] Integrate classifier into routing engine: score → model selection
- [ ] A/B test: route 10% traffic to new router, compare quality vs full-Frontier baseline
- [ ] Validate: Nano-tier suggestion acceptance rate > 25% (acceptable quality)
- [ ] Gradually increase routing percentage to 100% as quality validates
- [ ] **Expected outcome:** 60–87% cost reduction vs always-Frontier baseline.

#### Week 4 — Budget Governance

- [ ] Define monthly token budgets per team and feature in `BUDGETS` dict
- [ ] Deploy budget manager with Redis atomic counters
- [ ] Configure Slack webhook for budget alert notifications
- [ ] Set budget alert thresholds: 80% (soft) / 95% (downgrade) / 100% (queue)
- [ ] Add budget check step to routing engine before LLM dispatch
- [ ] Brief all team leads on budget dashboard URL and interpretation.

#### Month 2 — Agentic Controls + ROI Measurement

- [ ] Wrap all agent loops with `BudgetGuardedAgent` (`max_steps=20`, `max_cost=$5`)
- [ ] Implement lazy tool loading (`select_tools`) in all agent workflows
- [ ] Implement history compression (compress after 10 turns, keep last 3)
- [ ] Run 90-day ROI pilot: measure DORA metrics before vs after
- [ ] Set up GitClear or equivalent for code churn tracking
- [ ] Monthly FinOps review: team cost reports + efficiency ratio ranking

### `requirements.txt` — Complete Dependency Set

```text
litellm>=1.40.0
sentence-transformers>=2.7.0
redis[hiredis]>=5.0.0
fastapi>=0.110.0
uvicorn[standard]>=0.29.0
pydantic>=2.0.0
opentelemetry-sdk>=1.24.0
opentelemetry-exporter-otlp-proto-grpc>=1.24.0
opentelemetry-exporter-prometheus>=0.45b0
prometheus-client>=0.20.0
structlog>=24.0.0
aiokafka>=0.10.0
httpx>=0.27.0
numpy>=1.26.0
openai>=1.30.0       # for text-embedding-3-small
langfuse>=2.0.0      # LLM observability (optional but recommended)
```

**Run services:**
```bash
docker compose up -d                         # full stack
uvicorn gateway.main:app --port 8080         # router service
python cache/warming.py                      # seed cache
python budget/alert_consumer.py             # Slack alerts
```

---

*© 2026 Token Management & AI Cost Architecture — Implementation Guide*
