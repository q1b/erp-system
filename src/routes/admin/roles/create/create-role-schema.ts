import { z } from "zod";
 
export const createRoleSchema = z.object({
  slug: z.string(),
  label: z.string(),
  description: z.string().optional(),
});
 
export type CreateRoleSchema = typeof createRoleSchema;