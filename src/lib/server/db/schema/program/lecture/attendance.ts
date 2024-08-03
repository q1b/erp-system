import { integer, text } from 'drizzle-orm/sqlite-core';
import { id, table } from '../../../helpers';
import { periodTable } from './period';
import { studentTable } from '../student';
import { relations } from 'drizzle-orm';

export const attendanceTable = table('attendance', {
	id,
	date: text('date').notNull(),
	periodId: text('period_id').references(() => periodTable.id, { onDelete: 'cascade' }),
	studentId: text('student_id').references(() => studentTable.id, { onDelete: 'cascade' }),
	isPresent: integer('is_present', { mode: 'boolean' }).default(false)
});

export const attendanceRelation = relations(attendanceTable, ({ one }) => ({
	period: one(periodTable, {
		fields: [attendanceTable.periodId],
		references: [periodTable.id]
	}),
	student: one(studentTable, {
		fields: [attendanceTable.studentId],
		references: [studentTable.id]
	})
}))