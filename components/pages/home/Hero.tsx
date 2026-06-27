import React, { FC } from 'react'
import ContactButton from '../../ui/ContactButton'

// ヒーロー（旧 MainImageBlock）。SP/PC の 2 系統。出力は従来と不変。
const Hero: FC = () => (
  <React.Fragment>
    <div id="sp_main_image">
      <div className="back_image">
        <img src="img/1stview_illust@2x.png" alt=""/>
      </div>
      <p className="title"><img src="img/pc_site_id@2x.png" alt=""/></p>
      <dl className="top_copy clfx">
        <dt><img src="img/sp_title_top_image@2x.png" alt=""/></dt>
        <dd>作りたいものを作り、困ったときに助け合える。そんなコミュニティです。リモート参加OK!</dd>
      </dl>
      <ContactButton href="#linkURL" />
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
  </React.Fragment>
)

export default Hero
