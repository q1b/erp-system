import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from 'sveltekit-superforms';
import { getCreateUserForm } from '.';
import { validateUser } from '$lib/server/index.js';

export const load: PageServerLoad = async () => {
  return {
    userForm: await getCreateUserForm(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    await validateUser(event);
    const form = await getCreateUserForm(event);
    if (!form.valid) return fail(400, {form});
    return {
      form
    }
  }
};