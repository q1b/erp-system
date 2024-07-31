import { relations } from 'drizzle-orm';
import { id, table } from '../../helpers';
import { professorTable } from './professor';
import { integer, text } from 'drizzle-orm/sqlite-core';
import { batchSectionTable, batchTable } from './student/batch';
import { courseTable } from './course';
import { periodTable } from './time-table/period';
import { roomTable } from '../infrastructure';

export const lectureTable = table('lecture', {
	id,
	semester: integer('semester'),
	professorId: text('professor_id').references(() => professorTable.id, {
		onDelete: 'set null',
		onUpdate: 'no action'
	}),
	courseId: text('course_id').references(() => courseTable.id, {
		onDelete: 'set null',
		onUpdate: 'no action'
	})
});

// Lecture can have multiple batches, and a batch can have multiple lectures
export const lectureToBatchTabel = table('lecture_to_batch', {
	id,
	lectureId: text('lecture_id').references(() => lectureTable.id, {
		onDelete: 'cascade',
		onUpdate: 'no action'
	}),
	batchId: text('batch_id').references(() => batchTable.id, {
		onDelete: 'cascade',
		onUpdate: 'no action'
	}),
	sectionId: text('batch_section_id').references(() => batchSectionTable.id, {
		onDelete: 'set null',
		onUpdate: 'no action'
	}),
	roomId: text('roomId').references(() => roomTable.id, {
		onDelete: 'set null',
		onUpdate: 'no action'
	})
});

export const lectureToBatchRelations = relations(lectureToBatchTabel, ({ one, many }) => ({
	room: one(roomTable, {
		fields: [lectureToBatchTabel.roomId],
		references: [roomTable.id]
	}),
	lecture: one(lectureTable, {
		fields: [lectureToBatchTabel.lectureId],
		references: [lectureTable.id]
	}),
	batch: one(batchTable, {
		fields: [lectureToBatchTabel.batchId],
		references: [batchTable.id]
	}),
	section: one(batchSectionTable, {
		fields: [lectureToBatchTabel.sectionId],
		references: [batchSectionTable.id]
	}),
	periods: many(periodTable)
}));

export const lectureRelation = relations(lectureTable, ({ one, many }) => ({
	professor: one(professorTable, {
		fields: [lectureTable.professorId],
		references: [professorTable.id]
	}),
	batchList: many(lectureToBatchTabel),
	course: one(courseTable, {
		fields: [lectureTable.courseId],
		references: [courseTable.id]
	})
}));
