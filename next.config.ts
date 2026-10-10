import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // One root layout per language (src/app/(fr), src/app/(en)), so unmatched URLs need a global 404.
    globalNotFound: true,
  },
};

export default nextConfig;
