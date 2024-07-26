import { relations } from "drizzle-orm";
import { id, table } from "../../helpers";
import { professorTable } from "./professor";
import { integer, text } from "drizzle-orm/sqlite-core";
import { batchTable } from "./student/batch";
import { courseTable } from "./course";
import { periodTable } from "./time-table/period";
import { roomTable } from "../infrastructure";

export const lectureTable = table('lecture', {
    id,
    semester: integer('semester'),
    roomId: text('roomId').references(() => roomTable.id),
    professorId: text('professor_id').references(() => professorTable.id),
    batchId: text('batch_id').references(() => batchTable.id),
    courseId: text('course_id').references(() => courseTable.id),
})

export const lectureRelation = relations(lectureTable, ({ one, many }) => ({
    professor: one(professorTable, {
        fields: [lectureTable.professorId],
        references: [professorTable.id]
    }),
    room: one(roomTable, {
        fields: [lectureTable.roomId],
        references: [roomTable.id]
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