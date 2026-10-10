"use client";

import { useEffect } from "react";

/**
 * Drives the scroll reveals declared with `data-reveal` (styles in globals.css).
 * Elements already on screen when the page loads are shown at once, so nothing visible ever blinks;
 * without JavaScript or with reduced motion, everything simply stays visible.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const fold = window.innerHeight * 0.92;
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    for (const el of elements) if (!el.classList.contains("is-in")) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return null;
}
