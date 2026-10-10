"use client";

import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import { localePath, type Locale } from "@/lib/i18n";
import { stagger } from "@/lib/motion";
import { buttonClass } from "@/components/ui/Button";
import { Logo } from "./Logo";

const SHOW_ABOVE = 240; // always visible near the top of the page
const DELTA = 6; // ignore the tiny deltas at the end of momentum / smooth scrolls

export function Header({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
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

  // Solid background once scrolled; slides away when reading down, comes back when scrolling up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      setScrolled(y > 12);
      if (y <= SHOW_ABOVE) setHidden(false);
      else if (dy > DELTA) setHidden(true);
      else if (dy < -DELTA) setHidden(false);
      // Only move the reference on real movement, so slow scrolls still add up.
      if (Math.abs(dy) > DELTA || y <= SHOW_ABOVE) lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: lock scrolling, make the page behind it inert, close on Escape.
  useEffect(() => {
    const behind = document.querySelectorAll<HTMLElement>("main, footer, [data-mobile-bar]");
    document.body.style.overflow = open ? "hidden" : "";
    behind.forEach((el) => (el.inert = open));
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !open) return;
      const focusInside = navRef.current?.contains(document.activeElement);
      setOpen(false);
      if (focusInside) toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      behind.forEach((el) => (el.inert = false));
    };
  }, [open]);

  // The mobile menu does not exist at the desktop breakpoint (rotated tablet, wider window): close it,
  // otherwise the page behind it would stay inert and locked.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onChange = () => desktop.matches && setOpen(false);
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  // After choosing a section in the menu, put focus on that section instead of losing it.
  const goTo = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  };

  return (
    <header
      onFocus={() => setHidden(false)}
      className={`fixed inset-x-0 top-0 z-40 font-sans transition-[translate,background-color,border-color] duration-500 ease-out-soft ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${scrolled || open ? "border-b border-line bg-paper/92 backdrop-blur-md" : "border-b border-transparent"}`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4 sm:gap-6">
        <a href={localePath[lang]} aria-label={`${restaurant.shortName} · ${restaurant.name}`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label={t.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[13px] font-medium tracking-[0.04em] text-slate">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={href(l.id)}
                  className="relative py-2 transition-colors after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-bordeaux after:transition-[scale] after:duration-500 after:ease-out-soft hover:text-bordeaux hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <a
            href={localePath[other]}
            hrefLang={other}
            lang={other}
            aria-label={t.switchLabel}
            className="grid h-11 min-w-11 place-items-center rounded-full px-2 text-xs font-semibold tracking-[0.18em] text-slate uppercase transition-colors hover:text-bordeaux"
          >
            {other}
          </a>
          <span className="hidden sm:block">
            <a href={href("reserver")} className={buttonClass("primary", "md")}>
              {t.book}
            </a>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="relative grid size-11 place-items-center rounded-full text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.open}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-current transition-[top,rotate] duration-500 ease-out-soft ${open ? "top-1/2 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-current transition-[top,rotate] duration-500 ease-out-soft ${open ? "top-1/2 -rotate-45" : "top-full"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={navRef}
        className={`grid overflow-hidden bg-paper transition-[grid-template-rows,opacity] duration-500 ease-out-soft lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
        inert={!open}
      >
        <div className="min-h-0">
          <nav aria-label={t.mobileNav} className="container-site flex h-[calc(100dvh-4.5rem-1px)] flex-col overflow-y-auto pt-4">
            <ul>
              {links.map((l, i) => (
                <li
                  key={l.id}
                  style={stagger(i)}
                  className={`border-b border-line transition-[opacity,translate] duration-700 ease-out-soft [transition-delay:calc(var(--i)*50ms+120ms)] ${
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <a
                    href={href(l.id)}
                    onClick={() => goTo(l.id)}
                    className="flex items-baseline justify-between py-4 [@media(max-height:700px)]:py-2.5"
                  >
                    <span className="font-display text-[2.6rem] leading-none tracking-[0.02em] text-ink uppercase [@media(max-height:700px)]:text-[2.1rem]">
                      {l.label}
                    </span>
                    <span aria-hidden className="font-serif text-2xl text-brass">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {/* Stays in view on short screens while the links scroll. */}
            <div className="sticky bottom-0 mt-auto grid gap-3 bg-paper pt-6 pb-6">
              <a href={href("reserver")} onClick={() => goTo("reserver")} className={buttonClass("primary", "lg", "w-full")}>
                {t.book}
              </a>
              <a href={restaurant.phone.href} className={buttonClass("outline", "lg", "w-full")}>
                <Phone className="size-4" /> {restaurant.phone.display}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
