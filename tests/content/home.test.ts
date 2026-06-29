import { describe, expect, it } from 'vitest';
import { hero, introSections } from '../../content/home';
import { contactHref } from '../../content/site';

describe('content/home', () => {
  describe('introSections', () => {
    it('既存マークアップに対応する 3 セクション(first/second/forth)を保持', () => {
      const ids = introSections.map((s) => s.id);
      expect(ids).toEqual(['first_view', 'second_view', 'forth_view']);
    });

    it('odd/even の交互クラスが維持されている', () => {
      const classes = introSections.map((s) => s.sectionClass);
      expect(classes[0]).toContain('odd');
      expect(classes[1]).toContain('even');
      expect(classes[2]).toContain('odd');
      for (const c of classes) {
        expect(c).toMatch(/\bclfx\b/);
      }
    });

    it('forth_view のみ ContactButton を持つ（contactHref と一致）', () => {
      const withContact = introSections.filter((s) => s.contactHref);
      expect(withContact).toHaveLength(1);
      expect(withContact[0].id).toBe('forth_view');
      expect(withContact[0].contactHref).toBe(contactHref);
    });

    it('各段落は空配列ではない（描画されないリッチテキストは無い）', () => {
      for (const s of introSections) {
        expect(s.paragraphs.length).toBeGreaterThan(0);
        for (const p of s.paragraphs) {
          expect(p.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('hero', () => {
    it('SP/PC で同じ pc_site_id 画像を参照する（src 共通・alt は SP/PC で異なる）', () => {
      expect(hero.sp.titleId.src).toBe(hero.pc.titleId.src);
      expect(hero.sp.titleId.alt).toBe('');
      expect(hero.pc.titleId.alt).toContain("Creator's Guild");
    });

    it('PC コピーは 2 行に分かれている（既存の <br/> 配置を維持）', () => {
      expect(hero.pc.copyLines).toHaveLength(2);
      expect(hero.pc.copyLines[0]).toContain('助け合える');
      expect(hero.pc.copyLines[1]).toContain('リモート参加OK');
    });

    it('SP コピーは PC の 2 行を句点で連結した内容に一致する', () => {
      // SP は単一文字列、PC は <br/> で分割。テキスト本体は同じであるべき。
      expect(hero.sp.copy).toBe(hero.pc.copyLines.join('。'));
    });

    it('contactHref は site の contactHref と一致する', () => {
      expect(hero.contactHref).toBe(contactHref);
    });

    it('既存の img パスを保持する', () => {
      expect(hero.backIllust.src).toBe('img/1stview_illust@2x.png');
      expect(hero.sp.titleTop.src).toBe('img/sp_title_top_image@2x.png');
      expect(hero.pc.titleTop.src).toBe('img/pc_title_top_image@2x.png');
    });
  });
});
