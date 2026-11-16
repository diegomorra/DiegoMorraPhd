#!/usr/bin/env node
// Prerenders the text version of the site to dist/text/index.html.
// Runs after `vite build --ssr src/accessible/entry-server.ts --outDir dist-ssr`
// (see the "build" script in package.json). The output is a static page with
// inline CSS and no JavaScript: it works for screen readers, without JS, and
// is indexable by search engines.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SSR_DIR = path.join(ROOT, "dist-ssr");
const OUT_DIR = path.join(ROOT, "dist", "text");
const SITE = "https://diego-morra.com";

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

const entry = fs
  .readdirSync(SSR_DIR)
  .find((f) => f.startsWith("entry-server") && f.endsWith(".js"));
if (!entry) {
  console.error("[prerender] dist-ssr/entry-server.js not found");
  process.exit(1);
}

const mod = await import(pathToFileURL(path.join(SSR_DIR, entry)).href);
const body = mod.render();

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeAttr(mod.ACCESSIBLE_TITLE)}</title>
    <meta name="description" content="${escapeAttr(mod.ACCESSIBLE_DESCRIPTION)}" />
    <meta name="author" content="Diego Morra" />
    <link rel="canonical" href="${SITE}/text/" />
    <link rel="icon" type="image/png" href="/icons/Access110_32x32_4.png" />
    <meta name="theme-color" content="#006b6b" />
    <meta property="og:type" content="profile" />
    <meta property="og:title" content="${escapeAttr(mod.ACCESSIBLE_TITLE)}" />
    <meta property="og:description" content="${escapeAttr(mod.ACCESSIBLE_DESCRIPTION)}" />
    <meta property="og:url" content="${SITE}/text/" />
    <meta property="og:image" content="${SITE}/DM_profilepic.png" />
    <style>${mod.accessibleCss}</style>
  </head>
  <body>
${body}
  </body>
</html>
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "index.html"), html);
fs.rmSync(SSR_DIR, { recursive: true, force: true });
console.log(
  `[prerender] wrote dist/text/index.html (${Math.round(html.length / 1024)} kB)`,
);
