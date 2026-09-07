// GitHub Pages serves 404.html for unknown paths. Copying index.html there
// means direct navigation, refreshes, and future client-side routes all load
// the app instead of a GitHub error page.
//
// Cloudflare Pages has native SPA fallback behavior when no top-level
// 404.html exists, so do not create one there. Cloudflare exposes CF_PAGES=1
// during its build, which lets the same repository serve both deployments.
import { copyFileSync } from "node:fs";

if (process.env.CF_PAGES === "1") {
  console.log("Cloudflare Pages detected; skipping dist/404.html SPA fallback.");
} else {
  copyFileSync("dist/index.html", "dist/404.html");
  console.log("Created dist/404.html (GitHub Pages SPA fallback).");
}
