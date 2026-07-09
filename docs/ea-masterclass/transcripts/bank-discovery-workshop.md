---
title: "Transcript: Global Bank — Day 1 Discovery Workshop"
date: 2026-07-09
---

# Transcript: Global Bank — Day 1 Discovery Workshop

**Engagement:** Loan Origination Acceleration — EA Discovery Phase
**Session:** Day 1 Morning, 9:00am – 12:00pm
**Location:** Executive Conference Room, Head Office

**EA Team:**
- Sarah Chen — EA Lead
- Tom Park — Architecture Specialist

**Bank Attendees:**
- Marcus Webb — Chief Information Officer
- Priya Nair — Chief Data Officer
- James Okafor — Head of Commercial Banking

---

*Tom has set up a whiteboard with a blank process flow template on the left half and a sticky-note grid labelled "Pain / Constraint / Dependency" on the right. Laptops are closed by prior agreement. The session begins at 9:07am after a brief delay while coffee was located.*

---

**Sarah Chen:** Thank you all for being here and for protecting three full mornings — I know that's a real commitment at your level. Before we start, I want to set one ground rule for how we'll run these sessions. We're going to spend a lot of time this morning on the current state — how things actually work today, not how the documentation says they work. I'll ask some questions that might feel very basic. Please don't interpret that as us not having done our homework. The basic questions are usually the ones that surface the most important information. Is everyone comfortable with that framing?

**Marcus Webb:** Fine with me. Priya? James?

**Priya Nair:** Yes, that works.

**James Okafor:** *(nodding)* Sure.

> **Facilitator Note:** Sarah's ground rule does two things simultaneously. First, it pre-empts the instinct executives have to give polished answers — by naming that she wants "how things actually work, not how documentation says they work," she signals that she can handle messiness. Second, it buys permission for basic questions without needing to justify each one individually. Asking for permission to ask naïve questions once at the start is far more efficient than apologising for each naïve question in the moment.

---

**Sarah Chen:** Marcus, you gave us a brief in the pre-work document that described the loan origination process as taking 18 days end-to-end for a standard commercial loan. Can you walk me through that 18 days? Not the policy description — the actual path a loan application takes from the moment a relationship manager submits it to the moment the customer gets a decision.

**Marcus Webb:** Sure. The RM submits the application through Salesforce. That goes into our loan management system — we call it LoanTrack — where it sits in a queue for the credit team to pick up. Credit does their initial review, requests any missing documents from the RM, the RM chases the client, documents come back, credit does the full assessment, then it goes to the credit committee for sign-off, and then back to the RM to communicate the decision.

**Sarah Chen:** How long does each of those stages typically take?

**Marcus Webb:** Document collection probably takes five or six days — clients are slow, RMs have to chase. Then credit assessment is maybe three or four days. Committee sign-off... *(pauses)* ...that one varies.

**Sarah Chen:** How much does it vary?

**Marcus Webb:** It can be quick — a day or two if it catches the right committee slot. Or it can be ten days if the loan misses a meeting cycle.

> **Facilitator Note:** Sarah is doing something subtle here: she is not yet sharing any view of where the problem lies. She is asking a sequencing question — "how long does each stage take?" — that forces Marcus to do the arithmetic himself. He has just said five to six days plus three to four days plus one to ten days. That is nine to twenty days, which means the committee stage is the dominant variable. Sarah has not said this. She is waiting to see whether Marcus draws the same conclusion, or whether he continues to describe it as a document problem.

---

**Marcus Webb:** So yes, the committee is a wildcard. But our bigger issue is really the front end — the document collection. We've got RMs chasing clients for KYC documents, credit analysis inputs, property valuations. It's all manual. That's the problem we want to solve.

**Sarah Chen:** I want to make sure I understand that correctly. When you say the document problem is the bigger issue — do you mean it has the biggest impact on the 18 days, or that it's the most operationally painful for the team?

**Marcus Webb:** *(pausing)* Both, I'd say.

**Sarah Chen:** James, you're closest to the commercial banking team. From your perspective, where does the loan feel slowest to the relationship manager and the client?

> **Facilitator Note:** Marcus has just said "both" — which is almost never literally true, and which often signals that a speaker is conflating the most visible problem with the most impactful one. Sarah does not challenge the "both." She pivots to James, who has direct operational experience, and asks a differently framed question: where does it feel slowest? "Feel slowest" is a different signal from "is slowest." She is triangulating.

**James Okafor:** Honestly? The RMs don't complain much about document collection. They've got processes for that — they chase, clients respond, it moves. What kills them is sitting in the dark after they've submitted the complete file. The loan is sitting somewhere in the credit process and the RM has no visibility, no update to give the client. Then the credit committee slot comes and goes and the RM finds out three days later that the loan wasn't on the agenda. That's when relationships get damaged.

**Sarah Chen:** How often does a loan miss a credit committee cycle?

**James Okafor:** More often than it should. The committee meets fortnightly. If a loan comes in on day eight of the cycle, it might not have a complete credit assessment in time for the meeting. It rolls to the next cycle. That's two more weeks.

**Priya Nair:** And we don't have good data on how often that happens, which is a separate problem.

> **Facilitator Note:** This is the moment Sarah realised the problem was not primarily about documents. Marcus's framing — "we have a document problem" — was sincere, not a misdirection. He genuinely believed it. But James's operational account, corroborated by Priya's data comment, points to a completely different bottleneck: the credit committee scheduling and submission process. Sarah needs to hold this new hypothesis lightly — she has heard from two of three executives and the picture is still forming. She does not announce the reframe. She continues collecting.

---

**Sarah Chen:** Tom, do you want to capture that on the board?

**Tom Park:** *(writing on the whiteboard)* I'm putting "Committee scheduling / submission timing" as a constraint. James, the two-week cycle — is that fixed, or is there flexibility?

**James Okafor:** Fixed. The committee is a governance body. Fifteen members, including two independent non-executives. You can't just call an emergency meeting for a routine commercial loan.

**Tom Park:** Understood. And when a loan goes to committee, what does the submission pack look like? Is it standardised?

**James Okafor:** It should be. We have a template. But every credit analyst formats it slightly differently, and the committee secretariat sometimes sends packs back for reformatting. That adds a day or two.

**Priya Nair:** That's partly a data quality issue. The credit assessment pulls from six or seven source systems and analysts are manually reconciling figures. The pack reflects that — it's never quite clean.

> **Facilitator Note:** Priya's comment opens a third thread: data quality and reconciliation feeding into the credit assessment, which in turn feeds into committee submission quality. This is a different problem again — not the committee scheduling itself, but the quality of what arrives at the committee. Sarah is now tracking three distinct hypotheses: (1) document collection (Marcus's original framing), (2) committee scheduling and submission timing (James's account), (3) credit assessment data quality (Priya's thread). She needs to let all three stay open and see which the data supports. This is why annotated thinking time at the whiteboard is valuable — Tom's capture role is giving Sarah space to think.

---

**Sarah Chen:** Priya, I want to come back to that data quality point in a moment. Before I do — whose system is the source of record for customer credit data? When a credit analyst starts an assessment, where do they go first?

**Priya Nair:** They should be going to the Customer Data Platform. We built that specifically so analysts have a single source for customer financials, exposure, and credit history.

**James Okafor:** *(quietly)* In theory.

**Sarah Chen:** James?

**James Okafor:** The commercial banking team has its own CRM with customer relationship data that doesn't flow into Priya's platform. Our RMs have built up years of qualitative information about clients — sector notes, relationship history, covenant amendments. That doesn't exist in the CDP. So analysts end up going to the commercial CRM directly, which is in my team's domain, and there's no formal access protocol.

**Priya Nair:** Which is exactly why we have data quality problems. There are two versions of customer truth and neither is complete.

**James Okafor:** The CDP doesn't have the relationship context. What would you like me to do about that?

**Priya Nair:** I'd like you to give my team access to your CRM so we can integrate it properly. We've been asking for that for two years.

**James Okafor:** And I've explained for two years that our relationship managers' notes are not structured data. You can't just pipeline unstructured relationship commentary into a data platform and call it integrated.

> **Facilitator Note:** A live political conflict has surfaced. Priya wants integration access to the commercial banking CRM. James is blocking it — whether for legitimate technical reasons, territorial reasons, or both is not yet clear. This is exactly the kind of conflict Sarah must not arbitrate. She has no mandate to resolve data ownership disputes between a CDO and a Head of Commercial Banking. More importantly, attempting to resolve it here would cost her the trust of whichever executive she appeared to side with, and would convert a discovery session into a political negotiation that should happen at a different level. Her job right now is to acknowledge the tension, extract the relevant information about its impact on loan origination, and defer resolution.

**Sarah Chen:** I'm going to note this as a significant integration dependency that we'll need to understand more deeply. *(writing on the board)* For the purpose of today's session — James, Priya — I'm not going to try to resolve the access question here. That's a decision that belongs above this table or in a separate forum. What I do want to understand is the impact on the loan origination timeline. When a credit analyst has to manually pull data from two disconnected systems, how much time does that typically add to an assessment?

**James Okafor:** *(back to neutral tone)* Half a day to a full day. More if they can't find the right person in my team to ask for specific file notes.

**Priya Nair:** That's consistent with what I've seen. Maybe four to six hours on average.

**Sarah Chen:** Thank you. Tom, can you note that as a quantified dependency?

**Tom Park:** Got it. Four to six hours on average per assessment due to manual cross-system data reconciliation.

> **Facilitator Note:** Notice what Sarah did. She named the conflict directly — "I'm noting this as a significant integration dependency." She explicitly declined to arbitrate — "that's a decision that belongs above this table." Then she immediately redirected to a question both parties could answer factually, without requiring agreement on the underlying dispute. The effect is that both Priya and James gave her the data she needed while feeling that their position had been heard and respected. The session did not stall. This is not conflict avoidance — it is conflict deferral to the appropriate forum, which is a professional judgment, not a weakness.

---

*10:45am. Tom has filled the whiteboard. The right-hand grid shows three clusters of pain points: document collection (four items), credit assessment data (six items, two with question marks), and committee submission and scheduling (three items). The committee cluster has the most sticky notes.*

---

**Sarah Chen:** I want to step back and share what I'm hearing, and I'd like you to tell me if I've got it wrong.

When we started this morning, the framing was that the 18-day loan origination problem is primarily a document problem. Having spent two hours walking through the actual process, I'm hearing something different. Document collection accounts for roughly five to six days of the timeline — that's real, and it's painful operationally. But the document collection step largely completes before the credit committee bottleneck starts.

What's actually driving the variability in your 18-day number — and the unpredictability that damages client relationships — appears to be two things. First, the credit assessment process is slower and more error-prone than it needs to be because analysts are manually reconciling data from two disconnected systems. Second, the committee submission and scheduling process has enough friction that loans regularly miss committee cycles, adding up to fourteen days to individual applications.

Does that match what you're experiencing?

**Marcus Webb:** *(longer pause)* Yes. I think that's right. I've been focused on the front end because that's where I get the most noise — RMs complaining about clients not returning documents. But the back end... you're right that the variance is higher.

**James Okafor:** That's accurate. My RMs live in fear of the committee cycle. Missing a slot is the worst outcome.

**Priya Nair:** And the data reconciliation issue feeds directly into submission quality. A poorly prepared pack is more likely to get sent back.

> **Facilitator Note:** This is the pivot moment. Sarah has synthesised the morning's conversation into a reframe — from "document problem" to "credit committee and data integration problem" — and has presented it as a question, not a conclusion. This is critical. If she had announced "the problem is actually the credit committee," Marcus would have felt corrected, which creates defensiveness. By saying "I'm hearing something different — does that match?" she invites them to confirm or correct the reframe as a collaborative act. Marcus effectively confirms it himself. The reframe now belongs to the room, not to Sarah.

---

**Sarah Chen:** Good. I want to be honest with you about what this means for the next two days. If the credit committee and data integration bottlenecks are the primary drivers of your 18-day cycle, then a document management system — however well designed — will reduce your timeline by at most three or four days. You'd go from 18 to 14 or 15. That might be worth doing. But it won't get you to the seven to ten day target that Marcus mentioned in the brief.

**Marcus Webb:** That's a direct answer.

**Sarah Chen:** I'd rather give you a direct answer on day one than build a solution over three months that doesn't move the needle where it matters. Tomorrow and Thursday, I'd like us to focus the architecture work on the committee submission process and the data integration gap. We'll keep the document collection work on the backlog — it may still be a useful phase two. But the bigger opportunity is in the back half of the process.

Does that direction make sense to everyone in this room?

**Marcus Webb:** It does. James?

**James Okafor:** Yes. I've been trying to get someone to look at the committee scheduling problem for two years. It's just never been framed as an architecture question.

**Priya Nair:** Agreed. Though I'd say the data integration is the higher-leverage fix — if the credit assessment input quality improves, the committee submission quality improves with it.

**Sarah Chen:** That's a useful sequencing hypothesis, Priya. Let's test it tomorrow when we map the data flows. Before we break for lunch, Tom and I will spend ten minutes synthesising the morning onto a single hypothesis map. We'll share it with you before 1pm so you can review it before this afternoon. Any questions or anything we've missed before we close the morning session?

**Marcus Webb:** No, I think you've covered it. This was more useful than I expected.

**James Okafor:** Same.

> **Facilitator Note:** Sarah's closing move does three things. She is direct about the implication of the reframe — "a document management system won't get you to your target." She does not soften this or hedge. Softening it would allow Marcus to leave with a false impression of what's possible, which compounds into a bigger problem later. She then proposes a specific direction for days two and three, which gives the session a decision output and maintains momentum. Finally, she commits to a synthesis artefact before 1pm — this is closing accountability. The executives leave knowing the session had a concrete output, not just a good conversation.

---

*Session closed at 11:58am. Tom and Sarah used the lunch hour to produce a one-page hypothesis map identifying three architecture intervention points: (1) credit assessment data integration — Customer Data Platform plus commercial CRM; (2) committee submission pack automation and standardisation; (3) committee scheduling optimisation with real-time pipeline visibility for RMs. Document management was retained as a backlog item labelled "Phase 2 / Secondary Benefit."*

---

## Post-Session Reflection: What Made This Workshop Work

**The ground rule at the start.** Permission to ask basic questions, obtained once, used freely throughout the session. Without that permission, Sarah would have needed to apologise for or justify each simple question individually.

**Not correcting the initial assumption.** Marcus opened with "we have a document problem." Sarah did not correct this. She asked questions that allowed the more accurate picture to emerge from the conversation itself. The reframe — when it came — felt to Marcus like his own insight, not a correction from a consultant.

**The data point that changed the session.** James's answer — "the RMs don't complain much about document collection; what kills them is sitting in the dark after they've submitted the complete file" — was the single most important sentence in the morning. Sarah created the conditions for that sentence by asking a question directed at James's operational experience, not at the documented process.

**Managing the CDO / commercial banking clash.** The conflict was real and the underlying issue (data ownership between two senior executives) was genuinely unresolved. Sarah acknowledged it, declined to arbitrate, redirected to a factual question both parties could answer, and preserved the working relationship in the room. The conflict remains unresolved — but that is appropriate. Resolving it in a discovery session would have required authority Sarah did not have and would have consumed the session's remaining time.

**Closing with direction, not summary.** The closing synthesis was not a recap of the morning — it was a proposed direction for days two and three. Discovery sessions that close with summaries feel complete but produce no forward momentum. Sessions that close with a direction decision create accountability and prepare participants for the next session.
