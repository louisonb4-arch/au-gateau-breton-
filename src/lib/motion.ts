import type { CSSProperties } from "react";

/** Stagger index for [data-reveal] and hero animations (read as var(--i) in globals.css). */
export const stagger = (i: number): CSSProperties => ({ "--i": i }) as CSSProperties;

/** Explicit delay for hero load animations (read as var(--d)). */
export const delay = (seconds: number): CSSProperties => ({ "--d": `${seconds}s` }) as CSSProperties;
