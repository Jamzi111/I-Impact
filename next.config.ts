import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/programs",
        destination: "/events",
        permanent: false,
      },
      {
        source: "/programs/skills",
        destination: "/events",
        permanent: false,
      },
      {
        source: "/programs/mentorship",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/programs/as-a-teen",
        destination: "/events",
        permanent: false,
      },
      {
        source: "/programs/:slug*",
        destination: "/events",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
