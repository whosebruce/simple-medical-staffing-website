import { SOCIAL_PROFILES, type SocialPlatform } from "@/lib/social-profiles";

// Icon links to the business's public social profiles (TASK-20260923-14),
// replacing the plain-text "Instagram @handle" line. Each link is a 44px
// target around a 24px monochrome glyph drawn here (no icon package, no
// platform colours), named for screen readers, and opens the third-party
// site in a new tab without sending a referrer. `tone` picks the navy-footer
// or light-panel treatment; both use the shared `k-focus` ring.
const TONES = {
  dark: "bg-white/[0.07] text-white ring-1 ring-white/15 hover:bg-white/15",
  light: "border border-k-line bg-white text-k-navy hover:bg-k-sky-tint",
} as const;

function Glyph({ platform }: { platform: SocialPlatform }) {
  if (platform === "Instagram") {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="24" height="24" fill="none">
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.35" cy="6.65" r="1.25" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20Zm1.4 20v-7.9h2.5l.4-2.9h-2.9V9.4c0-.8.4-1.4 1.6-1.4h1.4V5.4c-.3 0-1.1-.1-2-.1-2.3 0-3.9 1.4-3.9 3.9v2h-2.5v2.9h2.5V22Z"
      />
    </svg>
  );
}

export function SocialLinks({ tone }: { tone: keyof typeof TONES }) {
  return (
    <ul aria-label="Social Media" className="flex flex-wrap items-center gap-2.5">
      {SOCIAL_PROFILES.map((profile) => (
        <li key={profile.platform}>
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Simple Medical Staffing on ${profile.platform} (opens in a new tab)`}
            data-social={profile.platform.toLowerCase()}
            className={`k-focus inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${TONES[tone]}`}
          >
            <Glyph platform={profile.platform} />
          </a>
        </li>
      ))}
    </ul>
  );
}
