import { Check, Mail, Phone } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import { stagger } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Groups({ t }: { t: Dictionary["groups"] }) {
  const mailto = `mailto:${restaurant.email}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody)}`;
  return (
    <section id="groupes" className="relative overflow-hidden bg-bordeaux py-24 sm:py-32" aria-labelledby="groups-title">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -bottom-28 font-display text-[30rem] leading-none text-paper/[0.05] select-none"
      >
        20
      </span>
      <div className="container-site relative grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <SectionHeading id="groups-title" tone="light" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <div data-reveal style={stagger(3)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={mailto} variant="light" size="lg">
              <Mail className="size-4" /> {t.cta}
            </ButtonLink>
            <ButtonLink href={restaurant.phone.href} variant="ghost" size="lg">
              <Phone className="size-4" /> {restaurant.phone.display}
            </ButtonLink>
          </div>
        </div>
        <ul className="divide-y divide-paper/15 border-y border-paper/15">
          {t.points.map((p, i) => (
            <li key={p} data-reveal style={stagger(i)} className="flex items-center gap-5 py-5 text-[1.2rem] text-paper">
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-brass-light/40 text-brass-light">
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
