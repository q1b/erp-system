import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from 'sveltekit-superforms';
import { getCreateTimetableForm } from './index.js';
import { validateUser } from '$lib/server/index.js';
import { db } from "$lib/server/db/index.js";
import { timetableTable } from "$lib/server/db/schema";

export const load: PageServerLoad = async () => {
  return {
    timetableForm: await getCreateTimetableForm(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    await validateUser(event);
    const form = await getCreateTimetableForm(event);
    if (!form.valid) return fail(400, {form});
    await db.insert(timetableTable).values({
      name: form.data.name
    });
    return {
      form
    }
  }
};