import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
      },

      {
        protocol: "https",
        hostname: "cdn.hometogo.net",
      },
    ],
  },
};

export default nextConfig;
