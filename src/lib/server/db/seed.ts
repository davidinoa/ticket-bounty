import { fileURLToPath } from 'node:url';
import { db } from '.';
import { tickets } from './schema';

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

async function seed() {
  try {
    console.log('Starting database seed...');

    // Delete all existing tickets
    console.log('Clearing existing tickets...');
    await db.delete(tickets);

    // Insert new tickets
    console.log('Inserting seed tickets...');
    const insertedTickets = await db.insert(tickets).values(seedTickets).returning();

    console.log('Seed completed successfully');
    console.log('Inserted tickets:', insertedTickets);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run the seed function if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}
