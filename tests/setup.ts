import { test as base } from '@playwright/test';

// Extend the base test with MSW setup
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(async () => {
      const { worker } = await import('../src/mocks/browser');
      await worker.start({
        onUnhandledRequest(req, print) {
          if (
            req.url.includes('svelte') ||
            req.url.includes('node_modules') ||
            !req.url.includes('api')
          ) {
            return;
          }
          print.warning();
        }
      });
    });

    await use(page);
  }
});

export { expect } from '@playwright/test';
