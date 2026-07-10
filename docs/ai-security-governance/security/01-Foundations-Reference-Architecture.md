---
title: "Foundations & Reference Architecture"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "01-Foundations-Reference-Architecture.pdf"
doc_type: guide
tags: ["ai-security", "governance"]
last_reviewed: 2026-07-10
framework_name: ""
covers_version: "N/A"
---

##### **VOLUME 1 OF 6** 

# **Foundations & Reference Architecture** 

Security Frameworks, Agent Lifecycle Security, Runtime Isolation, and the AI Security Mesh 

**Document Code:** EASA-01 **Version:** 1.0 **Date:** June 2026 **Scope:** Domains 1, 4, 7 & 20 

_Enterprise Agentic AI Security Architect (2026–2030) Master Research Program_ 

Page 1 of 15 

## **Table of Contents** 

Page 2 of 15 

## **Executive Summary** 

This volume establishes the architectural foundation for everything that follows in the program. Its purpose is to answer a question that most enterprises have not yet asked formally: what does it mean to apply security architecture discipline — the kind historically reserved for networks, applications, and identity systems — to a population of autonomous software agents that plan, reason, call tools, remember, and act with delegated authority? 

The honest starting position is that the agentic AI ecosystem in 2026 looks like distributed computing did in roughly 2010 and like API security did in roughly 2015: powerful, proliferating faster than governance can track it, built on protocols still hardening in production, and increasingly the subject of real, disclosed incidents rather than theoretical risk. The OWASP Top 10 for Agentic Applications, published December 2025 and already in its first major revision cycle, documents real-world incidents — prompt-injection-driven data exfiltration in enterprise copilots, tool misuse in cloud coding assistants, remote code execution in autonomous frameworks, and memory poisoning in production assistants — that mirror, almost exactly, the early years of web application security. 

###### **Architectural premise of this program** 

An AI agent is not a feature of an application. It is a new class of execution principal — with its own identity, its own blast radius, its own lifecycle, and its own failure modes — that must be designed, governed, and operated with the same rigor as a privileged service account, and arguably more, because it can reason about how to circumvent the controls placed around it. 

This volume covers four domains that together form the architectural spine of the program: established enterprise security architecture frameworks adapted for agents (Domain 1), the security model for the agent lifecycle itself (Domain 4), the runtime and isolation layer agents execute within (Domain 7), and the security mesh pattern that ties identity, policy, memory, and observability together at scale (Domain 20). Later volumes go deep on identity, MCP, A2A, governance, and operations; this volume gives the reader the scaffolding those deep dives hang on. 

Page 3 of 15 

## **Domain 1 — Security Architecture Frameworks for Agentic AI** 

Enterprise security architecture did not get rebuilt from scratch for cloud, and it should not be rebuilt from scratch for agents. The discipline's existing frameworks — SABSA, TOGAF, and Zachman — remain the right starting vocabulary. What changes is the population of things being modeled: a SABSA business attribute now has to account for autonomous decision-making; a TOGAF ADM cycle now has to govern a fleet of agents that can be spun up by developers outside formal change control; a Zachman cell for "Who" now has to represent non-human principals that vastly outnumber human ones. 

### **1.1 SABSA for Agentic Systems** 

SABSA's core discipline — deriving security architecture from business attributes rather than from technology controls — translates directly to agents, but the attribute set needs extension. Traditional SABSA attributes (confidentiality, integrity, availability, accountability) remain necessary but not sufficient. Agentic systems require additional first-class attributes: 

- **Agency boundedness —** the degree to which an agent's autonomy is constrained to a defined, auditable action space, sometimes called "Least Agency" in current OWASP guidance: autonomy should be a feature an agent earns through demonstrated reliability, not a default it starts with. 

- **Reversibility —** whether an agent's actions can be undone, compensated, or contained before they propagate downstream (a database write versus a wire transfer versus a public API call each carry very different reversibility profiles). 

- **Explainability under audit —** whether the chain of reasoning, tool calls, and memory reads that produced an action can be reconstructed after the fact for a regulator, auditor, or incident responder. 

- **Trust derivability —** whether the agent's current trust level can be computed from verifiable signals (identity attestation, behavioral history, content provenance) rather than asserted once at deployment and never revisited. 

The practical deliverable is an Agent Trust Level Derivation model: a scoring function that combines workload identity assurance, the sensitivity of the data and tools the agent can reach, its autonomy level (see Domain 14's autonomy-level taxonomy), and its historical behavioral conformance, and maps the result onto the organization's existing SABSA risk-attribute taxonomy so that agent risk can be reported in the same business language as every other risk in the enterprise risk register. 

### **1.2 TOGAF Security Architecture and the Agent Fabric** 

TOGAF's Architecture Development Method (ADM) needs two structural adaptations for agentic platforms. First, Phase B (Business Architecture) and Phase D (Technology Architecture) need an explicit "Agent Fabric" viewpoint — a horizontal layer that cuts across business capabilities the way a service mesh or an integration layer does today, because agents are rarely scoped to a single business capability; they are increasingly shared infrastructure that many business processes draw on. 

Second, and more consequentially, Phase G (Implementation Governance) needs a fast-path review track for agents. The standard TOGAF architecture review cadence — periodic, document-heavy, aligned to project milestones — cannot keep pace with an organization where a developer can stand up a new agent, register a new MCP tool, or grant a new scope in minutes. Most enterprises that have gotten this right have built a lightweight, automatable "Agent Architecture Compliance" gate: a machine-checkable policy (expressed in 

Page 4 of 15 

something like Cedar or OPA — see Domain 5) that runs at registration time and blocks non-compliant agents from being provisioned, backed by a periodic human-led architecture review for anything above a defined risk threshold. 

### **1.3 Zachman Framework Mapping** 

The Zachman Framework's six interrogatives map cleanly onto the agentic stack and are useful precisely because they force completeness — it is easy to design an agent platform that answers "How" (the orchestration logic) in exhaustive detail while leaving "Why" (the business justification for the agent's existence and scope) almost entirely implicit. 

|**Interrogatve**|**Traditonal Enterprise Mapping**|**Agentc AI Mapping**|
|---|---|---|
|What|Data enttes, data models|Agent memory (episodic, semantc, procedural),<br>context windows, embeddings, RAG corpora|
|How|Business processes, applicaton logic|Agent reasoning loops, planning, tool invocaton<br>chains, orchestraton graphs|
|Where|Network nodes, locatons, data centers|Runtme sandboxes, MCP servers, A2A<br>endpoints, cloud regions, edge inference|
|Who|Organizatonal units, roles, human identty|Human identtes, non-human/workload<br>identtes, compound user+agent identty, agent-<br>to-agent trust relatonships|
|When|Business events, processing cycles|Agent lifecycle states: provisioned, actve,<br>suspended, retred; session and task lifecycles|
|Why|Business goals, strategy, motvaton|Agent purpose statement, authorized objectve,<br>governance approval, autonomy-level<br>justfcaton|

The deliverable from this exercise is an Agent Security Architecture Repository — a single structured inventory, ideally machine-readable, where every registered agent has a populated cell for each of the six interrogatives. In practice this becomes the backbone of the Agent Registry described in Domain 14: an agent with an undefined "Why" or an unbounded "Where" is, definitionally, ungoverned. 

###### **Comparative note: how the framework vendors are positioning this** 

Microsoft's Azure AI Foundry and Entra Agent ID materials describe agent governance largely through an identity-first lens (extending Entra ID's existing RBAC/PIM model to agents). Google's Agentspace and Vertex AI Agent Builder lean on Google Cloud's existing IAM and BeyondCorp zero-trust patterns. AWS's Bedrock Agents and the emerging AgentCore runtime lean on IAM roles and Verified Permissions (Cedar-based). None of the three hyperscalers has published a SABSA- or TOGAF-native reference architecture; each is extending its own cloud-native identity and policy stack outward to cover agents. This is a meaningful gap an enterprise architecture function can fill: translating each hyperscaler's agent-security primitives into the enterprise's existing SABSA/TOGAF vocabulary, rather than adopting three incompatible mental models for a multi-cloud agent estate. 

Page 5 of 15 

### **1.4 Security Engineering Principles Applied to Agents** 

The classical security engineering principles do not need replacing; they need a precise mapping onto agentspecific mechanisms, because "defense in depth for agents" is meaningless until it specifies which layers. 

|**Principle**|**Applicaton to Agents / MCP / A2A / Memory / Runtme**|
|---|---|
|Secure by Design|Agent capability manifests, tool scopes, and autonomy levels are defned and reviewed<br>before an agent is built, not retrofted afer a pilot succeeds and gets promoted to<br>producton.|
|Security by Default|New agents are provisioned with zero standing tool access; capabilites are explicitly<br>granted, never inherited from a broad template or a permissive default service account.|
|Defense in Depth|Independent controls at the identty layer (workload identty, OAuth scopes), the<br>MCP/A2A protocol layer (schema validaton, signed agent cards), the runtme layer<br>(sandboxing, egress control), and the memory layer (provenance tagging, poisoning<br>detecton) — no single control is load-bearing.|
|Zero Trust|Every tool call, every inter-agent message, and every memory read is authentcated and<br>authorized at the point of use; an agent's network locaton or prior successful actons<br>confer no implicit trust for the next acton.|
|Assume Breach|Architecture assumes at least one agent, one MCP server, or one A2A peer is compromised<br>or behaving maliciously at any given tme, and is designed to contain blast radius<br>(capability scoping, egress allowlistng, circuit breakers) rather than to prevent<br>compromise outright.|
|Resilience Engineering|Agent Reliability Engineering practces (Domain 19) — SLOs, error budgets, graceful<br>degradaton, circuit breakers on tool chains — treat agent misbehavior as an expected<br>operatng conditon to be engineered around, not an excepton.|
|Safety by Design|Irreversible or high-consequence actons (fnancial transactons, infrastructure changes,<br>external communicatons) require human-in-the-loop approval gates regardless of the<br>agent's measured trust score.|
|Privacy by Design|Memory and context layers classify and minimize personal data at write tme; retenton<br>and right-to-erasure are lifecycle propertes of agent memory, not an aferthought bolted<br>onto a data warehouse.|

Page 6 of 15 

## **1.5 Threat Modeling for Agentic Systems** 

Threat modeling agentic systems requires layering frameworks rather than picking one. STRIDE and PASTA remain useful for the conventional application and infrastructure surface an agent sits on top of, but neither was designed to reason about a system that forms its own intent at runtime. Three newer frameworks fill that gap, and a mature program uses all three together rather than treating them as competitors. 

#### **STRIDE and PASTA — what still applies, and where they stop** 

STRIDE's six categories (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) map cleanly onto agent identity spoofing, memory tampering, insufficient audit logging, context leakage, resource-exhaustion attacks on agent budgets, and privilege escalation through delegation chains. It is a sound checklist for the infrastructure an agent runs on. Its blind spot is cognitive: STRIDE has no native category for an agent being talked into doing something harmful through legitimate-looking input, because that is not a spoofing or tampering attack against the system — it is a successful, well-formed instruction that happens to be malicious. PASTA's seven-stage, risk-centric process (defining business objectives, technical scope, decomposing the application, analyzing threats, identifying vulnerabilities, modeling attacks, and quantifying risk) is valuable for tying agent risk back to business impact, but suffers the same blind spot at the decomposition stage unless explicitly extended. 

#### **MITRE ATT&CK and MITRE ATLAS** 

ATT&CK remains the right taxonomy for everything that happens once an agent (or the infrastructure underneath it) is compromised and an adversary is operating within the environment — lateral movement, credential access, persistence. ATLAS extends this specifically to the ML/AI attack surface: adversarial inputs, model extraction, training-data poisoning, and (in its more recent additions) agent-specific tactics. A mature threat model cross-references ATLAS techniques against the agent's specific architecture: which ATLAS techniques are even reachable given this agent's tool access, memory configuration, and autonomy level. 

#### **CSA MAESTRO — the agent-native framework** 

MAESTRO (Multi-Agent Environment, Security, Threat, Risk, and Outcome), published by the Cloud Security Alliance, is purpose-built for agentic systems and has become the closest thing to a standard agent threatmodeling methodology in 2026. It decomposes an agentic system into seven layers and requires the threat modeler to work through both traditional and agentic threats at each layer, then explicitly analyze cross-layer threats — because the most damaging agent failures rarely stay contained to one layer. 

|**Layer**|**What It Covers**|**Representatve Threats**|
|---|---|---|
|L1 — Foundaton<br>Models|The base/fne-tuned LLMs providing<br>reasoning and tool-use capability|Adversarial inputs, model extracton, training-<br>data and fne-tuning backdoors|
|L2 — Data<br>Operatons|Data pipelines, labeling, embeddings, RAG<br>ingeston|Data poisoning, embedding manipulaton,<br>pipeline tampering|
|L3 — Agent|Orchestraton logic, planning, decision-|Goal hijacking, insecure tool integraton, prompt<br>|
|Frameworks|making (LangGraph, AutoGen, etc.)|injecton propagaton|
|L4 — Deployment|Containers, cloud hostng, network|Misconfguraton, container escape, insecure|

Page 7 of 15 

|**Layer**|**What It Covers**|**Representatve Threats**|
|---|---|---|
|& Infrastructure|confguraton|secrets handling|
|L5 — Evaluaton &<br>Observability|Testng, monitoring, logging, audit trails|Blind spots in monitoring, evaluaton gaming, log<br>tampering|
|L6 — Security &<br>Compliance<br>(vertcal)|Cross-cutng controls applied at every layer|Inconsistent policy enforcement across layers,<br>compliance drif|
|L7 — Agent<br>Ecosystem|Mult-agent interacton, marketplaces,<br>A2A/MCP discovery|Agent impersonaton, marketplace manipulaton,<br>collusion, supply-chain compromise via third-<br>party agents|

MAESTRO's real value is forcing analysis of cross-layer cascades: a poisoned embedding at L2 reaches an agent's planning logic at L3, which selects a tool at L4 that has broader permissions than the original task required, and the resulting action is never flagged because the observability layer (L5) was only watching for anomalies in single-agent behavior, not for an L7-level pattern of one compromised agent influencing a peer through A2A messaging. No single-layer review catches this; only an explicit cross-layer pass does. 

#### **Producing the four required threat models** 

This program calls for fully worked threat models, using MAESTRO as primary structure cross-referenced against ATLAS and STRIDE, for four representative system types. Each should be built as a standalone artifact (data flow diagram, trust boundaries, layer-by-layer threat enumeration, and a prioritized control list) and reviewed at least annually or on material architecture change: 

1. Single Agent — a bounded, single-purpose agent (e.g., a customer support agent with read access to a CRM and a knowledge base). Establishes the baseline pattern and the minimum control set every agent should carry regardless of complexity. 

2. Multi-Agent System — a planner/orchestrator coordinating two or more specialist sub-agents (e.g., a research agent delegating to a web-search agent and a code-execution agent). Surfaces delegation-abuse, state-poisoning, and goal-hijack-propagation risks absent in the single-agent case. 

3. MCP Ecosystem — an enterprise with a central MCP gateway fronting dozens of internal and third-party MCP servers. Surfaces tool poisoning, schema manipulation, and tenant-isolation risks (full detail in Volume 2). 

4. Banking AI Platform — a regulated, high-consequence composite: agents with access to payment rails, customer PII, and external A2A counterparties (correspondent-bank agents, payment-network agents). This is the reference model used throughout the program's banking-grade reference architecture (Volume 6) and should incorporate every control surfaced by the prior three models plus regulatory-specific constraints (DORA, PCI DSS, SOC 2 — see Volume 3). 

Page 8 of 15 

## **Domain 4 — Agentic AI Architecture Security** 

Domain 4 takes the threat-modeling output from Domain 1 and turns it into a concrete control architecture, organized around the canonical agent lifecycle and the realities of multi-agent orchestration frameworks now in production use. 

### **4.1 Agent Lifecycle Security** 

Every agentic interaction, regardless of framework, decomposes into the same five-stage lifecycle: a user or trigger initiates a request, a planner interprets intent and forms a plan, an agent (or agents) executes steps of that plan, tools are invoked to take action or retrieve information, memory is read and written throughout, and actions land in the world. Each stage has a distinct threat profile, a distinct control set, and a distinct audit requirement. 

|**Stage**|**Primary Threats**|**Primary Controls**|**Audit Requirement**|
|---|---|---|---|
|User → Planner|Prompt injecton (direct and<br>indirect via<br>RAG/email/documents),<br>intent manipulaton|Input sanitzaton, content<br>provenance tagging,<br>instructon-vs-data separaton|Full input capture with<br>provenance metadata|
|Planner → Agent|Goal hijacking, plan<br>tampering, excessive-scope<br>plan generaton|Plan validaton against policy<br>before executon, bounded<br>planning depth, human<br>approval for high-risk plans|Plan dif logging (intended vs.<br>executed)|
|Agent → Tool|Tool misuse, parameter<br>injecton, excessive<br>permissions, toxic tool<br>combinatons|Capability-scoped tokens,<br>schema validaton at<br>invocaton, tool allowlistng,<br>approval workfows for<br>sensitve calls|Every tool call logged with<br>parameters, caller identty,<br>and policy decision|
|Tool → Memory|Memory/context poisoning,<br>cross-tenant memory<br>leakage, unauthorized<br>persistence|Write-tme classifcaton,<br>provenance tagging, tenant<br>isolaton, retenton policy<br>enforcement|Memory mutaton log with<br>source atributon|
|Memory/Tool →<br>Acton|Irreversible or high-<br>consequence actons taken<br>without sufcient review|Reversibility classifcaton,<br>human-in-the-loop gates for<br>irreversible actons, rate<br>limitng, circuit breakers|Immutable acton log,<br>tamper-evident, ted to<br>originatng session|

### **4.2 Multi-Agent Orchestration Frameworks and Their Threat Surface** 

The production orchestration landscape has consolidated around a handful of frameworks, each with a distinct trust model that materially changes the threat surface: 

- **LangGraph —** graph-based orchestration with explicit state; the principal risk is state poisoning, since shared graph state is often trusted implicitly by downstream nodes. 

Page 9 of 15 

- **CrewAI —** role-based crews with delegation between agents; delegation abuse is the dominant risk, where a low-privilege agent convinces a higher-privilege peer to act on its behalf. 

- **Microsoft Agent Framework (the successor combining Semantic Kernel and AutoGen patterns) —** enterprise-oriented orchestration with native Entra Agent ID integration; the main architectural advantage is identity-aware delegation, but it also means identity misconfiguration has an outsized blast radius. 

- **AutoGen —** conversational multi-agent patterns; infinite-loop and goal-drift risk is highest here because agent-to-agent conversations can continue without a hard termination condition unless explicitly bounded. 

- **Semantic Kernel Agents —** plugin-centric orchestration; tool/plugin supply-chain risk dominates, since the framework's extensibility model is built around third-party plugin ecosystems. 

The five threats common across all five frameworks — agent collusion, goal hijacking, delegation abuse, state poisoning, and infinite loops — are precisely the threats ASI07 (Insecure Inter-Agent Communication), ASI08 (Cascading Failures), and ASI10 (Rogue Agents) in the OWASP Top 10 for Agentic Applications are designed to catch. Volume 4 covers detection and response for these in depth; the architectural control here is structural: bound every multi-agent conversation with a maximum turn count, a maximum cost budget, and a maximum wall-clock duration, enforced outside the orchestration framework itself (so a compromised or malfunctioning orchestrator cannot disable its own circuit breaker). 

Page 10 of 15 

## **Domain 7 — Agent Runtime Security** 

If identity answers "who is acting" and policy answers "what are they allowed to do," the runtime layer answers the question that actually contains the blast radius when the first two fail: what can this process physically reach? Runtime isolation is the last line of defense, and for agents that execute generated code or shell commands, it is not optional. 

### **7.1 Runtime Isolation Technology Comparison** 

|**Technology**|**Isolaton Model**|**Best Fit for Agent Workloads**|**Tradeof**|
|---|---|---|---|
|Firecracker microVMs|Hardware-virtualized,<br>minimal device model,<br>AWS-originated|High-trust-boundary agent code<br>executon (e.g., user-submited<br>code agents); the de facto<br>standard referenced by current<br>MCP gateway guidance for "one<br>ephemeral sandbox per task"|Higher cold-start latency<br>than containers; requires<br>KVM|
|Kata Containers|OCI-compatble container<br>interface backed by<br>lightweight VMs|Drop-in replacement for<br>container-based agent runtmes<br>needing VM-grade isolaton<br>without rearchitectng<br>orchestraton|Operatonal complexity of<br>managing a hypervisor<br>layer in a Kubernetes<br>estate|
|gVisor|User-space kernel<br>interceptng syscalls|General-purpose agent<br>sandboxing where full VM<br>isolaton is unnecessary but<br>syscall-level containment is<br>required|Syscall intercepton<br>overhead; some syscall<br>compatbility gaps|
|WASM / WASI|Capability-based,<br>sandboxed bytecode<br>executon|Tool executon and untrusted<br>plugin code where startup<br>latency must be near-zero;<br>increasingly used for MCP tool<br>sandboxing|Language/runtme<br>ecosystem stll maturing<br>for general-purpose agent<br>code|
|Sandboxed Containers<br>(gVisor/Kata aside, i.e.<br>seccomp + AppArmor<br>hardened standard<br>containers)|Namespace and cgroup<br>isolaton with restricted<br>syscall/capability surface|Lowest-overhead opton for<br>lower-trust-boundary agents;<br>acceptable when paired with<br>strict network egress controls|Weakest isolaton<br>guarantee of the optons<br>listed; shared kernel risk|

The architectural pattern this program recommends is tiered: classify agents by the trust boundary they cross (does this agent execute model-generated code? does it process untrusted external content? does it have network egress to sensitive internal systems?) and assign isolation strength accordingly, rather than applying one isolation technology uniformly. A read-only reporting agent with no code execution does not need Firecracker-grade isolation; a coding agent executing arbitrary generated Python against production-adjacent infrastructure does. 

Page 11 of 15 

### **7.2 Runtime Controls** 

- **Capability-based security —** agents hold unforgeable capability tokens scoped to specific resources and operations rather than ambient authority; possessing the capability is both necessary and sufficient, which makes scope review tractable in a way that role-based ambient permissions are not. 

- **Dynamic permissions —** permissions are granted just-in-time for the duration of a specific task and revoked on completion, rather than provisioned as standing access — directly addressing the overpermissioning pattern that current NHI research identifies as the most operationally urgent gap in enterprise agent deployments. 

- **Runtime authorization —** every tool call and action is re-evaluated against policy at the moment of execution (not only at session start), so a token issued for a benign initial task cannot be silently reused for an unrelated, higher-risk action later in the same session. 

- **Action approval workflows —** irreversible or high-consequence actions route through a human approval gate or a secondary automated control (a policy engine, a separate verification agent) before execution, with the approval itself captured in the immutable audit log. 

### **7.3 Secure Agent Operating System Pattern** 

Across vendors and frameworks, the architecture that is converging as best practice resembles a minimal operating system built specifically for agent execution, with four layers stacked between the agent's reasoning loop and the outside world: 

1. Agent — the reasoning/planning loop itself, treated as untrusted input to everything below it. 

2. Sandbox — the isolation boundary (Firecracker/Kata/gVisor/WASM per the tiering above) that contains what the agent can directly touch. 

3. Policy Engine — the authorization decision point (commonly OPA or Cedar — see Volume 2) that every action must clear before reaching a tool. 

4. Tool Broker / Runtime Controller — the only component with actual credentials to downstream systems; it receives a policy-approved request and a scoped, ephemeral credential, executes the call, and returns only the result, never the credential, to the agent. 

The structural property worth emphasizing: the agent itself never holds standing credentials to anything. It holds, at most, a short-lived capability token whose actual exchange for a usable credential happens inside the tool broker, after a policy check. This single design decision — credential custody lives outside the agent process — eliminates an entire category of incidents where a compromised or manipulated agent simply exfiltrates whatever secrets it was holding. 

Page 12 of 15 

## **Domain 20 — AI Security Mesh Architecture** 

As agent populations scale past a few dozen into the hundreds or thousands, point-to-point security controls between every agent, tool, and data source stop being tractable — the same inflection point that drove the industry from point-to-point service integration toward service mesh architecture a decade ago. The AI Security Mesh pattern applies that same architectural move to agentic systems. 

### **20.1 The Five Mesh Planes** 

|**Mesh Plane**|**Functon**|**Representatve Technology Patern**|
|---|---|---|
|Identty Mesh|Issues and verifes workload identty for<br>every agent, tool, and MCP/A2A endpoint<br>uniformly|SPIFFE/SPIRE trust domain spanning all agent<br>infrastructure (full detail in Volume 2)|
|Policy Mesh|Centralizes authorizaton decisions so policy<br>is defned once and enforced consistently at<br>every enforcement point|OPA or Cedar policy bundles distributed to<br>sidecars/brokers at each agent and MCP<br>gateway|
|Agent Mesh|Manages discovery, routng, and trust<br>establishment between agents and agent-to-<br>agent calls|A2A trust broker with signed Agent Card<br>verifcaton (full detail in Volume 2)|
|Memory Mesh|Governs how memory is shared, isolated, and<br>classifed across agents and sessions|Tenant-isolated vector stores and graph<br>memory with provenance tagging (full detail<br>in Volume 4)|
|Observability Mesh|Aggregates traces, logs, and behavioral<br>signals across every plane into a unifed view|OpenTelemetry-based tracing (OpenLLMetry<br>conventons) feeding a central AI SOC (full<br>detail in Volume 4)|

### **20.2 Comparison with Service Mesh and Zero Trust** 

The AI Security Mesh is best understood as a service mesh's conceptual sibling, not its replacement — most enterprises will run both, with the AI Security Mesh as an agent-aware layer on top of (or alongside) an existing Istio/Linkerd-class service mesh. 

|**Property**|**Traditonal Service Mesh**|**AI Security Mesh**|
|---|---|---|
|Unit of identty|Service / workload (ofen per-<br>deployment)|Individual agent instance, ofen ephemeral<br>and per-task|
|Primary trust queston|Is this service authorized to call that<br>service?|Is this agent authorized to take this acton,<br>with this data, on behalf of this principal, right<br>now?|
|Policy granularity|Network-level (which services can talk<br>to which)|Acton-level (which specifc tool calls, with<br>which parameters, are permited)|

Page 13 of 15 

|**Property**|**Traditonal Service Mesh**|**AI Security Mesh**|
|---|---|---|
|Failure mode of concern|Service unavailability, latency, network<br>partton|Goal hijacking, cascading mult-agent failure,<br>autonomous over-reach|
|Relatonship to<br>SPIFFE/Zero Trust|SPIFFE commonly used as the identty<br>substrate; zero trust is the governing<br>principle|Same substrate (SPIFFE/SPIRE), extended with<br>agent-specifc atestaton and behavioral trust<br>scoring layered on top|

###### **Design recommendation** 

Do not build a parallel identity system for agents. Extend the organization's existing SPIFFE/SPIRE (or equivalent workload identity) trust domain to cover agent workloads, and layer agent-specific policy and behavioral-trust evaluation on top of that shared identity substrate. This is the path the most mature implementations (Block's production SPIFFE+WIMSE+OAuth deployment is the most frequently cited public reference) have taken, and it avoids the fragmentation that has plagued early agent-identity tooling. 

Page 14 of 15 

## **Summary: How the Frameworks in This Volume Relate** 

Readers new to this space frequently ask which single framework to adopt. The honest answer is that no single framework covers the full problem, and the frameworks are not competitors — they operate at different altitudes and answer different questions. 

|**Framework**|**Alttude**|**Primary Queston It Answers**|
|---|---|---|
|SABSA / TOGAF /<br>Zachman|Enterprise architecture|How does agent risk and capability map onto our existng<br>business and technology architecture?|
|STRIDE / PASTA|Applicaton security|What conventonal security faws exist in the systems an<br>agent runs on?|
|MITRE ATT&CK / ATLAS|Adversary tactcs|What does a real-world atacker do once inside, and what<br>AI-specifc techniques apply?|
|CSA MAESTRO|Agent-natve threat<br>modeling|What can go wrong, layer by layer and across layers, in this<br>specifc agentc system?|
|OWASP ASI Top 10|Risk taxonomy /<br>prioritzaton|Which of the highest-prevalence, highest-impact agentc<br>risks are present here?|
|AI Security Mesh|Operatng architecture|How do we enforce identty, policy, memory, and<br>observability consistently at scale?|

Volume 1 has established this scaffolding. Volume 2 goes deep on the identity, MCP, and A2A layers that this volume references but does not fully specify. Volume 3 covers the governance frameworks (OWASP, NIST, ISO 42001, regulatory) that determine which controls are mandatory versus discretionary. Volumes 4 through 6 cover operations, economics, and the roadmap for building this capability over 24 months. 

Page 15 of 15
