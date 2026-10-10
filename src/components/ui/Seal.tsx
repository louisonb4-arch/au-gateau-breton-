/** Circular "maison fondée en 1947" seal with slowly rotating text. */
export function Seal({ text, since, className = "" }: { text: string; since: string; className?: string }) {
  return (
    <div
      className={`relative grid size-32 place-items-center rounded-full bg-bordeaux text-paper shadow-[0_18px_40px_-16px_rgba(63,22,24,0.7)] ${className}`}
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="seal-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-current text-[8.6px] font-semibold tracking-[0.16em] uppercase" style={{ fontFamily: "var(--font-sans)" }}>
          <textPath href="#seal-circle" textLength="288">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[22px] rounded-full border border-paper/20" aria-hidden="true" />
      <div className="text-center leading-none">
        <span className="block font-serif text-[13px] text-brass-light italic">{since}</span>
        <span className="mt-0.5 block font-display text-[2.6rem] tracking-[0.02em]">1947</span>
      </div>
    </div>
  );
}
