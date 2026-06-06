import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  typedRoutes: true,
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/how-it-works-1", destination: "/how-it-works", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/blank", destination: "/privacy-policy", permanent: true },
      { source: "/blank-2", destination: "/terms-and-conditions", permanent: true },
      { source: "/blank-4", destination: "/shipping-policy", permanent: true }
    ];
  }
};

export default nextConfig;
