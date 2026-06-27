// サイト共通のコンテンツ（全ページで使う要素）。
// 例: ヘッダーナビゲーション。複数ページ化（Phase4）で href を実ルートへ更新する。

export type NavItem = {
  label: string
  href: string
}

// ヘッダー PC メニュー。現状の href は旧静的サイト由来（*.html）。
// Phase4 でページ実体化に合わせて更新予定。
export const nav: NavItem[] = [
  { label: 'HOME', href: 'index.html' },
  { label: 'プロジェクト紹介', href: 'project.html' },
  { label: 'リモート参加について', href: 'remote.html' },
  { label: 'メンバー紹介', href: 'member.html' },
  { label: 'お問い合わせ', href: 'contact.html' },
]
