# Contact Section — Design Spec

Date: 2026-09-15
Status: Approved

## Purpose

Add the Contact section — roadmap item #7 in [progress.md](../../../progress.md) ("Contact + footer | Email CTA only, no fake form submission"), the last content section before Footer. Nav's "Book a consultation" link and Footer's "Book a consultation" link (see [Nav.tsx](../../../src/components/Nav.tsx) and [Footer.tsx](../../../src/components/Footer.tsx)) both already point at `#contact`, but no element with that id exists yet — those links currently go nowhere.

## Scope decision

This is a **section on the existing single page**, not a separate routed page. The site has no router installed (`react-router-dom` is not a dependency) and is built as a single scrollable page with anchor-based navigation throughout (`#services`, `#work`, `#why`, `#faqs`, etc.). A Contact *section* with `id="contact"` fixes the existing dead anchor links with no new dependency, matching how every other nav item on this site already works.

## Content

Pulled from the live folkstechai.com's real Closing CTA (see [live-site-reference.md](../../../live-site-reference.md)'s "Closing CTA" entry), not invented:

- Headline: "Ready to become AI-enabled?"
- Subtext: "Tell us what's slowing your business down. In a free consultation we'll show you a practical, trustworthy path to a working solution — fast."
- Primary CTA button: "Book a free consultation" — since there's no real booking backend, this triggers the same `mailto:hello@folkstechai.com?subject=...` pattern already used by [Nav.tsx](../../../src/components/Nav.tsx)'s "Contact" button (`window.location.href = 'mailto:hello@folkstechai.com?subject=Hello%20FolksTechAI'`). No fabricated form submission, matching progress.md's explicit scope note for this section.
- Secondary line: "or email hello@folkstechai.com directly", a plain mailto link, mirroring the existing pattern in [Footer.tsx](../../../src/components/Footer.tsx)'s "Get in touch" column.

## Visual design

- `<section id="contact" className="scroll-fade-section ... bg-[#0A0C18] ...">` — same dark background family as every other section, `id="contact"` so it's the actual target of the pre-existing `#contact` anchor links.
- **Centered** layout (headline, subtext, and both CTAs centered in a narrow max-width column) — a deliberate departure from the left-aligned header pattern used by Services/Work/Why/Team/Process/FAQs, giving the page a calmer closing beat before Footer. Consistent with the project's established practice of varying layout per section (see Work.tsx's alternating rows vs. Services.tsx's grid).
- No video background of its own: FAQs (just shipped) already has one, and Footer has one too — a third consecutive video section would be visually noisy. Plain dark background with the same subtle ambient blur-glow treatment already used elsewhere (e.g. Why.tsx's `bg-blue-500/[0.06] blur-[140px]` radial glow), for quiet visual continuity without motion.
- Entrance animation via the existing `Reveal` component, matching every other section.

## Interaction

- Primary button: `<button type="button" onClick={...}>` triggering `window.location.href = 'mailto:hello@folkstechai.com?subject=Hello%20FolksTechAI'` — same mailto pattern as Nav's existing "Contact" button, not a new interaction pattern.
- Secondary link: plain `<a href="mailto:hello@folkstechai.com">`.
- No form, no client-side validation, no fake "submitted" state — this section is intentionally just a CTA, per progress.md's scope note.

## Files

- New: `src/components/Contact.tsx`
- Edit: [App.tsx](../../../src/App.tsx) — import and render `<Contact />` between `<FAQs />` and `<Footer />`.

## Out of scope

- No contact form (explicitly ruled out by progress.md's existing scope note for this section).
- No new routing library or separate `/contact` URL.
- No changes to Nav.tsx or Footer.tsx — their existing `#contact` links already point at the right place once this section exists with that id.
