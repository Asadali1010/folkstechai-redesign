# Standalone Team Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract the team block out of `Why.tsx` into a standalone, visually bolder `Team.tsx` section placed between Why and Process.

**Architecture:** New self-contained `src/components/Team.tsx` (data + JSX in one file, matching the size/pattern of `Why.tsx`), rendered as its own `<section id="team">` in `App.tsx`. Reuses the existing `Reveal` component for entrance animation and the existing dark/glassmorphism visual language (see `Work.css`) — no new dependencies, no new external assets. `Why.tsx` loses its team subsection but is otherwise unchanged.

**Tech Stack:** React + TypeScript + Tailwind (utility classes + a few inline styles for gradient tints, matching how `Why.tsx`/`Work.tsx` already mix the two). No test framework exists in this repo (`package.json` has no test script) — verification is `npm run typecheck`, `npm run lint`, `npm run build`, plus a manual visual check in the dev server, matching how prior sections in this project (Process, Work) were verified.

---

### Task 1: Create the `Team` component

**Files:**
- Create: `src/components/Team.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Reveal from '@/components/Reveal';

type Accent = 'blue' | 'teal' | 'purple';

const ACCENT_STYLES: Record<Accent, { tint: string; roleColor: string }> = {
  blue: {
    tint: 'linear-gradient(135deg, rgba(80,110,255,0.35), rgba(10,12,24,0.92)), radial-gradient(circle at 30% 20%, rgba(59,91,255,0.35), transparent 60%)',
    roleColor: 'text-[#9fc0fb]',
  },
  teal: {
    tint: 'linear-gradient(135deg, rgba(0,194,168,0.30), rgba(10,12,24,0.92)), radial-gradient(circle at 30% 20%, rgba(0,194,168,0.35), transparent 60%)',
    roleColor: 'text-[#8fe8d8]',
  },
  purple: {
    tint: 'linear-gradient(135deg, rgba(180,120,255,0.30), rgba(10,12,24,0.92)), radial-gradient(circle at 30% 20%, rgba(180,120,255,0.35), transparent 60%)',
    roleColor: 'text-[#dcc2ff]',
  },
};

const TEAM: { name: string; role: string; bio: string; accent: Accent }[] = [
  {
    name: 'Ayesha Khan',
    role: 'Founder & CEO',
    bio: 'Sets the vision: make trustworthy AI practical for every business.',
    accent: 'blue',
  },
  {
    name: 'Bilal Ahmed',
    role: 'Head of Engineering',
    bio: 'Ships production software fast — without cutting corners on quality.',
    accent: 'teal',
  },
  {
    name: 'Sana Malik',
    role: 'Lead AI Engineer',
    bio: 'Builds AI agents with real guardrails, evaluation, and human oversight.',
    accent: 'purple',
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="scroll-fade-section relative w-full bg-[#0A0C18] py-20 sm:py-28 overflow-hidden"
    >
      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
        <Reveal className="max-w-[640px] mb-12 sm:mb-16">
          <p className="text-white/60 text-[13px] sm:text-[14px] font-[450] tracking-[0.08em] uppercase mb-3 sm:mb-4">
            The team
          </p>
          <h2 className="text-white text-[32px] sm:text-[42px] md:text-[48px] font-normal leading-[1.1]">
            Three people, no filler roles.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {TEAM.map((member, i) => {
            const accent = ACCENT_STYLES[member.accent];
            return (
              <Reveal key={member.name} delay={i * 100}>
                <div
                  className="relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-white/[0.15] backdrop-blur-xl"
                  style={{ backgroundImage: accent.tint }}
                >
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-[#080b12]/90 to-transparent">
                    <p className="text-white text-[17px] sm:text-[18px] font-[500] leading-[1.25]">
                      {member.name}
                    </p>
                    <p
                      className={`${accent.roleColor} text-[11px] sm:text-[12px] font-[450] uppercase tracking-[0.06em] mt-1 mb-2.5`}
                    >
                      {member.role}
                    </p>
                    <p className="text-white/70 text-[13.5px] sm:text-[14px] font-[450] leading-[1.5]">
                      {member.bio}
                    </p>
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

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no errors (in particular, no errors about `Team.tsx`)

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors in `src/components/Team.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/components/Team.tsx
git commit -m "$(cat <<'EOF'
Add standalone Team section component

Bold glassmorphic roster (dark theme, tinted gradient cards) as its
own section, decoupled from Why's smaller inline team block.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Remove the team subsection from `Why.tsx`

**Files:**
- Modify: `src/components/Why.tsx:29-48` (the `TEAM` array)
- Modify: `src/components/Why.tsx:108-131` (the "The team" `Reveal` heading + grid block)

- [ ] **Step 1: Remove the `TEAM` array**

In `src/components/Why.tsx`, delete lines 29-48 (the `const TEAM = [...]` block), so the file goes directly from the `PILLARS` array's closing `];` to the `export default function Why() {` line.

- [ ] **Step 2: Remove the team JSX block**

In the same file, delete this block (currently lines 108-131, immediately after the `PILLARS` grid's closing `</div>` and before the section's closing `</div>` / `</section>`):

```tsx
        <Reveal>
          <p className="text-white/50 text-[12px] sm:text-[13px] font-[450] tracking-[0.08em] uppercase mb-6 sm:mb-8">
            The team
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 90}>
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white text-[14px] font-[450]"
                  aria-hidden="true"
                >
                  {member.initials}
                </div>
                <div>
                  <p className="text-white text-[16px] font-[450] leading-[1.25]">{member.name}</p>
                  <p className="text-white/50 text-[13px] font-[450] leading-[1.3] mb-2">{member.role}</p>
                  <p className="text-white/70 text-[13.5px] font-[450] leading-[1.5]">{member.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
```

After deletion, the `PILLARS` grid's `</div>` should be followed directly by the section's closing `</div>` and `</section>`.

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: no errors (confirms no dangling reference to the removed `TEAM` array)

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no errors in `src/components/Why.tsx`

- [ ] **Step 5: Commit**

```bash
git add src/components/Why.tsx
git commit -m "$(cat <<'EOF'
Remove inline team block from Why section

Team now has its own dedicated section (see Team.tsx); Why keeps
only its positioning pillars and intro copy.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Wire `Team` into the page and verify

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Import and place the new section**

Change `src/App.tsx` from:

```tsx
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Why from '@/components/Why';
import Process from '@/components/Process';

function App() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Why />
      <Process />
    </>
  );
}

export default App;
```

to:

```tsx
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Why from '@/components/Why';
import Team from '@/components/Team';
import Process from '@/components/Process';

function App() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Why />
      <Team />
      <Process />
    </>
  );
}

export default App;
```

- [ ] **Step 2: Full build**

Run: `npm run build`
Expected: build succeeds with no errors

- [ ] **Step 3: Manual visual check**

Run: `npm run dev`, open the printed local URL in a browser, scroll to the
Team section (between Why and Process, anchor `#team`). Confirm:
- Three cards render side by side on desktop, stacked on mobile width
- Each card shows a distinct tint (blue / teal / purple) with name, role,
  bio legible over the gradient
- Cards fade in on scroll (same `Reveal` behavior as other sections)
- Stop the dev server once confirmed.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "$(cat <<'EOF'
Wire Team section into page between Why and Process

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
