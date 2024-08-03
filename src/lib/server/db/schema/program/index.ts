import { text } from 'drizzle-orm/sqlite-core';
import { id, table } from '../../helpers';
import { relations } from 'drizzle-orm';
import { batchTable } from './student/batch';
import { professorTable } from './professor';
import { semesterTable } from './semester';

export const programTable = table('program', {
	id,
	name: text('name').notNull(),
	description: text('description'),
	coordinatorId: text('coordinator_id').references(() => professorTable.id, { onDelete: 'set null' }),
});

export const programRelation = relations(programTable, ({ many, one }) => ({
	batches: many(batchTable),
	coordinator: one(professorTable, {
		fields: [programTable.coordinatorId],
		references: [professorTable.id]
	}),
	semesters: many(semesterTable)
}));