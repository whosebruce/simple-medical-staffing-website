import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="k-scope flex min-h-screen flex-col bg-k-page font-body text-k-navy">
      <a
        href="#main"
        className="sr-only rounded-full bg-k-navy px-5 py-3 font-display text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:outline-3 focus:outline-offset-2 focus:outline-k-sky"
      >
        Skip to Content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 scroll-mt-20">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
