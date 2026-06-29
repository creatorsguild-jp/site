import React, { FC } from 'react'
import type { IntroSectionData } from '../../../content/home'
import RichText from '../../ui/RichText'
import ContactButton from '../../ui/ContactButton'

type Props = {
  section: IntroSectionData
}

// 紹介セクション（データ駆動）。旧 IntroProject/IntroShare/IntroJoin を 1 つに統合。
// content/home.ts の introSections から描画。出力は従来と不変。
const IntroSection: FC<Props> = ({ section }) => (
  <section id={section.id} className={section.sectionClass}>
    <div className="copy">
      <h2><span>{section.heading.pre}<strong className="g_green">{section.heading.strong}</strong></span></h2>
      <h3>{section.subheading}</h3>
      {section.paragraphs.map((paragraph, i) => (
        <p key={i}><RichText nodes={paragraph} /></p>
      ))}
      {section.contactHref ? <ContactButton href={section.contactHref} /> : null}
    </div>
    <div className="image">
      <img className={section.image.className} src={section.image.src} alt={section.image.alt} />
    </div>
  </section>
)

export default IntroSection
