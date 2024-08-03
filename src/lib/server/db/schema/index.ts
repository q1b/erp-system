// `user` delete -> delete all `user` accounts,students,professors
export * from './identity/user';
// `role` delete -> set default to `role` of user
export * from './identity/role';
export * from './identity/account';

// export * from "./identity/authenticator"
// export * from "./identity/session"
// export * from "./identity/verification-token"

// `professor` delete -> set null `professor` lectures, program coordinator
export * from './program/professor';

// `course` delete -> delete all `course` resources, lectures
export * from './program/course/index';
export * from './program/course/resource';

export * from './program/student/index';
// `batch` delete -> delete all `batch` students, semesters
export * from './program/student/batch';

// `program` delete -> delete all `program` batches, students, lectures
export * from './program/index';

// `semester` delete -> delete all `semester` semesterLecture, timetable
export * from './program/semester';
// `semesterLecture` delete all semesterLecturePeriod
export * from "./program/semester-lecture"

// `lecture` delete -> delete all `lecture` semesterLecture
export * from './program/lecture/index';
export * from './program/lecture/attendance';

// `period` delete -> delete all `period` attendances, semesterLecturePeriod
export * from './program/lecture/period';

// `timetable` delete -> delete all `timetable` periods
export * from './program/lecture/timetable';