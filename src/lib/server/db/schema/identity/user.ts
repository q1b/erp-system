import { integer, text } from 'drizzle-orm/sqlite-core';
import { createdAt, id, table } from '../../helpers';
import { relations } from 'drizzle-orm';
import { accountTable } from './account';
import { roleTable } from './role';
import { professorTable } from '../program/professor';
import { studentTable } from '../program/student';

// When a user is deleted all the corresponding accounts are deleted as well
// When a user is deleted the corresponding row from student table is deleted
// When a user is deleted the corresponding row from professor table is deleted
export const userTable = table('user', {
	id,
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image'),
	role: text('role')
		.references(() => roleTable.id, { onDelete: 'set default', onUpdate: 'cascade' })
		.default('user'),
	createdAt
});

export const userRelations = relations(userTable, ({ one, many }) => ({
	role: one(roleTable, {
		fields: [userTable.role],
		references: [roleTable.id]
	}),
	accounts: many(accountTable),
	student: one(studentTable),
	professor: one(professorTable)
}));
