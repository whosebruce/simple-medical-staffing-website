import { BUSINESS_FACTS } from "@/lib/brand";

// The contact address as plain text (never a mailto outside /apply/). A <wbr>
// after "@" gives narrow columns a clean place to wrap. `whole` is for an
// address inside a sentence, where that same break point splits it in the
// middle of a line: there it moves to the next line in one piece instead.
export function EmailText({ className = "", whole = false }: { className?: string; whole?: boolean }) {
  if (whole) return <span className={`whitespace-nowrap ${className}`}>{BUSINESS_FACTS.email}</span>;
  const [local, domain] = BUSINESS_FACTS.email.split("@");
  return (
    <span className={`k-email ${className}`}>
      {local}@<wbr />
      {domain}
    </span>
  );
}
