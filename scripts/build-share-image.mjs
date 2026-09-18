// Renders the 1200x630 Open Graph / social share card from the approved brand
// mark, colours and fonts (TASK-20260917-07). Output:
//   public/kindred/share/og-default.png
// Uses a headless Chromium through Playwright (no image generation service).
// The fonts are the same Montserrat / Nunito Sans files the site ships in
// docs/_next/static/media (content-hashed by next/font). Run manually after a
// brand change: PLAYWRIGHT_MODULE=<path to playwright> node scripts/build-share-image.mjs
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

const root = process.cwd();
const outDir = path.join(root, "public", "kindred", "share");
fs.mkdirSync(outDir, { recursive: true });

const mark = fs.readFileSync(path.join(root, "public/kindred/logos/kindred-mark.svg"), "utf8");
const fontDir = path.join(root, "docs/_next/static/media");
// Fonts are inlined as data URLs: a page created with setContent() has no
// file origin, so file:// font loads are refused by the browser.
const font = (hash) => {
  const file = path.join(fontDir, hash);
  return fs.existsSync(file) ? `url(data:font/woff2;base64,${fs.readFileSync(file).toString("base64")}) format("woff2")` : null;
};
const montserrat = font("904be59b21bd51cb-s.p.woff2");
const nunito = font("68180864d7f93f02-s.p.woff2");
if (!montserrat || !nunito) throw new Error("Site font files not found under docs/_next/static/media; run npm run build first.");

// Copy is limited to verified brand facts: name, approved tagline, service list.
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Montserrat;font-weight:600 800;src:${montserrat}}
@font-face{font-family:"Nunito Sans";font-weight:200 1000;src:${nunito}}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
.card{position:relative;width:1200px;height:630px;background:#1e3a6e;color:#fff;font-family:"Nunito Sans",sans-serif;overflow:hidden}
.c1{position:absolute;right:-140px;top:-160px;width:520px;height:520px;border-radius:50%;background:linear-gradient(135deg,#3FA5E8,#8C5FD4);opacity:.32}
.c2{position:absolute;right:300px;top:40px;width:190px;height:190px;border-radius:50%;background:linear-gradient(135deg,#35B39B,#3FA5E8);opacity:.22}
.c3{position:absolute;left:-120px;bottom:-200px;width:420px;height:420px;border-radius:50%;background:linear-gradient(135deg,#3FA5E8,#8C5FD4);opacity:.18}
.inner{position:relative;display:flex;flex-direction:column;justify-content:center;height:100%;padding:0 96px;box-sizing:border-box}
.row{display:flex;align-items:center;gap:34px}
.markbox{width:128px;height:128px;border-radius:26px;background:#fff;display:flex;align-items:center;justify-content:center;flex:none}
.markbox svg{width:96px;height:96px}
.name{font-family:Montserrat,sans-serif;font-weight:800;font-size:64px;line-height:1.08;letter-spacing:-0.02em}
.tag{margin-top:34px;font-family:Montserrat,sans-serif;font-weight:700;font-size:34px;line-height:1.25;color:#c9dcf2;max-width:900px}
.services{margin-top:30px;font-size:26px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#8fbfea}
.rule{position:absolute;left:0;bottom:0;height:14px;width:100%;background:linear-gradient(90deg,#3FA5E8,#8C5FD4 55%,#35B39B)}
</style></head><body><div class="card"><div class="c1"></div><div class="c2"></div><div class="c3"></div>
<div class="inner">
  <div class="row"><div class="markbox">${mark.replace(/<\?xml[^>]*>/, "")}</div><div class="name">Simple Medical<br>Staffing</div></div>
  <div class="tag">Bringing You Success Through People.</div>
  <div class="services">Contract &nbsp;&middot;&nbsp; Per-diem &nbsp;&middot;&nbsp; Direct placement</div>
</div><div class="rule"></div></div></body></html>`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(async () => { await document.fonts.ready; });
const loaded = await page.evaluate(() => [...document.fonts].map((f) => `${f.family}:${f.status}`));
const out = path.join(outDir, "og-default.png");
await page.screenshot({ path: out, type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log(`Wrote ${path.relative(root, out)} (${fs.statSync(out).size} bytes); fonts: ${loaded.join(", ")}`);
