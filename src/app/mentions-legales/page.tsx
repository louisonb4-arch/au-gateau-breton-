import type { Metadata } from "next";
import { dictionaries } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Mentions légales — Au Gâteau Breton, Chenonceaux",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

export default function LegalPage() {
  const t = dictionaries.fr;
  const { legal, address } = restaurant;
  const rows: [string, string][] = [
    ["Raison sociale", `${legal.company} (enseigne « ${restaurant.shortName} »)`],
    ["Capital social", legal.capital],
    ["Siège social", `${address.street}, ${address.postalCode} ${address.city}`],
    ["Immatriculation", legal.rcs],
    ["N° de TVA intracommunautaire", legal.vat],
    ["Directeur de la publication", legal.director],
    ["Téléphone", restaurant.phone.display],
    ["E-mail", restaurant.email],
    ["Hébergement", "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis"],
  ];

  return (
    <>
      <Header lang="fr" t={t.nav} />
      <main className="bg-paper pt-[4.5rem]">
        <div className="container-site max-w-3xl py-16 sm:py-24">
          <h1 className="text-4xl font-medium text-ink sm:text-5xl">Mentions légales</h1>

          <section className="mt-12">
            <h2 className="text-2xl font-medium text-ink">Éditeur du site</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
              {rows.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-3 sm:grid-cols-[16rem_1fr]">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-12 space-y-4 leading-relaxed text-slate">
            <h2 className="text-2xl font-medium text-ink">Données personnelles</h2>
            <p>
              Les informations transmises via le formulaire de réservation (nom, téléphone, e-mail, précisions) sont
              utilisées uniquement pour gérer votre réservation. Elles ne sont ni vendues ni cédées à des tiers et sont
              conservées pour la durée nécessaire à cette gestion.
            </p>
            <p>
              Conformément au RGPD, vous disposez d&rsquo;un droit d&rsquo;accès, de rectification et de suppression de vos
              données. Pour l&rsquo;exercer, écrivez-nous à{" "}
              <a className="text-bordeaux underline underline-offset-4" href={`mailto:${restaurant.email}`}>
                {restaurant.email}
              </a>
              .
            </p>
          </section>

          <section className="mt-12 space-y-4 leading-relaxed text-slate">
            <h2 className="text-2xl font-medium text-ink">Cookies</h2>
            <p>
              Ce site n&rsquo;utilise aucun cookie publicitaire ni de mesure d&rsquo;audience. La carte interactive est
              fournie par OpenStreetMap, qui ne dépose pas de cookie de suivi.
            </p>
          </section>

          <section className="mt-12 space-y-4 leading-relaxed text-slate">
            <h2 className="text-2xl font-medium text-ink">Crédits</h2>
            <p>Photographies : {restaurant.name}. Toute reproduction sans autorisation est interdite.</p>
          </section>
        </div>
      </main>
      <Footer t={t} />
    </>
  );
}
