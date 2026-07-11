---
title: "Agent, Tool & MCP Authorization (Vol 3)"
date_created:
last_reviewed:
status: current
supersedes: ""
source_type: converted-pdf
source_file: "Vol3_Agent_Tool_MCP_Authorization.pdf"
tags: []
---

<!-- converted from Vol3_Agent_Tool_MCP_Authorization.pdf -->

**ENTERPRISE AI AUTHORIZATION SERIES  ·  VOLUME 3 OF 5**

## **~~1. Agent Authorization Lifecycle~~**

# Authorization for AI agents is fundamentally different from user authorization. Agents operate autonomously, ~~may run for extended periods, invoke multiple tools in sequence, and can spawn sub-agents. Each of these~~ **~~Agent, Tool & MCP Authorization~~** <u>behaviors requires dedicated authorization controls.</u>

### ~~Enterprise Policy Interceptor Architecture for Agentic AI~~ **~~1.1 Authorization Decision Points in an Agent Workflow~~**

`USER REQUEST (with JWT + canonical claims)` I ~~IIIIIMIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I~~ ~~`P1: Agent Invocation`~~ `Authorization` I II `Cedar: Can this user invoke this agent type?`

~~IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I~~ ~~`ALLOW`~~

IIIIIMIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I `AGENT RUNTIME (Bedrock`

`AgentCore / ECS)` I I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I `Planner —` ~~`generates action sequence` I I I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I I I~~ IIIIIIIIIIIIIIIIMIIIIIIIIIIIIIIIIIIIIIII I I I `P2: Tool Selection Authorization` I ~~IIIIII~~ ~~`Cedar: Is this tool in the agent's allowed set?` I~~

IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I `ALLOW` I I

IIIIIIIIIIIIIIIIMIIIIIIIIIIIIIIIIIIIIIII I I I `P3: Tool Invocation Authorization` I ~~IIIIII~~ ~~`Cedar: Can principal invoke this specific call?` I~~

IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I `ALLOW` I I

~~IIIIIIIIIIIIIIIIMIIIIIIIIIIIIIIIIIIIIIII I I I~~ ~~`TOOL EXECUTION` I I I~~ IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I I I

IIIIIIIIIIIIIIIIMIIIIIIIIIIIIIIIIIIIIIII I I I `P4: Memory Read Authorization` I ~~IIIIII~~ ~~`Cedar: Can agent read this memory scope?` I~~

IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I I I

~~IIIIIIIIIIIIIIIIMIIIIIIIIIIIIIIIIIIIIIII I I I~~ ~~`P5: Knowledge/RAG Authorization` I~~ **VOLUME COVERAGE** IIIIII `Cedar: Can agent retrieve this document?` I Agent authorization lifecycle, per-step policy evaluation, tool invocation control, MCP server security,IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I I I ~~context-aware authorization, contextual signals (time/risk/device/geo/MFA), multi-agent workflowIIIIIIIIIIIIIIIIMIIIIIIIIIIIIIIIIIIIIIII I I I~~ ~~`P6: Output Classification Check` I~~ authorization, and human-in-the-loop approval patterns.IIIIII `Cedar: Can agent return this data class?` I

~~IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I I I~~

IIIIIIIIIIIIIIIIMIIIIIIIIIIIIIIIIIIIIIII I I I `P7: Human Approval Gate (if req'd)` I

IIIIII `Cedar: Does this action require approval?` I

~~IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I~~

IIIIIIIIIIIIIIIIIIIMIIIIIIIIIIIIIIIIIIIIIIIIII I `RESPONSE (authorized, classified,` ~~`audited)`~~

##### I **NOTE**

~~Every numbered decision point (P1–P7) is an independent Cedar policy evaluation. A positive decision at P1~~ does NOT <u>grant permission at P3. Authorization is re-evaluated at every action boundary. This is the</u> fundamental principle of Zero Trust for agents.

### **~~1.2 Authorization Decision Matrix by Agent Step~~**

|**Step**|**Authorization Question**|**Principal**|**Policy**<br>**~~Engine~~**|**Context Required**|
|---|---|---|---|---|
|~~Agent~~<br>Invocation|~~Can this user invoke agent~~<br>type X?|~~User~~|~~Cedar AVP~~|~~capabilities, mfa, risk_score~~|
|Tool Selection|Is tool T in this agent's<br>permitted toolset?|Agent|Cedar AVP|agent_type, user_capabilities|



~~Classification: CONFIDENTIAL — INTERNAL USE ONLY~~

~~Published: June 2026  ·  AWS Well-Architected Series~~

**ENTERPRISE POLICY INTERCEPTOR ARCHITECTURE FOR AGENTIC AI**



|**Step**|**Authorization Question**|**Principal**|**Policy**<br>**Engine**|**Context Required**|
|---|---|---|---|---|
|Tool Invocation|Can agent (on behalf of user)<br>call this tool now?|Agent + User|Cedar AVP|time, risk, geo, mfa, data_class|
|Memory Read|Can agent read memory<br>scope for this user session?|Agent|Cedar AVP|session_id, memory_scope,<br>tenant|
|Knowledge<br>Access|Can agent retrieve this<br>document?|Agent|Cedar AVP|doc_classification, user_clearance|
|API Call|Can agent call this<br>downstream API endpoint?|Agent|Cedar AVP|api_scope, rate_limit, tenant|
|Output Return|Is the output data<br>classification permitted?|Agent|Cedar AVP|output_class, user_clearance|
|Human<br>Approval|Does this action require<br>human approval?|Action|Cedar AVP|amount, risk_score, action_type|
|Sub-Agent<br>Spawn|Can this agent create a<br>sub-agent?|Agent|Cedar AVP|agent_tier, scope_constraints|







### **2. Tool Authorization Architecture**

Tools are the action surface of an AI agent. Each tool invocation must be independently authorized. Tool authorization must consider the tool's data classification, the invoking principal's capabilities, and the runtime context.

### **2.1 Tool Authorization Policy Examples**

#### **SQL Query Tool — DBA Only, No Off-Hours**

```
// SQL Query Tool: restricted to DBA-capable principals // during business hours with
non-elevated risk permit( principal, action == BankAI::Action::"InvokeTool", resource ==
BankAI::Tool::"SQLQueryTool" ) when {
```

```
principal.capabilities.contains("can_query_production_db") && context.businessHours == true &&
context.riskScore < 50 && principal.mfaVerified == true }; // Additional restriction: no bulk
exports without senior approval forbid( principal, action == BankAI::Action::"InvokeTool",
resource == BankAI::Tool::"SQLQueryTool" ) when { context.queryType == "BULK_EXPORT" &&
!principal.capabilities.contains("can_export_bulk_data") };
```

#### **SAP ERP Tool — Finance Department Only**

```
// SAP tool access: Finance department, own geography permit( principal, action ==
BankAI::Action::"InvokeTool", resource == BankAI::Tool::"SAPTool" ) when {
principal.capabilities.contains("can_access_sap") && principal.businessUnit == "FINANCE" &&
resource.allowedGeographies.contains(principal.geography) && context.sessionAge < 3600 //
session must be fresh (< 1 hour) };
```

#### **Delete Tool — Strict Business Hours + Approval**

```
// Destructive operations require approval AND business hours forbid( principal, action ==
BankAI::Action::"InvokeTool", resource == BankAI::Tool::"DeleteRecordTool" ) unless {
context.humanApprovalStatus == "APPROVED" && context.businessHours == true && context.riskScore
< 30 && principal.capabilities.contains("can_delete_records") };
```

#### **External SaaS API Tool — Tenant Isolation**

```
// Agents can only call SaaS tools for their own tenant permit( principal is BankAI::Agent,
action == BankAI::Action::"InvokeTool", resource is BankAI::Tool ) when { resource has tenantId
&& principal.tenantId == resource.tenantId && principal.delegatedFrom.capabilities.contains(
resource.requiredCapability ) };
```

### **2.2 Tool Capability Taxonomy**

|**Tool Category**|**Example Tools**|**Required Capability**|**Additional Controls**|
|---|---|---|---|
|Data Query|SQL Tool, DynamoDB<br>Tool, Athena Tool|can_query_database|Business hours, MFA, risk < 50|
|Financial<br>Operations|Payment Tool, Transfer<br>Tool, FX Tool|can_approve_payment|Dual approval for > $10K, MFA, low risk|
|ERP/CRM<br>Access|SAP Tool, Salesforce Tool|can_access_erp|Department match, geography, session<br>age|
|Document<br>Operations|SharePoint Tool, S3 Tool|can_access_documents|Classification-based, DLP active|







|**Tool Category**|**Example Tools**|**Required Capability**|**Additional Controls**|
|---|---|---|---|
|Communication|Email Tool, Teams Tool,<br>Slack Tool|can_send_communicatio<br>n|Recipient validation, DLP scan|
|Code Execution|Lambda Tool, CodeBuild<br>Tool|can_execute_code|Sandbox only, output size limit|
|Destructive<br>Operations|Delete Tool, Purge Tool|can_delete_records|Business hours, approval, risk < 30|
|External APIs|Vendor API Tool, Partner<br>Tool|can_call_external_api|Tenant isolation, rate limit|
|HR Systems|Workday Tool, HR Portal<br>Tool|can_view_hr_records|Own geography only, MFA|







## **3. Context-Aware Authorization**

Static role-based authorization is insufficient for Agentic AI. Authorization decisions must be context-aware — incorporating runtime signals that affect the risk and appropriateness of an action at the moment it is requested.

### **3.1 Contextual Signals Catalog**

|**Signal**|**Source**|**Used For**|**Example Policy Impact**|
|---|---|---|---|
|Timestamp / Business<br>Hours|System clock|Restrict destructive actions<br>to office hours|Delete operations forbidden<br>18:00–08:00|
|Risk Score (0–100)|Risk Engine (AWS<br>Fraud Detector)|Elevate controls for<br>high-risk sessions|Risk > 70: require additional MFA step|
|Device Compliance|Microsoft Endpoint<br>Manager / Intune|Require managed device<br>for sensitive data|PII access denied on unmanaged<br>device|
|Geographic Location|IP geolocation / VPN<br>context|Enforce data residency,<br>geo-restrictions|EU data cannot be accessed from US|
|MFA Method & Age|Entra ID AMR claim|Require strong auth for<br>high-value actions|Payments: phishing-resistant MFA<br>only|
|Session Age (minutes)|Token issuance time|Require re-authentication<br>for aged sessions|Sessions > 60 min: step-up auth for<br>admin|
|Network Zone|VPC subnet tags, Zero<br>Trust NAC|Differentiate corporate vs<br>remote access|CORPORATE allows all; REMOTE<br>restricted|
|Agent Confidence<br>Score|LLM reasoning chain|Limit tool access if agent is<br>uncertain|Confidence < 80%: require human<br>review|
|Prompt Classification|Content classifier<br>(Bedrock Guardrails)|Block prompt injection,<br>jailbreak attempts|Injected prompt: deny and alert|
|Data Sensitivity|AWS Macie, data<br>catalog|Enforce proportional<br>access controls|TOP_SECRET: additional approval<br>required|
|Purpose / Task Type|Agent task metadata|Restrict tools to<br>task-appropriate subset|Tax task: only tax tools accessible|
|Approval Status|Workflow engine (Step<br>Functions)|Gate on explicit prior<br>approval|Payment > $50K: APPROVED status<br>required|
|Threat Score|AWS GuardDuty,<br>SIEM|Emergency circuit breaker|Active threat: deny all non-essential<br>access|



### **3.2 Context Object Structure for Cedar Evaluation**

```
{ "requestId": "req-7f3a9b2e", "timestamp": "2025-06-26T09:47:00Z", "businessHours": true,
"riskScore": 22, "deviceCompliant": true, "networkZone": "CORPORATE", "geography": "GB",
"mfaMethod": "FIDO2", "mfaAge": 8, "sessionAge": 14, "agentConfidenceScore": 93,
"promptClassification": "BENIGN", "dataClassification": "CONFIDENTIAL", "purposeCode":
"PAYMENT_PROCESSING", "humanApprovalStatus": "NOT_REQUIRED", "threatScore": 5, "dlpActive":
true, "tenantId": "bank-prod", "agentId": "agent-bedrock-payments-01", "workflowId":
"wf-payment-4421" }
```





## **4. MCP Server Security Architecture**

The Model Context Protocol (MCP) is the emerging standard for connecting AI agents to tools, APIs, and data sources. Every enterprise MCP deployment must treat the MCP boundary as a security perimeter requiring full policy enforcement.

### **4.1 MCP Authorization Architecture**

`AGENT RUNTIME` I I `MCP Client (agent-side)` I `[carries delegation token]` I M

IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I `MCP PEP (Gateway Layer)` I I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I `Tool Discovery Authorization` IIIIIII `Cedar: Can this agent discover these tools?` I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I `Tool Invocation Authorization` IIIIIII `Cedar: Can agent invoke this specific tool?` I

IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I

IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I `Parameter Validation` IIIIIII `Schema + policy: are inputs within bounds?` I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I `Output Classification Filter` IIIIIII `Cedar: Can agent receive this output class?` I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M

IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I `MCP SERVER` I I `(Business Logic — never authorizes)` I I I I `Tool Handler 1` I `Tool Handler 2` I I `Tool Handler 3` I `Tool Handler N` I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

### **4.2 MCP Security Requirements**

|**Security Requirement**|**Implementation**|**Policy Engine**|
|---|---|---|
|Tool Discovery Authorization|Cedar policy: agent type X may only discover<br>tools in permitted tool group G|Cedar AVP|
|Tool Invocation Authorization|Every tool call passes through PEP; Cedar<br>evaluates per-tool policies|Cedar AVP|
|Dynamic Tool Registration|New tools cannot be registered without policy<br>store update and CI/CD approval|Cedar PAP|
|MCP Authentication|MCP client must present valid delegation token<br>(RFC 8693)|JWT validation<br>layer|
|Parameter Input Validation|Tool parameters validated against JSON Schema<br>AND policy constraints|Cedar + schema|
|Output Classification|MCP server tags outputs with data classification;<br>PEP filters based on agent clearance|Cedar AVP|
|Remote MCP TLS|Remote MCP connections require mutual TLS;<br>certificate pinning for production|AWS Certificate<br>Manager|
|Local MCP Sandbox|Local MCP processes run in isolated containers<br>with restricted IAM roles|OPA + IAM|
|Tool Rate Limiting|Per-agent, per-tool rate limits enforced at MCP<br>PEP|PEP middleware|
|Audit Logging|Every MCP tool invocation logged with principal,<br>tool, parameters hash, outcome|CloudTrail|







### **4.3 MCP Tool Cedar Policies**

```
// MCP Tool Discovery — restrict by agent type permit( principal is BankAI::Agent, action ==
BankAI::Action::"DiscoverTools", resource is BankAI::ToolGroup ) when { resource ==
BankAI::ToolGroup::"PaymentTools" && principal.agentType == "PaymentAgent" &&
principal.delegatedFrom.capabilities.contains("can_approve_payment") }; // MCP Tool Invocation
— full context evaluation permit( principal is BankAI::Agent, action ==
BankAI::Action::"InvokeMCPTool", resource is BankAI::Tool ) when {
principal.delegatedFrom.capabilities.contains(resource.requiredCapability) && context.riskScore
< 60 && context.tenantId == resource.tenantId && context.promptClassification != "INJECTION" };
// MCP Anti-injection: block all tool calls if prompt injection detected forbid( principal,
action == BankAI::Action::"InvokeMCPTool", resource ) when { context.promptClassification ==
"INJECTION" };
```





## **5. Multi-Agent Workflow Authorization**

Multi-agent architectures introduce the confused deputy problem: a downstream agent may be granted permissions by an orchestrating agent that the orchestrator does not itself possess. Cedar policies must explicitly address agent-to-agent delegation boundaries.

### **5.1 Multi-Agent Trust Architecture**

`USER (with JWT)` I M `ORCHESTRATOR AGENT (Level 0) • Has delegated scope from user • Scope is constrained by user capabilities • Cannot grant sub-agents MORE than its own scope` I IIII `SPECIALIST AGENT A (Level 1 — Payment Processing)` I `• Scope = INTERSECT(Orchestrator scope, Agent A permitted tools)` I `• Cedar evaluates BOTH the delegation AND the tool permission` I IIII `SPECIALIST AGENT B (Level 1 — Data Retrieval)` I `• Scope = INTERSECT(Orchestrator scope, Agent B permitted tools)` I `• No cross-contamination between Agent A and Agent B scopes` I IIII `HUMAN APPROVAL GATE • Triggered by Cedar obligation on high-risk actions • AWS Step Functions Human Task • Approval stored in context, verified by Cedar at next step AUTHORIZATION PRINCIPLE: Sub-agent scope` ⊆ `Orchestrator scope` ⊆ `User delegated scope` ⊆ `User capabilities`

### **5.2 Human-in-the-Loop Authorization Pattern**

Cedar can return obligations alongside Allow/Deny decisions. An obligation instructs the PEP to take a specific action before execution proceeds — the most important being to require human approval:

```
// Payment approval obligation: trigger human review for large amounts permit( principal is
BankAI::Agent, action == BankAI::Action::"InvokeTool", resource ==
BankAI::Tool::"PaymentExecutionTool" ) when {
```

```
principal.delegatedFrom.capabilities.contains("can_approve_payment") && context.paymentAmount
<= 10000 }; // Payments above threshold require human approval obligation permit( principal is
BankAI::Agent, action == BankAI::Action::"InvokeTool", resource ==
BankAI::Tool::"PaymentExecutionTool" ) when {
principal.delegatedFrom.capabilities.contains("can_approve_payment") && context.paymentAmount >
10000 && context.humanApprovalStatus == "APPROVED" && context.approvalTimestamp >
(context.currentTime - 300) // within 5 minutes };
```

##### I **NOTE**

Cedar Obligation Pattern: When Cedar returns ALLOW with an obligation 'REQUIRE_HUMAN_APPROVAL', the PEP must NOT execute the action immediately. Instead it must trigger the approval workflow (AWS Step Functions Human Task), await the approval, and re-evaluate the Cedar policy with humanApprovalStatus='APPROVED' in the context. The PEP is responsible for enforcing obligations.





## **6. End-to-End Sequence Diagrams**

### **6.1 REST API Agent Authorization Flow**

`User API GW Lambda Auth Claims Svc Cedar AVP Agent Runtime Tool` I I I I I I I II `POST /` IIIIII I I I I I I `(JWT)` I I I I I I I II `authorizer` II I I I I I I II `validate` II I I I I I I `JWT sig` I I I I I I III `claims` IIII I I I I I II `normalize` II I I I I I III `canonical` II I I I I I II `IsAuthorized` IIIIIIIIIIII I I I I I I `ALLOW` IIII I I I III `200 policy` II I I I I I II `route` IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I I I I II `tool auth` III I I I I I IIII `ALLOW` IIIII I I I I I I II `invoke` III I I I I I III `result` II I I I I I II `log` IIIIII III `response` II I I I I I

### **6.2 Multi-Agent Workflow Authorization Sequence**

`User Orchestrator Cedar AVP Specialist A Cedar AVP Tool Human` I I I I I I I II `invoke` II I I I I I I II `P1: auth` IIII I I I I I III `ALLOW` IIIIIII I I I I I II `plan step 1` II I I I I I III `ALLOW` IIIIIII I I I I I II `delegate` IIIII I I I I I I I II `P3: tool` IIIII I I I I I I `auth` I I I I I I III `ALLOW+OBL` III I I I I I I `(if > $10K: human approval req'd)` I I I I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I I I I IIIIIIIIIIIIIIIII `APPROVED`

IIIIIIIIIII I I I II `P3b: re-auth` II I I I I I III `ALLOW` IIIIII I I I I I I II `invoke` IIIIIIIIIIIIIIIIII I I I I III `result` IIIIIIIIIIIIIIII I III `result` II I I I I I
