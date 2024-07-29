import { text } from "drizzle-orm/sqlite-core";
import { id, table } from "../../../helpers";
import { batchSectionTable, batchTable } from "./batch";
import { relations } from "drizzle-orm";
import { userTable } from "../../identity/user";

export const studentTable = table('student', {
    id,
    batchId: text('batch_id').references(() => batchTable.id, { onUpdate: "cascade", onDelete: "cascade" }),
    sectionId: text('section_id').references(() => batchSectionTable.id, { onUpdate: "cascade", onDelete: "cascade" }),
})

export const studentRelation = relations(studentTable, ({ one }) => ({
    batch: one(batchTable, {
        fields: [studentTable.batchId],
        references: [batchTable.id]
    }),
    user: one(userTable),
    section: one(batchSectionTable, {
        fields: [studentTable.sectionId],
        references: [batchSectionTable.id]
    })
}))