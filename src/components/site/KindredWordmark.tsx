// The company wordmark (Bruce, 2026-10-22: "lets go with workforce solutions"): SIMPLE MEDICAL, a teal
// rule, then WORKFORCE SOLUTIONS spaced out under it, as on the approved facility flyer and the Kindred
// documents. It is live text beside the mark, never public/kindred/logos/kindred-lockup-white.svg
// (STAFFING is baked into its paths). The caller sets the size and colour of the top line with
// `className` (`text-[17px] text-k-navy`); the rule and the second line scale from it in em, in the
// print lockup's proportions.
export function KindredWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-stretch font-display uppercase leading-none ${className}`}>
      <span className="whitespace-nowrap font-extrabold tracking-[0.01em]">Simple Medical</span>
      <span aria-hidden className="mt-[0.22em] h-[max(1.5px,0.09em)] bg-k-teal" />
      {/* The negative right margin takes back the spacing after the last letter, so the rule ends with the text. */}
      <span className="mr-[-0.26em] mt-[0.42em] whitespace-nowrap text-[0.53em] font-bold tracking-[0.26em]">
        {" "}
        Workforce Solutions
      </span>
    </span>
  );
}
