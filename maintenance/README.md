# Temporary Public Holding Page

The public site is temporarily replaced by the approved website-update notice. This does not change the separately hosted, protected preview.

`npm run build` and `npm run verify` honor `maintenance/config.json`. When `enabled` is true, they build and verify the holding artifact only. The original Next source and full-site verifiers remain intact; they are not claimed to pass against an intentionally paused marketing site. Holding generation needs Node only, no dependency install or external font service.

All 19 previously published HTML files, including Apply Now, the five legacy URLs and both 404 files, carry the same notice. Old JavaScript/RSC payloads, photographs and old machine-readable marketing text are removed from the deployment artifact. Contact details come from `src/lib/brand.ts`. Fonts are the byte-identical Montserrat/Nunito Sans Latin assets from the previous verified build.

GitHub Pages serves known paths with HTTP 200 and unknown paths with its custom 404. This static holding mode is NOT an HTTP 503 maintenance response. There are no permanent redirects and no blanket `noindex`; pages canonicalize to the root, and the temporary sitemap lists only the root.

## Restore the website

1. Confirm the full-site content is approved for publication.
2. Set `enabled` to `false` in `maintenance/config.json`.
3. Install locked dependencies with `npm ci`; run `npm run verify`. This executes the retained full-site gates and regenerates the normal `docs/` export.
4. Review/commit the config and generated artifact together, publish through the existing `main:/docs` Pages source, and verify the live domain.

The pre-holding site is preserved at commit `d723e9b7960c6997941258191a367340a723c354` and rollback branch `rollback/public-before-holding-20260920`. Reverting the holding-page commit is the exact-source alternative. Do not force-push history or overwrite later accepted changes.
