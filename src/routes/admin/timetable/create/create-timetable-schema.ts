import { z } from 'zod';

export const createTimetableSchema = z.object({
	name: z.string()
});

export type CreateTimetableSchema = typeof createTimetableSchema;
