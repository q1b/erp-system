import { z } from "zod";

export const createLectureSchema = z.object({
  semester: z.number(),
  professorId: z.string(),
  courseId: z.string(),
});

export type CreateLectureSchema = typeof createLectureSchema;