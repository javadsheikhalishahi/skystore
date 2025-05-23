import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100MB",
    },
  },
  images: {
    domains: ["cloud.appwrite.io", "img.freepik.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com"
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io"
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
