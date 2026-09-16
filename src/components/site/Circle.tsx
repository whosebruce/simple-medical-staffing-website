
import { KINDRED_GRADIENTS, type KindredGradient } from "@/lib/kindred-gradients";

export function Circle({
  gradient,
  className,
}: {
  gradient: KindredGradient;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className ?? ""}`}
      style={{ background: KINDRED_GRADIENTS[gradient] }}
    />
  );
}
