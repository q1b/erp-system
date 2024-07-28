import { z } from "zod";
 
export const createBuildingSchema = z.object({
  name: z.string(),
  description: z.string(),
});
 
export type CreateBuildingSchema = typeof createBuildingSchema;