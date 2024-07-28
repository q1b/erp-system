import { integer, text } from "drizzle-orm/sqlite-core";
import { id, table } from "../../../helpers";
import { relations } from "drizzle-orm";
import { timetableTable } from ".";
import { lectureTable } from "../lecture";

// B.tech B.sc
export const periodTable = table('period', {
    id,
    day: text('day', { enum: ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'] }).notNull(),
    startAt: text("start_at"),
    duration: integer("duration"),
    timetableId: text('timetable_id').references(() => timetableTable.id, {onDelete: 'cascade', onUpdate: 'cascade'}),
    lectureId: text('lecture_id').references(() => lectureTable.id, {onDelete: 'cascade', onUpdate: 'cascade'})
})

export const periodRelation = relations(periodTable, ({ one }) => ({
    timetable: one(timetableTable, {
        fields: [periodTable.timetableId],
        references: [timetableTable.id]
    }),
    lecture: one(lectureTable, {
        fields: [periodTable.lectureId],
        references: [lectureTable.id]
    })
}))