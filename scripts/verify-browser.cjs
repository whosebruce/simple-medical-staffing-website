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
//
// Output safety: page errors, console errors and failed responses are recorded
// through scripts/lib/browser-issues.cjs as bounded categories, counts and
// sanitized same-origin paths. No error message, stack, console body, query
// string or fragment is written to results.json or stdout. Failure counts and
// the failing exit status are preserved. The browser is always closed and a
// results file is always written, even when the harness itself throws.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const fs = require("fs");
const path = require("path");
const { IssueSink, sanitizeUnresolved, sanitizeList, sanitizePath } = require("./lib/browser-issues.cjs");

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
const ORIGIN = "https://simplemedicalstaffing.com";

async function main() {
  const base = process.env.SITE_URL || "http://127.0.0.1:3186";
  const out = process.env.EVIDENCE_DIR || "evidence/browser";
  fs.mkdirSync(out, { recursive: true });
  const results = [];
  const harness = new IssueSink(base);
  let browser;

  function writeResults(note) {
    const summary = {
      base,
      total: results.length,
      passed: results.filter((x) => x.passed).length,
      failed: results.filter((x) => !x.passed).map((x) => ({ route: x.route, width: x.width, status: x.status, issues: x.issues, unresolved: x.unresolved })),
      harnessIssues: harness.toJSON(),
      note,
    };
    fs.writeFileSync(path.join(out, "results.json"), JSON.stringify(results, null, 2));
    fs.writeFileSync(path.join(out, "summary.json"), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary, null, 2));
    return summary;
  }

  try {
    browser = await chromium.launch({ headless: true });
    const linkStatus = new Map();

    async function status(url) {
      if (linkStatus.has(url)) return linkStatus.get(url);
      const ctx = await browser.newContext();
      let s = 0;
      try {
        const p = await ctx.newPage();
        const r = await p.goto(url, { waitUntil: "domcontentloaded" });
        s = r ? r.status() : 0;
      } catch {
        s = 0;
      } finally {
        await ctx.close();
      }
      linkStatus.set(url, s);
      return s;
    }

    for (const width of WIDTHS) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      for (const route of ROUTES) {
        const sink = new IssueSink(base);
        // Listeners keep no text: category (+ bounded status and same-origin path) only.
        const onErr = () => sink.add("page-error");
        const onConsole = (m) => { if (m.type() === "error") sink.add("console-error"); };
        const onResp = (r) => { if (r.status() >= 400) sink.add("http-error", { status: r.status(), url: r.url() }); };
        page.on("pageerror", onErr); page.on("console", onConsole); page.on("response", onResp);
        let record;
        try {
          const response = await page.goto(base + route, { waitUntil: "networkidle" });
          await page.evaluate(async () => {
            await document.fonts.ready;
            for (const image of document.images) image.loading = "eager";
            await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
          });
          const data = await page.evaluate(() => ({
            title: document.title,
            overflow: document.documentElement.scrollWidth > innerWidth,
            brokenImages: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute("src") || ""),
            heroCurrentSrc: document.querySelector("main img")?.currentSrc ?? null,
            forms: document.querySelectorAll("form,input[type=file]").length,
            mailtos: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute("href")),
            privateLinks: [...document.querySelectorAll("a")].map((a) => a.getAttribute("href")).filter((h) => /^\/(admin|worker|invite|api)(\/|$)/.test(h || "")).length,
            canonical: document.querySelector("link[rel=canonical]")?.getAttribute("href"),
            h1Count: document.querySelectorAll("h1").length,
            internalLinks: [...new Set([...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((h) => h.startsWith("/") && !h.startsWith("//")))],
            breadcrumb: document.querySelector('nav[aria-label="Breadcrumb"]')?.innerText.replace(/\s+/g, " ").trim() ?? null,
            emDashes: (document.body.innerText.match(/—/g) || []).length,
            headerLogoLoading: document.querySelector("header img")?.getAttribute("loading"),
          }));
          if (width < 1024) {
            const toggle = page.getByRole("button", { name: "Open Navigation" });
            await toggle.click();
            if ((await page.getByRole("button", { name: "Close Navigation" }).getAttribute("aria-expanded")) !== "true") sink.add("menu-open-failed");
            const menuLinks = await page.locator("#site-menu a").count();
            if (menuLinks < 6) sink.add("menu-links-missing");
            await page.getByRole("button", { name: "Close Navigation" }).click();
            if ((await page.getByRole("button", { name: "Open Navigation" }).getAttribute("aria-expanded")) !== "false") sink.add("menu-close-failed");
          }
          await page.keyboard.press("Tab");
          const focus = await page.evaluate(() => {
            const r = document.activeElement.getBoundingClientRect();
            return { tag: document.activeElement.tagName, visible: r.width > 0 && r.height > 0 && r.left >= 0 && r.right <= innerWidth };
          });
          if (!focus.visible) sink.add("focus-outside-viewport");
          const unresolvedRaw = [];
          for (const href of data.internalLinks) {
            const s = await status(base + href.split("#")[0]);
            if (s !== 200 && s !== 301) unresolvedRaw.push({ href, status: s });
          }
          const name = route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replace(/\//g, "-");
          await page.screenshot({ path: path.join(out, `${name}-${width}.png`), fullPage: width !== 320 || route === "/" });
          const unresolved = sanitizeUnresolved(unresolvedRaw, base);
          const mailtoOk = JSON.stringify(data.mailtos) === JSON.stringify(route === "/apply/" ? ["mailto:info@simplemedicalstaffing.com"] : []);
          const passed =
            response.status() === 200 && !data.overflow && !data.brokenImages.length && !data.forms && !data.privateLinks &&
            mailtoOk && data.canonical === ORIGIN + route && data.h1Count === 1 && data.emDashes === 0 &&
            !unresolved.length && sink.total === 0;
          record = {
            route, width, status: response.status(), title: data.title, overflow: data.overflow,
            brokenImages: sanitizeList(data.brokenImages, base), heroCurrentSrc: data.heroCurrentSrc ? sanitizePath(data.heroCurrentSrc, base) : null,
            forms: data.forms, mailtoOk, mailtoCount: data.mailtos.length, privateLinks: data.privateLinks, canonical: data.canonical,
            h1Count: data.h1Count, internalLinkCount: data.internalLinks.length, breadcrumb: data.breadcrumb, emDashes: data.emDashes,
            headerLogoLoading: data.headerLogoLoading, focus, unresolved, issues: sink.toJSON(), passed,
          };
        } catch {
          sink.add("harness-error");
          record = { route, width, status: 0, issues: sink.toJSON(), unresolved: [], passed: false };
        } finally {
          page.off("pageerror", onErr); page.off("console", onConsole); page.off("response", onResp);
        }
        results.push(record);
      }
      await page.close();
    }

    // Legacy stubs: the browser must land on the target (client-side redirect), once.
    for (const [legacy, target] of Object.entries(LEGACY)) {
      const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
      const sink = new IssueSink(base);
      let record;
      try {
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
        const stubNoindex = /<meta name="robots" content="noindex">/.test(stubHtml);
        const passed = stubStatus === 200 && stubNoindex && landed === target && canonical === ORIGIN + target && !targetRefresh;
        record = { route: legacy, width: 390, status: stubStatus, legacyTarget: target, landed, canonical, targetHasRefresh: targetRefresh, stubNoindex, issues: sink.toJSON(), unresolved: [], passed };
      } catch {
        sink.add("harness-error");
        record = { route: legacy, width: 390, status: 0, legacyTarget: target, issues: sink.toJSON(), unresolved: [], passed: false };
      } finally {
        await page.close();
      }
      results.push(record);
    }
  } catch {
    harness.add("harness-error");
  } finally {
    if (browser) await browser.close().catch(() => {});
  }

  const summary = writeResults(harness.total ? "harness error: run incomplete" : undefined);
  const expected = ROUTES.length * WIDTHS.length + Object.keys(LEGACY).length;
  if (summary.failed.length || harness.total || results.length !== expected) process.exitCode = 1;
}

main().catch(() => {
  // Last-resort: never leak the error text; fail the run.
  console.error("verify-browser: fatal harness error (details withheld by design)");
  process.exitCode = 1;
});
