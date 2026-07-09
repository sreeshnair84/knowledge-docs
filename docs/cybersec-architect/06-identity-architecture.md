---
title: "Part 6 — Identity Architecture"
date: 2026-07-09
---

# Part 6 — Identity Architecture

**Audience:** Identity architects, enterprise architects, and security engineers designing identity systems that span human, machine, and AI principals.

**Related:**
[Overview](index.md) |
[Agentic AI Security](05-agentic-ai-security.md) |
[Security Domains](03-security-domains.md) |
[AI Protocols — Auth & Identity](../ai-protocols/auth/index.md)

> **Current as of July 2026.** Identity is the primary control plane for enterprise security in the cloud and AI era. This part covers the full identity spectrum — from human users to AI agents — and the protocols, patterns, and controls required.

---

## 1. Identity Taxonomy (2026)

| Identity Type | Description | Scale | Primary Protocol | Key Challenge |
|---|---|---|---|---|
| **Human Identity** | Employees, contractors, partners, customers | Thousands | OIDC / SAML / FIDO2 | Phishing, credential theft, privilege creep |
| **Machine Identity** | Servers, services, CI/CD pipelines, IoT | Tens of thousands | X.509 / mTLS / OAuth | Certificate sprawl, expiry management |
| **AI Identity** | LLM endpoints, embedding services, model APIs | Hundreds | OAuth 2.1 / API keys | Key rotation, abuse detection |
| **Agent Identity** | Autonomous AI agents, orchestrators | Hundreds–thousands | SPIFFE / Managed Identity / IETF AIMS | Delegation chains, least privilege, ephemeral nature |
| **Service Identity** | Microservices, APIs, serverless functions | Thousands | SPIFFE / mTLS / OAuth | Service mesh complexity |
| **Robot Identity** | Physical robots, RPA bots, automation platforms | Varies | OAuth / mTLS | Physical-digital boundary, offline scenarios |
| **Digital Workforce Identity** | Virtual agents representing human roles | Varies | Entra Agent ID / OBO | Accountability, delegation scope |

---

## 2. Authentication

### 2.1 Human Authentication

**Authentication factors:**

| Factor | Type | Phishing-Resistant | Recommended for |
|---|---|---|---|
| Password | Knowledge | No | Legacy only; supplement with MFA |
| TOTP (Google Authenticator) | Possession | No | General users where FIDO2 unavailable |
| SMS OTP | Possession | No | Avoid — SIM swap attacks |
| Push notification (Authenticator app) | Possession | Partially | MFA for most users |
| **FIDO2 / Passkeys** | Possession + biometric | **Yes** | All users — preferred |
| Hardware token (YubiKey) | Possession | **Yes** | Privileged accounts, executives |
| Certificate-based auth (CAC/PIV) | Possession | **Yes** | Government, defence |

**Recommendation:** Target 100% FIDO2/passkey adoption for all users by 2027. FIDO2 is the only authentication method that is phishing-resistant by design.

### 2.2 Machine and Service Authentication

| Method | Use Case | Risk | Mitigation |
|---|---|---|---|
| **Long-lived API key** | Legacy integrations | High — key theft or leak | Rotation policy; detect in git via secret scanning |
| **mTLS** | Service-to-service | Low | Certificate lifecycle management (cert-manager, Vault PKI) |
| **OAuth Client Credentials** | Service-to-API | Medium | Short TTL tokens; client secret in Vault, not config |
| **Workload Identity Federation** | Cloud service → Cloud API | Very low | No credential; OIDC-based identity |
| **SPIFFE SVID** | Microservices, k8s workloads | Very low | Automatic rotation via SPIRE; hardware attestation |

### 2.3 AI Agent Authentication

Agents are software principals — they cannot use human authentication flows.

**Recommended patterns (in priority order):**

1. **Managed Identity**: Agent workload claims identity from cloud provider IMDS — no credential storage. Ideal for cloud-native agents (AWS, Azure, GCP).

2. **SPIFFE SVID**: SPIRE attests agent workload via Kubernetes annotations or TPM attestation and issues a short-lived X.509 SVID. Ideal for multi-cloud and Kubernetes-native agents.

3. **OAuth Client Credentials**: Agent uses a client ID + client secret stored in a secrets manager. Secret rotated frequently. Fallback for environments without managed identity or SPIFFE.

4. **AVOID: Hardcoded API keys**: Never embed API keys in agent prompts, environment variables committed to source control, or Docker images.

---

## 3. Authorization

### 3.1 Authorization Models

| Model | Description | Best For |
|---|---|---|
| **RBAC** (Role-Based) | Permissions assigned to roles; users/agents assigned to roles | Enterprise applications, most IAM systems |
| **ABAC** (Attribute-Based) | Permissions based on attributes of subject, resource, action, environment | Fine-grained control; contextual access decisions |
| **ReBAC** (Relationship-Based) | Permissions based on relationships between entities (Google Zanzibar model) | Google Drive-like sharing; hierarchical ownership |
| **PBAC** (Policy-Based) | Centralized policy engine evaluates access in real time | Zero Trust enforcement; OPA, Cedar |
| **IBAC** (Intent-Based) | AI-evaluated intent determines access appropriateness | Emerging; not yet production-ready for sensitive systems |

### 3.2 Policy-as-Code

Modern authorization uses code-based policies evaluated at runtime:

**Open Policy Agent (OPA) example:**
```rego
# Allow agent to read documents if agent is authorized and document is not restricted
allow if {
    input.principal.type == "ai_agent"
    agent_authorized(input.principal.agent_id)
    input.resource.classification != "restricted"
    input.action == "read"
}

agent_authorized(agent_id) if {
    data.authorized_agents[agent_id].status == "active"
    data.authorized_agents[agent_id].expiry > time.now_ns()
}
```

**Cedar (AWS) example:**
```cedar
permit(
    principal is Agent,
    action == Action::"ReadDocument",
    resource is Document
) when {
    principal.status == "authorized" &&
    resource.classification != "restricted" &&
    context.task_id != ""
};
```

### 3.3 Scope and Least Privilege for Agents

Agent authorization scopes must be **task-specific and time-limited**:

```
# Per-task token scope example (JWT claims)
{
  "sub": "agent:research-agent-001",
  "iss": "https://identity.corp.com",
  "aud": ["mcp-server:search", "mcp-server:docs"],
  "scope": "search:read docs:read",
  "task_id": "task-abc-123",
  "exp": 1720800000,   // 15 minutes from now
  "iat": 1720799100,
  "principal_user": "user@corp.com",  // delegating human
  "delegation_scope": "research_task"
}
```

**What this achieves:**
- Agent can only access `search` and `docs` MCP servers
- Agent can only read, not write
- Token expires in 15 minutes — even if stolen, limited window of abuse
- Delegation chain is recorded (which human authorized this task)

---

## 4. Delegation

### 4.1 Token Exchange (RFC 8693)

Token exchange allows one principal to exchange its token for a token representing a different principal or scope:

```
Human token (full access)
        ↓ RFC 8693 token exchange
Agent token (task-scoped, limited access)
        ↓ RFC 8693 token exchange (sub-delegation)
Sub-agent token (even more limited scope)
```

**Key parameters:**
- `subject_token`: The token being exchanged
- `requested_token_type`: The type of token requested (access token, JWT, etc.)
- `scope`: The scope of the new token (must be subset of subject_token scope)
- `audience`: The intended recipient of the new token

### 4.2 On-Behalf-Of (OBO)

OBO is a specific token exchange pattern where a service acts on behalf of a user:

**Microsoft Entra OBO flow:**
```
1. User authenticates → receives user_token (scope: read_documents)
2. User delegates to agent
3. Agent calls Entra with:
   - user_token (proves user's identity)
   - Desired scope for agent (must be subset of user_token scopes)
4. Entra issues agent_token with:
   - sub: agent_id
   - on_behalf_of: user@corp.com
   - scope: read_documents (limited to what user had)
5. Agent uses agent_token to call document API
6. Document API verifies: agent is authorized, acting for identified user
```

### 4.3 Security Token Service (STS)

An STS is the component that issues, validates, and exchanges tokens:

| STS | Provider | Features |
|---|---|---|
| Microsoft Entra ID | Microsoft | SAML, OIDC, OBO, managed identity, Entra Agent ID |
| AWS IAM / STS | Amazon | AssumeRole, OIDC federation, Cognito |
| Google Cloud IAM | Google | Workload identity federation, service account keys |
| HashiCorp Vault | HashiCorp | Dynamic secrets, PKI, auth methods for any platform |
| Keycloak | Open source | OIDC/SAML, custom auth flows, extensible |

---

## 5. Key Token Standards

### 5.1 JWT (JSON Web Token)

JWT is the most widely used token format for API authorization.

**Structure:** `header.payload.signature` (base64url-encoded, dot-separated)

**Security requirements:**
- Always verify signature before trusting claims
- Validate `exp` (expiry), `iss` (issuer), and `aud` (audience)
- Use short expiry for sensitive operations (5–15 minutes)
- Store in HttpOnly cookies (not localStorage) for browser contexts
- Use JWK (JSON Web Key) endpoint for public key discovery

### 5.2 PASETO (Platform-Agnostic Security Tokens)

PASETO is a more secure alternative to JWT that eliminates common JWT pitfalls:

- No algorithm confusion attacks (algorithm is fixed by version)
- Local (symmetric) or Public (asymmetric) token types — no ambiguity
- Simpler to implement correctly
- Recommended for new implementations where JWT backwards compatibility is not required

### 5.3 Short-Lived Credentials

**Why short-lived credentials matter:**
- Stolen short-lived credentials have a limited window of abuse
- Encourages automation of credential rotation (builds capability, removes human bottleneck)
- Reduces blast radius of compromise

**Target lifetimes by credential type:**

| Credential Type | Maximum Lifetime | Rotation Mechanism |
|---|---|---|
| User session token | 1–8 hours | Re-authentication or refresh token |
| Agent access token | 5–15 minutes | Automatic re-issuance before expiry |
| Service-to-service token | 15–60 minutes | Client credentials flow or managed identity |
| API key (legacy) | 90 days | Automated rotation via secrets manager |
| TLS certificate | 90 days | cert-manager / ACME |
| SPIFFE SVID | 1 hour | Automatic renewal via SPIRE |
| Cloud IAM temporary credential | 1–12 hours | Instance metadata service |

---

## 6. Secrets Management

### 6.1 Anti-Patterns to Eliminate

| Anti-Pattern | Risk | Migration Path |
|---|---|---|
| Hardcoded credentials in source code | Any repo access = credential theft | Secret scanning + immediate revocation + secrets manager |
| Secrets in environment variables | Process listing or logging exposes secrets | Secrets manager with dynamic injection |
| Secrets in container images | Image pull = credential theft | Build-time injection via CI secrets, or managed identity |
| Long-lived shared credentials | Cannot attribute actions to individual | Unique credential per identity; managed identity |
| Plaintext secrets in config files | Config access = credential theft | Encrypt at rest; use references not values |

### 6.2 Secrets Manager Architecture

```
Application / Agent
        ↓ (authenticated request — managed identity)
Secrets Manager (Vault / AWS SM / Azure KV)
        ↓ (authorization policy evaluated)
Dynamic Secret Generated
        ↓ (short-lived, scoped to caller)
Application uses secret for target resource
        ↓ (secret expires; next call generates new secret)
```

**HashiCorp Vault dynamic secrets** generate a new credential for each request — no stored, reusable credentials exist. The database receives a unique username/password per application instance; when the application shuts down, Vault revokes the credential automatically.

### 6.3 Certificate Rotation

Certificate expiry has caused major outages (Microsoft Teams 2020, Azure AD 2019). Automate rotation:

- **cert-manager** (Kubernetes): Automatic certificate issuance and renewal via ACME or internal CA
- **Vault PKI**: Internal CA for service-to-service TLS; auto-renews before expiry
- **AWS ACM / Azure Key Vault**: Managed certificate rotation for cloud resources
- **Monitoring**: Alert at 30 days remaining, critical at 7 days remaining

### 6.4 Workload Identity Federation

Eliminates the need for long-lived secrets by trusting the identity of the workload itself:

**Pattern (GitHub Actions → AWS):**
```
GitHub Actions OIDC provider issues JWT for the workflow
        ↓ (presented to AWS STS)
AWS STS validates JWT signature against GitHub's JWKS endpoint
        ↓ (if valid and role trust policy matches)
AWS STS issues short-lived AWS credentials
        ↓
GitHub Actions workflow uses credentials for AWS operations
```

No AWS access key/secret stored anywhere. Credentials valid for the workflow duration only.
