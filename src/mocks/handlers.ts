import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/tickets', ({ request }) => {
    const originUrl = new URL(request.referrer);
    const searchParams = new URLSearchParams(originUrl.search);
    const shouldError = searchParams.get('error') === 'true';

    if (shouldError) {
      return HttpResponse.json({ error: 'Failed to load tickets' }, { status: 500 });
    }
    return HttpResponse.json([
      {
        id: '5b2aafbf-3cce-48a3-9a56-8352575ee971',
        createdAt: '2025-02-05T01:23:27.942Z',
        updatedAt: '2025-02-05T01:23:27.942Z',
        title: 'Fix Navigation Bug 🐛',
        content: 'The back button is not working correctly on mobile devices',
        status: 'DONE',
        userId: null
      },
      {
        id: '3ed938ad-9c5e-4ab3-b9bf-583f8c3509ec',
        createdAt: '2025-02-05T01:23:27.942Z',
        updatedAt: '2025-02-05T01:23:27.942Z',
        title: 'Add Dark Mode Support',
        content: 'Implement system-wide dark mode toggle with proper color schemes',
        status: 'IN_PROGRESS',
        userId: null
      },
      {
        id: 'a8d7f05a-08b3-4e11-9107-210ec0ffb638',
        createdAt: '2025-02-05T01:23:27.942Z',
        updatedAt: '2025-02-05T01:23:27.942Z',
        title: 'Improve Form Validation',
        content: 'Add better error messages and real-time validation for all forms',
        status: 'OPEN',
        userId: null
      },
      {
        id: 'cc041a94-9b86-4d0c-80f4-ecd081810504',
        createdAt: '2025-02-05T01:23:27.942Z',
        updatedAt: '2025-02-05T01:23:27.942Z',
        title: 'Optimize Database Queries',
        content:
          'Some API endpoints are experiencing slow response times due to unoptimized SQL queries',
        status: 'OPEN',
        userId: null
      },
      {
        id: '2b1c0bde-89be-429c-bbc3-baabc60bafc2',
        createdAt: '2025-02-05T01:23:27.942Z',
        updatedAt: '2025-02-05T01:23:27.942Z',
        title: 'Implement User Authentication',
        content: 'Add OAuth2 authentication flow with Google and GitHub providers',
        status: 'IN_PROGRESS',
        userId: null
      },
      {
        id: '8bc7f2c2-9d61-4afa-83f1-cd925e87b255',
        createdAt: '2025-02-05T01:23:27.942Z',
        updatedAt: '2025-02-05T01:23:27.942Z',
        title: 'Mobile Responsive Layout Fixes',
        content: 'Several components break on mobile viewports below 320px width',
        status: 'OPEN',
        userId: null
      },
      {
        id: '3dc1694a-3330-4560-9b38-1df8c8c911de',
        createdAt: '2025-02-05T01:23:27.942Z',
        updatedAt: '2025-02-05T01:23:27.942Z',
        title: 'Email Notification System',
        content: 'Create system for sending transactional emails for ticket updates',
        status: 'OPEN',
        userId: null
      }
    ]);
  })
];
