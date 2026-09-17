import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schemes/index';

export type Database = NodePgDatabase<typeof schema>;

export const db: Database = drizzle(
  new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  { schema },
);
