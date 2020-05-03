import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="img/favicon.ico" />
        <link rel="apple-touch-icon" href="img/apple-touch-icon.png" />

        <title>一人で悩まずみんなで解決! クリエイターズギルド Creator's Guild</title>

        <meta name="description" content="作りたいものを作り、困ったときに助け合える。そんなコミュニティです。リモート参加OK!" />
        <meta name="keywords" content="開発,ものづくり,仲間,課題,解決,コミュニティ,メンバー募集" />
        <meta name="author" content="クリエイターズギルド Creator's Guild" />

        <link rel="stylesheet" type="text/css" media="all" href="css/reset.css" />
        <link rel="stylesheet" type="text/css" media="all" href="css/common.css" />
        <link rel="stylesheet" type="text/css" media="all" href="css/modal.css" />
        <link rel="stylesheet" type="text/css" media="all" href="css/top.css" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creatorsguild.info/" />
        <meta property="og:image" content="img/ogg_image.png" />
        <meta property="og:site_name" content="クリエイターズギルド Creator's Guild" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:description" content="作りたいものを作り、困ったときに助け合える。そんなコミュニティです。リモート参加OK!" />
      </Head>

      <input id="menu" class="checkbox" type="checkbox" autocomplete="off" />
      <header id="header">

      <div class="sp_header">
        <div class="inbox clfx">
        <div class="logo"><a href="index.html"><img class="logo_pict" src="img/logo@2x.png" alt=""/><img class="logo" src="img/sp_site_id@2x.png" alt="プロジェクト開発型勉強会 Creator's Guild"/></a></div>

        <label class="menu-btn" for="menu">
          <span class="bar top"></span>
          <span class="bar middle"></span>
          <span class="bar bottom"></span>
          <span class="menu-btn_text">menu</span>
          </label>
          </div>
          </div>


    <div class="pc_header">
    <div class="header-w">
    <div class="inbox">

      <dl class="pc_logo">
        <dt>
        <img src="img/logo@2x.png" alt=""/>
        </dt>
        <dd>
        <img src="img/pc_site_id_tate@2x.png" alt=""/>
        </dd>
      </dl>

    <ul class="pc_head_menu">
      <li><a href="index.html">HOME</a></li>
      <li><a href="project.html">プロジェクト紹介</a></li>
      <li><a href="remote.html">リモート参加について</a></li>
      <li><a href="member.html">メンバー紹介</a></li>
      <li><a href="contact.html">お問い合わせ</a></li>
    </ul>

  <div class="pc_mail">
    <a href="mailto:xxx@xx.xx">
    <dl>
    <dt><img src="img/pict_mail@2x.png" alt=""/></dt>
    <dd>メンバー随時<br />募集中</dd>
    </dl>
    </a>
    </div>

    </div>

    </div>
    </div>
    </header>

    <section id="content">
    <div class="inbox">

  <div id="sp_main_image">
    <div class="back_image">
    <img src="img/1stview_illust@2x.png" alt=""/>
    </div>
    <p class="title"><img src="img/pc_site_id@2x.png" alt=""/></p>
    <dl class="top_copy clfx">
    <dt><img src="img/sp_title_top_image@2x.png" alt=""/></dt>
    <dd>作りたいものを作り、困ったときに助け合える。そんなコミュニティです。リモート参加OK!</dd>
  </dl>
  <div class="contact_btn">
    <a href="#linkURL"><img class="mail_pict" src="img/pict_mail@2x.png" alt=""/>メンバー随時募集中</a>
    </div>
    </div>

    <div id="pc_main_image">
    <div class="back_image">
    <div class="illust">
    <img src="img/1stview_illust@2x.png" alt=""/>
    </div>

    <div class="main_copy">
    <div class="pc_illust"><img src="img/pc_title_top_image@2x.png" alt=""/></div>
    <div class="title">
    <h1><img src="img/pc_site_id@2x.png" alt="プロジェクト開発型勉強会 Creator's Guild"/></h1>
    <p>作りたいものを作り、困ったときに助け合える<br />そんなコミュニティです。リモート参加OK!</p>
  </div>
  </div>

  </div>
  </div>

  <section id="first_view" class="view odd clfx">
    <div class="copy">
    <h2><span>わたしたちは<strong class="g_green">プロジェクトでつながっていく</strong></span></h2>
  <h3>｢こんなことをやってみたい｣を実現する場所です。</h3>
  <p>「こんなものがあったらいいな」というプロジェクトを企画し、<strong>実際に作りながら勉強するためのコミュニティ</strong>です。</p>
  <p>プロジェクトを通じて、気づきやノウハウをだれかに伝えたり、フィードバックを貰えるとモチベーションもアップします。<br />また、１つのプロジェクトでの気づきが、他のプロジェクトの助けになることもあります。</p>
  </div>
  <div class="image">
    <img class="first" src="img/pc_2ndview_illust@2x.png" alt=""/>
    </div>
    </section>

    <section id="second_view" class="view even clfx">
    <div class="copy">
    <h2><span>まずはアイデアを<strong class="g_green">みんなにシェア</strong></span></h2>
  <h3>まずはメンバーに、アイデアや課題をシェアしてみよう！</h3>
  <p>コミュニティー全体で意見を募ったり、実現方法を検討できます。<br />
  それが、<strong>さらなるアイデアを生むことにも繋がります。</strong><br />
  みんなの力を合わせて、課題をクリアしていきましょう!</p>
  </div>
  <div class="image">
    <img class="second" src="img/pc_3rdview_illust@2x.png" alt=""/>
    </div>
    </section>

    <section id="forth_view" class="view odd clfx">
    <div class="copy">
    <h2><span>いっしょに<strong class="g_green">スキルアップしませんか？</strong></span></h2>
  <h3>クリエイターズギルドはメンバーを募集中です!</h3>
  <p>ちょっとしたスキルを学びたい。一緒に学習したいという方、ぜひお問い合わせフォームからご連絡ください！</p>
  <div class="contact_btn">
    <a href="#linlURL"><img class="mail_pict" src="img/pict_mail@2x.png" alt=""/>メンバー随時募集中</a>
    </div>
    </div>
    <div class="image">
    <img class="forth" src="img/pc_4thview_illust@2x.png" alt=""/>
    </div>
    </section>

    </div>
    </section>

      <footer id="footer">
      </footer>
    </div>
  )
}
