"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

const Star = () => (
  <svg viewBox="0 0 10 10" aria-hidden="true" className="size-3 shrink-0 fill-brass-light">
    <path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.8Z" />
  </svg>
);

/**
 * Slow ticker of the house's specialities, in the lettering of the shop sign.
 * Pausable (button, hover, keyboard focus); with reduced motion it becomes a static, wrapped line.
 */
export function Marquee({ items, labels }: { items: string[]; labels: { pause: string; play: string } }) {
  const [paused, setPaused] = useState(false);

  const row = (copy: boolean) => (
    <ul aria-hidden={copy || undefined} className={`flex shrink-0 items-center ${copy ? "motion-reduce:hidden" : "motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3"}`}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-7 font-display text-[2.4rem] leading-none tracking-[0.04em] whitespace-nowrap uppercase sm:text-[3rem]">{item}</span>
          <Star />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group/marquee relative overflow-hidden border-y border-bordeaux-deep bg-bordeaux py-5 text-paper">
      <div
        className={`flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:w-full ${
          paused ? "[animation-play-state:paused]" : ""
        }`}
      >
        {row(false)}
        {row(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? labels.play : labels.pause}
        className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-bordeaux-deep/80 text-paper opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100 motion-reduce:hidden"
      >
        {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
      </button>
    </div>
  );
}
