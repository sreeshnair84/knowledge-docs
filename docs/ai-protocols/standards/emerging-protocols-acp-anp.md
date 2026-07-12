---
title: "Section 2A: ACP & ANP Deep Dives — Federated and Decentralised Agent Protocols"
subtitle: "Emerging AI Agent Protocols Beyond MCP & A2A — Enterprise Architecture, Standards, Security, and Adoption (2026)"
date_created: 2026-07-11
last_reviewed: 2026-07-11
status: current
edition: "July 2026"
doc_type: research-report
source_file: ""
audience: ["Enterprise Architects", "AI Platform Architects", "CTOs", "Principal Engineers"]
tags: ["acp", "anp", "agent-protocols", "did", "decentralised", "federated", "enterprise-ai", "protocol-architecture"]
source_type: native-md
covers_through: "2026-07-11"
---

# Section 2A: ACP & ANP — Federated and Decentralised Agent Protocols

**Emerging AI Agent Protocols Beyond MCP & A2A — Enterprise Architecture, Standards, Security, and Adoption (2026)**

> July 2026 Edition · Enterprise AI Research Division

---

## Preface to This Section

This section provides deep-dive treatment of two protocols that occupy distinct but complementary positions in the evolving agent communication landscape:

- **ACP (Agent Communication Protocol)** — IBM BeeAI's REST-native agent messaging layer, which was subsequently donated to the Linux Foundation and formally merged into A2A in August 2025. Understanding ACP is essential because: (a) many enterprise codebases adopted ACP between its launch and the merger, and (b) the architectural patterns ACP pioneered — particularly its REST-first approach, run-state semantics, and multipart streaming — were carried forward into A2A v1.0 and remain in production.

- **ANP (Agent Network Protocol)** — An open-source peer-to-peer agent discovery and communication protocol launched July 2025, grounded in W3C Decentralised Identifiers (DIDs) and JSON-LD, with a three-layer architecture designed to enable autonomous agent coalitions at internet scale without central brokers.

Both protocols represent serious architectural alternatives to the dominant MCP/A2A pairing — one as a now-integrated predecessor, the other as an emerging decentralised complement. Neither replaces MCP (tool access) or A2A (enterprise agent coordination). Instead, they address the question that neither of those protocols fully answers: how do agents in federated, cross-organisational, or trust-constrained environments discover, authenticate, and communicate with each other at scale?

---

# PROTOCOL 1: ACP — Agent Communication Protocol

> **⚠️ Naming collision.** This section covers IBM BeeAI's **Agent Communication Protocol**, which merged into A2A in August 2025 and is now retired. It is *not* the **Agentic Commerce Protocol** — the OpenAI + Stripe open standard (announced September 2025, in beta) behind ChatGPT Instant Checkout. In 2026 vendor material, "ACP" usually refers to the commerce protocol; see the UCP deep dive (Section 2C) for its coverage.

## 1. Origin & Evolution

### 1.1 Founding History

ACP originated at **IBM Research** as the communication backbone of **BeeAI**, IBM's enterprise agentic AI platform. The initial specification was authored in early 2025 by engineers building production multi-agent systems inside IBM's consulting and cloud divisions. The fundamental driver was practical rather than academic: IBM's teams had deployed A2A-adjacent patterns internally and found Google's Agent-to-Agent Protocol — while conceptually sound — made assumptions about centralised agent registries and synchronous orchestration that did not map well to IBM's distributed enterprise deployments.

The original problem statement, as stated in the BeeAI project documentation, was:

> *"We need a protocol that any HTTP server can implement in a weekend, that supports long-running async agent tasks without polling hell, and that does not require agents to pre-declare their full capability graph before they can accept a task."*

This framing deliberately positioned ACP as complementary to, rather than competitive with, A2A. Where A2A required Agent Cards (upfront capability manifests), ACP took a discovery-at-runtime approach. Where A2A's task state machine was formalized and opinionated, ACP's run model was minimal and extensible.

### 1.2 Open Source and Linux Foundation Donation

IBM open-sourced ACP in spring 2025 under the Apache 2.0 licence. The specification was hosted at `github.com/i-am-bee/acp` (later archived after the merger). The BeeAI framework (`github.com/i-am-bee/bee-agent-framework`) provided the reference implementation.

In **June 2025**, IBM donated ACP to the **Linux Foundation's Agentic AI Foundation (AAIF)** — the same governance body that received MCP (December 2025) and A2A (June 2025). This created the conditions for the merger: both A2A and ACP now shared a governance home and a community of enterprise adopters with significant overlap.

### 1.3 The ACP-A2A Merger (August 2025)

Following six weeks of working group sessions under the AAIF's Technical Steering Committee, the ACP specification was **formally merged into A2A in August 2025**. The merger was not a hostile acquisition — it was a structured convergence. The key outcomes were:

| ACP Contribution | A2A Integration Point |
|---|---|
| REST-native task invocation (no JSON-RPC required) | A2A's HTTP transport profile was expanded to support direct REST semantics |
| Multipart streaming response model | A2A adopted multipart/mixed content streaming as a first-class transport option alongside SSE |
| Run state machine (`created → in-progress → completed / failed`) | Merged into A2A's extended task state machine |
| Synchronous short-task mode | A2A added synchronous response mode for sub-second tasks |
| `runs` resource abstraction | Carried forward into A2A's Task resource model |
| Minimal capability negotiation header | Informed A2A's capability advertisement model in Agent Cards |

Post-merger, the ACP GitHub repository was archived and contributors migrated to the A2A AAIF working group. The BeeAI framework continued under IBM stewardship as an ACP-compatible (now A2A-compatible) agent framework.

### 1.4 Legacy and Continued Relevance

Despite the merger, ACP retains material relevance as of July 2026 for three reasons:

1. **Production deployments**: A significant body of enterprise code — particularly within IBM Cloud, Red Hat OpenShift AI, and early BeeAI adopters — implemented ACP before the merger. These systems continue to run ACP-native APIs.
2. **Architectural patterns**: ACP's REST-first, run-model-centric design influenced how many architects think about agent task lifecycle, independent of which protocol label they use.
3. **A2A lineage**: Understanding ACP's design decisions illuminates why A2A v1.0 made the choices it did — particularly around transport flexibility and synchronous task support.

---

## 2. Problem Space

### 2.1 The Exact Problem ACP Was Designed to Solve

ACP addressed a specific gap in the 2024–2025 protocol landscape: **how do you invoke an AI agent over HTTP in a way that is simultaneously simple enough for any team to implement, yet expressive enough to handle both instant and long-running responses?**

This sounds trivial but was not. The options available before ACP were:

| Option | Problem |
|---|---|
| Custom REST endpoints per agent | Every team invents its own schema, state model, error codes |
| A2A | Requires Agent Card infrastructure; JSON-RPC dependency; opinionated orchestration |
| MCP | Agent-to-tool, not agent-to-agent; does not model task lifecycle |
| gRPC | Requires Protobuf schemas; not universally accessible from browsers or simple HTTP clients |
| Webhooks / polling | Race conditions, missed events, operational complexity |

ACP's answer was a **minimal HTTP + multipart streaming contract** that any HTTP server could satisfy, with a task lifecycle (called a "run") that mapped cleanly to how AI agents actually operate: accept input, do work (possibly for a long time), produce output (possibly streamed).

### 2.2 Target Users and Systems

ACP was designed for:

- **Enterprise agent platforms** needing a standard HTTP invocation contract across heterogeneous agent implementations
- **Internal platform teams** building agent orchestrators that must invoke agents built by different teams in different languages
- **IBM BeeAI users** specifically, but also any team using Python, TypeScript, or Java agent frameworks
- **Legacy enterprise environments** where JSON-RPC-based protocols (A2A) faced pushback from API teams accustomed to pure REST semantics

### 2.3 Primary Communication Model

ACP used a **client-server model** with an HTTP-native surface:

```
  ACP Client                          ACP Agent Server
     │                                       │
     │  POST /runs                           │
     │  Content-Type: application/json       │
     │  { "agent_id": "...",                 │
     │    "input": [...],                    │
     │    "mode": "stream" }                 │
     │ ────────────────────────────────────> │
     │                                       │  (agent executes)
     │  HTTP 200 OK                          │
     │  Content-Type: multipart/mixed        │
     │  (streaming parts)                    │
     │ <──────────────────────────────────── │
     │     part: {type: "text", data: "..."}│
     │     part: {type: "tool_use", ...}     │
     │     part: {type: "result", ...}       │
     │  [stream closes on completion]        │
```

The `mode` field selected between:
- `sync` — single HTTP response body (short tasks, under ~30s)
- `stream` — multipart/mixed streaming (long tasks, tool use traces visible)
- `async` — immediate `202 Accepted` with a run ID, poll or webhook for results

### 2.4 Enterprise Use Cases

| Use Case | ACP Fit |
|---|---|
| Internal chatbot API gateway normalising calls to multiple agent backends | High — common REST surface regardless of backend |
| Document processing pipeline with long-running analysis agents | High — stream mode provided progress visibility |
| Agent orchestrator invoking specialist sub-agents | High — run model made lifecycle tracking explicit |
| Cross-vendor agent-to-agent task delegation | Medium — ACP lacked A2A's capability discovery model |
| Real-time streaming AI to browser frontends | Low — AG-UI was better suited |

### 2.5 Why Existing Protocols Were Insufficient

The ACP design brief explicitly called out three A2A limitations for IBM's use cases:

1. **JSON-RPC friction**: Enterprise API teams in IBM's client organisations had strong REST discipline. JSON-RPC was viewed as an unusual transport choice that would require custom gateway work to integrate into existing API management platforms (APIM, Kong, MuleSoft).

2. **Upfront capability declaration**: A2A's Agent Card model required agents to pre-declare their full capability graph. IBM's enterprise agents — particularly those wrapping proprietary or third-party models — could not always expose their full capability topology in a public manifest.

3. **Orchestration weight**: A2A v0.x carried significant orchestration semantics (push tasks, pull tasks, explicit negotiation) that added implementation complexity IBM's teams found disproportionate for common internal agent-invocation patterns.

---

## 3. Protocol Architecture

### 3.1 Core Architecture

ACP's architecture was built on five primitives:

```
┌─────────────────────────────────────────────────────────────────────┐
│                       ACP ARCHITECTURE                              │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ACP CLIENT (Orchestrator / Agent Host)                     │   │
│  │                                                             │   │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐              │   │
│  │  │ Run Mgr   │  │ Stream    │  │ Auth      │              │   │
│  │  │ (state)   │  │ Consumer  │  │ Handler   │              │   │
│  │  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘              │   │
│  └────────┼──────────────┼──────────────┼────────────────────┘   │
│           │              │              │                          │
│           │    HTTP/HTTPS REST          │                          │
│           ▼              ▼              ▼                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ACP AGENT SERVER                                           │   │
│  │                                                             │   │
│  │  POST /runs              ← Create a new run                 │   │
│  │  GET  /runs/{id}         ← Get run status/result            │   │
│  │  GET  /runs/{id}/stream  ← Stream run output               │   │
│  │  DELETE /runs/{id}       ← Cancel a run                    │   │
│  │  GET  /agents            ← List available agents            │   │
│  │  GET  /agents/{id}       ← Agent metadata                  │   │
│  │                                                             │   │
│  │  ┌──────────────┐   ┌─────────────┐   ┌──────────────┐    │   │
│  │  │  Run         │   │  Agent      │   │  Output      │    │   │
│  │  │  Executor    │   │  Registry   │   │  Streamer    │    │   │
│  │  └──────────────┘   └─────────────┘   └──────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  TRANSPORT: HTTP/1.1 or HTTP/2   FORMAT: JSON + multipart/mixed    │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 The Run — ACP's Central Abstraction

A **Run** was ACP's unit of work — equivalent to A2A's Task. Every interaction with an ACP agent created a Run:

```json
// POST /runs — Request body
{
  "agent_id": "financial-analyst-v2",
  "input": [
    {
      "type": "user",
      "content": [
        { "type": "text", "text": "Summarise Q3 2025 earnings for AAPL" }
      ]
    }
  ],
  "config": {
    "max_iterations": 10,
    "timeout_seconds": 120
  },
  "metadata": {
    "session_id": "sess-abc123",
    "user_id": "u-9f8d"
  }
}

// Response (stream mode) — HTTP 200 + multipart/mixed
// Part 1: intermediate tool call
{
  "type": "tool_use",
  "tool": "web_search",
  "input": { "query": "AAPL Q3 2025 earnings" }
}
// Part 2: tool result
{
  "type": "tool_result",
  "content": "Apple reported revenue of $94.9B..."
}
// Part 3: final result
{
  "type": "text",
  "content": "Apple's Q3 2025 earnings showed..."
}
```

### 3.3 Run State Machine

```
                    ┌─────────────┐
  POST /runs ──────>│   CREATED   │
                    └──────┬──────┘
                           │ agent picks up work
                           ▼
                    ┌─────────────┐
                    │ IN PROGRESS │<──── tool calls, LLM calls (streaming visible)
                    └──────┬──────┘
               ┌───────────┼───────────┐
               ▼           ▼           ▼
         ┌──────────┐ ┌────────┐ ┌──────────────┐
         │COMPLETED │ │ FAILED │ │  CANCELLED   │
         └──────────┘ └────────┘ └──────────────┘
```

Unlike A2A's richer state machine, ACP's run states were intentionally minimal. The `in-progress` → `completed` transition carried the full output payload.

### 3.4 Message Lifecycle

1. **Client** sends `POST /runs` with input messages and agent ID
2. **Server** validates input, creates Run record with ID, returns 200 (sync/stream) or 202 (async)
3. **Agent executor** processes the run — calling tools, invoking LLMs, iterating
4. **Output streamer** emits multipart chunks as they become available (stream mode)
5. **Run state** transitions from `in-progress` to terminal state
6. **Client** reads final chunk or polls `GET /runs/{id}` for result

### 3.5 Streaming Model

ACP used **multipart/mixed** streaming — HTTP multipart with `Content-Type: multipart/mixed; boundary=<uuid>`:

```
Content-Type: multipart/mixed; boundary=acp-stream-f4a9

--acp-stream-f4a9
Content-Type: application/json

{"type": "thought", "content": "I need to search for current price data"}

--acp-stream-f4a9
Content-Type: application/json

{"type": "tool_use", "tool": "stock_ticker", "input": {"symbol": "AAPL"}}

--acp-stream-f4a9
Content-Type: application/json

{"type": "tool_result", "content": "$211.43"}

--acp-stream-f4a9
Content-Type: application/json

{"type": "text", "content": "The current AAPL price is $211.43..."}

--acp-stream-f4a9--
```

This approach was more universally compatible than SSE (Server-Sent Events) — particularly useful for clients behind enterprise proxies that buffer SSE streams, and for languages/frameworks where SSE client libraries were immature.

### 3.6 Discovery Mechanism

ACP provided a minimal agent discovery endpoint:

```
GET /agents
→ [
    { "id": "financial-analyst-v2", "name": "...", "description": "...",
      "input_schema": {...}, "metadata": {...} },
    ...
  ]

GET /agents/{id}
→ { full agent descriptor }
```

This was intentionally lighter than A2A's Agent Card model — no capability graph, no auth declaration, no pricing. The trade-off was simplicity at the cost of machine-discoverable capability negotiation.

### 3.7 Transport and Serialisation

| Dimension | Specification |
|---|---|
| Transport | HTTP/1.1, HTTP/2 |
| Encoding | UTF-8 JSON |
| Streaming | multipart/mixed |
| Auth | Bearer token (OAuth 2.0 / API key) in `Authorization` header |
| Content-Type | `application/json` (request), `multipart/mixed` (stream response), `application/json` (sync response) |
| Version negotiation | `ACP-Version` request header; server returns `ACP-Version` in response |
| Error format | RFC 7807 Problem Details for HTTP APIs |

### 3.8 Version Negotiation

```
// Client indicates supported versions
ACP-Version: 0.1, 0.2

// Server responds with negotiated version
ACP-Version: 0.2
```

---

## 4. Security Architecture

### 4.1 Authentication Model

ACP's authentication model was deliberately minimal — a policy choice to remain accessible:

```
┌──────────────────────────────────────────────────────────────┐
│                 ACP AUTHENTICATION MODEL                     │
│                                                              │
│  Client                    ACP Server                        │
│    │                            │                            │
│    │  Authorization: Bearer     │                            │
│    │  <token>                   │                            │
│    │ ─────────────────────────> │                            │
│    │                            │ validate token             │
│    │                            │ (introspect / JWT verify)  │
│    │                            │                            │
│    │  ACP response              │                            │
│    │ <───────────────────────── │                            │
│                                                              │
│  SUPPORTED TOKEN TYPES:                                      │
│  • OAuth 2.0 Bearer (RFC 6750)                              │
│  • API Key (in Authorization header as Bearer)              │
│  • JWT (HS256 / RS256 / ES256)                              │
│                                                              │
│  NOT NATIVELY SUPPORTED (required external layer):          │
│  • mTLS                                                      │
│  • SPIFFE/SPIRE                                              │
│  • Certificate-based agent identity                          │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Authorization

ACP had no native authorization model. Authorization decisions were entirely delegated to the implementing server. The recommended patterns were:

1. **OAuth 2.0 scopes** on the bearer token (e.g., `acp:runs:write`, `acp:agents:financial-analyst`)
2. **Agent-level API keys** issued per client identity
3. **Service mesh policies** (Istio AuthorizationPolicy) enforced at the sidecar level

### 4.3 Message Integrity

ACP provided **no native message signing**. Message integrity depended on transport-layer security (TLS). For high-assurance environments, the recommended pattern was:

```
// Request integrity via JWS (JSON Web Signature) body signing
// Custom header approach used in IBM's production deployments:
ACP-Body-Digest: SHA-256=<base64-digest>
ACP-Signature: <JWS-compact-serialization>
```

This was not standardised in the ACP specification itself and was therefore an implementation-specific extension.

### 4.4 Replay Protection

No native replay protection. Mitigations used in practice:

- `X-Request-ID` / `ACP-Request-ID` header for idempotency keys
- Server-side request ID deduplication window (typically 5 minutes)
- Short-lived bearer tokens (< 5 minute expiry) to limit replay window

### 4.5 Threat Model

| Threat | ACP Exposure | Mitigation |
|---|---|---|
| Prompt injection via crafted input | High — ACP passes input directly to agent | Input validation layer; output sanitisation |
| Token theft (bearer token interception) | Medium — mitigated by TLS | Short-lived tokens; token binding |
| Replay of `POST /runs` requests | Medium | Idempotency keys; TTL on request IDs |
| Enumeration of agent IDs via `/agents` | Low-Medium | Auth-gate the `/agents` endpoint |
| Denial of service via long-running runs | Medium | Timeout config; rate limiting |
| SSRF via agent tool calls | High — applies to any agent framework | Tool allowlisting; network egress controls |
| Man-in-the-middle | Low — mitigated by TLS | Certificate pinning for internal deployments |
| Insecure deserialization | Low — JSON only | Standard JSON parsing libraries |
| Agent impersonation | Medium | No native server identity; requires mTLS overlay |

:::warning Security Anti-Patterns with ACP
The most common ACP security failures observed in enterprise deployments were:

1. **Unauthenticated `/agents` endpoint** — exposing the full agent registry to any caller, revealing internal capability topology
2. **Long-lived API keys** — ACP's simplicity encouraged static API keys rather than short-lived OAuth tokens
3. **No input sanitisation** — treating ACP as a trusted internal protocol and passing raw user input directly to agents without validation
4. **Missing TLS on internal ACP calls** — assuming internal network trust, which violated Zero Trust principles
5. **No rate limiting on `/runs`** — allowing orchestrators to flood agent servers under load or attack conditions
:::

### 4.6 Zero Trust Compatibility

ACP was compatible with Zero Trust architectures when deployed with the following overlay:

```
Zero Trust ACP Deployment Pattern:
─────────────────────────────────

[ACP Client]
    │
    │ mTLS (SPIFFE SVID)
    ▼
[Service Mesh Sidecar]    ← Istio / Linkerd
    │ AuthorizationPolicy: require mTLS + OAuth Bearer
    │
    ▼
[ACP Server]
    │ Internal: validate JWT claims
    │          verify SVID subject
    │
    ▼
[Agent Executor]
```

### 4.7 Supply Chain Security

ACP servers serving agents that called external tools or models introduced supply chain risk. Mitigations:

- Pin LLM provider endpoints (no dynamic model resolution)
- Verify agent container image SBOMs (Software Bill of Materials)
- Use OCI image signing (Sigstore/Cosign) for agent deployments
- Audit tool allowlist changes through change management processes

---

## 5. Governance

### 5.1 Protocol Governance (Pre-Merger)

Before the August 2025 merger, ACP was governed under:

- **Specification**: IBM BeeAI team, with community PR process on GitHub
- **Licence**: Apache 2.0
- **Decision process**: Maintainer consensus (IBM-led), with open GitHub issues and PRs
- **Versioning**: Semantic versioning (0.x during the BeeAI period — never reached 1.0)
- **Deprecation**: No formal deprecation policy published; merger constituted de facto end-of-life for standalone ACP

### 5.2 Post-Merger Governance (AAIF)

Following the AAIF donation and A2A merger, ACP as a distinct specification is governed as:

- **Status**: Archived — no new versions will be published under the ACP identifier
- **Forward governance**: Through the A2A specification under the Linux Foundation Agent2Agent Project
- **Migration path**: AAIF published a migration guide mapping ACP endpoints to equivalent A2A operations
- **Existing deployments**: No mandated migration timeline; AAIF committed to documenting the ACP → A2A bridge patterns

### 5.3 Enterprise Operating Model for ACP Migrations

Organisations running ACP-native code as of July 2026 should apply the following governance model:

| Dimension | Recommendation |
|---|---|
| Registry | Maintain an ACP service inventory; mark each service's migration status |
| Ownership | Assign a named migration owner per ACP service |
| Timeline | Target A2A migration by Q4 2026 for new capability additions; existing services: by end of 2027 |
| Compatibility shim | Use the AAIF ACP-to-A2A bridge adapter during transition |
| Compliance | Verify that ACP services in regulated contexts have equivalent A2A compliance controls documented |

### 5.4 Metadata Governance

ACP did not define a metadata governance model. The `metadata` object on runs was a free-form JSON object. Enterprise practice was to enforce metadata schemas at the API gateway layer:

```json
// Recommended enterprise metadata schema (enforced at gateway)
{
  "session_id": "string (required)",
  "user_id": "string (required)",
  "correlation_id": "string (required, UUID)",
  "tenant_id": "string (required)",
  "classification": "string (one of: internal, restricted, confidential)",
  "cost_centre": "string (optional)",
  "environment": "string (one of: dev, staging, prod)"
}
```

---

## 6. Enterprise Readiness

### 6.1 Production Readiness Assessment (as of August 2025 merger)

| Dimension | Rating | Notes |
|---|---|---|
| Protocol stability | Medium | Never reached 1.0; merged before stable release |
| SDK maturity | Medium | Python and TypeScript SDKs in BeeAI; community adapters |
| Tooling | Low-Medium | No dedicated monitoring/observability tooling |
| Vendor support | Medium | IBM, BeeAI ecosystem; no hyperscaler-native support |
| Documentation | Medium | Good for basic use; gaps in security and ops |
| Community | Small | Active during BeeAI phase; migrated to A2A post-merger |

### 6.2 Scalability

ACP servers scaled horizontally without coordination state — runs were tracked per-server or in a shared store (Redis, PostgreSQL). The multipart streaming model required HTTP connection affinity per run (or a streaming proxy). Common patterns:

- **Stateless servers**: No per-run state on server; delegate to external run store
- **Sticky sessions**: Load balancer affinity for streaming runs (less preferred)
- **Streaming proxy**: Single ingress proxy buffers stream; delivers to multiple consumers

### 6.3 Hybrid and Air-Gapped Deployment

ACP's pure HTTP surface made it highly portable:

- **Air-gapped**: Ran on any HTTP server; no cloud dependencies; easily deployed in isolated networks
- **Hybrid**: ACP gateway at the boundary; internal ACP calls on-prem; external A2A calls via gateway
- **Kubernetes**: Standard Deployment + Service; no custom CRDs required

### 6.4 Regulated Industry Suitability

| Industry | Consideration |
|---|---|
| Financial services | ACP's minimal auth model required significant augmentation; mTLS + short-lived JWTs recommended |
| Healthcare | PHI in run payloads required encryption at rest + in transit; logging of run metadata for audit |
| Government | ACP lacked FedRAMP-relevant controls natively; required STIG-compliant overlays |
| Legal | Chain-of-custody for run inputs/outputs required external audit logging |

:::tip ACP Migration to A2A
For teams migrating from ACP to A2A: the conceptual mapping is direct. ACP's `Run` becomes A2A's `Task`. ACP's `POST /runs` maps to A2A's task submission. ACP's stream parts map to A2A's streaming message events. The AAIF migration guide (available at `lf-agent2agent.github.io/migration/acp-to-a2a`) provides field-level mappings and a compatibility shim for existing ACP clients.
:::

---

## 7. Interoperability

### 7.1 ACP ↔ A2A

The AAIF published an official bridge specification. An ACP-to-A2A adapter translated:

| ACP | A2A Equivalent |
|---|---|
| `POST /runs` | Task submission via `tasks/send` or `tasks/sendSubscribe` |
| `GET /runs/{id}` | `tasks/get` |
| `GET /runs/{id}/stream` | `tasks/sendSubscribe` (SSE stream) |
| `DELETE /runs/{id}` | `tasks/cancel` |
| `GET /agents` | Agent Card at `/.well-known/agent.json` |
| Run state `in-progress` | A2A Task status `working` |
| Run state `completed` | A2A Task status `completed` |
| Multipart stream parts | A2A streaming events |

### 7.2 ACP ↔ MCP

ACP and MCP operated at different layers. An ACP agent server could invoke MCP tool servers for its tool calls:

```
ACP Client
    │ POST /runs
    ▼
ACP Agent Server
    │ (agent executes, needs a tool)
    │ JSON-RPC tools/call
    ▼
MCP Tool Server
    │ (executes tool, returns result)
    ▼
ACP Agent Server (continues run)
    │ multipart/mixed chunk
    ▼
ACP Client
```

### 7.3 ACP ↔ REST / OpenAPI

ACP was itself REST-native, making integration with existing OpenAPI-documented APIs straightforward. ACP servers could be documented via OpenAPI 3.x:

```yaml
openapi: 3.1.0
paths:
  /runs:
    post:
      summary: Create an agent run
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RunRequest'
      responses:
        '200':
          description: Synchronous or streaming run response
```

### 7.4 ACP ↔ Service Mesh

ACP integrated cleanly with Istio and Linkerd:

- **mTLS**: Service mesh sidecars handled mTLS termination, elevating ACP's auth posture
- **Traffic policies**: Run timeouts enforced at sidecar level (DestinationRule)
- **Observability**: Distributed tracing (OpenTelemetry) auto-instrumented via sidecar
- **Rate limiting**: Envoy rate limiting filters applied at ACP server ingress

### 7.5 ACP ↔ API Gateways

ACP's REST surface integrated with all major API gateways (Kong, AWS API Gateway, Azure APIM, Apigee) without custom plugins — a significant operational advantage over JSON-RPC-based protocols.

---

---

# PROTOCOL 2: ANP — Agent Network Protocol

## 1. Origin & Evolution

### 1.1 Founding and Motivation

The **Agent Network Protocol (ANP)** was open-sourced in **July 2025** by a community of AI and distributed systems engineers, with initial contributions from researchers with backgrounds in W3C Decentralised Identifier (DID) standards, peer-to-peer networking, and enterprise agent deployments. The founding GitHub organisation is `agent-network-protocol` (`github.com/agent-network-protocol/agentnetworkprotocol`).

The founding motivation was explicit and ambitious: ANP's authors argued that both MCP and A2A shared a fundamental architectural assumption — **central registries and known endpoints** — that would not scale to a world of billions of autonomous agents operating across organisational, national, and jurisdictional boundaries.

The ANP whitepaper (July 2025) opens with:

> *"The internet succeeded because no single organisation controlled endpoint discovery. DNS was distributed. IP routing was federated. HTTP was stateless and universal. The Agentic Web will fail if we repeat the enterprise middleware mistake of centralised agent registries. ANP is our attempt to build the DNS and HTTP of agent networks: decentralised, interoperable, and trust-minimised."*

### 1.2 Relationship to Existing Work

ANP built explicitly on:

- **W3C Decentralised Identifiers (DID) v1.0** — the identity foundation, finalised as a W3C Recommendation in July 2022
- **W3C Verifiable Credentials (VC) Data Model** — for capability attestations
- **JSON-LD 1.1** — for semantic interoperability of agent metadata
- **did:web** — the DID method used for enterprise-accessible agent identity (no blockchain required)
- **did:peer** — for peer-to-peer agent identity without public infrastructure
- **DIDComm Messaging v2** — the encrypted messaging layer built on DID key material

ANP is **not** a fork or derivative of MCP or A2A. It operates at a different layer and with different architectural assumptions. The ANP authors explicitly positioned it as a complement, not a replacement:

> *"ANP answers the question MCP and A2A do not: how do agents find each other and establish trust when neither party has prior knowledge of the other's existence?"*

### 1.3 Governance Model

As of July 2026, ANP is governed as an open-source community project:

- **Repository**: `github.com/agent-network-protocol/agentnetworkprotocol`
- **Licence**: Apache 2.0
- **Governance**: Technical Steering Committee (TSC) elected from contributors; RFC process for specification changes
- **Standards body involvement**: Active engagement with W3C DID Working Group and DIF (Decentralised Identity Foundation); IETF liaison in progress
- **Specification format**: Markdown in GitHub; plans for formal W3C Community Group Note
- **Community**: ~3,200 GitHub stars (July 2026); active Discord; monthly TSC calls open to public

ANP has **not** been donated to the Linux Foundation AAIF as of July 2026. The TSC has discussed AAIF incubation but has not reached consensus — a subset of contributors prefer independence from the AAIF's hyperscaler membership structure.

### 1.4 Roadmap (July 2026)

| Milestone | Status | Target |
|---|---|---|
| Core specification v0.1 | Complete | July 2025 |
| DID-based agent identity | Complete | August 2025 |
| Meta-protocol negotiation | Complete | October 2025 |
| Application protocol registry | In progress | Q3 2026 |
| Reference implementation (Python) | Complete | September 2025 |
| Reference implementation (TypeScript) | Complete | November 2025 |
| Reference implementation (Go) | In progress | Q3 2026 |
| Enterprise deployment guide | In progress | Q3 2026 |
| IETF RFC submission | Planned | 2027 |
| W3C Community Group Note | Planned | 2027 |

### 1.5 Relationship to MCP and A2A

| Protocol | Relationship to ANP |
|---|---|
| MCP | Complementary — ANP handles discovery and identity establishment; MCP handles tool invocation after connection |
| A2A | Partially overlapping — A2A handles enterprise agent coordination with known parties; ANP handles discovery of unknown agents |
| DIDComm v2 | ANP's encrypted messaging layer; ANP adds agent-specific semantics on top |
| W3C DID | ANP's identity foundation — ANP is DID-native |

---

## 2. Problem Space

### 2.1 The Core Problem: Discovery Without Central Brokers

ANP addresses what its authors call the **"agent discovery cold start problem"**: how does Agent A find Agent B when:

- A and B have never interacted before
- There is no shared registry both parties trust
- A and B may be operated by different organisations in different jurisdictions
- The interaction may involve sensitive data that must not be routed through a third-party broker
- A needs to verify B's claimed capabilities and identity before sharing any data

This is fundamentally different from the problem A2A solves. A2A assumes that both agents already know each other's endpoints (or use a shared enterprise registry). ANP assumes **complete mutual ignorance** as the starting state.

### 2.2 Why Existing Protocols Were Insufficient

| Protocol | Discovery Gap |
|---|---|
| MCP | No agent-to-agent discovery; server endpoints are hardcoded by administrators |
| A2A | Agent Cards are published at known URLs; discovery requires knowing the URL or using a centralised registry |
| OAuth/OIDC | Handles user identity, not agent identity; requires pre-registered clients |
| DNS-SD / mDNS | LAN-scope only; not applicable to internet-scale agent networks |
| OpenAPI directory | Centralised (API hubs, developer portals); organisational scope |
| UDDI (legacy) | Centralised; enterprise-scope; deprecated |

None of these addressed the internet-scale, mutual-anonymous-trust scenario ANP targeted.

### 2.3 Target Users and Systems

ANP's design targets:

1. **AI marketplaces and agent ecosystems** where agents from different vendors need to discover and contract with each other without pre-registration
2. **Cross-border enterprise AI** where organisations want peer-to-peer agent connectivity without routing traffic through a shared intermediary
3. **Regulated industries** where data sovereignty concerns prevent using shared agent registries (financial services, healthcare, government)
4. **Decentralised AI applications** including agent-based DAOs, autonomous supply chain agents, and open-science research networks
5. **Future "Internet of Agents"** scenarios where AI agents act as first-class internet participants

### 2.4 Interaction Patterns

ANP supports three primary interaction patterns:

| Pattern | Description | When to Use |
|---|---|---|
| **Discovery + Negotiate** | Agent A resolves Agent B's DID, retrieves its DID document, negotiates communication protocol | First contact between unknown agents |
| **Direct Messaging** | Encrypted DIDComm message between agents with established DID-based trust | Ongoing interaction after discovery |
| **Capability Query** | Agent A queries Agent B's capability registry endpoint for specific skill availability | Before delegating a task; pre-task routing |

### 2.5 Enterprise Use Cases

| Use Case | ANP Fit | Notes |
|---|---|---|
| Cross-org agent federation (two enterprises) | High | Each org operates its own ANP-capable agents; no shared broker needed |
| AI agent marketplace (multi-vendor) | High | Agents discover each other via DID; no marketplace operator in the data path |
| Regulated cross-border data exchange | High | DID-based identity + DIDComm encryption meets data sovereignty requirements |
| Internal enterprise agent discovery | Medium | Simpler than ANP; but ANP scales if enterprise grows into federation |
| Consumer-facing agent services | Medium | did:web works but adds operational complexity vs. OAuth-based identity |
| Edge/IoT agent networks | Medium | did:peer enables local-network agent identity without internet dependency |

### 2.6 Limitations

ANP's architectural ambition creates real limitations for enterprise adoption as of July 2026:

1. **Implementation complexity**: DID infrastructure, DID document hosting, key rotation, and DIDComm encryption are non-trivial operational responsibilities compared to OAuth-based protocols
2. **Key management burden**: DID key rotation and recovery require well-defined operational procedures that most enterprise teams have not yet developed for agent identities
3. **Performance overhead**: DID resolution adds latency (network call to resolve DID document); DIDComm encryption adds CPU overhead
4. **Ecosystem immaturity**: Production-grade libraries for DIDComm v2 are available in Python, TypeScript, and Rust but lack the enterprise tooling polish of OAuth 2.0 stacks
5. **Regulatory clarity**: Regulators in financial services and healthcare have not yet issued guidance on DID-based agent identity for regulated transactions
6. **Interoperability testing**: No formal ANP interoperability test suite exists as of July 2026

---

## 3. Protocol Architecture

### 3.1 The Three-Layer Architecture

ANP's defining architectural feature is its **explicit three-layer stack**. Each layer is independent and substitutable:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     ANP THREE-LAYER ARCHITECTURE                        │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  LAYER 3 — APPLICATION PROTOCOL                                   │  │
│  │                                                                   │  │
│  │  Capability schemas, task definitions, domain-specific formats    │  │
│  │  Examples: financial-query-v1, document-analysis-v2, search-v1   │  │
│  │  Format: JSON-LD with agent-specific @context                    │  │
│  │  Governance: ANP Application Protocol Registry (community)        │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              ▲          │                               │
│                    negotiate │          │ application messages          │
│                              │          ▼                               │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  LAYER 2 — META-PROTOCOL NEGOTIATION                              │  │
│  │                                                                   │  │
│  │  Agents agree on WHICH application protocol to use for THIS      │  │
│  │  interaction — at runtime, based on mutual capabilities           │  │
│  │  Format: JSON-LD capability advertisement + negotiation messages  │  │
│  │  Transport: DIDComm v2 encrypted messages                         │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              ▲          │                               │
│               identity keys  │          │ encrypted messages            │
│                              │          ▼                               │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  LAYER 1 — IDENTITY & ENCRYPTED COMMUNICATION                    │  │
│  │                                                                   │  │
│  │  W3C DID — agent identity (did:web, did:peer, did:key)           │  │
│  │  DID Documents — public keys, service endpoints                   │  │
│  │  DIDComm v2 — end-to-end encrypted agent messaging               │  │
│  │  Key types: Ed25519 (signing), X25519 (encryption)               │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Layer 1: Identity and Encrypted Communication

#### DID-Based Agent Identity

Every ANP-participating agent has a Decentralised Identifier:

```
# Example agent DID using did:web method
did:web:agents.acme.com:financial-analyst

# This DID resolves to:
GET https://agents.acme.com/financial-analyst/did.json

# DID Document returned:
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1",
    "https://w3id.org/security/suites/x25519-2020/v1"
  ],
  "id": "did:web:agents.acme.com:financial-analyst",
  "verificationMethod": [
    {
      "id": "did:web:agents.acme.com:financial-analyst#signing-key-2025",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:web:agents.acme.com:financial-analyst",
      "publicKeyMultibase": "z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK"
    },
    {
      "id": "did:web:agents.acme.com:financial-analyst#encryption-key-2025",
      "type": "X25519KeyAgreementKey2020",
      "controller": "did:web:agents.acme.com:financial-analyst",
      "publicKeyMultibase": "z6LSbysY2xFMRpGMhb7tFTLMpeuPRaqaWM1yECx2AtzE3KCc"
    }
  ],
  "authentication": [
    "did:web:agents.acme.com:financial-analyst#signing-key-2025"
  ],
  "keyAgreement": [
    "did:web:agents.acme.com:financial-analyst#encryption-key-2025"
  ],
  "service": [
    {
      "id": "did:web:agents.acme.com:financial-analyst#anp-endpoint",
      "type": "ANPService",
      "serviceEndpoint": "https://agents.acme.com/financial-analyst/anp"
    },
    {
      "id": "did:web:agents.acme.com:financial-analyst#capabilities",
      "type": "ANPCapabilityRegistry",
      "serviceEndpoint": "https://agents.acme.com/financial-analyst/capabilities"
    }
  ]
}
```

#### DID Resolution Flow

```
Agent A wants to contact Agent B (knows B's DID: did:web:b.example.com:agent)

Agent A                  DID Resolver              Agent B DID Document
   │                         │                            │
   │  resolve(did:web:...)   │                            │
   │ ──────────────────────> │                            │
   │                         │  GET https://b.example.   │
   │                         │  com/agent/did.json        │
   │                         │ ──────────────────────────>│
   │                         │  200 OK {DID Document}     │
   │                         │ <──────────────────────────│
   │  {DID Document}         │                            │
   │ <─────────────────────  │                            │
   │                         │                            │
   │  (extract encryption key, service endpoint)          │
   │  (compose DIDComm encrypted message)                 │
   │  POST to serviceEndpoint                             │
   │ ─────────────────────────────────────────────────────>
```

#### DIDComm v2 Message Format

ANP uses **DIDComm Messaging v2** for all Layer 1 communication:

```json
{
  "id": "1234567890",
  "typ": "application/didcomm-plain+json",
  "type": "https://agent-network-protocol.github.io/anp/1.0/meta-protocol/negotiate",
  "from": "did:web:agents.acme.com:financial-analyst",
  "to": ["did:web:agents.partner.com:research-agent"],
  "created_time": 1720694400,
  "expires_time": 1720694700,
  "body": {
    "protocol_proposals": [
      "https://agent-network-protocol.github.io/protocols/financial-query/v1",
      "https://agent-network-protocol.github.io/protocols/generic-qa/v2"
    ]
  }
}
```

This message is then encrypted using ECDH-1PU (authenticated encryption) with Agent B's X25519 public key from its DID document, producing a JWE (JSON Web Encryption) envelope.

### 3.3 Layer 2: Meta-Protocol Negotiation

Layer 2 solves a subtle but critical problem: when two agents meet for the first time, they need to agree on **how** they will communicate — not just that they will. The meta-protocol negotiation layer handles this:

```
┌──────────────────────────────────────────────────────────────────────┐
│              META-PROTOCOL NEGOTIATION SEQUENCE                      │
│                                                                      │
│  Agent A                                         Agent B             │
│    │                                               │                 │
│    │  [DIDComm] ProtocolPropose message            │                 │
│    │  "I support: financial-query-v1,              │                 │
│    │   document-analysis-v2, generic-qa-v1"        │                 │
│    │ ─────────────────────────────────────────>    │                 │
│    │                                               │                 │
│    │  [DIDComm] ProtocolAccept message             │                 │
│    │  "Let's use: financial-query-v1               │                 │
│    │   I also support version 2 if needed"         │                 │
│    │ <─────────────────────────────────────────    │                 │
│    │                                               │                 │
│    │  [Application Protocol: financial-query-v1]   │                 │
│    │  QueryRequest { ... }                         │                 │
│    │ ─────────────────────────────────────────>    │                 │
│    │  QueryResponse { ... }                        │                 │
│    │ <─────────────────────────────────────────    │                 │
│                                                                      │
│  KEY INSIGHT: The protocol used for application messages is          │
│  determined at runtime by the agents, not pre-configured             │
└──────────────────────────────────────────────────────────────────────┘
```

#### Negotiation Message Schema

```json
// ProtocolPropose
{
  "type": "https://anp.github.io/1.0/meta-protocol/propose",
  "body": {
    "protocols": [
      {
        "id": "https://anp.github.io/protocols/financial-query/v1",
        "required_capabilities": ["equity_analysis", "financial_data_access"],
        "priority": 1
      },
      {
        "id": "https://anp.github.io/protocols/generic-qa/v2",
        "required_capabilities": [],
        "priority": 2
      }
    ],
    "session_config": {
      "max_duration_seconds": 3600,
      "encryption": "required",
      "signing": "required"
    }
  }
}

// ProtocolAccept
{
  "type": "https://anp.github.io/1.0/meta-protocol/accept",
  "body": {
    "accepted_protocol": "https://anp.github.io/protocols/financial-query/v1",
    "session_id": "sess-7f3a9c2d",
    "negotiated_config": {
      "encryption": "ECDH-1PU+A256KW/A256CBC-HS512",
      "signing": "Ed25519"
    }
  }
}
```

### 3.4 Layer 3: Application Protocols

Layer 3 is where actual agent tasks happen. ANP defines an **Application Protocol Registry** — a community-maintained catalogue of domain-specific protocols that can be negotiated via Layer 2:

```
ANP Application Protocol Examples:
───────────────────────────────────

anp://protocols/financial-query/v1
  - Schema: JSON-LD with finance ontology
  - Operations: equity_analysis, bond_pricing, risk_assessment
  - Auth requirements: level-2 (requires verifiable credential)

anp://protocols/document-analysis/v2
  - Schema: JSON-LD with document ontology
  - Operations: summarise, classify, extract_entities, translate
  - Auth requirements: level-1 (DID authentication sufficient)

anp://protocols/generic-qa/v2
  - Schema: minimal text exchange
  - Operations: ask, respond, clarify
  - Auth requirements: level-1

anp://protocols/code-execution/v1
  - Schema: JSON-LD with code execution ontology
  - Operations: execute, review, explain
  - Auth requirements: level-3 (requires organisational credential)
```

### 3.5 Complete ANP Interaction Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    COMPLETE ANP INTERACTION FLOW                        │
│                                                                         │
│  Initiating Agent A              DID Infrastructure      Target Agent B │
│      │                                  │                      │        │
│      │  1. Resolve B's DID              │                      │        │
│      │ ─────────────────────────────>   │                      │        │
│      │  2. DID Document (keys+endpoints)│                      │        │
│      │ <─────────────────────────────   │                      │        │
│      │                                  │                      │        │
│      │  3. Encrypt ProtocolPropose      │                      │        │
│      │     using B's X25519 key         │                      │        │
│      │                                  │                      │        │
│      │  4. POST to B's ANP endpoint (DIDComm encrypted)        │        │
│      │ ─────────────────────────────────────────────────────>  │        │
│      │                                  │  5. B decrypts msg   │        │
│      │                                  │     using own key    │        │
│      │                                  │  6. B evaluates      │        │
│      │                                  │     proposed protos  │        │
│      │  7. ProtocolAccept (DIDComm encrypted)                   │        │
│      │ <─────────────────────────────────────────────────────   │        │
│      │                                                          │        │
│      │  8. Application protocol messages (financial-query-v1)   │        │
│      │     All messages: DIDComm encrypted + Ed25519 signed     │        │
│      │ <──────────────────────────────────────────────────────> │        │
│      │                                                          │        │
│      │  9. Session close or persist for subsequent interactions │        │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.6 Session Model

ANP supports both **stateless** (per-message) and **stateful** (session-based) interactions:

| Mode | When to Use | Implementation |
|---|---|---|
| Stateless | Single-exchange interactions; no shared state needed | No session ID; each DIDComm message is self-contained |
| Session-based | Multi-turn interactions; tool-use loops; long-running tasks | Session ID established in ProtocolAccept; referenced in all subsequent messages |

Session state was intentionally not defined at the protocol layer — stored by the application layer. This kept the ANP core protocol simple and stateless at the wire level.

### 3.7 Discovery Mechanisms

ANP supported two complementary discovery patterns:

#### DID-Based Discovery (Primary)

If Agent A knows Agent B's DID (shared out-of-band via email, business card, directory, marketplace listing), it can initiate contact directly. No central registry needed.

#### Web-Based Agent Directory (Secondary)

ANP-compatible agents could list themselves in web-accessible directories using the `AgentNetworkDirectory` service type in their DID document:

```json
// In Agent B's DID document
{
  "service": [
    {
      "id": "did:web:b.example.com:agent#directory-listing",
      "type": "AgentNetworkDirectory",
      "serviceEndpoint": "https://directory.anp-agents.org/listings/b-example-agent"
    }
  ]
}
```

Community-operated directories (opt-in) enabled keyword search and capability filtering without the directory being in the data or trust path.

### 3.8 Capability Registration

Agent B's capability registry endpoint returned a JSON-LD document:

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://anp.github.io/contexts/capability/v1"
  ],
  "id": "did:web:agents.acme.com:financial-analyst#capabilities",
  "capabilities": [
    {
      "id": "cap:equity-analysis",
      "protocol": "https://anp.github.io/protocols/financial-query/v1",
      "operations": ["equity_analysis", "earnings_summary"],
      "required_credential_types": ["FinancialServicesOperatorCredential"],
      "pricing": {
        "currency": "USD",
        "per_call": 0.05
      },
      "sla": {
        "p95_latency_ms": 5000,
        "availability": 0.999
      }
    }
  ]
}
```

### 3.9 Transport and Serialisation

| Dimension | Specification |
|---|---|
| Transport (Layer 1) | HTTPS (TLS 1.3 minimum for DID document hosting and ANP endpoint) |
| Envelope format | DIDComm v2 (JWE for encrypted messages, JWS for signed-only messages) |
| Application format | JSON-LD 1.1 |
| Encryption | ECDH-1PU+A256KW (authenticated encryption) or ECDH-ES+A256KW (anonymous encryption) |
| Signing | EdDSA (Ed25519) |
| DID resolution | Universal Resolver or did:web HTTP resolution |
| Key types | Ed25519 (authentication/signing), X25519 (key agreement/encryption) |
| Message IDs | UUID v4 (globally unique; replay protection) |

---

## 4. Security Architecture

### 4.1 Security Model Overview

ANP's security model is fundamentally different from ACP and A2A. Rather than bolt authentication onto an existing HTTP API, ANP builds identity and encryption into the protocol itself at Layer 1. This is both its security strength and its operational complexity.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ANP SECURITY MODEL                               │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  CRYPTOGRAPHIC IDENTITY LAYER                                   │   │
│  │  - Every agent has a DID with Ed25519 signing key               │   │
│  │  - Every agent has an X25519 encryption key                     │   │
│  │  - Keys are self-sovereign: no CA dependency                    │   │
│  │  - Key rotation via DID document update                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  MESSAGE SECURITY LAYER (DIDComm v2)                            │   │
│  │  - End-to-end encryption: sender encrypts to recipient's key    │   │
│  │  - Authenticated encryption: ECDH-1PU proves sender identity    │   │
│  │  - Message signing: Ed25519 signatures on all messages          │   │
│  │  - Replay protection: UUID message IDs + expiry timestamps      │   │
│  │  - Forward secrecy: ephemeral key per message (optional)        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  TRUST LAYER (Verifiable Credentials)                           │   │
│  │  - Capability attestations as VCs                               │   │
│  │  - Organisational credentials (who operates this agent)         │   │
│  │  - Credential presentation during capability negotiation        │   │
│  │  - Trust registries for credential issuer validation            │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  TRANSPORT SECURITY LAYER                                       │   │
│  │  - TLS 1.3 for DID document hosting                             │   │
│  │  - TLS 1.3 for ANP endpoint HTTP                                │   │
│  │  - Note: DIDComm encryption is independent of TLS              │   │
│  │    (E2E encryption even if TLS terminated at proxy)             │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Authentication

ANP provides **mutual cryptographic authentication** at the protocol layer:

| Mechanism | How It Works |
|---|---|
| **DID Authentication** | Agent A proves control of its DID by signing a challenge with its Ed25519 private key; Agent B verifies against A's public key in A's DID document |
| **ECDH-1PU Authenticated Encryption** | Encryption uses both the sender's private key and the recipient's public key; recipient can verify sender identity on decryption |
| **DID Document Integrity** | did:web documents served over TLS; HTTPS certificate binds domain to organisation; optional additional integrity hash in DID document |

This provides strong mutual authentication without any pre-shared secrets or central CA involvement.

### 4.3 Authorization and Verifiable Credentials

ANP's authorization model was based on **Verifiable Credentials (VCs)**:

```json
// Example: Verifiable Credential issued to Agent A by an organisation
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://anp.github.io/contexts/agent-credential/v1"
  ],
  "type": ["VerifiableCredential", "FinancialServicesOperatorCredential"],
  "issuer": "did:web:regulators.acme.com:issuer",
  "issuanceDate": "2026-01-15T00:00:00Z",
  "expirationDate": "2026-12-31T23:59:59Z",
  "credentialSubject": {
    "id": "did:web:agents.acme.com:financial-analyst",
    "organisation": "ACME Financial Services Ltd",
    "authorised_operations": ["equity_analysis", "bond_pricing"],
    "regulatory_registrations": ["FCA-12345", "SEC-67890"]
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2026-01-15T00:00:00Z",
    "verificationMethod": "did:web:regulators.acme.com:issuer#key-1",
    "proofPurpose": "assertionMethod",
    "proofValue": "..."
  }
}
```

Agent B would require presentation of this VC (as a Verifiable Presentation) before accepting financial query requests from Agent A.

### 4.4 Encryption Architecture

```
MESSAGE ENCRYPTION FLOW (DIDComm v2 ECDH-1PU):

1. Agent A retrieves Agent B's X25519 public key from B's DID document
2. Agent A generates an ephemeral X25519 key pair for this message
3. Agent A performs ECDH-1PU:
   - Key agreement: (A's ephemeral private) + (B's X25519 public) + (A's X25519 private)
   - Produces symmetric key K
4. Message encrypted with AES-256-GCM using K
5. JWE envelope:
   {
     "protected": "<base64url(header)>",
     "recipients": [{ "encrypted_key": "<base64url(wrapped_key)>" }],
     "iv": "<base64url(nonce)>",
     "ciphertext": "<base64url(encrypted_payload)>",
     "tag": "<base64url(auth_tag)>"
   }
6. Agent B decrypts using its X25519 private key
   - Verifies sender identity from A's DID key material in ECDH-1PU derivation
```

This provides **authenticated encryption**: B knows the message came from A (or someone with A's private key), without requiring a separate signature.

For non-repudiation, an additional Ed25519 signature over the message can be added — this is separate from ECDH-1PU authentication.

### 4.5 Replay Protection

ANP built replay protection into the DIDComm v2 layer:

- Every message has a UUID `id` field (globally unique)
- Every message has `created_time` and optional `expires_time` (Unix timestamps)
- Receiving agents maintain a **message ID deduplication store** (recommended: Redis with TTL matching `expires_time`)
- Messages received after `expires_time` are rejected

```
Replay protection check at Agent B:

1. Extract message.id (UUID)
2. Check dedup store: if message.id present → reject (replay)
3. Check message.expires_time: if past → reject (expired)
4. If new and valid: store message.id with TTL = expires_time - now
5. Process message
```

### 4.6 Integrity and Confidentiality

| Property | Mechanism | Strength |
|---|---|---|
| Confidentiality | ECDH-1PU AES-256-GCM (DIDComm) + TLS 1.3 (transport) | Very High — dual-layer |
| Integrity | AES-GCM authentication tag + Ed25519 signature | Very High |
| Authenticity | ECDH-1PU (sender key in derivation) | High |
| Non-repudiation | Ed25519 signature (optional; separate from ECDH-1PU) | High when enabled |
| Forward secrecy | Ephemeral key per message (optional in DIDComm) | High when enabled |
| Replay protection | UUID + expiry (DIDComm) | High |

### 4.7 Trust Establishment

ANP supports a trust spectrum from minimal to high-assurance:

```
TRUST LEVEL SPECTRUM:

Level 0 — Unauthenticated (no DID verification)
  Use case: Public information exchange; read-only queries
  Risk: Low trust; no sender identity guarantee

Level 1 — DID Authentication
  Use case: Basic agent-to-agent interaction
  Requirement: Verified DID control (ECDH-1PU authentication)
  Guarantee: Sender controls the DID's private key

Level 2 — DID + Organisational VC
  Use case: Enterprise-grade interactions
  Requirement: Level 1 + Verifiable Credential from trusted issuer
  Guarantee: Agent is operated by a known, attested organisation

Level 3 — DID + Regulatory VC + Real-time Status Check
  Use case: Regulated industry transactions
  Requirement: Level 2 + credential status check (OCSP-equivalent for VCs)
  Guarantee: Credential not revoked; current regulatory standing confirmed
```

### 4.8 Key Management

Key management is the most operationally demanding aspect of ANP deployment:

| Concern | Requirement | Recommendation |
|---|---|---|
| Key generation | Strong random; hardware security module for production | AWS CloudHSM, Azure HSM, Thales |
| Key storage | Private keys never in application memory long-term | Secrets manager (Vault, AWS Secrets Manager) |
| Key rotation | DID document update required on rotation | Automated rotation pipeline; old key retained briefly for decryption of in-flight messages |
| Key recovery | Loss of private key = loss of DID control | M-of-N key shares (Shamir Secret Sharing); recovery DID document |
| Key revocation | DID document update removes key; VCs require separate revocation | StatusList2021 (W3C) for VC revocation |
| Compromise response | Rotate DID keys immediately; notify connected agents | Automated incident playbook |

### 4.9 Threat Model

| Threat | ANP Exposure | Mitigation |
|---|---|---|
| Agent impersonation | Low — DID cryptographic authentication | Verify DID resolution over TLS; use DNSSEC for did:web |
| Message interception | Low — DIDComm E2E encryption | Defense-in-depth with TLS also |
| Replay attacks | Low — UUID + expiry | Deduplication store required (operational) |
| DID document tampering | Medium — depends on hosting integrity | HTTPS + DNSSEC + optional content hash in DID doc |
| Malicious capability advertisement | Medium — no protocol-level capability signing | Require VC attestations for sensitive capabilities |
| Key exfiltration | High impact if occurs — controls mitigate | HSM storage; rotation; access logging |
| DID resolution manipulation | Medium — DNS hijacking for did:web | DNSSEC; certificate transparency; did:peer for offline scenarios |
| Prompt injection via ANP messages | High — applies to all agent protocols | Input validation; sandbox tool execution |
| Credential forgery | Low (if VC signatures verified) | Verify VC issuer against trusted registry |
| Denial of service on DID endpoint | Medium | CDN for DID document hosting; rate limiting on ANP endpoint |
| Supply chain attack on ANP libraries | Medium | SBOM; dependency pinning; Sigstore verification |
| Quantum computing (future) | Post-quantum: Ed25519 and X25519 not quantum-safe | Monitor NIST PQC standards; plan migration path |

:::warning Critical ANP Security Requirement
Recipient agents MUST verify DID documents over DNSSEC-validated HTTPS for `did:web`. A DID document served over plain HTTP or from a host without certificate transparency logging must be treated as untrusted. The cryptographic strength of ANP's identity layer depends entirely on the integrity of DID document hosting.
:::

### 4.10 Zero Trust Compatibility

ANP is architecturally aligned with Zero Trust principles:

| Zero Trust Principle | ANP Alignment |
|---|---|
| Never trust, always verify | Every message requires cryptographic sender verification via DID |
| Least privilege | VC-based capability restrictions; per-operation authorisation |
| Assume breach | DIDComm E2E encryption: network compromise does not expose message content |
| Verify explicitly | Identity verification on every message, not just connection establishment |
| Use strong authentication | Ed25519 + ECDH-1PU; no passwords or static API keys |

### 4.11 Known Vulnerabilities and Anti-Patterns

:::warning ANP Security Anti-Patterns
1. **Skipping VC verification for "trusted" peers** — Even known agents should present VCs for operations requiring elevated trust; familiarity is not authorisation
2. **did:web without DNSSEC** — DNS hijacking can substitute a malicious DID document; DNSSEC is required in production
3. **Not rotating DID keys** — Static keys accumulate exposure risk; establish key rotation schedules (recommended: annually for long-lived agents)
4. **Accepting any VC issuer** — Specify a trusted issuer list in your trust registry; reject VCs from unknown issuers
5. **No message ID deduplication store** — Without replay protection enforcement, replayed messages can cause duplicate operations
6. **Logging decrypted message content** — DIDComm provides E2E encryption; logging the decrypted payload undermines this protection
7. **Using did:key for production agents** — did:key embeds the key in the DID itself; no rotation possible; use did:web or did:peer for production
:::

---

## 5. Governance

### 5.1 Protocol Governance

ANP's governance model as of July 2026 is community-driven with formal structure:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ANP GOVERNANCE STRUCTURE                             │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  TSC — Technical Steering Committee                               │ │
│  │  • 7 elected members (2-year terms)                              │ │
│  │  • Approves specification changes (RFC process)                  │ │
│  │  • Manages the Application Protocol Registry                     │ │
│  │  • Monthly public calls                                          │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                              │                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  RFC Process                                                     │   │
│  │  1. Proposal (GitHub issue)                                     │   │
│  │  2. Draft RFC (pull request with spec changes)                  │   │
│  │  3. Community review period (4 weeks minimum)                   │   │
│  │  4. TSC vote (majority required)                                │   │
│  │  5. Implementation period                                       │   │
│  │  6. Spec update merged                                          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Working Groups                                                  │   │
│  │  • Security WG — threat model; key management guidance          │   │
│  │  • Interoperability WG — test suites; bridge specifications     │   │
│  │  • Enterprise WG — regulated industry guidance; compliance      │   │
│  │  • Applications WG — application protocol registry maintenance  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Version Governance

| Version | Status | Notes |
|---|---|---|
| 0.1 | Stable | Initial release; core identity + meta-protocol |
| 0.2 | Draft | Application protocol registry; VC integration improvements |
| 1.0 | Planned | Target: 2027; IETF RFC submission planned |
| Post-1.0 | Planned | 12-month stability guarantee per TSC policy |

**Breaking change policy**: Breaking changes require a major version increment and 6-month deprecation window with compatibility shim.

### 5.3 Application Protocol Registry Governance

The Application Protocol Registry is a community-curated catalogue of Layer 3 protocols:

| Stage | Description | Requirements |
|---|---|---|
| Proposal | Community member proposes a new application protocol | GitHub issue with schema draft |
| Review | 30-day review period; security review required | Security WG + Applications WG sign-off |
| Experimental | Listed as experimental; implementers can adopt at risk | Schema published at canonical URL |
| Stable | Interoperability tested; backwards compatibility commitment | Interop test suite + 2 independent implementations |
| Deprecated | Replaced by newer version; 12-month notice | TSC vote; migration guide required |

### 5.4 Identity Governance

Since ANP uses DIDs as the identity layer, identity governance for enterprise deployments involves:

| Concern | Enterprise Policy Recommendation |
|---|---|
| DID method selection | Use `did:web` for organisational agents; `did:peer` for ephemeral/edge agents |
| DID document hosting | Organisation-controlled infrastructure (not third-party) |
| Key custodianship | HSM-backed; dual-control for production agent keys |
| VC issuer governance | Maintain an internal VC issuer for agent credentials; governance review for new credential types |
| Trust registry | Maintain a signed list of trusted external VC issuers; review quarterly |
| Agent lifecycle | Deactivate DID document when agent is decommissioned; notify known peer agents |

### 5.5 Compliance Considerations

| Regulation | ANP Consideration |
|---|---|
| GDPR / CCPA | ANP messages may carry personal data; DIDComm encryption supports data minimisation; DID documents are public — ensure no PII in DID document |
| EU AI Act | Agent identity via DID supports auditability requirement; VC-based capability tracking supports transparency |
| Financial regulations | VC-based proof of regulatory registration; audit log of all ANP transactions required |
| HIPAA | DIDComm E2E encryption exceeds HIPAA encryption requirements for data in transit |
| SOC 2 | ANP's cryptographic audit trail supports SOC 2 logging requirements |
| FedRAMP | DID key management must meet FIPS 140-2 requirements; Ed25519 is FIPS-approved when using FIPS-validated modules |

---

## 6. Enterprise Readiness

### 6.1 Production Readiness Assessment (July 2026)

| Dimension | Rating | Notes |
|---|---|---|
| Protocol stability | Medium — v0.1 stable | Core spec stable; application protocol registry in flux |
| Reference implementations | Medium | Python, TypeScript complete; Go in progress |
| SDK maturity | Low-Medium | Libraries available; not yet enterprise-grade hardened |
| Tooling | Low | Limited observability tooling; no dedicated monitoring solutions |
| Vendor support | Low | No hyperscaler-native support; community-only as of July 2026 |
| Documentation | Medium | Core spec well-documented; operational guidance thin |
| Security tooling | Low | No dedicated ANP security scanners; manual review required |
| Community | Growing | ~3,200 stars; active; smaller than A2A/MCP communities |
| Enterprise adoption | Early | Proof-of-concept deployments; few known production deployments |

:::tip ANP Adoption Guidance for Enterprise (July 2026)
ANP is **not yet production-ready for mission-critical enterprise deployments** as of July 2026. The protocol specification is sound and the cryptographic foundations are strong, but the operational tooling, vendor support, and enterprise ecosystem have not matured. Recommended adoption posture:

- **Now**: Proof-of-concept evaluation; developer familiarisation; architecture planning for federated use cases
- **H2 2026**: Pilot deployments in non-critical cross-org scenarios; contribute to interoperability test suites
- **2027**: Re-evaluate for production use once v1.0 ships, IETF RFC is in progress, and enterprise tooling has matured
:::

### 6.2 Scalability

ANP's scalability profile is distinct from ACP/A2A:

| Component | Scalability Approach |
|---|---|
| DID document hosting | CDN-cacheable (static JSON); effectively unlimited scale |
| DID resolution | Can be cached; universal resolver can be self-hosted; high availability |
| ANP message processing | Stateless at protocol layer; application layer holds state; horizontal scaling |
| VC verification | Online status checks (StatusList2021) can be cached; bounded latency |
| DIDComm encryption | CPU-bound but parallelisable; hardware acceleration (AES-NI) available |

**Latency impact**: DID resolution adds 50–200ms for first contact (cache miss). Subsequent interactions with cached DID documents add < 5ms. DIDComm encryption/decryption adds ~2–10ms CPU overhead per message.

### 6.3 High Availability and Disaster Recovery

| Component | HA Approach | DR Approach |
|---|---|---|
| DID document hosting | Multi-region CDN | Geographic redundancy; automated failover |
| ANP agent endpoint | Load balanced; health checks | Active-active multi-region; or active-passive with DNS failover |
| Agent private keys | Replicated in HSM cluster | Cross-region HSM replication; or key shards in separate regions |
| Message ID dedup store | Redis Cluster | Redis Sentinel or cross-region replication |

:::warning Key Material in DR Scenarios
Disaster recovery for ANP agents requires careful handling of private key material. Key shards should be stored in geographically distributed HSMs with appropriate access controls. Never replicate unencrypted private keys to DR sites via general-purpose storage systems.
:::

### 6.4 Air-Gapped and Hybrid Deployment

ANP can operate in air-gapped environments with modifications:

| Scenario | Approach | Limitation |
|---|---|---|
| Fully air-gapped | Use `did:peer` (no external DID resolution) + local VC issuer | Cannot federate with external agents |
| Hybrid (internal + external) | `did:web` for external-facing agents; `did:peer` for internal | DID document hosting must be reachable from internet for external federation |
| Private cloud | Self-hosted universal resolver; internal DID registry | Operational overhead of maintaining resolver infrastructure |

### 6.5 Regulated Industry Suitability

| Industry | Suitability | Key Gaps |
|---|---|---|
| Financial services | Medium (emerging) | Regulatory recognition of DID-based identity; FCA/SEC guidance pending |
| Healthcare | Medium (emerging) | HIPAA-compliant encryption met; PHI-in-DID-message audit requirements need validation |
| Government | Low-Medium | FedRAMP certification path unclear; DID ecosystem not yet GSA-recognised |
| Legal | Medium | Chain-of-custody via DIDComm audit log; privileged data classification needs legal review |
| Retail/e-commerce | Medium-High | Lower regulatory burden; ANP well-suited for cross-org agent commerce |

### 6.6 Multi-Region Considerations

ANP's DID-based identity model introduces multi-region complexities not present in certificate-based systems:

1. **DID document replication**: did:web DID documents are hosted at a specific domain; CDN caching is the primary HA mechanism
2. **Key consistency**: Private keys and HSMs must be regionally co-located with agent processes for latency; cross-region replication of HSM access is complex
3. **Message dedup store**: Cross-region replication of the message ID store is required to prevent replay attacks on geographically distributed deployments

---

## 7. Interoperability

### 7.1 ANP ↔ MCP

ANP and MCP address fundamentally different problems but can compose in a layered architecture:

```
COMPOSING ANP + MCP:

External Partner Agent (ANP peer)
         │
         │  ANP (DIDComm messages, discovered via DID)
         ▼
Internal Orchestrator Agent
         │
         │  MCP (tool invocation via JSON-RPC)
         ▼
MCP Tool Server (database, API, file system)
```

In this pattern, ANP handles the cross-organisational discovery and trust establishment; MCP handles the tool invocation within the trusted internal boundary. They do not directly interoperate but compose cleanly at the orchestrator layer.

### 7.2 ANP ↔ A2A

ANP and A2A are **architecturally complementary**:

| Dimension | ANP | A2A |
|---|---|---|
| Discovery | DID-based, decentralised | Agent Cards, semi-centralised |
| Trust establishment | Cryptographic (DID keys) | OAuth-based |
| Task model | Defined at application protocol layer | Formal Task state machine |
| Best for | Unknown parties, cross-org federation | Known parties, enterprise coordination |

**Bridging pattern**: An ANP-capable agent can expose an A2A interface at its service endpoint. External partners discover it via ANP/DID; enterprise orchestrators interact with it via A2A. The bridge is implemented at the agent's ingress layer.

```
External Agent (ANP) ──(DID discovery)──> Bridge Agent <──(A2A)── Enterprise Orchestrator
```

### 7.3 ANP ↔ OAuth / OIDC

ANP's DID-based identity does not replace OAuth/OIDC but can interoperate via W3C DID-based JWT:

- **DID as OAuth subject**: The agent's DID can be used as the `sub` claim in OAuth JWTs, linking DID identity to OAuth authorisation flows
- **VC-as-OAuth-scope**: Verifiable Credentials can be presented to an OAuth authorisation server to obtain scoped access tokens for downstream APIs
- **DIF Presentation Exchange**: Standard format for requesting VC presentations; can be integrated into OAuth authorisation code flows

### 7.4 ANP ↔ SPIFFE / SPIRE

For workload identity within a Kubernetes cluster, SPIFFE SVIDs (X.509 certificates) and ANP DIDs serve overlapping but distinct purposes:

| Dimension | SPIFFE/SPIRE | ANP/DID |
|---|---|---|
| Scope | Intra-cluster workload identity | Cross-org agent identity |
| Trust root | SPIRE server (per cluster) | Self-sovereign (DID) |
| Rotation | Automatic (short-lived SVIDs) | Manual (DID document update) |
| Discovery | SPIFFE bundle federation | DID resolution |
| Best for | Microservice mTLS within cluster | Agent-to-agent across organisations |

**Integration pattern**: Use SPIFFE for intra-cluster mTLS + ANP DID for cross-cluster/cross-org agent identity. At the boundary, a gateway maps SPIFFE identity to DID identity for outbound ANP messages.

### 7.5 ANP ↔ OpenAPI

ANP's Layer 3 application protocols are defined in JSON-LD, not OpenAPI. However, an interoperability layer is possible:

- ANP application protocols can be documented with OpenAPI 3.x schemas as a supplementary artefact
- API gateways can translate OpenAPI REST calls to ANP DIDComm messages for mixed-mode deployments
- No official OpenAPI-to-ANP bridge exists as of July 2026; this is a gap

### 7.6 ANP ↔ gRPC / Protocol Buffers

ANP uses JSON-LD at the application layer. There is no native gRPC/Protobuf support. Integration requires a translation layer:

```
Internal gRPC Services
         │
         │  gRPC (Protobuf)
         ▼
ANP-gRPC Bridge Agent
         │
         │  ANP (DIDComm + JSON-LD)
         ▼
External ANP Agents
```

### 7.7 ANP ↔ Kubernetes

ANP agents deployed on Kubernetes require:

- **DID document hosting**: External-facing service (or GitHub Pages for `did:web`); or Ingress for in-cluster hosting
- **Key storage**: Kubernetes Secrets + sealed secrets, or external secrets operator pointing to Vault/HSM
- **Message dedup store**: Redis deployment (StatefulSet) or external managed Redis
- **No custom CRDs required**: ANP does not define Kubernetes-specific resources
- **Network policies**: Allow egress to external DID resolution endpoints (universal resolver); allow ingress to ANP service endpoint

### 7.8 ANP ↔ Event Buses (Kafka, AWS EventBridge)

ANP was designed for synchronous request-response and session-based messaging, not pub-sub event streaming. Integration patterns:

- **ANP as producer**: Agent receives ANP message → publishes event to Kafka topic for downstream processing
- **ANP as consumer**: Event bus triggers → local agent receives → agent initiates ANP interaction with external peer
- **Not a natural fit**: Pub-sub broadcast patterns are not well-served by ANP's peer-to-peer model; retain event buses for internal event-driven patterns, use ANP only for agent-to-agent interaction

### 7.9 ANP ↔ Service Mesh

ANP's E2E DIDComm encryption operates **below** the service mesh layer — making the relationship unique:

```
Standard service mesh mTLS:
  Agent A <──mTLS (sidecar)──> Agent B
  (TLS terminated at sidecar; payload visible to sidecar)

ANP + service mesh:
  Agent A <──DIDComm E2E──> Agent B
            (via mTLS tunnel)
  (TLS terminated at sidecar BUT DIDComm still encrypted end-to-end)
  (sidecar sees ciphertext only — cannot inspect payload)
```

This is a **significant architectural property**: ANP provides confidentiality even against sidecar-level network inspection tools. This is valuable for regulated data scenarios but means traditional service mesh observability (payload inspection for tracing, security scanning) does not work on ANP messages without explicit decryption points.

---

## Section Summary: ACP and ANP Compared

```
┌────────────────────────────────────────────────────────────────────────────┐
│                      ACP vs ANP — Architectural Comparison                 │
├─────────────────────────┬─────────────────────────┬────────────────────────┤
│  Dimension              │  ACP                    │  ANP                   │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Status (July 2026)     │ Merged into A2A (Aug    │ Active; v0.1 stable    │
│                         │ 2025); archived         │                        │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Origin                 │ IBM BeeAI               │ Open source community  │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Governance             │ AAIF (via A2A merger)   │ Independent TSC;       │
│                         │                         │ Apache 2.0             │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Communication model    │ Client-server (HTTP)    │ Peer-to-peer (DIDComm) │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Discovery              │ /agents endpoint        │ DID resolution         │
│                         │ (server-enumerated)     │ (decentralised)        │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Identity               │ Bearer token / API key  │ W3C DID (cryptographic)│
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Encryption             │ TLS (transport)         │ DIDComm E2E + TLS      │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Auth                   │ OAuth 2.0 Bearer        │ ECDH-1PU authenticated │
│                         │ (externalised)          │ encryption + Ed25519   │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Trust model            │ OAuth + API gateway     │ Verifiable Credentials │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Central broker needed? │ No (REST endpoint)      │ No (DID resolution)    │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Key use case           │ Internal agent          │ Cross-org agent        │
│                         │ invocation (migrating   │ federation; internet-  │
│                         │ to A2A)                 │ scale discovery        │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Enterprise readiness   │ Medium (archived;       │ Low-Medium (emerging;  │
│                         │ migrate to A2A)         │ PoC phase)             │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  Complexity             │ Low — plain HTTP REST   │ High — DID + DIDComm   │
│                         │                         │ + VCs + JSON-LD        │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  When to use            │ Existing ACP deployments│ Cross-org federation   │
│                         │ being migrated to A2A   │ without central broker │
├─────────────────────────┼─────────────────────────┼────────────────────────┤
│  When NOT to use        │ Greenfield deployments  │ Simple enterprise      │
│                         │ (use A2A instead)       │ scenarios (use A2A)    │
└─────────────────────────┴─────────────────────────┴────────────────────────┘
```

## Key References

| Resource | URL |
|---|---|
| ACP (archived) | `github.com/i-am-bee/acp` |
| BeeAI Framework | `github.com/i-am-bee/bee-agent-framework` |
| AAIF ACP→A2A Migration Guide | `lf-agent2agent.github.io/migration/acp-to-a2a` |
| A2A Specification (AAIF) | `github.com/google-a2a/A2A` (now `lf-agent2agent`) |
| ANP Specification | `github.com/agent-network-protocol/agentnetworkprotocol` |
| W3C DID Specification | `www.w3.org/TR/did-core/` |
| DIDComm Messaging v2 | `identity.foundation/didcomm-messaging/spec/v2.0/` |
| W3C Verifiable Credentials | `www.w3.org/TR/vc-data-model/` |
| DIF — Decentralised Identity Foundation | `identity.foundation` |
| ANP Discord | `discord.gg/agentnetworkprotocol` |
| did:web method spec | `w3c-ccg.github.io/did-method-web/` |
| StatusList2021 (VC revocation) | `w3c-ccg.github.io/vc-status-list-2021/` |
| DIF Presentation Exchange | `identity.foundation/presentation-exchange/spec/v2.0.0/` |

---

*Section 2A complete. For Section 2B covering UCP, AP2, AG-UI, and A2UI, see `_section_ucp_agui.md`.*

*For MCP and A2A deep dives, see the companion research documents in this directory.*

---

> **Document metadata**: Section 2A of the July 2026 edition of "Emerging AI Agent Protocols Beyond MCP & A2A — Enterprise Architecture, Standards, Security, and Adoption". Research current as of 2026-07-11. Protocol status subject to rapid change; verify against primary sources before implementation decisions.