import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from 'sveltekit-superforms';
import { getCreateBatchForm } from './index.js';
import { validateUser } from '$lib/server/index.js';
import { db } from "$lib/server/db/index.js";
import { batchTable } from "$lib/server/db/old_schema/index.js";

export const load: PageServerLoad = async () => {
  return {
    programList: db.query.programTable.findMany(),
    specializationList: db.query.specializationTable.findMany(),
    batchForm: await getCreateBatchForm(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    await validateUser(event);
    const form = await getCreateBatchForm(event);
    if (!form.valid) return fail(400, {form});
    await db.insert(batchTable).values({
      year: +`${form.data.year}`,
      programId: form.data.programId,
      specializationId: form.data.specializationId
    });
    return {
      form
    }
  }
};