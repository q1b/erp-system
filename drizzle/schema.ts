import { sqliteTable, text,  primaryKey, integer } from "drizzle-orm/sqlite-core"

export const role = sqliteTable("role", {
	id: text("id").primaryKey().notNull(),
	label: text("label").notNull(),
	description: text("description"),
});

export const account = sqliteTable("account", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: integer("expires_at"),
	token_type: text("token_type"),
	scope: text("scope"),
	id_token: text("id_token"),
	session_state: text("session_state"),
},
(table) => {
	return {
		pk0: primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"})
	}
});

export const building = sqliteTable("building", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
});

export const room = sqliteTable("room", {
	id: text("id").primaryKey().notNull(),
	building_id: text("building_id").references(() => building.id),
	capacity: text("capacity"),
});

export const program = sqliteTable("program", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
});

export const specialization = sqliteTable("specialization", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	short_name: text("short_name").notNull(),
	program_id: text("program_id").references(() => program.id),
});

export const course = sqliteTable("course", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	code: text("code").notNull(),
	created_at: text("created_at").default("sql`(current_timestamp)`"),
});

export const courseModule = sqliteTable("courseModule", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	course_id: text("course_id").notNull().references(() => course.id),
});

export const resource = sqliteTable("resource", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	link: text("link").notNull(),
	course_id: text("course_id").references(() => course.id),
});

export const batch = sqliteTable("batch", {
	id: text("id").primaryKey().notNull(),
	section: text("section"),
	year: integer("year").notNull(),
	program_id: text("program_id").references(() => program.id),
	specialization_id: text("specialization_id").references(() => specialization.id),
	timetable_id: text("timetable_id").references(() => timetable.id),
	created_at: text("created_at").default("sql`(current_timestamp)`"),
});

export const timetable = sqliteTable("timetable", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const period = sqliteTable("period", {
	id: text("id").primaryKey().notNull(),
	day: text("day").notNull(),
	start_at: text("start_at"),
	duration: integer("duration"),
	timetable_id: text("timetable_id").references(() => timetable.id),
	lecture_id: text("lecture_id").references(() => lecture.id),
});

export const attendance = sqliteTable("attendance", {
	id: text("id").primaryKey().notNull(),
	date: text("date").notNull(),
	period_id: text("period_id").references(() => period.id),
	student_id: text("student_id").references(() => student.id),
	is_present: integer("is_present").default(0),
});

export const lecture = sqliteTable("lecture", {
	id: text("id").primaryKey().notNull(),
	semester: integer("semester"),
	roomId: text("roomId").references(() => room.id),
	professor_id: text("professor_id").references(() => professor.id),
	batch_id: text("batch_id").references(() => batch.id),
	course_id: text("course_id").references(() => course.id),
});

export const professor = sqliteTable("professor", {
	id: text("id").primaryKey().notNull(),
});

export const domain = sqliteTable("domain", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	description: text("description"),
});

export const user = sqliteTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: integer("emailVerified"),
	image: text("image"),
	role: text("role").default("user").references(() => role.id, { onDelete: "set default", onUpdate: "cascade" } ),
	student_id: text("student_id").references(() => student.id),
	created_at: text("created_at").default("sql`(current_timestamp)`"),
});

export const student = sqliteTable("student", {
	id: text("id").primaryKey().notNull(),
	batch_id: text("batch_id").references(() => batch.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});