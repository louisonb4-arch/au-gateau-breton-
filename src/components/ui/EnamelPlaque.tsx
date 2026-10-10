/**
 * The white enamel « RESTAURANT » plaque hanging on the façade: blue capitals, inset blue frame,
 * a small ornament at each end. Reproduced in CSS so it stays crisp.
 */
export function EnamelPlaque({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-[5px] bg-white px-1 py-1 shadow-[0_1px_0_rgba(0,0,0,0.06),0_6px_14px_-8px_rgba(38,70,124,0.45)] ${className}`}
    >
      <span className="flex items-center gap-2.5 rounded-[3px] border-[1.5px] border-email px-3 py-[3px]">
        <Ornament />
        <span className="font-display text-[1.25rem] leading-none tracking-[0.12em] text-email uppercase">{label}</span>
        <Ornament />
      </span>
    </span>
  );
}

function Ornament() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true" className="size-2 fill-email">
      <path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.8Z" />
    </svg>
  );
}
