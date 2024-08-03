import { validateUser } from '$lib/server';
import { programTable } from '$lib/server/db/old_schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';
import { db } from '$lib/server/db';

export const actions: Actions = {
	delete: async (event) => {
		await validateUser(event);
		await db.delete(programTable).where(eq(programTable.id, event.params.program));
		return {
			id: event.params.program
		};
	}
};
