---
name: feedback-framework-preferences
description: User preferences on which AI frameworks to reference and version currency rules
metadata:
  type: feedback
---

Do not reference Semantic Kernel or AutoGen anywhere in this knowledge-docs repo.

**Why:** User explicitly excludes Microsoft agent frameworks (Semantic Kernel, AutoGen). They are not part of the architecture strategy being documented.

**How to apply:** When writing agent framework comparisons or examples, use only: LangGraph, CrewAI, PydanticAI, Google ADK, Mastra, and other non-Microsoft frameworks. Remove any existing references to Semantic Kernel / AutoGen if found.

---

Always use the latest stable version of any package in code examples and version labels.

**Why:** Stale version numbers erode trust and cause confusion. LangGraph latest stable is 1.2.8 (as of July 2026). CrewAI latest is 0.80+. Always verify before writing.

**How to apply:** Update `covers_version` frontmatter and any code imports/version comments to the current stable release. Do not write `langgraph==0.2` — write `langgraph==1.2.8`.
