# Slides starter

The base for new [Frend](https://github.com/meetfrend) presentations: a slide deck written in React, with Vite, TypeScript, Tailwind CSS v4 and shadcn/ui.

```bash
pnpm install
pnpm dev
```

| Key | Does |
| --- | --- |
| → ↓ Space Page Down, or click the right half | Next slide |
| ← ↑ Page Up, or click the left half | Previous slide |
| Home / End | First / last slide |
| F | Fullscreen |

`#/3` in the URL opens slide 3. To export a PDF, open `/?print` and use the browser's print dialog ("Save as PDF").

Slides live in `src/slides`, one component each, listed in order in `src/slides/index.ts`. Theme tokens live in `src/index.css`. `@/` points to `src/`.
