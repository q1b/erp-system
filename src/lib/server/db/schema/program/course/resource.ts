import { text } from 'drizzle-orm/sqlite-core';
import { id, table } from '../../../helpers';
import { courseTable } from './index';
import { relations } from 'drizzle-orm';

export const resourceTable = table('resource', {
	id,
	name: text('name').notNull(),
	link: text('link').notNull(),
	courseId: text('course_id').references(() => courseTable.id)
});

export const resourcesRelation = relations(resourceTable, ({ one }) => ({
	courses: one(courseTable, {
		fields: [resourceTable.courseId],
		references: [courseTable.id]
	})
}));
