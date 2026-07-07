import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview", icon: "🧠" },
  { id: "memory-types", label: "Memory Types", icon: "🗄️" },
  { id: "patterns", label: "Multi-Agent Patterns", icon: "🕸️" },
  { id: "processors", label: "Processors & Extractors", icon: "⚙️" },
  { id: "banking", label: "EU Banking & GDPR", icon: "🏦" },
  { id: "security", label: "Security & Policy", icon: "🔒" },
  { id: "cost", label: "Cost & Regions", icon: "💰" },
  { id: "journey", label: "Project Journey", icon: "🗺️" },
  { id: "strands", label: "Strands Best Practices", icon: "🧵" },
  { id: "terraform", label: "Terraform IaC", icon: "🏗️" },
  { id: "evaluation", label: "Evaluation", icon: "📊" },
  { id: "risks", label: "Risks & Recs", icon: "⚠️" },
];

const Tag = ({ color, children }) => {
  const colors = {
    green: "bg-emerald-900/60 text-emerald-300 border border-emerald-700",
    red: "bg-red-900/60 text-red-300 border border-red-700",
    amber: "bg-amber-900/60 text-amber-300 border border-amber-700",
    blue: "bg-blue-900/60 text-blue-300 border border-blue-700",
    purple: "bg-purple-900/60 text-purple-300 border border-purple-700",
    slate: "bg-slate-700/60 text-slate-300 border border-slate-600",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-mono font-semibold ${colors[color] || colors.slate}`}>
      {children}
    </span>
  );
};

const Card = ({ title, children, accent = "blue", className = "" }) => {
  const accents = {
    blue: "border-blue-700 bg-blue-950/30",
    emerald: "border-emerald-700 bg-emerald-950/30",
    amber: "border-amber-700 bg-amber-950/30",
    red: "border-red-700 bg-red-950/30",
    purple: "border-purple-700 bg-purple-950/30",
    slate: "border-slate-600 bg-slate-800/40",
  };
  return (
    <div className={`rounded-xl border ${accents[accent]} p-5 ${className}`}>
      {title && <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">{title}</h3>}
      {children}
    </div>
  );
};

const CodeBlock = ({ children }) => (
  <pre className="bg-slate-950 border border-slate-700 rounded-lg p-4 text-xs text-emerald-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
    {children}
  </pre>
);

const Badge = ({ children, type = "info" }) => {
  const types = {
    info: "bg-blue-900 text-blue-200",
    warning: "bg-amber-900 text-amber-200",
    success: "bg-emerald-900 text-emerald-200",
    danger: "bg-red-900 text-red-200",
    neutral: "bg-slate-700 text-slate-200",
  };
  return <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${types[type]}`}>{children}</span>;
};

// ─── SECTION COMPONENTS ──────────────────────────────────────────────────────

function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-blue-950 via-slate-900 to-purple-950 border border-blue-800 p-8">
        <div className="flex items-start gap-4">
          <div className="text-5xl">🧠</div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">AgentCore Memory — Complete Architecture Guide</h2>
            <p className="text-slate-300 leading-relaxed">
              A prescriptive, production-grade reference for implementing memory in AWS AI agents using the{" "}
              <span className="text-amber-400 font-semibold">Strands Framework</span> on{" "}
              <span className="text-blue-400 font-semibold">Amazon Bedrock AgentCore Runtime</span>. Covers all memory
              flavors, multi-agent patterns, EU/GDPR compliance, security policy, Terraform IaC, and project journey.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card title="The Memory Problem — Why It Matters" accent="slate">
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            Without memory, every agent interaction is stateless — customers repeat themselves, context is lost, and
            agents cannot learn or personalize. AWS re:Invent 2025 and AWS Summit NY 2025 both highlighted AgentCore
            Memory as the critical missing layer that transforms transactional AI into continuous, evolving relationships.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { icon: "💬", problem: "Repeated context", solution: "Short-term session memory" },
              { icon: "🔄", problem: "Lost preferences", solution: "Long-term user preference extraction" },
              { icon: "📉", problem: "No learning", solution: "Episodic memory & reflection agent" },
            ].map((item) => (
              <div key={item.problem} className="bg-slate-800 rounded-lg p-3">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-red-400 text-xs mb-1">{item.problem}</div>
                <div className="text-emerald-400 text-xs font-semibold">→ {item.solution}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="AgentCore Memory Architecture — 5 Design Principles" accent="blue">
          <div className="space-y-2">
            {[
              ["Abstracted Storage", "Fully managed — no DynamoDB/OpenSearch/Redis to manage manually"],
              ["Security First", "Encryption at rest & transit; KMS CMK support; per-session isolation"],
              ["Continuity", "Events stored chronologically; session branching for parallel tasks"],
              ["Hierarchical Namespaces", "actor_id → namespace → memory enables fine-grained multi-tenant RBAC"],
              ["Scalable Retrieval", "Low-latency semantic search; vector embeddings managed internally"],
            ].map(([title, desc], i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-blue-900 text-blue-300 text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <span className="text-white font-semibold text-sm">{title}: </span>
                  <span className="text-slate-400 text-sm">{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Memory Component Map" accent="purple">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { label: "Memory Resource", sub: "Container + retention config", color: "purple" },
              { label: "Events (Short-Term)", sub: "Raw conversation turns", color: "blue" },
              { label: "Memories (Long-Term)", sub: "Extracted insights", color: "emerald" },
              { label: "Strategies", sub: "How insights are extracted", color: "amber" },
            ].map((item) => (
              <div key={item.label} className={`rounded-lg p-3 bg-${item.color}-950/50 border border-${item.color}-800`}>
                <div className="font-bold text-white mb-1">{item.label}</div>
                <div className="text-slate-400">{item.sub}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-500 text-center">
            Memory Resource → stores Events → Consolidation Job → extracts Memories → Retrieval API → injects into prompt
          </div>
        </Card>
      </div>
    </div>
  );
}

function MemoryTypesSection() {
  const [active, setActive] = useState("short");
  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">
        {[
          { id: "short", label: "Short-Term" },
          { id: "long", label: "Long-Term Strategies" },
          { id: "episodic", label: "Episodic" },
          { id: "checkpointing", label: "Checkpointing" },
          { id: "retention", label: "Retention Periods" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              active === tab.id ? "bg-blue-700 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "short" && (
        <div className="space-y-4">
          <Card title="Short-Term Memory (Working Memory)" accent="blue">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-semibold mb-2">What It Stores</h4>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li>• Raw conversation turns (user + assistant messages)</li>
                  <li>• Tool call inputs & outputs within session</li>
                  <li>• Session branching state (parallel tasks)</li>
                  <li>• In-flight reasoning context</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Configuration</h4>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li>• Retention: <Tag color="amber">7 days → 365 days</Tag></li>
                  <li>• Scope: Single session by default</li>
                  <li>• batch_size: buffer msgs before flush</li>
                  <li>• Branching: parallel task support</li>
                </ul>
              </div>
            </div>
          </Card>
          <Card title="Single Session vs Cross-Session" accent="slate">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Badge type="info">Single Session</Badge>
                <ul className="mt-2 space-y-1 text-slate-300">
                  <li>• One session_id per conversation</li>
                  <li>• Events scoped to that session</li>
                  <li>• Cleared when session ends (per retention)</li>
                  <li>• ✅ Customer support ticket</li>
                  <li>• ✅ One-time transaction agent</li>
                </ul>
              </div>
              <div>
                <Badge type="success">Cross-Session</Badge>
                <ul className="mt-2 space-y-1 text-slate-300">
                  <li>• Same actor_id across sessions</li>
                  <li>• Long-term memories survive session end</li>
                  <li>• Preferences persist indefinitely</li>
                  <li>• ✅ Personal finance advisor</li>
                  <li>• ✅ Relationship banking agent</li>
                </ul>
              </div>
            </div>
          </Card>
          <CodeBlock>{`# Strands short-term session setup
from bedrock_agentcore.memory.integrations.strands.config import AgentCoreMemoryConfig
from bedrock_agentcore.memory.integrations.strands.session_manager import AgentCoreMemorySessionManager

config = AgentCoreMemoryConfig(
    memory_id=MEMORY_ID,          # Logical memory container
    session_id=SESSION_ID,         # Unique per conversation
    actor_id=USER_ID,              # Links sessions to same user
    batch_size=10,                 # Buffer before flush (reduces API calls)
)

with AgentCoreMemorySessionManager(config, region_name="eu-central-1") as session:
    agent = Agent(system_prompt="...", session_manager=session)
    agent("Hello")  # auto-persisted`}</CodeBlock>
        </div>
      )}

      {active === "long" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                name: "SUMMARIZATION",
                icon: "📝",
                description: "Condenses long conversations into digestible highlights. Prevents context window overflow in long-running sessions.",
                use: "Long advisory sessions, support ticket history",
                risk: "May lose nuanced detail",
                accent: "blue",
              },
              {
                name: "USER_PREFERENCE",
                icon: "👤",
                description: "Extracts likes, dislikes, behavioral patterns, communication styles. Key for personalization.",
                use: "Wealth management, personal banking, retail",
                risk: "May encode outdated prefs — needs TTL",
                accent: "emerald",
              },
              {
                name: "SEMANTIC",
                icon: "🔍",
                description: "Captures factual knowledge, domain entities, relationships. Vector-searchable for RAG injection.",
                use: "KYC facts, product knowledge, org hierarchy",
                risk: "Stale facts if not refreshed",
                accent: "purple",
              },
            ].map((s) => (
              <Card key={s.name} accent={s.accent}>
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-mono font-bold text-white text-sm mb-2">{s.name}</div>
                <p className="text-slate-300 text-xs mb-3">{s.description}</p>
                <div className="text-xs space-y-1">
                  <div><span className="text-emerald-400">✅ Use: </span><span className="text-slate-400">{s.use}</span></div>
                  <div><span className="text-amber-400">⚠️ Risk: </span><span className="text-slate-400">{s.risk}</span></div>
                </div>
              </Card>
            ))}
          </div>
          <Card title="Self-Managed Strategy — Full Pipeline Control" accent="amber">
            <p className="text-slate-300 text-sm mb-3">
              GA (Oct 2025): Bring your own extraction logic. Plug in custom summarizers, entity extractors, PII redactors, and consolidation pipelines. Essential for EU banking where you control every data transformation.
            </p>
            <CodeBlock>{`# Self-managed strategy — custom extraction pipeline
strategy = {
    "type": "CUSTOM",
    "customConfig": {
        "extractionLambdaArn": "arn:aws:lambda:eu-central-1:...:function:pii-redact-extractor",
        "consolidationLambdaArn": "arn:aws:lambda:eu-central-1:...:function:memory-consolidator",
        "extractionSchedule": "AFTER_EACH_SESSION"
    }
}`}</CodeBlock>
          </Card>
        </div>
      )}

      {active === "episodic" && (
        <div className="space-y-4">
          <Card title="Episodic Memory — Experience-Based Learning (GA Dec 2025)" accent="purple">
            <p className="text-slate-300 text-sm mb-4">
              A reflection agent automatically analyzes structured episodes — capturing context, reasoning, actions, and outcomes — to extract broader patterns. When similar tasks arise, the agent retrieves learnings to improve consistency.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Episode Structure</h4>
                <ul className="text-slate-300 text-xs space-y-1">
                  <li>• <strong>Context:</strong> what situation triggered the task</li>
                  <li>• <strong>Reasoning:</strong> how the agent thought through it</li>
                  <li>• <strong>Actions:</strong> tool calls / decisions made</li>
                  <li>• <strong>Outcomes:</strong> success/failure + user feedback</li>
                </ul>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold text-sm mb-2">Banking Use Cases</h4>
                <ul className="text-slate-300 text-xs space-y-1">
                  <li>• Fraud pattern recognition per customer</li>
                  <li>• Loan application processing improvements</li>
                  <li>• Trade execution preference learning</li>
                  <li>• Compliance inquiry handling patterns</li>
                </ul>
              </div>
            </div>
          </Card>
          <Card title="⚠️ Episodic Memory — EU Banking Caution" accent="red">
            <ul className="text-slate-300 text-sm space-y-2">
              <li>🔴 Episodes may encode biased decision patterns — requires algorithmic fairness audit (DORA, EBA guidelines)</li>
              <li>🔴 Cross-customer episode contamination risk if actor_id not strictly isolated</li>
              <li>🔴 Reflection agent makes autonomous decisions — must log reasoning for explainability (MiF ID II, GDPR Art. 22)</li>
              <li>🟡 Episodic storage subject to GDPR right-to-erasure — implement episode-level delete workflow</li>
            </ul>
          </Card>
        </div>
      )}

      {active === "checkpointing" && (
        <div className="space-y-4">
          <Card title="Checkpointing — State Persistence for Long-Running Agents" accent="slate">
            <p className="text-slate-300 text-sm mb-4">
              AgentCore Runtime supports up to 8-hour execution windows. For long agentic workflows (loan processing, KYC, compliance review), checkpointing saves intermediate state so agents can resume after failure without replaying from scratch.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-semibold text-sm mb-2">What to Checkpoint</h4>
                <ul className="text-slate-300 text-xs space-y-1">
                  <li>• Tool call results (avoid re-running expensive queries)</li>
                  <li>• Sub-agent completion status in multi-agent flows</li>
                  <li>• Partial form/workflow state</li>
                  <li>• Validated data already processed</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-2">Checkpointing Strategy</h4>
                <ul className="text-slate-300 text-xs space-y-1">
                  <li>• Store checkpoint in AgentCore Memory (events layer)</li>
                  <li>• Use session_id as checkpoint key</li>
                  <li>• Write after each major step (saga pattern)</li>
                  <li>• Include version + timestamp metadata</li>
                </ul>
              </div>
            </div>
          </Card>
          <CodeBlock>{`# Strands hook-based checkpointing pattern
from strands.hooks import AfterToolUseEvent

class CheckpointHook:
    def __init__(self, memory_client, session_id):
        self.memory = memory_client
        self.session_id = session_id

    def after_tool_use(self, event: AfterToolUseEvent):
        # Save checkpoint after each tool call
        checkpoint = {
            "step": event.tool_name,
            "result": event.tool_result,
            "timestamp": datetime.utcnow().isoformat(),
            "status": "completed"
        }
        self.memory.put_events(
            memory_id=MEMORY_ID,
            session_id=f"{self.session_id}:checkpoint",
            events=[{"role": "checkpoint", "content": json.dumps(checkpoint)}]
        )`}</CodeBlock>
        </div>
      )}

      {active === "retention" && (
        <div className="space-y-4">
          <Card title="Retention Period Decision Matrix" accent="amber">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-700">
                    {["Use Case", "Memory Type", "Retention", "Justification", "GDPR Basis"].map((h) => (
                      <th key={h} className="text-left text-slate-400 font-semibold pb-2 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="space-y-1">
                  {[
                    ["Customer support chat", "Short-term", "7 days", "Ticket resolution window", "Legitimate interest"],
                    ["Loan application", "Short-term + checkpoint", "90 days", "Dispute resolution period", "Contract"],
                    ["Wealth management", "Long-term (preference)", "2 years", "Relationship continuity", "Consent"],
                    ["Fraud investigation", "Long-term (semantic)", "7 years", "AML/regulatory retention", "Legal obligation"],
                    ["Trading preferences", "Long-term (preference)", "1 year", "MiFID II suitability", "Consent + Legal"],
                    ["KYC entities", "Long-term (semantic)", "5 years", "AML directive", "Legal obligation"],
                    ["Episode patterns", "Episodic", "1 year + review", "Model improvement", "Legitimate interest"],
                  ].map(([uc, mt, ret, just, basis], i) => (
                    <tr key={i} className="border-b border-slate-800">
                      <td className="py-2 pr-4 text-white">{uc}</td>
                      <td className="pr-4 text-blue-300">{mt}</td>
                      <td className="pr-4"><Tag color="amber">{ret}</Tag></td>
                      <td className="pr-4 text-slate-400">{just}</td>
                      <td className="text-emerald-400">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card title="⚠️ Retention Anti-Patterns to Avoid" accent="red">
            <ul className="text-slate-300 text-sm space-y-2">
              <li>❌ <strong>Retain-all:</strong> Setting retention to 365 days for all memory types — violates GDPR data minimization</li>
              <li>❌ <strong>No TTL on preferences:</strong> Stale user preferences corrupt personalization quality over time</li>
              <li>❌ <strong>Shared retention policy:</strong> One policy for all tenants/regions — EU customers need stricter defaults</li>
              <li>❌ <strong>Manual deletion only:</strong> Must automate right-to-erasure workflow for GDPR Art. 17 compliance</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}

function PatternsSection() {
  const [active, setActive] = useState("single");
  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">
        {[
          { id: "single", label: "Single Agent" },
          { id: "shared", label: "Shared Memory" },
          { id: "one-write", label: "One Write / Many Read" },
          { id: "multi-write", label: "Multi-Write" },
          { id: "ledger", label: "Transaction Ledger" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              active === tab.id ? "bg-purple-700 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "single" && (
        <div className="space-y-4">
          <Card title="Single Agent Memory — Isolated Namespace" accent="blue">
            <p className="text-slate-300 text-sm mb-3">
              Each agent owns a dedicated Memory Resource. No sharing. actor_id maps to a specific user. Simplest, most secure pattern. Start here.
            </p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300">
              <div className="text-blue-400">Memory Resource (memory_id)</div>
              <div className="ml-4 text-slate-400">└── namespace: "user/{"{actor_id}"}"</div>
              <div className="ml-8 text-emerald-400">├── Short-term events (session_id)</div>
              <div className="ml-8 text-purple-400">└── Long-term memories (extracted)</div>
            </div>
          </Card>
        </div>
      )}

      {active === "shared" && (
        <div className="space-y-4">
          <Card title="Shared Memory — Multiple Agents, One Memory Resource" accent="purple">
            <p className="text-slate-300 text-sm mb-3">
              Agents share a single Memory Resource using different namespaces. AgentCore's hierarchical namespace system provides RBAC at the namespace level. Critical for multi-agent teams collaborating on a shared task.
            </p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300">
              <div className="text-purple-400">Memory Resource (shared_memory_id)</div>
              <div className="ml-4">├── namespace: "agents/orchestrator" → <span className="text-blue-400">Orchestrator Agent</span></div>
              <div className="ml-4">├── namespace: "agents/fraud-detector" → <span className="text-red-400">Fraud Agent</span></div>
              <div className="ml-4">├── namespace: "agents/kyc-agent" → <span className="text-emerald-400">KYC Agent</span></div>
              <div className="ml-4">└── namespace: "users/{"{actor_id}"}" → <span className="text-amber-400">Shared user context</span></div>
            </div>
          </Card>
          <Card title="Shared Memory Access Control" accent="amber">
            <ul className="text-slate-300 text-sm space-y-2">
              <li>🔐 IAM resource policy on memory_id — restrict which Lambda/AgentCore roles can read/write</li>
              <li>🔐 Namespace-level isolation — agents cannot traverse to sibling namespaces without explicit permission</li>
              <li>🔐 KMS CMK with per-namespace encryption context for cryptographic namespace isolation</li>
              <li>⚠️ Avoid wildcard namespace access — list only required namespaces in IAM policy</li>
            </ul>
          </Card>
        </div>
      )}

      {active === "one-write" && (
        <div className="space-y-4">
          <Card title="One Agent Writes — Others Read (Publisher/Subscriber)" accent="emerald">
            <p className="text-slate-300 text-sm mb-3">
              A dedicated Memory Writer agent (e.g., KYC Collector) extracts and persists facts. Downstream agents (e.g., Credit Agent, Risk Agent) are read-only consumers of that memory namespace.
            </p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300 mb-3">
              <div className="text-emerald-400">KYC Collector Agent → WRITE → namespace:"kyc/{"{customer_id}"}"</div>
              <div className="ml-8 text-slate-500">↓ (consolidation job extracts entities)</div>
              <div className="text-blue-400">Credit Agent → READ ONLY ← namespace:"kyc/{"{customer_id}"}"</div>
              <div className="text-amber-400">Risk Agent → READ ONLY ← namespace:"kyc/{"{customer_id}"}"</div>
              <div className="text-purple-400">Compliance Agent → READ ONLY ← namespace:"kyc/{"{customer_id}"}"</div>
            </div>
            <CodeBlock>{`# IAM policy — read-only consumer agent
{
  "Effect": "Allow",
  "Action": [
    "bedrock-agentcore:GetMemory",
    "bedrock-agentcore:RetrieveAndGenerateMemory"
  ],
  "Resource": "arn:aws:bedrock-agentcore:eu-central-1:...:memory/${memory_id}",
  "Condition": {
    "StringLike": { "bedrock-agentcore:namespace": "kyc/*" }
  }
}`}</CodeBlock>
          </Card>
        </div>
      )}

      {active === "multi-write" && (
        <div className="space-y-4">
          <Card title="Multi-Agent Write — Concurrent Writes & Consistency" accent="red">
            <p className="text-slate-300 text-sm mb-3">
              Multiple agents write to the same memory namespace simultaneously. Highest risk for consistency issues. Apply these guardrails:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-red-400 font-semibold text-sm mb-2">Risks</h4>
                <ul className="text-slate-300 text-xs space-y-1">
                  <li>❌ Last-write-wins — conflicting memory updates</li>
                  <li>❌ Duplicate event ingestion</li>
                  <li>❌ Inconsistent extracted memories</li>
                  <li>❌ PII cross-contamination between agent writes</li>
                </ul>
              </div>
              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Mitigations</h4>
                <ul className="text-slate-300 text-xs space-y-1">
                  <li>✅ Separate namespaces per writing agent</li>
                  <li>✅ Orchestrator does final consolidation write</li>
                  <li>✅ Event deduplication via idempotency key</li>
                  <li>✅ Consolidation job runs post-session (async)</li>
                </ul>
              </div>
            </div>
          </Card>
          <Card title="Recommended Multi-Write Pattern — Hub & Spoke" accent="amber">
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300">
              <div className="text-amber-400">Sub-agents WRITE to own namespace:</div>
              <div className="ml-4">fraud-agent → namespace:"agent-outputs/fraud/{"{session}"}"</div>
              <div className="ml-4">credit-agent → namespace:"agent-outputs/credit/{"{session}"}"</div>
              <div className="ml-8 text-slate-500">↓ Orchestrator consolidates after all complete</div>
              <div className="text-emerald-400">Orchestrator → MERGE → namespace:"consolidated/{"{customer_id}"}"</div>
            </div>
          </Card>
        </div>
      )}

      {active === "ledger" && (
        <div className="space-y-4">
          <Card title="Transaction Ledger Pattern — Immutable Audit Trail" accent="slate">
            <p className="text-slate-300 text-sm mb-3">
              For financial services, treat memory events as an append-only ledger. Every agent decision, tool call outcome, and memory extraction is immutable and auditable. Required for MiFID II, DORA, and AML compliance.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-semibold text-sm mb-2">Ledger Components</h4>
                <ul className="text-slate-300 text-xs space-y-1">
                  <li>• AgentCore events = append-only log</li>
                  <li>• CloudWatch Logs — structured agent trace</li>
                  <li>• S3 + Object Lock (WORM) — 7-year archive</li>
                  <li>• CloudTrail — API-level audit (who called what)</li>
                  <li>• AgentCore Observability — full trace view</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-2">Ledger Schema</h4>
                <div className="bg-slate-800 rounded p-2 font-mono text-xs text-emerald-300">
                  {`{
  event_id: uuid,
  timestamp: ISO8601,
  actor_id: customer_ref,
  agent_id: agent_name,
  event_type: "decision|tool|memory",
  payload: {...},
  pii_redacted: true,
  signature: hmac_sha256
}`}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function ProcessorsSection() {
  return (
    <div className="space-y-5">
      <Card title="Memory Processing Pipeline — Four Stages" accent="slate">
        <div className="flex items-center gap-2 text-xs flex-wrap">
          {["Ingest Events", "→", "PII Redactor", "→", "Entity Extractor", "→", "Summarizer", "→", "Consolidator", "→", "Vector Store", "→", "Retrieval"].map((s, i) => (
            <span key={i} className={s === "→" ? "text-slate-600" : "bg-slate-800 border border-slate-600 px-2 py-1 rounded text-slate-200 font-mono"}>
              {s}
            </span>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card title="PII Redactor" accent="red">
          <p className="text-slate-300 text-xs mb-3">
            Must run BEFORE any memory extraction. Strips PII from events before they reach the LLM consolidation step or vector store. Critical for EU banking.
          </p>
          <h4 className="text-white font-semibold text-xs mb-2">Detection Methods</h4>
          <ul className="text-slate-400 text-xs space-y-1 mb-3">
            <li>• Regex: IBAN, NIN, passport, card numbers</li>
            <li>• NER models: names, addresses, org names</li>
            <li>• Amazon Comprehend: managed PII detection</li>
            <li>• Presidio (open source): contextual PII detection</li>
            <li>• Custom Lambda: domain-specific patterns</li>
          </ul>
          <CodeBlock>{`# PII redaction before memory write
import boto3
comprehend = boto3.client('comprehend')

def redact_before_store(text, entity_types=None):
    if entity_types is None:
        entity_types = ["NAME","ADDRESS","PHONE","EMAIL",
                        "BANK_ACCOUNT_NUMBER","CREDIT_DEBIT_NUMBER"]
    response = comprehend.detect_pii_entities(Text=text, LanguageCode='en')
    entities = sorted(response['Entities'],
                     key=lambda e: e['BeginOffset'], reverse=True)
    for entity in entities:
        if entity['Type'] in entity_types:
            text = (text[:entity['BeginOffset']] +
                   f"[REDACTED:{entity['Type']}]" +
                   text[entity['EndOffset']:])
    return text`}</CodeBlock>
        </Card>

        <Card title="Entity Extractor" accent="purple">
          <p className="text-slate-300 text-xs mb-3">
            Extracts structured entities from conversations for semantic memory. Works on PII-redacted text.
          </p>
          <h4 className="text-white font-semibold text-xs mb-2">Banking Entity Types</h4>
          <ul className="text-slate-400 text-xs space-y-1 mb-3">
            <li>• Product interests (mortgage, ISA, pension)</li>
            <li>• Risk appetite (conservative, balanced, growth)</li>
            <li>• Life events (marriage, home purchase, retirement)</li>
            <li>• Stated financial goals</li>
            <li>• Relationship tenure & loyalty signals</li>
            <li>• Complaint topics & resolution history</li>
          </ul>
          <CodeBlock>{`# Entity extraction via self-managed strategy Lambda
def extract_entities(event_text):
    prompt = f"""Extract banking-relevant entities from this
    conversation. Return JSON only:
    {{"products": [], "risk_appetite": "", "life_events": [],
      "goals": [], "preferences": []}}
    Conversation: {event_text}"""
    
    response = bedrock.invoke_model(
        modelId="us.anthropic.claude-sonnet-4-6-v1",
        body=json.dumps({"messages": [{"role":"user","content": prompt}]})
    )
    return json.loads(response['body'].read())`}</CodeBlock>
        </Card>

        <Card title="Summarizer" accent="blue">
          <p className="text-slate-300 text-xs mb-3">
            Condenses conversation history to prevent context window overflow. Essential for relationship banking where sessions span hours.
          </p>
          <ul className="text-slate-400 text-xs space-y-1 mb-3">
            <li>• Built-in SUMMARIZATION strategy (managed)</li>
            <li>• Long context compaction via Strands SDK (upstreamed)</li>
            <li>• Custom summarization Lambda (self-managed)</li>
            <li>• Rolling window: keep last N turns + summary</li>
          </ul>
          <CodeBlock>{`# Strands built-in context compaction
from strands.models import BedrockModel, CacheConfig

model = BedrockModel(
    model_id="us.anthropic.claude-sonnet-4-6-v1",
    cache_config=CacheConfig(strategy="auto")  # Auto prompt caching
)
# Long conversations compacted via summarization strategy
# Configured at memory resource creation time`}</CodeBlock>
        </Card>

        <Card title="Consolidation Job" accent="emerald">
          <p className="text-slate-300 text-xs mb-3">
            Async job that processes raw events → extracts memories → deduplicates → stores in vector index. Runs post-session or on schedule.
          </p>
          <ul className="text-slate-400 text-xs space-y-1 mb-3">
            <li>• Managed: AgentCore runs consolidation automatically</li>
            <li>• Self-managed: trigger via Lambda on session end</li>
            <li>• Deduplication: merge similar preferences (e.g., "prefers email" appears 10×)</li>
            <li>• Conflict resolution: latest wins with timestamp</li>
            <li>• PII check: verify redaction before vector write</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function BankingSection() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-gradient-to-r from-amber-950 to-red-950 border border-amber-700 p-5">
        <h2 className="text-xl font-bold text-amber-300 mb-2">🏦 EU Banking Memory — GDPR, DORA & EBA Compliance</h2>
        <p className="text-slate-300 text-sm">
          EU-based banks face the strictest AI data governance requirements globally. Memory architecture must satisfy GDPR (2018), EU AI Act (2024), DORA (2025), EBA Guidelines on ML, MiFID II, and 5AMLD simultaneously.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card title="GDPR Requirements for Agent Memory" accent="red">
          {[
            ["Art. 5 — Data Minimisation", "Only extract & store memory relevant to lawful purpose. No blanket retention."],
            ["Art. 6 — Lawful Basis", "Each memory type needs a basis: consent, contract, legal obligation, legitimate interest."],
            ["Art. 17 — Right to Erasure", "Customer can request deletion of all their memory data. Must cascade to vector store + event log."],
            ["Art. 22 — Automated Decisions", "Episodic memory influencing credit/fraud decisions requires human review option + explanation."],
            ["Art. 25 — Privacy by Design", "PII redaction must happen BEFORE memory extraction, not after."],
            ["Art. 32 — Security", "CMK encryption, VPC isolation, PrivateLink — not optional for banking."],
          ].map(([art, desc]) => (
            <div key={art} className="border-b border-slate-800 py-2">
              <div className="text-red-400 font-mono text-xs font-bold">{art}</div>
              <div className="text-slate-400 text-xs">{desc}</div>
            </div>
          ))}
        </Card>

        <Card title="DORA & EBA ML Guidelines" accent="amber">
          {[
            ["DORA Art. 6 — ICT Risk", "AgentCore VPC + PrivateLink required. Memory access logged in CloudTrail."],
            ["DORA Art. 11 — Backup", "Memory Resource must have cross-region DR plan. Use S3 cross-region replication for event archive."],
            ["EBA ML Guidelines §4.3", "Model explainability: log WHY a memory influenced a decision (AgentCore Observability)."],
            ["EBA ML Guidelines §5.1", "Bias monitoring: episodic memory patterns audited for discriminatory outcomes quarterly."],
            ["MiFID II Art. 25", "Suitability memory (risk appetite, goals) retained 5 years minimum. Immutable."],
            ["5AMLD — AML", "KYC semantic memories retained 5 years. Encrypted. Accessible to compliance only."],
          ].map(([art, desc]) => (
            <div key={art} className="border-b border-slate-800 py-2">
              <div className="text-amber-400 font-mono text-xs font-bold">{art}</div>
              <div className="text-slate-400 text-xs">{desc}</div>
            </div>
          ))}
        </Card>
      </div>

      <Card title="EU Region Constraints — AgentCore Available Regions" accent="slate">
        <div className="grid grid-cols-3 gap-3 text-sm">
          {[
            { region: "eu-central-1", name: "Frankfurt", gdpr: "✅ Primary EU", note: "Recommended for German/EU HQ banks" },
            { region: "eu-west-1", name: "Ireland", gdpr: "✅ EU", note: "UK banks post-Brexit: UK region preferred" },
            { region: "eu-south-1", name: "Milan", note: "Check AgentCore availability — may need eu-central-1 fallback", gdpr: "⚠️ Verify" },
          ].map((r) => (
            <div key={r.region} className="bg-slate-800 rounded-lg p-3">
              <div className="font-mono text-blue-300 text-xs">{r.region}</div>
              <div className="text-white font-semibold text-sm">{r.name}</div>
              <div className="text-xs mt-1">{r.gdpr}</div>
              <div className="text-slate-400 text-xs mt-1">{r.note}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 p-3 bg-red-950/40 border border-red-800 rounded-lg text-xs text-red-300">
          ⚠️ Cross-region inference in AgentCore Memory is available but EU banks must ensure data stays within EEA. Disable cross-region inference or use Data Residency controls. Check AgentCore Memory cross-region inference settings before production deployment.
        </div>
      </Card>

      <Card title="EU Banking Memory Architecture — Required Controls" accent="emerald">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-emerald-400 font-semibold text-sm mb-2">Mandatory Technical Controls</h4>
            <ul className="text-slate-300 text-xs space-y-1">
              <li>✅ KMS CMK with EU key material only</li>
              <li>✅ VPC + PrivateLink for all AgentCore calls</li>
              <li>✅ PII redaction Lambda before memory write</li>
              <li>✅ RBAC: separate IAM roles per agent type</li>
              <li>✅ CloudTrail + S3 WORM archive (7 years)</li>
              <li>✅ Amazon Macie scan on event export</li>
              <li>✅ Right-to-erasure automated workflow</li>
              <li>✅ Session isolation — no cross-customer memory bleed</li>
            </ul>
          </div>
          <div>
            <h4 className="text-emerald-400 font-semibold text-sm mb-2">Mandatory Process Controls</h4>
            <ul className="text-slate-300 text-xs space-y-1">
              <li>✅ DPIA completed before memory goes live</li>
              <li>✅ Data processing agreement with AWS signed</li>
              <li>✅ Memory retention schedule documented</li>
              <li>✅ Quarterly bias audit on episodic patterns</li>
              <li>✅ Annual penetration test (memory attack surface)</li>
              <li>✅ Consent management integration (if applicable)</li>
              <li>✅ Subject Access Request (SAR) process defined</li>
              <li>✅ DPO sign-off before go-live</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-5">
      <Card title="AgentCore Policy — Natural Language → Cedar" accent="blue">
        <p className="text-slate-300 text-sm mb-4">
          Policy (preview Dec 2025) integrates with AgentCore Gateway to intercept every tool call in real time. Natural language policies auto-convert to Cedar (AWS open-source policy language). Millisecond enforcement without adding latency.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-white font-semibold text-sm mb-2">Memory-Specific Policies</h4>
            <CodeBlock>{`# Natural language → Cedar auto-conversion
"Block writing to memory namespaces 
 outside the agent's assigned scope"

"Prevent memory reads for customers 
 where the requesting agent's role 
 does not match the namespace ACL"

"Require PII redaction confirmation 
 metadata before any memory write event"

"Block episodic memory reads if the 
 customer has invoked their GDPR 
 right to be forgotten"`}</CodeBlock>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-2">Banking Policy Examples</h4>
            <CodeBlock>{`"Prevent credit agent from reading 
 fraud investigation memories unless
 escalation flag is set"

"Block memory extraction if session 
 has not completed MFA verification"

"Limit preference memory writes to 
 max 50 entries per customer to 
 prevent data bloat"

"Alert compliance team if AML entity 
 extracted to memory matches watchlist"`}</CodeBlock>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card title="Memory Attack Surface — AgentLeak Taxonomy" accent="red">
          <ul className="text-slate-300 text-xs space-y-2">
            {[
              ["F3: Memory Injection", "Attacker plants false memories via crafted user input that survives consolidation"],
              ["F3: Persistence Hijack", "Malicious content in events extracted as 'preference' and replayed in future sessions"],
              ["F3: Cross-session Leak", "actor_id collision enables reading another customer's memories"],
              ["F1: Prompt Override", "User prompt manipulates agent to dump memory contents verbatim"],
              ["F2: Tool Surface Attack", "Tool output poisoned to inject false entity into memory extraction"],
            ].map(([threat, desc]) => (
              <div key={threat} className="border-b border-slate-800 pb-2">
                <div className="text-red-400 font-semibold">{threat}</div>
                <div className="text-slate-500">{desc}</div>
              </div>
            ))}
          </ul>
        </Card>

        <Card title="Mitigations per Attack Vector" accent="emerald">
          <ul className="text-slate-300 text-xs space-y-2">
            {[
              ["Memory Injection", "Content validation Lambda before event write; LLM-based adversarial content detector"],
              ["Persistence Hijack", "AgentCore Guardrails on memory read output; output filtering before injection into prompt"],
              ["Cross-session Leak", "Strict actor_id = authenticated user sub (Cognito/OIDC); never derive from user input"],
              ["Prompt Override", "System prompt instructs agent never to output raw memories; Guardrails content filter"],
              ["Tool Surface", "Tool output sanitization hook; validate against expected schema before memory write"],
            ].map(([threat, desc]) => (
              <div key={threat} className="border-b border-slate-800 pb-2">
                <div className="text-emerald-400 font-semibold">{threat}</div>
                <div className="text-slate-500">{desc}</div>
              </div>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Encryption Architecture" accent="slate">
        <div className="grid grid-cols-3 gap-3 text-xs">
          {[
            { layer: "Events (Short-term)", key: "Customer-managed KMS (eu-central-1)", note: "Key rotation every 90 days" },
            { layer: "Memories (Long-term)", key: "Same CMK + encryption context", note: "Context = {customer_id, namespace}" },
            { layer: "Vector Embeddings", key: "AWS-managed (default) or CMK", note: "CMK required for EU banking" },
            { layer: "In-Transit", key: "TLS 1.3 minimum", note: "PrivateLink — no public internet" },
            { layer: "CloudWatch Logs", key: "CMK log group encryption", note: "Required for audit logs" },
            { layer: "S3 Archive", key: "SSE-KMS + Object Lock", note: "WORM for 7-year AML retention" },
          ].map((e) => (
            <div key={e.layer} className="bg-slate-800 rounded-lg p-3">
              <div className="text-blue-300 font-semibold mb-1">{e.layer}</div>
              <div className="text-emerald-400 mb-1">{e.key}</div>
              <div className="text-slate-500">{e.note}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function CostSection() {
  return (
    <div className="space-y-5">
      <Card title="AgentCore Memory Pricing Model" accent="blue">
        <p className="text-slate-300 text-sm mb-4">
          Consumption-based, no upfront cost. Pay per operation. Designed to reward efficient batch usage and penalise inefficient per-message API calls.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700">
                {["Component", "Pricing Dimension", "Cost Driver", "Optimisation"].map((h) => (
                  <th key={h} className="text-left text-slate-400 font-semibold pb-2 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Memory Resource", "Per resource/month", "Number of memory containers", "Consolidate to fewer resources"],
                ["Event Storage", "Per GB stored", "Raw conversation volume", "Set aggressive short-term retention"],
                ["Memory Storage", "Per GB stored", "Extracted memory volume", "TTL on stale preferences"],
                ["Consolidation", "Per extraction run", "Frequency × sessions", "Batch: post-session, not real-time"],
                ["Retrieval API", "Per 1K requests", "Number of memory lookups", "Cache retrieved context in session"],
                ["KMS CMK calls", "Per API call ($0.03/10K)", "Encrypt/decrypt per event", "Use envelope encryption"],
              ].map(([comp, dim, driver, opt], i) => (
                <tr key={i} className="border-b border-slate-800">
                  <td className="py-2 pr-4 text-white">{comp}</td>
                  <td className="pr-4 text-blue-300">{dim}</td>
                  <td className="pr-4 text-amber-300">{driver}</td>
                  <td className="text-emerald-300">{opt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card title="Cost Anti-Patterns" accent="red">
          <ul className="text-slate-300 text-xs space-y-2">
            <li>❌ <strong>Per-message memory writes:</strong> batch_size=1 means an API call per message. Use batch_size=10+</li>
            <li>❌ <strong>Retain-all strategy:</strong> 365-day retention on high-volume chat agents = massive storage bill</li>
            <li>❌ <strong>Real-time consolidation:</strong> consolidation per message instead of per session end</li>
            <li>❌ <strong>No retrieval caching:</strong> fetching user preferences on every agent turn</li>
            <li>❌ <strong>CMK every event:</strong> individual KMS calls per event — use envelope encryption</li>
            <li>❌ <strong>Excessive strategies:</strong> enabling all 4 strategies on low-volume agents</li>
          </ul>
        </Card>
        <Card title="Cost Optimisation Patterns" accent="emerald">
          <ul className="text-slate-300 text-xs space-y-2">
            <li>✅ <strong>batch_size=10:</strong> buffer messages, single API call per batch</li>
            <li>✅ <strong>Strategy selection:</strong> only enable strategies needed per use case</li>
            <li>✅ <strong>Tiered retention:</strong> 30 days short-term, 1 year long-term (not 365/365)</li>
            <li>✅ <strong>Session-end consolidation:</strong> trigger extraction Lambda on session close event</li>
            <li>✅ <strong>Memory retrieval cache:</strong> cache retrieved context in Lambda MemoryDB for 15 mins</li>
            <li>✅ <strong>Prompt caching:</strong> BedrockModel CacheConfig(strategy="auto") reduces input tokens 30-70%</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function JourneySection() {
  const phases = [
    {
      phase: "Phase 1",
      name: "Memory-Enabled PoC",
      duration: "Weeks 1-4",
      color: "blue",
      steps: [
        "Stand up AgentCore project (agentcore create)",
        "Create Memory Resource with SUMMARIZATION strategy only",
        "Implement Strands AfterInvocationEvent hook (save) + MessageAddedEvent hook (retrieve)",
        "Single-session memory with 30-day retention",
        "No PII in PoC data — use synthetic data only",
        "Deploy to AgentCore Runtime in eu-central-1",
        "Validate memory retrieval latency < 200ms p99",
      ],
      milestone: "Agent remembers context across turns in same session",
    },
    {
      phase: "Phase 2",
      name: "Cross-Session + Long-Term",
      duration: "Weeks 5-8",
      color: "purple",
      steps: [
        "Add USER_PREFERENCE strategy to memory resource",
        "Implement actor_id = authenticated Cognito sub (never user-provided)",
        "Build PII redaction Lambda (Comprehend-based)",
        "Wire PII redactor as pre-write hook",
        "Enable cross-session memory: same actor_id across sessions",
        "Implement basic right-to-erasure: delete_memory_namespace(actor_id)",
        "Add GDPR consent check before memory write",
      ],
      milestone: "Agent recalls user preferences across days/weeks",
    },
    {
      phase: "Phase 3",
      name: "Multi-Agent Memory",
      duration: "Weeks 9-12",
      color: "amber",
      steps: [
        "Design namespace hierarchy for multi-agent access",
        "Implement IAM roles: writer agents vs reader agents",
        "Add self-managed strategy with entity extractor Lambda",
        "Orchestrator agent consolidates sub-agent outputs",
        "AgentCore Policy: namespace access control rules",
        "Add CloudTrail audit logging for all memory API calls",
        "Performance test: 100 concurrent agents, shared memory resource",
      ],
      milestone: "Multi-agent workflow with governed shared memory",
    },
    {
      phase: "Phase 4",
      name: "Episodic + Production Hardening",
      duration: "Weeks 13-16",
      color: "emerald",
      steps: [
        "Enable episodic memory on high-value agent workflows",
        "DPIA review with DPO — sign off on all memory types",
        "CMK encryption with key rotation on 90-day schedule",
        "VPC + PrivateLink for all AgentCore endpoints",
        "S3 WORM archive for AML-retention events",
        "AgentCore Evaluations: memory quality metrics",
        "Load test + penetration test (memory attack surface)",
        "Runbook: SAR handling, right-to-erasure SLA",
      ],
      milestone: "Production-ready EU banking memory architecture",
    },
  ];

  return (
    <div className="space-y-4">
      {phases.map((p) => (
        <Card key={p.phase} accent={p.color}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-xs font-mono text-slate-500">{p.phase} · {p.duration}</span>
              <h3 className="text-white font-bold text-lg">{p.name}</h3>
            </div>
            <Badge type="success">{p.milestone}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {p.steps.map((step, i) => (
              <div key={i} className="flex gap-2 text-xs text-slate-300">
                <span className="text-slate-600 flex-shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function StrandsSection() {
  const [active, setActive] = useState("hooks");
  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">
        {[
          { id: "hooks", label: "Mandatory Hooks" },
          { id: "skills", label: "Sub-Agent Skills" },
          { id: "rules", label: "Rules / Guardrails" },
          { id: "repo", label: "Repo Structure" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              active === tab.id ? "bg-amber-700 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "hooks" && (
        <div className="space-y-4">
          <Card title="Mandatory Strands Hooks for Memory" accent="amber">
            <p className="text-slate-300 text-sm mb-4">These hooks MUST be in every agent that uses AgentCore Memory. They are non-negotiable in the repo template.</p>
          </Card>
          <div className="space-y-3">
            {[
              {
                name: "PIIRedactionHook",
                event: "MessageAddedEvent (before write)",
                code: `class PIIRedactionHook:
    """MANDATORY: Redact PII before any memory event is written.
    EU Banking: Required by GDPR Art. 25 (Privacy by Design)
    """
    def __init__(self, redactor: PIIRedactor):
        self.redactor = redactor

    def on_message_added(self, event: MessageAddedEvent):
        # Intercept before flush to AgentCore Memory
        if event.message.role in ("user", "assistant"):
            event.message.content = self.redactor.redact(
                event.message.content
            )
        return event  # Modified event continues to memory`,
              },
              {
                name: "MemoryRetrievalHook",
                event: "MessageAddedEvent (on user message)",
                code: `class MemoryRetrievalHook:
    """MANDATORY: Inject relevant memories into agent context.
    Runs BEFORE model sees user message (RAG pattern).
    """
    def __init__(self, memory_client, memory_id, actor_id):
        self.memory = memory_client
        self.memory_id = memory_id
        self.actor_id = actor_id

    def on_message_added(self, event: MessageAddedEvent):
        if event.message.role == "user":
            memories = self.memory.retrieve_memories(
                memory_id=self.memory_id,
                namespace=f"users/{self.actor_id}",
                search_query=event.message.content,
                max_results=5
            )
            # Prepend to system context
            event.agent.system_prompt = (
                self._format_memories(memories) +
                "\\n\\n" + event.agent.system_prompt
            )`,
              },
              {
                name: "MemoryPersistenceHook",
                event: "AfterInvocationEvent",
                code: `class MemoryPersistenceHook:
    """MANDATORY: Save interaction to memory after each turn.
    Triggers async consolidation job on session complete.
    """
    def __init__(self, session_manager, checkpoint_client=None):
        self.session = session_manager
        self.checkpoint = checkpoint_client

    def after_invocation(self, event: AfterInvocationEvent):
        # Session manager handles buffered flush
        self.session.flush_if_threshold_reached()
        
        # Optional: checkpoint after high-value tool calls
        if self.checkpoint and event.had_tool_calls:
            self.checkpoint.save(
                event.session_id, event.tool_results
            )`,
              },
              {
                name: "ConsentCheckHook",
                event: "StartAgentCycleEvent",
                code: `class ConsentCheckHook:
    """MANDATORY for EU Banking: Verify memory consent before read/write.
    GDPR Art. 6: Lawful basis must exist before processing.
    """
    def __init__(self, consent_service):
        self.consent = consent_service

    def on_start_agent_cycle(self, event: StartAgentCycleEvent):
        actor_id = event.context.get("actor_id")
        if not self.consent.has_valid_basis(actor_id, "memory"):
            # Disable memory hooks for this cycle
            event.context["memory_enabled"] = False
            # Log for audit
            logger.warning(f"Memory disabled: no consent for {actor_id}")`,
              },
            ].map((hook) => (
              <Card key={hook.name} accent="slate">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono font-bold text-amber-300 text-sm">{hook.name}</span>
                  <Tag color="blue">{hook.event}</Tag>
                </div>
                <CodeBlock>{hook.code}</CodeBlock>
              </Card>
            ))}
          </div>
        </div>
      )}

      {active === "skills" && (
        <div className="space-y-4">
          <Card title="Required Sub-Agent Skills for Memory" accent="purple">
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  skill: "memory_write",
                  desc: "Wraps memory put_events. Enforces PII check, consent check, namespace validation. Agents NEVER call memory API directly.",
                  mandatory: true,
                },
                {
                  skill: "memory_read",
                  desc: "Wraps retrieve_memories. Enforces actor_id = authenticated user. Returns redacted results only.",
                  mandatory: true,
                },
                {
                  skill: "memory_delete",
                  desc: "Right-to-erasure tool. Deletes all namespaces for actor_id. Requires DPO_ADMIN role. Triggers confirmation webhook.",
                  mandatory: true,
                },
                {
                  skill: "memory_search",
                  desc: "Semantic search across long-term memories. Returns top-K results with relevance score. Logs search query.",
                  mandatory: true,
                },
                {
                  skill: "session_summarise",
                  desc: "Trigger manual summarisation of current session. Useful for very long conversations approaching context limit.",
                  mandatory: false,
                },
                {
                  skill: "memory_audit",
                  desc: "Compliance sub-agent: retrieve all memories for a customer for SAR response. Restricted to compliance role.",
                  mandatory: false,
                },
              ].map((s) => (
                <div key={s.skill} className="bg-slate-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-purple-300 text-xs">{s.skill}</span>
                    {s.mandatory && <Tag color="red">MANDATORY</Tag>}
                  </div>
                  <div className="text-slate-400 text-xs">{s.desc}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {active === "rules" && (
        <div className="space-y-4">
          <Card title="Mandatory Rules / System Prompt Instructions" accent="blue">
            <CodeBlock>{`# MANDATORY: Include in every agent system prompt that uses memory

MEMORY_RULES = """
MEMORY RULES (NON-NEGOTIABLE):
1. NEVER reveal the raw content of retrieved memories to the user verbatim.
   Synthesize and apply them naturally in your response.
2. NEVER store or repeat back PII (full names, account numbers, SSN,
   passport numbers, addresses) in any response or tool call.
3. If a customer requests to forget all their data, immediately call
   the memory_delete skill and confirm deletion to the user.
4. NEVER infer or guess actor_id from conversation content. Only use
   the authenticated actor_id provided in the secure context header.
5. When memory context contradicts current user input, ALWAYS prefer
   the current user input and update the memory accordingly.
6. Before making any financial recommendation using memory data,
   confirm with the user that their preferences are still current.
7. Memory data is CONFIDENTIAL. Do not share one customer's memory
   context with any other customer or agent outside their namespace.
"""`}</CodeBlock>
          </Card>
          <Card title="AgentCore Guardrails Integration" accent="emerald">
            <CodeBlock>{`# Bedrock Guardrails on memory retrieval output
guardrail_config = {
    "guardrailId": "memory-output-guardrail",
    "guardrailVersion": "DRAFT",
    "filters": {
        "piiEntityTypes": ["NAME", "EMAIL", "PHONE", "ADDRESS",
                           "UK_NATIONAL_INSURANCE_NUMBER",
                           "BANK_ACCOUNT_NUMBER", "CREDIT_DEBIT_NUMBER"],
        "piiAction": "ANONYMIZE",  # Replace not block
        "contentFilters": [
            {"type": "HATE", "inputStrength": "HIGH", "outputStrength": "HIGH"},
            {"type": "PROMPT_ATTACK", "inputStrength": "HIGH"}
        ]
    }
}

# Apply to memory retrieval output BEFORE injecting into prompt
def safe_retrieve_memories(memory_client, **kwargs):
    raw_memories = memory_client.retrieve_memories(**kwargs)
    # Pass through guardrails
    return apply_guardrails(raw_memories, guardrail_config)`}</CodeBlock>
          </Card>
        </div>
      )}

      {active === "repo" && (
        <Card title="Required Repository Structure" accent="slate">
          <CodeBlock>{`your-agent-repo/
├── .agentcore/                    # AgentCore CLI config
│   └── config.json
│
├── agent/
│   ├── main.py                    # Agent entry point
│   ├── hooks/                     # MANDATORY hooks directory
│   │   ├── __init__.py
│   │   ├── pii_redaction_hook.py  # MANDATORY
│   │   ├── memory_retrieval_hook.py # MANDATORY
│   │   ├── memory_persistence_hook.py # MANDATORY
│   │   └── consent_check_hook.py  # MANDATORY (EU banking)
│   │
│   ├── skills/                    # Sub-agent tools
│   │   ├── memory_write.py        # MANDATORY
│   │   ├── memory_read.py         # MANDATORY
│   │   ├── memory_delete.py       # MANDATORY
│   │   └── memory_search.py       # MANDATORY
│   │
│   ├── processors/
│   │   ├── pii_redactor.py        # Comprehend + custom patterns
│   │   ├── entity_extractor.py    # Domain entity extraction
│   │   └── summarizer.py          # Long context compaction
│   │
│   └── config/
│       ├── memory_config.py       # Retention, strategies per env
│       └── consent_config.py      # GDPR lawful basis mapping
│
├── infrastructure/
│   ├── terraform/                 # See Terraform section
│   └── policies/
│       ├── memory_iam_policy.json
│       └── agentcore_policy.cedar # Natural lang → Cedar policies
│
├── tests/
│   ├── test_hooks.py              # Hook unit tests
│   ├── test_pii_redaction.py      # PII detection coverage tests
│   ├── test_memory_isolation.py   # Cross-tenant isolation tests
│   └── test_right_to_erasure.py   # GDPR compliance tests
│
├── .github/workflows/
│   ├── ci.yml                     # Test + lint
│   └── compliance-check.yml       # PII scanner, policy validator
│
└── docs/
    ├── MEMORY_ARCHITECTURE.md
    ├── GDPR_DPIA.md               # Required for EU banking
    └── RUNBOOK_SAR.md             # Subject Access Request runbook`}</CodeBlock>
        </Card>
      )}
    </div>
  );
}

function TerraformSection() {
  const [active, setActive] = useState("resource");
  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">
        {[
          { id: "resource", label: "Memory Resource" },
          { id: "iam", label: "IAM Roles" },
          { id: "kms", label: "KMS + Encryption" },
          { id: "vpc", label: "VPC + PrivateLink" },
          { id: "pipeline", label: "Processing Pipeline" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              active === tab.id ? "bg-emerald-700 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "resource" && (
        <CodeBlock>{`# infrastructure/terraform/memory_resource.tf
# EU Banking grade AgentCore Memory Resource

resource "aws_bedrockagentcore_memory" "banking_memory" {
  name        = "\${var.project}-\${var.environment}-memory"
  description = "EU Banking agent memory — GDPR compliant"

  # Retention: raw conversation events
  event_expiry_duration = var.event_retention_days  # e.g., 30 for most, 90 for loans

  # KMS encryption — EU CMK required for banking
  encryption_key_arn = aws_kms_key.memory_cmk.arn

  # Long-term extraction strategies (configure per use case)
  memory_strategies {
    summarization_memory_strategy {
      name        = "ConversationSummary"
      description = "Condenses session history"
    }
  }

  # Add only for relationship banking agents:
  # memory_strategies {
  #   user_preference_memory_strategy {
  #     name = "UserPreferences"
  #   }
  # }
  # memory_strategies {
  #   semantic_memory_strategy {
  #     name = "CustomerFacts"
  #   }
  # }

  tags = {
    Environment    = var.environment
    DataClass      = "RESTRICTED"
    GDPRScope      = "true"
    RetentionOwner = "DPO"
    CostCentre     = var.cost_centre
  }
}

output "memory_id" {
  value     = aws_bedrockagentcore_memory.banking_memory.id
  sensitive = false  # ID itself is not sensitive
}

# Separate resource for AML/compliance agents — longer retention
resource "aws_bedrockagentcore_memory" "compliance_memory" {
  name                  = "\${var.project}-compliance-memory"
  event_expiry_duration = 2555  # 7 years — AML directive
  encryption_key_arn    = aws_kms_key.memory_cmk.arn
  
  memory_strategies {
    semantic_memory_strategy {
      name = "KYCEntities"
    }
  }
}`}</CodeBlock>
      )}

      {active === "iam" && (
        <CodeBlock>{`# infrastructure/terraform/iam_memory.tf
# Least-privilege IAM for memory access patterns

# 1. Writer agent role — can write events, cannot delete
resource "aws_iam_role" "agent_writer" {
  name = "\${var.project}-agent-writer-role"
  assume_role_policy = data.aws_iam_policy_document.agentcore_trust.json
}

resource "aws_iam_policy" "memory_writer" {
  name = "AgentCoreMemoryWriter"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "bedrock-agentcore:PutMemoryEvents",
          "bedrock-agentcore:CreateMemoryEvent"
        ]
        Resource = aws_bedrockagentcore_memory.banking_memory.arn
        Condition = {
          StringLike = {
            "bedrock-agentcore:namespace" = "users/*"
          }
        }
      }
    ]
  })
}

# 2. Reader agent role — can retrieve, cannot write
resource "aws_iam_policy" "memory_reader" {
  name = "AgentCoreMemoryReader"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "bedrock-agentcore:GetMemory",
          "bedrock-agentcore:RetrieveMemory",
          "bedrock-agentcore:ListMemoryEvents"
        ]
        Resource = aws_bedrockagentcore_memory.banking_memory.arn
        # Namespace-scoped: only read assigned namespace
        Condition = {
          StringLike = {
            "bedrock-agentcore:namespace" = "kyc/*"
          }
        }
      }
    ]
  })
}

# 3. DPO admin role — can delete (right-to-erasure)
resource "aws_iam_policy" "memory_admin" {
  name = "AgentCoreMemoryAdmin-DPO"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["bedrock-agentcore:DeleteMemory",
                    "bedrock-agentcore:DeleteMemoryNamespace"]
        Resource = "*"
        Condition = {
          StringEquals = {
            "aws:RequestedRegion" = ["eu-central-1", "eu-west-1"]
          }
        }
      }
    ]
  })
}`}</CodeBlock>
      )}

      {active === "kms" && (
        <CodeBlock>{`# infrastructure/terraform/kms_memory.tf
# Customer-managed KMS for EU banking — REQUIRED

resource "aws_kms_key" "memory_cmk" {
  description              = "AgentCore Memory CMK — EU Banking"
  deletion_window_in_days  = 30       # Max window for recovery
  enable_key_rotation      = true     # Auto-rotate every 90 days
  multi_region             = false    # Single EU region key (GDPR)
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "EnableIAMRoot"
        Effect = "Allow"
        Principal = { AWS = "arn:aws:iam::\${data.aws_caller_identity.current.account_id}:root" }
        Action   = "kms:*"
        Resource = "*"
      },
      {
        Sid    = "AgentCoreMemoryAccess"
        Effect = "Allow"
        Principal = {
          Service = "bedrock-agentcore.amazonaws.com"
        }
        Action = [
          "kms:GenerateDataKey",
          "kms:Decrypt",
          "kms:DescribeKey"
        ]
        Resource = "*"
        Condition = {
          StringEquals = {
            "kms:CallerAccount"  = data.aws_caller_identity.current.account_id
            "aws:SourceAccount"  = data.aws_caller_identity.current.account_id
          }
          StringLike = {
            "kms:ViaService" = "bedrock-agentcore.eu-central-1.amazonaws.com"
          }
        }
      },
      {
        Sid    = "DenyNonEURegions"
        Effect = "Deny"
        Principal = "*"
        Action   = "kms:*"
        Resource = "*"
        Condition = {
          StringNotEquals = {
            "aws:RequestedRegion" = ["eu-central-1", "eu-west-1"]
          }
        }
      }
    ]
  })

  tags = {
    GDPRScope   = "true"
    DataClass   = "RESTRICTED"
    KeyPurpose  = "AgentCoreMemoryEncryption"
  }
}

resource "aws_kms_alias" "memory_cmk_alias" {
  name          = "alias/\${var.project}-memory-cmk"
  target_key_id = aws_kms_key.memory_cmk.key_id
}`}</CodeBlock>
      )}

      {active === "vpc" && (
        <CodeBlock>{`# infrastructure/terraform/vpc_privatelink.tf
# VPC isolation for AgentCore — EU banking mandatory

resource "aws_vpc_endpoint" "agentcore_memory" {
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.eu-central-1.bedrock-agentcore-memory"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = aws_subnet.private[*].id
  security_group_ids  = [aws_security_group.agentcore_endpoint.id]
  private_dns_enabled = true

  policy = jsonencode({
    Statement = [{
      Effect    = "Allow"
      Principal = { AWS = [aws_iam_role.agent_writer.arn,
                           aws_iam_role.agent_reader.arn] }
      Action    = ["bedrock-agentcore:*"]
      Resource  = aws_bedrockagentcore_memory.banking_memory.arn
    }]
  })

  tags = { Name = "\${var.project}-agentcore-memory-vpce" }
}

resource "aws_vpc_endpoint" "agentcore_runtime" {
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.eu-central-1.bedrock-agentcore"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = aws_subnet.private[*].id
  security_group_ids  = [aws_security_group.agentcore_endpoint.id]
  private_dns_enabled = true
  tags = { Name = "\${var.project}-agentcore-runtime-vpce" }
}

resource "aws_security_group" "agentcore_endpoint" {
  name   = "\${var.project}-agentcore-endpoint-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main.cidr_block]
    description = "HTTPS from within VPC only"
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`}</CodeBlock>
      )}

      {active === "pipeline" && (
        <CodeBlock>{`# infrastructure/terraform/processing_pipeline.tf
# PII redaction + entity extraction Lambda pipeline

resource "aws_lambda_function" "pii_redactor" {
  function_name = "\${var.project}-pii-redactor"
  runtime       = "python3.12"
  handler       = "pii_redactor.lambda_handler"
  role          = aws_iam_role.pii_lambda.arn
  filename      = data.archive_file.pii_redactor.output_path
  timeout       = 30
  memory_size   = 512

  environment {
    variables = {
      PII_ENTITY_TYPES = "NAME,ADDRESS,EMAIL,PHONE,BANK_ACCOUNT_NUMBER,CREDIT_DEBIT_NUMBER,UK_NATIONAL_INSURANCE_NUMBER"
      REDACTION_CHAR   = "[REDACTED]"
    }
  }

  vpc_config {
    subnet_ids         = aws_subnet.private[*].id
    security_group_ids = [aws_security_group.lambda.id]
  }

  tags = { GDPRScope = "true", DataClass = "RESTRICTED" }
}

resource "aws_lambda_function" "entity_extractor" {
  function_name = "\${var.project}-entity-extractor"
  runtime       = "python3.12"
  handler       = "entity_extractor.lambda_handler"
  role          = aws_iam_role.extractor_lambda.arn
  filename      = data.archive_file.entity_extractor.output_path
  timeout       = 60
  memory_size   = 1024

  environment {
    variables = {
      BEDROCK_MODEL_ID = "us.anthropic.claude-haiku-4-5-20251001"
      MEMORY_ID        = aws_bedrockagentcore_memory.banking_memory.id
      REGION           = var.aws_region
    }
  }
  vpc_config {
    subnet_ids         = aws_subnet.private[*].id
    security_group_ids = [aws_security_group.lambda.id]
  }
}

# Event bridge rule: trigger consolidation after session end
resource "aws_cloudwatch_event_rule" "session_end" {
  name        = "\${var.project}-session-end-consolidation"
  description = "Trigger memory consolidation after agent session ends"
  event_pattern = jsonencode({
    source      = ["bedrock-agentcore"]
    detail-type = ["AgentCore Session Ended"]
    detail = { memory_id = [aws_bedrockagentcore_memory.banking_memory.id] }
  })
}

resource "aws_cloudwatch_event_target" "consolidation_lambda" {
  rule      = aws_cloudwatch_event_rule.session_end.name
  target_id = "ConsolidationLambda"
  arn       = aws_lambda_function.entity_extractor.arn
}`}</CodeBlock>
      )}
    </div>
  );
}

function EvaluationSection() {
  return (
    <div className="space-y-5">
      <Card title="AgentCore Evaluations — Memory-Specific Metrics" accent="blue">
        <p className="text-slate-300 text-sm mb-4">
          AgentCore Evaluations (preview, Dec 2025) provides 13 built-in evaluators + custom model-based scoring. For memory quality, add these specific evaluators.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { metric: "Memory Retrieval Relevance", desc: "Is retrieved memory semantically relevant to the current query?", target: "> 0.85 cosine similarity" },
            { metric: "PII Leakage Rate", desc: "% of memory reads that contain unredacted PII in output", target: "0.00% — zero tolerance" },
            { metric: "Cross-Session Recall", desc: "Does agent correctly recall preferences from prior session?", target: "> 90% on test set" },
            { metric: "Memory Staleness", desc: "% of retrieved memories older than TTL threshold", target: "< 5% stale memories" },
            { metric: "Namespace Isolation", desc: "Attempts to read outside assigned namespace blocked", target: "100% blocked" },
            { metric: "Preference Accuracy", desc: "Do extracted preferences match what user actually stated?", target: "> 85% precision" },
            { metric: "Erasure Completeness", desc: "After right-to-erasure, 0 memories retrievable for actor_id", target: "100% — verified" },
            { metric: "Episodic Bias Score", desc: "Fairness audit on episodic patterns across demographic groups", target: "Δ < 5% across groups" },
            { metric: "Memory Latency p99", desc: "End-to-end time: retrieve + inject + model response", target: "< 500ms p99" },
          ].map((m) => (
            <div key={m.metric} className="bg-slate-800 rounded-lg p-3">
              <div className="text-white font-semibold text-xs mb-1">{m.metric}</div>
              <div className="text-slate-400 text-xs mb-2">{m.desc}</div>
              <div className="text-emerald-400 text-xs font-mono">{m.target}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Continuous Evaluation Loop" accent="slate">
        <div className="flex items-center gap-2 text-xs flex-wrap mb-3">
          {["Deploy", "→", "CloudWatch Dashboard", "→", "AgentCore Evaluations", "→", "Metric Breach", "→", "Alert DPO/Eng", "→", "Remediate", "→", "Re-evaluate"].map((s, i) => (
            <span key={i} className={s === "→" ? "text-slate-600" : "bg-slate-700 px-2 py-1 rounded text-slate-200"}>
              {s}
            </span>
          ))}
        </div>
        <CodeBlock>{`# Custom evaluator: PII leakage detection
custom_evaluator = {
    "name": "MemoryPIILeakage",
    "modelId": "us.anthropic.claude-haiku-4-5-20251001",
    "prompt": """You are a PII auditor. Given the agent's response below,
    check if it contains any personally identifiable information
    (names, account numbers, addresses, phone numbers, NI numbers).
    Respond with JSON: {"pii_detected": true|false, "pii_types": [...]}
    
    Agent response: {output}""",
    "scale": {"type": "BINARY", "labels": ["NO_PII", "PII_DETECTED"]},
    "computeOn": "FULL_SESSION"
}

# Trigger: run on 10% sample of production sessions daily
evaluation_schedule = {
    "frequency": "DAILY",
    "sample_rate": 0.10,
    "alert_threshold": {"MemoryPIILeakage": "PII_DETECTED > 0"}
}`}</CodeBlock>
      </Card>
    </div>
  );
}

function RisksSection() {
  const risks = [
    {
      category: "GDPR / Legal",
      items: [
        { risk: "Unlawful memory retention", severity: "CRITICAL", mitigation: "Enforce retention TTL via Terraform. Automated deletion job on schedule.", rec: "Day 1 implementation" },
        { risk: "Missing right-to-erasure", severity: "CRITICAL", mitigation: "memory_delete skill + runbook. Test quarterly with SAR drills.", rec: "Mandatory before go-live" },
        { risk: "Cross-border data flow", severity: "HIGH", mitigation: "Disable cross-region inference. eu-central-1 only for EU customers.", rec: "DPO validation required" },
        { risk: "GDPR Art. 22 — automated decisions", severity: "HIGH", mitigation: "Episodic memory affecting credit/fraud must have human review path.", rec: "Phase 4 gate" },
      ],
    },
    {
      category: "Security",
      items: [
        { risk: "Memory injection attack", severity: "HIGH", mitigation: "Input validation hook + adversarial content detector before write.", rec: "Mandatory hook" },
        { risk: "Cross-tenant namespace leak", severity: "CRITICAL", mitigation: "actor_id = Cognito sub only. Never user-provided. IAM namespace condition.", rec: "Zero exceptions" },
        { risk: "PII in vector store", severity: "HIGH", mitigation: "PII redaction Lambda BEFORE consolidation. Macie scan weekly.", rec: "Mandatory hook" },
        { risk: "Stale credentials in memory", severity: "MEDIUM", mitigation: "Memory rules: never store tokens/passwords. Guardrails content filter.", rec: "System prompt rule" },
      ],
    },
    {
      category: "Operational",
      items: [
        { risk: "Memory bloat / cost overrun", severity: "MEDIUM", mitigation: "TTL policies, batch_size=10, strategy selection per use case.", rec: "Review monthly" },
        { risk: "Consolidation job failure", severity: "MEDIUM", mitigation: "DLQ on Lambda. Alert if consolidation not run within 4h of session end.", rec: "CloudWatch alarm" },
        { risk: "Context window overflow", severity: "MEDIUM", mitigation: "Strands context compaction + SUMMARIZATION strategy.", rec: "Phase 1 test" },
        { risk: "Episodic bias drift", severity: "HIGH", mitigation: "Quarterly fairness audit on episodic patterns. EBA guideline alignment.", rec: "Quarterly review" },
      ],
    },
  ];

  const sevColor = { CRITICAL: "red", HIGH: "amber", MEDIUM: "blue" };

  return (
    <div className="space-y-5">
      {risks.map((cat) => (
        <Card key={cat.category} title={cat.category + " Risks"} accent="slate">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700">
                  {["Risk", "Severity", "Mitigation", "Recommendation"].map((h) => (
                    <th key={h} className="text-left text-slate-400 font-semibold pb-2 pr-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cat.items.map((item, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    <td className="py-2 pr-3 text-white">{item.risk}</td>
                    <td className="pr-3"><Tag color={sevColor[item.severity] || "slate"}>{item.severity}</Tag></td>
                    <td className="pr-3 text-slate-400">{item.mitigation}</td>
                    <td className="text-emerald-400">{item.rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}

      <Card title="When to Use Which Memory Pattern — Decision Guide" accent="emerald">
        <div className="grid grid-cols-2 gap-4 text-xs">
          {[
            { pattern: "Short-term only", when: "Simple FAQ chatbot, one-off transaction, no repeat users", avoid: "Regulated financial advice, relationship banking" },
            { pattern: "Short + Summarization", when: "Long advisory sessions, complex troubleshooting, 1h+ conversations", avoid: "High-frequency trading bots (latency sensitive)" },
            { pattern: "Short + User Preference", when: "Retail banking app, personalization, known repeat customers", avoid: "Anonymous interactions, one-time users" },
            { pattern: "Short + Semantic", when: "KYC agent, compliance Q&A, product knowledge base", avoid: "Simple conversations with no entity extraction need" },
            { pattern: "All strategies", when: "Relationship banker AI, wealth management, full-service banking agent", avoid: "Cost-sensitive workloads, simple bots" },
            { pattern: "Episodic", when: "Learning agents, pattern recognition, process improvement over time", avoid: "Regulated credit decisions without fairness audit complete" },
            { pattern: "Self-managed strategy", when: "Custom PII requirements, domain-specific extraction, full compliance control", avoid: "Teams without ML/Lambda expertise" },
            { pattern: "Multi-write (Hub & Spoke)", when: "Complex multi-agent orchestration, coordinated workflows", avoid: "Simple single-agent scenarios (over-engineered)" },
          ].map((p) => (
            <div key={p.pattern} className="bg-slate-800 rounded-lg p-3">
              <div className="text-amber-300 font-bold mb-1">{p.pattern}</div>
              <div className="text-emerald-400 mb-1"><span className="text-slate-500">✅ Use: </span>{p.when}</div>
              <div className="text-red-400"><span className="text-slate-500">❌ Avoid: </span>{p.avoid}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("overview");

  const renderSection = () => {
    switch (active) {
      case "overview": return <OverviewSection />;
      case "memory-types": return <MemoryTypesSection />;
      case "patterns": return <PatternsSection />;
      case "processors": return <ProcessorsSection />;
      case "banking": return <BankingSection />;
      case "security": return <SecuritySection />;
      case "cost": return <CostSection />;
      case "journey": return <JourneySection />;
      case "strands": return <StrandsSection />;
      case "terraform": return <TerraformSection />;
      case "evaluation": return <EvaluationSection />;
      case "risks": return <RisksSection />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}>
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <div>
            <div className="text-white font-bold text-sm">AgentCore Memory — Complete Architecture Guide</div>
            <div className="text-slate-500 text-xs">Strands · AgentCore Runtime · EU Banking · GDPR · Terraform</div>
          </div>
          <div className="ml-auto flex gap-1 flex-wrap">
            <Tag color="green">GA Oct 2025</Tag>
            <Tag color="blue">Strands</Tag>
            <Tag color="purple">EU Banking</Tag>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4">
        {/* Sidebar */}
        <div className="w-44 flex-shrink-0">
          <div className="sticky top-20 space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  active === s.id
                    ? "bg-blue-900 text-blue-200 border border-blue-700"
                    : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
