---
title: Pending Research - Detailed Prompts for Next Sections
date: 2026-07-09
---

# Pending Research Prompts

These 14 sections are scaffolded and ready for deeper research/contribution. Each prompt explains what the section should cover, why it matters, and suggested content.

---

## 🎯 HIGH PRIORITY (Strategic Enterprise Impact)

### 1. Section 06: Durable Execution vs. Cognitive Execution

**Prompt**: Compare and contrast deterministic execution models (Temporal, durable functions) with probabilistic AI execution models (agents, LLMs). Explain the fundamental differences and when each applies.

**Research Questions**:
- What is "durable execution"? (Temporal's core concept)
- What is "cognitive execution"? (Agents reasoning + acting)
- How does event sourcing enable determinism?
- Why can't you guarantee determinism with LLMs?
- What's the semantic difference in retry logic?
- Can you combine both in one system? How?

**Key Concepts to Explain**:
- Event log as source of truth
- Replay for recovery (deterministic vs probabilistic)
- State management (workflow state vs agent memory)
- Failure handling (retry semantics differ)
- Observability (traces look different)

**Suggested Structure**:
1. Deterministic execution model (what, how, why)
2. Cognitive execution model (what, how, why)
3. Head-to-head comparison (table)
4. Hybrid approaches (both at once)
5. When to choose each
6. Examples: payment processing (deterministic) vs customer support (cognitive)

**Audience**: Architects deciding between Temporal, LangGraph, or both

---

### 2. Section 08: Agent Frameworks Comparison

**Prompt**: Deep comparison of agent orchestration frameworks. Help readers choose between LangGraph, CrewAI, Semantic Kernel, PydanticAI, AutoGen, and emerging alternatives.

**Research Questions**:
- What are the core differences in agent design?
- How does each handle state management?
- How does each handle tool calling?
- Which supports multi-agent coordination best?
- Which is easiest to integrate with Temporal?
- Which has the best observability?
- Cost/performance trade-offs?

**Frameworks to Compare**:
- LangGraph (multi-agent, stateful, Python)
- CrewAI (role-based agents, teams)
- Semantic Kernel (Microsoft, plugin architecture)
- PydanticAI (structured output, type safety)
- AutoGen (agent group chat, role-based)
- Google ADK (Google Cloud native)
- Mastra (full-stack agent framework)

**Suggested Structure**:
1. Architecture overview (each framework)
2. State management approach (how they track context)
3. Tool handling (how they invoke tools)
4. Multi-agent patterns (if supported)
5. Integration with orchestrators (Temporal, Camunda)
6. Comparison matrix (features, ease-of-use, scale)
7. When to choose each (use cases, constraints)
8. Example: implement same agent in 2-3 frameworks (show differences)

**Audience**: AI engineers, platform teams choosing agent framework

---

### 3. Section 12: Human-in-the-Loop Architectures

**Prompt**: Design modern human-in-the-loop patterns where humans stay in control as systems become more autonomous. Move beyond simple "approve/reject" gates.

**Research Questions**:
- What does "in the loop" mean in 2026? (Beyond binary approval)
- How do you handle agent reasoning review?
- What triggers human intervention?
- How do you support in-flight guidance (interrupt + redirect)?
- How do approval SLAs work?
- What's the escalation path?
- How do you audit human decisions?
- How do you train humans on complex agent decisions?

**Modern Patterns to Document**:
- **Reasoning review**: Human reviews agent's thought process, not just decision
- **In-flight guidance**: "Wait, let me give you more context" while agent is executing
- **Adaptive approval**: Different approval workflows based on risk/uncertainty
- **Weighted consensus**: Multiple human reviewers for high-stakes decisions
- **Appeals process**: Human can challenge system decision
- **Learning loop**: System learns from human corrections

**Suggested Structure**:
1. Evolution of HITL (from workflows to agents)
2. Modern HITL design principles
3. Reasoning review patterns (how to review agent thinking)
4. Approval workflow design (routing, SLAs, escalation)
5. In-flight guidance (pause, get input, resume)
6. Audit and accountability (who approved what?)
7. Training and calibration (teaching humans to work with agents)
8. Example architectures (finance, healthcare, customer service)
9. UX patterns (how do humans interact with agent workflows?)

**Audience**: Enterprise architects, governance teams, UX designers

---

### 4. Section 18: Enterprise Governance Model

**Prompt**: Design a complete governance framework for orchestrating with Temporal, Camunda, LangGraph, and Claude Code together. Address versioning, approval, audit, compliance, and rollback.

**Research Questions**:
- How do you version workflows? Prompts? Models?
- What approval workflows are needed for each platform?
- How do you audit decisions made by AI?
- How do you ensure compliance across platforms?
- How do you rollback if something breaks?
- Who has write access to what?
- How do you track who changed what, when, why?
- How do you onboard new agents/workflows?
- What policy-as-code looks like for orchestration?

**Governance Layers to Document**:
1. **Versioning Strategy** (semantic versioning across platforms)
   - Workflow versions (v1.2.3)
   - Prompt versions (which Claude model? Which prompt text?)
   - Model versions (Claude 3.5 → Claude 4)
   - Tool versions (API breaking changes)
   - DMN table versions (business rule changes)

2. **Approval Workflows** (what requires approval?)
   - New workflow deployment
   - Prompt changes (minor vs major)
   - Tool changes (new tool, modified tool)
   - Policy changes (governance policy itself)
   - Emergency changes (break-glass procedure)

3. **Audit & Compliance** (prove you did the right thing)
   - Change log (what changed, who approved, when)
   - Decision trace (why did system choose this?)
   - Outcome tracking (did it work? Did it break anything?)
   - Regulatory evidence (for compliance reviews)

4. **Rollback Procedures** (how to undo mistakes)
   - Workflow rollback (revert to previous version)
   - Prompt rollback (use previous prompt)
   - Model rollback (use previous model version)
   - Data rollback (if changes affected data)

5. **Access Control** (who can change what?)
   - Write access by role (engineer, data scientist, analyst)
   - Approval authority (who approves what?)
   - Emergency access (if primary approver unavailable)

**Suggested Structure**:
1. Governance principles (why this matters)
2. Versioning strategy (detailed, with examples)
3. Approval workflows (for each platform)
4. Audit architecture (tracking everything)
5. Compliance evidence (proof for regulators)
6. Rollback procedures (step-by-step)
7. Access control model (RBAC for orchestration)
8. Tools & automation (how to automate governance)
9. Example: governance model for a financial services firm

**Audience**: Enterprise architects, compliance officers, governance teams

---

### 5. Section 11: A2A (Agent-to-Agent) Orchestration Patterns

**Prompt**: Design patterns for agents coordinating with other agents. How do agents delegate, handoff, negotiate, and resolve conflicts?

**Research Questions**:
- How does agent A call agent B?
- What happens if agent B fails?
- How do they share context/memory?
- How do they negotiate priorities?
- How do they avoid infinite loops?
- How do they ensure consistency?
- What about resource deadlocks?
- How do you observe multi-agent execution?

**Patterns to Document**:
1. **Hierarchical Delegation** (agent → specialized agent)
   - Parent agent spawns child agents for subtasks
   - Child agents report results to parent
   - Parent aggregates results

2. **Peer Collaboration** (agent ↔ agent)
   - Agents negotiate on shared goal
   - Exchange messages/context
   - Reach consensus or escalate

3. **Handoff** (agent A → agent B, then A done)
   - Agent A does work, then hands off to agent B
   - No further involvement from A
   - Agent B completes task

4. **Negotiation** (agent A asks agent B for help)
   - Agent A: "Can you help with X?"
   - Agent B: "Yes, but only if Y constraint is met"
   - Agents agree on terms or ask supervisor

5. **Conflict Resolution**
   - Multiple agents propose different actions
   - Conflict detected (incompatible decisions)
   - Escalate to higher-level agent or human

**Suggested Structure**:
1. A2A basics (why agents need to coordinate)
2. Communication patterns (message passing, shared memory)
3. Trust & verification (how to verify peer agent)
4. Delegation patterns (hierarchical, peer-to-peer)
5. Handoff patterns (clean transitions between agents)
6. Negotiation & consensus (reaching agreement)
7. Conflict resolution (incompatible decisions)
8. Deadlock prevention (avoid infinite loops)
9. Observability (tracing multi-agent execution)
10. Example: loan approval (multiple specialized agents)

**Audience**: Multi-agent systems architects, AI platform teams

---

## 🔄 MEDIUM PRIORITY (Important But Specialized)

### 6. Section 09: Tool Calling Orchestration

**Prompt**: Explain how LLM tool calling changes orchestration fundamentals. Tool calling is a new primitive that replaces traditional activities.

**Research Questions**:
- How does tool calling differ from calling an activity?
- How do you prevent infinite tool loops?
- How do you handle tool failures?
- How do you validate tool outputs?
- How do you version tools?
- How do you prevent tool hallucination?
- What's the difference between tool → observation vs activity → result?
- How does tool calling interact with workflow coordination?

**Concepts to Explain**:
- LLM tool calling as new primitive
- Agent loop: reason → call tool → observe → reason → call tool → finish
- Tool discovery (dynamic vs static)
- Tool validation (did the tool work correctly?)
- Tool reliability (tool might fail differently than activity)
- Tool authorization (what tools can agent call?)

**Suggested Structure**:
1. Traditional activities (Temporal model)
2. Tool calling (LLM model)
3. Conceptual differences (state, control flow, reliability)
4. Tool discovery patterns (static vs dynamic, MCP)
5. Tool validation (ensuring correctness)
6. Tool reliability (retries, fallbacks)
7. Tool authorization (security, policy)
8. Preventing loops (circuit breaker, depth limits)
9. Combining both (activities + tool calling in one system)
10. Example: agent that both calls tools and invokes services

**Audience**: AI engineers, platform architects, those designing agent execution

---

### 7. Section 10: MCP (Model Context Protocol) Impact

**Prompt**: Analyze how Model Context Protocol changes orchestration. MCP is the emerging standard for tool discovery and capability negotiation.

**Research Questions**:
- What is MCP? How does it work?
- How does it enable dynamic tool discovery?
- What changes about orchestration with MCP?
- How do you implement MCP servers?
- How do you secure MCP communication?
- How does MCP interact with tool authorization?
- What's the performance impact?
- Will MCP become universal? (By when?)

**MCP Concepts**:
- Tool discovery (what tools available?)
- Dynamic capability negotiation (agent asks "can you X?")
- Stateful tools (tools that maintain state)
- Tool authentication (MCP server auth)
- Session management (MCP sessions)
- Cancellation (interrupting long-running tools)

**Suggested Structure**:
1. What is MCP? (protocol overview)
2. How MCP changes tool invocation (dynamic vs static)
3. Tool discovery patterns (MCP-enabled workflows)
4. Capability negotiation (agent queries available tools)
5. Security & authorization (MCP auth models)
6. Performance & scaling (overhead of MCP)
7. Integration with orchestrators (Temporal + MCP, LangGraph + MCP)
8. Real-world MCP servers (examples)
9. Future of MCP (standardization, adoption)
10. Example: agent that discovers tools via MCP at runtime

**Audience**: Platform architects, tool builders, those designing agent capability systems

---

### 8. Section 13: Memory vs. Workflow State

**Prompt**: Clarify the boundary between workflow state (deterministic, recoverable) and agent memory (learned, contextual). Both matter; they're different.

**Research Questions**:
- What belongs in workflow state?
- What belongs in agent memory?
- How do they interact?
- Can memory survive workflow restart?
- How do you version memory?
- How do you garbage-collect memory?
- How does memory affect replay?
- What about long-term memory (learning)?

**State/Memory Layers**:
1. **Workflow State** (Temporal)
   - Current step
   - Variables (data accumulated)
   - Recoverable from event log
   - Must be serializable

2. **Agent Working Memory** (LangGraph)
   - Conversation history
   - Current reasoning context
   - Facts learned in this run
   - Discarded after execution completes

3. **Agent Long-term Memory** (RAG, vector DB)
   - Learned patterns
   - Past experiences
   - Knowledge base
   - Survives across executions

4. **External Context** (databases, APIs)
   - Customer profile
   - Business rules
   - Real-time data
   - Not owned by workflow or agent

**Suggested Structure**:
1. State vs memory (conceptual distinction)
2. Workflow state layer (deterministic, Temporal)
3. Agent working memory (context, current execution)
4. Agent long-term memory (learning, RAG)
5. External context (databases, services)
6. Interaction between layers (how they talk)
7. Recovery semantics (what survives after crash?)
8. Garbage collection (when to discard memory?)
9. Versioning memory (how to handle model updates?)
10. Example: loan approval workflow memory architecture

**Audience**: System architects, those building hybrid systems

---

### 9. Section 14: AI Planning vs. Workflow Engines

**Prompt**: Compare classical AI planners (planning as search) with workflow/orchestration engines (execution as defined steps). When do you need each?

**Research Questions**:
- What is classical AI planning?
- How is it different from orchestration?
- When is planning better than workflows?
- Can you combine planning + orchestration?
- What's the computational cost?
- How do you explain a plan to humans?
- How do you verify a plan is correct?

**Concepts**:
- Planning as search (goal + constraints → plan)
- Workflows as scripts (defined path)
- STRIPS, HTN, GraphPlan models
- Classical planning vs reactive planning
- Hierarchical task network planning

**Suggested Structure**:
1. Classical planning (what, how, why)
2. Workflow orchestration (review)
3. Key differences (computation, predictability, adaptivity)
4. When planning is better (complex, variable processes)
5. When orchestration is better (simple, stable processes)
6. Hybrid approaches (plan + execute)
7. Planning + agent reasoning (new frontier)
8. Example: complex manufacturing vs order fulfillment

**Audience**: Research-oriented architects, those with complex process requirements

---

### 10. Section 15: Reliability Playbook

**Prompt**: Document reliability patterns for agentic systems. What breaks? How do you recover? How do you prevent failures?

**Failure Modes to Cover**:
- LLM hallucination (agent invokes non-existent tool)
- Tool failure (API timeout, bad response)
- Agent loop (infinite reasoning)
- Token limit exceeded (context too large)
- Model failure (API rate limited)
- Partial execution (some steps done, some not)
- Stale memory (agent makes decisions on outdated info)
- Deadlock (multiple agents waiting on each other)

**Reliability Techniques**:
1. **Retry** (simple, but can be wrong for agents)
2. **Circuit breaker** (prevent cascading failures)
3. **Timeout** (prevent infinite loops)
4. **Fallback** (use alternative agent/tool)
5. **Compensation** (undo partial work)
6. **Validation** (verify tool output makes sense)
7. **Monitoring** (detect problems early)
8. **Graceful degradation** (reduce quality vs fail completely)

**Suggested Structure**:
1. Reliability challenges in agentic systems
2. Common failure modes (with examples)
3. Detection strategies (how to know something broke)
4. Recovery strategies (what to do when it breaks)
5. Prevention strategies (how to avoid breaking)
6. Playbooks for common failures
7. SLA design for agent workflows
8. Monitoring & alerting (what to watch)
9. Post-mortems (learning from failures)
10. Example: reliable recommendation engine using agents

**Audience**: Platform engineers, SREs, operations teams

---

### 11. Section 16: Observability Framework

**Prompt**: Design unified observability for systems running Temporal, Camunda, and LangGraph together. Show how to trace work across all three.

**Observability Domains**:
1. **Workflow Traces** (what step are we on?)
   - Timeline: Start → Activity1 → Activity2 → End
   - Tool: Temporal Cockpit, logs
   
2. **Agent Reasoning Traces** (why did agent choose this?)
   - Timeline: Think → Tool → Observe → Think → Tool → Result
   - Tool: LangSmith, custom tracing
   
3. **Business Outcome Traces** (did we achieve the goal?)
   - Timeline: Goal → Process → Outcome → Value
   - Tool: Business dashboards

**Correlation**:
- How to tie workflow execution to agent reasoning to business outcome
- Using trace IDs across systems
- Unified query (search across platforms)

**Suggested Structure**:
1. Observability for orchestration (what matters?)
2. Workflow observability (Temporal/Camunda)
3. Agent observability (reasoning traces)
4. Business observability (outcomes)
5. Correlation (tying them together)
6. Architecture (centralized logging, tracing)
7. Tools & platforms (OpenTelemetry, Grafana, Jaeger, custom)
8. Dashboards (what to monitor)
9. Alerting (what to alert on)
10. Example: observability for loan approval workflow

**Audience**: Platform teams, observability engineers, SREs

---

### 12. Section 17: Security Architecture

**Prompt**: Security for orchestration systems. How do you prevent agents from calling dangerous tools? How do you keep secrets safe?

**Security Concerns**:
- Tool authorization (what can each agent call?)
- Prompt injection (attacker manipulates agent via input)
- Token leakage (secrets in traces)
- Unauthorized escalation (agent exceeds permissions)
- Data exfiltration (agent sends data to attacker)
- Supply chain (compromised tool)
- Audit trail tampering (agent covers its tracks)

**Security Patterns**:
1. **Tool Authorization** (fine-grained access control)
   - What tools are allowed?
   - Can agent call tool with these args?
   - RBAC or policy-based?

2. **Secret Management**
   - How to pass API keys to tools?
   - How to prevent key exposure in traces?
   - Key rotation?

3. **Input Validation** (prevent prompt injection)
   - Sanitize user input before passing to agent
   - Validate agent output before execution

4. **Audit** (who did what?)
   - Full trace of decisions
   - Tool invocations logged
   - User identity tracked

**Suggested Structure**:
1. Security in orchestrated systems (unique challenges)
2. Threat model (who's attacking? How?)
3. Tool authorization patterns (RBAC, policy-based)
4. Secret management (vault integration)
5. Input/output validation (prevent injection)
6. Audit architecture (full traceability)
7. Network security (securing tool communication)
8. Supply chain security (vetting tools)
9. Incident response (what if agent goes rogue?)
10. Example: secure financial workflow

**Audience**: Security architects, compliance teams, platform teams

---

## 🌟 LOWER PRIORITY (Specialized/Future)

### 13. Section 22: Anti-patterns Catalog

**Prompt**: Document what NOT to do. Collect failures, bad decisions, and lessons learned from orchestration systems.

**Potential Anti-patterns**:
- "Treat agents like deterministic activities" (they're not)
- "Put all business logic in prompts" (maintenance nightmare)
- "No versioning for prompts" (can't debug what changed)
- "Ignore non-determinism" (audit trail becomes useless)
- "Infinite retry loops" (can make things worse)
- "LLM as a cache" (expensive, stale, unreliable)
- "One big mega-agent" (can't debug, uncontrollable)
- "No human-in-the-loop for high stakes" (AI failures are expensive)
- "Tool hallucination ignored" (agent calls non-existent API)
- "No observability until it breaks" (too late)

**Suggested Structure**:
1. Each anti-pattern:
   - Name (catchy, memorable)
   - Description (what is it?)
   - Why it seems good (attractive nuisance)
   - Why it fails (specific failure modes)
   - How it went wrong (real example)
   - How to do it right (corrected pattern)
   - When it's not an anti-pattern (edge cases)

**Audience**: Architects, engineers learning from others' mistakes

---

### 14. Section 23: Capability Maturity Model (CMM)

**Prompt**: Design a CMM for orchestration capability. How do enterprises progress from basic workflows to autonomous, self-optimizing systems?

**Maturity Levels**:
1. **Level 1: Ad Hoc** (disconnected processes, no orchestration)
2. **Level 2: Repeatable** (Camunda or Temporal for basic workflows)
3. **Level 3: Defined** (governance, versioning, standards)
4. **Level 4: Managed** (LangGraph for decisions, monitoring SLAs)
5. **Level 5: Optimized** (multi-agent, self-learning, autonomous)

**For Each Level**:
- What capabilities do you have?
- What are you measuring?
- What investment is needed?
- What's the timeline?
- What are the risks?
- What's the next step?

**Suggested Structure**:
1. CMM overview (why maturity levels matter)
2. Level 1: Ad Hoc (current state for many enterprises)
3. Level 2: Basic orchestration (Temporal or Camunda)
4. Level 3: Governed (policies, versioning, compliance)
5. Level 4: AI-Enabled (agents making decisions)
6. Level 5: Autonomous (self-optimizing)
7. Assessment tool (where are you today?)
8. Roadmap (how to progress)
9. Investment calculator (cost of each level)
10. Example: bank's 3-year journey from level 2 to level 4

**Audience**: CTOs, enterprise architects, transformation leaders

---

## 📋 How to Use These Prompts

### For Contributors
1. Pick a prompt that matches your expertise
2. Read the research questions
3. Follow the suggested structure (or improve it)
4. Include examples and diagrams
5. Link to existing sections
6. Add references to external research

### For Prioritization
- **High Priority** (1-5): Strategic, directly impact enterprise decisions
- **Medium Priority** (6-12): Important, specialized, help implementation
- **Lower Priority** (13-14): Future-focused, build on foundation

### For Quality
- Each section should be 2,000–4,000 words
- Include real-world examples
- Use diagrams/tables for clarity
- Link to other sections
- Avoid redundancy (each section stands alone)

---

## 📊 Contribution Opportunities

| Section | Expertise Needed | Effort | Impact |
|---|---|---|---|
| **06 - Durable vs Cognitive** | Systems architecture, distributed systems | Medium | High |
| **08 - Agent Frameworks** | AI/LLM experience, framework hands-on | High | High |
| **12 - HITL Architectures** | UX, governance, enterprise patterns | High | High |
| **18 - Governance Model** | Enterprise architecture, compliance | High | High |
| **11 - A2A Patterns** | Multi-agent systems, distributed systems | Medium | High |
| **09 - Tool Calling** | LLM, agent architecture | Medium | Medium |
| **10 - MCP Impact** | Protocol design, tool ecosystem | Low-Medium | Medium |
| **13 - Memory vs State** | System design, databases | Medium | Medium |
| **14 - AI Planning** | AI research, planning algorithms | Medium | Low-Medium |
| **15 - Reliability Playbook** | SRE, operations, failure analysis | Medium | High |
| **16 - Observability** | DevOps, monitoring, tracing | Medium | Medium |
| **17 - Security** | Security architecture, threat modeling | High | High |
| **22 - Anti-patterns** | Lessons learned, war stories | Low | Medium |
| **23 - CMM** | Transformation, organizational change | Medium | Medium |

---

**Ready to contribute?** Choose a prompt above and let's build it together.

