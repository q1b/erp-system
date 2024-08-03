import { validateUser } from '$lib/server';
import { db } from '$lib/server/db';
import { roleTable } from '$lib/server/db/old_schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	update: async () => {},
	delete: async (event) => {
		await validateUser(event);
		await db.delete(roleTable).where(eq(roleTable.id, event.params.role));
		return {
			id: event.params.role
		};
	}
};
