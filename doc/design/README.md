# Creator's Guild サイト 設計（完成に向けて）

> 本ドキュメントは「サイトを完成させる仕組み」の設計ハブ。現状分析・目標・アーキテクチャ・
> ロードマップを集約する。決定が固まり次第このファイルを更新していく（生きた設計書）。

## 1. 目的・現状

**目的**: プロジェクト開発型コミュニティ「Creator's Guild」の紹介サイト（LP）。主目的は**メンバー募集**。

**技術スタック**
- Next.js 13（Pages Router）+ React 18 + TypeScript
- スタイル: 静的CSS（`public/css/{reset,common,modal,top}.css`）が主、`styled-components` も依存に存在
- 配信: **静的エクスポート（`next build` → `out/`）を XServer の `creatorsguild.info/public_html` へ FTP 反映**
  - 仕組みは構築済み: `next.config.js`(output:'export') + `deploy/deploy-ftp.sh`（dry-run既定 / `--apply`）+ `npm run deploy`
  - サーバは静的ホスティング（Node/SSR 不可）→ 設計はすべて**静的前提**

**現状のページ構成**
- `pages/index.tsx` → `components/pages/home`（= 単一ページLP）
- `components/layouts/`: `layout.tsx`（共通レイアウト）, `Header.tsx`
- `components/pages/home/`: `MainImageBlock.tsx`（ヒーロー: SP/PC 2系統）, `Introduction.tsx`（紹介3セクション）

**🔴 未完成・課題（旧2020サイトから引き継いだもの。旧サイト自体が未完成だった）**
| 項目 | 内容 |
|---|---|
| ヘッダーnav が死んでいる | `project.html` / `remote.html` / `member.html` / `contact.html` は存在せず 404 |
| 問い合わせ/募集が placeholder | `#linkURL` / `#linlURL`（typo）/ `mailto:dummy@example.com` |
| フッターが空 | `<footer id="footer"></footer>` |
| マークアップの綻び | セクションID `forth_view`（typo, `third_view` 欠番）、リンク `#linlURL`（typo） |
| コンテンツがコード直書き | 文言が JSX 埋め込み、見出しの一部が画像（`pc_site_id@2x.png` 等） |
| 整形未統一 | prettier 差分多数（ビルドは `eslint.ignoreDuringBuilds` で通している） |

## 2. 「完成」の定義（スコープ）— ✅決定

- **複数ページサイト**として完成させる（D1）。ヘッダーnav 通り `project` / `remote` / `member` / `contact` を実ページ化。
- **サーバーサイドは PHP**（D2）。XServer は PHP ホストなので、フォーム送信などの動的処理を PHP で実装する
  → **Next.js 静的フロント + PHP（フォーム/メール処理）のハイブリッド**構成。
- コンテンツ管理（D3）は **技術選定を先に行う**（→ `tech-selection.md`）。

完成ライン:
1. 4ページ + トップが揃い、ヘッダーnav が実リンクで機能する
2. メンバー募集/問い合わせフォームが PHP 経由で実際に送信・受信できる（迷惑メール対策込み）
3. フッター・メタ/OGP・レスポンシブが整い、死にリンク/typo が解消されている

## 3. アーキテクチャ案

### 3.1 ルーティング / サイトマップ
静的エクスポート前提。Pages Router の `pages/*.tsx` がそのまま静的HTMLになる。
- 単一ページ案: `/`（全セクション）+ `/404`
- 複数ページ案: `/`, `/project`, `/remote`, `/member`, `/contact`（各 `pages/*.tsx`）
  - 静的配信のため、内部リンクは `next/link` を用い、`trailingSlash: true` 化で Apache のディレクトリ配信(`/project/` → `out/project/index.html`)に整合させる（要検討）。

### 3.2 コンポーネント構成（機能/パーツ別・出力不変リファクタと両立）
```
components/
├── layouts/        共通レイアウト（Layout, Header, Footer）
├── sections/       LP のセクション単位（Hero, About, Share, Join …）
└── ui/             再利用パーツ（ContactButton, SectionTitle, Image …）
```
- 現 `MainImageBlock` / `Introduction` を**セクション単位に分割**（`Hero`, `IntroProject`, `IntroShare`, `IntroJoin`）。
- 共通の「メンバー募集ボタン」を `ui/ContactButton` に抽出（現状ヒーローと紹介で重複）。
- **既存の見た目(HTML/CSS)は不変**を原則とし、内部分割のみ（= 既存デザインは変えない）。

### 3.3 コンテンツ戦略 — ★要確認（§7）
現状はコピーが JSX 直書き。完成・保守性のための選択肢:
- (1) **直書き継続**（最小コスト。文言変更はコード編集）
- (2) **データ化**: セクション文言を `content/*.ts|json` に分離し、コンポーネントは描画に専念（編集が容易、型安全）
- (3) **MDX/ヘッドレスCMS**（メンバー紹介・プロジェクト紹介など項目が増える場合に有効）
- 推奨: まず (2)。メンバー/プロジェクト一覧を増やすなら該当ページのみ (3) を検討。

### 3.4 問い合わせ / メンバー募集 — ✅PHP で実装（D2）
XServer の PHP を使い、フォーム送信をサーバーサイドで処理する。
- フロント（Next.js 静的）のフォームが、同一ドメインの PHP エンドポイント（例 `/api/contact.php`）へ POST
- PHP 側: 入力バリデーション → メール送信（受信先要決定）→ サンクス応答（JSON or リダイレクト）
- 迷惑メール対策（reCAPTCHA / honeypot）必須
- 同一オリジンのため CORS 不要。具体的な PHP 実装方式は `tech-selection.md` で選定
- デプロイ注意: `deploy-ftp.sh` は `out/` を `--delete` 同期するため、**PHP ファイルは別管理/別アップロード**（または mirror 対象に含める）必要 → 選定後に反映

### 3.5 スタイル方針
- 現状の静的CSS（`public/css`）を**正**として維持（既存デザイン不変のため）。
- 新規セクション/ページも同じCSS設計に合わせる。styled-components へ全面移行はしない（差分リスク大）。必要時のみ局所利用。

### 3.6 画像/アセット
- `public/img` の `@2x` 群を継続利用。`next/image` は静的エクスポートで最適化不可のため使わず、`<img>` のまま（既存通り）。
- 見出し画像（テキストの画像化）は SEO/可読性の観点で将来テキスト化も検討（デザイン要相談）。

## 4. ロードマップ（フェーズ）— 確定スタック反映

1. **設計合意** ✅（本ドキュメント + §7）
2. **基盤リファクタ（出力不変）**: 現 `MainImageBlock`/`Introduction` を `components/sections/*` に分割、
   共通「募集ボタン」を `components/ui/ContactButton` に抽出、`Footer` 追加。VR で差分ゼロ確認。
3. **コンテンツ TS/JSON データ化**: トップ各セクション文言・nav・募集先を `content/*.ts` に集約。出力不変。
4. **複数ページ化**: `pages/{project,remote,member,contact}.tsx` 追加、`trailingSlash:true`、
   ヘッダー nav を `next/link` の実リンクに、死にリンク/typo（`forth_view`/`#linlURL`）解消。
5. **PHP フォーム実装**: `public/api/contact.php`（vanilla）+ PHPMailer(XServer SMTP) + honeypot + reCAPTCHA v3。
   フロントの contact フォーム → 同 PHP へ POST → バリデーション/送信/結果応答。`.env`(git外) で SMTP/キー管理。
6. **品質**: メタ/OGP（ページ別）、レスポンシブ、Lighthouse、リンク切れ、フォーム実送信テスト。
7. **本番反映**: `./deploy/deploy-ftp.sh`（dry-run → `--apply`）。`out/api/` に PHP/vendor が含まれることを確認。

## 5. 検証・品質ガード
- ビルド: `npm run build`（型チェック有効）。
- 表示確認: `out/` をローカル配信（`python3 -m http.server -d out`）。
- リファクタ時: 変更前後で見た目（スクリーンショット/VR）一致を確認 = **既存デザイン不変**の担保。
- デプロイ: `./deploy/deploy-ftp.sh`（dry-run）→ `--apply`。

## 6. 進捗管理（beads）
- epic `site-gwm`（FTPデプロイ体制 + 完成設計 + リファクタ）配下で管理。
- 本設計タスク = `site-gwm.5`。完成フェーズの子issueは §7 決定後に追加。

## 7. 決定事項（Decisions）
| # | 論点 | 決定 |
|---|---|---|
| D1 | サイト構成 | ✅ **複数ページ**（project/remote/member/contact を実ページ化） |
| D2 | 募集・問い合わせ | ✅ **PHP でサーバーサイド実装**（XServer PHP、フォーム→メール） |
| D3 | コンテンツ管理 | ✅ **TS/JSON データ化**（content/ に集約）。将来必要なら MDX/microCMS |
| D4 | nav 4項目 | ✅ 実ページ化（D1に従う） |
| D5 | PHP 実装方式 | ✅ **vanilla 単一エンドポイント** `public/api/contact.php`（→ `out/api/` で同一パイプライン反映） |
| D6 | フロント↔PHP連携 | ✅ 同一ドメインへ POST（CORS不要） |
| D7 | メール送信 | ✅ **PHPMailer + XServer SMTP**（vendor は `public/api/` 同梱） |
| D8 | スパム対策 | ✅ **honeypot + reCAPTCHA v3**（サイトキー/シークレット要登録） |

### 確定スタック
Next.js13(Pages, 静的export, trailingSlash) / 静的CSS維持 / `public/api/contact.php`(vanilla)
+ PHPMailer(XServer SMTP) + honeypot + reCAPTCHA v3 / コンテンツは `content/`(TS/JSON) / FTPデプロイ流用。

### 実装前に必要な情報（ユーザー提供）
- [ ] フォーム**受信先メールアドレス**（creatorsguild.info の実在メールボックス）
- [ ] XServer の **SMTP 認証情報**（ホスト/ユーザー/パス）— `.env` 管理（git外）
- [ ] **reCAPTCHA v3** サイトキー / シークレットキー（Google で登録）
