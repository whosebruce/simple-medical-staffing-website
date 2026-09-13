import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "out");
const target = path.join(root, "docs");

if (!fs.existsSync(path.join(source, "index.html"))) {
  throw new Error("Next.js export is missing out/index.html");
}

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(source, target, { recursive: true });
fs.writeFileSync(path.join(target, ".nojekyll"), "");
fs.writeFileSync(path.join(target, "CNAME"), "simplemedicalstaffing.com\n");

console.log(`Prepared GitHub Pages artifact at ${target}`);
