---
title: "ENTERPRISE ARCHITECT"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "EA_Real_Life_Transcript.pdf"
doc_type: workshop-transcript
tags: ["enterprise-architecture"]
last_reviewed: 2026-07-10
last_reviewed: 2026-07-10
session_type: "workshop"
related_pages: ["—"]
---

## Participants

## Scenario

## Related

## Audience

**Page 1** 

#### **A DAY IN THE LIFE OF AN** 

# **ENTERPRISE ARCHITECT** 

## **From Incubation to Retire** 

A verbatim transcript-style account following Marcus Webb, Enterprise Architect at RetailCo, as he navigates a 14-month journey with the Unified Commerce Platform initiative. From the first whisper of an idea in the C-suite to the final decommission of a legacy system — every stakeholder conversation, every artefact, every governance decision, and every sleepless moment in between. 

#### **Cast of Characters** 

**Marcus Webb** Enterprise Architect (EA) — our protagonist **Diana Cole** Chief Digital Officer (CDO) — initiative sponsor **Raj Patel** Head of Retail Operations — business owner **Sophie Turner** Solution Architect (SA) — assigned to the project **Alan Brooks** CISO — Chief Information Security Officer **Priya Nair** Head of Data Architecture — data domain lead **James Owusu** Head of Delivery / Engineering Director **Karen Mills** CFO — budget authority **Tom Holt** Vendor Sales Lead — Platform-X SaaS **INCUBATION PITCH APPROVE DESIGN BUILD OPERATE REVIEW RETIRE** 

**<mark>RetailCo Digital Transformation</mark>** 

**<mark>Unified Commerce Platform Initiative</mark>** 

<mark>14 Months | 2025–2026</mark> 

**Page 2** 

## **STAGE 1 — INCUBATION** 

The Idea Before the Idea Week 1 | Monday, 6 

January 2025 

Marcus arrives at 7:45am, coffee in hand, to find a calendar invite already waiting: 'Urgent — Digital Strategy Alignment — CDO + EA — 9am.' No agenda. He has learned over eleven years that when Diana Cole books something 'urgent' with no agenda, it means an idea kept her awake at 3am. 

I **09:00 | Monday 6 January 2025** I Diana Cole's office, Floor 12 

I **Informal Strategy Discussion** Attendees: Diana Cole (CDO), Marcus Webb (EA) 

##### **Diana Cole — CDO** 

Marcus, thanks for coming up early. I've been reading the Gartner report on unified commerce. Our competitors are running single-platform experiences — one inventory view, one customer profile, real-time fulfilment. We're running seven separate systems. It's embarrassing. I want to understand what it would take to fix that. 

##### **Marcus Webb — Enterprise Architect** 

Good morning, Diana. I've seen the same report. Before we get into what it would take — can you help me understand what's driving this now? Is there a specific business outcome that's suffering? A board commitment? A competitor event? 

##### **Diana Cole — CDO** 

Black Friday was a disaster. Our online fulfilment system couldn't see in-store stock. We had forty thousand abandoned carts because the website said 'out of stock' when the Croydon store had ninety units on the shelf. Marketing estimates we lost £2.8 million in revenue in four hours. 

##### **Marcus Webb — Enterprise Architect** 

That's a concrete problem. That's an integration failure between the e-commerce platform and the warehouse management system — specifically, the real-time inventory feed. Is the board expecting a full platform replacement, or would a targeted integration fix the Black Friday problem? 

##### **Diana Cole — CDO** 

I've already promised the board a 'unified commerce roadmap' by Q2. So we need both — the quick win and the long-term vision. Can you run an assessment and come back to me with options? 

##### **Marcus Webb — Enterprise Architect** 

Yes. Give me two weeks. I'll pull the current landscape, talk to Raj's team in Operations, and come back with an architecture intake assessment. I won't recommend a solution until I understand the full problem. 

I _EA's Internal Thought: She's already committed to the board without an architecture assessment. The real business problem is a £2.8M integration gap — not necessarily a full platform replacement. I need to find out if the tail is wagging the dog here._ 

Marcus spends the next three days in the application portfolio, the integration register, and in Raj Patel's operations centre watching the Black Friday replay on their monitoring dashboards. He finds not seven systems but eleven — four of which nobody listed in the official register. 

I **14:30 | Thursday 9 January 2025** I Retail Operations Hub, Wembley Depot 

I **Discovery Interview** 

Attendees: Marcus Webb (EA), Raj Patel (Head of Retail Ops) 

**Page 3** 

##### **Raj Patel — Head of Retail Operations** 

Marcus, finally. I've been complaining about this for three years. Our store associates can see stock on the shelf but they can't check online orders. Our online team can take orders but can't see in-store stock. It's two separate worlds and the customer pays the price. 

##### **Marcus Webb — Enterprise Architect** 

Raj, walk me through the systems your team actually uses day-to-day. Not what's in the official register — what's on screen when your team starts their shift. 

##### **Raj Patel — Head of Retail Operations** 

Right, so there's SAP for stock at the DC level, then each store runs its own local inventory on a legacy system called StockMaster — it's from 2009 by the way, the vendor stopped supporting it in 2022. Then the e-commerce platform is Salesforce Commerce Cloud, and it talks to a middleware layer that was built in 2018 that nobody fully understands anymore. 

##### **Marcus Webb — Enterprise Architect** 

StockMaster 2009 — is that in our application portfolio? 

##### **Raj Patel — Head of Retail Operations** 

Probably not. It was a regional pilot that became permanent. There are 47 stores running it. The IT team doesn't officially support it — the store managers sort of... maintain it themselves. 

##### **Marcus Webb — Enterprise Architect** 

Forty-seven stores running EOL, unsupported software that isn't in our portfolio. That's the real story here, Raj. The Black Friday problem isn't just an integration gap — it's a phantom system creating an invisible inventory black hole. Okay. I have what I need. Thank you for being straight with me. 

I _EA's Internal Thought: StockMaster is a zombie system with 47 instances. It's not on our EOL radar because it was never on our radar at all. The real architecture problem is worse than Diana described. I need to frame this carefully — if I lead with the full scope, the board might freeze. But if I understate it, we'll build on rotten foundations._ 

Over the following week, Marcus produces the Architecture Intake Assessment. He also sends a discovery email to the CISO. 

###### u **EMAIL** 

**From: Marcus Webb (Enterprise Architect)** 

###### **To: Alan Brooks (CISO)** 

##### **Subject: Urgent: Discovery — 47 Stores Running EOL Unsupported Inventory System (StockMaster 2009)** 

Alan, During landscape discovery for the Unified Commerce initiative I've identified 47 stores running StockMaster 2009 — vendor support ended 2022. The system is not in our application portfolio, not covered by our security patching process, and appears to process real-time transaction data at POS level. I need a security risk assessment before I finalise the Architecture Intake Assessment. This should be flagged as HIGH risk given the data exposure and regulatory implications (PCI-DSS). Can we meet Thursday? I'd like to have your input before I present to Diana. Marcus 

###### I **ARTIFACT: Architecture Intake Assessment — Unified Commerce Platform** 

AIA-2025-001 | Draft v0.3 

###### `BUSINESS PROBLEM STATEMENT` 

```
RetailCo operates 11 discrete systems across the commerce lifecycle with no unified
```

```
real-time inventory view. The Q4 2024 Black Friday incident caused an estimated
```

```
£2.8M in lost revenue due to inventory visibility failure. 47 stores operate on
```

**Page 4** 

```
EOL software (StockMaster 2009) not captured in the application portfolio.
```

###### `STRATEGIC ALIGNMENT` 

```
> Corporate OKR: Improve digital revenue by 35% by end 2026
```

```
> Strategic Theme: Customer Experience + Operational Resilience
```

###### `LANDSCAPE FINDINGS` 

```
Systems identified: 11 (7 known, 4 undocumented)
```

```
EOL technology instances: 47 stores (StockMaster 2009 — CRITICAL)
```

```
Integration dependencies mapped: 34
```

```
Duplicate capabilities: Order management (3 systems), customer profile (2 systems)
```

###### `BUILD / BUY / REUSE ASSESSMENT` 

```
Option A: Targeted Integration Fix Effort: LOW Risk: MED Speed: HIGH
```

```
Option B: Buy SaaS Commerce Platform Effort: MED Risk: MED Speed: MED
Option C: Custom Build Unified Platform Effort: HIGH Risk: HIGH Speed: LOW
RECOMMENDATION: Option B — with Option A as Phase 0 quick win
```

```
NEXT STEPS: ARB submission for governance review
```

```
STATUS: Pending CISO security risk input — StockMaster 2009
```

##### **Stage Outcomes** 

I Architecture Intake Assessment (AIA-2025-001) produced and signed by Diana Cole 

I 47-store StockMaster risk escalated to CISO (Alan Brooks) — flagged HIGH 

I 4 undocumented systems added to application portfolio I Three strategic options defined: Targeted Fix, Buy SaaS, Custom Build 

I EA recommendation: SaaS platform with Phase 0 integration quick win 

**Page 5** 

## **STAGE 2 — PITCH** 

Taking It to Governance Week 4 | Monday, 3 

February 2025 

Marcus has scheduled the ARB presentation. He has spent three days preparing the submission pack — knowing that Alan Brooks will ask hard questions about security, and that Karen Mills, the CFO, will have been briefed and will interrogate the TCO numbers. He runs a dry-run the morning of the ARB. 

###### I **10:00 | Monday 3 February 2025** 

###### I Board Room B, RetailCo HQ 

I **Architecture Review Board (ARB) — Formal** Attendees: Marcus (EA) | Diana (CDO) | Alan (CISO) | **Presentation** Karen (CFO) | Raj (Ops) | Priya (Data Arch) 

Marcus opens the session, presenting the AIA findings and three options. After the summary, the questions begin. 

##### **Alan Brooks — CISO** 

Marcus, before we go any further — the StockMaster discovery. Forty-seven instances of EOL software processing POS data. What's our PCI-DSS exposure? 

##### **Marcus Webb — Enterprise Architect** 

Alan, I've included a risk summary in Section 4 of the AIA. My assessment is HIGH risk. StockMaster is handling card transaction references at the point of sale even though the payment itself goes through the approved PSP. The risk is data in transit and the lack of security patching for three years. Any of those 47 stores could be a breach waiting to happen. 

##### **Alan Brooks — CISO** 

This needs to be a board-level risk item regardless of what this ARB decides today. I'm formally flagging it as a Critical finding. 

##### **Karen Mills — CFO** 

Marcus — Option B, the SaaS platform. The business case shows a 3-year TCO of £8.2 million. Walk me through what's in that number because I've seen 'buy' decisions underestimate implementation costs by forty percent routinely. 

##### **Marcus Webb — Enterprise Architect** 

Karen, good challenge. The £8.2M includes: platform licence at £1.4M per year over three years, £2.1M for integration build to connect to our SAP ERP and loyalty system, £800K for data migration from the eleven legacy systems, and £400K for the Phase 0 quick-win integration I'm recommending as an immediate action. I've also included a £600K contingency at fifteen percent. What it does not include is internal headcount because I've assumed we use our existing platform team. If we need a programme manager, add another £300K. 

##### **Karen Mills — CFO** 

What's the payback period? 

##### **Marcus Webb — Enterprise Architect** 

Based on the £2.8M Black Friday loss as the baseline, plus an estimated £4.2M in annual revenue uplift from unified inventory across all channels, the payback is 18 months. That's a conservative model — I've deliberately not included the upside from the customer experience improvements. 

##### **Raj Patel — Head of Retail Operations** 

What happens to my store teams during the transition? They're already stretched. 

##### **Marcus Webb — Enterprise Architect** 

**Page 6** 

Raj, that's a critical implementation risk I've flagged in Section 6. The transition plan must include parallel running of StockMaster and the new system for a minimum of 60 days per region. No hard cutover. We phase by region starting with the three lowest-volume stores as a pilot. 

##### **Priya Nair — Head of Data Architecture** 

Marcus, customer profile data — there are two systems holding it right now. Which becomes the System of Record in the new world? 

##### **Marcus Webb — Enterprise Architect** 

Priya, that's the right question and I don't have a definitive answer yet — that's a Design stage decision. What I can say is that the CDM work needs to happen before we touch any integration. The customer entity has different field definitions in three systems right now. We need your team involved in the Design gate. 

##### **Diana Cole — CDO** 

ARB — are we ready for a decision? 

##### **Alan Brooks — CISO** 

Approve with conditions. Condition one: Phase 0 — a security remediation sprint for StockMaster must begin within 30 days regardless of the main programme timeline. That's non-negotiable. 

##### **Karen Mills — CFO** 

Approve with conditions. Condition two: a revised business case with fully loaded headcount costs before the Design gate. I want to see the whole number. 

The ARB issues a conditional approval. Marcus drafts the Architecture Decision Record the same afternoon. 

I **ARTIFACT: Architecture Decision Record — Unified Commerce** ADR-2025-001 | Issued 3 February **Platform** 2025 

```
DECISION: Approve Option B — SaaS Commerce Platform (Platform-X) with Phase 0 integration
```

###### `CONTEXT` 

```
RetailCo operates 11 commerce systems with no unified inventory view. The Black Friday
```

```
2024 incident resulted in £2.8M revenue loss. 47 stores run EOL StockMaster 2009 (CRITICAL).
```

###### `OPTIONS CONSIDERED` 

```
A) Targeted Integration Fix — rejected: solves Black Friday but not long-term scalability
```

```
B) Buy Platform-X SaaS — APPROVED: best risk/speed/cost balance
```

```
C) Custom Build — rejected: high risk, 18-month delay before value delivery
```

###### `DECISION RATIONALE` 

```
Platform-X provides unified inventory, order management, and customer profile in one SaaS.
```

```
Phase 0 integration quick-win addresses Black Friday risk within 60 days.
```

###### `CONDITIONS` 

```
[CISO-001] StockMaster security remediation sprint to start within 30 days
```

```
[CFO-001] Revised fully-loaded business case before Design gate
```

###### `CONSEQUENCES` 

```
+ Unified real-time inventory across all 47 stores + online within 12 months
```

```
+ Eliminates EOL StockMaster from estate by end Q4 2025
```

- `Legacy integration middleware (2018) must be decommissioned — complex dependency map` 

**Page 7** 

|`- Priya's data architecture team must define CDM before Design gate`|
|---|
|`REVIEW DATE: Q1 2026 (post-implementation)`|
|`ARB CHAIR SIGN-OFF: Diana Cole (CDO) DATE: 03/02/2025`|

|**Stage Outcomes**|
|---|
|IARB Conditional Approval granted — ADR-2025-001 issued|
|IOption B (Platform-X SaaS) approved as primary approach|
|IPhase 0 security remediation of StockMaster mandated within 30 days|
|ISophie Turner assigned as Solution Architect|
|IPriya Nair's Data Architecture team engaged for CDM work|

**Page 8** 

## **STAGE 3 — DESIGN** 

#### Blueprinting the Future Weeks 6–12 | February 

– March 2025 

Sophie Turner, the assigned Solution Architect, and Marcus spend six weeks in intensive design work. Marcus governs the architectural boundaries; Sophie translates them into technical blueprints. It is a productive but frequently tense partnership — Sophie wants to move fast; Marcus insists on rigour at each decision point. 

I **09:30 | Tuesday 18 February 2025** 

I Architecture Studio, Floor 8 

I **Design Working Session — Integration** Attendees: Marcus (EA), Sophie (SA), Priya (Data **Architecture** Arch), Tom Holt (Platform-X Vendor) 

##### **Tom Holt — Platform-X Vendor Sales Lead** 

Marcus, Sophie — Platform-X has native connectors for SAP and for Salesforce Commerce Cloud. We can have the integration live in six weeks. The connector is pre-built, it's just configuration. 

##### **Marcus Webb — Enterprise Architect** 

Tom, walk me through the data model on the Platform-X side for the product entity. Specifically how it handles multi-location stock quantities. 

##### **Tom Holt — Platform-X Vendor** 

It uses a location-based inventory model — stock is held at the location level with a rollup to the channel level. Very flexible. 

##### **Priya Nair — Head of Data Architecture** 

That's a problem. Our SAP model holds stock at the distribution centre level, not the store level. The StockMaster system holds store-level stock — but as we've established, it's a zombie system. If we map directly from SAP to Platform-X, we'll have the same black hole we have today. 

##### **Marcus Webb — Enterprise Architect** 

Tom — does the Platform-X connector support a transformation layer, or is it a direct schema mapping? 

##### **Tom Holt — Platform-X Vendor** 

It's... fairly direct. You could write custom transformation logic but that would be outside the standard connector scope. 

##### **Marcus Webb — Enterprise Architect** 

So the six-week integration claim assumes our data model matches yours. It doesn't. Priya, how long to define the canonical data model for the inventory entity and align SAP? 

##### **Priya Nair — Head of Data Architecture** 

Six weeks minimum. And that's with my full team. The product entity alone has seven different field definitions across our systems. 

##### **Sophie Turner — Solution Architect** 

Marcus, if we wait for the full CDM before starting any integration build, we push the Design gate back by six weeks. Diana is expecting Q2 delivery. 

##### **Marcus Webb — Enterprise Architect** 

Sophie, if we build on a broken data model, we will spend the next two years fixing data quality bugs in production. The CDM is not optional. What I will do is talk to Diana today and reset the timeline. A six-week slip now is worth avoiding a twelve-month production crisis. 

**Page 9** 

I _EA's Internal Thought: Sophie is right that the timeline will slip. But building on a mismatched data model is how you get the 2018 middleware mess we're trying to escape. I need to hold this line with Diana even though it will be an uncomfortable conversation._ 

Marcus walks straight to Diana's office. No calendar invite. Door open — he knocks anyway. 

I **11:45 | Tuesday 18 February 2025** I Diana Cole's office, Floor 12 

##### **Marcus Webb — Enterprise Architect** 

Diana, I need five minutes. The design work has surfaced a data model conflict between Platform-X and our SAP system. We cannot build the integration until Priya's team has defined the canonical data model for inventory. That's six weeks. The Design gate is moving. 

##### **Diana Cole — CDO** 

Marcus, I have committed Q2 to the board. What am I supposed to tell them? 

##### **Marcus Webb — Enterprise Architect** 

Tell them that we found the root cause of the Black Friday problem: we have seven different definitions of what 'inventory' means across our systems. We are fixing it properly. The alternative is to build quickly on the broken model and spend the next two years fire-fighting data quality issues in production. I have seen that happen at two other organisations. We are not doing it here. 

##### **Diana Cole — CDO** 

How do we show progress to the board in Q2 if the main platform isn't live? 

##### **Marcus Webb — Enterprise Architect** 

Phase 0. The targeted real-time inventory feed between SAP and Salesforce Commerce Cloud. That can go live in 8 weeks. That's the Black Friday fix. That's the Q2 story. Main platform follows in Q3. 

##### **Diana Cole — CDO** 

Fine. But I need this in writing. And you're in the board update with me next month. 

Over the following four weeks, Marcus governs the production of the Solution Architecture Document. Sophie leads the technical detail; Marcus reviews every architectural decision for standards compliance, strategic alignment, and risk. 

I **ARTIFACT: Solution Architecture Document (Extract) — Unified** SAD-2025-001 | v1.0 | Approved 14 **Commerce Platform** March 2025 

```
SECTION 3: INTEGRATION ARCHITECTURE
```

###### `3.1 Integration Approach: API-First, Event-Driven` 

```
All integrations will use REST APIs with OpenAPI 3.0 contracts.
```

```
Real-time inventory updates will use an event-driven pattern via Apache Kafka.
```

```
No point-to-point integrations permitted. All events routed via the Enterprise
```

```
Event Bus. Integration contracts peer-reviewed by EA before implementation.
```

```
3.2 Canonical Data Model — Inventory Entity (extract)
```

```
location_id : UUID (mandatory) — maps to SAP plant code
sku_id : VARCHAR(50) — maps to SAP material number
quantity_on_hand : INTEGER — real-time, source: SAP + store transactions
quantity_reserved : INTEGER — online orders in flight
quantity_available: quantity_on_hand - quantity_reserved
```

**A DAY IN THE LIFE OF AN ENTERPRISE ARCHITECT  |  INCUBATION TO RETIRE Page 10** 

```
last_updated : TIMESTAMP (UTC) — mandatory for all sync events
SECTION 5: NON-FUNCTIONAL REQUIREMENTS
Availability: 99.9% (Tier 1 system — mission critical)
RTO: 2 hours
RPO: 15 minutes
Inventory sync: < 30 seconds end-to-end latency (hard requirement)
Throughput: 10,000 events/minute (peak Black Friday model)
Security: Zero Trust posture. mTLS between all services. AES-256 at rest.
SECTION 7: DECOMMISSION SCOPE
Systems to be retired on completion: StockMaster 2009 (47 instances)
Legacy middleware layer (2018 vintage) — 34 integration dependencies to migrate
Estimated decommission effort: 3 months post-go-live
```

The Design gate review is held on 14 March. Alan Brooks raises one final concern before signing off. 

I **14:00 | Friday 14 March 2025** I Board Room A — Design Gate Review 

##### **Alan Brooks — CISO** 

Page 31 — the mTLS requirement between services. Sophie, how is the certificate management handled? Who rotates certificates, on what cycle, and what's the failover if a certificate expires in production? 

##### **Sophie Turner — Solution Architect** 

Certificate management will be via HashiCorp Vault. Rotation every 90 days, automated. Expiry alerts at 14 days and 7 days. Failover — if a certificate expires, the service returns a 503 and the upstream system retries on a 5-second backoff. 

##### **Alan Brooks — CISO** 

What's the maximum retry window before a human is alerted? 

##### **Sophie Turner — Solution Architect** 

Pagerduty alert fires after 3 failed retries — approximately 15 seconds. 

##### **Alan Brooks — CISO** 

Acceptable. I'll sign off. But I want the Vault configuration reviewed by my team before any certificate is issued in production. 

##### **Marcus Webb — Enterprise Architect** 

Agreed. That's a mandatory step in the Build stage pre-production checklist. Sophie, please log that as an architecture condition in the guardrails document. 

##### **Stage Outcomes** 

I Solution Architecture Document (SAD-2025-001) approved by ARB Chair and CISO 

I Canonical Data Model for inventory entity defined and signed off by Priya Nair 

I Architecture Guardrails Document published — API-first, event-driven, zero trust mandated 

I Phase 0 (Black Friday fix) integration scoped and fast-tracked — 8 week delivery 

I Design gate timeline revised: 6-week CDM work absorbed; board update reframed 

**Page 11** 

## **STAGE 4 — BUILD** 

Governing Delivery Without Micromanaging It Months 4–9 | April – September 2025 

James Owusu's engineering team begins delivery. Marcus runs the architecture compliance checkpoints. The 30% review in May surfaces the first significant deviation. 

I **10:00 | Wednesday 14 May 2025 (30% Architecture Review)** 

I Virtual — Teams Call 

#### I **30% Architecture Compliance Review** 

Attendees: Marcus (EA), Sophie (SA), James (Delivery), Priya (Data) 

##### **James Owusu — Head of Delivery** 

Marcus, quick flag before we start. The team has implemented the SAP integration using a direct JDBC connection rather than the API gateway. They said it was faster and Platform-X's connector kit supports it natively. 

##### **Marcus Webb — Enterprise Architect** 

James, stop. JDBC direct to SAP is a point-to-point integration. That's explicitly not permitted under the architecture guardrails — Section 2.3. All integrations route via the Enterprise Event Bus. Why was this decision made without an architecture exception request? 

##### **James Owusu — Head of Delivery** 

The team lead said the API approach would add two weeks to the integration timeline. It seemed like a pragmatic call. 

##### **Marcus Webb — Enterprise Architect** 

I understand the pressure, James. But a direct JDBC connection to SAP is exactly how we ended up with the 2018 middleware mess that we're now spending £8 million to replace. If we allow this, we are rebuilding the problem we came here to fix. Sophie, what's the actual rework effort to move to the event bus approach? 

##### **Sophie Turner — Solution Architect** 

Honestly? About a week. The team had the JDBC connection working so quickly that they kept going. The event bus schema is already defined in the CDM — it's mostly configuration. 

##### **Marcus Webb — Enterprise Architect** 

Then it's non-negotiable. One week of rework is infinitely better than a decade of maintenance debt on a point-to-point connection to a core ERP. James, I'll raise this as a formal architecture exception rejected — the team needs to rework this by the 70% review. I'll document it in the ADR register. 

##### **James Owusu — Head of Delivery** 

Understood. I'll reallocate resource. I just need you to tell me officially so I can adjust the sprint plan. 

##### **Marcus Webb — Enterprise Architect** 

You'll have the formal exception rejection in writing by end of today. 

I _EA's Internal Thought: This is exactly why the 30% review exists. If I'd seen this at 90% — or worse, in production — it would have been a refactoring nightmare. The pressure to let it go is real. But if the EA doesn't hold the line here, nobody will._ 

The 70% review in July is cleaner. The event bus integration is correct. But a new issue emerges — the observability stack. 

**Page 12** 

I **09:00 | Thursday 10 July 2025 (70% Architecture Review)** 

I Architecture Studio, Floor 8 

##### **Sophie Turner — Solution Architect** 

Marcus, we're tracking well against the SAD. One gap — the Datadog monitoring dashboard. The team hasn't built the inventory sync latency alert. They've been prioritising the feature work. 

##### **Marcus Webb — Enterprise Architect** 

Sophie, the 30-second inventory sync latency SLA is the entire business case for Phase 0. If we can't monitor it, we can't detect a breach, and we can't respond before it becomes another Black Friday. This is not optional. It needs to be in the pre-production sign-off gate. 

##### **Sophie Turner — Solution Architect** 

Agreed. I'll make it a blocking item for go-live. I'll add it to the pre-production checklist. 

##### **Marcus Webb — Enterprise Architect** 

Good. The pre-production review is in eight weeks. I also want to see the load test results — 10,000 events per minute at peak. Has that been scoped? 

##### **Sophie Turner — Solution Architect** 

Load test is scheduled for week of 4 August. We've modelled it on last year's Black Friday traffic plus a 30% headroom. 

##### **Marcus Webb — Enterprise Architect** 

Perfect. And the DR drill? 

##### **Sophie Turner — Solution Architect** 

Failover to secondary region is scheduled for 18 August. I'll share results directly. 

Phase 0 — the real-time inventory feed — goes live on 19 April. For the main platform, the pre-production review is held on 3 September 2025. 

I **13:00 | Wednesday 3 September 2025** I Board Room B — Pre-Production Gate Review 

#### I **Pre-Production Architecture Compliance Sign-Off** 

Attendees: Marcus (EA), Sophie (SA), Alan (CISO), James (Delivery) 

##### **Marcus Webb — Enterprise Architect** 

Let's work through the pre-production checklist. Sophie — NFR testing. Load test results? 

##### **Sophie Turner — Solution Architect** 

Load test completed 6 August. Peak throughput tested at 12,400 events per minute — above the 10,000 requirement. P99 latency at peak: 22 seconds. Well within the 30-second SLA. 

##### **Marcus Webb — Enterprise Architect** 

DR drill? 

##### **Sophie Turner — Solution Architect** 

Completed 20 August. Failover to secondary region: 47 minutes. That's within the 2-hour RTO. 

##### **Marcus Webb — Enterprise Architect** 

Security — Alan, DAST scan? 

##### **Alan Brooks — CISO** 

DAST completed by my team last week. Two medium findings, both resolved. Zero criticals or highs. HashiCorp Vault configuration was reviewed — approved. 

##### **Marcus Webb — Enterprise Architect** 

Observability — Datadog dashboard and inventory latency alert? 

**Page 13** 

##### **Sophie Turner — Solution Architect** 

Live and tested. Alert fires within 90 seconds of a latency breach above 28 seconds — that gives us a 2-second buffer before we hit the SLA. 

##### **Marcus Webb — Enterprise Architect** 

Architecture drift check — does the deployed architecture match the approved SAD? 

##### **Sophie Turner — Solution Architect** 

Confirmed. We had the one JDBC exception which was remediated at the 30% review. Everything else matches the SAD. I ran the architecture fitness function in the pipeline this morning — green. 

##### **Marcus Webb — Enterprise Architect** 

Alan — sign-off? 

##### **Alan Brooks — CISO** 

Signed off. 

##### **Marcus Webb — Enterprise Architect** 

Then I'm issuing the pre-production compliance sign-off. Go-live approved. James, coordinate with Raj's team on the regional rollout sequence. 

##### **Stage Outcomes** 

I Phase 0 (Black Friday real-time inventory fix) went live 19 April 2025 — on schedule 

I 30% review caught JDBC point-to-point deviation — remediated to event bus pattern 

I Pre-production sign-off issued 3 September — all NFRs tested, DAST passed, DR drilled 

I Platform-X Unified Commerce Platform — regional rollout begins October 2025 

**Page 14** 

## **STAGE 5 — OPERATE** 

Keeping the Estate Healthy Months 10–12 | October – December 2025 

The platform is live. The Datadog dashboard is Marcus's first screen every morning. The first Black Friday on the new system approaches. The week before, a Pagerduty alert fires at 2:47am. 

I **02:47 | Friday 21 November 2025** I Marcus's home office 

Marcus's phone lights up with a Pagerduty alert: 'CRITICAL — Inventory sync latency breach: P99 latency 31.4 seconds. Threshold: 30 seconds.' He is awake in forty seconds and on a call with Sophie six minutes later. 

##### **Marcus Webb — Enterprise Architect** 

Sophie, I've got the Datadog dashboard open. The Kafka consumer lag is spiking on the inventory-sync topic. What's the partition count? 

##### **Sophie Turner — Solution Architect** 

Checking. Eight partitions. We projected twelve at peak — looks like the load is higher than our Black Friday model. We're seeing traffic from the new personalisation feature that wasn't in the load test scope. 

##### **Marcus Webb — Enterprise Architect** 

Can we scale the consumer group horizontally right now? 

##### **Sophie Turner — Solution Architect** 

Yes — Kubernetes horizontal pod autoscaler. Scaling from 8 to 16 consumer pods now. 

##### **Marcus Webb — Enterprise Architect** 

Latency is dropping. 28.2 seconds. 24.6. We're back under threshold. Good. Sophie, log this as an architectural incident — root cause was load model underestimating the personalisation feature traffic. We need a capacity review before actual Black Friday. 

Black Friday 2025 arrives. The inventory sync latency stays at 18 seconds at peak. Zero abandoned carts due to stock visibility. Revenue: £24.7 million in 6 hours. Diana sends Marcus a message at 11:14pm: 'You were right about everything.' He screenshots it and keeps it. 

In December, Marcus runs the quarterly compliance review for the first time since go-live. 

I **10:00 | Monday 8 December 2025** I Architecture Studio, Floor 8 I **Quarterly Architecture Compliance Review — Q4** Attendees: Marcus (EA), Sophie (SA), Platform **2025** Operations Team 

##### **Marcus Webb — Enterprise Architect** 

Let's start with the compliance dashboard. EOL technology — we decommissioned 31 of the 47 StockMaster instances as part of the regional rollout. Sixteen stores are still on StockMaster. Those are the four Northern region stores that are in the next rollout wave. Status? 

##### **Sophie Turner — Solution Architect** 

Northern region rollout is scheduled for February 2026. The remaining 16 StockMaster instances will be decommissioned in March. 

##### **Marcus Webb — Enterprise Architect** 

Good. Architecture exceptions — we have three open. Exception AE-001: the legacy reporting system that directly queries the Platform-X database. That was granted as a 60-day temporary exception in October. It's now December. Who owns resolution? 

**Page 15** 

##### **Sophie Turner — Solution Architect** 

That was supposed to be the analytics team. They said they needed access to run December reporting before moving to the API. 

##### **Marcus Webb — Enterprise Architect** 

December reporting ends in three weeks. Exception AE-001 closes on 2 January — non-negotiable. I'll send the owner a formal notice today. A temporary exception that is renewed forever is just debt with paperwork. 

##### **Stage Outcomes** 

I Platform-X live across 31 stores — Black Friday 2025 delivered £24.7M revenue, zero inventory failures 

I 2:47am incident detected and resolved in under 12 minutes — observability working as designed 

I 31 of 47 StockMaster instances decommissioned — 16 remaining (February 2026) 

I Architecture exception AE-001 formally escalated — closure mandated 2 January 2026 

I EOL technology % reduced from 18% to 7% in portfolio 

**Page 16** 

## **STAGE 6 — REVIEW** 

#### The Annual Rationalisation Month 14 | 

February 2026 

Marcus runs the annual application rationalisation exercise across the full portfolio. The legacy 2018 middleware layer — 'the bus', as the operations team calls it — scores poorly on both technical health and business value now that Platform-X has taken over its core functions. 

I **14:00 | Thursday 12 February 2026** I Board Room B — Annual Rationalisation Review 

I **Application Rationalisation — Portfolio Decision** Attendees: Marcus (EA), Diana (CDO), Raj (Ops), **Session** Priya (Data), Sophie (SA) 

##### **Marcus Webb — Enterprise Architect** 

I want to focus on three systems today. First: the 2018 middleware layer. Business value score — I've given it a 1 out of 5. It now carries only 4 active integrations, all of which are legacy reporting feeds. Technical health: 2 out of 5. The underlying technology is Java 8 on an unsupported Mule runtime. My recommendation is Retire. 

##### **Raj Patel — Head of Retail Operations** 

Those four integrations — what happens to them? 

##### **Marcus Webb — Enterprise Architect** 

Two of them can be replicated via the Platform-X API with minimal effort. One is the legacy reporting query that is already flagged as exception AE-001 — that one should be migrated to the data warehouse, which is Priya's domain. One is a niche supplier EDI feed that we need to assess separately. 

##### **Priya Nair — Head of Data Architecture** 

The reporting migration to the data warehouse — I can absorb that in Q2 if Marcus can give me the dependency map. 

##### **Marcus Webb — Enterprise Architect** 

It's already drafted. Second system: the legacy order management system that was running in parallel. It now processes zero orders — Platform-X handles everything. Business value: 1. Technical health: 1. Oracle 11g, EOL 2023. My recommendation is Retire immediately. 

##### **Diana Cole — CDO** 

Any risk to retiring it now? 

##### **Marcus Webb — Enterprise Architect** 

Minimal — but I want a 30-day data archive period before we decommission the infrastructure. There may be historical order records needed for a customer dispute. Legal confirmed 7-year retention requirement. We archive, then decommission. 

##### **Diana Cole — CDO** 

Agreed. Third system? 

##### **Marcus Webb — Enterprise Architect** 

The final 16 StockMaster instances — Northern region. The rollout completes in March. These 16 instances are formally on the retire list as of today. I'm treating them as a project with James's team for the March decommission. 

I **ARTIFACT: Application Rationalisation Decision Record — 2026 Annual Cycle** RDREC-2026-001 | February 2026 

```
SYSTEM: 2018 Legacy Middleware Layer (Mule ESB)
```

**Page 17** 

```
Business Value Score : 1/5 (4 active integrations, all legacy reporting)
```

```
Technical Health Score: 2/5 (Java 8, Mule 3.9 — EOL 2023)
Disposition: RETIRE
```

```
Target Date: Q2 2026 | Owner: Sophie Turner (SA)
Dependencies: 2 via Platform-X API, 1 to data warehouse, 1 EDI supplier (assess)
```

```
SYSTEM: Legacy Order Management System (Oracle 11g)
```

```
Business Value Score : 1/5 (0 orders processed — Platform-X handles all)
Technical Health Score: 1/5 (Oracle 11g EOL 2023, no patches since 2022)
Disposition: RETIRE IMMEDIATELY
```

```
Target Date: April 2026 | 30-day archive period before infrastructure decommission
Owner: Marcus Webb (EA) + James Owusu (Delivery)
SYSTEM: StockMaster 2009 — 16 Northern Region Instances
Business Value Score : 1/5 (superseded by Platform-X)
Technical Health Score: 1/5 (EOL 2022, no vendor support)
Disposition: RETIRE
Target Date: March 2026 (on completion of Northern region Platform-X rollout)
Owner: Sophie Turner (SA) + Regional Store Managers
APPROVED BY: Diana Cole (CDO) DATE: 12/02/2026
```

##### **Stage Outcomes** 

I Three systems formally designated for retirement: Middleware, Legacy OMS, StockMaster (16 instances) I Rationalisation decisions approved by CDO — RDREC-2026-001 issued I TCO reduction projected: £1.8M annually from retired systems I Portfolio EOL technology target: below 3% by Q3 2026 

**Page 18** 

## **STAGE 7 — RETIRE** 

Closing the Loop Properly Month 15 | March – 

May 2026 

Retirement is the stage most EA teams botch. Marcus has learned this the hard way at a previous employer where a 'decommissioned' system turned out to still be receiving live traffic eighteen months after switch-off. This time, he runs retirement as a formal project. 

I **09:00 | Monday 2 March 2026** 

I Architecture Studio, Floor 8 

I **StockMaster Decommission Project Kickoff** 

Attendees: Marcus (EA), Sophie (SA), James (Delivery), Raj (Ops), Legal Representative 

##### **Marcus Webb — Enterprise Architect** 

Right. Let's be very clear about what we're doing today. We are formally decommissioning StockMaster across the final 16 stores. I want to walk through the dependency map, the data disposition, and the access removal plan. Nothing gets switched off until all three are done. Sophie, dependency map? 

##### **Sophie Turner — Solution Architect** 

I've run the integration register scan plus a live traffic analysis. StockMaster in the Northern region has 3 active integrations: the regional reporting feed — that's being migrated to the data warehouse by Priya's team, that completes March 20. The POS end-of-day reconciliation — that's being replaced by the Platform-X settlement API, in testing now. And there's a mystery feed to a system called 'NORDR' that nobody recognised. 

##### **Marcus Webb — Enterprise Architect** 

A mystery feed. NORDR — Raj, do you know what that is? 

##### **Raj Patel — Head of Retail Operations** 

NORDR is the Northern region's local delivery routing system. It's a spreadsheet-based tool the regional manager built about four years ago. It pulls stock data from StockMaster to plan driver routes. 

##### **Marcus Webb — Enterprise Architect** 

A spreadsheet-based tool pulling from a production system. Raj, is there any way that spreadsheet is processing customer data? 

##### **Raj Patel — Head of Retail Operations** 

Possibly. It has order postcodes for routing. 

##### **Marcus Webb — Enterprise Architect** 

Then we have a GDPR issue. That spreadsheet is an undocumented system processing personal data outside of any governed architecture. Legal — this needs to go to your team today. We cannot touch the StockMaster switch-off until NORDR is dealt with. It's either brought into governance or it's terminated. 

##### **Legal Representative — Legal/Compliance** 

Understood. I'll raise this with the DPO immediately. Expect a response within 48 hours. 

##### **Marcus Webb — Enterprise Architect** 

James — until legal clears NORDR, the StockMaster decommission timeline moves by two weeks. This is non-negotiable. We will not create a GDPR breach by rushing a decommission. 

I _EA's Internal Thought: NORDR. A spreadsheet pulling from a production EOL system, routing vehicles using customer postcodes, built by a regional manager four years ago. This is exactly the kind of shadow IT that never shows up in the integration register because nobody registered it. The decommission process flushed it out. This is why you run a dependency analysis before you touch anything._ 

**Page 19** 

NORDR is assessed by Legal, found to be non-compliant with the data retention policy, and formally decommissioned by the regional manager within five days. The StockMaster retirement resumes two weeks later. On 28 April 2026, the last StockMaster instance goes offline. Marcus is on the call. 

I **23:00 | Tuesday 28 April 2026** I Virtual — Emergency Bridge Call 

##### **Sophie Turner — Solution Architect** 

Marcus — store NR-047, Carlisle. StockMaster instance is offline. Platform-X inventory sync confirmed live. Store manager has validated stock counts match. Final instance decommissioned. 

##### **Marcus Webb — Enterprise Architect** 

Confirm access removal. 

##### **Sophie Turner — Solution Architect** 

Checked. The service account for StockMaster has been removed from Active Directory. Firewall rules have been revoked. DNS entry removed. I ran the access check 10 minutes ago. 

##### **Marcus Webb — Enterprise Architect** 

Infrastructure? 

##### **Sophie Turner — Solution Architect** 

The 16 VM instances are scheduled for decommission Thursday morning. Cloud billing will stop. Hardware in the Carlisle depot is tagged for disposal under the WEEE process. 

##### **Marcus Webb — Enterprise Architect** 

Documentation archive? 

##### **Sophie Turner — Solution Architect** 

All StockMaster documentation — configuration files, runbooks, incident history — archived to the secure archive with a 7-year retention tag. Confirmed. 

##### **Marcus Webb — Enterprise Architect** 

Good. Sophie — thank you. Genuinely. Fourteen months ago StockMaster was a ghost system in 47 stores that nobody knew existed. Tonight it doesn't exist anymore, properly. That's how you close a lifecycle. 

###### u **EMAIL** 

**From: Marcus Webb (Enterprise Architect)** 

**To: Diana Cole (CDO), ARB Members, Karen Mills (CFO)** 

##### **Subject: Decommission Certificate — StockMaster 2009 (All 47 Instances) | Programme Closure** 

Diana, I am pleased to confirm that the StockMaster 2009 system has been fully decommissioned across all 47 retail stores as of 28 April 2026. KEY OUTCOMES — Unified Commerce Programme: • Platform-X live across all 47 stores + online channels since March 2026 • StockMaster 2009 (47 instances) — fully decommissioned • Legacy 2018 Middleware — decommissioned April 2026 • Legacy Order Management System (Oracle 11g) — decommissioned April 2026 • Shadow IT discovery: NORDR spreadsheet system — assessed, closed FINANCIAL OUTCOME: • Annual TCO savings from retired systems: £1.84M • Black Friday 2025 revenue: £24.7M (vs £21.1M 2024 + £2.8M incident loss) • Programme ROI at 14 months: 34% LESSONS LEARNED (summary — full document attached): • Shadow IT discovery is best done during decommission, not during intake • Data model alignment (CDM) must precede integration build — non-negotiable • The 30% architecture review prevented a point-to-point integration that would have recreated the exact technical debt we came to eliminate The application portfolio has been updated. All architecture diagrams reflect the current state. ADR-2025-001 has been closed. The ARB is formally notified. Marcus Webb | Enterprise Architect | RetailCo 

##### **Stage Outcomes** 

I StockMaster 2009 — all 47 instances decommissioned. 0 EOL instances remaining 

**A DAY IN THE LIFE OF AN ENTERPRISE ARCHITECT  |  INCUBATION TO RETIRE Page 20** 

|ILegacy Middleware (2018) and Legacy OMS (Oracle 11g) both decommissioned|
|---|
|IShadow IT system (NORDR) discovered during decommission — closed via Legal|
|IAnnual TCO savings realised: £1.84M. Programme ROI: 34% at 14 months|
|IApplication portfolio updated. All diagrams current. ARB formally closed.|

**Page 21** 

### **EPILOGUE** 

It is Friday 1 May 2026. Marcus is at his desk. His Datadog dashboard shows all green. His application portfolio shows 43 active systems — down from 58 fourteen months ago. His EOL technology percentage is 2.1%. His architecture adoption rate is 91%. 

He has a new calendar invite. Diana Cole. 'Urgent — Digital Strategy Alignment — CDO + EA — 9am.' No agenda. 

He smiles, makes a coffee, and opens his Architecture Intake Assessment template. 

#### **Complete Artefact Register — Unified Commerce Programme** 

|**Artefact Produced**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2025-001)|Incubation / Pitch|CDO, Ops, CISO|
|Architecture Decision Record (ADR-2025-001)|Pitch / Approve|ARB, CDO, CFO|
|Solution Architecture Document (SAD-2025-001)|Design|SA, CISO, Data Arch|
|Architecture Guardrails Document|Design|Delivery Team, SA|
|30% & 70% Architecture Review Reports|Build|SA, Delivery, CISO|
|Pre-Production Compliance Sign-Off|Build|CISO, SA, Delivery|
|JDBC Exception Rejection Notice|Build|Delivery, SA|
|Quarterly Compliance Review Report (Q4)|Operate|CDO, Operations|
|Application Rationalisation Decision Record|Review|CDO, Ops, Data|
|Dependency Map — StockMaster Decommission|Retire|SA, Delivery, Legal|
|Decommission Certificate (all systems)|Retire|CDO, ARB, CFO|
|Lessons Learned Report|Retire|ARB, EA Practice|

**_"The Enterprise Architect's job is not to be right. It is to ask the questions that prevent the organisation from being expensively wrong."_**
