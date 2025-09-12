// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Proxy frontend calls like "/api/quotes" to your Node server on 8000
  async rewrites() {
    const raw = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    const apiBase = raw.replace(/\/+$/, ""); // strip trailing slashes
    return [
      {
        source: "/api/:path*",
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },

  // If you use <Image>, allow these remote hosts
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // (Optional) good for Docker/hosted deploys
  // output: "standalone",
};

export default nextConfig;
