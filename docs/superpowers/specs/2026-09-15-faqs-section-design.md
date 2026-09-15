# FAQs Section — Design Spec

Date: 2026-09-15
Status: Approved

## Purpose

Add the FAQs section — item #6 in [progress.md](../../../progress.md)'s section roadmap, the last content section before Footer. Nav already links to `#faqs` (see [Nav.tsx](../../../src/components/Nav.tsx)) with nothing to scroll to yet.

## Content

No FAQ content exists on the live folkstechai.com (see [live-site-reference.md](../../../live-site-reference.md)), so this is authored content. 8 questions, single-column, in this order:

1. **What services do you offer?** — expands the 6-service list from [Services.tsx](../../../src/components/Services.tsx) (AI Enablement & Strategy, Custom Software Development, AI Agents & Automation, Data & Analytics, Rapid Delivery & Iteration, Legacy Modernization).
2. **What does your process look like?** — Discover → Prototype → Build & Test → Ship & Iterate, matching [Process.tsx](../../../src/components/Process.tsx).
3. **How much does a project cost?** — scope-dependent; points to a free consultation, matching [ChatWidget.tsx](../../../src/components/ChatWidget.tsx)'s existing pricing answer.
4. **Where are you based?** — Lahore, Pakistan → worldwide, matching live-site-reference.md and Why.tsx.
5. **How do I get in touch?** — hello@folkstechai.com / Book a consultation.
6. **Do you sign NDAs?** — general policy answer (yes, standard for client engagements) — not a verified live-site fact, kept as a reasonable general statement rather than a specific claim.
7. **Do you work with startups and small businesses, or only larger companies?** — general policy answer, consistent with the "Access for everyone" pillar already established in Why.tsx.
8. **Do you support the product after launch?** — general policy answer, consistent with "Ship & Iterate" / continuous improvement copy already established in Process.tsx.

Questions 6–8 are explicitly general/policy answers, not fabricated specifics (no numbers, no named clients, no invented certifications) — consistent with the project's existing rule (see progress.md's "Outstanding items") of not inventing unverified facts.

## Visual design

Matches the established dark-section pattern used by Why.tsx / Process.tsx:

- `<section id="faqs" className="scroll-fade-section ... bg-[#0A0C18] ...">` — `id="faqs"` matches Nav's existing `#faqs` anchor.
- Section eyebrow label + heading, wrapped in `Reveal`, same treatment as Why.tsx's header block.
- Single-column list of question rows below the heading, each row a full-width `<button>` with the question text and a rotating chevron/plus icon on the right, answer text revealed beneath.
- Each row (or the whole list) wrapped in `Reveal` with staggered delay, matching the pattern used for Services cards / Why pillars.

## Interaction

- Single-open accordion: opening one question closes whichever was previously open (component holds one `openIndex: number | null` in state, not a per-item boolean).
- Each question is a real `<button type="button">` with `aria-expanded` and `aria-controls` pointing at the answer panel's `id`; the answer panel has `role="region"` and `aria-labelledby` pointing back at the question button — standard accessible disclosure pattern.
- Expand/collapse animation via CSS `grid-template-rows: 0fr` → `1fr` transition on a wrapper div containing an `overflow-hidden` inner div (the standard CSS-only "animate to auto height" technique) — no JS height measurement, no `<details>` element. This matches the site's existing preference for native CSS-driven motion (Process.tsx's scroll-timeline fill line, Services.tsx's `scroll-fade-section`) over JS-computed layout.
- Respects `prefers-reduced-motion`: transition duration set to `0s` under the existing reduced-motion handling pattern (see how Process.tsx and Reveal.tsx already guard motion).

## Files

- New: `src/components/FAQs.tsx`
- Edit: [App.tsx](../../../src/App.tsx) — import and render `<FAQs />` between `<Process />` and `<Footer />`.

## Out of scope

- No search/filter over questions (only 8 items, unnecessary).
- No CMS/dynamic content source — questions are hardcoded, matching every other section's pattern (Services, Process, Why all hardcode their content arrays).
- No changes to Nav.tsx (its `#faqs` link and "FAQs" label already exist and require no changes).
