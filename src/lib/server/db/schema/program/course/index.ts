import { text } from 'drizzle-orm/sqlite-core';
import { createdAt, id, table } from '../../../helpers';
import { relations } from 'drizzle-orm';
import { resourceTable } from './resource';
import { courseModuleTable } from './module';
import { lectureTable } from '../lecture';
import { createInsertSchema } from 'drizzle-zod';

export const courseTable = table('course', {
	id,
	name: text('name').notNull(),
	code: text('code').notNull(),
	createdAt
});

export const createCourseSchema = createInsertSchema(courseTable);

export const courseRelation = relations(courseTable, ({ many }) => ({
	resources: many(resourceTable),
	modules: many(courseModuleTable),
	lectures: many(lectureTable)
}));
