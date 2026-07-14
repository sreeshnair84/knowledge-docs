---
title: "Part 12: AI Observability"
date_created: 2026-07-11
last_reviewed:
status: current
supersedes: ""
source_type: converted-pdf
source_file: "Part12_AI_Observability.pdf"
tags: []
---

<!-- converted from Part12_AI_Observability.pdf -->



##### **PART 12 OF 18**

# AI Observability Architecture
Reasoning Telemetry, Decision Audit Trails, Context Lineage, Behavioral Analytics, OpenTelemetry for AI, Arize Phoenix, Langfuse, and Trust Scoring

###### **ENTERPRISE AI CONTROL ARCHITECTURE**

Implementation Guide for Production AI Systems • 2026





## **12.1 Beyond Traditional Observability: The AI Observability Stack**

Traditional observability (logs, metrics, traces) captures what software systems did in sufficient detail for operations and debugging. For AI agents, this is necessary but insufficient: logs tell you what API calls were made; AI observability additionally captures why those calls were made, what the agent was thinking, and whether the reasoning process was sound. This semantic dimension of observability is unique to AI systems and requires new instrumentation primitives.

### **12.1.1 AI Observability Dimensions**

#### **Execution Observability**

What: tool calls, API requests, outputs. Standard distributed tracing handles this layer. **Implementation:** OpenTelemetry traces

#### **Context Observability**

What information was in the agent's context when each decision was made. Essential for debugging and audit. **Implementation:** Context snapshots in trace spans

#### **Reasoning Observability**

Why the agent made each decision. Includes chain-of-thought, goal state, planning traces. **Implementation:** LLM-specific span attributes

#### **Memory Observability**

What memories were retrieved and written; how memory influenced decisions. **Implementation:** Memory read/write events in trace

#### **Goal Observability**

How the agent's goal state evolved throughout the task; goal drift detection. **Implementation:** Goal state events timeline

#### **Trust Observability**

Real-time trust scores; policy decisions; authorization events. **Implementation:** Policy decision events

#### **Behavioral Observability**

Statistical behavioral patterns; drift from baseline; anomaly detection. **Implementation:** Behavioral analytics platform

## **12.2 OpenTelemetry for AI Agents**





### **12.2.1 OpenInference Semantic Conventions**

OpenInference (Arize AI's contribution to OpenTelemetry for AI) defines semantic conventions for LLM and agent observability. These conventions standardize how AI systems instrument their traces, enabling consistent analysis across different frameworks and vendors.

|**OTel Attribute**|**Content**|**Security Use**|
|---|---|---|
|gen_ai.prompt|Input prompt to LLM call|Injection detection; prompt audit|
|gen_ai.completion|LLM output text|Output safety scanning; PII<br>detection|
|gen_ai.tool.name|Name of tool invoked|Tool usage audit; policy verification|
|gen_ai.tool.input|Tool invocation parameters|Parameter validation; DLP|
|gen_ai.tool.output|Tool result returned to model|Result injection detection; content<br>scanning|
|llm.token.count.total|Token usage for the LLM call|Cost control; DoS detection|
|gen_ai.agent.id|Unique agent instance identifier|Agent identity correlation|
|gen_ai.agent.goal|Current agent goal state|Goal drift detection; intent<br>verification|
|gen_ai.retrieval.query|Query sent to vector database|Retrieval monitoring; data access<br>audit|
|gen_ai.retrieval.results|Documents retrieved|Knowledge base access audit|



## **12.3 AI Observability Platform Comparison**

|**Platform**|**Strengths**|**Weaknesses**|**Best For**|
|---|---|---|---|
|Arize Phoenix|LLM eval framework; strong<br>prompt/response analysis;<br>open source; OTel<br>integration|Limited multi-agent<br>support; no enterprise<br>RBAC in OSS version|LLM quality monitoring;<br>prompt optimization|
|Langfuse|Excellent trace visualization;<br>cost tracking; datasets and<br>evals; strong OSS<br>community|Newer platform; multi-agent<br>tracing improving|Developer debugging;<br>evaluation pipelines|
|Weights & Biases<br>(Weave)|Strong experiment tracking;<br>model versioning; good LLM<br>support|ML engineering focus; less<br>security-oriented|Model development and<br>evaluation|
|Helicone|Low-latency proxy; cost<br>monitoring; request logging|Limited semantic analysis;<br>more operational than<br>analytical|Cost management;<br>request logging|







|**Platform**|**Strengths**|**Weaknesses**|**Best For**|
|---|---|---|---|
|Custom<br>OpenTelemetry|Full control; integrate with<br>existing Grafana/Datadog;<br>compliance-ready|Significant engineering<br>effort; no AI-specific<br>dashboards out of box|Enterprises with<br>existing OTel<br>investment|
|Datadog LLM<br>Observability|Integrated with existing<br>enterprise Datadog; good<br>security team adoption|Limited LLM-specific depth<br>vs dedicated platforms;<br>cost|Enterprises already<br>using Datadog|



## **12.4 Reasoning Telemetry Architecture**

### **12.4.1 Capturing Agent Reasoning Traces**

Reasoning telemetry captures the agent's chain-of-thought, planning steps, and decision rationale in a structured, queryable format. This data is essential for security audit, compliance, debugging, and behavioral analytics. However, reasoning traces may contain sensitive business information and must be protected with the same care as the outputs.

#### **Reasoning Trace Data Structure**

I Reasoning Trace Schema (JSON): { trace_id: 'tr-8f3a2c...', agent_id: 'finance-analyst-sess-a7f2b1', task_id: 'task-8c3d9e', step_number: 3, goal_state: 'Analyze Q2 revenue by region', reasoning: '', // Stored encrypted reasoning_summary: 'Decided to retrieve revenue data from data warehouse', planned_action: {tool: 'query_data_warehouse', parameters: {query_id: 'rev_by_region_q2'}}, risk_score: 15, policy_decision: 'APPROVE', timestamp: '2026-06-25T14:23:01Z' }

### **12.4.2 Reasoning Trace Privacy**

- **Encryption at Rest:** Reasoning traces encrypted with agent-instance-specific keys; key rotation on

- session end

- **Access Control:** Reasoning traces accessible only to: the deploying team, SOC with audit justification,

- compliance under court order

- **Redaction Pipeline:** Automated PII detection and redaction in reasoning summaries before they enter

- analytics pipelines

- **Selective Disclosure:** Regulatory reporting receives summaries, not full traces; full traces available only

- through privileged access process

## **12.5 Behavioral Analytics for AI Security**

Behavioral analytics applies statistical and ML methods to agent telemetry to detect anomalies, drift, and potential security incidents that rule-based systems cannot catch. The key insight is that even individually authorized actions can be anomalous in aggregate—detecting this requires statistical modeling of normal behavior.





|**Analytic**|**Method**|**Signal**|**Alert Threshold**|
|---|---|---|---|
|Action frequency<br>analysis|Z-score vs. baseline<br>distribution|Sudden burst of specific<br>action type|> 3 sigma from hourly<br>baseline|
|Data access pattern|Graph-based<br>access pattern<br>comparison|Novel resource access<br>or graph traversal|New node accessed in<br>access graph|
|API endpoint diversity|Shannon entropy of<br>API calls|Systematic API<br>enumeration (low<br>entropy)|< 2.0 bits entropy over 100<br>calls|
|External call<br>correlation|Cross-agent<br>external call<br>analysis|Multiple agents calling<br>same unusual endpoint|> 3 agents calling same new<br>endpoint|
|Session risk trajectory|Time-series<br>analysis of<br>cumulative risk<br>score|Accelerating risk<br>accumulation|Risk score growth > 5<br>points/minute|
|Goal drift|Semantic similarity<br>of actions to stated<br>goal over time|Actions diverging from<br>stated goal|Semantic similarity < 0.6|
|Credential access<br>timing|Time-of-day and<br>sequence analysis|Unusual credential<br>access patterns|Access outside normal<br>operational hours|
