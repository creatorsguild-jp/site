import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import Script from 'next/script';
import Layout from '../components/layouts/layout';
import {
  contactCopy,
  contactEndpoint,
  contactFields,
  honeypotField,
  recaptchaAction,
  recaptchaSiteKey,
} from '../content/contact';

// grecaptcha は外部スクリプトで window に注入される。
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

type Status = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

// reCAPTCHA v3 トークンを取得する。サイトキー未設定や未ロード時は空文字を返す（=検証スキップ運用）。
function getRecaptchaToken(): Promise<string> {
  if (
    !recaptchaSiteKey ||
    typeof window === 'undefined' ||
    !window.grecaptcha
  ) {
    return Promise.resolve('');
  }
  const grecaptcha = window.grecaptcha;
  return new Promise((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(recaptchaSiteKey, { action: recaptchaAction })
        .then(resolve)
        .catch(() => resolve(''));
    });
  });
}

// お問い合わせ / メンバー募集フォーム。
// 送信は同一ドメインの PHP（/api/contact.php）へ JSON POST（CORS 不要）。
// JS 無効時も action/method により通常 POST にフォールバックする。
const ContactPage: NextPage = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (status === 'sending') return;
      setStatus('sending');
      setMessage('');
      setFieldErrors({});

      const form = e.currentTarget;
      const fd = new FormData(form);
      const payload: Record<string, string> = {
        name: String(fd.get('name') ?? ''),
        email: String(fd.get('email') ?? ''),
        message: String(fd.get('message') ?? ''),
        [honeypotField]: String(fd.get(honeypotField) ?? ''),
      };

      try {
        payload.recaptcha_token = await getRecaptchaToken();
        const res = await fetch(contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => null);

        if (res.ok && data && data.ok) {
          setStatus('success');
          setMessage(contactCopy.success);
          form.reset();
          return;
        }
        setStatus('error');
        setFieldErrors((data && data.errors) || {});
        setMessage((data && data.error) || contactCopy.errorGeneric);
      } catch {
        setStatus('error');
        setMessage(contactCopy.errorNetwork);
      }
    },
    [status],
  );

  return (
    <Layout title={contactCopy.title}>
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      )}
      <section id="content">
        <div className="inbox">
          <h1>{contactCopy.title}</h1>
          <p>{contactCopy.lead}</p>

          {status === 'success' ? (
            <p role="status" className="form-success">
              {message}
            </p>
          ) : (
            <form
              action={contactEndpoint}
              method="post"
              onSubmit={onSubmit}
              noValidate>
              {/* honeypot: スパム対策。人間には不可視・bot は入力しがち。サーバ側でも検証。 */}
              <p
                style={{ position: 'absolute', left: '-9999px' }}
                aria-hidden="true">
                <label>
                  この欄は入力しないでください
                  <input
                    type="text"
                    name={honeypotField}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </p>

              {contactFields.map((field) => (
                <p key={field.name}>
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={field.rows}
                      required={field.required}
                    />
                  ) : (
                    <input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      autoComplete={field.autoComplete}
                    />
                  )}
                  {fieldErrors[field.name] && (
                    <span role="alert" className="form-error">
                      {fieldErrors[field.name]}
                    </span>
                  )}
                </p>
              ))}

              {status === 'error' && message && (
                <p role="alert" className="form-error">
                  {message}
                </p>
              )}

              <p>
                <button type="submit" disabled={status === 'sending'}>
                  {status === 'sending'
                    ? contactCopy.sendingLabel
                    : contactCopy.submitLabel}
                </button>
              </p>

              {recaptchaSiteKey && (
                <p className="recaptcha-note">
                  このサイトは reCAPTCHA によって保護されており、Google の
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noreferrer">
                    プライバシーポリシー
                  </a>
                  と
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noreferrer">
                    利用規約
                  </a>
                  が適用されます。
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
