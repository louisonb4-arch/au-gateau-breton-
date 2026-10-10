import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { fr: `${siteUrl}/`, en: `${siteUrl}/en` };
  return [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1, alternates: { languages } },
    { url: `${siteUrl}/en`, changeFrequency: "weekly", priority: 0.8, alternates: { languages } },
    { url: `${siteUrl}/mentions-legales`, changeFrequency: "yearly", priority: 0.1 },
  ];
}
