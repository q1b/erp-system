import { relations } from 'drizzle-orm';
import { id, table } from '../../helpers';
import { lectureTable } from './lecture';
import { userTable } from '../identity/user';
import { text } from 'drizzle-orm/sqlite-core';

export const professorTable = table('professor', {
	id,
	userId: text('user_id').references(() => userTable.id, { onDelete: 'cascade', onUpdate: 'no action' }),
});

export const professorRelation = relations(professorTable, ({ one,many }) => ({
	// don't delete the professor lecture if the user is deleted
	lectures: many(lectureTable),
	// don't delete the user if the professor is deleted
	user: one(userTable, {
		fields: [professorTable.userId],
		references: [userTable.id]
	}),
}));
