# O'GB · Au Gâteau Breton — site du restaurant

Site vitrine du restaurant **Au Gâteau Breton « O'GB »**, 16 rue du Docteur Bretonneau, 37150 Chenonceaux.
Une page en français (`/`) et sa version anglaise (`/en`), plus les mentions légales.

**Stack :** Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript. Polices auto-hébergées (Fraunces + Inter), aucun cookie, aucun script tiers.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis ajuster si besoin
npm run dev                  # http://localhost:3000
npm run build && npm start   # build de production
npm run typecheck
```

## Structure

```
src/
  content/            ← tout le contenu éditable, sans toucher au design
    restaurant.ts       coordonnées, mentions légales, note Google, récompenses, avis, services, paiements
    hours.ts            horaires du service + fermetures exceptionnelles
    menu.ts             la carte (FR/EN), par onglet : Menus, À la carte, Le midi, Enfants & extras
    dictionary.ts       tous les textes de l'interface (FR/EN)
  lib/
    hours.ts            statut « ouvert maintenant », calculs de dates (heure de Paris)
    reservation.ts      config + créneaux + point d'entrée du futur backend
    site.ts             URL du site, métadonnées SEO
  components/
    sections/           une section = un fichier (Hero, Story, MenuSection, Reservation…)
    layout/             Header, Footer, barre mobile, logo
    ui/                 Button, SectionHeading, Seal, BrickMark
  app/                  routes : /, /en, /mentions-legales, sitemap, robots, favicon
assets/photos/        photos sources (JPEG)
public/images/        photos optimisées (WebP), générées par `npm run images`
```

## Mettre à jour le contenu

| Je veux… | Fichier |
|---|---|
| Changer un plat, un prix, la carte de saison | `src/content/menu.ts` |
| Ajouter une fermeture exceptionnelle / un jour férié | `src/content/hours.ts` → `exceptions` |
| Modifier les horaires habituels | `src/content/hours.ts` → `weeklyHours` |
| Mettre à jour la note Google ou les récompenses | `src/content/restaurant.ts` → `proof` |
| Modifier un texte du site | `src/content/dictionary.ts` (FR puis EN) |
| Remplacer / ajouter une photo | déposer le JPEG dans `assets/photos/`, puis `npm run images` |

Dans les titres, un mot entre `*astérisques*` s'affiche en italique bordeaux.

## Réservation en ligne

L'interface est **complète côté front** : choix du jour (jours fermés grisés), du service, du créneau, du nombre de couverts, coordonnées et validation. Tant que le backend n'est pas branché, l'envoi affiche un récapitulatif et invite à confirmer par téléphone.

Pour l'activer :

1. Créer le backend (route `src/app/api/reservations/route.ts`, Supabase, ou pont vers Zenchef/TheFork). Il reçoit un `ReservationRequest` en JSON (voir `src/lib/reservation.ts`) et renvoie `{ "reference": "…" }`.
2. Passer `NEXT_PUBLIC_RESERVATION_ENABLED=true`.

Les règles (8 couverts maximum en ligne, créneaux de 15 min, dernier service 45 min avant la fermeture, 60 min de délai le jour même, fenêtre de 30 jours) se règlent dans `reservationConfig`.

## Déploiement

Pensé pour Vercel (import du dépôt, aucune configuration). Définir `NEXT_PUBLIC_SITE_URL` avec le domaine final.

## À valider avant la mise en ligne

- [ ] **Horaires** : le site actuel indique mercredi fermé, certains annuaires indiquent jeudi. Confirmer, puis aligner la fiche Google Business Profile.
- [ ] **Domaine** (ex. `augateaubreton.fr`) et redirection depuis l'ancien site `metro.bar`.
- [ ] **Hébergeur** dans les mentions légales (Vercel par défaut).
- [ ] **Chambre d'hôtes** : descriptif, prix et canal de réservation (Booking ?) à confirmer.
- [ ] **Avis clients** affichés : extraits d'avis publics, à valider par le propriétaire.
- [ ] **Shooting photo** (plats, salle, véranda, terrasse) : c'est le levier n°1 de qualité perçue.
