// お問い合わせフォームの送信ロジック（UI から切り出してテスト可能にする）。
// pages/contact.tsx はこれらのヘルパーを使って描画とイベント結線だけを担う。

import {
  contactEndpoint,
  honeypotField,
  recaptchaAction,
  recaptchaSiteKey,
} from '../content/contact';

// reCAPTCHA v3 グローバル（外部スクリプトで window に注入される）。
export type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

// PHP 側に送る JSON payload。honeypot/recaptcha フィールド名はサーバ側と一致させる。
export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  recaptcha_token: string;
} & {
  // honeypot フィールド（フィールド名は honeypotField の値で動的に決まる）。
  [K in typeof honeypotField]: string;
};

// PHP 側の JSON 応答（成功/失敗共通の最小スキーマ）。
export type ContactResponse = {
  ok?: boolean;
  error?: string;
  errors?: Partial<Record<'name' | 'email' | 'message', string>>;
};

// 送信成功/失敗をフロント側で扱うために正規化した結果。
export type ContactResult =
  | { kind: 'success' }
  | { kind: 'error'; message: string; fieldErrors: NonNullable<ContactResponse['errors']> };

// FormData → 送信 payload。FormData にキーが無い場合は空文字を埋める。
export function buildContactPayload(
  fd: FormData,
  recaptchaToken: string,
): ContactPayload {
  return {
    name: String(fd.get('name') ?? ''),
    email: String(fd.get('email') ?? ''),
    message: String(fd.get('message') ?? ''),
    [honeypotField]: String(fd.get(honeypotField) ?? ''),
    recaptcha_token: recaptchaToken,
  } as ContactPayload;
}

// fetch の Response から ContactResult を作る。res.ok=false / body!=ok のいずれも error 扱い。
export async function parseContactResponse(
  res: Response,
  fallbackError: string,
): Promise<ContactResult> {
  const data: ContactResponse | null = await res.json().catch(() => null);
  if (res.ok && data && data.ok) {
    return { kind: 'success' };
  }
  return {
    kind: 'error',
    message: (data && data.error) || fallbackError,
    fieldErrors: (data && data.errors) || {},
  };
}

// reCAPTCHA v3 トークン取得。サイトキー未設定 / 未ロード / 失敗時はすべて空文字を返す
// （サーバ側もキー未設定なら検証スキップする運用）。
export function getRecaptchaToken(
  siteKey: string = recaptchaSiteKey,
  action: string = recaptchaAction,
  win: Window | undefined = typeof window === 'undefined' ? undefined : window,
): Promise<string> {
  if (!siteKey || !win || !win.grecaptcha) {
    return Promise.resolve('');
  }
  const grecaptcha = win.grecaptcha;
  return new Promise((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(siteKey, { action })
        .then(resolve)
        .catch(() => resolve(''));
    });
  });
}

// 送信先 URL を再エクスポート（呼び出し側がこのモジュール 1 つで完結するように）。
export { contactEndpoint };
