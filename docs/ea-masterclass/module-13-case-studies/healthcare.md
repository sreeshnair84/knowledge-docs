---
title: "Case Study: Healthcare Network — AI Clinical Documentation"
date: 2026-07-09
---

# Case Study: Healthcare Network — AI Clinical Documentation

!!! abstract "Case Summary"
    A regional healthcare network operating 85 hospitals and employing 120,000 staff faced a physician burnout crisis driven by administrative documentation burden. Physicians spent more than 3 hours per day on clinical documentation, contributing to a 34% burnout rate and 8% annual turnover. The enterprise architecture team proposed an ambient AI clinical documentation platform integrated with the existing Epic EHR via FHIR APIs. Total investment: $8.5M over 2 years. Achieved 52% reduction in documentation time. Physician Net Promoter Score improved from 23 to 61. 94% of at-risk pilot physicians were retained.

---

## 1. Organisation Background

MeridianHealth Network (name anonymised) operates 85 hospitals across 12 states, ranging from level-1 trauma centres to rural critical access hospitals. With 120,000 employees including 18,000 active physicians and advanced practice providers, it is one of the 15 largest health systems in the United States by patient volume, serving approximately 4.2 million patients annually.

**Clinical profile**

| Specialty Group | Physician Count | Documentation Intensity |
|---|---|---|
| Primary care / family medicine | 4,200 | Very high (high visit volume, broad documentation scope) |
| Internal medicine / hospitalists | 3,100 | Very high (complex patients, extensive history requirements) |
| Surgery (general + subspecialty) | 2,400 | High (pre/post-op notes, operative reports) |
| Emergency medicine | 1,800 | Very high (rapid patient turnover, liability documentation) |
| Psychiatry / behavioural health | 800 | High (sensitive content, nuanced narrative required) |
| Other specialties | 5,700 | Moderate to high |

**EHR environment**

MeridianHealth standardised on Epic as its enterprise EHR platform in 2019 following a $320M implementation programme. By 2025, Epic was live across all 85 facilities with a single integrated instance. This standardisation was a significant enabling factor for the AI programme — it meant a single integration point rather than the multi-EHR patchwork common in health systems assembled through acquisition.

**Physician satisfaction crisis**

MeridianHealth's annual physician engagement survey (2025, n=11,400 respondents, 63% response rate) produced alarming results:

- **34% burnout rate** (defined using the Maslach Burnout Inventory — Professional Efficacy subscale), up from 22% in 2022.
- **71%** of respondents identified "administrative and documentation burden" as the primary contributor to job dissatisfaction.
- **58%** reported spending more than 3 hours per day on documentation outside of patient encounters ("pajama time").
- **Physician NPS: 23** — significantly below the 50+ benchmark for high-performing health systems.

!!! danger "The Retention Risk"
    MeridianHealth's Chief Medical Officer characterised the physician satisfaction data as a "slow-motion crisis." The 8% annual physician turnover rate, combined with a national physician shortage, meant that attrition was increasingly difficult to backfill. Exit interviews from 2024–2025 cited documentation burden in 67% of cases as a significant or primary reason for departure. Each physician departure cost an estimated $480,000 in recruitment, credentialing, onboarding, and productivity ramp-up, based on MeridianHealth's own HR analytics model.

---

## 2. Business Problem

### The Documentation Burden Decomposition

The EA team conducted time-motion studies across six pilot specialties over 10 weeks. Physicians carried secure wrist-worn timers and logged activity categories via a mobile app. The data confirmed and extended the survey findings.

| Documentation Activity | Average Daily Time | Notes |
|---|---|---|
| In-encounter note-taking / EHR entry | 1.1 hours | Time that could otherwise be used for patient interaction |
| Post-encounter note completion | 1.4 hours | Majority of "pajama time" occurred here |
| Order entry and prior authorisation | 0.6 hours | Partially separate problem; noted but out of scope |
| Message response (patient portal, internal) | 0.4 hours | Out of scope for this programme |
| **Total documentation (in-scope)** | **2.5 hours (mean)** | Range: 1.8–4.1 hours across specialties |

Emergency medicine and primary care physicians were at the high end (3.5–4.1 hours/day). Surgical subspecialties were at the lower end (1.8–2.2 hours/day), primarily because operative reports are more templated and structured.

### Financial Impact

| Cost Category | Annual Cost | Basis |
|---|---|---|
| Direct physician documentation labour cost | $180M | 18,000 physicians × 2.5 hrs/day × 250 working days × $16/hr implicit cost (at $280/hr fully loaded, 2.5/8 hrs of each physician's day) |
| Physician turnover cost | $68M | 8% turnover × 1,900 departures × $480K/departure × partial attribution to documentation (70% attribution) |
| Recruitment agency fees and locum costs | $24M | Backfill costs during physician vacancy periods |
| Productivity loss (reduced patient volume during ramp-up) | $31M | Average 4-month ramp-up to full productivity for replacement physicians |
| **Total estimated annual burden** | **$303M** | |

The EA team's investment case focused on the $180M direct documentation cost as the primary quantifiable benefit driver, while presenting the turnover and productivity costs as supporting context. This was deliberate: the CMO advised the team that the CFO would scrutinise physician cost attribution modelling aggressively, and the $180M figure — derived from the time-motion study and a straightforward labour cost model — was the most defensible.

---

## 3. AI Opportunity Identification

### Alternatives Evaluated

| Alternative | Description | Reason Rejected |
|---|---|---|
| Offshore clinical scribes | Hire remote scribes in lower-cost locations (India, Philippines) to listen to patient encounters via secure audio and produce notes | Quality concerns for complex clinical documentation; latency (4–6 hour turnaround); physician resistance to third parties listening to encounters; HIPAA business associate agreement complexity with offshore vendors; cost savings marginal ($28M/yr reduction) vs. AI target ($60M/yr) |
| On-site medical scribes | Assign scribes to high-volume physicians (primary care, emergency) | Limited scalability (1:1 physician-to-scribe ratio for full benefit); scribe market tight; estimated $48M annual cost for full programme coverage; does not address "pajama time" notes completed without scribes |
| Voice recognition / speech-to-text | Existing Dragon Medical dictation tools expanded across the network | Dragon already deployed selectively; feedback consistent: dictation reduces typing time but not cognitive load; physicians must still structure, edit, and verify output; studies showed only 15–20% documentation time reduction; does not address Epic field-by-field data entry |
| Structured template optimisation | Re-engineer Epic note templates to reduce fields, use smart phrases, and optimise workflows | Low cost; piloted in 2024 with 12% documentation time reduction; does not address fundamental burden of constructing clinical narrative; addressed as a complement to the AI programme, not a substitute |
| **Ambient AI clinical documentation** | Microphone captures patient-physician conversation; AI generates a structured draft note directly in Epic fields; physician reviews, edits, and approves | Addresses core problem directly; technology mature enough for clinical deployment (Nuance DAX, Suki, Abridge had existing clinical deployments); Epic FHIR API enables structured field population; human review required for all notes (regulatory and liability requirement) |

---

## 4. Current-State Architecture

```
┌──────────────────────────────────────────────────────────────┐
│               MERIDIANHEALTH CLINICAL DOCUMENTATION          │
│                     CURRENT STATE (2025)                     │
└──────────────────────────────────────────────────────────────┘

  PATIENT ENCOUNTER         PHYSICIAN DOCUMENTATION
  ────────────────          ──────────────────────────────────
  ┌──────────────┐          ┌──────────────────────────────┐
  │  Examination │          │  Epic EHR (MyChart / Hyperspace)│
  │  Room        │          │                              │
  │  15–20 min   │          │  ┌────────────────────────┐ │
  │  encounter   │          │  │ Note Editor (SmartText) │ │
  └──────┬───────┘          │  │ • History of Present   │ │
         │                  │  │   Illness (HPI)         │ │
         │ Mental notes,    │  │ • Review of Systems    │ │
         │ scribbled paper, │  │ • Physical Exam        │ │
         │ memory           │  │ • Assessment & Plan    │ │
         │                  │  └────────────────────────┘ │
         │                  │                              │
         ▼                  │  ┌────────────────────────┐ │
  ┌──────────────┐          │  │  Dragon Medical        │ │
  │  Next        │          │  │  (selective deployment) │ │
  │  Patient     │          │  └────────────────────────┘ │
  └──────────────┘          └──────────────┬───────────────┘
                                           │
                            After-hours completion
                                           │
                                           ▼
                            ┌──────────────────────────────┐
                            │  Physician Home / Pajama Time│
                            │  Average 1.4 hrs/day of      │
                            │  post-encounter completion   │
                            └──────────────────────────────┘
```

**Current-state pain points observed:**

- Epic's SmartText functionality reduced some typing burden but required physicians to manually trigger smart phrases and verify structured fields. Cognitive load remained high.
- The post-encounter note completion lag created a clinical risk: notes completed hours after an encounter rely on physician memory rather than contemporaneous documentation. Audit findings in 2024 identified documentation latency as a contributing factor in three adverse event reviews.
- Dragon Medical was deployed across approximately 30% of the physician base. Satisfaction was mixed: emergency physicians found it useful for rapid dictation; primary care physicians reported that the editing burden offset much of the time savings.

---

## 5. Future-State Architecture

```
┌──────────────────────────────────────────────────────────────┐
│               MERIDIANHEALTH CLINICAL DOCUMENTATION          │
│                     FUTURE STATE (TARGET)                    │
└──────────────────────────────────────────────────────────────┘

  PATIENT ENCOUNTER         AMBIENT AI LAYER           EPIC EHR
  ────────────────          ────────────────────       ──────────────────
  ┌──────────────┐          ┌──────────────────┐       ┌──────────────────┐
  │  Examination │◀────────▶│  Ambient Microphone       │  Epic Hyperspace  │
  │  Room        │  Secure  │  (room-embedded or│       │                  │
  │              │  audio   │   wearable badge) │       │  ┌────────────┐  │
  │  Physician + │─────────▶│                  │       │  │  Draft Note│  │
  │  Patient     │          │  ┌────────────┐  │       │  │  (AI-gen)  │  │
  └──────────────┘          │  │  Speech    │  │       │  │  Awaiting  │  │
                            │  │  Processing│  │       │  │  Approval  │  │
                            │  │  (on-prem  │  │       │  └─────┬──────┘  │
                            │  │   or BAA   │  │       │        │         │
                            │  │   cloud)   │  │       │  ┌─────▼──────┐  │
                            │  └─────┬──────┘  │       │  │  Physician │  │
                            │        │         │       │  │  Review &  │  │
                            │  ┌─────▼──────┐  │FHIR   │  │  Approval  │  │
                            │  │  Clinical  │──┼──────▶│  │  Workflow  │  │
                            │  │  NLP Model │  │  API  │  └─────┬──────┘  │
                            │  │  (note gen)│  │       │        │         │
                            │  └────────────┘  │       │  ┌─────▼──────┐  │
                            │                  │       │  │  Signed &  │  │
                            │  ┌────────────┐  │       │  │  Locked    │  │
                            │  │  HIPAA     │  │       │  │  Note      │  │
                            │  │  Audit Log │  │       │  └────────────┘  │
                            │  │  (consent  │  │       └──────────────────┘
                            │  │   + access │  │
                            │  │   records) │  │       ┌──────────────────┐
                            │  └────────────┘  │       │  FDA SaMD        │
                            └──────────────────┘       │  Compliance Log  │
                                                        │  (Class I        │
                                                        │   determination) │
                                                        └──────────────────┘
```

**Key architectural decisions:**

- **FHIR R4 API integration with Epic:** Epic's FHIR APIs were used for note creation and structured data population. Epic's ambient API programme (launched 2024) provided certified integration pathways for ambient AI vendors, significantly reducing custom integration complexity. However, MeridianHealth's Epic instance carried 8 years of customisation debt that made certain structured fields non-standard — a source of significant integration effort.
- **On-premises audio processing:** Patient audio never leaves MeridianHealth's infrastructure. The AI platform vendor was required to support an on-premises deployment model for the speech processing and NLP components. Cloud-only vendors were eliminated during vendor selection for this reason.
- **HIPAA compliance architecture:** All patient audio is encrypted in transit and at rest, with automatic deletion after note generation and physician approval (unless retained for audit purposes under a documented legal hold process). Patient consent is obtained via the standard Epic patient portal consent workflow, amended to include AI documentation consent.
- **FDA SaMD assessment:** The AI note generation system required assessment under the FDA's Software as a Medical Device (SaMD) framework. MeridianHealth's regulatory team determined a Class I determination was appropriate based on the requirement that a physician review and approve all AI-generated notes before they enter the medical record. This determination added 4 months to the programme timeline.

---

## 6. Investment Justification

### Cost Structure

| Category | Year 1 | Year 2 | Total |
|---|---|---|---|
| AI platform licences (ambient AI vendor, per-physician SaaS) | $2.4M | $2.4M | $4.8M |
| Epic FHIR integration and customisation | $1.6M | $0.6M | $2.2M |
| FDA SaMD assessment and regulatory documentation | $0.4M | $0.1M | $0.5M |
| HIPAA privacy engineering and audit infrastructure | $0.3M | $0.1M | $0.4M |
| Physician champion programme and change management | $0.3M | $0.1M | $0.4M |
| Internal EA and programme FTE | $0.1M | $0.1M | $0.2M |
| **Total** | **$5.1M** | **$3.4M** | **$8.5M** |

### Benefits Projection

| Benefit Category | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | 5-Year Total |
|---|---|---|---|---|---|---|
| Physician time savings (47% reduction, $280/hr) | $8.5M | $17.0M | $17.0M | $17.0M | $17.0M | $76.5M |
| Physician turnover reduction (target: 50% reduction in doc-attributed turnover) | $8.0M | $16.0M | $16.0M | $16.0M | $16.0M | $72.0M |
| Productivity uplift (more patients per physician per day) | $1.2M | $2.8M | $3.1M | $3.1M | $3.1M | $13.3M |
| Documentation quality improvements (reduced rework, audit savings) | $0.3M | $0.8M | $1.0M | $1.0M | $1.0M | $4.1M |
| **Total Benefits** | **$18.0M** | **$36.6M** | **$37.1M** | **$37.1M** | **$37.1M** | **$165.9M** |

!!! note "Financial Returns"
    - **Net benefit (5-year, after $8.5M investment):** $157.4M
    - **Physician time savings alone (5-year):** $34M targeted, $76.5M projected (conservative model used $34M in IC presentation to avoid challenging the model's productivity assumptions)
    - **Payback period:** 7 months post full deployment
    - **Primary sensitivity:** Adoption rate. At 60% physician adoption (vs. 90% target), benefits reduce proportionally. The IC presentation modelled 60%, 75%, and 90% scenarios.

---

## 7. Executive Proposal

The proposal was presented to MeridianHealth's Executive Leadership Team (ELT) in November 2025. Key stakeholders and their positions:

### Chief Medical Officer — Skeptical (Physician Trust)

The CMO's concern was not the technology but the physician relationship with it. Her view: "Physicians are not going to trust an AI to write their notes. They trained for years to develop clinical judgment that goes into every word of a note. This will feel like the organisation is trying to replace their expertise, and we'll get active resistance."

**How the EA team responded:** The team proposed a physician champion programme as a non-negotiable component of the programme design, not an afterthought. The champion structure required the CMO to personally select three respected senior physicians per specialty to co-design the pilot. The team also proposed that physicians retain absolute control: AI generates a draft that is never locked, never submitted, and never entered into the medical record without an affirmative physician approval action. The CMO moved to conditional support on the condition that she co-chaired the clinical governance committee for the programme.

### CFO — Supportive (with Scrutiny on Numbers)

The CFO was broadly supportive of the investment rationale but challenged the physician time savings calculation. His specific concern: "If a physician saves 90 minutes per day, how does that translate to revenue? They're salaried. We're not capturing the time savings as margin unless we increase patient volume or reduce headcount."

**How the EA team responded:** The team reframed the primary benefit from physician time savings to physician retention. The $480,000 per-physician replacement cost was well-established in MeridianHealth's own HR data. The team presented a scenario in which the AI programme retained just 40 physicians per year who would otherwise have departed — a 2% improvement in the at-risk pool. At $480,000 per retention, that alone generated $19.2M annually, dwarfing the $8.5M programme investment. The CFO accepted this framing and moved to support.

### CIO — Concerned (Epic Integration Risk)

The CIO's concern was grounded in operational experience: "We spent $320M on Epic. I've seen what happens when you put non-certified third-party tools on top of Epic without going through the right certification process. We create support gaps, upgrade blockers, and compliance risks."

**How the EA team responded:** The team presented documentation that the selected vendor (Nuance DAX Copilot, subsequently verified) was an Epic-certified ambient AI partner with an existing FHIR integration certification. The integration would use Epic's published ambient AI APIs, not custom database connections or screen-scraping. The EA team also committed that the CIO's team would co-own the integration design and that no go-live would occur without the CIO's sign-off on the Epic integration architecture. The CIO moved to neutral, then to support when the certified partnership documentation was reviewed.

**Outcome:** ELT approved Phase 1 funding ($5.1M) with Phase 2 subject to Phase 1 clinical outcomes data.

---

## 8. Implementation Roadmap

```
Phase 1 (Months 1–8): Pilot — 3 Specialties
────────────────────────────────────────────────────────
Month 1-2: FDA SaMD assessment and documentation
           (added to scope based on regulatory team review)
Month 2-3: HIPAA privacy engineering, audit log build,
           patient consent workflow update in Epic
Month 3-5: Epic FHIR integration development and testing
           (3x longer than vendor estimated — see Lessons)
Month 5-6: Pilot deployment with physician champions
           (primary care n=120, hospitalists n=80,
            emergency medicine n=60)
Month 6-8: Pilot outcomes measurement, physician feedback
           collection, model fine-tuning per specialty
Gate:      ≥35% documentation time reduction in pilot;
           physician NPS ≥40 in pilot cohort; zero
           HIPAA incidents; FDA SaMD determination filed

Phase 2 (Months 9–18): Scale — 40 Hospitals
────────────────────────────────────────────────────────
Month 9-11: Specialty-specific AI model fine-tuning
            based on Phase 1 learnings
Month 10-14: Deployment across 40 hospitals
             (training wave structure: champion-led)
Month 13-16: Psychiatry / behavioural health pilot
             (requires additional privacy safeguards
              for sensitive clinical content)
Month 16-18: Outcomes measurement, Phase 3 readiness

Phase 3 (Months 19–24): Full Network
────────────────────────────────────────────────────────
Month 19-22: Remaining 45 hospitals
Month 21-23: Rural / critical access hospital adaptation
             (connectivity constraints require edge
              processing capability)
Month 23-24: Full network steady-state governance handoff
             to Clinical Informatics team
```

---

## 9. Governance

!!! info "HIPAA Privacy Compliance"
    Clinical audio captured during patient encounters is Protected Health Information (PHI). The programme's privacy architecture was reviewed and approved by MeridianHealth's Privacy Officer:
    
    - Patient consent for AI documentation captured via Epic MyChart consent workflow, documented in patient chart.
    - Audio retained for maximum 24 hours post-note generation; deleted upon physician approval of note.
    - All ambient AI vendor personnel accessing MeridianHealth systems are covered under a HIPAA Business Associate Agreement (BAA) with annual review.
    - Access logging for all AI-generated note access recorded to a tamper-evident audit log with 7-year retention.

!!! info "FDA Software as a Medical Device (SaMD) Assessment"
    The EA team engaged MeridianHealth's regulatory affairs team to assess whether the ambient AI documentation system constituted a Medical Device under FDA definitions.
    
    - **Determination:** SaMD Class I (lowest risk class), based on the argument that the AI generates a draft documentation aid that does not inform clinical diagnosis or treatment decisions, and that a physician reviews and approves all output before it enters the medical record.
    - **Timeline impact:** The SaMD assessment and documentation process added 4 months to Phase 1. The EA team had not scoped regulatory assessment into the original programme timeline — this was the programme's most significant planning miss.
    - **Ongoing compliance:** Annual review of SaMD classification required as AI capabilities expand. Any expansion into AI-generated diagnostic suggestions would require reclassification to Class II or III, triggering substantially more rigorous FDA oversight.

!!! info "Clinical Governance"
    - A Clinical AI Governance Committee was established with the CMO as co-chair, comprising the Chief Nursing Officer, Chief Quality Officer, three physician champions per specialty, and the EA programme lead.
    - All AI model updates (including specialty fine-tuning) require committee review and approval before deployment.
    - A quarterly clinical quality review compares AI-generated notes to hand-authored notes on dimensions of completeness, accuracy, and clinical appropriateness, using a structured review protocol developed with the Chief Medical Informatics Officer (CMIO).

!!! info "Physician Champion Programme"
    The physician champion programme was treated as a governance mechanism, not merely a change management tool:
    
    - Champions had veto authority over deployment readiness in their specialty cohort.
    - Champions co-designed the AI review and approval workflow to ensure it matched clinical mental models.
    - Champion feedback was logged and tracked as formal programme input, not advisory opinion.
    - Champions were compensated for their programme time (4 hours/week during Phase 1) at their standard clinical rate.

---

## 10. Realized Business Value

### Outcomes at 18 Months Post-Pilot Launch

!!! success "Documentation Time Reduction"
    - **Target:** 47% reduction in physician documentation time
    - **Achieved:** 52% reduction
    - The AI model performed better than projected primarily because Epic field-population via FHIR (structured data entry) turned out to be more time-efficient than anticipated — physicians were spending significantly more time on structured Epic fields than the baseline time-motion study had captured, because the study had not separately tracked the time physicians spent clicking through Epic's field-navigation hierarchy.

### Physician Outcomes

| Metric | Baseline (2025) | Phase 1 Pilot (Month 8) | Full Network (Month 18) |
|---|---|---|---|
| Physician NPS | 23 | 57 | 61 |
| Burnout rate (MBI-PE subscale) | 34% | 24% (pilot cohort) | 27% (network) |
| Annual physician turnover | 8% | 4.1% (pilot cohort, annualised) | 5.2% (network) |
| Daily documentation time (mean) | 2.5 hrs | 1.2 hrs (pilot) | 1.3 hrs (network) |
| At-risk pilot physicians retained | — | 94% | — |

The 94% retention rate for at-risk pilot physicians was the metric that most powerfully influenced the Phase 2 investment decision. The CMO presented this data to the Board of Directors in Month 9, framing it as evidence that the physician trust concern she had raised during the executive proposal had been substantively addressed.

!!! note "Why 52% Versus the 47% Target"
    The outperformance of the documentation time target was partly real and partly measurement: the baseline time-motion study methodology was refined during Phase 1, revealing that the 2.5-hour baseline had underestimated structured field-entry time. The true baseline was closer to 2.8 hours for primary care and hospitalist physicians, making the 52% reduction more impressive in absolute terms but the percentage gain partially an artefact of baseline recalibration. The EA team documented this transparently in the Phase 2 readiness report.

### Financial Outcomes (Year 1 Post Full Rollout)

| Metric | Projected | Actual |
|---|---|---|
| Physician turnover reduction (documentation-attributed) | 50% | 35% |
| Annual physician replacement cost avoidance | $34M | $22M |
| Productivity uplift (additional patient encounters) | $2.8M | $3.4M |
| Documentation rework and audit savings | $0.8M | $0.6M |
| **Total Year 1 benefit** | **$37.6M** | **$26.0M** |

The turnover reduction was below projection (35% vs. 50%) because the intervention addressed documentation burden specifically, while physician turnover is driven by multiple factors including compensation, schedule, practice culture, and leadership. The EA team's Year 1 projection had over-attributed turnover to documentation burden. The Year 2 projection was revised downward accordingly.

---

## 11. Lessons Learned

### Lesson 1: Physician Trust Requires Physician Champions — There Is No Substitute

The CMO's concern about physician trust was not abstract. In health systems where technology programmes have been imposed on clinicians without meaningful co-design, the result is systematic workarounds, low adoption, and eventual programme failure. The physician champion programme was the single most important investment the EA team made. At the six facilities in Phase 2 where champion engagement was weakest (due to champion availability conflicts), adoption rates were 28 percentage points lower than facilities with strong champion engagement. Trust is earned through co-design and demonstrated respect for clinical judgment — it cannot be assumed, mandated, or marketed into existence.

### Lesson 2: Epic Integration Is at Least Twice as Hard as Vendor Estimates Suggest

The AI vendor estimated 6–8 weeks for Epic FHIR integration. The actual integration took 18 weeks. The primary reasons were: (1) MeridianHealth's Epic instance had 200+ custom fields, many of which were not exposed via standard FHIR endpoints, requiring custom Epic build work; (2) Epic's ambient AI API programme was relatively new and documentation gaps required direct escalation to Epic's technical team; and (3) MeridianHealth's Epic governance process required change control approval for every API configuration change, adding 2–3 week review cycles per iteration. Any health system planning an AI integration with Epic should treat vendor integration timelines as a floor, not an estimate.

### Lesson 3: FDA SaMD Classification Added Four Months and Must Be Scoped from Day One

The EA team did not include FDA SaMD assessment in the original programme scope. When MeridianHealth's regulatory affairs team flagged it during Month 1 of Phase 1, the programme timeline had to be extended by four months. In retrospect, the regulatory assessment should have been completed during the pre-proposal discovery phase so that the timeline impact could be built into the original business case. Going forward, MeridianHealth's EA methodology for clinical AI programmes now includes regulatory classification as a mandatory early discovery activity.

### Lesson 4: Ambient AI Accuracy Varies Significantly by Specialty

The AI model's performance was not uniform across specialties. Emergency medicine and primary care — high-volume, relatively structured encounter types — showed the strongest performance (>85% note accuracy requiring minimal physician edits). Psychiatry and behavioural health showed weaker performance (62% accuracy), reflecting the nuanced, narrative-heavy, and contextually sensitive nature of psychiatric documentation. The EA team learned that ambient AI clinical documentation is not a single product but a family of specialty-specific models. Deploying a single general model across all specialties without speciality-specific fine-tuning will produce inconsistent results and physician rejection in high-complexity specialties.

### Lesson 5: Change Management Is the Programme — Everything Else Is Infrastructure

In retrospect, the EA team characterises the ambient AI platform as the infrastructure and the physician adoption programme as the actual product. The technology worked. The integration worked (eventually). The FDA pathway was navigated. But at every phase transition, the variable that most predicted success or failure was the quality of change management at the facility level — specifically, the presence of a credible, engaged physician champion who could answer peer questions honestly, including acknowledging limitations of the AI output. Facilities where change management was reduced to an email announcement and a training webinar achieved 40–60% adoption. Facilities with active champion programmes achieved 85–95% adoption. The return on the physician champion investment — approximately $1.2M across the full programme — was the highest-returning line item in the programme budget.

---

## 12. Key Takeaways for Enterprise Architects

!!! tip "Takeaway 1: In Healthcare AI, Clinical Trust Is the Architecture"
    Technical architecture decisions matter, but the adoption architecture — who co-designs the system, who champions it, how physician feedback is captured and acted on — is the determinant of programme value. Enterprise architects working in clinical environments must expand their conception of architecture to include the human systems through which technology is adopted.

!!! tip "Takeaway 2: Regulatory Classification Is an Architecture Input, Not a Post-Design Compliance Step"
    The FDA SaMD determination shaped the system design (physician approval workflow, audit logging, note lock behaviour) in fundamental ways. If the EA team had designed the architecture before completing the regulatory assessment, significant rework would have been required. For any clinical AI system, engage regulatory affairs before the first architecture diagram is drawn.

!!! tip "Takeaway 3: Integration with Mature EHR Platforms Requires Deep Instance-Level Knowledge"
    Epic is not a standard FHIR endpoint — it is a highly customised platform with instance-specific configurations that vary significantly between health systems. The EA team learned to treat Epic integration as a bespoke integration engagement, not a commodity API connection. Future programmes will include a dedicated Epic integration discovery phase before any vendor selection, to assess instance-specific complexity.

!!! tip "Takeaway 4: Specialty Heterogeneity Requires Modular AI Architecture"
    A single ambient AI model across all clinical specialties will underperform. The AI architecture must support specialty-specific model variants, with a feedback loop from physician edits back into specialty model fine-tuning. This requires a model management and MLOps capability that most health systems do not have at programme inception. Plan for it from the start, or plan for a significant capability build during Phase 2.

!!! tip "Takeaway 5: Over-Attribution of Complex Problems to a Single Cause Is a Business Case Risk"
    The programme's Year 1 financial results were below projection primarily because physician turnover was over-attributed to documentation burden in the investment case. Physician wellbeing is multifactorial. The ambient AI programme improved documentation burden significantly and contributed to turnover reduction, but it did not solve compensation dissatisfaction, scheduling pressure, or leadership culture issues that also drive turnover. Enterprise architects building AI investment cases should model multi-cause outcomes conservatively and educate executives that AI interventions address specific causes within complex problems, not the entire problem.

---

*This case study is based on a composite of real enterprise architecture engagements across multiple US health systems. All organisation names, financial figures, clinical data, and personnel are anonymised or fictionalised for teaching purposes. Clinical implementation details should not be used as medical or regulatory guidance.*
