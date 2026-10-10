import Image from "next/image";
import { BedDouble, Phone } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import { stagger } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stay({ t }: { t: Dictionary["stay"] }) {
  return (
    <section id="chambre" className="bg-paper py-24 sm:py-32" aria-labelledby="stay-title">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div data-reveal="image" className="relative order-last aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-cream lg:order-first">
          <Image src="/images/chambre.webp" alt={t.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <SectionHeading id="stay-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <ul className="mt-8 flex flex-wrap gap-2 font-sans">
            {t.features.map((f, i) => (
              <li key={f} data-reveal style={stagger(i)} className="rounded-full border border-line px-4 py-2 text-sm text-slate">
                {f}
              </li>
            ))}
          </ul>
          <div data-reveal style={stagger(2)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`mailto:${restaurant.email}?subject=${encodeURIComponent(t.cta)}`} size="lg">
              <BedDouble className="size-4" /> {t.cta}
            </ButtonLink>
            <ButtonLink href={restaurant.phone.href} variant="outline" size="lg">
              <Phone className="size-4" /> {restaurant.phone.display}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
