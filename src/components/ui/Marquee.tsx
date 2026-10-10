/** Slow ticker of the house's specialities, in the lettering of the shop sign. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-7 font-display text-[2.4rem] leading-none tracking-[0.04em] uppercase sm:text-[3rem]">{item}</span>
          <svg viewBox="0 0 10 10" aria-hidden="true" className="size-3 fill-brass-light">
            <path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.8Z" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-bordeaux-deep bg-bordeaux py-5 text-paper">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
