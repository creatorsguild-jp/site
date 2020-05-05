import * as React from 'react'
import Head from 'next/head'
import Header from './Header'

type Props = {
  title?: string
  isHeader?: boolean
  isFooter?: boolean
}

const Layout: React.FunctionComponent<Props> = ({
                                                    children,
                                                    title = 'Yana Sample Screen Title',
                                                    isHeader = true,
                                                    isFooter = true,
                                                }) => (
  <div>
    <Head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/img/favicon.ico"/>
      <link rel="apple-touch-icon" href="/img/apple-touch-icon.png"/>

      <title>{title}</title>

      <meta name="description" content="作りたいものを作り、困ったときに助け合える。そんなコミュニティです。リモート参加OK!"/>
      <meta name="keywords" content="開発,ものづくり,仲間,課題,解決,コミュニティ,メンバー募集"/>
      <meta name="author" content="クリエイターズギルド Creator's Guild"/>

      <link rel="stylesheet" type="text/css" media="all" href="/css/reset.css"/>
      <link rel="stylesheet" type="text/css" media="all" href="/css/common.css"/>
      <link rel="stylesheet" type="text/css" media="all" href="/css/modal.css"/>
      <link rel="stylesheet" type="text/css" media="all" href="/css/top.css"/>

      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://creatorsguild.info/"/>
      <meta property="og:image" content="img/ogg_image.png"/>
      <meta property="og:site_name" content="クリエイターズギルド Creator's Guild"/>
      <meta property="og:locale" content="ja_JP"/>
      <meta property="og:description" content="作りたいものを作り、困ったときに助け合える。そんなコミュニティです。リモート参加OK!"/>
    </Head>
    <Header title={"hoge"} />
    <section className="section">
      <div className="container">
        {children}
      </div>
    </section>
    <footer id={"footer"}>
    </footer>
  </div>
)

export default Layout
