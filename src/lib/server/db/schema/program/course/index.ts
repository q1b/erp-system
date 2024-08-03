import { relations } from "drizzle-orm";
import { createdAt, id, table } from "../../../helpers";
import { text } from "drizzle-orm/sqlite-core";
import { resourceTable } from "./resource";

export const courseTable = table('course', {
    id,
    name: text('name').notNull(),
    code: text('code'),
    createdAt
})

export const courseRelation = relations(courseTable, ({many}) => ({
    resources: many(resourceTable)
}))