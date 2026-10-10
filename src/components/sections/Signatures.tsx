import type { ReactNode } from "react";
import Image from "next/image";
import { Award } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { proof } from "@/content/restaurant";
import type { Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

function PhotoCard({ src, alt, title, text, badge }: { src: string; alt: string; title: string; text: string; badge?: string }) {
  return (
    <article className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
      <div className="relative p-7 sm:p-9">
        {badge && <Badge>{badge}</Badge>}
        <h3 className="mt-3 text-2xl font-medium text-paper sm:text-3xl">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/80 sm:text-base">{text}</p>
      </div>
    </article>
  );
}

function TextCard({ tone, title, text, badge, mark }: { tone: "ink" | "bordeaux"; title: string; text: string; badge: string; mark: string }) {
  return (
    <article
      className={`relative flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-9 ${
        tone === "ink" ? "bg-ink" : "bg-bordeaux"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 -right-2 font-serif text-[9rem] leading-none font-semibold text-paper/[0.06] italic"
      >
        {mark}
      </span>
      <Badge>{badge}</Badge>
      <div className="relative">
        <h3 className="text-2xl font-medium text-paper sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/75 sm:text-base">{text}</p>
      </div>
    </article>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full border border-brass-light/40 bg-ink/30 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-brass-light uppercase backdrop-blur-sm">
      <Award className="size-3.5" />
      {children}
    </span>
  );
}

export function Signatures({ lang, t }: { lang: Locale; t: Dictionary["signatures"] }) {
  const { foieGras, beef, burger, far } = t.items;
  const [steakAward, foieGrasAward] = proof.awards;
  return (
    <section className="bg-cream py-20 sm:py-28" aria-labelledby="signatures-title">
      <div className="container-site">
        <SectionHeading id="signatures-title" eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr]">
          <PhotoCard
            src="/images/foie-gras.webp"
            alt={foieGras.alt}
            title={foieGras.title}
            text={foieGras.text}
            badge={`${foieGrasAward.title[lang]} · 2025`}
          />
          <TextCard tone="ink" title={beef.title} text={beef.text} badge={`${steakAward.title[lang]} · 2025`} mark="VBF" />
          <TextCard tone="bordeaux" title={far.title} text={far.text} badge={far.badge} mark="1947" />
          <PhotoCard src="/images/burger.webp" alt={burger.alt} title={burger.title} text={burger.text} />
        </div>
      </div>
    </section>
  );
}
