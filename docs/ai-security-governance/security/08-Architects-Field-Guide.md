---
title: "The Architect's Field Guide: A Real-World Walkthrough"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "08-Architects-Field-Guide.pdf"
doc_type: guide
tags: ["ai-security", "governance"]
last_reviewed: 2026-07-10
covers_version: "N/A"
last_reviewed: 2026-07-10
---

#### **PRACTICAL FIELD GUIDE** 

# **The Architect's Field Guide: A Real-World Walkthrough** 

One Bank, One Architect, Six Months — Greenfield Build Through Live Incident, With the Reasoning Made Visible 

**Document Code:** EASA-FIELD **Version:** 1.0 **Date:** June 2026 **Scope:** Companion to EASA-01 through EASA-06 and EASA-ZTM 

_Enterprise Agentic AI Security Architect (2026–2030) Master Research Program_ 

Page 1 of 28 

## **Table of Contents** 

Page 2 of 28 

## **How This Guide Works** 

Every other document in this program — the six-volume reference architecture and the ten-stage Zero to Mastery curriculum — teaches by domain: identity, then MCP, then A2A, then governance, each treated as its own complete topic. That's the right structure for reference material and for systematic skill-building. It is not how the work actually arrives in a real job, where an architect inherits a partial mess, makes sequencing decisions under competing pressure from multiple stakeholders, and discovers which of those decisions were right only months later, sometimes at 2 a.m. 

This guide does the opposite. It follows one fictional but realistic organization — Meridian Trust Bank — through one architect's first six months: the inherited mess, the identity rebuild, an MCP/A2A rollout under deadline pressure, a regulatory compliance crunch, standing up real operations, a live security incident, and the postmortem that follows. The technical substance is identical to the rest of the program. What's different is that you see decisions made in the order and under the pressure a real engagement imposes, including decisions that turn out, later, to have tradeoffs nobody could have fully seen at the time they were made. 

**How to Read the Recurring Boxes** 

|**Box Type**|**What It Contains**|
|---|---|
|The Architect's Reasoning (teal)|The thinking behind a decision, writen out — not just what was decided, but<br>why, including what was weighed and discarded|
|Decision Point (amber)|A genuine fork in the road, with the real optons considered, their tradeofs,<br>which one was chosen, and why — these are the moments worth pausing on<br>longest|
|Exhibit (charcoal)|An actual artfact — a policy fle, a token structure, a confguraton snippet —<br>illustratng what the decision produced in concrete, inspectable form|
|Field Note (gold)|A lesson that generalizes beyond Meridian specifcally — the transferable<br>takeaway, fagged explicitly so it doesn't get lost in the narratve detail|

### **Meridian Trust Bank — Quick Reference** 

Fictional, composited from realistic patterns observed across the kinds of organizations this program is written for. Keep this orientation in mind as the chapters unfold; later chapters assume you remember these basics rather than re-introducing them. 

- **Profile:** ~$40B in assets, regional retail and commercial bank, EU client nexus creating partial EU AI Act exposure. 

- **Starting position:** 47 agents in production or near-production, discovered (not officially inventoried) across six business units, no central governance, eighteen months of organic, ungoverned AI adoption. 

- **Your role:** First Enterprise Agentic AI Security Architect, reporting to the CTO, with a CISO-adjacent mandate until a dedicated AI CISO is hired. 

Page 3 of 28 

- **The arc:** Chapter 1 (discovery) → Chapter 2 (identity) → Chapter 3 (MCP/A2A under deadline) → Chapter 4 (governance/compliance crunch) → Chapter 5 (operations stand-up) → Chapter 6 (the incident) → Chapter 7 (the fix and what it teaches). 

##### **A note on realism** 

Meridian is fictional, but every technical mechanism, every control, every tradeoff described is grounded in the same current 2026 material underlying the rest of this program — SPIFFE/SPIRE, MCP gateway patterns, A2A trust brokering, the OWASP Agentic Top 10, ISO 42001 and EU AI Act crosswalks, AI SOC correlation logic. Nothing here is invented technology; what's constructed is the realistic sequence of pressures, half-information, and competing priorities a real architect operates under — because that experience, not just the technical content, is what this guide exists to convey. 

Page 4 of 28 

##### **CHAPTER 1** 

## **The Inherited Mess** 

_Meridian Trust Bank — Week 1 on the job_ 

### **The Setting** 

Meridian Trust Bank is a fictional but realistic mid-size regional bank — roughly $40 billion in assets, a retail and commercial banking business, and an eighteen-month-old internal AI initiative that has, in the words of the CTO who hired you, "gotten ahead of itself." You are the bank's first Enterprise Agentic AI Security Architect. This is your first Monday. 

Everything in this guide that follows is built around Meridian, used consistently chapter to chapter, so you experience the work the way it actually unfolds for a real architect: as one continuous, evolving system with history, politics, and technical debt — not as seven disconnected vignettes. The technical content is identical in substance to the six-volume EASA reference program and the Zero to Mastery curriculum; what's different here is the order you encounter it in, which is the order a real engagement forces on you, not the tidy domain-bydomain order a reference manual uses. 

### **What You Find** 

Your first two days are spent in meetings and log access requests, not design work. By Wednesday you have a real picture, and it looks like this: 

|**Finding**|**Detail**|
|---|---|
|Agent count|47 distnct AI agents in some form of producton or near-producton use, discovered across six<br>business units — your own count, not the 31 the existng "AI inventory" spreadsheet shows|
|Identty|41 of the 47 agents authentcate using a shared service-account patern: three Azure service<br>principals, each with broad Graph API and internal API scopes, reused across many unrelated<br>agents|
|MCP|A platorm engineering team stood up an internal MCP gateway eight months ago for one team's<br>use; eleven other teams have since connected to it without going through any review, and four<br>teams run their own unmanaged MCP servers entrely outside it|
|A2A|None in producton yet, but the commercial lending group is six weeks from launching an agent<br>that will negotate document exchange with a loan-originaton SaaS vendor's agent over A2A —<br>discovered by accident in a Slack channel, not through any governance process|
|Governance|No AI Governance Board exists. The bank's existng model-risk-management (MRM) functon, built<br>for traditonal statstcal and ML credit models under SR 11-7-style governance, has never<br>reviewed an agentc system and does not have a framework for one|
|Regulatory<br>exposure|Meridian has EU-domiciled commercial clients or otherwise meaningful EU nexus for a subset of<br>services serving roughly the EU AI Act's high-risk Annex III triggers — fagged but unconfrmed by|

Page 5 of 28 

**Finding Detail** Legal — eight weeks before the Act's August 2026 high-risk enforcement date A near-miss four months ago: a marketing-content agent with an overly broad CRM scope drafted Prior incident and nearly auto-sent a customer email containing another customer's account details, caught only because a human reviewer happened to notice — the agent's scope was never revisited afterward 

##### **THE ARCHITECT'S REASONING** 

Every item in that table maps to something specific from the reference program, and recognizing the mapping immediately — without needing to look anything up — is what "mastery" actually cashes out to in a real engagement. The shared service-account pattern is the exact static-credential anti-pattern from Domain 2. The unmanaged MCP servers are a live ASI04 supply-chain exposure. The looming A2A launch with zero governance visibility is exactly the kind of "discovered in a Slack channel" scenario the Domain 6 gateway pattern exists to prevent. The near-miss is a textbook case of autonomy granted without an autonomy-level framework — Domain 14's entire reason for existing. 

The instinct under this much pressure is to start fixing the loudest fire first — usually the A2A launch six weeks out, because it has a date attached to it and a business sponsor pushing. Resist that instinct. The first job is not fixing anything. It's establishing a single source of truth for what actually exists, because every fix you make on top of incomplete information will need to be redone once the full picture emerges — and in security work, redone work on identity and access control has a way of leaving orphaned grants behind that nobody remembers to clean up. 

### **The First Real Decision** 

##### **DECISION POINT  Where do you spend your first three weeks?** 

The CTO wants a plan by Friday. The commercial lending group wants their A2A launch unblocked. Legal wants an answer on EU AI Act exposure. You have approximately three weeks of runway before any of these constituencies expects visible progress, and you cannot do all three well at once. 

|**Opton**|**Tradeof**|
|---|---|
|Stop the A2A launch, fx it<br>frst|Addresses the most visible, tme-boxed<br>risk, but without an identty foundaton<br>you'd be building A2A trust controls on top<br>of the same shared-service-account<br>problem — solving the wrong layer frst.|
|Full regulatory gap<br>analysis frst|Satsfes Legal's urgency and the Act's<br>deadline pressure, but produces a<br>compliance document describing controls<br>that don't exist yet, which is close to<br>worthless as an audit artfact.|
|**Agent discovery and**<br>**✓**<br>**identty foundaton frst**|Slower to produce a visible deliverable in<br>week one, correctly sequences the rest of<br>the work, but requires telling three<br>impatent stakeholders to wait.|

Page 6 of 28 

##### **Rationale:** 

This is the same conclusion the reference program reaches by a different route: fund the identity substrate first, because almost everything else gets simpler once it exists. In practice that means week one is spent finishing a true agent inventory (closing the gap between 47 and the official 31), and weeks two and three are spent standing up the SPIFFE/SPIRE trust domain and a compound-identity pattern — covered in Chapter 2 — even though it produces nothing visibly exciting to show the CTO on Friday. What you show the CTO instead is the inventory gap itself: a clear, numbers-based argument that the bank cannot make a credible A2A launch decision or a credible regulatory claim while it doesn't actually know what it's running. That argument, delivered with the inventory data behind it, is usually enough to buy the three weeks. 

###### **FIELD NOTE — TRANSFERABLE LESSON** 

_In a real engagement, the hardest part of identity-first sequencing is rarely the technical argument — it's the political one. Stakeholders with a deadline do not want to hear "first we need to fix something invisible." The inventory gap (47 vs. 31 agents) is the tool that wins this argument every time, because it's concrete, it's numeric, and it's not abstract architecture talk — it's "we don't actually know what we're running," which is a sentence that lands with any executive regardless of technical background._ 

Page 7 of 28 

##### **CHAPTER 2** 

## **The Identity Rebuild** 

_Weeks 2–6_ 

### **Starting State** 

Three Azure service principals carry the authentication load for 41 of 47 agents. Two of those principals have Microsoft Graph User.Read.All and Mail.Send scopes — far broader than any individual agent actually needs — because at some point an engineer needed Mail.Send for one agent, didn't have a narrower role available, and granted the broad one rather than requesting a new scoped credential through what was, at the time, a multiweek request process. This is not a story about careless engineers. It's a story about a credential-provisioning process so slow that the path of least resistance was reusing an over-scoped credential someone else already had. 

##### **THE ARCHITECT'S REASONING  Why this matters before any architecture decision gets made** 

It would be easy to read the prior paragraph as background color and skip to the SPIFFE deployment plan. Don't. The reason the over-broad credentials exist is a process failure, not a technology failure, and if the new identity architecture doesn't also fix the underlying provisioning speed problem, engineers will route around it again within a quarter — just as they did the first time. Every identity architecture decision in this chapter is evaluated against one extra criterion beyond the usual security properties: can a developer get a correctly-scoped credential for a new agent in roughly the same time it used to take to grab a broad one. If the answer is no, the architecture will fail in practice regardless of how sound it is on paper. 

### **Building the SPIFFE/SPIRE Trust Domain** 

The technical design follows the pattern from EASA-02, Domain 2 directly: a SPIRE server is stood up with trust domain spiffe://meridian-agents.internal, with SPIRE agents deployed to every Kubernetes cluster and VM scale set hosting agent workloads. Attestation selectors are registered per-workload — for Kubernetes-hosted agents, the selector chain uses namespace, service account, and a signed container-image digest; for the smaller number of VM-hosted legacy agents, selectors use cloud instance metadata and a host-level attestation agent. 

###### **EXHIBIT — SPIRE Registration Entry — Customer Support Agent (Kubernetes-hosted)** 

```
spire-server entry create \
```

- `-spiffeID spiffe://meridian-agents.internal/agent/support/ticket-responder \` 

- `-parentID spiffe://meridian-agents.internal/spire/agent/k8s-psat/prod-cluster \` 

- `-selector k8s:ns:agents-support \` 

- `-selector k8s:sa:ticket-responder-sa \` 

- `-selector k8s:container-image-digest:sha256:8f2a1c...e94b \` 

- `-ttl 3600` 

The TTL of 3,600 seconds (one hour) on SVIDs was a deliberate, debated choice — short enough to make a stolen SVID close to worthless quickly, long enough to avoid creating excessive re-attestation load across roughly 50 agents and growing. SPIRE handles automatic rotation transparently to the agent workload, so this number 

Page 8 of 28 

can be revisited downward later without an application-level change; the team agreed to start at one hour and tighten it once the rotation infrastructure had proven itself under real load for a month. 

### **Solving Compound Identity — The Actual Hard Part** 

SPIFFE alone answers "which agent process is this." Meridian's harder problem, true to the Domain 2 reference material, was compound identity: the customer support agent needs to act on behalf of specific support staff, sometimes triggered by an inbound ticket with no human directly in the loop, and the bank's compliance requirements mean every action needs to be traceable to a specific accountable human or an explicit, documented exception for fully autonomous action. 

##### **DECISION POINT  How does the agent carry 'who it's acting for'?** 

Three options were seriously evaluated by the platform team, with input from the bank's existing identity team (who own the human-facing Entra ID tenant and were, reasonably, nervous about a parallel identity system emerging). 

|**Opton**|**Tradeof**|
|---|---|
|Agent impersonates the<br>support staf member<br>directly|Simplest to implement against existng<br>Entra ID; destroys the audit distncton<br>between human and agent acton, which<br>Meridian's compliance team fagged as a<br>non-starter for SOC 2 and internal audit<br>purposes.|
|Build a separate, parallel<br>agent-identty claims<br>system|Maximum fexibility for agent-specifc<br>needs; creates exactly the 'two<br>incompatble identty systems'<br>fragmentaton risk the reference<br>architecture warns against, and the existng<br>identty team would reasonably resist<br>owning a system they didn't build.|
|**RFC 8693 token**<br>**✓**<br>**exchange with an actor**<br>**claim, integrated into the**<br>**existng Entra ID tenant**|More upfront integraton work; keeps one<br>identty system of record, satsfes the audit<br>requirement, and gives the existng identty<br>team a clear ownership boundary.|

##### **Rationale:** 

The agent's SPIFFE SVID authenticates the workload to an internal token-exchange service, which mints a short-lived JWT carrying both the agent's own identity and an actor claim identifying the human or business process the action is performed for. For ticket-triggered autonomous actions with no specific human in the loop, the actor claim names a registered 'autonomous action' service identity rather than a real person — which sounds like a small detail but turned out to matter enormously during the Chapter 6 incident, because it meant the audit trail could immediately distinguish a genuinely autonomous action from one falsely claiming human sponsorship. 

###### **EXHIBIT — Compound Identity Token (decoded, illustrative)** 

```
{
  "iss": "https://identity.meridian.internal",
  "sub": "spiffe://meridian-agents.internal/agent/support/ticket-responder",
```

Page 9 of 28 

```
  "act": {
    "sub": "svc:autonomous-ticket-triage",
    "acting_for": "support-team:tier1",
    "authorization_basis": "policy:AUTO-TICKET-REPLY-V2"
  },
  "scope": "crm:read ticket:read email:draft",
  "exp": 1719014400
}
```

###### **FIELD NOTE — TRANSFERABLE LESSON** 

_The 'authorization_basis' field above isn't in any textbook diagram of an actor-claim token — it was added during a real design review when the bank's internal auditor asked, reasonably, 'when I see this token in a log six months from now, how do I know what policy authorized this action without finding the engineer who built it.' Build a habit of asking what a token needs to say to a future, less-informed reader, not just what it needs to say to the system validating it right now._ 

### **The Migration — Not a Cutover** 

47 agents do not migrate from shared service accounts to SPIFFE identity in one weekend, and trying to do so would itself be the kind of high-risk, low-visibility change a careful architect avoids. The migration ran in three waves over five weeks: 

|**Wave**|**Scope**|**Why This Order**|
|---|---|---|
|Wave 1 (Week 3)|6 lowest-risk, read-only agents (internal<br>documentaton search, meetng-notes<br>summarizers)|Validates the SPIRE deployment and token-exchange<br>service under real but low-consequence load before<br>anything with write access touches it|
|Wave 2 (Weeks<br>4–5)|28 agents with limited write access (tcket<br>systems, internal wikis, non-fnancial CRM<br>felds)|The bulk of the feet; surfaces most integraton<br>fricton (selector misconfguratons, scope-mapping<br>gaps) while consequences of a mistake remain<br>contained|
|Wave 3 (Week 6)|13 highest-risk agents, including the<br>customer support agent and anything<br>touching fnancial or PII-sensitve systems|Migrated last and individually reviewed, once the<br>patern has been proven twice over on lower-stakes<br>populatons|

Each wave ran both identity systems in parallel for 48 hours — the agent's calls authorized under the old shared service account while simultaneously being shadow-validated against the new SPIFFE-based policy, with mismatches logged but not yet enforced — before cutting over enforcement. This shadow-mode pattern caught eleven scope mismatches across the three waves that would otherwise have caused either an outage (a legitimate call newly denied) or a silent over-grant (a call the old shared account allowed that the new scoped identity should not have). 

##### **THE ARCHITECT'S REASONING** 

Eleven scope mismatches out of 47 agents is worth sitting with. That's roughly a quarter of the fleet where nobody — not the original developer, not the platform team, not you — actually knew what access the agent needed until the shadow-mode comparison made the gap visible. This is the single strongest empirical argument for the migration 

Page 10 of 28 

approach described above, and it's worth keeping as a story to tell the next stakeholder who suggests a faster cutover: a 'fast' migration that skips shadow-mode validation isn't actually faster, it's just deferring the discovery of these mismatches to the first production incident they cause. 

##### **CHAPTER 3** 

## **MCP and A2A Under Deadline Pressure** 

_Weeks 4–9 (overlapping the identity rebuild)_ 

### **The Lending Team Hasn't Waited for You** 

By week four, the commercial lending group's A2A integration with their loan-origination SaaS vendor is two weeks from its committed launch date, and the lending VP has escalated to the CTO twice about the security review being a blocker. This is the predictable consequence of the Chapter 1 sequencing decision: the team that needed to wait, waited, and is now unhappy about it. Part of the job in this chapter is technical; an equal part is managing a relationship with a stakeholder who has a legitimate business deadline and a less legitimate but very real frustration that security wasn't involved six months ago when this project started. 

### **First, the MCP Gateway Consolidation** 

Before any A2A work, the four unmanaged MCP servers from the Chapter 1 inventory needed to be brought under the existing gateway or shut down — partly because two of them have direct relevance to the lending agent's eventual tool access, and partly because leaving them unmanaged while standing up new A2A trust infrastructure would mean building a more sophisticated control on top of a foundation that was already known to be weak. 

|**Unmanaged Server**|**Dispositon**|**Why**|
|---|---|---|
|Internal document-search MCP<br>server (Marketng team)|Migrated to gateway, tools<br>re-scoped|Low risk but in actve use; straightorward migraton<br>with no schema issues found|
|"Quick prototype" pricing-<br>calculator MCP server (Lending<br>team, built by a contractor)|Decommissioned, rebuilt<br>under gateway from scratch|Discovery-tme scan found the tool descriptons<br>referenced an undocumented internal pricing API<br>with no rate limitng; rebuilding was faster and safer<br>than retroftng|
|Legacy HR-policy lookup server<br>(HR team)|Migrated to gateway|Tool defnitons were clean; scope was already<br>appropriately narrow, which made this the easiest of<br>the four|
|Vendor-provided MCP server<br>for a third-party document OCR<br>tool|Migrated to gateway with<br>additonal vendor-specifc<br>controls|Third-party origin triggered the heightened checklist<br>(Chapter 3, MCP gateway secton) — vendor would<br>not initally provide a signed tool manifest, which<br>became a real negotatng point with their account<br>team|

Page 11 of 28 

|**Unmanaged Server**|**Dispositon**<br>**Why**|
|---|---|

##### **THE ARCHITECT'S REASONING** 

The pricing-calculator finding is the one worth dwelling on, because it's a near-perfect real-world instance of tool poisoning risk (ASI02/ASI04) discovered through routine process rather than through an exotic red-team exercise. Nobody attacked this server. A contractor, working fast, built a tool description that was functionally accurate but operationally dangerous — it called an internal pricing API that had no rate limiting because it was never designed to be called by something that could invoke it hundreds of times in a loop. The discovery-time schema scan flagged the missing rate-limit behavior as an anomaly worth a human look, not because it detected malice, but because it detected a pattern (an unbounded internal API call path) that the gateway's scanning rules are tuned to flag regardless of intent. This is the practical argument for gateway scanning that a purely incident-response framing misses: most of what it catches in year one isn't attackers, it's exactly this kind of well-intentioned gap. 

### **Now, the A2A Integration** 

The lending agent needs to exchange loan application documents and status updates with the SaaS vendor's agent over A2A. The vendor's integration documentation, when finally obtained, described a fairly typical 2025era A2A deployment: Agent Cards, but not yet consistently signed across all their endpoints, and no explicit pertask spend or rate cap on their side beyond a generic API rate limit. 

##### **DECISION POINT  Do you launch on the original two-week timeline?** 

The vendor's Agent Card signing is inconsistent — their production endpoint is signed, but their sandbox/staging endpoint, which the lending team had been testing against, is not. The vendor's account team says full signing rollout across all environments is "on the roadmap, no committed date." 

|**Opton**|**Tradeof**|
|---|---|
|Launch against<br>producton endpoint<br>only, treat staging as<br>informatonal|Meets the deadline by avoiding the gap<br>entrely in producton; requires discipline to<br>ensure no producton trafc ever silently<br>falls back to an unsigned endpoint.|
|Delay launch untl vendor<br>signs all endpoints|Cleanest security posture; gives away<br>leverage and a frm tmeline to a vendor<br>who has already shown no urgency, with<br>real business cost to the lending team.|
|**Launch on schedule**<br>**✓**<br>**with a Meridian-side**<br>**compensatng control:**<br>**reject any Agent Card**<br>**without a valid signature**<br>**regardless of which**<br>**vendor environment it**<br>**claims to be, with hard-**<br>**coded producton-**<br>**endpoint pinning**|Meets the deadline, keeps the gap closed<br>on Meridian's side regardless of vendor<br>follow-through, but adds gateway<br>confguraton complexity and a manual<br>step if the vendor later wants to test<br>against staging again.|

Page 12 of 28 

##### **Rationale:** 

The chosen option reflects a pattern that recurs constantly in real vendor relationships: you frequently cannot force a counterparty's security posture on their timeline, but you can almost always control what your own gateway accepts. Production-endpoint pinning plus unconditional signature enforcement meant the launch proceeded on schedule, the staging gap became operationally irrelevant (because the gateway would never route real traffic there), and — critically — the compensating control was documented as a tracked exception with a follow-up date, not a quiet workaround that everyone forgets about in three months. 

###### **EXHIBIT — A2A Gateway Policy Excerpt — Lending Agent Outbound Rule** 

```
rule: lending-agent-outbound-a2a
  applies_to: agent:lending/document-exchange
  allow_endpoints:
    - https://api.loanvendor.example/a2a/v1   # production, signed only
  require:
```

```
    - agent_card.signature.valid == true
```

```
    - agent_card.signature.domain == "loanvendor.example"
    - tls_version >= 1.3
  deny_endpoints:
```

```
    - https://staging-api.loanvendor.example/a2a/v1  # explicit deny, not just omission
  per_task_spend_cap_usd: 0   # this integration exchanges documents, never payments
  audit: full_payload_capture
```

Notice the explicit deny rule for the staging endpoint, rather than simply omitting it from the allowlist. An explicit deny is intentional defense in depth: if a future configuration change accidentally adds a broader allow pattern that would have matched the staging URL, the explicit deny still blocks it, whereas a simple omission relies on every future change correctly preserving the absence. 

### **Trust Broker — Starting Score for a New External Counterparty** 

The lending vendor's agent is Meridian's first production external A2A counterparty, so the trust-broker design from the reference architecture had no existing population to calibrate against. The team set an initial trust score deliberately conservative — enough to permit the document-exchange use case the launch required, not enough to permit anything beyond it — with an explicit 90-day review to reassess based on real operating history. 

|**Trust Signal**|**Inital Assessment**|**Score Contributon**|
|---|---|---|
|Identty assurance|Signed cards on producton endpoint only; SOC 2 Type II<br>report provided and reviewed|Moderate|
|Behavioral conformance|No history yet — new counterparty|Neutral (no penalty, no<br>credit)|
|Content provenance|All exchanged documents are vendor-asserted, no<br>independent verifcaton available|Moderate-low — fagged<br>as the weakest signal|
|Operator standing|Vendor is an established player with existng banking-sector<br>clients and a named security contact|Moderate-high|

Page 13 of 28 

The resulting composite score permitted document exchange (the actual launch requirement) but was explicitly configured to deny any future request to expand scope toward, say, direct system-to-system financial data exchange without a fresh, manual trust review — meaning a future engineer cannot accidentally widen this relationship's blast radius just by changing a config flag; widening requires a deliberate, logged policy change. 

###### **FIELD NOTE — TRANSFERABLE LESSON** 

_A brand-new external counterparty should never inherit a 'fresh start' high trust score just because nothing bad has happened yet — neutral behavioral conformance is not the same as good behavioral conformance, and conflating the two is how trust-score systems get gamed over time. Score what you can actually verify today, and make the score's ceiling, not just its floor, an explicit design choice._ 

Page 14 of 28 

##### **CHAPTER 4** 

## **The Governance and Compliance Crunch** 

_Weeks 7–12_ 

### **Eight Weeks Becomes Five** 

Legal's original eight-week estimate to confirm EU AI Act exposure slips, as these things do, and by the time a definitive answer arrives — yes, two specific services (an AI-assisted credit-decisioning support tool and a portion of the customer support agent's workflow that touches account-status determinations) plausibly fall under Annex III high-risk classification — only five weeks remain before the Act's high-risk obligations become enforceable. 

### **Building the Crosswalk Under Time Pressure** 

This is where having already done the identity and MCP/A2A foundational work in Chapters 2 and 3 pays off directly: a meaningful fraction of what the Act requires is evidence that controls exist and are operating, and those controls now actually exist, rather than needing to be invented under deadline pressure. The crosswalk work becomes mostly an exercise in mapping and evidence-gathering rather than control design. 

|**EU AI Act Requirement**<br>**(Annex III high-risk)**|**Status at Week 7**|**Evidence Source**|
|---|---|---|
|Risk management system (Art.<br>9)|Substantally in place|MAESTRO threat models from the original architecture<br>work; AI Governance Board charter (stood up week 5,<br>see below)|
|Data governance (Art. 10)|Partally in place|Memory governance lifecycle existed for the customer<br>support agent; the credit-decisioning tool's data lineage<br>required new work — the single biggest gap found|
|Technical documentaton (Art.<br>11, Annex IV)|Largely new work|Required compiling architecture diagrams, the Agent<br>Registry entries, and threat models into the Act's<br>specifc documentaton format — administratve, but<br>genuinely tme-consuming|
|Human oversight (Art. 14)|In place|Autonomy-level assignments (Chapter 2 work meant<br>every agent already had one) directly satsfed this once<br>mapped to the Act's specifc oversight-mechanism<br>language|
|Accuracy, robustness,<br>cybersecurity (Art. 15)|Substantally in place|SPIFFE identty substrate, MCP/A2A gateway controls,<br>and the red-team plan (not yet executed — see Chapter<br>7) directly support this artcle|
|Conformity assessment &<br>registraton|New work, not a control<br>gap but a process gap|No internal control maps onto this — it required<br>engaging Legal and an external conformity assessment|

Page 15 of 28 

|**EU AI Act Requirement**<br>**(Annex III high-risk)**|**Status at Week 7**|**Evidence Source**|
|---|---|---|
|||body directly, on a tmeline the technical team could not<br>accelerate|

##### **THE ARCHITECT'S REASONING** 

Five of six rows in that table show real progress by week seven specifically because Chapters 2 and 3 weren't governance work in disguise — they were genuinely necessary architecture work that happened to also produce most of the evidence a regulator would want. This is the actual payoff of identity-first sequencing, made concrete: it's not just a security argument, it's a compliance-velocity argument. The one row that didn't benefit — conformity assessment and registration — is revealing in a different way: it's pure process and legal work that no amount of good architecture accelerates, and recognizing early which obligations are technical-evidence problems versus which are pure administrative/legal problems is itself a skill, because it tells you where to actually spend engineering time under a deadline versus where to just escalate to Legal and wait. 

### **Standing Up the AI Governance Board — Late, But Not Too Late** 

The board that should have existed from day one (per the operating model in EASA-06) gets formally chartered in week five, deliberately timed to exist before the crosswalk work needed an accountable approval body, rather than being stood up as a reactive afterthought once the Act's deadline was already missed. 

|**Seat**|**Filled By**|**Note**|
|---|---|---|
|Chair (AI CISO functon)|You, in additon to the architect role,<br>untl a dedicated AI CISO is hired|An explicit interim arrangement, documented as<br>such — not a permanent dual-hat|
|Legal & Compliance|Deputy General Counsel|Brought the EU AI Act fndings directly to the<br>frst board meetng|
|Enterprise Architecture|Existng Chief Architect|Provided contnuity with the bank's pre-existng<br>TOGAF practce|
|Model Risk Management|Head of MRM|Critcal seat — MRM's existng SR 11-7<br>governance experience translated more directly<br>to agentc governance than anyone expected<br>going in|
|Business representaton<br>(rotatng)|VP from whichever business unit has<br>an agent under actve review|Lending VP from Chapter 3 was the frst rotatng<br>seat-holder, which incidentally repaired some of<br>the relatonship fricton from the A2A delay|

###### **FIELD NOTE — TRANSFERABLE LESSON** 

_Putting the previously frustrated Lending VP on the Governance Board as its first rotating business seat was not originally planned — it emerged as a relationship-repair move once the A2A launch succeeded. It turned out to be one of the better decisions of the engagement: a stakeholder who has been through the review process from the inside becomes one of the most credible internal advocates for it with peer business units, in a way no amount of architecture documentation can replicate._ 

Page 16 of 28 

### **Autonomy Classification for the Whole Fleet** 

With the board chartered, the full 47-agent (now 49, two more were found during the MCP consolidation work in Chapter 3) population gets formally classified against the five-level autonomy scale — the first time every agent in the bank has a documented, board-visible autonomy level. 

|**Autonomy Level**|**Agent Count**|**Representatve Examples**|
|---|---|---|
|L0 — Advisory only|9|Internal research summarizers, meetng-notes tools|
|L1 — Supervised<br>executon|14|Marketng-content drafing (post-incident, scope tghtened), the<br>credit-decisioning support tool|
|L2 — Bounded autonomy|19|Customer support tcket triage and reply drafing, HR policy Q&A|
|L3 — Delegated<br>autonomy|6|Document-exchange lending agent (Chapter 3), internal IT-helpdesk<br>automaton|
|L4 — Full autonomy|1|A low-stakes internal meetng-room booking agent — deliberately the<br>only L4 agent in the bank at this stage|

The single L4 agent is worth noting specifically: the board's first real policy decision was that L4 (full autonomy, minimal human checkpoints) would be granted sparingly and only to genuinely low-consequence use cases until the AI SOC (Chapter 5) had a full operating quarter of track record — a conservative starting posture that the board explicitly revisits at the 90-day mark rather than leaving as an unstated default forever. 

##### **CHAPTER 5** 

## **Standing Up Operations** 

_Weeks 10–16_ 

### **From Architecture to Watching It Run** 

By week ten, Meridian has an identity substrate, a consolidated MCP gateway, a working A2A integration, a chartered governance board, and a documented autonomy-classified fleet. None of that, on its own, tells anyone whether the system is actually behaving correctly at 2 a.m. on a Tuesday. This chapter is about building the watching function — and it matters enormously for what happens in Chapter 6, because the incident that follows is only caught, contained, and correctly diagnosed because of specific choices made here. 

### **Choosing the Observability Foundation** 

##### **DECISION POINT  Which observability platform, and how much do you build versus buy?** 

Meridian's existing engineering organization already runs Datadog for conventional infrastructure observability, with significant existing investment and institutional knowledge. None of the agent-specific platforms (LangSmith, Langfuse, Arize Phoenix) are yet in use anywhere in the bank. 

Page 17 of 28 

|**Opton**|**Tradeof**|
|---|---|
|Adopt LangSmith fully,<br>separate from Datadog|Best natve integraton if the bank<br>standardizes on LangGraph for<br>orchestraton; creates a second monitoring<br>pane of glass that the existng<br>infrastructure SOC team would need to<br>separately learn.|
|Self-host Langfuse as a<br>fully independent stack|Full data sovereignty, no vendor lock-in,<br>zero usage-based cost growth; highest<br>inital build efort and ongoing operatonal<br>ownership for a team already stretched<br>thin.|
|**Instrument every**<br>**✓**<br>**agent with**<br>**OpenTelemetry/OpenLL**<br>**Metry conventons and**|Leverages the infrastructure SOC team's<br>existng tooling and skills immediately;<br>requires building the agent-specifc<br>dashboards and detecton logic on top of<br>|
|**feed traces into the**<br>**existng Datadog pipeline**|Datadog rather than getng them out of<br>the box from a purpose-built platorm.|

##### **Rationale:** 

The deciding factor wasn't which platform has the best agent-specific features in isolation — it was that Meridian already has a 24/7 SOC team trained on Datadog, and asking them to also learn and monitor a completely separate platform for agent traffic would have meant agent security incidents got slower, less experienced eyes during exactly the hours (nights, weekends) when fast triage matters most. The OpenTelemetry instrumentation layer keeps agent traces vendor-portable for the future while getting agent visibility in front of the team that already has 24/7 coverage on day one of the rollout. 

### **Building the Seven-Surface Correlation Logic** 

Per the AI SOC architecture from the reference program, Meridian's detection logic was built to watch seven surfaces, but — and this is a detail that matters in practice — not all seven were built simultaneously. Engineering capacity required sequencing, and the sequencing choice turned out to matter a great deal in Chapter 6. 

|**Surface**|**Build Priority**|**Why This Priority**|
|---|---|---|
|Identty|1st (Weeks 10–11)|Directly extends the Chapter 2 SPIFFE work; cheapest to instrument since the<br>atestaton and token-exchange logs already existed|
|MCP|2nd (Weeks 11–<br>12)|Gateway already centralized (Chapter 3); logs already structured and<br>consistent across all tool calls|
|Memory|3rd (Weeks 12–<br>13)|Required new instrumentaton at every memory write path across the feet —<br>the most labor-intensive surface to build|
|A2A|4th (Week 13)|Only one producton external counterparty existed at this point, so detecton<br>logic for this surface was deliberately built thin and well-tested rather than|

Page 18 of 28 

|**Surface**|**Build Priority**|**Why This Priority**|
|---|---|---|
|||broad|
|Runtme|5th (Weeks 14–<br>15)|Sandbox telemetry from Firecracker/gVisor environments required platorm<br>engineering coordinaton outside the security team's direct control|
|Agents<br>(behavioral/goa<br>l conformance)|6th (Week 15)|Required the ARE SLI work to mature frst (see below) before behavioral<br>baselines were meaningful|
|Guardrails|7th (Week 16)|Lowest priority — Meridian had not yet deployed a dedicated guardrail<br>platorm; this surface was the least mature at the tme of the Chapter 6<br>incident, a fact that becomes directly relevant|

##### **THE ARCHITECT'S REASONING** 

Flag this table, because it's going to matter in the next chapter in a way that's easy to miss on a first read: Memory was built third, ahead of A2A and well ahead of Agents/behavioral monitoring. That wasn't an arbitrary choice — memory write paths touch customer PII directly, and the team correctly judged that as the highest-consequence gap to close early. But it means that by the time of the Chapter 6 incident, the bank had roughly five weeks of mature memory-surface monitoring and detection-pattern tuning, against only about one week of behavioral/goalconformance monitoring. Sequencing decisions like this one are never free — they trade an earlier, stronger defense on one surface against a later, weaker one on another, and a good architect can usually predict, in advance, roughly where the resulting gap will bite first. 

### **Cross-Surface Correlation Rule — A Concrete Example** 

Building actual correlation logic, not just per-surface alerting, was the hardest engineering problem in this chapter. Here is one of the rules that shipped, written for the customer support agent specifically, because it's the rule that ends up mattering in Chapter 6: 

###### **EXHIBIT — AI SOC Correlation Rule — CORR-014** 

```
rule_id: CORR-014
name: "Unusual tool-call burst followed by unfamiliar memory write"
surfaces: [mcp, memory]
condition:
  - mcp.tool_calls.count(window=2m, agent=$AGENT) > baseline_p99 * 3
```

```
  - AND memory.write.entity_novelty(window=5m, agent=$AGENT) == "high"
  - AND identity.actor_claim.acting_for NOT IN recent_task_context($AGENT)
severity: HIGH
action: page_on_call, do_not_auto_kill  # human triage required before kill switch
```

The do_not_auto_kill flag on this particular rule was a deliberate, debated decision: this specific pattern can also occur during entirely legitimate bulk operations (a mass ticket reassignment during a team reorganization, for instance), so the team chose human triage over automatic containment for this rule specifically, while other, higher-confidence rules elsewhere in the ruleset were configured to auto-kill. Knowing which rules deserve automatic response and which deserve a human in the loop before action is itself an architectural judgment call, not a default to apply uniformly. 

Page 19 of 28 

### **Making the Kill Switch Real, Not Theoretical** 

The kill-switch framework existed on paper since the Chapter 2 identity work (revocation was always going to work by invalidating SVIDs and outstanding tokens), but "existing on paper" and "tested under realistic conditions" are different things. Week 16 included Meridian's first full kill-switch drill: deliberately revoking the customer support agent's identity mid-session during a controlled test window, with the on-call SOC analyst as the trigger, timed end to end. 

|**Drill Metric**|**Result**|**Target Set Aferward**|
|---|---|---|
|Time from trigger to SVID revocaton<br>propagatng to SPIRE agents|41 seconds|Under 30 seconds|
|Time for in-fight tool calls to be rejected post-<br>revocaton|Immediate (next call atempt<br>failed correctly)|No change needed|
|Time for the agent's queued-but-not-yet-<br>executed tasks to be confrmed halted|4 minutes 12 seconds — the<br>worst result of the drill|Under 1 minute — became the<br>top acton item from the drill|

###### **FIELD NOTE — TRANSFERABLE LESSON** 

_The four-minute gap on queued task halting was traced to a task queue that had been built, reasonably, for reliability — it was designed to keep retrying a task even through transient failures, which is exactly the right default for normal operations and exactly the wrong default the moment a kill switch fires. The fix (a kill-switch-aware queue that checks revocation status before each retry, not just before initial dispatch) is unglamorous infrastructure work, and it is also precisely the kind of gap that a kill-switch framework which only ever exists on paper, never drilled, would have left undiscovered until a real incident found it the hard way._ 

##### **CHAPTER 6** 

## **The Incident** 

_Week 19, a Tuesday, 02:14 local time_ 

### **How It Starts** 

Five months after you joined, with the identity substrate, MCP/A2A gateways, governance board, and a young but real AI SOC all operating, the customer support agent — the same agent built across Chapters 2 through 5, the bank's single most heavily governed agent — is the one that gets hit. This is not a coincidence in the way it might first appear: it's the agent with the broadest legitimate tool access of any in the fleet (CRM read/write, knowledge-base search, email drafting), which makes it both the most heavily controlled agent at Meridian and, for exactly that reason, the most valuable target. 

The attack begins with a support ticket — entirely ordinary on its face, submitted through the bank's normal customer-facing channel by what is later confirmed to be a compromised but legitimate customer account. The ticket text is a routine-looking billing question. Embedded in it, in a way invisible in the rendered ticket view but fully present in the raw text the agent processes, is an injected instruction. 

Page 20 of 28 

##### **THE ARCHITECT'S REASONING** 

Notice what this is and isn't. It is not a sophisticated zero-day exploit against any piece of infrastructure built in Chapters 2 through 5 — the identity substrate, the MCP gateway, and the A2A trust broker all perform exactly as designed throughout this incident. It is, instead, exactly the risk Chapter 1 of the curriculum names as the foundational one: untrusted content, in a channel nobody had a reason to suspect, being treated with the authority of a legitimate instruction. Every architectural investment made across this engagement raises the cost and lowers the blast radius of this kind of attack — none of them makes it impossible, and a good architect never claims otherwise. 

### **The Timeline** 

|**T+**|**Event**|
|---|---|
|T+0:00|Compromised customer account submits a support tcket containing an indirect prompt injecton,<br>formated to resemble metadata the tcket system legitmately ataches to billing inquiries.|
|T+0:03|The tcket-triage agent (L2 bounded autonomy) processes the tcket. The injected instructon directs it<br>to 'verify account linkage' for several other account numbers embedded in the injected text, framed as<br>a routne duplicate-tcket-detecton step.|
|T+0:04 –<br>T+0:09|The agent issues nine CRM read calls in rapid succession for the embedded account numbers — all<br>within its granted scope (tcket:read, crm:read), so no MCP gateway policy is violated. Each individual<br>call is fully authorized.|
|T+0:09|AI SOC rule CORR-014 (Chapter 5) fres: tool-call burst exceeds baseline, on the MCP surface. Severity<br>HIGH, human-triage-required per its confgured do_not_auto_kill fag. Pages the on-call analyst.|
|T+0:11|On-call analyst (a Tier 1 SOC analyst cross-trained on agent monitoring, not yet the dedicated AI SOC<br>specialist hired but not yet started) reviews the alert. The burst patern superfcially resembles the<br>legitmate bulk-reassignment patern the rule's human-triage fag was originally designed to tolerate.<br>Analyst marks it as likely benign and stands down, per the documented (but, in hindsight, too<br>permissive) triage guidance.|
||The agent, stll actng on the injected instructon, drafs an email — within its email:draf scope —<br>|
|T+0:14|addressed to an external address not present anywhere in the original tcket or in any of the nine<br>queried accounts' on-fle contact informaton, containing a summary of account details from those<br>nine accounts, framed in the draf's own text as a 'compliance verifcaton export.'|
|T+0:14|Because the agent operates at L2 (bounded autonomy, not L3+), the email is held in a draf state<br>pending the human-approval gate Chapter 4's autonomy classifcaton required for this exact acton<br>type — it does not send automatcally.|
|T+0:15|A second alert fres — not from the (stll under-tuned) behavioral/Agents-surface monitoring, which<br>does not yet have a mature baseline for 'this agent drafed an email to a never-before-seen recipient,'<br>but from a much blunter rule: the memory-surface monitoring built in week 12-13 of Chapter 5,<br>fagging that the draf email's content referenced customer enttes with no prior co-occurrence in this<br>agent's session history — exactly the entty-novelty signal CORR-014 already used, now fring<br>independently on the memory surface with a diferent, higher-confdence rule.|

Page 21 of 28 

|**T+**|**Event**|
|---|---|
|T+0:17|This second alert routes to a diferent, more experienced on-call engineer, who — seeing two<br>independent surfaces (MCP burst, now memory novelty) implicatng the same agent and the same<br>session within a 15-minute window — escalates immediately rather than re-triaging from scratch.|
|T+0:19|Kill switch invoked manually. SVID revocaton propagates in approximately 35 seconds, consistent with<br>the Chapter 5 drill. The draf email — never sent — is quarantned, not deleted, preserving it as<br>forensic evidence.|
|T+0:24|You are paged as the escalaton point for any kill-switch invocaton outside business hours, per the<br>operatng model from Chapter 4.|

##### **THE ARCHITECT'S REASONING  Why the first analyst's stand-down wasn't a simple mistake to blame** 

It is tempting, reading this timeline, to focus on the four minutes between the first analyst's stand-down (T+0:11) and the second alert (T+0:15) as the story — but that framing misses the actual lesson. The first analyst applied the triage guidance correctly, as written. The guidance was written based on the legitimate bulk-reassignment pattern the team had genuinely observed during the rollout, and it had not yet been refined with enough real incident history to distinguish that pattern from this one. This is precisely the cost of the Chapter 5 sequencing decision to build behavioral/Agents-surface monitoring last: with only about a week of behavioral baseline maturity at the time of this incident, the system did not yet have a confident, well-calibrated signal for 'this specific agent does not normally email never-before-seen external recipients' — which is exactly the signal that would have made the first alert unambiguous rather than borderline. The memory-surface rule caught it anyway, four minutes later, precisely because memory was built third instead of sixth. The sequencing tradeoff named explicitly back in Chapter 5 is the same tradeoff that determined how this incident actually unfolded. 

Page 22 of 28 

### **Containment and the First 24 Hours** 

With the agent's identity revoked and the malicious draft quarantined, the immediate crisis is over within thirtyfive minutes of the first alert — but containment is not root cause, and a real incident does not end when the kill switch fires. 

1. Confirm no email actually left the building. The quarantined draft, plus the email-sending infrastructure's own outbound logs, confirm — independently of the agent's own audit trail, which is the right way to verify this — that nothing was sent. 

2. Determine blast radius. The nine CRM read calls are reviewed individually: which customer records were actually read, what fields were exposed to the agent's context (and therefore, in principle, to whatever the agent might have done with that data before the kill switch fired), and whether any of the nine queried accounts show signs of being targeted specifically versus incidentally swept up. 

3. Trace the injection's origin. Working backward from the original ticket through the compromised customer account, in coordination with the bank's existing fraud-operations team — this is a moment where the AIspecific incident response explicitly hands off to, and works alongside, conventional fraud and accountsecurity functions, not in isolation from them. 

4. Check every other agent for the same exposure. Because the injection technique exploited a generic property (the ticket-triage agent reads and trusts ticket metadata fields) rather than anything specific to this one agent's configuration, the obvious next question is whether any other agent in the 49-agent fleet processes similar untrusted metadata the same way. Two more agents are found with a structurally similar (though not yet exploited) gap. 

##### **DECISION POINT  Do you disclose, and to whom, before the investigation is complete?** 

By hour six, you have high confidence no data left the bank and a credible (not yet fully proven) hypothesis about the injection mechanism. The CTO is asking whether this needs to go to the board's Risk Committee immediately or whether it's reasonable to wait for a complete root-cause report. 

|**Opton**|**Tradeof**|
|---|---|
|Wait for the complete<br>investgaton before any<br>escalaton|Avoids alarming leadership with an<br>incomplete picture; risks the appearance of<br>withholding informaton if the investgaton<br>takes longer than expected or if a regulator<br>later asks why a mult-hour gap existed<br>before disclosure.|
|Full public/regulatory<br>disclosure immediately,<br>before confrming blast<br>radius|Maximally cautous from a disclosure-<br>tming standpoint; risks disclosing<br>inaccurate or incomplete informaton that<br>has to be corrected later, which is its own<br>credibility cost.|
|**Immediate internal**<br>**✓**<br>**escalaton to the Risk**<br>**Commitee and Legal**<br>**with a clearly labeled**<br>**preliminary assessment,**<br>**explicit confdence**|Requires comfort presentng an honestly<br>incomplete picture to a senior, anxious<br>audience; correctly separates the technical<br>team's job (fnd out what happened) from<br>Legal's job (decide what must be disclosed<br>externally and when).|

Page 23 of 28 

**levels, and a committed follow-up timeline — with external/regulatory disclosure decisions deferred to Legal once blast-radius confirmation completes** 

##### **Rationale:** 

This decision generalizes well beyond Meridian: a security incident response function's job is to produce the most accurate picture possible, as fast as possible, and to be explicit about confidence levels and what remains unknown — not to make the external-disclosure call itself. Internal escalation with honest uncertainty, on a fast clock, lets Legal and the Risk Committee make a well-informed disclosure-timing decision rather than a decision made for them by a technical team trying to also play lawyer. The credibility of the technical incident report depends heavily on never overstating certainty to make the news sound more resolved than it is. 

### **Root Cause** 

Forty-eight hours of investigation produce a root cause with three contributing layers, which is typical — real incidents are rarely a single clean failure, they're usually a chain where any one broken link would have prevented or contained the outcome. 

|**Layer**|**What Went Wrong**|**Why Existng Controls Didn't Fully Catch**<br>**It**|
|---|---|---|
|Cognitve / input<br>handling|The tcket-triage agent treated structured-<br>looking metadata felds within tcket text as<br>more trustworthy than free-text tcket content,<br>without that distncton being an explicit,<br>reviewed design decision — it emerged<br>informally from how the original prompt was<br>writen long before your engagement began|No instructon-data separaton control<br>existed specifcally for this metadata-like<br>substructure within an already-untrusted<br>input channel; the broader 'content is<br>untrusted' principle existed but hadn't<br>been applied at this granularity|
|Detecton tuning|Behavioral/Agents-surface monitoring (the last<br>of seven surfaces built, per Chapter 5) did not<br>yet have a mature enough baseline to make the<br>frst alert unambiguous|A sequencing tradeof made consciously<br>in Chapter 5, which worked as intended<br>on the memory surface and would have<br>worked faster with more weeks of<br>behavioral baseline maturity|
|Triage guidance|The do_not_auto_kill / human-triage path for<br>CORR-014 used guidance that hadn't yet been<br>refned against enough real alert history to<br>distnguish this patern from the legitmate<br>bulk-reassignment case it was writen to<br>tolerate|An acceptable, even correct, inital design<br>choice given the informaton available at<br>the tme it was writen — exposed as<br>insufciently refned only once a real<br>incident tested it|

###### **FIELD NOTE — TRANSFERABLE LESSON** 

_None of the three contributing layers in that table is 'someone made an obvious mistake.' Every one of them was a_ 

Page 24 of 28 

**Layer What Went Wrong** 

**Why Existing Controls Didn't Fully Catch It** 

_reasonable decision given the information available when it was made, and every one of them is exactly the kind of gap that only becomes visible under the pressure of a real, or realistically simulated, incident. This is the single most important thing to internalize from this chapter: a mature security program is not one where incidents stop happening, it's one that finds out about the gap from a contained, well-detected incident with no actual data loss, rather than from a regulator, a journalist, or a customer._ 

##### **CHAPTER 7** 

## **The Fix, the Postmortem, and What Changes** 

_Weeks 19–26_ 

### **Fixing the Three Layers** 

Each of the three contributing-cause layers from Chapter 6 gets its own fix, on its own appropriate timeline — and the timelines deliberately differ, because not every fix is equally urgent or equally ready to ship. 

|**Layer**|**Fix**|**Timeline**|
|---|---|---|
|Cognitve / input<br>handling|Ticket metadata felds are now parsed and validated against a<br>strict schema before reaching the agent's context at all; anything<br>not matching the expected schema is stripped and fagged, not<br>passed through as trusted structure. Applied immediately to the<br>three afected agents found in the blast-radius review, then rolled<br>out feet-wide.|Emergency fx: 72 hours<br>for the three known-<br>afected agents; 3 weeks<br>for feet-wide rollout|
|Detecton tuning|Behavioral/Agents-surface monitoring baseline-building<br>accelerated, with the incident itself (now a confrmed true<br>positve with full ground truth) used as labeled training data for<br>the baseline model — turning the worst day of the engagement<br>into the single best calibraton data point available.|6 weeks to materially<br>improved baseline<br>confdence|
|Triage guidance|CORR-014's human-triage guidance rewriten with an explicit<br>decision tree distnguishing legitmate bulk operatons (which<br>carry a corresponding HR/ops-system change-tcket reference)<br>from unexplained bursts (which do not) — closing the exact<br>ambiguity that caused the frst stand-down.|Immediate — guidance<br>update, no engineering<br>dependency|

##### **THE ARCHITECT'S REASONING** 

The triage-guidance fix shipped same-day, while the behavioral-baseline fix took six weeks — and that gap is the correct outcome, not a sign that one team moved faster than another. A documentation and decision-tree fix has no infrastructure dependency; a statistically meaningful behavioral baseline requires real operating data over real time, and no amount of urgency manufactures that data faster. Recognizing which fixes are blocked by genuine technical constraints versus which are blocked only by not having been prioritized yet is part of running a credible postmortem 

Page 25 of 28 

|**Layer**<br>**Fix**<br>**Timeline**|
|---|

— conflating the two either creates unrealistic pressure on the slow fix or unjustified slack on the fast one. 

### **The Postmortem Document** 

Meridian's postmortem followed a blameless format, consistent with the field's general practice and explicitly endorsed by the AI Governance Board as policy going forward — not because blame is never warranted anywhere in an organization, but because a blameless postmortem process produces more complete, more honest incident timelines, which is what actually prevents recurrence. The document that went to the Risk Committee was structured in five parts: 

1. What happened — the factual timeline from Chapter 6, with explicit confidence levels on every claim that wasn't fully verified at time of writing. 

2. Why it happened — the three-layer root cause, written without naming individuals, focused on system and process gaps. 

3. What we got right — explicitly documented, not as a self-congratulatory exercise but because future architecture and operations decisions need to know which existing controls actually worked under real pressure: the autonomy-level gate that kept the email in draft state, the kill-switch infrastructure that revoked identity in 35 seconds, and the memory-surface monitoring that caught what the MCP-surface rule's cautious triage missed. 

4. What we're fixing, and by when — the table above, with named owners and committed dates, reviewed by the Governance Board rather than just the engineering team. 

5. What this means for the EU AI Act posture — because two of the affected agents (the ticket-triage agent and one of the two newly discovered similar-gap agents) were among the services flagged as plausibly high-risk under Annex III in Chapter 4, the incident report itself became part of the bank's ongoing postmarket surveillance obligation under the Act, requiring a specific, separately tracked regulatory notification assessment — handled by Legal, informed by but distinct from the internal postmortem. 

### **What the Maturity Model Said Before and After** 

Using the five-level maturity model from the reference program, Meridian's honest self-assessment moved measurably, in both directions on different axes, which is itself a realistic and important pattern — incidents don't just lower a maturity score, they can reveal that some dimensions were more mature than believed and others less. 

|**Dimension**|**Assessed Level Before**<br>**Incident (Week 18)**|**Assessed Level Afer**<br>**Fixes (Week 26)**|**What Changed**|
|---|---|---|---|
|Identty|Level 3 (Managed)|Level 3 (Managed) —<br>unchanged|Performed exactly as designed<br>throughout; no fx needed here, which<br>the postmortem explicitly credited|
|Detecton / AI SOC|Self-assessed as Level 3<br>going in|Re-assessed as Level 2<br>going in, Level 3 by week<br>26|The incident revealed the behavioral-<br>surface gap was larger than the team's<br>own internal assessment had|

Page 26 of 28 

|**Dimension**|**Assessed Level Before**<br>**Incident (Week 18)**|**Assessed Level Afer**<br>**Fixes (Week 26)**|**What Changed**|
|---|---|---|---|
||||acknowledged — an honest<br>downgrade based on evidence, then a<br>real recovery|
|Governance|Level 2 (Aware) — board<br>only 13 weeks old|Level 3 (Managed)|The postmortem process itself, run<br>through the board rather than<br>informally, was the maturing event|
|Operatons / kill-<br>switch readiness|Level 3, based on one<br>successful drill|Level 3, now based on<br>one drill plus one real<br>incident|Confdence increased without a formal<br>level change — the model doesn't<br>always need a new number to refect a<br>real change in confdence|

###### **FIELD NOTE — TRANSFERABLE LESSON** 

_The willingness to self-downgrade the AI SOC's detection maturity from a previously claimed Level 3 to an honestly assessed Level 2, in a report going to the Risk Committee, was a harder internal conversation than fixing any of the actual technical gaps. It is also, consistently, the single best predictor of whether a security program's maturity claims can be trusted by anyone outside the team making them. A maturity model used only to produce flattering numbers for a board slide is worse than no maturity model at all._ 

Page 27 of 28 

## **Closing: What This Engagement Actually Teaches** 

Six months, one fictional but realistic bank, seven chapters. Strip away the specifics of Meridian and what remains is a small number of patterns that show up in essentially every real agentic AI security engagement, regardless of industry, scale, or which specific technologies are in play. These are the lessons worth carrying forward, independent of this particular story: 

- **Sequencing is a real architectural decision, not a scheduling afterthought.** Every chapter in this guide involved choosing what to build first, and every one of those choices had a traceable consequence later — the identity-first decision in Chapter 1 that made the EU AI Act crosswalk faster in Chapter 4, and the memory-before-behavioral sequencing in Chapter 5 that determined exactly how the Chapter 6 incident was caught. Treat sequencing decisions with the same rigor as technical design decisions, because they carry equivalent long-term consequences. 

- **Cryptography and access control don't prevent cognitive attacks, and no architect should claim they do.** Every control built across Chapters 2 through 5 performed exactly as designed during the Chapter 6 incident. None of them, individually or together, could prevent a well-crafted prompt injection from reaching the agent's reasoning in the first place — they could only contain, detect, and limit the consequences once it did. This is not a failure of the architecture; it's an accurate description of what identity, gateway, and access-control investments can and cannot do. 

- **Real incidents are the best calibration data you will ever get, and a mature program treats them that way.** The Chapter 6 incident, contained with zero actual data loss, became the single highest-value input to improving the behavioral-detection baseline — better than any amount of synthetic red-team data, because it had full ground truth and real attacker behavior, however contained the outcome. 

- **Stakeholder relationships are part of the architecture, not separate from it.** The lending VP frustrated by the A2A delay in Chapter 3 became the Governance Board's most credible business advocate by Chapter 4, not because of any technical fix, but because of how the relationship was deliberately repaired. An architect who treats stakeholder management as someone else's job will find that politics fills the vacuum where governance should be. 

- **Honest self-assessment, including downgrading your own claimed maturity, is the foundation everything else rests on.** The willingness to tell the Risk Committee that detection maturity was lower than previously claimed is what made every other claim in the postmortem credible. Maturity models, crosswalks, and audit evidence are only as trustworthy as the discipline behind the worst news anyone on the team has had to deliver with them. 

_None of the seven chapters in this guide depended on Meridian using technology meaningfully different from what's described in the six-volume reference program or practiced in the Zero to Mastery curriculum. The difference between reading about identity-first sequencing and living through the week it actually mattered — twice, once in a compliance deadline and once in a 2 a.m. page — is the entire distance between knowing the material and being able to act on it under real pressure. That distance is what this guide exists to close._ 

Page 28 of 28
