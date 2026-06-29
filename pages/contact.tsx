import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import Script from 'next/script';
import Layout from '../components/layouts/layout';
import {
  contactCopy,
  contactFields,
  honeypotField,
  recaptchaSiteKey,
} from '../content/contact';
import { pageMeta } from '../content/site';
import {
  buildContactPayload,
  contactEndpoint,
  getRecaptchaToken,
  parseContactResponse,
} from '../lib/contact-form';

type Status = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

// お問い合わせ / メンバー募集フォーム。
// 送信ロジックは lib/contact-form.ts に集約済み。ここでは描画とイベント結線のみ。
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

      try {
        const token = await getRecaptchaToken();
        const payload = buildContactPayload(fd, token);
        const res = await fetch(contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await parseContactResponse(res, contactCopy.errorGeneric);

        if (result.kind === 'success') {
          setStatus('success');
          setMessage(contactCopy.success);
          form.reset();
          return;
        }
        setStatus('error');
        setFieldErrors(result.fieldErrors);
        setMessage(result.message);
      } catch {
        setStatus('error');
        setMessage(contactCopy.errorNetwork);
      }
    },
    [status],
  );

  return (
    <Layout meta={pageMeta.contact}>
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
