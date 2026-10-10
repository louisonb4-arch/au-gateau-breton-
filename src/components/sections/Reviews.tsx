import { Star } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { proof, restaurant, reviews } from "@/content/restaurant";
import type { Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Reviews({ lang, t, proofT }: { lang: Locale; t: Dictionary["reviews"]; proofT: Dictionary["proof"] }) {
  const stars = Math.round(Number(proof.googleRating.replace(",", ".")));
  return (
    <section className="bg-cream py-20 sm:py-28" aria-labelledby="reviews-title">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="reviews-title" eyebrow={t.eyebrow} title={t.title} />
          <div className="flex items-center gap-4">
            <span className="font-serif text-5xl font-medium text-ink">{proof.googleRating}</span>
            <span>
              <span className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`size-4 ${i < stars ? "fill-brass text-brass" : "text-brass"}`} />
                ))}
              </span>
              <span className="mt-1 block text-sm text-muted">
                {proof.googleCount} {proofT.reviews} {proofT.google}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.author} className="flex flex-col justify-between rounded-3xl bg-paper p-8">
              <blockquote className="font-serif text-xl leading-snug text-ink">
                <span aria-hidden className="mb-2 block font-serif text-5xl leading-none text-brass">“</span>
                {r.quote[lang]}
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted">— {r.author}</figcaption>
            </figure>
          ))}
        </div>

        <a
          href={restaurant.reviewUrl}
          target="_blank"
          rel="noopener"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-bordeaux underline-offset-4 hover:underline"
        >
          {t.leave} ↗
        </a>
      </div>
    </section>
  );
}
