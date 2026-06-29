import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import RichText from '../../../components/ui/RichText';
import type { RichNode } from '../../../content/home';

describe('<RichText>', () => {
  it('文字列ノードはそのまま描画される', () => {
    const { container } = render(<RichText nodes={['hello']} />);
    expect(container.textContent).toBe('hello');
  });

  it('{ strong } は <strong> 要素として描画される（class は付与しない）', () => {
    const nodes: RichNode[] = [{ strong: 'bold' }];
    const { container } = render(<RichText nodes={nodes} />);
    const strong = container.querySelector('strong');
    expect(strong).not.toBeNull();
    expect(strong?.textContent).toBe('bold');
    expect(strong?.className).toBe('');
  });

  it('{ br: true } は <br/> 要素として描画される', () => {
    const nodes: RichNode[] = [{ br: true }];
    const { container } = render(<RichText nodes={nodes} />);
    expect(container.querySelector('br')).not.toBeNull();
  });

  it('テキスト+strong+br 混在で要素順を保持する', () => {
    const nodes: RichNode[] = [
      'before ',
      { strong: 'mid' },
      { br: true },
      'after',
    ];
    const { container } = render(<RichText nodes={nodes} />);
    // 期待 HTML: "before <strong>mid</strong><br/>after"
    expect(container.innerHTML).toBe('before <strong>mid</strong><br>after');
  });

  it('空配列なら何も描画しない', () => {
    const { container } = render(<RichText nodes={[]} />);
    expect(container.innerHTML).toBe('');
  });
});
