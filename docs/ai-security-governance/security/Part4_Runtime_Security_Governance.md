---
title: "Agent Runtime, MCP Security & Governance"
date_created: 2026-07-11
last_reviewed: 2026-07-11
status: current
supersedes: ""
source_type: converted-pdf
source_file: "Part4_Runtime_Security_Governance.pdf"
tags: ["ai-security", "runtime", "mcp", "governance", "rbac"]
---

<!-- converted from Part4_Runtime_Security_Governance.pdf -->

Enterprise AI Authentication Research - Part
# **Part 4** 

## **Agent Runtime, MCP Security & Governance** 

Agent runtimes, MCP/A2A protocols, Zero Trust security, RBAC/ABAC/PBAC governance, and complete audit chains 

Enterprise Authentication & Identity Propagation for AI Agents 


### **Agent Runtime — Authentication Context** 

Agent runtimes are the execution environments in which AI agents invoke tools, manage state, and orchestrate multi-step workflows. How authenticated context is passed through the runtime — and what each tool receives — determines the security properties of the entire agentic system. 

#### **Major Agent Runtimes Compared** 

##### **Agent Runtime Comparison** 

|**Runtime**|**Auth Context**<br>**Passing**|**User Identity**|**MCP Support**|**Production Use**|
|---|---|---|---|---|
|MCP (Model Context<br>Protocol)|HTTP headers /<br>OAuth per tool|Per-tool user token|Native (is MCP)|Claude, custom<br>agents|
|A2A (Agent-to-Agent,<br>Google)|AgentCard + JWT<br>bearer|Sub claim in JWT|Compatible|Google ADK,<br>enterprise agents|
|Function Calling<br>(OpenAI/Anthropic)|Context in system<br>prompt + tool result|Not standardised — i<br>mplementation-specif<br>ic|Via adapter|GPT-4, Claude API|
|LangGraph|Runnable config<br>(configurable fields)|Injected via<br>RunnableConfig or<br>State|Via MCP tools node|LangChain<br>ecosystem|
|Amazon Bedrock<br>AgentCore|AWS IAM + STS<br>AssumeRole|IAM principal (user or<br>role)|Via action groups|AWS-native agents|
|Google ADK|Service account +<br>user delegation|OIDC sub claim|Vertex Extensions|Google Cloud agents|
|OpenAI Responses<br>API|API key + user param|user string (opaque)|Via tools|ChatGPT, custom<br>GPTs|


#### **What Context Should Every Tool Receive?** 

A well-designed agent runtime passes rich context with every tool invocation — not just an OAuth token. The following context enables authorization, audit, and governance at the tool layer. 

##### **Tool Context Requirements** 

|**Context Field**|**Purpose**|**Passed By**|**Required?**|
|---|---|---|---|
|User Identity<br>(sub/UPN/email)|Identify acting user|Auth token / header|YES — mandatory|
|Tenant / Org ID|Multi-tenant isolation|Token claim / header|YES — for SaaS systems|
|Roles / Groups|RBAC authorization at tool|Token claims|Recommended|


|**Context Field**|**Purpose**|**Passed By**|**Required?**|
|---|---|---|---|
|Custom Claims (ABAC<br>attrs)|Fine-grained<br>attribute-based authz|Token claims / header|For sensitive tools|
|Conversation / Session ID|Audit correlation|Header<br>(X-Conversation-ID)|YES — for audit|
|Trace ID|Distributed tracing|OpenTelemetry traceparent<br>header|Highly recommended|
|Span ID|Per-tool call tracking|OpenTelemetry|Recommended|
|Agent ID|Identify which agent is<br>calling|Header / JWT actor claim|YES — for agent audit|
|Request Timestamp|Replay prevention|Header or JWT iat claim|Recommended|
|Scope List|Explicit scope boundary|OAuth scope claim|YES — prevent scope<br>creep|


#### **MCP — Model Context Protocol Security** 

MCP is Anthropic's open standard for AI tool integration. An MCP server exposes a set of tools (functions) that an AI can call. Security in MCP is primarily the responsibility of the MCP server — it must validate the caller's identity and enforce authorization before executing any tool. 

###### **MCP Server Security Requirements** 

- Authenticate every tool invocation — do not trust tool calls without verified identity 

- Use OAuth 2.0 or signed JWTs for MCP server authorization (MCP auth spec, 2024) 

- Validate the AI platform identity (who is calling the MCP server) separately from user identity 

- Enforce tool-level authorization: not all users should access all tools on an MCP server 

- Log every tool call with: tool_name, user_id, timestamp, input schema, outcome 

- Implement rate limiting per user and per tool to prevent abuse 

- Reject tool schemas containing unexpected parameters (prompt injection vectors) 

##### **MCP Tool Invocation Security Flow** 

**1** Claude (AI platform) decides to call MCP tool 'read_github_pr' 

↓ 

**2** MCP client sends HTTP POST to MCP server with: tool=read_github_pr, args={pr_id: 142} 

↓ 

**3** MCP client includes Authorization: Bearer header 

↓ 


|**4**<br> ↓|MCP server validates: (a) JWT signature, (b) user identity, (c) tool permission<br>|
|---|---|
|**5**|MCP server calls GitHub API using user's token: GET /repos/.../pulls/142|
|↓<br>**6**<br> ↓<br>**7**<br> ↓<br>**8**<br>**A2A**<br>Google'<br>dentity<br>capabili<br>user's i<br>**A2A P**|GitHub returns PR data; MCP server formats as tool_result<br>MCP server logs: {tool: 'read_github_pr', user: 'john.doe', pr: 142, ts: '...'}<br>Tool result returned to Claude for synthesis<br>**— Agent-to-Agent Protocol (Google)**<br>s A2A protocol defines how AI agents communicate with each other in a standardised way. Agent<br>is established through an AgentCard — a well-known JSON document describing the agent's<br>ties and authentication requirements. A2A security relies on JWT bearer tokens with the acting<br>dentity preserved in the 'sub' claim.<br>**rotocol Security Properties**|
||**A2A Security Dimension**<br>**Implementation**|
|Agent|Authentication<br>AgentCard at /.well-known/agent.json; JWT bearer for API<br>calls|
|User Id|entity Propagation<br>user_id field in A2A message; sub claim in bearer JWT|
|Trust E|stablishment<br>Agent registers with enterprise registry; admin approves<br>AgentCard|
|Authori|zation<br>Receiving agent validates caller agent's identity AND user<br>identity|
|Audit|Each A2A message includes trace_id for end-to-end<br>correlation|
|Replay|Prevention<br>JWT iat + exp claims; nonce in message body|


#### **A2A — Agent-to-Agent Protocol (Google)** 

Google's A2A protocol defines how AI agents communicate with each other in a standardised way. Agent identity is established through an AgentCard — a well-known JSON document describing the agent's capabilities and authentication requirements. A2A security relies on JWT bearer tokens with the acting user's identity preserved in the 'sub' claim. 

##### **A2A Protocol Security Properties** 


### **Security — Zero Trust for AI Agents** 

Zero Trust architecture treats every request — even from inside the corporate network — as potentially hostile. For AI agents, this means every tool call must be authenticated, authorized, and logged, regardless of where the agent is running. 

#### **Zero Trust Principles Applied to AI Agents** 

##### **Zero Trust Principles for AI Agents** 

|**Principle**|**AI Agent Application**|**Implementation**|
|---|---|---|
|Verify Explicitly|Authenticate every tool call|OAuth tokens per tool; no implicit trust<br>based on network location|
|Use Least Privilege|Minimal scopes per tool|Request only read scopes unless<br>write is explicitly needed for the task|
|Assume Breach|Expect tokens will be stolen|Short token lifetimes; CAE; anomaly<br>detection on token use patterns|
|Micro-segmentation|Isolate tool access|Agent cannot call GitHub with the<br>same token used for ServiceNow|
|Device Health|Validate agent runtime integrity|Agent image signing; attestation; no<br>unapproved plugins|
|Data Classification|Respect sensitivity labels|AI output filtered by data classification<br>of sources used|


#### **Security Threat Taxonomy for AI Agents** 

##### **AI Agent Security Threats and Mitigations** 

|**Threat**|**Description**|**Mitigation**|
|---|---|---|
|Prompt Injection|Malicious content in tool results<br>instructs AI to take unauthorized<br>actions|Sanitise tool outputs before passing to<br>LLM; output validation; human<br>approval gates|
|Tool Injection|Malicious MCP server exposes<br>dangerous tools not approved by<br>admin|Allowlist MCP servers; validate tool<br>schemas; sign MCP server manifests|
|Identity Spoofing|Attacker claims to be a different user<br>in the AI context|Validate identity from trusted IdP<br>token only; reject self-asserted<br>identity|
|Session Hijacking|Attacker steals session cookie or<br>access token|HttpOnly cookies; token binding;<br>anomaly detection; CAE revocation|


|**Threat**|**Description**|**Mitigation**|
|---|---|---|
|Replay Attack|Old token reused after expiry|Short token lifetimes; nonce<br>validation; token binding; CAE|
|Token Theft|Access token extracted from logs,<br>prompts, or storage|Never log tokens; encrypt at rest; do<br>not include in LLM prompt|
|Confused Deputy|AI platform acts with elevated<br>permissions it received but user<br>doesn't have|Always use delegated (user) tokens<br>for user-driven actions; validate<br>scopes|
|Privilege Escalation|Agent uses capabilities beyond what<br>user authorised|Scope validation at tool layer; deny by<br>default; explicit capability grants|
|Cross-Agent Attacks|Malicious agent poisons shared<br>memory or context|Agent isolation; signed A2A<br>messages; no shared mutable state|
|Data Leakage via LLM|LLM includes sensitive data from one<br>user in another user's response|Per-conversation context isolation;<br>DLP on outputs; no cross-user context|


#### **MCP Security — Known Attack Vectors** 

###### **MCP-Specific Security Risks (2024-2025 Research)** 

- Tool name collision: malicious MCP server registers tool with same name as trusted tool 

- Schema injection: tool description contains hidden instructions to AI (prompt injection via schema) 

- Credential exfiltration: rogue MCP server returns tool_result with encoded token-stealing payload 

- Scope creep: MCP server requests broader OAuth scopes than tool requires 

- Unauthorised tool registration: MCP server list manipulation if not cryptographically signed 


### **Governance — Authorization Models** 

Enterprise AI governance requires authorization checks at multiple layers. The choice of authorization model (RBAC, ABAC, PBAC, Cedar, OPA) determines how fine-grained and auditable these checks can be. 

#### **Authorization Model Comparison** 

##### **Authorization Model Comparison** 

|**Model**|**Full Name**|**Granularity**|**Best For**|**Example Policy**|
|---|---|---|---|---|
|RBAC|Role-Based Access<br>Control|Role-level|Simple enterprise<br>structures|Developers can read<br>all repos|
|ABAC|Attribute-Based<br>Access Control|Attribute-level|Dynamic,<br>context-sensitive<br>policies|User in EU can read<br>EU-data only|
|PBAC|Policy-Based Access<br>Control|Policy-level|Complex compliance<br>rules|Action allowed if MFA<br>in last 5 min|
|Cedar|Cedar Policy<br>Language (AWS)|Fine-grained<br>entity-based|AWS, Verified<br>Permissions|Policy as code with<br>entity graphs|
|OPA/Rego|Open Policy Agent|Arbitrary rule<br>complexity|Kubernetes, API<br>gateways|Rego rules evaluated<br>per request|


#### **Where Authorization Occurs in the AI Stack** 

##### **Authorization Enforcement Points** 

|**Authorization Point**|**What is Checked**|**Who Enforces**|**Failure Mode**|
|---|---|---|---|
|Before LLM<br>(pre-processing)|Is this user allowed to use<br>this AI feature?|AI platform IAM /<br>entitlement service|Request rejected before<br>LLM sees it|
|After LLM (intent validation)|Is the LLM's intended<br>action permitted?|Policy engine (OPA/Cedar)|Action blocked; user<br>informed; logged|
|Before tool call|Does user have permission<br>for this specific tool?|Tool orchestrator + policy<br>engine|Tool call blocked; LLM<br>receives 'access denied'<br>tool result|
|Inside tool (at API)|Does user's OAuth token<br>have required scopes?|Target API (GitHub,<br>ServiceNow, etc.)|API returns 401/403; agent<br>handles gracefully|
|After tool response|Does response contain<br>data user shouldn't see?|DLP / data classification<br>layer|Response redacted; audit<br>event raised|


|**Authorization Point**|**What is Checked**|**Who Enforces**|**Failure Mode**|
|---|---|---|---|
|After LLM response|Does final answer contain|Output DLP / Purview|Response filtered before|
||sensitive data?||delivery to user|


#### **Microsoft Entra Conditional Access for AI** 

Conditional Access (CA) policies in Microsoft Entra ID can enforce authentication requirements before users can access AI platforms or specific tools. This provides governance at the IdP layer, upstream of the AI system. 

##### **Conditional Access Policies for AI** 

|**Condition**|**Example Policy**|**AI Agent Impact**|
|---|---|---|
|MFA Required|All AI platform access requires MFA|User must complete MFA before AI<br>session begins|
|Compliant Device|AI access only from Intune-managed<br>devices|Blocks AI use from<br>personal/unmanaged devices|
|Location Restriction|AI access only from corporate IP<br>ranges|Prevents AI use from untrusted<br>networks|
|Sign-in Risk|High-risk sign-ins blocked from AI|Identity Protection flags risky logins|
|Session Controls|Limit AI session to 8 hours|Forces re-authentication after<br>absolute timeout|
|App Restriction|Block AI apps in guest/B2B tenants|External users cannot use AI on<br>corporate data|


### **Complete Audit Chain** 

A complete enterprise AI audit chain connects every user action to every downstream API call through a set of correlated identifiers. This is essential for compliance, incident investigation, and demonstrating to auditors that AI actions are traceable to human actors. 

##### **Complete AI Audit Chain (10 Steps)** 


![Figure 1](/img/ai-security-governance/security/part4-runtime-security-go-p9-1.png)


#### **Correlation ID Architecture** 

##### **Correlation ID Taxonomy** 


|**Identifier**|**Scope**|**Generated By**|**Used In**|
|---|---|---|---|
|user_id (UPN/sub)|Global user identifier|IdP (Entra ID / Okta)|All audit logs; maps all<br>activity to one person|
|session_id|AI platform session|AI platform on login|Conversation grouping;<br>absolute timeout<br>enforcement|
|conversation_id|Single conversation|AI platform per<br>conversation start|Groups all turns, tool calls,<br>responses|
|turn_id|Single user message +<br>response|AI platform per message|Associates prompt with<br>specific LLM response|
|trace_id|End-to-end distributed trace|OpenTelemetry (W3C<br>traceparent)|Correlates across AI<br>platform, MCP servers,<br>APIs|
|span_id|Single operation within<br>trace|OpenTelemetry|Individual tool calls, API<br>requests, LLM invocations|
|token_jti|JWT token instance|IdP (jti claim)|Identifies specific token<br>used for each API call|
|oauth_client_id|OAuth client (AI app)|OAuth registration|Identifies which AI app<br>performed token exchange|
|agent_id|AI agent instance|Agent runtime|For multi-agent systems —<br>identifies which agent acted|


###### **Audit Log Requirements for Regulated Industries** 

- SOC 2: Retain audit logs for 1 year; review access logs monthly 

- ISO 27001: Log all access to sensitive assets; review logs for anomalies 

- PCI DSS: Log all access to cardholder data environment; retain 12 months (3 months online) 

- NIST SP 800-53: Centralized log management; tamper-evident log storage; real-time alerting 

- GDPR: Log access to personal data; provide audit trail for data subject requests 

- Financial regulations (SOX, FCA): Non-repudiation for all financial transactions via AI 

#### **SIEM Integration for AI Audit Logs** 

##### **SIEM Log Source Integration** 

|**Log Source**|**Log Type**|**SIEM Format**|**Key Fields**|
|---|---|---|---|
|Microsoft Purview|Copilot Activity|CEF / JSON|UserId, ConversationId,<br>ActionType, PolicyResult|
|Entra ID|Sign-in + Audit|JSON / Log Analytics|UserId, AppId, TokenType,<br>CondAccessStatus|


|**Log Source**|**Log Type**|**SIEM Format**|**Key Fields**|
|---|---|---|---|
|GitHub|Org Audit Log|JSON / SIEM streaming|actor, repo, action,<br>programmatic|
|ServiceNow|sys_audit|JSON / MID Server|user, table, field_name,<br>old_value, new_value|
|MCP Server|Tool invocation log|JSON / structured|tool_name, user_id,<br>conversation_id, trace_id|
|Slack|Audit Logs API|JSON|actor, action, entity, context<br>(ip, ua)|
|Salesforce|Event Monitoring|CSV / JSON|UserId, EventType,<br>ObjectType,<br>QueriedEntities|


