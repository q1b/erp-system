import { integer, text } from 'drizzle-orm/sqlite-core';
import { id, table } from '../../../helpers';
import { relations } from 'drizzle-orm';
import { timetableTable } from '.';
import { lectureToBatchTabel } from '../lecture';

export const periodTable = table('period', {
	id,
	day: text('day', {
		enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
	}).notNull(),
	startAt: text('start_at'),
	duration: integer('duration'),
	timetableId: text('timetable_id').references(() => timetableTable.id, {
		onDelete: 'cascade',
		onUpdate: 'no action'
	}),
	lectureToBatchTabel: text('lecture_to_batch_id').references(() => lectureToBatchTabel.id, {
		onDelete: 'cascade',
		onUpdate: 'no action'
	})
});

export const periodRelation = relations(periodTable, ({ one }) => ({
	timetable: one(timetableTable, {
		fields: [periodTable.timetableId],
		references: [timetableTable.id]
	}),
	lecture: one(lectureToBatchTabel, {
		fields: [periodTable.lectureToBatchTabel],
		references: [lectureToBatchTabel.id]
	})
}));
