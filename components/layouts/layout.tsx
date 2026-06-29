import React, { FC } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import {
  PageMeta,
  composeCanonicalUrl,
  composePageTitle,
  pageMeta,
  siteName,
  siteUrl,
} from '../../content/site';
import {
  buildOrganization,
  buildWebSite,
  serializeJsonLd,
} from '../../lib/structured-data';

type Props = {
  // ページ別メタ（未指定時はホームを既定にする）。
  meta?: PageMeta;
  children?: React.ReactNode;
};

const Layout: FC<Props> = ({ children, meta = pageMeta.home }) => {
  const fullTitle = composePageTitle(meta);
  const ogUrl = composeCanonicalUrl(meta);
  const isHome = meta.path === '/';

  // 構造化データ: 組織情報は全ページ、WebSite はトップのみ。
  const organizationLd = serializeJsonLd(
    buildOrganization({
      name: siteName,
      url: siteUrl,
      logoPath: '/img/logo@2x.png',
    }),
  );
  const websiteLd = isHome
    ? serializeJsonLd(
        buildWebSite({
          name: siteName,
          url: siteUrl,
          description: pageMeta.home.description,
        }),
      )
    : null;

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
        <script
          type="application/ld+json"
          key="ld-organization"
          dangerouslySetInnerHTML={{ __html: organizationLd }}
        />
        {websiteLd && (
          <script
            type="application/ld+json"
            key="ld-website"
            dangerouslySetInnerHTML={{ __html: websiteLd }}
          />
        )}
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
      <Header />
      <section className="section">
        <div className="container">{children}</div>
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
