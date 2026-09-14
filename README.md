# FolksTechAI

The FolksTechAI landing page, built on the Apogee hero: React 18.3, Vite 5,
TypeScript 5.5, Tailwind CSS 3.4, PostCSS/Autoprefixer, and lucide-react 0.446.

## Development

- npm install
- npm run dev
- npm run typecheck
- npm run lint
- npm run build
- npm run preview

The page is currently the hero only (src/components/Hero.tsx), being built out
section by section. Exact animation CSS lives in src/index.css. The original
Targo version is preserved in design-archive/targo.

No FolksTechAI logo asset has been supplied yet, so the nav uses a plain text
wordmark ("FolksTechAI") in place of a designed mark. Swap in the real logo
when it's available.

The supplied font stylesheet registers "Suisse Int'l"; index.html aliases the
same font asset to the brief's "Suisse Intl" family without changing its CSS.
Font source: [OnlineWebFonts](https://www.onlinewebfonts.com/fonts).

The nav's "Contact" action and the hero's CTAs open a mailto to
hello@folkstechai.com. "Book a consultation" and "Explore our services" also
link to `#contact` and `#services` respectively — those sections don't exist
yet, so the links are currently no-ops; they'll resolve once those sections
are built.

The requested h-screen and overflow-hidden are preserved verbatim on the hero,
including on small screens, per the brief. Content taller than a short
viewport is clipped by that rule within the hero section itself.
