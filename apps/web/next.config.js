/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUDIO_SERVICE_URL: process.env.AUDIO_SERVICE_URL || 'http://localhost:8000',
  },
  async rewrites() {
    return [
      {
        source: '/api/audio/:path*',
        destination: `${process.env.AUDIO_SERVICE_URL || 'http://localhost:8000'}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
