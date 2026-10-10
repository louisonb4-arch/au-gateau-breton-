import type { Metadata, Viewport } from "next";
import "@fontsource-variable/league-gothic/index.css";
import "@fontsource-variable/eb-garamond/index.css";
import "@fontsource-variable/eb-garamond/wght-italic.css";
import "@fontsource-variable/instrument-sans/index.css";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { RevealObserver } from "@/components/RevealObserver";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "O’GB · Au Gâteau Breton",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
  width: "device-width",
  initialScale: 1,
};

// French is the primary language; the English page sets lang="en" on its own wrapper.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <RevealObserver />
        <JsonLd />
      </body>
    </html>
  );
}
