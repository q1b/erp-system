import { text } from "drizzle-orm/sqlite-core";
import { id, table } from "../../../helpers";
import { relations } from "drizzle-orm";
import { resourceTable } from "./resource";
import { courseModuleTable } from "./module";

export const courseTable = table('course', {
    id,
    name: text('name').notNull(),
});

export const courseRelation = relations(courseTable, ({ many }) => ({
    resources: many(resourceTable),
    modules: many(courseModuleTable)
}));