/** @type {import('next').NextConfig} */
const nextConfig = {
  // XServer は静的ホスティング（Node/SSR 非対応）のため静的エクスポートする。
  // next build が out/ に静的 HTML/CSS/JS を生成する。
  output: 'export',
  // 静的エクスポートでは画像最適化サーバが無いため unoptimized が必要（next/image 使用時）。
  images: { unoptimized: true },
  // styled-components の SWC トランスフォーム（SSR一貫性・デバッグ向上。デザインは不変）。
  compiler: { styledComponents: true },
  // 本番ビルドを ESLint/prettier の整形差分で止めない（整形は husky + lint-staged で commit 時に担保）。
  // 型チェック(TypeScript)は有効のまま＝実バグは検出する。
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
