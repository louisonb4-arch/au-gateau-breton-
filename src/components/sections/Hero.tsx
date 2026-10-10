import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { rich } from "@/lib/rich";
import { ButtonLink } from "@/components/ui/Button";
import { BrickMark } from "@/components/ui/BrickMark";
import { Seal } from "@/components/ui/Seal";
import { OpenStatus } from "./OpenStatus";

export function Hero({ lang, t }: { lang: Locale; t: Dictionary }) {
  const h = t.hero;
  return (
    <section className="relative overflow-hidden bg-cream pt-[4.5rem]" aria-labelledby="hero-title">
      <div className="container-site grid items-center gap-12 pt-10 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pt-16 lg:pb-24">
        <div>
          <OpenStatus lang={lang} t={t.status} />
          <p className="mt-8 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-bordeaux uppercase">
            <BrickMark />
            {h.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.85rem] leading-[0.98] font-medium tracking-[-0.025em] text-ink sm:text-6xl lg:text-[4.75rem] [&_em]:font-normal [&_em]:text-bordeaux [&_em]:italic"
          >
            {rich(h.title)}
          </h1>
          <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg">{h.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#reserver" size="lg">
              {h.ctaBook}
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="#carte" variant="outline" size="lg">
              {h.ctaMenu}
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl bg-line shadow-[0_30px_60px_-30px_rgba(74,17,27,0.45)]">
            <Image
              src="/images/veranda.webp"
              alt={h.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[50%_70%]"
            />
          </div>
          <div className="absolute -bottom-6 -left-2 hidden w-36 overflow-hidden rounded-2xl border-4 border-cream shadow-xl sm:block lg:-left-10 lg:w-44">
            <div className="relative aspect-[4/3]">
              <Image src="/images/facade.webp" alt={h.facadeAlt} fill sizes="180px" className="object-cover" />
            </div>
          </div>
          <div className="absolute -top-4 -right-2 sm:-right-6 lg:top-12 lg:-right-12">
            <Seal text={h.seal} since={h.since} />
          </div>
        </div>
      </div>
    </section>
  );
}
