---
title: "Complete AI Agent Evaluation Framework"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "AI_Agent_Evaluation_Framework_Complete.pdf"
doc_type: guide
tags: ["ai-development", "software-engineering"]
last_reviewed: 2026-07-10
framework_name: ""
covers_version: "N/A"
---
# **Complete AI Agent Evaluation Framework** 

### **AWS Bedrock AgentCore  ·  Strands Evals  ·  Arize Phoenix** 

EU Banking Edition  —  RAI · PII · GDPR · DORA · EBA · AMLD6 Ideation to Retirement: The Definitive Production Guide Version 2.0  |  April 2026  |  Confidential 

**Document Purpose** — This is the definitive production guide for evaluating AI agents built on AWS Bedrock AgentCore and the Strands Agents SDK, instrumented via Arize Phoenix, and deployed in EU banking environments subject to the EU AI Act, GDPR, DORA, and EBA guidelines. Every evaluation dimension is covered: quality, safety, RAI, PII, fairness, explainability, drift detection, and automated pipelines — from first idea to system retirement. 

|**10 Strands**<br>**Evals**<br>**Evaluators**|**13**<br>**AgentCore**<br>**Evaluators**|**4 Eval Levels**|**9 Lifecycle**<br>**Phases**|**3 Regulatory**<br>**Regimes**|**EUR 35M**<br>**Max AI Act**<br>**Penalty**|
|---|---|---|---|---|---|

## **Table of Contents** 

#### **1. Framework Architecture & Overview** 

1.1 The Evaluation Problem in AI Agents 

- 1.2 Component Map — Three Layers 

- 1.3 Which Tool for Which Job 

#### **2. Strands Evals — Native SDK Reference** 

2.1 Core Concepts: Case, Experiment, Evaluator, Task Function 

2.2 All 10 Built-in Evaluators — Deep Dive 

- 2.3 Online vs Offline Task Patterns 

- 2.4 ActorSimulator — Multi-Turn Testing 

- 2.5 ExperimentGenerator — Automated Test Creation 

- 2.6 Evaluation Hierarchy: Session / Trace / Tool 

#### **3. AgentCore Evaluations — Managed Service** 

3.1 Online Evaluation — Continuous Production Monitoring 

- 3.2 On-Demand Evaluation — Targeted Assessment 

3.3 All 13 Built-in Evaluators 

- 3.4 Custom Evaluators — Domain-Specific Rubrics 

3.5 CloudWatch Integration & Observability Dashboard 

- 3.6 Sampling Strategies 

#### **4. Arize Phoenix — Observability Layer** 

4.1 OpenTelemetry / OpenInference Instrumentation 

4.2 Span Types & Trace Explorer 

4.3 Evaluation Library 

- 4.4 Drift Detection System 

4.5 Dataset & Experiment Management 

4.6 Human Annotation Queue 

#### **5. Complete Metric Catalogue** 

5.1 Plane 1 — Response Quality Metrics 

5.2 Plane 2 — RAG Quality Metrics (RAGAS) 

5.3 Plane 3 — Agentic Behaviour Metrics 

5.4 Plane 4 — Operational / Infrastructure Metrics 

5.5 EU Banking Compliance Metrics 

#### **6. Benchmark Creation Standards** 

6.1 Three-Tier Architecture (Public / Domain / Golden) 

- 6.2 Golden Dataset Construction Process 

6.3 Anthropic / Claude Benchmarking Pattern 

- 6.4 Adversarial & Red-Team Sets 

#### **7. Drift Detection & Automated Response** 

7.1 Five Types of Drift 

- 7.2 Detection Methods (EWMA, CUSUM, Embedding) 

- 7.3 Alert Thresholds & Escalation Matrix 

- 7.4 Automated Remediation Pipeline 

#### **8. EU Banking Compliance Framework** 

8.1 Regulatory Landscape: AI Act, GDPR, DORA, EBA 

- 8.2 High-Risk AI Classification 

- 8.3 Responsible AI — 7 Trustworthy AI Pillars 

8.4 PII Detection — 3-Layer Architecture 

8.5 Fairness & Bias Evaluation 

8.6 XAI by Stakeholder 

8.7 Human Oversight Architecture (Art.14) 

8.8 Audit Trail — Art.12 Schema 

8.9 Data Residency & EU Sovereignty 

#### **9. Complete Lifecycle (Ideation to Retirement)** 

9.1 Phase 1: Ideation & Requirements 

9.2 Phase 2: Benchmark Construction 

9.3 Phase 3: Build & Instrument 

9.4 Phase 4: Pre-Deployment Gate 

9.5 Phase 5: Deploy with Online Monitoring 

9.6 Phase 6: Continuous Improvement 

9.7 Phase 7: Drift & Incident Response 

9.8 Phase 8: Model Upgrade Evaluation 

9.9 Phase 9: Retirement & Archival 

#### **10. Integration Stack & Quick Reference** 

10.1 Tool Comparison Matrix 

10.2 Complete Metric Threshold Card 

10.3 Regulatory Compliance Calendar 

10.4 Escalation Playbooks 

#### **CHAPTER 1  —  FRAMEWORK ARCHITECTURE & OVERVIEW** 

### **1.1 The Evaluation Problem in AI Agents** 

Traditional software testing assumes deterministic outputs: same input, same expected output. AI agents break this completely — they generate natural language, make context-dependent decisions, call tools in adaptive sequences, and produce varied outputs from identical inputs. Evaluation therefore requires **judgment** rather than keyword comparison and **multi-dimensional scoring** rather than binary pass/fail. 

##### **WHY AGENTS ARE HARD TO EVALUATE** 

- Natural language has many valid forms — no single correct answer exists 

- Agents take multi-step actions; final response alone misses intermediate failures 

- Multi-turn conversations need session-level context awareness 

- Tool selection and parameter correctness add agentic dimensions absent in LLM evals 

- Non-determinism means the same test case can produce different results each run 

### **1.2 Component Map — Three Primary Layers** 

The framework integrates components across three layers: native SDK evaluation (Strands Evals), managed AWS evaluation service (AgentCore Evaluations), and open-source observability (Arize Phoenix), plus supporting specialist libraries. 

|**Layer**|**Component**|**Primary Role**|**When to Use**|
|---|---|---|---|
|Native SDK|Strands Evals|Cases, Experiments, 10 evaluators, ActorSimulator,<br>CI/CD gates|Development, CI/CD, regression testing|
|Managed<br>AWS|AgentCore<br>Evaluations|13 built-in + custom evaluators; online (production) +<br>on-demand modes|Pre-deployment gates & continuous<br>production scoring|
|Observabilit<br>y|Arize Phoenix|OTEL traces, embedding drift, human annotation,<br>experiment tracking|Debug, drift detection, production visibility|
|RAG Eval|RAGAS|Faithfulness, context precision/recall, answer<br>relevancy|Any RAG pipeline quality assessment|
|Unit Testing|DeepEval|Pytest-style LLM tests, DAG metric for agentic<br>planning|CI/CD quality gates, regression suite|
|Trace &<br>Cost|Langfuse|Strands-native traces, cost per session, prompt<br>management|Development observability, cost optimisation|

### **1.3 Decision: Which Tool for Which Job** 

|**Scenario**|**Primary Tool**|**Supporting Tool**|
|---|---|---|
|Pre-deployment quality gate|Strands Evals (CI/CD)|AgentCore On-Demand|
|Production sampling & scoring|AgentCore Online Eval|Phoenix Online Evals|
|RAG pipeline quality|RAGAS|Phoenix RAG templates|
|Multi-turn conversation testing|Strands Evals ActorSimulator|DeepEval DAG metric|
|Debug a specific user complaint|Phoenix Trace Explorer|AgentCore On-Demand|
|Detect gradual performance decay|Phoenix Drift Monitors|CloudWatch EWMA alarms|
|EU compliance gate (PII, fairness)|Custom Strands Evaluators|AgentCore Custom Evaluator ARN|
|Human review & annotation|Phoenix Annotation Queue|Argilla|
|A/B prompt comparison|Phoenix Experiments|Langfuse + RAGAS|

|**Scenario**|**Primary Tool**|**Supporting Tool**|
|---|---|---|
|AML / SAR quality check|Custom Strands Evaluator|AgentCore Custom Evaluator|
|PII leakage detection|AgentCore Builtin.PIILeakage|Presidio + AWS Comprehend (pre-filter)|
|Fairness / bias audit|Custom Counterfactual Cases|DeepEval Bias Metric|

#### **CHAPTER 2  —  STRANDS EVALS: NATIVE SDK REFERENCE** 

### **2.1 Core Abstractions** 

Strands Evals (github.com/strands-agents/evals) is the first-party evaluation framework built specifically for the Strands Agents SDK. It introduces three foundational abstractions plus the Task Function bridge pattern (AWS ML Blog, March 18 2026). 

|**Concept**|**Definition**|**Analogy**|
|---|---|---|
|Case|Single test scenario: input + optional expected_output +<br>expected_trajectory + metadata|Unit test case|
|Experiment|Bundle of Cases + Evaluators that orchestrates execution and<br>generates EvaluationReports|Test suite / pytest session|
|Evaluator|LLM-based or code-based judge that scores output against<br>rubric or expected value|Test assertion with judgment|
|Task Function|Callable you provide to Experiment — invokes agent live<br>(online) or retrieves saved traces (offline)|Test fixture / mock setup|
|ActorSimulator|LLM-powered simulated user that drives realistic multi-turn<br>conversations to a defined goal|Synthetic user in usability testing|
|ExperimentGenerat<br>or|LLM that generates diverse Cases and rubrics from a high-level<br>context description|Automated test case generator|
|EvaluationReport|Per-case and per-experiment score breakdowns, pass/fail<br>status, evaluator reasoning|JUnit XML / pytest report|

### **2.2 All 10 Built-in Evaluators** 

|**Evaluator**|**Family**|**Level**|**Scale**|**Description**|**EU Banking Use**|
|---|---|---|---|---|---|
|OutputEvaluator|Rubric|Trace|0.0-1.0|Judges final response via custom<br>natural-language rubric|GDPR Art.22 adverse action<br>notice quality; AI disclosure<br>check|
|TrajectoryEvaluator|Rubric|Trace|0.0-1.0|Judges tool-call sequence via 3 scoring<br>modes: exact / in-order / any-order match|AML: PII-check -> AML-score<br>-> HITL (exact match required<br>by AMLD6)|
|InteractionsEvaluator|Rubric|Session|0.0-1.0|Evaluates sequences of interactions<br>between multiple agents or components|KYC agent -> credit agent<br>handoff audit trail (EU AI Act<br>Art.12)|
|HelpfulnessEvaluator|Semantic|Trace|1-7 scale|Pre-built 7-point scale: user value actually<br>delivered, not just technical correctness|EBA consumer outcomes —<br>genuine utility measure|
|FaithfulnessEvaluator|Semantic|Trace|1-5 scale|Pre-built 5-point: response grounded in<br>conversation history / context<br>(anti-hallucination)|GDPR accuracy — no<br>hallucinated financial or<br>personal data|
|HarmfulnessEvaluator|Semantic|Trace|Binary<br>Y/N|Pre-built binary: harmful / inappropriate /<br>dangerous content check|EU AI Act prohibited practices<br>gate — always 100%<br>sampling|
|ToolSelectionAccuracyE<br>valuator|Tool|Tool|0.0-1.0|Was the correct tool chosen for the task at<br>this point in conversation?|CRR/CRD: credit_model tool<br>must be called for credit<br>decisions|
|ToolParameterAccuracy<br>Evaluator|Tool|Tool|0.0-1.0|Were parameters passed to each tool<br>correct and complete?|Wrong customer_id -> wrong<br>credit data -> GDPR Art.22<br>violation risk|
|GoalSuccessRateEvalua<br>tor|Session|Session|0.0-1.0|Broadest view: did the user ultimately<br>achieve their stated goal?|EBA consumer outcome: did<br>customer resolve their issue<br>end-to-end?|

|**Evaluator**|**Family**|**Level**|**Scale**|**Description**|**EU Banking Use**|
|---|---|---|---|---|---|
|Custom (via|Domain|Any|Define|Any domain-specific rubric via|GDPR Art.22, AMLD6 SAR,|
|OutputEvaluator)|||own|OutputEvaluator or TrajectoryEvaluator|fairness/DIR, PII leakage, AI<br>disclosure|

### **2.3 Online vs Offline Task Patterns** 

|**Pattern**|**How It Works**|**Best For**|**EU Banking Note**|
|---|---|---|---|
|Online (live<br>invocation)|Task function creates agent, runs case<br>live, captures response and execution<br>trace for scoring|CI/CD gates, active development,<br>regression checks before<br>deployment|Run counterfactual fairness<br>suite before every deployment<br>merge|
|Offline (historical<br>traces)|Task function retrieves recorded traces<br>from Phoenix / Langfuse / DB; parses<br>into evaluator format|Production traffic analysis; A/B<br>model comparison on real<br>interactions|DORA audit: evaluate 6-month<br>trace archive for historical<br>compliance|
|Async parallel|experiment.run_evaluations_async(task_<br>fn, max_workers=N) enables concurrent<br>evaluation at scale|Large benchmark suites (200-1000<br>cases) in time-boxed CI/CD pipeline|Run 500-case EU compliance<br>suite in under 10 minutes with<br>max_workers=20|

### **2.4 ActorSimulator — Multi-Turn Testing** 

Real users do not follow scripts. ActorSimulator generates a realistic user profile — personality, expertise level, communication style, and a goal — then drives the conversation automatically. It emits a stop token when the goal is achieved, or stops at max_turns. The transcript is passed to GoalSuccessRateEvaluator to assess end-to-end success. 

##### **ACTORSIMULATOR — EU BANKING APPLICATIONS** 

- Simulate confused retail customer attempting loan application across 8 turns 

- Simulate sophisticated customer testing AML flag explanation (tests Art.13 transparency) 

- Simulate regulatory examiner probing credit decision explanation (tests GDPR Art.22) 

- Simulate adversarial user attempting prompt injection (tests EU AI Act Art.15 robustness) 

- Simulate customer exercising GDPR Art.17 right-to-erasure request via chat 

- Simulate non-native speaker with language difficulty (tests accessibility and fairness) 

### **2.5 TrajectoryEvaluator — Three Scoring Modes** 

The TrajectoryEvaluator provides an LLM judge with three built-in scoring functions. The judge selects the most appropriate mode based on the rubric provided. This is critical for EU banking where regulatory compliance requires specific tool ordering. 

|**Scoring**<br>**Mode**|**Definition**|**When to Use**|**EU Banking Example**|
|---|---|---|---|
|Exact match|Actual tool sequence must match<br>expected sequence precisely — same<br>tools, same order, nothing extra|When tool order is critical to safety,<br>compliance, or legal obligation|AML: pii_check THEN aml_score<br>THEN human_escalate — no<br>exceptions|
|In-order match|Expected tools appear in order but other<br>tools may be interspersed between them|When required steps must happen in<br>sequence but other calls are<br>acceptable|Credit: credit_check must<br>precede decision, but<br>explanation calls may occur<br>anywhere|
|Any-order<br>match|All expected tools appear somewhere in<br>the trajectory — order is flexible|When all required checks must occur<br>but sequence is not legally prescribed|Eligibility check: income_check,<br>employment_check, id_verify —<br>any order fine|

#### **CHAPTER 3  —  AGENTCORE EVALUATIONS: MANAGED SERVICE REFERENCE** 

Amazon Bedrock AgentCore Evaluations is a **fully managed, continuous assessment service** . It operates via two modes — online (live traffic) and on-demand (targeted) — and integrates with any agent framework via OpenTelemetry. Results publish to Amazon CloudWatch in real time, enabling alarms, automations, and dashboards. 

### **3.1 Online Evaluation — Continuous Production Monitoring** 

Online evaluation samples live production traffic and scores interactions using LLM-as-a-Judge. It provides persistent monitoring across multiple quality dimensions simultaneously. 

|**Configuration Parameter**|**Options**|**EU Banking Recommendation**|
|---|---|---|
|Sampling rate|Percentage-based (e.g. 10%) or conditional<br>filters on session metadata|Start 10%; auto-increase to 50% on drift alert; always<br>100% for PII and harmfulness evaluators|
|Evaluator selection|Built-in evaluator ARNs or custom evaluator<br>ARNs|Helpfulness + ToolSelectionAccuracy + Groundedness +<br>Custom PIILeakage + Custom Fairness|
|Session filtering|Include/exclude by session metadata, user<br>type, agent version tag|Exclude test sessions; include only production<br>customer-facing sessions via metadata filter|
|Output destination|Amazon CloudWatch metrics (default); S3 for<br>raw score archive|AgentCore Observability Dashboard + CloudWatch<br>Alarms + Lambda auto-remediation|
|IAM role|Create new AWS IAM role or pass existing<br>one with least-privilege policy|Separate IAM role per agent for auditability; log all role<br>assumption events in CloudTrail|

### **3.2 On-Demand Evaluation — Targeted Assessment** 

On-demand evaluation assesses specific interactions by analysing a chosen set of span or trace IDs. Unlike online evaluation, it is triggered explicitly and processes only the interactions you specify. 

|**ON-DEMAND EVALUATION USE CASES**|
|---|

- CI/CD pipeline: evaluate golden dataset before every deployment merge 

- Incident investigation: evaluate specific customer interactions flagged by a complaint 

- A/B comparison: same trace IDs evaluated with two different evaluator rubrics 

- Regulatory audit: evaluate 90-day sample of AML decision traces on demand 

- Custom evaluator testing: validate a new rubric before enabling it in online mode 

- Historical compliance: evaluate archived traces against new EU AI Act requirements 

### **3.3 All 13 Built-in AgentCore Evaluators** 

|**Evaluator ARN Suffix**|**Dimensio**<br>**n**|**Scale**|**Description**|
|---|---|---|---|
|Builtin.Helpfulness|Quality|0-1|Does the response deliver genuine user value? User-perspective quality<br>assessment.|
|Builtin.Correctness|Quality|0-1|Factual accuracy compared to ground truth or retrieved context.|
|Builtin.Coherence|Quality|0-1|Logical flow, internal consistency, and readability of the response.|
|Builtin.Completeness|Quality|0-1|Does the response address all aspects and sub-questions in the user<br>query?|
|Builtin.Groundedness|Quality|0-1|All claims in the response are supported by retrieved context.<br>Anti-hallucination metric.|
|Builtin.Relevance|Quality|0-1|Response is relevant and on-topic relative to the user's actual question.|
|Builtin.ToolSelectionAccuracy|Tool|0-1|Was the correct tool chosen for the task at each step of the conversation?|

|**Evaluator ARN Suffix**|**Dimensio**<br>**n**|**Scale**|**Description**|
|---|---|---|---|
|Builtin.ToolParameterAccuracy|Tool|0-1|Were correct and complete parameters passed to each tool invocation?|
|Builtin.ToolCallSequence|Tool|0-1|Tools invoked in the correct logical and/or legally required order?|
|Builtin.GoalSuccessRate|Session|0-1|Did the user ultimately achieve their stated goal? Session-level success.|
|Builtin.Harmlessness|Safety|0-1|Response is free from harmful, abusive, violent, or dangerous content.|
|Builtin.RefusalQuality|Safety|0-1|When agent declines, does it help user find an appropriate alternative?|
|Builtin.PIILeakage|Safety|0-1|No personally identifiable information exposed in the output. Zero<br>tolerance.|

### **3.4 Custom Evaluators** 

Custom evaluators extend AgentCore's evaluation capability with domain-specific quality metrics. Each has a unique ARN and can be referenced in both online and on-demand evaluation configurations. 

|**Parameter**|**Description**|**EU Banking Example**|
|---|---|---|
|model_id|Bedrock model ARN for the LLM judge|anthropic.claude-sonnet-4-20250514-v1:0 with<br>temperature=0.0 for deterministic scoring|
|evaluation_prompt|Full system prompt: rubric, scoring scale, output<br>schema (must be JSON)|GDPR Art.22 adverse action quality rubric with 1.0/0.5/0.0<br>scoring scale and critical_fail conditions|
|scoring_schema|Type (numeric/binary/categorical), pass_threshold,<br>composite weight map|{score: 0-1, critical_issues: [], reasoning: ''} with<br>pass_threshold: 0.75|
|critical_fail_on|Conditions that hard-fail the evaluation regardless<br>of overall score|compliance_score < 0.5 OR pii_detected = true — either<br>triggers BLOCK and DPO notification|

### **3.5 CloudWatch Dashboard Specification** 

|**Dashboard Row**|**Widgets**|**Alert Condition**|
|---|---|---|
|Quality Scores (7d trend)|Helpfulness, Correctness, Groundedness, Completeness<br>— line chart per evaluator|Any metric below threshold for 3<br>consecutive evaluation periods|
|Tool Accuracy (7d)|ToolSelection, ToolParameter, ToolCallSequence — line<br>chart|Any tool metric below 0.85 for 2 periods|
|Safety Gates (24h)|Harmlessness, PIILeakage, RefusalQuality — bar chart by<br>hour|ANY single safety failure = CRITICAL<br>alert — immediate DPO notification|
|Operational Metrics|Latency P50/P95/P99, token count, error rate — multi-line|P95 latency > 3000ms or error rate > 1%|
|Goal Success Rate|GoalSuccessRate trend, session duration, active session<br>count|GSR below 0.70 for 2 consecutive<br>periods|
|Cost Tracking|Cost per session (estimated from token usage) — area<br>chart|Cost exceeds 1.5x rolling 7-day average|
|Drift Indicators|Sampling rate (auto-adjusted), eval coverage %,<br>embedding drift score|Coverage drop below 5% or embedding<br>drift score exceeds 0.15|

#### **CHAPTER 4  —  ARIZE PHOENIX: OBSERVABILITY & EVALUATION LAYER** 

Arize Phoenix is an open-source, vendor-agnostic AI observability platform built on OpenTelemetry. For EU banking it is self-hostable on AWS EKS in Frankfurt (eu-central-1) to satisfy GDPR data residency. It provides end-to-end traces, embedding drift detection, LLM-as-a-Judge evaluations, human annotation queues, and experiment management. 

### **4.1 OpenTelemetry Span Types** 

|**Span Type**|**What It Captures**|**Evaluation Dimension**|
|---|---|---|
|LLM|Model ID, prompt/completion tokens, latency, input<br>messages, output text, estimated cost|Faithfulness, Helpfulness, Harmlessness, Correctness|
|Retriever|Query text, retrieved documents, relevance scores,<br>document metadata|Context Precision, Context Recall, Context Relevance|
|Tool|Tool name, input parameters, output, execution time,<br>error messages|ToolSelection, ToolParameter, ToolCallSequence|
|Chain|Sequence of steps, cumulative token count, total latency,<br>intermediate outputs|Trajectory quality, Step efficiency ratio|
|Agent|Full session, all sub-spans, final response, goal<br>metadata, user feedback|GoalSuccessRate, Conversation quality|
|Embedding|Input text, embedding vector, model ID, vector<br>dimensions|Embedding drift detection — semantic shift monitoring|

### **4.2 Drift Detection System** 

|**Drift Type**|**What Shifts**|**Detection Method**|**Phoenix Tool**|**Alert Threshold**|
|---|---|---|---|---|
|Input embedding<br>drift|User query distribution changes<br>semantically (new topics, new user<br>segments)|Cosine distance from 7-day<br>baseline centroid, computed<br>hourly|InputEmbeddingDriftMon<br>itor|> 0.15 drift score|
|Output embedding<br>drift|Response semantic distribution<br>shifts (tone, scope, vocabulary<br>changes)|Euclidean distance in<br>embedding space from<br>rolling baseline|OutputEmbeddingDriftM<br>onitor|> 0.20 drift score|
|Performance drift|Evaluation scores decline<br>gradually over days or weeks|EWMA control chart<br>(lambda=0.1); UCL/LCL at 3<br>sigma|MetricDriftMonitor|UCL or LCL breach|
|Step-change drift|Sudden quality drop from model<br>update or prompt change|CUSUM control chart (k=0.5<br>sigma, h=5 sigma)|MetricDriftMonitor|CUSUM stat > threshold|
|Concept drift|Knowledge base becomes stale<br>relative to real-world facts|Faithfulness decline + RAG<br>context recall drop combined<br>signal|Combined monitor|Faithfulness < 0.75<br>sustained 3d|
|Data drift|Feature distribution of structured<br>inputs shifts|KL divergence and PSI on<br>input features|FeatureDriftMonitor|PSI > 0.20|

**CHAPTER 5  —  COMPLETE METRIC CATALOGUE** 

### **5.1 Response Quality Metrics** 

|**Metric**|**Primary Tool**|**Scale**|**Target**|**Alert**|
|---|---|---|---|---|
|Helpfulness|AgentCore Builtin / Strands Evals|0-1|>= 0.80|< 0.75|
|Correctness|AgentCore Builtin / DeepEval GEval|0-1|>= 0.82|< 0.70|
|Coherence|AgentCore Builtin|0-1|>= 0.82|< 0.72|
|Completeness|AgentCore Builtin|0-1|>= 0.80|< 0.70|
|Groundedness|AgentCore Builtin|0-1|>= 0.85|< 0.75|
|Answer Relevancy|RAGAS|0-1|>= 0.82|< 0.72|
|Hallucination Rate|Phoenix / DeepEval|0-1|<= 0.10|> 0.20|
|Toxicity|DeepEval / Phoenix|0-1|<= 0.01|> 0.05|
|Bias Score|DeepEval / Custom|0-1|<= 0.05|> 0.10|
|Conciseness|DeepEval GEval|0-1|>= 0.75|< 0.60|

### **5.2 RAG Quality Metrics (RAGAS)** 

|**Metric**|**Method**|**Target**|**Alert**|**What It Catches**|
|---|---|---|---|---|
|Faithfulness|Claims_supported / Total_claims|>= 0.85|< 0.75|Hallucination — claims not in context|
|Context Precision|Relevant_chunks /<br>Retrieved_chunks|>= 0.80|< 0.70|Retriever noise — irrelevant chunks|
|Context Recall|GT_in_context / GT_total|>= 0.80|< 0.70|Missing evidence — incomplete retrieval|
|Context Relevance|LLM-Judge scoring|>= 0.80|< 0.70|Off-topic retrieved chunks|
|Answer Relevancy|Cosine similarity: question vs<br>answer|>= 0.82|< 0.72|Response misaligned with query intent|
|Response<br>Groundedness|LLM-Judge per-claim check|>= 0.85|< 0.75|Claims lacking context support|
|Noise Sensitivity|Score(noisy) minus Score(clean)|<= 0.10|> 0.20|Fragile retrieval affected by noise|
|Agent Goal Accuracy|LLM-Judge: goal vs achieved<br>outcome|>= 0.80|< 0.65|Agent fails to meet stated user goal|
|Topic Adherence|LLM-Judge: on-scope responses<br>ratio|>= 0.90|< 0.80|Agent answers out-of-scope questions|

### **5.3 Agentic Behaviour Metrics** 

|**Metric**|**Primary Tool**|**Target**|**Alert**|**Description**|
|---|---|---|---|---|
|Tool Selection Accuracy|AgentCore / Strands Evals|>= 0.90|< 0.80|Correct tool chosen for each step|
|Tool Parameter Accuracy|AgentCore / Strands Evals|>= 0.88|< 0.78|Correct parameters extracted from query|
|Tool Call Sequence|AgentCore /<br>TrajectoryEvaluator|>= 0.90|< 0.80|Tools called in correct legal order|
|Task Success Rate|Custom / DeepEval DAG|>= 0.75|< 0.60|Binary: user goal achieved end-to-end|
|Planning Quality|DeepEval DAG metric|>= 0.80|< 0.65|Correct goal decomposition into steps|
|Step Efficiency|Custom: actual / min steps|>= 0.80|< 0.65|Not wasting unnecessary tool calls|

|**Metric**|**Primary Tool**|**Target**|**Alert**|**Description**|
|---|---|---|---|---|
|Goal Success Rate|AgentCore / Strands Evals|>= 0.75|< 0.60|Session-level user goal achievement|
|Conversation Quality|RAGAS|>= 0.80|< 0.68|Multi-turn coherence and memory use|

### **5.4 Operational & Infrastructure Metrics** 

|**Metric**|**Source**|**Target**|**Alert**|**DORA Requirement**|
|---|---|---|---|---|
|Agent Uptime|CloudWatch|>= 99.5%|< 99.0%|DORA ICT availability obligation|
|Latency P50 (ms)|CloudWatch|<= 1200|> 2000|DORA performance resilience|
|Latency P95 (ms)|CloudWatch|<= 2500|> 3500|DORA performance resilience|
|Error Rate (%)|CloudWatch|<= 0.5%|> 1.0%|DORA incident classification threshold|
|MTTD (min)|CloudWatch|<= 15|> 30|DORA: detect incidents within SLA|
|MTTR (hours)|CloudWatch|<= 4|> 8|DORA: respond and restore within SLA|
|Token cost / session<br>(USD)|CloudWatch|<= 0.05|> 0.10|Budget governance (not DORA)|
|Tool failure rate (%)|Phoenix|<= 2%|> 5%|Downstream API reliability (DORA Art.28)|
|Eval coverage (%)|AgentCore|>= 10%|< 5%|Monitoring adequacy for ongoing oversight|

#### **CHAPTER 6  —  BENCHMARK CREATION STANDARDS** 

### **6.1 Three-Tier Benchmark Architecture** 

|**Tier**|**Type**|**Examples**|**Purpose**|**Update**<br>**Frequency**|
|---|---|---|---|---|
|Tier 1|Public<br>benchmarks|MMLU, HumanEval, SWE-bench,<br>BrowserBench, GAIA, TruthfulQA,<br>HellaSwag, FinanceBench|Calibrate against industry<br>baselines; compare model<br>versions objectively|At every<br>model<br>upgrade|
|Tier 2|Domain<br>benchmarks|FinanceBench, MedQA, LegalBench,<br>custom BankingBench built from EU<br>regulatory scenarios|Vertical-specific calibration for<br>banking use cases|Quarterly|
|Tier 3|Custom /<br>golden dataset|Curated from real production traffic<br>(anonymised) + SME-annotated +<br>adversarial red-team cases|Production truth — the definitive<br>gate that blocks deployment|Monthly + on<br>every incident|

### **6.2 Golden Dataset Construction** 

|**Step**|**Actions**|**Quality Gate**|
|---|---|---|
|A: Seed<br>Collection|Real user queries from Phoenix (anonymise PII first);<br>SME-authored exemplar questions; synthetic cases from<br>ExperimentGenerator; adversarial red-team cases; existing<br>regression test cases|Target 100-1000 examples per agent/domain;<br>minimum 20% adversarial cases|
|B: Ground<br>Truth<br>Annotation|Expected answer per case; acceptable variant answers; quality<br>rubric 1-5 scale; metadata: difficulty, domain, query type<br>(RAG/tool/reasoning/safety)|Inter-annotator Cohen's Kappa >= 0.70 required;<br>adjudicate disagreements via senior SME|
|C: Stratified<br>Split|Train Eval 70% (prompt optimisation); Dev Eval 15% (model<br>selection, never shown to evaluators); Test/Golden 15% (final<br>gate only, never used during development)|Stratify by domain, difficulty, query type; maintain<br>proportional representation|
|D: Version<br>Control &<br>Storage|S3 (eu-central-1) with Object Lock; Phoenix Datasets for<br>experiment management; DVC for version lineage; JSONL<br>schema with full validation|Test/Golden split locked immediately in S3 Object<br>Lock Compliance mode — no post-hoc<br>modification|

### **6.3 Anthropic/Claude Benchmarking Pattern — Replicated** 

|**Axis**|**Method**|**Implementation**|
|---|---|---|
|Capability<br>mapping|Map every test case to a specific capability: reasoning,<br>coding, maths, world knowledge, safety, instruction<br>following|Custom Case taxonomy with capability_tag metadata field|
|Multi-axis scoring|Human eval 1-7 scale AND auto eval 0-1 AND safety<br>eval pass/fail — all three required simultaneously for<br>high-risk decisions|Strands Evals Experiment with HelpfulnessEvaluator +<br>OutputEvaluator + HarmfulnessEvaluator combined|
|Red-team testing|Adversarial probing per safety category; jailbreak<br>resistance; instruction hierarchy violations;<br>constitutional AI alignment|Custom adversarial Case set (minimum 50 cases per risk<br>category)|
|ELO comparison|Side-by-side blind evaluation; diverse evaluator pool;<br>model identity never revealed to human judges|Phoenix Experiments A/B comparison; randomise<br>response order to eliminate position bias|
|Regression suite|Every fixed failure becomes a permanent test — zero<br>regression policy strictly enforced for all future<br>deployments|Strands Evals CI/CD gate with report.assert_pass()<br>blocking merge on any regression|
|Statistical<br>validation|Bootstrap confidence intervals; p < 0.05 threshold for<br>any claimed improvement; minimum 200 samples per<br>capability axis|Python scipy for significance tests; DeepEval statistical<br>utilities|

#### **CHAPTER 7  —  DRIFT DETECTION & AUTOMATED RESPONSE** 

### **7.1 Alert Thresholds & Escalation Matrix** 

|**Metric**|**Warning**|**Critical**|**Auto-Action**|**Human Escalation**|
|---|---|---|---|---|
|Helpfulness score|< 0.75|< 0.60|Increase sampling to 50%; trigger on-demand<br>eval|AI Risk team + on-call SRE|
|Tool Selection Accuracy|< 0.85|< 0.70|Trigger on-demand eval batch on recent traces|Platform engineering|
|Faithfulness (RAG)|< 0.80|< 0.65|Flag knowledge base for review; increase<br>sampling|Knowledge management team|
|Task Success Rate|< 0.70|< 0.55|Enable Level 2 HITL for all sessions|Product team + CRO|
|Input embedding drift|> 0.10|> 0.20|Increase sampling; alert team; begin<br>investigation|ML Engineering|
|Output embedding drift|> 0.15|> 0.25|Pause high-risk automated decisions|AI Ethics Committee|
|PII Leakage rate|> 0.001|> 0.01|EMERGENCY STOP — block all outputs<br>immediately|DPO + CISO + Legal (72h GDPR<br>clock starts)|
|Latency P95 (ms)|> 3000|> 5000|Scale-out trigger; check downstream tools|Infrastructure / SRE|
|Error rate (%)|> 1%|> 5%|Traffic rerouting; prepare rollback|On-call SRE + CTO|
|AML False Positive rate|> 0.35|> 0.50|Pause AML auto-flagging; switch to manual<br>review|MLRO + Compliance officer|

### **7.2 Automated Remediation Pipeline** 

Drift detection triggers a Lambda-based auto-remediation chain: CloudWatch Alarm -> SNS topic -> Lambda function. The Lambda performs: (1) increase sampling rate; (2) trigger on-demand evaluation on recent failing traces; (3) create incident ticket in Jira; (4) notify on-call via PagerDuty; (5) post summary to Slack. If the incident meets the DORA 'significant' threshold, a separate Lambda notifies the regulator within the required 4-hour window. 

#### **CHAPTER 8  —  EU BANKING COMPLIANCE FRAMEWORK** 

### **8.1 Regulatory Landscape** 

|**Regulation**|**In Force**|**Key AI Obligations**|**Max Penalty**|
|---|---|---|---|
|EU AI Act (2024/1689)|Aug 2024 (phased<br>to 2027)|High-risk conformity Art.10-15; human oversight; audit<br>trail 10yr; EU AI database registration|EUR 35M or 7% global<br>turnover|
|GDPR (2016/679)|May 2018 (active)|PII minimisation; right to explanation (Art.22); right to<br>erasure; DPIA for high-risk AI; data transfer restrictions|EUR 20M or 4% global<br>turnover|
|DORA (2022/2554)|January 2025<br>(active)|ICT risk management; incident reporting within 4h;<br>annual resilience testing; third-party ICT risk (AWS,<br>Anthropic, Arize)|Up to EUR 5M per entity|
|AMLD6 (2018/1673)|Active|AML/CTF controls; KYC verification; SAR justification;<br>FATF compliance for AI-generated flags; demographic<br>non-discrimination|Criminal liability + fines|
|CRR III / CRD VI|2025|Credit model validation; IRB model alignment for AI<br>credit scoring; capital requirements for AI-related risk<br>exposures|Capital add-on<br>requirements|
|EBA Guidelines|Ongoing|Loan origination and monitoring; model risk<br>management; internal governance; PD/LGD estimation<br>guidelines for AI models|Supervisory action; removal<br>of model approval|

### **8.2 High-Risk AI Classification — Banking Use Cases** 

|**Risk Level**|**Use Case**|**Full Obligations Aug**<br>**2026?**|**Key Evaluation Gate**|
|---|---|---|---|
|HIGH-RISK (Annex<br>III)|Credit scoring and creditworthiness<br>assessment of natural persons|YES — Art.10-15 +<br>conformity assessment +<br>EU DB registration|SHAP explanation + exact trajectory + HITL<br>human review check|
|HIGH-RISK (Annex<br>III)|Life and health insurance risk<br>assessment and pricing for individuals|YES — Art.10-15 +<br>conformity|Demographic parity + fairness rubric +<br>plain-language explanation|
|HIGH-RISK (Annex<br>III)|AML and KYC risk profiling of natural<br>persons|YES — Art.10-15 +<br>conformity|SAR quality rubric + demographic bias check +<br>audit trail 100%|
|HIGH-RISK (Annex<br>III)|Eligibility assessment for essential<br>financial services|YES — Art.10-15 +<br>conformity|Disparate impact ratio (DIR >= 0.80) + adverse<br>action notice quality|
|LIMITED-RISK<br>(Art.52)|Customer service AI chatbot or virtual<br>banking assistant|Transparency only:<br>disclose AI interaction to<br>user|AI disclosure rate = 100%,<br>HarmfulnessEvaluator on every session|
|LIMITED-RISK<br>(Art.52)|AI-generated financial content,<br>summaries, or explanations|Label AI-generated<br>content as such|Faithfulness + Groundedness + content labelling<br>compliance check|
|MINIMAL-RISK|Internal operations automation,<br>document processing, reporting|Voluntary codes of<br>conduct only|Standard quality and safety metrics from Chapter<br>5|
|PROHIBITED (since<br>Feb 2025)|Social scoring of EU citizens; subliminal<br>manipulation of financial decisions|BANNED — do not build<br>these systems|Block at system design; never deploy; audit any<br>legacy systems|

### **8.3 PII Detection — Three-Layer Architecture** 

|**Layer**|**Tools**|**Applied When**|**Action on Detection**|**EU Requirement**|
|---|---|---|---|---|
|Layer 1: Pre-LLM<br>input scrubbing|AWS Comprehend (entity<br>detection) + Microsoft Presidio<br>(EU-specific: IBAN, VAT, NHI)|Before every LLM call<br>— synchronous<br>blocking check|REDACT entities with<br>[REDACTED_TYPE];<br>PSEUDONYMISE with consistent<br>token; BLOCK if Art.9 special<br>category data|GDPR Art.5(1)(c)<br>data minimisation;<br>Art.25 privacy by<br>design and by<br>default|

|**Layer**|**Tools**|**Applied When**|**Action on Detection**|**EU Requirement**|
|---|---|---|---|---|
|Layer 2: Output guard|AgentCore Builtin.PIILeakage<br>evaluator + Phoenix custom<br>LLM-Judge evaluator|After every agent<br>response — 100%<br>sampling, never<br>reduce|BLOCK output; log incident with<br>PII category and session ID; notify<br>DPO immediately; create GDPR<br>breach assessment|GDPR Art.5<br>security; EU AI Act<br>Art.10 data<br>governance for<br>high-risk systems|
|Layer 3: Storage<br>anonymisation|AWS Macie (S3 PII scanning) +<br>CloudWatch Logs Insights PII<br>pattern detection|Before storing any<br>traces, logs, or<br>evaluation data<br>anywhere|Pseudonymise all customer IDs;<br>use synthetic PII in golden<br>datasets (never real customer<br>data); enforce S3 bucket policies|GDPR Art.6 lawful<br>basis<br>documentation;<br>Art.44-46 data<br>transfer restrictions<br>to non-EU|

### **8.4 Fairness & Bias Evaluation** 

|**Metric**|**Formula**|**Target**|**Tool**|**Regulatory Basis**|
|---|---|---|---|---|
|Disparate Impact Ratio<br>(DIR)|P(approve | minority group) divided by<br>P(approve | majority group)|>= 0.80 (EU<br>4/5ths rule)|Custom Strands Cases + batch<br>scoring on balanced test set|EU AI Act Art.10; EU<br>anti-discrimination<br>law|
|Demographic Parity<br>Difference|Absolute value of P(y_hat=1 | GroupA)<br>minus P(y_hat=1 | GroupB)|<= 0.05|Custom evaluator on balanced<br>demographic test set|EU AI Act Art.10<br>non-discriminatory<br>training data|
|Equal Opportunity Gap|Absolute value of TPR_GroupA minus<br>TPR_GroupB|<= 0.05|Recall calculation stratified by<br>protected demographic|EU AI Act Art.10;<br>EBA fair lending<br>guidelines|
|Counterfactual Fairness|Cosine distance between outputs for<br>same query with only protected<br>attribute changed (name, gender,<br>nationality)|<= 0.15|50 name-swap Cases — identical<br>query, swapped protected attribute|EU AI Act Art.10;<br>GDPR Art.22<br>individual decision<br>fairness|
|Calibration across groups|P(y=1 | score=p, GroupA)<br>approximately equals P(y=1 | score=p,<br>GroupB)|Calibration<br>error <= 0.05|Reliability diagram per<br>demographic group on test set|EBA credit model<br>governance; CRR III<br>model validation|

### **8.5 Art. 12 Audit Log Schema — Mandatory Fields** 

Every HIGH-RISK agent interaction must produce an immutable audit log. Storage: S3 Object Lock (Compliance mode), eu-central-1 region, AES-256 encryption, 10-year retention minimum. 

|**Field**|**Type**|**Content**|**Regulatory Purpose**|
|---|---|---|---|
|log_id|UUID v4|Globally unique per interaction|Traceability — enables point-in-time audit<br>lookup|
|timestamp_utc|ISO-8601|Millisecond-precision UTC timestamp|Audit sequencing and incident timeline<br>reconstruction|
|session_id|Pseudonymised|Customer session ID — no raw PII|GDPR Art.5(1)(c) data minimisation in logs|
|agent_id + version|String|Agent ARN + semantic version tag (e.g.<br>v2.1.0)|Version accountability — which code made<br>this decision|
|use_case_classificatio<br>n|Enum|HIGH_RISK or LIMITED or MINIMAL|EU AI Act Art.11 classification evidence|
|input (redacted)|String|Query with PII replaced by type tokens [IBAN],<br>[NAME]|GDPR Art.5 minimisation; preserves audit<br>without PII|
|pii_detected|Array|PII categories found + action taken<br>(REDACT/BLOCK)|GDPR compliance evidence; breach<br>assessment support|
|reasoning_trace|Array|All LLM calls + tool calls with parameters and<br>outputs|EU AI Act Art.12 automatic logging of<br>events|
|output|Encrypted ref|Response stored separately, AES-256, EU<br>region only|GDPR Art.32 security of processing|

|**Field**|**Type**|**Content**|**Regulatory Purpose**|
|---|---|---|---|
|evaluation_scores|Object|All metric scores for this interaction|Quality and compliance evidence per<br>interaction|
|human_review|Object|Required flag + reviewer ID + decision +<br>review timestamp|EU AI Act Art.14 human oversight<br>evidence|
|gdpr_basis|String|Lawful basis: contract / consent / legal<br>obligation|GDPR Art.6 lawful basis documentation|
|retention_end_date|ISO date|Creation date plus 10 years for HIGH_RISK<br>systems|EU AI Act Art.12 minimum retention period|
|data_residency|AWS Region ID|Must be EU region (eu-central-1, eu-west-1,<br>etc.)|GDPR Art.44-46 data transfer restrictions|

#### **CHAPTER 9  —  COMPLETE LIFECYCLE JOURNEY (IDEATION TO RETIREMENT)** 

#### **PHASE 1 IDEATION & REQUIREMENT CAPTURE** 

- I  Define agent purpose, user personas, scope, and measurable success criteria 

- I  Classify use case: HIGH_RISK / LIMITED / MINIMAL under EU AI Act Annex III (mandatory first step) 

- I  Map to evaluation planes: which of Response / RAG / Agentic metrics apply to this agent? 

- I  Select AgentCore built-in evaluators + identify gaps requiring custom evaluators 

- I  Define acceptance thresholds per metric — document formally in AI Governance Policy 

- I  Choose judge model: Claude Sonnet (primary) + Nova Premier (secondary for ensemble judging) 

- I  Complete DPIA if HIGH_RISK — obtain DPO sign-off before any customer data processing 

- I  Register planned AI system with DPO and AI Risk function — begin technical documentation draft 

#### **PHASE 2 BENCHMARK & DATASET CONSTRUCTION** 

- I  Run ExperimentGenerator with agent context + task description — generate 50-100 seed cases 

- I  SME review and curation: remove duplicates, adjust difficulty distribution (20% hard minimum) 

- I  Red-team sessions: generate adversarial, edge case, jailbreak, and safety test cases 

- I  Human annotation: ground truth + rubrics targeting inter-annotator kappa >= 0.70 

- I  Create counterfactual fairness suite: 50 name / gender / nationality swap pairs 

- I  Create PII leakage test suite: 100 cases with realistic synthetic PII in inputs and context 

- I  Create EU compliance suite: adverse action notices, AML SAR quality, AI disclosure tests 

- I  Version-control in S3 (eu-central-1) + Phoenix Datasets + DVC — lock golden split immediately 

##### **PHASE 3** 

#### **BUILD & INSTRUMENT** 

- I  Implement Strands Agent with tools, system prompt, and OTEL instrumentation via OpenInference 

- I  Register OpenInference spans -> Phoenix project and AgentCore OTEL collector simultaneously 

- I  Configure AgentCore Online Evaluation: start at 10% sampling with initial evaluator set 

- I  Implement PII Layer 1 guard (Presidio + AWS Comprehend) as pre-processor before every LLM call 

- I  Build custom evaluators: PII output guard, EU fairness rubric, GDPR Art.22 adverse action checker 

- I  Configure AgentCore Policy with Cedar rules: tool access, session isolation, output constraints 

- I  Set up HITL workflow: Phoenix annotation queue + Jira + reviewer SLA (4h credit, 48h AML) 

- I  Configure Langfuse for development trace collection and per-session cost tracking 

#### **PHASE 4 PRE-DEPLOYMENT EVALUATION GATE (CI/CD)** 

- I  Gate 1 — Prohibited practices: automated scan, HARD BLOCK on any positive finding 

- I  Gate 2 — PII safety: 100 synthetic PII cases, zero tolerance, HARD BLOCK on any single leak 

- I  Gate 3 — Fairness: 50 counterfactual pairs, DIR >= 0.80, sentiment delta <= 0.05 required 

- I  Gate 4 — Quality: full 200-500 case benchmark, all quality thresholds must pass simultaneously 

- I  Gate 5 — Trajectory compliance: EU-mandated tool sequences verified with exact match scoring 

- I  Gate 6 — Explainability: 100% explanation coverage for all HIGH_RISK decision outputs 

- I  Gate 7 — Audit trail: 100% of test interactions produce valid Art.12 log entries with all fields 

- I  Gate 8 — Safety: HarmfulnessEvaluator + RefusalQuality on full adversarial test set 

- I  Use report.assert_pass(threshold=N) — merge is blocked automatically if any single gate fails 

- I  Require: MRM independent validation sign-off + DPO review before any production deployment 

#### **PHASE 5 DEPLOY WITH ONLINE MONITORING** 

- I  Enable AgentCore Online Evaluation: start 10% sampling across all configured evaluators 

- I  Activate Phoenix drift monitors: input embedding, output embedding, metric EWMA, feature drift 

- I  HITL routing active: all HIGH_RISK decisions automatically routed to Level 2 review queue 

- I  Enable 100% sampling for HarmfulnessEvaluator and PIILeakage — never sample safety checks 

- I  CloudWatch alarms active: quality thresholds, latency P95, error rate, cost per session 

- I  Daily automated compliance email to AI Risk function, DPO, and CISO 

- I  Notify regulators if required: EU AI database registration + any required pre-notifications 

##### **PHASE 6** 

#### **CONTINUOUS IMPROVEMENT LOOP** 

- I  Weekly: pull failing traces from Phoenix; run cluster heatmap; identify top-5 failure patterns 

- I  Weekly: review HITL decisions — learn from human reviewer modifications and rejections 

- I  Monthly: full benchmark regression suite to detect gradual quality decay before users notice 

- I  Monthly: fairness audit — compute DIR and demographic parity across all protected attributes 

- I  Monthly: auto-generate compliance report (PII events, fairness metrics, HITL stats, drift events) 

- I  Curate failure cases into golden dataset — augment with newly discovered edge cases 

- I  Prompt engineering iteration -> Strands Evals experiment -> comparison vs production baseline 

- I  Re-run full gate suite before merging any improvement; track trend across Phoenix Experiments 

#### **PHASE 7 DRIFT DETECTION & INCIDENT RESPONSE** 

- I  Drift detected by Phoenix monitor or CloudWatch alarm -> SNS -> Lambda auto-response 

- I  Lambda: increase sampling 10%->50%; trigger on-demand eval; create incident ticket in Jira 

- I  Triage (0-15 min): scope check; deployment correlation; time-of-day pattern analysis 

- I  Diagnose (15-60 min): Phoenix cluster analysis; failure mode classification (data/concept/model/performance) 

- I  DORA: if 'significant' threshold met -> notify regulator within 4 hours of classification 

- I  Remediate: rollback OR prompt fix OR tool API fix OR knowledge base update -> re-evaluate 

- I  Validate: re-run full benchmark; confirm all metrics above thresholds; re-enable full traffic 

- I  Post-mortem: document root cause; update runbook; add failure case to regression suite 

##### **PHASE 8** 

#### **MODEL UPGRADE EVALUATION** 

- I  Run full benchmark on new model version using offline task function on same golden dataset 

- I  Statistical significance: n >= 200 samples, p < 0.05 threshold for any claimed improvement 

- I  Zero regression policy: all existing passing cases must continue to pass on new model version 

- I  EU compliance re-check: fairness suite + PII suite + trajectory compliance on new model 

- I  Cost and latency analysis: new model within +20% cost and +10% P95 latency of current baseline 

- I  Canary deployment: 5% of traffic to new model, monitor for 48 hours before proceeding 

- I  Progressive rollout: 5% -> 25% -> 50% -> 100% with full evaluation gate at each stage 

- I  Update benchmark baseline to new model scores; update Art.11 technical documentation 

#### **PHASE 9 RETIREMENT & ARCHIVAL** 

- I  Sunset criteria: metric floor breached persistently (3 consecutive monthly reviews) OR successor validated 

- I  Retirement decision: AI Governance Committee approval required; Board approval for HIGH_RISK 

- I  Archive all traces: S3 Object Lock Compliance mode; retain minimum 10 years (EU AI Act Art.12) 

- I  Archive: all evaluation reports, benchmark results, DPIA, conformity assessment, incident log 

- I  Generate final performance audit report: lifecycle evaluation trend, incident history, drift events 

- I  Baseline comparison document: how successor compares across every metric dimension 

- I  De-register from EU AI database (if applicable); notify DPO and relevant national supervisors 

- I  GDPR Art.17 erasure: delete all non-archived personal data; document deletion for DPA evidence 

- I  Knowledge transfer: share lessons learned with teams building and operating successor systems 

#### **CHAPTER 10  —  INTEGRATION STACK & QUICK REFERENCE** 

### **10.1 Tool Comparison Matrix** 

|**Capability**|**Strands Evals**|**AgentCore**<br>**Evals**|**Arize Phoenix**|**RAGAS**|**DeepEval**|
|---|---|---|---|---|---|
|Online (production) eval|No|Yes — native|Yes — online<br>evals|No|No|
|On-demand / CI/CD eval|Yes — native|Yes — native|Yes —<br>experiments|Yes|Yes|
|RAG quality metrics|Yes — custom|Yes — built-in|Yes — templates|Yes — best|Yes|
|Agentic / tool metrics|Yes — 4 built-in|Yes — 3 built-in|Yes — custom|Yes — Agent<br>Goal|Yes — DAG|
|Multi-turn simulation|Yes —<br>ActorSimulator|No|No|No|Yes — conversational|
|Drift detection|No|Yes — via<br>CloudWatch|Yes — native<br>(best)|No|No|
|Human annotation|No|No|Yes — annotation<br>queue|No|Yes — via Confident AI|
|EU self-hostable|Yes (AWS EU)|Yes (AWS EU<br>regions)|Yes — EKS<br>Frankfurt|Yes —<br>self-hosted|Yes — self-hosted|
|Strands native integration|Yes|Yes — via OTEL|Yes — via OTEL|Yes — via<br>Langfuse|Yes — via API|
|Open source|Yes|No — AWS<br>managed|Yes (7800+ stars)|Yes|Yes (400k+ downloads)|

### **10.2 Complete Metric Threshold Reference Card** 

|**Metric**|**Target**|**Warning**|**Critical**|**Zero Tolerance**|**Regulation**|
|---|---|---|---|---|---|
|Helpfulness|>= 0.80|< 0.75|< 0.60|No|EBA consumer outcomes|
|Correctness|>= 0.82|< 0.70|< 0.55|No|EU AI Act Art.15|
|Groundedness /<br>Faithfulness|>= 0.85|< 0.75|< 0.65|No|GDPR Art.5 accuracy|
|Tool Selection Accuracy|>= 0.90|< 0.85|< 0.70|No|EU AI Act Art.15|
|Tool Parameter Accuracy|>= 0.88|< 0.80|< 0.68|No|EU AI Act Art.15|
|Task / Goal Success Rate|>= 0.75|< 0.70|< 0.55|No|EBA consumer outcomes|
|Harmlessness|= 1.00|< 0.99|< 0.95|YES — any fail|EU AI Act prohibited|
|PII Leakage Rate|= 0.000|any > 0|any > 0|YES — any leak =<br>block|GDPR Art.5 and Art.25|
|AI Disclosure Rate|= 1.000|< 1.000|< 1.000|YES|EU AI Act Art.52|
|Audit Trail Coverage|= 1.000|< 1.000|< 0.990|YES for high-risk|EU AI Act Art.12|
|Disparate Impact Ratio|>= 0.80|< 0.85|< 0.80|YES — block<br>deploy|EU AI Act Art.10|
|Demographic Parity Diff.|<= 0.05|> 0.04|> 0.05|YES — block<br>deploy|EU AI Act Art.10|
|SAR Explanation Quality|>= 0.90|< 0.88|< 0.80|No|AMLD6, FATF|
|Adverse Action Quality|>= 0.95|< 0.93|< 0.85|No|GDPR Art.22|

|**Metric**|**Target**|**Warning**|**Critical**|**Zero Tolerance**|**Regulation**|
|---|---|---|---|---|---|
|Input Embedding Drift|<= 0.08|> 0.10|> 0.20|No|EU AI Act Art.9|
|Agent Uptime|>= 99.5%|< 99.5%|< 99.0%|No|DORA ICT availability|
|MTTD — incident<br>detection|<= 15 min|> 20 min|> 30 min|No|DORA incident management|
|MTTR — incident<br>response|<= 4 hours|> 4 hours|> 8 hours|No|DORA incident management|
|Latency P95 (ms)|<= 2500|> 3000|> 5000|No|DORA resilience|
|Error Rate (%)|<= 0.5%|> 1.0%|> 5.0%|No|DORA incident classification|

### **10.3 Regulatory Compliance Calendar** 

|**Deadline**|**Regulation**|**Action Required**|**Status**|
|---|---|---|---|
|Feb 2025 — DONE|EU AI Act|Cease all 8 categories of prohibited AI practices; begin AI literacy<br>programme for all staff|Verify complete — if not,<br>URGENT action required<br>now|
|Jan 2025 — DONE|DORA|Full ICT risk framework live; incident detection and reporting<br>operational; third-party register|Verify complete — if not,<br>URGENT action required<br>now|
|Aug 2025 — DONE|EU AI Act|GPAI model governance obligations; AI system inventory<br>completed and classified|Verify complete — if not,<br>URGENT action required<br>now|
|NOW (Q2 2026)|GDPR|DPIAs completed for all HIGH_RISK AI systems; DPAs signed<br>with AWS, Anthropic, Arize|ACTION REQUIRED —<br>DPO must sign off before<br>any deployment|
|NOW (Q2 2026)|EU AI Act|Technical documentation (Art.11) drafted; conformity assessment<br>started for HIGH_RISK|ACTION REQUIRED —<br>engage MRM and Legal<br>immediately|
|NOW (Q2 2026)|All|Deploy this evaluation framework; all 8 CI/CD gates operational;<br>Phoenix monitoring live|THIS DOCUMENT —<br>implementation timeline<br>required|
|Aug 2026|EU AI Act|HIGH_RISK AI: full conformity + CE marking + EU AI database<br>registration complete|CRITICAL DEADLINE —<br>4 months away —<br>escalate to board|
|Aug 2026|EU AI Act|Art.12 audit trail + Art.14 human oversight + Art.13 transparency<br>mechanisms all live|CRITICAL DEADLINE —<br>must be live before this<br>date|
|Aug 2027|EU AI Act|All remaining provisions; national market surveillance authority<br>registration|Future planning — begin<br>roadmap now|
|Dec 2030|EU AI Act|Large-scale IT systems extended transition period ends — all<br>IT-embedded AI must comply|Long-term enterprise<br>architecture roadmap|
|Quarterly (recurring)|EBA|Independent model validation report; ongoing monitoring review<br>by MRM team|Recurring — schedule in<br>AI Governance Calendar|
|Annually (recurring)|DORA|Full ICT risk assessment review; resilience testing (TLPT every 3<br>years for significant)|Recurring — coordinate<br>with CISO and<br>Operations|

### **10.4 Escalation Playbooks** 

|**Alert Scenario**|**Immediate Action (0-15 min)**|**Investigation (15-60 min)**|**Escalation Path**|
|---|---|---|---|
|PII leakage detected in<br>output|BLOCK all outputs; emergency stop<br>agent; DPO notification required within 1<br>hour of discovery|Identify affected sessions; scope of leak;<br>assess whether GDPR 72h notification<br>threshold is met|DPO + CISO + Legal;<br>potential GDPR Art.33<br>breach notification to<br>national DPA within 72h|
|Quality score collapse<br>(>20% drop)|Increase sampling to 50%; check<br>deployment log for any recent changes in<br>past 24h|Phoenix cluster analysis; identify failure<br>mode: data drift vs model change vs tool<br>API issue|AI Risk team + on-call SRE;<br>rollback if correlated with<br>recent deployment|
|Fairness / DIR breach<br>below 0.80|Pause all HIGH_RISK automated<br>decisions immediately; route 100% to<br>Level 3 HITL|Compute DIR across all demographic<br>groups; identify which group is affected<br>and by how much|AI Ethics Committee + CRO<br>+ Legal; potential regulator<br>notification (EBA / national<br>CA)|
|AML false positive surge<br>>35%|Pause AML auto-flagging; switch entirely<br>to manual review queue; notify MLRO|Analyse flagged transaction<br>characteristics; identify model or data<br>change driving surge|MLRO + Compliance +<br>Risk; assess AMLD6<br>obligations; potential FATF<br>notification|
|DORA significant ICT<br>incident|Incident ticket created; war-room<br>assembled; begin impact assessment for<br>'significant' classification|Containment actions executed; RCA<br>commenced; business continuity plan<br>activated if needed|CIO + CISO; if 'significant':<br>mandatory regulator<br>notification within 4h of<br>classification decision|
|Embedding drift score<br>>0.20|Auto-increase sampling; trigger<br>on-demand eval batch on traces from<br>past 6 hours|Determine if input query distribution or<br>model output has semantically shifted;<br>compare topic distributions|ML Engineering; prompt or<br>model update cycle; MRM<br>review if change is<br>significant for HIGH_RISK<br>models|

#### **DOCUMENT INFORMATION & GOVERNANCE** 

|**Attribute**|Value|
|---|---|
|**Document Title**|Complete AI Agent Evaluation Framework — EU Banking Edition v2.0|
|**Framework Stack**|AWS Bedrock AgentCore + Strands Evals (10 evaluators) + Arize Phoenix + RAGAS +<br>DeepEval|
|**Regulatory Coverage**|EU AI Act (2024/1689) + GDPR (2016/679) + DORA (2022/2554) + AMLD6 + CRR III + EBA<br>Guidelines|
|**Source Material**|AWS ML Blog: Strands Evals guide (Mar 18 2026); AgentCore docs; EBA AI Act factsheet<br>(Nov 2025); EDPB LLM Privacy Risk report (Apr 2025)|
|**Chapters**|10 chapters covering: architecture, Strands Evals, AgentCore, Phoenix, metrics, benchmarks,<br>drift, EU compliance, lifecycle, quick reference|
|**Metrics Defined**|45+ metrics across 4 planes: response quality, RAG quality, agentic behaviour,<br>operational/infrastructure, and EU compliance|
|**Lifecycle Phases**|9 phases: Ideation, Benchmark, Build, Pre-Deploy Gate, Deploy, Improve, Drift Response,<br>Model Upgrade, Retirement|
|**Critical Deadline**|August 2, 2026 — EU AI Act HIGH-RISK AI full obligations come into force — all conformity<br>must be complete before this date|
|**Classification**|Confidential — Internal Use — Do Not Distribute Externally Without Legal Approval|
|**Owner**|AI Platform Engineering Team|
|**Review Cycle**|Quarterly — or immediately upon any EU regulatory update or significant incident|
|**Generated**|06 April 2026|

_Sources: AWS Bedrock AgentCore documentation; AWS Machine Learning Blog — 'Evaluating AI agents for production: A practical guide to Strands Evals' (March 18, 2026); EBA AI Act implications factsheet (November 2025); EU AI Act text (Regulation 2024/1689); GDPR (Regulation 2016/679); DORA (Regulation 2022/2554); European Data Protection Board LLM Privacy Risk report (April 2025); Arize Phoenix documentation; RAGAS framework documentation; DeepEval documentation; CFA Institute Explainable AI in Finance report (2025); IOSCO AI in Capital Markets consultation (March 2025)._
