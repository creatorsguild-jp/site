// サイト共通のコンテンツ（全ページで使う要素）。
// 例: ヘッダーナビゲーション。複数ページ化（Phase4）で href を実ルートへ更新する。

export type NavItem = {
  label: string
  href: string
}

// ヘッダー PC メニュー。複数ページ化（Phase4）で実ルートへ更新済み。
// trailingSlash:true のため末尾スラッシュ付き（/project/ → out/project/index.html）。
export const nav: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'プロジェクト紹介', href: '/project/' },
  { label: 'リモート参加について', href: '/remote/' },
  { label: 'メンバー紹介', href: '/member/' },
  { label: 'お問い合わせ', href: '/contact/' },
]

// メンバー募集 / 問い合わせの導線（CTA）の遷移先。死にアンカー(#linkURL/#linlURL)を置換。
export const contactHref = '/contact/'
