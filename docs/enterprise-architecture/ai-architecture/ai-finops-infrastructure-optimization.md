---
title: "AI FinOps — Infrastructure Cost Optimization (GPU, Kubernetes, Serverless)"
date: 2026-07-14
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
covers_version: "as of July 2026"
doc_type: guide
source_type: native-md
source_file: ""
tags: ["ai-finops", "gpu-optimization", "mig", "quantization", "distillation", "kubernetes-ai", "serverless-ai", "infrastructure-cost", "right-sizing"]
---

# AI FinOps — Infrastructure Cost Optimization

> **Current as of July 2026.** For organizations running their own inference infrastructure — on-prem, dedicated cloud GPU, or Kubernetes — this guide covers GPU right-sizing, MIG partitioning, quantization, distillation, autoscaling, and serverless patterns that reduce infrastructure cost without quality regression.

**Scope:** This guide covers organizations with self-hosted inference or dedicated GPU capacity. If you are using API-only inference (OpenAI, Anthropic, Bedrock), skip to the [optimization patterns](./AI-FinOps-Cost-Management-Guide.md) — this document's GPU sections do not apply.

**Related guides:**
- [AI Tokenomics](../../ai-economics/ai-tokenomics-guide.md) — batch API economics as the API alternative
- [Enterprise AI Commercial Analysis](../../ai-economics/enterprise-ai-commercial-analysis-2026.md) — API vs self-hosted crossover analysis
- [AI FinOps Capacity Forecasting](./ai-finops-capacity-forecasting.md) — GPU demand forecasting

---

## GPU Economics in 2026

### The Hardware Landscape

| GPU | VRAM | Peak TFlops (BF16) | Typical Use | Cloud $/hr (on-demand) |
|---|---|---|---|---|
| NVIDIA H100 SXM5 80GB | 80 GB | 989 TFlops | Large model inference / training | $8–$12/hr |
| NVIDIA H100 PCIe 80GB | 80 GB | 756 TFlops | Mid-scale inference | $6–$9/hr |
| NVIDIA A100 80GB | 80 GB | 312 TFlops | Production inference (still widely used) | $4–$6/hr |
| NVIDIA A100 40GB | 40 GB | 312 TFlops | Smaller models; quantized inference | $2.50–$4/hr |
| NVIDIA L40S 48GB | 48 GB | 733 TFlops (FP8) | Cost-efficient inference; high value/$ | $3–$5/hr |
| NVIDIA L4 24GB | 24 GB | 242 TFlops | Small model inference; edge | $0.80–$1.50/hr |
| NVIDIA T4 16GB | 16 GB | 65 TFlops | Budget inference; quantized small models | $0.35–$0.80/hr |
| AMD MI300X 192GB | 192 GB | 1,307 TFlops | Very large models; high-memory-demand | $8–$14/hr |

**Key insight:** The L40S offers the best price/performance for pure inference workloads in 2026. H100 provides best performance for training and complex multi-modal inference. T4 is the right choice for budget-tier quantized small models at scale.

### GPU Utilization: The Biggest Waste Vector

Most enterprise GPU deployments run at 30–50% utilization. This is 2–3× overspend on infrastructure:

| Utilization Range | What It Means | Cost Efficiency |
|---|---|---|
| <30% | Severely underutilized; wrong sizing or demand pattern mismatch | 3–5× overspend |
| 30–60% | Moderate — typical for bursty production workloads | 1.5–2× overspend |
| 60–80% | Good — target for stable production workloads | Efficient |
| 80–95% | Excellent — high utilization; monitor for latency degradation | Maximum efficiency |
| >95% | Overloaded — latency spikes; queue buildup | Service risk |

**Target:** 70–85% sustained GPU utilization for cost-efficient inference. Below 60% triggers right-sizing review.

---

## GPU Right-Sizing

### Right-Sizing by Model Size

| Model Size | Recommended GPU | VRAM Budget | Notes |
|---|---|---|---|
| ≤7B parameters (fp16) | T4 16GB or L4 24GB | 14–15 GB | Efficient; multiple instances per node |
| ≤7B parameters (int4) | T4 16GB | 4–6 GB | MIG-compatible; pack 4 instances on one A100 |
| 13B parameters (fp16) | A100 40GB or L40S | 26 GB | Single GPU, good throughput |
| 13B parameters (int8) | T4 16GB or A100 40GB | 13 GB | Half VRAM of fp16; minimal quality loss |
| 70B parameters (fp16) | 2× A100 80GB or H100 80GB | 140 GB | Tensor parallel; NVLink required |
| 70B parameters (int8) | A100 80GB or H100 80GB | 70 GB | Single H100 viable |
| 70B parameters (int4) | A100 80GB | 35 GB | Fits one 80GB GPU; significant cost savings |
| 405B+ parameters | 8× H100 with NVLink | Full node | Only for frontier-tier self-hosted scenarios |

### Multi-Instance GPU (MIG) Partitioning

MIG allows a single A100/H100 to be divided into up to 7 isolated GPU instances. This dramatically improves utilization for smaller model workloads:

**A100 80GB MIG configurations:**

| Configuration | Instances | VRAM per Instance | Best For |
|---|---|---|---|
| 1×7g.80gb | 1 | 80 GB | Full GPU; no MIG |
| 2×3g.40gb | 2 | 40 GB each | Medium models |
| 4×2g.20gb | 4 | 20 GB each | Small models (13B int8) |
| 7×1g.10gb | 7 | 10 GB each | Nano models (7B int4) |

```bash
# Enable MIG on A100
nvidia-smi -i 0 -mig 1

# Create 7x 1g.10gb instances (max density for small models)
nvidia-smi mig -cgi 1g.10gb,1g.10gb,1g.10gb,1g.10gb,1g.10gb,1g.10gb,1g.10gb -C

# Verify
nvidia-smi mig -lgi
```

**MIG cost impact:** An A100 at $4/hr serving a single 7B fp16 model (14GB VRAM) wastes 82% of VRAM. With MIG 7×1g.10gb serving seven 7B int4 models, effective cost per model instance drops from $4/hr to $0.57/hr — a **7× cost reduction** for the same hardware.

---

## Quantization: The Inference Cost Multiplier

Quantization reduces model precision to decrease VRAM and increase throughput:

| Precision | VRAM vs FP16 | Throughput vs FP16 | Quality Loss | Best Use Case |
|---|---|---|---|---|
| FP16 (16-bit) | 1.0× (baseline) | 1.0× | None | Training; highest-stakes inference |
| BF16 (brain float 16) | 1.0× | 1.0× | ~None | Preferred for modern GPUs (H100, A100) |
| INT8 | 0.5× | 1.5–2.0× | <1% on most benchmarks | General production inference |
| INT4 (GPTQ/AWQ) | 0.25× | 2.0–3.0× | 1–3% on hard reasoning | Budget-tier; high-volume routing |
| FP4 / NF4 | 0.25× | 2.0–3.0× | 1–4% | Emerging; QLoRA fine-tuning |
| GGUF (Q4_K_M) | 0.25× | 1.5–2.5× | 2–4% | CPU inference; edge deployment |

**Production quantization strategy:**
- Use INT8 for all production inference as the default (minimal quality loss, 2× throughput)
- Use INT4 (AWQ preferred over GPTQ) for budget-tier routing where volume is very high
- Never quantize evaluator/judge models — quality requirement is highest here
- Benchmark each model at each precision level before production deployment

```python
# AWQ quantization example (faster than GPTQ; better quality retention)
from awq import AutoAWQForCausalLM
from transformers import AutoTokenizer

model_path = "meta-llama/Llama-3-8B-Instruct"
quant_path = "Llama-3-8B-Instruct-AWQ"

model = AutoAWQForCausalLM.from_pretrained(model_path, low_cpu_mem_usage=True)
tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)

quant_config = {
    "zero_point": True,
    "q_group_size": 128,
    "w_bit": 4,         # INT4
    "version": "GEMM",  # Fastest for inference
}

model.quantize(tokenizer, quant_config=quant_config)
model.save_quantized(quant_path)
tokenizer.save_pretrained(quant_path)
```

---

## Knowledge Distillation

Distillation trains a smaller "student" model to match the behavior of a larger "teacher" model. The student becomes 5–20× cheaper to inference while retaining 85–95% of the teacher's quality on in-domain tasks.

### Distillation Economics

| Scenario | Teacher | Student | Inference Cost Reduction | Quality Retention |
|---|---|---|---|---|
| Customer support routing | GPT-4o (teacher) | Fine-tuned Llama 3 8B | 95% | 91% on in-domain queries |
| Code style linting | Claude Opus (teacher) | Fine-tuned Phi-3 mini | 98% | 88% (style, not complex reasoning) |
| Claims triage (classification) | Claude Sonnet (teacher) | Fine-tuned Llama 3 8B | 90% | 94% on binary triage |

### Distillation Break-Even Analysis

```
Distillation cost (one-time):
  - Generate labeled dataset using teacher model: N examples × teacher_cost
  - Fine-tuning compute: A100 hours × rate
  - Evaluation and validation: additional inference cost
  - Engineering time: 2–4 weeks

Break-even calculation:
  break_even_queries = distillation_total_cost /
                       (teacher_cost_per_query - student_cost_per_query)

Example:
  Distillation cost: $15,000 (teacher inference + compute + engineering)
  Teacher cost per query: $0.05 (Claude Opus)
  Student cost per query: $0.002 (self-hosted Llama 3 8B INT8)
  Saving per query: $0.048
  Break-even: 15,000 / 0.048 = 312,500 queries ≈ 3 months at 3,000 queries/day
```

Distillation is economically compelling for:
- High-volume, in-domain classification or structured output tasks (>100K queries/month)
- Tasks where privacy requires on-prem inference
- Workflows requiring <50ms latency (API latency is prohibitive)

---

## Kubernetes AI Optimization

### GPU-Aware Scheduling

```yaml
# nvidia-device-plugin ensures GPU resources are schedulable
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: llm-inference
    image: vllm/vllm-openai:latest
    resources:
      requests:
        nvidia.com/gpu: 1
        memory: "32Gi"
        cpu: "4"
      limits:
        nvidia.com/gpu: 1
        memory: "48Gi"
        cpu: "8"
  nodeSelector:
    nvidia.com/gpu.product: "A100-SXM4-80GB"  # Target specific GPU model
  tolerations:
  - key: "nvidia.com/gpu"
    operator: "Exists"
    effect: "NoSchedule"
```

### Autoscaling AI Inference

Standard HPA (CPU/memory) doesn't work for GPU inference. Use KEDA (Kubernetes Event-driven Autoscaling) with queue depth or custom metrics:

```yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: llm-inference-scaler
spec:
  scaleTargetRef:
    name: llm-inference-deployment
  minReplicaCount: 1
  maxReplicaCount: 8
  cooldownPeriod: 300       # 5 minutes before scale-down
  triggers:
  - type: prometheus
    metadata:
      serverAddress: http://prometheus:9090
      metricName: llm_queue_depth
      threshold: "10"        # Scale up when >10 requests queued per replica
      query: |
        sum(llm_pending_requests) / count(up{job="llm-inference"})
```

### Spot Instance Strategy for Batch Inference

```yaml
# Use spot for batch workloads; on-demand for real-time
# AWS example: mixed instance group
apiVersion: apps/v1
kind: Deployment
metadata:
  name: llm-batch-inference
  annotations:
    # Tells cluster-autoscaler this can use spot
    cluster-autoscaler.kubernetes.io/safe-to-evict: "true"
spec:
  template:
    spec:
      # Tolerate spot interruption
      tolerations:
      - key: "spot-instance"
        operator: "Exists"
        effect: "NoSchedule"
      # Graceful shutdown on spot interruption (Spot termination notice: 2 minutes)
      terminationGracePeriodSeconds: 120
      containers:
      - name: batch-inference
        lifecycle:
          preStop:
            exec:
              command: ["/bin/sh", "-c", "sleep 90 && kill -SIGTERM 1"]
```

**Spot savings by provider:**

| Provider | Instance Type | On-Demand | Spot | Savings |
|---|---|---|---|---|
| AWS | p3.2xlarge (V100 16GB) | $3.06/hr | $0.92/hr | 70% |
| AWS | p4d.24xlarge (8× A100) | $32.77/hr | $9.83/hr | 70% |
| GCP | a2-highgpu-1g (A100 40GB) | $3.67/hr | $1.10/hr | 70% |
| Azure | NC24ads_A100_v4 (A100 80GB) | $7.35/hr | $2.94/hr | 60% |

---

## Serverless AI Inference

Serverless (no persistent GPU allocation) is economically optimal for infrequent or bursty inference where idle time is significant:

| Provider | Service | Cold Start | Pricing Model | Best For |
|---|---|---|---|---|
| AWS | Bedrock Serverless | ~500ms–2s | Per-token | Variable API workloads; no minimum |
| AWS | SageMaker Serverless | 1–5s | Per-inference-unit | Custom models; bursty patterns |
| GCP | Vertex AI Serverless | 1–3s | Per-token or per-request | Gemini family; variable demand |
| Azure | Azure AI Serverless | 1–3s | Pay-per-token | Azure OpenAI; Azure AI Studio |
| Modal | modal.com | <1s (warm), 2–5s (cold) | Per-second GPU | Custom models; warm pools configurable |
| Replicate | replicate.com | 2–10s (cold) | Per-second GPU | Open-weight models; dev/test |

**Serverless vs. dedicated breakeven:**

```
Dedicated GPU (A100 80GB): $4/hr = $0.0011/sec
Serving 100 requests/hr at 3s inference each = 300 GPU-seconds/hr

Serverless at $0.0011/sec × 300 active seconds = $0.33/hr
Dedicated at $4/hr
→ Serverless is 12× cheaper at 300 active GPU-seconds/hr

Breakeven: when active inference time > 3,600 GPU-seconds/hr (100% utilization)
→ Use serverless for workloads below 50% expected GPU utilization
→ Use dedicated for workloads above 70% expected GPU utilization
```

---

## Dynamic Model Loading

For organizations with multiple models but insufficient GPU to keep all loaded simultaneously:

```python
from vllm import LLM, SamplingParams
import threading
import time

class DynamicModelLoader:
    """Load/unload models based on demand; amortize GPU across model fleet."""

    def __init__(self, max_gpu_memory_gb: float = 70.0):
        self.max_memory = max_gpu_memory_gb
        self.loaded: dict[str, LLM] = {}
        self.last_used: dict[str, float] = {}
        self.model_memory: dict[str, float] = {
            "llama-3-8b-instruct": 16.0,   # GB needed
            "llama-3-70b-instruct": 70.0,
            "mistral-7b": 14.0,
            "phi-3-mini": 8.0,
        }
        self.lock = threading.Lock()

    def get_model(self, model_name: str) -> LLM:
        with self.lock:
            if model_name not in self.loaded:
                self._maybe_evict(self.model_memory[model_name])
                self.loaded[model_name] = LLM(model=model_name)
            self.last_used[model_name] = time.time()
            return self.loaded[model_name]

    def _maybe_evict(self, needed_gb: float) -> None:
        """Evict LRU model if insufficient VRAM."""
        current_usage = sum(self.model_memory[m] for m in self.loaded)
        while current_usage + needed_gb > self.max_memory and self.loaded:
            lru = min(self.last_used, key=self.last_used.get)
            del self.loaded[lru]
            del self.last_used[lru]
            current_usage -= self.model_memory[lru]
```

---

## Infrastructure Optimization Summary

| Technique | Complexity | Expected Saving | When to Apply |
|---|---|---|---|
| MIG partitioning (small models on large GPUs) | Medium | 4–7× cost reduction for nano models | When running 7B–13B models on 80GB GPUs |
| INT8 quantization | Low | 50% VRAM → 2× throughput per GPU | Always for production inference |
| INT4 quantization (AWQ) | Medium | 75% VRAM → 3× throughput | Budget-tier routing; high-volume, quality-tolerant |
| Distillation (for in-domain tasks) | High | 90–98% cost reduction vs frontier API | High-volume, in-domain, classification tasks |
| Spot instances for batch | Low | 60–70% infra cost reduction | Eval runs, nightly batch, non-latency-sensitive |
| Autoscaling (KEDA + queue depth) | Medium | 30–60% on idle capacity | Variable demand patterns |
| Serverless for bursty workloads | Low | Up to 12× vs dedicated for <50% utilization | Dev/test; low-volume infrequent inference |
| Dynamic model loading | Medium | GPU amortization across model fleet | Multi-model deployments |
| GPU reservation (1-year) | Low | 30–40% vs on-demand | Stable >70% utilized baseline demand |

---

## See Also

| Guide | What it covers |
|---|---|
| [AI FinOps Capacity Forecasting](./ai-finops-capacity-forecasting.md) | GPU demand forecasting and reservation strategy |
| [AI Tokenomics](../../ai-economics/ai-tokenomics-guide.md) | Batch API as alternative to self-hosted |
| [Enterprise AI Commercial Analysis](../../ai-economics/enterprise-ai-commercial-analysis-2026.md) | API vs self-hosted crossover economics |
| [AI FinOps Maturity Model](./ai-finops-maturity-model.md) | Where infrastructure optimization fits in maturity |
| [Kubernetes Handbook](../../cloud-platforms/kubernetes/K8s_Handbook_Part12_Agentic_AI.md) | Kubernetes platform details for AI workloads |
