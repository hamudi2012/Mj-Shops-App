import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    appIsrStatus: false, // Menyembunyikan indikator ISR
    buildActivity: false, // Menyembunyikan logo loading/build di pojok
  },
};

export default nextConfig;
