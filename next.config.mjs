// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['127.0.0.1'],
//     },
//   };
  
//   export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '7777',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;