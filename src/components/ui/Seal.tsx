/** Circular "maison fondée en 1947" seal with slowly rotating text. */
export function Seal({ text, since, className = "" }: { text: string; since: string; className?: string }) {
  return (
    <div className={`relative grid size-32 place-items-center rounded-full bg-bordeaux text-paper shadow-xl ${className}`}>
      <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id="seal-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-current text-[9.4px] tracking-[0.14em] uppercase" style={{ fontFamily: "var(--font-sans)" }}>
          <textPath href="#seal-circle" textLength="288">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="text-center leading-none">
        <span className="block font-serif text-[11px] tracking-[0.2em] text-brass-light uppercase">{since}</span>
        <span className="mt-1 block font-serif text-3xl font-medium">1947</span>
      </div>
    </div>
  );
}
