# 作業ステータス / 再開ガイド（Resume）

> 最終更新: 2026-06-28（Phase5 コード実装完了）。次回はこのファイル + `bd ready` を見れば続きから再開できる。

## いまの状態
- ブランチ: **`chore/ftp-deploy`**（origin 未 push・ローカルコミット済み）
- プロジェクト: Creator's Guild サイト（Next.js13 Pages Router + 静的エクスポート → XServer FTP 配信）
- ⚠️ `~/work/git/landlord_php` は**別プロジェクト**（貸主物件.com）。同じ XServer アカウントを共有しているだけ。**触らない**。

## 完了済み
| 区分 | 内容 | コミット |
|---|---|---|
| デプロイ体制 | `next.config.js`(static export) + `deploy/deploy-ftp.sh`(dry-run/--apply) + `npm run deploy` | `c42d5a9` |
| 設計/技術選定 | `doc/design/README.md`(決定 D1–D8) + `tech-selection.md` | `626d939` |
| Phase2 リファクタ | `components/{layouts,ui,pages/home}` にパーツ分割（出力不変） | `75b759e` |
| Phase3 データ化 | `content/{home,site}.ts` にコンテンツ集約（出力不変） | `d33bbe9` |
| Phase4 複数ページ化 | `/project /remote /member /contact` 追加・nav 実リンク化・死にアンカー解消 | `142c1fa` |
| Phase5 PHPフォーム(コード) | `public/api/contact.php`(検証/送信) + PHPMailer 同梱 + `/contact` を fetch+reCAPTCHA v3 化 | （本コミット） |

サイト現状: 5ページ（`/ /project/ /remote/ /member/ /contact/`）。`/project /remote /member` は「準備中」雛形、`/contact` は**実働フォーム**（fetch→`/api/contact.php`、honeypot + reCAPTCHA v3 + サーバ側検証）。コードは完成、稼働には下記の秘匿情報入力が必要。

## Phase5 実装内容（コード完了 / beads `site-gwm.8`）
- `public/api/contact.php` — vanilla 単一エンドポイント。JSON 応答。検証: 必須/メール形式/honeypot/reCAPTCHA v3/同一オリジン/連投フラッド。送信: PHPMailer(SMTP)。
- `public/api/vendor/PHPMailer/` — PHPMailer v6.9.1 同梱（git コミット済）。
- `public/api/contact.config.example.php` — 設定テンプレ（受信先/SMTP/reCAPTCHA/許可オリジン）。実値は `contact.config.php`（**git 外**）。
- `public/api/.htaccess` — `*.config.php` と `vendor/` への直アクセス拒否（多層防御）。
- `pages/contact.tsx` + `content/contact.ts` — fetch+JSON 送信、reCAPTCHA v3 トークン取得、結果/エラー表示。JS 無効時は通常 POST にフォールバック。
- Docker(php:8.2) で 405/honeypot/422/429/500 の各経路を動作確認済（PHP fatal/情報漏洩なし）。

### 🔑 稼働させるためにユーザー入力が必要（コードは外部設定を待つだけ）
1. **受信先メール**: `public/api/contact.config.php` の `to_email`（実在ボックス）
2. **XServer SMTP**: 同ファイル `smtp.host/port/secure/username/password`（587=tls / 465=ssl）
3. **reCAPTCHA v3**:
   - シークレット → `contact.config.php` の `recaptcha.secret`（サーバ側）
   - サイトキー → `.env.local` の `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`（フロント・ビルド時埋込）
   - ※ どちらも未設定なら reCAPTCHA はスキップされフォームは動作する（メール設定だけで稼働可）

### Phase5 デプロイ手順（設定後）
```bash
cp public/api/contact.config.example.php public/api/contact.config.php  # 実値を記入（git 外）
cp .env.local.example .env.local                                         # サイトキー記入（任意）
npm run build                                                            # out/ 生成（config は --delete 対象外）
./deploy/deploy-ftp.sh --apply                                           # 反映
# 初回のみ: public_html/api/contact.config.php を手動 FTP アップロード
#   （deploy-ftp.sh は秘匿事故防止のため contact.config.php を mirror から除外している）
```

## Phase6 品質（`site-gwm.9`）— 一部着手
| 項目 | 状態 |
|---|---|
| ページ別メタ/OGP/canonical | ✅ 実装済（`content/site.ts` pageMeta + `layout.tsx` で next/head 出力。全ページ title/description/og:url 一意・重複0） |
| 内部リンク切れ | ✅ 監査済（`out/` の href/src を全走査、欠落0） |
| レスポンシブ確認 | ⬜ 未（実機/ブラウザ確認が必要） |
| Lighthouse | ⬜ 未（Chrome 必要） |
| フォーム実送信テスト | ⬜ 未（本番 SMTP/reCAPTCHA 設定後） |

## その後
- 本番反映（`site-gwm.3`）: `./deploy/deploy-ftp.sh`（dry-run → `--apply`）。`out/api/` に PHP/vendor が含まれることを確認してから反映（旧2020サイトを置換）
- 任意の残データ化: Hero copy/images を content/ へ

## よく使うコマンド
```bash
npm install                         # 依存（node_modules は未コミット）
npm run build                       # 静的エクスポート → out/
python3 -m http.server 4173 -d out  # ローカルプレビュー（http://localhost:4173/）
./deploy/deploy-ftp.sh              # 本番反映 dry-run（既定・サーバ未変更）
./deploy/deploy-ftp.sh --apply      # 本番反映（creatorsguild.info/public_html を置換）
bd ready                            # 次の着手可能タスク
bd list                             # 全タスク
```

## 出力不変リファクタの検証手順（Phase2/3 で使用）
リファクタ前の `out/*.html` を退避 → 変更後に再ビルド → 両者を**正規化してdiff**（空＝出力不変）:
```bash
norm() { sed -E -e 's#/_next/static/[A-Za-z0-9_-]{21}/#/_next/static/BUILDID/#g' \
  -e 's#"buildId":"[A-Za-z0-9_-]+"#"buildId":"BUILDID"#g' -e 's#-[0-9a-f]{16}\.js#-HASH.js#g' "$1"; }
diff <(norm baseline/index.html) <(norm out/index.html)
```

## デプロイ構成メモ
- FTP: `master@creatorsguild.info` @ `sv3057.xserver.jp`（`creatorsguild.info/` に chroot）、docroot = `public_html`
- 認証は `.env.ftp`（**git 追跡外**）。テンプレは `.env.ftp.example`
- 参考: 設計ハブ `doc/design/README.md`、技術選定 `doc/design/tech-selection.md`
