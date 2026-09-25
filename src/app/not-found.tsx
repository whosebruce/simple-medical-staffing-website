import Link from "next/link";
import { Photo } from "@/components/site/Photo";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function NotFound() {
  return (
    <div className="k-scope flex min-h-screen flex-col bg-k-page font-body text-k-navy">
      <SiteHeader />
      <main id="main" className="relative flex flex-1 items-center overflow-hidden">
        <div aria-hidden className="k-aura -left-48 -top-56 h-[620px] w-[620px]" />
        <div className="k-wrap relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex max-w-xl flex-col items-start gap-5">
            <p className="k-eyebrow text-k-sky-ink">404</p>
            <h1 className="k-h1 k-h1-long">That page isn&apos;t here.</h1>
            <p className="k-body">
              Return to the Simple Medical Staffing website to find staffing and career information.
            </p>
            <Link href="/" className="k-btn-primary mt-2">
              Return Home
            </Link>
          </div>
          <div className="relative">
            <div aria-hidden className="k-collage-ring -left-6 -top-6 z-10 w-[120px]" />
            {/* Its own photograph: "interior" is the /privacy header. */}
            <Photo
              image="colleagues"
              shape="arch"
              className="aspect-[4/3] w-full"
              sizes="(min-width: 1240px) 580px, (min-width: 1024px) 46vw, 92vw"
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
