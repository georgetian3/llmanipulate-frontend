import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'zh'], // Add your supported locales
    defaultLocale: 'en', // Set the default locale
  },
};

export default nextConfig;
