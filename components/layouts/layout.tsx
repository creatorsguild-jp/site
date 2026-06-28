import React, { FC } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { PageMeta, pageMeta, siteName, siteUrl } from '../../content/site';

type Props = {
  // ページ別メタ（未指定時はホームを既定にする）。
  meta?: PageMeta;
  children?: React.ReactNode;
};

const Layout: FC<Props> = ({ children, meta = pageMeta.home }) => {
  // home はブランド名のみ、下層ページは "ページ名 | サイト名"。
  const isHome = meta.path === '/';
  const fullTitle = isHome ? siteName : `${meta.title} | ${siteName}`;
  const ogUrl = `${siteUrl}${meta.path}`;

  return (
    <div>
      <Head>
        <title>{fullTitle}</title>
        {/* ページ別メタ/OGP（key で _document の既定や重複と統合）。 */}
        <meta name="description" content={meta.description} key="description" />
        <meta property="og:title" content={meta.title} key="og:title" />
        <meta
          property="og:description"
          content={meta.description}
          key="og:description"
        />
        <meta property="og:url" content={ogUrl} key="og:url" />
        <link rel="canonical" href={ogUrl} key="canonical" />
        <link
          rel="stylesheet"
          type="text/css"
          media="all"
          href="/css/reset.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          media="all"
          href="/css/common.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          media="all"
          href="/css/modal.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          media="all"
          href="/css/top.css"
        />
      </Head>
      <Header title={'hoge'} />
      <section className="section">
        <div className="container">{children}</div>
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
