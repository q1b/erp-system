import { validateUser } from '$lib/server';
import { db } from '$lib/server/db';
import { courseTable } from '$lib/server/db/old_schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	update: async () => {},
	delete: async (event) => {
		await validateUser(event);
		await db.delete(courseTable).where(eq(courseTable.id, event.params.course));
		return {
			id: event.params.course
		};
	}
};
