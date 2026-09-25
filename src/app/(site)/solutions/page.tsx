import Link from "next/link";
import { Photo } from "@/components/site/Photo";
import { StepPath } from "@/components/site/StepPath";
import { StructuredData } from "@/components/site/StructuredData";
import { Wave } from "@/components/site/Wave";
import { KINDRED_GRADIENTS } from "@/lib/kindred-gradients";
import { SERVICE_IDS } from "@/lib/schema";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/solutions/";
const TITLE = "Staffing Solutions";
const DESCRIPTION =
  "Contract, per-diem, and direct-placement staffing for healthcare facilities. Tell us the unit, the shift, and the team, and we'll look for the professional who fits.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const SERVICES = [
  {
    title: "Contract staffing",
    body: "Longer-term placements for sustained coverage: professionals who join your team, learn your unit, and stay through the assignment.",
    bestFor: "Best for: seasonal census, leaves of absence, extended vacancies",
    href: "/solutions/contract-staffing",
    label: "More About Contract Staffing\u00a0→",
    ink: "text-k-sky-ink",
    glyph: KINDRED_GRADIENTS["sky-violet"],
    square: false,
    offset: "",
  },
  {
    title: "Per-diem staffing",
    body: "Shift-by-shift coverage: you tell us the gap, we look for the match, you confirm it.",
    bestFor: "Best for: call-outs, census spikes, weekend and night gaps",
    href: "/solutions/per-diem-staffing",
    label: "More About Per-Diem Staffing\u00a0→",
    ink: "text-k-violet-ink",
    glyph: KINDRED_GRADIENTS["violet-sky"],
    square: true,
    offset: "lg:mt-12",
  },
  {
    title: "Direct placement",
    body: "Permanent hires selected for fit with your team, not just a resume that matches the requisition.",
    bestFor: "Best for: permanent roles, hard-to-fill specialties, leadership",
    href: "/solutions/direct-placement",
    label: "More About Direct Placement\u00a0→",
    ink: "text-k-teal-ink",
    glyph: KINDRED_GRADIENTS["teal-sky"],
    square: false,
    offset: "lg:mt-24",
  },
];

const STEPS = [
  {
    title: "Tell us the need",
    body: "Unit, shift, specialty, start date. Send what you have and we'll ask about the rest.",
  },
  {
    title: "We match for fit",
    body: "We look for a professional whose experience and availability fit what you described.",
  },
  {
    title: "You confirm",
    body: "Review the match, ask whatever you want to ask, and approve when you're ready.",
  },
  {
    title: "After the start date",
    body: "If something isn't working, tell us. We'd rather fix a placement than defend one.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <StructuredData
        path={PATH}
        title={documentTitle(TITLE)}
        description={DESCRIPTION}
        pageType="CollectionPage"
        aboutServices={[SERVICE_IDS.contract, SERVICE_IDS.perDiem, SERVICE_IDS.directPlacement]}
      />

      <section className="relative overflow-hidden">
        <div aria-hidden className="k-aura -left-60 -top-72 h-[640px] w-[640px]" />
        <div className="k-wrap relative grid items-center gap-12 pb-14 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pb-20 lg:pt-16">
          <div className="flex flex-col items-start gap-6">
            <p className="k-eyebrow text-k-sky-ink">Staffing Solutions · For facilities</p>
            <h1 className="k-h1">Staffing that fits how your facility runs.</h1>
            <p className="k-lede">Tell us the unit, the shift, and the team, and we&apos;ll look for the professional who fits.</p>
            <Link href="/contact" className="k-btn-primary mt-2">
              Request Staffing
            </Link>
          </div>
          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <div aria-hidden className="k-collage-ring -left-3 -top-5 w-[26%] lg:-left-8" />
            <Photo
              image="lobby"
              shape="arch"
              priority
              shadow
              className="aspect-[1/0.92] w-full"
              focus="92% 50%"
              sizes="(min-width: 1240px) 560px, (min-width: 1024px) 45vw, 92vw"
            />
          </div>
        </div>
      </section>

      <Wave top="var(--color-k-page)" bottom="var(--color-k-cloud)" />
      <section className="bg-k-cloud pb-[clamp(64px,8vw,112px)] pt-8">
        <div className="k-wrap">
          <div className="mb-12 flex max-w-[640px] flex-col items-start gap-4">
            <p className="k-eyebrow text-k-sky-ink">What we offer</p>
            <h2 className="k-h2">Flexible solutions built around your needs.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className={`k-panel flex flex-col items-start gap-4 bg-white p-8 shadow-[0_24px_60px_-42px_rgba(30,58,110,0.5)] sm:p-9 ${s.offset}`}
              >
                <span aria-hidden className={`k-glyph${s.square ? " k-glyph-sq" : ""}`} style={{ background: s.glyph }} />
                <h3 className="k-h3 text-[1.45rem]">{s.title}</h3>
                <p className="k-body">{s.body}</p>
                <p className="mt-auto rounded-2xl bg-k-cloud px-4 py-3 text-[14.5px] font-semibold leading-snug text-k-muted">
                  {s.bestFor}
                </p>
                <Link href={s.href} className={`k-arrow-link ${s.ink}`}>
                  {s.label}
                </Link>
              </article>
            ))}
          </div>
          <p className="k-body mt-12 max-w-[700px]">
            Every model draws on the same{" "}
            <Link href="/professionals" className="k-link">
              healthcare professionals we provide
            </Link>
            , from Certified Nursing Assistants and Licensed Vocational Nurses to Registered Nurses and therapy staff, and
            the same people-first way of working described on our{" "}
            <Link href="/about" className="k-link">
              About page
            </Link>
            .
          </p>
        </div>
      </section>
      <Wave top="var(--color-k-cloud)" bottom="var(--color-k-page)" flip />

      <section className="k-section">
        <div className="k-wrap">
          <div className="mb-12 flex max-w-[640px] flex-col items-start gap-4">
            <p className="k-eyebrow text-k-sky-ink">How it works</p>
            <h2 className="k-h2">From request to first shift.</h2>
          </div>
          <StepPath steps={STEPS} />
          <Link href="/solutions/staffing-request-checklist" className="k-arrow-link mt-10 text-k-sky-ink">
            See the Staffing Request Checklist&nbsp;→
          </Link>
        </div>
      </section>

      <section className="pb-[clamp(64px,8vw,124px)]">
        <div className="k-bleed k-bleed--flip">
          <Photo
            image="partnership"
            shape="bleed"
            className="k-bleed-media"
            focus="50% 35%"
            sizes="(min-width: 1024px) 54vw, 100vw"
          />
          <div className="k-bleed-copy flex flex-col items-start gap-5">
            <p className="k-eyebrow k-eyebrow-teal text-k-teal-ink">The difference</p>
            <h2 className="k-h2">A partner, not a portal.</h2>
            <p className="k-body">
              Staffing shouldn&apos;t create more work for your leadership team. We provide responsive, hands-on support
              to help you maintain coverage, strengthen your workforce, and keep your focus where it belongs: on quality
              care.
            </p>
            <Link href="/contact" className="k-btn-primary mt-2">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
