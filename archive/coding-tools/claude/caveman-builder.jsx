import { useState, useEffect, useRef } from "react";

const COMPRESSION_RULES = {
  articles: { pattern: /\b(a|an|the)\s+/gi, label: "Articles", example: "the function → function" },
  filler: { pattern: /\b(just|really|basically|actually|simply|literally|quite|very|pretty|rather|somewhat|fairly)\s*/gi, label: "Filler words", example: "just fix it → fix it" },
  pleasantries: { pattern: /\b(sure|certainly|of course|absolutely|happy to|great question|i'd be happy|i'll|let me|i need to|i will|i can|i'll go ahead and)\s*/gi, label: "Pleasantries", example: "Sure, I'll fix that → fix that" },
  hedging: { pattern: /\b(likely|probably|perhaps|maybe|it seems|it appears|i think|i believe|you might want to)\s*/gi, label: "Hedging", example: "probably broken → broken" },
  verbose_intros: { pattern: /(let me|i'll|i need to|i will|i am going to|i'm going to|let's|we need to)\s+(start|begin|first|now|go ahead and)?\s*/gi, label: "Verbose intros", example: "Let me explain → explain" },
  redundant: { pattern: /\b(in order to|make sure to|the reason is because|at this point in time|due to the fact that|in the event that|for the purpose of)\b/gi, label: "Redundant phrases", example: "in order to → to" },
  connectives: { pattern: /\b(however|furthermore|additionally|in addition|moreover|therefore|consequently|as a result|it is worth noting that)\b,?\s*/gi, label: "Connective fluff", example: "however, → (removed)" },
  verbose_verbs: { pattern: /\b(implement a solution for|perform an operation on|make an attempt to|in the process of)\b/gi, label: "Verbose verbs", example: "implement a solution for → fix" },
};

const INTENSITY_CONFIGS = {
  lite: { rules: ["articles", "pleasantries"], synonyms: false, fragments: false, label: "Lite", color: "#4ade80", desc: "Light touch. Removes pleasantries only." },
  full: { rules: ["articles", "filler", "pleasantries", "hedging", "verbose_intros", "redundant", "connectives"], synonyms: true, fragments: true, label: "Full", color: "#f59e0b", desc: "Default. Telegraphic fragments, short synonyms." },
  ultra: { rules: Object.keys(COMPRESSION_RULES), synonyms: true, fragments: true, abbreviate: true, label: "Ultra", color: "#ef4444", desc: "Extreme. Abbreviates prose words, one word when one word enough." },
};

const SYNONYM_MAP = {
  "extensive": "big", "implement a solution for": "fix", "implement": "add", "utilize": "use",
  "accomplish": "do", "commence": "start", "terminate": "end", "demonstrate": "show",
  "assistance": "help", "additional": "more", "provide": "give", "retrieve": "get",
  "component": "comp", "function": "fn", "error": "err", "response": "res",
  "request": "req", "database": "DB", "configuration": "config", "authentication": "auth",
};

const DEMO_TEXTS = [
  {
    label: "Code explanation",
    text: "Sure, I'd be happy to help! The reason your React component is likely re-rendering is because you're actually creating a new object reference on each render cycle. Let me explain what's happening: you're basically defining the object inside the render function, which means it gets recreated every single time. I'll go ahead and show you how to fix this by utilizing the useMemo hook to memoize the value.",
  },
  {
    label: "Bug response",
    text: "Great question! It appears that the authentication middleware is probably failing due to an expired JWT token. Let me start by examining the error stack trace. In order to fix this, you might want to first check the token expiration time and then implement a refresh token mechanism. I'll walk you through the process step by step.",
  },
  {
    label: "Code review",
    text: "I've taken a look at your implementation and I think there are a few areas that we should probably address. First and foremost, the database query function seems to be performing an operation that could potentially cause performance issues at scale. Additionally, it's worth noting that you're not handling the error case properly. I would suggest that you might want to consider adding some additional error handling logic.",
  },
];

function compress(text, intensity, customRules = []) {
  let result = text;
  const config = INTENSITY_CONFIGS[intensity];
  const activeRules = [...config.rules, ...customRules];

  for (const ruleKey of activeRules) {
    if (COMPRESSION_RULES[ruleKey]) {
      result = result.replace(COMPRESSION_RULES[ruleKey].pattern, (match) => {
        const isStartOfSentence = false;
        return " ";
      });
    }
  }

  if (config.synonyms) {
    for (const [verbose, terse] of Object.entries(SYNONYM_MAP)) {
      if (!verbose.match(/^[A-Z]/)) {
        result = result.replace(new RegExp(`\\b${verbose}\\b`, "gi"), terse);
      }
    }
  }

  // Clean up multiple spaces and trim
  result = result.replace(/\s{2,}/g, " ").replace(/\s+([.,!?])/g, "$1").trim();

  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);

  return result;
}

function countTokens(text) {
  // Rough approximation: ~4 chars per token
  return Math.round(text.length / 4);
}

function RuleTag({ rule, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "4px 10px",
        borderRadius: "4px",
        border: `1px solid ${active ? "#f59e0b" : "#333"}`,
        background: active ? "rgba(245,158,11,0.15)" : "transparent",
        color: active ? "#f59e0b" : "#666",
        fontSize: "11px",
        fontFamily: "'JetBrains Mono', monospace",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {active ? "✓ " : ""}{COMPRESSION_RULES[rule].label}
    </button>
  );
}

function DiffView({ original, compressed }) {
  const origTokens = countTokens(original);
  const compTokens = countTokens(compressed);
  const reduction = Math.round((1 - compTokens / origTokens) * 100);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      <div style={{ background: "#0d0d0d", border: "1px solid #1f1f1f", borderRadius: "6px", padding: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "10px", color: "#555", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px" }}>Original</span>
          <span style={{ fontSize: "10px", color: "#ef4444", fontFamily: "monospace" }}>~{origTokens} tokens</span>
        </div>
        <p style={{ color: "#999", fontSize: "13px", lineHeight: "1.6", margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>{original}</p>
      </div>
      <div style={{ background: "#0d0d0d", border: "1px solid #4ade8033", borderRadius: "6px", padding: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "10px", color: "#555", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px" }}>Compressed</span>
          <span style={{ fontSize: "10px", color: "#4ade80", fontFamily: "monospace" }}>~{compTokens} tokens ({reduction > 0 ? `-${reduction}%` : "0%"})</span>
        </div>
        <p style={{ color: "#e5e5e5", fontSize: "13px", lineHeight: "1.6", margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>{compressed}</p>
      </div>
    </div>
  );
}

export default function CavemanBuilder() {
  const [intensity, setIntensity] = useState("full");
  const [inputText, setInputText] = useState(DEMO_TEXTS[0].text);
  const [customRules, setCustomRules] = useState([]);
  const [activeTab, setActiveTab] = useState("playground");
  const [skillName, setSkillName] = useState("my-terse-skill");
  const [skillDescription, setSkillDescription] = useState("Concise, precise responses. Drop filler. Keep substance.");
  const [triggerPhrases, setTriggerPhrases] = useState("be brief, terse mode, less tokens, /terse");
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [copied, setCopied] = useState(false);

  const compressed = compress(inputText, intensity, customRules);
  const origTokens = countTokens(inputText);
  const compTokens = countTokens(compressed);
  const reduction = Math.round((1 - compTokens / origTokens) * 100);

  const toggleRule = (rule) => {
    setCustomRules(prev => prev.includes(rule) ? prev.filter(r => r !== rule) : [...prev, rule]);
  };

  const generatedSkill = `---
name: ${skillName}
description: ${skillDescription}. Use when user says: ${triggerPhrases}.
---

# ${skillName.charAt(0).toUpperCase() + skillName.slice(1).replace(/-/g, " ")} Mode

## Activation
Triggers: ${triggerPhrases}
Deactivation: "normal mode" / "stop ${skillName}"

## Core Rule
Respond terse. Keep all technical substance. Only prose fluff die.

## Grammar Rules (${INTENSITY_CONFIGS[intensity].label} Intensity)
${["articles", "filler", "pleasantries", "hedging", "verbose_intros", "redundant", "connectives"].map(rule => {
  const active = INTENSITY_CONFIGS[intensity].rules.includes(rule) || customRules.includes(rule);
  return `- ${active ? "✓ DROP" : "  KEEP"} ${COMPRESSION_RULES[rule].label} — e.g. "${COMPRESSION_RULES[rule].example}"`;
}).join("\n")}

## Output Pattern
[thing] [action] [reason]. [next step].

## What to Preserve (NEVER touch)
- Code blocks, function names, variable names
- Error messages, stack traces, API names
- URLs, file paths, version numbers
- Technical accuracy — substance sacred

## What to Drop
- Articles: a / an / the
${INTENSITY_CONFIGS[intensity].rules.includes("filler") ? "- Filler: just / really / basically / actually / simply\n" : ""}\
${INTENSITY_CONFIGS[intensity].rules.includes("pleasantries") ? "- Pleasantries: Sure / Certainly / Happy to / Great question\n" : ""}\
${INTENSITY_CONFIGS[intensity].rules.includes("hedging") ? "- Hedging: likely / probably / perhaps / I think\n" : ""}\
${INTENSITY_CONFIGS[intensity].synonyms ? "- Verbose synonyms: extensive → big, implement → add, utilize → use\n" : ""}\
- Fragments OK. Short synonyms preferred.

## Persistence
Active every response until deactivated. No filler drift. If unsure — stay terse.
`;

  const copySkill = () => {
    navigator.clipboard.writeText(generatedSkill);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = ["playground", "how-it-works", "builder"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      color: "#e5e5e5",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #1a1a1a",
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#0a0a0a",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "28px" }}>🪨</span>
          <div>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", letterSpacing: "-0.5px" }}>caveman.build</div>
            <div style={{ fontSize: "11px", color: "#555", marginTop: "1px" }}>understand it. build your own.</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "4px", background: "#111", border: "1px solid #1f1f1f", borderRadius: "8px", padding: "4px" }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 14px",
                borderRadius: "5px",
                border: "none",
                background: activeTab === tab ? "#1f1f1f" : "transparent",
                color: activeTab === tab ? "#fff" : "#555",
                fontSize: "11px",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
                textTransform: "capitalize",
              }}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>

        {/* PLAYGROUND TAB */}
        {activeTab === "playground" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <h2 style={{ color: "#fff", fontSize: "15px", margin: "0 0 4px 0" }}>Live Compression Playground</h2>
              <p style={{ color: "#555", fontSize: "12px", margin: 0 }}>See exactly how each rule removes tokens — no magic, just constraints.</p>
            </div>

            {/* Intensity selector */}
            <div style={{ display: "flex", gap: "8px" }}>
              {Object.entries(INTENSITY_CONFIGS).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setIntensity(key)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "6px",
                    border: `1px solid ${intensity === key ? cfg.color + "66" : "#1f1f1f"}`,
                    background: intensity === key ? cfg.color + "18" : "#0d0d0d",
                    color: intensity === key ? cfg.color : "#555",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "12px",
                    transition: "all 0.15s",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontWeight: "700", marginBottom: "3px" }}>{cfg.label}</div>
                  <div style={{ fontSize: "10px", opacity: 0.8 }}>{cfg.desc}</div>
                </button>
              ))}
            </div>

            {/* Demo preset buttons */}
            <div>
              <div style={{ fontSize: "11px", color: "#444", marginBottom: "8px" }}>Load example:</div>
              <div style={{ display: "flex", gap: "8px" }}>
                {DEMO_TEXTS.map((demo, i) => (
                  <button
                    key={i}
                    onClick={() => { setInputText(demo.text); setSelectedPreset(i); }}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "4px",
                      border: `1px solid ${selectedPreset === i ? "#f59e0b66" : "#1f1f1f"}`,
                      background: selectedPreset === i ? "rgba(245,158,11,0.1)" : "#0d0d0d",
                      color: selectedPreset === i ? "#f59e0b" : "#555",
                      fontSize: "11px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {demo.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div>
              <div style={{ fontSize: "11px", color: "#444", marginBottom: "8px" }}>Input text (edit freely):</div>
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "100px",
                  background: "#0d0d0d",
                  border: "1px solid #1f1f1f",
                  borderRadius: "6px",
                  padding: "12px",
                  color: "#ccc",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  resize: "vertical",
                  outline: "none",
                  lineHeight: "1.6",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Stats bar */}
            <div style={{
              background: "#0d0d0d",
              border: "1px solid #1f1f1f",
              borderRadius: "6px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#ef4444" }}>{origTokens}</div>
                <div style={{ fontSize: "10px", color: "#555" }}>original tokens</div>
              </div>
              <div style={{ color: "#333", fontSize: "18px" }}>→</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#4ade80" }}>{compTokens}</div>
                <div style={{ fontSize: "10px", color: "#555" }}>compressed tokens</div>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ fontSize: "24px", fontWeight: "700", color: reduction > 40 ? "#4ade80" : reduction > 20 ? "#f59e0b" : "#888" }}>
                  -{reduction}%
                </div>
                <div style={{ fontSize: "10px", color: "#555" }}>token reduction</div>
              </div>
            </div>

            {/* Diff view */}
            <DiffView original={inputText} compressed={compressed} />

            {/* Active rules */}
            <div>
              <div style={{ fontSize: "11px", color: "#444", marginBottom: "8px" }}>
                Rules active in <span style={{ color: INTENSITY_CONFIGS[intensity].color }}>{intensity}</span> mode
                (click to toggle extra rules):
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {Object.keys(COMPRESSION_RULES).map(rule => (
                  <RuleTag
                    key={rule}
                    rule={rule}
                    active={INTENSITY_CONFIGS[intensity].rules.includes(rule) || customRules.includes(rule)}
                    onClick={() => {
                      if (!INTENSITY_CONFIGS[intensity].rules.includes(rule)) toggleRule(rule);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HOW IT WORKS TAB */}
        {activeTab === "how-it-works" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <h2 style={{ color: "#fff", fontSize: "15px", margin: "0 0 4px 0" }}>How Caveman Works</h2>
              <p style={{ color: "#555", fontSize: "12px", margin: 0 }}>The entire mechanism is a prompt — no fine-tuning, no model changes, no special APIs.</p>
            </div>

            {/* The key insight */}
            <div style={{ background: "#0d0d0d", border: "1px solid #f59e0b33", borderRadius: "6px", padding: "20px" }}>
              <div style={{ fontSize: "11px", color: "#f59e0b", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>The Core Insight</div>
              <p style={{ color: "#ccc", fontSize: "13px", lineHeight: "1.7", margin: "0 0 12px 0" }}>
                LLMs don't need to be retrained to be concise. They <em>already know</em> how to write tersely — they've seen telegraphic writing in training. A SKILL.md is just a system prompt that tells the model which style to use.
              </p>
              <p style={{ color: "#888", fontSize: "12px", lineHeight: "1.7", margin: 0 }}>
                The model understands "drop articles, use fragments, short synonyms." It applies these as constraints on its output style — not on its reasoning. The brain stays the same size. Only the mouth changes.
              </p>
            </div>

            {/* Three mechanisms */}
            <div>
              <div style={{ fontSize: "12px", color: "#666", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>3 Mechanisms That Cut Tokens</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  {
                    num: "01",
                    title: "Negative grammar constraints",
                    color: "#4ade80",
                    desc: "Explicit rules telling the model what NOT to include: no articles (a/an/the), no filler (just/really/basically), no pleasantries (Sure, happy to help), no hedging (likely/probably/I think). These alone cut 30–50% of prose tokens.",
                    example: '"Sure, I\'d be happy to help! The reason your function is likely failing..." → "Function fail:"',
                  },
                  {
                    num: "02",
                    title: "Output pattern enforcement",
                    color: "#f59e0b",
                    desc: 'A defined structure: [thing] [action] [reason]. [next step]. This pattern forces direct logical flow and eliminates the padding that LLMs add between thoughts when they\'re generating freely.',
                    example: '"I\'ll now walk you through the steps needed to fix this issue, which involves..." → "Fix: [step]. Then: [step]."',
                  },
                  {
                    num: "03",
                    title: "Synonym substitution",
                    color: "#a78bfa",
                    desc: 'Short synonym preference: "big" not "extensive", "fix" not "implement a solution for", "use" not "utilize". At ultra intensity, abbreviations: DB for database, auth for authentication, fn for function. These apply only to prose — code is never touched.',
                    example: '"Implement a solution for the authentication module" → "Fix auth module"',
                  },
                ].map(m => (
                  <div key={m.num} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "6px", padding: "16px" }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{ fontSize: "11px", color: m.color, fontWeight: "700", minWidth: "24px", marginTop: "1px" }}>{m.num}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", color: "#fff", fontWeight: "600", marginBottom: "6px" }}>{m.title}</div>
                        <p style={{ color: "#888", fontSize: "12px", lineHeight: "1.6", margin: "0 0 10px 0" }}>{m.desc}</p>
                        <div style={{ background: "#111", borderRadius: "4px", padding: "8px 12px", fontSize: "11px", color: "#666", fontStyle: "italic" }}>
                          {m.example}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What never gets touched */}
            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "6px", padding: "20px" }}>
              <div style={{ fontSize: "11px", color: "#ef4444", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>What NEVER Gets Compressed</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {[
                  "Code blocks (```...```)",
                  "Function/variable names",
                  "Error messages & stack traces",
                  "API endpoints & URLs",
                  "File paths",
                  "Version numbers",
                  "Technical accuracy",
                  "Reasoning logic",
                ].map(item => (
                  <div key={item} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "12px", color: "#888" }}>
                    <span style={{ color: "#ef4444" }}>✗</span> {item}
                  </div>
                ))}
              </div>
              <p style={{ color: "#555", fontSize: "11px", margin: "12px 0 0 0", lineHeight: "1.6" }}>
                This asymmetry is the key design decision. Code is structural — it can't be abbreviated without breaking it. Prose is decorative — it wraps the code in words the engineer often skims anyway.
              </p>
            </div>

            {/* Why it improves accuracy */}
            <div style={{ background: "#0d0d0d", border: "1px solid #a78bfa33", borderRadius: "6px", padding: "20px" }}>
              <div style={{ fontSize: "11px", color: "#a78bfa", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Bonus: Why Brevity Can Improve Accuracy</div>
              <p style={{ color: "#ccc", fontSize: "13px", lineHeight: "1.7", margin: "0 0 10px 0" }}>
                A March 2026 arXiv paper found conciseness constraints improved accuracy by <strong style={{ color: "#a78bfa" }}>26 percentage points</strong> on certain benchmarks.
              </p>
              <p style={{ color: "#888", fontSize: "12px", lineHeight: "1.7", margin: 0 }}>
                The mechanism: LLMs sometimes "overelaborate" — they generate verbose justifications that drift from the correct answer. Forcing brevity cuts the overelaboration path and keeps the model anchored to the most direct, accurate response. Verbose output isn't a sign of better thinking — it's sometimes a sign of wandering.
              </p>
            </div>
          </div>
        )}

        {/* BUILDER TAB */}
        {activeTab === "builder" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <h2 style={{ color: "#fff", fontSize: "15px", margin: "0 0 4px 0" }}>Build Your Own Compression Skill</h2>
              <p style={{ color: "#555", fontSize: "12px", margin: 0 }}>Configure the rules, generate your SKILL.md, drop it in any agent.</p>
            </div>

            {/* Config form */}
            <div style={{ background: "#0d0d0d", border: "1px solid #1f1f1f", borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "6px" }}>Skill name</label>
                  <input
                    value={skillName}
                    onChange={e => setSkillName(e.target.value)}
                    style={{
                      width: "100%", background: "#111", border: "1px solid #222", borderRadius: "5px",
                      padding: "8px 10px", color: "#ccc", fontSize: "12px", fontFamily: "inherit",
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "6px" }}>Base intensity</label>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {Object.entries(INTENSITY_CONFIGS).map(([key, cfg]) => (
                      <button key={key} onClick={() => setIntensity(key)} style={{
                        flex: 1, padding: "8px 4px", borderRadius: "4px", border: `1px solid ${intensity === key ? cfg.color + "66" : "#222"}`,
                        background: intensity === key ? cfg.color + "18" : "transparent", color: intensity === key ? cfg.color : "#555",
                        fontSize: "11px", cursor: "pointer", fontFamily: "inherit",
                      }}>{cfg.label}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "6px" }}>Description (1 line)</label>
                <input
                  value={skillDescription}
                  onChange={e => setSkillDescription(e.target.value)}
                  style={{
                    width: "100%", background: "#111", border: "1px solid #222", borderRadius: "5px",
                    padding: "8px 10px", color: "#ccc", fontSize: "12px", fontFamily: "inherit",
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "6px" }}>Trigger phrases (comma-separated)</label>
                <input
                  value={triggerPhrases}
                  onChange={e => setTriggerPhrases(e.target.value)}
                  style={{
                    width: "100%", background: "#111", border: "1px solid #222", borderRadius: "5px",
                    padding: "8px 10px", color: "#ccc", fontSize: "12px", fontFamily: "inherit",
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "8px" }}>Active rules (click to toggle):</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {Object.keys(COMPRESSION_RULES).map(rule => (
                    <RuleTag key={rule} rule={rule}
                      active={INTENSITY_CONFIGS[intensity].rules.includes(rule) || customRules.includes(rule)}
                      onClick={() => {
                        if (!INTENSITY_CONFIGS[intensity].rules.includes(rule)) toggleRule(rule);
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: "10px", color: "#333", margin: "6px 0 0 0" }}>
                  Gray rules are locked by base intensity. Amber rules are active. Click gray to add extra rules.
                </p>
              </div>
            </div>

            {/* Generated SKILL.md */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div style={{ fontSize: "11px", color: "#555" }}>Generated SKILL.md → drop in your agent's skills folder</div>
                <button
                  onClick={copySkill}
                  style={{
                    padding: "6px 14px", borderRadius: "4px",
                    border: `1px solid ${copied ? "#4ade8066" : "#333"}`,
                    background: copied ? "rgba(74,222,128,0.1)" : "#111",
                    color: copied ? "#4ade80" : "#888",
                    fontSize: "11px", cursor: "pointer", fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  {copied ? "✓ copied" : "copy"}
                </button>
              </div>
              <pre style={{
                background: "#0d0d0d", border: "1px solid #1f1f1f", borderRadius: "6px",
                padding: "16px", fontSize: "11px", color: "#888", lineHeight: "1.6",
                overflow: "auto", margin: 0, maxHeight: "360px",
                whiteSpace: "pre-wrap", wordBreak: "break-word",
              }}>{generatedSkill}</pre>
            </div>

            {/* Installation guide */}
            <div style={{ background: "#0d0d0d", border: "1px solid #1f1f1f", borderRadius: "6px", padding: "20px" }}>
              <div style={{ fontSize: "11px", color: "#f59e0b", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Install in 30 seconds</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "Claude Code", cmd: `mkdir -p ~/.agents/skills && cat > ~/.agents/skills/${skillName}.md << 'EOF'\n[paste SKILL.md content]\nEOF` },
                  { label: "Cursor / Windsurf / Cline", cmd: `# Drop SKILL.md in .cursor/rules/ or .windsurf/rules/ or your agent's rules folder` },
                  { label: "Any agent via AGENTS.md", cmd: `# Paste contents of SKILL.md directly into your AGENTS.md / CLAUDE.md / system prompt` },
                ].map(step => (
                  <div key={step.label} style={{ background: "#111", borderRadius: "4px", padding: "10px 12px" }}>
                    <div style={{ fontSize: "10px", color: "#555", marginBottom: "5px" }}>{step.label}</div>
                    <code style={{ fontSize: "11px", color: "#ccc", whiteSpace: "pre-wrap" }}>{step.cmd}</code>
                  </div>
                ))}
              </div>
              <p style={{ color: "#555", fontSize: "11px", margin: "12px 0 0 0" }}>
                Activate: type your trigger phrase (e.g. "{triggerPhrases.split(",")[0].trim()}") · Deactivate: "normal mode"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #111", padding: "16px 32px", marginTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "10px", color: "#333" }}>caveman mechanism: negative grammar constraints + output pattern + synonym substitution</span>
        <span style={{ fontSize: "10px", color: "#333" }}>original: JuliusBrussee/caveman · 66k ⭐</span>
      </div>
    </div>
  );
}
