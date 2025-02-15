import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/{promotions,channels}/**/*.spec.ts'],
    exclude: ['node_modules', 'dist'],
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/{promotions,channels}/**/*.ts'],
      exclude: ['**/*.spec.ts', '**/index.ts'],
    },
  },
});