import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from 'sveltekit-superforms';
import { getCreateRoleForm } from './index.js';
import { validateUser } from '$lib/server/index.js';
import { db } from "$lib/server/db/index.js";
import { roleTable } from "$lib/server/db/schema/index.js";

export const load: PageServerLoad = async () => {
  return {
    roleForm: await getCreateRoleForm(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    await validateUser(event);
    const form = await getCreateRoleForm(event);
    if (!form.valid) return fail(400, {form});
    await db.insert(roleTable).values({
      id: form.data.slug,
      label: form.data.label,
      description: form.data.description
    });
    return {
      form
    }
  }
};