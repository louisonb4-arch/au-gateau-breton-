import type { L } from "@/lib/i18n";

/**
 * La carte. Everything is "fait maison".
 * To update the menu, edit the entries below: prices are plain strings so they display exactly as typed.
 */
export type Dish = { name: L; description?: L; price?: string; tag?: L };
export type MenuGroup = { title: L; note?: L; dishes: Dish[] };
export type MenuTab = { id: string; label: L; intro?: L; groups: MenuGroup[]; footnotes?: L[] };

const award: L = { fr: "Primé 2025", en: "Award 2025" };

const starters = {
  tartare: {
    name: { fr: "Tartare de Saint-Jacques & crevettes", en: "Scallop & prawn tartare" },
    description: {
      fr: "Suprême d’agrumes, gel pamplemousse & sorbet acidulé",
      en: "Citrus segments, grapefruit gel & tangy sorbet",
    },
  },
  tzatziki: {
    name: { fr: "Tzatziki revisité", en: "Tzatziki, reinvented" },
    description: {
      fr: "Eau de concombre, crémeux aux herbes & éclats croquants",
      en: "Cucumber water, herb cream & crunchy crumbs",
    },
  },
  foieGras: {
    name: { fr: "Foie gras mi-cuit maison", en: "House mi-cuit foie gras" },
    description: { fr: "& son confit de fruits de saison", en: "With seasonal fruit chutney" },
    tag: award,
  },
} satisfies Record<string, Dish>;

const mains = {
  porc: {
    name: { fr: "Filet mignon de porc", en: "Pork tenderloin" },
    description: {
      fr: "Pressée de pomme de terre, duxelles & sauce du soleil",
      en: "Pressed potato terrine, mushroom duxelles & sun-kissed sauce",
    },
  },
  cabillaud: {
    name: { fr: "Cabillaud aux petits légumes", en: "Cod with spring vegetables" },
    description: {
      fr: "Lit de piperade, sauce terre & mer, perles balsamiques",
      en: "On a bed of piperade, land & sea sauce, balsamic pearls",
    },
  },
  boeuf: {
    name: { fr: "Pièce royale de bœuf en filet", en: "Royal beef fillet" },
    description: {
      fr: "Poêlée forestière, crémeux de carottes & sauce selon l’humeur du chef",
      en: "Wild mushroom pan-fry, carrot cream & the chef’s sauce of the day",
    },
    tag: award,
  },
} satisfies Record<string, Dish>;

const desserts = {
  far: {
    name: { fr: "Gourmandise de Bretagne", en: "A taste of Brittany" },
    description: {
      fr: "Far breton de la maison revisité, sauce caramel & glace Isigny au caramel beurre salé",
      en: "Our reinvented far breton, caramel sauce & Isigny salted-butter caramel ice cream",
    },
  },
  citron: {
    name: { fr: "Le citron meringué du chef", en: "The chef’s lemon meringue" },
    description: { fr: "Meringue & crème citron — le secret du chef", en: "Meringue & lemon cream — the chef’s secret" },
  },
  mojito: {
    name: { fr: "Mojito revisité", en: "Mojito, reinvented" },
    description: {
      fr: "Panna cotta menthe, gel rhum & espuma de citron",
      en: "Mint panna cotta, rum gel & lemon espuma",
    },
  },
} satisfies Record<string, Dish>;

const dessertNote: L = {
  fr: "Merci de choisir votre dessert en début de repas : préparé à la minute, il demande sinon 15 minutes d’attente.",
  en: "Please choose your dessert when ordering: it is made to order and otherwise takes at least 15 minutes.",
};

export const menuTabs: MenuTab[] = [
  {
    id: "menus",
    label: { fr: "Menus", en: "Set menus" },
    intro: {
      fr: "Composez votre menu parmi les plats de la carte de saison.",
      en: "Build your set menu from our seasonal dishes.",
    },
    groups: [
      {
        title: { fr: "Formules", en: "Set menus" },
        dishes: [
          {
            name: { fr: "Entrée + plat ou plat + dessert", en: "Starter + main or main + dessert" },
            price: "29,90 €",
          },
          { name: { fr: "Entrée + plat + dessert", en: "Starter + main + dessert" }, price: "36,90 €" },
          {
            name: { fr: "Plateau de fromages", en: "Cheese board" },
            description: { fr: "En supplément, par personne", en: "Supplement, per person" },
            price: "+ 9 €",
          },
        ],
      },
      { title: { fr: "Entrées", en: "Starters" }, dishes: [starters.tartare, starters.tzatziki, starters.foieGras] },
      { title: { fr: "Plats", en: "Mains" }, dishes: [mains.porc, mains.cabillaud, mains.boeuf] },
      { title: { fr: "Desserts", en: "Desserts" }, dishes: [desserts.far, desserts.citron, desserts.mojito] },
    ],
    footnotes: [
      dessertNote,
      { fr: "Les accompagnements ne sont pas modifiables.", en: "Side dishes cannot be swapped." },
    ],
  },
  {
    id: "carte",
    label: { fr: "À la carte", en: "À la carte" },
    groups: [
      {
        title: { fr: "Entrées", en: "Starters" },
        dishes: [
          { ...starters.tzatziki, price: "14,50 €" },
          { ...starters.tartare, price: "18,90 €" },
          { ...starters.foieGras, price: "21 €" },
        ],
      },
      {
        title: { fr: "Plats", en: "Mains" },
        dishes: [
          { ...mains.cabillaud, price: "21,70 €" },
          { ...mains.porc, price: "22 €" },
          { ...mains.boeuf, price: "24,90 €" },
        ],
      },
      {
        title: { fr: "Notre viande", en: "Our beef" },
        note: {
          fr: "Née, élevée et abattue en France. Cuisson conseillée : bleue ou saignante.",
          en: "Born, raised and slaughtered in France. Best served blue or rare.",
        },
        dishes: [
          {
            name: { fr: "Pièce royale de bœuf & frites maison", en: "Royal beef cut & home-made fries" },
            description: {
              fr: "Filet de bœuf VBF ou suggestion du moment, selon arrivage",
              en: "French beef fillet or the cut of the moment, depending on supply",
            },
            price: "24,90 €",
            tag: award,
          },
        ],
      },
      {
        title: { fr: "Desserts", en: "Desserts" },
        dishes: [
          { ...desserts.far, price: "11 €" },
          { ...desserts.citron, price: "11 €" },
          { ...desserts.mojito, price: "11 €" },
        ],
      },
    ],
    footnotes: [dessertNote],
  },
  {
    id: "midi",
    label: { fr: "Le midi", en: "Lunchtime" },
    intro: {
      fr: "Rapide, gourmand et fait maison : nos formules pour la pause déjeuner.",
      en: "Quick, generous and home-made: our lunchtime options.",
    },
    groups: [
      {
        title: { fr: "Menu du jour", en: "Menu of the day" },
        note: {
          fr: "Selon le marché, à l’ardoise. En semaine, hors week-end et jours fériés.",
          en: "Market-driven, on the chalkboard. Weekdays only, excluding weekends and bank holidays.",
        },
        dishes: [
          { name: { fr: "Plat + dessert", en: "Main + dessert" }, price: "19 €" },
          { name: { fr: "Entrée + plat + dessert", en: "Starter + main + dessert" }, price: "24 €" },
        ],
      },
      {
        title: { fr: "L’idée du chef", en: "The chef’s idea" },
        note: { fr: "Uniquement le midi.", en: "Lunchtime only." },
        dishes: [
          {
            name: { fr: "Galette de blé roulée au canard effiloché", en: "Wheat wrap with pulled duck" },
            description: {
              fr: "Façon tacos, légumes croquants & frites maison",
              en: "Tacos-style, crunchy vegetables & home-made fries",
            },
            price: "18,90 €",
          },
        ],
      },
      {
        title: { fr: "Salades du moment", en: "Seasonal salads" },
        dishes: [
          {
            name: { fr: "La Paysanne", en: "La Paysanne" },
            description: { fr: "Tomate, jambon, gruyère & œufs", en: "Tomato, ham, Gruyère & eggs" },
            price: "14,90 €",
          },
          {
            name: { fr: "La Nordique", en: "La Nordique" },
            description: {
              fr: "Saumon fumé maison, œufs de lompe & citron",
              en: "House-smoked salmon, lumpfish roe & lemon",
            },
            price: "16 €",
          },
        ],
      },
    ],
  },
  {
    id: "enfants",
    label: { fr: "Enfants & extras", en: "Kids & sides" },
    groups: [
      {
        title: { fr: "Menu « P’tit Bout »", en: "« P’tit Bout » kids’ menu" },
        note: { fr: "Pour les moins de 12 ans.", en: "For children under 12." },
        dishes: [
          {
            name: { fr: "Mini tacos du chef ou suggestion du jour", en: "Chef’s mini tacos or dish of the day" },
            description: {
              fr: "Roulé à l’effiloché de canard, frites maison & coupe glacée",
              en: "Pulled duck wrap, home-made fries & ice cream",
            },
            price: "12,90 €",
          },
        ],
      },
      {
        title: { fr: "Accompagnements", en: "Sides" },
        note: { fr: "En supplément.", en: "Extra." },
        dishes: [
          { name: { fr: "Salade verte", en: "Green salad" }, price: "3,90 €" },
          { name: { fr: "Assiette de frites maison", en: "Home-made fries" }, price: "5,90 €" },
          { name: { fr: "Assiette de légumes", en: "Vegetable plate" }, price: "9,90 €" },
        ],
      },
    ],
  },
];
