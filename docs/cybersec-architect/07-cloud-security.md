---
title: "Part 7 — Cloud Security Architecture"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["cybersec-architect"]
---

# Part 7 — Cloud Security Architecture

**Audience:** Cloud security architects, enterprise architects, and CISOs responsible for security strategy across AWS, Azure, and Google Cloud, including AI workloads.

**Related:**
[Overview](index.md) |
[Security Domains](03-security-domains.md) |
[Identity Architecture](06-identity-architecture.md) |
[Cloud Platforms](../cloud-platforms/index.md) |
[AWS AgentCore](../cloud-platforms/aws/index.md)

> **Current as of July 2026.** Cloud security architecture must account for multi-cloud deployments, AI inference workloads, GPU security, and private/hybrid AI patterns in addition to foundational cloud security controls.

---

## 1. Shared Responsibility Model (Updated for AI Era)

The classic shared responsibility model has been extended for AI workloads:

| Responsibility Area | IaaS | PaaS | SaaS | Managed AI (e.g., Bedrock, Azure OpenAI) |
|---|---|---|---|---|
| Physical security | Cloud | Cloud | Cloud | Cloud |
| Hypervisor | Cloud | Cloud | Cloud | Cloud |
| OS | **You** | Cloud | Cloud | Cloud |
| Runtime | **You** | Cloud | Cloud | Cloud |
| Middleware | **You** | **You** | Cloud | Cloud |
| Application code | **You** | **You** | **You** | Cloud |
| **Model weights** | **You** | **You** | **You** | Cloud (unless BYOM) |
| **Training data** | **You** | **You** | **You** | **You** |
| **Prompt content** | **You** | **You** | **You** | **You** |
| **Output usage** | **You** | **You** | **You** | **You** |
| **AI governance** | **You** | **You** | **You** | **You** |
| IAM | **You** | **You** | **You** | **You** |
| Data classification | **You** | **You** | **You** | **You** |
| Network design | **You** | **You** | N/A | **You** |

**Key insight:** With managed AI services, the cloud provider secures the model — but you own the data, prompts, outputs, IAM, and governance. Data submitted to managed AI APIs must be treated with the same care as data sent to any third-party SaaS.

---

## 2. AWS Security Architecture

### 2.1 AWS Identity & Access Management

| Service | Purpose | Security Best Practice |
|---|---|---|
| **IAM** | Core identity and access | Least privilege; use roles not users; no root access |
| **IAM Identity Center (SSO)** | Federated human access | SAML/OIDC federation from corporate IdP |
| **AWS STS** | Temporary credentials | AssumeRole for all cross-account and automation |
| **IAM Roles Anywhere** | On-prem → AWS trust | X.509 certs from your PKI for AWS access without keys |
| **Resource-based policies** | Fine-grained resource control | Combine with IAM policies for defense-in-depth |

### 2.2 AWS Network Security

```
Internet Gateway
        ↓
VPC (10.0.0.0/16)
├─ Public Subnet (10.0.1.0/24)
│   └─ Load Balancer, NAT Gateway, Bastion
├─ Private Subnet - App (10.0.2.0/24)
│   └─ ECS/EKS tasks, Lambda (VPC-attached)
├─ Private Subnet - Data (10.0.3.0/24)
│   └─ RDS, ElastiCache, OpenSearch
└─ Private Subnet - AI (10.0.4.0/24)
    └─ Bedrock VPC endpoints, SageMaker
```

**Key controls:**
- Security Groups: stateful L4 allow-lists (no deny rules needed)
- Network ACLs: stateless subnet-level controls
- VPC Endpoints (Private Link): keep traffic off public internet
- AWS Network Firewall: stateful L7 filtering, IDS
- WAF: L7 protection for ALB, CloudFront, API Gateway

### 2.3 AWS AI Security (Bedrock)

| Control | Service | Configuration |
|---|---|---|
| **Private API access** | VPC Endpoint for Bedrock | Disable public access; route via Private Link |
| **IAM authorization** | Bedrock resource policy | Per-model access control; restrict by principal ARN |
| **Guardrails** | Amazon Bedrock Guardrails | Content filtering, PII detection, grounding, topic denial |
| **Data residency** | Bedrock region selection | Choose region matching data sovereignty requirement |
| **Encryption** | Bedrock + KMS | Customer-managed KMS key for Bedrock data at rest |
| **Logging** | CloudTrail + CloudWatch | Log all model invocations; alert on anomalies |
| **Prompt flows** | Bedrock Prompt Management | Version-controlled, access-controlled prompt templates |

**AWS AgentCore security** (GA 2026):
- Agent identity via AWS IAM role (not API keys)
- VPC-isolated agent runtime with network egress controls
- Integrated with Bedrock Guardrails for output filtering
- Audit logging to CloudTrail with agent action detail

### 2.4 AWS Security Services Summary

| Domain | AWS Service | Equivalent Control |
|---|---|---|
| Posture management | AWS Security Hub | CSPM |
| Runtime protection | Amazon GuardDuty | UEBA + network threat detection |
| Vulnerability management | Amazon Inspector | CWPP / vulnerability scanning |
| Threat detection | Amazon Detective | Security investigation and analytics |
| DDoS protection | AWS Shield (Advanced) | L3/L4/L7 DDoS mitigation |
| WAF | AWS WAF | L7 web application firewall |
| Secrets | AWS Secrets Manager | Secrets management + automatic rotation |
| Key management | AWS KMS | HSM-backed key management |
| Certificate management | AWS ACM | TLS certificate lifecycle |
| Config compliance | AWS Config | Configuration drift detection |
| IAM analysis | IAM Access Analyzer | CIEM / over-permission detection |

---

## 3. Azure Security Architecture

### 3.1 Azure Identity & Access

| Service | Purpose | Security Best Practice |
|---|---|---|
| **Entra ID** (formerly AAD) | Enterprise identity platform | Conditional Access; FIDO2; PIM for privileged roles |
| **Entra PIM** | Privileged Identity Management | JIT elevation; approval workflows; access reviews |
| **Entra ID Governance** | IGA | Automated access reviews; entitlement management |
| **Entra Workload ID** | Machine/agent identity | Federated credentials; no client secrets |
| **Entra Agent ID** | AI agent identity | OBO delegation; per-task scoping; audit trail |

### 3.2 Azure Network Security

```
Azure Region
├─ Virtual Network (10.0.0.0/16)
│   ├─ AzureFirewall Subnet
│   ├─ Application Gateway Subnet (WAF v2)
│   ├─ App Service Subnet (private endpoints)
│   ├─ AI Services Subnet
│   │   └─ Azure OpenAI Private Endpoint
│   │   └─ Azure AI Foundry Private Endpoint
│   └─ Data Subnet
│       └─ SQL / Cosmos / Storage (private endpoints)
├─ Azure Firewall Premium (L7 IDPS)
└─ DDoS Protection Standard
```

### 3.3 Azure AI Security (Azure OpenAI + AI Foundry)

| Control | Service | Implementation |
|---|---|---|
| **Private deployment** | Private Endpoint | Azure OpenAI accessible only via VNet |
| **Identity** | Managed Identity | App/agent uses managed identity for OpenAI access |
| **Content filtering** | Azure AI Content Safety | Output moderation; custom categories |
| **Network isolation** | VNet Integration | No public internet path to model endpoint |
| **Data at rest** | CMK (Customer-Managed Keys) | Encrypt Azure OpenAI storage with your key |
| **Monitoring** | Azure Monitor + Diagnostic Logs | Log all model invocations |
| **Prompt Shields** | Azure AI Content Safety | Prompt injection detection (GA 2025) |
| **Groundedness** | Azure AI Foundry Evaluation | Detect hallucinations vs. grounded response |

### 3.4 Azure Security Services Summary

| Domain | Azure Service | Equivalent Control |
|---|---|---|
| Posture management | Microsoft Defender for Cloud | CNAPP (CSPM + CWPP + CIEM) |
| SIEM/XDR | Microsoft Sentinel + Defender XDR | SIEM + XDR |
| Endpoint protection | Microsoft Defender for Endpoint | EDR/XDR |
| Identity protection | Entra ID Protection | UEBA for identity |
| DDoS | Azure DDoS Protection Standard | L3/L4 DDoS mitigation |
| WAF | Azure WAF (Application Gateway) | L7 web firewall |
| Secrets | Azure Key Vault | Secrets + keys + certificates |
| Vulnerability mgmt | Microsoft Defender for Servers | CWPP / vulnerability assessment |
| Config compliance | Azure Policy | Policy-as-code configuration control |

---

## 4. Google Cloud Security Architecture

### 4.1 GCP Identity & Access

| Service | Purpose | Security Best Practice |
|---|---|---|
| **Cloud IAM** | Resource access control | Principle of least privilege; prefer pre-defined roles |
| **Workload Identity Federation** | Machine/CI identity | No service account keys; OIDC-based trust |
| **Service Account** | Non-human principal | One service account per workload; no key file |
| **Identity-Aware Proxy (IAP)** | Zero Trust application access | Replace VPN with context-aware access |
| **BeyondCorp Enterprise** | ZTNA on GCP | Device posture + identity + context enforcement |

### 4.2 GCP AI Security (Vertex AI + Gemini)

| Control | Service | Implementation |
|---|---|---|
| **Private access** | Private Service Connect | Vertex AI accessible only via VPC |
| **Identity** | Workload Identity Federation | No service account keys for Vertex access |
| **Data governance** | Data Access Logs (Cloud Audit) | Log all model invocations |
| **Content safety** | Vertex AI Safety Attributes | Built-in content classifiers; configurable thresholds |
| **VPC controls** | VPC Service Controls | Prevent data exfiltration from Vertex AI projects |
| **Model governance** | Model Registry | Versioned model artefacts with access control |
| **Agent security** | Vertex AI Agent Builder | IAM-controlled agent deployment; VPC isolation |

### 4.3 GCP Security Services Summary

| Domain | GCP Service | Equivalent Control |
|---|---|---|
| Posture management | Security Command Center | CSPM + threat detection |
| Network security | Cloud Armor + Cloud Firewall | WAF + L3/L4 controls |
| SIEM | Google Chronicle | Cloud-native SIEM + threat intel |
| Secrets | Secret Manager | Secrets management + automatic rotation |
| DLP | Cloud DLP | Data discovery + classification + masking |
| BAS | Mandiant Attack Surface Management | Continuous threat exposure management |
| Container security | GKE Security Posture | Kubernetes-native CWPP |

---

## 5. Multi-Cloud Security Architecture

Most enterprises run workloads across multiple clouds. Multi-cloud security requires:

### 5.1 Multi-Cloud Security Reference Architecture

```
Enterprise Security Platform
├─ Identity (Entra ID / Okta — federated to all clouds)
├─ CNAPP (Wiz / Orca — multi-cloud CSPM + CWPP)
├─ SIEM (Sentinel / Chronicle / Splunk — aggregate all cloud logs)
├─ Secrets (Vault — consistent secrets management across clouds)
├─ Policy (OPA / Sentinel — consistent policy enforcement)
└─ Network (SASE — consistent access control regardless of cloud)

AWS Account          Azure Subscription       GCP Project
├─ GuardDuty         ├─ Defender for Cloud    ├─ SCC
├─ Security Hub      ├─ Sentinel connector    ├─ Chronicle connector
└─ CloudTrail        └─ Diagnostic logs       └─ Audit logs
        ↓                      ↓                      ↓
                    Central SIEM
```

### 5.2 Multi-Cloud AI Security Patterns

| Pattern | Description | When to Use |
|---|---|---|
| **Single cloud AI** | All AI workloads on one cloud | Simplest; highest integration; vendor lock-in |
| **Best-of-breed AI** | Different models from different cloud AI services | Optimize for capability; complex security controls |
| **Private AI** | Models deployed in your cloud account, not managed service | Data sovereignty; regulated industries |
| **Hybrid AI** | Sensitive inference on-prem; general inference in cloud | Air-gap requirements; latency-sensitive |
| **Air-Gapped AI** | No cloud connectivity; fully on-prem or edge | Defence, government classified, ultra-high security |

---

## 6. GPU Security

AI inference and training workloads run on GPU clusters. GPU security is an emerging domain.

### 6.1 GPU Attack Surface

| Attack Vector | Description | Control |
|---|---|---|
| **GPU memory snooping** | Co-tenant reads GPU memory of another workload | Confidential VMs with GPU TEE (NVIDIA H100 CC mode) |
| **Model weight theft** | Exfiltrate model weights from GPU memory | Encrypted model loading; memory isolation |
| **Side-channel attacks** | Infer model architecture or inputs from GPU cache timing | Confidential computing; noise injection |
| **Hypervisor compromise** | Hypervisor-level access to GPU memory | Hardware isolation (TEE); attestation |
| **Driver vulnerabilities** | Exploit GPU driver to escalate privileges | Regular driver patching; driver allowlisting |

### 6.2 NVIDIA Confidential Computing

NVIDIA H100 and H200 GPUs support Confidential Computing mode:

- **GPU TEE**: Trusted Execution Environment extends from CPU to GPU
- **Memory encryption**: GPU HBM memory encrypted; host cannot read GPU memory
- **Attestation**: GPU firmware attestation proves model is running in CC mode
- **Integration**: Works with Azure Confidential VMs, AWS Nitro, GCP Confidential VMs

**Use cases:** Private AI inference for regulated data; confidential model training; multi-party computation.

---

## 7. Private AI Architecture

For organizations where data cannot leave their perimeter, private AI deployment is required.

### 7.1 Private AI Deployment Models

| Model | Architecture | Data Control | Cost | Capability |
|---|---|---|---|---|
| **Managed AI API** | Cloud service | Limited (provider processes data) | Low | Highest (GPT-4o, Claude, Gemini) |
| **Private cloud AI** | Your VPC; provider manages model | Full | Medium | High (same models, private endpoint) |
| **Self-hosted cloud** | Your VPC; you manage model | Full | High | Medium (open-source or licensed models) |
| **On-premises** | Your data centre | Complete | Very high | Medium-High |
| **Air-gapped** | Isolated network | Absolute | Highest | Medium |

### 7.2 Private AI Reference Architecture

```
Enterprise Private Network
├─ AI Gateway / Prompt Gateway
│   ├─ Authentication (Entra/Okta)
│   ├─ Authorization (OPA/Cedar)
│   ├─ Input filtering (PII, injection)
│   ├─ Rate limiting
│   └─ Output filtering
│           ↓
├─ Model Serving (vLLM, Ray Serve, TGI)
│   ├─ Primary model (Llama 4, Mistral, etc.)
│   └─ Embedding model
│           ↓
├─ Vector Store (pgvector, Qdrant, Weaviate) — private
├─ Knowledge Base (internal documents) — classified
└─ Logging & Observability (Grafana, OpenTelemetry)
```

**Security properties of this architecture:**
- No data leaves the private network
- Model weights stored in encrypted private object storage
- All access authenticated via corporate identity
- All queries and responses logged for audit
- PII filtered before reaching model; PII masked in output
