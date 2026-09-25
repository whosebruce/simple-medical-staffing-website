import Link from "next/link";
import Image from "next/image";
import { BUSINESS_FACTS } from "@/lib/brand";
import { Circle } from "./Circle";
import { EmailText } from "./EmailText";
import { SocialLinks } from "./SocialLinks";

const COLUMNS = [
  {
    heading: "For Facilities",
    links: [
      { label: "Staffing Solutions", href: "/solutions" },
      { label: "Contract Staffing", href: "/solutions/contract-staffing" },
      { label: "Per-Diem Staffing", href: "/solutions/per-diem-staffing" },
      { label: "Direct Placement", href: "/solutions/direct-placement" },
      { label: "Staffing Request Checklist", href: "/solutions/staffing-request-checklist" },
      { label: "Request Staffing", href: "/contact" },
    ],
  },
  {
    heading: "For Professionals",
    links: [
      { label: "For Professionals", href: "/professionals" },
      { label: "Candidate FAQ", href: "/professionals/faq" },
      { label: "Apply Now", href: "/apply" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="k-footer k-on-dark font-body">
      <Circle gradient="sky-violet" className="k-orb -right-40 -top-48 h-[420px] w-[420px] opacity-25" />
      <Image
        src="/kindred/logos/kindred-mark-white.svg"
        alt=""
        width={520}
        height={520}
        unoptimized
        className="k-watermark -right-28 top-[34%] h-[380px] w-[380px] opacity-[0.05] sm:h-[480px] sm:w-[480px]"
      />
      <div className="k-wrap pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <Link href="/" className="k-focus flex items-center gap-3.5 rounded-2xl">
              <span className="flex h-14 w-14 flex-none items-center justify-center rounded-[18px] bg-white">
                <Image src="/kindred/logos/kindred-mark.svg" alt="" width={40} height={40} unoptimized />
              </span>
              <span className="font-display text-lg font-extrabold leading-tight">
                Simple Medical
                <br />
                Staffing
              </span>
            </Link>
            <p className="font-display text-[15.5px] font-bold text-white">&ldquo;{BUSINESS_FACTS.tagline}.&rdquo;</p>
            <p className="max-w-[340px] text-[15.5px] leading-relaxed text-k-frost">
              Contract, per-diem, and direct-placement staffing for healthcare facilities.
            </p>
            <div className="mt-2 w-full max-w-[380px] rounded-[28px] bg-white/[0.07] p-6 ring-1 ring-white/15">
              <h2 className="k-eyebrow k-eyebrow-teal text-k-mist">Get in Touch</h2>
              <address className="mt-3 flex flex-col gap-1.5 text-[15.5px] not-italic leading-relaxed text-k-frost">
                <a
                  href={`tel:${BUSINESS_FACTS.phone}`}
                  className="k-focus inline-flex min-h-11 items-center self-start font-display text-xl font-extrabold text-white underline decoration-white/30 decoration-2 underline-offset-[6px] hover:decoration-white"
                >
                  {BUSINESS_FACTS.phone}
                </a>
                <EmailText className="font-semibold text-white" />
                <span>{BUSINESS_FACTS.address}</span>
              </address>
              {/* TASK-20260923-14: icon links replace the plain-text
                  "domain · Instagram @handle" line. The domain was this
                  site's own address, so it is not repeated as a link. */}
              <div className="mt-4">
                <SocialLinks tone="dark" />
              </div>
            </div>
          </div>

          <div className="grid gap-x-6 gap-y-10 min-[400px]:grid-cols-2 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={`Footer: ${column.heading}`} className="flex flex-col items-start">
                <h2 className="k-eyebrow k-eyebrow-plain mb-2 text-[12px] tracking-[0.12em] text-k-mist">{column.heading}</h2>
                <ul className="flex flex-col">
                  {column.links.map((link) => (
                    <li key={`${column.heading}-${link.label}`}>
                      <Link href={link.href} className="k-footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-3 border-t border-white/20 py-7 text-[13.5px] leading-relaxed text-k-frost lg:grid-cols-[auto_auto_minmax(0,1fr)] lg:items-start lg:gap-10">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] lg:whitespace-nowrap">© 2026 {BUSINESS_FACTS.name}</p>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] lg:whitespace-nowrap">
            Healthcare staffing with a human connection
          </p>
          <p className="max-w-[460px] lg:justify-self-end lg:text-right">
            Images on this site are illustrative and do not show actual Simple Medical Staffing staff, healthcare
            professionals, or client facilities.
          </p>
        </div>
      </div>
    </footer>
  );
}
