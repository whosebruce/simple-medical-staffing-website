import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export: srcset candidates come from pre-generated WebP variants
    // (scripts/build-images.mjs) through the custom loader; nothing is
    // optimized at request time.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 960, 1280, 1536],
    imageSizes: [64, 128, 256],
  },
};

export default nextConfig;
