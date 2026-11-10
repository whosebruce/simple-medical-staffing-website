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

In full-site mode, `npm run verify` runs `verify:site`: typecheck, the static export, a structural check of `docs/` (links, sitemap, canonical URLs, forbidden strings, the single permitted `mailto:`, the how-to videos folder), the copy requirements in `scripts/copy-requirements.mjs`, and a canary for the browser verifier.

The browser pass is separate because it needs a running server and Playwright:

```bash
npm run serve:pages    # serves docs/ on port 3186
SITE_URL=http://127.0.0.1:3186 EVIDENCE_DIR=<dir> npm run verify:browser
```

It loads every route at 1440, 768, 390 and 320 pixels and fails on console errors, broken links or images, horizontal overflow, or any form.

## Deploy

GitHub Pages publishes `docs/` from `main` at `simplemedicalstaffing.com` (see `docs/CNAME`), with HTTPS enforced. Merging to `main` publishes the site, so commit the source change and the rebuilt `docs/` together.

## How-to videos for the app

The app's short how-to videos are hosted on this site and played inside the app from `https://simplemedicalstaffing.com/how-to/<name>.mp4`. This site only stores the files: no page lists them, they are not in the sitemap, and `robots.txt` asks search engines to stay out of `/how-to/`. The app lists the videos in its own code, so a file added here does not show up in the app until the app's code names it.

To add a video:

1. Film on made-up data only. Anything put in `public/how-to/` is public once it is merged: anyone with the address can watch it or download it. No real names, facilities, pay or patient details.
2. Export it as `.mp4` and keep the file small: a short screen recording should be a few MB. The build refuses a file over 50 MB.
3. Name it in lowercase letters, digits and hyphens, ending in `.mp4`, for example `clock-in.mp4`. The name is the address, so do not rename a video the app already plays.
4. Put it in `public/how-to/` and run `npm run verify`, which rebuilds `docs/` and copies the video to `docs/how-to/`. Commit the video and the rebuilt `docs/` together.
5. Add the same file name to the app's list of videos, in the app's own repository.

The build stops if anything else is in that folder, apart from its `README.md` (notes for whoever adds a video, never published). Do not store the videos with Git LFS: GitHub Pages would publish the pointer file instead of the video. Holding mode publishes the videos too, so they keep playing in the app while the holding page is up.

## Rules for this repository

- Static export only. No forms, form actions or uploads. The only links into the staffing platform are its web app's sign-in (`https://app.simplemedicalstaffing.com/account/sign-in`), application (`https://app.simplemedicalstaffing.com/apply`) and staffing request form (`https://app.simplemedicalstaffing.com/request-staff`), from `src/lib/app-links.ts`, opening in the same tab; never its preview or private pages. `scripts/verify-site.mjs` refuses any other outside link besides the two social profiles.
- `/apply/` carries the one permitted `mailto:` link. No other page has one.
- No applicant, patient, credential or client data, ever. See [`SECURITY.md`](SECURITY.md).
- Editorial style: no em dashes. Title Case is the brand's voice for page titles, section headings, FAQ questions, buttons and button-like links, navigation and footer links, labels and card titles; real sentences (body copy, descriptions, FAQ answers, legal text) stay in sentence case. Small words (a, an, the, and, or, of, to, in, on, for, with, at, by) stay lowercase unless first or last. The casing is in the words themselves, not CSS `text-transform` (the uppercase eyebrow labels are a type treatment on top of Title Case words).
- [`RESTORATION.md`](RESTORATION.md) records the approved Kindred design and the checks every page must pass.

## Contact

Simple Medical Workforce Solutions: +1 (760) 536-2178, info@simplemedicalstaffing.com.

Built and maintained by [Bruce Works](https://bruceworks.net) for Simple Medical Workforce Solutions.
