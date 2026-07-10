---
title: "Module 1 — Enterprise Architecture Foundations"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-01-ea-foundations"]
---

# Module 1 — Enterprise Architecture Foundations

## Audience and Purpose

This module is for technical architects who have deep expertise in systems, platforms, and infrastructure but have never formally studied or practiced Enterprise Architecture as a discipline. You may have encountered EA in passing — attended an ARB meeting, reviewed an architecture standards document, or heard the term "TOGAF" without knowing exactly what it means — but you have not operated as an enterprise architect.

By the end of this module you will understand why EA exists, what it produces, how it governs technology decisions, and how to operate within and lead EA functions. More importantly, you will understand the conceptual vocabulary that enterprise architects use — because that vocabulary is the language of investment proposals, governance reviews, and executive briefings throughout the rest of this course.

!!! info "Why This Comes First"
    You cannot make credible enterprise AI investment proposals without understanding the governance and decision-making structures that evaluate them. EA is the institutional home of those structures. Understanding EA is not optional background — it is foundational architecture for everything that follows.

---

## WHY Enterprise Architecture Exists

### The Problem EA Solves

Imagine a large organization — 50,000 employees, 12 business divisions, operations in 40 countries — that has been investing in technology for 30 years. Each division bought the software it needed to solve its immediate problems. Each IT team built the integrations it required. Each generation of leadership made technology decisions that made sense at the time.

After 30 years, this organization likely has:

- 800 to 2,000 software applications across the enterprise
- Hundreds of point-to-point integrations between systems, many undocumented
- 12 different Customer Relationship Management (CRM) systems, one per division
- 7 different HR systems managing the same employee data with different formats
- 15 different vendor contracts for the same commodity capability
- No single authoritative view of what technology the organization owns and runs
- No ability to answer "what would it cost and how long would it take" to launch a new digital product

This is technology sprawl. It is the natural outcome of decentralized, short-term technology decision-making with no overarching coordination. Enterprise Architecture exists to prevent this from happening and to help organizations recover from it when it already has.

```
WITHOUT Enterprise Architecture          WITH Enterprise Architecture
─────────────────────────────────────    ──────────────────────────────────────
12 CRM systems (one per division)        1 CRM platform with division-specific
                                         configurations

800 undocumented point-to-point          Governed integration platform with
integrations                             documented APIs and service registry

Technology investment fragmented         Technology investment aligned to a
across 80+ budget owners                 portfolio with shared capabilities
                                         funded centrally

"What do we own?" takes 6 months         Application portfolio managed and
to answer                                updated quarterly

New product launch takes 18 months       Reusable architecture and shared
because every integration is             services reduce launch time to
built from scratch                       4–6 months
```

### The Business/IT Misalignment Problem

Beyond sprawl, EA also addresses a fundamental structural problem in most large organizations: the gap between business strategy and technology execution.

Business leaders make strategic decisions — enter a new market, launch a new product, acquire a competitor, reduce operational costs by 15% — without a reliable mechanism for translating those decisions into technology implications. Technology leaders, in turn, make technology decisions — adopt a new cloud platform, standardize on a middleware product, consolidate databases — without a reliable mechanism for connecting those decisions to business outcomes.

Enterprise Architecture is the discipline that creates and maintains that translation mechanism. It is the institutional function that bridges business strategy and technology execution.

!!! note "The Simple Definition"
    Enterprise Architecture is the ongoing practice of defining, communicating, and governing the relationship between an organization's strategy, its business capabilities, and its technology investments — ensuring that technology decisions support strategic objectives and are made in a coordinated, governed way.

---

## A History of Enterprise Architecture

Understanding where EA came from helps you understand what it is and why it takes the forms it does.

### Phase 1: Data Processing Departments (1950s–1970s)

In the early computing era, technology in organizations was housed in "data processing departments." The role was purely operational: run payroll, process transactions, produce reports. There was no concept of technology strategy — technology was a back-office cost center.

The architecture of this era was entirely technical: mainframe configurations, batch job schedules, tape backup procedures.

### Phase 2: IT Management and Information Engineering (1970s–1980s)

As computing became more widespread, organizations began recognizing that information was itself a strategic asset. James Martin's Information Engineering methodology (1981) introduced the idea of planning information systems at the enterprise level — modeling data flows, information needs, and system relationships across the whole organization before building individual systems.

This was the first time anyone asked: "What is the relationship between all our systems, and how should they be planned together?"

### Phase 3: The Zachman Framework (1987)

In 1987, John Zachman, an IBM marketing executive, published "A Framework for Information Systems Architecture" in IBM Systems Journal. This paper introduced what is now called the Zachman Framework — the first attempt to provide a formal structure for describing an enterprise from multiple perspectives and at multiple levels of abstraction.

The Zachman Framework organizes architectural descriptions along two axes:

**The communication columns (what, how, where, who, when, why):** What data does the organization use? How do processes work? Where are things located? Who does the work? When do things happen? Why do we do what we do?

**The stakeholder rows (executive, business management, architect, engineer, technician, enterprise):** Each row represents a different stakeholder's perspective, from the abstract strategic view of an executive to the concrete implementation view of a technician.

The insight was profound: a complete description of an enterprise requires multiple perspectives and multiple levels of abstraction. No single document captures everything. Architecture is a collection of views, each addressing different concerns.

!!! info "Zachman's Lasting Contribution"
    The Zachman Framework is not a methodology — it does not tell you how to do architecture. It is a classification scheme — a taxonomy of architectural artifacts. Its lasting value is the insight that architecture must address multiple concerns across multiple stakeholder perspectives. Almost every EA framework that followed built on this insight.

### Phase 4: Government and NIST Frameworks (1990s)

In 1992, the U.S. Government Accountability Office (then the General Accounting Office) began requiring federal agencies to adopt enterprise architecture practices. The Federal Enterprise Architecture Framework (FEAF) and the Department of Defense Architecture Framework (DoDAF) emerged from this requirement.

John Zachman's collaborator, Clinger-Cohen Act (1996) mandated that federal CIOs be accountable for IT investment management, further institutionalizing EA as a governance discipline.

This era established the precedent that large-scale technology investment requires architectural oversight — a principle that now underlies every Fortune 500 ARB and investment committee process.

### Phase 5: TOGAF and The Open Group (1995–present)

The Open Group Architecture Framework (TOGAF) was first published in 1995, derived from the U.S. Department of Defense's Technical Architecture Framework for Information Management (TAFIM). TOGAF has since become the most widely adopted enterprise architecture framework in the world, with over 100,000 certified practitioners globally.

TOGAF provides:
- A common vocabulary for enterprise architecture
- A methodology for doing EA work (the Architecture Development Method, or ADM)
- A content framework defining what artifacts EA produces
- A governance model for how EA decisions are made and enforced

### Phase 6: Strategy-Driving EA (2000s–present)

The early 2000s saw a shift in how leading organizations positioned EA. Gartner Research, McKinsey, and MIT Sloan Center for Information Systems Research (CISR) began publishing research showing that organizations with mature EA practices outperformed those without on key business metrics: time to market, cost efficiency, and strategic agility.

MIT CISR researchers Jeanne Ross, Peter Weill, and David Robertson published "Enterprise Architecture as Strategy" (2006), which argued that EA is not primarily a technical discipline — it is a strategic management discipline. Their operating model framework (which we cover in Module 2) directly linked architectural decisions to business outcomes.

The most recent evolution is the emergence of AI as an architecture domain in its own right. Since 2022, leading EA functions have added AI Architecture as a sixth domain alongside the traditional four (Business, Application, Data, Technology), plus Security Architecture. This course treats AI Architecture as a first-class domain.

---

## The Major EA Frameworks

### TOGAF: The Open Group Architecture Framework

TOGAF is the most relevant framework for most enterprise contexts. You do not need to be a certified TOGAF practitioner to use this course, but you do need to understand its core concepts.

**What TOGAF provides:**

```
TOGAF Component          Purpose
──────────────────────   ──────────────────────────────────────────────────
Architecture             The enterprise's collection of architectural
Repository               artifacts, patterns, standards, and decisions

Architecture             Standards and best practices an organization
Capability               follows when doing architecture work
Framework

Architecture             The core methodology (see ADM below)
Development Method
(ADM)

Content Framework        What artifacts EA produces — a catalog of
                         deliverables organized by type

Enterprise               The formal structures through which
Continuum                architecture artifacts are classified and reused

Architecture             How architectural decisions are governed,
Governance               enforced, and communicated
```

**The TOGAF ADM (Architecture Development Method):**

The ADM is TOGAF's core methodology — a cycle of phases that guides how an organization develops and evolves its enterprise architecture.

```
                    ┌─────────────────┐
                    │ Preliminary      │
                    │ (Framework &    │
                    │  Principles)    │
                    └────────┬────────┘
                             │
              ┌──────────────▼──────────────┐
              │        Phase A:              │
              │  Architecture Vision         │
              └──────────────┬──────────────┘
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼─────┐       ┌─────▼────┐       ┌─────▼────┐
    │ Phase B: │       │ Phase C: │       │ Phase D: │
    │ Business │       │Information│       │Technology│
    │ Arch.    │       │ Systems  │       │ Arch.    │
    └────┬─────┘       └─────┬────┘       └─────┬────┘
         └───────────────────┼───────────────────┘
                             │
              ┌──────────────▼──────────────┐
              │        Phase E:              │
              │  Opportunities & Solutions   │
              └──────────────┬──────────────┘
              ┌──────────────▼──────────────┐
              │        Phase F:              │
              │   Migration Planning         │
              └──────────────┬──────────────┘
              ┌──────────────▼──────────────┐
              │        Phase G:              │
              │ Implementation Governance    │
              └──────────────┬──────────────┘
              ┌──────────────▼──────────────┐
              │        Phase H:              │
              │   Architecture Change Mgmt   │
              └──────────────┘
                             ▲
                    Requirements Management
                    (continuous, all phases)
```

!!! tip "What the ADM Actually Means in Practice"
    Most organizations do not follow the ADM precisely. It is rarely a clean top-to-bottom progression. Think of it less as a process flowchart and more as a checklist of concerns that a complete EA program must address, in roughly this logical order. The ADM's value is in ensuring you have not skipped a critical concern — not in enforcing a rigid sequence.

### The Gartner Definition of EA

Gartner defines Enterprise Architecture as "the process of translating business vision and strategy into effective enterprise change by creating, communicating and improving the key requirements, principles, and models that describe the enterprise's current and future state, and enable its evolution."

The key word in Gartner's definition is **change**. For Gartner, EA is not a documentation exercise or an artifact library — it is a change management discipline. EA succeeds when the organization actually evolves in the direction the architecture prescribes.

### The Open Group Definition

The Open Group defines architecture as "the fundamental concepts or properties of a system in its environment, embodied in its elements, relationships, and in the principles of its design and evolution."

Applied to enterprises, this definition emphasizes:
- **Fundamental concepts**: the things that are durable and do not change with every technology trend
- **Environment**: the organization exists in a business and technology context that shapes its architecture
- **Relationships**: architecture is about how things relate, not just what they are
- **Principles of design and evolution**: the rules that guide future decisions, not just a snapshot of today

---

## Architecture Domains

Enterprise Architecture is organized into domains — each covering a distinct layer of the enterprise's architecture. Understanding what each domain covers, what it produces, and who owns it is essential vocabulary for this course.

### Domain 1: Business Architecture

**What it covers:** The structure of the business itself — how value is created, how the organization is structured, what capabilities it needs to execute its strategy.

**Why it matters:** Every technology investment exists to support a business capability. If you cannot describe the business architecture, you cannot make a credible technology investment case.

**Key deliverables:**

| Deliverable | Description |
|---|---|
| Business Capability Map | An inventory of what the business needs to do, organized hierarchically, independent of how it is done today |
| Value Stream Map | The end-to-end sequence of activities that delivers value to a customer or stakeholder |
| Operating Model | The blueprint for how the organization delivers value — which capabilities are standardized across the enterprise and which are localized to business units |
| Organization Structure | Formal reporting relationships and accountability structures |
| Business Architecture Roadmap | The planned evolution of business capabilities over time |

**Who owns it:** Typically the Chief Strategy Officer, Chief Operating Officer, or a dedicated Business Architecture function within EA.

**An example:** A retail bank's business architecture shows capabilities like "Customer Onboarding," "Credit Assessment," "Loan Servicing," and "Regulatory Reporting." These capabilities are stable — they describe what the bank must do regardless of whether they use a 20-year-old core banking system or a modern cloud-native platform.

### Domain 2: Application Architecture

**What it covers:** The software applications the organization uses, how they are structured, how they relate to each other, and what capabilities they support.

**Why it matters:** Application decisions are among the largest technology investments organizations make. Application architecture provides the structure for rationalizing, consolidating, and evolving the application portfolio.

**Key deliverables:**

| Deliverable | Description |
|---|---|
| Application Portfolio Catalog | An inventory of all applications: name, business capability supported, technology stack, vendor, lifecycle status |
| Application Landscape Diagram | A visual representation of application relationships and dependencies |
| Integration Architecture | How applications exchange data — APIs, messaging, events, file transfers |
| Application Rationalization Analysis | Which applications to retain, replace, retire, or consolidate |
| Application Roadmap | The planned evolution of the application portfolio |

**Who owns it:** Typically the Chief Application Architect or Solution Architecture function within IT.

### Domain 3: Data and Information Architecture

**What it covers:** How data is defined, stored, governed, and used across the enterprise. This is the domain that connects data assets to business value and to the emerging AI domain.

**Why it matters:** AI programs run on data. You cannot make a credible enterprise AI investment proposal without understanding the data architecture — who owns the data, how it is governed, what its quality is, and how it flows.

**Key deliverables:**

| Deliverable | Description |
|---|---|
| Conceptual Data Model | A high-level representation of the key data entities and their relationships, in business terms |
| Data Governance Framework | Policies, roles, and processes for managing data as an enterprise asset |
| Master Data Management (MDM) Architecture | How key shared data entities (customer, product, location) are defined and maintained |
| Data Quality Assessment | Current state assessment of data completeness, accuracy, and consistency |
| Data Platform Architecture | The technology stack for storing, processing, and accessing data (data warehouse, data lake, lakehouse) |

**Who owns it:** Typically the Chief Data Officer (CDO) and a Data Architecture function, often reporting to the CDO.

### Domain 4: Technology Architecture

**What it covers:** The technology infrastructure on which everything else runs — compute, network, storage, cloud platforms, middleware, and the standards governing technology choices.

**Why it matters:** Technology investment decisions — cloud provider selection, infrastructure modernization, platform standardization — are among the largest capital investments most enterprises make. Technology architecture provides the rationale and the governance for those decisions.

**Key deliverables:**

| Deliverable | Description |
|---|---|
| Technology Standards Catalog | The approved and preferred technology products and versions for each technology category |
| Infrastructure Architecture | Compute, network, storage, and cloud platform architecture |
| Platform Architecture | Shared platforms (integration, DevOps, security, observability) and their reference architectures |
| Technology Lifecycle Plan | Which technologies are current, on watch, or approaching end-of-life |
| Technology Roadmap | The planned evolution of the technology estate |

**Who owns it:** Typically the Chief Infrastructure Officer or VP of Platform Engineering, coordinated with the EA function.

### Domain 5: Security Architecture

**What it covers:** The controls, policies, and architecture patterns that protect the enterprise's information assets and technology systems.

**Why it matters:** Every enterprise AI program introduces new attack surfaces, new data risks, and new regulatory exposure. Security architecture is not optional — it is a gate that AI proposals must pass.

**Key deliverables:**

| Deliverable | Description |
|---|---|
| Security Reference Architecture | Standard security patterns for the enterprise: identity, access, network segmentation, encryption |
| Threat Model | A structured analysis of threats to a system or capability, used to drive security requirements |
| Security Standards and Controls | The specific security requirements that all systems must meet |
| Compliance Architecture | How the enterprise's technology meets regulatory requirements (GDPR, SOC 2, ISO 27001) |
| Security Risk Register | Known security risks, their likelihood and impact, and the controls in place |

**Who owns it:** Typically the Chief Information Security Officer (CISO) and a Security Architecture function.

### Domain 6: AI Architecture (Emerging)

**What it covers:** The architecture of AI capabilities — models, data pipelines, training infrastructure, inference platforms, governance controls, and observability. This domain emerged formally from around 2022 as AI capabilities matured from experimental to production.

**Why it matters:** This is the central domain for this course. Enterprise AI investment proposals must demonstrate architectural soundness across AI model governance, data quality, infrastructure, security, and operational observability.

**Key deliverables:**

| Deliverable | Description |
|---|---|
| AI Platform Reference Architecture | The standard platform for developing, deploying, and operating AI models at enterprise scale |
| AI Model Catalog | An inventory of AI models in production: purpose, version, accuracy metrics, owner, review date |
| MLOps / LLMOps Architecture | The pipelines for training, evaluating, deploying, monitoring, and retraining models |
| AI Governance Framework | Policies for model risk management, bias assessment, explainability, and accountability |
| AI Observability Architecture | Monitoring, alerting, and drift detection for production AI systems |

**Who owns it:** Typically the Chief AI Officer (CAIO) or an AI Architecture function, increasingly a formal role in Fortune 500 companies since 2023.

---

## Key EA Concepts

### Business Capability vs. Business Process vs. Business Function

This distinction is fundamental to EA and one of the concepts most often confused by technical architects entering the discipline.

```
Concept              Definition                  Example (Bank)          Key Property
────────────────────────────────────────────────────────────────────────────────────────
Business             What the organization        "Credit Assessment"     Stable — does not
Capability           needs to be able to do       "Customer Onboarding"   change when processes
                     to execute its strategy      "Risk Management"       or technology change

Business             How the organization         "Review credit          Variable — changes
Process              does something today         application form →      when you improve or
                                                  run credit check →      automate the way
                                                  consult risk model →    work is done
                                                  issue decision"

Business             A group of related           "Retail Lending"        Organizational —
Function             business activities          "Commercial Banking"    follows org structure
                     within an org unit           "Treasury"              which changes with
                                                                          reorganizations
```

!!! warning "The Most Common Confusion"
    Architects often say "capability" when they mean "function" (an org-chart concept) or "process" (a workflow concept). A capability is what the organization needs to be able to do — described in terms of outcomes, not activities or organizational ownership. A bank needs the capability "Credit Assessment" regardless of whether it is done by three underwriters in a back office or by an AI system processing 10,000 applications per hour.

**Why it matters for AI investment proposals:** When you propose an AI investment, you are proposing to enhance or replace part of a business capability. The investment case is stronger when framed as "this AI capability enhances our Credit Assessment capability by reducing decision time from 48 hours to 30 minutes" rather than "this AI system automates the credit review workflow in the commercial lending division."

### Value Stream vs. Value Chain

**Value Chain** (Porter, 1985): A linear model of the activities that a company performs to create value — from inbound logistics through operations, outbound logistics, marketing and sales, and service. The value chain model is useful for competitive analysis (where do we add value vs. competitors?) but is product-centric.

**Value Stream** (Lean methodology, adopted into EA): The end-to-end sequence of steps — including activities, decisions, information flows, and handoffs — that creates value for a specific customer segment. Value streams are customer-centric and cut across organizational boundaries.

```
Value Chain (Porter) — Company Perspective
───────────────────────────────────────────────────────────────────
Inbound → Operations → Outbound → Marketing → Service
Logistics              Logistics  & Sales

Value Stream (Lean/EA) — Customer Perspective
───────────────────────────────────────────────────────────────────
Customer           Customer applies     Underwriter        Customer
enquires about  → for mortgage    → reviews application → receives
mortgage                            (+ AI scoring)        decision
                                                            ↓
                                              Servicing team
                                              sets up account
```

**Why it matters:** When mapping AI investments to value, value streams are more useful than value chains. An AI investment in "mortgage underwriting" appears in the value stream but might touch multiple functions in the value chain (operations, service). Investment proposals that are framed in value stream terms are more immediately connected to customer outcomes — which is the language most business executives prefer.

### Operating Model

The operating model concept, developed by MIT CISR researchers Ross, Weill, and Robertson, answers the question: "How does this organization deliver value, and what does that imply for how we structure our technology?"

The model is defined on two dimensions:

**Standardization** — the degree to which business units do the same thing the same way across the enterprise.

**Integration** — the degree to which business units share data and processes with each other.

```
                    LOW INTEGRATION          HIGH INTEGRATION
                    ───────────────────────────────────────────
HIGH                REPLICATION              UNIFICATION
STANDARDIZATION     Business units do        Enterprise operates
                    the same thing           as one entity with
                    independently.           standardized, shared
                    McDonald's franchise.    processes.
                    Retail banking.          Airline operations.

LOW                 DIVERSIFICATION          COORDINATION
STANDARDIZATION     Business units           Business units share
                    operate largely          data but do their
                    independently.           own thing with it.
                    Holding companies.       Global supply chains.
                    Private equity firms.    Healthcare networks.
```

**Why it matters for architecture:** Each operating model implies a different technology architecture:

- **Replication**: Standard technology platforms deployed independently per business unit. Central IT provides the platform; business units deploy it themselves.
- **Unification**: Shared ERP and core systems; strong central governance; low customization tolerance.
- **Diversification**: Each business unit chooses its own technology; minimal central standards.
- **Coordination**: Shared data layer and APIs; business-unit autonomy for applications.

An AI investment proposal that ignores the operating model will propose the wrong architecture. A Coordination model company that receives a Unification-style AI platform proposal will reject it because it contradicts how the organization has decided to operate.

### Reference Architecture vs. Solution Architecture vs. Enterprise Architecture

These three terms are used imprecisely in most organizations. Here is the precise meaning of each:

| Term | Scope | Audience | Lifecycle | Example |
|---|---|---|---|---|
| Enterprise Architecture | The whole organization's current and target state | CIO, CTO, executives | Evolves over 3–5 year cycles | "The enterprise's data architecture moves to a lakehouse model on Azure" |
| Reference Architecture | A pattern or template for a class of solutions, reusable across the enterprise | Architects, engineering leads | Evolves as patterns mature | "The reference architecture for AI inference services at enterprise scale" |
| Solution Architecture | The architecture of a specific system or initiative | Project team, ARB | Valid for the life of the project | "The architecture of the Fraud Detection AI system for the retail banking division" |

**The hierarchy:** Enterprise Architecture sets the direction and the principles. Reference Architecture translates those principles into reusable patterns. Solution Architecture applies those patterns to a specific context.

!!! warning "Common Mistake"
    Many technical architects produce solution architectures and call them enterprise architectures. The difference is scope and reusability. A solution architecture describes how one system works. An enterprise architecture describes how all systems relate to the organization's strategy.

### Target Operating Model (TOM)

The Target Operating Model (TOM) describes the future state of how an organization will operate — its people, processes, technology, data, and governance — after a major transformation program. It is not just a technology architecture; it is a complete model of how the organization will function.

```
Target Operating Model Components
──────────────────────────────────────────────────────
Component         Description
──────────────────────────────────────────────────────
People            Roles, skills, organizational structure,
                  headcount model for the target state

Process           Key processes in the target state —
                  what is automated, what is human,
                  what is eliminated

Technology        The technology platforms and applications
                  that support the target operating model

Data              Data assets, flows, governance structures,
                  and quality standards in the target state

Governance        Decision rights, controls, and oversight
                  structures in the target state

Change Management How the organization transitions from
                  current state to target state
```

**Why it matters for AI programs:** An AI program that only delivers technology without defining the TOM is incomplete. When you propose an AI investment, the investment committee will ask: "After we implement this, how will our operations actually work?" The TOM answers that question.

### Architecture Principles

Architecture principles are the rules that guide all architecture decisions across the enterprise. They are more durable than specific technologies or solutions — they articulate the fundamental choices the organization has made about how it will use technology.

**Examples of architecture principles:**

```
Principle           Statement                         Rationale
──────────────────────────────────────────────────────────────────────
Cloud-First         New technology investments will    Cloud delivers better
                    prioritize cloud-hosted services   economics, scalability,
                    over on-premise deployment         and agility than on-premise

API-First           Systems will expose their core     APIs enable integration,
                    capabilities through APIs before   product development, and
                    building any consumer interface    ecosystem partnerships

Data as a           Data is a shared enterprise        Siloed data prevents
Product             asset, not a departmental          AI, analytics, and
                    resource                           cross-functional decisions

Security by         Security controls are designed     Retrofit security is
Design              into systems from the start,       more expensive and
                    not added after                    less effective

AI-Assisted         New internal tools and             AI assistance improves
by Default          workflows are designed with        productivity and reduces
                    AI assistance as a standard        cognitive load when
                    capability                         properly governed
```

**How principles govern decisions:** When a team proposes a new system, the architecture review evaluates it against the principles. A proposal to deploy a new on-premise server farm for an AI workload would fail the Cloud-First principle and require strong justification. A proposal to build a new system that exposes no APIs would fail the API-First principle.

### Architecture Decision Records (ADR)

An Architecture Decision Record is a structured document that captures a significant architecture decision: the context that led to the decision, the options that were considered, the decision that was made, and the consequences of that decision.

**ADR Format:**

```
ADR-[number]: [Short title describing the decision]

Status: [Proposed | Accepted | Deprecated | Superseded by ADR-xxx]

Context:
[What is the issue that is driving the decision?
What forces are at play — business, technical, social?]

Decision:
[What decision has been made?
State it clearly and completely.]

Alternatives Considered:
[What other options were evaluated?
Why was each rejected?]

Consequences:
[What becomes easier or harder as a result of this decision?
What does this decision enable?
What does this decision constrain?]

Review Date: [When should this decision be revisited?]

Approved By: [ARB date and attendees, or decision-maker names]
```

**When to use ADRs:** Capture an ADR whenever a decision:

- Has significant long-term impact (5+ years)
- Is difficult or expensive to reverse
- Affects multiple systems or teams
- Represents a departure from a previous decision or standard

**Why ADRs matter for AI programs:** AI programs make many consequential architectural decisions — choice of AI platform, data governance approach, model deployment strategy, observability tooling. Without ADRs, these decisions are lost in meeting notes and team memories. When a problem arises 18 months later, no one knows why the original decision was made. ADRs are the institutional memory of architecture.

---

## Architecture Governance

### What an Architecture Review Board Is

An Architecture Review Board (ARB) is a governance body that reviews, evaluates, and approves (or rejects) significant technology decisions and investments before they are executed. The ARB is EA's primary governance instrument.

```
What goes to an ARB for review:
──────────────────────────────────────────────────────
✓  New technology platform adoption (cloud provider,
   AI platform, integration platform)
✓  Major system replacements (ERP, CRM, core banking)
✓  New architecture patterns not in the standards catalog
✓  Technology investments above a defined threshold
   (typically $500K to $1M+, varies by organization)
✓  Departures from architecture principles or standards
✓  New vendor relationships involving technology
✓  New third-party data integrations
✓  Architecture decisions that affect multiple business units

What does NOT typically go to an ARB:
──────────────────────────────────────────────────────
✗  Routine upgrades to approved technology
✗  Security patches and maintenance
✗  Decisions below the investment threshold
✗  Changes within an approved architecture pattern
```

### ARB Membership and Cadence

**Typical ARB membership:**

| Role | Responsibility |
|---|---|
| Enterprise Architect (Chair) | Leads the review; owns the architecture standards |
| Domain Architects | Subject matter experts for business, application, data, security, and infrastructure domains |
| Chief Information Security Officer (CISO) or delegate | Security review |
| Business Architecture representative | Business capability and strategy alignment |
| CIO delegate or CTO delegate | Executive sponsorship and tie-breaking |
| Finance representative (for investment proposals) | Cost and budget review |
| Rotating business unit architects | Bring divisional context |

**Cadence:** Most large enterprises hold ARB sessions monthly or bi-weekly, with an expedited review process for urgent decisions.

**Decision types:**

```
Decision         Meaning
─────────────────────────────────────────────────────────────────
Approved         Proceed as proposed; no conditions

Approved with    Proceed, but must meet stated conditions before
Conditions       implementation or before next milestone

Deferred         More information or analysis needed before
                 a decision can be made; resubmit with specified
                 information

Rejected         Proposal does not meet architecture standards
                 or principles; cannot proceed in current form

Delegated        ARB does not need to review; delegate to
                 domain architect or project team for approval
```

### ARB vs. Investment Committee

A common confusion for architects entering enterprise roles is the relationship between the ARB and the investment committee. They serve different purposes.

```
Architecture Review Board           Investment Committee
────────────────────────────────    ────────────────────────────────────
Reviews technical soundness and     Reviews business value, ROI,
standards compliance                strategic fit, and funding allocation

Members: architects, security,      Members: CFO, CIO, business
IT leadership                       executives, finance leadership

Output: Architecture approval,      Output: Funding approval, program
conditions, or rejection            prioritization, go/no-go decisions

Timing: Before implementation       Timing: Before architecture review
                                    and before ARB (investment logic
                                    flows: Investment → ARB → Delivery)
```

!!! tip "The Sequence Matters"
    A proposal typically goes through the investment committee before the ARB. The investment committee decides whether to fund the program. The ARB then decides whether the proposed architecture is acceptable. However, for large programs, a preliminary architecture review may be required before the investment committee will consider the investment — to ensure the proposal is technically credible.

### How Proposals Come to ARBs

```
1. Project or program team identifies a technology need
   or investment opportunity

2. Solution Architect designs a proposed architecture
   (documented in a Solution Architecture Document or
   an ARB presentation deck)

3. Pre-ARB review with domain architects — informal
   feedback before the formal presentation

4. ARB submission — typically a structured deck covering:
   ├── Business context and problem statement
   ├── Current state architecture
   ├── Proposed architecture (diagrams + explanation)
   ├── Alternatives considered and rationale for choice
   ├── Compliance with architecture principles and standards
   ├── Security and risk assessment
   ├── Integration impacts on existing systems
   ├── Vendor assessment (if applicable)
   └── Implementation timeline and milestones

5. ARB session — presentation (20–40 minutes) followed
   by Q&A (20–60 minutes)

6. Decision and conditions recorded in the ARB log
   and communicated to the submitting team

7. Follow-up — if conditions were set, the team returns
   when conditions are met
```

### What Gets Approved vs. Rejected

Understanding what causes ARB rejections is as important as understanding what causes approvals. The most common reasons for rejection or conditional approval:

| Rejection Reason | Root Cause | Prevention |
|---|---|---|
| Does not align with architecture principles | Architect not aware of or ignored the principles | Review principles catalog before designing |
| Introduces security risk without adequate controls | Security was not considered during design | Engage CISO early; use threat modeling |
| Duplicates an existing capability | Did not check the application portfolio | Review the portfolio catalog first |
| Vendor not in approved vendor list | Commercial due diligence skipped | Engage procurement early |
| Integration not consistent with integration standards | Used point-to-point where API/event required | Follow integration reference architecture |
| Insufficient justification for departure from standards | Inadequate documentation of rationale | Document alternatives and decisions in ADRs |
| Business case not credible | Architect wrote the business case without finance input | Partner with finance from the start |

---

## Five Teaching Lenses: Enterprise Architecture

### Lens 1: The Beginner's View

Think of Enterprise Architecture as the master floor plan for a large, multi-building campus.

When each building was built independently by a different architect, you end up with buildings that use incompatible electrical systems, doors of different widths, fire exits that do not connect, and HVAC systems that cannot communicate. Everything works within each building, but the campus does not function as a whole.

Enterprise Architecture is like having a campus architect who sets standards before each building is designed: standard door widths, shared utility infrastructure, connected fire systems, consistent materials. Individual buildings can still be distinctive — but they work together as a campus.

### Lens 2: The Enterprise View

In a Fortune 500 company, EA operates as a corporate function — typically reporting to the CIO or CTO — with authority to define standards, review proposals, and influence investment decisions. The EA team typically has:

- 5 to 20 architects (depending on company size) organized by domain
- A formal ARB with executive sponsorship
- An architecture standards catalog maintained and updated quarterly
- An annual architecture roadmap aligned with the business strategic plan
- A technology radar (like ThoughtWorks Technology Radar) tracking emerging technologies

EA interacts with every major technology investment: reviewing proposals before they are funded, defining the reference architectures that projects must follow, and reporting to the investment committee on architecture risk.

### Lens 3: The Architecture View

From a pure architecture discipline perspective, EA is about managing complexity at scale. Individual systems have architects. EA manages the relationships between systems.

The key deliverables are:
- Current state architecture (what exists today, in all its complexity)
- Target state architecture (where we want to be in 3–5 years)
- Gap analysis (the delta between current and target)
- Architecture roadmap (the sequenced plan to close the gap)
- Governance instruments (principles, standards, ADRs, ARB decisions) that guide decisions along the way

### Lens 4: The Executive View

A CIO or CEO sees EA primarily through three lenses:

1. **Risk reduction**: EA prevents the kind of technology decisions that create massive technical debt, security vulnerabilities, or vendor lock-in that are expensive to fix.

2. **Investment efficiency**: EA prevents redundant investments (buying the same capability twice) and ensures technology investments deliver against business strategy.

3. **Strategic agility**: EA creates the technical foundation that enables the business to move quickly — to launch new products, enter new markets, or adopt new AI capabilities without rebuilding everything from scratch.

The CIO's question is not "do we have good architecture?" but "does our architecture make us more competitive and reduce our risk?" EA's job is to answer that question with evidence.

### Lens 5: The Consultant View

McKinsey, BCG, Accenture, and Deloitte all have enterprise architecture practices. Their approach to EA differs from internal EA functions in one key way: they are hired to accelerate transformation, not to maintain standards.

Consultants use EA frameworks as diagnostic tools:
- Where is the current architecture creating business risk or constraint?
- Where does the target architecture need to be to support the three-year strategy?
- What is the investment required to close the gap, and what is the ROI?

Consultants produce EA artifacts (current state assessments, target architectures, roadmaps) as deliverables for which clients pay. Internal EA teams produce the same artifacts as ongoing work products. Understanding both contexts is essential if you want to advise on enterprise AI programs from either side of the table.

---

## Common Mistakes: Technical Architects Entering EA

### Mistake 1: Treating EA as a Documentation Exercise

Many technical architects, encountering EA for the first time, assume that the job is to create and maintain diagrams and documents — the current state, the target state, the principles, the standards.

**The reality:** Documentation is an output of EA, not its purpose. EA's purpose is to improve the quality of architecture decisions and technology investments. An architecture diagram that nobody reads changes nothing. EA succeeds when it changes what gets built, bought, or funded.

**The correction:** Ask, for every artifact you produce: "What decision does this inform? Who will use it? How will it change what gets approved or rejected?" If you cannot answer those questions, the artifact is probably the wrong investment of your time.

### Mistake 2: Focusing on Technical Depth Instead of Business Outcomes

Technical architects are trained to go deep — to understand the nuances of system behavior, performance characteristics, and implementation trade-offs. EA requires a different skill: going broad and connecting everything to business outcomes.

**The reality:** An enterprise architect who can beautifully describe the technical trade-offs of Kafka vs. Pulsar for event streaming but cannot explain which business capability that decision affects — and what the business risk of getting it wrong is — will not be effective in an EA role.

**The correction:** For every technical decision, practice the "so what?" question: "This technology choice means [X]. So what? What business outcome does that enable or prevent? What would happen if we made the other choice?"

### Mistake 3: Using Architecture Jargon with Business Stakeholders

Terms like "event-driven architecture," "microservices decomposition," "polyglot persistence," and "API gateway pattern" are precise and useful when talking to engineers. They are alienating and trust-destroying when used with business leaders.

**The reality:** Business stakeholders are not interested in how you will implement something. They are interested in what it will enable, how confident you are it will work, and what it will cost. Jargon signals that you are not thinking about their concerns.

**The correction:** Maintain two vocabularies for every concept. Practice translating any technical description into a business outcome statement before speaking to a non-technical audience.

### Mistake 4: Building the Perfect Architecture Instead of the Achievable One

Technical architects sometimes become advocates for architecturally "pure" solutions that are technically elegant but organizationally impossible to implement — given budget constraints, political realities, existing vendor relationships, or the organization's change capacity.

**The reality:** The best architecture is the one the organization can actually deliver, given its constraints. An unimplementable architecture is not better than a pragmatic one — it is worse, because it either never gets built or it gets built by cutting corners that undermine the original intent.

**The correction:** Every architecture proposal must include a realistic assessment of what the organization is actually capable of executing: budget, talent, change management capacity, political dynamics, and vendor readiness. A phased architecture that delivers value at each phase is almost always better than a big-bang design that takes five years to see any benefit.

### Mistake 5: Ignoring Governance and Political Dynamics

Technical architects often have low tolerance for organizational politics — the competing priorities, the territorial behavior, the slow decision-making that characterizes large enterprises. They sometimes try to bypass governance (getting a project started without ARB approval) or to short-circuit political discussions by presenting technically superior solutions.

**The reality:** In large enterprises, governance and political dynamics are not obstacles to good architecture. They are the environment in which architecture must operate. An architecture that wins the technical argument but loses the political argument still loses.

**The correction:** Treat governance as a system to be designed and navigated, not a bureaucratic obstacle. Map the stakeholders, understand their concerns, and design your proposals to address those concerns proactively. The architects who succeed at the enterprise level are as skilled at organizational navigation as they are at technical design.

---

## Real Enterprise Example: A Mid-Size Bank's EA Transformation

### Before: 47 Siloed IT Projects

**The situation (2018):** A regional bank with $40 billion in assets and 8,000 employees had grown through acquisitions over 20 years. Each acquired bank kept its own systems. The result:

- 3 core banking systems (never consolidated after acquisitions)
- 47 active IT projects with no coordination
- 312 software applications in production
- No API strategy — all integrations were point-to-point
- Customer data in 6 different systems with no single source of truth
- Average new product launch: 22 months
- Annual IT spend: $180M, with no portfolio view of what it was buying

The bank's CEO declared a "Digital First" strategy in late 2018. The CIO inherited the mandate to make it happen.

**The immediate problem:** When the executive team asked "how long would it take to launch a mobile-first loan product for small businesses?" the answer was "we don't know, because we don't know what we currently have, and we don't know what we would need to build."

### The EA Intervention

The CIO hired an EA practice lead and chartered a 90-day EA assessment. The assessment produced:

1. **Application Portfolio Catalog**: All 312 applications documented with business capability, technology stack, vendor, annual cost, and condition assessment (retain, transform, retire, replace).

2. **Capability Map**: 47 core business capabilities identified, mapped to the applications that supported them. Result: 9 capabilities were supported by 3 or more overlapping applications.

3. **Integration Architecture Assessment**: The 47 projects were touching 89 different integration points. Without coordination, they were building conflicting integration patterns that would create incompatible systems.

4. **Architecture Principles**: Established 7 principles including Cloud-First, API-First, and Customer Data as Enterprise Asset.

5. **ARB Established**: Monthly Architecture Review Board with CIO sponsorship. All new projects above $250K required ARB approval.

### After: Governed Portfolio

**The result (2021, 3 years later):**

```
Metric                          Before (2018)    After (2021)
──────────────────────────────────────────────────────────────
Active IT projects              47               23 (consolidated)
Software applications           312              187 (125 retired)
Core banking systems            3                1 (consolidated)
Average new product launch      22 months        9 months
Point-to-point integrations     89+              12 (via API gateway)
Customer data sources           6                1 (MDM platform)
Annual IT spend                 $180M            $155M (+ more capability)
ARB reviews per year            0                28 (new governance)
Projects aligned to strategy    Unknown          94% (tracked quarterly)
```

**The key insight:** The EA intervention did not add cost — it reduced it, by eliminating redundant investments and retiring unused applications. More importantly, it created the architectural foundation that made the "Digital First" strategy executable. The mobile small business loan product launched in 2021 — 11 months from concept to market, enabled by shared APIs, a single customer data platform, and a cloud-native integration layer that had been established through the EA program.

---

## Reflection Questions

1. Think of a technology organization you have worked in. What would a business capability map of that organization look like? How many capabilities could you identify? What technology supported each one?

2. Have you ever been part of a decision that later turned out to be the wrong architectural choice? What would an ADR written at the time of that decision have captured? Would the information in it have changed the decision?

3. How would you explain the value of an ARB to a business executive who thinks governance slows things down? What evidence would you use to make the case?

4. What is the operating model of the largest organization you have worked with? Was it Replication, Unification, Diversification, or Coordination? What evidence do you use to support your classification?

5. Think of a time when you, or someone you observed, used technical jargon with a business stakeholder. What was the reaction? How would you reframe that same message in business terms?

---

## Mastery Checklist: Module 1

Before proceeding to Module 2, confirm you can do each of the following without referring to your notes:

- [ ] Explain in two sentences why Enterprise Architecture exists and what problem it solves
- [ ] Describe the four main EA frameworks (Zachman, TOGAF, Gartner, MIT CISR) and the distinct contribution of each
- [ ] List the six EA domains and for each: name two key deliverables and explain who owns it
- [ ] Explain the difference between a Business Capability, a Business Process, and a Business Function — and give an example of each from the same organization
- [ ] Draw the four operating model quadrants and explain the architecture implications of each
- [ ] Explain the difference between a Reference Architecture, a Solution Architecture, and an Enterprise Architecture
- [ ] Describe what a Target Operating Model (TOM) contains and why it matters for AI programs
- [ ] Write a sample Architecture Decision Record for a real or hypothetical technology decision
- [ ] Explain the purpose of an ARB, who sits on it, and what decision types it makes
- [ ] Distinguish between an ARB and an investment committee and explain the typical sequence between them
- [ ] Name the five most common mistakes technical architects make when entering EA roles and explain how to avoid each
- [ ] Tell the story of the bank EA transformation example — the before, the intervention, and the after — in under 5 minutes
