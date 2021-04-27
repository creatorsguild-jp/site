import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

type Props = {}

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
          <meta name="description" content="作りたいものを作り、困ったときに助け合える。そんなコミュニティです。リモート参加OK!"/>
          <meta name="keywords" content="開発,ものづくり,仲間,課題,解決,コミュニティ,メンバー募集"/>
          <meta name="author" content="クリエイターズギルド Creator's Guild"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://creatorsguild.info/"/>
          <meta property="og:image" content="img/ogg_image.png"/>
          <meta property="og:site_name" content="クリエイターズギルド Creator's Guild"/>
          <meta property="og:locale" content="ja_JP"/>
          <meta property="og:description" content="作りたいものを作り、困ったときに助け合える。そんなコミュニティです。リモート参加OK!"/>
          <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/img/favicon.ico"/>
          <link rel="apple-touch-icon" href="/img/apple-touch-icon.png"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
