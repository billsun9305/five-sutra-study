# 五部經典研習大綱

React + Vite single-page app for the Five Sutras Study Guide（五部經典研習大綱）.
Live: https://billsun9305.github.io/five-sutra-study/

## Develop

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build   # tsc + vite build → dist/
```

Deployed automatically to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

## Notes

- Content lives in `src/data/content.ts` — sutra quotes and 白話 explanations are reproduced verbatim from the study sources; do not paraphrase them.
- Design system: `design/DESIGN.md`, tokens in `src/styles/tokens.css`.
- Google Analytics 4 (G-ZHZFZ1GS85) snippet is in `index.html`.
