import { integer, text } from 'drizzle-orm/sqlite-core';
import { id, table } from '../../../helpers';
import { relations } from 'drizzle-orm';
import { timetableTable } from './timetable';
import { attendanceTable } from './attendance';
import { semesterLecturePeriodTable } from '../semester-lecture';

export const periodTable = table('period', {
	id,
	day: text('day', {
		enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
	}).notNull(),
	startAt: text('start_at'),
	duration: integer('duration'),
	timetableId: text('timetable_id').references(() => timetableTable.id, { onDelete: 'cascade' })
});

export const periodRelation = relations(periodTable, ({ one,many }) => ({
	timetable: one(timetableTable, {
		fields: [periodTable.timetableId],
		references: [timetableTable.id]
	}),
	semesterLecture: many(semesterLecturePeriodTable),
	attendance: many(attendanceTable)
}));
