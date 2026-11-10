import Image from "next/image";
import Link from "next/link";
import { EmailText } from "@/components/site/EmailText";
import { Photo } from "@/components/site/Photo";
import { StructuredData } from "@/components/site/StructuredData";
import { APP_LINKS } from "@/lib/app-links";
import { BUSINESS_FACTS } from "@/lib/brand";
import { KINDRED_GRADIENTS } from "@/lib/kindred-gradients";
import { documentTitle, pageMetadata } from "@/lib/seo";

// The facilities' counterpart of /apply/. Every Request Staff on the site goes straight to the web app's
// request form; this page gives that form an address on the main domain, with the phone and email as the
// other way in. It says nothing about what the form asks or how fast anyone answers, because the form lives
// in the app and can change without this page.
const PATH = "/request-staff/";
const TITLE = "Request Staff";
const DESCRIPTION =
  "Request healthcare staff from Simple Medical Workforce Solutions online, or reach our team by phone or email. Please do not send patient information or other sensitive documents.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function RequestStaffPage() {
  return (
    <section className="relative overflow-hidden">
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} />
      <div aria-hidden className="k-aura -left-56 -top-72 h-[680px] w-[680px]" />
      <div className="k-wrap relative grid items-center gap-12 pb-[clamp(64px,8vw,120px)] pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pt-14">
        <div className="flex flex-col gap-7 rounded-[clamp(32px,4vw,48px)] border border-k-line bg-white p-7 shadow-[0_30px_80px_-50px_rgba(30,58,110,0.55)] sm:p-12">
          <Image src="/kindred/logos/kindred-mark.svg" alt="" width={56} height={56} unoptimized />
          <div className="flex flex-col items-start gap-4">
            <p className="k-eyebrow text-k-sky-ink">Healthcare Facilities</p>
            <h1 className="k-h1 k-h1-long">Request Staff for Your Facility.</h1>
            <p className="k-body">
              Start your staffing request online. Send what you have and we&apos;ll ask about the rest.
            </p>
            <a href={APP_LINKS.requestStaff} className="k-btn-primary mt-1">
              Start Your Request
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="k-body">Prefer to talk first? Call or email our team.</p>
            <div className="k-hairlist border-y border-k-line">
              <div className="flex items-center gap-5 py-5">
                <span aria-hidden className="k-glyph hidden h-11 w-11 sm:block" style={{ background: KINDRED_GRADIENTS["sky-violet"] }} />
                <div className="flex min-w-0 flex-col items-start gap-1">
                  <p className="k-eyebrow k-eyebrow-plain text-k-muted">Call</p>
                  <a
                    href={`tel:${BUSINESS_FACTS.phoneTel}`}
                    className="k-focus inline-flex min-h-11 items-center font-display text-xl font-extrabold text-k-navy underline decoration-k-sky decoration-2 underline-offset-[6px]"
                  >
                    {BUSINESS_FACTS.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-5 py-5">
                <span
                  aria-hidden
                  className="k-glyph k-glyph-sq hidden h-11 w-11 rounded-[14px] sm:block"
                  style={{ background: KINDRED_GRADIENTS["teal-sky"] }}
                />
                <div className="flex min-w-0 flex-col items-start gap-1">
                  <p className="k-eyebrow k-eyebrow-plain text-k-muted">Email · Staffing Requests</p>
                  {/* Plain text: the site's one mailto link stays on /apply/. */}
                  <p className="flex min-h-11 items-center font-bold text-k-navy">
                    <EmailText />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="k-small rounded-[24px] bg-k-teal-tint px-5 py-4 text-k-navy">
            Please do not include patient information, medical records, or other sensitive documents in an email.
          </p>
          <p className="k-small">
            Not sure what to include?{" "}
            <Link href="/solutions/staffing-request-checklist" className="k-link">
              Read the staffing request checklist
            </Link>
            .
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div aria-hidden className="k-collage-ring -left-3 top-[10%] w-[30%] sm:-left-6" />
          {/* The crop keeps both people in the frame: they stand in the right half of a wide photograph. */}
          <Photo
            image="corridor"
            shape="arch"
            shadow
            className="aspect-[8/9] w-full"
            focus="94% 40%"
            sizes="(min-width: 1240px) 420px, (min-width: 1024px) 34vw, 90vw"
          />
        </div>
      </div>
    </section>
  );
}
