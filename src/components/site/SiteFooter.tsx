import Link from "next/link";
import Image from "next/image";
import { BUSINESS_FACTS } from "@/lib/brand";
import { Circle } from "./Circle";

const EXPLORE = [
  { label: "Staffing Solutions", href: "/solutions" },
  { label: "Contract Staffing", href: "/solutions/contract-staffing" },
  { label: "Per-Diem Staffing", href: "/solutions/per-diem-staffing" },
  { label: "Direct Placement", href: "/solutions/direct-placement" },
  { label: "For Professionals", href: "/professionals" },
  { label: "Candidate FAQ", href: "/professionals/faq" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Apply Now", href: "/apply" },
  { label: "Privacy", href: "/privacy" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-k-navy font-body text-white">
      <Circle gradient="sky-violet" className="-top-40 right-[-140px] h-[380px] w-[380px] opacity-30" />
      <Circle gradient="teal-sky" className="right-[120px] top-[60px] h-[150px] w-[150px] opacity-20" />
      <div className="relative mx-auto max-w-6xl px-6 pb-9 pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/kindred/logos/kindred-mark.svg"
                alt=""
                width={56}
                height={56}
                unoptimized
                className="rounded-[12px] bg-white p-2"
              />
              <span className="font-display text-lg font-extrabold leading-tight">Simple Medical<br />Staffing</span>
            </div>
            <p className="font-display text-[15px] font-bold">
              &ldquo;{BUSINESS_FACTS.tagline}.&rdquo;
            </p>
            <p className="ks-small max-w-[300px] text-k-frost">
              Contract, per-diem, and direct-placement staffing for healthcare
              facilities.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col items-start gap-2">
            <h2 className="ks-eyebrow mb-1 text-k-mist">Explore</h2>
            {EXPLORE.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="ks-focus-on-navy py-1 text-[15px] font-semibold text-white transition-colors hover:text-k-mist"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-3">
            <h2 className="ks-eyebrow mb-1 text-k-mist">Get in Touch</h2>
            <address className="flex flex-col gap-2 text-[15px] not-italic leading-relaxed text-k-frost">
              <a
                href={`tel:${BUSINESS_FACTS.phone}`}
                className="ks-focus-on-navy font-semibold text-white underline-offset-4 hover:underline"
              >
                {BUSINESS_FACTS.phone}
              </a>
              <span className="font-semibold text-white">{BUSINESS_FACTS.email}</span>
              <span>{BUSINESS_FACTS.address}</span>
              <span>
                {BUSINESS_FACTS.website} · Instagram @{BUSINESS_FACTS.instagram}
              </span>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-white/25 pt-5 font-display text-xs font-semibold uppercase tracking-[0.1em] text-k-frost">
          <span>© 2026 {BUSINESS_FACTS.name}</span>
          <span>Healthcare staffing with a human connection</span>
        </div>
      </div>
    </footer>
  );
}
