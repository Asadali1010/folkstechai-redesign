# Apogee

The supplied Apogee hero recreation: React 18.3, Vite 5, TypeScript 5.5,
Tailwind CSS 3.4, PostCSS/Autoprefixer, and lucide-react 0.446.

## Development

- npm install
- npm run dev
- npm run typecheck
- npm run lint
- npm run build
- npm run preview

The page is src/components/Hero.tsx. Exact animation CSS lives in src/index.css.
The original Targo version is preserved in design-archive/targo.

The supplied font stylesheet registers "Suisse Int'l"; index.html aliases the
same font asset to the brief's "Suisse Intl" family without changing its CSS.
Font source: [OnlineWebFonts](https://www.onlinewebfonts.com/fonts).

Demo and team buttons open email to hello@folkstechai.com. The remaining
navigation and Login controls retain the presentation-only behavior specified
in the brief; no login system or additional pages are included.

The requested h-screen and overflow-hidden are preserved verbatim, including
on small screens. Content taller than a short viewport is clipped by that rule.
