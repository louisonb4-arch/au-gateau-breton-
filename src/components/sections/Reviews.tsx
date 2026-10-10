import { Star } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { proof, restaurant, reviews } from "@/content/restaurant";
import type { Locale } from "@/lib/i18n";
import { stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Reviews({ lang, t, proofT }: { lang: Locale; t: Dictionary["reviews"]; proofT: Dictionary["proof"] }) {
  const stars = Math.round(Number(proof.googleRating.replace(",", ".")));
  return (
    <section className="bg-cream py-24 sm:py-32" aria-labelledby="reviews-title">
      <div className="container-site">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="reviews-title" eyebrow={t.eyebrow} title={t.title} />
          <div data-reveal className="flex items-center gap-5">
            <span className="font-display text-[5.5rem] leading-[0.8] text-bordeaux">{proof.googleRating}</span>
            <span className="font-sans">
              <span className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`size-4 ${i < stars ? "fill-brass text-brass" : "text-brass"}`} />
                ))}
              </span>
              <span className="mt-1.5 block text-sm text-slate">
                {proof.googleCount} {proofT.reviews} {proofT.google}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure key={r.author} data-reveal style={stagger(i)} className="flex flex-col justify-between rounded-[1.75rem] bg-paper p-8 sm:p-10">
              <blockquote className="font-serif text-[1.55rem] leading-snug text-ink italic">
                <span aria-hidden className="mb-3 block font-serif text-6xl leading-[0.6] text-bordeaux not-italic">“</span>
                {r.quote[lang]}
              </blockquote>
              <figcaption className="mt-8 eyebrow text-muted">{r.author}</figcaption>
            </figure>
          ))}
        </div>

        {/* The reveal sits on a wrapper so it does not override the link's own hover transition. */}
        <div data-reveal className="mt-10">
          <a
            href={restaurant.reviewUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold text-bordeaux underline decoration-bordeaux/30 underline-offset-[6px] transition-[text-decoration-color] hover:decoration-bordeaux"
          >
            {t.leave}&nbsp;↗
          </a>
        </div>
      </div>
    </section>
  );
}
