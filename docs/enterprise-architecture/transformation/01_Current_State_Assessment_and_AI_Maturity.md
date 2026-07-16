---
title: "Current-State Assessment & AI Maturity"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "01_Current_State_Assessment_and_AI_Maturity.pdf"
doc_type: guide
tags: ["enterprise-architecture"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
AI-FIRST ENTERPRISE TRANSFORMATION  |  CONSULTING ENGAGEMENT

# Current-State Assessment & AI Maturity

Where the enterprise stands, and what actually blocks it

### Contents of this deliverable

- Assessment approach and evidence base

- Enterprise assessment across 13 dimensions

- AI maturity assessment (5-level model)

- Business capability heat map

- Hidden bottlenecks, organizational debt, and systemic constraints

Deliverable 01  |  July 2026  |  Draft for discussion Illustrative engagement package. Assumptions stated in Deliverable 00 apply throughout.

Current-State Assessment   & AI Maturity

AI-First Enterprise Transformation

## 1. Assessment Approach

In a live engagement this assessment draws on 40-60 stakeholder interviews, architecture and data-estate reviews, spend analysis, a skills inventory, and a scan of in-flight AI initiatives. The reference findings below reflect the modal pattern we observe in enterprises of this profile; each cell should be validated in a 4-6 week discovery sprint, which is the first roadmap activity.

## 2. Thirteen-Dimension Enterprise Assessment

|**Dimension**|**Current-state finding (reference)**|**Rating**|
|---|---|---|
|Business model|Value creation still assumes human-throughput economics; pricing and cost<br>models not yet stress-tested against AI-native entrants|Amber|
|Industry dynamics|AI adoption accelerating across the sector; 12-24 month window before capability<br>gaps become visible in margins and NPS|Amber|
|Competitive<br>landscape|Peers announcing AI programs; differentiation still available in proprietary-data<br>domains; AI-native startups attacking narrow slices|Amber|
|Digital maturity|Customer channels partially digitized; core transactions modernized unevenly;<br>batch integration prevalent|Amber|
|AI maturity|Level 2 of 5 (Experimenting) - pilots without platform, governance, or benefits<br>tracking|Red|
|Technology<br>landscape|Hybrid estate; 30-40% of app portfolio legacy; API coverage partial; duplicate<br>capabilities across units|Amber|
|Data maturity|Fragmented ownership; inconsistent quality; no semantic layer; unstructured<br>knowledge (documents, tickets, calls) largely dark|Red|
|Organizational<br>structure|Functional silos; AI accountability diffuse across IT, digital, and analytics; no<br>single leader owns outcomes|Red|
|Engineering maturity|CI/CD adopted in pockets; platform engineering nascent; MLOps/LLMOps absent;<br>evaluation ad hoc|Amber|
|Security posture|Solid perimeter and endpoint controls; no controls designed for non-human agent<br>identity, prompt injection, or model abuse|Amber|
|Regulatory<br>constraints|Privacy regimes (GDPR/CCPA-class) apply; EU AI Act obligations phasing in for<br>deployers; sector rules on automated decisions|Amber|
|Vendor ecosystem|Multiple overlapping AI vendor pilots; no evaluation framework; contract terms<br>silent on data use for training and IP indemnity|Red|
|Culture & change<br>readiness|High curiosity, high anxiety; middle management unequipped to redesign work;<br>prior transformation fatigue|Amber|

Rating scale: Green = strength to build on; Amber = gap that constrains scale; Red = blocking issue requiring Horizon 1 remediation.

## 3. AI Maturity Assessment

Draft for discussion - illustrative

Deliverable 01  |  Page 1

Current-State Assessment   & AI Maturity

AI-First Enterprise Transformation

|**Level**|**Description**|**Markers**|
|---|---|---|
|1. Aware|Leadership discusses AI; no structured activity|Slideware, vendor demos|
|2. Experimenting<br>**(current)**|Disconnected pilots; individual productivity<br>tools; no platform or governance|25-40 uncoordinated initiatives; shadow AI; no<br>audited benefits|
|3. Operationalizing<br>**(target month 12)**|Shared platform; governance live; first use<br>cases in production with measured value|Lighthouses in production; risk tiering enforced;<br>FinOps for tokens|
|4. Scaling**(target month**<br>**24)**|Portfolio managed as products; agentic<br>workflows in bounded domains; data flywheel<br>turning|Double-digit production use cases; agent<br>registry; benefits in P&L;|
|5. AI-Native**(target**<br>**month 36)**|AI-first process design is default; autonomous<br>operations in selected domains; AI embedded<br>in products|Human-plus-agent workforce norm; continuous<br>evaluation culture|

The distance from Level 2 to Level 4 is primarily organizational, not technical: the same 18-month journey fails in enterprises that treat it as an IT program and succeeds where a business-accountable leader owns it.

## 4. Business Capability Heat Map

Capabilities are scored on two axes: **AI leverage potential** (how much AI could improve the capability) and **current readiness** (data, process stability, and talent to absorb it). The gap between the two defines the transformation agenda.

|**Business capability**|**AI leverage potential**|**Current readiness**|**Heat**|
|---|---|---|---|
|Customer service & support|Very high|Medium (interaction data exists,<br>fragmented KB)|HOT - lighthouse<br>candidate|
|Software engineering|Very high|High (code is well-structured data;<br>tooling mature)|HOT - lighthouse<br>candidate|
|Sales & pipeline management|High|Medium (CRM hygiene issues)|HOT|
|Marketing & content|High|Medium-high|HOT|
|Finance (close, FP&A;, AP/AR)|High|Medium (structured data strong,<br>process variation high)|WARM|
|Knowledge management|Very high|Low (dark unstructured data)|WARM - foundational, fix<br>in H1|
|Supply chain & operations|High|Low-medium (sensor/ERP data<br>gaps)|WARM|
|HR & talent|Medium-high|Medium; elevated regulatory<br>sensitivity (automated employment<br>decisions)|WARM - govern first|
|Legal & compliance|Medium-high|Medium; privilege and confidentiality<br>constraints|WARM|
|Procurement|Medium-high|Medium|WARM|
|IT operations & cybersecurity|High|Medium-high (rich telemetry)|HOT|
|Risk & compliance monitoring|High|Medium|WARM|

Draft for discussion - illustrative

Deliverable 01  |  Page 2

Current-State Assessment   & AI Maturity

AI-First Enterprise Transformation

|**Business capability**|**AI leverage potential**|**Current readiness**|**Heat**|
|---|---|---|---|
|Executive decision support|High|Low (no semantic layer; metric|COOL until data layer|
|||definitions inconsistent)|exists|

## 5. Hidden Bottlenecks and Organizational Debt

### Systemic constraints that will silently cap the program

- **Metric anarchy.** Core business terms (customer, churn, margin) defined differently across units. Any AI system built on inconsistent semantics automates the inconsistency. Remediation: semantic layer as a Horizon 1 deliverable.

- **Project-based funding.** Annual capex cycles kill iterative AI products, which need continuous funding against outcome metrics. Remediation: product-based funding for the AI portfolio (Deliverable 05).

- **Middle-management incentive gap.** Managers are measured on throughput of current processes, not on redesigning them. AI adoption stalls exactly at this layer. Remediation: redesign incentives and give managers first access to tools.

- **Risk processes built for deterministic software.** Change advisory boards and testing regimes assume reproducible outputs. Probabilistic systems need evaluation-based assurance instead. Remediation: risk-tiered AI assurance (Deliverable 04).

- **Expertise walking out the door.** Institutional knowledge lives in the heads of a retiring cohort and in unsearchable documents. Every year of delay in knowledge capture is unrecoverable. Remediation: knowledge engineering program (Deliverable 03).

- **Vendor lock-in by inattention.** Pilots are quietly hard-coding single-vendor dependencies without exit provisions. Remediation: model-agnostic gateway and contract standards (Deliverables 03 and 04).

Draft for discussion - illustrative

Deliverable 01  |  Page 3
