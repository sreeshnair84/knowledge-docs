---
title: "Case Study"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "04_manufacturing.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

# **Case Study** 

Ironhaven Industrial — Agentic Quality Control & Supply Disruption Response Platform 

Confidential Internal Engagement Documentation 

Engagement Period: February 2025 – December 2025 

1. Executive Summary 

2. Client Background 3. Business Problem 

4. Constraints 

5. Discovery Transcript 

   - 5.1 Kickoff — Week 1 

   - 5.2 Shop Floor Shadowing — Week 2, Ohio Plant 

   - 5.3 Supply Chain Planning Shadowing — Week 3 

   - 5.4 Capability Mapping and ROI — Week 4 

6. Architecture Workshops 6.1 Business & Information Architecture 

6.2 AI/Platform Architecture — Whiteboard Session, Week 8 

   - 6.3 Edge & Cloud Architecture 

   - 6.4 Integration & API Strategy 

7. Technical Debates 

   - 7.1 Build vs. Buy for the Vision Model 

|7.1 Build vs. Buy for the Vision Model<br>7.2 Per-Line Calibration—How Much Is Enough?|
|---|
|7.3 Supply Chain Recovery Agent—How Much Autonomy?|
|8. Executive Reviews|
|8.1 Works Council Consultation—Week 12 (Germany facilities)|
|8.2 CDO/Board Technology Review—Week 20|
|9. Final Architecture|
|10. Delivery Roadmap|
|11. Risks|
|12. Governance Model|
|13. Production Rollout|
|14. Production Incident—Month 6|
|14.1 Incident Summary|
|14.2 Incident Response Transcript|
|14.3 Remediation|
|15. Lessons Learned|
|16. Enterprise Architecture Artifacts|
|17. Architecture Decision Records (ADRs)|
|18. AI Evaluation Strategy|
|19. Operational Runbook|
|20. Future Roadmap|

# **1. Executive Summary** 

Ironhaven Industrial, a heavy-equipment manufacturer operating six factories across three countries, engaged an Enterprise AI Architecture team to build an agentic platform spanning two shop-floor problems: real-time qualitycontrol triage on production lines, and rapid response to supply-chain disruptions affecting just-in-time component delivery. 

The ten-month engagement produced an edge-deployed visual-inspection agent integrated with existing machinevision hardware, a tool-calling orchestration layer connecting to the plant’s MES (Manufacturing Execution System) and the corporate ERP, and a supply-disruption response agent capable of proposing production-schedule adjustments when a parts shipment was delayed or a supplier quality issue emerged. The platform ran hybrid — inference at the edge on the factory floor for latency-critical quality decisions, cloud-based for the less timesensitive supply-chain reasoning. 

A significant production incident occurred in Month 6: the quality-control agent, newly deployed to a second production line with different lighting conditions than its training environment, triggered a false-positive defect classification that halted the line for approximately three hours before a floor supervisor identified the fault as an environmental miscalibration rather than an actual product defect. The incident reshaped Ironhaven’s approach to per-line calibration and shadow deployment before any new production line rollout. 

Key outcomes: - Defect escape rate (defects reaching the next production stage undetected) reduced by 34% on lines with full deployment - Mean time to production-schedule-adjustment recommendation after a supply disruption event reduced from approximately 1.5 days (manual planning cycle) to under 2 hours - One Class B production incident (unplanned 3-hour line stoppage, no safety impact, no shipped-product impact) triggering a mandatory per-line shadow-deployment and calibration governance process - Avoided cost from the false-positive incident’s root-cause fix estimated to prevent a recurring class of miscalibration issues worth an estimated $600K annually across all six factories once fully rolled out 

# **2. Client Background** 

Ironhaven Industrial manufactures hydraulic and material-handling equipment for construction and agriculture, operating six factories: two in the U.S. Midwest, one in Mexico, two in Germany, and one in Poland. The company runs lean, just-in-time manufacturing with a deep supplier network — a single-tier supplier disruption could halt a production line within 36 to 48 hours given minimal buffer inventory, a deliberate cost-efficiency choice that also created fragility Ironhaven’s leadership had grown increasingly uncomfortable with after two supplier disruptions in the preceding year. 

Ironhaven’s VP of Manufacturing Operations, Klaus Reiner, and Chief Digital Officer, Aisha Bello (hired 18 months prior specifically to modernize the company’s largely on-premises, plant-siloed technology estate), co-sponsored the engagement. Each factory ran its own MES instance with meaningful configuration variance between plants — a legacy of decentralized IT decisions predating Bello’s arrival — which became a persistent architectural constraint throughout the engagement. 

# **3. Business Problem** 

**Quality control.** Existing machine-vision inspection systems on Ironhaven’s lines used older rules-based image processing that generated a high false-positive rate, leading line supervisors to habitually override alerts — which meant genuine defects were sometimes also being waved through by workers desensitized to false alarms. Discovery found this “alarm fatigue” pattern was a bigger driver of the defect-escape problem than the underlying detection technology’s raw accuracy. 

**Supply disruption response.** When a supplier shipment was delayed or a received batch failed incoming quality inspection, production planners manually reworked the affected line’s schedule — determining which work orders could proceed with substitute components, which needed to be pushed back, and how the change cascaded through downstream assembly stages. This process took, on average, a day and a half, during which the line often ran at reduced efficiency or sat idle waiting for a plan. 

# **4. Constraints** 

1. **Edge/latency requirements.** Quality-control decisions had to happen within the production line’s cycle time — for the fastest lines, under 800 milliseconds per inspection point — ruling out any architecture dependent on round-trip cloud inference for the core defect-detection decision. 

2. **Heterogeneous plant IT.** Six factories, largely independent MES configurations, and varying network infrastructure quality (the Poland facility had materially less reliable connectivity to corporate systems than the others) meant the architecture could not assume uniform, always-available cloud connectivity at every site. 

3. **Union and works council considerations.** The German facilities operated under works council codetermination rules requiring formal consultation before deploying any system affecting worker task assignment or job function — a process with its own timeline the engagement had to plan around, not treat as a formality. 

4. **Existing hardware investment.** Ironhaven had recently invested in machine-vision camera hardware across several lines; the new software architecture needed to work with existing sensors where feasible rather than mandating a full hardware refresh, a hard budget constraint from Reiner’s team. 

5. **Safety-critical override.** Any AI-driven line-stoppage recommendation needed to preserve the existing physical safety-interlock systems as the ultimate authority — the AI platform was explicitly a productionquality and efficiency layer, never a replacement for or override of existing safety systems, which remained entirely separate and out of scope. 

6. **Multi-currency, multi-supplier ERP complexity.** The corporate ERP (SAP) held supplier and inventory data with plant-specific customizations that had accumulated over years, requiring careful, plant-by-plant integration rather than a single uniform connector. 

# **5. Discovery Transcript** 

## **5.1 Kickoff — Week 1** 

_Present: Klaus Reiner (VP Manufacturing Ops), Aisha Bello (CDO), Plant Manager from the pilot facility (Ohio), the Enterprise AI Architect (EAA)._ 

**Reiner:** I’ve had two vendors pitch me computer-vision quality systems in the last three years. Both worked fine in the demo. Both got quietly ignored by my floor supervisors within two months because the false-positive rate made them more trouble than they were worth. I don’t want a third one of those. 

**EAA:** That’s a critical piece of context, and I want to design around it directly rather than just promise “better accuracy” like the prior vendors probably did. Can you tell me more about what actually happens when your current system flags a false positive? 

**Reiner:** Line stops, supervisor walks over, looks at the part, usually says “that’s fine,” and hits override. Multiply that by dozens of times a shift and people stop trusting the alerts, then start reflexively overriding real ones too. 

**EAA:** That’s the alarm-fatigue dynamic your team flagged in the RFP, and I think it reframes the actual engineering problem. The naive framing is “build a more accurate defect classifier.” The better framing, given what you just described, is “build a system whose alert behavior earns and keeps supervisor trust” — which means calibrated confidence scoring, clear visual explanation of _why_ something was flagged (not just a binary alert), and a design that treats supervisor overrides as a first-class feedback signal for continuous recalibration, not just an escape hatch. 

**Bello:** I want to add a data point — our six plants have meaningfully different lighting, camera angles, and even part-color variance because we serve slightly different regional customer specs. Whatever we build has to actually work across that variance, not just in the demo plant. 

**EAA:** That’s exactly the kind of constraint I want on the table now rather than discovered during rollout to plant four. I’d propose per-line calibration as a mandatory step before any line goes live, not an optional tuning phase — we’ll come back to this in the architecture discussion, but I want to flag it here because it directly shapes the rollout roadmap and, frankly, the timeline expectations I’d set with your board. 

## **5.2 Shop Floor Shadowing — Week 2, Ohio Plant** 

**Line Supervisor (Danny Okafor):** [gesturing at a hydraulic cylinder housing] See this surface mark? Current system flags this every time, calls it a defect. It’s cosmetic, doesn’t affect function, customer spec allows it. But it looks visually similar to an actual crack defect to the old rules-based system. 

**EAA:** How do you personally distinguish a cosmetic mark from an actual crack? 

**Okafor:** Honestly, mostly texture and how the light catches it, plus I know this specific part family well enough to have a feel for it. That’s twelve years of experience, not something I could easily write down as a rule. 

This session was pivotal — it clarified that the false-positive problem wasn’t primarily a raw detection-accuracy issue but a **discrimination problem between visually similar defect classes** , which shaped the decision (Section 6.2) to build a fine-grained, part-family-specific classification model rather than a generic defect/nodefect binary classifier, and to incorporate supervisor override feedback as active training signal. 

## **5.3 Supply Chain Planning Shadowing — Week 3** 

**Production Planner (Elena Fischer, German facility):** When we get a supplier quality hold notice, I have to figure out: which work orders on this week’s schedule need this specific component lot, do we have substituteeligible inventory from a different supplier, and if not, what’s the least-bad way to resequence the line. I’m doing this in a spreadsheet, cross-referencing SAP data I export manually because our MES and SAP don’t talk to each other in real time. 

**EAA:** If a substitute component exists but from a different supplier, what determines whether it’s actually eligible? 

**Fischer:** Engineering approval — not every substitute is interchangeable, some need an engineering change order first, and that approval status lives in yet another system. 

This added a previously unscoped integration requirement — checking substitute-component engineeringapproval status — directly into the supply-disruption agent’s design (Section 6.4), an example of discovery surfacing a dependency the original RFP hadn’t captured. 

## **5.4 Capability Mapping and ROI — Week 4** 

|**Capability**|**Current State**|**AI Opportunity**|**Impact**|**Feasibility**|
|---|---|---|---|---|
|Visual defect inspection|Rules-based, high false-<br>positive rate|Fine-grained,<br>calibrated ML<br>classification with<br>feedback loop|Very High|Medium|
|Supply disruption<br>schedule replanning|Manual spreadsheet<br>process|Recovery-planning<br>agent w/ engineering-<br>approval-aware<br>substitution|High|Medium|
|Predictive supplier risk<br>scoring|None|Deferred to phase 2 —<br>data quality and<br>supplier-data-sharing<br>agreements not yet in<br>place|Medium|Low|
|Preventive<br>maintenance<br>scheduling|Existing separate<br>program|Out of scope — mature<br>program, not this<br>engagement’s mandate|Low|N/A|

**EAA:** On predictive supplier risk — I want to name explicitly why I’m recommending against attempting this now even though it’s attractive. It requires supplier-shared data (their own production and logistics signals) that Ironhaven doesn’t currently have agreements in place to receive, and building a model on Ironhaven-only historical disruption data alone, without supplier-side leading indicators, is likely to produce a model that’s more confident than it deserves to be. I’d rather recommend the data-sharing agreement work as a parallel, nontechnical workstream and revisit this in phase 2. 

**Bello:** Agreed — and that’s useful ammunition for the supplier-relationship conversations we need to have anyway. 

# **6. Architecture Workshops** 

## **6.1 Business & Information Architecture** 

The engagement organized around two domains, deliberately kept loosely coupled given their different latency and criticality profiles: 

- **Shop Floor Quality Domain** : edge-deployed inspection, latency-critical, plant-local 

- **Supply Chain Recovery Domain** : cloud-based reasoning, less latency-sensitive, cross-plant and ERPintegrated 

## **6.2 AI/Platform Architecture — Whiteboard Session, Week 8** 

**Platform Architect (Sam Ito):** Walk through the quality-control decision path end to end. 

**EAA:** [at whiteboard] Camera captures the part at the inspection point. Edge inference — running on a local GPU appliance at each line, not round-tripping to the cloud, to satisfy the sub-800ms cycle-time requirement — runs the fine-grained classification model. This is a traditional computer-vision model, not an LLM; I want to be clear that “agentic AI” in this domain doesn’t mean an LLM is looking at every part. The model outputs a defect classification with a calibrated confidence score and, critically, a visual explanation — a highlighted region and the nearest-matching defect-class exemplar from the training set — surfaced to the line supervisor’s display, not just a red light. 

**Ito:** Where does the “agent” part come in, then? 

**EAA:** Two places. First, a lightweight orchestration agent handles what happens _after_ a flag — querying the MES for the part’s work order and routing history, checking whether this defect class has a known disposition rule (scrap, rework, engineering review), and pre-populating the supervisor’s disposition decision with that context, saving the manual lookup step Okafor’s team currently does by hand. Second, and this is the more interesting agentic component: the Supply Chain Recovery domain uses an LLM-based orchestrator, because that problem — reasoning about substitution eligibility, schedule cascades, and multi-constraint tradeoffs — is a genuinely different kind of reasoning task than image classification, and benefits from the flexibility an LLM orchestrator provides in ways the vision pipeline doesn’t. 

**Reiner:** So you’re not putting an LLM in the path of every single part inspection. 

**EAA:** Correct, deliberately — that would add latency and cost with no accuracy benefit for what’s fundamentally a well-suited traditional computer-vision problem. Using the right tool for each part of this platform matters more than a uniform architecture story. 

## **6.3 Edge & Cloud Architecture** 

- Edge inference appliances (co-located with existing camera hardware) at each production line, running the fine-grained classification model with per-line calibration profiles (Section 7.2) 

- Kubernetes-based orchestration for the edge fleet, with GitOps-managed model and calibration-profile deployment — allowing controlled, auditable rollout of model updates to specific lines rather than a blanket fleet-wide push 

- Cloud-based (Azure) Supply Chain Recovery orchestrator, since this domain’s latency tolerance (minutes, not milliseconds) and its need to reason across multi-plant, multi-supplier ERP data made cloud-centralized processing the appropriate choice 

- Given the Poland facility’s less reliable connectivity (Section 4), the edge quality-control path was designed to function fully offline for the core inspection decision, with calibration-profile updates and overridefeedback sync happening asynchronously whenever connectivity was available — a resilience requirement that shaped the whole edge architecture, not an afterthought 

## **6.4 Integration & API Strategy** 

- MCP server exposing MES query tools (work order lookup, disposition-rule lookup) and ERP query tools (inventory, supplier data, engineering-approval status per the Week 3 finding) consumed by both the postinspection orchestration agent and the Supply Chain Recovery agent 

- Plant-by-plant MES integration adapters, acknowledging the heterogeneous configuration constraint 

(Section 4) rather than forcing a single connector across all six factories — a real engineering cost the team budgeted for explicitly after the discovery findings 

Event-driven architecture (Kafka) for supply-disruption event detection — supplier quality hold notices, shipment delay alerts — triggering the Recovery agent’s planning workflow 

# **7. Technical Debates** 

## **7.1 Build vs. Buy for the Vision Model** 

**ML Engineer (Devon Park):** There are commercial defect-detection platforms we could license instead of building a custom model. Why build? 

**EAA:** This is a case where I think build is genuinely justified, and I want to walk through why rather than default to build-first. Okafor’s shadowing session showed the core problem is discriminating between visually similar defect classes specific to Ironhaven’s part families and customer specs — that’s not a generic defect-detection problem a commercial platform’s pre-trained models would handle well out of the box; it requires fine-tuning on Ironhaven-specific labeled data regardless of the underlying platform. Given that fine-tuning effort is required either way, and given that a custom model gives full control over the calibration and explanation-surfacing behavior that’s central to solving the actual trust problem Reiner described in Week 1, I’d recommend building on an open computer-vision architecture rather than licensing a commercial platform’s more opaque, harder-tocalibrate pipeline. 

**Park:** That’s a bigger upfront engineering investment. 

**EAA:** It is, and it’s the right tradeoff here specifically because calibration and explainability are the actual value driver, not a nice-to-have — a platform we can’t finely control on those dimensions would reproduce the exact trust failure that killed the two prior vendor tools. 

## **7.2 Per-Line Calibration — How Much Is Enough?** 

**Reiner (Week 10):** Every additional per-line calibration step adds time before a new line can go live. What’s the minimum viable calibration process? 

**EAA:** I want to push back gently on “minimum viable” as the framing, given what happened — or rather, given what we’re trying to prevent from happening — with the two prior vendor tools. I’d propose: for any new production line, a mandatory shadow-deployment period (model runs in parallel with the existing process, flags logged but not acted upon) of at least two weeks, with explicit sign-off from the line supervisor that flagged defects match their own judgment at an agreed accuracy bar, before the model’s outputs go live and actionable. 

**Reiner:** Two weeks per line, across six plants and dozens of lines eventually — that’s a real rollout timeline cost. 

**EAA:** It is, and I’d rather be honest about that cost now than have you discover it the hard way. I’ll note that this exact tradeoff — skipping or compressing shadow deployment to hit a rollout deadline — is the scenario I’d most want to guard against, because a bad experience on line two poisons trust for every subsequent line, the same dynamic that killed the previous vendor relationships. I’d frame the two-week shadow period as insurance against a much larger trust-and-rollout-timeline cost if we get it wrong. 

This exact debate became directly relevant five months later — see Section 14. 

## **7.3 Supply Chain Recovery Agent — How Much Autonomy?** 

**Fischer (production planner, Week 16):** Could the Recovery agent just auto-approve schedule changes below some impact threshold, similar to what I’ve heard other industries do with low-risk automated approvals? 

**EAA:** I’d separate this by consequence type rather than give a blanket answer. A schedule change that only affects sequencing within a single line, with no engineering-approval-required substitution and no customer-commitment impact — that’s a genuinely low-risk category where I could see supporting auto-application with notification, if Klaus’s team is comfortable. A change involving a substitute component that requires engineering approval, or any change that affects a customer delivery commitment, should remain human-approved, full stop, given the downstream consequences are much harder to reverse. 

**Reiner:** I’m comfortable with that tiered approach for the low-risk category, on a trial basis, with full audit logging and an easy rollback if the pattern of low-risk changes ever looks wrong in the monthly review. 

This became ADR-008, a deliberate, risk-tiered autonomy design distinct from the aviation and banking engagements’ blanket human-in-the-loop requirements — appropriate here because the consequence severity and reversibility profile of a shop-floor sequencing change is genuinely different from a crew-legality or credit 

decision. 

# **8. Executive Reviews** 

## **8.1 Works Council Consultation — Week 12 (Germany facilities)** 

Per the constraint noted in Section 4, formal works council consultation was required before deployment planning could proceed at the German plants. 

**Works Council representative:** Our primary concern is whether this system is being used to evaluate individual worker performance — line supervisor override rates, for instance — in a way that could be used punitively. 

**EAA:** I want to answer this directly: the override-feedback data is architected as a _model-improvement signal_ , and I’d recommend, and am prepared to build in, an explicit technical and policy separation preventing override data from being joined to individual worker performance-review systems. That’s not just a promise — I’d propose the data schema itself excludes any worker-identifying field from the override-feedback pipeline, so the technical architecture enforces the boundary rather than relying on a policy that could be quietly violated later. 

**Works Council:** That’s the level of specificity we need to bring back to our members. We’ll need to review the actual data schema before final sign-off, not just take this description at face value. 

**Bello:** We’ll provide full schema documentation — that’s a reasonable ask and consistent with how we should be operating regardless of works council requirements. 

This consultation added roughly five weeks to the German-facility rollout timeline relative to the U.S. and Mexico plants, planned for explicitly rather than treated as a delay to route around. 

## **8.2 CDO/Board Technology Review — Week 20** 

**Bello:** The board’s question is going to be about ROI timeline versus the two prior failed vendor attempts. What’s different this time? 

**EAA:** I’d point to three things, and I’d be honest that the jury is genuinely still out on some of them until we have more production data. First, the explicit design-for-trust approach — calibrated confidence and visual explanation, not just a binary flag — directly targets the alarm-fatigue failure mode that killed the prior tools. Second, the mandatory shadow-deployment and per-line calibration process, which costs rollout time but is specifically insurance against the “worked in the demo plant, failed everywhere else” pattern. Third, active use of supervisor override feedback as a continuous improvement signal, meaning the system should get _better_ at each plant’s specific conditions over time rather than staying static after initial tuning like the rules-based systems did. 

**Board member:** And if the shadow-deployment period reveals the model isn’t good enough for a given line? 

**EAA:** Then that line doesn’t go live until it is, even if that’s later than the target date. I’d rather tell you that honestly now than have a plant manager quietly stop using an unreliable system the way happened with the prior vendors. 

# **9. Final Architecture** 

**Shop Floor Quality Domain** - Edge inference appliances at each production line running a fine-grained, partfamily-specific defect classification model with per-line calibration profiles - Calibrated confidence scoring and visual explanation (highlighted region, nearest-exemplar match) surfaced directly to line supervisors - Postinspection orchestration agent querying MES for work-order context and known disposition rules, pre-populating supervisor decisions - Supervisor-override feedback pipeline (worker-identity-excluded by schema design per ADR007) feeding continuous model recalibration - Kubernetes/GitOps-managed edge fleet deployment, offline-tolerant for the core inspection decision (Poland facility resilience requirement) 

**Supply Chain Recovery Domain** - Kafka-based disruption-event detection (supplier quality holds, shipment delays) - Cloud-based (Azure) LLM orchestrator reasoning over substitution eligibility (engineering-approvalaware), schedule cascade impact, and multi-constraint tradeoffs - Risk-tiered autonomy (ADR-008): low-risk, single-line sequencing changes may auto-apply with notification and audit logging; any change involving engineering-approval-required substitutions or customer-commitment impact requires human planner approval 

# **10. Delivery Roadmap** 

|**Phase**|**Duration**|**Scope**|
|---|---|---|
|Discovery & Architecture|Months 1–2|Discovery, works council consultation<br>initiation (Germany)|
|Vision Model Build (Ohio pilot line)|Months 2–5|Model development, shadow deployment,<br>calibration|
|Ohio Line GA + Recovery Agent Build|Months 5–6 (overlapped)|Line 1 go-live; Recovery agent<br>development begins|
|Second Line Rollout (Ohio)|Month 6|New line shadow deployment|
|Production Incident & Remediation|Month 6|False-positive line stoppage, calibration<br>governance hardening|
|Multi-Plant Expansion (US, Mexico)|Months 7–9|Additional lines, Recovery agent pilot|
|Germany Facilities Rollout|Months 9–11|Post works-council sign-off|
|Poland Facility Rollout|Month 11–12|Offline-tolerant edge deployment<br>validation|

# **11. Risks** 

|**Risk**|**Likelihood**|**Impact**|**Mitigation**|**Owner**|
|---|---|---|---|---|
|Cross-line calibration<br>failure (environmental<br>variance)|Medium (realized —<br>Section 14)|Medium|Mandatory shadow<br>deployment and<br>supervisor sign-off<br>before any line go-live|Manufacturing<br>Operations|
|Alarm fatigue<br>recurrence|Low (post design<br>changes)|High|Calibrated confidence<br>+ visual explanation;<br>override-feedback<br>recalibration loop|ML Engineering|
|Works council relations<br>/ worker trust|Medium|Medium|Schema-enforced<br>separation of override<br>data from performance<br>systems; transparent<br>consultation|CDO / HR|
|Recovery agent over-<br>application of low-risk<br>auto-approval|Low|Medium|Full audit logging,<br>monthly review, easy<br>rollback per ADR-008|Manufacturing<br>Operations|
|Heterogeneous plant IT<br>integration cost<br>overrun|Medium|Medium|Plant-by-plant adapter<br>budget planned<br>explicitly from<br>discovery, not assumed<br>uniform|Platform Architecture|

# **12. Governance Model** 

- **Per-line go-live gate** : mandatory shadow deployment and line-supervisor sign-off, formalized after the Month 6 incident as a non-negotiable governance step rather than a recommended best practice **Data schema governance** : worker-identity exclusion from override-feedback data enforced at the schema level, subject to works council review rights on any schema change **Risk-tiered change approval** for the Recovery agent’s autonomous-action scope (ADR-008), reviewed monthly, with Manufacturing Operations holding rollback authority **Cross-plant model governance** : any change to the core classification model architecture (not per-line calibration, which is routine) requires sign-off from Manufacturing Operations leadership across all affected plants, not just the originating plant 

# **13. Production Rollout** 

The Ohio pilot line reached general availability in Month 5 following successful shadow deployment. The second Ohio line began its shadow-deployment period in Month 6 — this is the line where the Month 6 incident occurred, during what was intended to be the validation phase specifically designed to catch exactly this class of problem before go-live. 

# **14. Production Incident — Month 6** 

## **14.1 Incident Summary** 

The second Ohio production line, in week two of its planned shadow-deployment period (per the Section 7.2 governance requirement), was inadvertently switched from shadow mode to live/actionable mode a day earlier than planned due to a deployment configuration error — a GitOps manifest intended for a staging update was mistakenly applied with the production-actionable flag already set, rather than the shadow-only flag that should have applied during the remaining validation week. 

The line’s lighting conditions differed meaningfully from Line 1 (a different section of the factory with different overhead lighting and a partially reflective floor surface not present on Line 1), which the model’s calibration profile had not yet been tuned for — this was precisely the gap the remaining week of shadow deployment was intended to surface and correct before go-live. The model began flagging a high rate of false-positive defects driven by lighting-induced visual artifacts it misclassified as surface defects. The line halted automatically per the post-inspection orchestration agent’s disposition logic (a high-confidence “critical defect” classification triggered an automatic hold pending supervisor review — itself a deliberate design choice, not a malfunction) for approximately three hours until the floor supervisor identified the pattern as environmental miscalibration rather than genuine defects and manually overrode the model’s holds while calibration was corrected. 

## **14.2 Incident Response Transcript** 

**Reiner (emergency session, within 4 hours):** How did this line go live a week before its shadow-deployment period was supposed to end? 

**Platform Architect (Sam Ito):** Root cause is a deployment configuration error, not a model or calibration failure per se — the GitOps manifest that should have kept this line in shadow-only mode for the remaining validation week was overwritten by a routine staging deployment that didn’t correctly preserve the line-specific shadow flag. This is a process and tooling gap, not evidence the underlying shadow-deployment governance concept from Section 7.2 was wrong. 

**EAA:** I’d agree with that diagnosis, and I want to add a point of accountability: this is exactly the failure mode I flagged as the thing to guard against in Week 10 — not model failure, but pressure or process gaps causing shadow deployment to be skipped or shortened in practice. In this case it wasn’t schedule pressure, it was a tooling gap, but the effect is the same, and the fix needs to address the _mechanism_ by which this could happen, not just this specific instance. 

**Reiner:** Any safety impact? 

**Ito:** None — the physical safety-interlock systems, which are entirely separate from this platform per the Section 4 constraint, were never implicated. This was a production-quality-and-efficiency-layer false alarm, correctly causing the line to hold per its designed logic, not a safety event. 

**EAA:** I’d frame this, uncomfortable as the three-hour stoppage was, as a case where the system’s conservative design — “high-confidence critical-defect classification triggers an automatic hold” — worked exactly as intended given the (mistaken) inputs it had. The actual fix needs to be at the deployment-configuration layer: making it structurally impossible for a line to transition from shadow to actionable mode except through an explicit, auditable sign-off action, not a default state that can be silently overwritten by an unrelated deployment. 

**Reiner:** I want that fix before any other line’s shadow-to-live transition happens, and I want an audit of whether this configuration gap could have affected any other line’s status. 

## **14.3 Remediation** 

The GitOps deployment pipeline was redesigned so that a line’s shadow/actionable status became an explicitly protected configuration value requiring a distinct, audited approval action to change — architecturally separated from the routine model and calibration-profile deployment pipeline that had inadvertently overwritten it. An audit of all other lines’ deployment history confirmed no other line had been affected by the same configurationoverwrite pattern. 

# **15. Lessons Learned** 

1. **A governance process (mandatory shadow deployment) is only as strong as the technical enforcement mechanism behind it.** The Week 10 policy decision was sound; the gap was that “shadowonly” was implemented as a default configuration value that a routine, unrelated deployment could silently overwrite, rather than a protected, explicitly-gated state. Any future safety- or quality-critical staged-rollout mechanism in this platform must make the staging boundary itself tamper-resistant against routine operational changes, not just correctly configured at initial setup. 

2. **A conservative failure mode (automatic hold on high-confidence defect classification) is the right design choice even when it causes an unplanned stoppage from a miscalibration.** The postmortem explicitly declined to weaken this behavior in response to the incident — the alternative (allowing production to continue on a high-confidence critical-defect flag) would trade a costly-but-safe false alarm for a much worse potential outcome if the classification had been a genuine defect. The fix targeted the deploymentconfiguration root cause, not the defect-response logic that behaved correctly given its inputs. 

3. **Separating “was the underlying architecture wrong” from “did an operational process fail to properly execute the architecture” mattered enormously for both the technical fix and the trust conversation with Reiner’s team.** Given the prior history with two failed vendor tools, this distinction — a real, humbly-acknowledged gap that was operational and fixable, not a signal the whole approach was flawed — was central to Ironhaven’s leadership continuing to trust the rollout plan rather than scaling back ambitions after the incident. 

# **16. Enterprise Architecture Artifacts** 

- **Capability Map** : shop floor quality and supply chain recovery domains with AI-opportunity overlay (Section 5.4) 

- **Edge Deployment Topology Diagram** : per-plant appliance inventory, connectivity-resilience annotations (particularly the Poland offline-tolerance design) 

- **Data Schema Documentation** : override-feedback pipeline with explicit worker-identity-exclusion annotation, reviewed by the German works council 

- **Shadow-to-Actionable Transition Protocol** (post-incident artifact): the redesigned, tamper-resistant deployment-gating specification 

# **17. Architecture Decision Records (ADRs)** 

**ADR-001: Core defect classification is a traditional fine-tuned computer-vision model, not an LLM; agentic/LLM components are reserved for post-inspection orchestration and the Supply Chain Recovery domain.** Status: Accepted. See Section 6.2. 

**ADR-002: Custom-built, fine-tuned vision model chosen over licensing a commercial defect-detection platform, prioritizing calibration and explainability control.** Status: Accepted. See Section 7.1. 

**ADR-003: Mandatory two-week minimum shadow-deployment period with line-supervisor sign-off before any new production line’s inspection outputs become actionable.** Status: Accepted, hardened postincident with tamper-resistant technical enforcement (ADR-009). 

**ADR-004: Edge-deployed inference for the core inspection decision, satisfying sub-800ms cycle-time latency requirements; cloud-based LLM orchestration reserved for the Supply Chain Recovery domain’s different latency profile.** Status: Accepted. 

**ADR-005: Offline-tolerant edge architecture for the core inspection decision, with asynchronous sync for calibration updates and override feedback.** Status: Accepted, driven by Poland facility connectivity constraints. 

**ADR-006: MES/ERP integration via plant-by-plant adapters, not a single uniform connector, acknowledging heterogeneous plant IT configuration.** Status: Accepted. 

**ADR-007: Override-feedback data schema structurally excludes worker-identifying fields, preventing joinability with individual performance-review systems.** Status: Accepted, subject to works council review rights on any schema change. 

**ADR-008: Risk-tiered autonomy for the Supply Chain Recovery agent — low-risk, single-line, nonengineering-approval-required, non-customer-commitment-impacting sequencing changes may autoapply with notification; all other changes require human planner approval.** Status: Accepted, trial basis with monthly review. 

**ADR-009 (post-incident): Line shadow/actionable status made a protected, explicitly-gated configuration value, architecturally separated from routine model/calibration deployment pipelines.** Status: Accepted, emergency-scoped remediation. 

# **18. AI Evaluation Strategy** 

- **Defect classification accuracy** : measured per part family and per line, not blended, given the discovery finding that discrimination between visually similar defect classes was the actual challenge **False-positive rate and supervisor override rate** : tracked as the primary trust-health metric, given the alarm-fatigue root cause identified in discovery; a rising override rate is treated as an early-warning signal requiring investigation, not just noise **Shadow-deployment gate criteria** : defined accuracy and false-positive thresholds, plus explicit linesupervisor qualitative sign-off, required before any line’s transition to actionable mode **Supply Chain Recovery plan quality** : evaluated against historical disruption scenarios, cross-checked by production planners for substitution-eligibility correctness (particularly engineering-approval-required cases) given the real-world cost of an incorrect substitution recommendation 

# **19. Operational Runbook** 

- **Shadow-to-actionable transition procedure** : explicit, audited sign-off action required per ADR-009, documented step by step following the Month 6 incident 

- **Cross-line calibration drift monitoring** : scheduled review of override-rate trends per line, flagging any line whose override rate deviates meaningfully from its historical baseline, which could indicate an environmental change (new lighting, equipment change) requiring recalibration **Supply disruption event response** : defined escalation path from automated detection through Recovery agent plan generation to planner review, with SLA targets distinguishing low-risk auto-applied changes from human-approval-required changes 

- **Edge appliance connectivity-loss procedure** : defined behavior and alerting for the offline-tolerant inspection path, particularly relevant to the Poland facility 

# **20. Future Roadmap** 

1. **Predictive supplier risk scoring** (deferred in discovery, Section 5.4), contingent on supplier data-sharing agreements the CDO’s team is pursuing as a parallel workstream — explicitly not to be attempted on Ironhaven-only historical data given the confidence-calibration concern raised in discovery. 

2. **Expansion of risk-tiered Recovery agent autonomy** (ADR-008) to additional change categories, contingent on the trial period’s monthly review showing sustained good performance — an evidence-gated expansion, not a predetermined roadmap commitment. 

3. **Cross-plant model architecture standardization** , balancing the value of shared model improvements against the heterogeneous-plant-conditions reality that drove the mandatory per-line calibration requirement — an open architectural question the team recommended revisiting after a full year of multi-plant production data. 

4. **Full six-plant rollout completion** , with Poland’s offline-tolerant deployment as the final validation of the architecture’s resilience design under real (not simulated) connectivity constraints.
