import { weeklyHours } from "@/content/hours";
import { restaurant } from "@/content/restaurant";
import { siteUrl } from "@/lib/site";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** schema.org Restaurant data: powers Google's rich results (hours, address, price range, menu link). */
export function JsonLd() {
  const openingHoursSpecification = Object.entries(weeklyHours).flatMap(([day, schedule]) =>
    [schedule.lunch, schedule.dinner]
      .filter((r) => r !== undefined)
      .map((r) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayNames[Number(day)]}`,
        opens: r.open,
        closes: r.close,
      })),
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: `${restaurant.name} « ${restaurant.shortName} »`,
    alternateName: restaurant.shortName,
    url: siteUrl,
    image: `${siteUrl}/og.jpg`,
    telephone: restaurant.phone.e164,
    email: restaurant.email,
    foundingDate: String(restaurant.foundedYear),
    servesCuisine: ["Française", "Cuisine traditionnelle", "Fait maison"],
    priceRange: restaurant.priceRange,
    acceptsReservations: true,
    hasMenu: `${siteUrl}/#carte`,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.street,
      postalCode: restaurant.address.postalCode,
      addressLocality: restaurant.address.city,
      addressCountry: restaurant.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: restaurant.geo.lat, longitude: restaurant.geo.lng },
    openingHoursSpecification,
    paymentAccepted: "Cash, Credit Card, Cheque, Ticket Restaurant, Chèques-Vacances",
    amenityFeature: ["Terrasse", "Climatisation", "Wi-Fi", "Accessible PMR", "Animaux acceptés"].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
