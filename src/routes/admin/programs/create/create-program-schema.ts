import { z } from "zod";
 
export const createProgramSchema = z.object({
  name: z.string(),
  description: z.string(),
});
 
export type CreateProgramSchema = typeof createProgramSchema;