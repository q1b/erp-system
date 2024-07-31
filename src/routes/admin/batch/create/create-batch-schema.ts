import { z } from "zod";
 
export const createBatchSchema = z.object({
  year: z.number(),
  programId: z.string(),
  specializationId: z.string().optional(),
});
 
export type CreateBatchSchema = typeof createBatchSchema;