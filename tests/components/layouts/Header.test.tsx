import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Header from '../../../components/layouts/Header';
import { contactHref, nav } from '../../../content/site';

describe('<Header>', () => {
  it('PC メニューに content/site の nav 全件をリンクとして描画する', () => {
    const { container } = render(<Header />);
    const items = container.querySelectorAll('.pc_head_menu li a');
    expect(items.length).toBe(nav.length);
    nav.forEach((n, i) => {
      const a = items[i] as HTMLAnchorElement;
      expect(a.getAttribute('href')).toBe(n.href);
      expect(a.textContent).toBe(n.label);
    });
  });

  it('PC メールリンクは contactHref を指す', () => {
    const { container } = render(<Header />);
    const a = container.querySelector('.pc_mail a') as HTMLAnchorElement;
    expect(a.getAttribute('href')).toBe(contactHref);
  });

  it('SP ロゴ画像の alt にブランド名（Creator\'s Guild）が入る', () => {
    const { container } = render(<Header />);
    const img = container.querySelector('.sp_header img.logo') as HTMLImageElement;
    expect(img.getAttribute('alt')).toContain("Creator's Guild");
  });

  it('SP/PC 両方のヘッダーコンテナが存在する', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('.sp_header')).not.toBeNull();
    expect(container.querySelector('.pc_header')).not.toBeNull();
  });
});
