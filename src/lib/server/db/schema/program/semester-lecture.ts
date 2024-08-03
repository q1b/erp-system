import { primaryKey, text } from "drizzle-orm/sqlite-core";
import { id, table } from "../../helpers";
import { semesterTable } from "./semester";
import { lectureTable } from "./lecture";
import { relations } from "drizzle-orm";
import { periodTable } from "./lecture/period";

export const semesterLectureTable = table('semester_lecture', {
    id,
    semesterId: text('semester_id').notNull()
        .references(() => semesterTable.id, { onDelete: 'cascade' }),
    lectureId: text('lecture_id').notNull()
        .references(() => lectureTable.id, { onDelete: 'cascade' }),
});

export const semesterLectureTableRelations = relations(semesterLectureTable, ({ one }) => ({
    semester: one(semesterTable, {
        fields: [semesterLectureTable.semesterId],
        references: [semesterTable.id],
    }),
    lecture: one(lectureTable, {
        fields: [semesterLectureTable.lectureId],
        references: [lectureTable.id],
    }),
}));

export const semesterLecturePeriodTable = table(
    'semester_lecture_period',
    {
        periodId: text('period_id').notNull().references(() => semesterTable.id, { onDelete: 'cascade' }),
        semesterLectureId: text('semester_lecture_id').references(() => semesterLectureTable.id, { onDelete: 'cascade' }),
    },
    (t) => ({
        pk: primaryKey({
            columns: [t.periodId, t.semesterLectureId]
        })
    }),
);

export const semesterLecturePeriodTableRelations = relations(semesterLecturePeriodTable, ({ one }) => ({
    period: one(periodTable, {
        fields: [semesterLecturePeriodTable.periodId],
        references: [periodTable.id],
    }),
    lecture: one(semesterLectureTable, {
        fields: [semesterLecturePeriodTable.semesterLectureId],
        references: [semesterLectureTable.id],
    }),
}));

