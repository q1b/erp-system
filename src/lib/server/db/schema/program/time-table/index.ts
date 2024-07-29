import { text } from "drizzle-orm/sqlite-core";
import { id, table } from "../../../helpers";
import { relations } from "drizzle-orm";
import { periodTable } from "./period";
import { batchTable } from "../student/batch";

// B.tech B.sc
export const timetableTable = table('timetable', {
    id,
    name: text('name').notNull(),
})

export const timetableRelation = relations(timetableTable, ({ many }) => ({
    periods: many(periodTable),
    batches: many(batchTable)
}))