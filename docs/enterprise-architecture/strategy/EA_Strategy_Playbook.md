---
title: "STRATEGY PLAYBOOK"
date_created: 2026-07-10
status: current
supersedes: "archive/enterprise-architecture/process/EA_Lifecycle_Checklist.md"
source_type: converted-pdf
source_file: "EA_Strategy_Playbook.pdf"
doc_type: guide
tags: ["enterprise-architecture", "governance", "raci"]
last_reviewed: 2026-07-17
covers_version: "N/A"
---
**Page 1**

# STRATEGY PLAYBOOK

## How EA Creates Strategy from Pitch to Retire

A step-by-step operational playbook defining the plays, RACI responsibilities, decision criteria, common pitfalls, and success patterns for each stage of the Enterprise Architecture lifecycle. Designed for EA practitioners, Solution Architects, and Architecture Review Boards.

Pitch → Approve → Design → Build → Operate → Review → Retire

May 2026

**EA Practice**

v1.0

**Page 2**

## How to Read This Playbook

Each stage contains: the strategic purpose of that phase, the key plays (actions the EA team must run), a scannable checklist of the individual sign-off items behind those plays, a RACI matrix clarifying who does what, typical pitfalls to avoid, and the specific gate criteria that must be satisfied before the next stage begins. Items marked with a checkbox glyph in the source PDF denote mandatory, must-complete actions; treat every checklist item as required unless the stage text says otherwise.

|**R — Responsible**|The person who does the work. There should be exactly one R per task.|
|---|---|
|**A — Accountable**|The person who is ultimately answerable. Signs off. One A per task.|
|**C — Consulted**|Subject matter experts who provide input. Two-way communication.|
|**I — Informed**|Stakeholders kept up to date. One-way communication only.|

**Page 3**

### Stage 1: Pitch / Demand

*The idea enters the funnel. EA shapes it before money is committed.* — Duration: 1–3 weeks

#### Strategic Purpose

At the Pitch stage, the EA's job is to prevent expensive mistakes before they happen. Most failed initiatives fail not in delivery but in framing. EA brings rigour to the idea by validating it against the current landscape, existing capabilities, and strategic priorities — transforming an informal request into a structured architecture intake that the governance process can act on.

#### The Key Plays

##### Play 1: Run the Landscape Assessment

I Pull the current application portfolio and search for existing capabilities that match the need

I Cross-reference the architecture roadmap for in-flight initiatives that could satisfy the request

I Identify integration touchpoints and data domain ownership relevant to the idea

I Document your findings in the Architecture Intake Assessment (AIA) — 1–2 pages max

##### Play 2: Frame the Build / Buy / Reuse Decision

I Define the three options explicitly: Build (custom dev), Buy (COTS/SaaS), Reuse (extend existing)

I Score each option on: strategic fit, cost, speed to value, risk, and technical alignment

I Make a provisional recommendation in the AIA — this will be validated at the ARB

I Flag any technology choices that are outside the approved technology radar

#### Checklist

**Business Alignment**
- Confirm the initiative has a named business sponsor with budget authority — *no sponsor, no progression; document name and role*
- Map the initiative to at least one active strategic theme or OKR — *themes: customer experience, operational resilience, innovation, cost efficiency*
- Document the business problem statement in one paragraph, reviewed and signed off by the sponsor
- Identify which business capabilities are impacted or created
- Assess urgency and strategic priority (High / Medium / Low)

**Landscape Assessment**
- Identify overlapping or redundant initiatives already in flight
- Check for active vendor contracts or licences that may already cover the need
- Document current-state architecture touchpoints (systems, integrations, data flows)

**Initial Risk & Compliance Scan**
- Flag any regulatory, data privacy, or sovereignty concerns (GDPR, HIPAA, etc.) — escalate to Legal/Compliance if raised
- Identify technology standards that will apply (security, cloud, integration, data)
- Check if the initiative touches Tier-1 or mission-critical systems — if yes, a resilience and DR review is mandatory at Design

#### RACI — Stage 1: Pitch

|**Task / Decision**|**Ent.**<br>**Architect**|**Sol.**<br>**Architect**|**ARB**|**Bus. Owner**|**Delivery**<br>**Lead**|
|---|---|---|---|---|---|
|Receive and log the intake request|**R**|**I**|**I**|**C**|**-**|
|Conduct landscape and portfolio<br>assessment|**R**|**C**|**I**|**I**|**-**|
|Frame build/buy/reuse options|**R**|**C**|**I**|**C**|**-**|
|Produce Architecture Intake Assessment|**R**|**C**|**I**|**A**|**-**|
|Approve AIA and recommend to ARB|**R**|**-**|**A**|**C**|**-**|

I Always check the vendor contract register before recommending a 'buy' — the organisation may already **PLAYBOOK** be paying for a licence that covers the need. **TIP**

I **WATCH OUT**

Watch out: Sponsors often arrive with a pre-chosen solution. Your job at Pitch is to validate the problem, not rubber-stamp the solution.

**Page 4**

I **GATE: Architecture Intake Gate**

Output: Signed Architecture Intake Assessment. Sponsor confirmed. Strategic theme mapped.

**Page 5**

### Stage 2: Approve / Govern

*ARB validates the business case and grants conditional investment approval.* — Duration: 1–2 weeks

#### Strategic Purpose

The Approve stage is the EA's most powerful governance lever. The ARB acts as the quality gate that prevents technical debt accumulation, architectural sprawl, and misaligned investment. The EA must ensure that every approval is conditional on standards compliance — not a rubber stamp based on business pressure.

#### The Key Plays

##### Play 3: Conduct the Architecture Standards Review

I Validate proposed technology stack against the Technology Radar (Adopt / Trial / Hold / Retire)

I Confirm integration approach: REST API, event-driven, batch, or point-to-point

I Verify cloud deployment model aligns with the Cloud Adoption Framework

I Confirm security architecture scope: zero trust posture, encryption, IAM approach

##### Play 4: Run the ARB and Issue the ADR

I Circulate ARB pack (AIA + options analysis + standards review) 5 business days in advance

I Present to ARB: problem, options, recommendation, conditions, risks

I Record ARB decision: Approve / Approve with Conditions / Defer / Reject

I Publish Architecture Decision Record (ADR) with rationale, constraints, and review date

I Assign named Solution Architect before closing the gate

#### Checklist

**Business Case Review**
- Confirm the business case includes quantified benefits with measurement methodology
- Review the options analysis: Build vs Buy vs Reuse vs Partner — EA must validate that all options were genuinely considered
- Validate TCO calculation covers a 3–5 year horizon including run costs
- Confirm ROI methodology and timeline are realistic — *formula: [(Financial Gain − Cost) / Cost] × 100; target > 15%*

**Architecture Standards Compliance**
- Confirm proposed integration approach aligns with enterprise integration patterns
- Validate data architecture approach against the enterprise data model
- Check cloud strategy alignment (public / private / hybrid / on-prem policy)
- Confirm security architecture requirements have been scoped

#### RACI — Stage 2: Approve

|**Task / Decision**|**Ent.**<br>**Architect**|**Sol.**<br>**Architect**|**ARB**|**Bus. Owner**|**Delivery**<br>**Lead**|
|---|---|---|---|---|---|
|Prepare ARB submission pack|**R**|**C**|**I**|**C**|**-**|
|Present to ARB|**R**|**C**|**A**|**I**|**-**|
|Record and publish ARB decision|**R**|**-**|**A**|**I**|**-**|
|Issue Architecture Decision Record|**R**|**-**|**A**|**I**|**-**|
|Assign Solution Architect|**A**|**R**|**I**|**I**|**-**|

I Conditions on ARB approvals must have named owners and resolution dates. A condition without an **PLAYBOOK** owner is not a condition — it is deferred risk. **TIP**

I **WATCH OUT**

Watch out: Business pressure to 'just approve it' is highest here. An EA who approves to avoid conflict is not doing their job.

**Page 6**

##### I **GATE: ARB Architecture Approval Gate**

Output: Signed ARB Decision Record. ADR published. Solution Architect assigned.

**Page 7**

### Stage 3: Design

*Target state architecture is defined. Delivery guardrails are established.* — Duration: 2–6 weeks

#### Strategic Purpose

Design is where abstraction becomes reality. The EA, working with the assigned Solution Architect, translates the approved concept into a technical blueprint that delivery teams can execute. The output must be precise enough to prevent drift, but flexible enough to allow good engineering decisions within guardrails.

#### The Key Plays

##### Play 5: Produce the Solution Architecture Document (SAD)

I Define system context (C4 Level 1): boundaries, actors, and external systems

I Define container/component diagrams for all new or significantly modified systems

I Document all integration contracts: API specs (OpenAPI), event schemas, data formats

I Map data flows and define data ownership, classification (PII/sensitive/public)

I Define all Non-Functional Requirements: availability, performance, scalability, RTO/RPO

##### Play 6: Publish the Architecture Guardrails Document

I List approved technology versions and permitted third-party libraries

I Define mandatory patterns: authentication, error handling, logging, API versioning

I Specify architecture compliance checkpoints within the delivery schedule

I Define architecture fitness functions where automated compliance checking applies

I Obtain peer review of SAD from at least one other EA before submission

#### Checklist

**Non-Functional Requirements (NFRs)**
- Define availability SLA (e.g. 99.9% uptime) and validate infrastructure supports it
- Define RTO (Recovery Time Objective) and RPO (Recovery Point Objective) — mandatory for any system touching Tier-1 capabilities
- Specify performance benchmarks (response time, throughput, concurrency)
- Define scalability model (horizontal / vertical / auto-scaling thresholds)
- Complete security architecture review: authentication, authorisation, encryption, audit — engage the CISO team for any internet-facing or data-sensitive components

#### RACI — Stage 3: Design

|**Task / Decision**|**Ent.**<br>**Architect**|**Sol.**<br>**Architect**|**ARB**|**Bus. Owner**|**Delivery**<br>**Lead**|
|---|---|---|---|---|---|
|Produce Solution Architecture Document|**C**|**R**|**I**|**I**|**I**|
|NFR definition and validation|**C**|**R**|**I**|**C**|**C**|
|Peer review of SAD|**R**|**A**|**I**|**I**|**-**|
|ARB review and SAD sign-off|**A**|**R**|**R**|**I**|**I**|
|Publish architecture guardrails|**A**|**R**|**I**|**I**|**C**|

I NFRs defined here are legally binding for the delivery team. If availability is set at 99.9%, the **PLAYBOOK** infrastructure must be designed and costed to deliver it. **TIP**

**Page 8**

I **WATCH** Watch out: SADs that are too prescriptive stifle good engineering. Define the what and the why — not **OUT** always the how.

##### I **GATE: Solution Architecture Sign-off Gate**

Output: Peer-reviewed SAD. ARB chair approved. Guardrails document published.

**Page 9**

### Stage 4: Build / Deliver

*Delivery teams build. EA governs compliance and manages architecture drift.* — Duration: varies (weeks to months)

#### Strategic Purpose

Build is where the EA transitions from author to guardian. The delivery team executes; the EA's role is to ensure what gets built matches what was approved — not by micromanaging engineers, but by running structured compliance touchpoints that catch drift early before it becomes expensive or irreversible.

#### The Key Plays

##### Play 7: Run the 30% and 70% Architecture Reviews

I At 30%: review structural decisions — are the right systems being built in the right way?

I At 70%: review implementation fidelity — is the SAD being followed? Are integrations compliant?

I Log all deviations from the SAD as formal architecture exceptions with justification

I Approve minor deviations; escalate significant ones to the ARB

##### Play 8: Run the Pre-Production Architecture Sign-Off

I Verify deployed architecture matches approved SAD — check for configuration drift

I Confirm NFR testing completed: load test results, failover test, DR drill

I Validate security controls: penetration test or DAST scan completed

I Confirm observability stack is live: logging, metrics, alerts, distributed tracing

I Update application portfolio inventory with production system details

#### Checklist

**Architecture Governance During Delivery**
- Log all architecture decisions made during build in the ADR register — include context, options considered, decision, and consequences
- Validate integration contracts (API specs, event schemas) against approved design

**Pre-Production Architecture Review**
- Confirm all NFRs have been tested: load testing, failover testing, DR drill
- Review deployment pipeline and rollback procedure — rollback must be tested, not assumed

#### RACI — Stage 4: Build

|**Task / Decision**|**Ent.**<br>**Architect**|**Sol.**<br>**Architect**|**ARB**|**Bus. Owner**|**Delivery**<br>**Lead**|
|---|---|---|---|---|---|
|Architecture review at 30% milestone|**A**|**R**|**I**|**I**|**C**|
|Architecture review at 70% milestone|**A**|**R**|**I**|**I**|**C**|
|Approve/escalate architecture exceptions|**R**|**C**|**A**|**I**|**I**|
|Pre-production compliance sign-off|**A**|**R**|**C**|**I**|**I**|
|Update application portfolio inventory|**A**|**R**|**I**|**I**|**C**|

I The 30% review is your most cost-effective intervention. Catching a structural mistake here saves 10x **PLAYBOOK** the cost of fixing it at 90%. **TIP**

I **WATCH OUT**

Watch out: 'We'll fix it post-launch' is the most common phrase that creates permanent technical debt. Hold the gate firmly.

**Page 10**

I **GATE: Architecture Compliance Gate (Pre-Production)**

Output: Signed compliance sign-off. NFR tests passed. Observability confirmed.

**Page 11**

### Stage 5: Operate / Run

*The asset is live. EA monitors portfolio health and manages standards compliance.* — Duration: ongoing (quarterly reviews)

#### Strategic Purpose

Operate is the longest and most underappreciated stage. Systems decay from the moment they go live — through technology obsolescence, integration drift, and accumulating exceptions. The EA's role is to maintain portfolio hygiene through regular, systematic monitoring that catches issues before they become crises.

#### The Key Plays

##### Play 9: Maintain the Application Portfolio

I Review portfolio metadata quarterly: ownership, criticality tier, data classification

I Track all technology end-of-life dates — flag any component within 18 months of EOL

I Monitor the architecture exceptions register — exceptions without resolution dates become permanent debt

I Maintain integration dependency map as systems evolve

##### Play 10: Run the Quarterly Compliance Review

I Review standards compliance dashboard: security patch levels, API versions, EOL components

I Review integration health metrics: error rates, latency trends, SLA performance

I Review active architecture exceptions: resolve, extend, or escalate each one

I Produce quarterly EA health summary for the CTO/CIO with RAG status per domain

#### Checklist

**Portfolio Registration & Baseline**
- Confirm system is registered in the application portfolio with full metadata
- Record business owner, technical owner, criticality tier, data classification — *Tier 1 = mission critical, Tier 2 = business important, Tier 3 = supporting*
- Record licence details, contract renewal dates, and vendor SLA terms
- Baseline the total cost of ownership (annual run cost) for benchmarking

**Ongoing Compliance Monitoring**
- Confirm system appears on the architecture standards compliance dashboard — track against security patches, EOL components, API version compliance
- Operational KPIs to track: EOL technology %, standards compliance %, integration error rate, system availability vs SLA

#### RACI — Stage 5: Operate

|**Task / Decision**|**Ent.**<br>**Architect**|**Sol.**<br>**Architect**|**ARB**|**Bus. Owner**|**Delivery**<br>**Lead**|
|---|---|---|---|---|---|
|Quarterly portfolio metadata review|**R**|**C**|**I**|**I**|**C**|
|Technology EOL monitoring and flagging|**R**|**I**|**I**|**I**|**C**|
|Architecture exceptions management|**A**|**C**|**I**|**I**|**R**|
|Quarterly compliance review report|**R**|**I**|**A**|**I**|**I**|
|Escalation of critical compliance failures|**R**|**I**|**A**|**C**|**I**|

I Set automated alerts for technology EOL dates at 24, 18, and 12 months. Manual tracking always **PLAYBOOK** misses items. **TIP**

I **WATCH** Watch out: 'Temporary' exceptions that are never resolved. Every exception must have a named owner **OUT** and a target resolution date.

**Page 12**

##### I **GATE: Annual Portfolio Health Review**

Output: Annual portfolio health report. All exceptions reviewed. EOL risks escalated.

**Page 13**

**6**

### Stage 6: Review / Optimise

*Annual rationalisation. Each asset is scored and a lifecycle disposition is made.* — Duration: annual cycle (4–6 weeks)

#### Strategic Purpose

Review is the EA's portfolio strategy engine. Application rationalisation is the primary EA operational metric. It prevents the portfolio from growing unchecked and creates the strategic intelligence needed to direct future investment. Every system must earn its place in the portfolio annually.

#### The Key Plays

##### Play 11: Run the Application Rationalisation Assessment

I Score each system on Business Value (1–5): usage, strategic fit, revenue impact, regulatory necessity

I Score each system on Technical Health (1–5): maintainability, security, support status, currency

I Plot on the EA Value/Health 2x2 matrix to determine quadrant

I Determine disposition: Retain / Invest / Migrate / Consolidate / Retire

I Validate disposition with the business owner before finalising

##### Play 12: Disposition Matrix — What Each Quadrant Means

I High Value + High Health = RETAIN — maintain current investment, monitor annually

I High Value + Low Health = INVEST — prioritise modernisation; technical debt is a business risk

I Low Value + High Health = CONSOLIDATE/MIGRATE — find a better home for the capability

I Low Value + Low Health = RETIRE — decommission; cost of ownership exceeds business return

#### Checklist

**Optimisation Actions — by disposition**
- If Retain: document a refresh roadmap for the next 12 months
- If Invest: initiate a new Pitch/Demand request for the enhancement — restart the lifecycle for it as a new initiative
- If Migrate: define target platform and migration timeline, accounting for data migration and user transition
- If Consolidate: identify the target system and a decommission plan for the survivor, managed as a formal project
- If Retire: proceed to Stage 7 (Retire / Decommission)

#### RACI — Stage 6: Review

|**Task / Decision**|**Ent.**<br>**Architect**|**Sol.**<br>**Architect**|**ARB**|**Bus. Owner**|**Delivery**<br>**Lead**|
|---|---|---|---|---|---|
|Application scoring (value + health)|**R**|**C**|**I**|**C**|**C**|
|2x2 matrix analysis and disposition|**R**|**C**|**I**|**C**|**-**|
|Business owner validation of disposition|**A**|**I**|**I**|**R**|**-**|
|Approve rationalisation decisions|**A**|**I**|**R**|**C**|**-**|
|Update roadmap with rationalisation<br>outputs|**R**|**I**|**I**|**I**|**-**|

I The business value score must be validated with the business owner. Technical health is EA's domain; **PLAYBOOK** business value is shared ownership. **TIP** I **WATCH** Watch out: Business owners will always score their system's value higher. Use usage data, integration **OUT** counts, and revenue attribution to anchor the conversation.

**Page 14**

##### I **GATE: Annual Rationalisation Decision Gate**

Output: Signed rationalisation decisions. Updated roadmap. Retire candidates identified.

**Page 15**

### Stage 7: Retire / Decommission

*Controlled shutdown. Dependencies resolved. Data migrated. Contracts closed.* — Duration: 3–12 months depending on complexity

#### Strategic Purpose

Retirement is the most underestimated stage in the lifecycle. Organisations often focus on building new capabilities while neglecting the controlled shutdown of old ones. Poor decommission practice creates orphaned integrations, data compliance risks, and zombie systems that keep drawing run cost long after they should have been switched off. The EA must treat every retirement as a formal project.

#### The Key Plays

##### Play 13: Dependency Resolution

I Produce the full dependency map: every upstream producer and downstream consumer

I Notify all dependent teams with minimum 90-day decommission notice

I Confirm every integration has a migration path — no orphaned consumers at switch-off

I Validate replacement system can handle the redirected load before cutover

##### Play 14: Data, Commercial & Portfolio Close-Out

I Define and execute data disposition: archive, migrate, or delete per regulatory requirements

I Confirm GDPR / legal hold requirements with Legal before any data deletion

I Issue formal contract termination notice to all vendors (check notice periods: 30–90 days)

I Decommission all infrastructure: servers, VMs, cloud resources, DNS, firewall rules

I Remove system from all access control lists, identity directories, and monitoring

I Archive all documentation (SAD, ADRs, runbooks) for minimum 7 years

I Remove from application portfolio. Update all architecture diagrams. Issue decommission certificate.

#### Checklist

**Dependency & Impact Analysis**
- Assess impact on business processes — obtain business sign-off on the transition plan

**Data & Knowledge Management**
- Define data retention policy: archive, migrate, or delete per regulatory requirements — GDPR / legal hold requirements must be validated with Legal before deletion
- Complete data migration to the target system and validate data integrity
- Transfer operational knowledge to the support team for any replacement system

**Commercial & Contractual Close-Out**
- Confirm licence termination date and notify vendor — check contract notice periods, typically 30–90 days
- Terminate SLAs and support contracts with confirmation from the vendor
- Recover and decommission all infrastructure (servers, VMs, cloud resources)
- Remove the system from all access control lists, firewalls, and identity directories — failure to remove access is a security and audit finding

**Final Sign-Off & Portfolio Close**
- Record lessons learned: what could have been retired sooner? what dependency issues arose? — feed insights back into the intake and rationalisation process
- Update the TCO reduction tracker — record the cost saving realised from decommission

#### RACI — Stage 7: Retire

|**Task / Decision**|**Ent.**<br>**Architect**|**Sol.**<br>**Architect**|**ARB**|**Bus. Owner**|**Delivery**<br>**Lead**|
|---|---|---|---|---|---|
|Produce full dependency map|**R**|**C**|**I**|**I**|**C**|
|Notify dependent teams (90-day notice)|**R**|**C**|**I**|**A**|**C**|
|Data disposition planning|**A**|**R**|**I**|**C**|**I**|
|Contract and vendor termination|**I**|**I**|**I**|**A**|**R**|
|Infrastructure decommission|**A**|**C**|**I**|**I**|**R**|
|Portfolio and documentation close-out|**R**|**C**|**A**|**I**|**I**|

**Page 16**

I Run a lessons-learned session after every major decommission. Insights on dependency discovery and **PLAYBOOK** data migration improve every future retirement. **TIP**

I **WATCH** Watch out: Access not removed is an immediate security and audit finding. Build access removal into **OUT** the decommission runbook as a mandatory last step.

I **GATE: Decommission Completion Gate**

Output: Decommission certificate signed by EA, Platform Owner, Legal, and Business Owner.