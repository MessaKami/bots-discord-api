import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*e2e.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    headless: true,
  },
  projects: [
    {
      name: 'api-testing',
      testMatch: /.*\.spec\.ts/,
      use: {
        headless: true,
      },
    },
  ],
}); 