import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="ks-scope flex min-h-screen flex-col bg-k-page font-body text-k-navy">
      <a
        href="#main"
        className="sr-only bg-k-navy px-4 py-2 font-semibold text-white focus:not-sr-only focus:absolute focus:z-[60]"
      >
        Skip to Content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
