<?php
/**
 * お問い合わせフォーム設定テンプレート — creatorsguild.info
 *
 * 使い方:
 *   cp public/api/contact.config.example.php public/api/contact.config.php
 *   # contact.config.php に実値を記入する（contact.config.php は .gitignore 済み）
 *
 * 重要:
 *   - 実際の認証情報は contact.config.php にのみ書き、絶対に Git にコミットしないこと。
 *   - このファイルは PHP として実行されるため、ブラウザから直接開いても中身（配列）は
 *     出力されない。加えて public/api/.htaccess で *.config.php への直接アクセスを拒否する。
 *   - next build により public/api/ は out/api/ にコピーされ、既存 FTP パイプラインで反映される。
 *     contact.config.php はローカルに存在する状態で build/deploy すること（無いと送信不可）。
 */

return [
    // ===== 受信先（フォーム送信の届け先）=====
    'to_email'      => 'info@creatorsguild.info', // ★実在の受信ボックス
    'to_name'       => "Creator's Guild",

    // ===== 送信元（XServer のドメインメールアドレスを推奨）=====
    // SPF/DKIM の関係で from は creatorsguild.info ドメインのアドレスにすること。
    'from_email'    => 'no-reply@creatorsguild.info',
    'from_name'     => "Creator's Guild お問い合わせ",
    'subject_prefix' => '[creatorsguild.info お問い合わせ] ',

    // ===== SMTP（XServer）=====
    // XServer: ホスト=サーバ番号.xserver.jp、ポート 587(TLS) または 465(SSL)。
    // username/password はメールアカウント（from_email と同一にするのが無難）。
    'smtp' => [
        'enabled'  => true,
        'host'     => 'sv3057.xserver.jp',
        'port'     => 587,
        'secure'   => 'tls',  // 'tls'(587) | 'ssl'(465) | '' (暗号化なし・非推奨)
        'auth'     => true,
        'username' => 'no-reply@creatorsguild.info',
        'password' => 'your-mailbox-password',
    ],

    // ===== reCAPTCHA v3 =====
    // secret が空文字のときは reCAPTCHA 検証をスキップ（=導入前でもフォームは動作）。
    // サイトキーはフロント側のビルド時環境変数 NEXT_PUBLIC_RECAPTCHA_SITE_KEY に設定する。
    'recaptcha' => [
        'secret'    => '',   // ★Google reCAPTCHA 管理画面のシークレットキー
        'min_score' => 0.5,  // 0.0(bot) 〜 1.0(human)。下回ると拒否。
    ],

    // ===== セキュリティ =====
    // 同一オリジン以外からの POST を弾く（CORS なし運用）。本番ドメインを指定。
    // 空配列なら Origin チェックをスキップ（ローカル動作確認用）。
    'allowed_origins' => [
        'https://creatorsguild.info',
        'https://www.creatorsguild.info',
    ],
    // 簡易フラッド対策（同一 IP の連投を抑制）。0 で無効。
    'min_interval_sec' => 10,
];
