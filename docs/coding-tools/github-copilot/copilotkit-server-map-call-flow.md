---
title: 'CopilotKit → AgentCore → MCP — Server Map & Call Flow'
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: converted-html
source_file: 'copilotkit-server-map-call-flow.html'
doc_type: guide
tags: [copilotkit, agentcore, mcp, call-flow]
covers_version: "2026"
---

# CopilotKit → AgentCore → MCP — Server Map & Call Flow

## CopilotKit UI → BFF → AgentCore → MCP
Server Map & Call Flow

Exactly where each server lives, what code goes where, and the complete HTTP/SSE/MCP call chain. Updated for AgentCore AG-UI endpoint (March 2026).

CopilotKit AG-UI Strands on AgentCore MCP Streamable-HTTP

01 — Server topology

## Where Every Server Lives

Browser User device

CopilotKit Provider

@copilotkit/react-core

Wraps the entire app. Points to BFF at `/api/copilotkit` via `runtimeUrl`. Manages conversation state in React context.

CopilotChat

@copilotkit/react-ui

Renders the chat panel. Sends user messages to CopilotKit Provider. Streams responses via AG-UI SSE.

useCopilotAction

@copilotkit/react-core

Registers MCP Tool render components. Called when agent invokes a tool — renders custom React UI inline in chat.

MCP App iframe

MCPAppsMiddleware result

Sandboxed iframe rendered by CopilotKit when agent returns a `ui://` reference. Communicates back via postMessage / AG-UI.

← NO direct calls to AgentCore or MCP  
All traffic goes through BFF 

BFF EKS / Lambda (eu-west-1)

Entra ID OIDC Layer

passport-oidc / msal-node

Validates JWT from browser. Extracts roles. Sets HttpOnly session cookie. All requests must pass this before reaching CopilotRuntime.

CopilotRuntime

@copilotkit/runtime

The CopilotKit server SDK. Handles AG-UI event protocol. Proxies messages to AgentCore via `HttpAgent`. Attaches MCPAppsMiddleware for MCP Apps.

POST /api/copilotkit

HttpAgent

@ag-ui/client

Points to AgentCore Runtime AG-UI endpoint. Sends user messages; receives AG-UI SSE event stream back. Signs requests with SigV4 or Cognito Bearer token.

MCPAppsMiddleware

@copilotkit/runtime

Fetches MCP App UI bundles from CDN. Verifies SRI hash. Injects iframe content into AG-UI stream for MCP Apps path only.

Audit + Rate Limiter

custom middleware

Every request logged to Kinesis. Token bucket rate limit per user. PII scrubbed before log. CSRF double-submit validation.

AgentCore Runtime AWS AgentCore (eu-west-1)

Strands Agent

strands-agents + ag_ui_strands

Your agent logic. Wrapped in `StrandsAgent` (AG-UI adapter). Handles conversation, tool routing, Bedrock model calls, interrupt flows.

:8080 /invocations (SSE)

:8080 /ws (WebSocket)

:8080 /ping (health)

AG-UI Endpoint

AgentCore native (Mar 2026)

AgentCore's dedicated AG-UI endpoint. Handles auth, session isolation, auto-scaling, observability. Set via `--protocol AGUI` flag on deploy.

Bedrock Client

boto3 / strands BedrockModel

Calls Claude via Amazon Bedrock (eu-west-1). Sends tool schemas from MCP servers. Receives tool_call decisions back.

MCP Client

mcp (Python SDK)

Connects to each MCP server over Streamable-HTTP. Sends tool call requests. Receives tool results. Feeds results back to Bedrock.

MCP Servers AgentCore containers (eu-west-1)

MCP: Core Banking

FastAPI + mcp[server]

Exposes: `get_balance`, `get_transactions`, `get_account_details`. Read-only. Returns structured JSON. Calls internal Core Banking REST API via private link.

:8081 /mcp (Streamable-HTTP)

MCP: Payment Rail

FastAPI + mcp[server]

Exposes: `payment_initiate` (returns `ui://` for MCP App), `payment_status`, `payment_cancel`. Gated by approval token.

:8082 /mcp (Streamable-HTTP)

MCP: Risk Engine

FastAPI + mcp[server]

Exposes: `get_risk_score`, `check_exposure`, `get_limit_status`. Returns risk verdicts. No PII — returns scores + codes only.

:8083 /mcp (Streamable-HTTP)

MCP: KYC / AML

FastAPI + mcp[server]

Exposes: `check_sanctions`, `get_kyc_status`, `pep_screen`. Read-only. Results immutably logged. Never returns raw PII.

:8084 /mcp (Streamable-HTTP)

02 — Call flows

## Complete Request Traces

Path A — MCP Tools (data lookup) Path B — MCP Apps (payment form) Path C — Auth handshake

User asks "What's my account balance?" — agent calls Core Banking MCP Tool, streams result back.

1

Browser CopilotChat

User types message → CopilotKit sends HTTP POST

HTTPS POST /api/copilotkit

CopilotKit Provider collects the user message + conversation history and POSTs to the BFF endpoint. Sends session cookie + CSRF token. Body is AG-UI format: `{ messages: [...], threadId, runId }`

// CopilotKit provider config (React) <CopilotKit runtimeUrl="/api/copilotkit"> <CopilotChat /> </CopilotKit>

2

BFF OIDC middleware

Validate session + extract user claims

Internal — Redis session lookup

BFF checks session cookie against Redis. Validates Entra ID JWT claims. Extracts `{ upn, roles, tid }`. Attaches to request context. Rejects with 401 if invalid.

3

BFF CopilotRuntime

CopilotRuntime handles request → forwards to AgentCore via HttpAgent

HTTPS + AG-UI SSE → AgentCore :8080/invocations

CopilotRuntime receives the POST. HttpAgent connects to AgentCore's AG-UI endpoint. Sends the run request. AgentCore authenticates via Cognito Bearer or SigV4. SSE stream opens back.

// BFF — Next.js API route or Lambda const agent = new HttpAgent({ url: "https://agentcore.eu-west-1.amazonaws.com/invocations", headers: { Authorization: `Bearer ${cognitoToken}` } }); const runtime = new CopilotRuntime({ agents: { strands_agent: agent } });

4

AgentCore Strands Agent

Strands agent reasons with Bedrock → decides to call get_balance tool

HTTPS → Amazon Bedrock (eu-west-1)

Strands passes conversation + all MCP tool schemas to Bedrock Claude. Model returns a tool_call decision: `get_balance({ account_id: "ACC123" })`. AG-UI emits `TOOL_CALL_START` event upstream.

## Strands agent (Python) — in AgentCore container from ag_ui_strands import StrandsAgent agent = StrandsAgent(strands_agent=my_strands_agent) # Exposes /invocations and /ws automatically

5

AgentCore MCP Client

MCP Client calls Core Banking MCP Server

Streamable-HTTP POST :8081/mcp

Strands MCP client sends a JSON-RPC `tools/call` request to the Core Banking MCP server container (also on AgentCore, internal VPC). The MCP server validates the IAM task role, queries the internal banking API, and returns the balance JSON.

## MCP tool call (JSON-RPC over HTTP) { "method": "tools/call", "params": { "name": "get_balance", "arguments": { "account_id": "ACC123" } } }

6

AgentCore Strands → Bedrock

Tool result fed back to Bedrock → synthesises answer

HTTPS → Amazon Bedrock

Strands sends the tool result back to Claude with the original conversation. Claude generates a natural language answer. Strands streams text tokens as AG-UI `TEXT_MESSAGE_CONTENT` events.

7

BFF CopilotRuntime

CopilotRuntime proxies AG-UI SSE stream → browser

SSE (chunked HTTP) → browser

CopilotRuntime receives AG-UI events from AgentCore. Audits tool invocation event. Proxies stream to browser. BFF also publishes audit event to Kinesis.

8

Browser useCopilotAction

CopilotKit renders tool result as React component

React state update (local)

CopilotKit receives `TOOL_CALL_START` / `TOOL_CALL_END` events. Triggers the `render()` function in `useCopilotAction` with the tool result. Your `<AccountBalanceCard />` renders inline in the chat. No iframe — pure React.

// React — renders when agent calls get_balance tool useCopilotAction({ name: "get_balance", render: ({ args, result }) => <AccountBalanceCard {...result} /> });

User says "Initiate a SEPA payment" — agent triggers MCP App (Payment team's form UI renders in iframe).

1

Browser CopilotChat

User requests payment → same POST to BFF /api/copilotkit

HTTPS POST /api/copilotkit

Identical to MCP Tools path steps 1–3. User message flows through BFF → CopilotRuntime → HttpAgent → AgentCore.

2

AgentCore Strands → Bedrock

Bedrock decides to call payment_initiate → Strands calls Payment MCP server

Streamable-HTTP POST :8082/mcp

Strands calls the Payment Rail MCP server. **Key difference** : the MCP server responds not just with JSON, but with a tool result that includes a `ui://` resource reference pointing to the payment form bundle on CDN.

## Payment MCP server response (includes ui:// reference) { "content": [{ "type": "resource", "resource": { "uri": "ui://payment-form?bundle=https://assets.bank.eu/payment-v2/PaymentForm.js", "mimeType": "text/html", "integrity": "sha384-abc123..." } }] }

3

BFF MCPAppsMiddleware

MCPAppsMiddleware intercepts ui:// → fetches bundle → verifies SRI

HTTPS GET → CDN (assets.bank.eu)

CopilotRuntime's MCPAppsMiddleware intercepts the `ui://` reference. Fetches the JS bundle from the bank's own CDN. Computes SHA-384 hash and compares against the hash in the tool result. Rejects if mismatch. Injects bundle into AG-UI event stream.

// MCPAppsMiddleware config in CopilotRuntime const runtime = new CopilotRuntime({ agents: { strands_agent: agent }, middleware: [MCPAppsMiddleware({ allowedBundleOrigin: "https://assets.bank.eu", sriRequired: true, sandboxPolicy: "allow-scripts allow-forms" })] });

4

Browser CopilotKit runtime

CopilotKit renders sandboxed iframe with Payment Form UI

Local iframe (sandboxed)

Browser receives the MCP App bundle via AG-UI stream. CopilotKit creates a sandboxed iframe with `sandbox="allow-scripts allow-forms"` — never `allow-same-origin`. The Payment team's React form renders inside it.

5

Browser iframe ↔ AG-UI postMessage

User fills form → AG-UI syncs state back to Strands agent

postMessage (origin-checked) → AG-UI event

User interacts with the form. iframe sends `postMessage` to parent CopilotKit (origin strictly validated: only `https://assets.bank.eu`). CopilotKit forwards form data as AG-UI `STATE_SNAPSHOT` events back to the Strands agent.

6

AgentCore Strands interrupt

Strands interrupt_before fires → Approval Queue

DynamoDB write + SQS message

Before calling `payment_execute`, Strands fires `interrupt_before`. BFF writes a pending approval to DynamoDB. Manager is notified. Agent pauses. When approval arrives, agent resumes and calls the Payment MCP Server to execute.

7

Browser CopilotChat

Payment confirmed → agent streams confirmation back to chat

AG-UI SSE → browser

Agent resumes after approval. Payment submitted. Agent narrates result as text. CopilotKit renders confirmation in chat. iframe is removed from DOM. Full audit trail written.

First load — user authenticates via Entra ID PKCE, BFF creates session, all subsequent calls use session cookie.

1

Browser MSAL.js

App loads → MSAL detects no session → redirects to Entra ID

HTTPS GET → login.microsoftonline.com

Browser generates `code_verifier` (128-bit random). Computes `code_challenge = SHA256(code_verifier)`. Redirects to Entra ID authorize endpoint with PKCE params.

2

Browser Entra ID → callback

User logs in + MFA → Entra redirects back with auth code

HTTPS redirect → /auth/callback?code=...

User completes Entra ID login + Conditional Access MFA. Entra redirects to `/auth/callback` with a one-time `code`. Browser passes code + code_verifier to BFF.

3

BFF OIDC handler

BFF exchanges code for tokens — acts as confidential client

HTTPS POST → Entra /token

BFF (confidential client — client_secret never in browser) calls Entra token endpoint with code + code_verifier + client_secret. Receives id_token, access_token, refresh_token. Validates id_token signature against JWKS.

4

BFF Session + Redis

BFF creates encrypted server-side session → sets HttpOnly cookie

Redis SET (encrypted) + Set-Cookie header

Stores `{ upn, roles, tokens }` in Redis (AES-256 encrypted). Sets `__Host-session` cookie: HttpOnly, Secure, SameSite=Strict. Tokens never reach the browser. Cookie is the only credential the browser holds.

// Set-Cookie response header __Host-session=SESSION_ID; HttpOnly; Secure; SameSite=Strict; Path=/

5

Browser All subsequent calls

All /api/copilotkit calls use session cookie — no token in JS

HTTPS POST /api/copilotkit + Cookie

CopilotKit Provider's POSTs to `/api/copilotkit` automatically include the session cookie. BFF validates cookie → loads session from Redis → attaches user context → forwards to AgentCore. Access token refresh is silent, server-side only.

03 — Package map

## What Goes Where

Package / Component | Location | Server | Purpose  
---|---|---|---  
@copilotkit/react-core  
@copilotkit/react-ui | Browser | User device — bundled in React app | CopilotKit Provider, CopilotChat, useCopilotAction — all client-side React  
@copilotkit/runtime | BFF | EKS / Lambda — Next.js API route or FastAPI | CopilotRuntime server SDK. Handles AG-UI protocol, routes to AgentCore, attaches MCPAppsMiddleware  
@ag-ui/client (HttpAgent) | BFF | EKS / Lambda — inside CopilotRuntime setup | Points to AgentCore AG-UI endpoint. Manages SSE connection to agent container  
MCPAppsMiddleware | BFF | EKS / Lambda — attached to CopilotRuntime | Fetches MCP App bundles from CDN, verifies SRI, injects into AG-UI stream for MCP Apps path  
strands-agents  
ag_ui_strands | AgentCore | AgentCore Runtime container (:8080) | Agent logic + AG-UI event streaming adapter. Exposes /invocations and /ws automatically  
mcp (Python SDK)  
— client side | AgentCore | AgentCore Runtime — inside Strands agent | Connects to each MCP server over Streamable-HTTP. Sends tool calls, receives results  
mcp[server] / FastAPI  
— each MCP server | AgentCore | Separate AgentCore containers (:8081–8084) | Each domain MCP server. Exposes tool list + tool call handler. Calls internal bank APIs via private link  
Tool Registry API | AgentCore | EKS service backed by Aurora PostgreSQL | Dynamic tool discovery. Strands queries this on each session start to get active MCP endpoints and tool policies  
  
EU BANK AI COPILOT — SERVER MAP & CALL FLOW CopilotKit · AG-UI · Strands · AgentCore · MCP Streamable-HTTP Updated: March 2026 (AgentCore AG-UI endpoint GA)
