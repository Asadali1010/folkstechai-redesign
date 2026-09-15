# Footer Video Background + Scripted Chatbot Widget

Date: 2026-09-15

## Context

The site's Footer (`src/components/Footer.tsx`) currently has a flat `#0A0C18`
background. The user wants a looping video background there, matching how
Hero and Work already use full-bleed background video. Separately, the user
wants a chatbot added to the site.

The site is a static Vite + React SPA with no backend, so any chatbot must
work entirely client-side — no API keys, no server calls.

## 1. Footer video background

- Add a `<video>` element inside `Footer.tsx`, absolutely positioned behind
  the existing content, using the same technique as `Hero.tsx`:
  `autoPlay loop muted playsInline`, `object-cover`, `aria-hidden`.
- Video source: the CloudFront URL supplied by the user
  (`hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4`).
- Add a dark scrim overlay (`#0A0C18` gradient, ~85–90% opacity) between the
  video and the content so text/links stay fully readable at current
  contrast — consistent with how Process/Work handle video legibility.
- All existing footer content stays in a `relative z-10` wrapper, unchanged
  otherwise.
- Respect `prefers-reduced-motion`: hide/freeze the video for users who have
  that preference set (matching the existing Work component pattern).

## 2. Chatbot — scripted FAQ assistant

New component: `src/components/ChatWidget.tsx`, rendered once in `App.tsx`
alongside `Footer` (it's a page-level floating widget, not part of the
footer itself).

**Trigger bubble**
- Fixed, bottom-right, gradient (`#F6577C` → `#8B5CF6`, same as the
  scroll-to-top button), circular, with a chat icon (`MessageCircle` from
  lucide-react).
- Positioned directly above the existing scroll-to-top button in the same
  corner (stacked, ~16px gap).
- Toggles the chat panel open/closed on click.

**Panel**
- Desktop: fixed card, bottom-right, ~360px wide, ~480px tall, dark
  glass-morphic styling consistent with the rest of the site
  (`bg-[#0A0C18]/95`, `backdrop-blur`, border, rounded corners).
- Mobile: full-width bottom sheet.
- Header: "FolksTechAI Assistant" + close button.
- Message thread: scrollable list of bot/user bubbles, starting with a
  greeting message.
- Quick-reply buttons (always visible below the thread): Services, Process,
  Pricing, Location, Contact. Clicking one appends a "user" bubble with the
  button label and a canned "bot" response.
- Text input: free text is lowercased and matched against a small keyword
  map (e.g. "price"/"cost" → pricing answer, "contact"/"email" → contact
  answer, "location"/"where" → location answer, "process"/"how" → process
  answer, "service" → services answer). No match → fallback response
  pointing to the quick-replies plus the email and "Book a consultation"
  link.
- All canned answers are sourced from copy already present elsewhere on the
  site (Hero tagline, Services list, Process steps, Footer email/location)
  so they can't drift out of sync with real content.

**Interaction with scroll-to-top button**
- While the chat panel is open, the scroll-to-top button fades out
  (`opacity-0 pointer-events-none`) so the two floating elements never
  overlap in the same corner.

**State**
- Local `useState` only: `isOpen`, `messages` array. No persistence
  (closing/reloading resets the conversation) — this is intentionally
  minimal per YAGNI, matching the site's otherwise stateless components.

## Out of scope

- No real AI/LLM backend, no API keys, no third-party chat service.
- No conversation persistence across reloads.
- No analytics/tracking of chat usage.
