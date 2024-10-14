import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 90,
        lines: 90,
      },
      exclude: [
        'src/test/__mocks__/**',
        'eslint.config.js',
        'postcss.config.js',
        'tailwind.config.js',
        'vite.config.ts',
        'vitest.config.ts',
      ],
    },
  },
});
