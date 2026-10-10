import { Accessibility, Mail, MapPin, Navigation, PawPrint, Phone, ShoppingBag, Snowflake, Sun, Wifi } from "lucide-react";
import type { ReactNode } from "react";
import type { Dictionary } from "@/content/dictionary";
import { amenities, payments, restaurant, type AmenityIcon } from "@/content/restaurant";
import type { Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HoursTable } from "./HoursTable";

const icons: Record<AmenityIcon, ReactNode> = {
  sun: <Sun className="size-4" />,
  snow: <Snowflake className="size-4" />,
  wifi: <Wifi className="size-4" />,
  access: <Accessibility className="size-4" />,
  paw: <PawPrint className="size-4" />,
  bag: <ShoppingBag className="size-4" />,
};

// Village + château in frame; OpenStreetMap sets no tracking cookies.
const { lat, lng } = restaurant.geo;
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008}%2C${lat - 0.0085}%2C${lng + 0.008}%2C${lat + 0.0025}&layer=mapnik&marker=${lat}%2C${lng}`;

function Card({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-line bg-paper p-6 sm:p-8 ${className}`}>
      <h3 className="mb-5 font-sans text-xs font-semibold tracking-[0.2em] text-bordeaux uppercase">{title}</h3>
      {children}
    </div>
  );
}

export function Practical({ lang, t }: { lang: Locale; t: Dictionary["info"] }) {
  const { address } = restaurant;
  return (
    <section id="infos" className="bg-paper py-20 sm:py-28" aria-labelledby="info-title">
      <div className="container-site">
        <SectionHeading id="info-title" eyebrow={t.eyebrow} title={t.title} />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.35fr]">
          <Card title={t.hours}>
            <HoursTable lang={lang} t={t} />
          </Card>

          <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-paper">
            <iframe
              title={`${restaurant.name} — ${address.city}`}
              src={mapSrc}
              loading="lazy"
              className="h-72 w-full grayscale-[35%] sepia-[15%] lg:h-auto lg:min-h-80 lg:flex-1"
            />
            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <h3 className="mb-3 font-sans text-xs font-semibold tracking-[0.2em] text-bordeaux uppercase">{t.address}</h3>
                <address className="flex gap-2 text-sm leading-relaxed text-ink not-italic">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-bordeaux" />
                  <span>
                    {address.street}
                    <br />
                    {address.postalCode} {address.city}
                  </span>
                </address>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t.access}</p>
              </div>
              <div>
                <h3 className="mb-3 font-sans text-xs font-semibold tracking-[0.2em] text-bordeaux uppercase">{t.contact}</h3>
                <a href={restaurant.phone.href} className="flex items-center gap-2 text-sm text-ink hover:text-bordeaux">
                  <Phone className="size-4 text-bordeaux" /> {restaurant.phone.display}
                </a>
                <a href={`mailto:${restaurant.email}`} className="mt-2 flex items-center gap-2 text-sm break-all text-ink hover:text-bordeaux">
                  <Mail className="size-4 shrink-0 text-bordeaux" /> {restaurant.email}
                </a>
                <ButtonLink href={restaurant.mapsUrl} target="_blank" rel="noopener" variant="outline" className="mt-5">
                  <Navigation className="size-4" /> {t.directions}
                </ButtonLink>
              </div>
            </div>
          </div>

          <Card title={t.amenities}>
            <ul className="grid grid-cols-2 gap-3">
              {amenities.map((a) => (
                <li key={a.icon} className="flex items-center gap-2.5 text-sm text-slate">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cream text-bordeaux">{icons[a.icon]}</span>
                  {a.label[lang]}
                </li>
              ))}
            </ul>
          </Card>

          <Card title={t.payments}>
            <ul className="flex flex-wrap gap-2">
              {payments.map((p) => (
                <li key={p.fr} className="rounded-full bg-cream px-3.5 py-1.5 text-sm text-slate">
                  {p[lang]}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
