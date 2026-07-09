---
title: "Part 10 — Technology Investment"
date: 2026-07-09
---

# Part 10 — Technology Investment

**Audience:** Enterprise architects, CISOs, CIOs, and technology investment boards building business cases and roadmaps for cyber security investment.

**Related:**
[Overview](index.md) |
[AI & Security Investment](11-ai-investment.md) |
[EA Deliverables](12-ea-deliverables.md) |
[EA Masterclass — Technology Investment](../ea-masterclass/module-04-technology-investment/index.md)

> **Current as of July 2026.** Security investment is a board-level discussion in most enterprises. This part provides the frameworks, models, and vocabulary needed to justify, prioritise, and govern security technology investment at executive level.

---

## 1. Business Case Development

### 1.1 The Security Investment Narrative

Security investment narratives fail when they are framed as cost centres. Successful narratives frame security as:

1. **Risk reduction**: Quantify the financial impact of the risk being mitigated (FAIR model)
2. **Business enabler**: Security controls enable business activities that would otherwise be too risky (e.g., cloud adoption requires CSPM; AI adoption requires AI governance)
3. **Regulatory compliance**: Non-compliance costs (fines, sanctions, contract loss) exceed investment cost
4. **Competitive differentiation**: Security posture is a selling point for enterprise customers (SOC 2 Type II, ISO 27001)

### 1.2 Business Case Structure

| Section | Content |
|---|---|
| **Executive Summary** | Problem, proposed solution, investment ask, expected outcome in 2–3 sentences |
| **Problem Statement** | Current risk position, capability gap, regulatory exposure |
| **Proposed Solution** | Capability description, vendor/technology selection rationale |
| **Investment Ask** | Total cost (Year 1, 3-year, 5-year); one-time vs. recurring |
| **Expected Benefits** | Risk reduction (quantified); operational savings; compliance |
| **Risk-Adjusted ROI** | NPV, IRR, payback period; sensitivity analysis |
| **Risk of Not Investing** | Likely scenarios if investment not made; probability × impact |
| **Implementation Plan** | Phased delivery; milestones; dependencies |
| **Success Metrics** | KPIs that prove the investment delivered its expected benefit |

### 1.3 FAIR Model for Cyber Risk Quantification

FAIR (Factor Analysis of Information Risk) quantifies cyber risk as a probability distribution of financial loss:

```
Risk = Threat Event Frequency × Loss Magnitude

Threat Event Frequency = Contact Frequency × Probability of Action
Loss Magnitude = Primary Loss + Secondary Loss
                 (direct)      (regulatory, reputational, response costs)
```

**Example FAIR analysis (ransomware scenario):**

| Factor | Estimate |
|---|---|
| Threat event frequency | 0.3 events/year (30% chance of significant ransomware attempt) |
| Vulnerability | 40% chance attempt succeeds (without proposed control) |
| Loss magnitude — primary | $5M (recovery costs, lost revenue, forensics) |
| Loss magnitude — secondary | $2M (regulatory notification, PR, customer remediation) |
| **Annual Loss Expectancy (ALE)** | **0.3 × 0.4 × $7M = $840,000/year** |
| Control cost (proposed EDR + backup) | $200,000/year |
| Residual vulnerability with control | 10% (80% reduction) |
| **Residual ALE** | **0.3 × 0.1 × $7M = $210,000/year** |
| **Risk reduction value** | **$630,000/year** |
| **ROI** | **215% Year 1** |

---

## 2. Technology Roadmaps

### 2.1 Security Technology Roadmap Structure

A security technology roadmap communicates the planned evolution of security capabilities over a 3–5 year horizon:

```
Now (2026)           12–18 months         24–36 months         36–60 months
──────────────────   ──────────────────   ──────────────────   ──────────────────
Baseline:            Enhance:             Optimise:            Lead:
• MFA (TOTP)         • FIDO2/passkeys     • Continuous auth     • AI-driven IAM
• SIEM (legacy)      • XDR platform       • AI-assisted SOC    • Autonomous SOC
• Point EDR          • CNAPP              • Autonomous CSPM    • Self-healing
• Manual patching    • Automated patch    • AI vuln triage     • Predictive risk
• Basic CSPM         • DSPM               • AI governance      • Adaptive trust
```

### 2.2 Roadmap Development Process

1. **Baseline current state**: Map current security capabilities against a reference capability model
2. **Define target state**: Identify the desired capability maturity for each domain (based on risk appetite, regulations, and strategy)
3. **Gap analysis**: Identify gaps between current and target state
4. **Prioritise investments**: Rank gaps by risk reduction value, regulatory urgency, and strategic importance
5. **Sequence initiatives**: Resolve dependencies; create phased delivery plan
6. **Validate with stakeholders**: Review with CISO, CIO, finance, and business stakeholders
7. **ARB approval**: Architecture Review Board sign-off for major capabilities
8. **Track and update**: Quarterly roadmap review against delivery milestones

---

## 3. Capability Mapping

### 3.1 Security Capability Heat Map

A heat map visualises security capability maturity across domains:

| Domain | Current Maturity | Target Maturity | Gap | Priority |
|---|---|---|---|---|
| Identity | 3 | 4 | 1 | High |
| Endpoint | 3 | 4 | 1 | High |
| Cloud Security | 2 | 4 | 2 | Very High |
| Data Security | 1 | 3 | 2 | Very High |
| AI Security | 1 | 3 | 2 | Critical |
| Security Operations | 2 | 4 | 2 | High |
| Network Security | 3 | 4 | 1 | Medium |
| Application Security | 2 | 3 | 1 | High |
| GRC | 2 | 4 | 2 | High |

**Maturity scale: 1=Initial, 2=Developing, 3=Defined, 4=Managed, 5=Optimising**

### 3.2 Value Stream Analysis

Value stream analysis maps security capabilities to the business processes they enable:

| Business Process | Supporting Security Capability | Value at Risk | Investment Priority |
|---|---|---|---|
| Customer data processing | Data encryption, DLP, DSPM | $50M (breach liability) | Critical |
| AI-powered product delivery | AI security controls, prompt gateway | $20M (product liability + brand) | Critical |
| Cloud-hosted services | CSPM, CWPP, CNAPP | $15M (service disruption) | Very High |
| Employee productivity | Identity, ZTNA, endpoint | $5M (ransomware) | High |
| Software development | DevSecOps, SCA, secret scanning | $10M (supply chain) | High |

---

## 4. Investment Prioritisation

### 4.1 Investment Scoring Matrix

Score each security investment on three dimensions:

| Dimension | Weight | Score (1–5) |
|---|---|---|
| **Risk reduction value** | 40% | FAIR-based financial impact reduction |
| **Regulatory / compliance urgency** | 30% | Penalty exposure, audit findings |
| **Strategic enablement** | 20% | Business capability unlocked |
| **Operational efficiency** | 10% | Cost or effort saved |

**Composite score = Σ(weight × score)**

Rank investments by composite score to create a prioritised portfolio.

### 4.2 Risk-Adjusted ROI

Standard ROI does not account for the probabilistic nature of security benefits. Risk-adjusted ROI uses expected value:

```
Risk-Adjusted ROI = (Expected Benefit - Investment Cost) / Investment Cost

Expected Benefit = Σ(Probability of scenario × Financial impact of scenario) × Control effectiveness
```

### 4.3 Portfolio Rationalization

**Platform consolidation economics:**

| Scenario | Annual Cost | Complexity | Visibility |
|---|---|---|---|
| 45 point security tools | $8.5M | Very High | Fragmented |
| Consolidated platform (10–15 tools) | $5.5M | Medium | Unified |
| **Saving from consolidation** | **$3M/year** | | |

**Consolidation risks:** Over-consolidation to a single vendor creates concentration risk. Recommended: 2–3 strategic platform vendors plus best-of-breed fills for specialised needs.

---

## 5. Financial Metrics

### 5.1 TCO (Total Cost of Ownership)

TCO includes all costs over the technology lifecycle:

| Cost Category | Examples |
|---|---|
| **Licensing / subscription** | Annual SaaS subscription; per-seat pricing |
| **Implementation** | Professional services; internal engineering time |
| **Integration** | API integration; SIEM connector development |
| **Training** | Staff training; certification |
| **Operations** | Ongoing management; incident response support |
| **Maintenance** | Patches; configuration updates; tuning |
| **Exit costs** | Data migration; contract termination; replacement |

**AI security TCO additions:** GPU compute for AI analysis; LLM API costs for AI-assisted SOC; AI red team labour; model governance tooling.

### 5.2 NPV (Net Present Value)

NPV discounts future cash flows to present value:

```
NPV = Σ(Cash Flow_t / (1 + discount_rate)^t) - Initial Investment

Where:
  Cash Flow_t = Risk reduction value in year t - Annual operating cost in year t
  discount_rate = WACC or hurdle rate (typically 8–12% for security investments)
```

**Decision rule:** Invest if NPV > 0. Higher NPV = better investment relative to alternatives.

### 5.3 IRR (Internal Rate of Return)

IRR is the discount rate at which NPV = 0. Compare IRR to the organization's hurdle rate:
- IRR > hurdle rate: invest
- IRR < hurdle rate: do not invest (unless strategic or regulatory requirement)

Typical security investment IRR: 20–150% for high-priority risk reduction investments.

### 5.4 Payback Period

Simple payback period: Time until cumulative benefit equals initial investment.

**Rule of thumb for security investments:**
- Critical risk reduction: Accept 18–36 months payback
- Operational efficiency: Require < 18 months payback
- Strategic enablement: May accept 36–48 months if aligned to long-term strategy

---

## 6. Vendor Evaluation and Consolidation

### 6.1 Vendor Evaluation Framework

| Criterion | Weight | Evaluation Method |
|---|---|---|
| **Functional capability** | 30% | PoC evaluation; RFP response scoring |
| **Integration depth** | 20% | Native integrations to existing stack |
| **Vendor viability** | 15% | Financial health; market position; roadmap |
| **TCO** | 15% | Licence + implementation + operations 3-year |
| **Security of the vendor** | 10% | SOC 2 Type II; pen test results; breach history |
| **Support quality** | 10% | SLA; reference checks; escalation procedures |

### 6.2 Build vs. Buy Decision Matrix

| Factor | Lean Buy | Lean Build |
|---|---|---|
| **Differentiation** | Non-differentiating capability | Core competitive advantage |
| **Time to value** | Vendor solution available now | Custom solution needed |
| **Complexity** | Well-understood problem | Novel, unique requirement |
| **Maintenance burden** | Vendor maintains | Internal team owns |
| **Cost** | TCO comparable to build | Build significantly cheaper |
| **Data sensitivity** | Acceptable to share with vendor | Data cannot leave organisation |
| **AI-specific** | AI security controls are not core IP | Proprietary AI security approach |

**For AI security tools:** Most organizations should buy prompt gateways, AI gateways, and DSPM. Build custom AI red team automation and proprietary AI security controls only where differentiated.

---

## 7. Security Debt and Legacy Modernisation

### 7.1 Security Debt Definition

Security debt is the accumulated risk from deferred security controls, legacy systems, and technical shortcuts that increase vulnerability over time.

**Sources of security debt:**
- Unsupported operating systems and software (Windows Server 2012, Python 2.7)
- Unpatched vulnerabilities > 90 days old
- Legacy authentication (passwords without MFA, NTLM)
- Shadow IT (unapproved cloud services with no security controls)
- Hardcoded credentials in source code
- Missing encryption for sensitive data at rest
- AI tools adopted without governance or controls

### 7.2 Security Debt Quantification

| Debt Category | Inventory Item | Risk Score | Remediation Cost | Priority |
|---|---|---|---|---|
| Unpatched critical CVEs | 47 instances | 9.2/10 | $120K | Critical |
| Legacy OS (EOL) | 12 servers | 8.5/10 | $200K | Critical |
| Hardcoded credentials | 23 repos | 8.0/10 | $80K | Critical |
| Missing MFA | 340 users | 7.5/10 | $50K | High |
| Unencrypted S3 buckets | 8 buckets | 7.0/10 | $20K | High |
| AI tools without governance | 12 tools | 6.5/10 | $150K | High |

### 7.3 Technology Investment Decision Architecture

```
Board / Risk Committee
    ↓ sets
Risk Appetite Statement
    ↓ informs
CISO Investment Strategy (3-year roadmap)
    ↓ executed through
Annual Security Budget Cycle
    ├─ Run budget (keep-the-lights-on; maintenance)
    ├─ Grow budget (capability enhancement)
    └─ Transform budget (new capabilities; major initiatives)
```

**Target allocation (mature enterprise):**
- Run: 50–60% of security budget
- Grow: 25–35%
- Transform: 10–20%

As AI security matures, Transform budget should shift AI-related capabilities into Grow, then Run — reflecting the progression from novel investment to standard operational expense.
