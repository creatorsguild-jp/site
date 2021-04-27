import React, { FC } from 'react'
import Head from 'next/head'
import Header from './Header'

type Props = {
  title?: string
}

const Layout: FC<Props> = ({children, title = 'Creator\'s Guild'}) => (
  <div>
    <Head>
      <title>{title}</title>
      <link rel="stylesheet" type="text/css" media="all" href="/css/reset.css"/>
      <link rel="stylesheet" type="text/css" media="all" href="/css/common.css"/>
      <link rel="stylesheet" type="text/css" media="all" href="/css/modal.css"/>
      <link rel="stylesheet" type="text/css" media="all" href="/css/top.css"/>
    </Head>
    <Header title={"hoge"} />
    <section className="section">
      <div className="container">
        {children}
      </div>
    </section>
    <footer id={"footer"}>
    </footer>
  </div>
)

export default Layout
