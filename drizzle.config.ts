import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config();

if (!process.env.DIRECT_URL) {
  throw new Error('DIRECT_URL is not set');
}

export default {
  schema: './src/lib/server/db/schema.ts',
  dbCredentials: {
    url: process.env.DIRECT_URL
  },
  verbose: true,
  strict: true,
  dialect: 'postgresql'
} satisfies Config;
