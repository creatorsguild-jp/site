import { describe, expect, it } from 'vitest';
import {
  buildOrganization,
  buildWebSite,
  serializeJsonLd,
} from '../../lib/structured-data';

describe('buildOrganization', () => {
  it('schema.org Organization 型のオブジェクトを返す', () => {
    const org = buildOrganization({
      name: 'X',
      url: 'https://x.test',
      logoPath: '/img/logo.png',
    });
    expect(org['@context']).toBe('https://schema.org');
    expect(org['@type']).toBe('Organization');
    expect(org.name).toBe('X');
    expect(org.url).toBe('https://x.test');
  });

  it('logo は absolute URL に解決される', () => {
    const org = buildOrganization({
      name: 'X',
      url: 'https://x.test',
      logoPath: '/img/logo.png',
    });
    expect(org.logo).toBe('https://x.test/img/logo.png');
  });

  it('url 末尾スラッシュと logoPath 先頭スラッシュが重複しない', () => {
    const a = buildOrganization({
      name: 'X',
      url: 'https://x.test/',
      logoPath: '/logo.png',
    });
    const b = buildOrganization({
      name: 'X',
      url: 'https://x.test',
      logoPath: 'logo.png',
    });
    expect(a.logo).toBe('https://x.test/logo.png');
    expect(b.logo).toBe('https://x.test/logo.png');
  });
});

describe('buildWebSite', () => {
  it('schema.org WebSite 型のオブジェクトを返す', () => {
    const site = buildWebSite({
      name: 'X',
      url: 'https://x.test',
      description: 'desc',
    });
    expect(site['@type']).toBe('WebSite');
    expect(site.name).toBe('X');
    expect(site.url).toBe('https://x.test');
    expect(site.description).toBe('desc');
  });

  it('既定の inLanguage は ja-JP', () => {
    const site = buildWebSite({
      name: 'X',
      url: 'https://x.test',
      description: 'desc',
    });
    expect(site.inLanguage).toBe('ja-JP');
  });

  it('language で上書き可能', () => {
    const site = buildWebSite({
      name: 'X',
      url: 'https://x.test',
      description: 'desc',
      language: 'en-US',
    });
    expect(site.inLanguage).toBe('en-US');
  });
});

describe('serializeJsonLd', () => {
  it('オブジェクトを JSON 化する', () => {
    expect(serializeJsonLd({ a: 1 })).toBe('{"a":1}');
  });

  it('"<" を Unicode エスケープして </script> 攻撃を防ぐ', () => {
    // 値に </script> が混入してもタグを閉じない（XSS 対策）。
    const xss = serializeJsonLd({ name: 'pwn</script><script>alert(1)</script>' });
    expect(xss).not.toContain('</script>');
    expect(xss).toContain('\\u003c/script');
  });

  it('複数の "<" もすべてエスケープする', () => {
    const out = serializeJsonLd({ a: '<<<' });
    expect(out).toBe('{"a":"\\u003c\\u003c\\u003c"}');
  });
});
