import { Fragment, type CSSProperties, type ReactNode } from "react";

/**
 * Turns `*word*` into an <em> accent and wraps every word in a mask so it can slide up
 * (see `.word` in globals.css).
 * Splits on ordinary spaces only, so French non-breaking spaces keep « : » and « ? » attached.
 */
export function words(text: string, start = 0): ReactNode {
  let index = start;
  return text.split(/\*(.+?)\*/g).map((part, k) => {
    const tokens = part
      .split(/( +)/)
      .filter(Boolean)
      .map((token, j) =>
        token.trim() === "" ? (
          " "
        ) : (
          <span key={j} className="word">
            <span style={{ "--i": index++ } as CSSProperties}>{token}</span>
          </span>
        ),
      );
    return k % 2 ? <em key={k}>{tokens}</em> : <Fragment key={k}>{tokens}</Fragment>;
  });
}
