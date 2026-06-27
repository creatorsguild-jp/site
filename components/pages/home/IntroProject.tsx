import React, { FC } from 'react'

// 紹介セクション1（first_view）。出力は従来と不変。
const IntroProject: FC = () => (
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
)

export default IntroProject
