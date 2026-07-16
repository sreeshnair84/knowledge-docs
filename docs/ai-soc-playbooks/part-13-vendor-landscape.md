---
title: "Part 13 — AI SOC Vendor Landscape"
date: 2026-07-16
tags: ["vendor", "platform", "edr", "siem", "soar", "llm", "mdr", "evaluation"]
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: pdf-converted
source_file: ""
---

# Part 13 — AI SOC Vendor Landscape (2026)

**Audience:** CISO, SOC Manager, Procurement, Enterprise Architect
**Related:** [Part 05 — SOAR Platforms](part-05-soar-platforms.md) | [Part 06 — AI Models](part-06-ai-models.md)

---

## 1. Market Overview

### Vendor Category Map

```
AI SOC VENDOR ECOSYSTEM (2026)
═══════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│           AI-NATIVE SOC / XDR PLATFORMS                         │
│  SentinelOne (Purple AI)   CrowdStrike (Charlotte AI)           │
│  Cortex XSIAM              Microsoft Security Copilot           │
│  Chronicle SecOps + Gemini  Wiz + AI                            │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│           SIEM PLATFORMS                                        │
│  Microsoft Sentinel          Splunk ES                          │
│  Google Chronicle            IBM QRadar Suite                   │
│  Elastic SIEM                OpenSearch Security                │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│           SOAR / ORCHESTRATION                                  │
│  Microsoft Sentinel (Logic Apps)  Splunk SOAR                  │
│  Cortex XSOAR               Tines                               │
│  Torq                        Shuffle (OSS)                      │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│           EDR / XDR PLATFORMS                                   │
│  CrowdStrike Falcon (Charlotte AI)   SentinelOne (Purple AI)   │
│  Microsoft Defender for Endpoint     Palo Alto Cortex XDR       │
│  Sophos EDR + AI                     Trellix AI                  │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│           THREAT INTELLIGENCE                                   │
│  Recorded Future (AI Insights)   Mandiant Advantage             │
│  MISP (OSS)                      ThreatConnect AI               │
│  Anomali AI                      Intel 471                      │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│           LLM API PROVIDERS (FOUNDATION MODELS)                 │
│  Anthropic (Claude)          OpenAI (GPT-4o)                   │
│  Google (Gemini)             Meta (Llama 3.x via Bedrock)      │
│  Mistral AI                  Cohere (Command)                   │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│           AI AGENT FRAMEWORKS                                   │
│  LangGraph (LangChain)       Microsoft AutoGen / Semantic Kernel│
│  AWS Strands Agents          AWS AgentCore                      │
│  CrewAI                      OpenAI Agents SDK                  │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│           MDR PROVIDERS WITH AI                                 │
│  CrowdStrike Falcon Complete   SentinelOne Vigilance            │
│  Palo Alto Unit 42 MDR         Microsoft Defender Experts       │
│  Arctic Wolf                   Sophos MDR                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. AI-Native SOC / XDR Platform Comparison

| Platform | AI Engine | Key AI Capabilities | Pricing Model | Best Fit |
|---------|----------|---------------------|--------------|----------|
| **Microsoft Security Copilot** | GPT-4 (custom) | NL queries, incident summary, script analysis, remediation guidance | $4/hr SCU | Microsoft-heavy enterprises |
| **CrowdStrike Charlotte AI** | Proprietary + GPT | Threat hunting, incident summary, detection generation, remediation | Bundled with Falcon | CrowdStrike EDR customers |
| **SentinelOne Purple AI** | Proprietary LLM | AI triage, hunting, response, data lake queries in NL | Bundled in Enterprise | SentinelOne EDR customers |
| **Cortex XSIAM (Palo Alto)** | Cortex AI (NVIDIA) | Stitched incident correlation, automated RCA, SOAR integration | Per endpoint + $$ | Large enterprise, complex env |
| **Google Chronicle + SecOps** | Gemini 1.5 | NL hunting, automated detection, SOAR, threat intel | Per-GB fixed pricing | Google Cloud customers |
| **Elastic SIEM** | ELSER + NLP | Semantic search, behavioral ML, generative AI integration | Self-managed/cloud | Cost-sensitive, open source preference |

### Microsoft Security Copilot Deep Dive

```
Microsoft Security Copilot Architecture:
  Foundation: Azure OpenAI Service (GPT-4 turbo variant)
  Context: Integrates with 65+ Microsoft + 3rd-party plugins
  
  Security Skills (plugins):
  ┌───────────────────────────────────────────────────────────┐
  │ First-Party Plugins:                                      │
  │  Microsoft Sentinel       Microsoft Defender Suite        │
  │  Purview (DLP/Compliance) Entra ID (Identity)            │
  │  Defender for Cloud       Intune (Endpoint Mgmt)         │
  │                                                           │
  │ Third-Party Plugins:                                      │
  │  ServiceNow               Splunk                          │
  │  Jamf (Apple MDM)         CrowdStrike                    │
  │  Other MSFT partners                                      │
  └───────────────────────────────────────────────────────────┘
  
  Pricing: Security Compute Units (SCU)
    $4/hour per SCU (minimum 1 SCU)
    Typical enterprise: 3-8 SCUs running 8h/day
    Monthly: 3 SCU × $4/h × 8h/day × 30d = $2,880/month
    
  Key Differentiator:
    - Native integration depth with M365/Azure stack
    - Promptbooks: shareable, versioned AI workflows
    - Standalone + embedded in Sentinel, Defender, Purview
    - No third-party LLM dependency
```

### CrowdStrike Charlotte AI

```
Charlotte AI Architecture:
  Foundation: CrowdStrike proprietary + external LLM integration
  Data: Native access to Falcon Data Replicator (petabytes of sensor data)
  
  Core Capabilities:
    NL Threat Hunting: "Show me all processes that accessed LSASS in last 7 days"
    AI Detection: Auto-generates detections from threat hunting findings
    Incident Summary: AI summarizes incident for handoff (analyst → CISO)
    Guided Remediation: Step-by-step AI remediation plans
    Preventive Controls: AI recommends policy changes to prevent recurrence
  
  Availability: Charlotte AI requires Falcon Insight XDR subscription
  
  Strengths:
  + Unmatched endpoint data depth
  + Native access to Falcon Intelligence threat data
  + "Conversational XDR" — NL queries across full data lake
  
  Limitations:
  - Requires CrowdStrike as primary EDR
  - Limited SIEM integration outside Falcon SIEM
  - No open source/vendor-neutral option
```

### Google Chronicle + Gemini

```
Google Security Operations Architecture:
  SIEM: Chronicle (SOAR + SIEM unified)
  AI: Gemini 1.5 Pro for Security Operations
  Detection: YARA-L rules + ML detections
  
  Gemini AI Capabilities for Security:
    Duet AI (now Gemini) code assistance: KQL/YARA-L generation
    AI-powered detection tuning
    Natural language incident investigation
    Playbook automation via Gemini
    AI threat briefings from TI data
  
  Chronicle Pricing (2026):
    Fixed per-employee pricing (not per-GB ingestion)
    ~$20-30/employee/year (all data included)
    Significant advantage over Splunk's per-GB model for high-volume orgs
    
  Strengths:
  + Fixed pricing advantage over per-GB competitors
  + Google Threat Intelligence included
  + Excellent for high-volume log environments
  
  Limitations:
  - Requires GCP comfort
  - SOAR capabilities less mature than Splunk SOAR
  - Smaller ecosystem than Sentinel
```

---

## 3. EDR / Endpoint AI Comparison

| Vendor | AI Feature Name | Key AI Capabilities | Pricing Impact |
|--------|----------------|---------------------|---------------|
| **CrowdStrike** | Charlotte AI | NL hunting, incident summary, detection gen | +$5-10/endpoint/month |
| **SentinelOne** | Purple AI | AI triage, automated investigation, Singularity Data Lake | Bundled in Enterprise tier |
| **Microsoft Defender** | Security Copilot integration | Script deobfuscation, NL queries, investigation | SCU-based ($4/h) |
| **Palo Alto Cortex XDR** | Cortex AI | Behavioral analytics, incident stitching, RCA | Included in XDR bundle |
| **Sophos** | Sophos AI | Deep learning malware, adaptive attack protection | Included |
| **Trellix** | MVISION AI | Behavioral AI, global intelligence | Included |

---

## 4. LLM API Provider Comparison (2026)

| Provider | Best Model | Context | Security Features | Data Privacy | Enterprise SLA |
|---------|-----------|---------|-------------------|-------------|----------------|
| **Anthropic** | Claude Sonnet 4.6 / Opus 4.8 | 200K tokens | Constitutional AI, strong injection resistance | API data not used for training; enterprise DPA | 99.9% uptime |
| **OpenAI** | GPT-4o | 128K tokens | Content filtering, enterprise data protection | Zero Data Retention (ZDR) available | 99.9% uptime |
| **Google** | Gemini 1.5 Pro | 1M tokens | Vertex AI enterprise controls, VPC-SC | Google Cloud DPA | 99.95% uptime |
| **Meta (via Bedrock)** | Llama 3.1 70B | 128K tokens | Open weights, run in VPC | Full control — run on your infra | AWS SLA |
| **Mistral** | Mistral Large | 128K tokens | EU-based, GDPR native | EU data residency | 99.5% |
| **Cohere** | Command R+ | 128K tokens | Enterprise focus, RAG-optimized | Private deployment option | 99.9% |

### Provider Selection Matrix

```
Decision Tree: LLM Provider Selection for SOC AI

1. Do you have strict data residency requirements?
   → EU only: Mistral (France) or Azure OpenAI (EU regions)
   → US only: AWS Bedrock (us-east, us-west)
   → Air-gapped: Run Llama 3.1 70B on-premises (GPU required)

2. Do you need the highest reasoning quality for complex investigations?
   → Anthropic Claude Opus 4.8 (best for multi-step reasoning)
   → OpenAI GPT-4o (strong alternative)

3. Do you need massive context for large log analysis?
   → Google Gemini 1.5 Pro (1M token context)
   → Anthropic Claude (200K context)

4. Do you need the best cost efficiency at scale?
   → Anthropic Haiku (fastest, cheapest)
   → OpenAI GPT-4o mini
   → Llama 3.1 8B on-premises (near-zero inference cost)

5. Are you a Microsoft shop?
   → Azure OpenAI (GPT-4o) via Sentinel/Security Copilot
   → Microsoft manages compliance (SOC 2, ISO 27001)
```

---

## 5. AI Agent Frameworks

| Framework | Maintained By | License | Best For | SOC Use Case |
|-----------|--------------|---------|----------|--------------|
| **LangGraph** | LangChain | MIT | Complex stateful agents, cycles | Multi-step investigation workflows |
| **AutoGen** | Microsoft | MIT | Multi-agent conversation | SOC analyst simulation, collaborative agents |
| **Semantic Kernel** | Microsoft | MIT | .NET/C# + Python, enterprise | Azure-native SOC deployments |
| **Strands Agents** | AWS | Apache 2.0 | AWS Bedrock integration | AWS-native SOC agents |
| **CrewAI** | CrewAI Inc. | MIT | Role-based agent teams | Simulating SOC team roles (triage, L2, IR) |
| **OpenAI Agents SDK** | OpenAI | MIT | GPT-4 native tool use | Simple tool-using agents |
| **LlamaIndex Workflows** | LlamaIndex | MIT | RAG + agent workflows | Knowledge base retrieval + investigation |

### LangGraph for SOC — Why It's the Leading Choice (2026)

```python
# LangGraph: Cycle support enables true investigation loops
from langgraph.graph import StateGraph, END
from typing import TypedDict, Literal

class SOCState(TypedDict):
    alert: dict
    investigation_depth: int
    findings: list
    requires_more_investigation: bool
    final_verdict: str

def triage_node(state: SOCState) -> SOCState:
    """Initial triage — may trigger deeper investigation."""
    result = triage_agent.analyze(state["alert"])
    return {
        **state,
        "findings": [result],
        "requires_more_investigation": result.confidence < 0.8
    }

def investigation_node(state: SOCState) -> SOCState:
    """Deeper investigation when triage is uncertain."""
    if state["investigation_depth"] > 3:
        # Safety: prevent infinite loops
        return {**state, "requires_more_investigation": False}
    
    new_finding = investigation_agent.dig_deeper(
        state["alert"], 
        state["findings"]
    )
    return {
        **state,
        "findings": state["findings"] + [new_finding],
        "investigation_depth": state["investigation_depth"] + 1,
        "requires_more_investigation": new_finding.uncertainty > 0.3
    }

def route_after_triage(state: SOCState) -> Literal["investigate", "verdict"]:
    """Route to deeper investigation or final verdict."""
    if state["requires_more_investigation"]:
        return "investigate"
    return "verdict"

workflow = StateGraph(SOCState)
workflow.add_node("triage", triage_node)
workflow.add_node("investigate", investigation_node)
workflow.add_node("verdict", verdict_node)
workflow.set_entry_point("triage")

# KEY FEATURE: LangGraph supports CYCLES (unlike linear chains)
workflow.add_conditional_edges("triage", route_after_triage)
workflow.add_conditional_edges("investigate", route_after_triage)
workflow.add_edge("verdict", END)

app = workflow.compile(checkpointer=MemorySaver())
```

---

## 6. Threat Intelligence Vendor Comparison

| Vendor | Coverage | AI Features | Price Range | Best For |
|--------|---------|------------|-------------|----------|
| **Recorded Future** | Comprehensive (dark web, vulnerability, threat actor) | AI Insights summaries, risk scoring, analyst workbench | $150K-300K+/year | Large enterprises, MSSP |
| **Mandiant Advantage** | Nation-state, FIN groups, industrial | AI threat briefings, automated IOC enrichment | $100K-200K/year | High-security targets |
| **Intel 471** | Criminal underground, malware | AI extraction from forums | $80K-150K/year | Financial sector |
| **ThreatConnect** | Aggregated, community + commercial | TQL (threat query language), AI risk scoring | $50K-120K/year | Mid-enterprise |
| **MISP** | Community | No native AI (plugins available) | Free (OSS) | Budget-constrained, community sharing |
| **Anomali ThreatStream** | Aggregated commercial feeds | AI search, automated IOC enrichment | $40K-100K/year | Mid-market |

### TI Integration Pattern

```python
class ThreatIntelIntegrator:
    """Multi-source TI integration with AI synthesis."""
    
    async def enrich_incident(self, incident: dict) -> dict:
        """Enrich from multiple TI sources concurrently."""
        
        iocs = self._extract_iocs(incident)
        
        # Query all sources concurrently
        results = await asyncio.gather(
            self.recorded_future.lookup_iocs(iocs),
            self.mandiant.lookup_iocs(iocs),
            self.misp.lookup_iocs(iocs),
            return_exceptions=True
        )
        
        # AI synthesizes conflicting or complementary intelligence
        synthesis = await self.synthesize_ti_with_ai(iocs, results)
        
        return {
            "iocs": iocs,
            "raw_ti": results,
            "ai_synthesis": synthesis,
            "attribution": synthesis.get("threat_actor"),
            "campaign": synthesis.get("campaign"),
            "recommended_actions": synthesis.get("actions")
        }
```

---

## 7. MDR Providers with AI Capabilities

| Provider | Parent | AI Differentiator | SLA | Price |
|---------|--------|------------------|-----|-------|
| **CrowdStrike Falcon Complete** | CrowdStrike | Charlotte AI in analyst hands, 24/7 coverage | <1h response | $150-300K/year |
| **SentinelOne Vigilance** | SentinelOne | Purple AI + human analysts | <30min response | $120-250K/year |
| **Microsoft Defender Experts** | Microsoft | Security Copilot augmented analysts | Custom SLA | Contact for pricing |
| **Palo Alto Unit 42 MDR** | Palo Alto Networks | AI-assisted threat intel + IR | 15min response | Premium |
| **Arctic Wolf** | Independent | Custom AI platform (Aurora), proactive posture mgmt | Custom | $80-200K/year |
| **Sophos MDR** | Sophos | AI-powered with dedicated team | 4h response | $40-100K/year |

---

## 8. Vendor Evaluation Framework

### SOC AI Vendor Scorecard

```python
VENDOR_EVALUATION_CRITERIA = {
    "AI Capability": {
        "weight": 0.25,
        "dimensions": [
            "LLM quality and accuracy (testable in POC)",
            "Prompt injection resistance",
            "False positive rate in production",
            "Explainability of AI decisions",
            "Multi-modal analysis (logs + binaries + emails)"
        ]
    },
    "Integration": {
        "weight": 0.20,
        "dimensions": [
            "API completeness (read + write + streaming)",
            "Pre-built connectors for current SIEM/EDR",
            "Data residency support",
            "On-premises / air-gapped deployment option"
        ]
    },
    "Security & Compliance": {
        "weight": 0.20,
        "dimensions": [
            "SOC 2 Type II certification",
            "ISO 27001 certification",
            "EU AI Act readiness",
            "Data processing agreement (DPA) availability",
            "No model training on customer data"
        ]
    },
    "Operational Maturity": {
        "weight": 0.15,
        "dimensions": [
            "MTTD improvement documented in customer references",
            "Uptime SLA (>99.9% for security critical)",
            "Support response times",
            "Change management and rollout support"
        ]
    },
    "Cost": {
        "weight": 0.10,
        "dimensions": [
            "Total cost of ownership (3-year)",
            "Pricing transparency (per-alert vs per-user vs flat)",
            "Cost scaling at 2× and 5× alert volume",
            "Exit costs (data portability)"
        ]
    },
    "Innovation": {
        "weight": 0.10,
        "dimensions": [
            "Roadmap transparency and credibility",
            "Research investment (publications, CVEs)",
            "Partner ecosystem"
        ]
    }
}

def score_vendor(vendor_name: str, scores: dict) -> float:
    """Calculate weighted score for vendor evaluation."""
    total = 0
    for category, config in VENDOR_EVALUATION_CRITERIA.items():
        category_score = scores.get(category, {}).get("score", 0)
        total += category_score * config["weight"]
    return total
```

### POC Evaluation Checklist

```
AI SOC VENDOR POC EVALUATION CHECKLIST
══════════════════════════════════════════════════════════════

PRE-POC:
  □ Sign NDA and data processing agreement
  □ Define 30 benchmark alert scenarios (mix of TP/FP)
  □ Agree on success metrics (accuracy, latency, cost)
  □ Request reference customers in similar industry

WEEK 1 — AI ACCURACY TESTING:
  □ Feed all 30 benchmark alerts (with known verdicts)
  □ Measure: Precision, Recall, F1 on benchmark set
  □ Run 5 prompt injection attack tests on email analysis
  □ Test 3 hallucination scenarios (obscure CVEs, invented IOCs)
  □ Measure average triage latency (target: <5 seconds)

WEEK 2 — INTEGRATION TESTING:
  □ Connect to production SIEM (read-only initially)
  □ Test IOC enrichment against live threat intel feeds
  □ Verify PII handling in prompts (observe redaction)
  □ Test audit trail completeness and WORM properties
  □ Verify kill switch capability

WEEK 3 — OPERATIONAL TESTING:
  □ Live traffic for 500 real alerts (evaluated by analysts)
  □ Analyst override rate (target: <15% for vendor to be viable)
  □ Analyst satisfaction survey (target: >7/10)
  □ Token cost measurement vs. vendor's estimate

DECISION CRITERIA:
  □ Accuracy ≥ 88% (precision) AND ≥ 94% (recall) on benchmark
  □ Prompt injection resistance ≥ 4/5 tests passed
  □ Analyst override rate ≤ 15%
  □ Total cost within ±20% of vendor estimate
  □ Data residency confirmed in writing
```

---

*Next: [Part 14 — Future of AI SOC →](part-14-future-soc)*