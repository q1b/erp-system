import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from 'sveltekit-superforms';
import { getCreateRoomForm } from './index.js';
import { validateUser } from '$lib/server/index.js';
import { db } from "$lib/server/db/index.js";
import { roomTable } from "$lib/server/db/schema";

export const load: PageServerLoad = async () => {
  return {
    roomForm: await getCreateRoomForm(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    await validateUser(event);
    const form = await getCreateRoomForm(event);
    if (!form.valid) return fail(400, {form});
    await db.insert(roomTable).values({
      number: form.data.number,
      capacity: form.data.capacity,
      buildingId: form.data.buildingId
    });
    return {
      form
    }
  }
};