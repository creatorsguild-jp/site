import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildContactPayload,
  getRecaptchaToken,
  parseContactResponse,
  type ContactResponse,
  type Grecaptcha,
} from '../../lib/contact-form';
import { honeypotField } from '../../content/contact';

// 最小 FormData ヘルパー（テスト用）。
function fd(entries: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.append(k, v);
  return f;
}

// fetch Response のモック。
function jsonResponse(body: ContactResponse | null, ok = true, status = 200): Response {
  return {
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response;
}

describe('buildContactPayload', () => {
  it('FormData から name/email/message と honeypot を取り出し、token を載せる', () => {
    const f = fd({
      name: 'taro',
      email: 't@example.test',
      message: 'hello',
      [honeypotField]: '',
    });
    const payload = buildContactPayload(f, 'TOKEN');
    expect(payload).toEqual({
      name: 'taro',
      email: 't@example.test',
      message: 'hello',
      [honeypotField]: '',
      recaptcha_token: 'TOKEN',
    });
  });

  it('欠落フィールドは空文字で埋める', () => {
    const f = fd({ name: 'only-name' });
    const payload = buildContactPayload(f, '');
    expect(payload.email).toBe('');
    expect(payload.message).toBe('');
    expect((payload as Record<string, string>)[honeypotField]).toBe('');
    expect(payload.recaptcha_token).toBe('');
  });
});

describe('parseContactResponse', () => {
  it('200 OK + body.ok=true → success', async () => {
    const r = await parseContactResponse(
      jsonResponse({ ok: true }),
      'fallback',
    );
    expect(r.kind).toBe('success');
  });

  it('200 OK でも body.ok=false なら error（fallback と空 fieldErrors）', async () => {
    const r = await parseContactResponse(
      jsonResponse({ ok: false }),
      'fallback',
    );
    expect(r).toEqual({
      kind: 'error',
      message: 'fallback',
      fieldErrors: {},
    });
  });

  it('400 系で error/errors が来たら採用する', async () => {
    const body: ContactResponse = {
      ok: false,
      error: '入力に誤りがあります',
      errors: { email: 'メール形式が不正' },
    };
    const r = await parseContactResponse(
      jsonResponse(body, false, 422),
      'fallback',
    );
    expect(r).toEqual({
      kind: 'error',
      message: '入力に誤りがあります',
      fieldErrors: { email: 'メール形式が不正' },
    });
  });

  it('JSON パース失敗時も crash せず error 扱いになる', async () => {
    const bad = {
      ok: false,
      status: 500,
      json: () => Promise.reject(new Error('not json')),
    } as unknown as Response;
    const r = await parseContactResponse(bad, 'fallback');
    expect(r).toEqual({
      kind: 'error',
      message: 'fallback',
      fieldErrors: {},
    });
  });
});

describe('getRecaptchaToken', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('siteKey が空なら即座に空文字を返す（=検証スキップ運用）', async () => {
    const token = await getRecaptchaToken('', 'contact', window);
    expect(token).toBe('');
  });

  it('window.grecaptcha 未注入なら空文字を返す', async () => {
    const w = { ...window, grecaptcha: undefined } as unknown as Window;
    const token = await getRecaptchaToken('key', 'contact', w);
    expect(token).toBe('');
  });

  it('grecaptcha.execute が成功したらトークンをそのまま返す', async () => {
    const execute = vi.fn().mockResolvedValue('TOKEN');
    const grecaptcha: Grecaptcha = {
      ready: (cb) => cb(),
      execute,
    };
    const w = { grecaptcha } as unknown as Window;
    const token = await getRecaptchaToken('SITE', 'contact', w);
    expect(token).toBe('TOKEN');
    expect(execute).toHaveBeenCalledWith('SITE', { action: 'contact' });
  });

  it('grecaptcha.execute が reject しても crash せず空文字を返す', async () => {
    const grecaptcha: Grecaptcha = {
      ready: (cb) => cb(),
      execute: () => Promise.reject(new Error('boom')),
    };
    const w = { grecaptcha } as unknown as Window;
    const token = await getRecaptchaToken('SITE', 'contact', w);
    expect(token).toBe('');
  });
});
