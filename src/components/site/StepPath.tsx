export type Step = { title: string; body: string };

const INKS = ["text-k-sky-ink", "text-k-violet-ink", "text-k-teal-ink", "text-k-navy"];

// Numbered steps joined by a curved line: a wave across four columns on wide
// screens, a straight gradient rail on narrow ones (and always, when vertical).
export function StepPath({ steps, start = 1, vertical = false }: { steps: readonly Step[]; start?: number; vertical?: boolean }) {
  return (
    <div className="relative">
      {vertical ? null : (
        <svg aria-hidden="true" focusable="false" className="k-steps-curve" viewBox="0 0 1000 52" preserveAspectRatio="none">
          <defs>
            <linearGradient id="k-steps-gradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#3fa5e8" />
              <stop offset="0.4" stopColor="#8c5fd4" />
              <stop offset="0.75" stopColor="#35b39b" />
              <stop offset="1" stopColor="#1e3a6e" />
            </linearGradient>
          </defs>
          <path
            d="M0 26C110 -6 220 58 333 26S556 -6 666 26S890 58 1000 26"
            fill="none"
            stroke="url(#k-steps-gradient)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
      <ol className={`k-steps${vertical ? " k-steps-vertical" : ""}`}>
        {steps.map((step, i) => (
          <li key={step.title} className="k-step">
            <span aria-hidden className={`k-step-num ${INKS[(start - 1 + i) % INKS.length]}`}>
              {start + i}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="k-h3">{step.title}</h3>
              <p className="k-small">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
