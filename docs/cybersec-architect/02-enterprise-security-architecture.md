---
title: "Part 2 — Enterprise Security Architecture"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["cybersec-architect"]
doc_type: multi-part-series
series_name: Cybersecurity Architect
series_part: 2
series_total: 15
series_index: index.md
---

# Part 2 — Enterprise Security Architecture

**Audience:** Enterprise architects integrating security into EA frameworks; CISOs designing security operating models aligned to business capabilities.

**Related:**
[Overview](index.md) |
[Security Domains](03-security-domains.md) |
[EA Deliverables](12-ea-deliverables.md) |
[Enterprise Architecture](../enterprise-architecture/index.md)

> **Current as of July 2026.** Security architecture taught from an Enterprise Architect perspective — spanning the Business, Information, Application, and Technology layers of the architecture stack.

---

## 1. Security as an Enterprise Capability

Security is not a technology function. It is a **business capability** that must be designed, funded, measured, and governed like any other capability in the enterprise portfolio.

The SABSA (Sherwood Applied Business Security Architecture) framework and TOGAF's Security Architecture extension both position security at every layer of the enterprise stack — from business strategy down to infrastructure.

### 1.1 Business Capability → Security Capability Mapping

| Business Capability | Security Capability Required |
| --- | --- |
| Customer data processing | Data classification, encryption, DLP, privacy controls |
| Employee productivity (SaaS, cloud tools) | Identity governance, CASB, endpoint DLP |
| AI-powered products and services | AI security controls, prompt gateway, model governance |
| Third-party integrations and APIs | API security gateway, OAuth, supply chain risk management |
| Remote and hybrid work | ZTNA, device posture, phishing-resistant MFA |
| Cloud infrastructure | CSPM, CWPP, cloud IAM, network segmentation |
| Software development | DevSecOps, SCA, secret scanning, SBOM |
| Financial transaction processing | PCI DSS controls, HSM, tokenization, fraud detection |

Every new business capability introduced by digital transformation or AI adoption carries a corresponding security capability requirement that must be identified, designed, funded, and operated.

---

## 2. Business Layer

### 2.1 Business Capability Mapping

The starting point for enterprise security architecture is the **business capability map** — a structured inventory of what the business does, independent of how. Security capabilities are mapped onto this foundation.

**Level 1 Security Capability Map:**

```
Enterprise Security Capabilities
├─ Risk Management
│   ├─ Cyber Risk Quantification
│   ├─ Third-Party Risk Management
│   └─ Risk Reporting & Governance
├─ Identity & Access Management
│   ├─ Human Identity
│   ├─ Machine Identity
│   └─ AI Agent Identity
├─ Data Protection
│   ├─ Classification & Governance
│   ├─ Encryption & Key Management
│   └─ Privacy & Sovereignty
├─ Threat Management
│   ├─ Vulnerability Management
│   ├─ Threat Intelligence
│   └─ Security Monitoring & Response
├─ Security Engineering
│   ├─ Secure Architecture Design
│   ├─ DevSecOps
│   └─ AI Security Engineering
└─ Governance, Risk & Compliance
    ├─ Policy Management
    ├─ Compliance Assurance
    └─ Audit & Assurance
```

### 2.2 Security Operating Model

The security operating model defines how security capabilities are organized, staffed, funded, and governed.

| Dimension | Options | Decision Factors |
| --- | --- | --- |
| **Structure** | Centralised / Federated / Hybrid | Organization size, regulatory environment, risk appetite |
| **Ownership** | CISO-led / CTO-embedded / Distributed | Culture, transformation maturity, board mandate |
| **Sourcing** | Insourced / Managed Security Service (MSSP) / Hybrid | Cost, skill availability, 24x7 requirements |
| **Governance** | Security Council / ARB-integrated / Dedicated Risk Committee | Regulatory requirements, enterprise governance model |
| **Funding** | Cost centre / Risk-adjusted allocation / Business unit charge-back | Finance model, board risk appetite |

**AI-era shift:** With AI agents acting on behalf of the enterprise, the security operating model must include **AI governance roles** — AI Security Engineer, AI Red Team Lead, Model Risk Officer — alongside traditional security roles.

### 2.3 Business Resilience

Business resilience is the security programme's ultimate business outcome. It encompasses:

- **Recovery Time Objective (RTO)**: Maximum tolerable downtime per capability
- **Recovery Point Objective (RPO)**: Maximum tolerable data loss window
- **Mean Time to Detect (MTTD)**: How quickly threats are identified
- **Mean Time to Respond (MTTR)**: How quickly threats are contained
- **Cyber resilience score**: Composite metric combining control effectiveness, detection speed, and recovery capability

### 2.4 Cyber Risk Management

**Risk = Threat × Vulnerability × Impact**

Enterprise cyber risk management quantifies this using frameworks like:

- **FAIR** (Factor Analysis of Information Risk): Quantitative financial loss modelling
- **NIST CSF**: Qualitative maturity across Identify / Protect / Detect / Respond / Recover / Govern
- **ISO 31000**: Enterprise risk management integration
- **COSO ERM**: Business risk integration at board level

**AI risk additions:**

- Model failure risk (hallucination, misalignment)
- Agent autonomous action risk (unintended real-world effects)
- AI supply chain risk (third-party model or data compromise)
- Regulatory AI risk (non-compliance with EU AI Act, ISO 42001)

### 2.5 Security Maturity

**CMMI-based security maturity levels:**

| Level | Name | Characteristics |
| --- | --- | --- |
| 1 | Initial | Ad hoc, reactive, no defined processes |
| 2 | Managed | Basic processes exist; mostly reactive |
| 3 | Defined | Documented, consistent processes across org |
| 4 | Quantitatively Managed | Metrics-driven; risk quantified; predictive |
| 5 | Optimising | Continuous improvement; automation; AI-assisted |

Most enterprises target Level 3 for foundational domains and Level 4 for critical capabilities. AI security is a new domain where most enterprises are at Level 1–2 as of mid-2026.

---

## 3. Information Layer

### 3.1 Data Classification

Data classification is the foundation of information security. Without knowing what data is sensitive, no proportionate controls can be applied.

**Standard classification tiers:**

| Tier | Label | Definition | Example |
| --- | --- | --- | --- |
| 0 | Public | Freely shareable | Marketing materials, published docs |
| 1 | Internal | For employees only | Internal policies, org charts |
| 2 | Confidential | Restricted access | Financial forecasts, roadmaps |
| 3 | Restricted | Need-to-know only | Customer PII, trade secrets, source code |
| 4 | Regulated | Subject to legal obligations | PHI (HIPAA), cardholder data (PCI), biometrics |

**AI data classification challenges:**

- Training datasets may contain mixed-classification data
- LLM outputs may synthesise restricted information from public inputs
- RAG pipelines mix document sensitivity levels in a single context window
- Agent memory stores accumulate sensitive data across sessions

### 3.2 CIA Triad in the AI Era

| Property | Traditional Control | AI-Era Extension |
| --- | --- | --- |
| **Confidentiality** | Encryption, access control, DLP | Prompt injection prevention, output filtering, RAG access control |
| **Integrity** | Checksums, digital signatures, audit logs | Training data integrity, model card verification, AIBOM attestation |
| **Availability** | Redundancy, DDoS protection, BCP | Model serving resilience, inference rate limiting, fallback model chains |

### 3.3 Privacy by Design

Privacy is a sub-property of confidentiality with legal consequences. Seven foundational principles (Ann Cavoukian):

1. Proactive, not reactive
2. Privacy as the default setting
3. Privacy embedded into design
4. Full functionality — positive-sum, not zero-sum
5. End-to-end security lifecycle protection
6. Visibility and transparency
7. Respect for user privacy

**AI privacy risks:**

- Membership inference: Can an attacker determine if a specific person's data was in the training set?
- Model inversion: Can training data be reconstructed from model outputs?
- Re-identification: Can anonymised data be re-identified using AI?
- Consent scope: Was data used for AI training within the consent originally given?

### 3.4 Data Sovereignty

Data sovereignty requires that data is subject to the laws and governance of the nation where it resides. Enterprise implications:

- **EU GDPR**: Personal data of EU residents must comply with GDPR regardless of processing location
- **EU AI Act**: High-risk AI systems using EU citizen data face additional regulatory obligations
- **US data residency**: Federal and defence workloads often require FedRAMP-authorized, US-data-only processing
- **Cross-border AI**: LLMs hosted in non-EU jurisdictions processing EU personal data triggers SCCs and transfer mechanism requirements

### 3.5 AI Data Governance

AI systems require governance of data **across its lifecycle**:

```
Data Collection → Data Curation → Training → Fine-tuning → Inference → Output → Retention
      ↑               ↑              ↑            ↑            ↑           ↑         ↑
  Consent &       Classification  Lineage &    Change       Request     Content    Deletion
  Minimisation    & Labelling     Provenance   Control      Logging     Filtering  & Purging
```

---

## 4. Application Layer

### 4.1 Secure Application Architecture Principles

| Principle | Description |
| --- | --- |
| **Least privilege** | Applications request only the permissions they need for each operation |
| **Defence in depth** | Multiple independent controls at each layer |
| **Fail secure** | On error, deny access rather than grant it |
| **Input validation** | Validate all input at trust boundaries |
| **Output encoding** | Encode all output to prevent injection |
| **Secure defaults** | The default configuration is the most secure configuration |
| **Separation of concerns** | Security logic separate from business logic |
| **Audit by design** | All security-relevant events are logged from design time |

### 4.2 API Security

APIs are the primary integration surface of modern enterprise applications and the attack surface for AI agents.

**API security controls:**

| Control Layer | Technology | Purpose |
| --- | --- | --- |
| Authentication | OAuth 2.1 / OIDC / mTLS | Verify caller identity |
| Authorization | RBAC / ABAC / OPA policies | Control what caller can do |
| Rate limiting | API gateway policies | Prevent abuse and DDoS |
| Input validation | JSON Schema, OpenAPI spec | Reject malformed requests |
| Output filtering | Response sanitisation | Prevent data leakage |
| Threat protection | WAF, API security gateway | Block known attack patterns |
| Logging & monitoring | Structured API logs → SIEM | Detect anomalies |

**AI agent API security additions:**

- Agent token scoping (short-lived, least-privilege per-task tokens)
- Tool invocation audit trails per agent session
- Rate limiting per agent identity (not just per IP)
- Semantic validation of AI-generated API calls

### 4.3 Event-Driven Security

Event-driven architectures introduce new security patterns:

- **Topic-level access control**: Producers and consumers require explicit authorization per topic
- **Event poisoning**: Malicious events injected into streams (Kafka, EventBridge) can trigger unintended downstream actions
- **Schema enforcement**: Event schema validation prevents malformed payloads
- **Event replay controls**: Audit trails for replay events; restrict who can initiate replay
- **AI event processing**: Events consumed by AI agents require classification before processing

### 4.4 Service Mesh Security

Service meshes (Istio, Linkerd, Consul) provide automatic mTLS between microservices:

- **Automatic mTLS**: All service-to-service traffic encrypted and authenticated without application code changes
- **SPIFFE/SPIRE**: Workload identity via cryptographic attestation (see [Part 6](06-identity-architecture.md))
- **Policy enforcement**: L7 policies (JWT validation, path-based authorization) enforced at the proxy layer
- **Observability**: Distributed tracing and access logs for every service call

**AI agent mesh integration:** Agents deployed as microservices can participate in the service mesh, gaining automatic mTLS and workload identity — eliminating the need to embed API keys in agent runtimes.

### 4.5 MCP Security

The Model Context Protocol (MCP) is the emerging standard for AI agent tool integration.

**MCP trust model:**

```
MCP Client (Agent) ←─── OAuth 2.1 ───→ MCP Server (Tool)
        ↑                                      ↑
   Agent identity                         Resource ACLs
   (SPIFFE SVID                           (per-tool, per-resource
    or Entra token)                        scoping)
```

**MCP security controls:**

- Server authentication before tool invocation
- Per-tool permission scoping
- Tool output validation before agent processing
- Audit logs of every MCP call including agent ID, tool, parameters, and result
- Rate limiting per agent per tool

See [MCP & A2A Deep Dive](../enterprise-architecture/ai-architecture/mcp-a2a-protocol-deep-dive.md) for full protocol specification.

### 4.6 Prompt Gateway

The prompt gateway is a security-as-infrastructure layer that sits between AI consumers and AI models:

```
User / Agent
     ↓
Prompt Gateway
  ├─ Authentication & Authorization
  ├─ Input filtering (PII, injection patterns, jailbreak detection)
  ├─ Rate limiting & cost controls
  ├─ Model routing (primary / fallback)
  ├─ Output filtering (toxicity, PII, hallucination detection)
  ├─ Audit logging
  └─ Policy enforcement (governance rules)
     ↓
LLM / Model API
```

See [Security Patterns — Enterprise Prompt Gateway](13-security-patterns.md) for the reference implementation pattern.

---

## 5. Technology Layer

### 5.1 Network Security Technologies

| Technology | Purpose | Modern Implementation |
| --- | --- | --- |
| Segmentation | Isolate network zones | Software-defined microsegmentation (Illumio, Guardicore) |
| Zero Trust Network Access | Replace VPN with identity-aware access | Zscaler ZPA, Cloudflare Access, Netskope |
| SASE | Converge SD-WAN + SSE | Palo Alto Prisma SASE, Zscaler SASE, Cisco+ |
| Firewall | L3-L7 traffic filtering | NGFW (Palo Alto, Fortinet, Check Point) |
| DDoS protection | Absorb volumetric attacks | Cloudflare Magic Transit, AWS Shield Advanced |

### 5.2 Kubernetes Security

Kubernetes is the dominant container orchestration platform. Security controls at each layer:

| Layer | Control | Tool |
| --- | --- | --- |
| **API server** | RBAC, admission controllers, audit logs | OPA Gatekeeper, Kyverno |
| **Node** | CIS Benchmark hardening, immutable OS | Bottlerocket, Flatcar |
| **Pod** | Security contexts, no root, read-only FS | Pod Security Standards |
| **Network** | Network policies, mTLS | Cilium, Calico, Istio |
| **Image** | Signed images, vulnerability scanning | Cosign, Trivy, Snyk |
| **Secrets** | External secrets operator, no env-var secrets | Vault, AWS SSM, External Secrets Operator |
| **Runtime** | Syscall filtering, anomaly detection | Falco, Sysdig |

### 5.3 Confidential Computing

**Technology stack:**

| Technology | Provider | Use Case |
| --- | --- | --- |
| **Intel TDX** (Trust Domain Extensions) | Intel | VM-level memory encryption |
| **AMD SEV-SNP** | AMD | Secure Encrypted Virtualization |
| **AWS Nitro Enclaves** | AWS | Isolated compute for sensitive processing |
| **Azure Confidential VMs** | Microsoft | Confidential computing on Azure |
| **Google Confidential VMs** | Google | GCP confidential compute |

**AI use cases for confidential computing:**

- Private inference: customer data never leaves encrypted memory during LLM inference
- Confidential fine-tuning: model training on sensitive data without exposure to cloud provider
- Secure multi-party computation: collaborative model training without data sharing

### 5.4 Hardware Security

| Technology | Purpose | Relevance |
| --- | --- | --- |
| **TPM 2.0** (Trusted Platform Module) | Platform attestation, key storage | Device health verification in Zero Trust |
| **HSM** (Hardware Security Module) | Cryptographic key management | Key generation, storage, and operations for PKI and encryption |
| **Secure Boot** | Firmware integrity verification | Prevent boot-level malware (bootkits) |
| **Secure Enclaves** (Intel SGX, ARM TrustZone) | Isolated execution environments | Process sensitive AI inference without host OS access |

### 5.5 Supply Chain Security

Software supply chain attacks (SolarWinds, Log4Shell, XZ Utils) have elevated supply chain security to board-level concern.

**Controls:**

- **SBOM** (Software Bill of Materials): Inventory of all software components and dependencies
- **AIBOM** (AI Bill of Materials): Inventory of model components, training data sources, and inference dependencies
- **Sigstore / Cosign**: Cryptographic signing of software artefacts
- **SLSA** (Supply-chain Levels for Software Artifacts): Framework for build provenance and integrity
- **Dependency track**: Automated vulnerability monitoring for SBOM components
- **Private artifact registries**: Control over package sources; no direct public registry access in production
