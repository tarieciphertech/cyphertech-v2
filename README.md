# Cypher Technologies

Official Cypher Technologies public website — React, Vite, Tailwind CSS, Framer Motion, React Icons, and EmailJS.

**Public site:** https://cyphertech.co.zw

The public website is intentionally maintained as a standalone application. Internal administration is a separate application/repository and is not bundled, routed, or deployed from this repository.

## Local Development

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the local development server.
- `npm run build` — production build for GitHub Pages, including the SPA `404.html` fallback.
- `npm run lint` — check the code with ESLint.
- `npm run preview` — serve the production build locally.
- `npm run deploy` — build and publish `dist` to the `gh-pages` branch.

## Contact Form (EmailJS)

The contact form sends through EmailJS and falls back to the visitor's email app when configuration is unavailable.

1. Copy `.env.example` to `.env` and add the EmailJS values.
2. For GitHub Actions, add the `VITE_*` values as repository secrets.
3. Never commit real credentials or server-side secrets.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, builds the public application, and deploys it to GitHub Pages.

The public deployment contains only public-site and client-facing functionality. Internal administration code, routes, hostname detection, admin authorization components, and admin deployment configuration are intentionally excluded.

## Custom Domain

The production site uses the custom domain `cyphertech.co.zw` with Vite `base: '/'` so assets resolve correctly from the root domain.

## Project Structure

- `src/data/site.js` — public business data, services, and projects.
- `src/components/` — public website components.
- `src/pages/` — public and client-facing pages.
- `src/auth/` — client authentication support.
- `src/utils/paths.js` — asset path helper.
- `public/brand/` — official Cypher Technologies brand assets.
- `public/images/` — public website imagery.
- `public/robots.txt` — crawler instructions and sitemap location.
- `public/sitemap.xml` — public search-engine sitemap.
