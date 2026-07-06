---
title: AGUI Standards & Ecosystem Landscape
---

# AGUI Standards & Ecosystem Landscape

Principal AI Architects and AI Platform Teams will find here the authoritative technical reference for every protocol, standard, and framework in the agentic UI ecosystem as of July 2026 — including AG-UI, A2UI v0.9, MCP Apps, NLWeb, OpenAI Apps SDK, and Microsoft Agent Framework 1.0, with production code examples, a 15-framework comparison matrix, and a selection decision tree.

!!! info "Protocol Maturity Status — July 2026"
    AG-UI: production-ready open standard. A2UI: v0.9 experimental (Google). NLWeb: production open project (Microsoft). MCP Apps: production (CopilotKit/Anthropic ecosystem). OpenAI Apps SDK: production (later standardized into MCP Apps). Microsoft Agent Framework 1.0: production-ready (released April 2026). Amazon Bedrock AgentCore AG-UI support: infrastructure-level production.

---

## 1. Protocol Layer Map

The agentic UI protocol stack as of July 2026 comprises five distinct but interoperating standards. Each operates at a different layer of the stack and solves a different problem. Understanding the boundaries between them is essential for correct architecture decisions.

```text
AGENTIC UI PROTOCOL STACK — LAYER MODEL

┌─────────────────────────────────────────────────────────────────────────┐
│  PRESENTATION  Web · Mobile · Desktop · Voice · IDE · Teams / Slack    │
│  RENDER ENGINE CopilotKit · React Native · Terminal · Custom shells    │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │  AG-UI Protocol
                               │  Server→Client: HTTP + Server-Sent Events
                               │  Client→Server: HTTP POST (actions)
┌──────────────────────────────▼──────────────────────────────────────────┐
│  AG-UI — Agent-to-User-Interface Transport Protocol                    │
│  Concern: HOW events flow between agent and user interface              │
│  Events: TEXT_MESSAGE_* · TOOL_CALL_* · STATE_* · RUN_* · STEP_* ...  │
│  Capabilities: streaming · generative UI · state sync · HITL · nesting │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │  A2UI JSON payload (in AG-UI CUSTOM event)
┌──────────────────────────────▼──────────────────────────────────────────┐
│  A2UI v0.9 — Agent-to-UI Surface Definition (Google)                  │
│  Concern: WHAT the UI surface looks like (declarative widget JSON)     │
│  Widget types: text · form · table · chart · card · carousel · action  │
│  Rendering: framework-agnostic, host renders natively                   │
└─────────────┬────────────────┬──────────────────┬───────────────────────┘
              │                │                  │
┌─────────────▼────┐ ┌─────────▼───────┐ ┌────────▼──────────────────────┐
│  MCP             │ │  A2A            │ │  NLWeb                        │
│  Model Context   │ │  Agent-to-Agent │ │  Conversational Web           │
│  Protocol        │ │  (Google)       │ │  (Microsoft open project)     │
│  Concern:        │ │  Concern:       │ │  Concern:                     │
│  agent ↔ tool    │ │  agent ↔ agent  │ │  agent ↔ web content          │
│  Tool routing    │ │  Task deleg.    │ │  Schema.org/RSS + vector       │
│  Auth / authz    │ │  Agent Cards    │ │  Every instance = MCP server   │
│  Rate limiting   │ │  Scoped trust   │ │  Cloudflare AutoRAG native    │
└──────────────────┘ └─────────────────┘ └───────────────────────────────┘

ORACLE OPEN AGENT SPEC — THREE-LAYER MODEL
  Tier 1  Oracle Open Agent Spec  defines WHAT capabilities an agent has
  Tier 2  AG-UI                   defines HOW transport and interaction stream
  Tier 3  A2UI                    defines WHAT the UI surface renders

RELATIONSHIP SUMMARY
  AG-UI   transport layer — does NOT replace MCP or A2A
  A2UI    surface layer — travels inside AG-UI as CUSTOM event payload
  NLWeb   instances are MCP servers; their content is agent-discoverable
  MCP Apps = MCP servers that bundle UI resource components with tools
  OpenAI Apps SDK later standardized as part of the MCP Apps pattern
```

### 1.1 Protocol Responsibility Matrix

| Concern | AG-UI | A2UI | MCP | A2A | NLWeb | MCP Apps |
|---|---|---|---|---|---|---|
| Text streaming | Primary | No | No | No | No | No |
| Generative UI rendering | Carries payload | Primary definition | No | No | No | Renders alongside tool |
| Tool invocation (backend) | Event emission | No | Primary | No | No | Yes (bundled) |
| Tool invocation (frontend) | Primary | No | No | No | No | Yes |
| State synchronization | Primary | No | No | No | No | No |
| Agent-to-agent delegation | No | No | No | Primary | No | No |
| Human-in-the-loop | Primary | Via A2UI forms | No | No | No | Via approval gate |
| Web content querying | No | No | Via NLWeb MCP | No | Primary | No |
| Authentication / authorization | Transport-level | No | Primary | Scoped | MCP-inherited | Primary |
| Nested agent composition | Primary | No | No | Complementary | No | No |

---

## 2. AG-UI Deep Dive

AG-UI (Agent-User Interface Protocol) is an open, lightweight, event-based protocol that standardizes communication between AI agents and user-facing applications. It builds atop HTTP and WebSockets as an abstraction layer, handling the complexities of streaming intermediate agent work, nondeterministic execution behavior, and mixed structured/unstructured I/O.

**GitHub:** `ag-ui-protocol/ag-ui` (Apache 2.0)  
**First-party backend integrations:** LangGraph, CrewAI, Microsoft Agent Framework 1.0, Google ADK, AWS Strands, Bedrock AgentCore, Mastra, PydanticAI, Agno, LlamaIndex, AG2  
**In-progress backends:** OpenAI Agent SDK, Cloudflare Agents  
**First-party client:** CopilotKit  
**Additional clients:** React Native, Terminal clients  
**Additional SDKs:** Kotlin, Golang, Dart, Java, Rust; .NET and Nim in progress

### 2.1 Event Taxonomy

AG-UI communication is entirely event-driven. The server emits a stream of typed events; the client renders incrementally as events arrive. Every event carries a `type` field that determines how it is processed.

| Event Type | Direction | Purpose | Carries |
|---|---|---|---|
| `RUN_STARTED` | Server → Client | Signals that an agent run has begun | `run_id`, `thread_id`, metadata |
| `RUN_FINISHED` | Server → Client | Signals successful run completion | `run_id`, final status, timing |
| `RUN_ERROR` | Server → Client | Signals agent run failure | `run_id`, error code, message, retry hint |
| `STEP_STARTED` | Server → Client | A named agent step has begun | `step_name`, `step_id`, description |
| `STEP_FINISHED` | Server → Client | A named agent step has completed | `step_id`, duration, result summary |
| `TEXT_MESSAGE_START` | Server → Client | A new text message stream has started | `message_id`, role |
| `TEXT_MESSAGE_CONTENT` | Server → Client | Incremental text token delivery | `message_id`, `delta` (string) |
| `TEXT_MESSAGE_END` | Server → Client | Text message stream complete | `message_id`, full message summary |
| `TOOL_CALL_START` | Server → Client | Agent is about to call a tool | `tool_call_id`, `tool_name`, pause hint |
| `TOOL_CALL_ARGS` | Server → Client | Streaming tool call arguments | `tool_call_id`, `delta` (JSON string) |
| `TOOL_CALL_END` | Server → Client | Tool call arguments complete | `tool_call_id`, full args |
| `TOOL_CALL_RESULT` | Server → Client | Tool execution result | `tool_call_id`, result, error |
| `STATE_SNAPSHOT` | Server → Client | Full state store snapshot | Typed state object |
| `STATE_DELTA` | Server → Client | Incremental state update (JSON Patch RFC 6902) | `delta` (JSON Patch operations array) |
| `MESSAGES_SNAPSHOT` | Server → Client | Full conversation history snapshot | Messages array |
| `RAW` | Server → Client | Pass-through of raw backend data | Arbitrary payload (for debugging / custom use) |
| `CUSTOM` | Server → Client | Protocol extension point | Typed payload including A2UI surface definitions |

#### Event Ordering Guarantees

- Events within a single run arrive in causal order (TCP-ordered SSE stream)
- `TOOL_CALL_START` always precedes `TOOL_CALL_ARGS` for the same `tool_call_id`
- `TOOL_CALL_ARGS` events stream incrementally; `TOOL_CALL_END` marks completion
- `STATE_DELTA` events are applied in order; each produces a new consistent state
- `RUN_ERROR` may arrive at any point; client must handle it from any state

### 2.2 Transport Architecture

```text
AG-UI TRANSPORT MODEL

CLIENT                                    SERVER (Agent Backend)
   │                                              │
   │  POST /agent/run                             │
   │  {messages, state, context}                  │
   ├─────────────────────────────────────────────►│
   │                                              │
   │  HTTP 200 text/event-stream                  │
   │◄─────────────────────────────────────────────┤
   │                                              │
   │  data: {"type":"RUN_STARTED",...}            │
   │◄─────────────────────────────────────────────┤
   │                                              │
   │  data: {"type":"STEP_STARTED",...}           │
   │◄─────────────────────────────────────────────┤
   │                                              │
   │  data: {"type":"TEXT_MESSAGE_START",...}     │
   │◄─────────────────────────────────────────────┤
   │                                              │
   │  data: {"type":"TEXT_MESSAGE_CONTENT",...}   │ × N tokens
   │◄─────────────────────────────────────────────┤
   │                                              │
   │  data: {"type":"TOOL_CALL_START",...}        │
   │◄─────────────────────────────────────────────┤
   │                                              │
   │  [Client pauses if HITL gate triggered]      │
   │                                              │
   │  POST /agent/action                          │
   │  {"type":"approve","tool_call_id":"..."}     │
   ├─────────────────────────────────────────────►│
   │                                              │
   │  data: {"type":"TOOL_CALL_RESULT",...}       │
   │◄─────────────────────────────────────────────┤
   │                                              │
   │  data: {"type":"RUN_FINISHED",...}           │
   │◄─────────────────────────────────────────────┤
   │                                              │

ALTERNATIVE TRANSPORT: WebSocket (bidirectional, long-lived)
  Use for real-time bidirectional requirements (collaborative workspaces)
  SSE is preferred for standard request-response agentic patterns
  WebSocket required for multi-agent shared state with client-originated state writes
```

### 2.3 State Synchronization Model

AG-UI implements an event-sourced state synchronization model. The state store is a typed key-value structure. The agent emits `STATE_SNAPSHOT` to initialize state and `STATE_DELTA` for incremental updates. Deltas use JSON Patch (RFC 6902) format.

```text
STATE SYNCHRONIZATION MODEL

Agent Backend                        Client State Store
       │                                     │
       │  STATE_SNAPSHOT {                   │
       │    user: {name, role},              │
       │    task: {id, status, steps},       │
       │    context: {documents, refs}       │
       │  }                                  │
       ├────────────────────────────────────►│ replaces entire store
       │                                     │
       │  STATE_DELTA [                      │
       │    {"op":"replace",                 │
       │     "path":"/task/status",          │
       │     "value":"in_progress"}          │
       │  ]                                  │
       ├────────────────────────────────────►│ applies patch atomically
       │                                     │
       │  STATE_DELTA [                      │
       │    {"op":"add",                     │
       │     "path":"/task/steps/-",         │
       │     "value":{...}}                  │
       │  ]                                  │
       ├────────────────────────────────────►│ appends step
       │                                     │

CLIENT-TO-SERVER STATE WRITES
  Handled via POST /agent/action
  Actions include: {type: "state_update", path: "...", value: ...}
  Server validates and applies; re-emits STATE_DELTA to confirm
  Optimistic UI updates allowed with server-authoritative conflict resolution
```

### 2.4 Tool Lifecycle

AG-UI distinguishes two categories of tools:

| Category | Execution Location | Authorization | Streaming | Examples |
|---|---|---|---|---|
| **Backend Tools** | Agent backend (Python/Node/Java process) | Bearer token / mTLS from backend to tool | Results streamed via TOOL_CALL_RESULT | database query, API call, file read |
| **Frontend Tools** | Browser / mobile client | User's browser session credentials | Synchronous (result returned via POST /action) | camera access, local file read, user geolocation, clipboard |

```text
TOOL LIFECYCLE — BACKEND TOOL

Agent                     AG-UI Client              Tool API
  │                            │                        │
  │  TOOL_CALL_START            │                        │
  │  {name:"search_docs",       │                        │
  │   args:..., hitl:false}     │                        │
  ├───────────────────────────►│                        │
  │  [execute immediately]      │                        │
  ├───────────────────────────────────────────────────►│
  │                            │                        │ execute
  │◄───────────────────────────────────────────────────┤
  │  TOOL_CALL_RESULT           │                        │
  ├───────────────────────────►│                        │

TOOL LIFECYCLE — FRONTEND TOOL (with HITL)

Agent                     AG-UI Client              Browser API
  │                            │                        │
  │  TOOL_CALL_START            │                        │
  │  {name:"read_clipboard",    │                        │
  │   args:{}, hitl:true}       │                        │
  ├───────────────────────────►│                        │
  │                            │  [Approval UI shown]    │
  │                            │  User approves          │
  │                            ├───────────────────────►│
  │                            │◄───────────────────────┤
  │                            │  POST /agent/action     │
  │◄───────────────────────────┤  {type:"tool_result",  │
  │                            │   tool_call_id,result} │
  │  [continue execution]       │                        │
```

### 2.5 Generative UI Modes

AG-UI supports two modes of generative UI:

| Mode | How It Works | When to Use | A2UI Role |
|---|---|---|---|
| **Static / Typed** | Agent returns structured JSON matching a known component schema registered in the client | When the UI component library is predefined and agent selects from known options | Optional; can use bespoke schema |
| **Declarative / Dynamic** | Agent emits an A2UI JSON surface definition in a CUSTOM event; client renders the declared widget tree | When the agent determines the optimal UI surface for the current data and task at runtime | Primary carrier of A2UI payloads |

**Static Mode Example Flow:**

```text
Agent emits CUSTOM event:
{
  "type": "CUSTOM",
  "name": "generative_ui",
  "value": {
    "component": "ApprovalCard",      ← registered component name
    "props": {
      "title": "Invoice #4821",
      "amount": 94200.00,
      "vendor": "Acme Corp",
      "actions": ["approve", "reject", "request_info"]
    }
  }
}

Client looks up "ApprovalCard" in component registry → renders
```

**Declarative Mode (A2UI) Flow:**

```text
Agent emits CUSTOM event:
{
  "type": "CUSTOM",
  "name": "a2ui_surface",
  "value": {
    "type": "card",
    "title": "Invoice #4821",
    "body": [
      {"type": "table", "columns": [...], "rows": [...]},
      {"type": "action", "label": "Approve", "style": "primary"},
      {"type": "action", "label": "Reject", "style": "danger"}
    ]
  }
}

Client renders using host widget library → no component registry required
```

### 2.6 HITL Interrupts

AG-UI's HITL model supports five interrupt types:

| Interrupt Type | Trigger | Client Action Required | Agent Behavior |
|---|---|---|---|
| `pause` | `TOOL_CALL_START` with `hitl: true` | Display tool args, await user decision | Halts execution, holds connection open |
| `approve` | User clicks Approve | `POST /agent/action {"type":"approve","tool_call_id":"..."}` | Executes the tool call with original args |
| `edit` | User modifies tool args | `POST /agent/action {"type":"edit","tool_call_id":"...","args":{...}}` | Executes the tool call with modified args |
| `retry` | User requests retry with different approach | `POST /agent/action {"type":"retry","instruction":"..."}` | Agent re-plans the current step |
| `escalate` | User escalates to human agent | `POST /agent/action {"type":"escalate","reason":"..."}` | Run is suspended; escalation record created |

### 2.7 Nested Agent Composition

AG-UI supports nested agent composition with scoped state. A parent agent can delegate to a child agent, which opens its own AG-UI sub-stream with independently scoped state.

```text
NESTED AGENT COMPOSITION

User Interface
    │
    │  AG-UI stream (parent)
    ▼
Parent Agent (Orchestrator)
    │  AG-UI sub-stream (child 1, scoped state)
    ├──────────────────────────────────────────►  Research Agent
    │  AG-UI sub-stream (child 2, scoped state)
    ├──────────────────────────────────────────►  Drafting Agent
    │                                             │
    │  STATE_DELTA (merged from children)         │
    │◄─────────────────────────────────────────────┤
    │
    │  Aggregated output to parent AG-UI stream
    ▼
User Interface (sees unified progress)

State Scoping Rules:
  - Each child agent has its own STATE namespace
  - Parent can read child state via child stream STATE_SNAPSHOT
  - Children cannot read parent or sibling state directly
  - Parent merges child outputs explicitly before writing to parent STATE
```

### 2.8 Middleware Architecture

```text
AG-UI MIDDLEWARE CHAIN

Inbound Request
       │
       ▼
[Auth Middleware]         Validates Bearer/mTLS, extracts identity
       │
       ▼
[Rate Limit Middleware]   Per-user and per-tenant rate limiting
       │
       ▼
[Context Middleware]      Assembles context (memory, RAG, session history)
       │
       ▼
[Policy Middleware]       OPA/Cedar policy evaluation on request parameters
       │
       ▼
[Agent Runner]            Executes agent; emits AG-UI event stream
       │
       ▼
[Guardrail Middleware]    Filters outbound events (PII scrub, content safety)
       │
       ▼
[Observability Middleware] Attaches OTel spans to each event
       │
       ▼
[SSE Serializer]          Formats events as text/event-stream
       │
       ▼
Client

CopilotKit MCPAppsMiddleware sits between Agent Runner and Guardrail Middleware
  — intercepts TOOL_CALL_START events
  — resolves UI resources from MCP registry
  — emits CUSTOM a2ui_surface event before TOOL_CALL_RESULT
```

### 2.9 Security Model

| Security Concern | AG-UI Treatment | Enterprise Requirement |
|---|---|---|
| **Transport security** | TLS 1.3 required for all AG-UI connections | Mutual TLS for backend-to-agent connections |
| **Authentication** | Bearer token or API key in Authorization header | Short-lived JWTs with audience binding; OBO flow for delegated identity |
| **Event stream integrity** | SSE over TLS prevents tampering; no message-level signing in base spec | Add message signing for high-assurance contexts (see HMAC event signing pattern) |
| **State store access control** | Agent is authoritative; client reads only | Separate auth for client-initiated state writes |
| **Tool authorization** | Tool calls carry the agent's bearer token; tool API validates | Scoped tool tokens via MCP auth; Entra OBO for enterprise tools |
| **CUSTOM event injection** | No base-spec validation of CUSTOM payloads | Validate A2UI payloads against JSON Schema before rendering |
| **Prompt injection via tool results** | No base-spec protection | Implement output guardrails between TOOL_CALL_RESULT and TEXT_MESSAGE stream |
| **Rate limiting** | Not in base spec | Implement per-user token budget at middleware layer |
| **Audit logging** | Not in base spec | Emit all AG-UI events to append-only audit log with OTel correlation |

!!! warning "CUSTOM Event Injection Risk"
    A compromised tool API or malicious MCP server could inject arbitrary CUSTOM events into the AG-UI stream, including A2UI surfaces with fraudulent approval buttons. Always validate CUSTOM event payloads against registered schemas before rendering. Never render unvalidated declarative UI from untrusted sources.

### 2.10 Code Examples

=== "Python"

    ```python
    # Minimal AG-UI server in Python using FastAPI + asyncio
    # Dependencies: pip install fastapi uvicorn sse-starlette

    import asyncio
    import json
    import uuid
    from fastapi import FastAPI, Request
    from fastapi.responses import StreamingResponse
    from sse_starlette.sse import EventSourceResponse

    app = FastAPI()

    def make_event(event_type: str, data: dict) -> str:
        """Format a single AG-UI event as SSE data."""
        return f"data: {json.dumps({'type': event_type, **data})}\n\n"

    async def run_agent(messages: list, state: dict, run_id: str):
        """Generator: yields AG-UI events for a simple agent run."""

        # 1. Signal run start
        yield make_event("RUN_STARTED", {"run_id": run_id, "thread_id": "thread-001"})

        # 2. Signal planning step
        step_id = str(uuid.uuid4())
        yield make_event("STEP_STARTED", {
            "step_id": step_id,
            "step_name": "plan",
            "description": "Decomposing task"
        })

        # 3. Stream a text message
        msg_id = str(uuid.uuid4())
        yield make_event("TEXT_MESSAGE_START", {"message_id": msg_id, "role": "assistant"})
        for token in ["Analyzing ", "your request...\n"]:
            yield make_event("TEXT_MESSAGE_CONTENT", {"message_id": msg_id, "delta": token})
            await asyncio.sleep(0.05)
        yield make_event("TEXT_MESSAGE_END", {"message_id": msg_id})

        # 4. Emit a tool call (with HITL pause signal)
        tool_call_id = str(uuid.uuid4())
        tool_args = {"query": "Q3 revenue data", "date_range": "2026-01-01/2026-09-30"}
        yield make_event("TOOL_CALL_START", {
            "tool_call_id": tool_call_id,
            "tool_name": "query_data_warehouse",
            "hitl": True,           # signal frontend to pause for approval
            "args_preview": tool_args
        })
        # Stream args incrementally
        args_str = json.dumps(tool_args)
        yield make_event("TOOL_CALL_ARGS", {"tool_call_id": tool_call_id, "delta": args_str})
        yield make_event("TOOL_CALL_END", {"tool_call_id": tool_call_id})

        # 5. (Real implementation: wait for /agent/action approval before executing)
        # For demo: emit mock result
        yield make_event("TOOL_CALL_RESULT", {
            "tool_call_id": tool_call_id,
            "result": {"revenue": 4200000, "currency": "USD"}
        })

        # 6. Emit state delta
        yield make_event("STATE_DELTA", {
            "delta": [{"op": "replace", "path": "/task/status", "value": "complete"}]
        })

        # 7. Finish step and run
        yield make_event("STEP_FINISHED", {"step_id": step_id, "duration_ms": 1200})
        yield make_event("RUN_FINISHED", {"run_id": run_id, "status": "success"})

    @app.post("/agent/run")
    async def agent_run(request: Request):
        body = await request.json()
        run_id = str(uuid.uuid4())
        return EventSourceResponse(
            run_agent(
                messages=body.get("messages", []),
                state=body.get("state", {}),
                run_id=run_id
            )
        )

    @app.post("/agent/action")
    async def agent_action(request: Request):
        action = await request.json()
        # Real implementation: look up the pending run by tool_call_id
        # and resume or cancel based on action.type
        return {"status": "accepted", "action_type": action.get("type")}

    if __name__ == "__main__":
        import uvicorn
        uvicorn.run(app, host="0.0.0.0", port=8000)
    ```

=== "TypeScript"

    ```typescript
    // Minimal AG-UI server in TypeScript using Express + Node streams
    // Dependencies: npm install express @types/express

    import express, { Request, Response } from "express";
    import { randomUUID } from "crypto";

    const app = express();
    app.use(express.json());

    type AgUiEvent = { type: string; [key: string]: unknown };

    function sseEvent(res: Response, event: AgUiEvent): void {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    }

    async function sleep(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function runAgent(
      res: Response,
      messages: unknown[],
      state: Record<string, unknown>
    ): Promise<void> {
      const runId = randomUUID();
      const stepId = randomUUID();
      const msgId = randomUUID();
      const toolCallId = randomUUID();

      // 1. Run started
      sseEvent(res, { type: "RUN_STARTED", run_id: runId, thread_id: "thread-001" });

      // 2. Step started
      sseEvent(res, {
        type: "STEP_STARTED",
        step_id: stepId,
        step_name: "plan",
        description: "Decomposing task",
      });

      // 3. Stream text message
      sseEvent(res, { type: "TEXT_MESSAGE_START", message_id: msgId, role: "assistant" });
      for (const token of ["Analyzing ", "your request...\n"]) {
        sseEvent(res, { type: "TEXT_MESSAGE_CONTENT", message_id: msgId, delta: token });
        await sleep(50);
      }
      sseEvent(res, { type: "TEXT_MESSAGE_END", message_id: msgId });

      // 4. Tool call with HITL pause
      const toolArgs = { query: "Q3 revenue data", date_range: "2026-01-01/2026-09-30" };
      sseEvent(res, {
        type: "TOOL_CALL_START",
        tool_call_id: toolCallId,
        tool_name: "query_data_warehouse",
        hitl: true,
        args_preview: toolArgs,
      });
      sseEvent(res, {
        type: "TOOL_CALL_ARGS",
        tool_call_id: toolCallId,
        delta: JSON.stringify(toolArgs),
      });
      sseEvent(res, { type: "TOOL_CALL_END", tool_call_id: toolCallId });

      // 5. Mock tool result (real: await approval action)
      sseEvent(res, {
        type: "TOOL_CALL_RESULT",
        tool_call_id: toolCallId,
        result: { revenue: 4200000, currency: "USD" },
      });

      // 6. State delta
      sseEvent(res, {
        type: "STATE_DELTA",
        delta: [{ op: "replace", path: "/task/status", value: "complete" }],
      });

      // 7. Finish
      sseEvent(res, { type: "STEP_FINISHED", step_id: stepId, duration_ms: 1200 });
      sseEvent(res, { type: "RUN_FINISHED", run_id: runId, status: "success" });

      res.end();
    }

    app.post("/agent/run", (req: Request, res: Response) => {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();

      const { messages = [], state = {} } = req.body;
      runAgent(res, messages, state).catch((err) => {
        sseEvent(res, { type: "RUN_ERROR", message: String(err) });
        res.end();
      });
    });

    app.post("/agent/action", (req: Request, res: Response) => {
      const action = req.body;
      // Real: resume the pending run identified by action.tool_call_id
      res.json({ status: "accepted", action_type: action.type });
    });

    app.listen(8000, () => console.log("AG-UI server running on :8000"));
    ```

### 2.11 CopilotKit React Frontend Integration

=== "TypeScript"

    ```typescript
    // CopilotKit React frontend connecting to an AG-UI backend
    // Dependencies: npm install @copilotkit/react-ui @copilotkit/react-core @copilotkit/runtime

    import React from "react";
    import {
      CopilotKit,
      useCopilotAction,
      useCopilotReadable,
    } from "@copilotkit/react-core";
    import { CopilotSidebar } from "@copilotkit/react-ui";
    import "@copilotkit/react-ui/styles.css";

    // Root: wrap your app in CopilotKit pointing at your AG-UI backend
    export function App() {
      return (
        <CopilotKit runtimeUrl="/api/copilotkit" agent="my-agent">
          <CopilotSidebar
            defaultOpen={true}
            labels={{ title: "Enterprise AI Assistant" }}
          >
            <MainContent />
          </CopilotSidebar>
        </CopilotKit>
      );
    }

    // Example: expose app state to the agent (readable context)
    function MainContent() {
      const [invoices, setInvoices] = React.useState<Invoice[]>([]);

      // Make invoices readable by the agent
      useCopilotReadable({
        description: "Current invoice queue awaiting approval",
        value: invoices,
      });

      // Register a frontend tool the agent can call
      useCopilotAction({
        name: "approve_invoice",
        description: "Approve an invoice from the current queue",
        parameters: [
          { name: "invoice_id", type: "string", description: "Invoice identifier" },
          { name: "comment", type: "string", description: "Approval comment" },
        ],
        // HITL: render = present UI before executing
        render: ({ args, status, result }) => (
          <ApprovalCard
            args={args}
            status={status}
            onApprove={() => { /* trigger approve */ }}
            onReject={() => { /* trigger reject */ }}
          />
        ),
        handler: async ({ invoice_id, comment }) => {
          // Called only after user approves in the render panel
          const result = await fetch(`/api/invoices/${invoice_id}/approve`, {
            method: "POST",
            body: JSON.stringify({ comment }),
          });
          return result.json();
        },
      });

      return <InvoiceList invoices={invoices} />;
    }

    interface Invoice { id: string; vendor: string; amount: number; }
    function InvoiceList({ invoices }: { invoices: Invoice[] }) {
      return <div>{invoices.map(i => <div key={i.id}>{i.vendor}: ${i.amount}</div>)}</div>;
    }
    function ApprovalCard({ args, status, onApprove, onReject }: any) {
      return (
        <div className="approval-card">
          <p>Approve invoice {args?.invoice_id}?</p>
          <button onClick={onApprove}>Approve</button>
          <button onClick={onReject}>Reject</button>
        </div>
      );
    }
    ```

---

## 3. A2UI Deep Dive (v0.9)

A2UI (Agent-to-UI) is a declarative specification developed by Google for generative UI. An agent emits JSON describing UI surfaces; the frontend renders those surfaces using its native component library. A2UI is part of the Oracle Open Agent Spec three-layer model.

**Status:** v0.9 — experimental as of July 2026, not yet GA  
**Origin:** Google  
**Transport:** Carried inside AG-UI CUSTOM events  
**Design Philosophy:** Safe (no arbitrary code execution), declarative (fully described by JSON schema), framework-agnostic (identical JSON renders on web, mobile, and desktop)

### 3.1 Design Philosophy

| Principle | Implementation | What It Prevents |
|---|---|---|
| **No arbitrary code execution** | A2UI widgets are JSON data, never executable code | XSS, code injection through generative UI surfaces |
| **Schema validation required** | Every A2UI payload must validate against the A2UI JSON Schema before rendering | Malformed or malicious widget trees reaching the render layer |
| **Framework-agnostic** | A2UI defines widget semantics, not implementation; each host renders with native components | Vendor lock-in; enables same agent to target web, mobile, and desktop |
| **Declarative over imperative** | Widgets describe WHAT to show, not HOW to show it | Non-portable rendering logic embedded in agent output |
| **Safe defaults** | Unknown widget types are rendered as text fallbacks | Breaking changes in A2UI spec versions do not crash existing clients |

### 3.2 Widget Catalog

| Widget Type | Description | Key Properties | Renders As |
|---|---|---|---|
| `text` | Styled text block | `content`, `style` (heading/body/caption/code), `markdown` (bool) | Paragraph, heading, code block |
| `form` | Data collection form | `fields` (array), `submit_label`, `validation_rules` | Native form with labeled inputs |
| `table` | Tabular data display | `columns` (array), `rows` (array), `sortable` (bool), `filterable` (bool) | Data grid |
| `chart` | Data visualization | `chart_type` (bar/line/pie/scatter), `data`, `axis_labels` | Chart rendered by host library |
| `card` | Summary card with optional actions | `title`, `body` (widgets array), `actions` (array) | Card component |
| `carousel` | Swipeable card collection | `items` (array of cards), `orientation` | Horizontal/vertical scroller |
| `action` | Button or action trigger | `label`, `style` (primary/secondary/danger/ghost), `action_type` (approve/reject/navigate/custom), `payload` | Button |
| `progress` | Step progress indicator | `steps` (array), `current_step`, `style` (linear/circular/stepper) | Progress bar or stepper |
| `badge` | Status indicator | `text`, `color`, `icon` | Chip/tag |
| `divider` | Visual separator | `style` (horizontal/vertical), `weight` | HR or vertical rule |
| `image` | Image display | `url`, `alt`, `width`, `height` | Img element (URL must be allowlisted) |
| `link` | Hyperlink | `href`, `label`, `external` (bool) | Anchor (external links open new tab) |

### 3.3 JSON Schema Reference

```json
{
  "$schema": "https://a2ui.dev/schema/v0.9/surface.json",
  "type": "object",
  "required": ["type"],
  "properties": {
    "type": {
      "type": "string",
      "enum": ["text","form","table","chart","card","carousel","action",
               "progress","badge","divider","image","link"]
    },
    "id": { "type": "string" },
    "title": { "type": "string" },
    "style": { "type": "string" },
    "body": {
      "type": "array",
      "items": { "$ref": "#" }
    },
    "fields": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "type"],
        "properties": {
          "name": { "type": "string" },
          "type": { "type": "string", "enum": ["text","number","date","select","multiselect","checkbox","textarea"] },
          "label": { "type": "string" },
          "required": { "type": "boolean" },
          "options": { "type": "array", "items": { "type": "string" } },
          "validation": { "type": "object" }
        }
      }
    },
    "columns": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["key", "label"],
        "properties": {
          "key": { "type": "string" },
          "label": { "type": "string" },
          "sortable": { "type": "boolean" },
          "type": { "type": "string", "enum": ["text","number","date","currency","badge","link"] }
        }
      }
    },
    "rows": {
      "type": "array",
      "items": { "type": "object" }
    },
    "actions": {
      "type": "array",
      "items": { "$ref": "#" }
    }
  }
}
```

### 3.4 A2UI vs. Comparable Technologies

| Dimension | A2UI v0.9 | React Server Components | JSON Schema Form | OpenAI Tool Cards |
|---|---|---|---|---|
| **Execution model** | Pure declarative JSON, no execution | Server renders React components (JSX) | JSON Schema drives form generation | JSON definition, platform renders |
| **Arbitrary code** | Prohibited by design | Yes (server-side React) | Limited (validators) | No |
| **Framework dependency** | None (host renders with native widgets) | React (Next.js / Remix) | Various libraries | OpenAI platform |
| **Mobile support** | Yes (same JSON, different renderer) | Limited (RN not standard) | Library-dependent | No (web only) |
| **Widget completeness** | Forms, tables, charts, cards, actions | Arbitrary (full React) | Forms only | Card with two actions |
| **Agent-native** | Yes (designed for LLM output) | No (designed for web rendering) | No (designed for form generation) | Yes (designed for tool approval) |
| **Streaming** | Yes (A2UI travels in AG-UI stream) | Partial (server streaming) | No | No |
| **GA status** | v0.9 experimental | Production (Next.js 14+) | Production (various libs) | Production |
| **Validation** | JSON Schema required | TypeScript type checking | JSON Schema | Platform-enforced |

**Choose A2UI when:**

- The agent must render task-appropriate UI components dynamically without predefined templates
- The same agent output must be rendered across web, mobile, and desktop natively
- Arbitrary code execution in generative UI is a security concern
- The organization is building on top of AG-UI and wants a standardized declarative surface format

**Choose React Server Components when:**

- The application is React/Next.js exclusively; mobile is not a requirement
- Rich interactive server-rendered components are needed beyond A2UI's widget catalog
- The team has strong React expertise and wants maximum rendering flexibility

**Choose JSON Schema Form when:**

- The sole requirement is dynamic form generation from a schema
- A2UI's full widget catalog is not needed

### 3.5 Production Readiness Assessment (July 2026)

| Criterion | Status | Notes |
|---|---|---|
| Schema stability | Low — v0.9 is pre-GA | Breaking schema changes expected before 1.0 |
| Widget coverage | Moderate — 12 widget types | Charts require host library integration |
| Accessibility | Partial — spec mentions ARIA roles | No conformance certification yet |
| Performance | Good — pure JSON, lightweight | No rendering performance guarantees in spec |
| Security audit | Not yet completed | Formal security review scheduled for 1.0 |
| Browser support | Host-dependent | Spec does not define minimum browser targets |
| Mobile support | Theoretical — no reference mobile renderer | Requires per-platform implementation |

!!! warning "A2UI v0.9 — Use with Caution in Production"
    A2UI is experimental. For production enterprise deployments, either implement static/typed generative UI (using AG-UI CUSTOM events with your own component registry) or adopt A2UI with explicit version pinning and a migration plan for the 1.0 breaking changes.

---

## 4. MCP Apps

MCP Apps is an architectural pattern (originally standardized through CopilotKit and the OpenAI Apps SDK ecosystem) where MCP servers expose tools WITH associated UI resources bundled alongside them. When an agent calls a tool from an MCP App server, the frontend automatically fetches and renders the corresponding UI component.

### 4.1 Architecture

```text
MCP APPS ARCHITECTURE

┌──────────────────────────────────────────────────────────────┐
│  MCP App Server                                             │
│                                                            │
│  ┌─────────────────┐    ┌───────────────────────────────┐  │
│  │ Tool Definitions │    │ UI Resources                  │  │
│  │                 │    │                               │  │
│  │  get_invoice    │◄──►│  InvoiceCard.tsx (React)      │  │
│  │  approve_invoice│◄──►│  ApprovalPanel.tsx (React)    │  │
│  │  query_spend    │◄──►│  SpendChart.tsx (React)       │  │
│  │  create_order   │◄──►│  OrderForm.tsx (React)        │  │
│  └─────────────────┘    └───────────────────────────────┘  │
│                                                            │
│  Exposes via MCP protocol:                                 │
│  - tools/list → tool definitions                          │
│  - tools/call → tool execution results                    │
│  - resources/list → UI resource URLs                       │
│  - resources/read → UI component code                      │
└──────────────────────────────────────────────────────────────┘
         ▲                              ▲
         │ Tool calls                   │ UI resource fetch
         │                              │
┌────────┴────────┐          ┌──────────┴────────────────────┐
│ Agent Backend   │          │ CopilotKit MCPAppsMiddleware  │
│                 │          │                               │
│ Calls MCP tools │          │ Intercepts TOOL_CALL_START    │
│ Receives results│          │ Looks up UI resource for tool │
│ Emits AG-UI     │          │ Fetches component code        │
│ events          │          │ Emits CUSTOM a2ui_surface evt │
└─────────────────┘          └───────────────────────────────┘
```

### 4.2 Frontend Tool Execution Lifecycle

```text
MCP APPS TOOL EXECUTION — STEP BY STEP

1. Agent calls tool "approve_invoice" via MCP
2. MCPAppsMiddleware intercepts TOOL_CALL_START
3. Middleware looks up "approve_invoice" in MCP resource registry
4. Middleware fetches InvoiceApprovalPanel.tsx from MCP server
5. Middleware emits CUSTOM event {type:"mcp_app_ui", component: <code>, props: <tool_args>}
6. CopilotKit client receives CUSTOM event
7. Client renders InvoiceApprovalPanel with tool args as props
8. User interacts with the panel (approve / reject / modify)
9. Client POSTs action to /agent/action: {type:"tool_result", result: {approved: true}}
10. Agent receives tool result; continues execution
```

### 4.3 MCP Apps Security Model

| Security Layer | Implementation | Enterprise Requirement |
|---|---|---|
| **UI resource sandboxing** | Components run in sandboxed iframe or isolated renderer | Content Security Policy; no access to parent DOM |
| **Component signing** | MCP server should sign UI resource bundles | Verify signature before rendering (not yet standard) |
| **Approval gate enforcement** | MCPAppsMiddleware enforces HITL for tools marked `requires_approval: true` | Cannot be bypassed by agent instruction |
| **Tool scope limiting** | Each MCP App server exposes only the tools it owns | MCP registry enforces per-server tool namespace |
| **Audit record** | Every tool call + UI interaction logged with correlation ID | OTel trace spans; append-only audit log |

### 4.4 Enterprise MCP Registry Pattern

For organizations operating multiple MCP App servers, a centralized registry provides discovery, governance, and access control:

```text
ENTERPRISE MCP APP REGISTRY

             Tool Discovery Request
                      │
                      ▼
          ┌───────────────────────┐
          │ MCP Registry Service  │
          │                       │
          │  Tool catalog         │
          │  Server health        │
          │  Access policy        │
          │  Rate limit config    │
          │  Audit routing        │
          └──────────┬────────────┘
                     │
        ┌────────────┼──────────────┐
        │            │              │
   ┌────▼────┐  ┌────▼────┐  ┌────▼────┐
   │MCP App  │  │MCP App  │  │MCP App  │
   │Finance  │  │HR       │  │Legal    │
   │Server   │  │Server   │  │Server   │
   └─────────┘  └─────────┘  └─────────┘

Policy enforced at registry:
  - Role-based server access (Finance team → Finance MCP only)
  - Data classification gates (PII tools require DLP approval)
  - Rate limiting per team per server
  - Versioned tool routing (canary 10% to v2, 90% to v1)
```

### 4.5 Code Example: Minimal MCP App Server

=== "Python"

    ```python
    # Minimal MCP App server with bundled UI resource
    # Dependencies: pip install mcp fastapi uvicorn

    from mcp.server.fastmcp import FastMCP
    from pathlib import Path

    mcp = FastMCP("invoice-approval-mcp-app")

    # Define a tool
    @mcp.tool()
    def get_invoice(invoice_id: str) -> dict:
        """Retrieve invoice details for review."""
        # Real: fetch from ERP / finance system
        return {
            "id": invoice_id,
            "vendor": "Acme Corp",
            "amount": 94200.00,
            "currency": "USD",
            "line_items": [
                {"desc": "Cloud services", "amount": 80000},
                {"desc": "Support", "amount": 14200}
            ]
        }

    @mcp.tool()
    def approve_invoice(invoice_id: str, approved_by: str, comment: str) -> dict:
        """Approve an invoice after human review."""
        # Real: call finance API; create audit record
        return {"status": "approved", "invoice_id": invoice_id, "approved_by": approved_by}

    # Register UI resources alongside tools
    # The MCP Apps middleware fetches these and renders them when tools are called
    @mcp.resource("ui://approve_invoice")
    def invoice_approval_ui() -> str:
        """React component for invoice approval UI."""
        return Path("components/InvoiceApprovalPanel.tsx").read_text()

    @mcp.resource("ui://get_invoice")
    def invoice_display_ui() -> str:
        """React component for invoice display."""
        return Path("components/InvoiceCard.tsx").read_text()

    if __name__ == "__main__":
        mcp.run(transport="streamable-http", host="0.0.0.0", port=9000)
    ```

---

## 5. NLWeb

NLWeb is a Microsoft open project that makes any website queryable via natural language. It uses Schema.org markup, RSS feeds, and existing semi-structured web data as a knowledge source, adds vector search and an LLM query layer, and exposes the result via natural language API. Every NLWeb instance is simultaneously an MCP server, making website content discoverable by AI agents.

**GitHub:** `nlweb-ai/NLWeb` (MIT)  
**Reference implementation:** Python  
**Vision:** "Play a similar role to HTML in the emerging agentic web"  
**Cloudflare integration:** Native NLWeb support via AutoRAG (added early 2026)

### 5.1 Architecture

```text
NLWEB ARCHITECTURE

External Agent / User
        │  Natural language query
        │  "What are your refund policies for software subscriptions?"
        ▼
┌───────────────────────────────────────────────────────────────┐
│  NLWeb Query Layer                                           │
│                                                              │
│  1. Parse intent from natural language                       │
│  2. Extract structured filters (Schema.org entity types)     │
│  3. Vector search over indexed content                       │
│  4. LLM synthesis of relevant chunks                         │
│  5. Return grounded answer with source citations             │
└────────────────────┬──────────────────────────────────────────┘
                     │ reads from
        ┌────────────┴─────────────────┐
        │                              │
┌───────▼─────────┐         ┌─────────▼────────────────────────┐
│ Vector Index    │         │ Schema.org / RSS Source Data     │
│ (chunked site   │         │                                  │
│  content)       │         │ Existing website HTML            │
│                 │         │ Schema.org JSON-LD               │
│                 │         │ RSS/Atom feeds                   │
└─────────────────┘         │ Product catalogs, docs, FAQs     │
                            └──────────────────────────────────┘

ALSO EXPOSES:
  MCP server endpoint → tools: search_content, get_page, list_topics
  Every NLWeb instance is discoverable by agents as an MCP server
  Cloudflare AutoRAG uses NLWeb pattern for native edge-hosted deployment
```

### 5.2 Cloudflare AutoRAG Integration

Cloudflare added native NLWeb support via AutoRAG in early 2026. This allows any Cloudflare-hosted website to become an NLWeb-compatible MCP server without self-hosting infrastructure:

| Deployment Model | Setup | Scalability | Cost | Governance |
|---|---|---|---|---|
| **Self-hosted NLWeb (Python)** | Clone repo, configure data sources, deploy | Manual scaling | Self-managed | Full control |
| **Cloudflare AutoRAG** | Enable in Cloudflare dashboard, point at content | Auto-scaling (Cloudflare edge) | Usage-based | Cloudflare data processing |
| **Azure AI Search + NLWeb adapter** | Custom integration | Enterprise-scale | Azure consumption | Azure governance |

### 5.3 NLWeb vs. Competing Approaches

| Approach | Query Type | Data Source | Setup Complexity | Agent Integration | Governance |
|---|---|---|---|---|---|
| **NLWeb** | Natural language | Existing website content (Schema.org/RSS) | Low (uses existing markup) | Native MCP server | Content owner controlled |
| **Custom RAG** | Natural language | Any document corpus | High (ingestion, chunking, embedding) | Requires MCP wrapper | Fully custom |
| **Azure AI Search** | Keyword + semantic | Enterprise documents | Medium (index configuration) | Requires MCP wrapper | Microsoft/enterprise |
| **Enterprise portal (SharePoint)** | Keyword | SharePoint content | Low (built-in) | Requires Copilot plugin | Microsoft 365 governance |
| **Knowledge assistant (Guru, Confluence AI)** | Natural language | Internal wiki content | Low | Vendor-specific | Vendor governed |

**Choose NLWeb when:**

- The organization has an existing public-facing website with Schema.org markup or RSS
- The goal is to make existing web content queryable by AI agents without rebuilding the knowledge base
- Low-friction agent integration (every NLWeb instance is already an MCP server) is a priority
- The Cloudflare AutoRAG deployment model is acceptable for the data classification

**Choose Custom RAG when:**

- The knowledge base contains proprietary enterprise documents not suitable for a public-facing NLWeb instance
- Fine-grained access control per document/chunk is required
- The organization requires specific embedding models or retrieval strategies
- Compliance requirements prohibit processing through third-party infrastructure (Cloudflare)

**Do not use NLWeb when:**

- The content is classified or subject to regulatory data residency requirements
- The content is not already in a semi-structured form (Schema.org, RSS, HTML)
- Real-time data (stock prices, live inventory) is required — NLWeb is search-based, not live-query

### 5.4 Governance Considerations

!!! warning "Public Exposure Risk"
    Every NLWeb instance is, by design, publicly queryable as an MCP server. This makes previously navigational-only website content fully extractable by any agent that discovers the MCP endpoint. Organizations must review their website content against data classification policies before enabling NLWeb.

| Governance Concern | Mitigation |
|---|---|
| Unintended data exposure | Audit all content indexed by NLWeb before enabling; use `noindex` meta tags for excluded content |
| Rate limit abuse | Implement per-caller rate limiting at the MCP server layer |
| Data freshness | Configure crawl/re-index frequency; stale content may produce incorrect agent responses |
| Competitive intelligence extraction | NLWeb makes structured extraction trivial; ensure no proprietary information is on the indexed website |
| PII in web content | Scan website content for PII before indexing; NLWeb does not automatically redact |

---

## 6. OpenAI Apps SDK

The OpenAI Apps SDK was an early standardization of the MCP Apps pattern, using JSON-RPC 2.0 over the browser's `postMessage` API as the transport layer between the host application and the AI-powered app component.

### 6.1 Architecture

```text
OPENAI APPS SDK ARCHITECTURE

Browser Host Application
├── iFrame sandbox (CSP-isolated)
│   ├── OpenAI App Component (React/Web Component)
│   │   └── Uses openai/apps-sdk-ui: Button, Card, Input, Layout
│   └── Communicates via postMessage (JSON-RPC 2.0)
│
└── Host Bridge
    ├── Receives tool-input notifications from app
    ├── Delivers tool results after user approval
    └── Enforces content security policy
```

### 6.2 JSON-RPC 2.0 Transport

| Method | Direction | Purpose |
|---|---|---|
| `ui/render` | App → Host | Request rendering of a UI component |
| `ui/notifications/tool-input` | Host → App | Deliver user-approved tool arguments |
| `tools/execute` | App → Host | Request tool execution |
| `tools/result` | Host → App | Deliver tool execution result |
| `user/approve` | Host → App | Signal user approval of a tool call |
| `user/reject` | Host → App | Signal user rejection |

### 6.3 Card UI Model

OpenAI Apps SDK cards support:

- **Title** — string
- **Body** — rich text or structured data
- **Up to two primary actions:** each action is either a conversation turn or a tool call
- **Metadata** — key-value pairs displayed below card body

The two-action limit was a deliberate UX constraint: avoid decision paralysis on approval cards.

### 6.4 Approval Flow

```text
OPENAI APPS SDK APPROVAL FLOW

1. Agent proposes tool call
2. Host receives tool call arguments
3. Host delivers args via ui/notifications/tool-input to the app component
4. App renders an approval card with the proposed args
5. User approves or rejects in the card UI
6. App notifies host of user decision
7. Host either executes the tool (approve) or cancels (reject)
8. Host delivers result via tools/result to app
```

### 6.5 Relationship to MCP Apps

The OpenAI Apps SDK pattern (tool + UI bundle in a sandboxed component, approval gate required) was the precursor to the MCP Apps specification. Organizations using the OpenAI Apps SDK should plan migration to the MCP Apps standard when it reaches full production maturity, as MCP Apps provides:

- Protocol standardization across vendors (not OpenAI-specific)
- Native AG-UI integration (no postMessage bridge required)
- Richer widget catalog (A2UI) vs. fixed card schema
- Centralized enterprise MCP registry support

---

## 7. Microsoft Agent Framework 1.0

Microsoft Agent Framework 1.0 was released in April 2026 as a production-ready multi-agent orchestration framework for Python and .NET. It includes first-party AG-UI integration via the `HttpAgent` endpoint pattern.

### 7.1 Core Capabilities

| Capability | Python SDK | .NET SDK |
|---|---|---|
| Multi-agent orchestration | Yes | Yes |
| Multi-provider model support | Yes (Azure OpenAI, OpenAI, Anthropic, Bedrock) | Yes |
| AG-UI transport (HttpAgent) | Yes | Yes |
| SSE streaming | Yes | Yes |
| HITL interrupt support | Yes | Yes |
| Azure managed identity | Yes | Yes |
| OpenTelemetry integration | Yes | Yes |
| Enterprise SLA | Yes (Azure support) | Yes |

### 7.2 AG-UI Integration Pattern

```text
MICROSOFT AGENT FRAMEWORK + AG-UI + COPILOTKIT

┌──────────────────────────────────────────────────────────────┐
│  React Frontend (CopilotKit)                                │
│  <CopilotKit runtimeUrl="/api/copilotkit">                  │
└────────────────────┬─────────────────────────────────────────┘
                     │  AG-UI (SSE stream)
┌────────────────────▼─────────────────────────────────────────┐
│  HttpAgent Endpoint                                         │
│  (Microsoft Agent Framework 1.0)                           │
│                                                             │
│  Maps CopilotKit messages → Agent Framework messages        │
│  Maps Agent Framework events → AG-UI events                 │
│  Handles HITL pause/approve/reject via action endpoint      │
└────────────────────┬─────────────────────────────────────────┘
                     │  Internal agent bus
┌────────────────────▼─────────────────────────────────────────┐
│  Agent Orchestrator (Agent Framework 1.0)                  │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │
│  │ Research    │  │ Analysis    │  │ Report Writing       │ │
│  │ Agent       │  │ Agent       │  │ Agent                │ │
│  └─────────────┘  └─────────────┘  └──────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 7.3 Azure Deployment Targets

| Target | Use Case | AG-UI Connectivity | Scale |
|---|---|---|---|
| **Azure App Service** | Simple HTTP agent endpoint | Direct HTTPS + SSE | Up to 10 concurrent runs per instance |
| **Azure Container Apps** | Microservices architecture | Ingress controller + SSE | Auto-scale to zero; KEDA event-driven |
| **Azure Kubernetes Service (AKS)** | High-scale enterprise | Nginx ingress + SSE | Unlimited with HPA; best for >100 concurrent |
| **Azure Functions** | Event-driven agent triggers | HTTP trigger + SSE | Cold start latency; use Premium plan for SSE |

### 7.4 Code Example: Agent Framework with AG-UI

=== "Python"

    ```python
    # Microsoft Agent Framework 1.0 + AG-UI HttpAgent
    # pip install microsoft-agent-framework copilotkit-runtime

    from microsoft_agent_framework import (
        AgentApplication, Agent, HttpAgentEndpoint, AgentRunContext
    )
    from microsoft_agent_framework.ag_ui import AGUIAdapter
    from opentelemetry import trace

    tracer = trace.get_tracer("my-agent")

    # Define a specialized agent
    class ResearchAgent(Agent):
        name = "research_agent"
        description = "Searches internal knowledge base and external sources"

        async def run(self, ctx: AgentRunContext) -> str:
            with tracer.start_as_current_span("research_agent.run"):
                # Access AG-UI streaming context
                await ctx.emit_step("research", "Searching knowledge base")
                results = await ctx.call_tool("search_kb", query=ctx.goal)
                await ctx.emit_step_complete("research", f"Found {len(results)} results")
                return "\n".join(r["summary"] for r in results)

    # Orchestrator agent
    class OrchestratorAgent(Agent):
        name = "orchestrator"
        sub_agents = [ResearchAgent()]

        async def run(self, ctx: AgentRunContext) -> str:
            # Delegate to research agent via A2A
            research_result = await ctx.delegate(
                agent="research_agent",
                goal=ctx.goal,
                scoped_state={"session_id": ctx.session_id}
            )
            # Continue with analysis...
            return f"Analysis based on: {research_result}"

    # Create AG-UI-compatible HTTP endpoint
    app = AgentApplication()
    app.register(OrchestratorAgent())

    endpoint = HttpAgentEndpoint(
        app=app,
        adapter=AGUIAdapter(),
        hitl_tools=["write_report", "send_email"],  # tools requiring approval
        auth_provider="azure_managed_identity"
    )

    # Mount as FastAPI endpoint
    from fastapi import FastAPI
    api = FastAPI()
    api.include_router(endpoint.router, prefix="/agent")

    # Deploy with: uvicorn main:api --host 0.0.0.0 --port 8080
    ```

---

## 8. Framework Comparison Matrix

The following matrix covers 15 frameworks and protocols relevant to enterprise agentic UI architecture. Enterprise Readiness (L1–L5) is assessed across: production deployments, enterprise SLA, governance tooling, security certifications, and multi-tenant support.

| Framework / Protocol | Protocol | Frontend Framework | Backend Framework | Streaming | Generative UI | HITL Support | MCP Compatible | A2A Compatible | Enterprise Readiness | License | Maturity |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **AG-UI** | AG-UI (own) | Any | Any | Native (SSE) | Yes (static + A2UI) | Native (pause/approve/edit/retry) | Complementary | Complementary | L4 | Apache 2.0 | Production |
| **CopilotKit** | AG-UI | React (primary) | Any AG-UI backend | AG-UI stream | Yes (component registry + A2UI) | Yes (useCopilotAction render) | Yes (MCPAppsMiddleware) | Via orchestrator | L4 | MIT | Production |
| **A2UI** | Carried in AG-UI | Host-rendered | AG-UI backend | Via AG-UI | Native (is the spec) | Via AG-UI | No | No | L2 (v0.9 experimental) | Google | Experimental |
| **NLWeb** | MCP (as server) | N/A (query API) | Python | No | No | No | Native (IS MCP server) | No | L3 | MIT | Production |
| **OpenAI Apps SDK** | JSON-RPC 2.0/postMessage | React | OpenAI platform | No (postMessage) | Card UI | Yes (approval gate) | Evolving → MCP Apps | No | L3 | MIT | Production |
| **Microsoft Agent Framework 1.0** | AG-UI (HttpAgent) | CopilotKit (via AG-UI) | Python, .NET | AG-UI SSE | Via AG-UI + A2UI | AG-UI HITL | Yes | Yes (A2A) | L5 | MIT | Production (Apr 2026) |
| **Vercel AI SDK** | Streaming (custom) | React/Next.js | Node.js | Yes (RSC + stream) | React Server Components | Partial (no standard) | Partial | No | L3 | Apache 2.0 | Production |
| **LangGraph** | AG-UI (1st party) | CopilotKit (via AG-UI) | Python, JS | AG-UI native | Via AG-UI | Via AG-UI | Yes | Yes | L4 | MIT | Production |
| **Semantic Kernel** | AG-UI (planned) | .NET/Python | .NET, Python | Partial | Partial (plugin UI) | Manual implementation | Yes | Partial | L4 | MIT | Production |
| **AutoGen / AG2** | AG-UI (1st party) | CopilotKit (via AG-UI) | Python | AG-UI native | Via AG-UI | Via AG-UI | Yes | Yes | L3 | MIT | Production |
| **CrewAI** | AG-UI (1st party) | CopilotKit (via AG-UI) | Python | AG-UI native | Via AG-UI | Via AG-UI | Yes | Yes | L3 | MIT | Production |
| **Agno** | AG-UI (1st party) | CopilotKit (via AG-UI) | Python | AG-UI native | Via AG-UI | Via AG-UI | Yes | No | L2 | Apache 2.0 | Beta |
| **Mastra** | AG-UI (1st party) | CopilotKit (via AG-UI) | TypeScript | AG-UI native | Via AG-UI | Via AG-UI | Yes | No | L2 | Apache 2.0 | Beta |
| **PydanticAI** | AG-UI (1st party) | CopilotKit (via AG-UI) | Python | AG-UI native | Via AG-UI | Via AG-UI | Yes | No | L3 | MIT | Production |
| **Google ADK** | AG-UI (1st party) + A2UI | Any (via AG-UI) | Python | AG-UI native | A2UI native | Via AG-UI | Yes | Yes (A2A native) | L4 | Apache 2.0 | Production |

**Enterprise Readiness Scale:**  
L1 = Proof of concept only · L2 = Experimental / early adopter · L3 = Production-ready, limited enterprise features · L4 = Production-ready, enterprise features (SLA, governance, multi-tenant) · L5 = Enterprise-grade, certified, full lifecycle support

---

## 9. Decision Tree: Which Protocol or Framework Should I Choose?

```text
AGENTIC UI PROTOCOL / FRAMEWORK SELECTION

START
  │
  ▼
Do you need to stream agent output to a user interface in real time?
  │              │
 YES             NO
  │              │
  ▼              ▼
Does the        Consider batch / async
interface       agent pattern; AG-UI
need dynamic    not required
UI components?
  │
 YES ─────────────── NO
  │                   │
  ▼                   ▼
Is the UI surface   AG-UI with TEXT_MESSAGE
determined by the   streaming only;
agent at runtime?   framework: LangGraph,
                    CrewAI, or PydanticAI
  │
 YES ─── NO
  │        │
  ▼        ▼
Consider   Use static component
A2UI       registry in AG-UI CUSTOM
(v0.9 exp) events (typed generative UI)

CONTINUING FROM AG-UI CONFIRMED:
  │
  ▼
What is your primary backend ecosystem?
  │
  ├── Python only           → LangGraph, CrewAI, PydanticAI, Agno
  ├── .NET / C#             → Microsoft Agent Framework 1.0, Semantic Kernel
  ├── TypeScript / Node.js  → Mastra, Vercel AI SDK (partial AG-UI)
  ├── Multi-language        → Microsoft Agent Framework 1.0 (Python + .NET)
  └── Cloud-managed         → AWS Bedrock AgentCore (AG-UI native)
  │
  ▼
What are your HITL requirements?
  │
  ├── Formal approval workflow (named approver, audit trail, timeout)
  │   → CopilotKit + AG-UI with useCopilotAction render
  │   → Microsoft Agent Framework 1.0 HITL tools
  │
  ├── Simple yes/no approval
  │   → Any AG-UI framework with TOOL_CALL_START hitl:true
  │
  └── No HITL needed
      → Any AG-UI framework; HOTL monitoring via OTel
  │
  ▼
Do you need MCP tool integration?
  │
  ├── YES: tools with bundled UI
  │   → CopilotKit MCPAppsMiddleware
  │   → Register tools on MCP App servers
  │
  ├── YES: tools without bundled UI
  │   → Any MCP-compatible AG-UI backend
  │   → LangGraph, Mastra, PydanticAI all have 1st-party MCP support
  │
  └── NO
      → Direct tool calling in chosen framework
  │
  ▼
Enterprise readiness requirements?
  │
  ├── L5 required (Azure SLA, certified, .NET+Python)
  │   → Microsoft Agent Framework 1.0
  │
  ├── L4 required (production, multi-tenant, governance tooling)
  │   → LangGraph + CopilotKit + AG-UI
  │   → Google ADK + A2UI (if Google ecosystem)
  │
  ├── L3 required (production, basic enterprise)
  │   → PydanticAI, CrewAI, AutoGen/AG2
  │
  └── L2 acceptable (beta, growing project)
      → Agno, Mastra

SPECIAL CASES:
  Making website content agent-queryable? → NLWeb
  Cloudflare-hosted content?              → Cloudflare AutoRAG (NLWeb pattern)
  OpenAI platform existing investment?    → OpenAI Apps SDK → plan migration to MCP Apps
```

---

## 10. Production Considerations

### 10.1 Operational Requirements Checklist

```text
AG-UI PRODUCTION READINESS CHECKLIST

Transport
  [ ] TLS 1.3 on all AG-UI connections
  [ ] Mutual TLS for backend-to-agent connections
  [ ] Connection timeout configured (idle SSE connections)
  [ ] SSE reconnection logic in client (EventSource retry)
  [ ] WebSocket fallback for environments blocking SSE

Authentication
  [ ] Short-lived JWTs with audience binding
  [ ] OBO flow configured for enterprise tool access
  [ ] API key rotation policy
  [ ] Rate limiting per user per tenant

Reliability
  [ ] AG-UI server behind load balancer with sticky sessions (SSE)
  [ ] Run state persisted to durable storage (not in-memory only)
  [ ] Interrupt handler does not leak resources on cancellation
  [ ] TOOL_CALL_RESULT retry on transient tool failures

Observability
  [ ] OTel spans on every AG-UI event (trace ID propagated)
  [ ] run_id and thread_id in all log lines
  [ ] Metrics: events/second, HITL approval rate, run duration, error rate
  [ ] Audit log: append-only, tool call args + user identity + decision

Security
  [ ] CUSTOM event payload validated against JSON Schema
  [ ] MCP App UI resources sandboxed (CSP iframe)
  [ ] Tool call args sanitized before execution
  [ ] Output guardrails on TEXT_MESSAGE stream (PII, safety)

Testing
  [ ] AG-UI conformance test suite against all event types
  [ ] Load test: 100 concurrent SSE streams
  [ ] Chaos test: mid-stream tool failure, SSE disconnect, timeout
  [ ] HITL approval latency test (P99 approval round-trip)
```

!!! tip "Cross-Reference: Observability"
    For OTel span schema specific to AG-UI events (run spans, step spans, tool call spans), see [Reliability, Observability & Governance](../coding-tools/enterprise-ai-architect/agentic-ai-reliability-observability-governance.md). For security hardening beyond this page, see [Agentic AI Security & Identity](../coding-tools/enterprise-ai-architect/agentic-ai-security-identity.md) OWASP ASI mapping.
