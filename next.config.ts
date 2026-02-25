import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_ENV === "dev" ? false : true,
  },
};

export default nextConfig;
