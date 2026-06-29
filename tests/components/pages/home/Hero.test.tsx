import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Hero from '../../../../components/pages/home/Hero';
import { hero } from '../../../../content/home';

describe('<Hero>', () => {
  it('SP/PC 2 系統のヒーローコンテナを持つ', () => {
    const { container } = render(<Hero />);
    expect(container.querySelector('#sp_main_image')).not.toBeNull();
    expect(container.querySelector('#pc_main_image')).not.toBeNull();
  });

  it('PC タイトル <h1> 内の画像 alt はブランド名を含む', () => {
    const { container } = render(<Hero />);
    const h1Img = container.querySelector('#pc_main_image h1 img') as HTMLImageElement;
    expect(h1Img.getAttribute('alt')).toBe(hero.pc.titleId.alt);
    expect(h1Img.getAttribute('alt')).toContain("Creator's Guild");
  });

  it('SP の同じ pc_site_id 画像は alt 空（h1 ではないため）', () => {
    const { container } = render(<Hero />);
    const spTitleImg = container.querySelector('#sp_main_image p.title img') as HTMLImageElement;
    expect(spTitleImg.getAttribute('src')).toBe(hero.sp.titleId.src);
    expect(spTitleImg.getAttribute('alt')).toBe('');
  });

  it('PC コピーは 2 行が <br/> で繋がれる', () => {
    const { container } = render(<Hero />);
    const p = container.querySelector('#pc_main_image .main_copy p');
    expect(p?.innerHTML).toBe(
      `${hero.pc.copyLines[0]}<br>${hero.pc.copyLines[1]}`,
    );
  });

  it('SP コピーは単一文字列で <br/> を含まない', () => {
    const { container } = render(<Hero />);
    const dd = container.querySelector('#sp_main_image dl.top_copy dd');
    expect(dd?.textContent).toBe(hero.sp.copy);
    expect(dd?.querySelector('br')).toBeNull();
  });

  it('SP/PC の背景イラストは共通の src/alt を持つ', () => {
    const { container } = render(<Hero />);
    const spIllust = container.querySelector('#sp_main_image .back_image img') as HTMLImageElement;
    const pcIllust = container.querySelector('#pc_main_image .back_image .illust img') as HTMLImageElement;
    expect(spIllust.getAttribute('src')).toBe(hero.backIllust.src);
    expect(pcIllust.getAttribute('src')).toBe(hero.backIllust.src);
  });

  it('SP ヒーローには ContactButton（contact_btn）が含まれる', () => {
    const { container } = render(<Hero />);
    const btn = container.querySelector('#sp_main_image .contact_btn a') as HTMLAnchorElement;
    expect(btn.getAttribute('href')).toBe(hero.contactHref);
  });
});
