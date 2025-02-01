import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tickets = pgTable('tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  status: text('status', { enum: ['OPEN', 'IN_PROGRESS', 'DONE'] }).notNull(),
  userId: uuid('user_id')
});
