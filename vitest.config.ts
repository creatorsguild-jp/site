import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Vitest 設定。
// - jsdom 環境で React コンポーネントもテスト可能（happy-dom より互換性が高い）
// - tests/setup.ts で testing-library の matcher を有効化
// - 静的サイト本体（out/, .next/, node_modules/）と PHPMailer の vendor は除外
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'out', '.next', 'public/api/vendor'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['content/**/*.ts', 'lib/**/*.ts', 'components/**/*.tsx'],
      exclude: ['**/*.d.ts'],
    },
  },
});
