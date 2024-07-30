import { validateUser } from '$lib/server';
import { db } from '$lib/server/db';
import { roomTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';

export const actions: Actions = {
	update: async () => {},
	delete: async (event) => {
		await validateUser(event);
		await db.delete(roomTable).where(eq(roomTable.id, event.params.room));
		return {
			id: event.params.room
		};
	}
};
