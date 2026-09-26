import Image from "next/image";
import Link from "next/link";
import { EmailText } from "@/components/site/EmailText";
import { Photo } from "@/components/site/Photo";
import { StructuredData } from "@/components/site/StructuredData";
import { BUSINESS_FACTS } from "@/lib/brand";
import { KINDRED_GRADIENTS } from "@/lib/kindred-gradients";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/apply/";
const TITLE = "Apply Now";
const DESCRIPTION =
  "Express interest in per-diem, contract, or permanent healthcare roles with Simple Medical Staffing by phone or email. Our online application is being rebuilt; please do not email sensitive documents.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function ApplyPage() {
  return (
    <section className="relative overflow-hidden">
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} />
      <div
        aria-hidden
        className="k-aura -left-56 -top-72 h-[680px] w-[680px] bg-[radial-gradient(circle_at_35%_35%,rgba(140,95,212,0.18),rgba(63,165,232,0.12)_45%,transparent_70%)]"
      />
      <div className="k-wrap relative grid items-center gap-12 pb-[clamp(64px,8vw,120px)] pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pt-14">
        <div className="flex flex-col gap-7 rounded-[clamp(32px,4vw,48px)] border border-k-line bg-white p-7 shadow-[0_30px_80px_-50px_rgba(30,58,110,0.55)] sm:p-12">
          <Image src="/kindred/logos/kindred-mark.svg" alt="" width={56} height={56} unoptimized />
          <div className="flex flex-col items-start gap-4">
            <p className="k-eyebrow k-eyebrow-violet text-k-violet-ink">Healthcare professionals</p>
            <h1 className="k-h1 k-h1-long">Let&apos;s talk about your next role.</h1>
            <p className="k-body">
              Our online application is being rebuilt. Call or email to express interest; please do not send application
              documents or sensitive records by email.
            </p>
          </div>
          <div className="k-hairlist border-y border-k-line">
            <div className="flex items-center gap-5 py-5">
              <span aria-hidden className="k-glyph hidden h-11 w-11 sm:block" style={{ background: KINDRED_GRADIENTS["sky-violet"] }} />
              <div className="flex min-w-0 flex-col items-start gap-1">
                <p className="k-eyebrow k-eyebrow-plain text-k-muted">Call</p>
                <a
                  href={`tel:${BUSINESS_FACTS.phone}`}
                  className="k-focus inline-flex min-h-11 items-center font-display text-xl font-extrabold text-k-navy underline decoration-k-sky decoration-2 underline-offset-[6px]"
                >
                  {BUSINESS_FACTS.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-5 py-5">
              <span
                aria-hidden
                className="k-glyph k-glyph-sq hidden h-11 w-11 rounded-[14px] sm:block"
                style={{ background: KINDRED_GRADIENTS["violet-sky"] }}
              />
              <div className="flex min-w-0 flex-col items-start gap-1">
                <p className="k-eyebrow k-eyebrow-plain text-k-muted">Email · Applications</p>
                {/* The one owner-authorized contact link on the public site: a static
                    mailto with no subject, body or query data (RESTORATION.md). */}
                <a
                  href={`mailto:${BUSINESS_FACTS.email}`}
                  className="k-focus inline-flex min-h-11 items-center font-bold text-k-navy underline decoration-k-violet decoration-2 underline-offset-[6px]"
                >
                  <EmailText />
                </a>
              </div>
            </div>
          </div>
          <p className="k-small rounded-[24px] bg-k-teal-tint px-5 py-4 text-k-navy">
            Please do not email medical records, Social Security numbers, license images, patient information, or other
            sensitive documents. A coordinator will explain the secure next steps when the new application process is
            ready.
          </p>
          <p className="k-small">
            Questions about the kinds of work, the roles we place, or what happens before your first day are answered in the{" "}
            <Link href="/professionals/faq" className="k-link">
              candidate FAQ
            </Link>
            .
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div aria-hidden className="k-collage-ring -right-6 top-[10%] left-auto w-[30%]" />
          <Photo
            image="ledge"
            shape="arch"
            shadow
            className="aspect-[3/4] w-full"
            focus="50% 20%"
            sizes="(min-width: 1240px) 420px, (min-width: 1024px) 34vw, 90vw"
          />
        </div>
      </div>
    </section>
  );
}
