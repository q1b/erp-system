import { relations } from "drizzle-orm";
import { id, table } from "../../helpers";
import { professorTable } from "./professor";
import { text } from "drizzle-orm/sqlite-core";
import { batchTable } from "./student/batch";
import { courseTable } from "./course";
import { periodTable } from "./time-table/period";

export const lectureTable = table('lecture', {
    id,
    professorId: text('professor_id').references(() => professorTable.id),
    batchId: text('batch_id').references(() => batchTable.id),
    courseId: text('course_id').references(() => courseTable.id),
})

export const lectureRelation = relations(lectureTable, ({ one, many }) => ({
    professor: one(professorTable, {
        fields: [lectureTable.professorId],
        references: [professorTable.id]
    }),
    batch: one(batchTable, {
        fields: [lectureTable.batchId],
        references: [batchTable.id]
    }),
    course: one(courseTable, {
        fields: [lectureTable.courseId],
        references: [courseTable.id]
    }),
    periods: many(periodTable)
}))