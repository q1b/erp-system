import { integer, text } from "drizzle-orm/sqlite-core";
import { id, table } from "../../../helpers";
import { periodTable } from "./period";
import { studentTable } from "../student";

export const studentAttendanceTable = table('student_attendance', {
    id,
    date: text('date').notNull(),
    periodId: text('period_id').references(() => periodTable.id),
    studentId: text('student_id').references(() => studentTable.id),
    isPresent: integer('is_present', { mode: 'boolean' }).default(false)
})