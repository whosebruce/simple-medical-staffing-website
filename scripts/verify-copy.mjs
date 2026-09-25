// Evaluates scripts/copy-requirements.mjs against the generated GitHub Pages
// artifact in docs/. Run after `npm run build`; wired into `npm run verify`.
//
// The check reads the rendered HTML (and the RSC payload embedded in it), not
// the source, so it only passes when the copy actually reached the artifact.
// HTML entities are decoded before matching (React emits `'` as `&#x27;`).
import fs from "node:fs";
import path from "node:path";
import {
  APPLICATION_CONTACT,
  CANONICAL_ACTION_LABELS,
  HELD_LEGAL_ROUTES,
  PAGE_DESCRIPTIONS,
  PUBLIC_ROUTES,
  REQUIREMENTS,
  RETIRED_LABEL_VARIANTS,
  ROUTE_LABELS,
  SITEWIDE_ABSENT,
  SITEWIDE_PRESENT,
} from "./copy-requirements.mjs";

const root = process.cwd();
const docs = path.join(root, "docs");

function decode(html) {
  return html
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function pageFile(route) {
  return route === "/"
    ? path.join(docs, "index.html")
    : path.join(docs, route.replace(/^\//, ""), "index.html");
}

const results = [];
let failures = 0;

for (const req of REQUIREMENTS) {
  const file = pageFile(req.route);
  const text = fs.existsSync(file) ? decode(fs.readFileSync(file, "utf8")) : "";
  const missing = req.present.filter((s) => !text.includes(s));
  const lingering = req.absent.filter((s) => text.includes(s));
  const pass = fs.existsSync(file) && missing.length === 0 && lingering.length === 0;
  if (!pass) failures += 1;
  results.push({
    id: req.id,
    title: req.title,
    route: req.route,
    file: path.relative(root, file),
    pass,
    missing,
    lingering,
  });
}

// Sitewide required strings: every public route.
for (const rule of SITEWIDE_PRESENT) {
  for (const route of PUBLIC_ROUTES) {
    const text = decode(fs.readFileSync(pageFile(route), "utf8"));
    const missing = rule.present.filter((str) => !text.includes(str));
    const pass = missing.length === 0;
    if (!pass) failures += 1;
    results.push({ id: rule.id, title: rule.title, route, pass, missing });
  }
}

// Sitewide terminology: every rendered text asset in the artifact.
const textFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(?:html|txt|xml)$/i.test(entry.name)) textFiles.push(full);
  }
})(docs);
for (const rule of SITEWIDE_ABSENT) {
  const hits = textFiles
    .filter((f) => rule.pattern.test(decode(fs.readFileSync(f, "utf8"))))
    .map((f) => path.relative(root, f));
  const pass = hits.length === 0;
  if (!pass) failures += 1;
  results.push({ id: rule.id, title: rule.title, route: "*", pass, hits });
}

// Application destination: every public route's "Apply now" action resolves
// to /apply/, and /apply/ carries exactly one static mailto: contact link to
// the real address (no query/body data), the only mailto on the site
// (scripts/verify-site.mjs enforces the sitewide half).
for (const route of PUBLIC_ROUTES) {
  const text = decode(fs.readFileSync(pageFile(route), "utf8"));
  const applyLinks = [...text.matchAll(/<a[^>]+href="([^"]*)"[^>]*>\s*Apply Now\s*<\/a>/g)];
  const wrong = applyLinks.map((m) => m[1]).filter((href) => href !== "/apply/");
  const pass = wrong.length === 0;
  if (!pass) failures += 1;
  results.push({
    id: "R13-link",
    title: "Apply Now actions resolve to /apply/",
    route,
    pass,
    applyLinks: applyLinks.length,
    wrong,
  });
}
{
  const apply = decode(fs.readFileSync(pageFile("/apply"), "utf8"));
  const anchors = [...apply.matchAll(/<a\b[^>]*href="(mailto:[^"]*)"[^>]*>/gi)].map((m) => m[1]);
  const pass = anchors.length === 1 && anchors[0] === `mailto:${APPLICATION_CONTACT}`;
  if (!pass) failures += 1;
  results.push({
    id: "R13-address",
    title: `/apply carries exactly one static <a href="mailto:${APPLICATION_CONTACT}"> (no query/body data)`,
    route: "/apply",
    pass,
    anchors,
  });
  for (const route of PUBLIC_ROUTES.filter((r) => r !== "/apply")) {
    const text = decode(fs.readFileSync(pageFile(route), "utf8"));
    const ok = !/mailto:/i.test(text);
    if (!ok) failures += 1;
    results.push({ id: "R13-no-other-mailto", title: "no mailto: outside /apply", route, pass: ok });
  }
}

// Editorial contract (2026-09-18): no em dash in any generated text asset,
// canonical Title Case action labels per route, no retired variant anywhere
// (visible text, aria-label, RSC payload), no period-ending button, and the
// staged unique meta descriptions.
{
  const dashHits = textFiles
    .filter((f) => /—/.test(fs.readFileSync(f, "utf8")))
    .map((f) => path.relative(root, f));
  const pass = dashHits.length === 0;
  if (!pass) failures += 1;
  results.push({ id: "E01", title: "no em dash in any generated text asset", route: "*", pass, hits: dashHits });
}
for (const route of PUBLIC_ROUTES) {
  const html = decode(fs.readFileSync(pageFile(route), "utf8"));
  const variantHits = RETIRED_LABEL_VARIANTS.filter((v) => v.test(html)).map(String);
  const anchors = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
  const missing = ROUTE_LABELS[route].filter((l) => !anchors.some((a) => a === l || a === `${l} →`));
  const periodButtons = anchors.filter((a) => /\.$/.test(a) && a.split(" ").length <= 5);
  const lower = new Set(CANONICAL_ACTION_LABELS.map((l) => l.toLowerCase()));
  const misspelt = anchors.map((a) => a.replace(/\s*→$/, "")).filter((a) => lower.has(a.toLowerCase()) && !CANONICAL_ACTION_LABELS.includes(a));
  const pass = variantHits.length === 0 && missing.length === 0 && periodButtons.length === 0 && misspelt.length === 0;
  if (!pass) failures += 1;
  results.push({ id: "E02", title: "canonical Title Case action labels, no retired variants, no period-ending buttons", route, pass, variantHits, missing, periodButtons, misspelt });
  if (PAGE_DESCRIPTIONS[route]) {
    const m = html.match(/<meta name="description" content="([^"]*)"/);
    const ok = !!m && m[1].includes(PAGE_DESCRIPTIONS[route]);
    if (!ok) failures += 1;
    results.push({ id: "E03", title: "page-specific meta description", route, pass: ok, description: m?.[1] ?? null });
  }
}
{
  // No two pages share a description.
  const descs = PUBLIC_ROUTES.map((r) => [r, decode(fs.readFileSync(pageFile(r), "utf8")).match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ""]);
  const dupes = descs.filter(([, d], i) => descs.findIndex(([, e]) => e === d) !== i).map(([r]) => r);
  const pass = dupes.length === 0;
  if (!pass) failures += 1;
  results.push({ id: "E04", title: "meta descriptions are unique per page", route: "*", pass, duplicates: dupes });
}

// BM-20260925-33: the legal review drafts are held for owner approval, so no
// page is generated at their routes (SITEWIDE_ABSENT L02 covers links and
// draft wording in every text asset).
for (const route of HELD_LEGAL_ROUTES) {
  const pass = !fs.existsSync(path.join(docs, route.replace(/^\//, "")));
  if (!pass) failures += 1;
  results.push({ id: "L03", title: "held legal review draft is not in the artifact", route, pass });
}

const out = { generatedAt: new Date().toISOString(), failures, results };
const outFile = process.env.COPY_MATRIX_OUT;
if (outFile) fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + "\n");

for (const r of results) {
  const detail = [
    r.missing?.length ? `missing: ${JSON.stringify(r.missing)}` : "",
    r.lingering?.length ? `lingering: ${JSON.stringify(r.lingering)}` : "",
    r.hits?.length ? `hits: ${JSON.stringify(r.hits)}` : "",
    r.wrong?.length ? `wrong: ${JSON.stringify(r.wrong)}` : "",
    r.variantHits?.length ? `variants: ${JSON.stringify(r.variantHits)}` : "",
    r.periodButtons?.length ? `period-buttons: ${JSON.stringify(r.periodButtons)}` : "",
    r.misspelt?.length ? `misspelt: ${JSON.stringify(r.misspelt)}` : "",
    r.duplicates?.length ? `duplicates: ${JSON.stringify(r.duplicates)}` : "",
  ]
    .filter(Boolean)
    .join(" ");
  console.log(`${r.pass ? "PASS" : "FAIL"} ${r.id} ${r.route} ${r.title}${detail ? " — " + detail : ""}`);
}

if (failures) {
  console.error(`${failures} copy requirement(s) failed`);
  process.exit(1);
}
console.log(`Copy requirement matrix: ${results.length} checks passed`);
