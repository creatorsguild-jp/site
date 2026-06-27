import React, { FC } from 'react'

// 紹介セクション2（second_view）。出力は従来と不変。
const IntroShare: FC = () => (
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
)

export default IntroShare
