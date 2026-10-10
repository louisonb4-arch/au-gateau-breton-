import type { L } from "@/lib/i18n";

/**
 * Single source of truth for the restaurant's practical information.
 * Update here: the header, footer, SEO data and every section read from it.
 */
export const restaurant = {
  name: "Au Gâteau Breton",
  shortName: "O’GB",
  foundedYear: 1947,
  phone: { display: "02 47 23 90 14", href: "tel:+33247239014", e164: "+33247239014" },
  email: "augateaubreton@orange.fr",
  address: {
    street: "16 rue du Docteur Bretonneau",
    postalCode: "37150",
    city: "Chenonceaux",
    country: "FR",
  },
  geo: { lat: 47.3316099, lng: 1.0680929 },
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Au+G%C3%A2teau+Breton+16+rue+du+Docteur+Bretonneau+37150+Chenonceaux",
  // Links to the Google review form are the fastest way to grow recent reviews.
  reviewUrl: "https://www.google.com/maps/search/?api=1&query=Au+G%C3%A2teau+Breton+Chenonceaux",
  priceRange: "€€",
  legal: {
    company: "AU GATEAU BRETON",
    capital: "5 000 €",
    siren: "853 962 389",
    rcs: "RCS Tours 853 962 389",
    vat: "FR03 853 962 389",
    director: "Nicolas Juliot",
  },
} as const;

/** Public ratings & awards shown in the proof bar. Check and refresh a few times a year. */
export const proof = {
  googleRating: "4,0",
  googleCount: "868",
  awards: [
    { title: { fr: "Meilleurs steaks", en: "Best steaks" }, source: "Restaurant Guru", year: "2025" },
    { title: { fr: "Meilleur foie gras", en: "Best foie gras" }, source: "Restaurant Guru", year: "2025" },
  ] satisfies { title: L; source: string; year: string }[],
};

export const payments: L[] = [
  { fr: "Carte bancaire (Visa, Mastercard)", en: "Credit card (Visa, Mastercard)" },
  { fr: "Sans contact", en: "Contactless" },
  { fr: "Espèces", en: "Cash" },
  { fr: "Chèques", en: "Cheques" },
  { fr: "Titres-restaurant", en: "Meal vouchers" },
  { fr: "Chèques-vacances", en: "Chèques-vacances" },
];

export type AmenityIcon = "sun" | "snow" | "wifi" | "access" | "paw" | "bag";

export const amenities: { icon: AmenityIcon; label: L }[] = [
  { icon: "sun", label: { fr: "Terrasse-jardin chauffée", en: "Heated garden terrace" } },
  { icon: "snow", label: { fr: "Salle climatisée", en: "Air-conditioned" } },
  { icon: "access", label: { fr: "Accessible PMR", en: "Wheelchair accessible" } },
  { icon: "paw", label: { fr: "Animaux bienvenus", en: "Pets welcome" } },
  { icon: "wifi", label: { fr: "Wi-Fi gratuit", en: "Free Wi-Fi" } },
  { icon: "bag", label: { fr: "Plats à emporter", en: "Takeaway" } },
];

export const reviews: { quote: L; author: string }[] = [
  {
    quote: {
      fr: "Un moment inoubliable ! Ce restaurant est une véritable pépite !",
      en: "An unforgettable moment! This restaurant is a real gem!",
    },
    author: "Mélanie C.",
  },
  {
    quote: {
      fr: "Accueil chaleureux, repas délicieux ! Rapport qualité / prix très bien.",
      en: "Warm welcome, delicious meal! Great value for money.",
    },
    author: "Avis client",
  },
  {
    quote: { fr: "De la vraie cuisine !", en: "Real, honest cooking!" },
    author: "Lioga V.",
  },
];
