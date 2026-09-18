// Negative canary for the browser verifier's issue sink (scripts/lib/browser-issues.cjs).
//
// Feeds sentinel strings through the exact classification/sanitization
// functions the verifier uses for page errors, console errors, failed
// responses and unresolved links, then asserts that the serialized output
// contains none of the sentinels while the failure counts survive. Exits 1 if
// any sentinel leaks, if a count is lost, or if the sink accepts an unbounded
// category. Run: node scripts/verify-browser-canary.cjs
const assert = require("assert");
const { IssueSink, sanitizePath, sanitizeUnresolved, sanitizeList, CATEGORIES, MAX_ISSUES_PER_ROUTE } = require("./lib/browser-issues.cjs");

const SENTINELS = [
  "SENTINEL_STACK_TRACE_9f3a",
  "SENTINEL_CONSOLE_BODY_7c1d",
  "SENTINEL_QUERY_TOKEN_5e2b",
  "SENTINEL_FRAGMENT_1a9c",
  "SENTINEL_USERINFO_3d4e",
  "sentinel-host.example",
];
const base = "http://127.0.0.1:3186";

const sink = new IssueSink(base);
// What Playwright callbacks would hand over: the sink must never store the text.
const fakePageError = new Error(`TypeError: boom at ${SENTINELS[0]}\n    at file:///tmp/${SENTINELS[0]}.js:1:1`);
sink.add("page-error", { message: fakePageError.message, stack: fakePageError.stack });
sink.add("console-error", { text: SENTINELS[1] });
sink.add("http-error", { status: 404, url: `${base}/kindred/photos/missing.webp?token=${SENTINELS[2]}#${SENTINELS[3]}` });
sink.add("http-error", { status: 500, url: `http://${SENTINELS[4]}@${SENTINELS[5]}/x?y=${SENTINELS[2]}` });
sink.add("http-error", { status: "not-a-number", url: "http://[unparseable" });
sink.add(`bogus-category-${SENTINELS[1]}`); // unknown category must be bounded to harness-error
for (let i = 0; i < MAX_ISSUES_PER_ROUTE + 5; i++) sink.add("console-error", { text: `${SENTINELS[1]}-${i}` });

const unresolved = sanitizeUnresolved([{ href: `/about/?ref=${SENTINELS[2]}`, status: 404 }, { href: `https://${SENTINELS[5]}/`, status: 0 }], base);
const list = sanitizeList([`/kindred/x.webp#${SENTINELS[3]}`, `javascript:alert('${SENTINELS[1]}')`], base);

const serialized = JSON.stringify({ issues: sink.toJSON(), unresolved, list, path: sanitizePath(`${base}/a b/../c?${SENTINELS[2]}`, base) });

const failures = [];
for (const s of SENTINELS) if (serialized.includes(s)) failures.push(`sentinel leaked: ${s}`);
try {
  const j = sink.toJSON();
  assert.strictEqual(j.counts["page-error"], 1, "page-error count");
  assert.strictEqual(j.counts["http-error"], 3, "http-error count");
  assert.strictEqual(j.counts["harness-error"], 1, "unknown category bounded to harness-error");
  assert.strictEqual(j.counts["console-error"], 1 + MAX_ISSUES_PER_ROUTE + 5, "console-error count preserved beyond the item cap");
  assert.strictEqual(j.total, 1 + 3 + 1 + 1 + MAX_ISSUES_PER_ROUTE + 5, "total preserved");
  assert.ok(j.items.length <= MAX_ISSUES_PER_ROUTE, "items bounded");
  assert.ok(j.dropped > 0, "dropped counter records overflow");
  assert.strictEqual(j.items[2].path, "/kindred/photos/missing.webp", "same-origin path kept without query/fragment");
  assert.strictEqual(j.items[3].path, "<cross-origin>", "cross-origin URL replaced by token");
  assert.strictEqual("status" in j.items[4], false, "non-numeric status dropped");
  assert.strictEqual(j.items[4].path, "<unparseable>", "unparseable URL replaced by token");
  for (const item of j.items) {
    assert.deepStrictEqual(Object.keys(item).filter((k) => !["category", "status", "path"].includes(k)), [], "no extra fields on items");
    assert.ok(CATEGORIES.includes(item.category), "category from the fixed list");
  }
  assert.deepStrictEqual(unresolved, [{ path: "/about/", status: 404 }, { path: "<cross-origin>", status: 0 }], "unresolved sanitized");
  assert.deepStrictEqual(list, ["/kindred/x.webp", "<cross-origin>"], "list sanitized");
} catch (e) {
  failures.push(e.message);
}

if (failures.length) {
  console.error(`verify-browser-canary FAIL\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`verify-browser-canary PASS: ${SENTINELS.length} sentinels withheld, ${sink.total} issues counted, ${sink.toJSON().items.length} items retained, ${sink.toJSON().dropped} dropped`);
