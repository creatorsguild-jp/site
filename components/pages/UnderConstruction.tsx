import React, { FC } from 'react'

type Props = {
  heading: string
}

// 準備中ページの雛形。共通レイアウト内に見出し＋準備中表示を出す。
// 本文は後続フェーズで content/ から投入する。
const UnderConstruction: FC<Props> = ({ heading }) => (
  <section id="content">
    <div className="inbox">
      <h1>{heading}</h1>
      <p>このページは準備中です。</p>
    </div>
  </section>
)

export default UnderConstruction
