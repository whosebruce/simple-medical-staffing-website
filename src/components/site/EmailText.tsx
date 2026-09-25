import { BUSINESS_FACTS } from "@/lib/brand";

// The contact address as plain text (never a mailto outside /apply/). A <wbr>
// after "@" gives narrow columns a clean place to wrap.
export function EmailText({ className = "" }: { className?: string }) {
  const [local, domain] = BUSINESS_FACTS.email.split("@");
  return (
    <span className={`k-email ${className}`}>
      {local}@<wbr />
      {domain}
    </span>
  );
}
