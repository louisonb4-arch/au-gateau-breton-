import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/inter/index.css";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "O'GB · Au Gâteau Breton",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f4ede1",
  width: "device-width",
  initialScale: 1,
};

// French is the primary language; the English page sets lang="en" on its own wrapper.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
