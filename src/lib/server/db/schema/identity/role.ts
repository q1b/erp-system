import { text } from "drizzle-orm/sqlite-core";
import { id, table } from "../../helpers";
import { relations } from "drizzle-orm";
import { userTable } from "./user";

export const roleTable = table('role', {
	id,
	label: text('label').notNull(),
	description: text('description')
});

export const roleRelations = relations(roleTable, ({ many }) => ({
	users: many(userTable)
}));
