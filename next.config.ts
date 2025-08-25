import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "https",
        hostname: "blog.ghatakbits.in",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
  webpack: (config, { dev }) => {
    // Optimize webpack caching for better performance
    if (!dev) {
      config.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: ".next/cache",
        compression: "gzip",
        maxAge: 172800000, // 2 days
      };
    }

    return config;
  },
};
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
