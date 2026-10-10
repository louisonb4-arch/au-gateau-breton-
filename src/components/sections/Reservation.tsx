import Image from "next/image";
import { Phone, Users } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import type { Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReservationForm } from "./ReservationForm";

export function Reservation({ lang, t }: { lang: Locale; t: Dictionary["reservation"] }) {
  return (
    <section id="reserver" className="bg-cream py-20 sm:py-28" aria-labelledby="reservation-title">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col">
          <SectionHeading id="reservation-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

          <div className="mt-10 space-y-4">
            <a
              href={restaurant.phone.href}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-bordeaux"
            >
              <span className="grid size-11 place-items-center rounded-full bg-bordeaux text-paper">
                <Phone className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">{t.phoneLead}</span>
                <span className="block font-serif text-2xl font-medium text-ink group-hover:text-bordeaux">
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
                <span className="block font-medium text-ink group-hover:text-bordeaux">{t.groupsLink} →</span>
              </span>
            </a>
          </div>

          <div className="relative mt-10 hidden flex-1 overflow-hidden rounded-3xl lg:block">
            <Image src="/images/terrasse-table.webp" alt="" fill sizes="35vw" className="object-cover" />
          </div>
        </div>

        <div className="min-w-0 rounded-[2rem] border border-line bg-paper p-5 shadow-[0_30px_80px_-40px_rgba(31,34,38,0.35)] sm:p-8 lg:p-10">
          <ReservationForm lang={lang} />
        </div>
      </div>
    </section>
  );
}
