import { Check, Mail, Phone } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Groups({ t }: { t: Dictionary["groups"] }) {
  const mailto = `mailto:${restaurant.email}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody)}`;
  return (
    <section id="groupes" className="relative overflow-hidden bg-bordeaux py-20 sm:py-28" aria-labelledby="groups-title">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-24 font-serif text-[22rem] leading-none font-semibold text-paper/[0.04] italic select-none"
      >
        20
      </span>
      <div className="container-site relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <SectionHeading id="groups-title" tone="light" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={mailto} variant="light" size="lg">
              <Mail className="size-4" /> {t.cta}
            </ButtonLink>
            <ButtonLink href={restaurant.phone.href} variant="ghost" size="lg">
              <Phone className="size-4" /> {restaurant.phone.display}
            </ButtonLink>
          </div>
        </div>
        <ul className="divide-y divide-paper/15 rounded-3xl border border-paper/15 bg-bordeaux-deep/40 px-6 backdrop-blur-sm sm:px-8">
          {t.points.map((p) => (
            <li key={p} className="flex items-center gap-4 py-5 text-paper">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-paper/10 text-brass-light">
                <Check className="size-4" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
