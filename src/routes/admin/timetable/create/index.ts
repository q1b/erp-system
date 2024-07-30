import { zod } from 'sveltekit-superforms/adapters';
import { createTimetableSchema, type CreateTimetableSchema } from './create-timetable-schema';
import { superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import type { RequestEvent } from './$types';

export const getCreateTimetableForm = async (event?: RequestEvent) => {
	const cache = zod(createTimetableSchema);
	if (!event) {
		return await superValidate(cache);
	}
	return await superValidate(event, cache);
};

export type CreateTimetableFormType = SuperValidated<Infer<CreateTimetableSchema>>;
