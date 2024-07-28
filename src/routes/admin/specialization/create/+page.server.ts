import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from 'sveltekit-superforms';
import { getCreateSpecializationForm } from './index.js';
import { validateUser } from '$lib/server/index.js';
import { db } from "$lib/server/db/index.js";
import { specializationTable } from "$lib/server/db/schema/program/index.js";

export const load: PageServerLoad = async () => {
  return {
    programs: await db.query.programTable.findMany({
      columns: {
        id:true,
        name: true
      }
    }),
    specializationForm: await getCreateSpecializationForm(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    await validateUser(event);
    const form = await getCreateSpecializationForm(event);
    if (!form.valid) return fail(400, {form});
    console.log(form.data);
    await db.insert(specializationTable).values({
      name: form.data.name,
      shortName: form.data.shortName,
      programId: form.data.programId,
    });
    return {
      form
    }
  }
};