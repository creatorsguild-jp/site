// public/ 配下の静的ファイル（robots.txt / sitemap.xml）と
// content/site.ts の pageMeta の同期を保証するテスト。
// 片方を更新し忘れたら fail するので、ドリフトを防げる。

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { pageMeta, siteUrl } from '../../content/site';

const repoRoot = resolve(__dirname, '../..');
const robotsTxt = readFileSync(resolve(repoRoot, 'public/robots.txt'), 'utf-8');
const sitemapXml = readFileSync(resolve(repoRoot, 'public/sitemap.xml'), 'utf-8');

describe('public/robots.txt', () => {
  it('User-agent と Allow / Disallow を持つ', () => {
    expect(robotsTxt).toMatch(/^User-agent:\s*\*/m);
    expect(robotsTxt).toMatch(/^Allow:\s*\//m);
    expect(robotsTxt).toMatch(/^Disallow:\s*\/api\//m);
  });

  it('Sitemap ディレクティブが siteUrl と一致する', () => {
    expect(robotsTxt).toMatch(
      new RegExp(`^Sitemap:\\s*${siteUrl.replace(/\./g, '\\.')}/sitemap\\.xml`, 'm'),
    );
  });
});

describe('public/sitemap.xml', () => {
  it('valid な XML 宣言と urlset を持つ', () => {
    expect(sitemapXml).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    expect(sitemapXml).toMatch(/<urlset[^>]+xmlns="http:\/\/www\.sitemaps\.org/);
  });

  it('pageMeta の全 path が <loc> として含まれる（同期保証）', () => {
    for (const meta of Object.values(pageMeta)) {
      const fullUrl = `${siteUrl}${meta.path}`;
      expect(sitemapXml).toContain(`<loc>${fullUrl}</loc>`);
    }
  });

  it('<url> の件数が pageMeta の件数と一致する（過不足なし）', () => {
    const urlCount = (sitemapXml.match(/<url>/g) ?? []).length;
    expect(urlCount).toBe(Object.keys(pageMeta).length);
  });

  it('home の priority が最高（1.0）である', () => {
    // <loc>https://creatorsguild.info/</loc> を含む <url> ブロック内に priority>1.0 がある
    const homeUrlBlock = sitemapXml.match(
      new RegExp(
        `<url>\\s*<loc>${siteUrl.replace(/\./g, '\\.')}/</loc>[\\s\\S]*?</url>`,
      ),
    );
    expect(homeUrlBlock).not.toBeNull();
    expect(homeUrlBlock?.[0]).toMatch(/<priority>1\.0</);
  });
});
