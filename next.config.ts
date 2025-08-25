import type { NextConfig } from "next";

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

export default nextConfig;
