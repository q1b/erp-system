import { text } from 'drizzle-orm/sqlite-core';
import { id, table } from '../../helpers';
import { relations } from 'drizzle-orm';
import { batchTable } from './student/batch';

// When a program is deleted all the corresponding specializations are deleted as well
// When a program is deleted all the corresponding batches are not deleted yet, set to null
export const programTable = table('program', {
	id,
	name: text('name').notNull(),
	description: text('description')
});

export const programRelation = relations(programTable, ({ many }) => ({
	specializations: many(specializationTable),
	batches: many(batchTable)
}));

// ai - artificial intelligence, ds - data-science, cs - cyber-security
export const specializationTable = table('specialization', {
	id,
	name: text('name').notNull(),
	shortName: text('short_name').notNull(),
	programId: text('program_id').references(() => programTable.id, {
		onDelete: 'cascade',
		onUpdate: 'no action'
	})
});

export const specializationRelation = relations(specializationTable, ({ one, many }) => ({
	program: one(programTable, {
		fields: [specializationTable.programId],
		references: [programTable.id]
	}),
	batches: many(batchTable)
}));
