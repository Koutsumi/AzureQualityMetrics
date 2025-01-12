import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {},
  images: {
    domains: ["dev.azure.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
