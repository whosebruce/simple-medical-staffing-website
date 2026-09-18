import Link from "next/link";
import { breadcrumbTrail } from "@/lib/site-routes";

// Visible breadcrumb trail for nested pages. Matches the BreadcrumbList that
// StructuredData emits for the same path (same labels, same order).
export function Breadcrumbs({ path }: { path: string }) {
  const trail = breadcrumbTrail(path);
  return (
    <nav aria-label="Breadcrumb" className="font-body text-[14px] font-semibold text-k-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((route, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={route.path} className="flex items-center gap-x-2">
              {last ? (
                <span aria-current="page" className="text-k-navy">
                  {route.label}
                </span>
              ) : (
                <Link
                  href={route.path}
                  className="underline-offset-4 hover:text-k-navy hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-navy"
                >
                  {route.label}
                </Link>
              )}
              {last ? null : (
                <span aria-hidden className="text-k-faint">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
