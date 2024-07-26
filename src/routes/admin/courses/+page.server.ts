import type { Actions, PageServerLoad } from "./$types";
import { getCreateCourseForm } from "./create";

export const load: PageServerLoad = async () => {
    return {
        courseForm: await getCreateCourseForm(),
    }
};

export const actions: Actions = {
    default: async (event) => {
    }
};