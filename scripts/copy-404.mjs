// GitHub Pages serves 404.html for unknown paths. Copying index.html there
// means direct navigation, refreshes, and future client-side routes all load
// the app instead of a GitHub error page.
import { copyFileSync } from "node:fs";

copyFileSync("dist/index.html", "dist/404.html");
console.log("Created dist/404.html (GitHub Pages SPA fallback).");
