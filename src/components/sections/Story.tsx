import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Story({ t }: { t: Dictionary }) {
  const s = t.story;
  return (
    <section id="histoire" className="bg-paper py-24 sm:py-32" aria-labelledby="story-title">
      <div className="container-site grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading id="story-title" eyebrow={s.eyebrow} title={s.title} />
          <figure className="mt-12">
            {/* overflow-clip (not hidden): a scroll container would capture the parallax view() timeline. */}
            <div data-reveal="image" className="relative aspect-[4/3] overflow-clip rounded-[1.75rem] bg-cream">
              <Image
                src="/images/facade.webp"
                alt={t.hero.facadeAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="parallax object-cover"
              />
            </div>
            <figcaption className="mt-4 font-serif text-base text-muted italic">{t.hero.facadeAlt}</figcaption>
          </figure>
        </div>

        <div className="lg:pt-28">
          <div className="relative">
            <span data-reveal="line" aria-hidden className="absolute top-3 bottom-3 left-0 w-px bg-line" />
            <ol className="space-y-14 pl-10 sm:pl-14">
              {s.steps.map((step, i) => (
                <li key={step.year} data-reveal style={stagger(i)} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-5 -left-10 size-2.5 -translate-x-1/2 rounded-full bg-bordeaux ring-[6px] ring-paper sm:-left-14"
                  />
                  <p className="font-display text-[3.6rem] leading-none tracking-[0.01em] text-brass uppercase">{step.year}</p>
                  <h3 className="mt-3 font-serif text-[1.6rem] leading-tight font-medium text-ink">{step.title}</h3>
                  <p className="mt-3 text-[1.15rem] leading-relaxed text-slate">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <blockquote data-reveal className="relative mt-16 overflow-hidden rounded-[1.75rem] bg-bordeaux px-8 py-10 text-paper sm:px-12">
            <span aria-hidden className="pointer-events-none absolute -top-14 -left-4 font-serif text-[11rem] leading-none text-paper/10">
              {s.quote.charAt(0)}
            </span>
            <p className="relative font-serif text-[1.65rem] leading-snug italic">{s.quote}</p>
            <footer className="relative mt-5 eyebrow text-brass-light">{s.quoteAuthor}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
