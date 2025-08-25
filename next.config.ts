import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ucarecdn.com" },
      { protocol: "https", hostname: "blog.ghatakbits.in" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: path.resolve(__dirname, ".next/cache"), // ✅ absolute path
        compression: "gzip",
        maxAge: 172800000, // 2 days
      };
    }
    return config;
  },
};

// Initialize Cloudflare dev platform in development
if (process.env.NODE_ENV === "development") {
  setupDevPlatform().catch(console.error);
}

export default nextConfig;
