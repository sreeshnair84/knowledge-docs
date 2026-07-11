---
title: "Artifact Catalog & Quality Attributes"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Volume4_Artifact_Catalog_Quality_Attributes.pdf"
doc_type: guide
tags: ["enterprise-architecture"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# **Artifact Catalog & Quality Attributes** 

Every artifact an Architecture Review Board should expect to see — purpose, owner, consumers, lifecycle, and automation — paired with a modern quality attribute taxonomy that goes beyond generic NFRs to cover AI explainability, agent reliability, and memory consistency. 

Enterprise Architecture Review Board Handbook · Banking & Financial Services Edition 

## **Part A — The Complete Artifact Catalog** 

An ARB that doesn't have a clear, enforced artifact catalog ends up with wildly inconsistent submission quality — some teams over-document trivial decisions, others under-document significant ones, and reviewers waste cycles asking for missing information rather than evaluating substance. This catalog defines what "good" looks like for every artifact a mature banking ARB should expect across the full lifecycle, from business case through retirement. 

#### **HOW TO READ THIS CATALOG** 

Each artifact entry covers five dimensions: **Purpose** (what decision or understanding it enables), **Owner** (who is accountable for its accuracy), **Consumers** (who relies on it), **Lifecycle** (when it's created, updated, retired), and **Automation** (whether and how it can be generated or validated automatically rather than hand-maintained). 

### **7.1 Strategy & Vision Artifacts** 

|**Artifact**|**Purpose**|**Owner**|**Consumers**|**Automation**|
|---|---|---|---|---|
|**Business Case**|Justifies investment with cost,<br>benefit, and risk quantification|Business sponsor|Executive<br>Steering<br>Committee,<br>Finance|Low — fundamentally a judgment<br>artifact, though cost models can pull<br>from FinOps tooling|
|**Vision Document**|Articulates the desired future state<br>and why it matters strategically|Business sponsor +<br>Chief Architect<br>(joint)|ARB, delivery<br>teams, broader<br>organization|None — narrative artifact|
|**Architecture Vision**|Translates business vision into<br>target architecture direction and<br>guiding principles|Chief Architect /<br>Lead Solution<br>Architect|ARB, all<br>contributing<br>architects|Low — references the pattern catalog<br>and reference architectures from<br>Volume 3|
|**Capability Map**|Traces the initiative to business<br>capabilities affected (see Volume 3,<br>Part B)|Business capability<br>owner + Enterprise<br>Architect|ARB, capability<br>redundancy<br>analysis|Medium — generated/updated from the<br>knowledge graph|

### **7.2 Architecture Description Artifacts** 

|**Artifact**|**Purpose**|**Owner**|**Consumers**|**Automation**|
|---|---|---|---|---|
|**Context Diagram**|Shows the system's boundary and<br>external interactions (C4 Level 1 or<br>equivalent)|Solution<br>Architect|ARB,<br>integration<br>partner<br>teams|Medium — can be partially generated from API<br>gateway/service mesh metadata|
|**Container Diagram**|Shows the major deployable units and<br>their interactions (C4 Level 2)|Solution<br>Architect|ARB,<br>delivery<br>team,<br>operations|Medium — generatable from infrastructure-as-<br>code definitions|
|**Deployment**<br>**Diagram**|Maps the architecture onto<br>physical/cloud infrastructure<br>topology|Cloud/Platform<br>Architect|ARB, CCoE,<br>operations,<br>security|High — should be generated directly from IaC<br>(Terraform/CloudFormation) rather than hand-<br>drawn, to guarantee accuracy|
|**Threat Model**|Identifies attack surfaces, threat<br>actors, and mitigations (e.g., STRIDE-<br>based analysis)|Security<br>Architect|Cyber<br>Security<br>Council,<br>ARB|Medium — threat modeling tools can pre-populate<br>from architecture diagrams, but expert review<br>remains essential|

### **7.3 Decision & Risk Artifacts** 

|**Artifact**|**Purpose**|**Owner**||**Consumers**|**Automation**|
|---|---|---|---|---|---|
|**ADR (Architecture**<br>**Decision Record)**|Captures a single significant decision<br>its context, options considered, and<br>rationale|,<br>Decision-<br>architect|making|ARB, future<br>architects (via<br>knowledge<br>graph), auditors|Medium — AI-assisted drafting<br>from decision context is<br>increasingly viable (see Volume 7)|
|**Risk Register**|Tracks identified architectural and<br>technology risks with likelihood,<br>impact, and mitigation status|Risk owne<br>Solution A<br>escalating<br>function f<br>risks)|r (often the<br>rchitect,<br>to Risk<br>or material|ARB, Risk<br>Committee,<br>Internal Audit|Medium — risk scoring can be<br>templated; identification requires<br>human judgment|
|**Decision Log**|Chronological record of all ARB<br>decisions, distinct from individual<br>ADRs — the meeting-level audit trail|ARB Secr|etariat / Chair|Auditors, Risk<br>Committee, new<br>ARB members<br>onboarding|High — should be a direct,<br>automatically timestamped system<br>output, not manually transcribed|
|**Compliance Matrix**|Maps architecture decisions/controls<br>to specific regulatory requirements<br>(see Volume 6 for banking-specific<br>regulatory mapping)|<br>Complian<br>Risk & Co<br>liaison|ce Architect /<br>mpliance|Regulators,<br>Internal Audit,<br>Risk Committee|Medium — control-to-regulation<br>mapping can be templated and<br>reused across initiatives in the<br>same regulatory domain|
|**7.4 Integrati**<br>**Artifact**|**on & Interface Artifac**<br>**Purpose**<br>|**ts**<br>**Owner**|**Consumers**|**Automation**||
|**Integration**<br>**Contract**|Defines the agreed interface,<br>data, and behavioral contract<br>between two systems/teams<br><br><br><br><br>|Both<br>integrating<br>teams<br>(jointly<br>owned)|ARB, both<br>delivery teams,<br>testing/QA|High — contrac<br>compliance aut<br>approval|t testing tooling can validate<br>omatically and continuously post-|
|**API Specification**|Formal, typically<br>OpenAPI/Swagger-based<br>definition of a REST API's<br>structure and behavior<br><br>|API-owning<br>team|API consumers,<br>API gateway,<br>developer porta|l<br>High — should<br>gateway and do<br>not a parallel h|be the literal source of truth the<br>cumentation are generated from,<br>and-maintained document|
|**AsyncAPI**|Equivalent specification standard<br>for event-driven/asynchronous<br>interfaces<br><br><br>|Event-<br>publishing<br>team|Event<br>consumers,<br>event<br>catalog/registry|High — same p<br>to event schem|rinciple as API Specification, applied<br>as|

### **7.5 AI-Specific Artifacts** 

|**Artifact**|**Purpose**|**Owner**|**Consumers**|**Automation**|
|---|---|---|---|---|
|**Prompt Library**|Versioned, tested collection of system<br>prompts and prompt templates used in<br>production AI features|AI<br>Solution<br>Architect /<br>Prompt<br>Engineer|AI Governance Board,<br>Responsible AI Council,<br>delivery teams reusing<br>patterns|High — should be under version control<br>with the same rigor as code, with<br>automated regression testing against<br>known good/bad outputs|
|**Memory Policy**|Defines what an AI agent or system<br>remembers across interactions,<br>retention duration, and access<br>boundaries|AI<br>Solution<br>Architect|Data Governance<br>Council, AI Governance<br>Board, Privacy Office|Low — policy definition is a judgment<br>artifact, though enforcement can be<br>automated|
|**Agent**<br>**Specification**|Defines an AI agent's scope of<br>autonomy, available tools/actions,<br>escalation triggers, and human-<br>override mechanisms|AI<br>Solution<br>Architect|ARB, AI Governance<br>Board, Responsible AI<br>Council, operations|Medium — see Volume 7 for the full<br>Agent Specification template|
|**MCP Tool Contract**|Defines the interface, permissions, and<br>behavioral contract for a tool exposed<br>to AI agents via Model Context Protocol<br>or equivalent|Tool-<br>owning<br>team|Agent developers,<br>security (tool<br>permissions are a<br>security-critical<br>surface), ARB|High — should be machine-validated<br>against actual tool implementation, given<br>the security sensitivity of agent tool<br>access|
|**A2A Contract**|Defines the interaction protocol and<br>trust boundary between two<br>autonomous AI agents (agent-to-agent)|Both<br>agent-<br>owning<br>teams<br>(jointly)|ARB, AI Governance<br>Board, security|Medium — an emerging artifact type as<br>multi-agent architectures mature; tooling<br>is still developing as of 2026|

### **7.6 Operational & Lifecycle Artifacts** 

|**Artifact**|**Purpose**|**Owner**|**Consumers**|**Automation**|
|---|---|---|---|---|
|**Runbooks**|Step-by-step operational<br>procedures for known scenarios<br>(incident response, failover,<br>recovery)|Operations/SRE<br>team, with<br>architect input on<br>architecture-<br>specific<br>procedures|On-call<br>operations<br>staff, incident<br>commanders|Medium — common scenarios can be automated<br>as runbook-as-code (e.g., automated failover<br>scripts), reducing reliance on manual procedure<br>execution under pressure|
|**Support Model**|Defines who supports the<br>system, escalation tiers, SLAs,<br>and handoff between<br>development and operations|Service Owner|Operations,<br>ARB (to<br>confirm<br>sustainability<br>before<br>approval),<br>CAB|Low — organizational/process artifact|
|**Retirement**<br>**Checklist**|Ensures clean, complete<br>decommissioning — data<br>archival/deletion per retention<br>policy, dependency verification,<br>access revocation|Service Owner,<br>with Data<br>Governance and<br>Security sign-off|ARB, Data<br>Governance<br>Council,<br>Internal Audit|Medium — dependency verification can be<br>automated via the knowledge graph (Volume 3);<br>data handling steps require careful manual<br>verification given regulatory consequences of<br>getting this wrong|

#### **THE MOST COMMONLY SKIPPED ARTIFACT** 

The Retirement Checklist is, by a wide margin, the most frequently skipped artifact in this catalog — decommissioning rarely has an executive sponsor pushing for rigor the way a new build does, and the consequences of skipping it (orphaned data, undiscovered dependencies, incomplete access revocation) often surface years later as audit findings or security incidents rather than immediately. Treating Retirement Checklist completion as a mandatory ARB gate, with the same rigor as new-build approval, is one of the highestleverage low-cost governance improvements available to a Principal Architect. 

## **Part B — Architecture Quality Attributes** 

Generic non-functional requirements ("the system should be fast and secure") are useless as governance criteria because they aren't testable. This part defines twenty-one quality attributes with banking-relevant, testable framing for each — including six AI/agent-specific attributes that don't appear in pre-2023 architecture references and that most ARB charters still haven't formally incorporated. 

|**8.1 Classic**<br>**Attribute**|**al Quality Attributes**<br>**Testable Framing**|**Banking-Specific Note**|
|---|---|---|
|**Performance**|Response time, throughput, and resource utilization under<br>specified load, expressed as percentiles (p50/p95/p99), not<br>averages|Peak-period scenarios (month-end, year-end, market-<br>open) often dominate, not steady-state averages|
|**Availability**|Uptime percentage with explicit measurement window and<br>what counts as "down" (full outage vs. degraded)|Payment and trading systems frequently carry<br>contractual or regulatory availability SLAs distinct from<br>generic best-effort targets|
|**Scalability**|Defined scaling dimension (users, transactions, data volume)<br>and the mechanism (horizontal/vertical) with concrete<br>headroom targets|Should explicitly address both gradual growth and<br>sudden demand spikes (e.g., a viral product launch or<br>market event)|
|**Security**|Specific control objectives (authentication, authorization,<br>encryption at rest/in transit, audit logging) mapped to a<br>recognized framework (NIST, ISO 27001)|Must explicitly address regulatory-driven controls (PCI-<br>DSS for payments, data residency for cross-border<br>operations)|
|**Privacy**|Data minimization, purpose limitation, and subject rights<br>(access, deletion, portability) as concrete, testable controls|GDPR and equivalent regimes impose specific, auditable<br>obligations distinct from general security posture|
|**Maintainability**|Mean time to implement a defined class of change, code<br>complexity metrics, test coverage thresholds|Particularly material for core banking systems with multi-<br>decade expected lifespans|
|**Operability**|Ease of routine operation — deployment frequency achievable,<br>monitoring/alerting completeness, runbook coverage|Should be assessed against the Support Model artifact<br>(Section 7.6) at review time, not assumed|
|**Deployability**|Deployment frequency achievable, rollback time, blast radius<br>of a failed deployment|Banking change-freeze windows (e.g., around regulatory<br>reporting dates) constrain this and should be designed<br>around explicitly|
|**Observability**|Coverage of metrics, logs, and traces sufficient to diagnose an<br>unknown failure mode without code changes|Increasingly a regulatory expectation itself — operational<br>resilience regimes expect demonstrable real-time<br>visibility into critical system health|
|**Recoverability**|Recovery Time Objective (RTO) and Recovery Point Objective<br>(RPO), tested via actual recovery drills, not just documented<br>targets|Subject to formal regulatory testing requirements in<br>many jurisdictions (operational resilience testing<br>regimes)|
|**Auditability**|Completeness and tamper-evidence of the audit trail for a<br>defined set of sensitive actions|A first-class design requirement in banking, not an<br>afterthought — should be reviewed with the same rigor as<br>security|
|**Compliance**|Explicit mapping to applicable regulations with control<br>evidence (see Compliance Matrix, Section 7.3)|Should be assessed per-jurisdiction for multi-jurisdiction<br>banks, since requirements diverge materially|
|**Portability**|Effort required to move the system to a different infrastructure<br>provider or environment|Directly relevant to vendor-concentration risk<br>management (see Volume 2, Section 3.6)|
|**Usability**|Task completion rate and time-on-task for defined user<br>journeys, typically measured via usability testing|Customer-facing and internal operations/back-office<br>usability are both relevant and frequently under-<br>prioritized for the latter|

### **8.2 AI & Agent-Specific Quality Attributes** 

These seven attributes are the newest additions to the architecture quality vocabulary, and the area where ARB charters most commonly lag behind actual practice. A Principal Architect operating in 2026 should treat fluency here as a baseline expectation, not a specialization. 

|**Attribute**|**Testable Framing**|**Banking-Specific Note**|
|---|---|---|
|**AI Explainability**|Ability to produce a human-understandable rationale for a<br>specific AI-driven decision, at a level of detail<br>proportionate to the decision's stakes|Credit decisioning and similar high-stakes AI use cases<br>typically face explicit regulatory explainability requirements<br>(adverse action notice equivalents) that constrain model<br>architecture choices, not just downstream reporting|
|**AI Fairness**|Measured outcome parity across protected/relevant<br>demographic groups against defined fairness metrics<br>(demographic parity, equalized odds, etc., chosen<br>deliberately since these metrics can conflict with each<br>other)|Fair lending regulatory regimes impose specific obligations;<br>the choice of fairness metric itself should be a documented,<br>defensible decision, not a default|
|**AI Robustness**|Performance degradation under adversarial input,<br>distribution shift, or edge cases, tested via deliberate red-<br>teaming and stress testing|Fraud detection and similar adversarial-environment AI use<br>cases face active, adaptive adversaries, unlike most<br>traditional software quality attributes|
|**Safety**|Bounded worst-case behavior — what is the AI system<br>structurally prevented from doing, regardless of input or<br>failure mode|Should be addressed through architectural constraints (tool<br>permission scoping, action approval gates) rather than<br>relying solely on model behavior, which cannot be<br>guaranteed with certainty|
|**Trustworthiness**|A composite, harder-to-test attribute combining<br>calibrated confidence (the system's stated confidence<br>matches its actual accuracy) with consistent behavior<br>over time|Increasingly a named requirement in AI governance<br>frameworks (NIST AI RMF's "trustworthy AI"<br>characteristics) even where not yet precisely testable|
|**Agent Reliability**|Task completion rate for defined agent workflows,<br>including graceful failure and appropriate escalation<br>when the agent cannot complete a task, rather than silent<br>failure or fabricated success|Particularly critical where agents take real-world actions<br>(initiating payments, modifying records) rather than only<br>generating text, given the higher cost of an unreliable<br>action versus an unreliable response|
|**Memory Consistency**|An AI agent's recalled context/memory remains accurate<br>and internally consistent across a session and across<br>sessions where persistence is intended|A novel attribute with essentially no pre-2023 precedent;<br>testing methodology is still maturing across the industry,<br>and ARBs should expect to evolve their review criteria as<br>practice matures|

#### **CONTEXT FRESHNESS — AN EIGHTH EMERGING ATTRIBUTE** 

Closely related to Memory Consistency but distinct: whether the information an AI system is reasoning over (retrieved documents, tool outputs, cached context) reflects current reality versus stale data. For RAG-based architectures and AI agents acting on enterprise data, a context-freshness SLA (e.g., "retrieved data must be no more than 15 minutes stale for transaction-related queries") should be a named, testable requirement — most current AI architecture reviews don't yet ask this question explicitly, and it is becoming a more frequent source of production incidents as the gap between this practice and increasing AI deployment scale widens. 

### **8.3 Resolving Quality Attribute Trade-offs** 

Many of these attributes are in direct tension — Security and Usability frequently trade off against each other; Performance and Auditability can conflict when comprehensive audit logging adds latency; AI Explainability and raw model performance often trade off, since the most explainable model architectures aren't always the most accurate ones. This is precisely the territory ATAM and CBAM (Volume 2, Part B) are designed to navigate systematically rather than leaving these trade-offs to be resolved implicitly and inconsistently by whichever engineer happens to be making the call in the moment. 

#### **A GOVERNANCE DISCIPLINE WORTH ADOPTING** 

For any architecturally significant initiative, require an explicit statement of which quality attributes were deliberately prioritized and which were consciously deprioritized, with rationale — rather than a checklist where every attribute is rated "addressed." A design that explicitly says "we are accepting reduced AI Explainability in exchange for materially better fraud detection accuracy, because [rationale], and this trade-off has been reviewed by [Responsible AI Council]" is far more defensible under audit than one that silently doesn't mention explainability at all.
