import { CalendarDays, Phone } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import type { Locale } from "@/lib/i18n";

/** Sticky call / book bar — the two actions that matter on a phone. */
export function MobileBar({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  return (
    <div data-mobile-bar className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 font-sans pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <a
          href={restaurant.phone.href}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/20 px-5 text-sm font-medium text-ink"
        >
          <Phone className="size-4" />
          {t.call}
        </a>
        <a
          href={`${lang === "fr" ? "/" : "/en"}#reserver`}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bordeaux text-sm font-medium text-paper"
        >
          <CalendarDays className="size-4" />
          {t.book}
        </a>
      </div>
    </div>
  );
}
