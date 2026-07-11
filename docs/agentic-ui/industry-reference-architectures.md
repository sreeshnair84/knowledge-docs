---
title: "Industry Reference Architectures for Agentic Applications"
date_created: 2026-07-07
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["agentic-ui"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# Industry Reference Architectures for Agentic Applications

Reference architectures for the AGUI/UX layer across 10 industry verticals — focusing on UX design, human oversight models, regulatory constraints, and enterprise system integrations unique to each domain.

:::note Backend Platform Coverage
    For backend agent platform architecture (orchestration, memory, A2A, MCP), see [Enterprise Agent Reference Architectures](../enterprise-architecture/ai-architecture/enterprise-agent-reference-architectures.md). This guide focuses on what's different at the UX and AGUI layer per industry.

---

## 1. Financial Services & Banking

### Top Use Cases

| Use Case | Expected Value | HITL Requirement |
| --- | --- | --- |
| Trading desk copilot | 30-40% reduction in research time; faster idea generation | Mandatory for all trade execution |
| Risk analysis assistant | 20-25% faster risk report generation | Required for risk limit breaches |
| Compliance research agent | 50-60% reduction in regulatory research time | Required for regulatory filings |

### Architecture

```text
User (Trader / Analyst / Compliance Officer)
  │
  ▼
AG-UI Frontend (React + CopilotKit)
  ├── Streaming risk data visualization
  ├── HITL approval dialogs (trade execution)
  ├── Confidence interval display on recommendations
  └── Full audit trail sidebar
  │
  ▼
Agent Runtime
  ├── Market data retrieval (Bloomberg, Reuters)
  ├── Regulatory database search (SEC EDGAR, FINRA)
  ├── Risk calculation tools
  └── Trade execution tools [HITL GATE — mandatory]
  │
  ▼
Enterprise Systems
  ├── Bloomberg Terminal / Reuters Eikon (read)
  ├── Order Management System [write — HITL required]
  ├── Risk Management Platform
  └── Compliance archival system
```

### UX Considerations

**Confidence and uncertainty display is non-negotiable.** Traders and analysts need to see the basis for every recommendation:

- Confidence score (0-100%) on every price target, risk assessment, or trade recommendation
- Data freshness indicator (market data timestamped to the second)
- Source attribution: every claim links to the underlying data source
- "What could go wrong" toggle: one click reveals bear-case reasoning

**Separation of duties (SOD) enforcement in UX:**

- Agents preparing trade recommendations must be a different agent identity from those authorized to execute
- Approval dialog explicitly shows: who prepared the recommendation vs. who is approving
- Four-eyes principle: approver must be different from the preparer; UX enforces this at the frontend

**Audit trail as a first-class UX element:**

- Every agent action is visible in an always-accessible timeline sidebar
- Actions include: query issued, tools called, data accessed, recommendation generated, approval status
- Timeline is immutable once a trading session closes; exportable for compliance review

### Regulatory Constraints Affecting UX

| Regulation | UX Requirement |
| --- | --- |
| MiFID II (EU) | Best execution evidence for every trade recommendation; agent audit trail required |
| FINRA 4370 | Business continuity — agent fallback mode when primary tools fail |
| GDPR | Personal client data handling disclosure; no PII in LLM context without consent |
| SOX | Complete audit trail for financial decision support; 7-year retention |
| Basel IV | Risk calculation transparency; model explainability for capital calculations |

### Human Oversight Model

- **HITL mandatory:** Trade execution, risk limit overrides, regulatory filing submission, client communication
- **HOTL (human-on-the-loop):** Research summary generation, market data analysis, portfolio monitoring alerts
- **HOOL (human-out-of-the-loop):** Market data ingestion, news summarization, watchlist monitoring

### Key Integrations

Bloomberg B-PIPE (market data), Reuters Elektron (news/data), FIS Horizon (banking core), Finastra (lending), DTCC (settlement), SWIFT (payments), Murex (derivatives), OpenPages (compliance)

---

## 2. Healthcare

### Top Use Cases

| Use Case | Expected Value | HITL Requirement |
| --- | --- | --- |
| Clinical decision support | Reduced diagnostic errors; 15-20% time savings for clinicians | Mandatory for diagnosis and treatment decisions |
| Patient Q&A and education | 30% reduction in call center volume; 24/7 patient access | Advisory only; escalate complex questions to clinician |
| Clinical documentation | 40-50% reduction in documentation time | Clinician reviews and signs every AI-generated note |

### Architecture

```text
Clinician / Patient
  │
  ▼
AG-UI Frontend
  ├── HITL approval for every clinical recommendation
  ├── Evidence panel (source guideline, confidence level)
  ├── Differential diagnosis list with probability scores
  ├── FHIR resource viewer (labs, vitals, medications)
  └── Accessibility: WCAG AA, large tap targets for tablet use
  │
  ▼
Agent Runtime
  ├── Patient record retrieval (FHIR R4)
  ├── Clinical knowledge search (UpToDate, PubMed)
  ├── Drug interaction checker
  └── Documentation generation tools
  │
  ▼
EHR Layer (SMART on FHIR)
  ├── Epic MyChart / Hyperspace
  ├── Cerner Millennium
  └── Allscripts Sunrise
```

### UX Considerations

**Every clinical recommendation requires human confirmation.** The UX never auto-applies a clinical suggestion; it presents recommendations for clinician review and signature. This is not a usability choice — it is a patient safety requirement.

**Evidence and explainability panels are mandatory for clinical trust:**

- Every recommendation shows the supporting clinical guideline with a link to source
- Probability/confidence scores use plain language: "High confidence (92%) based on 3 matching criteria"
- "Why this recommendation" button opens a step-by-step reasoning trace
- Alternative diagnoses or treatments shown with probability comparison

**Documentation assistant UX pattern:**

- Agent generates draft; clinician reviews in split-screen view
- Clinician can accept, modify, or reject each sentence individually
- Changes tracked and signed with clinician's digital signature
- Generated vs. human-written sections clearly distinguished in final record

**Accessibility is not optional:**

- Large touch targets (48x48px minimum) for tablet and stylus use at the bedside
- High contrast mode for clinical environments with varying lighting
- Screen reader support for visually impaired clinicians
- No time-sensitive interactions (clinicians are often multitasking)

### Regulatory Constraints

| Regulation | UX Requirement |
| --- | --- |
| HIPAA (US) | No PHI in LLM context without BAA; minimum necessary standard; audit log of PHI access |
| 21 CFR Part 11 | Electronic signatures on AI-assisted documentation; audit trail |
| FDA SaMD | If agent provides diagnostic suggestions, may require FDA 510(k) clearance |
| EU MDR | Medical device software classification for diagnostic agents |
| GDPR | Patient consent for AI-assisted analysis; right to human review of AI decisions (Art. 22) |

### Key Integrations

Epic SMART on FHIR, Cerner Millennium FHIR API, HL7 FHIR R4 standard, UpToDate (clinical decision support), PubMed/MEDLINE, RxNorm (drug database), SNOMED CT, ICD-10/11

---

## 3. Insurance

### Top Use Cases

| Use Case | Expected Value | HITL Requirement |
| --- | --- | --- |
| Underwriting assistance | 30-40% faster quote generation; improved risk accuracy | Mandatory for large commercial policies |
| Claims triage | 50% reduction in time-to-first-payment for simple claims | Required for coverage denial decisions |
| Fraud detection | 15-20% improvement in fraud detection accuracy | Required before claim denial based on fraud flag |

### Architecture

```text
Underwriter / Claims Adjuster
  │
  ▼
AG-UI Frontend
  ├── Risk score dashboard with factor breakdown
  ├── HITL approval for coverage decisions
  ├── Explainability panel (why this risk score)
  ├── Comparable risk/claim history viewer
  └── Regulatory compliance checklist
  │
  ▼
Agent Runtime
  ├── Risk data retrieval (property records, driving history)
  ├── Loss history database lookup
  ├── Fraud indicator analysis
  └── Policy document generation
  │
  ▼
Core Systems
  ├── Guidewire PolicyCenter / ClaimCenter
  ├── Duck Creek Technologies
  └── Majesco Insurance Suite
```

### UX Considerations

**Explainability is legally required for adverse decisions.** Any coverage denial, premium increase, or claim rejection influenced by AI must be explainable in plain language that a policyholder can understand and challenge:

- Risk factor breakdown: "Your premium is 15% higher than average because: commercial kitchen (40%), older building (35%), prior fire claim (25%)"
- Each factor links to the underwriting guideline that supports it
- "What would change this?" functionality: interactive what-if analysis

**Actuarial confidence display:**

- Loss ratio prediction: point estimate with confidence interval
- Historical comparison: "Similar risks had loss ratios of X–Y"
- Model version and training data vintage shown to actuaries

### Regulatory Constraints

| Regulation | Requirement |
| --- | --- |
| EU GDPR Art. 22 | Right to human review for automated adverse decisions |
| US state insurance regulations | State-specific disclosure requirements for AI-assisted underwriting |
| Fair Housing Act / ECOA (US) | No discriminatory factors in AI-assisted underwriting; bias testing required |
| IAIS (International) | Model explainability and validation requirements for insurance AI |

---

## 4. Retail & E-commerce

### Top Use Cases

| Use Case | Expected Value | HITL Requirement |
| --- | --- | --- |
| Personalized shopping assistant | 15-25% increase in basket size; higher conversion | Not required for recommendations |
| Inventory optimization | 20-30% reduction in stockouts | Required for large purchase commitments |
| Customer service automation | 40-60% reduction in contact center volume | Required only for complex refunds / exceptions |

### Architecture

```text
Shopper / Customer Service Rep
  │
  ▼
AG-UI Frontend
  ├── Streaming product recommendations
  ├── Conversational search interface
  ├── Order management actions (self-service)
  └── Visual product search (multimodal)
  │
  ▼
Agent Runtime
  ├── Product catalog search
  ├── Personalization engine
  ├── Order management tools
  └── Inventory tools
  │
  ▼
Commerce Platform
  ├── Shopify / Salesforce Commerce Cloud
  ├── SAP Commerce
  └── Custom OMS
```

### UX Considerations

**Minimal friction, maximum personalization.** Unlike healthcare or financial services, most retail agent interactions require no human approval. The goal is seamless task completion:

- Recommendations stream instantly without loading state
- Natural language return/exchange processing: "I want to return the blue jacket I ordered last week" → agent finds order, initiates return, streams confirmation
- Multimodal search: user takes a photo of an item they want to find → agent retrieves visually similar products

**Trust indicators for recommendations:**

- "Recommended because you viewed X" — transparent personalization signals
- Social proof integration: "87 people bought this together"
- Agent-generated outfit/bundle suggestions with styling rationale

### Regulatory Constraints

| Regulation | Requirement |
| --- | --- |
| GDPR / CCPA | Consent for personalization; opt-out mechanism prominently accessible |
| PCI DSS | No payment card data in agent context; tokenize all card references |
| Consumer protection laws | No deceptive urgency signals from agents; "only 2 left" must be accurate |
| EU AI Act Art. 50 | Disclosure if agent uses emotion recognition or biometric categorization for personalization |

---

## 5. Manufacturing

### Top Use Cases

| Use Case | Expected Value | HITL Requirement |
| --- | --- | --- |
| Predictive maintenance | 25-35% reduction in unplanned downtime | Required for maintenance decisions on safety-critical equipment |
| Quality control visual inspection | 20-30% improvement in defect detection | Required for final go/no-go decision on production batches |
| Supply chain orchestration | 15-20% reduction in lead times | Required for large purchase orders |

### Architecture

```text
Plant Operator / Maintenance Engineer
  │
  ▼
AG-UI Frontend (Ruggedized tablet or large touch screen)
  ├── Large touch targets (48px+ for gloved hands)
  ├── High-contrast display (bright factory environments)
  ├── Voice interface (hands-free operation)
  ├── Alert visualization with priority tiers
  └── Step-by-step maintenance guide generation
  │
  ▼
Agent Runtime
  ├── IoT sensor data retrieval (temperature, vibration, pressure)
  ├── Maintenance history lookup
  ├── Part availability check
  └── Work order generation tools
  │
  ▼
Plant Systems
  ├── SAP S/4HANA PM (Plant Maintenance)
  ├── Siemens MindSphere / PTC ThingWorx (IoT)
  ├── Azure IoT Hub / AWS IoT Core
  └── ERP / MES integration
```

### UX Considerations

**Factory floor UX is radically different from office UX:**

- Large touch targets (48x48px absolute minimum; 64px+ recommended for gloved operation)
- High contrast (4.5:1 minimum) because screens viewed in bright ambient light or direct sunlight
- Voice interface for hands-free operation at workstations — operator's hands may be occupied
- Auditory alerts (not just visual) for critical equipment alerts
- Offline-capable (plant floor may have spotty connectivity)
- Response time must be < 3 seconds for safety-critical alerts (operator cannot wait)

**OT/IT network separation:**

- AGUI frontend deployed in IT network zone
- IoT data accessed via secure DMZ connector, not direct OT access
- Agent cannot write to OT systems directly; all commands go through IT/OT gateway with human authorization

### Regulatory Constraints

| Regulation | Requirement |
| --- | --- |
| IEC 62443 | Cybersecurity for OT systems; agent access to OT must go through security zones |
| EU Machinery Directive | Safety-critical control systems must have human in the loop |
| ISO 13849 / IEC 62061 | Functional safety requirements for automated systems controlling machinery |
| OSHA (US) | Hazardous operation approvals must be by qualified human |

---

## 6. Developer Platforms

### Top Use Cases

| Use Case | Expected Value | HITL Requirement |
| --- | --- | --- |
| Coding copilot | 30-50% productivity increase (GitHub data); reduced context switching | Not required for code suggestions; required for force-push/delete |
| Code review agent | 20-30% reduction in review cycle time | Developer approves before any automated merge |
| CI/CD agent | 40% reduction in pipeline configuration time | Required for production deployments |

### Architecture

```text
Developer
  │
  ├─── IDE (VS Code / JetBrains / Neovim)
  │      └── Inline code completion and suggestions
  │
  ├─── Terminal (CLI agent with streaming output)
  │
  └─── Web UI (PR review, CI/CD configuration)
  │
  ▼
AG-UI / LSP Protocol Layer
  ├── Inline suggestion streaming
  ├── Chat panel (explain, refactor, test generation)
  └── Terminal agent stream
  │
  ▼
Agent Runtime
  ├── Code retrieval (repo, file, symbol search)
  ├── GitHub / GitLab API tools
  ├── CI/CD pipeline tools
  └── Documentation search
```

### UX Considerations

**IDE-first means zero context switch.** The entire interaction happens inline:

- Code completions appear inline without opening a new panel
- Explain/refactor via right-click context menu or keyboard shortcut
- Terminal agent streams output directly to terminal buffer — looks like a real command

**Developer trust is earned through transparency:**

- Show which files were read for each suggestion
- Diff view before applying any change (agent suggests; developer accepts/modifies/rejects)
- Approval only for destructive or irreversible operations: `git push --force`, `branch delete`, production deploy
- No approval for: code suggestions, search, explanation, test generation

**Terminal agent UX:**

- Commands streamed to a sub-shell with output shown in real time
- `--dry-run` flag by default; developer must explicitly `--execute` to apply
- Full command history in sidebar with ability to replay

### Regulatory Constraints

| Regulation | Requirement |
| --- | --- |
| SOC 2 Type II | Logging of all agent-executed git operations; access control to production repo |
| GDPR | Source code may contain personal data; no unexpected transmission to LLM providers |
| License compliance | Agent must not suggest code that reproduces GPL/copyleft code in proprietary context |

---

## 7. Government & Public Sector

### Top Use Cases

| Use Case | Expected Value | HITL Requirement |
| --- | --- | --- |
| Citizen services portal | 35-45% reduction in call center volume; 24/7 service | Required for eligibility determinations affecting benefits |
| Benefits eligibility assistant | Faster, more consistent eligibility determinations | Mandatory; EU AI Act Art. 22 and similar |
| Policy research agent | 40-50% reduction in policy research time for staff | Advisory only for research; required for policy recommendations |

### Architecture

```text
Citizen / Government Staff Member
  │
  ▼
AG-UI Frontend (Accessible, Multi-language)
  ├── AI disclosure: "You are talking to an AI assistant"
  ├── Language selector (accessibility requirement)
  ├── High contrast / large text mode
  ├── Human escalation always visible
  └── Decision explanation for any AI-assisted determination
  │
  ▼
Agent Runtime
  ├── Policy document retrieval
  ├── Eligibility rule engine
  ├── Case management tools
  └── Translation tools
  │
  ▼
Government Systems
  ├── Salesforce Government Cloud
  ├── ServiceNow (IT/citizen service management)
  ├── Microsoft Azure Government / GovCloud
  └── Legacy mainframe connectors (common in public sector)
```

### UX Considerations

**Transparency and accountability are statutory requirements:**

- Citizens must be informed at the start of every interaction that they are talking to an AI
- Every eligibility determination must include a plain-language explanation of how the decision was made
- Human review option must be prominently accessible — not buried in a menu
- No impersonation of human government officials

**Multi-language and accessibility are legal requirements, not enhancements:**

- Section 508 (US) / EN 301 549 (EU) compliance is mandatory
- Language support: minimum in official national/regional languages; additional based on population served
- WCAG 2.1 AA at minimum; AAA for high-stakes services
- Screen reader compatibility for every UI component including streaming agent responses

**Sovereign AI considerations for classified tiers:**

- Public-facing (Unclassified): commercial cloud permitted
- Sensitive (CUI / IL2): FedRAMP High, GovCloud required (US); restricted cloud only
- Classified (IL4/IL5/IL6): on-premises or government-specific cloud required; no commercial LLM providers

### Regulatory Constraints

| Regulation | Requirement |
| --- | --- |
| EU AI Act Art. 50 | Disclosure that citizen is interacting with AI; right to human review of consequential decisions |
| Section 508 / WCAG (US/EU) | Full accessibility for digital services |
| APA (US Administrative Procedure Act) | AI-assisted determinations must be explainable and challengeable |
| FedRAMP (US) | Cloud security authorization required for federal deployments |
| GDPR Art. 22 (EU) | No automated decision-making affecting legal rights without human review option |

---

## 8. Telecommunications

### Top Use Cases

| Use Case | Expected Value | HITL Requirement |
| --- | --- | --- |
| NOC agentic assistant | 25-35% faster mean time to resolve network incidents | Required for changes to live network configuration |
| Customer service automation | 40-55% reduction in average handle time | Required for account-level financial exceptions |
| Network anomaly detection | 20-30% improvement in anomaly detection accuracy | Required before automated remediation |

### Architecture

```text
NOC Engineer / Customer Service Rep
  │
  ▼
AG-UI Frontend
  ├── Real-time network health dashboard integration
  ├── Alert stream with severity tiers
  ├── HITL gate for network change approvals
  ├── Runbook auto-generation
  └── On-call escalation integration (PagerDuty, ServiceNow)
  │
  ▼
Agent Runtime
  ├── Network telemetry retrieval
  ├── Log analysis tools
  ├── Network configuration read tools
  ├── Change management tools [HITL — network changes]
  └── Customer account tools
  │
  ▼
Telecom Systems
  ├── Network Management System (Nokia NetAct, Ericsson ENM)
  ├── ServiceNow (ITSM)
  ├── Salesforce (CRM)
  └── OSS/BSS stacks
```

### UX Considerations

**24/7 operations require always-on agent availability.** NOC agents face:

- Sub-second alert display (delayed alerts in a network NOC have direct customer impact)
- Multiple simultaneous incidents (agent must handle parallel problem streams)
- Runbook generation on demand: "Show me the runbook for this BGP alarm type"
- Shift handover mode: summarize all open incidents and in-progress actions for the incoming engineer

**Human escalation is always one click away.** In high-severity incidents, the agent assists but a human decides:

- "Take action" requires explicit human approval for any network config change
- Emergency override: human can instantly suspend agent actions for all affected devices
- Audio alert for P1 incidents even when UI is in background

### Regulatory Constraints

| Regulation | Requirement |
| --- | --- |
| CALEA (US) | Lawful intercept access; agent must not interfere with interception systems |
| CPNI (US) | Customer proprietary network information — strict access controls; no CPNI in shared LLM context |
| GDPR (EU) | Customer data in network logs; consent and retention requirements |
| NIS2 Directive (EU) | Critical infrastructure security; incident reporting within 24 hours |

---

## 9. Knowledge Management & Enterprise Search

### Top Use Cases

| Use Case | Expected Value | HITL Requirement |
| --- | --- | --- |
| Enterprise search copilot | 35-50% reduction in time-to-answer for knowledge workers | Not required for search/retrieval; required for creating/publishing content |
| Document intelligence agent | 40-60% reduction in document review time | Required for decisions based on document analysis |
| SharePoint/Confluence copilot | 25-35% increase in knowledge base utilization | Not required for reading; required for content updates |

### Architecture

```text
Knowledge Worker
  │
  ▼
AG-UI Frontend (embedded in M365/SharePoint/Confluence)
  ├── NLWeb interface for internal portal
  ├── Source attribution on every answer
  ├── Document viewer with relevant section highlighted
  ├── Access-controlled results (user sees only permitted content)
  └── Content creation assistance with review workflow
  │
  ▼
Agent Runtime
  ├── Enterprise search (Elastic, SharePoint Search, Vertex Search)
  ├── Document retrieval tools
  ├── Content creation tools
  └── Knowledge graph traversal
  │
  ▼
Knowledge Repositories
  ├── SharePoint / OneDrive
  ├── Confluence / Jira
  ├── Box / Google Drive
  └── Internal databases and wikis
```

### UX Considerations

**Source attribution is the single most important trust signal.** Knowledge workers need to:

- See exactly which document each answer fragment came from
- One click to the exact page/section in the source document
- Freshness indicator on every source: "Last updated: March 2026"
- "Show me more like this" to explore the source document neighborhood

**Access control is surfaced to users:** The agent only shows results the user has permission to see. When a relevant document exists but user doesn't have access, the agent says "There is a relevant document you don't have access to — contact [document owner] to request access." This is better than silently omitting results.

**NLWeb integration:** Internal portals built on NLWeb expose structured content via natural language queries. Agent navigates internal knowledge with the same natural language interface as external web — but with full enterprise access control.

---

## 10. Life Sciences & Pharmaceuticals

### Top Use Cases

| Use Case | Expected Value | HITL Requirement |
| --- | --- | --- |
| Clinical trial assistance | 20-30% reduction in protocol development time | Mandatory for protocol approval |
| Regulatory submission (FDA/EMA) | 30-40% reduction in submission preparation time | Mandatory; all AI-generated content requires human review and signature |
| Drug discovery literature review | 50-60% reduction in literature review time | Advisory; human researcher validates all findings |

### Architecture

```text
Regulatory Affairs Specialist / Research Scientist / Clinical Trial Manager
  │
  ▼
AG-UI Frontend
  ├── Document collaboration with AI suggestions
  ├── Version-controlled AI-generated vs. human content tracking
  ├── Electronic signature workflow (21 CFR Part 11 compliant)
  ├── Regulatory checklist (FDA/EMA requirements)
  └── Audit trail for every AI contribution
  │
  ▼
Agent Runtime
  ├── Literature retrieval (PubMed, ClinicalTrials.gov)
  ├── Regulatory guidance retrieval (FDA, EMA databases)
  ├── Document generation tools
  └── Statistical analysis assistance
  │
  ▼
Life Sciences Systems
  ├── Veeva Vault (regulatory content management)
  ├── MedDRA (medical terminology)
  ├── CTMS (Clinical Trial Management System)
  └── EDC (Electronic Data Capture)
```

### UX Considerations

**Every AI-generated element must be distinguishable and traceable.** Regulatory submissions require:

- Clear visual distinction between AI-generated and human-authored content in every document
- AI contribution attribution: "AI-assisted — reviewed and approved by [name, date, signature]"
- Version control on every AI-assisted document showing change history
- Electronic signatures (21 CFR Part 11 compliant) on all documents containing AI-generated content

**Explainability for regulatory context:** Every AI-generated claim in a regulatory document must link to the supporting evidence:

- Every efficacy statement links to the clinical data source
- Every safety claim links to the adverse event data
- Regulatory guidance references link to the exact FDA/EMA guidance section

### Regulatory Constraints

| Regulation | Requirement |
| --- | --- |
| 21 CFR Part 11 (US FDA) | Electronic records and signatures for AI-assisted documents; audit trail; computer system validation |
| EU Clinical Trials Regulation | Clinical trial data integrity; AI contributions must be documented and auditable |
| ICH E6(R3) | Good Clinical Practice — data integrity requirements apply to AI-generated content |
| EU AI Act (High-risk) | Pharma AI systems likely classified as high-risk; human oversight, technical documentation required |
| GDPR | Patient data in clinical trials; consent and pseudonymization requirements |

---

## Cross-Industry Patterns

Regardless of industry, five UX patterns appear consistently in successful agentic deployments:

| Pattern | When | Why |
| --- | --- | --- |
| Source attribution | Every factual claim | Builds trust; enables verification; satisfies audit requirements |
| Explicit HITL for irreversible actions | Deletes, sends, executes, publishes | Risk management; regulatory compliance; user confidence |
| Progressive disclosure | All complex outputs | Reduce cognitive load; surface summary first, details on demand |
| Graceful degradation messaging | Any component failure | Maintain user trust even when system is degraded |
| Human escalation path | Every agent interaction | Non-negotiable for regulated industries; best practice for all |

:::tip Cross-references
    - For enterprise security controls across industries: [Security Architecture](security-architecture.md)
    - For human oversight models (HITL/HOTL/HOOL): [Agent UX Patterns](agent-ux-patterns.md)
    - For compliance and governance frameworks: [Governance](governance.md)
    - For backend platform reference architectures: [Enterprise Reference Architecture](enterprise-reference-architecture.md)
