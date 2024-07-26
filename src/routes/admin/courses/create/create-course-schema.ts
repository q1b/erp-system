import { z } from "zod";
 
export const createCourseSchema = z.object({
  name: z.string({ message: 'Name of the course' }),
  code: z.string().optional(),
});
 
export type CreateCourseSchema = typeof createCourseSchema;