---
title: "Performance Engineering for Agentic Applications"
date_created: 2026-07-07
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["agentic-ui"]
---

# Performance Engineering for Agentic Applications

A comprehensive performance reference for AI Platform Teams and Principal Architects covering metrics taxonomy, optimization techniques, and profiling methodology from browser rendering through LLM inference for agentic UIs.

:::note Related Guides
    - Reliability under load (circuit breakers, degradation): [`reliability-engineering.md`](reliability-engineering.md)
    - Scaling for throughput (caching, queues, autoscaling): [`scalability-engineering.md`](scalability-engineering.md)
    - OTel GenAI observability spans: [`../coding-tools/enterprise-ai-architect/agentic-ai-reliability-observability-governance.md`](../coding-tools/enterprise-ai-architect/agentic-ai-reliability-observability-governance.md)

---

## 1. Performance Metrics Taxonomy

Agentic applications require a new vocabulary of performance metrics. Traditional web metrics (TTFB, FCP, LCP) are necessary but insufficient — they miss the LLM-specific and agentic-specific latencies that dominate user-perceived performance.

### 1.1 Full Metrics Taxonomy

| Metric | Abbreviation | Measurement Point | What It Represents |
|--------|-------------|------------------|-------------------|
| Time to First Byte | TTFB | Server → first HTTP byte | Server processing start; includes routing, auth |
| Time to First Token | TTFT | Server → first SSE token event | LLM begins generating; most important UX metric |
| Time to Usable UI | TTUI | Browser → first meaningful render | User sees something useful; skeleton → content |
| First Contentful Paint | FCP | Browser paint | First DOM content visible (standard web metric) |
| Tool Latency P50/P95/P99 | TL | Tool call start → result | Per tool type; critical for planning quality |
| End-to-End Task Latency | E2E | User submit → task complete | Wall-clock time for the full agent task |
| Streaming Lag | SL | Token generated → browser render | Gap between LLM output and visual display |
| Context Assembly Time | CAT | Start build → context ready | Vector retrieval + reranking + composition |
| Planning Latency | PL | Plan request → plan ready | Planner model response time |
| Memory Retrieval Latency | MRL | Query → results ranked | Vector search + reranker time |
| Render Latency | RL | DOM update → paint | React reconciliation + browser repaint |
| Token Throughput | TT | Tokens per second | Sustained generation rate |
| Inter-Token Latency | ITL | Time between consecutive tokens | Perceived streaming smoothness |
| Time to Complete Turn | TTCT | User submit → full response | Complete turn round-trip |

### 1.2 Metrics by User Interaction Type

| Interaction Type | Primary Metric | Secondary Metrics | P95 Target |
|-----------------|---------------|------------------|-----------|
| Simple Q&A (no tools) | TTFT | E2E, Streaming Lag | TTFT < 800ms, E2E < 5s |
| Tool-augmented Q&A | TTFT + Tool Latency | CAT, E2E | TTFT < 1s, E2E < 8s |
| Multi-step agentic task | E2E | Progress events P95, PL | E2E < 45s for 5-step task |
| RAG-heavy research | CAT + TTFT | MRL, E2E | CAT < 500ms, E2E < 15s |
| Code generation + execution | E2E | Planning Latency, Tool Latency | E2E < 30s |
| Document analysis | TTFT | Context Assembly, E2E | TTFT < 1.5s |
| Autonomous background task | E2E (async) | Checkpoint frequency | E2E < 5min for complex task |

### 1.3 Concurrency-Adjusted Metrics

Single-user benchmarks are misleading. Always report metrics under representative concurrent load:

| Metric | Single User | 10 Concurrent | 50 Concurrent | 200 Concurrent |
|--------|------------|--------------|--------------|----------------|
| TTFT P50 | 450ms | 480ms | 520ms | 750ms |
| TTFT P95 | 800ms | 950ms | 1,200ms | 2,100ms |
| E2E P50 | 4.2s | 4.5s | 5.1s | 7.8s |
| Tool Latency P95 | 1.1s | 1.3s | 1.8s | 3.5s |
| Task Completion Rate | 96% | 95% | 93% | 88% |

Degradation above 200 concurrent users (in this example) signals a scalability bottleneck — investigate with the profiling methodology in Section 11.

---

## 2. Performance Budget Framework

### 2.1 Performance Budget by Interaction Type

A performance budget allocates the total latency allowance across layers. Tracking against budgets in CI catches regressions before they reach production.

| Interaction | Total Budget | TTFT Budget | CAT Budget | Tool Budget | Render Budget |
|------------|-------------|------------|-----------|-------------|--------------|
| Simple Q&A | 5,000ms | 800ms | 200ms | 0ms | 100ms |
| RAG Q&A | 8,000ms | 1,000ms | 600ms | 400ms | 100ms |
| Tool-augmented | 10,000ms | 1,200ms | 400ms | 2,000ms | 150ms |
| Multi-step task | 30,000ms | 1,500ms | 600ms | 3,000ms (×3) | 200ms |
| Autonomous task | 300,000ms | N/A (async) | 1,000ms | 5,000ms (×5) | N/A |

### 2.2 Budget Allocation Principles

1. **Reserve 20% for overhead** — network jitter, GC pauses, scheduler delays
2. **Tool budgets are per-call** — a 3-tool task has 3× the tool budget, not shared
3. **Streaming lag compounds** — every 100ms of streaming lag degrades perceived quality
4. **Context assembly must be pre-allocated** — CAT before TTFT; it adds to total wall-clock

### 2.3 Budget Enforcement in CI/CD

```yaml
# k6 performance budget enforcement
# Fails the build if any threshold is violated
export let options = {
  thresholds: {
    // TTFT P95 must be under 1,200ms
    'http_req_duration{name:first_token}': ['p(95)<1200'],

    // End-to-end task P95 under 30s
    'http_req_duration{name:task_complete}': ['p(95)<30000'],

    // Tool call P95 under 2s
    'http_req_duration{name:tool_call}': ['p(95)<2000'],

    // Error rate under 1%
    'http_req_failed': ['rate<0.01'],

    // Task completion rate over 90%
    'task_completion_rate': ['rate>0.90'],
  },
};
```

---

## 3. First-Token Latency Optimization

TTFT is the single most important user-perceived performance metric for agentic chat. Users tolerate streaming delay once the first token arrives; they do not tolerate staring at a spinner.

### 3.1 TTFT Decomposition

```text
TTFT Decomposition (what contributes to the delay)

User click (t=0)
    │
    ├── Network: browser → gateway (10–50ms, CDN helps)
    │
    ├── Auth + routing: (20–80ms with JWT validation)
    │
    ├── Context assembly: (100–600ms, RAG retrieval dominant)
    │     ├── Query embedding:     20–80ms
    │     ├── Vector search:       30–200ms
    │     ├── Reranking:           50–300ms
    │     └── Context formatting:  10–30ms
    │
    ├── Prompt construction: (5–20ms, template rendering)
    │
    ├── LLM TTFT (provider-side): (200–1500ms, model-dependent)
    │     ├── Queue time at provider: 0–500ms (depends on load)
    │     ├── KV cache lookup:        10–50ms
    │     └── First token generation: 100–800ms
    │
    └── Network: provider → gateway → browser (10–50ms)

Total TTFT: ~400ms (best) to ~2,600ms (worst case with RAG)
```

### 3.2 Optimization Techniques

| Technique | Latency Reduction | Complexity | Notes |
|-----------|------------------|-----------|-------|
| **Prompt prefix caching** | 30–60% on TTFT | Low | Provider-side; mark stable prefix with cache_control |
| **Context pre-warming** | 100–400ms | Medium | Pre-fetch likely context before user submits |
| **Parallel context assembly** | 50–70% of sequential CAT | Medium | Embedding + vector search in parallel |
| **Small planning model** | 200–600ms on planning | Medium | Fast model for plan; capable model for execution |
| **Streaming start immediately** | 0ms (perceived) | Low | Start streaming before tool calls complete |
| **Speculative decoding** | 20–40% TTFT improvement | High | Requires model-level support (vLLM) |
| **Request prioritization** | Reduces queue time | Medium | Priority queue; interactive > batch |
| **Edge inference** | 30–100ms | Very high | Deploy small model at CDN edge |

### 3.3 Provider-Side TTFT by Model Tier (2026 Reference)

| Provider + Model | TTFT P50 | TTFT P95 | Token Speed | Best For |
|-----------------|---------|---------|------------|---------|
| Claude claude-haiku-4-5 | 150ms | 350ms | 180 tok/s | Planning, routing, classification |
| Claude claude-sonnet-4-5 | 400ms | 900ms | 120 tok/s | Standard agentic tasks |
| Claude Opus 4 | 800ms | 1,800ms | 70 tok/s | Complex reasoning, analysis |
| GPT-4o mini | 200ms | 500ms | 160 tok/s | Fast tasks, tool calling |
| GPT-4o | 450ms | 1,100ms | 90 tok/s | General purpose |
| Gemini 2.0 Flash | 180ms | 400ms | 200 tok/s | Speed-critical paths |
| Self-hosted 7B (vLLM, A100) | 100ms | 250ms | 120 tok/s | Low-latency on-prem |
| Self-hosted 70B (vLLM, 2×H100) | 350ms | 800ms | 80 tok/s | High-capability on-prem |

:::tip Model Routing for TTFT
    Route the planning phase to claude-haiku-4-5 (TTFT ~150ms) and execution to Claude claude-sonnet-4-5. This cuts planning latency by 60% vs using Sonnet for everything, without impacting execution quality for most tasks.

---

## 4. Streaming Performance

### 4.1 SSE vs WebSocket Benchmark Comparison

| Attribute | SSE (Server-Sent Events) | WebSocket |
|-----------|------------------------|-----------|
| **Protocol** | HTTP/1.1+; native browser EventSource | Custom upgrade; binary framing |
| **Direction** | Server → client only | Bidirectional |
| **Reconnect** | Automatic with Last-Event-ID | Manual |
| **Proxy support** | Excellent (HTTP-native) | Variable (some proxies block) |
| **Load balancer support** | Good (sticky sessions needed) | Good (sticky sessions needed) |
| **Latency per event** | 1–5ms overhead | 0.5–2ms overhead |
| **Memory per connection** | 2–4 KB | 4–8 KB |
| **Throughput ceiling** | 10K–50K connections per server | 50K–100K connections per server |
| **Best for agentic UI** | Standard chat streaming | High-frequency bidirectional events (collaborative agents) |

**For most agentic UIs, SSE is the correct default.** WebSocket adds complexity for minimal gain in one-directional streaming use cases.

### 4.2 Streaming Buffer Management

```typescript
// Browser-side streaming buffer with backpressure
class StreamingBuffer {
  private buffer: string[] = [];
  private renderTimer: number | null = null;
  private readonly FLUSH_INTERVAL_MS = 16;  // ~60fps
  private readonly MAX_BUFFER_SIZE = 100;

  constructor(private readonly onFlush: (tokens: string[]) => void) {}

  push(token: string): void {
    this.buffer.push(token);

    if (this.buffer.length >= this.MAX_BUFFER_SIZE) {
      // Immediate flush if buffer is full
      this.flush();
      return;
    }

    // Schedule flush on next animation frame (batches for smooth rendering)
    if (!this.renderTimer) {
      this.renderTimer = requestAnimationFrame(() => this.flush());
    }
  }

  private flush(): void {
    if (this.buffer.length === 0) return;
    const tokens = [...this.buffer];
    this.buffer = [];
    this.renderTimer = null;
    this.onFlush(tokens);
  }
}
```

### 4.3 Progressive Rendering and Skeleton UI

```typescript
// React streaming UI with progressive enhancement
import \{ useState, useTransition, Suspense } from 'react';

function AgentMessageStream(\{ sessionId }: \{ sessionId: string }) \{
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const startStream = async () => \{
    setIsStreaming(true);
    const eventSource = new EventSource(`/stream/$\{sessionId}`);

    eventSource.addEventListener('token', (e) => \{
      const \{ token } = JSON.parse(e.data);
      // Use startTransition so token updates don't block user interactions
      startTransition(() => \{
        setContent(prev => prev + token);
      });
    });

    eventSource.addEventListener('done', () => \{
      setIsStreaming(false);
      eventSource.close();
    });
  };

  return (
    <div className="agent-message">
      \{isStreaming && content === '' && (
        // Show skeleton while waiting for TTFT
        <MessageSkeleton lines=\{3} />
      )}
      \{content && (
        <MarkdownRenderer
          content=\{content}
          streaming=\{isStreaming}
        />
      )}
      \{isStreaming && (
        <StreamingCursor />
      )}
    </div>
  );
}
```

### 4.4 Incremental DOM Updates

Full re-renders on every token are expensive and cause visual jank. Use incremental text node appending:

```typescript
// Efficient streaming text rendering — append, don't re-render
class StreamingTextRenderer \{
  private container: HTMLElement;
  private currentParagraph: HTMLParagraphElement | null = null;

  constructor(container: HTMLElement) \{
    this.container = container;
  }

  appendToken(token: string): void \{
    if (!this.currentParagraph) \{
      this.currentParagraph = document.createElement('p');
      this.container.appendChild(this.currentParagraph);
    }

    // Append text node directly — no React reconciliation overhead
    if (this.currentParagraph.lastChild?.nodeType === Node.TEXT_NODE) \{
      this.currentParagraph.lastChild.textContent! += token;
    } else \{
      this.currentParagraph.appendChild(document.createTextNode(token));
    }

    // Handle paragraph breaks in streaming content
    if (token.includes('\n\n')) \{
      this.currentParagraph = null;
    }
  }
}
```

---

## 5. Tool Latency Optimization

### 5.1 Parallel Tool Execution

Sequential tool execution multiplies latency. Execute independent tools in parallel wherever possible.

```text
Sequential Tool Execution (AVOID):
  search_web     → 800ms
  query_database → 400ms
  fetch_document → 600ms
  Total: 1,800ms

Parallel Tool Execution (PREFERRED):
  ┌── search_web     800ms ──┐
  ├── query_database 400ms ──┤→ all complete at 800ms
  └── fetch_document 600ms ──┘
  Total: 800ms (55% faster)
```

=== "Python"
    ```python
    import asyncio
    from typing import Any

    async def execute_tools_parallel(tool_calls: list[dict]) -> list[Any]:
        """
        Execute independent tool calls in parallel.
        Preserves order of results matching order of input.
        """
        tasks = [
            asyncio.create_task(
                execute_tool(call["name"], call["arguments"]),
                name=f"tool-\{call['id']}"
            )
            for call in tool_calls
        ]
        # gather preserves order, collects all results even if some fail
        results = await asyncio.gather(*tasks, return_exceptions=True)

        return [
            \{"tool_use_id": call["id"], "content": result}
            if not isinstance(result, Exception)
            else \{"tool_use_id": call["id"], "error": str(result)}
            for call, result in zip(tool_calls, results)
        ]
    ```

=== "TypeScript"
    ```typescript
    async function executeToolsParallel(
      toolCalls: Array<\{ id: string; name: string; input: unknown }>
    ): Promise<Array<\{ toolUseId: string; content?: unknown; error?: string }>> \{
      const results = await Promise.allSettled(
        toolCalls.map(call => executeTool(call.name, call.input))
      );

      return results.map((result, i) => (\{
        toolUseId: toolCalls[i].id,
        ...(result.status === 'fulfilled'
          ? \{ content: result.value }
          : \{ error: result.reason?.message ?? 'Unknown error' }
        ),
      }));
    }
    ```

### 5.2 Tool Response Caching

```python
import hashlib
import json
from typing import Any, Optional
import asyncio

class ToolResponseCache:
    def __init__(self, redis, default_ttl: int = 300):
        self.redis = redis
        self.ttl_by_tool = \{
            "search_web": 300,        # 5 minutes
            "query_database": 30,     # 30 seconds
            "get_user_profile": 300,  # 5 minutes
            "fetch_document": 3600,   # 1 hour
            "get_weather": 600,       # 10 minutes
            "send_email": 0,          # Never cache (side effect)
            "write_database": 0,      # Never cache (side effect)
        }
        self.default_ttl = default_ttl

    def _cache_key(self, tool_name: str, args: dict) -> Optional[str]:
        ttl = self.ttl_by_tool.get(tool_name, self.default_ttl)
        if ttl == 0:
            return None  # This tool must not be cached
        content = json.dumps(\{"tool": tool_name, "args": args}, sort_keys=True)
        h = hashlib.sha256(content.encode()).hexdigest()[:20]
        return f"tool:cache:\{h}"

    async def get_or_execute(self, tool_name: str, args: dict, executor) -> Any:
        key = self._cache_key(tool_name, args)
        if key is None:
            return await executor(tool_name, args)  # Never cache

        cached = await self.redis.get(key)
        if cached:
            return json.loads(cached)  # Cache hit

        result = await executor(tool_name, args)
        ttl = self.ttl_by_tool.get(tool_name, self.default_ttl)
        if ttl > 0:
            await self.redis.setex(key, ttl, json.dumps(result))
        return result
```

### 5.3 Predictive Pre-Fetching

For common tool call sequences, pre-fetch likely tool results before the agent explicitly requests them:

```python
# Tool call prediction patterns (learned from conversation analytics)
PREDICTIVE_PATTERNS = \{
    # When user asks about a customer, pre-fetch their profile
    "customer_inquiry": \{
        "trigger": lambda msg: any(w in msg for w in ["customer", "account", "user"]),
        "prefetch": ["get_customer_profile", "get_recent_orders"]
    },
    # When user asks about a ticket, pre-fetch ticket details
    "ticket_query": \{
        "trigger": lambda msg: "ticket" in msg or "issue" in msg,
        "prefetch": ["get_ticket_details", "get_ticket_history"]
    }
}

async def prefetch_likely_tools(user_message: str, session_context: dict):
    """Pre-fetch tool results in background before agent starts planning."""
    prefetch_tasks = []
    for pattern_name, pattern in PREDICTIVE_PATTERNS.items():
        if pattern["trigger"](user_message.lower()):
            for tool_name in pattern["prefetch"]:
                # Extract likely args from context
                args = extract_args_from_context(tool_name, session_context)
                prefetch_tasks.append(
                    asyncio.create_task(
                        tool_cache.get_or_execute(tool_name, args, execute_tool)
                    )
                )
    if prefetch_tasks:
        # Run in background; results will be in cache when agent asks
        asyncio.gather(*prefetch_tasks, return_exceptions=True)
```

### 5.4 Tool Selection Optimization

Each additional tool in the agent's tool set increases planning time and the probability of wrong tool selection. Optimize by:

| Strategy | Latency Impact | Quality Impact | Implementation |
|----------|--------------|--------------|----------------|
| Dynamic tool selection | -200ms planning | +5% accuracy | Select tools based on query category |
| Tool set tiering | -100ms planning | Neutral | Basic tier (5 tools) vs full tier (25 tools) |
| Tool description compression | -50ms TTFT | Neutral | Shorter tool descriptions = fewer tokens |
| Tool schema caching | -30ms | Neutral | Cache compiled tool schemas in memory |
| Retire unused tools | -10ms per tool | Neutral | Remove tools with < 0.1% usage rate |

---

## 6. Context Assembly Performance

### 6.1 Parallel Context Assembly Pipeline

```text
Sequential (SLOW):                 Parallel (FAST):

Embed query → 50ms                ┌── Embed query → 50ms ──────────────┐
     ↓                            ├── Check cache → 10ms ───────────────┤
Vector search → 150ms             ├── Load conv. history → 30ms ────────┤→ all 150ms
     ↓                            └── Load user prefs → 20ms ───────────┘
Rerank → 200ms                          ↓
     ↓                            Vector search → 150ms (wait for embed)
Load conv. history → 30ms               ↓
     ↓                            Rerank → 200ms (parallel w/ history)
Load user prefs → 20ms                  ↓
     ↓                            Merge + format → 20ms
Merge + format → 20ms             
                                  Total: ~420ms (vs 480ms sequential)
Total: 480ms                      Savings: ~12% + eliminates idle waits
```

### 6.2 Context Compression Algorithms

When the retrieved context exceeds the token budget, compression is necessary. The choice of algorithm affects both latency and quality.

| Algorithm | Latency | Compression Ratio | Quality Loss | Use Case |
|-----------|---------|-------------------|-------------|---------|
| **Truncation** (tail) | 0ms | Up to 90% | High (loses context) | Never recommended |
| **Truncation** (smart: preserve system prompt + recent) | 1ms | Up to 70% | Medium | Last resort |
| **Extractive summarization** | 50–150ms | 60–80% | Low | Conversation history |
| **LLMLingua** (token-level) | 100–500ms | 50–75% | Low-medium | Long documents |
| **RECOMP** (extract-compress) | 200–800ms | 60–80% | Low | RAG passages |
| **LLM summarization** (small model) | 500–2000ms | 70–90% | Very low | Critical context |
| **Hierarchical summarization** | 1000–5000ms | 80–95% | Low | Very long sessions |

**Recommendation:** Use extractive summarization for conversation history (fast, good quality), and LLMLingua for retrieved document passages (better compression with acceptable latency).

### 6.3 Chunking Strategy Impact on Retrieval Speed

The document chunking strategy used at indexing time directly affects retrieval latency at query time.

| Chunking Strategy | Chunk Size | Retrieval Recall | Retrieval Latency | Notes |
|------------------|-----------|-----------------|------------------|-------|
| Fixed-size (512 tokens) | Fixed | Medium | Fast | Simple; misses cross-chunk context |
| Sentence-aware | Variable (50–200 tokens) | High | Fast | Better boundaries; more chunks |
| Paragraph-aware | Variable (100–500 tokens) | High | Medium | Good default |
| Semantic (embedding-based) | Variable | Highest | Slow (indexing) | Best quality; expensive to index |
| Hierarchical (parent+child) | Multi-level | High | Medium | Returns parent for context; child for precision |
| Sliding window (overlap 20%) | Fixed + overlap | High | Medium | Good for dense docs; more storage |

---

## 7. Memory Retrieval Performance

### 7.1 Vector DB Performance Comparison

| Vector DB | Latency P50 (1M vectors) | Latency P95 (1M vectors) | QPS (single node) | Best For |
|-----------|------------------------|------------------------|------------------|---------|
| **Pinecone** (managed) | 10–30ms | 50–80ms | 500–2,000 | Production; managed; fast setup |
| **Weaviate** (managed) | 15–40ms | 60–100ms | 400–1,500 | Hybrid search; multi-tenancy |
| **Qdrant** (self-hosted) | 5–20ms | 20–50ms | 1,000–5,000 | High performance; self-hosted |
| **Chroma** (self-hosted) | 20–60ms | 80–200ms | 100–500 | Development; small scale |
| **pgvector** (PostgreSQL) | 30–100ms | 100–500ms | 100–400 | Existing Postgres; < 1M vectors |
| **Milvus** (self-hosted) | 5–15ms | 20–40ms | 2,000–10,000 | Large scale; high QPS |
| **Redis Vector** | 2–8ms | 10–25ms | 5,000–20,000 | Ultra-low latency; small corpus |

**Choose when:**
- Pinecone / Weaviate: managed cloud, production use, moderate scale
- Qdrant / Milvus: self-hosted, > 10M vectors, high QPS requirement
- pgvector: already using PostgreSQL, < 500K vectors, operational simplicity
- Redis Vector: < 100K vectors, latency SLO < 10ms

### 7.2 Tiered Memory Architecture

```text
Tiered Memory: Hot → Warm → Cold

┌─────────────────────────────────────────────────────────────┐
│  HOT TIER (Redis, < 5ms)                                    │
│  • Current conversation context (last 20 turns)             │
│  • User session preferences                                 │
│  • Frequently retrieved facts (LRU cache)                   │
│  • Tool results cache                                       │
│  TTL: 1–24 hours                                           │
├─────────────────────────────────────────────────────────────┤
│  WARM TIER (Vector DB, 10–80ms)                             │
│  • Long-term user memory (last 90 days)                     │
│  • Organizational knowledge base                            │
│  • Document chunks + embeddings                             │
│  • Conversation summaries                                   │
│  TTL: 90 days – 1 year                                     │
├─────────────────────────────────────────────────────────────┤
│  COLD TIER (Object Storage, 100–500ms)                      │
│  • Full conversation archive                                │
│  • Raw documents                                            │
│  • Context snapshots for replay                             │
│  • Compliance audit logs                                    │
│  TTL: Retention policy (often 7 years for compliance)      │
└─────────────────────────────────────────────────────────────┘

Access pattern:
  1. Check hot tier (< 5ms)
  2. On miss: query warm tier (10–80ms); populate hot tier
  3. On miss: retrieve from cold tier (100–500ms); populate warm tier
```

### 7.3 Index Warm-Up Strategies

Cold vector DB instances have high P99 latency on first queries. Warm up before serving traffic:

```python
import asyncio
import logging

logger = logging.getLogger(__name__)

async def warmup_vector_index(
    vector_client,
    collection_name: str,
    warmup_queries: list[list[float]],
    top_k: int = 5
) -> None:
    """
    Warm up vector DB index by executing dummy queries
    before the service starts accepting user traffic.
    """
    logger.info(f"Warming up vector index: \{collection_name}")
    tasks = [
        vector_client.query(
            collection=collection_name,
            vector=query,
            limit=top_k
        )
        for query in warmup_queries
    ]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    errors = sum(1 for r in results if isinstance(r, Exception))
    logger.info(
        f"Index warmup complete: \{len(warmup_queries) - errors}/\{len(warmup_queries)} successful"
    )

# Call in Kubernetes readiness probe after startup
async def readiness_check() -> bool:
    await warmup_vector_index(
        vector_client=vector_db,
        collection_name="knowledge_base",
        warmup_queries=WARMUP_QUERY_EMBEDDINGS,  # 50 representative queries
    )
    return True
```

---

## 8. Network Optimization

### 8.1 HTTP/2 and HTTP/3 for Streaming

| Protocol | Multiplexing | Header Compression | Connection Setup | SSE Support |
|---------|-------------|------------------|-----------------|-------------|
| HTTP/1.1 | No (one stream per connection) | None | 1 RTT (TLS: 2 RTT) | Yes (one stream) |
| HTTP/2 | Yes (multiple streams per connection) | HPACK | 1 RTT (TLS: 1 RTT with 0-RTT) | Yes (per-stream) |
| HTTP/3 (QUIC) | Yes (without head-of-line blocking) | QPACK | 0 RTT (0-RTT handshake) | Yes |

**Recommendation:** Enable HTTP/2 for all agentic API endpoints. HTTP/3 for global users with variable network conditions.

### 8.2 Compression for AG-UI Events

```python
# gzip/brotli compression middleware for AG-UI event stream
from fastapi import FastAPI, Request, Response
from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI()

# Enable gzip compression for all responses except SSE
# (SSE should NOT be gzip-compressed — it disables streaming)
app.add_middleware(
    GZipMiddleware,
    minimum_size=1000,  # Only compress responses > 1KB
    compresslevel=6,    # Balance between CPU and compression ratio
)

@app.get("/stream/\{session_id}")
async def stream_response(session_id: str):
    # SSE endpoint — DO NOT compress
    return StreamingResponse(
        generate_sse_events(session_id),
        media_type="text/event-stream",
        headers=\{
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",  # Disable nginx buffering
            "Content-Encoding": "identity",  # Explicitly no compression
        }
    )
```

---

## 9. Frontend Rendering Performance

### 9.1 React Streaming Best Practices

| Practice | Latency Improvement | Implementation |
|---------|-------------------|----------------|
| `startTransition` for token updates | Prevents blocking urgent updates | Wrap token appends in `startTransition` |
| `useDeferredValue` for heavy renders | Defers re-render until browser is idle | Apply to conversation history list |
| Virtualized conversation list | Eliminates off-screen render cost | `react-window` or `react-virtual` for > 50 messages |
| `React.memo` for message components | Prevents re-render of completed messages | Memoize each completed message by content hash |
| `Suspense` for tool result loading | Progressive disclosure without blocking | Wrap tool result components in Suspense |
| CSS containment | Limits browser layout scope per message | `contain: layout style` on message containers |

### 9.2 Virtualized Conversation List

```typescript
import { VariableSizeList } from 'react-window';
import { useRef, useCallback } from 'react';

function ConversationHistory({ messages }: { messages: Message[] }) {
  const listRef = useRef<VariableSizeList>(null);
  const sizeMap = useRef<Record<number, number>>({});

  const getItemSize = useCallback(
    (index: number) => sizeMap.current[index] ?? 80,
    []
  );

  const setItemSize = useCallback((index: number, size: number) => {
    if (sizeMap.current[index] !== size) {
      sizeMap.current[index] = size;
      listRef.current?.resetAfterIndex(index);
    }
  }, []);

  return (
    <VariableSizeList
      ref={listRef}
      height={600}
      itemCount={messages.length}
      itemSize={getItemSize}
      width="100%"
      overscanCount={5}  // Render 5 extra items outside viewport
    >
      {({ index, style }) => (
        <MessageItem
          message={messages[index]}
          style={style}
          onHeightChange={(h) => setItemSize(index, h)}
        />
      )}
    </VariableSizeList>
  );
}
```

### 9.3 Web Worker for Heavy Rendering

Offload markdown parsing, syntax highlighting, and math rendering to a Web Worker to avoid blocking the main thread during streaming:

```typescript
// worker.ts — runs in background thread
self.addEventListener('message', async (event) => {
  const { type, content, id } = event.data;

  if (type === 'parse_markdown') {
    const parsed = await parseMarkdown(content);
    const highlighted = await applySyntaxHighlighting(parsed);
    self.postMessage({ type: 'parsed', id, html: highlighted });
  }
});

// main thread
const renderWorker = new Worker(new URL('./worker.ts', import.meta.url));

function renderMessage(content: string, id: string): Promise<string> {
  return new Promise((resolve) => {
    const handler = (e: MessageEvent) => {
      if (e.data.id === id) {
        renderWorker.removeEventListener('message', handler);
        resolve(e.data.html);
      }
    };
    renderWorker.addEventListener('message', handler);
    renderWorker.postMessage({ type: 'parse_markdown', content, id });
  });
}
```

---

## 10. LLM Inference Optimization

### 10.1 Quantization Trade-Offs

| Quantization | VRAM Usage | Quality Loss | Throughput Gain | Use Case |
|-------------|-----------|-------------|----------------|---------|
| **FP32** (full precision) | 4× FP16 | None (baseline) | 0.5× FP16 | Training only |
| **FP16** (half precision) | Baseline | Negligible | Baseline | Standard production |
| **BF16** | Same as FP16 | Negligible | Same as FP16 | Preferred on H100/A100 |
| **INT8** | 0.5× FP16 | < 1% on most benchmarks | 1.5–2× FP16 | Good quality/cost balance |
| **INT4** (GPTQ/AWQ) | 0.25× FP16 | 1–5% on benchmarks | 2–3× FP16 | Cost-optimized serving |
| **INT4 + INT8 mixed** | 0.3× FP16 | < 2% | 2–2.5× FP16 | Recommended self-hosted default |

### 10.2 Inference Server Comparison

| Server | Continuous Batching | Multi-Model | Quantization | Best For |
|--------|-------------------|------------|-------------|---------|
| **vLLM** | Yes (PagedAttention) | Yes | GPTQ, AWQ, INT8 | General purpose; high throughput |
| **TGI** (HuggingFace) | Yes | Yes | INT8, INT4 | HuggingFace models; easy setup |
| **SGLang** | Yes (RadixAttention) | Yes | INT8 | Complex multi-call workloads |
| **Triton Inference Server** | Configurable | Yes | TensorRT-LLM | Enterprise; NVIDIA stack |
| **Ollama** | No | Yes | GGUF (Q4–Q8) | Development; laptop inference |
| **LM Studio** | No | No | GGUF | Development only |

**Choose vLLM** for production self-hosted inference. Its PagedAttention mechanism provides the best throughput for concurrent requests through efficient KV cache memory management.

### 10.3 KV Cache Management

```text
KV Cache: The Hidden Performance Variable

Without KV cache management:
  Session 1: 10,000 tokens (fills 40% of GPU KV cache)
  Session 2: 8,000 tokens (fills 32%)
  Session 3: 15,000 tokens (fills 60%) → EVICTS session 1 + 2!
  New request for session 1 → must recompute from scratch

With PagedAttention (vLLM):
  KV cache stored in pages (blocks), not contiguous memory
  Pages allocated and freed like virtual memory
  No fragmentation → higher utilization → less eviction
  → 10–15× more concurrent sessions per GPU
```

### 10.4 Request Batching Strategies

| Strategy | Throughput | Latency | Implementation |
|----------|-----------|--------|----------------|
| **Static batching** | Medium | High (waits for batch) | Batch size N; wait until full |
| **Dynamic batching** | High | Medium | Batch with timeout; send partial batch if timeout reached |
| **Continuous batching** | Highest | Low | Insert new requests as old ones finish tokens |
| **Speculative batching** | Highest | Lowest | Draft model generates candidates; verify in batch |

---

## 11. Profiling Methodology

### 11.1 AG-UI Event Timeline Profiling

```text
AG-UI Performance Profiling — Event Timeline

Timeline spans (OpenTelemetry):

t=0ms     [user.submit_message]
t=10ms      [auth.validate_token]         ← 10ms
t=12ms      [session.load_state]          ← 2ms  (Redis hit)
t=15ms      ┌── [context.assemble] ───────────────────── 385ms
t=15ms      │   [query.embed]             ← 45ms
t=60ms      │   [vector.search]           ← 90ms
t=150ms     │   [reranker.score]          ← 200ms
t=350ms     │   [context.format]          ← 50ms
t=400ms     └─────────────────────────────────
t=400ms     [llm.request_start]
t=410ms       [llm.provider_queue]        ← 10ms (no queue)
t=410ms       [llm.first_token]           ← 390ms  ← TTFT = 800ms total
t=800ms    ←── TTFT ──────────────────────────────
t=800ms       [stream.first_token_sent]
              ... streaming ...
t=4,200ms     [stream.done]
              ... tool calls ...
t=4,200ms   [tool.search_web.start]
t=5,100ms   [tool.search_web.end]         ← 900ms
t=4,200ms   [tool.query_db.start]         (parallel)
t=4,700ms   [tool.query_db.end]           ← 500ms
t=5,100ms   [llm.second_request]         (after tools)
t=5,500ms   [llm.first_token]            (second call)
t=8,300ms   [stream.final_done]
t=8,300ms  ← E2E TASK LATENCY = 8,300ms ──────────
```

### 11.2 Server-Side Trace with OpenTelemetry

```python
from opentelemetry import trace
from opentelemetry.trace import SpanKind

tracer = trace.get_tracer("agent-orchestrator")

async def handle_user_message(session_id: str, message: str):
    with tracer.start_as_current_span(
        "agent.handle_message",
        kind=SpanKind.SERVER,
        attributes={
            "session.id": session_id,
            "message.length": len(message),
        }
    ) as root_span:
        
        # Context assembly
        with tracer.start_as_current_span("context.assemble") as ctx_span:
            context = await assemble_context(session_id, message)
            ctx_span.set_attribute("context.token_count", context.token_count)
            ctx_span.set_attribute("context.retrieval_count", len(context.fragments))

        # LLM call
        with tracer.start_as_current_span(
            "gen_ai.completion",
            attributes={
                "gen_ai.system": "anthropic",
                "gen_ai.request.model": "claude-sonnet-4-5",
                "gen_ai.request.max_tokens": 2048,
            }
        ) as llm_span:
            response = await call_llm(context)
            llm_span.set_attribute("gen_ai.usage.input_tokens", response.usage.input_tokens)
            llm_span.set_attribute("gen_ai.usage.output_tokens", response.usage.output_tokens)
            llm_span.set_attribute("gen_ai.response.ttft_ms", response.ttft_ms)
```

### 11.3 Browser Performance Timeline

```javascript
// Browser-side performance marking for agentic UI
class AgentPerfTracker \{
  private marks: Record<string, number> = {};

  mark(name: string): void \{
    this.marks[name] = performance.now();
    performance.mark(`agent:$\{name}`);
  }

  measure(name: string, start: string, end: string): number \{
    performance.measure(`agent:$\{name}`, `agent:$\{start}`, `agent:$\{end}`);
    return this.marks[end] - this.marks[start];
  }

  reportToAnalytics(sessionId: string): void \{
    const metrics = \{
      session_id: sessionId,
      ttft_ms: this.measure('ttft', 'submit', 'first_token'),
      first_render_ms: this.measure('first_render', 'first_token', 'first_paint'),
      e2e_ms: this.measure('e2e', 'submit', 'task_complete'),
      streaming_lag_avg_ms: this.calculateAvgStreamingLag(),
    };

    // Send to analytics / RUM service
    navigator.sendBeacon('/analytics/performance', JSON.stringify(metrics));
  }
}

// Usage
const tracker = new AgentPerfTracker();
submitButton.addEventListener('click', () => tracker.mark('submit'));
eventSource.addEventListener('token', () => \{
  if (isFirstToken) tracker.mark('first_token');
});
eventSource.addEventListener('done', () => \{
  tracker.mark('task_complete');
  tracker.reportToAnalytics(sessionId);
});
```

### 11.4 Identifying Bottlenecks: Decision Tree

```text
Performance Investigation Decision Tree

Symptom: High TTFT (> 1.5s P95)
    │
    ├── Is CAT > 600ms?
    │     YES → Bottleneck in context assembly
    │           ├── Is vector search > 200ms? → Index tuning or Redis cache
    │           ├── Is reranker > 300ms? → Switch to bi-encoder or reduce top-k
    │           └── Is embedding > 100ms? → Batch embedding or faster model
    │
    ├── Is provider queue time > 200ms?
    │     YES → LLM provider throughput limit
    │           ├── Add more API keys (distribute RPM limit)
    │           ├── Route to faster model tier for this task
    │           └── Enable request batching / queuing
    │
    └── Is auth/routing > 100ms?
          YES → Auth service bottleneck
                ├── JWT validation in middleware (no network hop)
                └── Auth service scaling

Symptom: High Tool Latency (> 3s P95)
    │
    ├── Are tools called sequentially?
    │     YES → Implement parallel tool execution
    │
    ├── Is tool API rate limited?
    │     YES → Tool response caching; multiple API keys
    │
    └── Is single tool slow?
          YES → Per-tool investigation (check tool API status)

Symptom: High Streaming Lag (> 300ms)
    │
    ├── Is token buffer filling up?
    │     YES → Increase buffer flush rate; check client consumption speed
    │
    ├── Is React re-rendering on every token?
    │     YES → Use startTransition; append text node directly
    │
    └── Is network between server and client slow?
          YES → CDN edge; HTTP/2 multiplexing; compression for non-SSE
```

---

## 12. Performance Testing

### 12.1 Load Testing Agentic Workloads

```javascript
// k6 load test for agentic chat (ES module format)
import http from 'k6/http';
import \{ check, sleep } from 'k6';
import \{ Counter, Trend } from 'k6/metrics';

const ttftTrend = new Trend('ttft_ms');
const taskCompleteTrend = new Trend('task_complete_ms');
const taskCompletionRate = new Counter('task_completed');

export let options = \{
  stages: [
    \{ duration: '2m', target: 10 },   // Ramp up
    \{ duration: '5m', target: 50 },   // Sustain
    \{ duration: '2m', target: 100 },  // Spike
    \{ duration: '5m', target: 50 },   // Recovery
    \{ duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: \{
    'ttft_ms': ['p(95)<1200'],
    'task_complete_ms': ['p(95)<30000'],
    'http_req_failed': ['rate<0.01'],
  },
};

export default function () \{
  const sessionId = `test-session-$\{__VU}-$\{__ITER}`;

  // Initiate agent task
  const startTime = Date.now();
  const res = http.post(
    '/api/chat',
    JSON.stringify(\{
      session_id: sessionId,
      message: 'What are the top 3 issues in my support queue this week?',
    }),
    \{ headers: \{ 'Content-Type': 'application/json' } }
  );

  check(res, \{ 'task started': (r) => r.status === 200 });
  const taskId = res.json('task_id');

  // Poll for first token (TTFT simulation)
  let ttftRecorded = false;
  let attempts = 0;
  while (attempts < 30) \{
    const statusRes = http.get(`/api/tasks/$\{taskId}/events`);
    if (statusRes.json('has_first_token') && !ttftRecorded) \{
      ttftTrend.add(Date.now() - startTime);
      ttftRecorded = true;
    }
    if (statusRes.json('status') === 'complete') \{
      taskCompleteTrend.add(Date.now() - startTime);
      taskCompletionRate.add(1);
      break;
    }
    sleep(1);
    attempts++;
  }
}
```

### 12.2 Latency Regression Testing in CI

```yaml
# GitHub Actions step for performance regression testing
- name: Performance regression test
  run: |
    k6 run --out json=perf-results.json tests/perf/agent-load-test.js

- name: Compare with baseline
  run: |
    python scripts/compare_perf.py \
      --current perf-results.json \
      --baseline perf-baseline.json \
      --max-regression-pct 10 \
      --fail-on-regression

- name: Upload results
  uses: actions/upload-artifact@v3
  with:
    name: perf-results
    path: perf-results.json
```

### 12.3 Real-User Monitoring (RUM)

```typescript
// RUM SDK integration for agentic UI
import \{ datadogRum } from '@datadog/browser-rum';

// Track agent-specific custom actions
function trackAgentMetrics(event: AgentUIEvent): void \{
  if (event.type === 'first_token') \{
    datadogRum.addAction('agent.first_token', \{
      session_id: event.sessionId,
      ttft_ms: event.ttft,
      model: event.model,
      has_tools: event.hasTools,
      context_tokens: event.contextTokens,
    });
  }

  if (event.type === 'task_complete') \{
    datadogRum.addAction('agent.task_complete', \{
      session_id: event.sessionId,
      e2e_ms: event.totalDuration,
      tool_count: event.toolsUsed,
      completion_status: event.status,
    });
  }
}

// Custom RUM views for conversation sessions
datadogRum.startView(\{
  name: 'agent_conversation',
  service: 'agent-ui',
});
```

---

## 13. Performance Reference Benchmarks

### 13.1 TTFT Ranges by Model Tier (2026, API-hosted)

| Model Tier | P50 | P95 | P99 | Notes |
|-----------|-----|-----|-----|-------|
| Ultra-fast (Haiku/Flash) | 150–300ms | 400–700ms | 700–1,200ms | Best for classification, routing |
| Standard (Sonnet/GPT-4o) | 350–600ms | 800–1,400ms | 1,400–2,500ms | Best for general tasks |
| Advanced (Opus/GPT-4o-Preview) | 700–1,200ms | 1,500–3,000ms | 3,000–5,000ms | Best for complex reasoning |
| With RAG (+ vector retrieval) | Add 100–500ms | Add 200–800ms | Add 500–1,500ms | Varies by retrieval complexity |
| With semantic cache (35% hit) | −60ms avg | −100ms avg | −200ms avg | Cache hits skip retrieval |

### 13.2 Tool Latency Ranges by Type

| Tool Category | P50 | P95 | P99 | Notes |
|--------------|-----|-----|-----|-------|
| In-memory lookup | 1–5ms | 5–15ms | 15–50ms | Redis, local state |
| Database read (indexed) | 5–30ms | 30–80ms | 80–200ms | Postgres, DynamoDB |
| Vector DB search | 10–50ms | 50–150ms | 150–400ms | Depends on index size |
| Internal API call | 20–100ms | 100–300ms | 300–800ms | Depends on service |
| External SaaS API | 100–500ms | 500–1,500ms | 1,500–5,000ms | Network-dependent |
| Web search | 300–800ms | 800–2,000ms | 2,000–5,000ms | Provider-dependent |
| Code execution (sandbox) | 500–2,000ms | 2,000–8,000ms | 8,000–30,000ms | Startup + execution |
| File/document processing | 200–1,000ms | 1,000–5,000ms | 5,000–20,000ms | File size–dependent |

### 13.3 Vector Retrieval Latency by DB and Index Size

| Vector DB | 100K vectors | 1M vectors | 10M vectors | 100M vectors |
|-----------|-------------|-----------|------------|-------------|
| Pinecone (s1) | 5–15ms | 10–30ms | 20–60ms | 40–120ms |
| Qdrant (HNSW) | 3–10ms | 5–20ms | 10–40ms | 20–80ms |
| Milvus (IVF_FLAT) | 5–20ms | 15–50ms | 30–100ms | 60–200ms |
| pgvector (ivfflat) | 10–40ms | 30–100ms | 80–300ms | Not recommended |
| Redis Vector | 2–5ms | 5–15ms | 15–50ms | Not recommended |

---

## 14. Performance Anti-Patterns

| # | Anti-Pattern | Description | Impact | Correct Pattern |
|---|-------------|-------------|--------|-----------------|
| 1 | **Sequential Tool Calls** | Tools called one-at-a-time even when independent | N × tool latency instead of max(tool latency) | Parallel execution with `asyncio.gather` / `Promise.allSettled` |
| 2 | **No Prompt Cache** | System prompt rebuilt and billed in full every call | 100% input token cost for stable prefix | Mark stable prefix with `cache_control` |
| 3 | **Full Re-render per Token** | React state update on every token | Browser jank; main thread blocking | `startTransition` + text node append |
| 4 | **Synchronous Context Assembly** | Embed → search → rerank → history (sequential) | Each step waits for previous; 400–800ms wasted | Parallel assembly with independent sub-queries |
| 5 | **No Semantic Cache** | Same question asked 1000× hits LLM every time | 100× LLM cost for cached workloads | Semantic cache with cosine similarity threshold |
| 6 | **Same Model for All Tasks** | Using Opus for "summarize in 1 sentence" | 5–10× slower and more expensive than needed | Route to Haiku/Flash for simple tasks |
| 7 | **Unvirtualized Message List** | All 500 messages in DOM simultaneously | 500× render cost; scroll lag | Virtualized list (react-window) |
| 8 | **Synchronous Markdown Parsing** | Parse markdown on main thread per streaming token | UI jank during streaming | Web Worker for markdown + syntax highlighting |
| 9 | **No Tool Response Cache** | Weather/DB queries re-executed every turn | Redundant latency; unnecessary API cost | TTL cache by tool type |
| 10 | **Context Assembly After Queue** | Context assembled after LLM queue position reserved | Wasted time; LLM waits for context | Assemble context in parallel with queue wait |
| 11 | **No Streaming Buffer** | Each SSE token triggers individual DOM update | 100 tok/s = 100 DOM updates/s | Buffer tokens; flush at 60fps |
| 12 | **Blocking Auth on LLM Path** | Auth service called synchronously in hot path | 20–100ms added to every request | JWT validation in middleware (no network hop) |
| 13 | **Large Tool Schemas Every Call** | Full 50-tool JSON schema sent every request | 2,000–5,000 extra tokens per call | Dynamic tool selection; schema caching |
| 14 | **No Connection Pooling** | New TLS connection per LLM API call | 100ms+ overhead per call | HTTP connection pool with keep-alive |
| 15 | **SSE Buffering at Proxy** | Nginx/proxy buffers SSE before sending | Chunks accumulate; streaming appears batch | `X-Accel-Buffering: no`; `proxy_buffering off` |
| 16 | **No Compression for REST** | Large JSON payloads sent uncompressed | 3–10× payload overhead | gzip/brotli for REST (not SSE) |
| 17 | **Polling Instead of SSE** | Client polls `/status` every second for task completion | 1000 users = 1000 req/s overhead | SSE push notifications |
| 18 | **Missing Warmup** | Cold vector DB; cold LLM proxy; cold worker on first request | 2–10× latency on first requests after deploy | Readiness probe with warmup queries |
| 19 | **Full Context Reload on Tool Error** | Rebuilds entire context on tool retry | Double context assembly cost | Cache context; pass to retry |
| 20 | **No Inter-Token Latency Monitoring** | Only measuring TTFT, not streaming smoothness | Jittery streaming invisible in P95 | Monitor ITL (inter-token latency) variance |
| 21 | **Synchronous Reranker** | Reranker blocks context assembly | 200–500ms added to every RAG query | Async reranking; consider bi-encoder for P95 |
| 22 | **LLM as Classifier** | Using full LLM to classify/route simple queries | 300–800ms TTFT for a task that needs 10ms | Fine-tuned classifier or keyword router for simple cases |
| 23 | **No Budget Enforcement in CI** | Performance budgets defined but not enforced | Regressions ship unnoticed | k6 thresholds in CI pipeline |
| 24 | **Single-Threaded Tool Executor** | Tool executor processes calls sequentially | Fan-out blocked; multiplies tool latency | Async executor with concurrency controls |
