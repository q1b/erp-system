import { validateUser } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const user = await validateUser(event);
	return {
		user
	};
};
