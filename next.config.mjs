import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand({ parsed: { ...process.env } });
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm4wr6uq88w4gof06.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
