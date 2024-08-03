import { db } from "..";
import * as schema from "../schema";

for (const table of [
    schema.roleTable,
    schema.accountTable,
    schema.userTable,
    schema.studentTable,
    schema.batchTable,
    schema.courseTable,
    schema.resourceTable,
    schema.professorTable,
    schema.lectureTable,
    schema.periodTable,
    schema.programTable,
    schema.semesterTable,
    schema.semesterLecturePeriodTable,
    schema.semesterLectureTable,
    schema.attendanceTable,
    schema.timetableTable,
]) {
    await db.delete(table);
}