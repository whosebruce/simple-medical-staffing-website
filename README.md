# Simple Medical Staffing website

Source for [simplemedicalstaffing.com](https://simplemedicalstaffing.com), the public website of Simple Medical Staffing, a healthcare staffing agency in Irvine, California offering contract, per-diem and direct placement staffing.

The site is a brochure: static HTML served by GitHub Pages. There are no forms, uploads, sign-in or backend, and this repository holds only public website code and media. The staffing platform itself lives in a separate private repository.

## Two publishing modes

`maintenance/config.json` decides what gets published:

| `enabled` | What `npm run build` writes to `docs/` |
| --- | --- |
| `true` | The holding page: every published URL shows a short "we're updating the website" notice with the phone number and email. See [`maintenance/README.md`](maintenance/README.md). |
| `false` | The full site below, built with Next.js and exported as static HTML. |

Check the file on `main` to see which mode is live.

## Pages

| Path | Page |
| --- | --- |
| `/` | Home |
| `/solutions/` | Staffing solutions, with pages for contract staffing, per-diem staffing, direct placement and the staffing request checklist |
| `/professionals/` | For professionals, with a candidate FAQ at `/professionals/faq/` |
| `/about/` | About |
| `/contact/` | Contact |
| `/apply/` | Apply Now: contact options for applicants (the site collects nothing) |
| `/privacy/` | Privacy |

`src/lib/site-routes.ts` is the single route registry. The sitemap, breadcrumbs, structured data and verifiers all read from it. URLs from the previous site (`healthcare-staffing-*.html`) are kept as noindex stubs that refresh to their current pages.

## Develop

```bash
npm ci
npm run dev            # http://127.0.0.1:3180
```

## Build and verify

```bash
npm run build          # builds docs/ for the mode in maintenance/config.json
npm run verify         # builds and verifies that mode
npm run start:static   # serves docs/ at http://127.0.0.1:3180
```

In full-site mode, `npm run verify` runs `verify:site`: typecheck, the static export, a structural check of `docs/` (links, sitemap, canonical URLs, forbidden strings, the single permitted `mailto:`), the copy requirements in `scripts/copy-requirements.mjs`, and a canary for the browser verifier.

The browser pass is separate because it needs a running server and Playwright:

```bash
npm run serve:pages    # serves docs/ on port 3186
SITE_URL=http://127.0.0.1:3186 EVIDENCE_DIR=<dir> npm run verify:browser
```

It loads every route at 1440, 768, 390 and 320 pixels and fails on console errors, broken links or images, horizontal overflow, or any form.

## Deploy

GitHub Pages publishes `docs/` from `main` at `simplemedicalstaffing.com` (see `docs/CNAME`), with HTTPS enforced. Merging to `main` publishes the site, so commit the source change and the rebuilt `docs/` together.

## Rules for this repository

- Static export only. No forms, form actions, uploads, sign-in links, or links into the staffing platform or its preview.
- `/apply/` carries the one permitted `mailto:` link. No other page has one.
- No applicant, patient, credential or client data, ever. See [`SECURITY.md`](SECURITY.md).
- Editorial style: no em dashes, Title Case action labels.
- [`RESTORATION.md`](RESTORATION.md) records the approved Kindred design and the checks every page must pass.

## Contact

Simple Medical Staffing: 949-317-2470, info@simplemedicalstaffing.com.

Built and maintained by [Bruce Works](https://bruceworks.net) for Simple Medical Staffing.
