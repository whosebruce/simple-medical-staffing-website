import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/components/site/Photo";
import { StructuredData } from "@/components/site/StructuredData";
import { KINDRED_GRADIENTS } from "@/lib/kindred-gradients";
import { documentTitle, pageMetadata } from "@/lib/seo";

// simplemedicalstaffing.com/app (Bruce, 2026-10-01): the address Dina and Rod give professionals for the app.
// The app itself will run at app.simplemedicalstaffing.com and on iPhone; until it opens this page says so and
// points to the ways to work with us today. At launch, add the App Store and "Open in Your Browser" links here
// (and list both outside URLs in scripts/verify-site.mjs, which refuses unlisted ones).

const PATH = "/app/";
const TITLE = "The App";
const DESCRIPTION =
  "The Simple Medical Staffing app for healthcare professionals is coming soon: open shifts with their pay, your schedule, clocking in and out, and what you earned each week.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const FEATURES = [
  "See open shifts and what they pay before you say yes.",
  "Pick up shifts and keep your schedule in one place.",
  "Clock in and out of your shifts.",
  "Know what you still need before you can work.",
  "See what you earned each week.",
] as const;

export default function AppPage() {
  return (
    <section className="relative overflow-hidden">
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} />
      <div
        aria-hidden
        className="k-aura -left-56 -top-72 h-[680px] w-[680px] bg-[radial-gradient(circle_at_35%_35%,rgba(63,165,232,0.18),rgba(140,95,212,0.12)_45%,transparent_70%)]"
      />
      <div className="k-wrap relative grid items-center gap-12 pb-[clamp(64px,8vw,120px)] pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pt-14">
        <div className="flex flex-col gap-7 rounded-[clamp(32px,4vw,48px)] border border-k-line bg-white p-7 shadow-[0_30px_80px_-50px_rgba(30,58,110,0.55)] sm:p-12">
          <Image src="/kindred/logos/kindred-mark.svg" alt="" width={56} height={56} unoptimized />
          <div className="flex flex-col items-start gap-4">
            <p className="k-eyebrow k-eyebrow-violet text-k-violet-ink">Coming soon</p>
            <h1 className="k-h1 k-h1-long">The Simple Medical Staffing app.</h1>
            <p className="k-body">
              Our app for healthcare professionals is almost ready. It will work on iPhone and in your web browser. When it
              opens, the links to get it will be right here on this page.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="k-eyebrow k-eyebrow-plain text-k-muted">What you&apos;ll be able to do</p>
            <ul className="k-hairlist border-y border-k-line">
              {FEATURES.map((feature, i) => (
                <li key={feature} className="flex items-center gap-5 py-4">
                  <span
                    aria-hidden
                    className="k-glyph h-3 w-3 shrink-0"
                    style={{ background: KINDRED_GRADIENTS[i % 2 === 0 ? "sky-violet" : "violet-sky"] }}
                  />
                  <span className="k-body text-k-navy">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-4">
            <p className="k-body">
              You don&apos;t have to wait for the app to work with us. Call or email our team today to get started.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/apply" className="k-btn-primary">
                Apply Now
              </Link>
              <Link href="/contact" className="k-btn-outline">
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div aria-hidden className="k-collage-ring -right-6 top-[10%] left-auto w-[30%]" />
          <Photo
            image="seated"
            shape="arch"
            shadow
            className="aspect-[3/4] w-full"
            focus="50% 24%"
            sizes="(min-width: 1240px) 420px, (min-width: 1024px) 34vw, 90vw"
          />
        </div>
      </div>
    </section>
  );
}
