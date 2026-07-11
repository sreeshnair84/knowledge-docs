---
title: "Scalability Engineering for Agentic Applications"
date_created: 2026-07-07
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["agentic-ui"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# Scalability Engineering for Agentic Applications

A comprehensive scalability reference for AI Platform Teams and Principal Architects covering stateless design, horizontal scaling patterns, queue architectures, autoscaling, GPU scheduling, and capacity planning for agentic systems from frontend through LLM inference.

:::note Related Guides
    - Circuit breakers and degradation under load: [`reliability-engineering.md`](reliability-engineering.md)
    - AI Gateway load balancing and rate limiting: [`../cloud-platforms/ai-gateway/kong-ai-gateway-guide.md`](../cloud-platforms/ai-gateway/kong-ai-gateway-guide.md)
    - Agent memory and state scaling: [`../enterprise-architecture/ai-architecture/agent-memory-planning-architecture.md`](../enterprise-architecture/ai-architecture/agent-memory-planning-architecture.md)

---

## 1. Scalability Dimensions Unique to Agentic Applications

Agentic applications impose fundamentally different scalability constraints than stateless REST APIs. Understanding these differences is prerequisite to selecting the right scaling strategies.

### 1.1 The Four Hard Problems

| Scalability Problem | Traditional App | Agentic App | Engineering Impact |
| -------------------- | ---------------- | ------------- | ------------------- |
| **Stateful conversations** | Each request independent | Session state must follow user or be accessible from any instance | Session affinity OR expensive state externalization |
| **Long-running tasks** | < 1s per request | 30s – 30min per task | Persistent connections; heartbeats; worker lifecycle management |
| **Token throughput bottleneck** | CPU/memory bound | LLM token generation is the primary ceiling | Cannot scale past provider TPM (tokens-per-minute) limits |
| **Tool call fan-out** | Linear request processing | One user message triggers 5–20 parallel tool calls | Concurrency spikes; downstream API rate limit cascade |

### 1.2 The Agentic Scalability Stack

```text
Agentic Application Scalability Layers

┌─────────────────────────────────────────────────────────────┐
│  Layer 6: Frontend (React)                                  │
│  • Virtualized conversation history                         │
│  • SSE backpressure signalling                              │
│  • Service Worker for offline/caching                       │
├─────────────────────────────────────────────────────────────┤
│  Layer 5: AG-UI Gateway (Edge/CDN)                          │
│  • SSE termination and fan-in                               │
│  • Rate limiting per user/tenant                            │
│  • Token bucket throttling                                  │
├─────────────────────────────────────────────────────────────┤
│  Layer 4: Agent Orchestrator                                │
│  • Horizontal worker pool scaling                           │
│  • Session affinity or state externalization                │
│  • Task queue management                                    │
├─────────────────────────────────────────────────────────────┤
│  Layer 3: LLM Proxy / AI Gateway                            │
│  • Multi-provider load balancing                            │
│  • Semantic caching                                         │
│  • Retry and fallback logic                                 │
├─────────────────────────────────────────────────────────────┤
│  Layer 2: Tool Executor Service                             │
│  • Per-tool connection pools                                │
│  • Parallel fan-out with concurrency limits                 │
│  • Result caching by tool type and TTL                      │
├─────────────────────────────────────────────────────────────┤
│  Layer 1: Memory and Storage                                │
│  • Vector DB horizontal scaling (shard by collection)       │
│  • Redis cluster for hot state                              │
│  • Tiered storage: hot → warm → cold                        │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Token Throughput: The Primary Ceiling

LLM token generation is the hard scalability ceiling for most agentic deployments. Unlike CPU or memory, which can be scaled horizontally with cost, token throughput is governed by provider limits.

| Constraint Type | Source | Typical Limit | Scale-Out Option |
| ---------------- | -------- | --------------- | ----------------- |
| RPM (requests per minute) | Provider tier | 500 – 10,000 RPM | Multi-provider routing; multiple API keys |
| TPM (tokens per minute) | Provider tier | 40K – 4M TPM | Distribute across provider tiers |
| TPD (tokens per day) | Provider tier | Hard daily cap | Batch workloads in off-peak windows |
| Concurrent requests | Provider | 10 – 500 | Queue management + circuit breaking |
| Context window | Model | 8K – 2M tokens | Context compression to extend effective throughput |

---

## 2. Stateless Architecture Patterns

### 2.1 Session State Externalization

Moving session state out of the agent worker process enables any instance to serve any request, enabling true horizontal scaling.

| Storage Option | Latency | Consistency | Cost | Best For |
| --------------- | --------- | ------------- | ------ | --------- |
| **Redis Cluster** | < 1ms | Strong (single shard) | Medium | Hot session data; streaming position |
| **DynamoDB / Cosmos DB** | 5–15ms | Strong (provisioned) | Medium-high | Session metadata; turn history |
| **PostgreSQL** | 5–20ms | ACID | Low-medium | Structured conversation history |
| **Object Storage (S3/GCS)** | 50–200ms | Eventual | Very low | Long-term archive; context snapshots |
| **Memcached** | < 1ms | None (no persistence) | Low | Ephemeral context fragments only |

```python
# Session state externalization pattern
from redis.asyncio import Redis
import json
from typing import Optional
from dataclasses import dataclass, asdict

@dataclass
class SessionState:
    session_id: str
    user_id: str
    conversation_history: list
    current_plan: dict
    tool_results_cache: dict
    last_event_id: str
    degradation_level: int = 1

class ExternalizedSessionStore:
    def __init__(self, redis: Redis, ttl_seconds: int = 3600):
        self.redis = redis
        self.ttl = ttl_seconds

    async def load(self, session_id: str) -> Optional[SessionState]:
        data = await self.redis.get(f"session:{session_id}")
        if data is None:
            return None
        return SessionState(**json.loads(data))

    async def save(self, state: SessionState) -> None:
        await self.redis.setex(
            f"session:{state.session_id}",
            self.ttl,
            json.dumps(asdict(state))
        )

    async def update_field(self, session_id: str, field: str, value) -> None:
        """Partial update without loading full state."""
        # Use Redis hash for granular field updates
        await self.redis.hset(f"session:h:{session_id}", field, json.dumps(value))
        await self.redis.expire(f"session:h:{session_id}", self.ttl)
```

### 2.2 Event-Sourced Conversation State

Event sourcing stores the append-only log of conversation events rather than a mutable state snapshot. Any worker can reconstruct the current state by replaying the event log.

```text
Event-Sourced Conversation

Event Log (append-only):
  evt-001: UserMessage  { content: "Book a flight to NYC" }
  evt-002: PlanCreated  { steps: ["search_flights", "check_price", "book"] }
  evt-003: ToolCall     { tool: "search_flights", args: {...} }
  evt-004: ToolResult   { tool: "search_flights", result: {...} }
  evt-005: AgentThought { content: "Best option is AA101 at $450" }
  evt-006: ToolCall     { tool: "book_flight", args: {...} }
  evt-007: ToolResult   { tool: "book_flight", result: { confirmation: "XYZ" }}
  evt-008: AgentMessage { content: "Your flight is booked. Confirmation: XYZ" }

Benefits:
  • Any worker can reconstruct state from evt-001..N
  • Built-in audit trail
  • Natural replay for debugging
  • Streaming resync via Last-Event-ID

Trade-offs:
  • State reconstruction cost grows with event count
  • Requires periodic snapshots for long sessions
  • Event schema must be versioned carefully
```

### 2.3 Stateless vs Stateful Worker Trade-Offs

| Aspect | Stateless Workers | Stateful Workers |
| -------- | ------------------- | ----------------- |
| Scaling | Simple horizontal — add instances | Complex — must migrate or drain sessions |
| Memory efficiency | Load state on each request (cache miss cost) | Keep hot state in memory (fast) |
| Fault tolerance | Any worker can take over on crash | Session lost unless migrated first |
| Deployment | Rolling deploy with zero-downtime | Requires session drain before instance replacement |
| Cost | Higher Redis/DB read cost per request | Higher per-instance memory cost |
| Recommended use | Interactive chat (short sessions < 5min) | Long-running tasks (> 5min); autonomous agents |

---

## 3. Sticky Sessions and Session Affinity

### 3.1 When Sticky Sessions Are Required

Sticky sessions route a user's requests to the same backend instance. They are required when:

1. **Active streaming connection** — an SSE/WebSocket connection is live; it cannot be moved to another instance without interruption
2. **In-memory tool execution state** — a running agent task has partial results in RAM
3. **GPU-based inference** — the model's KV cache for the session lives on a specific GPU
4. **Tool connection pools** — the worker has an open, authenticated connection to a tool API that cannot be transferred

Sticky sessions are NOT required when:

- State is fully externalized (Redis)
- Request is idempotent (retrieval, read-only)
- Task is queued and not yet started

### 3.2 Consistent Hashing for Agent Assignment

```text
Consistent Hashing Ring — Agent Worker Assignment

        Worker-A
           │
    W-D ───┼─── W-B
           │
        Worker-C

Session routing:
  hash(session_id) mod ring_size → nearest worker clockwise

  Example:
    session-001 → hash: 0x3F → nearest clockwise: Worker-B
    session-002 → hash: 0x7A → nearest clockwise: Worker-C
    session-003 → hash: 0xC1 → nearest clockwise: Worker-A

  When Worker-B is removed (rolling deploy):
    Only Worker-B's sessions are rehashed
    Worker-A, Worker-C sessions unchanged
    → Minimizes session disruption during deploys
```

### 3.3 Session Draining for Rolling Deployments

```yaml
# Kubernetes deployment with session draining
apiVersion: apps/v1
kind: Deployment
metadata:
  name: agent-orchestrator
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0   # Never reduce capacity
  template:
    spec:
      terminationGracePeriodSeconds: 300  # 5min for active sessions to complete
      containers:
        - name: agent-orchestrator
          lifecycle:
            preStop:
              exec:
                command:
                  - /bin/sh
                  - -c
                  - |
                    # Signal: stop accepting new sessions
                    curl -X POST http://localhost:8080/admin/drain
                    # Wait for active sessions to complete (max 4min)
                    timeout 240 /bin/sh -c 'while [ $(curl -s http://localhost:8080/admin/active-sessions) -gt 0 ]; do sleep 5; done'
```

---

## 4. Horizontal Scaling Patterns

### 4.1 Agent Worker Pool Scaling

```text
Agent Worker Pool Architecture

Task Queue (Kafka/SQS)
        │
        ▼
┌───────────────────────────────────────────────────┐
│  Agent Worker Pool (KEDA-scaled)                  │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Worker-1 │  │ Worker-2 │  │ Worker-N │        │
│  │ Sessions │  │ Sessions │  │ Sessions │        │
│  │  max: 10 │  │  max: 10 │  │  max: 10 │        │
│  └──────────┘  └──────────┘  └──────────┘        │
│                                                   │
│  Scale trigger: queue_depth / max_sessions_per_worker │
│  Min replicas: 2   Max replicas: 50               │
│  Scale-out: queue_depth > 20 for 30s              │
│  Scale-in: queue_depth < 5 for 5min               │
└───────────────────────────────────────────────────┘
```

### 4.2 LLM Proxy/Gateway Layer Scaling

The LLM proxy is a critical scaling layer. It should be stateless and scaled independently from agent workers.

| Concern | Pattern | Config Example |
| --------- | --------- | --------------- |
| Multi-provider routing | Weighted round-robin | Claude 60%, GPT-4o 30%, Gemini 10% |
| Rate limit distribution | Token bucket per provider | 400K TPM per provider instance |
| Semantic caching | Embedding similarity > 0.95 → return cache | TTL: 5min for deterministic; 0 for creative |
| Failover | Circuit breaker per provider | Open after 5 failures in 10s |
| Authentication | API key rotation and secret management | Rotate every 30 days; multiple keys per provider |

### 4.3 Tool Executor Scaling

Tool calls are often the highest-fan-out component. Each user message may trigger 5–20 tool calls, some in parallel.

```python
import asyncio
from typing import List, Any
from dataclasses import dataclass

@dataclass
class ToolCallSpec:
    tool_name: str
    args: dict
    timeout_seconds: float = 15.0
    max_concurrent: int = 5  # Per-tool concurrency limit

class ToolExecutor:
    def __init__(self):
        # Per-tool semaphores prevent any single tool from overwhelming its API
        self._semaphores: dict = {}

    def _get_semaphore(self, tool_name: str, max_concurrent: int) -> asyncio.Semaphore:
        if tool_name not in self._semaphores:
            self._semaphores[tool_name] = asyncio.Semaphore(max_concurrent)
        return self._semaphores[tool_name]

    async def execute_parallel(
        self,
        tool_calls: List[ToolCallSpec],
        global_timeout: float = 30.0
    ) -> List[Any]:
        """
        Execute tool calls in parallel, respecting per-tool concurrency limits.
        Returns results in the same order as input, with errors inlined.
        """
        async def execute_one(spec: ToolCallSpec) -> Any:
            sem = self._get_semaphore(spec.tool_name, spec.max_concurrent)
            async with sem:
                try:
                    return await asyncio.wait_for(
                        self._call_tool(spec.tool_name, spec.args),
                        timeout=spec.timeout_seconds
                    )
                except asyncio.TimeoutError:
                    return {"error": "timeout", "tool": spec.tool_name}
                except Exception as e:
                    return {"error": str(e), "tool": spec.tool_name}

        return await asyncio.gather(
            *[execute_one(spec) for spec in tool_calls],
            return_exceptions=False
        )

    async def _call_tool(self, tool_name: str, args: dict) -> Any:
        # Tool dispatch logic
        pass
```

---

## 5. Caching Strategy

### 5.1 Semantic Caching

Semantic caching returns cached responses when a new query is semantically equivalent to a prior query, even without an exact string match.

```text
Semantic Cache Lookup Flow

New query: "What is the capital of France?"
     │
     ▼ Embed query → vector [0.21, 0.88, ...]
     │
     ▼ ANN search in cache index (cosine similarity)
     │
     ├── Nearest match: "What's France's capital city?" (similarity: 0.97)
     │     0.97 > threshold (0.92) → CACHE HIT
     │     Return cached response: "The capital of France is Paris."
     │
     └── No match above threshold → CACHE MISS
           Call LLM → store embedding + response in cache
```

Semantic cache configuration decisions:

| Parameter | Conservative | Balanced | Aggressive |
| ----------- | ------------- | --------- | ----------- |
| Similarity threshold | 0.97 | 0.92 | 0.85 |
| Cache TTL | 1 hour | 6 hours | 24 hours |
| Max cache size | 10K entries | 100K entries | 1M entries |
| Hit rate expectation | 5–15% | 20–35% | 40–60% |
| Staleness risk | Very low | Low | Medium |
| Best for | Medical / legal (high accuracy req.) | General enterprise | FAQ-heavy, stable domain |

### 5.2 Tool Response Caching

| Tool Type | Cacheable? | TTL | Cache Key | Invalidation |
| ----------- | ----------- | ----- | ----------- | ------------- |
| Web search | Yes (soft) | 5 min | query + date | Time-based |
| Database read | Yes | 30 sec | SQL hash + params | Write invalidation |
| File read | Yes | 60 sec | path + etag | etag change |
| Calendar lookup | Yes | 2 min | user + date range | Calendar update event |
| Weather | Yes | 10 min | location + time | Time-based |
| Code execution | No | — | — | Too variable |
| Email send | No | — | — | Side effect; never cache |
| Database write | No | — | — | Side effect; use idempotency |
| Real-time stock | No | — | — | Too volatile |
| User profile | Yes | 5 min | user_id | Profile update event |

### 5.3 LLM Prompt Caching

LLM providers (Anthropic, OpenAI) offer prefix caching: if the same prompt prefix is sent repeatedly, the provider caches the KV state for that prefix and charges less for cache hits.

```python
# Anthropic prompt caching — mark stable prefix with cache_control
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": STABLE_SYSTEM_PROMPT,  # Same across all requests
            "cache_control": {"type": "ephemeral"}  # Cache this prefix
        }
    ],
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": LARGE_DOCUMENT,  # Same document, cache it
                    "cache_control": {"type": "ephemeral"}
                },
                {
                    "type": "text",
                    "text": user_question  # Dynamic per-request; not cached
                }
            ]
        }
    ]
)
# usage.cache_read_input_tokens → tokens served from cache (90% cost reduction)
# usage.cache_creation_input_tokens → tokens written to cache (25% cost premium)
```

**Cache cost analysis:**

| Scenario | Without Cache | With Cache (steady state) | Cost Reduction |
| ---------- | ------------- | -------------------------- | ---------------- |
| 10K token system prompt, 1000 users/day | $30/day | $4/day | 87% |
| 50K token document analysis, 500 users/day | $150/day | $20/day | 87% |
| 1K token system prompt (small) | $3/day | $2.4/day | 20% (break-even at ~50 uses) |

### 5.4 Context Fragment Caching

For RAG-heavy agents, cache retrieved context fragments by embedding so the same retrieval query doesn't hit the vector DB repeatedly.

```python
from hashlib import sha256
import json
from typing import Optional, List

class ContextFragmentCache:
    def __init__(self, redis, ttl_seconds: int = 300):
        self.redis = redis
        self.ttl = ttl_seconds

    def _cache_key(self, query_embedding: List[float], top_k: int) -> str:
        # Round embedding to 3 decimal places for cache key stability
        rounded = [round(x, 3) for x in query_embedding]
        h = sha256(json.dumps({"emb": rounded, "k": top_k}).encode()).hexdigest()[:16]
        return f"ctx:frag:{h}"

    async def get(self, embedding: List[float], top_k: int) -> Optional[list]:
        key = self._cache_key(embedding, top_k)
        cached = await self.redis.get(key)
        return json.loads(cached) if cached else None

    async def set(self, embedding: List[float], top_k: int, fragments: list) -> None:
        key = self._cache_key(embedding, top_k)
        await self.redis.setex(key, self.ttl, json.dumps(fragments))
```

---

## 6. Edge Rendering and CDN

### 6.1 Edge Architecture for Agentic UIs

```text
Edge + Origin Architecture

Users (global)
  │
  ▼
CDN Edge (Cloudflare Workers / Fastly / CloudFront)
  │
  ├── /static/* → Serve from edge cache (UI assets, fonts, icons)
  │
  ├── /api/chat (POST) → Pass through to origin
  │
  ├── /stream/session/* → Edge SSE termination
  │     • Edge maintains SSE connection to client
  │     • Edge polls or subscribes to origin for events
  │     • Edge buffers and replays for reconnects
  │
  └── /api/tools/* → Origin (cannot cache; side effects)

Origin (Regional)
  ├── Agent Orchestrator (k8s)
  ├── LLM Proxy
  └── Tool Executor
```

### 6.2 Edge SSE Termination

Terminating SSE at the edge (rather than origin) reduces the number of long-lived connections that origin servers must maintain.

| Metric | Without Edge SSE | With Edge SSE |
| -------- | ----------------- | -------------- |
| Long-lived connections at origin | = concurrent users | = CDN PoP count |
| Origin server thread/connection cost | High (per-user) | Low (per PoP) |
| User latency | Origin latency | Edge latency (< 20ms) |
| Reconnect behaviour | Client → origin | Client → edge → origin buffers |
| Complexity | Low | High (edge-origin event bus required) |

---

## 7. Load Balancing

### 7.1 Layer 7 Load Balancing for Streaming

Standard round-robin load balancing breaks streaming connections. Streaming requires:

1. **Connection persistence** — once a streaming connection is established, all packets must go to the same origin
2. **Drain support** — before removing an instance, drain all active streams gracefully
3. **Health checks that understand streaming** — health check must verify SSE endpoint, not just HTTP 200

```nginx
# Nginx config for sticky streaming with AG-UI
upstream agent_workers {
    least_conn;  # Route new connections to least-loaded worker

    server worker-1:8080;
    server worker-2:8080;
    server worker-3:8080;

    keepalive 128;  # Keep upstream connections open
}

server {
    location /stream/ {
        proxy_pass http://agent_workers;

        # Streaming-specific settings
        proxy_buffering off;          # Disable response buffering for SSE
        proxy_cache off;
        proxy_read_timeout 3600s;     # Keep connection alive for 1 hour
        proxy_send_timeout 3600s;

        # Session affinity by session_id cookie
        proxy_set_header X-Session-ID $cookie_session_id;

        # SSE headers
        proxy_set_header Accept-Encoding "";
        add_header Cache-Control no-cache;
        add_header Content-Type "text/event-stream";
        add_header X-Accel-Buffering no;
    }
}
```

### 7.2 LLM Provider Load Balancing

| Strategy | Best For | Configuration |
| ---------- | --------- | --------------- |
| **Round-robin** | Homogeneous providers | Distribute evenly across identical providers |
| **Weighted round-robin** | Primary + secondary split | Claude 70% (primary) + GPT-4o 30% (secondary) |
| **Least connections** | Minimizing latency variance | Route to provider with fewest active requests |
| **Priority failover** | Cost optimization | Always use primary; failover only on circuit open |
| **Cost-based routing** | Cost optimization at scale | Route to cheapest provider meeting latency SLO |
| **Task-based routing** | Capability optimization | Complex tasks → Claude Opus; simple → Claude Haiku |

---

## 8. Queue Architecture

### 8.1 Task Queue for Long-Running Agent Jobs

```text
Queue Architecture — Long-Running Agent Tasks

Producer Side:                     Consumer Side:
─────────────                      ──────────────
API Gateway                        Agent Workers
    │                                    │
    │  POST /agent/tasks                  │
    │  (returns task_id immediately)      │
    ▼                                    │
┌────────────────────────────────────────┤
│          Task Queue (Kafka / SQS)      │
│                                        │
│  Priority Queues:                      │
│    HIGH   [HITL tasks, real-time]  ◄──┘ poll
│    NORMAL [standard chat tasks]    ◄── poll
│    BATCH  [background pipelines]   ◄── poll (off-peak)
│                                        │
│  Dead Letter Queue (after 3 failures): │
│    DLQ    [failed tasks → ops team]    │
└────────────────────────────────────────┘
    │
    ▼
WebSocket / Polling endpoint:
    Client polls GET /agent/tasks/{task_id}/status
    OR receives push via SSE stream
```

### 8.2 Queue Configuration Reference

=== "Kafka (self-hosted)"
    ```yaml
    # Kafka topic configuration for agent tasks
    topics:
      agent-tasks-high:
        partitions: 12        # Match number of high-priority workers
        replication-factor: 3
        config:
          retention.ms: 3600000    # 1 hour (tasks expire)
          max.message.bytes: 1048576  # 1MB max task payload

      agent-tasks-normal:
        partitions: 30
        replication-factor: 3
        config:
          retention.ms: 86400000   # 24 hours

      agent-tasks-dlq:
        partitions: 6
        replication-factor: 3
        config:
          retention.ms: 604800000  # 7 days for investigation
    ```

=== "AWS SQS"
    ```python
    import boto3

    sqs = boto3.client('sqs')

    # Create main queue with DLQ
    dlq_response = sqs.create_queue(
        QueueName='agent-tasks-dlq',
        Attributes={
            'MessageRetentionPeriod': '604800',  # 7 days
        }
    )
    dlq_arn = sqs.get_queue_attributes(
        QueueUrl=dlq_response['QueueUrl'],
        AttributeNames=['QueueArn']
    )['Attributes']['QueueArn']

    main_queue = sqs.create_queue(
        QueueName='agent-tasks-normal.fifo',
        Attributes={
            'FifoQueue': 'true',
            'ContentBasedDeduplication': 'false',
            'VisibilityTimeout': '300',     # 5 min processing window
            'MessageRetentionPeriod': '86400',  # 24 hours
            'RedrivePolicy': f'{{"deadLetterTargetArn":"{dlq_arn}","maxReceiveCount":"3"}}',
        }
    )
    ```

### 8.3 Queue Depth Monitoring and Autoscaling Triggers

| Queue | Scale-Out Trigger | Scale-In Trigger | Max Workers | Min Workers |
| ------- | ------------------ | ----------------- | ------------- | ------------- |
| agent-tasks-high | depth > 5 for 30s | depth = 0 for 5min | 20 | 2 |
| agent-tasks-normal | depth > 20 for 60s | depth < 3 for 5min | 50 | 2 |
| agent-tasks-batch | depth > 100 for 5min | depth < 10 for 15min | 30 | 0 (scale-to-zero) |
| tool-executor | depth > 50 for 30s | depth < 10 for 5min | 100 | 3 |

---

## 9. Backpressure

### 9.1 Token Bucket Rate Limiting at AG-UI Gateway

```python
import asyncio
import time
from dataclasses import dataclass

@dataclass
class TokenBucketConfig:
    capacity: int         # Max tokens in bucket
    refill_rate: float    # Tokens added per second
    initial_tokens: int   # Starting token count

class TokenBucket:
    """
    Token bucket rate limiter for AG-UI gateway.
    Limits requests per user/tenant per time window.
    """
    def __init__(self, config: TokenBucketConfig):
        self.capacity = config.capacity
        self.refill_rate = config.refill_rate
        self.tokens = float(config.initial_tokens)
        self.last_refill = time.monotonic()
        self._lock = asyncio.Lock()

    async def consume(self, tokens: int = 1) -> bool:
        """Returns True if request is allowed; False if throttled."""
        async with self._lock:
            self._refill()
            if self.tokens >= tokens:
                self.tokens -= tokens
                return True
            return False

    def _refill(self):
        now = time.monotonic()
        elapsed = now - self.last_refill
        self.tokens = min(
            self.capacity,
            self.tokens + (elapsed * self.refill_rate)
        )
        self.last_refill = now

# Per-tenant rate limiting
class RateLimiter:
    def __init__(self, redis):
        self.redis = redis

    async def check_tenant(self, tenant_id: str, tokens: int = 1) -> bool:
        # Distributed token bucket using Redis atomic operations
        pipe = self.redis.pipeline()
        key = f"ratelimit:tenant:{tenant_id}"
        # Lua script for atomic check-and-consume
        lua = """
        local tokens = tonumber(redis.call('GET', KEYS[1]) or ARGV[2])
        local refill = tonumber(ARGV[1])
        tokens = math.min(tonumber(ARGV[2]), tokens + refill)
        if tokens >= tonumber(ARGV[3]) then
            redis.call('SET', KEYS[1], tokens - tonumber(ARGV[3]), 'EX', 60)
            return 1
        else
            redis.call('SET', KEYS[1], tokens, 'EX', 60)
            return 0
        end
        """
        result = await self.redis.eval(lua, 1, key, 0.5, 100, tokens)
        return bool(result)
```

### 9.2 Backpressure in Streaming Pipelines

```text
Streaming Backpressure Flow

LLM Provider
    │ tokens (fast, ~100 tok/s)
    ▼
Token Buffer (per-session, max 500 tokens)
    │
    ├── Buffer at 80% capacity?
    │     → Signal upstream: pause token read
    │     → Continue draining buffer
    │
    └── Buffer < 20%?
          → Resume upstream token read
    │
    ▼
Formatter (markdown → SSE event)
    │
    ▼
SSE Writer
    │
    ├── Client consuming fast? → write immediately
    │
    └── Client slow (mobile/slow connection)?
          → Buffer formatted events (max 100)
          → Apply backpressure to Formatter
          → Never drop tokens — only keepalives
    │
    ▼
Client Browser
```

---

## 10. Autoscaling

### 10.1 KEDA-Based Autoscaling

KEDA (Kubernetes Event-Driven Autoscaling) enables scaling on business metrics (queue depth, active sessions, GPU utilization) rather than just CPU/memory.

```yaml
# KEDA ScaledObject — Agent Orchestrator
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: agent-orchestrator-scaler
spec:
  scaleTargetRef:
    name: agent-orchestrator
  pollingInterval: 15       # Check every 15 seconds
  cooldownPeriod: 300       # Wait 5 min before scale-in
  minReplicaCount: 2
  maxReplicaCount: 50
  triggers:
    # Scale on task queue depth
    - type: kafka
      metadata:
        bootstrapServers: kafka:9092
        consumerGroup: agent-workers
        topic: agent-tasks-normal
        lagThreshold: "20"   # Scale out when 20+ messages per replica

    # Scale on active session count
    - type: prometheus
      metadata:
        serverAddress: http://prometheus:9090
        metricName: active_agent_sessions
        threshold: "8"       # Scale out when > 8 sessions per replica
        query: sum(active_agent_sessions)

    # Scale on GPU utilization (for self-hosted models)
    - type: prometheus
      metadata:
        serverAddress: http://prometheus:9090
        metricName: gpu_utilization
        threshold: "70"      # Scale out when GPU > 70% utilized
        query: avg(nvidia_gpu_utilization)
```

### 10.2 Scale-to-Zero for Cost Optimization

```yaml
# KEDA for batch agent workers — scale to zero when no tasks
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: batch-agent-scaler
spec:
  scaleTargetRef:
    name: batch-agent-worker
  minReplicaCount: 0   # Scale to zero when idle
  maxReplicaCount: 30
  triggers:
    - type: sqs
      metadata:
        queueURL: https://sqs.us-east-1.amazonaws.com/.../agent-tasks-batch
        queueLength: "1"   # Wake up when any message arrives
        awsRegion: us-east-1
```

### 10.3 Cold Start Mitigation

Scale-to-zero introduces cold start latency (model loading, dependency initialization). Mitigation strategies:

| Strategy | Latency Reduction | Cost Overhead | Complexity |
| --------- | ------------------ | --------------- | ----------- |
| **Warm pool** (keep N idle workers) | Eliminates cold start | Cost of N idle workers | Low |
| **Pre-initialized containers** | 50–70% reduction | Container image size | Medium |
| **Lazy model loading** (load on first request) | None | None | Low |
| **Predictive scaling** (pre-scale before demand) | Eliminates cold start | Over-provisioning | High |
| **HTTP request queuing** (queue first request until warm) | Hides cold start from user | Added first-request latency | Medium |

**Recommended:** Keep min 2 replicas always running (`minReplicaCount: 2`) for interactive workloads; use true scale-to-zero only for batch/background workloads where latency is not user-facing.

---

## 11. Concurrency Management

### 11.1 Concurrency Limits at Each Layer

| Layer | Limit Type | Recommended Default | Enforcement Mechanism |
| ------- | ----------- | -------------------- | ----------------------- |
| Per-user concurrent sessions | Per-user | 3 | Application middleware |
| Per-tenant concurrent sessions | Per-tenant | 100 | Rate limiter (Redis) |
| Per-user concurrent tool calls | Per-user | 10 | Semaphore in orchestrator |
| Per-tool concurrent calls (global) | Per-tool | 50 | Tool executor semaphore |
| Per-LLM-provider concurrent requests | Per-provider | 20 | LLM proxy semaphore |
| Agent worker global concurrency | System-wide | workers × 10 | Worker pool configuration |

### 11.2 Semaphore Pattern for Tool Pools

```python
import asyncio
from typing import Dict

class ConcurrencyManager:
    """Manages per-tool and per-user concurrency limits."""

    def __init__(
        self,
        per_tool_limits: Dict[str, int],
        per_user_limit: int = 10,
        global_limit: int = 500
    ):
        self._tool_semaphores: Dict[str, asyncio.Semaphore] = {
            tool: asyncio.Semaphore(limit)
            for tool, limit in per_tool_limits.items()
        }
        self._user_semaphores: Dict[str, asyncio.Semaphore] = {}
        self._global_semaphore = asyncio.Semaphore(global_limit)
        self._per_user_limit = per_user_limit

    def _user_semaphore(self, user_id: str) -> asyncio.Semaphore:
        if user_id not in self._user_semaphores:
            self._user_semaphores[user_id] = asyncio.Semaphore(self._per_user_limit)
        return self._user_semaphores[user_id]

    async def execute(
        self,
        tool_name: str,
        user_id: str,
        func,
        *args,
        **kwargs
    ):
        tool_sem = self._tool_semaphores.get(
            tool_name,
            asyncio.Semaphore(10)  # Default if tool not in config
        )
        user_sem = self._user_semaphore(user_id)

        async with self._global_semaphore:
            async with user_sem:
                async with tool_sem:
                    return await func(*args, **kwargs)
```

---

## 12. Multi-Region Deployment

### 12.1 Multi-Region Topology

```text
Multi-Region Active-Active Topology

                    ┌─────────────────────────┐
                    │   Global Load Balancer  │
                    │  (latency-based routing)│
                    └────────────┬────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
         ┌──────▼─────┐   ┌──────▼─────┐  ┌──────▼──────┐
         │  US-EAST   │   │  EU-WEST   │  │  AP-SOUTH   │
         │            │   │            │  │             │
         │ Orchestr.  │   │ Orchestr.  │  │ Orchestr.   │
         │ LLM Proxy  │   │ LLM Proxy  │  │ LLM Proxy   │
         │ Tool Exec. │   │ Tool Exec. │  │ Tool Exec.  │
         │ Redis Clus.│   │ Redis Clus.│  │ Redis Clus. │
         └──────┬─────┘   └──────┬─────┘  └──────┬──────┘
                │                │                │
                └────────────────┼────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Global State (DynamoDB  │
                    │  Global Tables /         │
                    │  Cosmos DB multi-region) │
                    └─────────────────────────┘

Replication:
  • Session checkpoints: async, < 5s lag
  • User preferences: sync write
  • Idempotency cache: primary-preferred
  • Conversation archive: async batch
```

### 12.2 Data Sovereignty Constraints

| Constraint | Impact | Design Response |
| ----------- | -------- | ---------------- |
| EU GDPR: data must stay in EU | Cannot replicate EU user data to US | EU session data never leaves EU region; global LB enforces geo-fencing |
| Healthcare (HIPAA): PHI must stay in compliant region | No session state replication to non-compliant regions | Compliant region isolated; failover within-region only |
| Financial (SOC2/PCI): audit logs must be complete | Cannot lose events in replication | Synchronous event log replication; accept higher latency |
| Government (FedRAMP): sovereign cloud | Cannot use shared multi-tenant infrastructure | Dedicated region in AWS GovCloud or Azure Government |

---

## 13. GPU Scheduling

### 13.1 GPU Allocation for Self-Hosted Models

For organizations running their own LLM inference, GPU scheduling is the primary scalability constraint.

| Model Size | VRAM Required | Suitable GPU | Concurrent Requests (naive) | With Continuous Batching |
| ----------- | -------------- | ------------- | --------------------------- | -------------------------- |
| 7B FP16 | 14 GB | A100 40GB (×1) | 1–2 | 8–12 |
| 13B FP16 | 26 GB | A100 40GB (×1) | 1 | 5–8 |
| 70B FP16 | 140 GB | H100 80GB (×2) | 1 | 3–5 |
| 70B INT4 (quantized) | 35 GB | A100 40GB (×1) | 1–2 | 6–10 |
| 405B FP8 | 200 GB | H100 80GB (×3) | 1 | 2–4 |

### 13.2 Continuous Batching for Throughput

Traditional batching waits for a full batch before processing. Continuous batching processes requests as they arrive, inserting new requests into in-progress batches when sequences complete.

```text
Traditional Batching vs Continuous Batching

Traditional:
  t=0: [req1, req2, req3] → process batch → [resp1, resp2, resp3]
  t=1: [req4, req5]       → wait... → process → [resp4, resp5]
  req4 waits the entire batch-1 duration even if it's simple

Continuous Batching (vLLM):
  t=0: [req1, req2, req3] → start processing
  t=2: req1 finishes → insert req4 into batch immediately
  t=3: req2 finishes → insert req5 into batch
  → Throughput 2–3× higher for mixed-length workloads
```

### 13.3 Multi-Model GPU Scheduling

When running multiple models on shared GPU infrastructure, use time-sharing with priority queues:

| Model | Role | Priority | Max VRAM | SLO (TTFT) |
| ------- | ------ | --------- | --------- | ----------- |
| Claude claude-haiku-4-5 equivalent (small) | Planning, routing | High | 14GB | 200ms |
| Claude Sonnet equivalent (medium) | Standard tasks | Normal | 28GB | 800ms |
| Claude Opus equivalent (large) | Complex reasoning | Low | 80GB | 3,000ms |

---

## 14. Connection Pooling

### 14.1 Connection Pool Configuration

| Component | Pool Size | Max Idle | Timeout | Validation |
| ----------- | ----------- | --------- | --------- | ------------ |
| LLM Provider HTTP client | 50 | 20 | 60s connect; 120s read | TCP keepalive |
| Tool API HTTP clients | 20 per tool | 10 | 15s connect; 30s read | Health check before use |
| PostgreSQL (session storage) | 20 per worker | 10 | 5s connect; 30s query | SELECT 1 |
| Redis (state cache) | 50 | 25 | 1s connect; 3s command | PING |
| Vector DB client | 10 per worker | 5 | 3s connect; 10s query | Client-specific health |

---

## 15. Capacity Planning Framework

### 15.1 Load Model

```text
Agentic Application Load Model

Peak concurrent sessions:
  = peak_daily_users × session_overlap_factor
  Example: 10,000 DAU × 0.05 overlap = 500 concurrent sessions

Tokens per session:
  = avg_turns × (avg_input_tokens + avg_output_tokens)
  Example: 8 turns × (800 input + 600 output) = 11,200 tokens/session

Total token throughput (peak):
  = concurrent_sessions × tokens_per_minute_per_session
  Example: 500 × 1,400 TPM/session = 700,000 TPM at peak

Tool calls per session:
  = avg_turns × avg_tool_calls_per_turn
  Example: 8 × 2.5 = 20 tool calls/session

Peak tool call rate:
  = concurrent_sessions × tool_calls_per_minute
  Example: 500 × (20/5 min) = 2,000 tool calls/minute
```

### 15.2 Sizing Formulas

| Component | Formula | Example |
| ----------- | --------- | --------- |
| Agent workers | `ceil(peak_sessions / sessions_per_worker)` | `ceil(500 / 10) = 50 workers` |
| LLM proxy instances | `ceil(peak_TPM / TPM_per_proxy_instance)` | `ceil(700K / 200K) = 4 instances` |
| Tool executor instances | `ceil(peak_tool_calls_per_min / calls_per_instance)` | `ceil(2000 / 500) = 4 instances` |
| Redis memory | `peak_sessions × avg_session_size_KB` | `500 × 50 KB = 25 MB` (easily fits) |
| Vector DB (memory) | `num_embeddings × embedding_dim × 4 bytes × 1.5 overhead` | `1M × 1536 × 4 × 1.5 = 9.2 GB` |

### 15.3 Cost Model

| Architecture Decision | Monthly Cost Impact | Notes |
| ---------------------- | ------------------- | ------- |
| Active-active multi-region (3 regions) | 2.5–3× single region | Full redundancy cost |
| Scale-to-zero batch workers | 40–60% reduction vs always-on | Cold start trade-off |
| Semantic caching (35% hit rate) | 25–30% LLM cost reduction | Higher for repetitive workloads |
| Prompt caching (stable system prompt) | 40–60% input token cost reduction | Anthropic/OpenAI prefix cache |
| Self-hosted 70B model vs API | Break-even at ~$30K/month API spend | Depends on GPU cluster cost |
| Vector DB managed vs self-hosted | Managed: 2–3× self-hosted at scale | But operational overhead significant |

---

## 16. Benchmark Methodology

### 16.1 Agentic Benchmark Scenarios

Unlike pure throughput benchmarks, agentic workloads require measuring quality degradation under load, not just latency and throughput.

| Scenario | Description | Duration | Success Criteria |
| ---------- | ------------- | --------- | ----------------- |
| **Ramp test** | Linearly increase load 0 → 2× peak over 10 min | 10 min | No error rate increase until 80% peak |
| **Soak test** | Sustain 80% peak load for 4 hours | 4 hours | Error rate stable; no memory leak; quality maintained |
| **Spike test** | Instant 5× load spike for 60 seconds | 60 sec spike | System recovers to baseline within 5 min post-spike |
| **Quality-under-load** | Standard load with LLM judge sampling every 5min | 1 hour | Task completion rate does not degrade > 5% vs baseline |
| **Chaos + load** | Inject tool failure at 75% peak load | 30 min | Graceful degradation; no cascading failure |
| **Cold start** | Scale-to-zero → spike | Single event | First request served within SLO after cold start |

### 16.2 Key Benchmark Metrics

In addition to latency (P50/P95/P99) and throughput (requests/second), agentic benchmarks must measure:

| Metric | Why It Matters | Measurement Method |
| -------- | -------------- | ------------------- |
| Task completion rate under load | Quality may degrade before latency | LLM judge on sampled outputs |
| Tool success rate under load | Tool APIs may throttle under spike | Tool result outcome tracking |
| Context assembly time under load | Memory service may become bottleneck | OTel spans |
| Error budget burn rate | Rate of budget consumption during test | SLO dashboard |
| Autoscale response time | How quickly workers appear under spike | Scale event timestamps |

---

## 17. Scalability Anti-Patterns

| # | Anti-Pattern | Description | Impact | Correct Pattern |
| --- | ------------- | ------------- | -------- | ----------------- |
| 1 | **State in Worker Memory** | Session state stored only in agent worker process | Instance crash = session loss; cannot scale horizontally | Externalize state to Redis/DB |
| 2 | **Synchronous Tool Fan-Out** | Agent calls 10 tools sequentially | 10× latency vs parallel | Parallel tool execution with semaphores |
| 3 | **No Connection Pooling** | New HTTP connection per LLM call | 100ms TLS overhead per call at scale | Connection pools with keep-alive |
| 4 | **Single Queue, No Priority** | All tasks in one queue | Batch jobs block interactive chat | Priority queues: HIGH / NORMAL / BATCH |
| 5 | **No Semantic Cache** | Every query hits LLM even for repeat questions | 100% LLM costs; no deflection | Semantic cache with similarity threshold |
| 6 | **Polling Instead of Push** | Client polls /status every second | 1000 users × 1 req/s = 1000 req/s overhead | SSE push or WebSocket |
| 7 | **LLM Provider Single Point** | All traffic to one provider | Provider outage = total outage | Multi-provider routing with failover |
| 8 | **No Rate Limiting** | Unlimited requests per user | One heavy user starves others | Per-user and per-tenant rate limits |
| 9 | **Synchronous Context Assembly** | Context assembly blocks response | High P99 from slow retrievals | Async pre-warming; parallel retrieval |
| 10 | **Sticky Session Without Drain** | Rolling deploy without draining sessions | Active streams interrupted | preStop hook with session drain |
| 11 | **Uniform Token Budget** | Same context size for all tasks | Wasteful for simple tasks; insufficient for complex | Dynamic token budget by task type |
| 12 | **No Autoscale Cooldown** | Autoscaler scales in immediately after spike | Thrashing — up/down/up/down | 5-minute cooldown before scale-in |
| 13 | **Synchronous Saga Rollback** | Wait for all rollbacks before responding | User waits minutes for failure confirmation | Async rollback; immediate safe state |
| 14 | **No Queue Depth Alert** | Queue silently fills | Silent backlog builds; latency spikes surprise | Alert on queue depth > 50% of threshold |
| 15 | **Over-Provisioned Workers** | Always 50 workers even at 10% load | 5× cost at idle | KEDA scale-to-fit with min replicas |
| 16 | **Unbounded Tool Concurrency** | 500 users each fan-out 20 tools = 10,000 concurrent tool calls | Tool API rate limit hit; cascading failure | Per-tool semaphore limits |
| 17 | **No GPU KV Cache Management** | KV cache overflows silently | Context window effectively shrinks; quality degrades | Monitor and alert on KV cache utilization |
| 18 | **Exact-Match LLM Cache Only** | Cache hit rate < 5% | Cache provides no meaningful cost reduction | Semantic caching with embedding similarity |
| 19 | **No DLQ Monitoring** | DLQ silently fills | Tasks lost; sagas incomplete | DLQ depth alert; processor with runbook |
| 20 | **Homogeneous Model Routing** | Same model for all task types | Paying for Opus when Haiku would do | Task complexity routing |
| 21 | **No Data Sovereignty in Routing** | EU user data routed to US region on failover | GDPR violation | Geo-fencing rules in global load balancer |
| 22 | **Benchmark Throughput Only** | k6 tests measure req/s but not quality | System passes load test; quality degrades in production | Quality-under-load benchmarks with LLM judge |
| 23 | **Monolithic Tool Executor** | All tools in one process | One slow tool blocks all tools | Separate tool executor service with bulkheads |
| 24 | **No Session Affinity for Streaming** | Round-robin routing for SSE streams | SSE connections interrupted on each request | Sticky sessions for streaming connections |

---

## 18. Scalability Decision Matrix

| Decision | Option A | Option B | Choose A When | Choose B When |
| ---------- | --------- | --------- | -------------- | -------------- |
| **Session state** | Stateless (externalized) | Stateful (in-memory) | Sessions < 5 min; horizontal scale priority | Long-running tasks > 5 min; latency critical |
| **LLM routing** | Single provider | Multi-provider | Development/test; cost simplicity | Production; > 99.9% availability required |
| **Queue system** | Managed (SQS/Pub Sub) | Self-hosted (Kafka) | < 1M msg/day; ops simplicity | > 1M msg/day; complex routing; compliance |
| **Vector DB** | Managed (Pinecone/Weaviate Cloud) | Self-hosted (Qdrant/pgvector) | < 10M vectors; ops simplicity | > 10M vectors; cost sensitivity; data control |
| **Deployment** | Kubernetes + KEDA | Serverless (Lambda/Cloud Run) | Sustained load > 20% of day; GPU required | Bursty/irregular load; no GPU; ops minimal |
| **Caching** | Semantic cache | Exact cache | High query diversity; NLP domain | Deterministic queries; structured lookups |
| **Multi-region** | Active-active | Active-passive | < 200ms global latency required; high traffic | Cost sensitive; strong consistency required; simple failover |
| **Model hosting** | Self-hosted GPU | Provider API | > $30K/month API spend; data sovereignty | < $30K/month; no GPU team; flexibility |
