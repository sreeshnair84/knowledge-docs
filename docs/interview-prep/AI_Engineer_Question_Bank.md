---
title: "AI Engineer Interview Question Bank"
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
source_type: converted-pdf
source_file: ""
doc_type: guide
covers_version: "N/A"
tags: ["interview-prep", "ai-engineer", "python", "llm", "rag", "mlops"]
---
**AI ENGINEER**
**Interview Question Bank**
| 100+ Questions  |  9 Categories  |  3 Difficulty Levels Python  •  LLM  •  RAG  •  MLOps  •  System Design  •  Live Coding |
| --- |
*Confidential — Internal Use Only*

# SECTION 1 — Python & Core Engineering

| Tests foundational Python depth: OOP, data structures, error handling, and writing clean, production-grade code. |
| --- |

**1.1  Object-Oriented Programming**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q1 | What is the difference between @classmethod and @staticmethod? Give a real use case for each in an AI pipeline. 💡 Look for factory pattern and utility method examples OOP  |  Python | Medium | [ ] |
| --- | --- | --- | --- |

| Q2 | Explain Python's MRO (Method Resolution Order). What happens with diamond inheritance? OOP  |  Advanced | Hard | [ ] |
| --- | --- | --- | --- |

| Q3 | What are Python dataclasses and when would you use them over a regular class in a config-driven AI app? OOP  |  Clean Code | Easy | [ ] |
| --- | --- | --- | --- |

| Q4 | How do **slots** reduce memory usage? Would you use it in an LLM inference wrapper? OOP  |  Performance | Medium | [ ] |
| --- | --- | --- | --- |

**1.2  Python Performance & Internals**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q5 | What is the GIL and how does it affect multi-threaded LLM batch processing? What's the workaround? Threading  |  Performance | Hard | [ ] |
| --- | --- | --- | --- |

| Q6 | Explain generators vs list comprehensions. When would a generator dramatically improve performance in a data pipeline? Memory  |  Generators | Medium | [ ] |
| --- | --- | --- | --- |

| Q7 | How does Python's garbage collector handle circular references? Relevant when building agent memory graphs. Memory  |  Internals | Hard | [ ] |
| --- | --- | --- | --- |

| Q8 | What's the difference between deepcopy and shallow copy? Where does this bite you with mutable default arguments? Python  |  Bugs | Easy | [ ] |
| --- | --- | --- | --- |

**1.3  Async & Concurrency**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q9 | Explain async/await in Python. How would you use it to make concurrent LLM API calls without hitting rate limits? 💡 Key: asyncio.gather + semaphore for rate limiting Async  |  LLM | Medium | [ ] |
| --- | --- | --- | --- |

| Q10 | What's the difference between asyncio.gather() and asyncio.wait()? Which do you use when one API call can fail? Async  |  Error Handling | Medium | [ ] |
| --- | --- | --- | --- |

| Q11 | How would you implement a retry-with-backoff decorator for OpenAI API calls? Decorators  |  API | Medium | [ ] |
| --- | --- | --- | --- |

**1.4  Error Handling & Testing**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q12 | How do you design a custom exception hierarchy for an LLM API service? What goes in the base class? Exceptions  |  Design | Medium | [ ] |
| --- | --- | --- | --- |

| Q13 | Explain the difference between mocking and patching in pytest. How would you mock an OpenAI API call? Testing  |  pytest | Medium | [ ] |
| --- | --- | --- | --- |

| Q14 | What is property-based testing (Hypothesis)? Give an example relevant to a text processing pipeline. Testing  |  Advanced | Hard | [ ] |
| --- | --- | --- | --- |

# SECTION 2 — LLM & GenAI Concepts

| Probes understanding of how LLMs work internally, not just how to call APIs. |
| --- |

**2.1  Transformer Internals**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q15 | Explain self-attention in plain language. How does the number of attention heads affect what the model learns? Transformers  |  Architecture | Hard | [ ] |
| --- | --- | --- | --- |

| Q16 | What is KV-cache and how does it speed up generation? What are the memory tradeoffs? Inference  |  Performance | Hard | [ ] |
| --- | --- | --- | --- |

| Q17 | What's the difference between encoder-only, decoder-only, and encoder-decoder models? When would you use each? Architecture  |  LLM | Medium | [ ] |
| --- | --- | --- | --- |

| Q18 | Explain positional encoding. Why do transformers need it? What's RoPE vs sinusoidal? Architecture  |  Embeddings | Hard | [ ] |
| --- | --- | --- | --- |

**2.2  Inference & Optimization**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q19 | What is quantization? Explain INT8 vs INT4 vs FP16 tradeoffs for deploying a model on limited GPU VRAM. Inference  |  GPU | Hard | [ ] |
| --- | --- | --- | --- |

| Q20 | What is speculative decoding and how does it improve inference latency? Optimization  |  Inference | Hard | [ ] |
| --- | --- | --- | --- |

| Q21 | You have a 70B model and a 7B model. Design a system where the 7B handles easy queries and escalates to 70B. How do you decide escalation? System Design  |  LLM Routing | Hard | [ ] |
| --- | --- | --- | --- |

| Q22 | What's the difference between top-p (nucleus) and top-k sampling? When does temperature matter vs not? Generation  |  Parameters | Medium | [ ] |
| --- | --- | --- | --- |

**2.3  Context & Token Management**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q23 | A user's conversation exceeds your context window. Describe 3 strategies to handle this, with tradeoffs. Context  |  Production | Medium | [ ] |
| --- | --- | --- | --- |

| Q24 | How would you estimate token count without calling the tokenizer? What formula do you use? Tokens  |  Optimization | Easy | [ ] |
| --- | --- | --- | --- |

| Q25 | What is lost-in-the-middle problem? How does it affect your RAG chunk placement strategy? Context  |  RAG | Hard | [ ] |
| --- | --- | --- | --- |

| Q26 | You're passing 10 documents to an LLM. What strategies reduce hallucination risk from irrelevant context? Prompting  |  RAG | Medium | [ ] |
| --- | --- | --- | --- |

# SECTION 3 — RAG & Retrieval Systems

| Deep dive into production RAG — chunking, retrieval quality, evaluation, and failure modes. |
| --- |

**3.1  RAG Architecture**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q27 | Describe the full flow of a production RAG system from ingestion to generation. What can fail at each step? RAG  |  Architecture | Medium | [ ] |
| --- | --- | --- | --- |

| Q28 | What's the difference between naive RAG, advanced RAG, and modular RAG? When do you upgrade? RAG  |  Design | Medium | [ ] |
| --- | --- | --- | --- |

| Q29 | You have a document with a table, a chart, and flowing text. How do you chunk it for retrieval? Chunking  |  Multimodal | Hard | [ ] |
| --- | --- | --- | --- |

| Q30 | Explain parent-child chunking. When does it outperform fixed-size chunking? Chunking  |  Strategy | Hard | [ ] |
| --- | --- | --- | --- |

**3.2  Embedding & Vector Search**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q31 | What is the difference between FAISS flat index, IVF, and HNSW? When would you choose each? Vector Search  |  FAISS | Hard | [ ] |
| --- | --- | --- | --- |

| Q32 | How do you handle embedding drift — when the embedding model gets updated but your index uses old embeddings? Vector DB  |  MLOps | Hard | [ ] |
| --- | --- | --- | --- |

| Q33 | Explain the tradeoff between cosine similarity and dot product similarity in vector search. Embeddings  |  Math | Medium | [ ] |
| --- | --- | --- | --- |

| Q34 | Your semantic search returns irrelevant results for short 2-word queries. How do you fix it? Retrieval  |  Debugging | Medium | [ ] |
| --- | --- | --- | --- |

**3.3  Hybrid Retrieval & Reranking**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q35 | You use BM25 + dense retrieval. How do you combine their scores (RRF vs linear weighting)? What's the difference? Hybrid  |  BM25 | Hard | [ ] |
| --- | --- | --- | --- |

| Q36 | What is a cross-encoder reranker? When does it beat a bi-encoder for reranking? Reranking  |  Precision | Hard | [ ] |
| --- | --- | --- | --- |

| Q37 | Your retrieval precision@5 is high but faithfulness is low. What does that indicate and how do you fix it? Evaluation  |  RAG | Hard | [ ] |
| --- | --- | --- | --- |

**3.4  RAG Evaluation**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q38 | Define precision@k, recall@k, MRR, and NDCG. Which matters most for an enterprise search use case? Evaluation  |  Metrics | Hard | [ ] |
| --- | --- | --- | --- |

| Q39 | How do you build a ground-truth dataset for evaluating RAG when you have no labeled data? Evaluation  |  LLM-as-judge | Hard | [ ] |
| --- | --- | --- | --- |

| Q40 | Explain the RAGAS framework. Which metric do you trust most and why? RAGAS  |  Evaluation | Medium | [ ] |
| --- | --- | --- | --- |

# SECTION 4 — Prompt Engineering

| Tests the candidate's ability to design reliable, production-grade prompts — not just clever one-liners. |
| --- |

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q41 | What is chain-of-thought prompting? How does it differ from zero-shot vs few-shot? CoT  |  Prompting | Easy | [ ] |
| --- | --- | --- | --- |

| Q42 | A prompt works in dev but degrades after 3 months in production. Walk me through your debugging process. Debugging  |  Production | Hard | [ ] |
| --- | --- | --- | --- |

| Q43 | How do you prevent prompt injection attacks in a user-facing chatbot? Security  |  Prompting | Hard | [ ] |
| --- | --- | --- | --- |

| Q44 | Explain the difference between system, user, and assistant roles in a chat prompt. How does misuse of roles cause issues? Roles  |  Chat | Medium | [ ] |
| --- | --- | --- | --- |

| Q45 | What is ReAct prompting? How does it combine reasoning and action for agentic systems? Agents  |  ReAct | Medium | [ ] |
| --- | --- | --- | --- |

| Q46 | You need the model to always respond in strict JSON. What are 3 ways to enforce output format, ranked by reliability? Output Format  |  Reliability | Medium | [ ] |
| --- | --- | --- | --- |

| Q47 | When would you use a prompt template library vs building custom prompt management? Tooling  |  Prompting | Easy | [ ] |
| --- | --- | --- | --- |

| Q48 | Your LLM gives verbose answers. The user wants 2-sentence answers. How do you enforce brevity without losing quality? Output Control  |  UX | Easy | [ ] |
| --- | --- | --- | --- |

| Q49 | Explain meta-prompting. How can you have the LLM improve its own prompt? Advanced  |  Meta | Hard | [ ] |
| --- | --- | --- | --- |

| Q50 | How do you version control prompts in production? What's your strategy for A/B testing two prompt variants? MLOps  |  Prompts | Medium | [ ] |
| --- | --- | --- | --- |

# SECTION 5 — MLOps & Deployment

| Tests production maturity: CI/CD, monitoring, drift detection, model lifecycle management. |
| --- |

**5.1  Model Lifecycle**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q51 | Describe your MLflow setup. How do you track experiments, register models, and promote to production? MLflow  |  Tracking | Medium | [ ] |
| --- | --- | --- | --- |

| Q52 | What triggers model retraining in your pipelines? How do you distinguish data drift from concept drift? Drift  |  Retraining | Hard | [ ] |
| --- | --- | --- | --- |

| Q53 | How do you handle model rollback if a newly deployed model degrades production metrics? Deployment  |  Safety | Hard | [ ] |
| --- | --- | --- | --- |

| Q54 | What is shadow deployment? How would you use it to validate a new LLM version before full rollout? Deployment  |  Strategy | Hard | [ ] |
| --- | --- | --- | --- |

**5.2  Monitoring & Observability**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q55 | What metrics do you monitor in a production LLM system beyond accuracy (latency, cost, toxicity)? Monitoring  |  Production | Medium | [ ] |
| --- | --- | --- | --- |

| Q56 | You use Prometheus + Grafana. What LLM-specific dashboards would you build? What alerts would you set? Observability  |  Infra | Medium | [ ] |
| --- | --- | --- | --- |

| Q57 | How do you detect hallucinations in production without human labeling every response? Quality  |  Monitoring | Hard | [ ] |
| --- | --- | --- | --- |

| Q58 | What is OpenTelemetry? How does it differ from just using Prometheus metrics? Observability  |  Tracing | Medium | [ ] |
| --- | --- | --- | --- |

**5.3  CI/CD for ML**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q59 | How do you integrate model evaluation into a CI/CD pipeline? What gates block deployment? CI/CD  |  Evaluation | Hard | [ ] |
| --- | --- | --- | --- |

| Q60 | What is RBAC in the context of model serving? How did you implement it at IBM? Security  |  Access Control | Medium | [ ] |
| --- | --- | --- | --- |

| Q61 | Describe your Kubernetes deployment for LLM serving. How do you handle autoscaling for bursty traffic? Kubernetes  |  Scaling | Hard | [ ] |
| --- | --- | --- | --- |

# SECTION 6 — System Design for AI

| Open-ended design questions. Look for trade-off awareness, scalability thinking, and failure mode coverage. |
| --- |

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q62 | Design a multi-agent system where one agent plans, one retrieves, and one generates. How do they share context? Agents  |  Architecture | Hard | [ ] |
| --- | --- | --- | --- |

| Q63 | Design an LLM-powered document Q&A system for 1 million documents. Walk through every component. RAG  |  Scale | Hard | [ ] |
| --- | --- | --- | --- |

| Q64 | You have 100 users sending concurrent requests to an LLM API. How do you handle queue management and cost control? Scale  |  Cost | Hard | [ ] |
| --- | --- | --- | --- |

| Q65 | Design a feedback loop so user corrections improve the model over time without full retraining. RLHF  |  System Design | Hard | [ ] |
| --- | --- | --- | --- |

| Q66 | How would you build an AI system that handles multilingual queries from 50 languages with one model? Multilingual  |  NLP | Hard | [ ] |
| --- | --- | --- | --- |

| Q67 | Design a caching layer for LLM responses. What do you cache, what TTL, and how do you invalidate? Caching  |  Performance | Medium | [ ] |
| --- | --- | --- | --- |

| Q68 | You need to build a real-time voice chatbot with <500ms response. What's your architecture? Voice  |  Latency | Hard | [ ] |
| --- | --- | --- | --- |

| Q69 | Design a content moderation system for user prompts before they hit the LLM. What layers of defense? Safety  |  Pipeline | Hard | [ ] |
| --- | --- | --- | --- |

# SECTION 7 — Data Engineering & Business Use Cases

| Tests practical data thinking — pipelines, sampling, large datasets, and business problem framing. |
| --- |

**7.1  Data Pipelines**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q70 | You use Kafka + Airflow + Spark. Explain how data flows from ingestion to model feature store in your pipeline. Data Eng  |  Pipelines | Hard | [ ] |
| --- | --- | --- | --- |

| Q71 | What is exactly-once delivery in Kafka? Why does it matter for time-series forecasting pipelines? Kafka  |  Reliability | Hard | [ ] |
| --- | --- | --- | --- |

| Q72 | How do you handle late-arriving data in a streaming pipeline (e.g. sensor data delayed by network issues)? Streaming  |  Edge Cases | Hard | [ ] |
| --- | --- | --- | --- |

| Q73 | Explain the difference between a data lake, data warehouse, and lakehouse. Which would you use for ML features? Architecture  |  Storage | Medium | [ ] |
| --- | --- | --- | --- |

**7.2  Business Use Case Problems**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q74 | You need a reproducible test/train split from a dataset that grows daily. How do you ensure the test set never leaks into training? 💡 Hash-based splitting using instance identifiers Sampling  |  Data Integrity | Hard | [ ] |
| --- | --- | --- | --- |

| Q75 | Your income classification model performs well overall but poorly for a specific demographic. How do you diagnose and fix? Fairness  |  Bias | Hard | [ ] |
| --- | --- | --- | --- |

| Q76 | A client has 5 years of sales data but the last 2 months are anomalous (COVID, etc.). How do you train a forecasting model? Time Series  |  Anomalies | Hard | [ ] |
| --- | --- | --- | --- |

| Q77 | You're building a churn prediction model. The dataset is 95% not-churned. How do you handle class imbalance? Imbalance  |  Classification | Medium | [ ] |
| --- | --- | --- | --- |

| Q78 | How would you build a real-time recommendation system where item catalog updates every hour? Recommender  |  Real-time | Hard | [ ] |
| --- | --- | --- | --- |

| Q79 | Your model accuracy is 92% in testing but drops to 78% in production after 30 days. What are 5 possible reasons? Drift  |  Debugging | Hard | [ ] |
| --- | --- | --- | --- |

# SECTION 8 — Frameworks & Integrations

| LangChain, LangGraph, FastAPI, HuggingFace — depth of real production usage, not just familiarity. |
| --- |

**8.1  LangChain / LangGraph**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q80 | What is the difference between LangChain Expression Language (LCEL) and traditional chains? LangChain  |  LCEL | Medium | [ ] |
| --- | --- | --- | --- |

| Q81 | When would you use LangGraph over LangChain agents? What problem does it solve? LangGraph  |  Agents | Hard | [ ] |
| --- | --- | --- | --- |

| Q82 | Explain LangGraph's StateGraph. How do you implement a conditional edge (branching agent logic)? LangGraph  |  State | Hard | [ ] |
| --- | --- | --- | --- |

| Q83 | How do you handle tool errors gracefully in a LangChain tool-calling agent without crashing the pipeline? LangChain  |  Error Handling | Medium | [ ] |
| --- | --- | --- | --- |

**8.2  FastAPI & API Design**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q84 | How do you implement streaming LLM responses (SSE / WebSocket) in FastAPI? What's the difference? FastAPI  |  Streaming | Hard | [ ] |
| --- | --- | --- | --- |

| Q85 | How do you add rate limiting per user to a FastAPI LLM endpoint? FastAPI  |  Rate Limiting | Medium | [ ] |
| --- | --- | --- | --- |

| Q86 | What are FastAPI's Background Tasks vs Celery workers? When do you use each for LLM inference? FastAPI  |  Async | Medium | [ ] |
| --- | --- | --- | --- |

**8.3  HuggingFace & Open Source Models**

| # | Question | Difficulty | ✓ |
| --- | --- | --- | --- |

| Q87 | How do you load a 13B model on a single 24GB GPU using HuggingFace? What techniques do you apply? HuggingFace  |  GPU | Hard | [ ] |
| --- | --- | --- | --- |

| Q88 | What is PEFT / LoRA fine-tuning? When would you fine-tune vs prompt-engineer vs RAG? Fine-tuning  |  LoRA | Hard | [ ] |
| --- | --- | --- | --- |

| Q89 | Explain the HuggingFace model hub's safetensors format. Why is it safer than .bin? HuggingFace  |  Security | Medium | [ ] |
| --- | --- | --- | --- |

| Q90 | How do you evaluate an open-source model vs GPT-4 for a specific business task before committing? Evaluation  |  Model Selection | Medium | [ ] |
| --- | --- | --- | --- |

# SECTION 9 — Live Coding Questions

| 10–15 min coding questions. Test Python fundamentals + AI domain knowledge. Pick ONE per interview. |
| --- |

**QUESTION LC-1  |  Token Budget Manager (Context Window Trimming)**

| Problem: Write trim_history(messages, max_tokens) that preserves the system message and last user message, drops oldest messages first, and fits within token budget (approx = len(content) // 4). Follow-up: Add keep_last_n_turns param to always preserve the N most recent turns. Look for: Edge cases (no system msg, budget too small), clean list slicing, understanding WHY this problem exists. |
| --- |

**QUESTION LC-2  |  Retry Decorator with Exponential Backoff**

| Problem: Write a @retry(max_attempts=3, backoff_factor=2) decorator that retries a function on exception with exponential backoff. Should log each retry attempt. Follow-up: Add retry_on parameter to only retry on specific exception types (e.g. RateLimitError). Look for: functools.wraps usage, correct backoff math (2^attempt * factor), async support awareness. |
| --- |

**QUESTION LC-3  |  LRU Cache for Embedding Results**

| Problem: Implement a class EmbeddingCache(max_size) that caches text-to-vector results. Evicts the least recently used entry when full. Must support get(text), set(text, vector), and cache_stats(). Follow-up: Make it thread-safe using a Lock. What changes for async code? Look for: OrderedDict usage, correct LRU eviction logic, hit/miss rate tracking. |
| --- |

**QUESTION LC-4  |  Hash-Based Dataset Splitter**

| Problem: Write split_dataset(data, id_field, test_ratio) that assigns each row to train or test using a hash of its ID — so splits are stable even when rows are added. No row that was ever in train should appear in test. Follow-up: Add a validation split. Explain how the threshold formula (hash % 256 <= threshold) works. Look for: hashlib usage, correct threshold math, awareness of crc32 vs md5 for speed vs collision. |
| --- |

**QUESTION LC-5  |  Rate-Limited Async Batch Embedder**

| Problem: Write async_batch_embed(texts, batch_size, max_concurrent) that batches a list of texts, calls an async embed(batch) function, and limits concurrency using a semaphore. Returns all embeddings in original order. Follow-up: Add a progress callback that fires after each batch completes. Look for: asyncio.Semaphore, asyncio.gather, correct order preservation with enumerate/zip. |
| --- |

# EVALUATION RUBRIC

| Competency | Strong (4-5) | Adequate (2-3) | Weak (0-1) |
| --- | --- | --- | --- |
| Python & Coding (25%) | Clean code, edge cases handled, Pythonic patterns | Functional code, misses some edges | Syntax issues, no edge cases considered |
| LLM / RAG Depth (30%) | Explains trade-offs, knows failure modes | Uses frameworks, lacks depth | Buzzwords only, no real understanding |
| System Design (25%) | Covers scale, failure, monitoring from the start | Basic happy-path design | No trade-off reasoning |
| Communication (20%) | Concise, structured, asks good questions | Passable, some rambling | Vague or no structured thinking |

| Will NOT Fit this Role:  Prompt-only users with no engineering depth  |  Pure data-science / academic ML profiles  |  Candidates who cannot integrate AI into real applications |
| --- |