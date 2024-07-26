import { text } from "drizzle-orm/sqlite-core";
import { id, table } from "../../../helpers";
import { relations } from "drizzle-orm";
import { courseTable } from ".";

export const courseModuleTable = table('courseModule', {
    id,
    name: text('name').notNull(),
    course_id: text('course_id').notNull().references(() => courseTable.id),
});

export const courseModuleRelation = relations(courseModuleTable, ({ one }) => ({
    course: one(courseTable, {
        fields: [courseModuleTable.course_id],
        references: [courseTable.id]
    })
}));