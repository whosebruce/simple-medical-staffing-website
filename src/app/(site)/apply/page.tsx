import { BUSINESS_FACTS } from "@/lib/brand";

export const metadata = {
  title: "Apply Now",
  description: "Contact Simple Medical Staffing to discuss healthcare opportunities.",
  alternates: { canonical: "/apply/" },
};

export default function ApplyPage() {
  return (
    <section className="ks-cloud ks-passage">
      <div className="ks-wrap-narrow">
        <div className="border border-k-line bg-white">
          <div className="ks-navy px-7 py-8 sm:px-11">
            <p className="ks-eyebrow ks-ink-professional">Healthcare professionals</p>
            <h1 className="ks-h2-band mt-3 text-white">Let&apos;s talk about your next role.</h1>
            <p className="ks-body ks-ink-on-navy mt-3 max-w-[52ch]">
              Our online application is being rebuilt. Call or email to express interest;
              please do not send application documents or sensitive records by email.
            </p>
          </div>

          <div className="grid gap-8 px-7 py-9 sm:px-11 md:grid-cols-2">
            <div className="ks-col ks-col-professional">
              <p className="ks-eyebrow text-k-muted">Call</p>
              <a
                href={`tel:${BUSINESS_FACTS.phone}`}
                className="ks-focus mt-3 inline-block font-display text-[24px] font-extrabold text-k-navy underline-offset-4 hover:underline"
              >
                {BUSINESS_FACTS.phone}
              </a>
            </div>
            <div className="ks-col ks-col-professional">
              <p className="ks-eyebrow text-k-muted">Email</p>
              <p className="ks-body mt-3 break-all font-bold text-k-navy">{BUSINESS_FACTS.email}</p>
            </div>
          </div>

          <div className="border-t border-k-line px-7 py-6 sm:px-11">
            <p className="ks-small text-k-muted">
              Please do not email medical records, Social Security numbers, license images,
              patient information, or other sensitive documents. A coordinator will explain
              the secure next steps when the new application process is ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
