import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project lives inside the pragyaai.github.io repo, which has its own
  // package-lock.json. Without an explicit root, Turbopack walks up and picks
  // the parent directory as the workspace root.
  turbopack: {
    root: __dirname,
  },

  // Security headers, CSP and image config are added in Phase 5.
};

export default nextConfig;
