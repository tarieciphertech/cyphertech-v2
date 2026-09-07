# Cypher Technologies

Official Cypher Technologies website — React 19, Vite 8, Tailwind CSS 3, Framer Motion, React Icons, and EmailJS. The public site is hosted on GitHub Pages; the same application is prepared for the dedicated `admin.cyphertech.co.zw` Cloudflare Pages deployment.

**Public:** https://cyphertech.co.zw (custom domain, active)
**Admin:** https://admin.cyphertech.co.zw (Cloudflare Pages deployment target)
**Fallback:** https://tarieciphertech.github.io/cyphertech-v2/ (redirects to the custom domain)

## Local Development

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the local development server.
- `npm run build` — production build; GitHub Pages receives `dist/404.html` for its SPA fallback, while Cloudflare Pages skips that file because Cloudflare has native SPA fallback behavior.
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
3. For GitHub Actions, add the same three names as repository secrets (**Settings → Secrets and variables → Actions**). The workflow already passes them to the build.
4. For Cloudflare Pages, add the required `VITE_*` variables under the Pages project's production environment variables.

`.env` is gitignored — never commit real keys.

## Deployment

### Public site — GitHub Pages

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and deploys the public site automatically.

### Admin site — Cloudflare Pages

The repository is prepared for a Cloudflare Pages Git deployment:

- **Production branch:** `main`
- **Root directory:** `/`
- **Framework preset:** React (Vite)
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js:** 22 (pinned by `.node-version`)

Cloudflare Pages automatically provides `CF_PAGES=1` during builds. `scripts/copy-404.mjs` detects this and does not create `dist/404.html`, allowing Cloudflare's native SPA fallback to handle React routes.

The application is hostname-aware: `admin.cyphertech.co.zw` opens the admin portal, while the public hostname continues to serve the public website. Authentication and authorization remain enforced by Supabase Auth, the profile role check, `AdminRoute`, and database RLS; hostname routing is not a security boundary.

### Cloudflare environment variables

Add these to the Cloudflare Pages **Production** environment as needed by the application:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Use the same Supabase values already used by the public deployment. Never put service-role keys or other server secrets in `VITE_*` variables.

### Admin custom domain

After the first Cloudflare Pages deployment:

1. Open the Pages project and choose **Custom domains → Set up a domain**.
2. Add `admin.cyphertech.co.zw`.
3. If DNS is managed outside Cloudflare, create the CNAME requested by Pages and point `admin` to the project's `*.pages.dev` hostname.
4. Wait for the custom domain and HTTPS certificate to become active.
5. Test the admin login and protected routes on `https://admin.cyphertech.co.zw`.

Cloudflare Pages supports custom subdomains through a CNAME to the Pages hostname. See the official Cloudflare Pages documentation for the current setup flow.

### Cloudflare security headers

`public/_headers` adds admin-only browser security and indexing headers when served by Cloudflare Pages:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer`
- restrictive `Permissions-Policy`
- `X-Robots-Tag: noindex, nofollow, noarchive`
- HSTS for the admin hostname

The generated Pages hostname is also marked `noindex` so the admin deployment does not become a search result. GitHub Pages ignores `_headers` as a static file.

## Custom Domain (cyphertech.co.zw) — ACTIVE

The public custom domain is live. The configuration that makes it work:

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
- `public/_headers` — Cloudflare Pages security/indexing headers for the admin deployment.
- `scripts/copy-404.mjs` — post-build SPA fallback; skipped automatically on Cloudflare Pages.
