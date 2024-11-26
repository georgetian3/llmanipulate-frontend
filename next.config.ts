import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'zh'], // Add your supported locales
    defaultLocale: 'en', // Set the default locale
  },
  output: 'standalone',
};

module.exports = {
  async redirects() {
    return [
      {
        source: "/main",
        destination: "/login",
        permanent: true, // Set to true for SEO-friendly 301 redirects
      },
    ];
  },
};
export default nextConfig;
