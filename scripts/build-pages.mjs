import fs from "node:fs";
import path from "node:path";
import { listHowToVideos, publishHowToVideos } from "./lib/how-to.mjs";

const root = process.cwd();
const source = path.join(root, "out");
const target = path.join(root, "docs");

if (!fs.existsSync(path.join(source, "index.html"))) {
  throw new Error("Next.js export is missing out/index.html");
}

// Checked before docs/ is replaced, so a misnamed video leaves the last good build in place.
listHowToVideos(root);

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(source, target, { recursive: true });
fs.writeFileSync(path.join(target, ".nojekyll"), "");
fs.writeFileSync(path.join(target, "CNAME"), "simplemedicalstaffing.com\n");
// The export copies everything in public/, including the notes that sit beside
// the how-to videos. Only the videos themselves are published.
const videos = publishHowToVideos(root, target);

console.log(`Prepared GitHub Pages artifact at ${target} (${videos.length} how-to video${videos.length === 1 ? "" : "s"})`);
