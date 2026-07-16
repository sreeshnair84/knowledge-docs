---
title: "Part 08 — AI SOC Observability & Evaluation"
date: 2026-07-16
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["observability", "opentelemetry", "langfuse", "arize", "evaluation", "drift", "kpis"]
---

# Part 08 — AI SOC Observability & Evaluation

**Audience:** Platform Engineers, SREs, SOC Data Scientists
**Related:** [Part 06 — AI Models](./part-06-ai-models.md) | [Part 12 — FinOps](./part-12-finops.md)

---

## 1. What to Observe in AI SOC

### Traditional SOC Observability vs. AI SOC Observability

| Layer | Traditional SOC | AI SOC Addition |
|-------|----------------|-----------------|
| Infrastructure | CPU, memory, disk, network | GPU utilization, inference latency, queue depth |
| Application | Alert queue depth, ticket SLAs | Token usage, model calls per minute, cost per alert |
| Business | MTTD, MTTR, FPR | AI accuracy, analyst override rate, confidence calibration |
| Security | Unauthorized access, config drift | Prompt injection attempts, jailbreak attempts, model behavior drift |

### The Four Observability Pillars for AI SOC

```
1. PROMPT TELEMETRY
   Every LLM request and response captured:
   - Prompt (sanitized — PII redacted)
   - Response
   - Token count (input + output + cached)
   - Latency (time-to-first-token, total)
   - Model version
   - Agent ID
   - Incident correlation ID

2. AGENT TELEMETRY
   Every agent action traced:
   - Tool calls (name, inputs, outputs, latency)
   - Decision points and reasoning
   - Human approval requests and outcomes
   - Escalations
   - Errors and retries

3. QUALITY METRICS
   AI decision quality tracked:
   - Verdict accuracy vs. analyst override
   - Confidence calibration (does 80% confidence = 80% accuracy?)
   - Hallucination rate (claims not supported by evidence)
   - False positive rate
   - False negative rate (most critical for security)

4. COST METRICS
   AI spending tracked:
   - Tokens per alert (input / output / cached)
   - Cost per alert by model
   - Cost per incident
   - Token efficiency trend (improving with prompt optimization?)
```

---

## 2. Observability Tools Comparison

| Tool | Type | Best For | Pricing | Self-Hosted |
|------|------|---------|---------|-------------|
| **Langfuse** | Open-source LLM obs | Full-stack LLM tracing, eval pipelines | Free (OSS) / $49+/mo SaaS | Yes |
| **Arize Phoenix** | LLM + ML obs | Embedding drift, AI quality | Free (OSS) / Custom SaaS | Yes |
| **OpenTelemetry AI** | Standard | Vendor-neutral traces | Free | Yes |
| **MLflow** | ML lifecycle | Model registry + experiment tracking | Free / Managed | Yes |
| **Grafana + Prometheus** | Infrastructure | Infra + custom LLM metrics | Free / Cloud | Yes |
| **Azure Monitor + AppInsights** | Azure-native | Azure OpenAI + Sentinel | Azure consumption | No |
| **AWS CloudWatch + X-Ray** | AWS-native | Bedrock + AgentCore traces | AWS consumption | No |
| **Datadog LLM Obs** | Commercial | Full-stack with APM | $18+/host/mo | No |
| **Helicone** | LLM gateway obs | Caching + cost tracking | $0.0002/req | No |

### Langfuse Integration Pattern

```python
from langfuse import Langfuse
from langfuse.decorators import observe, langfuse_context
import anthropic

langfuse = Langfuse(
    public_key="pk-lf-...",
    secret_key="sk-lf-...",
    host="https://langfuse.security.company.com"  # Self-hosted
)

@observe(name="alert_triage", capture_input=True, capture_output=True)
async def triage_alert(alert: dict, incident_id: str) -> dict:
    """AI alert triage with full Langfuse observability."""
    
    # Add incident correlation to trace
    langfuse_context.update_current_trace(
        metadata={
            "incident_id": incident_id,
            "alert_type": alert.get("type"),
            "alert_severity": alert.get("severity"),
            "asset_criticality": alert.get("asset_criticality")
        },
        tags=["triage", "production"]
    )
    
    client = anthropic.Anthropic()
    
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system="You are a SOC triage analyst...",
        messages=[{"role": "user", "content": f"Triage: {json.dumps(alert)}"}]
    )
    
    result = json.loads(response.content[0].text)
    
    # Score the trace for quality monitoring
    langfuse_context.score_current_trace(
        name="analyst_agreement",
        value=None,  # Set later when analyst reviews
        comment="Pending analyst review"
    )
    
    return result
```

---

## 3. Distributed Tracing for Multi-Agent SOC

### OpenTelemetry Semantic Conventions for AI

```python
from opentelemetry import trace
from opentelemetry.semconv.ai import SpanAttributes

tracer = trace.get_tracer("soc-agents")

async def investigate_with_tracing(incident: Incident) -> InvestigationResult:
    """Multi-agent investigation with distributed tracing."""
    
    with tracer.start_as_current_span(
        "soc.investigation",
        attributes={
            "incident.id": incident.id,
            "incident.severity": incident.severity,
            "incident.type": incident.type
        }
    ) as root_span:
        
        # Triage agent span
        with tracer.start_as_current_span("soc.triage") as triage_span:
            triage_span.set_attribute(SpanAttributes.LLM_REQUEST_MODEL, "claude-sonnet-4-6")
            triage_span.set_attribute(SpanAttributes.LLM_REQUEST_MAX_TOKENS, 1024)
            
            triage_result = await triage_agent.analyze(incident)
            
            triage_span.set_attribute(SpanAttributes.LLM_USAGE_TOTAL_TOKENS, 
                                       triage_result.token_usage.total)
            triage_span.set_attribute("soc.triage.verdict", triage_result.verdict)
            triage_span.set_attribute("soc.triage.confidence", triage_result.confidence)
        
        # Investigation agent span (child of root)
        if triage_result.verdict == "TRUE_POSITIVE":
            with tracer.start_as_current_span("soc.investigation") as inv_span:
                investigation = await investigation_agent.investigate(
                    incident, triage_result
                )
                inv_span.set_attribute("soc.investigation.techniques_found",
                                       len(investigation.mitre_techniques))
        
        return InvestigationResult(triage=triage_result, investigation=investigation)
```

### Correlation ID Propagation

```python
class InvestigationTracer:
    """Propagates correlation IDs across agent boundaries."""
    
    def create_context(self, incident_id: str) -> TraceContext:
        return TraceContext(
            trace_id=generate_trace_id(),
            incident_id=incident_id,
            created_at=datetime.utcnow(),
            parent_span_id=None
        )
    
    def get_agent_headers(self, context: TraceContext, agent_id: str) -> dict:
        """Get HTTP headers for agent-to-agent calls with trace propagation."""
        return {
            "X-Trace-ID": context.trace_id,
            "X-Incident-ID": context.incident_id,
            "X-Span-ID": generate_span_id(),
            "X-Parent-Span": context.parent_span_id,
            "X-Agent-ID": agent_id,
            "traceparent": context.to_w3c_traceparent()
        }
```

---

## 4. Evaluation Pipelines

### Security-Specific Evaluation Metrics

```python
class SOCEvaluationPipeline:
    """Continuously evaluate AI SOC quality."""
    
    async def run_evaluation_cycle(self) -> EvaluationReport:
        """Run weekly evaluation against ground truth."""
        
        # Get past week's AI decisions with analyst ground truth
        decisions = await self.db.get_decisions_with_ground_truth(
            days=7, 
            status="analyst_reviewed"
        )
        
        metrics = {
            # Classification accuracy
            "precision": self._precision(decisions),
            "recall": self._recall(decisions),  # Never miss real threats
            "f1": self._f1(decisions),
            "false_positive_rate": self._fpr(decisions),
            "false_negative_rate": self._fnr(decisions),  # Critical — missed threats
            
            # Confidence calibration (Expected Calibration Error)
            "calibration_ece": self._expected_calibration_error(decisions),
            
            # Investigation quality (requires human scoring)
            "investigation_completeness": await self._score_investigation_completeness(decisions),
            "mitre_mapping_accuracy": await self._validate_mitre_mappings(decisions),
            
            # Speed
            "avg_triage_latency_ms": self._avg_latency(decisions),
            "p95_triage_latency_ms": self._p95_latency(decisions),
            
            # Cost efficiency
            "avg_tokens_per_alert": self._avg_tokens(decisions),
            "cost_per_alert_usd": self._avg_cost(decisions),
            
            # Human-AI interaction
            "analyst_override_rate": self._override_rate(decisions),
            "analyst_agreement_rate": 1 - self._override_rate(decisions)
        }
        
        # Alert if metrics degrade beyond threshold
        await self._check_degradation_alerts(metrics)
        
        return EvaluationReport(metrics=metrics, period="last_7_days")
    
    def _expected_calibration_error(self, decisions: list) -> float:
        """
        Measure confidence calibration.
        Perfect calibration: 80% confident predictions are correct 80% of the time.
        ECE < 0.10 is considered well-calibrated.
        """
        n_bins = 10
        total_ece = 0
        
        for bin_idx in range(n_bins):
            bin_min = bin_idx / n_bins
            bin_max = (bin_idx + 1) / n_bins
            
            bin_decisions = [d for d in decisions 
                           if bin_min <= d.confidence/100 < bin_max]
            
            if not bin_decisions:
                continue
            
            bin_accuracy = sum(1 for d in bin_decisions if d.correct) / len(bin_decisions)
            bin_confidence = sum(d.confidence/100 for d in bin_decisions) / len(bin_decisions)
            
            total_ece += (len(bin_decisions) / len(decisions)) * abs(bin_accuracy - bin_confidence)
        
        return total_ece
```

### LLM-as-Judge for Investigation Quality

```python
async def evaluate_investigation_quality(
    investigation: InvestigationReport,
    ground_truth: GroundTruth
) -> QualityScore:
    """Use LLM to evaluate investigation quality against ground truth."""
    
    evaluation_prompt = f"""
    You are evaluating the quality of an AI security investigation report.
    
    AI INVESTIGATION REPORT:
    {investigation.to_text()}
    
    GROUND TRUTH (verified by expert):
    {ground_truth.to_text()}
    
    Evaluate on these dimensions (score 0-10 each):
    
    1. COMPLETENESS: Did the AI identify all key events and findings?
    2. ACCURACY: Were the identified techniques and timeline correct?
    3. MITRE MAPPING: Were ATT&CK techniques correctly identified?
    4. SEVERITY ASSESSMENT: Was the business impact correctly assessed?
    5. RECOMMENDATIONS: Were the recommended actions appropriate?
    
    Return JSON: {{"completeness": X, "accuracy": X, "mitre": X, "severity": X, "recommendations": X, "overall": X, "explanation": "..."}}
    """
    
    response = await evaluator_llm.generate(evaluation_prompt)
    return QualityScore.model_validate_json(response)
```

---

## 5. Drift Detection

### Types of Drift in AI SOC

| Drift Type | Definition | Detection Method | Impact |
|-----------|-----------|-----------------|--------|
| **Data drift** | Alert distribution changes (new attack patterns) | Statistical KS-test on alert features | Model accuracy degrades for new patterns |
| **Concept drift** | Relationship between inputs and labels changes | Monitor analyst override rate over time | Model gives wrong answers for evolved threats |
| **Model drift** | Model performance degrades without input changes | Track accuracy metrics over rolling window | False negatives increase |
| **Embedding drift** | Vector space distribution shifts | Monitor embedding distance over time | RAG retrieval quality degrades |

### Drift Detection Implementation

```python
class DriftMonitor:
    def __init__(self, baseline_window_days: int = 30, alert_threshold: float = 0.05):
        self.baseline_window = baseline_window_days
        self.threshold = alert_threshold
    
    async def check_data_drift(self) -> DriftReport:
        """Kolmogorov-Smirnov test on alert feature distributions."""
        from scipy.stats import ks_2samp
        
        # Baseline: last 30 days
        baseline = await self.db.get_alert_features(days=self.baseline_window)
        # Current: last 7 days
        current = await self.db.get_alert_features(days=7)
        
        drift_signals = {}
        for feature in ["alert_severity", "ioc_score", "asset_criticality"]:
            statistic, p_value = ks_2samp(baseline[feature], current[feature])
            drift_signals[feature] = {
                "ks_statistic": statistic,
                "p_value": p_value,
                "drift_detected": p_value < self.threshold
            }
        
        if any(s["drift_detected"] for s in drift_signals.values()):
            await self.alert("DATA_DRIFT", drift_signals)
        
        return DriftReport(signals=drift_signals)
    
    async def check_accuracy_drift(self, window_days: int = 7) -> AccuracyDrift:
        """Detect degradation in AI accuracy over time."""
        
        weekly_accuracy = []
        for week in range(12):  # Last 12 weeks
            week_decisions = await self.db.get_week_decisions(weeks_ago=week)
            if week_decisions:
                accuracy = sum(1 for d in week_decisions if d.correct) / len(week_decisions)
                weekly_accuracy.append(accuracy)
        
        # Alert if current week accuracy drops >5% from 12-week average
        baseline_accuracy = sum(weekly_accuracy[1:]) / len(weekly_accuracy[1:])
        current_accuracy = weekly_accuracy[0]
        
        if baseline_accuracy - current_accuracy > 0.05:
            await self.alert("ACCURACY_DRIFT", {
                "baseline": baseline_accuracy,
                "current": current_accuracy,
                "degradation": baseline_accuracy - current_accuracy
            })
```

---

## 6. SOC KPI Dashboards

### Real-Time Dashboard Panels

```
┌─────────────────────────────────────────────────────────────────┐
│              AI SOC REAL-TIME DASHBOARD                         │
├──────────────────┬──────────────────┬───────────────────────────┤
│  ALERT QUEUE     │  AI PERFORMANCE  │  COST TODAY               │
│                  │                  │                           │
│  Queued: 47      │  Accuracy: 92.3% │  Tokens: 4.2M             │
│  AI Processing: 8│  FPR: 9.1%       │  Cost: $127.40            │
│  Awaiting Human: 3│ Avg Latency: 18s │  Per Alert: $0.42         │
│  P1 Open: 2      │  Conf. ECE: 0.08 │  Budget: 67% of daily    │
├──────────────────┴──────────────────┴───────────────────────────┤
│  MTTD TREND (7 days)    │  ANALYST OVERRIDE RATE               │
│                          │                                      │
│  Today: 18 min ▼ -23%   │  Override: 8.3% (target <10%)       │
│  Yesterday: 23 min       │  Top overridden: PowerShell alerts   │
│  7-day avg: 21 min       │  Agreement rate: 91.7%              │
├──────────────────────────┴──────────────────────────────────────┤
│  ACTIVE INVESTIGATIONS   │  AGENT HEALTH                       │
│                          │                                      │
│  INC-2026-0847: P1 Active│  Triage Agent: ✓ Healthy (3 pods)  │
│  INC-2026-0823: Contained│  Invest Agent: ✓ Healthy (2 pods)  │
│  INC-2026-0801: Closed   │  IR Agent: ✓ Healthy (1 pod)       │
│                          │  TI Agent: ⚠ High latency          │
└──────────────────────────┴──────────────────────────────────────┘
```

### Grafana Dashboard Configuration

```yaml
# grafana-soc-dashboard.yaml
dashboards:
  - title: "AI SOC Operations"
    panels:
      - title: "Triage Accuracy (7-day rolling)"
        type: stat
        query: |
          sum(soc_triage_correct_total) /
          sum(soc_triage_total) * 100
        thresholds:
          - value: 90
            color: green
          - value: 85
            color: yellow
          - value: 80
            color: red
      
      - title: "AI False Negative Rate"
        type: gauge
        query: |
          sum(soc_triage_false_negative_total) /
          sum(soc_triage_total) * 100
        thresholds:
          - value: 1
            color: green
          - value: 3
            color: yellow
          - value: 5
            color: red
        note: "False negatives = missed threats — keep <1%"
      
      - title: "Token Cost per Alert (daily avg)"
        type: timeseries
        query: |
          rate(soc_llm_cost_usd_total[1d]) /
          rate(soc_alerts_processed_total[1d])
        unit: "$"
```

---

## 7. AI Quality Gates for Production Deployment

```python
class AIProductionReadinessGate:
    """Quality gates that must pass before deploying new model version."""
    
    MINIMUM_THRESHOLDS = {
        "precision": 0.88,           # TP / (TP + FP)
        "recall": 0.95,              # TP / (TP + FN) — high bar for security
        "false_negative_rate": 0.05, # <5% missed threats
        "calibration_ece": 0.10,     # Confidence is well-calibrated
        "p95_latency_ms": 30000,     # 30 seconds max for p95
        "prompt_injection_resistance": 0.99,  # 99% injection detection
    }
    
    async def evaluate_before_deployment(
        self, 
        new_model: str,
        eval_dataset: EvaluationDataset
    ) -> DeploymentDecision:
        
        results = await self.run_full_evaluation(new_model, eval_dataset)
        
        failures = []
        for metric, minimum in self.MINIMUM_THRESHOLDS.items():
            actual = results.metrics.get(metric, 0)
            if metric in ["p95_latency_ms"]:  # Higher is worse
                if actual > minimum:
                    failures.append(f"{metric}: {actual:.2f} > {minimum}")
            else:
                if actual < minimum:
                    failures.append(f"{metric}: {actual:.2f} < {minimum}")
        
        if failures:
            return DeploymentDecision(
                approved=False,
                reason=f"Quality gate failures: {failures}",
                recommendation="Investigate failures before deployment"
            )
        
        return DeploymentDecision(
            approved=True,
            metrics=results.metrics
        )
```

---

*Next: [Part 09 — Enterprise Architecture Integration →](./part-09-enterprise-architecture.md)*
