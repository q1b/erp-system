import { integer, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, table } from "../../../helpers";
import { relations } from "drizzle-orm";
import { programTable, specializationTable } from "..";
import { timetableTable } from "../time-table";
import { studentTable } from ".";

// B.tech B.sc
export const batchTable = table('batch', {
    id,
    section: text('section'),
    year: integer('year',{ mode: 'number' }).notNull(),
    programId: text('program_id').references(() => programTable.id),
    specializationId: text('specialization_id').references(() => specializationTable.id),
    timetableId: text('timetable_id').references(() => timetableTable.id),
    createdAt
})

export const batchRelation = relations(batchTable, ({ one,many }) => ({
    timeTable: one(timetableTable, {
        fields: [batchTable.timetableId],
        references: [timetableTable.id]
    }),
    program: one(programTable,{
        fields: [batchTable.programId],
        references: [programTable.id]
    }),
    specialization: one(specializationTable, {
        fields: [batchTable.specializationId],
        references: [specializationTable.id]
    }),
    students: many(studentTable)
}))