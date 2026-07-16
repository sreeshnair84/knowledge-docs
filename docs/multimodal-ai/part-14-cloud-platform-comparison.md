---
title: "Part 14 — Cloud Platform Comparison for Multimodal AI"
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["multimodal-ai", "cloud-platforms", "aws-bedrock", "azure-ai-foundry", "google-vertex-ai", "databricks", "nvidia", "platform-comparison"]
---

# Part 14 — Cloud Platform Comparison for Multimodal AI

Comprehensive evaluation of enterprise AI platforms for multimodal workloads — covering modality support, agent integration, compliance posture, governance tooling, and cost models across eight major platforms.

> **Audience:** Enterprise Architects, Cloud Solution Architects, AI Platform Engineers, AI Risk & Compliance Officers
> **Coverage:** OpenAI · Azure AI Foundry · AWS Bedrock · Google Vertex AI · Databricks · NVIDIA · Hugging Face · Anthropic
> **As of:** July 2026

---

## Evaluation Framework for Cloud Platforms

Selecting a cloud platform for enterprise multimodal AI is not a benchmark leaderboard exercise. The right platform depends on your existing cloud footprint, compliance requirements, data gravity, team expertise, and operational model. A platform that scores highest on a public benchmark may be completely unacceptable for a HIPAA-regulated healthcare workload running in a specific geography.

### Key Evaluation Dimensions

**Modality Support:** Which modalities are natively supported in the base model vs requiring integration with separate specialized services? A platform that offers vision in the foundation model but requires a separate service for audio adds integration complexity and multi-service compliance burden.

**Agent Integration:** Does the platform provide native agentic orchestration, tool calling, memory, and multi-step planning? Or does it require external frameworks (LangChain, LlamaIndex, custom code)?

**Guardrails:** Are content safety and policy enforcement built into the platform, or must they be implemented externally? Native guardrails are easier to audit and demonstrate to regulators.

**Governance:** What tooling exists for model versioning, policy-as-code, access control, audit logging, and cost attribution? Enterprise platforms must support RBAC, ABAC, and immutable audit logs without significant custom build.

**Cost:** What is the pricing model? Per-token API, per-GPU-hour, flat enterprise license, or reserved capacity? How does cost scale with multimodal inputs (images, audio minutes, video frames)?

**Compliance:** Which certifications and regulatory frameworks does the platform satisfy? SOC2, HIPAA BAA, FedRAMP, ISO 27001, PCI DSS, and regional data residency are the baseline enterprise requirements.

---

## Platform Deep Dives

### OpenAI Platform (API)

OpenAI's API platform is the widest-deployed multimodal foundation for enterprise AI, primarily through GPT-4o, which unifies vision, audio (voice mode), text, and document understanding in a single model endpoint.

**Multimodal Capabilities:** GPT-4o accepts images (JPEG, PNG, WebP, GIF), PDF documents (up to 2,048 pages), and text as inputs with native understanding — no separate preprocessing pipeline required. The Realtime API enables bidirectional audio streaming with sub-300ms round-trip latency, supporting voice-native applications. DALL-E 3 provides image generation. The Batch API processes requests asynchronously at 50% cost reduction versus synchronous inference — essential for cost optimization at scale.

**Assistants API:** Provides file uploads, retrieval, and code execution alongside vision, enabling multi-turn conversations grounded in uploaded documents. Supports up to 128K context.

**Enterprise Compliance:** SOC2 Type II certified. HIPAA BAA is available under the ChatGPT Enterprise agreement. Data is not used for training by default under the API terms.

**Limitations:** No native video understanding — video must be decomposed into frames by the application. No on-premises deployment option. Limited governance tooling — cost attribution and access control require custom build or third-party tools. No FedRAMP authorization.

---

### Azure AI Foundry / Azure OpenAI

Azure AI Foundry (formerly Azure AI Studio) is Microsoft's enterprise AI platform, integrating Azure OpenAI Service with Azure AI Vision, Azure Document Intelligence, Azure AI Speech, and Azure AI Content Safety into a unified development and deployment environment.

**Multimodal Capabilities:** GPT-4o deployments are available in Azure OpenAI with the same capabilities as the OpenAI API but running in Azure's global infrastructure with private network options. Azure AI Vision provides image analysis, OCR (Read API), spatial analysis, and custom vision models. Azure Document Intelligence (formerly Form Recognizer) delivers production-grade document extraction with layout analysis, form recognition, and custom model training. Azure AI Speech provides ASR, TTS, speaker recognition, and real-time transcription with 100+ language support.

**Agent Integration:** Azure AI Agent Service provides production-ready agentic orchestration with tool calling, memory, file retrieval, and built-in observability. Prompt Flow enables low-code multimodal pipeline orchestration with visual DAG authoring and built-in evaluation runs.

**Guardrails:** Azure AI Content Safety provides multimodal content filtering (text and image), hate/violence/sexual/self-harm detection, and Groundedness Detection for RAG outputs. Configurable severity thresholds per use case.

**Governance:** Azure Policy enforces organizational standards (e.g., models can only deploy in approved regions). RBAC via Azure Active Directory with fine-grained control over model access, fine-tuning, and deployment. Microsoft Purview integration enables data governance for AI — tracking which sensitive data is used in which AI pipelines. Cost attribution via Azure Cost Management with tag-based allocation.

**Compliance:** HIPAA BAA, FedRAMP High (Government cloud), SOC2 Type II, ISO 27001, PCI DSS, CSA Star. EU data residency available via EU data boundary. Private endpoints and VNet integration for data isolation. Suitable for most regulated industries.

---

### AWS Bedrock

AWS Bedrock is Amazon's managed foundation model service, providing access to a curated model catalog alongside Amazon's own multimodal models, with native integration into the broader AWS ecosystem including Textract, Rekognition, and Transcribe.

**Multimodal Capabilities:** Claude 3.5/3.7 Sonnet (vision + long document), Amazon Nova (multimodal: image, video, document), Stability AI (image generation) all available through a unified Bedrock API. Amazon Titan Multimodal Embeddings generates embeddings from images and text for multimodal RAG. Amazon Textract provides enterprise-grade document extraction with table, form, and signature detection. Amazon Rekognition handles object detection, facial analysis, content moderation, celebrity recognition, and custom label training. Amazon Transcribe provides ASR with speaker diarization, custom vocabulary, and real-time streaming support.

**Agent Integration:** Amazon Bedrock AgentCore is the production agent runtime — handles agent lifecycle, tool orchestration, memory, session management, and observability. Knowledge Bases for Amazon Bedrock provides managed multimodal RAG with automatic embedding, vector storage (Aurora PostgreSQL pgvector, OpenSearch, Pinecone), and hybrid retrieval.

**Guardrails:** Bedrock Guardrails provides configurable content filtering for text and image inputs/outputs, topic denial (blocking off-topic queries), PII detection and redaction, and grounding checks. Guardrails apply at the API layer before model inference — they cannot be bypassed by prompt engineering.

**Governance:** AWS Organizations and Service Control Policies (SCPs) enforce organizational guardrails across all accounts. IAM with resource-based policies controls model access at the identity level. AWS CloudTrail logs all Bedrock API calls for audit. Cost attribution via AWS Cost Explorer with tag-based allocation per team/use case/customer.

**Compliance:** HIPAA BAA, FedRAMP Moderate (GovCloud High in progress), SOC2 Type II, PCI DSS, ISO 27001, CSA Star. Data processed in Bedrock is not used for model training. GovCloud regions for US government workloads with stricter isolation.

---

### Google Vertex AI

Google Vertex AI is the enterprise ML platform from Google Cloud, anchored by the Gemini model family — the only natively omni-modal models available on a major cloud platform as of July 2026.

**Multimodal Capabilities:** Gemini 1.5 Pro supports up to 1M token context with native understanding of text, images, audio, video (up to 1 hour), and documents in a single model call — no frame extraction pipeline required for video analysis. Gemini 2.0 Flash adds native audio output and image generation alongside input understanding. Vertex AI Vision provides custom image classification and object detection with AutoML. Video Intelligence API delivers shot detection, label detection, transcription, and content moderation for video at scale. Speech-to-Text provides ASR with 125+ language support, speaker diarization, and streaming transcription. Document AI provides specialized processors for lending documents, identity documents, expense reports, and contracts with pre-trained extraction models.

**Agent Integration:** Vertex AI Agent Builder provides managed agent development with Gemini as the reasoning engine, tool calling, grounding with Google Search, and enterprise data connectors. Model Garden provides 100+ open and proprietary models for fine-tuning and deployment.

**Governance:** Vertex AI Model Registry with approval workflows for model promotion. Vertex AI Evaluation provides automated evaluation of multimodal model outputs. VPC Service Controls create a security perimeter around Vertex AI resources, preventing data exfiltration. RBAC via Google Cloud IAM. Organization Policy Service for centralized constraint enforcement.

**Compliance:** HIPAA BAA, FedRAMP Moderate, SOC2 Type II, ISO 27001, PCI DSS. Data residency enforced at region level. EU Sovereign Cloud option for European regulated workloads.

---

### Databricks Mosaic AI

Databricks Mosaic AI integrates foundation model APIs with the Databricks Lakehouse platform — the strongest platform for organizations whose primary data infrastructure is already Databricks and who want AI tightly coupled with their data engineering and governance layer.

**Multimodal Capabilities:** Foundation Model APIs provide access to Claude, Llama, DBRX, and custom VLMs through a unified endpoint with Databricks authentication and billing. MLflow 3 tracks multimodal experiments with image, audio, and video artifact logging. Vector Search provides managed vector indexing for multimodal RAG with integrated embedding generation.

**Agent Integration:** Databricks Agent Framework enables building agents that natively access Delta Lake tables, Unity Catalog-governed datasets, and MLflow-tracked models. Mosaic AI Agent Evaluation provides automated agent quality measurement including retrieval quality and response quality scoring.

**Governance:** Unity Catalog is the central governance layer — governing not just structured data tables but also model artifacts, feature tables, vector stores, and multimodal datasets. Fine-grained access control (row-level, column-level) on multimodal training data. AI Lineage tracks which datasets fed which model versions. Delta Lake provides ACID transactions on multimodal metadata tables.

**Compliance:** SOC2 Type II, ISO 27001, HIPAA BAA (Business Associate Agreement available). FedRAMP authorization in progress. Inherits cloud provider compliance (AWS, Azure, GCP) depending on deployment.

---

### NVIDIA AI Enterprise

NVIDIA AI Enterprise is the enterprise software platform for deploying AI on NVIDIA GPUs — available on-premises, in cloud provider instances, and through NVIDIA DGX Cloud. The defining advantage is full control over infrastructure and the ability to deploy in air-gapped environments.

**Multimodal Capabilities:** NIM (NVIDIA Inference Microservices) provide containerized, optimized inference for VLMs: NVCLIP (image embeddings), NEVA (vision-language), Kosmos (multimodal understanding), Whisper (ASR), Parakeet (ASR), and many open-source models including LLaVA variants and Qwen2-VL. Each NIM container is pre-optimized with TensorRT for the target GPU, providing 2–5× throughput improvement over vanilla PyTorch inference.

**Agent Integration:** NVIDIA Agent Intelligence toolkit provides primitives for building retrieval-augmented multimodal agents. Integration with LangChain, LlamaIndex, and custom frameworks through standard API endpoints.

**Guardrails:** NeMo Guardrails provides programmable safety for multimodal AI — defining allowed topics, response formats, and moderation actions through a declarative colang configuration. Supports integration with external content classifiers.

**Deployment:** Triton Inference Server is the production serving framework — supports ONNX, TensorRT, PyTorch, and custom backends; handles dynamic batching, concurrent model execution, and model versioning. Fully operational in air-gapped environments with no external network dependencies.

**Compliance:** On-premises deployment enables organizations to maintain their own compliance perimeter. No data leaves the organization's infrastructure. Suitable for defense, intelligence, and highly regulated healthcare.

---

### Hugging Face

Hugging Face Hub is the primary open-source model registry, hosting 10,000+ multimodal models including LLaVA, InternVL, Qwen2-VL, CogVLM, Whisper, and Stable Diffusion variants. For enterprises needing flexibility, cost control, and self-hosting, Hugging Face is the starting point.

**Multimodal Capabilities:** The Transformers library provides a unified API across all multimodal model architectures — the same `pipeline("image-to-text")` call works across dozens of VLMs. Inference Endpoints provides managed, dedicated endpoints for VLMs, Whisper, and document models — deployed in the cloud or on NVIDIA hardware, with SLA commitments. Spaces provides rapid prototyping environments.

**Governance:** Enterprise Hub provides private model repositories with RBAC, SSO (SAML, OIDC), and audit logs. Model Cards enforce documentation standards. Dataset access controls prevent unauthorized data access.

**Compliance:** Enterprise Hub has SOC2 Type II and GDPR compliance. Self-hosted inference (Inference Endpoints with dedicated hardware) keeps data within the organization's cloud account. No HIPAA BAA — for HIPAA workloads, deploy Inference Endpoints in a HIPAA-compliant cloud environment.

---

### Anthropic Claude (API)

Anthropic's Claude models are the strongest performers for long-context document understanding and nuanced reasoning over complex multimodal inputs, making them particularly suited for legal, compliance, and knowledge-intensive enterprise workflows.

**Multimodal Capabilities:** Claude 3.5/3.7 Sonnet accepts images (JPEG, PNG, GIF, WebP) and PDFs natively, with 200K token context window enabling analysis of book-length documents or large image collections in a single call. Computer Use capability enables Claude to interact with GUI applications by interpreting screenshots and generating keyboard/mouse actions — enabling a new class of workflow automation agents. Claude processes documents with layout understanding superior to most VLMs for complex mixed text-and-image layouts.

**Agent Integration:** The Anthropic Messages API supports tool use with parallel tool calling, enabling multi-tool agentic workflows. Integrates natively with LangChain, LlamaIndex, and Databricks Agent Framework. Amazon Bedrock and Google Vertex AI Model Garden both host Claude models, enabling integration within those platforms' governance and compliance tooling.

**Compliance:** SOC2 Type II certified. HIPAA BAA under development (check current status). No native video understanding. No FedRAMP authorization. Primarily API-only — no on-premises or VNet private deployment as of July 2026.

---

## Master Platform Comparison Matrix

| Capability | OpenAI | Azure AI Foundry | AWS Bedrock | Google Vertex AI | Databricks | NVIDIA AI Enterprise | Hugging Face | Anthropic |
|------------|--------|-----------------|-------------|-----------------|------------|---------------------|--------------|-----------|
| **Image** | Native | Native | Native | Native | Via FMAs | NIM VLMs | 10,000+ models | Native |
| **Video** | Frame only | Frame only | Amazon Nova | Native (1hr+) | Via FMAs | Via NIMs | Many models | No |
| **Audio** | Realtime API | Azure Speech | Transcribe | Native | Via FMAs | Whisper NIM | Whisper | No |
| **Document** | PDF native | Doc Intelligence | Textract | Document AI | Delta Lake | Via NIMs | Many models | PDF native |
| **Native Agents** | Assistants API | Agent Service | AgentCore | Agent Builder | Agent Framework | Partial | No | Tool use only |
| **Guardrails** | Moderation API | AI Content Safety | Bedrock Guardrails | Safety filters | NeMo (via NVIDIA) | NeMo Guardrails | Limited | Constitutional AI |
| **Managed RAG** | File Search | AI Search | Knowledge Bases | RAG on Vertex | Vector Search | No | No | No |
| **Evaluation SDK** | Evals API | AI Evaluation SDK | Bedrock Evaluation | Vertex Eval | Mosaic AI Eval | No | Evaluate library | No |
| **Fine-tuning** | Yes | Yes | Limited | Yes | Yes (custom) | Yes | Yes | Limited |
| **HIPAA** | BAA available | BAA available | BAA available | BAA available | BAA available | Self-managed | No | In development |
| **FedRAMP** | No | High (Gov) | Moderate (GovCloud) | Moderate | No | Self-managed | No | No |
| **VNet/Private** | No | Yes | VPC endpoints | VPC SC | Yes | Yes | Dedicated endpoints | No |
| **On-Premises** | No | No | No | No | No | Yes (DGX) | Self-hosted | No |
| **Cost Model** | Per token/image | Per token/image | Per token/image | Per token/image | Per token + DBU | Per GPU-hour | Per GPU-hour | Per token/image |
| **Terraform** | Unofficial | Yes (azurerm) | Yes (aws) | Yes (google) | Yes | Yes | Limited | Unofficial |

*Legend: "Via FMAs" = via Foundation Model APIs. "Native" = first-class model capability. As of July 2026 — verify current status.*

---

## Selection Decision Tree

```mermaid
flowchart TD
    A[Start: Choose Platform for Multimodal AI] --> B{Air-gapped or\nstrict on-prem required?}
    B -->|Yes| C[NVIDIA AI Enterprise\nDGX on-prem + NIM + Triton]

    B -->|No| D{Primary cloud provider?}

    D -->|Azure-first| E{FedRAMP High required?}
    E -->|Yes| F[Azure AI Foundry\nGov Cloud + FedRAMP High]
    E -->|No| G[Azure AI Foundry\nPrivate endpoint + AOAI]

    D -->|AWS-first| H{Managed agents + broad compliance?}
    H -->|Yes| I[AWS Bedrock\nAgentCore + Guardrails]
    H -->|No| J[AWS Bedrock\nAPI access only]

    D -->|GCP-first| K[Google Vertex AI\nGemini native video + 1M context]

    D -->|Multi-cloud or none| L{Primary workload?}

    L -->|Video-heavy / long context| M[Google Vertex AI\nGemini 2.0 native video]
    L -->|Document / legal / compliance| N[Anthropic Claude\nvia Bedrock or Vertex]
    L -->|Lakehouse / data engineering| O[Databricks Mosaic AI\nUnity Catalog + Agent Framework]
    L -->|OSS / self-hosted / research| P[Hugging Face\nInference Endpoints + Transformers]
    L -->|Widest ecosystem / default| Q[OpenAI API\nGPT-4o + Assistants]
```

---

## Multi-Cloud Multimodal Architecture

### Why Single-Cloud for Multimodal Is a Risk

Single-cloud dependency for multimodal AI introduces three compounding risks:

**Model availability risk:** Cloud provider VLMs can be deprecated, rate-limited, or geographically unavailable during outages. GPT-4o was unavailable for several hours during major Azure incidents in 2024–2025. A platform solely dependent on one provider's VLM cannot route to an alternative without significant re-engineering.

**Compliance risk:** As multimodal AI regulations evolve, a single cloud provider may fail to achieve required certifications in new geographies (e.g., EU AI Act compliance, regional data residency). Organizations with operations across multiple jurisdictions need flexibility to route workloads to compliant providers.

**Cost lock-in risk:** Providers can and do increase API pricing. A customer entirely dependent on one provider for VLM inference has no negotiating leverage and no fallback. Having a qualified alternative reduces pricing risk significantly.

### Cross-Cloud Routing Patterns

**Abstraction layer:** Implement a model router that accepts a standard inference request and routes to the appropriate provider based on configured rules. The abstraction layer normalizes provider API differences (token counting, image encoding, response format) behind a unified internal API.

**Capability-based routing:** Route based on the required capability: long-video tasks to Vertex AI (Gemini); document understanding to Anthropic (Claude via Bedrock); standard visual QA to whichever provider has lowest latency and cost at the time of the request.

**Failover routing:** Primary provider configured per use case; secondary provider pre-configured and tested as failover. Automated circuit breaker triggers failover on primary provider errors. Regular quarterly failover drills ensure the secondary path remains operational.

### Data Gravity Considerations for Video and Audio

Large media files (video archives, audio recordings) create data gravity — the cost and latency of moving data between cloud providers makes it economically impractical to route processing away from the storage location. For a 5PB video archive stored in S3, routing to Vertex AI for Gemini video inference would cost millions in egress fees.

Design principle: **process data where it lives, or replicate at ingest time**. For multi-cloud multimodal, either run inference in the same cloud as storage (using the native provider) or implement a data replication strategy that pre-positions data in each cloud before inference season begins.

---

## Interview Use Cases

**Q: A global bank needs to deploy a multimodal AI system that processes customer documents and voice calls. It must meet GDPR (EU), MAS TRM (Singapore), and APRA (Australia) simultaneously, with data residency in each region. How do you architect this?**

A: I would deploy a geographically isolated multi-region architecture with three sovereign data planes — EU, Singapore, and Australia — and a single global control plane for governance and orchestration. Each data plane contains a complete multimodal AI stack: document processing (OCR, VLM), voice transcription and analytics, and vector search — all running within the regulatory boundary of that jurisdiction. Data never crosses regulatory boundaries at rest or in transit. For the EU data plane, I would deploy Azure AI Foundry in an EU-only region (Netherlands, France) with Azure Private Link for all API access, ensuring no data transits through non-EU Azure infrastructure. Azure's EU data boundary commitment provides the GDPR Article 44 data transfer mechanism. For Singapore (MAS TRM), I would use AWS Bedrock in the Singapore region (ap-southeast-1) with AgentCore and Knowledge Bases. MAS TRM requires that material workloads have documented business continuity with recovery time < 4 hours — implement active-passive failover to the Malaysia region. For Australia (APRA CPS 234), I would use Google Vertex AI in the Australia region (australia-southeast1) — APRA requires that data be stored in Australia and that the bank maintains control over security of the data. The global control plane (hosted in a neutral region or on-premises) handles model governance: model registry, policy-as-code (OPA), compliance reporting, and cost attribution across all regions. Each regional data plane reports aggregated metrics (no PII) to the global control plane. The model registry approves which model versions may run in each region — a model approved for EU must separately pass review for Singapore and Australia given different regulatory requirements.

**Q: Compare AWS Bedrock and Azure AI Foundry for building a healthcare multimodal agent that processes radiology images and clinical notes. Which would you recommend and why?**

A: Both platforms satisfy HIPAA BAA requirements, which is the threshold question. The choice comes down to three factors specific to healthcare multimodal. First, existing cloud footprint: if the hospital or health system is primarily Microsoft-invested (Epic on Azure, Microsoft 365), Azure AI Foundry wins on integration — Azure AD SSO, Teams integration, and Microsoft Purview for data governance are already in use. If the health system is AWS-native (Cerner on AWS, data lake in S3), Bedrock is the obvious choice. Second, specialized clinical services: Azure has a meaningful advantage with Azure Health Data Services (FHIR R4 API, DICOM service, MedTech service for IoT) — for a radiology workflow that ingests DICOM images, Azure's native DICOM service eliminates a significant integration build. AWS has Amazon HealthLake but it is less mature for imaging workflows. Third, model quality for clinical reasoning: Claude 3.7 Sonnet (available on both platforms) consistently outperforms GPT-4o on long-context clinical document analysis in published evaluations. On AWS Bedrock, I would use Claude via Bedrock + Amazon Textract for clinical note structure extraction + custom HealthLake FHIR integration. On Azure, I would use Claude or GPT-4o via AOAI + Azure Document Intelligence for clinical note extraction + Azure Health Data Services DICOM service. My recommendation in most cases: Azure AI Foundry, because the DICOM service + Health Data Services + Purview governance integration is materially ahead of AWS for DICOM-native workflows, and the Microsoft ecosystem alignment matters for enterprise healthcare clients. The exception: if the health system's data lake is in S3 and they use AWS data analytics services, Bedrock is the practical choice to avoid cross-cloud data movement.

**Q: How would you migrate from a single-cloud multimodal AI deployment to a multi-cloud architecture without downtime?**

A: A five-phase migration over 12–18 weeks. Phase 1 (weeks 1–2): Introduce an abstraction layer — a model router service that sits between the application and the cloud provider API. The router initially passes all traffic to the existing provider. This is a non-breaking change and can be deployed and validated without any user impact. Phase 2 (weeks 3–4): Implement the secondary provider integration behind the router. Test all use cases against the secondary provider in a staging environment. Validate output quality parity, response format normalization, error handling, and cost instrumentation. Phase 3 (weeks 5–8): Shadow routing — route 100% of traffic to the primary provider but simultaneously replay a copy to the secondary provider. Compare outputs without surfacing secondary results to users. This validates that the secondary provider produces acceptable quality on production traffic distribution. Phase 4 (weeks 9–12): Canary shift — route 5% of traffic to the secondary provider, monitor error rates, latency, and quality metrics. Increase to 20%, then 50% over two weeks, with rollback capability at each stage. Phase 5 (weeks 13–18): Capability-based routing configured per use case. Long-video tasks routed to Vertex; document analysis to Claude via Bedrock; standard visual QA load-balanced across providers by cost and latency. Full failover automation tested quarterly. The key success factor is the abstraction layer — without it, multi-cloud migration requires application changes at every provider integration point, which is prohibitively expensive and risky.

**Q: A government agency needs to process classified documents with vision AI in an air-gapped environment. Walk through the architecture.**

A: The architecture must assume zero internet connectivity and operate entirely from pre-loaded artifacts. Six components. Infrastructure: NVIDIA DGX H100 systems or equivalent on-premises GPU hardware. Kubernetes cluster (k3s for simplified air-gap operation) running the inference stack. No external network interfaces — physically isolated rack. Model delivery: ship model weights and NIM container images on approved removable media (encrypted, hash-verified) from an internet-connected build environment. Establish a formal model approval process: each model version is digitally signed on the internet side by the AI governance team, signature verified on the air-gapped side before deployment. Inference stack: NVIDIA Triton Inference Server running VLM NIM containers (Qwen2-VL or InternVL depending on document classification requirements). OCR via Tesseract or a validated commercial OCR engine packaged as a container. Embedding generation via a locally deployed embedding model. Vector search via Milvus or Weaviate running on-cluster. Governance: OPA running on-cluster evaluates policies against the classification level of each document. Model registry (MLflow on-premises) tracks all model versions and approvals. Audit logs written to an on-premises WORM storage system (NetApp ONTAP SnapLock or equivalent) — no log egress. Security controls: all inference requests authenticated against an on-premises identity provider (Active Directory). Input sanitization pipeline validates document format and classification markings before inference. Output review gate — inference outputs are queued for human review before any downstream action. Outputs containing classification markings are automatically redacted from logs (only metadata retained). Updates: model updates follow a periodic offline update process — authenticated media transfer with signature verification. A quarterly update cycle is typical for government air-gapped environments.

---

## Related

- [Part 12 — Observability & FinOps](./part-12-observability-finops) — platform-specific cost models and observability tooling
- [Part 13 — Governance & Production Engineering](./part-13-governance-production) — governance tooling available per platform
- [Part 9 — Compliance & Responsible AI](./part-09-compliance-responsible-ai) — regulatory mapping that drives platform selection criteria
- [Databricks Agentic AI Reference](../databricks-agentic-ai/index.md) — deep dive on Databricks Mosaic AI capabilities
