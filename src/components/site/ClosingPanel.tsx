import Image from "next/image";
import type { ReactNode } from "react";
import { Circle } from "./Circle";

// Inset rounded navy panel that closes a page: one heading, one row of actions.
export function ClosingPanel({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return (
    <section className="pb-[clamp(56px,7vw,104px)] pt-4">
      <div className="k-wrap">
        <div className="k-closing k-on-dark px-6 py-16 text-center sm:px-12 sm:py-24">
          <Circle gradient="sky-violet" className="k-orb -bottom-56 -left-40 h-[440px] w-[440px] opacity-40" />
          <Circle gradient="teal-sky" className="k-orb -top-24 right-[6%] h-[220px] w-[220px] opacity-30" />
          <Image
            src="/kindred/logos/kindred-mark-white.svg"
            alt=""
            width={360}
            height={360}
            unoptimized
            className="k-watermark -bottom-24 -right-16 h-[300px] w-[300px] sm:h-[360px] sm:w-[360px]"
          />
          <h2 className="k-h2 mx-auto max-w-[19em] text-white">{heading}</h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">{children}</div>
        </div>
      </div>
    </section>
  );
}
