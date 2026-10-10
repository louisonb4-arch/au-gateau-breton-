import type { Metadata } from "next";
import "./globals.css";
import { buttonClass } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Page introuvable — Au Gâteau Breton",
  robots: { index: false },
};

// Served for any unmatched URL (the site has one root layout per language).
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontVariables}>
      <body>
        <main className="grid min-h-dvh place-items-center bg-cream px-4 text-center">
          <div>
            <a href="/" className="inline-block">
              <Logo />
            </a>
            <p className="mt-12 font-display text-[9rem] leading-none text-bordeaux">404</p>
            <h1 className="mt-4 font-serif text-3xl text-ink italic">Cette page n’est pas à la carte.</h1>
            <p className="mt-3 font-sans text-sm text-muted" lang="en">
              This page is not on the menu.
            </p>
            <a href="/" className={buttonClass("primary", "lg", "mt-10")}>
              Retour à l’accueil
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
