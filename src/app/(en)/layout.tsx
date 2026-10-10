import type { ReactNode } from "react";
import "../globals.css";
import { RootDocument } from "@/components/RootDocument";
import { rootMetadata, rootViewport } from "@/lib/site";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function Layout({ children }: { children: ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
