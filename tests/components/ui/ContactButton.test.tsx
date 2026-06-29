import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import ContactButton from '../../../components/ui/ContactButton';

describe('<ContactButton>', () => {
  it('渡された href の anchor を描画する', () => {
    const { container } = render(<ContactButton href="/contact/" />);
    const a = container.querySelector('a');
    expect(a).not.toBeNull();
    expect(a?.getAttribute('href')).toBe('/contact/');
  });

  it('既存マークアップの contact_btn / mail_pict クラスを保持する', () => {
    const { container } = render(<ContactButton href="/contact/" />);
    expect(container.querySelector('.contact_btn')).not.toBeNull();
    expect(container.querySelector('.mail_pict')).not.toBeNull();
  });

  it('「メンバー随時募集中」ラベルを含む', () => {
    const { getByText } = render(<ContactButton href="/contact/" />);
    expect(getByText('メンバー随時募集中')).not.toBeNull();
  });

  it('mail_pict 画像は src=img/pict_mail@2x.png を持つ', () => {
    const { container } = render(<ContactButton href="/contact/" />);
    const img = container.querySelector('img.mail_pict') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('img/pict_mail@2x.png');
  });
});
