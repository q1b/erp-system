import { text } from 'drizzle-orm/sqlite-core';
import { id, table } from '../../../helpers';
import { batchSectionTable, batchTable } from './batch';
import { relations } from 'drizzle-orm';
import { userTable } from '../../identity/user';

export const studentTable = table('student', {
	id,
	userId: text('user_id').references(() => userTable.id, { onDelete: 'cascade', onUpdate: 'no action' }),
	batchId: text('batch_id').references(() => batchTable.id, {
		onUpdate: 'no action',
		onDelete: 'cascade'
	}),
	sectionId: text('section_id').references(() => batchSectionTable.id, {
		onUpdate: 'no action',
		onDelete: 'set null'
	})
})

export const studentRelation = relations(studentTable, ({ one }) => ({
	batch: one(batchTable, {
		fields: [studentTable.batchId],
		references: [batchTable.id]
	}),
	user: one(userTable, {
		fields: [studentTable.userId],
		references: [userTable.id]
	}),
	section: one(batchSectionTable, {
		fields: [studentTable.sectionId],
		references: [batchSectionTable.id]
	})
}));
