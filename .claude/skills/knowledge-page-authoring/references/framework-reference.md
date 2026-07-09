# Framework / Methodology Reference

**Example to match:** `enterprise-architecture/framework/TOGAF10_APEX*.pdf`
(consolidate these into one canonical page per the cleanup skill's Phase 3 —
the framework content itself is what this template governs, whether it's
being newly written or being merged out of the existing overlapping PDFs)

## When to use
Durable, canonical documentation of a named methodology or framework
(TOGAF, an internal architecture methodology, a governance model) — meant to
be the single reference point other pages link to, not a one-off case study
or application of the framework.

## Additional frontmatter
```yaml
framework_name: ""       # e.g. "TOGAF 10 APEX"
framework_version: ""     # if the source methodology is versioned
```

## Required section skeleton
1. H1 title = framework name.
2. Overview — what the framework is for, in 2-3 sentences, before any
   detail.
3. Core structure — the framework's own building blocks (phases, layers,
   domains — whatever the methodology's native vocabulary is), one H2 per
   block.
4. "When to apply" / "When not to apply" — explicit, since methodology
   pages get misapplied more often than they get misunderstood.
5. "Worked example" or "Applied case" section — link out to a relevant
   engagement-case-study or narrative-case-study page that applies this
   framework, rather than embedding a full case inline. This is the
   specific fix for the TOGAF duplication problem found in the original
   audit: the methodology boilerplate lives here once; case-study-specific
   detail lives in its own page and links back.

## Depth-of-research rubric
- If you're consolidating multiple existing PDFs/pages that each apply this
  framework to a different case (as with the TOGAF NexaBank/GlobalCorp
  pair), the shared methodology content goes here, and only the
  case-specific delta stays in each case study, cross-linked. Don't leave
  the full methodology text duplicated in both.
- Cite the authoritative external source for the framework (e.g. The Open
  Group for TOGAF) rather than restating it from memory — this content
  changes with framework version releases and needs to be checkable against
  the source.

## Formatting notes
- This is reference material, not narrative — favor structured lists and
  tables over prose where the framework itself is inherently structural
  (e.g. TOGAF's ADM phases).
