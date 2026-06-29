import React, { FC } from 'react'
import { nav, contactHref } from '../../content/site'

// ヘッダー（SP/PC 2 系統）。nav は content/site.ts から駆動。出力は従来と不変。
const Header: FC = () => (
  <header id={"header"}>
    <div className={"sp_header"}>
      <div className={"inbox clfx"}>
        <div className={"logo"}>
          <a href={"/"}>
            <img className={"logo_pict"} src={"/img/logo@2x.png"} alt={""}/>
            <img className={"logo"} src={"/img/sp_site_id@2x.png"} alt={"プロジェクト開発型勉強会 Creator's Guild"}/>
          </a>
        </div>

        <label className={"menu-btn"} htmlFor={"menu"}>
          <span className={"bar top"}></span>
          <span className={"bar middle"}></span>
          <span className={"bar bottom"}></span>
          <span className={"menu-btn_text"}>menu</span>
        </label>
      </div>
    </div>

    <div className={"pc_header"}>
      <div className={"header-w"}>
        <div className={"inbox"}>

          <dl className={"pc_logo"}>
            <dt><img src={"/img/logo@2x.png"} alt=""/></dt>
            <dd><img src={"/img/pc_site_id_tate@2x.png"} alt=""/></dd>
          </dl>

          <ul className={"pc_head_menu"}>
            {nav.map((item) => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>

          <div className={"pc_mail"}>
            <a href={contactHref}>
              <dl>
                <dt><img src={"/img/pict_mail@2x.png"} alt={""} /></dt>
                <dd>メンバー随時<br/>募集中</dd>
              </dl>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
)

export default Header
