---
title: "Bank Arch Diagram"
date_created: 2026-06-29
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ai-development", "aidlc"]
---

import { useState } from "react";

const COLORS = {
  azure: "#0078d4",
  aws: "#ff9900",
  keycloak: "#4d9900",
  envoy: "#7c3aed",
  opa: "#dc2626",
  agent: "#0891b2",
  spire: "#b45309",
  cache: "#0f766e",
  bedrock: "#9333ea",
  internet: "#6b7280",
  bg: "#020817",
  vpcBg: "#0a1628",
  panel: "#0d1f3c",
  muted: "#64748b",
};

const steps = [
  { id: 1,  color: "#60a5fa", label: "User authenticates via browser — POST to Azure Entra ID (one internet call per session)" },
  { id: 2,  color: "#34d399", label: "Entra ID returns OIDC JWT (RS256) to client — signed with rotating keys" },
  { id: 3,  color: "#a78bfa", label: "JWT Bearer token sent to AWS ALB — enters the AWS private boundary" },
  { id: 4,  color: "#f472b6", label: "ALB forwards to Envoy Auth Proxy — JWT filter intercepts the request" },
  { id: 5,  color: "#fb923c", label: "Envoy checks ElastiCache Redis for JWKS keys (cache hit = offline validation, zero internet)" },
  { id: 6,  color: "#facc15", label: "On cache miss: EventBridge Lambda refreshes JWKS from Entra into Redis (scheduled, not per-request)" },
  { id: 7,  color: "#4ade80", label: "Keycloak federates with Entra ID — issues internal short-lived JWT (15 min) scoped to bank realm" },
  { id: 8,  color: "#f87171", label: "OPA sidecar evaluates Rego policies — checks roles, groups, tenant claims, resource permissions" },
  { id: 9,  color: "#818cf8", label: "Envoy injects validated claims as x-headers (x-user-id, x-roles, x-tenant) — strips raw token" },
  { id: 10, color: "#38bdf8", label: "Agent runtime receives claim-enriched request — zero auth logic inside agents" },
  { id: 11, color: "#a3e635", label: "SPIRE issues SVID (x509/JWT) for agent-to-agent calls — workload identity rotated every 1h" },
  { id: 12, color: "#c084fc", label: "Agent invokes Bedrock models via VPC endpoint — all traffic stays within AWS boundary" },
];

function FlowBadge({ n, color }) {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: "50%",
      background: color, color: "#000",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 800, flexShrink: 0,
      boxShadow: "0 0 8px " + color + "88",
    }}>{n}</div>
  );
}

function Box({ x, y, w, h, color, label, sublabel, icon, badges }) {
  const blist = badges || [];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8}
        fill={COLORS.panel} stroke={color} strokeWidth={1.5}
        style={{ filter: "drop-shadow(0 0 6px " + color + "44)" }}
      />
      {icon && (
        <text x={x + 12} y={y + 20} fontSize={11} fontWeight={700} fill={color}>{icon}</text>
      )}
      <text x={x + (icon ? 32 : 12)} y={y + 20} fontSize={12} fontWeight={700} fill={color}>{label}</text>
      {sublabel && (
        <text x={x + 12} y={y + 35} fontSize={10} fill={COLORS.muted}>{sublabel}</text>
      )}
      {blist.map((b, i) => (
        <g key={i}>
          <rect x={x + 12 + i * 68} y={y + h - 22} width={60} height={15} rx={3}
            fill={b.color + "22"} stroke={b.color} strokeWidth={0.8} />
          <text x={x + 42 + i * 68} y={y + h - 11} fontSize={9} fill={b.color} textAnchor="middle">{b.label}</text>
        </g>
      ))}
    </g>
  );
}

function Arrowhead({ id, color }) {
  return (
    <marker id={id} markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill={color} />
    </marker>
  );
}

function Arrow({ x1, y1, x2, y2, color, step, dashed }) {
  const uid = "a" + (step !== undefined ? step : Math.random().toString(36).slice(2));
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const hasBadge = step !== undefined && step !== "";
  return (
    <g>
      <defs><Arrowhead id={uid} color={color} /></defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth={1.8}
        strokeDasharray={dashed ? "6,4" : undefined}
        markerEnd={"url(#" + uid + ")"}
        style={{ filter: "drop-shadow(0 0 3px " + color + "66)" }}
      />
      {hasBadge && (
        <g>
          <circle cx={mx} cy={my} r={10} fill={color} />
          <text x={mx} y={my + 4} textAnchor="middle" fontSize={10} fontWeight={800} fill="#000">{step}</text>
        </g>
      )}
    </g>
  );
}

function BentArrow({ points, color, step, dashed }) {
  const uid = "b" + step;
  const d = points.map((p, i) => (i === 0 ? "M" : "L") + p[0] + "," + p[1]).join(" ");
  const mid = points[Math.floor(points.length / 2)];
  const hasBadge = step !== undefined && step !== "";
  return (
    <g>
      <defs><Arrowhead id={uid} color={color} /></defs>
      <path d={d} fill="none"
        stroke={color} strokeWidth={1.8}
        strokeDasharray={dashed ? "6,4" : undefined}
        markerEnd={"url(#" + uid + ")"}
        style={{ filter: "drop-shadow(0 0 3px " + color + "66)" }}
      />
      {hasBadge && (
        <g>
          <circle cx={mid[0]} cy={mid[1]} r={10} fill={color} />
          <text x={mid[0]} y={mid[1] + 4} textAnchor="middle" fontSize={10} fontWeight={800} fill="#000">{step}</text>
        </g>
      )}
    </g>
  );
}

function ArchDiagram({ activeStep }) {
  const isActive = (n) => activeStep === 0 || activeStep === n;
  const sc = (n) => isActive(n) ? steps[n - 1].color : "#1e293b";
  const op = (n) => isActive(n) ? 1 : 0.18;

  return (
    <svg viewBox="0 0 1100 780" style={{ width: "100%", height: "auto", background: COLORS.bg }}>
      <defs>
        <pattern id="grid" width={40} height={40} patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f172a" strokeWidth={0.5} />
        </pattern>
      </defs>
      <rect width={1100} height={780} fill="url(#grid)" />

      {/* INTERNET ZONE */}
      <rect x={20} y={20} width={325} height={215} rx={12}
        fill="#060606" stroke={COLORS.internet} strokeWidth={1} strokeDasharray="8,4" />
      <text x={36} y={43} fontSize={10} fill={COLORS.internet} fontWeight={700} letterSpacing={2}>INTERNET ZONE</text>

      {/* AWS VPC ZONE */}
      <rect x={365} y={20} width={720} height={740} rx={12}
        fill={COLORS.vpcBg} stroke={COLORS.aws} strokeWidth={1.5} strokeDasharray="10,5" />
      <text x={380} y={43} fontSize={10} fill={COLORS.aws} fontWeight={700} letterSpacing={2}>AWS VPC — PRIVATE BOUNDARY</text>

      {/* 1: AZURE ENTRA ID */}
      <g opacity={op(1)}>
        <Box x={30} y={55} w={300} h={72} color={COLORS.azure}
          label="Azure Entra ID" sublabel="OIDC / SAML Identity Provider" icon="[ID]"
          badges={[
            { color: COLORS.azure, label: "OIDC" },
            { color: "#60a5fa",    label: "RS256 JWT" },
            { color: "#93c5fd",    label: "JWKS" },
          ]} />
      </g>

      {/* USER */}
      <g opacity={op(1)}>
        <Box x={30} y={152} w={300} h={55} color="#94a3b8"
          label="User / Client" sublabel="Browser or API consumer" icon="[U]" />
      </g>

      {/* 6: EVENTBRIDGE + LAMBDA */}
      <g opacity={op(6)}>
        <Box x={375} y={55} w={210} h={60} color={COLORS.aws}
          label="EventBridge + Lambda" sublabel="Scheduled JWKS key refresh" icon="[T]"
          badges={[{ color: COLORS.aws, label: "6h TTL" }]} />
      </g>

      {/* 7: KEYCLOAK */}
      <g opacity={op(7)}>
        <Box x={375} y={140} w={210} h={90} color={COLORS.keycloak}
          label="Keycloak" sublabel="Internal Identity Broker" icon="[K]"
          badges={[
            { color: COLORS.keycloak, label: "Realm" },
            { color: "#86efac",       label: "Federation" },
            { color: "#4ade80",       label: "RDS PG" },
          ]} />
      </g>

      {/* 3: ALB */}
      <g opacity={op(3)}>
        <Box x={605} y={55} w={185} h={60} color={COLORS.aws}
          label="AWS ALB" sublabel="TLS termination · WAF" icon="[LB]"
          badges={[
            { color: COLORS.aws, label: "HTTPS" },
            { color: "#fdba74",  label: "WAF" },
          ]} />
      </g>

      {/* 4/5/9: ENVOY PROXY */}
      <g opacity={(isActive(4) || isActive(5) || isActive(9)) ? 1 : 0.18}>
        <Box x={605} y={148} w={255} h={140} color={COLORS.envoy}
          label="Envoy Auth Proxy" sublabel="JWT filter · ext_authz · Claims injector" icon="[E]"
          badges={[
            { color: COLORS.envoy, label: "JWT Filter" },
            { color: "#a78bfa",    label: "JWKS Cache" },
            { color: "#c4b5fd",    label: "x-headers" },
          ]} />
        <text x={617} y={238} fontSize={10} fill={COLORS.muted}>validates token offline</text>
        <text x={617} y={254} fontSize={10} fill={COLORS.muted}>strips Bearer, injects claims</text>
        <text x={617} y={270} fontSize={10} fill={COLORS.muted}>caches auth result per TTL</text>
      </g>

      {/* 8: OPA */}
      <g opacity={op(8)}>
        <Box x={882} y={148} w={200} h={140} color={COLORS.opa}
          label="OPA Sidecar" sublabel="Policy Engine · Rego rules" icon="[P]"
          badges={[
            { color: COLORS.opa, label: "RBAC" },
            { color: "#fca5a5", label: "ABAC" },
            { color: "#f87171", label: "Rego" },
          ]} />
        <text x={894} y={238} fontSize={10} fill={COLORS.muted}>role checks</text>
        <text x={894} y={254} fontSize={10} fill={COLORS.muted}>attribute policies</text>
        <text x={894} y={270} fontSize={10} fill={COLORS.muted}>resource scoping</text>
      </g>

      {/* 5: ELASTICACHE */}
      <g opacity={op(5)}>
        <Box x={375} y={265} w={210} h={65} color={COLORS.cache}
          label="ElastiCache Redis" sublabel="JWKS key cache · Session cache" icon="[C]"
          badges={[
            { color: COLORS.cache, label: "JWKS" },
            { color: "#5eead4",    label: "TTL 6h" },
          ]} />
      </g>

      {/* 10: AGENT RUNTIME */}
      <g opacity={isActive(10) ? 1 : 0.18}>
        <Box x={605} y={345} w={477} h={95} color={COLORS.agent}
          label="Agentic Runtime — AgentCore / EKS Fargate" sublabel="Claim-enriched requests only · Zero auth logic inside agents" icon="[A]"
          badges={[
            { color: COLORS.agent, label: "LangGraph" },
            { color: "#38bdf8",    label: "CrewAI" },
            { color: "#7dd3fc",    label: "AutoGen" },
            { color: "#bae6fd",    label: "Sem.Kernel" },
          ]} />
      </g>

      {/* 11: SPIRE */}
      <g opacity={op(11)}>
        <Box x={375} y={390} w={210} h={80} color={COLORS.spire}
          label="SPIRE Server" sublabel="Workload identity · SVID" icon="[S]"
          badges={[
            { color: COLORS.spire, label: "SPIFFE" },
            { color: "#fbbf24",    label: "x509" },
            { color: "#fcd34d",    label: "JWT-SVID" },
          ]} />
      </g>

      {/* 12: BEDROCK */}
      <g opacity={op(12)}>
        <Box x={605} y={498} w={205} h={68} color={COLORS.bedrock}
          label="Amazon Bedrock" sublabel="Models via VPC endpoint" icon="[B]"
          badges={[
            { color: COLORS.bedrock, label: "Claude" },
            { color: "#c084fc",      label: "VPC EP" },
          ]} />
      </g>

      {/* SECRETS MANAGER */}
      <Box x={828} y={498} w={254} h={68} color="#059669"
        label="Secrets Manager / SSM" sublabel="Cert storage · Keycloak secrets" icon="[V]"
        badges={[
          { color: "#059669", label: "KMS" },
          { color: "#34d399", label: "Rotation" },
        ]} />

      {/* CLOUDTRAIL */}
      <Box x={605} y={614} w={210} h={65} color="#6366f1"
        label="CloudTrail + OTEL" sublabel="Auth audit log · Distributed trace" icon="[L]"
        badges={[
          { color: "#6366f1", label: "Audit" },
          { color: "#818cf8", label: "OTEL" },
        ]} />

      {/* ── ARROWS ─────────────────────────────────────── */}

      {/* 1: User → Entra (up) */}
      <g opacity={op(1)}>
        <Arrow x1={165} y1={152} x2={165} y2={127} color={sc(1)} step={1} />
      </g>

      {/* 2: Entra → User (down) */}
      <g opacity={op(2)}>
        <Arrow x1={190} y1={127} x2={190} y2={152} color={sc(2)} step={2} />
      </g>

      {/* 3: User → ALB */}
      <g opacity={op(3)}>
        <BentArrow points={[[330, 172], [605, 85]]} color={sc(3)} step={3} />
      </g>

      {/* 4: ALB → Envoy */}
      <g opacity={op(4)}>
        <Arrow x1={697} y1={115} x2={697} y2={148} color={sc(4)} step={4} />
      </g>

      {/* 5: Envoy → Redis */}
      <g opacity={op(5)}>
        <BentArrow points={[[605, 218], [585, 297], [585, 297]]} color={sc(5)} step={5} dashed />
      </g>

      {/* 6: EventBridge → Redis */}
      <g opacity={op(6)}>
        <Arrow x1={480} y1={115} x2={480} y2={265} color={sc(6)} step={6} dashed />
      </g>

      {/* 7: Keycloak ← Entra (federation) */}
      <g opacity={op(7)}>
        <BentArrow points={[[375, 178], [165, 178]]} color={sc(7)} step={7} dashed />
      </g>

      {/* 8: Envoy → OPA */}
      <g opacity={op(8)}>
        <Arrow x1={860} y1={208} x2={882} y2={208} color={sc(8)} step={8} />
      </g>

      {/* 9: OPA → Envoy (decision) */}
      <g opacity={op(9)}>
        <Arrow x1={882} y1={228} x2={860} y2={228} color={sc(9)} step={9} />
      </g>

      {/* 10: Envoy → Agent Runtime */}
      <g opacity={op(10)}>
        <Arrow x1={732} y1={288} x2={732} y2={345} color={sc(10)} step={10} />
      </g>

      {/* 11: SPIRE → Agent Runtime */}
      <g opacity={op(11)}>
        <BentArrow points={[[585, 420], [605, 405]]} color={sc(11)} step={11} dashed />
      </g>

      {/* 12: Agent → Bedrock */}
      <g opacity={op(12)}>
        <Arrow x1={707} y1={440} x2={707} y2={498} color={sc(12)} step={12} />
      </g>

      {/* Keycloak → Redis (internal sync) */}
      <g opacity={0.3}>
        <Arrow x1={480} y1={230} x2={480} y2={265} color={COLORS.cache} />
      </g>

      {/* Agent → CloudTrail (audit) */}
      <g opacity={0.22}>
        <Arrow x1={707} y1={440} x2={707} y2={614} color="#6366f1" dashed />
      </g>

      {/* ── LEGEND ────────────────────────────────────── */}
      <rect x={30} y={235} width={310} height={52} rx={8}
        fill="#060606" stroke="#374151" strokeWidth={1} />
      <text x={48} y={257} fontSize={10} fill="#6b7280">
        solid  —  VPC-internal (zero internet)
      </text>
      <text x={48} y={275} fontSize={10} fill="#6b7280">
        dashed  -  Scheduled / async (not per-request)
      </text>

      {/* FOOTER */}
      <text x={550} y={754} textAnchor="middle" fontSize={12}
        fill={COLORS.muted} fontWeight={600} letterSpacing={1}>
        Bank Agentic Platform · Zero-Internet Auth · Keycloak + Envoy + OPA on AWS
      </text>
    </svg>
  );
}

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <div style={{
      background: "#020817",
      minHeight: "100vh",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      color: "#e2e8f0",
      padding: "24px",
    }}>

      {/* Header */}
      <div style={{ marginBottom: 20, borderBottom: "1px solid #1e293b", paddingBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{
            background: "linear-gradient(135deg, #0078d4, #ff9900)",
            borderRadius: 6, padding: "4px 12px",
            fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#000",
          }}>BANK · CLASSIFIED</div>
          <div style={{ color: "#64748b", fontSize: 11 }}>
            AGENTIC PLATFORM · AUTH ARCHITECTURE v1.0
          </div>
        </div>
        <h1 style={{ margin: 0, fontSize: 21, fontWeight: 800, letterSpacing: -0.5, color: "#f8fafc" }}>
          Zero-Internet Auth: Keycloak + Envoy + OPA
        </h1>
        <p style={{ margin: "5px 0 0", color: "#64748b", fontSize: 12 }}>
          Azure Entra ID to AWS VPC · AgentCore Runtime · SPIFFE/SPIRE Workload Identity
        </p>
      </div>

      {/* Main layout */}
      <div style={{ display: "flex", gap: 20 }}>

        {/* Diagram */}
        <div style={{
          flex: 1, border: "1px solid #1e293b", borderRadius: 12,
          overflow: "hidden", boxShadow: "0 0 40px rgba(0,0,0,0.6)",
        }}>
          <ArchDiagram activeStep={activeStep} />
        </div>

        {/* Steps panel */}
        <div style={{ width: 305, flexShrink: 0 }}>
          <div style={{
            background: "#0d1f3c", border: "1px solid #1e293b",
            borderRadius: 12, overflow: "hidden",
          }}>
            <div style={{
              padding: "11px 14px", borderBottom: "1px solid #1e293b",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#64748b" }}>
                DATA FLOW STEPS
              </span>
              <button onClick={() => setActiveStep(0)} style={{
                background: activeStep === 0 ? "#1e293b" : "transparent",
                border: "1px solid #334155", borderRadius: 6,
                color: "#94a3b8", fontSize: 10, padding: "3px 10px", cursor: "pointer",
              }}>Show All</button>
            </div>

            <div style={{ maxHeight: 640, overflowY: "auto" }}>
              {steps.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setActiveStep(activeStep === s.id ? 0 : s.id)}
                  onMouseEnter={() => setHoveredStep(s.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  style={{
                    padding: "10px 14px",
                    borderBottom: "1px solid #0f172a",
                    cursor: "pointer",
                    background: activeStep === s.id
                      ? s.color + "11"
                      : hoveredStep === s.id ? "#0f172a" : "transparent",
                    transition: "background 0.15s",
                    display: "flex", gap: 11, alignItems: "flex-start",
                  }}
                >
                  <FlowBadge n={s.id} color={s.color} />
                  <span style={{
                    fontSize: 11, lineHeight: 1.6,
                    color: activeStep === s.id ? "#f1f5f9" : "#94a3b8",
                  }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Guarantees */}
          <div style={{
            marginTop: 12, background: "#0d1f3c", border: "1px solid #1e293b",
            borderRadius: 12, padding: "13px 14px",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#64748b", marginBottom: 9 }}>
              KEY GUARANTEES
            </div>
            {[
              { icon: "🔒", label: "Zero internet calls at agent runtime",  color: "#4ade80" },
              { icon: "🛡️", label: "No Cognito, no AgentCore Identity",     color: "#60a5fa" },
              { icon: "📋", label: "Claims-based AuthZ via OPA Rego",       color: "#f87171" },
              { icon: "⚡", label: "JWKS validated offline from Redis",      color: "#facc15" },
              { icon: "🔐", label: "Agent-to-agent via SPIFFE SVIDs",        color: "#fb923c" },
              { icon: "📊", label: "Full audit trail in CloudTrail",         color: "#a78bfa" },
            ].map((g, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: 14 }}>{g.icon}</span>
                <span style={{ fontSize: 11, color: g.color }}>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component registry */}
      <div style={{
        marginTop: 18, background: "#0d1f3c", border: "1px solid #1e293b",
        borderRadius: 12, overflow: "hidden",
      }}>
        <div style={{ padding: "9px 14px", borderBottom: "1px solid #1e293b" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#64748b" }}>
            COMPONENT REGISTRY
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { name: "Azure Entra ID",    role: "Upstream IdP",         tool: "OIDC / SAML",                color: COLORS.azure    },
            { name: "Keycloak",          role: "Internal Broker",      tool: "EKS / ECS Fargate + RDS",    color: COLORS.keycloak },
            { name: "Envoy Proxy",       role: "Auth Proxy / Sidecar", tool: "JWT filter + ext_authz",     color: COLORS.envoy    },
            { name: "OPA + Rego",        role: "Policy Engine",        tool: "RBAC · ABAC · Cedar",        color: COLORS.opa      },
            { name: "ElastiCache Redis", role: "JWKS Key Cache",       tool: "TTL=6h, offline validation", color: COLORS.cache    },
            { name: "SPIRE Server",      role: "Workload Identity",    tool: "SPIFFE · x509 · JWT-SVID",   color: COLORS.spire    },
            { name: "AgentCore / EKS",   role: "Agent Runtime",        tool: "LangGraph · CrewAI · AutoGen",color: COLORS.agent   },
            { name: "Amazon Bedrock",    role: "LLM Models",           tool: "VPC Endpoint, no internet",  color: COLORS.bedrock  },
          ].map((c, i) => (
            <div key={i} style={{
              padding: "11px 14px",
              borderRight: i % 4 !== 3 ? "1px solid #0f172a" : "none",
              borderBottom: i < 4 ? "1px solid #0f172a" : "none",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.color, marginBottom: 3 }}>{c.name}</div>
              <div style={{ fontSize: 10, color: "#64748b", marginBottom: 2 }}>{c.role}</div>
              <div style={{ fontSize: 10, color: "#475569" }}>{c.tool}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
