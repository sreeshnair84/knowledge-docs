---
title: "Part 6"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Part6_Banking_Case_Study.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

Enterprise AI Authentication Research • Part
# **Part 6** 

## **Banking Case Study** 

Production architecture for a highly regulated bank: Zero Trust AI agents with AWS, Entra ID, MCP, GitHub Enterprise, ServiceNow, Confluence, Jira, M365, SharePoint, and Slack 

Enterprise Authentication & Identity Propagation for AI Agents 

### **Case Study — Regulated Banking Institution** 

This case study designs a production-grade enterprise AI platform for a global bank subject to SOC 2, ISO 27001, PCI DSS, NIST SP 800-63, and financial regulations including MAS TRM, FCA SYSC, and SOX. The architecture prioritises identity traceability, least-privilege access, human oversight for privileged actions, and complete audit trails. 

###### **Bank Technology Stack** 

- Cloud: AWS (primary), with M365 SaaS for productivity 

- Identity Provider: Microsoft Entra ID (primary) + legacy ADFS federation 

- AI Runtime: AWS Bedrock AgentCore + MCP servers + A2A for agent orchestration 

- Source Code: GitHub Enterprise (GHES) — on-premises 

- ITSM: ServiceNow (SaaS) 

- Knowledge: Confluence (Data Center on-prem) + SharePoint Online 

- Project Tracking: Jira (Data Center on-prem) 

- Productivity: Microsoft 365 (Exchange, Teams, OneDrive) 

- Communication: Slack Enterprise Grid 

- Authorization Policy Engine: Open Policy Agent (OPA) with Rego 

- SIEM: Splunk Enterprise Security 

#### **Architecture Layers** 

##### **Banking Architecture Layers** 

|**Layer**|**Component**|**Purpose**|
|---|---|---|
|Identity & Authentication|Entra ID + ADFS + AWS IAM Identity<br>Center|Single source of truth for user identity;<br>SSO across all systems|
|AI Orchestration|AWS Bedrock AgentCore + Claude<br>via Bedrock|Managed agent runtime;<br>VPC-isolated; IAM-controlled|
|Tool Gateway (MCP)|MCP Server Gateway (AWS ECS +<br>ALB)|Centralised MCP server registry;<br>enforces auth + audit per tool|
|Tool Connectors|Per-system MCP servers (GitHub,<br>SN, Confluence, etc.)|Each connector handles its own<br>OAuth; returns structured data|
|Policy Engine|OPA (Open Policy Agent) sidecar|Fine-grained authorization before and<br>after LLM decisions|
|Secrets Management|AWS Secrets Manager + HashiCorp<br>Vault|Encrypted storage for OAuth tokens,<br>refresh tokens, API keys|
|Audit & Compliance|Splunk ES + AWS CloudTrail + M365<br>Purview|Centralised, correlated,<br>tamper-evident audit chain|

|**Layer**|**Component**|**Purpose**|
|---|---|---|
|Human Oversight|ServiceNow Approval Workflows +|Required approval gate for privileged|
||Slack approval bots|AI actions|

### **Identity Architecture** 

#### **Multi-Layer Identity Stack** 

##### **Banking Identity Stack — 6 Layers** 

- **1** [Layer 1] Entra ID External Identities: governs all human user accounts (banking staff) 

↓ 

**2** [Layer 2] ADFS Federation: bridges legacy on-prem Kerberos systems to OIDC/SAML 

↓ 

**3** [Layer 3] AWS IAM Identity Center: maps Entra ID identities to AWS IAM principals ↓ 

- **4** [Layer 4] AI Platform Identity: Bedrock AgentCore receives user identity via OIDC token 

↓ 

- **5** [Layer 5] MCP Server Identity: each MCP server validates user identity via signed JWT 

↓ 

**6** [Layer 6] Tool Identity: each tool (GitHub, ServiceNow etc.) receives user's own OAuth token 

#### **ADFS Federation Bridge** 

The bank's ADFS (Active Directory Federation Services) infrastructure federates on-premises Active Directory to Microsoft Entra ID. Modern cloud services (AWS, Slack, ServiceNow SaaS) authenticate via Entra ID SAML/OIDC endpoints. Legacy on-prem systems (Confluence DC, Jira DC, GHES) continue to use Kerberos or LDAP, with identity bridged via ADFS. 

##### **Identity Integration by System** 

|**System**|**Auth Protocol**|**Identity Source**|**MFA Enforced By**|
|---|---|---|---|
|M365 / Copilot|OIDC→Entra ID|Entra ID|Entra Conditional Access|
|AWS Bedrock / Q|SAML→IAM Identity<br>Center|Entra ID via ADFS|Entra CA + IAM condition|
|ServiceNow SaaS|SAML 2.0→Entra ID|Entra ID|Entra Conditional Access|
|Slack Enterprise|SAML 2.0→Entra ID|Entra ID|Entra Conditional Access|
|GitHub Enterprise (GHES)|SAML SSO→Entra ID|Entra ID via ADFS|Entra CA (EMU<br>recommended)|

|**System**|**Auth Protocol**|**Identity Source**|**MFA Enforced By**|
|---|---|---|---|
|Confluence DC (on-prem)|Kerberos / LDAP|Active Directory|AD-integrated MFA (ADFS)|
|Jira DC (on-prem)|Kerberos / LDAP|Active Directory|AD-integrated MFA (ADFS)|

### **OAuth 2.1 and OBO Implementation** 

The bank standardises on OAuth 2.1 for all new integrations. OAuth 2.1 consolidates security best practices from OAuth 2.0 RFCs: PKCE is mandatory, implicit flow is prohibited, and refresh token rotation is required. On-Behalf-Of (RFC 8693) is used wherever the AI agent needs to call downstream APIs preserving user identity. 

#### **OAuth 2.1 Requirements Checklist** 

**OAuth 2.1 vs 2.0 Requirements** 

|**Requirement**|**OAuth 2.0**|**OAuth 2.1**|**Bank Implementation**|
|---|---|---|---|
|PKCE|Optional (recommended)|MANDATORY|Enforced at Entra ID<br>authorization server|
|Implicit Flow|Allowed|PROHIBITED|Blocked by Entra ID app<br>registration settings|
|Resource Owner Password|Allowed|PROHIBITED|Service principle policy<br>blocks ROPC grants|
|Refresh Token Rotation|Optional|REQUIRED|All refresh tokens rotate on<br>use (Entra default)|
|Exact Redirect URI<br>matching|Approximate OK|EXACT MATCH<br>REQUIRED|App registrations use exact<br>URI only|
|Bearer token in URL query|Allowed (not<br>recommended)|PROHIBITED|API gateway rejects tokens<br>in query string|

#### **Complete OBO Chain — User** → **Bedrock** → **MCP** → **GitHub** 

##### **Bank OBO Chain — 13 Steps** 

- **1** Bank employee logs in to AI portal via Entra ID SSO (MFA enforced) 

↓ 

**2** Entra ID issues: ID token + access token (aud: ai-platform-client-id) 

↓ 

**3** AI portal sends user request to Bedrock AgentCore with access token 

↓ 

**4** AgentCore validates token: signature, aud, exp, Conditional Access claims 

↓ 

|**5**|AgentCore identifies tool needed: github-enterprise-mcp-server|
|---|---|
|↓||
|**6**|AgentCore performs RFC 8693 token exchange with Entra ID:|
|↓||
|**7**|subject_token = user's access token (aud: ai-platform)|
|↓||
|**8**|audience = github-enterprise-mcp-server|
|↓||
|**9**|scope = github:read_pr github:read_code|
|↓||
|**10**|Entra ID issues new scoped token (aud: github-enterprise-mcp-server)|
|↓||
|**11**|AgentCore sends MCP call to GitHub MCP server with scoped token|
|↓||
|**12**|GitHub MCP server validates token; exchanges for GHES user OAuth token|
|↓||
|**13**|GHES API called: GET /api/v3/repos/.../pulls/142 as authenticated user|
|↓||
|**14**|GHES returns PR data; MCP server formats response; logs all steps|

### **Fine-Grained Authorization with OPA** 

The bank deploys Open Policy Agent (OPA) as a sidecar to the MCP Server Gateway. Every tool call passes through OPA before execution. Rego policies encode the bank's authorization rules, including data classification checks, business hours restrictions, and privileged action approval requirements. 

##### **Sample OPA Rego Policy — GitHub Tool Authorization** 

```
package bank.ai.github
default allow := false
# Allow read operations for authenticated bank employees
allow if {
    input.tool == "read_pr"
    input.user.department in {"engineering", "devops", "security"}
    input.token.scope[_] == "github:read_pr"
    not is_blocked_repo(input.args.repo)
}
# Block access to repos tagged as PCI-scoped
is_blocked_repo(repo) if {
    data.repos[repo].classification == "PCI_CDE"
    input.user.clearance != "PCI_AUTHORIZED"
}
# Require approval for write operations
allow if {
    input.tool == "create_pr"
    input.user.department == "engineering"
    input.approval.status == "APPROVED"
    input.approval.approver_role == "tech_lead"
}
```

#### **OPA Decision Points in the AI Workflow** 

##### **OPA Decision Points** 

|**Decision Point**|**OPA Input**|**Policy Checks**|**On Deny**|
|---|---|---|---|
|User accesses AI portal|User identity, device health,<br>location|Is user enabled? Is device<br>compliant? Is location<br>allowed?|Redirect to Entra ID<br>Conditional Access denial<br>page|
|AI selects a tool|User identity, tool name,<br>conversation context|Is tool allowed for this<br>user's role? Is it business<br>hours?|Tool removed from LLM's<br>available tools; LLM<br>informed|

|**Decision Point**|**OPA Input**|**Policy Checks**|**On Deny**|
|---|---|---|---|
|Tool call execution|User identity, tool args,<br>data classification|Does user have clearance<br>for data in request?|Tool call blocked; user<br>notified; audit event raised|
|Privileged action|User identity, action type,<br>approval chain|Has action been approved<br>by required approver?|Action deferred; approval<br>request sent to ServiceNow|
|Tool response delivery|Response content, data<br>classification labels|Does response contain<br>data user shouldn't see?|Response redacted; Splunk<br>alert raised|

### **Human-in-the-Loop for Privileged Actions** 

The bank requires human approval before AI agents execute any privileged action — defined as any action that creates, modifies, or deletes production data, or any action that could affect regulatory-controlled systems (PCI, SOX scope). 

##### **Privileged Action Approval Requirements** 

|**Action Category**|**Examples**|**Approver**|**Approval Channel**|**SLA**|
|---|---|---|---|---|
|Code changes|Create PR, merge<br>PR, deploy|Senior Engineer /<br>Tech Lead|Slack approval bot|30 minutes|
|ITSM changes|Create change<br>request, close<br>incident|Change Advisory<br>Board (CAB)|ServiceNow approval<br>workflow|2 hours|
|Data access (PCI)|Query cardholder<br>data environment|CISO or delegate|ServiceNow + email|1 hour|
|User access changes|Provision access,<br>modify permissions|IAM team|ServiceNow catalog<br>task|4 hours|
|External<br>communications|Send email to<br>external parties|Compliance officer|Slack approval bot|1 hour|
|Financial data<br>modification|Update cost centre,<br>budget records|CFO delegate|ServiceNow + audit<br>log|2 hours|

##### **Human Approval Workflow — 10 Steps** 

|**1**<br> ↓|AI agent determines action requires privileged operation (e.g. merge PR to main)|
|---|---|
|**2**|OPA policy returns: {allow: false, reason: 'requires_approval', approver_role: 'tech_lead'}|
|↓||
|**3**|AI agent creates ServiceNow approval request: {action, user, context, correlation_id}|
|↓||
|**4**|Slack bot notifies eligible approvers with approve/deny buttons|
|↓||
|**5**|Tech Lead reviews AI's proposed action in Slack; taps 'Approve'|
|↓||
|**6**|Slack bot updates ServiceNow ticket: status='approved', approver='jane.smith'|

|↓||
|---|---|
|**7**<br> ↓|AI agent polls approval service: receives approval with approval_token|
|**8**<br> ↓|OPA re-evaluates with approval context: {allow: true}|
|**9**<br> ↓|AI agent executes action; logs: {action, user, approver, approval_token, correlation_id}|
|**10**|ServiceNow ticket closed with resolution; Splunk audit event recorded|

### **Compliance Framework Mapping** 

##### **Compliance Framework to Architecture Control Mapping** 

|**Framework**|**Key AI-Relevant**<br>**Requirements**|**Architecture Control**|**Evidence**|
|---|---|---|---|
|SOC 2 (Security)|CC6: Logical access<br>controls; CC7: System<br>monitoring|Entra ID CA; OPA authz;<br>Splunk SIEM|Entra audit logs; OPA<br>decision log; Splunk alerts|
|SOC 2 (Availability)|A1: System availability and<br>performance|AWS multi-AZ Bedrock;<br>MCP HA; health checks|AWS CloudWatch SLA<br>metrics|
|ISO 27001 A.9|Access control policy; user<br>access management|RBAC/ABAC via OPA;<br>SCIM provisioning|Entra ID access reviews;<br>OPA policy log|
|PCI DSS 7|Restrict access to system<br>components to<br>need-to-know|OPA PCI-scope isolation;<br>no AI access to CDE<br>without approval|OPA deny logs for PCI<br>tools; ServiceNow approval<br>chain|
|PCI DSS 10|Log and monitor all access<br>to network resources and<br>cardholder data|CloudTrail + Splunk for all<br>AI-to-PCI-system calls|Splunk search:<br>index=ai_audit<br>pci_scope=true|
|NIST SP 800-63 AAL2|Multi-factor authentication<br>for regulated systems|Entra CA enforces MFA<br>before AI portal access|Entra sign-in logs showing<br>MFA satisfied|
|SOX (ITGC)|Change management;<br>access controls; audit trail|Human approval for<br>code/data changes;<br>complete audit chain|ServiceNow change<br>records; GitHub audit log;<br>Splunk|

#### **Zero Trust Posture Summary** 

##### **Zero Trust Maturity Assessment** 

|**Zero Trust Pillar**|**Bank Implementation**|**Maturity Level**|
|---|---|---|
|Identity|Entra ID with MFA + Conditional<br>Access + CAE; SCIM provisioning|Advanced|
|Devices|Intune-managed devices required for<br>AI portal access (CA policy)|Intermediate|
|Network|VPC isolation for MCP servers;<br>PrivateLink for on-prem connectors;<br>no public MCP endpoints|Advanced|
|Applications|OPA sidecar on every MCP call; no<br>implicit app-to-app trust|Advanced|

|**Zero Trust Pillar**|**Bank Implementation**|**Maturity Level**|
|---|---|---|
|Data|Purview sensitivity labels on M365<br>data; OPA data classification checks|Intermediate|
|Infrastructure|AWS IAM roles (no static keys); STS<br>short-term credentials; GuardDuty|Advanced|
|Visibility|Splunk ES with AI-specific detections;<br>CloudTrail; real-time anomaly alerts|Advanced|

### **Common Anti-Patterns to Avoid** 

##### **Banking AI Architecture Anti-Patterns** 

|**Anti-Pattern**|**Risk**|**Correct Pattern**|
|---|---|---|
|Shared service account for all AI tool<br>calls|No user-level attribution; any action<br>shows as 'ai-service-account' in audit|Per-user OAuth tokens via OBO; each<br>action attributed to actual user|
|Long-lived API keys for MCP servers|Key compromise = persistent access;<br>no rotation; no user context|Short-lived STS tokens or per-user<br>OAuth; automatic rotation via Secrets<br>Manager|
|Storing OAuth tokens in plaintext|Token exfiltration from storage =<br>unauthorized access to all connected<br>systems|Encrypt tokens at rest with KMS; use<br>HSM for high-value refresh tokens|
|LLM can read its own token store|Prompt injection could cause LLM to<br>exfiltrate tokens|Tokens inaccessible to LLM layer;<br>only passed by orchestrator to specific<br>tool|
|Application-level permissions for<br>SharePoint|AI can read all SharePoint content,<br>not just what user can access|Delegated permissions only; OBO<br>flow; user's token passed to Graph|
|Skipping approval for 'low-risk' AI<br>actions|Scope creep; AI takes actions user<br>didn't explicitly authorise|Define clear privileged action<br>taxonomy; err on side of requiring<br>approval|
|Single OAuth scope for all GitHub<br>operations|Read token used for write operations<br>by confused AI|Separate scopes per operation type;<br>OPA validates scope matches<br>requested action|
|No token revocation on employee<br>offboarding|Departed employee's AI sessions<br>continue to operate on their behalf|HR-triggered Entra ID disable; CAE<br>immediately revokes active tokens;<br>Secrets Manager rotation|

###### **Summary: Banking Architecture Decision Principles** 

- Identity: Entra ID as single IdP; ADFS bridge for legacy; no local accounts for AI services 

- Authentication: OAuth 2.1 + PKCE everywhere; OBO for multi-hop; JWT Bearer for service identity 

- Authorization: OPA with Rego; deny by default; explicit allow per user-role-tool-data combination 

- Secrets: AWS Secrets Manager + HashiCorp Vault; automatic rotation; KMS encryption; no static keys 

- Audit: 10-step complete audit chain; Splunk ES; CloudTrail; non-repudiable; 7-year retention 

- Human Oversight: ServiceNow approval workflows for all privileged actions; Slack bot for speed 

- Compliance: OPA policies encode PCI, SOX, MAS TRM rules; automated compliance evidence generation
