import { restaurant } from "@/content/restaurant";

/** Wordmark: the O'GB monogram already used on the house's menus, with the full name. */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span
        className={`font-serif text-[1.65rem] leading-none font-semibold tracking-tight ${
          light ? "text-paper" : "text-bordeaux"
        }`}
      >
        O&rsquo;GB
      </span>
      <span
        className={`border-l pl-3 text-[10px] leading-tight font-medium tracking-[0.18em] uppercase ${
          light ? "border-paper/25 text-paper/80" : "border-ink/15 text-slate"
        }`}
      >
        {restaurant.name}
        <br />
        {restaurant.address.city}
      </span>
    </span>
  );
}
