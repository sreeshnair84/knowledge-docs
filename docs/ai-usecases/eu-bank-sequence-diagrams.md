---
title: "EU Bank AI Copilot — Sequence Diagrams"
date_created: 2026-06-29
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: "eu-bank-sequence-diagrams.html"
doc_type: guide
covers_version: "N/A"
tags: ["ai-usecases", "eu-bank", "sequence-diagrams", "mermaid", "authentication", "mcp"]
---

# EU Bank AI Copilot — Sequence Diagrams

Six sequence diagrams covering all major flows of the EU Bank AI Copilot Platform. See also the [architecture overview](eu-bank-ai-copilot-complete.md) and the [architecture & code reference](eu-bank-ai-copilot-architecture.md).

---

## Diagram 01 — Authentication & Session Establishment

Entra ID OIDC with PKCE. The browser acts as public client — the BFF holds `client_secret` and tokens. The browser only receives an HttpOnly session cookie. Tokens never touch JavaScript.

> **Security note:** The BFF is the confidential OIDC client. `client_secret` is stored in AWS Secrets Manager and never sent to the browser. PKCE `code_verifier` is generated fresh per login attempt.

```mermaid
sequenceDiagram
    autonumber
    actor U as User
    participant BR as Browser
    participant WAF as AWS WAF
    participant BFF as BFF
    participant ENTRA as Entra ID
    participant REDIS as Redis Session

    U->>BR: Navigate to copilot.bank.eu
    Note over BR: Generate code_verifier (128-bit random)<br/>code_challenge = SHA256(code_verifier)<br/>state = random nonce stored in sessionStorage

    BR->>ENTRA: GET /authorize
    Note over BR,ENTRA: response_type=code, client_id, scope=openid profile code_challenge_method=S256, state, nonce
    ENTRA->>U: Show login page and MFA prompt
    U->>ENTRA: Enter credentials and complete MFA
    ENTRA-->>BR: Redirect to /auth/callback with code and state

    Note over BR: Verify returned state equals stored state (CSRF check)

    BR->>WAF: POST /api/auth/callback
    Note over BR,WAF: Body: code and codeVerifier
    WAF->>WAF: OWASP CRS check and geo-block non-EU
    WAF->>BFF: Forward if clean

    Note over BFF: BFF is the confidential OIDC client.<br/>client_secret lives in Secrets Manager only.
    BFF->>ENTRA: POST /token
    Note over BFF,ENTRA: grant_type=authorization_code code, code_verifier, client_id, client_secret
    ENTRA->>ENTRA: Verify SHA256(code_verifier) matches code_challenge
    ENTRA-->>BFF: id_token, access_token, refresh_token, expires_in

    Note over BFF: Validate id_token signature via JWKS endpoint.<br/>Check iss, aud, exp, nbf, nonce claims.
    BFF->>BFF: Extract claims: upn, roles, groups, tid
    BFF->>BFF: Generate sessionId and csrfToken

    BFF->>REDIS: SET session-sessionId to encrypted payload
    Note over BFF,REDIS: upn, roles, idToken, accessToken, refreshToken TTL = 900 seconds (15 min idle timeout)
    REDIS-->>BFF: OK

    BFF-->>BR: 200 OK with two cookies
    Note over BFF,BR: __Host-session: HttpOnly Secure SameSite=Strict Max-Age=900<br/>__Host-csrf: Secure SameSite=Strict Max-Age=900

    Note over BR: Tokens never reach JavaScript.<br/>Session cookie auto-sent on all API calls.<br/>CSRF cookie read by JS for X-CSRF-Token header.

    Note over BR,REDIS: All subsequent calls use session cookie plus CSRF header.<br/>Token refresh is silent and server-side only.
```

> **Token Refresh:** The BFF silently refreshes the `access_token` using the `refresh_token` when expiry is less than 5 minutes away. The browser never sees this happen — it only ever holds the session cookie.

---

## Diagram 02 — MCP Tools: Data Query Flow

User asks a question. Agent decides to call a data tool (e.g. `get_account_balance` on Core Banking MCP). Result streams back as AG-UI SSE events. CopilotKit renders a React component inline in chat. No iframe involved.

> **Protocol chain:** Browser → BFF: HTTPS POST · BFF → AgentCore: AG-UI SSE (HTTPS) · AgentCore → Bedrock: HTTPS · AgentCore → MCP: Streamable-HTTP · MCP → Bank API: HTTPS private link

```mermaid
sequenceDiagram
    autonumber
    participant UI as CopilotKit UI
    participant BFF as BFF and Runtime
    participant AC as AgentCore Strands
    participant BR as Amazon Bedrock
    participant MCP as Core Banking MCP
    participant BANK as Bank Internal API
    participant AUDIT as Audit Kinesis

    UI->>BFF: POST /api/copilotkit
    Note over UI,BFF: Cookie: session token and CSRF header<br/>Body: AG-UI run request with messages

    BFF->>BFF: Validate session from Redis
    Note over BFF: Verify CSRF token<br/>Check rate limit (10 req/s per user)
    BFF->>AUDIT: COPILOT_REQUEST event with traceId and message hash

    Note over BFF: Sanitise prompt: strip HTML, enforce 4096 token limit
    BFF->>AC: HTTPS to AgentCore AG-UI endpoint
    Note over BFF,AC: Authorization Bearer cognitoToken<br/>X-Trace-ID and X-User-UPN headers

    Note over AC: AgentCore validates bearer, routes to Strands container

    AC->>BR: InvokeModelWithResponseStream
    Note over AC,BR: Model: claude-3-5-sonnet-20241022-v2<br/>System: hardened security prompt<br/>Tools: get_account_balance schema etc.<br/>Guardrails: eu-bank-guardrail-01
    BR-->>AC: ToolUse decision: get_account_balance
    Note over BR,AC: with account_id and customer_ref

    AC-->>BFF: AG-UI TOOL_CALL_START event
    BFF-->>UI: SSE tool_call_start event
    Note over UI: useCopilotAction render called with status=inProgress<br/>Shows loading skeleton for AccountBalanceCard

    AC->>MCP: Streamable-HTTP POST to port 8081
    Note over AC,MCP: method tools/call, name get_account_balance<br/>arguments: account_id and customer_ref
    MCP->>MCP: Validate IAM task role
    Note over MCP: Check customer_ref ownership via row-level security
    MCP->>BANK: GET /accounts/balance via private VPC link
    Note over MCP,BANK: X-Customer-Ref header
    BANK-->>MCP: balance, currency, account_type, timestamp
    MCP-->>AC: Tool result with PII stripped
    Note over MCP,AC: balance, currency, account_type, as_of date

    Note over MCP: No IBAN, no customer name, no address returned.
    AC->>AUDIT: TOOL_CALL_COMPLETE with tool name, result hash, latency

    AC->>BR: InvokeModel with tool result appended
    Note over AC,BR: Generate natural language summary
    loop Stream response
        BR-->>AC: Text delta tokens
        AC-->>BFF: AG-UI TEXT_MESSAGE_CONTENT events
        BFF-->>UI: SSE chunks appended to chat
    end

    AC-->>BFF: AG-UI TOOL_CALL_END and RUN_FINISHED events
    BFF->>AUDIT: RESPONSE_SENT with traceId, token count, latency
    BFF-->>UI: SSE stream ends
    Note over UI: useCopilotAction render called with status=complete<br/>AccountBalanceCard displays inline in chat
```

---

## Diagram 03 — MCP Apps: Interactive UI Flow

Agent triggers a tool that returns a `ui://` reference. `MCPAppsMiddleware` fetches and verifies the UI bundle (SRI hash). CopilotKit renders the domain team's UI in a sandboxed iframe. AG-UI keeps iframe state in sync with the agent.

> **Security note:** The iframe is sandboxed with `allow-scripts allow-forms` only — never `allow-same-origin`. `postMessage` origin is strictly validated. No PII passes into the iframe — only opaque references.

```mermaid
sequenceDiagram
    autonumber
    participant UI as CopilotKit UI
    participant BFF as BFF and Middleware
    participant CDN as Bank CDN
    participant AC as AgentCore Strands
    participant BR as Amazon Bedrock
    participant MCP as Payment MCP Port 8082

    UI->>BFF: POST /api/copilotkit
    Note over UI,BFF: Initiate SEPA payment of 5000 EUR to John Smith
    BFF->>AC: AG-UI run request via HttpAgent
    AC->>BR: InvokeModel with payment tools
    BR-->>AC: ToolUse: payment_initiate
    Note over BR,AC: amount=5000, currency=EUR, beneficiary=John Smith

    AC-->>BFF: AG-UI TOOL_CALL_START event
    BFF-->>UI: SSE tool_call_start

    AC->>MCP: Streamable-HTTP tools/call: payment_initiate
    Note over AC,MCP: amount=5000, currency=EUR, beneficiary=John Smith

    Note over MCP: Key difference vs MCP Tools:<br/>Server returns a ui:// resource reference alongside data.
    MCP-->>AC: Tool result with two parts
    Note over MCP,AC: 1. TextContent: Payment form ready for EUR 5000<br/>2. EmbeddedResource: uri=ui://payment-form, integrity=sha384-hash

    AC-->>BFF: AG-UI event includes ui:// resource reference

    Note over BFF: MCPAppsMiddleware intercepts the ui:// reference.
    BFF->>BFF: Parse uri, extract bundle URL and SRI hash
    Note over BFF: Validate bundle origin is assets.bank.eu only
    BFF->>CDN: GET /payment-v2/PaymentForm.js
    CDN-->>BFF: Bundle JavaScript
    BFF->>BFF: Compute SHA-384 hash of received bundle
    Note over BFF: Assert hash matches integrity value in manifest<br/>REJECT and abort if mismatch
    BFF-->>UI: AG-UI stream with MCP App bundle and metadata

    Note over UI: CopilotKit creates sandboxed iframe<br/>sandbox=allow-scripts allow-forms ONLY<br/>never allow-same-origin
    UI->>UI: PaymentForm renders in iframe
    Note over UI: Pre-filled: amount=5000, currency=EUR, beneficiary=John Smith

    Note over UI: User fills in IBAN, reviews, clicks Confirm
    UI->>UI: iframe sends postMessage to parent CopilotKit
    Note over UI: Parent validates event.origin is assets.bank.eu<br/>Rejects all other origins immediately

    UI->>BFF: AG-UI STATE_SNAPSHOT with confirmed form data
    BFF->>AC: Forward state snapshot to Strands agent
    AC->>AC: interrupt_before=payment_execute fires
    Note over AC: Agent pauses and emits interrupt event

    AC-->>BFF: AG-UI INTERRUPT event for payment_execute
    BFF-->>UI: SSE interrupt event
    Note over UI: Chat shows: Payment submitted for manager approval Ref APR-001<br/>See Diagram 04 for approval flow
```

---

## Diagram 04 — Payment Approval: 4-Eyes Human-in-the-Loop

All payment executions pause at `interrupt_before`. A maker creates the payment. A separate manager (checker) must approve. The maker cannot approve their own request. After approval, a signed token is issued and the agent resumes.

> **4-Eyes enforcement:** The Approval Service validates that `checker_upn != maker_upn` server-side. This check cannot be bypassed via the UI. Approval tokens are HMAC-signed and expire in 1 hour.

```mermaid
sequenceDiagram
    autonumber
    actor Maker as Maker Staff
    actor Checker as Checker Manager
    participant MUI as Maker Browser
    participant CUI as Checker Browser
    participant BFF as BFF
    participant APQ as Approval Service
    participant NOTIF as Notifications
    participant AC as AgentCore Strands
    participant MCP as Payment MCP

    Note over Maker,AC: Continuing from MCP Apps flow.<br/>Strands agent paused at interrupt_before=payment_execute.

    Maker->>MUI: Views pending message in chat
    MUI->>BFF: POST /api/approvals
    Note over MUI,BFF: Cookie: Maker session<br/>tool=payment_execute, amount=5000, beneficiary=John Smith

    BFF->>BFF: Validate Maker session
    Note over BFF: Verify payments.initiate role
    BFF->>APQ: DynamoDB PutItem
    Note over BFF,APQ: approval_id=APR-001, tool=payment_execute<br/>amount=5000, iban=DE89-masked<br/>maker_upn=maker@bank.eu, status=PENDING<br/>expires_at=now+3600, trace_id=trace-xyz

    APQ-->>BFF: OK
    BFF-->>MUI: approval_id=APR-001, status=PENDING
    MUI-->>Maker: Payment queued for manager approval APR-001

    APQ->>APQ: DynamoDB Stream triggers notification Lambda
    APQ->>NOTIF: SQS message with approval_id and maker and amount
    NOTIF->>Checker: Email and Teams: Approval required
    Note over NOTIF,Checker: 5000 EUR SEPA payment by maker@bank.eu, Ref APR-001

    Checker->>CUI: Opens approval portal
    CUI->>BFF: GET /api/approvals/APR-001 with Checker session
    BFF->>APQ: DynamoDB GetItem for APR-001
    APQ-->>BFF: Full approval record
    BFF-->>CUI: amount=5000, beneficiary=John Smith
    Note over BFF,CUI: iban=DE89-masked, maker=maker@bank.eu, status=PENDING

    CUI-->>Checker: Shows amount, beneficiary, masked IBAN
    Note over CUI,Checker: APPROVE and REJECT buttons
    Checker->>CUI: Clicks APPROVE with note: Verified with client
    CUI->>BFF: POST /api/approvals/APR-001/decide
    Note over CUI,BFF: Cookie: Checker session<br/>decision=APPROVED, checker_note=Verified with client

    BFF->>BFF: Validate Checker session and payments.approve role
    BFF->>APQ: Load approval record from DynamoDB

    Note over BFF: 4-EYES CHECK: checker_upn must not equal maker_upn.<br/>REJECT immediately if same person attempts to approve.
    BFF->>BFF: Verify expires_at is in the future
    BFF->>BFF: Generate HMAC-SHA256 approval token
    Note over BFF: signed with approval_id, checker_upn, timestamp

    BFF->>APQ: DynamoDB UpdateItem
    Note over BFF,APQ: status=APPROVED, checker_upn=checker@bank.eu<br/>decided_at=now, checker_note=Verified with client

    BFF-->>CUI: token and decision=APPROVED
    CUI-->>Checker: Payment APR-001 approved

    Note over BFF,AC: BFF resumes the paused Strands agent
    BFF->>AC: AG-UI RESUME event with approval_token and approval_id

    AC->>AC: Verify approval token HMAC signature
    AC->>MCP: tools/call: payment_execute
    Note over AC,MCP: approval_token, payment_ref=APR-001<br/>idempotency_key=pay-APR-001-unique
    MCP->>MCP: Verify HMAC signature of approval token
    Note over MCP: Check idempotency key not already used
    MCP->>MCP: Submit to SEPA payment rail
    MCP-->>AC: status=SUBMITTED, payment_id=PAY-20260408-001

    AC->>AC: Emit audit event for payment execution
    AC-->>BFF: AG-UI stream: Payment of 5000 EUR submitted
    Note over AC,BFF: Reference PAY-20260408-001, Approval APR-001
    BFF-->>MUI: SSE stream response
    MUI-->>Maker: Payment confirmation in chat
```

---

## Diagram 05 — Dynamic Tool & UI Registration

A domain team ships a new MCP tool + CopilotKit UI component without touching the core platform. CI/CD validates security gates, deploys the container, publishes the UI bundle, and registers the manifest. Strands picks up the new tool on the next agent session.

> **Zero downtime:** Teams deploy new tools without restarting the core platform. Strands discovers tools dynamically at session start via the Tool Registry. Old tool versions are deprecated automatically after 90 days.

```mermaid
sequenceDiagram
    autonumber
    participant DEV as Domain Dev Team
    participant GH as GitHub Actions
    participant SEC as Security Gates
    participant ECR as ECR Registry
    participant AC as AgentCore Runtime
    participant CDN as Bank CDN S3
    participant TR as Tool Registry API
    participant PG as Aurora PostgreSQL
    participant SA as Strands Agent

    DEV->>GH: git push MCP server, UI component, tool-manifest.json

    GH->>SEC: Run all security gates in parallel
    par SAST scan
        SEC->>SEC: Semgrep OWASP ruleset on Python and TypeScript
    and SCA scan
        SEC->>SEC: Snyk dependency vulnerabilities and pip-audit
    and Secret scan
        SEC->>SEC: TruffleHog for committed secrets
    and IaC scan
        SEC->>SEC: Checkov on Terraform files
    end

    alt Any gate returns HIGH or CRITICAL finding
        SEC-->>GH: FAIL - block deployment
        GH-->>DEV: Pipeline failed: security violation found
    else All gates pass
        SEC-->>GH: All security gates passed
    end

    GH->>GH: Build container image using distroless base
    GH->>ECR: Push image with SHA digest tag
    GH->>GH: Trivy scan container image - fail on CRITICAL or HIGH
    GH->>GH: Generate SBOM in CycloneDX JSON format via Syft
    GH->>GH: Sign container image with AWS Signer and cosign

    GH->>AC: Deploy MCP server container to AgentCore
    Note over GH,AC: New task with scoped IAM task role<br/>agentcore deploy with image and protocol AGUI flag
    AC-->>GH: Container running - health check at /ping OK

    GH->>GH: Build React UI component to JavaScript bundle
    GH->>GH: Compute SHA-384 integrity hash of output bundle
    GH->>CDN: Upload bundle to S3 bank-owned bucket
    Note over GH,CDN: Cache-Control: immutable, max-age=31536000
    CDN-->>GH: Object URL at assets.bank.eu

    GH->>GH: Sign tool-manifest.json with team certificate via cosign
    GH->>TR: POST /tools/register
    Note over GH,TR: tool_id, team, version, mcp_endpoint<br/>capabilities, ui_bundle_url, ui_integrity sha384<br/>required_roles, requires_approval, certificate_thumbprint

    TR->>TR: Validate manifest schema
    TR->>TR: Verify code-signing certificate against internal PKI
    TR->>PG: INSERT tool record ON CONFLICT DO UPDATE
    PG-->>TR: OK
    TR-->>GH: registered with tool_id
    GH-->>DEV: Tool registered successfully

    Note over SA: On next user session start
    SA->>TR: GET /tools with team_id and status=active
    TR->>PG: SELECT active tools for team
    PG-->>TR: Tool records
    TR-->>SA: tools array with mcp_endpoint, capabilities
    Note over TR,SA: ui_bundle_url, ui_integrity, requires_approval flag

    SA->>SA: Connect to MCP server and list tools
    Note over SA: Add to Strands agent tool list
    Note over SA: New tool available without restarting the platform.
```

---

## Diagram 06 — Full System End-to-End

Complete view of all participants across the stack: from browser through WAF, BFF, AgentCore, Bedrock, multiple MCP servers, internal bank APIs, audit streams, and back. Shows the interaction of multiple tools in a single agent response.

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant UI as Browser CopilotKit
    participant WAF as WAF CloudFront
    participant BFF as BFF Runtime
    participant REDIS as Redis
    participant AC as AgentCore Strands
    participant BR as Bedrock Claude
    participant MCP_CB as MCP Core Banking
    participant MCP_RK as MCP Risk Engine
    participant BANK as Bank APIs
    participant AUDIT as Audit Kinesis

    User->>UI: Can you check my account balance and risk profile?
    UI->>WAF: HTTPS POST /api/copilotkit
    Note over UI,WAF: Cookie: session, X-CSRF-Token header
    WAF->>WAF: OWASP CRS rules, rate limit by IP, geo-block non-EU
    WAF->>BFF: Forward if clean

    BFF->>REDIS: GET session to validate cookie
    REDIS-->>BFF: upn, roles, token data
    BFF->>BFF: Validate CSRF token
    Note over BFF: Check rate limit per user<br/>Sanitise and classify prompt

    BFF->>AUDIT: REQUEST_RECEIVED with traceId, upn, message hash

    BFF->>AC: HttpAgent POST to AgentCore AG-UI endpoint
    Note over BFF,AC: Authorization Bearer cognitoToken<br/>X-Trace-ID header

    Note over AC: AgentCore validates bearer token,<br/>creates session, routes to Strands container.

    AC->>BR: InvokeModelWithResponseStream
    Note over AC,BR: System: hardened security prompt<br/>Tools: get_balance and get_risk_score schemas<br/>Guardrails: eu-bank-guardrail-01
    BR-->>AC: Tool call plan
    Note over BR,AC: Step 1: get_account_balance<br/>Step 2: get_risk_score

    Note over AC: Tool call 1 - Core Banking
    AC-->>BFF: AG-UI TOOL_CALL_START get_account_balance
    BFF-->>UI: SSE event - show AccountBalanceCard skeleton

    AC->>MCP_CB: Streamable-HTTP tools/call get_account_balance
    Note over AC,MCP_CB: IAM task role auth, internal VPC only
    MCP_CB->>BANK: GET /accounts/balance via private link
    BANK-->>MCP_CB: balance=12500 currency=EUR type=CURRENT
    Note over MCP_CB: Strip all PII before returning to agent.
    MCP_CB-->>AC: balance=12500, currency=EUR, as_of=today

    AC->>AUDIT: TOOL_COMPLETE get_account_balance with hash and latency
    AC-->>BFF: AG-UI TOOL_CALL_END with balance result
    BFF-->>UI: SSE event - AccountBalanceCard renders

    Note over AC: Tool call 2 - Risk Engine
    AC-->>BFF: AG-UI TOOL_CALL_START get_risk_score
    BFF-->>UI: SSE event - show RiskScoreCard skeleton

    AC->>MCP_RK: Streamable-HTTP tools/call get_risk_score
    Note over AC,MCP_RK: IAM task role auth, internal VPC only
    MCP_RK->>BANK: POST /risk/score via private link
    BANK-->>MCP_RK: score=720, tier=LOW, model=v3.2
    Note over MCP_RK: Score and tier only returned, no PII.
    MCP_RK-->>AC: score=720, tier=LOW, score_date=today

    AC->>AUDIT: TOOL_COMPLETE get_risk_score with hash and latency
    AC-->>BFF: AG-UI TOOL_CALL_END with risk result
    BFF-->>UI: SSE event - RiskScoreCard renders

    AC->>BR: InvokeModel with both tool results
    Note over AC,BR: Generate natural language summary
    loop Stream response tokens
        BR-->>AC: Text delta
        AC-->>BFF: AG-UI TEXT_MESSAGE_CONTENT
        BFF-->>UI: SSE chunk appended to chat
    end

    AC-->>BFF: AG-UI RUN_FINISHED
    BFF->>AUDIT: RESPONSE_SENT with traceId, latency, token count
    BFF-->>UI: SSE stream closed

    Note over UI,AUDIT: Chat shows AccountBalanceCard and RiskScoreCard<br/>plus natural language summary with source attribution.<br/>Full audit trail in S3 WORM with 7-year DORA retention.
```

> **Data Residency:** Every hop — Bedrock, AgentCore, MCP servers, Aurora, S3, Kinesis — is in `eu-west-1` or `eu-central-1`. An AWS Service Control Policy (SCP) blocks creation of resources outside EU regions. This satisfies GDPR Art. 25 and DORA Art. 9 data localisation requirements.
