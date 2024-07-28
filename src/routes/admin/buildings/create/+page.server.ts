import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from 'sveltekit-superforms';
import { getCreateBuildingForm } from './index.js';
import { validateUser } from '$lib/server/index.js';
import { db } from "$lib/server/db/index.js";
import { buildingTable } from "$lib/server/db/schema/infrastructure.js";

export const load: PageServerLoad = async () => {
  return {
    buildingForm: await getCreateBuildingForm(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    await validateUser(event);
    const form = await getCreateBuildingForm(event);
    if (!form.valid) return fail(400, {form});
    await db.insert(buildingTable).values({
      name: form.data.name,
      description: form.data.description
    });
    return {
      form
    }
  }
};