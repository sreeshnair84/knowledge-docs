---
title: "EU Bank AI Copilot Platform — Part 2: Sequence Diagrams & Application Code"
date_created: 2026-06-29
last_reviewed: 2026-07-17
status: current
source_type: converted-pdf
source_file: "eu-bank-ai-copilot-complete.pdf"
tags: ["ai-usecases", "copilotkit", "strands-agents", "agentcore"]
doc_type: multi-part-series
covers_version: "as of 2026-07-10"
series_name: "EU Bank AI Copilot Platform"
series_part: 2
series_total: 4
series_index: "ai-usecases/eu-bank-ai-copilot-complete"
---

# EU Bank AI Copilot Platform — Part 2: Sequence Diagrams & Application Code

Continues from [Part 1: Architecture & Design Decisions](./eu-bank-ai-copilot-part1-architecture.md), which covered the platform's zones, tech stack, and the MCP Tools-vs-Apps decision.

This part walks through the six core sequence flows step-by-step, then gives the frontend, BFF, and payment-approval code references that implement them.

## 1. Sequence Diagrams

The following six sequence diagrams cover every significant flow in the platform. Each was rendered at high resolution (1600–3100px wide) from validated Mermaid source — see the companion page [EU Bank Sequence Diagrams](./eu-bank-sequence-diagrams.md). Step numbers correspond to the implementation code in this part's Frontend and BFF sections (§2–3) and [Part 3](./eu-bank-ai-copilot-part3-agent-mcp-security.md)'s Agent and MCP Server sections (§1–2).

### 1.1 Authentication & Session — Entra ID OIDC + PKCE

The browser initiates PKCE auth with Entra ID. The BFF acts as the confidential OIDC client — client_secret and tokens never reach the browser. Only an HttpOnly session cookie is set. All subsequent /api/copilotkit calls use this cookie plus a CSRF double-submit token.

**Step-by-step trace:**

1. **Browser (MSAL.js)** — On load, MSAL detects no session and redirects to Entra ID. It generates a 128-bit `code_verifier` and computes `code_challenge = SHA256(code_verifier)` for the PKCE handshake.
2. **Browser → Entra ID callback** — The user completes Entra ID login plus Conditional Access MFA. Entra redirects to `/auth/callback?code=...`; the browser passes the code and `code_verifier` to the BFF.
3. **BFF (OIDC handler)** — As a confidential client (`client_secret` never in the browser), the BFF exchanges the code for tokens at the Entra `/token` endpoint using `code` + `code_verifier` + `client_secret`, and validates the `id_token` signature against JWKS.
4. **BFF (session + Redis)** — Stores `{ upn, roles, tokens }` AES-256 encrypted in Redis and sets an `__Host-session` cookie (`HttpOnly`, `Secure`, `SameSite=Strict`). Tokens never reach the browser — the cookie is the only credential it holds.
5. **Browser (all subsequent calls)** — Every `/api/copilotkit` POST automatically includes the session cookie. The BFF validates the cookie, loads the session from Redis, attaches user context, and refreshes the access token silently, server-side only.

*Figure: Diagram 01 — Entra ID OIDC + PKCE Authentication & Session Establishment*

### 1.2 MCP Tools — Data Query Flow

User asks a question. Strands consults Bedrock, which decides to call `get_account_balance`. The MCP client calls the Core Banking MCP server over Streamable-HTTP. PII is stripped before the result returns. AG-UI streams events back to the browser where `useCopilotAction` renders a native React card.

**Step-by-step trace:**

1. **Browser (CopilotChat)** — The user's message and conversation history are POSTed to `/api/copilotkit` with the session cookie and CSRF token; the body is AG-UI format `{ messages, threadId, runId }`.
2. **BFF (OIDC middleware)** — Validates the session cookie against Redis, checks the Entra ID JWT claims, and extracts `{ upn, roles, tid }` onto the request context. Rejects with 401 if invalid.
3. **BFF (CopilotRuntime)** — Forwards the request to AgentCore via `HttpAgent`, authenticating with a Cognito Bearer token or SigV4, and opens the AG-UI SSE stream to `:8080/invocations`.
4. **AgentCore (Strands agent)** — Passes the conversation and all MCP tool schemas to Bedrock Claude. The model returns a `tool_call` decision — `get_account_balance({ account_id: "ACC123" })` — and AG-UI emits a `TOOL_CALL_START` event upstream.
5. **AgentCore (MCP client)** — Sends a JSON-RPC `tools/call` request to the Core Banking MCP server over Streamable-HTTP (`:8081/mcp`). The server validates the IAM task role, queries the internal banking API over the private link, and returns the balance JSON.
6. **AgentCore (Strands → Bedrock)** — Feeds the tool result back to Claude with the original conversation; Claude synthesises the natural-language answer, and Strands streams tokens as AG-UI `TEXT_MESSAGE_CONTENT` events.
7. **BFF (CopilotRuntime)** — Proxies the AG-UI SSE stream to the browser and publishes an audit event to Kinesis.
8. **Browser (`useCopilotAction`)** — Receives the `TOOL_CALL_START`/`TOOL_CALL_END` events and triggers the tool's `render()` function with the result (e.g. `<AccountBalanceCard {...result} />`) — no iframe, pure React.

*Figure: Diagram 02 — MCP Tools: Account Balance Query (Core Banking MCP → Bedrock → Chat)*

### 1.3 MCP Apps — Interactive iframe UI

The Payment MCP server returns a `ui://` resource reference alongside its tool result. MCPAppsMiddleware fetches the bundle, verifies the SHA-384 SRI hash, and CopilotKit renders it in a sandboxed iframe. The AG-UI protocol synchronises form state back to the Strands agent in real time.

**Step-by-step trace:**

1. **Steps 1–3** are identical to the MCP Tools path above: browser → BFF → CopilotRuntime → `HttpAgent` → AgentCore.
2. **AgentCore (Strands → Bedrock)** — Bedrock decides to call `payment_initiate`; Strands calls the Payment Rail MCP server (`:8082/mcp`). The key difference: the response includes a `ui://` resource reference pointing at the payment-form bundle on the bank's CDN, with a SHA-384 SRI integrity hash.
3. **BFF (`MCPAppsMiddleware`)** — Intercepts the `ui://` reference, fetches the JS bundle from `assets.bank.eu`, computes the SHA-384 hash and compares it against the tool result's hash (rejecting on mismatch), and injects the bundle into the AG-UI event stream.
4. **Browser (CopilotKit runtime)** — Renders a sandboxed iframe (`sandbox="allow-scripts allow-forms"` — never `allow-same-origin`) containing the Payment team's React form.
5. **Browser (iframe ↔ AG-UI `postMessage`)** — The user fills the form; the iframe sends `postMessage` to the parent CopilotKit with the origin strictly validated against `assets.bank.eu`, which forwards the form data as AG-UI `STATE_SNAPSHOT` events back to the Strands agent.
6. **AgentCore (Strands interrupt)** — Before calling `payment_execute`, Strands fires `interrupt_before`; the BFF writes a pending approval to DynamoDB and the agent pauses — continuing into the full Maker/Checker approval flow detailed in §1.4 below.
7. **Browser (CopilotChat)** — Once approved, the agent resumes, submits the payment, and narrates the confirmation as text; CopilotKit renders it in chat and removes the iframe from the DOM.

*Figure: Diagram 03 — MCP Apps: Payment Initiation with Sandboxed iframe (ui:// flow)*

### 1.4 Payment Approval — 4-Eyes Human-in-the-Loop

All payment executions pause at Strands `interrupt_before`. The Maker creates a pending approval in DynamoDB. A Checker (different user, server-side validated) reviews and approves via a signed HMAC token. The agent resumes only after the approval token is verified. Same-user approval is rejected server-side unconditionally.

*Figure: Diagram 04 — 4-Eyes Payment Approval: Maker → DynamoDB → Checker → Signed Token → Agent Resume*

### 1.5 Dynamic Tool & UI Registration

Domain teams push a tool manifest to Git. CI/CD runs parallel security gates (SAST, SCA, Trivy, Checkov, TruffleHog), signs the container and manifest, deploys the MCP server to AgentCore, and registers in the Tool Registry. Strands discovers the new tool on the next agent session — zero downtime for the core platform.

*Figure: Diagram 05 — Dynamic Tool Registration: CI/CD → AgentCore → CDN → Tool Registry → Strands Discovery*

### 1.6 Full System — All Layers End-to-End

A multi-tool query ("check my balance and risk profile") showing all nine participants. The agent executes two tool calls sequentially (Core Banking MCP, then Risk Engine MCP), streams results as AG-UI events, and returns a combined natural-language response. Every step publishes an audit event to Kinesis.

*Figure: Diagram 06 — Full Stack: Multi-Tool Query across Browser, WAF, BFF, AgentCore, Bedrock, 2× MCP Servers, Bank APIs, and Audit*


## 2. Frontend — React + CopilotKit Code Reference

### 2.1 CopilotKit Provider (layout.tsx)

`src/app/layout.tsx` — CopilotKit Provider wrapping the entire app:

```tsx
"use client";
import { CopilotKit } from "@copilotkit/react-core";
import { MsalProvider } from "@azure/msal-react";

export default function RootLayout({ children }) {
  return (
    <MsalProvider instance={msalInstance}>
      {/* runtimeUrl points ONLY to BFF — never directly to AgentCore */}
      <CopilotKit runtimeUrl="/api/copilotkit" agent="strands_agent">
        {children}
      </CopilotKit>
    </MsalProvider>
  );
}
```

### 2.2 Dynamic Tool Loader (DynamicToolLoader.tsx)

`src/components/DynamicToolLoader.tsx`:

```tsx
"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { useToolRegistry } from "../hooks/useToolRegistry";

// SRI-verified lazy load for MCP App UI bundles
async function loadWithSRICheck(url, integrity) {
  const resp = await fetch(url, { integrity, credentials: "omit" });
  const text = await resp.text();
  const blob = new Blob([text], { type: "application/javascript" });
  return import(/* webpackIgnore: true */ URL.createObjectURL(blob));
}

function ToolActionRegistrar({ tool }) {
  const UIComponent = tool.ui?.bundle_url
    ? React.lazy(() => loadWithSRICheck(tool.ui.bundle_url, tool.ui.integrity))
    : null;

  useCopilotAction({
    name: tool.name,
    description: tool.description,
    parameters: tool.parameters_schema,
    // Render is a React component — no iframe for MCP Tools path
    render: ({ args, status, result }) => UIComponent
      ? <Suspense fallback={<Skeleton />}><UIComponent args={args} result={result} /></Suspense>
      : null,
    handler: async (args) =>
      bffClient.post("/copilot/tool-action", { tool_id: tool.tool_id, args }),
  });
  return null;
}
```

### 2.3 MSAL Auth Configuration

`src/lib/auth.ts` — MSAL configuration:

```ts
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: "https://copilot.bank.eu/auth/callback",
  },
  cache: {
    cacheLocation: "sessionStorage", // Never localStorage for banking apps
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
// PKCE scopes — access tokens for APIs obtained by BFF only (confidential client)
export const loginRequest = { scopes: ["openid", "profile", "email"] };
```


## 3. BFF — Backend For Frontend Code Reference

### 3.1 CopilotKit Runtime Endpoint

`src/app/api/copilotkit/route.ts` — core BFF endpoint:

```ts
import { CopilotRuntime, ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint, MCPAppsMiddleware } from "@copilotkit/runtime";
import { HttpAgent } from "@ag-ui/client";

export const POST = async (req) => {
  // 1. Validate session + CSRF
  const sessionCtx = await validateSession(req);
  if (!sessionCtx) return new Response("Unauthorized", { status: 401 });

  // 2. Rate limit (token bucket 10 req/s per user)
  if (!await rateLimiter.check(sessionCtx.upn))
    return new Response("Too Many Requests", { status: 429 });

  // 3. Audit incoming request
  await auditLog({ event: "COPILOT_REQUEST", traceId: sessionCtx.traceId,
    userUpn: sessionCtx.upn });

  // 4. HttpAgent points to AgentCore AG-UI endpoint (March 2026 GA)
  const agent = new HttpAgent({
    url: process.env.AGENTCORE_AGUI_URL,
    headers: { Authorization: `Bearer ${sessionCtx.agentcoreToken}`,
      "X-User-UPN": sessionCtx.upn, "X-Trace-ID": sessionCtx.traceId },
  });

  // 5. CopilotRuntime + MCPAppsMiddleware for MCP Apps iframes
  const runtime = new CopilotRuntime({
    agents: { strands_agent: agent },
    middleware: [MCPAppsMiddleware({
      allowedBundleOrigin: "https://assets.bank.eu", // Bank-owned CDN only
      sriRequired: true,
      sandboxPolicy: "allow-scripts allow-forms", // NEVER allow-same-origin
    })],
  });

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime, serviceAdapter: new ExperimentalEmptyAdapter(),
    endpoint: "/api/copilotkit",
  });
  return handleRequest(req);
};
```

### 3.2 Session Validation

`src/lib/session.ts` — session + CSRF validation:

```ts
import { createRemoteJWKSet, jwtVerify } from "jose";

const JWKS = createRemoteJWKSet(
  new URL(`https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`)
);

export async function validateSession(req) {
  const sessionId = req.cookies.get("__Host-session")?.value;
  if (!sessionId) return null;

  const session = JSON.parse(await redis.get(`session:${sessionId}`));
  if (!session) return null;

  // CSRF double-submit validation
  const csrfHeader = req.headers.get("X-CSRF-Token");
  if (csrfHeader !== req.cookies.get("__Host-csrf")?.value) return null;

  // Re-verify id_token (sig, iss, aud, exp)
  await jwtVerify(session.idToken, JWKS, {
    issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    audience: process.env.AZURE_CLIENT_ID,
  });

  // Silent token refresh if expiring < 5 min
  if (session.accessTokenExpiry - Date.now() < 300_000)
    session = await refreshTokenSilently(session);

  return { upn: session.upn, roles: session.roles, traceId: crypto.randomUUID() };
}
```

### 3.3 HTTP Security Headers

`src/middleware.ts` — security headers applied to every response:

```ts
export function middleware(req) {
  const res = NextResponse.next();
  res.headers.set("Content-Security-Policy", [
    "default-src 'self'",
    "script-src 'self' https://assets.bank.eu",
    "frame-src https://assets.bank.eu", // MCP Apps iframes — bank CDN only
    "frame-ancestors 'none'",
    "require-sri-for script style",
    "upgrade-insecure-requests",
  ].join("; "));
  res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin");
  if (req.nextUrl.pathname.startsWith("/api/"))
    res.headers.set("Cache-Control", "no-store, no-cache");
  return res;
}
```


## 4. Approval Service — Complete Implementation

The Approval Service enforces the 4-eyes principle for all write-side operations. It is a standalone FastAPI service backed by DynamoDB (approval state) and SQS (manager notification queue). The maker and checker must be different individuals — this is validated server-side and cannot be bypassed at the UI layer.

### 4.1 DynamoDB Schema

| Attribute | Type | Description |
|-----------|------|-------------|
| approval_id (PK) | String | UUID v4 — partition key |
| tool_name | String | MCP tool requiring approval (e.g. payment_execute) |
| tool_input_hash | String | SHA-256 of tool arguments — input never stored raw |
| maker_upn | String | UPN of staff who initiated the action |
| checker_upn | String | UPN of manager who approved/rejected — populated on decision |
| status | String | States: PENDING \| APPROVED \| REJECTED \| EXPIRED |
| created_at | Number | Unix timestamp (seconds) |
| expires_at | Number | Unix timestamp — TTL attribute (1 hour window) |
| decided_at | Number | Unix timestamp of checker decision |
| checker_note | String | Free-text justification from checker |
| trace_id | String | OTel trace ID linking to full audit trail |
| approval_token | String | HMAC-SHA256 signed token — given to agent to resume |

### 4.2 Complete FastAPI Implementation

`approval_service/main.py` — complete 4-eyes approval service:

```python
import hashlib, hmac, json, time, uuid, base64, os
from fastapi import FastAPI, Depends, HTTPException, Header
from pydantic import BaseModel
import boto3

app = FastAPI(title="EU Bank Approval Service")
dynamodb = boto3.resource("dynamodb", region_name="eu-west-1")
sqs = boto3.client("sqs", region_name="eu-west-1")
table = dynamodb.Table(os.environ["APPROVALS_TABLE"])
QUEUE = os.environ["MANAGER_QUEUE_URL"]
SIGN_KEY = os.environ["APPROVAL_SIGNING_KEY"].encode()  # From Secrets Manager

class ApprovalRequest(BaseModel):
    tool_name: str
    tool_input: dict  # Raw input — hashed before storage
    trace_id: str

def sign_token(approval_id: str, checker_upn: str, ts: int) -> str:
    """HMAC-SHA256 signed token for agent to use when resuming."""
    payload = f"{approval_id}:{checker_upn}:{ts}"
    sig = hmac.new(SIGN_KEY, payload.encode(), hashlib.sha256).hexdigest()
    token_data = base64.urlsafe_b64encode(
        json.dumps({"approval_id": approval_id,
                    "checker_upn": checker_upn,
                    "ts": ts, "sig": sig}).encode()
    ).decode()
    return token_data

def verify_token(token: str, approval_id: str) -> dict:
    """Verify approval token signature — raises on any failure."""
    data = json.loads(base64.urlsafe_b64decode(token.encode()))
    payload = f"{data['approval_id']}:{data['checker_upn']}:{data['ts']}"
    expected = hmac.new(SIGN_KEY, payload.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, data["sig"]):
        raise ValueError("Invalid approval token signature")
    if data["approval_id"] != approval_id:
        raise ValueError("Approval ID mismatch")
    if time.time() - data["ts"] > 3600:
        raise ValueError("Approval token expired")
    return data

@app.post("/approvals")
async def create_approval(req: ApprovalRequest,
                          maker_upn: str = Header(..., alias="X-User-UPN")):
    approval_id = str(uuid.uuid4())
    now = int(time.time())
    # Hash tool input — never store raw arguments (may contain sensitive data)
    input_hash = hashlib.sha256(json.dumps(req.tool_input, sort_keys=True).encode()).hexdigest()
    table.put_item(Item={
        "approval_id": approval_id,
        "tool_name": req.tool_name,
        "tool_input_hash": input_hash,
        "maker_upn": maker_upn,
        "status": "PENDING",
        "created_at": now,
        "expires_at": now + 3600,  # DynamoDB TTL
        "trace_id": req.trace_id,
    })
    sqs.send_message(QueueUrl=QUEUE,
                     MessageBody=json.dumps({"approval_id": approval_id,
                                             "maker_upn": maker_upn,
                                             "tool_name": req.tool_name}))
    return {"approval_id": approval_id, "expires_at": now + 3600}

@app.post("/approvals/{approval_id}/decide")
async def decide(approval_id: str, decision: str, note: str = "",
                 checker_upn: str = Header(..., alias="X-User-UPN"),
                 checker_roles: str = Header(..., alias="X-User-Roles")):
    if "payments.approve" not in checker_roles.split(","):
        raise HTTPException(403, "Missing payments.approve role")
    item = table.get_item(Key={"approval_id": approval_id}).get("Item")
    if not item:
        raise HTTPException(404, "Approval not found")
    if item["status"] != "PENDING":
        raise HTTPException(409, f"Already {item['status']}")
    if item["expires_at"] < int(time.time()):
        raise HTTPException(410, "Approval request expired")
    # 4-EYES: checker MUST differ from maker — no self-approval allowed
    if item["maker_upn"].lower() == checker_upn.lower():
        raise HTTPException(403, "Maker cannot approve their own request (4-eyes policy)")
    now = int(time.time())
    token = sign_token(approval_id, checker_upn, now) if decision == "APPROVED" else None
    table.update_item(
        Key={"approval_id": approval_id},
        UpdateExpression="SET #s=:s, checker_upn=:c, decided_at=:d, checker_note=:n, approval_token=:t",
        ExpressionAttributeNames={"#s": "status"},
        ExpressionAttributeValues={
            ":s": decision, ":c": checker_upn,
            ":d": now, ":n": note, ":t": token or "",
        },
    )
    return {"decision": decision, "token": token}

@app.post("/approvals/{approval_id}/verify-token")
async def verify(approval_id: str, token: str):
    """Called by Strands agent before executing the approved tool."""
    data = verify_token(token, approval_id)  # Raises on invalid
    item = table.get_item(Key={"approval_id": approval_id})["Item"]
    if item["status"] != "APPROVED":
        raise HTTPException(409, "Approval not in APPROVED state")
    return {"valid": True, "checker_upn": data["checker_upn"]}
```
