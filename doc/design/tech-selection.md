# 技術選定（Creator's Guild サイト完成）

> 決定事項は [README.md §7](./README.md) に反映する。本書は選定の根拠と候補比較。
> 確定方針: **複数ページ（D1）/ サーバーサイド PHP（D2）/ Next.js 静的フロント**。
> 制約: 配信は **XServer 共有ホスティング**（Apache + PHP 8.x、Node/SSR 不可、Composer はローカル/Docker で実行しFTP反映）。

---

## A. フロントエンド（確定の再確認）

- **Next.js 13 Pages Router + 静的エクスポート（`output:'export'`）** を継続。
- 複数ページは `pages/{index,project,remote,member,contact}.tsx` で表現 → `out/` に各HTML生成。
- Apache のディレクトリ配信に合わせ **`trailingSlash: true`**（`/project/` → `out/project/index.html`）を採用予定。
- 画像は `<img>`（`next/image` は静的エクスポートで最適化不可のため不使用）。
- 内部遷移は `next/link`。

> これは既定路線で大きな選定要素なし。論点は **B（PHP）** と **C（コンテンツ管理）**。

---

## B. サーバーサイド（PHP）— フォーム/メール処理

フロントの問い合わせ/メンバー募集フォームを、同一ドメインの PHP エンドポイント（例 `/api/contact.php`）が受ける。

### B-1. PHP の構成方式
| 方式 | 概要 | 長所 | 短所 | 適性 |
|---|---|---|---|---|
| **vanilla（単一エンドポイント）** | `contact.php` 1〜数ファイル | 最小・依存ほぼ無し・FTP反映が楽 | 規模拡大で散らかる | ◎（フォーム1〜2本） |
| micro-framework（Slim 等） | 軽量ルータ+DI | API が増えても整理しやすい | Composer/vendor 必要・やや過剰 | △ |
| full（Laravel 等） | フルスタック | 大規模に強い | 共有ホスティングに重い・過剰 | ✕ |

→ **推奨: vanilla**。フォーム送信が主目的のため単一エンドポイントで十分。将来 API が増えたら micro へ。

### B-2. メール送信ライブラリ
| 方式 | 概要 | 長所 | 短所 |
|---|---|---|---|
| PHP `mail()` | 標準関数 | 依存ゼロ。XServer はドメインメールに SPF/DKIM 設定済で到達性も実用 | 添付/SMTP認証/多言語ヘッダで手作業、迷惑メール判定リスク |
| **PHPMailer（SMTP）** | デファクトのメールライブラリ | XServer の SMTP 認証で確実送信、日本語ヘッダ/添付容易、実績豊富 | vendor をFTP反映する必要（Composer→FTP） |
| Symfony Mailer | モダン | 高機能 | Composer 依存が重め |
| 外部API（Resend/SendGrid） | API送信 | 到達性・ログ◎ | 外部依存・APIキー管理・無料枠 |

→ **推奨: PHPMailer + XServer SMTP**（受信先は creatorsguild.info のメールボックス）。`mail()` は最小だが日本語/到達性で PHPMailer が無難。vendor はローカルで composer 取得 → FTP 反映（`out/` の `--delete` 対象外に置く）。

### B-3. 迷惑メール対策（必須）
- **honeypot**（隠しフィールド）+ **時間トラップ**（即時送信を弾く）: 依存ゼロ・即導入
- **reCAPTCHA v3**（推奨追加）: Google、静的フロントでも利用可（サイトキー/シークレット必要）
- サーバ側で **入力バリデーション**（必須項目・メール形式・最大長）と **レート制限**（簡易: IP+時刻）

### B-4. デプロイ上の扱い（重要）
現 `deploy-ftp.sh` は `out/` を `--delete` で同期するため、PHP を素朴に置くと消える/衝突する。方針候補:
- (i) PHP を **`public/api/`** に置き、Next が `out/api/` へコピー → 1回の mirror で一緒に上がる（ただし `next build` がコピーするのは静的のみ。PHP も `public/` 配下なら `out/` にコピーされる＝有効）
- (ii) PHP を **別ディレクトリ管理**＋ deploy スクリプトに「PHP同期ステップ」を追加（`out/` mirror から `--exclude api/`）
→ **推奨: (i)**。`public/api/contact.php` 等に置けば Next が `out/api/` へ出力し、既存パイプラインで反映可。vendor(PHPMailer) も `public/api/vendor/` に同梱。

---

## C. コンテンツ管理（D3 の選定）

文言・セクション・（将来）メンバー/プロジェクト一覧をどう持つか。編集者は当面**開発者**想定。

| 方式 | 概要 | 長所 | 短所 | 適性 |
|---|---|---|---|---|
| **TS/JSON データ** | `content/*.ts` に文言/配列を分離 | 型安全・ビルド時取込・依存ゼロ・差分明確 | 非開発者には編集ハードル | ◎（固定文言・nav・セクション） |
| **MDX** | 記事をMDで記述 | 文章ページ（project/member 紹介）が書きやすい | 設定追加（@next/mdx 等） | ○（記事的ページ） |
| ヘッドレスCMS（microCMS 等） | 管理画面で編集→ビルド時取得 | 非開発者が編集可・JP対応(microCMS) | 外部依存/費用・ビルド連携 | △（非開発者編集が必要なら） |
| 直書き継続 | 現状維持 | 最小 | 保守性低・重複 | △ |

→ **推奨（段階的）**:
1. まず **TS/JSON データ化**（nav・各セクションのコピー・募集先メール等を `content/` に集約）。リファクタ（出力不変）と同時に実施しやすい。
2. project/member の「紹介記事」が増えるなら **MDX** を追加。
3. 運用で**非開発者がコンテンツ編集**する要件が出たら **microCMS** 等を再検討（ビルド時フェッチで静的維持）。

---

## D. 推奨スタック（まとめ）
| 領域 | 推奨 |
|---|---|
| フロント | Next.js 13 Pages Router + 静的エクスポート（`trailingSlash:true`） |
| ルーティング | `pages/{index,project,remote,member,contact}.tsx` |
| サーバー(PHP) | vanilla 単一エンドポイント `public/api/contact.php` |
| メール | PHPMailer + XServer SMTP（受信先: creatorsguild.info メールボックス） |
| スパム対策 | honeypot + 時間トラップ +（推奨）reCAPTCHA v3 |
| コンテンツ | TS/JSON データ化 →（必要なら）MDX →（必要なら）microCMS |
| スタイル | 既存の静的CSS（`public/css`）を正として維持 |
| デプロイ | 既存 `deploy-ftp.sh`（PHPは `public/api/` 同梱で同一パイプライン） |

## E. 選定結果（確定）
1. **PHP メール方式**: ✅ PHPMailer + XServer SMTP
2. **スパム対策**: ✅ honeypot + reCAPTCHA v3
3. **コンテンツ管理**: ✅ まず TS/JSON データ化（将来 MDX/microCMS は必要時）

### 実装前に要提供（ユーザー）
- フォーム**受信先メールアドレス**（creatorsguild.info の実在メールボックス）
- XServer **SMTP 認証情報**（ホスト/ポート/ユーザー/パス）→ `.env`(git外)
- **reCAPTCHA v3** サイトキー/シークレット（Google reCAPTCHA 管理コンソールで登録）

> 実装着手時、各技術の最新バージョン/セットアップ（PHPMailer, reCAPTCHA v3, @next/mdx 等）は
> 公式ドキュメントで裏取りしてから入る。
