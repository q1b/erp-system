import { relations } from "drizzle-orm";
import { createdAt, id, table } from "../../../helpers";
import { integer, text } from "drizzle-orm/sqlite-core";
import { programTable } from "..";
import { studentTable } from ".";
import { semesterTable } from "../semester";

export const batchTable = table('batch', {
    id,
    year: integer('year', { mode: 'number' }).notNull(),
	programId: text('program_id').references(() => programTable.id, { onDelete: 'cascade' }),
    createdAt
})

export const batchRelation = relations(batchTable, ({one,many}) => ({
    program: one(programTable, {
        fields: [batchTable.programId],
        references: [programTable.id]
    }),
    students: many(studentTable),
    semesters: many(semesterTable)
}))