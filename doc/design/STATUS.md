# 作業ステータス / 再開ガイド（Resume）

> 最終更新: 2026-06-28。次回はこのファイル + `bd ready` を見れば続きから再開できる。

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

サイト現状: 5ページ（`/ /project/ /remote/ /member/ /contact/`）。`/project /remote /member` は「準備中」雛形、`/contact` はフォーム雛形（honeypot + 各項目、`action="/api/contact.php"`）。

## 次にやること → Phase5: PHPフォーム（beads `site-gwm.8`）
`/contact/` のフォームを実際に動かす。実装方針（確定済）:
- `public/api/contact.php`（vanilla 単一エンドポイント）→ `next build` で `out/api/` に出力され既存FTPパイプラインで反映
- **PHPMailer**（XServer SMTP）でメール送信。vendor は `public/api/vendor/` に同梱
- **honeypot + reCAPTCHA v3**、サーバ側バリデーション
- フロント `/contact/` フォームから同一ドメインへ POST（CORS不要）

### 🔑 着手前にユーザーから入手が必要（未取得）
1. 受信先メールアドレス（例 `info@creatorsguild.info` の実在ボックス）
2. XServer SMTP 認証（host / port / user / pass）→ `.env`（git外）で管理
3. reCAPTCHA v3 サイトキー / シークレット（Google reCAPTCHA 管理画面で登録）

## その後
- Phase6 品質（`site-gwm.9`）: ページ別メタ/OGP、レスポンシブ、Lighthouse、リンク切れ、フォーム実送信テスト
- 本番反映（`site-gwm.3`）: `./deploy/deploy-ftp.sh`（dry-run → `--apply`）。`out/api/` に PHP/vendor が含まれることを確認してから反映（旧2020サイトを置換）
- 任意の残データ化: Hero copy/images・meta/OGP を content/ へ

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
