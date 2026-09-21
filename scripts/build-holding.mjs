import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root = process.cwd();
if (JSON.parse(fs.readFileSync('package.json', 'utf8')).name !== 'simple-medical-staffing-website') throw new Error('Wrong project');
const config = JSON.parse(fs.readFileSync('maintenance/config.json', 'utf8'));
if (config.enabled !== true) throw new Error('Holding build requires explicit enabled=true');
if (!Array.isArray(config.pages) || !config.pages.includes('index.html') || !config.pages.includes('apply/index.html') || !config.pages.includes('404.html')) throw new Error('Incomplete route inventory');
for (const page of config.pages) if (!/^[a-z0-9/-]+\.html$/.test(page) || page.includes('..') || page.startsWith('/')) throw new Error('Unsafe output path');
const brand = fs.readFileSync('src/lib/brand.ts', 'utf8');
const phone = brand.match(/phone:\s*"([0-9-]+)"/)?.[1];
const email = brand.match(/email:\s*"([a-zA-Z0-9.@_-]+)"/)?.[1];
if (!phone || !email || phone.replace(/\D/g, '').length !== 10) throw new Error('Missing approved contact facts');
const template = fs.readFileSync('maintenance/index.html', 'utf8');
const inputs = ['maintenance/index.html', 'maintenance/holding.css', 'maintenance/config.json', 'src/lib/brand.ts', 'scripts/build-holding.mjs', 'public/kindred/logos/kindred-mark.svg'];
const hash = createHash('sha256');for (const input of inputs) hash.update(fs.readFileSync(input));
const release = 'holding-' + hash.digest('hex').slice(0, 16);
const html = template.replaceAll('{{PHONE_TEL}}', '+1' + phone.replace(/\D/g, '')).replaceAll('{{PHONE}}', phone).replaceAll('{{EMAIL}}', email).replaceAll('{{RELEASE}}', release);
if (/\{\{/.test(html)) throw new Error('Unresolved template');
const target = path.join(root, 'docs');
// Remove only the reproducible deployment artifact, never the full-site source.
fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(path.join(target, 'holding-assets'), { recursive: true });
for (const page of config.pages) {
  const dest = path.join(target, page);fs.mkdirSync(path.dirname(dest), { recursive: true });fs.writeFileSync(dest, html);
}
fs.cpSync('maintenance/assets', path.join(target, 'holding-assets'), { recursive: true });
fs.copyFileSync('maintenance/holding.css', path.join(target, 'holding-assets/holding.css'));
fs.copyFileSync('public/kindred/logos/kindred-mark.svg', path.join(target, 'holding-assets/mark-color.svg'));
fs.copyFileSync('public/favicon.ico', path.join(target, 'favicon.ico'));
fs.writeFileSync(path.join(target, 'CNAME'), 'simplemedicalstaffing.com\n');
fs.writeFileSync(path.join(target, '.nojekyll'), '');
fs.writeFileSync(path.join(target, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://simplemedicalstaffing.com/sitemap.xml\n');
fs.writeFileSync(path.join(target, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://simplemedicalstaffing.com/</loc></url></urlset>\n');
fs.writeFileSync(path.join(target, 'llms.txt'), '# Simple Medical Staffing\n\nWe’re Updating Our Website\n\nSomething better is coming. We’re making a few improvements to better serve our healthcare partners.\n\nPhone: '+phone+'\nEmail: '+email+'\n');
console.log(JSON.stringify({ mode: 'holding', release, htmlPages: config.pages.length }));
