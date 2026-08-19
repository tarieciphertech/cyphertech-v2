# Cypher Technologies

Official Cypher Technologies website — React 19, Vite 8, Tailwind CSS 3, Framer Motion, React Icons, and EmailJS. Hosted on GitHub Pages.

**Live:** https://cyphertech.co.zw (custom domain, active)
**Fallback:** https://tarieciphertech.github.io/cyphertech-v2/ (redirects to the custom domain)

## Local Development

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the local development server.
- `npm run build` — production build (also creates `dist/404.html` for the GitHub Pages SPA fallback via `postbuild`).
- `npm run lint` — check the code with ESLint.
- `npm run preview` — serve the production build locally.
- `npm run deploy` — build and publish `dist` to the `gh-pages` branch.

## Contact Form (EmailJS)

The contact form sends through EmailJS and falls back to the visitor's email app (mailto) when keys are missing.

1. Copy `.env.example` to `.env` and fill in the values from https://dashboard.emailjs.com/:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
2. Rebuild/restart after changing `.env`.
3. For the GitHub Actions deployment, add the same three names as repository secrets
   (**Settings → Secrets and variables → Actions**). The workflow already passes them to the build.

`.env` is gitignored — never commit real keys.

## Deployment

Two deployment paths exist; use whichever the repository's Pages settings are configured for:

1. **GitHub Actions (recommended):** pushing to `main` runs `.github/workflows/deploy.yml`, which builds and deploys automatically.
2. **gh-pages branch:** `npm run deploy` builds locally and publishes `dist` to the `gh-pages` branch.

## Custom Domain (ciphertech.co.zw) — ACTIVE

The custom domain is live. The configuration that makes it work:

1. `vite.config.js` — `base: '/'` (do NOT change back to `/cyphertech-v2/`; that breaks asset paths on the custom domain).
2. `public/CNAME` — contains exactly one line: `ciphertech.co.zw`
3. `package.json` — `homepage: "https://cyphertech.co.zw"`.
4. `index.html` — canonical, `og:url`, `og:image`, `twitter:image`, and JSON-LD `url` all use `https://cyphertech.co.zw/`.
5. GitHub Pages publishes from the `gh-pages` branch (`/ root`) with the custom domain set in **Settings → Pages** and "Enforce HTTPS" enabled.

## Project Structure

- `src/data/site.js` — all business data (contact details, services, projects, etc.). Edit facts here.
- `src/components/` — section components (Navbar, Hero, Services, Projects, Contact, Footer, ...).
- `src/utils/paths.js` — `asset()` helper that resolves `public/` files against the Vite base path.
- `public/brand/` — official Cypher Technologies brand assets.
- `scripts/copy-404.mjs` — post-build SPA fallback for GitHub Pages.
