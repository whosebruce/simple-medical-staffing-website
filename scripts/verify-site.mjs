import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const docs = path.join(root, "docs");
const required = [
  "index.html",
  "solutions/index.html",
  "professionals/index.html",
  "about/index.html",
  "contact/index.html",
  "apply/index.html",
  "privacy/index.html",
  "robots.txt",
  "sitemap.xml",
  "CNAME",
  ".nojekyll",
];

const failures = [];
for (const rel of required) {
  if (!fs.existsSync(path.join(docs, rel))) failures.push(`missing ${rel}`);
}

const textFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(?:html|css|js|json|xml|txt)$/i.test(entry.name) || entry.name === "CNAME") textFiles.push(full);
  }
}
if (fs.existsSync(docs)) walk(docs);

const forbidden = [
  /Local demo prototype/i,
  /synthetic data only/i,
  /Staff sign-in \(demo\)/i,
  /pending client confirmation/i,
  /applyShort/i,
  /DATABASE_URL/i,
];
for (const file of textFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const pattern of forbidden) {
    if (pattern.test(text)) failures.push(`${path.relative(root, file)} contains ${pattern}`);
  }
}

// Email handlers (RESTORATION.md): the only permitted `mailto:` is the
// owner-authorized application-contact link on /apply/ — exactly one static
// anchor to info@simplemedicalstaffing.com with no subject/body/query data.
// The RSC payload of that page (apply/index.txt, and the copy embedded in
// apply/index.html) legitimately carries the same href; nowhere else may.
const CONTACT_MAILTO = "mailto:info@simplemedicalstaffing.com";
const applyFiles = new Set(["apply/index.html", "apply/index.txt"].map((r) => path.join(docs, r)));
for (const file of textFiles) {
  const text = fs.readFileSync(file, "utf8");
  const mailtos = [...text.matchAll(/mailto:[^"'\\\s<>)]*/gi)].map((m) => m[0]);
  if (mailtos.length === 0) continue;
  const rel = path.relative(root, file);
  if (!applyFiles.has(file)) {
    failures.push(`${rel} contains mailto: outside /apply/ (${[...new Set(mailtos)].join(", ")})`);
    continue;
  }
  for (const m of new Set(mailtos)) {
    if (m !== CONTACT_MAILTO) failures.push(`${rel} contains an unexpected mailto: ${m}`);
  }
}
{
  const apply = fs.readFileSync(path.join(docs, "apply/index.html"), "utf8");
  const anchors = [...apply.matchAll(/<a\b[^>]*href="(mailto:[^"]*)"[^>]*>/gi)].map((m) => m[1]);
  if (anchors.length !== 1 || anchors[0] !== CONTACT_MAILTO) {
    failures.push(`docs/apply/index.html must carry exactly one <a href="${CONTACT_MAILTO}">; found ${JSON.stringify(anchors)}`);
  }
}

const htmlFiles = textFiles.filter((file) => file.endsWith(".html"));
const linkPattern = /(?:href|src)="([^"]+)"/g;
for (const file of htmlFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(linkPattern)) {
    const value = match[1];
    if (!value.startsWith("/") || value.startsWith("//")) continue;
    const clean = value.split(/[?#]/, 1)[0];
    if (clean === "/") continue;
    const candidate = path.join(docs, clean.replace(/^\//, ""));
    const possibilities = [candidate, `${candidate}.html`, path.join(candidate, "index.html")];
    if (!possibilities.some((item) => fs.existsSync(item))) {
      failures.push(`${path.relative(root, file)} has unresolved local URL ${value}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Verified ${required.length} required outputs, ${htmlFiles.length} HTML files, and ${textFiles.length} text assets.`);
