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
  PUBLIC_ROUTES,
  REQUIREMENTS,
  SITEWIDE_ABSENT,
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
// to /apply/, and /apply/ names the real contact address without a mailto:
// handler (the public brochure links nothing; see scripts/verify-site.mjs).
for (const route of PUBLIC_ROUTES) {
  const text = decode(fs.readFileSync(pageFile(route), "utf8"));
  const applyLinks = [...text.matchAll(/<a[^>]+href="([^"]*)"[^>]*>\s*Apply now\s*<\/a>/gi)];
  const wrong = applyLinks.map((m) => m[1]).filter((href) => href !== "/apply/");
  const pass = wrong.length === 0;
  if (!pass) failures += 1;
  results.push({
    id: "R13-link",
    title: "Apply now actions resolve to /apply/",
    route,
    pass,
    applyLinks: applyLinks.length,
    wrong,
  });
}
{
  const apply = decode(fs.readFileSync(pageFile("/apply"), "utf8"));
  const pass = apply.includes(APPLICATION_CONTACT) && !/mailto:/i.test(apply);
  if (!pass) failures += 1;
  results.push({
    id: "R13-address",
    title: `/apply names ${APPLICATION_CONTACT} and carries no mailto handler`,
    route: "/apply",
    pass,
  });
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
