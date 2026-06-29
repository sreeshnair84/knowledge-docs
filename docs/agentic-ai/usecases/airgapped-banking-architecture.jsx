import { useState } from "react";

const layers = [
  {
    id: "ingestion",
    label: "01 — Data Ingestion",
    color: "#C8A96E",
    components: [
      { name: "Document Scanner", desc: "Scans PDFs, Excel, CSV, SWIFT messages, internal reports via OCR + parsers. No external calls." },
      { name: "Data Connectors", desc: "On-prem adapters for Bloomberg Terminal, core banking systems (Temenos, Finacle), and data warehouses." },
      { name: "Pre-processing Pipeline", desc: "PII masking, schema normalization, chunking. Runs in isolated Docker containers." },
    ],
  },
  {
    id: "storage",
    label: "02 — Knowledge Store",
    color: "#7EB8C9",
    components: [
      { name: "Vector Database", desc: "Qdrant or Weaviate deployed on-prem. Stores embeddings for semantic search across all ingested documents." },
      { name: "Structured Data Lake", desc: "MinIO (S3-compatible) object storage for raw files. PostgreSQL for structured financial data." },
      { name: "Embedding Model", desc: "BGE-M3 or Nomic-Embed running locally on CPU/GPU. Generates vectors without any cloud dependency." },
    ],
  },
  {
    id: "inference",
    label: "03 — AI Inference",
    color: "#9B8EC4",
    components: [
      { name: "Primary LLM", desc: "Llama 3.3 70B (Q4_K_M quantized, ~40GB). Handles complex analysis, report drafting, cross-document reasoning." },
      { name: "Inference Server", desc: "vLLM with OpenAI-compatible API. Batches requests, manages GPU memory, supports 500+ concurrent sessions." },
      { name: "RAG Orchestrator", desc: "LangChain or Haystack running on-prem. Routes queries → retrieves relevant docs → augments prompts → returns responses." },
    ],
  },
  {
    id: "gateway",
    label: "04 — API Gateway",
    color: "#6BAF8D",
    components: [
      { name: "Internal API Layer", desc: "FastAPI service exposing REST endpoints. All apps call this — zero direct model access." },
      { name: "Auth & RBAC", desc: "Active Directory integration. Role-based: analysts see their desk's data only. Full audit log to SIEM." },
      { name: "Rate Limiting & Routing", desc: "Prevents GPU saturation. Priority queuing for critical desks (risk, treasury). Response caching for repeated queries." },
    ],
  },
  {
    id: "interface",
    label: "05 — User Interface",
    color: "#C97070",
    components: [
      { name: "Analyst Workbench", desc: "Web app (React) for ad-hoc Q&A on financial data. Ask questions like: 'Compare Q3 NPL ratios across GCC branches.'" },
      { name: "Report Generator", desc: "Templated report automation. Pulls live data from the lake, generates narrative + tables. Exports to PDF/Word." },
      { name: "BI Dashboard Integration", desc: "Plugin for Power BI / Tableau to surface AI-generated commentary alongside existing charts." },
    ],
  },
  {
    id: "ops",
    label: "06 — Air-Gap Ops",
    color: "#B0B0B0",
    components: [
      { name: "Offline Model Updates", desc: "New model weights shipped quarterly via encrypted hard drive. Verified by hash before deployment." },
      { name: "Monitoring Stack", desc: "Prometheus + Grafana on-prem. Tracks GPU utilization, latency, queue depth. Alerts via internal email only." },
      { name: "Disaster Recovery", desc: "Hot standby inference node. Model weights replicated to secondary datacenter in same jurisdiction." },
    ],
  },
];

const hardware = [
  { label: "Primary Inference", spec: "4× NVIDIA H100 80GB (NVLink)", note: "Serves 500+ users at <3s p95 latency" },
  { label: "Embedding / CPU Tasks", spec: "2× AMD EPYC 9654 (96-core)", note: "Runs vector DB, pre-processing, API layer" },
  { label: "Storage", spec: "2PB NVMe + 20PB SAS array", note: "Document lake + vector index + backups" },
  { label: "Network", spec: "25GbE internal fabric (no uplink)", note: "Completely isolated from internet" },
];

const timeline = [
  { week: "W1–2", task: "Hardware procurement & DC prep" },
  { week: "W3–4", task: "OS hardening, network isolation, storage setup" },
  { week: "W5–6", task: "Model deployment & quantization validation" },
  { week: "W7–8", task: "Data connectors + ingestion pipeline" },
  { week: "W9–10", task: "RAG pipeline + API gateway" },
  { week: "W11–12", task: "UI deployment + user acceptance testing" },
  { week: "W13–14", task: "Security audit + pen test (air-gapped)" },
  { week: "W15–16", task: "Phased rollout: pilot desk → full enterprise" },
];

export default function App() {
  const [active, setActive] = useState(null);

  const activeLayer = layers.find(l => l.id === active);

  return (
    <div style={{
      background: "#0C0E13",
      minHeight: "100vh",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#E8E0D0",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #2A2D35",
        padding: "48px 64px 40px",
        background: "linear-gradient(180deg, #111318 0%, #0C0E13 100%)",
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#7A7060", textTransform: "uppercase", marginBottom: "16px", fontFamily: "monospace" }}>
          CONFIDENTIAL — ARCHITECTURE BRIEF
        </div>
        <h1 style={{ fontSize: "42px", fontWeight: "400", margin: "0 0 8px", lineHeight: 1.1, color: "#F0E8D8" }}>
          Air-Gapped AI Infrastructure
        </h1>
        <div style={{ fontSize: "18px", color: "#8A8070", fontStyle: "italic" }}>
          Enterprise Banking · Data Analysis & Reports · 500+ Users
        </div>
        <div style={{ display: "flex", gap: "32px", marginTop: "32px" }}>
          {[
            { k: "Model", v: "Llama 3.3 70B" },
            { k: "Latency (p95)", v: "< 3 seconds" },
            { k: "Connectivity", v: "Zero external" },
            { k: "Deployment", v: "16 weeks" },
          ].map(item => (
            <div key={item.k} style={{ borderLeft: "2px solid #2A2D35", paddingLeft: "16px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#7A7060", textTransform: "uppercase", fontFamily: "monospace" }}>{item.k}</div>
              <div style={{ fontSize: "16px", color: "#C8A96E", marginTop: "4px" }}>{item.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "48px 64px" }}>

        {/* Architecture Layers */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#7A7060", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "24px" }}>
            SYSTEM ARCHITECTURE — CLICK ANY LAYER
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {layers.map((layer) => (
              <div
                key={layer.id}
                onClick={() => setActive(active === layer.id ? null : layer.id)}
                style={{
                  background: active === layer.id ? "#15181F" : "#111318",
                  border: `1px solid ${active === layer.id ? layer.color + "60" : "#1E2128"}`,
                  borderLeft: `3px solid ${layer.color}`,
                  padding: "20px 28px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  borderRadius: "2px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "13px", letterSpacing: "1px", color: layer.color, fontFamily: "monospace" }}>
                    {layer.label}
                  </div>
                  <div style={{ fontSize: "11px", color: "#4A4840", fontFamily: "monospace" }}>
                    {active === layer.id ? "▲ COLLAPSE" : "▼ EXPAND"}
                  </div>
                </div>

                {active === layer.id && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginTop: "20px" }}>
                    {layer.components.map(comp => (
                      <div key={comp.name} style={{
                        background: "#0C0E13",
                        border: `1px solid ${layer.color}25`,
                        borderRadius: "2px",
                        padding: "16px",
                      }}>
                        <div style={{ fontSize: "13px", color: "#F0E8D8", marginBottom: "8px", fontFamily: "monospace" }}>
                          {comp.name}
                        </div>
                        <div style={{ fontSize: "13px", color: "#7A7868", lineHeight: 1.6 }}>
                          {comp.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hardware Spec */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#7A7060", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "24px" }}>
            HARDWARE SPECIFICATION
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {hardware.map(h => (
              <div key={h.label} style={{
                background: "#111318",
                border: "1px solid #1E2128",
                borderRadius: "2px",
                padding: "20px 24px",
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
              }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C8A96E", marginTop: "5px", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#7A7060", textTransform: "uppercase", fontFamily: "monospace" }}>{h.label}</div>
                  <div style={{ fontSize: "15px", color: "#E8E0D0", margin: "6px 0 4px" }}>{h.spec}</div>
                  <div style={{ fontSize: "12px", color: "#5A5848", fontFamily: "monospace" }}>{h.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Flow */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#7A7060", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "24px" }}>
            QUERY DATA FLOW
          </div>
          <div style={{ background: "#111318", border: "1px solid #1E2128", borderRadius: "2px", padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0", flexWrap: "wrap", rowGap: "8px" }}>
              {[
                { step: "Analyst query", color: "#C97070" },
                { step: "Auth check (AD)", color: "#C8A96E" },
                { step: "Embedding model", color: "#7EB8C9" },
                { step: "Vector search", color: "#7EB8C9" },
                { step: "RAG context build", color: "#9B8EC4" },
                { step: "LLM inference", color: "#9B8EC4" },
                { step: "Response + audit log", color: "#6BAF8D" },
              ].map((s, i, arr) => (
                <div key={s.step} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    background: s.color + "15",
                    border: `1px solid ${s.color}40`,
                    borderRadius: "2px",
                    padding: "8px 14px",
                    fontSize: "12px",
                    color: s.color,
                    fontFamily: "monospace",
                    whiteSpace: "nowrap",
                  }}>
                    {s.step}
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ color: "#3A3830", fontSize: "18px", padding: "0 8px" }}>→</div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "20px", padding: "12px 16px", background: "#0C0E13", borderRadius: "2px", fontSize: "12px", color: "#5A5848", fontFamily: "monospace" }}>
              ⚠ All traffic is intranet-only. No DNS resolution, no outbound ports. Firewall policy: default-deny all external.
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#7A7060", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "24px" }}>
            16-WEEK DEPLOYMENT TIMELINE
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
            {timeline.map((t, i) => (
              <div key={t.week} style={{
                background: "#111318",
                border: "1px solid #1E2128",
                borderRadius: "2px",
                padding: "16px",
              }}>
                <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#C8A96E", fontFamily: "monospace", marginBottom: "8px" }}>
                  {t.week}
                </div>
                <div style={{ fontSize: "13px", color: "#B0A890", lineHeight: 1.4 }}>{t.task}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance callout */}
        <div style={{
          background: "#0F1A14",
          border: "1px solid #2A4035",
          borderLeft: "3px solid #6BAF8D",
          borderRadius: "2px",
          padding: "24px 28px",
        }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#6BAF8D", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "12px" }}>
            REGULATORY ALIGNMENT
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
            {[
              { reg: "CBUAE", note: "Central Bank UAE — no customer data leaves jurisdiction" },
              { reg: "SAMA", note: "Saudi Arabia Monetary Authority — on-prem data residency satisfied" },
              { reg: "DPDPA / PDPL", note: "Data protection laws — PII stays encrypted, on-device" },
            ].map(r => (
              <div key={r.reg}>
                <div style={{ fontSize: "14px", color: "#8ACA9D", fontFamily: "monospace", marginBottom: "4px" }}>{r.reg}</div>
                <div style={{ fontSize: "12px", color: "#5A7060" }}>{r.note}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
