import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Load environment variables from .env file when not in SvelteKit context
if (!import.meta.env?.VITE) {
  config();
}

// Get database URLs based on context
const getDatabaseUrl = async () => {
  if (process.env.DATABASE_URL && process.env.DIRECT_URL) {
    return {
      DATABASE_URL: process.env.DATABASE_URL,
      DIRECT_URL: process.env.DIRECT_URL
    };
  }

  // Only try to import from $env if we're in a SvelteKit context
  if (import.meta.env?.VITE) {
    return import('$env/static/private').then((env) => ({
      DATABASE_URL: env.DATABASE_URL,
      DIRECT_URL: env.DIRECT_URL
    }));
  }

  throw new Error('Database URLs not found in environment variables');
};

// Initialize database connections
export const initDb = async () => {
  const { DATABASE_URL, DIRECT_URL } = await getDatabaseUrl();

  if (!DATABASE_URL || !DIRECT_URL) {
    throw new Error('Database URLs not found in environment variables');
  }

  // Connection for migrations
  const migrationClient = postgres(DIRECT_URL, { max: 1 });

  // Connection for queries (uses connection pooling)
  const queryClient = postgres(DATABASE_URL);
  const db = drizzle(queryClient);

  return { db, migrationClient };
};

// Export a promise that resolves to the database instance
export const dbPromise = initDb();
