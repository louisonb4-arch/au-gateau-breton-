export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

/** A string available in every locale. */
export type L = Record<Locale, string>;

export const localePath: Record<Locale, string> = { fr: "/", en: "/en" };
