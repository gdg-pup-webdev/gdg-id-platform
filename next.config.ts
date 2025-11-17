import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_ENV === "dev" ? false : true,
  },
};

export default nextConfig;
