// Decorative curved seam between two surfaces: the top colour is drawn as a
// soft wave over the bottom colour. Purely presentational.
export function Wave({ top, bottom, flip = false, className = "" }: { top: string; bottom: string; flip?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`k-wave ${className}`}
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      style={{ background: bottom, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path d="M0 0H1440V30C1180 64 940 68 720 44C500 20 260 6 0 36Z" fill={top} />
    </svg>
  );
}
