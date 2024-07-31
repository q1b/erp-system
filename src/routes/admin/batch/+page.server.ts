import { db } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";
import { getCreateBatchForm } from "./create";

export const load: PageServerLoad = async () => {
    return {
        batchList: db.query.batchTable.findMany(),
        programList: db.query.programTable.findMany(),
        specializationList: db.query.specializationTable.findMany(),
        batchForm: await getCreateBatchForm(),
    }
};

export const actions: Actions = {
    default: async () => {
    }
};