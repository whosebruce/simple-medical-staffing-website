import Link from "next/link";
import { Circle } from "@/components/site/Circle";
import { EmailText } from "@/components/site/EmailText";
import { Photo } from "@/components/site/Photo";
import { SocialLinks } from "@/components/site/SocialLinks";
import { StructuredData } from "@/components/site/StructuredData";
import { BUSINESS_FACTS } from "@/lib/brand";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/contact/";
const TITLE = "Contact";
const DESCRIPTION =
  "Call 949-317-2470 or email info@simplemedicalstaffing.com to request staffing or talk about your next role with Simple Medical Staffing in Irvine, CA.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function ContactPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} pageType="ContactPage" />

      <section className="relative overflow-hidden">
        <div aria-hidden className="k-aura -right-56 -top-72 h-[640px] w-[640px]" />
        <div className="k-wrap relative grid items-center gap-10 pb-12 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16 lg:pb-16 lg:pt-16">
          <div className="flex flex-col items-start gap-6">
            <p className="k-eyebrow text-k-sky-ink">Contact</p>
            <h1 className="k-h1">Tell us what you need.</h1>
            <p className="k-lede">
              Whether you&apos;re a facility or a professional, call or email directly. Short and plain is perfect.
            </p>
          </div>
          <div className="relative mx-auto aspect-[1/0.78] w-full max-w-[440px] lg:max-w-none">
            <div aria-hidden className="k-collage-ring left-[38%] top-0 w-[26%]" />
            <Photo
              image="station"
              shape="circle"
              priority
              shadow
              className="absolute bottom-0 left-0 w-[64%]"
              focus="40% 22%"
              zoom={1.25}
              sizes="(min-width: 1024px) 380px, 80vw"
            />
            <Photo
              image="hands"
              shape="circle"
              decorative
              className="absolute right-0 top-[6%] w-[44%] border-[6px] border-k-page"
              focus="48% 60%"
              sizes="(min-width: 1024px) 260px, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="pb-[clamp(64px,8vw,120px)]">
        <div className="k-wrap grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
          <div className="grid gap-6">
            <article className="k-panel flex flex-col items-start gap-4 bg-k-sky-tint p-8 sm:p-10">
              <p className="k-eyebrow text-k-sky-ink">I&apos;m a facility</p>
              <h2 className="k-h3 text-[1.5rem]">Requesting staffing?</h2>
              <p className="k-body">
                Call or email with the unit, the shift, the specialty, and the start date. That&apos;s everything we need to
                get started on a match.
              </p>
              <Link href="/solutions/staffing-request-checklist" className="k-arrow-link text-k-sky-ink">
                See the Staffing Request Checklist&nbsp;→
              </Link>
            </article>
            <article className="k-panel flex flex-col items-start gap-4 bg-k-violet-tint p-8 sm:p-10">
              <p className="k-eyebrow k-eyebrow-violet text-k-violet-ink">I&apos;m a professional</p>
              <h2 className="k-h3 text-[1.5rem]">Looking for your next role?</h2>
              <p className="k-body">
                Tell us the role you want, where you&apos;re located, and the type of schedule you&apos;re looking for.
                We&apos;ll talk through the next step.
              </p>
              <Link href="/apply" className="k-arrow-link text-k-violet-ink">
                See Application Options&nbsp;→
              </Link>
            </article>
          </div>

          <div className="grid gap-6">
            <div className="k-panel border border-k-line bg-white p-8 shadow-[0_30px_70px_-50px_rgba(30,58,110,0.55)] sm:p-10">
              <div className="flex flex-col gap-2">
                <h2 className="k-eyebrow text-k-sky-ink">Call or email</h2>
                <a
                  href={`tel:${BUSINESS_FACTS.phone}`}
                  className="k-focus inline-flex min-h-11 items-center self-start font-display text-[clamp(1.6rem,1.2rem+1.2vw,2.1rem)] font-extrabold text-k-navy underline decoration-k-sky decoration-[3px] underline-offset-[8px]"
                >
                  {BUSINESS_FACTS.phone}
                </a>
                <p className="text-[17px] font-semibold text-k-navy">
                  <EmailText />
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-2 border-t border-k-line pt-6">
                <h2 className="k-eyebrow k-eyebrow-violet text-k-violet-ink">Visit</h2>
                <p className="k-body">{BUSINESS_FACTS.address}</p>
              </div>
              <div className="mt-6 flex flex-col gap-2 border-t border-k-line pt-6">
                <h2 className="k-eyebrow k-eyebrow-teal text-k-teal-ink">Online</h2>
                <SocialLinks tone="light" />
              </div>
            </div>

            <div className="k-closing k-on-dark p-8 sm:p-10">
              <Circle gradient="sky-violet" className="k-orb -right-16 -top-20 h-[190px] w-[190px] opacity-40" />
              <div className="flex flex-col items-start gap-3">
                <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-k-mist">Ready to apply instead?</p>
                <p className="font-display text-xl font-bold text-white">Ready to talk about your next role?</p>
                <Link href="/apply" className="k-btn-primary mt-2">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
