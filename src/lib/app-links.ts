// The live web app at app.simplemedicalstaffing.com (Bruce, 2026-11-08): online applications are on and this
// website is the one public home, so the header and footer carry Sign In and every Apply Now goes straight to
// the app's application. These are the only outside links besides the two social profiles: APP_LINKS in
// scripts/copy-requirements.mjs mirrors them, and scripts/verify-site.mjs refuses any other outside URL.
// They open in the same tab (the app is ours, not a third party).
export const APP_LINKS = {
  signIn: "https://app.simplemedicalstaffing.com/account/sign-in",
  apply: "https://app.simplemedicalstaffing.com/apply",
} as const;
