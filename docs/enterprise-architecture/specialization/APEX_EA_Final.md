supersedes: "docs/enterprise-architecture/framework/TOGAF10_APEX_AI_Platform_NexaBank.pdf, docs/enterprise-architecture/framework/TOGAF10_APEX_CloudNative_GlobalCorp.pdf, docs/enterprise-architecture/framework/TOGAF10_APEX_v4_PeerReviewed.pdf"
title: "APEX: AI Platform of"
date_created: 2026-06-29
last_reviewed: 2026-07-09
status: current
source_type: converted-pdf
source_file: "APEX_EA_Final.pdf"
---

<!-- converted from APEX_EA_Final.pdf -->

# APEX: AI Platform of

## Confidential | Togaf 10 Adm | Ai-Dlc Integrated | Cloud-Native | Final Edition
APEX: AI Platform of
Platforms
Cloud-Native AI Agent Architecture | TOGAF 10 ADM + AI-DLC
The authoritative Enterprise Architecture blueprint for the APEX programme
at GlobalCorp Enterprises. Applies TOGAF 10 ADM as governance skeleton and
AI-DLC as velocity engine to create a cloud-native AI Platform of Platforms.
Covers all nine ADM phases, full team structure, RACI, responsibility
mappings, cloud-native service design, and regulatory compliance across
EU AI Act, DORA, GDPR, MiFID II, and internal model risk policy.
## Organisation
GlobalCorp Enterprises
## Programme
APEX — AI Platform of Platforms
## Framework
## Togaf 10 Adm + Ai-Dlc
## Architecture Approach
Cloud-Native / Vendor-Agnostic
## Document Reference
## Ea-Apex-Master-001
## Issue Date
April 2026
## Classification
## Confidential
## Status
## Approved — Final

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 2
TOGAF® — The Open Group
## Overview
Executive Summary
Programme context, goals, and key metrics
Programme Purpose
APEX is GlobalCorp's strategic programme to replace 23 siloed AI tools with a unified, governed AI Platform of
Platforms built on cloud-native open standards. It applies the TOGAF 10 Architecture Development Method (ADM) as
its governance framework and the AWS AI-Driven Development Lifecycle (AI-DLC) as its delivery methodology —
positioning AI as a central collaborator across design, build, and operations, not merely a peripheral productivity tool.
The platform provides every GlobalCorp division with reusable AI agent capabilities, governed knowledge bases,
shared observability, and a self-service marketplace — eliminating the time, cost, and compliance risk of building
isolated AI systems.
TOGAF ADM Phases
30+
Architecture Documents
Pioneer Domains
Regulatory Frameworks
Cloud-Native Patterns
Team Roles Defined
What This Programme Delivers
APEX delivers three interlocking outcomes:
 Velocity — time-to-market for AI use cases reduced from 9.2 months to a planning baseline of 5–6 weeks through
AI-DLC Construction phase, reusable agent templates, and self-service onboarding
 Governance — five-tier continuous governance model replacing quarterly gate reviews; automated conformance,
real-time observability, and Decision Explanation Artefacts for every regulated agent decision
 Platform Economics — $14M annual duplicated spend eliminated through shared infrastructure, reusable tooling, and
centralised compliance — generating positive NPV within 24 months of platform go-live
Programme Pain Chain — Current State vs. Target
Problem Area
Current State
APEX Target
Delivery Mechanism
Time-to-market for AI use
cases
9.2 months
5–6 weeks (planning
baseline)
AI-DLC Construction; reusable templates; automated
compliance pipeline
Duplicated AI tool spend
$14 M / year
$3 M / year
Platform consolidation; shared observability; agent
marketplace
Regulatory governance gaps
47 open gaps
0 gaps
Automated conformance; DEA pattern; DORA change
framing
Developer satisfaction (NPS)
−12
Target: +55
Self-service portal; AI-DLC mob sessions; reduced
compliance toil
Agents in production
23 (siloed)
(platform-governed)
Agent lifecycle management; health scoring;
marketplace
MTTR for AI incidents
6.3 hours
< 30 minutes
LGTM observability; AI-DLC Operations; incident
agent (Pioneer 4)

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 3
TOGAF® — The Open Group
TOC
Table of Contents
Structure of this document
01 — Team Structure, RACI & Responsibility Mappings
■ APEX Operating Model — Who Does What
■ Organisation Tiers
■ Core Team Register
■ RACI: Agent Lifecycle
■ RACI: Platform Governance
■ RACI: Regulatory & Compliance
■ Responsibility Assignment Matrix
■ Stakeholder Engagement Map
02 — AI-DLC: Methodology, Phases & EA Impacts
■ What is AI-DLC?
■ Three Phases
■ Terminology Reference
■ Impact Across All 10 TOGAF ADM Phases
■ Operating Model Transformations
03 — Preliminary Phase — Foundation
■ Architecture Principles (APD-001)
■ Tailored ADM Process
■ Architecture Repository
04 — Phase A — Architecture Vision
■ Statement of Architecture Work (SAW-APEX-001)
■ Stakeholder Map & Register
■ Architecture Vision Document
05 — Phase B — Business Architecture
■ Business Capability Map (BCM-APEX-001)
■ Value Stream Analysis
■ Organisation Model
06 — Phase C — Information Systems Architecture
■ Data Architecture & AI-Native Entities (DAD-APEX-001)
■ Application Architecture & Component Model (AAD-APEX-001)
07 — Phase D — Technology Architecture
■ Multi-Region Cloud-Native Infrastructure
■ Security Architecture
■ CI/CD Pipeline with Layered Verification Model
■ Observability Architecture
08 — Phase E–H — Delivery, Governance & Change
■ Architecture Roadmap (ROAD-APEX-001)
■ Solution Building Blocks (SBB-APEX-001)
■ Migration Plan (IMP-APEX-001)
■ 5-Tier Governance Model (CAF-APEX-001)
■ Change Intelligence Process (ACHG-APEX-001)
09 — Requirements Management
■ Architecture Requirements Specification (ARS-APEX-001)
10 — Appendices
■ A — Regulatory Cross-Reference
■ B — Cloud-Native Service Mapping
■ C — Glossary

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 4
TOGAF® — The Open Group
## Section 01
Team Structure, RACI & Responsibility Mappings
Who is on the team, what they own, and how they interact
APEX Operating Model — Who Does What
The APEX programme operates a federated model: a Platform Core Team builds and runs the shared infrastructure;
Domain Squads build and operate agents within it; Governance Bodies provide oversight and approval authority;
and Specialist Functions (Security, Compliance, Data) provide embedded expertise throughout the lifecycle.
## Tier 0 — Exec
Group CTO
Executive Sponsor
Steering Committee
Monthly Oversight
## Tier 1 — Govern
Architecture Board
ARB — Weekly
Chief AI Ethics Officer
AI Risk & Ethics
Compliance Lead
DORA / EU AI Act
## Tier 2 — Platform
VP AI Platform
Product Owner
Platform Eng Lead
Infra & Runtime
AI/ML Eng Lead
Agent Framework
SRE Lead
Reliability & Cost
DevX Lead
Portal & UX
## Tier 3 — Domains
Domain Arch ×5
Embedded Architects
Domain Dev Teams
Agent Builders
Data Stewards
Data Product Owners
## Tier 4 — Specialist
Security Architect
CISO Delegate
Data Architect
CDO Delegate
Model Risk Lead
MRM Delegate
Reg Affairs Lead
Regulator Liaison
Core Team Register
Role
ID
Role
Tier
FTE
Source
Key Accountabilities
T-01
Group CTO
0.1 (
spon
sor)
Internal
Executive authority; budget approval; regulator-facing sign-off
T-02
VP AI Platform
1.0
Internal
Platform product roadmap; stakeholder alignment; steering pack
T-03
Enterprise Architect
1.0
Internal
ADM governance; all architecture decisions; ARB chair
T-04
Chief AI Ethics Officer
1.0
New hire
AI risk appetite; ethics review; EU AI Act risk classification
sign-off
T-05
Platform Engineering Lead
1.0
Internal
Cloud-native infrastructure; Kubernetes clusters; CI/CD platform
T-06
Platform Engineers (×4)
4.0
Internal (×2) +
Contractor (×2)
IaC authoring; agent gateway; agent control plane build
T-07
AI/ML Engineering Lead
1.0
Internal
Agent framework selection; orchestration patterns; KB
architecture
T-08
AI/ML Engineers (×3)
3.0
Internal (×1) + AWS
## Ps (×2)
Agent development; prompt engineering; guardrail configuration
T-09
SRE / FinOps Lead
1.0
Internal
Platform reliability; cost governance; agent health scoring
T-10
SRE Engineers (×2)
2.0
Internal (×1) +
Contractor (×1)
Observability; on-call; canary monitoring; budget enforcement
T-11
Developer Experience
Lead
1.0
Internal
Self-service portal; developer documentation; agent marketplace
UX

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 5
TOGAF® — The Open Group
Role
ID
Role
Tier
FTE
Source
Key Accountabilities
T-12
DevX Engineer
1.0
Internal
Portal frontend; onboarding wizard; developer tooling
T-13
Domain Architect (×5)
5.0
Internal — reassigned
from domains
Domain-level architecture; Pioneer agent design; domain ARB
liaison
T-14
Compliance Analyst (AI)
(×2)
2.0
New hire
EU AI Act classification; DORA evidence; DEA review; audit
liaison
T-15
Security Architect
0.5 (
emb
edde
d)
Internal — CISO
delegate
Security architecture sign-off; red-team coordination; zero-trust
design
T-16
Data Architect
0.5 (
emb
edde
d)
Internal — CDO
delegate
Data classification; embedding governance; data mesh
integration
T-17
Model Risk Lead
0.5 (
emb
edde
d)
Internal — MRM
delegate
Model risk opinions; explainability requirements; SR 11-7
alignment
T-18
Regulatory Affairs Lead
0.5 (
emb
edde
d)
Internal — Group
Compliance
Regulator liaison; DORA evidence pack; EU AI Act submissions
RACI Matrix — Agent Lifecycle
## Doc Ref: Raci-Apex-001
R = Responsible (does the work) A = Accountable (owns the outcome) C = Consulted (input required) I = Informed (kept
up to date)
Activity
Ent.
Arch
VP AI
Plat
Platform
Eng
AI/ML
Eng
Domain
Arch
Domain
Dev
Security
Arch
Data
Arch
Model
Risk
Complia
nce
SRE /
FinOps
Agent onboarding request intake
C
A
I
I
R
C
I
I
I
C
I
Data Maturity Gate assessment
A
I
I
I
R
C
I
R
C
C
I
Agent architecture blueprint
A
C
C
C
R
C
R
R
C
C
I
Security design & threat model
C
I
C
I
C
I
R/A
C
I
I
I
Data classification & DPO sign-off
C
I
I
I
C
I
C
R/A
I
C
I
Prompt catalog design & review
I
I
C
R/A
C
R
I
C
I
C
I
Knowledge base architecture
C
I
C
R/A
C
R
I
R
I
I
I
IaC generation (AI-assisted)
I
I
R/A
C
C
R
C
I
I
I
I
L1–L5 verification pipeline
I
I
R/A
C
C
C
C
I
I
I
C
EU AI Act risk classification
C
I
I
I
C
I
I
I
C
R/A
I
Model risk validation opinion
C
I
I
C
C
I
I
I
R/A
C
I
DEA generation service config
C
I
R
R
C
C
C
I
C
A
I
Guardrail configuration
C
I
C
R/A
C
C
R
I
C
C
I
Canary deployment & SLO monitoring
I
I
C
I
I
C
I
I
I
I
R/A
Production go-live approval
A
C
C
I
C
I
C
C
C
C
C
Agent health score & budget review
I
C
C
I
C
I
I
I
I
I
R/A
Agent deprecation decision
C
A
C
I
R
C
I
I
I
I
C

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 6
TOGAF® — The Open Group
RACI Matrix — Platform Governance & Architecture Board
Activity
Ent.
Arch
VP AI
Plat
Platform
Eng
AI/ML
Eng
Domain
Arch
Domain
Dev
Security
Arch
Data
Arch
Model
Risk
Complia
nce
SRE /
FinOps
ARB session facilitation
R/A
C
I
I
C
I
C
C
I
I
I
Architecture principle ratification
A
C
I
I
C
I
C
C
C
C
I
Architecture deviation approval
A
C
I
I
C
I
C
C
I
C
I
New SBB build/buy decision
A
R
C
C
C
I
C
C
I
C
C
Architecture debt prioritisation
R/A
C
C
C
C
I
I
I
I
I
C
Conformance report (T1 automated)
I
I
R/A
I
I
I
C
I
I
I
C
Conformance escalation (T2 arch)
R/A
C
C
I
C
I
C
I
I
I
I
T4 Regulatory Gate sign-off
C
I
I
I
I
I
C
C
C
R/A
I
Executive steering pack
C
R/A
I
I
I
I
I
I
I
C
I
Agent marketplace curation
C
A
C
I
C
R
I
I
I
I
I
Platform SLA reporting
I
C
C
I
I
I
I
I
I
I
R/A
FinOps & chargeback reporting
I
A
R
I
I
I
I
I
I
I
R
RACI Matrix — Regulatory & Compliance
Activity
Ent.
Arch
VP AI
Plat
Platform
Eng
AI/ML
Eng
Domain
Arch
Domain
Dev
Security
Arch
Data
Arch
Model
Risk
Complia
nce
SRE /
FinOps
EU AI Act risk tier classification
C
I
I
I
C
I
I
I
C
R/A
I
DEA completeness review
I
I
C
I
I
I
C
I
C
R/A
I
DORA change record creation
I
I
R
I
C
I
C
I
I
A
I
DORA 72-hr incident notification
C
C
C
I
I
I
C
I
I
R/A
C
DORA evidence pack compilation
C
I
C
I
C
I
C
C
C
R/A
I
GDPR data flow map maintenance
C
I
I
I
C
I
C
R/A
I
C
I
Model risk opinion sign-off
C
I
I
C
C
I
I
I
R/A
C
I
Explainability evidence (SHAP/LIME)
I
I
C
R
C
C
I
I
A
C
I
Regulator liaison & submissions
C
C
I
I
I
I
I
I
C
R/A
I
TLPT (penetration testing) oversight
C
I
C
I
I
I
R/A
I
I
C
C
Compliance dashboard maintenance
I
I
R
I
I
I
I
I
I
A
I

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 7
TOGAF® — The Open Group
SECTION 01 cont.
Responsibility Assignment Matrix & Stakeholder Map
Domain ownership, stakeholder power/interest, and engagement model
Responsibility Assignment Matrix — Platform Capabilities
The RAM maps each APEX platform capability to its accountable owner and key contributors. This extends the RACI
to show structural ownership across the platform.
Platform Capability
Accountable
Owner
Primary Team
Secondary
Contributors
Governance
Body
Review
Cadence
Agent Lifecycle
Management (ALM)
VP AI Platform
AI/ML
Engineering
Domain Architects,
Compliance, Model Risk
ARB
Per
deployment
Agent Gateway & Registry
Platform
Engineering Lead
Platform
Engineers
Security Architect, SRE
ARB (new agents)
Continuous
(automated)
Knowledge Base Platform
AI/ML Engineering
Lead
AI/ML Engineers
Data Architect, Domain
Data Stewards
## Arb + Cdo
delegate
Per KB
refresh
Guardrails & Safety Layer
Chief AI Ethics
Officer
AI/ML
Engineering
Security Architect,
Compliance
ARB + Ethics
review
Per agent +
quarterly
red-team
Decision Explanation
Artefact (DEA)
Compliance Lead
Platform
Engineering
Model Risk, Legal,
AI/ML Engineering
T4 Reg-Gate
Per regulated
decision
CI/CD Pipeline & Layered
Verification
Platform
Engineering Lead
Platform
Engineers
Security Architect, SRE
ARB (pipeline
changes)
Per pipeline
change
Observability & LGTM
Stack
SRE Lead
SRE Engineers
Platform Engineering
SRE review
Continuous +
weekly review
Cost Governance
(FinOps)
SRE Lead
SRE Engineers
VP AI Platform, Finance
Monthly steering
Monthly
Developer Portal &
Marketplace
DevX Lead
DevX Engineer
VP AI Platform, Domain
Architects
Quarterly UX
review
Per release
Regulatory Compliance
Programme
Compliance Lead
Compliance
Analysts
All Tier 4 specialists
Steering
Committee
Monthly +
ad-hoc
Data Mesh Integration
Data Architect
Domain Data
Stewards
AI/ML Engineering,
Platform Engineering
CDO governance
forum
Per data
product
change
Security Architecture
Security Architect
Platform
Engineering
All teams
CISO review
board
Per phase +
quarterly
Pioneer Domain 1 — Risk
Scoring Agent
Domain Architect 1
Domain Dev
Team 1
AI/ML Engineering,
Model Risk, Compliance
Domain ARB
Per sprint
Pioneer Domain 2 —
Verification Agent
Domain Architect 2
Domain Dev
Team 2
AI/ML Engineering,
Compliance
Domain ARB
Per sprint
Pioneer Domain 3 —
Advisory Agent
Domain Architect 3
Domain Dev
Team 3
AI/ML Engineering,
Model Risk
Domain ARB
Per sprint
Pioneer Domain 4 —
Incident Agent
Domain Architect 4
Domain Dev
Team 4
SRE, Platform
Engineering
Domain ARB
Per sprint
Pioneer Domain 5 —
Model Monitor Agent
Domain Architect 5
Domain Dev
Team 5
Model Risk,
Compliance, AI/ML Eng
Domain ARB +
MRM
Per sprint
Stakeholder Power / Interest Map
Stakeholder engagement strategy is derived from power (organisational authority and decision-making ability) and
interest (level of direct impact from APEX).

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 8
TOGAF® — The Open Group
Stakeholder
Role
Power
Intere
st
Quadrant
Strategy
Engagement
Cadence
Group CTO
Executive
Sponsor
High
High
## Key Player
Manage closely; regular
updates; co-own critical
decisions
Monthly steering;
ad-hoc for critical
decisions
VP AI Platform
Programme
Owner
High
High
## Key Player
Daily collaboration; roadmap
co-ownership; ARB
participation
Daily standup;
weekly roadmap
review
Chief Information
Security Officer
Security Authority
High
High
## Key Player
Embedded security architect;
CISO sign-off gate in ADM
Bi-weekly
architecture
review; CISO
gate per phase
Group Compliance
Lead
Regulatory
Liaison
High
High
## Key Player
Co-own compliance gates;
evidence pack review;
regulator briefings
Monthly
evidence review;
weekly during
regulatory events
Chief Data Officer
Data Governance
Authority
High
High
## Key Player
Embedded data architect; Data
Mesh integration authority
Bi-weekly; data
architecture
sign-off
Chief AI Ethics Officer
AI Risk Authority
High
High
## Key Player
Direct line into ARB; EU AI Act
classification authority
ARB weekly;
ethics review per
agent class
Chief Risk Officer
Enterprise Risk
Authority
High
Mediu
m
## Manage
## Closely
Quarterly risk briefings; model
risk programme alignment
Quarterly +
escalation for
material AI risks
Chief Financial Officer
Budget Authority
High
Mediu
m
## Manage
## Closely
Monthly FinOps reports;
business case sign-off
Monthly FinOps
review; annual
budget cycle
Industry Regulator
## (Pra/Ecb)
External
Oversight
High
Mediu
m
## Manage
## Closely
DORA evidence pack; EU AI
Act submissions; proactive
briefings
Quarterly
regulatory
briefing
Domain COOs (×5)
Pioneer Domain
Sponsors
Mediu
m
High
KEEP
## Informed
Regular progress updates;
Pioneer milestone reviews
Monthly per
domain
Domain Dev Teams
Agent Builders
Low
High
KEEP
## Informed
Self-service tooling; developer
portal; clear onboarding
Bi-weekly sprint
reviews; open
ARB office hours
Internal Audit
Assurance
Function
Mediu
m
Mediu
m
KEEP
## Informed
Annual audit; DORA evidence
access; architecture artefacts
Annual audit;
ad-hoc evidence
requests
HR / People Team
Change
Management
Low
Mediu
m
## Monitor
Change impact comms; role
transition support for displaced
tools
Quarterly change
update
External Cloud
Providers
Technology
Partners
Low
Low
## Monitor
SLA management; roadmap
briefings
Quarterly
account review
Team Interaction & Dependency Map
The following matrix shows how each team tier interacts with others, the nature of the dependency, and the formal
channel for that interaction.
From → To
Platform Core Team
Domain Squads
ARB / Governance
Specialist Functions
External Stakeholders
Platform Core
Team
Internal: sprint reviews,
platform roadmap sync
Provides: infrastructure,
tooling, self-service portal,
CI/CD pipeline, guardrails
Reports to: ARB weekly;
steering monthly. Seeks:
approval for SBBs and
deviations
Consults: Security (each
phase), Data (KB design),
Model Risk (agent risk)
Cloud provider SLA
management; AWS PS
engagement for AI/ML

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 9
TOGAF® — The Open Group
From → To
Platform Core Team
Domain Squads
ARB / Governance
Specialist Functions
External Stakeholders
Domain Squads
Consumes: platform
services, agent templates,
portal, pipeline. Raises:
new agent requests,
escalations
Internal: daily standups,
shared domain backlog,
cross-domain agent
dependency reviews
Reports to: Domain ARB.
Seeks: architecture
approval, compliance
sign-off per agent
Consults: Domain
Architect (daily),
Compliance (per agent
intake), Data Steward
(data flows)
Business stakeholder
demos; UAT with end
users
ARB /
Governance
Approves: architecture
decisions, SBBs,
deviations, phase gate
exits
Reviews: agent blueprints,
domain architecture
artefacts, compliance
evidence
Internal: ARB weekly chair
+ secretariat. Escalates: to
Steering Committee for T5
items
Receives: security review
(CISO gate), compliance
opinion (T4 Reg-Gate),
Model Risk opinion
Regulator liaison via
Compliance Lead;
quarterly briefings
Specialist
Functions
Embedded in: security
design, data architecture,
CI/CD gates
Provides: domain-level
guidance, data
classification, embedded
model risk reviews
Feeds into: ARB with
specialist opinions.
Attends: relevant ARB
agenda items
Cross-functional:
security–compliance
alignment; data–model
risk alignment
No direct external
engagement; all via
Compliance Lead or CISO
External
Stakeholders
Receives: SLA reports,
FinOps dashboards,
compliance packs
None (no direct domain
team interaction)
Attends: quarterly
regulator briefing.
Reviews: DORA evidence
pack, EU AI Act
submissions
None direct
Peer industry: AI
governance working
groups; open-source
community participation

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 10
TOGAF® — The Open Group
## Section 02
AI-DLC: Methodology, Phases & EA Impacts
AI as central collaborator — not peripheral tool
What is AI-DLC?
The AI-Driven Development Lifecycle (AI-DLC) was introduced by AWS in July 2025 and featured at AWS re:Invent
2025. It emerged from 100+ enterprise experiments and observed that AI-assisted (too narrow) and AI-autonomous
(too unreliable) both produced suboptimal results. AI-DLC positions AI as a central collaborator throughout every
development activity — design, build, test, deploy, and operate.
Proven Results
Enterprise adopters report 2–5× sustainable productivity gains across the full lifecycle. In well-scoped greenfield tasks
with high-quality semantic context, gains reach 7–10×. Teams using AI-DLC consistently report improved code quality
alongside velocity: the Qodo 2025 report showed quality improvements rising from 55% to 81% with AI-assisted
review; the Atlassian RovoDev 2026 study found AI code review comments led to additional fixes in 38.7% of cases.
Ph
ase
Name
AI Role
Human Role
Architecture Impact
## Inception
(Mob
Elaboration)
Transforms business intent into
structured requirements, user
stories, capability maps, and
architecture units at speed
Validates AI outputs;
provides business context,
domain knowledge, and
political nuance that AI
cannot infer
Vision, requirements, and capability
maps produced in days not weeks; must
be preceded by a political context
capture session
## Constructio
N (Mob
Construction)
Proposes architecture
components, generates IaC, writes
serverless functions, builds tests
from semantic context
Clarifies technical decisions
and architectural choices in
real time; reviews every
AI-generated artefact before
merge
Phases B/C/D produced concurrently in
bolts; concurrent execution requires
Phase Boundary Receipts for regulated
data flows
## Operations
Applies accumulated context to IaC
deployment, canary monitoring,
incident pattern recognition, and
drift detection
Reviews and approves all
changes; monitors SLOs;
makes judgment calls in
novel failure scenarios
Phases F/G/H compressed into
continuous delivery; every AI-driven
change is a formal DORA change event
with ARB record
Terminology Reference — AI-DLC vs. Traditional
Traditional Term
AI-DLC Term
Duration Change
Enterprise Architecture Implication
Sprint
Bolt
2–4 weeks → hours
to days
ADM governance must operate within bolt cadence; tiered model
required
Epic
Unit of Work
Months → days to
weeks
Architecture work packages shrink; ARB meets weekly not bi-weekly
User Story
AI-Elaborated
Requirement
Days → minutes
Requirements traceability automated; ARS auto-updated with human
review gate
Architecture Review
Real-time Mob
Construction
Weeks →
concurrent
ARB provides real-time guidance; final sign-off authority retained
Documentation
Persistent
Semantic Context
Post-sprint →
continuous
Architecture repository auto-updated; EA team shifts from authors to
reviewers
Code Review (PR)
AI-Augmented
Quality Scan
Hours → minutes
L1–L5 Layered Verification Model enforced in pipeline; no hero
review
Retrospective
Continuous
Learning Loop
End of sprint →
continuous
Architecture debt auto-detected; agent health scoring continuous

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 11
TOGAF® — The Open Group
AI-DLC Impact Across All 10 TOGAF ADM Phases
TOGAF Phase
AI-DLC Capability
Human Guard
Required
Architecture Adaptation
Preliminary
AI generates architecture
principle drafts; governance
rules codified as steering files
Architects validate all
AI-generated principles;
formal ratification gate
mandatory
Steering files maintained in version control; breaking
changes require architect approval
Phase A — Vision
AI transforms business intent
into draft Architecture Vision
and SAW in hours
Political nuance, power
dynamics, and unwritten
constraints require
human capture before
Mob Elaboration
Political Blindspot Protocol precedes every Mob
Elaboration session
Phase B —
Business
AI auto-generates business
capability maps from existing
documentation; value streams
modelled in minutes
Existing documents
may be stale; Data
Maturity Gate required
before AI elaboration
begins
Data Maturity Gate: 5-check assessment mandatory
before Phase B AI execution
Phase C — Data
AI creates data models, entity
diagrams, and API schemas;
prompt catalogs and
embeddings become first-class
governed entities
Embedding model
upgrades require
Embedding
Compatibility Contract
and RAGAS regression
gate
Embeddings versioned; RAGAS gate on model
upgrade; 90-day rollback window maintained
Phase C —
Application
AI proposes application
component models and
cloud-native integration
patterns
AI may propose
patterns inconsistent
with org standards
without tight steering
files
Org standards loaded as steering files; all AI-proposed
patterns reviewed by ARB
Phase D —
Technology
AI generates IaC, security
policies, and deployment
configs from architecture
context
AI-generated IaC
requires L1–L5 Layered
Verification; IaC
hallucinations are a real
risk
L1–L5 Layered Verification Model enforced in CI/CD;
no merge without engineer confirmation
Phase E —
Opportunities
AI analyses gap reports and
proposes build/buy/reuse
options at machine speed
AI may miss regulatory
obligations, vendor
relationship context,
and political constraints
Legal, procurement, and compliance participate in Mob
Elaboration for all build/buy decisions
Phase F —
Migration
Bolts replace work packages;
migration plans near-real-time
Over-acceleration may
skip governance gates
Compliance gates pipeline-enforced; AI-DLC speed
contained within governance boundaries
Phase G —
Governance
AI automates conformance
checking; real-time drift
detection replaces periodic
reviews
Automated checks
inform; humans decide;
ARB retains final
sign-off authority
5-tier governance model; T1 automated always-on; T4
Reg-Gate inviolable
Phase H —
Change
AI monitors model releases
and regulatory changes; flags
architecture impacts
automatically
Continuous change
proposals require
human filtering to avoid
architecture instability
Change type classification; AI flags; humans prioritise;
DORA change framing applied to all AI changes
Req.
Management
AI generates and maintains
requirements traceability from
business intent to deployed
code
Context drift across
sessions; requirements
must be forward-traced
before each deployment
Context Integrity Protocol; session summary archive;
forward-trace validation per deployment

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 12
TOGAF® — The Open Group
## Preliminary
Preliminary Phase — Foundation
Architecture capability, principles, tailored ADM, repository
The Preliminary Phase establishes GlobalCorp's architecture capability for APEX. Governance structures are put in
place, the ADM is tailored for regulatory context, and architecture principles that govern every subsequent decision are
ratified.
Architecture Principles — APD-001
## Doc Ref: Apd-001 | Approved
Business Principles
ID
Principle
Statement
Implication
BP-01
AI as Business
Capability
Every APEX agent traces to a measurable
business outcome in the Corporate Strategy
Map; productivity gains are tracked
quarterly against actuals
Business Value Case required before APEX onboarding;
quarterly actuals vs. targets reported to steering committee
BP-02
Human-in-the-Loo
p — Inviolable
All agents acting on sensitive data or
high-stakes decisions have a human
escalation path that is pipeline-enforced
and cannot be bypassed for velocity
HITL gates configured in the agent gateway; any removal
requires Group CTO written exception logged in
compliance register
BP-03
Platform Thinking
with Sprawl
Controls
No division procures standalone AI tools if
APEX can meet the need within 90 days;
equally, no agent is created without registry
entry and monthly health score
ARB approval for procurement; agent registry is the source
of truth; unregistered agents blocked at gateway
BP-04
Data Maturity
Before AI Velocity
AI-DLC Construction cannot begin for any
domain until the Data Maturity Gate (5
checks) is passed
Data maturity assessment is the first deliverable of every
Pioneer Domain onboarding; it is a programme gate not a
guideline
Data Principles
ID
Principle
Statement
Implication
DP-01
Data Sovereignty
Personal and sensitive data processed
by APEX agents must remain within the
contractually agreed jurisdiction
AI inference endpoints provisioned per jurisdiction; network
policy blocks cross-border calls for C4-class data at the kernel
level
DP-02
Data as Shared
Asset
All data consumed by agents is
catalogued in the Data Mesh with
documented lineage before an agent
goes to production
No agent deployed without data catalog entry covering every
data source it touches; Data Architect sign-off required
DP-03
Explainability
Before
Deployment
Every model has a documented
explainability method — including the
retrieval stage of RAG, not just the
generation stage
RAG retrieval explanation is part of the DEA; explainability
report is a mandatory CI/CD gate artefact
DP-04
AI Assets as
Governed Data
Prompt templates, embeddings,
feedback logs, and model lineage
records are first-class governed data
assets with the same rigor as
operational data
Embedding Compatibility Contract applies; ML model registry
tracks all lineage; DPO sign-off for sensitive-adjacent prompts
DP-05
Embedding
Compatibility
Enforced
Any embedding model upgrade triggers
automatic full re-indexing of all
dependent knowledge bases; RAGAS
regression gate blocks production
activation
CI/CD pipeline blocks embedding upgrade without RAGAS
pass; 90-day rollback window maintained
Technology Principles

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 13
TOGAF® — The Open Group
ID
Principle
Statement
Implication
TP-01
Cloud-Native
Open Standards
Platform uses CNCF-hosted and
open-standard components;
proprietary cloud SDKs used only
where equivalent OSS is not
production-ready
All components containerised; OpenAPI for agent interfaces;
OpenTelemetry for observability; no cloud SDK in core business
logic
TP-02
Security by
Design
Security architecture is approved by
the CISO delegate before any IaC is
written for a given Pioneer Domain
Security is a Phase D entry gate; it is not a Phase G concern;
zero-trust NetworkPolicy defined before build begins
TP-03
Observability as
First-Class
Every agent emits OpenTelemetry
traces, Prometheus metrics, and
structured logs from the first commit;
no agent reaches UAT without a
Grafana dashboard
Dashboard-as-code is generated in bolt 1; observability is part of
the Definition of Done for every agent
TP-04
Cost
Transparency
with Hard Throttle
Each agent has a tagged cost centre;
budget enforced with a hard throttle at
110% of monthly budget that cannot
be self-overridden by the agent
Budget throttle is enforced at the agent gateway level, not just an
alert; SRE Lead is the only person who can override with a
logged justification
TP-05
Layered
Verification
AI-generated IaC passes five
verification layers (L1 static analysis,
L2 AI explanation artefact, L3
property tests, L4 canary deploy, L5
drift detection) before merge; no
single-person hero review is sufficient
at enterprise scale
CI/CD enforces L1–L4 automatically; L2 AI explanation artefact
retained 12 months per IaC commit
TP-06
Decision
Explanation
Artefact by
Default
Every High-Risk AI agent (EU AI Act
Art.6) produces a Decision
Explanation Artefact (DEA) for every
regulated decision — assembled from
all log sources and stored immutably
for 7 years
DEA generation service is a mandatory platform component;
deployed with Pioneer 1 and applied to all subsequent Pioneers

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 14
TOGAF® — The Open Group
## Phase A
Architecture Vision
Scope, mandate, and stakeholder alignment
Architecture Vision Statement
"By Q4 2026, GlobalCorp will operate a unified AI Agent Platform (APEX) on cloud-native open standards,
reducing time-to-market for AI use cases to a planning baseline of 5–6 weeks, achieving full EU AI Act and
DORA compliance, and generating positive NPV within 24 months through platform economics.
Productivity gains are tracked quarterly against actuals."
Programme Scope
In scope: Cloud-native multi-region agent platform (4 regions); AI agent lifecycle management; multi-agent
orchestration; self-service developer portal; shared knowledge bases; centralised observability and cost management;
EU AI Act compliance automation; DEA generation; Agent Gateway; and 5 Pioneer Domain agents.
Out of scope: Foundation model training; customer-facing AI chatbots (Digital Channel programme); autonomous
execution agents (requires separate regulatory approval pathway); data mesh platform build (existing programme).
Architecture Constraints — SAW-APEX-001
DOC REF: SAW-APEX-001 | APPROVED — Group CTO sign-off
Constraint
Source
Architecture Impact
Personal and sensitive data
must remain within contractual
jurisdiction
## Gdpr / Pdpa / Lgpd
Multi-region deployment; network policy blocks cross-border agent calls for
personal data at kernel level
All AI models require Model
Risk validation before
production
Internal Model Risk
Policy (aligned to SR
11-7)
Model Risk Gate in CI/CD is a T4 Reg-Gate; DEA required for High-Risk
agents; explainability artefact mandatory
Cloud-native open standards;
no proprietary SDK in core
business logic
TP-01
LLM calls via provider-agnostic adapter library; agent logic portable across
cloud providers; OpenAPI for all agent interfaces
Zero-downtime deployment for
critical services
Enterprise SLA
Argo Rollouts canary; SLO-based auto-rollback; no manual blue-green steps
required
EU AI Act enforcement from
August 2026
EU Regulation
2024/1689
High-Risk classification at intake; DEA pattern deployed from Pioneer 1;
compliance pack (WP-012) delivered in H2
All AI evolution must be framed
as controlled DORA change
DORA Art.11
Every model update, KB refresh, and agent topology change is a formal
change event with ARB record and DORA change log
Five Pioneer Domains — Proof of Value
#
Division
Agent
Use Case
Key Regulation
AI-DLC Bolts
Owner
Customer Division
RiskScoringAgent
Automated risk-based decisioning
with human escalation for
high-value cases
Internal Model Risk
Policy, GDPR
3 bolts (~8
weeks)
Domain Architect 1
Enterprise
Division
VerificationAgent
Continuous customer verification
monitoring, sanctions screening,
and report drafting
AML Directive, FATF 40
3 bolts (~7
weeks)
Domain Architect 2
Advisory Division
RebalancingAgent
Rule-based portfolio rebalancing
recommendations with full
suitability assessment
MiFID II Art.27, GDPR
2 bolts (~6
weeks)
Domain Architect 3

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 15
TOGAF® — The Open Group
#
Division
Agent
Use Case
Key Regulation
AI-DLC Bolts
Owner
IT Operations
IncidentAgent
L1/L2 ticket triage, root-cause
pattern recognition, and
auto-remediation with SRE
oversight
DORA Art.11 ICT Risk
2 bolts (~5
weeks)
Domain Architect 4
Risk &
Compliance
ModelMonitorAgent
Model drift detection, backtesting
orchestration, and regulatory
evidence report generation
EU AI Act Art.9, Internal
Policy
3 bolts (~6
weeks)
Domain Architect 5

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 16
TOGAF® — The Open Group
## Phase B
Business Architecture
Capability model, value streams, and adaptive capability governance
Business Capability Map — BCM-APEX-001
## Doc Ref: Bcm-Apex-001 | Approved
L1 Capability
Type
Critical Gaps
APEX
## Ai-Dlc
Adaptive?
Governance Model
## 1. AI Strategy &
Governance
## Static
4 critical
5/5
Partial — policy
enforcement
via agents
Standard ARB quarterly review
## 2. Agent Development
## Adaptiv
E
5 critical
5/5
## Yes — Ai-Dlc
Construction
Bolt-level ARB; L1–L5 verification; bolt
Definition of Done
## 3. Agent Orchestration
## Adaptiv
E
4 critical
4/4
## Yes — Ai-Dlc
Operations
Agent dependency map maintained; topology
change = formal DORA change event
## 4. Knowledge
Management
## Adaptiv
E
4 critical
4/4
YES —
continuous KB
refresh
KB refresh = content change event; RAGAS
gate; DPO sign-off for sensitive content
## 5. AI Operations (AIOps)
## Adaptiv
E
5 critical
5/5
## Yes — Ai-Dlc
Operations
DORA change framing applied; real-time
monitoring; agent health scoring continuous
## 6. Data Integration
## Static
2 critical
3/4
## Partial —
Data Mesh
governed
Data Mesh domain governance; quarterly data
product review; APEX integrates, not owns
## 7. Platform Enablement
## Static
4 critical
4/4
YES — portal
AI-scaffolded
Standard deployment cadence; portal
releases are standard CI/CD pipeline
deployments
Value Stream — Agent Delivery End-to-End
Stage
Baseline
APEX Plan
AI-DLC Planning
Baseline
Key Constraints
Intake & Qualification
2–4 weeks
5 days
2 days
Data Maturity Gate may add 1–2 weeks in early
cohorts (F-06)
Architecture & Design
4–8 weeks
10 days
4–5 days
ARB Gate cannot be bypassed; political context
capture session adds structured time in complex
domains
Build & Integrate
8–16 weeks
3 weeks
2 weeks
L1–L5 verification non-negotiable; DEA service adds
1 bolt for High-Risk agents
Validate & Govern
6–10 weeks
10 days
7–8 days
T4 Reg-Gate (Model Risk opinion) is inviolable;
explainability artefact mandatory for High-Risk
Deploy & Monitor
2–4 weeks
1 week
3 days
DORA change framing adds a compliance record
step; canary monitoring adds 1–2 days
TOTAL
## Time-To-Market
~9 months
~9.5 weeks
5–6 weeks
Planning baseline used for budgets; 9.5 weeks used
for business cases as conservative estimate

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 17
TOGAF® — The Open Group
## Phase C
Information Systems Architecture
Data, AI-native entities, application components, and API catalogue
Data Classification Framework
## Doc Ref: Dad-Apex-001 | Approved
Class
Description
Examples
Guardrail Action
Retention
C4 — Highly
Restricted
PII and highly
sensitive data
Government IDs, account
numbers, biometrics
BLOCK or ANONYMIZE in
all agent logs and traces
7 years (DORA
mandate)
C3 — Confidential
Sensitive internal
business data
Proprietary models,
strategic risk parameters
Redact in all observability
traces and log exports
5 years
C2 — Internal
Non-sensitive
operational data
Agent performance
metrics, usage statistics
Standard structured
logging
3 years
C1 — Public
Regulatory and
market reference
data
EU AI Act text, public
rates, open standards
No restriction
Indefinite
C-AI — AI Assets
Prompt catalogs,
embeddings,
feedback logs,
model lineage
Versioned prompt
templates, vector
embeddings, RLHF
datasets
Inherit from source data
class; version-controlled;
DPO sign-off for
C3/C4-adjacent
Per source data class
rules
AI-Native Data Entities — Governance Model
Entity
Classificati
on
Governance
Owner
Version Control
Key Control
Retention
Prompt Catalog
C-AI
Platform AI Eng
+ DPO
Git semver; PR
mandatory
Prompt change triggers full
regression test suite before
merge
Per source data class
Embedding Store
C-AI
Data Mesh
Domain Owner
Embedding model ID
+ version in data
catalog metadata
Embedding Compatibility
Contract: RAGAS gate on
model upgrade; 90-day
rollback
90 days
post-supersession
RAG Retrieval
Log
C2→C4
inherit
Compliance +
Audit
Immutable; object
lock; append-only
Queryable by compliance team
within 60 seconds; feeds DEA
assembly
7 years (DORA)
Feedback Log
C2→C4
inherit
Model Risk
Management
Immutable; object
lock; append-only
Drives model drift detection;
feeds Model Monitoring Agent
(Pioneer 5)
7 years (DORA)
Agent Memory
Inherits
source
class
Platform Eng +
DPO
TTL enforced in KV
store; max 30 minutes
PII check on every write; TTL
enforced at gateway; no
persistence after session
Session TTL only
Model Lineage
Record
C3
Model Risk
Management
ML model registry
(MLflow equivalent)
New model version = formal
model update event requiring
ARB record
Model lifecycle + 7
years
Decision
Explanation
Artefact
C3
Compliance +
Legal
Generated at decision
time; immutable; DEA
service validates
completeness
Assembled from all log
sources; queryable on
demand; 7-year immutable
retention
7 years (EU AI Act +
DORA)
Application Architecture — Cloud-Native Component Model
## Doc Ref: Aad-Apex-001 | Approved

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 18
TOGAF® — The Open Group
Component
Technology
Pattern
SLA
Key Design Decision
APEX Developer
Portal
React SPA + API Gateway
(Kong/Nginx/cloud-native)
Backend-for-Fr
ontend (BFF)
99.9% / p99
<500ms
Agent health score and DEA query link visible
per agent; AI-DLC scaffolds UI in 1 bolt
APEX Control Plane
Python FastAPI;
Kubernetes OCI
containers; 6
microservices
Microservices
— bounded
contexts
99.9% / p99
<500ms
Agent Lifecycle, Budget Enforcer, Onboarding
Orchestrator, Chargeback, Notification,
Compliance Reporter services
Agent Gateway
Envoy proxy + custom
plugin OR APISIX + plugin
Zero-trust entry
point; registry
lookup; budget
throttle
99.99% / p99
<50ms
Blocks unregistered agents (403); enforces
budget hard-throttle at 110%; logs all agent
dependency calls
Agent Orchestration
Engine
LangGraph / AutoGen /
CrewAI OR
cloud-managed equivalent
(evaluated in WP-002
spike)
Supervisor-Wor
ker multi-agent
pattern
99.95% / p99
<3s
All routing decisions logged to OpenTelemetry
trace for DEA assembly; abstraction layer
prevents framework lock-in
Serverless Tool
Functions
Knative / OpenFaaS /
cloud FaaS (OCI
container-based)
Action Group /
Tool Sidecar
pattern
99.95% / p99
<1s
Each function passes L1–L5 verification; tool
invocation logs written to structured log for DEA
DEA Generation
Service
Python event-driven
service; Kubernetes;
triggered on regulated
decision
Event-driven
async;
completeness
validation
before store
99.9% / <5s
Assembles DEA from all log sources; validates
completeness; stores immutably; queryable via
## Dea Api
Human Review
Portal
React + Temporal /
Camunda workflow engine
Human-in-the-L
oop (HITL)
review
workflow
## 99.5% / Sla
defined per
agent risk tier
HITL outcome written to DEA; DEA marked
complete only after HITL where required by risk
classification
LGTM Observability
Stack
OpenTelemetry Collector
+ Prometheus + Grafana +
Loki + Tempo
Centralised
OTEL collector;
push-based
metrics and
traces
99.5%
ingestion;
real-time
dashboards
Agent health score metrics; emergent behaviour
alert rules (chain >3 hops or latency >10s)
Compliance
Reporter
Python data pipeline +
Apache Superset or
Metabase
Batch +
event-driven
reporting
99.5% daily run
EU AI Act and DORA report templates; DORA
change record auto-writer; DEA export API
API Catalogue
API
Version
Style
Auth
SLA
Owner
Agent Registry API
v2
REST / OpenAPI 3.1
OAuth 2.0 (APEX
scope)
99.9% / p99 <200ms
Platform Eng
Agent Invocation API
v1
## Rest + Sse
streaming
IAM / mTLS
99.95% / p99 <3s
Platform Eng
Knowledge Base API
v1
## Rest / Json
IAM / mTLS
99.9% / p99 <500ms
AI/ML Eng
Onboarding API
v1
## Rest / Json
OAuth 2.0
99.5% / p99 <1s
Platform Eng
DEA Query API
v1
## Rest / Json
OAuth 2.0 + MFA
99.9% / <60s
response
Compliance
Chargeback API
v1
## Rest / Json
mTLS
99.9% monthly run
SRE / FinOps
Compliance Report API
v1
## Rest / Json
OAuth 2.0 + MFA
99.5% daily run
Compliance

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 19
TOGAF® — The Open Group
## Phase D
Technology Architecture
Cloud-native infrastructure, security, CI/CD with Layered Verification
## Doc Ref: Tad-Apex-001 | Approved
Multi-Region Deployment Model
Region
Role
Data Scope
Key Platform Services
Regulatory Basis
Region 1 —
Primary (EU/UK)
## Active
## Primary
EU/UK personal +
sensitive data
Kubernetes cluster (multi-AZ); LGTM stack;
agent gateway; vector store; PostgreSQL
multi-AZ; Kafka; Vault; object storage
## (Worm)
## Gdpr, Uk Gdpr,
DORA
Region 2 — DR
(EU)
## Standby /
## Failover
DR replica only; no new
data processing
Kubernetes cluster (standby); object
storage (CRR target); DB replica
DORA Art.11 ICT
resilience; GDPR
Art.32
Region 3 —
Americas
## Active
US/LATAM institutional +
customer data
Mirror of Region 1 topology; independent
control plane and agent gateway
## Ccpa, Lgpd, Finra
(where applicable)
Region 4 —
APAC
## Active
SG/HK/AU customer data
Mirror of Region 1 topology; regional vector
store; local object storage
## Pdpa (Sg), Pipl
(CN), Privacy Act (AU)
Security Architecture
Security Domain
Control
Cloud-Native Implementation
Compliance Basis
Identity & Access
Zero-trust; OIDC
federation; short-lived
credentials for all service
accounts
Service mesh mTLS (Istio/Linkerd);
Kubernetes RBAC; OIDC-based
identity federation
NIST SP 800-207, DORA Art.9
Encryption at
Rest
## Aes-256;
customer-managed keys;
separate CMK per data
classification
HashiCorp Vault or cloud KMS;
365-day automatic key rotation
enforced
GDPR Art.32, ISO 27001
Encryption in
Transit
TLS 1.3 minimum; mTLS
between all internal
services
Istio/Linkerd service mesh enforces
mTLS; ingress enforces TLS 1.3
minimum externally
## Fips 140-2, Dora
Network Isolation
Zero-trust NetworkPolicy;
no public internet egress
from agent runtime pods
Kubernetes NetworkPolicy; egress via
controlled proxy; PrivateLink-equivalent
for cloud API calls
TP-01, Security Policy
Agent Safety
Content guardrail layer;
grounding threshold 0.75;
PII anonymisation
NeMo Guardrails or Guardrails AI;
integrated in agent invocation path
before output to caller
EU AI Act Art.9, BP-02
IaC Security
L1 static analysis on every
commit; no merge on any
HIGH or CRITICAL finding
Checkov + Semgrep + Trivy in CI;
Falco at runtime; OWASP Dependency
Check
CIS Kubernetes, DORA
Prompt Injection
Input sanitisation and
validation on all agent
inputs before model
invocation
Validation middleware in agent
gateway; OWASP LLM Top 10
controls; red-team testing quarterly
OWASP LLM Top 10
Secrets
Management
All secrets in secrets
manager; zero hardcoded
credentials; 90-day
rotation
HashiCorp Vault or cloud-native secrets
manager; Checkov enforces in CI
CIS Kubernetes, DORA
CI/CD Pipeline — Layered Verification Model (L1–L5)

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 20
TOGAF® — The Open Group
Stage
Tools
AI-DLC Role
Gate — Bypassable?
L1 Static
Analysis
Checkov, Semgrep, Trivy,
KICS, yamllint
AI explains failures and proposes
fixes; cannot self-approve
NEVER — pipeline blocks merge; no override
path exists
L2 AI
Explanation
Artefact
AI coding assistant;
explanation stored as PR
artefact (12 months)
AI explains every generated block
before engineer approval;
explanation is retained
NEVER — engineer confirms AI explanation
before approving
L3 Property
Tests
Terratest, pytest-infra,
contract tests
AI generates test bodies; engineer
writes property assertions that
define correctness
NEVER — 100% pass required
RAGAS
Evaluation
Gate
RAGAS eval suite; custom
GlobalCorp eval harness
AI generates adversarial test
cases; regression scored against
baseline
NEVER — >90% score required; regression
blocks merge
Guardrail Test
Suite
NeMo Guardrails test
harness; adversarial prompt
library
AI generates edge-case and
adversarial prompts to test
guardrail coverage
NEVER — 100% pass required
T4 Model Risk
Gate
Ticket-based approval
workflow (Jira / Linear /
equivalent)
AI generates Model Risk evidence
pack draft; Model Risk Lead
reviews and signs
NEVER — human sign-off mandatory; T4
Reg-Gate; no automation path
L4 Canary
Deploy
Argo Rollouts / Flagger;
Prometheus SLO monitoring
AI monitors SLOs in real time;
triggers automatic rollback on
breach
SRE Lead override only; every override logged
with justification
DEA Validation
DEA generation service
completeness check;
validation before production
mark
DEA assembled from all log
sources; completeness validated
NEVER for High-Risk AI agents
Post-Deploy
DORA Record
Argo CD drift detection; cost
tag validator; DORA change
record writer
AI generates stakeholder
summary; DORA change record
auto-created with ARB reference
NEVER — records are mandatory; absence
triggers T4 alert

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 21
TOGAF® — The Open Group
## Phases E–H
Opportunities, Migration, Governance & Change
Roadmap, SBBs, 5-tier governance, and change intelligence
Architecture Roadmap — ROAD-APEX-001
## Doc Ref: Road-Apex-001 | Approved
Work Package
WP
Bolt
s
Wks
Horizo
n
Risk Level
Multi-region Kubernetes, zero-trust IAM,
HashiCorp Vault, network policy
WP-00
H1
Low — well-understood pattern; IaC-automated
AI Agent Orchestration platform: framework
spike, guardrails, KB-001
WP-00
H1
Medium — framework lock-in risk; abstraction
layer required
CI/CD L1–L5 verification + DEA generation
service deployment
WP-00
H1
Medium — DEA service is new pattern; allow spike
time in bolt 1
Security baseline: zero-trust, mTLS,
guardrails layer, Agent Gateway
WP-00
H1
Low — automated; well-understood pattern
LGTM observability stack + agent health
score metrics + alerting
WP-00
H1
Low
Pioneer 1 — Risk Scoring Agent (first full
end-to-end; all gates)
WP-00
H1
HIGH — first end-to-end run; DEA, Model Risk,
RAGAS all first-time; allow buffer
Pioneer 2 — Customer Verification Agent
WP-00
H1
Medium — builds on Pioneer 1 learnings; pattern
established
Pioneer 3 — Advisory Rebalancing Agent
[Programme Risk Gate]
WP-00
H2
Medium — MiFID II HITL adds complexity;
suitability rules in KB-003
Pioneer 4 — IT Incident Response Agent
WP-00
H2
Low — operational domain; fewer regulatory
constraints
Pioneer 5 — Model Monitoring &
Compliance Agent
WP-01
H2
Medium — DORA reporting integration;
cross-domain data access
Self-service portal, agent marketplace,
agent health dashboard
WP-01
H2
Medium — developer experience is subjective; UX
validation needed
EU AI Act compliance pack + DEA template
library + DORA automation
WP-01
H2
High — regulatory interpretation risk; regulatory
counsel required
Solution Building Blocks — SBB-APEX-001
## Doc Ref: Sbb-Apex-001 | Approved
SBB
Decision
Cloud-Native Solution
AI-DLC Role in Delivery
Agent Orchestration
Engine
## Evaluate
OSS
preferred
LangGraph / AutoGen /
CrewAI — evaluated in
WP-002 spike; abstraction
layer prevents lock-in
AI-DLC Construction generates agent YAML, tool definitions,
and action group config
Foundation Models
BUY via pro
vider-agnos
tic adapter
Provider evaluated per task; no
single-vendor lock-in;
LiteLLM-style adapter library in
all agent code
AI-DLC Construction: AI selects model per task type from
pre-approved catalogue updated quarterly
Vector Store
OSS
preferred
Weaviate / Qdrant / Milvus —
Embedding Compatibility
Contract applies
AI-DLC Construction generates index schema, query patterns,
and RAGAS test suite
Agent Control Plane
BUILD
Python FastAPI; Kubernetes; 6
services (ALM, Budget,
Onboarding, Chargeback,
Notification, Compliance)
AI-DLC builds each service in 1 bolt; L1–L5 verification on all
IaC and code

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 22
TOGAF® — The Open Group
SBB
Decision
Cloud-Native Solution
AI-DLC Role in Delivery
DEA Generation
Service
BUILD
Python event-driven service;
Kubernetes; immutable store
AI-DLC builds DEA assembler in 1 bolt; Compliance Lead
reviews output against EU AI Act Art.13
Agent Gateway
BUILD on
OSS
Envoy proxy + custom plugin
OR APISIX + custom plugin
AI-DLC generates gateway config from agent registry schema;
property tests validate enforcement rules
Developer Portal
BUILD
React SPA + API Gateway;
Amplify or equivalent CDN
AI-DLC scaffolds UI components in Mob Construction in 1 bolt;
UX validated with domain dev teams
Human Review
Portal
BUILD on
open
framework
React + Temporal / Camunda
workflow engine
AI-DLC generates workflow JSON definitions; custom UI
mob-built in 1 bolt
LGTM Observability
OSS
OpenTelemetry + Prometheus
+ Grafana + Loki + Tempo (full
LGTM stack)
AI-DLC generates dashboards-as-code (Grafana JSON) from
agent metric schema definition
AI Safety Layer
OSS
NeMo Guardrails or Guardrails
AI; configured per agent EU AI
Act risk tier
AI-DLC generates guardrail rule sets; red-team adversarial tests
AI-generated quarterly
IaC Platform
OSS
## (Reuse)
Terraform / OpenTofu + Argo
CD (GitOps); Terratest for
property tests
AI-DLC extends existing pipeline; Terratest property tests are
mandatory (L3 verification)
Compliance
Reporter
BUILD on
OSS
Python pipeline + Apache
Superset or Metabase
AI-DLC generates EU AI Act and DORA report templates;
DORA change record auto-writer component added
5-Tier Governance Model — CAF-APEX-001
## Doc Ref: Caf-Apex-001 | Approved
Tier
Scope
Method
SLA
Bypassable?
T1 —
Auto
IaC L1 scan; RAGAS score; DEA
completeness; tag compliance;
budget alert
CI pipeline + Kubernetes
admission controllers + scheduled
validation jobs
Synchronous
NO — pipeline physically
blocks; no human override
path
T2 —
Architect
Pattern conformance; new data
flow; data classification audit
Automated flag → architect on-call
(Slack/Teams) within 4-hour SLA
4 business
hours
NO — deployment blocked
until architect approves
T3 —
ARB
New SBB; significant deviation;
agent topology change; debt
threshold breach
Weekly ARB session; async for
urgent items between sessions
Weekly
Exception ONLY: Group CTO
written approval + compliance
register entry; silent bypass is
not possible
T4 —
Reg-Gate
High-Risk AI (EU AI Act Art.6);
DORA-reportable change; any
C4-data flow change
Compliance Lead; no delegation;
Regulatory Affairs Lead engaged
48 hours
NO — hardcoded in CI
pipeline; no exception pathway
exists
T5 —
Exec
Budget above approved threshold;
strategic architecture change;
programme risk escalation
Monthly Steering Committee;
emergency session within 48 hrs
for DORA incidents
Monthly
NO — requires Steering
Committee quorum
Change Intelligence Process — ACHG-APEX-001
DOC REF: ACHG-APEX-001 | APPROVED — DORA Change Framing Applied to All AI Evolution
Change
Type
AI Monitoring
Human Decision
Authority
DORA Framing
Illustrative Example
T1 — Techno
logy-driven
Model release channels
monitored; OSS project feeds;
benchmark auto-run vs.
GlobalCorp eval suite
Enterprise Architect
reviews impact; ARB
approves; T4
Reg-Gate if High-Risk
agent affected
Formal change event
regardless of model
release frequency
Open-weight model outperforms
current by 18%; ARB approves
upgrade in 3 days with RAGAS
regression evidence

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 23
TOGAF® — The Open Group
Change
Type
AI Monitoring
Human Decision
Authority
DORA Framing
Illustrative Example
T2 — Regulat
ory-driven
Regulatory feed parsed daily
by compliance-monitoring
agent; impact classified
against APEX control inventory
Compliance Lead
decides; Regulatory
Affairs Lead engaged
for ambiguous
interpretation
Regulatory change
triggers controlled
response plan; not
reactive patching
EU AI Act Art.6 enforcement date
reached; APEX intake
auto-classification activated; DORA
evidence pack updated same day
T3 — Busine
ss-driven
Onboarding request submitted
via self-service portal; intake
workflow triggered
automatically
ARB intake decision
within 5 business
days; architecture
review within 10
business days
Standard change;
ARB record created;
DORA log entry if
affects Tier-1 service
New Procurement Division
requests APEX onboarding for
contract analysis use case
T4 —
Simplification
Usage analytics flags agents
below utilisation threshold for 3
consecutive months;
auto-review prompt generated
Domain owner
decides:
decommission or
document justification
for retention
Decommission =
formal change event;
IaC teardown + DEA
archive + compliance
record
Pioneer 1 v1.2 superseded by v2.0;
v1.2 parallel-run for 4 weeks then
decommissioned with full evidence
trail

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 24
TOGAF® — The Open Group
## Req Mgmt
Requirements Management — Continuous
Living ARS — 162 total requirements across all phases
Requirements Management is the continuous central process of the TOGAF ADM. AI-DLC's Semantic Context
Building and persistent context storage transform this from a periodic document into a living, AI-maintained traceability
system with a human review gate before every deployment.
DOC REF: ARS-APEX-001 | APPROVED | 162 total requirements
Req ID
Category
Statement
Priorit
y
Source
Status
## Br-001
Business
Platform supports at minimum 120 concurrent agent
interactions per region under normal load
Must
Capacity model
In Design
## Br-003
Business
All agent decisions logged with full context and
queryable for a minimum of 7 years
Must
DORA Art.11
In Design
## Br-006
Business
EU AI Act risk tier automatically classified for every
agent at the point of intake
Must
EU AI Act Art.6
In Design
## Br-007
Business
Productivity gains tracked quarterly against actuals;
reported to Steering Committee
Must
BP-01
In Design
## Dr-001
Data
Personal data never persisted in conversation logs,
session memory, or observability traces
Must
GDPR Art.5
In Design
## Dr-002
Data
Embedding model ID and version stored in data
catalog for every KB; RAGAS gate on any upgrade
Must
DP-05
In Design
## Dr-003
Data
Previous embedding index retained for 90 days
post-upgrade to support rollback
Must
DP-05
In Design
## Ar-001
Application
Agent Control Plane API achieves p99 response
time below 500ms under 500 RPS
Must
SLA Policy
In Design
## Ar-002
Application
DEA generation service produces complete DEA
within 5 seconds; stored immutably for 7 years
Must
TP-06
In Design
## Ar-003
Application
Agent Gateway enforces registry lookup;
unregistered agents receive 403 at gateway
Must
BP-03
In Design
## Tr-001
Technology
All AI model invocations travel exclusively over
private network paths; no public internet egress from
agent pods
Must
## Tp-01 / Tp-02
In Design
## Tr-002
Technology
All AI-generated IaC passes L1–L5 layered
verification; L2 explanation artefact retained 12
months
Must
TP-05
In Design
## Sr-001
Security
Customer-managed encryption keys rotated on a
maximum 365-day cycle; rotation enforced by
automated check
Must
GDPR Art.32
In Design
## Sr-002
Security
Red-team adversarial testing of every agent
completed and documented before production
deployment approval
Must
AI Risk Policy /
## Owasp Llm
In Review
## Cr-001
Compliance
EU AI Act risk classification documented and stored
in agent registry for every agent in all environments
Must
EU AI Act Art.9
In Design
## Cr-002
Compliance
Model explainability method (SHAP, LIME, or
equivalent) documented; evidence artefact
generated before production
Must
EU AI Act Art.13
In Design
## Cr-003
Compliance
DORA 72-hour ICT incident notification workflow
automated and tested quarterly under simulated
conditions
Must
DORA Art.17
In Review
## Cr-004
Compliance
Every High-Risk AI agent produces a DEA for every
regulated decision; DEA queryable by compliance
team
Must
EU AI Act Art.13
/ DEA
In Design

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 25
TOGAF® — The Open Group
Req ID
Category
Statement
Priorit
y
Source
Status
## Cr-005
Compliance
Every AI model update, KB refresh, and agent
topology change recorded as a formal DORA
change event with ARB reference
Must
DORA Art.11
In Design

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 26
TOGAF® — The Open Group
## Appendix A
Regulatory Cross-Reference Matrix
APEX compliance posture across all applicable regulatory frameworks
Regulation
Key Obligations
APEX Architecture Control
Evidence Artefact
EU AI Act
2024/1689
Art.6 (High-Risk classification),
Art.9 (Risk Management
System), Art.13 (Transparency
— addressed by DEA pattern),
Art.17 (Quality Management)
EU AI Act risk classifier at intake
(WP-012); DEA pattern for all High-Risk
agents; RAGAS gate; Model Risk opinion;
DEA export API; explainability artefact in
CI/CD
DEA per regulated decision; EU AI Act
compliance pack (WP-012); Model Risk
Opinions; CI/CD explainability reports
## Dora (Eu)
2025
Art.9 (ICT security policy),
Art.11 (ICT risk management
— all AI changes = controlled
change events), Art.17 (72-hr
incident notification), Art.26
## (Tlpt)
Zero-trust security architecture; DORA
change framing protocol (every AI change
= formal change event with ARB record);
Incident Agent (Pioneer 4); automated
72-hr notification workflow; quarterly
red-team testing
DORA Evidence Pack (quarterly);
DORA change records per AI update;
incident runbook test results; red-team
findings
## Gdpr / Uk
GDPR
Art.5 (data minimisation),
Art.25 (privacy by design —
Phase Boundary Receipts
enforce this), Art.32
(appropriate security), Art.46
(cross-border transfer controls)
PII ANONYMIZE in guardrail layer; data
residency enforced via NetworkPolicy;
AES-256 CMK encryption; agent memory
TTL; Phase Boundary Receipt requires
DPO sign-off before C4 data flows go to
production
Article 30 records of processing; Data
Flow Maps per Pioneer agent;
Guardrail configuration evidence; DPO
sign-off artefacts
Internal Model
Risk (aligned
## Sr 11-7)
Model validation before
production; documentation of
assumptions; ongoing
performance monitoring;
independent review
Model Risk opinion gate (T4 Reg-Gate) in
CI/CD; explainability artefact
(SHAP/LIME); RAG retrieval explanation
in DEA; Model Monitoring Agent (Pioneer
5) for drift detection
Model Risk Opinions per Pioneer
agent; Explainability reports
(SHAP/LIME per model); Drift
monitoring dashboards (Pioneer 5)
## Bcbs 239
Data lineage for risk
aggregation; accuracy,
completeness, and timeliness
of risk data reporting
Data catalog lineage integration; RAG
retrieval log traces every agent decision to
source data; DEA RAG section provides
full lineage chain to regulators and
auditors
Data catalog lineage reports; RAG
retrieval log exports (7-year retention);
DEA RAG retrieval section per
regulated decision
MiFID II Art.27
Best execution obligations;
suitability assessment for
investment advice;
record-keeping for advisory
decisions
Human-in-the-Loop mandatory for all
investment advisory outputs; HITL
outcome written to DEA; KB-003 contains
suitability rules; full session and decision
logging
DEA with HITL section; Suitability
assessment records; Session logs per
advisory interaction; Agent audit trail

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 27
TOGAF® — The Open Group
## Appendix B
Cloud-Native Service Mapping
OSS reference implementations and cloud-provider equivalents
All APEX capabilities are specified using open-source and open-standard references. Cloud-provider managed
equivalents are listed for reference. Provider selection occurs in Phase F based on commercial evaluation, existing
contracts, and regional service availability.
APEX Capability
OSS / Open-Standard
Provider A (AWS)
Provider B (GCP)
Provider C (Azure)
Container
Orchestration
Kubernetes (CNCF)
EKS
GKE
AKS
Serverless Functions
Knative / OpenFaaS
AWS Lambda
Cloud Functions
Azure Functions
Agent Orchestration
LangGraph / AutoGen /
CrewAI
Bedrock Agents
Vertex AI Agents
Azure AI Foundry Agents
Foundation Model API
Ollama (local) / LiteLLM
adapter
Bedrock (Claude,
Titan)
Vertex AI (Gemini,
Claude)
Azure OpenAI (GPT-4o,
o1)
Vector Store
Weaviate / Qdrant / Milvus
OpenSearch
Serverless
AlloyDB + pgvector
Azure AI Search
Object Storage
MinIO (S3-compatible API)
S3
Cloud Storage
Azure Blob Storage
Managed Relational
DB
PostgreSQL
(self-managed on K8s)
Aurora PostgreSQL
Cloud SQL
PostgreSQL
Azure DB for PostgreSQL
Event Streaming
Apache Kafka / Redpanda
Kinesis / MSK
Pub/Sub / Dataflow
Azure Event Hubs /
Service Bus
Workflow Engine
Temporal / Argo
Workflows
Step Functions
Cloud Workflows
Azure Durable Functions
Secrets Management
HashiCorp Vault
AWS Secrets
Manager + KMS
Secret Manager +
Cloud KMS
Azure Key Vault
Metrics
Prometheus (CNCF)
CloudWatch Metrics
Cloud Monitoring
Azure Monitor
Tracing
Jaeger / Grafana Tempo
## (Otel)
AWS X-Ray
Cloud Trace
Azure Application Insights
Logging
Loki / OpenSearch
CloudWatch Logs
Cloud Logging
Azure Monitor Logs
Dashboards
Grafana (CNCF)
CloudWatch
Dashboards
Cloud Monitoring
Dashboards
Azure Dashboards
GitOps / CD
Argo CD / Flux (CNCF)
CodePipeline
Cloud Deploy
Azure DevOps Pipelines
Service Mesh
Istio / Linkerd (CNCF)
AWS App Mesh
Traffic Director
Azure Istio add-on
ML Experiment
Tracking
MLflow
SageMaker
Experiments
Vertex AI
Experiments
Azure ML Experiments
AI Safety / Guardrails
NeMo Guardrails /
Guardrails AI
Bedrock Guardrails
Vertex AI Safety
Filters
Azure AI Content Safety
IaC
Terraform / OpenTofu +
Terratest
## Aws Cdk /
CloudFormation
Deployment
Manager
Bicep / ARM Templates
Progressive Delivery
Argo Rollouts / Flagger
CodeDeploy
Cloud Deploy
canary
Azure Deployment
Strategies
Agent Gateway
Envoy + plugin / APISIX +
plugin
API Gateway +
Lambda authoriser
Apigee + custom
policy
API Management + policy
IaC Security (L1)
Checkov + Semgrep +
Trivy
CodeGuru +
Inspector
Artifact Registry
scanning
Defender for DevOps
Runtime Security
Falco (CNCF)
GuardDuty
Security Command
Center
Defender for Containers

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 28
TOGAF® — The Open Group
APEX Capability
OSS / Open-Standard
Provider A (AWS)
Provider B (GCP)
Provider C (Azure)
DEA Store
PostgreSQL + object
storage (WORM) + Athena
S3 Object Lock +
Athena
Cloud Storage
(locked) + BigQuery
Azure Immutable Blob +
Synapse

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 29
TOGAF® — The Open Group
## Appendix C
Glossary
Complete reference — TOGAF 10, AI-DLC, cloud-native, team, and regulatory
ADM
Architecture Development Method — the iterative process at the core of TOGAF 10; all phases can run
concurrently or be scoped independently based on programme needs.
Adaptive Capability
A business capability whose behaviour changes continuously through AI learning; requires dynamic
governance distinct from static capabilities, including DORA change framing for every evolution.
Agent Gateway
Platform component that enforces agent registry lookup, budget hard-throttle at 110%, dependency-map
logging, and blocks unregistered agents (403 response) before any model invocation.
Agent Health Score
Monthly composite score per agent: usage volume, error rate, cost-per-decision, human escalation rate;
agents below threshold flagged for decommission review.
## Ai-Dlc
AI-Driven Development Lifecycle — AWS methodology (July 2025) positioning AI as central collaborator;
three phases: Inception (Mob Elaboration), Construction (Mob Construction), Operations.
APEX
AI Platform of Platforms — GlobalCorp's programme to build a shared, governed, cloud-native AI agent
platform eliminating siloed AI tool sprawl.
ARB
Architecture Review Board — governance body that approves architecture decisions, manages
conformance, and maintains architecture principles; meets weekly under AI-DLC cadence.
Bolt
AI-DLC development cycle measured in hours to days; replaces the Agile sprint. APEX planning baseline:
1 bolt ≈ 1–2 weeks for Pioneer Domain agents including governance gates.
CNCF
Cloud Native Computing Foundation — open-source foundation hosting Kubernetes, Prometheus,
OpenTelemetry, Argo CD, Falco, Istio, and other APEX-standard technologies.
Data Maturity Gate
Mandatory pre-Phase B assessment: 5 checks covering documentation currency, process coverage, data
lineage completeness, terminology consistency, and architecture debt baseline.
DEA
Decision Explanation Artefact — structured record of every component of a regulated AI decision: routing,
RAG retrieval, model invocation, guardrail evaluation, output, and HITL outcome (if applicable). 7-year
retention. Addresses EU AI Act Art.13.
DORA
EU Digital Operational Resilience Act — requires ICT risk management, 72-hour major incident
notification, and TLPT. APEX treats all AI evolution as formal DORA change events.
Embedding Compatibility
Contract
Governance rule requiring that any embedding model upgrade triggers full re-indexing of all dependent
KBs and must pass a RAGAS regression gate before production activation.
EU AI Act
EU Regulation 2024/1689 — classifies AI systems by risk; mandates transparency (Art.13, addressed by
DEA), human oversight, explainability, and quality management for High-Risk systems.
GitOps
Operational model where infrastructure and application desired state is declared in Git and continuously
reconciled by an automated operator (Argo CD or Flux).
Guardrails
Content safety layer intercepting agent inputs/outputs; enforces PII anonymisation, topic filtering, and
grounding checks; grounding threshold 0.75 non-negotiable.
HITL
Human-in-the-Loop — architecture pattern routing agent outputs above a risk threshold to a human
reviewer; HITL outcome is written into the DEA.
Layered Verification Model
Five-layer IaC and code verification: L1 static analysis, L2 AI explanation artefact, L3 property tests, L4
canary deploy, L5 drift detection; replaces single-person hero review.
LGTM Stack
Loki + Grafana + Tempo + Mimir (or Prometheus) — the open-source observability stack standard for all
APEX agents.
Mob Construction
AI-DLC ritual where the full cross-functional team builds solution components — architecture, IaC, code,
tests — in a shared real-time session with AI as collaborator.
Mob Elaboration
AI-DLC ritual transforming business intent into requirements, capability maps, and architecture units; must
be preceded by a political context capture session to capture what AI cannot.
OpenTofu
Open-source fork of Terraform under Linux Foundation / CNCF; OSS alternative without BSL licence
constraints; APEX preferred IaC standard.
Phase Boundary Receipt
Formal evidence artefact confirming minimum sign-off criteria for a TOGAF phase boundary are met; DPO
sign-off required before C4 data flows transition from Phase C to Phase D production.
RAGAS
RAG Assessment framework — measures faithfulness, answer relevance, context recall, and context
precision; used as the regression gate for all KB and embedding model changes.
SAW
Statement of Architecture Work — TOGAF artefact formally initiating an architecture engagement; defines
scope, constraints, resources, milestones, and is signed by executive sponsor.

APEX: AI Platform of Platforms | TOGAF 10 + AI-DLC | Cloud-Native | Final Edition
GlobalCorp Enterprises | CONFIDENTIAL
EA-APEX-MASTER-001 | April 2026
Page 30
TOGAF® — The Open Group
SBB
Solution Building Block — specific implementation of an Architecture Building Block; defines what is built,
bought, or reused for a given platform capability.
Semantic Context
AI-DLC concept: rich, structured context provided to AI coding agents through steering files so they apply
GlobalCorp-specific standards automatically and consistently.
TLPT
Threat-Led Penetration Testing — DORA Art.26 obligation for major entities; GlobalCorp APEX conducts
TLPT quarterly for the agent gateway and core platform components.
Unit of Work
AI-DLC equivalent of an Agile Epic; decomposed into bolts. APEX planning baseline: 1 Unit of Work for a
Pioneer Domain agent = 3 bolts ≈ 6–8 calendar weeks including governance gates.
Zero-Trust
Security model where no identity or network location is inherently trusted; every request is authenticated,
authorised, and logged regardless of origin; enforced by service mesh mTLS.
Document Control
Versio
n
Issue Date
Authors
Description
Approved By
1.0
January 2025
Enterprise Architecture
Team
Initial release — TOGAF 10 ADM phases A–D
Architecture
Review Board
2.0
March 2025
Enterprise Architecture
Team
Full ADM coverage; Architecture Contracts; Governance
model added
Group CTO
3.0
April 2026
Enterprise Architecture
Team
Cloud-native edition (vendor-agnostic); AI-DLC integrated;
table formatting improved
Group CTO
4.0 —
FINAL
April 2026
Enterprise Architecture
Team
Final edition: team structure added (org model, core team
register, RACI: Agent Lifecycle, RACI: Platform
Governance, RACI: Regulatory, Responsibility
Assignment Matrix, Stakeholder Map, Team Interaction
Map); DEA service; Agent Gateway; Embedding
Compatibility Contract; Data Maturity Gate; Phase
Boundary Receipts; DORA change framing; Layered
Verification Model; Agent Sprawl governance; 19
requirements; 24-entry Cloud-Native Service Mapping; full
glossary
Group CTO
TOGAF® is a registered trademark of The Open Group. EU AI Act, DORA, GDPR, MiFID II, and BCBS 239 are legislative instruments of their
respective issuing bodies. All product names mentioned as cloud-provider equivalents are trademarks of their respective owners. CNCF and
its hosted project names are trademarks of the Linux Foundation. This document is CONFIDENTIAL and the property of GlobalCorp
Enterprises Enterprise Architecture. © 2026 GlobalCorp Enterprises. All rights reserved.
