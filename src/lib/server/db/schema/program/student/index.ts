import { relations } from "drizzle-orm";
import { createdAt, id, table } from "../../../helpers";
import { text } from "drizzle-orm/sqlite-core";
import { programTable } from "..";
import { batchTable } from "./batch";
import { userTable } from "../../identity/user";
import { attendanceTable } from "../lecture/attendance";

export const studentTable = table('student', {
    id,
    createdAt,
	userId: text('user_id').references(() => userTable.id, { onDelete: 'cascade' }),
    programId: text('program_id').references(() => programTable.id, { onDelete: 'cascade' }),
    batchId: text('batch_id').references(() => batchTable.id, { onDelete: 'cascade' } )
})

export const studentRelation = relations(studentTable, ({one,many}) => ({
    program: one(programTable, {
        fields: [studentTable.programId],
        references: [programTable.id]
    }),
    user: one(userTable, {
        fields: [studentTable.userId],
        references: [userTable.id]
    }),
    batch: one(batchTable, {
        fields: [studentTable.batchId],
        references: [batchTable.id]
    }),
    attendance: many(attendanceTable)
}))