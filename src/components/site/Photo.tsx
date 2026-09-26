import Image from "next/image";
import { SITE_IMAGES, type SiteImageKey } from "@/lib/site-media";

export type PhotoShape = "soft" | "arch" | "circle" | "leaf" | "bleed" | "none";

// A registry photograph inside a soft-masked frame. The frame sets the size
// (via className: width, height or aspect ratio); the image fills it with
// object-fit: cover at the image's registered focal point unless `focus`
// overrides it. Decorative repeats (collage insets) render with alt="".
export function Photo({
  image,
  sizes,
  shape = "soft",
  className = "",
  focus,
  priority = false,
  decorative = false,
  shadow = false,
  zoom,
}: {
  image: SiteImageKey;
  sizes: string;
  shape?: PhotoShape;
  className?: string;
  focus?: string;
  priority?: boolean;
  decorative?: boolean;
  shadow?: boolean;
  /** Optional scale (e.g. 1.6) about the focal point, for tight circular crops. */
  zoom?: number;
}) {
  const img = SITE_IMAGES[image];
  const shapeClass = shape === "none" || shape === "bleed" ? "" : ` k-frame-${shape}`;
  return (
    <div className={`k-frame${shapeClass}${shadow ? " k-shadow" : ""} ${className}`}>
      <Image
        src={img.src}
        alt={decorative ? "" : img.alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        style={{
          objectPosition: focus ?? img.focus,
          ...(zoom ? { transform: `scale(${zoom})`, transformOrigin: focus ?? img.focus } : null),
        }}
      />
    </div>
  );
}
