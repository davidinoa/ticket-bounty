import { dev } from '$app/environment';

if (dev) {
  const { worker } = await import('./mocks/browser');

  await worker.start({
    onUnhandledRequest(request, print) {
      // Do not warn on unhandled internal Svelte requests.
      // Those are not meant to be mocked.
      if (request.url.includes('svelte')) {
        return;
      }

      // Do not warn on unhandled internal node_modules requests.
      if (request.url.includes('node_modules')) {
        return;
      }

      if (!request.url.includes('api')) {
        return;
      }

      print.warning();
    }
  });
}
