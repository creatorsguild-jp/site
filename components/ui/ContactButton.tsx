import React, { FC } from 'react'

type Props = {
  href: string
}

// メンバー募集ボタン（ヒーロー/紹介セクションで共用）。
// 出力不変のため href は呼び出し側から渡す（既存マークアップをそのまま再現）。
const ContactButton: FC<Props> = ({ href }) => (
  <div className="contact_btn">
    <a href={href}><img className="mail_pict" src="img/pict_mail@2x.png" alt=""/>メンバー随時募集中</a>
  </div>
)

export default ContactButton
