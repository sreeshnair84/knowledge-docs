---
title: "Part 7"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Part7_Standards_Reference.pdf"
doc_type: guide
tags: ["ai-protocols", "mcp", "a2a"]
last_reviewed: 2026-07-10
framework_name: ""
last_reviewed: 2026-07-10
covers_version: "N/A"
---

Enterprise AI Authentication Research • Part 7 of 7 

# **Part 7** 

## **Standards Reference & Quick Reference Guide** 

OAuth 2.1, OIDC, RFC 8693, RFC 7523, implementation checklists, vendor documentation references, and decision frameworks 

Enterprise Authentication & Identity Propagation for AI Agents 

### **Key Standards Reference** 

This section summarises the authoritative standards that underpin enterprise AI authentication and identity propagation. Architects and engineers should read primary sources alongside this research. 

#### **OAuth 2.0 and OAuth 2.1** 

##### **OAuth Standards** 

|**Standard**|**RFC / Spec**|**Key Requirements**|**AI Agent Relevance**|
|---|---|---|---|
|OAuth 2.0 Core|RFC 6749|Authorization Code, Client<br>Credentials, Implicit, ROPC<br>grants|Foundation for all AI tool<br>authentication|
|OAuth 2.0 Bearer Tokens|RFC 6750|Bearer token usage in<br>Authorization header|Every AI API call uses<br>bearer tokens|
|OAuth 2.1 (draft)|draft-ietf-oauth-v2-1|PKCE mandatory; Implicit +<br>ROPC prohibited; exact<br>redirect URI|New AI integrations should<br>target 2.1|
|PKCE|RFC 7636|code_verifier,<br>code_challenge, S256<br>method|Required for all public<br>clients (AI IDEs, CLIs)|
|Token Introspection|RFC 7662|POST /introspect to<br>validate opaque token|MCP servers validate user<br>tokens at runtime|
|Token Revocation|RFC 7009|POST /revoke to invalidate<br>tokens|Used on user offboarding,<br>session termination|
|Dynamic Client Registration|RFC 7591|Programmatic OAuth client<br>registration|Agent-to-agent trust<br>establishment|

#### **OpenID Connect (OIDC)** 

##### **OIDC Specifications** 

|**Specification**|**Purpose**|**Key Claims**|**AI Agent Use**|
|---|---|---|---|
|OIDC Core 1.0|ID token format and<br>validation|sub, iss, aud, exp, iat,<br>nonce|User identity in ID token;<br>passed to MCP servers|
|OIDC Discovery|/.well-known/openid-configu<br>ration|Authorization, token, JWKS<br>endpoints|AI platform discovers IdP<br>endpoints automatically|
|OIDC Dynamic Registration|Client registration at IdP|Client metadata, redirect<br>URIs|AI agent self-registers with<br>enterprise IdP|

|**Specification**|**Purpose**|**Key Claims**|**AI Agent Use**|
|---|---|---|---|
|OIDC Session<br>Management|Front-channel and<br>back-channel logout|Session state, logout<br>endpoints|AI platform terminates<br>session on IdP logout|
|OIDC FAPI 2.0|Financial-grade API profile|Strengthened OIDC for<br>banking|Banking AI must comply<br>with FAPI 2.0|

#### **RFC 8693 — OAuth 2.0 Token Exchange** 

RFC 8693 defines the 'token exchange' grant type, enabling a service to obtain a new token on behalf of another entity. This is the foundation for all On-Behalf-Of patterns in enterprise AI. 

##### **RFC 8693 Token Exchange Request Parameters** 

|**Parameter**|**Value / Description**|
|---|---|
|grant_type|urn:ietf:params:oauth:grant-type:token-exchange|
|subject_token|The incoming token (user's access token to exchange)|
|subject_token_type|urn:ietf:params:oauth:token-type:access_token|
|requested_token_type|urn:ietf:params:oauth:token-type:access_token (or jwt)|
|audience|Target service identifier (e.g. https://graph.microsoft.com)|
|scope|Requested scopes for the new token|
|actor_token|Optional: token representing the acting service (AI<br>platform)|
|actor_token_type|Optional: type of actor token|

#### **RFC 7523 — JWT Bearer Token for OAuth 2.0** 

RFC 7523 defines how a JWT can be used as an OAuth 2.0 grant type ('JWT Bearer') or client authentication mechanism. This enables service-to-service authentication without client secrets, using signed JWTs with short expiry instead. 

##### **RFC 7523 JWT Bearer Use Cases** 

|**Use Case**|**JWT Bearer Application**|
|---|---|
|GitHub App authentication|GitHub App signs JWT with private key; exchanges for<br>installation token|
|Salesforce JWT Bearer flow|App presents user-asserting JWT; Salesforce issues user<br>access token|
|Service account assertion|AI service signs JWT claiming service identity; IdP issues<br>access token|

|**Use Case**|**JWT Bearer Application**|
|---|---|
|OBO pre-authorization|Admin pre-authorizes users; app presents JWT asserting<br>user identity|

#### **Downscoping and Scope Reduction** 

Downscoping is the practice of obtaining a token with reduced scopes from a broader token. This enables least-privilege tool execution: the AI platform holds a broad user token but requests narrow-scope tokens for each individual tool call. 

##### **Downscoping Patterns** 

|**Pattern**|**Mechanism**|**Example**|
|---|---|---|
|Google Credential Downscoping|google-auth DownscopedCredentials<br>class|Broad storage token→read-only<br>token for specific GCS bucket|
|Entra OBO with limited scope|scope parameter in OBO request|Full Graph token→Files.Read.All<br>only for SharePoint calls|
|AWS STS AssumeRole with policy|inline session policy in AssumeRole|Admin role→read-only S3 session<br>for specific prefix|
|Kafka / OAuth scope reduction|Scope parameter in token exchange|Broad Kafka admin→specific topic<br>read scope|

### **Decision Frameworks** 

#### **Choosing an Authentication Method for a New Connector** 

Use this decision framework when adding a new tool connector to an enterprise AI platform: 

**New Connector Authentication Decision Framework** 

|**Question**|**If YES**→|**If NO**→|
|---|---|---|
|Does the target API support OAuth<br>2.0?|Use OAuth 2.0 (proceed to next<br>question)|Consider SAML Bearer, API key, or<br>PAT (with strict rotation)|
|Do you need user identity in the API<br>call?|Use OAuth 2.0 Authorization Code +<br>PKCE (user-delegated)|Use Client Credentials (service<br>account); document that user identity<br>is lost|
|Is this a public client (CLI, browser,<br>IDE)?|PKCE is MANDATORY; do not use<br>client secret|Confidential client: use client secret +<br>PKCE|
|Does the target support OBO / token<br>exchange?|Use RFC 8693 token exchange for<br>multi-hop identity|Each hop needs separate OAuth<br>consent; educate users|
|Is the token lifetime > 2 hours?|Request offline_access for refresh<br>token; implement silent refresh|Implement re-auth prompt before<br>token expiry|
|Is this a high-privilege API<br>(write/delete)?|Require human approval gate before<br>execution|Proceed with standard OAuth flow|
|Is this API in a regulated scope (PCI,<br>SOX)?|Add OPA policy; require additional<br>approvals; extra audit logging|Standard governance controls apply|

#### **Choosing Between Service Account and Delegated Access** 

##### **Delegated vs Service Account Decision** 

|**Factor**|**Use Delegated (User Token)**|**Use Service Account**|
|---|---|---|
|Trigger|User actively requests the action|Background task, scheduled job,<br>indexing|
|Audit requirement|Must know which user did the action|System action; no specific user<br>context needed|
|Permission level|User's own permissions (least<br>privilege)|Admin-granted narrow permissions|
|Data access scope|User can only see what they can<br>access|Must be explicitly restricted; risk of<br>over-access|
|Compliance|Required for PCI, SOX user attribution|Acceptable for non-user-attributed<br>background work|

||**Factor**|**Use Delegated (User Token)**|**Use Service Account**|
|---|---|---|---|
|Revocation||Token revoked when user leaves|Service account managed<br>independently|

### **Implementation Checklists** 

#### **OAuth 2.1 Implementation Checklist** 

##### **Authorization Server** 

- I Enforce PKCE (S256 method) for all clients 

- I Prohibit implicit grant type 

- I Prohibit Resource Owner Password Credentials grant 

- I Enforce exact redirect URI matching 

- I Implement refresh token rotation on each use 

- I Support RFC 8693 token exchange for OBO 

- I Publish /.well-known/openid-configuration 

- I Rotate signing keys; publish JWKS at /.well-known/jwks.json 

##### **Client (AI Platform)** 

- I Generate unique code_verifier (min 43 chars, base64url encoded) 

- I Compute code_challenge = BASE64URL(SHA256(code_verifier)) 

- I Store code_verifier only in server memory (not in browser) 

- I Validate state parameter to prevent CSRF 

- I Validate id_token: signature, iss, aud, exp, iat, nonce 

- I Store tokens encrypted at rest (AES-256 + KMS) 

- I Never log access tokens or refresh tokens 

- I Implement silent refresh before token expiry (at 75% lifetime) 

##### **Resource Server (MCP Server / API)** 

- I Validate token: signature, iss, aud, exp, scope 

- I Check token against revocation list (JTI blacklist or introspection) 

- I Support Continuous Access Evaluation (CAE) claims 

- I Log all API calls with token JTI + user sub + correlation IDs 

- I Return WWW-Authenticate header on 401 with proper error codes 

- I Never reflect token back in error responses or logs 

#### **MCP Server Security Checklist** 

- I Register MCP server in approved server registry; sign manifest 

- I Validate caller identity (AI platform JWT) before processing any tool call 

- I Validate user identity token (OAuth) before executing tool 

- I Check OPA policy before and after tool execution 

- I Log every tool invocation with: tool_name, user_id, args_hash, trace_id 

- I Implement rate limiting per user per tool (e.g. 100 calls/min) 

- I Reject tool calls with unexpected or malformed parameter schemas 

- I Sanitize tool output before returning to AI (prevent prompt injection via results) 

- I Use short-lived credentials for downstream API calls (not long-lived service account keys) 

- I Implement health checks; alert on anomalous tool call patterns 

#### **Audit & Compliance Checklist** 

- I Define and document the 10-step audit chain (login → API call → response) 

- I Implement trace_id (W3C traceparent) propagation through all components 

- I Ensure conversation_id is included in all tool call logs 

- I Centralise logs in SIEM (Splunk/Azure Sentinel/Chronicle) 

- I Implement non-repudiable log storage (WORM or cryptographic chaining) 

- I Define log retention periods per regulation (PCI: 12 months; SOX: 7 years) 

- I Create SIEM detection rules for AI-specific threats (token exfil, prompt injection) 

- I Schedule quarterly access reviews for AI service accounts and OAuth apps 

- I Document AI audit trail in compliance evidence package 

- I Test end-to-end audit trail annually (trace a sample interaction from user to API) 

### **Vendor Documentation References** 

##### **Vendor & Standards Documentation References** 

|**Topic**|**Source**|**URL / Reference**|
|---|---|---|
|Microsoft Entra OBO|Microsoft Docs|learn.microsoft.com/en-us/entra/identi<br>ty-platform/v2-oauth2-on-behalf-of-flo<br>w|
|M365 Copilot Architecture|Microsoft|learn.microsoft.com/en-us/copilot/micr<br>osoft-365/microsoft-365-copilot-archit<br>ecture|
|M365 Copilot Audit|Microsoft Purview|learn.microsoft.com/en-us/purview/au<br>dit-copilot-interaction|
|CAE (Continuous Access Evaluation)|Microsoft|learn.microsoft.com/en-us/entra/identi<br>ty/conditional-access/concept-continu<br>ous-access-evaluation|
|GitHub Apps Auth|GitHub Docs|docs.github.com/en/apps/creating-gith<br>ub-apps/authenticating-with-a-github-<br>app|
|GitHub Audit Log|GitHub Docs|docs.github.com/en/organizations/kee<br>ping-your-organization-secure/reviewi<br>ng-the-audit-log|
|Atlassian OAuth 2.0 3LO|Atlassian Docs|developer.atlassian.com/cloud/jira/pla<br>tform/oauth-2-3lo-apps|
|Forge Security|Atlassian|developer.atlassian.com/platform/forg<br>e/security-overview|
|ServiceNow OAuth|ServiceNow Docs|docs.servicenow.com/bundle/latest/pa<br>ge/administer/security/concept/c_OAu<br>thApplications.html|
|Amazon Q Business Auth|AWS Docs|docs.aws.amazon.com/amazonq/late<br>st/qbusiness-ug/security.html|
|Anthropic MCP Spec|Anthropic|modelcontextprotocol.io|
|MCP Security|MCP Spec|modelcontextprotocol.io/docs/concept<br>s/security|
|Google A2A Protocol|Google|developers.googleblog.com/2025/04/<br>a2a-protocol.html|
|Salesforce OAuth Flows|Salesforce Docs|help.salesforce.com/s/articleView?id=<br>sf.remoteaccess_oauth_flows.htm|
|RFC 6749 OAuth 2.0|IETF|datatracker.ietf.org/doc/html/rfc6749|

|**Topic**|**Source**|**URL / Reference**|
|---|---|---|
|RFC 7636 PKCE|IETF|datatracker.ietf.org/doc/html/rfc7636|
|RFC 8693 Token Exchange|IETF|datatracker.ietf.org/doc/html/rfc8693|
|RFC 7523 JWT Bearer|IETF|datatracker.ietf.org/doc/html/rfc7523|
|OAuth 2.1 Draft|IETF|datatracker.ietf.org/doc/draft-ietf-oaut<br>h-v2-1|
|OIDC Core 1.0|OpenID Foundation|openid.net/specs/openid-connect-cor<br>e-1_0.html|
|OIDC FAPI 2.0 (Banking)|OpenID Foundation|openid.net/specs/fapi-2_0-security-pr<br>ofile.html|
|NIST SP 800-63B|NIST|pages.nist.gov/800-63-4/sp800-63b.ht<br>ml|
|OPA (Open Policy Agent)|OPA|www.openpolicyagent.org/docs/latest|
|AWS Cedar Policy Language|AWS|docs.cedarpolicy.com|
|Zero Trust Architecture|NIST SP 800-207|csrc.nist.gov/publications/detail/sp/80<br>0-207/final|

### **Glossary** 

##### **Glossary of Terms** 

||**Term**|**Definition**|
|---|---|---|
|OAuth 2.0||Industry-standard protocol for delegated authorization;<br>enables apps to access resources on behalf of users|
|OAuth 2.1||Consolidated update to OAuth 2.0; mandates PKCE,<br>prohibits implicit flow and ROPC|
|PKCE||Proof Key for Code Exchange (RFC 7636); prevents<br>authorization code interception attacks|
|OIDC||OpenID Connect; identity layer on top of OAuth 2.0;<br>provides ID tokens with user claims|
|OBO||On-Behalf-Of; OAuth pattern where a service exchanges a<br>user token for a new token for a downstream service|
|RFC 8693||OAuth 2.0 Token Exchange standard; formal specification<br>for token-exchange grant type|
|RFC 7523||JWT Profile for OAuth 2.0 Client Authentication and<br>Authorization Grants|
|MCP||Model Context Protocol; Anthropic's open standard for AI<br>tool integration via typed tool schemas|
|A2A||Agent-to-Agent; Google's protocol for AI agents<br>communicating with each other|
|CAE||Continuous Access Evaluation; real-time token revocation<br>based on policy events (sub-30 second)|
|JTI||JWT ID claim; unique identifier for a JWT token; used for<br>replay prevention and revocation|
|SAML||Security Assertion Markup Language; XML-based SSO<br>federation standard|
|STS||Security Token Service; issues, validates, renews, and<br>cancels security tokens|
|RBAC||Role-Based Access Control; access determined by user's<br>assigned roles|
|ABAC||Attribute-Based Access Control; access determined by<br>attributes of user, resource, environment|
|PBAC||Policy-Based Access Control; access determined by<br>complex policies combining multiple factors|

||**Term**|**Definition**|
|---|---|---|
|OPA||Open Policy Agent; general-purpose policy engine with<br>Rego policy language|
|Cedar||AWS Cedar policy language; purpose-built for fine-grained<br>authorization|
|DWD||Domain-Wide Delegation; Google service account<br>capability to impersonate any user in a Workspace domain|
|FAPI||Financial-grade API; strengthened OAuth/OIDC profile for<br>banking and financial services|
|EMU||Enterprise Managed Users; GitHub feature where org<br>controls all user accounts|
|CAB||Change Advisory Board; committee that approves IT<br>change requests in ITSM frameworks|
|SCIM||System for Cross-domain Identity Management; protocol<br>for automated user provisioning|
|PAT||Personal Access Token; long-lived credential used in place<br>of passwords for API access|
|Zero Trust||Security model: never trust, always verify; authenticate and<br>authorize every request|
