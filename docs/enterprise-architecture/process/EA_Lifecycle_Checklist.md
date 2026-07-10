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
last_reviewed: 2026-07-10
---

**Page 1** 

##### **ENTERPRISE ARCHITECTURE** 

# **LIFECYCLE CHECKLIST** 

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

_The initiative enters the funnel. EA evaluates fit before resources are committed._ 

#### **Business Alignment** 

I Confirm the initiative has a named business sponsor with budget authority _No sponsor = no progression. Document name and role._ I Map the initiative to at least one active strategic theme or OKR _Themes: customer experience, operational resilience, innovation, cost efficiency._ I Document the business problem statement in one paragraph _Problem statement must be reviewed and signed off by the sponsor._ 

I Identify which business capabilities are impacted or created _Reference the enterprise capability map for current-state comparison._ I Assess urgency and strategic priority (High / Medium / Low) **Landscape Assessment** 

I Search the application portfolio for existing capabilities that could satisfy the need _Build, buy, or reuse decision starts here._ I Identify overlapping or redundant initiatives already in flight _Check the architecture roadmap and active project register._ I Check for active vendor contracts or licences that may already cover the need _Engage procurement and vendor management teams._ I Document current-state architecture touchpoints (systems, integrations, data flows) **Initial Risk & Compliance Scan** 

I Flag any regulatory, data privacy, or sovereignty concerns (GDPR, HIPAA, etc.) _Escalate to Legal/Compliance if any flags are raised._ I Identify technology standards that will apply (security, cloud, integration, data) I Check if the initiative touches Tier-1 or mission-critical systems _If yes, mandatory resilience and DR review required in Design stage._ 

I _Gate Check: EA must produce an Architecture Intake Assessment before the business case proceeds to investment committee._ 

**Page 4** 

### **Stage 2: Approve / Govern** 

Gate: ARB Architecture Approval Gate Owner: Architecture Review Board (ARB) 

_Architecture Review Board assesses the business case and grants conditional approval._ 

#### **Business Case Review** 

- I Confirm the business case includes quantified benefits with measurement methodology 

- I Review the options analysis: Build vs Buy vs Reuse vs Partner 

_EA must validate that all options were genuinely considered._ 

- I Validate TCO calculation covers 3–5 year horizon including run costs 

- I Confirm ROI methodology and timeline are realistic 

_Formula: [(Financial Gain - Cost) / Cost] x 100. Target > 15%._ 

#### **Architecture Standards Compliance** 

I Verify proposed technology stack is on the approved technology radar _Reject or escalate any technology not on the approved / trial list._ 

- I Confirm proposed integration approach aligns with enterprise integration patterns 

- I Validate data architecture approach against the enterprise data model 

- I Check cloud strategy alignment (public / private / hybrid / on-prem policy) _Reference the cloud adoption framework for the approved deployment model._ 

- I Confirm security architecture requirements have been scoped 

#### **Governance & ARB Decision** 

- I Schedule formal ARB presentation and circulate materials 5 business days in advance 

- I ARB records decision: Approve / Approve with Conditions / Defer / Reject _All conditions must be documented with owners and resolution dates._ 

- I Issue Architecture Decision Record (ADR) capturing rationale and constraints 

- I Assign a named Solution Architect to the initiative 

_SA must be confirmed before Design stage commences._ 

I _Gate Check: Signed ARB decision record required. Conditional approvals must list specific conditions that trigger re-review._ 

**Page 5** 

### **Stage 3: Design** 

Gate: Solution Architecture Sign-off Gate Owner: Solution Architect + EA 

_Target state architecture is defined. Guardrails are set for the delivery team._ 

#### **Solution Architecture Documentation** 

- I Produce Solution Architecture Document (SAD) covering functional and non-functional requirements 

- I Create context diagram (C4 Level 1) showing system boundaries and external actors _Use C4 Model or ArchiMate notation per enterprise standards._ 

- I Produce container/component diagrams for new or significantly modified systems 

- I Document all integration points with sequence diagrams or API contracts 

- I Define data flows and data ownership including PII / sensitive data classification 

#### **Non-Functional Requirements (NFRs)** 

- I Define availability SLA (e.g. 99.9% uptime) and validate infrastructure supports it 

- I Define RTO (Recovery Time Objective) and RPO (Recovery Point Objective) _Mandatory for any system touching Tier-1 capabilities._ 

- I Specify performance benchmarks (response time, throughput, concurrency) 

- I Define scalability model (horizontal / vertical / auto-scaling thresholds) I Complete security architecture review: authentication, authorisation, encryption, audit _Engage CISO team for any internet-facing or data-sensitive components._ 

- **Delivery Guardrails** 

- I Publish architecture guardrails document for the delivery team 

- I Define architecture compliance checkpoints within the delivery schedule I Agree on architecture fitness functions / automated compliance checks if applicable I Document approved technology versions and approved third-party dependencies 

I _Gate Check: SAD must be peer-reviewed by at least one other EA and approved by the ARB chair before build commences._ 

**Page 6** 

### **Stage 4: Build / Deliver** 

Gate: Architecture Compliance Gate (Pre-Production) Owner: Solution Architect 

_Delivery teams implement. EA governs compliance and manages architecture drift._ 

#### **Architecture Governance During Delivery** 

- I Conduct architecture review at 30% and 70% delivery milestones _30% review catches structural issues before they are expensive to fix._ 

- I Review and approve any proposed deviations from the approved SAD 

- I Log all architecture decisions made during build in the ADR register _Include context, options considered, decision, and consequences._ 

- I Validate integration contracts (API specs, event schemas) against approved design 

#### **Pre-Production Architecture Review** 

- I Verify deployed architecture matches approved SAD — check for drift 

_Use infrastructure-as-code scanning or architecture fitness functions._ 

- I Confirm all NFRs have been tested: load testing, failover testing, DR drill I Validate security controls are implemented: pen test or security scan completed I Confirm observability is in place: logging, monitoring, alerting, tracing I Review deployment pipeline and rollback procedure _Rollback must be tested, not assumed._ 

- I Update the application portfolio inventory with new system details 

I _Gate Check: Signed architecture compliance sign-off required before production go-live. No exceptions._ 

**Page 7** 

### **Stage 5: Operate / Run** 

Gate: Annual Portfolio Health Review Owner: EA + Platform / Operations Owner 

_The asset is in production. EA monitors portfolio health and manages standards drift._ 

#### **Portfolio Registration & Baseline** 

- I Confirm system is registered in the application portfolio with full metadata 

- I Record: business owner, technical owner, criticality tier, data classification 

   - _Tier 1 = mission critical. Tier 2 = business important. Tier 3 = supporting._ 

- I Document all integration dependencies (upstream and downstream systems) 

- I Record licence details, contract renewal dates, and vendor SLA terms 

- I Baseline the total cost of ownership (annual run cost) for benchmarking 

#### **Ongoing Compliance Monitoring** 

- I Confirm system appears on the architecture standards compliance dashboard 

   - _Track against: security patches, EOL components, API version compliance._ 

- I Monitor for technology end-of-life dates (OS, middleware, framework versions) 

- I Review integration health metrics quarterly (error rates, latency, availability) 

- I Flag any architecture exceptions granted — review annually for resolution 

_Permanent exceptions become technical debt — track in the debt register._ 

I _Operational KPIs to track: EOL technology %, standards compliance %, integration error rate, system availability vs SLA._ 

**Page 8** 

### **Stage 6: Review / Optimise** 

Gate: Annual Rationalisation Decision Gate Owner: Enterprise Architect + Business Owner 

_Annual rationalisation assessment. Every asset is scored and a lifecycle decision is made._ 

#### **Application Rationalisation Assessment** 

- I Score the asset on Business Value (1–5) and Technical Health (1–5) 

_Business Value: usage, strategic alignment, revenue impact, regulatory necessity._ 

- I Score Technical Health: currency, maintainability, security posture, support status 

   - _Plot on the EA value/health matrix to determine disposition._ 

- I Determine disposition: Retain / Invest / Migrate / Consolidate / Retire 

- I Validate decision with business owner 

_Business must agree with the technical health assessment._ 

#### **Optimisation Actions** 

- I If Retain: document refresh roadmap for next 12 months 

- I If Invest: initiate a new Pitch/Demand request for the enhancement 

   - _Restart the lifecycle for the enhancement as a new initiative._ 

- I If Migrate: define target platform and migration timeline 

_Migration timeline must account for data migration and user transition._ 

- I If Consolidate: identify the target system and decommission plan for the survivor _Consolidation must be managed as a formal project._ 

- I If Retire: proceed to Stage 7 (Retire / Decommission) 

I _Gate Check: Rationalisation decisions must be approved by the EA Practice Lead and business owner before action is taken._ 

**Page 9** 

### **Stage 7: Retire / Decommission** 

Gate: Decommission Completion Gate Owner: EA + Platform Owner + Legal 

_Controlled shutdown of the asset. Dependencies resolved. Contracts terminated. Data migrated._ 

#### **Dependency & Impact Analysis** 

- I Produce full dependency map: all upstream and downstream consumers of this system _Use the integration register and run discovery tooling to confirm completeness._ 

- I Notify all dependent system owners with minimum 90-day decommission notice 

- I Confirm all integrations have a migration path to an alternative system _No integration should be left orphaned._ 

- I Assess impact on business processes — obtain business sign-off on transition plan 

#### **Data & Knowledge Management** 

- I Define data retention policy: archive, migrate, or delete per regulatory requirements _GDPR / legal hold requirements must be validated with Legal before deletion._ 

- I Complete data migration to target system and validate data integrity 

- I Archive all system documentation: SAD, ADRs, runbooks, test results _Archive period typically 7 years for regulated industries._ 

- I Transfer operational knowledge to the support team for any replacement system 

#### **Commercial & Contractual Close-Out** 

- I Confirm licence termination date and notify vendor 

_Check contract notice periods — typically 30–90 days._ 

- I Terminate SLAs and support contracts with confirmation from vendor 

- I Recover and decommission all infrastructure (servers, VMs, cloud resources) 

- I Remove system from all access control lists, firewalls, and identity directories _Failure to remove access is a security and audit finding._ 

#### **Final Sign-Off & Portfolio Close** 

- I Remove system from the active application portfolio inventory 

- I Update all architecture diagrams and roadmaps to reflect decommission 

- I Issue decommission confirmation to ARB and business owner 

- I Record lessons learned: what could have been retired sooner? what dependency issues arose? 

_Feed insights back into the intake and rationalisation process._ 

- I Update TCO reduction tracker — record cost saving realised from decommission 

I _Gate Check: Decommission completion certificate required. Signed by EA, Platform Owner, Legal, and Business Owner._
