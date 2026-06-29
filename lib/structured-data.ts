// schema.org 構造化データ（JSON-LD）のビルダー。
// pages の <head> に <script type="application/ld+json"> として注入する。
// 型は schema.org 仕様の必要最小限のみ。フィールド追加は呼び出し側で広げる。

export type Organization = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
};

export type WebSite = {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  inLanguage: string;
};

// 組織情報（全ページに入れる固定情報）。logo は絶対 URL に解決される。
export function buildOrganization(opts: {
  name: string;
  url: string;
  logoPath: string;
}): Organization {
  // 末尾スラッシュ重複を避ける（url が "/" 終わり、logoPath が "/" 始まり）。
  const base = opts.url.endsWith('/') ? opts.url.slice(0, -1) : opts.url;
  const path = opts.logoPath.startsWith('/') ? opts.logoPath : `/${opts.logoPath}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: opts.name,
    url: opts.url,
    logo: `${base}${path}`,
  };
}

// サイト全体の WebSite ノード（ホームのみに入れる想定）。
export function buildWebSite(opts: {
  name: string;
  url: string;
  description: string;
  language?: string;
}): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: opts.name,
    url: opts.url,
    description: opts.description,
    inLanguage: opts.language ?? 'ja-JP',
  };
}

// JSON-LD として <script> タグに埋め込む文字列を返す。
// XSS 防止のため "<" を Unicode エスケープ（schema.org 推奨）。
export function serializeJsonLd(node: object): string {
  return JSON.stringify(node).replace(/</g, '\\u003c');
}
