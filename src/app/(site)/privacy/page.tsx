import { BUSINESS_FACTS } from "@/lib/brand";

export const metadata = {
  title: "Privacy",
  description: "Privacy information for the Simple Medical Staffing public website.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <section className="ks-page ks-passage">
      <div className="ks-wrap-narrow">
        <p className="ks-eyebrow text-k-muted">Privacy</p>
        <h1 className="ks-h1 mt-3 text-k-navy">Website Privacy Notice</h1>
        <p className="ks-small mt-4 text-k-muted">Effective September 2026</p>

        <div className="mt-10 flex flex-col gap-8 text-k-muted">
          <div className="ks-col">
            <h2 className="ks-h3 text-k-navy">A simple public website</h2>
            <p className="ks-body mt-3">
              This website provides information about Simple Medical Staffing. It does not
              currently accept online applications, upload documents, create user accounts,
              or use advertising trackers.
            </p>
          </div>
          <div className="ks-col">
            <h2 className="ks-h3 text-k-navy">Information you choose to provide</h2>
            <p className="ks-body mt-3">
              If you contact us by phone or email, we may use the information you provide to
              respond, discuss staffing or employment opportunities, maintain business records,
              and meet legal obligations. Do not send patient information, medical records,
              Social Security numbers, license images, or other sensitive documents through
              ordinary email.
            </p>
          </div>
          <div className="ks-col">
            <h2 className="ks-h3 text-k-navy">Website hosting</h2>
            <p className="ks-body mt-3">
              Our website host may process basic technical information, such as an IP address,
              browser information, and request logs, to deliver and protect the website.
            </p>
          </div>
          <div className="ks-col">
            <h2 className="ks-h3 text-k-navy">Questions</h2>
            <p className="ks-body mt-3">
              Call {BUSINESS_FACTS.phone} or email {BUSINESS_FACTS.email} with questions about
              this notice or the information you provided directly to Simple Medical Staffing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
