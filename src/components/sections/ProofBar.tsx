import { Star } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { proof } from "@/content/restaurant";
import type { Locale } from "@/lib/i18n";
import { stagger } from "@/lib/motion";

/** Trust strip right under the hero: rating, awards, home-made promise. */
export function ProofBar({ lang, t }: { lang: Locale; t: Dictionary["proof"] }) {
  const items = [
    { big: proof.googleRating, title: t.google, sub: `${proof.googleCount} ${t.reviews}`, stars: true },
    ...proof.awards.map((a) => ({ big: a.year, title: a.title[lang], sub: a.source, stars: false })),
    { big: t.homemadeBig, title: t.homemade, sub: t.homemadeSub, stars: false },
  ];

  return (
    <div className="border-y border-line bg-cream/60">
      <ul className="container-site grid grid-cols-2 gap-y-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={item.title}
            data-reveal
            style={stagger(i)}
            className={`flex items-center gap-4 py-6 lg:justify-center lg:px-4 ${i > 0 ? "lg:border-l lg:border-line" : ""}`}
          >
            <span className="font-display text-[2.6rem] leading-none text-bordeaux">{item.big}</span>
            <span className="font-sans leading-tight">
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                {item.stars && <Star className="size-3.5 fill-brass text-brass" aria-hidden />}
                {item.title}
              </span>
              <span className="mt-0.5 block text-xs text-muted">{item.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
