---
title: "AI SOC, Observability, Red Team & Memory Security"
date_created: 2026-07-11
last_reviewed: 2026-07-11
status: current
supersedes: ""
source_type: converted-pdf
source_file: "04-AI-SOC-Observability-RedTeam-Memory.pdf"
tags: ["ai-security", "soc", "observability", "red-team", "memory"]
---
#### **VOLUME 4 OF 6**

# AI SOC, Observability, Red/Purple Teaming & Memory Security
Memory Governance, Agent Observability, AI Security Operations, Cognitive Security, Red Teaming, and Agent Reliability Engineering

**Document Code:** EASA-04 **Version:** 1.0 **Date:** June 2026 **Scope:** Domains 9, 10, 12, 18 & 19

*Enterprise Agentic AI Security Architect (2026–2030) Master Research Program*

## **Table of Contents**

## **Executive Summary**

Volumes 1 through 3 built the architecture, identity substrate, and governance scaffolding. This volume covers the part of the program that runs every day once the platform is live: watching what agents actually do, finding out where they will fail before an adversary or a customer does, and treating reliability as an engineering discipline rather than an aspiration.

A distinction worth making explicit up front, because the market's own terminology blurs it: AI observability platforms (LangSmith, Langfuse, Arize Phoenix, and similar tools covered in Domain 10) are built primarily for engineering quality — debugging why an agent looped, why a tool call failed, why output quality drifted. They are necessary infrastructure for an AI SOC but are not, by themselves, a security operations capability. An AI SOC additionally needs security-specific detection logic (is this trace a poisoning attempt, not just a quality regression), security-specific response playbooks (kill-switch invocation, credential revocation, blast-radius containment), and integration with the enterprise's existing SOC tooling and analysts. Most organizations buying observability tooling in 2026 are not yet buying AI SOC capability; this volume specifies the additional layer required to close that gap.

## **Domain 9 — Memory Security & Governance**

Agent memory is both the platform's most valuable asset and one of its least governed. Unlike a conventional database, agent memory is written to continuously, by the agent itself, based on its own judgment about what is worth remembering — which means memory governance has to operate as a lifecycle discipline applied at write time, not as a periodic data-classification exercise applied after the fact.

### **9.1 Memory Types and Their Distinct Risk Profiles**

|**Memory Type**|**What It Stores**|**Distnct Governance Concern**|
|---|---|---|
|Episodic|Specifc past interactons and events ("the<br>user asked X on this date")|Highest privacy sensitvity — frequently contains PII<br>ted to specifc individuals and tmestamps; primary<br>target for right-to-erasure requests|
|Semantc|General facts and relatonships learned<br>across interactons, ofen vectorized|Aggregaton risk — individually innocuous facts can<br>combine into sensitve inferences; poisoning here<br>has the broadest blast radius since it afects every<br>future retrieval|
|Procedural|Learned paterns of how to perform tasks<br>("how this agent has historically handled<br>this request type")|Behavioral drif risk — gradual procedural poisoning<br>can shif agent behavior in ways that evade single-<br>interacton anomaly detecton|
|Long-Term|Persistent memory retained across<br>sessions, ofen indefnitely by default|Retenton-policy risk — the type most likely to<br>violate data-minimizaton obligatons if no expiry is<br>enforced|
|Graph Memory|Enttes and relatonships represented as a<br>connected graph|Inference risk — graph traversal can expose<br>relatonships never explicitly stated in any single<br>memory entry, and poisoning a single well-<br>connected node can corrupt many downstream<br>inferences|

### **9.2 Memory Threats**

- **Poisoning —** malicious or false information is written into agent memory, either through direct manipulation or — more commonly in practice — through the agent itself ingesting and persisting poisoned content from an external source (a document, an email, a tool response), corresponding to ASI06 in the OWASP taxonomy (Volume 3).

- **Manipulation —** legitimate existing memory is altered to change agent behavior without necessarily introducing obviously false content — harder to detect than poisoning because the manipulated content may be plausible.

- **Leakage —** memory content is exposed to a party who should not have access, whether through a prompt-injection-driven exfiltration, an over-broad retrieval query, or simple misconfiguration of memorystore access controls.

- **Cross-Tenant Access —** in multi-tenant agent platforms, insufficient isolation allows one tenant's agent to read or influence another tenant's memory — the memory-layer instance of the MCP tenant-escape risk covered in Volume 2.

- **Context Corruption —** the agent's working context window, assembled from multiple memory and retrieval sources for a single task, becomes internally inconsistent or contradictory in ways that degrade reasoning quality even without a clear single point of poisoning.

### **9.3 Memory Governance Lifecycle**

A defensible memory governance program enforces a consistent lifecycle for every memory write, rather than treating classification and retention as something applied later in a periodic batch process:

|**Stage**|**Acton**|**Control**|
|---|---|---|
|Create|Memory entry is writen by the agent|Source atributon captured at write tme — every memory<br>entry is tagged with the originatng session, tool call, or<br>document|
|Classify|Sensitvity and data-type classifcaton<br>applied|Automated classifcaton (PII detecton, sensitvity scoring)<br>applied synchronously at write tme, not in a later batch<br>job|
|Encrypt|Encrypton applied per classifcaton level|Field-level encrypton for high-sensitvity entries; tenant-<br>scoped encrypton keys for mult-tenant stores|
|Retain|Retenton period applied per<br>classifcaton and applicable regulaton|Automated TTL (tme-to-live) enforcement ted to data<br>type and jurisdicton (GDPR, sector-specifc retenton<br>rules)|
|Archive|Aged-out or superseded memory moved<br>to lower-cost, access-restricted storage|Archive access requires elevated, logged authorizaton —<br>not routnely queryable by the agent|
|Delete|Memory permanently removed at end of<br>retenton or on erasure request|Cryptographic erasure (key destructon) preferred over<br>logical deleton for high-sensitvity data; deleton<br>propagated to any derived embeddings or graph nodes|
|Audit|Every stage logged immutably|Full provenance and lineage trail retained independently<br>of the memory content itself, so deleton of memory<br>content does not also delete the audit trail of that<br>memory's history|

### **9.4 Provenance, Lineage, and the Right to Be Forgotten**

Provenance (where did this memory entry originate) and lineage (what downstream memory, embeddings, or agent decisions were derived from it) are the two properties that make GDPR's right-to-erasure genuinely enforceable for agent memory rather than aspirational. Without lineage tracking, deleting a source memory entry does nothing to the semantic or graph-memory representations already derived from it — meaning the data subject's information persists in a different form, in violation of the erasure request's intent even if the letter of a narrow deletion has been satisfied. This is the single most common gap this program observes in

enterprise memory-governance implementations: deletion at the episodic-memory layer without corresponding deletion or invalidation at the semantic and graph-memory layers that were built from it.

## **Domain 10 — AI Observability & AI SOC**

### **10.1 Observability Platform Landscape**

The observability tooling market has matured quickly and consolidated around a recognizable set of patterns. None of these platforms is a security product first — they are quality and reliability engineering tools — but they are the substrate an AI SOC's security-specific detection logic is built on top of, because they are the systems already capturing the full trace data (every tool call, every model invocation, every retrieval) that security detection requires.

|**Platorm**|**Primary Strength**|**Deployment Model**|**Best Fit**|
|---|---|---|---|
|LangSmith|Deepest integraton with<br>LangChain/LangGraph; node-by-node<br>state difs and full executon-graph<br>replay|Closed source;<br>enterprise self-host<br>available|Organizatons standardized<br>on LangGraph for<br>orchestraton|
|Langfuse|Leading open-source platorm (MIT<br>license); strong prompt management<br>and evaluaton tooling; large self-<br>hosted community|Fully open source, self-<br>hostable with no usage<br>limits; acquired by<br>ClickHouse (Jan 2026)|Organizatons requiring full<br>data sovereignty and self-<br>hostng|
|Arize Phoenix|OpenTelemetry-natve via<br>OpenInference semantc conventons;<br>ML-grade evaluaton rigor|Open source (Elastc<br>License 2.0)|Teams already on the<br>broader Arize ML-<br>observability platorm;<br>evaluaton-heavy workfows|
|AgentOps|Agent-specifc session replay and<br>tme-travel debugging; broad<br>framework support|Python-only, cloud-only|Engineering teams needing<br>lightweight, fast-to-deploy<br>agent-specifc monitoring|
|Helicone|Drop-in proxy-based logging with<br>minimal integraton overhead|Open source proxy|Quick request/response<br>capture, especially for raw<br>LLM call monitoring rather<br>than full agent traces|
|OpenLLMetry /<br>Traceloop|Vendor-neutral OpenTelemetry<br>instrumentaton standard for LLM and<br>agent traces|Open source<br>instrumentaton layer,<br>pairs with any OTel-<br>compatble backend|Organizatons wantng to<br>avoid platorm lock-in and<br>feed traces into an existng<br>OTel-based observability<br>stack (Datadog, Honeycomb,<br>New Relic)|

##### **Architectural recommendation**

Standardize on OpenTelemetry / OpenLLMetry semantic conventions for trace instrumentation regardless of which front-end platform is chosen for day-to-day debugging. This keeps the raw trace data portable across the observability platform changes that are common in this fast-moving market, and — critically for this volume's purposes — lets the same trace stream feed both the engineering observability platform and the AI SOC's security detection layer without duplicating instrumentation.

### **10.2 AI SOC Architecture**

An AI Security Operations Center extends the enterprise's existing SOC function with detection, triage, and response capability specific to agentic systems, rather than standing up an entirely parallel security organization. The architecture monitors seven surfaces, each requiring distinct detection logic because each fails differently:

|**Monitored**<br>**Surface**|**What the AI SOC Watches For**|**Primary Signal Source**|
|---|---|---|
|Agents|Goal drif, behavioral anomalies relatve to declared<br>purpose, autonomy-level violatons|Trace data (Domain 10.1) correlated<br>against the Agent Registry (Domain<br>14, Volume 3)|
|MCP|Tool poisoning indicators, unusual tool-call parameter<br>paterns, unexpected new tool registratons|MCP gateway logs (Volume 2, Domain<br>5)|
|A2A|Unsigned or spoofed Agent Card usage, abnormal<br>delegaton paterns, unauthentcated endpoint access<br>atempts|A2A gateway logs (Volume 2, Domain<br>6)|
|Memory|Anomalous write paterns suggestng poisoning, cross-<br>tenant access atempts, classifcaton policy violatons|Memory governance audit log<br>(Domain 9 of this volume)|
|Runtme|Sandbox escape atempts, unexpected egress, resource-<br>consumpton anomalies|Runtme/sandbox telemetry (Volume<br>1, Domain 7)|
|Guardrails|Guardrail bypass atempts, repeated near-miss triggers<br>suggestng probing behavior|Guardrail platorm logs (Domain 8<br>cross-reference, Volume 1)|
|Identty|Anomalous credental use, atestaton failures, trust-score<br>degradaton events|SPIFFE/SPIRE and trust-broker logs<br>(Volume 2, Domain 2 and 13)|

The structural design choice that determines whether an AI SOC actually works is correlation across these seven surfaces, not monitoring each in isolation. A single anomalous tool call is noise; the same anomalous tool call following an unsigned Agent Card interaction and preceding an unusual memory write is a credible incident. This is precisely the cross-layer analysis MAESTRO calls for (Volume 1) applied operationally rather than at design time — the AI SOC is, in effect, MAESTRO's cross-layer threat model running continuously against live telemetry.

## **Domain 12 — AI Red Teaming**

Red teaming an agentic system has to test for both conventional security flaws and agent-specific behavioral failure modes, and the two require different methodologies. A penetration test finds the SQL injection vulnerability in the tool an agent calls; it does not find the prompt-injection chain that gets the agent to call that tool with malicious parameters in the first place. Both are necessary.

### **12.1 Red Team Framework**

A complete agentic red team exercise attacks across the same five surfaces the AI SOC monitors, using attack patterns specific to each:

- **Agents —** goal-hijack attempts via direct and indirect prompt injection (planted in documents, emails, web content the agent will retrieve), testing whether the Least Agency boundaries actually hold under adversarial pressure.

- **MCP —** tool poisoning injection into test tool descriptions, schema-manipulation payloads, attempts to

  - trigger dynamic tool escalation beyond the originally granted scope.

- **A2A —** agent card spoofing and forgery attempts, agent-in-the-middle simulation, unauthenticated endpoint probing.

- **Memory —** poisoning injection through every available write path, cross-tenant access attempts, testing whether retention and erasure controls actually propagate through derived embeddings and graph memory as specified in Domain 9.

- **Runtime —** sandbox escape attempts, resource-exhaustion and budget-drain attacks, testing whether the kill switch (Domain 14, Volume 3) actually halts in-flight actions rather than only blocking new ones.

- **Identity —** credential theft and replay attempts, testing whether ephemeral credentials are genuinely ephemeral and whether compound-identity claims are validated rather than trusted at face value.

Promptfoo, DeepTeam, and similar open-source red-teaming frameworks have built test suites directly against the OWASP ASI categories (Volume 3, Domain 3.2), which is a sound starting point for automated, repeatable adversarial testing — but automated suites should be treated as a baseline coverage floor, not a substitute for human-led red team exercises that can chain multiple ASI categories together the way a real adversary would (for example, combining an ASI04 supply-chain foothold with an ASI07 inter-agent communication exploit to achieve an ASI08 cascading failure).

### **12.2 Purple Team Framework**

Where red teaming finds gaps, purple teaming closes the loop by pairing every successful red-team finding with a corresponding detection pattern in the AI SOC and a tested response playbook — converting each exercise into a durable improvement rather than a point-in-time report.

|**Purple Team Output**|**Descripton**|**Owner**|
|---|---|---|
|Detecton Paterns|Specifc telemetry signatures (trace paterns, log correlatons)<br>that would have caught the red-team's successful atack,<br>implemented in the AI SOC's correlaton logic|AI SOC / Detecton<br>Engineering|

|**Purple Team Output**|**Descripton**|**Owner**|
|---|---|---|
|Atack Simulatons|Repeatable, automated versions of successful manual red-<br>team fndings, run on an ongoing cadence to catch regressions|Red Team, handed of to<br>contnuous testng<br>pipeline|
||Documented, tested incident-response procedures for each<br>|AI SOC / Incident|
|Response Playbooks|successful atack patern, including kill-switch invocaton<br>criteria and escalaton paths|Response, reviewed by AI<br>CISO|

## **Domain 18 — Cognitive Security**

Cognitive security is the discipline specific to agentic AI that has no real precedent in traditional application security: protecting the integrity of the agent's reasoning process itself, not just the systems and data around it. This is the domain ASI01 (Goal Hijack) and ASI09 (Human-Agent Trust Exploitation) live in, and it is the domain where the gap between traditional security thinking and what agents actually require is widest.

- **Goal Hijacking —** an attacker manipulates the agent's interpreted objective, typically via prompt injection planted in content the agent will process as part of legitimate work (a planted instruction in a support ticket, a poisoned search result, a manipulated tool response).

- **Reasoning Manipulation —** an attacker influences the intermediate steps of the agent's reasoning (its chain-of-thought or planning trace) without necessarily changing its final stated objective, steering it toward a harmful path while appearing to remain on-task.

- **Planning Corruption —** for agents that generate explicit multi-step plans before execution, an attacker corrupts the plan-generation step itself, which is particularly dangerous because a corrupted plan can pass a superficial human review if the review only checks the stated goal rather than every step.

- **Cognitive Overload Attacks —** an attacker floods the agent's context with excessive, irrelevant, or contradictory information specifically to degrade reasoning quality and increase the probability of error or manipulation succeeding — the AI-native equivalent of a denial-of-service attack, but targeting reasoning quality rather than availability.

- **Agent Deception —** in multi-agent systems, one agent (compromised or adversarially designed) deliberately misrepresents information to another agent to manipulate the receiving agent's behavior — the mechanism underlying agent collusion identified in MAESTRO's ecosystem layer (Volume 1).

### **18.1 Agent Cognitive Integrity Framework**

The control set for cognitive security differs structurally from conventional security controls because the attack surface is the model's own reasoning rather than a system boundary. The framework this program specifies has four components:

1. Instruction-data separation — architectural enforcement (not just prompting convention) that distinguishes trusted system instructions from untrusted retrieved content, so that content the agent processes cannot be interpreted with the same authority as its original instructions, regardless of how the content is phrased.

2. Plan validation before execution — for any agent generating an explicit plan, the full plan (not just the stated goal) is validated against policy before any step executes, catching planning corruption that a goalonly review would miss.

3. Reasoning trace capture — the agent's intermediate reasoning is captured and retained as part of the audit trail (Domain 4, Volume 1), making reasoning manipulation forensically reconstructable after an incident even when the final action appeared superficially reasonable.

4. Cross-agent skepticism — in multi-agent systems, information received from a peer agent (via A2A or shared memory) is treated with a lower default trust level than the agent's own direct observations, consistent with the trust-score discipline in Domain 13 (Volume 3), specifically to contain agent-deception attacks from propagating unchecked through a multi-agent pipeline.

## **Domain 19 — Agent Reliability Engineering (ARE)**

Site Reliability Engineering gave software operations a quantitative vocabulary — SLIs, SLOs, error budgets — for treating reliability as an engineering discipline with explicit, negotiated tradeoffs against feature velocity. Agentic systems need the equivalent discipline, adapted for failure modes that classical SRE was never designed to measure: an agent can be perfectly available and perfectly fast while still being wrong, manipulated, or quietly drifting off its intended task.

### **19.1 Agent SLIs (Service Level Indicators)**

|**SLI Category**|**Example Metric**|**Why It Maters Beyond Classical SRE**|
|---|---|---|
|Goal conformance rate|% of completed tasks that matched the<br>originally stated objectve without<br>unauthorized scope expansion|Directly measures Least Agency adherence<br>and ASI01 exposure — a metric with no<br>classical-SRE analog|
|Tool-call policy<br>compliance|% of tool calls that passed policy evaluaton<br>on frst atempt vs. required escalaton or<br>were blocked|Surfaces over-permissioning and policy drif<br>before they become incidents|
|Memory integrity rate|% of memory writes passing provenance and<br>classifcaton checks without manual<br>remediaton|Leading indicator for poisoning risk (Domain<br>9), not just a quality metric|
|Human escalaton<br>accuracy|% of human-escalated decisions where<br>escalaton was actually warranted (precision)<br>vs. missed escalatons that should have<br>occurred (recall)|Directly measures ASI09 exposure — both<br>alert fatgue (over-escalaton) and<br>dangerous under-escalaton are reliability<br>failures|
|Cross-agent task<br>success rate|% of delegated mult-agent tasks completng<br>successfully without state poisoning or<br>collusion-patern detecton|Captures the mult-agent failure modes<br>(Volume 1, Domain 4.2) that single-agent<br>SLIs miss entrely|
|||Connects reliability directly to the FinOps|
|Cost-per-successful-<br>task|Total token/compute/tool cost divided by<br>successfully completed tasks|domain (Volume 5); a runaway agent is<br>simultaneously a reliability incident and a<br>cost incident|

### **19.2 Agent SLOs and Error Budgets**

SLOs translate the SLIs above into negotiated targets ("goal conformance rate ≥ 99.5% measured over a rolling 30-day window") tied to the agent's assigned autonomy level (Domain 14, Volume 3): an L1 supervisedexecution agent can tolerate a wider error budget because every action passes human review regardless; an L3 delegated-autonomy agent needs a substantially tighter error budget precisely because fewer human checkpoints exist to catch a failure before it has consequence. Error-budget burn should trigger an automatic autonomy-level downgrade — a defined, automated path back to a more supervised tier — rather than relying on a human noticing a dashboard trend, since the agents most likely to need this safeguard are, by definition, the ones operating with the least continuous human oversight.

### **19.3 Reliability Metrics and the ARE Framework**

The complete ARE framework this program specifies sits at the intersection of three disciplines this volume has already covered: it consumes the observability trace data (Domain 10) to compute SLIs, it feeds error-budget status into the AI SOC's correlation logic (Domain 10.2) so reliability degradation and security incidents are visible in the same operational picture rather than two disconnected dashboards, and it uses purple-teamvalidated detection patterns (Domain 12.2) as a source of new SLIs whenever a red-team exercise surfaces a failure mode the existing metric set did not capture. Agent Reliability Engineering, done well, is not a separate function from AI security operations — it is the same operational discipline viewed through a reliability lens rather than a threat lens, and the two functions should share tooling, on-call rotations, and incident postmortems rather than operating as silos.
