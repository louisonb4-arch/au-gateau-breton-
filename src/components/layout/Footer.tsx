import type { Dictionary } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import { words } from "@/lib/rich";
import { Logo } from "./Logo";

export function Footer({ t }: { t: Dictionary }) {
  const year = new Date().getFullYear();
  const { address } = restaurant;
  return (
    <footer className="overflow-hidden bg-ink-deep pb-28 text-paper/70 sm:pb-0">
      <div className="container-site grid gap-12 pt-20 pb-14 font-sans md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-7 max-w-xs font-serif text-[1.45rem] leading-snug text-pretty text-paper italic">{t.footer.tagline}</p>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="mb-4 eyebrow text-brass-light">{t.info.address}</p>
          <address className="not-italic">
            {address.street}
            <br />
            {address.postalCode} {address.city}
          </address>
          <a href={restaurant.mapsUrl} target="_blank" rel="noopener" className="mt-1 inline-flex min-h-11 items-center text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
            {t.info.directions} ↗
          </a>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="mb-4 eyebrow text-brass-light">{t.info.contact}</p>
          <a href={restaurant.phone.href} className="flex min-h-11 items-center font-display text-[1.9rem] leading-none tracking-[0.03em] text-paper hover:text-brass-light">
            {restaurant.phone.display}
          </a>
          <a href={`mailto:${restaurant.email}`} className="flex min-h-11 items-center break-all hover:text-paper">
            {restaurant.email}
          </a>
        </div>
      </div>

      {/* The shop sign, one last time, across the whole width. */}
      <p
        aria-hidden
        data-reveal="words"
        className="title-caps container-site pt-2 pb-6 text-center text-[min(13.5vw,11.5rem)] leading-[0.85] whitespace-nowrap text-paper/[0.08] select-none words-tight"
      >
        {words(restaurant.name)}
      </p>

      <div className="border-t border-paper/10 font-sans">
        <div className="container-site flex flex-col gap-1 py-4 text-[13px] sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <p>
            © {year} {restaurant.name} — {t.footer.rights}
          </p>
          <a href="/mentions-legales" hrefLang="fr" className="inline-flex min-h-11 items-center hover:text-paper">
            {t.footer.legal}
          </a>
        </div>
      </div>
    </footer>
  );
}
