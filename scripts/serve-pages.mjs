// Local static server that mimics the GitHub Pages URL rules the site relies
// on, for browser proof and lab measurements against docs/:
//   /dir            -> 301 to /dir/ when docs/dir/index.html exists
//   /dir/           -> docs/dir/index.html
//   /name           -> docs/name.html when it exists (extensionless legacy stubs)
//   unknown         -> 404 with docs/404.html
// Usage: node scripts/serve-pages.mjs [port] [docsDir]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const port = Number(process.argv[2] || 3186);
const docs = path.resolve(process.argv[3] || "docs");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function send(res, status, file) {
  const ext = path.extname(file);
  res.writeHead(status, { "content-type": types[ext] || "application/octet-stream", "cache-control": "max-age=600" });
  fs.createReadStream(file).pipe(res);
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const safe = path.normalize(url).replace(/^(\.\.[/\\])+/, "");
    const target = path.join(docs, safe);
    if (!target.startsWith(docs)) {
      res.writeHead(403).end();
      return;
    }
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      if (!url.endsWith("/")) {
        res.writeHead(301, { location: `${url}/` }).end();
        return;
      }
      const index = path.join(target, "index.html");
      if (fs.existsSync(index)) return send(res, 200, index);
    } else if (fs.existsSync(target) && fs.statSync(target).isFile()) {
      return send(res, 200, target);
    } else if (fs.existsSync(`${target}.html`)) {
      return send(res, 200, `${target}.html`);
    }
    send(res, 404, path.join(docs, "404.html"));
  })
  .listen(port, "127.0.0.1", () => console.log(`serving ${docs} at http://127.0.0.1:${port}/`));
