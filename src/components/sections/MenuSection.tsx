"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { House } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { menuTabs, type Dish, type MenuGroup } from "@/content/menu";
import type { Locale } from "@/lib/i18n";
import { stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

function DishRow({ dish, lang, i }: { dish: Dish; lang: Locale; i: number }) {
  return (
    <li data-dish style={stagger(i)} className="py-4">
      <div className="flex items-baseline gap-3">
        <h4 className="font-serif text-[1.3rem] leading-snug font-medium text-ink">
          {dish.name[lang]}
          {dish.tag && (
            <span className="ml-2 inline-block -translate-y-0.5 rounded-full bg-brass/15 px-2 py-0.5 align-middle font-sans text-[11px] font-semibold tracking-[0.12em] text-[#7a5f17] uppercase">
              {dish.tag[lang]}
            </span>
          )}
        </h4>
        {dish.price && (
          <>
            <span aria-hidden className="min-w-6 flex-1 -translate-y-1 border-b border-dotted border-ink/30" />
            <span className="tnum font-serif text-[1.3rem] font-semibold whitespace-nowrap text-bordeaux">{dish.price}</span>
          </>
        )}
      </div>
      {dish.description && <p className="mt-1 max-w-[46ch] text-[1.05rem] leading-relaxed text-slate italic">{dish.description[lang]}</p>}
    </li>
  );
}

function Group({ group, lang, offset }: { group: MenuGroup; lang: Locale; offset: number }) {
  return (
    <div className="break-inside-avoid pb-12">
      <h3 data-dish style={stagger(offset)} className="flex items-center gap-4 font-display text-[2.3rem] leading-none tracking-[0.02em] text-ink uppercase">
        {group.title[lang]}
        <span aria-hidden className="h-px flex-1 bg-line" />
      </h3>
      {group.note && <p className="mt-2 text-base text-muted italic">{group.note[lang]}</p>}
      <ul className="mt-1 divide-y divide-line/80">
        {group.dishes.map((dish, i) => (
          <DishRow key={dish.name.fr} dish={dish} lang={lang} i={offset + i + 1} />
        ))}
      </ul>
    </div>
  );
}

export function MenuSection({ lang, t }: { lang: Locale; t: Dictionary["menu"] }) {
  const [active, setActive] = useState(menuTabs[0].id);
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  // The dark pill glides under the active tab.
  const measure = useCallback(() => {
    const tab = listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (tab) setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth });
  }, []);
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, active]);

  // On phones the strip scrolls sideways: keep the active tab centred in it (without moving the page).
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + menuTabs.length) % menuTabs.length;
    setActive(menuTabs[next].id);
    document.getElementById(`${baseId}-tab-${menuTabs[next].id}`)?.focus();
  };

  return (
    <section id="carte" className="bg-paper py-24 sm:py-32" aria-labelledby="menu-title">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="menu-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <p data-reveal className="flex items-center gap-2 font-sans text-sm font-semibold text-bordeaux">
            <House className="size-4" /> {t.homemade}
          </p>
        </div>

        <div
          ref={listRef}
          role="tablist"
          aria-label={t.eyebrow}
          className="no-scrollbar relative -mx-4 mt-14 flex gap-1 overflow-x-auto px-4 py-1 font-sans sm:mx-0 sm:w-fit sm:rounded-full sm:border sm:border-line sm:bg-cream/50 sm:p-1"
        >
          {indicator && (
            <span
              aria-hidden
              className="absolute top-1 bottom-1 hidden rounded-full bg-ink transition-[left,width] duration-500 ease-out-soft sm:block"
              style={{ left: indicator.left, width: indicator.width }}
            />
          )}
          {menuTabs.map((m, i) => {
            const selected = m.id === active;
            return (
              <button
                key={m.id}
                id={`${baseId}-tab-${m.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${m.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(m.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative z-10 h-11 shrink-0 rounded-full px-5 text-sm font-medium transition-colors duration-300 ${
                  selected
                    ? `border border-ink bg-ink text-paper sm:border-transparent ${indicator ? "sm:bg-transparent" : ""}`
                    : "border border-line text-slate hover:text-ink sm:border-transparent"
                }`}
              >
                {m.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Without JavaScript the tabs cannot switch, so every panel is shown. */}
        <noscript>
          <style>{'[role="tabpanel"][hidden]{display:block}[role="tablist"]{display:none}'}</style>
        </noscript>
        {/* Every panel stays in the HTML (hidden when inactive) so search engines index the whole menu. */}
        {menuTabs.map((tab) => {
          let offset = 0;
          return (
            <div
              key={tab.id}
              id={`${baseId}-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${tab.id}`}
              hidden={tab.id !== active}
              className="mt-8 rounded-[1.75rem] border border-line bg-paper p-6 shadow-[0_30px_60px_-50px_rgba(38,44,51,0.5)] sm:p-10 lg:p-14"
            >
              {tab.intro && (
                <p data-dish className="mb-10 max-w-xl font-serif text-[1.45rem] leading-snug text-pretty text-bordeaux italic">
                  {tab.intro[lang]}
                </p>
              )}
              <div className="gap-16 md:columns-2">
                {tab.groups.map((g) => {
                  const start = offset;
                  offset += g.dishes.length + 1;
                  return <Group key={g.title.fr} group={g} lang={lang} offset={start} />;
                })}
              </div>
              {tab.footnotes && (
                <ul className="mt-2 space-y-1 border-t border-line pt-6 font-sans text-sm text-muted">
                  {tab.footnotes.map((n) => (
                    <li key={n.fr}>— {n[lang]}</li>
                  ))}
                </ul>
              )}
              <p className="mt-6 font-sans text-sm font-medium text-ink">{t.allergens}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
