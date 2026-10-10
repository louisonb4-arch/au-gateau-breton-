import Image from "next/image";
import { Phone, Users } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import type { Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReservationForm } from "./ReservationForm";

export function Reservation({ lang, t }: { lang: Locale; t: Dictionary["reservation"] }) {
  return (
    <section id="reserver" className="bg-cream py-24 sm:py-32" aria-labelledby="reservation-title">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col">
          <SectionHeading id="reservation-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

          <div data-reveal className="mt-10 space-y-4 font-sans">
            <a
              href={restaurant.phone.href}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-bordeaux"
            >
              <span className="grid size-11 place-items-center rounded-full bg-bordeaux text-paper">
                <Phone className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">{t.phoneLead}</span>
                <span className="block font-display text-[2.2rem] leading-none tracking-[0.03em] text-ink transition-colors group-hover:text-bordeaux">
                  {restaurant.phone.display}
                </span>
              </span>
            </a>
            <a
              href="#groupes"
              className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-bordeaux"
            >
              <span className="grid size-11 place-items-center rounded-full bg-cream text-bordeaux">
                <Users className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">{t.groupsLead}</span>
                <span className="block font-medium text-ink group-hover:text-bordeaux">{t.groupsLink} →</span>
              </span>
            </a>
          </div>

          <div data-reveal="image" className="relative mt-10 hidden flex-1 overflow-hidden rounded-[1.75rem] lg:block">
            <Image src="/images/terrasse-table.webp" alt="" fill sizes="35vw" className="object-cover" />
          </div>
        </div>

        <div data-reveal className="min-w-0 rounded-[2rem] border border-line bg-paper p-5 shadow-[0_30px_80px_-40px_rgba(31,34,38,0.35)] sm:p-8 lg:p-10">
          <ReservationForm lang={lang} />
        </div>
      </div>
    </section>
  );
}
