import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://fav.farm/clock')],
  },
};
export default nextConfig;
