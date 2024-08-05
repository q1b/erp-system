import { validateUser } from '$lib/server';
import { db } from '$lib/server/db';
import { lectureTable, userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	update: async () => {},
	delete: async (event) => {
		await validateUser(event);
		await db.delete(lectureTable).where(eq(userTable.id, event.params.lecture));
		return {
			id: event.params.lecture
		};
	}
};
