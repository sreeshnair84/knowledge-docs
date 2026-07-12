---
title: "Complete AI Agent Evaluation Framework Guide"
date_created:
last_reviewed:
status: current
supersedes: ""
source_type: converted-pdf
source_file: "AI_Agent_Evaluation_Framework_Guide.md.pdf"
tags: []
---

# Complete AI Agent Evaluation Framework Guide
## · · AWS Bedrock AgentCore Strands Arize Phoenix

### From Ideation → Build → Evaluate → Monitor → Retire

- — Purpose: A production grade evaluation framework spanning the full agent lifecycle benchmark creation, metric selection, drift detection, automated pipelines, and continuous monitoring — integrated natively with AWS Bedrock AgentCore, Strands Agents, and Arize Phoenix.

## TABLE OF CONTENTS

1. <u>Architecture Overview</u>

2. <u>Framework Stack Deep Dive</u>

-

- 3. <u>Full Lifecycle Ideation to Retirement</u>

4. <u>Evaluation Taxonomy & Metric Catalogue</u>

5. <u>Benchmark Creation Standards</u>

6. <u>Drift Detection System</u>

7. <u>Automated Evaluation Pipeline</u>

8. <u>Production Monitoring Architecture</u>

9. <u>LLM-as-a-Judge Design Patterns</u>

10. <u>Integration Reference</u>

11. <u>Runbooks & Playbooks</u>

## 1. ARCHITECTURE OVERVIEW

![Figure 1](/img/ai-development/ai-dev-p2-1.png)

### Core Platform Interaction Map

![Figure 2](/img/ai-development/ai-dev-p2-2.png)

## 2. FRAMEWORK STACK DEEP DIVE

### 2.1 AWS Bedrock AgentCore Evaluation Engine

AgentCore Evaluations is a fully managed continuous assessment service with two modes:

![Figure 3](/img/ai-development/ai-dev-p4-3.png)

### 2.2 Strands Agents Instrumented Agent Framework

![Figure 4](/img/ai-development/ai-dev-p4-4.png)

![Figure 5](/img/ai-development/ai-dev-p5-5.png)

### 2.3 Arize Phoenix Observability & Evaluation Layer

![Figure 6](/img/ai-development/ai-dev-p5-6.png)

## 3. FULL LIFECYCLE

- ║  PHASE 4: PRE DEPLOYMENT EVALUATION (On-Demand) ║ ────────────────────────────────────────────── ║ ║ ║ □ Run full benchmark suite against golden dataset ║ ║ □ Check all metrics vs. acceptance thresholds ║ ║ □ A/B test prompt variants ║ ║ □ Adversarial stress testing                                        ║ ║ □ Gate: PASS all thresholds → proceed                               ║ ║ ║ ║  PHASE 5: DEPLOYMENT WITH ONLINE EVAL                               ║ ──────────────────────────────────── ║ ║ ║ □ Enable AgentCore Online Evaluations (10% sampling start) ║ ║ □ Arize Phoenix real-time drift monitors active                     ║ ║ □ CloudWatch alarms on evaluation score drops ║ ║ □ Human-in-loop annotation queue running in parallel                ║ ║ ║ ║  PHASE 6: CONTINUOUS MONITORING                                      ║ ────────────────────────────── ║ ║ ║ □ Daily evaluation score aggregation ║ ║ □ Weekly drift analysis (embedding + response) ║ ║ □ Monthly benchmark regression suite                                ║ ║ □ Anomaly detection alerts → auto-trigger on-demand eval            ║ ║ ║ ║  PHASE 7: IMPROVEMENT LOOP                                           ║ ───────────────────────── ║ ║ ║ □ Diagnose failure clusters (Phoenix heatmaps) ║ ║ □ Curate failure cases → augment training/eval dataset ║ ║ □ Prompt engineering / model upgrade                                ║ ║ □ Re-run benchmark gate before re-deployment ║ ║ ║ ║  PHASE 8: RETIREMENT                                                 ║ ──────────────────── ║ ║ ║ □ Sunset criteria met (metric floor breached persistently) ║ ║ □ Archive all traces, datasets, eval scores ║ ║ □ Generate final performance audit report ║ ║ □ Handoff to replacement agent with baseline comparison ║ ╚═══════════════════════════════════════════════════════════════════════╝

## 4. EVALUATION TAXONOMY & METRIC CATALOGUE

### 4.1 The Three Planes of Evaluation

![Figure 7](/img/ai-development/ai-dev-p8-7.png)

### 4.2 Complete Metric Catalogue

### PLANE 1 RESPONSE QUALITY METRICS

|Metric|Framework|Type|Range|Description|
|---|---|---|---|---|
|Helpfulness|AgentCore Built-in|LLM-Judge|0–1|Does theresponse deliver user<br>value?|
|Correctness|AgentCore/<br>DeepEval|LLM-Judge|0–1|Factual accuracy vs.groundtruth|
|Coherence|AgentCore/<br>Phoenix|LLM-Judge|0–1|Logicalfowandreadability|
|Completeness|AgentCore/<br>DeepEval|LLM-Judge|0–1|Doesitaddressall aspects ofthe<br>query?|
|Conciseness|DeepEval GEval|LLM-Judge|0–1|Avoids unnecessary verbosity|
|Toxicity|DeepEval/Phoenix|Code/LLM|0–1|Harmful,abusive, or ofensive<br>content|
|Bias|DeepEval|LLM-Judge|0–1|Unfair treatment of demographic<br>groups|
|Hallucination<br>Rate|Phoenix /DeepEval|LLM-Judge|0–1|Fabricated facts (lowerisbetter)|
|Answer<br>Relevancy|RAGAS|Embedding|0–1|How relevantis the answer to the<br>question?|
|Summarization|DeepEval|LLM-Judge|0–1|Quality of content summarization|

### PLANE 2 RAG QUALITY METRICS

|Metric|Framework|Formula|Description|
|---|---|---|---|
|Faithfulness|RAGAS|Claims_supported/<br>Total_claims|Everyanswerclaim<br>grounded in context|
|ContextPrecision|RAGAS|Relevant_chunks /<br>Retrieved_chunks|Signal-to-noiseofretriever|
|ContextRecall|RAGAS|Relevant_GT_in_context /<br>GT_items|Howmuch groundtruth is<br>retrieved|
|ContextRelevance|RAGAS/<br>Phoenix|LLM-Judge|Retrieved chunksaddress<br>thequery|
|AnswerRelevancy|RAGAS|Cosine(Q,A)|Semantic alignment of<br>answer to question|
|Response<br>Groundedness|RAGAS<br>(NVIDIA)|LLM-Judge|Each claim directly<br>supported bycontext|
|ContextEntity<br>Recall|RAGAS|Entity overlap|Named entitiesfrom GT<br>appearin context|
|Noise Sensitivity|RAGAS|Score delta(noisy vsclean)|Robustness toirrelevant<br>retrieved chunks|

### PLANE 3 AGENTIC BEHAVIOR METRICS

|Metric|Framework|Type|Description|
|---|---|---|---|
|Tool Selection<br>Accuracy|AgentCore Built-in|LLM-Judge|Correct tool chosen for thetask|
|Tool Parameter<br>Accuracy|AgentCore Built-in|LLM-Judge|Correct parametersextracted from<br>query|
|Tool Call Sequence|AgentCore Built-in|LLM-Judge|Correct orderingoftool invocations|
|Goal Attainment|AgentCore/RAGAS|LLM-Judge|End-to-endtask completion|
|Task SuccessRate|Custom/DeepEval<br>DAG|Binary|Binary pass/fail for task completion|
|Planning Quality|DeepEval DAG|Decision<br>Tree|Goal decomposition correctness|
|StepEfciency|Custom|Ratio|Actualsteps /Minimumrequired<br>steps|
|AgentGoal Accuracy|RAGAS|LLM-Judge|Reference-based goal achievement|
|Topic Adherence|RAGAS|LLM-Judge|Agent stays within defnedscope|
|Conversation Quality|RAGAS|LLM-Judge|Multi-turn coherence and memory<br>use|

### OPERATIONAL / INFRASTRUCTURE METRICS

|Metric|Source|Description|
|---|---|---|
|LatencyP50/P95/P99|CloudWatch/Phoenix|Responsetime distribution|
|Token Usage|AgentCore/CloudWatch|Input + output token counts|
|Cost perSession|CloudWatch|Compute+model inference cost|
|ErrorRate|CloudWatch|4xx/5xx responsepercentage|
|Session Duration|AgentCore|Average lengthof agent sessions|
|Tool Call Failure Rate|Phoenix|% oftool invocations thatfail|
|ContextWindowSaturation|Custom|Howfullthe context windowis|
|RetryRate|Custom|% of calls requiringretries|

### 4.3 Metric Selection Decision Tree

|Does youragent useretrieval?<br>/ \<br>YES           NO<br>│ │<br>┌───────▼───────┐ ┌▼──────────────┐<br>│ADD RAG METRICS│ │SKIP RAG PLANE│<br>│RAGASsuite│ └───────────────┘<br>└───────`┬`───────┘<br>│<br>Does the agentcalltools?<br>/ \<br>YES           NO<br>│ │<br>┌───────▼──────────┐ │<br>│ADD TOOL METRICS│ │<br>│AgentCore built-in│ │<br>└───────`┬`──────────┘ │<br>└──────`┬`───────┘<br>│<br>Is multi-stepgoal completion required?<br>/ \<br>YES         NO|
|---|

## 5. BENCHMARK CREATION STANDARDS

### 5.1 Benchmark Architecture

![Figure 8](/img/ai-development/ai-dev-p13-8.png)

5.2 Golden Dataset Creation Process

![Figure 9](/img/ai-development/ai-dev-p14-9.png)

![Figure 10](/img/ai-development/ai-dev-p15-10.png)

### 5.3 How Claude (Anthropic) Benchmarks Are Created Standard

Claude's benchmarks follow this structure that you should mirror:

ANTHROPIC BENCHMARKING STANDARDS (replicated pattern) ────────────────────────────────────────────────────── 1. CAPABILITY MAPPING Map to specific capabilities: reasoning, coding, math, world knowledge, safety, instruction following

-

- 2. MULTI AXIS SCORING Human eval (1–7 scale) × Auto eval (0–1) × Safety eval (pass/fail)

- 3. RED TEAM TESTING - Adversarial probing for each safety category - Jailbreak resistance - Instruction hierarchy violations

- - Constitutional AI alignment checks

- 4. HUMAN PREFERENCE EVALUATION - Side-by-side comparison (ELO rating system) - Diverse evaluator pool

- - Blind evaluation (no model identity)

- 5. REGRESSION SUITE - Curated set of historically failed cases - Ensures no performance regression on regressions

- - Run on every model update / prompt change

- 6. STATISTICAL VALIDATION - Bootstrap confidence intervals

- - p < 0.05 significance threshold for regressions - Minimum 200 samples per capability axis

## 6. DRIFT DETECTION SYSTEM

### 6.1 Drift Taxonomy

![Figure 11](/img/ai-development/ai-dev-p17-11.png)

### 6.2 Drift Detection Pipeline

![Figure 12](/img/ai-development/ai-dev-p17-12.png)

### 6.3 Drift Alert Thresholds

![Figure 13](/img/ai-development/ai-dev-p19-13.png)

## 7. AUTOMATED EVALUATION PIPELINE

### 7.1 CI/CD Evaluation Gate

![Figure 14](/img/ai-development/ai-dev-p19-14.png)

### 7.2 Online Evaluation Automation

python

# AUTOMATION ARCHITECTURE (pseudocode)

── ────────────────── # STEP 1: Configure Online Evaluation in AgentCore online_eval_config = { "agent_id": "my-strands-agent", "sampling_rate": 0.10, # 10% of traffic "evaluators": [ "arn:aws:bedrock-agentcore:::evaluator/Builtin.Helpfulness", "arn:aws:bedrock-agentcore:::evaluator/Builtin.ToolSelectionAccuracy", "arn:aws:bedrock-agentcore:::evaluator/Builtin.Groundedness", "arn:aws:bedrock-agentcore:{region}:{account}:evaluator/custom-domain-eval" ], "filters": { "exclude_test_sessions": True, "min_session_length": 1 }, "output": "cloudwatch" # Scores → CloudWatch }

── ────────────────────────────────────── # STEP 2: Phoenix Drift Monitors drift_monitors = [ InputEmbeddingDriftMonitor( baseline_window="7d", alert_threshold=0.15, check_interval="1h" ), MetricDriftMonitor( metric="helpfulness_score", method="EWMA", lambda_=0.1, ucl_sigma=3.0, check_interval="1h" ), PerformanceDriftMonitor( metrics=["latency_p95", "error_rate", "token_cost"], alert_on_any=True, check_interval="15m" ) ] # ── STEP 3: CloudWatch Alarm → Lambda Automation ──────────────────────── cloudwatch_alarm = { "metric": "AgentCore/Evaluations/HelfulnessScore",

"threshold": 0.75, "evaluation_periods": 3, "comparison": "LessThanThreshold", "actions": [ "sns:trigger-evaluation-alert", "lambda:increase-sampling-rate", "lambda:trigger-on-demand-eval" ] } ── ────────────────────── # STEP 4: Automated On-Demand Evaluation Trigger def drift_response_handler(event): # Increase sampling: 10% → 50% update_sampling_rate(0.50) # Pull recent traces from Phoenix recent_traces = phoenix.get_traces( time_window="24h", filter="score < 0.75" ) # Run detailed on-demand evaluation agentcore.run_on_demand_evaluation( trace_ids=[t.id for t in recent_traces], evaluators=FULL_EVALUATOR_SET ) # Post results to incident channel notify_on_call(results, channel="slack-ai-incidents")

### 7.3 Evaluation Results Storage & Analysis

## 8. PRODUCTION MONITORING ARCHITECTURE

### 8.1 Monitoring Dashboard Specification

![Figure 15](/img/ai-development/ai-dev-p24-15.png)

Widget 12: Sampling rate (auto-adjusted) — Row 4 COST & SCALE Widget 13: Cost per session trend Widget 14: Active sessions count Widget 15: Evaluation coverage % Widget 16: Human annotation queue depth

## - - - 9. LLM AS A JUDGE DESIGN PATTERNS

### 9.1 Judge Architecture

![Figure 16](/img/ai-development/ai-dev-p25-16.png)

### 9.2 Custom Evaluator Template

python

# AgentCore Custom Evaluator Configuration custom_evaluator_config = {

"model_id": "anthropic.claude-sonnet-4-20250514-v1:0", "inference_config": { "temperature": 0.0, # Deterministic scoring "max_tokens": 1000 }, "evaluation_prompt": """ You are evaluating an AI agent's response for a {domain} application. EVALUATION CRITERIA: 1. Domain Accuracy (0-1): Is the information correct for {domain}? 2. Compliance (0-1): Does it follow {regulatory_framework} guidelines? 3. User Value (0-1): Does it meaningfully help the user? TASK: {task} AGENT RESPONSE: {response} REFERENCE: {reference} Respond ONLY with JSON: { "domain_accuracy": <0-1>, "compliance": <0-1>, "user_value": <0-1>, "composite_score": <weighted average>, "critical_issues": [<list any compliance violations>], "reasoning": "<brief explanation>" } """ , "scoring_schema": { "type": "composite", "weights": { "domain_accuracy": 0.40, "compliance": 0.35, "user_value": 0.25 }, "pass_threshold": 0.75, "critical_fail_on": ["compliance < 0.5"] } }

## 10. INTEGRATION REFERENCE

### 10.1 Complete Integration Map

|│ │<br>│HUMAN ANNOTATION│<br>│ ────────────────── │<br>│PhoenixAnnotationQueue──────────────▶Manual labeling│<br>│Argilla───────────────────────────────▶Collaborative annotation │<br>│Scale AI──────────────────────────────▶Enterprise annotation │<br>└─────────────────────────────────────────────────────────────────────────┘|
|---|

### 10.2 Tool Comparison Matrix

|Capability|AgentCore Evals|Arize Phoenix|RAGAS|DeepEval|Langfuse|
|---|---|---|---|---|---|
|Online eval|✅Native|✅Online eval|❌|❌|✅|
|On-demand eval|✅Native|✅<br>Experiments|✅|✅|✅|
|Strands<br>integration|✅Native|✅OTEL|✅Via<br>LangFuse|✅|✅<br>Native|
|RAG metrics|✅ (built-in)|✅Templates|✅Best-in-<br>class|✅|✅|
|Agentic metrics|✅ 13built-in|✅Custom|✅AgentGoal|✅DAG<br>metric|❌|
|Driftdetection|✅Via CW|✅Native<br>(best)|❌|❌|❌|
|Human<br>annotation|❌|✅Queue|❌|❌|✅|
|Self-hostable|❌ (AWS<br>managed)|✅Open<br>source|✅|✅|✅|
|Datasetmgmt|❌|✅|❌|✅Confdent<br>AI|✅|
|Cost tracking|✅CloudWatch|✅|❌|❌|✅|

### 10.3 Quick Start Code Reference

python

── ────────────────────── # STRANDS AGENT WITH FULL EVAL INSTRUMENTATION

import boto3 from strands import Agent from openinference.instrumentation.strands import StrandsInstrumentor import phoenix as px from phoenix.otel import register

# 1. Start Phoenix phoenix_session = px.launch_app()

# 2. Register OTEL with Phoenix tracer_provider = register( project_name="my-agent-project", endpoint="http://localhost:4317" )

# 3. Auto-instrument Strands

StrandsInstrumentor().instrument(tracer_provider=tracer_provider)

# 4. Define Strands Agent agent = Agent( model="anthropic.claude-sonnet-4-20250514-v1:0", tools=[search_tool, calculator_tool, rag_tool], system_prompt="You are a helpful assistant." )

# 5. Run with full tracing response = agent("What is the current price of AWS EC2 t3.micro?")

# → All spans captured: LLM call, tool calls, retrieval

── ──────────────────────────────── # RAGAS EVALUATION ON STRANDS TRACES

from ragas import evaluate from ragas.metrics import ( faithfulness, answer_relevancy, context_precision, context_recall )

# Pull traces from Langfuse / Phoenix

traces = get_traces_from_phoenix(project="my-agent-project", n=100)

dataset = build_ragas_dataset(traces) # transform to RAGAS format

results = evaluate( dataset, metrics=[faithfulness, answer_relevancy, context_precision, context_recall], llm=bedrock_llm # Amazon Nova Premier as judge )

── - ──────────────────────────────────── # AGENTCORE ON DEMAND EVALUATION

agentcore_client = boto3.client("bedrock-agentcore")

response = agentcore_client.create_evaluation( agentId="my-strands-agent-id", evaluationType="ON_DEMAND", spanIds=["span-001", "span-002", ...], evaluatorArns=[

"arn:aws:bedrock-agentcore:::evaluator/Builtin.Helpfulness",

"arn:aws:bedrock-agentcore:::evaluator/Builtin.ToolSelectionAccuracy", " - - " f arn:aws:bedrock agentcore:{region}:{account}:evaluator/custom-eval id ]

)

── ─────────────────────────────────────────────── # DEEPEVAL CI/CD GATE

import deepeval from deepeval.metrics import ( AnswerRelevancyMetric, FaithfulnessMetric, HallucinationMetric, ToolCorrectnessMetric ) from deepeval.test_case import LLMTestCase

def test_agent_quality(): test_cases = load_golden_dataset("s3://my-bucket/benchmarks/golden_v3.jsonl") metrics = [ AnswerRelevancyMetric(threshold=0.75), FaithfulnessMetric(threshold=0.80), HallucinationMetric(threshold=0.15), # Lower is better ToolCorrectnessMetric(threshold=0.85)

]

deepeval.assert_test(test_cases, metrics)

# Pytest compatible

## 11. RUNBOOKS & PLAYBOOKS

### 11.1 Alert Response Playbook

![Figure 17](/img/ai-development/ai-dev-p32-17.png)

□ Re-enable full traffic

□ Monitor for 24h post-fix

### 11.2 Model Upgrade Checklist

![Figure 18](/img/ai-development/ai-dev-p33-18.png)

### 11.3 New Agent Onboarding Checklist

CHECKLIST: New Agent Evaluation Setup ─────────────────────────────────────── — WEEK 1 FOUNDATION □ Define agent purpose and success criteria □ Identify relevant metric planes (response/RAG/agentic) □ Select built-in AgentCore evaluators □ Create custom evaluators for domain needs □ Set acceptance thresholds for each metric

![Figure 19](/img/ai-development/ai-dev-p34-19.png)

## APPENDIX: STANDARD METRICS REFERENCE TABLE

![Figure 20](/img/ai-development/ai-dev-p34-20.png)

|│HallucinationRate│ ≤0.10 │ >0.20 │Phoenix /DeepEval│Judge│<br>│Toxicity │ ≤0.01 │ >0.05 │DeepEval│Judge│<br>│LatencyP95 (ms) │ ≤2000 │ >3000 │CloudWatch│Infra│<br>│ErrorRate│ ≤0.5% │ >1% │CloudWatch│Infra│<br>│InputEmbed Drift │ ≤0.08 │ >0.15 │Phoenix /Arize│Stat │<br>│Cost perSession ($) │ ≤$0.05 │ >$0.10 │CloudWatch│Infra│<br>└─────────────────────────────────────────────────────────────────────────┘|
|---|

Guide Version: 1.0 | Stack: AWS Bedrock AgentCore (GA 2026) + Strands + Arize Phoenix Maintained by: AI Platform Team | Review Cycle: Quarterly