/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    prependData: `
      @import "styles/mixins";
      @import "styles/breakpoints";
      @import "styles/globals";`,
  },
};

module.exports = nextConfig;
