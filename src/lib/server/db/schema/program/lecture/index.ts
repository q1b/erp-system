import { relations } from 'drizzle-orm';
import { createdAt, id, table } from '../../../helpers';
import { professorTable } from '../professor';
import { integer, text } from 'drizzle-orm/sqlite-core';
import { courseTable } from '../course';
import { semesterLectureTable } from '../semester-lecture';

export const lectureTable = table('lecture', {
    id,
    active: integer('active',{mode:'boolean'}),
    courseId: text('course_id').references(() => courseTable.id, {
        onDelete: 'cascade'
    }),
    professorId: text('professor_id').references(() => professorTable.id, {
        onDelete: 'set null'
    }),
    location: text('location'),
    createdAt
});

export const lectureRelation = relations(lectureTable, ({ one, many }) => ({
    professor: one(professorTable, {
        fields: [lectureTable.professorId],
        references: [professorTable.id]
    }),
    semesters: many(semesterLectureTable),
    course: one(courseTable, {
        fields: [lectureTable.courseId],
        references: [courseTable.id]
    })
}));