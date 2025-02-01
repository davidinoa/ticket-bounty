import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DATABASE_URL, DIRECT_URL } from '$env/static/private';

// Connection for migrations
export const migrationClient = postgres(DIRECT_URL, { max: 1 });

// Connection for queries (uses connection pooling)
const queryClient = postgres(DATABASE_URL);
export const db = drizzle(queryClient);
