// Vitest セットアップ。
// - @testing-library/jest-dom の matcher を Vitest の expect に拡張
// - 各テスト後に DOM をクリーンアップ
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
