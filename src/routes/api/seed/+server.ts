import { json } from '@sveltejs/kit';
import { dbPromise } from '$lib/server/db';
import { tickets } from '$lib/server/db/schema';

const seedTickets = [
  {
    title: 'Fix Navigation Bug',
    content: 'The back button is not working correctly on mobile devices',
    status: 'DONE' as const
  },
  {
    title: 'Add Dark Mode Support',
    content: 'Implement system-wide dark mode toggle with proper color schemes',
    status: 'IN_PROGRESS' as const
  },
  {
    title: 'Improve Form Validation',
    content: 'Add better error messages and real-time validation for all forms',
    status: 'OPEN' as const
  },
  {
    title: 'Optimize Database Queries',
    content:
      'Some API endpoints are experiencing slow response times due to unoptimized SQL queries',
    status: 'OPEN' as const
  },
  {
    title: 'Implement User Authentication',
    content: 'Add OAuth2 authentication flow with Google and GitHub providers',
    status: 'IN_PROGRESS' as const
  },
  {
    title: 'Mobile Responsive Layout Fixes',
    content: 'Several components break on mobile viewports below 320px width',
    status: 'OPEN' as const
  },
  {
    title: 'Email Notification System',
    content: 'Create system for sending transactional emails for ticket updates',
    status: 'OPEN' as const
  }
];

export async function POST() {
  try {
    console.log('Starting database seed...');

    // Get database instance
    const { db } = await dbPromise;

    // Delete all existing tickets
    console.log('Clearing existing tickets...');
    await db.delete(tickets);
    console.log('Existing tickets cleared');

    // Insert new tickets
    console.log('Inserting seed tickets...');
    const result = await db.insert(tickets).values(seedTickets).returning();

    console.log('Seed completed successfully');
    return json({
      message: 'Database seeded successfully',
      tickets: result
    });
  } catch (error) {
    console.error('Unexpected error during seed:', error);
    return new Response(
      JSON.stringify({
        error: 'Unexpected error while seeding database',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
