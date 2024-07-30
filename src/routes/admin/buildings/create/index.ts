import { zod } from 'sveltekit-superforms/adapters';
import { createBuildingSchema, type CreateBuildingSchema } from './create-building-schema';
import { superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import type { RequestEvent } from './$types';

export const getCreateBuildingForm = async (event?: RequestEvent) => {
	const cache = zod(createBuildingSchema);
	if (!event) {
		return await superValidate(cache);
	}
	return await superValidate(event, cache);
};

export type CreateBuildingFormType = SuperValidated<Infer<CreateBuildingSchema>>;
