"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { House } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { menuTabs, type Dish, type MenuGroup } from "@/content/menu";
import type { Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

function DishRow({ dish, lang }: { dish: Dish; lang: Locale }) {
  return (
    <li className="py-4">
      <div className="flex items-baseline gap-3">
        <h4 className="font-medium text-ink">
          {dish.name[lang]}
          {dish.tag && (
            <span className="ml-2 inline-block translate-y-[-1px] rounded-full bg-brass/15 px-2 py-0.5 align-middle text-[10px] font-semibold tracking-[0.12em] text-[#7d5f33] uppercase">
              {dish.tag[lang]}
            </span>
          )}
        </h4>
        {dish.price && (
          <>
            <span aria-hidden className="min-w-6 flex-1 translate-y-[-4px] border-b border-dotted border-ink/25" />
            <span className="font-serif text-lg font-medium whitespace-nowrap text-bordeaux">{dish.price}</span>
          </>
        )}
      </div>
      {dish.description && <p className="mt-1 max-w-[46ch] text-sm leading-relaxed text-muted">{dish.description[lang]}</p>}
    </li>
  );
}

function Group({ group, lang }: { group: MenuGroup; lang: Locale }) {
  return (
    <div className="break-inside-avoid pb-10">
      <h3 className="flex items-center gap-4 font-serif text-2xl font-medium text-ink">
        {group.title[lang]}
        <span aria-hidden className="h-px flex-1 bg-line" />
      </h3>
      {group.note && <p className="mt-2 text-sm text-muted italic">{group.note[lang]}</p>}
      <ul className="mt-1 divide-y divide-line/70">
        {group.dishes.map((dish) => (
          <DishRow key={dish.name.fr} dish={dish} lang={lang} />
        ))}
      </ul>
    </div>
  );
}

export function MenuSection({ lang, t }: { lang: Locale; t: Dictionary["menu"] }) {
  const [active, setActive] = useState(menuTabs[0].id);
  const baseId = useId();

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + menuTabs.length) % menuTabs.length;
    setActive(menuTabs[next].id);
    document.getElementById(`${baseId}-tab-${menuTabs[next].id}`)?.focus();
  };

  return (
    <section id="carte" className="bg-paper py-20 sm:py-28" aria-labelledby="menu-title">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="menu-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <p className="flex items-center gap-2 text-sm font-medium text-bordeaux">
            <House className="size-4" /> {t.homemade}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={t.eyebrow}
          className="no-scrollbar -mx-4 mt-12 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
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
                className={`h-11 shrink-0 rounded-full px-5 text-sm font-medium transition-colors ${
                  selected ? "bg-ink text-paper" : "border border-line bg-paper text-slate hover:border-ink/40"
                }`}
              >
                {m.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Every panel stays in the HTML (hidden when inactive) so search engines index the whole menu. */}
        {menuTabs.map((tab) => (
          <div
            key={tab.id}
            id={`${baseId}-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${tab.id}`}
            hidden={tab.id !== active}
            className="mt-10 rounded-3xl border border-line bg-paper p-6 sm:p-10 lg:p-14"
          >
            {tab.intro && <p className="mb-10 max-w-xl font-serif text-xl text-slate italic">{tab.intro[lang]}</p>}
            <div className="gap-14 md:columns-2">
              {tab.groups.map((g) => (
                <Group key={g.title.fr} group={g} lang={lang} />
              ))}
            </div>
            {tab.footnotes && (
              <ul className="mt-2 space-y-1 border-t border-line pt-6 text-sm text-muted">
                {tab.footnotes.map((n) => (
                  <li key={n.fr}>— {n[lang]}</li>
                ))}
              </ul>
            )}
            <p className="mt-6 text-sm font-medium text-ink">{t.allergens}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
