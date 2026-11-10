// The app's short how-to videos are hosted on this site and played inside the
// app from https://simplemedicalstaffing.com/how-to/<name>.mp4. They are files
// only: no page lists them, the sitemap leaves them out and robots.txt keeps
// crawlers away, because the app is the one place they are meant to be watched.
// Both build modes publish them, so switching the holding page on never breaks
// a video inside the app.
import fs from "node:fs";
import path from "node:path";

export const HOW_TO_DIR = "how-to";

/** Hyphen-separated lowercase words ending in .mp4: a name that reads the same in a URL and in the app's code. */
export const HOW_TO_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*\.mp4$/;

/** GitHub warns about files above 50 MB and refuses them above 100 MB. A short screen recording is a few MB. */
export const HOW_TO_MAX_BYTES = 50 * 1024 * 1024;

/** Notes for whoever adds a video. They stay in the repository and are never published. */
const UNPUBLISHED = new Set(["README.md"]);

/**
 * The videos in public/how-to/, sorted. Throws on anything else in the folder,
 * so a misnamed or oversized file stops the build instead of quietly going
 * missing from the site (or quietly going public).
 */
export function listHowToVideos(root) {
  const dir = path.join(root, "public", HOW_TO_DIR);
  if (!fs.existsSync(dir)) return [];
  const videos = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    // Finder leaves .DS_Store behind when someone drags a video in.
    if (entry.name.startsWith(".")) continue;
    if (entry.isFile() && UNPUBLISHED.has(entry.name)) continue;
    const rel = `public/${HOW_TO_DIR}/${entry.name}`;
    if (!entry.isFile() || !HOW_TO_NAME.test(entry.name)) {
      throw new Error(`${rel}: a how-to video is named in lowercase letters, digits and hyphens and ends in .mp4 (for example clock-in.mp4)`);
    }
    const size = fs.statSync(path.join(dir, entry.name)).size;
    if (size === 0) throw new Error(`${rel} is empty`);
    if (size > HOW_TO_MAX_BYTES) {
      throw new Error(`${rel} is ${(size / 1024 / 1024).toFixed(1)} MB; keep each how-to video under ${HOW_TO_MAX_BYTES / 1024 / 1024} MB`);
    }
    videos.push(entry.name);
  }
  return videos.sort();
}

/** Makes <docs>/how-to/ hold exactly the videos from public/how-to/ (no folder at all while there are none). */
export function publishHowToVideos(root, docs) {
  const videos = listHowToVideos(root);
  const target = path.join(docs, HOW_TO_DIR);
  fs.rmSync(target, { recursive: true, force: true });
  if (videos.length) {
    fs.mkdirSync(target, { recursive: true });
    for (const name of videos) fs.copyFileSync(path.join(root, "public", HOW_TO_DIR, name), path.join(target, name));
  }
  return videos;
}
