import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { ClosingPanel } from "./ClosingPanel";
import { EmailText } from "./EmailText";
import { Photo } from "./Photo";
import { RoleCloud } from "./RoleCloud";
import { StepPath, type Step } from "./StepPath";
import { Wave } from "./Wave";
import { BUSINESS_FACTS } from "@/lib/brand";
import { KINDRED_GRADIENTS } from "@/lib/kindred-gradients";
import type { SiteImageKey } from "@/lib/site-media";

// Shared composition for the facility-facing service pages under /solutions/:
// split hero with a photo, prose beside a sticky aside, the curved step path,
// two related options and the closing panel. Each page supplies its own prose.

export type ServiceSection = {
  eyebrow: string;
  heading: string;
  body: ReactNode;
};

export type ServiceStep = Step;

const RELATED_TONES = [
  { panel: "bg-k-violet-tint", ink: "text-k-violet-ink", glyph: KINDRED_GRADIENTS["violet-sky"] },
  { panel: "bg-k-teal-tint", ink: "text-k-teal-ink", glyph: KINDRED_GRADIENTS["teal-sky"] },
];

export function ServicePage({
  path,
  eyebrow,
  heading,
  lede,
  image,
  imageFocus,
  sections,
  bestFor,
  steps,
  related,
  closing,
}: {
  path: string;
  eyebrow: string;
  heading: string;
  lede: string;
  image: SiteImageKey;
  imageFocus?: string;
  sections: ServiceSection[];
  bestFor: { heading: string; items: string[] };
  steps: { heading: string; intro: string; items: ServiceStep[] };
  related: { heading: string; items: { href: string; title: string; body: string; label: string }[] };
  closing: string;
}) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="k-aura -right-56 -top-72 h-[620px] w-[620px]" />
        <div className="k-wrap relative grid items-center gap-12 pb-14 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16 lg:pb-20 lg:pt-14">
          <div className="flex flex-col items-start gap-6">
            <Breadcrumbs path={path} />
            <p className="k-eyebrow text-k-sky-ink">{eyebrow}</p>
            <h1 className="k-h1 k-h1-long">{heading}</h1>
            <p className="k-lede">{lede}</p>
            <Link href="/contact" className="k-btn-primary mt-2">
              Request Staffing
            </Link>
          </div>
          <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
            <div aria-hidden className="k-collage-ring -bottom-6 -left-6 top-auto w-[24%]" />
            <Photo
              image={image}
              shape="leaf"
              priority
              shadow
              className="aspect-[1/0.86] w-full"
              focus={imageFocus}
              sizes="(min-width: 1240px) 520px, (min-width: 1024px) 42vw, 92vw"
            />
          </div>
        </div>
      </section>

      <section className="k-section pt-6">
        <div className="k-wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div className="flex flex-col gap-12">
            {sections.map((s, i) => (
              <div key={s.heading} className="flex max-w-[700px] flex-col items-start gap-4">
                <p className={`k-eyebrow ${i % 2 ? "k-eyebrow-violet text-k-violet-ink" : "text-k-sky-ink"}`}>{s.eyebrow}</p>
                <h2 className="k-h2 k-h2-sm">{s.heading}</h2>
                <div className="k-body flex flex-col gap-4">{s.body}</div>
              </div>
            ))}
          </div>
          <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[32px] bg-k-sky-tint p-7">
              <h2 className="k-h3">{bestFor.heading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {bestFor.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[16px] font-semibold text-k-navy">
                    <span aria-hidden className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: KINDRED_GRADIENTS["sky-violet"] }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] border border-k-line bg-white p-7">
              <h2 className="k-h3">Healthcare professionals we provide</h2>
              <RoleCloud small className="mt-4 gap-2" />
              <Link href="/professionals" className="k-arrow-link mt-3 text-k-violet-ink">
                See How It Works&nbsp;→
              </Link>
            </div>
            <div className="rounded-[32px] border border-k-line bg-white p-7">
              <h2 className="k-h3">Call or email</h2>
              <a
                href={`tel:${BUSINESS_FACTS.phone}`}
                className="k-focus mt-2 inline-flex min-h-11 items-center font-display text-xl font-extrabold text-k-navy underline decoration-k-sky decoration-2 underline-offset-[6px]"
              >
                {BUSINESS_FACTS.phone}
              </a>
              <p className="text-[15.5px] font-semibold text-k-navy">
                <EmailText />
              </p>
              <p className="k-small mt-1">{BUSINESS_FACTS.address}</p>
            </div>
          </aside>
        </div>
      </section>

      <Wave top="var(--color-k-page)" bottom="var(--color-k-cloud)" />
      <section className="bg-k-cloud pb-[clamp(64px,8vw,112px)] pt-8">
        <div className="k-wrap">
          <div className="mb-12 flex max-w-[660px] flex-col items-start gap-4">
            <p className="k-eyebrow text-k-sky-ink">How it works</p>
            <h2 className="k-h2">{steps.heading}</h2>
            <p className="k-body">{steps.intro}</p>
          </div>
          <StepPath steps={steps.items} />
          <p className="k-body mt-10">
            Not sure what to include?{" "}
            <Link href="/solutions/staffing-request-checklist" className="k-link">
              Read the staffing request checklist
            </Link>
            .
          </p>
        </div>
      </section>
      <Wave top="var(--color-k-cloud)" bottom="var(--color-k-page)" flip />

      <section className="k-section">
        <div className="k-wrap">
          <div className="mb-10 flex max-w-[640px] flex-col items-start gap-4">
            <p className="k-eyebrow k-eyebrow-teal text-k-teal-ink">Other ways to staff</p>
            <h2 className="k-h2">{related.heading}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {related.items.map((item, i) => {
              const tone = RELATED_TONES[i % RELATED_TONES.length];
              return (
                <article key={item.href} className={`k-panel flex flex-col items-start gap-4 p-8 sm:p-10 ${tone.panel}`}>
                  <span aria-hidden className="k-glyph h-11 w-11" style={{ background: tone.glyph }} />
                  <h3 className="k-h3 text-[1.35rem]">{item.title}</h3>
                  <p className="k-body">{item.body}</p>
                  <Link href={item.href} className={`k-arrow-link mt-auto ${tone.ink}`}>
                    {item.label}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ClosingPanel heading={closing}>
        <Link href="/contact" className="k-btn-primary">
          Request Staffing
        </Link>
        <Link href="/solutions" className="k-btn-on-dark">
          All Staffing Solutions
        </Link>
      </ClosingPanel>
    </>
  );
}
