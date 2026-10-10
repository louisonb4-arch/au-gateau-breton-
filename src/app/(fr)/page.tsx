import { HomePage } from "@/components/HomePage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("fr");

export default function Page() {
  return <HomePage lang="fr" />;
}
