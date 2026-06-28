// お問い合わせページのコンテンツ・設定をここに集約する（D3: TS/JSON データ化）。
// 送信は同一ドメインの PHP（/api/contact.php, Phase5）へ JSON POST する。

export type ContactField = {
  name: 'name' | 'email' | 'message';
  label: string;
  type: 'text' | 'email' | 'textarea';
  required: boolean;
  autoComplete?: string;
  rows?: number;
};

export const contactCopy = {
  title: 'お問い合わせ',
  lead: 'メンバー募集・お問い合わせはこちらのフォームからご連絡ください。',
  submitLabel: '送信する',
  sendingLabel: '送信中…',
  // 送信結果メッセージ
  success:
    'お問い合わせありがとうございます。担当者より折り返しご連絡いたします。',
  errorGeneric: '送信に失敗しました。時間をおいて再度お試しください。',
  errorNetwork:
    '通信エラーが発生しました。ネットワークをご確認のうえ再度お試しください。',
};

export const contactFields: ContactField[] = [
  {
    name: 'name',
    label: 'お名前（必須）',
    type: 'text',
    required: true,
    autoComplete: 'name',
  },
  {
    name: 'email',
    label: 'メールアドレス（必須）',
    type: 'email',
    required: true,
    autoComplete: 'email',
  },
  {
    name: 'message',
    label: 'お問い合わせ内容（必須）',
    type: 'textarea',
    required: true,
    rows: 6,
  },
];

// 送信先エンドポイント（静的サイトと同一ドメインに配置される PHP）。
export const contactEndpoint = '/api/contact.php';

// honeypot フィールド名（サーバ側 contact.php と一致させる）。
export const honeypotField = 'website';

// reCAPTCHA v3 サイトキー（公開値）。ビルド時環境変数で注入する。
//   .env.local 等に NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxx を設定する。
//   未設定なら reCAPTCHA を読み込まず、サーバ側も検証スキップ（=導入前でも動作）。
export const recaptchaSiteKey =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';
export const recaptchaAction = 'contact';
