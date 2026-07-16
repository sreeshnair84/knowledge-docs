---
title: "AI FinOps — Capacity Planning & Cost Forecasting"
date: 2026-07-14
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
covers_version: "as of July 2026"
doc_type: guide
source_type: native-md
source_file: ""
tags: ["ai-finops", "capacity-planning", "cost-forecasting", "token-forecasting", "gpu-capacity", "demand-modeling", "tco", "roi", "scenario-modeling"]
---

# AI FinOps — Capacity Planning & Cost Forecasting

> **Current as of July 2026.** AI cost forecasting is not a spreadsheet exercise — it requires modeling stochastic token consumption, non-linear agent cost amplification, embedding growth curves, and GPU utilization dynamics simultaneously. This guide provides the frameworks and models to do that reliably.

**Related guides:**
- [AI FinOps Unit Economics & KPIs](./ai-finops-unit-economics-kpis.md) — ROI and TCO frameworks
- [Multi-Agent Cost Propagation](./ai-finops-multi-agent-cost-propagation.md) — agent cost amplification factors
- [AI Tokenomics](../../ai-economics/ai-tokenomics-guide.md) — token mechanics and batch economics

---

## Why AI Forecasting Fails

Most enterprises underestimate AI costs by 3–10× in their first year. The root causes are structural:

| Forecasting Failure | Root Cause | Fix |
|---|---|---|
| Token volume underestimated | Modeled chat sessions, missed agent amplification | Use per-workflow token profiles, not per-request averages |
| Flat cost curve assumed | Used per-token price without modeling caching, routing, or scale discounts | Model the optimization stack, not raw pricing |
| Infrastructure ignored | Only modeled inference tokens; missed vector DB, gateway, eval, HITL | Use full TCO model (10 cost categories) |
| Growth compounding missed | Linear volume × price; missed agent count growth + context window growth | Model exponential growth curves for agentic workloads |
| No scenario modeling | Single-point estimate; no P90 or stress scenarios | Produce P50/P90/Stress scenarios for all major cost drivers |

---

## Part 1 — Token Consumption Forecasting

### The Token Demand Model

Token demand has three compounding components:

```
Monthly Token Volume =
    User_Volume × Avg_Tokens_per_Session
  + Agent_Volume × Avg_Tokens_per_Workflow × Amplification_Factor
  + Background_Volume (eval + monitoring + batch enrichment)

Where:
  Amplification_Factor = multi-agent overhead multiplier (see Multi-Agent Cost Propagation guide)
  Typical values: 3× (simple orchestration) to 15× (complex multi-agent with tools)
```

### Token Forecasting Spreadsheet Model

```python
from dataclasses import dataclass
from typing import Optional
import math

@dataclass
class WorkflowTokenProfile:
    name: str
    daily_volume: float            # workflow executions per day
    input_tokens_p50: int          # median input tokens per execution
    input_tokens_p90: int          # p90 input tokens (for stress scenarios)
    output_tokens_p50: int
    output_tokens_p90: int
    amplification_factor: float    # 1.0 for single-agent, 3–15 for multi-agent
    cache_hit_rate: float          # 0.0–1.0
    growth_rate_monthly: float     # expected monthly volume growth (0.1 = 10%/month)


def forecast_monthly_tokens(
    profiles: list[WorkflowTokenProfile],
    months_ahead: int,
    scenario: str = "p50",  # "p50" | "p90" | "stress"
) -> list[dict]:
    """Forecast total token consumption for N months ahead."""
    stress_multiplier = {"p50": 1.0, "p90": 1.4, "stress": 2.0}[scenario]
    results = []

    for month in range(months_ahead):
        total_input = 0
        total_output = 0
        total_cached = 0

        for p in profiles:
            # Apply compound monthly growth
            volume = p.daily_volume * 30 * (1 + p.growth_rate_monthly) ** month

            # Use scenario-appropriate token estimates
            input_t = p.input_tokens_p50 if scenario == "p50" else p.input_tokens_p90
            output_t = p.output_tokens_p50 if scenario == "p50" else p.output_tokens_p90

            # Apply amplification and stress multiplier
            gross_input = volume * input_t * p.amplification_factor * stress_multiplier
            gross_output = volume * output_t * p.amplification_factor * stress_multiplier

            # Cached tokens reduce billed input
            cached_input = gross_input * p.cache_hit_rate
            billed_input = gross_input - cached_input

            total_input += billed_input
            total_output += gross_output
            total_cached += cached_input

        results.append({
            "month": month + 1,
            "scenario": scenario,
            "billed_input_tokens": int(total_input),
            "output_tokens": int(total_output),
            "cached_tokens": int(total_cached),
            "total_gross_tokens": int(total_input + total_output + total_cached),
        })

    return results
```

### Token Demand Patterns by Workflow Type

| Workflow Type | Token Profile | Growth Driver | Seasonality |
|---|---|---|---|
| Customer support chatbot | Low variance; 1,500–3,000 tokens/session | User adoption | Business hours peak |
| Code review agent | Medium variance; 5,000–20,000 tokens/PR | PR volume (dev cadence) | Sprint cycles; release pressure |
| Document processing | High variance; 2,000–50,000 tokens/doc | Document volume | End-of-quarter reporting spikes |
| Research synthesis agent | Very high variance; 20,000–200,000 tokens | Analyst headcount using it | Project-driven |
| Fraud detection | Low variance; 500–2,000 tokens/transaction | Transaction volume | Payment season peaks |
| Compliance reporting | Episodic; very high per-run | Regulatory calendar | Quarterly; year-end heavy |

### Forecasting with Growth Curves

Linear extrapolation fails for AI. Agent workloads follow S-curve adoption:

```
Phase 1 — Exploration (Month 1–3):     Low volume, high per-token cost (no optimization)
Phase 2 — Adoption (Month 4–9):        Rapid volume growth; optimization begins
Phase 3 — Scale (Month 10–18):         Volume stabilizes; optimization matures; unit cost falls
Phase 4 — Optimization (Month 18+):    Caching, routing, compression reduce unit cost 40–70%

Cost Curve:
  Total Cost = Volume_curve × Unit_cost_curve

  Volume:     Exponential growth (adoption phase) → S-curve flattening
  Unit Cost:  Initial high → falls as optimization stack deployed

  The net cost curve is non-obvious and must be modeled explicitly.
```

---

## Part 2 — GPU Demand Forecasting

### Self-Hosted Inference GPU Sizing

For organizations running their own inference infrastructure (on-prem or dedicated cloud GPU):

```
GPU Capacity Required (H100 equivalents) =
    Peak_Requests_per_Second
    × Avg_Latency_Target_seconds
    × Tokens_per_Request
    / Tokens_per_Second_per_GPU
    × Safety_Buffer

Where:
  Safety Buffer: 1.3–1.5 (30–50% headroom above measured peak)
  Tokens_per_Second_per_GPU (H100, 80GB):
    Llama 3 70B (fp16):   ~1,200 tokens/sec
    Llama 3 70B (int8):   ~2,000 tokens/sec  
    Llama 3 8B (fp16):    ~4,500 tokens/sec
    Llama 3 8B (int4):    ~8,000 tokens/sec
```

### GPU Demand Planning Matrix

| Token Volume (Monthly) | Recommended Config | GPU Count | Monthly Infra Cost |
|---|---|---|---|
| <100M tokens | API-only (no self-hosted) | 0 | API billing only |
| 100M–1B tokens | Single GPU cluster (small) | 2–4 × H100 | $15K–$30K |
| 1B–10B tokens | Medium cluster with autoscaling | 8–16 × H100 | $60K–$120K |
| 10B–100B tokens | Large cluster, MIG partitioning | 32–128 × H100 | $240K–$960K |
| >100B tokens | Multi-cluster, multi-region | 128+ × H100 | $960K+ |

**GPU economics vs. API pricing crossover:**

```
API pricing (Claude Sonnet): $3/M input + $15/M output
Self-hosted equivalent (Llama 70B, amortized H100 cost):
  H100 at $3.50/hr, 1,200 tokens/sec output = 4.32B tokens/day
  Cost per day: $3.50 × 24 = $84
  Cost per 1M output tokens: $84 / 4,320 = $0.019/1M tokens

Crossover analysis:
  At $3/M input tokens (API), API wins until very high volume
  At $15/M output tokens (API), self-hosted wins at ~500M output tokens/month
  API win zone: <200M output tokens/month (most enterprises in 2026)
  Self-hosted win zone: >500M output tokens/month with consistent baseline demand
```

### GPU Reservation Strategy

| Option | Cost Profile | Best For | Risk |
|---|---|---|---|
| On-demand GPU | +100–200% vs reserved | Dev/test; spike handling | Availability risk in high-demand periods |
| 1-year reserved | Baseline cost | Stable production baseline | Underutilization risk |
| 3-year reserved | −40–60% vs on-demand | Long-term stable workloads | Technology lock-in |
| Spot instances | −60–90% vs on-demand | Batch inference; tolerant workloads | Interruption risk |
| Committed use (GCP) | −30–57% vs on-demand | GCP workloads | Regional commitment |

**Hybrid reservation strategy:**
- Reserve capacity for 60–70% of baseline demand (3-year reserved → lowest cost)
- On-demand for 20–30% of standard variable demand
- Spot for 100% of batch/eval workloads (accept interruption)
- On-demand buffer for spikes (never spot for latency-sensitive prod)

---

## Part 3 — Cost Forecasting Models

### 12-Month Cost Forecast Structure

```python
@dataclass
class AICostForecast:
    """12-month AI cost forecast with three scenarios."""

    # Month 1 baselines (actual or estimated)
    m1_inference_cost: float
    m1_platform_cost: float      # gateway, vector DB, observability
    m1_human_oversight_cost: float
    m1_eval_cost: float
    m1_storage_cost: float

    # Growth rates (monthly)
    inference_volume_growth: float   # e.g., 0.15 = 15%/month
    unit_cost_improvement: float     # e.g., -0.05 = 5% monthly reduction from optimization
    platform_scale_factor: float     # e.g., 0.7 = 70% of inference growth (sub-linear)
    hitl_reduction: float            # e.g., -0.03 = 3%/month as automation matures

    def project(self, months: int = 12) -> list[dict]:
        results = []
        inference = self.m1_inference_cost
        platform = self.m1_platform_cost
        hitl = self.m1_human_oversight_cost
        eval_cost = self.m1_eval_cost
        storage = self.m1_storage_cost

        for m in range(1, months + 1):
            # Inference: grows with volume but unit cost falls
            volume_factor = (1 + self.inference_volume_growth) ** (m - 1)
            cost_factor = (1 + self.unit_cost_improvement) ** (m - 1)
            monthly_inference = self.m1_inference_cost * volume_factor * cost_factor

            # Platform scales sub-linearly with inference
            monthly_platform = self.m1_platform_cost * (volume_factor ** self.platform_scale_factor)

            # HITL reduces as automation matures
            monthly_hitl = self.m1_human_oversight_cost * (1 + self.hitl_reduction) ** (m - 1)

            # Eval: grows proportionally to new use cases (slower than inference)
            monthly_eval = self.m1_eval_cost * (volume_factor ** 0.6)

            # Storage: grows steadily (embedding accumulation)
            monthly_storage = self.m1_storage_cost * (1.08 ** (m - 1))  # 8%/month typical

            total = monthly_inference + monthly_platform + monthly_hitl + monthly_eval + monthly_storage

            results.append({
                "month": m,
                "inference": round(monthly_inference, 0),
                "platform": round(monthly_platform, 0),
                "hitl": round(monthly_hitl, 0),
                "eval": round(monthly_eval, 0),
                "storage": round(monthly_storage, 0),
                "total": round(total, 0),
            })

        return results
```

### Reference Forecast: Mid-Size Enterprise (Year 1)

Starting point: 3 production AI workflows, $15K/month Month 1 spend.

| Month | Inference | Platform | HITL | Eval | Storage | **Total** |
|---|---|---|---|---|---|---|
| 1 | $9,000 | $3,000 | $2,000 | $750 | $250 | **$15,000** |
| 3 | $11,700 | $3,600 | $1,840 | $850 | $295 | **$18,285** |
| 6 | $16,200 | $4,500 | $1,620 | $1,050 | $363 | **$23,733** |
| 9 | $22,500 | $5,700 | $1,430 | $1,300 | $458 | **$31,388** |
| 12 | $31,200 | $7,200 | $1,260 | $1,600 | $579 | **$41,839** |

**12-month cumulative: ~$320,000**  
**Year 2 run rate: ~$500K–$600K** (new use cases launching in months 10–14)

---

## Part 4 — TCO Model

### The Full AI TCO Stack

TCO extends beyond inference tokens to the complete platform cost:

```
Annual AI TCO =
  INFERENCE COSTS
    + (token_volume × blended_rate × (1 - cache_hit_rate × cache_discount))
    + reserved_capacity_commitment (if self-hosted)

  PLATFORM INFRASTRUCTURE
    + ai_gateway_hosting
    + vector_database_annual
    + embedding_service (if separate from inference)
    + memory_service
    + agent_runtime_infrastructure
    + mcp_server_hosting

  EVALUATION & QUALITY
    + eval_inference_cost (at batch pricing)
    + human_evaluation_cost (HITL reviewers)
    + red_team_program
    + quality_benchmark_tooling

  OBSERVABILITY & COMPLIANCE
    + otel_backend_hosting
    + log_storage_and_retention
    + trace_analysis_tooling
    + compliance_audit_tooling
    + security_scanning

  DATA & KNOWLEDGE
    + vector_storage_growth (embeddings accumulate)
    + document_store
    + knowledge_refresh_pipeline
    + data_labeling_and_preparation

  PLATFORM ENGINEERING
    + ai_platform_team_headcount (fully-loaded)
    + tooling_licenses
    + vendor_support_contracts

  CHANGE & ADOPTION
    + training_programs
    + internal_consulting
    + change_management
```

### TCO Case Studies

#### Case Study 1: 500-Agent Enterprise Deployment

| Category | Monthly Cost | % of Total |
|---|---|---|
| Inference tokens (with 45% cache hit) | $28,000 | 37% |
| Human-in-the-loop reviews (12% review rate) | $12,000 | 16% |
| Evaluation infrastructure (batch) | $6,500 | 9% |
| Platform infrastructure (gateway, vector DB) | $5,500 | 7% |
| Observability (OTel + storage) | $4,000 | 5% |
| AI platform engineering (pro-rated headcount) | $9,000 | 12% |
| Safety tooling + red-team | $3,500 | 5% |
| Data preparation and labeling | $4,000 | 5% |
| Licensing (tools + vendor support) | $2,500 | 3% |
| **Total** | **$75,500** | **100%** |

**Key insight:** Inference tokens = 37% of TCO. The remaining 63% is invisible in most first-year budgets.

#### Case Study 2: 10-Workflow RAG Application

| Category | Monthly Cost | % of Total |
|---|---|---|
| LLM inference (RAG augmented) | $12,000 | 40% |
| Vector database (Pinecone/Weaviate) | $3,000 | 10% |
| Embedding generation (query-time) | $800 | 3% |
| Indexing pipeline compute | $1,200 | 4% |
| AI gateway | $1,500 | 5% |
| Observability | $2,000 | 7% |
| Platform engineering (pro-rated) | $5,500 | 18% |
| Knowledge refresh pipeline | $1,000 | 3% |
| HITL content review | $3,000 | 10% |
| **Total** | **$30,000** | **100%** |

---

## Part 5 — ROI Forecasting

### The AI Investment ROI Framework

```
Net ROI over Period T =
    Σ(Value_Generated_t - AI_Cost_t) / Initial_Investment

Value_Generated_t includes:
  + Labor cost displaced (FTE reduction or redeployment)
  + Error cost avoided (bugs caught, fraud prevented, compliance saved)
  + Revenue impact (faster time-to-market, improved customer experience)
  + Opportunity cost freed (teams redirected to higher-value work)
  - Productivity loss during adoption (learning curve)
```

### NPV Model for AI Platform Investment

```python
def calculate_ai_npv(
    initial_investment: float,       # Platform build + Year 1 engineering
    annual_ai_cost: list[float],     # AI operating cost per year [Y1, Y2, Y3, Y4, Y5]
    annual_value: list[float],       # Business value generated per year
    discount_rate: float = 0.10,     # Typical enterprise hurdle rate: 8–12%
) -> dict:
    """Calculate NPV and payback period for AI investment."""
    assert len(annual_ai_cost) == len(annual_value), "Matching arrays required"

    npv = -initial_investment
    cumulative_net = -initial_investment
    payback_year = None

    yearly_details = []
    for year, (cost, value) in enumerate(zip(annual_ai_cost, annual_value), start=1):
        net_benefit = value - cost
        discounted = net_benefit / (1 + discount_rate) ** year
        npv += discounted
        cumulative_net += net_benefit

        if cumulative_net >= 0 and payback_year is None:
            payback_year = year

        yearly_details.append({
            "year": year,
            "ai_cost": cost,
            "value_generated": value,
            "net_benefit": net_benefit,
            "discounted_benefit": discounted,
            "cumulative_net": cumulative_net,
        })

    return {
        "npv": round(npv, 0),
        "payback_year": payback_year,
        "5_year_roi_pct": round((npv + initial_investment) / initial_investment * 100, 1),
        "yearly": yearly_details,
    }
```

### Reference ROI Scenarios

**Scenario A: Customer Support Automation (500-agent enterprise)**

| Year | AI Operating Cost | Value Generated | Net Benefit |
|---|---|---|---|
| 1 | $906K | $1.8M | $894K |
| 2 | $1.1M | $3.2M | $2.1M |
| 3 | $1.2M | $4.5M | $3.3M |
| 4 | $1.3M | $5.2M | $3.9M |
| 5 | $1.4M | $5.8M | $4.4M |

Initial platform investment: $2.5M  
**5-Year NPV @ 10%: $9.2M**  
**Payback: Year 2**  
**5-Year ROI: 368%**

---

## Part 6 — Scenario Modeling

### Three-Scenario Framework

Every AI capacity plan should have three scenarios:

| Scenario | Volume Assumption | Unit Cost Assumption | Use For |
|---|---|---|---|
| **Conservative (P50)** | Historical growth rate | Moderate optimization achieved | Internal planning baseline |
| **Optimistic (P90)** | 2× historical growth | Full optimization stack deployed | Investor/board narrative |
| **Stress (Worst Case)** | 3× growth + optimization fails | Raw API pricing, no caching | Risk/procurement reserves |

**Stress scenario triggers to model:**
- Agent runaway loop (single session burns $5K before circuit breaker)
- Provider price increase (10–25% increase quarter-over-quarter)
- Context window inflation (average tokens per session doubles unexpectedly)
- Adoption surge (new use case 5× expected scale in first month)
- Quality degradation → HITL rate spikes from 10% to 40%

### Sensitivity Analysis

Identify which cost drivers have the highest leverage:

```
Cost Sensitivity (% change in total cost per 1% change in driver):

Cache hit rate:         −0.25% cost per +1% cache hit
Model tier distribution: −0.40% cost per +1% traffic to budget tier
Agent amplification:    +0.35% cost per +1% amplification factor
HITL rate:              +0.19% cost per +1% human review rate
Token volume growth:    +0.85% cost per +1% volume growth
Output token length:    +0.30% cost per +1% avg output tokens

→ Model tier distribution and cache hit rate are highest-leverage
  optimization dials. Volume growth is the dominant risk driver.
```

---

## Part 7 — Capacity Planning Checklist

### Pre-Launch Capacity Assessment

Before launching a new AI workflow or scaling an existing one:

- [ ] **Token volume forecast** completed for 3 months (P50 + P90)
- [ ] **Agent amplification factor** measured in staging (actual calls per user request)
- [ ] **Peak demand profile** identified (time-of-day, day-of-week, seasonal)
- [ ] **Cache strategy** designed and cache hit rate estimated
- [ ] **Model tier routing** configured and tier distribution estimated
- [ ] **GPU reservation** evaluated if self-hosted inference required
- [ ] **Vector DB capacity** projected (embedding volume × dimensions × retention)
- [ ] **HITL rate** estimated and oversight capacity provisioned
- [ ] **Budget caps** set at session, workflow, team, and BU levels
- [ ] **Circuit breakers** tested with simulated overrun
- [ ] **Monitoring alerts** configured for cost velocity anomalies
- [ ] **Quarterly review** scheduled for forecast vs. actuals

### Embedding Storage Growth Model

Vector databases grow continuously. Model the growth explicitly:

```
Monthly Embedding Storage Growth =
    New_Documents_per_Month × Avg_Chunks_per_Document × Embedding_Dimensions × 4 bytes

Example:
  10,000 new documents/month
  × 20 chunks/document (512-token chunks)
  × 1,536 dimensions (OpenAI ada-002)
  × 4 bytes (float32)
  = 1.23 GB/month raw storage
  + index overhead (typically 2–3× raw): 2.5–3.7 GB/month

At 12 months: 30–44 GB of vector storage
At 24 months: 60–90 GB (plus historical retention if required)

Pinecone pricing at 30 GB: ~$840/month (p3 pod)
Weaviate managed at 30 GB: ~$600–900/month
Self-hosted Qdrant: infrastructure cost only
```

---

## See Also

| Guide | What it covers |
|---|---|
| [AI FinOps Unit Economics & KPIs](./ai-finops-unit-economics-kpis.md) | Cost-per-outcome, ROI framework, executive dashboard |
| [Multi-Agent Cost Propagation](./ai-finops-multi-agent-cost-propagation.md) | Agent amplification factors to use in forecasts |
| [AI Tokenomics](../../ai-economics/ai-tokenomics-guide.md) | Token mechanics and batch API pricing |
| [AI FinOps Budget Governance](./ai-finops-budget-governance.md) | Budget enforcement, circuit breakers |
| [AI FinOps Maturity Model](./ai-finops-maturity-model.md) | How forecasting maturity evolves |
| [Enterprise AI Commercial Analysis](../../ai-economics/enterprise-ai-commercial-analysis-2026.md) | Provider pricing, GPU economics, contracts |
