import { describe, expect, it } from 'vitest';
import {
  contactCopy,
  contactEndpoint,
  contactFields,
  honeypotField,
  recaptchaAction,
} from '../../content/contact';

describe('content/contact', () => {
  it('contactEndpoint は同一オリジン配下の PHP（/api/contact.php）', () => {
    expect(contactEndpoint).toBe('/api/contact.php');
  });

  it('honeypot フィールド名は PHP 側と一致する規約（website）', () => {
    // 変更時は public/api/contact.php 側の検証も同時に更新が必要。
    expect(honeypotField).toBe('website');
  });

  it('reCAPTCHA action はサーバ側 score 評価で参照される', () => {
    expect(recaptchaAction).toBe('contact');
  });

  it('contactFields は name/email/message の 3 つを必須で持つ', () => {
    expect(contactFields.map((f) => f.name)).toEqual([
      'name',
      'email',
      'message',
    ]);
    for (const f of contactFields) {
      expect(f.required).toBe(true);
      expect(f.label).toMatch(/必須/);
    }
  });

  it('email フィールドは type=email & autoComplete=email', () => {
    const email = contactFields.find((f) => f.name === 'email');
    expect(email?.type).toBe('email');
    expect(email?.autoComplete).toBe('email');
  });

  it('message フィールドは textarea で rows を持つ', () => {
    const message = contactFields.find((f) => f.name === 'message');
    expect(message?.type).toBe('textarea');
    expect(message?.rows).toBeGreaterThan(0);
  });

  it('contactCopy は送信時・成功時・失敗時のラベル/メッセージを揃えている', () => {
    expect(contactCopy.submitLabel.length).toBeGreaterThan(0);
    expect(contactCopy.sendingLabel.length).toBeGreaterThan(0);
    expect(contactCopy.success.length).toBeGreaterThan(0);
    expect(contactCopy.errorGeneric.length).toBeGreaterThan(0);
    expect(contactCopy.errorNetwork.length).toBeGreaterThan(0);
  });
});
