import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, "@google-cloud/profiler"];
    }

    return config;
  },
};

export default nextConfig;
