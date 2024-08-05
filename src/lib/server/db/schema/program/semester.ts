import { relations } from "drizzle-orm";
import { createdAt, id, table } from "../../helpers";
import { integer, text } from "drizzle-orm/sqlite-core";
import { programTable } from ".";
import { batchTable } from "./student/batch";
import { semesterLectureTable } from "./semester-lecture";

export const semesterTable = table('semester', {
    id,
    completed: integer('completed', {mode:'boolean'}).default(false),
    number: integer('number').notNull(),
    startAt: text('start_at'),
    endAt: text('end_at'),
    programId: text('program_id').references(() => programTable.id, { onDelete: 'cascade' }),
    batchId: text('batch_id').references(() => batchTable.id, { onDelete: 'cascade' }),
    createdAt
})

export const semesterRelation = relations(semesterTable, ({one,many}) => ({
    program: one(programTable, {
        fields: [semesterTable.programId],
        references: [programTable.id]
    }),
    batch: one(batchTable, {
        fields: [semesterTable.batchId],
        references: [batchTable.id]
    }),
    lectures: many(semesterLectureTable)
}))