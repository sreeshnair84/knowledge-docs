---
title: "CCAO-F Exam Prep — Complete Guide"
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: native-md
source_file: ""
tags: ["coding-tools", "claude", "certification"]
doc_type: certification
exam_code: "CCAO-F"
exam_validity: "2 years"
last_verified_against_vendor: 2026-07-17
---

# CCAO-F Exam Prep — Complete Guide

Complete preparation for the Claude Certified Associate – Foundations (CCAO-F) exam — all 7 domains, 65 original scenario-based practice questions with full answer rationale. This exam is built for non-developer professionals — operations, marketing, project management, education, communications, HR — who use Claude as a productivity tool for repeatable workflows. It does not test coding, the API, or MCP; that content belongs to the separate Developer and Architect tracks.

---

## Exam Facts

| Item | Detail |
| ------ | -------- |
| Questions | 60 (multiple-choice and multiple-response) |
| Duration | 120 minutes |
| Passing score | 720 / 1000 (scaled) |
| Cost | $99 per attempt (free for the first 5,000 Claude Partner Network employees) |
| Format | Online proctored or Pearson VUE test center |
| Validity | 2 years |
| Prerequisite | None |
| Audience | Non-developer professionals using Claude.ai for repeatable business workflows — not developers or API builders |

*Domain weightings and exam facts are compiled from Pearson VUE's Anthropic certification listing and multiple independent community sources; Anthropic's official candidate handbook (gated behind Partner Academy login) is the authoritative source — verify against it before your exam date.*

**Note on validity:** community study guides report the renewal period as 12 months rather than 2 years. This guide follows the 2-year figure supplied by the task brief, matching the Foundations-tier pattern used elsewhere in the Claude certification program, but treat this specific number as unconfirmed until you check the candidate handbook.

---

## Domain Weightings

| Domain | Weight | ~Questions (of 60) |
| -------- | -------- | ----------- |
| 1 — Prompting and Task Execution | 14% | 8 |
| 2 — Output Evaluation and Validation | 21% | 13 |
| 3 — Product and Model Selection | 12% | 7 |
| 4 — Workflow Integration and Solution Design | 16% | 10 |
| 5 — Configuration and Knowledge Management | 12% | 7 |
| 6 — Governance, Risk, and Responsible Use | 15% | 9 |
| 7 — Troubleshooting and Optimization | 10% | 6 |

Output Evaluation (21%) is the single largest domain — bigger than Prompting itself. The exam's implicit message: knowing how to write a good prompt matters less than knowing whether you can trust, and when to double-check, what came back.

---

## Domain 1 — Prompting and Task Execution (14%)

### Core Concepts

**The four things every effective prompt supplies:**

1. **Task** — what you actually want done, stated as an instruction, not a topic
2. **Context** — the source material, background, or constraints Claude needs (paste it or attach it — don't assume Claude "knows" your company's numbers)
3. **Format** — the shape of the answer (table, three bullet points, a 150-word paragraph, a subject line)
4. **Audience/tone** — who will read the output and how formal it should be

**Task-type framing** — the right prompting approach depends on what kind of work you're asking for:

| Task type | What to include | Common mistake |
| ----------- | ------------------ | ----------------- |
| Analysis | The actual data (pasted or attached), the specific question, desired output shape | Asking Claude to "analyze our numbers" without providing the numbers |
| Research | Scope, time boundary, how many sources/how deep, whether it should browse (Research mode) | Accepting an unsourced, from-memory answer as if it were verified research |
| Drafting | Audience, tone, length limit, a style example if one exists | "Write something good" with no constraints, then being surprised by generic output |
| Brainstorming | A quantity target and permission to be unconventional | Over-constraining early, which collapses the option space before ideas can diverge |

**Iteration over restart** — when an output is close but not right, reply in the same conversation ("shorten this to 200 words, keep the same three points") rather than opening a new chat and re-explaining everything. The existing thread already has the context; a fresh chat throws it away.

**Success criteria up front** — stating what "done" looks like ("this should be ready to paste into the newsletter with no further edits") gives Claude a target to hit and gives you a concrete bar to evaluate against afterward.

**Sequencing complex requests** — a request with several dependent parts (gather → summarize → format as a one-pager) is more reliable broken into a short sequence of turns than bundled into a single sprawling instruction, because Claude is less likely to silently drop a sub-part of a long compound ask.

---

### Domain 1 Practice Questions

**Q1.** A marketing associate asks Claude: "Write a product launch email." The result is generic and unusable. What is the most effective fix?

A) Ask Claude to "try again, but better"
B) Specify the audience, tone, key features to highlight, desired length, and one example of a past email in the brand's voice
C) Switch to a more powerful model
D) Repeat the exact same prompt in a new chat

**Answer: B**
*A generic prompt produces a generic result. Supplying audience, tone, the specific features to feature, a length target, and an example of the brand's voice gives Claude the task, format, and audience signal it was missing. A stronger model doesn't compensate for missing context, and repeating the same underspecified prompt anywhere changes nothing.*

---

**Q2.** An operations manager pastes a chart title and asks, "What trend do you see in our Q2 sales?" without attaching the underlying spreadsheet. Claude confidently describes an upward trend. What went wrong?

A) Claude used Research mode incorrectly
B) The manager should have used a Project instead of a chat
C) Claude had no actual data to analyze and generated a plausible-sounding answer instead of a grounded one
D) The question was too short

**Answer: C**
*Without the underlying numbers, Claude has nothing to analyze — a confident-sounding "trend" in that situation is fabricated, not observed. The fix is task-level: attach or paste the actual data. Using a Project might help organize recurring analysis, but it doesn't solve the immediate problem of an ungrounded question, and length wasn't the issue.*

---

**Q3.** A project coordinator needs Claude to (1) pull key dates from five vendor contracts, (2) summarize obligations, and (3) format the result as a one-page table. Which approach is most reliable?

A) One long prompt containing all three instructions at once
B) Three separate, sequential turns in the same conversation, each building on the last
C) Three separate chats, one per step, with no shared context
D) Ask Claude to "handle the contracts" and let it decide the steps

**Answer: B**
*Sequencing dependent steps in the same conversation lets each step build on verified prior output and reduces the risk that a long compound instruction silently drops one of the three asks. A single giant prompt increases the chance a sub-task gets shortchanged; splitting into disconnected chats loses the shared context each step needs; and an unscoped instruction leaves too much to guesswork.*

---

**Q4.** Claude produces a first draft of a client proposal that is well-written but twice as long as needed. What is the best next step?

A) Start a new chat and re-paste all the original context with a shorter length requested
B) Reply in the same conversation: "Cut this to half the length, keep the three main points"
C) Manually rewrite the whole document
D) Ask a colleague to redo the task

**Answer: B**
*The existing conversation already has full context of the draft and the original request — a targeted follow-up edits from there. Restarting in a new chat discards that context and forces you to re-supply everything; manual rewriting or reassigning the task abandons the efficiency gain of using Claude in the first place.*

---

**Q5.** A team wants 20 possible names for a new internal tool. Which prompt is most likely to produce a useful, varied list?

A) "Give me the single best name for our tool."
B) "Give me exactly 3 formal-sounding names, nothing playful."
C) "Give me 20 name ideas — mix formal and playful, don't filter for 'good' yet."
D) "Name our tool the way a Fortune 500 company would."

**Answer: C**
*Brainstorming benefits from an explicit quantity target and permission to range widely before narrowing — over-constraining early (Option B) or asking for a single "best" answer (Option A) collapses the option space too soon. Option D imposes a single narrow lens rather than encouraging divergent ideas.*

---

**Q6.** An HR coordinator needs Claude to draft meeting minutes that match the company's existing template exactly (headers, bullet style, action-item format). What is the most effective way to ensure the output matches?

A) Describe the template in words only
B) Paste a filled-in example of the template alongside the request, so Claude can match the pattern
C) Ask Claude to "guess" the standard format
D) Accept whatever format Claude defaults to and reformat manually afterward

**Answer: B**
*Providing a concrete example anchors the format far more reliably than a verbal description alone — Claude can match structure, header style, and tone directly from the example. Guessing or manually reformatting afterward wastes the advantage of getting the format right the first time.*

---

**Q7.** Before asking Claude to draft a client-facing summary, an analyst writes: "The final version should be ready to paste directly into the client email with no further edits — formal tone, under 150 words." What is this an example of?

A) Chain-of-thought prompting
B) Stating explicit success criteria up front
C) Multi-shot prompting
D) An unnecessary constraint that will reduce quality

**Answer: B**
*Defining what "done" looks like — ready to send, formal, under 150 words — gives Claude a concrete target and gives the analyst an objective bar to check the output against. It is not an example-based technique (multi-shot) nor a reasoning technique; and specificity here improves usability rather than harming it.*

---

**Q8.** An HR generalist wants an up-to-date answer on a recent change to a specific regulation before drafting internal guidance. Which task-type framing is most appropriate?

A) Treat it as a drafting task and ask Claude to "write the policy"
B) Treat it as a research task — ask Claude to look into current sources (using Research mode or web-enabled search) rather than answer from memory, and plan to verify before publishing
C) Treat it as a brainstorming task to generate options
D) Treat it as an analysis task and paste in last year's policy only

**Answer: B**
*Regulatory questions are time-sensitive and factual — framing this as a research task, using a mode that can check current sources, is the right task-type match, followed by verification before anything goes into internal guidance. Drafting or brainstorming framing skips the fact-finding step entirely, and analyzing only last year's policy risks missing the change altogether.*

---

## Domain 2 — Output Evaluation and Validation (21%)

### Core Concepts

This is the largest domain on the exam, and it maps directly to the "Discernment" competency in Anthropic's own AI Fluency framework: critical thinking cannot be outsourced to the model, no matter how confident its tone sounds.

**Hallucination patterns to recognize:**

- Fabricated citations — plausible-sounding report names, URLs, or page numbers that don't correspond to anything real
- Invented statistics — precise-looking numbers with no traceable source
- Confidently wrong specifics — a correct-sounding but incorrect date, name, or quote embedded in an otherwise accurate summary
- Fluent tone as a false signal — confidence and correctness are unrelated; a hallucinated answer reads exactly as smoothly as a correct one

**Validation techniques and what each catches:**

| Technique | Catches |
| ----------- | --------- |
| Cross-reference against the source document you actually provided | Facts/numbers not present in the source |
| Ask Claude to quote directly from provided material rather than cite externally | Fabricated external citations |
| Independently spot-check key dates, names, and figures | Plausible-but-wrong specifics |
| Deliberately read for missing viewpoints | One-sided or biased framing |
| Check the output against every part of the original request | Silently dropped sub-questions |

**The limits of self-evaluation.** Asking Claude "is this correct?" about a fact it just generated is not a reliable check — a model can restate a wrong answer with the same confidence as a right one. Claude's self-checking is trustworthy for **format and completeness** ("did I answer all five parts, is this valid JSON, is this under 200 words") but not for **factual accuracy about the world** — that requires an external source or a human who knows the domain.

**When human review is mandatory (not optional):** legal or regulatory content, financial figures used externally, HR/employment decisions, medical or safety-adjacent content, anything external-facing and irreversible once sent, and anything the organization's own policy flags as high-stakes.

**Matching output format to purpose:** a board deck needs slide-ready bullets or a table, not a dense paragraph; an internal working note can be looser; a client-facing summary needs a tone pass a raw draft doesn't.

---

### Domain 2 Practice Questions

**Q9.** Claude summarizes an uploaded 40-page vendor report and includes a citation: "(Source: *Vendor Market Outlook 2025*, p. 12)." The uploaded document has no such title or page numbers. What should the reader conclude?

A) The citation is trustworthy because it looks properly formatted
B) The citation is very likely fabricated — Claude generated a plausible-looking reference not grounded in the actual source document
C) The document must have been mis-uploaded
D) This is normal behavior and doesn't need to be checked

**Answer: B**
*A confidently formatted citation is not evidence it's real — this is a textbook hallucination pattern. Because the actual source document contains no such title or page numbering, the citation should be treated as fabricated until verified. Proper formatting is not a trust signal; only tracing the claim back to real source content is.*

---

**Q10.** Asked for a competitor analysis, Claude returns a list of five weaknesses for the competitor and zero strengths. What is the most likely issue, and what should the analyst do?

A) This is accurate and ready to use as-is
B) The output is likely one-sided; the analyst should ask explicitly for strengths as well as weaknesses and check for missing balance before using it
C) Claude cannot discuss competitors at all
D) The analyst should switch to a different AI tool

**Answer: B**
*An all-weaknesses, no-strengths competitor analysis is a bias red flag — the prompt likely primed a lopsided view. The fix is to explicitly request balance ("include strengths too") and read critically for what's missing before the analysis informs a real decision. There's no platform restriction on discussing competitors, and switching tools doesn't address the underlying prompting/validation gap.*

---

**Q11.** Claude generates financial projections intended for inclusion in a board deck. What is the correct next step before those numbers are presented?

A) Present them as-is — Claude's math is reliable
B) Route the projections through human review by someone with financial expertise before they reach the board
C) Round the numbers to make them look less precise
D) Ask Claude a second time and use whichever answer sounds more confident

**Answer: B**
*Board-facing financial figures are exactly the high-stakes, externally consequential category that requires mandatory human review regardless of how plausible the output looks. Rounding is cosmetic and doesn't address accuracy; asking twice and picking the more confident-sounding answer conflates confidence with correctness, which is the core trap this domain tests.*

---

**Q12.** After Claude generates a specific statistic, the user asks Claude, "Are you sure that number is correct?" and Claude replies, "Yes, that figure is accurate." Does this exchange verify the statistic?

A) Yes — Claude re-checked and confirmed it
B) No — Claude's self-reaffirmation is not independent verification; a hallucinated number can be restated with the same confidence as a correct one
C) Yes, because Claude would say "I'm not sure" if it were wrong
D) It depends on which Claude model was used

**Answer: B**
*Self-evaluation is reliable for format and completeness, not for factual accuracy — asking Claude to grade its own fact doesn't add new information; it can simply restate the same claim confidently. Claude does not reliably flag its own hallucinations, and no model tier changes this fundamental limitation. Real verification requires an external source.*

---

**Q13.** A manager asks Claude to draft a performance review for an underperforming employee. The draft uses harsh, blunt language. What is the correct next step?

A) Send it as-is to save time
B) Have the manager review and edit the tone before it reaches the employee — performance reviews are a high-stakes, person-facing output requiring human review
C) Ask Claude to make it even more direct
D) Delete the draft and skip the review entirely

**Answer: B**
*Content that directly affects a person's employment and well-being sits squarely in the mandatory-human-review category — tone, fairness, and framing all need a human pass before anything reaches the employee. Sending it unedited or skipping the review process entirely both abandon the organization's actual review obligations.*

---

**Q14.** A staff member asks Claude a five-part question. The response only addresses three of the five parts. What validation step would have caught this before the output was used?

A) Checking the response's word count
B) Checking the response against each part of the original request to confirm nothing was dropped
C) Asking Claude to translate the response into another language
D) Assuming a well-formatted response is a complete one

**Answer: B**
*Completeness has to be checked explicitly against the original ask — a fluent, well-organized answer can still silently skip parts of a compound question. Word count and formatting quality say nothing about whether every sub-question was actually answered; that assumption is exactly the trap this question tests.*

---

**Q15.** A finished analysis needs to appear in a slide for a leadership meeting. Claude's output is a dense, well-written paragraph. What should happen before it's used?

A) Nothing — dense prose reads as more thorough in a slide
B) Reformat into slide-appropriate bullets or a table before the meeting, since format needs to match the delivery context, not just be well-written
C) Print the paragraph and read it aloud
D) Ask Claude to translate it to a different tone only

**Answer: B**
*Output format needs to match how it will actually be used — a dense paragraph is the wrong shape for a slide regardless of how well-written it is. Quality of writing and appropriateness of format are separate checks; this domain explicitly covers picking the right output format for the audience and setting.*

---

**Q16.** An employee asks Claude a specific question about whether terminating a particular employee would expose the company to legal risk, and Claude provides a direct, confident answer. What should the employee do?

A) Act on Claude's answer directly since it sounded confident and well-reasoned
B) Treat it as a starting point only and route the actual decision through legal/HR review — this is exactly the compliance-sensitive category requiring human sign-off
C) Ask a different AI tool to double-check
D) Proceed only if two different questions to Claude produce the same answer

**Answer: B**
*Employment-law questions with real legal exposure are a canonical mandatory-human-review case — confidence in the answer's tone is not a substitute for qualified review. Consulting a second AI tool or repeating the same question and checking for consistency doesn't add the domain expertise or accountability that legal/HR review provides.*

---

**Q17.** A marketing writer asks Claude to lightly paraphrase a customer testimonial for use in an ad. The paraphrase changes a specific number the customer mentioned. What is the correct process going forward?

A) Trust the paraphrase since it reads naturally
B) Always check paraphrased quotes and figures against the original transcript before publishing, since paraphrasing can silently alter specific facts
C) Avoid using customer quotes altogether
D) Ask Claude to paraphrase it a second time instead

**Answer: B**
*Paraphrasing is exactly where small factual drift creeps in — a natural-sounding paraphrase is not the same as an accurate one. The fix is a source cross-check against the original transcript, not avoidance of testimonials altogether or a second paraphrase pass, which doesn't address the root cause.*

---

**Q18.** A team notices that when they ask Claude for "sources" on a claim without providing any reference material, it sometimes returns citations that turn out not to exist. What is the best process fix?

A) Stop asking Claude any questions requiring evidence
B) Only trust citations that can be traced to material the team actually provided, and explicitly instruct Claude to quote from the supplied source rather than invent external references
C) Ask for more citations to increase the odds one is real
D) Assume all citations from Claude are accurate going forward

**Answer: B**
*Grounding requests in provided material, and instructing Claude to quote from that material rather than reach for external references it may fabricate, directly addresses the pattern. Asking for more citations increases exposure to fabrication rather than reducing it, and blanket avoidance overcorrects rather than fixing the actual process gap.*

---

**Q19.** A recruiter notices that a Claude-assisted candidate-screening rubric consistently ranks applicants from a small number of universities higher, regardless of stated qualifications. What should the recruiter do?

A) Assume the rubric is objective because an AI generated it
B) Flag the pattern as a likely bias issue, review and correct the rubric's criteria, and keep a human in the loop on screening decisions
C) Use the rubric anyway since changing it now would slow down hiring
D) Ask Claude if the rubric is fair and accept its answer

**Answer: B**
*A systematic skew correlated with a proxy for background, unrelated to stated qualifications, is a bias pattern that needs to be caught and corrected — human oversight of hiring criteria is exactly the discipline this domain tests. AI-generated does not mean bias-free, and asking the model to self-assess its own fairness has the same self-evaluation limitation covered elsewhere in this domain.*

---

**Q20.** A company drafts two things using Claude: an internal brainstorm note (never leaves the team) and a customer-facing chatbot script (goes live to thousands of users). Should both receive the same level of scrutiny before use?

A) Yes — all Claude output should be reviewed identically
B) No — the customer-facing, high-reach script warrants a substantially higher review bar than the internal, low-stakes note
C) No — the internal note actually needs more review since it's less polished
D) Review level should depend only on which model generated the text

**Answer: B**
*Review intensity should scale with stakes and reach: something never seen outside the team carries far less risk than a script served to thousands of customers. Treating every output identically wastes review effort on low-stakes material while risking under-reviewing high-stakes material — the right approach is proportional, not uniform or model-dependent.*

---

**Q21.** Claude summarizes a quarterly earnings report. The summary reads fluently and the numbers look internally consistent, but one revenue figure is actually off by one digit compared to the source report. What does this scenario illustrate?

A) Fluency and internal consistency are proof of accuracy
B) A confident, well-written, internally consistent summary can still contain a factual error — the only way to catch it is an independent check against the original source numbers
C) This kind of error is impossible with current models
D) The error would have been avoided by asking for a longer summary

**Answer: B**
*This is the core trap of this domain: plausibility, fluency, and internal consistency are not accuracy signals. The only reliable catch is comparing the specific figures against the original source document — not more text, not a "does this sound right" gut check, and not an assumption that the error rate is effectively zero.*

---

**Q22.** Which combination of practices most effectively reduces validation risk across an organization using Claude for regular business tasks?

A) Trust fluent, confident-sounding output and skip verification to save time
B) Ground requests in real source material, spot-check key facts independently, and require human review at defined high-stakes gates
C) Rely entirely on Claude's own self-assessment of accuracy
D) Only verify output that "feels wrong"

**Answer: B**
*Defense-in-depth for output evaluation combines three layers: grounding the request in real material (reduces the chance of hallucination in the first place), independent spot-checks on key facts (catches what slips through), and mandatory review at defined high-stakes points (catches what individual judgment might miss). Trusting fluency, relying on self-assessment, or only checking outputs that "feel wrong" all miss the central lesson of this domain — confident-sounding is not the same as correct.*

---

## Domain 3 — Product and Model Selection (12%)

### Core Concepts

**Choosing the right Claude surface:**

| Surface | Best for |
| --------- | ---------- |
| Chat | One-off questions, quick tasks with no need for reuse |
| Projects | Recurring work with reference material and consistent instructions across many conversations |
| Artifacts | A deliverable you'll view, iterate on visually, or share — a document, chart, or small interactive tool |
| Research mode | Multi-source investigation requiring browsing and synthesis, not a single from-memory answer |
| Claude in Chrome | Tasks embedded in a specific web app you're already working in (forms, CRM records, web research) |
| Claude in Slack | Quick help without leaving team chat |

**Choosing a model tier for the task.** Claude ships in tiers that trade off speed, cost, and depth of reasoning: a fast/economical tier for high-volume, well-defined tasks (classification, extraction, quick drafts); a balanced tier for everyday work (writing, summarization, analysis); and a top-capability tier for deep, careful reasoning (nuanced strategy, multi-step judgment). The exam tests *which tier fits which task* — not model version numbers or pricing, which change too often to be reliably tested.

**Practical rule of thumb:** don't reach for the most powerful/expensive tier for simple, repetitive work, and don't under-power a task that genuinely requires careful reasoning just because it's "just" a memo.

**Context window practicalities.** A conversation that runs very long (weeks of back-and-forth, or an enormous pasted history) can start producing less consistent answers as the model works with a large, cluttered context. The practical response is to start a fresh conversation (or a well-organized Project) with a condensed summary of what matters, rather than continuing to pile on indefinitely.

**Plan-tier feature gates:** individual productivity features (Projects, Artifacts, connectors) are available on paid individual/team plans; organization-wide needs — admin controls, audit logs, SSO, compliance configurations like HIPAA-ready setups — require Enterprise-tier plans. Recognize when a requirement (compliance, centralized governance) means "this needs Enterprise," not just a bigger individual subscription.

---

### Domain 3 Practice Questions

**Q23.** A finance analyst produces the same weekly report from the same three data sources every Monday, using the same formatting instructions each time. What is the most efficient Claude setup?

A) A brand-new chat each week, re-explaining the sources and format from scratch
B) A Project with the recurring instructions and reference files saved once, reused every week
C) Research mode, since it involves data
D) An Artifact recreated from nothing each week

**Answer: B**
*Recurring work with consistent instructions and reference material is exactly what Projects are for — set it up once, reuse it every week without re-explaining context. Starting fresh each week wastes the setup effort repeatedly; Research mode is for open-ended multi-source investigation, not a fixed recurring report; and Artifacts are about the shape of a deliverable, not about persisting instructions and files.*

---

**Q24.** A support operations team needs to sort thousands of incoming tickets into five fixed priority categories, a simple, well-defined, high-volume task. Which model tier is most appropriate?

A) The most powerful, highest-cost tier available, to guarantee accuracy
B) The fastest, most economical tier suited to well-defined, high-volume classification
C) Whichever tier is newest, regardless of task fit
D) A tier chosen at random to compare results

**Answer: B**
*Simple, well-defined classification into fixed categories is precisely the kind of high-volume, low-ambiguity task suited to the fastest and most economical tier — reaching for the top-capability tier adds cost and latency without a meaningful accuracy gain on a task this well-defined. Tier choice should follow task complexity, not recency or guesswork.*

---

**Q25.** A negotiation lead needs a nuanced, multi-factor strategy memo weighing competing priorities, incomplete information, and long-term relationship risk. Which model tier is most appropriate?

A) The fastest, most economical tier, to save time
B) The top-capability tier suited to careful, nuanced, multi-step reasoning
C) Any tier — task complexity doesn't affect the right choice
D) Whichever tier produces the shortest output

**Answer: B**
*A task requiring careful weighing of competing, ambiguous factors is exactly where the deepest-reasoning tier earns its cost — under-powering a genuinely complex judgment call to save time risks a shallower, less reliable strategy memo. Output length is not a proxy for the right tier, and task complexity is precisely what should drive the choice.*

---

**Q26.** A single ongoing chat has been used for six weeks of mixed, unrelated conversations. Recent answers feel less consistent and occasionally miss earlier context. What is the best response?

A) Keep using the same chat indefinitely — length doesn't matter
B) Start a fresh, well-organized conversation (or Project) with a condensed summary of what still matters, rather than continuing to accumulate unrelated history
C) Switch to a different model tier to fix the inconsistency
D) Delete the chat and never document what was learned from it

**Answer: B**
*A single conversation carrying weeks of unrelated history is exactly the scenario where starting fresh with a condensed, relevant summary produces more consistent results than continuing indefinitely. A model-tier switch doesn't address the underlying context clutter, and simply deleting history without capturing what mattered throws away useful work rather than reorganizing it.*

---

**Q27.** A strategy team needs a competitive landscape analysis pulling from many current public sources, not a single quick answer. Which approach fits best?

A) A single chat question answered from the model's existing knowledge
B) Research mode, designed for multi-source browsing and synthesis over an extended investigation
C) An Artifact, since the output will be a document
D) Switching to the fastest, most economical model tier

**Answer: B**
*Multi-source investigation requiring current information and synthesis across many sources is exactly what Research mode is designed for — a single from-memory chat answer can't reliably reflect current, multi-source reality. Whether the final output becomes an Artifact is a separate downstream choice about deliverable format, not about how the research itself should be gathered, and tier speed isn't the limiting factor here.*

---

**Q28.** An enterprise needs centralized admin controls, audit logs, and SSO across the whole organization to meet a compliance requirement. What is the correct product decision?

A) Have each employee use an individual paid plan
B) Move to an Enterprise-tier plan, which provides the organization-wide governance controls individual plans don't
C) Use only the free tier and manage compliance manually
D) These requirements can't be met by any Claude plan

**Answer: B**
*Admin controls, audit logs, and SSO are organization-wide governance features gated to Enterprise-tier plans — individual paid subscriptions give each person productivity features but not centralized oversight. Manual tracking on a free tier doesn't meet a real compliance requirement, and these capabilities do in fact exist at the appropriate plan tier.*

---

**Q29.** A sales rep repeatedly needs to look up account details and update fields directly inside the company's web-based CRM while getting Claude's help drafting notes. What is the most efficient setup?

A) Copy CRM data into a separate Claude.ai chat every time
B) Use Claude in Chrome, which can work alongside the CRM page directly in the browser
C) Ask a developer to build a custom integration for this one task
D) Avoid using Claude for this workflow entirely

**Answer: B**
*A task that's tied to a specific web application the rep is already working in is the intended use case for the browser-based integration — it can read the page and assist in place, avoiding the copy-paste overhead of a separate chat. Requesting a custom developer integration is disproportionate for a task an existing platform feature already covers.*

---

## Domain 4 — Workflow Integration and Solution Design (16%)

### Core Concepts

**Is this task actually AI-suited?** A good candidate is repeatable, judgment-based (not purely mechanical rule-following that a simple script already handles), and has a well-defined "what good output looks like." A poor candidate is a one-off, ambiguous request with no repeatable shape, or a task that genuinely requires system access Claude doesn't have.

**Redesign, don't just bolt on.** The highest-value move is usually not "have Claude write the first draft of our existing broken process" — it's identifying the actual bottleneck in the process (too many handoffs, unclear ownership, redundant re-entry of the same data) and redesigning around it. Automating the wrong step still leaves the real bottleneck in place.

**Signal → response for solution design:**

| Signal | Response |
| --------- | ---------- |
| Task repeats weekly/monthly with the same shape | Build a Project with saved instructions and reference material |
| Task must trigger automatically from another system (e.g., a new CRM record) | Escalate — this is API/automation work for a Developer, outside Associate-level platform features |
| Stakeholders are unsure what Claude can and can't do | Set expectations explicitly: name the capabilities, name the limitations, name where a human still reviews |
| A new workflow hasn't been tested at real scale | Pilot with a small group first, gather feedback, then expand |
| Workflow needs live data from a specific external system | Use the appropriate connector (e.g., Google Drive, Gmail) rather than manual copy-paste |

**Communicating value and limitations.** A credible rollout states both what improved (with real pilot data where possible — time saved, error rate, turnaround) and what still requires human judgment. Over-promising ("this replaces the reviewer") erodes trust the first time it's wrong; being upfront about the review boundary builds it.

**Knowing when to escalate.** An Associate-level professional builds solutions using Claude.ai's platform features (Projects, connectors, custom instructions, Custom Styles). The moment a requirement needs custom code, an API integration, automatic triggering from another system, or a bespoke tool, it has crossed into Developer or Architect territory — the right move is to flag it, not force-fit it with chat-based workarounds.

---

### Domain 4 Practice Questions

**Q30.** A coordinator manually recreates the same weekly status report from five sources every Monday, spending 90 minutes each time on the exact same steps. What is the best workflow design?

A) Keep doing it manually — it's "only" 90 minutes
B) Build a Project with the recurring sources and formatting instructions saved once, turning a 90-minute manual task into a repeatable, reusable workflow
C) Ask Claude to write the report from scratch in a new chat every week with no saved setup
D) Assign the task to a different employee

**Answer: B**
*A task that repeats weekly with the same shape and sources is the clearest signal for a saved, reusable Project — set up once, reused every week. Continuing manually or rebuilding context from zero each week both forfeit the efficiency gain; reassigning the task to someone else doesn't change the underlying process inefficiency.*

---

**Q31.** A team wants a workflow where, the moment a new lead is submitted through their web form, a welcome email is generated and sent automatically with no human involvement. What is the correct solution-design call?

A) This can be fully built by an Associate using only Claude.ai chat
B) This requires automatic triggering from another system and should be escalated to a Developer for an API-based integration
C) This is impossible with Claude in any form
D) Set up a Project and check it manually every hour instead

**Answer: B**
*Automatic triggering from an external system event (a form submission) with no human in the loop is API/automation territory — outside the platform features available to an Associate-level user. It's not impossible with Claude broadly, just outside this exam's scope of "what an Associate builds directly"; manually checking hourly doesn't deliver the automatic behavior the team actually asked for.*

---

**Q32.** During a rollout, a manager tells their team "the AI will handle client escalations end-to-end, no review needed." Two weeks later a client receives an inappropriate automated response and the manager has to walk back the claim publicly. What was the underlying mistake?

A) The technology failed unexpectedly
B) The rollout over-promised capability and didn't communicate the limitation that human review was still needed for a high-stakes, client-facing process
C) The team should have used a more powerful model tier
D) Client escalations should never involve AI in any capacity

**Answer: B**
*The failure here is in how the workflow was communicated, not a surprise technical failure — client escalations are high-stakes and client-facing, exactly where a human-review boundary should have been stated upfront. A different model tier doesn't substitute for a stated review boundary, and the lesson isn't "never use AI here" — it's "don't claim full autonomy where review is actually required."*

---

**Q33.** A customer intake process is slow because requests bounce between four departments before anyone acts on them. Leadership asks Claude to write faster first-draft responses at the current first step. Does this fix the actual problem?

A) Yes — faster drafting is the same as solving the process
B) Not necessarily — the real bottleneck (four handoffs) is untouched; a genuine workflow redesign addresses the handoffs, not just speeds up one step within a broken structure
C) Yes, because AI-generated drafts are inherently better than human drafts
D) No, because Claude cannot help with intake processes at all

**Answer: B**
*Bolting a faster draft onto the first step of a four-department relay doesn't remove the relay — the bottleneck (handoffs and unclear ownership) persists. Real workflow integration means identifying and redesigning around the actual constraint, not just accelerating one step of an otherwise unchanged, broken structure.*

---

**Q34.** A department wants to roll out a new Claude-based workflow to all 200 employees immediately, without testing it first. What is the recommended approach instead?

A) Proceed with the full rollout — faster adoption is always better
B) Pilot with a small group first, gather feedback, and refine before expanding organization-wide
C) Skip piloting but reduce the group to 100 employees instead of 200
D) Only roll it out after every possible edge case has been manually enumerated in advance

**Answer: B**
*Piloting with a small group surfaces real issues — unclear instructions, edge cases, stakeholder concerns — that can be fixed before wider exposure, which is far cheaper than discovering them at full scale. Immediate full rollout risks compounding an unrefined process across 200 people, while halving the group size without a feedback loop doesn't actually add a piloting step; and demanding exhaustive edge-case enumeration up front is impractical and unnecessary before a first pilot.*

---

**Q35.** A team wants their Claude workflow to always reference the latest version of a shared planning document stored in Google Drive, without anyone manually re-uploading it. What is the right integration point?

A) Manually copy-paste the document's contents into the chat every time it's needed
B) Use the Google Drive connector so the workflow can reference the current file directly
C) Ask everyone to email the file to each other before each use
D) This isn't possible with any current Claude feature

**Answer: B**
*Connecting to the live source through an available connector is exactly the intended integration point for "always reference the current version" — it removes the manual re-upload step this scenario is trying to avoid. Manual copy-paste or emailing the file both reintroduce the very friction the team is trying to eliminate, and the capability does exist.*

---

**Q36.** A manager is deciding whether to build a Claude-based workflow around a task: entering the same customer data into two disconnected internal systems, verbatim, with no judgment involved. Is this a good candidate for a Claude-based solution design?

A) Yes — any repetitive task benefits from Claude
B) It's a weaker candidate for a chat-based Claude workflow specifically because it involves no judgment; it's a pure data-transfer task better suited to a direct system integration than a conversational tool
C) No — Claude should never be used for repetitive tasks
D) Yes, because the task repeats often, and repetition alone is sufficient justification

**Answer: B**
*Repeatability alone isn't sufficient — the best Claude-based workflows involve some judgment or synthesis, not verbatim mechanical transfer between two systems, which is better solved with a direct system integration (a Developer/Architect-level solution) than a conversational tool. This isn't a blanket "never use AI for repetitive tasks" rule; it's a judgment call about fit for this specific kind of task.*

---

**Q37.** After a two-week pilot, a coordinator wants to convince skeptical leadership to expand a new Claude-assisted workflow. What is the most persuasive approach?

A) Assert that "AI is the future" without data
B) Present concrete pilot results — time saved, error rate, turnaround time — compared to the prior process
C) Emphasize how sophisticated the underlying technology is
D) Avoid mentioning any limitations to keep the pitch simple

**Answer: B**
*Concrete before/after pilot data (time, errors, turnaround) is what actually persuades skeptical stakeholders — it demonstrates real value rather than asserting it. Technical sophistication isn't the business case leadership cares about, and omitting limitations undermines credibility the moment reality doesn't match an overly rosy pitch.*

---

**Q38.** A single Project's custom instructions were written by the Sales team for their process, but Customer Support has started reusing the same Project for an unrelated workflow, causing incorrect outputs. What is the correct fix?

A) Nothing — one Project should serve every team's needs
B) Give Customer Support their own Project scoped to their own process and instructions, rather than reusing Sales' Project
C) Delete the Project entirely
D) Ask Sales to stop using their own Project

**Answer: B**
*Instructions written for one team's process don't generalize cleanly to a different team's workflow — the fix is proper scoping, a dedicated Project per audience/process, not forcing one Project to serve unrelated needs. Deleting the working Project or disrupting Sales' legitimate use doesn't solve Support's actual problem.*

---

**Q39.** A workflow design calls for pulling live data from an internal system that has no available connector and no supported integration path. What is the correct call?

A) Force a workaround by manually re-typing data into chat every time
B) Flag the gap to the technical/IT team as a genuine integration need rather than force-fitting an unsupported workaround
C) Assume this is impossible and abandon the entire workflow idea
D) Ask Claude to guess at what the data probably contains

**Answer: B**
*When a genuine capability gap exists — no supported connector or integration path — the right response is to escalate it as a real requirement, not to paper over it with a manual workaround that won't scale or a guess that fabricates data. Abandoning the workflow entirely is also premature; the gap may be solvable with proper technical scoping.*

---

**Q40.** A team just redesigned a workflow around Claude and wants to know if it's actually working. Which is the best success metric to track?

A) "We used AI" as a binary yes/no
B) Concrete before/after measures tied to the original problem — time saved, error rate, or adoption/usage over the following weeks
C) How impressed leadership sounded in the first meeting
D) The number of Claude conversations started, regardless of outcome

**Answer: B**
*Success should be measured against the original problem the redesign was meant to solve — time, errors, or actual adoption — not by the mere fact that AI was involved. Anecdotal impressions and raw conversation counts don't establish whether the workflow is actually delivering the intended improvement.*

---

## Domain 5 — Configuration and Knowledge Management (12%)

### Core Concepts

**Scope of settings — what applies where:**

| Setting | Applies to |
| --------- | ------------ |
| Profile-level preferences | Every conversation, across all Projects |
| Project custom instructions | All chats within that specific Project only |
| Project knowledge files | All chats within that specific Project only |
| In-conversation instruction | That single chat/turn only |
| Custom/Output Style | Wherever selected — can be set as a default or applied per conversation |

**Precedence order:** profile-level preferences load first as a baseline; a Project's custom instructions add more specific context on top for work inside that Project; and an instruction typed directly into a specific conversation is the most specific and takes precedence for that exchange, without permanently changing the Project's standing default for future chats.

**Curating Project knowledge well:**

- Name files descriptively ("Q2 2026 Pricing Sheet — Approved," not "doc1.pdf") so both humans and Claude can tell what's current
- Keep knowledge current — a stale pricing sheet or outdated policy document left in a Project will quietly produce wrong answers months later; knowledge bases need a refresh cadence, not a one-time upload
- On paid plans, large knowledge bases scale automatically through retrieval behind the scenes as content grows — this expands what can be referenced, but it does not remove the need for curation; irrelevant or outdated files still dilute answer quality

**Connectors (Google Drive, Gmail, Calendar, and similar).** These let a workflow reference live data without manual copy-paste. Apply least-privilege thinking: grant a connector only the access it actually needs for the task (e.g., calendar-only access for a scheduling workflow) rather than broad access "just in case."

**Custom/Output Styles** let a team or individual set a consistent tone/format as a default, so instructions like "always keep this formal and under 300 words" don't need to be retyped in every conversation.

**Knowledge management hygiene.** Fragmented, duplicate Projects for the same workflow — created independently by different team members with drifting instructions — produce inconsistent results. A single, owned source-of-truth Project per workflow is more maintainable than several near-duplicates.

---

### Domain 5 Practice Questions

**Q41.** Two files are uploaded to a shared Project's knowledge base: "doc1.pdf" and "Q2 2026 Marketing Budget — Final.pdf." Six months later, a new team member struggles to tell which files are current and relevant. What could have prevented this?

A) Uploading fewer files overall
B) Descriptive, specific file naming at upload time, so both people and Claude can identify what each file is and whether it's current
C) Deleting all files after each use
D) Renaming files is not possible after upload

**Answer: B**
*Vague names like "doc1.pdf" carry no information about content or currency; specific, descriptive names make the knowledge base self-documenting for both humans and Claude. Reducing file count doesn't fix ambiguous naming, and deleting files after each use defeats the purpose of a persistent Project knowledge base.*

---

**Q42.** A Project's knowledge base still contains a pricing sheet from eight months ago. Prices have since changed. Claude, unaware the sheet is outdated, quotes the old prices confidently in a client-facing draft. What is the underlying issue?

A) Claude fabricated the numbers
B) Stale, un-refreshed Project knowledge produced a wrong-but-confident answer — knowledge bases need a regular review/refresh cadence, not a one-time upload
C) The Project feature is fundamentally unreliable
D) The user should have avoided using a Project at all

**Answer: B**
*This isn't a hallucination — the numbers came directly from a real file that's simply out of date. The fix is process: establishing a refresh cadence for knowledge that changes over time (pricing, policy, org charts), not abandoning Projects, which remain the right tool for recurring, reference-grounded work.*

---

**Q43.** A user's profile preferences say "always use a formal tone." A specific Project's custom instructions say "use a casual, friendly tone for this client's brand voice." Inside that Project, which tone applies?

A) The profile preference always wins everywhere
B) The Project's more specific instructions take precedence for work inside that Project, layering on top of the profile-level baseline
C) Claude will alternate randomly between the two
D) Neither applies; only in-conversation instructions matter

**Answer: B**
*Project-level instructions are more specific than the global profile baseline and take precedence for conversations inside that Project — this lets one Project reflect a client's distinct brand voice without changing the user's general default elsewhere. There's no random alternation, and in-conversation asks are a further, even more specific layer on top, not the only layer that matters.*

---

**Q44.** Setting up a connector for a scheduling workflow, an admin is offered a choice between calendar-only access and full inbox-plus-calendar access. The workflow only needs to check and create calendar events. What is the best practice?

A) Grant full inbox-plus-calendar access "just in case it's useful later"
B) Grant only calendar access — the minimum needed for the actual task, following least-privilege practice
C) Grant no access and perform the task manually instead
D) Access scope doesn't matter as long as the connector works

**Answer: B**
*Least-privilege connector setup means granting only the access a workflow actually needs — calendar-only here — rather than broader access that increases exposure without a corresponding need. Granting no access at all defeats the purpose of setting up the integration, and access scope is a real security/governance consideration, not an afterthought.*

---

**Q45.** A communications team wants every team member's Claude-drafted external content to consistently match brand tone and formatting without each person retyping the same style instructions every time. What feature addresses this directly?

A) Reminding each person verbally to "keep it on-brand"
B) A Custom/Output Style set as the team's default, so consistent tone/format is applied without re-specifying it in every conversation
C) A longer onboarding document that nobody reads
D) There is no way to standardize tone across a team

**Answer: B**
*Custom/Output Styles exist precisely to bake a consistent tone/format preference in as a default, eliminating the need to retype the same instruction every time. Verbal reminders and unread documents are process-only fixes with no enforcement, and the capability to standardize this does exist on the platform.*

---

**Q46.** Inside a Project whose standing instructions specify a formal tone, a user types in one specific conversation: "For this one, keep it casual and short." Does this in-chat instruction change the Project's default for future conversations?

A) Yes, it permanently overwrites the Project's standing instructions
B) No — it applies only to that single conversation; the Project's standing formal-tone default remains unchanged for future chats
C) It has no effect at all
D) It only works if the user also edits the Project settings separately

**Answer: B**
*In-conversation instructions are the most specific and immediate layer, taking precedence for that one exchange, but they don't rewrite the Project's saved configuration — the standing default persists for the next conversation unless someone deliberately edits the Project's instructions. The instruction is not ignored; it just doesn't persist beyond that chat.*

---

**Q47.** A Project's knowledge base has grown to a large volume of reference material on a paid plan, well beyond what would normally fit directly into a conversation. What happens, and what should the team still do?

A) Uploads beyond a certain size are simply rejected
B) On paid plans, the platform automatically extends capacity through retrieval as content grows — but the team should still curate the knowledge base, since irrelevant or outdated files reduce answer quality even when there's technically room for them
C) Nothing changes; large knowledge bases behave identically to small ones with no tradeoffs
D) The team must manually split the Project into several smaller Projects to keep working

**Answer: B**
*Paid-plan Projects scale their effective knowledge capacity automatically as content grows, but that capacity expansion is not a substitute for curation — irrelevant, redundant, or outdated files still degrade the quality of what gets surfaced, so ongoing knowledge hygiene remains a team responsibility regardless of platform-side scaling.*

---

**Q48.** Two team members, unaware of each other's work, each create a separate Project for "customer onboarding emails," with slightly different, drifting instructions. Outputs from the two Projects start to look inconsistent across the team. What is the correct fix?

A) Leave both Projects running independently — variety is fine
B) Consolidate into a single, owned source-of-truth Project for that workflow, with one set of agreed instructions and knowledge
C) Delete both Projects and go back to unassisted manual drafting
D) Ask each team member to memorize the other's instructions

**Answer: B**
*Fragmented, duplicate Projects for the same workflow drift apart over time and produce inconsistent team output — the fix is knowledge management hygiene: one owned, agreed-upon Project as the single source of truth for that recurring workflow. Abandoning Projects altogether or relying on informal memorization doesn't solve the underlying coordination gap.*

---

## Domain 6 — Governance, Risk, and Responsible Use (15%)

### Core Concepts

**Data sensitivity and where it's safe to work:**

| Data class | Handling |
| ------------ | ---------- |
| Public information | Freely usable in any Claude surface |
| Internal/confidential company data | Only within the organization's approved, governed environment (e.g., Team/Enterprise), per internal policy |
| Regulated or personally identifiable data (health, financial, legal) | Follow strict organizational policy; may require special configuration (e.g., a HIPAA-ready setup) or be prohibited from AI tools entirely |
| Third-party confidential data (client/vendor material under NDA) | Verify contractual permission before uploading anywhere, including internal AI tools |

**Enterprise vs. consumer data handling — a frequently tested distinction:**

- Consumer plans (Free/Pro/Max on a personal account): Anthropic's policy allows using conversations to train models **unless the user opts out** — meaning training is opt-out, not opt-in, by default. Conversations flagged by safety review systems can still be used for training regardless of the user's stated preference.
- Business plans (Team/Enterprise, under commercial terms): customer content is **not** used to train models — this protection is contractual, not a toggle the user sets per conversation.
- Practical implication: pasting confidential company data into a personal free/consumer account is a governance failure even if the content itself was harmless — the wrong *account type* was used, not just the wrong content.

**Following organizational AI policy.** When a use case's appropriateness is unclear — a new, sensitive, or high-impact application — the correct move is to escalate to the organization's AI governance/compliance contact rather than proceeding on personal judgment or unilaterally deciding it's fine. Company policy, when stricter than what the tool technically allows, still governs.

**Accountability and disclosure.** A human remains accountable for AI-assisted work product, even when Claude drafted most of it — "the AI wrote it" is not a defense for an inaccurate or inappropriate external communication. Many organizations also require disclosure of AI assistance in specific contexts (e.g., published content); follow the organization's specific policy rather than assuming a blanket rule either way.

**Prohibited/inappropriate use categories relevant to business users** (from Anthropic's Usage Policy, at a business-relevant level): deceptive manipulation of people, undermining democratic processes, unauthorized surveillance or biometric profiling to infer protected characteristics, and any use designed to bypass the platform's safety measures. Ordinary business use — drafting, analysis, summarization, internal Q&A — is squarely within policy; the exam tests recognizing the edge cases that aren't.

**Bias and fairness in AI-informed decisions.** Consequential decisions about people (hiring, lending, performance ratings) demand extra scrutiny for bias patterns and sustained human oversight — automation of the drafting step is not the same as automation of the decision itself, and the decision should not be ceded to the tool.

---

### Domain 6 Practice Questions

**Q49.** An employee pastes a client's confidential, NDA-protected contract into their personal free-tier Claude account to get a quick summary. What is wrong with this action?

A) Nothing — summarizing a contract is a harmless task
B) It's a governance failure on two counts: confidential third-party data likely required NDA-compliant handling, and a personal consumer account doesn't carry the same data-use protections as the organization's approved business environment
C) It's fine as long as the summary itself isn't shared externally
D) It's only a problem if the contract is later leaked publicly

**Answer: B**
*This scenario fails on account type and data class simultaneously: confidential client material belongs in the organization's approved, governed environment (with contractual data protections), not a personal consumer-tier account whose data-handling terms differ. The task itself being "harmless" doesn't change the governance violation, and the risk exists the moment the data leaves an approved boundary — it doesn't require an actual leak to already be a policy problem.*

---

**Q50.** A consumer Claude Pro user has not changed any privacy settings. Is their conversation data used to train Anthropic's models?

A) Never, under any circumstances
B) By default, yes — consumer plans use an opt-out model, meaning training happens unless the user actively opts out, and safety-flagged conversations can still be used regardless of that setting
C) Only if the user explicitly opts in
D) Only on the free tier, never on paid consumer plans

**Answer: B**
*Consumer accounts (including paid Pro/Max) default to allowing training use of conversations — it's an opt-out setting, not opt-in — and there's a carve-out where safety-flagged content can still be used for training even if a user opted out. This default and its exception are a commonly tested, easy-to-get-wrong detail.*

---

**Q51.** A company uses Claude Enterprise for internal work. An employee asks whether their team's conversations are used to train Anthropic's models. What is the correct answer?

A) Yes, exactly like a consumer account, unless someone opts out
B) No — under Anthropic's commercial terms for Team/Enterprise plans, customer content is not used to train models; this is a contractual protection, not a per-user toggle
C) It depends on which employee is asking
D) Only technical/API usage is protected; chat usage is not

**Answer: B**
*Business-tier plans (Team/Enterprise) carry a contractual commitment that customer content isn't used for model training — this is structurally different from the consumer opt-out model and doesn't depend on any individual setting or which employee is using it. The protection covers the organization's use of the platform broadly, not just API-specific usage.*

---

**Q52.** An operations lead wants to use Claude to help screen loan applications and isn't sure whether this use case is permitted under the company's AI policy. What is the correct next step?

A) Proceed since the tool is technically capable of the task
B) Escalate to the organization's AI governance/compliance contact to determine whether this specific use case is approved, given its regulatory and fairness sensitivity
C) Decide independently based on personal judgment, since asking would slow things down
D) Avoid the question by not documenting that Claude was used at all

**Answer: B**
*A financially consequential, fairness-sensitive use case like loan screening is exactly where organizational policy — not individual technical capability or personal judgment — should determine appropriateness; the correct move is escalation to whoever owns that decision. Proceeding unilaterally or quietly avoiding documentation both bypass the governance process this domain is testing.*

---

**Q53.** A team publishes an externally facing report that was almost entirely AI-drafted, with no human fact-check or tone review, and it turns out to contain a significant error. When leadership asks what happened, is "the AI wrote it" an acceptable explanation?

A) Yes — responsibility shifts to the AI tool that generated the content
B) No — a human remains accountable for published work product regardless of how much of the draft Claude produced; the missing step was human review before publication
C) Yes, as long as the tool is disclosed as the source
D) No, but only because the specific error was unusually large

**Answer: B**
*Accountability for published, external-facing work stays with the humans and organization that published it — "the AI wrote it" doesn't transfer responsibility. The real failure here is a missing review step before publication, not the size of the resulting error or whether the tool was disclosed; disclosure is a separate practice from the accountability question.*

---

**Q54.** A team proposes using Claude to analyze surveillance camera footage to infer employees' likely religious affiliation for an internal audit. Is this an appropriate use case?

A) Yes, if it's only for internal analysis and never shared externally
B) No — using AI to infer protected characteristics like religious affiliation from biometric/surveillance data is a prohibited category under Anthropic's Usage Policy, regardless of internal-only intent
C) Yes, as long as employees are informed afterward
D) It depends on which model tier is used

**Answer: B**
*Inferring protected characteristics from biometric or surveillance data sits in a category Anthropic's Usage Policy explicitly restricts — internal-only intent, after-the-fact notice, or model tier choice don't change that this use case itself is inappropriate. This is one of the edge cases the exam expects candidates to recognize even without memorizing the full policy text.*

---

**Q55.** A hiring team discovers their Claude-assisted candidate screening has been producing a biased pattern favoring a narrow set of backgrounds. What is the appropriate governance response?

A) Continue using the current process since it saves time
B) Audit and correct the screening criteria, and maintain active human oversight of hiring decisions rather than treating the automation as self-correcting
C) Discontinue all use of AI in HR processes company-wide, permanently
D) Ask the AI whether its own process is biased and accept its answer

**Answer: B**
*A confirmed bias pattern requires an active audit-and-correct response plus sustained human oversight — the decision itself should never be fully ceded to automation, especially somewhere as consequential as hiring. A blanket permanent ban is a disproportionate overcorrection to a fixable process issue, and asking the tool to self-assess its own bias repeats the self-evaluation limitation covered in Domain 2.*

---

**Q56.** A communications team is asked, informally, whether Claude could be used to generate large volumes of persuasive social media content designed to look like it's coming from many independent real people, aimed at influencing an upcoming local election. What is the correct assessment?

A) This is a standard, low-risk marketing use case
B) This falls into a prohibited category — deceptive manipulation and interference with democratic processes — and should not proceed
C) It's fine as long as the content itself doesn't contain false statements
D) It's only a problem if it's aimed at a national, not local, election

**Answer: B**
*Coordinated inauthentic content designed to simulate independent grassroots support and influence an election is a deceptive-manipulation and democratic-process-interference use case explicitly outside acceptable use — factual accuracy of individual posts doesn't offset the deceptive framing, and scope (local vs. national) doesn't change the underlying policy issue.*

---

**Q57.** Claude technically allows a certain use case, but the company's own internal AI policy prohibits it for that department. Which governs the employee's actual behavior?

A) Whatever Claude's interface technically permits
B) The organization's internal AI policy, which can be stricter than the platform's own allowances and is what the employee is actually bound by
C) Whichever is more convenient in the moment
D) Internal policy only applies to Developer-track employees, not Associates

**Answer: B**
*Organizational policy can legitimately be more restrictive than what a platform technically permits, and employees are bound by their own company's rules regardless of what the tool itself would allow. There's no carve-out limiting internal policy to technical roles — governance obligations apply broadly across an organization's Claude usage.*

---

**Q58.** An operations team is drafting internal communications about an upcoming layoff, using Claude to help structure the message. What governance considerations apply?

A) None — internal communications don't require the same scrutiny as external content
B) High scrutiny applies: accuracy, empathetic tone, and legal/HR review before anything is sent, and the actual decisions about who is affected must remain human — Claude should support the drafting, not make or announce the substance of the decision
C) The task can be fully delegated to Claude end-to-end since it saves a difficult conversation for managers
D) Only the CEO's messages require review; team-level drafts do not

**Answer: B**
*Layoff communications are high-stakes and person-facing even when distributed internally — they require accuracy, tone, and legal/HR review, and the substantive decisions themselves must stay with accountable humans, with Claude assisting the drafting rather than owning the message or the decision. Internal distribution doesn't lower the stakes, and review requirements shouldn't be limited only to the most senior messages.*

---

## Domain 7 — Troubleshooting and Optimization (10%)

### Core Concepts

**Diagnosing underperforming output — symptom, likely cause, fix:**

| Symptom | Likely cause | Fix |
| --------- | -------------- | ----- |
| Output is generic/unusable | Prompt lacked specific context, audience, or format | Add the missing task/context/format/audience details |
| Output ignores part of the request | Too many distinct asks bundled into one long prompt | Split into a short sequence of turns |
| Output was accurate before, wrong now | Stale, un-refreshed Project knowledge | Refresh the underlying source files |
| Output format is inconsistent across the team | No shared template or standing style default | Standardize via Project instructions or a Custom/Output Style |
| The same correction has to be repeated every time | Feedback given once, in one conversation, never saved anywhere reusable | Bake the correction into the Project's standing instructions |
| Answer sounds outdated or clearly wrong about current events | The question needed current/live information the base chat can't reliably supply | Use Research mode or a web-enabled surface instead |

**Adjust the prompt before you change the tool.** A common troubleshooting mistake is assuming a "smarter" or more expensive model tier will fix an issue that's actually a clarity or context problem in the prompt itself. Diagnose first — is the instruction underspecified, is context missing, is the format unclear — before reaching for a different tier.

**Efficiency comes from reuse, not repetition.** Re-explaining the same background, tone preference, or formatting rule in every single conversation is a sign the setup belongs in a Project or a Custom/Output Style instead of being retyped. The same logic applies to corrections: a fix given once in a single chat doesn't persist — it has to be captured in a standing instruction to actually stop the recurring problem.

---

### Domain 7 Practice Questions

**Q59.** A team lead consistently gets generic, unusable output from Claude and can't figure out why. Reviewing recent prompts shows they consistently lack any audience, format, or context detail. What is the diagnosis and fix?

A) The model tier is too weak; upgrade it
B) The prompts are underspecified — the fix is adding the missing task, context, format, and audience detail, not changing tools
C) Claude cannot produce specific output under any circumstances
D) The issue is unfixable and manual work should replace Claude for this team

**Answer: B**
*Consistently vague prompts produce consistently generic output — the diagnosis points directly at missing specificity, not model capability. Upgrading the tier is a common troubleshooting misstep when the real issue is prompt clarity; the fix is adding the missing detail, which is well within what Claude can already handle.*

---

**Q60.** A five-part instruction bundled into one long prompt results in Claude addressing only three of the five parts. After noticing this, what troubleshooting fix should the user apply going forward?

A) Keep bundling requests the same way and just check more carefully afterward
B) Split future multi-part requests into a short sequence of turns, so each part gets addressed and confirmed before moving to the next
C) Shorten the request to only one part and skip the rest entirely
D) Switch to a different Claude surface, since the issue is surface-specific

**Answer: B**
*The diagnosed cause — too many asks bundled into a single long prompt — points to a straightforward structural fix: sequencing the parts as separate turns rather than compressing them into one instruction. Continuing to bundle and just double-checking after the fact treats the symptom, not the cause; and this isn't a surface-specific issue, so switching surfaces wouldn't fix it.*

---

**Q61.** A Project that reliably produced correct pricing information last quarter now returns outdated prices. What is the most likely cause and correct fix?

A) Claude's underlying knowledge has randomly degraded
B) The Project's knowledge file still contains last quarter's pricing sheet; the fix is refreshing the source file, not troubleshooting the model
C) This can only be fixed by deleting the entire Project
D) Switch to a different model tier to get current data

**Answer: B**
*A Project that worked correctly before and now returns stale data almost always points to un-refreshed source material, not a change in model behavior — the fix is updating the actual file, which is a knowledge-management task, not a model-tier issue. Deleting the whole Project is unnecessary when the fix is targeted (refresh the one stale file).*

---

**Q62.** A manager finds themselves reminding Claude, in every single conversation, "keep this under 200 words and use a formal tone." What is the more efficient long-term fix?

A) Keep repeating the reminder every time — it only takes a few seconds
B) Save the tone and length preference as a standing instruction (Project instructions or a Custom/Output Style) so it doesn't need to be retyped
C) Accept longer, informal output as the new normal
D) Ask a colleague to add the reminder for them each time

**Answer: B**
*A correction or preference that has to be repeated every single conversation is the clearest signal that it belongs in a standing, reusable setting rather than being retyped — that's the whole efficiency point of Project instructions and Custom/Output Styles. Continuing to repeat it, delegating the repetition to someone else, or simply accepting worse output are all less efficient than fixing the setup once.*

---

**Q63.** A team's report formatting keeps coming out slightly wrong. Someone suggests switching to a more expensive, more capable model tier to fix it. Before doing that, what should be checked?

A) Nothing — a more capable tier is always a safe first move
B) Whether the actual formatting instructions given to Claude are clear and specific — a formatting problem is frequently a prompt-clarity issue, not a capability limitation
C) Whether the company's WiFi is causing the issue
D) Whether the report is too long to format correctly at any tier

**Answer: B**
*Formatting inconsistency is a classic case where the real cause is unclear or missing formatting instructions, not insufficient model capability — diagnosing the prompt first avoids paying more for a tier upgrade that won't actually fix a clarity problem. Report length and connectivity aren't the relevant diagnostic angles here.*

---

**Q64.** A team spends significant time every single conversation re-explaining background information Claude already needed the previous ten times they discussed the same recurring topic. What is the efficiency fix?

A) Continue re-explaining each time; it ensures accuracy
B) Move the recurring work into a Project, where background context persists across conversations instead of being retyped every time
C) Write the background information down on paper as a reference for humans only
D) Assign a single person to always be the one who retypes the context

**Answer: B**
*Recurring background that has to be restated in every conversation is exactly what persistent Project context solves — set it up once, and it's available in every chat within that Project without re-explaining. Retyping it repeatedly, keeping it only on paper, or centralizing the retyping on one person all fail to use the platform feature built for this exact inefficiency.*

---

**Q65.** Asked about a current currency exchange rate, Claude gives a confident but outdated figure. What is the correct diagnosis and fix?

A) Claude made a random error; simply ask again and expect a different, correct answer
B) The question needed live/current information that a standard chat answer can't reliably provide from training knowledge alone; the fix is using Research mode or a web-enabled surface for time-sensitive questions
C) This means Claude cannot be trusted for any numerical information ever
D) Switch to a different model tier, which will have more current knowledge

**Answer: B**
*Live, time-sensitive data like an exchange rate is outside what a standard chat answer can reliably supply from training knowledge — the fix is matching the task to a surface designed for current information (Research mode or web-enabled search), not simply re-asking the same way and hoping for a different result. This is a narrow, specific limitation, not grounds for distrusting all numerical output, and switching model tiers alone doesn't grant access to live data.*

---

## Rapid-Fire Review — Key Facts to Memorize

| Fact | Value |
| ------ | ------- |
| Questions | 60 (multiple-choice and multiple-response) |
| Duration | 120 minutes |
| Passing score | 720 / 1000 |
| Cost | $99 (free for first 5,000 Partner Network employees) |
| Prerequisite | None |
| Largest domain | Output Evaluation and Validation — 21% |
| Second-largest domain | Workflow Integration and Solution Design — 16% |
| Smallest domain | Troubleshooting and Optimization — 10% |
| Prompting weight (often overestimated) | Only 14% |
| Combined judgment-heavy domains (Output Eval + Workflow + Governance) | 52% of the exam |
| Self-evaluation is reliable for | Format and completeness — not factual accuracy |
| Consumer plan training default | Opt-out (training happens unless the user opts out); safety-flagged content can still be used regardless |
| Business plan (Team/Enterprise) training | Customer content not used for training, per commercial terms |
| Audience this exam targets | Non-developer business users — not the Developer or Architect tracks |

---

## Exam Day Strategy

1. **Read every option fully before answering** — several questions in this domain set have a "close but wrong" distractor designed to catch a hasty first read.
2. **For Output Evaluation questions, ask**: "Is this confident-sounding, or actually verified?" Fluency is never proof of accuracy on this exam.
3. **For Governance questions, ask**: "Is this the employee's call to make alone, or does it need to be escalated?" When in doubt, the exam rewards escalation over unilateral judgment.
4. **For Product/Model Selection questions, think in tradeoffs** (speed/cost vs. depth of reasoning; individual plan vs. organization-wide governance) rather than trying to recall specific model version numbers, which change too often to be reliably tested.
5. **Budget your time**: 120 minutes / 60 questions ≈ 2 minutes per question. Flag anything you're unsure of and keep moving — you can return to flagged questions at the end.
6. **Prioritize review time** proportional to domain weight: Output Evaluation (21%) and Workflow Integration (16%) deserve the most last-minute review; Troubleshooting (10%) the least.
