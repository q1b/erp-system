CREATE TABLE `domain` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `building` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `room` (
	`id` text PRIMARY KEY NOT NULL,
	`number` text,
	`building_id` text,
	`capacity` text,
	FOREIGN KEY (`building_id`) REFERENCES `building`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`emailVerified` integer,
	`image` text,
	`role` text DEFAULT 'user',
	`created_at` text DEFAULT (current_timestamp),
	FOREIGN KEY (`role`) REFERENCES `role`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `program` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `specialization` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`short_name` text NOT NULL,
	`program_id` text,
	FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `course` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp)
);
--> statement-breakpoint
CREATE TABLE `courseModule` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`course_id` text NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `resource` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`link` text NOT NULL,
	`course_id` text,
	FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `student` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`batch_id` text,
	`section_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`batch_id`) REFERENCES `batch`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`section_id`) REFERENCES `batch_section`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `batch_section` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`batch_id` text,
	FOREIGN KEY (`batch_id`) REFERENCES `batch`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `batch` (
	`id` text PRIMARY KEY NOT NULL,
	`year` integer NOT NULL,
	`program_id` text,
	`specialization_id` text,
	`created_at` text DEFAULT (current_timestamp),
	FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`specialization_id`) REFERENCES `specialization`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `timetable` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `period` (
	`id` text PRIMARY KEY NOT NULL,
	`day` text NOT NULL,
	`start_at` text,
	`duration` integer,
	`timetable_id` text,
	`lecture_to_batch_id` text,
	FOREIGN KEY (`timetable_id`) REFERENCES `timetable`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`lecture_to_batch_id`) REFERENCES `lecture_to_batch`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `attendance` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`period_id` text,
	`student_id` text,
	`is_present` integer DEFAULT false,
	FOREIGN KEY (`period_id`) REFERENCES `period`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `lecture` (
	`id` text PRIMARY KEY NOT NULL,
	`semester` integer,
	`professor_id` text,
	`course_id` text,
	FOREIGN KEY (`professor_id`) REFERENCES `professor`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `lecture_to_batch` (
	`id` text PRIMARY KEY NOT NULL,
	`lecture_id` text,
	`batch_id` text,
	`batch_section_id` text,
	`roomId` text,
	FOREIGN KEY (`lecture_id`) REFERENCES `lecture`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`batch_id`) REFERENCES `batch`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`batch_section_id`) REFERENCES `batch_section`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`roomId`) REFERENCES `room`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `professor` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
