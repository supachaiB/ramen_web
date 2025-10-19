/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['localhost'], // ให้ next/image โหลดรูปจาก localhost
    remotePatterns: [
      {
        // protocol: "http",
        // hostname: "localhost",
        // port: "3000",
        // pathname: "/uploads/**",

        protocol: "https",
        hostname: "ramen-web-b77i.vercel.app",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
