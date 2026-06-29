// トップページのコンテンツ（文言・画像・リンク）をここに集約する。
// コンポーネントは描画に専念し、文言修正はこのファイルで完結させる（D3: TS/JSON データ化）。
// ※ 既存マークアップに現れるテキスト/属性は基本そのまま保持する。

import { contactHref } from './site'

// 画像参照（src/alt）。
export type HeroImage = { src: string; alt: string }

// ヒーロー（旧 MainImageBlock）の SP/PC 2 系統を構造化したデータ。
// 既存 HTML の構造・テキスト・属性を保持したまま、データだけ抜き出した形。
// - backIllust は SP/PC で共有（src/alt とも共通）
// - titleId は src 共通だが alt が SP/PC で異なるため別エントリ
// - SP の copy は単一文字列、PC は <br/> で 2 行に分かれるので配列
export type HeroData = {
  contactHref: string
  backIllust: HeroImage
  sp: {
    titleId: HeroImage
    titleTop: HeroImage
    copy: string
  }
  pc: {
    titleId: HeroImage
    titleTop: HeroImage
    copyLines: [string, string]
  }
}

export const hero: HeroData = {
  contactHref,
  backIllust: { src: 'img/1stview_illust@2x.png', alt: '' },
  sp: {
    titleId: { src: 'img/pc_site_id@2x.png', alt: '' },
    titleTop: { src: 'img/sp_title_top_image@2x.png', alt: '' },
    copy: '作りたいものを作り、困ったときに助け合える。そんなコミュニティです。リモート参加OK!',
  },
  pc: {
    titleId: { src: 'img/pc_site_id@2x.png', alt: "プロジェクト開発型勉強会 Creator's Guild" },
    titleTop: { src: 'img/pc_title_top_image@2x.png', alt: '' },
    copyLines: [
      '作りたいものを作り、困ったときに助け合える',
      'そんなコミュニティです。リモート参加OK!',
    ],
  },
}

// リッチテキスト（段落内のインライン強調・改行）を表すノード。
//   文字列      → テキスト
//   { strong } → <strong>...</strong>（class なし）
//   { br }     → <br/>
export type RichNode =
  | string
  | { strong: string }
  | { br: true }

export type IntroSectionData = {
  id: string
  sectionClass: string
  heading: { pre: string; strong: string } // <h2><span>{pre}<strong class="g_green">{strong}</strong></span></h2>
  subheading: string // <h3>
  paragraphs: RichNode[][] // 各要素が 1 つの <p>
  contactHref?: string // 指定時のみ ContactButton を描画
  image: { className: string; src: string; alt: string }
}

// 紹介セクション（旧 Introduction の first_view / second_view / forth_view）。
export const introSections: IntroSectionData[] = [
  {
    id: 'first_view',
    sectionClass: 'view odd clfx',
    heading: { pre: 'わたしたちは', strong: 'プロジェクトでつながっていく' },
    subheading: '｢こんなことをやってみたい｣を実現する場所です。',
    paragraphs: [
      [
        '「こんなものがあったらいいな」というプロジェクトを企画し、',
        { strong: '実際に作りながら勉強するためのコミュニティ' },
        'です。',
      ],
      [
        'プロジェクトを通じて、気づきやノウハウをだれかに伝えたり、フィードバックを貰えるとモチベーションもアップします。',
        { br: true },
        'また、１つのプロジェクトでの気づきが、他のプロジェクトの助けになることもあります。',
      ],
    ],
    image: { className: 'first', src: 'img/pc_2ndview_illust@2x.png', alt: '' },
  },
  {
    id: 'second_view',
    sectionClass: 'view even clfx',
    heading: { pre: 'まずはアイデアを', strong: 'みんなにシェア' },
    subheading: 'まずはメンバーに、アイデアや課題をシェアしてみよう！',
    paragraphs: [
      [
        'コミュニティー全体で意見を募ったり、実現方法を検討できます。',
        { br: true },
        'それが、',
        { strong: 'さらなるアイデアを生むことにも繋がります。' },
        { br: true },
        'みんなの力を合わせて、課題をクリアしていきましょう!',
      ],
    ],
    image: { className: 'second', src: 'img/pc_3rdview_illust@2x.png', alt: '' },
  },
  {
    id: 'forth_view',
    sectionClass: 'view odd clfx',
    heading: { pre: 'いっしょに', strong: 'スキルアップしませんか？' },
    subheading: 'クリエイターズギルドはメンバーを募集中です!',
    paragraphs: [
      ['ちょっとしたスキルを学びたい。一緒に学習したいという方、ぜひお問い合わせフォームからご連絡ください！'],
    ],
    contactHref,
    image: { className: 'forth', src: 'img/pc_4thview_illust@2x.png', alt: '' },
  },
]
