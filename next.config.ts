import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ["@tanstack/ai-code-mode", "esbuild"],
};

export default nextConfig;
