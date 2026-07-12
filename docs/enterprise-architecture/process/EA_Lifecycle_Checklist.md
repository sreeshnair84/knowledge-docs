---
title: "LIFECYCLE CHECKLIST"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "EA_Lifecycle_Checklist.pdf"
doc_type: guide
tags: ["enterprise-architecture"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
**Page 1**

# LIFECYCLE CHECKLIST
Pitch → Approve → Design → Build → Operate → Review → Retire

A comprehensive gate-by-gate checklist for Enterprise Architects managing initiatives from idea inception through to full decommission. Use this document alongside your Architecture Review Board process and governance framework.

**PITCH**

**APPROVE**

**DESIGN**

**BUILD**

**OPERATE REVIEW RETIRE**

May 2026

**Enterprise Architecture Practice**

Version 1.0

**Page 2**

## **How to Use This Checklist**

This checklist is organised into seven lifecycle stages. Each stage contains grouped checklist items with ownership and gate criteria. Work through each stage sequentially. No stage should be considered complete until all mandatory items are checked. Items marked with I are high-risk gate items that require explicit ARB sign-off before proceeding.

|ICheckbox|Mandatory action item — must be completed|
|---|---|
|IAmber flag|High-risk item — requires ARB or governance approval|
|**Gate:**|Decision checkpoint — initiative cannot proceed without passing|
|**Owner:**|Primary responsible role for this stage's checklist|

**Page 3**

### **Stage 1: Pitch / Demand**

Gate: Architecture Intake Gate Owner: Enterprise Architect + Business Sponsor

*The initiative enters the funnel. EA evaluates fit before resources are committed.*

#### **Business Alignment**

I Confirm the initiative has a named business sponsor with budget authority *No sponsor = no progression. Document name and role.* I Map the initiative to at least one active strategic theme or OKR *Themes: customer experience, operational resilience, innovation, cost efficiency.* I Document the business problem statement in one paragraph *Problem statement must be reviewed and signed off by the sponsor.*

I Identify which business capabilities are impacted or created *Reference the enterprise capability map for current-state comparison.* I Assess urgency and strategic priority (High / Medium / Low) **Landscape Assessment**

I Search the application portfolio for existing capabilities that could satisfy the need *Build, buy, or reuse decision starts here.* I Identify overlapping or redundant initiatives already in flight *Check the architecture roadmap and active project register.* I Check for active vendor contracts or licences that may already cover the need *Engage procurement and vendor management teams.* I Document current-state architecture touchpoints (systems, integrations, data flows) **Initial Risk & Compliance Scan**

I Flag any regulatory, data privacy, or sovereignty concerns (GDPR, HIPAA, etc.) *Escalate to Legal/Compliance if any flags are raised.* I Identify technology standards that will apply (security, cloud, integration, data) I Check if the initiative touches Tier-1 or mission-critical systems *If yes, mandatory resilience and DR review required in Design stage.*

I *Gate Check: EA must produce an Architecture Intake Assessment before the business case proceeds to investment committee.*

**Page 4**

### **Stage 2: Approve / Govern**

Gate: ARB Architecture Approval Gate Owner: Architecture Review Board (ARB)

*Architecture Review Board assesses the business case and grants conditional approval.*

#### **Business Case Review**

- I Confirm the business case includes quantified benefits with measurement methodology

- I Review the options analysis: Build vs Buy vs Reuse vs Partner

*EA must validate that all options were genuinely considered.*

- I Validate TCO calculation covers 3–5 year horizon including run costs

- I Confirm ROI methodology and timeline are realistic

*Formula: [(Financial Gain - Cost) / Cost] x 100. Target > 15%.*

#### **Architecture Standards Compliance**

I Verify proposed technology stack is on the approved technology radar *Reject or escalate any technology not on the approved / trial list.*

- I Confirm proposed integration approach aligns with enterprise integration patterns

- I Validate data architecture approach against the enterprise data model

- I Check cloud strategy alignment (public / private / hybrid / on-prem policy) *Reference the cloud adoption framework for the approved deployment model.*

- I Confirm security architecture requirements have been scoped

#### **Governance & ARB Decision**

- I Schedule formal ARB presentation and circulate materials 5 business days in advance

- I ARB records decision: Approve / Approve with Conditions / Defer / Reject *All conditions must be documented with owners and resolution dates.*

- I Issue Architecture Decision Record (ADR) capturing rationale and constraints

- I Assign a named Solution Architect to the initiative

*SA must be confirmed before Design stage commences.*

I *Gate Check: Signed ARB decision record required. Conditional approvals must list specific conditions that trigger re-review.*

**Page 5**

### **Stage 3: Design**

Gate: Solution Architecture Sign-off Gate Owner: Solution Architect + EA

*Target state architecture is defined. Guardrails are set for the delivery team.*

#### **Solution Architecture Documentation**

- I Produce Solution Architecture Document (SAD) covering functional and non-functional requirements

- I Create context diagram (C4 Level 1) showing system boundaries and external actors *Use C4 Model or ArchiMate notation per enterprise standards.*

- I Produce container/component diagrams for new or significantly modified systems

- I Document all integration points with sequence diagrams or API contracts

- I Define data flows and data ownership including PII / sensitive data classification

#### **Non-Functional Requirements (NFRs)**

- I Define availability SLA (e.g. 99.9% uptime) and validate infrastructure supports it

- I Define RTO (Recovery Time Objective) and RPO (Recovery Point Objective) *Mandatory for any system touching Tier-1 capabilities.*

- I Specify performance benchmarks (response time, throughput, concurrency)

- I Define scalability model (horizontal / vertical / auto-scaling thresholds) I Complete security architecture review: authentication, authorisation, encryption, audit *Engage CISO team for any internet-facing or data-sensitive components.*

- **Delivery Guardrails**

- I Publish architecture guardrails document for the delivery team

- I Define architecture compliance checkpoints within the delivery schedule I Agree on architecture fitness functions / automated compliance checks if applicable I Document approved technology versions and approved third-party dependencies

I *Gate Check: SAD must be peer-reviewed by at least one other EA and approved by the ARB chair before build commences.*

**Page 6**

### **Stage 4: Build / Deliver**

Gate: Architecture Compliance Gate (Pre-Production) Owner: Solution Architect

*Delivery teams implement. EA governs compliance and manages architecture drift.*

#### **Architecture Governance During Delivery**

- I Conduct architecture review at 30% and 70% delivery milestones *30% review catches structural issues before they are expensive to fix.*

- I Review and approve any proposed deviations from the approved SAD

- I Log all architecture decisions made during build in the ADR register *Include context, options considered, decision, and consequences.*

- I Validate integration contracts (API specs, event schemas) against approved design

#### **Pre-Production Architecture Review**

- I Verify deployed architecture matches approved SAD — check for drift

*Use infrastructure-as-code scanning or architecture fitness functions.*

- I Confirm all NFRs have been tested: load testing, failover testing, DR drill I Validate security controls are implemented: pen test or security scan completed I Confirm observability is in place: logging, monitoring, alerting, tracing I Review deployment pipeline and rollback procedure *Rollback must be tested, not assumed.*

- I Update the application portfolio inventory with new system details

I *Gate Check: Signed architecture compliance sign-off required before production go-live. No exceptions.*

**Page 7**

### **Stage 5: Operate / Run**

Gate: Annual Portfolio Health Review Owner: EA + Platform / Operations Owner

*The asset is in production. EA monitors portfolio health and manages standards drift.*

#### **Portfolio Registration & Baseline**

- I Confirm system is registered in the application portfolio with full metadata

- I Record: business owner, technical owner, criticality tier, data classification

  - *Tier 1 = mission critical. Tier 2 = business important. Tier 3 = supporting.*

- I Document all integration dependencies (upstream and downstream systems)

- I Record licence details, contract renewal dates, and vendor SLA terms

- I Baseline the total cost of ownership (annual run cost) for benchmarking

#### **Ongoing Compliance Monitoring**

- I Confirm system appears on the architecture standards compliance dashboard

  - *Track against: security patches, EOL components, API version compliance.*

- I Monitor for technology end-of-life dates (OS, middleware, framework versions)

- I Review integration health metrics quarterly (error rates, latency, availability)

- I Flag any architecture exceptions granted — review annually for resolution

*Permanent exceptions become technical debt — track in the debt register.*

I *Operational KPIs to track: EOL technology %, standards compliance %, integration error rate, system availability vs SLA.*

**Page 8**

### **Stage 6: Review / Optimise**

Gate: Annual Rationalisation Decision Gate Owner: Enterprise Architect + Business Owner

*Annual rationalisation assessment. Every asset is scored and a lifecycle decision is made.*

#### **Application Rationalisation Assessment**

- I Score the asset on Business Value (1–5) and Technical Health (1–5)

*Business Value: usage, strategic alignment, revenue impact, regulatory necessity.*

- I Score Technical Health: currency, maintainability, security posture, support status

  - *Plot on the EA value/health matrix to determine disposition.*

- I Determine disposition: Retain / Invest / Migrate / Consolidate / Retire

- I Validate decision with business owner

*Business must agree with the technical health assessment.*

#### **Optimisation Actions**

- I If Retain: document refresh roadmap for next 12 months

- I If Invest: initiate a new Pitch/Demand request for the enhancement

  - *Restart the lifecycle for the enhancement as a new initiative.*

- I If Migrate: define target platform and migration timeline

*Migration timeline must account for data migration and user transition.*

- I If Consolidate: identify the target system and decommission plan for the survivor *Consolidation must be managed as a formal project.*

- I If Retire: proceed to Stage 7 (Retire / Decommission)

I *Gate Check: Rationalisation decisions must be approved by the EA Practice Lead and business owner before action is taken.*

**Page 9**

### **Stage 7: Retire / Decommission**

Gate: Decommission Completion Gate Owner: EA + Platform Owner + Legal

*Controlled shutdown of the asset. Dependencies resolved. Contracts terminated. Data migrated.*

#### **Dependency & Impact Analysis**

- I Produce full dependency map: all upstream and downstream consumers of this system *Use the integration register and run discovery tooling to confirm completeness.*

- I Notify all dependent system owners with minimum 90-day decommission notice

- I Confirm all integrations have a migration path to an alternative system *No integration should be left orphaned.*

- I Assess impact on business processes — obtain business sign-off on transition plan

#### **Data & Knowledge Management**

- I Define data retention policy: archive, migrate, or delete per regulatory requirements *GDPR / legal hold requirements must be validated with Legal before deletion.*

- I Complete data migration to target system and validate data integrity

- I Archive all system documentation: SAD, ADRs, runbooks, test results *Archive period typically 7 years for regulated industries.*

- I Transfer operational knowledge to the support team for any replacement system

#### **Commercial & Contractual Close-Out**

- I Confirm licence termination date and notify vendor

*Check contract notice periods — typically 30–90 days.*

- I Terminate SLAs and support contracts with confirmation from vendor

- I Recover and decommission all infrastructure (servers, VMs, cloud resources)

- I Remove system from all access control lists, firewalls, and identity directories *Failure to remove access is a security and audit finding.*

#### **Final Sign-Off & Portfolio Close**

- I Remove system from the active application portfolio inventory

- I Update all architecture diagrams and roadmaps to reflect decommission

- I Issue decommission confirmation to ARB and business owner

- I Record lessons learned: what could have been retired sooner? what dependency issues arose?

*Feed insights back into the intake and rationalisation process.*

- I Update TCO reduction tracker — record cost saving realised from decommission

I *Gate Check: Decommission completion certificate required. Signed by EA, Platform Owner, Legal, and Business Owner.*
