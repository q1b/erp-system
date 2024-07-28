import { relations } from "drizzle-orm/relations";
import { user, account, building, room, program, specialization, course, courseModule, resource, timetable, batch, lecture, period, student, attendance, professor, role } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({one, many}) => ({
	accounts: many(account),
	student: one(student, {
		fields: [user.student_id],
		references: [student.id]
	}),
	role: one(role, {
		fields: [user.role],
		references: [role.id]
	}),
}));

export const roomRelations = relations(room, ({one, many}) => ({
	building: one(building, {
		fields: [room.building_id],
		references: [building.id]
	}),
	lectures: many(lecture),
}));

export const buildingRelations = relations(building, ({many}) => ({
	rooms: many(room),
}));

export const specializationRelations = relations(specialization, ({one, many}) => ({
	program: one(program, {
		fields: [specialization.program_id],
		references: [program.id]
	}),
	batches: many(batch),
}));

export const programRelations = relations(program, ({many}) => ({
	specializations: many(specialization),
	batches: many(batch),
}));

export const courseModuleRelations = relations(courseModule, ({one}) => ({
	course: one(course, {
		fields: [courseModule.course_id],
		references: [course.id]
	}),
}));

export const courseRelations = relations(course, ({many}) => ({
	courseModules: many(courseModule),
	resources: many(resource),
	lectures: many(lecture),
}));

export const resourceRelations = relations(resource, ({one}) => ({
	course: one(course, {
		fields: [resource.course_id],
		references: [course.id]
	}),
}));

export const batchRelations = relations(batch, ({one, many}) => ({
	timetable: one(timetable, {
		fields: [batch.timetable_id],
		references: [timetable.id]
	}),
	specialization: one(specialization, {
		fields: [batch.specialization_id],
		references: [specialization.id]
	}),
	program: one(program, {
		fields: [batch.program_id],
		references: [program.id]
	}),
	lectures: many(lecture),
	students: many(student),
}));

export const timetableRelations = relations(timetable, ({many}) => ({
	batches: many(batch),
	periods: many(period),
}));

export const periodRelations = relations(period, ({one, many}) => ({
	lecture: one(lecture, {
		fields: [period.lecture_id],
		references: [lecture.id]
	}),
	timetable: one(timetable, {
		fields: [period.timetable_id],
		references: [timetable.id]
	}),
	attendances: many(attendance),
}));

export const lectureRelations = relations(lecture, ({one, many}) => ({
	periods: many(period),
	course: one(course, {
		fields: [lecture.course_id],
		references: [course.id]
	}),
	batch: one(batch, {
		fields: [lecture.batch_id],
		references: [batch.id]
	}),
	professor: one(professor, {
		fields: [lecture.professor_id],
		references: [professor.id]
	}),
	room: one(room, {
		fields: [lecture.roomId],
		references: [room.id]
	}),
}));

export const attendanceRelations = relations(attendance, ({one}) => ({
	student: one(student, {
		fields: [attendance.student_id],
		references: [student.id]
	}),
	period: one(period, {
		fields: [attendance.period_id],
		references: [period.id]
	}),
}));

export const studentRelations = relations(student, ({one, many}) => ({
	attendances: many(attendance),
	users: many(user),
	batch: one(batch, {
		fields: [student.batch_id],
		references: [batch.id]
	}),
}));

export const professorRelations = relations(professor, ({many}) => ({
	lectures: many(lecture),
}));

export const roleRelations = relations(role, ({many}) => ({
	users: many(user),
}));