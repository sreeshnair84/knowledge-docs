---
title: "Use Case Transcript — Agentic AI Security Advisory Session"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["cybersec-architect"]
doc_type: workshop-transcript
session_type:
related_pages: []
---

# Use Case Transcript — Agentic AI Security Advisory Session

**Audience:** Enterprise architects and CISOs who want to see how the concepts from this handbook apply in a realistic CxO advisory setting.

**Related:**
[Overview](index.md) |
[Agentic AI Security](05-agentic-ai-security.md) |
[AI Governance](08-ai-governance.md) |
[Technology Investment](10-technology-investment.md) |
[Industry Case Studies](14-case-studies.md)

> **Scenario:** NorthStone Capital is a €45B AUM European asset management firm headquartered in Amsterdam, with operations in London, Frankfurt, and Singapore. The CTO has proposed adopting agentic AI for investment research, client reporting, and back-office operations. The CISO has called an advisory session before the programme is approved by the Board. The EA firm providing advice has deployed the advisory team.

---

## Participants

| Name | Role | Background |
| --- | --- | --- |
| **Isabel Torres** | Chief Information Officer, NorthStone Capital | Former Head of Technology, investment banking; 20 years in financial services |
| **Marcus Webb** | Chief Information Security Officer, NorthStone Capital | Former Head of Cyber, European Central Bank; CISSP, CISM |
| **Priya Sharma** | Chief Technology Officer, NorthStone Capital | ML background; 8 years building data platforms in asset management |
| **Alex Chen** | Senior Enterprise Architect, Advisory Firm | TOGAF certified; 15 years in financial services EA |
| **Dr. Riya Nair** | AI Security Lead, Advisory Firm | PhD in adversarial ML; former Google DeepMind safety researcher |

---

## Session 1 — Threat Model Review (Morning)

---

**Alex Chen:** Good morning. Thank you for having us. Before we discuss the technology roadmap or investment decisions, we need to establish what we're actually securing. I'd like to start with a threat model for the proposed agentic AI programme. Marcus, can you share the scope as you understand it?

**Marcus Webb:** Priya's team has proposed three initial agents: an Investment Research Agent that reads market data, news feeds, and research documents to surface investment insights for portfolio managers; a Client Reporting Agent that generates quarterly performance reports using internal portfolio data; and a Back Office Agent that processes trade confirmations, reconciles positions, and flags discrepancies.

**Dr. Riya Nair:** Thank you. Let me map those agents to threat surfaces immediately, because the risk profile is very different for each.

The Client Reporting Agent sounds routine, but it has access to client portfolio data — which is some of the most sensitive data in this organisation. The question is: what happens if that agent is compromised? Can an attacker use it to exfiltrate 10,000 client portfolio summaries? That's your most significant data breach scenario right there.

**Marcus Webb:** That's exactly my concern. Priya's team wants to give the agent read access to the portfolio management system. I'm worried about the blast radius.

**Priya Sharma:** But the agent only reads — it doesn't write. And it generates reports for portfolio managers who review them before they go to clients. Isn't the human review sufficient?

**Dr. Riya Nair:** Human review catches obvious errors but it doesn't catch sophisticated exfiltration. Imagine the agent is deployed and a week later an attacker compromises the agent runtime through a vulnerability in a third-party library. The agent now has legitimate read access to your entire client portfolio database. The attacker could, through indirect prompt injection, instruct the agent to embed client data in its intermediate reasoning traces — traces that your team has no visibility into — and exfiltrate that data to an external endpoint the agent has permission to reach.

**Isabel Torres:** *pauses* That scenario is very specific. Is this theoretical or has it happened?

**Dr. Riya Nair:** The Bing Sydney incident in 2023 was the first public case of indirect prompt injection. The Anthropic Claude MCP documentation from 2025 explicitly warns about it. We've seen it in our engagements with two financial services clients in the last year. It is not theoretical.

**Alex Chen:** This is precisely why the threat model must precede the architecture decision. Dr. Nair, can you walk through your threat taxonomy for these three agents?

**Dr. Riya Nair:** Absolutely. Let me structure this by agent.

**Investment Research Agent:**

- Highest risk: indirect prompt injection via news feeds or research documents. Attackers can publish documents with embedded instructions. Your agent reads them as part of its research workflow and executes the attacker's commands.
- Secondary risk: competitive intelligence. If an attacker can query this agent, they can learn which securities your firm is researching — that's material non-public information.
- Tertiary risk: model manipulation to bias research summaries toward specific securities.

**Client Reporting Agent:**

- Primary risk: data exfiltration at scale. Read access to all client portfolios = catastrophic breach if agent is compromised.
- Secondary risk: report manipulation. A manipulated agent could generate subtly inaccurate performance reports — regulatory and legal liability.
- Tertiary risk: client impersonation. The agent may have access to client communication preferences; an attacker could trigger reports to wrong recipients.

**Back Office Agent:**

- This one concerns me most. "Flags discrepancies" — does the agent have any write access to the reconciliation system?

**Priya Sharma:** In the current design, yes — it can mark a trade as reconciled and can create a discrepancy alert in the operations ticketing system.

**Dr. Riya Nair:** So the Back Office Agent can mark trades as reconciled. That is a write action with financial and regulatory consequences. An attacker who compromises that agent and manipulates it to mark discrepant trades as reconciled has created a financial fraud scenario that could be invisible for weeks or months. Under DORA, that is a significant incident.

**Marcus Webb:** *firmly* That needs to be redesigned before we go anywhere near production.

**Priya Sharma:** I understand. We can make the Back Office Agent read-only and have the discrepancy flags require human approval before system writes. That adds a workflow step but I can accept it.

**Alex Chen:** That is the correct instinct, Priya. What you've just described is Human-in-the-Loop for high-risk actions — a key security pattern. Let me show you a formal model.

*[Alex Chen presents the HITL/HOTL/HOOL tier model — from Part 5 of this handbook]*

**Alex Chen:** For the Back Office Agent, every action that writes to a system of record should be Tier 3 — Human-over-the-Loop. A human operations analyst approves the discrepancy classification before it is committed to the system. The agent flags; the human decides.

**Isabel Torres:** That is how we'd want it. We're not trying to eliminate human oversight — we're trying to eliminate the *tedious* parts of the human's work. Let the agent do the reading, the comparing, the flagging. The decision authority stays with our team.

---

## Session 2 — Architecture Design (Mid-Morning)

---

**Alex Chen:** Good. Now that we have a threat model, let me propose a security architecture for this programme.

*[Shares secure multi-agent architecture diagram — analogous to the patterns in Part 13]*

The foundation is a **centralised AI gateway**. Every interaction between NorthStone users and AI models — including the three agents — goes through this gateway. It handles authentication, authorization, input filtering, rate limiting, output filtering, and audit logging. Nothing reaches the model directly.

**Priya Sharma:** We were going to have each agent interact with Azure OpenAI directly. Does the gateway add latency?

**Dr. Riya Nair:** Typically 20–80 milliseconds for the filtering and logging. For investment research and reporting workflows, that is negligible. The security value massively outweighs the latency. More importantly, if you have 12 AI agents two years from now and no gateway, you have 12 different implementations of input filtering — all slightly different, all drifting over time. With a gateway, you have one.

**Alex Chen:** For agent identity, I recommend Azure Managed Identity for all three agents. Each agent gets a unique identity — Investment Research Agent has its own identity, Client Reporting Agent has its own. No shared credentials. No API keys stored in the agent runtime or in configuration files.

**Marcus Webb:** What about the MCP integration? Priya's team wants the agents to call Bloomberg, FactSet, and our internal portfolio management API.

**Dr. Riya Nair:** Each of those integrations becomes an MCP server. The agent calls the MCP server; the MCP server holds the Bloomberg credentials, the FactSet credentials, the portfolio management API key. The agent never sees those credentials. The MCP server validates that the calling agent is authorized to use that specific tool, then makes the call on the agent's behalf.

**Priya Sharma:** So even if an attacker compromises the agent runtime, they can't steal the Bloomberg API key?

**Dr. Riya Nair:** Correct. The credential is in the MCP server, not in the agent. The attacker would need to compromise the MCP server separately. You've reduced your credential exposure surface from "agent runtime" — which is broad — to "MCP server" — which is hardened, monitored, and has no inbound internet access.

**Isabel Torres:** This is more complex than I expected. What does this do to our timeline?

**Alex Chen:** The MVP I'm proposing — gateway + agent identity + MCP servers — adds approximately 6–8 weeks to the initial deployment timeline. The alternative is deploying without these controls and spending 3–6 months remediating after the first incident. In financial services, that incident is a matter of when, not if.

**Isabel Torres:** *to Marcus Webb* Marcus, is Alex's architecture sufficient for you to give this programme security approval for a controlled pilot?

**Marcus Webb:** It addresses the controls I need for a pilot with internal users only — no client-facing deployment yet. I also want to see:

One: Network egress control on the agent runtime. The Investment Research Agent should only be able to reach Bloomberg, FactSet, and our approved news APIs. Not the open internet.

Two: A data classification gate on the Client Reporting Agent. Before any client data enters the agent context, it must pass through our DLP scanner. No personally identifiable client information is submitted to the model unmasked.

Three: A kill switch. If any of these agents starts behaving anomalously, I need to be able to halt all three from a single action, without requiring access to the agent platform itself.

**Dr. Riya Nair:** All three are standard patterns. Kill switch implementation in Azure is a feature flag or a circuit breaker in Azure API Management — you can shut down all agent traffic to the gateway in under 30 seconds.

---

## Session 3 — Investment Decision (Afternoon)

---

**Alex Chen:** Let me now turn to the investment question. Isabel, you mentioned the Board wants a business case. Let me frame the security investment within that context.

*[Presents modified FAIR analysis for financial services agentic AI — adapted from Part 10]*

The Client Reporting Agent, in its proposed form without security controls, represents a potential breach scenario with a loss magnitude of €15M to €40M — that's GDPR fines, client notification costs, regulatory response, and reputational damage to AUM. Probability of a significant breach over 3 years, based on peer incident data: 25–35%.

With the security architecture we've proposed, that probability drops to approximately 5–8%. The residual risk is primarily insider threat and zero-day vulnerabilities — risks that exist regardless of AI.

**Priya Sharma:** What does the security architecture cost?

**Alex Chen:** The AI gateway — we recommend Kong AI Gateway — is approximately €80,000 per year for your scale. MCP server development: approximately €150,000 one-time engineering effort. Agent identity setup: included in existing Azure licensing. DLP integration: €60,000 per year for Purview extension. Kill switch and monitoring: €40,000 per year in observability tooling.

Total incremental security cost: approximately €280,000 year one, €180,000 ongoing.

**Isabel Torres:** The risk reduction is from €5M expected annual loss to approximately €1.5M. That's a €3.5M annual risk reduction for €280,000 investment. That's a very strong ROI case.

**Marcus Webb:** And that doesn't capture the DORA compliance value. Under DORA, a significant ICT incident requires notification to our national competent authority within 4 hours. An AI-related data breach or operational disruption is reportable. The cost of a DORA enforcement action — in terms of regulatory relationship, operational burden, and potential restriction of AI use — is orders of magnitude higher than the security investment.

**Dr. Riya Nair:** There's also the ISO 42001 angle. NorthStone's enterprise clients are beginning to ask for AI governance certification as a condition of AUM mandates. Investec, Allianz, and ABN AMRO all sent AI governance questionnaires to external managers in Q1 2026. ISO 42001 certification, which becomes easier with this security architecture in place, protects approximately €2B of institutional AUM.

**Isabel Torres:** *to Priya Sharma* Priya, I want to make sure you and the security team are aligned on the architecture before I take this to the Board.

**Priya Sharma:** I'm aligned. I'll be honest — six weeks ago I thought Marcus was being overly cautious. Dr. Nair's indirect prompt injection example changed my thinking. I've seen what happened to the competitor firm last year that deployed an AI agent without proper controls. I don't want that to be us.

---

## Session 4 — Governance Framework (Late Afternoon)

---

**Alex Chen:** The last piece we need before Board approval is a governance framework. The Board will ask: how do we know these agents are behaving appropriately over time? How do we stay compliant with EU AI Act requirements?

**Dr. Riya Nair:** Let me propose a lightweight framework for the pilot phase. Three pillars.

**Pillar 1: AI System Register**
Every AI agent is registered with: name, owner, capability description, data accessed, risk classification, approval date, and review date. This register is reviewed monthly by a joint team of Operations, Legal, Compliance, and Security.

Under EU AI Act, the Investment Research Agent and Client Reporting Agent likely fall into the Limited Risk category — they require transparency disclosures to users (recipients of AI-generated research or reports must know that AI was involved). The Back Office Agent may be Limited Risk as well.

**Pillar 2: Continuous Monitoring**
Three types:

- Performance monitoring: Is the agent producing accurate outputs? Portfolio managers score research quality; compliance checks report accuracy.
- Security monitoring: Is the agent behaving within its defined parameters? AI gateway logs reviewed weekly; anomalies trigger investigation.
- Cost monitoring: Is the agent within budget? Token usage tracked; circuit breakers prevent cost overrun.

**Pillar 3: Red Team Quarterly**
Every quarter, our team performs a targeted adversarial test of the agents: injection attempts, goal manipulation, tool misuse. Findings classified by severity; Critical findings trigger immediate remediation and re-approval before agent returns to production.

**Marcus Webb:** I'd add a fourth pillar: Incident Response. We need an AI-specific incident response playbook before we go live. What do we do if the Investment Research Agent starts producing investment recommendations that are subtly biased toward specific securities? That's not a traditional security incident, but it's a high-impact failure mode.

**Alex Chen:** Agreed. The playbook should define: detection criteria for AI-specific incidents, classification (data breach vs. output quality failure vs. agent misbehaviour), response steps including the kill switch procedure, escalation to CISO and Legal, and for reportable incidents, the DORA 4-hour notification preparation process.

**Isabel Torres:** This is a comprehensive programme. What's the one-page summary for the Board?

**Alex Chen:** The summary is this: NorthStone is proposing to deploy three AI agents that will reduce cost and processing time in investment research, client reporting, and back-office operations. The agents will be deployed with enterprise-grade security controls — identity management, data protection, network controls, and human oversight for all consequential actions. The security investment is €280,000 year one, delivering €3.5M in annual risk reduction and protecting institutional AUM at risk from emerging AI governance requirements. The programme is compliant with EU AI Act, DORA, and GDPR. We recommend Board approval of a 90-day controlled pilot with internal users, followed by a security review before client-facing expansion.

**Isabel Torres:** That is the language I need. Marcus, Dr. Nair, Alex — thank you. Priya, let's schedule the detailed architecture review with your engineering team next week.

---

## Key Lessons from This Session

| Principle | Session Evidence |
| --- | --- |
| Threat model before architecture | Dr. Nair's threat model identified the Client Reporting Agent as the highest-risk component — a non-obvious finding given it "only reads" |
| Human oversight for consequential actions | Back Office Agent write access redesigned to read-only + human approval before the architecture review completed |
| Least privilege and credential isolation | MCP server pattern keeps Bloomberg/FactSet credentials out of agent runtime |
| Kill switch as non-negotiable | Marcus insisted on a kill switch before approving the pilot — correctly identified as a basic requirement |
| Risk quantification unlocks investment | FAIR analysis translated "AI security" from a compliance cost to a €3.5M risk reduction with 1250% ROI |
| Regulatory framing protects AUM | ISO 42001 framing connected security investment directly to €2B institutional AUM at risk |
| Governance precedes go-live | AI System Register, continuous monitoring, and red team cadence established before any production deployment |

---

## Artefacts Produced in This Session

1. **Threat Model** — three-agent STRIDE analysis with ATLAS technique mapping
2. **Security Architecture Diagram** — gateway + MCP + agent identity + network controls
3. **FAIR Risk Analysis** — quantified breach scenario for Client Reporting Agent
4. **Investment Business Case** — €280K investment; €3.5M risk reduction; EU AI Act / DORA compliance
5. **AI Governance Framework** — four pillars: Register, Monitoring, Red Team, Incident Response
6. **Board Summary** — one-page executive summary for programme approval
