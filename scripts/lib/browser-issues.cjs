// Bounded issue classification for the browser verifier.
//
// The verifier never persists raw page-error messages, console text, stack
// traces or full URLs. Every event is reduced to a fixed category, an
// optional bounded HTTP status and a sanitized same-origin path (no query,
// fragment, credentials or host). Counts are preserved so a failing run still
// fails; only the payload is bounded. `scripts/verify-browser-canary.cjs`
// feeds sentinel strings through these same functions and asserts that none
// of them reach the serialized output.
const CATEGORIES = Object.freeze([
  "page-error",
  "console-error",
  "http-error",
  "menu-open-failed",
  "menu-links-missing",
  "menu-close-failed",
  "focus-outside-viewport",
  "harness-error",
]);

const MAX_ISSUES_PER_ROUTE = 50;
const MAX_PATH_LENGTH = 160;

/** Reduce any URL to a same-origin path, or a fixed token for anything else. */
function sanitizePath(rawUrl, origin) {
  let url;
  try {
    url = new URL(String(rawUrl), origin);
  } catch {
    return "<unparseable>";
  }
  if (origin && url.origin !== new URL(origin).origin) return "<cross-origin>";
  const path = url.pathname.replace(/[^A-Za-z0-9/._-]/g, "_");
  return path.length > MAX_PATH_LENGTH ? `${path.slice(0, MAX_PATH_LENGTH)}<truncated>` : path;
}

/** Bound an HTTP status to 0 (unreachable) or an integer 100-599; anything else becomes null. */
function boundStatus(status) {
  const n = Number(status);
  if (n === 0) return 0;
  return Number.isInteger(n) && n >= 100 && n <= 599 ? n : null;
}

class IssueSink {
  constructor(origin) {
    this.origin = origin;
    this.items = [];
    this.dropped = 0;
    this.counts = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
  }

  /** Record one issue. Only the category, a bounded status and a sanitized path are kept. */
  add(category, { status, url } = {}) {
    if (!CATEGORIES.includes(category)) category = "harness-error";
    this.counts[category] += 1;
    if (this.items.length >= MAX_ISSUES_PER_ROUTE) {
      this.dropped += 1;
      return;
    }
    const item = { category };
    const s = boundStatus(status);
    if (s !== null) item.status = s;
    if (url !== undefined) item.path = sanitizePath(url, this.origin);
    this.items.push(item);
  }

  get total() {
    return Object.values(this.counts).reduce((a, b) => a + b, 0);
  }

  /** Plain object safe to serialize; never contains message or stack text. */
  toJSON() {
    return { total: this.total, counts: { ...this.counts }, items: this.items.slice(), dropped: this.dropped };
  }
}

/** Sanitize a list of internal hrefs and their statuses for the results file. */
function sanitizeUnresolved(list, origin) {
  return list.map(({ href, status }) => ({ path: sanitizePath(href, origin), status: boundStatus(status) }));
}

/** Sanitize a src/href list to same-origin paths. */
function sanitizeList(list, origin) {
  return list.map((u) => sanitizePath(u, origin));
}

module.exports = { CATEGORIES, IssueSink, sanitizePath, boundStatus, sanitizeUnresolved, sanitizeList, MAX_ISSUES_PER_ROUTE };
