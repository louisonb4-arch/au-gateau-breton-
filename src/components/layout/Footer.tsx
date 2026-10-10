import type { Dictionary } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import { Logo } from "./Logo";

export function Footer({ t }: { t: Dictionary }) {
  const year = new Date().getFullYear();
  const { address } = restaurant;
  return (
    <footer className="bg-ink pb-28 text-paper/70 sm:pb-0">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-xs font-serif text-xl leading-snug text-paper">{t.footer.tagline}</p>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-brass-light uppercase">{t.info.address}</p>
          <address className="not-italic">
            {address.street}
            <br />
            {address.postalCode} {address.city}
          </address>
          <a href={restaurant.mapsUrl} target="_blank" rel="noopener" className="mt-2 inline-block text-paper underline-offset-4 hover:underline">
            {t.info.directions} ↗
          </a>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-brass-light uppercase">{t.info.contact}</p>
          <a href={restaurant.phone.href} className="block text-paper hover:underline">
            {restaurant.phone.display}
          </a>
          <a href={`mailto:${restaurant.email}`} className="block break-all hover:text-paper">
            {restaurant.email}
          </a>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {restaurant.name} — {t.footer.rights}
          </p>
          <a href="/mentions-legales" hrefLang="fr" className="hover:text-paper">
            {t.footer.legal}
          </a>
        </div>
      </div>
    </footer>
  );
}
