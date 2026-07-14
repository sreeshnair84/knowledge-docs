---
title: "AI Red Teaming — Adversarial Testing for AI and Agentic Systems"
date: 2026-07-14
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
covers_version: "as of July 2026"
doc_type: guide
source_type: native-md
source_file: ""
tags: ["ai-red-teaming", "adversarial-testing", "garak", "pyrit", "prompt-injection", "agentic-security", "llm-security"]
---

# AI Red Teaming — Adversarial Testing for AI and Agentic Systems

> **Current as of July 2026.** AI red teaming uses human expertise and automated tooling to attack AI systems — via jailbreaks, prompt injection, data poisoning, model extraction, and agentic misuse — to reveal failures before adversaries do.

---

## What Is AI Red Teaming?

AI red teaming is adversarial testing that systematically probes AI systems for exploitable vulnerabilities. It combines human creativity with automated tooling to simulate real attack scenarios across:

- **LLM vulnerabilities** — jailbreaks, prompt injection, harmful output generation
- **Agent-specific attacks** — goal hijacking, tool misuse, memory poisoning, multi-agent coordination attacks
- **Infrastructure attacks** — model extraction, training data poisoning, supply chain compromise
- **Operational attacks** — evasion of monitoring, detection bypass, adversarial examples

The OWASP Agentic Top 10 (December 2025) is the threat taxonomy that AI red teams operationalize through testing.

---

## Red Teaming vs. Other Security Practices

| Practice | Focus | Frequency |
|---------|-------|-----------|
| **AI Red Teaming** | Adversarial simulation; finds exploitable vulnerabilities | Quarterly minimum; before major releases |
| **AIDR** | Runtime detection of attacks in production | Continuous |
| **AISPM** | Configuration posture and supply-chain risk | Continuous |
| **Penetration testing** | Infrastructure and application layer attacks | Annual minimum |
| **Evaluation / evals** | Quality and safety benchmarking (not adversarial) | Every deployment |

Red teaming validates that AIDR and guardrails actually work — it generates the "hard examples" that make detection systems robust.

---

## The AI Red Team Methodology

### Phase 1: Scoping and Threat Modeling (Days 1–3)

Define the attack surface and objectives:

```
1. Identify the target system (LLM, agent, multi-agent pipeline, MCP server)
2. Map the threat model: which OWASP ASI01-ASI10 threats apply?
3. Define success criteria: what constitutes a successful attack?
4. Select attack categories: jailbreak / injection / exfiltration / tool misuse
5. Assign team roles: prompt engineers, security researchers, domain experts
```

### Phase 2: Automated Scanning (Days 3–7)

Run automated tool suites against the target:

```
Tools to run in parallel:
  Garak    → vulnerability probe suite (100+ probes, 20,000 prompts)
  PyRIT    → orchestrated attack sequences with AI Red Teaming Agent
  Promptfoo → regression testing + adversarial eval harness
  Gaia     → agentic-specific goal hijack testing
```

### Phase 3: Manual Adversarial Testing (Days 7–14)

Human red teamers probe what automation misses:

- **Indirect injection via tool responses** — inject via documents, email, database records
- **Multi-turn manipulation** — build trust across conversation before attacking
- **Context window attacks** — exploit long-context handling for injection
- **Cross-agent attacks** — use one agent to attack another in a multi-agent pipeline
- **MCP tool poisoning** — craft malicious tool descriptions or responses
- **Memory persistence attacks** — inject content that persists across sessions

### Phase 4: Report and Remediation (Days 14–21)

Produce structured findings:
- Severity: Critical / High / Medium / Low
- Exploitability: Automated / Manual / Requires insider access
- Impact: Data exfiltration / Goal hijack / Harmful output / Service disruption
- Remediation: Guardrail update / Prompt hardening / Policy change / Architecture change

---

## Tooling Landscape (2026)

### Garak (NVIDIA)
- **Type:** Open-source LLM vulnerability scanner
- **Approach:** Probe-based; ~100 prebuilt probes across 20+ attack categories
- **Coverage:** Prompt injection, jailbreaks, encoding bypasses, glitch tokens, toxicity, training-data extraction, XSS via output, malware generation
- **Single run:** Up to 20,000 adversarial prompts
- **Best for:** Systematic baseline scanning before deployment; CI/CD integration

```bash
pip install garak
garak --model openai --model_type gpt-4o --probes promptinjection,jailbreak,encoding
```

### PyRIT (Microsoft)
- **Type:** Open-source adversarial AI testing framework
- **Approach:** Orchestrated attack sequences; includes AI Red Teaming Agent (Apr 2025)
- **Coverage:** Prompt injection, jailbreaking, content safety, multi-turn attacks
- **Integration:** Azure AI Foundry native; works with any LLM endpoint
- **Best for:** Enterprise workflows; automated attack orchestration; Azure-native teams

```python
from pyrit.orchestrator import PromptSendingOrchestrator
from pyrit.attack_strategy import JailbreakAttackStrategy

orchestrator = PromptSendingOrchestrator(
    objective_target=target,
    attack_strategy=JailbreakAttackStrategy(objective="extract system prompt")
)
await orchestrator.run()
```

### Promptfoo
- **Type:** Open-source LLM testing and red teaming framework
- **Approach:** YAML-defined test suites; adversarial eval + regression testing
- **Coverage:** Prompt injection, harmful content, PII leakage, hallucination
- **Best for:** CI/CD integration; regression testing on every deployment

```yaml
# promptfoo red team config
redteam:
  plugins:
    - prompt-injection
    - jailbreak
    - pii-extraction
    - harmful-content
  strategies:
    - jailbreak:composite
    - prompt-injection:indirect
```

### Mindgard
- **Type:** Commercial automated AI red teaming
- **Approach:** Continuous adversarial testing; integrates with CI/CD
- **Coverage:** Agentic AI, LLMs, computer vision models
- **Best for:** Enterprises wanting managed red teaming without internal expertise

### Manual Tooling

| Tool | Purpose |
|------|---------|
| **Burp Suite (AI extensions)** | HTTP-level prompt interception and manipulation |
| **LangFuse** | Trace inspection to understand attack execution paths |
| **Custom injection harnesses** | Domain-specific injection scenarios (e.g., banking document injection) |

---

## Attack Categories and Techniques (2026)

### Prompt Injection (OWASP ASI01 / LLM01)

The most prevalent attack. Ranked #1 in OWASP LLM Top 10 for three consecutive years.

| Technique | Description |
|-----------|-------------|
| **Direct injection** | Malicious instructions in the user input field |
| **Indirect injection** | Instructions embedded in retrieved documents, emails, web pages |
| **Nested injection** | Injection within tool responses returned to the agent |
| **Multi-hop injection** | Injection that persists through agent handoffs |
| **Encoding bypass** | Base64, Unicode, ROT13, leetspeak variants to evade filters |

### Jailbreaking

| Technique | Description |
|-----------|-------------|
| **Role-play bypass** | "Pretend you are DAN / an AI without restrictions" |
| **Hypothetical framing** | "In a fictional universe where..." |
| **Many-shot jailbreak** | Hundreds of examples establishing a pattern before the harmful request |
| **Crescendo** | Gradually escalate requests from benign to harmful |
| **Composite** | Combine multiple techniques for higher success rates |

### Agentic-Specific Attacks

| Attack (OWASP ASI) | Technique |
|-------------------|-----------|
| **Goal Hijack (ASI01)** | Inject redirected objectives through retrieved content |
| **Tool Misuse (ASI02)** | Craft inputs that cause tools to be called with malicious parameters |
| **Memory Poisoning (ASI06)** | Inject persistent malicious context into agent memory |
| **Multi-Agent Attack (ASI07)** | Compromise one agent to attack another via A2A protocol |
| **Rogue Agent (ASI10)** | Deploy unauthorized agent that impersonates legitimate ones |

---

## Agentic Red Teaming: What Changes

Traditional LLM red teaming tests individual prompt-response pairs. Agentic red teaming must test **full execution sequences** — arXiv 2605.04019 ("Redefining AI Red Teaming in the Agentic Era") identifies the key shifts:

| Dimension | LLM Red Teaming | Agentic Red Teaming |
|-----------|----------------|---------------------|
| **Scope** | Single prompt → single response | Multi-step execution graph |
| **Attack surface** | Input prompt | Prompt + tool calls + memory + A2A messages |
| **Success metric** | Harmful output produced | Goal achieved by agent against policy |
| **State** | Stateless | Stateful — attacks can span multiple sessions |
| **Tools available** | None | All tools the agent has access to |
| **Time horizon** | Seconds | Minutes to hours |

The paper reports that automated red teaming frameworks have reduced agentic red team cycle times from weeks to hours.

---

## Enterprise Red Teaming Program

### Cadence

| Trigger | Red Team Scope |
|---------|---------------|
| Before first production deployment | Full red team: all attack categories |
| Before major model upgrade | Focus on behavioral changes and regression |
| Quarterly cadence | Rotating focus: one attack category per quarter |
| After security incident | Targeted re-test of the attack vector |
| New OWASP guidance published | Map new threats to current system |

### Team Structure

| Role | Responsibility |
|------|---------------|
| **Red team lead** | Scoping, methodology, report sign-off |
| **Prompt engineer** | Crafting novel injection and jailbreak scenarios |
| **Security researcher** | Infrastructure and protocol-layer attacks |
| **Domain expert** | Industry-specific attack scenarios (banking, healthcare) |
| **Blue team liaison** | Shares findings with AIDR tuning team |

### Metrics

| KPI | Target |
|----|--------|
| Attack surface coverage (% of OWASP ASI threats tested) | 100% annually |
| Critical findings mean time to remediate | <7 days |
| High findings MTTR | <30 days |
| Automated scan frequency | Every deployment |
| Manual red team cadence | Quarterly minimum |
| Finding recurrence rate (same finding re-discovered) | 0% |

---

## References

- [Mindgard: AI Red Teaming in 2026 — Complete Guide](https://mindgard.ai/blog/what-is-ai-red-teaming)
- [arXiv 2605.04019 — Redefining AI Red Teaming in the Agentic Era](https://arxiv.org/pdf/2605.04019)
- [NVIDIA Garak GitHub](https://github.com/NVIDIA/garak)
- [Microsoft PyRIT GitHub](https://github.com/Azure/PyRIT)
- [Best AI Red Teaming Tools 2026 (General Analysis)](https://generalanalysis.com/guides/best-ai-red-teaming-tools)
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)

---

## See Also

| Guide | Link |
|-------|------|
| AI TRiSM (framework context) | [AI TRiSM Guide](./AI-TRiSM-Complete-Guide.md) |
| AIDR (runtime defense) | [AIDR Guide](./AIDR-AI-Detection-Response-Complete-Guide.md) |
| OWASP ASI01–ASI10 coverage | [Agentic AI Security Identity](../../enterprise-architecture/ai-architecture/agentic-ai-security-identity.md) |
| Security Guardrails | [Security Guardrails](../../enterprise-architecture/ai-architecture/agentic-ai-security-guardrails.md) |
