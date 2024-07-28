import { db } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";
import { getCreateProgramForm } from "./create";

export const load: PageServerLoad = async () => {
    return {
        programs: db.query.programTable.findMany(),
        programForm: await getCreateProgramForm(),
    }
};

export const actions: Actions = {
    default: async () => {
    }
};