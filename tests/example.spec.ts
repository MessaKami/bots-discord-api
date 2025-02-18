import { test, expect } from '@playwright/test';

test('basic test', async ({ playwright }) => {
  const request = await playwright.request.newContext();
  expect(request).toBeTruthy();
  await request.dispose();
});
 