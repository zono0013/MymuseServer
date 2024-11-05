import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: ['lh3.googleusercontent.com'], // ここに外部ホスト名を追加
    },
    webpack: (config) => {
        config.externals.push({
            'react-reconciler': 'react-reconciler',
            canvas: 'canvas',
        });
        return config;
    },
};

export default nextConfig;
