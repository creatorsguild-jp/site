import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/layouts/layout'

// お問い合わせ / メンバー募集フォーム（雛形）。
// 送信処理（PHP + PHPMailer + reCAPTCHA v3）は Phase5 で /api/contact.php に実装する。
const ContactPage: NextPage = () => (
  <Layout title="お問い合わせ">
    <section id="content">
      <div className="inbox">
        <h1>お問い合わせ</h1>
        <p>メンバー募集・お問い合わせはこちらのフォームからご連絡ください。</p>
        <form action="/api/contact.php" method="post">
          {/* honeypot: スパム対策（Phase5 で CSS 非表示＋サーバ側検証） */}
          <p style={{ display: 'none' }} aria-hidden="true">
            <label>この欄は入力しないでください
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <p>
            <label htmlFor="name">お名前（必須）</label>
            <input id="name" type="text" name="name" required />
          </p>
          <p>
            <label htmlFor="email">メールアドレス（必須）</label>
            <input id="email" type="email" name="email" required />
          </p>
          <p>
            <label htmlFor="message">お問い合わせ内容（必須）</label>
            <textarea id="message" name="message" rows={6} required></textarea>
          </p>
          <p>
            <button type="submit">送信する</button>
          </p>
        </form>
      </div>
    </section>
  </Layout>
)

export default ContactPage
