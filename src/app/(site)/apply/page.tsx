import Image from "next/image";
import { Circle } from "@/components/site/Circle";
import { BUSINESS_FACTS } from "@/lib/brand";

export const metadata = {
  title: "Apply Now",
  description: "Contact Simple Medical Staffing to discuss healthcare opportunities.",
  alternates: { canonical: "/apply/" },
};

export default function ApplyPage() {
  return (
    <section className="relative overflow-hidden bg-k-cloud">
      <Circle gradient="sky-violet" className="-top-44 left-[-160px] h-[420px] w-[420px] opacity-10" />
      <Circle gradient="teal-sky" className="-bottom-40 right-[-120px] h-[340px] w-[340px] opacity-10" />
      <div className="relative mx-auto max-w-[760px] px-6 py-10 sm:py-16">
        <div className="flex flex-col gap-6 rounded-[20px] border border-k-line bg-white p-7 shadow-[0_12px_40px_rgba(30,58,110,0.1)] sm:p-12">
          <Image src="/kindred/logos/kindred-mark.svg" alt="" width={56} height={56} />
          <div className="flex flex-col gap-3">
            <p className="k-eyebrow text-k-violet-ink">Healthcare professionals</p>
            <h1 className="font-display text-2xl font-extrabold leading-tight sm:text-[32px]">Let&apos;s talk about your next role.</h1>
            <p className="leading-relaxed text-k-muted">
              Our online application is being rebuilt. Call or email to express interest;
              please do not send application documents or sensitive records by email.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="k-card p-5">
              <p className="k-eyebrow text-k-muted">Call</p>
              <a href={`tel:${BUSINESS_FACTS.phone}`} className="ks-focus mt-3 inline-flex min-h-11 items-center font-display text-xl font-extrabold text-k-navy underline-offset-4 hover:underline">{BUSINESS_FACTS.phone}</a>
            </div>
            <div className="k-card p-5">
              <p className="k-eyebrow text-k-muted">Email · Applications</p>
              {/* The one owner-authorized contact link on the public site: a static
                  mailto with no subject, body or query data (RESTORATION.md). */}
              <a href={`mailto:${BUSINESS_FACTS.email}`} className="ks-focus mt-3 inline-flex min-h-11 items-center break-all font-semibold text-k-navy underline-offset-4 hover:underline">{BUSINESS_FACTS.email}</a>
            </div>
          </div>
          <p className="border-t border-k-line pt-5 text-sm leading-relaxed text-k-muted">
            Please do not email medical records, Social Security numbers, license images,
            patient information, or other sensitive documents. A coordinator will explain
            the secure next steps when the new application process is ready.
          </p>
        </div>
      </div>
    </section>
  );
}
