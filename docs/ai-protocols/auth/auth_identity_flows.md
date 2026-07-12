---
title: "Authentication & Identity Flows"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "auth_identity_flows.pdf"
doc_type: guide
tags: ["ai-protocols", "mcp", "a2a"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# Authentication & Identity Flows
Complete Auth Architecture with Supporting Diagrams

A comprehensive technical reference documenting every authentication and authorisation flow in the Azure AI Agent Architecture — from end-user OAuth2/OIDC through APIM JWT validation, Managed Identity service-to-service flows, AKS Workload Identity OIDC federation, Key Vault secret injection, and Zero Trust defence-in-depth. Includes eight annotated architecture diagrams.

Document Type Scope Platform Protocols Phase Coverage Date

**Technical Reference — Security & Identity All auth flows in the Azure AI Agent Architecture Microsoft Entra ID · Azure APIM · ACA · AKS · Key Vault OAuth 2.0 · OIDC · Managed Identity · PKCE · JWT · IMDS Phase 1 (Foundation)** → **Phase 3 (Enterprise) April 2026**

## **01 Identity Architecture Overview**

The Azure AI Agent Architecture uses Microsoft Entra ID as the single, unified identity plane for all authentication and authorisation — across user-facing APIs, service-to-service calls, infrastructure access, and secret management. This implements a strict Zero Trust model: every request is verified, every identity is granted least privilege, and no credentials are ever stored in application code, environment variables, or container images.

#### **Four Authentication Patterns**

##### **OAuth 2.0 Auth Code + PKCE —** ***User-facing***

x **OAuth 2.0 Auth Code + PKCE —** ***User-facing*** Interactive authentication for human users via browser. Used for: developer portal, admin interfaces, HIL approval flows. PKCE prevents auth code interception attacks.

### y **Client Credentials Flow —** ***Daemon/Service***

Machine-to-machine for background services with no user context. Used for: Command Workers calling APIM, scheduled tasks, Harness Delegate → Azure operations. No scp claim — uses roles claim instead.

### z **Managed Identity (IMDS) —** ***Azure Resources***

Azure-native service identity — no credentials anywhere. Used for: Orchestrator → Key Vault, Worker → Azure OpenAI, Delegate → ACR, ACA → Cosmos DB. Azure rotates credentials automatically.

### { **Workload Identity (OIDC) —** ***AKS Pods***

Kubernetes-native OIDC federation for pods. Used for: Harness Delegate on AKS, Chaos Agent pods. Service Account token exchanged for Entra ID JWT without IMDS interception.

#### **Master Identity Architecture Diagram**

The diagram below shows all four authentication patterns in context, with Microsoft Entra ID as the central trust anchor:

*Fig 1. Unified Microsoft Entra ID identity plane with all four auth patterns*

**Page 2**

## **02 User Authentication — OAuth2 Auth Code + PKCE**

Users accessing the AI Agent system authenticate via the OAuth 2.0 Authorization Code flow with PKCE (Proof Key for Code Exchange). PKCE is mandatory — it eliminates the risk of auth code interception attacks by binding the code exchange to a cryptographic verifier known only to the original requester.

#### **Step-by-Step Flow**

#### **Technical Details**

|**Parameter**|**Value**|**Purpose**|
|---|---|---|
|**response_type**|code|Authorization code flow (not implicit)|
|**code_challenge_method**|S256|SHA-256 hashed PKCE verifier|
|**scope**|openid profile api://{app-id}/.default|Request ID token + API access|
|**redirect_uri**|https://{apim-host}/.auth/callback|Only registered URIs accepted|
|**token_endpoint**|login.microsoftonline.com/{tenant}/oauth2/v2.0/token|Token exchange endpoint|

**Page 3**

|**access_token TTL**|1 hour (3600s)|Short-lived; refresh token used after|
|---|---|---|
|**refresh_token TTL**|90 days (sliding)|Rotated on every use|
|**MFA enforcement**|Conditional Access Policy|Required for all user logins|

**Page 4**

## **03 Managed Identity — Service-to-Service (IMDS)**

Managed Identity is the primary authentication mechanism for all service-to-service communication within the Azure AI Agent Architecture. When enabled on an Azure resource (ACA, AKS, Functions), Azure automatically creates and manages a Service Principal in Entra ID. The workload obtains tokens from the Azure Instance Metadata Service (IMDS) endpoint — accessible only from within the Azure resource — without storing any credentials.

#### **IMDS Token Flow Diagram**

##### **IMDS Request Example (Python — azure-identity SDK)**

```
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient
# DefaultAzureCredential automatically uses IMDS when running on Azure
```

**Page 5**

```
credential = DefaultAzureCredential()
client = SecretClient(vault_url="https://{vault}.vault.azure.net", credential=credential)
secret = client.get_secret("aoai-api-key")
# No credentials in code. Token fetched from http://169.254.169.254/metadata/identity/...
```

**Page 6**

## **Client Credentials Flow — Workers & Background 04 Services**

The OAuth 2.0 Client Credentials grant is used for daemon processes and background services that operate without a signed-in user. In the AI Agent Architecture, Command Workers use this flow to authenticate against APIM when calling Azure OpenAI through the Model Router. Unlike delegated flows, tokens contain a **roles** claim (not scp) and require explicit App Role assignment.

#### **Client Credentials Flow Diagram**

##### **Token Request (curl example)**

```
# Step 1: Acquire token from Entra ID
curl -X POST \
"https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token" \
```

- <mark>`-d "client_id={worker-app-client-id}" \`</mark>

- <mark>`-d "client_secret={worker-app-secret}" \`</mark>

- <mark>`-d "scope=api://{apim-backend-app-id}/.default" \`</mark>

- <mark>`-d "grant_type=client_credentials" # Step 2: Call APIM with Bearer token curl -X POST "https://{apim-host}/agents/v1/complete" \ -H "Authorization: Bearer eyJ0eXAiOiJKV1Q..." \ -H "task_type: reasoning" \`</mark>

- <mark>`-d '{"prompt": "...", "max_tokens": 2000}'`</mark>

Production recommendation: Replace client_secret with a certificate assertion (client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer). Certificate private key stored in Azure Key Vault. APIM's validate-jwt policy checks the **roles** claim (e.g. Worker.Invoke) rather than scp.

**Page 7**

## **05 AKS Workload Identity — OIDC Federation**

For workloads running on AKS (primarily the Harness Delegate and Chaos Agent), Microsoft Entra Workload ID uses OIDC federation to issue Azure AD tokens to Kubernetes pods without any IMDS proxy or Custom Resource Definitions. The AKS cluster acts as an OIDC token issuer; service account tokens are projected into pods and exchanged for Entra ID access tokens.

#### **Configuration Requirements**

- AKS cluster: Enable OIDC issuer (--enable-oidc-issuer) and Workload Identity webhook

- (--enable-workload-identity)

- Service Account: Annotate with azure.workload.identity/client-id: {managed-identity-client-id}

- Pod spec: Label with azure.workload.identity/use: "true" (Fail-Close mode for reliability)

- Federated credential: Register OIDC issuer URL + namespace/service-account in Managed Identity

- Code: Use DefaultAzureCredential() — automatically selects WorkloadIdentityCredential on AKS

- Maximum 20 federated credentials per Managed Identity

##### **Harness Delegate Workload Identity YAML annotation:**

```
apiVersion: v1
kind: ServiceAccount
metadata:
name: harness-delegate-sa
namespace: harness-delegate-ng
annotations:
azure.workload.identity/client-id: {managed-identity-client-id}
```

```
---
```

**Page 8**

```
# Pod template label (in Delegate StatefulSet spec):
labels:
azure.workload.identity/use: "true"
```

**Page 9**

## **06 Azure Key Vault — Runtime Secret Injection**

Azure Key Vault is the single secret store for the entire AI Agent Architecture. No connection strings, API keys, certificates, or passwords are stored in environment variables, Kubernetes secrets, pipeline YAML, or application code. All secrets are fetched at runtime via Managed Identity using the Key Vault REST API, with access controlled by Azure RBAC.

|**Azure Key Vault — Runtime Secret Injection (Zero Credential Storage)**<br><br> <br><br>|
|---|
|**ACA/AKS**<br>Workload<br>**IMDS /**<br>Entra ID<br>**Azure**<br>Key Vault<br>**Target**<br>Resource|
|xGET <http://169.254.169.254/metadata/identity/oauth2/token><br>?resource=<https://vault.azure.net><br>yJWT Bearer Token (scope: vault.azure.net)<br>zGET https://{vault}.vault.azure.net/secrets/{name}<br>Authorization: Bearer{token}<br>RBAC check: Key Vault Secrets User role<br>{Secret value (AOAI key / connection string)<br>**Azure RBAC Roles for Key Vault:**<br>Key Vault Secrets User — read secrets|Key Vault Crypto User — use keys|Key Vault Reader—view metadata only<br>Harness Secrets Manager connector uses Key Vault API — secrets fetched at pipeline runtime, never logged<br>|
||Use secret for outbound call to target service<br>Secret NOT stored in env var or code — fetched at runtime<br>Auto-rotation: Harness re-fetches on each pipeline run — no manual credential rotation required<br>*Fig 6. Azure Key Vault runtime secret injection — zero credential storage pattern*<br>**Secrets Stored in Key Vault**|
|**Secret Name**<br>**Type**<br>**Consumer**<br>**Rotation**|
|**aoai-api-key-primary**<br>API Key<br>Orchestrator, Workers via APIM<br>Monthly auto-rotate|
|**aoai-api-key-secondary**<br>API Key<br>APIM fallback backend<br>Monthly auto-rotate|
|**cosmos-connection-string**<br>Connection String<br>LTM service (Orchestrator)<br>Quarterly|
|**redis-access-key**<br>Password<br>STM clients (Orchestrator, Workers)<br>Quarterly|
|**service-bus-connection**<br>Connection String<br>Worker Registry (ACR publish)<br>Quarterly<br>**ai-search-admin-key**<br>API Key<br>Knowledge Base indexer (ADF)<br>Quarterly|
|**harness-delegate-cert**<br>Certificate<br>Harness Delegate (Client assertion)<br>Annual (auto)<br>**teams-webhook-url**<br>URL Secret<br>HIL Logic Apps notification<br>On change|
|**worker-contract-signing-key**<br>HMAC Key<br>Worker Registry contract validation<br>Annual|

**Page 10**

## **07 APIM JWT Validation — Inbound Policy**

Azure API Management acts as the single authorisation gateway for all LLM calls. Every inbound request must present a valid Bearer token. APIM's validate-jwt policy performs cryptographic signature verification, claim validation, and role/scope checking before any request reaches backend services. This enforces authorisation even if backend services do not implement their own auth.

#### **APIM validate-jwt Policy (Production Configuration)**

|`<policies>`<br>`<inbound>`<br>`<base />`|
|---|
|`<validate-jwt header-name="Authorization"`|
|`failed-validation-httpcode="401"`<br>`failed-validation-error-message="Unauthorized. Token missing or invalid.">`|
|`<openid-config url="https://login.microsoftonline.com/{tenant}/v2.0`<br>`/.well-known/openid-configuration" />`<br>`<audiences>`<br>`<audience>api://{backend-app-client-id}</audience>`<br>`</audiences>`<br>`<issuers>`<br>`<issuer>https://sts.windows.net/{tenant-id}/</issuer>`<br>`<issuer>https://login.microsoftonline.com/{tenant-id}/v2.0</issuer>`<br>`</issuers>`|

**Page 11**

```
<required-claims>
<!-- For client credentials: check roles -->
<claim name="roles" match="any">
<value>Worker.Invoke</value>
<value>Orchestrator.Call</value>
</claim>
</required-claims>
</validate-jwt>
<!-- Strip token before forwarding to backend -->
<set-header name="Authorization" exists-action="delete" />
<!-- Add Managed Identity token for backend auth -->
<authentication-managed-identity resource="https://cognitiveservices.azure.com" />
</inbound>
</policies>
```

**Page 12**

## **08 Zero Trust Architecture — Defence in Depth**

**Page 13**

## **09 Network Isolation — Private Endpoints & VNet**

All PaaS services in the AI Agent Architecture are accessed exclusively via Azure Private Endpoints inside a dedicated VNet. No service is exposed to the public internet from within the workload. Egress from ACA and AKS workloads is routed through Azure Firewall with FQDN allow-lists. This prevents token leakage, SSRF attacks, and data exfiltration.

#### **Network Security Controls**

|**Control**|**Implementation**|**Auth Benefit**|
|---|---|---|
|**Private Endpoints**|Azure Private Link on all PaaS (AOAI, Cosmos, Key Vault, Service|Bus, ACR)<br>Tokens only valid within VNet — no internet exposure|
|**Azure Firewall**|Egress via Firewall with FQDN allow-list (login.microsoftonline.com,|vault.azure.net)<br>Prevents SSRF and unauthorized token requests|
|**NSG Rules**|Deny-all default; explicit allow inbound from APIM subnet only|Prevents lateral movement between subnets|
|**UDR (Route Tables)**|Force tunnel to Azure Firewall for all egress|Intercepts and inspects all outbound auth traffic|
|**APIM Internal Mode**|APIM deployed in internal VNet mode — no public IP|JWT validation enforced before traffic enters VNet|
|**Conditional Access**|Require MFA + compliant device for admin identities|Prevents credential stuffing on admin accounts|

#### **09.1 Conditional Access Policies**

Conditional Access enforces contextual authorisation on top of token validation:

- Require MFA for all user-facing authentication (Orchestrator portal, HIL approval, admin console)

- Require Azure AD-joined or Intune-compliant device for admin/ops roles

- Block legacy authentication protocols (basic auth, NTLM) — OAuth2/OIDC only

- Named locations: allow only corporate IP ranges for admin role access

- Sign-in risk policy: Block sign-ins with high Entra ID Identity Protection risk score

- Token binding: Enable Continuous Access Evaluation (CAE) for near-real-time revocation

**Page 14**

## **10 Implementation Checklist & Common Pitfalls**

#### **10.1 Implementation Checklist**

##### **Phase 1 — Identity Foundation**

I Register backend-app in Entra ID; expose API URI (api://{client-id}); define App Roles

I Register worker-app; grant application permissions (not delegated); admin consent

I Enable System-Assigned Managed Identity on all ACA environments

I Enable AKS OIDC Issuer + Workload Identity webhook on AKS cluster

I Configure Key Vault with RBAC authorization (not vault access policies)

I Assign Key Vault Secrets User role to each Managed Identity

I Deploy APIM validate-jwt policy on all API operations

I Configure APIM Authentication header stripping (delete Authorization before backend)

I Enable Entra ID Conditional Access: require MFA for user flows

##### **Phase 2 — Scale & Hardening**

I Implement Continuous Access Evaluation (CAE) for real-time token revocation

I Replace client_secret with certificate assertion for all Worker identities

I Enable Azure Defender for Key Vault — alert on anomalous secret access

I Configure Key Vault auto-rotation for AOAI keys (Event Grid trigger on near-expiry)

I Set up User-Assigned Managed Identity for Worker pool (shared identity)

I Annotate all AKS workloads with Workload Identity labels

I Enable APIM caching of OIDC configuration — reduce token validation latency

##### **Phase 3 — Enterprise Governance**

I Enable Privileged Identity Management (PIM) for all administrative roles

I Configure Entra ID Identity Protection: risk-based Conditional Access

I Implement access reviews: quarterly review of all App Role assignments

I Enable Entra ID audit logs → Azure Monitor → Log Analytics for SIEM integration

I Configure Azure Policy: deny creation of secrets in code, enforce Managed Identity use

I Red-team exercise: token theft simulation, SSRF testing via Harness PyRIT

- I Implement just-in-time (JIT) access for Key Vault admin operations via PIM

#### **10.2 Common Pitfalls & Mitigations**

|**Pitfall**|**Risk**|**Mitigation**|
|---|---|---|
|**Storing client_secret in env vars**|Secret leakage via logs/config dumps|Use Managed Identity or cert assertion; Key Vault ref|
|**Wrong audience (aud) in token**|401 errors on every request|Use api://{backend-app-id}/.default scope exactly|
|**scp vs roles confusion**|Authorization always fails for daemon apps|Client credentials→roles claim; delegated→scp claim|

**Page 15**

|**IMDS endpoint behind proxy**|Token acquisition fails silently|IMDS (169.254.169.254) must be non-proxied; configure exclusion|
|---|---|---|
|**Token not cached locally**|IMDS throttling (429) under load|Use DefaultAzureCredential — built-in token cache (5 min)|
|**Missing federated credential**|Workload Identity pod fails auth|Register OIDC issuer URL + namespace/SA in Managed Identity|
|**Validate-jwt missing in APIM**|Backend auth skipped entirely|Policy must be in inbound section; test with expired token|
|**Broad RBAC roles (Contributor)**|Excessive privilege — blast radius|Use minimum built-in roles (Secrets User, not Admin)|

*References: Microsoft Learn — OAuth 2.0 and OIDC on Microsoft identity platform · Azure Container Apps Authentication · Managed Identities for Azure Resources · AKS Workload Identity Overview · APIM validate-jwt policy · Azure Key Vault RBAC · Conditional Access documentation · Microsoft Entra ID Zero Trust guidance*

**Page 16**
