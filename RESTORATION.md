# Public Site Appearance

Scope: public brochure website only. The current full-site source is the Kindred Arc redesign (TASK-20260923-03), which replaces the earlier original-appearance restoration while retaining the same safe public-site behaviour. BM-20260925-33 turns holding mode off (`maintenance/config.json` `enabled: false`), and `docs/` is the full-site export. It is published through the `main:/docs` Pages source only when merged.

## Visual contract
- Established Kindred palette (navy, sky, violet, teal, cloud tints), Montserrat and Nunito Sans, and the original full-colour brand mark on a light sticky header.
- Soft, curved compositions: pill actions, arch / circle / soft photo masks, wave seams between tinted zones, inset rounded closing panels, and a curved-top navy footer. No page is built from repeated square card grids.
- Two audience paths (facilities, professionals) directly after the home hero; editorial lists, a curved step path and chip clouds carry the service, process and role content.
- Header navigation (TASK-20260923-14): Staffing Solutions and For Professionals stay real links, each with a separate disclosure button ("Staffing Solutions Pages", "For Professionals Pages") that opens its child pages plus one audience action (Request Staffing for facilities, Apply Now for professionals only): a click-only panel from 1024 pixels, an inline group in the menu below it, collapsed by default, closed by Escape, an outside press, focus leaving and route changes. Structure only is borrowed from Medely; no copy, asset or trade dress.
- Multi-column footer: brand block with tagline and Get in Touch (phone link, email as text, address, Instagram and Facebook icon links), For Facilities, For Professionals and Company columns, and a sitewide note that the images are illustrative.
- Photographs are owned generated illustrations (`src/lib/site-media.ts`). Text never sits on a photograph. The three photos that show a rendered brand mark are not used (`scripts/verify-site.mjs` enforces this). No generated person is presented as the founder or as staff.
- Apply remains a non-collecting contact-options page. Privacy is the existing website privacy notice. The Privacy Statement and Terms and Conditions review drafts (TASK-20260923-14) are held, not published, until Bruce approves them; there is no `/terms/` page or link (`scripts/verify-copy.mjs` L01-L03).
- Social links: only the two verified public profiles (`src/lib/social-profiles.ts`), as icon links that open a new tab with `rel="noopener noreferrer"`; never in JSON-LD `sameAs`. A public profile match is not proof of ownership: Dina confirms the accounts before release.
- Preserve the current biography, professional-role list, patched dependencies, canonical metadata, sitemap, HTTPS domain and static-only privacy boundary.
- Do not restore demo sign-in, applicant forms, uploads, backend code, unconfirmed leaders or placeholder text.
- Email handlers: the only permitted one is the owner-authorized (2026-09-17) application-contact link on `/apply/`. It is exactly one static `mailto:info@simplemedicalstaffing.com` anchor with no subject, body, query or personal data. No other `mailto:` may appear on any route, and there is no form action and no upload. The sensitive-document warnings stay.
- Check all twelve public routes at 320, 390, 768, 1024, 1280 and 1440 pixels (`scripts/verify-browser.cjs`). Confirm links, images, the mobile menu and its groups, the desktop disclosure panels, the social icon links, keyboard focus, console and network errors, and zero overflow.

Historical presentation reference: the original-appearance restoration is preserved in git history before TASK-20260923-03.
