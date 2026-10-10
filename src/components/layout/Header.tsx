"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import { localePath, type Locale } from "@/lib/i18n";
import { buttonClass } from "@/components/ui/Button";
import { Logo } from "./Logo";

export function Header({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const home = localePath[lang];
  const other: Locale = lang === "fr" ? "en" : "fr";
  const href = (id: string) => `${lang === "fr" ? "/" : "/en"}#${id}`;

  const links = [
    { id: "histoire", label: t.story },
    { id: "carte", label: t.menu },
    { id: "lieux", label: t.spaces },
    { id: "groupes", label: t.groups },
    { id: "chambre", label: t.stay },
    { id: "infos", label: t.info },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <a href={home} aria-label={`${restaurant.shortName} · ${restaurant.name}`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm text-slate">
            {links.map((l) => (
              <li key={l.id}>
                <a href={href(l.id)} className="transition-colors hover:text-bordeaux">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={localePath[other]}
            hrefLang={other}
            lang={other}
            aria-label={t.switchLabel}
            className="grid h-10 min-w-10 place-items-center rounded-full px-2 text-xs font-semibold tracking-widest text-slate uppercase transition-colors hover:text-bordeaux"
          >
            {other}
          </a>
          <span className="hidden sm:block">
            <a href={href("reserver")} className={buttonClass("primary", "md")}>
              {t.book}
            </a>
          </span>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-paper lg:hidden">
          <nav aria-label="Navigation mobile" className="container-site flex h-full flex-col pt-6 pb-10">
            <ul className="divide-y divide-line border-y border-line">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={href(l.id)}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 font-serif text-2xl text-ink"
                  >
                    {l.label}
                    <span aria-hidden className="text-brass">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto grid gap-3 pt-8">
              <a href={href("reserver")} onClick={() => setOpen(false)} className={buttonClass("primary", "lg", "w-full")}>
                {t.book}
              </a>
              <a href={restaurant.phone.href} className={buttonClass("outline", "lg", "w-full")}>
                <Phone className="size-4" /> {restaurant.phone.display}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
