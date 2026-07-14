---
title: "Complete AI Agent Evaluation Framework"
date_created: 2026-07-10
date_updated: 2026-07-14
status: current
source_type: converted-pdf
source_file: "AI_Agent_Evaluation_Framework_Complete.pdf"
doc_type: guide
tags: ["ai-development", "evaluation", "testing", "llm-as-judge", "drift-detection", "rag-evaluation", "cloud-agnostic", "observability", "benchmark", "compliance"]
last_reviewed: 2026-07-14
framework_name: ""
covers_version: "2.1 — Cloud-Agnostic Edition"
---

# Complete AI Agent Evaluation Framework

### Cloud-Agnostic Edition · LLM-as-Judge · RAG · Agentic · Drift Detection

From ideation to retirement: the definitive production guide for evaluating AI agents across any cloud provider or self-hosted infrastructure. Covers quality, safety, responsible AI, PII, fairness, explainability, drift detection, and automated pipelines.

|**Multi-Framework**<br>**SDK Support**|**45+**<br>**Metrics Defined**|**4 Eval Levels**|**9 Lifecycle**<br>**Phases**|**3 Cloud**<br>**Providers**|**LLM-as-Judge**<br>**Anti-Patterns**|
|---|---|---|---|---|---|

> **Related:** [Agent Testing, Monitoring & Evaluation](./Agent_Testing_Monitoring_Evaluation.md) — test pyramid and CI/CD patterns

---

## Table of Contents

#### 1. Framework Architecture & Overview
1.1 The Evaluation Problem in AI Agents  
1.2 Component Map — Four Layers  
1.3 Which Tool for Which Job  

#### 2. Evaluation Framework SDKs — Multi-Framework Reference
2.1 Universal Abstractions: Case, Experiment, Evaluator, Task Function  
2.2 Framework Comparison Matrix  
2.3 Core Evaluator Families — 10 Universal Evaluator Types  
2.4 Online vs Offline Task Patterns  
2.5 Multi-Turn Simulation — ActorSimulator Pattern  
2.6 Automated Test Generation  
2.7 Evaluation Hierarchy: Session / Trace / Tool  

#### 3. Cloud Provider Managed Evaluation Services
3.1 AWS Bedrock AgentCore Evaluations  
3.2 Azure AI Evaluation SDK  
3.3 Google Vertex AI Evaluation Service  
3.4 Self-Hosted Option: Confident AI / DeepEval  
3.5 Service Comparison & Selection Guide  

#### 4. Observability & Tracing Layer
4.1 OpenTelemetry / OpenInference Instrumentation  
4.2 Span Types & Trace Explorer  
4.3 Platform Comparison: Phoenix · LangFuse · MLflow · W&B  
4.4 Drift Detection System  
4.5 Dataset & Experiment Management  
4.6 Human Annotation Queue  

#### 5. Complete Metric Catalogue
5.1 Plane 1 — Response Quality Metrics  
5.2 Plane 2 — RAG Quality Metrics (RAGAS)  
5.3 Plane 3 — Agentic Behaviour Metrics  
5.4 Plane 4 — Operational / Infrastructure Metrics  
5.5 Composite Metrics: G-Eval, MT-Bench, ELO Methods  
5.6 Regulatory Compliance Metrics  

#### 6. Benchmark Creation Standards
6.1 Three-Tier Architecture  
6.2 Golden Dataset Construction Process  
6.3 Benchmarking Methodology  
6.4 Adversarial & Red-Team Sets (OWASP LLM Top 10)  

#### 7. Drift Detection & Automated Response
7.1 Five Types of Drift  
7.2 Detection Methods (EWMA, CUSUM, Embedding)  
7.3 Alert Thresholds & Escalation Matrix  
7.4 Automated Remediation Pipeline  

#### 8. LLM-as-Judge Design Patterns & Pitfalls
8.1 Why LLM-as-Judge Works and When It Fails  
8.2 Seven Known Biases and Mitigations  
8.3 Judge Calibration Against Human Labels  
8.4 Ensemble and Panel Judging  
8.5 Rubric Engineering for Consistent Scoring  

#### 9. Regulatory Compliance Framework
9.1 Global Regulatory Landscape  
9.2 High-Risk AI Classification  
9.3 PII Detection — 3-Layer Architecture  
9.4 Fairness & Bias Evaluation  
9.5 Audit Log Schema — Mandatory Fields  
9.6 Human Oversight Architecture  

#### 10. Complete Lifecycle (Ideation to Retirement)
All 9 phases from ideation through retirement  

#### 11. Multi-Cloud Deployment Patterns
11.1 Cloud-Provider Tool Mapping  
11.2 Self-Hosted Reference Architecture  
11.3 Hybrid Cloud Evaluation Topology  

#### 12. Integration Stack & Quick Reference
12.1 Full Tool Comparison Matrix  
12.2 Complete Metric Threshold Card  
12.3 Framework Selection Decision Tree  
12.4 Escalation Playbooks  

---

## CHAPTER 1 — FRAMEWORK ARCHITECTURE & OVERVIEW

### 1.1 The Evaluation Problem in AI Agents

Traditional software testing assumes deterministic outputs: same input, same expected output. AI agents break this completely — they generate natural language, make context-dependent decisions, call tools in adaptive sequences, and produce varied outputs from identical inputs. Evaluation therefore requires **judgment** rather than keyword comparison and **multi-dimensional scoring** rather than binary pass/fail.

**Why agents are hard to evaluate:**
- Natural language has many valid forms — no single correct answer exists
- Agents take multi-step actions; final response alone misses intermediate failures
- Multi-turn conversations need session-level context awareness
- Tool selection and parameter correctness add agentic dimensions absent in LLM evals
- Non-determinism means the same test case can produce different results each run

### 1.2 Component Map — Four Layers

The framework is organized into four independent layers. Each layer is tool-swappable — you can use AWS, Azure, GCP, or entirely open-source/self-hosted options at each layer without affecting the others.

|**Layer**|**Role**|**Open-Source Options**|**Cloud-Managed Options**|
|---|---|---|---|
|**SDK / Framework**|Native SDK evaluation: cases, experiments, evaluators, CI/CD gates|DeepEval, RAGAS, LangChain Evals, Strands Evals|Azure AI Evaluation SDK, Google Vertex AI Eval|
|**Managed Service**|Continuous production scoring, on-demand targeted assessment|Confident AI (DeepEval cloud), Weights & Biases|AWS AgentCore Evals, Azure AI Foundry Eval, GCP Vertex Eval|
|**Observability**|OTel traces, embedding drift, human annotation, experiment tracking|Arize Phoenix, LangFuse, MLflow, OpenLLMetry|AWS X-Ray + CloudWatch, Azure Monitor, GCP Cloud Trace|
|**Specialist Libraries**|RAG metrics, agentic planning, LLM unit testing|RAGAS, DeepEval, TruLens, PromptFlow|Provider-native RAG evaluators|

### 1.3 Decision: Which Tool for Which Job

|**Scenario**|**Primary Tool**|**Supporting Tool**|
|---|---|---|
|Pre-deployment quality gate|DeepEval or RAGAS (CI/CD)|Cloud-managed on-demand eval|
|Production sampling & scoring|Cloud managed eval service|Phoenix/LangFuse online evals|
|RAG pipeline quality|RAGAS|Phoenix RAG templates|
|Multi-turn conversation testing|DeepEval Conversational or ActorSimulator|RAGAS multi-turn|
|Debug a specific user complaint|Phoenix/LangFuse Trace Explorer|Cloud managed on-demand eval|
|Detect gradual performance decay|Phoenix Drift Monitors|Cloud monitoring EWMA alarms|
|Compliance gate (PII, fairness)|Custom evaluators with PII library|Cloud provider safety evaluators|
|Human review & annotation|Phoenix Annotation Queue or Argilla|LangFuse human feedback|
|A/B prompt comparison|Phoenix Experiments or W&B Prompts|LangFuse + RAGAS|
|LLM judge calibration|Human label comparison + statistical testing|DeepEval G-Eval|

---

## CHAPTER 2 — EVALUATION FRAMEWORK SDKs: MULTI-FRAMEWORK REFERENCE

### 2.1 Universal Abstractions

All major AI evaluation frameworks share a common conceptual model, regardless of cloud provider or vendor. Understanding these universal concepts lets you switch frameworks without re-learning the underlying evaluation theory.

|**Concept**|**Definition**|**Framework Names**|
|---|---|---|
|**Case / Test Case**|Single scenario: input + optional expected_output + expected_trajectory + metadata|Case (Strands), TestCase (DeepEval), EvalInput (LangChain), Example (RAGAS)|
|**Experiment / Suite**|Bundle of Cases + Evaluators; orchestrates execution and generates reports|Experiment (Strands/Phoenix), EvalSuite (DeepEval), Dataset (RAGAS)|
|**Evaluator / Metric**|LLM-based or code-based judge scoring output against rubric or expected value|Evaluator (Strands), Metric (DeepEval), Scorer (LangChain), Evaluator (RAGAS)|
|**Task Function**|Callable that invokes the agent live (online) or retrieves saved traces (offline)|task_fn (Strands), invoke_fn (LangChain), any callable|
|**Actor / User Simulator**|LLM-powered synthetic user driving realistic multi-turn conversations|ActorSimulator (Strands), ConversationalTestCase (DeepEval)|
|**Evaluation Report**|Per-case and per-experiment scores, pass/fail status, evaluator reasoning|EvaluationReport (Strands), TestResult (DeepEval)|

### 2.2 Framework Comparison Matrix

|**Framework**|**Vendor**|**License**|**Primary Strength**|**RAG**|**Agentic**|**Multi-Turn**|**CI/CD**|**Self-Host**|
|---|---|---|---|---|---|---|---|---|
|**DeepEval**|Confident AI|Open-source (BSL)|Pytest-native LLM tests, G-Eval, DAG metric|Full|DAG|Conversational|Native|Full|
|**RAGAS**|Explodinggradients|Apache 2.0|RAG quality metrics; best-in-class retrieval eval|Best|Partial|Partial|Via API|Full|
|**Arize Phoenix**|Arize AI|Apache 2.0|Observability, drift detection, human annotation|Templates|Traces|Annotation|Via API|Docker/K8s|
|**LangFuse**|LangFuse GmbH|MIT (self-host)|Trace collection, cost tracking, human feedback|Partial|Traces|Sessions|SDK|Docker|
|**Strands Evals**|AWS|Apache 2.0|Strands Agents SDK native; ActorSimulator|Custom|Trajectory|Actor|Native|Full|
|**TruLens**|TruEra|MIT|RAG triads (groundedness/relevance/context)|Triads|Partial|Partial|Via SDK|Full|
|**LangChain Evals**|LangChain|MIT|Criteria eval; pairwise comparison|Partial|Partial|Partial|Via API|Full|
|**W&B Prompts**|Weights & Biases|SaaS|Experiment tracking, A/B prompt comparison|Partial|Traces|Partial|SDK|Managed only|
|**MLflow LLM**|Databricks|Apache 2.0|Model registry integration; batch eval|Metrics|Partial|No|Native|Docker/K8s|
|**Promptfoo**|Promptfoo Inc|MIT|Red-teaming, prompt testing, provider comparison|No|Partial|Partial|CLI-native|Full|

### 2.3 Core Evaluator Families — 10 Universal Types

These evaluator types are present in every major framework under different names:

|**Evaluator Family**|**What It Measures**|**Scale**|**Framework Equivalents**|**When to Use**|
|---|---|---|---|---|
|**Output / Rubric**|Final response quality via custom natural-language rubric|0.0–1.0|OutputEvaluator, GEval, criteria_eval|Custom domain requirements; no ground truth available|
|**Trajectory / Plan**|Tool-call sequence quality; correct ordering|0.0–1.0|TrajectoryEvaluator, DAG metric|Multi-step agent workflows where sequence matters|
|**Helpfulness**|Genuine user value delivered; 7-point scale|1–7|HelpfulnessEvaluator, human_score|Consumer-facing applications; service quality|
|**Faithfulness**|Response grounded in context; anti-hallucination|0–1|FaithfulnessEvaluator, RAGAS faithfulness|RAG systems; factual accuracy requirements|
|**Harmlessness**|Harmful, dangerous, or inappropriate content|Binary or 0–1|HarmfulnessEvaluator, safety_score|Any production deployment; 100% sampling recommended|
|**Tool Selection**|Correct tool chosen for the task at each step|0.0–1.0|ToolSelectionAccuracyEvaluator|Agentic systems; multi-tool workflows|
|**Tool Parameters**|Parameters passed to tool correct and complete|0.0–1.0|ToolParameterAccuracyEvaluator|Critical for agentic systems; wrong params = silent failure|
|**Goal Success**|Session-level: did user achieve their stated goal?|0.0–1.0|GoalSuccessRateEvaluator, task_success|End-to-end evaluation; multi-turn sessions|
|**Interactions**|Multi-agent handoff quality; session-level coherence|0.0–1.0|InteractionsEvaluator|Multi-agent pipelines; supervisor–worker patterns|
|**Custom Domain**|Any domain-specific rubric via LLM judge|Define own|OutputEvaluator with custom prompt|Compliance checks, industry-specific quality criteria|

### 2.4 Online vs Offline Task Patterns

|**Pattern**|**How It Works**|**Best For**|**Implementation Note**|
|---|---|---|---|
|**Online (live)**|Task function creates agent, runs case live, captures response and trace|CI/CD gates, regression testing, active development|Requires agent endpoint access; adds real latency to pipeline|
|**Offline (historical)**|Task function retrieves recorded traces from observability platform|Production traffic analysis; A/B model comparison on real interactions|Requires trace storage (Phoenix, LangFuse, MLflow)|
|**Async parallel**|`run_evaluations_async(task_fn, max_workers=N)` for concurrent eval at scale|Large benchmark suites (200–1000 cases) in time-boxed CI/CD|Set `max_workers` to match provider rate limits; add retry with backoff|
|**Shadow mode**|Evaluation runs in parallel with production without blocking the response|Production monitoring with zero latency impact|Route copy of each interaction to eval service via message queue|

### 2.5 Multi-Turn Simulation — ActorSimulator Pattern

Real users do not follow scripts. The ActorSimulator pattern generates a realistic user profile — personality, expertise level, communication style, and a goal — then drives the conversation automatically to a defined stopping condition.

**Framework implementations:**
- **Strands Evals:** `ActorSimulator` class with `goal`, `persona`, `max_turns` parameters
- **DeepEval:** `ConversationalTestCase` with `messages` list and `LLMTestCase` per turn
- **Custom:** Any LLM + loop structure that feeds prior assistant response back as next user input

**Universal simulation scenarios:**
- Confused user attempting a multi-step task (tests guidance quality)
- Sophisticated user probing explanation depth (tests transparency)
- Adversarial user attempting prompt injection (tests robustness — OWASP LLM01)
- Non-native speaker with language difficulty (tests accessibility and fairness)
- User exercising data rights request via chat (tests compliance handling)
- Expert user with very specific technical requirements (tests precision)

### 2.6 Automated Test Case Generation

```python
# Universal pattern: LLM generates diverse test cases from agent context
# Works with any LLM provider

def generate_eval_cases(
    agent_description: str,
    tool_list: list,
    n_cases: int = 50,
    llm_client = None  # inject any provider client
) -> list:
    prompt = f"""You are an AI evaluation expert. Generate {n_cases} test cases for this agent:

Agent: {agent_description}
Tools available: {', '.join(tool_list)}

Generate test cases covering:
- Happy path scenarios (easy, 30%)
- Complex multi-step scenarios (medium, 50%)
- Edge cases and adversarial inputs (hard, 20%)

Return JSON array: [{{"input": "...", "expected_tools": [...], "difficulty": "easy|medium|hard",
"category": "functionality|safety|edge_case", "expected_output_rubric": "..."}}]"""

    response = llm_client.complete(prompt)  # provider-agnostic
    import json
    return json.loads(response)
```

### 2.7 Evaluation Hierarchy: Session / Trace / Tool

```
SESSION LEVEL (GoalSuccessRate, Conversation Quality)
  └─ TRACE LEVEL (Helpfulness, Faithfulness, Harmlessness, Correctness)
       └─ TOOL LEVEL (ToolSelection, ToolParameter, ToolCallSequence)
```

Run all three levels simultaneously. Session-level metrics alone miss tool-level failures that still lead to a technically successful end state via compensating actions.

---

## CHAPTER 3 — CLOUD PROVIDER MANAGED EVALUATION SERVICES

### 3.1 AWS Bedrock AgentCore Evaluations

Amazon Bedrock AgentCore Evaluations is a fully managed, continuous assessment service operating via two modes — online (live traffic) and on-demand (targeted). It integrates with any agent framework via OpenTelemetry and publishes results to Amazon CloudWatch.

**13 Built-in Evaluators:**

|**Evaluator**|**Dimension**|**Scale**|
|---|---|---|
|Helpfulness|Quality|0–1|
|Correctness|Quality|0–1|
|Coherence|Quality|0–1|
|Completeness|Quality|0–1|
|Groundedness|Quality|0–1|
|Relevance|Quality|0–1|
|ToolSelectionAccuracy|Tool|0–1|
|ToolParameterAccuracy|Tool|0–1|
|ToolCallSequence|Tool|0–1|
|GoalSuccessRate|Session|0–1|
|Harmlessness|Safety|0–1|
|RefusalQuality|Safety|0–1|
|PIILeakage|Safety|0–1 (zero tolerance)|

**Custom evaluators:** Each takes a `model_id`, `evaluation_prompt`, and `scoring_schema` with optional `critical_fail_on` conditions.

**Minimum viable config:**
```python
import boto3
client = boto3.client("bedrock-agent-runtime")
client.create_evaluation_job(
    evaluationConfig={"automated": {"datasetMetricConfigs": [{
        "dataset": {"name": "golden-set", "datasetLocation": {"s3": {"uri": "s3://..."}}},
        "metricNames": ["Builtin.Helpfulness", "Builtin.Groundedness", "Builtin.PIILeakage"]
    }]}},
    inferenceConfig={"models": [{"bedrockModel": {"modelIdentifier": "anthropic.claude-sonnet-4-5"}}]},
    roleArn="arn:aws:iam::123456789012:role/BedrockEvalRole"
)
```

**Best for:** AWS-native agent stacks (Bedrock Agents, Strands Agents). Online evaluation mode with CloudWatch dashboards is production-ready out of the box.

### 3.2 Azure AI Evaluation SDK

The `azure-ai-evaluation` Python SDK provides built-in evaluators callable locally or on Azure AI Foundry cloud compute.

**Deployment options:**
- **Local:** Runs evaluators on your machine using Azure OpenAI models as judges
- **Cloud:** Submit evaluation jobs to Azure AI Foundry for scalable parallel execution

**Built-in evaluator categories:**

|**Category**|**Evaluators**|**Provider Requirement**|
|---|---|---|
|Quality|CoherenceEvaluator, FluencyEvaluator, GroundednessEvaluator, RelevanceEvaluator|Azure OpenAI or OpenAI judge model|
|Safety / RAI|HateSpeechEvaluator, SexualEvaluator, ViolenceEvaluator, SelfHarmEvaluator|Azure AI Content Safety (special access)|
|Task|F1ScoreEvaluator, BleuScoreEvaluator, RougeScoreEvaluator|No judge model required|
|Composite|QAEvaluator (Groundedness+Relevance+Coherence+Fluency combined)|Azure OpenAI required|

```python
from azure.ai.evaluation import GroundednessEvaluator, CoherenceEvaluator, evaluate

results = evaluate(
    data="golden_dataset.jsonl",  # local file or Azure AI Foundry dataset
    evaluators={"groundedness": GroundednessEvaluator(model_config),
                "coherence": CoherenceEvaluator(model_config)},
    evaluator_config={"default": {"query": "${data.query}", "response": "${data.response}",
                                   "context": "${data.context}"}},
    output_path="./eval_results"
)
```

**Best for:** Azure/M365-native organizations; integrates with Azure ML pipelines and Azure DevOps CI/CD.

### 3.3 Google Vertex AI Evaluation Service

The `google-cloud-aiplatform` SDK's `evaluation` module provides both online (AutoSxS) and offline evaluation.

**Evaluation approaches:**

|**Approach**|**When to Use**|**Method**|
|---|---|---|
|**Pointwise** (absolute)|Score a single model's responses against criteria|LLM-as-judge scores each response independently|
|**Pairwise / AutoSxS**|Compare two model versions side-by-side|Autorater selects winner; produces win-rate metric|
|**Computation-based**|Exact metrics with ground truth|BLEU, ROUGE, METEOR, exact match|

```python
from vertexai.evaluation import EvalTask, PointwiseMetric, MetricPromptTemplateExamples

eval_task = EvalTask(
    dataset=eval_dataset,  # DataFrame with prompt, response, [context] columns
    metrics=[
        "groundedness", "fluency", "coherence",
        PointwiseMetric(
            metric="custom_helpfulness",
            metric_prompt_template=MetricPromptTemplateExamples.get_prompt_template("helpfulness")
        )
    ],
    experiment="my-agent-eval-experiment"
)
results = eval_task.evaluate()
```

**Best for:** GCP-native stacks using Vertex AI Agent Builder or Gemini models.

### 3.4 Self-Hosted Option: Confident AI / DeepEval

For organizations requiring full data sovereignty or avoiding public cloud dependencies:

|**Option**|**Deployment**|**Key Feature**|**Cost Model**|
|---|---|---|---|
|**Confident AI**|SaaS or self-hosted Docker|DeepEval cloud backend; regression tracking; annotation|Per-evaluation or seat license|
|**Phoenix (self-hosted)**|Docker Compose or Kubernetes|Full observability + eval; no data leaves your infra|Free open-source; support contract available|
|**LangFuse (self-hosted)**|Docker Compose|Trace + eval + human feedback; GDPR-compliant self-host|Free open-source; cloud plan available|
|**MLflow**|Your infrastructure|Experiment tracking + LLM eval; Databricks integration|Free open-source|

### 3.5 Service Comparison & Selection Guide

|**Capability**|**AWS AgentCore**|**Azure AI Eval**|**GCP Vertex Eval**|**Self-Hosted**|
|---|---|---|---|---|
|Online (production) eval|Native|Via Azure Monitor hooks|Via Vertex Pipeline|Via Phoenix/LangFuse|
|On-demand / CI/CD|Native|Native (local + cloud)|Native|Native|
|RAG quality metrics|Built-in|Groundedness|Groundedness|RAGAS (best RAG)|
|Agentic / tool metrics|3 built-in|Custom only|Custom only|DeepEval DAG|
|Multi-turn simulation|ActorSimulator|Custom only|Custom only|DeepEval Conversational|
|Drift detection|Via CloudWatch|Via Azure Monitor|Via Cloud Monitoring|Phoenix native|
|Human annotation|No|Via AI Foundry|No|Phoenix / Argilla|
|PII / safety evaluators|PIILeakage built-in|RAI evaluators|Safety filters|Custom + Presidio|
|Data residency control|AWS regions|Azure regions|GCP regions|Full control|
|Lock-in risk|High|High|High|None|
|**Best for**|AWS-native stacks|Azure/M365 orgs|GCP + Gemini stacks|Privacy-first or multi-cloud|

**Decision rule:** Use cloud-managed services only when your agents are already deployed on that cloud. For multi-cloud or vendor-neutral deployments, use the open-source stack (DeepEval + RAGAS + Phoenix/LangFuse) — it works identically regardless of where your agent runs.

---

## CHAPTER 4 — OBSERVABILITY & TRACING LAYER

### 4.1 OpenTelemetry / OpenInference Instrumentation

The instrumentation layer is provider-agnostic through the OpenTelemetry standard. The **OpenInference** specification (from Arize) defines semantic conventions for AI spans, making traces portable across all observability platforms.

```python
# Provider-agnostic instrumentation — works with Phoenix, LangFuse, MLflow, or any OTEL backend
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Point to any OTEL-compatible backend
provider = TracerProvider()
provider.add_span_processor(BatchSpanProcessor(
    OTLPSpanExporter(endpoint="http://your-backend:4318/v1/traces")
))
trace.set_tracer_provider(provider)
```

### 4.2 OpenTelemetry Span Types

|**Span Type**|**What It Captures**|**Evaluation Dimension**|
|---|---|---|
|LLM|Model ID, prompt/completion tokens, latency, input messages, output text, estimated cost|Faithfulness, Helpfulness, Harmlessness, Correctness|
|Retriever|Query text, retrieved documents, relevance scores, document metadata|Context Precision, Context Recall, Context Relevance|
|Tool|Tool name, input parameters, output, execution time, error messages|ToolSelection, ToolParameter, ToolCallSequence|
|Chain|Sequence of steps, cumulative token count, total latency, intermediate outputs|Trajectory quality, Step efficiency ratio|
|Agent|Full session, all sub-spans, final response, goal metadata, user feedback|GoalSuccessRate, Conversation quality|
|Embedding|Input text, embedding vector, model ID, vector dimensions|Embedding drift detection — semantic shift monitoring|

### 4.3 Platform Comparison: Phoenix · LangFuse · MLflow · W&B

|**Capability**|**Arize Phoenix**|**LangFuse**|**MLflow (LLM)**|**W&B Prompts**|
|---|---|---|---|---|
|Self-hostable|Docker / K8s|Docker Compose|Full|Managed SaaS only|
|Open-source license|Apache 2.0|MIT|Apache 2.0|Proprietary|
|OTEL-native|Full|Partial (SDK)|Partial (SDK)|Partial (SDK)|
|LLM trace collection|Best|Excellent|Good|Good|
|Cost tracking|Per-trace|Per-trace|Limited|Per-run|
|Human annotation|Native queue|Native|No|No|
|Embedding drift|Native (best)|No|No|Partial|
|Experiment tracking|Native|Native|Best (ML lineage)|Best (sweep)|
|RAG-specific UI|Templates|Partial|No|No|
|Production eval|Online evals|Scores API|No|No|
|**Best for**|Drift detection + annotation|Lightweight trace+eval|Data science teams|Research + A/B sweeps|

**Recommended setup for new deployments:** LangFuse for development tracing (lightweight, easy Docker), Arize Phoenix for production observability and drift detection.

### 4.4 Drift Detection System

|**Drift Type**|**What Shifts**|**Detection Method**|**Alert Threshold**|
|---|---|---|---|
|Input embedding drift|User query distribution changes semantically|Cosine distance from 7-day baseline centroid, hourly|> 0.15 drift score|
|Output embedding drift|Response semantic distribution shifts|Euclidean distance in embedding space from rolling baseline|> 0.20 drift score|
|Performance drift|Evaluation scores decline gradually over days/weeks|EWMA control chart (λ=0.1); UCL/LCL at 3σ|UCL or LCL breach|
|Step-change drift|Sudden quality drop from model update or prompt change|CUSUM control chart (k=0.5σ, h=5σ)|CUSUM stat > threshold|
|Concept drift|Knowledge base becomes stale relative to real-world facts|Faithfulness decline + RAG context recall drop combined signal|Faithfulness < 0.75 sustained 3d|
|Data drift|Feature distribution of structured inputs shifts|KL divergence and PSI on input features|PSI > 0.20|

### 4.5 Dataset & Experiment Management

Store evaluation datasets in a versioned, auditable format regardless of cloud:

```python
import hashlib, json
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class EvalDataset:
    name: str
    version: str
    cases: list
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def fingerprint(self) -> str:
        content = json.dumps(self.cases, sort_keys=True)
        return hashlib.sha256(content.encode()).hexdigest()[:12]

    def save(self, storage_backend):  # inject: S3Client, BlobClient, GCSClient, or local fs
        key = f"eval-datasets/{self.name}/{self.version}/{self.fingerprint()}.jsonl"
        storage_backend.put(key, json.dumps(self.cases))
        return key
```

### 4.6 Human Annotation Queue

Human annotation is essential for:
1. Calibrating LLM judges against human preference (see Chapter 8)
2. Reviewing edge cases flagged by automated evals
3. Building ground truth for domain-specific rubrics
4. Compliance-mandated human oversight on high-risk decisions

**Tool options:** Arize Phoenix (annotation queue), Argilla (open-source, self-hosted), Label Studio (self-hosted), Scale AI (managed), Labelbox (managed).

**Minimum annotation SLA targets:** 4 hours for safety incidents; 48 hours for standard quality review.

---

## CHAPTER 5 — COMPLETE METRIC CATALOGUE

### 5.1 Response Quality Metrics

|**Metric**|**Primary Tool**|**Scale**|**Target**|**Alert**|
|---|---|---|---|---|
|Helpfulness|Cloud managed / DeepEval|0–1|>= 0.80|< 0.75|
|Correctness|DeepEval GEval / cloud managed|0–1|>= 0.82|< 0.70|
|Coherence|Cloud managed / DeepEval|0–1|>= 0.82|< 0.72|
|Completeness|Cloud managed|0–1|>= 0.80|< 0.70|
|Groundedness|Cloud managed / RAGAS|0–1|>= 0.85|< 0.75|
|Answer Relevancy|RAGAS|0–1|>= 0.82|< 0.72|
|Hallucination Rate|Phoenix / DeepEval|0–1|<= 0.10|> 0.20|
|Toxicity|DeepEval / Phoenix|0–1|<= 0.01|> 0.05|
|Bias Score|DeepEval / Custom|0–1|<= 0.05|> 0.10|
|Conciseness|DeepEval GEval|0–1|>= 0.75|< 0.60|

### 5.2 RAG Quality Metrics (RAGAS)

|**Metric**|**Method**|**Target**|**Alert**|**What It Catches**|
|---|---|---|---|---|
|Faithfulness|Claims_supported / Total_claims|>= 0.85|< 0.75|Hallucination — claims not in context|
|Context Precision|Relevant_chunks / Retrieved_chunks|>= 0.80|< 0.70|Retriever noise — irrelevant chunks|
|Context Recall|GT_in_context / GT_total|>= 0.80|< 0.70|Missing evidence — incomplete retrieval|
|Context Relevance|LLM-Judge scoring|>= 0.80|< 0.70|Off-topic retrieved chunks|
|Answer Relevancy|Cosine similarity: question vs answer|>= 0.82|< 0.72|Response misaligned with query intent|
|Response Groundedness|LLM-Judge per-claim check|>= 0.85|< 0.75|Claims lacking context support|
|Noise Sensitivity|Score(noisy) minus Score(clean)|<= 0.10|> 0.20|Fragile retrieval affected by noise|
|Agent Goal Accuracy|LLM-Judge: goal vs achieved outcome|>= 0.80|< 0.65|Agent fails to meet stated user goal|
|Topic Adherence|LLM-Judge: on-scope responses ratio|>= 0.90|< 0.80|Agent answers out-of-scope questions|

### 5.3 Agentic Behaviour Metrics

|**Metric**|**Primary Tool**|**Target**|**Alert**|**Description**|
|---|---|---|---|---|
|Tool Selection Accuracy|Cloud managed / DeepEval|>= 0.90|< 0.80|Correct tool chosen for each step|
|Tool Parameter Accuracy|Cloud managed / DeepEval|>= 0.88|< 0.78|Correct parameters extracted from query|
|Tool Call Sequence|Cloud managed / Trajectory eval|>= 0.90|< 0.80|Tools called in correct logical order|
|Task Success Rate|Custom / DeepEval DAG|>= 0.75|< 0.60|Binary: user goal achieved end-to-end|
|Planning Quality|DeepEval DAG metric|>= 0.80|< 0.65|Correct goal decomposition into steps|
|Step Efficiency|Custom: actual / min steps|>= 0.80|< 0.65|Not wasting unnecessary tool calls|
|Goal Success Rate|Cloud managed / Custom|>= 0.75|< 0.60|Session-level user goal achievement|
|Conversation Quality|RAGAS multi-turn|>= 0.80|< 0.68|Multi-turn coherence and memory use|

### 5.4 Operational & Infrastructure Metrics

|**Metric**|**Source**|**Target**|**Alert**|
|---|---|---|---|
|Agent Uptime|Monitoring platform|>= 99.5%|< 99.0%|
|Latency P50 (ms)|Monitoring platform|<= 1200|> 2000|
|Latency P95 (ms)|Monitoring platform|<= 2500|> 3500|
|Error Rate (%)|Monitoring platform|<= 0.5%|> 1.0%|
|MTTD (min)|Monitoring platform|<= 15|> 30|
|MTTR (hours)|Monitoring platform|<= 4|> 8|
|Token cost / session (USD)|Observability layer|<= 0.05|> 0.10|
|Tool failure rate (%)|Phoenix / LangFuse|<= 2%|> 5%|
|Eval coverage (%)|Eval service|>= 10%|< 5%|

### 5.5 Composite Metrics: G-Eval, MT-Bench, ELO Methods

**G-Eval (DeepEval):** Generates evaluation steps from a criteria description, scores each step 1–10, and aggregates. Outperforms fixed rubrics because the LLM judge breaks criteria into verifiable sub-questions.

```python
from deepeval.metrics import GEval
from deepeval.test_case import LLMTestCase, LLMTestCaseParams

helpfulness_metric = GEval(
    name="Helpfulness",
    criteria="Determine if the response genuinely helps the user achieve their stated goal.",
    evaluation_steps=[
        "Check if the response addresses the user's core need",
        "Verify the response provides actionable information",
        "Check if the response is appropriately detailed (not over/under-explaining)"
    ],
    evaluation_params=[LLMTestCaseParams.INPUT, LLMTestCaseParams.ACTUAL_OUTPUT],
    threshold=0.7
)
```

**MT-Bench methodology (multi-turn):** Two-turn evaluation where the agent first answers a question, then answers a follow-up that requires referencing the first answer. Scores on 10-point scale per turn across 80 questions in 8 categories (reasoning, coding, math, writing, roleplay, extraction, STEM, humanities).

**ELO / Bradley-Terry ranking:** Side-by-side blind evaluation between model versions. Human or LLM rater picks winner per pair. ELO score updates after each comparison: `E_a = 1 / (1 + 10^((R_b - R_a)/400))`. Minimum 200 comparisons per model pair for statistical reliability. Randomize response order to eliminate position bias.

**Cascading confidence thresholds:**
```python
def should_escalate_to_human(eval_scores: dict, risk_level: str) -> bool:
    thresholds = {
        "high_risk":   {"helpfulness": 0.85, "groundedness": 0.90, "harmlessness": 1.0},
        "medium_risk": {"helpfulness": 0.75, "groundedness": 0.80, "harmlessness": 0.99},
        "low_risk":    {"helpfulness": 0.70, "groundedness": 0.75, "harmlessness": 0.95},
    }
    t = thresholds[risk_level]
    return any(eval_scores.get(k, 0) < v for k, v in t.items())
```

### 5.6 Regulatory Compliance Metrics

|**Metric**|**Target**|**Zero Tolerance**|**Regulatory Basis**|
|---|---|---|---|
|AI Disclosure Rate|= 1.000|YES — any fail|EU AI Act Art.52 / FTC guidance|
|PII Leakage Rate|= 0.000|YES — any leak|GDPR Art.5 / CCPA / HIPAA|
|Audit Trail Coverage|= 1.000|YES for high-risk|EU AI Act Art.12 / SOC 2|
|Disparate Impact Ratio|>= 0.80|YES — block deploy|EU AI Act Art.10 / US ECOA|
|Demographic Parity Diff.|<= 0.05|YES — block deploy|EU AI Act Art.10|
|Adverse Action Quality|>= 0.95|No|GDPR Art.22 / FCRA|
|Harmlessness|= 1.00|YES — any fail|EU AI Act prohibited practices|

---

## CHAPTER 6 — BENCHMARK CREATION STANDARDS

### 6.1 Three-Tier Benchmark Architecture

|**Tier**|**Type**|**Examples**|**Purpose**|**Update Frequency**|
|---|---|---|---|---|
|Tier 1|Public benchmarks|MMLU, HumanEval, SWE-bench, GAIA, TruthfulQA, HellaSwag, FinanceBench, BrowserBench|Calibrate against industry baselines; compare model versions objectively|At every model upgrade|
|Tier 2|Domain benchmarks|FinanceBench, MedQA, LegalBench, custom domain bench from regulatory scenarios|Vertical-specific calibration; sector-appropriate quality standards|Quarterly|
|Tier 3|Custom / golden dataset|Curated from real production traffic (anonymised) + SME-annotated + adversarial red-team cases|Production truth — the definitive gate that blocks deployment|Monthly + on every incident|

### 6.2 Golden Dataset Construction Process

|**Step**|**Actions**|**Quality Gate**|
|---|---|---|
|**A: Seed Collection**|Real user queries from observability platform (anonymise PII first); SME-authored exemplar questions; synthetic cases from LLM generator; adversarial red-team cases; existing regression cases|Target 100–1000 examples per agent/domain; minimum 20% adversarial cases|
|**B: Ground Truth Annotation**|Expected answer per case; acceptable variant answers; quality rubric 1–5 scale; metadata: difficulty, domain, query type (RAG/tool/reasoning/safety)|Inter-annotator Cohen's Kappa >= 0.70 required; adjudicate disagreements via senior SME|
|**C: Stratified Split**|Train Eval 70% (prompt optimisation); Dev Eval 15% (model selection); Test/Golden 15% (final gate only, never used during development)|Stratify by domain, difficulty, query type; maintain proportional representation|
|**D: Version Control**|Versioned object storage (any provider); DVC for lineage; JSONL schema with full validation; immutable lock on golden split immediately|Test/Golden split locked in immutable storage — no post-hoc modification|

### 6.3 Benchmarking Methodology (Provider-Agnostic)

|**Axis**|**Method**|**Implementation**|
|---|---|---|
|Capability mapping|Map every test case to a specific capability: reasoning, coding, maths, world knowledge, safety, instruction following|Custom test taxonomy with `capability_tag` metadata field|
|Multi-axis scoring|Human eval 1–7 scale AND auto eval 0–1 AND safety eval pass/fail — all three required for high-risk decisions|Combine helpfulness evaluator + output evaluator + harmlessness evaluator|
|Red-team testing|Adversarial probing per safety category; jailbreak resistance; instruction hierarchy violations|Custom adversarial case set (minimum 50 cases per risk category)|
|ELO comparison|Side-by-side blind evaluation; diverse evaluator pool; model identity never revealed|Randomise response order to eliminate position bias|
|Regression suite|Every fixed failure becomes a permanent test — zero regression policy for all future deployments|CI/CD gate blocking merge on any regression|
|Statistical validation|Bootstrap confidence intervals; p < 0.05 for any claimed improvement; minimum 200 samples per capability axis|`scipy.stats` for significance tests; DeepEval statistical utilities|

### 6.4 Adversarial & Red-Team Sets (OWASP LLM Top 10)

Following NIST AI RMF and OWASP LLM Top 10 v2, adversarial test sets should cover:

|**Attack Category**|**Test Cases to Include**|**OWASP LLM ID**|
|---|---|---|
|Prompt injection|Direct and indirect injection attempts; system prompt leakage probes|LLM01|
|Insecure output handling|Unvalidated structured output; code execution via output|LLM02|
|Training data poisoning|Questions testing for memorized sensitive training data|LLM03|
|Model denial of service|Extremely long inputs; recursive tool calls; resource exhaustion|LLM04|
|Supply chain attacks|Tool/plugin dependency tampering simulation|LLM05|
|Sensitive data exposure|PII extraction attempts; indirect PII inference|LLM06|
|Insecure plugin design|Malformed tool call injection; parameter tampering|LLM07|
|Excessive agency|Unauthorized action escalation; scope creep tests|LLM08|
|Overreliance|Outdated fact tests; confidence calibration probes|LLM09|
|Misinformation|Hallucination on verifiable facts; citation fabrication|LLM10|

---

## CHAPTER 7 — DRIFT DETECTION & AUTOMATED RESPONSE

### 7.1 Alert Thresholds & Escalation Matrix

|**Metric**|**Warning**|**Critical**|**Auto-Action**|**Human Escalation**|
|---|---|---|---|---|
|Helpfulness score|< 0.75|< 0.60|Increase sampling to 50%; trigger on-demand eval|AI Risk team + on-call SRE|
|Tool Selection Accuracy|< 0.85|< 0.70|Trigger on-demand eval batch on recent traces|Platform engineering|
|Faithfulness (RAG)|< 0.80|< 0.65|Flag knowledge base for review; increase sampling|Knowledge management team|
|Task Success Rate|< 0.70|< 0.55|Enable Level 2 HITL for all sessions|Product team|
|Input embedding drift|> 0.10|> 0.20|Increase sampling; alert team; begin investigation|ML Engineering|
|Output embedding drift|> 0.15|> 0.25|Pause high-risk automated decisions|AI Ethics / Risk Committee|
|PII Leakage rate|> 0.001|> 0.01|EMERGENCY STOP — block all outputs|DPO + CISO + Legal|
|Latency P95 (ms)|> 3000|> 5000|Scale-out trigger; check downstream tools|Infrastructure / SRE|
|Error rate (%)|> 1%|> 5%|Traffic rerouting; prepare rollback|On-call SRE + CTO|

### 7.2 Automated Remediation Pipeline

A provider-agnostic event-driven remediation chain using a message bus:

```
Drift Monitor → Alert → Message Bus (SNS / Event Grid / Pub-Sub / Kafka)
    → Remediation Worker:
        1. Increase sampling rate (eval service API call)
        2. Trigger on-demand evaluation on last N failing traces
        3. Create incident ticket (Jira / Linear / ServiceNow)
        4. Notify on-call (PagerDuty / OpsGenie / VictorOps)
        5. Post summary to team channel (Slack / Teams / webhook)
        6. If regulatory threshold met → trigger compliance notification workflow
```

```python
async def handle_drift_alert(alert: DriftAlert, config: RemediationConfig) -> None:
    async with RemediationContext(alert) as ctx:
        await ctx.increase_sampling(target_rate=0.50)
        traces = await ctx.get_recent_failing_traces(hours=6, limit=200)
        await ctx.submit_eval_job(traces, evaluators=config.evaluators)
        await ctx.create_incident(
            title=f"Drift alert: {alert.metric} at {alert.value:.3f}",
            severity=alert.severity,
            runbook_url=config.runbook_url
        )
        await ctx.notify_oncall(alert)
        if alert.meets_regulatory_threshold:
            await ctx.trigger_compliance_workflow(alert)
```

---

## CHAPTER 8 — LLM-AS-JUDGE DESIGN PATTERNS & PITFALLS

### 8.1 Why LLM-as-Judge Works and When It Fails

LLM-as-Judge has become the dominant evaluation paradigm for generative AI because it correlates well with human judgments (Spearman ρ 0.80+ on most benchmarks) and scales infinitely. But it introduces systematic biases that, if unmitigated, corrupt your evaluation signal.

**When LLM-as-Judge works well:**
- Scoring coherence, helpfulness, tone, and structure
- Rubric-based quality assessment where criteria are well-defined
- Detecting obvious safety violations
- Comparative pairwise ranking (which of two responses is better)

**When LLM-as-Judge fails:**
- Precise factual accuracy (judge may hallucinate ground truth)
- Code correctness (requires execution, not natural language judgment)
- Mathematical calculations (LLMs are unreliable calculators)
- Detecting subtle logical fallacies or reasoning errors
- Evaluating very long outputs where judge's context attention dilutes

### 8.2 Seven Known Biases and Mitigations

|**Bias**|**Description**|**Mitigation**|**Test for It**|
|---|---|---|---|
|**Position bias**|First response in a pair wins more often regardless of quality|Randomize order; score A>B and B>A; count both|Swap identical responses — win rate should be ~50%|
|**Verbosity bias**|Longer responses rated higher even when less concise|Add explicit conciseness criterion to rubric; penalize unnecessary length|Compare short correct vs long padded response|
|**Self-enhancement bias**|Same-family model (e.g. GPT judge favoring GPT responses)|Use a different model family as judge; use ensemble|Compare scores when using same vs different judge family|
|**Sycophancy**|Judge agrees with evaluator's own prior statements|Fresh context per evaluation; no prior judge outputs in context|Check consistency across fresh vs accumulated context|
|**Authority bias**|Responses with confident, authoritative tone rated higher|Add rubric step: "Ignore confidence of tone; evaluate factual accuracy"|Compare confident-wrong vs uncertain-correct|
|**Format bias**|Bullet points, headers, markdown rated higher regardless of content|Normalize format before judging, or add "Ignore formatting" instruction|Compare same content in prose vs bullet form|
|**Recency bias**|Later content in long outputs weighted more heavily|Chunked evaluation for long outputs; aggregate per-chunk scores|Swap identical content at beginning vs end|

### 8.3 Judge Calibration Against Human Labels

Always calibrate your LLM judge against human labels before relying on it in production:

```python
from scipy.stats import spearmanr, pearsonr
import numpy as np

def calibrate_llm_judge(
    human_scores: list,   # float 0-1 from human annotators
    llm_scores: list,     # float 0-1 from LLM judge
    min_correlation: float = 0.75
) -> dict:
    spearman_corr, _ = spearmanr(human_scores, llm_scores)
    pearson_corr, _ = pearsonr(human_scores, llm_scores)
    mae = np.mean(np.abs(np.array(human_scores) - np.array(llm_scores)))

    return {
        "spearman_correlation": spearman_corr,
        "pearson_correlation": pearson_corr,
        "mean_absolute_error": mae,
        "calibration_passed": spearman_corr >= min_correlation,
        "recommendation": "APPROVED" if spearman_corr >= min_correlation
                          else f"REJECTED — correlation {spearman_corr:.3f} below threshold {min_correlation}"
    }
```

**Minimum calibration requirements:**
- Spearman correlation >= 0.75 vs human labels on 100+ calibration examples
- Mean absolute error < 0.15 on the 0–1 scale
- Re-calibrate whenever judge model is upgraded or rubric changes significantly

### 8.4 Ensemble and Panel Judging

For high-stakes evaluations, use multiple judge models and aggregate:

```python
async def panel_judge(
    response: str, context: str, rubric: str,
    judges: list  # list of (model_id, weight) tuples
) -> dict:
    scores = []
    for model_id, weight in judges:
        score = await evaluate_with_model(response, context, rubric, model_id)
        scores.append((score, weight))

    weighted_avg = sum(s * w for s, w in scores) / sum(w for _, w in scores)
    raw_scores = [s for s, _ in scores]
    std_dev = float(np.std(raw_scores))

    return {
        "weighted_score": weighted_avg,
        "individual_scores": raw_scores,
        "judge_agreement": 1.0 - (std_dev / 0.5),
        "requires_human_review": std_dev > 0.20  # flag high disagreement
    }

# Example panel using three different provider families
judges = [
    ("anthropic/claude-sonnet-4-6", 0.4),
    ("openai/gpt-4o", 0.3),
    ("google/gemini-1.5-pro", 0.3),
]
```

### 8.5 Rubric Engineering for Consistent Scoring

Well-engineered rubrics dramatically reduce judge variance:

```python
RUBRIC_TEMPLATE = """
You are an expert evaluator. Score the following response on {criterion}.

## Scoring Scale
{scoring_scale}

## Response to Evaluate
User Query: {query}
Agent Response: {response}
{context_block}

## Evaluation Steps
{evaluation_steps}

## Critical Failure Conditions (auto-score 0 regardless of other criteria)
{critical_failures}

## Output Format (strict JSON only — no prose outside JSON)
{{"score": <number>, "reasoning": "<1-3 sentences>",
  "critical_failure": <true|false>, "critical_failure_reason": "<if applicable>"}}
"""
```

**Rubric best practices:**
- Define exact numeric anchors (what does a 0.7 look like vs a 0.8?)
- Include 2–3 worked examples per score tier inside the rubric
- Specify critical failure conditions separately from graded criteria
- Request structured JSON output — prose output leads to parsing errors and score drift over time
- Keep total rubric prompt under 600 tokens to avoid attention dilution on long responses

---

## CHAPTER 9 — REGULATORY COMPLIANCE FRAMEWORK

### 9.1 Global Regulatory Landscape

|**Regulation**|**Jurisdiction**|**Key AI Obligations**|**Max Penalty**|**In Force**|
|---|---|---|---|---|
|EU AI Act (2024/1689)|European Union|High-risk conformity Art.10-15; human oversight; audit trail; EU AI database registration|EUR 35M or 7% global turnover|Aug 2024 (phased to 2027)|
|GDPR (2016/679)|EU / EEA|PII minimisation; right to explanation (Art.22); right to erasure; DPIA for high-risk AI|EUR 20M or 4% global turnover|May 2018|
|DORA (2022/2554)|EU Financial Sector|ICT risk management; incident reporting within 4h; annual resilience testing|EUR 5M per entity|January 2025|
|CCPA / CPRA|California, USA|Consumer rights to know, delete, opt-out of automated decisions|USD 7,500 per intentional violation|Active|
|NIST AI RMF 1.0|USA (voluntary)|Govern, Map, Measure, Manage lifecycle; red-teaming; documentation|Non-regulatory best practice|Active|
|AMLD6 (2018/1673)|EU|AML/CTF controls; KYC; SAR justification; demographic non-discrimination|Criminal liability + fines|Active|
|EBA Guidelines|EU Financial|Loan origination; model risk management; internal governance; PD/LGD for AI models|Supervisory action|Ongoing|

### 9.2 High-Risk AI Classification

Under the EU AI Act, AI systems affecting access to financial services, employment, education, or essential services are classified as high-risk (Annex III). High-risk systems require: technical documentation (Art.11), automatic logging (Art.12), transparency for users (Art.13), human oversight (Art.14), accuracy and robustness (Art.15), conformity assessment before deployment, and EU AI database registration.

**Cloud-agnostic compliance principle:** Compliance obligations attach to the AI system and its deployer — not to the cloud provider. AWS, Azure, and GCP can each be used for EU-compliant deployments provided data residency, processing location, and third-party DPA obligations are met.

|**Risk Level**|**Use Case Examples**|**Key Evaluation Gate**|
|---|---|---|
|HIGH-RISK (Annex III)|Credit scoring, insurance risk assessment, AML/KYC profiling, eligibility for essential services|SHAP/LIME explanation + exact trajectory + HITL review; fairness audit required|
|LIMITED-RISK (Art.52)|Customer service chatbots, AI-generated content|AI disclosure rate = 100%; harmlessness on every session|
|MINIMAL-RISK|Internal automation, document processing, reporting|Standard quality and safety metrics|
|PROHIBITED (since Feb 2025)|Social scoring, subliminal manipulation|BLOCK at system design; never deploy; audit legacy systems|

### 9.3 PII Detection — Three-Layer Architecture (Cloud-Agnostic)

|**Layer**|**Open-Source Tools**|**Cloud-Managed Tools**|**Action on Detection**|**Regulation**|
|---|---|---|---|---|
|**Layer 1: Pre-LLM input scrubbing**|Microsoft Presidio (open-source), spaCy NER|AWS Comprehend, Azure Text Analytics PII, GCP DLP|REDACT with `[REDACTED_TYPE]`; BLOCK if sensitive category|GDPR Art.5(1)(c) data minimisation|
|**Layer 2: Output guard**|Custom LLM-Judge evaluator with PII rubric; Presidio post-processing|AWS AgentCore PIILeakage, Azure Content Safety, GCP DLP streaming|BLOCK output; log incident; notify DPO; create breach assessment|GDPR Art.5 security; EU AI Act Art.10|
|**Layer 3: Storage anonymisation**|Presidio anonymizer, ARX tool|AWS Macie, Azure Purview, GCP DLP Data Catalog|Pseudonymise all customer IDs; enforce storage policies; use synthetic PII in golden datasets|GDPR Art.6 lawful basis; Art.44-46 data transfer|

### 9.4 Fairness & Bias Evaluation

|**Metric**|**Formula**|**Target**|**Regulatory Basis**|
|---|---|---|---|
|Disparate Impact Ratio (DIR)|P(approve\|minority) / P(approve\|majority)|>= 0.80|EU AI Act Art.10; US ECOA|
|Demographic Parity Difference|\|P(ŷ=1\|GroupA) − P(ŷ=1\|GroupB)\||<= 0.05|EU AI Act Art.10|
|Equal Opportunity Gap|\|TPR_GroupA − TPR_GroupB\||<= 0.05|EU AI Act Art.10; EBA fair lending|
|Counterfactual Fairness|Cosine distance between outputs for same query with only protected attribute changed|<= 0.15|EU AI Act Art.10; GDPR Art.22|
|Calibration across groups|P(y=1\|score=p, GroupA) ≈ P(y=1\|score=p, GroupB)|Calibration error <= 0.05|EBA credit model governance|

### 9.5 Audit Log Schema — Mandatory Fields

Every high-risk agent interaction must produce an immutable audit log:

|**Field**|**Type**|**Content**|**Regulatory Purpose**|
|---|---|---|---|
|log_id|UUID v4|Globally unique per interaction|Traceability|
|timestamp_utc|ISO-8601|Millisecond-precision UTC|Audit sequencing|
|session_id|Pseudonymised|Customer session ID — no raw PII|GDPR Art.5(1)(c)|
|agent_id + version|String|Agent identifier + semantic version tag|Version accountability|
|use_case_classification|Enum|HIGH_RISK / LIMITED / MINIMAL|EU AI Act Art.11|
|input (redacted)|String|Query with PII replaced by type tokens|GDPR Art.5 minimisation|
|pii_detected|Array|PII categories found + action taken|GDPR compliance evidence|
|reasoning_trace|Array|All LLM calls + tool calls with parameters|EU AI Act Art.12|
|evaluation_scores|Object|All metric scores for this interaction|Quality and compliance evidence|
|human_review|Object|Required flag + reviewer ID + decision|EU AI Act Art.14 oversight evidence|
|gdpr_basis|String|Lawful basis: contract / consent / legal obligation|GDPR Art.6|
|retention_end_date|ISO date|Creation date + 10 years for HIGH_RISK|EU AI Act Art.12|
|data_residency|Region identifier|Must be in jurisdiction-appropriate region|GDPR Art.44-46|

**Storage requirement:** Immutable, encrypted, tamper-evident. Cloud options: S3 Object Lock (Compliance mode), Azure Immutable Blob Storage, GCP Object Hold. Self-hosted: WORM-capable storage or append-only distributed log.

### 9.6 Human Oversight Architecture

Three-tier HITL model for high-risk decisions:

|**Level**|**Trigger**|**Reviewer**|**SLA**|
|---|---|---|---|
|Level 1 (audit)|Random sampling; low-confidence predictions|Junior analyst|48 hours|
|Level 2 (review)|Eval score below threshold; anomaly detection flag|Senior analyst|4 hours|
|Level 3 (mandatory hold)|High-risk categories; novel edge cases; safety flags|Domain expert + legal|1 hour — BLOCKS output|

---

## CHAPTER 10 — COMPLETE LIFECYCLE (IDEATION TO RETIREMENT)

### Phase 1: Ideation & Requirements

- [ ] Define agent purpose, user personas, scope, and measurable success criteria
- [ ] Classify use case: HIGH_RISK / LIMITED / MINIMAL under applicable regulations (mandatory first step)
- [ ] Map to evaluation planes: which of Response / RAG / Agentic metrics apply?
- [ ] Select evaluation frameworks and cloud provider or self-hosted stack
- [ ] Define acceptance thresholds per metric — document formally in AI Governance Policy
- [ ] Choose judge model: primary (high-capability) + secondary for ensemble judging
- [ ] Complete DPIA if HIGH_RISK — obtain DPO sign-off before any customer data processing
- [ ] Register planned AI system with AI Risk function; begin technical documentation

### Phase 2: Benchmark & Dataset Construction

- [ ] Generate 50–100 seed test cases using LLM generator with agent context description
- [ ] SME review: remove duplicates, adjust difficulty distribution (20% hard minimum)
- [ ] Red-team sessions: generate adversarial, edge case, jailbreak, and safety test cases (OWASP LLM Top 10)
- [ ] Human annotation: ground truth + rubrics targeting inter-annotator kappa >= 0.70
- [ ] Create counterfactual fairness suite: 50 attribute-swap pairs per protected characteristic
- [ ] Create PII leakage test suite: 100 cases with realistic synthetic PII in inputs and context
- [ ] Version-control in immutable storage + observability platform datasets + DVC
- [ ] Lock golden split immediately — never use for training or prompt iteration

### Phase 3: Build & Instrument

- [ ] Implement agent with tools, system prompt, and OTEL instrumentation (OpenInference spans)
- [ ] Register OTEL spans to chosen observability backend (Phoenix, LangFuse, or cloud-native)
- [ ] Configure online evaluation: start at 10% sampling with initial evaluator set
- [ ] Implement PII Layer 1 guard (Presidio or cloud PII service) as pre-processor before every LLM call
- [ ] Build custom evaluators for domain-specific rubrics; calibrate against human labels
- [ ] Configure policy enforcement (budget caps, tool access, session isolation)
- [ ] Set up HITL workflow: annotation queue + ticket tracker + reviewer SLAs
- [ ] Configure development trace collection with per-session cost tracking

### Phase 4: Pre-Deployment Evaluation Gate (CI/CD)

- [ ] **Gate 1 — Prohibited practices:** automated scan; HARD BLOCK on any positive finding
- [ ] **Gate 2 — PII safety:** 100 synthetic PII cases; zero tolerance; HARD BLOCK on any leak
- [ ] **Gate 3 — Fairness:** 50 counterfactual pairs; DIR >= 0.80; sentiment delta <= 0.05
- [ ] **Gate 4 — Quality:** full 200–500 case benchmark; all quality thresholds must pass simultaneously
- [ ] **Gate 5 — Trajectory compliance:** required tool sequences verified with exact match scoring
- [ ] **Gate 6 — Explainability:** 100% explanation coverage for all HIGH_RISK decision outputs
- [ ] **Gate 7 — Audit trail:** 100% of test interactions produce valid log entries with all fields
- [ ] **Gate 8 — Safety:** harmlessness + refusal quality on full adversarial test set
- [ ] Gate failure blocks merge automatically; require independent review before any exception

### Phase 5: Deploy with Online Monitoring

- [ ] Enable online evaluation at 10% sampling across all configured evaluators
- [ ] Activate drift monitors: input embedding, output embedding, metric EWMA, feature drift
- [ ] HITL routing active: all HIGH_RISK decisions routed to Level 2 review queue
- [ ] Enable 100% sampling for harmlessness and PII evaluators — never reduce sampling on safety checks
- [ ] Monitoring alarms active: quality thresholds, latency P95, error rate, cost per session
- [ ] Daily automated compliance report to AI Risk function, DPO, and CISO

### Phase 6: Continuous Improvement Loop

- [ ] Weekly: pull failing traces from observability platform; cluster heatmap; identify top-5 failure patterns
- [ ] Weekly: review HITL decisions — learn from human reviewer modifications and rejections
- [ ] Monthly: full benchmark regression suite to detect gradual quality decay
- [ ] Monthly: fairness audit — compute DIR and demographic parity across all protected attributes
- [ ] Monthly: auto-generate compliance report (PII events, fairness metrics, HITL stats, drift events)
- [ ] Curate failure cases into golden dataset — augment with newly discovered edge cases
- [ ] Prompt iteration → evaluation experiment → comparison vs production baseline

### Phase 7: Drift Detection & Incident Response

- [ ] Drift detected → alert → message bus → remediation worker (see Chapter 7)
- [ ] Triage (0–15 min): scope check; deployment correlation; time-of-day pattern analysis
- [ ] Diagnose (15–60 min): cluster analysis; failure mode classification (data/concept/model/performance)
- [ ] If regulatory threshold met → trigger compliance notification workflow within required window
- [ ] Remediate: rollback OR prompt fix OR tool API fix OR knowledge base update → re-evaluate
- [ ] Validate: re-run full benchmark; confirm all metrics above thresholds; re-enable full traffic
- [ ] Post-mortem: document root cause; update runbook; add failure case to regression suite

### Phase 8: Model Upgrade Evaluation

- [ ] Run full benchmark on new model using offline task function on same golden dataset
- [ ] Statistical significance: n >= 200 samples, p < 0.05 for any claimed improvement
- [ ] Zero regression policy: all existing passing cases must continue to pass
- [ ] Compliance re-check: fairness suite + PII suite + trajectory compliance on new model
- [ ] Cost and latency analysis: new model within +20% cost and +10% P95 latency of current baseline
- [ ] Canary deployment: 5% traffic to new model; monitor for 48 hours before proceeding
- [ ] Progressive rollout: 5% → 25% → 50% → 100% with full evaluation gate at each stage
- [ ] Update benchmark baseline; update technical documentation

### Phase 9: Retirement & Archival

- [ ] Sunset criteria: metric floor breached persistently (3 consecutive monthly reviews) OR successor validated
- [ ] Retirement decision: AI Governance Committee approval required; Board for HIGH_RISK
- [ ] Archive all traces in immutable storage; retain minimum 10 years for HIGH_RISK (EU AI Act Art.12)
- [ ] Archive: all evaluation reports, benchmark results, DPIA, conformity assessment, incident log
- [ ] Generate final performance audit report: lifecycle evaluation trend, incident history, drift events
- [ ] Baseline comparison document: how successor compares across every metric dimension
- [ ] De-register from regulatory databases (if applicable); notify DPO and relevant supervisors
- [ ] GDPR / CCPA erasure: delete all non-archived personal data; document deletion as evidence
- [ ] Knowledge transfer: share lessons learned with teams building successor systems

---

## CHAPTER 11 — MULTI-CLOUD DEPLOYMENT PATTERNS

### 11.1 Cloud-Provider Tool Mapping

|**Evaluation Layer**|**AWS**|**Azure**|**Google Cloud**|**Self-Hosted**|
|---|---|---|---|---|
|**Managed eval service**|Bedrock AgentCore Evaluations|Azure AI Evaluation (Foundry)|Vertex AI Evaluation Service|Confident AI (DeepEval cloud)|
|**Observability backend**|X-Ray + CloudWatch|Azure Monitor + App Insights|Cloud Trace + Cloud Monitoring|Arize Phoenix / LangFuse|
|**PII detection (input)**|Comprehend Detect PII|Azure Text Analytics PII|Cloud DLP|Presidio (open-source)|
|**PII detection (storage)**|Macie|Microsoft Purview|Cloud DLP Data Catalog|ARX / custom|
|**Trace storage**|S3 + Athena|Blob Storage + Synapse|GCS + BigQuery|PostgreSQL / ClickHouse|
|**Annotation queue**|SageMaker Ground Truth|Azure ML Data Labeling|Vertex AI Data Labeling|Arize Phoenix / Argilla|
|**Experiment tracking**|SageMaker Experiments|Azure ML Experiments|Vertex AI Experiments|MLflow / W&B|
|**Immutable audit storage**|S3 Object Lock (Compliance)|Azure Immutable Blob Storage|GCS Object Hold|WORM storage / append-only log|
|**Monitoring alerts**|CloudWatch Alarms + SNS|Azure Monitor Alerts + Event Grid|Cloud Monitoring Alerts + Pub/Sub|Prometheus + Alertmanager|

### 11.2 Self-Hosted Reference Architecture

For organizations with strict data residency, air-gapped environments, or multi-cloud requirements:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SELF-HOSTED EVALUATION STACK                      │
│                                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐ │
│  │   Agent     │───>│  LiteLLM    │───>│  OTEL Collector         │ │
│  │   Runtime   │    │  (Gateway)  │    │  (Prometheus export)    │ │
│  └─────────────┘    └─────────────┘    └────────────┬────────────┘ │
│                                                      │              │
│                                          ┌───────────▼────────────┐ │
│                                          │     Arize Phoenix      │ │
│                                          │  Traces | Eval | Annot.│ │
│                                          └────────────────────────┘ │
│                                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐ │
│  │  Presidio   │    │  MLflow     │    │  Prometheus +           │ │
│  │  PII Guard  │    │  Experiments│    │  Alertmanager           │ │
│  └─────────────┘    └─────────────┘    └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

**Minimal Docker Compose deployment:**
```yaml
services:
  phoenix:
    image: arizephoenix/phoenix:latest
    ports: ["6006:6006"]
    volumes: ["phoenix_data:/data"]

  langfuse:
    image: langfuse/langfuse:latest
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://langfuse:password@postgres:5432/langfuse

  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    volumes: ["./otel-config.yaml:/etc/otel-config.yaml"]
    command: ["--config=/etc/otel-config.yaml"]
    ports: ["4318:4318"]
```

### 11.3 Hybrid Cloud Evaluation Topology

When agent runtime is on one cloud but evaluation infrastructure is on another or self-hosted:

```python
class HybridEvalClient:
    def __init__(self, eval_backend_url: str, judge_model_config: dict):
        self.backend_url = eval_backend_url       # any OTEL-compatible endpoint
        self.judge_config = judge_model_config     # any LLM provider config

    async def evaluate_trace(self, trace_id: str, evaluators: list) -> dict:
        trace = await self.fetch_trace(trace_id)  # from any trace store
        scores = {}
        for evaluator in evaluators:
            scores[evaluator.name] = await evaluator.score(
                trace=trace,
                judge_client=self._get_judge_client()
            )
        await self.publish_scores(trace_id, scores)
        return scores

    def _get_judge_client(self):
        provider = self.judge_config["provider"]
        if provider == "anthropic": return AnthropicClient(**self.judge_config)
        if provider == "openai": return OpenAIClient(**self.judge_config)
        if provider == "azure": return AzureOpenAIClient(**self.judge_config)
        if provider == "local": return OllamaClient(**self.judge_config)
        raise ValueError(f"Unknown provider: {provider}")
```

---

## CHAPTER 12 — INTEGRATION STACK & QUICK REFERENCE

### 12.1 Full Tool Comparison Matrix

|**Capability**|**DeepEval**|**RAGAS**|**Arize Phoenix**|**LangFuse**|**Strands Evals**|**W&B Prompts**|
|---|---|---|---|---|---|---|
|Online (production) eval|Via API|No|Native|Scores API|No|Via W&B|
|On-demand / CI/CD eval|Pytest native|Via API|Experiments|Datasets|Native|Via API|
|RAG quality metrics|Full|Best|Templates|Partial|Custom|Partial|
|Agentic / tool metrics|DAG metric|Agent Goal|Custom|Traces|4 built-in|Partial|
|Multi-turn simulation|ConversationalTestCase|Partial|Annotation|Sessions|ActorSimulator|No|
|Drift detection|No|No|Native (best)|No|No|Partial|
|Human annotation|Confident AI|No|Native queue|Native|No|No|
|Data sovereignty / self-host|Full|Full|Docker/K8s|Docker Compose|AWS EU|Self-host option|
|Framework agnostic|Yes|Yes|Yes|Yes|AWS Strands native|Partial|
|Open source|Yes (BSL)|Yes (Apache 2.0)|Yes (Apache 2.0)|Yes (MIT)|Yes (Apache 2.0)|No|
|LLM-as-Judge bias mitigations|G-Eval steps|Partial|Panel support|Partial|Partial|No|

### 12.2 Complete Metric Threshold Reference Card

|**Metric**|**Target**|**Warning**|**Critical**|**Zero Tolerance**|**Regulation**|
|---|---|---|---|---|---|
|Helpfulness|>= 0.80|< 0.75|< 0.60|No|EBA consumer outcomes|
|Correctness|>= 0.82|< 0.70|< 0.55|No|EU AI Act Art.15|
|Groundedness / Faithfulness|>= 0.85|< 0.75|< 0.65|No|GDPR Art.5 accuracy|
|Tool Selection Accuracy|>= 0.90|< 0.85|< 0.70|No|EU AI Act Art.15|
|Tool Parameter Accuracy|>= 0.88|< 0.80|< 0.68|No|EU AI Act Art.15|
|Task / Goal Success Rate|>= 0.75|< 0.70|< 0.55|No|EBA consumer outcomes|
|Harmlessness|= 1.00|< 0.99|< 0.95|YES — any fail|EU AI Act prohibited|
|PII Leakage Rate|= 0.000|any > 0|any > 0|YES — any leak = block|GDPR Art.5 and Art.25|
|AI Disclosure Rate|= 1.000|< 1.000|< 1.000|YES|EU AI Act Art.52|
|Audit Trail Coverage|= 1.000|< 1.000|< 0.990|YES for high-risk|EU AI Act Art.12|
|Disparate Impact Ratio|>= 0.80|< 0.85|< 0.80|YES — block deploy|EU AI Act Art.10|
|Demographic Parity Diff.|<= 0.05|> 0.04|> 0.05|YES — block deploy|EU AI Act Art.10|
|Input Embedding Drift|<= 0.08|> 0.10|> 0.20|No|EU AI Act Art.9|
|Agent Uptime|>= 99.5%|< 99.5%|< 99.0%|No|DORA ICT availability|
|MTTD|<= 15 min|> 20 min|> 30 min|No|DORA incident management|
|MTTR|<= 4 hours|> 4 hours|> 8 hours|No|DORA incident management|
|Latency P95 (ms)|<= 2500|> 3000|> 5000|No|DORA resilience|
|Error Rate (%)|<= 0.5%|> 1.0%|> 5.0%|No|DORA incident classification|

### 12.3 Framework Selection Decision Tree

```
Start: What is your primary evaluation need?
│
├─ CI/CD quality gate?
│   ├─ Using Strands Agents on AWS? → Strands Evals
│   ├─ pytest-native preferred? → DeepEval
│   └─ Multi-provider / cloud-agnostic? → DeepEval + RAGAS
│
├─ RAG pipeline quality?
│   └─ → RAGAS (best RAG) + TruLens (transparency triads)
│
├─ Production observability + drift?
│   ├─ Self-hosted required? → Arize Phoenix
│   └─ Lightweight setup? → LangFuse
│
├─ Managed service preferred?
│   ├─ AWS stack? → AgentCore Evaluations
│   ├─ Azure stack? → Azure AI Evaluation
│   └─ GCP stack? → Vertex AI Evaluation
│
├─ LLM-as-Judge calibration?
│   └─ → DeepEval G-Eval + human label calibration (Chapter 8)
│
└─ Multi-turn + human annotation?
    └─ → Arize Phoenix annotation queue + DeepEval ConversationalTestCase
```

### 12.4 Escalation Playbooks

|**Alert Scenario**|**Immediate Action (0–15 min)**|**Investigation (15–60 min)**|**Escalation Path**|
|---|---|---|---|
|PII leakage detected in output|BLOCK all outputs; emergency stop agent; DPO notification within 1h|Identify affected sessions; scope of leak; assess regulatory notification threshold|DPO + CISO + Legal; potential GDPR/CCPA breach notification within required window|
|Quality score collapse (>20% drop)|Increase sampling to 50%; check deployment log for any recent changes in past 24h|Observability cluster analysis; failure mode: data drift vs model change vs tool API issue|AI Risk team + on-call SRE; rollback if correlated with recent deployment|
|Fairness / DIR breach below 0.80|Pause all HIGH_RISK automated decisions; route 100% to Level 3 HITL|Compute DIR across all demographic groups; identify affected group and magnitude|AI Ethics Committee + Legal; potential regulator notification|
|Safety / harmlessness failure|BLOCK agent output; emergency review of all recent interactions|Identify prompt pattern; check if jailbreak or model degradation|Security + AI Risk; incident playbook; Red Team investigation|
|Embedding drift score > 0.20|Auto-increase sampling; trigger on-demand eval batch on traces from past 6h|Determine if input query distribution or model output has semantically shifted|ML Engineering; prompt or model update cycle; MRM review for HIGH_RISK models|
|Significant ICT incident (DORA threshold)|Incident ticket; war-room assembled; begin 'significant' classification assessment|Containment actions; RCA commenced; business continuity plan activated if needed|CIO + CISO; if 'significant': mandatory regulator notification within 4h of classification|

---

## Document Information

|**Attribute**|**Value**|
|---|---|
|**Document Title**|Complete AI Agent Evaluation Framework — Cloud-Agnostic Edition v2.1|
|**Framework Stack**|DeepEval + RAGAS + Arize Phoenix + LangFuse (open-source); AWS AgentCore / Azure AI Eval / GCP Vertex AI Eval (managed options)|
|**Regulatory Coverage**|EU AI Act (2024/1689) + GDPR (2016/679) + DORA (2022/2554) + AMLD6 + NIST AI RMF 1.0 + CCPA|
|**Source Material**|AWS ML Blog: Strands Evals (Mar 2026); Azure AI Evaluation SDK docs; Vertex AI Evaluation docs; EDPB LLM Privacy Risk report (Apr 2025); NIST AI RMF 1.0; OWASP LLM Top 10 v2|
|**Chapters**|12 chapters: architecture, SDK reference, managed services, observability, metrics, benchmarks, drift, LLM-as-Judge, compliance, lifecycle, multi-cloud, quick reference|
|**Metrics Defined**|45+ metrics across 5 planes: response quality, RAG quality, agentic behaviour, operational, compliance|
|**Lifecycle Phases**|9 phases: Ideation, Benchmark, Build, Pre-Deploy Gate, Deploy, Improve, Drift Response, Model Upgrade, Retirement|
|**Cloud Providers Covered**|AWS, Azure, Google Cloud — with self-hosted alternatives at every layer|
|**Owner**|AI Platform Engineering Team|
|**Review Cycle**|Quarterly — or immediately upon any regulatory update or significant incident|
|**Last Updated**|July 2026|

*Sources: DeepEval documentation; RAGAS framework documentation; Arize Phoenix documentation; LangFuse documentation; AWS Bedrock AgentCore documentation; Azure AI Evaluation SDK documentation; Vertex AI Evaluation Service documentation; NIST AI RMF 1.0 (January 2023); OWASP LLM Top 10 v2; EU AI Act text (Regulation 2024/1689); GDPR (Regulation 2016/679); DORA (Regulation 2022/2554); EDPB LLM Privacy Risk report (April 2025); Zheng et al. "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena" (NeurIPS 2023); Wang et al. "Large Language Models are not Fair Evaluators" (ACL 2024); Shankar et al. "Who Validates the Validators?" (arXiv 2024).*
