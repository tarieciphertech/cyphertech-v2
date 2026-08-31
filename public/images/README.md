# Image architecture

All content imagery lives under `public/images/`. The Vite base path is `/`, so
these are served at `/images/...` on the production domain (`cyphertech.co.zw`).

```
public/images/
├── hero/               # Homepage hero visual scenes
├── services/           # Per-service illustration scenes
├── projects/           # Project screenshots (real images go here)
├── about/              # Team / inside-cypher visuals
├── technology/         # Tech ecosystem imagery
└── contact/            # Contact / workspace visuals
```

## Replacing illustrations

Illustrations in `hero/` and `services/` are hand-drawn SVG scenes written in the
Cypher brand palette. To swap one for a photo:

1. Drop the new asset into the matching folder (e.g. `services/cybersecurity.webp`).
2. Point the relevant data entry at it via `images/` paths.

## Project screenshots

Real screenshots are prioritised for the project portfolio. When a screenshot does
not yet exist, the `ProjectFrame` component renders a clearly-labeled placeholder
(frame + watermark) so it can be swapped simply by adding a `src` to the project
slide data in `src/data/site.js`. No placeholder is ever presented as a real
screenshot.
