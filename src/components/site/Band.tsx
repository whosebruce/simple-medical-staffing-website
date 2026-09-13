import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImageSlot } from "@/lib/site-media";

export function Band({
  slot,
  flip = false,
  priority = false,
  children,
}: {
  slot: SiteImageSlot;
  flip?: boolean;
  priority?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`ks-band${flip ? " ks-band--flip" : ""}`}>
      <div className="ks-band-panel">{children}</div>
      <div className="ks-band-media">
        <Image
          src={slot.src}
          alt={slot.alt}
          width={slot.width}
          height={slot.height}
          sizes={slot.sizes}
          priority={priority}
          style={{ objectPosition: slot.objectPosition }}
        />
      </div>
    </section>
  );
}
