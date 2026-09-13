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
    <header className="relative z-50 bg-k-navy">
      <div className="ks-wrap flex h-[68px] items-center gap-7 lg:h-[82px]">
        <Link
          href="/"
          className="ks-focus-on-navy flex min-h-11 flex-none items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/kindred/logos/kindred-mark-white.svg"
            alt=""
            width={40}
            height={40}
            sizes="40px"
          />
          <span className="font-display text-[15px] font-extrabold leading-[1.15] tracking-[0.02em] text-white">
            Simple Medical
            <br />
            Staffing
          </span>
          <span className="sr-only">Simple Medical Staffing home</span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`ks-focus-on-navy border-b-2 py-1 font-body text-[14.5px] font-bold transition-colors ${
                isActive(link.href)
                  ? "border-k-sky text-white"
                  : "border-transparent text-k-frost hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/apply"
            className="k-sky-fill ks-focus-on-navy px-5 py-2.5 font-display text-[15px] font-bold transition-colors"
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
          className="ks-focus-on-navy ml-auto flex h-11 w-11 flex-col items-center justify-center gap-1 border border-white/40 lg:hidden"
        >
          <span aria-hidden className="block h-0.5 w-[18px] bg-white" />
          <span aria-hidden className="block h-0.5 w-[18px] bg-white" />
          <span aria-hidden className="block h-0.5 w-[18px] bg-white" />
        </button>
      </div>

      <nav
        id="site-menu"
        aria-label="Primary"
        className={`${open ? "flex" : "hidden"} ks-wrap flex-col gap-1 bg-k-navy pb-5 pt-1 lg:!hidden`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={`ks-focus-on-navy flex min-h-11 items-center border-b border-l-[3px] border-b-white/20 py-3 pl-3 font-body text-[17px] font-semibold text-white ${
              isActive(link.href) ? "border-l-k-sky" : "border-l-transparent"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/apply"
          onClick={() => setOpen(false)}
          className="k-sky-fill ks-focus-on-navy mt-3 px-5 py-3.5 text-center font-display text-base font-bold transition-colors"
        >
          Apply now
        </Link>
      </nav>
    </header>
  );
}
