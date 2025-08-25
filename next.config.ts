import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@clerk/nextjs"],
  },
  // Use Node.js runtime for Clerk compatibility
  serverRuntimeConfig: {
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
  },
  // Disable Edge Runtime globally for Clerk compatibility
  runtime: "nodejs",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ucarecdn.com" },
      { protocol: "https", hostname: "blog.ghatakbits.in" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
  },
  webpack: (config) => {
    // Simplified webpack config to avoid build issues
    config.cache = false;
    return config;
  },
};

// Initialize Cloudflare dev platform in development
if (process.env.NODE_ENV === "development") {
  setupDevPlatform().catch(console.error);
}

export default nextConfig;
