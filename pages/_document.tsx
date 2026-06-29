import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          {/* サイト全体で共通の固定メタ。ページ別(title/description/og:title/og:description/og:url)は
              components/layouts/layout.tsx 側で next/head により出力する。 */}
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <meta
            name="keywords"
            content="開発,ものづくり,仲間,課題,解決,コミュニティ,メンバー募集"
          />
          <meta name="author" content="クリエイターズギルド Creator's Guild" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/img/ogg_image.png" />
          <meta
            property="og:site_name"
            content="クリエイターズギルド Creator's Guild"
          />
          <meta property="og:locale" content="ja_JP" />
          <link
            rel="shortcut icon"
            type="image/vnd.microsoft.icon"
            href="/img/favicon.ico"
          />
          <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
          <link rel="icon" type="image/png" href="/img/logo@2x.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
