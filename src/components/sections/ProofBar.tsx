import { Award, House, Star } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { proof } from "@/content/restaurant";
import type { Locale } from "@/lib/i18n";

/** Trust strip right under the hero: rating, awards, home-made promise. */
export function ProofBar({ lang, t }: { lang: Locale; t: Dictionary["proof"] }) {
  const items = [
    {
      icon: <Star className="size-5 fill-brass text-brass" />,
      title: `${proof.googleRating}/5 ${t.google}`,
      sub: `${proof.googleCount} ${t.reviews}`,
    },
    ...proof.awards.map((a) => ({
      icon: <Award className="size-5 text-bordeaux" />,
      title: a.title[lang],
      sub: a.source,
    })),
    { icon: <House className="size-5 text-bordeaux" />, title: t.homemade, sub: t.homemadeSub },
  ];

  return (
    <div className="border-y border-line bg-paper">
      <ul className="container-site grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
        {items.map((item) => (
          <li key={item.title} className="flex items-center gap-3.5 py-5 lg:justify-center lg:px-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream">{item.icon}</span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-ink">{item.title}</span>
              <span className="block text-xs text-muted">{item.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
