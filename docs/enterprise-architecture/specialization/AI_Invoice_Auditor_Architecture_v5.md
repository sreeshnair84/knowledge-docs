---
title: "1. What Changed in v5.0 — Executive Summary"
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
source_type: converted-pdf
framework_name: ""
doc_type: guide
covers_version: "N/A"
source_file: ""
tags: ["enterprise-architecture", "specialization"]
---
**AGENTIC AI · CAPSTONE PROJECT**
**AI Invoice Auditor**
Enterprise Architecture & Complete Requirements Specification
**v5.0 — No-Docker Windows · SQLite-First · LangChain HITL Middleware · Handoffs · Skills · Runtime · Memory**

| Attribute | Value |
| --- | --- |
| Document Version | 5.0 — March 2026 | Supersedes v4.0 |
| Deployment Target | Single Windows 11 Machine — zero Docker, zero cloud services required |
| Checkpointer | SQLite (langgraph-checkpoint-sqlite) — replaces PostgreSQL/MemorySaver |
| Observability | SQLite MetricsDB only — replaces LangFuse/Docker |
| 🆕 New in v5.0 | HumanInTheLoopMiddleware (approve/edit/reject) · SQLite checkpointer · Short+Long-term memory (SQLite store) · Multi-agent Handoffs · Skills as prompt tools · Runtime context injection |

# 1. What Changed in v5.0 — Executive Summary
v5.0 is a targeted ground-up rewrite of the runtime-layer choices made in v3/v4, driven by the constraint of running entirely on a single Windows machine with no Docker or cloud services. Simultaneously, all agent patterns have been upgraded to match the current LangChain 0.3+ official documentation for HITL middleware, multi-agent handoffs, skill loading, runtime injection, and long-term memory.

| Area | Was (v4) | Now (v5) |
| --- | --- | --- |
| HITL | interrupt_before=[...] compile-time + HITLMiddleware class | HumanInTheLoopMiddleware with interrupt_on={} + approve/edit/reject decisions via Command(resume=...) |
| Checkpointer | PostgresSaver (Docker required) | SqliteSaver from langgraph-checkpoint-sqlite — single .db file, no server |
| Observability | LangFuse (Docker) + SQLite dual-write | SQLite MetricsDB only — LangFuse removed entirely |
| Short-term memory | ConversationBufferWindowMemory (Redis required) | AgentState messages list — in-context, no server needed |
| Long-term memory | Not specified | SqliteStore (langgraph.store.sqlite) — namespaced key-value, accessed via ToolRuntime.store |
| Skills | Class-based Skill(ABC) with run() method | Prompt-driven tools using load_skill() progressive disclosure — per official LangChain Skills docs |
| Handoffs | Not implemented | Single-agent middleware pattern: tools return Command(update={current_step:...}) to transition between invoice processing stages |
| Runtime context | Global config objects + manual threading | context_schema + ToolRuntime[Context] — LangChain dependency injection per official Runtime docs |
| Docker | Required (LangFuse, PostgreSQL, Redis) | Eliminated entirely — all services run as native Windows Python processes |

## **2. SQLite-First Infrastructure — No Docker Required**

## **2.1 Three SQLite Files — One Per Concern**

The entire v5.0 persistence layer uses three SQLite database files stored locally on the Windows machine. No servers, no Docker containers, no network dependencies.

| File | Path (Windows) | Purpose |
| --- | --- | --- |
| checkpoints.db | %APPDATA%\InvoiceAuditor\checkpoints.db | LangGraph graph state — SqliteSaver checkpointer. Survives process restarts. Required for HITL interrupt/resume. |
| store.db | %APPDATA%\InvoiceAuditor\store.db | Long-term memory store — SqliteStore. Per-invoice decisions, auditor preferences, vendor history, approved override patterns. |
| metrics.db | %APPDATA%\InvoiceAuditor\metrics.db | Observability — all agent node timings, MCP tool call timings, HITL decisions, RAG scores. Queried by Observability UI page. |

## **2.2 SQLite Checkpointer Setup**

## src/core/persistence.py  — v5.0

from pathlib import Path
import os
from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.store.sqlite import SqliteStore          # long-term memory

## Windows-safe APPDATA path

APP_DIR = Path(os.getenv('APPDATA', Path.home())) / 'InvoiceAuditor'
APP_DIR.mkdir(parents=True, exist_ok=True)

CHECKPOINTS_DB = APP_DIR / 'checkpoints.db'
STORE_DB       = APP_DIR / 'store.db'
METRICS_DB     = APP_DIR / 'metrics.db'

## SqliteSaver — drop-in replacement for PostgresSaver / MemorySaver

## Thread-safe, file-based, zero config

checkpointer = SqliteSaver.from_conn_string(str(CHECKPOINTS_DB))

## SqliteStore — long-term memory (namespaced key-value)

## Supports vector search when an embed function is provided

from sentence_transformers import SentenceTransformer
_embed_model = SentenceTransformer('all-MiniLM-L6-v2')

def _embed(texts: list[str]) -> list[list[float]]:
    return_embed_model.encode(texts).tolist()

store = SqliteStore.from_conn_string(
    str(STORE_DB),
    index={'embed':_embed, 'dims': 384}  # MiniLM dims
)

## **2.3 Port Map — All Native Windows Processes**

With Docker removed, every service is a native Windows Python process or .exe. The entire system starts from one .bat file.

| Port | Service | Process Type | Notes |
| --- | --- | --- | --- |
| 8501 | Streamlit UI | Python (native) | All 6 UI pages — opens in browser automatically |
| 8502 | Chat API Gateway | Python uvicorn | /chat /stream /hitl /dashboard |
| 8000 | ERP Mock API | Python uvicorn | GET /purchase-orders/{po_id} |
| 9000 | MCP Tool Server | Python (Fast MCP) | 11 MCP tools registered |
| 11434 | Ollama | Windows exe | Local LLM — llama3/mistral. No internet needed after pull. |
| ✅ None | SQLite files | File system | checkpoints.db / store.db / metrics.db in %APPDATA%\InvoiceAuditor\ |

## **2.4 start_all.bat — v5.0 (Docker-Free)**

@echo off
SETLOCAL
SET ROOT=%~dp0
SET VENV=%ROOT%.venv\Scripts

echo [1/5] Starting Ollama...
start "Ollama" /MIN ollama serve
timeout /t 5 /nobreak > nul

echo [2/5] Pulling model if needed...
ollama pull llama3 2>nul

echo [3/5] Starting MCP Tool Server (port 9000)...
start "MCP Server" /MIN cmd /c "%VENV%\python.exe tools\mcp_server.py"
timeout /t 3 /nobreak > nul

echo [4/5] Starting ERP Mock API (port 8000)...
start "ERP Mock" /MIN cmd /c "%VENV%\uvicorn.exe erp_mock.main:app --port 8000"
timeout /t 3 /nobreak > nul

echo [5/5] Starting Streamlit UI (port 8501)...
start "Streamlit" cmd /c "%VENV%\streamlit.exe run ui\app.py"

echo ─────────────────────────────────────────────────────────────────
echo  All services started (no Docker required)
echo  UI:      <http://localhost:8501>
echo  ERP API: <http://localhost:8000/docs>
echo  SQLite:  %APPDATA%\InvoiceAuditor\
echo ─────────────────────────────────────────────────────────────────
pause

## **3. Human-in-the-Loop — HumanInTheLoopMiddleware (v5.0)**

Source: *<https://docs.langchain.com/oss/python/langchain/human-in-the-loop>*

## **3.1 How It Works — Official Pattern**

The official LangChain HITL pattern uses **HumanInTheLoopMiddleware** added to the agent's **middleware** list at creation time. The middleware intercepts tool calls after the model generates them but before execution. If a tool matches **interrupt_on**, it raises an **interrupt** and the graph state is saved to the SQLite checkpointer. The UI then presents the action and collects a decision (**approve**, **edit**, or **reject**). Execution resumes via **Command(resume={"decisions":[...]})** with the same thread_id.

| Decision Type | Symbol | Invoice Auditor Meaning |
| --- | --- | --- |
| approve | ✅ Execute as-is | Auditor confirms discrepancy is acceptable — run approve_invoice tool as proposed |
| edit | ✏️ Modify args first | Auditor corrects a field value before approval — e.g. change override amount |
| reject | ❌ Cancel + feedback | Auditor rejects invoice — message fed back to agent to generate rejection report |

## **3.2 Agent Creation with HumanInTheLoopMiddleware**

## src/agents/invoice_audit_agent.py  — v5.0

from langchain.agents import create_agent, AgentState
from langchain.agents.middleware import HumanInTheLoopMiddleware
from src.core.persistence import checkpointer, store
from src.core.llm_factory import get_llm
from src.tools.invoice_tools import (
    approve_invoice, reject_invoice, override_invoice_field,
    flag_for_escalation
)

class InvoiceAuditState(AgentState):
    """Short-term memory lives here — the messages list IS the conversation.
    Between turns the SqliteSaver checkpointer persists this automatically.
    """
    invoice_id:         str
    current_step:       str   = 'triage'   # used by Handoffs (Section 4)
    discrepancies:      list  = []
    confidence:         float = 0.0
    final_status:       str   = ''
    auditor_id:         str   = ''

## ── Tools that require human approval before execution ─────────────────

## approve_invoice  — approve payment: high-stakes, all decisions allowed

## reject_invoice   — reject vendor:   approve or reject only, no edit

## override_invoice_field — field edit: must edit before execution

## flag_for_escalation   — safe: auto-approve, no human needed

audit_agent = create_agent(
    model=get_llm(),                   # Ollama llama3 via LLMFactory
    tools=[
        approve_invoice,
        reject_invoice,
        override_invoice_field,
        flag_for_escalation,
    ],
    state_schema=InvoiceAuditState,
    context_schema=InvoiceContext,     # Runtime dependency injection (Section 5)
    store=store,                       # Long-term memory (Section 6)
    middleware=[
        HumanInTheLoopMiddleware(
            interrupt_on={
                # Approve/edit/reject: auditor gets full control
                'approve_invoice': True,
                # No editing allowed — approve or reject only
                'reject_invoice': {
                    'allowed_decisions': ['approve', 'reject'],
                    'description': 'Confirm invoice rejection before notifying vendor',
                },
                # Must provide corrected values — edit required
                'override_invoice_field': {
                    'allowed_decisions': ['edit', 'reject'],
                    'description': 'Review field override — edit values if incorrect',
                },
                # Safe operation — no human needed
                'flag_for_escalation': False,
            },
            description_prefix='Invoice audit action requires auditor approval',
        ),
    ],
    checkpointer=checkpointer,  # SqliteSaver — persists state for resume
    system_prompt=(
        'You are an invoice audit agent. Review flagged invoices and take ',
        'appropriate actions. Always explain your reasoning before calling a tool.'
    ),
)

## **3.3 Invoking the Agent — Interrupt & Resume Flow**

## src/agents/hitl_runner.py  — v5.0

from langgraph.types import Command
from src.agents.invoice_audit_agent import audit_agent
from src.observability.metrics_db import MetricsDB
import time

metrics = MetricsDB()

def run_audit(invoice_id: str, discrepancies: list, auditor_id: str):
    """Run agent until interrupt, then return interrupt payload to UI."""
    thread_id = f'audit:{invoice_id}'
    config    = {'configurable': {'thread_id': thread_id}}

    t0 = time.perf_counter()
    result = audit_agent.invoke(
        {
            'messages': [{'role': 'user',
                          'content': f'Review invoice {invoice_id}. '
                                     f'Discrepancies: {discrepancies}'}],
            'invoice_id':   invoice_id,
            'discrepancies': discrepancies,
            'auditor_id':   auditor_id,
        },
        config=config,
    )

    # Log HITL interrupt to SQLite metrics
    if '__interrupt__' in result:
        metrics.log_hitl_interrupt(
            invoice_id=invoice_id,
            thread_id=thread_id,
            actions=[a['name'] for a in
                     result['__interrupt__'][0].value['action_requests']],
            elapsed_ms=int((time.perf_counter()-t0)*1000)
        )
    return result

def resume_audit(invoice_id: str, decisions: list, auditor_id: str):
    """Resume after human provides decisions (approve / edit / reject).
    Called by Chat API Gateway POST /hitl/{invoice_id}/decision
    """
    thread_id = f'audit:{invoice_id}'
    config    = {'configurable': {'thread_id': thread_id}}
    t0 = time.perf_counter()

    result = audit_agent.invoke(
        Command(resume={'decisions': decisions}),
        config=config,  # same thread_id — SqliteSaver restores full state
    )

    metrics.log_hitl_decision(
        invoice_id=invoice_id,
        auditor_id=auditor_id,
        decisions=decisions,
        elapsed_ms=int((time.perf_counter()-t0)*1000)
    )
    return result

def stream_audit(invoice_id: str, discrepancies: list, auditor_id: str):
    """Streaming variant — yields AG-UI compatible events.
    Streamlit Chat screen uses this via httpx.stream.
    """
    thread_id = f'audit:{invoice_id}'
    config    = {'configurable': {'thread_id': thread_id}}

    for mode, chunk in audit_agent.stream(
        {'messages': [{'role': 'user',
                       'content': f'Review invoice {invoice_id}'}],
         'invoice_id': invoice_id,
         'discrepancies': discrepancies},
        config=config,
        stream_mode=['updates', 'messages'],
    ):
        if mode == 'messages':
            token, _ = chunk
            if token.content:
                yield {'type': 'TextDelta', 'delta': token.content}
        elif mode == 'updates' and '__interrupt__' in chunk:
            yield {'type': 'HumanInputRequired',
                   'interrupt': chunk['__interrupt__']}

## **3.4 Streamlit HITL Review Page — Decision UI**

## ui/pages/3_HITL_Review.py  — v5.0

import streamlit as st
import httpx, json

st.title('✅ HITL Review — Invoice Audit Decisions')

invoice_id = st.selectbox('Invoice awaiting review', get_pending_hitl_invoices())

if invoice_id:
    # Load the interrupt payload from Chat API Gateway
    interrupt_data = httpx.get(
        f'<http://localhost:8502/hitl/{invoice_id}/interrupt').json(>)

    for i, action in enumerate(interrupt_data['action_requests']):
        st.subheader(f'Action {i+1}: {action["name"]}')
        st.json(action['arguments'])
        st.markdown(f'**Review guidance:** {action["description"]}')

        review_cfg  = interrupt_data['review_configs'][i]
        allowed     = review_cfg['allowed_decisions']
        decision    = st.radio(f'Decision for {action["name"]}',
                               allowed, horizontal=True, key=f'dec_{i}')

        edited_args = None
        if decision == 'edit':
            st.markdown('**Edit arguments:**')
            edited_args = {}
            for k, v in action['arguments'].items():
                edited_args[k] = st.text_input(k, value=str(v), key=f'edit_{i}_{k}')

        reject_msg = None
        if decision == 'reject':
            reject_msg = st.text_area('Rejection reason (required)',
                                      min_chars=10, key=f'msg_{i}')

    if st.button('Submit Decision', type='primary'):
        decisions = []
        for i, action in enumerate(interrupt_data['action_requests']):
            d = {'type': st.session_state[f'dec_{i}']  }
            if d['type'] == 'edit':
                d['edited_action'] = {'name': action['name'],
                                      'args': {k: st.session_state[f'edit_{i}_{k}']
                                               for k in action['arguments']}}
            elif d['type'] == 'reject':
                d['message'] = st.session_state[f'msg_{i}']
            decisions.append(d)

        httpx.post(f'http://localhost:8502/hitl/{invoice_id}/decision',
                   json={'decisions': decisions,
                         'auditor_id': st.session_state.auditor_id})
        st.success('Decision submitted — graph resuming...')
        st.rerun()

## **4. Multi-Agent Handoffs — Invoice Processing Stages**

Source: *<https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs>*

## **4.1 Why Handoffs Fit Invoice Processing**

The official LangChain handoffs pattern is ideal for the Invoice Auditor because invoice processing is a **sequential, state-driven flow** where each stage unlocks the next only when preconditions are met (e.g., extraction must succeed before translation; translation must reach 0.80 confidence before validation). The **single-agent middleware approach** is used here — one agent changes its system prompt and available tools based on the **current_step** state variable, updated by handoff tools returning **Command(update={...})**.

## **4.2 Invoice Processing Stages via Handoffs**

| current_step | Agent Configuration | Handoff Tool → Next Step |
| --- | --- | --- |
| triage | Detect format + language; read meta.json | complete_triage() → 'extraction' |
| extraction | Run data_harvester MCP tool per format | complete_extraction(confidence) → 'translation' (non-EN) or 'validation' |
| translation | Translate non-English fields via LLM | complete_translation(confidence) → 'validation' if ≥0.80 else 'hitl' |
| validation | Check completeness + ERP cross-validation | complete_validation(result) → 'reporting' if auto-approve else 'hitl' |
| hitl | HumanInTheLoopMiddleware active — approve/edit/reject tools exposed | HITL decision → 'reporting' |
| reporting | Generate HTML report + index to FAISS | End of pipeline |

## **4.3 Handoff Implementation — Single Agent Middleware**

## src/agents/pipeline_agent.py  — v5.0 Handoffs pattern

from langchain.agents import AgentState, create_agent
from langchain.agents.middleware import wrap_model_call, ModelRequest, ModelResponse
from langchain.tools import tool, ToolRuntime
from langchain.messages import ToolMessage
from langchain.agents.middleware import HumanInTheLoopMiddleware
from langgraph.types import Command
from src.core.persistence import checkpointer, store
from src.core.llm_factory import get_llm
from typing import Callable

## ── State carries current_step across all turns ────────────────────────

class InvoicePipelineState(AgentState):
    invoice_id:             str
    raw_file_path:          str
    current_step:           str   = 'triage'
    language:               str   = 'en'
    extraction_confidence:  float = 0.0
    translation_confidence: float = 0.0
    discrepancies:          list  = []
    flags:                  list  = []
    final_status:           str   = ''

## ── Handoff tools — each updates current_step via Command ──────────────

@tool
def complete_triage(
    detected_language: str,
    file_format: str,
    """Complete triage stage and hand off to extraction."""
            content=f'Triage complete: {file_format} invoice in {detected_language}',
        )],
        'language':     detected_language,
        'current_step': 'extraction',
    })

@tool
def complete_extraction(
    confidence: float,
    """Complete extraction and route to translation (non-EN) or validation."""
    next_step = 'translation' if runtime.state.get('language','en') != 'en' else 'validation'
            content=f'Extraction complete. Confidence={confidence:.2f}. Next: {next_step}',
        )],
        'extraction_confidence': confidence,
        'current_step': next_step,
    })

@tool
def complete_translation(
    translation_confidence: float,
    """Complete translation. Route to HITL if confidence < 0.80."""
    next_step = 'validation' if translation_confidence >= 0.80 else 'hitl'
            content=f'Translation confidence={translation_confidence:.2f}. Routing to {next_step}.',
        )],
        'translation_confidence': translation_confidence,
        'current_step': next_step,
    })

@tool
def complete_validation(
    discrepancies: list,
    confidence: float,
    """Complete validation. Auto-approve if confidence>=0.95 and no discrepancies."""
    if confidence >= 0.95 and not discrepancies:
        next_step, status = 'reporting', 'auto_approved'
    else:
        next_step, status = 'hitl', 'needs_review'
            content=f'Validation: {len(discrepancies)} discrepancies. Status={status}.',
        )],
        'discrepancies': discrepancies,
        'final_status':  status,
        'current_step':  next_step,
    })

## ── Stage configuration map ────────────────────────────────────────────

STAGE_CONFIGS = {
    'triage': {
        'prompt': 'Detect the invoice language and format. Call complete_triage when done.',
        'tools':  [complete_triage],
    },
    'extraction': {
        'prompt': 'Extract invoice fields using the data_harvester MCP tool. Call complete_extraction.',
        'tools':  [complete_extraction],
    },
    'translation': {
        'prompt': 'Translate non-English invoice fields to English. Call complete_translation.',
        'tools':  [complete_translation],
    },
    'validation': {
        'prompt': 'Validate completeness and cross-check with ERP. Call complete_validation.',
        'tools':  [complete_validation],
    },
    'hitl': {
        'prompt': 'An invoice requires human review. Present findings and await auditor decision.',
        'tools':  [],   # HumanInTheLoopMiddleware adds approve/reject/override
    },
    'reporting': {
        'prompt': 'Generate the HTML audit report and index the invoice.',
        'tools':  [],
    },
}

## ── Middleware: apply stage config based on current_step ───────────────

@wrap_model_call
def apply_stage_config(
    request: ModelRequest,
    handler: Callable[[ModelRequest], ModelResponse],
) -> ModelResponse:
    step   = request.state.get('current_step', 'triage')
    config = STAGE_CONFIGS[step]
    request = request.override(
        system_prompt=config['prompt'],
        tools=config['tools'],
    )
    return handler(request)

## ── Pipeline agent — single agent, all stages ──────────────────────────

pipeline_agent = create_agent(
    model=get_llm(),
    tools=[
        complete_triage, complete_extraction,
        complete_translation, complete_validation,
    ],
    state_schema=InvoicePipelineState,
    context_schema=InvoiceContext,
    store=store,
    middleware=[
        apply_stage_config,          # dynamic config based on current_step
        HumanInTheLoopMiddleware(    # HITL only active in 'hitl' stage
            interrupt_on={
                'approve_invoice': True,
                'reject_invoice':  {'allowed_decisions': ['approve','reject']},
                'override_invoice_field': {'allowed_decisions': ['edit','reject']},
                'flag_for_escalation': False,
            },
            description_prefix='Invoice requires auditor decision',
        ),
    ],
    checkpointer=checkpointer,
)

## **5. Runtime Context Injection**

Source: *<http://docs.langchain.com/oss/python/langchain/runtime>*

LangChain's Runtime provides dependency injection for tools and middleware. Instead of global config objects, database connections and request-scoped values are declared in a **context_schema** dataclass and injected via **ToolRuntime[Context]**. This makes all tools testable in isolation and eliminates thread-safety issues from shared mutable state.

## **5.1 InvoiceContext — Dependency Schema**

## src/context.py  — v5.0

from dataclasses import dataclass
from src.protocols.mcp_client import InstrumentedMCPClient
from src.observability.metrics_db import MetricsDB

@dataclass
class InvoiceContext:
    """All dependencies for an invoice audit run.
    Passed at invocation time — injected into every tool via ToolRuntime.
    """
    run_id:     str                      # unique per pipeline invocation
    invoice_id: str                      # current invoice being processed
    auditor_id: str = ''                 # set when human is involved
    mcp:        InstrumentedMCPClient = None  # MCP tool client (instrumented)
    metrics:    MetricsDB = None          # SQLite metrics writer
    erp_base_url: str = '<http://localhost:8000>'

## **5.2 Using ToolRuntime in MCP Tool Wrappers**

## src/tools/invoice_tools.py  — v5.0

import time
from langchain.tools import tool, ToolRuntime

@tool
def data_harvester_tool(
    file_path: str,
) -> dict:
    """Extract invoice data from PDF/DOCX/PNG using MCP data_harvester tool.

    The ToolRuntime injects the MCP client and metrics writer automatically.
    No global state is used.
    """
    mcp     = runtime.context.mcp
    metrics = runtime.context.metrics
    run_id  = runtime.context.run_id

    t0 = time.perf_counter()
    result = mcp.invoke_tool('data_harvester', {'file_path': file_path}, run_id)
    elapsed = int((time.perf_counter() - t0) * 1000)

    if metrics:
        metrics.log_tool_call(
            run_id=run_id,
            tool_name='data_harvester',
            duration_ms=elapsed,
            status='ok' if result else 'error',
        )
    return result

@tool
def approve_invoice(
    invoice_id: str,
    reason: str,
    """Approve an invoice for payment. Requires HITL approval before execution.

    This tool is intercepted by HumanInTheLoopMiddleware — the auditor
    must approve, edit, or reject it before it executes.
    """
    # Write approval to long-term memory store
    if runtime.store:
        runtime.store.put(
            ('invoices', 'decisions'),
            invoice_id,
            {'action': 'approved', 'reason': reason,
             'auditor': runtime.context.auditor_id}
        )
    return f'Invoice {invoice_id} approved. Reason: {reason}'

## **5.3 Agent Invocation with Context**

## Invoking the pipeline agent with full context injection

from src.agents.pipeline_agent import pipeline_agent
from src.protocols.mcp_client import InstrumentedMCPClient
from src.observability.metrics_db import MetricsDB
import uuid

run_id = str(uuid.uuid4())

result = pipeline_agent.invoke(
    {'messages': [{'role': 'user',
                   'content': f'Process invoice docs/incoming/INV_ES_003.pdf'}],
     'invoice_id': 'INV-ES-003',
     'raw_file_path': 'docs/incoming/INV_ES_003.pdf'},
    config={'configurable': {'thread_id': f'pipeline:INV-ES-003'}},
    context=InvoiceContext(
        run_id=run_id,
        invoice_id='INV-ES-003',
        mcp=InstrumentedMCPClient(host='localhost', port=9000),
        metrics=MetricsDB(),
    ),
)

## **6. Short-Term & Long-Term Memory**

Sources: *<https://docs.langchain.com/oss/python/langchain/short-term-memory>*  |  *<https://docs.langchain.com/oss/python/langchain/long-term-memory>*

## **6.1 Two Memory Tiers — Clear Separation**

| Tier | LangChain Mechanism | Invoice Auditor Usage |
| --- | --- | --- |
| Short-term | AgentState.messages list — persisted per thread in SqliteSaver checkpointer | All conversation turns within a single invoice run. Auditor chat history. Agent reasoning and tool call results in context window. |
| Long-term | SqliteStore via langgraph.store.sqlite — namespaced key-value, vector-searchable | Approved override patterns across invoices. Auditor preference profiles. Vendor risk history. Past HITL decisions (ground-truth for future auto-approval tuning). |

## **6.2 Short-Term Memory — AgentState**

Short-term memory requires no special setup. The **AgentState.messages** list is automatically persisted to the SQLite checkpointer between invocations. When the agent is resumed (after HITL interrupt or across separate API calls), the **thread_id** in config is used to reload the full message history from checkpoints.db.

## Short-term memory is automatic via SqliteSaver + thread_id

## The agent remembers everything within a conversation thread

## Turn 1 — initial processing

result1 = pipeline_agent.invoke(
    {'messages': [{'role':'user','content':'Process INV-1001'}]},
    config={'configurable': {'thread_id': 'pipeline:INV-1001'}},
    context=ctx,
)

## Turn 2 — after HITL decision (SqliteSaver restores all state automatically)

result2 = pipeline_agent.invoke(
    Command(resume={'decisions': [{'type': 'approve'}]}),
    config={'configurable': {'thread_id': 'pipeline:INV-1001'}},  # same thread
    context=ctx,
)

## Agent has full context of turn 1 — no state passed manually

## **6.3 Long-Term Memory — SqliteStore**

Long-term memory is stored in store.db using LangGraph's **SqliteStore**. It is organised by namespace tuples (like folders) and keys. Tools access it via **runtime.store** — the same store instance passed to **create_agent(store=store)**. Vector search is enabled for semantic recall.

## src/memory/long_term.py  — v5.0 memory namespaces

from src.core.persistence import store

## ── Namespace design ─────────────────────────────────────────────────

## ('vendors', vendor_id)       → vendor risk profile + payment history

## ('invoices', 'decisions')    → all HITL decisions per invoice_id key

## ('auditors', auditor_id)     → auditor preference + override patterns

## ('patterns', 'overrides')    → approved override templates by type

@tool
def recall_vendor_history(
    vendor_id: str,
    """Look up this vendor's past invoice decisions from long-term memory.

    Used by validation stage to auto-adjust confidence thresholds
    for trusted vendors with clean payment history.
    """
    if not runtime.store:
        return 'No vendor history available (store not initialised)'

    vendor_mem = runtime.store.get(('vendors',), vendor_id)
    if vendor_mem:
        return str(vendor_mem.value)
    return f'No prior history for vendor {vendor_id}'

@tool
def save_audit_decision(
    invoice_id: str,
    action: str,
    reason: str,
    override_fields: dict,
    """Save HITL decision to long-term memory.

    Future pipeline runs can query past decisions to improve
    auto-approval thresholds and detect repeat issues.
    """
    if runtime.store:
        runtime.store.put(
            ('invoices', 'decisions'),
            invoice_id,
            {
                'action':          action,
                'reason':          reason,
                'override_fields': override_fields,
                'auditor_id':      runtime.context.auditor_id,
            }
        )
        # Also update vendor history with this outcome
        vendor_id = runtime.state.get('extracted',{}).get('vendor_id','')
        if vendor_id:
            existing = runtime.store.get(('vendors',), vendor_id)
            history  = existing.value if existing else {'decisions':[],'risk':'unknown'}
            history['decisions'].append({'invoice_id':invoice_id,'action':action})
            runtime.store.put(('vendors',), vendor_id, history)
    return f'Decision saved for {invoice_id}'

@tool
def semantic_recall_override_patterns(
    query: str,
    """Vector-search long-term memory for similar past override patterns.

    Helps the agent suggest appropriate override values based on
    what auditors have done before in similar situations.
    """
    if not runtime.store:
        return 'Store not available'
    results = runtime.store.search(
        ('patterns',), query=query   # uses MiniLM embeddings from store init
    )
    if not results:
        return 'No similar patterns found'
    return str([r.value for r in results[:3]])

## **7. Skills — Prompt-Driven Progressive Disclosure (v5.0)**

Source: *<https://docs.langchain.com/oss/python/langchain/multi-agent/skills>*

## **7.1 What Changed — Class-Based → Prompt-Driven**

The previous architecture used an abstract **Skill(ABC)** class with a **run()** method — this is NOT the pattern in the current LangChain skills documentation. The official pattern is:
Skills are specialised prompts + optionally specific tools, packaged as files or database records
A single load_skill(skill_name) tool gives the agent access to any skill's prompt and context on demand
Progressive disclosure: the agent only loads a skill's prompt when it needs it — not all upfront
Different teams can maintain skill prompt files independently (prompts/ directory)
Dynamic tool registration: loading a skill can also register new tools by updating state

## **7.2 Skill Prompt Files**

## prompts/skills/extraction_skill.yaml

name: extraction_skill
version: '1.0'
description: 'Expert invoice data extraction from PDF, DOCX, and scanned PNG'
prompt: |
  You are an expert invoice data extraction specialist.
  Use the data_harvester MCP tool to extract the following fields:

- invoice_no, invoice_date, vendor_id, currency, total_amount
- line_items: item_code, description, qty, unit_price, total

  Rules:

- For PDFs: use pdfplumber via data_harvester
- For DOCX: use python-docx via data_harvester
- For PNG: use pytesseract via data_harvester (set ocr=True)
- Attach a confidence score (0.0-1.0) based on field completeness
- If field count < 80% of expected, confidence < 0.6

  Call complete_extraction(confidence=<score>) when done.
required_tools:

- data_harvester

---

## prompts/skills/translation_skill.yaml

name: translation_skill
version: '1.0'
description: 'Multilingual invoice translation — ES/DE/FR to EN'
prompt: |
  You are a professional invoice translator.
  Translate all extracted invoice fields to English.
  Preserve all numeric values, dates, and codes exactly.
  Supported source languages: Spanish (es), German (de), French (fr).

  Rate your confidence (0.0–1.0):

- 1.0 = all fields translated unambiguously
- 0.8 = minor ambiguities in non-financial fields
- <0.8 = route to HITL for human verification

Call complete_translation(translation_confidence=<score>) when done.
required_tools: []

---

## prompts/skills/validation_skill.yaml

name: validation_skill
version: '1.0'
description: 'Invoice completeness and ERP cross-validation'
prompt: |
  You are an invoice validation specialist.

  1. Check field completeness against rules.yaml thresholds
  2. Call business_validator MCP tool to compare with ERP purchase orders
  3. Apply tolerance rules: price=5%, quantity=0%, tax=2%
  4. Auto-approve if confidence >= 0.95 AND discrepancies == []
  5. Route to HITL if any discrepancy or confidence < 0.95

  Call complete_validation(discrepancies=[...], confidence=<score>) when done.
required_tools:

- data_completeness_checker
- business_validator

## **7.3 load_skill Tool — Progressive Disclosure**

## src/tools/skills_tool.py  — v5.0 official Skills pattern

import yaml
from pathlib import Path
from langchain.tools import tool, ToolRuntime

SKILLS_DIR = Path('prompts') / 'skills'

SKILL_REGISTRY = {
    'extraction':  'extraction_skill.yaml',
    'translation': 'translation_skill.yaml',
    'validation':  'validation_skill.yaml',
    'reporting':   'reporting_skill.yaml',
    'rag_query':   'rag_query_skill.yaml',
}

@tool
def load_skill(
    skill_name: str,
    """Load a specialised skill prompt and context on demand.

    Available skills:
    - extraction:  PDF/DOCX/PNG invoice data extraction expert
    - translation: Multilingual invoice translation (ES/DE/FR → EN)
    - validation:  Completeness check + ERP cross-validation
    - reporting:   HTML audit report generation
    - rag_query:   Natural language Q&A over processed invoices

    Returns the skill's prompt. Call this before starting the related task.
    The prompt will guide you on what tools to use and how.
    """
    if skill_name not in SKILL_REGISTRY:
        available = ', '.join(SKILL_REGISTRY.keys())
        return f'Unknown skill: {skill_name}. Available: {available}'

    skill_path = SKILLS_DIR / SKILL_REGISTRY[skill_name]
    skill_data = yaml.safe_load(skill_path.read_text(encoding='utf-8'))

    # Optional: log skill load to metrics
    if runtime.context.metrics:
        runtime.context.metrics.log_skill_load(
            run_id=runtime.context.run_id,
            skill_name=skill_name
        )

    return (
        f'=== SKILL: {skill_data["name"]} v{skill_data["version"]} ===\n'
        f'{skill_data["prompt"]}\n'
        f'Required tools: {skill_data.get("required_tools",[])}\n'
        f'=== END SKILL ==='
    )

## **7.4 Pipeline Agent With Skills Tool**

The **pipeline_agent** from Section 4 is extended with **load_skill** so each stage starts by loading the relevant skill prompt before calling MCP tools. The handoff middleware still controls stage transitions, but the skill provides the specialist prompt context dynamically.

## Extension to pipeline_agent — add load_skill to all stage tool lists

from src.tools.skills_tool import load_skill

pipeline_agent = create_agent(
    model=get_llm(),
    tools=[
        load_skill,          # always available — agent calls this first at each stage
        complete_triage,
        complete_extraction,
        complete_translation,
        complete_validation,
        data_harvester_tool,
        recall_vendor_history,      # long-term memory read
        save_audit_decision,        # long-term memory write
        semantic_recall_override_patterns,  # vector search
    ],
    state_schema=InvoicePipelineState,
    context_schema=InvoiceContext,
    store=store,
    middleware=[apply_stage_config, HumanInTheLoopMiddleware(...)],
    checkpointer=checkpointer,
    system_prompt=(
        'You process invoices through sequential stages. '
        'At each stage, first call load_skill(skill_name) to get expert guidance, '
        'then perform the task, then call the appropriate complete_* handoff tool.'
    ),
)

## **7.5 Skill Audit — All 12 Skill Modules → Prompt Files**

| Old Class Module | New Prompt File | Key Change |
| --- | --- | --- |
| monitor_skill.py | prompts/skills/monitor_skill.yaml | Removed class. Replaced by triage stage in handoffs + complete_triage tool. |
| extractor_skill.py | prompts/skills/extraction_skill.yaml | Prompt-driven. data_harvester_tool(ToolRuntime) replaces class method. |
| translator_skill.py | prompts/skills/translation_skill.yaml | LCEL chain moved to translation stage middleware. Prompt externalised. |
| invoice_validator_skill.py | prompts/skills/validation_skill.yaml | Merged into validation_skill. completeness+ERP in one prompt. |
| biz_validator_skill.py | (merged into validation_skill.yaml) | ERP check is a step within validation_skill, not a separate agent. |
| reporting_skill.py | prompts/skills/reporting_skill.yaml | Prompt guides HTML report structure. insight_reporter MCP tool unchanged. |
| rag/indexing_skill.py | prompts/skills/rag_indexing_skill.yaml | Incremental indexing prompt. vector_indexer MCP tool unchanged. |
| rag/retrieval_skill.py | prompts/skills/rag_query_skill.yaml | Unified retrieval+augmentation+generation+reflection into one rag_query skill. |
| rag/generation_skill.py | (merged into rag_query_skill.yaml) | Generation step is part of rag_query skill prompt flow. |
| rag/reflection_skill.py | (merged into rag_query_skill.yaml) | RAG Triad retry is described in prompt. Conditional edge in LangGraph graph. |

## **8. Observability — SQLite MetricsDB (LangFuse Removed)**

With Docker removed, LangFuse is eliminated. The SQLite MetricsDB (metrics.db) provides complete local observability for agent nodes, MCP tool calls, LLM calls, HITL events, and skill loads. The Observability UI page queries it directly.

## **8.1 MetricsDB Schema**

## src/observability/metrics_db.py  — v5.0 SQLite-only

import sqlite3, json, time, hashlib
from pathlib import Path
from src.core.persistence import METRICS_DB

SCHEMA = '''
CREATE TABLE IF NOT EXISTS pipeline_runs (
    run_id        TEXT PRIMARY KEY,
    invoice_id    TEXT,
    started_at    TEXT,
    finished_at   TEXT,
    total_ms      INTEGER,
    final_status  TEXT,
    auto_approved INTEGER,
    stage_count   INTEGER
);
CREATE TABLE IF NOT EXISTS stage_transitions (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id       TEXT,
    from_step    TEXT,
    to_step      TEXT,
    transition_at TEXT,
    trigger_tool  TEXT
);
CREATE TABLE IF NOT EXISTS tool_calls (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id      TEXT,
    tool_name   TEXT,
    started_at  TEXT,
    duration_ms INTEGER,
    status      TEXT,
    input_hash  TEXT,
    output_size INTEGER,
    error_msg   TEXT
);
CREATE TABLE IF NOT EXISTS llm_calls (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id            TEXT,
    model             TEXT,
    started_at        TEXT,
    prompt_tokens     INTEGER,
    completion_tokens INTEGER,
    latency_ms        INTEGER,
    cost_usd          REAL
);
CREATE TABLE IF NOT EXISTS hitl_events (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id       TEXT,
    invoice_id   TEXT,
    auditor_id   TEXT,
    action       TEXT,
    decision_type TEXT,
    wait_ms      INTEGER,
    recorded_at  TEXT
);
CREATE TABLE IF NOT EXISTS skill_loads (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id      TEXT,
    skill_name  TEXT,
    loaded_at   TEXT
);
CREATE TABLE IF NOT EXISTS rag_scores (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id       TEXT,
    faithfulness REAL,
    relevance    REAL,
    groundedness REAL,
    scored_at    TEXT
);
'''

class MetricsDB:
    def **init**(self, path: Path = METRICS_DB):
        path.parent.mkdir(parents=True, exist_ok=True)
        self.conn = sqlite3.connect(str(path), check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
        self.conn.executescript(SCHEMA)

    # ── Writers ───────────────────────────────────────────────────────
    def log_tool_call(self, run_id, tool_name, duration_ms,
                      status, input_data=None, error_msg=None):
        ih = hashlib.sha256(
            json.dumps(input_data or {}, sort_keys=True).encode()
        ).hexdigest()[:16]
            'INSERT INTO tool_calls(run_id,tool_name,started_at,duration_ms,'
            'status,input_hash,error_msg) VALUES(?,?,datetime("now"),?,?,?,?)',
            (run_id, tool_name, duration_ms, status, ih, error_msg))

    def log_hitl_interrupt(self, run_id, invoice_id, thread_id, actions, elapsed_ms):
            'INSERT INTO hitl_events(run_id,invoice_id,auditor_id,action,decision_type,'
            'wait_ms,recorded_at) VALUES(?,?,"pending",?,"interrupt",?,datetime("now"))',
            (run_id, invoice_id, json.dumps(actions), elapsed_ms))

    def log_hitl_decision(self, run_id=None, invoice_id=None, auditor_id=None,
                          decisions=None, elapsed_ms=0):
        for d in (decisions or []):
                'INSERT INTO hitl_events(run_id,invoice_id,auditor_id,action,'
                'decision_type,wait_ms,recorded_at) VALUES(?,?,?,?,?,?,datetime("now"))',
                (run_id, invoice_id, auditor_id,
                 'hitl_decision', d.get('type','unknown'), elapsed_ms))

    def log_skill_load(self, run_id, skill_name):
            'INSERT INTO skill_loads(run_id,skill_name,loaded_at)'
            ' VALUES(?,?,datetime("now"))',
            (run_id, skill_name))

    # ── Query helpers (used by Observability UI page) ─────────────────
    def slowest_tools(self, n=10):
        return [dict(r) for r in self.conn.execute(
            'SELECT tool_name, AVG(duration_ms) avg_ms, COUNT(*) calls,'
            'SUM(CASE WHEN status="error" THEN 1 ELSE 0 END) errors'
            ' FROM tool_calls GROUP BY tool_name ORDER BY avg_ms DESC LIMIT ?',
            (n,)).fetchall()]

    def stage_transition_funnel(self):
        return [dict(r) for r in self.conn.execute(
            'SELECT to_step, COUNT(*) cnt FROM stage_transitions'
            ' GROUP BY to_step ORDER BY cnt DESC').fetchall()]

    def auto_approval_rate(self, days=30):
        tot  = self.conn.execute(
            'SELECT COUNT(*) FROM pipeline_runs'
            ' WHERE started_at > datetime("now",?)', (f'-{days} days',)).fetchone()[0]
        if not tot: return 0.0
        auto = self.conn.execute(
            'SELECT COUNT(*) FROM pipeline_runs WHERE auto_approved=1'
            ' AND started_at > datetime("now",?)', (f'-{days} days',)).fetchone()[0]
        return round(auto/tot*100, 1)

## **9. UI Pages Specification — All 6 Streamlit Pages**

## **9.0 Shared Sidebar**

| Element | Detail |
| --- | --- |
| Navigation | Links to all 6 pages with icons. HITL badge count (red) shows invoices awaiting human review. |
| Service Health | 🟢/🔴 per service: MCP :9000 | ERP :8000 | Ollama :11434 | Chat API :8502. Polled every 30s via health endpoints. |
| Auditor ID | Text input — persisted in st.session_state. Prefixed to all HITL decisions and stored in long-term memory. |
| Current Stage | If pipeline active: current_step badge (triage→extraction→translation→validation→hitl→reporting). |

## **9.1 Page 1 — Pipeline Monitor**

| Attribute | Specification |
| --- | --- |
| File | ui/pages/1_Pipeline_Monitor.py |
| Purpose | Live view of all invoice runs with stage-by-stage progress. Shows handoff transitions as pipeline moves through triage→extraction→translation→validation→hitl/reporting. |
| Layout | Top: 4 KPI tiles (Total | Auto-Approved | Pending HITL | Errors). Middle: Active run card per invoice (stage badge strip). Bottom: Completed runs table with status filter. |
| Data Sources | GET /dashboard/metrics (batch stats) | GET /stream/{run_id} SSE (stage transitions) | SQLite stage_transitions table |
| AG-UI Events | StepProgress per handoff transition. HumanInputRequired → HITL badge increment. RunFinished → move to completed table. |
| Interactions | Click stage badge → show timing for that stage. Click invoice_id → open Chat page. 'Upload Invoice' file widget → triggers new pipeline run. |

## **9.2 Page 2 — Invoice Chat**

| Attribute | Specification |
| --- | --- |
| File | ui/pages/2_Invoice_Chat.py |
| Purpose | Natural-language Q&A over any processed invoice. Short-term memory (AgentState) preserves conversation within session. Long-term memory (SqliteStore) surfaces vendor history and past decisions. |
| Layout | Left (30%): Invoice selector, metadata panel (vendor, total, status, confidence, flags). Right (70%): Chat messages with streaming tokens, chat input, Clear History button. |
| Data Sources | POST /chat → streamed answer with TextDelta events. Short-term: SqliteSaver thread history reloaded on invoice select. Long-term: recall_vendor_history tool surfaces past decisions automatically. |
| AG-UI Events | RUN_STARTED → show spinner. TextDelta → stream tokens. StepProgress (skill load) → sidebar badge. RUN_FINISHED → hide spinner. |
| Memory Display | 'Vendor History' expander shows SqliteStore entries for this vendor (long-term). Chat history is the short-term memory in context. |

## **9.3 Page 3 — HITL Review**

| Attribute | Specification |
| --- | --- |
| File | ui/pages/3_HITL_Review.py |
| Purpose | Structured approve/edit/reject decision UI for flagged invoices. Backed by the HumanInTheLoopMiddleware interrupt/resume pattern. Three decision types with appropriate controls per type. |
| Layout | Per action card: tool name, arguments, description. Decision radio (approve/edit/reject per allowed_decisions). Edit mode shows field-level inputs. Reject mode shows reason textarea (min 10 chars). Submit button sends Command(resume={decisions:[...]}). |
| Data Sources | GET /hitl/{invoice_id}/interrupt → loads interrupt payload. POST /hitl/{invoice_id}/decision → resumes SqliteSaver-checkpointed graph. Logs to hitl_events table in metrics.db. |
| AG-UI Events | HumanInputRequired auto-navigates here. HumanDecisionMade → toast + sidebar badge decrement + pipeline resume. |
| Memory | 'Past decisions for this vendor' from SqliteStore shown as context. Decision is saved to long-term memory via save_audit_decision tool after submit. |

## **9.4 Page 4 — Executive Dashboard**

| Attribute | Specification |
| --- | --- |
| File | ui/pages/4_Executive_Dashboard.py |
| Purpose | CFO/COO-facing KPI view. Business outcomes, SLA, ROI, cost savings. Printable to PDF via pdfkit. |
| Layout | 4 KPI tiles: Auto-Approval Rate | Avg Processing Time | Batch SLA | Estimated Savings. Approval trend chart (30d). Stage funnel chart. Auditor leaderboard. |
| Data Sources | GET /dashboard/metrics (SQLite MetricsDB helpers). st.cache_data ttl=300s. |
| Interactions | Period selector 7d/30d/90d. PDF export. Click tile → per-invoice drill-down modal. |

## **9.5 Page 5 — Observability**

| Attribute | Specification |
| --- | --- |
| File | ui/pages/5_Observability.py |
| Purpose | Technical operations view. Agent stage timing, MCP tool performance, LLM cost (Ollama=free), skill load frequency, RAG quality scores. All from SQLite metrics.db. |
| Tabs | Tab 1 — Stage Funnel (handoff transitions). Tab 2 — Tool Performance (slowest_tools() query, error rates). Tab 3 — Skill Usage (which skills loaded most). Tab 4 — HITL Analytics (decision type breakdown, avg wait time). Tab 5 — RAG Quality (faithfulness/relevance/groundedness gauges). |
| Data Sources | Direct SQLite queries via MetricsDB helper methods. No external service needed. |
| Alerts | Red tab badge if: tool error_rate >5% | avg_stage_ms > threshold | RAG score < threshold. |

## **9.6 Page 6 — Settings**

| Attribute | Specification |
| --- | --- |
| File | ui/pages/6_Settings.py |
| Purpose | Runtime config and health check. LLM model, validation thresholds, HITL policy, memory management, SQLite file viewer. |
| Sections | A: LLM Config (provider/model/temperature). B: Validation Rules (tolerance sliders). C: HITL Policy (which tools require approval). D: Memory (view SqliteStore entries, clear by namespace). E: Service Health (ping all ports). F: Config viewer (resolved config.yaml as JSON, read-only). |
| Memory Controls | View long-term store by namespace. Delete individual keys or entire namespace. Export store.db as file download. View metrics.db size + last write time. |
| HITL Policy Editor | Toggle interrupt_on per tool (True/False/custom). Change allowed_decisions per tool. Changes take effect on next agent creation (via restart or hot-reload). |

## **10. Updated Project Folder Structure (v5.0)**

ai-invoice-auditor\
│
├── config\
│   ├── rules.yaml                      # ✅ unchanged
│   └── config.yaml                     # 🔧 removed langfuse/postgres sections
│
├── docs\incoming\                      # ✅ unchanged
├── docs\erp\                           # ✅ unchanged
│
├── prompts\                            # 🆕 Externalised skill prompts
│   └── skills\
│       ├── extraction_skill.yaml
│       ├── translation_skill.yaml
│       ├── validation_skill.yaml
│       ├── reporting_skill.yaml
│       ├── rag_indexing_skill.yaml
│       └── rag_query_skill.yaml
│
├── src\
│   ├── context.py                      # 🆕 InvoiceContext dataclass (Runtime)
│   ├── core\
│   │   ├── persistence.py              # 🆕 SqliteSaver + SqliteStore setup
│   │   ├── llm_factory.py              # 🔧 returns BaseChatModel for Ollama
│   │   ├── paths.py                    # ✅ Windows-safe pathlib constants
│   │   └── config_loader.py
│   ├── agents\
│   │   ├── pipeline_agent.py           # 🆕 Handoffs + HumanInTheLoopMiddleware
│   │   ├── invoice_audit_agent.py      # 🆕 HITL-only agent for review stage
│   │   └── hitl_runner.py              # 🆕 run_audit / resume_audit / stream_audit
│   ├── memory\
│   │   └── long_term.py                # 🆕 recall/save SqliteStore tools
│   ├── observability\
│   │   └── metrics_db.py               # 🔧 SQLite-only (LangFuse removed)
│   ├── protocols\
│   │   ├── mcp_client.py               # ✅ InstrumentedMCPClient
│   │   └── a2a_broker.py
│   └── schemas\
│       ├── invoice.py
│       ├── a2a_message.py
│       └── hitl.py                     # 🔧 updated for approve/edit/reject
│
├── tools\                              # ✅ all 11 MCP tools unchanged
│   ├── mcp_server.py
│   └── ...                             # watcher, extractor, translator, etc.
│
├── chat_api\
│   ├── main.py                         # 🔧 /hitl uses resume_audit()
│   ├── agui_bus.py
│   ├── session_store.py                # 🔧 memory backed by SqliteStore
│   └── routers\
│       ├── chat.py
│       ├── hitl.py                     # 🔧 decisions → Command(resume=...)
│       └── dashboard.py
│
├── ui\
│   ├── app.py
│   └── pages\
│       ├── 1_Pipeline_Monitor.py       # 🔧 stage transitions from handoffs
│       ├── 2_Invoice_Chat.py           # 🔧 memory panels (short+long term)
│       ├── 3_HITL_Review.py           # 🔧 approve/edit/reject UI
│       ├── 4_Executive_Dashboard.py
│       ├── 5_Observability.py          # 🔧 SQLite only, no LangFuse iframe
│       └── 6_Settings.py              # 🔧 memory controls + HITL policy editor
│
├── erp_mock\                           # ✅ unchanged
├── tests\
├── start_all.bat                       # 🔧 no Docker commands
├── stop_all.bat
├── .env.example
├── requirements.txt                    # 🔧 removed langfuse, psycopg; added sqlite deps
└── README.md

## **11. requirements.txt (v5.0 — No Docker/LangFuse/PostgreSQL)**

## ── Orchestration ─────────────────────────────────────────────────────

langgraph>=0.3.0
langgraph-checkpoint-sqlite>=0.1.0      # SqliteSaver — replaces PostgresSaver
langchain>=0.3.0
langchain-community>=0.3.0
langchain-ollama>=0.1.0
langchain-openai>=0.1.0                 # optional — for Azure switch

## ── HITL Middleware ────────────────────────────────────────────────────

## HumanInTheLoopMiddleware is in langchain>=0.3 — no extra package

## ── Memory ────────────────────────────────────────────────────────────

## SqliteStore is in langgraph>=0.3 — no extra package

## sqlite3 is Python stdlib — no install needed

sentence-transformers>=2.7.0            # embeddings for SqliteStore vector search

## ── Chat API Gateway ──────────────────────────────────────────────────

fastapi>=0.111.0
uvicorn[standard]>=0.29.0
httpx>=0.27.0
sse-starlette>=1.8.0
ag-ui-sdk>=0.1.0

## ── Protocols ─────────────────────────────────────────────────────────

fastmcp>=0.9.0
a2a-sdk>=0.2.0

## ── Document Parsing ─────────────────────────────────────────────────

pdfplumber>=0.10.0
python-docx>=1.1.0
pytesseract>=0.3.10
Pillow>=10.0.0

## ── Vector DB (RAG) ──────────────────────────────────────────────────

faiss-cpu>=1.8.0
qdrant-client>=1.9.0                    # optional — if Qdrant preferred
chromadb>=0.5.0                         # optional — if Chroma preferred

## ── RAG Evaluation ────────────────────────────────────────────────────

trulens-eval>=0.30.0

## ── Schema Validation ────────────────────────────────────────────────

pydantic>=2.7.0
pydantic-settings>=2.2.0

## ── Frontend ─────────────────────────────────────────────────────────

streamlit>=1.35.0
pdfkit>=1.0.0                           # Executive Dashboard PDF export

## ── Config + Utilities ────────────────────────────────────────────────

pyyaml>=6.0.1
python-dotenv>=1.0.1
structlog>=24.0.0

## ── Windows compatibility ─────────────────────────────────────────────

colorama>=0.4.6                         # Windows terminal colour support

## ── Testing ───────────────────────────────────────────────────────────

pytest>=8.2.0
pytest-asyncio>=0.23.0

## ── REMOVED vs v4.0 ──────────────────────────────────────────────────

## langfuse                — removed (no Docker, no LangFuse server)

## langgraph-checkpoint-postgres — removed (SQLite replaces PostgreSQL)

## psycopg[binary]        — removed (no PostgreSQL)

## redis                  — removed (no Redis; SqliteStore for memory)

## langchain-redis        — removed

## pywin32                — removed (not needed)

## **12. Updated Sprint Plan (v5.0)**

| S | Theme | Deliverables | Definition of Done |
| --- | --- | --- | --- |
| S0 | Windows Env | winget Python/Git/Ollama. Tesseract install. start_all.bat (no Docker). SqliteSaver + SqliteStore initialised. InvoiceContext dataclass. | start_all.bat runs; metrics.db+checkpoints.db+store.db created; ollama serve running |
| S1 | Ingestion + Skills | 6 skill YAML files. load_skill tool. MCP watcher+harvester tools via ToolRuntime. InvoicePipelineState. Triage handoff. | load_skill('extraction') returns prompt; 6 invoices detected by watcher |
| S2 | Handoffs Pipeline | All 5 handoff tools (complete_triage/extraction/translation/validation). apply_stage_config middleware. Pipeline agent creation with all stages. | Invoice goes triage→extraction→translation→validation stage transitions logged in stage_transitions table |
| S3 | MCP + Telemetry | InstrumentedMCPClient (ToolRuntime-injected). MetricsDB writers for tool_calls + stage_transitions. All 11 MCP tools wired. | tool_calls table populated on every MCP invocation |
| S4 | HITL Middleware | HumanInTheLoopMiddleware on audit_agent. SqliteSaver checkpointer. run_audit/resume_audit/stream_audit. hitl_events logging. | Interrupt fires for approve_invoice; resume with approve/edit/reject works via Command(resume=...) |
| S5 | Memory Layer | SqliteStore (store.db). recall_vendor_history + save_audit_decision + semantic_recall tools. Long-term memory written on every HITL decision. | Vendor history saved after decision; re-running same vendor shows history in context |
| S6 | AG-UI + Chat API | AgUIEventBus SSE. FastAPI /chat /stream /hitl/decision /dashboard. Stage transitions emit StepProgress events. | SSE stream shows handoff transitions; HITL resume via API |
| S7 | RAG Pipeline | FAISS + rag_query_skill.yaml. RAG Triad scores to rag_scores table. rag_query skill loaded on-demand. | 5 test queries answered; rag_scores table populated |
| S8 | All 6 UI Pages | Pages 1-6 per spec in Section 9. HITL approve/edit/reject UI. Memory panels. Stage funnel in Observability tab. | Full 6-page app working; auditor can investigate→decide→see history |
| S9 | Polish + Deliver | Integration tests. README with Windows setup. 5-slide deck. Demo video all 6 pages. Linting. | Demo clean on Windows; all 6 stages fire in order; HITL works end-to-end |

## **13. Glossary (v5.0)**

| Term | Definition (v5.0) |
| --- | --- |
| 🔒 HumanInTheLoopMiddleware | Official LangChain middleware added to create_agent(middleware=[...]). Intercepts tool calls matching interrupt_on policy. Three decision types: approve (execute as-is), edit (modify args first), reject (cancel with feedback). Requires SqliteSaver checkpointer for state persistence across the interrupt. |
| 💾 SqliteSaver | langgraph-checkpoint-sqlite checkpointer. Stores full graph state (AgentState messages + all fields) in checkpoints.db. Replaces MemorySaver (no restart) and PostgresSaver (no Docker). Thread-safe, single-file. |
| 🗄️ SqliteStore | langgraph.store.sqlite long-term memory store. Namespaced key-value (namespace tuple + key string). Vector-searchable with embedded MiniLM embeddings. Accessed via runtime.store in any tool using ToolRuntime. |
| 🧠 Short-term memory | AgentState.messages list persisted per thread_id in SqliteSaver. Automatically restored on resume. Represents the in-context conversation history for a single invoice run. |
| 📚 Long-term memory | SqliteStore entries persisted across all runs. Namespaces: (vendors,), (invoices,decisions), (auditors,), (patterns,). Read/written by tools via runtime.store. Survives application restarts. |
| 🔀 Handoffs | Official LangChain multi-agent pattern. Tools return Command(update={current_step:...}) to transition the agent between processing stages (triage→extraction→translation→validation→hitl→reporting). Single-agent middleware variant used: one agent, dynamic config per stage. |
| 📋 Skills (v5.0) | Prompt-driven specialisations per official LangChain Skills docs. Packaged as YAML files in prompts/skills/. Loaded on-demand via load_skill(skill_name) tool — progressive disclosure. Not class-based. Teams maintain skill files independently. |
| ⚙️ ToolRuntime[Context] | LangChain dependency injection in tools. runtime.context → InvoiceContext (run_id, mcp client, metrics). runtime.store → SqliteStore. runtime.state → current AgentState. runtime.tool_call_id → for ToolMessage pairing in handoffs. |
| 🔧 load_skill | Tool that returns a skill's prompt YAML content on demand. Agent calls this at the start of each processing stage to get expert guidance. Enables progressive disclosure and independent team maintenance of skill prompts. |
| 🎯 wrap_model_call | LangChain middleware decorator used by apply_stage_config. Intercepts model requests before LLM call. Reads current_step from state and overrides system_prompt + tools per stage config. Enables dynamic agent behaviour without multiple agent instances. |
| 📊 MetricsDB | SQLite-backed local observability store (metrics.db). Tables: pipeline_runs, stage_transitions, tool_calls, llm_calls, hitl_events, skill_loads, rag_scores. Queried by Streamlit Observability page. Replaces LangFuse. |
| ▶️ Command(resume=...) | LangGraph primitive used to resume a graph interrupted by HumanInTheLoopMiddleware. resume={'decisions':[{type:'approve'}]} OR {type:'edit', edited_action:{name:..., args:{...}}} OR {type:'reject', message:'...'}. Passed with same thread_id to reload SqliteSaver state. |

**END OF DOCUMENT — AI Invoice Auditor Architecture v5.0**
No-Docker Windows · SQLite-First · HumanInTheLoopMiddleware · Handoffs · Prompt Skills · Runtime · Memory
