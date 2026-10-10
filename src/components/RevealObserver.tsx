"use client";

import { useEffect } from "react";

/**
 * Drives the scroll reveals declared with `data-reveal` (styles in globals.css).
 * Elements already on screen when the page loads are shown at once, so nothing visible ever blinks;
 * without JavaScript or with reduced motion, everything simply stays visible.
 * Also turns on smooth in-page scrolling once the initial (deep-link) scroll is done.
 */
export function RevealObserver() {
  useEffect(() => {
    const enableSmoothScroll = () =>
      requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add("smooth-scroll")));
    if (document.readyState === "complete") enableSmoothScroll();
    else window.addEventListener("load", enableSmoothScroll, { once: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    // On phones the fixed call/book bar covers the bottom of the screen: count only what is above it.
    const bar = document.querySelector<HTMLElement>("[data-mobile-bar]");
    const visibleBottom = bar && getComputedStyle(bar).display !== "none" ? bar.getBoundingClientRect().top : window.innerHeight;
    const fold = visibleBottom - window.innerHeight * 0.08;
    for (const el of elements) {
      if (el.getBoundingClientRect().top < fold) el.classList.add("is-in");
    }
    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      // threshold 0: tall blocks (the booking card on a phone) reveal as soon as they cross the line.
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    for (const el of elements) if (!el.classList.contains("is-in")) observer.observe(el);

    // Keyboard users must never focus something that is still invisible.
    const onFocusIn = (e: FocusEvent) => {
      const block = (e.target as Element | null)?.closest?.("[data-reveal]");
      if (block) {
        block.classList.add("is-in");
        observer.unobserve(block);
      }
    };
    document.addEventListener("focusin", onFocusIn);

    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("load", enableSmoothScroll);
    };
  }, []);

  return null;
}
