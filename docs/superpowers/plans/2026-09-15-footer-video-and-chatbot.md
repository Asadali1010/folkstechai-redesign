# Footer Video Background + Chatbot Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a looping video background to the Footer section, and add a floating scripted-FAQ chatbot widget to the site.

**Architecture:** `Footer.tsx` gains an absolutely-positioned `<video>` layer with a dark scrim, matching the existing Hero pattern. The floating `ScrollToTop` button is extracted from `Footer.tsx` into its own component so it can be told to hide while the new `ChatWidget` panel is open (both rendered as siblings at the `App.tsx` level, coordinated by one piece of state in `App.tsx`).

**Tech Stack:** React 18 + TypeScript, Tailwind CSS, lucide-react icons. No test framework exists in this repo (no jest/vitest configured) — this project verifies changes via `npm run typecheck`, `npm run lint`, `npm run build`, and manual/Playwright visual verification against the dev server, matching how the existing Team section (see `docs/superpowers/plans/2026-09-15-team-section.md`) was verified. Steps below follow that convention instead of unit-test TDD.

**Spec:** `docs/superpowers/specs/2026-09-15-footer-video-and-chatbot-design.md`

---

### Task 1: Extract `ScrollToTop` into its own component

**Files:**
- Create: `src/components/ScrollToTop.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Create `src/components/ScrollToTop.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop({ hidden = false }: { hidden?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = scrolled && !hidden;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(160,80,220,0.35)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
      style={{ backgroundImage: 'linear-gradient(135deg, #F6577C, #8B5CF6)' }}
    >
      <ArrowUp className="w-5 h-5 text-white" strokeWidth={2.25} />
    </button>
  );
}
```

This is the same button that currently lives inside `Footer.tsx`, moved to its
own file with one addition: a `hidden` prop that forces it invisible
regardless of scroll position (used later so it doesn't collide with the open
chat panel). Note `z-40` (was `z-50`) — the chat panel will use `z-50` so it
always sits above this button during the cross-fade.

- [ ] **Step 2: Remove the old `ScrollToTop` function and its render from `Footer.tsx`**

In `src/components/Footer.tsx`, delete the entire `function ScrollToTop() { ... }`
block, the `<ScrollToTop />` usage at the bottom of the `Footer` component's
JSX, and the now-unused `useState`/`ArrowUp` imports if `Footer.tsx` doesn't
use them elsewhere (check first — `Footer.tsx` does not use `useState` or
`ArrowUp` anywhere else, so remove both from its import line).

- [ ] **Step 3: Run typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: both pass with no errors (there will be an unused-import lint error
if the old `ArrowUp`/`useState` imports weren't fully removed from
`Footer.tsx` — fix if so).

- [ ] **Step 4: Commit**

```bash
git add src/components/ScrollToTop.tsx src/components/Footer.tsx
git commit -m "$(cat <<'EOF'
Extract ScrollToTop into its own component

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Add video background to Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Wrap the existing footer content and add the video + scrim layers**

In `src/components/Footer.tsx`, the `<footer>` element currently looks like:

```tsx
  return (
    <footer className="relative w-full bg-[#0A0C18] border-t border-white/[0.08] overflow-hidden">
      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pt-16 sm:pt-20 pb-8">
```

Change it to add the video and a scrim directly after the opening `<footer>`
tag, keeping the existing content `<div>` as-is but nothing else about it
changes:

```tsx
  return (
    <footer className="relative w-full bg-[#0A0C18] border-t border-white/[0.08] overflow-hidden">
      <video
        className="footer-video absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0A0C18]/90 via-[#0A0C18]/85 to-[#0A0C18]/95"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pt-16 sm:pt-20 pb-8">
```

Note the content wrapper `<div>` gains `relative z-10` (it didn't need
z-index before since it was the only layer) so it renders above the new
video and scrim. Everything else inside that div is unchanged.

Also update the closing of the component: the `<ScrollToTop />` call at the
very end of the `Footer` component's return (just before `</footer>`) was
already removed in Task 1 — confirm the JSX now ends with just
`</div>\n    </footer>` and no dangling `<ScrollToTop />` reference remains.

- [ ] **Step 2: Add reduced-motion handling in `src/index.css`**

Append to `src/index.css`:

```css
@media (prefers-reduced-motion: reduce) {
  .footer-video { visibility: hidden; }
}
```

This matches the existing reduced-motion pattern already used for the
Process section video (`.process-video { visibility: hidden; ... }` near the
end of `src/index.css`).

- [ ] **Step 3: Run typecheck, lint, and build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: all three pass with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx src/index.css
git commit -m "$(cat <<'EOF'
Add looping video background to Footer section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Build the ChatWidget component

**Files:**
- Create: `src/components/ChatWidget.tsx`

- [ ] **Step 1: Create `src/components/ChatWidget.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

type Message = { id: number; sender: 'bot' | 'user'; text: string };

type Topic = 'services' | 'process' | 'pricing' | 'location' | 'contact';

const QUICK_REPLIES: { label: string; topic: Topic }[] = [
  { label: 'Services', topic: 'services' },
  { label: 'Process', topic: 'process' },
  { label: 'Pricing', topic: 'pricing' },
  { label: 'Location', topic: 'location' },
  { label: 'Contact', topic: 'contact' },
];

const ANSWERS: Record<Topic, string> = {
  services:
    'We build AI Enablement & Strategy, Custom Software Development, AI Agents & Automation, Data & Analytics, Rapid Delivery & Iteration, and Legacy Modernization — ask about any of these.',
  process:
    'Our process is Discover → Prototype → Build & Test → Ship & Iterate. You get a working prototype in days, then continuous delivery as requirements evolve.',
  pricing:
    "Pricing depends on scope, so the fastest way to get a real number is a free consultation — tell us what you're building and we'll follow up with details.",
  location:
    "We're based in Lahore, Pakistan, and work with clients worldwide.",
  contact:
    'Reach us any time at hello@folkstechai.com, or use the "Book a consultation" link below.',
};

const KEYWORD_TOPICS: { keys: string[]; topic: Topic }[] = [
  { keys: ['price', 'cost', 'pricing', 'budget', 'quote'], topic: 'pricing' },
  { keys: ['contact', 'email', 'reach', 'call'], topic: 'contact' },
  { keys: ['location', 'where', 'based', 'office'], topic: 'location' },
  { keys: ['process', 'timeline', 'how long', 'steps'], topic: 'process' },
  { keys: ['service', 'services', 'offer', 'build', 'do you'], topic: 'services' },
];

const FALLBACK =
  "I'm a simple assistant for quick answers — try one of the topics below, or reach a human via email or a consultation.";

function matchTopic(input: string): Topic | null {
  const lower = input.toLowerCase();
  for (const { keys, topic } of KEYWORD_TOPICS) {
    if (keys.some((key) => lower.includes(key))) return topic;
  }
  return null;
}

let nextId = 1;

export default function ChatWidget({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, sender: 'bot', text: "Hi! I'm the FolksTechAI assistant. Ask about our services, process, pricing, location, or contact info." },
  ]);
  const [input, setInput] = useState('');
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function appendMessage(sender: Message['sender'], text: string) {
    nextId += 1;
    setMessages((prev) => [...prev, { id: nextId, sender, text }]);
  }

  function respondTo(topic: Topic | null) {
    appendMessage('bot', topic ? ANSWERS[topic] : FALLBACK);
  }

  function handleQuickReply(topic: Topic) {
    appendMessage('user', QUICK_REPLIES.find((q) => q.topic === topic)!.label);
    respondTo(topic);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    appendMessage('user', trimmed);
    respondTo(matchTopic(trimmed));
    setInput('');
  }

  return (
    <>
      {isOpen && (
        <div
          role="dialog"
          aria-label="FolksTechAI chat assistant"
          className="fixed z-50 bottom-[152px] right-5 sm:bottom-[176px] sm:right-8 w-[calc(100vw-40px)] sm:w-[360px] h-[440px] sm:h-[480px] max-h-[70vh] flex flex-col rounded-2xl border border-white/[0.12] bg-[#0A0C18]/95 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
            <p className="text-white text-[14px] font-[500]">FolksTechAI Assistant</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>

          <div ref={threadRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] text-[13.5px] font-[450] leading-[1.4] rounded-xl px-3 py-2 ${
                  message.sender === 'bot'
                    ? 'self-start bg-white/[0.08] text-white/85'
                    : 'self-end text-white'
                }`}
                style={
                  message.sender === 'user'
                    ? { backgroundImage: 'linear-gradient(135deg, #F6577C, #8B5CF6)' }
                    : undefined
                }
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-white/[0.08]">
            {QUICK_REPLIES.map(({ label, topic }) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleQuickReply(topic)}
                className="text-[12.5px] font-[450] text-white/75 border border-white/15 rounded-full px-3 py-1.5 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.08]">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question…"
              aria-label="Type a message"
              className="flex-1 h-9 rounded-lg bg-white/[0.06] border border-white/[0.12] px-3 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-white transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ backgroundImage: 'linear-gradient(135deg, #F6577C, #8B5CF6)' }}
            >
              <Send className="w-4 h-4" strokeWidth={2} />
            </button>
          </form>

          <div className="px-4 pb-3 -mt-1 text-[11.5px] text-white/40">
            or email{' '}
            <a href="mailto:hello@folkstechai.com" className="text-white/60 hover:text-white transition-colors">
              hello@folkstechai.com
            </a>{' '}
            ·{' '}
            <a href="#contact" className="hover:text-white transition-colors" style={{ color: '#B48CFF' }}>
              Book a consultation
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed z-50 bottom-24 right-5 sm:bottom-28 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(160,80,220,0.35)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{ backgroundImage: 'linear-gradient(135deg, #F6577C, #8B5CF6)' }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" strokeWidth={2.25} />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.25} />
        )}
      </button>
    </>
  );
}
```

- [ ] **Step 2: Run typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: both pass with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ChatWidget.tsx
git commit -m "$(cat <<'EOF'
Add scripted FAQ ChatWidget component

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Wire ScrollToTop and ChatWidget into App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update `src/App.tsx`**

Replace the full file contents with:

```tsx
import { useState } from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Why from '@/components/Why';
import Team from '@/components/Team';
import Process from '@/components/Process';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ChatWidget from '@/components/ChatWidget';

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Why />
      <Team />
      <Process />
      <Footer />
      <ScrollToTop hidden={chatOpen} />
      <ChatWidget onOpenChange={setChatOpen} />
    </>
  );
}

export default App;
```

- [ ] **Step 2: Run typecheck, lint, and build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: all three pass with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "$(cat <<'EOF'
Wire ScrollToTop and ChatWidget into App

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Visual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev` (in background)

- [ ] **Step 2: Screenshot the footer and confirm the video is playing behind readable text**

Use a headless browser (Playwright, as used for the earlier Team section
verification) to load the page, scroll to the bottom, and screenshot. Confirm:
- The video is visible behind the footer content.
- All footer text/links are still fully readable against the scrim.
- The scroll-to-top button appears in the bottom-right, and the chat bubble
  sits stacked above it with a visible gap (no overlap).

- [ ] **Step 3: Screenshot the open chat panel**

Click the chat bubble (or dispatch a click via the Playwright script),
screenshot again, and confirm:
- The panel opens above the bubble with the greeting message visible.
- The scroll-to-top button is no longer visible (hidden while chat is open).
- Clicking a quick-reply (e.g. "Pricing") appends a user bubble and the
  matching canned bot response.

- [ ] **Step 4: Stop the dev server**

Run: `pkill -f vite` (or stop the background process started in Step 1).

---

## Self-Review Notes

- Spec coverage: video background + scrim (Task 2), reduced-motion (Task 2
  Step 2), chat bubble + panel + quick replies + free-text keyword matching +
  fallback (Task 3), scroll-to-top hide-while-chat-open coordination (Task 1
  + Task 4), no backend/persistence (confirmed — `ChatWidget` state is local
  `useState` only). All spec sections are covered.
- No placeholders: all code blocks are complete and copy-pasteable.
- Type consistency: `ChatWidget`'s `onOpenChange` prop type matches its use
  in `App.tsx` (`setChatOpen`, a `Dispatch<SetStateAction<boolean>>`, which
  is a valid `(open: boolean) => void`). `ScrollToTop`'s `hidden` prop matches
  its use in `App.tsx` (`hidden={chatOpen}`).
