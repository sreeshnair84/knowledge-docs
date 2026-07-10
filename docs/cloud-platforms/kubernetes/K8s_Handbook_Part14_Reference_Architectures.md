---
title: "ENTERPRISE KUBERNETES MASTERY"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "K8s_Handbook_Part14_Reference_Architectures.pdf"
doc_type: guide
tags: ["cloud-platforms"]
last_reviewed: 2026-07-10
covers_version: "N/A"
last_reviewed: 2026-07-10
---

# **ENTERPRISE KUBERNETES MASTERY** 

AI Platform Engineering Handbook 

PART XIV ENTERPRISE REFERENCE ARCHITECTURES 

Financial Services, Healthcare, Government, AI Platforms, RAG, Agentic AI 

Volume 14 of 16 Architecture Series | Edition 2025-2026 

**ENTERPRISE KUBERNETES MASTERY — AI PLATFORM ENGINEERING HANDBOOK** 

PART XIV  REFERENCE ARCHITECTURES 

#### **CHAPTER 1** 

## **Enterprise Kubernetes Platform -- Full Stack Architecture** 

The following reference architecture represents a production-grade enterprise Kubernetes platform meeting security, compliance, observability, and operational requirements for regulated industries. Each layer is independently selectable and all components are CNCF-graduated or widely adopted in production. 

```
LAYER 8: AI PLATFORM GPU Operator (NVIDIA) + MIG Manager + DCGM Exporter Volcano (gang
scheduling) + Karpenter (GPU node provisioning) vLLM (LLM serving) + KServe (multi-framework)
+ Ray Serve LiteLLM (AI gateway) + MLflow (registry) + Kubeflow Pipelines Feast (feature
store) + Qdrant/Milvus (vector DB) Temporal (durable agent execution) + Argo Workflows (batch
AI) LAYER 7: DEVELOPER PLATFORM Backstage (IDP: service catalogue, templates, docs) ArgoCD +
ApplicationSets (GitOps, multi-cluster) Crossplane (self-service infrastructure) Argo Rollouts
(progressive delivery) LAYER 6: OBSERVABILITY Prometheus + Thanos (metrics, long-term S3)
Fluent Bit -> Loki (logs, S3 backend) OTel Collector -> Tempo (distributed traces) OpenCost +
DCGM (cost + GPU observability) Grafana (unified dashboards) LAYER 5: SECURITY OIDC/Dex (human
auth) + SPIFFE/SPIRE (workload identity) Vault HA + External Secrets Operator (secrets)
cert-manager + Vault PKI (certificate lifecycle) Kyverno (admission policy) + OPA Gatekeeper
(complex Rego) Falco (runtime detection) + Tetragon (enforcement) Cosign + Trivy + Harbor
(supply chain security) LAYER 4: NETWORKING Cilium eBPF CNI (kube-proxy replacement +
WireGuard) Istio Ambient Mesh (mTLS, L7 policy, zero sidecar) ingress-nginx (external) +
Gateway API (internal routing) CoreDNS + NodeLocal DNSCache LAYER 3: STORAGE AWS EBS gp3 / GCP
PD-SSD (block, RWO) EFS/NFS / Ceph CephFS (shared, RWX) Velero (backup, DR) LAYER 2:
KUBERNETES CONTROL PLANE API Server (private endpoint, audit log -> S3 immutable) etcd (3
nodes HA, encryption at rest, 30-min backup) Volcano scheduler (AI) + default scheduler
(standard) LAYER 1: INFRASTRUCTURE Managed cloud (EKS/GKE/AKS) or self-managed (CAPI) CPU node
pools + GPU node pools (A100/H100) Private VPC, no public node IPs Cloud IAM + HSM for key
management
```

### **Financial Services Reference Architecture** 

|**Requirement**|**Control**|**Implementation**|
|---|---|---|
|Data sovereignty|No PII leaves<br>jurisdiction|Cluster per region; Kyverno blocks external registries; no<br>cross-region data flow|
|Encryption at rest|All data encrypted with<br>customer keys|etcd AES-GCM + KMS; PVC LUKS; S3 SSE-KMS; Vault CMEK|
|Encryption in transit|All comms encrypted|Cilium WireGuard (L3) + Istio Ambient mTLS (L7) + cert-manager|
|Privileged access|MFA + break-glass<br>audit|OIDC + Okta MFA; Vault lease-based admin; every action audited|
|Vulnerability SLA|CRITICAL: 24h; HIGH:<br>7d|Trivy CI gate + Harbor daily scan + Kyverno image age policy|

Confidential 

Enterprise Kubernetes Mastery Handbook 

**ENTERPRISE KUBERNETES MASTERY — AI PLATFORM ENGINEERING HANDBOOK** 

PART XIV  REFERENCE ARCHITECTURES 

|**Requirement**|**Control**|**Implementation**|
|---|---|---|
|Change management|All changes via<br>approved GitOps|ArgoCD selfHeal + prune; no kubectl write in prod; PR required|
|Business continuity|RTO < 4h; RPO < 1h|Velero hourly; multi-AZ cluster; etcd 30-min snapshot to S3|
|AI model audit (EU AI<br>Act)|Article 12: complete<br>audit trail|OTel GenAI traces -> Tempo; MLflow lineage; immutable S3 audit<br>log|
|PCI DSS v4|Cardholder data<br>isolation|Dedicated namespace + cluster; NetworkPolicy + Vault for card data|

### **Healthcare Reference Architecture** 

Healthcare Kubernetes deployments must satisfy HIPAA, HITRUST, and increasingly FDA 21 CFR Part 11 for AI/ML medical devices. Key additions to the base platform: 

- **PHI isolation** : Dedicated namespace per patient data category. Kubernetes NetworkPolicy: no cross-namespace communication for PHI workloads. Encryption at rest with FIPS 140-2 validated modules. 

- **De-identification pipeline** : AI-powered PII/PHI detection (Presidio) deployed as admission webhook: blocks any attempt to log raw PHI to non-compliant systems. All PHI hashed/tokenised before AI model processing. 

- **Audit trail** : Every access to PHI data logged with: user identity, timestamp, purpose (clinical/research/admin), data elements accessed. Immutable audit log in compliance-certified object storage. 

- **Medical AI governance** : FDA 21 CFR Part 11: electronic records and signatures for AI model validation, versioning, and deployment approval. MLflow + custom approval workflow CRD for pre-market submission artifacts. 

### **Enterprise Agentic AI Platform Reference Architecture** 

Full-stack enterprise agentic AI platform (derived from Part XII): 

```
REQUEST ENTRY API Gateway (Kong) -> WebSocket / REST endpoint Authentication: OIDC JWT
validation Rate limiting: per user, per team, per cost center AI GATEWAY LAYER LiteLLM
(unified model API) Model routing: complexity-based (8B for simple, 70B for complex) Cost
tracking: token usage per session per user PII detection: Presidio sidecar before external LLM
calls AGENT ORCHESTRATION Temporal Worker Pool (KEDA-scaled on Kafka lag) Agent Registry
(Agent CRD + Backstage catalogue) Prompt Registry (ConfigMap + GitOps versioning) Tool
Registry (AgentTool CRD + MCP server routing) AGENT EXECUTION Stateless Workers (Deployment,
2-100 replicas, KEDA) Code Execution (Kata Containers, gVisor, isolated namespace) MCP Servers
(shared Deployment + KEDA on call rate) MEMORY LAYER Redis (working memory, TTL-based session
context) Qdrant (semantic/vector memory, RAG retrieval) PostgreSQL + TimescaleDB (episodic
memory, audit log) Feast (entity profiles, user features) LLM INFERENCE LAYER vLLM (production
LLM serving, PagedAttention) NVIDIA GPU Operator + MIG (GPU resource management) KServe
(multi-framework, canary model deployments) OBSERVABILITY OTel GenAI traces: every LLM call,
tool call, agent step TTFT, TPS, queue depth, cost/session in Prometheus Agent decision log in
Loki (compliance retention 1 year) Grafana AI platform dashboard
```

Confidential 

Enterprise Kubernetes Mastery Handbook
