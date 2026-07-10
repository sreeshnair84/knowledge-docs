---
title: "Reliability Engineering for Agentic Applications"
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

# Reliability Engineering for Agentic Applications

A comprehensive engineering reference for Enterprise Architects and AI Platform Teams designing production-grade reliability for agentic UIs and agent runtimes — covering SLO frameworks, fault tolerance patterns, saga orchestration, streaming recovery, and chaos engineering.

:::note Related Guides
    - Observability instrumentation (OTel GenAI spans, burn rate dashboards): [`../enterprise-architecture/ai-architecture/agentic-ai-reliability-observability-governance.md`](../enterprise-architecture/ai-architecture/agentic-ai-reliability-observability-governance.md)
    - HITL gates and escalation architecture: [`../enterprise-architecture/ai-architecture/enterprise-ai-architecture-patterns.md`](../enterprise-architecture/ai-architecture/enterprise-ai-architecture-patterns.md)
    - AI Gateway circuit breaker configuration: [`../cloud-platforms/ai-gateway/kong-ai-gateway-guide.md`](../cloud-platforms/ai-gateway/kong-ai-gateway-guide.md)

---

## 1. Why Agentic Reliability Is Fundamentally Different

Traditional web application reliability engineering operates on a foundation of stateless HTTP request-response pairs. Each request is independent, failures are local, and retries are safe by default. Agentic applications break every one of these assumptions.

### 1.1 The Five Dimensions of Agentic Unreliability

| Dimension | Traditional App | Agentic App | Reliability Impact |
|-----------|----------------|-------------|-------------------|
| **Determinism** | Same input → same output | Same input → different output each call | Cannot rely on retry producing correct result |
| **State** | Stateless per-request | Stateful conversation, multi-turn history | Failure mid-conversation corrupts or orphans state |
| **Duration** | Milliseconds to seconds | Seconds to minutes per task | More exposure window; heartbeat + checkpoint required |
| **Dependency graph** | 2–3 hops (DB, cache) | 5–15 hops (LLM, tools, memory, reranker, guardrails) | Cascading failure probability compounds multiplicatively |
| **Failure semantics** | Error codes are definitive | LLM returns 200 OK with wrong answer | Semantic failures invisible to infrastructure monitors |

### 1.2 The Compound Failure Probability Problem

With a single dependency at 99.9% availability, system availability is 99.9%. With eight dependencies each at 99.9%, system availability drops to 99.2% — two hours of downtime per month. Agentic applications commonly chain 8–15 components:

```text
User → UI → AG-UI Gateway → Agent Orchestrator → LLM Provider
                                               → Tool Executor → Tool API
                                               → Memory Service → Vector DB
                                               → Guardrail Service
                                               → Reranker
```

At 99.9% per component, a 12-hop chain has theoretical availability of 98.8%. Engineering reliability in this environment requires defence in depth at every layer, not just endpoint monitoring.

### 1.3 Four Failure Classes That Require Different Machinery

| Failure Class | Trigger | Correct Response | Dangerous Incorrect Response |
|--------------|---------|-----------------|------------------------------|
| **Transport** | Network timeout, HTTP 429, DNS failure | Retry with exponential backoff + jitter, honour `Retry-After` | Blind retry without jitter (thundering herd) |
| **Semantic** | Bad reasoning, hallucinated tool args, wrong plan | Re-plan with different strategy or context | Retry with identical input (same wrong output) |
| **Systemic** | Provider outage, quota exhaustion | Failover to alternate provider; activate degradation ladder | Retry hoping outage resolves |
| **Safety/Policy** | Guardrail trip, policy violation, scope exceeded | Halt immediately; escalate to HITL | **Never retry-around** — converts contained event to incident |

:::warning The Safety Retry Anti-Pattern
    Retrying around a guardrail trip with a rephrased prompt is the highest-severity reliability engineering mistake in agentic systems. It converts a contained security event into an active security incident. Safety-class failures must halt and escalate — never retry.

### 1.4 Why Observability Is a Reliability Prerequisite

You cannot build error budgets, tune SLOs, or fire alerts on events you cannot see. Before implementing any reliability pattern in this guide, confirm that OpenTelemetry GenAI semantic conventions are instrumented across every component. See the companion guide for implementation: [`../enterprise-architecture/ai-architecture/agentic-ai-reliability-observability-governance.md`](../enterprise-architecture/ai-architecture/agentic-ai-reliability-observability-governance.md).

---

## 2. SLA/SLO/SLI Definitions for Agentic Applications

### 2.1 Terminology

| Term | Definition | Agentic-Specific Note |
|------|-----------|----------------------|
| **SLI** (Service Level Indicator) | A measurable signal of service behavior | Must include semantic quality signals, not just transport metrics |
| **SLO** (Service Level Objective) | Target threshold for an SLI | Set by product × reliability engineering jointly, not infrastructure alone |
| **SLA** (Service Level Agreement) | Contractual commitment to customer | Typically SLO minus a safety margin (10–20%) |
| **Error Budget** | SLO headroom before breach | 100% − SLO; the budget for experimentation and risk-taking |
| **Burn Rate** | Speed at which error budget is consumed | Alerts fire at 2× burn for fast consumption; 5× burn for slow consumption |

### 2.2 Availability SLOs by Workload Class

| Workload Class | Recommended Availability SLO | Rationale |
|----------------|------------------------------|-----------|
| Interactive chat (best-effort) | 99.5% | Latency tolerance high; graceful degradation acceptable |
| Interactive chat (business-critical) | 99.9% | Revenue-impacting; enterprise SLA expectation |
| Autonomous workflows (batch) | 99.5% | Async; retry at workflow level is acceptable |
| Autonomous workflows (real-time) | 99.9% | Blocks downstream processes |
| HITL-assisted workflows | 99.95% | Human waiting in queue; time-sensitive |
| Embedded agent in SaaS product | 99.95% | Customer-facing; affects NPS and revenue |
| Regulated financial / healthcare agent | 99.99% | Regulatory and contractual requirement |

### 2.3 Latency SLIs: Full Taxonomy

| SLI Name | Measurement Point | P50 Target | P95 Target | P99 Target | Alert Threshold |
|----------|------------------|-----------|-----------|-----------|-----------------|
| **TTFT** (Time to First Token) | Server-sent first SSE event | 600ms | 1,200ms | 2,500ms | P95 > 2,000ms for 5min |
| **Streaming Lag** | Gap between token generation and browser render | < 50ms | < 150ms | < 500ms | P99 > 500ms for 2min |
| **Tool Completion Latency** | Tool call start → result return | 300ms | 1,500ms | 5,000ms | Varies by tool |
| **End-to-End Task Latency** | User submit → task complete signal | 3s | 15s | 45s | P95 > 30s for 5min |
| **Context Assembly Time** | Start build context → context ready | 100ms | 400ms | 1,000ms | P95 > 600ms for 5min |
| **Memory Retrieval Latency** | Query sent → results ranked | 80ms | 250ms | 800ms | P95 > 500ms for 5min |
| **Guardrail Latency** | Input received → guardrail decision | 50ms | 200ms | 600ms | P95 > 400ms for 5min |
| **Planning Latency** | Plan request → plan ready | 800ms | 2,500ms | 6,000ms | P95 > 4,000ms for 5min |

### 2.4 Quality SLIs: Semantic Reliability

Quality SLIs measure whether the agent is producing correct, useful outputs — not whether it responded at all. These require evaluation pipelines, not just infrastructure monitoring.

| Quality SLI | Definition | Measurement Method | Target | Alert Threshold |
|-------------|-----------|-------------------|--------|-----------------|
| **Task Completion Rate** | % of tasks that reach a successful completion state | Automated judge + sampling | ≥ 92% | < 88% for 1hr |
| **Tool Success Rate** | % of tool calls that return valid, usable results | Tool call outcome tracking | ≥ 97% | < 94% for 15min |
| **Hallucination Rate** | % of responses containing factually incorrect claims | LLM judge evaluation on sample | < 3% | > 6% for 30min |
| **Context Faithfulness** | % of responses grounded in provided context | RAG faithfulness scorer | ≥ 90% | < 85% for 1hr |
| **Plan Success Rate** | % of multi-step plans that execute without replanning | Plan outcome tracking | ≥ 85% | < 78% for 1hr |
| **HITL Escalation Rate** | % of tasks escalated to human review | Escalation event count | 2–8% baseline | > 15% for 30min |
| **User Satisfaction (CSAT)** | Post-task satisfaction score | In-product survey | ≥ 4.0/5.0 | < 3.5 for 24hr |

### 2.5 Error Budget Calculation

```text
Error Budget Calculation:
─────────────────────────────────────────────────────────────
SLO Target: 99.9% availability over 30-day window

Total minutes in 30 days: 43,200
Error budget (minutes): 43,200 × (1 - 0.999) = 43.2 minutes
Error budget (seconds): 2,592 seconds

Current period:
  Downtime events: 18 minutes (25th: 8min, 27th: 10min)
  Error budget consumed: 18/43.2 = 41.7%
  Error budget remaining: 25.2 minutes
  Days remaining in period: 12

Burn rate today: (18 min used) / (18 of 30 days) = 1.0× normal
Projected end-of-period: 30 minutes used (69% of budget)
Status: WITHIN BUDGET — monitoring for acceleration
─────────────────────────────────────────────────────────────
```

### 2.6 Burn Rate Alert Configuration

| Alert Name | Condition | Window | Severity | Response |
|------------|-----------|--------|---------|---------|
| Fast Burn Critical | Burn rate > 14.4× (2% budget in 1hr) | 1 hour | P1 | Immediate on-call page |
| Fast Burn Warning | Burn rate > 6× (5% budget in 6hr) | 6 hours | P2 | Notify team lead |
| Slow Burn Warning | Burn rate > 3× (10% budget in 3 days) | 3 days | P3 | Review in next standup |
| Budget at 50% | 50% of error budget consumed | Rolling | P3 | Freeze non-essential deployments |
| Budget at 75% | 75% of error budget consumed | Rolling | P2 | Halt all feature changes |
| Budget Exhausted | 100% consumed | Rolling | P1 | Full feature freeze; incident declared |

### 2.7 Sample SLO Dashboard Specification

```yaml
# SLO Dashboard — Agentic Chat Service
dashboard:
  name: "Chat Agent SLO Health"
  refresh: 60s
  panels:

    - title: "Availability SLO (30-day rolling)"
      type: stat
      metric: "availability_slo_30d"
      target: 99.9
      thresholds: [99.5, 99.9]  # red, yellow, green
      link: /runbooks/availability

    - title: "Error Budget Remaining"
      type: gauge
      metric: "error_budget_remaining_pct"
      thresholds: [25, 50, 100]  # red below 25%, yellow 25-50%

    - title: "Burn Rate (1h, 6h, 3d)"
      type: timeseries
      metrics: ["burn_rate_1h", "burn_rate_6h", "burn_rate_3d"]
      alert_lines: [14.4, 6.0, 3.0]

    - title: "TTFT P50/P95/P99"
      type: timeseries
      metrics: ["ttft_p50", "ttft_p95", "ttft_p99"]
      targets: [600, 1200, 2500]  # ms

    - title: "Task Completion Rate (hourly)"
      type: timeseries
      metric: "task_completion_rate_1h"
      target: 0.92
      alert_line: 0.88

    - title: "Tool Success Rate by Tool"
      type: heatmap
      group_by: tool_name
      metric: tool_success_rate

    - title: "Hallucination Rate (sampled)"
      type: stat
      metric: "hallucination_rate_24h"
      target: 0.03
      alert_threshold: 0.06

    - title: "Active Circuit Breakers"
      type: stat
      metric: "circuit_breakers_open"
      alert_on_nonzero: true
```

---

## 3. Fault Tolerance Patterns

### 3.1 Circuit Breaker for LLM Providers

The circuit breaker prevents cascade failures when an LLM provider is degraded. It operates in three states: Closed (normal), Open (failing fast), and Half-Open (testing recovery).

```text
Circuit Breaker State Machine — LLM Provider

     ┌──────────────────────────────────────────────────────────────┐
     │                                                              │
     │   [CLOSED]              [OPEN]             [HALF-OPEN]       │
     │  Normal traffic      Fast-fail all        Probe with        │
     │  Monitor errors      Redirect to          limited traffic   │
     │                      fallback provider                      │
     │                                                              │
     │   threshold          timeout              probe count       │
     │   exceeded           expired              succeeded         │
     │   ─────────►         ─────────►           ─────────►        │
     │                                           [CLOSED]          │
     │                      probe count                           │
     │                      failed                                │
     │                      ─────────►           [OPEN]           │
     │                                                              │
     └──────────────────────────────────────────────────────────────┘

Configuration Parameters:
  failure_threshold:    5 consecutive failures → OPEN
  success_threshold:    3 consecutive successes (half-open) → CLOSED
  timeout:              30 seconds before OPEN → HALF-OPEN
  probe_request_limit:  5% of traffic in HALF-OPEN state
  fallback:             Route to secondary provider (e.g., GPT-4o if Claude fails)
```

=== "Python"
    ```python
    import asyncio
    import time
    from enum import Enum
    from dataclasses import dataclass, field
    from typing import Callable, Optional, Any
    import logging

    logger = logging.getLogger(__name__)

    class CircuitState(Enum):
        CLOSED = "closed"
        OPEN = "open"
        HALF_OPEN = "half_open"

    @dataclass
    class CircuitBreakerConfig:
        failure_threshold: int = 5
        success_threshold: int = 3
        timeout_seconds: float = 30.0
        half_open_max_calls: int = 3
        excluded_exceptions: tuple = ()  # Don't count auth errors as failures

    class LLMCircuitBreaker:
        def __init__(self, name: str, config: CircuitBreakerConfig):
            self.name = name
            self.config = config
            self.state = CircuitState.CLOSED
            self.failure_count = 0
            self.success_count = 0
            self.half_open_calls = 0
            self.last_failure_time: Optional[float] = None
            self._lock = asyncio.Lock()

        async def call(
            self,
            func: Callable,
            fallback: Optional[Callable] = None,
            *args,
            **kwargs
        ) -> Any:
            async with self._lock:
                if self.state == CircuitState.OPEN:
                    if self._should_attempt_reset():
                        self.state = CircuitState.HALF_OPEN
                        self.half_open_calls = 0
                        logger.info(f"Circuit {self.name}: OPEN → HALF_OPEN")
                    else:
                        if fallback:
                            logger.warning(f"Circuit {self.name} OPEN — using fallback")
                            return await fallback(*args, **kwargs)
                        raise CircuitOpenError(f"Circuit {self.name} is OPEN")

                if self.state == CircuitState.HALF_OPEN:
                    if self.half_open_calls >= self.config.half_open_max_calls:
                        raise CircuitOpenError(f"Circuit {self.name} HALF_OPEN probe limit reached")
                    self.half_open_calls += 1

            try:
                result = await func(*args, **kwargs)
                await self._on_success()
                return result
            except Exception as e:
                if not isinstance(e, self.config.excluded_exceptions):
                    await self._on_failure()
                raise

        async def _on_success(self):
            async with self._lock:
                if self.state == CircuitState.HALF_OPEN:
                    self.success_count += 1
                    if self.success_count >= self.config.success_threshold:
                        self.state = CircuitState.CLOSED
                        self.failure_count = 0
                        self.success_count = 0
                        logger.info(f"Circuit {self.name}: HALF_OPEN → CLOSED (recovered)")
                elif self.state == CircuitState.CLOSED:
                    self.failure_count = 0  # Reset on success

        async def _on_failure(self):
            async with self._lock:
                self.failure_count += 1
                self.last_failure_time = time.monotonic()
                if self.state == CircuitState.HALF_OPEN:
                    self.state = CircuitState.OPEN
                    logger.warning(f"Circuit {self.name}: HALF_OPEN → OPEN (probe failed)")
                elif (self.state == CircuitState.CLOSED and
                      self.failure_count >= self.config.failure_threshold):
                    self.state = CircuitState.OPEN
                    logger.error(f"Circuit {self.name}: CLOSED → OPEN "
                                f"(failures: {self.failure_count})")

        def _should_attempt_reset(self) -> bool:
            if self.last_failure_time is None:
                return False
            return time.monotonic() - self.last_failure_time >= self.config.timeout_seconds

    class CircuitOpenError(Exception):
        pass
    ```

=== "TypeScript"
    ```typescript
    enum CircuitState \{
      CLOSED = 'closed',
      OPEN = 'open',
      HALF_OPEN = 'half_open',
    }

    interface CircuitBreakerConfig \{
      failureThreshold: number;
      successThreshold: number;
      timeoutMs: number;
      halfOpenMaxCalls: number;
    }

    const DEFAULT_CONFIG: CircuitBreakerConfig = \{
      failureThreshold: 5,
      successThreshold: 3,
      timeoutMs: 30_000,
      halfOpenMaxCalls: 3,
    };

    export class LLMCircuitBreaker \{
      private state: CircuitState = CircuitState.CLOSED;
      private failureCount = 0;
      private successCount = 0;
      private halfOpenCalls = 0;
      private lastFailureTime: number | null = null;

      constructor(
        private readonly name: string,
        private readonly config: CircuitBreakerConfig = DEFAULT_CONFIG
      ) {}

      async call<T>(
        fn: () => Promise<T>,
        fallback?: () => Promise<T>
      ): Promise<T> \{
        if (this.state === CircuitState.OPEN) \{
          if (this.shouldAttemptReset()) \{
            this.state = CircuitState.HALF_OPEN;
            this.halfOpenCalls = 0;
            console.info(`Circuit $\{this.name}: OPEN → HALF_OPEN`);
          } else \{
            if (fallback) \{
              console.warn(`Circuit $\{this.name} OPEN — using fallback`);
              return fallback();
            }
            throw new Error(`Circuit $\{this.name} is OPEN`);
          }
        }

        if (this.state === CircuitState.HALF_OPEN) \{
          if (this.halfOpenCalls >= this.config.halfOpenMaxCalls) \{
            throw new Error(`Circuit $\{this.name} HALF_OPEN probe limit reached`);
          }
          this.halfOpenCalls++;
        }

        try \{
          const result = await fn();
          this.onSuccess();
          return result;
        } catch (error) \{
          this.onFailure();
          throw error;
        }
      }

      private onSuccess(): void \{
        if (this.state === CircuitState.HALF_OPEN) \{
          this.successCount++;
          if (this.successCount >= this.config.successThreshold) \{
            this.state = CircuitState.CLOSED;
            this.failureCount = 0;
            this.successCount = 0;
            console.info(`Circuit $\{this.name}: HALF_OPEN → CLOSED`);
          }
        } else if (this.state === CircuitState.CLOSED) \{
          this.failureCount = 0;
        }
      }

      private onFailure(): void \{
        this.failureCount++;
        this.lastFailureTime = Date.now();
        if (this.state === CircuitState.HALF_OPEN) \{
          this.state = CircuitState.OPEN;
          console.warn(`Circuit $\{this.name}: HALF_OPEN → OPEN`);
        } else if (
          this.state === CircuitState.CLOSED &&
          this.failureCount >= this.config.failureThreshold
        ) \{
          this.state = CircuitState.OPEN;
          console.error(`Circuit $\{this.name}: CLOSED → OPEN`);
        }
      }

      private shouldAttemptReset(): boolean \{
        if (this.lastFailureTime === null) return false;
        return Date.now() - this.lastFailureTime >= this.config.timeoutMs;
      }
    }
    ```

### 3.2 Bulkhead Pattern

The bulkhead isolates LLM calls, tool calls, and UI rendering into separate thread/async pools so that a stuck tool call cannot block LLM streaming.

```text
Bulkhead Architecture — Agentic Runtime

┌─────────────────────────────────────────────────────────────┐
│                    Agent Orchestrator                        │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  LLM Pool   │  │  Tool Pool  │  │  UI Rendering Pool  │ │
│  │             │  │             │  │                     │ │
│  │ max: 20     │  │ max: 50     │  │  max: 100           │ │
│  │ queue: 100  │  │ queue: 200  │  │  queue: unlimited   │ │
│  │ timeout: 60s│  │ timeout: 30s│  │  timeout: 5s        │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│                                                             │
│  Pool exhaustion in Tool Pool → queue tool calls            │
│  Pool exhaustion in LLM Pool → degradation to Level 2       │
│  Pool exhaustion in UI Pool  → response buffering           │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Timeout Hierarchy

Timeouts must be nested: inner timeouts must be shorter than outer timeouts or the outer timeout can never fire.

| Timeout Type | Recommended Default | Scope | Behaviour on Expiry |
|-------------|-------------------|-------|---------------------|
| UI Response Timeout | 120s | Browser keeps connection alive | Display "still working" heartbeat |
| Agent Task Timeout | 300s | Max wall-clock time for a complete task | Task marked TIMEOUT; HITL escalation option |
| LLM API Call Timeout | 60s | Per LLM provider HTTP request | Circuit breaker increment; try fallback provider |
| Tool Call Timeout | 15–30s | Per individual tool execution | Tool result = `timeout_error`; plan replanning |
| Memory Retrieval Timeout | 3s | Vector DB query + reranking | Fall back to exact-match search |
| Guardrail Timeout | 2s | Input/output guardrail check | Fail open (configurable) or fail closed |
| Planning Timeout | 30s | Planner model response | Return partial plan; prompt user for clarification |

:::warning Timeout Nesting Violation
    If your tool call timeout (30s) equals your LLM call timeout (30s), both can expire simultaneously, making it impossible to determine which failed. Always set inner timeouts 20–40% shorter than outer timeouts.

---

## 4. Graceful Degradation Ladder

The degradation ladder defines the service behavior at each level of impairment. The goal is to always return some value to the user rather than returning an error.

### 4.1 Degradation Levels

| Level | Name | Conditions for Entry | Active Capabilities | UX Behavior |
|-------|------|---------------------|-------------------|-------------|
| **L1** | Full Agentic Mode | All systems nominal | All tools, memory, planning, streaming | Full interactive agent experience |
| **L2** | Reduced Tool Set | 1–2 non-critical tools unavailable | Core tools only; non-essential tools disabled | Agent continues; mentions it "cannot perform X right now" |
| **L3** | Read-Only Mode | Write tools unavailable; DB or external APIs degraded | Read-only tools (search, retrieve, summarize) | Agent explains it's in "read-only mode"; no mutations |
| **L4** | Static / Cached | LLM provider degraded; streaming unavailable | Last-known-good cached responses; FAQ lookup | Non-streaming text responses; "using cached information" banner |
| **L5** | Human Handoff | All AI capabilities unavailable; critical failures | Zero AI capabilities | Transfer to human queue; ETA displayed; context handed off |

### 4.2 Degradation Decision Criteria

```text
Degradation Decision Tree

START: New request received
  │
  ├── LLM circuit breaker OPEN?
  │     YES → Check fallback provider available?
  │           YES → Use fallback (stay L1 or demote to L2)
  │           NO  → Demote to L4 (cached responses)
  │
  ├── Tool availability check: > 50% tools unavailable?
  │     YES → Demote to L3 (read-only)
  │     NO  → Check non-critical tools only affected → L2
  │
  ├── Memory service unavailable?
  │     YES → Continue without long-term memory (L2 degraded)
  │     NO  → Continue normally
  │
  ├── Guardrail service unavailable?
  │     YES → Fail closed (halt agent; L5 if policy requires)
  │     NO  → Continue normally
  │
  └── All clear → L1 full agentic mode
```

### 4.3 UX Behavior at Each Level

| Level | UI Indicator | Message Pattern | Allow User Actions |
|-------|-------------|-----------------|-------------------|
| L1 | None (normal) | — | All |
| L2 | Yellow dot, tooltip on hover | "Some capabilities are temporarily limited." | All except unavailable tools |
| L3 | Amber banner | "Running in read-only mode. Changes require manual confirmation." | Read + explicit user-confirmed writes |
| L4 | Orange banner | "Responses may be based on recent cached information." | Read-only; no new tasks |
| L5 | Red banner + progress | "You're being connected to a human agent. Estimated wait: Xm." | View history; add context note |

### 4.4 Automatic Recovery

Degradation is not permanent. Recovery logic should:

1. Poll degraded services at increasing intervals (15s, 30s, 60s, 120s, 5min)
2. When a service recovers, promote to the next level up (not immediately to L1)
3. Soak at each intermediate level for at least 2 minutes before promoting further
4. Log all degradation transitions with duration, triggering condition, and recovery event

---

## 5. Retry Strategies

### 5.1 Exponential Backoff with Full Jitter

```python
import random
import asyncio
from typing import TypeVar, Callable, Awaitable

T = TypeVar("T")

async def retry_with_backoff(
    func: Callable[[], Awaitable[T]],
    max_attempts: int = 4,
    base_delay_ms: float = 200,
    max_delay_ms: float = 30_000,
    jitter: str = "full",   # "full", "equal", "decorrelated"
    retryable_exceptions: tuple = (TimeoutError, ConnectionError),
    non_retryable_exceptions: tuple = (ValueError, PermissionError),
) -> T:
    """
    Retry with exponential backoff. Uses full jitter to avoid
    synchronized retry storms from multiple callers.
    """
    delay_ms = base_delay_ms
    for attempt in range(max_attempts):
        try:
            return await func()
        except non_retryable_exceptions:
            raise  # Do not retry semantic or auth errors
        except retryable_exceptions as e:
            if attempt == max_attempts - 1:
                raise  # Exhausted all retries
            if jitter == "full":
                sleep_ms = random.uniform(0, delay_ms)
            elif jitter == "equal":
                sleep_ms = delay_ms / 2 + random.uniform(0, delay_ms / 2)
            else:  # decorrelated
                sleep_ms = min(max_delay_ms, random.uniform(base_delay_ms, delay_ms * 3))
            await asyncio.sleep(sleep_ms / 1000)
            delay_ms = min(delay_ms * 2, max_delay_ms)
    raise RuntimeError("Unreachable")
```

### 5.2 Retry Budget to Prevent Thundering Herd

A retry budget limits the fraction of requests that are retries at any given time, preventing a wave of failures from creating a larger wave of retries.

```python
import asyncio
from collections import deque
import time

class RetryBudget:
    """
    Token-bucket retry budget.
    Ensures retries never exceed budget_fraction of total requests.
    """
    def __init__(self, budget_fraction: float = 0.10, window_seconds: float = 60.0):
        self.budget_fraction = budget_fraction
        self.window_seconds = window_seconds
        self._request_times: deque = deque()
        self._retry_times: deque = deque()
        self._lock = asyncio.Lock()

    async def should_retry(self) -> bool:
        async with self._lock:
            now = time.monotonic()
            cutoff = now - self.window_seconds
            # Prune old entries
            while self._request_times and self._request_times[0] < cutoff:
                self._request_times.popleft()
            while self._retry_times and self._retry_times[0] < cutoff:
                self._retry_times.popleft()
            
            total = len(self._request_times) + 1  # +1 for current
            current_retry_rate = len(self._retry_times) / max(total, 1)
            
            if current_retry_rate >= self.budget_fraction:
                return False  # Budget exhausted
            return True

    async def record_request(self):
        async with self._lock:
            self._request_times.append(time.monotonic())

    async def record_retry(self):
        async with self._lock:
            self._retry_times.append(time.monotonic())
```

### 5.3 Retryable vs Non-Retryable Failures

| Category | Examples | Retry? | Action |
|----------|----------|--------|--------|
| **Transport — Transient** | HTTP 429, 503, 504, network timeout | Yes | Backoff with jitter; honour `Retry-After` |
| **Transport — Permanent** | HTTP 400 (bad request), 404, 405 | No | Fix request before retrying |
| **Auth** | HTTP 401, 403 | No | Refresh token first; then single retry |
| **Semantic — Reasoning Failure** | Agent returns wrong answer | No (retry) | Re-plan with different strategy |
| **Semantic — Tool Arg Error** | Tool returns arg validation error | Conditional | Fix arg; retry once only |
| **Safety / Guardrail** | Guardrail block | Never | Halt and escalate |
| **Quota Exhaustion** | Provider daily quota exceeded | No | Failover to alternate provider |
| **Context Overflow** | Token limit exceeded | No | Compress context; retry |
| **Model Unavailable** | Model deprecated or overloaded | Conditional | Failover to equivalent model |
| **Idempotency Conflict** | Duplicate tool call detected | No | Return cached result from first call |

### 5.4 Idempotency Keys for Tool Calls

Tool calls that cause side effects (database writes, email sends, file creation) must use idempotency keys to prevent duplicate execution on retry.

```python
import hashlib
import json
from datetime import datetime, timedelta
from typing import Optional, Any

class IdempotencyStore:
    """
    Stores tool call results by idempotency key.
    Prevents duplicate side effects on retry.
    """
    def __init__(self, store):  # Redis or similar
        self.store = store
        self.ttl_hours = 24

    def generate_key(
        self,
        tool_name: str,
        tool_args: dict,
        session_id: str,
        call_index: int
    ) -> str:
        """
        Idempotency key is deterministic from: session + call_index + tool + args.
        call_index prevents two different calls to the same tool in the same session
        from sharing a key.
        """
        content = json.dumps({
            "session": session_id,
            "index": call_index,
            "tool": tool_name,
            "args": tool_args,
        }, sort_keys=True)
        return f"idem:{hashlib.sha256(content.encode()).hexdigest()[:16]}"

    async def get_or_execute(
        self,
        key: str,
        executor: callable,
        *args,
        **kwargs
    ) -> Any:
        cached = await self.store.get(key)
        if cached:
            return json.loads(cached)  # Return cached result on retry
        result = await executor(*args, **kwargs)
        await self.store.setex(
            key,
            int(timedelta(hours=self.ttl_hours).total_seconds()),
            json.dumps(result)
        )
        return result
```

---

## 6. Checkpoint and Recovery

### 6.1 What to Checkpoint and When

| Checkpoint Type | What to Save | Trigger | Storage | Retention |
|----------------|-------------|---------|---------|-----------|
| **Turn Checkpoint** | User message + agent response + tool calls | Every conversation turn | Redis (hot) | 24 hours |
| **Step Checkpoint** | Individual agent action + state before/after | Every tool call | Redis + DB | 7 days |
| **Plan Checkpoint** | Current plan + completed steps + remaining steps | After planning phase | DB | Task lifetime |
| **Context Snapshot** | Full assembled context at inference time | Per LLM call (sampled) | Object storage | 30 days |
| **Session Checkpoint** | Session metadata, user ID, task queue | On session start/end | DB | 90 days |
| **Streaming Position** | Last SSE event ID sent to client | Per event | Redis | 1 hour |

### 6.2 Checkpoint Schema

```python
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Optional
import uuid

@dataclass
class AgentStepCheckpoint:
    checkpoint_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str = ""
    task_id: str = ""
    step_number: int = 0
    created_at: datetime = field(default_factory=datetime.utcnow)
    
    # State
    plan: dict = field(default_factory=dict)          # Current plan
    completed_steps: list = field(default_factory=list)  # Completed steps
    remaining_steps: list = field(default_factory=list)  # Remaining steps
    tool_results: dict = field(default_factory=dict)  # Accumulated tool results
    
    # Context
    conversation_history: list = field(default_factory=list)
    user_preferences: dict = field(default_factory=dict)
    
    # Metadata
    last_tool_call: Optional[dict] = None
    last_tool_result: Optional[Any] = None
    error_count: int = 0
    last_error: Optional[str] = None
    
    # Recovery
    is_terminal: bool = False
    recovery_attempts: int = 0
    idempotency_keys_used: list = field(default_factory=list)
```

### 6.3 Workflow Resumption Sequence

```text
Workflow Resumption After Failure

Client              Gateway           Orchestrator         Store
  │                    │                   │                  │
  │  Reconnect(session_id, last_event_id)  │                  │
  │──────────────────►│                   │                  │
  │                   │  Load checkpoint  │                  │
  │                   │──────────────────►│                  │
  │                   │                   │ GetCheckpoint    │
  │                   │                   │─────────────────►│
  │                   │                   │  checkpoint      │
  │                   │                   │◄─────────────────│
  │                   │                   │                  │
  │                   │  Resume from step N                  │
  │                   │◄──────────────────│                  │
  │ Replay events since last_event_id     │                  │
  │◄──────────────────│                   │                  │
  │                   │                   │                  │
  │                   │  Continue execution from step N      │
  │                   │──────────────────►│                  │
  │  Stream remaining steps               │                  │
  │◄──────────────────│◄──────────────────│                  │
```

### 6.4 Streaming Session Recovery

```text
SSE Session Recovery with Last-Event-ID

Client                      SSE Gateway                  Agent
  │                              │                          │
  │  GET /stream/session-123     │                          │
  │  Last-Event-ID: evt-0042     │                          │
  │────────────────────────────►│                          │
  │                              │  Lookup: session-123    │
  │                              │  Replay events 43..N    │
  │  200 OK + buffered replay    │                          │
  │◄────────────────────────────│                          │
  │  event: evt-0043 (replayed) │                          │
  │◄────────────────────────────│                          │
  │  event: evt-0044 (replayed) │                          │
  │◄────────────────────────────│                          │
  │  event: evt-0045 (live)     │◄─────────────────────────│
  │◄────────────────────────────│                          │
  │  [streaming continues live] │                          │

SSE Event format with ID:
  id: evt-0043
  event: token
  data: {"token": "The", "index": 43, "session": "session-123"}
```

---

## 7. Saga Patterns for Multi-Tool Workflows

### 7.1 Choreography vs Orchestration Sagas

| Aspect | Choreography Saga | Orchestration Saga |
|--------|-------------------|-------------------|
| **Control** | Distributed — each tool publishes events; next tool subscribes | Centralized — orchestrator directs each tool call |
| **Coupling** | Low — tools independent | Higher — tools depend on orchestrator |
| **Visibility** | Hard to trace end-to-end flow | Easy to trace; single execution log |
| **Failure handling** | Each tool handles own compensation; complex coordination | Orchestrator handles all compensation; simpler |
| **Scalability** | High — independent scaling | Orchestrator becomes bottleneck at scale |
| **Best for** | Loosely coupled, event-driven pipelines | Complex, sequential agent workflows |
| **Recommended for agentic UI** | Background data pipelines | Interactive agent tasks |

### 7.2 Compensation Actions

Every tool call that causes side effects must have a defined compensation (rollback) action.

| Tool Call | Side Effect | Compensation Action | Compensation Safety |
|-----------|------------|---------------------|---------------------|
| `create_file` | File created in object store | `delete_file(file_id)` | Safe to retry |
| `send_email` | Email sent | Cannot unsend — log compensation failure | Requires deduplication |
| `write_database` | Row inserted/updated | `rollback_transaction(tx_id)` | Idempotent |
| `create_ticket` | Ticket created in Jira/ServiceNow | `cancel_ticket(ticket_id)` | Safe to retry |
| `schedule_meeting` | Meeting scheduled | `cancel_meeting(meeting_id)` | Safe to retry |
| `charge_payment` | Payment charged | `refund_payment(charge_id)` | External API; log if fails |
| `deploy_artifact` | Deployment triggered | `rollback_deployment(deploy_id)` | Complex; may require manual |
| `provision_resource` | Cloud resource created | `deprovision_resource(resource_id)` | Async; may take minutes |

### 7.3 Saga Rollback Sequence

```text
Saga Rollback — Multi-Tool Workflow Failure at Step 4

Step 1: create_ticket    ─── SUCCESS ─── compensation: cancel_ticket(T-001)
Step 2: fetch_data       ─── SUCCESS ─── compensation: (read-only, no compensation)
Step 3: write_database   ─── SUCCESS ─── compensation: rollback_transaction(TX-007)
Step 4: send_notification ── FAILURE ─── (no side effect yet)
Step 5: create_report    ─── NOT REACHED

ROLLBACK SEQUENCE (reverse order):
  4. send_notification → failed; no compensation needed
  3. rollback_transaction(TX-007) → SUCCESS
  2. fetch_data → read-only; skip
  1. cancel_ticket(T-001) → SUCCESS

Final state: Clean rollback achieved.
Log: saga_id=s-xyz, failed_at=step_4, rollback_status=complete
```

### 7.4 Dead Letter Queue Pattern

```text
Tool Call Dead Letter Queue Architecture

Agent ──► Tool Queue ──► Tool Executor
                │               │
                │               ▼ FAILURE (3 attempts)
                │         ┌──────────────┐
                │         │   DLQ        │
                │         │  (24hr TTL)  │
                │         └──────────────┘
                │               │
                │               ▼
                │    ┌─────────────────────┐
                │    │  DLQ Processor       │
                │    │  • Log failure        │
                │    │  • Notify operations  │
                │    │  • Offer manual retry │
                │    │  • Compensate saga    │
                │    └─────────────────────┘
                │
                └──► Saga orchestrator notified of DLQ entry
                     → trigger compensation sequence
```

---

## 8. Conversation Recovery

### 8.1 Mid-Conversation Failure Recovery Sequence

```text
Mid-Conversation Recovery

User     Browser        Gateway        Orchestrator       Store
 │           │              │               │               │
 │ [Types message]          │               │               │
 │──────────►│              │               │               │
 │           │  POST /chat  │               │               │
 │           │─────────────►│               │               │
 │           │              │  CreateTurn   │               │
 │           │              │──────────────►│               │
 │           │              │               │  SaveTurn     │
 │           │              │               │──────────────►│
 │           │              │               │               │
 │           │              │               │ [LLM TIMEOUT] │
 │           │              │               │               │
 │           │              │               │  LoadCheckpoint│
 │           │              │               │──────────────►│
 │           │              │               │  checkpoint   │
 │           │              │               │◄──────────────│
 │           │              │               │               │
 │           │              │               │  Retry with   │
 │           │              │               │  fallback LLM │
 │           │    SSE: partial_content      │               │
 │           │◄─────────────│◄──────────────│               │
 │  [Sees partial response]  │               │               │
 │◄──────────│              │               │               │
```

### 8.2 Session Expiry Handling

| Expiry Scenario | Detection | Recovery | User Experience |
|----------------|-----------|---------|-----------------|
| Idle timeout (< 30min) | Session TTL check | Resume from last turn checkpoint | "Resuming your conversation..." |
| Idle timeout (30–120min) | Session TTL check | Reload full session from DB | Brief loading state; full context restored |
| Idle timeout (> 2hr) | Session TTL check | Offer to summarize and restart | "Your session expired. Here's a summary of what we discussed." |
| Auth token expiry | 401 on next request | Silent token refresh + retry | Transparent (no UX interruption) |
| Server restart (rolling deploy) | Connection closed | Reconnect + replay from Last-Event-ID | Brief reconnecting indicator |
| Region failover | 503 on endpoint | Redirect to secondary region | 2–5s reconnect delay |

### 8.3 State Synchronization on Reconnect

```python
async def sync_state_on_reconnect(
    session_id: str,
    client_last_event_id: str,
    store: ConversationStore,
    stream: SSEStream
) -> None:
    """
    On client reconnect, replay any events the client missed
    since its last received event ID.
    """
    checkpoint = await store.load_checkpoint(session_id)
    if not checkpoint:
        await stream.send_event("error", {"code": "SESSION_NOT_FOUND"})
        return

    # Find events after last_event_id
    missed_events = await store.get_events_after(
        session_id=session_id,
        after_event_id=client_last_event_id,
        limit=1000  # Safety cap
    )

    # Replay missed events
    for event in missed_events:
        await stream.send_event(event.type, event.data, event_id=event.id)

    # Send current state snapshot
    await stream.send_event("state_sync", {
        "status": checkpoint.status,
        "current_step": checkpoint.step_number,
        "plan_summary": checkpoint.plan.get("summary", ""),
    })
```

---

## 9. Streaming Reliability

### 9.1 SSE Reconnect with Last-Event-ID

```text
SSE Reconnect Protocol

Browser                         Server
  │                               │
  │  GET /stream (EventSource)    │
  │──────────────────────────────►│
  │  200 OK; text/event-stream    │
  │◄──────────────────────────────│
  │                               │
  │  id: 001                      │
  │  data: {"token": "Hello"}     │
  │◄──────────────────────────────│
  │  id: 002                      │
  │  data: {"token": " world"}    │
  │◄──────────────────────────────│
  │                               │
  │  [network interruption]       │
  │  ...                          │
  │                               │
  │  GET /stream                  │
  │  Last-Event-ID: 002           │
  │──────────────────────────────►│
  │                               │ Lookup: events after 002
  │  id: 003 (replayed)           │
  │  data: {"token": " from"}     │
  │◄──────────────────────────────│
  │  id: 004 (live)               │
  │  data: {"token": " server"}   │
  │◄──────────────────────────────│

Server must:
  1. Assign monotonic IDs to every event
  2. Buffer last N events per session (default: last 60 seconds)
  3. Send retry: <ms> directive to control reconnect intervals
  4. Flush ':keepalive' comments every 15s to prevent proxy timeouts
```

### 9.2 Backpressure in Streaming Pipelines

```text
Streaming Backpressure Architecture

LLM Provider ──tokens──► Token Buffer ──► Formatter ──► SSE Writer ──► Client
                                              │
                           If buffer > 80%   │
                           → pause LLM read  │
                           (flow control)    │
                                              │
                           If client slow:   │
                           → drop keepalives │
                           → not tokens      │
```

Backpressure implementation rules:

1. **Never drop tokens** — only drop keepalive / heartbeat events
2. **Buffer tokens** — maintain a per-session buffer; if buffer exceeds threshold, apply upstream backpressure
3. **Monitor buffer depth** — alert if buffer depth > 60% of max for > 30 seconds
4. **Client-side flow control** — AG-UI protocol `pause_stream` / `resume_stream` messages from client

### 9.3 Partial Content Recovery

When a stream is interrupted mid-response, partial content must be handled gracefully:

| Scenario | Detection | Recovery Strategy |
|----------|-----------|------------------|
| Stream interrupted mid-sentence | Client received partial `delta` events without `done` | On reconnect, replay missing events; merge with partial |
| Stream interrupted mid-tool-call | `tool_call_start` received; no `tool_call_result` | Re-execute tool call with idempotency key |
| Stream interrupted during thinking | `thinking` block incomplete | Discard incomplete thinking block; restart from last turn checkpoint |
| SSE connection lost (no Last-Event-ID) | Fresh connection after error | Fall back to REST polling endpoint for task status |

---

## 10. Offline Support

### 10.1 Local State Caching Strategy

| Cache Type | Storage Mechanism | Scope | TTL | Eviction Policy |
|------------|-----------------|-------|-----|-----------------|
| Conversation history | IndexedDB | Session | 7 days | LRU per session |
| User preferences | localStorage | User | Permanent | Manual clear |
| Tool response cache | IndexedDB | Session | 1 hour | TTL expiry |
| Draft messages | sessionStorage | Tab | Session end | Auto-clear |
| Static UI assets | Service Worker cache | Global | Deploy cycle | Network-first |
| Agent output cache | IndexedDB | Session | 30 min | LRU |

### 10.2 Optimistic Updates with Rollback

```typescript
// Optimistic update pattern for agentic UI
interface OptimisticAction {
  id: string;
  type: string;
  payload: unknown;
  rollbackPayload: unknown;
  timestamp: number;
}

class OptimisticUpdateManager {
  private pending = new Map<string, OptimisticAction>();

  applyOptimistic(action: OptimisticAction, applyFn: (p: unknown) => void): void {
    this.pending.set(action.id, action);
    applyFn(action.payload);  // Immediately update UI
  }

  confirm(actionId: string): void {
    this.pending.delete(actionId);  // Server confirmed; discard rollback
  }

  rollback(actionId: string, rollbackFn: (p: unknown) => void): void {
    const action = this.pending.get(actionId);
    if (action) {
      rollbackFn(action.rollbackPayload);  // Revert UI to previous state
      this.pending.delete(actionId);
    }
  }
}
```

### 10.3 Queue-and-Sync Pattern

When the client is offline, queue user requests locally and sync when connectivity is restored:

```text
Queue-and-Sync Flow

User (offline) → Request queued in IndexedDB
                 → UI shows "Will send when online"
                 
Network restored → Service Worker: flush queue
                 → POST each queued request in order
                 → Handle conflicts (server state may have changed)
                 → Update UI with server responses
                 
Conflict resolution:
  • Read-only requests: always safe to replay
  • Write requests: use idempotency key + last-write-wins or user prompt
  • Stale context: warn user that context was assembled while offline
```

---

## 11. Multi-Region Reliability

### 11.1 Active-Active vs Active-Passive

| Architecture | Active-Active | Active-Passive |
|-------------|--------------|----------------|
| **Traffic distribution** | All regions serve traffic | Primary serves all; secondary on standby |
| **Failover time** | Seconds (load balancer reroute) | Minutes (DNS change + warm-up) |
| **State complexity** | High — state must be replicated across regions | Low — single authoritative primary |
| **Cost** | 2× active infrastructure | 1.5× (passive region has reduced capacity) |
| **RPO** | Near-zero (data already in all regions) | Minutes (last replication lag) |
| **RTO** | Seconds | 2–10 minutes |
| **Best for** | High-traffic consumer apps; < 200ms latency required | Enterprise SaaS; cost-sensitive; data residency constraints |
| **Agentic session continuity** | Complex — session state must follow user | Simple — always reconnect to primary |

### 11.2 Session Affinity and Geo-Routing

```text
Multi-Region Routing Decision

Incoming Request
      │
      ▼
 Global Load Balancer (e.g., AWS Global Accelerator, Azure Front Door)
      │
      ├── Has existing session cookie?
      │     YES → Route to session's home region (sticky affinity)
      │     NO  → Continue
      │
      ├── Apply geo-routing (latency-based)
      │     → US-EAST (< 20ms)  ← East coast users
      │     → EU-WEST (< 20ms)  ← European users
      │     → AP-SOUTH (< 30ms) ← APAC users
      │
      └── Home region degraded?
            YES → Drain sessions → failover to secondary
                  → Replicate active checkpoints to secondary
            NO  → Serve from home region
```

### 11.3 State Replication Strategy

| State Type | Replication Method | RPO | Consistency Model |
|------------|-------------------|-----|-------------------|
| Conversation checkpoints | Async replication (Redis Streams) | < 5s | Eventual |
| User preferences | Synchronous write (primary + immediate replication) | 0 | Strong |
| Session metadata | Async replication | < 2s | Eventual |
| Tool idempotency cache | Sync write to primary; read from any region | 0 (primary) | Primary-preferred reads |
| Vector memory index | Pre-computed; deployed as snapshot | Per-deploy | Snapshot |
| Authentication tokens | Multi-region KV (e.g., DynamoDB Global Tables) | < 1s | Eventual |

---

## 12. Chaos Engineering for Agentic Systems

### 12.1 Chaos Test Catalog

| Experiment | Failure Mode | Hypothesis | Success Criteria |
|------------|-------------|-----------|-----------------|
| **LLM Provider Timeout** | Inject 30s delay on all LLM calls | System degrades to L2 and uses fallback provider | TTFT degrades gracefully; no 500 errors to user |
| **Tool Failure Injection** | 50% failure rate on `search_web` tool | Agent replans using alternate information sources | Task completion rate drops < 15%; no crashes |
| **Context Overflow Stress** | Force context to 95% of max token budget | Context compression activates; response quality maintained | No silent truncation of system prompt; latency < 2× baseline |
| **Streaming Interruption** | Drop SSE connection every 30 seconds | Client reconnects and replays; no message loss | Zero message loss; reconnect time < 3s |
| **Memory Service Outage** | Take vector DB offline | Agent operates without long-term memory; quality degraded but functional | No crashes; user informed; session memory still works |
| **Guardrail Service Slow** | Inject 5s latency on guardrail checks | Agent does not bypass guardrail; waits or fails safely | No unguarded LLM calls; latency acceptable |
| **Cascading Tool Failure** | Fail 3 of 5 tools simultaneously | Agent activates degradation ladder L3 (read-only) | Correct degradation level reached within 10s |
| **Region Failover** | Kill primary region instances | Traffic rerouted to secondary; checkpoints available | RTO < 3 min; conversation history preserved |
| **Token Rate Limit Spike** | Exhaust provider token-per-minute limit | Circuit breaker opens; queued requests wait | No user-facing errors for first 2min; degraded after |
| **DLQ Overflow** | Overwhelm dead letter queue processor | DLQ drains in order; compensation executes correctly | No lost compensations; alerts fire |

### 12.2 Failure Injection Framework

```python
# Chaos engineering middleware for agentic runtime
import random
import asyncio
from dataclasses import dataclass
from typing import Optional

@dataclass
class ChaosConfig:
    enabled: bool = False
    environment: str = "staging"  # Only enable in non-production
    experiments: dict = None

class ChaosMiddleware:
    """
    Inject controlled failures into the agentic runtime.
    MUST only be enabled in staging/canary environments.
    """
    def __init__(self, config: ChaosConfig):
        assert config.environment != "production", \
            "FATAL: Chaos middleware must not run in production"
        self.config = config

    async def maybe_inject(self, component: str, **kwargs):
        if not self.config.enabled:
            return
        experiment = (self.config.experiments or {}).get(component)
        if not experiment:
            return

        fault_type = experiment.get("type")
        probability = experiment.get("probability", 0.0)

        if random.random() > probability:
            return  # No fault this time

        if fault_type == "timeout":
            delay = experiment.get("delay_seconds", 30)
            await asyncio.sleep(delay)
            raise TimeoutError(f"CHAOS: Injected timeout for {component}")

        elif fault_type == "error":
            error_class = experiment.get("error_class", "RuntimeError")
            raise RuntimeError(f"CHAOS: Injected error for {component}")

        elif fault_type == "slow":
            delay = experiment.get("delay_seconds", 5)
            await asyncio.sleep(delay)
            # Continue normally but slowly
```

### 12.3 Recovery Validation Playbook

For each chaos experiment, run the following validation sequence:

1. **Baseline measurement** — record P50/P95/P99 latency, task completion rate, error rate for 10 minutes
2. **Inject fault** — activate the chaos experiment
3. **Observe degradation** — verify that degradation matches hypothesis (correct level, correct UX)
4. **Measure recovery signals** — how long until circuit breaker opens, degradation ladder activates
5. **Remove fault** — deactivate chaos experiment
6. **Observe recovery** — verify system returns to L1 within expected time
7. **Post-experiment analysis** — compare baseline vs fault vs recovery metrics; document gaps

---

## 13. Error Budget Management

### 13.1 Error Budget Policy

| Budget Remaining | Engineering Stance | Allowed Activities | Prohibited Activities |
|-----------------|------------------|--------------------|-----------------------|
| > 75% | Feature velocity | All releases; A/B experiments; infrastructure changes | None |
| 50–75% | Normal caution | All releases with standard review | Risky infra migrations |
| 25–50% | Elevated caution | Features only with enhanced testing | Non-critical infra changes |
| 10–25% | Reliability focus | Bug fixes and reliability improvements only | New features; experiments |
| 0–10% | Reliability emergency | Hotfixes and rollbacks only | All new deployments |
| Exhausted | Feature freeze | Reliability remediation only | All feature work until recovered |

### 13.2 Automatic Feature Freeze Triggers

```yaml
# AlertManager rules for error budget enforcement
groups:
  - name: error_budget
    rules:
      - alert: ErrorBudgetFastBurn
        expr: |
          (
            1 - (
              sum(rate(http_requests_total{status!~"5.."}[1h]))
              / sum(rate(http_requests_total[1h]))
            )
          ) / (1 - 0.999) > 14.4
        for: 2m
        labels:
          severity: critical
          action: feature_freeze
        annotations:
          summary: "Fast burn: error budget consumed at 14.4× rate"
          runbook: "https://runbooks.internal/error-budget-fast-burn"

      - alert: ErrorBudgetSlowBurn
        expr: |
          (
            1 - (
              sum(rate(http_requests_total{status!~"5.."}[6h]))
              / sum(rate(http_requests_total[6h]))
            )
          ) / (1 - 0.999) > 6
        for: 15m
        labels:
          severity: warning
          action: deployment_pause
        annotations:
          summary: "Slow burn: error budget consumed at 6× rate"
```

### 13.3 Error Budget Recovery Plan

When the error budget is exhausted, the following recovery sequence applies:

1. **Declare reliability incident** — all stakeholders notified; feature work halted
2. **Root cause analysis** — identify the highest-impact error sources (Pareto: top 3 causes typically account for 80% of errors)
3. **Reliability sprint** — dedicated sprint for fixes; no new features
4. **Canary validation** — fixes deployed to canary (5% traffic) for 48 hours before full rollout
5. **Budget recovery confirmation** — require 72 hours of nominal burn rate before lifting freeze
6. **Post-mortem** — document causes, fixes, and process changes to prevent recurrence

---

## 14. Reliability Scorecard Template

Score each dimension 0–5 (0 = not implemented; 3 = partially implemented; 5 = fully implemented with monitoring and runbooks).

| # | Reliability Dimension | Score (0–5) | Evidence | Priority |
|---|----------------------|-------------|---------|---------|
| 1 | SLO defined for all critical paths | | | |
| 2 | SLI measurement automated and dashboarded | | | |
| 3 | Error budget calculated and tracked | | | |
| 4 | Burn rate alerts configured (fast + slow) | | | |
| 5 | Circuit breaker on LLM provider(s) | | | |
| 6 | Circuit breaker on all external tool APIs | | | |
| 7 | Bulkhead isolation (LLM pool / tool pool / UI pool) | | | |
| 8 | Timeout hierarchy defined and enforced | | | |
| 9 | Graceful degradation ladder implemented (5 levels) | | | |
| 10 | Retry strategy: backoff + jitter + budget | | | |
| 11 | Idempotency keys on all write-side tool calls | | | |
| 12 | Step-level checkpointing for agent tasks | | | |
| 13 | Streaming reconnect with Last-Event-ID | | | |
| 14 | Conversation history persisted (turn-level) | | | |
| 15 | Saga compensation actions defined for all tools | | | |
| 16 | Dead letter queue for failed tool calls | | | |
| 17 | Chaos test suite (≥ 5 experiments run quarterly) | | | |
| 18 | Multi-region failover tested (RTO validated) | | | |
| 19 | Offline mode / service worker caching | | | |
| 20 | Incident runbook published and rehearsed | | | |

**Scoring Guidance:**

| Total Score | Maturity Level | Recommended Action |
|-------------|---------------|-------------------|
| 0–40 | Initial | Focus on SLOs, circuit breakers, and checkpointing first |
| 41–60 | Developing | Implement retry budgets, saga patterns, chaos tests |
| 61–80 | Defined | Tune multi-region, streaming recovery, offline support |
| 81–90 | Managed | Automate error budget policies; run quarterly game days |
| 91–100 | Optimizing | Continuous chaos engineering; predictive degradation |

---

## 15. Incident Response Runbook

### 15.1 Agentic System Incident Classification

| Severity | Criteria | Response Time | Escalation |
|----------|---------|---------------|-----------|
| **SEV-1** | Total agent unavailability; data loss; safety guardrail bypassed | 5 minutes | On-call engineer + team lead + VP Engineering |
| **SEV-2** | > 50% task failure rate; > 5min TTFT for all users; LLM provider down | 15 minutes | On-call engineer + team lead |
| **SEV-3** | Degraded mode active; quality SLI breach; > 20% tool failure rate | 1 hour | On-call engineer |
| **SEV-4** | Elevated error rate; single-user bug; performance regression | Next business day | Engineering team standup |

### 15.2 SEV-1 Runbook: Total Agent Unavailability

```text
INCIDENT RUNBOOK: SEV-1 — Total Agent Unavailability
═══════════════════════════════════════════════════════

DETECTION:
  • PagerDuty alert: ErrorBudgetFastBurn (circuit breaker count ≥ 3)
  • User reports: "agent not responding"
  • Availability SLO panel: red

STEP 1 — TRIAGE (0–5 min):
  □ Check status dashboard: which components are red?
  □ Check LLM provider status pages (Anthropic, OpenAI status URLs)
  □ Check circuit breaker states: GET /internal/circuit-breakers
  □ Check error logs: last 50 errors from agent orchestrator
  □ Determine: infrastructure failure OR provider failure OR code regression?

STEP 2 — IMMEDIATE MITIGATION (5–15 min):
  If provider failure:
    □ Enable fallback provider in AI Gateway config
    □ Verify fallback circuit breaker is CLOSED
    □ Monitor: task completion rate should recover within 2 min
  
  If code regression (recent deploy):
    □ Roll back last deploy: kubectl rollout undo deploy/agent-orchestrator
    □ Verify rollback completes: kubectl rollout status deploy/agent-orchestrator
    □ Monitor error rate for 5 min
  
  If infrastructure failure:
    □ Activate degradation Level 5 (human handoff mode)
    □ Notify customer success team: users being routed to human agents
    □ Escalate to infrastructure on-call

STEP 3 — COMMUNICATION (within 15 min):
  □ Post to #incidents Slack: SEV-1 declared, impact, mitigation in progress
  □ Update status page: "We are aware of issues affecting the AI assistant"
  □ Internal stakeholder update every 30 min

STEP 4 — RESOLUTION:
  □ Confirm error rate below SLO threshold for 10 consecutive minutes
  □ Confirm task completion rate ≥ 92% for 10 minutes
  □ Confirm no circuit breakers open
  □ Lift degradation mode
  □ Post resolution to status page

STEP 5 — POST-MORTEM:
  □ Timeline written within 24 hours
  □ Root cause identified
  □ Action items assigned with owners and due dates
  □ Runbook updated with learnings
```

### 15.3 SEV-2 Runbook: LLM Provider Degraded

```text
INCIDENT RUNBOOK: SEV-2 — LLM Provider Degraded
═════════════════════════════════════════════════

DETECTION:
  • TTFT P95 > 5s for 5+ minutes
  • Tool success rate for LLM-dependent tools < 80%
  • Circuit breaker for primary LLM provider: OPEN

IMMEDIATE ACTIONS:
  1. Check AI Gateway circuit breaker status
  2. Verify fallback model configured in gateway routing rules
  3. If fallback not available: activate degradation L4
  4. Post to #incidents: "LLM provider degraded; fallback active"
  5. Monitor: task quality on fallback model (may differ from primary)

RECOVERY:
  1. Primary provider recovers: circuit breaker moves HALF_OPEN
  2. Monitor for 10 probe requests before closing
  3. Gradually shift traffic back: 10% → 25% → 50% → 100% over 20 min
  4. Remove fallback routing rule after 30 min of stability
```

---

## 16. Reliability Anti-Patterns

| # | Anti-Pattern | Description | Impact | Correct Pattern |
|---|-------------|-------------|--------|-----------------|
| 1 | **Unbounded Retry Loop** | Agent retries indefinitely on the same failing step | Cost explosion; thundering herd | Retry budget ≤ 10%; 3-strike halt rule |
| 2 | **Safety Bypass Retry** | Rephrasing prompt to get around guardrail block | Security incident | Halt and escalate on any safety block |
| 3 | **Semantic Failure as Transport Retry** | Retrying same prompt after bad reasoning | Same wrong output | Detect failure class; re-plan for semantic failures |
| 4 | **Silent Context Truncation** | Dropping earlier context without telling the model | Agent forgets constraints; inconsistent decisions | Explicit context budget management; compression triggers |
| 5 | **Fan-Out Retry Storm** | Multiple sub-agents retry independently on shared provider | 10–100× provider load amplification | Centralized retry budget at gateway |
| 6 | **Timeout Nesting Violation** | Inner timeout ≥ outer timeout | Both expire simultaneously; unclear failure source | Inner timeout = 60–80% of outer timeout |
| 7 | **Missing Idempotency Keys** | Write-side tool calls retried without deduplication | Duplicate emails, double charges, duplicate records | Idempotency keys on all write operations |
| 8 | **Checkpoint Skipping** | No step-level checkpoints for long tasks | Task lost on crash; no recovery path | Checkpoint after every tool call |
| 9 | **Missing Compensation** | Saga has no rollback actions defined | Inconsistent state after partial failure | Compensation action required for every side effect |
| 10 | **Circuit Breaker on Wrong Scope** | Single circuit breaker for all tools | One bad tool opens breaker; all tools fail | Per-tool circuit breakers |
| 11 | **Health Check Lying** | Health endpoint returns 200 even when degraded | Load balancer sends traffic to unhealthy instance | Deep health checks (LLM reachable + tool reachable) |
| 12 | **No Graceful Degradation** | System returns 500 when any component fails | All-or-nothing failure; poor UX | Degradation ladder with partial functionality |
| 13 | **Full Context Reload on Reconnect** | Reloads entire conversation history on every reconnect | Latency spike; expensive | Replay only events since Last-Event-ID |
| 14 | **Synchronous Saga Rollback** | Blocking rollback of 10+ tool calls in sequence | Long user-visible delay on failure | Async rollback; return user to safe state immediately |
| 15 | **Unevaluated Fallback Model** | Switching to cheaper model without quality validation | Silent quality degradation | All fallback models must pass eval suite |
| 16 | **Missing DLQ** | Failed tool calls discarded with no reprocessing path | Silent data loss; incomplete sagas | DLQ with 24-hour retention and processor |
| 17 | **Hallucination Cascade** | Agent's bad output becomes next agent's assumed fact | Pipeline-wide incorrect output | Verification gates between agents |
| 18 | **Orphaned Work on Crash** | In-flight work has no recovery path after crash | Tasks lost; side effects partially executed | Durable workflow engine required |
| 19 | **Error Budget Ignored** | SLOs defined but error budget not tracked or acted on | Budget exhausted; no feature freeze; breach | Automated burn rate alerts with automatic freeze triggers |
| 20 | **Chaos Testing Not Practiced** | Reliability designed but never validated under failure | Untested recovery paths fail in production | Quarterly chaos game days |
| 21 | **Single-Region LLM Routing** | All LLM calls go to one provider region | Regional outage = full outage | Multi-region routing with active-active providers |
| 22 | **Streaming Without Heartbeat** | SSE stream with no keepalive messages | Proxies close idle connections; clients miss events | Heartbeat comment every 15s |
| 23 | **Missing Retry-After Respect** | Ignores `Retry-After` header on 429 responses | Immediate retry worsens rate limit situation | Always honour `Retry-After` |
| 24 | **Quality SLIs Not Measured** | Only transport metrics tracked; semantic quality ignored | Quality degradation invisible | LLM judge evaluation pipeline with quality SLIs |
| 25 | **HITL as Last Resort** | Human escalation only after complete failure | User already frustrated; too late | HITL proactively at quality SLI breach |
