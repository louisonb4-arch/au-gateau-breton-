import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { fontVariables } from "@/lib/fonts";
import { JsonLd } from "./JsonLd";
import { RevealObserver } from "./RevealObserver";

/** The <html> document shared by the French and English root layouts. */
export function RootDocument({ lang, children }: { lang: Locale; children: ReactNode }) {
  return (
    <html lang={lang} className={fontVariables}>
      <body>
        {children}
        <RevealObserver />
        <JsonLd />
      </body>
    </html>
  );
}
