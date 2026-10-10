import { restaurant } from "@/content/restaurant";

/**
 * Wordmark: the « O’GB » monogram set in Garamond, as on the house's menus,
 * beside « Au Gâteau Breton » in the condensed capitals of the shop sign.
 */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span className={`font-serif text-[1.9rem] leading-none font-semibold tracking-[-0.02em] ${light ? "text-paper" : "text-bordeaux"}`}>
        {restaurant.shortName}
      </span>
      <span className={`h-8 w-px ${light ? "bg-paper/25" : "bg-ink/15"}`} aria-hidden="true" />
      <span className="leading-none">
        <span className={`block font-display text-[1.2rem] tracking-[0.06em] uppercase ${light ? "text-paper" : "text-ink"}`}>
          {restaurant.name}
        </span>
        <span className={`mt-1 block font-sans text-[9px] font-semibold tracking-[0.3em] uppercase ${light ? "text-paper/60" : "text-muted"}`}>
          {restaurant.address.city}
        </span>
      </span>
    </span>
  );
}
