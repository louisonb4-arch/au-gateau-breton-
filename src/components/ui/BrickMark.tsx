/** The staggered brick quoins framing the façade, reduced to a small brand mark. */
export function BrickMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 18" aria-hidden="true" className={`h-[18px] w-[14px] shrink-0 ${className}`} fill="currentColor">
      <rect x="0" y="0" width="14" height="4" rx="0.5" />
      <rect x="0" y="7" width="9" height="4" rx="0.5" />
      <rect x="0" y="14" width="14" height="4" rx="0.5" />
    </svg>
  );
}
