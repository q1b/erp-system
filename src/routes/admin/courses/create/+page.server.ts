import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from 'sveltekit-superforms';
import { getCreateCourseForm } from '.';
import { validateUser } from '$lib/server/index.js';

export const load: PageServerLoad = async () => {
  return {
    courseForm: await getCreateCourseForm(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    await validateUser(event);
    const form = await getCreateCourseForm(event);
    if (!form.valid)
      return fail(400, {form})
    console.log("FORM DATA", form.data);
    return {
      form
    }
  }
};