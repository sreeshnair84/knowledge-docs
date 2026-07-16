---
title: "Part 05 — SOAR Platform Comparison"
date: 2026-07-16
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["soar", "microsoft-sentinel", "splunk", "cortex-xsoar", "google-secops", "tines"]
---

# Part 05 — SOAR Platform Comparison

**Audience:** Platform Engineers, SOAR Engineers, SOC Architects
**Related:** [Part 04 — Playbooks](./part-04-automation-playbooks.md) | [Part 13 — Vendor Landscape](./part-13-vendor-landscape.md)

---

## 1. SOAR Platform Evolution

```
Generation 1 (2015–2019): Orchestration
  API-centric automation; connect tools; reduce manual copy-paste
  Rep: Phantom (Splunk), Demisto (Palo Alto)

Generation 2 (2019–2022): Intelligence
  Add TI enrichment, ML scoring, case management
  Rep: Sentinel (Microsoft), Chronicle SOAR (Google)

Generation 3 (2022–2024): No-Code/Low-Code
  Visual workflow builders; wider adoption; citizen automation
  Rep: Tines, Torq, BlinkOps, Swimlane

Generation 4 (2024→): Agentic SOAR
  LLM-generated playbooks; AI investigation agents embedded in workflow
  Rep: Sentinel + Copilot, Cortex XSIAM, SentinelOne AI
```

---

## 2. Platform Comparison Matrix

| Criteria | MS Sentinel | Splunk SOAR | Cortex XSOAR | Google SecOps | IBM QRadar | Swimlane | Tines | Torq |
|----------|------------|------------|-------------|--------------|-----------|---------|-------|------|
| **Architecture** | Cloud-native SaaS | Cloud + On-prem | Cloud + On-prem | Cloud-native | Cloud + On-prem | Cloud + On-prem | Cloud SaaS | Cloud SaaS |
| **Workflow engine** | Logic Apps | Custom Python | D2 (custom) | SOAR engine | Case Mgmt + Rules | Turbine | Story Builder | Visual DAG |
| **Code language** | JSON/Bicep | Python 3 | Python 3 | Python 3 | Ariel/Python | Python/Low-code | JavaScript | No-code |
| **SDK quality** | ★★★★☆ | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★★★☆ | ★★★★☆ | ★★★☆☆ |
| **Integration count** | 300+ | 500+ | 1000+ | 400+ | 450+ | 200+ | 800+ | 500+ |
| **LLM integration** | Native (Copilot) | Splunk AI | Cortex AI | Gemini native | Watson | Partner | API-based | API-based |
| **Agentic support** | Security Copilot Agents | Limited (preview) | XSOAR Agents (preview) | Gemini agents | Limited | Turbine AI | Limited | Limited |
| **Human approval UI** | Azure Portal / Teams | Mission Control | War Room | SecOps Portal | Case Mgmt | SPM Portal | Slack/Email | Slack/Email |
| **Multi-tenancy** | MSSPable | MSSP-capable | MSSP native | Limited | Limited | Multi-tenant | Tenant-based | Available |
| **Pricing model** | Per-workspace / consumption | Per user + capacity | Per GB ingested | Consumption | Per user | Per analyst | Per action | Per action |
| **Best for** | Azure-native | Splunk-centric | Enterprise SOC | Google/GCP | Regulated industry | SPM-focus | No-code flexibility | Enterprise no-code |

---

## 3. Microsoft Sentinel + Security Copilot

### Architecture
```
┌───────────────────────────────────────────────────────────────┐
│                    MICROSOFT SECURITY ECOSYSTEM               │
│                                                               │
│  Data Sources                Sentinel Core        Response    │
│  ─────────────               ───────────          ────────    │
│  M365 Defender ──┐                                            │
│  Azure Defender──┤  ──► Log Analytics ──► Analytics Rules     │
│  Azure AD ────── ┤         Workspace        Incidents         │
│  Network flows ──┤                          Hunting           │
│  3P connectors ──┘            ↕                ↕              │
│                           Copilot for      Logic Apps         │
│                           Security         (Playbooks)        │
│                           (GPT-4 / Claude) ↕                  │
│                                        Automation Actions     │
│                                        (Defender/Azure/M365)  │
└───────────────────────────────────────────────────────────────┘
```

### Logic Apps Playbook Example
```json
{
  "definition": {
    "triggers": {
      "Microsoft_Sentinel_incident": {
        "type": "ApiConnectionWebhook",
        "inputs": {
          "host": {"connection": {"name": "@parameters('$connections')['azuresentinel']['connectionId']"}}
        }
      }
    },
    "actions": {
      "Get_IPs_from_incident": {
        "type": "ApiConnection",
        "inputs": {
          "method": "POST",
          "path": "/incidents/GetEntities",
          "body": {"incidentArmId": "@triggerBody()?['object']?['id']"}
        }
      },
      "For_each_IP": {
        "type": "Foreach",
        "foreach": "@body('Get_IPs_from_incident')?['Entities']",
        "actions": {
          "Enrich_IP_VirusTotal": {
            "type": "Http",
            "inputs": {
              "method": "GET",
              "uri": "https://www.virustotal.com/api/v3/ip_addresses/@{items('For_each_IP')?['properties']?['address']}",
              "headers": {"x-apikey": "@parameters('virustotal_api_key')"}
            }
          }
        }
      }
    }
  }
}
```

### Security Copilot Integration
```
Security Copilot SOC capabilities:
  - "Summarize this incident" → AI-generated incident narrative
  - "Write a KQL query to find X" → KQL generation from plain English
  - "What does this PowerShell do?" → malware/script analysis
  - "Who is this threat actor?" → Mandiant + Microsoft TI attribution
  - "What should I do next?" → playbook recommendations

Copilot Agents (2025):
  - Microsoft-published agents for specific SOC workflows
  - Custom Copilot plugins via OpenAI plugin spec
  - Agent orchestration from Copilot Studio
```

**KQL Assistant Example:**
```
Analyst: "Find all PowerShell executions that download content from the internet
in the last 24 hours"

Copilot generates:
DeviceProcessEvents
| where Timestamp > ago(24h)
| where FileName =~ "powershell.exe" or FileName =~ "pwsh.exe"
| where ProcessCommandLine has_any ("DownloadString", "WebClient",
         "Invoke-WebRequest", "iwr", "curl", "wget", "Net.WebClient")
| project Timestamp, DeviceName, AccountName, ProcessCommandLine,
          InitiatingProcessFileName
| order by Timestamp desc
```

### Pricing
- Sentinel: $2.46/GB ingested (Pay-As-You-Go) or commitment tiers (up to 65% discount)
- Security Copilot: $4/Security Compute Unit, ~3-5 SCU/hour typical usage
- Total for 100GB/day org: ~$7,380/month (SIEM) + ~$4,320/month (Copilot)

### Strengths
- Best-in-class Microsoft 365/Azure native integration
- Security Copilot is the most mature enterprise AI copilot for security (2026)
- UEBA and Fusion detection built into Microsoft XDR at no extra cost
- Logic Apps provides enterprise-grade reliability and Azure monitoring integration

### Weaknesses
- Azure lock-in — poor story for AWS/GCP-primary organizations
- Logic Apps are complex to debug compared to Python-based alternatives
- Copilot costs are consumption-based with unpredictable billing at scale
- Limited native support for non-Microsoft data sources

---

## 4. Splunk SOAR (Phantom)

### Architecture
```
Splunk Cloud/Enterprise (SIEM)
         ↕ REST API
Splunk SOAR (Phantom Engine)
  ├── Visual Playbook Editor (drag-and-drop + code)
  ├── Python Playbook Runner (Docker container per run)
  ├── App Framework (500+ community/commercial apps)
  ├── Action Engine (parallel action execution)
  ├── Mission Control (unified analyst console)
  └── Case Management (embedded)
```

### Python Playbook Pattern
```python
import phantom.rules as phantom

def on_start(container):
    pass

def triage_email(action=None, success=None, container=None, results=None, handle=None, **kwargs):
    phantom.act(
        action="get email",
        parameters=[{"id": container.get("data", {}).get("email_id")}],
        assets=["email_server"],
        callback=enrich_iocs
    )

def enrich_iocs(action=None, success=None, container=None, results=None, handle=None, **kwargs):
    urls = [r.get("url") for r in results[0].get("data", [])]
    phantom.act(
        action="url reputation",
        parameters=[{"url": url} for url in urls],
        assets=["virustotal"],
        callback=quarantine_decision,
        parallel=True
    )

def quarantine_decision(action=None, success=None, container=None, results=None, handle=None, **kwargs):
    malicious = [r for r in results if r.get("data", {}).get("positives", 0) > 5]
    if malicious:
        phantom.act(
            action="quarantine email",
            parameters=[{"from": container.get("data", {}).get("from")}],
            assets=["email_server"]
        )
```

### Splunk AI Features
```
MLTK (Machine Learning Toolkit):
  - Anomaly detection: | fit DensityFunction ... | detect outliers
  - Classification: | fit RandomForestClassifier alert_type ...
  - Forecasting: | fit StateSpaceForecast alert_count ...

SPL AI (2024+):
  - Natural language to SPL query translation
  - AI alert summarization
  - Anomaly Detection powered by OpenAI

Splunk AI Security Assistant (preview):
  - Chat-based investigation in Splunk UI
  - GPT-4 powered SPL generation
```

### Pricing
- Splunk Enterprise: $150/GB/year (indexed data) or $50/user/year
- Splunk SOAR: $2,000/analyst/year minimum
- Typical 100-analyst SOC: $200K-500K/year for SOAR alone

### Strengths
- Most mature Python SDK — largest developer community
- 500+ apps with Splunkbase marketplace
- Mission Control is excellent unified analyst UX
- Deep Splunk SIEM integration with shared data model

### Weaknesses
- Complex, expensive licensing (SOAR + SIEM combined cost is high)
- Python-only — no low-code option for non-developers
- On-premises deployment is operationally heavy (patching, scaling)
- AI features less mature vs. Microsoft/Palo Alto as of 2026

---

## 5. Palo Alto Cortex XSOAR / XSIAM

### XSOAR Architecture
```
Cortex XSOAR:
  ├── War Room — collaborative investigation console
  ├── D2 Scripting — YAML + Python workflow definition
  ├── XSOAR Marketplace — 1000+ integrations
  ├── Incident Management — full lifecycle tracking
  ├── Threat Intelligence Management (TIM)
  └── Multi-tenancy (MSSP-ready)

XSIAM (unified XDR+SOAR):
  ├── Data Lake (all security telemetry)
  ├── AI-Driven Detection (Cortex AI, Unit 42 TI)
  ├── Automated Investigation Engine
  ├── Integrated Response (XSOAR underneath)
  └── Unit 42 Threat Intelligence
```

### Cortex AI Capabilities
```
Alert Grouping: AI clusters 100s of alerts into 5-10 campaigns
Alert Score: ML-based alert prioritization (1-100 risk score)
Causality Chain: AI reconstructs full attack chain from telemetry
RCA: Automated root cause analysis
Cortex Copilot:
  - "Explain this alert" → NL explanation
  - "What should I do?" → playbook recommendation
  - "Show similar incidents" → semantic incident search
  - Malware analysis via Unit 42 sandbox
```

### XSOAR Marketplace
The largest content marketplace in the industry:
- 1000+ integrations covering every security tool
- 700+ pre-built playbooks
- Community + paid content
- XSOAR community: active GitHub-based contribution model

### Pricing
- XSOAR: Per GB analyzed + per analyst seat (complex, contact sales)
- XSIAM: Per endpoint-day (replacing multiple tool licenses)
- Typical enterprise: $1M-5M/year for full XSIAM platform

### Strengths
- 1000+ integrations — widest marketplace in industry
- XSIAM is most integrated XDR+SOAR+TI platform (single console)
- Unit 42 threat intelligence is world-class (Mandiant rival)
- War Room collaborative UI is excellent for IR team coordination

### Weaknesses
- Complex pricing — XSOAR vs. XSIAM confusion persists
- Heavy deployment for on-premises XSOAR
- D2 scripting has steep learning curve vs. pure Python
- Less competitive outside Palo Alto EDR/NGFW customer base

---

## 6. Google SecOps (Chronicle + Gemini)

### Platform Architecture
```
Google SecOps Platform:
  ├── Chronicle SIEM
  │     ├── 1-year default retention (vs. 90 days elsewhere)
  │     ├── YARA-L detection rules
  │     ├── Petabyte-scale at fixed cost
  │     └── Google global threat intel
  ├── Chronicle SOAR (acquired Siemplify 2022)
  │     ├── Playbook engine
  │     ├── Case management
  │     └── 400+ integrations
  ├── Mandiant Threat Intelligence
  ├── Gemini in Security (AI)
  └── Google VirusTotal
```

### Gemini Security Features
```
Gemini AI in Chronicle:
  - "Explain this UDM event" → natural language explanation
  - YARA-L rule generation from natural language
  - Incident summarization
  - "Search for" → Gemini generates Chronicle search query
  - Threat actor attribution (Mandiant + Google data)
  - Malware reverse engineering assistance

Gemini Investigation:
  - Cross-query (natural language → YARA-L + SQL hybrid)
  - Timeline reconstruction
  - Attack path visualization
```

### Chronicle Fixed Pricing Advantage
```
Most SIEMs charge per GB ingested:
  Splunk: $150/GB/year → 100GB/day = $5.4M/year
  Sentinel: $2.46/GB → 100GB/day = $90K/year
  Chronicle: Fixed annual price regardless of data volume
  → For data-rich environments, Chronicle economics win significantly
```

### Strengths
- Petabyte-scale storage at fixed cost — economics win for large enterprises
- Mandiant IR expertise embedded natively
- 1-year default retention without additional cost
- Gemini + Mandiant = strongest threat intelligence AI in industry

### Weaknesses
- Primarily Google Cloud-centric architecture
- SOAR engine (Siemplify) is less mature than Splunk SOAR or XSOAR
- Limited on-premises deployment options
- Customer support quality inconsistent outside enterprise tier

---

## 7. IBM QRadar SOAR

### Architecture
```
IBM QRadar SOAR:
  ├── Case Management (primary focus)
  ├── Playbook Automation (Python-based)
  ├── Dynamic Playbooks (adaptive to incident type)
  ├── IBM Security Connect (integration hub)
  └── Watson AI (natural language investigation)

Integration with QRadar SIEM:
  ├── Bidirectional alert/incident sync
  ├── Custom dashboards
  ├── Shared context and evidence
  └── Compliance-focused reporting
```

### IBM Watson Security Integration
```
Watson for Cybersecurity features:
  - QRadar AI Advisor: alert explanation in natural language
  - Threat investigation: structured investigation reports
  - Natural language query: "Show me all events from this IP last week"
  - Vulnerability prioritization: AI-ranked by exploitability
  - MITRE ATT&CK mapping: automated technique identification
```

### Best For
- Regulated industries (financial, healthcare, government) with IBM ecosystem
- Organizations with existing IBM Security investment
- Enterprise SOCs needing strong case management + compliance reporting

---

## 8. Tines and Torq (No-Code SOAR)

### Tines Story Architecture
```
Tines Story = Visual workflow with HTTP actions, built-in actions, and conditions

Example Story: Phishing Response
  [Webhook Trigger: Email gateway alert]
          ↓
  [HTTP GET: Retrieve email from gateway API]
          ↓
  [HTTP POST: VirusTotal URL check]
          ↓
  [Condition: VT score > 5?]
     YES ↓                NO ↓
  [HTTP POST: Quarantine]  [End]
  [HTTP POST: Jira ticket]
  [Slack: Alert #soc channel]
  [Email: Notify user]
```

### Tines AI (2025)
```python
# LLM Action directly in Tines Story
# No code required — just configure the action

Action type: HTTP Request
URL: https://api.anthropic.com/v1/messages
Headers:
  x-api-key: {{CREDENTIAL.anthropic_key}}
  content-type: application/json
Body:
{
  "model": "claude-sonnet-4-6",
  "max_tokens": 1024,
  "messages": [{
    "role": "user",
    "content": "Analyze this security alert and determine if it is a true positive: {{alert_data}}"
  }]
}
```

### Torq Enterprise Features
```
Torq vs. Tines differentiators:
  - Torq has more enterprise security features (SSO, RBAC, audit)
  - Torq has stronger compliance reporting
  - Tines has simpler UX and better documentation
  - Both use REST API-first approach
  - Torq has "Hyperautomation" marketing — AI-assisted workflow building
```

---

## 9. Open-Source SOAR

### Shuffle
```
Architecture: Python + Docker, REST-based
App ecosystem: 200+ community apps via OpenAPI
Best for: SMB, security research, cost-sensitive
GitHub: https://github.com/Shuffle/Shuffle
Deploy: Docker Compose (single host) or Kubernetes

Limitations:
  - Less polished UX than commercial
  - Limited enterprise support
  - Community apps vary in quality
```

### StackStorm
```
Architecture: YAML + Python, event-driven
Key concept: Sensors (detect events) → Triggers → Rules → Actions
Best for: Infrastructure automation + security (DevSecOps)
Enterprise: Available via Extreme Networks support
Deploy: Kubernetes with Helm chart

Unique advantage: Event-driven architecture native (not bolted on)
Used by: Large enterprises automating NetOps + SecOps together
```

---

## 10. SOAR Selection Decision Framework

```
SELECTION CRITERIA PRIORITY ORDER:

1. PRIMARY SIEM ALIGNMENT (highest weight — 40%)
   Microsoft Sentinel → Sentinel + Copilot
   Splunk Enterprise/Cloud → Splunk SOAR
   Palo Alto XSIAM → Cortex XSOAR
   Google Chronicle → Google SecOps
   Multi-SIEM/Elastic → Tines or StackStorm

2. TEAM CODING CAPABILITY (30%)
   Strong Python devs → Splunk SOAR or XSOAR
   Mixed technical levels → Tines (visual + code)
   Non-technical analysts → Tines or Torq
   IT operations focus → StackStorm

3. INTEGRATION BREADTH NEEDED (20%)
   50+ tools needed → XSOAR (1000+ integrations)
   Standard REST APIs → Tines (HTTP-native)
   Deep on-prem systems → Splunk SOAR or StackStorm
   Quick deployment needed → Tines or Torq

4. AI MATURITY REQUIREMENT (10%)
   Full AI copilot in SOAR → Microsoft Sentinel + Copilot
   Best threat intel AI → Cortex XSIAM or Google SecOps
   DIY LLM integration → Tines (direct API calls)
   On-prem LLM needed → StackStorm + Ollama
```

---

*Next: [Part 06 — AI Models for SOC →](./part-06-ai-models.md)*
