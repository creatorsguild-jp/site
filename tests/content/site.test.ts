import { describe, expect, it } from 'vitest';
import {
  composeCanonicalUrl,
  composePageTitle,
  contactHref,
  nav,
  pageMeta,
  siteName,
  siteUrl,
  type PageMeta,
} from '../../content/site';

describe('content/site', () => {
  describe('nav', () => {
    it('5 件の主要ナビを保持する（HOME/プロジェクト/リモート/メンバー/お問い合わせ）', () => {
      expect(nav).toHaveLength(5);
      expect(nav.map((n) => n.label)).toEqual([
        'HOME',
        'プロジェクト紹介',
        'リモート参加について',
        'メンバー紹介',
        'お問い合わせ',
      ]);
    });

    it('すべての href が末尾スラッシュ付き、または "/" 単体である（trailingSlash と整合）', () => {
      for (const item of nav) {
        expect(item.href.endsWith('/')).toBe(true);
      }
    });

    it('contactHref はナビ末尾のお問い合わせ href と一致する', () => {
      expect(contactHref).toBe(nav[nav.length - 1].href);
    });
  });

  describe('pageMeta', () => {
    const keys = ['home', 'project', 'remote', 'member', 'contact'] as const;

    it('5 ページぶんのメタを持つ', () => {
      expect(Object.keys(pageMeta).sort()).toEqual([...keys].sort());
    });

    it('すべてのページが title/description/path を非空文字で持つ', () => {
      for (const key of keys) {
        const meta = pageMeta[key];
        expect(meta.title.length).toBeGreaterThan(0);
        expect(meta.description.length).toBeGreaterThan(0);
        expect(meta.path.length).toBeGreaterThan(0);
      }
    });

    it('home 以外の path は末尾スラッシュ付き', () => {
      for (const key of keys) {
        if (key === 'home') continue;
        expect(pageMeta[key].path.endsWith('/')).toBe(true);
      }
    });

    it('og:url 用に title / description は重複しない', () => {
      const titles = keys.map((k) => pageMeta[k].title);
      const descriptions = keys.map((k) => pageMeta[k].description);
      expect(new Set(titles).size).toBe(titles.length);
      expect(new Set(descriptions).size).toBe(descriptions.length);
    });
  });

  describe('composePageTitle', () => {
    it('home はブランド名（siteName）を返す', () => {
      // 既存挙動: home の <title> は meta.title("Creator's Guild") ではなく siteName 全体。
      expect(composePageTitle(pageMeta.home)).toBe(siteName);
    });

    it('下層ページは "ページ名 | ブランド名" を返す', () => {
      expect(composePageTitle(pageMeta.contact)).toBe(
        `お問い合わせ | ${siteName}`,
      );
      expect(composePageTitle(pageMeta.project)).toBe(
        `プロジェクト紹介 | ${siteName}`,
      );
    });

    it('brand 引数で上書き可能', () => {
      const meta: PageMeta = { title: 'X', description: 'd', path: '/x/' };
      expect(composePageTitle(meta, 'BRAND')).toBe('X | BRAND');
    });
  });

  describe('composeCanonicalUrl', () => {
    it('siteUrl + path を結合する', () => {
      expect(composeCanonicalUrl(pageMeta.home)).toBe(`${siteUrl}/`);
      expect(composeCanonicalUrl(pageMeta.contact)).toBe(
        `${siteUrl}/contact/`,
      );
    });

    it('origin 引数で上書き可能', () => {
      const meta: PageMeta = { title: 'X', description: 'd', path: '/x/' };
      expect(composeCanonicalUrl(meta, 'https://example.test')).toBe(
        'https://example.test/x/',
      );
    });
  });
});
