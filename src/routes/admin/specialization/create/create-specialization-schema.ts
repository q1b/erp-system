import { z } from "zod";
 
export const createSpecializationSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  programId: z.string(),
});
 
export type CreateSpecializationSchema = typeof createSpecializationSchema;