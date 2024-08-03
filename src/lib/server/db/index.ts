import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/node';
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from '$env/static/private';
import * as schema from './schema';
import { remember } from '@epic-web/remember';

export const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });

export const db = remember('db', () => drizzle(client, { schema }));