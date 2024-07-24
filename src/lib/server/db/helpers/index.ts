import { sql } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const table = sqliteTableCreator((name) => name)

export const id = text("id").primaryKey().$defaultFn(() => crypto.randomUUID())
export const json = (name:string, defaultValue: string = '{}') => text(name, {mode: 'json'}).default(defaultValue)
export const string = (name: string, defaultValue: string = '') => text(name, { mode: 'text' }).default(defaultValue)
export const boolean = (name: string, defaultValue: boolean = true) => int(name, { mode: 'boolean' }).default(defaultValue)
export const integer = (name: string, defaultValue: number = 0) => int(name, { mode: 'number' }).default(defaultValue)

// 2024-04-11 15:40:43
export const createdAt = text("created_at").default(sql`(current_timestamp)`);