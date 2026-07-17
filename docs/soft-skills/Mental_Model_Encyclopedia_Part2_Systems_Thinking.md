---
title: "The Mental Model Encyclopedia — Part 2: Systems Thinking Frameworks"
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: converted-pdf
source_file: "Mental_Model_Encyclopedia.pdf"
doc_type: multi-part-series
tags: ["soft-skills", "mental-models", "systems-thinking", "frameworks"]
covers_version: "as of 2026-07-17"
series_name: "The Mental Model Encyclopedia"
series_part: 2
series_total: 4
series_index: "soft-skills/Mental_Model_Encyclopedia"
---

# The Mental Model Encyclopedia — Part 2: Systems Thinking Frameworks

*Continues from [Part 1: Executive Cognition Frameworks](Mental_Model_Encyclopedia_Part1_Executive_Cognition).*

Tools for reasoning about problems that don't have a single cause or a linear solution — where the parts
interact, feedback compounds, and the obvious fix often makes things worse.

## Systems Thinking

### Purpose / Core Idea

Analyzing a problem as a set of interconnected parts and feedback relationships rather than isolated, linear
cause-and-effect.

### Origin & Creator

Formalized by Jay Forrester (MIT, System Dynamics, 1950s-60s) and popularized by Peter Senge's 'The Fifth
Discipline' (1990).

### Typical Users

Enterprise architects, policy designers, organizational leaders diagnosing recurring problems.

### Inputs → Outputs

Input: a recurring problem with unclear root cause. Output: a map of the structure (stocks, flows, feedback loops)
producing the behavior.

### Strengths

Explains why a problem keeps recurring despite repeated fixes; reveals structural causes invisible to linear
analysis.

### Weaknesses

Can become an abstract mapping exercise that never converges on an actionable decision.

### Best Use Cases

Chronic, recurring organizational problems (e.g. persistent understaffing, quality issues) that resist one-off fixes.

### Failure Modes / Anti-Patterns

Building an elaborate system map that is never translated into a concrete leverage-point intervention.

### Enterprise Example

A hospital using systems thinking to trace ER overcrowding not to ER capacity but to discharge-process delays
elsewhere in the system.

### Ai Implementation Angle

AI can help construct and simulate causal loop diagrams from operational data faster than manual workshops.

### Prompt Template

"Map the feedback loops producing this recurring problem — what reinforces it, and what would dampen it?"

### Related / Contradictory Frameworks

Related: System Dynamics, Causal Loop Diagrams, Iceberg Model.
## System Dynamics

### Purpose / Core Idea

A quantitative modeling method that simulates how stocks (accumulations) and flows (rates of change) interact
over time within a system.

### Origin & Creator

Jay Forrester, MIT Sloan School, 1950s, originally for industrial and urban dynamics.

### Typical Users

Enterprise architects, operations researchers, policy modelers building simulations of complex processes.

### Inputs → Outputs

Input: identified stocks, flows, and feedback relationships. Output: a simulated time-series forecast of system
behavior.

### Strengths

Makes counter-intuitive long-run system behavior visible and testable before committing resources.

### Weaknesses

Model quality depends entirely on correctly specified relationships; a wrong structure produces confidently wrong
forecasts.

### Best Use Cases

Supply chain modeling, capacity planning, policy impact simulation over multi-year horizons.

### Failure Modes / Anti-Patterns

Over-fitting a model to historical data that doesn't hold under structural change (e.g. a new competitor entering).

### Enterprise Example

MIT's 'Beer Game' simulation demonstrating how small demand fluctuations amplify into large supply-chain
oscillations (the bullwhip effect).

### Ai Implementation Angle

AI can rapidly build and stress-test system dynamics models, running thousands of parameter variations to find
fragile assumptions.

### Prompt Template

"Model this process as stocks and flows, and simulate what happens if [demand/lead time/capacity] changes by
X%."

### Related / Contradictory Frameworks

Related: Systems Thinking, Stock and Flow Models, Monte Carlo Simulation.
## Causal Loop Diagrams

### Purpose / Core Idea

A visual notation showing how variables in a system influence each other, revealing reinforcing and balancing
feedback loops.

### Origin & Creator

Developed within the system dynamics tradition (Forrester, later popularized by Senge for general management
audiences).

### Typical Users

Facilitators running systems-thinking workshops with cross-functional teams.

### Inputs → Outputs

Input: a list of variables believed to interact. Output: a diagram with labeled arrows showing direction and polarity
of influence.

### Strengths

Makes hidden feedback structures visible and shareable; a strong communication tool for non-technical
stakeholders.

### Weaknesses

Purely qualitative — shows direction of influence but not magnitude or timing, which can mislead if treated as
precise.

### Best Use Cases

Early-stage problem diagnosis workshops, before committing to full quantitative system dynamics modeling.

### Failure Modes / Anti-Patterns

Treating the diagram as the analysis itself rather than a starting point for deeper quantitative work.

### Enterprise Example

Mapping how understaffing leads to overtime, which leads to burnout, which leads to attrition, which reinforces
understaffing.

### Ai Implementation Angle

AI can propose candidate causal loops from operational data and text (support tickets, incident reports) as a
starting draft for human review.

### Prompt Template

"Draw the causal loop connecting these variables — mark each link as reinforcing or balancing."

### Related / Contradictory Frameworks

Related: Systems Thinking, Feedback Loops, Iceberg Model.
## Feedback Loops

### Purpose / Core Idea

Circular chains of cause and effect where a system's output becomes its own input, either amplifying or
dampening change.

### Origin & Creator

Cybernetics (Norbert Wiener, 1940s); foundational to systems thinking and control theory.

### Typical Users

Anyone diagnosing why a system's behavior persists, grows, or self-corrects over time.

### Inputs → Outputs

Input: an observed recurring behavior. Output: identification of the loop (reinforcing or balancing) driving it.

### Strengths

Explains growth, decline, and stability patterns that a snapshot analysis misses entirely.

### Weaknesses

Real systems have many overlapping loops; isolating the dominant one requires data, not just intuition.

### Best Use Cases

Diagnosing runaway growth, chronic decline, or persistent equilibrium in organizational metrics.

### Failure Modes / Anti-Patterns

Attacking a symptom instead of the loop, so the problem simply regenerates.

### Enterprise Example

A viral product's reinforcing loop: more users → more content → more value → more users.

### Ai Implementation Angle

AI-driven anomaly detection can flag when a metric's trajectory matches a known reinforcing-loop signature (e.g.
exponential growth or decline).

### Prompt Template

"Is this trend being driven by a reinforcing loop, a balancing loop, or an external one-time shock?"

### Related / Contradictory Frameworks

Related: Reinforcing Loops, Balancing Loops, Causal Loop Diagrams.
## Reinforcing Loops

### Purpose / Core Idea

Feedback loops where an initial change is amplified further in the same direction, producing exponential growth or
decline.

### Origin & Creator

A core construct of cybernetics and system dynamics.

### Typical Users

Growth strategists, risk managers watching for runaway negative spirals.

### Inputs → Outputs

Input: an early trend. Output: an assessment of whether it is self-amplifying and how fast it will compound.

### Strengths

Identifies where small early interventions have outsized long-term effect (compounding advantage or
compounding risk).

### Weaknesses

Unchecked, reinforcing loops eventually hit a real-world constraint (market saturation, resource limits) that the
simple model doesn't capture.

### Best Use Cases

Early identification of viral growth opportunities or early-stage organizational decline (e.g. talent attrition spirals).

### Failure Modes / Anti-Patterns

Assuming a reinforcing loop will continue indefinitely without a limiting factor, leading to over-investment.

### Enterprise Example

A death spiral in insurance: rising premiums drive out healthy customers, which raises average risk, which raises
premiums further.

### Ai Implementation Angle

AI trend detection can flag reinforcing-loop signatures early, before the compounding effect becomes visible to the
naked eye.

### Prompt Template

"Is this loop reinforcing? If so, what real-world constraint will eventually cap it, and how far away is that cap?"

### Related / Contradictory Frameworks

Related: Feedback Loops, Balancing Loops, Emergence.
## Balancing Loops

### Purpose / Core Idea

Feedback loops that push a system back toward a stable equilibrium, resisting change in either direction.

### Origin & Creator

Core construct of cybernetics and system dynamics; the counterpart to reinforcing loops.

### Typical Users

Change managers trying to understand why an intervention isn't 'sticking.'

### Inputs → Outputs

Input: an intervention that seems to fade over time. Output: identification of the balancing loop resisting it.

### Strengths

Explains organizational resistance to change that isn't due to malice or incompetence but structural homeostasis.

### Weaknesses

Can be mistaken for active sabotage when it's actually a structural stabilizing force that needs to be redesigned,
not fought.

### Best Use Cases

Diagnosing why repeated change initiatives revert to the old behavior ('the org snapped back').

### Failure Modes / Anti-Patterns

Fighting the symptom of the balancing loop repeatedly instead of redesigning the structure causing it.

### Enterprise Example

A cost-cutting initiative that keeps getting quietly reversed because a balancing loop (customer complaints, quality
drops) restores the original spending level.

### Ai Implementation Angle

AI can detect a metric's recurring 'snap-back' pattern after interventions, flagging a likely balancing loop for
investigation.

### Prompt Template

"This intervention faded over time — what balancing loop is likely restoring the old equilibrium?"

### Related / Contradictory Frameworks

Related: Feedback Loops, Reinforcing Loops, Theory of Constraints.
## Delays

### Purpose / Core Idea

The time lag between a cause and its visible effect within a system, which often causes overcorrection.

### Origin & Creator

A core concept in system dynamics (Forrester); central to the 'Beer Game' bullwhip-effect demonstration.

### Typical Users

Supply chain leaders, policy makers, anyone managing systems with lagging indicators.

### Inputs → Outputs

Input: an action and its expected effect. Output: an estimated lag before the effect becomes visible, and a warning
against premature overcorrection.

### Strengths

Prevents the common failure of over-adjusting because an intervention 'isn't working yet' when it just hasn't had
time to show up.

### Weaknesses

Estimating the delay length accurately is hard, and organizations are impatient by nature.

### Best Use Cases

Any system with lagging metrics — hiring pipelines, marketing spend effects, capacity investments.

### Failure Modes / Anti-Patterns

Doubling down or reversing a decision before the delay has elapsed, causing oscillation (over-hiring, then
over-firing).

### Enterprise Example

A company that increases marketing spend, sees no immediate sales lift, panics and cuts spend right as the
delayed effect was about to appear.

### Ai Implementation Angle

AI-fitted time-series models can estimate the likely lag between a given intervention and its effect based on
historical patterns.

### Prompt Template

"What is the expected delay between this action and its measurable effect, and are we at risk of reacting before
that delay has passed?"

### Related / Contradictory Frameworks

Related: System Dynamics, Reinforcing Loops.
## Emergence

### Purpose / Core Idea

System-level behavior that arises from the interaction of parts and cannot be predicted by analyzing any single
part in isolation.

### Origin & Creator

A foundational concept in complexity science (Santa Fe Institute) and complex adaptive systems research.

### Typical Users

Organizational designers, platform architects anticipating unplanned system behavior.

### Inputs → Outputs

Input: a set of individually simple rules or agents. Output: an anticipated (or observed) system-level pattern that no
single agent intended.

### Strengths

Explains organizational culture, market dynamics, and platform behaviors that no single policy 'caused' directly.

### Weaknesses

Emergent behavior is inherently hard to predict in advance; over-claiming predictive power here is a common
error.

### Best Use Cases

Anticipating platform or marketplace dynamics (e.g. how many independent sellers' pricing behavior will
aggregate).

### Failure Modes / Anti-Patterns

Assuming a top-down policy will produce the intended emergent outcome without testing at scale first.

### Enterprise Example

Traffic jams emerging from individually rational driver behavior with no single driver 'causing' the jam.

### Ai Implementation Angle

Agent-based simulations (increasingly AI-driven) can model many interacting agents to surface likely emergent
patterns before real-world rollout.

### Prompt Template

"If each individual actor follows this simple rule, what system-level pattern is likely to emerge at scale?"

### Related / Contradictory Frameworks

Related: Complex Adaptive Systems, Non-linear Systems.
## Leverage Points

### Purpose / Core Idea

Places within a system where a small, well-targeted intervention produces a large shift in overall system behavior.

### Origin & Creator

Popularized broadly in systems thinking practice; most rigorously articulated by Donella Meadows (see next
entry).

### Typical Users

Strategists deciding where to focus limited intervention resources within a complex system.

### Inputs → Outputs

Input: a mapped system. Output: a ranked list of candidate intervention points by expected leverage.

### Strengths

Prevents wasted effort on low-leverage interventions (tweaking a parameter) when a structural or paradigm-level
change would be far more effective.

### Weaknesses

Higher-leverage points (goals, paradigms) are also harder to change and more politically resisted.

### Best Use Cases

Resource-constrained transformation efforts where only a few interventions are feasible.

### Failure Modes / Anti-Patterns

Spending all available political capital on a low-leverage parameter tweak instead of a higher-leverage structural
change.

### Enterprise Example

Changing a sales team's incentive structure (a structural leverage point) rather than just exhorting them to 'try
harder' (a low-leverage appeal).

### Ai Implementation Angle

AI system models can rank candidate interventions by simulated leverage, helping prioritize where limited
change-management energy should go.

### Prompt Template

"Of the possible interventions here, which change the underlying structure or incentives rather than just a
number?"

### Related / Contradictory Frameworks

Related: Meadows' Leverage Points, Theory of Constraints.
## Non-Linear Systems

### Purpose / Core Idea

Systems where outputs are not proportional to inputs — small changes can produce disproportionately large
effects, and vice versa.

### Origin & Creator

Chaos theory and dynamical systems mathematics (Lorenz, 1960s); applied broadly to economics and
organizational behavior.

### Typical Users

Risk managers and strategists operating in markets prone to sudden regime shifts.

### Inputs → Outputs

Input: an assumed linear relationship between effort and outcome. Output: a test of whether the relationship
actually holds, or breaks down at certain thresholds.

### Strengths

Prevents naive linear extrapolation ('if 10% more spend got 10% more growth, 100% more spend will get 100%
more growth').

### Weaknesses

Genuinely non-linear systems are hard to forecast precisely; false confidence in a fitted curve is a real risk.

### Best Use Cases

Any situation near a known threshold or tipping point — market saturation, capacity limits, viral adoption curves.

### Failure Modes / Anti-Patterns

Extrapolating a linear trend through a threshold where system behavior actually changes qualitatively.

### Enterprise Example

A viral marketing campaign that shows negligible effect until a critical mass of exposure is reached, then grows
explosively.

### Ai Implementation Angle

Machine learning models can detect non-linear relationships and thresholds in data that simple linear regression
would miss entirely.

### Prompt Template

"Is this relationship actually linear, or is there a threshold beyond which behavior changes qualitatively?"

### Related / Contradictory Frameworks

Related: Emergence, Complex Adaptive Systems, Wicked Problems.
## Complex Adaptive Systems

### Purpose / Core Idea

Systems composed of many interacting, adaptive agents (people, firms, algorithms) whose collective behavior
evolves and cannot be centrally controlled.

### Origin & Creator

Complexity science, Santa Fe Institute (Holland, Arthur, Kauffman, 1980s-90s).

### Typical Users

Enterprise architects and economists modeling markets, ecosystems, or large organizations.

### Inputs → Outputs

Input: a set of interacting adaptive agents and their local rules. Output: an understanding of the system's evolving,
non-centrally-controlled behavior.

### Strengths

Explains why command-and-control interventions often fail in markets and large organizations — the agents
adapt around the intervention.

### Weaknesses

Resists precise prediction; best used for understanding dynamics and building resilience, not forecasting exact
outcomes.

### Best Use Cases

Platform ecosystem design, organizational culture change, market strategy in competitive, adaptive
environments.

### Failure Modes / Anti-Patterns

Designing a rigid top-down control system for an environment that is fundamentally adaptive, causing the system
to route around the control.

### Enterprise Example

A marketplace platform's sellers continuously adapting their pricing and listing strategies around every algorithm
change the platform makes.

### Ai Implementation Angle

Multi-agent AI simulations can model how adaptive agents (competitors, customers) are likely to respond to a
proposed strategic change.

### Prompt Template

"How will the adaptive agents in this system (competitors, customers, employees) route around this intervention?"

### Related / Contradictory Frameworks

Related: Emergence, Non-linear Systems, Wicked Problems.
## Wicked Problems

### Purpose / Core Idea

Problems that are ill-defined, have no single correct formulation, involve conflicting stakeholder values, and where
every 'solution' changes the problem itself.

### Origin & Creator

Horst Rittel and Melvin Webber, 'Dilemmas in a General Theory of Planning' (1973), originally for urban planning.

### Typical Users

Policy designers, enterprise transformation leaders facing problems with no clean technical solution.

### Inputs → Outputs

Input: a problem that resists definitive framing. Output: an accepted, provisional framing and a chosen
intervention, understanding it will need revision.

### Strengths

Prevents the false expectation that a wicked problem can be 'solved' once and for all like an engineering problem.

### Weaknesses

Can be used as an excuse to avoid committing to any action at all ('it's wicked, so nothing will really work').

### Best Use Cases

Large-scale organizational transformation, regulatory or societal challenges, cross-stakeholder platform
decisions.

### Failure Modes / Anti-Patterns

Applying a tame-problem, linear project-management approach (fixed scope, fixed solution) to a genuinely wicked
problem.

### Enterprise Example

Enterprise-wide AI adoption: no single 'correct' architecture, competing stakeholder interests, and each pilot
changes the organization's understanding of the problem.

### Ai Implementation Angle

AI-assisted scenario exploration can help stakeholders iterate through multiple provisional framings faster than
manual workshops alone.

### Prompt Template

"Given that this problem has no single correct definition, what provisional framing should we commit to for the next
cycle, knowing we'll revise it?"

### Related / Contradictory Frameworks

Related: Cynefin Framework, Non-linear Systems, Problem Framing (Part VI).
## Cynefin Framework

### Purpose / Core Idea

A sense-making framework that classifies problems into Clear (Obvious), Complicated, Complex, or Chaotic
domains, each requiring a different decision approach.

### Origin & Creator

Dave Snowden, IBM/Cognitive Edge (1999, refined through the 2000s).

### Typical Users

Executives and consultants deciding which decision-making mode fits a given problem before diving in.

### Inputs → Outputs

Input: an ambiguous problem. Output: a domain classification (Clear, Complicated, Complex, Chaotic) and the
matching response mode (sense-categorize-respond, sense-analyze-respond, probe-sense-respond, or
act-sense-respond).

### Strengths

Prevents applying the wrong decision process — e.g. expert analysis on a genuinely chaotic crisis, or
improvisation on a well-understood complicated problem.

### Weaknesses

Classification itself can be contested and is sometimes done superficially, defeating the framework's purpose.

### Best Use Cases

Triaging which methodology (best practice, expert analysis, safe-to-fail experiment, or crisis action) fits a given
situation.

### Failure Modes / Anti-Patterns

Misclassifying a complex problem as merely complicated, and over-relying on expert analysis instead of iterative
probing.

### Enterprise Example

A crisis response team correctly identifying a security incident as 'Chaotic,' acting first to stabilize before analyzing
root cause.

### Ai Implementation Angle

AI can help triage incoming problems at scale by pattern-matching them against Cynefin's domain characteristics.

### Prompt Template

"Is this problem Clear, Complicated, Complex, or Chaotic — and does our current process match that domain?"

### Related / Contradictory Frameworks

Related: Wicked Problems, OODA Loop, Decision Quality vs. Decision Speed.
## Meadows' Leverage Points

### Purpose / Core Idea

Donella Meadows' ranked hierarchy of twelve places to intervene in a system, from low-leverage (adjusting a
parameter) to high-leverage (changing the paradigm the system is built on).

### Origin & Creator

Donella Meadows, 'Leverage Points: Places to Intervene in a System' (1999), building on her earlier 'Limits to
Growth' work.

### Typical Users

Systems architects and change leaders deciding where to spend scarce transformation effort.

### Inputs → Outputs

Input: a system diagnosis. Output: a placement of candidate interventions on Meadows' hierarchy, favoring
higher-leverage ones where feasible.

### Strengths

Gives a concrete, ranked checklist rather than a vague notion of 'leverage'; explicitly ranks paradigm and goal
changes above parameter tweaks.

### Weaknesses

The highest-leverage points (paradigms, goals) are the hardest to shift and often outside a single leader's
authority.

### Best Use Cases

Deciding whether to fix a rule, a structure, or a goal when redesigning an organization or process.

### Failure Modes / Anti-Patterns

Defaulting to the easiest, lowest-leverage intervention (a new KPI target) when the real problem is a structural
incentive misalignment.

### Enterprise Example

Redesigning incentive structures (a mid-leverage 'rules of the system' point) instead of just issuing new targets (a
low-leverage 'parameter' point) to fix chronic short-termism.

### Ai Implementation Angle

AI-assisted system modeling can help identify which of Meadows' twelve leverage categories a proposed
intervention actually falls into, guarding against low-leverage theater.

### Prompt Template

"Where does this proposed fix sit on Meadows' leverage hierarchy — is it a parameter tweak or a
structural/goal-level change?"

### Related / Contradictory Frameworks

Related: Leverage Points, Theory of Constraints, Iceberg Model.
## Iceberg Model

### Purpose / Core Idea

A framework distinguishing four levels of understanding a problem: visible Events, underlying Patterns/Trends,
the Structures producing those patterns, and the Mental Models/paradigms underlying the structures.

### Origin & Creator

Developed within the systems-thinking and organizational-learning tradition (associated with Peter Senge and
MIT's Systems Thinking practice).

### Typical Users

Facilitators guiding teams from reactive firefighting toward structural root-cause thinking.

### Inputs → Outputs

Input: a visible event or complaint. Output: a description of the pattern, structure, and mental model beneath it.

### Strengths

Prevents endless event-level firefighting by systematically pushing the team to ask what structure keeps
producing the events.

### Weaknesses

Getting to the structural and mental-model levels requires genuine organizational self-examination, which is often
resisted.

### Best Use Cases

Recurring incident reviews, chronic quality or morale problems that keep resurfacing despite event-level fixes.

### Failure Modes / Anti-Patterns

Stopping at the 'pattern' level (noting the trend) without pushing down to the structural cause that's producing it.

### Enterprise Example

Repeated project overruns (event) traced through a pattern of underestimation, to a structural incentive to win
bids with low estimates, to a mental model that 'optimistic bids are how we stay competitive.'

### Ai Implementation Angle

AI text-mining across incident reports and retrospectives can help surface recurring patterns humans might miss
across many isolated events.

### Prompt Template

"Below this event, what pattern has repeated over time? Below that pattern, what structure produces it? And what
belief sustains that structure?"

### Related / Contradictory Frameworks

Related: Systems Thinking, Root Cause Analysis, Five Whys.
## Theory of Constraints

### Purpose / Core Idea

The principle that any system has exactly one binding constraint (bottleneck) limiting its overall throughput, and
improving anything else has little effect until that constraint is addressed.

### Origin & Creator

Eliyahu Goldratt, 'The Goal' (1984), originally developed for manufacturing operations.

### Typical Users

Operations leaders, process engineers optimizing throughput-constrained systems.

### Inputs → Outputs

Input: a system with multiple process steps. Output: the identified bottleneck and a plan to exploit, subordinate to,
and then elevate it.

### Strengths

Focuses improvement effort where it actually matters, avoiding wasted optimization of non-bottleneck steps.

### Weaknesses

Constraints move once the current one is resolved, requiring continuous re-diagnosis (the 'five focusing steps' are
iterative, not one-time).

### Best Use Cases

Manufacturing throughput, software delivery pipelines, hiring funnels — any system with a clear sequential flow.

### Failure Modes / Anti-Patterns

Optimizing a non-bottleneck step, which produces local improvement but no system-level throughput gain.

### Enterprise Example

A software team speeding up code review (the actual bottleneck) instead of further optimizing an already-fast CI
pipeline.

### Ai Implementation Angle

AI process-mining tools can automatically identify the current bottleneck from operational log data rather than
relying on intuition.

### Prompt Template

"Where in this process does work actually pile up waiting? That's the constraint — everything else is secondary."

### Related / Contradictory Frameworks

Related: Leverage Points, Balancing Loops.
## Stock and Flow Models

### Purpose / Core Idea

A modeling approach distinguishing 'stocks' (accumulated quantities, like cash or headcount) from 'flows' (rates of
change into or out of a stock, like hiring or spending rate).

### Origin & Creator

Core building block of system dynamics (Forrester).

### Typical Users

Financial planners, capacity planners, anyone managing accumulations over time.

### Inputs → Outputs

Input: a quantity of interest. Output: identification of it as a stock, plus the inflows and outflows governing its level.

### Strengths

Prevents the common confusion between a rate and a level (e.g. mistaking 'hiring rate' for 'headcount'), which
leads to major planning errors.

### Weaknesses

Requires disciplined data tracking of both stocks and flows, which many organizations only partially maintain.

### Best Use Cases

Cash runway planning, workforce planning, inventory management — anywhere accumulation dynamics matter.

### Failure Modes / Anti-Patterns

Managing to a flow target (e.g. hiring rate) without tracking the resulting stock level (total headcount vs. budget).

### Enterprise Example

A startup tracking monthly burn rate (a flow) without keeping equal focus on total cash remaining (the stock) and
the resulting runway.

### Ai Implementation Angle

AI dashboards can continuously reconcile stock and flow data, flagging when flows imply an unsustainable stock
trajectory before it becomes a crisis.

### Prompt Template

"Is this a stock or a flow? What are the inflows and outflows, and where is the stock trending over the next N
periods?"

### Related / Contradictory Frameworks

Related: System Dynamics, Delays.
