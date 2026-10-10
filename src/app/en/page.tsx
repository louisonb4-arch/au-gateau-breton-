import { HomePage } from "@/components/HomePage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("en");

export default function Page() {
  return <HomePage lang="en" />;
}
