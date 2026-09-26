"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Staffing Solutions", href: "/solutions" },
  { label: "For Professionals", href: "/professionals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Mobile menu adds Home ahead of the four primary links.
const MENU_LINKS = [{ label: "Home", href: "/" }, ...NAV_LINKS] as const;

// TASK-20260923-14: the two audience parents reveal their child pages. Each
// parent stays a real link; a separate disclosure button opens its group (a
// panel from 1024px, an inline group in the menu below it). A group lists
// its pages, then its audience action on a separated row: Request Staffing
// for facilities, Apply Now for professionals only. Button names never say
// "menu" or "navigation" (the menu button owns those words).
type GroupId = "staffing" | "professionals";
type NavGroup = {
  readonly id: GroupId;
  readonly toggleLabel: string;
  readonly pages: readonly { readonly label: string; readonly href: string }[];
  readonly action: { readonly label: string; readonly href: string };
};

const NAV_GROUPS: Readonly<Record<string, NavGroup>> = {
  "/solutions": {
    id: "staffing",
    toggleLabel: "Staffing Solutions Pages",
    pages: [
      { label: "Contract Staffing", href: "/solutions/contract-staffing" },
      { label: "Per-Diem Staffing", href: "/solutions/per-diem-staffing" },
      { label: "Direct Placement", href: "/solutions/direct-placement" },
      { label: "Staffing Request Checklist", href: "/solutions/staffing-request-checklist" },
    ],
    action: { label: "Request Staffing", href: "/contact" },
  },
  "/professionals": {
    id: "professionals",
    toggleLabel: "For Professionals Pages",
    pages: [{ label: "Candidate FAQ", href: "/professionals/faq" }],
    action: { label: "Apply Now", href: "/apply" },
  },
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="M4 6.25 8 10.25l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The rows inside an open group: its pages, then the separated action row.
function GroupLinks({
  group,
  isCurrent,
  onNavigate,
  size,
}: {
  group: NavGroup;
  isCurrent: (href: string) => boolean;
  onNavigate: () => void;
  size: "panel" | "menu";
}) {
  const row =
    size === "panel"
      ? "k-focus flex min-h-11 items-center rounded-xl px-3.5 font-body text-[15px] font-bold text-k-navy"
      : "k-focus flex min-h-11 items-center rounded-xl px-4 font-body text-[16px] font-semibold text-k-navy";
  return (
    <>
      <ul className="flex flex-col gap-0.5">
        {group.pages.map((page) => (
          <li key={page.href}>
            <Link
              href={page.href}
              aria-current={isCurrent(page.href) ? "page" : undefined}
              onClick={onNavigate}
              className={`${row} ${isCurrent(page.href) ? "bg-k-sky-tint" : "hover:bg-k-cloud"}`}
            >
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
      <div data-nav-cta={group.id} className="mt-1.5 border-t border-k-line pt-1.5">
        <Link
          href={group.action.href}
          aria-current={isCurrent(group.action.href) ? "page" : undefined}
          onClick={onNavigate}
          className={`${row} justify-between gap-3 bg-k-sky-tint font-display font-extrabold hover:bg-k-cloud`}
        >
          {group.action.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<GroupId | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const groupRefs = useRef<Partial<Record<GroupId, HTMLDivElement | null>>>({});
  const groupToggleRefs = useRef<Partial<Record<GroupId, HTMLButtonElement | null>>>({});

  // The export serves trailing-slash paths; compare without the slash.
  const current = pathname.replace(/\/+$/, "") || "/";
  const isActive = (href: string) => (href === "/" ? current === "/" : current.startsWith(href));
  const isCurrent = (href: string) => current === href;

  const closeAll = () => {
    setOpen(false);
    setOpenGroup(null);
  };

  // A route change (link, back/forward, programmatic) closes everything.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setOpenGroup(null);
  }

  // Escape: in the menu it closes the whole menu and returns focus to its
  // button; from 1024px it closes the open panel, returning focus to that
  // panel's button when focus was inside the group.
  useEffect(() => {
    if (!open && !openGroup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) {
        setOpen(false);
        setOpenGroup(null);
        toggleRef.current?.focus();
        return;
      }
      if (openGroup) {
        const within = groupRefs.current[openGroup]?.contains(document.activeElement);
        setOpenGroup(null);
        if (within) groupToggleRefs.current[openGroup]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, openGroup]);

  // A press outside closes the menu (outside the header) or the open panel
  // (outside its group) without moving focus.
  useEffect(() => {
    if (!open && !openGroup) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (open) {
        // The menu button always renders, so its header is the menu's.
        if (!toggleRef.current?.closest("header")?.contains(target)) {
          setOpen(false);
          setOpenGroup(null);
        }
        return;
      }
      if (openGroup && !groupRefs.current[openGroup]?.contains(target)) setOpenGroup(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, openGroup]);

  // Crossing the 1024px breakpoint swaps the panel and menu layouts; reset.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const reset = () => {
      setOpen(false);
      setOpenGroup(null);
    };
    query.addEventListener("change", reset);
    return () => query.removeEventListener("change", reset);
  }, []);

  const toggleGroup = (id: GroupId) => setOpenGroup((g) => (g === id ? null : id));

  return (
    <header className="sticky top-0 z-50 border-b border-k-line/80 bg-k-page/90 backdrop-blur-md">
      <div className="k-wrap flex h-[76px] items-center gap-5">
        <Link
          href="/"
          aria-label="Simple Medical Staffing home"
          className="k-focus flex min-h-11 flex-none items-center gap-3 rounded-2xl"
          onClick={closeAll}
        >
          <Image src="/kindred/logos/kindred-mark.svg" alt="" width={44} height={44} unoptimized loading="eager" />
          <span className="font-display text-[15px] font-extrabold leading-[1.12] tracking-[0.01em] text-k-navy">
            Simple Medical
            <br />
            Staffing
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const group = NAV_GROUPS[link.href];
            const pill = `k-focus rounded-full py-2.5 font-body text-[15px] font-bold transition-colors ${
              isActive(link.href) ? "bg-k-sky-tint text-k-navy" : "text-k-navy hover:bg-k-cloud"
            }`;
            if (!group) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`${pill} px-3.5`}
                >
                  {link.label}
                </Link>
              );
            }
            const expanded = openGroup === group.id;
            return (
              <div
                key={link.href}
                ref={(el) => {
                  groupRefs.current[group.id] = el;
                }}
                data-nav-group={group.id}
                className="relative flex items-center"
                onBlur={(e) => {
                  // Focus moving to another element outside the group closes
                  // it; focus going nowhere (a click on an unfocusable row in
                  // some browsers) does not, so the click still lands.
                  const next = e.relatedTarget as Node | null;
                  if (next && !e.currentTarget.contains(next)) setOpenGroup((g) => (g === group.id ? null : g));
                }}
              >
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={closeAll}
                  className={`${pill} pl-3.5 pr-1`}
                >
                  {link.label}
                </Link>
                <button
                  ref={(el) => {
                    groupToggleRefs.current[group.id] = el;
                  }}
                  type="button"
                  aria-label={group.toggleLabel}
                  aria-expanded={expanded}
                  aria-controls={`nav-${group.id}`}
                  onClick={() => toggleGroup(group.id)}
                  className={`k-focus flex h-11 w-7 flex-none items-center justify-center rounded-full text-k-navy transition-colors ${
                    expanded ? "bg-k-sky-tint" : "hover:bg-k-cloud"
                  }`}
                >
                  <Chevron open={expanded} />
                </button>
                <div
                  id={`nav-${group.id}`}
                  className={`${expanded ? "block" : "hidden"} absolute left-0 top-full z-10 mt-4 w-[288px] rounded-2xl border border-k-line bg-k-page p-2 shadow-[0_24px_48px_-28px_rgba(30,58,110,0.45)]`}
                >
                  <GroupLinks group={group} isCurrent={isCurrent} onNavigate={closeAll} size="panel" />
                </div>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2.5 lg:ml-3">
          <Link href="/contact" className="k-btn-outline k-btn-sm hidden xl:inline-flex">
            Request Staffing
          </Link>
          <Link href="/apply" className="k-btn-primary k-btn-sm hidden sm:inline-flex">
            Apply Now
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close Navigation" : "Open Navigation"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => {
              setOpen((v) => !v);
              setOpenGroup(null);
            }}
            className="k-focus relative flex h-11 w-11 flex-none items-center justify-center rounded-full border border-k-line bg-white text-k-navy lg:hidden"
          >
            <span
              aria-hidden
              className={`absolute block h-0.5 w-[18px] rounded bg-current transition-transform ${open ? "rotate-45" : "-translate-y-[6px]"}`}
            />
            <span aria-hidden className={`absolute block h-0.5 w-[18px] rounded bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              aria-hidden
              className={`absolute block h-0.5 w-[18px] rounded bg-current transition-transform ${open ? "-rotate-45" : "translate-y-[6px]"}`}
            />
          </button>
        </div>
      </div>

      <nav
        id="site-menu"
        aria-label="Primary"
        className={`${open ? "block" : "hidden"} absolute inset-x-0 top-full max-h-[calc(100dvh-76px)] overflow-y-auto overscroll-contain border-b border-k-line bg-k-page shadow-[0_24px_48px_-28px_rgba(30,58,110,0.45)] lg:!hidden`}
      >
        <div className="k-wrap flex flex-col gap-1 pb-6 pt-3">
          {MENU_LINKS.map((link) => {
            const group = NAV_GROUPS[link.href];
            const row = (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={closeAll}
                className={`k-focus flex min-h-[52px] items-center rounded-2xl px-4 font-body text-[17px] font-bold ${group ? "flex-1" : ""} ${
                  isActive(link.href) ? "bg-k-sky-tint text-k-navy" : "text-k-navy hover:bg-k-cloud"
                }`}
              >
                {link.label}
              </Link>
            );
            if (!group) return row;
            const expanded = openGroup === group.id;
            return (
              <div key={link.href} data-menu-group={group.id}>
                <div className="flex items-stretch gap-1">
                  {row}
                  <button
                    type="button"
                    aria-label={group.toggleLabel}
                    aria-expanded={expanded}
                    aria-controls={`menu-${group.id}`}
                    onClick={() => toggleGroup(group.id)}
                    className={`k-focus flex h-[52px] w-[52px] flex-none items-center justify-center rounded-2xl text-k-navy transition-colors ${
                      expanded ? "bg-k-sky-tint" : "hover:bg-k-cloud"
                    }`}
                  >
                    <Chevron open={expanded} />
                  </button>
                </div>
                <div
                  id={`menu-${group.id}`}
                  className={`${expanded ? "block" : "hidden"} mb-1 ml-4 mt-1 border-l-2 border-k-line pl-3`}
                >
                  <GroupLinks group={group} isCurrent={isCurrent} onNavigate={closeAll} size="menu" />
                </div>
              </div>
            );
          })}
          <div className="mt-3 grid gap-2.5 min-[420px]:grid-cols-2">
            <Link href="/contact" onClick={closeAll} className="k-btn-outline">
              Request Staffing
            </Link>
            <Link href="/apply" onClick={closeAll} className="k-btn-primary">
              Apply Now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
