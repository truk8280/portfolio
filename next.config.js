/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into `out/` on `next build` — no Node server.
  output: "export",

  // The default next/image loader needs a running server to optimize images.
  // Static export has none, so serve the original files as-is.
  images: { unoptimized: true },

  // Export every route as a folder with index.html (e.g. /timer -> timer/index.html).
  // GitHub Pages serves that for a direct visit to /timer/ without a 404.
  trailingSlash: true,
};

export default nextConfig;
