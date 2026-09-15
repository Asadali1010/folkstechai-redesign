# Contact Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Contact section (`src/components/Contact.tsx`) — a centered closing CTA with `id="contact"` — and wire it into the page between FAQs and Footer, giving the site's existing (currently dead) `#contact` anchor links in Nav and Footer somewhere to actually land, per `docs/superpowers/specs/2026-09-15-contact-section-design.md`.

**Architecture:** A single, stateless, self-contained component. No form, no client state — just a headline, subtext, a primary button that triggers the same `mailto:` pattern already used by `Nav.tsx`'s "Contact" button, and a secondary plain mailto link. Centered layout (a deliberate departure from the left-aligned pattern of every prior section), reusing the `Reveal` component for entrance animation and the same ambient radial-glow decoration already used in `Why.tsx`.

**Tech Stack:** React 18 + TypeScript, Tailwind CSS. No new dependencies. No test framework exists in this repo; verification follows the same convention used for every prior section: `typecheck` + `lint` + `build`, plus a Playwright script for structural/visual verification.

---

### Task 1: Build the Contact component

**Files:**
- Create: `src/components/Contact.tsx`

- [ ] **Step 1: Create the file**

```tsx
import Reveal from '@/components/Reveal';

export default function Contact() {
  function handleBookConsultation() {
    window.location.href = 'mailto:hello@folkstechai.com?subject=Hello%20FolksTechAI';
  }

  return (
    <section
      id="contact"
      className="scroll-fade-section relative w-full bg-[#0A0C18] py-24 sm:py-32 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/[0.06] blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
        <Reveal className="max-w-[640px] mx-auto text-center">
          <h2 className="text-white text-[32px] sm:text-[42px] md:text-[48px] font-normal leading-[1.1] mb-4 sm:mb-5">
            Ready to become AI-enabled?
          </h2>
          <p className="text-white/70 text-[16px] sm:text-[18px] font-[450] leading-[1.5] mb-8 sm:mb-10">
            Tell us what's slowing your business down. In a free consultation we'll show you a practical, trustworthy path to a working solution — fast.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleBookConsultation}
              className="inline-flex items-center justify-center h-[52px] px-8 bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[15px] font-[450] hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a free consultation
            </button>
            <a
              href="mailto:hello@folkstechai.com"
              className="text-white/60 text-[14px] font-[450] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
            >
              or email hello@folkstechai.com directly
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no errors mentioning `Contact.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "$(cat <<'EOF'
Add Contact section with centered closing CTA
EOF
)"
```

---

### Task 2: Wire Contact into the page

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the import and render it between FAQs and Footer**

In `src/App.tsx`, change:

```tsx
import FAQs from '@/components/FAQs';
import Footer from '@/components/Footer';
```

to:

```tsx
import FAQs from '@/components/FAQs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
```

and change:

```tsx
      <FAQs />
      <Footer />
```

to:

```tsx
      <FAQs />
      <Contact />
      <Footer />
```

- [ ] **Step 2: Typecheck, lint, and build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: all three succeed with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "$(cat <<'EOF'
Wire Contact section into App between FAQs and Footer
EOF
)"
```

---

### Task 3: Visual verification and progress.md update

**Files:**
- Scratchpad only (no repo files) for the verification script/screenshots
- Modify: `progress.md`

- [ ] **Step 1: Start the dev server**

Run: `npm run dev -- --port 5185 &` from the repo root (check the actual printed port in case 5185 is taken).

- [ ] **Step 2: Reuse the existing Playwright install in the scratchpad**

Playwright + chromium were already installed in this session's scratchpad for FAQs verification — reuse that install (check `<scratchpad>/node_modules/playwright` exists first; only reinstall if missing).

- [ ] **Step 3: Write and run the verification script**

Create `<scratchpad>/verify-contact.mjs`:

```js
import { chromium } from 'playwright';

const url = 'http://localhost:5185/#contact';
const browser = await chromium.launch();

for (const { name, width, height } of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(url);
  await page.waitForSelector('#contact');

  const heading = await page.locator('#contact h2').innerText();
  const buttonText = await page.locator('#contact button').innerText();
  const secondaryHref = await page.locator('#contact a[href^="mailto:"]').getAttribute('href');

  console.log(`[${name}] heading="${heading}" button="${buttonText}" secondaryHref="${secondaryHref}"`);

  await page.screenshot({ path: `<scratchpad>/contact-${name}.png`, fullPage: false });
  await page.close();
}

await browser.close();
```

(Replace `<scratchpad>` with the actual absolute scratchpad path in both the `path:` value and when invoking the script.)

Run: `node <scratchpad>/verify-contact.mjs`

Expected output:
```
[desktop] heading="Ready to become AI-enabled?" button="Book a free consultation" secondaryHref="mailto:hello@folkstechai.com"
[mobile] heading="Ready to become AI-enabled?" button="Book a free consultation" secondaryHref="mailto:hello@folkstechai.com"
```

Do NOT click the primary button in the test — it assigns `window.location.href` to a `mailto:` URL, which can hang or misbehave in a headless browsing context. Structural verification (heading text, button text, secondary link's `href`) is sufficient to confirm the CTA is wired correctly, since the `mailto:` click pattern itself is already shipped and trusted in `Nav.tsx`.

- [ ] **Step 4: Visually inspect the two screenshots**

Read `<scratchpad>/contact-desktop.png` and `<scratchpad>/contact-mobile.png`. Confirm: content is centered (not left-aligned like other sections), heading/subtext/both CTAs are readable, no overflow or clipping on mobile width, the radial glow decoration doesn't wash out the text.

- [ ] **Step 5: Stop the dev server**

Kill the background `npm run dev` process.

- [ ] **Step 6: Update progress.md**

Change row 7 of the Sections table from:

```
| 7 | Contact + footer | ⬜ Not started | Email CTA only, no fake form submission |
```

to:

```
| 7 | Contact + footer | ✅ Done — Contact section built | Real closing CTA copy, mailto-based (no form), fixes previously-dead #contact anchor links in Nav/Footer |
```

and append a new Build Log entry:

```
- 2026-09-15 — Contact section built (`Contact.tsx`, id="contact"), the last of the original 7 roadmap sections. Uses the real Closing CTA copy from live-site-reference.md ("Ready to become AI-enabled?" + real subtext) rather than invented copy. Centered layout — a deliberate departure from every other section's left-aligned header, giving the page a calmer closing beat before Footer. Primary CTA reuses the exact `mailto:hello@folkstechai.com?subject=...` pattern already shipped in Nav.tsx's "Contact" button rather than introducing a new interaction or a fake form, matching this section's explicit "email CTA only" scope. No video background (FAQs and Footer already have one each; a third in a row would be noisy) — same ambient radial-glow decoration as Why.tsx instead. This also fixes Nav's and Footer's pre-existing `#contact` anchor links, which previously pointed at a nonexistent id. Verified via Playwright: heading, button label, and secondary mailto link's href all render correctly on desktop and mobile; screenshots confirm centered layout with no overflow. typecheck/lint/build all pass.
```

- [ ] **Step 7: Commit**

```bash
git add progress.md
git commit -m "$(cat <<'EOF'
Mark Contact section built in progress.md
EOF
)"
```

---

## Self-Review Notes

- **Spec coverage:** real closing-CTA copy (Task 1), mailto-based primary CTA matching Nav's existing pattern (Task 1), secondary plain mailto link (Task 1), centered layout departing from other sections (Task 1), no video (Task 1 — only a radial glow, no `<video>` element), `id="contact"` fixing Nav/Footer's dead anchors (Task 1, verified in Task 3), placement between FAQs and Footer (Task 2).
- **No placeholders:** all code blocks are complete; the Playwright script is fully written.
- **Type consistency:** single task creates the component, so no cross-task naming drift risk (no shared state/types introduced beyond a local `handleBookConsultation` function).
