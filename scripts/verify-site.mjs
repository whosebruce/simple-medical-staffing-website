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
  /mailto:/i,
  /applyShort/i,
  /DATABASE_URL/i,
];
for (const file of textFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const pattern of forbidden) {
    if (pattern.test(text)) failures.push(`${path.relative(root, file)} contains ${pattern}`);
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
