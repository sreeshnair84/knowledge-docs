---
title: "Operating Model & Security Maturity Roadmap"
date_created: 2026-07-11
last_reviewed: 2026-07-11
status: current
supersedes: ""
source_type: converted-pdf
source_file: "06-Operating-Model-Maturity-Roadmap.pdf"
tags: ["ai-security", "operating-model", "maturity", "roadmap"]
---
# **Operating Model, Maturity Model & 24Month Roadmap**

Enterprise Agent Operating Model, Maturity Levels, Security Review Checklists, Principal Architect Interview Guide, and the Learning Path

**Document Code:** EASA-06 **Version:** 1.0 **Date:** June 2026

**Scope:** Domain 22 & Program Deliverables

*Enterprise Agentic AI Security Architect (2026–2030) Master Research Program*

## **Table of Contents**

## **Executive Summary**

The first five volumes of this program answered "what does a secure, governed agentic AI ecosystem look like." This volume answers the harder organizational question: who builds it, who runs it, how is success measured, and in what order should an enterprise actually do this work given finite budget and finite people. It closes the program with the operating model (Domain 22), a five-level maturity model the enterprise can use to self-assess and to set a realistic multi-year target, a consolidated set of review checklists, an interview guide for hiring into this role, and a curated learning path — because the most sophisticated reference architecture in the world is only as good as the organization's ability to staff, govern, and continuously operate it.

## **Domain 22 — Enterprise Agent Operating Model**

No single team owns agentic AI security end to end, and attempting to build one monolithic team is a common and costly early mistake. The operating model this program specifies distributes accountability across five functions, deliberately mirroring how mature organizations already split traditional cybersecurity, cloud platform engineering, and data governance — because reporting agentic AI risk through entirely new, parallel structures tends to isolate it from the rest of the enterprise's risk management muscle rather than integrating with it.

### **22.1 The Five Functions**

|**Functon**|**Primary Mandate**|**Reports Into / Coordinates With**|
|---|---|---|
|AI Governance<br>Board|Sets policy, approves autonomy-level thresholds,<br>owns the framework crosswalk (Volume 3,<br>Domain 3.6), and is the fnal escalaton point for<br>risk acceptance decisions on individual agents|Chaired by the AI CISO; includes Legal,<br>Compliance, Enterprise Architecture, and<br>business-unit risk owners|
|AI Security Ofce|Owns the architecture and policy specifed in<br>Volumes 1–3: identty substrate, MCP/A2A<br>gateways, governance fabric, supply-chain<br>controls|Reports to the AI CISO; works day-to-day<br>with Platorm Engineering on<br>implementaton|
|Agent Operatons<br>Team|Day-to-day agent lifecycle management:<br>registraton, provisioning, autonomy-level<br>changes, retrement — operatonalizing the Agent<br>Registry (Volume 3, Domain 14)|Reports to the AI Platorm Architect; the<br>team accountable for the Agent<br>Registry's accuracy|
|Platorm Engineering<br>Team|Builds and operates the runtme, gateways, and<br>mesh infrastructure (Volume 1, Domains 7 and 20;<br>Volume 2 MCP/A2A gateways)|Reports to the AI Platorm Architect; the<br>engineering counterpart to the AI<br>Security Ofce's policy|
|AI SOC|Contnuous monitoring, detecton, and incident<br>response (Volume 4, Domain 10), including<br>operatng the kill-switch framework|Reports to the AI CISO, typically<br>integrated into or co-located with the<br>existng enterprise SOC|
|Red Team|Adversarial testng (Volume 4, Domain 12),<br>feeding purple-team fndings back into the AI<br>SOC's detecton logic|Reports to the AI CISO, organizatonally<br>independent from the AI Security Ofce<br>to preserve adversarial objectvity|

### **22.2 RACI — Core Program Activities**

|**Actvity**|**AI Gov.**<br>**Board**|**AI Security**<br>**Ofce**|**Agent Ops**|**Platorm**<br>**Eng.**|**AI SOC**|**Red Team**|
|---|---|---|---|---|---|---|
|Approve new agent<br>autonomy level ≥ L3|A|C|R|I|I|I|
|Defne identty & MCP/A2A<br>policy|C|A/R|I|C|I|I|

|**Actvity**|**AI Gov.**<br>**Board**|**AI Security**<br>**Ofce**|**Agent Ops**|**Platorm**<br>**Eng.**|**AI SOC**|**Red Team**|
|---|---|---|---|---|---|---|
|Build & operate gateways<br>and mesh|I|C|I|A/R|C|I|
|Maintain Agent Registry|I|C|A/R|I|C|I|
|Monitor & triage security<br>incidents|I|C|C|C|A/R|I|
|Execute kill switch|I|C|C|C|A/R|I|
|Conduct red/purple team<br>exercises|I|C|I|C|C|A/R|
|Regulatory fling / incident<br>reportng|A|C|I|I|R|I|
|Quarterly risk reportng to<br>board|A/R|C|I|I|C|I|

R = Responsible, A = Accountable, C = Consulted, I = Informed.

### **22.3 KPIs**

|**KPI**|**Target Directon**|**Primary Source**|
|---|---|---|
|% of actve agents with complete Agent Registry<br>entries|↑ toward 100%|Agent Registry audit (Volume 3, Domain<br>14)|
|% of agents with standing (non-ephemeral)<br>credentals|↓ toward 0%|Identty substrate audit (Volume 2, Domain<br>2)|
|Mean tme to detect (MTTD) an ASI-mapped<br>incident|↓|AI SOC (Volume 4, Domain 10)|
|Mean tme to contain (MTTC) via kill switch|↓|AI SOC incident logs|
|Goal conformance rate (feet average)|↑|Agent Reliability Engineering (Volume 4,<br>Domain 19)|
|% of red-team fndings with a corresponding<br>purple-team detecton patern shipped|↑ toward 100%|Purple Team tracking (Volume 4, Domain<br>12.2)|
|% of MCP servers / A2A peers passing gateway<br>validaton on frst registraton atempt|Track trend, not a<br>target directon in<br>isolaton|MCP/A2A gateway logs (Volume 2)|
|Framework crosswalk coverage (regulatons with<br>current, evidenced control mapping)|↑ toward 100%|AI Governance Board (Volume 3, Domain<br>11)|

## **Enterprise Agent Maturity Model (Levels 1–5)**

Use this model for honest self-assessment, not for marketing the program internally. Most enterprises deploying agents in production today, including ones with significant AI investment, sit at Level 1 or the early part of Level 2 — current CSA and NIST research on the state of agent identity (Volume 2, Domain 2) is consistent on this point: authentication is largely solved with static credentials, while authorization, lifecycle management, and governance are not.

|**Lev**<br>**el**|**Designaton**|**Characteristc State**|**Identty Patern**|**Governance Patern**|
|---|---|---|---|---|
|1|Ad Hoc|Agents deployed by<br>individual teams with no<br>central inventory; security is<br>whatever the deploying team<br>happened to implement|Statc API keys, shared<br>service accounts|No central registry; no formal<br>autonomy-level concept|
|2|Aware|A central team has visibility<br>into most agents and has<br>begun applying baseline<br>controls, but enforcement is<br>inconsistent across business<br>units|Mix of statc credentals<br>and early workload-<br>identty pilots|Agent Registry exists but is<br>incomplete; manual, periodic<br>review|
|3|Managed|Identty substrate (SPIFFE or<br>equivalent) and MCP/A2A<br>gateways are deployed<br>organizaton-wide; the Agent<br>Registry is the authoritatve<br>source of truth; autonomy<br>levels are assigned and<br>enforced|Ephemeral, workload-<br>identty-issued<br>credentals as the<br>default|Framework crosswalk operatng;<br>AI Governance Board meets on a<br>regular cadence|
|4|Measured|Agent Reliability Engineering<br>SLIs/SLOs are operatng; AI<br>SOC correlates across all<br>seven monitored surfaces<br>(Volume 4, Domain 10.2); kill-<br>switch and FinOps circuit<br>breakers are unifed and<br>tested|Trust-score-informed<br>dynamic authorizaton<br>(Volume 3, Domain 13)<br>layered on identty|Purple-team loop closed; KPIs<br>reported quarterly to the board<br>with trend data, not point-in-<br>tme snapshots|
|5|Optmizing|Post-quantum-ready identty<br>and payment infrastructure;<br>agent trust extends to<br>verifed external<br>counterpartes via<br>decentralized identty /<br>verifable credentals; the<br>program contributes back to<br>industry standards bodies|Hybrid classical/PQC<br>credentals; verifable-<br>credental-based<br>external trust|Governance model antcipates<br>regulatory change rather than<br>reactng to it; the enterprise is a<br>reference case other<br>organizatons benchmark against|

|**Lev**<br>**el**|**Designaton**|**Characteristc State**|**Identty Patern**|**Governance Patern**|
|---|---|---|---|---|
|||rather than only consuming<br>them|||

## **Security Review Checklists**

These are intentionally condensed to the highest-leverage items from each volume — gate checklists for the two moments that matter most: approving a new agent for production, and approving a new MCP server or A2A counterparty for connection. Each should be backed by the full control detail in the referenced volume; treat this as the pass/fail gate, not the complete control set.

### **New Agent Production Readiness Checklist**

- **☐ Identity —** Agent has a SPIFFE SVID or equivalent workload identity; no static, long-lived credentials present (Volume 2, Domain 2).

- **☐ Registry —** Agent Registry entry complete: purpose, sponsor, autonomy level, scoped tools (Volume 3, Domain 14).

- **☐ Least Agency —** Autonomy level matches a documented risk classification; no standing access beyond what the level requires (Volume 1, Domain 1; Volume 3, Domain 14).

- **☐ Threat model —** MAESTRO-based threat model completed and reviewed for this agent's architecture pattern (Volume 1, Domain 1.5).

- **☐ Runtime isolation —** Sandboxing tier assigned matches the agent's trust-boundary exposure (Volume 1, Domain 7.1).

- **☐ Tool scope —** Every tool/MCP connection passes gateway validation; no direct, unmediated credentials held by the agent (Volume 2, Domain 5.4).

- **☐ Memory governance —** Memory writes are classified and provenance-tagged at write time; retention policy assigned (Volume 4, Domain 9.3).

- **☐ Human oversight —** Approval gates defined for any irreversible or high-consequence action regardless of trust score (Volume 3, Domain 13.3).

- **☐ Observability —** Agent is instrumented to the OpenTelemetry/OpenLLMetry standard and visible to the AI SOC (Volume 4, Domain 10).

- **☐ Reliability —** SLIs/SLOs defined with an error-budget-triggered autonomy downgrade path (Volume 4, Domain 19.2).

- **☐ FinOps —** Budget envelope and spend-velocity anomaly detection configured (Volume 5, Domain 15.2).

- **☐ Kill switch —** Tested, identity-layer kill-switch capability confirmed before go-live (Volume 3, Domain 14.3).

- **☐ Compliance crosswalk —** Agent's risk tier mapped against applicable regulation (EU AI Act Annex III high-risk status, DORA, PCI DSS, GDPR memory implications) (Volume 3, Domain 3.6).

### **New MCP Server / A2A Counterparty Connection Checklist**

- **☐ Provenance —** Server/agent publisher identity verified; for A2A, Agent Card signature cryptographically verified against the claimed domain (Volume 2, Domain 6.1).

- **☐ Scanning —** Tool definitions and descriptions scanned for hidden-instruction / poisoning patterns prior to registration (Volume 2, Domain 5.3).

- **☐ Schema validation —** Discovery-time and invocation-time schema validation both configured at the gateway, not discovery-time only (Volume 2, Domain 5.4).

- **☐ Transport —** mTLS enforced; unauthenticated transport rejected by default policy (Volume 2, Domains 5.4 and 6.3).

- **☐ Tool signing —** Tool signatures verified where supported; re-verification triggers configured to catch "rug pull" post-install modification (Volume 2, Domain 5.2).

- **☐ Tenant isolation —** Multi-tenant servers confirmed to enforce session and credential isolation between tenants (Volume 2, Domain 5.2).

- **☐ Trust broker —** External A2A counterparty has an assigned trust score and recorded trust relationship before any production task delegation (Volume 3, Domain 13.2).

- **☐ Spend caps —** Per-task spend caps configured for any counterparty connection capable of initiating cost or financial transactions (Volume 5, Domains 15 and 16).

- **☐ Audit logging —** Tamper-evident logging confirmed operational for the new connection before production traffic flows (Volume 2, Domains 5.4 and 6.3).

- **☐ Supply chain —** Component recorded in the AI BOM with applicable provenance documentation (Model Card / Agent Card) (Volume 3, Domain 17).

## **Principal Architect Interview Guide**

These questions are designed to distinguish candidates who have absorbed current best practice from those who can reason architecturally about a fast-moving, still-converging field — the latter matters more, because much of the specific tooling and even some of the standards referenced in this program will have moved by the time a hire is six months into the role.

#### **Architecture & Threat Modeling**

1. Walk me through how you would threat-model a multi-agent system using MAESTRO, and specifically describe a cross-layer threat that a single-layer review would miss.

2. An agent has a clean identity, a clean trust score, and has behaved correctly for six months. Describe a realistic attack path that still succeeds against this agent, and what control would have caught it.

3. When would you choose Firecracker over gVisor over WASM for sandboxing an agent's tool execution, and what's the wrong reason to choose one over another?

#### **Identity & Trust**

1. Explain the difference between authenticating a workload and authorizing an action, and describe a real architecture where conflating the two created a vulnerability.

2. How would you design compound identity for an agent acting on behalf of a suspended user account, and what should happen?

3. What is the structural limitation of SPIFFE for agent security, and what has to be layered on top of it?

#### **MCP / A2A**

1. Describe tool poisoning in your own words, and explain why discovery-time schema validation alone is insufficient to prevent it.

2. A vendor pitches an MCP server with no gateway in front of it, claiming their server is "secure by design." What is your response, and what would you require before connecting it?

3. What changed in A2A v1.0 that materially improved enterprise trust in the protocol, and what gap still remains even with that change?

#### **Governance & Judgment**

1. A business unit wants to deploy an L4 (full autonomy) agent against a use case you believe should be L2. Walk me through how you'd handle that conversation.

2. How do you decide which emerging framework (a new OWASP sub-project, a new IETF draft, a new vendor "standard") is worth building architecture around versus tracking and waiting?

3. Describe an incident where a reliability problem and a security problem were actually the same underlying issue, and how your operating model would surface that connection rather than splitting it across two teams.

## **24-Month Learning & Implementation Roadmap**

This roadmap is sequenced for an enterprise architect or security architect building both their own expertise and the organization's capability simultaneously — the realistic situation most readers of this program are in, rather than joining an already-mature function.

### **Months 1–3: Foundation**

- Complete Volume 1 (Foundations & Reference Architecture) and produce the Agent Security Architecture Repository for at least one business unit as a pilot.

- Stand up an Agent Registry, even a minimal one, and run a discovery exercise to find every agent currently running in the enterprise — the inventory gap is almost always larger than expected.

- Begin or accelerate ISO 42001 gap analysis (Volume 3, Domain 3.6), particularly if any system may fall under EU AI Act Annex III high-risk classification given the August 2026 enforcement milestone.

### **Months 4–9: Identity & Protocol Security**

- Deploy or extend a SPIFFE/SPIRE trust domain to cover agent workloads (Volume 2, Domain 2).

- Stand up an MCP gateway with the five-stage validation pipeline (Volume 2, Domain 5.4) for at least the highest-risk tool integrations.

- Establish the AI Governance Board and produce the first version of the framework crosswalk (Volume 3, Domains 3.6 and 11).

- Define the five-level autonomy taxonomy and retroactively classify every registered agent (Volume 3, Domain 14.2).

### **Months 10–15: Operations & Resilience**

- Stand up the AI SOC's cross-surface correlation capability, even in an early form, on top of an existing observability platform (Volume 4, Domain 10).

- Run the first red team exercise mapped explicitly against the OWASP ASI Top 10, and close the loop with the first purple-team detection patterns (Volume 4, Domain 12).

- Define and begin tracking the first Agent Reliability Engineering SLIs/SLOs (Volume 4, Domain 19).

- Build and test the unified kill-switch / circuit-breaker mechanism spanning both security and FinOps triggers (Volume 5, Domain 15.2).

### **Months 16–24: Scale & Future-Proofing**

- Extend the A2A gateway and trust-broker infrastructure to cover external counterparties, if the enterprise's use cases require cross-organization agent collaboration (Volume 2, Domain 6.3; Volume 3, Domain 13.2).

- Pilot delegated agent spending under AP2 or an equivalent payment-mandate protocol for a bounded, low-risk use case, with full FinOps and cognitive-security controls in place first (Volume 5, Domain 16).

- Begin architecting crypto-agility into every new identity, MCP, A2A, and payment-mandate component (Volume 5, Domain 21) — not a full PQC migration, but ensuring nothing built in this window becomes a forklift-upgrade liability later.

- Conduct a full maturity-model self-assessment against the five-level model in this volume and set the explicit, board-approved target maturity level for the following 24 months.

## **Certifications, Standards, and Communities to Track**

### **Certifications**

|**Certfcaton**|**Focus**|**Best Fit**|
|---|---|---|
|CAISP (Certfed AI Security<br>Professional, Practcal DevSecOps)|Full-stack AI security: prompt injecton,<br>NIST AI RMF alignment, AI red teaming,<br>OWASP LLM Top 10 and agentc atack<br>paterns|Security professionals and<br>architects wantng balanced<br>ofense/defense/governance<br>coverage; widely cited as the<br>broadest single AI security<br>credental as of 2026|
|COASP (Certfed Ofensive AI Security<br>Professional, EC-Council)|Pure ofensive specializaton: AI atack-<br>surface mapping, adversarial ML, agentc<br>exploitaton, AI incident response|Experienced red teamers adding<br>AI-specifc ofensive skills|
|OSAI (OfSec)|Ofensive AI techniques with an<br>extended, exam-style endurance<br>assessment|Practtoners who already hold<br>OfSec credentals and want AI-<br>specifc depth|
|||GRC professionals, privacy<br>|
|AIGP (AI Governance Professional,<br>IAPP)|Policy, compliance, and risk management<br>rather than technical security|ofcers, and AI Governance<br>Board members rather than<br>hands-on architects|

AI security roles are commanding meaningfully elevated compensation as of 2026, reported in the roughly $150,000–$290,000 range depending on seniority and specialization, reflecting both the acute skills shortage and the speed at which the field is professionalizing.

### **Standards Bodies and Initiatives to Track Directly**

- OWASP GenAI Security Project — genai.owasp.org — primary source for the ASI Top 10, the emerging MCP Top 10, the Agentic Skills Top 10, and the AIBOM Generator initiative.

- Cloud Security Alliance — the MAESTRO framework and ongoing CSA research notes on agent identity and NHI.

- NIST AI Agent Standards Initiative and NCCoE agent identity concept paper — track for the eventual interoperability profile (expected Q4 2026 draft).

- IETF WIMSE working group — workload-identity-to-workload-identity authentication standards underpinning the AIMS draft architecture (Volume 2, Domain 2.3).

- Linux Foundation Agent2Agent Protocol Project — the neutral governance body for A2A since Google's June 2025 donation.

- FIDO Alliance Payments Technical Working Group — now governing AP2's standards-track evolution, including its post-quantum profile.

- MITRE ATLAS — atlas.mitre.org — continuously updated adversary-tactics knowledge base for AI-specific techniques.

### **Open-Source Tooling and Repositories Worth Evaluating**

- SPIFFE/SPIRE (CNCF) — the reference workload-identity implementation underpinning Volume 2's identity architecture.

- OWASP MCP-Scan and equivalent scanners (Cisco mcp-scanner, Snyk agent-scan) — pre-deployment MCP tool scanning.

- OpenLLMetry / Traceloop — vendor-neutral OpenTelemetry instrumentation for agent and LLM traces.

- MAESTRO threat-modeling tooling (Cloud Security Alliance GitHub) — AI-assisted, layer-by-layer threat identification aligned to the seven-layer reference architecture.

- Promptfoo and DeepTeam — open-source red-teaming frameworks with test suites mapped directly to the OWASP ASI Top 10.

- Open Policy Agent (OPA) and Cedar — the two leading policy-engine choices for the centralized authorization layer specified throughout this program.

## **Closing Note: How to Use This Program**

Six volumes, twenty-two domains, and a stack of checklists are only useful if they change what gets built and funded. The single most consequential decision a reader of this program can make is the one flagged at the close of Volume 2: fund the identity substrate first. Almost everything else in this program — MCP gateway policy, A2A trust brokering, agent registry enforcement, FinOps circuit breakers, even post-quantum migration — becomes simpler, cheaper, and more defensible once every agent, tool, and peer in the ecosystem carries a verifiable, ephemeral, centrally governed identity. Build that first, build the governance fabric around it second, and treat the remaining domains in this program as the detailed specification for what to do once that foundation is in place — not as a checklist to attack in parallel from a standing start.

*This program reflects the state of a genuinely fast-moving field as of June 2026. Treat the architectural patterns — identity-first design, centralized gateways, layered threat modeling, autonomy earned rather than granted by default — as durable. Treat the specific vendor names, protocol version numbers, and standards-body timelines as a snapshot to be re-verified against current sources before any major investment decision.*
