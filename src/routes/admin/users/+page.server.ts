import type { Actions, PageServerLoad } from "./$types";
import { getCreateUserForm } from "./create";

export const load: PageServerLoad = async () => {
    return {
        createUserForm: await getCreateUserForm(),
    }
};

export const actions: Actions = {
    default: async (event) => {
    }
};