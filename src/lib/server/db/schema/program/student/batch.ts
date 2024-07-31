import { integer, text } from 'drizzle-orm/sqlite-core';
import { createdAt, id, table } from '../../../helpers';
import { relations } from 'drizzle-orm';
import { programTable, specializationTable } from '..';

import { studentTable } from '.';

// When a batch is deleted all the corresponding sections are deleted as well
// When a batch is deleted all the corresponding students are deleted as well
// when a batch is deleted all the corresponding relation to lectures are deleted as well
export const batchTable = table('batch', {
	id,
	year: integer('year', { mode: 'number' }).notNull(),
	programId: text('program_id').references(() => programTable.id, { onDelete: 'set null', onUpdate: 'no action' }),
	specializationId: text('specialization_id').references(() => specializationTable.id, { onDelete: 'set null', onUpdate: 'no action' }),
	createdAt
});

export const batchSectionTable = table('batch_section', {
	id,
	name: text('name').notNull(), // A, B
	batchId: text('batch_id').references(() => batchTable.id, { onDelete: 'cascade', onUpdate: 'no action' })
});

export const batchSectionRelation = relations(batchSectionTable, ({ one, many }) => ({
	batch: one(batchTable, {
		fields: [batchSectionTable.batchId],
		references: [batchTable.id]
	}),
	students: many(studentTable)
}));

export const batchRelation = relations(batchTable, ({ one, many }) => ({
	program: one(programTable, {
		fields: [batchTable.programId],
		references: [programTable.id]
	}),
	specialization: one(specializationTable, {
		fields: [batchTable.specializationId],
		references: [specializationTable.id]
	}),
	students: many(studentTable),
	sections: many(batchSectionTable)
}));
