import { Photo } from "@/components/site/Photo";
import { StructuredData } from "@/components/site/StructuredData";
import { Wave } from "@/components/site/Wave";
import { BUSINESS_FACTS } from "@/lib/brand";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/privacy/";
const TITLE = "Privacy";
const DESCRIPTION = "Privacy information for the Simple Medical Staffing public website.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function PrivacyPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} />
      <section className="relative overflow-hidden bg-k-cloud">
        <div aria-hidden className="k-aura -right-48 -top-64 h-[560px] w-[560px]" />
        <div className="k-wrap relative grid items-center gap-10 pb-10 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            <p className="k-eyebrow text-k-sky-ink">Privacy</p>
            <h1 className="k-h1 k-h1-long">Website Privacy Notice</h1>
            <p className="k-small">Effective September 2026</p>
          </div>
          <div className="relative">
            <div aria-hidden className="k-collage-ring -right-4 -top-6 left-auto z-10 w-[110px] sm:w-[140px]" />
            <Photo
              image="interior"
              shape="leaf"
              priority
              className="aspect-[16/9] w-full"
              focus="58% 50%"
              sizes="(min-width: 1240px) 520px, (min-width: 1024px) 42vw, 92vw"
            />
          </div>
        </div>
      </section>
      <Wave top="var(--color-k-cloud)" bottom="var(--color-k-page)" />

      <section className="pb-[clamp(64px,8vw,120px)] pt-6">
        <div className="k-wrap-narrow flex flex-col gap-10">
          <div className="k-marker">
            <h2 className="k-h3 text-[1.35rem]">A simple public website</h2>
            <p className="k-body mt-3">
              This website provides information about Simple Medical Staffing. It does not currently accept online
              applications, upload documents, create user accounts, or use advertising trackers.
            </p>
          </div>
          <div className="k-marker">
            <h2 className="k-h3 text-[1.35rem]">Information you choose to provide</h2>
            <p className="k-body mt-3">
              If you contact us by phone or email, we may use the information you provide to respond, discuss staffing or
              employment opportunities, maintain business records, and meet legal obligations. Do not send patient
              information, medical records, Social Security numbers, license images, or other sensitive documents through
              ordinary email.
            </p>
          </div>
          <div className="k-marker">
            <h2 className="k-h3 text-[1.35rem]">Website hosting</h2>
            <p className="k-body mt-3">
              Our website host may process basic technical information, such as an IP address, browser information, and
              request logs, to deliver and protect the website.
            </p>
          </div>
          <div className="k-marker">
            <h2 className="k-h3 text-[1.35rem]">Questions</h2>
            <p className="k-body mt-3">
              Call {BUSINESS_FACTS.phone} or email {BUSINESS_FACTS.email} with questions about this notice or the
              information you provided directly to Simple Medical Staffing.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
