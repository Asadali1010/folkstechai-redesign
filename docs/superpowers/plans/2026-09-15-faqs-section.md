# FAQs Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the FAQs section (`src/components/FAQs.tsx`) — an 8-question, single-open accordion — and wire it into the page between "How We Work" and the Footer, matching the design in `docs/superpowers/specs/2026-09-15-faqs-section-design.md`.

**Architecture:** A single self-contained component holding a hardcoded `FAQS` array and one `openIndex: number | null` state value. Each row is a `<button>` (question) + a `role="region"` panel (answer) using the standard accessible-disclosure ARIA wiring, animated open/closed with a pure-CSS `grid-template-rows: 0fr → 1fr` transition (no JS height measurement). Visual shell (section wrapper, eyebrow, heading, `Reveal` entrance) copies the pattern already established in `src/components/Team.tsx` (no-video dark section).

**Tech Stack:** React 18 + TypeScript, Tailwind CSS (arbitrary values for the grid-rows trick), `lucide-react` for the chevron icon, existing `Reveal` component for scroll-in animation. No test framework exists in this repo (see `package.json` — no vitest/jest); verification follows the project's established convention of `typecheck` + `lint` + `build` plus a one-off Playwright script for visual/interaction verification (see prior entries in `progress.md`'s Build Log for this exact pattern).

---

### Task 1: Build the FAQs component

**Files:**
- Create: `src/components/FAQs.tsx`

- [ ] **Step 1: Create the file with the content data and static shell**

```tsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from '@/components/Reveal';

type FAQ = { question: string; answer: string };

const FAQS: FAQ[] = [
  {
    question: 'What services do you offer?',
    answer:
      'AI Enablement & Strategy, Custom Software Development, AI Agents & Automation, Data & Analytics, Rapid Delivery & Iteration, and Legacy Modernization — see the Services section above for details on each.',
  },
  {
    question: 'What does your process look like?',
    answer:
      'Discover → Prototype → Build & Test → Ship & Iterate. You get a working prototype in days, then continuous delivery as your requirements evolve.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      "Pricing depends on scope, so the fastest way to get a real number is a free consultation — tell us what you're building and we'll follow up with details.",
  },
  {
    question: 'Where are you based?',
    answer: "We're based in Lahore, Pakistan, and work with clients worldwide.",
  },
  {
    question: 'How do I get in touch?',
    answer:
      'Email us any time at hello@folkstechai.com, or use the "Book a consultation" link in the header or footer.',
  },
  {
    question: 'Do you sign NDAs?',
    answer: 'Yes — signing an NDA before discussing project details is standard practice for us.',
  },
  {
    question: 'Do you work with startups and small businesses, or only larger companies?',
    answer:
      "Both. We built FolksTechAI to make world-class AI accessible beyond large enterprises, so we work with businesses of every size.",
  },
  {
    question: 'Do you support the product after launch?',
    answer:
      "Yes — our process doesn't end at launch. We continue iterating and supporting the product as real usage shows what to adjust next.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faqs"
      className="scroll-fade-section relative w-full bg-[#0A0C18] py-20 sm:py-28 overflow-hidden"
    >
      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
        <Reveal className="max-w-[640px] mb-12 sm:mb-16">
          <p className="text-white/60 text-[13px] sm:text-[14px] font-[450] tracking-[0.08em] uppercase mb-3 sm:mb-4">
            FAQs
          </p>
          <h2 className="text-white text-[32px] sm:text-[42px] md:text-[48px] font-normal leading-[1.1]">
            Questions, answered.
          </h2>
        </Reveal>

        <div className="max-w-[860px] divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <Reveal key={faq.question} delay={i * 60}>
                <div>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-sm"
                  >
                    <span className="text-white text-[16px] sm:text-[18px] font-[450] leading-[1.35]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-white/60 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-white/70 text-[14.5px] sm:text-[15.5px] font-[450] leading-[1.6] pb-5 sm:pb-6 pr-9">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck the new file in isolation**

Run: `npm run typecheck`
Expected: no errors mentioning `FAQs.tsx` (the component isn't imported anywhere yet, so this only confirms the file itself is well-typed — TypeScript still checks unreferenced files under `tsconfig.app.json`'s default include).

- [ ] **Step 3: Commit**

```bash
git add src/components/FAQs.tsx
git commit -m "$(cat <<'EOF'
Add FAQs component with 8-question single-open accordion
EOF
)"
```

---

### Task 2: Wire FAQs into the page

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the import and render it between Process and Footer**

In `src/App.tsx`, change:

```tsx
import Process from '@/components/Process';
import Footer from '@/components/Footer';
```

to:

```tsx
import Process from '@/components/Process';
import FAQs from '@/components/FAQs';
import Footer from '@/components/Footer';
```

and change:

```tsx
      <Process />
      <Footer />
```

to:

```tsx
      <Process />
      <FAQs />
      <Footer />
```

- [ ] **Step 2: Typecheck, lint, and build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: all three succeed with no errors (this project has no test suite — these three commands are the existing pass/fail bar every prior section change in `progress.md`'s Build Log was verified against).

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "$(cat <<'EOF'
Wire FAQs section into App between Process and Footer
EOF
)"
```

---

### Task 3: Visual and interaction verification

**Files:**
- Scratchpad only (no repo files) — use the session scratchpad directory, e.g. `/private/tmp/claude-501/-Users-apple-folkstechai-redesign/<session-id>/scratchpad/verify-faqs.mjs`

- [ ] **Step 1: Start the dev server in the background**

Run: `npm run dev -- --port 5183 &` (from the repo root; note the PID or use a job control mechanism to stop it afterward)
Expected: Vite prints a local URL like `http://localhost:5183/`

- [ ] **Step 2: Install Playwright in the scratchpad (isolated per-session, not present yet)**

```bash
cd <scratchpad-dir>
npm init -y
npm install playwright
npx playwright install chromium
```

Expected: chromium browser installs successfully.

- [ ] **Step 3: Write the verification script**

Create `<scratchpad-dir>/verify-faqs.mjs`:

```js
import { chromium } from 'playwright';

const url = 'http://localhost:5183/#faqs';
const browser = await chromium.launch();

for (const { name, width, height } of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(url);
  await page.waitForSelector('#faqs');

  const firstButton = page.locator('#faqs button').first();
  const firstPanel = page.locator('#faq-panel-0');

  // Closed by default
  const collapsedExpanded = await firstButton.getAttribute('aria-expanded');
  const collapsedHeight = await firstPanel.evaluate((el) => el.getBoundingClientRect().height);
  console.log(`[${name}] before click: aria-expanded=${collapsedExpanded} panelHeight=${collapsedHeight}`);

  await firstButton.click();
  await page.waitForTimeout(400); // allow the 300ms grid-rows transition to finish

  const expandedExpanded = await firstButton.getAttribute('aria-expanded');
  const expandedHeight = await firstPanel.evaluate((el) => el.getBoundingClientRect().height);
  console.log(`[${name}] after click: aria-expanded=${expandedExpanded} panelHeight=${expandedHeight}`);

  // Single-open: opening the second question should close the first
  const secondButton = page.locator('#faqs button').nth(1);
  await secondButton.click();
  await page.waitForTimeout(400);
  const firstAfterSecondOpen = await firstButton.getAttribute('aria-expanded');
  const secondExpanded = await secondButton.getAttribute('aria-expanded');
  console.log(`[${name}] after opening #2: first aria-expanded=${firstAfterSecondOpen} second aria-expanded=${secondExpanded}`);

  await page.screenshot({ path: `<scratchpad-dir>/faqs-${name}.png`, fullPage: false });
  await page.close();
}

await browser.close();
```

(Replace `<scratchpad-dir>` with the actual absolute scratchpad path in both the `path:` value and when invoking the script.)

- [ ] **Step 4: Run the script**

Run: `node <scratchpad-dir>/verify-faqs.mjs`

Expected output pattern (values will differ slightly but the shape must match):
```
[desktop] before click: aria-expanded=false panelHeight=0
[desktop] after click: aria-expanded=true panelHeight=<some positive number>
[desktop] after opening #2: first aria-expanded=false second aria-expanded=true
[mobile] before click: aria-expanded=false panelHeight=0
[mobile] after click: aria-expanded=true panelHeight=<some positive number>
[mobile] after opening #2: first aria-expanded=false second aria-expanded=true
```

This confirms: panel starts collapsed (height 0), expands on click (height > 0, `aria-expanded` flips to `true`), and opening a second question collapses the first (single-open behavior) — on both desktop and mobile viewports.

- [ ] **Step 5: Visually inspect the two screenshots**

Read `<scratchpad-dir>/faqs-desktop.png` and `<scratchpad-dir>/faqs-mobile.png` (Read tool supports images). Confirm: section renders with the dark background matching Team/Why sections, heading and eyebrow visible, question rows readable, no layout overflow or clipped text on mobile width.

- [ ] **Step 6: Stop the dev server**

Kill the background `npm run dev` process started in Step 1.

- [ ] **Step 7: Update progress.md**

In `progress.md`, change row 6 of the Sections table from:

```
| 6 | FAQs | ⬜ Not started | Accordion |
```

to:

```
| 6 | FAQs | 🕓 Built — awaiting review | 8 real-topic Q&As, single-open accordion via CSS grid-rows, matches ChatWidget's existing answers |
```

and append a new Build Log entry:

```
- 2026-09-15 — FAQs section built (`FAQs.tsx`, id="faqs"), 8 questions covering the same topics ChatWidget already answers (services, process, pricing, location, contact) plus 3 general-policy questions (NDAs, startup/small-business fit, post-launch support) framed as reasonable policy statements rather than fabricated specifics. Single-open accordion (opening one question closes the previous one), built with a pure-CSS `grid-template-rows: 0fr → 1fr` transition rather than JS height measurement, consistent with the project's existing preference for native CSS-driven motion. Wired into App.tsx between Process and Footer, matching Nav's pre-existing `#faqs` anchor link. Verified via Playwright: panel starts collapsed (height 0), expands on click with `aria-expanded` flipping to true, and opening a second question correctly collapses the first, on both desktop and mobile viewports. typecheck/lint/build all pass.
```

- [ ] **Step 8: Commit**

```bash
git add progress.md
git commit -m "$(cat <<'EOF'
Mark FAQs section built in progress.md
EOF
)"
```

---

## Self-Review Notes

- **Spec coverage:** all 8 questions from the spec are in the `FAQS` array (Task 1); single-open behavior implemented via one `openIndex` state (Task 1); `id="faqs"` matches Nav's existing anchor (Task 1, verified in Task 3); placement between Process and Footer (Task 2); CSS grid-rows animation with no JS height measurement (Task 1); `prefers-reduced-motion` handled via `motion-reduce:transition-none` (Task 1).
- **No placeholders:** all code blocks are complete and copy-pasteable; the Playwright script is fully written, not described.
- **Type consistency:** `FAQ` type, `FAQS` array, `openIndex`/`setOpenIndex`, `panelId`/`buttonId` naming is consistent throughout Task 1 (single task, so no cross-task drift risk here).
