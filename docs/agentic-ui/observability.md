---
title: Observability for Agentic Applications
---

# Observability for Agentic Applications

A reference guide for AI Platform Teams and Enterprise Architects on the full observability stack for agentic systems — from distributed tracing and AG-UI stream telemetry through frontend RUM, LLM cost attribution, safety signal monitoring, and business analytics.

:::note Build on the OTel GenAI foundation
    This guide extends the OpenTelemetry GenAI semantic conventions, the 5-dashboard reference set, and burn rate alerting strategy defined in [Reliability, Observability & Governance](../coding-tools/enterprise-ai-architect/agentic-ai-reliability-observability-governance.md). Read that guide first — this file builds the AGUI/streaming/UX telemetry layer on top of that foundation without re-explaining OTel span semantics, semantic conventions, or the dashboard scaffolding already covered there.

---

## 1. The Four-Pillar Observability Model for Agentic Systems

Traditional observability rests on three pillars: traces, metrics, and logs. Agentic systems require a fourth pillar — **evaluation signals** — because semantic correctness is not observable from infrastructure metrics alone. A tool call can return HTTP 200 with hallucinated output; a planning span can complete in 200 ms producing a wrong plan. Without evaluation signals, your observability stack is blind to the failure class that matters most.

### 1.1 Four-Pillar Definitions

| Pillar | What It Captures | Instrumentation Point | Unique Challenge for Agentic |
|--------|-----------------|----------------------|------------------------------|
| **Traces** | Causal chain of work across components | OTel SDK in every agent component | Multi-hop propagation across A2A boundaries; async tool calls break linear trace trees |
| **Metrics** | Aggregated numerical measurements over time | OTel Metrics SDK, Prometheus, custom exporters | Token counts, cost, streaming throughput are new metric families not in standard dashboards |
| **Logs** | Structured event records with context | Structured logging + OTel log bridge | LLM request/response bodies are large; privacy constraints limit raw log retention |
| **Evaluation signals** | Semantic quality, safety, and helpfulness scores | LLM-as-judge pipelines, human feedback, regression eval harnesses | Delayed (not real-time); require separate pipeline from inference path |

### 1.2 Signal Taxonomy

```text
AGENTIC OBSERVABILITY SIGNAL TAXONOMY

Pillar 1: TRACES
  ├─ Request traces (user-request → response)
  ├─ Planning traces (planner span tree)
  ├─ Tool execution traces (per tool call)
  ├─ Memory traces (retrieval + write spans)
  ├─ A2A delegation traces (cross-agent)
  └─ Streaming spans (chunk delivery)

Pillar 2: METRICS
  ├─ Infrastructure metrics (CPU, memory, latency)
  ├─ LLM metrics (TTFT, TPOT, token usage, cost)
  ├─ AG-UI stream metrics (event rate, throughput)
  ├─ Tool metrics (call rate, success/failure, latency)
  ├─ Memory metrics (retrieval latency, hit rate)
  └─ Safety metrics (guardrail trigger rate)

Pillar 3: LOGS
  ├─ Agent action logs (structured, immutable)
  ├─ Tool invocation logs (inputs redacted where sensitive)
  ├─ Planning decision logs (reasoning summaries)
  ├─ Auth/approval event logs
  └─ Error and exception logs

Pillar 4: EVALUATION SIGNALS
  ├─ Automated eval scores (LLM-as-judge: coherence, correctness, safety)
  ├─ Human feedback (thumbs up/down, corrections, replays)
  ├─ Regression eval results (CI eval gate outcomes)
  ├─ Adversarial eval results (red-team findings)
  └─ Business outcome signals (task completion, CSAT, time-to-task)
```

### 1.3 Signal Priority Matrix

| Signal Type | Latency to Dashboard | Retention | Privacy Sensitivity | Cost to Collect |
|-------------|---------------------|-----------|---------------------|-----------------|
| Infrastructure traces | < 30s | 30 days hot, 1yr cold | Low | Low |
| LLM call spans | < 30s | 30 days hot | Medium (contains query/response) | Medium |
| Token/cost metrics | < 1 min | 90 days | Low | Low |
| AGUI stream metrics | < 30s | 30 days | Medium | Low |
| Frontend RUM | < 5 min | 30 days | High (user behavior) | Low |
| Safety/guardrail events | < 30s | 1 year (compliance) | High | Low |
| Eval scores (automated) | 5–60 min lag | 1 year | Low | Medium |
| Human feedback | Hours to days | Indefinite | Medium | High (human time) |

---

## 2. Distributed Tracing for Agentic Workflows

### 2.1 Trace Hierarchy

Every agentic workflow generates a span tree anchored at the user request. Understanding the hierarchy is critical before designing instrumentation.

```text
ROOT SPAN: user.request
│   trace_id: "4bf92f3577b34da6a3ce929d0e0e4736"
│   span_id:  "00f067aa0ba902b7"
│   session_id: "sess_abc123"
│   user_id: "user_xyz" (hashed)
│   request_id: "req_20260706_0001"
│   duration: 8.4s
│
├─ PLANNING SPAN: agent.plan
│   │   agent_id: "research-agent-v2"
│   │   task_id: "task_research_001"
│   │   plan_steps: 4
│   │   duration: 0.9s
│   │
│   ├─ LLM CALL SPAN: llm.call (planner call)
│   │       model_id: "claude-sonnet-4-5"
│   │       prompt_tokens: 1840
│   │       completion_tokens: 312
│   │       ttft_ms: 180
│   │       cost_usd: 0.00621
│   │
│   └─ PLAN VALIDATION SPAN: agent.plan.validate
│           policy_checks: 3
│           result: "approved"
│
├─ TOOL CALL SPAN: tool.execute (web_search)
│   │   tool_name: "web_search"
│   │   tool_version: "2.1"
│   │   input_size_bytes: 128
│   │   output_size_bytes: 4096
│   │   duration: 1.2s
│   │   success: true
│   │
│   └─ EXTERNAL HTTP SPAN: http.client
│           http.url: "https://api.search.example.com/v1/search"
│           http.method: "GET"
│           http.status_code: 200
│
├─ MEMORY SPAN: memory.retrieve
│       memory_type: "semantic"
│       query_tokens: 24
│       results_returned: 5
│       top_score: 0.92
│       duration_ms: 45
│
├─ LLM CALL SPAN: llm.call (synthesis call)
│       model_id: "claude-sonnet-4-5"
│       prompt_tokens: 6240
│       completion_tokens: 1100
│       ttft_ms: 210
│       cost_usd: 0.02187
│       cache_hit: false
│
├─ GUARDRAIL SPAN: safety.check
│       policy_ids: ["no_pii", "output_safety"]
│       triggered: false
│       duration_ms: 12
│
└─ STREAMING SPAN: agui.stream
        stream_id: "stream_001"
        chunks_sent: 88
        bytes_sent: 4096
        ttft_ms: 220
        completion_rate: "complete"
        duration: 5.1s
```

### 2.2 Mandatory Span Attributes

Every span in an agentic trace MUST carry a standard attribute set. Custom attributes go into the span attribute bag using the `gen_ai.*` namespace from OTel GenAI semantic conventions.

| Attribute | Type | Required On | Description |
|-----------|------|-------------|-------------|
| `session.id` | string | All spans | User session identifier (stable, anonymizable) |
| `agent.id` | string | All spans | Agent identity (`research-agent-v2`) |
| `task.id` | string | Planning + child spans | Task/job identifier for correlation |
| `user.id` | string | Root span only | Hashed/pseudonymized user identifier |
| `gen_ai.system` | string | LLM spans | Provider: `anthropic`, `openai`, `azure_openai` |
| `gen_ai.request.model` | string | LLM spans | Model ID as requested |
| `gen_ai.response.model` | string | LLM spans | Model ID as actually used (may differ) |
| `gen_ai.usage.input_tokens` | int | LLM spans | Prompt token count |
| `gen_ai.usage.output_tokens` | int | LLM spans | Completion token count |
| `llm.cost.usd` | float | LLM spans | Estimated cost in USD |
| `tool.name` | string | Tool spans | Tool identifier |
| `tool.version` | string | Tool spans | Tool API version |
| `tool.success` | bool | Tool spans | Whether tool call succeeded |
| `agui.stream_id` | string | Streaming spans | Stream correlation ID |
| `agui.event_type` | string | AGUI event spans | AG-UI event type |
| `memory.type` | string | Memory spans | `semantic`, `episodic`, `working` |
| `safety.triggered` | bool | Guardrail spans | Whether a policy was triggered |
| `safety.policy_id` | string | Guardrail spans | Which policy triggered (if any) |

### 2.3 Trace Propagation Across A2A Boundaries

When an orchestrator delegates to a sub-agent via A2A, the trace context MUST propagate using W3C Trace Context headers.

```text
ORCHESTRATOR → SUB-AGENT DELEGATION

Orchestrator creates child span:
  span_kind: CLIENT
  span_name: "a2a.delegate"
  attributes:
    a2a.target_agent: "data-analyst-agent"
    a2a.task_type: "data_analysis"

Outbound HTTP headers to sub-agent:
  traceparent: "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"
  tracestate:  "enterprise=session_abc123"

Sub-agent receives headers:
  Extracts trace context
  Creates SERVER span as child of delegating span
  Continues the same trace tree
  Adds sub-agent-specific span attributes

Sub-agent returns response:
  Closes its SERVER span
  Returns traceparent in response headers (optional)
```

:::warning A2A Trace Propagation Anti-Pattern
    Never create a new root trace when receiving an A2A delegation. A new root severs the causal chain and makes the trace useless for debugging multi-agent failures. Always extract the incoming `traceparent` header and create a child span.

### 2.4 Sampling Strategy

| Scenario | Sampling Rate | Rationale |
|----------|--------------|-----------|
| Error responses (any span) | **100%** | All errors must be traced; no sampling |
| Safety/guardrail triggers | **100%** | Compliance and forensics requirement |
| Latency outliers (P95+) | **100%** | Tail latency debugging requires full traces |
| HITL approval events | **100%** | Audit requirement |
| Normal interactive sessions | **10%** | Reasonable cost/coverage balance |
| High-volume batch agents | **1%** | Cost control; errors still at 100% |
| Health check endpoints | **0%** | No value; noise |

Use **tail-based sampling** (decide to keep/drop after the full trace completes) rather than head-based sampling. This ensures error traces are always kept even if the error occurs late in the span tree.

### 2.5 Python Instrumentation Example

=== "Python"

    ```python
    from opentelemetry import trace, metrics
    from opentelemetry.sdk.trace import TracerProvider
    from opentelemetry.sdk.trace.export import BatchSpanProcessor
    from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
    from opentelemetry.trace.propagation.tracecontext import TraceContextTextMapPropagator
    import time

    # Provider setup
    provider = TracerProvider()
    provider.add_span_processor(
        BatchSpanProcessor(
            OTLPSpanExporter(endpoint="http://otel-collector:4317")
        )
    )
    trace.set_tracer_provider(provider)
    tracer = trace.get_tracer("agentic-app", "1.0.0")

    # Root span for user request
    def handle_user_request(session_id: str, user_id_hash: str, user_message: str):
        with tracer.start_as_current_span("user.request") as root_span:
            root_span.set_attributes({
                "session.id": session_id,
                "user.id": user_id_hash,
                "gen_ai.system": "anthropic",
            })
            result = run_agent_pipeline(session_id, user_message)
            root_span.set_attribute("task.success", result.success)
            return result

    # LLM call span with TTFT measurement
    def call_llm(model_id: str, messages: list, agent_id: str):
        with tracer.start_as_current_span("llm.call") as span:
            span.set_attributes({
                "agent.id": agent_id,
                "gen_ai.system": "anthropic",
                "gen_ai.request.model": model_id,
            })
            t0 = time.monotonic()
            response = anthropic_client.messages.create(
                model=model_id, messages=messages, stream=True
            )
            first_chunk_received = False
            for chunk in response:
                if not first_chunk_received:
                    ttft_ms = (time.monotonic() - t0) * 1000
                    span.set_attribute("llm.ttft_ms", ttft_ms)
                    first_chunk_received = True

            span.set_attributes({
                "gen_ai.usage.input_tokens": response.usage.input_tokens,
                "gen_ai.usage.output_tokens": response.usage.output_tokens,
                "llm.cost.usd": calculate_cost(model_id, response.usage),
                "llm.cache_hit": response.usage.cache_read_input_tokens > 0,
            })
            return response

    # Tool call span
    def execute_tool(tool_name: str, tool_version: str, inputs: dict):
        with tracer.start_as_current_span("tool.execute") as span:
            span.set_attributes({
                "tool.name": tool_name,
                "tool.version": tool_version,
                "tool.input_size_bytes": len(str(inputs)),
            })
            try:
                result = tool_registry.execute(tool_name, inputs)
                span.set_attributes({
                    "tool.success": True,
                    "tool.output_size_bytes": len(str(result)),
                })
                return result
            except Exception as e:
                span.set_attributes({"tool.success": False, "tool.error_type": type(e).__name__})
                span.record_exception(e)
                raise

    # A2A delegation with trace propagation
    def delegate_to_agent(target_agent_url: str, task: dict) -> dict:
        with tracer.start_as_current_span("a2a.delegate") as span:
            span.set_attribute("a2a.target_agent", target_agent_url)
            headers = {}
            TraceContextTextMapPropagator().inject(headers)
            response = http_client.post(target_agent_url, json=task, headers=headers)
            span.set_attribute("a2a.response_status", response.status_code)
            return response.json()
    ```

=== "TypeScript"

    ```typescript
    import { trace, context, SpanStatusCode } from '@opentelemetry/api';
    import { NodeTracerProvider } from '@opentelemetry/sdk-node';
    import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
    import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
    import { W3CTraceContextPropagator } from '@opentelemetry/core';

    const provider = new NodeTracerProvider();
    provider.addSpanProcessor(
      new BatchSpanProcessor(new OTLPTraceExporter({ url: 'http://otel-collector:4317' }))
    );
    provider.register({ propagator: new W3CTraceContextPropagator() });
    const tracer = trace.getTracer('agentic-app', '1.0.0');

    async function handleUserRequest(sessionId: string, userIdHash: string, message: string) {
      return tracer.startActiveSpan('user.request', async (rootSpan) => {
        rootSpan.setAttributes({
          'session.id': sessionId,
          'user.id': userIdHash,
          'gen_ai.system': 'anthropic',
        });
        try {
          const result = await runAgentPipeline(sessionId, message);
          rootSpan.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (err) {
          rootSpan.recordException(err as Error);
          rootSpan.setStatus({ code: SpanStatusCode.ERROR });
          throw err;
        } finally {
          rootSpan.end();
        }
      });
    }

    async function callLlm(modelId: string, messages: Message[]) {
      return tracer.startActiveSpan('llm.call', async (span) => {
        span.setAttributes({ 'gen_ai.request.model': modelId, 'gen_ai.system': 'anthropic' });
        const t0 = performance.now();
        let ttftRecorded = false;
        const stream = await anthropic.messages.stream({ model: modelId, messages });
        for await (const chunk of stream) {
          if (!ttftRecorded) {
            span.setAttribute('llm.ttft_ms', performance.now() - t0);
            ttftRecorded = true;
          }
        }
        const usage = stream.finalUsage();
        span.setAttributes({
          'gen_ai.usage.input_tokens': usage.input_tokens,
          'gen_ai.usage.output_tokens': usage.output_tokens,
          'llm.cost.usd': calculateCost(modelId, usage),
        });
        span.end();
        return stream.finalMessage();
      });
    }
    ```

---

## 3. AG-UI Event Telemetry

### 3.1 AG-UI Event Type Taxonomy

AG-UI defines a structured event protocol between agent backend and frontend. Each event type carries distinct observability significance.

| AG-UI Event Type | Description | Key Metric | Alert Threshold |
|-----------------|-------------|-----------|-----------------|
| `RUN_STARTED` | Agent begins processing | Rate per minute | < 0.1/min (dead) or > 1000/min (spike) |
| `RUN_FINISHED` | Agent completed normally | Completion rate % | < 90% triggers investigation |
| `RUN_ERROR` | Agent encountered error | Error rate % | > 5% triggers PagerDuty |
| `TEXT_MESSAGE_START` | Streaming text begins | N/A | N/A |
| `TEXT_MESSAGE_CHUNK` | Streaming token delivery | Chunks/sec, bytes/sec | < 1 chunk/sec (stalled stream) |
| `TEXT_MESSAGE_END` | Streaming text complete | Total duration | P99 > 30s triggers alert |
| `TOOL_CALL_START` | Agent invokes a tool | Tool call rate by name | Unexpected tool = security alert |
| `TOOL_CALL_END` | Tool returned result | Tool call duration | P99 > 10s triggers investigation |
| `STATE_SNAPSHOT` | Full agent state sync | Snapshot size bytes | > 1MB = context bloat warning |
| `STATE_DELTA` | Incremental state update | Delta frequency | > 10/sec = excessive state churn |
| `MESSAGES_SNAPSHOT` | Full conversation sync | Message count | > 100 messages = trim context |
| `STEP_STARTED` | Sub-task or plan step begins | Step count per run | > 20 steps = planning loop risk |
| `STEP_FINISHED` | Sub-task complete | Step duration | N/A |
| `CUSTOM` | Application-defined event | Custom metrics | Application-defined |

### 3.2 Streaming Performance Metrics

**Time to First Token (TTFT)** — measured from user submitting request to first `TEXT_MESSAGE_CHUNK` delivered to browser:

| TTFT Percentile | Target | Acceptable | Needs Investigation |
|----------------|--------|------------|---------------------|
| P50 | < 800ms | < 1.5s | > 3s |
| P90 | < 2s | < 4s | > 8s |
| P99 | < 5s | < 10s | > 15s |

**Streaming Throughput** — tokens per second after first token:

| Model Class | Expected | Slow Threshold | Stalled Threshold |
|-------------|---------|---------------|-------------------|
| Small (Haiku-class) | 80–120 tokens/sec | < 40 tokens/sec | < 5 tokens/sec |
| Medium (Sonnet-class) | 60–90 tokens/sec | < 30 tokens/sec | < 5 tokens/sec |
| Large (Opus-class) | 30–50 tokens/sec | < 15 tokens/sec | < 3 tokens/sec |

**Stream terminal state classification:**

```text
STREAM_COMPLETE    — agent finished naturally         target: > 92%
STREAM_CANCELLED   — user clicked cancel              informational
STREAM_ERROR       — backend error during stream      target: < 3%
STREAM_TIMEOUT     — no activity for > 30s            target: < 1%
STREAM_INTERRUPTED — connection dropped               target: < 2%
```

### 3.3 AG-UI Server Instrumentation

=== "Python"

    ```python
    from opentelemetry import metrics, trace
    import time

    meter = metrics.get_meter("agui-server", "1.0.0")
    tracer = trace.get_tracer("agui-server", "1.0.0")

    agui_event_counter = meter.create_counter(
        "agui.events.total",
        description="Total AG-UI events emitted by type",
    )
    stream_ttft_histogram = meter.create_histogram(
        "agui.stream.ttft_ms", description="Time to first token", unit="ms"
    )
    stream_throughput_histogram = meter.create_histogram(
        "agui.stream.throughput_tokens_per_sec",
        description="Streaming throughput in tokens per second",
    )
    tool_call_histogram = meter.create_histogram(
        "agui.tool_call.duration_ms", unit="ms"
    )

    async def run_agent_stream(session_id: str, agent_id: str, user_message: str):
        stream_id = generate_stream_id()
        start_time = time.monotonic()
        first_chunk_time = None
        total_tokens = 0

        with tracer.start_as_current_span("agui.stream") as stream_span:
            stream_span.set_attributes({
                "session.id": session_id,
                "agent.id": agent_id,
                "agui.stream_id": stream_id,
            })
            agui_event_counter.add(1, {"event_type": "RUN_STARTED", "agent_id": agent_id})
            yield format_sse_event("RUN_STARTED", {"stream_id": stream_id})

            try:
                async for event in agent_runtime.run(session_id, user_message):
                    agui_event_counter.add(1, {"event_type": event.type, "agent_id": agent_id})

                    if event.type == "TEXT_MESSAGE_CHUNK":
                        if first_chunk_time is None:
                            first_chunk_time = time.monotonic()
                            ttft_ms = (first_chunk_time - start_time) * 1000
                            stream_ttft_histogram.record(ttft_ms, {"agent_id": agent_id})
                            stream_span.set_attribute("agui.ttft_ms", ttft_ms)
                        total_tokens += event.token_count or 0

                    elif event.type == "TOOL_CALL_END":
                        tool_call_histogram.record(event.duration_ms, {
                            "tool_name": event.tool_name,
                            "success": str(event.success),
                        })
                    yield format_sse_event(event.type, event.data)

                duration = time.monotonic() - start_time
                throughput = total_tokens / duration if duration > 0 else 0
                stream_throughput_histogram.record(throughput, {"agent_id": agent_id})
                stream_span.set_attributes({
                    "agui.tokens_sent": total_tokens,
                    "agui.throughput_tps": throughput,
                    "agui.terminal_state": "STREAM_COMPLETE",
                })
                agui_event_counter.add(1, {"event_type": "RUN_FINISHED", "agent_id": agent_id})
                yield format_sse_event("RUN_FINISHED", {})

            except Exception as e:
                stream_span.record_exception(e)
                agui_event_counter.add(1, {"event_type": "RUN_ERROR", "agent_id": agent_id})
                yield format_sse_event("RUN_ERROR", {"error": str(e)})
                raise
    ```

=== "TypeScript"

    ```typescript
    import { trace, metrics } from '@opentelemetry/api';

    const tracer = trace.getTracer('agui-server', '1.0.0');
    const meter = metrics.getMeter('agui-server', '1.0.0');
    const eventCounter = meter.createCounter('agui.events.total');
    const ttftHistogram = meter.createHistogram('agui.stream.ttft_ms', { unit: 'ms' });
    const throughputHistogram = meter.createHistogram('agui.stream.throughput_tokens_per_sec');

    export async function* runAgentStream(
      sessionId: string, agentId: string, message: string
    ): AsyncGenerator<AGUIEvent> {
      const streamId = crypto.randomUUID();
      const startTime = performance.now();
      let firstChunkTime: number | null = null;
      let totalTokens = 0;

      const span = tracer.startSpan('agui.stream');
      span.setAttributes({ 'session.id': sessionId, 'agent.id': agentId });
      eventCounter.add(1, { event_type: 'RUN_STARTED', agent_id: agentId });
      yield { type: 'RUN_STARTED', streamId };

      try {
        for await (const event of agentRuntime.run(sessionId, message)) {
          eventCounter.add(1, { event_type: event.type, agent_id: agentId });
          if (event.type === 'TEXT_MESSAGE_CHUNK') {
            if (firstChunkTime === null) {
              firstChunkTime = performance.now();
              ttftHistogram.record(firstChunkTime - startTime, { agent_id: agentId });
            }
            totalTokens += event.tokenCount ?? 0;
          }
          yield event;
        }
        const duration = (performance.now() - startTime) / 1000;
        throughputHistogram.record(totalTokens / duration, { agent_id: agentId });
        eventCounter.add(1, { event_type: 'RUN_FINISHED', agent_id: agentId });
        yield { type: 'RUN_FINISHED' };
      } catch (err) {
        span.recordException(err as Error);
        eventCounter.add(1, { event_type: 'RUN_ERROR', agent_id: agentId });
        yield { type: 'RUN_ERROR', error: String(err) };
      } finally {
        span.end();
      }
    }
    ```

---

## 4. Frontend / UI Telemetry

### 4.1 Browser Performance Metrics for Agentic Interfaces

| Metric | Collection Method | Target | Alert |
|--------|-----------------|--------|-------|
| App shell LCP | `PerformanceObserver` (LCP) | < 2.5s | > 4s |
| Agent TTFT (custom) | `performance.mark` / `performance.measure` | < 1s | > 3s |
| Streaming frame rate | `requestAnimationFrame` FPS during stream | > 30 FPS | < 20 FPS |
| INP during streaming | `PerformanceObserver` (INP) | < 200ms | > 500ms |
| CLS during token insertion | `PerformanceObserver` (layout-shift) | < 0.1 | > 0.25 |

### 4.2 Core Web Vitals Adaptation for Streaming

| CWV Metric | Standard Definition | Agentic Adaptation | Target |
|-----------|--------------------|--------------------|--------|
| **LCP** | Largest image/text block rendered | First meaningful agent content chunk | < 2.5s from request submit |
| **INP** | Worst interaction latency | Approve/cancel button response during streaming | < 200ms |
| **CLS** | Unexpected layout movement | Layout shift score during token streaming | < 0.1 |

### 4.3 User Interaction Event Taxonomy

```text
APPROVAL EVENTS
  agui.hitl.approval_presented  — modal shown, task_id, action_description
  agui.hitl.approval_approved   — user approved, time_to_decide_ms
  agui.hitl.approval_rejected   — user rejected, reason_code
  agui.hitl.approval_timeout    — approval expired without decision

NAVIGATION EVENTS
  agui.stream.cancel_clicked    — user cancelled, progress_pct_when_cancelled
  agui.stream.replay_clicked    — user replayed run, run_id
  agui.stream.expand_collapsed  — user toggled step details

FEEDBACK EVENTS
  agui.feedback.thumbs_up       — positive, session_id, turn_id
  agui.feedback.thumbs_down     — negative, session_id, turn_id, reason
  agui.feedback.correction_submitted — user edited agent output
  agui.feedback.copied          — user copied response (positive proxy)

TASK EVENTS
  agui.task.completed_success   — task marked done
  agui.task.abandoned           — user left page mid-task
  agui.task.restarted           — user started same task from scratch

ERROR RECOVERY
  agui.error.retry_clicked      — user clicked retry on error
  agui.error.refresh_clicked    — user refreshed page during failure
```

### 4.4 Rage Clicks and Abandonment Detection

| Signal | Definition | Collection Method | Action |
|--------|-----------|------------------|--------|
| **Rage click on progress indicator** | 3+ clicks in 2s on non-interactive element | Click event listener + velocity detection | Log `agui.ux.rage_click`; tag session for review |
| **Abandonment during streaming** | Page hidden/unload during active stream | `visibilitychange` + `beforeunload` | Log `agui.ux.stream_abandoned` with progress_pct |
| **Repeated identical queries** | Same prompt within same session | Session query dedup | Quality signal; agent not solving problem |
| **Rapid input rewrites** | Type, delete, retype within 30s | Input change events | Input frustration; improve guidance |

### 4.5 RUM Setup with PII Scrubbing

=== "JavaScript"

    ```javascript
    const PII_PATTERNS = [
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,  // email
      /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,                           // phone
      /\b\d{3}-\d{2}-\d{4}\b/g,                                   // SSN
      /\b(?:\d[ -]*?){13,16}\b/g,                                  // credit card
    ];

    function scrubPii(value) {
      if (typeof value !== 'string') return value;
      return PII_PATTERNS.reduce((s, p) => s.replace(p, '[REDACTED]'), value);
    }

    // Measure agent TTFT from browser perspective
    export function measureAgentTTFT(requestId) {
      performance.mark(`agent_request_start_${requestId}`);
      return {
        recordFirstChunk() {
          performance.mark(`agent_first_chunk_${requestId}`);
          performance.measure(
            `agent_ttft_${requestId}`,
            `agent_request_start_${requestId}`,
            `agent_first_chunk_${requestId}`
          );
          const [entry] = performance.getEntriesByName(`agent_ttft_${requestId}`);
          analytics.track('agui.stream.ttft_ms', {
            duration_ms: entry.duration,
            request_id: requestId,   // never send user content
          });
        }
      };
    }

    // Rage click and abandonment tracking
    export function initInteractionTracking() {
      const clickHistory = [];
      document.addEventListener('click', (e) => {
        const now = Date.now();
        clickHistory.push({ time: now, target: e.target.className });
        const recent = clickHistory.filter(c => now - c.time < 2000);
        if (recent.length >= 3 && recent.every(c => c.target === recent[0].target)) {
          analytics.track('agui.ux.rage_click', {
            element_class: scrubPii(recent[0].target),
            click_count: recent.length,
          });
        }
        if (clickHistory.length > 10) clickHistory.splice(0, clickHistory.length - 10);
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden && window.__activeStreamId) {
          analytics.track('agui.ux.stream_abandoned', {
            stream_id: window.__activeStreamId,
            progress_pct: window.__streamProgressPct,
          });
        }
      });
    }
    ```

---

## 5. LLM Observability

### 5.1 Token Usage Attribution Hierarchy

Token usage must be attributable at four levels for cost governance:

```text
ATTRIBUTION HIERARCHY

Organization / Tenant
  └─ Business Unit / Team / Cost Center
       └─ Application / Agent
            └─ User / Session / Task
```

| Attribution Level | Span Attribute | Example |
|------------------|---------------|---------|
| Tenant | `tenant.id` | `"bank-retail-division"` |
| Team | `team.id` | `"coe-ai-platform"` |
| Agent | `agent.id` | `"risk-analysis-agent-v3"` |
| User | `user.id` | `"u_8a7f2c"` (hashed) |
| Session | `session.id` | `"sess_abc123"` |
| Task | `task.id` | `"task_20260706_001"` |

### 5.2 LLM Latency Decomposition

```text
TOTAL END-TO-END TIME BREAKDOWN

Component              Typical Range   P99 Alert
──────────────────     ─────────────   ─────────
Client → Gateway        5–20ms          > 100ms
Gateway → Provider      20–100ms        > 500ms
TTFT (provider)         100ms–3s        > 5s
Streaming duration      0.5s–30s        > 60s
Gateway → Client        5–20ms          > 100ms
```

### 5.3 Core LLM Metrics

| Metric Name | Type | Labels | Description |
|------------|------|--------|-------------|
| `llm.request.total` | Counter | agent_id, model_id, status | Total LLM API calls |
| `llm.ttft.ms` | Histogram | agent_id, model_id | Time to first token |
| `llm.tpot.ms` | Histogram | agent_id, model_id | Time per output token |
| `llm.duration.ms` | Histogram | agent_id, model_id | End-to-end request duration |
| `llm.tokens.input` | Counter | agent_id, model_id, tenant_id | Input tokens consumed |
| `llm.tokens.output` | Counter | agent_id, model_id, tenant_id | Output tokens generated |
| `llm.cost.usd` | Counter | agent_id, model_id, tenant_id | Estimated USD cost |
| `llm.cache.hit.rate` | Gauge | agent_id, model_id | Prompt cache hit rate |
| `llm.errors.total` | Counter | agent_id, model_id, error_type | LLM API errors |
| `llm.ratelimit.total` | Counter | agent_id, model_id | Rate limit (429) events |

### 5.4 Cache Hit Rate Tracking

| Cache Layer | What It Caches | Instrumentation | Target Hit Rate |
|------------|---------------|-----------------|-----------------|
| **Provider prompt cache** | Shared prefix of system prompt | `usage.cache_read_input_tokens > 0` | > 60% for stable system prompts |
| **Semantic cache** | Similar past queries (embedding similarity) | Custom cache middleware | > 30% for repetitive workloads |
| **Response cache** | Identical queries (exact match) | HTTP cache layer | > 10% for deterministic queries |

### 5.5 Quality Proxy Signals

| Signal | Formula | Quality Interpretation | Alert Threshold |
|--------|---------|------------------------|-----------------|
| **Rephrasing rate** | `rephrase_count / total_queries` | High = agent not understanding user | > 30% |
| **Regeneration rate** | `regenerate_clicks / total_responses` | High = poor response quality | > 15% |
| **Copy rate** | `copy_clicks / total_responses` | Low = unhelpful responses | < 20% |
| **Edit rate** | `user_edits / total_responses` | High = output needs correction | > 25% |
| **Follow-up rate** | `follow_ups / tasks` | High = incomplete first response | > 2 per task |

---

## 6. Tool Observability

### 6.1 Tool Call SLOs

| Tool Category | Latency P50 SLO | Latency P99 SLO | Availability SLO | Retry Safe? |
|--------------|----------------|----------------|-----------------|-------------|
| Search / web retrieval | < 1s | < 5s | 99% | Yes |
| Database query | < 100ms | < 500ms | 99.9% | Yes (read) |
| REST API call (external) | < 500ms | < 3s | 98% | Depends |
| Code execution sandbox | < 5s | < 30s | 99% | Yes |
| Email / calendar write | < 2s | < 10s | 99% | No (idempotency key required) |

### 6.2 Circuit Breaker State Metrics

```text
CIRCUIT BREAKER STATE MACHINE

CLOSED ──(failure_rate > 50%)──► OPEN
  ▲                                 │
  │                            (timeout 30s)
  │                                 │
  └──(success_rate > 90%)── HALF-OPEN ◄
```

| Metric | Description | Alert |
|--------|-------------|-------|
| `tool.circuit_breaker.state` | Current state: CLOSED/OPEN/HALF_OPEN | OPEN state for > 5 min |
| `tool.circuit_breaker.open.count` | Times circuit opened (rolling 1h) | > 3 opens/hour |

---

## 7. Memory Observability

### 7.1 Memory System Metrics

| Metric | Type | Description | Target |
|--------|------|-------------|--------|
| `memory.retrieval.latency_ms` | Histogram | Vector similarity search duration | P99 < 200ms |
| `memory.retrieval.results_count` | Histogram | Documents returned per query | Typically 3–10 |
| `memory.retrieval.top_score` | Gauge | Top similarity score | < 0.7 = quality concern |
| `memory.cache.hit_rate` | Gauge | Semantic cache hits | Target > 30% |
| `memory.write.latency_ms` | Histogram | Memory write duration | P99 < 500ms |
| `memory.store.size_docs` | Gauge | Total documents in memory store | Growing unboundedly = leak |
| `memory.context.utilization_pct` | Histogram | % of retrieved docs used in response | < 20% = over-retrieval |
| `memory.eviction.count` | Counter | Documents evicted by TTL/LRU | Sudden spike = TTL too aggressive |

For memory architecture and tiering details, see [Memory & Planning Architecture](../coding-tools/enterprise-ai-architect/agent-memory-planning-architecture.md).

---

## 8. Safety Observability

### 8.1 Safety Metrics

| Metric | Description | Alert Threshold | Retention |
|--------|-------------|-----------------|-----------|
| `safety.guardrail.trigger.count` | Total policy triggers by policy_id | Sudden 10x spike | 1 year |
| `safety.guardrail.trigger.rate` | Triggers per 1000 requests | > 50/1000 | 1 year |
| `safety.prompt_injection.detected` | Prompt injection attempts detected | Any | 1 year |
| `safety.pii.detected` | PII detected in inputs | Track trend | 90 days |
| `safety.policy_violation.attempt` | User attempted policy-violating action | Any | 1 year |

For OWASP ASI01–ASI10 security controls and guardrail policy design, see [Agentic AI Security & Identity](../coding-tools/enterprise-ai-architect/agentic-ai-security-identity.md).

### 8.2 Safety Alert Tiers

| Tier | Trigger | Response Time | Who Gets Paged |
|------|---------|--------------|----------------|
| **SEV-1 Safety** | Active prompt injection / policy bypass | 5 min | CISO + On-call Security |
| **SEV-2 Safety** | 3x guardrail trigger spike in 15 min | 15 min | Security Engineer |
| **SEV-3 Safety** | Unusual policy trigger pattern | 1 hour | AI Security team |
| **Informational** | New user attempting restricted action | Next business day | Analyst review |

:::warning Safety Observability is a Compliance Requirement
    Under EU AI Act Article 26 and most financial regulators, safety event logs must be immutable, timestamped, and retained for audit. Route safety events through a separate write-once log store (append-only S3 with object lock or equivalent). Never co-mingle with performance logs on the same 30-day retention pipeline.

---

## 9. Conversation Analytics

### 9.1 Session-Level Metrics

| Metric | Definition | Use |
|--------|-----------|-----|
| **Session length distribution** | Turns per session histogram | Bimodal (1 turn vs 10+) reveals distinct use cases |
| **Task success rate** | Sessions marked task_completed_success | Primary quality KPI |
| **First-turn resolution rate** | Task completed in exactly 1 turn | Directness quality signal |
| **Session abandonment rate** | Sessions with no completion event | Quality and UX concern |
| **Average turns to completion** | Mean turns per completed task | Lower = better for routine tasks |

### 9.2 Topic Clustering Pipeline

```text
TOPIC CLUSTERING PIPELINE

1. Extract first user message per session (or task description)
2. Embed with small model (text-embedding-3-small or equivalent)
3. Cluster with k-means or HDBSCAN (k=20–50 for enterprise)
4. Label clusters with LLM summarization
5. For each cluster: measure task success rate, avg turns, CSAT
6. Flag clusters with:
   - Success rate < 60% (agent not equipped)
   - High volume + low CSAT (priority improvement)
   - Rapidly growing volume (new use case emerging)
```

---

## 10. Business Analytics Dashboard Specification

### 10.1 Real-Time Operations Dashboard

| Widget | Metric | Visualization | Refresh |
|--------|--------|--------------|---------|
| Active sessions | Live sessions with open streams | Gauge + sparkline | 30s |
| Requests/min | Incoming request rate | Time series (1h window) | 30s |
| Error rate | `run_error / (run_finished + run_error)` | Gauge with SLO line | 30s |
| TTFT P95 | 95th percentile time to first token | Gauge + trend arrow | 1 min |
| Cost/hour | LLM + tool costs (rolling 1h) | Gauge + daily budget bar | 5 min |
| Safety events | Guardrail triggers (rolling 1h) | Counter with alert indicator | 30s |

### 10.2 Product Analytics Dashboard (7-Day Trends)

| Widget | Metric | Visualization | Refresh |
|--------|--------|--------------|---------|
| Task completion rate | % sessions with task_completed_success | Line chart (7d) + WoW delta | Daily |
| DAU | Distinct users with ≥1 session | Line chart (7d) | Daily |
| MAU | Distinct users in 30d | Single stat + trend | Daily |
| Thumbs up rate | `thumbs_up / (thumbs_up + thumbs_down)` | Gauge + 7d trend | Daily |
| Avg turns to complete | Mean turns per completed task | Bar chart by topic cluster | Daily |

### 10.3 Cost Attribution Dashboard

| Widget | Metric | Visualization |
|--------|--------|--------------|
| Cost per successful task | Total cost / completed tasks | Gauge + trend |
| Cost by tenant | LLM + tool costs by tenant_id | Stacked bar |
| Cost by model | Spend per model_id | Pie chart |
| Cost vs budget | Actual vs monthly budget | Bullet gauge |
| Cache savings | Estimated saved tokens | Gauge |

---

## 11. Alerting Strategy

### 11.1 Alert Severity Taxonomy

| Severity | Definition | Response SLA | Channel |
|---------|-----------|-------------|---------|
| **SEV-1 Critical** | Production down or active security incident | 5 min acknowledge | PagerDuty |
| **SEV-2 High** | SLO breach or severe degradation | 15 min | PagerDuty (business hours) |
| **SEV-3 Medium** | Quality degradation, approaching SLO | 2 hours | Slack #ai-platform-alerts |
| **SEV-4 Low** | Unusual pattern, informational | Next business day | Slack #ai-platform-weekly |

### 11.2 SLO Burn Rate Alert Configuration

| Alert | Burn Rate | Window | Severity |
|-------|----------|--------|---------|
| Fast burn | 14× | 1h + 5min | SEV-2 |
| Slow burn | 3× | 6h + 1h | SEV-3 |
| Budget at 50% | N/A | Monthly | SEV-4 |

### 11.3 Prometheus Alert Rules

```yaml
groups:
  - name: agentic-slo
    rules:
      - alert: AgentStreamErrorRateHigh
        expr: |
          (rate(agui_events_total{event_type="RUN_ERROR"}[5m]) /
           rate(agui_events_total{event_type=~"RUN_FINISHED|RUN_ERROR"}[5m])) > 0.05
        for: 5m
        labels:
          severity: high
        annotations:
          summary: "Agent stream error rate > 5% for {{ $labels.agent_id }}"
          runbook: "https://wiki.example.com/runbooks/agent-stream-error"

      - alert: AgentTTFTP95High
        expr: |
          histogram_quantile(0.95, rate(agui_stream_ttft_ms_bucket[10m])) > 5000
        for: 10m
        labels:
          severity: high
        annotations:
          summary: "TTFT P95 > 5 seconds"

      - alert: ToolCircuitBreakerOpen
        expr: tool_circuit_breaker_state{state="OPEN"} == 1
        for: 2m
        labels:
          severity: high
        annotations:
          summary: "Circuit breaker OPEN for tool {{ $labels.tool_name }}"

      - alert: SafetyGuardrailSpike
        expr: |
          rate(safety_guardrail_trigger_count[15m]) >
          3 * rate(safety_guardrail_trigger_count[1h] offset 1h)
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Safety guardrail trigger rate spiked 3x above baseline"

      - alert: LLMCostOverrun
        expr: |
          increase(llm_cost_usd_total[1h]) > (monthly_budget / 730) * 2
        for: 15m
        labels:
          severity: medium
        annotations:
          summary: "LLM cost running at 2x hourly budget pace"
```

---

## 12. Observability Tool Comparison

| Tool | Trace Support | LLM-Native Features | Cost Model | Self-Hostable | Open Source | Best For |
|------|-------------|--------------------|-----------|-----------|-----------|----|
| **Datadog APM** | Full OTel + proprietary | LLM Observability — tokens, cost, prompts | Per host/user | No | No | Enterprise teams already on Datadog |
| **Grafana + Prometheus** | OTel via Tempo | None native; custom dashboards | Free OSS | Yes | Yes | Cost-sensitive, ops-heavy teams |
| **Honeycomb** | Native OTel, queryable | None native; flexible columns | Per event | No | No | High-cardinality trace exploration |
| **Elastic Observability** | OTel native | None; ML anomaly detection | Per GB + managed | Yes | Core OSS | Teams on Elasticsearch stack |
| **Arize AI** | Via OpenInference | Full LLM: eval scores, prompt quality, drift | Per model | No | No | LLM-first, eval integration |
| **Langfuse** | Trace + session replay | Full LLM: prompt versions, evals, cost, feedback | Free OSS / cloud | Yes | Yes | Dev-friendly, open source, fast setup |
| **LangSmith** | LangChain-native | Full LLM: eval, prompt registry, feedback | Per seat | No | No | LangChain-based teams |
| **Helicone** | Proxy-based, lightweight | Cost, latency, caching, user analytics | Free tier / per request | Yes (OSS) | Yes | Quick setup; minimal code change |
| **Braintrust** | Experiment + trace | Full eval platform: test datasets, CI integration | Per experiment | No | No | Eval-first teams; dataset management |
| **Phoenix (Arize OSS)** | OTel/OpenInference | LLM evals, UMAP embedding visualization | Free | Yes | Yes | Local dev, OSS-first |

:::tip Recommended Enterprise Stack
    For most enterprises: **Langfuse** (LLM observability, self-hosted) + **Grafana + Prometheus** (infrastructure metrics) + **Grafana Tempo** (distributed traces). This stack is fully open source, self-hostable for data sovereignty, and covers all four observability pillars. Add **Braintrust** for advanced eval pipelines or **Arize AI** for embedding drift detection.

---

## 13. Observability Anti-Patterns

| # | Anti-Pattern | Category | Severity | Detectability | Description | Risk | Mitigation |
|---|-------------|----------|----------|---------------|-------------|------|-----------|
| 1 | **Logging raw prompts/responses** | Privacy | Critical | Easy | Storing user queries and agent responses verbatim | PII leak, GDPR violation | PII scrubbing before any log write; hash or truncate sensitive fields |
| 2 | **No trace correlation** | Tracing | High | Medium | Different IDs in logs, traces, and metrics — cannot correlate | Cannot debug multi-component failures | Propagate single trace_id + session_id through all layers |
| 3 | **Head-based sampling** | Tracing | High | Hard | Deciding to sample at request start, before knowing if errors occur | Errors and outliers get sampled out | Use tail-based sampling; always keep errors |
| 4 | **No safety metric retention** | Compliance | Critical | Easy | Deleting safety events with 30-day TTL | Compliance violation, no forensics | Separate safety event store with 1-year retention, write-once |
| 5 | **Alert fatigue** | Alerting | High | Easy | Every INFO log creates an alert | On-call ignores alerts; real incidents missed | Tier alerts; only page for actionable SEV-1/2 |
| 6 | **Token count without cost** | Cost | High | Easy | Measuring tokens but not USD cost | No cost governance or budget alerts | Enrich every LLM span with `llm.cost.usd` at collection time |
| 7 | **No TTFT measurement** | Performance | High | Medium | Only measuring total response time | Can't distinguish slow-start from slow-stream | Measure TTFT as first-class metric at browser and server |
| 8 | **Synchronous span flushing** | Performance | Medium | Hard | Flushing spans inline with request | Adds latency to every inference call | Use BatchSpanProcessor; never flush inline |
| 9 | **No eval signal** | Quality | High | Hard | Infrastructure green, no quality measurement | Model/prompt regression undetected | Instrument eval pipeline; track thumbs and regeneration rate |
| 10 | **One dashboard for all audiences** | Visualization | Medium | Easy | Single dashboard serving engineers, ops, and executives | Every audience gets what they don't need | Purpose-built dashboards per audience |
| 11 | **No A2A trace propagation** | Tracing | High | Medium | Sub-agents start new root traces on delegation | Multi-agent failures undebuggable | Always propagate `traceparent` header on A2A calls |
| 12 | **Metrics without labels** | Metrics | Medium | Easy | `llm_calls_total` with no agent_id or model_id | Cannot segment by agent or model | Every metric must have agent_id, model_id, tenant_id labels |
| 13 | **No streaming telemetry** | Performance | High | Medium | Only measuring full response time | Cannot detect stalled streams | Instrument TTFT, chunk rate, and stream completion state |
| 14 | **No cache hit tracking** | Cost | Medium | Easy | Not measuring prompt or semantic cache hit rates | Paying for cacheable tokens | Track `cache_read_input_tokens`; track semantic cache hits |
| 15 | **Tool calls untraced** | Tracing | High | Easy | Tool executions not instrumented | Tool failure root cause invisible | Every tool call: span with inputs (redacted), duration, success |
| 16 | **No circuit breaker telemetry** | Reliability | High | Medium | Circuit breaker state not exported | OPEN state invisible until cascading failure | Export circuit breaker state as Gauge; alert on OPEN > 2 min |
| 17 | **Frontend RUM without PII scrub** | Privacy | Critical | Easy | Raw user queries in browser analytics | PII in third-party vendor | Scrub all PII before shipping any client-side telemetry |
| 18 | **Memory growth unmonitored** | Operations | High | Medium | Memory store grows without alerting | Unbounded growth → high latency + cost | Track `memory.store.size_docs`; alert on exceeding budget |
| 19 | **Vanity SLOs** | Governance | Medium | Hard | SLOs set at current performance level, not user-required | SLOs always green; users still unhappy | Set SLOs from user research on acceptable thresholds |
| 20 | **No eval result retention** | Quality | Medium | Easy | Eval results not versioned and retained | Can't detect regression over weeks | Store eval results with timestamp, prompt version, model version |
| 21 | **Shared dashboard credentials** | Security | High | Easy | Observability dashboards without RBAC | Sensitive business metrics exposed | RBAC on all dashboards; SSO enforcement |
| 22 | **No cost anomaly detection** | Cost | High | Medium | Only static budget alerts | Cost spike takes hours to detect | ML-based anomaly detection on cost metrics |
| 23 | **Ignoring stream abandonment** | Quality | Medium | Hard | No tracking of session abandonment during streaming | Silent quality signal missed | Track `beforeunload` + `visibilitychange` during active streams |
| 24 | **Shallow health checks** | Reliability | Medium | Hard | Health endpoint returns 200 even when LLM unreachable | Traffic routed to broken instance | Deep health checks: ping LLM, tool, memory, guardrail services |
| 25 | **No semantic diff alerting** | Quality | High | Hard | No alert when eval scores drop after deployment | Quality regression takes days to detect | Run eval on golden set pre/post deployment; alert on regression |
| 26 | **No memory utilization tracking** | Cost | Medium | Hard | Not tracking what fraction of retrieved context is used | Over-retrieval wastes tokens | Track context_utilization_pct; alert on < 20% |
| 27 | **Ignoring TPOT** | Performance | Medium | Medium | Only measuring TTFT; not time per output token | Can't detect mid-stream slowdowns | Add TPOT histogram alongside TTFT |
| 28 | **No tenant-level cost attribution** | Cost | High | Medium | All costs aggregated at org level | Can't do cross-team cost governance | Require tenant_id label on all LLM metrics |

---

*For the OTel GenAI baseline, burn rate SLO methodology, and 5-dashboard reference, see [Reliability, Observability & Governance](../coding-tools/enterprise-ai-architect/agentic-ai-reliability-observability-governance.md). For eval pipeline architecture, see [AI Agent Evaluation Framework Guide](../ai-development/testing/AI_Agent_Evaluation_Framework_Guide.md). For EU AI Act Article 26 safety logging obligations, see [Enterprise AI Governance & Compliance](../coding-tools/enterprise-ai-architect/enterprise-ai-governance-compliance.md).*
