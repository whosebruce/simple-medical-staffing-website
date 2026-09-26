// Derived image assets for the public site (TASK-20260917-07).
//
// Reads the approved master images under public/kindred/ and writes:
//   - responsive WebP variants next to each photo master (<name>-<width>.webp)
//     used by src/lib/image-loader.ts to build srcset candidates;
//   - favicon / touch-icon / logo PNG fallbacks rendered from the approved
//     brand mark public/kindred/logos/kindred-mark.svg;
//   - a manifest (scripts/derived-assets.manifest.json) with dimensions,
//     bytes and sha256 of every derivative and the master it came from.
//
// Masters are never modified. Run manually with `node scripts/build-images.mjs`
// after a master changes, then commit the outputs. sharp is already a
// dependency of Next.js in this repo; no network, no external services.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const root = process.cwd();
const pub = path.join(root, "public");
const KINDRED = path.join(pub, "kindred");

export const VARIANT_WIDTHS = [640, 960, 1280];
const WEBP_OPTIONS = { quality: 82, effort: 6 };

// library/: approved Apollo originals (TASK-20260923-05, Mira-reviewed), WebP masters.
const PHOTO_DIRS = ["photos", "campaign", "library"];
const MARK = path.join(KINDRED, "logos", "kindred-mark.svg");
const ICON_DIR = path.join(KINDRED, "icons");

const manifest = { generatedBy: "scripts/build-images.mjs", variantWidths: VARIANT_WIDTHS, webp: WEBP_OPTIONS, masters: {}, derivatives: [] };

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

async function record(file, source, usage) {
  const meta = await sharp(file).metadata();
  manifest.derivatives.push({
    file: path.relative(root, file),
    source: path.relative(root, source),
    width: meta.width,
    height: meta.height,
    format: meta.format,
    bytes: fs.statSync(file).size,
    sha256: sha256(file),
    usage,
  });
}

// 1. Responsive photo variants ------------------------------------------------
const variantMap = {};
for (const dir of PHOTO_DIRS) {
  const full = path.join(KINDRED, dir);
  for (const name of fs.readdirSync(full).sort()) {
    if (!/\.webp$/i.test(name) || /-\d+\.webp$/i.test(name)) continue; // masters only
    const master = path.join(full, name);
    const meta = await sharp(master).metadata();
    const publicSrc = `/kindred/${dir}/${name}`;
    manifest.masters[publicSrc] = { width: meta.width, height: meta.height, bytes: fs.statSync(master).size, sha256: sha256(master) };
    const widths = [];
    for (const w of VARIANT_WIDTHS) {
      if (w >= meta.width) continue; // never upscale; the master serves the largest candidate
      const out = master.replace(/\.webp$/i, `-${w}.webp`);
      await sharp(master).resize({ width: w, withoutEnlargement: true }).webp(WEBP_OPTIONS).toFile(out);
      await record(out, master, `srcset candidate ${w}w for ${publicSrc}`);
      widths.push(w);
    }
    variantMap[publicSrc] = { master: meta.width, widths };
  }
}

// 2. Icon and logo fallbacks from the approved mark --------------------------
fs.mkdirSync(ICON_DIR, { recursive: true });
const markSvg = fs.readFileSync(MARK);

async function markPng(size, { background, pad }) {
  // Render the mark at `size - 2*pad`, centred on `background` (or transparent).
  const inner = size - 2 * pad;
  // The mark's viewBox is 2000x2000, so the default 72 dpi rasterisation is
  // already larger than any icon here; resize down with a high-quality filter.
  const mark = await sharp(markSvg).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const bg = background ?? { r: 0, g: 0, b: 0, alpha: 0 };
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: mark, left: pad, top: pad }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const icons = [
  { file: "favicon-16.png", size: 16, pad: 0, background: null, usage: "icon 16x16" },
  { file: "favicon-32.png", size: 32, pad: 0, background: null, usage: "icon 32x32" },
  { file: "favicon-48.png", size: 48, pad: 0, background: null, usage: "favicon.ico member" },
  { file: "icon-192.png", size: 192, pad: 12, background: WHITE, usage: "icon 192x192 (Android/Chrome)" },
  { file: "icon-512.png", size: 512, pad: 32, background: WHITE, usage: "icon 512x512" },
  { file: "apple-touch-icon.png", size: 180, pad: 20, background: WHITE, usage: "apple-touch-icon 180x180 (iOS adds no transparency, so a white field is baked in)" },
  { file: "logo-512.png", size: 512, pad: 48, background: WHITE, usage: "Organization logo for JSON-LD (PNG on white, >=112px)" },
];
for (const icon of icons) {
  const out = path.join(ICON_DIR, icon.file);
  fs.writeFileSync(out, await markPng(icon.size, { background: icon.background, pad: icon.pad }));
  await record(out, MARK, icon.usage);
}

// favicon.ico: ICO container holding PNG-encoded 16/32/48 images (supported by
// every current browser and Windows Vista+). Served from the site root because
// many user agents request /favicon.ico regardless of <link rel="icon">.
{
  const members = ["favicon-16.png", "favicon-32.png", "favicon-48.png"].map((f) => ({
    size: f === "favicon-16.png" ? 16 : f === "favicon-32.png" ? 32 : 48,
    data: fs.readFileSync(path.join(ICON_DIR, f)),
  }));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(members.length, 4);
  const dir = Buffer.alloc(16 * members.length);
  let offset = 6 + dir.length;
  members.forEach((m, i) => {
    const o = i * 16;
    dir.writeUInt8(m.size === 256 ? 0 : m.size, o); // width
    dir.writeUInt8(m.size === 256 ? 0 : m.size, o + 1); // height
    dir.writeUInt8(0, o + 2); // palette
    dir.writeUInt8(0, o + 3); // reserved
    dir.writeUInt16LE(1, o + 4); // colour planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(m.data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += m.data.length;
  });
  const ico = Buffer.concat([header, dir, ...members.map((m) => m.data)]);
  const out = path.join(pub, "favicon.ico");
  fs.writeFileSync(out, ico);
  manifest.derivatives.push({ file: "public/favicon.ico", source: path.relative(root, MARK), width: 48, height: 48, format: "ico(png members 16,32,48)", bytes: ico.length, sha256: sha256(out), usage: "root favicon.ico fallback" });
}

// 3. Loader map + manifest -----------------------------------------------------
const variantsTs = `// Generated by scripts/build-images.mjs. Do not edit by hand.
// Available pre-generated WebP widths per master image (src/lib/image-loader.ts).
export const IMAGE_VARIANTS: Record<string, { master: number; widths: number[] }> = ${JSON.stringify(variantMap, null, 2)};
`;
fs.writeFileSync(path.join(root, "src", "lib", "image-variants.ts"), variantsTs);
fs.writeFileSync(path.join(root, "scripts", "derived-assets.manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${manifest.derivatives.length} derivatives for ${Object.keys(manifest.masters).length} masters; manifest at scripts/derived-assets.manifest.json`);
