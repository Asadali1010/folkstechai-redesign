# Standalone Team Section

## Problem

The three team members (Ayesha Khan, Bilal Ahmed, Sana Malik) currently live as a
small, understated subsection at the bottom of the "Why FolksTechAI" section
(`src/components/Why.tsx`) — a row of initials avatars with name/role/bio. The
team wants them to get their own dedicated, visually bolder section instead of
being an afterthought inside Why.

## Scope

- Extract the team block out of `Why.tsx` into a new standalone `Team.tsx`
  section component.
- Insert it into the page flow right after Why: `Hero → Services → Work → Why →
  Team → Process`.
- Give it a visually distinct treatment from the rest of the site, while
  staying on-brand (no new color/typography system).

## Content

Reused verbatim from the existing `TEAM` data (sourced from
`live-site-reference.md`) — no new copy:

| Name | Role | Bio |
|---|---|---|
| Ayesha Khan | Founder & CEO | Sets the vision: make trustworthy AI practical for every business. |
| Bilal Ahmed | Head of Engineering | Ships production software fast — without cutting corners on quality. |
| Sana Malik | Lead AI Engineer | Builds AI agents with real guardrails, evaluation, and human oversight. |

## Visual direction

Approved via interactive mockup (3 directions shown, iterated once): **bold
color-blocked roster**, on-brand.

- Same dark base (`#0A0C18`) and font stack (`Suisse Intl`) as every other
  section — no light-theme break, no new typography.
- Same glassmorphism recipe already established in `Work.css`
  (`backdrop-filter: blur(22px)`, hairline `border-white/[0.1-0.28]`, layered
  gradient background) — reused rather than reinvented.
- What makes it "completely different" from Why's current treatment: each
  member gets a large card (not a small avatar row) with a tinted
  gradient-mesh backdrop (CSS-generated, not an image asset — radial +
  linear gradients), one accent hue per person drawn from hues already used
  elsewhere on site (blue `#3b5bff`-ish, teal `#00c2a8`-ish, purple
  `#b478ff`-ish — e.g. `Work.css`'s `.work-card-intelligence` /
  `.work-card-systems` / `.work-card-possibility` variants). Name/role/bio
  sit on a bottom scrim for legibility, matching the scrim pattern already
  used for video sections.
- No external image/video assets are fetched for this — the "abstract
  backdrop" is CSS gradients, keeping the section lightweight and avoiding
  new asset dependencies.
- Entrance animation: reuse the existing `Reveal` component with staggered
  delay per card, consistent with every other section on the page.

## Component structure

- New file `src/components/Team.tsx`:
  - `TEAM` data array (moved from `Why.tsx`), each entry gains an `accent`
    key (`'blue' | 'teal' | 'purple'`) driving its card's gradient tint.
  - `<section id="team" className="scroll-fade-section ...">` matching the
    section-level conventions used by `Why`/`Process`/`Services` (id anchor,
    `scroll-fade-section` class, `bg-[#0A0C18]`, responsive padding).
  - Eyebrow + heading following the same `Reveal`-wrapped intro pattern as
    other sections.
  - 3-column grid (`grid-cols-1 sm:grid-cols-3`) of glass cards.
- `Why.tsx`: remove the `TEAM` array and the "The team" subsection block; the
  rest of Why (pillars, video, heading) is untouched.
- `App.tsx`: import `Team` and place `<Team />` between `<Why />` and
  `<Process />`.

## Out of scope

- No new copy, no new team members, no photos.
- No changes to Why's pillars, video background, or heading.
- No new external assets (images/video) for the Team backdrops.
