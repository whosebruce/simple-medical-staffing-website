// Structural verifier for the GitHub Pages artifact in docs/ (run after
// `npm run build`; wired into `npm run verify`).
//
// Checks: required outputs; forbidden private/demo strings; the single
// permitted mailto; every local href/src resolves; sitemap membership equals
// the public route registry and every sitemap URL is a self-canonical,
// indexable page; legacy stubs are noindex + canonical + instant meta refresh
// to an existing canonical page (client-side fallback, not an HTTP 301);
// JSON-LD parses on every page with resolvable @id references and the
// verified NAP; unique titles and descriptions; per-page og:url; srcset
// candidates exist; share image and icon set exist with expected dimensions;
// no placeholder text; library masters match their provenance and no
// photograph is placed on two canonical routes (or on a route and the 404).
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { PUBLIC_ROUTES, SOCIAL_LINKS } from "./copy-requirements.mjs";

const root = process.cwd();
const docs = path.join(root, "docs");
const ORIGIN = "https://simplemedicalstaffing.com";

const CANONICAL_ROUTES = PUBLIC_ROUTES.map((r) => (r === "/" ? "/" : `${r}/`));

const LEGACY_STUBS = {
  "healthcare-staffing-about-us.html": "/about/",
  "healthcare-staffing-medical-staffing.html": "/solutions/",
  "healthcare-staffing-for-employers.html": "/solutions/",
  "healthcare-staffing-for-job-seekers.html": "/professionals/",
  "healthcare-staffing-contact-us.html": "/contact/",
};

const required = [
  ...CANONICAL_ROUTES.map((r) => (r === "/" ? "index.html" : `${r.slice(1)}index.html`)),
  ...Object.keys(LEGACY_STUBS),
  "robots.txt",
  "sitemap.xml",
  "CNAME",
  ".nojekyll",
  "favicon.ico",
  "kindred/icons/favicon-16.png",
  "kindred/icons/favicon-32.png",
  "kindred/icons/icon-192.png",
  "kindred/icons/icon-512.png",
  "kindred/icons/apple-touch-icon.png",
  "kindred/icons/logo-512.png",
  "kindred/share/og-default.png",
];

const failures = [];
const fail = (msg) => failures.push(msg);

for (const rel of required) {
  if (!fs.existsSync(path.join(docs, rel))) fail(`missing ${rel}`);
}

function pageFile(route) {
  return route === "/" ? path.join(docs, "index.html") : path.join(docs, route.slice(1), "index.html");
}
function read(file) {
  return fs.readFileSync(file, "utf8");
}
function decode(html) {
  return html
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
function attr(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}

const textFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(?:html|css|js|json|xml|txt)$/i.test(entry.name) || entry.name === "CNAME") textFiles.push(full);
  }
})(docs);

// 1. Forbidden private/demo strings and placeholders ---------------------------
const forbidden = [
  /Local demo prototype/i,
  /synthetic data only/i,
  /Staff sign-in \(demo\)/i,
  /pending client confirmation/i,
  /applyShort/i,
  /DATABASE_URL/i,
  /lorem ipsum/i,
  /\bTODO\b/,
  /\bTBD\b/,
  /\[placeholder\]/i,
  /preview\.simplemedicalstaffing\.com/i,
];
for (const file of textFiles) {
  const text = read(file);
  for (const pattern of forbidden) {
    if (pattern.test(text)) fail(`${path.relative(root, file)} contains ${pattern}`);
  }
}

// 1b. Photos that show a rendered copy of the brand mark (an ID badge or wall
// sign) are not used on any page (TASK-20260923-03 asset review).
const EXCLUDED_PHOTOS = [/candid-conversation/, /badge-welcome/, /clinic-reception/];
for (const file of textFiles.filter((f) => /\.(?:html|txt)$/.test(f))) {
  const text = read(file);
  for (const pattern of EXCLUDED_PHOTOS) {
    if (pattern.test(text)) fail(`${path.relative(root, file)} references excluded photo ${pattern}`);
  }
}

// 2. Email handlers: exactly one static mailto, only on /apply/ -----------------
const CONTACT_MAILTO = "mailto:info@simplemedicalstaffing.com";
const applyFiles = new Set(["apply/index.html", "apply/index.txt"].map((r) => path.join(docs, r)));
for (const file of textFiles) {
  const text = read(file);
  const mailtos = [...text.matchAll(/mailto:[^"'\\\s<>)]*/gi)].map((m) => m[0]);
  if (mailtos.length === 0) continue;
  const rel = path.relative(root, file);
  if (!applyFiles.has(file)) {
    fail(`${rel} contains mailto: outside /apply/ (${[...new Set(mailtos)].join(", ")})`);
    continue;
  }
  for (const m of new Set(mailtos)) if (m !== CONTACT_MAILTO) fail(`${rel} contains an unexpected mailto: ${m}`);
}
{
  const apply = read(path.join(docs, "apply/index.html"));
  const anchors = [...apply.matchAll(/<a\b[^>]*href="(mailto:[^"]*)"[^>]*>/gi)].map((m) => m[1]);
  if (anchors.length !== 1 || anchors[0] !== CONTACT_MAILTO) {
    fail(`docs/apply/index.html must carry exactly one <a href="${CONTACT_MAILTO}">; found ${JSON.stringify(anchors)}`);
  }
}

// 3. Every local href/src/srcset candidate resolves ------------------------------
const htmlFiles = textFiles.filter((f) => f.endsWith(".html"));
function resolves(value) {
  const clean = value.split(/[?#]/, 1)[0];
  if (clean === "/") return true;
  const candidate = path.join(docs, clean.replace(/^\//, ""));
  return [candidate, `${candidate}.html`, path.join(candidate, "index.html")].some((p) => fs.existsSync(p));
}
for (const file of htmlFiles) {
  const text = read(file);
  for (const match of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (!value.startsWith("/") || value.startsWith("//")) continue;
    if (!resolves(value)) fail(`${path.relative(root, file)} has unresolved local URL ${value}`);
  }
  for (const match of text.matchAll(/(?:srcSet|imageSrcSet|srcset)="([^"]+)"/g)) {
    for (const cand of match[1].split(",")) {
      const url = cand.trim().split(/\s+/)[0];
      if (url.startsWith("/") && !resolves(url)) fail(`${path.relative(root, file)} srcset candidate missing ${url}`);
    }
  }
}

// 3b. Outbound links (TASK-20260923-14): the only absolute links on any page
// are the two social profile icons, each opening a new tab without a
// referrer, and every canonical page carries both. A public profile match is
// not proof of ownership; the owner confirms the accounts before release.
{
  for (const file of htmlFiles) {
    const rel = path.relative(root, file);
    const anchors = [...read(file).matchAll(/<a\b[^>]*>/gi)].map((m) => m[0]);
    for (const a of anchors) {
      const href = attr(a, /\bhref="([^"]*)"/);
      if (!href || !/^https?:/i.test(href)) continue;
      if (!SOCIAL_LINKS.includes(href)) fail(`${rel} links to an unlisted outside URL ${href}`);
      else if (!/\btarget="_blank"/.test(a) || !/\brel="noopener noreferrer"/.test(a)) {
        fail(`${rel} social link ${href} lacks target="_blank" rel="noopener noreferrer"`);
      }
    }
  }
  for (const route of CANONICAL_ROUTES) {
    const file = pageFile(route);
    if (!fs.existsSync(file)) continue;
    const html = read(file);
    for (const url of SOCIAL_LINKS) {
      if (!html.includes(`href="${url}"`)) fail(`${path.relative(root, file)} lacks the social link ${url}`);
    }
  }
}

// 4. Sitemap membership and canonical pages --------------------------------------
{
  const sitemap = read(path.join(docs, "sitemap.xml"));
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expected = CANONICAL_ROUTES.map((r) => `${ORIGIN}${r}`);
  if (JSON.stringify(locs) !== JSON.stringify(expected)) {
    fail(`sitemap.xml membership/order mismatch.\n  expected: ${expected.join(", ")}\n  actual:   ${locs.join(", ")}`);
  }
  for (const loc of locs) {
    if (!loc.endsWith("/")) fail(`sitemap loc lacks trailing slash: ${loc}`);
    if (/changefreq|priority|lastmod/.test(sitemap)) fail("sitemap.xml carries changefreq/priority/lastmod hints; keep it to <loc> only");
  }
  const robots = read(path.join(docs, "robots.txt"));
  if (!/Sitemap: https:\/\/simplemedicalstaffing\.com\/sitemap\.xml/.test(robots)) fail("robots.txt does not declare the sitemap");
  if (!/Allow: \//.test(robots) || /Disallow: \/\S/.test(robots)) fail("robots.txt must allow the whole public site");
}

// 5. Per-page metadata, JSON-LD, uniqueness --------------------------------------
const titles = new Map();
const descriptions = new Map();
const NAP = {
  name: "Simple Medical Staffing",
  phone: "+1-949-317-2470",
  email: "info@simplemedicalstaffing.com",
  street: "3333 Michelson Drive, Suite 300",
};
for (const route of CANONICAL_ROUTES) {
  const file = pageFile(route);
  if (!fs.existsSync(file)) continue;
  const html = decode(read(file));
  const rel = path.relative(root, file);
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  if (canonical !== `${ORIGIN}${route}`) fail(`${rel} canonical is ${canonical}, expected ${ORIGIN}${route}`);
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) fail(`${rel} is in the sitemap but carries noindex`);
  const title = attr(html, /<title>([^<]+)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!title) fail(`${rel} has no <title>`);
  if (!description) fail(`${rel} has no meta description`);
  if (title && titles.has(title)) fail(`${rel} duplicates the title of ${titles.get(title)}`);
  if (description && descriptions.has(description)) fail(`${rel} duplicates the description of ${descriptions.get(description)}`);
  titles.set(title, rel);
  descriptions.set(description, rel);
  const ogUrl = attr(html, /<meta property="og:url" content="([^"]+)"/);
  if (ogUrl !== `${ORIGIN}${route}`) fail(`${rel} og:url is ${ogUrl}, expected ${ORIGIN}${route}`);
  const ogTitle = attr(html, /<meta property="og:title" content="([^"]+)"/);
  if (ogTitle !== title) fail(`${rel} og:title (${ogTitle}) differs from <title> (${title})`);
  if (!/<meta property="og:image" content="https:\/\/simplemedicalstaffing\.com\/kindred\/share\/og-default\.png"/.test(html)) fail(`${rel} lacks the share image`);
  if (!/<link rel="apple-touch-icon" href="\/kindred\/icons\/apple-touch-icon\.png"/.test(html)) fail(`${rel} lacks apple-touch-icon`);
  const h1s = [...html.matchAll(/<h1\b/g)].length;
  if (h1s !== 1) fail(`${rel} has ${h1s} <h1> elements`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (blocks.length !== 1) fail(`${rel} has ${blocks.length} JSON-LD blocks, expected 1`);
  for (const block of blocks) {
    let graph;
    try {
      graph = JSON.parse(block);
    } catch (e) {
      fail(`${rel} JSON-LD does not parse: ${e.message}`);
      continue;
    }
    const nodes = graph["@graph"] ?? [];
    const ids = new Set(nodes.map((n) => n["@id"]).filter(Boolean));
    const refs = [];
    (function collect(v) {
      if (Array.isArray(v)) return v.forEach(collect);
      if (v && typeof v === "object") {
        if (Object.keys(v).length === 1 && v["@id"]) refs.push(v["@id"]);
        for (const k of Object.keys(v)) if (k !== "@id") collect(v[k]);
      }
    })(nodes);
    for (const ref of refs) if (!ids.has(ref)) fail(`${rel} JSON-LD references unknown @id ${ref}`);
    const org = nodes.find((n) => n["@type"] === "EmploymentAgency");
    if (!org) fail(`${rel} JSON-LD lacks the EmploymentAgency node`);
    else {
      if (org.name !== NAP.name || org.telephone !== NAP.phone || org.email !== NAP.email || org.address?.streetAddress !== NAP.street || org.address?.addressLocality !== "Irvine" || org.address?.postalCode !== "92612") {
        fail(`${rel} JSON-LD NAP does not match the verified facts`);
      }
      for (const banned of ["aggregateRating", "review", "openingHours", "openingHoursSpecification", "areaServed", "priceRange", "award", "sameAs", "geo"]) {
        if (banned in org) fail(`${rel} JSON-LD asserts unverified property ${banned}`);
      }
    }
    for (const type of ["JobPosting", "FAQPage", "HowTo", "Review", "AggregateRating"]) {
      if (nodes.some((n) => n["@type"] === type)) fail(`${rel} JSON-LD uses disallowed type ${type}`);
    }
    const page = nodes.find((n) => n.url === `${ORIGIN}${route}` && /Page$/.test(n["@type"]));
    if (!page) fail(`${rel} JSON-LD lacks a WebPage node for ${route}`);
    else {
      if (page.name !== title) fail(`${rel} JSON-LD WebPage name (${page.name}) differs from <title>`);
      if (page.description !== description) fail(`${rel} JSON-LD WebPage description differs from meta description`);
    }
    const crumbs = nodes.find((n) => n["@type"] === "BreadcrumbList");
    if (route !== "/" && !crumbs) fail(`${rel} lacks BreadcrumbList`);
    if (crumbs) {
      const items = crumbs.itemListElement;
      if (items[0].name !== "Home" || items[0].item !== `${ORIGIN}/`) fail(`${rel} breadcrumb does not start at Home`);
      if ("item" in items[items.length - 1]) fail(`${rel} breadcrumb last item must omit item`);
      // Visible breadcrumb for nested pages must show the same labels in the same order.
      if (route.split("/").filter(Boolean).length > 1) {
        const nav = html.match(/<nav aria-label="Breadcrumb"[^>]*>([\s\S]*?)<\/nav>/);
        const visible = nav ? [...nav[1].matchAll(/<(?:a|span)[^>]*>([^<]+)<\/(?:a|span)>/g)].map((m) => m[1].trim()).filter((t) => t !== "/") : [];
        const expected = items.map((i) => i.name);
        if (JSON.stringify(visible) !== JSON.stringify(expected)) fail(`${rel} visible breadcrumb ${JSON.stringify(visible)} differs from BreadcrumbList ${JSON.stringify(expected)}`);
      }
    }
  }
}

// 6. Legacy stubs: noindex + canonical + instant refresh to an existing page ----
for (const [file, target] of Object.entries(LEGACY_STUBS)) {
  const full = path.join(docs, file);
  if (!fs.existsSync(full)) continue;
  const html = read(full);
  const rel = `docs/${file}`;
  if (!/<meta name="robots" content="noindex">/.test(html)) fail(`${rel} lacks noindex`);
  if (!html.includes(`<link rel="canonical" href="${ORIGIN}${target}">`)) fail(`${rel} canonical must point to ${target}`);
  if (!html.includes(`<meta http-equiv="refresh" content="0; url=${ORIGIN}${target}">`)) fail(`${rel} must carry an instant meta refresh to ${target}`);
  if (!html.includes(`href="${target}"`)) fail(`${rel} must carry a visible link to ${target}`);
  if (!CANONICAL_ROUTES.includes(target)) fail(`${rel} target ${target} is not a canonical route (possible loop)`);
  const targetHtml = read(pageFile(target));
  if (/http-equiv="refresh"/.test(targetHtml)) fail(`${rel} target ${target} itself redirects (loop)`);
  if (/mailto:|<form/i.test(html)) fail(`${rel} must not carry forms or mailto links`);
}

// 7. Share image and icon dimensions --------------------------------------------
function pngSize(file) {
  const b = fs.readFileSync(file);
  if (b.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}
const expectedPng = {
  "kindred/share/og-default.png": [1200, 630],
  "kindred/icons/apple-touch-icon.png": [180, 180],
  "kindred/icons/favicon-32.png": [32, 32],
  "kindred/icons/favicon-16.png": [16, 16],
  "kindred/icons/icon-192.png": [192, 192],
  "kindred/icons/icon-512.png": [512, 512],
  "kindred/icons/logo-512.png": [512, 512],
};
for (const [rel, [w, h]] of Object.entries(expectedPng)) {
  const full = path.join(docs, rel);
  if (!fs.existsSync(full)) continue;
  const size = pngSize(full);
  if (!size || size.width !== w || size.height !== h) fail(`${rel} is ${size?.width}x${size?.height}, expected ${w}x${h}`);
}
{
  const ico = path.join(docs, "favicon.ico");
  if (fs.existsSync(ico)) {
    const b = fs.readFileSync(ico);
    if (b.readUInt16LE(2) !== 1 || b.readUInt16LE(4) < 3) fail("favicon.ico is not an ICO with at least 3 members");
  }
}

// 8. Responsive hero images -------------------------------------------------------
// The home hero is the campaign image home-hero-handoff (TASK-20260923-03 moved
// it off candid-conversation, whose ID badge shows a rendered brand mark).
for (const [route, hero] of [["/", "home-hero-handoff"], ["/professionals/", "nurse-portrait"]]) {
  const html = read(pageFile(route));
  const img = html.match(new RegExp(`<img[^>]*${hero}[^>]*>`));
  if (!img) fail(`${route} hero image ${hero} not found`);
  else {
    if (!/srcSet="[^"]*-640\.webp 640w/.test(img[0])) fail(`${route} hero lacks 640w srcset candidate`);
    if (!/sizes="/.test(img[0])) fail(`${route} hero lacks sizes`);
    if (!/fetchPriority="high"/.test(img[0])) fail(`${route} hero lacks fetchpriority=high`);
  }
  if (!/<link rel="preload" as="image" imageSrcSet=/.test(html)) fail(`${route} lacks responsive hero preload`);
}

// 9. Library provenance and photo variety (TASK-20260924-03) ---------------------
// Every smws-nNN master is the recorded conversion of an original Mira marked
// `accepted_preview_candidate` in TASK-20260924-02 (never a conditional or
// rejected ID), byte-for-byte, and every one a page renders is recorded. No
// photograph is placed on two canonical routes.
{
  const MIRA_ACCEPTED_IDS = new Set([
    "N01", "N02", "N03", "N04", "N06", "N07", "N09", "N10", "N11", "N13",
    "N16", "N17", "N19", "N23", "N24", "N27", "N28", "N32", "N37", "N38",
  ]);
  const provenance = JSON.parse(read(path.join(root, "scripts", "library-provenance.json")));
  const recorded = new Set();
  for (const m of provenance.masters) {
    if (!MIRA_ACCEPTED_IDS.has(m.id) || m.mira_verdict !== "accepted_preview_candidate") fail(`${m.master} comes from ${m.id}, not a Mira-accepted ID`);
    const file = path.join(root, "public", m.master);
    if (!fs.existsSync(file)) {
      fail(`missing library master ${m.master}`);
      continue;
    }
    const digest = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
    if (digest !== m.master_sha256) fail(`${m.master} is not the recorded conversion (sha256 ${digest})`);
    recorded.add(m.master);
  }
  const onDisk = fs.readdirSync(path.join(root, "public", "kindred", "library")).filter((f) => /^smws-n\d\d-.*[a-z]\.webp$/.test(f));
  for (const f of onDisk) if (!recorded.has(`/kindred/library/${f}`)) fail(`public/kindred/library/${f} has no provenance record`);

  const master = (url) => url.replace(/-(?:640|960|1280)\.webp$/, ".webp");
  const seenOn = new Map();
  // The 404 page is served for every unknown URL, so it is held to the same rule.
  const placements = [...CANONICAL_ROUTES.map((route) => [route, pageFile(route)]), ["404", path.join(docs, "404.html")]];
  for (const [route, file] of placements) {
    // Rendered <img> tags only: the RSC payload of every page also carries the
    // 404 boundary's markup, which is not placed on that route.
    const imgs = [...read(file).matchAll(/<img\b[^>]*>/g)].map((m) => m[0]).join("\n");
    const photos = new Set([...imgs.matchAll(/\/kindred\/(?:campaign|photos|library)\/[a-z0-9-]+\.(?:webp|png)/g)].map((m) => master(m[0])));
    for (const photo of photos) {
      if (/\/library\/smws-n\d\d-/.test(photo) && !recorded.has(photo)) fail(`${route} renders unrecorded library photo ${photo}`);
      if (seenOn.has(photo)) fail(`${photo} is placed on both ${seenOn.get(photo)} and ${route}`);
      else seenOn.set(photo, route);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `Verified ${required.length} required outputs, ${CANONICAL_ROUTES.length} canonical pages, ${Object.keys(LEGACY_STUBS).length} legacy stubs, ${htmlFiles.length} HTML files, and ${textFiles.length} text assets.`,
);
