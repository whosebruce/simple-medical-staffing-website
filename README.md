# Simple Medical Workforce Solutions website

Source for [simplemedicalstaffing.com](https://simplemedicalstaffing.com), the public website of Simple Medical Workforce Solutions, a healthcare staffing agency serving all of Southern California: San Diego, Orange County, Los Angeles County, and the Inland Empire. Our primary focus is San Diego. It offers contract, per-diem and direct placement for SNF, rehab centers, and hospitals. The Irvine office address is unchanged.

The site is a brochure: static HTML served by GitHub Pages. There are no forms, uploads or backend, and this repository holds only public website code and media. The staffing platform itself lives in a separate private repository; its web app at `app.simplemedicalstaffing.com` is where people sign in, apply and request staff, and this site links to it (Sign In, every Apply Now and every Request Staff).

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
| `/request-staff/` | Request Staff: a Start Your Request button into the web app's staffing request form, with the phone and email as the other way in (the site collects nothing) |
| `/apply/` | Apply Now: a Start Your Application button into the web app's application, with the phone and email as the other way in (the site collects nothing; old links land here) |
| `/app/` | The App: the web app is open (Sign In on the Web), what it does, and the iPhone app "coming to the App Store soon" (add its App Store link when it is live) |
| `/privacy/` | Privacy |
| `/support/` | Help with the SMWS app |

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

- Static export only. No forms, form actions or uploads. The only links into the staffing platform are its web app's sign-in (`https://app.simplemedicalstaffing.com/account/sign-in`), application (`https://app.simplemedicalstaffing.com/apply`) and staffing request form (`https://app.simplemedicalstaffing.com/request-staff`), from `src/lib/app-links.ts`, opening in the same tab; never its preview or private pages. `scripts/verify-site.mjs` refuses any other outside link besides the two social profiles.
- `/apply/` carries the one permitted `mailto:` link. No other page has one.
- No applicant, patient, credential or client data, ever. See [`SECURITY.md`](SECURITY.md).
- Editorial style: no em dashes, Title Case action labels.
- [`RESTORATION.md`](RESTORATION.md) records the approved Kindred design and the checks every page must pass.

## Contact

Simple Medical Workforce Solutions: +1 (760) 536-2178, info@simplemedicalstaffing.com.

Built and maintained by [Bruce Works](https://bruceworks.net) for Simple Medical Workforce Solutions.
