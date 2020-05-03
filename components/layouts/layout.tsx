import * as React from 'react'
import Head from 'next/head'

type Props = {
  title?: string
  isHeader?: boolean
  isFooter?: boolean
}

function getHeader(title: string) {
  return (
    <header id={"header"}>
      <div className={"sp_header"}>
        <div className={"inbox clfx"}>
          <div className={"logo"}>
            <a href={"index.html"}>
              <img className={"logo_pict"} src={"img/logo@2x.png"} alt={""}/>
              <img className={"logo"} src={"img/sp_site_id@2x.png"} alt={"プロジェクト開発型勉強会 Creator's Guild"}/>
            </a>
          </div>

          <label className="menu-btn" htmlFor="menu">
            <span className="bar top"></span>
            <span className="bar middle"></span>
            <span className="bar bottom"></span>
            <span className="menu-btn_text">menu</span>
          </label>
        </div>
      </div>

      <div className="pc_header">
        <div className="header-w">
          <div className="inbox">

            <dl className="pc_logo">
              <dt><img src="img/logo@2x.png" alt=""/></dt>
              <dd><img src="img/pc_site_id_tate@2x.png" alt=""/></dd>
            </dl>

            <ul className="pc_head_menu">
              <li><a href="index.html">HOME</a></li>
              <li><a href="project.html">プロジェクト紹介</a></li>
              <li><a href="remote.html">リモート参加について</a></li>
              <li><a href="member.html">メンバー紹介</a></li>
              <li><a href="contact.html">お問い合わせ</a></li>
            </ul>

            <div className="pc_mail">
              <a href="mailto:dummy@example.com">
                <dl>
                  <dt><img src="img/pict_mail@2x.png" alt=""/></dt>
                  <dd>メンバー随時<br/>募集中</dd>
                </dl>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function getFooter() {
    return (
        <footer id={"footer"}>
        </footer>
    );
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
    {isHeader && (getHeader(title))}
    <section className="section">
      <div className="container">
        {children}
      </div>
    </section>
    {isFooter && (getFooter())}
  </div>
)

export default Layout
