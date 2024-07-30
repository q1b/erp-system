import { zod } from 'sveltekit-superforms/adapters';
import { createCourseSchema, type CreateCourseSchema } from './create-course-schema';
import { superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import type { RequestEvent } from './$types';

export const getCreateCourseForm = async (event?: RequestEvent) => {
	const cache = zod(createCourseSchema);
	if (!event) {
		return await superValidate(cache);
	}
	return await superValidate(event, cache);
};

export type CreateCourseFormType = SuperValidated<Infer<CreateCourseSchema>>;
