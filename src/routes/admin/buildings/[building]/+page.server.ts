import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { getCreateRoomForm } from './create';
import { buildingTable, roomTable } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
	return {
		building: db.query.buildingTable.findFirst({
			where: eq(buildingTable.id, event.params.building)
		}),
		roomList: db.query.roomTable.findMany({
			where: eq(roomTable.buildingId, event.params.building)
		}),
		roomForm: await getCreateRoomForm()
	};
};

export const actions: Actions = {
	default: async () => {}
};
