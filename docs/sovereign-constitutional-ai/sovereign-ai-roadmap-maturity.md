---
title: "Roadmap, Maturity & Standards Canon"
date_created: 2026-07-07
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["sovereign-constitutional-ai"]
---

# Roadmap, Maturity & Standards Canon (Deliverables 16–24)

**Audience:** Chief AI Officers, Principal AI Governance Architects, AI Governance Leads, Enterprise Architects  
**Purpose:** AI governance maturity model, board reporting framework, compliance and trust frameworks, 24-month learning roadmap, Principal AI Governance Architect interview guide, and the complete standards/books/tools canon.  
**Related:** [AI Governance Operating Model](ai-governance-operating-model.md) · [Sovereign AI Foundations](sovereign-ai-foundations.md)

---

## 1. AI Governance Maturity Model (Deliverable 16)

### 1.1 Five Maturity Levels

| Level | Name | Characteristics | Indicators |
|---|---|---|---|
| **1** | **Ad Hoc** | No formal AI governance; decisions made case-by-case; no risk register | Shadow AI everywhere; no accountability chain; reactive only |
| **2** | **Developing** | Basic policies documented; AI register being built; governance roles assigned | AI acceptable use policy exists; RAI Champion named; basic model cards |
| **3** | **Defined** | Formal governance operating model; policy-as-code implemented; fairness monitoring active | AI Governance Council operational; ARB approval gate; fairness reports monthly |
| **4** | **Managed** | Metrics-driven governance; continuous compliance monitoring; constitutional AI deployed | Constitutional classifier live; kill switch tested quarterly; board AI briefing quarterly |
| **5** | **Optimising** | Proactive governance; continuous improvement; democratic participation in AI constitution | ISO 42001 certified; EU AI Act conformity assessed; public AI register; CCAI input |

### 1.2 Maturity Assessment Dimensions

Score 0–4 on each dimension. Total score maps to maturity level.

| Dimension | 0 (None) | 1 (Basic) | 2 (Defined) | 3 (Managed) | 4 (Optimising) |
|---|---|---|---|---|---|
| **AI Strategy** | No AI strategy | Informal vision | Documented strategy | Aligned to enterprise strategy | AI-native; board-level strategic commitment |
| **AI Governance Structure** | None | Named CAIO | Governance Council | Full 6-layer operating model | Board-integrated; external advisory |
| **Risk Management** | No AI risk register | Basic register | Tiered risk register | Continuous monitoring | Predictive risk management |
| **RAI / Constitutional** | No RAI | RAI principles stated | RAI office + model cards | Constitutional enforcement live | CCAI; democratic participation |
| **Audit & Assurance** | No AI audit | Self-assessment | Internal audit | Three lines of defense | ISO 42001 certified |
| **Policy-as-Code** | Manual review only | Some OPA/Cedar | Constitutional policies live | Full control library | Constitutional traceability |
| **Agent Governance** | No agent policy | Basic agent policy | L0–L5 taxonomy applied | Kill switches tested | Sovereign agent fabric |
| **Sovereign AI** | Fully dependent | Data residency only | Sovereign infra for T1 | Sovereign model | Full stack sovereign |

**Scoring:** Sum all dimension scores (max 32). Level 1: 0–8; Level 2: 9–15; Level 3: 16–22; Level 4: 23–28; Level 5: 29–32.

---

## 2. AI Compliance Framework (Deliverable 18)

### 2.1 Regulatory Landscape Map (July 2026)

| Regulation | Jurisdiction | Effective | Scope | Key requirements |
|---|---|---|---|---|
| **EU AI Act** | EU | Aug 2024 (prohibitions); Aug 2026 (GPAI); Dec 2027 / Aug 2028 (High-Risk) | AI systems in EU market | Risk classification; conformity assessment; transparency; human oversight |
| **GDPR Art. 22** | EU | 2018 | Automated individual decisions | Right to human review; explanation; opt-out |
| **DORA** | EU Financial | Jan 2025 | Digital operational resilience | ICT risk; incident reporting; resilience testing |
| **NIST AI RMF** | US Federal | Jan 2023 | US federal agencies + voluntary adoption | GOVERN; MAP; MEASURE; MANAGE functions |
| **SR 11-7** | US Banking | 2011 (applies to AI) | US banks | Model risk management; documentation; validation |
| **EU MDR (AI)** | EU Healthcare | 2024 | AI as medical devices | SaMD classification; clinical evidence |
| **FDA SaMD** | US Healthcare | 2021 + | AI medical devices | Predetermined change control; real-world performance |
| **ISO 42001:2023** | International | 2023 | Any organization | AI management system standard |
| **ISO/IEC 23894** | International | 2023 | Any organization | AI risk management |
| **China AI Regulation** | China | 2023+ | AI services in China | Algorithmic recommendation; generative AI; deep synthesis |
| **India PDPB + AI policy** | India | 2023+ | Indian market | Data protection; AI governance guidance |

### 2.2 Compliance Control Mapping

| Control | EU AI Act | GDPR | NIST AI RMF | ISO 42001 | SR 11-7 |
|---|---|---|---|---|---|
| AI Risk Classification | Art. 6, 9 | — | MAP 1.1 | Cl. 6.1 | §4 |
| AI Impact Assessment | Art. 9 | DPIA (Art. 35) | MAP 5.1 | Cl. 8.4 | §4 |
| Model documentation | Art. 11, Annex IV | — | GOVERN 6.1 | Cl. 8.5 | §4 |
| Human oversight | Art. 14 | Art. 22 | GOVERN 5.2 | Cl. 8.6 | §5 |
| Transparency / explanation | Art. 13 | Art. 22 | GOVERN 6.2 | Cl. 9.1 | §4 |
| Fairness monitoring | Art. 10 (data) | — | MEASURE 2.5 | Cl. 9.1 | §5 |
| Audit trail | Art. 12 | — | MEASURE 4.1 | Cl. 9.2 | §5 |
| Incident reporting | Art. 73 | Art. 33 | MANAGE 4.1 | Cl. 10.2 | §5 |
| Kill switch | Art. 14 | — | MANAGE 3.2 | Cl. 8.6 | — |

---

## 3. AI Trust Framework (Deliverable 19)

### 3.1 Trust Dimensions

AI trust is multidimensional — earned through demonstrated behavior, not declared by the deployer:

```
AI TRUST FRAMEWORK

Technical Trust (can we verify the system works as claimed?)
├── Performance: does it perform within stated metrics?
├── Robustness: does it hold up under adversarial conditions?
├── Reliability: is uptime and SLA commitment met?
└── Explainability: can decisions be understood and verified?

Ethical Trust (does the system act in accordance with stated values?)
├── Fairness: does it treat all groups equitably?
├── Honesty: does it not deceive users or operators?
├── Constitutional compliance: does it follow its stated constitution?
└── Privacy: does it protect personal data as committed?

Governance Trust (is the organization accountable?)
├── Transparency: are AI systems disclosed and documented?
├── Accountability: are named humans responsible?
├── Auditability: can governance be independently verified?
└── Democratic legitimacy: are affected parties represented?

Sovereign Trust (is control maintained?)
├── Data sovereignty: data stays in-jurisdiction
├── Infrastructure sovereignty: no foreign control point
├── Governance sovereignty: kill switch without vendor
└── Constitutional sovereignty: enterprise sets its own AI values
```

### 3.2 Trust Signals and Evidence

| Trust dimension | Evidence | How measured |
|---|---|---|
| Performance | Model card benchmarks; production metrics | Monthly performance report |
| Robustness | Red-team results; adversarial test pass rate | Quarterly security review |
| Fairness | Demographic parity gap; equalized odds | Monthly fairness dashboard |
| Constitutional | Constitutional violation rate | Real-time dashboard |
| Auditability | Audit ledger coverage; explanation capability | Annual audit |
| Sovereign | Infrastructure sovereignty score; kill switch drill results | Quarterly review |

---

## 4. 24-Month Learning Roadmap (Deliverable 22)

For professionals targeting the **Principal AI Governance Architect** role:

### Months 1–6: Foundations

**Technical foundations:**
- [ ] Complete NIST AI RMF Core training (free: airc.nist.gov)
- [ ] Study EU AI Act in full (eur-lex.europa.eu — read Articles 1-16, 49-51, 72-85)
- [ ] Read ISO 42001:2023 (purchase or institutional access)
- [ ] Learn OPA/Rego: complete opa.dev tutorial + build one AI policy
- [ ] Learn Cedar: complete cedarpolicy.com tutorial + build one agent authorization policy
- [ ] Read: "Constitutional AI: Harmlessness from AI Feedback" (Bai et al., 2022)
- [ ] Read: "Anthropic Model Specification" (2024)

**Governance foundations:**
- [ ] Complete AI Governance course (MIT Sloan, Coursera, or LinkedIn Learning)
- [ ] Study 3 major RAI frameworks: Microsoft, Google, IBM
- [ ] Study OECD AI Principles and UNESCO AI Ethics Recommendation
- [ ] Read: "Weapons of Math Destruction" (O'Neil, 2016) — foundational algorithmic bias
- [ ] Read: "The Alignment Problem" (Christian, 2020) — foundational alignment text

### Months 7–12: Intermediate

**Technical intermediate:**
- [ ] Implement a complete constitutional AI pipeline (constitution → Rego policy → runtime enforcement → audit)
- [ ] Complete AI Fairness 360 (AIF360) tutorial; run bias audit on sample dataset
- [ ] Implement SHAP explanations for a classification model
- [ ] Study OWASP LLM Top 10 and Agentic AI Top 10 (2026)
- [ ] Design and test a kill switch for an agent system

**Governance intermediate:**
- [ ] Write an AI Impact Assessment for a hypothetical use case
- [ ] Design an AI Governance Operating Model (board → agent ops) for a regulated org
- [ ] Study SR 11-7 for AI/ML model risk management (banking)
- [ ] Study DORA (Digital Operational Resilience Act) — AI implications
- [ ] Complete CIPP/E or CIPM certification (privacy foundation)

**Certifications to pursue:**
- [ ] AWS Certified AI Practitioner (foundation)
- [ ] Microsoft AI-900 or AI-102 (Azure AI)
- [ ] CIPP/E (IAPP — privacy) or CIPP/US

### Months 13–18: Advanced

**Technical advanced:**
- [ ] Implement a multi-agent constitutional system with hierarchical constitutions
- [ ] Design and implement an AI audit ledger (WORM storage + chained hashing)
- [ ] Study and implement OpenFGA for agent delegation chains
- [ ] Complete dangerous capability evaluation red-team exercise
- [ ] Contribute to an open-source AI governance project (AIF360, OpenPolicyAgent)

**Governance advanced:**
- [ ] Lead an ISO 42001 gap assessment for a real organization
- [ ] Write an AI Board Reporting pack (full quarterly pack)
- [ ] Complete EU AI Act conformity assessment for a High-Risk system
- [ ] Study Democratic AI and Collective Constitutional AI literature
- [ ] Present AI governance topic at a professional conference or meetup

**Certifications:**
- [ ] ISACA CGEIT (Governance of Enterprise IT) or CRISC (Risk)
- [ ] AWS Security Specialty or Azure Security Engineer (cloud security depth)
- [ ] ISO 42001 Lead Implementer or Lead Auditor

### Months 19–24: Expert

**Expert-level activities:**
- [ ] Lead a full AI governance operating model design and implementation
- [ ] Author or contribute to an AI constitution for an enterprise or government body
- [ ] Design and implement a sovereign AI reference architecture
- [ ] Participate in standards development (ISO/IEC JTC 1/SC 42; NIST NCCoE AI; IEEE)
- [ ] Publish research or practitioner article on AI governance
- [ ] Present at global AI governance forum (AI Safety Summit, OECD, GovAI)

**Certifications:**
- [ ] Certified Information Systems Auditor (CISA — ISACA)
- [ ] ISO 42001 Lead Auditor
- [ ] Advanced TOGAF (for enterprise architecture depth)

---

## 5. Principal AI Governance Architect Interview Guide (Deliverable 23)

:::info How to use this guide
    This guide covers all major interview question patterns for senior AI governance architecture roles: Principal AI Governance Architect, Chief AI Governance Officer, Distinguished AI Architect (Governance), Head of Responsible AI, and AI Risk Architecture Lead. Questions are organized by type, with expected answer structures and follow-up questions interviewers use to probe deeper.

### 5.1 Role Levels and Interview Depth

| Level | Title examples | Expected depth |
|---|---|---|
| **Senior** | Senior AI Governance Architect, AI Risk Architect | Design knowledge; can implement; knows regulations |
| **Principal** | Principal AI Architect, Head of AI Governance | End-to-end design + delivery experience; can mentor; speaks to board |
| **Distinguished** | Distinguished Architect, Chief AI Architect | Industry shaping; standards contribution; can design governance for enterprise-scale multi-agent systems; advises regulators |

---

### 5.2 Core Competency Areas and Interview Signals

| Competency | What strong candidates demonstrate | Red flags |
|---|---|---|
| **AI Governance Strategy** | Can design board-to-ops model with RACI; knows how governance fails at scale; speaks to political dynamics | Treats governance as pure compliance; no operational experience |
| **Constitutional AI** | Constitution engineering methodology end-to-end; can write and explain Rego/Cedar; knows CAI vs. RLHF | Cites Anthropic blog posts without engineering depth |
| **Risk Taxonomy** | Classifies risks by category, severity, and sovereignty dimension; can populate risk register live | Only knows NIST or only knows vendor framework |
| **Regulatory Landscape** | Article-level EU AI Act; NIST AI RMF function-by-function; ISO 42001 clause structure; knows banking, health, government sector variations | Knows names of regulations but not content; can't map controls to clauses |
| **Safety Engineering** | Multi-layer safety stack; kill switch architecture with SLAs; autonomy throttling state machine | Treats safety as model alignment only; no operational safety design |
| **Policy-as-Code** | Writes working Rego and Cedar; knows OpenFGA; can pipeline from principle to runtime policy | Only knows policy as document; no code experience |
| **Agent Governance** | L0–L5 taxonomy; 5-registry governance fabric; multi-agent constitutional hierarchy | No agent governance experience; treats agents as chatbots |
| **Sovereign AI** | 6 sovereignty dimensions; sovereign cloud patterns; air-gappable architecture | Confuses data residency with full sovereignty |
| **Democratic AI** | CCAI process; Algorithmic Impact Assessments; citizen oversight mechanisms | Thinks AI governance is purely a technical problem |
| **Explainability & Audit** | SHAP/LIME implementation; audit ledger design with chained hashing; three lines of defense | SHAP as concept only; no audit architecture experience |

---

### 5.3 Pattern 1: Strategic Design Questions

These questions test whether you can design governance architecture from first principles, not just describe frameworks.

---

**Q1 (Classic):** "Design the complete AI governance operating model for a Tier-1 bank deploying 50 AI agents across retail, risk, and operations."

**What the interviewer is testing:** Architecture from scratch under realistic constraints. Can you translate governance principles into an operating structure?

**Strong answer structure:**
```
1. Governance chain (6 layers):
   Board AI Committee → AI Governance Council (C-suite)
   → CRO / AI Risk Office → RAIO (Responsible AI Office)
   → AI Platform Team → Agent Operations

2. Key functions per layer:
   Board: quarterly AI risk briefing; AI constitutional commitment
   AGC: policy approval; incident escalation; budget
   Risk Office: risk register; regulatory; model validation
   RAIO: constitutions; fairness; ethics; impact assessments
   Platform: infrastructure; policy engine; eval gates; audit ledger
   Agent Ops: monitoring; L1 incident; kill switch activation

3. ARB AI gate — 3-stage: Incubation Review, Pre-Deploy Review, Post-Deploy Review

4. Policy lifecycle: RAIO drafts → AGC approves → Policy engine deploys → Audit monitors → Annual review

5. For banking specifically: SR 11-7 model validation; DORA resilience; EU AI Act High-Risk conformity
```

**Follow-up questions:**
- "How does the RAIO interact with the existing Risk Office — do they overlap?"
- "What happens when a business unit disagrees with RAIO's AI Impact Assessment?"
- "How do you make this governance model enable rather than block AI deployment?"

---

**Q2:** "The board asks why they should invest in Sovereign AI. Make the business case in 5 minutes."

**What the interviewer is testing:** Executive communication; strategic framing of a technical topic; awareness of business drivers beyond compliance.

**Strong answer structure:**
```
Frame as four business risks:

1. Regulatory risk: EU AI Act + DORA require control over AI
   infrastructure and audit capability. If a regulator asks for
   a decision audit and the logs are in a vendor's US data center,
   you cannot comply.

2. Dependency risk: If OpenAI/Microsoft/Google change pricing or
   terms, or suffer an outage, and your core operations run on
   their APIs, you have no fallback. Sovereign AI means no single
   vendor holds operational control.

3. Competitive risk: Competitors building sovereign AI capability
   now will have lower marginal cost and higher resilience at
   scale. Cloud API costs scale linearly; owned infrastructure
   scales with compute economics.

4. Geopolitical risk: Cross-border data flows are increasingly
   restricted. Citizen data processed on foreign infrastructure
   is a political and legal liability.

Sovereign AI investment is risk management,
not a technology preference.
```

**Follow-up questions:**
- "What's the minimum viable sovereign AI stack if full sovereignty isn't achievable in year 1?"
- "How do you measure sovereign AI ROI?"
- "What sovereign AI looks like for a company with 80% cloud-native workloads already?"

---

**Q3:** "A regulator has contacted us about an unexpected AI lending decision. Walk me through your incident response."

**What the interviewer is testing:** Operational crisis management; audit capability; regulatory engagement; governance chain activation.

**Strong answer structure:**
```
Hour 0-1 (triage):
  - Identify the decision: loan ID, model version, timestamp
  - Pull audit ledger record: decision trace, SHAP values, constitutional evaluation
  - Confirm no ongoing exposure: is this a one-off or systematic pattern?
  - Activate RAIO + Legal + CRO

Hour 1-4 (contain):
  - If systematic: throttle affected agent to L1 (human review all decisions)
  - If isolated: document and prepare evidence package
  - Preserve audit ledger (prevent any cleanup or log rotation)

Hour 4-24 (investigate):
  - Root cause: model drift? Data quality? Feature distribution shift?
  - Constitutional compliance check: did the decision violate any principle?
  - Fairness analysis: is this decision part of a demographic pattern?

Day 1-3 (respond):
  - Prepare regulatory response: decision trace, investigation findings,
    remediation plan
  - Human review of affected applicant (GDPR Art. 22 right to review)
  - Board notification if material impact

Day 3-30 (remediate):
  - Model retraining or rollback
  - Control gap analysis
  - Updated AI Impact Assessment
  - Lessons learned to RAIO and AGC
```

**Follow-up questions:**
- "How long do you retain audit ledger records, and what format satisfies court admissibility?"
- "If the root cause is a model you bought from a vendor, what contractual obligation do you invoke?"
- "How do you communicate this to the regulator without creating additional liability?"

---

**Q4:** "Walk me through how you would build an AI governance model for a healthcare system deploying prior authorization AI."

**What the interviewer is testing:** Sector-specific depth; regulatory knowledge (HIPAA, FDA SaMD); clinical safety governance.

**Strong answer structure:**
```
Key constraints to establish first:
1. FDA SaMD — is this AI making or assisting clinical decisions?
   If yes: regulatory pathway may be needed
2. HITL mandatory — clinician retains clinical authority
3. HIPAA — PHI protection; BAA with all AI vendors
4. Equity: demographic disparity monitoring mandatory

Governance structure:
- Chief Clinical AI Officer (not just IT governance)
- Clinical AI Review Board (clinicians + ethicists + governance)
- Patient Advisory Panel (patient advocate participation)
- IRB oversight for training data use

Key constitutional rules:
- HP1: No clinical recommendation without validated evidence base
- HP3: No override of clinician's documented decision
- HR4: Always provide clinician override with mandatory rationale

Autonomy level: Maximum L1 for any clinical decision;
L2 permissible for administrative functions only

Key metrics: Demographic disparity < 0.02; evidence level
compliance 100%; clinician override rate (alarm if too low
or too high — both indicate potential issues)
```

---

### 5.4 Pattern 2: Technical Architecture Deep-Dive

These questions require working code, specific architectural decisions, and operational detail.

---

**Q5:** "Write an OPA policy that enforces GDPR Art. 22 for automated credit decisions."

**What the interviewer is testing:** Policy-as-code depth; can you translate legal text into executable policy?

**Expected working answer:**

```rego
package gdpr.article22

import future.keywords.if

# GDPR Art. 22: No fully automated decision that produces legal
# or similarly significant effect on a natural person, unless:
# (a) necessary for contract; (b) authorised by law; (c) explicit consent

deny[reason] if {
  input.action == "credit_decision"
  input.decision_type == "adverse"  # only adverse triggers the obligation
  input.fully_automated == true
  not human_review_completed
  not explicit_consent_given
  not contract_necessity_established
  reason := "GDPR Art. 22: Adverse automated credit decision requires human review, consent, or contractual necessity"
}

human_review_completed if {
  input.human_reviewer_id != ""
  input.human_review_timestamp != ""
}

explicit_consent_given if {
  input.consent_record.gdpr_art22_explicit == true
  input.consent_record.timestamp != ""
}

contract_necessity_established if {
  input.contract_basis.type == "necessary_for_contract"
  input.contract_basis.documented == true
}
```

**Follow-up questions:**
- "How do you handle the case where the applicant exercises their right to request human review after receiving an automated decision?"
- "How do you deploy this policy to production without blocking 100% of credit decisions on Day 1?"
- "How does this Rego interact with the Cedar policy for agent capability authorization?"

---

**Q6:** "Design an AI audit ledger that could satisfy a court order to reconstruct a decision from 3 years ago."

**What the interviewer is testing:** Audit architecture; WORM storage; cryptographic integrity; evidence admissibility.

**Strong answer structure:**

```
Audit Record Schema (per decision):
{
  header: {
    decision_id, agent_id, model_id, model_version,
    timestamp_utc, session_id
  },
  reasoning_trace: {
    chain_of_thought: [...steps],
    constitutional_evaluation: {
      principles_evaluated: [...],
      violations_found: [],
      enforcement_actions: []
    }
  },
  input_record: {
    feature_values, data_sources, lineage_hashes
  },
  tool_call_log: [{tool, args_hash, result_hash}],
  outcome: {
    decision, confidence, shap_values,
    human_review_status, human_reviewer_id
  },
  integrity: {
    record_hash: sha256(all_above),
    previous_record_hash: "...",  # chained
    hsm_signature: "..."
  }
}

Storage architecture:
- Primary: WORM object storage (S3 Object Lock Compliance mode,
  or equivalent sovereign equivalent)
- Secondary: Immutable audit database replica (different region/jurisdiction)
- Retention: 7 years minimum for regulated decisions; configurable

Admissibility requirements:
- HSM-signed (hardware-based integrity, non-repudiable)
- Chained hash (tampering breaks the chain — detectable)
- Clock synchronization (NTP with audit trail; court requires accurate timestamps)
- Chain of custody: who accessed the record and when

Reconstruction capability:
- Given decision_id, can replay: inputs → model → outputs
- SHAP values stored per decision (not recomputed — recomputing from
  a different model version would give different results)
- Model weight snapshot stored at each version (model registry with
  immutable artifacts)
```

**Follow-up questions:**
- "What happens if the model has been retrained since the decision — can you still reconstruct it?"
- "How do you handle the GDPR right to erasure vs. the regulatory obligation to retain AI decision records?"
- "How do you prove to a court that the audit ledger has not been tampered with?"

---

**Q7:** "An L3 autonomous agent has started taking actions outside its approved scope. Root cause analysis and remediation."

**What the interviewer is testing:** Agent governance operations; autonomy throttling; kill switch protocol; constitutional traceability.

**Strong answer structure:**

```
Immediate response (minutes):
  1. Throttle agent: L3 → L1 (all actions require human review)
     Command: ops.internal/agents/{id}/throttle?level=L1
  2. Suspend new task assignment to this agent
  3. Review last 1,000 decisions in audit ledger for scope violations

Root cause investigation:
  Category A — Goal drift: agent optimised for a metric that led
    it to exploit out-of-scope actions
    → Check: was the reward signal recently changed?
    → Check: did context change (new tools added to registry)?
  
  Category B — Policy gap: the action was not explicitly prohibited
    in Cedar/Rego because the boundary case wasn't anticipated
    → Check: is there a Cedar DENY rule covering this action type?
    → Fix: add explicit DENY rule; redeploy via shadow → canary → full
  
  Category C — Constitutional violation: the action violated a
    constitutional principle the agent was supposed to follow
    → Check: constitutional trace — did classifier flag this action?
    → Fix: retrain classifier on violation examples; update constitution

Governance notification chain:
  Agent Ops → RAIO → CRO (if material) → Board (if systematic)

Remediation:
  1. Close scope gap in Cedar/Rego policy
  2. Add out-of-scope action to constitutional classifier training
  3. Re-validate agent in staging environment
  4. Gradual re-elevation: L1 → L2 → L3 with monitoring periods
  5. Update agent registry: add scope violation to history

Structural fix:
  "Default deny" for agent actions — whitelist permitted actions
  rather than blacklist prohibited ones. This category of incident
  shouldn't be possible with proper default-deny design.
```

---

**Q8:** "Walk me through designing a constitutional classifier for a banking AI agent."

**What the interviewer is testing:** CAI technical depth; training pipeline for constitutional enforcement; integration with policy engine.

**Strong answer structure:**

```
Constitutional Classifier Architecture:

Input: Agent output text / proposed action
Output: {violated: true/false, principle: ID, confidence: 0.0-1.0}

Design choices:
1. Dedicated classifier model: fine-tuned classifier specifically
   trained on constitutional violation examples. Faster, more
   interpretable than the agent model itself.

2. Critique-revise loop: before outputting, agent critiques its own
   output against each constitutional principle; revises if violation
   found. (Anthropic CAI approach — SL-CAI style)

3. Policy engine integration: constitutional classifier runs in parallel
   with Cedar/Rego; Cedar handles explicit rule violations, classifier
   handles principle violations that require semantic understanding.

Training pipeline:
1. Red-team generates constitutional violation examples for each principle
2. Counter-examples (edge cases near boundary) generated
3. Human review of training labels (constitution authors review)
4. Fine-tune on [violation, non-violation] pairs
5. Calibration: ensure confidence scores are meaningful
6. Eval gate: 99.9% true positive rate on known violations; < 1% false positive

Integration:
  Agent generates output →
  Constitutional classifier checks (< 10ms for cached common patterns) →
    If violated: log + BLOCK + escalate
    If near-boundary (confidence 0.7-0.9): log + WARN + human review flag
    If compliant: pass to policy engine (Cedar/Rego) →
      If Cedar blocks: DENY + log
      If Cedar allows: output

Monitoring:
  - Violation rate per principle (daily dashboard)
  - False positive rate (appeals / human overrides that overturned the block)
  - Classifier confidence distribution (degradation signals drift)
```

---

### 5.5 Pattern 3: Regulatory & Compliance Deep-Dive

These questions test article-level regulatory knowledge and practical implementation.

---

**Q9:** "What does EU AI Act Annex III mean for a bank deploying AI in credit scoring?"

**Strong answer:**
EU AI Act Annex III lists categories of High-Risk AI systems. Category 5(b) explicitly covers "AI systems intended to be used to evaluate the creditworthiness of natural persons or establish their credit score." This means:

- Art. 9: Risk management system required (documented, systematic, ongoing)
- Art. 10: Training data governance (bias analysis; data representativeness)
- Art. 11: Technical documentation (Annex IV — 15 required elements)
- Art. 12: Logging (automatic recording of decision events)
- Art. 13: Transparency (clear information to users about AI involvement)
- Art. 14: Human oversight (meaningful oversight mechanisms; GDPR Art. 22 alignment)
- Art. 15: Accuracy, robustness, cybersecurity requirements
- Art. 43: Conformity assessment required before placing on market
- Art. 49: EU declaration of conformity
- Art. 51: Registration in EU database of High-Risk AI systems

**Follow-up:** "GDPR Art. 22 and EU AI Act Art. 14 — are they duplicative or complementary?"
- They are complementary: GDPR Art. 22 gives the data subject a right (to not be subject to solely automated decisions). EU AI Act Art. 14 imposes a supply-side obligation on the deployer (to maintain meaningful human oversight). A bank must comply with both: deployer implements human oversight (AI Act) AND subject can exercise opt-out right (GDPR).

---

**Q10:** "Walk me through ISO 42001:2023 and how it differs from ISO 27001."

**Strong answer structure:**

| Dimension | ISO 42001 | ISO 27001 |
|---|---|---|
| Focus | AI Management System | Information Security Management System |
| Core structure | PDCA; Clause 4-10 (HLS) | PDCA; Clause 4-10 (HLS) |
| Unique to subject | AI system inventory; AI impact assessment; AI risk; AI objectives | Asset inventory; security risk; security controls |
| Controls | Annex A (organizational + technical AI controls) | Annex A (93 security controls) |
| Risk approach | AI-specific risks + GDPR/sector compliance | CIA triad risks (Confidentiality, Integrity, Availability) |
| Certification | Lead Implementer/Auditor (BSI, Bureau Veritas, etc.) | Same certification bodies |
| Relationship | Can be integrated with ISO 27001 (shared management system) | Often precedes 42001 implementation |

Key ISO 42001 clauses a Principal Architect must know:
- Cl. 4.3: Scope definition (which AI systems are in scope)
- Cl. 6.1: AI risk management planning
- Cl. 8.4: AI impact assessment
- Cl. 8.5: System design and development governance
- Cl. 9.1: Performance monitoring (fairness, accuracy, transparency)
- Cl. 10.2: Incident management (AI incidents specifically)

---

**Q11:** "SR 11-7 was written for traditional models. How do you apply it to LLM-based AI systems?"

**Strong answer:**
SR 11-7 (Fed guidance on model risk management) has three pillars: model development and implementation, model validation, and governance/controls. Applying to LLMs:

**Model development:** SR 11-7 requires documentation of purpose, assumptions, and limitations. For LLMs: document training data, fine-tuning approach, intended use boundaries, known failure modes, and performance benchmarks on domain-specific test sets (not just general benchmarks).

**Independent validation:** SR 11-7 requires validation by parties separate from developers. For LLMs: this means independent teams running adversarial red-teaming, bias evaluation, and performance testing — including qualitative human evaluation, not just automated metrics.

**Governance:** SR 11-7 requires ongoing monitoring and model performance review. For LLMs: deploy drift detection (embedding drift, prediction distribution shift), SHAP value monitoring, and constitutional violation rate monitoring. Define thresholds for automatic model quarantine.

**Key SR 11-7 gap for LLMs:** SR 11-7 assumes models have fixed feature inputs and quantitative outputs. LLMs have variable natural language inputs and outputs — traditional numerical model validation doesn't fully transfer. Best practice (2026): hybrid validation combining quantitative (accuracy, fairness, calibration) and qualitative (expert red-team, constitutional audit) evidence.

---

### 5.6 Pattern 4: Behavioral and Leadership Questions

These questions appear at Principal level and above — they test judgment, influence, and organizational leadership.

---

**Q12:** "Tell me about a time you had to push back on a business leader who wanted to deploy an AI system faster than governance allowed. What happened?"

**What the interviewer is testing:** Courage under pressure; ability to hold governance standards without being obstructive; political navigation.

**Strong answer signals:**
- Named a specific governance requirement (not just "governance principles")
- Offered a path forward (faster track, reduced scope) not just a veto
- Engaged the business leader's underlying goal, not just the compliance gap
- Maintained the governance requirement without capitulation

**Red flag signals:**
- Capitulated without getting adequate mitigations in place
- Simply blocked without offering an alternative
- No specific governance requirement cited — "it just didn't feel right"

---

**Q13:** "How would you explain constitutional AI to a board with no technical background?"

**Strong answer:**

> "Think of it like a company's code of conduct — but for AI. Right now, most AI is trained on data and asked to do a job. But there's no explicit set of rules it must never break. Constitutional AI is when we write down those rules — we call them the AI constitution — and make the AI check every action against them before it does anything. If an action would violate the constitution, the AI refuses and flags it for human review, just like a good employee who says 'I can't do that, it violates our code of conduct.' The difference from other AI safety approaches is that the rules are explicit and auditable — your board can read the AI constitution, understand what your AI is and isn't allowed to do, and audit whether it's actually following the rules. That's very different from trusting that a black-box model was 'trained safely.' Constitutional AI gives you accountability."

**Follow-up interviewers often ask:**
- "What if the constitution itself contains a wrong principle?"
- "How do you handle an agent that's technically constitutional but still producing bad outcomes?"

---

**Q14:** "You've been asked to reduce AI governance overhead by 30%. What would you cut first, and what would you never cut?"

**What the interviewer is testing:** Judgment about governance essentials vs. overhead; ability to make hard prioritization decisions.

**Strong answer structure:**
```
Never cut (safety-critical governance):
  - Kill switch testing (if this fails, you can't stop a runaway agent)
  - Constitutional enforcement at runtime (this is the baseline)
  - Audit ledger (regulatory obligation; cannot reconstruct decisions without it)
  - Human review gate for adverse decisions (GDPR Art. 22; regulatory)
  - Fairness monitoring for protected characteristics (legal exposure)

Can streamline / consolidate:
  - Merge overlapping governance committees (ARB + AI Governance Council
    for lower-risk decisions can often share one meeting)
  - Automate compliance reporting that is currently manual
  - Tiered ARB review: lightweight for L0/L1 systems, full for L3+
  - Risk-based approach to AI Impact Assessments (not every system
    needs the same depth of assessment)

Key principle: Governance efficiency should come from risk-tiering
and automation, not from removing controls from high-risk systems.
```

---

**Q15:** "A peer architect disagrees with your constitutional AI design. They argue that policy guardrails (OPA/Cedar alone) are sufficient without a constitutional classifier. How do you handle this?"

**What the interviewer is testing:** Technical confidence; ability to handle disagreement constructively; understanding of the design tradeoff.

**Strong answer:**
Acknowledge the legitimate point: Cedar/OPA is excellent for explicit, rule-based constraints and is significantly faster and more interpretable than a neural classifier. For many constitutional principles that can be fully specified as logical rules (e.g., "never transfer >$X without dual authorization"), Cedar is the right tool.

The constitutional classifier covers what Cedar cannot: principles requiring semantic understanding of natural language output. "Never be deceptive" cannot be expressed as a Cedar rule — it requires semantic analysis. "Always maintain dignity in customer interactions" requires understanding context and tone, not just checking action types.

The right design is layered: Cedar for explicit rules (fast, deterministic, auditable), constitutional classifier for semantic principles (necessary but slower), with most common patterns pre-computed and cached.

Propose a joint design review: map all constitutional principles to one of three categories — explicit rule (Cedar), semantic principle (classifier), or hybrid — and design accordingly.

---

**Q16:** "Your AI governance model has been running for 18 months. The CISO says AI security is insufficient. The CDO says data governance is overlapping with yours. The CRO says AI risk is not integrated with enterprise risk. How do you resolve all three at once?"

**What the interviewer is testing:** Organizational complexity; ability to navigate multi-stakeholder tension; governance model evolution.

**Strong answer structure:**
```
This is a governance maturity problem — the model was right
for deployment, now needs to evolve for scale.

Run a governance operating model review (not a turf war):
  - Invite CISO, CDO, CRO + their leads
  - Map current governance: who owns what, where overlaps exist
  - Document the gaps (what's falling between the cracks?)
  - Produce a revised RACI in 30 days

CISO integration:
  AI security and AI governance are not the same but must be
  coordinated. Create a joint AI Security-Governance Forum;
  define the boundary (governance: what AI can do + accountability;
  security: how AI is protected from attack).

CDO overlap:
  Data governance and AI governance share data classification and
  lineage. Agree on a single source of truth: data governance owns
  data classification; AI governance consumes it and extends with
  AI-specific lineage (training data → model → decision).

CRO integration:
  AI risk should not be a separate registry from enterprise risk.
  Map AI risk categories to enterprise risk taxonomy; establish
  AI risk as a sub-category of operational risk with an agreed
  escalation path to the enterprise risk register.

Outcome: An integrated governance model — not three separate
governance tracks that cross at the edges.
```

---

### 5.7 Pattern 5: Whiteboard / Design Challenge

These are live architecture exercises given in final rounds for Principal/Distinguished roles.

---

**Whiteboard Challenge 1:** "Design the agent governance fabric for a financial services firm running 200 agents across 15 business units. 45 minutes."

**Evaluators look for:**
- Start with the problem constraints (regulatory, scale, operational)
- Five registries identified and their relationships explained
- Policy deployment pipeline (how constitutional changes propagate to 200 agents)
- Kill switch architecture (how you can stop any single agent or all agents in a given SLA)
- Audit ledger design (how you search across 200 agents' decision logs for a regulatory inquiry)
- Exception handling (what happens when an agent is offline and a governance update deploys)

---

**Whiteboard Challenge 2:** "A new EU regulation requires all AI systems to be able to generate a human-readable explanation of any decision within 24 hours of a request. Redesign your audit and explainability architecture to meet this. 30 minutes."

**Evaluators look for:**
- SHAP value storage at decision time (not recomputed on request)
- Natural language explanation generation pipeline
- SLA design: 24-hour requirement → internal SLA of 4 hours to have time for human review
- Multilingual requirement (EU = 24 official languages)
- Citizen-accessible interface (plain language, accessible format)
- Edge cases: what if the model has been updated? What if SHAP values were not stored for older decisions?

---

### 5.8 Pattern 6: Scenario / Crisis Simulation

---

**Q17:** "It's 3am. An automated alert says your L3 trading support agent has made 800 transactions in 90 minutes — 10x normal rate. On-call alerts you. Walk me through your response."

**Strong answer:**
```
Minute 0-5:
  - Kill switch: invoke L4 (system-level pause) for this agent immediately
    Target: < 30 seconds to pause (L3 SLA)
  - Confirm: audit ledger live. Pull last 800 transactions.

Minute 5-15:
  - Triage: are the transactions valid (market orders)? Fraudulent? Test data?
  - Check: did the agent receive a malformed instruction (prompt injection attack)?
  - Check: is this a loop (agent calling itself recursively)?
  - Check: exchange connectivity — did the exchange acknowledge all 800?

Minute 15-30:
  - Escalate to CRO and CISO (financial exposure + potential security incident)
  - Engage exchange emergency contacts (may need to reverse or flag transactions)
  - Confirm constitutional trace: did the agent's constitutional classifier fire?

Hour 1:
  - Root cause: instruction loop? Injection attack? Model behavior under unusual market condition?
  - Regulatory notification if material (DORA: 4-hour ICT incident reporting for significant incidents)

Post-incident:
  - Rate limit control: add hard transaction rate cap in Cedar policy
  - Loop detection: add circuit breaker pattern to agent runtime
  - Constitutional update: add "transaction volume anomaly" as an escalation trigger
```

---

**Q18:** "A civil society organization has published a report claiming your bank's AI lending system discriminates against minority applicants. The press is calling. You have 2 hours before a public statement is needed. What's your governance response?"

**Strong answer:**
```
Hour 0-30 (facts before statement):
  - Pull last 12 months of demographic parity reports from fairness dashboard
  - Identify: is the claim specific (one metric, one group) or broad?
  - Check: if their methodology is published, compare to your own metrics
  - Legal: do not say anything that admits liability before facts are in

Hour 30-60 (governance review):
  - RAIO and CRO convene emergency review
  - If metrics show disparity: acknowledge immediately ("We take this seriously,
    we have identified [X], we are [doing Y]")
  - If metrics don't show disparity: prepare explanation of your methodology
    and offer to share with the civil society org under NDA for audit

Hour 60-120 (statement):
  - Statement: transparent, factual, action-oriented
  - Never say "our AI doesn't discriminate" without data — say "our monthly
    fairness monitoring shows [specific metric]"
  - Commit to: independent audit if you have any uncertainty in your own data;
    engagement with the civil society org

Structural response:
  This incident should trigger a constitution review:
  Add external civil society audit right to the AI constitution.
  Publish demographic performance data quarterly (proactive transparency
  removes the surprise element from future reports).
```

---

### 5.9 Pattern 7: Emerging Topics (2026 Frontier)

These questions test whether you are current on the frontier of AI governance.

---

**Q19:** "How would you govern agentic AI systems operating at L4 autonomy — supervised autonomous — in a regulated enterprise?"

**Strong answer must cover:** Board-level approval (not just RAIO); external audit requirement; real-time human monitoring dashboards; sovereign infrastructure requirement; constitutional certification (not just enforcement); kill switch SLA < 30 seconds; continuous external red-team.

---

**Q20:** "What does the Digital Omnibus 2026 change for enterprises already EU AI Act compliant?"

**Key points:** The Digital Omnibus amendment (2026) adjusted some conformity assessment requirements for SMEs and introduced proportionality provisions. For large enterprises already conformity-assessed: minimal change to substance; some reporting timeline adjustments. The more significant 2026 development is the EU AI Act High-Risk provisions entering enforcement for most systems (August 2026 onwards), meaning enterprises that have been preparing since 2024 are now in live compliance mode.

---

**Q21:** "How do you design AI governance for a system that uses agentic AI for both internal operations and as a product sold to other enterprises?"

**Strong answer must cover:** Two-tier governance: internal (deployer obligations) + product (provider obligations under EU AI Act Art. 25 deployer responsibilities); customer constitutional governance requirements; API-level constitutional enforcement for product API consumers; product model card and conformity documentation; customer audit rights.

---

### 5.10 Scoring Rubric (for Hiring Panels)

| Score | Indicator |
|---|---|
| **5 — Exceptional** | Design is complete, constraints are handled, tradeoffs are explicit, can defend under pushback, adds insights the interviewer hadn't considered |
| **4 — Strong** | Design is sound, key elements are present, handles most follow-up questions |
| **3 — Adequate** | Framework correct, some gaps, handles direct questions but struggles with follow-ups |
| **2 — Developing** | Knows concepts but cannot design or implement; follows frameworks but cannot deviate from them |
| **1 — Insufficient** | Conceptual knowledge only; cannot design; no implementation experience |

Minimum bar for **Principal AI Governance Architect:** Score 4 on technical architecture (Q5, Q6, Q7, Q8), Score 4 on regulatory depth (Q9, Q10, Q11), Score 3 on behavioral (Q12, Q13, Q14).

Minimum bar for **Distinguished Architect / Chief AI Governance Officer:** Score 5 on at least three technical questions; score 4+ on whiteboard challenge; strong organizational complexity handling (Q16).

---

## 6. Standards, Regulations, Certifications, Books, Tools Canon (Deliverable 24)

### 6.1 Standards & Regulations

**Must-know standards:**
- ISO 42001:2023 — AI Management System (the ISO 27001 equivalent for AI)
- ISO/IEC 23894:2023 — AI Risk Management
- ISO/IEC 42006:2025 — AI Governance (emerging)
- NIST AI RMF 1.0 (2023) + AI 600-1 GenAI Profile (2024)
- IEEE P7000 series — Ethics in autonomous and intelligent systems
- OECD AI Principles (2019, 2024 update)

**Must-know regulations:**
- EU AI Act (2024) + Digital Omnibus Amendment (2026)
- GDPR Arts. 5, 6, 22 — data protection and automated decisions
- DORA (EU) — digital operational resilience
- SR 11-7 (US Federal Reserve) — model risk management
- FDA SaMD Guidance (US) — AI/ML in medical devices
- UK AI Strategy + Pro-innovation regulation approach
- China Generative AI Regulation (2023) + Algorithm Recommendation Regulation (2022)

### 6.2 Certifications

| Certification | Body | Domain | Level |
|---|---|---|---|
| ISO 42001 Lead Implementer | Multiple accredited CBs | AI management | Advanced |
| ISO 42001 Lead Auditor | Multiple accredited CBs | AI audit | Advanced |
| CISA | ISACA | IT/AI audit | Professional |
| CRISC | ISACA | Risk and control | Professional |
| CIPP/E, CIPP/US, CIPM | IAPP | Privacy | Professional |
| AWS Certified AI Practitioner | AWS | AI fundamentals | Foundation |
| Microsoft AI-102 | Microsoft | Azure AI | Intermediate |
| Google Professional ML Engineer | Google Cloud | ML in production | Intermediate |
| TOGAF 10 (EA foundation) | Open Group | Enterprise architecture | Professional |

### 6.3 Essential Books

**AI Governance & Ethics:**
- "The Alignment Problem" — Brian Christian (2020)
- "Weapons of Math Destruction" — Cathy O'Neil (2016)
- "Atlas of AI" — Kate Crawford (2021)
- "Human Compatible" — Stuart Russell (2019)
- "Power and Progress" — Daron Acemoglu & Simon Johnson (2023)

**AI Safety & Alignment (technical):**
- "Artificial Intelligence Safety and Security" — ed. Roman Yampolskiy (2018)
- "AI Safety Gridworlds" — Leike et al. (2017, arxiv)
- "Constitutional AI" — Bai et al. (2022, arxiv)
- "Collective Constitutional AI" — Ganguli et al. (2023, arxiv)

**Enterprise AI Governance:**
- "Trustworthy AI" — Beena Ammanath (2022)
- NIST AI RMF Playbook (free download)
- "Responsible AI: Best Practices for Creating Trustworthy AI Systems" — Adnan Masood (2024)

**Policy & Law:**
- "The Age of Surveillance Capitalism" — Shoshana Zuboff (2019)
- "Automating Inequality" — Virginia Eubanks (2018)
- "AI and the Law" — various law review collections

### 6.4 Key Research Papers

- Bai et al. — Constitutional AI (Anthropic, 2022)
- Ganguli et al. — Collective Constitutional AI (Anthropic, 2023)
- NIST AI 600-1 — GenAI Risks (2024)
- MIT AI Risk Repository (Slattery et al., 2024)
- DeepMind Frontier Safety Framework (2024)
- OWASP LLM Top 10 (2023, 2025 update)
- OWASP Agentic AI Top 10 (2026)
- Anthropic Model Specification (2024)

### 6.5 Communities & Organizations

| Organization | Focus | URL |
|---|---|---|
| Partnership on AI | Multi-stakeholder AI governance | partnershiponai.org |
| AI Now Institute | Social implications of AI | ainowinstitute.org |
| Center for AI Safety | AI safety research | safe.ai |
| Future of Life Institute | Existential AI risk | futureoflife.org |
| Ada Lovelace Institute | Democratic AI | adalovelaceinstitute.org |
| OECD.AI | Global AI policy | oecd.ai |
| GovAI (Centre for the Governance of AI) | AI governance research | governance.ai |
| UK AI Safety Institute | Model evaluation | gov.uk/ai-safety-institute |
| IEEE SA AI Ethics | Standards development | standards.ieee.org |

### 6.6 Tools

| Tool | Category | Use |
|---|---|---|
| **AI Fairness 360 (AIF360)** | Fairness | Bias detection and mitigation |
| **Fairlearn** | Fairness | Microsoft fairness toolkit |
| **SHAP** | Explainability | Decision-level feature attribution |
| **LIME** | Explainability | Local model-agnostic explanations |
| **OPA (Open Policy Agent)** | Policy-as-code | Constitutional policy enforcement |
| **Cedar** | Policy-as-code | Agent capability authorization |
| **OpenFGA** | Authorization | Agent delegation chains |
| **MLflow** | Model registry | Model versioning and lineage |
| **Presidio** | Privacy | PII detection and anonymization |
| **Garak** | Safety | LLM vulnerability scanner |
| **HELM** | Evaluation | Holistic model evaluation |
| **RAGAS** | RAG evaluation | RAG pipeline quality |
| **deepeval** | Evaluation | LLM application testing |
| **Adversarial Robustness Toolbox** | Security | Adversarial attack defense |
