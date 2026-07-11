---
title: "Harness Engineering Research Report"
date_created: 2026-07-11
last_reviewed: 2026-07-11
status: current
supersedes: ""
source_type: converted-pdf
source_file: "Harness_Engineering_Research_Report.pdf"
tags: ["harness", "engineering", "research", "ci-cd"]
---

<!-- converted from Harness_Engineering_Research_Report.pdf -->

**E N G I N E E R I N G R E S E A R C H R E P O R T** 

# **Harness** 

Architecture, Execution Model, AI Capabilities, and Competitive Positioning for AI-Native Software Delivery 

Prepared for: Enterprise Architects, Platform Engineers, DevSecOps Leads Scope: Architecture · Pipeline/CI/CD Engine · AI Agents · Governance · Competitive Analysis Research date: July 2026 

Harness Engineering Research Report — 1 

## **How to read this report** 

This is a scoped, evidence-based cut through Harness's technical architecture and delivery process — not the full 23-section prompt. It prioritizes what an architect actually needs to make a build/adopt decision: how the system executes work, how governance is enforced, what the AI layer actually does today versus what's roadmap, and how it holds up against GitHub Actions, GitLab, Jenkins, ArgoCD, and Backstage. Each major claim is flagged: 

**<mark>DOCUMENTED</mark>** confirmed in Harness's own architecture docs or verifiable product pages **<mark>ROADMAP</mark>** announced but not fully GA, or GA claim conflicts with vendor's own roadmap page **<mark>ANALYSIS</mark>** informed synthesis / industry framing, not a vendor claim 

## **1. The Core Architectural Split: Control Plane vs. Delegate** 

Harness's entire execution model rests on one architectural decision: **the thing that decides what to run (control plane) is never the thing that touches your infrastructure (execution plane)** . **<mark>DOCUMENTED</mark>** 

**Control Plane — Harness Manager** : a multi-tenant cluster of microservices (SaaS or self-managed) that owns the pipeline engine, RBAC, secrets metadata, policy evaluation (OPA), UI, and task scheduling. It never executes customer workloads directly. 

**Data/Execution Plane — the Delegate** : a customer-managed worker process that runs inside the customer's own network (Kubernetes, VM, or Docker host). The Delegate opens an **outbound** WebSocket (WSS) connection to the Manager on port 443 — no inbound ports are ever opened into the customer network. The Manager pushes task payloads down that socket; the Delegate executes against local infrastructure (cloud APIs, Kubernetes clusters, on-prem hosts) and streams results back. 

This is the same pull-based trust model GitOps popularized with ArgoCD, generalized to _every_ kind of task — builds, deployments, Terraform runs, security scans, chaos experiments — not just Kubernetes manifest sync. The practical consequence: Harness SaaS can sit outside your network entirely while still deploying into a PCI-segmented VPC, an air-gapped data center, or a regulated on-prem cluster, because the Delegate — not the control plane — is what needs network reachability. 

### **Why this matters for a Fortune 100 estate** 

- **Zero inbound exposure** : security teams don't need to punch holes in firewalls for a SaaS vendor to reach production. 

- **Heterogeneous trust boundaries** : different Delegates can be scoped to different clouds, business units, or compliance zones, each with its own credentials, while sharing one control plane, one RBAC model, and one audit trail. 

- **Blast-radius containment** : Harness's own reference architecture explicitly recommends explicit-deny of raw CLI capability (aws-cli, kubectl) on Delegates and just-in-time access for anything requiring it, to contain the impact of a compromised or misused Delegate. **<mark>DOCUMENTED</mark>** 

Harness Engineering Research Report — 2 

### **Delegate scaling patterns** 

|**Pattern**|**Description**|**Best fit**|
|---|---|---|
|Centralized pool|One auto-scaled Delegate pool per Kubernetes cluster<br>serves many applications/teams; build steps run as<br>ephemeral K8s Jobs|CI workloads; teams that want central<br>governance and platform-team<br>ownership|
|BU-owned<br>Delegates|Individual business units deploy and manage their own<br>Delegate fleets|Orgs where BUs already own infra<br>budgets and RBAC independently|
|Network-isolated|Delegate deployed inside a specific segmented|Regulated workloads that cannot share|
|Delegate|boundary (PCI zone, air-gapped DC)|execution infrastructure with anything<br>else|


Source: Harness Delegate Architecture Best Practices reference doc. **<mark>DOCUMENTED</mark>** 

### **CI execution specifically** 

For CI, the Delegate doesn't run the build itself — it spawns an ephemeral build pod containing a **Lite Engine** container that orchestrates step execution inside that pod (or, for VM-based build infrastructure, hands off to a Drone Runner managing dedicated build VMs). This ephemeral-pod-per-build model is architecturally similar to GitHub Actions' and GitLab's ephemeral runner model, but the pod is launched by infrastructure you control rather than a vendor-managed fleet. 

## **2. Pipeline Engine and Governance Enforcement** 

Pipelines are defined as YAML and executed as a DAG by the Manager's pipeline engine, which supports parallel stages, conditional execution, templated/reusable step groups, approval gates, and rollback strategies. What differentiates Harness architecturally from a plain YAML-runner is that **policy evaluation is a first-class stage in the execution lifecycle, not a bolt-on check** . 

### **Policy as Code (OPA)** 

Harness embeds Open Policy Agent as a central service and lets platform teams write Rego policies that are grouped into **Policy Sets** , each scoped to an entity type (Pipeline, Terraform Plan, Terraform State, IDP Catalog entity, Connector) and an event (On Save, On Run, On Step Start). Each policy carries a severity — _Error and Exit_ or _Warn and Continue_ — so governance can escalate from advisory to blocking without new tooling. **<mark>DOCUMENTED</mark>** 

Example enforceable rule: "a pipeline cannot be saved with a production stage unless it contains an Approval step." This runs automatically on every save, at account, org, or project scope — meaning a central platform team can set an account-level policy that no project team can quietly bypass. 

Harness Engineering Research Report — 3 

This same OPA engine also gates Infrastructure-as-Code Management (IaCM): policies can evaluate a Terraform _plan_ or _state_ file directly — catching a plan that would create an over-permissioned IAM role or an untagged resource before <mark>`apply`</mark> ever runs, rather than after. 

### **RBAC model** 

Harness RBAC nests along **Account → Organization → Project** , matching how large enterprises are actually structured (Account for global/billing/SSO settings, Org typically for business units, Project for teams/applications). Roles + Resource Groups compose to form permission sets, and this same model extends into the Internal Developer Portal, so IDP self-service workflow execution rights are inherited from the underlying pipeline's RBAC rather than a separate permission system. 

## **3. Deployment Strategies and Verification** 

CD strategies are implemented natively rather than as user-scripted logic: 

|**Strategy**|**Mechanism**|**Primary tradeoff**|
|---|---|---|
|Rolling|Sequential increments across nodes|Verification gates between nodes are<br>harder to enforce mid-sequence|
|Blue-Green|Full parallel environment; traffic cutover via load<br>balancer/Service selector|Fast, near-instant rollback; doubles infra<br>cost during transition|
|Canary|Small traffic slice (e.g., 5%) expanded in phases against<br>pass/fail metric criteria|Lower cost than blue-green; requires real<br>traffic-shifting + observability integration|
|Kubernetes|Harness generates a Canary group + a Primary group;|Simpler than classic canary because|
|Canary|Primary rollout uses native K8s RollingUpdate rather<br>than manual phased traffic shifting|Kubernetes' own rolling update<br>mechanics do the heavy lifting|


Verification between phases can be AI-assisted: Harness compares live post-deploy metrics against a baseline window (commonly the pre-deploy period or a prior stable version) and can trigger automatic rollback if anomaly thresholds are breached — this is the modern form of what Harness originally branded "Continuous Verification," a capability the company has offered in some form since 2018, predating the current wave of "AI-native" branding. **<mark>DOCUMENTED</mark>** 

## **4. Internal Developer Portal (Backstage-based, not Backstage)** 

Harness IDP is built _on top of_ Backstage (uses the Backstage catalog model, supports its plugin ecosystem, and provides a Backstage-entity-YAML migration path) but is not self-hosted Backstage — it's a managed product layered with capabilities open-source Backstage doesn't ship with out of the box: 

- **Entity-level granular RBAC** at a scale (tens of thousands of catalog entities) that Harness positions as beyond what unmodified Backstage handles gracefully for enterprises past a few hundred developers 

Harness Engineering Research Report — 4 

- **OPA-based governance** applied directly to catalog entities (e.g., a service can't be promoted unless its IDP "scorecard" exceeds a threshold — enforced via the same Rego policy engine used for pipelines) 

- **Self-service workflows that are literally Harness pipelines** — meaning a "request infrastructure" button in the developer portal inherits the exact same approval gates, audit trail, and RBAC as a production deployment pipeline, rather than being a separate scripted action 

- **Fully managed SaaS** — no self-hosting, patching, or plugin-version maintenance burden 

Source: Harness IDP vs. Backstage developer docs. **<mark>DOCUMENTED</mark>** — note this is vendor-authored comparison content; treat scale claims as Harness's framing, not independently audited benchmarks. 

Harness Engineering Research Report — 5 

## **5. AI Capabilities: What's Actually Shipping vs. Roadmap** 

Harness's AI strategy is built around a shared **Software Delivery Knowledge Graph** — a connected map of services, pipelines, deployments, security findings, and cloud spend — that specialized agents reason over, rather than each agent operating on isolated context. As of mid-2026 the following are the major components: 

|**Capability**|**What it does**|**Status**|
|---|---|---|
|DevOps<br>Agent / natural-<br>language<br>pipeline ops|Create/modify pipelines, troubleshoot failures,<br>request infrastructure via natural language prompts<br>against the Knowledge Graph|**DOCUMENTED**|
|AI QA Assistant|Generative, no-code test authoring; self-healing tests<br>that adapt to UI changes; vendor claims ~10x faster<br>test creation and ~70% less test-maintenance toil|**DOCUMENTED** (vendor benchmark, not<br>independently verified)|
|SRE Agent +<br>"Human-Aware<br>Change Agent"|Automatic incident triage, postmortem generation;<br>the Human-Aware variant uses "AI Scribe" to mine<br>Slack/Teams/Zoom conversation for operational<br>signal and correlate it against the Knowledge<br>Graph's change data (e.g., linking a latency spike to<br>a retry-config change 12 minutes earlier)|**DOCUMENTED** launch,<br>**ANALYSIS** :<br>meeting-content ingestion raises data-<br>governance questions worth scoping<br>explicitly in a rollout|
|AppSec agents|Generate security tests, detect vulnerabilities,<br>propose fixes as inline code or PRs|**DOCUMENTED**|
|FinOps / cost<br>agent|Cost Perspective rule generation, commitment<br>analysis, Kubernetes spend-reduction<br>recommendations|**DOCUMENTED**|
|Autonomous<br>Worker Agents<br>+ Agent<br>Marketplace|Any pipeline step can run as a reasoning agent (not<br>fixed script) with sandboxed containers, scoped per-<br>agent identity/credentials, and an LLM Gateway that<br>policy-checks every model call. Six prebuilt agents<br>(Autofix, Code Review, IaCM Remediation, etc.) ship<br>out of the box; agents can call Anthropic, OpenAI, or<br>Gemini models per pipeline. Also includes a Harness<br>MCP Server so external tools (Claude Code, Cursor,<br>Gemini CLI) can trigger Worker Agents.|Announced GA June 30, 2026<br>**ROADMAP**<br>**CAVEAT** — independent coverage flags<br>that Harness's own product page still lists<br>"Agent Marketplace" as an H2 2026<br>roadmap item and the broader agents<br>offering as "Limited Preview," which sits<br>awkwardly against the GA announcement.<br>Verify current status directly before<br>planning around it.|
|Code Agent<br>(IDE extension)|Standard IDE coding assistance, differentiated<br>mainly by shared account context with the rest of the<br>Harness platform|**DOCUMENTED** ;<br>**ANALYSIS** — third-<br>party reviewers note the IDE assistance<br>itself is fairly standard vs. dedicated coding-<br>agent products; the platform-context tie-in<br>is the actual differentiator, not raw coding<br>capability|


Harness Engineering Research Report — 6 

**Governance model for agentic execution** : because Worker Agents run as pipeline-native steps, they inherit the same approval gates, RBAC, and audit trail as human-triggered deployments — an agent doesn't get to bypass a production approval gate just because it's an agent. Each agent has its own scoped identity/ credential set rather than inheriting the invoking user's or pipeline's full permission set, and prompts/context pass through a policy-checking LLM Gateway before reaching a model. This is the practical answer to "how do we let AI touch production safely" that most CI/CD vendors are still bolting on as an afterthought. 

#### **<mark>DOCUMENTED</mark>** 

**Early adopter signal** (named, attributable): engineers at Verint Systems and United Airlines reported building a first production agent (Kubernetes-troubleshooting and security-remediation, respectively) in about four days each — a genuinely low barrier to a first agent, though scaling governance (who approves an agent for production, how per-agent audit/cost data feeds existing SRE/FinOps tooling) is the harder second step that hasn't been publicly demonstrated at large scale yet. **<mark>ANALYSIS</mark>** 

## **6. Competitive Positioning** 

The most common RFP mistake, per multiple independent CI/CD comparison sources, is treating these as one category. They aren't: **CI runners** (GitHub Actions, GitLab CI, Jenkins, Harness CI) execute build/test jobs and produce artifacts; **CD operators** (ArgoCD) watch Git and reconcile cluster state; **Harness** and **GitLab** are unusual in trying to be both, plus governance, plus (in Harness's case) IDP and FinOps, under one control plane. 

|**Dimension**|**Harness**|**GitHub**<br>**Actions**|**GitLab**|**Jenkins**|**ArgoCD**|**Backstage**|
|---|---|---|---|---|---|---|
|Core model|Managed control<br>plane + self-<br>hosted Delegate<br>(push task, pull-<br>connect)|Managed<br>runners tied<br>to GitHub<br>repos|Integrated<br>SCM+CI+security<br>in one product;<br>runner-based|Self-hosted<br>master +<br>agent plugins|Pull-based<br>GitOps<br>reconciler<br>(K8s-native)|Open-<br>source<br>portal<br>framework,<br>self-hosted|
|Governance/<br>RBAC depth|Native OPA<br>policy-as-code<br>across pipelines,<br>IaC, and IDP;<br>Account/Org/<br>Project nesting|Basic; relies<br>on GitHub<br>org<br>permissions<br>+ third-party<br>actions for<br>policy|Strong, integrated<br>(approvals,<br>compliance<br>frameworks,<br>higher tiers)|Plugin-<br>dependent;<br>inconsistent<br>without heavy<br>customization|RBAC via<br>K8s/Argo<br>projects; not<br>a general<br>pipeline<br>governance<br>layer|Minimal out<br>of the box;<br>enterprises<br>typically<br>build<br>custom<br>RBAC|
|Vendor/tool<br>lock-in|Works with any<br>Git host; own<br>execution layer|Tied to<br>GitHub as<br>SCM|Best when SCM +<br>CI + registry all on<br>GitLab|None (fully<br>open) but<br>heavy plugin<br>lock-in over<br>time|Kubernetes-<br>only; needs<br>a separate<br>CI tool|None<br>(framework,<br>not a<br>product)|


Harness Engineering Research Report — 7 

|AI depth<br>(mid-2026)|Broadest:<br>agentic pipeline<br>steps, SRE/<br>AppSec/FinOps/<br>QA agents,<br>shared<br>knowledge<br>graph, GA'd<br>agent<br>governance<br>model|Copilot<br>integration<br>for code,<br>limited<br>pipeline-<br>native agent<br>tooling|GitLab Duo AI<br>features across<br>SDLC, growing<br>but narrower<br>agent-governance<br>story than<br>Harness's|Minimal<br>native AI;<br>relies on<br>plugins|None<br>natively (CD<br>reconciler,<br>not an AI<br>product)|None<br>natively|
|---|---|---|---|---|---|---|
|On-prem /<br>air-gapped|Strong (Self-<br>Managed<br>Enterprise<br>Edition, Delegate<br>model built for<br>network<br>isolation)|Weak<br>(GitHub<br>Enterprise<br>Server<br>exists but is<br>a different<br>product)|Strong (mature<br>self-managed<br>option)|Best-in-class<br>(fully self-<br>hosted by<br>design)|Good<br>(native to<br>K8s<br>clusters,<br>including<br>air-gapped)|Good (self-<br>hosted by<br>definition)|
|Reported<br>UX friction|Peer reviews<br>note the UI feels<br>"commercialized"<br>vs. Argo/Jenkins;<br>no pipeline-as-<br>code parity with<br>GitHub Actions/<br>Jenkins; no true<br>nested child-<br>pipeline<br>execution as of<br>the review period|Simple, git-<br>native<br>YAML; large<br>marketplace<br>of 15,000+<br>actions|Mature, well-<br>understood .gitlab-<br>ci.yml model|High<br>operational<br>overhead<br>maintaining<br>plugins/infra|Steep<br>learning<br>curve for<br>non-<br>Kubernetes<br>teams|Requires<br>real<br>engineering<br>investment<br>to operate<br>at scale|
|Pricing<br>model|Per-module<br>commercial tiers;<br>free tier exists<br>across major<br>products|Usage-<br>based<br>(minutes),<br>generous<br>free tier for<br>public repos|Per-seat tiers<br>($29–$99/user/mo<br>range reported)|Free/open-<br>source; cost<br>is operational<br>overhead|Open-<br>source<br>(CNCF);<br>cost is<br>operational<br>overhead|Open-<br>source<br>(CNCF);<br>cost is<br>operational<br>overhead|


Synthesized from independent comparison sources (Northflank, Opsio, JetBrains State of Developer Ecosystem, PeerSpot practitioner reviews) plus Harness's own comparison pages, which are flagged as vendor-authored where used. **<mark>ANALYSIS</mark>** for the synthesis; individual factual claims sourced as noted throughout. 

### **Market share reality check** 

Despite Harness's platform breadth, adoption data tells a different story than the feature comparison: JetBrains' 2025/2026 developer ecosystem data puts GitHub Actions at roughly a third of organizational CI/CD adoption, Jenkins around 28%, and GitLab CI around 19% — Harness doesn't crack the top tier of 

Harness Engineering Research Report — 8 

raw adoption, and PeerSpot engagement data shows both GitHub Actions' and Harness's "mindshare" metric declining year over year as of mid-2026. **<mark>DOCUMENTED</mark>** — this is a genuinely useful counterweight to vendor narrative: Harness's pitch is platform consolidation and governance depth for large regulated enterprises, not developer-mindshare dominance, and the adoption numbers are consistent with that positioning rather than contradicting it. 

## **7. Decision Framework: When Does Harness Actually Make Sense?** 

|**Situation**|**Likely right**<br>**call**|**Why**|
|---|---|---|
|Small team, all-GitHub, simple build/test/<br>deploy|GitHub<br>Actions|Zero platform overhead; Harness's governance/IDP<br>layer is dead weight at this scale|
|Single-vendor SDLC preference, mid-size<br>org|GitLab|Comparable "one platform" philosophy with a more<br>mature, larger install base and lower operational<br>complexity than adding a second control plane|
|Heavy regulatory/compliance burden (bank,<br>healthcare, gov), multi-BU, multi-cloud, need<br>auditable policy enforcement across<br>pipelines + IaC + AI agents under one<br>governance model|Harness is a<br>strong fit|This is the specific gap Harness is architected for:<br>OPA-driven policy across every entity type, RBAC<br>that mirrors enterprise org structure, and — as of<br>2026 — a governance model built for letting AI<br>agents touch production safely|
|Already deep in Kubernetes/GitOps, want a<br>pull-based CD reconciler specifically|ArgoCD<br>(paired with<br>any CI tool)|Harness CD can do this too, but if the org is<br>Kubernetes-only and doesn't need the broader<br>platform, ArgoCD is the CNCF-standard, lower-<br>overhead choice|
|Heavy legacy Jenkins investment, air-<br>gapped requirement, maximum<br>customization need|Jenkins<br>remains<br>defensible|Full control and a mature plugin ecosystem still beat<br>migration cost/risk in many regulated on-prem<br>estates|
|Want an internal developer portal but don't<br>want vendor lock-in or ongoing license cost,<br>and have engineering capacity to own it|Backstage<br>(self-hosted)|Full customization freedom; Harness IDP is the right<br>call instead when the org lacks capacity to run/<br>govern Backstage at scale or wants OPA/RBAC/<br>audit built-in from day one|


Framework synthesized from the comparison sources above. **<mark>ANALYSIS</mark>** 

## **8. Key Risks and Diligence Items** 

• **GA-vs-roadmap ambiguity on the newest AI agent launch.** Independent reporting explicitly flags that Harness's Agent Marketplace GA announcement (June 30, 2026) conflicts with the company's own 

Harness Engineering Research Report — 9 

product page, which still marks parts of the offering "Limited Preview" and lists the Marketplace as H2 2026. Confirm current status with Harness directly before committing a roadmap to it. **<mark>ROADMAP</mark>** 

- **"Commercialized" UX friction and pipeline-as-code gaps** reported by practitioner reviewers (PeerSpot), including lack of nested child-pipeline execution as of the review period — verify against current release notes for your target version before assuming parity with GitHub Actions/Jenkins pipeline-as-code ergonomics. 

- **Meeting-content ingestion for the Human-Aware Change Agent** (Slack/Teams/Zoom mining) is a genuine data-governance decision, not just a technical toggle — scope what gets captured, retained, and who can query it before enabling. 

- **Vendor-authored comparison content** (Harness's own "Harness vs. X" pages) was used sparingly above and flagged; treat scale/performance claims sourced from Harness's own marketing (8x build speed, 80-to-1 effort reduction, etc.) as vendor benchmarks pending independent verification in your own environment. 

## **9. Glossary** 

|**Term**|**Meaning**|
|---|---|
|Control Plane /<br>Harness Manager|Multi-tenant microservices cluster that owns pipeline engine, RBAC, policy, scheduling —<br>never touches customer infra directly|
|Delegate|Customer-managed worker agent; opens outbound WSS to the Manager; executes tasks<br>against local infra|
|Lite Engine|Container spawned inside ephemeral CI build pods to orchestrate step execution|
|Policy Set|A named group of OPA/Rego policies scoped to an entity type + event, with per-policy<br>severity (Error and Exit / Warn and Continue)|
|Software Delivery<br>Knowledge Graph|Harness's connected data layer spanning services, pipelines, deployments, security<br>findings, and cost — the shared context AI agents reason over|
|Worker Agent|A pipeline step that runs as a reasoning LLM-backed agent instead of a fixed script, with<br>sandboxing, scoped credentials, and policy-gated model calls via an LLM Gateway|
|IDP Scorecard|A computed score against a service in the Harness Internal Developer Portal, usable as an<br>OPA policy input (e.g., gate promotion below a score threshold)|


This report deliberately excludes company/funding history, org chart, and go-to-market material per scope adjustment during research. For the full 23-section prompt — including per-industry reference architectures, 15 hands-on labs, and sequence diagrams — use Claude's Research feature for a dedicated multi-hour pass; this document is intentionally the technical core rather than that full deliverable. 

Harness Engineering Research Report — 10 

