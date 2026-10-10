import { dictionaries } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { Footer } from "@/components/layout/Footer";
import { Marquee } from "@/components/ui/Marquee";
import { Header } from "@/components/layout/Header";
import { MobileBar } from "@/components/layout/MobileBar";
import { Groups } from "@/components/sections/Groups";
import { Hero } from "@/components/sections/Hero";
import { MenuSection } from "@/components/sections/MenuSection";
import { Practical } from "@/components/sections/Practical";
import { ProofBar } from "@/components/sections/ProofBar";
import { Reservation } from "@/components/sections/Reservation";
import { Reviews } from "@/components/sections/Reviews";
import { Signatures } from "@/components/sections/Signatures";
import { Spaces } from "@/components/sections/Spaces";
import { Stay } from "@/components/sections/Stay";
import { Story } from "@/components/sections/Story";

/** The one-page site, rendered for a given locale. Section order = the guest's decision path. */
export function HomePage({ lang }: { lang: Locale }) {
  const t = dictionaries[lang];
  return (
    <div lang={lang}>
      <Header lang={lang} t={t.nav} />
      <main>
        <Hero lang={lang} t={t} />
        <ProofBar lang={lang} t={t.proof} />
        <Story t={t} />
        <Signatures lang={lang} t={t.signatures} />
        <Marquee items={t.marquee} labels={t.marqueeControls} />
        <MenuSection lang={lang} t={t.menu} />
        <Spaces t={t.spaces} />
        <Reservation lang={lang} t={t.reservation} />
        <Groups t={t.groups} />
        <Stay t={t.stay} />
        <Reviews lang={lang} t={t.reviews} proofT={t.proof} />
        <Practical lang={lang} t={t.info} />
      </main>
      <Footer t={t} />
      <MobileBar lang={lang} t={t.nav} />
    </div>
  );
}
