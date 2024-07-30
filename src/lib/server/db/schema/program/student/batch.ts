import { integer, text } from 'drizzle-orm/sqlite-core';
import { createdAt, id, table } from '../../../helpers';
import { relations } from 'drizzle-orm';
import { programTable, specializationTable } from '..';

import { studentTable } from '.';

// B.tech B.sc
export const batchTable = table('batch', {
	id,
	section: text('section'),
	year: integer('year', { mode: 'number' }).notNull(),
	programId: text('program_id').references(() => programTable.id),
	specializationId: text('specialization_id').references(() => specializationTable.id),
	createdAt
});

export const batchSectionTable = table('batch_section', {
	id,
	name: text('name').notNull(), // A, B
	batchId: text('batch_id').references(() => batchTable.id)
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
