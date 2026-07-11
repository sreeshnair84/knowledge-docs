---
title: "EA Senior Interview Questions"
date_created: 2026-06-29
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["interview-prep"]
doc_type: interview-questions
target_role: EA Senior Interview Questions
---

# Enterprise Architect Interview — Scenario Question Bank

## For Candidates with 20+ Years of Experience

> **How to use this guide:** Each question includes three layers — the **Interviewer's Intent** (what they're actually testing), the **Thinking Approach** (how to structure your response before speaking), and a **Model Answer** (a senior-level response that demonstrates depth). Adapt language and examples to your own experience.

---

## The 20-Year EA Interview Context

At this level, interviewers are not testing knowledge. They are testing **judgment** — the ability to make sound decisions under uncertainty, at enterprise scale, with competing stakeholders, incomplete information, and real consequences. Every answer should demonstrate:

- **Systemic thinking** (seeing the whole, not the part)
- **Navigated complexity** (how you've operated in human, political, and technical systems simultaneously)
- **Scar tissue** (what you've learned from failure, not just success)
- **Forward orientation** (how your accumulated experience applies to the AI era)

---

## SECTION 1: Strategic Architecture & AI Vision

---

### Question 1

**"You've just joined as Head of Enterprise Architecture at a $5B financial services company. In your first discovery conversations, you find the organisation has 14 different AI initiatives running in parallel, no shared infrastructure, three competing LLM vendor relationships, and no governance. The CTO wants an AI strategy in 90 days. Walk me through exactly what you do."**

**Interviewer's Intent:**
Tests executive-level thinking, prioritisation under pressure, ability to create order from chaos without alienating people who built the chaos, and whether you understand the difference between a strategy and a document.

**Thinking Approach:**

- Don't start with the technology — start with the people and the risk
- Show that 90 days is for diagnosis and direction, not a complete solution
- Demonstrate stakeholder intelligence, not just technical intelligence
- Signal that you'll build governance that people want to participate in, not fear

**Model Answer:**

"The first thing I'd resist is the pressure to produce a document in 90 days. What I'd aim to produce in 90 days is a shared understanding of where we are and a credible direction — that's different from a strategy deck that sits on a shelf.

In the first two weeks, I'm not building anything. I'm listening. I'd run structured discovery with each of the 14 initiative owners — not to audit them, but to understand what problem they're actually solving, what they've built, and what's not working. I'd also map the relationships: who funded what, whose career is invested in which platform, where there's genuine duplication versus apparent duplication that's actually solving different problems.

By week three, I'd have a heat map of the actual risk landscape — not theoretical risk, but where the organisation is genuinely exposed right now. Data going to unapproved vendors, models making customer-facing decisions with no monitoring, costs no one is tracking. I'd share that with the CISO and Legal before I share it with the CTO, because they need to see it simultaneously.

In weeks four through eight, I'd identify two or three AI initiatives that could become 'lighthouse' implementations — ones where I could apply a governance framework and demonstrate that it accelerates delivery rather than blocks it. That's the most important proof of concept I can run. If governance feels like a tax, it will be circumvented. If it feels like a service, teams will seek it out.

The 90-day output would be three things: a clear AI risk register the board can understand, a consolidated infrastructure direction that retires the vendor sprawl over 12 months without destroying what's already working, and a lightweight governance process — an AI Architecture Review Board — that I've already run two or three real cases through so it's not theoretical.

What I would not do is come in with a framework from my last company and apply it wholesale. Every organisation's AI chaos has a specific political and cultural shape, and the governance that sticks is the governance that fits that shape."

---

### Question 2

**"The CEO has read about autonomous AI agents and wants to deploy them across the enterprise within 6 months. Your risk assessment says 18 months minimum. How do you handle this?"**

**Interviewer's Intent:**
Tests the ability to manage upward with conviction, to translate technical risk into business language, and to find a path that honours urgency without compromising safety — and whether you fold under executive pressure.

**Thinking Approach:**

- Don't just say "no" — that ends the conversation and your credibility
- Find the legitimate urgency underneath the request
- Reframe the timeline question as a scope question
- Offer a credible accelerated path with explicit tradeoffs

**Model Answer:**

"My first instinct when this happens — and it does happen regularly — is to get curious before I get resistant. So I'd ask the CEO: what does success look like in 6 months? What specific business outcome are they trying to achieve? Because often 'deploy agents across the enterprise' is actually 'I want to see something real and significant working, and I don't want to wait forever.'

Once I understand the actual goal, I can usually find a path that addresses it. The gap between 6 months and 18 months is almost always a scope gap, not a pure timeline gap.

So I'd bring back an honest reframe: 'We can have three high-value, production-grade agent deployments running safely within 6 months — here's what those would be. Full enterprise rollout requires foundational work in [specific area] that cannot be safely compressed below 12 months without creating risk that could set us back further. Here's what that risk looks like in business terms: [specific scenario — regulatory fine, customer data exposure, operational failure].'

I'd also show the CEO what 'fast and unsafe' looks like. Not to scare them — to give them an informed choice. They may decide the competitive pressure justifies accepting more risk. That is their call to make, not mine. But they need to make it with full information.

If they push back and say the 6-month timeline is non-negotiable, I'd document my recommendation and the risks clearly, get their explicit acknowledgment in writing, and then build the best possible version of the 6-month plan with every safety control I can fit into that window. My job is not to block — it's to ensure the decision-maker makes an informed decision. After that, I execute."

---

### Question 3

**"You're designing an AI reference architecture for a global enterprise operating across 40 countries, each with different data residency laws. How do you approach this?"**

**Interviewer's Intent:**
Tests real-world complexity handling, regulatory literacy, ability to design for heterogeneity rather than forcing uniformity, and practical delivery instinct.

**Thinking Approach:**

- Show that you've operated at this scale before — or that your reasoning reflects it
- Demonstrate that you understand the tension between global consistency and local compliance
- Don't oversimplify: this is a problem with no clean solution, and recognising that is itself a signal of experience

**Model Answer:**

"This is a problem where the temptation is to find the one architecture that works everywhere, and after two decades of doing this, I can tell you that temptation is usually wrong.

What I'd build is a federated reference architecture with a thin global layer and a thick local execution layer. The global layer defines the non-negotiables: security standards, logging and audit requirements, approved model interfaces, and the governance process. Everything above that adapts.

Concretely, that means I'd segment AI infrastructure by regulatory jurisdiction cluster — not by country, because you'll go mad maintaining 40 separate architectures, but by meaningful groupings. EU data sovereign countries cluster together under GDPR and the EU AI Act. APAC countries with strong data localisation laws — India, Indonesia, China — get their own cluster. The Americas cluster has different characteristics again.

For each cluster, the question I'm answering is: can data leave this cluster? If not — and in several jurisdictions it legally cannot — then model inference, training data, and outputs must all stay within the cluster boundary. That has infrastructure implications: you need regional AI infrastructure deployment, not just data replication.

The practical challenge I always surface early is the cost question, because regional AI infrastructure is expensive. I'd build an economic model alongside the technical model so leadership understands the cost of compliance. Sometimes that conversation surfaces that certain jurisdictions are not worth operating AI-heavy services in, and that's a legitimate business decision.

The thing I'd refuse to do is design a single-architecture solution that works on paper but requires regulatory exceptions in practice. Those exceptions always become liabilities."

---

## SECTION 2: Governance & Risk

---

### Question 4

**"You discover that a high-performing business unit has been running a production AI system for six months that was never reviewed or approved. It processes customer data and is making credit decisions. How do you respond?"**

**Interviewer's Intent:**
Tests judgment under a real governance failure — whether you use the situation punitively or constructively, whether you understand the difference between compliance and compliance culture, and whether you can manage the legal, ethical, and political dimensions simultaneously.

**Thinking Approach:**

- First move is assessment of harm, not assessment of blame
- Involve Legal and CISO before escalating to leadership
- Don't destroy the relationship with the business unit — you need them to be honest with you about future shadow AI

**Model Answer:**

"My very first move is to assess the actual risk to customers and the business — not to initiate a governance process. There's a credit decision system that's been running for six months with no oversight. The first question is: has it caused harm? Has it made decisions that were discriminatory, inaccurate, or that violated consumer protection law? I need the answer to that before anything else, because if the answer is yes, I have legal notification obligations that override everything else I might want to do.

I'd loop in Legal and the CISO that day — not to escalate the governance failure, but because they need to assess exposure. Then I'd engage with the business unit leader directly and privately, not in a group setting that puts them on the defensive.

The conversation I'd have with that leader is not 'you violated the governance process.' It's 'I need to understand what's running here, because if there's a problem I want to help you fix it before it becomes a regulatory issue.' That conversation surfaces a lot more truth than a formal audit does.

In parallel, I'd run a rapid risk assessment on the system: data handling, model accuracy, decision audit trail, customer impact. The goal is to either confirm the system is operating safely — in which case we formalise it quickly through an expedited review — or to identify what needs to be remediated.

What I would not do is immediately shut it down unless there's active harm. A disruptive shutdown creates an adversarial business unit that goes underground even deeper next time. I'd remediate while operating, document the exception, get it through a retrospective governance review, and use the case — anonymised — to improve the governance process so the next team doesn't find the path of least resistance runs around the AARB.

The systemic question is why the governance process was so unattractive that a team built a mission-critical system outside it for six months. That's the thing I'd change."

---

### Question 5

**"Your AI Architecture Review Board is seen as a bottleneck. Business leaders are going around it and deploying AI directly. What went wrong and how do you fix it?"**

**Interviewer's Intent:**
Tests whether you treat governance as a service or as control — and whether you can diagnose your own failure.

**Thinking Approach:**

- Own the failure before diagnosing it
- The answer is almost never "people need to follow the process better"
- Governance that gets bypassed is poorly designed governance

**Model Answer:**

"If teams are routing around the AARB, the AARB is broken. Full stop. That's not a people problem — it's an architecture problem, and the architecture I designed is failing.

I'd start with a genuine diagnostic. Not a survey — actual conversations with the teams who bypassed the process. 'What made the AARB feel like the wrong path? What would have made it the right path?' Those conversations are humbling but they're the only honest data I have.

The reasons I've seen boards become bottlenecks fall into a few categories. The review process takes too long — if it takes six weeks and the team is on a two-week sprint cycle, you've designed an incompatible system. The decisions are unpredictable — teams don't know what will pass and what won't, so they'd rather not ask. The board feels like a tribunal rather than a design partner — nobody wants to submit to something that feels adversarial.

The fixes are specific to the diagnosis. If it's speed, I'd introduce a tiered review model: low-risk use cases can self-certify against a checklist in a day, medium-risk get a 48-hour lightweight review, only high-risk cases go to the full board. If it's unpredictability, I'd publish clear decision criteria and run a library of approved patterns that teams can implement without review. If it's culture, I'd restructure the board to include business unit representatives and make the EA's role facilitative rather than judicial.

I'd also create a genuine 'fast lane' for business units that have demonstrated mature AI practices. Earned trust should reduce governance friction — that's the incentive for building good practices.

The measure of success isn't 'everyone goes through the AARB.' It's 'AI systems are safe and the organisation trusts the governance enough to be honest about what they're building.' Those are different things."

---

### Question 6

**"A senior data scientist argues that your AI governance process is stifling innovation and that your competitors are moving faster because they don't have your bureaucracy. How do you respond?"**

**Interviewer's Intent:**
Tests whether you can engage on substance under pressure, whether you understand the innovation-governance tension at a sophisticated level, and whether you have data to back your position.

**Thinking Approach:**

- Don't be defensive — engage the argument seriously
- Have the data: what do competitors actually do? What does research show about fast-versus-safe AI?
- Distinguish between governance that enables and governance that controls

**Model Answer:**

"I'd take that challenge seriously rather than dismiss it, because it's partly right. Badly designed governance does stifle innovation. If my process feels bureaucratic, I need to know that.

I'd start by asking them to be specific. Which part of our process created friction that a real competitor doesn't face? Because in my experience, what looks like a competitor moving faster without governance is usually one of three things: they're a smaller company where the CISO is also the CTO and reviews happen over coffee; they're accepting risks that haven't materialised yet; or they have mature, embedded practices that look invisible from the outside because they're so well-designed.

I'd also engage on the evidence. The companies that moved fastest with AI in 2023–2024 without governance are now managing regulatory investigations, customer trust crises, or model failures in production. I can name specific public cases. Speed without governance isn't actually faster when you measure the full cycle including the recovery.

But I'd also be honest: some of our governance is slower than it needs to be, and I'd invite them to help fix it. The data scientist who's frustrated with my process understands it from the inside in a way I don't. That perspective is valuable. I'd rather have them in the room helping me redesign it than building systems outside it.

What I'd close with is this: the goal was never governance for its own sake. The goal is that we ship AI systems that work, that don't blow up in production, and that we can defend to a regulator, a customer, or a board. If my process isn't achieving that efficiently, that's my problem to solve."

---

## SECTION 3: Agent Systems & AI Architecture

---

### Question 7

**"You're asked to architect a multi-agent system for your company's finance operations — one that can autonomously process invoices, flag anomalies, initiate payment workflows, and escalate edge cases to humans. What are the five most important architectural decisions you'd make and why?"**

**Interviewer's Intent:**
Tests whether you have genuine depth in agentic system design — not just conceptual familiarity, but the judgment that comes from thinking through failure modes, trust boundaries, and operational realities.

**Thinking Approach:**

- Go deep on each decision — don't list five surface-level choices
- Show the reasoning behind each, including what you're trading off
- Bring in real operational and security considerations

**Model Answer:**

"I'd anchor on five decisions that I consider foundational:

**First: Trust and authority boundaries for each agent.** I'd design a strict capability tiering system. The invoice processing agent can read and classify documents. The anomaly detection agent can read processed data and flag — it cannot write. The payment initiation agent can create payment drafts — it cannot approve or execute. Only a human-in-the-loop step can move from draft to execution above a defined threshold. The reason this matters: in finance automation, the blast radius of an over-permissioned agent is enormous and potentially irreversible. I'd rather have a slower but safer permission model than discover what happens when an agent initiates a $2M payment in error.

**Second: The orchestration pattern.** I'd use a hierarchical orchestrator-subagent model with a stateful orchestrator that maintains the full context of each invoice's journey through the system. I'd explicitly reject a peer-to-peer mesh here — too hard to audit, too hard to debug when something goes wrong. The orchestrator becomes the single source of truth for 'what is the current state of this invoice?' and every audit trail flows through it.

**Third: Human escalation trigger design.** This is where most agentic system designs are weakest. I'd define escalation triggers with explicit criteria: any invoice above $X, any vendor not seen in the last 12 months, any anomaly score above threshold Y, any payment that would change vendor banking details. The escalation must carry full context — the human reviewer should be able to make a decision in under two minutes because the agent has packaged everything they need. Bad escalation design is when the human has to go back to the source system to understand the situation.

**Fourth: Idempotency and failure recovery.** Every agent action must be safe to retry. Payment initiation especially needs idempotency keys — we cannot allow a retry to generate a duplicate payment. I'd design the workflow engine with explicit checkpointing so any failure can resume from the last successful state rather than restarting from scratch.

**Fifth: Observability and anomaly detection on the agents themselves.** I'd build a monitoring layer that treats the agents' own behaviour as a signal. If the invoice classification agent suddenly starts classifying 40% of invoices as anomalies when the baseline is 3%, something has changed — either the model has drifted, the input data has changed, or someone is trying to manipulate the system. The agents need to be watched as carefully as the transactions they process."

---

### Question 8

**"An AI agent you deployed 3 months ago has started behaving unexpectedly — it's approving requests it should be escalating and the business hasn't noticed because volumes are high. You discover this via a routine audit. What do you do in the next 24 hours?"**

**Interviewer's Intent:**
Tests incident response instinct, accountability under pressure, and the operational maturity to act decisively while preserving the information needed to understand what happened.

**Thinking Approach:**

- First move is always: stop the bleeding, preserve evidence
- Don't rush to root cause before containment
- Communicate proactively — don't let stakeholders find out from someone else

**Model Answer:**

"In the first hour: I'm calling the engineering lead, the business owner of the process, and the CISO. Simultaneously — not sequentially. The agent goes into reduced operation mode immediately — I'd route its outputs to a review queue rather than letting them execute automatically while I understand the scope of the problem. I would not shut it down cold if I can avoid it, because cold shutdowns destroy the in-flight state I need to understand what happened.

The second thing I'm doing in that first hour is evidence preservation. I need the logs of every decision the agent made in the past 90 days — specifically the decisions that should have been escalations. I need those logs frozen before anyone touches the system. Evidence that gets overwritten cannot be recovered.

In hours two through six, I'm doing a rapid scope assessment with the engineering team. How many decisions are affected? What is the business impact of the mis-approvals? Are any of them financially material, legally exposed, or reputationally sensitive? I can't communicate to leadership until I can give them some sense of the scale.

By hour six, I'm briefing the business owner and the executive sponsor with three things: what happened, what the scope appears to be, and what I'm doing about it. I'm not going to have root cause at this point and I'd say so explicitly. Speculation is worse than honest uncertainty.

The root cause investigation runs in parallel. My working hypotheses would be: model drift since deployment, a prompt or configuration change that had unintended consequences, or a change in the input data distribution that the agent wasn't designed to handle. Each of those has a different fix.

What I would not do is quietly remediate and not tell anyone. Even if the business impact is small, a governance failure of this kind needs to be disclosed and documented. The post-incident review becomes the most valuable learning artifact — it's what prevents this from happening to the next agent we deploy."

---

## SECTION 4: Stakeholder & Organisational Dynamics

---

### Question 9

**"The CISO and the Chief Digital Officer are in open conflict over AI deployment pace. The CISO wants a 6-month security review for every AI initiative. The CDO says that would kill the programme. You're in the middle. What do you do?"**

**Interviewer's Intent:**
Tests political navigation at the C-suite level, ability to resolve structural conflicts without taking sides, and whether you understand that this is as much an organisational design problem as a technical one.

**Thinking Approach:**

- Don't side with either — find the underlying shared interest
- The conflict is usually about risk tolerance, not about the specific policy
- Propose a structural solution, not a political compromise

**Model Answer:**

"The first thing I'd resist is being the person who takes this to the CEO as a dispute to be arbitrated. That makes one of them a winner and one a loser, and the loser makes my life difficult for the next two years.

Instead, I'd request a conversation with both of them together and I'd come with a reframe. The real question is not 'how long should reviews take?' The real question is 'what level of risk is acceptable for which category of AI initiative?' The CISO and CDO actually agree more than they think — neither of them wants a catastrophic AI failure. They're just calibrated differently on where the line is.

So I'd propose a risk-tiered review framework and walk them both through it. Low-risk initiatives — read-only, internal, no PII, human reviews all outputs — get a 48-hour lightweight review. Medium-risk initiatives get a structured two-week review. High-risk initiatives get the full security deep-dive, however long it needs to take, because the cost of getting those wrong is genuinely high.

The CISO's six-month timeline is probably appropriate for the high-risk tier. The CDO's urgency is appropriate for the low and medium tiers. The framework resolves the conflict by giving each of them what they actually need: security rigour where it matters, speed where it's safe.

I'd then offer to jointly own the framework with both of them — it's not an EA document, it's a jointly published standard from Security, Digital, and Architecture. That changes the political dynamic entirely. They both get credit, and they both have an incentive to make it work.

The thing I'd flag honestly to both of them is that the framework only works if use cases are classified accurately and honestly. If everything gets classified as low-risk to skip the review, the security posture collapses. I'd propose a quarterly audit that both of them review together. Shared accountability for the outcome."

---

### Question 10

**"A business unit leader comes to you privately and says their team has built a fantastic AI system but they're afraid to bring it to the AARB because 'EA always kills our ideas.' How do you respond in that conversation?"**

**Interviewer's Intent:**
Tests self-awareness — whether you can hear critical feedback about your own practice and respond constructively. Also tests relationship skills and whether you can turn a complaint into a productive engagement.

**Thinking Approach:**

- Listen before defending
- This is the most valuable feedback you could receive
- Use this as an opportunity to understand the real experience, not to counter-argue

**Model Answer:**

"I would listen, and I'd make sure they felt genuinely heard before I said anything in response. This is someone taking a real risk by telling me this privately — they're trusting me with something uncomfortable. If I immediately defend the AARB process, I close the conversation and lose the intelligence.

So I'd ask them to tell me more. Specifically — what happened in past AARB interactions that created this fear? Was it a specific decision? The tone of the review? The time it took? The feedback they received? I need to understand exactly what the experience has been, not what I think it's been.

Then I'd be honest. I'd say something like: 'If that's the experience your team has had, that's a problem I need to fix. The AARB is supposed to help you ship safely — if it's instead making you afraid to surface what you're building, it's failing at its core purpose.'

Then I'd offer them something concrete: 'Before you submit anything formally, let's walk through what you've built together — just you and me. I'll give you an honest read on where I see risks and what would strengthen the submission. You decide how to proceed from there.' That conversation costs me an hour and it builds more trust than twelve formal reviews.

The longer-term implication of what they've told me is that I have a reputation problem — probably justified — that I need to address systematically. I'd take that back to the team and look at every AARB decision in the past year. Are we generating more 'no' decisions than the risk profile of our initiatives warrants? Are our conditions for approval clear and actionable? Are we giving genuine partnership in the review, or are we conducting audits? The answer to those questions would shape the reform."

---

### Question 11

**"You've inherited an EA team that is technically excellent but has no credibility with the business. They're seen as people who produce diagrams no one reads and slow down projects. How do you turn this around in your first year?"**

**Interviewer's Intent:**
Tests leadership and change management ability, and whether you understand that technical quality is necessary but not sufficient for EA relevance.

**Thinking Approach:**

- The problem is not technical — it's relational and cultural
- Quick wins matter enormously for rebuilding trust
- The team needs to see themselves differently, not just be directed differently

**Model Answer:**

"The first thing I'd do is stop producing diagrams that nobody asked for. If the output of the EA practice is documents that get filed without being read, the practice has become self-referential. It's producing for itself, not for the business.

I'd spend the first month embedded with the business — not in EA meetings, not in architecture reviews, in business unit conversations. What are the three problems they're trying to solve that they're not solving well? What are the decisions they're making slowly because they don't have the right technical input? Those are the entry points for demonstrating value.

With the team, I'd have an honest conversation. 'We are technically excellent and organisationally invisible. That's not a comfortable place, and I'm not going to pretend it is. Our goal for the next 12 months is to be the team that a business leader calls when they have a hard problem — not because they have to, but because they trust us to help.' That's a different identity, and some people will need time to grow into it.

I'd restructure how we engage. EA team members would be assigned as embedded partners to specific business units — one person, one unit, real relationship, real accountability for that unit's outcomes. The partner's success metric is not 'did we complete the architecture review' — it's 'did the business unit ship successfully and safely?'

The first visible win is everything. I'd identify the most impactful AI initiative in flight and put EA support behind it without being asked. Not governance — help. What does this team need that EA could provide? Technical design review, vendor evaluation, integration advice, whatever it is. When that initiative succeeds and the business unit leader credits the EA team publicly, the credibility conversation starts to shift.

By month six, the measure of progress is whether business units are coming to us before they've decided something, not after. That's the signal that we've shifted from being a speed bump to being a thinking partner."

---

## SECTION 5: Technology Decisions & Trade-offs

---

### Question 12

**"Your organisation is considering a major platform bet — either building a proprietary LLM infrastructure or standardising on a hyperscaler's AI platform. Each approach has strong advocates internally. How do you make this decision?"**

**Interviewer's Intent:**
Tests structured decision-making, ability to manage competing internal advocates, and strategic technology thinking at the platform level.

**Thinking Approach:**

- This is a classic build-vs-buy decision with AI-specific dimensions
- Show that you evaluate across multiple dimensions, not just technical capability
- The political dimension — managing internal advocates — is as important as the technical one

**Model Answer:**

"I've made this decision, or versions of it, multiple times, and the biggest mistake I see is letting the technical teams drive it on technical merit alone. This is a strategic bet with a 5-10 year horizon. It needs to be made on strategic criteria, not benchmark performance.

The dimensions I'd evaluate are: competitive differentiation, total cost of ownership over 5 years, talent requirements and availability, vendor risk and lock-in, regulatory implications for our specific sector, and time to value. Technical performance is important but it's rarely the deciding factor at this level.

In my experience, building proprietary LLM infrastructure is justified in a narrow set of conditions: you have a genuinely unique data asset that gives you a model advantage no vendor could replicate; you have regulatory requirements that preclude third-party inference; or AI is so central to your product that your competitive position depends on model capability that's ahead of the market. Most enterprises don't meet any of these criteria.

For the hyperscaler platform, the risk question is lock-in and pace dependency — you're betting that the hyperscaler's roadmap will meet your needs. The strategic hedge I'd build in is portability: design your applications against a model abstraction layer, not directly against the hyperscaler's API. That way you can migrate if the relationship changes.

For the internal advocates, I'd run a structured decision process — not a debate. I'd set evaluation criteria with both groups in the room before either group presents their case. When the criteria are agreed upon, the decision is mostly made. The group that's advocating for the losing option will accept the outcome far more readily if they felt the criteria were fair.

I'd also be honest about the time horizon: 'We're going to make the best decision we can with the information available today. We're going to set a review point in 18 months and we're going to be willing to change course if the evidence changes.' That defuses the winner-loser dynamic."

---

### Question 13

**"You've been asked to define the data architecture for an enterprise RAG system that will be used by 5,000 employees across legal, finance, HR, and customer service — each with different data sensitivity requirements. What are the three hardest problems and how do you solve them?"**

**Interviewer's Intent:**
Tests genuine depth in RAG system design, understanding of access control complexity, and ability to identify real problems rather than theoretical ones.

**Thinking Approach:**

- Don't describe a generic RAG architecture — identify what's specifically hard about this scenario
- Show that you think about operational and governance challenges, not just the happy path

**Model Answer:**

"The three hardest problems in this specific scenario are access-scoped retrieval, knowledge quality at scale, and attribution and audit.

**Access-scoped retrieval** is the one that breaks most RAG designs. Five thousand users across four departments with different sensitivity classifications means a user in customer service should never see legal privilege documents, and an HR business partner should never see another employee's performance data. The naive implementation — one vector index, one search — fails here catastrophically. A relevance search doesn't respect data classification.

The solution I'd implement is partition-based retrieval with user-scoped metadata filters enforced at query time. Documents in the vector store carry their access classification as metadata, and every retrieval query is automatically filtered by the requesting user's authorised classifications before the semantic search runs. The filter is not optional and not handled by the application layer — it's enforced at the retrieval infrastructure level. I'd validate this with a penetration test specifically designed to extract documents outside a user's access tier.

**Knowledge quality at scale** is the second hard problem. With 5,000 users consuming answers, the RAG system will be trusted in proportion to its accuracy. Bad answers in finance or legal aren't just embarrassing — they're materially harmful. And at enterprise scale, you will inevitably have outdated documents, contradictory policies, and documents that were authoritative but have since been superseded.

I'd solve this with three mechanisms: a mandatory metadata field on every ingested document for expiry or review date, which triggers automatic de-indexing; a document owner registry so every document has a human responsible for its accuracy; and a user feedback loop — when a user marks an answer as wrong, that signals a review of the source documents. The retrieval quality is only as good as the curation discipline.

**Attribution and audit** is the third, and it's the one that most architects underweight until there's a legal incident. When an employee makes a decision based on what the RAG system told them, and that decision turns out to be based on an incorrect or outdated document, you need to be able to reconstruct exactly what the system said, what it retrieved, and what the source was. That's not just good practice — in legal and HR contexts, it's potentially a legal requirement.

Every response must log: the query, the retrieved chunks and their source document identifiers, the generated response, the user, and the timestamp. That log must be retained for the appropriate regulatory period for each department and must be queryable for legal discovery."

---

## SECTION 6: Integration & Legacy Modernisation

---

### Question 14

**"You're tasked with integrating AI capabilities into a 25-year-old core banking system that was never designed for APIs, runs on-premise on COBOL, and cannot be touched for fear of disruption. How do you approach this?"**

**Interviewer's Intent:**
Tests legacy modernisation experience, pragmatic problem-solving, and the ability to create value in constrained environments — a very common real-world scenario.

**Thinking Approach:**

- Show that you don't need greenfield conditions to make progress
- The strangler fig pattern and event-driven extraction are your friends here
- Risk management around the legacy system is as important as the technical approach

**Model Answer:**

"I've worked in exactly this environment — the first rule is: do not touch the core. Any architecture that requires changes to 25-year-old COBOL in a production banking system is an architecture that's one change away from a multi-day outage. The core banking system is load-bearing structure. You build around it, not into it.

The approach I'd use is an event extraction and thin API layer pattern. Modern banking cores, even old ones, produce events — end-of-day batch files, transaction logs, account state files. I'd work with the COBOL team to identify every data output the system produces and build a controlled extraction layer that reads those outputs and publishes structured events to a modern data bus. That's the interface. The COBOL system never knows AI exists.

From there, AI capabilities can work on the extracted data. A transaction anomaly detection model works on the event stream. A customer insight system reads account balances and transaction patterns. A regulatory reporting AI works on the structured data extract. None of these touch the core.

For use cases that require feeding information back to the core — which is harder — I'd build a staging layer. AI-generated recommendations go into a human review queue. A human validates the recommendation and executes it in the core through the existing user interface. That's slower, but it's the appropriate risk model for a system you cannot afford to disrupt.

The architecture decision I'd make explicit and document is the maximum data latency acceptable for AI use cases. If the core produces daily batch files, your AI insights are 24 hours behind real time. Some use cases can tolerate that — customer analytics, for example. Others cannot — real-time fraud detection requires event stream access, which means either a modern event connector or a different approach. That's a business decision, not a technical one, and it should be made explicitly.

What I'd never promise is that this is simple. It requires deep knowledge of the legacy system, patience with the COBOL team's constraints, and acceptance that you're not building a modern architecture — you're building the best possible modern architecture around an immovable object."

---

## SECTION 7: People, Culture & Ethics

---

### Question 15

**"An AI system your team approved is later found to have been producing biased outputs that disadvantaged a protected group in hiring decisions over 18 months. You didn't design the bias in — it emerged from training data. How do you handle this, and what does it change about how you work going forward?"**

**Interviewer's Intent:**
Tests ethical maturity, accountability, and whether you have genuine learning responses to failure versus defensive ones. One of the most important questions at this seniority level.

**Thinking Approach:**

- Take real responsibility — not performative responsibility
- Show that you understand the human cost, not just the technical failure
- Demonstrate systemic change, not just process-level fix

**Model Answer:**

"The first thing I want to say is that 'we didn't design the bias in' is not exculpation. We approved a system that was making consequential decisions about people's employment without adequate bias evaluation. That's on us.

The immediate response has to be simultaneous on three tracks. Legal and compliance need to be involved immediately because there are likely regulatory notification obligations under employment law — and depending on the jurisdiction, we may be in a situation that requires proactive disclosure to affected candidates. Second, the system goes offline or into human-review-only mode immediately — no more automated decisions until we understand the scope. Third, I'd commission an independent audit of every decision the system made in the 18-month period. Not an internal audit — an independent one, because internal audits of our own failures don't carry the credibility this situation needs.

The human cost of this is real and I wouldn't want it lost in the process conversation. People may have been incorrectly rejected from jobs. Where those individuals can be identified and where the decision was influenced by the bias, we owe them something — at minimum an honest account of what happened, and potentially a re-evaluation of their applications.

What changes in how I work: First, bias evaluation becomes a hard gate, not a soft review, for any system that touches decisions about people. I'd establish a minimum testing protocol — evaluation on demographic subgroups, evaluation on adversarial examples, an independent red team assessment before any employment, credit, or medical AI goes to production. Second, the monitoring after deployment needs to include fairness metrics, not just accuracy metrics. A system can be accurate on average and deeply unfair to a subgroup — those are different things and I wasn't measuring them. Third, I'd bring in external expertise. EA teams are not always equipped to detect subtle statistical bias, and the cost of getting that wrong is too high to rely on internal capability alone.

The hardest part of this to sit with is that a well-designed review process might have caught this. That's the honest assessment. It changes how seriously I take bias evaluation from a compliance exercise to a genuine ethical obligation."

---

### Question 16

**"Your organisation is considering using AI to significantly automate a function currently performed by 200 employees. The business case is compelling. You've been asked to architect it. How do you think about your role in this decision?"**

**Interviewer's Intent:**
Tests ethical depth on a genuinely difficult question — whether the EA has a view on their responsibility when the architecture they design has significant human consequences.

**Thinking Approach:**

- This is not a technical question — it's an ethical one with a technical dimension
- Show that you engage with the human dimension seriously, not perfunctorily
- Demonstrate that you have a view, but that you hold it in the right place

**Model Answer:**

"I think about this carefully every time it comes up, because I don't believe enterprise architects are value-neutral instruments. We have agency in what we design and how we design it.

My role in this decision is not to make the strategic call — that's a business and board decision, and it should be. But I do think I have a responsibility before I architect anything to ensure the decision was made with full information and genuine consideration of the human impact. In practice that means I'd want to see evidence that the redeployment and transition plan for the 200 employees is real and resourced — not a platitude in a business case, but a funded programme with an owner and a timeline. If that doesn't exist, I'd raise it explicitly before I design anything.

In the architecture itself, I'd advocate for a phased approach. Automation that starts with augmentation — AI-assisted human work — rather than full replacement allows the organisation to learn what the AI does well and poorly before it's bearing the full load. It also gives the workforce time to adapt and retrain. Systems designed this way also tend to be more reliable because humans catch the AI's edge cases during the transition period.

I'd also design for reversibility where possible. If the automation proves less reliable than the business case projected, can we scale back? Systems that are designed as 'all or nothing' are much more dangerous than systems with genuine flexibility.

What I won't do is pretend this is purely a technical problem or that my role ends at delivery. If I believe the decision has been made without adequate consideration of the people affected, I'll say so — once, clearly, to the right person. After that, if the decision stands, I'll execute it as responsibly as I can. But I won't stay silent in the design phase because I thought it wasn't my place."

---

## SECTION 8: Failure, Learning & Self-Knowledge

---

### Question 17

**"Tell me about the most significant architectural decision you've made in your career that turned out to be wrong. Not a small mistake — a real one. What happened and what did it teach you?"**

**Interviewer's Intent:**
Tests honesty and self-awareness above everything else. Also tests the quality of learning derived from failure. Candidates who can't answer this haven't done enough hard things. Candidates who give a "strength disguised as a weakness" answer have low self-awareness.

**Thinking Approach:**

- This must be a real failure, not a polished anecdote
- The learning must be specific and have changed how you actually work
- Don't underdo it and don't overdramatise it

**Model Answer (example structure — personalise with your own failure):**

"There's one I come back to often. Early in my career as a senior architect — about 15 years ago — I pushed hard for a service-oriented architecture transformation at a large insurer. I had a technically elegant blueprint. I had executive sponsorship. I had data on why the monolith was failing us.

What I didn't have was a realistic assessment of our organisational capability to execute. We were asking business teams to adopt API thinking, asking operations to manage service dependencies, and asking developers to build against interfaces rather than shared code — simultaneously. The architecture was right. The transition path was wrong. We were two years in, $30M spent, and we had a fragmented system that combined the worst of both worlds: a partially decomposed monolith that wasn't stable and a set of services that weren't yet capable of standing alone.

We recovered — the programme eventually delivered value — but not before a painful 18-month period of stabilisation that cost credibility, money, and some genuinely good people who burned out trying to make it work.

What it taught me was that architecture is not a plan for a system. It's a plan for the transition from here to there, and the transition is harder than the destination. I now spend as much time on the transformation architecture — the change plan, the capability development, the intermediate states — as I do on the target architecture. I also require myself to be honest about organisational readiness before I commit to a timeline. If the organisation isn't ready to execute the plan I'm recommending, the plan needs to be different.

The other thing it taught me: be more humble about the cost of being right about the destination while being wrong about the journey."

---

### Question 18

**"AI is evolving faster than any governance framework can keep pace with. How do you prevent your architecture standards from becoming obsolete while still providing stability and direction to the organisation?"**

**Interviewer's Intent:**
Tests adaptive governance thinking — whether you can design frameworks that are durable without being rigid. A critical capability for the AI era.

**Thinking Approach:**

- The answer is principles-based governance, not rules-based governance
- Show that you understand the difference and have applied it
- Demonstrate a concrete mechanism for staying current

**Model Answer:**

"The trap in governance is conflating the principle with the implementation. Principles age slowly. Implementations age fast.

The governance I try to design has a thin layer of durable principles — things like 'every AI system that makes consequential decisions must have a human in the loop,' 'all agent actions must be auditable,' 'sensitive data stays within its classification boundary' — and a thicker, faster-moving layer of implementation standards that tell teams how to achieve those principles with current technology. The principles should be true five years from now. The implementation standards should be reviewed every six months.

Concretely, I'd structure the standards library with explicit review dates on every document. Anything older than 12 months gets a mandatory re-evaluation — not necessarily a rewrite, but a deliberate confirmation that it still reflects current practice. I'd also create a fast-path amendment process: when a significant technology change invalidates an existing standard, we need to be able to issue updated guidance in weeks, not months.

I'd also build an early warning intelligence practice. My job is to be 6–12 months ahead of the organisation in understanding where technology is going. That means I'm reading research papers, attending conferences, talking to peer architects at other companies, and talking to vendors — not to buy their story but to understand what's coming. When I see MCP becoming the standard for agent tool interop, I need to be developing guidance on it before teams are building on it ad hoc.

The most important behaviour change I made was separating 'approved' from 'required.' Most of my standards library says 'approved patterns' — here are the ways we've validated to solve this problem. Teams that want to use something not on the list don't need to get a waiver — they run a quick review with EA and if it passes our safety criteria, it gets added to the approved list. That makes the standards library a living thing, not a constraint."

---

## SECTION 9: Vision & Forward Thinking

---

### Question 19

**"Where do you think enterprise architecture as a discipline will be in 5 years, and what does that mean for the skills you're developing today?"**

**Interviewer's Intent:**
Tests forward-thinking, self-awareness about the discipline's evolution, and whether the candidate has a genuine intellectual engagement with where things are going — not just what they've mastered.

**Thinking Approach:**

- Be specific and directional — not vague or diplomatic
- Show that you have a real view, even if it's not comfortable
- Connect it to your own development honestly

**Model Answer:**

"I think enterprise architecture in five years looks substantially different from today, and I think some of that difference is uncomfortable for people who've built their careers on traditional EA practice.

The biggest shift I see is that a large portion of what EAs currently do — producing architecture diagrams, writing standards documents, running review processes — will be automated or AI-assisted. The production work will be cheaper and faster. That means the value of the EA role will concentrate in the things AI can't do: judgment, ethical reasoning, organisational navigation, and design of the governance systems themselves.

I also think the boundary between enterprise architecture and AI governance will become nearly invisible. Every significant architectural decision in five years will have an AI dimension — model selection, agent design, data architecture for AI. The EA who doesn't have genuine fluency in AI systems design will be operating at a severe disadvantage.

What I think survives and grows in value is what I'd call 'contextual wisdom' — the ability to understand how technology decisions play out in specific organisational and regulatory and cultural contexts. That's the thing that takes 20 years to develop and that AI genuinely cannot replicate.

For my own development: I'm spending time now on things that will be table stakes in three years. Agentic system design. LLMOps. The EU AI Act and global AI regulation. I'm also deliberately working on the things that will become even more differentiating — the facilitation skills, the ethical reasoning, the ability to communicate complex AI risk to a board. Those are skills I'm investing in knowing they won't be automated.

The EAs who struggle in five years will be the ones who doubled down on the production artifacts — the ones who became very good at drawing diagrams. The ones who thrive will be the ones who made themselves indispensable in the spaces where human judgment is irreplaceable."

---

### Question 20

**"You have been in enterprise architecture for 20 years. What do you know now that you wish you had known at year five — and what would you tell a talented architect who's 10 years into their career?"**

**Interviewer's Intent:**
Tests wisdom distillation, mentorship instinct, and genuine reflection on a long career. This question separates people who've had 20 years of experience from those who've had one year of experience 20 times.

**Thinking Approach:**

- Be honest and personal — platitudes don't work here
- Show the specific ways your thinking has evolved
- The advice to the 10-year person should be genuinely useful, not generic

**Model Answer:**

"The thing I wish I'd known at year five is that being right is the smallest part of the job. I spent the first decade of my career working hard to be right — to have the correct technical answer, to have the best framework, to win the architectural argument. I was right a lot. I also accomplished less than I could have, because I didn't understand that being right and being effective are completely different skills.

The architects who actually change organisations are rarely the ones with the most correct opinions. They're the ones who bring people with them. That's about relationship, trust, patience, and the willingness to let others have some ownership of the answer — even when you know a better one. I learned that slowly and somewhat painfully.

The second thing I wish I'd known is that the failures are the education. I was too afraid of being wrong for too long. I structured my recommendations to minimise the chance of a visible failure. That's also what makes an architect mediocre — because the bets that change organisations are uncomfortable and uncertain. The scar tissue from the decisions that didn't work out is where the real judgment comes from. I should have taken more risks earlier.

For a talented architect ten years in: I'd tell them to go find a mentor outside their current organisation and outside their current industry. Your organisation's problems will start to look universal if you only ever solve them inside one organisation. The perspective of someone who's solved the same class of problems in a different context — different culture, different regulatory environment, different scale — is enormously valuable and most people never invest in finding it.

I'd also tell them to invest in the human skills now — not later. Every architect I know who reached significant influence did so because they became someone that senior leaders trusted with hard problems. That trust is built on a combination of technical credibility and human reliability. The technical credibility you have. The human reliability — the consistency, the honesty, the ability to navigate political complexity with integrity — that's the investment of the next decade."

---

### Question 21 (Bonus)

**"You're presenting your AI architecture strategy to the board. Halfway through, the board chair interrupts and says 'this all sounds very theoretical. Our competitor launched an AI product last week. Why aren't we doing that?' How do you respond in the room?"**

**Interviewer's Intent:**
Tests composure under pressure, ability to pivot without losing the thread, executive-level communication, and whether you can distinguish between a real challenge and a performance of impatience.

**Thinking Approach:**

- Do not get defensive
- Acknowledge the urgency before addressing the substance
- Come back to what they actually need: confidence that you're moving and that you're managing risk

**Model Answer:**

"I'd pause for two seconds, and I'd say: 'That's exactly the right challenge to raise. Let me answer it directly.'

Then I'd address it in two moves.

First, I'd validate the urgency. 'You're right that we're watching the same competitive move. Our team has already assessed it. Here's what they launched, here's what we know about how it works, and here's what it means for us.' That shows I'm paying attention to the market, not living in an architecture ivory tower.

Second, I'd reframe the question. 'The difference between what they launched and what we're about to launch is three things: ours will be built on our customer data, which they don't have access to; ours will be compliant with the regulatory requirements that apply to our sector; and ours will have the audit trail that our institutional clients require. They moved fast. We're moving smart. The difference shows up in 18 months when they're managing a regulatory inquiry and we're not.'

Then I'd close the loop on timing specifically: 'Our first production deployment is eight weeks from today. Here's the milestone.' Boards don't want to hear 'we're being careful.' They want to hear 'here's the date and here's what it delivers.'

What I would not do is try to finish the presentation as though the interruption didn't happen. When a board chair interrupts, the presentation is over. The conversation is what matters now. I'd put the slides aside and engage directly.

After the meeting, I'd follow up with a one-page competitive summary. That's what they actually asked for, and giving it to them promptly and concisely does more to build EA credibility than the presentation I was delivering."

---

## Appendix: Evaluation Rubric for Interviewers

When evaluating a 20-year EA's responses, assess against these dimensions:

| Dimension | Underprepared (1-2) | Experienced (3-4) | Exceptional (5) |
| --- | --- | --- | --- |
| **Systemic Thinking** | Answers the question at face value | Sees second-order effects | Reframes the question to expose the real problem |
| **Stakeholder Intelligence** | Focuses on technical elements | Names stakeholder dynamics naturally | Designs the human system alongside the technical one |
| **Scar Tissue** | Answers from theory | Cites experience without vulnerability | Names specific failures and what genuinely changed |
| **Ethical Depth** | Treats ethics as compliance | Shows awareness of human impact | Has a personal ethical framework they can articulate |
| **Adaptability** | Defends their position under pressure | Adjusts when given new information | Distinguishes between conviction and stubbornness |
| **Forward Orientation** | Anchored in past practice | Aware of where things are going | Has a specific, opinionated view on the future and their development path |
| **Communication** | Clear but technical | Adapts to audience | The answer itself demonstrates executive communication quality |

---

*Document Version: 1.0*
*Audience: EA Candidates (20+ years), Interview Panels, Architecture Practice Leaders*
*Use: Interview preparation, interview design, EA capability assessment*
