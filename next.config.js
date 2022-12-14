/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  experimental: { 
    images: { 
      allowFutureImage: true } },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}