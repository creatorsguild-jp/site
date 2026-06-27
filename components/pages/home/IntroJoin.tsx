import React, { FC } from 'react'
import ContactButton from '../../ui/ContactButton'

// 紹介セクション3（forth_view）。出力は従来と不変（href の typo もそのまま保持）。
const IntroJoin: FC = () => (
  <section id="forth_view" className="view odd clfx">
    <div className="copy">
      <h2><span>いっしょに<strong className="g_green">スキルアップしませんか？</strong></span></h2>
      <h3>クリエイターズギルドはメンバーを募集中です!</h3>
      <p>ちょっとしたスキルを学びたい。一緒に学習したいという方、ぜひお問い合わせフォームからご連絡ください！</p>
      <ContactButton href="#linlURL" />
    </div>
    <div className="image">
      <img className="forth" src="img/pc_4thview_illust@2x.png" alt=""/>
    </div>
  </section>
)

export default IntroJoin
