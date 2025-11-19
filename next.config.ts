import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração mínima para evitar erros de manifest
  reactStrictMode: true,
  
  // Ignorar erros durante build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuração de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
