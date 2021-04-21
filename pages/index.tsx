import Layout from '../components/layouts/layout'
import React from 'react'
import { NextPage } from 'next'

const Home: NextPage = () => (
  <Layout title="Topページ">
    <section id="content">
      <div className="inbox">
        <div id="sp_main_image">
          <div className="back_image">
            <img src="img/1stview_illust@2x.png" alt=""/>
          </div>
          <p className="title"><img src="img/pc_site_id@2x.png" alt=""/></p>
          <dl className="top_copy clfx">
            <dt><img src="img/sp_title_top_image@2x.png" alt=""/></dt>
            <dd>作りたいものを作り、困ったときに助け合える。そんなコミュニティです。リモート参加OK!</dd>
          </dl>
          <div className="contact_btn">
            <a href="#linkURL"><img className="mail_pict" src="img/pict_mail@2x.png" alt=""/>メンバー随時募集中</a>
          </div>
        </div>

        <div id="pc_main_image">
          <div className="back_image">
            <div className="illust">
              <img src="img/1stview_illust@2x.png" alt=""/>
            </div>

            <div className="main_copy">
              <div className="pc_illust"><img src="img/pc_title_top_image@2x.png" alt=""/></div>
              <div className="title">
                <h1><img src="img/pc_site_id@2x.png" alt="プロジェクト開発型勉強会 Creator's Guild"/></h1>
                <p>作りたいものを作り、困ったときに助け合える<br/>そんなコミュニティです。リモート参加OK!</p>
              </div>
            </div>

          </div>
        </div>

        <section id="first_view" className="view odd clfx">
          <div className="copy">
            <h2><span>わたしたちは<strong className="g_green">プロジェクトでつながっていく</strong></span></h2>
            <h3>｢こんなことをやってみたい｣を実現する場所です。</h3>
            <p>「こんなものがあったらいいな」というプロジェクトを企画し、<strong>実際に作りながら勉強するためのコミュニティ</strong>です。</p>
            <p>プロジェクトを通じて、気づきやノウハウをだれかに伝えたり、フィードバックを貰えるとモチベーションもアップします。<br/>また、１つのプロジェクトでの気づきが、他のプロジェクトの助けになることもあります。
            </p>
          </div>
          <div className="image">
            <img className="first" src="img/pc_2ndview_illust@2x.png" alt=""/>
          </div>
        </section>

        <section id="second_view" className="view even clfx">
          <div className="copy">
            <h2><span>まずはアイデアを<strong className="g_green">みんなにシェア</strong></span></h2>
            <h3>まずはメンバーに、アイデアや課題をシェアしてみよう！</h3>
            <p>コミュニティー全体で意見を募ったり、実現方法を検討できます。<br/>
              それが、<strong>さらなるアイデアを生むことにも繋がります。</strong><br/>
              みんなの力を合わせて、課題をクリアしていきましょう!</p>
          </div>
          <div className="image">
            <img className="second" src="img/pc_3rdview_illust@2x.png" alt=""/>
          </div>
        </section>

        <section id="forth_view" className="view odd clfx">
          <div className="copy">
            <h2><span>いっしょに<strong className="g_green">スキルアップしませんか？</strong></span></h2>
            <h3>クリエイターズギルドはメンバーを募集中です!</h3>
            <p>ちょっとしたスキルを学びたい。一緒に学習したいという方、ぜひお問い合わせフォームからご連絡ください！</p>
            <div className="contact_btn">
              <a href="#linlURL"><img className="mail_pict" src="img/pict_mail@2x.png" alt=""/>メンバー随時募集中</a>
            </div>
          </div>
          <div className="image">
            <img className="forth" src="img/pc_4thview_illust@2x.png" alt=""/>
          </div>
        </section>

      </div>
    </section>

  </Layout>
)

export default Home
