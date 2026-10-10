import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Story({ t }: { t: Dictionary }) {
  const s = t.story;
  return (
    <section id="histoire" className="bg-paper py-20 sm:py-28" aria-labelledby="story-title">
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading id="story-title" eyebrow={s.eyebrow} title={s.title} />
          <figure className="mt-10">
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-line">
              <Image
                src="/images/facade.webp"
                alt={t.hero.facadeAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs tracking-wide text-muted">{t.hero.facadeAlt}</figcaption>
          </figure>
        </div>

        <div className="lg:pt-24">
          <ol className="relative space-y-12 border-l border-line pl-8 sm:pl-10">
            {s.steps.map((step) => (
              <li key={step.year} className="relative">
                <span className="absolute top-2 -left-[calc(2rem+5px)] size-2.5 rounded-full bg-bordeaux ring-4 ring-paper sm:-left-[calc(2.5rem+5px)]" />
                <p className="font-serif text-3xl font-medium text-brass italic">{step.year}</p>
                <h3 className="mt-2 text-xl font-medium text-ink">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <blockquote className="mt-14 rounded-3xl bg-cream p-8 sm:p-10">
            <p className="font-serif text-2xl leading-snug text-ink italic">{s.quote}</p>
            <footer className="mt-4 text-sm text-muted">— {s.quoteAuthor}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
