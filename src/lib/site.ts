import type { Metadata } from "next";
import { dictionaries } from "@/content/dictionary";
import { localePath, type Locale } from "@/lib/i18n";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.augateaubreton.fr").replace(/\/$/, "");

export function pageMetadata(lang: Locale): Metadata {
  const t = dictionaries[lang].meta;
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: localePath[lang],
      languages: { fr: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_GB",
      url: localePath[lang],
      siteName: "O'GB · Au Gâteau Breton",
      title: t.title,
      description: t.description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Au Gâteau Breton, Chenonceaux" }],
    },
  };
}
