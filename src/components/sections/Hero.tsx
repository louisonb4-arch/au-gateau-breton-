import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { delay } from "@/lib/motion";
import { words } from "@/lib/rich";
import { ButtonLink } from "@/components/ui/Button";
import { EnamelPlaque } from "@/components/ui/EnamelPlaque";
import { Seal } from "@/components/ui/Seal";
import { OpenStatus } from "./OpenStatus";

// Arch: a semicircle on top of the 4:5 frame (50% of the width = 40% of the height), soft lower corners.
const ARCH = "rounded-[50%_50%_2rem_2rem/40%_40%_2rem_2rem]";

export function Hero({ lang, t }: { lang: Locale; t: Dictionary }) {
  const h = t.hero;
  const topWordCount = h.titleTop.split(" ").length;
  return (
    <section className="hero-in relative overflow-hidden bg-paper pt-[4.5rem]" aria-labelledby="hero-title">
      <div className="container-site grid items-center gap-14 pt-6 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-10 lg:pb-24">
        <div className="relative z-10">
          <div data-hero style={delay(0.05)} className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <EnamelPlaque label={h.plaque} />
            <span className="eyebrow text-slate">{h.eyebrow}</span>
          </div>

          <h1 id="hero-title" className="mt-6 lg:mt-7">
            {/* Sized on width and height, so the call to action stays on the first screen of a laptop. */}
            <span className="title-caps block text-[4.6rem] leading-[0.84] text-ink min-[400px]:text-[5.2rem] sm:text-[7.25rem] lg:text-[clamp(5.5rem,min(9.5vw,15svh),8.6rem)] [@media(max-height:700px)_and_(max-width:639px)]:text-[3.9rem]">
              {words(h.titleTop)}
            </span>
            <span className="mt-2 block font-serif text-[2.35rem] leading-[1.05] tracking-[-0.015em] text-balance text-bordeaux italic sm:text-[3.4rem] lg:text-[clamp(2.6rem,min(4.3vw,7svh),3.9rem)]">
              {words(h.titleBottom, topWordCount)}
            </span>
          </h1>

          <p data-hero style={delay(0.75)} className="mt-6 max-w-xl text-[1.2rem] leading-relaxed text-pretty text-slate sm:text-[1.32rem] lg:mt-7 [@media(max-height:700px)_and_(max-width:639px)]:text-[1.1rem] [@media(max-height:700px)_and_(max-width:639px)]:leading-normal">
            {h.lead}
          </p>
          <div data-hero style={delay(0.9)} className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-9 [@media(max-height:700px)_and_(max-width:639px)]:mt-6">
            <ButtonLink href="#reserver" size="lg">
              {h.ctaBook}
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="#carte" variant="outline" size="lg">
              {h.ctaMenu}
            </ButtonLink>
          </div>
          <div data-hero style={delay(1.05)} className="mt-6 lg:mt-7">
            <OpenStatus lang={lang} t={t.status} />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* The shadow lives on this wrapper: the unveil clip on the frame below would cut it. */}
          <div className={`${ARCH} shadow-[0_40px_80px_-40px_rgba(63,22,24,0.55)]`}>
            <div data-hero-image data-reveal="image" className={`relative aspect-[4/5] overflow-hidden bg-cream ${ARCH}`}>
              <Image
                src="/images/veranda.webp"
                alt={h.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 500px) 448px, 90vw"
                className="object-cover object-[50%_70%]"
              />
            </div>
          </div>
          <div
            data-hero
            style={delay(1.2)}
            className="absolute -bottom-7 -left-3 hidden w-40 rotate-[-3deg] overflow-hidden rounded-2xl border-[5px] border-paper shadow-xl sm:block lg:-left-12 lg:w-48"
          >
            <div className="relative aspect-[4/3]">
              <Image src="/images/facade.webp" alt={h.facadeAlt} fill sizes="200px" className="object-cover" />
            </div>
          </div>
          <div data-hero-pop className="absolute -top-4 right-0 sm:-right-4 lg:top-14 min-[1312px]:-right-10">
            <Seal text={h.seal} since={h.since} />
          </div>
        </div>
      </div>
    </section>
  );
}
