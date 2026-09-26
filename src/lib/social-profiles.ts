import { BUSINESS_FACTS } from "./brand";

// The two public social profiles linked by icon from the footer and the
// contact page (TASK-20260923-14). Both exact URLs come from the client-source
// brand recovery in the private platform repository
// (docs/LEGACY-BRAND-RECOVERY-20260731.md) and the Council tasking; the
// Instagram URL is rebuilt from the verified handle in brand.ts. On
// 2026-09-23/24 each public profile showed the business name and matching
// website and contact details. That corroborates a public profile, not
// account ownership or client approval: Dina must confirm these are the
// accounts she wants linked before any public release. Add no other platform
// without a verified exact profile URL, and keep these out of the JSON-LD
// `sameAs` (scripts/verify-site.mjs refuses it as an unverified property).
export const SOCIAL_PROFILES = [
  { platform: "Instagram", url: `https://www.instagram.com/${BUSINESS_FACTS.instagram}/` },
  { platform: "Facebook", url: "https://www.facebook.com/p/Simple-Medical-Staffing-61552041984507/" },
] as const;

export type SocialPlatform = (typeof SOCIAL_PROFILES)[number]["platform"];
