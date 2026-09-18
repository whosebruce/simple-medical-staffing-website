// Browser proof for every canonical route and legacy stub at 1440 / 768 / 390
// and a narrow 320 pass. Requires a running server (scripts/serve-pages.mjs)
// and Playwright (PLAYWRIGHT_MODULE may point at an installed copy).
//
//   SITE_URL=http://127.0.0.1:3186 EVIDENCE_DIR=<dir> node scripts/verify-browser.cjs
//
// Per route/width: HTTP 200, no page/console errors, no failed requests, no
// horizontal overflow, no broken images, no forms/uploads, only the permitted
// mailto on /apply/, canonical, one H1, keyboard focus visible, mobile menu
// opens/closes, every internal link resolves to 200 on this server, and
// screenshots. Legacy stubs: served 200, noindex, canonical + refresh target
// reachable and not itself a redirect; the browser follows the refresh to the
// target (non-looping).
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const fs = require("fs");
const path = require("path");

const ROUTES = [
  "/",
  "/solutions/",
  "/solutions/contract-staffing/",
  "/solutions/per-diem-staffing/",
  "/solutions/direct-placement/",
  "/solutions/staffing-request-checklist/",
  "/professionals/",
  "/professionals/faq/",
  "/about/",
  "/contact/",
  "/apply/",
  "/privacy/",
];
const LEGACY = {
  "/healthcare-staffing-about-us": "/about/",
  "/healthcare-staffing-medical-staffing": "/solutions/",
  "/healthcare-staffing-for-employers": "/solutions/",
  "/healthcare-staffing-for-job-seekers": "/professionals/",
  "/healthcare-staffing-contact-us": "/contact/",
};
const WIDTHS = [1440, 768, 390, 320];

(async () => {
  const base = process.env.SITE_URL || "http://127.0.0.1:3186";
  const out = process.env.EVIDENCE_DIR || "evidence/browser";
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const linkStatus = new Map();

  async function status(url) {
    if (linkStatus.has(url)) return linkStatus.get(url);
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    const r = await p.goto(url, { waitUntil: "domcontentloaded" });
    const s = r ? r.status() : 0;
    await ctx.close();
    linkStatus.set(url, s);
    return s;
  }

  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const route of ROUTES) {
      const issues = [];
      const onErr = (e) => issues.push("page:" + e.message);
      const onConsole = (m) => { if (m.type() === "error") issues.push("console:" + m.text()); };
      const onResp = (r) => { if (r.status() >= 400) issues.push("http:" + r.status() + ":" + r.url()); };
      page.on("pageerror", onErr); page.on("console", onConsole); page.on("response", onResp);
      const response = await page.goto(base + route, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const image of document.images) image.loading = "eager";
        await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
      });
      const data = await page.evaluate(() => ({
        title: document.title,
        overflow: document.documentElement.scrollWidth > innerWidth,
        brokenImages: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
        heroCurrentSrc: document.querySelector("main img")?.currentSrc ?? null,
        forms: document.querySelectorAll("form,input[type=file]").length,
        mailtos: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute("href")),
        privateLinks: [...document.querySelectorAll("a")].map((a) => a.getAttribute("href")).filter((h) => /^\/(admin|worker|invite|api)(\/|$)/.test(h || "")),
        canonical: document.querySelector("link[rel=canonical]")?.getAttribute("href"),
        h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
        internalLinks: [...new Set([...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((h) => h.startsWith("/") && !h.startsWith("//")))],
        breadcrumb: document.querySelector('nav[aria-label="Breadcrumb"]')?.innerText.replace(/\s+/g, " ").trim() ?? null,
        emDashes: (document.body.innerText.match(/—/g) || []).length,
        headerLogoLoading: document.querySelector("header img")?.getAttribute("loading"),
      }));
      if (width < 1024) {
        const toggle = page.getByRole("button", { name: "Open Navigation" });
        await toggle.click();
        if ((await page.getByRole("button", { name: "Close Navigation" }).getAttribute("aria-expanded")) !== "true") issues.push("menu failed to open");
        const menuLinks = await page.locator("#site-menu a").count();
        if (menuLinks < 6) issues.push("mobile menu links missing");
        await page.getByRole("button", { name: "Close Navigation" }).click();
        if ((await page.getByRole("button", { name: "Open Navigation" }).getAttribute("aria-expanded")) !== "false") issues.push("menu failed to close");
      }
      await page.keyboard.press("Tab");
      const focus = await page.evaluate(() => {
        const r = document.activeElement.getBoundingClientRect();
        return { tag: document.activeElement.tagName, visible: r.width > 0 && r.height > 0 && r.left >= 0 && r.right <= innerWidth };
      });
      if (!focus.visible) issues.push("keyboard focus outside viewport");
      const unresolved = [];
      for (const href of data.internalLinks) {
        const s = await status(base + href.split("#")[0]);
        if (s !== 200 && s !== 301) unresolved.push(`${href}:${s}`);
      }
      const name = route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replace(/\//g, "-");
      await page.screenshot({ path: path.join(out, `${name}-${width}.png`), fullPage: width !== 320 || route === "/" });
      page.off("pageerror", onErr); page.off("console", onConsole); page.off("response", onResp);
      const passed =
        response.status() === 200 && !data.overflow && !data.brokenImages.length && !data.forms && !data.privateLinks.length &&
        JSON.stringify(data.mailtos) === JSON.stringify(route === "/apply/" ? ["mailto:info@simplemedicalstaffing.com"] : []) &&
        data.canonical === "https://simplemedicalstaffing.com" + route && data.h1.length === 1 && data.emDashes === 0 &&
        !unresolved.length && !issues.length;
      results.push({ route, width, status: response.status(), ...data, focus, unresolved, issues, passed });
    }
    await page.close();
  }

  // Legacy stubs: the browser must land on the target (client-side redirect), once.
  for (const [legacy, target] of Object.entries(LEGACY)) {
    const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
    // Inspect the stub body without navigating (the instant refresh would
    // otherwise replace the document before it can be read), then navigate
    // and confirm the browser lands on the target exactly once.
    const raw = await page.request.get(base + legacy);
    const stubStatus = raw.status();
    const stubHtml = await raw.text();
    await page.goto(base + legacy, { waitUntil: "commit" });
    await page.waitForURL((u) => u.pathname === target, { timeout: 10000 }).catch(() => {});
    await page.waitForLoadState("networkidle");
    const landed = new URL(page.url()).pathname;
    const canonical = await page.evaluate(() => document.querySelector("link[rel=canonical]")?.getAttribute("href"));
    const targetRefresh = await page.evaluate(() => !!document.querySelector('meta[http-equiv="refresh"]'));
    const passed = stubStatus === 200 && /noindex/.test(stubHtml) && landed === target && canonical === "https://simplemedicalstaffing.com" + target && !targetRefresh;
    results.push({ route: legacy, width: 390, status: stubStatus, legacyTarget: target, landed, canonical, targetHasRefresh: targetRefresh, stubNoindex: /noindex/.test(stubHtml), passed });
    await page.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(out, "results.json"), JSON.stringify(results, null, 2));
  const summary = { base, total: results.length, passed: results.filter((x) => x.passed).length, failed: results.filter((x) => !x.passed) };
  console.log(JSON.stringify(summary, null, 2));
  if (summary.failed.length) process.exitCode = 1;
})();
