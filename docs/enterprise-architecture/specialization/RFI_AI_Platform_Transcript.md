---
title: "REQUEST FOR INFORMATION"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "RFI_AI_Platform_Transcript.pdf"
doc_type: workshop-transcript
tags: ["enterprise-architecture"]
last_reviewed: 2026-07-10
session_type: "workshop"
related_pages: ["—"]
---
## Audience

**Page 1** 

##### **ENTERPRISE ARCHITECTURE | PROCUREMENT** 

# **REQUEST FOR INFORMATION** 

## **AI & ML Platform Selection** 

**A Verbatim Transcript — From Decision to Shortlist** 

Following the RetailCo AI Transformation Programme, Marcus Webb (Enterprise Architect) and Sarah Chen (CAIO) run a formal RFI process to select an enterprise AI and ML platform. This transcript captures every conversation, every vendor briefing, every governance tension, and every scoring decision — from the moment the need is recognised to the final shortlist recommendation. 

|**RFI Reference**|RFI-2026-AI-001|
|---|---|
|**Issuing Organisation**|RetailCo plc — Enterprise Architecture & CAIO Office|
|**Scope**|Enterprise AI & ML Platform (MLOps, LLM, Data, Governance)|
|**Issued**|7 July 2026|
|**Response Deadline**|5 August 2026|
|**EA Owner**|Marcus Webb — Enterprise Architect|
|**CAIO Owner**|Sarah Chen — Chief AI Officer|
|**Vendors Invited**|6 (Microsoft Azure, AWS, Google Cloud, Databricks, DataRobot, Snowflake)|
|**Vendors Responded**|5|
|**Process Stage**|RFI→Shortlist→RFP→Contract|

**1. DECISION 2. DRAFTING 3. MARKET 4. RESPONSES 5. EVALUATION 6. SHORTLIST 7. DEBRIEF** 

**Page 2** 

## **PHASE 1 — DECISION** 

#### Why an RFI? Why Now? Week 1 | Monday 7 

July 2026 

Eighteen months into the AI transformation, RetailCo's ML platform — built on AWS SageMaker as a minimum viable foundation — is approaching its limits. Three production models, 47 experimental models, a growing feature store, and a new GenAI workstream are all running on infrastructure that was designed to prove the concept, not scale it. Sarah Chen calls the review meeting. 

I **09:00 | Monday 7 July 2026** I Architecture Studio, Floor 8 

#### I **AI Platform Review — Scale Decision** 

Attendees: Marcus (EA), Sarah (CAIO), James (Eng), Dr. Amara (DS), Wei (MLOps), Priya (Data) 

##### **Sarah Chen — CAIO** 

Eighteen months ago we made a deliberate decision to build on SageMaker because it was fast, familiar to James's team, and got us to production quickly. That was the right decision then. Let me tell you why it's the wrong decision now. Wei — walk them through what happened last Tuesday. 

##### **Wei Zhang — MLOps Engineer** 

Last Tuesday we tried to onboard the GenAI customer service workstream onto the existing platform. The vector database for the RAG architecture doesn't have a native home in SageMaker. The experiment tracking — MLflow — doesn't have a native integration with the LLM evaluation tooling we need. The feature store works beautifully for structured tabular data but has no concept of unstructured embeddings. We can bolt things together with custom code. But every bolt is technical debt and a future maintenance burden. 

##### **Dr. Amara Osei — Head of Data Science** 

There's also a team productivity issue. Every time I want to run a new model type I'm fighting the platform instead of working on the model. At DeepMind, the platform was invisible — you focused on the science and the infrastructure just worked. Here I spend 30% of my time doing infrastructure work that shouldn't be my job. 

##### **Marcus Webb — EA** 

Before we decide anything, I want to be clear about what we are and are not deciding today. We are deciding whether to run a formal market assessment of enterprise AI platforms. We are NOT deciding to migrate off SageMaker. Those are different decisions and I will not conflate them. The first decision is a process question. The second is an architectural commitment that needs governance and a business case. 

##### **Sarah Chen — CAIO** 

Agreed. So — do we run an RFI? 

##### **James Owusu — Head of Engineering** 

We should. But I want to be honest about the risk. We run an RFI, we shortlist vendors, we write an RFP, we do a proof of concept, we select a platform, we migrate. That is twelve to eighteen months of work on top of what we're already doing. Is there a faster path? 

##### **Marcus Webb — EA** 

There's always a faster path. The faster path is what gave us the 2018 middleware layer we spent £8 million replacing. James, if we make an 'AI platform' decision without a structured evaluation, we will be locked into a vendor choice that constrains us for five to seven years. That choice needs to be made with full market visibility. That's what an RFI is for. 

##### **Sarah Chen — CAIO** 

**Page 3** 

Karen needs a business case framing. Marcus — what's the cost of staying on the current platform? 

##### **Marcus Webb — EA** 

Wei, how many hours per sprint is the team spending on platform workarounds? 

##### **Wei Zhang — MLOps Engineer** 

About 12 hours per sprint, per data scientist. That's 24 hours across Amara's team. Over a year, that's 52 weeks times 24 hours — 1,248 hours of senior data science time spent on platform maintenance instead of model development. At fully-loaded cost, that's approximately £187,000 per year in productivity lost. And it gets worse as the team grows. 

##### **Marcus Webb — EA** 

£187,000 per year in opportunity cost, growing. That's the cost-of-inaction number for Karen's business case. Alright — I'm recommending we run a formal RFI. Procurement and Legal need to be in the room for the governance conversation. 

I _Marcus (internal): The decision to run an RFI is itself an architectural decision. A badly-run RFI produces a shortlist that reflects the vendor who wrote the best pitch deck, not the best fit for the organisation. I need to design the RFI process as carefully as I design a system architecture. Requirements first. Evaluation criteria before we talk to a single vendor. Scoring methodology agreed before we see any responses._ 

Marcus calls Procurement — Nadia Ferris — and Legal — Howard Pang — the same afternoon. 

I **15:30 | Monday 7 July 2026** I Procurement Office, Floor 4 

##### **Nadia Ferris — Head of Procurement** 

Marcus, before you brief the vendors — the standard process. Any technology purchase over £500,000 must go through formal competitive tender. An RFI is fine at this stage but you need to register this with me before you make any market contact. I also need to be in every vendor conversation to ensure we don't create any commercial obligations through informal discussions. 

##### **Marcus Webb — EA** 

Nadia, understood. I'm formally registering the RFI process with you today. I also want your input on the vendor list — I don't want to exclude any credible player because we have a pre-existing relationship with one of them. 

##### **Howard Pang — Legal** 

Marcus — two things from Legal. One: the RFI document must include a clear statement that responses do not create any contractual commitment from either party. Two: any vendor who responds will be sharing commercially sensitive roadmap information with us. We need an NDA in place with each vendor before they receive the RFI. Standard form — I'll provide the template. 

##### **Marcus Webb — EA** 

NDA before RFI dispatch. Good catch, Howard. What's the turnaround on NDAs? 

##### **Howard Pang — Legal** 

Five working days typically. If vendors take issue with our standard terms, add another week. Don't let a vendor pressure you into waiving the NDA — their roadmap data is genuinely confidential and we need the protection both ways. 

##### **Nadia Ferris — Head of Procurement** 

One more thing, Marcus. I've seen EA teams run RFIs that are so technically specific that only one vendor can actually meet the requirements. That creates a challenge to the process validity. Make sure your evaluation criteria are outcome-focused, not product-feature-focused. You're buying a capability, not a specific product. 

**Page 4** 

##### **Marcus Webb — EA** 

That's exactly the right instinct, Nadia. The RFI will ask vendors how they would meet our outcomes, not whether they have a specific feature checkbox. 

I _EA PRINCIPLE: RFI requirements must be outcome-focused, not feature-focused. A feature-specific RFI is a vendor selection dressed up as a market assessment. The moment you ask 'do you support Kubernetes?' instead of 'how do you support containerised model deployment?', you have written a vendor brief, not an RFI._ 

##### **Phase Outcomes** 

I Decision to run formal RFI approved — registered with Procurement (Nadia Ferris) 

I Cost-of-inaction baseline: £187K/year in data science productivity loss, growing 

I Legal governance confirmed: NDA required before RFI dispatch; no contractual language 

I RFI principles agreed: outcome-focused requirements, not feature checklists 

I Evaluation criteria to be finalised before first vendor contact 

**Page 5** 

## **PHASE 2 — DRAFTING** 

Writing the RFI That Vendors Will Actually Answer Weeks 1–2 | 7–18 July 2026 

Marcus and Sarah spend two weeks drafting the RFI document. The process generates three internal debates that shape its final form — each one a governance decision disguised as a writing exercise. 

I **10:00 | Wednesday 9 July 2026** 

I Architecture Studio, Floor 8 

Attendees: Marcus (EA), Sarah (CAIO), Wei (MLOps), Dr. 

#### I **RFI Drafting Session 1 — Scope & Requirements** 

Amara (DS) 

##### **Sarah Chen — CAIO** 

First debate: scope. Do we run one RFI for the full AI platform — MLOps, data, LLM, governance — or do we run separate RFIs for each layer? 

##### **Wei Zhang — MLOps Engineer** 

Separate RFIs. Each layer has different vendors. The best MLOps platform may not be the best LLM platform. We don't want to be forced to buy a bundle from one vendor because they happened to answer all sections. 

##### **Marcus Webb — EA** 

Counter-argument. If we run four separate RFIs, we might select four vendors that don't integrate with each other. That's the 2018 middleware problem in a new form. I'd rather evaluate vendors on their ability to compose into an integrated stack, not on whether each individual layer wins a category competition. 

##### **Dr. Amara Osei — Head of Data Science** 

There's a third option. One RFI, but with a modular structure — vendors can respond to all sections or only the sections where they have capability. We then assess which vendor covers which layers and what the integration story looks like between them. Best of breed versus integrated platform is a choice we make in the evaluation, not in the RFI design. 

##### **Marcus Webb — EA** 

That's the right answer. One RFI, five modules, vendors declare which they address. Evaluation scores both module capability and cross-module integration. Agreed? 

I **14:00 | Friday 11 July 2026** I Architecture Studio, Floor 8 

#### I **RFI Drafting Session 2 — Evaluation Criteria** 

Attendees: Marcus (EA), Sarah (CAIO), Alan (CISO), Nadia (Procurement) 

##### **Marcus Webb — EA** 

Evaluation criteria. I'm proposing six dimensions, weighted. Functional capability — 25%. Technical architecture and integration — 20%. Security and compliance — 20%. Vendor stability and roadmap — 15%. Total cost of ownership — 15%. References and proven outcomes — 5%. 

##### **Alan Brooks — CISO** 

Marcus, I'd push security and compliance higher. We have models processing customer PII, GDPR obligations, PCI-DSS from the payments integration. A platform that fails security isn't just a cost — it's a regulatory exposure that could stop the programme entirely. I want security at 25%. 

##### **Sarah Chen — CAIO** 

**Page 6** 

Alan, I understand the concern. But if we weight security at 25% and a vendor scores perfectly on security but their ML platform is unusable by data scientists, we'd select a compliant box that nobody can work with. Can we make security a threshold rather than a weighted score? Any vendor that falls below a security minimum is disqualified regardless of their scores elsewhere. 

##### **Alan Brooks — CISO** 

A security floor. I can accept that. What's the floor? 

##### **Marcus Webb — EA** 

I'll define it in the evaluation rubric — vendors must achieve a minimum of 80% on the security section or they are automatically disqualified from the shortlist. The remaining criteria are then scored and weighted for shortlisted vendors only. 

##### **Nadia Ferris — Head of Procurement** 

The evaluation criteria must be published in the RFI so vendors know how they'll be assessed. That's process fairness — they need to know what winning looks like before they write a response. 

##### **Marcus Webb — EA** 

Agreed. Full evaluation framework published in Appendix A of the RFI document. 

The final RFI document takes eleven days to write, review, and get Legal approval. Here is the final document in its key sections. 

###### I **REQUEST FOR INFORMATION — AI & ML Platform** 

RFI-2026-AI-001 | Issued 18 July 2026 | CONFIDENTIAL 

```
RETAILCO PLC — REQUEST FOR INFORMATION
```

```
AI & MACHINE LEARNING PLATFORM — RFI-2026-AI-001
```

```
Issued: 18 July 2026 | Response Deadline: 5 August 2026 | Version 1.0
```

###### `1. OVERVIEW & CONTEXT` 

```
RetailCo plc is a UK multi-channel retailer with 47 stores and a growing digital estate.
```

```
We are 18 months into a structured AI transformation programme. We currently operate
```

```
3 production ML models on an AWS SageMaker foundation platform. We are issuing this
```

```
RFI to understand the enterprise AI & ML platform market as we plan our next phase of
```

```
AI development, which includes expansion to Generative AI / LLM workloads.
```

```
This RFI does NOT constitute an invitation to tender and creates no contractual
```

```
obligation on either party. All responses are subject to a signed NDA.
```

###### `2. CURRENT STATE` 

```
ML Platform: AWS SageMaker (MVP — 18 months old)
```

```
Production models: 3 | Experimental: 47 | Data Scientists: 4 | MLOps: 2
```

```
Data volume: 2.1TB structured (Platform-X), 4.2M unstructured (service transcripts)
```

```
AI workloads today: tabular ML (demand forecasting, churn prediction)
```

```
AI workloads planned: LLM / RAG (customer service GenAI), personalisation
```

###### `3. SCOPE — FIVE PLATFORM MODULES` 

```
Module A: MLOps & Experiment Management
```

```
- Experiment tracking, model registry, feature store, model serving, monitoring
```

**Page 7** 

###### `Module B: LLM / Generative AI Platform` 

- `LLM hosting or API integration, RAG architecture support, prompt management` 

- `Hallucination detection, LLM evaluation frameworks, fine-tuning capability` 

```
Module C: Data & Feature Platform
```

- `Unified feature store (structured + unstructured/embeddings), data lineage` 

- `Integration with AWS ecosystem, Platform-X (Salesforce Commerce Cloud)` 

###### `Module D: AI Governance & Observability` 

- `Model monitoring, drift detection, business outcome tracking, bias auditing` 

- `Explainability tooling (SHAP/LIME or equivalent), audit logging` 

```
Module E: Developer Experience & Productivity
```

- `IDE integration, notebook environment, CI/CD pipeline support` 

- `Self-service capabilities for data scientists and MLOps engineers` 

`4. MANDATORY REQUIREMENTS (non-negotiable)` 

```
M1: SOC 2 Type II certified
```

```
M2: GDPR-compliant — data residency in UK or EU configurable
```

```
M3: Role-based access control with MFA and audit logging
```

```
M4: API-first architecture — all platform capabilities accessible via REST API
```

```
M5: Active customer references in UK retail or similar regulated sector
```

###### `5. KEY QUESTIONS (respond per module)` 

```
Q1: Describe your capability in each module you are addressing.
```

```
Q2: How does your platform integrate with AWS and Salesforce Commerce Cloud?
```

```
Q3: What is your LLM/GenAI capability — native, partner, or API integration?
```

```
Q4: How do you support model outcome monitoring vs. business KPIs?
```

```
Q5: Describe a comparable retail AI transformation you have supported.
```

```
Q6: What does year-1 TCO look like for an organisation of our scale?
```

```
Q7: What is on your 12-month product roadmap relevant to our use cases?
```

```
Q8: How do you support GDPR right-to-erasure in model training datasets?
```

###### `6. EVALUATION FRAMEWORK (published — Appendix A)` 

```
SECURITY FLOOR: Vendors scoring < 80% on security questions are disqualified.
Functional Capability (Modules A–E): 25%
```

```
Technical Architecture & Integration: 20%
```

```
Security & Compliance (floor: 80%): 20%
Vendor Stability & Roadmap: 15%
```

```
Total Cost of Ownership: 15%
```

```
References & Proven Outcomes: 5%
```

###### `7. PROCESS` 

```
18 July: RFI issued (post NDA signature)
```

```
25 July: Vendor Q&A; window closes
```

**RFI TRANSCRIPT  |  AI PLATFORM SELECTION  |  RETAILCO  |  2026 Page 8** 

```
5 August: RFI responses due
12 August: Shortlist announced (2–3 vendors to RFP stage)
August–September: RFP issued, proof-of-concept design
CONTACT: Marcus Webb (EA) and Sarah Chen (CAIO) — rfi-2026-ai@retailco.com
LEGAL: Responses subject to NDA-2026-AI-001. No contractual obligation created.
```

##### **Phase Outcomes** 

I RFI-2026-AI-001 drafted, Legal-approved, and issued to 6 vendors on 18 July 2026 I NDA signed by all 6 vendors before RFI dispatch — Howard Pang confirmed I Evaluation framework published in RFI — vendors know criteria before responding I Security floor established: < 80% = automatic disqualification I Single RFI with 5 modular sections — vendors address relevant modules only 

**Page 9** 

## **PHASE 3 — MARKET ENGAGEMENT** 

Vendor Briefings — What They Say When They Think They're Winning Weeks 2–3 | 21–25 July 2026 

Marcus and Sarah hold a 60-minute briefing call with each vendor. Nadia from Procurement attends every call. The calls are revealing — not always in the way the vendors intend. 

I **10:00 | Monday 21 July 2026** 

I Video Call — Microsoft Azure AI 

I **Vendor Briefing — Microsoft Azure AI (Azure ML** Attendees: Marcus (EA), Sarah (CAIO), Nadia **+ OpenAI Service)** (Procurement) | Microsoft: Enterprise AI Sales Team 

##### **Microsoft Rep — Azure AI Enterprise Sales** 

RetailCo is exactly the profile we've designed Azure AI Foundry for. You get Azure ML for your MLOps workloads, Azure OpenAI Service for your GenAI needs, and it's all unified in one platform with Microsoft Fabric for the data layer. If you're already in AWS, we have migration accelerators. 

##### **Marcus Webb — EA** 

Walk me through how Azure AI Foundry handles model outcome monitoring against business KPIs — specifically, not technical metrics, but actual business outcomes like overstock rate or churn rate. 

##### **Microsoft Rep — Azure AI Enterprise Sales** 

You can build custom dashboards in Azure Monitor and connect them to Power BI. The model monitoring in Azure ML tracks data drift and prediction drift natively. 

##### **Marcus Webb — EA** 

That's technical monitoring. I'm asking about business outcome monitoring — the model's predictions correlated with the actual business metric they're trying to move. Is that native or do we build it? 

##### **Microsoft Rep — Azure AI Enterprise Sales** 

That would be a custom implementation on top of our monitoring layer. But we have professional services that can— 

##### **Sarah Chen — CAIO** 

That's a build, not a buy. Noted. Question on GDPR right-to-erasure: when a customer exercises their right to erasure, how does the platform propagate that deletion to historical training datasets? 

##### **Microsoft Rep — Azure AI Enterprise Sales** 

That's a great question — I'll take that on notice and come back to you in writing. 

##### **Marcus Webb — EA** 

Please include it in your RFI response. Thank you. 

I _Marcus (internal): Two important gaps in the Azure briefing: no native business outcome monitoring (it's a custom build on top of Azure Monitor), and they couldn't answer the GDPR erasure question in the room. That's either a product gap or a sales team that doesn't know their product well enough. Both are data points. I'll see if the written RFI response fills these gaps._ 

I **14:00 | Tuesday 22 July 2026** 

I Video Call — Databricks 

I **Vendor Briefing — Databricks (Mosaic AI /** Attendees: Marcus (EA), Sarah (CAIO), Wei Zhang **Lakehouse Platform)** (MLOps), Nadia (Procurement) 

**Databricks Rep — Databricks — Enterprise Sales** 

**Page 10** 

Marcus, Sarah — Databricks' philosophy is that the data layer and the AI layer should be the same layer. MLflow started as an open-source project inside Databricks. Mosaic AI gives you experiment tracking, model registry, feature engineering, LLM fine-tuning, and serving — all on the lakehouse. Your 4.2 million customer service transcripts living in Delta Lake is a native first-class asset. 

##### **Wei Zhang — MLOps Engineer** 

We're currently on MLflow already — it's our experiment tracker. If we moved to Databricks, what's the migration path for 47 existing experiments? 

##### **Databricks Rep — Databricks — Enterprise Sales** 

MLflow is Databricks-native — you'd effectively be moving your tracking server into the managed service. The migration is an export-import of your MLflow metadata. Most of our customers do it in a weekend. 

##### **Sarah Chen — CAIO** 

LLM capability — native models or API integration? 

##### **Databricks Rep — Databricks — Enterprise Sales** 

Both. Mosaic AI Model Serving supports open-source models like Llama and Mistral natively — you host them in your own environment. We also have API integration to external providers via AI Gateway. The advantage of native hosting is data sovereignty — your prompts and responses never leave your infrastructure. Given you're processing customer PII in your GenAI use case, that matters. 

##### **Marcus Webb — EA** 

GDPR right-to-erasure in training data. How do you handle it? 

##### **Databricks Rep — Databricks — Enterprise Sales** 

Good question and we anticipated it. Delta Lake has native GDPR delete capabilities — when a customer exercises right to erasure, the deletion propagates through Delta Lake's transaction log. For model training datasets derived from that data, we provide a data versioning mechanism so you can identify which training runs used data from a specific customer and flag those models for retraining. It's not fully automated yet — it's semi-automated with a documented process. 

##### **Marcus Webb — EA** 

Semi-automated. Honest answer. Thank you. 

I **10:00 | Wednesday 23 July 2026** 

I Video Call — DataRobot 

Attendees: Marcus (EA), Sarah (CAIO), Nadia I **Vendor Briefing — DataRobot (AI Platform)** (Procurement) 

##### **DataRobot Rep — DataRobot — Enterprise Sales** 

DataRobot is the only platform in this RFI that was purpose-built for enterprise AI governance from day one. Our business value tracking module directly correlates model predictions with business KPIs — out of the box. You told us in your RFI that you track overstock rate as your business outcome for the demand forecasting model. We can do that natively. 

##### **Sarah Chen — CAIO** 

Show me what 'natively' means. In your briefing materials, specifically. 

##### **DataRobot Rep — DataRobot — Enterprise Sales** 

In the platform — you define a business metric, map it to model outputs, and the dashboard tracks correlation over time. If model predictions and business outcomes diverge beyond a threshold you set, an alert fires. No custom code. 

##### **Marcus Webb — EA** 

**Page 11** 

That's the closest we've heard to our exact requirement. How does your LLM capability compare to a native cloud provider like Azure OpenAI or Databricks Mosaic? 

##### **DataRobot Rep — DataRobot — Enterprise Sales** 

Honest answer — we integrate with foundation model providers rather than hosting our own. We have deep integrations with Azure OpenAI, AWS Bedrock, and Google Vertex AI. Our value-add is the governance layer on top: hallucination detection, prompt management, LLM bias auditing, and the business outcome monitoring we just described. We're not a foundation model company. 

##### **Marcus Webb — EA** 

That's a meaningful distinction. You're the governance and orchestration layer, not the model layer. 

##### **DataRobot Rep — DataRobot — Enterprise Sales** 

Exactly. And that means you can swap the underlying LLM provider without rebuilding your governance stack. That's our architectural advantage. 

I _EA PRINCIPLE: The vendor who answers 'honest answer — we don't do that natively' is often more trustworthy than the vendor who claims to do everything. A sales team that acknowledges product boundaries is telling you they understand their own product._ 

I **10:00 | Thursday 24 July 2026** 

#### I **Vendor Briefing — Google Cloud Vertex AI** 

I Video Call — Google Cloud (Vertex AI) Attendees: Marcus (EA), Sarah (CAIO), Dr. Amara (DS), Nadia (Procurement) 

##### **Google Rep — Google Cloud — AI & ML Sales** 

Vertex AI is Google's unified ML platform — it's the same platform Google uses internally for production AI. Gemini integration is native. We have the Model Garden — 130+ foundation models available. For your customer service GenAI use case, Vertex AI Agent Builder is specifically designed for RAG architecture with grounding on your own data. 

##### **Dr. Amara Osei — Head of Data Science** 

Model Garden — are those models hosted in Google's infrastructure or can I self-host any of them? 

##### **Google Rep — Google Cloud — AI & ML Sales** 

Garden models run on Google's infrastructure. Self-hosting of open-source variants is possible via Vertex AI Model Registry but the commercial models are API-only. 

##### **Dr. Amara Osei — Head of Data Science** 

So for our customer service GenAI, customer prompts — which may contain PII — would transit Google's infrastructure? 

##### **Google Rep — Google Cloud — AI & ML Sales** 

Yes, though it's processed within your Google Cloud VPC. Data does not leave your tenancy. 

##### **Alan Brooks — CISO** 

Does 'within your VPC' mean Google engineers cannot access it? 

##### **Google Rep — Google Cloud — AI & ML Sales** 

I'll provide the detailed data processing agreement in writing — that's a Legal question that deserves a precise answer, not a sales answer. 

##### **Marcus Webb — EA** 

Good answer. Please include it in the RFI response. 

##### **Sarah Chen — CAIO** 

**Page 12** 

Your bias auditing capability. Specifically for LLMs — how do you detect and report demographic bias in Gemini outputs in a retail context? 

##### **Google Rep — Google Cloud — AI & ML Sales** 

Vertex AI Explainable AI covers traditional ML. For LLM bias, we have safety filters and content moderation. Fine-grained demographic bias auditing for LLMs is on the roadmap for Q1 2027. 

##### **Sarah Chen — CAIO** 

Q1 2027 is a gap. That's a capability we need before we go live. Please reflect that in your response. 

The fifth vendor — AWS — is briefed on Friday. The Snowflake briefing is cancelled: they respond in writing that their platform does not currently support MLOps workloads and they decline to submit an RFI response. Marcus notes this as a positive — a vendor that self-selects out saves everyone time. 

I **14:00 | Friday 25 July 2026** I Video Call — AWS (SageMaker + Bedrock) 

##### **AWS Rep — AWS — Enterprise AI Sales** 

You're already on SageMaker, so you know what we can do for traditional ML. The RFI is really about whether you extend with SageMaker or move to a different platform. Let me be direct about why customers who've invested in SageMaker tend to stay: the migration cost is real. You have 47 experiments, a feature store, and 3 production models. Moving those is not a weekend project. 

##### **Marcus Webb — EA** 

You're talking us out of switching before you've made the case for extending. 

##### **AWS Rep — AWS — Enterprise AI Sales** 

I'm giving you the honest commercial picture. SageMaker has gaps for GenAI — we bridge them with Amazon Bedrock. Native LLM hosting, Titan models, third-party models via Bedrock, and Bedrock Guardrails for hallucination and safety. The integration between SageMaker and Bedrock is native — no glue code. 

##### **Sarah Chen — CAIO** 

Business outcome monitoring — native or build? 

##### **AWS Rep — AWS — Enterprise AI Sales** 

Build on top of CloudWatch and SageMaker Model Monitor. We don't have native business KPI correlation. I'd be misleading you if I said we did. 

##### **Marcus Webb — EA** 

GDPR right-to-erasure in training data? 

##### **AWS Rep — AWS — Enterprise AI Sales** 

S3 supports object deletion which handles source data. For training datasets derived from that data, you manage it through dataset versioning in S3. The model retraining trigger on data deletion is a custom workflow you'd build with Lambda and Step Functions. 

##### **Marcus Webb — EA** 

Same answer as Azure — it's a build. Noted. Thank you for the directness on the migration cost. That's an important factor we'll model in the TCO. 

##### **Phase Outcomes** 

I 5 vendor briefings completed: Azure, Databricks, DataRobot, Google Cloud, AWS 

I Snowflake self-selected out — declined to respond (ML workloads out of scope) 

I Key gaps identified: business outcome monitoring (native only in DataRobot), LLM PII sovereignty, GDPR erasure in training data 

**Page 13** 

I Q&A; window closed 25 July — all vendor questions logged and responded to equally 

I No commercial commitments made — Nadia Ferris confirmed process integrity 

**Page 14** 

## **PHASE 4 — RESPONSES** 

What They Actually Sent Week 4 | 5 August 2026 

Five RFI responses arrive by the deadline. Marcus logs each one the moment it arrives and does not share them with the evaluation panel until all five are received. Then he distributes them simultaneously — preventing any vendor from gaining an advantage through timing. 

|I**Microsoft Azure AI (Az**<br>**OpenAI + Microsoft Fabr**|**ure ML + Azure**<br>**ic)**<br>_The integrated Microsoft_|_stack_|
|---|---|---|
|**Module coverage**|A (MLOps), B (LLM via Azure OpenAI), C (Data via Fabric), D (partial), E<br>(VS Code integration)|**~**|
|**Integration with AWS**|Migration required. Azure Data Factory for AWS S3 integration. Not native.||
|**Business outcome**<br>**monitoring (Q4)**|Custom build on Azure Monitor + Power BI. No native business KPI<br>correlation.||
|**GDPR erasure in training data**|Semi-automated — Delta process with manual model flagging. Provided in<br>writing.|**~**|
|**LLM PII data sovereignty**|Processed within Azure tenancy. Data Processing Agreement provided.||
|**LLM bias auditing**|Azure AI Content Safety. Fine-grained demographic bias: roadmap Q3<br>2027.||
|**Year-1 TCO estimate (our**<br>**scale)**|£420K–£540K including migration professional services (£80K–£120K).|**~**|
|**Retail reference (UK)**|1 UK grocery retailer (name under NDA). Case study provided.||
|**Security certifications**|SOC 2 Type II, ISO 27001, GDPR DPA. Full compliance pack provided.||
|I**Databricks (Mosaic AI**<br>**Delta Lake)**|**/ Unity Catalog /**<br>_The data-first AI pla_|_tform_|
|**Module coverage**|A (MLOps — MLflow native), B (LLM via Mosaic + AI Gateway), C (Delta<br>Lake + Unity Catalog), D (partial), E (Databricks Notebooks)||
|**Integration with AWS**|Native — Databricks runs on AWS. Your existing S3 data is directly<br>accessible. No migration required for data.||
|**Business outcome**<br>**monitoring (Q4)**|Custom build on Databricks SQL + dashboards. Not native business KPI<br>correlation. Honest position stated.|**~**|
|**GDPR erasure in training data**|Delta Lake native delete. Semi-automated model flagging process —<br>documented in detail.|**~**|
|**LLM PII data sovereignty**|Open-source model hosting: data stays in your AWS environment. External<br>API models: data transits via AI Gateway with audit log.||
|**LLM bias auditing**|MLflow evaluation framework supports custom bias metrics. No native<br>demographic bias detection for LLMs.|**~**|
|**Year-1 TCO estimate (our**<br>**scale)**|£280K–£360K. Migration from SageMaker MLflow: 2 weeks estimated<br>(MLflow metadata compatible).||

**Page 15** 

|**Retail reference (UK)**|2 UK retailers provided — 1 grocery, 1 fashion. Named references with<br>contact details.||
|---|---|---|
|**Security certifications**|SOC 2 Type II, ISO 27001, GDPR DPA. UK data residency confirmed.||

|I**DataRobot (AI Platform**<br>**Tracking)**<br>|**+ Business Value**<br>_The governance-first AI pla_<br>|_tform_<br>|
|---|---|---|
|**Module coverage**|A (MLOps), B (LLM via integrations), D (native business outcome<br>monitoring — strongest response), E (DataRobot UI)||
|**Integration with AWS**|Native connector to SageMaker. Can run alongside or replace SageMaker<br>gradually.||
|**Business outcome**<br>**monitoring (Q4)**|NATIVE. Business value tracking module maps model predictions to<br>business KPIs. Overstock rate demo provided in response.||
|**GDPR erasure in training data**|Semi-automated with documented workflow. DataRobot Data Registry<br>tracks lineage.|**~**|
|**LLM PII data sovereignty**|LLM integrations via API to Azure/AWS/Google. DataRobot does not host<br>foundation models. PII transits chosen provider.|**~**|
|**LLM bias auditing**|Native LLM bias evaluation module. Supports demographic parity audit for<br>LLM outputs.||
|**Year-1 TCO estimate (our**<br>**scale)**|£380K–£460K. No migration cost to existing SageMaker — coexistence<br>model.|**~**|
|**Retail reference (UK)**|3 UK retailers provided — demand forecasting case study matches our use<br>case exactly.||
|**Security certifications**|SOC 2 Type II, ISO 27001, GDPR DPA. Penetration test results provided.||

|I**Google Cloud Vertex A**<br>**Gemini + Agent Builder)**<br>|**I (Vertex AI +**<br>_The full-stack Google AI pla_<br>|_tform_|
|---|---|---|
|**Module coverage**|A (MLOps), B (LLM — Gemini native + Model Garden), C (BigQuery ML), D<br>(Explainable AI — partial), E (Colab + Workbench)|**~**|
|**Integration with AWS**|Cross-cloud integration possible. BigQuery Omni for AWS S3. Migration of<br>SageMaker workloads: 3–4 month estimate provided.||
|**Business outcome**<br>**monitoring (Q4)**|Custom build on Vertex AI Monitoring + BigQuery + Looker. Not native<br>business KPI correlation.||
|**GDPR erasure in training data**|Data Processing Agreement provided. Detailed erasure workflow: customer<br>data deletion does not automatically flag training datasets — manual<br>process.||
|**LLM PII data sovereignty**|Processed within customer GCP project. Google Access Transparency logs<br>all Google engineer access.||
|**LLM bias auditing**|Native safety filters. Demographic bias auditing for LLMs: Q1 2027<br>roadmap. NOT available now.||
|**Year-1 TCO estimate (our**<br>**scale)**|£460K–£600K including migration professional services.||

**Page 16** 

|**Retail reference (UK)**|1 reference — large UK grocery retailer. Named reference provided.||
|---|---|---|
|**Security certifications**|SOC 2 Type II, ISO 27001, GDPR DPA. Google Cloud compliance<br>documentation extensive.||

|I**AWS (SageMaker + Be**<br>|**drock + Amazon Q)**<br>_The incumbent pla_<br>|_tform_<br>|
|---|---|---|
|**Module coverage**|A (SageMaker — current platform), B (Bedrock — LLM), C (S3 +<br>SageMaker Feature Store — current), D (SageMaker Model Monitor —<br>partial), E (SageMaker Studio)||
|**Integration with existing**<br>**setup**|Zero migration cost for existing SageMaker workloads — we are already on<br>this platform.||
|**Business outcome**<br>**monitoring (Q4)**|Custom build — CloudWatch + SageMaker Model Monitor + custom<br>Lambda. Documented reference architecture provided.|**~**|
|**GDPR erasure in training data**|Custom workflow — S3 deletion + manual training dataset versioning. Step<br>Functions automation template provided.|**~**|
|**LLM PII data sovereignty**|Bedrock processes within AWS tenancy. Customer data not used for model<br>training. Data processing agreement provided.||
|**LLM bias auditing**|Bedrock Guardrails (content filtering). Fine-grained demographic LLM bias<br>auditing: on roadmap, no firm date.||
|**Year-1 TCO estimate (our**<br>**scale)**|£180K–£240K. Lowest TCO — no migration. Incremental cost on existing<br>contract.||
|**Retail reference (UK)**|Multiple UK retailers on SageMaker — 3 references provided with contact<br>details.||
|**Security certifications**|SOC 2 Type II, ISO 27001, GDPR DPA. PCI-DSS Level 1 — relevant for<br>payments integration.||

##### **Phase Outcomes** 

I 5 RFI responses received by 5 August deadline — all responses distributed simultaneously to evaluation panel 

I Key differentiator identified: DataRobot is the ONLY vendor with native business outcome monitoring 

I Key gap identified: GDPR erasure in training data — ALL vendors semi-automated or manual I AWS lowest TCO (no migration) — Databricks second lowest with fastest migration path I Google Cloud — highest cost, most gaps on current roadmap (LLM bias Q1 2027, GDPR process weakest) 

**Page 17** 

## **PHASE 5 — EVALUATION** 

Scoring the Responses — Where the Arguments Happen Weeks 5–6 | 6–15 August 2026 

The evaluation panel convenes: Marcus (EA), Sarah (CAIO), Wei Zhang (MLOps), Dr. Amara Osei (Data Science), and Alan Brooks (CISO). Each panel member scores independently before the group session. Marcus runs the scoring session like an architecture review — no vendor in the room, no sales pressure, pure evidence review. 

I **09:00 | Wednesday 6 August 2026** I Architecture Studio, Floor 8 

I **Evaluation Panel Session — Security Floor Check** Attendees: Marcus (EA), Alan (CISO), Sarah (CAIO) 

##### **Alan Brooks — CISO** 

Security floor check first — any vendor below 80% is out before we touch the weighted scores. I've reviewed all five on the security dimension. Four pass easily — Azure, Databricks, DataRobot, AWS all have SOC 2 Type II, GDPR DPA, and answered the technical security questions competently. 

##### **Marcus Webb — EA** 

Google Cloud? 

##### **Alan Brooks — CISO** 

Google passes the certification requirements — SOC 2, ISO 27001, their compliance documentation is actually the most extensive. But two concerns. First: their GDPR erasure process for training data is the weakest in the field — effectively manual with no automation path. Second: the Access Transparency logging — Google engineers can access customer data with logging, but can access it. That's not a disqualifier at 80% threshold but it's a risk flag. 

##### **Marcus Webb — EA** 

Google's security score? 

##### **Alan Brooks — CISO** 

84%. Passes the floor. All five proceed to full evaluation. 

#### **Evaluation Scoring Matrix — All Vendors** 

|**Dimension (Weight)**|**Azure**|**Databricks**|**DataRobot**|**Google**|**AWS**|
|---|---|---|---|---|---|
|Functional Capability (25%)|72|81|79|75|74|
|Technical Architecture (20%)|68|86|74|71|80|
|Security & Compliance (20%)|88|89|91|84|92|
|Vendor Stability & Roadmap (15%)|90|82|74|88|91|
|Total Cost of Ownership (15%)|64|80|72|55|95|
|References & Outcomes (5%)|78|88|92|75|85|
|WEIGHTED TOTAL (100%)|76.5|83.9|79.4|74.1|82.6|
|Security Floor Pass?|Yes|Yes|Yes|Yes|Yes|

The numbers produce the shortlist — but not before a significant debate about the gap between the scores and the real-world context. 

**Page 18** 

I **14:00 | Wednesday 6 August 2026** 

I Architecture Studio — Evaluation Debate 

##### **Wei Zhang — MLOps Engineer** 

The numbers say Databricks first, AWS second, DataRobot third. But I want to challenge the TCO scores. AWS at 95 on TCO assumes we stay on the platform we have. It doesn't include the 1,248 hours a year of productivity loss that was the original motivation for this RFI. Should that be in the TCO? 

##### **Marcus Webb — EA** 

Wei, that's an excellent point. The AWS TCO figure represents the direct platform cost. The opportunity cost of the productivity gap is a different line item. Let me add an 'adjusted TCO' row — direct platform cost plus the productivity cost — and rescore. 

##### **Sarah Chen — CAIO** 

There's also a risk I want to surface on Databricks. Their business outcome monitoring is a custom build. DataRobot's is native. That custom build is Wei's time. Wei has two hands and multiple production models to maintain. Every custom component is future maintenance. 

##### **Dr. Amara Osei — Head of Data Science** 

I've been using Databricks notebooks this week to evaluate their platform. The data science experience is genuinely the best I've seen. MLflow is native, the notebook environment is excellent, and the feature store is exactly what we need for embeddings. For my productivity as a scientist — Databricks wins by a significant margin. 

##### **Alan Brooks — CISO** 

DataRobot's security response was the most detailed and most honest. They provided penetration test results. They explained their architecture with no hand-waving. For a CISO, that level of transparency is worth something beyond the numeric score. 

##### **Marcus Webb — EA** 

We have a multi-stakeholder scoring conflict. Amara values developer experience — Databricks. Wei values avoiding maintenance build — DataRobot or AWS. Alan values security transparency — DataRobot. Sarah values business outcome monitoring — DataRobot. I value architectural integrity and avoiding vendor lock-in. Let me propose the adjusted TCO and then we run the decision through the weighted criteria again. 

#### **Adjusted Evaluation — Productivity-Adjusted TCO** 

|**Cost Component**|**Azure**|**Databricks**|**DataRobot**|**Google**|**AWS**|
|---|---|---|---|---|---|
|Direct platform cost (Year 1)|£480K|£320K|£420K|£530K|£210K|
|Productivity cost (customisation)|£85K|£60K|£20K|£95K|£187K|
|Migration cost|£100K|£15K|£0K|£130K|£0K|
|Adjusted Year-1 Total|£665K|£395K|£440K|£755K|£397K|
|Adjusted TCO Score (15%)|58|84|78|50|83|
|REVISED WEIGHTED TOTAL|73.6|84.8|80.3|71.1|83.4|

I **PROCUREMENT FLAG: Nadia Ferris reviewed the adjusted TCO methodology and confirmed it is a valid evaluation approach, provided the methodology is documented and applied consistently. She flagged that adding post-RFI scoring adjustments requires panel sign-off and documentation in the evaluation record to protect process integrity.** 

**Page 19** 

The revised scores produce the same order: Databricks (84.8), AWS (83.4), DataRobot (80.3). But Sarah pushes back on a simple rank-based shortlist. 

##### **Sarah Chen — CAIO** 

Marcus — the scores are close. Databricks wins on developer experience and TCO. AWS wins on zero migration risk and incumbent advantage. DataRobot wins on governance — specifically business outcome monitoring and LLM bias auditing. Those are the two things our AI Governance Framework says we require. Can we shortlist all three? 

##### **Marcus Webb — EA** 

Nadia — process question. Can we shortlist three to RFP rather than two? 

##### **Nadia Ferris — Head of Procurement** 

Yes. Three is defensible given the close scoring and the different architectural profiles. I'd document the rationale clearly: Databricks for developer experience and data platform capability, AWS for migration efficiency and incumbent advantage, DataRobot for governance capability. Three vendors with distinct value propositions — that's a sound shortlist. 

##### **Marcus Webb — EA** 

Google Cloud — do they need a debrief explanation? 

##### **Nadia Ferris — Head of Procurement** 

Best practice is to offer a debrief to every vendor who responds, whether shortlisted or not. It's fair, it protects our reputation in the market, and vendors who receive honest feedback become better partners in future engagements. 

##### **Marcus Webb — EA** 

Then every vendor gets a debrief. Shortlisted or not. I'll run those calls. 

##### **Phase Outcomes** 

I Evaluation scoring completed — adjusted TCO methodology documented and signed off by Nadia Ferris 

I Security floor passed by all 5 vendors — all proceed to full evaluation 

I Google Cloud and Azure eliminated from shortlist 

I SHORTLIST: Databricks (84.8), AWS (83.4), DataRobot (80.3) — proceed to RFP 

I Debrief offered to all 5 vendors — procurement best practice confirmed 

**Page 20** 

## **PHASE 6 — SHORTLIST NOTIFICATION** 

Telling Vendors the Decision — Shortlisted and Not Week 7 | 12 August 2026 

Marcus sends the shortlist notifications. The calls with Azure and Google are professionally uncomfortable. The call with Databricks is unexpectedly revealing. 

I **10:00 | Wednesday 12 August 2026** I Phone Call — Google Cloud 

##### **Google Rep — Google Cloud — Enterprise AI Sales** 

Marcus, thank you for the call. Can you tell us where we fell short? 

##### **Marcus Webb — EA** 

Of course — this is your formal debrief. Three areas. First: TCO. Your year-one cost including migration was the highest in the field at £755K adjusted. Second: roadmap gaps — LLM bias auditing is Q1 2027. We need that capability before we go live with our customer service AI, which is targeted for this year. Third: GDPR erasure in training data. Your process was the most manual of all vendors, with no automation roadmap provided. Those three factors together put you fourth out of five on the adjusted scores. 

##### **Google Rep — Google Cloud** 

The LLM bias auditing — that's a real gap. I want to be honest: the Q1 2027 date is an internal roadmap commitment, not a public announcement. I appreciate you flagging it. It tells us something about what the market needs. 

##### **Marcus Webb — EA** 

Thank you for the transparency. For the record — Google's technical architecture is strong and your LLM capability is class-leading. The gaps are specific and addressable. If your roadmap accelerates, I'd encourage you to approach us in six months. 

I **14:00 | Wednesday 12 August 2026** I Phone Call — Databricks 

##### **Databricks Rep — Databricks — Enterprise Sales** 

Congratulations — you're telling us we're shortlisted. I want to ask one honest question before we proceed. What's the real competition here? Who are the other two vendors? 

##### **Marcus Webb — EA** 

I won't share the names of other shortlisted vendors — that's process integrity. What I can tell you is that you're competing against a vendor with stronger business outcome monitoring capability and a vendor with zero migration cost. Those are your two strongest competitive threats. 

##### **Databricks Rep — Databricks — Enterprise Sales** 

Business outcome monitoring — that's DataRobot. And zero migration — that's AWS. You're not going to confirm that. 

##### **Marcus Webb — EA** 

I'm not confirming anything. What I am telling you is that your RFP response needs to address both of those gaps directly. Not with a slide saying 'our roadmap includes business outcome monitoring.' With a proof of concept that shows it, built on your platform, with our data. 

##### **Databricks Rep — Databricks — Enterprise Sales** 

Can we bring an engineer to the proof-of-concept stage who can actually build that for you? 

##### **Marcus Webb — EA** 

That's exactly what the RFP stage is for. Yes. 

**Page 21** 

###### u **EMAIL** 

**From: Marcus Webb (Enterprise Architect)** 

**To: All RFI Participants — rfi-2026-ai@retailco.com (BCC)** 

##### **Subject: RFI-2026-AI-001 — Shortlist Decision & Next Steps** 

Dear RFI Participants, Thank you for your responses to RFI-2026-AI-001 — AI & ML Platform Selection. We have completed our evaluation panel review using the criteria published in Appendix A of the RFI document. We are pleased to confirm that 3 vendors have been shortlisted to the Request for Proposal (RFP) stage. Shortlisted vendors have been contacted individually. For vendors not progressing to RFP: we are grateful for the time invested in your response. Debriefs have been offered and will be conducted individually by Marcus Webb. We encourage you to continue developing your platform roadmap and would welcome future engagement as your capabilities evolve. RFP process: RFP Issued: 19 August 2026 RFP Responses Due: 16 September 2026 Proof of Concept: September – October 2026 Final Selection: November 2026 Contract Target: December 2026 The RFP will require each shortlisted vendor to demonstrate their platform on RetailCo synthetic data, with specific proof-of-concept scenarios provided in the RFP document. Regards, Marcus Webb — Enterprise Architect | Sarah Chen — CAIO | Nadia Ferris — Procurement 

##### **Phase Outcomes** 

I Shortlist formally communicated: Databricks, AWS, DataRobot — proceed to RFP 

I Azure and Google Cloud formally notified — debriefs completed with documented feedback 

I RFP timeline confirmed: issued 19 August, responses 16 September 

I Proof of concept scope defined: vendors to demonstrate on RetailCo synthetic data 

I Process integrity maintained — vendor names not disclosed across shortlist 

**Page 22** 

## **PHASE 7 — DEBRIEF & EA RETROSPECTIVE** 

What the RFI Process Taught Us About Ourselves Week 7 | 15 August 2026 

Marcus runs a retrospective with the evaluation panel the day after the shortlist is communicated. Not about the vendors — about the process. What did the RFI reveal about RetailCo's own requirements clarity, governance gaps, and decision-making maturity? This is the EA's most valuable artefact from the whole process. 

I **10:00 | Friday 15 August 2026** I Architecture Studio — RFI Retrospective 

I **RFI Retrospective — Evaluation Panel** Attendees: Marcus, Sarah, Wei, Amara, Alan, Nadia 

##### **Marcus Webb — EA** 

Three questions. What did the RFI teach us about our requirements that we didn't know before we started? What would we do differently next time? And what gaps in our own architecture did the vendor responses expose? 

##### **Wei Zhang — MLOps Engineer** 

We discovered that GDPR right-to-erasure in training data is an industry-wide unsolved problem. Every vendor — every single one — has a semi-automated or manual process. We went into this RFI assuming one of them would have a native automated solution. None do. That means it's not a vendor selection problem — it's an architecture problem we need to solve ourselves, regardless of which platform we choose. 

##### **Dr. Amara Osei — Head of Data Science** 

I learned that our requirements around unstructured data and embeddings were underspecified in the RFI. We asked vendors how they handle structured features. We said 'and embeddings' in passing. Several vendors gave us structured-only answers and we only discovered the gap when we tried their platforms in the evaluation. The RFP needs much more specific requirements on vector storage and retrieval. 

##### **Alan Brooks — CISO** 

The CISO observation: we had a security floor but no security architecture question. We asked vendors if they were SOC 2 certified. We didn't ask them to describe their model training data isolation architecture. We didn't ask about their shared tenancy model. We found these gaps during debriefs, not during the RFI. The RFP security section needs to be more architectural, less certification-checklist. 

##### **Sarah Chen — CAIO** 

The most important thing the RFI taught me: our business outcome monitoring requirement was the single strongest differentiator in the entire evaluation — and it came from our own production experience, not from any framework or consultant. We knew we needed it because Wei built it for us and we saw it catch a silent failure. That operational experience gave us a requirement that most organisations issuing AI platform RFIs would not think to ask. That's a competitive advantage in procurement. 

##### **Marcus Webb — EA** 

And the thing the RFI taught me about us. When AWS came back as the lowest TCO by direct cost, there was real pressure — from Karen's CFO office — to just extend the existing contract. 'We're already on AWS, why are we spending money on an RFI?' The RFI justified its own cost by quantifying the productivity opportunity cost that wasn't in the direct TCO. £187,000 a year in data science time. The adjusted TCO changed the conversation from 'AWS is cheapest' to 'Databricks and AWS are equivalent on adjusted cost, and Databricks offers better capability.' Without the RFI, we would have defaulted to incumbent inertia. 

**Nadia Ferris — Head of Procurement** 

**Page 23** 

From a procurement perspective — the process was clean. NDAs before contact, criteria published before responses, independent scoring before the panel session, and adjustments documented and signed off. If any vendor challenged this process, we could defend every decision. That's how you protect the organisation. 

I **RFI Retrospective — Lessons Captured** RFIRETR-2026-001 | 15 August 2026 

###### `REQUIREMENT GAPS IDENTIFIED DURING RFI` 

`1. GDPR erasure in training data — industry-wide manual process. Must solve architecturally. Action: Priya Nair to design a training data lineage and erasure tracking mechanism before RFP PoC stage — this is our own architectural obligation.` 

`2. Vector storage & embeddings — underspecified in RFI.` 

```
Action: Amara Osei to write detailed embeddings requirements for RFP Section 3.
```

`3. Security architecture questions — too certification-focused.` 

```
Action: Alan Brooks to draft a security architecture questionnaire for RFP Annex B.
```

###### `PROCESS IMPROVEMENTS FOR RFP` 

`4. Add proof-of-concept scenarios to RFP — vendors must demonstrate, not describe.` 

`5. Score PoC separately from written RFP response (40% PoC / 60% written).` 

`6. Require live platform access for evaluation panel during PoC period.` 

###### `ORGANISATIONAL INSIGHTS` 

`7. Productivity-adjusted TCO methodology must be standard for all future technology RFIs.` 

`8. Incumbent inertia is a real procurement risk — the RFI quantified the cost of staying.` 

`9. Business outcome monitoring requirement emerged from our production experience —` 

```
not from a consultant framework. Operational AI experience creates procurement advantage.
```

`10. Procurement + Legal + EA + CAIO must be co-owners from Day 1 of any future RFI.` 

###### `NEXT STEPS` 

```
RFP issued: 19 August 2026
```

```
PoC design workshops with shortlisted vendors: September 2026
Final platform decision: November 2026
```

```
Contract execution: December 2026
```

```
Platform migration begin: January 2027
```

##### **Phase Outcomes** 

I RFI retrospective completed — 10 lessons captured for RFP improvement 

I GDPR erasure in training data identified as own architectural obligation (not vendor problem) 

I Embeddings requirements to be rewritten by Amara for RFP — RFI was underspecified 

I Security section to be redesigned by Alan — architectural not checklist-based 

I Productivity-adjusted TCO established as standard RetailCo procurement methodology 

**Page 24** 

### **RFI SUMMARY — WHAT THE PROCESS PRODUCED** 

|**Week**|**Phase**|**Key Outcome**|
|---|---|---|
|Week 1|Decision|Cost-of-inaction quantified (£187K/yr). RFI registered with Procurement. Legal governance confirmed.|
|Weeks 1–2|Drafting|RFI-2026-AI-001 written. 5 modules. Outcome-focused requirements. Evaluation criteria published upfro|
|Weeks 2–3|Market|5 vendors briefed. 1 self-selected out (Snowflake). Key gaps identified before written responses.|
|Week 4|Responses|5 responses received simultaneously. DataRobot only vendor with native business outcome monitoring.|
|Weeks 5–6|Evaluation|Security floor applied. Adjusted TCO methodology. Panel scoring. Shortlist: Databricks, AWS, DataRob|
|Week 7|Shortlist|Decisions communicated. Debriefs to all vendors. RFP timeline confirmed.|
|Week 7|Retrospective|10 lessons captured. 3 own architectural gaps identified. Procurement methodology improved.|

#### **10 EA Principles for Running an AI Platform RFI** 

|**1. Quantify inaction first**|The cost of staying on the current platform must be calculated before any<br>vendor is contacted. Without it, incumbent inertia always wins.|
|---|---|
|**2. Procurement and Legal from**<br>**Day 1**|Not as gatekeepers — as co-designers. Nadia's outcome-focus principle<br>shaped the entire RFI. Howard's NDA requirement protected both parties.|
|**3. Publish evaluation criteria in**<br>**the RFI**|Vendors write better responses when they know how they'll be scored.<br>Process fairness is not optional.|
|**4. Use a security floor, not a**<br>**security weight**|A vendor that fails security is not on the shortlist regardless of their other<br>scores. A weighted security score can be offset by a beautiful data science<br>UX.|
|**5. Outcome-focused**<br>**requirements, not feature**<br>**checklists**|Ask 'how do you support business outcome monitoring?' not 'do you have<br>CloudWatch integration?'. Feature checklists select the best salesperson.|
|**6. Brief all vendors before**<br>**responses — simultaneously**|Answer every Q&A; question to all vendors at the same time. Market<br>intelligence from one briefing shapes another vendor's response only if you<br>allow asymmetric information.|
|**7. Score independently before**<br>**the panel session**|Individual blind scoring before group discussion prevents anchor bias. The first<br>score in the room should not be the last.|
|**8. Adjust the TCO for**<br>**productivity, migration, and**<br>**maintenance**|Direct platform cost is never the real cost. A platform that saves £100K in<br>licence fees but costs £150K in engineering maintenance is not cheaper.|
|**9. Debrief every vendor —**<br>**shortlisted or not**|Vendor relationships are long. The vendor you don't choose today may be the<br>best option in two years. Honest feedback is a professional obligation.|
|**10. The retrospective is the**<br>**most valuable artefact**|The RFI reveals your own requirements gaps, your governance maturity, and<br>your organisational biases. The retrospective captures that before the next<br>procurement starts.|

**Page 25** 

**_"An RFI is not a shopping trip. It is a structured conversation with the market that teaches you as much about your own organisation as it does about the vendors."_**
