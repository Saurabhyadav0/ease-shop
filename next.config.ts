const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ['fakestoreapi.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
