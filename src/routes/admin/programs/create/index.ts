import { zod } from 'sveltekit-superforms/adapters';
import { createProgramSchema, type CreateProgramSchema } from './create-program-schema';
import { superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import type { RequestEvent } from './$types';

export const getCreateProgramForm = async (event?: RequestEvent) => {
	const cache = zod(createProgramSchema);
	if (!event) {
		return await superValidate(cache);
	}
	return await superValidate(event, cache);
};

export type CreateProgramFormType = SuperValidated<Infer<CreateProgramSchema>>;
