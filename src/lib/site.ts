import type { Metadata, Viewport } from "next";
import { dictionaries } from "@/content/dictionary";
import { localePath, type Locale } from "@/lib/i18n";

/**
 * NEXT_PUBLIC_SITE_URL = the restaurant's real domain. Until it is set, the site
 * (local dev, *.vercel.app preview) is kept out of search engines so it never competes with the live site.
 */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL; // provided by Vercel at build time

export const siteUrl = (configuredUrl ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")).replace(/\/$/, "");
export const indexable = Boolean(configuredUrl);

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "O’GB · Au Gâteau Breton",
  formatDetection: { telephone: false },
};

export const rootViewport: Viewport = {
  themeColor: "#f7f4ee",
  width: "device-width",
  initialScale: 1,
};

export function pageMetadata(lang: Locale): Metadata {
  const t = dictionaries[lang].meta;
  return {
    title: t.title,
    description: t.description,
    robots: indexable ? undefined : { index: false, follow: false },
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
