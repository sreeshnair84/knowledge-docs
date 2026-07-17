---
title: "EU Bank AI Copilot Platform — Part 4: Compliance, Infrastructure & Observability"
date_created: 2026-06-29
last_reviewed: 2026-07-17
status: current
source_type: converted-pdf
source_file: "eu-bank-ai-copilot-complete.pdf"
tags: ["ai-usecases", "copilotkit", "strands-agents", "agentcore"]
doc_type: multi-part-series
covers_version: "as of 2026-07-10"
series_name: "EU Bank AI Copilot Platform"
series_part: 4
series_total: 4
series_index: "ai-usecases/eu-bank-ai-copilot-complete"
---

# EU Bank AI Copilot Platform — Part 4: Compliance, Infrastructure & Observability

Continues from [Part 3: Agent Runtime, MCP Servers & Security](./eu-bank-ai-copilot-part3-agent-mcp-security.md), which covered the agent/MCP code references, the Tool Registry, OWASP controls, testing, and threat modeling.

This final part covers GDPR/DORA/EU AI Act compliance controls, IAM and CI/CD infrastructure, the operational runbook, observability instrumentation, and closes with a glossary of terms used throughout the series.

## 1. EU Regulatory Compliance

### 1.1 GDPR Controls

| Article | Requirement | Implementation |
|---------|-------------|----------------|
| Art. 5 | Data Minimisation | Agent receives only fields needed per tool call. No bulk customer data in context window. |
| Art. 17 | Right to Erasure | DELETE /users/\{id\}/data cascades through DynamoDB and pseudonymises S3 audit records. |
| Art. 25 | Privacy by Design | PII stripped from all logs at BFF. Bedrock no-training flag. EU-only data residency via SCP. |
| Art. 32 | Security of Processing | KMS CMK encryption at rest. TLS 1.3 in transit. MFA enforced. Annual pen testing. |
| Art. 33 | Breach Notification | GuardDuty + Security Hub alert triggers 72-hour notification SLA runbook automatically. |

### 1.2 DORA Controls (Digital Operational Resilience Act)

| DORA Article | Control Implemented |
|--------------|---------------------|
| Art. 9 — ICT Risk Management | Quarterly threat model reviews; automated SCA; risk register per MCP tool in Tool Registry |
| Art. 10 — Detection | OpenTelemetry to SIEM; anomaly detection on tool call volume and patterns; GuardDuty ML |
| Art. 11 — Recovery | Multi-AZ AgentCore; Redis AOF persistence; DynamoDB global tables; RTO 4h / RPO 1h documented |
| Art. 17 — ICT Incidents | Incident classification matrix; PagerDuty integration; post-incident reports within 30 days |
| Art. 25 — Testing | Annual penetration test; AI red-team exercise targeting prompt injection and tool abuse |
| Art. 26 — ICT Contracts | AWS Master Agreement + GDPR DPA in place; AgentCore documented as critical third-party ICT |

### 1.3 EU AI Act Readiness

- Human oversight is mandatory for all consequential actions — payments, risk overrides, KYC decisions.
- Model transparency: agent responses include source citations and confidence indicators.
- Logging is sufficient for post-hoc explainability review (all tool calls and model decisions audited).
- Model card maintained for each Bedrock Claude version; version changes require security review.
- Bias monitoring framework planned for v2 for any scoring-adjacent tool outputs.
- Platform operates in internal staff-assistance mode; High-Risk AI Act classification being monitored.


## 2. Infrastructure & Deployment

### 2.1 IAM Least Privilege Matrix

| Principal | Allowed Actions | Explicit Denies |
|-----------|-----------------|-----------------|
| BFF IRSA Role | agentcore:InvokeRuntime, kinesis:PutRecord, s3:PutObject (audit bucket only) | All other services; no iam:* |
| AgentCore Task Role | bedrock:InvokeModel, secretsmanager:GetSecretValue, dynamodb:GetItem/PutItem (own tables) | No S3 write; no IAM; no cross-account |
| MCP Task Role (Payment) | Internal payment API only via VPC endpoint | All AWS services; no internet egress |
| MCP Task Role (Core Banking) | Core banking read endpoint only | Write endpoints denied by explicit Deny |

### 2.2 CI/CD Security Gate Pipeline

`.github/workflows/security.yml` — security gate pipeline:

```yaml
jobs:
  security:
    steps:
      # SAST
      - run: semgrep --config=p/owasp-top-ten --error .
      - run: bandit -r mcp_servers/ agent/ -ll

      # SCA — CVSS >= 7 blocks deployment
      - run: snyk test --severity-threshold=high
      - run: pip-audit -r requirements.txt

      # Secret scanning
      - run: trufflehog git file://. --only-verified --fail

      # IaC scan
      - run: checkov -d infra/ --framework terraform --hard-fail-on HIGH

      # Container scan — distroless base images
      - run: trivy image --exit-code 1 --severity CRITICAL,HIGH $IMAGE

      # SBOM generation (CycloneDX)
      - run: syft . -o cyclonedx-json > sbom.json

      # Code signing for MCP manifests
      - run: cosign sign-blob tool-manifest.json --bundle bundle.json
```

### 2.3 Bedrock Guardrails (Terraform)

`infra/guardrails.tf` — Bedrock Guardrails for PII and prompt injection:

```hcl
resource "aws_bedrock_guardrail" "eu_bank" {
  name = "eu-bank-guardrail"

  content_policy_config {
    filters_config {
      type            = "PROMPT_ATTACK"
      input_strength  = "HIGH"
      output_strength = "HIGH"
    }
  }

  sensitive_information_policy_config {
    pii_entities_config { type = "CREDIT_DEBIT_CARD_NUMBER" ; action = "BLOCK" }
    pii_entities_config { type = "BANK_ACCOUNT_NUMBER" ; action = "ANONYMIZE" }
    pii_entities_config { type = "PHONE" ; action = "ANONYMIZE" }
  }

  topic_policy_config {
    topics_config {
      name       = "investment-advice"
      definition = "Providing specific investment advice or recommendations"
      type       = "DENY"
    }
  }
}
```

### 2.4 Summary: End-to-End Call Flow

| Step | From | To | Protocol | Auth Method |
|------|------|----|----------|-------------|
| 1 | Browser (CopilotChat) | BFF /api/copilotkit | HTTPS POST | Session cookie + CSRF header |
| 2 | BFF (OIDC layer) | Entra ID JWKS | HTTPS GET (cached) | JWT signature validation |
| 3 | BFF (CopilotRuntime) | AgentCore :8080/invocations | HTTPS + AG-UI SSE | Cognito Bearer / SigV4 |
| 4 | AgentCore (Strands) | Amazon Bedrock | HTTPS | IAM task role (VPC endpoint) |
| 5 | AgentCore (MCP client) | MCP Server :808x/mcp | Streamable-HTTP | IAM task role (internal VPC) |
| 6 | MCP Server | Internal Bank API | HTTPS (private link) | mTLS + internal OAuth |
| 7 | AgentCore | BFF (CopilotRuntime) | AG-UI SSE stream | Same TLS session |
| 8 | BFF | Browser | SSE (chunked HTTPS) | Same session cookie context |
| 9* | BFF (MCPAppsMiddleware) | CDN (assets.bank.eu) | HTTPS GET | SRI hash verification |
| 10* | Browser (iframe) | Parent CopilotKit | postMessage | event.origin: assets.bank.eu only |

\* Steps 9–10 apply to the MCP Apps path only.


## 3. Operational Runbook

This runbook covers the most common operational scenarios: incident response, common failure modes with their remediation, blue-green deployment procedure, and disaster recovery steps. All runbook steps assume access to the AWS console and kubectl access to the EKS cluster.

### 3.1 Incident Classification Matrix

| Priority | Criteria | Response SLA | Escalation |
|----------|----------|--------------|------------|
| P1 — Critical | Platform down, data breach suspected, payment rail unavailable | 15 min | Incident Commander + CISO + CTO |
| P2 — High | Agent error rate >5%, latency P99 >8s, auth failures >10/min | 30 min | On-call Engineer + Platform Lead |
| P3 — Medium | MCP server degraded, audit stream lag >30s, tool errors elevated | 2 hours | On-call Engineer |
| P4 — Low | Non-critical alert, minor latency spike, single user issue | 8 hours | Next business day |

### 3.2 Common Failure Modes & Remediation

`ops/runbook-failures.sh` — common failure modes and remediation:

```bash
# FAILURE: AgentCore returns 5xx errors
# SYMPTOMS: BFF logs "HttpAgent: 503 from AgentCore endpoint"
# CHECK:
aws bedrock-agentcore describe-runtime --runtime-id $RUNTIME_ID
aws ecs list-tasks --cluster eu-bank-agentcore
# REMEDIATION: Force new task deployment
agentcore deploy --force-redeploy --runtime-id $RUNTIME_ID
# FALLBACK: If AgentCore unavailable > 5 min, BFF serves graceful degradation UI.
# Set environment variable to trigger fallback mode:
kubectl set env deployment/eu-bank-bff AGENTCORE_FALLBACK=true

# ------------------------------------------------------------------
# FAILURE: Entra ID JWKS validation fails
# SYMPTOMS: All /api/copilotkit calls return 401, BFF logs "JWT validation failed"
# LIKELY CAUSE: JWKS cache stale after key rotation
# REMEDIATION:
kubectl rollout restart deployment/eu-bank-bff   # Clears JWKS cache

# ------------------------------------------------------------------
# FAILURE: MCP Core Banking server timeout
# SYMPTOMS: get_account_balance tool returns 504, Strands logs "MCP timeout"
# CHECK:
kubectl logs -n mcp-servers -l app=mcp-core-banking --tail=100
curl -k https://mcp-corebanking.internal.../mcp/health
# REMEDIATION:
kubectl rollout restart deployment/mcp-core-banking -n mcp-servers

# ------------------------------------------------------------------
# FAILURE: Audit stream Kinesis lag alert
# SYMPTOMS: CloudWatch alarm "AuditStreamLag > 30000ms"
# CHECK:
aws kinesis describe-stream-summary --stream-name eu-bank-agent-audit
# REMEDIATION: Scale Kinesis consumers (Lambda function)
aws lambda update-function-configuration --function-name audit-processor \
  --reserved-concurrent-executions 20
```

### 3.3 Blue-Green Deployment Procedure

`ops/blue-green-deploy.sh` — zero-downtime deployment:

```bash
# Blue-Green deployment for Strands agent on AgentCore

# 1. Deploy new version to GREEN slot
agentcore deploy \
  --image ecr://account/strands-agent:${NEW_VERSION} \
  --slot green \
  --runtime-id $RUNTIME_ID

# 2. Run smoke tests against GREEN slot
pytest tests/smoke/ --env=staging --slot=green

# 3. Gradually shift traffic (10% -> 50% -> 100%)
agentcore update-traffic-weight --green 10 --blue 90
sleep 300   # Monitor error rate
agentcore update-traffic-weight --green 50 --blue 50
sleep 300   # Monitor
agentcore update-traffic-weight --green 100 --blue 0

# 4. Keep BLUE warm for 30 min (rollback window)
sleep 1800

# 5. Decommission BLUE
agentcore remove-slot --slot blue

# ROLLBACK (if P1 incident triggered during deploy):
agentcore update-traffic-weight --green 0 --blue 100
# Takes effect within 30 seconds
```

### 3.4 Disaster Recovery (DR) Runbook

| Scenario | RTO Target | RPO Target | Recovery Steps |
|----------|------------|------------|----------------|
| AgentCore region failure (eu-west-1) | 4 hours | 15 minutes | Fail over to eu-central-1; DynamoDB global table already replicating; update BFF AGENTCORE_AGUI_URL env var |
| Redis session store failure | 30 minutes | 0 (stateless re-auth) | Users re-authenticate; BFF auto-detects Redis failure and rejects sessions gracefully |
| Aurora PostgreSQL failure (Tool Registry) | 1 hour | 5 minutes | Aurora Multi-AZ auto-failover; verify Tool Registry API health check at /health |
| Bedrock model unavailable | 2 hours | N/A | Update model_id in Secrets Manager to fallback Claude version; Strands agent picks up on next restart |
| S3 audit bucket unavailable | Non-blocking | 5 minutes | Kinesis buffers events; audit processor retries automatically; S3 Object Lock preserves data |


## 4. Observability & Monitoring

Full-stack observability is mandatory under DORA Art. 10 (detection) and EBA ICT Guidelines. Every layer — browser, BFF, AgentCore, MCP servers, and internal APIs — emits structured OpenTelemetry (OTel) traces, metrics, and logs. These flow to a central Grafana stack and Amazon CloudWatch, with Security Hub and GuardDuty handling anomaly detection.

### 4.1 OpenTelemetry Instrumentation — BFF (TypeScript)

`src/lib/telemetry.ts` — OpenTelemetry SDK setup:

```ts
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";

export const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: "eu-bank-bff",
    [ATTR_SERVICE_VERSION]: process.env.APP_VERSION ?? "unknown",
    "deployment.environment": process.env.NODE_ENV,
    "cloud.region": "eu-west-1",
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT, // Grafana Alloy collector
  }),
  instrumentations: [new HttpInstrumentation()],
});
sdk.start();

// Custom span for every copilot request
export async function tracedCopilotRequest(traceId: string, fn: () => Promise<Response>) {
  const tracer = trace.getTracer("copilot-runtime");
  return tracer.startActiveSpan("copilot.request", { attributes: {
    "copilot.trace_id": traceId,
  }}, async (span) => {
    try {
      const result = await fn();
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (err) {
      span.recordException(err);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw err;
    } finally {
      span.end();
    }
  });
}
```

### 4.2 OpenTelemetry Instrumentation — Strands Agent (Python)

`agent/telemetry.py` — OTel traces + custom metrics:

```python
from opentelemetry import trace, metrics
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource

resource = Resource.create({
    "service.name": "eu-bank-strands-agent",
    "service.version": os.environ.get("APP_VERSION", "unknown"),
    "cloud.region": "eu-west-1",
    "deployment.env": os.environ.get("ENV", "prod"),
})
tracer_provider = TracerProvider(resource=resource)
tracer_provider.add_span_processor(
    BatchSpanProcessor(OTLPSpanExporter(
        endpoint=os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"]
    ))
)
trace.set_tracer_provider(tracer_provider)
meter_provider = MeterProvider(resource=resource)
metrics.set_meter_provider(meter_provider)
tracer = trace.get_tracer(__name__)
meter = metrics.get_meter(__name__)

# Custom metrics
tool_call_counter = meter.create_counter("agent.tool_calls_total")
tool_latency_hist = meter.create_histogram("agent.tool_latency_ms")
token_usage_counter = meter.create_counter("agent.bedrock_tokens_total")
interrupt_counter = meter.create_counter("agent.interrupts_total")

# Usage in AuditCallbackHandler
class AuditCallbackHandler:
    def on_tool_call_start(self, tool_name, tool_input):
        tool_call_counter.add(1, {"tool": tool_name})
        self._span = tracer.start_span(f"tool.{tool_name}")

    def on_tool_call_end(self, tool_name, result, latency_ms):
        tool_latency_hist.record(latency_ms, {"tool": tool_name})
        if self._span: self._span.end()

    def on_llm_call(self, input_tokens, output_tokens):
        token_usage_counter.add(input_tokens, {"type": "input"})
        token_usage_counter.add(output_tokens, {"type": "output"})
```

### 4.3 Key Dashboards & Alerts

| Dashboard / Alert | Metric / Query | Threshold | Action |
|-------------------|----------------|-----------|--------|
| Copilot Request Rate | rate(copilot_requests_total[5m]) | >200 req/min | Scale BFF pods |
| Agent Latency P99 | histogram_quantile(0.99, agent_request_duration_ms) | >8000ms | PagerDuty P2 |
| Tool Call Error Rate | rate(tool_calls_total\{status="error"\}[5m]) | >5% | PagerDuty P2 |
| Bedrock Token Spend | sum(agent_bedrock_tokens_total) per hour | >500k tokens/hr | Slack alert + quota check |
| Session Validation Failures | rate(session_validation_failures[5m]) | >10/min | Security Hub + PagerDuty P1 |
| Payment Interrupt Rate | rate(agent_interrupts_total\{tool="payment_execute"\}[1h]) | Anomaly baseline | Fraud team notification |
| MCP Server Latency | histogram_quantile(0.95, mcp_tool_latency_ms) | >3000ms | MCP server alert |
| Audit Stream Lag | Kinesis GetRecords.IteratorAgeMilliseconds | >30000ms | PagerDuty P2 — audit gap risk |

### 4.4 Log Schema (Structured JSON)

Every BFF log entry follows this schema (PII-scrubbed before emit):

```jsonc
{
  "timestamp": "2026-04-08T10:00:00.000Z",
  "level": "INFO",
  "service": "eu-bank-bff",
  "version": "1.3.2",
  "trace_id": "trace-uuid-v4",
  "span_id": "span-hex-8",
  "event": "TOOL_CALL_COMPLETE",
  "user_upn": "user@bank.eu", // pseudonymised in prod
  "tool_name": "get_account_balance",
  "latency_ms": 342,
  "result_hash": "sha256:aab...", // NOT the result itself
  "env": "prod",
  "region": "eu-west-1",
  "pii_scrubbed": true
}
```

PII scrubber patterns applied before every `log.emit()`:

```ts
const PII_PATTERNS = [
  /\b[A-Z]{2}\d{2}[A-Z0-9]{4,}\b/g,                 // IBAN
  /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,    // Card PAN
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,    // Email
  /\b\d{9,11}\b/g,                                  // NIN/SSN-like
];
```


## 5. Glossary

Key terms, acronyms, and protocol names used throughout this document.

**AG-UI** — Agent-User Interaction Protocol. An open protocol developed by CopilotKit that standardises real-time, bidirectional communication between AI agent backends and frontend UIs. Uses SSE or WebSocket transport. Delivers tool lifecycle events, state patches, and message tokens.

**AgentCore Runtime** — AWS Bedrock AgentCore Runtime — a managed container platform for hosting AI agent workloads. Supports HTTP, MCP, A2A, and AG-UI protocols. Provides built-in auth (Cognito OAuth 2.0), session isolation, auto-scaling, and observability.

**Approval Token** — A short-lived HMAC-SHA256 signed JWT-like token issued by the Approval Service after a checker approves a gated operation. The Strands agent presents this token to the relevant MCP server when executing the approved tool.

**BFF** — Backend For Frontend. A dedicated server-side layer that mediates between the browser and downstream services. In this architecture it holds the Entra ID OIDC session, enforces CSRF protection, rate limiting, audit logging, and PII scrubbing.

**CopilotKit** — An open-source React framework for building AI agent UIs. Provides CopilotChat, useCopilotAction, and @copilotkit/runtime (server SDK). Implements the AG-UI protocol for real-time agent-UI sync.

**CopilotRuntime** — The server-side component of CopilotKit (@copilotkit/runtime). Deployed in the BFF. Handles AG-UI event routing, manages HttpAgent connections to AgentCore, and attaches MCPAppsMiddleware.

**CSRF** — Cross-Site Request Forgery. An attack where a malicious site tricks an authenticated user's browser into making unwanted requests. Mitigated here using the Double-Submit Cookie pattern with __Host- prefixed cookies and X-CSRF-Token header.

**DORA** — Digital Operational Resilience Act. EU Regulation 2022/2554. Mandates ICT risk management, incident reporting, resilience testing, and third-party ICT provider oversight for financial entities. Effective January 2025.

**4-Eyes Principle** — A segregation of duties control requiring that a second authorised person (checker) independently reviews and approves an action initiated by a first person (maker). Maker and checker must be different individuals — validated server-side.

**HttpAgent** — A client class from @ag-ui/client that connects to any AG-UI-compatible SSE endpoint. Used in the BFF CopilotRuntime config to point at the AgentCore AG-UI endpoint.

**Idempotency Key** — A unique client-generated key attached to write operations (e.g. payments). If the same key is submitted twice, the server returns the original result rather than processing twice. Prevents duplicate payments from retries or network errors.

**MCPAppsMiddleware** — A middleware component in @copilotkit/runtime that intercepts ui:// resource references returned by MCP servers, fetches the UI bundle from CDN, verifies the SRI hash, and injects it into the AG-UI stream for iframe rendering.

**MCP Apps** — A CopilotKit extension to the Model Context Protocol (January 2026) that allows MCP servers to ship interactive HTML/JS UI alongside tool results via a ui:// resource URI. Rendered in sandboxed iframes. AG-UI synchronises iframe state with the agent.

**MCP Tools** — The original Model Context Protocol tool pattern. MCP server exposes callable functions; the agent calls them and receives JSON/data back; the host application renders the result via useCopilotAction.

**OIDC** — OpenID Connect. An identity layer built on top of OAuth 2.0. Used here with Microsoft Entra ID and the PKCE extension to authenticate bank staff securely. The BFF acts as a confidential OIDC client.

**PKCE** — Proof Key for Code Exchange (RFC 7636). A security extension to OAuth 2.0 that prevents authorisation code interception attacks. The client generates a code_verifier and sends its SHA-256 hash (code_challenge) to the authorisation server.

**Prompt Injection** — An attack where malicious content in user input or documents attempts to override an LLM's system instructions. Mitigated via XML tag sandboxing of user input, Bedrock Guardrails, and BFF sanitisation.

**SRI** — Subresource Integrity. A browser security feature that verifies that fetched resources have not been tampered with. Implemented here as sha384 hashes on MCP App UI bundles, verified by MCPAppsMiddleware before iframe rendering.

**Strands** — AWS Strands Agents SDK. An open-source Python (and TypeScript) framework for building AI agents with MCP tool integration, multi-turn conversation management, and human-in-the-loop interrupt flows.

**Streamable HTTP** — The current recommended MCP transport (replacing SSE). Uses standard HTTP POST with optional streaming responses. All MCP servers in this architecture use streamable-http transport on dedicated ports.

**Tool Registry** — A FastAPI service backed by Aurora PostgreSQL that serves as the authoritative catalogue of all active MCP tools. Domain teams register tools here via CI/CD; the Strands agent queries it on each session start for dynamic tool discovery.

**useCopilotAction** — A React hook from @copilotkit/react-core that registers a frontend action handler. When the Strands agent calls a matching MCP tool, CopilotKit invokes the render() function to display a native React component inline in chat.
---

This is the final part of the series. Together, Parts 1–4 cover the EU Bank AI Copilot Platform end-to-end — see the [series index](./eu-bank-ai-copilot-complete.md) for the full part list.
