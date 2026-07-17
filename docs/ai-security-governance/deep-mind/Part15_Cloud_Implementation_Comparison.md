---
title: "Part 15: Cloud Implementation Comparison"
date_created: 2026-07-11
last_reviewed: 2026-07-17
status: current
supersedes: ""
source_type: converted-pdf
source_file: "Part15_Cloud_Implementation_Comparison.pdf"
tags: [ai-security, cloud, deepmind, multi-part-series]
doc_type: guide
covers_version: "2026"
---

<!-- converted from Part15_Cloud_Implementation_Comparison.pdf -->



##### **PART 15 OF 18**

# Cloud Implementation Comparison
AWS Bedrock AgentCore, Azure AI Foundry, Google Vertex AI, Framework Comparison (LangGraph, CrewAI, AutoGen), Open-Source Stack

## **ENTERPRISE AI CONTROL ARCHITECTURE**

Implementation Guide for Production AI Systems • 2026





## **15.1 Cloud Platform Comparison for Enterprise AI Agents**

The three major cloud providers have each built enterprise-grade AI agent platforms with different architectural philosophies, security models, and maturity levels. The choice of platform has significant implications for security architecture, operational complexity, and vendor lock-in. This analysis provides an objective comparison based on publicly available documentation and reported enterprise deployments as of mid-2026.

## **15.2 AWS: Amazon Bedrock AgentCore**


AWS Bedrock AgentCore (launched 2025) provides a production-grade agent execution platform deeply integrated with the AWS security ecosystem. AgentCore focuses on enterprise security primitives, making it the most security-complete platform for enterprises already invested in AWS.

### **15.2.2 Security Capabilities**

|**Capability**|**Implementation**|
|---|---|
|Identity|AWS IAM with STS AssumeRole; task-scoped session policies; IAM Roles Anywhere<br>for hybrid deployments|
|Authorization|Amazon Verified Permissions using Cedar; fine-grained, goal-aware policy evaluation|
|Tool Security|Bedrock AgentCore MCP server management; tool invocation via Lambda (isolated<br>execution)|
|Memory|AgentCore Memory with DynamoDB backend; encryption at rest with KMS; access<br>logging with CloudTrail|
|Observability|CloudWatch + CloudTrail + Bedrock-specific traces; integrates with Arize Phoenix via<br>Lambda|
|Threat Detection|Amazon GuardDuty for ML-based anomaly detection; Macie for sensitive data detection<br>in agent outputs|
|Network|VPC isolation; PrivateLink for private API access; WAF for agent endpoint protection|
|Compliance|SOC 2, ISO 27001, HIPAA BAA, FedRAMP; GDPR data residency via region selection|



### **15.2.3 AWS Strengths**

- Most mature policy-as-code framework (Cedar) in the industry

- Deep integration with AWS security services provides comprehensive defense-in-depth

- GuardDuty and Macie integration provides automated threat detection

- Best-in-class secret management with Secrets Manager and KMS

- IAM fine-grained permissions provide strong least-privilege implementation

- AgentCore MCP management provides enterprise-grade tool governance





### **15.2.4 AWS Weaknesses**

- Significant vendor lock-in: Cedar, AgentCore APIs, and Bedrock models are AWS-proprietary

- Multi-cloud deployments require significant additional architecture work

- Cost complexity: multiple overlapping services create difficult cost modeling

- GuardDuty anomaly detection models not trained on AI agent behavior patterns

## **15.3 Microsoft Azure: Azure AI Foundry**


Azure AI Foundry (formerly Azure AI Studio, rebranded 2024) provides an integrated development and deployment platform for enterprise AI agents. Microsoft's strength lies in Entra ID integration, Microsoft Defender ecosystem, and Office 365 data connectivity for enterprise agents.

|**Capability**|**Implementation**|
|---|---|
|Identity|Entra ID Workload Identity Federation; Managed Identities for Azure compute; Entra<br>External ID for cross-tenant|
|Authorization|Azure RBAC + Entra ID Conditional Access; no Cedar equivalent; custom policy<br>requires Azure Policy or OPA|
|Tool Security|Azure Functions as tool execution; API Management for tool governance; Key Vault for<br>secrets|
|Memory|Azure AI Search + Cosmos DB for memory; CMK encryption; private endpoints|
|Observability|Azure Monitor + Application Insights; Microsoft Security Copilot for AI-assisted SOC<br>functions|
|Threat Detection|Microsoft Defender for Cloud with AI-specific detections; Sentinel for SIEM integration|
|Network|Private Link; VNet integration; Azure Front Door for WAF|
|Compliance|Comprehensive: SOC 2, ISO 27001, HIPAA, FedRAMP High, EU AI Act readiness|



### **15.3.2 Azure Strengths and Weaknesses**

#### **Strengths**

- Best Microsoft 365 integration for enterprise agents accessing email, calendar, Teams, SharePoint

- Microsoft Defender + Sentinel ecosystem for comprehensive threat detection

- Entra ID is the enterprise identity standard for Microsoft-heavy organizations

- Microsoft Security Copilot provides AI-assisted SOC capabilities

- Strong compliance coverage particularly for European enterprises

#### **Weaknesses**

- Authorization policy framework less mature than Cedar; requires more custom development

- AI-specific security controls less specialized than AWS at time of analysis





- Foundry platform more development-oriented than production-operations-oriented

## **15.4 Google Cloud: Vertex AI Agent Builder**


Google Cloud's agent platform (Vertex AI Agent Builder + Gemini models + Cloud IAM) benefits from Google's deep AI research heritage and the A2A protocol as an open standard for agent interoperability. Google Cloud IAM provides workload identity through Workload Identity Federation.

|**Capability**|**Implementation**|
|---|---|
|Identity|Workload Identity Federation; Service Account impersonation; SPIFFE-compatible<br>identity|
|Authorization|Cloud IAM with condition-based access; no Cedar equivalent; VPC Service Controls for<br>perimeter|
|Tool Security|Cloud Functions / Cloud Run for tool execution; Artifact Registry for tool container<br>management|
|Memory|Vertex AI Vector Search + Cloud Bigtable; CMEK; VPC Service Controls|
|Observability|Cloud Logging + Cloud Trace + Cloud Monitoring; Security Command Center for threat<br>detection|
|Threat Detection|Security Command Center; Chronicle SIEM; Event Threat Detection|
|Network|VPC Service Controls; Private Google Access; Cloud Armor WAF|
|Compliance|SOC 2, ISO 27001, HIPAA, FedRAMP; strong GDPR EU region support|



## **15.5 Agent Framework Comparison**

|**Framework**|**Model**|**Multi-Ag**<br>**ent**|**Human-in-L**<br>**oop**|**Production**<br>**Maturity**|**Security Features**|
|---|---|---|---|---|---|
|LangGraph|Graph-based<br>stateful agents|Yes (mult<br>i-node<br>graphs)|Built-in<br>interrupt<br>points|HIGH -<br>widely<br>deployed|Checkpoint/rollback; state<br>persistence; extensible<br>PEP hooks|
|CrewAI|Role-based<br>agent crews|Yes<br>(crew co<br>ordinatio<br>n)|Limited<br>built-in|MEDIUM-HI<br>GH|Role-based access within<br>crew; basic tool<br>governance|
|AutoGen|Conversationa<br>l multi-agent|Yes (con<br>versation<br>framewor<br>k)|Human<br>proxy agent|MEDIUM|Basic authorization hooks;<br>good for<br>research/prototyping|







|**Framework**|**Model**|**Multi-Ag**<br>**ent**|**Human-in-L**<br>**oop**|**Production**<br>**Maturity**|**Security Features**|
|---|---|---|---|---|---|
|Semantic<br>Kernel|Plugin-based,<br>enterprise-foc<br>used|Partial|Process<br>automation<br>integration|HIGH -<br>enterprise<br>use|Strong Azure integration;<br>policy-based plugin<br>governance|
|Anthropic<br>Agents SDK|Native<br>Anthropic<br>integration|Yes|Built-in<br>approval<br>gates|HIGH -<br>production<br>ready|Deep constitutional AI<br>integration; safety-first<br>design|
|LlamaIndex<br>Workflows|Event-driven<br>agentic<br>workflows|Yes (mult<br>i-agent)|Event-based<br>interrupts|MEDIUM-HI<br>GH|Good observability;<br>extensible security hooks|



## **15.6 Open-Source Security Stack**

For enterprises that require vendor independence, maximum control, or highly regulated environments, an open-source security stack can provide comparable security to cloud platform native offerings. The stack requires more engineering investment but provides maximum flexibility.

|**Layer**|**Open Source**<br>**Component**|**Alternative to**|**Maturity**|
|---|---|---|---|
|Identity|SPIFFE/SPIRE|Cloud Workload Identity|HIGH -<br>CNCF<br>graduated|
|Authorization|OPA / Rego or OpenFGA|Cedar / Azure Policy|HIGH -<br>widely<br>deployed|
|Secrets|HashiCorp Vault (OSS)|AWS Secrets Manager|HIGH -<br>enterprise<br>standard|
|Observability|OpenTelemetry +<br>Grafana + Jaeger|CloudWatch / Azure<br>Monitor|HIGH -<br>CNCF<br>graduated|
|Security<br>Monitoring|Falco (eBPF) + Elastic<br>SIEM|GuardDuty / Sentinel|HIGH -<br>widely<br>deployed|
|Agent<br>Orchestration|LangGraph / Apache<br>Airflow|Bedrock AgentCore|HIGH|
|Vector<br>Memory|Weaviate / Milvus /<br>Qdrant|Vertex Vector Search|HIGH -<br>production<br>ready|
|AI<br>Observability|Langfuse + Arize Phoenix|CloudWatch Bedrock<br>logs|MEDIUM-<br>HIGH|
|Policy Engine|OPA Gatekeeper|Verified Permissions|HIGH|







|**Layer**|**Open Source**<br>**Component**|**Alternative to**|**Maturity**|
|---|---|---|---|
|Container<br>Security|Falco + Trivy + Cosign|GuardDuty Container|HIGH|
