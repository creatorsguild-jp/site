import {FC, default as React, ReactNode} from 'react'

type ContainerProps = {
  title: ReactNode
  preTitle?: ReactNode
  postTitle?: ReactNode
}

type Props = {} & ContainerProps

const Component: FC<Props> = () => (
  <header id={"header"}>
    <div className={"sp_header"}>
      <div className={"inbox clfx"}>
        <div className={"logo"}>
          <a href={"index.html"}>
            <img className={"logo_pict"} src={"img/logo@2x.png"} alt={""}/>
            <img className={"logo"} src={"img/sp_site_id@2x.png"} alt={"プロジェクト開発型勉強会 Creator's Guild"}/>
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
            <dt><img src={"img/logo@2x.png"} alt=""/></dt>
            <dd><img src={"img/pc_site_id_tate@2x.png"} alt=""/></dd>
          </dl>

          <ul className={"pc_head_menu"}>
            <li><a href={"index.html"}>HOME</a></li>
            <li><a href={"project.html"}>プロジェクト紹介</a></li>
            <li><a href={"remote.html"}>リモート参加について</a></li>
            <li><a href={"member.html"}>メンバー紹介</a></li>
            <li><a href={"contact.html"}>お問い合わせ</a></li>
          </ul>

          <div className={"pc_mail"}>
            <a href={"mailto:dummy@example.com"}>
              <dl>
                <dt><img src={"img/pict_mail@2x.png"} alt={""} /></dt>
                <dd>メンバー随時<br/>募集中</dd>
              </dl>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
)

const Container: FC<ContainerProps> = (props) => {
  return <Component {...props} />
}

Container.displayName = 'Header'

export default Container
