import { zod } from 'sveltekit-superforms/adapters';
import { createRoomSchema, type CreateRoomSchema } from './create-room-schema';
import { superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import type { RequestEvent } from './$types';

export const getCreateRoomForm = async (event?: RequestEvent) => {
	const cache = zod(createRoomSchema);
	if (!event) {
		return await superValidate(cache);
	}
	return await superValidate(event, cache);
};

export type CreateRoomFormType = SuperValidated<Infer<CreateRoomSchema>>;
