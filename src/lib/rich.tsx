import { Fragment, type ReactNode } from "react";

/** Turns `*word*` into an <em> accent so titles can carry emphasis from plain content strings. */
export function rich(text: string): ReactNode {
  return text.split(/\*(.+?)\*/g).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>));
}
