# Slide deck

- This project is a presentation, not a website. Each slide is a React component in `src/slides`, wrapped in `<Slide>` from `@/deck/slide`, and listed in order in `src/slides/index.ts`.
- Slides are laid out on a fixed 1920×1080 canvas that `src/deck/deck.tsx` scales to fit the screen. Size things in pixels for that canvas; don't use viewport units or responsive breakpoints.
- Slides are projected: body text at least 40px, headings 80px and up, one idea per slide, high contrast. Charts and diagrams beat bullet lists.
- To check a slide, open `#/<n>` (1-based). `/?print` shows every slide stacked, which is how the deck exports to PDF.
- Theme tokens are CSS variables in `src/index.css`; build from them.
