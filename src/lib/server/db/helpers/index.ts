import { sql } from 'drizzle-orm';
import { int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core';

export const table = sqliteTableCreator((name) => name);

export const id = text('id')
	.primaryKey()
	.$defaultFn(() => crypto.randomUUID());
export const json = (name: string, defaultValue: string = '{}') =>
	text(name, { mode: 'json' }).default(defaultValue);
export const string = (name: string) => text(name, { mode: 'text' });
export const boolean = (name: string) => int(name, { mode: 'boolean' });
export const integer = (name: string) => int(name, { mode: 'number' });

// 2024-04-11 15:40:43
export const createdAt = text('created_at').default(sql`(current_timestamp)`);
