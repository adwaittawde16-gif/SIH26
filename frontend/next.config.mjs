/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only proxy to backend when explicitly configured (local dev / Railway).
  // On Vercel with no BACKEND_URL set, skip rewrites entirely — mockData fallbacks handle data.
  ...(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL
    ? {
        async rewrites() {
          const apiUrl =
            process.env.NEXT_PUBLIC_API_URL ||
            process.env.BACKEND_URL;
          return [
            {
              source: "/api/:path*",
              destination: `${apiUrl}/api/:path*`,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
