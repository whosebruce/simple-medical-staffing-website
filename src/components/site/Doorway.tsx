import Image from "next/image";
import Link from "next/link";
import type { SiteImageSlot } from "@/lib/site-media";

export function Doorway({
  slot,
  lane,
  eyebrow,
  heading,
  body,
  href,
  linkLabel,
}: {
  slot: SiteImageSlot;
  lane: "facility" | "professional";
  eyebrow: string;
  heading: string;
  body: string;
  href: string;
  linkLabel: string;
}) {
  const inkClass =
    lane === "facility" ? "ks-ink-facility" : "ks-ink-professional";

  return (
    <div className="ks-door">
      <Image
        src={slot.src}
        alt={slot.alt}
        width={slot.width}
        height={slot.height}
        sizes={slot.sizes}
        style={{ objectPosition: slot.objectPosition }}
      />
      <div aria-hidden className="ks-door-scrim" />
      <div className="ks-door-body">
        <p className={`ks-eyebrow ${inkClass}`}>{eyebrow}</p>
        <h2 className="ks-h2-door">{heading}</h2>
        <p className="ks-small ks-ink-on-navy">{body}</p>
        <Link
          href={href}
          className={`ks-link ks-focus-on-navy mt-1 ${inkClass}`}
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
}
