---
title: "Agent UX Patterns"
date_created: 2026-07-07
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["agentic-ui"]
---

# Agent UX Patterns

**Audience:** UX leads, product owners, and principal AI architects designing the human-facing layer of enterprise agentic applications.

**Related:**
[HITL Gates](../coding-tools/enterprise-ai-architect/enterprise-ai-architecture-patterns.md) |
[Memory Architecture](../coding-tools/enterprise-ai-architect/agent-memory-planning-architecture.md) |
[Security/OWASP](../coding-tools/enterprise-ai-architect/agentic-ai-security-identity.md) |
[Governance](../coding-tools/enterprise-ai-architect/enterprise-ai-governance-compliance.md) |
[Observability](../coding-tools/enterprise-ai-architect/agentic-ai-reliability-observability-governance.md)

---

## 1. Copilot Pattern Taxonomy

Twelve canonical deployment archetypes. Every enterprise agentic application maps to one or more of these patterns. Use the table as a first-pass filter, then consult the detailed profiles below.

### 1.1 Summary Table

| # | Pattern | Autonomy Level | UX Surface | Primary Audience | Integration Point |
|---|---------|---------------|------------|-----------------|-------------------|
| 1 | Chat Copilot | Low | Full-page chat | End users, knowledge workers | Standalone app or tab |
| 2 | Embedded Copilot | Low–Medium | Inline within host app | Power users, developers | Host app sidebar/toolbar |
| 3 | Floating Copilot | Low–Medium | Overlay on any page | All users | Browser extension / iframe |
| 4 | Workspace Copilot | Medium | Unified workspace panel | Knowledge workers | Document, calendar, email |
| 5 | Workflow Copilot | Medium–High | Step-driven wizard | Process workers | BPM / workflow engine |
| 6 | Decision Copilot | Medium | Structured recommendation panel | Analysts, managers | BI / dashboards |
| 7 | Coding Copilot | Medium | IDE inline + chat | Developers | IDE extension |
| 8 | Search Copilot | Low–Medium | SERP augmentation | All users | Search results page |
| 9 | Voice Agent | Medium | Voice + minimal visual | Field workers, drivers | Audio channel |
| 10 | Visual Agent | Medium | Image canvas + chat | Designers, analysts | Design / data tools |
| 11 | Multi-agent Dashboard | High | Status board | AI ops, platform teams | Orchestration layer |
| 12 | Autonomous Copilot | Very High | Notification surface only | Managers, approvers | Background process |

---

### 1.2 Pattern Profiles

#### Pattern 1 — Chat Copilot

**Definition:** A standalone conversational interface. The agent has no ambient context beyond what the user types and what is injected into the system prompt.

**Deployment Context:** Dedicated app, enterprise portal tab, or public-facing chatbot.

**UX Characteristics:**
- Linear conversation history
- Turn-by-turn interaction model
- Persistent message list with timestamps
- File/image upload support for multimodal input
- Copy, cite, and regenerate controls per message

**AG-UI Integration Pattern:** Bidirectional streaming via AG-UI `TEXT_MESSAGE_CONTENT` and `TOOL_CALL_START/END` events. Session stored client-side or in backend session store keyed to user identity.

**A2UI Integration Pattern:** Agent may emit `GenerateUI` events to render structured forms, cards, or data tables inline in the chat thread.

**Recommended Approval Model:** Human-on-the-loop (HOTL) for read-only operations. Human-in-the-loop (HITL) for any write action (send email, create ticket, post to Slack).

**Example Products:** Claude.ai, ChatGPT, Microsoft Copilot standalone.

**When to use:**
- Users need an open-ended conversational interface
- No ambient host application context is available
- First deployment of AI — minimizes integration complexity
- Use case is primarily knowledge retrieval, writing, or analysis

---

#### Pattern 2 — Embedded Copilot

**Definition:** The agent UI is embedded within an existing application as a persistent sidebar, inline suggestion overlay, or contextual panel. The host application passes ambient context (current document, selected code, open ticket) to the agent automatically.

**Deployment Context:** IDE plugins, document editors, CRM panels, ticketing systems.

**UX Characteristics:**
- Triggered by hotkey, selection, or ambient context change
- Inline suggestion acceptance (Tab / ESC)
- Contextual actions: "Explain this", "Fix this", "Summarize"
- Minimal chrome — blends into host app design system
- Side-by-side view (agent output adjacent to work surface)

**AG-UI Integration Pattern:** Host app injects AG-UI context events (`STATE_SNAPSHOT`, `MESSAGES_SNAPSHOT`) with current document/selection. Agent streams responses back. CopilotKit `useCopilotReadable` API is the standard mechanism to synchronize host app state.

**A2UI Integration Pattern:** Agent can generate structured output components (diff views, suggestion cards) that slot into the host app's design system using A2UI `ComponentSpec`.

**Recommended Approval Model:** Invisible AI for read-only suggestions. Single-click HITL for mutations (apply diff, insert text, update field).

**Example Products:** GitHub Copilot, JetBrains AI Assistant, Salesforce Einstein, Notion AI.

**When to use:**
- Users work primarily within one host application
- Ambient context (current document, code, record) makes suggestions immediately relevant
- Disruption to existing workflows must be minimized
- The host app vendor provides an extension API

---

#### Pattern 3 — Floating Copilot

**Definition:** A floating panel or sidebar that overlays any page in a browser or desktop application. The agent can observe the current page context but is not embedded in the host app.

**Deployment Context:** Browser extensions, desktop overlay apps, enterprise intranet widgets.

**UX Characteristics:**
- Draggable / collapsible floating panel
- "What can I help with on this page?" entry point
- Page content summarization, form filling, extraction
- Context injected via DOM scraping or MCP NLWeb adapter
- Minimal footprint — does not replace the underlying page

**AG-UI Integration Pattern:** The overlay connects to an AG-UI backend. Page context is injected as a `STATE_SNAPSHOT` event via a content script or NLWeb MCP server. Microsoft NLWeb enables website owners to expose a structured MCP endpoint so the overlay agent can query content rather than scraping.

**Recommended Approval Model:** HITL for any form fills or page mutations. HOTL for read/summarize.

**Example Products:** Copilot in Edge, Arc AI, Siri on iOS Safari.

**When to use:**
- Users work across many different web applications
- No host-app extension API exists
- The primary use case is read, summarize, extract — not write
- Deployment must not require changes to any backend system

---

#### Pattern 4 — Workspace Copilot

**Definition:** The agent has access to the user's full workspace context — documents, calendar, email, tasks, and people graph — and can act across all of them in a single conversation turn.

**Deployment Context:** M365 Copilot, Google Workspace Duet, enterprise digital assistant.

**UX Characteristics:**
- Unified "Ask about my work" entry point
- Cross-app context stitching (email → calendar → document)
- "Catch me up" and "Prepare me for my meeting" entry points
- Permission model: shows what data was accessed per response
- Citation of source documents in every response

**AG-UI Integration Pattern:** Workspace Copilot uses AG-UI `STATE_SNAPSHOT` events to pass workspace context (recent emails, current document, upcoming calendar) at conversation start. Tool calls use MCP servers for each workspace service (Graph API, Drive API, etc.).

**Recommended Approval Model:** HITL for sends and mutations. HOTL for read/summarize. Data access logged to compliance audit trail.

**Example Products:** Microsoft 365 Copilot, Google Duet AI, Salesforce Agentforce.

**When to use:**
- Users need synthesis across multiple systems of record
- Meeting prep, status updates, and drafting cover 80%+ of use cases
- Enterprise SSO and permissions infrastructure already exists
- Data residency and audit requirements are met by platform provider

---

#### Pattern 5 — Workflow Copilot

**Definition:** The agent is embedded in a business process and guides users through defined steps. Unlike a chat copilot, the state machine is the process — not the conversation.

**Deployment Context:** Loan origination, insurance underwriting, HR onboarding, procurement approval.

**UX Characteristics:**
- Step-driven wizard with agent assistance at each step
- "What should I fill in here?" contextual help
- Data validation with natural language explanations
- Agent fills fields from documents, user confirms
- Progress bar shows process position
- Exit and save-progress controls

**AG-UI Integration Pattern:** The workflow engine emits `STATE_SNAPSHOT` events at each step transition. The agent receives current form state and can pre-fill or validate fields. User actions emit `USER_ACTION` events that advance the state machine.

**Recommended Approval Model:** HITL at each step boundary. Supervisor review for exceptions. Full audit trail mandatory for regulated processes.

**Example Products:** ServiceNow AI Agents, Pega GenAI, Camunda Copilot.

**When to use:**
- The business process is well-defined and compliance-regulated
- Errors in data entry carry financial or legal risk
- Users vary widely in expertise — novices need guidance
- Audit trail is a compliance requirement, not an option

---

#### Pattern 6 — Decision Copilot

**Definition:** The agent provides structured decision support: recommendation, confidence score, supporting evidence, and alternative options. The human retains decision authority — the agent makes the evidence structure explicit.

**Deployment Context:** Credit scoring review, medical triage support, security alert triage, investment recommendation.

**UX Characteristics:**
- Recommendation card: primary recommendation + confidence %
- Ranked alternative list with trade-off summary
- Evidence citations (documents, data, precedents)
- "Challenge this recommendation" conversational entry
- Decision capture: record human decision + rationale
- Audit trail: recommendation vs. human decision delta

**AG-UI Integration Pattern:** Agent emits structured `TOOL_CALL_END` events with JSON payloads matching A2UI `DecisionCard` component spec. The host app renders native decision UI. Streaming is used only for the reasoning explanation; the decision card is rendered as a final structured response.

**Recommended Approval Model:** Human-in-the-loop is mandatory. Every recommendation requires explicit human decision capture. No auto-approve.

**Example Products:** Salesforce Einstein Decision, IBM Watson Assistant for financial services, custom underwriting platforms.

**When to use:**
- Consequential decisions with regulatory or financial accountability
- The decision-maker is accountable but needs AI synthesis of evidence
- Auditability of the decision process is a compliance requirement
- False positive / false negative costs are asymmetric

---

#### Pattern 7 — Coding Copilot

**Definition:** An IDE-integrated agent providing code completion, generation, review, test writing, documentation, and refactoring.

**Deployment Context:** VS Code, JetBrains IDEs, Neovim, GitHub web editor.

**UX Characteristics:**
- Ghost text completions (gray inline suggestions)
- Chat panel for multi-line generation
- Right-click → "Ask AI" context menu
- Diff view for suggested changes
- Inline comment explanation for generated code
- Test generation with coverage visualization

**AG-UI Integration Pattern:** IDE extension exposes current file, selection, and project context via `STATE_SNAPSHOT` events. GitHub Copilot uses a proprietary protocol; open alternatives use AG-UI or Copilot Kit. The CopilotKit React components can render inside IDE webview panels.

**Recommended Approval Model:** Invisible AI for completions (Tab to accept, ESC to reject). HITL for refactoring across multiple files. HOTL for test runs triggered by agent.

**Example Products:** GitHub Copilot, Cursor, Windsurf, JetBrains AI, Claude Code.

**When to use:**
- Development team productivity is the primary ROI driver
- Codebase has enough context (docs, tests, comments) for grounding
- Security review process exists for AI-generated code
- Code review gates are in place to catch AI errors

---

#### Pattern 8 — Search Copilot

**Definition:** The agent augments or replaces keyword search with semantic understanding, synthesis, and conversational follow-up.

**Deployment Context:** Enterprise knowledge base, intranet, documentation portal, e-commerce, customer support.

**UX Characteristics:**
- Answer at the top of search results (not just links)
- Cited sources beneath the answer
- Conversational follow-up ("Tell me more about X")
- "This answer might be outdated" freshness indicator
- Confidence indicators on answer cards
- Feedback buttons (Helpful / Not Helpful)

**AG-UI Integration Pattern:** Search query triggers an AG-UI streaming response with citations. NLWeb MCP enables website content to be queryable by the agent backend. `STATE_SNAPSHOT` includes current search filters and query history.

**Recommended Approval Model:** No approval needed (read-only). Feedback loop is the primary quality control mechanism.

**Example Products:** Perplexity, Bing Copilot search, Glean, Notion AI search, Elastic ESRE.

**When to use:**
- Existing search returns too many results without synthesis
- Users need cross-document summarization, not just retrieval
- Content corpus changes frequently (RAG preferred over fine-tuning)
- User intent is primarily informational, not transactional

---

#### Pattern 9 — Voice Agent

**Definition:** A voice-first interface where the primary input is speech and the primary output is audio, with minimal or no visual UI.

**Deployment Context:** Contact center IVR, hands-free field worker tools, automotive assistants, smart speaker skills.

**UX Characteristics:**
- Wake word or push-to-talk activation
- Spoken confirmation of actions ("I've created that ticket. Should I assign it to you?")
- Conversational repair ("Sorry, could you repeat that?")
- Short response format — no lists, no markdown
- Barge-in support (user can interrupt mid-response)
- Silence detection and graceful timeout

**AG-UI Integration Pattern:** STT layer converts audio to text → AG-UI event stream → LLM → TTS converts response back to audio. Streaming is critical: the LLM must begin speaking while still generating. `TEXT_MESSAGE_CHUNK` events are piped to a streaming TTS service.

**Recommended Approval Model:** Verbal confirmation for all actions ("Say 'yes' to confirm"). No irreversible actions without spoken double-confirmation.

**Example Products:** Amazon Alexa for Business, Google CCAI, Twilio Voice AI, Bland.ai, Vapi.

**When to use:**
- Users' hands are occupied (warehouse, field service, driving)
- Screen real estate is absent or minimal
- Response latency below 1.5 seconds is critical for natural conversation
- The use case involves structured transactions, not open-ended reasoning

---

#### Pattern 10 — Visual Agent

**Definition:** An agent that can understand images, diagrams, and charts, and can generate or annotate visual content.

**Deployment Context:** Design review, architecture diagram analysis, medical imaging support, quality control inspection.

**UX Characteristics:**
- Image upload / screenshot paste into chat
- Agent-generated image annotations (bounding boxes, labels)
- Side-by-side view (original image | agent analysis)
- Chart interpretation with natural language explanation
- "Describe what you see" and "Identify anomalies" entry points

**AG-UI Integration Pattern:** Images are included in AG-UI `TEXT_MESSAGE_CONTENT` events as base64 or pre-signed URLs. Agent returns bounding box coordinates in structured JSON which the UI renders as SVG overlays on the original image.

**Recommended Approval Model:** HOTL for annotations (user can correct). HITL for any downstream actions triggered by image analysis (flag defect, reject shipment).

**Example Products:** GPT-4o Canvas, Claude with vision, AWS Rekognition + LLM overlay, custom quality-control platforms.

**When to use:**
- The source data is inherently visual (images, diagrams, charts, scans)
- Textual description alone is insufficient for the decision
- Existing vision ML models lack the reasoning capability for the task
- Users need to understand the agent's visual interpretation, not just the conclusion

---

#### Pattern 11 — Multi-agent Dashboard

**Definition:** A UI that visualizes multiple collaborating agents, their current tasks, inter-agent communication, and aggregate outputs.

**Deployment Context:** AI ops platforms, enterprise automation centers, research orchestration, automated DevOps pipelines.

**UX Characteristics:**
- Agent status grid: name, current task, progress, last action
- Message bus visualization: inter-agent messages in real time
- Supervisor agent panel: current plan, sub-task delegation
- Task output aggregation: collated results from all agents
- Intervention controls: pause agent, reassign task, inject instruction
- Alert surface: failed agents, stuck tasks, budget warnings

**AG-UI Integration Pattern:** Each agent in the topology connects to AG-UI independently. A supervisor UI component subscribes to all agent event streams simultaneously. `RUN_STARTED`, `RUN_FINISHED`, `TOOL_CALL_START`, `TOOL_CALL_END` events from all agents are muxed into a single timeline.

**Recommended Approval Model:** HITL at supervisor level for cross-agent decisions. Human-over-the-loop (HOOL) for individual agent actions within policy.

**Example Products:** LangGraph Studio, Microsoft Autogen Studio, CopilotKit multi-agent dashboard.

**When to use:**
- Multiple specialized agents must collaborate on a single user goal
- Human oversight of the overall system is required without micromanaging each agent
- Debugging and observability of agent behavior are primary concerns
- The business process involves parallel workstreams requiring coordination

---

#### Pattern 12 — Autonomous Copilot

**Definition:** The agent operates largely independently, completing multi-step tasks with minimal human interaction. The UX is primarily a notification and exception management surface.

**Deployment Context:** Automated report generation, background data enrichment, scheduled compliance checks, autonomous PR review, email triage.

**UX Characteristics:**
- Task submission: describe task + parameters + schedule
- Progress notification (email, Slack, push)
- Exception queue: items requiring human judgment
- Output review: view completed work before publishing
- Audit log: every decision, tool call, and data access
- Kill switch: emergency stop for all autonomous tasks

**AG-UI Integration Pattern:** AG-UI events are consumed asynchronously. The frontend subscribes to a task status WebSocket, not a live streaming session. `RUN_FINISHED` event triggers a notification. Exception events (`TOOL_CALL_START` for high-risk tools) route to an approval queue.

**Recommended Approval Model:** Human-over-the-loop (HOOL). Exceptions surface to human automatically. Irreversible actions require approval even in HOOL mode.

**Example Products:** Devin (software engineering agent), Harvey AI (legal document review), custom autonomous workflows.

**When to use:**
- The task is well-defined, repetitive, and time-consuming
- Human review of the final output (not each step) is sufficient
- Risk of individual step error is low and recoverable
- Volume of work exceeds human capacity

---

## 2. Streaming UX Design

Streaming is the default output mode for LLM-backed agents. Poor streaming UX is the #1 source of perceived quality regression from batch AI to agentic AI. These patterns address every dimension of streaming experience.

### 2.1 Progressive Text Rendering

| Rendering Mode | Behavior | When to Use | Risk |
|----------------|----------|-------------|------|
| **Character stream** | Render every token as it arrives | Chat, conversational UX | Jitter on short tokens |
| **Word-buffered** | Buffer until word boundary, then render | Voice transcription overlay | 50–80ms added latency |
| **Sentence-buffered** | Hold until sentence end, flush | TTS pipelines, spoken output | Longer perceived latency |
| **Paragraph-buffered** | Hold until double newline | Document editors, code blocks | Best for structured content |
| **Hold-until-complete** | Never stream — wait for full response | Decision cards, structured JSON | Poor for long responses |
| **Hybrid** | Stream prose, buffer code/tables | Mixed content (chat + code) | Complexity in render logic |

**Choose Character stream when:** the response is conversational prose and the user benefit of seeing words appear outweighs the minor jitter of token-level rendering.

**Choose Hold-until-complete when:** the output is a structured data object (JSON decision card, table) that cannot be partially rendered without confusing the user.

---

### 2.2 Streaming Indicators

```text
┌─────────────────────────────────────────────────────────┐
│  ● Thinking...                             [Stop ■]      │
│  ─────────────────────────────────────────────────────  │
│                                                          │
│  Step 1/4: Searching knowledge base          ✓ Done     │
│  Step 2/4: Analyzing contracts               ● Running  │
│  Step 3/4: Synthesizing findings             ○ Pending  │
│  Step 4/4: Drafting recommendation           ○ Pending  │
│                                                          │
│  ████████████░░░░░░░░  52%   Est. 8 seconds remaining   │
└─────────────────────────────────────────────────────────┘
```

| Indicator Type | Best For | Avoid When |
|----------------|----------|------------|
| Animated ellipsis ("Thinking...") | Short waits < 3 seconds | Long multi-step tasks |
| Step progress list | Multi-tool tasks | Simple single-turn responses |
| Percentage progress bar | Tasks with known step count | Open-ended reasoning |
| Tool call callout | Developer-facing / power users | End-user consumer apps |
| Time estimate | Tasks > 15 seconds | Tasks with variable duration |
| Spinner on input field | Embedded copilot in form | Full-page chat (too subtle) |

---

### 2.3 Partial Result Surfacing

The central streaming tension: **show work in progress** vs. **hold until complete**.

| Approach | UX Benefit | UX Risk | Recommended For |
|----------|-----------|---------|-----------------|
| **Show all partial output** | Fastest perceived completion | Confusing rewrites mid-stream | Chat, prose generation |
| **Show structured skeleton first** | Sets expectations for long output | Jarring if structure changes | Reports, documents |
| **Show partial sections as completed** | Best for long structured content | Requires section-boundary detection | Multi-section analysis |
| **Stream reasoning separately** | Users see the agent "thinking" | Cognitive overload for non-technical | Developer tools, high-stakes analysis |
| **Hold all, show spinner** | Clean final reveal | Longest perceived wait | Decision cards, forms, structured JSON |

---

### 2.4 Streaming Tool Call Visualization

When an agent executes tools during streaming, users need visibility without being overwhelmed.

```text
┌──────────────────────────────────────────────────────────┐
│  Let me check the latest contract status for Acme Corp.  │
│                                                          │
│  ┌─ Tool: search_contracts ─────────────────────────┐   │
│  │  query: "Acme Corp renewal"  scope: last 90 days  │   │
│  │  ████████░░░░  Results: 3 contracts found  ✓      │   │
│  └───────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─ Tool: get_contract_details ─────────────────────┐   │
│  │  contract_id: CT-2024-0891                        │   │
│  │  ● Fetching...                                    │   │
│  └───────────────────────────────────────────────────┘   │
│                                                          │
│  Based on the results, the renewal date is...            │
└──────────────────────────────────────────────────────────┘
```

**Tool call visualization levels:**

| Visibility Level | Shown | Audience |
|-----------------|-------|----------|
| **Invisible** | Nothing — seamless integration | End-user consumer apps |
| **Minimal** | "Checking data..." generic indicator | Business user apps |
| **Name only** | Tool name: `search_contracts` | Power users |
| **Name + params** | Tool name + sanitized input parameters | Developer tools |
| **Full trace** | Name + params + result + duration | Debug / audit mode |

---

### 2.5 Cancellation UX

```text
┌──────────────────────────────────────────────────────────┐
│  [Stop ■]   ← Always visible during streaming            │
│                                                          │
│  On click:                                               │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Generation stopped.                               │  │
│  │  ┌──────────────┐  ┌───────────────────────────┐  │  │
│  │  │  Keep partial │  │  Retry with different     │  │  │
│  │  │  response     │  │  prompt                   │  │  │
│  │  └──────────────┘  └───────────────────────────┘  │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

| Cancellation Scenario | Recommended Behavior |
|-----------------------|---------------------|
| User clicks Stop | Halt stream immediately. Show partial content. Offer Keep/Retry/Discard. |
| User navigates away | Halt stream server-side. Do not persist partial output without user confirmation. |
| Mid-tool-call cancel | Complete tool call if < 1 second remaining. Abort if long-running. |
| Cancel in approval dialog | Treat as "reject" — do not execute the pending tool call. |
| Timeout (> 60s no completion) | Auto-cancel. Offer retry with context of how far it got. |

---

### 2.6 Error Recovery During Streaming

| Error Type | Detection Signal | UX Response |
|------------|-----------------|-------------|
| LLM API timeout | No tokens for > 30s | "The response timed out. [Retry] [Save what I have]" |
| Rate limit hit | 429 from LLM API | "Busy right now — retrying automatically... 1/3" |
| Tool call failure | `TOOL_CALL_END` with error | Inline tool error card with retry option |
| Partial JSON truncation | Incomplete structured output | Attempt repair; fallback to "Unable to generate structured output — [Retry]" |
| Context length exceeded | 400/413 from LLM API | "Conversation too long. [Summarize and continue] [Start new]" |
| Network interruption | WebSocket / SSE disconnect | Reconnect with session ID; resume from last `MESSAGE_ID` |

---

### 2.7 Streaming in Different Form Factors

| Form Factor | Streaming Approach | Special Considerations |
|------------|-------------------|----------------------|
| **Full-page chat** | Character-level streaming, left-aligned | Scroll lock: auto-scroll while streaming, release on manual scroll |
| **Document editor** | Paragraph-buffered inline insertion | Preserve cursor position; undo stack integration required |
| **Dashboard widget** | Hold-until-complete for KPI cards | Stream narrative summary; hold structured data |
| **Mobile chat** | Word-buffered to reduce jitter | Battery-aware: reduce streaming frequency on low battery |
| **Sidebar panel** | Stream into fixed-height scrollable div | Truncate at max height with "Show more" |
| **Voice output** | Sentence-buffered → TTS | First sentence must begin TTS within 500ms for natural cadence |

---

## 3. Reasoning Visualization

Showing the agent's reasoning is a UX decision with significant downstream effects on trust, cognitive load, regulatory posture, and usability.

### 3.1 Decision Framework: When to Show Reasoning

```text
                    STAKES
              LOW              HIGH
          ┌──────────────┬─────────────────────┐
    LOW   │  Hide        │  Collapsible         │
          │  (show result│  summary             │
CONF-     │  only)       │                      │
IDENCE    ├──────────────┼─────────────────────┤
    HIGH  │  Hide        │  Full structured     │
          │  (clean UX)  │  reasoning required  │
          └──────────────┴─────────────────────┘
```

**Show full reasoning when:**
- Stakes are high AND confidence is uncertain (cell: HIGH stakes, LOW confidence)
- The user needs to validate the reasoning (regulated decision support)
- The output will be challenged by a downstream reviewer
- The user has explicitly requested an explanation

**Show collapsible summary when:**
- Stakes are high but confidence is high (senior expert validation scenario)
- The use case is developer / analyst tooling

**Hide reasoning when:**
- Simple fact retrieval (clutter > benefit)
- End-user consumer app with low technical literacy
- High-confidence, low-stakes generation (email autocomplete)
- Regulated contexts where showing reasoning implies AI autonomy (EU AI Act Art. 14 consideration — see [Governance](../coding-tools/enterprise-ai-architect/enterprise-ai-governance-compliance.md))

---

### 3.2 Reasoning Visualization Formats

| Format | Description | Best For | Implementation |
|--------|-------------|----------|---------------|
| **Chain-of-thought text** | Narrative reasoning shown in expandable block | General explanation | `<details><summary>View reasoning</summary>` |
| **Execution step log** | Numbered steps with timestamps and tool calls | Audit, debugging | Structured log panel |
| **Planning tree** | Visual tree: goal → sub-goals → tasks | Complex multi-step plans | D3.js / Mermaid tree diagram |
| **Confidence bar** | Horizontal bar 0-100% per claim | Fact-checking, verification | CSS progress bar per sentence |
| **Source citations** | [1], [2] footnotes linking to source documents | RAG-based responses | Superscript links + citation panel |
| **Scratchpad panel** | Agent's full internal monologue | Developer/debug mode only | Collapsible pre-formatted block |

---

### 3.3 ASCII Wireframe: Reasoning Panel

```text
┌──────────────────────────────────────────────────────────┐
│  RECOMMENDATION                              Confidence  │
│  ─────────────────────────────────────────  ──────────  │
│  Approve the vendor contract with           ██████░░  78%│
│  standard terms. Est. savings: $240K.                    │
│                                                          │
│  ▼ View supporting evidence (3 sources)                  │
│  ┌────────────────────────────────────────────────────┐  │
│  │ [1] Vendor pricing analysis — last updated 3d ago  │  │
│  │     "Per-unit cost 18% below market median"        │  │
│  │ [2] Legal review — standard terms approved         │  │
│  │ [3] Procurement policy — threshold: $500K needs VP │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ▼ View reasoning steps                                  │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Step 1: Retrieved vendor history (3 contracts)     │  │
│  │ Step 2: Compared pricing vs. market benchmarks     │  │
│  │ Step 3: Checked against procurement policy limits  │  │
│  │ Step 4: Drafted recommendation with evidence       │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  [ Approve ]   [ Request Changes ]   [ Escalate ]        │
└──────────────────────────────────────────────────────────┘
```

---

## 4. Confidence and Uncertainty Visualization

### 4.1 Visual Encodings for Confidence

| Encoding | How It Works | Accessible | Over-used Risk |
|----------|-------------|------------|----------------|
| Color gradient (green → red) | Hue shifts with confidence | Fails for color blindness | High — use sparingly |
| Fill level (bar/circle) | Area proportional to confidence | Good | Medium |
| Text label ("High/Medium/Low") | Categorical language | Excellent | Low |
| Numeric percentage (78%) | Raw probability | Good for experts | May false-precision |
| Star rating (★★★☆☆) | Familiar consumer metaphor | Good | Trivializes for high-stakes |
| Icon (shield/warning/info) | Category indicator | Excellent with alt text | Low |
| Hedging language ("probably", "it appears") | Natural language | Excellent | Risk of legal ambiguity |

**Best practice:** Combine fill level (for quick scan) + text label (for accessibility) + hedging in prose. Avoid numeric percentages for non-expert audiences unless calibration is verified.

---

### 4.2 Calibration Considerations

:::warning Overconfidence is a UX hazard
    LLM confidence scores are frequently miscalibrated — a model that says 85% confidence may be right only 60% of the time in your domain. Always validate calibration on your golden dataset before displaying numeric confidence to users. Miscalibrated confidence erodes trust faster than no confidence display.

| Domain | Calibration Risk | Recommendation |
|--------|-----------------|----------------|
| Open-domain Q&A | High | Use categorical labels; no numeric |
| RAG over enterprise knowledge | Medium | Show after calibration on domain eval set |
| Structured extraction (form filling) | Low | Numeric % acceptable with validation |
| Medical / legal / financial | Very High | Never display confidence — show "verify with expert" |
| Code generation | Medium | Show test pass rate instead of confidence |

---

### 4.3 Multiple-Hypothesis Display

For decisions with genuine uncertainty, show multiple hypotheses rather than a single answer with confidence.

```text
┌──────────────────────────────────────────────────────────┐
│  ANALYSIS RESULTS                                        │
│  ─────────────────────────────────────────────────────  │
│  Three interpretations are consistent with the data:    │
│                                                          │
│  ① Supply chain disruption (most likely)    ████████ 65%│
│    Evidence: inventory drop, lead time increase          │
│                                                          │
│  ② Demand spike in Q3                       ████░░░░ 25%│
│    Evidence: order backlog increase                      │
│                                                          │
│  ③ Reporting error                          ██░░░░░░ 10%│
│    Evidence: inconsistency in warehouse records          │
│                                                          │
│  [Investigate ①]  [Investigate ②]  [Request manual audit]│
└──────────────────────────────────────────────────────────┘
```

---

### 4.4 "I Don't Know" UX Patterns

The most trust-building thing an agent can do is accurately communicate the limits of its knowledge.

| Scenario | Poor Response | Better Response |
|----------|--------------|-----------------|
| Out-of-training-data question | Hallucinated answer | "I don't have information about this. [Search live sources]" |
| Ambiguous query | Best-guess answer | "I'm not sure what you mean. Did you mean A or B?" |
| Document not retrieved | Answer from training data | "I couldn't find relevant documents. I'm answering from general knowledge — verify before acting." |
| Conflicting sources | Arbitrary choice | "Sources disagree. Source A says X; Source B says Y. [Show both]" |
| Low confidence retrieval | Confident wrong answer | "I found this, but I'm not confident it's relevant. [Review source]" |

---

## 5. Human Approval UX

Approval UX is the most consequential pattern in agentic applications. Poor approval design leads to rubber-stamping (users approve without reading), approval fatigue, and compliance failures.

### 5.1 Approval Request Design Principles

Every approval request must answer four questions immediately visible without scrolling:
1. **What** is the agent asking to do?
2. **Why** is it asking to do this?
3. **What happens if I approve?** (Consequence)
4. **What happens if I reject?** (Alternative path)

```text
┌──────────────────────────────────────────────────────────┐
│  ⚠  ACTION REQUIRED: File Deletion                       │
│  ─────────────────────────────────────────────────────  │
│  WHAT:  Delete 47 files in /reports/archive/2021/        │
│  WHY:   Your storage cleanup request (Task #4 of 8)      │
│  RISK:  This action cannot be undone                     │
│  IF NO: Skip this folder; continue with next task        │
│                                                          │
│  [ View file list (47) ]                                 │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  Approve (A) │  │  Skip (S)    │  │  Stop task (X)│  │
│  └──────────────┘  └──────────────┘  └───────────────┘  │
│                                                          │
│  Respond within: 23:47  or task will pause               │
└──────────────────────────────────────────────────────────┘
```

---

### 5.2 Approval Flow Types

| Flow Type | Description | When to Use | Risk |
|-----------|-------------|-------------|------|
| **Single-click approve** | One button approves and executes | Low-risk, well-understood actions | Rubber-stamping |
| **Review-and-approve** | User must view detail before approve button activates | Medium-risk actions | Slower, more friction |
| **Dual confirmation** | Two separate "Approve" clicks required | High-risk irreversible actions | Friction may block legitimate use |
| **Typed confirmation** | User types action name to confirm | Catastrophic-risk actions (delete all, send to all) | High friction — reserve for nuclear options |
| **Delegated approval** | Routes to a different user (manager, admin) | Actions beyond user's authorization | Workflow delay |
| **Async approval** | Approval request sent via email/Slack/notification | User is not online / long-running tasks | Session management complexity |

---

### 5.3 Approval for High-Risk Tool Categories

| Tool Category | Risk Level | Required Approval Model | Audit Requirement |
|---------------|-----------|------------------------|-------------------|
| Read data | None | No approval | Log only |
| Create (new record, new file) | Low | HOTL or HITL | Log |
| Update existing record | Medium | HITL | Log + before/after diff |
| Send communication (email, Slack) | Medium–High | HITL review-and-approve | Log + content capture |
| Delete data | High | Dual confirmation | Log + content backup |
| Financial transaction | Very High | Delegated approval (finance) | Full audit + reconciliation |
| Publish externally | High | Delegated approval (comms/legal) | Log + content snapshot |
| Grant access / permissions | Very High | Delegated approval (security) | Log + justification |
| Execute code | Very High | Typed confirmation | Log + code capture |

---

### 5.4 Batch Approval

For autonomous workflows generating multiple pending approvals:

```text
┌──────────────────────────────────────────────────────────┐
│  PENDING APPROVALS  (12 items)              [Approve All]│
│  ─────────────────────────────────────────────────────  │
│  ☐  Update vendor record — Acme Corp         Low risk    │
│  ☐  Update vendor record — Beta Systems      Low risk    │
│  ☐  Send renewal notice — Acme Corp         Medium risk  │
│  ☑  Delete archive /2019/Q1 (47 files)       High risk   │
│  ☐  Send renewal notice — Beta Systems      Medium risk  │
│  ...7 more                                               │
│                                                          │
│  [ Approve Selected (1) ]   [ Review Individual ]        │
│                                                          │
│  Note: "Approve All" excludes High Risk items            │
└──────────────────────────────────────────────────────────┘
```

**Batch approval rules:**
- "Approve All" must exclude HIGH RISK items — these always require individual review
- Group items by risk level for visual triage
- Show aggregate consequence ("this will send 23 emails")
- Provide bulk-reject for all low-risk items in one action

---

### 5.5 Approval Timeout and Escalation

| Timeout State | Duration | Behavior |
|--------------|----------|----------|
| First warning | 80% of timeout | "This approval will expire in 5 minutes" |
| Second warning | 95% of timeout | Visual urgency indicator (amber) |
| Timeout | 100% | Task pauses. Escalation notification sent. |
| Escalation wait | Configurable | Routes to backup approver |
| Final timeout | Configurable | Task cancelled. Audit log entry. |

:::note Escalation Chain Design
    Define a 3-level escalation chain for every autonomous task: primary approver → manager → task owner. Undeclared escalation chains are an operational risk for long-running autonomous workflows. See [HITL patterns](../coding-tools/enterprise-ai-architect/enterprise-ai-architecture-patterns.md).

---

### 5.6 Audit Trail for Approvals

Every approval decision must be persisted with:

| Field | Content |
|-------|---------|
| `approval_id` | UUID |
| `task_id` | Parent task or agent run ID |
| `tool_call_id` | Specific tool call being approved |
| `tool_name` | Name of the tool |
| `tool_parameters` | Exact parameters (sanitized for PII if required) |
| `approver_id` | User identity (not just display name) |
| `decision` | `approved` / `rejected` / `modified` / `escalated` |
| `decision_at` | ISO 8601 timestamp |
| `response_time_seconds` | Time from request to decision |
| `context` | Screenshot or structured snapshot at time of request |
| `notes` | Optional user comment |

---

## 6. Long-running Task UX

### 6.1 Progress Visualization Patterns

```text
┌──────────────────────────────────────────────────────────┐
│  Contract Analysis — 247 documents                       │
│  Started: 14:32  •  Est. completion: 15:45               │
│  ─────────────────────────────────────────────────────  │
│  ████████████████████░░░░░░░  78% (192/247 docs)         │
│                                                          │
│  CURRENT: Analyzing "Q3 2024 MSA - Vertex Corp.pdf"      │
│                                                          │
│  COMPLETED MILESTONES                                    │
│  ✓ Document ingestion        14:32  (3 min)             │
│  ✓ Clause extraction         14:40  (8 min)             │
│  ● Risk scoring              14:48  (in progress)        │
│  ○ Summary report            —                           │
│  ○ Dashboard update          —                           │
│                                                          │
│  [ Pause ]  [ View partial results ]  [ Cancel ]         │
└──────────────────────────────────────────────────────────┘
```

| Progress Element | Required | Recommended When |
|-----------------|----------|-----------------|
| Overall % bar | Always | Any task > 10 seconds |
| Milestone list | Yes | Tasks with 3+ distinct phases |
| Current item name | Yes | Batch processing tasks |
| Time elapsed / estimated | Yes | Tasks > 1 minute |
| Items completed / total | Yes | Enumerable batch tasks |
| Cost consumed (tokens/$ ) | Optional | Developer / admin view |

---

### 6.2 Background Task Management

```text
Minimized Task Bar:
┌──────────────────────────────────────────────┐
│  [Contract Analysis 78%] [Code Review Done ✓]│
└──────────────────────────────────────────────┘
```

**Background task lifecycle:**

| State | Visual | Action Available |
|-------|--------|-----------------|
| Running | Animated progress indicator | Pause, View, Cancel |
| Paused | Static progress bar (amber) | Resume, Cancel |
| Awaiting approval | Bell icon (red badge) | Review + Approve |
| Completed | Green check | View results, Dismiss |
| Failed | Red X | View error, Retry |
| Cancelled | Gray dash | — |

---

### 6.3 Notification Fallback

When the user is not active in the application, task completion must reach them through ambient channels.

| Delivery Channel | Trigger | Content |
|----------------|---------|---------|
| In-app toast | User active, task completes | "Contract analysis complete — 12 high-risk clauses found" |
| Browser push notification | User has tab open, focus elsewhere | Title + one-line summary |
| Email digest | User offline > 15 minutes | Subject, summary, link to results |
| Slack DM | User has Slack integration configured | Summary card + "View Results" button |
| Mobile push | User has mobile app installed | Summary + deep link to task result |

---

## 7. Multi-agent Collaboration UX

### 7.1 Agent Handoff Visualization

```text
┌──────────────────────────────────────────────────────────┐
│  ACTIVE AGENTS                                           │
│  ─────────────────────────────────────────────────────  │
│                                                          │
│  [Orchestrator]                                          │
│       │ "Analyze contract and identify risks"            │
│       ├──────────────────────────────────────────────    │
│       │                                                  │
│       ▼                          ▼                       │
│  [Legal Analyst]            [Risk Scorer]                │
│  ● Reading clauses          ○ Waiting for clauses        │
│  Progress: 3/12 sections                                 │
│                                                          │
│  ─ ─ ─ Message Bus ─ ─ ─                                │
│  14:32:41  Orchestrator → Legal Analyst: "Start clause…" │
│  14:33:15  Legal Analyst → Risk Scorer:  "Clause 3: …"  │
│                                                          │
│  [Intervene]  [View full message log]  [Stop all]        │
└──────────────────────────────────────────────────────────┘
```

### 7.2 Multi-agent Status Dashboard

| Dashboard Element | Content | Refresh |
|------------------|---------|---------|
| Agent status grid | Name, state, current task, last action | Real-time |
| Inter-agent message feed | Timestamped messages between agents | Real-time |
| Shared workspace panel | Files/data being worked on | Real-time |
| Conflict alerts | When two agents modify the same resource | Immediate |
| Resource consumption | Token usage, API calls per agent | Per-turn |
| Human approval queue | Pending approvals from any agent | Real-time |

---

## 8. Undo, Replay, and Checkpoint UX

### 8.1 What Can and Cannot Be Undone

| Action Type | Undoable? | Recovery Path |
|-------------|-----------|---------------|
| Text generation in chat | Yes | Delete message; regenerate |
| File created by agent | Yes | Agent-initiated delete |
| File modified by agent | Yes | Restore from agent checkpoint |
| Email sent by agent | No | Draft was stored; send notification only |
| Database record updated | Depends | If event-sourced: yes. CRUD: requires backup |
| External API call | No | Log the call; manual reversal only |
| Payment initiated | No | Cancellation via financial system; not agent |
| Slack message sent | No | Delete via Slack API (time-limited) |

---

### 8.2 Conversation Branching

```text
Conversation Timeline:
  Turn 1: "Analyze Q3 contracts"
  Turn 2: [Agent returns analysis]
  Turn 3: "Focus on payment terms"     ◄── BRANCH POINT
           │
           ├── Branch A: "Focus on liability"     (current)
           └── Branch B: "Focus on payment terms" (fork from here)
```

**Branch controls:**
- Every message in history shows a "Fork from here" icon on hover
- Branching creates a new conversation tab with the shared prefix
- Side-by-side comparison mode shows branch A vs. branch B responses
- Branches are named automatically ("Branch from Turn 3") and can be renamed

---

### 8.3 Checkpoint UX

| Checkpoint Feature | Description |
|-------------------|-------------|
| **Auto-checkpoint** | System creates checkpoint at every tool call and major milestone |
| **Named checkpoint** | User clicks "Save checkpoint" and names it ("Before risk analysis") |
| **Checkpoint list** | Timeline showing all checkpoints with metadata |
| **Restore** | One click loads checkpoint; current state is auto-saved before restore |
| **Compare** | Side-by-side view of agent state at two checkpoints |
| **Re-run from checkpoint** | Re-execute from a checkpoint with modified parameters |

---

## 9. Audit UX

### 9.1 Audit View Components

```text
AGENT AUDIT VIEW
─────────────────────────────────────────────────────────────
Session: AGT-2024-09-15-0042     User: sarah.chen@corp.com
Started: 2024-09-15 14:32 UTC    Duration: 18m 42s
Status: Completed                Risk Score: 2/10 (Low)
─────────────────────────────────────────────────────────────

 14:32:00  Session started
           User query: "Analyze Q3 vendor contracts for renewal"

 14:32:15  Tool: search_documents
           Query: "vendor contracts 2024 Q3"
           Result: 23 documents found   [View]

 14:33:42  Tool: read_document
           File: "MSA_AcmeCorp_2024.pdf"
           Pages: 1-24                  [View]

 14:35:11  APPROVAL REQUESTED
           Action: Update contract status to "Under Review"
           Approver: sarah.chen@corp.com
           Decision: Approved at 14:35:24 (13 seconds)   [View]

 14:50:41  Final output generated       [View]

 14:50:41  Session ended
─────────────────────────────────────────────────────────────
[ Export CSV ]  [ Export PDF ]  [ Send to compliance inbox ]
```

---

### 9.2 Compliance Evidence Export

| Export Format | Content | Use For |
|--------------|---------|---------|
| CSV | Structured log of all tool calls and approvals | SIEM integration, bulk analysis |
| PDF report | Human-readable audit report with signatures | Regulatory submission, legal proceedings |
| JSON trace | Full structured event stream | Technical audit, LLM training |
| Screenshots | Visual captures of approval dialogs | Evidence in disputes |

---

## 10. Failure and Error UX

### 10.1 Error Classification by User Impact

| Error Class | Example | User Impact | UX Response |
|-------------|---------|------------|-------------|
| **Transient** | API timeout | Minor delay | Auto-retry silently; show spinner |
| **Recoverable** | Rate limit | Short delay | "Retrying (1/3)..." |
| **Content error** | LLM refused request | Task fails | "I can't help with this. [Why?] [Try differently]" |
| **Tool failure** | Database connection lost | Partial result | "Could not access X. Showing partial results." |
| **Partial failure** | 4 of 8 steps completed | Incomplete result | "Completed 4/8 steps. Steps 5-8 failed. [View] [Retry failed steps]" |
| **Fatal** | Session corrupt | Full task failure | "Something went wrong. Your progress has been saved. [Resume] [Start over]" |

---

### 10.2 Error Message Design for Agentic Systems

**Good error messages** answer: what happened, why it happened, and what the user can do.

| Anti-pattern | Example | Better |
|-------------|---------|--------|
| Technical jargon | "500 Internal Server Error" | "Something went wrong on our end. Please try again." |
| Vague failure | "An error occurred" | "The document search failed because the knowledge base is temporarily unavailable." |
| No action offered | "This failed." | "The search failed. [Retry] [Search differently] [Ask for help]" |
| Blaming the user | "Your request was malformed" | "I didn't understand that request. Could you rephrase it?" |
| Missing context | "Rate limit exceeded" | "I'm processing too many requests right now. I'll continue automatically in about 30 seconds." |

---

## 11. Accessibility for Agentic UIs

### 11.1 WCAG 2.1 AA Requirements Specific to Agentic UX

| Agentic UX Element | WCAG Criterion | Implementation |
|--------------------|---------------|----------------|
| Streaming text | 4.1.3 Status Messages | Use ARIA live region: `aria-live="polite"` for streaming, `"assertive"` for errors |
| Approval dialogs | 2.1.1 Keyboard, 2.4.3 Focus Order | Trap focus in modal; approve/reject on Enter/Escape |
| Confidence indicators | 1.4.1 Use of Color | Never use color alone; include text label or icon + text |
| Progress bars | 4.1.3 Status Messages | `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Tool call callouts | 1.3.1 Info and Relationships | Semantic `<aside>` or `role="status"` |
| Agent status icons | 1.1.1 Non-text Content | `aria-label` on all icon-only indicators |
| Cancel/stop button | 2.1.1 Keyboard | Always keyboard-accessible; never icon-only |
| Notification toasts | 4.1.3 Status Messages | `role="alert"` for urgent; `role="status"` for informational |

---

### 11.2 Screen Reader Support for Streaming Content

```text
RECOMMENDED ARIA PATTERN FOR STREAMING:

<div role="log" aria-live="polite" aria-label="Agent response">
  <!-- Token-by-token content appended here -->
  <!-- Screen reader announces at paragraph boundaries -->
</div>

<!-- For tool call status: -->
<div role="status" aria-live="polite" aria-atomic="true">
  Running: search_contracts...
</div>

<!-- For approval requests: -->
<dialog aria-modal="true" aria-labelledby="approval-title">
  <h2 id="approval-title">Action Required: Delete 47 files</h2>
  <!-- Dialog content -->
</dialog>
```

---

### 11.3 Color-blind Accessible Confidence Indicators

| Confidence Level | Color (WCAG AA) | Icon | Text Label |
|-----------------|----------------|------|------------|
| Very High (90-100%) | #2E7D32 (green, 4.5:1) | ✓ shield | "Very High" |
| High (70-89%) | #1565C0 (blue, 5.1:1) | ↑ trend | "High" |
| Medium (40-69%) | #E65100 (orange, 3.1:1 on white) | ≈ wavy | "Medium" |
| Low (20-39%) | #B71C1C (red, 5.8:1) | ↓ trend | "Low" |
| Very Low (<20%) | #4A148C (purple, 7.3:1) | ? question | "Very Low" |

Use fill level (progress bar) as the primary encoding. Color is secondary. Text label is always present.

---

## 12. Agent UX Anti-patterns

### 12.1 Complete Anti-pattern Catalog

| # | Anti-pattern | Severity | Description | Mitigation |
|---|-------------|----------|-------------|------------|
| 1 | **Ghost approvals** | Critical | Approval dialogs auto-close or appear and disappear before user can read them | Set minimum display time (3s); no auto-close |
| 2 | **Confirmation fatigue** | High | Every trivial action requires approval, training users to click through without reading | Calibrate approval thresholds; use HOTL for low-risk |
| 3 | **Silent tool execution** | High | Agent calls external APIs or mutates data without any user visibility | Always surface tool calls to users |
| 4 | **Hallucinated citations** | High | Agent fabricates document references that appear in the citation list | Verify all citations against retrieved chunks |
| 5 | **Anthropomorphism overflow** | Medium | Agent uses first-person emotional language ("I feel", "I'm excited to") creating false relationship | Keep agent persona professional; avoid emotional language |
| 6 | **Streaming wall of text** | High | Agent streams 2000+ word responses with no structure | Enforce response length limits; use structured output |
| 7 | **Context collapse** | High | Agent appears to remember something it cannot (cross-session memory leak) | Clearly indicate what session context is in use |
| 8 | **Overconfident errors** | Critical | Agent states incorrect facts with high confidence indicators | Implement uncertainty-aware prompting; validate before rendering confidence |
| 9 | **Approval without consequence** | Critical | Approval dialog does not clearly state what happens if approved | Every approval dialog must show consequence |
| 10 | **No undo for mutations** | High | Agent modifies data with no way to reverse | Implement pre-action snapshots; offer undo within 30 seconds |
| 11 | **Invisible agent identity** | Medium | User cannot tell which AI/agent/model produced an output | Always show agent identity in response header |
| 12 | **Missing stop button** | High | User cannot cancel a running task | Stop button always visible during any active task |
| 13 | **Streaming jank on mobile** | Medium | Character-level streaming causes layout thrash on mobile browsers | Use word-buffered streaming on mobile |
| 14 | **Progress bar that never moves** | Medium | Progress bar stuck at 0% or 99% for long periods | Use milestone-based progress; reflect real state |
| 15 | **Error messages in logs only** | High | Errors visible only in browser console or server logs | Surface all user-impacting errors in the UI |
| 16 | **Reasoning shown always** | Medium | Every response shows full chain-of-thought regardless of need | Gate reasoning display on stakes × confidence matrix |
| 17 | **Multi-agent confusion** | Medium | User cannot tell which agent is speaking | Prefix each agent message with its name/role |
| 18 | **Async task orphan** | High | Background tasks continue after user logs out with no notification | Tie task lifecycle to session; email completion to user |
| 19 | **No audit export** | High | Audit log exists in the system but cannot be exported by the user | Provide CSV/PDF export from every audit view |
| 20 | **Color-only confidence** | Medium | Confidence shown only as green/red color with no text or icon | Add text label to all confidence indicators |
| 21 | **Keyboard trap in modal** | High | Approval dialog cannot be dismissed with keyboard | Implement focus trap with Escape to close/reject |
| 22 | **Streaming ARIA spam** | Medium | Screen reader announces every token, making speech unusable | Use `aria-live="polite"` only; batch updates |
| 23 | **Implied causality** | Medium | UI implies agent caused a business outcome that was coincidental | Be precise: "The agent suggested X" not "The agent achieved Y" |
| 24 | **Tool parameter leakage** | High | Internal system parameters (API keys, internal IDs) shown in tool call UI | Sanitize tool call display; show user-facing summaries only |
| 25 | **Perpetual loading state** | Medium | Task appears to be running forever with no update | Auto-escalate tasks > 2× estimated duration; notify user |
| 26 | **No empty state for agent list** | Low | Multi-agent dashboard shows blank page before agents start | Always show agent roster with pending/queued states |
| 27 | **Approval context missing** | High | Approval dialog shows action with no context on why the agent chose to take it | Include the task goal and reasoning summary in every approval |
| 28 | **Irreversible default** | High | The default action in an approval dialog is the destructive action | Place destructive action as secondary; safe action as primary/default |

---

:::tip Getting Started with UX Pattern Selection
    For a new agentic application, start with the **Copilot Pattern Taxonomy** (Section 1) to identify your deployment archetype, then use the **Decision Framework** guide at [decision-frameworks.md](decision-frameworks.md) for technology selection. For lifecycle planning, see [application-lifecycle.md](application-lifecycle.md).

:::note Protocol Reference
    AG-UI event types referenced throughout this document (`TEXT_MESSAGE_CONTENT`, `TOOL_CALL_START`, `STATE_SNAPSHOT`, etc.) are specified in the AG-UI open protocol. MCP integration patterns are detailed in [MCP Deep Research 2026](../ai-protocols/mcp/MCP_Deep_Research_2026.md).
