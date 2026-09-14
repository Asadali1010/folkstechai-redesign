# Targo

A single-page React + TypeScript site with exactly two sections: Hero and About.
Built to the supplied Targo brief, with Quantico, staircase headings, cyan
chamfered buttons, and the two supplied CloudFront videos.

## Run

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Behavior

- Home and About navigate within the page; Get started scrolls to About.
- Contact us opens an email to hello@folkstechai.com.
- Learn more opens an email to the same address with a Targo inquiry subject.
- Mobile navigation toggles at 700px and closes after a link is selected.
- Both muted, looping, inline videos retry autoplay every second while paused,
  when ready, and on the first document click or touch.
- Google Fonts and the two videos load from their supplied external hosts.

The active page is in src/pages/Home.tsx, styles in src/index.css, and playback
recovery in src/hooks/useAutoplayVideo.ts. Existing unused components remain
in the workspace but are not rendered or included in the page bundle.
