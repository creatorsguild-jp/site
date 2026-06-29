import React, { FC } from 'react'
import ContactButton from '../../ui/ContactButton'
import { hero } from '../../../content/home'

// ヒーロー（旧 MainImageBlock）。SP/PC の 2 系統。
// 文言/画像/リンクは content/home.ts の hero に集約済み（D3: TS/JSON データ化）。
// 出力は従来と不変。
const Hero: FC = () => (
  <React.Fragment>
    <div id="sp_main_image">
      <div className="back_image">
        <img src={hero.backIllust.src} alt={hero.backIllust.alt}/>
      </div>
      <p className="title"><img src={hero.sp.titleId.src} alt={hero.sp.titleId.alt}/></p>
      <dl className="top_copy clfx">
        <dt><img src={hero.sp.titleTop.src} alt={hero.sp.titleTop.alt}/></dt>
        <dd>{hero.sp.copy}</dd>
      </dl>
      <ContactButton href={hero.contactHref} />
    </div>

    <div id="pc_main_image">
      <div className="back_image">
        <div className="illust">
          <img src={hero.backIllust.src} alt={hero.backIllust.alt}/>
        </div>

        <div className="main_copy">
          <div className="pc_illust"><img src={hero.pc.titleTop.src} alt={hero.pc.titleTop.alt}/></div>
          <div className="title">
            <h1><img src={hero.pc.titleId.src} alt={hero.pc.titleId.alt}/></h1>
            <p>{hero.pc.copyLines[0]}<br/>{hero.pc.copyLines[1]}</p>
          </div>
        </div>

      </div>
    </div>
  </React.Fragment>
)

export default Hero
