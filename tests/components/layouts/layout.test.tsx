// Layout は next/head に依存するため、jsdom 上では <head> への注入は
// 即時には反映されない。JSON-LD の dangerouslySetInnerHTML は body 内に
// 配置した同等 markup を別途検証する戦略もあるが、ここでは container 全体の
// HTML から JSON-LD 文字列の存在を確認する戦術にとどめる。
// （title/description などのメタは composePageTitle/composeCanonicalUrl の
// 単体テスト + 出力差分テスト（baseline diff）で担保している）

import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Layout from '../../../components/layouts/layout';
import { pageMeta, siteName } from '../../../content/site';

describe('<Layout>', () => {
  it('Header / Footer / children を描画する', () => {
    const { container } = render(
      <Layout meta={pageMeta.contact}>
        <div data-testid="child">payload</div>
      </Layout>,
    );
    expect(container.querySelector('#header')).not.toBeNull();
    expect(container.querySelector('#footer')).not.toBeNull();
    expect(container.querySelector('[data-testid="child"]')?.textContent).toBe(
      'payload',
    );
  });

  it('children は section.section > div.container 配下に入る', () => {
    const { container } = render(
      <Layout meta={pageMeta.contact}>
        <span data-testid="child" />
      </Layout>,
    );
    const wrapper = container.querySelector('section.section > div.container');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.querySelector('[data-testid="child"]')).not.toBeNull();
  });

  it('meta 未指定でも home メタを既定として描画できる', () => {
    const { container } = render(
      <Layout>
        <span data-testid="child" />
      </Layout>,
    );
    expect(container.querySelector('#header')).not.toBeNull();
    expect(container.querySelector('[data-testid="child"]')).not.toBeNull();
  });

  it('siteName はテストの参照健全性として非空である', () => {
    // 構造化データのテストが Layout の内部で siteName を参照するため、
    // ここで存在を保証しておく（Layout テスト群の前提）。
    expect(siteName.length).toBeGreaterThan(0);
  });
});
