import { useState } from "react";

const COMPANY = "NexaBank Global";
const INITIATIVE = "APEX — AI Platform of Platforms";
const VERSION = "v1.0 | TOGAF 10 ADM";

// ── colour tokens ──────────────────────────────────────────────────────────
const C = {
  bg: "#0a0e1a",
  surface: "#111827",
  card: "#1a2235",
  border: "#1e2d45",
  accent: "#00d4ff",
  accent2: "#7c3aed",
  accent3: "#10b981",
  warn: "#f59e0b",
  danger: "#ef4444",
  text: "#e2e8f0",
  muted: "#64748b",
  phase: {
    pre: "#6366f1",
    a: "#8b5cf6",
    b: "#ec4899",
    c: "#06b6d4",
    d: "#10b981",
    e: "#f59e0b",
    f: "#f97316",
    g: "#ef4444",
    h: "#a855f7",
    rm: "#00d4ff",
  },
};

// ── TOGAF phases data ──────────────────────────────────────────────────────
const PHASES = [
  {
    id: "pre",
    label: "Preliminary",
    icon: "⚙️",
    tag: "PREP",
    color: C.phase.pre,
    tagline: "Establish the foundation",
    overview:
      "The Preliminary Phase defines the architecture capability of NexaBank Global. Before any AI platform work begins, we establish governance structures, tailor the ADM for financial services, and codify the architecture principles that will govern every decision in the APEX programme.",
    activities: [
      "Define Architecture Capability & Maturity Target",
      "Establish the Architecture Board and RACI",
      "Tailor the TOGAF ADM for FinServ regulatory constraints (DORA, BCBS 239)",
      "Populate the Architecture Repository (Foundation & Common System ABBs)",
      "Define and ratify Architecture Principles",
      "Select architecture tooling (LeanIX + Confluence + ADO)",
    ],
    documents: [
      {
        title: "Architecture Principles Document",
        id: "APD-001",
        content: `# Architecture Principles Document
## APEX Programme | NexaBank Global | APD-001 | v2.1

### 1. Business Principles

**BP-01 — AI as a Business Capability, Not a Project**
*Statement:* Every AI agent deployed through APEX must trace to a measurable business outcome in the Corporate Strategy Map.
*Rationale:* Prevents "AI for AI's sake" initiatives that consume CapEx without P&L impact.
*Implications:* Every domain team must submit a Business Value Case (BVC) before onboarding to APEX.

**BP-02 — Human-in-the-Loop by Default**
*Statement:* All AI agents acting on customer data or executing financial transactions must have a defined human escalation path.
*Rationale:* Regulatory obligation under MiFID II Article 27 and SR 11-7 Model Risk Management.
*Implications:* AWS Bedrock Human Loop integration is mandatory for credit, fraud, and advisory agents.

**BP-03 — Platform Thinking over Point Solutions**
*Statement:* No business unit shall procure a standalone AI/ML tool if APEX can provide equivalent capability within 90 days.
*Rationale:* Reduces vendor sprawl; current state has 23 siloed AI tools across 8 BUs.
*Implications:* Architecture Review Board (ARB) approval required for any AI procurement.

### 2. Data Principles

**DP-01 — Data Sovereignty and Residency**
*Statement:* Customer PII and financial data processed by AI agents must remain in the client's contractual jurisdiction.
*Rationale:* GDPR (EU), PDPA (Singapore), LGPD (Brazil) impose strict cross-border data transfer rules.
*Implications:* APEX must deploy multi-region AWS infrastructure; Bedrock model endpoints per region.

**DP-02 — Data as a Shared Asset**
*Statement:* All data consumed by APEX agents is catalogued in the NexaBank Data Mesh and governed by domain Data Product Owners.
*Rationale:* Prevents data duplication and ensures lineage for BCBS 239 reporting.
*Implications:* Mandatory integration with AWS Glue Data Catalog and Apache Atlas.

**DP-03 — Explainability Before Deployment**
*Statement:* Any ML model embedded in an APEX agent must have a documented explainability method (SHAP, LIME, or attention maps) before production approval.
*Rationale:* EU AI Act Article 13 transparency requirements; internal Model Risk appetite.
*Implications:* SageMaker Clarify pipeline is a mandatory gate in the APEX CI/CD process.

### 3. Technology Principles

**TP-01 — AWS-First, Not AWS-Only**
*Statement:* AWS is the strategic cloud provider; however, architecture must avoid irreversible vendor lock-in through abstraction layers.
*Rationale:* Board-approved Cloud Strategy 2024; mitigates concentration risk.
*Implications:* Agent orchestration logic in AWS Step Functions; portable agent definitions via OpenAPI.

**TP-02 — Security by Design**
*Statement:* Security controls are embedded at design time, not retrofitted post-deployment.
*Rationale:* NexaBank suffered a $4.2M regulatory fine in 2022 for inadequate AI model access controls.
*Implications:* AWS IAM, Macie, GuardDuty, and Bedrock Guardrails configured before any agent goes live.

**TP-03 — Observability as a First-Class Concern**
*Statement:* Every APEX agent must emit structured traces, metrics, and logs from day one.
*Rationale:* Incident resolution time for AI systems averages 6.3 hours without observability; target < 30 min.
*Implications:* AWS CloudWatch + OpenTelemetry mandatory; Datadog APM integration for agent tracing.

**TP-04 — Cost Transparency**
*Statement:* Each AI agent deployed on APEX must have a tagged cost centre and monthly token-cost budget with automated alerts.
*Rationale:* 2023 audit found $1.8M in unattributed LLM spend across shadow IT projects.
*Implications:* AWS Cost Allocation Tags mandatory; FinOps review gate in APEX onboarding checklist.`,
      },
      {
        title: "Tailored ADM Process",
        id: "ADM-TLR-001",
        content: `# Tailored ADM Process for APEX
## NexaBank Global | ADM-TLR-001 | v1.3

### Tailoring Rationale
Standard TOGAF ADM is adapted for:
- **Agile delivery cadence**: Phases B–D run as 6-week architecture sprints, not sequential waterfall
- **Regulatory compliance gates**: DORA Article 11 (ICT risk) and BCBS 239 gates inserted at Phase D→E boundary
- **Financial Services risk appetite**: Phase E introduces a mandatory Threat Model review before roadmap sign-off

### Phase Iteration Model
\`\`\`
[Preliminary] → [A: Vision] → [B+C+D: Architecture Sprint ×N]
                                       ↓
                              [Compliance Gate]
                                       ↓
                              [E: Opportunities] → [F: Migration]
                                       ↓
                              [G: Governance] ←→ [H: Change Mgmt]
                                       ↑
                              [Requirements Mgmt — continuous]
\`\`\`

### Key Tailoring Decisions
| TOGAF Standard | NexaBank Tailoring | Rationale |
|---|---|---|
| Sequential B→C→D | Concurrent 6-week sprint | Speed to market |
| Phase G post-implementation | G runs from Phase A | Regulatory mandate |
| Optional Architecture Contract | Mandatory per domain | Risk mitigation |
| ADM outputs in ArchiMate | ArchiMate + C4 Model | Dev team adoption |

### Architecture Review Board Cadence
- **Weekly**: Programme AR review (30 min, async-first)
- **Bi-weekly**: Domain ARB (60 min)
- **Monthly**: Group CTO Architecture Board (90 min)
- **Quarterly**: Regulator Architecture Briefing (DORA evidence pack)`,
      },
      {
        title: "Architecture Repository Setup",
        id: "REPO-001",
        content: `# Architecture Repository — APEX
## NexaBank Global | REPO-001 | v1.0

### Repository Structure (TOGAF 10 Compliant)

**1. Architecture Metamodel**
- Tooling: LeanIX (primary) + Confluence (narrative) + ADO (work items)
- Metamodel: TOGAF 10 Content Framework + FinServ extensions
- Modelling notation: ArchiMate 3.2 (enterprise) + C4 (solution level)

**2. Architecture Landscape**
\`\`\`
├── Strategic Architecture
│   ├── NexaBank Enterprise Architecture 2024
│   └── Cloud Strategy Baseline
├── Segment Architecture
│   ├── Retail Banking Segment
│   ├── Corporate & Institutional Banking Segment
│   └── Wealth Management Segment
└── Capability Architecture (APEX)
    ├── AI Agent Fabric (this programme)
    ├── Data Mesh Platform
    └── Developer Platform (InnerSource)
\`\`\`

**3. Standards Library**
- AWS Well-Architected Framework (FinServ Lens)
- NIST AI Risk Management Framework (AI RMF 1.0)
- EU AI Act Compliance Checklist
- DORA ICT Risk Controls Catalogue
- NexaBank Internal: API Design Standards v3.2, Data Classification Policy v5.0

**4. Reference Library**
- Gartner AI Platform Magic Quadrant 2024
- AWS Reference Architecture: Multi-Agent Orchestration
- McKinsey: "The AI Bank of the Future" (internal licensed copy)

**5. Governance Log**
- All ARB decisions with rationale (retained 7 years per DORA)
- Waivers, exceptions, and dispensations register
- Architecture debt register (current: 47 items, target: <10 by Q4 2025)`,
      },
    ],
  },
  {
    id: "a",
    label: "Phase A — Vision",
    icon: "🔭",
    tag: "VISION",
    color: C.phase.a,
    tagline: "Define the why and the what",
    overview:
      "Phase A creates the Architecture Vision for APEX. We define the problem statement, scope, key stakeholders, high-level target architecture, and secure executive sponsorship through the Statement of Architecture Work. This phase answers: WHY are we building this, WHAT are the boundaries, and WHO must be engaged.",
    activities: [
      "Identify and analyse key stakeholders (Power/Interest grid)",
      "Confirm business goals, drivers, and constraints",
      "Define architecture scope (breadth, depth, time horizon)",
      "Develop high-level Architecture Vision (narrative + ArchiMate sketch)",
      "Identify architecture risks and mitigations",
      "Produce and get signed-off Statement of Architecture Work",
      "Validate architecture principles against Vision",
    ],
    documents: [
      {
        title: "Statement of Architecture Work",
        id: "SAW-APEX-001",
        content: `# Statement of Architecture Work
## APEX — AI Platform of Platforms
## NexaBank Global | SAW-APEX-001 | v1.4 | APPROVED

---

### 1. Project Request and Background
NexaBank Global operates 23 isolated AI/ML initiatives across Retail, Corporate, and Wealth divisions. A 2023 internal audit identified:
- **$14M annual duplicated spend** on overlapping AI tooling and model training
- **9.2 months average time-to-market** for new AI use cases (industry benchmark: 3.1 months)
- **Zero cross-domain agent orchestration** capability — each BU builds independently
- **47 model governance gaps** cited in DORA 2024 self-assessment

The APEX programme will establish a **Platform of Platforms** — a shared AWS Agent Core–based infrastructure that provides all NexaBank business units with reusable AI agent capabilities, governance guardrails, and a self-service marketplace.

### 2. Architecture Vision Statement
*"By Q4 2026, NexaBank Global will operate a unified AI Agent Platform (APEX) on AWS Agent Core that reduces time-to-market for AI use cases from 9.2 to 2.5 months, achieves full EU AI Act and DORA compliance, and generates $38M NPV over 5 years through platform economics."*

### 3. Scope

**In Scope:**
- AWS Agent Core multi-region deployment (eu-west-1, us-east-1, ap-southeast-1)
- Agent Lifecycle Management (build, test, deploy, monitor, retire)
- Multi-agent orchestration patterns (supervisor, swarm, sequential)
- Self-service Agent Marketplace (internal)
- Centralised observability, cost management, and compliance reporting
- Integration with NexaBank Data Mesh (existing)
- Bedrock Guardrails configuration for FS-specific content policies
- 5 Pioneer Domain use cases (see Phase B)

**Out of Scope:**
- Replacement of existing model training infrastructure (SageMaker — separate programme)
- Customer-facing AI chatbots (handled by Digital Channel programme)
- Autonomous trading agents (requires separate regulatory approval pathway)

### 4. Architecture Constraints
| Constraint | Source | Impact |
|---|---|---|
| Data must not leave contractual jurisdiction | GDPR / PDPA / LGPD | Multi-region deployment mandatory |
| All AI models require Model Risk sign-off | SR 11-7 / Internal Policy | 6-week validation gate per model |
| AWS Strategic Partner status | Board Cloud Strategy | Primary platform must be AWS |
| Zero-downtime for Tier-1 services | SLA Policy | Blue-green deployment mandatory |
| 99.95% availability target | Enterprise SLA | Multi-AZ + DR required |

### 5. Roles and Responsibilities
| Role | Name | Accountability |
|---|---|---|
| Executive Sponsor | Group CTO (Sarah Chen) | Programme authority and budget |
| Architecture Owner | Enterprise Architect (this document) | ADM governance |
| Domain Architects (×5) | TBD per Pioneer Domain | Domain-level architecture |
| Product Owner | VP AI Platform (Marcus Webb) | Platform backlog and roadmap |
| Security Architect | CISO delegate (Priya Nair) | Security design authority |
| Data Architect | Chief Data Officer delegate | Data architecture sign-off |
| Regulator Liaison | Group Compliance (James Okafor) | DORA / EU AI Act evidence |

### 6. Key Milestones
| Milestone | Target Date | Exit Criteria |
|---|---|---|
| Architecture Vision Approved | 2025-03-01 | Group CTO sign-off |
| Architecture Definition Complete | 2025-06-30 | ARB approval |
| Pioneer Domain 1 Live | 2025-09-30 | Production SLA met |
| Full Platform GA | 2026-Q2 | All 5 Pioneers onboarded |
| DORA Compliance Evidence Pack | 2026-Q3 | Regulator review passed |

### 7. Budget Authority
- Architecture workstream: £2.4M (FY2025)
- AWS infrastructure commitment: $8.2M (3-year reserved)
- Total programme TCO: £47M over 3 years

**Approved by:** Sarah Chen (Group CTO) | 2025-02-14
**Architecture Board Reference:** ARB-2025-0047`,
      },
      {
        title: "Stakeholder Map & Register",
        id: "STK-APEX-001",
        content: `# Stakeholder Map & Register
## APEX | NexaBank Global | STK-APEX-001 | v1.2

### Power / Interest Grid

\`\`\`
HIGH POWER
│
│  [MANAGE CLOSELY]           [KEY PLAYERS]
│  ─────────────────────      ──────────────────────────
│  • Group Risk CRO           • Group CTO (Sarah Chen) ★
│  • Regulator (PRA/ECB)      • COO — Retail Banking
│  • Group CFO                • COO — Corporate Banking
│  • Chief Data Officer       • CISO
│                             • VP AI Platform (Marcus Webb) ★
│
│  [MONITOR]                  [KEEP INFORMED]
│  ─────────────────────      ──────────────────────────
│  • Domain Dev Teams         • Business Analysts (×23)
│  • Platform Engineering     • Change Management Office
│  • HR / People Team         • Internal Audit
│  • NexaBank Customers       • External Vendors (AWS, etc.)
│
LOW POWER ──────────────────────────────────────────────── HIGH INTEREST
\`\`\`

### Stakeholder Register (Key Players)

| ID | Stakeholder | Role | Concerns | APEX Value Proposition | Engagement |
|---|---|---|---|---|---|
| S01 | Sarah Chen | Group CTO | Speed of AI delivery, cost control, regulatory risk | -68% time-to-market, -$14M duplicated spend | Monthly steering |
| S02 | Marcus Webb | VP AI Platform | Platform adoption, developer experience | Self-service marketplace, reusable agents | Daily collaboration |
| S03 | Priya Nair | CISO | Data leakage, model poisoning, access control | Centralised Bedrock Guardrails, IAM, audit logs | Bi-weekly review |
| S04 | James Okafor | Group Compliance | DORA Article 11, EU AI Act, BCBS 239 | Automated compliance reporting, explainability pipeline | Monthly evidence review |
| S05 | Dr. Lin Wei | Chief Data Officer | Data mesh integration, lineage, sovereignty | Native Glue/Atlas integration, regional data residency | Bi-weekly |
| S06 | Alex Torres | COO Retail Banking | Customer impact, downtime risk | Blue-green deploy, 99.95% SLA, Human-in-Loop | Monthly |
| S07 | PRA / ECB | Regulator | Systemic AI risk, model governance | DORA evidence pack, EU AI Act Article 13 compliance | Quarterly briefing |

### Architecture Concerns by Stakeholder Category
**Business Leaders:** ROI timeline, competitive differentiation, reputational risk of AI failures
**Technology Leaders:** AWS lock-in, talent capability, integration complexity, technical debt
**Risk & Compliance:** Model risk, data sovereignty, explainability, incident response
**Operations:** Toil reduction, on-call burden, SLA management, cost allocation
**Regulators:** Systemic risk, human oversight, incident notification (DORA 72hr rule)`,
      },
      {
        title: "Architecture Vision Document",
        id: "AVD-APEX-001",
        content: `# Architecture Vision Document
## APEX — AI Platform of Platforms
## NexaBank Global | AVD-APEX-001 | v2.0

### Executive Summary
APEX transforms NexaBank from a collection of siloed AI experiments into a governed, scalable **AI Platform of Platforms** built on AWS Agent Core. It provides a shared capability layer enabling every NexaBank domain to compose, deploy, and govern AI agents without rebuilding foundational infrastructure.

### Problem Statement (Current State "Pain Chain")
\`\`\`
Business Want:       "Launch AI credit risk agent in Retail"
                              ↓
Current Reality:     Team spends 7 months on infra, security, compliance
                              ↓
Result:              $2.1M spend, 73% on undifferentiated heavy lifting
                              ↓
Value Destroyed:     $14M/yr duplicated spend, 9.2mo TTM, 47 governance gaps
\`\`\`

### Target State Vision — APEX Architecture Concept

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    BUSINESS DOMAIN LAYER                        │
│  [Retail Agents]  [Corporate Agents]  [Wealth Agents]  [Risk]   │
│       ↑                 ↑                  ↑              ↑     │
└───────┼─────────────────┼──────────────────┼──────────────┼─────┘
        │                 │                  │              │
┌───────▼─────────────────▼──────────────────▼──────────────▼─────┐
│                    APEX AGENT MARKETPLACE                        │
│         Self-Service Portal | Agent Templates | SLA Tiers        │
├─────────────────────────────────────────────────────────────────┤
│              APEX PLATFORM SERVICES (AWS Agent Core)             │
│  ┌──────────────┐ ┌───────────────┐ ┌──────────────────────┐    │
│  │  Orchestration│ │  Knowledge    │ │   Agent Lifecycle    │    │
│  │  Engine       │ │  Stores       │ │   Management (ALM)   │    │
│  │  (Step Fn +   │ │  (Bedrock KB) │ │   Build|Test|Deploy  │    │
│  │  Bedrock)     │ │               │ │   Monitor|Retire     │    │
│  └──────────────┘ └───────────────┘ └──────────────────────┘    │
│  ┌──────────────┐ ┌───────────────┐ ┌──────────────────────┐    │
│  │  Guardrails   │ │  Observability│ │   Cost & FinOps      │    │
│  │  (Bedrock GR) │ │  (OTEL+CW)   │ │   (CUR + Budgets)    │    │
│  └──────────────┘ └───────────────┘ └──────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│              PLATFORM FOUNDATION (AWS)                           │
│  VPC | IAM | KMS | S3 | RDS | OpenSearch | EventBridge | SQS    │
├─────────────────────────────────────────────────────────────────┤
│              DATA MESH INTEGRATION                               │
│  Glue Data Catalog | Apache Atlas | Domain Data Products         │
└─────────────────────────────────────────────────────────────────┘
                    ↑ DORA / EU AI Act / SR 11-7 Controls ↑
\`\`\`

### Five Pioneer Domains (Proof-of-Value)
1. **Retail — Credit Risk Agent**: Automated credit decisioning with human escalation (SR 11-7 compliant)
2. **Corporate — KYC Refresh Agent**: Continuous KYC monitoring, sanctions screening, SAR drafting
3. **Wealth — Portfolio Rebalancing Agent**: Rule-based rebalancing recommendations (MiFID II suitability)
4. **Operations — IT Incident Response Agent**: L1/L2 ticket triage and remediation (DORA incident reporting)
5. **Risk — Model Monitoring Agent**: Drift detection, backtesting orchestration, regulator report generation

### Key Value Metrics
| Metric | Baseline | Target (12mo) | Target (36mo) |
|---|---|---|---|
| Time to deploy AI agent | 9.2 months | 3.5 months | 2.5 months |
| Duplicated AI spend | $14M/yr | $8M/yr | $3M/yr |
| Governance gaps (DORA) | 47 | 15 | 0 |
| Active agents in production | 23 (siloed) | 45 (platform) | 120 (platform) |
| Developer NPS | -12 | 30 | 55 |`,
      },
    ],
  },
  {
    id: "b",
    label: "Phase B — Business",
    icon: "🏢",
    tag: "BUSINESS",
    color: C.phase.b,
    tagline: "Map the business landscape",
    overview:
      "Phase B defines the Business Architecture for APEX. We model NexaBank's business capabilities, value streams, and organisational structures — both current and target state. This ensures the AI platform is anchored to real business outcomes, not technology for its own sake.",
    activities: [
      "Develop Business Capability Map (BCM) for NexaBank AI domain",
      "Define Value Streams for AI agent delivery and consumption",
      "Model current vs target Business Process for each Pioneer Domain",
      "Define Organisation Model for the AI Platform team",
      "Identify Business Requirements and map to capability gaps",
      "Produce Business Architecture Baseline and Target documents",
    ],
    documents: [
      {
        title: "Business Capability Map",
        id: "BCM-APEX-001",
        content: `# Business Capability Map
## APEX Programme | NexaBank Global | BCM-APEX-001 | v1.5

### NexaBank AI Capability Landscape
(Heat-mapped: 🔴 Critical Gap | 🟡 Partial | 🟢 Adequate | ⚫ Not Required)

\`\`\`
LEVEL 1: AI PLATFORM         LEVEL 2: CAPABILITIES           GAP   APEX?
─────────────────────────────────────────────────────────────────────────
1. AI STRATEGY &             1.1 AI Opportunity Identification  🟡    ✓
   GOVERNANCE                1.2 AI Portfolio Management        🔴    ✓
                             1.3 AI Risk & Compliance Mgmt      🔴    ✓
                             1.4 AI Ethics & Fairness Review    🔴    ✓
                             1.5 Regulatory Reporting (AI)      🔴    ✓

2. AGENT DEVELOPMENT         2.1 Agent Design & Specification   🔴    ✓
                             2.2 Prompt Engineering             🟡    ✓
                             2.3 Tool & Action Development      🔴    ✓
                             2.4 Agent Testing & Evaluation     🔴    ✓
                             2.5 Agent Version Management       🔴    ✓

3. AGENT ORCHESTRATION       3.1 Multi-Agent Coordination       🔴    ✓
                             3.2 Workflow Orchestration          🟡    ✓
                             3.3 Human-in-Loop Integration      🔴    ✓
                             3.4 Event-Driven Agent Triggers    🔴    ✓

4. KNOWLEDGE MANAGEMENT      4.1 Knowledge Base Creation        🟡    ✓
                             4.2 RAG Pipeline Management        🔴    ✓
                             4.3 Vector Store Operations        🔴    ✓
                             4.4 Knowledge Freshness/Sync       🔴    ✓

5. AI OPERATIONS             5.1 Model Lifecycle Management     🟡    ✓
(AIops)                     5.2 Agent Observability            🔴    ✓
                             5.3 Performance Optimisation       🔴    ✓
                             5.4 Cost Optimisation (FinOps)     🔴    ✓
                             5.5 Incident Response for AI       🔴    ✓

6. DATA INTEGRATION          6.1 Data Product Consumption       🟡    Partial
                             6.2 Real-time Data Streaming       🟡    Partial
                             6.3 Data Lineage for AI            🔴    ✓
                             6.4 Feature Store Integration      🟡    ✓

7. PLATFORM ENABLEMENT       7.1 Self-Service Developer Portal  🔴    ✓
                             7.2 Agent Marketplace              🔴    ✓
                             7.3 SLA & Metering                 🔴    ✓
                             7.4 Chargebacks & FinOps           🔴    ✓
\`\`\`

### Capability Gap Summary
- **Critical Gaps (🔴):** 24 capabilities — APEX directly addresses 22/24
- **Partial Capabilities (🟡):** 9 capabilities — APEX enhances 7/9
- **Outside APEX scope:** Model training infrastructure (separate SageMaker programme)

### Business Capability Prioritisation (MoSCoW)
**Must Have (Pioneer Phase):**
- Agent Development (2.1–2.5), Orchestration (3.1–3.4), Observability (5.2), Governance (1.2–1.4)

**Should Have (GA Phase):**
- Knowledge Management (4.x), Self-Service Portal (7.1), Marketplace (7.2)

**Could Have (Scale Phase):**
- Advanced FinOps (5.4, 7.4), Cross-bank federation capabilities

**Won't Have (This Programme):**
- Model training, Customer-facing UI, Autonomous trading`,
      },
      {
        title: "Value Stream Analysis",
        id: "VSA-APEX-001",
        content: `# Value Stream Analysis
## APEX | NexaBank Global | VSA-APEX-001 | v1.1

### Value Stream 1: AI Agent Delivery (Platform Provider Perspective)

\`\`\`
TRIGGER: Domain team submits Agent Onboarding Request
         ↓
┌────────────────────────────────────────────────────────────────┐
│ STAGE 1: INTAKE & QUALIFICATION (Week 1–2)                     │
│  Activities: Business case review, use case scoring,           │
│              regulatory classification (EU AI Act risk tier)   │
│  Stakeholders: ARB, Compliance, AI Product Manager             │
│  Value Item: Qualified agent specification                     │
│  KPI: 100% of requests triaged within 5 business days         │
└────────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────────┐
│ STAGE 2: ARCHITECTURE & DESIGN (Week 2–4)                      │
│  Activities: Agent blueprint, data flow design, security model │
│              Tool catalogue selection, prompt template design  │
│  Stakeholders: Domain Architect, Security Architect, DPO       │
│  Value Item: Approved Agent Architecture Document              │
│  KPI: Design review completed within 10 business days          │
└────────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────────┐
│ STAGE 3: BUILD & INTEGRATE (Week 4–8)                          │
│  Activities: AWS Bedrock agent config, tool lambda functions,  │
│              knowledge base population, guardrail tuning       │
│  Stakeholders: Platform Engineering, Domain Dev Team           │
│  Value Item: Agent in UAT environment                          │
│  KPI: Build cycle < 3 weeks (CI/CD automated)                 │
└────────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────────┐
│ STAGE 4: VALIDATE & GOVERN (Week 8–10)                         │
│  Activities: Model Risk validation, red-team testing,          │
│              explainability documentation, DORA evidence       │
│  Stakeholders: Model Risk, CISO, Compliance, Internal Audit    │
│  Value Item: Signed Model Risk Opinion + Compliance Certificate│
│  KPI: Validation cycle < 10 business days                     │
└────────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────────┐
│ STAGE 5: DEPLOY & MONITOR (Week 10+)                           │
│  Activities: Blue-green production deployment, SLA monitoring, │
│              cost tagging, Human Loop configuration            │
│  Stakeholders: SRE Team, FinOps, Business Owner                │
│  Value Item: Live agent with observability dashboard           │
│  KPI: Zero-downtime deploy; p99 latency < 3s                  │
└────────────────────────────────────────────────────────────────┘

OUTCOME: Value-generating AI agent in production
Current baseline: 9.2 months | APEX target: 2.5 months
\`\`\`

### Value Stream 2: AI Agent Consumption (Domain Team Perspective)
**Trigger:** Business analyst identifies AI opportunity
**Key Stages:** Discover → Configure → Test → Certify → Consume → Optimise
**Primary Pain Points (current):** Discovery (no catalogue), Compliance (manual), Cost visibility (none)
**APEX Solutions:** Agent Marketplace, Automated compliance pipeline, Cost dashboard

### Value Leakage Analysis (Current State)
| Waste Type | Description | Est. Annual Cost |
|---|---|---|
| Rework | Rebuilding identical agent patterns across BUs | $3.2M |
| Waiting | Manual compliance review queue (avg 6 weeks) | $4.8M |
| Overprocessing | Each BU builds own observability stack | $2.1M |
| Inventory | 14 partially-built AI agents abandoned | $1.9M |
| Defects | Production incidents from untested agents | $2.0M |
| **Total Waste** | | **$14.0M** |`,
      },
      {
        title: "Business Architecture Document",
        id: "BAD-APEX-001",
        content: `# Business Architecture Document
## APEX | NexaBank Global | BAD-APEX-001 | v1.0

### 1. Organisation Model — APEX Operating Structure

\`\`\`
GROUP CTO (Sarah Chen)
│
├── VP AI Platform (Marcus Webb) ── APEX Programme
│   ├── Platform Engineering Lead (6 engineers)
│   ├── AI/ML Engineering Lead (4 engineers)
│   ├── Platform Product Manager (2 PMs)
│   ├── Developer Experience (2 engineers)
│   └── FinOps & Platform SRE (3 engineers)
│
├── Chief AI Ethics Officer (new role — APEX creates)
│   ├── AI Risk Analyst (×2)
│   └── Regulatory Affairs (AI) (×1)
│
└── Domain AI Embedded Architects (×5 — 1 per Pioneer Domain)
    (Dotted line to Domain COO, solid line to VP AI Platform)
\`\`\`

### 2. RACI for Agent Lifecycle

| Activity | Platform Eng | Domain Dev | ARB | Model Risk | Compliance | CISO |
|---|---|---|---|---|---|---|
| Agent Specification | C | R/A | I | C | C | I |
| Architecture Design | R/A | C | A | C | C | R |
| Security Design | C | I | I | I | I | R/A |
| Build & Integrate | C | R/A | I | I | I | I |
| Model Risk Validation | I | C | I | R/A | C | I |
| EU AI Act Classification | C | I | I | I | R/A | I |
| Production Deployment | R/A | C | I | I | I | C |
| Ongoing Monitoring | R | C | I | I | I | I |
| Incident Response | R/A | C | I | I | I | C |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

### 3. Pioneer Domain Business Processes

**Pioneer 1: Retail Credit Risk Agent**
- **AS-IS:** Manual underwriter reviews 120 applications/day; 3.2-day average decision time; 67% straight-through processing
- **TO-BE:** APEX agent handles initial analysis; underwriter reviews AI recommendation; decision in <4 hours; 92% STP target
- **Business Rules Engine:** Maximum £250K auto-approve; anything above escalates to human; all decisions logged for SR 11-7

**Pioneer 2: Corporate KYC Refresh Agent**
- **AS-IS:** Annual manual KYC refresh; 4.5 analyst-hours per corporate client; 8,200 clients; 36,900 analyst-hours/year
- **TO-BE:** Continuous automated monitoring; analyst reviews only flagged events; target 80% reduction in analyst time
- **Regulatory Hook:** FinCEN/FinTRAC/FCA reporting auto-generated by agent with human sign-off

### 4. Business Requirements Summary
| ID | Requirement | Priority | Source | Phase |
|---|---|---|---|---|
| BR-001 | Platform must support ≥120 concurrent agent interactions | Must | SLA Policy | Pioneer |
| BR-002 | Agent marketplace searchable by domain, risk tier, cost | Should | Developer NPS | GA |
| BR-003 | All agent decisions logged and queryable for 7 years | Must | DORA Art.11 | Pioneer |
| BR-004 | Chargeback reporting available monthly per cost centre | Must | Finance Policy | Pioneer |
| BR-005 | Self-service agent deployment in < 2 days for approved templates | Should | TTM Target | GA |
| BR-006 | EU AI Act risk classification automated at intake | Must | EU AI Act | Pioneer |`,
      },
    ],
  },
  {
    id: "c",
    label: "Phase C — Information Systems",
    icon: "🗄️",
    tag: "IS ARCH",
    color: C.phase.c,
    tagline: "Design the data & application layer",
    overview:
      "Phase C covers both Data Architecture and Application Architecture for APEX. We define how data flows between the NexaBank Data Mesh and AI agents, the application components that make up the APEX platform, and the API contracts between systems. This phase is the heart of the technical design.",
    activities: [
      "Define Data Architecture: entities, flows, lineage, classification",
      "Design data integration patterns (Data Mesh → Agent Core)",
      "Model application components (ArchiMate / C4)",
      "Define API catalogue and integration standards",
      "Specify Knowledge Base architecture (RAG design)",
      "Define agent memory and state management patterns",
      "Produce Application Architecture Baseline and Target",
    ],
    documents: [
      {
        title: "Data Architecture Document",
        id: "DAD-APEX-001",
        content: `# Data Architecture Document
## APEX | NexaBank Global | DAD-APEX-001 | v1.3

### 1. Data Classification Framework (APEX-specific)
| Class | Description | Examples | Bedrock Guardrails | Retention |
|---|---|---|---|---|
| C4 — Highly Restricted | PII + Financial data | Customer NI, account balances | DENY in logs; tokenise in prompts | 7 years |
| C3 — Confidential | Internal business data | Credit models, risk parameters | Redact in traces | 5 years |
| C2 — Internal | Non-sensitive operational data | Agent performance metrics | Standard | 3 years |
| C1 — Public | Regulatory/market data | FCA rules, market rates | None | Indefinite |

### 2. Data Flow Architecture — Pioneer Domain: Credit Risk Agent

\`\`\`
[NexaBank Data Mesh]                [APEX Platform]              [Output]
        │                                   │
[Retail Domain Data Product]                │
│  • Customer Profile DP          ┌─────────▼──────────┐
│  • Credit History DP      ──────► Bedrock Knowledge   │
│  • Behaviour Signals DP         │ Base (OpenSearch)   │
│  (Glue Catalog + S3)            │ Chunked + Embedded  │
│                                 │ (Titan Embeddings)  │
│                                 └─────────┬──────────┘
│                                           │ RAG retrieval
│                                 ┌─────────▼──────────┐
[Real-time Event Stream]          │ Credit Risk Agent   │
│  • Application events     ──────► (Bedrock Claude 3.5)│
│  (Kinesis Data Streams)         │ + Tools:            │
│                                 │  - CreditScoreTool  │
│                                 │  - PolicyLookupTool │
│                                 │  - EscalateTool     │
│                                 └─────────┬──────────┘
│                                           │
│                                 ┌─────────▼──────────┐
[Regulatory Reference Data]       │ Bedrock Guardrails  │
│  • Basel III rules        ──────► • PII filter        │
│  • FCA handbook (PDF)           │ • Hate speech filter│
│  (Bedrock KB — static)          │ • Grounding check   │
│                                 └─────────┬──────────┘
│                                           │
│                                 ┌─────────▼──────────┐
│                                 │ Human Loop (A2I)    │◄── if confidence < 85%
│                                 │ Underwriter Review  │    or amount > £250K
│                                 └─────────┬──────────┘
│                                           │
│                                 ┌─────────▼──────────┐
│                                 │ Decision Output     │──► Core Banking (API)
│                                 │ • Decision          │──► Audit Log (S3/WORM)
│                                 │ • Explanation       │──► Regulatory Report
│                                 │ • Confidence score  │──► Customer Comms
│                                 └────────────────────┘
\`\`\`

### 3. Data Entities (Canonical Model)

**Agent Interaction Record (C3)**
\`\`\`json
{
  "interactionId": "uuid",
  "agentId": "apex-credit-risk-v2.1",
  "sessionId": "uuid",
  "timestamp": "ISO8601",
  "inputTokens": 1847,
  "outputTokens": 423,
  "modelId": "anthropic.claude-3-5-sonnet-20241022-v2:0",
  "traceId": "xray-trace-id",
  "costUSD": 0.0234,
  "guardrailsTriggered": false,
  "humanLoopTriggered": true,
  "humanLoopReason": "amount_exceeds_threshold",
  "decision": "APPROVED_PENDING_HUMAN",
  "confidenceScore": 0.73,
  "dataClassification": "C4",
  "jurisdictionCode": "GB"
}
\`\`\`

### 4. Knowledge Base Design

**KB-001: Credit Policy Knowledge Base**
- Source: FCA Handbook (mortgages, consumer credit) — 2,847 pages
- Source: NexaBank Credit Policy Manual v12.3 — 423 pages
- Source: Basel III RWA calculation guides
- Chunking: Recursive, 512 tokens, 10% overlap
- Embedding: Amazon Titan Embeddings v2 (1,536 dimensions)
- Vector Store: OpenSearch Serverless (AOSS) — eu-west-1
- Refresh cadence: Nightly for internal; weekly for regulatory
- Metadata filters: policy_version, jurisdiction, effective_date

**KB-002: Customer Segment Knowledge Base**
- Source: NexaBank Retail Data Product (anonymised, aggregated)
- Access pattern: Retrieval-only; PII never stored in KB
- Refresh cadence: T+1 daily batch

### 5. Data Residency Map
| Region | Data Types Processed | AWS Services | Regulatory Basis |
|---|---|---|---|
| eu-west-1 (Ireland) | UK/EU customer data | Bedrock, AOSS, S3 | GDPR, UK GDPR |
| us-east-1 (N. Virginia) | US institutional data | Bedrock, AOSS, S3 | CCPA, FinCEN |
| ap-southeast-1 (Singapore) | APAC customer data | Bedrock, AOSS, S3 | PDPA, MAS TRM |
| eu-central-1 (Frankfurt) | German banking data | Bedrock, AOSS, S3 | GDPR + BaFin |`,
      },
      {
        title: "Application Architecture Document",
        id: "AAD-APEX-001",
        content: `# Application Architecture Document
## APEX | NexaBank Global | AAD-APEX-001 | v1.4

### 1. Application Component Model (C4 — Container Level)

\`\`\`
┌──────────────────────── APEX PLATFORM ────────────────────────────┐
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  APEX DEVELOPER PORTAL (React SPA + API Gateway)            │  │
│  │  • Agent Marketplace browse/search                          │  │
│  │  • Agent Onboarding Wizard (guided)                         │  │
│  │  • Cost & Usage Dashboard                                   │  │
│  │  • Documentation Hub (auto-generated from agent metadata)   │  │
│  └─────────────────────────────┬───────────────────────────────┘  │
│                                │ REST API                          │
│  ┌─────────────────────────────▼───────────────────────────────┐  │
│  │  APEX CONTROL PLANE (ECS Fargate — Python FastAPI)          │  │
│  │  • Agent Registry Service: CRUD for agent definitions       │  │
│  │  • Onboarding Orchestrator: manages intake workflow         │  │
│  │  • Policy Engine: evaluates EU AI Act risk tier             │  │
│  │  • Chargeback Service: computes cost allocation             │  │
│  │  • Notification Service: events → SES/SNS → stakeholders   │  │
│  └──────┬──────────────────┬──────────────────┬───────────────┘  │
│         │                  │                  │                    │
│  ┌──────▼──────┐  ┌────────▼────────┐  ┌─────▼──────────────┐   │
│  │ AWS BEDROCK │  │ STEP FUNCTIONS  │  │ HUMAN LOOP (A2I)   │   │
│  │ AGENT CORE  │  │ ORCHESTRATION   │  │ Review Portal       │   │
│  │             │  │                 │  │ (for escalations)   │   │
│  │ • Agents    │  │ • Multi-agent   │  │                     │   │
│  │ • KBs       │  │   workflows     │  │ Underwriter UI      │   │
│  │ • Guardrails│  │ • Error handling│  │ Analyst UI          │   │
│  │ • Flows     │  │ • Retry logic   │  │                     │   │
│  └──────┬──────┘  └────────┬────────┘  └─────────────────────┘   │
│         │                  │                                       │
│  ┌──────▼──────────────────▼────────────────────────────────────┐ │
│  │  TOOL LAMBDA LAYER (AWS Lambda — Python 3.12)                │ │
│  │  • CoreBankingTool: read account/customer data               │ │
│  │  • CreditScoreTool: call Experian/Equifax APIs               │ │
│  │  • PolicyLookupTool: query regulatory knowledge bases        │ │
│  │  • AuditLogTool: write immutable decision records            │ │
│  │  • NotificationTool: trigger downstream comms                │ │
│  │  • EscalateTool: create Human Loop task                      │ │
│  └──────┬────────────────────────────────────────────────────────┘ │
│         │                                                           │
│  ┌──────▼───────────────────────────────────────────────────────┐  │
│  │  DATA & PERSISTENCE LAYER                                    │  │
│  │  PostgreSQL (RDS) │ OpenSearch (AOSS) │ S3 (WORM) │ DynamoDB│  │
│  │  Agent Registry   │ Vector Store      │ Audit Logs │ Sessions│  │
│  └──────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
\`\`\`

### 2. API Catalogue (APEX Internal APIs)

| API | Version | Pattern | Auth | SLA |
|---|---|---|---|---|
| Agent Registry API | v2 | REST/JSON | OAuth2 + APEX scope | 99.9% / p99 <200ms |
| Agent Invocation API | v1 | REST + SSE (streaming) | IAM SigV4 | 99.95% / p99 <3s |
| Knowledge Base API | v1 | REST/JSON | IAM SigV4 | 99.9% / p99 <500ms |
| Onboarding API | v1 | REST/JSON | OAuth2 | 99.5% / p99 <1s |
| Observability API | v1 | REST/JSON + WebSocket | OAuth2 | 99.5% |
| Chargeback API | v1 | REST/JSON | mTLS | 99.9% |

### 3. Integration Patterns with Data Mesh

**Pattern A: Pull-on-Invoke (Real-time RAG)**
- Agent pulls from knowledge base during inference
- Latency: <200ms per retrieval
- Use cases: Policy lookup, product information

**Pattern B: Push-on-Change (Streaming)**
- Kinesis Data Streams → Lambda → Agent memory update
- Latency: Near real-time (<5s)
- Use cases: Market data, fraud signals, AML watchlist

**Pattern C: Batch Sync (Scheduled Refresh)**
- AWS Glue ETL → S3 → Bedrock KB sync
- Frequency: Nightly T+1
- Use cases: Customer profiles, transaction history

### 4. Application Constraints
- All Lambda functions must be in private VPC subnets
- No direct internet egress from tool lambdas; use PrivateLink/VPC endpoints
- Bedrock model invocations must use VPC endpoints (not public internet)
- All API responses >4KB must be streamed (SSE/chunked)`,
      },
    ],
  },
  {
    id: "d",
    label: "Phase D — Technology",
    icon: "⚙️",
    tag: "TECH",
    color: C.phase.d,
    tagline: "Build the infrastructure blueprint",
    overview:
      "Phase D specifies the complete Technology Architecture for APEX on AWS. This includes the multi-region AWS infrastructure design, networking, security controls, AWS Agent Core configuration, CI/CD pipelines, and the operational model. This is the most detailed technical phase.",
    activities: [
      "Define multi-region AWS infrastructure topology",
      "Specify AWS Agent Core service configuration",
      "Design network architecture (VPC, PrivateLink, Transit Gateway)",
      "Define security architecture (IAM, KMS, GuardDuty, Macie)",
      "Design CI/CD pipeline for agent deployment",
      "Specify observability stack (CloudWatch, X-Ray, OpenTelemetry)",
      "Define disaster recovery and business continuity architecture",
      "Produce Technology Architecture Document and Infrastructure-as-Code standards",
    ],
    documents: [
      {
        title: "Technology Architecture Document",
        id: "TAD-APEX-001",
        content: `# Technology Architecture Document
## APEX | NexaBank Global | TAD-APEX-001 | v2.0

### 1. Multi-Region Infrastructure Topology

\`\`\`
                    ┌──────────────────────────────────────────────┐
                    │        NEXABANK GLOBAL APEX                  │
                    │         AWS Multi-Region Design              │
                    └──────────────────────────────────────────────┘

┌─── eu-west-1 (PRIMARY — UK/EU) ──────────────────────────────────┐
│                                                                   │
│  ┌── VPC: 10.50.0.0/16 ─────────────────────────────────────┐   │
│  │  ┌─── AZ-A ──────────┐   ┌─── AZ-B ──────────┐          │   │
│  │  │ Private Subnet     │   │ Private Subnet     │          │   │
│  │  │ 10.50.1.0/24      │   │ 10.50.2.0/24      │          │   │
│  │  │                   │   │                   │          │   │
│  │  │ ECS Fargate       │   │ ECS Fargate       │          │   │
│  │  │ (Control Plane)   │   │ (Control Plane)   │          │   │
│  │  │                   │   │                   │          │   │
│  │  │ Lambda (Tools)    │   │ Lambda (Tools)    │          │   │
│  │  └──────┬────────────┘   └──────┬────────────┘          │   │
│  │         │  VPC Endpoints        │                        │   │
│  │         ▼                       ▼                        │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │  AWS Service VPC Endpoints (PrivateLink)         │    │   │
│  │  │  • bedrock-runtime    • bedrock-agent           │    │   │
│  │  │  • s3                 • opensearchserverless    │    │   │
│  │  │  • kms                • secretsmanager          │    │   │
│  │  │  • rds                • sqs / sns / kinesis     │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  │                                                          │   │
│  │  ┌── Data Layer (Multi-AZ) ───────────────────────┐     │   │
│  │  │  RDS Aurora PostgreSQL (Multi-AZ)              │     │   │
│  │  │  OpenSearch Serverless (AOSS) — 3-AZ           │     │   │
│  │  │  S3 (WORM — Object Lock, CRR to eu-central-1) │     │   │
│  │  │  DynamoDB Global Tables (eu-west-1 primary)    │     │   │
│  │  └────────────────────────────────────────────────┘     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  Bedrock Models Available: Claude 3.5 Sonnet, Claude 3 Haiku,   │
│  Titan Embeddings v2, Titan Text Express                         │
└───────────────────────────────────────────────────────────────────┘
        │ AWS Transit Gateway (TGW)              │ AWS TGW
        │ + Direct Connect to NexaBank DC        │
        ▼                                        ▼
┌─── us-east-1 (US INSTITUTIONAL) ──┐  ┌─── ap-southeast-1 (APAC) ──┐
│  (Mirror of eu-west-1 topology)    │  │  (Mirror of eu-west-1)       │
│  DynamoDB Global Table replica     │  │  DynamoDB Global Table replica│
│  S3 CRR from eu-west-1             │  │  Regional Bedrock models      │
└────────────────────────────────────┘  └──────────────────────────────┘

### 2. AWS Agent Core Configuration

**Bedrock Agents — Supervisor Agent (APEX Orchestrator)**
\`\`\`yaml
agent_name: apex-orchestrator-v2
foundation_model: anthropic.claude-3-5-sonnet-20241022-v2:0
instruction: |
  You are the APEX orchestration agent for NexaBank Global.
  Your role is to:
  1. Understand the business request from the calling application
  2. Route to the appropriate specialist sub-agent
  3. Aggregate results and ensure compliance checks pass
  4. Escalate to human review when confidence < 85% or policy thresholds exceeded

  Always cite your reasoning. Never fabricate data.
  If uncertain, escalate immediately.

idle_session_ttl: 1800  # 30 minutes
memory_configuration:
  enabled_memory_types:
    - SESSION_SUMMARY  # Cross-turn context
knowledge_bases:
  - knowledge_base_id: "KB-APEX-POLICY-001"
    description: "NexaBank policies, regulatory rules, and procedures"
action_groups:
  - name: "ComplianceActions"
    lambda_arn: "arn:aws:lambda:eu-west-1:123456789:function:apex-compliance-tools"
  - name: "EscalationActions"
    lambda_arn: "arn:aws:lambda:eu-west-1:123456789:function:apex-escalation-tools"
guardrail_configuration:
  guardrail_id: "apex-guardrail-prod"
  guardrail_version: "3"
\`\`\`

**Bedrock Guardrails Configuration**
\`\`\`yaml
guardrail_name: apex-production-guardrails
content_policy_config:
  filters_config:
    - type: FINANCIAL_FRAUD
      input_strength: HIGH
      output_strength: HIGH
    - type: HATE
      input_strength: HIGH
      output_strength: HIGH
sensitive_information_policy:
  pii_entities_config:
    - type: CREDIT_DEBIT_CARD_NUMBER
      action: ANONYMIZE
    - type: UK_NATIONAL_INSURANCE_NUMBER
      action: BLOCK
    - type: BANK_ACCOUNT_NUMBER
      action: ANONYMIZE
  regexes_config:
    - name: SORT_CODE
      pattern: "\\d{2}-\\d{2}-\\d{2}"
      action: ANONYMIZE
grounding_policy_config:
  threshold: 0.75  # Reject responses not grounded in retrieved context
\`\`\`

### 3. Security Architecture

**Identity & Access Management**
| Principal | Authentication | Authorisation | MFA |
|---|---|---|---|
| Human operators | AWS SSO + NexaBank IdP (SAML) | IAM Identity Centre | TOTP mandatory |
| APEX Control Plane (ECS) | IAM Role (task role) | Least-privilege per service | N/A (service) |
| Tool Lambdas | IAM Role (execution role) | Bedrock + specific tools only | N/A |
| Domain Dev Teams | AWS SSO + dev profile | Read-only prod; full non-prod | TOTP mandatory |
| CI/CD Pipeline | OIDC (GitHub Actions) | Deploy to non-prod only | N/A |

**Encryption**
- At rest: KMS Customer Managed Keys (CMK) per data classification tier
- In transit: TLS 1.3 minimum; no TLS 1.0/1.1
- Bedrock: All model requests over HTTPS/PrivateLink
- Knowledge Bases: AOSS encryption with CMK
- Secrets: AWS Secrets Manager (rotated every 90 days)

### 4. CI/CD Pipeline for Agent Deployment
\`\`\`
[Developer Commits Agent Config] → [GitHub PR]
         ↓
[GitHub Actions CI]
  ├── Lint & format check (yamllint, cfn-lint)
  ├── Unit tests (prompt regression tests)
  ├── OWASP dependency check
  └── Terraform plan (non-prod)
         ↓
[Peer Review + Automated ARB Policy Check]
         ↓
[Non-prod Deployment]
  ├── Deploy Bedrock agent + KB to APEX-DEV
  ├── Run automated evaluation suite (RAGAS metrics)
  ├── Run Bedrock Guardrail test suite
  └── Latency + cost benchmark
         ↓
[Model Risk Validation Gate] ← Manual approval in ADO
         ↓
[Production Deployment]
  ├── Terraform apply (Blue environment)
  ├── Smoke tests
  ├── Traffic shift: 10% → 50% → 100% (canary)
  └── CloudWatch Alarm monitoring (auto-rollback trigger)
         ↓
[Post-Deploy]
  ├── Cost tags verified
  ├── Dashboard published to stakeholders
  └── DORA evidence record created
\`\`\`

### 5. Observability Architecture
- **Traces:** AWS X-Ray + OpenTelemetry → Datadog APM (agent reasoning chains)
- **Metrics:** CloudWatch Metrics + custom namespace APEX/AgentMetrics
- **Logs:** CloudWatch Logs → S3 (30-day hot, 7-year cold/Glacier)
- **Bedrock Model Invocation Logging:** Enabled → CloudWatch → WORM S3
- **Dashboards:** CloudWatch + Datadog (agent latency, token cost, error rate, human escalation rate)
- **Alerting:** PagerDuty integration; SEV1 = 5-min SLO breach; SEV2 = 30-min`,
      },
    ],
  },
  {
    id: "e",
    label: "Phase E — Opportunities",
    icon: "🗺️",
    tag: "OPPS",
    color: C.phase.e,
    tagline: "Identify the path forward",
    overview:
      "Phase E identifies opportunities and solutions that deliver the Target Architecture. We define Solution Building Blocks (SBBs) from Architecture Building Blocks (ABBs), create the Architecture Roadmap with transition states, and package work into implementable chunks. This phase bridges architecture vision with delivery.",
    activities: [
      "Review and confirm gaps from Phases B, C, D",
      "Identify Solution Building Blocks (SBBs) — what we build/buy/reuse",
      "Define Architecture Roadmap with transition architectures",
      "Package capabilities into work packages (epics in ADO)",
      "Define implementation constraints and dependencies",
      "Conduct risk assessment with mitigation strategies",
      "Evaluate build vs buy for each SBB",
    ],
    documents: [
      {
        title: "Architecture Roadmap",
        id: "ROAD-APEX-001",
        content: `# Architecture Roadmap
## APEX | NexaBank Global | ROAD-APEX-001 | v2.1

### Transition Architecture Overview

\`\`\`
BASELINE          T-ARCH 1            T-ARCH 2            TARGET
(Today)           (Q3 2025)           (Q2 2026)           (Q4 2026)
─────────         ─────────           ─────────           ─────────
23 siloed       APEX Foundation     APEX Growth         APEX at Scale
AI tools        + 2 Pioneers        + 3 More            Full Platform
                                    Pioneers            Economics
\`\`\`

### Horizon 1: Foundation (2025 Q1–Q3)
**Theme:** Build the platform, prove the value with 2 Pioneer Domains

| Work Package | WP-ID | Capability Delivered | Team | Duration |
|---|---|---|---|---|
| APEX Core Infrastructure | WP-001 | Multi-region AWS backbone, VPC, IAM | Platform Eng | 8 weeks |
| Bedrock Agent Core Setup | WP-002 | Supervisor agent, guardrails, KB foundation | AI Eng | 6 weeks |
| Developer Portal MVP | WP-003 | Agent registry, basic marketplace | DevX | 8 weeks |
| CI/CD Pipeline | WP-004 | Agent deployment pipeline | Platform Eng | 4 weeks |
| Pioneer 1: Credit Risk Agent | WP-005 | Retail AI underwriting | Domain + AI Eng | 10 weeks |
| Pioneer 2: KYC Refresh Agent | WP-006 | Corporate KYC automation | Domain + AI Eng | 10 weeks |
| Observability Stack | WP-007 | CloudWatch + Datadog + X-Ray | SRE | 4 weeks |
| Security Baseline | WP-008 | IAM, KMS, GuardDuty, Macie | Security | 6 weeks |

**Exit criteria H1:** Pioneer agents in production; platform 99.95% SLA proven; DORA ICT gap closed to 15

### Horizon 2: Growth (2025 Q4 – 2026 Q2)
**Theme:** Onboard 3 more Pioneers; build self-service capability

| Work Package | WP-ID | Capability | Duration |
|---|---|---|---|
| Pioneer 3: Portfolio Rebalancing | WP-009 | Wealth AI recommendations | 10 weeks |
| Pioneer 4: IT Incident Response | WP-010 | Ops automation (DORA) | 8 weeks |
| Pioneer 5: Model Monitoring | WP-011 | Risk AI operations | 8 weeks |
| Self-Service Onboarding | WP-012 | Guided wizard, template library | 8 weeks |
| Multi-Agent Orchestration | WP-013 | Swarm patterns, Step Functions | 6 weeks |
| FinOps Dashboard | WP-014 | Cost allocation, chargeback | 4 weeks |
| EU AI Act Compliance Pack | WP-015 | Risk classification, audit trail | 6 weeks |

### Horizon 3: Scale (2026 Q3–Q4)
**Theme:** Platform economics, cross-domain agents, external exposure

| Initiative | Description | Strategic Value |
|---|---|---|
| Agent-to-Agent Federation | Cross-domain orchestration (Retail + Risk agents) | $5.2M NPV |
| External Agent API | Partner bank access to select APEX capabilities | $3.1M revenue |
| Agent Versioning & A/B | Blue-green per agent, performance comparison | 20% efficiency |
| Advanced Memory | Long-term agent memory across sessions | Customer experience |
| Autonomous Agents Research | Proof of concept for regulated auto-execution | Future growth |

### Critical Path Dependencies
\`\`\`
WP-001 (Infra) ──► WP-002 (Bedrock) ──► WP-005 (Pioneer 1)
                                     └──► WP-006 (Pioneer 2)
WP-004 (CI/CD) ──► WP-005, WP-006
WP-008 (Security) ──► ALL workstreams (mandatory gate)
WP-007 (Observability) ──► WP-005 (must be live before Pioneer 1 go-live)
\`\`\``,
      },
      {
        title: "Solution Building Blocks (SBBs)",
        id: "SBB-APEX-001",
        content: `# Solution Building Blocks Catalogue
## APEX | NexaBank Global | SBB-APEX-001 | v1.2

### Build vs Buy vs Reuse Decision Matrix

| SBB | ABB Mapped To | Decision | Rationale | Vendor/Tool |
|---|---|---|---|---|
| SBB-001: Agent Orchestration Engine | ABB-AI-ORCH | **Buy (SaaS)** | AWS Agent Core is market-leading; 18-month build avoided | AWS Bedrock Agents |
| SBB-002: Foundation Models | ABB-AI-FM | **Buy (SaaS)** | No competitive advantage in training; safety-tuned models required | Anthropic Claude 3.5 via Bedrock |
| SBB-003: Vector Store | ABB-DATA-VECTOR | **Buy (Managed)** | Operational overhead of self-managed OpenSearch unjustifiable | AWS OpenSearch Serverless |
| SBB-004: Agent Control Plane | ABB-PLATFORM-CP | **Build** | NexaBank-specific workflow, governance, chargeback logic | Python FastAPI on ECS Fargate |
| SBB-005: Developer Portal | ABB-PLATFORM-DX | **Build** | Custom marketplace taxonomy and NexaBank branding | React + AWS Amplify |
| SBB-006: Human Loop UI | ABB-AI-HITL | **Buy + Extend** | AWS A2I provides base; custom UX for underwriters | AWS Augmented AI (A2I) + custom React |
| SBB-007: Observability | ABB-OPS-OBS | **Reuse + Extend** | NexaBank has Datadog enterprise licence; extend with Bedrock metrics | Datadog + CloudWatch |
| SBB-008: CI/CD Pipeline | ABB-DEVOPS-CICD | **Reuse** | NexaBank standard GitHub Actions + ADO; extend for agent testing | GitHub Actions + Terraform |
| SBB-009: Identity & Access | ABB-SEC-IAM | **Reuse** | NexaBank AWS SSO already deployed; extend with APEX-specific roles | AWS IAM Identity Centre |
| SBB-010: Tool Lambda Library | ABB-AI-TOOLS | **Build** | Domain-specific tools (CoreBankingTool, CreditScoreTool) are proprietary | AWS Lambda (Python 3.12) |
| SBB-011: Guardrails Configuration | ABB-AI-SAFETY | **Buy + Configure** | Bedrock Guardrails covers most needs; FS-specific regex patterns added | AWS Bedrock Guardrails |
| SBB-012: Compliance Reporting | ABB-GOV-COMP | **Build** | EU AI Act + DORA reporting requirements are NexaBank-specific | Python + AWS QuickSight |

### SBB Detail: SBB-004 Agent Control Plane

**Purpose:** Central management API for all APEX platform operations
**Components:**
- Agent Registry Service: stores agent metadata, versions, owners, SLA tiers
- Onboarding Orchestrator: Step Functions workflow for new agent intake
- Policy Engine: evaluates EU AI Act risk classification rules
- Chargeback Service: computes per-agent cost allocation monthly
- Notification Service: event-driven stakeholder comms

**Technology Stack:**
- Runtime: Python 3.12 / FastAPI
- Deployment: ECS Fargate (Spot + On-Demand mix)
- Database: Aurora PostgreSQL Serverless v2
- API Gateway: AWS API Gateway (REST) + WAF
- Infrastructure: Terraform v1.6+ (NexaBank IaC standard)

**Non-functional requirements:**
- Availability: 99.9% (control plane can tolerate brief outages; agents function independently)
- RTO: 4 hours | RPO: 1 hour
- Max response time: p99 < 500ms

### Risk Register (Phase E)
| ID | Risk | Probability | Impact | Mitigation |
|---|---|---|---|---|
| R-001 | AWS Bedrock model availability in eu-west-1 | Medium | High | Cross-region fallback to eu-central-1; Claude 3 Haiku as fallback model |
| R-002 | Regulatory rejection of autonomous AI decisions | High | Critical | Human-in-Loop mandatory for all financial decisions >£10K; phased autonomy approach |
| R-003 | Domain teams slow to adopt self-service | Medium | Medium | InnerSource evangelism; dedicated DevRel; ARB mandate for new AI projects |
| R-004 | Bedrock token cost overrun | Medium | High | Budget alerts at 80%; automatic throttling; FinOps review gate |
| R-005 | Prompt injection attacks via agent tools | High | Critical | Input sanitisation Lambda wrapper; Bedrock Guardrails; penetration testing quarterly |
| R-006 | Knowledge base hallucination in regulated decisions | Medium | Critical | Grounding threshold 0.75; all responses audited; SHAP explanations mandatory |`,
      },
    ],
  },
  {
    id: "f",
    label: "Phase F — Migration",
    icon: "🚀",
    tag: "MIGRATE",
    color: C.phase.f,
    tagline: "Plan the implementation journey",
    overview:
      "Phase F produces the detailed Implementation and Migration Plan for APEX. We prioritise projects, assign resources, define dependencies, and establish the governance checkpoints that will be used throughout delivery. This is the bridge from architecture to programme management.",
    activities: [
      "Confirm implementation priority of work packages",
      "Assign implementation responsibilities and resource plan",
      "Establish project funding and cost baseline",
      "Define migration approach for existing siloed AI tools",
      "Produce Implementation & Migration Plan",
      "Identify risks to implementation and create mitigation plans",
      "Establish benefits realisation tracking",
    ],
    documents: [
      {
        title: "Implementation & Migration Plan",
        id: "IMP-APEX-001",
        content: `# Implementation & Migration Plan
## APEX | NexaBank Global | IMP-APEX-001 | v1.5

### 1. Programme Governance Structure
\`\`\`
APEX Steering Committee (Monthly)
│  Chair: Group CTO (Sarah Chen)
│  Members: Domain COOs, CRO, CDO, CISO, CFO
│
├── APEX Architecture Board (Bi-weekly)
│   Chair: Enterprise Architect
│   Members: Domain Architects, Security Arch, Data Arch
│
├── APEX Programme Board (Weekly)
│   Chair: VP AI Platform (Marcus Webb)
│   Members: Workstream Leads, SRE Lead, Compliance Liaison
│
└── Domain Integration Squads (per Pioneer Domain)
    Embedded Architect + Domain Dev Team
\`\`\`

### 2. Implementation Timeline

\`\`\`
2025 Q1        Q2              Q3              Q4           2026 Q1   Q2
───────────────────────────────────────────────────────────────────────
FOUNDATION PHASE ────────────────────────────────►
WP-001 Infra   ████
WP-004 CI/CD       ██
WP-008 Security    ████
WP-002 Bedrock         ████
WP-007 Obs                 ██
WP-003 Portal              ████████
WP-005 Pioneer 1               ████████████
WP-006 Pioneer 2               ████████████
                                             GROWTH PHASE ──────────────►
WP-009 Pioneer 3                             ████████████
WP-010 Pioneer 4                             ██████████
WP-011 Pioneer 5                             ██████████
WP-012 Self-Svc                                         ████████
WP-013 MultiAgent                                       ██████
WP-014 FinOps                                           ████
WP-015 EU AI Act                             ████████████████████
\`\`\`

### 3. Migration Strategy for Existing Siloed AI Tools

**Migration Taxonomy:**
- **Adopt:** Tool already on AWS; migrate config to APEX governance (8 tools)
- **Adapt:** Tool works well but needs APEX integration layer (6 tools)
- **Replace:** Tool duplicates APEX capability; decommission (7 tools)
- **Retire:** Tool is unused/low-value; immediate decommission (2 tools)

| BU | Tool | Status | Migration Path | Target Date |
|---|---|---|---|---|
| Retail | CreditBot v1 (Lambda) | Adopt | Wrap in APEX tool framework; add guardrails | Q3 2025 |
| Corporate | KYCMatcher (SageMaker) | Adapt | Expose as APEX tool; APEX orchestrates | Q4 2025 |
| Wealth | PortfolioAI (GPT-4 direct) | Replace | APEX Pioneer 3 replaces fully | Q1 2026 |
| Risk | ModelWatcher (Python cron) | Replace | APEX Pioneer 5 replaces fully | Q1 2026 |
| Operations | TicketBot (Bedrock direct) | Adopt | Onboard to APEX registry; add observability | Q3 2025 |

**Decommission Protocol:**
1. New APEX agent goes live (parallel run minimum 4 weeks)
2. Traffic shift: 20% APEX → 50% → 100% (2-week steps)
3. Validate: zero regressions in KPIs, decisions, SLA
4. Legacy shutdown: final audit log snapshot → WORM archive
5. Cost savings tracked and reported to steering committee

### 4. Resource Plan

| Role | FTE Required | Source | Start |
|---|---|---|---|
| Platform Engineer | 6 | Internal (3) + Contractor (3) | Q1 2025 |
| AI/ML Engineer | 4 | Internal (2) + AWS PS (2) | Q1 2025 |
| Domain Architects | 5 | Internal (reassigned) | Q2 2025 |
| Security Architect | 1 | Internal | Q1 2025 |
| SRE / FinOps | 3 | Internal (2) + Contractor (1) | Q2 2025 |
| DevX Engineer | 2 | Internal | Q2 2025 |
| Compliance Analyst (AI) | 2 | New hire | Q2 2025 |
| Programme Manager | 1 | Internal | Q1 2025 |

**Total: ~24 FTE; Blended rate: £165K/yr average**
**Architecture workstream cost: £2.4M (FY2025)**

### 5. Benefits Realisation Tracking

| Benefit | KPI | Baseline | Target | Tracking Cadence | Owner |
|---|---|---|---|---|---|
| Faster AI delivery | Time-to-market (months) | 9.2 | 2.5 | Quarterly | VP AI Platform |
| Reduced waste | Duplicated AI spend | $14M | $3M | Monthly (FinOps) | CFO delegate |
| Improved compliance | DORA ICT gaps | 47 | 0 | Quarterly (Audit) | Compliance |
| Developer satisfaction | Developer NPS | -12 | 55 | Bi-annual survey | DevX Lead |
| Platform adoption | Agents in production | 23 | 120 | Monthly | VP AI Platform |
| Incident resilience | MTTR for AI incidents | 6.3h | <30min | Monthly | SRE Lead |`,
      },
    ],
  },
  {
    id: "g",
    label: "Phase G — Governance",
    icon: "⚖️",
    tag: "GOVERN",
    color: C.phase.g,
    tagline: "Govern the implementation",
    overview:
      "Phase G ensures the implementation of APEX conforms to the approved architecture. We produce Architecture Contracts with delivery teams, conduct compliance reviews at each milestone, and establish the Architecture Board as a living governance body throughout delivery.",
    activities: [
      "Confirm scope and priorities with programme team",
      "Identify deployment resources and skills",
      "Guide development of solutions deployment",
      "Perform enterprise architecture compliance reviews",
      "Implement business and IT operations",
      "Perform post-implementation review",
      "Publish Architecture Contract for each work package",
    ],
    documents: [
      {
        title: "Architecture Contract — Platform Foundation",
        id: "AC-APEX-001",
        content: `# Architecture Contract
## APEX Platform Foundation | WP-001 to WP-008
## NexaBank Global | AC-APEX-001 | v1.0 | SIGNED

---
*This contract is entered into between the APEX Architecture Board (hereafter "Architecture Authority") and the APEX Platform Engineering Team (hereafter "Implementation Team") in respect of the delivery of the APEX Platform Foundation workstream.*

### 1. Scope of Work
The Implementation Team will deliver:
- Multi-region AWS infrastructure (eu-west-1 primary, us-east-1, ap-southeast-1)
- AWS Bedrock Agent Core configuration (supervisor agent, guardrails v1)
- Developer Portal MVP (agent registry + basic search)
- CI/CD pipeline for agent deployment
- Security baseline (IAM, KMS, GuardDuty, Macie, WAF)
- Observability stack (CloudWatch + Datadog + X-Ray integration)

### 2. Conformance Requirements
The Implementation Team confirms all deliverables will conform to:

**Architecture Standards:**
- [ ] APEX Architecture Definition Document (ADD-APEX-001 v1.4)
- [ ] NexaBank Cloud Architecture Standards v3.2
- [ ] AWS Well-Architected Framework (FinServ Lens) — all pillars Pass
- [ ] NexaBank API Design Standards v3.2 (REST + OpenAPI 3.1)

**Security Standards:**
- [ ] APEX Security Architecture (TAD-APEX-001 Section 3)
- [ ] NexaBank Information Security Policy v8.0
- [ ] CIS AWS Foundations Benchmark Level 2
- [ ] NIST AI RMF — Govern function requirements

**Regulatory Standards:**
- [ ] DORA Article 11 ICT Risk Management requirements
- [ ] GDPR Article 25 (Privacy by Design) for all data flows
- [ ] EU AI Act Article 9 (Risk Management System) for High-Risk AI
- [ ] NexaBank Model Risk Policy v5.0 (aligned SR 11-7)

**Operational Standards:**
- [ ] APEX SLA targets: 99.95% availability, p99 <3s agent response
- [ ] DR/RTO: 4 hours | RPO: 1 hour for Tier-1 agents
- [ ] Backup: Daily snapshots, 35-day retention, cross-region copy
- [ ] Runbook: Complete operational runbooks before go-live

### 3. Architecture Review Points
| Milestone | Review Type | Approver | Criteria |
|---|---|---|---|
| Infrastructure deployed to non-prod | Technical Design Review | Lead Architect | IaC peer-reviewed, security scan passed |
| Security controls implemented | Security Architecture Review | CISO delegate | No HIGH/CRITICAL findings |
| Pioneer agent deployed to UAT | Solution Conformance Review | ARB | Architecture conformance checklist (14 items) |
| Production readiness | Production Gate Review | Steering Committee | All conformance criteria met, DR tested |
| 30 days post go-live | Post-Implementation Review | ARB | SLA met, no P1 incidents, cost within 10% budget |

### 4. Architecture Deviations Process
Any deviation from the approved architecture must:
1. Be documented in the Architecture Deviation Log (ADL-APEX) within 24 hours of discovery
2. Include: reason, impact assessment, risk, proposed mitigations
3. Be reviewed at the next ARB session (within 5 business days)
4. Receive ARB sign-off (or exception approval from Group CTO if urgent)

### 5. Approved Architecture Deviations (at signing)
| Dev-ID | Description | Approved Deviation | Risk | Approved By |
|---|---|---|---|---|
| DEV-001 | OpenSearch Serverless not available in ap-southeast-1 at time of design | Use OpenSearch Service (managed) for APAC region | Low — same capability | ARB-2025-0052 |

### 6. Signatures
| Role | Name | Date |
|---|---|---|
| Architecture Authority | Enterprise Architect | 2025-03-15 |
| Implementation Lead | Platform Engineering Lead | 2025-03-15 |
| Security Sign-off | CISO Delegate | 2025-03-15 |
| Programme Sponsor | VP AI Platform | 2025-03-15 |`,
      },
      {
        title: "Compliance Assessment Framework",
        id: "CAF-APEX-001",
        content: `# Architecture Compliance Assessment Framework
## APEX | NexaBank Global | CAF-APEX-001 | v1.1

### 1. Compliance Assessment Checklist

**Category A: Architecture Conformance (Must Pass)**
| # | Check | How Verified | Pass/Fail |
|---|---|---|---|
| A1 | All AWS resources tagged per tagging policy | Automated: AWS Config rule | — |
| A2 | Bedrock model invocations via VPC endpoint only | Automated: VPC flow logs analysis | — |
| A3 | No direct internet access from tool Lambdas | Automated: AWS Config + SecurityHub | — |
| A4 | KMS CMK encryption on all data stores | Automated: AWS Config | — |
| A5 | IAM roles follow least-privilege (no admin wildcards) | Manual: IAM Access Analyser review | — |
| A6 | Guardrails active on all production agents | Manual: Bedrock console + API check | — |
| A7 | Human Loop configured for high-stakes decisions | Manual: A2I workflow verification | — |
| A8 | Agent decision logs written to WORM S3 | Automated: S3 Object Lock verification | — |

**Category B: Security Compliance (Must Pass)**
| # | Check | How Verified |
|---|---|---|
| B1 | GuardDuty enabled in all regions | Automated: AWS Config |
| B2 | Macie scanning active on S3 buckets with PII | Automated: Macie findings dashboard |
| B3 | MFA enforced for all human operators | Automated: IAM credential report |
| B4 | Secrets Manager used (no hardcoded secrets) | Automated: AWS CodeGuru + Checkov |
| B5 | CloudTrail enabled with log file validation | Automated: AWS Config |
| B6 | WAF rules active on API Gateway | Manual: WAF console review |

**Category C: Regulatory Compliance (Must Pass)**
| # | Check | Regulation | How Verified |
|---|---|---|---|
| C1 | Data residency: EU data in EU regions only | GDPR Art. 46 | Automated: S3 bucket region check |
| C2 | Model explainability documented for production agents | EU AI Act Art. 13 | Manual: SageMaker Clarify report review |
| C3 | 72-hour incident notification process documented | DORA Art. 17 | Manual: Runbook review |
| C4 | AI risk tier documented for each agent | EU AI Act Art. 9 | Manual: Agent Registry review |
| C5 | Audit trail queryable for 7 years | DORA Art. 11 | Manual: S3 lifecycle policy + Athena query test |
| C6 | Model risk opinion obtained pre-production | SR 11-7 | Manual: Model Risk opinion document |

**Category D: Operational Compliance (Should Pass)**
| # | Check | Target | Threshold |
|---|---|---|---|
| D1 | Deployment via IaC (Terraform) only | 100% | <5% manual |
| D2 | Agent test coverage ≥80% | 80%+ | 70% minimum |
| D3 | Runbook completeness score | 100% sections | 90% minimum |
| D4 | Cost allocation tags on all resources | 100% | 95% minimum |
| D5 | DR failover tested in last 90 days | Quarterly | Bi-annual min |

### 2. Compliance Scoring Model
- Category A (8 checks): 0–100; Must achieve 100% to deploy
- Category B (6 checks): 0–100; Must achieve 100% to deploy
- Category C (6 checks): 0–100; Must achieve 100% for regulated agents
- Category D (5 checks): 0–100; Must achieve ≥80% for go-live

**Overall APEX Platform Score: [to be completed at each review gate]**

### 3. Non-Conformance Management
| Severity | Definition | Response | Escalation |
|---|---|---|---|
| Critical | Cat A or B fail | Block deployment; immediate remediation | Group CTO within 4 hours |
| High | Cat C fail | Block deployment; 5-day remediation plan | Steering Committee within 24 hours |
| Medium | Cat D fail (score 60-79%) | Conditional approval; 30-day remediation | ARB next session |
| Low | Cat D fail (score ≥80%) | Accepted with architecture debt logged | ARB next quarterly review |`,
      },
    ],
  },
  {
    id: "h",
    label: "Phase H — Change Mgmt",
    icon: "🔄",
    tag: "CHANGE",
    color: C.phase.h,
    tagline: "Manage architecture evolution",
    overview:
      "Phase H establishes the processes for managing changes to the APEX architecture once the platform is operational. AI technology evolves rapidly — new foundation models, regulatory changes (EU AI Act 2025 enforcement), and new business demands will continuously drive architecture updates. Phase H ensures these are managed with governance rigour.",
    activities: [
      "Establish architecture change management process",
      "Monitor technology changes (new AWS Bedrock models, features)",
      "Monitor regulatory changes (EU AI Act enforcement milestones)",
      "Process architecture change requests from domain teams",
      "Conduct architecture health checks (quarterly)",
      "Manage architecture debt register",
      "Trigger new ADM cycle when warranted",
    ],
    documents: [
      {
        title: "Architecture Change Management Process",
        id: "ACHG-APEX-001",
        content: `# Architecture Change Management Process
## APEX | NexaBank Global | ACHG-APEX-001 | v1.2

### 1. Change Trigger Classification

**Type 1 — Technology-driven changes (AWS/Anthropic updates)**
- New Bedrock foundation model released (e.g., Claude 4)
- New AWS Agent Core capability (e.g., native streaming improvements)
- AWS service deprecation or pricing change
- New APEX Tool library requirement
- *Process: Architecture Impact Assessment → ARB approval → Fast-track deployment*

**Type 2 — Regulatory-driven changes**
- EU AI Act enforcement milestone reached (August 2026)
- DORA ICT testing obligations update
- New FCA/PRA AI guidance published
- *Process: Compliance impact assessment → Legal/Compliance review → Steering Committee approval → Architecture update*

**Type 3 — Business-driven changes**
- New business unit requests APEX onboarding
- Existing Pioneer domain requires capability extension
- New use case requires new agent pattern
- *Process: Standard APEX onboarding workflow (see VS-001)*

**Type 4 — Simplification/Retirement changes**
- Decommission legacy siloed AI tool
- Remove deprecated agent pattern
- Consolidate duplicate knowledge bases
- *Process: ARB approval → Migration plan → Decommission with evidence*

### 2. Change Request Template

**APEX Architecture Change Request (ACR)**
\`\`\`
ACR Number:    ACR-APEX-[YYYY]-[NNN]
Date Raised:
Raised By:
Priority:      Critical / High / Medium / Low
Type:          Type 1 / 2 / 3 / 4

CHANGE DESCRIPTION:
[Brief narrative description]

BUSINESS DRIVER:
[Why is this change needed? What happens if we don't make it?]

ARCHITECTURAL IMPACT:
[ ] Business Architecture       [ ] Data Architecture
[ ] Application Architecture    [ ] Technology Architecture
[ ] Security Architecture       [ ] Regulatory Compliance

COMPONENTS AFFECTED:
[List all APEX components, ABBs, SBBs impacted]

RISK ASSESSMENT:
- Probability of negative impact:  High / Medium / Low
- Severity if negative:            Critical / High / Medium / Low
- Mitigations proposed:            [list]

COST IMPACT:
- One-time cost:     £[X]
- Recurring cost:    £[X]/year

APPROVALS REQUIRED:
[ ] ARB (always)
[ ] Steering Committee (>£50K impact or Type 2)
[ ] Group CTO (Critical priority or regulatory breach risk)
[ ] CISO (Security architecture changes)
\`\`\`

### 3. Example — Real Change Request

**ACR-APEX-2025-0023: Upgrade Foundation Model to Claude 3.5 Sonnet v2**

*Raised by:* AI Engineering Lead
*Date:* 2025-10-15
*Priority:* High
*Type:* Type 1 (Technology-driven)

*Description:* Anthropic released Claude 3.5 Sonnet v2 (anthropic.claude-3-5-sonnet-20241022-v2:0) with improved reasoning for financial document analysis. Benchmark shows 23% improvement on NexaBank's internal credit risk evaluation dataset. Proposal: upgrade all Pioneer agents to v2 model.

*Architectural Impact:* Technology Architecture (model endpoint configuration), Application Architecture (agent definition versions bumped), Security (re-validate guardrails behaviour against new model)

*Risk:* Medium probability that prompt behaviour changes require tuning. Mitigation: parallel-run old and new model for 4 weeks in shadow mode; evaluate with RAGAS metrics before cutover.

*Cost Impact:* $0.0003 increase per 1K output tokens; estimated additional $1,200/month. Within approved budget buffer.

*Decision (ARB-2025-1047):* APPROVED with conditions:
1. Complete shadow evaluation before cutover
2. Guardrails re-validation mandatory
3. Model Risk notification (not full re-validation for minor version)
4. Blue-green deployment; auto-rollback if RAGAS degrades >5%

### 4. Architecture Debt Management

**Current Architecture Debt Register (Q1 2025)**
| Debt-ID | Description | Type | Effort | Risk if Unresolved | Target |
|---|---|---|---|---|---|
| AD-001 | OpenSearch Service (not Serverless) in APAC — manual capacity management | Technical | 2w | Scaling incidents | Q2 2025 |
| AD-002 | Hardcoded prompt templates (not versioned) | Process | 1w | Drift, debugging pain | Q1 2025 |
| AD-003 | No automated RAGAS evaluation in CI/CD | Process | 3w | Quality regressions | Q2 2025 |
| AD-004 | Cost chargeback monthly (not real-time) | Business | 4w | Budget overruns not caught early | Q3 2025 |
| AD-005 | Agent Registry lacks SLA tier enforcement | Technical | 2w | SLA breaches undetected | Q2 2025 |

**Architecture Health Score: 73/100** (target: >90 by Q4 2025)

### 5. Quarterly Architecture Health Check Agenda
1. Architecture debt register review (add/close items)
2. Technology radar update (new AWS/Anthropic features assessed)
3. Regulatory change horizon scan (next 12 months)
4. Capability gap re-assessment vs BCM
5. Architecture principle compliance check
6. Performance vs NFRs (SLA, cost, developer NPS)
7. Next cycle trigger assessment: Is a new ADM iteration warranted?`,
      },
    ],
  },
  {
    id: "rm",
    label: "Requirements Mgmt",
    icon: "📋",
    tag: "REQ",
    color: C.phase.rm,
    tagline: "The continuous heartbeat",
    overview:
      "Requirements Management is the continuous, central process that sits at the core of the TOGAF ADM wheel. Unlike the other phases, it runs throughout the entire programme. It ensures architecture requirements are identified, stored, fed into each phase, and traced from business need through to implemented solution — essential for DORA and EU AI Act audit trails.",
    activities: [
      "Maintain the Architecture Requirements Specification throughout ADM",
      "Manage requirement changes across all phases",
      "Ensure requirements traceability (business → data → app → tech)",
      "Feed relevant requirements into each ADM phase",
      "Resolve conflicting requirements with ARB arbitration",
      "Maintain DORA/EU AI Act compliance requirements traceability",
    ],
    documents: [
      {
        title: "Architecture Requirements Specification",
        id: "ARS-APEX-001",
        content: `# Architecture Requirements Specification
## APEX | NexaBank Global | ARS-APEX-001 | v2.3 (Living Document)

### 1. Requirement Categories and Numbering
- **BR** — Business Requirements (from Phase B)
- **DR** — Data Requirements (from Phase C-Data)
- **AR** — Application Requirements (from Phase C-App)
- **TR** — Technology Requirements (from Phase D)
- **SR** — Security Requirements (from across phases)
- **CR** — Compliance/Regulatory Requirements

### 2. Key Requirements (Sample — 25 of 147 total)

| ID | Category | Statement | Priority | Source | Phase | Status |
|---|---|---|---|---|---|---|
| BR-001 | Business | Platform shall support ≥120 concurrent agent interactions per region | Must | Capacity model | B | ✅ In Design |
| BR-002 | Business | Agent marketplace must be searchable by domain, risk tier, cost per call | Should | Dev NPS feedback | B | 🔵 Backlog |
| BR-003 | Business | All agent decisions shall be logged and queryable for minimum 7 years | Must | DORA Art.11 | B | ✅ In Design |
| BR-004 | Business | Chargeback report available monthly per cost centre | Must | Finance Policy | B | ✅ In Design |
| BR-005 | Business | Time to onboard new agent: <10 business days for pre-approved templates | Should | TTM KPI | B | 🔵 Backlog |
| DR-001 | Data | Customer PII shall never be persisted in agent conversation logs | Must | GDPR Art.5 | C | ✅ In Design |
| DR-002 | Data | All data accessed by agents shall be classified per NexaBank taxonomy | Must | Data Policy v5 | C | ✅ In Design |
| DR-003 | Data | Knowledge base freshness: regulatory content <7 days old | Must | Model Risk Policy | C | 🟡 In Review |
| DR-004 | Data | Data lineage: every agent decision traceable to source data | Must | BCBS 239 | C | ✅ In Design |
| AR-001 | Application | Agent Control Plane API: p99 response <500ms under 500 RPS | Must | SLA Policy | C | ✅ In Design |
| AR-002 | Application | All APIs versioned (semver), deprecated versions supported ≥12 months | Must | API Standards | C | ✅ In Design |
| AR-003 | Application | Human Loop tasks must be actioned within defined SLA per agent type | Must | Business Rules | C | 🟡 In Review |
| AR-004 | Application | Agent portal accessible on mobile (responsive design) | Could | UX research | C | 🔵 Backlog |
| TR-001 | Technology | All Bedrock invocations via VPC PrivateLink (no public internet) | Must | Security Policy | D | ✅ In Design |
| TR-002 | Technology | Infrastructure defined as code (Terraform); no console-only changes | Must | IaC Standard | D | ✅ In Design |
| TR-003 | Technology | Platform deployable to new AWS region within 4 hours (IaC) | Should | DORA resilience | D | 🟡 In Review |
| TR-004 | Technology | AWS Bedrock cross-region failover within 5 minutes of primary failure | Must | SLA / DORA | D | ✅ In Design |
| SR-001 | Security | KMS CMK rotation: 365 days maximum | Must | Security Policy | D | ✅ In Design |
| SR-002 | Security | Penetration testing: quarterly for APEX platform; annually full scope | Must | DORA Art.26 | D | 🟡 In Review |
| SR-003 | Security | Red-team adversarial testing of each agent before production | Must | AI Risk Policy | D | 🟡 In Review |
| CR-001 | Compliance | EU AI Act risk classification documented for all agents | Must | EU AI Act Art.9 | All | ✅ In Design |
| CR-002 | Compliance | Model explainability method documented (SHAP/LIME) before production | Must | EU AI Act Art.13 | All | ✅ In Design |
| CR-003 | Compliance | DORA 72-hour ICT incident notification process automated | Must | DORA Art.17 | G | 🟡 In Review |
| CR-004 | Compliance | Annual model risk validation for all High-Risk AI agents | Must | EU AI Act + SR11-7 | G | 🔵 Backlog |
| CR-005 | Compliance | AI agents acting in advisory capacity comply with MiFID II Art.27 | Must | MiFID II | All | 🟡 In Review |

*Status: ✅ In Design | 🟡 In Review | 🔵 Backlog | ❌ At Risk | ✔ Done*

### 3. Requirements Traceability Matrix (Sample)

| Req ID | Business Need | Architecture Decision | Implementation | Test Evidence |
|---|---|---|---|---|
| DR-001 | GDPR compliance | Bedrock Guardrail PII anonymisation | Guardrail config: PII BLOCK/ANONYMIZE | Guardrail test suite results |
| BR-003 | DORA Art.11 | WORM S3 + Athena query interface | S3 Object Lock config + Athena table | DR test: query 5-year old record |
| TR-001 | Zero data exfiltration | VPC endpoint for bedrock-runtime | Terraform: aws_vpc_endpoint resource | Network flow log analysis |
| CR-002 | EU AI Act Art.13 | SageMaker Clarify in CI/CD gate | Clarify job in pipeline YAML | Clarify report artifact per model |

### 4. Conflicting Requirements Log
| Conflict | Req A | Req B | Resolution | ARB Decision |
|---|---|---|---|---|
| Latency vs. compliance | TR-004 (5-min failover) | CR-003 (72-hr DORA notify) | Failover for platform; separate DORA notification workflow | ARB-2025-0061 |
| Cost vs. explainability | FinOps token cost target | CR-002 (SHAP on every decision) | SHAP run async post-decision; not on critical path | ARB-2025-0064 |`,
      },
    ],
  },
];

// ── Main Component ──────────────────────────────────────────────────────────
export default function TOGAFGuide() {
  const [activePhase, setActivePhase] = useState("pre");
  const [activeDoc, setActiveDoc] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const phase = PHASES.find((p) => p.id === activePhase);

  const styles = {
    root: {
      display: "flex",
      height: "100vh",
      background: C.bg,
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      color: C.text,
      overflow: "hidden",
    },
    sidebar: {
      width: sidebarOpen ? 260 : 60,
      minWidth: sidebarOpen ? 260 : 60,
      background: C.surface,
      borderRight: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      transition: "all 0.25s ease",
      overflow: "hidden",
    },
    sidebarHeader: {
      padding: "16px 12px",
      borderBottom: `1px solid ${C.border}`,
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    logo: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      flexShrink: 0,
    },
    logoText: {
      fontSize: 11,
      fontWeight: 700,
      color: C.accent,
      letterSpacing: "0.05em",
      lineHeight: 1.2,
      whiteSpace: "nowrap",
    },
    phaseList: {
      flex: 1,
      overflowY: "auto",
      padding: "8px 0",
    },
    phaseItem: (isActive, color) => ({
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      cursor: "pointer",
      background: isActive ? `${color}22` : "transparent",
      borderLeft: isActive ? `3px solid ${color}` : "3px solid transparent",
      transition: "all 0.15s",
    }),
    phaseIcon: { fontSize: 18, flexShrink: 0 },
    phaseInfo: { overflow: "hidden" },
    phaseLabel: (isActive, color) => ({
      fontSize: 11,
      fontWeight: isActive ? 700 : 500,
      color: isActive ? color : C.text,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    phaseTagline: {
      fontSize: 9,
      color: C.muted,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    topbar: {
      background: C.surface,
      borderBottom: `1px solid ${C.border}`,
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    phaseHeader: {
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    phaseTag: (color) => ({
      background: `${color}33`,
      color: color,
      border: `1px solid ${color}66`,
      borderRadius: 4,
      padding: "2px 8px",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.1em",
    }),
    phaseTitle: {
      fontSize: 15,
      fontWeight: 700,
      color: C.text,
    },
    badge: {
      fontSize: 9,
      color: C.muted,
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 4,
      padding: "2px 6px",
    },
    content: {
      flex: 1,
      display: "flex",
      overflow: "hidden",
    },
    leftPane: {
      width: 340,
      minWidth: 340,
      borderRight: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    sectionTitle: {
      fontSize: 9,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "14px 16px 8px",
      borderBottom: `1px solid ${C.border}`,
    },
    overviewBox: {
      padding: "14px 16px",
      fontSize: 11,
      lineHeight: 1.7,
      color: "#94a3b8",
      borderBottom: `1px solid ${C.border}`,
    },
    activityList: {
      padding: "8px 16px",
      flex: 1,
      overflowY: "auto",
    },
    activityItem: (i) => ({
      display: "flex",
      gap: 8,
      marginBottom: 8,
      fontSize: 10,
      lineHeight: 1.6,
      color: C.text,
      alignItems: "flex-start",
    }),
    activityNum: (color) => ({
      flexShrink: 0,
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: `${color}22`,
      border: `1px solid ${color}55`,
      color: color,
      fontSize: 9,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      marginTop: 1,
    }),
    docList: {
      padding: "8px",
      borderTop: `1px solid ${C.border}`,
    },
    docItem: (isActive, color) => ({
      padding: "8px 10px",
      marginBottom: 4,
      borderRadius: 6,
      cursor: "pointer",
      background: isActive ? `${color}22` : C.card,
      border: `1px solid ${isActive ? color + "66" : C.border}`,
      transition: "all 0.15s",
    }),
    docTitle: (isActive, color) => ({
      fontSize: 10,
      fontWeight: isActive ? 700 : 500,
      color: isActive ? color : C.text,
      marginBottom: 2,
    }),
    docId: {
      fontSize: 9,
      color: C.muted,
      fontFamily: "monospace",
    },
    rightPane: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    docHeader: (color) => ({
      padding: "12px 20px",
      borderBottom: `1px solid ${C.border}`,
      background: `${color}11`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }),
    docHeaderTitle: {
      fontSize: 12,
      fontWeight: 700,
      color: C.text,
    },
    docContent: {
      flex: 1,
      overflowY: "auto",
      padding: "20px 24px",
    },
    pre: {
      whiteSpace: "pre-wrap",
      fontSize: 11,
      lineHeight: 1.8,
      color: "#cbd5e1",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    },
    toggleBtn: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 6,
      color: C.muted,
      cursor: "pointer",
      padding: "4px 8px",
      fontSize: 12,
    },
  };

  const renderMarkdown = (text) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("### "))
        return (
          <div
            key={i}
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: phase.color,
              margin: "18px 0 6px",
              borderBottom: `1px solid ${phase.color}44`,
              paddingBottom: 4,
            }}
          >
            {line.replace("### ", "")}
          </div>
        );
      if (line.startsWith("## "))
        return (
          <div
            key={i}
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: C.accent,
              margin: "22px 0 8px",
            }}
          >
            {line.replace("## ", "")}
          </div>
        );
      if (line.startsWith("# "))
        return (
          <div
            key={i}
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: C.text,
              margin: "0 0 16px",
              paddingBottom: 8,
              borderBottom: `2px solid ${phase.color}`,
            }}
          >
            {line.replace("# ", "")}
          </div>
        );
      if (line.startsWith("**") && line.endsWith("**"))
        return (
          <div
            key={i}
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#f1f5f9",
              margin: "12px 0 4px",
            }}
          >
            {line.replace(/\*\*/g, "")}
          </div>
        );
      if (line.startsWith("- ") || line.startsWith("* "))
        return (
          <div
            key={i}
            style={{
              fontSize: 10,
              color: "#94a3b8",
              lineHeight: 1.7,
              paddingLeft: 12,
              display: "flex",
              gap: 6,
            }}
          >
            <span style={{ color: phase.color, flexShrink: 0 }}>›</span>
            <span>{line.slice(2)}</span>
          </div>
        );
      if (line.startsWith("| ")) {
        const cells = line
          .split("|")
          .filter((c) => c.trim() !== "")
          .map((c) => c.trim());
        const isHeader = lines[i + 1] && lines[i + 1].startsWith("|---");
        const isDivider = line.includes("|---");
        if (isDivider) return null;
        return (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cells.length}, 1fr)`,
              gap: 1,
              marginBottom: 1,
            }}
          >
            {cells.map((c, j) => (
              <div
                key={j}
                style={{
                  fontSize: 9,
                  padding: "4px 6px",
                  background: isHeader ? `${phase.color}33` : C.card,
                  color: isHeader ? phase.color : "#94a3b8",
                  fontWeight: isHeader ? 700 : 400,
                  borderRadius: 2,
                  wordBreak: "break-word",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        );
      }
      if (line.startsWith("```") || line === "```")
        return (
          <div
            key={i}
            style={{
              height: 1,
              background: C.border,
              margin: "8px 0",
            }}
          />
        );
      if (line.trim() === "")
        return <div key={i} style={{ height: 8 }} />;
      return (
        <div
          key={i}
          style={{
            fontSize: 10,
            color: "#94a3b8",
            lineHeight: 1.8,
          }}
        >
          {line}
        </div>
      );
    });
  };

  const doc = phase?.documents[activeDoc];

  return (
    <div style={styles.root}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>🏛️</div>
          {sidebarOpen && (
            <div style={styles.logoText}>
              TOGAF 10 ADM
              <br />
              <span style={{ color: C.muted, fontSize: 9 }}>{COMPANY}</span>
            </div>
          )}
        </div>
        <div style={styles.phaseList}>
          {PHASES.map((p) => (
            <div
              key={p.id}
              style={styles.phaseItem(activePhase === p.id, p.color)}
              onClick={() => {
                setActivePhase(p.id);
                setActiveDoc(0);
              }}
            >
              <span style={styles.phaseIcon}>{p.icon}</span>
              {sidebarOpen && (
                <div style={styles.phaseInfo}>
                  <div style={styles.phaseLabel(activePhase === p.id, p.color)}>
                    {p.label}
                  </div>
                  <div style={styles.phaseTagline}>{p.tagline}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "8px 12px",
            borderTop: `1px solid ${C.border}`,
            fontSize: 9,
            color: C.muted,
            textAlign: "center",
          }}
        >
          {sidebarOpen ? (
            <>
              {VERSION}
              <br />
              {INITIATIVE}
            </>
          ) : (
            "ADM"
          )}
        </div>
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Topbar */}
        <div style={styles.topbar}>
          <div style={styles.phaseHeader}>
            <button
              style={styles.toggleBtn}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? "◄" : "►"}
            </button>
            <div style={styles.phaseTag(phase.color)}>{phase.tag}</div>
            <span style={styles.phaseTitle}>{phase.label}</span>
            <span style={{ fontSize: 11, color: C.muted }}>—</span>
            <span style={{ fontSize: 11, color: C.muted }}>
              {phase.tagline}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={styles.badge}>APEX Programme</span>
            <span style={styles.badge}>NexaBank Global</span>
            <span style={styles.badge}>
              {phase.documents.length} document
              {phase.documents.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Left pane */}
          <div style={styles.leftPane}>
            <div style={styles.sectionTitle}>Phase Overview</div>
            <div style={styles.overviewBox}>{phase.overview}</div>
            <div style={styles.sectionTitle}>Key Activities</div>
            <div style={styles.activityList}>
              {phase.activities.map((act, i) => (
                <div key={i} style={styles.activityItem(i)}>
                  <div style={styles.activityNum(phase.color)}>{i + 1}</div>
                  <span>{act}</span>
                </div>
              ))}
            </div>
            <div style={styles.sectionTitle}>Documents</div>
            <div style={styles.docList}>
              {phase.documents.map((d, i) => (
                <div
                  key={i}
                  style={styles.docItem(activeDoc === i, phase.color)}
                  onClick={() => setActiveDoc(i)}
                >
                  <div style={styles.docTitle(activeDoc === i, phase.color)}>
                    📄 {d.title}
                  </div>
                  <div style={styles.docId}>{d.id}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right pane — document viewer */}
          <div style={styles.rightPane}>
            {doc && (
              <>
                <div style={styles.docHeader(phase.color)}>
                  <div>
                    <div style={styles.docHeaderTitle}>{doc.title}</div>
                    <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>
                      Document ID: {doc.id} · {COMPANY} · APEX Programme
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: phase.color,
                      background: `${phase.color}22`,
                      border: `1px solid ${phase.color}44`,
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    TOGAF 10 Artefact
                  </div>
                </div>
                <div style={styles.docContent}>
                  {renderMarkdown(doc.content)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
