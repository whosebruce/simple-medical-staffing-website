import Image from "next/image";
import type { SiteImageSlot } from "@/lib/site-media";

export function WideBand({ slot }: { slot: SiteImageSlot }) {
  return (
    <div className="ks-wide">
      <Image
        src={slot.src}
        alt={slot.alt}
        width={slot.width}
        height={slot.height}
        sizes={slot.sizes}
        style={{ objectPosition: slot.objectPosition }}
      />
    </div>
  );
}
