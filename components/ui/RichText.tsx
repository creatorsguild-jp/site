import React, { FC, Fragment } from 'react'
import type { RichNode } from '../../content/home'

type Props = {
  nodes: RichNode[]
}

// RichNode 配列を描画する。テキストは要素（<strong>/<br/>）で分離されているため、
// 隣接テキストノードによる SSR コメント区切りは発生せず、既存の静的JSXと同一出力になる。
const RichText: FC<Props> = ({ nodes }) => (
  <>
    {nodes.map((node, i) => {
      if (typeof node === 'string') return <Fragment key={i}>{node}</Fragment>
      if ('br' in node) return <br key={i} />
      return <strong key={i}>{node.strong}</strong>
    })}
  </>
)

export default RichText
