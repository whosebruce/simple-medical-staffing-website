"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";


const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Staffing Solutions", href: "/solutions" },
  { label: "For Professionals", href: "/professionals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative z-50 border-b border-k-line bg-k-page">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center gap-7 px-6">
        <Link
          href="/"
          className="flex min-h-11 flex-none items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-navy"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/kindred/logos/kindred-mark.svg"
            alt=""
            width={42}
            height={42}
          />
          <span className="font-display text-base font-extrabold leading-[1.15] tracking-[0.02em] text-k-navy">
            Simple Medical
            <br />
            Staffing
          </span>
          <span className="sr-only">Simple Medical Staffing home</span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center gap-6 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`border-b-2 py-1 font-body text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-navy ${
                isActive(link.href)
                  ? "border-k-sky text-k-sky-ink"
                  : "border-transparent text-k-navy hover:text-k-sky-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/apply"
            className="k-sky-fill rounded-[10px] px-5 py-2.5 font-display text-[15px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-navy"
          >
            Apply now
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-[10px] border border-k-line bg-k-cloud focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-navy lg:hidden"
        >
          <span aria-hidden className="block h-0.5 w-[18px] rounded bg-k-navy" />
          <span aria-hidden className="block h-0.5 w-[18px] rounded bg-k-navy" />
          <span aria-hidden className="block h-0.5 w-[18px] rounded bg-k-navy" />
        </button>
      </div>

      <nav
        id="site-menu"
        aria-label="Primary"
        className={`${open ? "flex" : "hidden"} flex-col gap-1 border-b border-k-line bg-k-page px-6 pb-5 pt-2 lg:!hidden`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={`flex min-h-11 items-center border-b border-k-cloud px-1 py-3 font-body text-[17px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-navy ${
              isActive(link.href) ? "text-k-sky-ink" : "text-k-navy"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/apply"
          onClick={() => setOpen(false)}
          className="k-sky-fill mt-3 rounded-[10px] px-5 py-3.5 text-center font-display text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-navy"
        >
          Apply now
        </Link>
      </nav>
    </header>
  );
}
