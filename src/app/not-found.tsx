import { buttonClass } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-cream px-4 text-center">
      <div>
        <a href="/" className="inline-block">
          <Logo />
        </a>
        <p className="mt-12 font-serif text-7xl font-medium text-bordeaux italic">404</p>
        <h1 className="mt-4 text-3xl font-medium text-ink">Cette page n&rsquo;est pas à la carte.</h1>
        <p className="mt-3 text-muted">This page is not on the menu.</p>
        <a href="/" className={buttonClass("primary", "lg", "mt-10")}>
          Retour à l&rsquo;accueil
        </a>
      </div>
    </main>
  );
}
