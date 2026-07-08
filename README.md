# Cypher Technologies

Official Cypher Technologies website built with React, Vite, Tailwind CSS, Framer Motion, and React Icons.

## Local Development

```bash
npm install
npm run dev
```

The app is configured for GitHub Pages at:

```text
https://tarieciphertech.github.io/cyphertech-v2/
```

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates the production build.
- `npm run lint` checks the code with ESLint.
- `npm run preview` serves the production build locally.

## Deployment

Pushing to the `main` branch runs the GitHub Actions workflow in `.github/workflows/deploy.yml`, builds the app, and deploys `dist` to GitHub Pages.
