import { dev } from '$app/environment';

if (dev) {
  const { worker } = await import('./mocks/browser');

  await worker.start({
    onUnhandledRequest(request, print) {
      const isInternalRequest =
        request.url.includes('svelte') || request.url.includes('node_modules');
      const isNotApiRequest = !request.url.includes('api');
      if (isInternalRequest || isNotApiRequest) return;
      print.warning();
    }
  });
}
