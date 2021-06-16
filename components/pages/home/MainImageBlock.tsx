import React, { FC } from 'react'

const MainImageBlock: FC = () => {
  return (
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
    </React.Fragment>
  )
}

export default MainImageBlock
