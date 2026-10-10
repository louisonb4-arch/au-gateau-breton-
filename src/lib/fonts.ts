import localFont from "next/font/local";

/*
 * Self-hosted, preloaded, with size-adjusted fallbacks so text does not reflow when the fonts arrive.
 * Files: latin subsets from Fontsource (SIL Open Font License).
 */
export const leagueGothic = localFont({
  src: "../fonts/league-gothic-latin-standard-normal.woff2",
  weight: "400",
  variable: "--font-league-gothic",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const ebGaramond = localFont({
  src: [
    { path: "../fonts/eb-garamond-latin-wght-normal.woff2", weight: "400 800", style: "normal" },
    { path: "../fonts/eb-garamond-latin-wght-italic.woff2", weight: "400 800", style: "italic" },
  ],
  variable: "--font-eb-garamond",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const instrumentSans = localFont({
  src: "../fonts/instrument-sans-latin-wght-normal.woff2",
  weight: "400 700",
  variable: "--font-instrument-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const fontVariables = `${leagueGothic.variable} ${ebGaramond.variable} ${instrumentSans.variable}`;
