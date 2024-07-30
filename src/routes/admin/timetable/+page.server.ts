import { db } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";
import { getCreateTimetableForm } from "./create";

export const load: PageServerLoad = async () => {
    return {
        timetableList: db.query.timetableTable.findMany(),
        timetableForm: await getCreateTimetableForm(),
    }
};

export const actions: Actions = {
    default: async () => {
    }
};