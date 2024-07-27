import { z } from "zod";
 
export const createUserSchema = z.object({
  name: z.string({ message: 'Name of the user' }),
  code: z.string().optional(),
});
 
export type CreateUserSchema = typeof createUserSchema;