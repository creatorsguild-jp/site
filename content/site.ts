// サイト共通のコンテンツ（全ページで使う要素）。
// 例: ヘッダーナビゲーション。複数ページ化（Phase4）で href を実ルートへ更新する。

export type NavItem = {
  label: string;
  href: string;
};

// ヘッダー PC メニュー。複数ページ化（Phase4）で実ルートへ更新済み。
// trailingSlash:true のため末尾スラッシュ付き（/project/ → out/project/index.html）。
export const nav: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'プロジェクト紹介', href: '/project/' },
  { label: 'リモート参加について', href: '/remote/' },
  { label: 'メンバー紹介', href: '/member/' },
  { label: 'お問い合わせ', href: '/contact/' },
];

// メンバー募集 / 問い合わせの導線（CTA）の遷移先。死にアンカー(#linkURL/#linlURL)を置換。
export const contactHref = '/contact/';

// サイト共通の識別情報（メタ/OGP 生成に使用）。
export const siteName = "クリエイターズギルド Creator's Guild";
export const siteUrl = 'https://creatorsguild.info';

// ページ別メタ情報（Phase6: SEO / OGP）。
//   title       … <title> に出す（home 以外は " | siteName" を付加）。og:title にも使う。
//   description … <meta name="description"> / og:description。
//   path        … og:url 用（siteUrl + path、trailingSlash 付き）。
export type PageMeta = {
  title: string;
  description: string;
  path: string;
};

// ページ別メタから <title> 文字列を組み立てる。
//   home  → brand（"クリエイターズギルド Creator's Guild"）のみ
//   下層  → "ページ名 | クリエイターズギルド Creator's Guild"
// 出力不変リファクタの過程で、ホームは meta.title("Creator's Guild") ではなく
// brand 全体を使う既存挙動に合わせる必要があるため明示的に分岐する。
export function composePageTitle(meta: PageMeta, brand: string = siteName): string {
  return meta.path === '/' ? brand : `${meta.title} | ${brand}`;
}

// ページ別メタから canonical / og:url を組み立てる（trailingSlash 付き）。
export function composeCanonicalUrl(meta: PageMeta, origin: string = siteUrl): string {
  return `${origin}${meta.path}`;
}

export const pageMeta = {
  home: {
    title: "Creator's Guild",
    description:
      '作りたいものを作り、困ったときに助け合える。そんなコミュニティです。リモート参加OK!',
    path: '/',
  },
  project: {
    title: 'プロジェクト紹介',
    description:
      "Creator's Guild で進行中・過去のプロジェクトをご紹介します。「こんなものがあったら」を形にする取り組みです。",
    path: '/project/',
  },
  remote: {
    title: 'リモート参加について',
    description:
      'リモートでの参加方法やコミュニケーションの進め方をご案内します。場所を問わず参加できます。',
    path: '/remote/',
  },
  member: {
    title: 'メンバー紹介',
    description:
      "Creator's Guild で活動するメンバーをご紹介します。多様なスキルを持つ仲間が集まっています。",
    path: '/member/',
  },
  contact: {
    title: 'お問い合わせ',
    description:
      'メンバー募集・お問い合わせはこちらのフォームからご連絡ください。',
    path: '/contact/',
  },
} satisfies Record<string, PageMeta>;
