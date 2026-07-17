---
title: "APEX: AI Platform of Platforms — TOGAF 10 at NexaBank"
date_created: 2026-07-11
last_reviewed: 2026-07-17
status: archived
supersedes: ""
source_type: converted-pdf
source_file: "TOGAF10_APEX_AI_Platform_NexaBank.pdf"
tags: [togaf, enterprise-architecture, framework, ai-platform]
doc_type: guide
covers_version: "2026"
supersededBy: "enterprise-architecture/specialization/APEX_EA_Final"
---

> **Archived 2026-07-17.** This was an earlier, client-named (NexaBank) draft of the APEX TOGAF 10 + AI-DLC architecture. It was already substantively superseded by the anonymised, expanded [APEX: AI Platform of Platforms — Final Edition](/knowledge-docs/enterprise-architecture/specialization/APEX_EA_Final) (see that page's Team Structure/RACI and Cloud-Native Service Mapping sections, absent here). The three sections genuinely unique to this draft — Operating Model Transformations Required, the AI-DLC Adoption Roadmap, and the 23-tool Migration Strategy inventory — have been merged into the Final Edition. Kept for reference only; not linked from the sidebar. Also retained the "NexaBank" client name, which the Final Edition correctly generalised to a fictional org per this repo's sensitive-content policy — do not reuse this file as a content source elsewhere.

<!-- converted from TOGAF10_APEX_AI_Platform_NexaBank.pdf -->

**CONFIDENTIAL  |  TOGAF 10 ADM  |  AI-DLC INTEGRATED**

# APEX: AI Platform of Platforms — TOGAF 10 at NexaBank
## Enterprise Architecture on AWS Agent Core

A comprehensive TOGAF 10 Architecture Development Method (ADM) guide for designing, governing, and delivering an AI Platform of Platforms at NexaBank Global.

Incorporates AWS AI-Driven Development Lifecycle (AI-DLC) impact analysis across all nine TOGAF phases, with enterprise architecture implications, operating model changes, and governance adaptations required for the AI-native enterprise.

ORGANISATION **NexaBank Global** FRAMEWORK **TOGAF 10 ADM** DOCUMENT REF **EA-APEX-MASTER-001** CLASSIFICATION **CONFIDENTIAL**

PROGRAMME **APEX — AI Platform of Platforms** CLOUD PLATFORM **AWS Agent Core** VERSION **v3.0 | April 2026** STATUS **APPROVED**

**APEX: AI Platform of Platforms — TOGAF 10 + AI-DLC**

NexaBank Global | CONFIDENTIAL

![Figure 1](/img/enterprise-architecture/ea-p2-1.png)

## Executive Summary

Context, scope, and key facts

### About This Document

This document is the authoritative Enterprise Architecture (EA) reference for the APEX programme at NexaBank Global. It applies the TOGAF 10 Architecture Development Method (ADM) across all phases to architect, govern, and deliver a unified AI Platform of Platforms on AWS Agent Core. It has been extended to incorporate the impact of the **AWS AI-Driven Development Lifecycle (AI-DLC)** , a methodology introduced by AWS in July 2025 that fundamentally reimagines how enterprises develop software using AI as a central collaborator — not merely an assistant.

AI-DLC has direct and material consequences for enterprise architecture practice. Where traditional TOGAF ADM cycles operate over months, AI-DLC 'bolts' (the AI-DLC equivalent of sprints) operate over hours to days. This document analyses these impacts systematically across every ADM phase and recommends specific adaptations for the NexaBank enterprise architecture operating model.

![Figure 2](/img/enterprise-architecture/ea-p2-2.png)

### Business Context — NexaBank Global Pain Chain

|**Problem**|**Current State**|**APEX Target**|**AI-DLC Multiplier**|
|---|---|---|---|
|Time-to-market for AI|9.2 months|2.5 months|AI-DLC 'bolts'→<2 months|
|Duplicated AI spend|$14M/year|$3M/year|Reuse via agent marketplace|
|DORA governance gaps|47 gaps|0 gaps|AI-generated compliance artefacts|
|Developer NPS|-12|+55|AI-DLC mob construction|
|Agents in production|23 (siloed)|120 (platform)|Self-service + AI-DLC|
|MTTR for AI incidents|6.3 hours|<30 minutes|AI-DLC ops phase automation|

![Figure 3](/img/enterprise-architecture/ea-p3-3.png)

## Table of Contents

Structure of this document

### 00 Executive Summary

#### 01 AI-DLC: Research Findings & Enterprise Architecture Impacts

I What is AI-DLC?

I The Three Phases of AI-DLC

I AI-DLC vs Traditional Agile: Terminology Changes

I AI-DLC Impact Matrix: All 10 TOGAF Domains

I Operating Model Transformations

I NexaBank AI-DLC Adoption Roadmap

> **02 Preliminary Phase — Foundation**

I Architecture Principles Document (APD-001)

I Tailored ADM Process (ADM-TLR-001)

I Architecture Repository Setup (REPO-001)

**03**

#### Phase A — Architecture Vision

I Statement of Architecture Work (SAW-APEX-001) I Stakeholder Map & Register (STK-APEX-001)

I Architecture Vision Document (AVD-APEX-001)

> **04 Phase B — Business Architecture**

I Business Capability Map (BCM-APEX-001)

I Value Stream Analysis (VSA-APEX-001)

I Business Architecture Document (BAD-APEX-001)

> **05 Phase C — Information Systems Architecture**

I Data Architecture Document (DAD-APEX-001)

I Application Architecture Document (AAD-APEX-001)

**06**

#### Phase D — Technology Architecture

I Technology Architecture Document (TAD-APEX-001)

> **07 Phase E — Opportunities & Solutions**

I Architecture Roadmap (ROAD-APEX-001)

I Solution Building Blocks Catalogue (SBB-APEX-001)

**08**

#### Phase F — Migration Planning

I Implementation & Migration Plan (IMP-APEX-001)

**09**

#### Phase G — Implementation Governance

I Architecture Contract — Platform Foundation (AC-APEX-001) I Compliance Assessment Framework (CAF-APEX-001)

**10**

#### Phase H — Architecture Change Management

I Architecture Change Management Process (ACHG-APEX-001)

> **11 Requirements Management (Continuous)**

I Architecture Requirements Specification (ARS-APEX-001)

#### 12 Appendices & Reference Material

I Regulatory Cross-Reference Matrix

I AWS Agent Core Service Map

I Glossary

![Figure 4](/img/enterprise-architecture/ea-p5-4.png)

**AI-DLC: Research Findings & Enterprise Architecture Impacts** AWS AI-Driven Development Lifecycle — Implications for TOGAF 10 Practice

### What is AI-DLC?

The **AI-Driven Development Lifecycle (AI-DLC)** was introduced by AWS in July 2025 and presented as a keynote methodology at AWS re:Invent 2025 (session DVT214). It is the result of over 100 enterprise customer experiments by AWS Solutions Architecture and was built on observations that the two existing approaches to AI in software development — 'AI-assisted' (AI helps narrow tasks) and 'AI-autonomous' (AI builds everything) — both produced suboptimal results in velocity and quality. AI-DLC positions AI as a **central collaborator and teammate** , not merely a tool.

Early adopters including Wipro and Dun & Bradstreet reported **10–15x productivity gains** . A team at Wipro that had months of work planned completed all of it in just 20 working hours using AI-DLC methodology. The Atlassian RovoDev 2026 study found that AI agents in code review led to additional fixes in 38.7% of cases, while the Qodo 2025 AI Code Quality Report showed quality improvements rising to 81% from 55% with AI-assisted reviews.

### The Three Phases of AI-DLC

|**Pha**|**seName**|**AI Role**<br>**Human Role**<br>**EA Impact**|
|---|---|---|
|1|INCEPTION|Transforms business intent into requirement**s**, stories, units via 'M**o**b Elaboration'<br>Validate AI questions and pr posals; provides business context<br>Architecture vision, requirements, an|
|2|CONSTRUCTION|Proposes architecture, domain models, code, and tests via 'Mob Construc**t**ion'<br>Clarifies technical decisions and archi ectural choices in real-time<br>Phase B/C/D architecture artefacts p|
|3|OPERATIONS|Applies accumulated context to manage IaC and deployments with oversig**h**t<br>Reviews and approves infrastructure c anges; monitors outcomes<br>Phase F/G/H collapse into continuou|

### AI-DLC vs Traditional Agile: Terminology Changes

AI-DLC introduces new terminology to reflect its AI-driven, high-intensity collaborative approach. Understanding these changes is important for NexaBank's programme management and architecture governance:

|**Traditional Agile Term**|**AI-DLC Term**|**Duration Change**|**Architecture Implication**|
|---|---|---|---|
|Sprint|Bolt|2–4 weeks→hours to day|sADM phases must operate within bolt cadence|
|Epic|Unit of Work|Months→days to weeks|Architecture work packages shrink; more frequ|
|User Story|AI-Elaborated Requirement|Days→minutes|Requirements traceability automated|
|Code Review (PR)|AI-Augmented Quality Scan|Hours→minutes|Automated conformance checking|
|Architecture Review|Real-time Mob Constructio|nWeeks→concurrent|ARB must provide real-time guidance|
|Documentation|Persistent Semantic Conte|xtPost-sprint→continuous|Architecture repository auto-updated|
|Retrospective|Continuous Learning Loop|End of sprint→continuous|Architecture debt auto-detected|

### AI-DLC Impact Matrix: All 10 TOGAF ADM Phases

The following matrix maps AI-DLC's structural implications to each TOGAF ADM phase, identifying what changes, what risks emerge, and what adaptations NexaBank must make:

|**TOGAF Phase**|**AI-DLC Impact**<br>**Risk**<br>**NexaBank Adaptation**|
|---|---|
|Preliminary|AI generates architecture principles drafts; governance rules codified as 's**t**eering files' fed to AI agents<br>Principle quality depends on AI promp quality<br>Human architects validate all AI-generated pr|

|Phase A —|Vision|AI transforms business intent into draft Architecture Vision**a**nd SAW in hours; stakeholder analysis auto-po<br>Stakeholder nuance m y be missed by AI<br>Mob Elaboration session with all stakeholders|
|---|---|---|
|Phase B —|Business|AI auto-generates business capability maps fr**o**m existing documentation; value streams modelled in minute<br>Existing d cs may be stale or incomplete<br>Data quality programme prerequisite; 'Seman|
|Phase C —|Data|AI creates logical data models, entity diagrams, API schemas; prompt catalogs and embeddings become fi<br>Model drift introduces new data governance risk<br>Embeddings versioned in Data Mesh; prompt|
|Phase C —|Application|AI proposes application component models and int**e**gr**at**ion patterns dur**i**ng Mob Construction<br>AI may propos p<br>terns incons**is**tent with NexaB**an**k standar**d**s<br>Organ at on-specific st<br>dards loa ed into A|
|Phase D —|Technolog|yAI generates Terraform IaC, security policies,**a**nd d**e**ployment configurations from archit**e**cture context<br>IaC gener tion rrors may not be caught without review<br>Every developer must und rstand every line|
|Phase E —|Opportuniti|esAI can analyse gap reports and propose solut**i**on options, build/buy/reuse recommendati**o**ns at machine spe<br>AI may m ss regulatory or vendor**r**elationship context<br>Legal, p ocurement, and c mpliance must pa|
|Phase F —|Migration|Bolts replace work packages; migration pl**a**ns generated and updated in**n**ear real-time as delivery progress<br>Over- cceleration may skip governa ce gates<br>Compliance gates remain human-controlled;|
|Phase G|— Governanc|eAI automates conformance checking against architecture co**n**tracts; real-tim**e**drift detection replaces period<br>False positive conforma ce flags may create overhead<br>Automated ch cks inform; humans decide. A|
|Phase H —|Change|AI monitors technology landscape (new Bedrock models,**r**egulatory ch**a**nges) and flags architecture impac<br>Continuous change p oposals risk rchitecture instability<br>Change request filtering: AI flags, humans pr|
|Req. Mana|gement|AI generates and maintains requirements trac**e**ability from busine**s**s**in**tent to deployed co**d**e; semantic cont<br>Requirem nt drift if AI context w dow is not manage<br>Per istent context stored in GitHub repo (AI-D|

### Operating Model Transformations Required

AI-DLC is not just a development methodology — it requires structural changes to the enterprise architecture operating model. Research from Intelance, Staun & Stender, and CIO.com (2025) identifies five critical transformation areas that NexaBank must address:

#### 1. Governance Tempo: From Quarterly to Near Real-Time

Traditional EA governance operates on quarterly review cycles. AI-DLC's 'bolt' cadence means architecture decisions are needed in hours. NexaBank must establish a tiered governance model: automated checks run continuously (Cat A/B compliance), architect-in-the-loop reviews occur daily, full ARB convenes weekly rather than bi-weekly. Research from Staun & Stender (2025) confirms that 'these are not quarterly review topics; they are near real-time decisions.'

#### 2. EA Artefacts: From Static Documents to Living Digital Twins

Gartner (2025) notes that Forrester identified AI agents in EA suites are now automating data validation, capability mapping, and artefact creation. NexaBank's architecture repository (LeanIX) must transition from a periodic-update model to a continuously auto-updated environment where AI-DLC tools write back architecture artefacts as they are generated. The EA team shifts from artefact authors to artefact reviewers.

#### 3. New Roles: Enterprise AI Architect & Chief AI Ethics Officer

BCG research found that 89% of C-level executives ranked AI/GenAI in their top three strategic priorities for 2024. In response, organisations are introducing dedicated roles such as the Enterprise AI Architect. NexaBank must create this role (filled internally from the APEX Architecture team) and formalise the Chief AI Ethics Officer position proposed in the APEX Business Architecture.

#### 4. Data Architecture Extension: AI-Native Entities

TOGAF's traditional data architecture covers conceptual, logical, and physical models. AI-DLC introduces new first-class data entities that must be governed: **embeddings** (versioned vector representations), **prompt catalogs** (regulated as code + data), **feedback logs** (agent decision outcomes), and **model lineage records** (EU AI Act traceability). MLflow's Prompt Registry exemplifies this shift in tooling, as identified in the TOGAF BDAT stress-test research (Medium, Sept 2025).

#### 5. Business Architecture: Dynamic Capabilities Replace Static Models

Traditional Business Architecture documents stable capabilities. AI-DLC and agentic AI create capabilities that 'learn and adapt in motion.' Examples: Walmart and Carrefour already use AI to shift pricing and promotions dynamically — what was a quarterly campaign is now an hourly decision. NexaBank's Business Capability Map (BCM-APEX-001) must be updated to flag 'adaptive capabilities' and their governance implications separately from static capabilities.

### NexaBank AI-DLC Adoption Roadmap

NexaBank will adopt AI-DLC in a phased approach aligned to APEX delivery horizons, to avoid disrupting in-flight architecture governance while capturing productivity gains:

|**Horizon**<br>**Period**|**AI-DLC Adoption Scope**<br>**EA Impact**<br>**Governance Gate**|
|---|---|
|H0: Observe<br>Q1 2025|AI-DLC training for architecture team; pilot on 2 work packages<br>Minimal; existing ADM retained CTO sign-off on pilot|
|H1: Adopt for BuildQ2–Q3 2025|AI-DLC Construction phase for Pioneer Domain 1 & 2 delivery<br>Phase C/D artefacts AI-assisted; peer review mandatory<br>ARB approves AI-assisted a|
|H2: Extend to Inception<br>Q4 2025|Mob Elaboration for Pioneer 3–5 requirements and architecture vision<br>Phase A/B artefacts AI-generated; ARB review process upd<br>Steering Committee endors|
|H3: Full AI-DLC Q1–Q2 2026|End-to-end AI-DLC across all APEX workstreams; real-time governance<br>Full operating model transformation; LeanIX AI integration<br>Architecture Board annual r|

![Figure 5](/img/enterprise-architecture/ea-p8-5.png)

## Preliminary Phase — Foundation

Establish architecture capability, principles, and governance

The Preliminary Phase establishes NexaBank Global's architecture capability for the APEX programme. Before any AI platform design begins, we codify governance structures, tailor the ADM for financial services regulatory constraints, and ratify the architecture principles that govern every subsequent decision.

### Key Activities

- Define Architecture Capability & Maturity Target (CMMI Level 3 target)

- Establish the Architecture Board (ARB) and full RACI

- Tailor the TOGAF ADM for FinServ regulatory constraints (DORA, BCBS 239, EU AI Act)

- Populate the Architecture Repository: LeanIX + Confluence + Azure DevOps

- Define and ratify Architecture Principles (9 principles across 3 domains)

- Establish architecture tooling standards and modelling conventions (ArchiMate 3.2 + C4)

- AI-DLC Impact: Load NexaBank architecture standards as AI-DLC 'steering files' in Amazon Q Developer

#### Document: Architecture Principles (APD-001)

##### `DOC REF: APD-001 | v2.1 | APPROVED`

#### Business Principles

|**ID**|**Principle**<br>**Statement**<br>**Key Implication**|
|---|---|
|BP-01|AI as Business CapabilityEvery APEX agent traces to a measurable business outcome in the Corporate Strategy Map<br>Every domain must submit a Business Value Case (B|
|BP-02|Human-in-the-Loop by Default<br>All AI agents acting on customer data or financial transa**c**tions must have a defined human escala<br>AWS Bedro k Human Loop (A2I) mandatory for cred|
|BP-03|Platform Thinking over Point Solutions<br>No BU shall procure a standalone AI/ML tool if APEX can provide equivalent capability within 90 d<br>ARB approval required for any AI procurement outsid|
|**Data Pr**<br>**ID**|**inciples**<br>**Principle**<br>**Statement**<br>**Key Implication**|
|DP-01|Data Sovereignty and Residency<br>Customer PII and financial data must remain in the client's contractual jurisdiction<br>Multi-region AWS deployment; Bedrock model endpoints|
|DP-02|Data as a Shared AssetAll data consumed by APEX agents is catalogued in the NexaBank Data Mesh<br>Mandatory integration with AWS Glue Data Catalog and A|
|DP-03|Explainability Before Deplo**y**ment<br>An ML model embedded in an APEX agent must have a documented explainability m**e**thod<br>SageMaker Clarify pipeline is a mandatory gat in APEX|
|DP-04 (|AI-DLC)<br>Prompt Catalogs as Governed Data<br>Prompt templates, embeddings, and feedback logs are first-class data ass**e**t**s**governed by the**D**a<br>MLflow Prompt Registry; prompt v r ioning in GitHub;<br>P|

#### Data Principles

#### Technology Principles

|**ID**|**Principle**|**Statement**<br>**Key Implication**|
|---|---|---|
|TP-01|AWS-First, Not AWS-|Only<br>AWS is the strategic cloud provider; architectu**r**e must avoid irreversible vendor lock-in<br>Agent o chestration logic in Step Functions; portable agent|
|TP-02|Security by Design|Security controls are embedded at design time, not retrofitted post-deployment<br>IAM, Macie, GuardDuty, Bedrock Guardrails configured be|
|TP-03|Observability as First-|Class<br>Every APEX agent must emit structured traces, metrics, a**n**d logs from day one<br>CloudWatch + Ope Telemetry mandatory; Datadog APM f|
|TP-04|Cost Transparency|Each AI agent must have a tagged cost centre and mon**t**hly token-cost budget with alerts<br>AWS Cost Alloca ion Tags mandatory; FinOps review gate|
|TP-05 (|AI-DLC)<br>Every Dev Understan|ds Every Li**ne**<br>All AI-ge<br>rated IaC and code must be reviewed and understood by a human engineer before me<br>Mandatory peer review for all AI-generated Terraform; no b|

![Figure 6](/img/enterprise-architecture/ea-p9-6.png)

## Architecture Vision

Define the why, what, and who — secure executive mandate

Phase A creates the Architecture Vision for APEX: the compelling case for change, stakeholder landscape, architecture scope, high-level target state, and the Statement of Architecture Work (SAW) that gives the programme formal mandate. AI-DLC Mob Elaboration sessions accelerate this phase significantly.

### Document: Statement of Architecture Work (SAW-APEX-001)

```
DOC REF: SAW-APEX-001 | v1.4 | APPROVED — Group CTO sign-off: 2025-02-14
```

#### Architecture Vision Statement

**"By Q4 2026, NexaBank Global will operate a unified AI Agent Platform (APEX) on AWS Agent Core that reduces time-to-market for AI use cases from 9.2 to 2.5 months, achieves full EU AI Act and DORA compliance, and generates £38M NPV over 5 years through platform economics."**

#### Architecture Constraints

|**Constraint**|**Source**|**Architecture Impact**|
|---|---|---|
|Data must not leave contractual jurisdic|tion<br>GDPR / PDPA / LGPD|Multi-region AWS deployment mandatory|
|All AI models require Model Risk sign-o|ffSR 11-7 / Internal Policy|6-week validation gate per model class|
|AWS is strategic cloud partner|Board Cloud Strategy|Primary platform must be AWS; abstraction layers required|
|Zero-downtime for Tier-1 services|SLA Policy|Blue-green deployment mandatory for all Pioneer agents|
|99.95% availability target|Enterprise SLA|Multi-AZ + DR across 2 regions minimum|
|EU AI Act enforcement from Aug 2026|European Commission|High-Risk AI classification and controls pre-built|

#### Stakeholder Power/Interest Grid

Key Players (High Power, High Interest) — Core governance engagement:

|**Stakeholder**|**Role**|**Primary Concerns**<br>**APEX Value Proposition**|**Engagement Cadence**|
|---|---|---|---|
|Sarah Chen|Group CTO / Exec|Sponsor<br>Speed, cost, regulatory risk<br>-68% TTM; -$14M duplicated spe|ndMonthly steering|
|Marcus Webb|VP AI Platform|Platform adoption, developer experience<br>Self-service marketplace|Daily collaboration|
|Priya Nair|CISO|Data leakage, model poiso**n**ing<br>Ce tralised Bedrock Guardrails +|IAM<br>Bi-weekly review|
|James Okafor|Group Compliance|DORA Art.11, EU AI Act, BCBS 239<br>Automated compliance reporting|Monthly evidence|
|Dr. Lin Wei|Chief Data Officer|Data mesh integration, lineag**e**, sovereignty<br>Nativ Glue/Atlas integration|Bi-weekly|
|PRA / ECB|Regulator|Systemic AI risk, model governance<br>DORA evidence pack, EU AI Act|Art.13<br>Quarterly briefing|

#### Five Pioneer Domains (Proof-of-Value)

|**#**|**Domain**|**Agent Name**|**Use Case**<br>**Key Regulation**|**AI-DLC Bolt Estimate**|
|---|---|---|---|---|
|1|Retail Banking|CreditRiskAgent|Automated credit decisioning with human escalation<br>SR 11-7, FCA|3 bolts (approx. 6 weeks)|
|2|Corporate Banking|KYCRefreshAgent|Continuous KYC monitoring, sanctions, SAR drafting<br>FinCEN, FCA, FATF|3 bolts|
|3|Wealth Manageme|ntPortfolioRebalAgent|Rule-based rebalancing recommendations<br>MiFID II Art.27|2 bolts|
|4|IT Operations|IncidentAgent|L1/L2 ticket triage and remediation automation<br>DORA Art.11|2 bolts|
|5|Risk|ModelMonitorAgent|Drift detection, backtesting, regulator report generation<br>SR 11-7, BCBS 239|3 bolts|

![Figure 7](/img/enterprise-architecture/ea-p10-7.png)

## Business Architecture

Map capabilities, value streams, and organisational model

Phase B produces the Business Architecture for APEX — the capability model, value streams, organisation design, and business processes that the platform must support. AI-DLC fundamentally changes how business capabilities are modelled: capabilities that use AI are no longer static — they 'learn and adapt in motion.'

### Business Capability Map — Gap Summary (BCM-APEX-001)

```
DOC REF: BCM-APEX-001 | v1.5
```

|**L1 Capability Domain**|**L2 Count**|**Critical Gaps**|**APEX Addresses **|**AI-DLC Dynamic?**|
|---|---|---|---|---|
|1. AI Strategy & Governance|5|4 critical|5/5|Partially — policy enforcement via AI ag|
|2. Agent Development|5|5 critical|5/5|YES — AI-DLC Construction phase|
|3. Agent Orchestration|4|4 critical|4/4|YES — AI-DLC Operations phase|
|4. Knowledge Management|4|4 critical|4/4|YES — continuous KB refresh|
|5. AI Operations (AIOps)|5|5 critical|5/5|YES — AI-DLC Operations + H-phase|
|6. Data Integration|4|2 critical|3/4|PARTIALLY — Data Mesh remains dom|
|7. Platform Enablement|4|4 critical|4/4|YES — self-service portal auto-generate|

#### Value Stream: AI Agent Delivery (Baseline vs APEX vs AI-DLC)

```
DOC REF: VSA-APEX-001 | v1.1
```

|**Stage**|**Baseline Duratio**|**n APEX Duration**|**AI-DLC Duration**|**AI-DLC Enabler**|
|---|---|---|---|---|
|Intake & Qualification|2–4 weeks|5 business days|1–2 hours|AI-DLC Mob Elaboration; EU AI Act classif|
|Architecture & Design|4–8 weeks|10 business days|1–3 days (1 bolt)|Mob Construction; AI generates architectu|
|Build & Integrate|8–16 weeks|3 weeks|1–2 weeks (1–2 bo|lts)<br>Amazon Q Developer; AI generates IaC, L|
|Validate & Govern|6–10 weeks|10 business days|3–5 days|AI-automated RAGAS eval, Guardrail tests|
|Deploy & Monitor<br>TOTAL TIME-TO-MARKE|2–4 weeks<br>T 22–42 weeks (~9|1 week<br>mo)~9.5 weeks (~2.5m|1–2 days<br>o)~3–4 weeks (~1m|AI-DLC Operations; IaC apply, canary, das<br>o)AI-DLC compounds across all stages|
|**Value Waste Elimina**<br>**Waste Type (Lean)**|**tion**<br>**Current Cos**|**t**<br>**APEX Reduction**|**AI-DLC Furt**|**her Reduction**<br>**Residual**|
|Rework (duplicate agent|patterns)<br>$3.2M|-80% via platform r|euse -15% via AI p|attern suggestion$0.2M|
|Waiting (manual complia|nce queue)<br>$4.8M|-60% via automate|d pipeline<br>-30% via AI-g|enerated evidence$0.5M|
|Overprocessing (obs stac|k rebuild)<br>$2.1M|-90% via shared ob|servability<br>-5% via AI-ge|nerated dashboards<br>$0.1M|
|Inventory (abandoned ag|ent builds)<br>$1.9M|-70% via marketpla|ce discovery<br>-20% via AI-|DLC fast completion<br>$0.3M|
|Defects (untested agents|in prod)$2.0M|-75% via CI/CD gat|e<br>-20% via AI-g|enerated test suites<br>$0.1M|
|TOTAL|$14.0M/yr|$7.6M reduction|$1.5M additio|nal reduction<br>$1.1M residual|

#### Value Waste Elimination

![Figure 8](/img/enterprise-architecture/ea-p11-8.png)

## Information Systems Architecture

Data architecture and application component design

Phase C covers both Data and Application Architecture. For APEX, this is the most technically complex phase: it introduces AI-native data entities (embeddings, vector stores, prompt catalogs, feedback logs) that do not exist in traditional TOGAF data models, and agent-oriented application design patterns that require new architectural conventions.

### Data Classification Framework (APEX-Specific)

#### `DOC REF: DAD-APEX-001 | v1.3`

|**Class**|**Description**|**Examples**|**Bedrock Guardrails Actio**|**nRetention**|
|---|---|---|---|---|
|C4 — Highly Restric|tedPII + Financial data|NI numbers, account bala|nces, credit scores<br>DENY in logs; tokenise in|prompts<br>7 years (DORA)|
|C3 — Confidential|Internal business data|Credit models, risk param|eters, strategies<br>Redact in traces and logs|5 years|
|C2 — Internal|Non-sensitive operation|alAgent performance metric|s, usage logs<br>Standard logging|3 years|
|C1 — Public|Regulatory/market data|FCA rules, market rates, B|asel III guides<br>None required|Indefinite|
|C-AI — AI Assets (N|EW)<br>AI-DLC: Prompt catalog|s, e**m**beddings, feedback l<br>Pro<br>pt templates, vector|ogs<br>embeddi**n**gs, RLHF data<br>Versio -controlled; DPO si|gn-off if C4-a**d**jacent<br>Per source ata clas|

#### AI-Native Data Entities (AI-DLC Extension to TOGAF Data Architecture)

Traditional TOGAF data architecture does not include AI-specific artefacts. AI-DLC and agentic platforms introduce a new category of governed data entities that must be treated as first-class architectural concerns:

|**Entity**||**Descripti**|**on**<br>**Governance OwnerTooling**<br>**Risk if Ungoverned**|
|---|---|---|---|
|Prompt C|atalog|Versione|d prompt templates for each age**n**t; treated as regulated code<br>Platform AI E gineer + DPO<br>MLflow Prompt Registry + GitHub<br>Prompt drift causes model behaviour chan|
|Embeddi|ng Store|Vector re|presentations of knowledg**e**base content; v**er**sioned per KB refresh<br>Data M sh Domain Own<br>AWS OpenSearch Serv**e**rless (AOSS)<br>Stal embeddings cause hallucinations; ve|
|Feedbac|k Log|Human-in|-Loop decisions, correction**s**, escalation reasons<br>Model Ri k + Compliance<br>S3 WORM + Glue Catalog<br>SR 11-7 and EU AI Act evidence gaps; mo|
|Agent Me|mory|Cross-se|ssion context store; session summaries; e**n**tity memory<br>Platform EngineeringDy amoDB + Bedrock Session Memory<br>PII retention violation if session memory no|
|Model Lin|eage Rec|ord<br>Training|data→model version→deployment record chain<br>Model Risk Management<br>SageMaker Model Registry + MLflow<br>EU AI Act Art.13 transparency breach; reg|
|RAG Ret<br>**Knowled**<br>|rieval Log <br>**ge Bas**<br>|What chu<br>**e Archit**|nks were retrieved for each agent d**e**cision<br>Compliance + Int rna**l**Audit<br>C oudWatch + S3 WORM<br>Cannot explain agent decision; BCBS 239<br>**ecture (RAG Design)**<br><br><br> <br>|
|**KB ID**|**Name**||**Sources**<br>**Chunking**<br>**Embedding Model Refresh**<br>**Vector Store**|
|KB-001|Credit P|olicy KB|FCA Handbook (2,847pp), NexaBank Credit Policy v12.3, Basel III guides<br>Recursive 512 tokens, 10% overlap<br>Titan Embeddings v2 (1536-dim)<br>Nightly (internal); weekly (regulato<br>AOSS eu-west-|
|KB-002|KYC Re|gulatory K|BFinCEN guidance, FCA AML handbook, FATF 40 Recomm**en**dations<br>Semantic 1024 tokens, 15% ov rlap<br>Titan Embeddi gs v2Weekly (regulatory source monito<br>AOSS eu-west-|
|KB-003|Product|& Suitabili|ty KB<br>NexaBank product catalogue, MiFID II suitability rules, risk factor definitions<br>Recursive 512 tokens<br>Titan Embeddings v2Real-time (product chang**e**s)<br>AOSS u-west-|
|KB-004|IT Runb|ook KB|ServiceNow runbooks, DORA incident resp**o**nse playbooks, on-call guides<br>Semantic 768 t kens<br>Titan Embeddings v2On-change (runbook update trigge<br>AOSS eu-west-|

#### Knowledge Base Architecture (RAG Design)

#### Application Architecture — AWS Agent Core Component Model

```
DOC REF: AAD-APEX-001 | v1.4
```

|**Component**|**Technology**|**Pattern**<br>**SLA**|**AI-DLC Construction Note**|
|---|---|---|---|
|APEX Developer Porta|l React SPA + API Gateway|BFF (Backend-for-Frontend<br>99.9%|)<br>/ p99 <500msUI scaffolded by Amazon Q Developer|
|APEX Control Plane|Python FastAPI on ECS Fa|rgate<br>Microservice (5 services)<br>99.9%|/ p99 <500msFastAPI skeleton + unit tests AI-genera|

Bedrock Supervisor AgentAWS Bedrock Agents + Claude 3.5Orchestrator-Worker99.95% / p99 <3s Agent YAML + prompt templates gene Tool Lambda Library AWS Lambda Python 3.12 Sidecar + Action Groups99.95% / p99 <1s Each tool function AI-generated; mand Human Loop (A2I) AWS Augmented AI + React UIHuman-in-the-Loop 99.5% / SLA by task typeA2I workflow config generated; custom Observability Stack CloudWatch + X-Ray + DatadogCentralised OTEL collector99.5% Dashboard-as-code generated by AI-D Compliance Reporter Python + AWS QuickSight Batch report generation99.5% / daily run EU AI Act and DORA report templates

#### API Catalogue

|**API**|**Version**|**Pattern**|**Auth Method**|**Availability SLA**|**Owner**|
|---|---|---|---|---|---|
|Agent Registry API|v2|REST/JSON + O|penAPI 3.1<br>OAuth2 (APEX sc|ope)<br>99.9% / p99 <200ms|Platform Eng|
|Agent Invocation API|v1|REST + SSE str|eaming<br>IAM SigV4|99.95% / p99 <3s|Platform Eng|
|Knowledge Base API|v1|REST/JSON|IAM SigV4|99.9% / p99 <500ms|AI/ML Eng|
|Onboarding API|v1|REST/JSON|OAuth2|99.5% / p99 <1s|Platform Eng|
|Chargeback API|v1|REST/JSON|mTLS|99.9% monthly|FinOps|
|Compliance Report AP|I v1|REST/JSON|OAuth2 + MFA|99.5% daily|Compliance|

![Figure 9](/img/enterprise-architecture/ea-p13-9.png)

## Technology Architecture

Multi-region AWS infrastructure, security, CI/CD, and observability

Phase D specifies the complete technology architecture for APEX on AWS. This covers multi-region infrastructure, AWS Agent Core configuration, network design, security architecture, the CI/CD pipeline enhanced with AI-DLC tooling, and the operational observability model.

### Multi-Region Deployment Model

#### `DOC REF: TAD-APEX-001 | v2.0`

|**AWS Region**|**Role**|**Data Types**<br>**Key Services**<br>**Regulatory Basis**|
|---|---|---|
|eu-west-1 (Ireland)|PRIMARY|UK/EU customer PII, financial data<br>Bedrock Agents, AOSS, Aurora, S3 WORM, Kinesis<br>GDPR, UK GDPR, FCA, PRA|
|eu-central-1 (Frankfurt)|DR + DE data|German banking data, S3 CRR target<br>Bedrock, AOSS (DR), S3<br>GDPR, BaFin MaRisk|
|us-east-1 (N. Virginia)|US INSTITUTI|ONAL<br>US institutional counterparty data<br>Bedrock, AOSS, Aurora replica CCPA, FinCEN, SEC, FINRA|
|ap-southeast-1 (Singap|ore)<br>APAC|Singapore, HK customer dataBedrock, OpenSearch Service, S3<br>PDPA, MAS TRM Guidelines|

#### AWS Bedrock Agent Core Configuration

The APEX Supervisor Agent is configured as an orchestrator that routes to specialist sub-agents per Pioneer Domain. Key configuration parameters:

|**Parameter**|**Value**|**Rationale**|
|---|---|---|
|Foundation Model|anthropic.claude-3-5-sonnet-202410|22-v2:0<br>Best reasoning performance on NexaBank FS eval sui|
|Idle Session TTL|1800 seconds (30 min)|Balance UX continuity with PII retention risk; GDPR da|
|Memory Type|SESSION_SUMMARY (enabled)|Cross-turn context for multi-step financial workflows|
|Guardrail Version|apex-guardrail-prod v3|PII ANONYMIZE for SORT_CODE, ACCOUNT_NUMB|
|Grounding Threshold|0.75 (strict)|Reject responses not grounded in retrieved context —|
|Max Tokens (output)|4,096|Sufficient for credit decision explanations; cost-controll|
|Invocation Endpoint|VPC PrivateLink only|No public internet path; DORA and security architectur|
|Bedrock Tracing|Enabled→CloudWatch|DORA Art.11 audit trail; EU AI Act traceability requirem|

#### Security Architecture Summary

|**Security Domain**|**Control**|**Implementation**<br>**Compliance Basis**|
|---|---|---|
|Identity & Access|AWS SSO + NexaBank Id|P (SAML)<br>IAM Identity Centre; TOTP mandatory for humans<br>DORA Art.9, ISO 27001|
|Encryption at Rest|KMS Customer Managed|Key (CMK)<br>Separate CMK per data class; 365-day auto-**r**otation<br>GDPR A t.32, PCI DSS|
|Encryption in Transit|TLS 1.3 minimum|TLS 1.0/1.1 disabled via AWS policy; no plaintext paths<br>FIPS 140-2, DORA|
|Network Isolation|VPC PrivateLink for all Be|drock calls<br>No public internet from Lambda/ECS; VPC endpoints for 12 services<br>TP-01, Security Policy|
|Threat Detection|GuardDuty + Macie + Sec|urityHub<br>All regions; S3 PII scanning daily; findings→SIEM within 5 min<br>DORA Art.11, SOC 2|
|Agent Safety|Bedrock Guardrails v3|PII anonymisation; financial fraud filter; grounding check 0.75<br>EU AI Act Art.9, BP-02|
|Prompt Injection Defen|ceInput sanitisation Lambda|wrapper<br>All agent inputs pass through sanitisation layer before Bedrock<br>OWASP LLM Top 10|
|Secrets Management|AWS Secrets Manager|90-day auto-rotation; no hardcoded secrets (Checkov enforced)<br>CIS AWS L2|

#### CI/CD Pipeline — AI-DLC Enhanced

The APEX CI/CD pipeline has been redesigned to incorporate AI-DLC Construction and Operations phase tooling alongside traditional quality gates:

|**Stage**|**Tools**<br>**AI-DLC Enhancement**<br>**Gate Type**|
|---|---|
|1. Code Generatio|nAmazon Q Developer, GitHub Copilot<br>AI generates Terraform IaC, Lambda functions, agent YAML from context<br>Human review mandatory (TP-05)|
|2. Static Analysis|Checkov, cfn-lint, yamllint, OWASP<br>AI explains any failures with remediation suggestions<br>Automated; zero HIGH/CRITICAL to pa|
|3. Prompt Regress|ion<br>RAGAS (custom eval suite) AI-generated test cases against baseline; >90% score required<br>Automated; block on regression|
|4. Guardrail Testin|gBedrock Guardrail test harness<br>AI generates adversarial prompts to test guardrail coverage<br>Automated; 100% pass required|
|5. Model Risk Gate|Azure DevOps approval workflow<br>AI generates model risk evidence pack draft; hum**a**n signs<br>Manu l; Model Risk sign-off|
|6. Non-Prod Deplo|yTerraform + GitHub Actions + OIDC<br>AI-DLC Operations: IaC apply automated; smoke tests AI-generated<br>Automated + architect review|
|7. Canary Deploy|AWS CodeDeploy (10%→50%→100%)<br>AI monitors canary metrics; auto-rollback on p99 breach<br>Automated with human override|
|8. Post-Deploy|CloudWatch + FinOps checker<br>AI generates stakeholder summary; cost tags verified; DORA evid**e**nce created<br>Automated complianc record|

![Figure 10](/img/enterprise-architecture/ea-p15-10.png)

## Opportunities, Migration, Governance & Change

Roadmap, delivery plan, compliance, and ongoing architecture management

### Phase E — Architecture Roadmap (ROAD-APEX-001)

#### `DOC REF: ROAD-APEX-001 | v2.1`

AI-DLC compresses the architecture roadmap significantly. Traditional work packages measured in months are replaced by 'bolts' (hours to days). The following roadmap shows both APEX work packages and their AI-DLC bolt estimates:

|**Work Package**|**WP-ID**|**AI-DLC Bolts**|**Calendar Weeks**|**Horizon**|
|---|---|---|---|---|
|APEX Core Infrastructure (multi-region VPC, I|AM, KMS)<br>WP-001|2 bolts|4 weeks|H1|
|Bedrock Agent Core Setup (supervisor, guardr|ails, KB-001<br>WP-002|)<br>2 bolts|4 weeks|H1|
|CI/CD Pipeline with AI-DLC tooling|WP-004|1 bolt|2 weeks|H1|
|Security Baseline (all controls)|WP-008|2 bolts|4 weeks|H1|
|Observability Stack (CloudWatch + Datadog)|WP-007|1 bolt|2 weeks|H1|
|Pioneer 1: Credit Risk Agent|WP-005|3 bolts|8 weeks|H1|
|Pioneer 2: KYC Refresh Agent|WP-006|3 bolts|8 weeks|H1|
|Pioneer 3: Portfolio Rebalancing Agent|WP-009|2 bolts|6 weeks|H2|
|Pioneer 4: IT Incident Response Agent|WP-010|2 bolts|5 weeks|H2|
|Pioneer 5: Model Monitoring Agent|WP-011|3 bolts|6 weeks|H2|
|Self-Service Onboarding Portal|WP-012|3 bolts|8 weeks|H2|
|EU AI Act Compliance Pack (automation)|WP-015|2 bolts|5 weeks|H2|

### Solution Building Blocks — Build/Buy/Reuse Summary (SBB-APEX-001)

```
DOC REF: SBB-APEX-001 | v1.2
```

|**SBB**|**Decision**|**Solution**|**AI-DLC Role**|
|---|---|---|---|
|Agent Orchestration Engine|BUY (SaaS)|AWS Bedrock Agents|AI-DLC generates agent YAML and action group config|
|Foundation Models|BUY (SaaS)|Anthropic Claude 3.5 via B|edrock<br>AI-DLC: AI selects model per task in Construction phas|
|Vector Store|BUY (Manage|d)AWS OpenSearch Serverle|ssAI-DLC generates index mappings and query patterns|
|Agent Control Plane|BUILD|Python FastAPI on ECS Fa|rgate<br>AI-DLC Construction builds entire service in 2 bolts|
|Developer Portal|BUILD|React + AWS Amplify|AI-DLC UI scaffolding in Mob Construction (1 bolt)|
|Human Loop UI|BUY + EXTEN|DAWS A2I + custom React|AI-DLC generates A2I workflow JSON; custom React m|
|Observability|REUSE + EXT|END<br>Datadog + CloudWatch|AI-DLC generates dashboards-as-code from agent sch|
|Tool Lambda Library|BUILD|AWS Lambda Python 3.12|AI-DLC generates each tool function; mandatory huma|
|Compliance Reporter|BUILD|Python + QuickSight|AI-DLC generates EU AI Act and DORA report templat|

### Phase F — Implementation & Migration (IMP-APEX-001)

```
DOC REF: IMP-APEX-001 | v1.5
```

#### Migration Strategy: 23 Existing AI Tools

**Category Count Action AI-DLC Migration Path Target Date** ADOPT — Already AWS; add APEX governance8 tools Wrap in APEX tool framework; add guardrailsAI-DLC Operations: IaC wrapping in 1 bolt per toolQ3 2025 ADAPT — Works well; needs APEX integration layer6 tools Expose as APEX tool; APEX orchestrateAI-DLC build adapter Lambda in Mob Construction **s** Q4 2025 REPLACE — Duplicates APEX capability7 tools Pioneer agent replaces; decommission legacyParallel-run then canary cutover; AI monitors metricsQ1 2026 RETIRE — Unused/low value 2 tools Immediate decommission; archive audit logsAI-DLC Operations: IaC teardown + evidence generationQ2 2025

### Phase G — Architecture Governance (CAF-APEX-001 + AC-APEX-001)

```
DOC REF: CAF-APEX-001 | v1.1 — AI-DLC Impact: Real-Time Automated Conformance
```

AI-DLC fundamentally changes the governance model: where traditional conformance reviews occur at milestone gates, AI-DLC enables **continuous automated conformance** . The APEX compliance assessment framework operates in two tiers:

|**Tier**<br>**Checks**|**Method**<br>**Frequency**<br>**Human Involvement**|
|---|---|
|Tier 1: Automated (always-on)<br>AWS Config rules, Checkov, Secur|ityHub, RAGAS score, cost tag**com**pl**i**ance<br>CI/CD pipeline + AWS Config + Schedul**e**d Lambda<br>Every<br>m t + very 6 hours<br>Alert only; human reviews findi|
|Tier 2: Architect-in-Loop<br>Architectural conformance (design|to blueprint), new agent pattern r**e**v**i**ew, data class**i**fication check<br>Automated check + Slack notificat**o**n to architect on-call<br>Every d pl yment + daily digest<br>Arch tect reviews and signs off|
|Tier 3: ARB ReviewSignificant deviations, new SBBs, r|egulatory gap findings, architecture debt accumul**a**tion<br>Formal ARB session (now weekly with AI-DLC)<br>Weekly (was bi-weekly; ccelerated for AI-DLC)<br>Full ARB; human decision auth|
|Tier 4: Steering Committee<br>Strategic deviations, budget impac|ts >£50K, r**e**gulatory findings<br>Formal st ering pack (AI-generated draft, human reviewed)<br>Monthly<br>Steering committee; executive|

### Phase H — Architecture Change Management (ACHG-APEX-001)

#### `DOC REF: ACHG-APEX-001 | v1.2 — AI-DLC Impact: Continuous Change Intelligence`

With AI-DLC and AWS Bedrock model releases occurring frequently (Claude versions, new Bedrock features), Phase H must operate as a continuous intelligence function — not a periodic review. NexaBank implements an AI-powered change monitoring system that watches technology and regulatory landscapes:

|**Change Type**|**AI-DLC Monitoring Method**<br>**Response SLA**<br>**Example**|
|---|---|
|Type 1: Tech-drive|n (AWS/Anthropic)<br>Amazon Q Developer + Bedrock model announcements monitored by APEX ChangeBot<br>Architecture impact assessment within 5 business days<br>Claude 3.5 Sonnet v2 released: 23% FS eval i|
|Type 2: Regulator|y-driven<br>EU AI Act enforcement calendar monitored; regulatory feed parsed daily by agent<br>Compliance impact assessment within 48 hours<br>EU AI Act Art.6 enforcement date: APEX comp|
|Type 3: Business-|driven<br>Domain team agent onboarding request triggers standard intake workflow<br>Standard: 5 business days to intake deci**s**i**on**<br>New BU request<br>boarding to APEX marketp|
|Type 4: Simplificat|ion/Retirement<br>APEX usage analytics identifies underutilised agents quarterly<br>Decommission plan within 30 days of flag<br>Pioneer 1 agent v1.2 superseded by v2.0; v1.2|

![Figure 11](/img/enterprise-architecture/ea-p17-11.png)

## Requirements Management (Continuous)

Living requirements — the heartbeat of the APEX ADM

Requirements Management is the continuous, central process of the TOGAF ADM wheel. AI-DLC's 'Semantic Context Building' and persistent context storage transform this from a periodic document into a living, AI-maintained traceability system. NexaBank maintains 147 architecture requirements in the ARS; a representative sample is shown below.

### Architecture Requirements Specification — Sample (ARS-APEX-001)

```
DOC REF: ARS-APEX-001 | v2.3 | Living Document — 147 total requirements
```

|**Req ID**|**Category**|**Statement (Summary)**<br>**Priority**|**Source**|**Status**|
|---|---|---|---|---|
|BR-001|Business|Platform supports≥120 concurrent agent interactions per r<br>Must|egion<br>Capacity model|In Design|
|BR-003|Business|All agent decisions logged and queryable for 7 year**s**minim<br>Mu t|um<br>DORA Art.11|In Design|
|BR-006|Business|EU AI Act risk tier auto-classified at agent intakeMust|EU AI Act|In Design|
|DR-001|Data|Customer PII never persisted in agent conversation logs<br>Must|GDPR Art.5|In Design|
|DR-NEW-01|Data (AI-DLC)|Prompt templates versioned in GitHub; changes trigger reg<br>Must|ression tests<br>TP-05, AI-DLC|Backlog|
|DR-NEW-02|Data (AI-DLC)|Embeddings versioned per KB refresh; old versions retain<br>Must|ed 90 days<br>DR-003, EU AI Act|Backlog|
|AR-001|Application|Agent Control Plane API: p99 response <500ms under 50<br>Must|0 RPS<br>SLA Policy|In Design|
|TR-001|Technology|All Bedrock invocations via VPC PrivateLink only (no publi<br>Must|c internet)<br>Security Policy|In Design|
|TR-NEW-01|Technology (AI-|DLC)<br>All AI-generated IaC peer-reviewed by human engineer be<br>Must|fore merge<br>TP-05, AI-DLC|In Design|
|SR-003|Security|Red-team adversarial testing of each agent before product<br>Must|ion<br>AI Risk Policy|In Review|
|CR-001|Compliance|EU AI Act risk classification documented for all agen**t**s<br>Mus|EU AI Act Art.9|In Design|
|CR-002|Compliance|Model explainability method documented (SHAP/LIME) be<br>Must|fore production<br>EU AI Act Art.13|In Design|
|CR-003|Compliance|DORA 72-hour ICT incident notification process automated<br>Must|<br>DORA Art.17|In Review|
|CR-NEW-01|Compliance (AI-|DLC)<br>AI-generated architecture artefacts marked with AI-DLC m<br>Should|etadata for audit<br>EA Governance|Backlog|

#### APPENDIX A

## Regulatory Cross-Reference Matrix

APEX compliance posture across all applicable regulatory frameworks

APEX operates in a highly regulated environment. The following matrix maps each regulatory framework to the specific APEX architecture controls that satisfy its requirements:

|**Regulation**|**Key Articles / Rules**<br>**APEX Architecture Control**<br>**Evidence Artefact**|
|---|---|
|EU AI Act 2024|Art.6 (High-Risk classification), Art.9 (Risk Mgmt System), Art.13 (Transparency), Art.17 (Quality Mgmt)<br>EU AI Act risk classifier at intake; SHAP/LIME in CI/CD; Bedrock tracing; M<br>EU AI Act Compliance Pack (WP-0|
|DORA (EU) 2025|Art.9 (ICT security), Art.11 (ICT risk mgmt), Art.17 (incident notification), Art.26 (TLPT)<br>APEX Security Architecture; WORM audit logs; automated 72hr incid**e**nt wo<br>DORA Evidence Pack (quart rly);|
|GDPR / UK GDPR|Art.5 (data minimisation), Art.25 (privacy by design), Art.32 (security), Art.46 (transfers)<br>Bedrock Guardrails PII anonymisation; data residency by region; CMK enc<br>DPA Article 30 records; Guardrail c|
|SR 11-7 (Fed Rese|rve)<br>Model risk management: validation, documentation, ongoing monitori**n**g<br>Model Risk opinion pre-productio ; SageMaker Clarify (explainabil**i**t**y**); APE<br>Model Risk Opinions; Clar f report|
|BCBS 239|Data lineage, accuracy, completeness for risk data aggregatio**n**and reporting<br>AWS Glue Data Catalog li eage; RAG retrieval logs; agent decision audit t<br>Glue lineage reports; Data Mesh d|
|MiFID II|Art.27 (best execution), Suitability assessme**n**t for investment advice<br>Human-i -Loop mandatory for all wealth advice; MiFID II suitability rules in<br>A2I human review logs; Suitability|
|MAS TRM (Singap|ore)<br>Technology Risk Management — AI/ML model governance, cloud risk<br>APAC region isolation (ap-southeast-1); MAS-aligned model gov**e**rnance; l<br>MAS TRM self-assessm nt; Regio|

### APPENDIX B

## Glossary

Key terms — TOGAF 10, AI-DLC, AWS Agent Core, and regulatory

|**ADM**|Architecture Development Method — the iterative process at the core of TOGAF 10|
|---|---|
|**AI-DLC**|AI-Driven Development Lifecycle — AWS methodology (July 2025) positioning AI as<br>central collaborator in software development|
|**APEX**|AI Platform of Platforms — the NexaBank programme to build a shared AI agent<br>infrastructure on AWS Agent Core|
|**ARB**|Architecture Review Board — governance body that approves architecture decisions<br>and manages conformance|
|**AWS Agent Core**|AWS managed service suite including Bedrock Agents, Knowledge Bases, Guardrails,<br>and Flows for building AI agents|
|**Bolt**|AI-DLC term for a development cycle; equivalent to an Agile sprint but measured in<br>hours to days, not weeks|
|**DORA**|EU Digital Operational Resilience Act — regulation requiring ICT risk management,<br>incident reporting, and TLPT for financial entities|
|**Embedding**|Vector representation of text/data used in RAG systems; a first-class data entity in<br>AI-DLC architecture|
|**EU AI Act**|European AI regulation (enforcement 2025–2026) classifying AI systems by risk level<br>and mandating transparency, governance, and human oversight|
|**Guardrails**|AWS Bedrock feature providing content filtering, PII anonymisation, topic restrictions,<br>and grounding checks for AI agents|
|**Human Loop (A2I)**|AWS Augmented AI service for routing AI decisions to human reviewers when<br>confidence is low or policy thresholds are exceeded|
|**KB (Knowledge Base)**|AWS Bedrock managed RAG store: documents are chunked, embedded, and stored<br>in a vector database for agent retrieval|
|**Mob Construction**|AI-DLC ritual where the entire team works together in real-time with AI to build<br>solutions (replaces isolated coding)|
|**Mob Elaboration**|AI-DLC ritual where the team collaborates with AI to transform business intent into<br>requirements and architecture (replaces separate planning sessions)|
|**Pioneer Domain**|One of five NexaBank business domains selected as proof-of-value implementations<br>for the APEX platform|
|**Prompt Catalog**|Versioned library of prompt templates used by APEX agents; treated as a governed<br>data and code artefact|
|**RAG**|Retrieval-Augmented Generation — technique where AI retrieves relevant context<br>from a knowledge base before generating a response|
|**RAGAS**|Retrieval-Augmented Generation Assessment — evaluation framework for measuring<br>RAG pipeline quality (faithfulness, relevance, context recall)|

|**SAW**|Statement of Architecture Work — TOGAF document that formally initiates an<br>architecture project with scope, constraints, and sponsor approval|
|---|---|
|**SBB**|Solution Building Block — a specific implementation of an Architecture Building Block<br>(ABB); defines what will be built/bought/reused|
|**Semantic Context**|AI-DLC concept: rich, structured context provided to AI agents through steering files,<br>so they apply organisation-specific standards consistently|
|**TLPT**|Threat-Led Penetration Testing — DORA Art.26 obligation for major financial entities<br>to conduct adversarial testing of critical ICT systems|
|**Unit of Work**|AI-DLC equivalent of an Agile Epic; a significant deliverable decomposed into bolts;<br>typically days to weeks in duration|

### Document Control

|**Version**|**Date**|**Author**|**Change Summary**|**Approver**|
|---|---|---|---|---|
|1.0|2025-01-15|Enterprise Architect|Initial draft — Phases A–D|ARB|
|2.0|2025-03-01|Enterprise Architect|Full ADM coverage; Architecture Contracts added|Group CTO|
|3.0|2026-04-01|Enterprise Architect|AI-DLC impact analysis integrated across all phases; new|requirements ad<br>Group CTO|

TOGAF® is a registered trademark of The Open Group. AWS, Amazon Bedrock, Amazon Q Developer, and related marks are trademarks of Amazon Web Services Inc. EU AI Act, DORA, and GDPR are legislative instruments of the European Union. SR 11-7 is a supervisory letter of the US Federal Reserve. BCBS 239 is a principle of the Basel Committee on Banking Supervision. All product names, trademarks, and registered trademarks are property of their respective owners. This document is classified CONFIDENTIAL and is the property of NexaBank Global Enterprise Architecture. © 2026 NexaBank Global. All rights reserved.

TOGAF® is a registered trademark of The Open Group

EA-APEX-MASTER-001 | v3.0 | April 2026