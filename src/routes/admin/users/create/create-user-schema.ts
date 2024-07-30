import { z } from 'zod';

export const createUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	role: z.string()
});

export type CreateUserSchema = typeof createUserSchema;
