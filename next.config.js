/** @type {import('next').NextConfig} */
const path = require("path");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

module.exports = withMDX(nextConfig);
