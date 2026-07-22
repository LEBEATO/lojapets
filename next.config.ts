import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // ✅ REDIRECTS PARA CATEGORIAS
  async redirects() {
    return [
      {
        source: '/produtos/:categoria',
        destination: '/produtos/categoria/:categoria',
        permanent: true, // 301 redirect (SEO friendly)
      },
    ];
  },

  // ⚠️ DESENVOLVIMENTO: Permitir acesso de outros dispositivos na rede
  allowedDevOrigins: ['*.local-ip.co', '192.168.*.*'],
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons'],
  },
};

export default nextConfig;