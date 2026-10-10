import type { ReactNode } from "react";
import Image from "next/image";
import { Award } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import { proof } from "@/content/restaurant";
import type { Locale } from "@/lib/i18n";
import { stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full border border-brass-light/45 bg-ink/25 px-3 py-1 font-sans text-[10.5px] font-semibold tracking-[0.16em] text-brass-light uppercase backdrop-blur-sm">
      <Award className="size-3.5" />
      {children}
    </span>
  );
}

function PhotoCard({ i, src, alt, title, text, badge }: { i: number; src: string; alt: string; title: string; text: string; badge?: string }) {
  return (
    <article data-reveal style={stagger(i)} className="group relative flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/95 via-ink-deep/35 to-transparent" />
      <div className="relative p-7 transition-transform duration-700 ease-out-soft group-hover:-translate-y-1 sm:p-9">
        {badge && <Badge>{badge}</Badge>}
        <h3 className="mt-4 font-display text-[2.6rem] leading-[0.95] tracking-[0.01em] text-balance text-paper uppercase sm:text-[3rem]">{title}</h3>
        <p className="mt-3 max-w-md text-[1.1rem] leading-relaxed text-paper/80">{text}</p>
      </div>
    </article>
  );
}

function TextCard({ i, tone, title, text, badge, mark }: { i: number; tone: "ink" | "bordeaux"; title: string; text: string; badge: string; mark: string }) {
  return (
    <article
      data-reveal
      style={stagger(i)}
      className={`group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 sm:p-9 ${
        tone === "ink" ? "bg-ink" : "bg-bordeaux"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 -bottom-8 font-display text-[13rem] leading-none text-paper/[0.06] transition-transform duration-[1.4s] ease-out-soft group-hover:-translate-y-2"
      >
        {mark}
      </span>
      <Badge>{badge}</Badge>
      <div className="relative">
        <h3 className="font-display text-[2.6rem] leading-[0.95] tracking-[0.01em] text-balance text-paper uppercase sm:text-[3rem]">{title}</h3>
        <p className="mt-3 max-w-md text-[1.1rem] leading-relaxed text-paper/75">{text}</p>
      </div>
    </article>
  );
}

export function Signatures({ lang, t }: { lang: Locale; t: Dictionary["signatures"] }) {
  const { foieGras, beef, burger, far } = t.items;
  const [steakAward, foieGrasAward] = proof.awards;
  return (
    <section className="bg-cream py-24 sm:py-32" aria-labelledby="signatures-title">
      <div className="container-site">
        <SectionHeading id="signatures-title" eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr]">
          <PhotoCard
            i={0}
            src="/images/foie-gras.webp"
            alt={foieGras.alt}
            title={foieGras.title}
            text={foieGras.text}
            badge={`${foieGrasAward.title[lang]} · ${foieGrasAward.year}`}
          />
          <TextCard i={1} tone="ink" title={beef.title} text={beef.text} badge={`${steakAward.title[lang]} · ${steakAward.year}`} mark="VBF" />
          <TextCard i={0} tone="bordeaux" title={far.title} text={far.text} badge={far.badge} mark="1947" />
          <PhotoCard i={1} src="/images/burger.webp" alt={burger.alt} title={burger.title} text={burger.text} />
        </div>
      </div>
    </section>
  );
}
