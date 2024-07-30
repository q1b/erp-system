import { integer, text } from 'drizzle-orm/sqlite-core';
import { createdAt, id, table } from '../../helpers';
import { relations } from 'drizzle-orm';
import { accountTable } from './account';
import { studentTable } from '../program/student';

export const userTable = table('user', {
	id,
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image'),
	role: text('role')
		.references(() => roleTable.id, { onDelete: 'set default', onUpdate: 'cascade' })
		.default('user'),
	studentId: text('student_id').references(() => studentTable.id),
	createdAt
});

export const userRelations = relations(userTable, ({ one, many }) => ({
	role: one(roleTable, {
		fields: [userTable.role],
		references: [roleTable.id]
	}),
	accounts: many(accountTable),
	student: one(studentTable, {
		fields: [userTable.studentId],
		references: [studentTable.id]
	})
}));

export const roleTable = table('role', {
	id: text('id').primaryKey(),
	label: text('label').notNull(),
	description: text('description')
});

export const roleRelations = relations(roleTable, ({ many }) => ({
	users: many(userTable)
}));
