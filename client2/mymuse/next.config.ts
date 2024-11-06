import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: ['lh3.googleusercontent.com'], // ここに外部ホスト名を追加
    },
    eslint: {
        ignoreDuringBuilds: true, // ビルド時のESLintチェックを無効化
    },
};

export default nextConfig;
