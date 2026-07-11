---
title: "Module 13 — Case Studies: AI Transformation Across Six Industries"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-13-case-studies"]
doc_type: multi-part-series
series_name: EA Masterclass
series_part: 13
series_total: 15
series_index: ../index.md
---

# Module 13 — Case Studies: AI Transformation Across Six Industries

!!! abstract "Module Purpose"
    Module 13 moves from theory to practice. Each case study in this module reconstructs a real-world Enterprise Architecture engagement — from the initial business problem through executive approval, implementation, and post-deployment measurement. Reading these cases will sharpen your ability to recognize AI opportunity patterns, structure investment proposals, and anticipate governance friction before it derails a program.

---

## How to Use These Case Studies

These case studies are not passive reading material. They are structured learning instruments designed to be worked through in a specific way.

### The Active Reading Method

**Before you read each case**, spend five minutes writing down your own hypothesis: given the industry and use case title, what do you think the main architectural challenges will be? What governance hurdles would you anticipate? What would the investment justification look like? Committing your own predictions before reading activates the prior knowledge you already hold and creates productive tension when the case reveals something you did not expect.

**As you read**, pay close attention to the moments where the EA team's initial plan diverged from reality — the integration that took longer than estimated, the regulator who raised a concern that was not in the original risk register, the business sponsor who changed priorities mid-program. These inflection points carry more instructional value than the parts of the story that went according to plan.

**After you read**, work through the reflection questions at the end of each case before consulting the key takeaways section. The questions are designed so that there is no single correct answer — they surface the judgment calls that distinguish senior architects from junior ones.

**Use the comparison table below** to place each case in context relative to the others. Common threads across multiple industries signal universal EA principles. Differences signal where industry-specific constraints dominate.

### Study Group Facilitation

If you are working through Module 13 in a cohort or study group, assign one case per participant as a "primary" and rotate facilitation. The facilitator presents the case in fifteen minutes focusing on the 12-step structure, then the group debates: would you have made the same architectural choices? What would you have done differently in the executive proposal? The most productive debates tend to emerge around investment justification assumptions and governance sequencing.

---

## The Six Industries at a Glance

### 1. Global Banking — AI-Powered Loan Origination

A tier-1 global bank with $800 billion in assets, operating across 40 countries, was losing commercial banking customers to fintech lenders at an alarming rate. The core problem was cycle time: commercial loan origination averaged 18 days end-to-end, while fintech competitors were closing comparable facilities in under 2 days. The EA team identified intelligent document processing and AI-assisted credit decision support as the architectural intervention most likely to compress that cycle time while preserving the regulatory compliance posture required under Basel III, DORA, and the Federal Reserve's SR 11-7 model risk guidance. The case traces a $12 million, 3-year investment from initial opportunity identification through a contested Investment Committee approval to a phased rollout that ultimately reduced origination time to 4 days — one day longer than the original target, for reasons that constitute one of the case's most instructive lessons.

### 2. Healthcare Network — AI Clinical Documentation

An 85-hospital network with 120,000 staff was spending $180 million annually on clinical documentation. Physicians averaged more than three hours per day on administrative tasks, driving a 34% burnout rate and an 8% annual physician attrition rate — each departure costing approximately $480,000 in recruitment and onboarding. The EA team proposed an ambient AI clinical documentation platform: an AI layer that listens to patient-physician conversations, auto-generates structured clinical notes, suggests ICD-10 and CPT codes, and routes notes to physicians for a rapid approval workflow rather than manual creation. The case examines how the team navigated skepticism from the Chief Medical Officer, secured FDA SaMD classification guidance, integrated with an existing Epic EHR deployment, and ultimately exceeded their documentation reduction target — achieving 52% reduction against a 47% target.

### 3. Global Retailer — AI Demand Forecasting and Inventory Optimization

A top-10 global retailer operating 4,200 stores across 28 countries was carrying $2.1 billion in excess inventory while simultaneously experiencing a 12% out-of-stock rate on high-velocity SKUs. The two problems were connected: centralized demand forecasting models built on 18-month lag data could not capture local demand signals, promotional spikes, or weather-driven consumption patterns. The EA team designed a federated ML demand forecasting architecture that pushed model inference to regional nodes, integrated real-time POS signals, and surfaced replenishment recommendations to store operations teams through a redesigned supply chain command center. The case is particularly instructive on the organizational change management dimension — the store operations workforce resisted AI-generated replenishment recommendations until the team redesigned the human-in-the-loop workflow to give store managers override authority with mandatory feedback capture.

### 4. National Telecommunications Provider — Network Anomaly Detection

A national telecommunications provider carrying 4.2 petabytes of data per day across a hybrid fiber-5G network was experiencing $67 million annually in customer churn attributable to network reliability incidents. The NOC (Network Operations Center) was drowning in alert noise — 2.3 million alerts per month of which fewer than 0.4% required human action — but lacked the AI-assisted triage capability to distinguish signal from noise before customer-impacting incidents escalated. The EA team designed a streaming ML anomaly detection platform that correlated telemetry from 240,000 network nodes in near real-time, predicted degradation cascades 45 minutes before customer impact, and routed prioritized incidents to the right NOC tier automatically. The case examines the architectural decision to build on a cloud-native event streaming backbone rather than extending the existing on-premises ITSM platform — a decision that generated significant debate with the incumbent vendor.

### 5. Government Tax Authority — AI-Assisted Audit Selection

A national tax authority processing 48 million returns annually was operating audit selection models that were 14 years old and built on rule-based heuristics. The existing models had a 23% audit yield rate — meaning 77% of selected audits produced no additional tax recovery, wasting investigator capacity and creating taxpayer harm. The EA team proposed a machine learning audit risk scoring platform that would improve audit yield to above 55% while simultaneously satisfying requirements under administrative law for explainable decisions, data minimization principles under the national privacy framework, and algorithmic accountability requirements that had recently been legislated. The case is the module's deepest treatment of responsible AI governance in a public-sector context, and the only case where the governance process added more than 6 months to the program timeline.

### 6. Energy and Utilities — Predictive Maintenance for Grid Infrastructure

A vertically integrated energy utility operating 18,000 kilometers of transmission infrastructure was responding reactively to equipment failures that caused 340 unplanned outages per year, averaging $2.3 million per outage in direct costs plus regulatory fines. Maintenance was scheduled on fixed calendar cycles regardless of equipment condition, meaning healthy equipment was serviced unnecessarily while degrading equipment was sometimes missed between cycles. The EA team designed a predictive maintenance platform ingesting sensor telemetry from 42,000 grid assets — transformers, switchgear, circuit breakers, protection relays — to generate equipment health scores and prioritize maintenance dispatch dynamically. The case includes the module's most detailed treatment of IoT architecture patterns, edge computing for sensor data processing, and the integration of AI-generated maintenance recommendations into an enterprise asset management system.

---

## Industry Comparison Table

| Industry | Use Case | Investment | Payback Period | Key Outcome |
| --- | --- | --- | --- | --- |
| Global Banking | AI-powered commercial loan origination | $12M / 3 years | 28 months | Origination reduced from 18 days to 4 days; $28M retained revenue Year 1 |
| Healthcare | Ambient AI clinical documentation | $8.5M / 2 years | 22 months | 52% documentation time reduction; physician NPS from 23 to 61 |
| Global Retail | Federated ML demand forecasting | $15M / 3 years | 31 months | Inventory carrying cost down 18%; out-of-stock rate down from 12% to 4.2% |
| Telecommunications | Streaming ML network anomaly detection | $9M / 2.5 years | 19 months | Alert noise reduced 94%; churn from reliability incidents down 41% |
| Government Tax | ML audit risk scoring | $6.5M / 3 years | 38 months | Audit yield rate from 23% to 58%; investigator capacity recovered 34% |
| Energy and Utilities | AI predictive maintenance | $11M / 3 years | 26 months | Unplanned outages down 68%; maintenance cost per asset down 22% |

---

## The 12-Step Engagement Pattern

Every case study in Module 13 follows the same 12-step structure. This is not arbitrary — it mirrors the engagement pattern used by EA teams at large enterprises to take an AI initiative from initial identification through realized value. Understanding the pattern before you read the cases will help you navigate them efficiently and recognize where each case deviates from the template (and why).

```
 STEP 1          STEP 2          STEP 3          STEP 4
 Organization    Business        AI Opportunity  Current-State
 Background  --> Problem     --> Identification --> Architecture
                                                        |
                                                        v
 STEP 8          STEP 7          STEP 6          STEP 5
 Implementation  Executive   <-- Investment  <-- Future-State
 Roadmap     <-- Proposal       Justification    Architecture
     |
     v
 STEP 9          STEP 10         STEP 11         STEP 12
 Governance  --> Realized    --> Lessons     --> Key
 Framework       Value           Learned         Takeaways
```

### Step 1: Organization Background

Establishes the scale, geography, regulatory environment, and competitive context of the organization. This step matters because AI investments are never context-free — an architecture that is appropriate for a lightly regulated mid-market firm may be entirely inappropriate for a systemically important financial institution. Read this section to calibrate the constraints that will shape every subsequent decision.

### Step 2: Business Problem

States the problem in business terms, not technology terms. Enterprise architects who lead with technology solutions before establishing business problems lose credibility with executives quickly. The business problem section quantifies the pain — in revenue, cost, customer experience, or risk terms — and establishes why solving it is urgent.

### Step 3: AI Opportunity Identification

Explains how the EA team identified the specific AI intervention from a broader problem space, what alternative solutions were considered, and why AI was selected over alternatives such as process reengineering, outsourcing, or conventional software. This step models the structured opportunity identification discipline that separates strategic architecture from technology procurement.

### Step 4: Current-State Architecture

Documents the as-is architecture at the level of detail required to understand what the AI platform must integrate with, replace, or work around. Includes system ages, integration patterns, data quality issues, and organizational structures that the architecture must accommodate.

### Step 5: Future-State Architecture

Describes the target architecture in sufficient detail for technical review. Each case includes an ASCII architecture diagram showing the key components, integration points, and data flows. The future-state section also flags architectural risks — components that are technically feasible but carry delivery uncertainty.

### Step 6: Investment Justification

Presents the financial model: cost breakdown, benefit quantification, NPV calculation, payback period, and ROI. Each case makes its assumptions explicit so you can evaluate whether the model is credible. Investment justification is where EA engagements most often go wrong — either through overstating benefits to win approval (setting up for post-implementation disappointment) or through under-documenting assumptions (making the model impossible to defend under challenge).

### Step 7: Executive Proposal

Recounts how the investment case was packaged and presented to executive decision-makers. This step is deliberately narrative — it captures the dynamics of a real approval process: who challenged the proposal, on what grounds, and how the EA team responded. Real approval processes are not passive presentations; they are negotiations.

### Step 8: Implementation Roadmap

Breaks the program into phases with milestones, dependencies, and resource requirements. Each roadmap is structured so that Phase 1 delivers a measurable outcome independently — this is architectural discipline, not project management preference. Programs that do not deliver value until Phase 3 rarely survive organizational change.

### Step 9: Governance Framework

Identifies the governance bodies, regulatory requirements, and internal review processes that the AI initiative must satisfy. AI governance is increasingly non-trivial: model risk management, explainability requirements, privacy impact assessments, algorithmic accountability, and responsible AI review boards are now standard friction points in enterprise AI programs. This step shows how governance is engaged as an enabler rather than managed as an obstacle.

### Step 10: Realized Business Value

Reports what actually happened after implementation — the outcomes measured against the targets established in Step 6. No case in this module hits every target exactly. The gaps between planned and realized value are as instructive as the successes.

### Step 11: Lessons Learned

Presents five specific, non-generic lessons from each engagement. These are the findings that experienced architects accumulate over years of delivery — observations about what the standard frameworks do not tell you about AI programs in complex enterprises.

### Step 12: Key Takeaways for Enterprise Architects

Synthesizes the most transferable insights from each case — the principles that apply beyond the specific industry and use case to EA practice more broadly.

---

## Case Study Navigation

| Case Study | Industry | Primary AI Capability | Complexity |
| --- | --- | --- | --- |
| [Global Bank — AI Loan Origination](global-bank.md) | Financial Services | Document AI + ML credit scoring | High |
| [Healthcare Network — Clinical Documentation](healthcare.md) | Healthcare | Ambient AI + NLP + FHIR integration | High |
| [Global Retailer — Demand Forecasting](retail.md) | Retail | Federated ML + real-time POS integration | Medium-High |
| [National Telco — Network Anomaly Detection](telecom.md) | Telecommunications | Streaming ML + event processing | High |
| [Tax Authority — Audit Risk Scoring](government.md) | Public Sector | Explainable ML + algorithmic accountability | Very High |
| Energy Utility — Predictive Maintenance | Energy and Utilities | IoT + edge ML + EAM integration | Medium-High |

---

!!! tip "Recommended Reading Sequence"
    If this is your first pass through Module 13, read the **Global Bank** case first — it is the most structurally complete and introduces investment justification mechanics in the most detail. Follow with **Healthcare**, which provides the deepest treatment of AI governance in a regulated environment. The remaining four cases can be read in any order, though reading **Government Tax** last is recommended as it contains the module's most advanced governance content and benefits from the foundation established by the earlier cases.

!!! note "Cross-Module Connections"
    The architecture patterns in these cases draw on concepts introduced in earlier modules. Document AI pipelines (Global Bank) connect to Module 7's treatment of unstructured data integration. The federated ML architecture (Global Retailer) connects to Module 9's edge and distributed compute patterns. The explainability controls (Banking, Government) connect to Module 11's responsible AI governance framework.
