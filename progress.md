# FolksTechAI Landing Page — Progress

Building section by section. Each section is confirmed, built, verified (desktop + mobile), and approved before moving to the next.

## Sections

| # | Section | Status | Notes |
|---|---------|--------|-------|
| 1 | Hero | ✅ Done — approved | Apogee hero rebranded to FolksTechAI. Text wordmark used (no logo asset supplied). |
| 2 | Services | 🕓 Built — awaiting review | 6 real offerings (matched to live folkstechai.com), glass card grid, scroll-reveal with stagger |
| 3 | Selected Work | ⬜ Not started | Needs real project material or clearly-labeled concepts |
| 4 | Why FolksTechAI | ⬜ Not started | |
| 5 | How We Work | ⬜ Not started | Vertical timeline, scroll-filled progress line |
| 6 | FAQs | ⬜ Not started | Accordion |
| 7 | Contact + footer | ⬜ Not started | Email CTA only, no fake form submission |

## Outstanding items (not fabricated, waiting on real input)

- **Logo**: no FolksTechAI logo asset exists in the repo. Nav currently uses a plain text wordmark. Swap in real logo when available.
- **Portfolio material**: no approved client work supplied yet. Selected Work section will use clearly-labeled "what we can build" concepts unless real case studies are provided.
- **Company facts**: team size, years of experience, certifications, awards — none supplied. Why FolksTechAI section will stay modest/concrete and avoid inventing these.
- **Metrics**: no verified performance/revenue numbers supplied. Hero card already uses non-metric content ("From idea to production" + process steps) per instruction.

## Build log

- 2026-09-14 — Hero rebuilt and approved. Nav (Services/Work/Process/FAQs), CTAs (Book a consultation / Explore our services), process card, favicon placeholder, README/package.json rename. typecheck/lint/build all pass.
- 2026-09-14 — Services section built: 4 offering cards (Custom Software Development, Web & Mobile Applications, AI & Automation, QA & Testing) in a responsive glass-card grid, quieter dark background with subtle blue/red ambient glows, scroll-reveal via new `useInView` hook + `Reveal` component (IntersectionObserver, animates once, respects prefers-reduced-motion, ~600ms fade-up with 90ms stagger, border/glow transition on hover). Verified reveal-before-scroll (opacity 0) and reveal-after-scroll (opacity 1) on all 4 cards via headless browser at desktop and mobile widths. typecheck/lint/build all pass. Awaiting approval before Selected Work.
- 2026-09-14 — Premium animation pass on Services per request: (1) cards now enter along a spiral/arc path (shrinking-radius curve with rotation, alternating left/right per card) instead of a straight fade-up, via new `arc-spiral-left`/`arc-spiral-right` keyframes + `ServiceCard` subcomponent — verified numerically by sampling the computed transform matrix through the animation, confirming a genuine curved trajectory (e.g. `(-64,64) → (-34,62) → (-2.5,47) → (7,26) → (0,0)`) rather than a straight line. (2) Whole section now fades in/out as it scrolls through the viewport via native CSS `animation-timeline: view()` (`.scroll-fade-section`), with `@supports` progressive enhancement (browsers lacking support just render at full opacity — nothing is ever hidden) and a `prefers-reduced-motion` override. Verified fade-in works now; fade-out is implemented and verified to work correctly with a temporary test spacer, but isn't reachable in the live page yet since Services is currently the last section — it'll engage naturally once Selected Work is added below it. typecheck/lint/build all pass.
- 2026-09-14 — Continuous idle + click-to-expand: cards now pulse a subtle blue/red border/shadow glow continuously (`service-card-idle`) and stop the instant they're hovered or focused, handing off cleanly to a hover state that also now tints the card's own background with a radial blue→red glow (not just an outer drop-shadow), per follow-up request. Cards are now real `<button>` elements; clicking one opens `ServiceDialog` — a portaled (`createPortal` to `document.body`, so it's unaffected by the section's own scroll-fade opacity), accessible modal with focus trap, Escape-to-close, body scroll lock, and focus restored to the triggering card on close. Dialog content adds 3 concrete "what you get" bullets per service (no fabricated claims/guarantees). Verified via headless browser: idle pulse animating, hover correctly cancels it and applies lift/border/background glow, dialog focus/trap/Escape/scroll-lock/restore-focus all behave correctly, mobile layout fits cleanly. typecheck/lint/build all pass.
- 2026-09-14 — Corrected Services content to match the real, live folkstechai.com: replaced the earlier guessed 4-service set with the actual 6 services and verbatim taglines from the live site (AI Enablement & Strategy, Custom Software Development, AI Agents & Automation, Data & Analytics, Rapid Delivery & Iteration, Legacy Modernization). Grid changed from 4-col to 3-col to fit 6 cards cleanly (2 rows on desktop). "What you get" dialog bullets rewritten to match the new services — still modest/generic, no fabricated specifics beyond the real site's own copy. Icons re-picked per service (Map, Code2, Bot, BarChart3, Rocket, RefreshCw). Verified all 6 titles render and reveal correctly on desktop and mobile. typecheck/lint/build all pass.
