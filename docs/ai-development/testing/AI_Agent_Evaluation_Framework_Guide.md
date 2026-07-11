---
title: "AI_Agent_Evaluation_Framework_Guide.md"
date_created:
last_reviewed:
status: current
supersedes: ""
source_type: converted-pdf
source_file: "AI_Agent_Evaluation_Framework_Guide.md.pdf"
tags: []
---

<!-- converted from AI_Agent_Evaluation_Framework_Guide.md.pdf -->

# 🧠 Complete AI Agent Evaluation Framework

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

┌─────────────────────────────────────────────────────────────────────────────┐ │                    COMPLETE EVALUATION ARCHITECTURE                         │ │ │ │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │ │ │ IDEATION │───▶│  BUILD   │───▶│  EVAL    │───▶│  DEPLOY  │ │ │ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │ │ │ │ │ │ │


![Figure 1](/img/ai-development/ai-dev-p2-1.png)


<!-- Start of picture text -->
│ ▼ ▼ ▼ ▼ │<br>│  Requirements    Strands Agent    AgentCore Evals   AgentCore             │<br>│  Benchmarks + Traces + DeepEval        Runtime               │<br>│  Golden Sets     OpenTelemetry + RAGAS            + Phoenix │<br>│ + Phoenix + CloudWatch         │<br>│ │ │<br>│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │ │<br>│ │  RETIRE  │◀───│ IMPROVE  │◀───│ MONITOR  │◀───────────┘ │<br>│ └──────────┘ └──────────┘ └──────────┘ │<br>│ │ │ │ │<br>│ ▼ ▼ ▼ │<br>│  Deprecation     Fine-tune        Phoenix Drift │<br>│  Handoff         Prompt Eng.      Detection │<br>│  Archival        A/B Testing      CloudWatch Alarms │<br>└─────────────────────────────────────────────────────────────────────────────┘<br><!-- End of picture text -->

### Core Platform Interaction Map


![Figure 2](/img/ai-development/ai-dev-p2-2.png)


<!-- Start of picture text -->
┌────────────────────────────────────────────────────────────────────────┐<br>│                         AWS BEDROCK AGENTCORE                          │<br>│ │<br>│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │<br>│ │  RUNTIME    │ │ EVALUATIONS │ │   POLICY    │ │<br>- - -<br>│ │  Hosting   │ │  Online    │ │  Cedar │ │<br>│ │ - Streaming │ │ - On-Demand │ │ - Gateway │ │<br>- - -<br>│ │  Memory │ │ 13 Built- │ │  Guardrails│ │<br>│ │ - Identity │ │   in Evals │ │ │ │<br>└────── ──────┘ └────── ──────┘ └─────────────┘<br>│ ┬ ┬ │<br>│ │ │ │<br>│ ┌──────▼──────────────────▼──────────────────────────────┐ │<br>│ │              OTEL / OpenInference Layer │ │<br>│ │ (Traces, Spans, Metrics, Logs) │ │<br>└────────────────────────── ───────────────────────────┘<br>│ ┬ │<br>└─────────────────────────────│──────────────────────────────────────┘<br>│<br>┌───────────────────── ┼ ─────────────────────┐<br>▼ ▼ ▼<br>┌───────────────┐ ┌──────────────────┐ ┌──────────────────┐<br>│ STRANDS AGENT │ │  ARIZE PHOENIX   │ │  AMAZON          │<br>│ │ │ │ │  CLOUDWATCH      │<br>- -<br>│  Model First │ │  Trace Explorer │ │ │<br>- - -<br>│  Tool Use    │ │  Eval Library │ │  Dashboards │<br>│ - OTEL native │ │ - Prompt Mgmt │ │ - Alarms │<br><!-- End of picture text -->

│ - Langfuse    │ │ - Datasets │ │ - Automation │ - - │   integration │ │ Drift Monitor │ │ Log Insights │ └───────────────┘ └──────────────────┘ └──────────────────┘

## 2. FRAMEWORK STACK DEEP DIVE

### — 2.1 AWS Bedrock AgentCore Evaluation Engine

AgentCore Evaluations is a fully managed continuous assessment service with two modes:


![Figure 3](/img/ai-development/ai-dev-p4-3.png)


<!-- Start of picture text -->
┌─────────────────────────────────────────────────────────────────┐<br>│                  AGENTCORE EVALUATION MODES                     │<br>│ │<br>│ ┌───────────────────────┐ ┌───────────────────────────┐ │<br>-<br>│ │   ONLINE EVALUATION   │ │   ON DEMAND EVALUATION    │ │<br>│ │ │ │ │ │<br>│ │  Production Traffic   │ │  Targeted Assessment │ │<br>─────────────────── ─────────────────────<br>│ │ │ │ │ │<br>│ │ • % Sampling (e.g. │ │ • Specific span/trace    │ │<br>│ │ 10% of sessions) │ │    IDs │ │<br>│ │ • Conditional filters│ │ • CI/CD pipeline hooks │ │<br>│ │ • Continuous scores │ │ • Historical analysis │ │<br>│ │ • CloudWatch publish │ │ • Issue investigation │ │<br>│ │ │ │ • Build-time testing     │ │<br>│ └───────────────────────┘ └───────────────────────────┘ │<br>│ │<br>-<br>│  BUILT IN EVALUATORS (13 total): │<br>│ ┌───────────────── ┬ ──────────────── ┬ ────────────────────┐ │<br>│ │   QUALITY       │   TOOL USAGE   │   SAFETY           │ │<br>│ │ • Helpfulness │ • Tool Select │ • Harmlessness │ │<br>│ │ • Correctness │   Accuracy │ • Refusal Quality │ │<br>│ │ • Coherence     │ • Tool Param │ • PII Detection │ │<br>│ │ • Completeness │   Accuracy │ │ │<br>│ │ • Groundedness │ • Tool Call    │ │ │<br>│ │ • Relevance     │   Sequence     │ │ │<br>│ └───────────────── ┴ ──────────────── ┴ ────────────────────┘ │<br>│ │<br>│  CUSTOM EVALUATORS: │<br>│ • Define judge model + inference params │<br>│ • Craft evaluation prompt + rubric                             │<br>│ • Define scoring schema (numeric, binary, categorical) │<br>│ • Domain-specific: healthcare, finance, legal                  │<br>└─────────────────────────────────────────────────────────────────┘<br><!-- End of picture text -->

### — 2.2 Strands Agents Instrumented Agent Framework


![Figure 4](/img/ai-development/ai-dev-p4-4.png)


<!-- Start of picture text -->
┌─────────────────────────────────────────────────────────────┐<br>│                    STRANDS AGENT ANATOMY                    │<br>│ │<br>│ ┌──────────┐ │<br>│ │  INPUT   │──▶ Strands Agent Core                       │<br>│ └──────────┘ │ │<br><!-- End of picture text -->


![Figure 5](/img/ai-development/ai-dev-p5-5.png)


<!-- Start of picture text -->
──<br>│ ├  LLM Call (Claude/Nova/etc.) │<br>──<br>│ ├  Tool 1 (API, Lambda, MCP) │<br>──<br>│ ├  Tool 2 (Knowledge Base) │<br>──<br>│ ├  Tool N (Custom) │<br>│ └── Final Response                  │<br>│ │<br>│  BUILT-IN OBSERVABILITY: │<br>│ • OpenTelemetry spans for every step │<br>│ • Langfuse integration (traces → eval pipeline) │<br>│ • OTEL → AgentCore Evaluations │<br>│ • OTEL → Arize Phoenix │<br>│ │<br>│  STEERING HANDLERS (2025): │<br>│ • Context-aware prompt injection │<br>│ • Token cost optimization │<br>│ • Dynamic instruction routing                             │<br>└─────────────────────────────────────────────────────────────┘<br><!-- End of picture text -->

### — 2.3 Arize Phoenix Observability & Evaluation Layer


![Figure 6](/img/ai-development/ai-dev-p5-6.png)


<!-- Start of picture text -->
┌─────────────────────────────────────────────────────────────────┐<br>│                      ARIZE PHOENIX STACK                        │<br>│ │<br>│  INSTRUMENTATION LAYER                                         │<br>────────────────────<br>│ │<br>│  OpenInference + OTEL → Unified trace format │<br>│  Supports: Bedrock, OpenAI, Anthropic, LangChain, etc. │<br>│ │<br>│  TRACING                                                       │<br>───────<br>│ │<br>│  Span Types: LLM | Retriever | Tool | Chain | Agent │<br>│  Captures: Inputs, Outputs, Tokens, Latency, Errors │<br>│ │<br>│  EVALUATION LIBRARY                                            │<br>──────────────────<br>│ │<br>│  Code-based: Exact match, regex, custom heuristics │<br>│  LLM-as-Judge: Model + rubric-based scoring                   │<br>-<br>│  Pre built templates: RAG, agents, safety, summarization │<br>│  Human annotation: Labeling queues, golden set curation │<br>│ │<br>│  DRIFT DETECTION                                               │<br>───────────────<br>│ │<br>│  Embedding drift (semantic shift in inputs/outputs) │<br><!-- End of picture text -->

│  Response distribution drift │ │  Performance regression detection │ │  Feature drift for structured inputs │ │ │ │  DEPLOYMENT OPTIONS                                            │ ────────────────── │ │ │  Local dev │ Docker │ Kubernetes │ Phoenix Cloud               │ └─────────────────────────────────────────────────────────────────┘

## 3. FULL LIFECYCLE

╔═══════════════════════════════════════════════════════════════════════╗ — ║            AGENT EVALUATION LIFECYCLE COMPLETE MAP                 ║ ═══════════════════════════════════════════════════════════════════════ `╠ ╣` ║ ║ ║  PHASE 1: IDEATION                                                   ║ ───────────────── ║ ║ ║ □ Define agent purpose, scope, and success criteria                 ║ ║ □ Identify evaluation dimensions (quality, safety, tool use) ║ ║ □ Map to benchmark suites (public + custom) ║ ║ □ Define acceptance thresholds per metric                           ║ ║ □ Design golden dataset schema                                      ║ ║ □ Choose judge model (Claude Sonnet/Nova Premier for cost/quality) ║ ║ ║ ║  PHASE 2: BENCHMARK CONSTRUCTION                                     ║ ────────────────────────────── ║ ║ ║ □ Curate seed questions (human SME + synthetic generation) ║ ║ □ Generate adversarial test cases ║ ║ □ Label ground truth (human annotation queue) ║ ║ □ Version-control dataset (Phoenix datasets + S3) ║ ║ □ Define evaluation rubrics per task type                           ║ ║ □ Validate inter-annotator agreement (kappa ≥ 0.7) ║ ║ ║ ║  PHASE 3: BUILD & INSTRUMENT                                         ║ ─────────────────────────── ║ ║ ║ □ Implement Strands Agent with OTEL instrumentation ║ ║ □ Wire OpenInference to AgentCore + Phoenix ║ ║ □ Configure AgentCore Evaluations (evaluator ARNs) ║ ║ □ Set up Langfuse for trace collection ║ ║ □ Define custom evaluators (domain-specific rubrics) ║ ║ ║

- ║  PHASE 4: PRE DEPLOYMENT EVALUATION (On-Demand) ║ ────────────────────────────────────────────── ║ ║ ║ □ Run full benchmark suite against golden dataset ║ ║ □ Check all metrics vs. acceptance thresholds ║ ║ □ A/B test prompt variants ║ ║ □ Adversarial stress testing                                        ║ ║ □ Gate: PASS all thresholds → proceed                               ║ ║ ║ ║  PHASE 5: DEPLOYMENT WITH ONLINE EVAL                               ║ ──────────────────────────────────── ║ ║ ║ □ Enable AgentCore Online Evaluations (10% sampling start) ║ ║ □ Arize Phoenix real-time drift monitors active                     ║ ║ □ CloudWatch alarms on evaluation score drops ║ ║ □ Human-in-loop annotation queue running in parallel                ║ ║ ║ ║  PHASE 6: CONTINUOUS MONITORING                                      ║ ────────────────────────────── ║ ║ ║ □ Daily evaluation score aggregation ║ ║ □ Weekly drift analysis (embedding + response) ║ ║ □ Monthly benchmark regression suite                                ║ ║ □ Anomaly detection alerts → auto-trigger on-demand eval            ║ ║ ║ ║  PHASE 7: IMPROVEMENT LOOP                                           ║ ───────────────────────── ║ ║ ║ □ Diagnose failure clusters (Phoenix heatmaps) ║ ║ □ Curate failure cases → augment training/eval dataset ║ ║ □ Prompt engineering / model upgrade                                ║ ║ □ Re-run benchmark gate before re-deployment ║ ║ ║ ║  PHASE 8: RETIREMENT                                                 ║ ──────────────────── ║ ║ ║ □ Sunset criteria met (metric floor breached persistently) ║ ║ □ Archive all traces, datasets, eval scores ║ ║ □ Generate final performance audit report ║ ║ □ Handoff to replacement agent with baseline comparison ║ ╚═══════════════════════════════════════════════════════════════════════╝

## 4. EVALUATION TAXONOMY & METRIC CATALOGUE

### 4.1 The Three Planes of Evaluation


![Figure 7](/img/ai-development/ai-dev-p8-7.png)


<!-- Start of picture text -->
┌───────────────────────────────────────────────────────────────┐<br>│                  EVALUATION PLANES                            │<br>│ │<br>—<br>│  PLANE 1  RESPONSE QUALITY                                  │<br>────────────────────────────<br>│ │<br>│  Single-turn quality of generated text │<br>│ │<br>—<br>│  PLANE 2  RAG QUALITY (if retrieval used) │<br>──────────────────────────────────────────<br>│ │<br>│  Quality of retrieval + grounding in context │<br>│ │<br>—<br>│  PLANE 3  AGENTIC BEHAVIOR                                  │<br>─────────────────────────────<br>│ │<br>│  Multi-step decision making, tool use, goal completion │<br>└───────────────────────────────────────────────────────────────┘<br><!-- End of picture text -->

### 4.2 Complete Metric Catalogue

### — PLANE 1 RESPONSE QUALITY METRICS

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



### — PLANE 2 RAG QUALITY METRICS

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



### — PLANE 3 AGENTIC BEHAVIOR METRICS

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



│ │

┌────────▼──────┐ ┌▼────────────────┐

│ ADD AGENTIC   │ │ RESPONSE QUALITY │ │ Task Success │ │ METRICS ONLY     │ │ Planning Qual │ └─────────────────┘ └───────────────┘

## 5. BENCHMARK CREATION STANDARDS

### 5.1 Benchmark Architecture


![Figure 8](/img/ai-development/ai-dev-p13-8.png)


<!-- Start of picture text -->
┌──────────────────────────────────────────────────────────────┐<br>│                  BENCHMARK CONSTRUCTION                      │<br>│ │<br>│  TIER 1: PUBLIC BENCHMARKS (Baseline Calibration) │<br>─────────────────────────────────────────────────<br>│ │<br>│ • MMLU — Multi-task language understanding                  │<br>│ • HumanEval — Code generation │<br>│ • BrowserBench / WebArena — Web agent tasks │<br>│ • SWE-bench — Software engineering agents │<br>│ • GAIA — General AI Assistants │<br>│ • HellaSwag — Common sense reasoning                        │<br>│ • TruthfulQA — Factual accuracy │<br>│ │<br>│  TIER 2: DOMAIN BENCHMARKS (Vertical Calibration) │<br>─────────────────────────────────────────────────<br>│ │<br>│ • FinanceBench — Financial Q&A                              │<br>│ • MedQA — Medical reasoning                                 │<br>│ • LegalBench — Legal task performance                       │<br>│ • Custom enterprise benchmarks (see Tier 3) │<br>│ │<br>│  TIER 3: CUSTOM / GOLDEN DATASETS (Production Truth) │<br>────────────────────────────────────────────────────<br>│ │<br>│ • Curated from real production traffic                      │<br>│ • Human-labeled ground truth                                │<br>│ • Adversarial edge cases │<br>│ • Regression test set (known failure cases fixed) │<br>└──────────────────────────────────────────────────────────────┘<br><!-- End of picture text -->

5.2 Golden Dataset Creation Process


![Figure 9](/img/ai-development/ai-dev-p14-9.png)


<!-- Start of picture text -->
STEP 1: SEED COLLECTION<br>────────────────────────<br>┌────────────────────────────────────────┐<br>│  Sources: │<br>│ • Real user queries (sampled) │<br>│ • SME-authored exemplar questions │<br>│ • Synthetic: LLM-generated + reviewed │<br>│ • Adversarial: red-team generated     │<br>│ │<br>│  Target: 100–1000 examples per domain │<br>└────────────────────────────────────────┘<br>│<br>▼<br>STEP 2: GROUND TRUTH ANNOTATION<br>─────────────────────────────────<br>┌────────────────────────────────────────┐<br>│  For each example: │<br>│ • Expected answer (reference) │<br>│ • Acceptable answer variants │<br>│ • Quality rubric (1–5 scale) │<br>│ • Metadata: difficulty, domain, type  │<br>│ │<br>│  Quality Gate: Inter-annotator │<br>│  agreement κ (Cohen's Kappa) ≥ 0.70 │<br>└────────────────────────────────────────┘<br>│<br>▼<br>STEP 3: STRATIFIED SPLIT<br>──────────────────────────<br>┌────────────────────────────────────────┐<br>│  Train Eval: 70% (optimization) │<br>│  Dev Eval: 15% (model selection) │<br>│  Test / Golden: 15% (final gate only) │<br>│ │<br>│  Stratify by: domain, difficulty, │<br>│ query type, expected tool use         │<br>└────────────────────────────────────────┘<br>│<br>▼<br>STEP 4: VERSIONING & STORAGE<br>──────────────────────────────<br><!-- End of picture text -->


![Figure 10](/img/ai-development/ai-dev-p15-10.png)


<!-- Start of picture text -->
┌────────────────────────────────────────┐<br>│  Storage: S3 + Phoenix Datasets │<br>│  Format: JSONL with schema validation │<br>│  Versioning: DVC or S3 versioning      │<br>│  Schema: │<br>│ { │<br>│ "id": "uuid", │<br>│ "input": "...", │<br>│ "expected_output": "...", │<br>│ "reference_context": [...], │<br>│ "metadata": { │<br>│ "domain": "finance", │<br>│ "difficulty": "hard", │<br>│ "type": "rag|tool|reasoning", │<br>│ "annotators": [...], │<br>│ "kappa": 0.82 │<br>│ } │<br>│ } │<br>└────────────────────────────────────────┘<br><!-- End of picture text -->

### — 5.3 How Claude (Anthropic) Benchmarks Are Created Standard

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

┌─────────────────────────────────────────────────────────────────┐ │                    TYPES OF DRIFT                               │ │ │ │  DATA DRIFT (Input Distribution) │ ────────────────────────────── │ │ │  User query distribution shifts │


![Figure 11](/img/ai-development/ai-dev-p17-11.png)


<!-- Start of picture text -->
│  Topic distribution changes │<br>│  Language/terminology evolution │<br>│  Detection: KL divergence, PSI on embeddings │<br>│ │<br>│  CONCEPT DRIFT (World Knowledge) │<br>────────────────────────────────<br>│ │<br>│  Facts in knowledge base become outdated                        │<br>│  Model world knowledge cutoff mismatch                          │<br>│  Detection: Faithfulness score decline + RAG recall drop │<br>│ │<br>│  MODEL DRIFT (Behavioral Shift) │<br>────────────────────────────────<br>│ │<br>│  Upstream model update changes agent behavior │<br>│  Prompt interaction changes with new model version │<br>│  Detection: Statistical test on evaluation score distribution │<br>│ │<br>│  PERFORMANCE DRIFT (Metric Degradation) │<br>──────────────────────────────────────<br>│ │<br>│  Gradual quality score decline                                  │<br>│  Tool accuracy drop │<br>│  Latency regression │<br>│  Detection: CUSUM / EWMA control charts │<br>│ │<br>│  EMBEDDING DRIFT (Semantic Space Shift) │<br>──────────────────────────────────────<br>│ │<br>│  Semantic distribution of responses drifts │<br>│  Arize Phoenix embedding monitors │<br>│  Detection: Euclidean distance in embedding space              │<br>└─────────────────────────────────────────────────────────────────┘<br><!-- End of picture text -->

### 6.2 Drift Detection Pipeline


![Figure 12](/img/ai-development/ai-dev-p17-12.png)


<!-- Start of picture text -->
Production Traffic<br>│<br>▼<br>┌──────────────────────────────────────────────────────────────┐<br>│              DRIFT DETECTION PIPELINE                        │<br>│ │<br>— -<br>│  LAYER 1  REAL TIME SIGNALS (per trace) │<br>─────────────────────────────────────────<br>│ │<br>│  Phoenix OTEL → Anomaly score per span │<br>│  AgentCore Online Eval → Per-session metric scores │<br>│  CloudWatch → Latency / error rate spike detection │<br><!-- End of picture text -->

│ │ — │  LAYER 2 STATISTICAL MONITORS (hourly/daily) │ ────────────────────────────────────────────── │ │ │ ┌───────────────────┐ ┌──────────────────────┐ │ │ │  INPUT EMBEDDING  │ │  OUTPUT EMBEDDING    │ │ │ │  DRIFT MONITOR    │ │  DRIFT MONITOR       │ │ │ │ │ │ │ │ │ │  Compute cosine   │ │  Compute semantic    │ │ │ │  distance from │ │  centroid shift from │ │ │ │  baseline embed. │ │  baseline outputs │ │ │ │  distribution │ │  distribution │ │ │ │ │ │ │ │ │ │  Alert: > 0.15 │ │  Alert: > 0.20 │ │ │ │  drift score      │ │  drift score         │ │ │ └───────────────────┘ └──────────────────────┘ │ │ │ │ ┌────────────────────────────────────────────┐ │ │ │          METRIC CONTROL CHARTS             │ │ │ │ │ │ │ │  EWMA (Exponentially Weighted Moving Avg) │ │ ────────────────────────────────────── │ │ │ │ │ │ `λ` = 0.1 (sensitive to gradual drift) │ │ │ │  UCL = μ + 3 `σ` LCL = μ - 3 `σ` │ │ │ │ │ │ │ │  CUSUM (Cumulative Sum Control Chart) │ │ ──────────────────────────────────── │ │ │ │ │ │  Detects step-change in metric mean │ │ │ │  k = 0.5 `σ` h = 5 `σ` (standard params) │ │ │ └────────────────────────────────────────────┘ │ │ │ — │  LAYER 3 AUTOMATED RESPONSE                               │ ────────────────────────────── │ │ │  Drift Alert → CloudWatch Alarm → SNS → Lambda              │ │  Lambda actions: │ │ • Trigger on-demand evaluation batch                        │ │ • Increase sampling rate (10% → 50%) │ │ • Page on-call engineer │ │ • Log incident in PagerDuty / Jira                          │ │ • Gate traffic if critical threshold breached               │ └──────────────────────────────────────────────────────────────┘

### 6.3 Drift Alert Thresholds


![Figure 13](/img/ai-development/ai-dev-p19-13.png)


<!-- Start of picture text -->
┌──────────────────────────────────────────────────────────┐<br>│              DRIFT ALERT THRESHOLDS                      │<br>│ │<br>│  Metric              Warning     Critical    Action │<br>──────────────────────────────────────────────────────<br>│ │<br>│  Helpfulness Score   < 0.75 < 0.60     Incident │<br>│  Tool Selection Acc  < 0.85 < 0.70     Incident │<br>│  Faithfulness (RAG) < 0.80 < 0.65     Incident │<br>│  Task Success Rate   < 0.70 < 0.55     Rollback     │<br>│  Input Embed Drift > 0.10 > 0.20     Investigate  │<br>│  Output Embed Drift > 0.15 > 0.25     Investigate  │<br>│  Latency P95 (ms) > 3000 > 5000     Scale alert │<br>│  Error Rate          > 1% > 5%       Rollback     │<br>│  Token Cost/Session > 1.5x avg  > 3x avg   Cost alert │<br>└──────────────────────────────────────────────────────────┘<br><!-- End of picture text -->

## 7. AUTOMATED EVALUATION PIPELINE

### 7.1 CI/CD Evaluation Gate


![Figure 14](/img/ai-development/ai-dev-p19-14.png)


<!-- Start of picture text -->
┌──────────────────────────────────────────────────────────────────────┐<br>│                    CI/CD EVALUATION GATE                             │<br>│ │<br>│  Developer Push → Git PR                                            │<br>│ │ │<br>│ ▼ │<br>│ ┌───────────────────────────────────────────────────────────────┐ │<br>│ │                  EVALUATION PIPELINE                          │ │<br>│ │ │ │<br>│ │  Stage 1: UNIT TESTS (< 2 min) │ │<br>─────────────────────────────<br>│ │ │ │<br>│ │  DeepEval pytest suite                                        │ │<br>│ │ • 20–50 golden test cases │ │<br>│ │ • Exact match + heuristic checks │ │<br>│ │ • Code-based evaluators (fast, no LLM cost) │ │<br>│ │ │ │<br>│ │  Stage 2: LLM EVALUATION (10–30 min) │ │<br>──────────────────────────────────<br>│ │ │ │<br>│ │  AgentCore On-Demand Evaluation │ │<br><!-- End of picture text -->

│ │ • Full benchmark suite (200–500 examples) │ │ │ │ • All metric planes (response + RAG + agentic) │ │ │ │ • Compare vs. baseline (previous production version) │ │ │ │ │ │ │ │  Stage 3: REGRESSION CHECK (5 min) │ │ ────────────────────────────────── │ │ │ │ │ │ • Run all known-failure regression cases │ │ │ │ • Zero-regression policy: ALL must pass │ │ │ │ │ │ │ │  Stage 4: SAFETY GATE (10 min) │ │ ────────────────────────────── │ │ │ │ │ │ • Toxicity / bias / PII checks │ │ │ │ • AgentCore Policy validation │ │ │ │ • Hard BLOCK on any safety failure                           │ │ │ └───────────────────────────────────────────────────────────────┘ │ │ │ │ │ ▼ │ │ ┌───────────────────────────────┐ │ │ │    DECISION ENGINE            │ │ │ │ │ │ │ │  ALL stages pass? ──── YES ──▶ Approve PR + Deploy │ │ │ │ │ │ │         NO                                                       │ │ │ └────────────────────▶ Block PR + Report │ │ └───────────────────────────────┘ │ └──────────────────────────────────────────────────────────────────────┘

### 7.2 Online Evaluation Automation

python

# AUTOMATION ARCHITECTURE (pseudocode)

── ────────────────── # STEP 1: Configure Online Evaluation in AgentCore online_eval_config = { "agent_id": "my-strands-agent", "sampling_rate": 0.10, # 10% of traffic "evaluators": [ "arn:aws:bedrock-agentcore:::evaluator/Builtin.Helpfulness", "arn:aws:bedrock-agentcore:::evaluator/Builtin.ToolSelectionAccuracy", "arn:aws:bedrock-agentcore:::evaluator/Builtin.Groundedness", "arn:aws:bedrock-agentcore:{region}:{account}:evaluator/custom-domain-eval" ], "filters": { "exclude_test_sessions": True, "min_session_length": 1 }, "output": "cloudwatch" # Scores → CloudWatch }

── ────────────────────────────────────── # STEP 2: Phoenix Drift Monitors drift_monitors = [ InputEmbeddingDriftMonitor( baseline_window="7d", alert_threshold=0.15, check_interval="1h" ), MetricDriftMonitor( metric="helpfulness_score", method="EWMA", lambda_=0.1, ucl_sigma=3.0, check_interval="1h" ), PerformanceDriftMonitor( metrics=["latency_p95", "error_rate", "token_cost"], alert_on_any=True, check_interval="15m" ) ] # ── STEP 3: CloudWatch Alarm → Lambda Automation ──────────────────────── cloudwatch_alarm = { "metric": "AgentCore/Evaluations/HelfulnessScore",

"threshold": 0.75, "evaluation_periods": 3, "comparison": "LessThanThreshold", "actions": [ "sns:trigger-evaluation-alert", "lambda:increase-sampling-rate", "lambda:trigger-on-demand-eval" ] } ── ────────────────────── # STEP 4: Automated On-Demand Evaluation Trigger def drift_response_handler(event): # Increase sampling: 10% → 50% update_sampling_rate(0.50) # Pull recent traces from Phoenix recent_traces = phoenix.get_traces( time_window="24h", filter="score < 0.75" ) # Run detailed on-demand evaluation agentcore.run_on_demand_evaluation( trace_ids=[t.id for t in recent_traces], evaluators=FULL_EVALUATOR_SET ) # Post results to incident channel notify_on_call(results, channel="slack-ai-incidents")

### 7.3 Evaluation Results Storage & Analysis

┌──────────────────────────────────────────────────────────────┐ │              EVALUATION DATA FLOW                            │ │ │ │  AgentCore Evaluations │ │ │ │ │ `├` ──▶ CloudWatch Metrics (real-time dashboard) │ │ │ │ │ │ │ └──▶ CloudWatch Alarms → Lambda            │ │ │ │ │ └──▶ S3 (raw score + trace archive) │ │ │ │

│  Phoenix │ │ │ │ │ │ ── │ `├` ▶ Phoenix Datasets (structured experiments) │ │ │ │ │ │ │ └──▶ Trend Analysis + Heatmaps │ │ │ │ │ └──▶ Annotation Queue → Human Review │ │ │ │  Analysis Loop (weekly): │ │ • Pull evaluation scores from S3 │ │ • Compute trend lines per metric                            │ │ • Cluster failures (Phoenix embedding clusters) │ │ • Identify top-N failure patterns │ │ • Generate improvement recommendations │ │ • Update golden dataset with new failure cases │ └──────────────────────────────────────────────────────────────┘

## 8. PRODUCTION MONITORING ARCHITECTURE

┌─────────────────────────────────────────────────────────────────────────┐ │                    PRODUCTION MONITORING STACK                          │ │ │ │ ┌──────────────────────────────────────────────────────────────────┐ │ │ │                     OBSERVABILITY LAYER                          │ │ │ │ │ │ │ │  Every agent interaction: │ │ │ │  Strands Agent → OTEL Spans → OpenInference                     │ │ │ │ │ │ │ │ │ ┌────────── `┴` ──────────┐ │ │ │ │ ▼ ▼ │ │ │ │                  AgentCore OTEL         Arize Phoenix │ │ │ │                  Collector              Collector │ │ │ └──────────────────────────────────────────────────────────────────┘ │ │ │ │ │ │ ┌─────────▼──────────┐ ┌─────────▼──────────┐ │ │ │   AMAZON           │ │   ARIZE PHOENIX     │ │ │ │   CLOUDWATCH       │ │   DASHBOARD         │ │ │ │ │ │ │ │ │ │  Metrics: │ │  Traces: │ │ │ │ • Eval scores │ │ • Full LLM spans │ │ │ │ • Latency │ │ • Tool calls │ │

│ │ • Token usage     │ │ • Retrieval steps │ │ │ │ • Error rate      │ │ │ │ │ │ • Session length  │ │  Evaluations: │ │ │ │ │ │ • LLM-as-Judge     │ │ │ │  Dashboards: │ │ • Code metrics │ │ │ │  AgentCore         │ │ • Human labels │ │ │ │  Observability │ │ │ │ │ │  Dashboard         │ │  Drift Monitors: │ │ │ │ │ │ • Embedding drift │ │ │ │  Alarms → SNS      │ │ • Metric trends │ │ │ │ → Lambda          │ │ • Cluster shifts │ │ │ └────────────────────┘ └─────────────────────┘ │ │ │ │ ┌──────────────────────────────────────────────────────────────────┐ │ │ │              ALERTING & AUTOMATION                               │ │ │ │ │ │ │ │  CloudWatch Alarm → SNS → Lambda (auto-remediation) │ │ │ │ └──▶ PagerDuty (human escalation) │ │ │ │ └──▶ Jira (incident ticket) │ │ │ │ └──▶ Slack (team notification) │ │ │ └──────────────────────────────────────────────────────────────────┘ │ └─────────────────────────────────────────────────────────────────────────┘

### 8.1 Monitoring Dashboard Specification


![Figure 15](/img/ai-development/ai-dev-p24-15.png)


<!-- Start of picture text -->
AGENTCORE OBSERVABILITY DASHBOARD (CloudWatch)<br>──────────────────────────────────────────────<br>—<br>Row 1  QUALITY SCORES (real-time)<br>Widget 1: Helpfulness score trend (7d)<br>Widget 2: Tool selection accuracy (7d)<br>Widget 3: Task completion rate (7d)<br>Widget 4: Groundedness score (7d)<br>—<br>Row 2  OPERATIONAL METRICS<br>Widget 5: Latency P50/P95/P99 (24h)<br>Widget 6: Token usage (input/output) (24h)<br>Widget 7: Error rate by type (24h)<br>Widget 8: Sessions started/completed (24h)<br>—<br>Row 3  DRIFT INDICATORS<br>Widget 9:  Input embedding drift score (30d)<br>Widget 10: Output embedding drift score (30d)<br>Widget 11: Metric EWMA control chart (30d)<br><!-- End of picture text -->

Widget 12: Sampling rate (auto-adjusted) — Row 4 COST & SCALE Widget 13: Cost per session trend Widget 14: Active sessions count Widget 15: Evaluation coverage % Widget 16: Human annotation queue depth

## - - - 9. LLM AS A JUDGE DESIGN PATTERNS

### 9.1 Judge Architecture


![Figure 16](/img/ai-development/ai-dev-p25-16.png)


<!-- Start of picture text -->
┌────────────────────────────────────────────────────────────┐<br>- - -<br>│                LLM AS A JUDGE SYSTEM                       │<br>│ │<br>│  INPUT ASSEMBLY                                            │<br>───────────────<br>│ │<br>│ { │<br>│ "task": "original user question", │<br>│ "context": "retrieved chunks (if RAG)", │<br>│ "agent_response": "agent output to evaluate", │<br>│ "reference": "ground truth (optional)", │<br>│ "tool_calls": [{tool, params, result}, ...], │<br>│ "rubric": "evaluation criteria + scale" │<br>│ } │<br>│ │<br>│  JUDGE PROMPT TEMPLATE                                     │<br>──────────────────────<br>│ │<br>│ [SYSTEM]: You are a strict evaluator. Score the          │<br>│ response on [CRITERIA]. Respond ONLY in JSON: │<br>│ {"score": 0-1, "reasoning": "...", "issues": [...]} │<br>│ │<br>│  BIAS MITIGATIONS                                         │<br>─────────────────<br>│ │<br>│ • Verbosity bias: Penalize long ≠ correct in rubric      │<br>│ • Self-preference: Use different judge than agent model  │<br>│ • Position bias: Randomize A/B order in comparisons │<br>│ • Calibration: Validate judge vs. human labels monthly │<br>│ │<br>│  ENSEMBLE JUDGING (high-stakes) │<br>──────────────────────────────<br>│ │<br><!-- End of picture text -->

│  Judge 1: Claude Sonnet (primary) │

│  Judge 2: Amazon Nova Premier (secondary) │

│  Final Score: Weighted average if agreement ≥ 0.8 │

│  Escalate to human if disagreement > 0.2 │

└────────────────────────────────────────────────────────────┘

### 9.2 Custom Evaluator Template

python

# AgentCore Custom Evaluator Configuration custom_evaluator_config = {

"model_id": "anthropic.claude-sonnet-4-20250514-v1:0", "inference_config": { "temperature": 0.0, # Deterministic scoring "max_tokens": 1000 }, "evaluation_prompt": """ You are evaluating an AI agent's response for a {domain} application. EVALUATION CRITERIA: 1. Domain Accuracy (0-1): Is the information correct for {domain}? 2. Compliance (0-1): Does it follow {regulatory_framework} guidelines? 3. User Value (0-1): Does it meaningfully help the user? TASK: {task} AGENT RESPONSE: {response} REFERENCE: {reference} Respond ONLY with JSON: { "domain_accuracy": <0-1>, "compliance": <0-1>, "user_value": <0-1>, "composite_score": <weighted average>, "critical_issues": [<list any compliance violations>], "reasoning": "<brief explanation>" } """ , "scoring_schema": { "type": "composite", "weights": { "domain_accuracy": 0.40, "compliance": 0.35, "user_value": 0.25 }, "pass_threshold": 0.75, "critical_fail_on": ["compliance < 0.5"] } }

## 10. INTEGRATION REFERENCE

### 10.1 Complete Integration Map

┌─────────────────────────────────────────────────────────────────────────┐ │                    INTEGRATION ECOSYSTEM                                │ │ │ │  AGENT FRAMEWORKS → AgentCore                                          │ ───────────────────────────── │ │ │  Strands Agents ──────────────────────┐ │ │  LangGraph ─────────────────────────┐ │ │ │  CrewAI ──────────────────────────── `┤ ├` ──▶ AgentCore Runtime          │ │  LlamaIndex ──────────────────────── `┤` │ + Evaluations │ │  LangChain ─────────────────────────┘ │ + Policy │ │  Custom (via OTEL) ──────────────────┘ │ │ │ │  EVALUATION LIBRARIES                                                  │ ─────────────────── │ │ │  RAGAS ─────────────────────────────────▶ RAG quality metrics │ ────────────────────────────── │  DeepEval ▶ Unit test suite             │ │  AgentCore Evaluations ─────────────────▶ Managed LLM-Judge           │ ───────────────────────── - │  Phoenix Evals ▶ Trace based evaluation │ │  Evidently ─────────────────────────────▶ ML + LLM unified            │ │ │ │  OBSERVABILITY                                                         │ ───────────── │ │ ───────────────────────── │  Arize Phoenix ▶ Full trace explorer │ │  Langfuse ──────────────────────────────▶ Strands native integration │ │  Amazon CloudWatch ─────────────────────▶ Metrics + Alarms │ - ───────────────────────────── │  AWS X Ray ▶ Distributed tracing         │ │ │ │  DRIFT & MONITORING                                                    │ ──────────────────── │ │ ────────────────────────────── │  Arize AX ▶ Production drift detection │ ─────────────────────────────── │  WhyLabs ▶ Data quality monitoring     │ │  Evidently Cloud ───────────────────────▶ Unified ML + LLM drift │ │ │ │  BENCHMARK & DATASET MANAGEMENT                                        │ ───────────────────────────────── │ │ ────────────────────── │  Phoenix Datasets ▶ Experiment management │ ──────────────────────────────── │  MLflow ▶ Experiment tracking         │ │  DVC ───────────────────────────────────▶ Dataset versioning          │ │  AWS S3 ────────────────────────────────▶ Benchmark storage           │

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


<!-- Start of picture text -->
PLAYBOOK: Evaluation Score Drop Alert<br>──────────────────────────────────────<br>TRIGGER: Helpfulness score < 0.75 for 3 consecutive periods<br>—<br>STEP 1  TRIAGE (0–15 min)<br>□ Check CloudWatch dashboard for scope<br>□ Is this a single evaluator or multiple?<br>□ Is it correlated with a deployment? (check release log)<br>□ Is it time-of-day or query-type specific?<br>—<br>STEP 2  DIAGNOSE (15–60 min)<br>□ Pull failing traces in Phoenix<br>□ Identify failure clusters (embedding heatmap)<br>□ Check if it's input drift (new query types?) or model drift<br>□ Run on-demand evaluation on failure cluster<br>□ Compare against baseline evaluation scores<br>—<br>STEP 3  CLASSIFY<br>□ INPUT DRIFT → Update knowledge base / retrieval<br>□ PROMPT REGRESSION → Rollback to previous prompt version<br>□ MODEL DRIFT → Evaluate new model version<br>□ TOOL FAILURE → Check downstream API health<br>□ DATA ISSUE → Validate context quality<br>—<br>STEP 4  REMEDIATE<br>□ If critical: Gate traffic → enable A/B test with fixed version<br>□ If non-critical: Queue fix for next sprint<br>□ Update golden dataset with new failure patterns<br>□ Document root cause in incident log<br>—<br>STEP 5  VALIDATE<br>□ Re-run full benchmark suite on fixed version<br>□ Confirm all metrics above thresholds<br><!-- End of picture text -->

□ Re-enable full traffic

□ Monitor for 24h post-fix

### 11.2 Model Upgrade Checklist


![Figure 18](/img/ai-development/ai-dev-p33-18.png)


<!-- Start of picture text -->
CHECKLIST: Model Version Upgrade<br>──────────────────────────────────<br>-<br>PRE UPGRADE<br>□ Run full benchmark on new model version<br>□ Compare scores against current production baseline<br>□ Statistical significance check (n≥200, p<0.05)<br>□ Regression suite: zero regressions required<br>□ Cost/token analysis<br>UPGRADE<br>□ Deploy to staging environment<br>□ Canary: 5% traffic to new model<br>□ Monitor online eval scores for 24h<br>□ Compare embedding distributions (input + output)<br>-<br>POST UPGRADE GATE<br>□ All quality metrics ≥ production baseline<br>□ No cost increase > 20%<br>□ Latency P95 ≤ current baseline<br>□ Safety gate: zero failures<br>ROLLOUT<br>□ 25% → 50% → 100% traffic shift<br>□ Continue online monitoring<br>□ Update benchmark baseline to new version scores<br><!-- End of picture text -->

### 11.3 New Agent Onboarding Checklist

CHECKLIST: New Agent Evaluation Setup ─────────────────────────────────────── — WEEK 1 FOUNDATION □ Define agent purpose and success criteria □ Identify relevant metric planes (response/RAG/agentic) □ Select built-in AgentCore evaluators □ Create custom evaluators for domain needs □ Set acceptance thresholds for each metric


![Figure 19](/img/ai-development/ai-dev-p34-19.png)


<!-- Start of picture text -->
—<br>WEEK 2  BENCHMARK CONSTRUCTION<br>□ Collect 100–500 seed examples<br>□ Human annotation with kappa ≥ 0.70<br>□ Stratified train/dev/test split<br>□ Version-control in S3 + Phoenix Datasets<br>□ Create regression test set (50 examples minimum)<br>—<br>WEEK 3  PIPELINE SETUP<br>□ Instrument Strands Agent with OpenInference<br>□ Configure Phoenix project and monitors<br>□ Set up AgentCore On-Demand evaluation<br>□ Integrate DeepEval in CI/CD pipeline<br>□ Configure CloudWatch alarms<br>□ Test full pipeline end-to-end<br>—<br>WEEK 4  LAUNCH READINESS<br>□ Run full pre-deployment benchmark suite<br>□ All metrics above thresholds<br>□ Enable AgentCore Online Evaluations<br>□ Activate Phoenix drift monitors<br>□ Brief on-call team with playbooks<br>□ Set up weekly evaluation review meeting<br><!-- End of picture text -->

## APPENDIX: STANDARD METRICS REFERENCE TABLE


![Figure 20](/img/ai-development/ai-dev-p34-20.png)


<!-- Start of picture text -->
┌─────────────────────────────────────────────────────────────────────────┐<br>│              COMPLETE METRIC QUICK REFERENCE                            │<br>│ │<br>│  Metric Name           │ Target │ Alert │ Framework          │ Type  │<br>────────────────────── ──────── ───────── ──────────────────── ──────<br>│ ┼ ┼ ┼ ┼ │<br>│  Helpfulness │ ≥0.80 │ <0.75 │ AgentCore Built-in │ Judge │<br>│  Correctness │ ≥0.82 │ <0.70 │ AgentCore / GEval  │ Judge │<br>│  Groundedness │ ≥0.85 │ <0.75 │ AgentCore Built-in │ Judge │<br>│  Tool Select Accuracy │ ≥0.90 │ <0.80 │ AgentCore Built-in │ Judge │<br>│  Tool Param Accuracy │ ≥0.88 │ <0.78 │ AgentCore Built-in │ Judge │<br>│  Task Success Rate     │ ≥0.75 │ <0.60 │ Custom / DAG       │ Binary│<br>│  Faithfulness (RAG) │ ≥0.85 │ <0.75 │ RAGAS              │ Judge │<br>│  Context Precision │ ≥0.80 │ <0.70 │ RAGAS              │ Embed │<br>│  Context Recall        │ ≥0.80 │ <0.70 │ RAGAS              │ Judge │<br>│  Answer Relevancy │ ≥0.82 │ <0.72 │ RAGAS              │ Embed │<br><!-- End of picture text -->

|│HallucinationRate│ ≤0.10 │ >0.20 │Phoenix /DeepEval│Judge│<br>│Toxicity │ ≤0.01 │ >0.05 │DeepEval│Judge│<br>│LatencyP95 (ms) │ ≤2000 │ >3000 │CloudWatch│Infra│<br>│ErrorRate│ ≤0.5% │ >1% │CloudWatch│Infra│<br>│InputEmbed Drift │ ≤0.08 │ >0.15 │Phoenix /Arize│Stat │<br>│Cost perSession ($) │ ≤$0.05 │ >$0.10 │CloudWatch│Infra│<br>└─────────────────────────────────────────────────────────────────────────┘|
|---|



Guide Version: 1.0 | Stack: AWS Bedrock AgentCore (GA 2026) + Strands + Arize Phoenix Maintained by: AI Platform Team | Review Cycle: Quarterly
